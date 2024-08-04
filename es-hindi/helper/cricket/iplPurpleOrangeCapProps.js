import { checkDevice, getSetTargettingValues } from "includes/helper";
import {
  jsonLdForCricketSiteNavigation,
  jsonLdForWebPage,
} from "includes/schema.util";
import { getIPLPointsTableDetails } from "includes/seo.util";
import { arrayOnly } from "includes/article.util";
import { IPLPage as homeAds } from "includes/Desktop/dfpAdIds";
import { IPLPage as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { IPL_SERIES_ID } from "includes/ipl.helper";
import { TaboolaList } from "includes/Tabola.helper";
import { getDistricts, getRedisDataByMultiKey, getCricketDataDirect, getMenu,getRedisDataByKey } from "api_dns/global/Common";
import { IPL_YEAR } from "includes/ipl.helper";
const getCurrentURL = (context) => {
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  return protocol + host + context.req.url;
};
const iplOrangePurpleCapProps = async (
  context,
  isPurpleCapPage = false,
  isMostSixesPage = false
) => {
  const isMobile = checkDevice(context);
  const currentUrl = getCurrentURL(context);
  const { title, desc, keywords } = getIPLPointsTableDetails();
  const ipl_series_id = IPL_SERIES_ID; // new series id(2023): '5157';
  const serial_id = isPurpleCapPage ? 13 : isMostSixesPage ? 8 : 2;
  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-NW_IPL_SEO_MANAGE_2022";
  let footerData = [], crMenu = [], sales_banner = [], seoData = {};
  let [
      menuData = {},
      tableData = [],
      // districtList = {},
      ImageIdsAvailable = [],
      redisMultiResults = [],
      liveTvFlag= {},
  ] = await Promise.allSettled([
      getMenu(isMobile),
      getCricketDataDirect(`stat/${serial_id}/${ipl_series_id}`),
      // getDistricts(),
      [],
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
  const seoComparePage = isPurpleCapPage
    ? "ipl22_purple_cap_page"
    : isMostSixesPage
    ? "ipl22_most_sixes_page"
    : "ipl22_orange_cap_page";
  const SEOData =
    (seoData?.ipl_2022 || []).find(
      (seo) => seo.ipl_page_section === seoComparePage
    ) || {};
    let breadCrumbArray = [];
    const baseURL = publicRuntimeConfig.siteUrl;
    const pageLabel = isPurpleCapPage ? "IPL पर्पल कैप" : !isMostSixesPage ? "IPL ऑरेंज कैप" : "MOST SIXES";
    breadCrumbArray = [
      { slug: baseURL, value: 'होम' },
      { slug: baseURL + "cricket/", value: 'क्रिकेट' },
      { slug: baseURL + "cricket/ipl/", value:  `IPL ${IPL_YEAR}` },
      { slug: currentUrl, value: pageLabel }
    ];
  const pageSeo = {
    title: SEOData.meta_title || title,
    keywords: SEOData.meta_ipl_keyword || keywords,
    description: SEOData.meta_ipl_page_description || desc,
    canonical: isPurpleCapPage ? publicRuntimeConfig.siteUrl + "cricket/ipl/purple-cap/"
    : !isMostSixesPage ? publicRuntimeConfig.siteUrl + "cricket/ipl/orange-cap/" : publicRuntimeConfig.siteUrl + "cricket/ipl/most-sixes/",
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/newsogimg_1632296929.jpg",
    isCricketNextHome: true,
    page: "points-table",
    breadCrumbArray
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      isPurpleCapPage ? `IPL Purple Cap ${IPL_YEAR} - Most Wickets in IPL ${IPL_YEAR}, Purple Cap List, आईपीएल ${IPL_YEAR} पर्पल कैप होल्डर` :
       !isMostSixesPage ? `IPL Orange Cap ${IPL_YEAR} (ऑरेंज कैप) - Most Runs in IPL ${IPL_YEAR}, Orange Cap List, ऑरेंज कैप होल्डर` :
        `IPL ${IPL_YEAR} Most Sixes: Know Who Hit the Most Sixes in IPL Season 16, आईपीएल में सबसे ज्यादा छक्के मारने वाले खिलाड़ी`,
      isPurpleCapPage ? "आईपीएल पर्पल कैप होल्डर" : !isMostSixesPage ?
       "आईपीएल ऑरेंज कैप होल्डर" : `Most sixes in IPL ${IPL_YEAR}`,
      isPurpleCapPage ? `'Ipl ${IPL_YEAR} purple cap,'आईपीएल पर्पल कैप होल्डर','पर्पल कैप विजेताओं की सूची','आईपीएल ${IPL_YEAR} पर्पल कैप','पर्पल कैप ${IPL_YEAR}','हाईएस्ट विकेट टेकर इन आईपीएल',
      'आईपीएल में सबसे अधिक विकेट लेने वाले गेंदबाज','highest wicket taker in Ipl ${IPL_YEAR}'` :
       !isMostSixesPage ? `'Ipl ${IPL_YEAR} orange cap','highest runs in ipl ${IPL_YEAR}','आईपीएल ऑरेंज कैप होल्डर',
       'ऑरेंज कैप विजेताओं की सूची','आईपीएल ${IPL_YEAR} ऑरेंज कैप','ऑरेंज कैप ${IPL_YEAR}','हाईएस्ट रन इन आईपीएल','आईपीएल में सबसे ज्यादा रन बनाने वाले बल्लेबाज'` :
        `'IPL','IPL ${IPL_YEAR}','IPL Season 16','IPL Most Sixes','IPL Most Sixes Players'`,
      isPurpleCapPage ? publicRuntimeConfig.siteUrl + "cricket/ipl/purple-cap/" :
       !isMostSixesPage ? publicRuntimeConfig.siteUrl + "cricket/ipl/orange-cap/" : publicRuntimeConfig.siteUrl + "cricket/ipl/most-sixes/",
      null,
      false,
      false,
      false
    ) || "";
  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(
    arrayOnly(crMenu)
  );
  const tableLeaderData = tableData?.leaderboard || [];
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
    tableData: tableLeaderData,
    ImageIdsAvailable,
    showBannerInIPL,
    _1xbetData,
    taboolaList,
    menuData,
    liveTvFlag
  };
  return { props: { pageData } };
};
export default iplOrangePurpleCapProps;