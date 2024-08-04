import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { videos as categoryAds } from "includes/Desktop/dfpAdIds";
import { videos as categoryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { jsonLdForWebPage, jsonLdForItemList } from "includes/schema.util";
import { TaboolaList } from "includes/Tabola.helper";
import video_category from "./videoCategoryData";
import {
  RhsphotoStories,
  getMiscData,
  getRedisDataByKey,
  getDistricts,
  getArticleList,
  getGoogleConfig,
  RhstopStory,
  getMenu,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";
import { getTopNews } from "api_dns/individual/Home";
import { getArticleById } from "api_dns/individual/Article";

const videosProps = async (context, isNews = false, isAmp = false) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;
  const urlParam = context.query;
  const id = urlParam.post_id;
  const cat = urlParam.cat || "";
  const homeText = "Hindi News";
  const videosText = "Videos";

  let breadCrumbArray = [];
  let tempobj = {};

  let _page = "";
  _page = "Videos";

  tempobj = [
    { slug: "/", value: homeText },
    { slug: "/videos/", value: videosText },
  ];

  breadCrumbArray = tempobj;
  // let titleDiv = "";
  // titleDiv += '<div class="top-news-title"><h1>Video News</h1></div>';

  let page_title = "",
    page_description = "",
    page_keywords = "",
    page_url = "",
    thumbnailUrl = "";

  page_title =
    "News18 हिंदी Videos: Latest Hindi News Videos, टॉप न्यूज़ वीडियो, News Videos Clips";
  page_description =
    "हिंदी न्यूज़ वीडियो (News Videos in Hindi) - Watch latest news videos in hindi from India and around the World," +
    " Breaking News videos and Top trending Video. Check out viral news videos, entertainment news, spiritual, sports videos and more only on  News18 हिंदी.";
  page_keywords =
    "Hindi Khabar वीडियो, hindi news videos, news videos in hindi," +
    " हिंदी न्यूज़ वीडियो, न्यूज़ वीडियो, viral news videos, entertainment news videos, political news videos, sports news vieo, hindi videos, " +
    "News18 हिंदी Videos, political news video, business video, entertainment video, celebrities videos";

  const { siteUrl } = publicRuntimeConfig;
  const news = siteUrl + "videos/";
  page_url = news;
  thumbnailUrl =
    "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png";
  const pageSeo = {
    title: page_title || "404 Not Found",
    description: page_description,
    keywords: page_keywords,
    canonical: currentUrl.split("page")[0],
    og_image: thumbnailUrl,
    news: news,
    pageUrl: page_url,
    og_title: page_title,
    og_description: page_description,
    section: "video",
    page: "video",
  };
  const articleData = await getArticleById(id) || [];
  const cat_videos = {
    "categories.slug": `${cat ? cat : "nation"}`,
    post_type: "videos",
  };

  const [
    menuData = {},
    topNews = [],
    miscData = {},
    footerData = [],
    googleRemoteConfig,
    districtList = {},
    topStoryArray = {},
    photoStories = [],
    topStories = [],
    topPriorityStories = [],
    // trendingStories = {},
    categorySponserData = {},
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getTopNews(),
    getMiscData({ trendingTags: true }),
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    getGoogleConfig(),
    isAmp && getDistricts(),
    getArticleList({
      count: 15,
      offset: 0,
      filter: { post_type: "videos" },
      fields: `story_id,display_headline,images,weburl_r,weburl,updated_at`,
      sortBy: "updated_at"
    }),
    RhsphotoStories(),
    RhstopStory(cat_videos, id),
    {},
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]);
  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];
  
  const video_category_data = video_category.map((category) => {
    let category_videos = {};
    if (category?.key === "local18") {
      category_videos = { not: { local18_video: "" } };
    } else {
      category_videos = {
        "categories.slug": `${category.key}`,
        post_type: "videos",
      };
    }
    return new Promise((resolve) => {
      resolve(
        getArticleList({
          count: 10,
          offset: 0,
          filter: category_videos,
          fields: `story_id,display_headline,images,weburl_r,weburl,updated_at`,
          sortBy: "updated_at"
        }),
      );
    });
  });
  const video_categoryresults = await Promise.all(video_category_data);

  //schema related code starts here
  const metaTitle = page_title;
  const metaDesc = page_description;
  const metaKeywords = page_keywords;
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      metaTitle,
      metaDesc,
      metaKeywords,
      currentUrl ? currentUrl.split("?")[0] : "",
      "",
      false,
      true,
    ) || "";
  pageSeo.jsonLdForItemList =
    jsonLdForItemList(
      currentUrl ? currentUrl.split("?")[0] : "",
      topStoryArray.length,
      topStoryArray,
      "Videos",
    ) || "";

  const pageAds = isMobile
    ? categoryMobileAds(urlParam, false)
    : categoryAds(urlParam, false);

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: page_title,
    description: page_description,
    seo_keywords: page_keywords,
    weburl: currentUrl,
    section: "Videos",
    content_type: "Videos",
    block_ads: "no",
    meta_keywords: page_keywords,
    header: page_title,
  });

  const _pageParam = {
    category: "videos",
    page: _page,
    newsType: "videos",
  };
  const taboolaList = TaboolaList.category;
  const cd20value = "video";
  const pageData = {
    taboolaList,
    isMobile,
    menuData,
    topNews,
    miscData,
    currentUrl,
    pageAds,
    pageSeo,
    cd20value,
    districtList,
    breadCrumbArray,
    // titleDiv,
    _pageParam,
    footerData,
    topStories,
    topStoryArray,
    photoStories,
    topPriorityStories,
    articleData,
    urlParam,
    video_categoryresults,
    video_category,
    config: googleRemoteConfig,
    _1xbetData
  };
  // Pass data to the page via props
  return { props: { pageData } };
};

export default videosProps;
