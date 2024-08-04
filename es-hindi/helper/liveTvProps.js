import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { liveTv as liveTvAds } from "includes/Desktop/dfpAdIds";
import { liveTv as liveTvMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { TaboolaList } from "includes/Tabola.helper";
import { jsonLdForWebPage, jsonLdForItemList, jsonLdLiveTvForVideoObject } from "includes/schema.util";

import {
  getRedisDataByKey,
  // getDistricts,
  getArticleList,
  getMenu,
  getMiscData,
} from "api_dns/global/Common";
import { validSlugChecker } from "includes/_app.util";

// const channelList = ['/livetv/',
// '/livetv/news18-rajasthan/',
// '/livetv/news18-uttar-pradesh-uttarakhand/',
// '/livetv/news18-madhya-pradesh-chhattisgarh/',
// '/livetv/news18-bihar-jharkhand/',
// '/livetv/news18-rajasthan/',
// '/livetv/news18-uttar-pradesh-uttarakhand/',
// '/livetv/news18-madhya-pradesh-chhattisgarh/',
// '/livetv/news18-bihar-jharkhand/',
// '/livetv/etv-rajasthan/',
// '/livetv/etv-uttar-pradesh-uttarakhand/',
// '/livetv/etv-madhya-pradesh-chhattisgarh/',
// '/livetv/etv-bihar-jharkhand/',
// '/livetv/etv-rajasthan/',
// '/livetv/etv-uttar-pradesh-uttarakhand/',
// '/livetv/etv-madhya-pradesh-chhattisgarh/',
// '/livetv/etv-bihar-jharkhand/'];

const channelList = {
  news18India: {
    id: "news18india",
    url: "/livetv/",
    icon: "https://static.hindi.news18.com/ibnkhabar/uploads/2018/03/News18-INDIA_LOGO_WEB_NEW_2.png",
    name: "news18 India",
    title: "News18 India",
    vidgyor_id: "13ce73f5bd7c4_live"
  },
  "news18-rajasthan": {
    id: "news18rajasthan",
    url: "/livetv/news18-rajasthan/",
    icon: "https://images.news18.com/static_news18/pix/ibnhome/news18/rajasthan/raja-for-web.png",
    name: "news18 rajasthan",
    title: "News18 राजस्थान",
    vidgyor_id: "f2f8cf60fee6_live"
  },
  "news18-bihar-jharkhand": {
    id: "news18bihar",
    url: "/livetv/news18-bihar-jharkhand/",
    icon: "https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/hindi-bihar.gif",
    name: "News18 Bihar, Jharkhand",
    title: "News18 बिहार, झारखंड",
    vidgyor_id: "c5590bfd5f9e9_live"
  },
  "news18-uttar-pradesh-uttarakhand": {
    id: "news18up",
    url: "/livetv/news18-uttar-pradesh-uttarakhand/",
    icon: "https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/hindi-up-uk-for-web.gif",
    name: "News18 uttar pradesh and uttrakhand",
    title: "News18 उत्तर प्रदेश, उत्तराखंड",
    vidgyor_id: "8407b988c0739_live"
  },
  "news18-madhya-pradesh-chhattisgarh": {
    id: "news18mp",
    url: "/livetv/news18-madhya-pradesh-chhattisgarh/",
    icon: "https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/hindi-chhattisgarh.gif",
    name: "news18 madhya pradesh, chhattisgarh",
    title: "News18 मध्य प्रदेश, छत्तीसगढ़",
    vidgyor_id: "28051d083ee2d_live"
  },
  "news18-haryana": {
    id: "news18haryana",
    url: "https://punjab.news18.com/live-tv/",
    icon: "https://static.hindi.news18.com/ibnkhabar/uploads/2018/03/news18-punjab-haryana-himachal.gif",
    name: "news18 punjab, haryana, himachal",
    title: "News18 पंजाब, हरियाणा, हिमाचल",
    vidgyor_id: "13f347a048383_live"
  },
  // 'news18-bangla' :{ 'icon' : 'https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/news18-bangla-web.png', 'name' : 'NEWS18_bangla', title : ''},
  // 'news18-odia' :{ 'icon' : 'https://images.news18.com/ibnkhabar/uploads/2017/12/news18-odia-1.png', 'name' : 'News18 Odia', title : ''},
  // 'news18-gujarati' :{ 'icon' : 'https://images.news18.com/ibnkhabar/uploads/assests/img/news18-gujarati-web.png', 'name' : 'news18 gujarati', title : ''},
  // 'news18-urdu' :{ 'icon' : 'https://images.news18.com/static_news18/pix/ibnhome/news18/urdu/urdu-for-web.png', 'name' : 'news18 urdu', title : ''},
  // 'news18assam' :{ 'icon' : 'https://images.news18.com/ibnkhabar/uploads/2017/11/nw18assam-new.gif', 'name' : 'News18 Assam North East', title : ''},
  // 'news18-kannada' :{ 'icon' : 'https://images.news18.com/ibnkhabar/uploads/assests/img/news18-kannada-site.png', 'name' : 'news18_kannada', title : ''},
  // 'news18tamil' :{ 'icon' : 'https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/news18-tamil-nadu-tv.png', 'name' : 'News18 Tamil', title : ''},
  // 'news18kerala' :{ 'icon' : 'https://images.news18.com/ibnkhabar/uploads/2017/11/news18-kerala-tv-new.png', 'name' : 'News18 Kerala', title : ''}
};
const liveTvProps = async (context) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  if (host.indexOf("127.0.0.1:3050") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;
  const urlParam = context.query;
  let section = "";
  if ("section" in urlParam && urlParam.section.length > 0) {
    [section] = urlParam.section;
  }

section = validSlugChecker(section) ? section : "";

  const tf = "livetv";
  const pageStrExist = false;
  const query_string = "";
  const _sliderNeed = false;

  let [
    menuData = {},
    topNews = [],
    exnews = {},
    miscData = {},
    footerData = [],
    photoStories = [],
    topStories = [],
    astroStories = {},
    latestNewsStories = [],
    videogallerySsr = [],
    googleRemoteConfig = {},
    // districtList = {},
    iplAuctionList = {},
    liveTvTimer = [],
    liveTvMeta = {},
    categorySponserData = {},
  ] = await Promise.all([
    getMenu(isMobile),
    getArticleList({
      count: 11,
      offset: 0,
      fields:
        "story_id,display_headline,title,images,categories,post_type,weburl,weburl_r,intro",
      filter: { post_type: "text" },
    }),
    getRedisDataByKey("topspecialwidget", false),
    getMiscData({ trendingTags: true }),
    getRedisDataByKey("new_fms_system", "KHABARN18-"),
    isMobile
      ? []
      : getArticleList({
          count: 9,
          offset: 0,
          fields:
            "story_id,display_headline,title,images,categories,post_type,weburl,weburl_r,intro,gallery_count",
          filter: { post_type: "photogallery" },
        }),
    [],
    [],
    isMobile
      ? []
      : getArticleList({
          count: 5,
          offset: 0,
          fields:
            "story_id,display_headline,title,images,categories,post_type,weburl,weburl_r,intro",
          filter: { post_type: "text" },
        }),
    [], // video is csr
    [],
    // getDistricts(),
    [],
    getRedisDataByKey(
      `${section ? section : "news18-india"}-tv-schedule`,
      "HinN18-"
    ),
    getRedisDataByKey("livetvmetatags", "KHABARN18-"),
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]);

  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];

  liveTvTimer = liveTvTimer?.node || [];
  let channelDetails = {};
  let topNewsLiveTv = {};
  const totalTopNews = topNews; //[...topNews.left, ...topNews.right]
  if (!isMobile) {
    topNewsLiveTv["left"] = totalTopNews.slice(0, 2);
    topNewsLiveTv["middle"] = totalTopNews.slice(2, 7);
    topNewsLiveTv["right"] = totalTopNews.slice(7, 9);
  } else {
    topNewsLiveTv = totalTopNews.slice(0, 6);
    // topNewsLiveTv["middle"] = totalTopNews.slice(1,6);
  }
  if (section) {
    channelDetails = channelList[section] || {};
    liveTvMeta = liveTvMeta[section] || {};
  } else {
    channelDetails = channelList["news18India"];
    liveTvMeta = liveTvMeta["livetv"] || {};
    liveTvTimer = [];
  }
  /**
   * Meta details start here
   */
  // slugVal = "";
  // let metaSlug = "";
  // if (section !== "") {
  // metaSlug = section;
  // }
  // slugVal = section.replace("-", "");
  const page_title =
    liveTvMeta.page_title ||
    "News18 India Live TV: देखें लाइव टीवी फ्री में, Watch Free Live TV, Live News Streaming and TV Newscast @ News18 Hindi";
  const page_description =
    liveTvMeta.page_description ||
    // eslint-disable-next-line max-len
    "News18 India Live TV Newscast: न्यूज़18 इंडिया की लाइव टीवी स्ट्रीमिंग देखें लाइव <a href='https://www.news18.com/'>news18india.com</a> पर. पाएं मनोरंजन, खेल जगत, व्यापार और देश-विदेश की सभी जानकारी ऑनलाइन <a href='https://www.news18.com/'>news18india.com</a> पर.";
  const page_keywords =
    liveTvMeta.page_keywords ||
    "News18 India, News18 India Live TV, News18 India Latest News, News18 India Latest News, News18 India Live News Streaming.";

  /**
   * Breadcrumb here
   * */
  let bredCrumb = "";
  let breadCrumbArray = [];
  let tempobj = {};
  const homeText = "HOME";
  const catText = "NEWS18 इंडिया LIVE TV ";
  tempobj = [
    { slug: "/", value: homeText, engtext: "News18 Hindi" },
    { slug: "/livetv/", value: catText, engtext: "Live Tv" },
  ];
  if (section !== undefined && section !== "") {
    tempobj[1] = {
      slug: "/livetv/" + section + "/",
      value: liveTvMeta.page_h1 || "Live Tv : " + section,
      engtext: section,
    };
  }
  for (let index = 0; index < tempobj.length; index++) {
    bredCrumb +=
      (index === 0 ? "" : "<span> / </span>") +
      '<a href="' +
      tempobj[index]["slug"] +
      '">' +
      (index + 1 === tempobj.length
        ? "<h1>" + tempobj[index]["value"] + "</h1>"
        : tempobj[index]["value"]) +
      "</a>";
  }
  breadCrumbArray = [...tempobj];

  // let topPriorityData = {};
  const categoryStoriesList = {};
  const thumbnailUrl = "";

  // eslint-disable-next-line prefer-destructuring
  const siteUrl = publicRuntimeConfig.siteUrl;
  const catUrl = siteUrl + tf + "/";
  const pageSeo = {
    title: page_title || "404 Not Found",
    description: page_description,
    keywords: page_keywords,
    canonical: currentUrl,
    og_image: thumbnailUrl,
    news: catUrl,
    cat: tf,
    pageUrl: siteUrl,
    og_title: page_title,
    og_description: page_description,
    breadCrumbArray: breadCrumbArray,
    page: "Live Tv",
  };
  const pageAds = isMobile ? liveTvMobileAds(section) : liveTvAds(section);

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: page_title,
    description: page_description,
    seo_keywords: page_keywords,
    weburl: currentUrl,
    section: section,
    content_type: "Live Tv",
    block_ads: "no",
    meta_keywords: page_keywords,
    header: page_title,
  });
  const _pageParam = {
    sub_cat: section,
    query: query_string,
    newsType: "Live Tv",
    get_section: "Live Tv",
    hi_category: section,
    hi_subCategory: "",
  };

  pageSeo.pageParam = _pageParam;
  const schemaSection = "";
  const schemaTf = tf.charAt(0).toUpperCase() + tf.slice(1);
  const metaTitle = page_title;
  const metaDesc = page_description;
  const metaKeywords = page_keywords;

  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      metaTitle,
      metaDesc,
      metaKeywords,
      currentUrl,
      "",
      false,
      true
    ) || "";
  if (categoryStoriesList && categoryStoriesList.length) {
    pageSeo.jsonLdForItemList =
      jsonLdForItemList(
        currentUrl,
        categoryStoriesList.length,
        categoryStoriesList,
        schemaSection || schemaTf
      ) || "";
  }

  pageSeo.jsonLdForVideoObject =
    jsonLdLiveTvForVideoObject(page_title, page_description, page_keywords) ||
    "";

  const page_h1 =
    liveTvMeta.page_h1 ||
    (section !== "" ? "Live Tv : " + section : "NEWS18 इंडिया LIVE TV");
  const taboolaList = TaboolaList.liveTvPage;
  const pageData = {
    isMobile,
    isListingPage: true,
    currentUrl,
    menuData,
    channelDetails: channelDetails || {},
    channelList: channelList || {},
    topNewsLiveTv: topNewsLiveTv,
    topNews,
    liveTvTimer,
    exnews,
    miscData,
    pageAds,
    pageSeo,
    page_h1,
    bredCrumb,
    breadCrumbArray,
    _pageParam,
    sliderFlag: _sliderNeed,
    mainCat: tf,
    subCat: section,
    categoryStoriesList,
    footerData,
    photoStories,
    // districtList,
    topStories,
    latestNewsStories,
    astroStories: astroStories["daily"] || astroStories,
    trendingTags: miscData.trendingTags || [],
    pageStringExist: pageStrExist,
    categoryName: "Live Tv",
    videogallerySsr,
    config: googleRemoteConfig,
    iplAuctionList,
    taboolaList,
    _1xbetData,
    section
  };
  // Pass data to the page via props
  return { props: { pageData } };
};

export default liveTvProps;
