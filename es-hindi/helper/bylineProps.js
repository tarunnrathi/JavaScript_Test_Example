import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { generateAdTags } from "config/ads.config";
import {
  checkDevice,
  getSetTargettingValues,
} from "includes/helper";
import { generateMobileAdTags } from "config/ads_pwa.config";
// import fetchUtility from "includes/sFetchUtility";
import { ignoreQueryParams } from "includes/article.util";
import {
  jsonLdForWebPage,
  jsonLdForHomeSiteNavigation,
  jsonLdForItemList,
  jsonLdForByliePage
} from "includes/schema.util";
import {
  getDistricts,
  getMenu,
  getMiscData,
  getRedisDataByKey,
  getArticleList,
  getGoogleConfig,
  getAuthorName,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";

const bylineProps = async (context, isAmp = false, isTag = true) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url, false);
  const urlParam = context.query;

  let topic = urlParam.topic || "";
  let ct = urlParam.ct || "";
  let byId = urlParam.authId || "";
  let pageNumber = parseInt(urlParam.page) || 1;
  const checkUrl = context.req.url;
  const canonicalUrl =
    urlParam.page || checkUrl === "/byline/"
      ? currentUrl
      : currentUrl.slice(-1) === "/"
      ? currentUrl.slice(0, -1)
      : currentUrl;

  var pagests = topic.search(".htmlpage"); //now n equals 6
  if (pagests === -1) {
    //console.log('Not found')
  } else {
    context.res.statusCode = 410;
    return {
      notFound: true,
    };
  }

  if (topic == "news" || topic == "videos" || topic == "photogallery") {
    ct = topic;
    topic = "";
  }

  let paramObj = {
    topic: topic,
    ct: ct ? ct + "/" : "",
    requestURL: currentUrl,
    page: pageNumber,
    authId: byId,
  };

  let subString = byId ? byId : "";

  switch (true) {
    case byId !== "" && ct === "news":
      subString = { all_authors: `${byId}` };
      break;
    case byId !== "" && ct === "videos":
      subString = { post_type: "videos", all_authors: `${byId}` };
      break;
    case byId !== "" && ct === "photogallery":
      subString = { post_type: "photogallery", all_authors: `${byId}` };
      break;
    case byId === "" && ct === "news":
      subString = { all_authors: "1469" };
      break;
    case byId === "" && ct === "videos":
      subString = { post_type: "videos", all_authors: "1469" };
      break;
    case byId === "" && ct === "photogallery":
      subString = { post_type: "photogallery", all_authors: "1469" };
      break;
    case byId !== "" && ct === "":
      subString = { all_authors: `${byId}` };
      break;
    case byId === "" && ct === "":
      subString = null;
      break;
    default:
      subString = null;
      break;
  }

  let tagResult = [];
  let topicResult = {};
  const pageLimit = isMobile ? 16 : 15;
  let offset = pageNumber ? (pageNumber - 1) * pageLimit : 0;
  topicResult = await getRedisDataByKey(`author_byline_${byId}`);
  if (topicResult && Object.keys(topicResult).length && !topicResult.status) {
    return {
      notFound: true,
    };
  }
  tagResult = subString === null ? [] : await getArticleList({
    count: pageLimit,
    offset: offset,
    filter: subString,
    fields: "weburl_r,display_headline,images,intro,post_type,section,created_at,ff_source,local18_video,headline,weburl,updated_at",
  });

  if(tagResult.length === 0 && byId) {
    tagResult = await getArticleList({
      count: pageLimit,
      offset: offset,
      filter: { 'author.id': `${byId}` },
      fields: "weburl_r,display_headline,images,intro,post_type,section,created_at,ff_source,local18_video,headline,weburl,updated_at",
    });
    if(tagResult?.length > 0) subString = { 'author.id': `${byId}`};
  }

  if (tagResult.length === 0 && !(checkUrl === "/byline/")) {
    context.res.statusCode = 404;
    return {
      notFound: true,
    };
  }

  let tagData = tagResult || [];
  let bylineUserData = topicResult || {};
  let author =
    bylineUserData?.language_name ||
    bylineUserData?.hindi_name ||
    bylineUserData?.english_name ||
    bylineUserData?.nicename ||
    urlParam?.topic||"";

  let page_title = "";
  let page_description = "";
  let page_keywords = "";

  function capitalize(input) {
    if (input) {
      var words = input.split("-");
      var CapitalizedWords = [];
      words.forEach((element) => {
        if (element.length) {
          CapitalizedWords.push(
            element[0].toUpperCase() + element.slice(1, element.length),
          );
        }
      });
      return CapitalizedWords.join(" ");
    } else {
      return "";
    }
  }

  let TopicName = capitalize(author);

  // meta details start
  page_title = `${topic} - Latest hindi news, हिंदी न्यूज़ लाइव  ${ct} on News18 हिंदी`;
  page_keywords = ` ${topic} by ${ct}, hindi news by ${topic}, breaking hindi news ${topic}, hindi news`;
  page_description = `Read the latest हिंदी न्यूज़ by ${topic} on the exclusive news in hindi, trending topics, breaking news in hindi and top headlines पढ़ें हिंदी न्यूज़ वेबसाइट News18 हिंदी . most read ${ct} All views expressed here are personal`;

  let [
    menuData = {},
    miscData = {},
    topPriorityStories = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    googleRemoteConfig = {},
    districtList = {},
    authorData = {},
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getMiscData({ trendingTags: true }),
    !isMobile
      ? getArticleList({
          count: 5,
          filter: { post_type: "text" },
          fields: "display_headline,weburl_r,weburl_r,story_id,images,weburl",
        })
      : [],
    !isAmp ? getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM) : [],
    !isMobile
      ? getArticleList({
          count: 5,
          fields: "display_headline,weburl_r,story_id,images,weburl",
        })
      : [],
    !isMobile
      ? getArticleList({
          count: 9,
          filter: { post_type: "photogallery" },
          fields: "display_headline,weburl,weburl_r,story_id,images,weburl,gallery_count",
        })
      : [],
    getGoogleConfig(),
    isAmp && getDistricts(),
    getAuthorName({ count: 50, filter: { starts_with: "a" } }),
  ]);
  const authorsListData = authorData || [];

  let seoPageTitle = page_title;
  let pageDescription = page_description;
  let pageKeywords = page_keywords;

  let siteUrl = publicRuntimeConfig.siteUrl;
  let news = siteUrl + "tag/";
  let pageSeo = {
    title: seoPageTitle || "404 Not Found",
    description: pageDescription,
    keywords: pageKeywords,
    canonical: canonicalUrl,
    og_image: "",
    news: news,
    pageUrl: siteUrl,
    og_title: seoPageTitle,
    og_description: pageDescription,
    isTag,
    topic,
    ct,
    page: "Byline",
  };

  if (typeof tagData != "undefined" && tagData != "") {
    pageSeo.jsonLdForWebPage =
      jsonLdForWebPage(page_title, pageDescription, pageKeywords, currentUrl, {
        headline: "",
        intro: "",
        display_headline: "",
      }) || "";

    pageSeo.jsonLdForItemList = jsonLdForItemList(
      currentUrl,
      isMobile ? 16 : 24,
      tagData,
    );
    pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
      menuData,
      isMobile,
    );
    pageSeo.jsonLdForProfile = jsonLdForByliePage(
      topicResult,
      tagData,
      currentUrl    
    );
  }

  const pageAds = isMobile
    ? generateMobileAdTags("listing", "topic")
    : generateAdTags("listing", "topic");
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: seoPageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    weburl: currentUrl,
    article_id: "",
    section: topic != "" ? topic : "Tag",
    content_type: "TOPIC",
    block_ads: "no",
  });
  pageAds.isTag = true;

  const imageWidth = isMobile ? "400" : "225";
  const imageHeight = isMobile ? "124" : "150";

  const pageData = {
    isMobile,
    tagData,
    offset,
    currentUrl,
    urlParam,
    pageLimit,
    dataLength: tagResult?.length || 0,
    imageWidth,
    imageHeight,
    topic,
    subString,
    topicName: TopicName || "",
    ct,
    bylineUserData,
    menuData,
    pageSeo,
    pageAds,
    // districtList,
    trendingTags: miscData.trendingTags || [],
    topStory: { rhsTopStoryListing: topPriorityStories },
    pageNumber: parseInt(pageNumber),
    paramObj,
    footerData,
    topStories,
    photoStories,
    isMobile,
    config: googleRemoteConfig,
    authorsListData,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default bylineProps;

