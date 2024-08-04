import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { checkDevice, getSetTargettingValues } from "includes/helper";
// import fetchUtility from "includes/sFetchUtility";
import categoryHelper from "../src/includes/category.helper";
import { states as categoryAds } from "includes/Desktop/dfpAdIds";
import { states as categoryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { jsonLdForItemList } from "includes/schema.util";
import { getArticleList, getDataByRedisKey, getDistricts, getMenu, getMiscData, getPriorityData, getRedisDataByKey } from "api_dns/global/Common";

import { getCatPriorityStory } from "api_dns/individual/States";

const stateProps = async (context) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = protocol + host + context.req.url;
  const urlParam = context.query;

  let tf = urlParam.t || "news";
  const section = urlParam.section || "";
  let getCityList = [];
  getCityList = categoryHelper.getCityList();
  let catsUrl = "/news/" + section + "/";
  let pageNumber = 1;
  let prevLink =
    pageNumber == 2
      ? catsUrl
      : pageNumber != 1 && pageNumber <= 30
      ? catsUrl + "page-" + (pageNumber - 1) + "/"
      : "";
  let nextLink =
    pageNumber < 30 ? catsUrl + "page-" + (pageNumber + 1) + "/" : "";

  let homeText,
    newsText,
    worldText,
    stateText,
    lifestyleText = "";
  homeText = "Hindi News"; //'होम';
  newsText = "Today Hindi News"; //'न्यूज';
  stateText = "States"; //'राज्य';
  worldText = "World"; //'दुनिया'
  lifestyleText = "Lifestyle"; //'जीवन शैली'
  let breadCrumbArray = [];
  let tempobj = {};

  // This variable(PAGE_NAME_DFP) get used for DFP Ad, please don't remove
  let _page,
    PAGE_NAME_DFP,
    DFP_SECTION,
    _Ad_HEADER_SECTION_NAME,
    _priorityKey,
    _breadCrumb = "";
  if (tf == "news" && section == "world") {
    _page = "world";
    PAGE_NAME_DFP = "category_page";
    DFP_SECTION = "world";
    _Ad_HEADER_SECTION_NAME = "world";
    // _priorityKey = "category_world_priority";
    _priorityKey = "world";

    tempobj = [
      { slug: "/", value: homeText },
      { slug: "", value: worldText },
    ];
  } else if (tf == "news" && section == "lifestyle") {
    _page = "lifestyle";
    PAGE_NAME_DFP = "category_page";
    DFP_SECTION = "lifestyle";
    _Ad_HEADER_SECTION_NAME = "lifestyle";
    // _priorityKey = "category_lifestyle_priority";
    _priorityKey = "lifestyle";

    tempobj = [
      { slug: "/", value: homeText },
      { slug: "", value: lifestyleText },
    ];
  } else {
    _page = "states";
    PAGE_NAME_DFP = "pg_states";
    _Ad_HEADER_SECTION_NAME = "States";
    // _priorityKey = "category_statehome_priority";
    _priorityKey = "statehome";

    tempobj = [
      { slug: "/", value: homeText },
      { slug: "", value: stateText },
    ];
  }

  breadCrumbArray = tempobj;

  const ucwords = (str) => {
    return (str + "").replace(/(\b[a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  };

  let titleDiv = "";
  let sectionName = "";
  sectionName = categoryHelper.getHeadNameList(_page)
    ? categoryHelper.getHeadNameList(_page)
    : ucwords(_page);
  titleDiv += `<div class="top-news-title"><h1>${sectionName}</h1></div>`;

  let category_id,
    category_name = "";
  category_id = 0;
  category_name = section;

  let topPriorityData = [];
  let topPriorityDatalist = [];
  let thumbnailUrl = "";

  topPriorityDatalist = await getPriorityData({
    section: "category",
    subSection: _priorityKey,
    count: 10,
    filter: { "categories.slug": _page === "states" ? "states" : _priorityKey },
    fallback: true,
  });
  let leftEnd = isMobile == "true" ? 5 : 6;
  let leftCat = topPriorityDatalist.slice(0, leftEnd);
  let rightCat = topPriorityDatalist.slice(
    leftEnd,
    isMobile == "true" ? 9 : 10
  );

  topPriorityData = { leftCat, rightCat };

  /**
   * Meta details start here
   */
  let page_title,
    page_description,
    page_keywords = "";

  if (_page == "states") {
    page_title =
      "States News in Hindi | India News | Indian Local (Regional) Hindi News, Samachar";
    page_description =
      "Read latest news and breaking news in Hindi from India and its major states including Uttar Pradesh (UP), Bihar, Haryana, Rajasthan, Madhya Pradesh (MP), Uttarakhand, Jharkhand, Chhattisgarh and more only at News18 Hindi.";
    page_keywords =
      "States News in Hindi, India News, Indian Local News, Regional News in Hindi";
  } else if (_page == "world") {
    page_title =
      "World News in Hindi: दुनिया की ताज़ा खबर, दुनिया ब्रेकिंग और लेटेस्ट न्यूज़";
    page_description =
      "World news in Hindi at News18 India. Latest and Breaking news in Hindi from World. World Hindi news, photos, videos and more. दुनिया की ताज़ा खबर, ब्रेकिंग और लेटेस्ट दुनिया न्यूज़ on Hindi.news18.com.";
    page_keywords =
      "दुनिया News Hindi, Hindi News Online, India Samachar, India Khabar, Today's दुनिया News Hindi";
  } else if (_page == "lifestyle") {
    page_title =
      "Lifestyle News in Hindi, Fashion and Lifestyle Tips in Hindi - News18 India";
    page_description =
      "Read latest Lifestyle, Fashion and Health Tips in Hindi from News18 India. पढ़ें भारतीय जीवनशैली (Lifestyle News in Hindi) से जुडी हिंदी खबरें न्यूज़18 इंडिया के लाइफ सेक्शन पर.";
    page_keywords =
      "Lifestyle News, Lifestyle News in Hindi, Celebrity Glamour, Beauty Tips, Fashion Tips, Fashion trends, Relationships News, Latest Lifestyle News, Current Lifestyle News, Celebrity lifestyle update";
  }

  let siteUrl = publicRuntimeConfig.siteUrl;
  let news = siteUrl + "news/" + section;
  let pageSeo = {
    title: page_title || "404 Not Found",
    description: page_description,
    keywords: page_keywords,
    canonical: currentUrl.split("page")[0],
    og_image: thumbnailUrl,
    news: news,
    pageUrl: siteUrl,
    og_title: page_title,
    og_description: page_description,
  };

  const pageAds = isMobile
    ? categoryMobileAds(urlParam, false)
    : categoryAds(urlParam, false);

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: page_title,
    description: page_description,
    seo_keywords: page_keywords,
    weburl: currentUrl,
    section: category_name,
    content_type: "News",
    block_ads: "no",
    meta_keywords: page_keywords,
    header: page_title,
  });

  let [
    menuData = {},
    topNews = [],
    exnews = {},
    miscData = {},
    categoryStoriesList = {},
    footerData = [],
    photoStories = [],
    topStories = [],
    astroStories = {},
    googleRemoteConfig = {},
    // districtList = {},
    iplAuctionList = {},
    categorySponserData = {},
  ] = await Promise.all([
    getMenu(isMobile, false),
    await getArticleList({
      count: 4,
      offset: 0,
      fields:
        "story_id,display_headline,title,images,categories,post_type,weburl_r,weburl,intro",
      filter: { post_type: "text" },
    }),
    await getDataByRedisKey("key=topspecialwidget&allow_prefix=false"),
    await getMiscData({ trendingTags: true }),
    getCatPriorityStory({ isMobile: isMobile, page: _page }),
    await getRedisDataByKey("new_fms_system", "KHABARN18-"),
    await getArticleList({
      count: 5,
      offset: 0,
      fields:
        "story_id,display_headline,title,images,categories,post_type,weburl_r,weburl,intro,gallery_count",
      filter: { post_type: "photogallery" },
    }),
    await getArticleList({
      count: 4,
      offset: 0,
      fields:
        "story_id,display_headline,title,images,categories,post_type,weburl_r,weburl,intro",
      filter: { post_type: "text" },
    }),
    [],
    {},
    // getDistricts(),
    {},
    {},
  ]);

  let catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "AMAZON Logo"
  );
  let _1xbetData = catSponData?.sponserdata || [];
  let islifePage = null;
  if (catsUrl == "/news/lifestyle/") {
    islifePage = true;
  }

  let _pageParam = {
    category: section,
    page: _page,
    newsType: tf,
  };

  pageSeo.pageParam = _pageParam;

  const schemaTopPriorityData = [
    ...(topPriorityData?.leftCat || []).filter((ele) => ele && ele),
    ...(topPriorityData?.rightCat || []).filter((ele) => ele && ele),
  ];
  schemaTopPriorityData &&
    schemaTopPriorityData.length &&
    (pageSeo.jsonLdForItemList =
      jsonLdForItemList(
        currentUrl,
        schemaTopPriorityData?.length || 0,
        schemaTopPriorityData || []
      ) || "");
  const pageData = {
    isMobile,
    prevLink,
    nextLink,
    menuData,
    topNews,
    exnews,
    miscData,
    // districtList,
    pageAds,
    pageSeo,
    bredCrumb: _breadCrumb,
    breadCrumbArray,
    titleDiv,
    _pageParam,
    sliderFlag: true,
    topPriorityData: topPriorityData,
    categoryStoriesList: categoryStoriesList?.listData || [],
    footerData,
    photoStories,
    topStories,
    astroStories: astroStories["daily"] || astroStories,
    config: googleRemoteConfig,
    iplAuctionList,
    _1xbetData,
    islifePage,
  };

  // Pass data to the page via props
  return { props: { pageData } };
};
export default stateProps;
