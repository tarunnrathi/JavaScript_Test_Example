import { jsonLdForWebPage } from "includes/schema.util";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { getRashifalData } from "api_dns/individual/rashifal";
import {
  getDistricts,
  getMenu,
  getMiscData,
  getRedisDataByKey,
  getArticleList,
  getPriorityData,
  getGoogleConfig,
} from "api_dns/global/Common";
import { category as categoryAds } from "includes/Desktop/dfpAdIds";
import { category as categoryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { REDIS_KEYS, rashi } from "api/Constant";
import { validSlugChecker } from "includes/_app.util";

const webstoryProps = async (context, isAmp = false) => {
  const getChangedTime = (time) => {
    switch (time) {
      case "today":
        return "day";
      case "weekly":
        return "week";
      case "monthly":
        return "month";
      case "yearly":
        return "year";
      default:
        return "day";
    }
  };
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;
  const urlParam = context.query;
  const rashiName = rashi.find((rName) => urlParam.time === rName) || "";
  urlParam.time = getChangedTime(!rashiName ? urlParam.time : "");
  urlParam.name = urlParam.name
    ? urlParam.name
    : rashiName
    ? rashiName
    : "aries";
  let { time, name } = urlParam; // day aries
  name = validSlugChecker(name) ? name : "";

  const [
    menuData = {},
    miscData = {},
    topTrending = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    astroStories = {},
    districtList = {},
    googleRemoteConfig,
    rashifalData = {},
    dharmData = {},
    rashifalDetail = {},
    categorySponserData = {},
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getMiscData({ trendingTags: true }),
    !(isMobile || isAmp)
      ? getRedisDataByKey(REDIS_KEYS.TRENDING_TAG, false)
      : [],
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    !isMobile
      ? getArticleList({
          count: 4,
          fields: "display_headline,weburl,weburl_r,story_id,images",
        })
      : [],
    !isMobile
      ? getArticleList({
          count: 9,
          filter: { post_type: "photogallery" },
          fields:
            "gallery_count,display_headline,weburl,weburl_r,story_id,images",
        })
      : [],
    [],
    isAmp && getDistricts(),
    getGoogleConfig(),
    getRashifalData(name?.toLowerCase() || "aries", time),
    getPriorityData({
      section: "NA",
      subSection: "NA",
      fields: "display_headline,headline,images,weburl,intro,updated_at",
      count: 11,
      filter: { "categories.slug": "astro" },
      fallback: true,
    }),
    getRedisDataByKey(REDIS_KEYS.RASHIFAL_DETAIL, false),
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]);
  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];

  const {
    meta_title = "",
    meta_keyword = "",
    meta_description = "",
  } = rashifalData?.[0] || {};
  const pageSeo = {
    title:
      meta_title ||
      "Hindi News: Hindi Samachar, Hindi News Live TV, India News in Hindi, हिंदी न्यूज़ लाइव, हिन्दी समाचार - News18 हिन्दी",
    description:
      meta_description ||
      `Hindi News: Read Breaking News, Live Samachar in Hindi of
     Business, Sports, India, Education, Bollywood, Watch Live Hindi News TV and more on News18 Hindi.
     हिंदी समाचार की लोकप्रिय वेबसाइट पर देश, दुनिया, कारोबार, खेल, मनोरंजन से जुड़ी साडी खबरें विस्तार मैं पढ़े - न्यूज़18 हिंदी`,
    keywords:
      meta_keyword ||
      `Hindi news, news in hindi, breaking news in hindi,
     latest news in hindi,
     latest hindi news, today news in hindi, hindi news today, News18 Hindi, India News, India Hindi News, हिंदी समाचार, ताजा समाचार`,
    canonical: currentUrl,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    pageUrl: currentUrl,
    cat: urlParam.cat || "",
    page: "rashifal",
  };
  pageSeo.breadCrumbArray = [
    { value: "हिंदी न्यूज", slug: "" },
    { slug: "rashifal/", value: "एस्ट्रो" },
  ];

  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      pageSeo.title,
      pageSeo.description,
      pageSeo.keywords,
      currentUrl,
      "",
      false
    ) || "";
  const pageAds = isMobile
    ? categoryMobileAds({ t: "news", section: "astro" }, false)
    : categoryAds({ t: "news", section: "astro" }, false);
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    section: "astro",
    content_type: "News",
    block_ads: "no",
    meta_keywords: pageSeo.keywords,
    header: pageSeo.title,
  });
  const pageData = {
    isMobile,
    menuData,
    pageSeo,
    districtList,
    trendingTags: miscData.trendingTags || [],
    dharmData,
    topTrending,
    rashifalDetail,
    footerData,
    currentUrl,
    urlParam,
    pageAds,
    topStories,
    rashifalData,
    photoStories,
    astroStories: astroStories["daily"] || astroStories,
    config: googleRemoteConfig,
    _1xbetData,
  };
  return { props: { pageData } };
};
export default webstoryProps;
