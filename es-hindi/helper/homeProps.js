import {
  jsonLdForHomeOrganization,
  jsonLdForHomeWebSite,
  jsonLdForHomeSiteNavigation,
} from "includes/schema.util";
import { home as homeAds } from "includes/Desktop/dfpAdIds";
import { home as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { TaboolaList } from "includes/Tabola.helper";
import {
  getAQiData,
  getDistricts,
  getMiscData,
  getRedisDataByKey,
  getRedisDataWithKey,
  getWebStories,
  GetCategoryArticles,
  getHomePageCricketArticles,
  getArticleList,
  getGoogleConfig,
  getMenu,
  getCricketData,
  getPriorityData,
} from "api_dns/global/Common";
import {
  getArticles,
  getArticlesByPriorityData,
  getEventSlider,
  getTopNews,
  getTopSpecialWidget,
} from "api_dns/individual/Home";
import { REDIS_KEYS, STATE_ARRAY, t20_world_cup_series_id } from "api/Constant";
import { getHomePageDefaultMeta } from "util/individual/Home";
import { getRashifalData } from "api_dns/individual/rashifal";
// import { homeWidget } from "../common_react/CommonHelper/electionHelper";
// import { fetchExitPoll } from "../common_react/CommonHelper/exitPollHelper";
import fetchUtility from "api_dns/sFetchUtility";

const homeProps = async (context, isAmp = false) => {
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const isMobile = checkDevice(context);
  const currentUrl = protocol + host + context.req.url;

  if (isAmp && !currentUrl.includes("/amp/")) {
    return {
      redirect: {
        destination: protocol + host + "/amp/",
        statusCode: 301,
      },
    };
  }
  let pradeshSlug = "uttar-pradesh";
  // let budgetYear = 2023;
  let topTrending = [];
  const [
    menuData = {},
    miscData = {},
    breaking = {},
    eventSlider = {},
    footerData = [],
    cricketNewsHome = {},
    googleRemoteConfig = {},
    districtList = {},
    meta = {},
    // electionData = {},
    // exitPollData = {},
    // topNews = []
    // budgetBreakingNews,
    // budgetGlossary,
    // budgetGraphicData,
    // budgetTopPriority = [],
    // { highlights: highlightData = [] },
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getMiscData({ trendingTags: true }),
    getRedisDataWithKey("KHABARN18-" + REDIS_KEYS.BREAKINGALERT, false),
    getEventSlider({
      offset: 0,
      count: 8,
      cache: { key: "get_homepage_event_slider", ttl: 60 },
    }),
    !isAmp ? getRedisDataByKey("new_fms_system", "KHABARN18-") : [],
    getRedisDataWithKey(REDIS_KEYS.HOMEPAGE_CRICKET, false),
    getGoogleConfig(),
    isAmp && getDistricts(),
    getRedisDataByKey("metatags_home", "KHABAR:"),
    // homeWidget({
    //   mode: "prod",
    //   fetchIt: true,
    //   lang: "hi",
    //   isMobile,
    //   pub: true,
    // }),
    // fetchExitPoll({
    //   mode: "prod",
    //   lang: "hi",
    //   isMobile,
    // }),

    // getRedisDataByKey(`nw_budget_breaking_news`),
    // getRedisDataByKey(`nw_union_budget_glossary`),
    // getRedisDataByKey("nw_budget_graphic"),
    // getPriorityData({
    //   section: "budget",
    //   subSection: "news",
    //   count: 10,
    //   fallback: true,
    //   filter: { "tags.slug": "budget" },
    // }),
    // isAmp ? getRedisDataByKey(`unionbudget_highlights`) : {},
  ]);

  // const budgetHomeData = {
  //   budgetBreakingNews,
  //   budgetGlossary,
  //   budgetGraphicData,
  //   budgetTopPriority,
  // };
  const metaDetails = meta?.tags?.[0] || {};
  let score = false;
  let liveMatchData = await getCricketData(`live-matches`);
  if (liveMatchData && liveMatchData.length > 0) {
    let isIccMatch = liveMatchData.some(
      (match) =>
        match.league === "IPL" ||
        (match.league === "ICC" &&
          (match.teama_eng === "India" ||
            match.teamb_eng === "India" ||
            match.seriesname === "आईसीसी क्रिकेट विश्व कप, 2023" ||
            match.seriesname === "आईसीसी क्रिकेट विश्व कप वार्म-अप मैच, 2023" ||
            match?.series_Id === `${t20_world_cup_series_id}`))
    );
    if (isIccMatch) score = true;
  }

  const [
    exnews = {},
    {
      cricket: getCricketArticles = [],
      entertainment: getBollywoodArticles = [],
      business: getMoneyArticles = [],
      sports: getSportsArticles = [],
      tech: techNewsSSR = [],
      literature: Sahitya = [],
      ["ajab-gajab"]: AjabGajab = [],
      recipe: foodDataSsr = [],
      ["cartoon-corner"]: CartoonCornerDataSsr = [],
      blog: blogDataSsr = [],
    } = getCricket_Bollywood_Money_Sports,
    newsMini = [],
    webStoriesSsr = [],
    shortVideosSsr = [],
    topHomeNews = [],
    photogalleryNews = [],
    // videogallerySsr = [],
    originalVideos = [],
    dynamicBanner = {},
    aqiDataSsr = [],
    pradeshLineUp = [],
    pradeshNews = [],
    liveBlogList = [],
    specialLiveBlog = {},
    rashifalData = {},
    liveTvPosition = {},
    // categorySponserData = {},
    eventCoverageSwitcher = [],
    short_news_rhs = [],
     medalTally =[],
    topNewsStoryData = [],
  ] = await Promise.allSettled([
    getTopSpecialWidget(),
    GetCategoryArticles({
      filter: [
        {
          count: isAmp ? 7 : 6,
          offset: 0,
          sortOrder: "desc",
          fields: "",
          sortBy: "created_at",
          category: `cricket`,
          type: "category",
        },
        {
          count: isAmp ? 5 : 6,
          offset: 0,
          sortOrder: "desc",
          fields: "",
          sortBy: "created_at",
          category: `entertainment`,
          type: "category",
        },
        {
          count: isAmp ? 5 : 6,
          offset: 0,
          sortOrder: "desc",
          fields: "",
          sortBy: "created_at",
          category: `business`,
          type: "category",
        },
        {
          count: isAmp ? 5 : 6,
          offset: 0,
          sortOrder: "desc",
          fields: "",
          sortBy: "created_at",
          category: `sports`,
          type: "category",
        },
        {
          count: isAmp ? 5 : 6,
          offset: 0,
          sortOrder: "desc",
          fields: "",
          sortBy: "created_at",
          category: `tech`,
          type: "category",
        },
        {
          count: 6,
          offset: 0,
          sortOrder: "desc",
          fields: "",
          sortBy: "created_at",
          category: `literature`,
          type: "category",
        },
        {
          count: 6,
          offset: 0,
          sortOrder: "desc",
          fields: "",
          sortBy: "created_at",
          category: `ajab-gajab`,
          type: "category",
        },
        {
          count: isAmp || isMobile ? 5 : 7,
          offset: 0,
          sortOrder: "desc",
          fields:
            "story_id,headline,images,display_headline,weburl,weburl_r,local18_video",
          sortBy: "created_at",
          category: `recipe`,
          type: "category",
        },
        {
          count: isAmp || isMobile ? 4 : 7,
          offset: 0,
          sortOrder: "desc",
          fields: "",
          sortBy: "created_at",
          category: `cartoon-corner`,
          type: "category",
        },
        {
          count: 4,
          offset: 0,
          sortOrder: "desc",
          fields:
            "story_id,headline,images,display_headline,weburl,intro,post_type,gallery_count,weburl_r,author_byline",
          sortBy: "created_at",
          category: `blog`,
          type: "category",
        },
      ],
      key: "",
    }),
    getArticlesByPriorityData({
      count: 4,
      section: "news18_mini",
      subSection: "NA",
      cache: { key: "get_homepage_minis_data", ttl: 60 },
    }),
    getWebStories({
      count: 10,
      fields: "blog_title,web_url_r,web_url,feature_img,categories",
      cache: { key: "get_homepage_webstories_data", ttl: 60 },
    }),
    getArticleList({
      count: 10,
      filter: { nw_auto_yt_video_type: "shorts" },
      fields: `display_headline,headline,images,blog_title,images,weburl_r,weburl`,
      cache: { key: "get_homepage_short-video_data", ttl: 60 },
    }),
    getTopNews(),
    getArticlesByPriorityData({
      count: isMobile ? 5 : 6,
      subSection: "photogallery",
      filter: { post_type: "photogallery" },
      cache: { key: "get_homepage_photogallery_data", ttl: 60 },
    }),
    // getArticleList({
    //   count: 5,
    //   offset: 0,
    //   filter: { post_type: "videos", not: { "categories.slug": "originals" } },
    //   fields: `story_id,headline,images,display_headline,weburl,intro,post_type,gallery_count,weburl_r,author_byline`,
    //   cache: { key: "get_homepage_videos_data", ttl: 60 }
    // }),
    getArticleList({
      count: 5,
      offset: 0,
      filter: { post_type: "videos", "categories.slug": "originals" },
      fields: `story_id,headline,images,display_headline,weburl,intro,post_type,gallery_count,weburl_r,author_byline`,
      cache: { key: "get_homepage_original_videos_data", ttl: 60 },
    }),
    getRedisDataWithKey(
      "KHABARN18-" + REDIS_KEYS.HOMEPAGE_DYNAMIC_BANNER,
      false
    ),
    getAQiData(),
    STATE_ARRAY,
    getArticles({ count: isAmp ? 5 : 22, category: pradeshSlug }),
    !isAmp
      ? getArticleList({
          count: 2,
          offset: 0,
          filter: { liveblog_switcher: 1 },
          fields: `headline,created_at,weburl,weburl_r,updated_at`,
          cache: { key: "get_liveBlogList_data", ttl: 60 },
        })
      : [],
    getRedisDataWithKey("KHABARN18-" + REDIS_KEYS.SPECIAL_LIVE_BLOG, false),
    getRashifalData("aries", "day"),
    getRedisDataWithKey(REDIS_KEYS.LIVETV_POSITION, false),
    // getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
    getRedisDataWithKey(REDIS_KEYS.EVENT_COVERAGE_SWITCHER, false),
    getArticleList({
      count: 1,
      filter: { shortnews_status: "1" },
      fields:
        "weburl_r,weburl_short,shorts_bulletin,images,headline,display_headline,created_at,story_id,weburl,categories,post_type,is_hyperlocal_vw",
    }),
    fetchUtility(
      "https://events.nw18.com/n18sports/cricket/v1/en/39/olympics-medals/top",
      [],
      "medalTally"
    ),
    
    getPriorityData({
        section: "olympics",
        subSection: "NA",
        fields: "display_headline,weburl_r,images,intro,headline",
        filter: {
          "tags.slug": `2024-paris-olympics`,
        },
        fallback: true,
        count: 6,
      })
      
  ])
    .then((temp) => temp?.map((r) => r.value))
    .catch((error) => console.log("Home Page Api Error", error));

  let KnowledgeNews = [],
    DharmNews = [],
    AutoNews = [],
    JobNews = [],
    WorldNews = [],
    HealthNews = [],
    NationNews = [],
    LifeStyleNews = [],
    CareerNews = [],
    CrimeNews = [],
    specialNews = {};
  // mainMenu = {};
  if (isAmp) {
    [
      {
        knowledge: KnowledgeNews = [],
        dharm: DharmNews = [],
        auto: AutoNews = [],
        jobs: JobNews = [],
        world: WorldNews = [],
        health: HealthNews = [],
        nation: NationNews = [],
        lifestyle: LifeStyleNews = [],
        career: CareerNews = [],
        crime: CrimeNews = [],
      } = getCricket_Bollywood_Money_Sports,
      // mainMenu = {},
    ] = await Promise.all([
      GetCategoryArticles({
        filter: [
          {
            count: 4,
            offset: 0,
            sortOrder: "desc",
            fields: "",
            sortBy: "created_at",
            category: `knowledge`,
            type: "category",
          },
          {
            count: 4,
            offset: 0,
            sortOrder: "desc",
            fields: "",
            sortBy: "created_at",
            category: `dharm`,
            type: "category",
          },
          {
            count: 4,
            offset: 0,
            sortOrder: "desc",
            fields: "",
            sortBy: "created_at",
            category: `auto`,
            type: "category",
          },
          {
            count: 5,
            offset: 0,
            sortOrder: "desc",
            fields: "",
            sortBy: "created_at",
            category: `jobs`,
            type: "category",
          },
          {
            count: 5,
            offset: 0,
            sortOrder: "desc",
            fields: "",
            sortBy: "created_at",
            category: `world`,
            type: "category",
          },
          {
            count: 5,
            offset: 0,
            sortOrder: "desc",
            fields: "",
            sortBy: "created_at",
            category: `health`,
            type: "category",
          },
          {
            count: 5,
            offset: 0,
            sortOrder: "desc",
            fields: "",
            sortBy: "created_at",
            category: `nation`,
            type: "category",
          },
          {
            count: 5,
            offset: 0,
            sortOrder: "desc",
            fields: "",
            sortBy: "created_at",
            category: `lifestyle`,
            type: "category",
          },
          {
            count: 5,
            offset: 0,
            sortOrder: "desc",
            fields: "",
            sortBy: "created_at",
            category: `career`,
            type: "category",
          },
          {
            count: 5,
            offset: 0,
            sortOrder: "desc",
            fields: "",
            sortBy: "created_at",
            category: `crime`,
            type: "category",
          },
        ],
        key: "",
        cache: { key: "home_page_category_articles_with_two_count", ttl: 60 },
      }),
      // getMenu(isMobile, isAmp),
    ]);
  }

  const pageSeo = getHomePageDefaultMeta(metaDetails);
  !isAmp && (pageSeo.ampHtml = protocol + host + "/amp/");

  pageSeo.jsonLdForOrganization = jsonLdForHomeOrganization() || "";
  pageSeo.jsonLdForHomeWebSite = jsonLdForHomeWebSite() || "";
  pageSeo.jsonLdForHomeSiteNavigation =
    jsonLdForHomeSiteNavigation(menuData, isMobile || isAmp) || "";

  const pageAds = isMobile ? homeMobileAds() : homeAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "Home",
    block_ads: "no",
  });

  let switches = {
    score,
  };

  let taboolaList = TaboolaList.homePage;

  if (cricketNewsHome?.live && cricketNewsHome?.live === "true") {
    const homePageCricketNews = await getHomePageCricketArticles(
      cricketNewsHome?.story_id
    );
    cricketNewsHome.storiesListLeft = homePageCricketNews.slice(0, 2) || [];
    cricketNewsHome.storiesListRight = homePageCricketNews.slice(2, 6) || [];
  }

  // const catSponData = Object.values(categorySponserData || {})?.find(
  //   (item) => item.campagin_name === "Lok Sabha Election 2024"
  // );
  // const _1xbetData = catSponData?.sponserdata || [];

  let pageData = {
    // budgetYear,
    taboolaList,
    isMobile,
    menuData,
    exnews,
    pageAds,
    pageSeo,
    trendingTags: miscData.trendingTags || [],
    loadTv: true,
    switches,
    breaking,
    eventSlider,
    topTrending,
    pradeshNews,
    newsMini,
    footerData,
    Sahitya,
    AjabGajab,
    cricketNewsHome,
    webStoriesSsr,
    shortVideosSsr,
    aqiDataSsr,
    pradeshLineUp,
    config: googleRemoteConfig,
    techNewsSSR,
    blogDataSsr,
    // videogallerySsr,
    originalVideos,
    foodDataSsr,
    CartoonCornerDataSsr,
    dynamicBanner,
    photogalleryNews,
    switchAds:
      googleRemoteConfig && googleRemoteConfig.length
        ? googleRemoteConfig?.find((i) => i.key == "NW18_HIND_HP_ATF_320") ||
          false
        : false,
    currentUrl,
    // homeTrendStory,
    getCricketArticles,
    getBollywoodArticles,
    getMoneyArticles,
    getSportsArticles,
    districtList,
    topHomeNews,
    // topNews
    liveBlogList: liveBlogList.splice(0, 2),
    // budgetHomeData,
    specialLiveBlog,
    rashifalData,
    eventCoverageSwitcher,
    liveTvPosition,
    // _1xbetData,
    // electionData,
    // exitPollData,
    short_news_rhs,
    medalTally,
    topNewsStoryData
  };

  if (isAmp) {
    pageData = {
      ...pageData,
      KnowledgeNews,
      DharmNews,
      AutoNews,
      JobNews,
      WorldNews,
      HealthNews,
      NationNews,
      LifeStyleNews,
      CareerNews,
      CrimeNews,
      specialNews,
      Sahitya,
      AjabGajab,
      currentUrl,
      districtList,
      // highlightData
    };
  }

  // Pass data to the page via props
  return { props: { pageData } };
};
export default homeProps;
