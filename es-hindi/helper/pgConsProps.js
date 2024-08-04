import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { article as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { article as articleAds } from "includes/Desktop/dfpAdIds";
import {
  checkDevice,
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
  jsonLdForImageGallery,
  jsonLdForMovie,
  jsonLdForRecipe,
  faq_schema,
  jsonLdForHomeSiteNavigation,
} from "includes/schema.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getArticleByIdFields } from "api_dns/individual/Article";
import {
  getMiscData,
  getArticleList,
  RhsphotoStories,
  getRedisDataByMultiKey,
  getGoogleConfig,
  getDistricts,
  getMenu,
  getPriorityData,
  getRedisDataByKey
} from "api_dns/global/Common";
import { getCompleteURL } from "util/global/Helper";
import { CONST_CAT_PAGE } from "api/Constant";

const photoGalleryConsumptionProps = async (
  context,
  isAmp = false,
) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let host = context.req.headers.host;
  protocol = host.indexOf("localhost") > -1 && "http://";
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  let onlyURL =  context.req.url.split("?")[0];
  const urlParam = context.query;
  const id = urlParam.post_id;
  const cat = urlParam.cat || "";
  const subCat = urlParam.subCat || "";
  const pv = urlParam.pv_candidate || "";
  let pageNumber = urlParam.gid || "";
  currentUrl = urlParam.gid
    ? currentUrl.replace(`-page-${urlParam.gid}`, "")
    : currentUrl;
  let paramObj = {
    id: id,
    category: cat,
    subCategory: subCat,
    requestURL: currentUrl,
    pv,
  };
  let category = cat === "" && subCat !== "" ? subCat : cat !== "" ? cat : "";  
  let articleData = await getArticleByIdFields(id, "photogallery");
  const isCricketNext = false;
  let isNotFound = false;
  if (
    articleData === null ||
    articleData === "" ||
    typeof articleData?.story_id === "undefined" ||
    articleData?.status === "0"|| 
    articleData.post_type!=='photogallery'
  ) {
    isNotFound = true;
  }
  
  if (isNotFound) {
    let redirect_url = await getRedirection(currentUrl);
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
  if (articleData.gallery && articleData.gallery.length > 0 && isAmp) {
    let dex = pageNumber ? pageNumber - 1 : 0;
    if (pageNumber > articleData.gallery.length) {
      dex = 0;
      articleData.current = articleData.gallery[0];
      articleData.current.dex = 1;
    } else {
      articleData.current = articleData.gallery[dex];
      articleData.current.dex = dex + 1;
    }
    articleData.next = JSON.stringify(
      articleData.gallery
        .map((item, index) => {
          if (index === dex) {
            return null;
          }

          return {
            url:
              publicRuntimeConfig.siteUrl +
              "amp/" +
              articleData.weburl
                .replace(
                  ".html",
                  `-page-${index + 1}.html?pv_candidate=${index + 1}`
                )
                .split(".com/")
                .pop(),
            image: item.img,
            title: item.caption,
          };
        })
        .filter(Boolean)
    );
  }
  let redisMulti = "";
  if (isMobile) {
    redisMulti =
      "KHABARN18-new_fms_system,KHABARN18-bottomofpage,KHABARN18-SPONSER_MODULE_POSITION-home-page-banners,CRICKETNEXT:mainmenu";
  } else {
    redisMulti =
      "KHABARN18-new_fms_system,KHABARN18-bottomofpage,KHABARN18-SPONSER_MODULE_POSITION-home-page-banners,CRICKETNEXT:mainmenu";
  }
  let footerData = [],
    CTAtext = [],
    dynamicBanner = [],
    crMenu = [],
    stories = [];

  let [
    metaData = [],
    menuData = {},
    miscData = {},
    topPriorityStories = [],
    topStories = [],
    photoStories = [],
    googleRemoteConfig = {},
    //cricketData = {},
    redisMultiResults = {},
    relatedArticle = [],
    districtList = {},
    categorySponserData = {},
  ] = await Promise.all([
    extractMetatags(articleData, id),
    getMenu(isMobile, isAmp),
    getMiscData({
      trendingTags: true,
      catName: true,
      cat: `${subCat || cat}`,
      image: true,
    }),
    getPriorityData({
      count: (!isMobile || !isAmp) ? 9 : 5,
      subSection: "photogallery",
      filter: { post_type: "photogallery" },
      fields: "story_id,images,display_headline,headline,weburl,weburl_r",
    }),
    getArticleList({
      count: 5,
      fields: "story_id,headline,display_headline,images,weburl,weburl_r",
      filter: {
        post_type: "text",
        "categories.slug": subCat || cat || "nation",
      },
    }),
    (!isMobile || !isAmp) ? RhsphotoStories() : [],
    getGoogleConfig(),
    getRedisDataByMultiKey(redisMulti),
    getArticleList({
      count: 1,
      fields:
        "story_id,headline,display_headline,images,weburl,category,weburl_r",
      filter: {
        not: { story_id: id },
        post_type: "photogallery",
        "categories.slug": cat,
      },
    }),
    isAmp && getDistricts(),
    await getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]);

  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];

  const photoTs = (!isMobile || !isAmp) ? topPriorityStories.splice(4) : [];
  if (Object.keys(redisMultiResults)?.length > 0) {
    let keys = Object.keys(redisMultiResults);
    if (isAmp || isMobile) {
      [
        footerData,
        CTAtext,
        dynamicBanner,
        crMenu,        
      ] = keys.map((i) => (redisMultiResults[i] ? redisMultiResults[i] : []));
    } else {
      [footerData, CTAtext, dynamicBanner, crMenu] = keys.map((i) =>
        redisMultiResults[i] ? redisMultiResults[i] : []
      );
    }
  }
  // if (cricketData && articleData !== "") {
  //   articleData.cricketData = {
  //     ...cricketData,
  //     id: articleData.match_id,
  //     title: articleData.display_headline,
  //   };
  // }
  articleData.stories = stories;
  articleData.addSavaan = "on";

  topPriorityStories =
    topPriorityStories?.length > 0
      ? topPriorityStories.filter((data) => {
          if (data.story_id === Number(id)) {
            return false;
          }
          return true;
        })
      : [];
  topPriorityStories = topPriorityStories.slice(0, 5);

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
  let postMeta = metaData;

  if (article && article !== "" && article.story_id) {
    seoPageTitle = headline;
    pageDescription =
      postMeta?.["page_description"] && postMeta?.["page_description"] !== ""
        ? postMeta["page_description"]
        : intro
        ? intro
        : headline;
    seoPageTitle =
      postMeta?.["page_title"] && postMeta?.["page_title"] !== ""
        ? postMeta["page_title"] + " – News18 हिंदी"
        : seoPageTitle + " – News18 हिंदी";

    pageKeywords =
      postMeta?.["page_keywords"] &&
      postMeta?.["page_keywords"] !== ""
      ? postMeta["page_keywords"]
      : pageKeywords||'';
      
  }
  let siteUrl = publicRuntimeConfig.siteUrl;
  let news = siteUrl + "news/";
  let hires = articleData?.images_all_sizes?.sizes?.["16x9"]?.url;
  let res43 = articleData?.images_all_sizes?.sizes?.["4x3"]?.url;
  let finalURL =
    protocol +
    currentUrl?.split("/")[2] +
    "/" +
    articleData?.weburl?.split(".com/")[1];
  paramObj.requestURL = finalURL || currentUrl;
  let pageSeo = {
    title:
      seoPageTitle && urlParam.gid && urlParam.gid != "1"
        ? `Page-${urlParam.gid} - ${seoPageTitle}`
        : seoPageTitle || "404 Not Found",
    description: pageDescription,
    keywords: pageKeywords,
    canonical: getCompleteURL(article?.weburl_r ,article?.weburl),
    og_image: hires || res43 || thumbnailUrl,
    news: news,
    cat: cat,
    pageUrl: finalURL || siteUrl,
    og_title: articleData.og_title
      ? articleData.og_title
      : headline.replace(/(<([^>]+)>)/gi, ""),
    og_description: pageDescription || pageDescription || "",
    isPhoto:true,
    hires: hires || false,
    caption: articleData.images?.caption,
    res43: res43 || false,
    author: article["byline"] || "Hindi Editor",
    page: "photogallery",
  };
  
  pageSeo.jsonLdForImageGallery =
    jsonLdForImageGallery(articleData, isAmp) || "";

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
  pageSeo.jsonLdForFaqSchema = faq_schema(articleData, pageDescription);
  pageSeo.jsonLdForRecipe = jsonLdForRecipe(articleData);
  pageSeo.jsonLdForMovie = jsonLdForMovie(articleData);
  pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
    menuData,
    isMobile
  );
  let subCategory = articleData?.subsection
    ? articleData?.subsection[0]?.slug
    : "";
  const pageAds = isMobile
    ? homeMobileAds(urlParam, true, subCategory, false)
    : articleAds(urlParam.cat, true, subCategory, false);
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: seoPageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    weburl: finalURL || currentUrl,
    article_id: article["story_id"],
    content_type: "photogallery",
    block_ads: article["is_adult_content"] == 1 ? "yes" : "no",
  });

  let allSlashSplitted = articleData?.weburl?.split("/");
  let newsIndex;
  // if (allSlashSplitted?.[3] === "news") {
  //   newsIndex = allSlashSplitted?.indexOf("news");

  //   if (allSlashSplitted?.length - allSlashSplitted?.indexOf("news") === 3) {
  //     category = allSlashSplitted?.[newsIndex + 1] || category;
  //   }
  // } else
   if (allSlashSplitted[3] === "photogallery") {
    newsIndex = allSlashSplitted?.indexOf("photogallery");
    if (
      allSlashSplitted?.length - allSlashSplitted?.indexOf("photogallery") ===
      3
    ) {
      category = allSlashSplitted?.[newsIndex + 1] || category;
    }
  }
  const tempObj = [
    { slug: `${publicRuntimeConfig.siteUrl}`, value: "हिंदी समाचार" },
    { slug: `${publicRuntimeConfig.siteUrl}photogallery/`, value: "PHOTO GALLERY" },
    {
      slug: `${publicRuntimeConfig.siteUrl}photogallery/${category}/`,
      value: category?.toUpperCase() || "",
    },
    {
      slug: articleData?.posturl || articleData?.weburl,
      value: articleData?.headline || articleData?.breadcrumb,
    },
  ];  
  
  pageSeo.breadCrumbArray = tempObj;
  let taboolaList = TaboolaList.photoPage;      
  const dataLayer = {
    articleId: id,
    category: cat,
    subCategory: subCat,
  };
  const states = CONST_CAT_PAGE.STATES;
  const sectionListTr = CONST_CAT_PAGE.SECTION_LIST_TR;
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
  const category_hi = getSectionTranslation(category);

  const pageData = {
    taboolaList,
    isMobile,
    articleData,
    currentUrl,
    urlParam,
    metaData,
    category,
    breadCrumbArray: tempObj,
    categoryName: category || subCat || cat,
    menuData,
    pageSeo,
    pageAds,
    trendingTags: miscData.trendingTags || [],
    pageNumber: parseInt(pageNumber),
    paramObj,
    topStory: { rhsTopStoryListing: topPriorityStories },
    footerData,
    topStories,
    photoStories,
    isCricketNext,
    crMenu: arrayOnly(crMenu),
    photoTs,
    config: googleRemoteConfig,
    dynamicBanner: dynamicBanner || {},
    finalURL,
    relatedArticle,
    districtList,
    _1xbetData,
    section:category || subCat || cat,
    category_hi,
  };
  return { props: { pageData, dataLayer } };
};
export default photoGalleryConsumptionProps;
