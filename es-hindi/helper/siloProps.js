import getConfig from "next/config";
import { silo as siloAds } from "includes/Desktop/dfpAdIds";
import { silo as siloMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import {
  checkDevice,
  getSetTargettingValues,
} from "includes/helper";
import { ignoreQueryParams } from "includes/article.util";
import {
  jsonLdForWebPage,
  jsonLdForOrganization,
  jsonLdForHomeSiteNavigation,
  jsonLdForNewsArticle,
} from "includes/schema.util";
import {
  getArticleList,
  // getDistricts,
  getGoogleConfig,
  getMenu,
  getMiscData,
  getRedisDataByKey,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";
import { getSiloById, getSiloList } from "api_dns/individual/silo";

const { publicRuntimeConfig } = getConfig();
const siloProps = async (context) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  const { host = "" } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  const urlParam = context.query;
  const { id, topic, subTopic } = urlParam;

  const [
    menuData = {},
    miscData = {},
    topTrending = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    // districtList = {},
    googleRemoteConfig,
    siloListing = [],
  ] = await Promise.all([
    getMenu(isMobile),
    getMiscData({ trendingTags: true }),
    !isMobile ? getRedisDataByKey(REDIS_KEYS.TRENDING_TAG, false) : [],
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    !isMobile
      ? getArticleList({
          count: 4,
          fields: "display_headline,weburl_r,story_id,images",
        })
      : [],
    !isMobile
      ? getArticleList({
          count: 3,
          filter: { post_type: "photogallery" },
          fields: "gallery_count, display_headline,weburl_r,story_id,images",
        })
      : [],
    // getDistricts(),
    getGoogleConfig(),
    id ? getSiloById(id) : getSiloList(),
  ]);

  if (id && siloListing && siloListing.length === 0) {
    return {
      notFound: true,
    };
  }

  let seoPageTitle =
    "Latest Trending Topics: Find in-depth Coverage on Trending Topics";
  let pageDescription =
    "Latest Trending Topics: पढ़ें धर्म, खेल, बिज़नेस से संबंधित टॉपिक की इन-डेप्थ जानकारी न्यूज़18 हिंदी पर.";
  let pageKeywords = "Trending Topics, Latest Trending News, Latest Trends";
  let pageSeo = {};
  let tempObj = [
    { slug: `${publicRuntimeConfig.siteUrl}`, value: "होम" },
    { slug: `${publicRuntimeConfig.siteUrl}topics`, value: "विषय" },
  ];
  if (id) {
    const siloTopic = siloListing[0] || {};
    seoPageTitle =
      siloTopic?.meta_titile ||
      "Latest Trending Topics: Find in-depth Coverage on Trending Topics";
    pageDescription =
      siloTopic?.meta_description ||
      "Latest Trending Topics: पढ़ें धर्म, खेल, बिज़नेस से संबंधित टॉपिक की इन-डेप्थ जानकारी न्यूज़18 हिंदी पर.";
    pageKeywords =
      siloTopic?.meta_keyword ||
      "Trending Topics, Latest Trending News, Latest Trends";
    pageSeo.jsonLdForNewsArticle = jsonLdForNewsArticle("Silo", currentUrl);
    tempObj = [
      { slug: `${publicRuntimeConfig.siteUrl}`, value: "होम" },
      {
        slug: `${publicRuntimeConfig.siteUrl}${topic}/info-${id}`,
        value: topic,
      },
    ];
    subTopic &&
      tempObj.push({
        slug: `${publicRuntimeConfig.siteUrl}${topic}/${
          subTopic ? subTopic + "-" : ""
        }-info-${id}`,
        value: subTopic,
      });
    tempObj.push({ slug: ``, value: siloTopic?.headline_s || "" });
  }

  pageSeo = {
    ...pageSeo,
    title: seoPageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    canonical: currentUrl + (currentUrl.slice(-1) === "/" ? "" : "/"),
    pageUrl: currentUrl,
  };
  pageSeo.breadCrumbArray = tempObj;

  const pageAds = isMobile
    ? siloMobileAds(id ? "AS" : "AL")
    : siloAds(id ? "AS" : "AL");
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: seoPageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    weburl: currentUrl,
  });

  pageSeo.jsonLdForOrganization = jsonLdForOrganization() || "";
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      seoPageTitle,
      pageDescription,
      pageKeywords,
      (currentUrl || "").toLowerCase(),
      {
        headline: "",
        intro: "",
        display_headline: "",
      },
    ) || "";
  // pageSeo.jsonLdForItemList = jsonLdForItemList(currentUrl, isMobile ? 16 : 24, siloListing);
  pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
    menuData,
    isMobile,
  );
  const pageData = {
    isMobile,
    menuData,
    pageSeo,
    // districtList,
    trendingTags: miscData.trendingTags || [],
    topTrending,
    footerData,
    currentUrl,
    urlParam,
    pageAds,
    topStories,
    siloListing,
    photoStories,
    config: googleRemoteConfig,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default siloProps;
