import getConfig from "next/config";
// import fetchUtilityDirect from "includes/sFetchUtilityDirect";
import AmpLayout from "layouts/Amp/AmpLayout";
import ArticleAmp from "components/Amp/Article";
import LiveBlog from "components/Amp/LiveBlog";
import {
  arrayOnly,
  extractMetatags,
  sectionExtractor,
  ignoreQueryParams,
  findIndexOfCharFromLast,
} from "includes/article.util";
import {
  jsonLdForArticleConsumption,
  jsonLdForWebPage,
  faq_schema,
  jsonLdForRecipe,
  jsonLdForMovie,
  jsonLdForVideoObject,
  jsonLdForNonYTVideoObject,
  jsonLdForLiveBlog,
  jsonLdForHomeSiteNavigation,
} from "includes/schema.util";
import { getArticleById, getLiveBlog } from "api_dns/individual/Article";
import {
  getArticleList,
  getMiscData,
  getMenu,
  getRedisDataByMultiKey,
  getDistricts,
  getGoogleConfig,
  // RhstopStories,
  getTopVideos,
  getArticleAdjacents,
  // getCricketData,
} from "api_dns/global/Common";
import { CONST_CAT_PAGE } from "api/Constant";
// import { getActiveInning, getIsLiveMatch } from "includes/ipl.helper";
import XMLScript from "components/Common/XMLScript";

const { publicRuntimeConfig } = getConfig();
export const config = { amp: true };

