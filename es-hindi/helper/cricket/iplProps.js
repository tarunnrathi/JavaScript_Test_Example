import { getIPLHomeDetails } from "includes/seo.util";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import getConfig from "next/config";
import {
  jsonLdForCricketSiteNavigation,
  jsonLdForWebPage,
} from "includes/schema.util";
import { IPLPage as homeAds } from "includes/Desktop/dfpAdIds";
import { IPLPage as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { arrayOnly } from "includes/article.util";
import { IPL_SERIES_ID, filterTrackerData } from "includes/ipl.helper";
import { TaboolaList } from "includes/Tabola.helper";
import {
  // getDistricts,
  getRedisDataByMultiKey,
  getCricketData,
  getCricketDataDirect,
  getArticleList,
  getMenu,
  getPriorityData,
  getRedisDataByKey,
} from "api_dns/global/Common";
import { IPL_YEAR } from "includes/ipl.helper";
const { publicRuntimeConfig } = getConfig();

const getIPLStatData = (statsData) => {
  const ipltracker = statsData || {};
  const bat = filterTrackerData(ipltracker.bat);
  const bowl = filterTrackerData(ipltracker.bowl);
  const field = filterTrackerData(ipltracker.field);
  return { bat, bowl, field };
};

const getCurrentURL = (context) => {
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  return protocol + host + context.req.url;
};

const iplProps = async (context) => {
  const isMobile = checkDevice(context);
  const currentUrl = getCurrentURL(context);
  const { title, desc, keywords } = getIPLHomeDetails();
  const ipl_series_id = IPL_SERIES_ID; // new series id(2023): '5157';
  const multiRedisString =
    "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-NW_IPL_SEO_MANAGE_2022"; //KHABARN18-AURTHOR_IPL_2022 (iplBlogData)
  let footerData = [],
    crMenu = [],
    sales_banner = [],
    /* iplBlogData = [], */ seoData = {};

  let [
    menuData = {},
    // districtList = {},
    latestNewsData = [],
    photoPriority = [],
    videoPriorityData = [],
    offFieldPriority = [],
    topNewsStoryData = [],
    pointsTableData = [],
    statsData = [],
    orangeCapData = [],
    purpleCapData = [],
    ImageIdsAvailable = [],
    redisMultiResults = [],
    liveTvFlag = {},
  ] = await Promise.allSettled([
    getMenu(isMobile),
    // getDistricts(),
    getArticleList({
      count: 15,
      filter: { post_type: "text", "tags.slug": `ipl-${IPL_YEAR}` },
      fields: "id,display_headline,weburl_r,images,headline,intro",
    }),
    getArticleList({
      count: 5,
      offset: 0,
      filter: { post_type: "photogallery", "tags.slug": `ipl-${IPL_YEAR}` },
      fields:
        "id,display_headline,weburl_r,images,headline,intro,created_at,gallery_count",
    }),
    //getPriorityData({section: "ipl2022", subSection:"photo", fields: 'display_headline,weburl_r,images', filter:{"post_type":"photogallery",'tags.slug':'ipl-2023'}, fallback:true, count: 5}),
    //getPriorityData({section: "ipl2022", subSection:"video", fields: 'display_headline,weburl_r,images', filter:{"post_type":"videos",'tags.slug':'ipl-2023'}, fallback:true, count: 4}),
    getArticleList({
      count: 4,
      offset: 0,
      filter: { post_type: "videos", "tags.slug": `ipl-${IPL_YEAR}` },
      fields: "id,display_headline,weburl_r,images,headline,intro,created_at",
    }),
    getPriorityData({
      section: "ipl",
      subSection: "off_field",
      fields: "display_headline,weburl_r,images",
      filter: { "tags.slug": `ipl-${IPL_YEAR}` },
      fallback: true,
      count: 3,
    }),
    getPriorityData({
      section: "ipl",
      subSection: "NA",
      fields: "display_headline,weburl_r,images,intro",
      filter: { "tags.slug": `ipl-${IPL_YEAR}` },
      fallback: true,
      count: 6,
    }),
    getCricketData(`standing/${ipl_series_id}`),
    getCricketData(`tournament/${ipl_series_id}`),
    getCricketDataDirect(`stat/2/${ipl_series_id}`),
    getCricketDataDirect(`stat/13/${ipl_series_id}`),
    [],
    getRedisDataByMultiKey(multiRedisString),
    getRedisDataByKey("rammandirtv", "KHABARN18-"),
  ])
    .then((temp) => temp?.map((r) => r.value))
    .catch();

  if (Object.keys(redisMultiResults)?.length > 0) {
    let keys = Object.keys(redisMultiResults);
    [footerData, crMenu, sales_banner, /* iplBlogData, */ seoData] = keys.map(
      (i) => (redisMultiResults[i] ? redisMultiResults[i] : [])
    );
  }
  let _1xbetData = {};
  const showBannerInIPL = false;
  let bannerData1 = Object.values(sales_banner);
  bannerData1 = bannerData1.filter(
    (banner) =>
      banner.campagin_name?.includes("IPL 2023 - Hindi") ||
      banner.campagin_name?.includes("Lok Sabha Election 2024")
  );
  if (bannerData1.length > 1) {
    const sponserObj = {};
    bannerData1?.forEach((banner) => {
      Object.assign(sponserObj, banner?.sponserdata);
    });
    _1xbetData = sponserObj;
  } else {
    _1xbetData = bannerData1[0]?.sponserdata || {};
  }
  let breadCrumbArray = [];
  const baseURL = publicRuntimeConfig.siteUrl;
  breadCrumbArray = [
    { slug: baseURL, value: "हिंदी समाचार" },
    { slug: baseURL + "cricket/", value: "क्रिकेट" },
    { slug: baseURL + "cricket/ipl/", value: `IPL ${IPL_YEAR}` },
  ];
  const SEOData =
    (seoData?.ipl_2022 || []).find(
      (seo) => seo.ipl_page_section === "ipl22_home"
    ) || {};
  const pageSeo = {
    title: SEOData.meta_title || title,
    keywords: SEOData.meta_ipl_keyword || keywords,
    description: SEOData.meta_ipl_page_description || desc,
    canonical: publicRuntimeConfig.siteUrl + "cricket/ipl/",
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/newsogimg_1632296929.jpg",
    isCricketNextHome: true,
    page: "Category",
    breadCrumbArray: breadCrumbArray,
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      SEOData.meta_title || title,
      SEOData.meta_ipl_page_description || desc,
      SEOData.meta_ipl_keyword || keywords,
      publicRuntimeConfig.siteUrl + "cricket/ipl/",
      null,
      false,
      false,
      false
    ) || "";
  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(
    arrayOnly(crMenu)
  );
  const pageAds = isMobile ? homeMobileAds() : homeAds();
  const teamsPointTable = (pointsTableData && pointsTableData[0]?.team) || [];
  let orangeCapLeaderData = (orangeCapData?.leaderboard || [])?.slice(0, 3);
  let purpleCapLeaderData = (purpleCapData?.leaderboard || [])?.slice(0, 3);
  const iplStatData = getIPLStatData(statsData);
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "Cricket",
    block_ads: "no",
  });
  const taboolaList = TaboolaList.category;
  const pageData = {
    isMobile,
    currentUrl,
    pageAds,
    pageSeo,
    footerData,
    // districtList,
    topNewsStoryData: topNewsStoryData?.slice(0, 6) || [],
    photoPriority,
    offFieldPriority,
    // iplBlogData,
    videoPriorityData,
    seoData: SEOData,
    latestNewsData: latestNewsData?.slice(0, 12) || [],
    pointsTableData: teamsPointTable,
    statsData: iplStatData,
    orangeCapData: orangeCapLeaderData,
    purpleCapData: purpleCapLeaderData,
    ImageIdsAvailable,
    showBannerInIPL,
    _1xbetData,
    taboolaList,
    menuData,
    liveTvFlag,
  };
  return { props: { pageData } };
};
export default iplProps;
