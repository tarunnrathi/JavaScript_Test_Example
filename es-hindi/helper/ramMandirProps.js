import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { rammandir as categoryAds } from "includes/Desktop/dfpAdIds";
import { rammandir as categoryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { ignoreQueryParams, arrayOnly } from "includes/article.util";
import {
  getRedisDataByMultiKey,
  getMenu,
  getDistricts,
  getMiscData,
  getGoogleConfig,
  getArticleList,
  getRedisDataByKey,
} from "api_dns/global/Common";
import { getArticlesByPriorityData } from "api_dns/individual/Home";
import { getWebStories } from "api_dns/global/Common";
import { jsonLdForHomeSiteNavigation, jsonLdForOrganization, jsonLdForWebPage } from "includes/schema.util";

const RamMandirProps = async (context, isAmp = false) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  const urlParam = context.query;

  let redisMulti = "";
  if (isMobile) {
    redisMulti =
      "KHABARN18-new_fms_system,KHABAR:HEADEMENU_L1,KHABARN18-bottomofpage,KHABARN18-SPONSER_MODULE_POSITION-home-page-banners,KHABARN18-amp_jio_savan,CRICKETNEXT:mainmenu";
  } else {
    redisMulti =
      "KHABARN18-new_fms_system,KHABARN18-bottomofpage,KHABARN18-SPONSER_MODULE_POSITION-home-page-banners,CRICKETNEXT:mainmenu";
  }

  
  let [
    categorySponserData = {},
    menuData = {},
    miscData = {},
    footerData = [],
    firebaseConfigData = {},
    districtList = {},
    topPriorityData,
    photoStories,
    videoStories,
    topNewsStories,
    webStoriesList,
    liveTvFlag= {}
  ] = await Promise.all([
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
    getMenu(isMobile),
    getMiscData({ trendingTags: true }),
    getRedisDataByKey("new_fms_system", "KHABARN18-"),
    getGoogleConfig(),
    isAmp && getDistricts(),
    getArticlesByPriorityData({count: 7, section: 'rammandir', subSection: 'NA', cache: { key: "get_ram-mandir-data", ttl: 60 }}),
    getArticleList({
        count: 7,
        offset: 0,
        sortOrder: "desc",
        sortBy: "created_at",
        filter: { post_type: "photogallery", "tags.slug": "ram-mandir" },
        fields: `headline,images,display_headline,weburl,categories,gallery_count,weburl_r`,
        cache: { key: "get_ram-photos", ttl: 300 }
      }),
    getArticleList({
        count: 5,
        offset: 0,
        sortOrder: "desc",
        sortBy: "created_at",
        filter: { post_type: "videos", "tags.slug": "ram-mandir" },
        fields: `headline,images,display_headline,weburl`,
        cache: { key: "get_ram-videos", ttl: 300 }
    }),
    getArticleList({
        count: 6,
        offset: 0,
        sortOrder: "desc",
        sortBy: "created_at",
        filter: { post_type: "text", "tags.slug": "ram-mandir" },
        fields: `headline,images,display_headline,weburl`,
        cache: { key: "get_ram-news", ttl: 300 }
    }),
    getWebStories({
        count: 6,
        sortOrder: "desc",
        sortBy: "created_at",
        filter: { categories: "uttar-pradesh" },
        fields: "blog_title,web_url_r,web_url,feature_img,categories",
      }),
    getRedisDataByKey("rammandirtv", "KHABARN18-")
  ]);
  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Ram Mandir"
  );
  const _1xbetData = catSponData?.sponserdata || [];
  
  let seoPageTitle =
    "Ayodhya Ram Mandir Latest News in Hindi, Live Coverage, Webstories, Photos, Videos, अयोध्या राम मंदिर लेटेस्ट समाचार, ब्रेकिंग न्यूज़";
  let pageDescription ="Ayodhya Ram Mandir News: Check अयोध्या राम मंदिर Latest and Breaking News in Hindi. Find Ram Lalla Temple Articles, Photos, Videos, Webstories, Live Coverage, Samachar at News18 Hindi.";
  let pageKeywords =
    "Ayodhya Ram Mandir, Ram Mandir Ayodhya, Ram Temple Ayodhya, Ayodhya Ram Temple, अयोध्या राम मंदिर,  Ram Janmabhoomi, Ram mandir, ram janmabhoomi, ayodhya mandir, रामजन्म भूमि, राममंदिर, राम जन्मभूमि अयोध्या, राम मंदिर, राम मंदिर अयोध्या उत्तर प्रदेश, राम मंदिर अयोध्या, अयोध्या मंदिर राम मंदिर के समाचार, राम मंदिर की ताजा खबरें, राम मंदिर फोटो, लेटेस्ट न्यूज़, Ayodhya Ram Mandir Live Coverage, Ayodhya Ram Mandir Webstories";

  let siteUrl = publicRuntimeConfig.siteUrl;
  let news = siteUrl + "news/";

  let finalURL = protocol + currentUrl?.split("/")[2] + "/" + "ayodhya-ram-mandir/";

  let pageSeo = {
    title: seoPageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    canonical: finalURL ? finalURL : currentUrl,
    pageUrl: finalURL || siteUrl,
    page: "ram-mandir",
  };
  pageSeo.jsonLdForOrganization = jsonLdForOrganization() || "";
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      seoPageTitle,
      pageDescription,
      pageKeywords,
      (currentUrl || "").toLowerCase(),
      {
        headline: seoPageTitle,
        intro: pageDescription,
        display_headline: pageDescription,
      },
    ) || "";
  // pageSeo.jsonLdForItemList = jsonLdForItemList(currentUrl, isMobile ? 16 : 24, siloListing);
  pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
    menuData,
    isMobile,
  );
  
  const pageAds = isMobile
    ? categoryMobileAds()
    : categoryAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: seoPageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    section: "RamMandir",
    weburl: finalURL || currentUrl,
  });

  const pageData = {
    isMobile,
    currentUrl,
    urlParam,
    districtList,
    menuData,
    pageSeo,
    cd19value: "Vidgyor Player",
    cd20value: "LiveTV",
    pageAds,
    footerData,
    miscData,
    topPriorityData,
    photoStories,
    videoStories,
    webStoriesList,
    topNewsStories,
    liveTvFlag,
    _1xbetData,
    _pageParam: {
      category: "Ayodhya Ram Mandir"
    },
    // iplAuctionList : iplAuctionList?.specialURL == currentUrl ? iplAuctionList : [],
    config: firebaseConfigData,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default RamMandirProps;
