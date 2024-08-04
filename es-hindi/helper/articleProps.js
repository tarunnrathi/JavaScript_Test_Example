import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import {
  article as homeMobileAds,
  liveblog as liveBlogMobileAds,
} from "includes/Mobile/dfpAdIdsMobile";
import {
  article as articleAds,
  liveblog as liveBlogAds,
} from "includes/Desktop/dfpAdIds";
import {
  checkDevice,
  get_site_link,
  getSetTargettingValues,
} from "includes/helper";
import {
  ignoreQueryParams,
  arrayOnly,
  extractMetatags,
  getRedirection,
} from "includes/article.util";
import {
  jsonLdForHomeOrganization,
  jsonLdForArticleConsumption,
  jsonLdForWebPage,
  jsonLdForVideoObject,
  jsonLdForMovie,
  jsonLdForRecipe,
  faq_schema,
  jsonLdForLiveBlog,
  jsonLdForHomeSiteNavigation,
  jsonLdForNonYTVideoObject,
} from "includes/schema.util";

const { articleBodyParser } = require("../helper/articleBodyParser");

import { TaboolaList } from "includes/Tabola.helper";
import { getArticleById, getLiveBlog } from "api_dns/individual/Article";
import {
  getMiscData,
  RhsphotoStories,
  getRedisDataByMultiKey,
  getDistricts,
  getGoogleConfig,
  RhstopStories,
  getMenu,
  getCricketData,
  getVideoStreamData,
  getArticleList,
  getRedisDataWithKey,
  getRedisDataByKey,
} from "api_dns/global/Common";
import { CONST_CAT_PAGE, REDIS_KEYS } from "api/Constant";
import { getIsLiveMatch, getActiveInning } from "includes/ipl.helper";
import {
  WATSAPP_FIXED_CAT,
  WATSAPP_FLOATING_CAT,
} from "constant/global/Constant";
import { getCategoryExist } from "util/global/Helper";

