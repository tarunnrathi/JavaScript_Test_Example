import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { category as categoryAds } from "includes/Desktop/dfpAdIds";
import { category as categoryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { ignoreQueryParams, arrayOnly } from "includes/article.util";
import {
  getRedisDataByMultiKey,
  getMenu,
  getDistricts,
  getMiscData,
  getGoogleConfig,
  getArticleList,
} from "api_dns/global/Common";

const rssProps = async (context, isAmp = false) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  const urlParam = context.query;

  let redisMulti = "";
  if (isMobile) {
    redisMulti =
      "KHABARN18-new_fms_system,KHABAR:HEADEMENU_L1,KHABARN18-bottomofpage,KHABARN18-SPONSER_MODULE_POSITION-home-page-banners,KHABARN18-amp_jio_savan,CRICKETNEXT:mainmenu";
  } else {
    redisMulti =
      "KHABARN18-new_fms_system,KHABARN18-bottomofpage,KHABARN18-SPONSER_MODULE_POSITION-home-page-banners,CRICKETNEXT:mainmenu";
  }

  let footerData = [],
    CTAtext = [],
    dynamicBanner = [],
    addSavaan = false,
    crMenu = [],
    stories = [];

  let [
    menuData = [],
    topPriorityStories = [],
    topStories = [],
    photoStories = [],
    photoTs = [],
    googleRemoteConfig = {},
    redisMultiResults = {},
    districtList = {},
    trending = [],
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getArticleList({
      count: 5,
      offset: 0,
      fields: "story_id,headline,images,display_headline,weburl",
      filter: { post_type: "photogallery" },
    }),
    getArticleList({
      count: 5,
      offset: 0,
      fields: "story_id,headline,images,display_headline,weburl",
      filter: {},
    }),
    getArticleList({
      count: 9,
      offset: 0,
      fields: "story_id,headline,images,display_headline,weburl,gallery_count",
      filter: { post_type: "photogallery" },
    }),
    getArticleList({
      count: 4,
      offset: 0,
      fields: "story_id,headline,images,display_headline,weburl",
      filter: { post_type: "photogallery" },
    }),
    getGoogleConfig(),
    getRedisDataByMultiKey(redisMulti),
    isAmp && getDistricts(),
    getMiscData({ trendingTags: true }),
  ]);

  if (Object.keys(redisMultiResults)?.length > 0) {
    let keys = Object.keys(redisMultiResults);
    if (isAmp || isMobile) {
      [footerData, CTAtext, dynamicBanner, crMenu, addSavaan] = keys.map((i) =>
        redisMultiResults[i] ? redisMultiResults[i] : []
      );
    } else {
      [footerData, CTAtext, dynamicBanner, crMenu] = keys.map((i) =>
        redisMultiResults[i] ? redisMultiResults[i] : []
      );
    }
  }

  let seoPageTitle =
    "RSS Feeds for Latest News on Politics, Sports, Cricket, Bollywood: News18India";
  let pageDescription =
    "Subscribe to News18India RSS feeds and stay updated with the latest news on Politics, Sports, Cricket, Bollywood, Technology, Football, Movies, Entertainment, World and more.";
  let pageKeywords =
    "RSS Feeds, RSS Feeds for Latest News, News18India RSS Feeds";

  let siteUrl = publicRuntimeConfig.siteUrl;
  let news = siteUrl + "news/";

  let finalURL = protocol + currentUrl?.split("/")[2] + "/" + "khabar-rss/";

  let pageSeo = {
    title: seoPageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    canonical: finalURL ? finalURL : currentUrl,
    pageUrl: finalURL || siteUrl,
  };
  const pageAds = isMobile
    ? categoryMobileAds(urlParam)
    : categoryAds(urlParam);
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: seoPageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    weburl: finalURL || currentUrl,
  });
  const trendingTags = trending.length === 0 ? [] : trending?.trendingTags;

  const pageData = {
    isMobile,
    currentUrl,
    urlParam,
    districtList,
    trendingTags,
    menuData,
    pageSeo,
    pageAds,
    topStory: { rhsTopStoryListing: topPriorityStories },
    footerData,
    topStories,
    photoStories,
    crMenu: arrayOnly(crMenu),
    photoTs,
    // iplAuctionList : iplAuctionList?.specialURL == currentUrl ? iplAuctionList : [],
    config: googleRemoteConfig,
    dynamicBanner: dynamicBanner || {},
    finalURL,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default rssProps;
