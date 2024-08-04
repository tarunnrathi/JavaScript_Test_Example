import { ignoreQueryParams } from "includes/article.util";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import fetchUtilityDirct from "includes/sFetchUtilityDirect";
import { home as homeAds } from "includes/Desktop/dfpAdIds";
import { home as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import {
  getArticleList,
  // getDistricts,
  getMenu,
  // getMiscData,
  getPriorityData,
  getRedisDataByKey,
  getGoogleConfig,
} from "api_dns/global/Common";

const asianGamesHomeProps = async (context) => {
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  if (currentUrl[currentUrl.length - 1] != "/") {
    currentUrl = currentUrl + "/";
  }

  const series_id = 37;

  let [
    menuData = {},
    footerData = [],
    googleRemoteConfig,
    // districtList = {},
    photoNews = [],
    videoNews = [],
    news = [],
    asianGameCricketNews = [],
    metalTallyTableData = {},
    topNews = [],
    asianGamesList = [],
    medalHopeList = [],
    asianGameSwitcher = [],
    asianUltimatePerformer = [],
    medalListByYear = {},
    topStories = [],
    photoStories = [],
  ] = await Promise.all([
    getMenu(isMobile),
    getRedisDataByKey("new_fms_system", "KHABARN18-"),
    getGoogleConfig(),
    // getDistricts(),
    getArticleList({
      offset: 0,
      count: 4,
      fields:
        "story_id,intro,display_headline,headline,weburl_r,images,gallery_count",
      filter: { post_type: "photogallery", "tags.slug": "asian-games" },
    }),
    getArticleList({
      offset: 0,
      count: 4,
      fields:
        "story_id,intro,display_headline,headline,weburl_r,images,gallery_count",
      filter: { post_type: "videos", "tags.slug": "asian-games" },
    }),
    getArticleList({
      offset: 0,
      count: 13,
      fields:
        "story_id,intro,display_headline,headline,weburl_r,images,gallery_count",
      filter: { post_type: "text", "tags.slug": "asian-games" },
    }),
    getArticleList({
      offset: 0,
      count: 6,
      fields: "story_id,intro,display_headline,headline,weburl_r,images",
      filter: {
        "categories.slug": "cricket",
        "tags.slug": "asian-games",
        post_type: "text",
      },
    }),
    fetchUtilityDirct(
      `https://xmlns.cricketnext.com/cktnxt/scorecard/olympics/${series_id}_medals_tally.json`,
      {}
    ),
    getPriorityData({
      section: "asian_game_2023",
      subSection: "NA",
      count: 6,
      fallback: false,
      filter: false,
      fields: false,
    }),
    getRedisDataByKey("asian_game_list", "KHABARN18-"),
    getRedisDataByKey("india_medal_hopes", "KHABARN18-"),
    getRedisDataByKey("nw_asian_switcher_2023", "KHABARN18-"),
    getRedisDataByKey("asian_ultimate_performer", "KHABARN18-"),
    getRedisDataByKey("ultimate_asian_performer_2023", "KHABARN18-"),
    getArticleList({
      count: 3,
      offset: 0,
      fields:
        "story_id,display_headline,title,images,categories,post_type,weburl_r,weburl,intro,gallery,gallery_count",
      filter: { post_type: "text" },
    }),
    getArticleList({
      count: 5,
      offset: 0,
      fields:
        "story_id,display_headline,title,images,categories,post_type,weburl_r,weburl,intro,gallery_count",
      filter: { post_type: "photogallery" },
    }),
  ]);

  const asianGamesMedalHopeNews = news.slice(0, 5) || [];
  const asianGamesBottomNews = news.slice(5, 13) || [];
  const medalTallyList =
    (metalTallyTableData?.medals_tally || []).slice(0, 10) || [];

  const pageSeo = {
    title:
      "Asian Games 2023: ताज़ा ख़बरें, शेड्यूल, वेन्यू  | एथलेटिक्स  वीडियोस और फोटोज़",
    description:
      "Asian Games 2023: देखें एशियन गेम्स 2023 में होने वाले खेलों की पूरी लिस्ट, टीमों की जानकारी, मैच शेड्यूल, वेन्यू और बहुत कुछ न्यूज़18 हिंदी पर.",
    keywords:
      "एशियन गेम्स, एशियन गेम्स 2023, Asian Games 2023, 19th asian games 2023, asia cup hockey, asian games tally, asian games schedule, Indian athletes, Archery, Badminton, Boxing, Bridge, Chess, Esports, Golf, Asian Athletics, Asian Games Date, Asian Games Venue,",
    canonical: currentUrl,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    page: "Home",
  };

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

  return {
    props: {
      pageData: {
        menuData,
        footerData,
        googleRemoteConfig,
        // districtList,
        pageSeo,
        pageAds,
        isMobile,
        topNews,
        topStories,
        photoStories,
        asianGamesList,
        medalHopeList,
        asianUltimatePerformer,
        asianGamesMedalHopeNews,
        asianGamesBottomNews,
        photoNews,
        videoNews,
        asianGameCricketNews,
        asianGameSwitcher: asianGameSwitcher?.data || {},
        medalTallyList,
        medalListByYear: Object.values(medalListByYear || {}),
      },
    },
  };
};

export default asianGamesHomeProps;
