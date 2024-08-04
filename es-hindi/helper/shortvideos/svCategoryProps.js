import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { shortvideos as shortvideosAds } from "includes/Desktop/dfpAdIds";
import { shortvideos as shortvideosMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { jsonLdForHomeOrganization } from "includes/schema.util";
import categoryHelper from "includes/category.helper";
import { getArticleList, getGoogleConfig, getMenu, getMiscData, getRedisDataByKey } from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";

const svCategoryProps = async (context) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = protocol + host + context.req.url;
  const urlParam = context.query;
  const _param = urlParam;
  let section = context.query.section;
  let isCatPresent = categoryHelper
    .shortVideoCategory()
    .some((cat) => cat.section === section);

  if (!isCatPresent) {
    return {
      notFound: true,
    };
  }

  let homeText,
    videosText = "";
  homeText = "Hindi News";
  videosText = "Videos";

  let breadCrumbArray = [];
  let tempobj = {};

  let _page = "Videos";

  tempobj = [
    { slug: "/", value: homeText },
    { slug: "/videos/", value: videosText },
  ];

  breadCrumbArray = tempobj;
  let titleDiv = "";
  titleDiv += '<div class="top-news-title"><h1>Video News</h1></div>';

  let page_title, page_description, page_keywords, page_url, thumbnailUrl;

  page_title = `${section} Short Videos: Watch Youtube Trending Shorts & Instagram Reels @ News18 Hindi`;
  page_description = `${section} Latest Viral Videos: Watch Youtube, Facebook, Twitter & Instagram latest ${section} videos online. देखें यूट्यूब शॉर्ट्स, फेसबुक वीडियोस और इंस्टाग्राम रील न्यूज़ 18 शॉर्ट्स पर`;
  page_keywords = `${section} Short Videos, ${section} Youtube Trending Shorts, Instagram Reels, Twitter Videos`;

  let siteUrl = publicRuntimeConfig.siteUrl;
  let news = siteUrl + "videos/";
  page_url = news;
  thumbnailUrl =
    "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png";
  let pageSeo = {
    title: page_title || "404 Not Found",
    description: page_description,
    keywords: page_keywords,
    canonical: currentUrl.split("page")[0],
    og_image: thumbnailUrl,
    // news: news,
    pageUrl: siteUrl,
    og_title: page_title,
    og_description: page_description,
    section,
    pageName: "category",
  };

  pageSeo.jsonLdForOrganization = jsonLdForHomeOrganization() || "";

  const pageAds = isMobile
    ? shortvideosMobileAds(urlParam, false)
    : shortvideosAds(urlParam, false);

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: page_title,
    description: page_description,
    seo_keywords: page_keywords,
    weburl: currentUrl,
    section: "short-video",
    content_type: "short-video",
    block_ads: "no",
    meta_keywords: page_keywords,
    header: page_title,
  });
  let short_videos= { "categories.slug": "originals","nw_auto_yt_video_type":"shorts"};
  let [
    menuData = {},
    miscData = {},
    footerData = [],
    googleRemoteConfig,
    categoryShortsData = [],
    RhsBiharNews = [],
    RhsRajasthanNews = [],
  ] = await Promise.all([
      getMenu(isMobile),

      getMiscData({ trendingTags: true }),

   
      getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
      getGoogleConfig(),
    getArticleList({count: isMobile ? 10 : 28, offset: 0, filter: short_videos,  fields:`story_id,display_headline,images,weburl_r,weburl`}),
    !isMobile ?
    getArticleList({count: 5, filter: { post_type:"text","categories.id":"220" }, fields: 'display_headline,weburl_r,images,weburl,weburl_r'}): [],
    !isMobile ?
    getArticleList({count: 5, filter: { post_type:"text","categories.id":"2912" }, fields: 'display_headline,weburl_r,images,weburl,weburl_r'}): [],
  ]);

  let _pageParam = {
    category: "short-videos",
    page: _page,
    newsType: "short-videos",
  };

  const pageData = {
    isMobile,
    menuData,
    miscData,
    pageAds,
    pageSeo,
    breadCrumbArray,
    titleDiv,
    _pageParam,
    footerData,
    config: googleRemoteConfig,
    shortsData:categoryShortsData,
    section,
    RhsBiharNews,
    RhsRajasthanNews,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};

export default svCategoryProps;
