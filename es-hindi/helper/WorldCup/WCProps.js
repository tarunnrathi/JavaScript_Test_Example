import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { T20WcHomeAds as homeAds } from "includes/Desktop/dfpAdIds";
import { T20WcHome as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, getSponserData } from "includes/article.util";
import { getWcHomeDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import {
  getRedisDataByMultiKey,
  getMenu,
  getArticleList,
  getPriorityData,
  getRedisDataByKey,
} from "api_dns/global/Common";
import {
  getPointTableData,
  getMostRunData,
  getMostWicketData,
  getStatsData,
} from "api_dns/individual/worldCup";
import { filterTrackerData } from "includes/ipl.helper";
// import { getArticleById } from "api/individual/Article";
import { breadCrumbSchema } from "api/Constant";

const getWcStatData = (statsData) => {
  const wcTracker = statsData || {};
  const bat = filterTrackerData(wcTracker.bat);
  const bowl = filterTrackerData(wcTracker.bowl);
  const field = filterTrackerData(wcTracker.field);
  return { bat, bowl, field };
};

const WCProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";

  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;

  const multiRedisString =
    "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-nw_worldcup23_players_2023,KHABARN18-NW_WORLDCUP2023_FEATUREPANEL_2023,KHABARN18-nw_worldcup23_video";

  let footerData = [],
    crMenu = [],
    get1xBet = [],
    WcPlayerOfTheDay = [],
    featureData = [];
    
  let [
    photoGalleryWc = [],
    latestStories = [],
    menuData = {},
    redisMultiResults = [],
    pointTableData = [],
    mostRunData = [],
    mostWicketdata = {},
    statsData = [],
    priorityNews = [],
    WCSwitcher = [],
    worldCupVideo = [],
    interestingFacts= [],
  ] = await Promise.allSettled([
    getArticleList({
      count: 5,
      filter: { post_type: "photogallery", "tags.slug": "world-cup-2023" },
      fields: "display_headline,weburl_r,images,headline",
    }),
    getArticleList({
      count: 20,
      filter: { post_type: "text", "tags.slug": "world-cup-2023" },
      fields: "display_headline,weburl_r,images,weburl",
    }),
    getMenu(isMobile),
    getRedisDataByMultiKey(multiRedisString),
    getPointTableData(),
    getMostRunData(),
    getMostWicketData(),
    getStatsData(),
    getPriorityData({
      section: "cricket_worldcup_2023",
      subSection: "NA",
      count: 10,
      fallback: false,
      filter: false,
      fields: false,
    }),
    getRedisDataByKey("nw_worldcup_switcher_2023", "KHABARN18-"),
    getRedisDataByKey("nw_worldcup23_video", "KHABARN18-"),
    getArticleList({count: 11, filter: {'tags.slug':'kisse-india-pak-ke' }, fields: 'id,display_headline,weburl_r,images,headline'}),
  ])
    .then((temp) => temp?.map((r) => r.value))
    .catch();

  if (Object.keys(redisMultiResults)?.length > 0) {
    let keys = Object.keys(redisMultiResults);
    [
      footerData,
      crMenu,
      get1xBet,
      WcPlayerOfTheDay,
      featureData,
    ] = keys.map((i) => (redisMultiResults[i] ? redisMultiResults[i] : []));
  }

  let _1xbetData = getSponserData('/world-cup/', get1xBet);

  let { title, desc, keywords } = getWcHomeDetails();

  let breadCrumbArray = breadCrumbSchema(currentUrl, '')

  const pageSeo = {
    title,
    keywords,
    description: desc,
    canonical: publicRuntimeConfig.siteUrl + "world-cup/",
    og_image:
      "https://hindi.news18.com/images/siteimages/News18_Hindi_logo_1631086645.svg?impolicy=website&width=130&height=68",
    isCricketNextHome: true,
    ampHtml: publicRuntimeConfig.siteUrl + "amp/world-cup/",
    page: "Home",
    breadCrumbArray
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      "ICC Cricket World Cup 2023: Get Latest News Update of Cricket World Cup Cricket Match Time Table Schedule Points Table Result Player List on News18 Hindi",
      "ICC Cricket World Cup 2023: Get ready for unparalleled cricket excitement with ICC World Cup 2023! Stay updated on thrilling World Cup Cricket Matches, standout performances, and unforgettable moments in this pinnacle of international cricket",
      "Cricket World Cup 2023, World Cup 2023, Men's World Cup 2023 Schedule, ICC Cricket World Cup Points Table, ICC World Cup Match Time Table, World Cup News, World Cup Match Result, World Cup Latest News, World Cup Photos, World Cup Highlights, World Cup News Today",
      publicRuntimeConfig.siteUrl + "/world-cup/",
      null,
      true,
      false,
      true,
    ) || "";

  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(
    arrayOnly(crMenu),
  );

  const pageAds = isMobile ? homeMobileAds() : homeAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "Cricket",
    block_ads: "no",
  });

  const worldCupStatData = getWcStatData(statsData);

  let topNews = { left: [], right: [] };

  if(priorityNews.length > 0) {
    topNews.left = isMobile ? priorityNews.slice(0, 1) : priorityNews.slice(0, 3);
    topNews.right = isMobile ? priorityNews.slice(1, 6) : priorityNews.slice(3, 10);
  }

  // const getDataById = async(idArray, pushArray) => {
  //   for(let articleId of idArray) {
  //     let data = await getArticleById(articleId)
  //     if(Object.keys(data || {}).length > 0) pushArray.push(data)
  //   }
  // }

  let WcFeatureData = [];
  // const getDataPromises = featureData?.map(async (story) => {
  //   let idArr = [];
  //   let storyArr = [];
  //   story.data.forEach((data) => idArr.push(data.story_id));
  
  //   await getDataById(idArr, storyArr);
  //   WcFeatureData.push({ ...story, data: storyArr });
  // });
  
  // await Promise.all(getDataPromises);

  let taboolaList = TaboolaList.category;
  let pageData = {
    menuData,
    pageAds,
    pageSeo,
    footerData,
    crMenu: arrayOnly(crMenu),
    _1xbetData,
    taboolaList,
    isMobile,
    pointTableData,
    mostRunData,
    mostWicketdata,
    statsData: worldCupStatData,
    WcFeatureData,
    WcPlayerOfTheDay,
    photoGalleryWc,
    latestStories,
    worldCupVideo,
    WCSwitcher,
    interestingFacts,
    topNews,
  };

  // Pass data to the page via props
  return { props: { pageData } };
};

export default WCProps;
