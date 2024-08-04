import { cricketResult as mobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { cricketResult as desktopAds } from "includes/Desktop/dfpAdIds";
import { arrayOnly } from "includes/article.util";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { TaboolaList } from "includes/Tabola.helper";
import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { getMenu, getRedisDataByMultiKey, getGoogleConfig, getCricketData, getDistricts,getRedisDataByKey } from "api_dns/global/Common";

const Result = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let host = context.req?.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  const currentUrl = protocol + host + encodeURI(context.req && context.req.url);
  let seriesname = context.query?.seriesname ? context.query?.seriesname : "";

  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-cricket_trending_topic";
  let footerData = [], crMenu = [], get1xBet = [], trendingTags={};

  let [
      resultApiData = [],
      menuData = {},
      googleRemoteConfig = {},
      // districtList = {},
      redisMultiResults = [],
      categorySponserData = {},
  ] = await Promise.allSettled([
      getCricketData('match-results'),
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
      [footerData, crMenu, get1xBet,trendingTags] = keys.map(i => redisMultiResults[i]? redisMultiResults[i]: []);
  }

  const pageAds = isMobile ? mobileAds() : desktopAds();

  var title = `Cricket Results, Recent Match Report, Statistics and Cricket Series Updates`;
  var description = `Find Recent (Latest) Cricket Match Results and Statistics, Played Match Summary with Complete Cricket Scorecard Details, Venue Profile, All Local and international Cricket Series Updates.`;
  var keywords = `Cricket results, match summary, cricket scorecards, live cricket match reports, cricket results`;

  // let _1xbetData =
  //   get1xBet &&
  //   Object.values(get1xBet)?.length &&
  //   Object.values(get1xBet)?.filter(
  //     (sponsors) => sponsors?.Event_Page === "/cricket/"
  //   );

  const _1xbetData = catSponData?.sponserdata || [];


  const pageSeo = {
    title,
    keywords,
    description,
    canonical: currentUrl,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    isCricketNextHome: true,
  };

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "CRICKET-RESULTS",
    block_ads: "no",
  });

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

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "CRICKET-RESULTS",
    block_ads: "no",
  });

  let taboolaList = TaboolaList.category

  const pageData = {
    isMobile,
    footerData,
    crMenu: arrayOnly(crMenu),
    pageSeo,
    menuData: menuData || {},
    currentUrl,
    pageAds: {},
    RecentMatchresult: resultApiData,
    seriesname,
    pageAds,
    isIPL2022: {},
    categoryName: "MATCH RESULT",
    _1xbetData,
    chartBeat: {
      section: "Cricketnext",
      subsection: "Results",
      type: "Category",
    },
    config: googleRemoteConfig,
    taboolaList,
    isMobile,
    // districtList,
    trendingTags
  };
  return {
    props: { pageData },
  };
};

export default Result;
