import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { ignoreQueryParams } from "includes/article.util";
import {
  jsonLdForWebPage,
  jsonLdForHomeSiteNavigation,
} from "includes/schema.util";
import { minis as generateDesktopAds } from "includes/Desktop/dfpAdIds";
import { minis as generateMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { getArticlesByPriorityData } from "api_dns/individual/Home";
import {
  // getDistricts,
  getGoogleConfig,
  getMenu,
  getMiscData,
  getRedisDataByKey,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";
import { STATIC_IMAGE } from "constant/global/Constant";

const minisProps = async (context) => {
  const isMobile = checkDevice(context);
  let userAgent = "";
  if (context && context.req) {
    userAgent = context.req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = ignoreQueryParams(
    protocol + host + context.req.url,
    false
  );

  const domain = host.includes("localhost")
    ? "http://" + host
    : "https://" + host;
  let homeText = "हिंदी न्यूज";
  let breadCrumbArray = [
    { slug: "/", value: homeText },
    { slug: "", value: "मिनी" },
  ];

  let [
    menuData = {},
    miscData = {},
    footerData = [],
    topStories = [],
    photoStories = [],
    googleRemoteConfig = {},
    // districtList = {},
    newsMini = [],
  ] = await Promise.all([
    getMenu(isMobile),
    getMiscData({ trendingTags: true }),
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    !isMobile
      ? getArticlesByPriorityData({ count: 3, subSection: "text" })
      : [],
    !isMobile
      ? getArticlesByPriorityData({
          count: 9,
          subSection: "photogallery",
          filter: { post_type: "photogallery" },
        })
      : [],
    getGoogleConfig(),
    // getDistricts(),
    getArticlesByPriorityData({
      count: 15,
      section: "news18_mini",
      subSection: "NA",
    }),
  ]);

  let title =
    "News18 Hindi Minis: News Brief of India, World, Sports, Business, States, Career, Entertainment";
  let description =
    "Get Latest News Brief of India, Sports, Business, Entertainment, Career, World, Lifestyle, Jobs, Education, Technology, Cricket and more on News18 Minis.";
  let keywords =
    "News18 Hindi Minis, News Brief, News Reviews, News Highlights, Latest News, News in Brief";
  let og_description =
    "Mobile Phone News &amp; Updates: Find Mobile Phones Prices, Features, Specifications and other updates on News18 Hindi Mobiles section.";

  const pageSeo = {
    title: title,
    description: description,
    keywords: keywords,
    canonical: currentUrl.split("page")[0],
    og_image: STATIC_IMAGE.MAIN_SITE_LOGO,
    pageUrl: publicRuntimeConfig.siteUrl,
    og_title: title,
    og_description: og_description,
  };

  if (typeof pageContent != "undefined" && pageContent != "") {
    pageSeo.jsonLdForWebPage =
      jsonLdForWebPage(
        title,
        description,
        keywords,
        currentUrl ? currentUrl.split("?")[0] : "",
        ""
      ) || "";
    pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
      menuData,
      isMobile
    );
  }

  const pageAds = isMobile ? generateMobileAds("") : generateDesktopAds("");

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: title,
    description: description,
    seo_keywords: keywords,
    weburl: currentUrl,
    article_id: "",
    sectionName: "minis",
    content_type: "minis",
    block_ads: "no",
  });

  let sales_banner = [];
  let bannerData1 = Object.values(sales_banner).filter(
    (banner) => banner.home_page === "1"
  );
  let _1xbetData = bannerData1[0]?.sponserdata || [];
  pageSeo.breadCrumbArray = breadCrumbArray;
  let pageData = {
    menuData,
    trendingTags: miscData.trendingTags || [],
    pageSeo,
    footerData,
    currentUrl,
    // districtList,
    isMobile,
    topStories,
    photoStories,
    config: googleRemoteConfig,
    categoryName: "मिनी",
    newsMini,
    breadCrumbArray,
    domain,
    pageAds,
    _1xbetData,
  };

  return { props: { pageData } };
};

export default minisProps;
