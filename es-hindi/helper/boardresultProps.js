import { checkDevice, getSetTargettingValues } from "includes/helper";
import { ignoreQueryParams } from "includes/article.util";
import { boardResultLanding as generateDesktopAds } from "includes/Desktop/dfpAdIds";
import { boardResultLanding as generateMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import {
  getMenu,
  getMiscData,
  getRedisDataByKey,
  getDistricts,
  getArticleList,
  getGoogleConfig,
  GetCategoryArticles
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";
import { getBoardResults } from "api_dns/individual/BoardResult";
import { TaboolaList } from "includes/Tabola.helper";
const staticPagesProps = async (context, isAmp = false) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url, false);
  const urlParam = context.query;
  
  let [
    boardResults = [],
    menuData = {},
    miscData = {},
    topPriorityStories = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    googleRemoteConfig = {},
    districtList = {},
    relatedNewsData = [],
    {
      education: EducationNews = [],
      career: CareerNews = [],
    },
    categorySponserData = {},
  ] = await Promise.all([
    getBoardResults(),    
    getMenu(isMobile), 
    getMiscData({ trendingTags: true,image:true }),
    !isMobile ? getArticleList({
      count  : 5,
      offset : 0,
      fields : "story_id,headline,images,display_headline,weburl",
      filter : {"post_type":"news"},
    }) : [],
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    getArticleList({
      count  : 5,
      offset : 0,
      fields : "story_id,headline,images,display_headline,weburl",
      filter : {},
    }),
     getArticleList({
      count  : 9,
      offset : 0,
      fields : "story_id,headline,images,display_headline,weburl,gallery_count",
      filter : {"post_type":"photogallery"},
    }),
    getGoogleConfig(),
    isAmp && getDistricts(),
    getArticleList({
      count  : 8,
      offset : 0,
      fields : "story_id,headline,images,display_headline,weburl",
      filter : { "tags.slug": "board-results" },
    }),
    GetCategoryArticles({
      filter: [
        {
          count: 6,
          offset: 0,
          sortOrder: "desc",
          fields: "",
          sortBy: "created_at",
          category: `education`,
          type: "category",
        },
        {
          count: 6,
          offset: 0,
          sortOrder: "desc",
          fields: "",
          sortBy: "created_at",
          category: `career`,
          type: "category",
        },
      ],
      key: "",
      cache: { key: "board_category_articles_with_two_count", ttl: 60 },
    }),
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]);
  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];
  let pageSeo = {    
    canonical: currentUrl,
    og_image: `https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png`,
    og_title: "", 
    title: "Indian Board Result: Explore All India State and Central Board Exam Results in Hindi",
    description : "All India Board Exam Results - Access MP, UP, Bihar, Rajasthan, CG, UK Board Results, and More Online",
    keywords : "Indian board exam results, All India board results, Board exam results, MP board result, UP board result, Bihar board result, Rajasthan board result, CG board result, UK board result, Online board exam results, India education results, Secondary education results, High school board results, Class 10 results, Class 12 results, State board results, Central board results, Exam result portal" 
  }
  const breadCrumbArray = [
    { value: "हिंदी न्यूज", slug: "/" },
    {
      value: "India result",
      slug: "/india-result/",
    },
  ];
  pageSeo.breadCrumbArray = breadCrumbArray;
  const pageAds = isMobile ? generateMobileAds("") : generateDesktopAds("");
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo?.title || "",
    description: pageSeo?.description || "",
    seo_keywords: pageSeo?.keywords || "",
    weburl: currentUrl || "",
    article_id: "",
    block_ads: "no",
  });
  let taboolaList = TaboolaList.category;
  const pageData = {
    board:null,
    taboolaList,
    isMobile,
    currentUrl,
    urlParam,
    menuData,
    pageSeo,
    pageAds,
    trendingTags: miscData.trendingTags || [],
    topStory: { rhsTopStoryListing: topPriorityStories },
    districtList,
    footerData,
    topStories,
    photoStories,
    isMobile,
    config: googleRemoteConfig,
    boardResults,
    relatedNewsData,
    EducationNews,
    CareerNews,
    _1xbetData
  };
  return { props: { pageData } };
};
export default staticPagesProps;