const artilceProps = async (context, isAmp = false) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let isNewLiveBlog = false;
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  const urlParam = context.query;
  const id = urlParam.post_id;
  const cat = urlParam.cat || "";
  const subCat = urlParam.subcat || "";
  const pv = urlParam.pv_candidate || "";
  const pageNumber = urlParam.gid || "";
  let cd19value = "";
  let cd20value = "";
  let isFeature = false;

  if (!id || isNaN(id)) {
    return {
      notFound: true,
    };
  }

  if (urlParam.gid) {
    currentUrl = currentUrl.replace(`-page-${urlParam.gid}`, "");
  }

  const paramObj = {
    id: id,
    category: cat,
    subCategory: subCat,
    requestURL: currentUrl,
    pv,
  };

  let videoTitle = "";
  let callJsOnFkYt = false;
  let category = "";
  if (cat !== "") {
    category = cat;
  }
  if (cat === "" && subCat !== "") {
    category = subCat;
  }

  //new API ..Don't change
  const articleData = await getArticleById(id);
  const isCricketNext = false;
  let isNotFound = false;
  if (
    !articleData ||
    typeof articleData !== "object" ||
    !articleData?.story_id ||
    articleData.post_type !== "text"
  ) {
    isNotFound = true;
  }
  if (isNotFound) {
    const redirect_url = await getRedirection(currentUrl);
    if (!redirect_url) {
      return {
        notFound: true,
      };
    } else {
      return {
        redirect: {
          destination: redirect_url,
          statusCode: 301,
        },
      };
    }
  }
  articleData.subsection = arrayOnly(articleData.subsection);
  if (articleData?.local18_video) {
    videoTitle = articleData?.display_headline;
    isFeature = true;
  }
  let vidStreamData = {},
    vid_exist = false;
  if (publicRuntimeConfig.inHousePlayer) {
    vidStreamData = await getVideoStreamData(articleData, true);
    if (vidStreamData && Object.keys(vidStreamData).length > 0) {
      vid_exist = true;
    }
  }
  articleData.vidStreamData = vidStreamData;
  articleData.vid_exist = vid_exist;

  const redisMulti =
    "KHABARN18-new_fms_system,KHABARN18-bottomofpage,KHABARN18-SPONSER_MODULE_POSITION-home-page-banners";
  if (articleData?.liveblog_switcher == 1) {
    isNewLiveBlog = true;
  }

  let isDistrict = false;
  if (
    articleData &&
    articleData.ff_source &&
    articleData.ff_source === "Hyperlocal"
  ) {
    isDistrict = true;
  }

  let footerData = [],
    CTAtext = [],
    dynamicBanner = [];

  const stories = [];
  const [
    metaData = [],
    menuData = {},
    miscData = {},
    topStories = [],
    photoStories = [],
    googleRemoteConfig = {},
    redisMultiResults = {},
    // trendingStories = [],
    districtList = {},
    newMatchData = {},
    liveBlogList = [],
    specialLiveBlog = {},
    // categorySponserData = {},
  ] = await Promise.all([
    extractMetatags(articleData, id),
    getMenu(isMobile, isAmp),
    !isMobile || !isAmp
      ? getMiscData({
          trendingTags: true,
          catName: true,
          cat: `${subCat || cat}`,
          image: true,
        })
      : {},
    !isMobile
      ? RhstopStories({
          count: 4,
          section: "category",
          subSection: cat ? cat : "nation",
          filter: { post_type: "text" },
          fields: "story_id,headline,weburl,images,display_headline",
        })
      : [],
    RhsphotoStories(),
    getGoogleConfig(),
    getRedisDataByMultiKey(redisMulti),
     // getPriorityData({
    //   count: 12,
    //   section: "trending",
    //   subSection: cat || "NA",
    //   fields: "story_id,display_headline,post_type,images,weburl,weburl_r",
    //   filter: { "categories.slug": cat, post_type: "text" },
    //   cache: { key:`${cat || "NA"}_trending_stories`, ttl: 300},
    //   fallback: false,
    // }),
    isDistrict ? getDistricts() : {},
    articleData?.match_id
      ? getCricketData(`match/${articleData?.match_id}/`)
      : {},
    !isAmp
      ? getArticleList({
          count: 4,
          offset: 0,
          filter: { liveblog_switcher: 1 },
          fields: `headline,created_at,weburl,weburl_r,updated_at`,
          cache: { key: "get_liveBlogList_data", ttl: 60 },
        })
      : [],
    getRedisDataWithKey("KHABARN18-" + REDIS_KEYS.SPECIAL_LIVE_BLOG, false),
    // await getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]);

  // const catSponData = Object.values(categorySponserData || {})?.find(
  //   (item) => item.campagin_name === "Lok Sabha Election 2024"
  // );
  // const _1xbetData = catSponData?.sponserdata || [];

  if (
    Object.keys(newMatchData).length > 0 &&
    newMatchData?.teamb_en &&
    newMatchData?.teama_en
  ) {
    newMatchData.isLive = getIsLiveMatch(newMatchData?.status);
    const currentInnings = getActiveInning(newMatchData);
    newMatchData.currentInnings = currentInnings;
    articleData.cricketData = newMatchData;
  }

  if (Object.keys(redisMultiResults)?.length > 0) {
    const keys = Object.keys(redisMultiResults);
    [footerData, CTAtext, dynamicBanner] = keys.map((i) =>
      redisMultiResults[i] ? redisMultiResults[i] : []
    );
  }

  articleData.stories = stories;
  articleData.addSavaan = "on";

  const article = articleData || {};
  const {
    headline = "",
    intro = "",
    images: { url: thumbnailUrl = "" } = {},
    tag_topic: tagTopic = [],
  } = article;
  let seoPageTitle = "";
  let pageDescription = "";
  let pageKeywords = tagTopic;
  const postMeta = metaData;
  if (article && article.story_id) {
    seoPageTitle =
      postMeta?.["page_title"] && postMeta?.["page_title"] !== ""
        ? postMeta["page_title"] + " - News18 हिंदी"
        : headline + " - News18 हिंदी";

    pageDescription =
      pageDescription === ""
        ? postMeta?.["page_description"] === ""
          ? intro
          : postMeta?.["page_description"]
        : "";

    pageKeywords =
      postMeta?.["page_keywords"] && postMeta?.["page_keywords"] !== ""
        ? postMeta["page_keywords"]
        : "";
  }

  const { siteUrl } = publicRuntimeConfig;
  const news = siteUrl + "news/";
  const hires = articleData?.images_all_sizes?.sizes?.["16x9"]?.url;
  const res43 = articleData?.images_all_sizes?.sizes?.["4x3"]?.url;

  const finalURL =
    protocol +
    currentUrl?.split("/")[2] +
    "/" +
    articleData?.weburl?.split(".com/")[1];

  paramObj.requestURL = finalURL || currentUrl;
  const pageSeo = {
    title:
      seoPageTitle && urlParam.gid && urlParam.gid !== "1"
        ? `Page-${urlParam.gid} - ${seoPageTitle}`
        : seoPageTitle || "404 Not Found",
    description: pageDescription||"",
    keywords: pageKeywords,
    canonical: isAmp
      ? finalURL.replace("amp/", "") || currentUrl.replace("amp/", "")
      : finalURL
      ? finalURL
      : currentUrl,
    og_image: hires || res43 || thumbnailUrl,
    news: news,
    cat: cat,
    pageUrl: finalURL || siteUrl,
    og_title: articleData.og_title
      ? articleData.og_title
      : headline.replace(/(<([^>]+)>)/gi, ""),
    og_description: pageDescription || pageDescription || "",
    isPhoto: false,
    hires: hires || false,
    caption: articleData.images?.caption || "",
    res43: res43 || false,
    author: article["byline"] || "Hindi Editor",
    page: "article",
  };

  //Live blog data
  let liveBlog = {};
  let liveBlogFlag = false;
  let liveBlogAPI = "";
  let isLiveNow = false;
  if (
    articleData &&
    articleData.liveblog_api_url &&
    articleData.liveblog_api_url.blog_url
  ) {
    liveBlogAPI = articleData.liveblog_api_url.blog_url;
    liveBlogFlag = true;
    // if(articleData.liveblog_api_url.status == "1") {
    //   isLiveNow = true;
    // }
    isLiveNow = articleData.isLive;
    try {
      // let { tag, time } = urlParser(liveBlogAPI);
      liveBlog = {};
      pageSeo.jsonLdForLiveBlog = jsonLdForLiveBlog(
        articleData,
        liveBlog,
        pageKeywords
      );
    } catch (error) {
      // console.log(error);
      liveBlogFlag = false;
    }
  }

  if (articleData?.liveblog_switcher === 1) {
    liveBlog = true;
  }

  if (!isAmp) {
    pageSeo.ampHtml =
      publicRuntimeConfig.siteUrl +
      "amp/" +
      get_site_link(finalURL || currentUrl);
  }

  // if (isPhoto) {
  //   pageSeo.jsonLdForImageGallery =
  //     jsonLdForImageGallery(articleData, isAmp) || "";
  // }

  if (isNewLiveBlog) {
    const LIVEBLOGPOSTCOUNT = 20;
    const data = await getLiveBlog({
      count: LIVEBLOGPOSTCOUNT,
      storyId: id,
      date: "",
      dir: "prev",
      fields:
        "story_id,id,is_highlight,is_sticky,status,created_by,updated_by,created_at,updated_at,blog_title,blog_content,date_timestamp",
    });
    if (data) {
      articleData.liveUpdates = data;
      articleData.latestTime = data.latestTime || articleData.updated_at;
      articleData.latestTimeStamp = data.latestTime || articleData.updated_at;
      articleData.pageNumber = pageNumber ? Number(pageNumber) : pageNumber;
      pageSeo.jsonLdForLiveBlog = jsonLdForLiveBlog(
        articleData,
        data,
        pageKeywords,
        true
      );
      pageSeo.liveBlogNext =
        pageNumber && data.posts.length == LIVEBLOGPOSTCOUNT
          ? articleData.weburl.replace(
              ".html",
              `-page-${Number(pageNumber) + 1}.html`
            )
          : data.posts.length === LIVEBLOGPOSTCOUNT
          ? articleData.weburl
          : false;
      pageSeo.liveBlogPrev =
        pageNumber && pageNumber === LIVEBLOGPOSTCOUNT
          ? articleData.weburl
          : pageNumber
          ? articleData.weburl.replace(
              ".html",
              `-page-${Number(pageNumber) - 1}.html`
            )
          : false;
    }
  }
  pageSeo.jsonLdForOrganization = jsonLdForHomeOrganization() || "";
  pageSeo.jsonLdForArticleConsumption =
    jsonLdForArticleConsumption(articleData, "", isAmp, pageKeywords) || "";
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      articleData.headline,
      articleData.headline && articleData.headline.body,
      pageKeywords,
      articleData.weburl,
      articleData
    ) || "";
  // pageSeo.jsonLdForImageObject = jsonLdForImageObject(articleData) || '';

  if (articleData?.local18_video) {
    pageSeo.jsonLdForVideoObject =
      jsonLdForNonYTVideoObject(
        articleData,
        pageDescription,
        pageSeo.keywords
      ) || "";
  } else if (articleData?.youtubeid) {
    pageSeo.jsonLdForVideoObject =
      jsonLdForVideoObject(articleData, pageDescription) || "";
  }
  pageSeo.jsonLdForFaqSchema = faq_schema(articleData, pageDescription);
  pageSeo.jsonLdForRecipe = jsonLdForRecipe(articleData);
  pageSeo.jsonLdForMovie = jsonLdForMovie(articleData);
  pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
    menuData,
    isMobile
  );
  // pageSeo.jsonLdForSiteNavigation = jsonLdForSiteNavigation(news, cat) || '';
  // pageSeo.jsonLdForOrganization = jsonLdForOrganization(articleData) || '';
  const catAttr = liveBlogFlag ? "LiveBlog" : category;
  const subCategory = articleData?.subsection
    ? articleData?.subsection[0]?.slug
    : "";
  const pageAds = isMobile
    ? isNewLiveBlog
      ? liveBlogMobileAds()
      : homeMobileAds(urlParam, false, subCategory, isDistrict)
    : isNewLiveBlog
    ? liveBlogAds()
    : articleAds(urlParam.cat, false, subCategory, isDistrict);
  //Added By Umesh For adding moneyMatters section code name
  const tagsCheck = (articleData.tags || []).map((t) => t.slug);
  const results = [];
  tagsCheck.forEach((x) => {
    if (
      x.includes("banking") ||
      x.includes("stock-market") ||
      x.includes("mutual-fund") ||
      x.includes("insurance")
    )
      results.push(x);
  });
  // let city = "";
  // let State = "";

  // selectedCity will be single object found from district list
  const selectedCity =
    (districtList?.cityData &&
      districtList?.cityData.filter((c) =>
        articleData?.categories?.find((i) => i.id === c.id)
      )?.[0]) ||
    {};

  // if (selectedCity && selectedCity?.slug) {
  //   city = selectedCity?.slug;
  //   State = selectedCity?.stateName;
  // }

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: seoPageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    weburl: finalURL || currentUrl,
    article_id: article["story_id"],
    section: results.length > 0 ? "MoneyMatters" : catAttr, // condition added for Money Matters
    content_type: "News",
    block_ads: article["is_adult_content"] == 1 ? "yes" : "no",
    State: urlParam?.cat,
    city: article["city_name"],
  });

  if (articleData) {
    const {
      parsedBody,
      body,
      cd19,
      cd20,
      isFakeYoutubeplayer,
      showRelatedWidget,
    } = await articleBodyParser(
      articleData.body,
      !isMobile,
      id,
      pageAds,
      !(liveBlogFlag || articleData?.liveblog_switcher == 1),
      articleData.tags,
      articleData.nw_desktop_add,
      articleData.nw_amp_add,
      stories,
      articleData.weburl,
      false,
      articleData
    );
    articleData.parsedBody = parsedBody;
    articleData.body = body;
    articleData.showRelatedWidget = showRelatedWidget;
    cd19value = cd19;
    cd20value = cd20;
    callJsOnFkYt = isFakeYoutubeplayer;
    if (CTAtext?.bottomofpage?.[0]?.bottomofpage) {
      articleData.cta = CTAtext?.bottomofpage?.[0]?.bottomofpage;
    }
  }
  const states = CONST_CAT_PAGE.STATES;
  const sectionListTr = CONST_CAT_PAGE.SECTION_LIST_TR;

  // get section translation
  const getSectionTranslation = (key = "") => {
    let data = [];
    data =
      districtList?.cityData &&
      districtList.cityData.filter((itm) => itm.slug === key.toLowerCase()) || [];
    if (!data.length) {
      data =
        districtList?.stateData &&
        districtList.stateData.filter((itm) => itm.slug === key.toLowerCase());
    }
    if (data && data.length && data[0]) {
      return data[0].name;
    } else if (states[key.toLowerCase()]) {
      return states[key.toLowerCase()];
    } else {
      return sectionListTr[key.toLowerCase()] || key;
    }
  };

  const ElectionsHomeBanner = false;

  // const fs_cons_id = "";
  // let fs_statename = "";

  const allSlashSplitted = articleData?.weburl?.split("/");
  let newsIndex;
  if (allSlashSplitted?.[3] === "news") {
    newsIndex = allSlashSplitted?.indexOf("news");

    if (allSlashSplitted?.length - allSlashSplitted?.indexOf("news") === 3) {
      category = allSlashSplitted?.[newsIndex + 1] || category;
    }
  }
  const category_hi = getSectionTranslation(category);
  const tempObj = [
    { slug: `${publicRuntimeConfig.siteUrl}`, value: "हिंदी समाचार" },
    { slug: `${publicRuntimeConfig.siteUrl}news/`, value: "न्यूज" },
    {
      slug: `${publicRuntimeConfig.siteUrl}news/${category}/`,
      value: category_hi,
    },
    {
      slug: articleData?.posturl || articleData?.weburl,
      value: articleData?.headline || articleData?.breadcrumb,
    },
  ];
  pageSeo.breadCrumbArray = tempObj;
  const taboolaList = TaboolaList.articlePage;

  const dataLayer = {
    articleId: id,
    category: cat,
    subCategory: subCat,
  };

  let isFloatingWatsAppShare = false;
  let isFixecWatsAppShare = false;
  const resultForFloating = getCategoryExist(
    articleData?.categories,
    WATSAPP_FLOATING_CAT
  );
  const resultForFixed = getCategoryExist(
    articleData?.categories,
    WATSAPP_FIXED_CAT
  );
  isFloatingWatsAppShare = resultForFloating > 0;
  isFixecWatsAppShare = resultForFixed > 0;

  const pageData = {
    taboolaList,
    isMobile,
    articleData: typeof articleData === "object" ? articleData : {},
    currentUrl,
    urlParam,
    metaData,
    liveBlog,
    liveBlogFlag,
    liveBlogAPI,
    districtList,
    category,
    category_hi: category_hi || "",
    categoryName: category || subCat || cat,
    menuData,
    pageSeo,
    pageAds,
    trendingTags: miscData.trendingTags || [],
    pageNumber: parseInt(pageNumber),
    paramObj,
    // isPhoto: false,
    isLiveNow,
    footerData,
    topStories,
    photoStories,
    isCricketNext,
    config: googleRemoteConfig,
    dynamicBanner: dynamicBanner || {},
    ElectionsHomeBanner,
    isNewLiveBlog,
    finalURL,
    isDistrict,
    selectedCity: selectedCity || "",
    cd19value,
    cd20value,
    videoTitle,
    isFeature,
    callJsOnFkYt,
    // trendingStories,
    // fs_statename,
    // fs_cons_id,
    vidStreamData,
    vid_exist,
    liveBlogList,
    isFloatingWatsAppShare,
    isFixecWatsAppShare,
    breadCrumbArray: tempObj,
    specialLiveBlog,
    // _1xbetData,
  };
  // Pass data to the page via props
  return { props: { pageData, dataLayer } };
};
export default artilceProps;
