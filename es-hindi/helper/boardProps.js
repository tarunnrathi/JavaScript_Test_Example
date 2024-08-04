import { checkDevice, getSetTargettingValues } from "includes/helper";
import { ignoreQueryParams } from "includes/article.util";
import { boardResultConsum as generateDesktopAds } from "includes/Desktop/dfpAdIds";
import { boardResultConsum as generateMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import {
  getMenu,
  getMiscData,
  getRedisDataByKey,
  getDistricts,
  getArticleList,
  getGoogleConfig,
  // GetCategoryArticles,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";
import { getBoardResults } from "api_dns/individual/BoardResult";
import { TaboolaList } from "includes/Tabola.helper";
const boardProps = async (context, isAmp = false) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url, false);
  const urlParam = context.query;
  const isClassData =
    urlParam?.board?.includes("10") ||
    urlParam?.board?.includes("12") ||
    urlParam?.board?.includes("11") ||
    urlParam?.board?.includes("SSC") ||
    urlParam?.board?.includes("HSC") ||
    urlParam?.board?.includes("Plus Two") ||
    urlParam?.board?.includes("Inter 1st Year") ||
    urlParam?.board?.includes("Inter 2nd Year") 
      ? true
      : false;
  let [
    boardData = [],
    // boardFQA = [],
    menuData = {},
    miscData = {},
    topPriorityStories = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    googleRemoteConfig = {},
    districtList = {},
    relatedNewsData = [],
    categorySponserData = {},
  ] = await Promise.all([
    getBoardResults(urlParam),
    // getBoardFAQ(urlParam),
    getMenu(isMobile),
    getMiscData({ trendingTags: true, image: true }),
    !isMobile
      ? getArticleList({
          count: 5,
          offset: 0,
          fields: "story_id,headline,images,display_headline,weburl",
          filter: { post_type: "news" },
        })
      : [],
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
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
    getGoogleConfig(),
    isAmp && getDistricts(),
    getArticleList({
      count: 8,
      offset: 0,
      fields: "story_id,headline,images,display_headline,weburl",
      //filter : { "tags.slug": urlParam?.board },
      filter: { "tags.slug": "board-results" },
    }),
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]);

  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];

  let parent = isClassData? await getBoardResults({board:boardData[0]?.parent}):[];
  if(isClassData && parent[0]?.page_details?.length > 0 ){
    boardData[0].page_details = parent[0].page_details
  }
  let pageSeo = {
    ...context.pageSeo,
    ...{
      canonical: currentUrl,
      og_image: `https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png`,
      og_title: "",
      title: boardData?.length > 0 ? boardData[0]?.meta_title : "",
      description: boardData?.length > 0 ? boardData[0]?.meta_description : "",
      keywords: boardData?.length > 0 ? boardData[0]?.meta_keyword : "",
    },
  };
  const breadCrumbArray = [
    { value: "हिंदी न्यूज", slug: "/" },
    {
      value: "All India Board Result 2024 (बोर्ड रिजल्ट 2024)",
      slug: "/india-result/",
    },
    { value: boardData?.[0]?.title || "बोर्ड रिजल्ट 2024" ,
      slug: currentUrl
    },
  ];
  pageSeo.breadCrumbArray = breadCrumbArray;
  const pageAds = isMobile ? generateMobileAds("") : generateDesktopAds("");
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo?.title || "",
    description: pageSeo?.description || "",
    seo_keywords: pageSeo?.keywords || "",
    weburl: currentUrl || "",
    article_id: "",
    block_ads: "no",
  });
  let taboolaList = TaboolaList.category;
  const boardResultYear = 2024;
  const pageData = {
    board: urlParam?.board,
    taboolaList,
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
    boardData,
    relatedNewsData,
    breadCrumbArray,
    boardResultYear,
    //boardFQA,
    isClassData,
    _1xbetData,
  };
  return { props: { pageData } };
};
export default boardProps;