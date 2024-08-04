import getConfig from "next/config";
import { category as categoryAds } from "includes/Desktop/dfpAdIds";
import { category as categoryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import {
  checkDevice,
  getSetTargettingValues,
  get_site_link,
} from "includes/helper";
// import fetchUtility from "includes/sFetchUtility";
import categoryHelper from "../src/includes/category.helper";
import {
  ignoreQueryParams,
  capIt,
  getRedirection,
} from "includes/article.util";
import { jsonLdForWebPage, jsonLdForItemList } from "includes/schema.util";
import { TaboolaList } from "includes/Tabola.helper";

import {
  getRedisDataByKey,
  getDistricts,
  getPriorityData,
  getArticleList,
  AllCatList,
  getDataByRedisKey,
  getMenu,
  getMiscData,
} from "api_dns/global/Common";

import { CONST_CAT_PAGE } from "api/Constant";
import { getSliderforPriority, storyDivider } from "api_dns/individual/Category";

const { publicRuntimeConfig } = getConfig();
const categoryProps = async (context, mobile, isAmp) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  const { host = "" } = context.req.headers;
  if (host.indexOf("localhost") > -1 || host.indexOf("127.0.0.1:3050") > -1) {
    protocol = "http://";
  }

  const currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  const urlParam = context.query;

  function isNumeric(num) {
    return !isNaN(num);
  }

  const tf = urlParam.t || "news";
  const section = urlParam.section || "";
  /*
    If section value is numeric then pass to 404 page
  */
  if (section !== "") {
    if (isNumeric(section)) {
      const redirect_url = await getRedirection(currentUrl);
      // console.log("re url---->", redirect_url);
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
  }
  const subsection = urlParam.subsection || "";
  let pageNumber = parseInt(urlParam.page) || 1;
  const page = pageNumber;
  let [catsUrl] = ignoreQueryParams(currentUrl).split("page");
  const prevLink = pageNumber > 1 ? catsUrl : "";

  if (pageNumber === 1 && catsUrl.slice(-1) === "/") {
    catsUrl = catsUrl.replace(/.$/, "");
  }

  const nextLink =
    catsUrl + (pageNumber === 1 ? "/" : "") + "page-" + (pageNumber + 1) + "/";
  const paramObj = {
    category: section,
    subCategory: subsection,
  };

  let DFP_SECTION,
    DFP_SUB_SECTION = "";
  if (section !== "" && subsection !== "") {
    DFP_SECTION = section;
    DFP_SUB_SECTION = subsection.replace("-", "_");
  } else if (section !== "") {
    DFP_SECTION = section;
    DFP_SUB_SECTION = subsection.replace("-", "_");
  } else if (tf !== "") {
    DFP_SECTION = "states";
    DFP_SUB_SECTION = tf.replace("-", "_");
  }

  //let PAGE_NAME_DFP = "category_page";
  let _Ad_HEADER_SECTION_NAME = DFP_SECTION;
  if (_Ad_HEADER_SECTION_NAME !== "") {
    _Ad_HEADER_SECTION_NAME = DFP_SUB_SECTION;
  }

  let _redirect_url = "";
  const _deleted_sub_cats_lifestyle = [
    "property",
    "young-parents",
    "long-read",
    "inews-lifestyle",
    "book-extracts",
    "authors",
    "books-news",
    "culture",
    "trends",
  ];

  if (
    _deleted_sub_cats_lifestyle.indexOf(section) >= 0 ||
    _deleted_sub_cats_lifestyle.indexOf(subsection) >= 0
  ) {
    _redirect_url = protocol + host + "/news/lifestyle/";
    return {
      redirect: {
        destination: _redirect_url,
        permanent: true,
      },
    };
  }

  const _deleted_sub_cats_world = [
    "bangladesh",
    "europe",
    "srilanka",
    "afghanistan",
    "australia",
    "nepal",
  ];

  if (
    _deleted_sub_cats_world.indexOf(section) >= 0 ||
    _deleted_sub_cats_world.indexOf(subsection) >= 0
  ) {
    _redirect_url = protocol + host + "/news/world/";
    return {
      redirect: {
        destination: _redirect_url,
        permanent: true,
      },
    };
  }

  const old_state = ["noida", "ghaziabad", "gurgaon", "delhi"];
  if (old_state.indexOf(section) >= 0 || old_state.indexOf(tf) >= 0) {
    _redirect_url = protocol + host + "/news/delhi-ncr/";
    return {
      redirect: {
        destination: _redirect_url,
        permanent: true,
      },
    };
  }

  if (tf === "states" || tf === "world" || tf === "lifestyle") {
    _redirect_url = protocol + host + "/news/" + tf + "/";
    return {
      redirect: {
        destination: _redirect_url,
        permanent: true,
      },
    };
  }

  let is_paging = 0;
  let curr_page_no = 1;
  // let pageLimit = 24;
  const pageLimit = 24;
  let _page = "";

  if (pageNumber === "") {
    curr_page_no, (pageNumber = 1);
  }

  if (urlParam.page > 1) {
    is_paging = 1;
  }
  let pageStrExist = false;
  if (urlParam.page) {
    _page = urlParam.page.replace("page-", "_");
    curr_page_no = parseInt(_page);
    _page = "/" + curr_page_no;
    pageStrExist = true;
  } else {
    _page = "/" + curr_page_no;
  }

  /**if page no is greater 30 than send status code 410 */
  if (curr_page_no > 30) {
    context.res.statusCode = 404;
    return {
      notFound: true
    };
  }

  const states = CONST_CAT_PAGE.STATES;

  const all_states = (state, key) => {
    if (state !== "") {
      return states[state];
    } else {
      if (key === "") {
        return states;
      } else {
        return Object.keys(states);
      }
    }
  };

  let allStates = {};
  allStates = all_states("", "key"); //Newly Added for states

  const sectionListTr = CONST_CAT_PAGE.SECTION_LIST_TR;

  let metaSlug = "";
  if (subsection !== "") {
    metaSlug = subsection;
  } else if (section !== "") {
    metaSlug = section;
  } else if (allStates.indexOf(tf) >= 0) {
    metaSlug = tf;
  }

  const categoryListData = await AllCatList(); //getRedisDataByKey("CATEGORIES", "KHABAR:");
  // console.log(categoryListData)

  const get_section = (slug) => {
    if (typeof categoryListData !== "undefined" && categoryListData !== "") {
      let slugVal = slug;
      switch (slug) {
        case "desh":
          slugVal = "nation";
          break;
        case "khel":
          slugVal = "sports";
          break;
        case "manoranjan":
          slugVal = "entertainment";
          break;
        case "ghar-parivar":
          slugVal = "family-and-welfare";
          break;
        case "karobar":
          slugVal = "business";
          break;
        case "chalo-ghoom-aayen":
          slugVal = "travel";
          break;
        case "duniya":
          slugVal = "world";
          break;
        case "dharm-karm":
          slugVal = "spirituality";
          break;
        default:
          slugVal = slug;
      }
      return categoryListData[slugVal];
    } else {
      return [];
    }
  };

  //Find the section exists or not
  let category =
    subsection !== "" ? get_section(subsection) : get_section(section);
  // console.log({ category });
  let category_id,
    category_name = "";
  if (category && category !== "undefined") {
    category_id = category.id;
    category_name = category.name;
  } else {
    //Sending 404 as category or subcategory does not exists in our system
    if (section !== "" || subsection !== "") {
      const redirect_url = await getRedirection(currentUrl);
      // console.log({ redirect_url });
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
  }

  // eslint-disable-next-line no-undef
  const [metaData, districtList = {}] = await Promise.all([
    getRedisDataByKey(`${"metatags_" + metaSlug}`, "KHABAR:"),
    getDistricts(),
  ]);

  // get section translation
  const getSectionTranslation = (key = "") => {
    let data = [];
    data =
      districtList?.cityData &&
      districtList.cityData.find((itm) => itm.slug === key.toLowerCase());

    if (data && !data.length) {
      data =
        districtList?.stateData &&
        districtList.stateData.find((itm) => itm.slug === key.toLowerCase());
    }

    if (data) {
      return data?.name;
    } else if (states[key.toLowerCase()]) {
      return states[key.toLowerCase()];
    } else {
      return sectionListTr[key.toLowerCase()] || key;
    }
  };
  const changecat = ["culture"];

  let query_arr = "";
  if (section === "") {
    if (allStates.indexOf(tf) >= 0) {
      category = get_section(tf);
      category_name = category.name;
      query_arr = {
        "categories.id": category["id"],
        status: 1,
      };
    }
  } else {
    if (allStates.indexOf(tf) >= 0) {
      category = get_section(tf);
      category_name = category.name;

      query_arr = {
        "categories.id": category["id"],
        status: 1,
        not: { "categories.parent": 0 },
      };
    } else {
      if (changecat.indexOf(section) >= 0 || subsection === "culture") {
        query_arr = {
          "categories.id": category_id,
          status: 1,
        };
      } else {
        if (subsection !== "") {
          query_arr = {
            "categories.id": category_id,
            not: { "categories.parent": 0 },
            status: 1,
          };
        } else {
          query_arr =
            section === "latest-news"
              ? {
                  status: 1,
                }
              : {
                  "categories.id": category_id,
                  status: 1,
                };
        }
      }
    }
  }

  if (!query_arr && !section && !subsection) {
    if (tf === "news" || tf === "latest-news") {
      query_arr = {
        post_type: "text",
        status: 1,
      };
    } else if (tf === "photogallery") {
      query_arr = {
        post_type: "photogallery",
        status: 1,
      };
    }
  }

  let query_string = "";
  if (subsection !== "") {
    query_string = "news/" + section + "/" + subsection + "/";
  } else if (allStates.indexOf(tf) < 0 && subsection === "") {
    query_string = tf + "/" + section + "/";
  } else {
    query_string = tf + "/" + section + "/";
  }

  if (section === "" && allStates.indexOf(tf) < 0) {
    query_string = tf + "/";
  } else if (section === "" && allStates.indexOf(tf) > 0) {
    query_string = tf + "/"; //Newly Added for states
  }
  const limitpage = 24;
  let offset, page_index;
  if (page !== "") {
    offset = (page - 1) * limitpage + 10;
    page_index = page > 1 ? "Page " + page + " - " : "";
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

  slugVal =
    subsection !== "" ? subsection.replace("-", "") : section.replace("-", "");
  if (slugVal.trim() === "ajabgajab") {
    page_title =
      page_index +
      "Ajab Gajab, Offbeat stories, Viral Videos, Odd news, Funny news, Weird news";
    page_description =
      page_index +
      "अजब गजब (Ajab Gajab): Read Offbeat Stories, Odd, Funny and Wired News, watch viral videos on News18 हिंदी";
    page_keywords =
      "Ajab Gajab, Offbeat stories, Viral Videos, Odd news, Funny news, Weird news";
  } else if (tf === "photogallery") {
    page_title =
      "News18 India Photo Gallery: News in Hindi Photo Gallery, News18 इंडिया तस्वीरें";
    page_description =
      "News18 India photo gallery brings you best photo collection on all recent topics including latest photo galleries on Bollywood, cricket, entertainment, politics and more.";
    page_keywords =
      "News18 India Photo Gallery,  तस्वीरें , Best photo collection, Cricket Photos, Hot Photos, Latest Photo Galleries";
  } else {
    page_title =
      page_index +
      slugVal +
      " News in हिंदी: " +
      category_name +
      " की ताज़ा खबर, " +
      category_name +
      " ब्रेकिंग और लेटेस्ट न्यूज़";
    page_description =
      page_index +
      slugVal +
      " news in Hindi at News18 India. Latest and Breaking news in Hindi from " +
      slugVal +
      ". " +
      slugVal +
      " Hindi news, photos, videos and more. " +
      category_name +
      " की ताज़ा खबर, ब्रेकिंग और लेटेस्ट " +
      category_name +
      " न्यूज़ on Hindi.news18.com.";
    page_keywords =
      category_name +
      " News Hindi, Hindi News Online, India Samachar, India Khabar, Today's " +
      category_name +
      " News हिंदी ";
  }
  /**
   * captialize first character
   * string.charAt(0).toUpperCase() + string.slice(1);
   */

  if (subsection !== "" && typeof states[section] !== "undefined") {
    page_title =
      page_index +
      subsection +
      " News in Hindi (" +
      category_name +
      " " +
      states[section] +
      " हिंदी समाचार): Read " +
      category_name +
      " Hindi News, पढ़ें " +
      category_name +
      " की ताज़ा ख़बरें ";
    page_description =
      subsection +
      " Latest News in Hindi: Read " +
      subsection +
      " Today Breaking News @News18 Hindi. पढ़ें " +
      category_name +
      " " +
      states[section] +
      " की लेटेस्ट न्यूज़ देश के no.1 न्यूज़ चैनल News18 हिंदी पर.";
    page_keywords =
      subsection +
      " Latest News, " +
      subsection +
      " Hindi News, " +
      subsection +
      " News in Hindi, " +
      category_name +
      " " +
      states[section] +
      " की लेटेस्ट न्यूज़, " +
      category_name +
      " " +
      states[section] +
      " की ताज़ा ख़बरें, " +
      category_name +
      " " +
      states[section] +
      " समाचार, " +
      category_name +
      " " +
      states[section] +
      " हिंदी समाचार";
  }

  let short_name,
    state_name = "";
  if (section && section !== "" && typeof states[section] !== "undefined") {
    state_name = section?.[0]?.toUpperCase() + section?.slice(1) || "";
    short_name = state_name;
    if (section === "uttar-pradesh") {
      short_name = "UP";
      state_name = state_name.replace("-", "");
    }
    page_title =
      page_index +
      short_name +
      " News in Hindi (" +
      states[section] +
      " हिंदी समाचार): Read " +
      short_name +
      " Hindi News, पढ़ें " +
      states[section] +
      " की ताज़ा ख़बरें ";
    page_description =
      short_name +
      " Latest News in Hindi: Read " +
      short_name +
      " Today Breaking News @News18 Hindi. पढ़ें " +
      states[section] +
      " की लेटेस्ट न्यूज़ देश के no.1 न्यूज़ चैनल News18 हिंदी पर.";
    page_keywords =
      short_name +
      " Latest News, " +
      short_name +
      " Hindi News, " +
      short_name +
      " News in Hindi, " +
      states[section] +
      " की लेटेस्ट न्यूज़, " +
      states[section] +
      " की ताज़ा ख़बरें, " +
      states[section] +
      " समाचार, " +
      states[section] +
      " हिंदी समाचार";
  }

  let metaTag;
  let currentTag = "";

  // const stripslashes = (str) => {
  //   return str
  //     .replace(/\\'/g, "'")
  //     .replace(/\"/g, '"')
  //     .replace(/\\\\/g, "\\")
  //     .replace(/\\0/g, "\0");
  // };

  const stripslashes = (str) => {
    return str.replace(/\\('|"|\\|0)/g, "$1");
  };

  function isCharacterALetter(char) {
    return char.toLowerCase() !== char.toUpperCase();
  }

  /* check english or hindi */
  const isLetter = (str = "") => {
    if (isCharacterALetter(str)) {
      return str.toUpperCase();
    } else {
      return str;
    }
  };

  const get_section_name = (slug) => {
    const g = get_section(slug);
    return g !== undefined ? isLetter(g.name) : "";
  };

  if (metaSlug !== "") {
    metaTag = metaData;
    currentTag = metaTag["tags"]?.[0] || {};
    page_title =
      currentTag["page_title"] && currentTag["page_title"] !== ""
        ? page_index + stripslashes(currentTag["page_title"])
        : page_title;
    page_description =
      currentTag["page_desc"] && currentTag["page_desc"] !== ""
        ? page_index + stripslashes(currentTag["page_desc"])
        : page_description;
    page_keywords =
      currentTag["page_keywords"] && currentTag["page_keywords"] !== ""
        ? stripslashes(currentTag["page_keywords"])
        : page_keywords;
  }

  /**
   * Meta details end here
   */
  /**
   * Breadcrumb here
   * */
  let bredCrumb = "";
  let breadCrumbArray = [];
  let tempobj = {};
  const homeText = "हिंदी समाचार"; //'होम';
  const newsText = "आज के हिंदी समाचार"; //'न्यूज';
  const stateText = "राज्य"; //राज्य;

  const ampUrl = isAmp ? "amp/" : "";

  const brCrFirst =
    allStates.indexOf(tf) < 0
      ? newsText
      : '<a href="/news/states/">' +
        stateText +
        "</a> &raquo; " +
        all_states(tf); //Newly Added for states

  if (subsection !== "") {
    bredCrumb =
      '<a href="/">' +
      homeText +
      '</a> &raquo; <a href="/news/' +
      section +
      '/">' +
      capIt(section) +
      "</a> &raquo; <h1>" +
      capIt(subsection);
    tempobj = [
      { slug: `${publicRuntimeConfig.siteUrl}` + ampUrl, value: homeText },
      {
        slug:
        `${publicRuntimeConfig.siteUrl}` + ampUrl + "news/" + (section === "news" ? "" : section + "/"),
        value: getSectionTranslation(section),
      },
      { slug: "", value: getSectionTranslation(subsection) },
    ];
  } else if (section !== "" && allStates.indexOf(tf) < 0) {
    bredCrumb =
      '<a href="/">' + homeText + "</a> &raquo; <h1>" + capIt(section);
    tempobj = [
      { slug: `${publicRuntimeConfig.siteUrl}` + ampUrl, value: homeText },
      { slug: "", value: getSectionTranslation(section) },
    ];

    //Newly Added for states
  } else if (section !== "" && allStates.indexOf(tf) >= 0) {
    bredCrumb =
      '<a href="/">' +
      homeText +
      '</a> &raquo; <a href="/news/states/">' +
      stateText +
      '</a> &raquo; <a href="/' +
      tf +
      '/">' +
      all_states(tf) +
      "</a> &raquo; <h1>" +
      capIt(section); //Newly Added for states
    tempobj = [
      { slug: `${publicRuntimeConfig.siteUrl}`, value: homeText },
      { slug: `${publicRuntimeConfig.siteUrl}news/states/`, value: stateText },
      { slug: `${publicRuntimeConfig.siteUrl}` + tf + "/", value: getSectionTranslation(all_states(tf)) },
      { slug: "", value: getSectionTranslation(section) },
    ];
  } else {
    bredCrumb = '<a href="/">' + homeText + "</a> &raquo; <h1>" + brCrFirst;
    tempobj = [
      { slug: `${publicRuntimeConfig.siteUrl}/`, value: homeText },
      { slug: "", value: brCrFirst },
    ];
  }

  if (typeof states[metaSlug] !== "undefined") {
    bredCrumb += " News";
  }
  bredCrumb += "</h1>";

  breadCrumbArray = tempobj;

  /**
   * breadcrumb enf here
   * */

  const ucwords = (str) => {
    return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  };
  let titleDiv = "";
  let sectionName = "";

  const h1Title =
    currentTag?.["page_h1"] ||
    (category_name &&
      (category_name[0].toUpperCase() + category_name.slice(1)).replace(
        /-/g,
        " "
      ));
  if (allStates.indexOf(section) >= 0) {
    if (subsection !== "") {
      sectionName = categoryHelper.getHeadNameList(subsection)
        ? categoryHelper.getHeadNameList(subsection)
        : get_section_name(subsection) +
          " (Top " +
          ucwords(subsection) +
          " News)";
    } else {
      sectionName = categoryHelper.getHeadNameList(section)
        ? categoryHelper.getHeadNameList(section)
        : get_section_name(section) + " (Top " + ucwords(section) + " News)";
    }
  } else {
    if (subsection) {
      sectionName = category_name;
    } else if (section) {
      sectionName = category_name;
    } else {
      sectionName = "आज की ताजा खबर (Latest Hindi News)";
    }
  }

  if (h1Title !== "") {
    titleDiv = `<div class="top-news-title"><h1>${h1Title}</h1></div>`;
  } else {
    titleDiv = `<div class="top-news-title"><h1>${sectionName}</h1></div>`;
  }

  let topPriorityData = {};
  let categoryStoriesList = {};

  const thumbnailUrl = "";
  let cu = currentUrl.split("page")[0] || "";
  // currentUrl = `https://hindi.news18.com${context?.req?.url}`;
  cu = cu[cu.length - 1] === "/" ? cu : cu + "/";

  const { siteUrl } = publicRuntimeConfig;
  const news = siteUrl + "news/";
  const pageSeo = {
    title: page_title || "404 Not Found",
    description: page_description,
    keywords: page_keywords,
    canonical: isAmp ? cu.replace("amp/", "") : cu,
    og_image: thumbnailUrl,
    news: news,
    cat: category ? category : tf,
    pageUrl: siteUrl,
    breadCrumbArray: breadCrumbArray,
    og_title: page_title,
    og_description: page_description,
    section: sectionName,
    page: "category",
  };
  if (!isAmp && page === 1) {
    pageSeo.ampHtml = publicRuntimeConfig.siteUrl + "amp/" + get_site_link(cu);
  }

  const pageAds = isMobile
    ? categoryMobileAds({ t: "news", section: urlParam.section }, false)
    : categoryAds({ t: "news", section: urlParam.section }, false);
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: page_title,
    description: page_description,
    seo_keywords: page_keywords,
    weburl: currentUrl,
    section: sectionName,
    content_type: tf === "photogallery" ? "photogallery" : "News",
    block_ads: "no",
    meta_keywords: page_keywords,
    header: page_title,
    State:urlParam?.section,
    city: urlParam?.subsection
  });

  if ((isAmp && section === "states") || section === "lifestyle") {
    titleDiv = `<div class="top-news-title"><h1>${sectionName}</h1></div>`; // Update title in case of state
  }

  let pcategory = "";
  if (subsection === "cricket") {
    pcategory = "cricket";
  } else {
    pcategory =
      allStates.indexOf(tf) >= 0
        ? tf
        : subsection && subsection !== ""
        ? subsection
        : section;
  }
  if (pcategory === "") {
    if (tf === "news") {
      pcategory = "news";
    }
  }

  let sliderNeed =
    subsection !== ""
      ? await getSliderforPriority(subsection)
      : await getSliderforPriority(section);

  const isCommon = pcategory === "news";
  let categoryResult = [];
  pcategory = pcategory === "latest-news" ? "latest-news" : pcategory;

  const fields =
    "story_id,categories,subsection,display_headline,headline,post_type,images,images_all_sizes,movie_rating,youtubeid,local18_video,external_video,weburl,weburl_r,ff_source,gallery_count,liveblog_switcher";

  let topPriorityDataList = [];

  if (is_paging === 0) {
    pcategory = pcategory === "states" ? 'uttar-pradesh' : pcategory;
    topPriorityDataList = await getPriorityData({
      section: "category",
      subSection: pcategory,
      fields: fields,
      count: 34,
      filter: isCommon
        ? {}
        : { "categories.slug": pcategory },
      fallback: true,
    });

    topPriorityData = await storyDivider(
      sliderNeed,
      topPriorityDataList,
      isMobile
    );

    categoryStoriesList = topPriorityDataList.slice(10, 34); //categoryResult; //.result;
  } else {
    sliderNeed = false;
    // const start = offset;
    const limit = pageLimit;
    categoryResult = await getArticleList({
      count: limit,
      offset: offset,
      fields: fields,
      filter: query_arr,
    });
    if (typeof categoryResult === "undefined") {
      categoryResult = { result: [], length: 0 };
    }
    categoryStoriesList = categoryResult; //.result;
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
    newsType: tf,
    allStates: allStates,
    categoryListData: categoryListData || [],
    get_section: category ? category : tf,
    hi_category: section ? get_section_name(section) : "",
    hi_subCategory: subsection ? get_section_name(subsection) : "",
    pageStrExist: pageStrExist,
    query_arr,
  };

  const [
    menuData = {},
    topNews = [],
    exnews = {},
    miscData = {},
    footerData = [],
    footerDataCat = [],
    photoStories = [],
    astroStories = {},
    latestNewsStories = [],
    firebaseConfigData = {},
    datedAstroData = null,
    categorySponserData = {},
    // top_trending_articles =[],
    // top_trending_articles_with_category =[],
    short_news_rhs = []
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    isAmp
      ? []
      : await getArticleList({
          count: 4,
          offset: 0,
          fields:
            "story_id,display_headline,title,images,categories,post_type,weburl_r,weburl,intro",
          filter: { post_type: "text" },
        }),
    !isAmp ? await getDataByRedisKey("key=topspecialwidget&allow_prefix=false") : [],
    !isAmp ? getMiscData({ trendingTags: true }) : {},
    !isAmp ? await getRedisDataByKey("new_fms_system", "KHABARN18-") : [],
    !isAmp
      ? await getRedisDataByKey(
          `new_fms_system_${subsection ? subsection : section}`,
          "KHABARN18-"
        )
      : [],
    !isAmp
      ? await getArticleList({
          count: 9,
          offset: 0,
          fields:
            "story_id,display_headline,title,images,categories,post_type,weburl_r,weburl,intro,gallery_count",
          filter: { post_type: "photogallery" },
        })
      : [],
    [], // astro stories
    [], // latestNewsStories
    [], // solrSearchObject.configInterface(),
    [], //datedAstroData no use so commented
    // !isAmp ? await getRedisDataByKey("nw_hindi_panchang_${NewDate}", "KHABARN18-") : [],
    await getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
    // await getRedisDataByKey("top_trending_articles_ga", true),
    // (subsection||section)? await getRedisDataByKey(subsection?`top_trending_articles_ga-${subsection}`:`top_trending_articles_ga-${section}`, true):[],
    getArticleList({
      count: 10,
      filter: { shortnews_status: "1", "categories.slug": subsection||section },
      fields:
        "weburl_r,weburl_short,shorts_bulletin,images,headline,display_headline,created_at,story_id,weburl,categories,post_type,is_hyperlocal_vw",
    })
  
  ]);

  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "AMAZON Logo" || item.campagin_name === "Lok Sabha Election 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];
  let isEntPage = null;
  const catPageUrl = "/news/" + section + "/";
  if (catPageUrl === "/news/entertainment/") {
    isEntPage = true;
  }
  let isBusinessPage = false;
  if (catPageUrl === "/news/business/") {
    isBusinessPage = true;
  }
  let isCategoryMobilePage = false;
  if (catPageUrl === "/news/tech/") {
    isCategoryMobilePage = true;
  }

  pageSeo.pageParam = _pageParam;
  const schemaSection =
    _pageParam?.category?.charAt(0).toUpperCase() +
      _pageParam?.category.slice(1) || "";
  const schemaHiSection = _pageParam?.hi_category || "";
  const schemaTf = tf.charAt(0).toUpperCase() + tf.slice(1);

  //schema related code starts here
  const metaTitle = page_title;
  const metaDesc = page_description;
  const metaKeywords = page_keywords;

  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      metaTitle ||
        `${schemaSection} News in हिंदी: ${_pageParam.hi_category} की ताज़ा खबर, ${schemaHiSection} ब्रेकिंग और लेटेस्ट न्यूज़`,
      metaDesc ||
        `${schemaSection} news in हिंदी at News18 India. Latest and Breaking news in Hindi 
        from ${schemaSection}. ${schemaSection} हिंदी news, photos, videos and more. ${_pageParam.hi_category} की ताज़ा खबर, ब्रेकिंग और लेटेस्ट ${_pageParam.hi_category} न्यूज़ on hindi.news18.com.`,
      metaKeywords ||
        `${schemaHiSection} News Hindi, Hindi News Online, India Samachar, India Khabar, Today's ${schemaHiSection} News हिंदी`,
      currentUrl ? currentUrl.split("?")[0] : "",
      "",
      false,
      true
    ) || "";
  pageSeo.jsonLdForItemList =
    jsonLdForItemList(
      currentUrl ? currentUrl.split("?")[0] : "",
      categoryStoriesList.length,
      categoryStoriesList,
      schemaSection || schemaTf
    ) || "";
  //schema related ends start here

  const score =
    _pageParam.subCategory === "cricket" ||
    (_pageParam.category === "sports" && _pageParam.subCategory === "")
      ? true
      : false;

  let isStatePage = subsection
    ? false
    : (allStates.indexOf(section) > -1 && (CONST_CAT_PAGE.IGNORE_SHEHERCHUNE_STATES.indexOf(section) === -1))
    ? true
    : false;
  isStatePage = section === "states" ? true : isStatePage;
  const taboolaList = TaboolaList.category;
  if (!miscData.trendingTags) miscData.trendingTags = "";
  const pageData = {
    taboolaList,
    isMobile,
    currentUrl,
    prevLink,
    nextLink,
    menuData,
    paramObj,
    categoryName: sectionName,
    topNews,
    exnews,
    miscData,
    pageAds,
    pageSeo,
    bredCrumb,
    districtList,
    breadCrumbArray,
    titleDiv,
    _pageParam: { ..._pageParam, isStatePage },
    sliderFlag: sliderNeed,
    mainCat: tf,
    // topPriorityData: isMobile ? topSliderData : topPriorityData,
    topPriorityData: topPriorityData,
    categoryStoriesList,
    dataLength: categoryResult.length || categoryStoriesList.length || 0,
    footerData,
    footerDataCat,
    photoStories: photoStories,
    topStories: topNews || [],
    latestNewsStories,
    astroStories: astroStories["daily"] || astroStories,
    liveCricketScore: { score },
    trendingTags: miscData.trendingTags || [],
    isStatePage,
    config: firebaseConfigData,
    datedAstroData,
    _1xbetData,
    isEntPage,
    isBusinessPage,
    isCategoryMobilePage,
    pcategory,
    isCommon,
    // top_trending_articles,
    // top_trending_articles_with_category,
    short_news_rhs
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default categoryProps;
