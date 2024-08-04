import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { cricketVideo as videoAds } from "includes/Desktop/dfpAdIds";
import { cricketVideo as videoMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, ignoreQueryParams } from "includes/article.util";
import { getCricketVideoDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getMenu, getRedisDataByMultiKey, getGoogleConfig, getDistricts, getArticleList,getRedisDataByKey } from "api_dns/global/Common";

const cnVideosProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  //const currentUrl = context.req.url;
  let currentUrl = ignoreQueryParams(context.req.url, false);
  const pageLimit = isMobile ? 16 : 20;

  const urlParam = context.query;

  let VideosUrl = ignoreQueryParams(currentUrl, false).split("page")[0];

  let pageNumber = parseInt(urlParam.page) || 1;

  let offset = pageNumber ? (pageNumber - 1) * pageLimit : 0;
  
  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-cricket_trending_topic";
  let footerData = [], crMenu = [], get1xBet = [], trendingTags={};

  let [
      latestStories = {},
      menuData = {},
      googleRemoteConfig = {},
      // districtList = {},
      redisMultiResults = [],
      categorySponserData = {},
  ] = await Promise.allSettled([
      getArticleList({offset:offset, count: pageLimit, filter: { post_type:"videos","subsection.id":"29" }, fields: 'display_headline,weburl_r,images,weburl,headline'}),        
      getMenu(isMobile),
      getGoogleConfig(),
      // getDistricts(),
      getRedisDataByMultiKey(multiRedisString),
      getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]).then(temp => temp?.map(r=>r.value)).catch();

  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );

  if (Object.keys(redisMultiResults)?.length > 0) { 
      let keys = Object.keys(redisMultiResults);   
      [footerData, crMenu, get1xBet, trendingTags] = keys.map(i => redisMultiResults[i]? redisMultiResults[i]: []);
  }

  // let _1xbet =
  //   get1xBet &&
  //   Object.values(get1xBet)?.length &&
  //   Object.values(get1xBet).filter(
  //     (sponsors) => sponsors?.Event_Page === "/cricket/"
  //   );

  // let _1xbetData = _1xbet?.[0]?.sponserdata || [];
  const _1xbetData = catSponData?.sponserdata || [];


  let { title, desc, keywords } = getCricketVideoDetails();
  const pageSeo = {
    title,
    keywords,
    description: desc,
    canonical: publicRuntimeConfig.siteUrl + "cricket/videos/",
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    isCricketNextHome: true,
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      "Cricket Videos in Hindi, Latest Match Videos, Highlights, Interviews",
      "Watch Latest cricket videos, Live Coverage, news, Interviews, Match Highlights and more.",
      "Cricket Videos, Cricket Video Galleries, Videos News, Photos",
      publicRuntimeConfig.siteUrl + "cricket/videos/",
      null,
      true,
      false,
      true
    ) || "";

  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(
    arrayOnly(crMenu)
  );

  const pageAds = isMobile ? videoMobileAds() : videoAds();

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: publicRuntimeConfig.siteUrl + "cricket/videos/",
    article_id: "",
    section: "Cricket-VIDEOS",
    block_ads: "no",
  });
  let taboolaList = TaboolaList.category;

  let pageData = {
    latestStories,
    menuData,
    pageAds,
    pageSeo,
    footerData,
    pageLimit,
    currentUrl,
    VideosUrl,
    // districtList,
    pageNumber,
    categoryName: "CRICKET VIDEOS",
    crMenu: arrayOnly(crMenu),
    _1xbetData,
    config: googleRemoteConfig,
    taboolaList,
    isMobile,
    trendingTags,
  };

  // Pass data to the page via props
  return { props: { pageData } };
};
export default cnVideosProps;
