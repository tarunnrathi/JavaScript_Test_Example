import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { ignoreQueryParams } from "includes/article.util";
import {
  jsonLdForWebPage,
  jsonLdForHomeSiteNavigation,
  jsonLdForItemList,
  jsonLdForArticleConsumption,
} from "includes/schema.util";
import { BlogsUtil } from "includes/blogs.util";
import { blogs as generateDesktopBlogAds } from "includes/Desktop/dfpAdIds";
import { blogs as generateMobileBlogAds } from "includes/Mobile/dfpAdIdsMobile";
import { getArticleById } from 'api_dns/individual/Article';
import { getDistricts, getMenu, getMiscData, getRedisDataByKey, getArticleList, getGoogleConfig } from "api_dns/global/Common";
import { REDIS_KEYS } from 'api/Constant';
import { TaboolaList } from "includes/Tabola.helper";

const blogsProps = async (context, isAmp = false, isTag = false) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url, false);
  const urlParam = context.query;
  let author = urlParam?.author || "";
  let topic = urlParam?.topic || "";
  let authorId = urlParam?.authorId || "";
  let blogId = urlParam?.blogId || "";
  const currentPath = context.req.url;

  const isAuthorsListPage = !author && !topic && (currentPath.includes("/blogs/experts/") || currentPath.includes("/blogs/experts"));
  const isBlogDetailPage = author && topic && blogId ? true : false;
  const isAuthorDetailPage = author && authorId && !topic && true;
  const isBlogHomePage = !author && !topic && !isAuthorsListPage && true;

  let pageNumber = parseInt(urlParam.page) || 1;

  let paramObj = {
    author,
    topic,
    authorId,
    blogId,
    requestURL: currentUrl,
    page: pageNumber,
    isAuthorsListPage,
    isBlogDetailPage
  };

  let pageApiData = [];
  let pageLimit = 15;
  if (isAuthorDetailPage) {
    pageLimit = 28;
  }
  let offset = pageNumber ? (pageNumber - 1) * pageLimit : 0;
  let totalNoOfRecords = 0;

  if (isBlogDetailPage) {
    let apiData = await getArticleById(blogId);
    if (!Object.keys(apiData).length) {
      return {
        notFound: true,
      }  
    } else {
      pageApiData = [apiData];
    }
  } else if (isAuthorDetailPage) {
    const apiResponse = await getArticleList({count: pageLimit, offset: offset, filter: {"post_type":"blog","all_authors":`${authorId}`},  fields:BlogsUtil.apiQueryFilters.authorBlogs })
    pageApiData = apiResponse;
  } else if (isBlogHomePage) {
    pageApiData = await getArticleList({count: pageLimit, offset: offset, filter: {"post_type":"blog"},  fields:BlogsUtil.apiQueryFilters.blogsList })
  } else if (isAuthorsListPage) {
    const authorsList = await getRedisDataByKey(`KHABARN18-nw_bloger_data`, false);
    const recommendedAuthorId = parseInt(authorsList[0]?.id);
    pageApiData = [
      {
        authorsList,
        recommendedAuthorBlogs: await getArticleList({count: 3, offset: 0, filter: {"post_type":"blog","all_authors":`${recommendedAuthorId}`},  fields:BlogsUtil.apiQueryFilters.authorBlogs })
      },
    ];
  }

  let pageContent = pageApiData;
 
  let authorInfo = "";
  if (author && pageContent[0] && pageContent[0].author_byline?.[0]) {
    authorInfo = pageContent[0].author_byline[0];
  }

  let page_title = "";
  let page_description = "";
  let page_keywords = "";
  let hires = "";
  let res43 = "";
  let nw_post_word_count = "";
  let articleData = {};

  if (isBlogDetailPage) {
    let blogData = pageContent[0];
    articleData = {
      display_headline: blogData?.display_headline || '',
      intro: blogData?.intro || '',
      tags: blogData?.tags || '',
      images: blogData?.images || '',
      images_all_sizes: blogData?.images_all_sizes || {},
      nw_post_word_count: blogData?.nw_post_word_count || '',
      created_at: blogData?.created_at || '',
      updated_at: blogData?.updated_at || '',
      body: blogData?.body || '',
      section: blogData?.section || '',
      weburl: blogData?.weburl || '',
    } 
    const { display_headline='', intro='', tags=[] } = articleData || {};

    page_title = `${display_headline} | - News in Hindi - हिंदी न्यूज़, समाचार, लेटेस्ट-ब्रेकिंग न्यूज़ इन हिंदी`;
    page_description = `${intro} | - News in Hindi - हिंदी न्यूज़, समाचार, लेटेस्ट-ब्रेकिंग न्यूज़ इन हिंदी`;
    page_keywords = tags[0]?.name || '';
    hires = articleData?.images_all_sizes?.sizes?.["16x9"]?.url || '';
    res43 = articleData?.images_all_sizes?.sizes?.["4x3"]?.url || '';
    nw_post_word_count = articleData?.nw_post_word_count
     
  } else if (isAuthorDetailPage) {
    const { hindi_name, english_name } = authorInfo;
    page_title = `${hindi_name} | ${english_name} – Author | News18 Hindi Blog`;
    page_description = `${hindi_name} | ${english_name} profile, Author at News18 Hindi. Read all of the articles posts by ${english_name}.`;
    page_keywords = `${hindi_name}, ${english_name}, ${english_name} profile, ${english_name} Author, ${english_name} blogs, ${english_name} blogger`;
  } else if (isBlogHomePage) {
    page_title =
      "ब्लॉग एंड ओपिनियन | Expert Blogs And Opinions In Hindi - News18 India";
    page_description =
      "पढ़े एक्सपर्ट ब्लॉग एंड ओपिनियन | Read Experts opinions and blogs on trending topic in Hindi at News18 India.";
    page_keywords =
      "latest news blog, expert opinion, expert blog, expert news blog";
  } else if (isAuthorsListPage) {
    page_title =
      "News18 हिन्दी - एक्सपर्ट / Authors | News18 India Writers/Blogger Profile";
    page_description =
      "News18 हिन्दी Authors - Get latest and descriptive blogs and articles in Hindi by the News18 authors.";
    page_keywords =
      "News18 Hindi Authors, News18 हिन्दी Authors, News18 blogs, News18 articles, News18 authors";
  }

  let [
    menuData = {},
    miscData = {},
    topPriorityStories = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    googleRemoteConfig = {},
    districtList = {},
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getMiscData({ trendingTags: true }),
    !isMobile ? getArticleList({count: 5, filter: { post_type:'text' }, fields: 'display_headline,weburl_r,story_id,images,weburl'}): [], 
    !isAmp? getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM): [],
    !isMobile ? getArticleList({count: 5 , fields: 'display_headline,weburl_r,story_id,images,weburl'}): [],
    !isMobile ? getArticleList({count: 9 , filter: { post_type:"photogallery" },  fields: 'gallery_count,display_headline,weburl_r,story_id,images,weburl'}): [],
    getGoogleConfig(),
    isAmp && getDistricts(),
  ]);

  let pageTitle = page_title;
  let pageDescription = page_description;
  let pageKeywords = page_keywords || '';

  let siteUrl = publicRuntimeConfig.siteUrl;
  let news = siteUrl + "news/";
  let pageSeo = {
    title: pageTitle || "404 Not Found",
    description: pageDescription || '',
    keywords: pageKeywords || '',
    canonical: isAmp? currentUrl.split('/amp/')[0] + currentUrl.split('amp')[1]  : currentUrl.split("page")[0],
    og_image: hires || res43,
    news,
    pageUrl: siteUrl,
    og_title: pageTitle,
    og_description: pageDescription,
    isTag,
    author,
    topic,
  };

  if (!isAmp && author && topic) {
    let ampUrl = protocol + host + "/amp" + context.req.url;
    pageSeo.ampHtml = ampUrl;
  }

  if (typeof pageContent != "undefined" && pageContent != "") {
    pageSeo.jsonLdForWebPage =
      jsonLdForWebPage(
        pageTitle || '',
        pageDescription || '',
        pageKeywords || '',
        currentUrl ? currentUrl.split("?")[0] : "",
        ""
      ) || "";

    pageSeo.jsonLdForItemList = jsonLdForItemList(
      currentUrl,
      isMobile ? 16 : 24,
      pageContent
    );
    pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(menuData, isMobile);
    if (author && topic) {
      if (articleData) {
        pageSeo.jsonLdForArticleConsumption = jsonLdForArticleConsumption(articleData, "", isAmp, pageKeywords) || "";
      }
    }
  }
  const pageAds = isMobile
    ? author && topic
      ? generateMobileBlogAds("topic")
      : generateMobileBlogAds("listing")
    : author && topic
      ? generateDesktopBlogAds("topic")
      : generateDesktopBlogAds("listing");
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    weburl: currentUrl,
    article_id: blogId ? blogId : "",
    section: topic ? topic : "blogs",
    content_type: "blogs",
    block_ads: "no",
  });

  const imageWidth = isMobile ? "186" : "225";
  const imageHeight = isMobile ? "124" : "150";

  let taboolaList = TaboolaList.category;

  const pageData = {
    isMobile,
    authorInfo,
    pageContent,
    articleData,
    currentUrl,
    urlParam,
    pageLimit,
    dataLength: pageContent.length || 0,
    totalNoOfRecords,
    imageWidth,
    imageHeight,
    menuData,
    pageSeo,
    pageAds,
    trendingTags: miscData.trendingTags || [],
    topStory: { rhsTopStoryListing: topPriorityStories },
    pageNumber: parseInt(pageNumber),
    paramObj,
    districtList,
    footerData,
    topStories,
    photoStories,
    isMobile,
    config: googleRemoteConfig,
    inRelatedBlogs: false,
    pageType: "category",
    nw_post_word_count: nw_post_word_count || "",
    taboolaList,
  };
  return { props: { pageData } };
};
export default blogsProps;
