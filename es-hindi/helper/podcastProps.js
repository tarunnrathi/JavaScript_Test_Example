import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { customizeUrl, ignoreQueryParams } from "includes/article.util";
import {
  podcastDataDetails,
  latestPodcastDataRes,
  getDataWithCategoryId,
  getPodcastDataWithArticleId,
} from "api_dns/individual/Podcast";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import {
  jsonLdForPodcastWebPage,
  jsonLdForItemList,
  jsonLdForPodcastArticle,
  jsonLdForAudioObject,
  jsonLdForPodcastEpisode,
} from "includes/schema.util";
import {
  podcast as podcastAds,
  podcastSubCategory as podcastSubCategoryAds,
  podcastDetails as podcastDetailsAds,
} from "includes/Desktop/dfpAdIds";
import {
  podcast as podcastMobileAds,
  podcastSubCategory as mpodcastSubCategoryAds,
  podcastDetails as mpodcastDetailsAds,
} from "includes/Mobile/dfpAdIdsMobile";
import {
  getMiscData,
  getDistricts,
  RhstopStories,
  getMenu,
  getRedisDataByKey,
  getGoogleConfig,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";

const podcastProps = async (context, isAmp = false) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  let categoryData = [];
  const query = context.query;
  const article = query.article;
  const page = query.page;
  const articleArray = article ? article.split(".") : "";
  const articleUrlArray = article
    ? articleArray?.length && articleArray[0].split("-")
    : "";
  let articleId = article
    ? articleUrlArray?.[articleUrlArray.length - 1]
    : "";

  if (!articleId || isNaN(articleId)) {
    articleId = "";
  }
  const pageLimit = 10;
  const startNumber = page ? (page - 1) * pageLimit : 0;
  // get podcast Data
  let categoryId = "";
  let isCategory = false;
  let categoryName = "";
  let data = await getRedisDataByKey(REDIS_KEYS.PODCAST_DATA, false);
  data = Array.isArray(data) ? data : [];

  data.map((item) => {
    if (query.category === item.slug) {
      categoryId = item.ID;
      categoryName = item.name;
      isCategory = true;
    }
  });

  if (query && query.category && !categoryId) {
    return {
      notFound: true,
    };
  }

  let [
    podcastData = [],
    latestPodcastData = [],
    menuData = {},
    miscData = {},
    footerData = [],
    photogallery = [],
    googleRemoteConfig,
  ] = await Promise.all([
    podcastDataDetails(data),
    latestPodcastDataRes(),
    getMenu(isMobile, isAmp),
    getMiscData({ trendingTags: true }),
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    getDataWithCategoryId(categoryId, 0, pageLimit),
    getDataWithCategoryId(categoryId, startNumber, pageLimit),
    getGoogleConfig(),
  ]);

  let [
    categoryData2 = {},
    categoryData3 = {},
    topStories = [],
    districtList = {},
  ] = await Promise.all([
    articleId ? getPodcastDataWithArticleId(articleId) : {},
    getDataWithCategoryId(categoryId, startNumber, pageLimit),
    !isMobile
      ? RhstopStories({
          count: 4,
          section: "category",
          subSection: "nation",
          filter: { post_type: "text" },
          fields: "story_id,headline,weburl,images,display_headline",
        })
      : [],
    isAmp && getDistricts(),
  ]);
  if (categoryData3.length === 0 && page) {
    return {
      notFound: true,
    };
  }
  let categoryDetailsData = {
    articleDetails: categoryData2,
    articlesList: categoryData3,
    categoryList: data,
    isCategory: isCategory,
  };

  const articleData = categoryDetailsData?.articleDetails;
  //const { categoryList } = categoryDetailsData;
  const home_title =
    "Free Podcast Audio in Hindi | Online Podcast Hindi News List | Podcast Music - News18 हिंदी";
  const categoryList_title = `${categoryName} Hindi Podcast: ${categoryName} in Audio in Hindi | Online Podcast Hindi News List | Podcast Music - News18 Hindi`;
  const home_desc =
    "Check out our roundup of some of the best free podcasts audio in Hindi. Listen to recent audio news in Hindi on politics, entertainment, technology and more at News18 हिंदी.";
  const categoryList_desc = `Get ${categoryName} in Hindi audio at News18 Hindi. Listen to breaking and latest news in Hindi audio on politics, entertainment, technology and more at News18 Hindi.`;
  const home_keyWord =
    "Podcast Hindi, Podcast News in Hindi, Entertainment Podcast news Hindi, Politics news in audio Hindi, Sports news in audio Hindi, Listen Hindi News in Audio";
  const categoryList_keyWord = `${categoryName} in Hindi audio','Podcast Hindi News','Podcast News in Hindi','Latest news in audio','News in Audio`;
  // let meta_title = "";
  // let meta_keyword = "";
  // let meta_description = "";

  // if (!articleData || !articleData.story_id) {
  //   return {
  //     notFound: true,
  //   };
  // }

  if (
    typeof articleData != "undefined" &&
    articleData != "" &&
    typeof articleData.story_id != "undefined" &&
    articleData.story_id != ""
  ) {
    let article_slug = articleData.weburl.replace(
      /^(http|https)?:\/\/hindi.news18.com/,
      `${isAmp ? "/amp" : ""}`
    );
    let webUrl = articleData.weburl.replace(
      /^(http|https)?:\/\/hindi.news18.com\//,
      publicRuntimeConfig.siteUrl + `${isAmp ? "amp/" : ""}`
    );

    if (article_slug != ignoreQueryParams(context?.req?.url)) {
      if (webUrl !== ignoreQueryParams(currentUrl) && !page) {
        context?.res.setHeader("Retry-After", 31536000);
        return {
          redirect: {
            destination: customizeUrl(webUrl),
            statusCode: 301,
          },
        };
      }
    }
  }
  let keyWords = context.query?.category
    ? context.query?.article
      ? (articleData !== null && articleData?.meta_keyword) || "News18 Hindi"
      : categoryList_keyWord
    : home_keyWord;
  let description = context.query.category
    ? context.query.article
      ? (articleData !== null && articleData?.meta_description) ||
        articleData.intro ||
        "News18 Hindi"
      : categoryList_desc
    : home_desc;
  let title = context.query.category
    ? context.query.article
      ? (articleData !== null && articleData?.meta_titile) ||
        articleData.title ||
        "News18 Hindi"
      : categoryList_title
    : home_title;

  let itemList = [];

  podcastData &&
    podcastData.length &&
    podcastData.map((ele) => {
      ele.podcast &&
        ele.podcast.length &&
        ele.podcast.map((podacst) => itemList.push(podacst));
    });
  latestPodcastData &&
    latestPodcastData.length &&
    latestPodcastData.map((podcast) => itemList.push(podcast));

  const pageSeo = {
    title: title || "",
    description: description,
    keywords: keyWords,
    canonical: page ? currentUrl.split("page")[0] : `${currentUrl}`,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    isPodcast: true,
  };

  if (context.query.category && !context.query.article) {
    categoryData = [];
  } else if (context.query.article && !article.includes("page-")) {
    categoryData = {};
  }

  if (page) {
    categoryData = [];
  }

  if (!context.query.article) {
    if (!context.query.category) {
      pageSeo.jsonLdForItemList = jsonLdForItemList(
        currentUrl,
        itemList.length,
        itemList
      );
    }
    pageSeo.jsonLdForWebPage =
      jsonLdForPodcastWebPage(
        pageSeo.title,
        pageSeo.description,
        pageSeo.keywords,
        publicRuntimeConfig.siteUrl + "podcast/"
      ) || "";
  }

  if (context.query.article) {
    pageSeo.jsonLdForNewsArticle =
      jsonLdForPodcastArticle(
        articleData && articleData.headline,
        articleData && articleData.tag_topic,
        articleData && articleData.intro,
        articleData && articleData.timestampCreationDate,
        articleData && articleData.timestampUpdateDate,
        articleData && articleData.body,
        "podcast",
        `${publicRuntimeConfig.siteUrl}/podcast/${categoryName}/${context.query.article}`
      ) || "";
    pageSeo.jsonLdForAudioObject =
      jsonLdForAudioObject(
        (articleData && articleData.images?.url) || articleData.thumbnail,
        articleData && articleData.weburl,
        title,
        description,
        articleData && articleData.timestampCreationDate
      ) || "";
    pageSeo.jsonLdForPodcastEpisode =
      jsonLdForPodcastEpisode(
        articleData && articleData.weburl,
        articleData && articleData.headline,
        articleData && articleData.timestampCreationDate,
        articleData && articleData.timestampUpdateDate,
        description
      ) || "";
  }

  const desktopAds = context.query.article
    ? podcastDetailsAds()
    : context.query.category
    ? podcastSubCategoryAds()
    : podcastAds();

  const mobileAds = context.query.article
    ? mpodcastDetailsAds()
    : context.query.category
    ? mpodcastSubCategoryAds()
    : podcastMobileAds();

  const pageAds = isMobile ? mobileAds : desktopAds;
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: title || "",
    description: description || "",
    seo_keywords: keyWords || "",
    weburl: currentUrl,
    article_id: "",
    block_ads: "no",
  });

  const urlParam = context.query;
  let pageNumber = parseInt(urlParam.page) || 1;
  let paramObj = {
    categoryId: categoryId,

    requestURL: currentUrl,
    page: pageNumber,
  };

  const categoriesList = categoryDetailsData?.categoryList || [];
  const breadCrumbArray = [{ value: "होम", slug: "/" }];
  if (!query.category && !query.page && !query.article) {
    breadCrumbArray.push({ value: "Podcast" });
  } else {
    breadCrumbArray.push({ value: "Podcast", slug: "/podcast/" });
    breadCrumbArray.push({
      value:
        categoriesList &&
        categoriesList.map((item) => {
          return item.slug === query.category ? item.name : "";
        }),
    });
  }
  let pageData = {
    isMobile,
    menuData,
    breadCrumbArray,
    query,
    pageLimit,
    districtList,
    categoryDetailsData,
    photogallery,
    currentUrl,
    categoryData,
    pageAds,
    pageSeo,
    trendingTags: miscData.trendingTags || [],
    loadTv: true,
    footerData,
    topStories,
    podcastData,
    latestPodcastData,
    config: googleRemoteConfig,
    dataLength: categoryData.length || 0,
    paramObj,
  };

  // Pass data to the page via props
  return { props: { pageData } };
};
export default podcastProps;
