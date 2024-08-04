import { checkDevice, getSetTargettingValues } from "includes/helper";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  jsonLdForCricketSiteNavigation,
  jsonLdForWebPage,
} from "includes/schema.util";
import { IPLPage as homeAds } from "includes/Desktop/dfpAdIds";
import { IPLPage as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { arrayOnly } from "includes/article.util";
import { getIPLVideoDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getDistricts, getRedisDataByMultiKey, getArticleList, getMenu,getRedisDataByKey } from "api_dns/global/Common";
import { IPL_YEAR } from "includes/ipl.helper";
const getCurrentURL = (context) => {
  let protocol = "https://";
  const { host = "" } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  return protocol + host + context.req.url;
};
const iplVideosProps = async (context) => {
  const urlParam = context.query || "";
  const pageNumber = parseInt(urlParam.page) || 1;
  const isMobile = checkDevice(context);
  const currentUrl = getCurrentURL(context);
  const pageLimit = 15;
  const paramObj = {
    pageUrl: "/cricket/ipl/videos/",
    requestURL: currentUrl,
    page: pageNumber,
    pageLimit,
  };
  const start = pageNumber ? (pageNumber - 1) * pageLimit : 0;
  const limit = pageLimit;
  const { title, desc, keywords } = getIPLVideoDetails();
  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-NW_IPL_SEO_MANAGE_2022";
  let footerData = [], crMenu = [], sales_banner = [], seoData = {};
  let [
      menuData = {},
      videosData = [],
      // districtList = {},
      redisMultiResults = [],
      liveTvFlag= {},
  ] = await Promise.allSettled([
      getMenu(isMobile),
      getArticleList({count: limit, offset:start, filter: { post_type:"videos",'tags.slug':`ipl-${IPL_YEAR}` }, fields: 'id,display_headline,weburl_r,images,headline,intro,created_at'}),
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
  const SEOData =
    (seoData?.ipl_2022 || []).find(
      (seo) => seo.ipl_page_section === "ipl22_video"
    ) || {};
    let breadCrumbArray = [];
    const baseURL = publicRuntimeConfig.siteUrl;
    breadCrumbArray = [
      { slug: baseURL, value: 'होम' },
      { slug: baseURL + "cricket/", value: 'क्रिकेट' },
      { slug: baseURL + "cricket/ipl/", value: `IPL ${IPL_YEAR}` },
      { slug: currentUrl, value: 'वीडियो' }
    ];
  const pageSeo = {
    title: SEOData.meta_title || title,
    keywords: SEOData.meta_ipl_keyword || keywords,
    description: SEOData.meta_ipl_page_description || desc,
    canonical: publicRuntimeConfig.siteUrl + "cricket/ipl/videos/",
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/newsogimg_1632296929.jpg",
    isCricketNextHome: true,
    page: "Home",
    breadCrumbArray
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      SEOData.meta_title || title,
      SEOData.meta_ipl_page_description || desc,
      SEOData.meta_ipl_keyword || keywords,
      publicRuntimeConfig.siteUrl + "cricket/ipl/videos/",
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
    section: "IPL videos",
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
    videoPriorityData: videosData || [],
    dataLength: videosData.length || 0,
    paramObj,
    seoData: SEOData,
    showBannerInIPL,
    _1xbetData,
    taboolaList,
    menuData,
    liveTvFlag,
  };
  return { props: { pageData } };
};
export default iplVideosProps;