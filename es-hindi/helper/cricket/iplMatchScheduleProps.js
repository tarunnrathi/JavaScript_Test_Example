import { getIPLScheduleDetails } from "includes/seo.util";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import getConfig from "next/config";
import {
  jsonLdForCricketSiteNavigation,
  jsonLdForWebPage,
} from "includes/schema.util";
import { cricketHome as homeAds } from "includes/Desktop/dfpAdIds";
import { cricketHome as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { arrayOnly, ignoreQueryParams } from "includes/article.util";
import { IPL_SERIES_ID, IPL_SERIES_NAME,IPL_YEAR } from "includes/ipl.helper";
import { TaboolaList } from "includes/Tabola.helper";
import { getDistricts, getRedisDataByMultiKey, getCricketData, getMenu,getRedisDataByKey } from "api_dns/global/Common";
const { publicRuntimeConfig } = getConfig();
const getCurrentURL = (context) => {
  let protocol = "https://";
  const { host= "" } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  return protocol + host + context.req.url;
};
const iplMatchScheduleProps = async (context) => {
  const ipl_series_id = IPL_SERIES_ID;
  const seriesName = IPL_SERIES_NAME;
  const seriesDisplayName = seriesName ? seriesName.split("-").join(" ").toUpperCase() : "";
  const isMobile = checkDevice(context);
  const currentUrl = getCurrentURL(context);
  const currentPath = ignoreQueryParams(context.req.url, false);
  const seriesHomeUrl = `/cricket/ipl`;
  const paramObj = {
    seriesName,
    pageType: 'match-schedule',
    pageTypeHin: 'मैच शेड्यूल',
    currentPath,
    seriesHomeUrl,
    seriesDisplayName
  };
  paramObj["seriesBreadCrumbName"] = `${seriesDisplayName}`;
  const { title, desc, keywords } = getIPLScheduleDetails();
  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-NW_IPL_SEO_MANAGE_2022";
  let footerData = [], crMenu = [], sales_banner = [], seoData = {};
  const [
      menuData = {},
      pageContent = [],
      // districtList = {},
      redisMultiResults = [],
      liveTvFlag= {},
  ] = await Promise.allSettled([
      getMenu(isMobile),
      getCricketData(`schedule/series/${ipl_series_id}`),
      // getDistricts(),
      getRedisDataByMultiKey(multiRedisString),
      getRedisDataByKey("rammandirtv", "KHABARN18-"),
  ]).then(temp => temp?.map(r=>r.value)).catch();
  if (Object.keys(redisMultiResults)?.length > 0) { 
      let keys = Object.keys(redisMultiResults);   
      [footerData, crMenu, sales_banner, seoData] = keys.map(i => redisMultiResults[i]? redisMultiResults[i]: []);
  }
  let _1xbetData = {};
  let showBannerInIPL = false;
  let bannerData1 = Object.values(sales_banner);
  bannerData1 = bannerData1.filter((banner) => (banner.campagin_name?.includes("IPL 2023 - Hindi")||banner.campagin_name?.includes("Lok Sabha Election 2024")));
  if (bannerData1.length > 1) {
    const sponserObj = {};
    bannerData1?.forEach((banner) => {
      Object.assign(sponserObj,banner?.sponserdata);
    })
    _1xbetData = sponserObj;
  }else{
    _1xbetData = bannerData1[0]?.sponserdata || {};
  }
  const SEOData =
  (seoData?.ipl_2022 || []).find(
    (seo) => seo.ipl_page_section === "ipl22_schedule_page"
  ) || {};
  let breadCrumbArray = [];
  const baseURL = publicRuntimeConfig.siteUrl;
  breadCrumbArray = [
    { slug: baseURL, value: 'NEWS18 हिंदी' },
    { slug: baseURL + "cricket/", value: 'क्रिकेट' },
    { slug: baseURL + "cricket/ipl/", value: `IPL ${IPL_YEAR}` },
    { slug: currentUrl, value: 'मैच शेड्यूल' }
  ];
  const pageSeo = {
    title: SEOData.meta_title || title,
    keywords: SEOData.meta_ipl_keyword || keywords,
    description: SEOData.meta_ipl_page_description || desc,
    canonical: publicRuntimeConfig.siteUrl + "cricket/ipl/match-schedule/",
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/newsogimg_1632296929.jpg",
    isCricketNextHome: true,
    page: "match-schedule",
    breadCrumbArray
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      SEOData.meta_title || title,
      SEOData.meta_ipl_page_description || desc,
      SEOData.meta_ipl_keyword || keywords,
      publicRuntimeConfig.siteUrl + "cricket/ipl/match-schedule/",
      null,
      false,
      false,
      false
    ) || "";
  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(
    arrayOnly(crMenu)
  );
  const pageAds = isMobile ? homeMobileAds() : homeAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "IPL",
    block_ads: "no",
  });
  // let updateDataInArray = [];
  // updateDataInArray.push(pageContent);
  const taboolaList = TaboolaList.category;
  const pageData = {
    isMobile,
    currentUrl,
    pageAds,
    pageSeo,
    footerData,
    // districtList,
    pageContent,
    paramObj,
    seoData: SEOData,
    showBannerInIPL,
    _1xbetData,
    taboolaList,
    menuData,
    liveTvFlag
  };
  return { props: { pageData } };
};
export default iplMatchScheduleProps;