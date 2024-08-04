import { arrayOnly, ignoreQueryParams } from "includes/article.util";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { cricketLiveScorePage as mobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { cricketLiveScorePage as desktopAds } from "includes/Desktop/dfpAdIds";
import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getMenu, getRedisDataByMultiKey, getGoogleConfig, getArticleList, getCricketData, getDistricts,getRedisDataByKey } from "api_dns/global/Common";

const livescoreProps = async (context) => {

  const isMobile = checkDevice(context);
  let userAgent;
  if (context.req) {
    userAgent = context.req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  currentUrl =
    currentUrl[currentUrl.length - 1] != "/" ? currentUrl + "/" : currentUrl;

  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-cricket_trending_topic";
  let footerData = [], crMenu = [], get1xBet = [],trendingTags={};

  let [
      livescorecard = [],
      latestStories = [],
      menuData = {},
      googleRemoteConfig = {},
      // districtList = {},
      redisMultiResults = [],
      categorySponserData = {},
  ] = await Promise.allSettled([
      getCricketData('live-matches'),
      getArticleList({count: 20, filter: { post_type:"text","subsection.id":"29" }, fields: 'display_headline,weburl_r,images,weburl'}),        
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

  let upMatches = [];
  let recentMatches = [];

  let upcoming = false;

  const pageAds = isMobile ? mobileAds() : desktopAds();

  //header sponser ad
  // let _1xbet =
  //   get1xBet &&
  //   Object.values(get1xBet)?.length &&
  //   Object.values(get1xBet)?.filter(
  //     (sponsors) => sponsors?.Event_Page === "/cricket/live-score/"
  //   );

  // let _1xbetData = _1xbet?.[0]?.sponserdata || [];
  const _1xbetData = catSponData?.sponserdata || [];

  //seo

  let title =
    "Live Cricket Scores, Fastest Cricket Scorecards, Cricket Series Schedule & Stats";
  let desc =
    "Live Cricket: Find Fastest Live Cricket Scorecard with Latest Match Reports & Live Commentary, Special coverage of Live Cricket from the world, Recent and Upcoming Cricket Series Schedule";
  let keywords =
    "Live cricket, cricket live, Live Cricket Coverage, Cricket  Series, Upcoming  Cricket Match, Live Score ODI , Test Match Live";
  const pageSeo = {
    title:
      title ||
      "Live Cricket Scores, Fastest Cricket Scorecards, Cricket Series Schedule & Stats",
    og_title: title || "",
    keywords,
    description: desc || "",
    pageUrl: currentUrl,
    isCricketNextLiveScore: true,
    jsonLdForWebPage: jsonLdForWebPage(
      title,
      desc,
      keywords,
      currentUrl,
      {},
      true,
      false,
      true
    ),

    jsonLdForCricketSiteNavigation: jsonLdForCricketSiteNavigation(
      arrayOnly(crMenu)
    ),
    canonical: currentUrl,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    section: "cricket-live-score",
  };
  
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: title || '',
    description: desc || '',
    seo_keywords: keywords || "",
    weburl: currentUrl,
    article_id: "",
    section: "MATCHES LIVE SCORES",
    block_ads: "no",
  });

  let taboolaList = TaboolaList.category
  const pageData = {
    currentUrl,
    footerData,
    pageAds,
    upcoming,
    pageSeo,
    upMatches,
    recentMatches,
    categoryName: "MATCH LIVE SCORES",
    menuData,
    latestStories,
    livescorecard,
    _1xbetData,
    crMenu: arrayOnly(crMenu),
    config: googleRemoteConfig,
    taboolaList,
    isMobile,
    // districtList,
    trendingTags,
  };

  return { props: { pageData } };
};
export default livescoreProps;
