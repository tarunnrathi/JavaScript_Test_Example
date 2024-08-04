import { checkDevice } from "includes/helper";
import { ignoreQueryParams } from "includes/article.util";
import { jsonLdForWebPage } from "includes/schema.util";
import {
  getPriorityData,
  getArticleList,
  getMiscData,
  getWebStories,
} from "api_dns/global/Common";

const News18LocalProps = async (context) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  const { host = "" } = context.req.headers;
  if (host.indexOf("localhost") > -1 || host.indexOf("127.0.0.1:3050") > -1) {
    protocol = "http://";
  }

  const currentUrl = ignoreQueryParams(protocol + host + context.req.url)+"/";

  const fields =
    "story_id,categories,subsection,intro,display_headline,created_at,headline,post_type,images,images_all_sizes,weburl,weburl_r,ff_source,gallery_count2,agency";
  const storyDivider = async (sliderNeed, stories = [], isMobile = false) => {
    let leftCatIndex = 2;

    if (isMobile) {
      leftCatIndex = 1;
    }

    return {
      leftCat: stories.slice(0, leftCatIndex),
      rightCat: stories.slice(leftCatIndex, 3),
      rightCatThird: stories.slice(3, 6),
    };
  };
  let topPriorityDataList = [];

  const pcategory = context.query.city || "uttar-pradesh";
  topPriorityDataList = await getArticleList({
    count: 6,
    offset: 0,
    fields,
    filter: {
      "categories.slug": pcategory,
      agency: "Local18"
    }
  });
  const topPriorityData = await storyDivider(
    true,
    topPriorityDataList,
    isMobile
  );

  const _pageParam = {};

  const [
    miscData = {},
    localVideosData = [],
    stateStories = [],
    photogalleryNews = [],
    webStoriesNews = [],
    shortVideosList = [],
    trendingNews = [],
    bestOfLocal18 = [],
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getMiscData({ trendingTags: true }),
    await getArticleList({
      count: 7,
      offset: 0,
      sortOrder: "desc",
      sortBy: "created_at",
      fields:
        "display_headline,headline,images,categories,post_type,weburl,created_at",
      filter: { post_type: "videos", "tags.slug": "local18" },
    }),
    await getArticleList({
      count: 11,
      offset: 0,
      sortOrder: "desc",
      sortBy: "created_at",
      fields:
        "display_headline,headline,images,intro,categories,post_type,weburl,created_at",
      filter: { "categories.slug": "local18" },
    }),
    getArticleList({
      count: 6,
      offset: 0,
      sortOrder: "desc",
      sortBy: "created_at",
      filter: { post_type: "photogallery", "tags.slug": "local18" },
      fields: `headline,images,display_headline,weburl,categories,gallery_count,weburl_r`,
    }),
    getWebStories({
      count: 10,
      sortOrder: "desc",
      sortBy: "created_at",
      filter: { categories: "local18" },
      fields: "blog_title,web_url_r,web_url,feature_img,categories",
    }),
    getArticleList({
      count: 10,
      offset: 0,
      sortOrder: "desc",
      sortBy: "created_at",
      filter: { "tags.slug": "local18", nw_auto_yt_video_type: "shorts" },
      fields: `story_id,display_headline,headline,images,blog_title,categories,images,weburl_r,weburl`,
    }),
    getArticleList({
      count: 6,
      offset: 0,
      sortOrder: "desc",
      sortBy: "created_at",
      filter: { "tags.slug": "money18" /*"categories.slug": subsection*/ },
      fields: `story_id,intro,display_headline,headline,images,categories,images,weburl_r,weburl`,
    }),
    getArticleList({
      count: 5,
      offset: 0,
      sortOrder: "desc",
      sortBy: "created_at",
      filter: { "agency_full.slug": "local18", "tags.slug": "local18" },
      fields: `story_id,intro,display_headline,headline,images,categories,images,weburl_r,weburl`,
    }),
  ]);

  //schema related code starts here
  const metaTitle = "";
  const metaDesc = "";
  const metaKeywords = "";
  const pageSeo = {
    title: "Local 18 News in Hindi, Local18 Hindi Samachar, लोकल १८ हिंदी समाचार - Local 18",
    description: "Find Latest Local18 Hindi News for Business, Agriculture, Food and Small Traders Success, from local areas also you can easily access you local news through video coverage at Local 18.",
    keywords: "Local18, Local 18, Local 18 Hindi, local 18 business success, local 18 exam success, local18 small trader stories, local 18 agriculture success, local18 small traders success stories",
    canonical: currentUrl,
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(metaTitle, metaDesc, metaKeywords, "", false, true) || "";
  //   pageSeo.jsonLdForItemList =
  //     jsonLdForItemList(
  //       currentUrl ? currentUrl.split("?")[0] : "",
  //       categoryStoriesList.length,
  //       categoryStoriesList,
  //       schemaSection || schemaTf
  //     ) || "";
  //schema related ends start here

  const pageData = {
    localVideosData,
    stateStories,
    // taboolaList,
    isMobile,
    currentUrl,
    miscData,
    pageSeo,
    _pageParam: { ..._pageParam },
    // topPriorityData: isMobile ? topSliderData : topPriorityData,
    topPriorityData: topPriorityData,
    config: [],
    photogalleryNews,
    webStoriesNews,
    shortVideosList,
    trendingNews,
    bestOfLocal18,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default News18LocalProps;
