import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { checkDevice, getSetTargettingValues } from "includes/helper";
// import fetchUtility from "includes/sFetchUtility";
import { shortvideos as shortvideosAds } from "includes/Desktop/dfpAdIds";
import { shortvideos as shortvideosMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { jsonLdForHomeOrganization } from "includes/schema.util";
import categoryHelper from "includes/category.helper";
// import fetch from "node-fetch";
import { getArticleList, getGoogleConfig, getMenu, getMiscData, getRedisDataByKey } from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";
import { TaboolaList } from "includes/Tabola.helper";


const svLandingProps = async (context) => {

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
  let shortVideosData = []

  let homeText,
    videosText = "";
  homeText = "Hindi News";
  videosText = "Videos";

  let breadCrumbArray = [];
  let tempobj = {};

  let _page,
    _breadCrumb = "";
  _page = "Videos";

  tempobj = [
    { slug: "/", value: "HOME" },
    { value: "SHORT VIDEOS" },
  ];

  breadCrumbArray = tempobj;
  let titleDiv = "";
  titleDiv += '<div class="top-news-title"><h1>Video News</h1></div>';

  let page_title, page_description, page_keywords, page_url, thumbnailUrl;

  page_title =
    "News18 Short Videos: Watch Youtube Trending Shorts & Instagram Reels @ News18 Hindi";
  page_description =
    "Latest Viral Videos: Watch Youtube, Facebook, Twitter & Instagram latest trending videos online on News18 Shorts.";
  page_keywords =
    "News18 Short Videos, Youtube Trending Shorts, Instagram Reels, Twitter Videos";

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
    page:"short-video-landing",
    // news: news,
    pageUrl: siteUrl,
    og_title: page_title,
    og_description: page_description,
    section: "short-video",
    pageName: "landing",
  };
  pageSeo.jsonLdForOrganization = jsonLdForHomeOrganization() || '';
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
  let shortVideoCategoryArray = categoryHelper.shortVideoCategory();
  let [
    shortVideoMain = [],
    menuData = {},
    miscData = {},
    footerData = [],
    googleRemoteConfig,
    RhsBiharNews = [],
    RhsRajasthanNews = [],
    categorySponserData = {},
  ] = await Promise.all([
    
    getArticleList({count: isMobile ? 10 : 28, offset: 0, filter: {nw_auto_yt_video_type:"shorts"},  fields:`story_id,display_headline,images,weburl_r,weburl,created_at`}),
    getMenu(isMobile),
    getMiscData({ trendingTags: true }),
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    getGoogleConfig(),
    !isMobile ?
    getArticleList({count: 5, filter: { post_type:"text","categories.id":"220" }, fields: 'display_headline,weburl_r,images,weburl'}): [],
    !isMobile ?
    getArticleList({count: 5, filter: { post_type:"text","categories.id":"2912" }, fields: 'display_headline,weburl_r,images,weburl'}): [],
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"), 
  ]);

  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];


  const make_api_call = async (cat) => {
  let short_videos= (cat)?{ "categories.slug": `${cat}`,"nw_auto_yt_video_type":"shorts"}:{"nw_auto_yt_video_type":"shorts"};
  let data1 = await getArticleList({count: 8, offset: 0, filter: short_videos,  fields:`story_id,display_headline,images,weburl_r,weburl`})
      return data1

  }

  const handleAllPromise = async (promises) => {
    let data = await Promise.allSettled(promises)
    shortVideosData = data.value
  }


  const promises = shortVideoCategoryArray.map((cat) => {
    return new Promise((resolve, reject) => {
      resolve(make_api_call(cat.section));
    });
  });

  if (!isMobile) {
    await handleAllPromise(promises);
  }


  shortVideosData = (shortVideosData || []).map((data, index) => {
    return { ...data, ...shortVideoCategoryArray[index] };
  });

  let _pageParam = {
    category: "short-videos",
    page: _page,
    newsType: "short-videos",
  };
  const taboolaList = TaboolaList.category
  const pageData = {
    // categoryShortsData:categoryShortsData?.result ? categoryShortsData?.result  : [],
    isMobile,
    shortsData:shortVideoMain,
    menuData,
    miscData,
    pageAds,
    pageSeo,
    breadCrumbArray,
    titleDiv,
    _pageParam,
    footerData,
    config: googleRemoteConfig,
    shortVideosData: shortVideosData || {},
    RhsBiharNews,
    RhsRajasthanNews,
    taboolaList,
    _1xbetData
  };
  // Pass data to the page via props
  return { props: { pageData } };
};

export default svLandingProps;
