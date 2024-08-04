import { checkDevice, getSetTargettingValues } from "includes/helper";
import { ignoreQueryParams } from "includes/article.util";
import { staticPages as generateDesktopAds } from "includes/Desktop/dfpAdIds";
import { staticPagesMobile as generateMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import {
  getMenu,
  getMiscData,
  getRedisDataByKey,
  getDistricts,
  getArticleList,
  getGoogleConfig
} from "api_dns/global/Common";
import SITE_CONfIG from "config/site.config";
import { REDIS_KEYS } from "api/Constant";
import fetchUtilityDirect from "includes/sFetchUtilityDirect";

const staticPagesProps = async (context, isAmp = false) => {
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  let currentUrl = ignoreQueryParams(protocol + host + context.req.url, false);
  const urlParam = context.query;

  let [
    menuData = {},
    miscData = {},
    topPriorityStories = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    googleRemoteConfig = {},
    districtList = {},
    advertiseData = []
  ] = await Promise.all([
    getMenu(isMobile),    
    getMiscData({ trendingTags: true,image:true }),
    !isMobile ? getArticleList({
      count  : 5,
      offset : 0,
      fields : "story_id,headline,images,display_headline,weburl",
      filter : {"post_type":"news"},
    }) : [],
    !isAmp ? getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM) : [],
    getArticleList({
      count  : 5,
      offset : 0,
      fields : "story_id,headline,images,display_headline,weburl",
      filter : {},
    }),
     getArticleList({
      count  : 9,
      offset : 0,
      fields : "story_id,headline,images,display_headline,weburl,gallery_count",
      filter : {"post_type":"photogallery"},
    }),
    getGoogleConfig(),
    isAmp && getDistricts(),
    currentUrl.includes('advertise-with-us') ? fetchUtilityDirect(`${SITE_CONfIG.EnglishApiUrl}/getredisdata/NEWS18:nw_advt_data`, [], "advsData") : [],
  ]);

  const breadCrumbArray=[
    { value: "हिंदी न्यूज", slug: "/" },
    {
      value: "cookie-policy",
      slug: "/cookie-policy.html/",
    },
  ]
  let pageSeo = {...context.pageSeo, ...{
    canonical: currentUrl,
    og_image: `https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png`,
    og_title: context.pageSeo.pageTitle,    
    breadCrumbArray:breadCrumbArray
  }}

  const pageAds = isMobile ? generateMobileAds("") : generateDesktopAds("");

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo?.pageTitle || "",
    description: pageSeo?.pageDescription || "",
    seo_keywords: pageSeo?.pageKeywords || "",
    weburl: currentUrl || "",
    article_id: "",
    block_ads: "no",
  });

  let [ advsData = {} ] = advertiseData || [{}];

  const pageData = {
    isMobile,
    currentUrl,
    urlParam,
    menuData,
    pageSeo,
    pageAds,
    trendingTags: miscData.trendingTags || [],
    topStory: { rhsTopStoryListing: topPriorityStories },
    districtList,
    footerData,
    topStories,
    photoStories,
    isMobile,
    config: googleRemoteConfig,
    advsData,
  };
  return { props: { pageData } };
};
export default staticPagesProps;