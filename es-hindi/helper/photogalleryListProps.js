import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { photoGallery as photoGalleryAds } from "includes/Desktop/dfpAdIds";
import { photoGallery as photoGalleryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { jsonLdForWebPage, jsonLdForItemList } from "includes/schema.util";
import { TaboolaList } from "includes/Tabola.helper";
import {
  getTopPriorityData,
  getBottomStoriesList,
} from "api_dns/individual/PhotogalleryDetails";
import {
  getMenu,
  getMiscData,
  getRedisDataByKey,
  // getDistricts,
  getPageMeta,
  getArticleList,
  getGoogleConfig,
  getRedisDataWithKey,
} from "api_dns/global/Common";
import { REDIS_KEYS, CONST_CAT_PAGE } from "api/Constant";
import { getTopNews, getTopSpecialWidget } from "api_dns/individual/Home";
import { validSlugChecker } from "includes/_app.util";

const photogalleryListProps = async (context) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);
  let section = "",
    subsection = "",
    page = "";
  const {
    sectionOrPage: sectionOrPage = "",
    subSectionOrPage: subSectionOrPage = "",
    subSectionPage: subSectionPage = "",
  } = context.query;

  if (sectionOrPage) {
    if (
      sectionOrPage.includes("page-") ||
      sectionOrPage.includes("manoranjan") ||
      sectionOrPage.includes(".html") ||
      !validSlugChecker(sectionOrPage)
    ) {
      page = sectionOrPage.substring(5);
      if (isNaN(page)) {
        return {
          notFound: true,
        };
      }
    } else {
      section = sectionOrPage;
    }
  }
  if (subSectionOrPage) {
    if (
      subSectionOrPage.includes("page-") ||
      subSectionOrPage.includes("(") ||
      subSectionOrPage.includes(")") ||
      subSectionOrPage.includes("%") ||
      subSectionOrPage.includes("*") ||
      subSectionOrPage.includes("$")
    ) {
      page = subSectionOrPage.substring(5);
      if (isNaN(page)) {
        return {
          notFound: true,
        };
      }
    } else {
      subsection = validSlugChecker(subSectionOrPage)
        ? subSectionOrPage === "null"
          ? ""
          : subSectionOrPage
        : "";
    }
  }
  if (subSectionPage) {
    if (subSectionPage.includes("page-")) {
      page = subSectionPage.substring(5);
      if (isNaN(page)) {
        return {
          notFound: true,
        };
      }
    }
  }

  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  if (host.indexOf("127.0.0.1:3050") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;
  const tf = "photogallery";
  let pageNumber;
  const stripslashes = (str) => {
    if (!str) return str;
    return str
      .replace(/\\'/g, "'")
      .replace(/\"/g, '"')
      .replace(/\\\\/g, "\\")
      .replace(/\\0/g, "\0");
  };
  const get_section_name = (slug) => {
    const g = get_section(slug);
    return g;
  };

  const is_paging = page >= 1 ? 1 : 0;
  let curr_page_no = 1;
  let pageLimit = isMobile ? 16 : 24;
  let _page = "";
  let pageStrExist = false;
  // const changecat = ["auto", "culture"];
  // let query_arr = "";
  let query_string = "";
  // const contentType = "photogallery";
  let _sliderNeed = false;
  let newStart = 0;

  if (pageNumber === "") {
    curr_page_no, (pageNumber = 1);
  }
  if (page) {
    _page = page.replace("page-", "_");
    curr_page_no = parseInt(_page);
    _page = "/" + curr_page_no;
    pageStrExist = true;
  } else {
    _page = "/" + curr_page_no;
  }
  const categoryListData = await getRedisDataWithKey("categories", true);
  const get_section = (slg) => {
    let slug = slg;
    if (categoryListData) {
      switch (slug) {
        case "desh":
          slug = "nation";
          break;
        case "khel":
          slug = "sports";
          break;
        case "manoranjan":
          slug = "entertainment";
          break;
        case "ghar-parivar":
          slug = "family-and-welfare";
          break;
        case "karobar":
          slug = "business";
          break;
        case "chalo-ghoom-aayen":
          slug = "travel";
          break;
        case "duniya":
          slug = "world";
          break;
        case "dharm-karm":
          slug = "spirituality";
          break;
        default:
          slug;
      }
      return categoryListData[slug];
    } else {
      return [];
    }
  };

  //Find the section exists or not
  const category = subsection ? get_section(subsection) : get_section(section);
  if (subsection !== "") {
    query_string = "photogallery/" + section + "/" + subsection + "/";
  } else {
    query_string = tf + "/" + section + "/";
  }
  const limitpage = isMobile ? 16 : 24;
  let offset, page_index;
  if (page) {
    offset = (page - 1) * limitpage;
    page_index = page > 1 ? " Page-" + page : "";
  } else {
    offset = 0;
    page_index = "";
  }

  /**
   * Meta details start here
   */
  let page_title,
    page_description,
    page_keywords,
    slugVal = "";
  let metaSlug = "";
  if (subsection !== "") {
    metaSlug = subsection;
  } else if (section !== "") {
    metaSlug = section;
  }
  let metaData = {};
  let currentTag = "";
  slugVal =
    subsection !== "" ? subsection.replace("-", "") : section.replace("-", "");
  page_title =
    "News18 हिंदी India Photo Gallery: News in Hindi Photo Gallery, News18 इंडिया तस्वीरें";
  page_description =
    "News18 हिंदी India photo gallery brings you best photo collection on all recent topics including latest photo galleries on Bollywood, cricket, entertainment, politics and more.";
  page_keywords =
    "News18 हिंदी India Photo Gallery,  तस्वीरें , Best photo collection, Cricket Photos, Hot Photos, Latest Photo Galleries";
  if (section !== "") {
    slugVal = slugVal.charAt(0).toUpperCase() + slugVal.slice(1);
    page_title =
      slugVal +
      " Photogallery: Latest " +
      slugVal +
      " Photos, Pictures - News18 हिंदी India";
    page_description =
      slugVal +
      " Photogallery - News18 हिंदी India. Find latest " +
      slugVal +
      " Photo gallery, pictures , image gallery at hindi.news18.com";
    page_keywords =
      "News18 हिंदी India Photo Gallery,  तस्वीरें , Best photo collection, Cricket Photos, Hot Photos, Latest Photo Galleries";
    if (metaSlug && metaSlug.trim() !== "ajab-gajab") {
      metaData = await getPageMeta(section, subsection);
      try {
        if (metaData["meta"]) {
          currentTag = metaData["meta"] || {};
          page_title = currentTag["title"]
            ? stripslashes(currentTag["title"]) + page_index
            : page_title;
          page_description = currentTag["description"]
            ? stripslashes(currentTag["description"]) + page_index
            : page_description;
          page_keywords = currentTag["keywords"]
            ? stripslashes(currentTag["keywords"]) + page_index
            : page_keywords;
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  if (slugVal.trim() === "ajabgajab") {
    page_title =
      "Ajab Gajab, Offbeat stories, Viral Videos, Odd news, Funny news, Weird news";
    page_description =
      "अजब गजब (Ajab Gajab): Read Offbeat Stories, Odd, Funny and Wired News, watch viral videos on news18 Hindi";
    page_keywords =
      "Ajab Gajab, Offbeat stories, Viral Videos, Odd news, Funny news, Weird news";
  }
  /**
   * Breadcrumb here
   * */
  let bredCrumb = "";
  let breadCrumbArray = [];
  let tempobj = {};
  const homeText = "हिंदी समाचार";
  // let homeText = "Hindi News";
  const catText = "फोटो";
  // let catText = "PHOTO";
  tempobj = [
    { slug: "/", value: homeText, engtext: "News18 Hindi" },
    { slug: "/photogallery/", value: catText, engtext: "Photogallery" },
  ];
  if (section) {
    const sectionArr = get_section_name(section);
    const sectionName =
      sectionArr?.name || CONST_CAT_PAGE.SECTION_LIST_TR[section] || section;
    tempobj.push({
      slug: "/photogallery/" + section + "/",
      value: sectionName,
      engtext: section,
    });
  }
  if (
    section !== undefined &&
    section !== "" &&
    subsection !== undefined &&
    subsection !== ""
  ) {
    const subsectionArr = get_section_name(subsection);
    const subSectionName =
      subsectionArr?.name ||
      CONST_CAT_PAGE.SECTION_LIST_TR[subsection] ||
      subsection;
    tempobj.push({
      slug: "/photogallery/" + section + "/" + subsection,
      value: subSectionName,
      engtext: subsection,
    });
  }
  for (let index = 0; index < tempobj.length; index++) {
    bredCrumb +=
      (index === 0 ? "" : "<span> " + (isMobile ? ">" : ">>") + " </span>") +
      (index + 1 === tempobj.length
        ? "<span>" + tempobj[index]["value"] + "</span>"
        : '<a href="' +
          tempobj[index]["slug"] +
          '">' +
          tempobj[index]["value"]) +
      "</a>";
  }
  breadCrumbArray = [...tempobj];

  let topPriorityData = {};
  let categoryStoriesList = {};
  const thumbnailUrl = "";

  const { siteUrl } = publicRuntimeConfig;
  const catUrl = siteUrl + tf + "/";
  const isPhoto = true;
  const pageSeo = {
    title: page_title,
    description: page_description || "Photogallery",
    keywords: page_keywords,
    canonical: currentUrl,
    og_image: thumbnailUrl,
    news: catUrl,
    cat: category ? category : tf,
    pageUrl: siteUrl,
    og_title: page_title,
    og_description: page_description,
    isPhoto: isPhoto,
    breadCrumbArray: breadCrumbArray,
    page: "Photogallery",
  };
  const pageAds = isMobile ? photoGalleryMobileAds() : photoGalleryAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: page_title || "Photogallery",
    description: page_description,
    seo_keywords: page_keywords,
    weburl: currentUrl,
    section: section,
    content_type: "photogallery",
    block_ads: "no",
    meta_keywords: page_keywords,
    header: page_title || "photogallery",
  });
  if (isMobile) {
    if (section) {
      pageLimit = 8;
      newStart = 9;
    }
    if (offset === 0) {
      topPriorityData = await getTopPriorityData(
        section,
        subsection,
        10,
        false
      );
    }
    newStart = is_paging === 0 ? 0 : 0;
    categoryStoriesList = await getBottomStoriesList(
      section,
      offset + newStart,
      pageLimit
    );
  } else {
    // Desktop
    if (is_paging === 0 && offset === 0) {
      topPriorityData = await getTopPriorityData(section, subsection, 7, false);
    }
    newStart = is_paging === 0 ? 0 : 0;
    categoryStoriesList = await getBottomStoriesList(
      section,
      //offset + newStart,
      7,
      pageLimit
    );
  }
  let topSliderData = [];
  let topRecord = [];
  let bottomData = [];
  topRecord = topPriorityData?.topRecord || [];
  bottomData = topPriorityData?.bottomRecord || [];
  if (isMobile && offset === 0) {
    topSliderData = { topRecord: topRecord, bottomRecord: bottomData };
  } else {
    topSliderData = { leftCat: topRecord, rightCat: bottomData };
  }
  const _pageParam = {
    category: section,
    subCategory: subsection,
    sub_cat: section,
    sub_cat_slug: subsection,
    pageLimit: pageLimit,
    page: _page,
    is_paging: is_paging,
    curr_page_no: curr_page_no,
    query: query_string,
    newsType: "photogallery",
    categoryListData: categoryListData,
    get_section: "photogallery",
    hi_category: section ? get_section_name(section) || "" : "",
    hi_subCategory: subsection ? get_section_name(subsection) || "" : "",
  };
  const [
    menuData = {},
    topNews = [],
    exnews = {},
    miscData = {},
    footerData = [],
    photoStories = [],
    topStories = [],
    astroStories = {},
    latestNewsStories = [],
    googleRemoteConfig,
    // districtList = {},
    categorySponserData = {},
  ] = await Promise.all([
    getMenu(isMobile),
    getTopNews(),
    getTopSpecialWidget(),
    getMiscData({ trendingTags: true }),
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    isMobile
      ? []
      : getArticleList({
          count: 3,
          offset: 0,
          fields: "story_id,headline,images,display_headline,weburl,weburl_r",
          filter: { post_type: "photogallery" },
        }),
    isMobile
      ? []
      : getArticleList({
          count: 5,
          offset: 0,
          fields: "story_id,headline,images,display_headline,weburl,weburl_r",
          filter: {},
        }),
    [],
    isMobile
      ? []
      : getArticleList({
          count: 4,
          offset: 0,
          fields:
            "story_id,headline,images,display_headline,weburl,categories,post_type,weburl_r",
          filter: { post_type: "text" },
        }),
    getGoogleConfig(),
    // getDistricts(),
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]);

  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];

  pageSeo.pageParam = _pageParam;
  const schemaSection =
    _pageParam?.category?.charAt(0).toUpperCase() +
      _pageParam?.category.slice(1) || "";
  const schemaTf = tf.charAt(0).toUpperCase() + tf.slice(1);
  const metaTitle = page_title;
  const metaDesc = page_description;
  const metaKeywords = page_keywords;
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      metaTitle,
      metaDesc,
      metaKeywords,
      currentUrl,
      "",
      false,
      true
    ) || "";
  if (categoryStoriesList && categoryStoriesList.length) {
    pageSeo.jsonLdForItemList =
      jsonLdForItemList(
        currentUrl,
        categoryStoriesList.length,
        categoryStoriesList,
        schemaSection || schemaTf
      ) || "";
  }
  const showAnyaPhotoText = section || pageStrExist ? false : true;
  if (!pageStrExist) {
    _sliderNeed = true;
  }
  const taboolaList = TaboolaList.category;

  const pageData = {
    taboolaList,
    isMobile,
    showAnyaPhotoText,
    isListingPage: true,
    currentUrl,
    menuData,
    topNews,
    exnews,
    miscData,
    pageAds,
    pageSeo,
    bredCrumb,
    breadCrumbArray,
    _pageParam,
    sliderFlag: _sliderNeed,
    mainCat: tf,
    subCat: section,
    topPriorityData: topSliderData,
    categoryStoriesList,
    footerData,
    photoStories,
    topStories,
    // districtList,
    latestNewsStories,
    astroStories: astroStories["daily"] || astroStories,
    trendingTags: miscData?.trendingTags || [],
    pageStringExist: pageStrExist,
    categoryName: "photogallery",
    pageNo: curr_page_no,
    config: googleRemoteConfig,
    _1xbetData,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default photogalleryListProps;
