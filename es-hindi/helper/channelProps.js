import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { checkDevice, getSetTargettingValues } from "includes/helper";
// import fetchUtility from "includes/sFetchUtility";
import { videos as categoryAds } from "includes/Desktop/dfpAdIds";
import { videos as categoryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { jsonLdForWebPage } from "includes/schema.util";
import { capIt, ignoreQueryParams } from "includes/article.util";
import { TaboolaList } from "includes/Tabola.helper";
import video_category from "./videoCategoryData";
import {
  RhstopStory,
  RhsphotoStories,
  getMiscData,
  getRedisDataByKey,
  getArticleList,
  getMenu,
  getGoogleConfig,
  getDistricts,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";
import { getTopNews } from "api_dns/individual/Home";
import { getArticleById } from "api_dns/individual/Article";
import { validSlugChecker } from "includes/_app.util";

const channelProps = async (context, isNews = false, isAmp = false) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  const urlParam = context.query;
  const channel = urlParam.channel || "";

  const id = urlParam.post_id;
  const cat = urlParam.cat || "";

  if (channel && !validSlugChecker(channel)) {
    return {
      notFound: true,
    };
  }

  const cat_offset = channel === "latest" ? 7 : 0;

  const category_videos =
    channel === "latest"
      ? { post_type: "videos" }
      : channel === "local18"
      ? { not: { local18_video: "" } }
      : { "categories.slug": `${channel}`, post_type: "videos" };

      const articleData = await getArticleById(id) || [];

  let channel_title = channel === "latest" ? "लेटेस्ट" : capIt(channel);
  video_category.forEach((item) => {
    if (item.key === channel) {
      channel_title = item.title;
    }
  });
  let videosText = "";
  const homeText = "Hindi News"; //'होम';
  videosText = "Videos"; //'न्यूज';

  let breadCrumbArray = [];
  let tempobj = {};

  const _page = "Videos";

  tempobj = [
    { slug: "/", value: homeText },
    { slug: "/videos/", value: videosText },
    { slug: "", value: channel_title },
  ];

  breadCrumbArray = tempobj;
  let titleDiv = "";
  titleDiv +=
    '<div class="top-news-title"><h1>' +
    channel_title +
    " वीडियो न्यूज़</h1></div>";
  let page_title = "",
    page_description = "",
    page_keywords = "",
    page_url = "",
    thumbnailUrl = "";

  page_title =
    "News18 हिंदी Videos " +
    channel_title +
    ": Latest Hindi News Videos, टॉप न्यूज़ वीडियो, News Videos Clip " +
    channel_title;

  page_description =
    "हिंदी न्यूज़ वीडियो " +
    channel_title +
    " (News Videos in Hindi) - Watch " +
    channel_title +
    " latest news videos in hindi from " +
    channel_title +
    " India and around the World, " +
    channel_title +
    " Breaking News videos and Top trending Video " +
    channel_title +
    ". Check out viral news videos, entertainment news, spiritual, sports videos and more only on  News18 हिंदी.";

  page_keywords =
    channel_title +
    " Hindi Khabar वीडियो, hindi news videos, " +
    channel_title +
    " news videos in hindi, हिंदी न्यूज़ वीडियो, न्यूज़ वीडियो, viral news videos, entertainment news videos, political news videos, sports news vieo, " +
    channel_title +
    " hindi videos, News18 हिंदी Videos, political news video, business video, entertainment video, celebrities videos";

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
  };

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
  // pageSeo.jsonLdForItemList =
  //   jsonLdForItemList(
  //     currentUrl ? currentUrl.split("?")[0] : "",
  //     topStoryArray.length || 0,
  //     topStoryArray || [],
  //     "Videos"
  //   ) || "";

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
  const cat_videos = {
    "categories.slug": `${cat ? cat : "nation"}`,
    post_type: "videos",
  };

  const [
    menuData = {},
    topNews = [],
    miscData = {},
    footerData = [],
    topStories = [],
    googleRemoteConfig,
    districtList = {},
    photoStories = [],
    topPriorityStories = [],
    trendingStories = {},
    topStoryArray = [],
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getTopNews(),
    getMiscData({ trendingTags: true }),
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    RhstopStory(cat_videos, id),
    getGoogleConfig(),
    isAmp && getDistricts(),
    RhsphotoStories(),
    RhstopStory(cat_videos, id),
    //RhstrendingStories(cat)
    {},
    getArticleList({
      count: 23,
      offset: cat_offset,
      filter: category_videos,
      fields: `story_id,display_headline,images,weburl_r,weburl,updated_at`,
    }),
  ]);

  const _pageParam = {
    category: "videos",
    page: _page,
    newsType: "videos",
  };
  const page = "video";
  const taboolaList = TaboolaList.videoPage;
  const cd20value = "video";
  const pageData = {
    taboolaList,
    isMobile,
    menuData,
    topNews,
    cd20value,
    miscData,
    pageAds,
    pageSeo,
    page,
    districtList,
    breadCrumbArray,
    titleDiv,
    _pageParam,
    footerData,
    topStories,
    topStoryArray,
    // video_categoryresults,
    video_category,
    currentUrl: currentUrl ? currentUrl.split("?")[0] + "/" : "",
    config: googleRemoteConfig,
    photoStories,
    topStory: { rhsTopStoryListing: topPriorityStories },
    trendingStories,
    articleData,
    urlParam,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};

export default channelProps;
