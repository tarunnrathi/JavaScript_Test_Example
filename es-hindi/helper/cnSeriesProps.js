import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { cricketSeries as cricketSeriesAds } from "includes/Desktop/dfpAdIds";
import { cricketSeries as cricketSeriesMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, ignoreQueryParams } from "includes/article.util";
import { getCricketSeriesDetails } from "includes/seo.util";
import {
  generateSeriesDesktopAds,
  SeriesPages,
  SeriesTabs,
} from "components/Cricketnext/CricketNextUtils";
import { TaboolaList } from "includes/Tabola.helper";
import { getMenu, getRedisDataByKey, getRedisDataByMultiKey, getGoogleConfig, getCricketData, getArticleList } from "api_dns/global/Common";

const cnSeriesProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  const currentUrl = ignoreQueryParams(
    protocol + host + context.req.url,
    false
  );
  const currentPath = ignoreQueryParams(context.req.url, false);

  const urlParam = context.query;
  const seriesName = urlParam?.seriesName || "";
  const seriesDisplayName = seriesName
    ? seriesName.split("-").join(" ").toUpperCase()
    : "";
  let seriesTransformedName = "";
  let seriesId = "";
  const pageType = urlParam?.pageType || SeriesTabs.NEWS;

  // const seriesInfo = await getRedisDataByKey(`CRICKETNEXT:series:${seriesName}`, false) || {};

  // seriesId = seriesInfo?.si_series_id || null;
  // seriesTransformedName = seriesInfo?.series_name || "";

  let seriesInfo =
    (await getRedisDataByKey(`CRICKETNEXT:series:${seriesName}`, false)) || {};
  if (!Object.keys(seriesInfo).length)
    return {
      notFound: true,
    };
  let { si_series_id: seriesIds } = seriesInfo;

  seriesId = seriesIds?.split(",") || [];
  seriesTransformedName = seriesName?.split("-").join(" ") || "";

  if (!SeriesPages.includes(pageType) || !seriesInfo) {
    return {
      notFound: true,
    };
  }

  const seriesHomeUrl = `/cricket/series/${seriesName}.html`;
  const seriesNewsUrl = `/cricket/news/series/${seriesName}.html`;
  const seriesMatchScheduleUrl = `/cricket/match-schedule/series/${seriesName}.html`;
  const seriesResultUrl = `/cricket/result/series/${seriesName}.html`;
  const seriesPhotoUrl = `/cricket/photos/series/${seriesName}.html`;
  const seriesVideoUrl = `/cricket/videos/series/${seriesName}.html`;

  let pageNumber = parseInt(urlParam?.page) || 1;
  const pageLimit = 28;
  let offset = pageNumber ? (pageNumber - 1) * pageLimit : 0;

  let paramObj = {
    seriesName,
    seriesDisplayName,
    pageType,
    currentUrl,
    currentPath,
    seriesHomeUrl,
    seriesNewsUrl,
    seriesMatchScheduleUrl,
    seriesResultUrl,
    seriesPhotoUrl,
    seriesVideoUrl,
    pageNumber,
    pageLimit,
    topicName: seriesName,
  };

  const fetchSeriesData = async(seriesId, apiKey) => {
    const res = [];
    for(let i = 0; i < seriesId.length; i++) {
      const result = await getCricketData(`${apiKey}/${seriesId[i]}`);
      res.push(apiKey.includes('schedule') ? result : result.length > 0 ? result[0] : {});
    }
    return res;
  };

  let seriesData = [];

  if (pageType === SeriesTabs.NEWS) {
    let newsData = await getArticleList({count: pageLimit, offset: offset, filter: { post_type:"text",'tags.slug':seriesName }, fields: 'intro,display_headline,weburl_r,images,headline'});
    seriesData = newsData || [];
    paramObj["seriesBreadCrumbName"] = `${seriesDisplayName} NEWS`;
  } 
  else if (pageType === SeriesTabs.MATCH_SCHEDULE) {
    seriesData = await fetchSeriesData(seriesId, "schedule/series");
    paramObj["seriesBreadCrumbName"] = `${seriesDisplayName} SCHEDULE`;
  } 
  else if (pageType === SeriesTabs.RESULT) {
    seriesData = await fetchSeriesData(seriesId, "series-result");
    paramObj["seriesBreadCrumbName"] = `${seriesDisplayName} RESULTS`;
  } 
  else if (pageType === SeriesTabs.PHOTO) {
    let photosData = await getArticleList({count: pageLimit, offset: offset, filter: { post_type:"photogallery",'tags.slug':seriesName }, fields: 'display_headline,weburl_r,images,headline'});
    seriesData = photosData || [];
    paramObj["seriesBreadCrumbName"] = `${seriesDisplayName} PHOTOS`;
  } 
  else if (pageType === SeriesTabs.VIDEO) {
    let videosData = await getArticleList({count: pageLimit, offset: offset, filter: { post_type:"videos",'tags.slug':seriesName }, fields: 'display_headline,weburl_r,images,headline'});
    seriesData = videosData || [];
    paramObj["seriesBreadCrumbName"] = `${seriesDisplayName} VIDEOS`;
  }

  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-cricket_trending_topic";
  let footerData = [], crMenu = [], get1xBet = [], trendingTags={};

  let [
      menuData = {},
      googleRemoteConfig = {},
      // districtList = {},
      redisMultiResults = [],
  ] = await Promise.allSettled([
      getMenu(isMobile),
      getGoogleConfig(),
      // getDistricts(),
      getRedisDataByMultiKey(multiRedisString)
  ]).then(temp => temp?.map(r=>r.value)).catch();

  if(menuData?.length === 0) menuData = {}

  if (Object.keys(redisMultiResults)?.length > 0) { 
      let keys = Object.keys(redisMultiResults);   
      [footerData, crMenu, get1xBet, trendingTags] = keys.map(i => redisMultiResults[i]? redisMultiResults[i]: []);
  }

  let _1xbet =
    get1xBet &&
    Object.values(get1xBet)?.length &&
    Object.values(get1xBet).filter(
      (sponsors) => sponsors?.Event_Page === "/cricket/"
    );
  if (seriesName === "wpl-2023") {
    _1xbet =
      get1xBet &&
      Object.values(get1xBet)?.length &&
      Object.values(get1xBet).filter(
        (sponsors) => sponsors?.Event_Page == "/series/wpl-2023.html"
      );
  }
  let _1xbetData = _1xbet?.[0]?.sponserdata || [];
  menuData["seriesMenuData"] = paramObj;

  if (typeof seriesData === "undefined") {
    seriesData = [];
  }
  const pageContent = seriesData || [];

  let { title, description, keywords } = getCricketSeriesDetails(
    pageType,
    seriesTransformedName
  );

  const pageSeo = {
    title,
    keywords,
    description,
    canonical: currentUrl,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    isCricketNextHome: true,
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      title,
      description,
      keywords,
      currentUrl,
      null,
      true,
      false,
      true
    ) || "";

  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(
    arrayOnly(crMenu)
  );

  let pageAds;
  if (isMobile) {
    if (pageType === SeriesTabs.MATCH_SCHEDULE) {
      pageAds = cricketSeriesMobileAds("SCHEDULE", "SDLE", "AL");
    } else if (pageType === SeriesTabs.RESULT) {
      pageAds = cricketSeriesMobileAds("RESULT", "RSLT", "AL");
    } else {
      pageAds = cricketSeriesMobileAds("LIVESCORECARD", "LIVESCRCRD", "AS");
    }
  } else {
    const adSlotNames = generateSeriesDesktopAds(pageType);
    pageAds = cricketSeriesAds(adSlotNames);
  }

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: pageType.toUpperCase(),
    block_ads: "no",
  });
  let taboolaList = TaboolaList.category;

  let pageData = {
    pageContent,
    menuData,
    pageAds,
    pageSeo,
    footerData,
    currentUrl,
    categoryName: `${seriesDisplayName} ${pageType.toUpperCase()}`,
    crMenu: arrayOnly(crMenu),
    _1xbetData,
    paramObj,
    config: googleRemoteConfig,
    taboolaList,
    isMobile,
    // districtList,
    seriesId,
    trendingTags,
  };
  return { props: { pageData } };
};
export default cnSeriesProps;
