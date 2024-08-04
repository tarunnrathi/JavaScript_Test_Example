import {
  getArticleList,
  // getDistricts,
  getGoogleConfig,
  getMenu,
  getMiscData,
  getRedisDataByKey,
} from "api_dns/global/Common";
import { ignoreQueryParams } from "includes/article.util";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { home as homeAds } from "includes/Desktop/dfpAdIds";
import { home as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { STATIC_IMAGE } from "constant/global/Constant";

export default async function notificationHubProps(context) {
  const isMobile = checkDevice(context);
  const { host } = context.req.headers;
  const protocol = host.indexOf("localhost") > -1 ? "http://" : "https://";
  const currentUrl = ignoreQueryParams(protocol + host + context.req.url);

  const [
    menuData = {},
    miscData = {},
    googleRemoteConfig = {},
    // districtList = {},
    footerData = [],
    notificationData = {},
    photoStories = [],
    topStories = [],
  ] = await Promise.all([
    getMenu(isMobile),
    getMiscData({
      trendingTags: true,
      catName: true,
      image: true,
    }),
    getGoogleConfig(),
    // getDistricts(),
    getRedisDataByKey("new_fms_system", "KHABARN18-"),
    getRedisDataByKey("all_pusth_notification_data"),
    !isMobile
      ? getArticleList({
          count: 9,
          offset: 0,
          fields:
            "story_id,headline,images,display_headline,weburl,gallery_count",
          filter: { post_type: "photogallery" },
        })
      : [],
    !isMobile
      ? getArticleList({
          count: 5,
          offset: 0,
          fields: "story_id,headline,images,display_headline,weburl",
          filter: { post_type: "news" },
        })
      : [],
  ]);

  const groupByDate = {};
  let count = 0;
  (notificationData?.data || []).forEach((data) => {
    const [date = false] = data.pushtime.split(" ") || [""];
    if (date && groupByDate[date]) {
      count = count + 1;
      groupByDate[date].push({ ...data, count: count });
    } else if (date) {
      count = count + 1;
      groupByDate[date] = [{ ...data, count: count }];
    }
  });

  const pageSeo = {
    title:
      "Breaking News: Get Hindi Top News Headlines Today and Current Affairs Latest News Update",
    description:
      "Breaking News: Get Hindi Top News Headlines Today and Current Affairs from Bihar, Uttar Pradesh, Rajasthan, Madhya Pradesh, Delhi Haryana, Punjab and other Parts of India Including World, Entertainment, Business, Politics, Sports",
    keywords:
      "Breaking News, Hindi News, Current Affairs, Bihar News, Uttar Pradesh News, Rajasthan News, Madhya Pradesh News, World News, Haryana News, Punjab News, Politics News, Entertainment News, Business News",
    canonical: currentUrl + "/",
    og_image: STATIC_IMAGE.MAIN_SITE_LOGO,
    page: "notification hub",
  };

  const pageAds = isMobile ? homeMobileAds() : homeAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.description,
    weburl: currentUrl,
    article_id: "",
    section: "notification hub",
    block_ads: "no",
  });
  // const baseURL = publicRuntimeConfig.siteUrl;
  const breadCrumbArray = [
    { slug: "/", value: "होम" },
    { slug: "/notification-hub/", value: "NOTIFICATION HUB" },
  ];

  return {
    props: {
      pageData: {
        currentUrl,
        isMobile,
        menuData,
        miscData,
        googleRemoteConfig,
        // districtList,
        pageSeo,
        pageAds,
        footerData,
        groupByDate,
        breadCrumbArray,
        photoStories,
        topStories,
      },
    },
  };
}
