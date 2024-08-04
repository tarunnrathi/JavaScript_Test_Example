import { checkDevice, getSetTargettingValues } from "includes/helper";
import {
  jsonLdForCricketSiteNavigation,
  jsonLdForWebPage,
} from "includes/schema.util";
import { getIPLPointsTableDetails } from "includes/seo.util";
import { arrayOnly } from "includes/article.util";
import { IPLPage as homeAds } from "includes/Desktop/dfpAdIds";
import { IPLPage as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { getDistricts, getRedisDataByMultiKey, getCricketData, getMenu,getRedisDataByKey } from "api_dns/global/Common";
import { IPL_SERIES_ID } from "includes/ipl.helper";

import getConfig from "next/config";
import { TaboolaList } from "includes/Tabola.helper";

const { publicRuntimeConfig } = getConfig();

const getCurrentURL = (context) => {
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  return protocol + host + context.req.url;
};

const iplPointsTableProps = async (context) => {
  const isMobile = checkDevice(context);
  const currentUrl = getCurrentURL(context);

  const { title, desc, keywords } = getIPLPointsTableDetails();
  const ipl_series_id = IPL_SERIES_ID; // new series id(2023): '5157';

  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-NW_IPL_SEO_MANAGE_2022";
  let footerData = [], crMenu = [], sales_banner = [], seoData = {};

  let [
      menuData = {},
      pointsTableData = [],
      // districtList = {},
      redisMultiResults = [],
      liveTvFlag= {},
  ] = await Promise.allSettled([
      getMenu(isMobile),
      getCricketData(`standing/${ipl_series_id}`),
      // getDistricts(),
      getRedisDataByMultiKey(multiRedisString),
      getRedisDataByKey("rammandirtv", "KHABARN18-")
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

  const pageAds = isMobile ? homeMobileAds() : homeAds();
  const SEOData =
    (seoData?.ipl_2022 || []).find(
      (seo) => seo.ipl_page_section === "ipl22_point_table"
    ) || {};

    let breadCrumbArray = [];
    const baseURL = publicRuntimeConfig.siteUrl;
    breadCrumbArray = [
      { slug: baseURL, value: 'होम' },
      { slug: baseURL + "cricket/", value: 'CRICKET' },
      { slug: baseURL + "cricket/ipl/", value: 'IPL 2023' },
      { slug: currentUrl, value: 'अंक तालिका' }
    ];

  const pageSeo = {
    title: SEOData.meta_title || title,
    keywords: SEOData.meta_ipl_keyword || keywords,
    description: SEOData.meta_ipl_page_description || desc,
    canonical: publicRuntimeConfig.siteUrl + "cricket/ipl/points-table/",
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/newsogimg_1632296929.jpg",
    isCricketNextHome: true,
    page: "points-table",
    breadCrumbArray
  };

  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      SEOData.meta_title || title,
      SEOData.meta_ipl_page_description || desc,
      SEOData.meta_ipl_keyword || keywords,
      publicRuntimeConfig.siteUrl + "cricket/ipl/points-table/",
      null,
      false,
      false,
      false
    ) || "";
  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(
    arrayOnly(crMenu)
  );

  const teamsPointTable = pointsTableData && pointsTableData[0]?.team || [];

    pageAds.setTargetingValues = getSetTargettingValues({
      headline: pageSeo.title,
      description: pageSeo.description,
      seo_keywords: pageSeo.keywords,
      weburl: currentUrl,
      article_id: "",
      section: "IPL",
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
    seoData: SEOData,
    pointsTableData: teamsPointTable,
    showBannerInIPL,
    _1xbetData,
    taboolaList,
    menuData,
    liveTvFlag
  };

  return { props: { pageData } };
};

export default iplPointsTableProps;
