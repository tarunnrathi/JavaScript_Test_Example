import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { checkDevice, getSetTargettingValues } from "includes/helper";
// import fetchUtility from "includes/sFetchUtility";
import { videos as categoryAds } from "includes/Desktop/dfpAdIds";
import { videos as categoryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { jsonLdForWebPage, jsonLdForItemList } from "includes/schema.util";
import {
  youtubeHelperGetChannelId,
  youtubeHelperGetChannel,
  youtubeHelperGetPlaylistId,
  youtubeHelperGetPlaylist,
  youtubeHelperTrendingData,
} from "includes/youtube.helper.js";
import {
  ignoreQueryParams,
  customizeUrl,
  getRedirection,
} from "includes/article.util";
import video_category from "./videoCategoryData";

const playlistProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = ignoreQueryParams(protocol + host + context.req.url);

  const urlParam = context.query;
  const pageNumber = parseInt(urlParam.page) || "";
  const recordsPerPage = 15;

  let validCategory = "";
  video_category.forEach((cat) => {
    if (cat.key === urlParam.channel) {
      validCategory = true;
    } else {
      validCategory = false;
    }
  });
  if (validCategory === false) {
    // context.res.statusCode = 404;
    // return {
    //   notFound: true,
    // }
    const redirect_url = await getRedirection(currentUrl);
    if (!redirect_url) {
      return {
        notFound: true,
      };
    } else {
      return {
        redirect: {
          destination: redirect_url,
          statusCode: 301,
        },
      };
    }
  }

  const page = pageNumber && pageNumber > 1 ? pageNumber : 1;
  const offset =
    pageNumber && pageNumber > 1 ? (pageNumber - 1) * recordsPerPage : 0;

  //console.log("url => ", urlParam);
  const channel = urlParam.channel || "";
  const plist = urlParam.plist || "";

  const query_string = "videos/" + channel + "/" + plist + "/";

  const channelId = await youtubeHelperGetChannelId(channel);
  // console.log("cid", channelId);
  const channel_data = await youtubeHelperGetChannel(channelId, 0, 25);
  // console.log("channel_data", channel_data);
  if (channel_data && !Object.keys(channel_data).length) {
    return {
      notFound: true,
    };
  }

  const channel_title = channel_data?.["channel"]?.["title"] || "";
  //   let updated_at = channel_data["data"]["channel"]["updated_at"];
  const channel_playlists = channel_data?.["channel"]?.["playlists"] || "";
  //   let channel_logo = channel_data["data"]["channel"]["thumbnail"]["url"];
  // console.log("plist", channel_playlists);
  const playlistId = await youtubeHelperGetPlaylistId(plist, channel_playlists);
  // console.log("pid", playlistId);
  const playlist_data = await youtubeHelperGetPlaylist(
    playlistId,
    offset,
    recordsPerPage
  );
  //console.log("playlist_data", playlist_data);

  let _redirect_url = "";
  if (
    playlist_data &&
    playlist_data["playlist"] &&
    playlist_data["playlist"]["stories"].length < 1
  ) {
    _redirect_url = protocol + host + "/" + query_string;
    return {
      redirect: {
        destination: customizeUrl(_redirect_url),
        statusCode: 301,
      },
    };
  }

  const playlist_title =
    (playlist_data["playlist"] && playlist_data["playlist"]["title"]) || "";
  const total_stories =
    (playlist_data["playlist"] && playlist_data["playlist"]["count"]) || 0;
  const stories =
    (playlist_data["playlist"] &&
      playlist_data["playlist"]["stories"].slice(
        7,
        (playlist_data["playlist"] &&
          playlist_data["playlist"]["stories"].length) ||
          0
      )) ||
    [];
  //   stories = stories.slice(7, stories.length());

  let titleDiv = "";
  titleDiv +=
    '<div class="top-news-title"><h1>' +
    playlist_title +
    " Video News</h1></div>";

  const topStoryArray =
    (playlist_data["playlist"] && playlist_data["playlist"]["stories"]) || []; // channel_data["channel"]["playlists"];

  const youtubeChannelTrendingData = await youtubeHelperTrendingData();
  //   let result = await youtubeHelperVideoListing();

  const channels = channel_data["channel"]; //channel_data['channel']; // result["website"]["channels"];
  const reslutArray = ""; // result["website"]["channels"][0]["playlists"];
  const reslutArraySecond = ""; // result["website"]["channels"][1]["playlists"];

  let homeText,
    videosText = "";
  homeText = "Hindi News"; //'होम';
  videosText = "Videos"; //'न्यूज';

  let breadCrumbArray = [];
  let tempobj = {};

  const _page= "Videos";

  tempobj = [
    { slug: "/", value: homeText },
    { slug: "/videos/", value: videosText },
    { slug: "/videos/" + channel, value: channel_title },
    { slug: "", value: playlist_title },
  ];

  breadCrumbArray = tempobj;
  let page_title,
    page_description,
    page_keywords,
    page_url,
    thumbnailUrl,
    seo_page_title,
    slugVal = "";

  page_title =
    playlist_title +
    " Videos: Latest Hindi News in Video Online | " +
    channel_title +
    " | हिंदी न्यूज़ वीडियो – News18 Hindi";
  page_description =
    "Watch latest Videos online on " +
    playlist_title +
    " at News18 Hindi. Get all the latest videos on " +
    playlist_title +
    " including breaking Hindi news in videos, हिंदी न्यूज़ वीडियो from " +
    channel_title +
    " and many more.";
  page_keywords =
    playlist_title +
    " Videos, Latest Hindi News in Video Online, " +
    channel_title +
    " हिंदी न्यूज़ वीडियो ";

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
    news: news,
    pageUrl: page_url,
    og_title: page_title,
    og_description: page_description,
  };

  //schema related code starts here
  let metaTitle = page_title;
  let metaDesc = page_description;
  let metaKeywords = page_keywords;

  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      metaTitle,
      metaDesc,
      metaKeywords,
      currentUrl ? currentUrl.split("?")[0] : "",
      "",
      false,
      true
    ) || "";
  pageSeo.jsonLdForItemList =
    jsonLdForItemList(
      currentUrl ? currentUrl.split("?")[0] : "",
      topStoryArray.length,
      topStoryArray,
      "Videos"
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

  let [
    menuData = {},
    topNews = [],
    exnews = {},
    miscData = {},
    categoryStoriesList = [],
    footerData = [],
    photoStories = [],
    topStories = [],
    astroStories = {},
    googleRemoteConfig,
    // districtList = {},
    iplAuctionList = {},
  ] = await Promise.all([
    isMobile ? [] : {},
    isMobile ? {} : {},
    {},
    {},
    isMobile ? {} : {},
    [],
    [],
    !isMobile ? [] : [],
    !isMobile ? [] : [],
    [],
    {},
    [],
    {},
  ]);

  let _pageParam = {
    category: "videos",
    page: _page,
    newsType: "videos",
    query: "",
  };

  const pageData = {
    menuData,
    topNews,
    exnews,
    miscData,
    pageAds,
    pageSeo,
    breadCrumbArray,
    titleDiv,
    _pageParam,
    footerData,
    topStories,
    topStoryArray,
    // districtList,
    channels: channels || [],
    stories,
    reslutArray,
    reslutArraySecond,
    youtubeChannelTrendingData,
    total_stories,
    curr_page_no: page,
    currentUrl: currentUrl ? currentUrl.split("?")[0] : "",
    query_string,
    config: googleRemoteConfig,
    iplAuctionList,
    isMobile,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};

export default playlistProps;