const Article = ({ pageData, chartbeat, GA4Data }) => {
  const article = pageData.articleData || {};
  const {
    headline = "",
    intro = "",
    images: { url: thumbnailUrl = "" } = {},
    tag_topic: tagTopic = [],
  } = article;

  let seoPageTitle = "";
  let pageDescription = "";
  let pageKeywords = tagTopic;
  const postMeta = pageData.metaData;

  const hires = article?.images_all_sizes?.sizes?.["16x9"]?.url;
  const res43 = article?.images_all_sizes?.sizes?.["4x3"]?.url;

  if (article && article.story_id) {
    seoPageTitle = headline.replace(/(<([^>]+)>)/gi, "");
    pageDescription = intro.replace(/(<([^>]+)>)/gi, "");
    seoPageTitle = seoPageTitle + " – News18 हिंदी";

    if (postMeta?.["page_title"]) {
      seoPageTitle = postMeta["page_title"] + " - News18 हिंदी";
    }
    if (postMeta?.["page_description"]) {
      pageDescription = postMeta["page_description"];
    }
    if (postMeta?.["page_keywords"]) {
      pageKeywords = postMeta["page_keywords"];
    }
    if (!pageDescription) {
      pageDescription = headline;
    }
  }
  const { finalURL } = pageData;
  const { siteUrl = "" } = publicRuntimeConfig;
  const news = siteUrl + "news/";
  const cat = pageData.paramObj.category;
  const { paramObj: { pageNumber = "" } = {} } = pageData.paramObj.pageNumber;
  const pageSeo = {
    title: seoPageTitle || "404 Not Found",
    description: pageDescription,
    keywords: pageKeywords,
    canonical:
      finalURL.replace("amp/", "") || pageData.currentURL.replace("amp/", ""),
    og_image: hires || res43 || thumbnailUrl,
    news: news,
    cat: cat,
    pageUrl: siteUrl,
    og_title: article.og_title
      ? article.og_title
      : headline.replace(/(<([^>]+)>)/gi, ""),
    og_description:
      intro.replace(/(<([^>]+)>)/gi, "") ||
      (article["headline"] &&
        article["headline"].replace(/(<([^>]+)>)/gi, "")) ||
      "",
    hires: hires || res43 || false,
    caption: article.images?.caption,
    author: article["byline"] || "Hindi Editor",
  };

  pageSeo.jsonLdForArticleConsumption = jsonLdForArticleConsumption(
    article,
    "",
    true,
    pageKeywords
  );
  pageSeo.jsonLdForFaqSchema = faq_schema(article, pageDescription);
  pageSeo.jsonLdForWebPage = jsonLdForWebPage(
    article.headline,
    article.headline && article.headline.body,
    pageKeywords,
    article.weburl,
    article
  );
  pageSeo.jsonLdForRecipe = jsonLdForRecipe(article);
  pageSeo.jsonLdForMovie = jsonLdForMovie(article);
  if (article?.local18_video) {
    pageSeo.jsonLdForVideoObject =
      jsonLdForNonYTVideoObject(article, pageDescription, pageKeywords) || "";
  } else if (article?.youtubeid) {
    pageSeo.jsonLdForVideoObject =
      jsonLdForVideoObject(article, pageDescription) || "";
  }

  pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
    pageData?.menuData,
    false
  );

  if (
    article &&
    article.liveblog_api_url &&
    article.liveblog_api_url.blog_url
  ) {
    pageSeo.jsonLdForLiveBlog = jsonLdForLiveBlog(
      article,
      pageData.liveBlog,
      pageKeywords
    );
  }

  if (article && article.liveUpdates) {
    const LIVEBLOGPOSTCOUNT = 20;
    pageSeo.jsonLdForLiveBlog = jsonLdForLiveBlog(
      article,
      article.liveUpdates,
      pageKeywords,
      true
    );
    pageSeo.liveBlogNext =
      pageNumber && article.liveUpdates.length === LIVEBLOGPOSTCOUNT
        ? article.weburl.replace(
            ".html",
            `-page-${Number(pageNumber) + 1}.html`
          )
        : article.liveUpdates.length === LIVEBLOGPOSTCOUNT
        ? article.weburl.replace(".html", `-page-2.html`)
        : false;
    pageSeo.liveBlogPrev =
      pageNumber && pageNumber === LIVEBLOGPOSTCOUNT
        ? article.weburl
        : pageNumber
        ? article.weburl.replace(
            ".html",
            `-page-${Number(pageNumber) - 1}.html`
          )
        : false;
  }
  const states = CONST_CAT_PAGE.STATES;
  const sectionListTr = CONST_CAT_PAGE.SECTION_LIST_TR;
  // get section translation
  const getSectionTranslation = (key = "") => {
    let data = [];
    data =
      pageData.districtList?.cityData &&
      pageData.districtList.cityData.filter(
        (itm) => itm.slug === key.toLowerCase()
      );
    if (data && data[0]) {
      return data[0].name;
    } else if (states[key.toLowerCase()]) {
      return states[key.toLowerCase()];
    } else {
      return sectionListTr[key.toLowerCase()] || key;
    }
  };

  const category_hi = getSectionTranslation(pageData.category);
  const tempObj = [
    { slug: `${publicRuntimeConfig.siteUrl}`, value: "हिंदी समाचार" },
    { slug: `${publicRuntimeConfig.siteUrl}news/`, value: "न्यूज" },
    {
      slug: `${publicRuntimeConfig.siteUrl}news/${pageData.category}`,
      value: category_hi,
    },
    {
      slug: article?.posturl || article?.weburl,
      value: article?.headline || article?.breadcrumb,
    },
  ];
  pageSeo.breadCrumbArray = tempObj;
  pageData.breadCrumbArray = tempObj;
  return (
    <>
      <XMLScript category={pageData?.category} />
      <AmpLayout
        data={{ ...pageData, category_hi: category_hi }}
        mainComponent={pageData?.isNewLiveBlog ? LiveBlog : ArticleAmp}
        pageSeo={pageSeo}
        isArticle={true}
        pageType="article"
        chartbeat={chartbeat}
        url={
          finalURL.replace("amp/", "") ||
          pageData.currentURL.replace("amp/", "")
        }
        GA4Data={GA4Data}
        category={"APPdownload_Mweb_Article"}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const isMobile = true;

  const urlParam = context.query;
  urlParam.isAmp = true;

  const { req } = context;
  const protocol = "https://";
  let currentURL = ignoreQueryParams(protocol + req.headers.host + req.url);

  let cd19value = "";
  let cd20value = "";

  const id = urlParam.post_id,
    cat = typeof urlParam.cat !== "undefined" ? urlParam.cat : "",
    subCat = typeof urlParam.subCat !== "undefined" ? urlParam.subCat : "";

  if (currentURL.includes("/ampnews/")) {
    currentURL = currentURL.replace("/ampnews/", "/amp/news/");
    return {
      redirect: {
        destination: currentURL,
        // permanent: true
        statusCode: 301,
      },
    };
  }

  const paramObj = {
    id: id,
    category: cat,
    subCategory: subCat,
    requestURL: currentURL,
    pageNumber: urlParam.gid || false,
  };

  const pageNumber = urlParam.gid;
  // let isSub = subCat != "";

  if (urlParam.gid) {
    currentURL = currentURL.replace(`-page-${urlParam.gid}`, "");
  }

  const articleData = await getArticleById(id);
  if (
    articleData === null ||
    articleData === "" ||
    typeof articleData?.story_id === "undefined" ||
    articleData?.flag === "0"
  ) {
    return {
      notFound: true,
    };
  }

  if (articleData?.local18_video) {
    cd19value = cd19value + "Vidgyor Player";
    cd20value = cd20value + "Featured,";
  }

  if (articleData?.body?.search(".com/embed") !== -1) {
    cd19value = cd19value + "You tube,";
    cd20value = cd20value + "Video Embed,";
  }

  let videoId = "";
  let videoTitle = null;

  if (articleData?.body.indexOf("youtube.com/embed") > 0) {
    const iframe = /<iframe[^>]*src=[\"|']([^'\"]+)[\"|'][^>]*>/gi.exec(
      articleData?.body
    );
    const srcFromBody = iframe?.length
      ? /src=(["'].*?["'])/gi.exec(iframe[0])?.[1]
      : [];
    const removedLastQuote = srcFromBody?.length
      ? srcFromBody.slice(0, srcFromBody?.length - 1).split("/")
      : [];
    videoId = removedLastQuote[removedLastQuote?.length - 1];
  }
  if (articleData?.body.indexOf("<thirdpartylink") > 0) {
    const thirdpartylink =
      /<thirdpartylink[^>]*title=[\"|']([^'\"]+)[\"|'][^>]*>/gi.exec(
        articleData?.body
      );
    const titleFromBody = thirdpartylink?.length
      ? /title=(["'].*?["'])/gi.exec(thirdpartylink[0])?.[1]
      : "";
    articleData.body = articleData?.body.replace(/<thirdpartylink/g, `<a`);
    articleData.body = articleData?.body.replace(
      /<\/thirdpartylink>/g,
      `${titleFromBody?.replace(/"/g, " ")}</a>`
    );
  }
  if (articleData?.body.indexOf("<video") > -1) {
    articleData.body = articleData?.body.replace("<video", "<amp-video");
    articleData.body = articleData?.body.replace("</video>", "</amp-video>");
  }

  if (!videoId) {
    videoId = articleData?.local18_video || articleData?.youtubeid;
  }

  if (videoId) {
    videoTitle = articleData?.display_headline;
  }

  articleData.subsection = arrayOnly(articleData.subsection);

  const t = [];
  (articleData.tags || []).forEach((item) => item?.slug && t.push(item.slug));
  const redisMulti =
    "KHABARN18-bottomofpage,KHABARN18-SPONSER_MODULE_POSITION-home-page-banners";

  const finalURL =
    protocol +
    currentURL?.split("/")[2] +
    "/" +
    articleData?.weburl?.split(".com/")[1];
  const allSlashSplitted = articleData?.weburl.split("/");

  let newsIndex;
  if (allSlashSplitted[3] === "news") {
    newsIndex = allSlashSplitted.indexOf("news");
    if (allSlashSplitted?.length - allSlashSplitted.indexOf("news") === 3) {
      paramObj.category = allSlashSplitted[newsIndex + 1] || cat;
    }
  } else if (allSlashSplitted[3] === "photogallery") {
    newsIndex = allSlashSplitted.indexOf("photogallery");
    if (
      allSlashSplitted?.length - allSlashSplitted.indexOf("photogallery") ===
      3
    ) {
      paramObj.category = allSlashSplitted[newsIndex + 1] || cat;
    }
  }

  let CTAtext = [],
    topStory = [];

  const [
    metaData = [],
    miscData = {},
    relatedArticles = [],
    topstories = [],
    googleRemoteConfig = {},
    photoStories = [],
    redisMultiResults = {},
    districtList = {},
    relatedVideos,
    menuData = {},
    // newMatchData = {},
    nextPrevious = {}
  ] = await Promise.all([
    extractMetatags(articleData, id),
    getMiscData({
      trendingTags: true,
      catName: true,
      cat: `${subCat || cat}`,
      image: true,
    }),
    t?.length > 0
      ? getArticleList({
          count: 4,
          offset: 0,
          fields: "story_id,display_headline,headline,weburl,images",
          filter: {
            not: { story_id: `${articleData.id || articleData.story_id}` },
            post_type: "text",
            "tags.slug": t,
          },
        })
      : [],
    // RhstopStories({
    //   count: 5,
    //   section: "category",
    //   subSection: cat ? cat : "nation",
    //   filter: {"post_type":"text"},
    //   fields: "story_id,headline,weburl,weburl_r,images,display_headline",
    //   cache: { key: `${cat ? cat : "nation"}_top_stories`, ttl: 300}
    // }),
    [],
    getGoogleConfig(),
    getArticleList({
      count: 3,
      offset: 0,
      fields:
        "story_id,headline,images,display_headline,weburl,weburl_r,post_type",
      filter: { post_type: "photogallery" },
      cache: { key: "amp_article_photo_stories", ttl: 300 },
    }),
    getRedisDataByMultiKey(redisMulti),
    getDistricts(),
    getTopVideos(),
    getMenu(false, true),
    getArticleAdjacents({
      article_id: articleData.story_id,
      created_at: articleData.created_at,
      filter: {
        post_type: articleData.post_type,
        "categories.slug": paramObj.category,
      },
    }),
  ]);
  if (Object.keys(redisMultiResults)?.length > 0) {
    const keys = Object.keys(redisMultiResults);
    [CTAtext] = keys.map((i) =>
      redisMultiResults[i] ? redisMultiResults[i] : []
    );
  }

  if (relatedArticles && relatedArticles.length) {
    articleData.relatedArticles = relatedArticles;
  }
  // articleData.relatedArticles = articleData?.related_story || [];

  const selectedCity =
    districtList?.cityData &&
    districtList?.cityData.filter((c) =>
      articleData?.categories.find((i) => i.id === c.id)
    )[0];
  if (
    (articleData.ff_source && articleData.ff_source === "Hyperlocal") ||
    selectedCity
  ) {
    const { subsection = [] } = articleData;
    const [district] = subsection.filter(({ slug = "" }) => slug).reverse();

    if (selectedCity || district) {
      const data = null;
      if (data) {
        articleData.fromDistrict = data
          .filter((item) => !(item.id && item.id.includes(id)))
          .slice(0, 11);
        articleData.dis = selectedCity || district;
      }
    }
  }

  articleData.addSavaan = "on";

  if (
    articleData &&
    articleData !== "" &&
    CTAtext?.bottomofpage?.[0]?.bottomofpage
  ) {
    articleData.cta = CTAtext?.bottomofpage?.[0]?.bottomofpage;
  }

  topStory = topStory.filter((item) => item.id !== id);
  //Live blog data
  const liveBlog = {};

  const ElectionsHomeBanner = false;

  if (articleData?.liveblog_switcher === 1) {
    const indexOfDot = findIndexOfCharFromLast(currentURL, ".");

    const beforeDot = currentURL?.slice(0, indexOfDot);
    const afterDot = currentURL?.slice(indexOfDot + 1);

    let newURL = beforeDot?.replace("/amp", "") + "-page-2." + afterDot;
    newURL = newURL?.includes("localhost")
      ? newURL.replace("https", "http")
      : newURL;

    if (pageNumber) {
      return {
        redirect: {
          destination: newURL,
          statusCode: 301,
        },
      };
    }

    const data = await getLiveBlog({
      count: 20,
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
      articleData.pageNumber = pageNumber ? Number(pageNumber) : false;
    }
  }

  paramObj.requestURL = finalURL || currentURL;
  const pageData = {
    isMobile,
    articleData,
    topStory,
    paramObj,
    metaData,
    liveBlog,
    category: paramObj.category,
    relatedVideos,
    currentURL,
    imageM: miscData.image || {},
    ElectionsHomeBanner,
    isNewLiveBlog: articleData?.liveblog_switcher === 1,
    isAmp: true,
    topstories: topstories ? topstories?.slice(0, 5) : [],
    finalURL,
    cd19value,
    cd20value,
    videoId,
    districtList,
    videoTitle,
    section: subCat || cat,
    allSections: sectionExtractor(paramObj.category),
    page: "article",
    config: googleRemoteConfig,
    photoStories,
    menuData,
    nextPrevious
  };

  return { props: { pageData } };
}

export default Article;
