import {
  jsonLdForHomeOrganization,
  jsonLdForHomeWebSite,
  jsonLdForHomeSiteNavigation,
} from "includes/schema.util";
import { olympics as olympicsDesktop } from "includes/Desktop/dfpAdIds";
import { olympics as olympicsMobile } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { TaboolaList } from "includes/Tabola.helper";
import {
  getMiscData,
  getRedisDataByKey,
  getGoogleConfig,
  getMenu,
  getCricketData,
  getPriorityData,
  getArticleList,
  RhsphotoStories,
  RhstopStories,
} from "api_dns/global/Common";
import { olympics_id, URL, olympics_year } from "api/Constant";
import fetchUtility from "api_dns/sFetchUtility";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const olympicsProps = async (context, isAmp = false) => {
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const url = context?.req?.url;
  let ishome = false,
    isSchedule = false,
    isResults = false,
    isMedalTally = false,
    isNews = false,
    isPhotos = false,
    isVideos = false;
  if (url?.includes("/schedule")) {
    isSchedule = true;
  } else {
    if (url?.includes("/results")) {
      isResults = true;
    } else if (url.includes("/medals-tally")) {
      isMedalTally = true;
      isResults = true;
    } else {
      if (url?.includes("/news")) {
        isNews = true;
      } else {
        if (url?.includes("/photos")) {
          isPhotos = true;
        } else {
          if (url?.includes("/videos")) {
            isVideos = true;
          }
          if (url?.includes("/amp")) {
            isAmp = true;
          } else {
            ishome = true;
          }
        }
      }
    }
  }
  const isMobile = checkDevice(context);
  const currentUrl = protocol + host + context.req.url;
  let topTrending = [];
  let date = (new Date()).toLocaleDateString("en-US",{day:"2-digit"})+"-"+(new Date()).toLocaleDateString("en-US",{month:"2-digit"})+"-"+(new Date()).getFullYear();
  //let date = "24-07-2024";
  // console.log(date);
  const [
    menuData = {},
    miscData = {},
    footerData = [],
    googleRemoteConfig = {},
    //allMedals = [],
    topNewsStoryData = [],
    medalTally = [],
    photoGallery = [],
    videos = [],
    latestNewsData = [],
    lomp_sdl_with_date = [],
    schedule_All = [],
    medalHopeData = [],
    performerOfTheDay = [],
    indiaNewsByTag = [],
    results = [],
    olympics_medals = [],
    latestStories = [],
    photoStories = [],
    latestPhotoStories = [],
    topStoriesData = [],
    latestVideosStories = [],
    categorySponserData = {},
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getMiscData({ trendingTags: true }),
    getRedisDataByKey("new_fms_system", "KHABARN18-"),
    getGoogleConfig(),
    // getCricketData(
    //   `${olympics_id}/olympics-medals/${URL.GET_OLYMPICS_MEDALS_ALL}`,
    //   "allMedals",
    //   900,
    //   "en"
    // ),
    ishome || isAmp
      ? getPriorityData({
          section: "olympics",
          subSection: "NA",
          fields: "display_headline,weburl_r,images,intro",
          filter: {
            "tags.slug": `2024-paris-olympics`,
          },
          fallback: true,
          count: 7,
        })
      : [],
    fetchUtility(
      "https://cricketnext.nw18.com/sports/csr/feed/olympics_medals_top_en.json",
      [],
      "medalTally"
    ),
    ishome
      ? getArticleList({
          count: 11,
          offset: 0,
          filter: {
            post_type: "photogallery",
            "tags.slug": `2024-paris-olympics`,
          },
          fields:
            "id,display_headline,weburl_r,images,headline,intro,created_at,gallery_count",
        })
      : [],
    ishome
      ? getArticleList({
          count: 11,
          offset: 0,
          filter: {
            post_type: "videos",
            "tags.slug": `2024-paris-olympics`,
          },
          fields:
            "id,display_headline,weburl_r,images,headline,intro,created_at,gallery_count",
        })
      : [],
    ishome
      ? getArticleList({
          count: 16,
          filter: {
            post_type: "text",
            "tags.slug": `2024-paris-olympics`,
          },
          fields: "id,display_headline,weburl_r,images,headline,intro",
        })
      : [],
    getCricketData(
      `${olympics_id}/${URL.GET_OLYMPICS_SCHEDULE_WITH_DATE}/${date}`,
      `lomp_sdl_with_date_${date}`,
      0,
      "en"
    ),
    getCricketData(
      `${olympics_id}/${URL.GET_OLYMPICS_SCHEDULE_ALL}`,
      `schedule_All`,
      9000,
      "en"
    ),
    getRedisDataByKey("olympics_medal_hopes", "KHABARN18-", false),
    getRedisDataByKey("olympics_performer_day", "KHABARN18-", false),
    ishome
      ? getArticleList({
          count: 5,
          offset: 0,
          filter: {
            "tags.slug": `india-in-focus`,
          },
          fields:
            "id,display_headline,weburl_r,images,headline,intro,created_at,gallery_count,story_id",
        })
      : [],
    isResults
      ? getCricketData(`39/${URL.GET_OLYMPICS_RESULTS}`, `results`, 9000, "en")
      : [],
    isResults
      ? getCricketData(
          `${olympics_id}/${URL.GET_OLYMPICS_MEDALS}/all`,
          `medals_all`,
          9000,
          "en"
        )
      : [],
    isNews
      ? getArticleList({
          count: 20,
          filter: {
            post_type: "text",
            "tags.slug": `2024-paris-olympics`,
          },
          fields: "display_headline,weburl_r,images,weburl",
        })
      : [],
    isNews
      ? !isMobile
        ? RhsphotoStories(false, `2024-paris-olympics`)
        : []
      : [],

    isPhotos
      ? getArticleList({
          count: 20,
          filter: {
            post_type: "photogallery",
            "tags.slug": `2024-paris-olympics`,
          },
          fields: "display_headline,weburl_r,images,weburl",
        })
      : [],
    isPhotos || isVideos || isResults || isMedalTally
      ? RhstopStories({
          count: 4,
          section: "icct20",
          subSection: "NA",
          filter: { post_type: "text", "tags.slug": `2024-paris-olympics` },
          fields: "story_id,headline,weburl,images,display_headline",
        })
      : [],
    isVideos
      ? getArticleList({
          count: 20,
          filter: {
            post_type: "videos",
            "tags.slug": `2024-paris-olympics`,
          },
          fields: "display_headline,weburl_r,images,weburl",
        })
      : [],
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]);

  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Olympics 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];
  date = date.split("-")[0];
  let middleData, rightData, leftData;
  if (isMobile || isAmp) {
    rightData = topNewsStoryData.splice(0, 1);
    middleData = topNewsStoryData.splice(0, 3);
    leftData = topNewsStoryData;
  } else {
    middleData = topNewsStoryData.splice(0, 1);
    rightData = topNewsStoryData.splice(0, 3);
    leftData = topNewsStoryData;
  }

  const pageSeo = {};
  !isAmp && (pageSeo.ampHtml = protocol + host + "/amp/");
  if (ishome) {
    pageSeo.title = `Paris Olympic Games (ओलंपिक खेल) ${olympics_year}: Latest News Schedule Results India Medal Tally `;
    pageSeo.description = `Get Paris Olympic Games ${olympics_year} Schedule, India Medal Tally, Results, and other updates`;
    pageSeo.keywords = `India Paris Olympic Games ${olympics_year} Schedule, Summer Olympic Games ${olympics_year} Results, Paris Olympic Games ${olympics_year} India Medal Tally, India Paris Olympic Games ${olympics_year}, पेरिस ओलंपिक खेल ${olympics_year} कार्यक्रम, ग्रीष्मकालीन ओलंपिक खेल ${olympics_year} परिणाम, पेरिस ओलंपिक खेल ${olympics_year} भारत पदक तालिका, भारत पेरिस ओलंपिक खेल ${olympics_year}`;
  }
  if (isSchedule) {
    pageSeo.title = `Paris Olympic Games (ओलंपिक खेल) ${olympics_year}: Latest News Game Schedule Date Time in India`;
    pageSeo.description = `Get Paris Olympic Games (ओलंपिक खेल) ${olympics_year} Schedule Date Time in India and other updates.`;
    pageSeo.keywords = ` India Olympic Games ${olympics_year} Date, Paris Olympics Games ${olympics_year} Schedule, Paris Olympics Games ${olympics_year} Date in India, Paris Olympics Games ${olympics_year} Date Time in India,भारत ओलंपिक खेल ${olympics_year} तिथि, पेरिस ओलंपिक खेल ${olympics_year} अनुसूची, भारत में पेरिस ओलंपिक खेल ${olympics_year} तिथि, भारत में पेरिस ओलंपिक खेल ${olympics_year} तिथि और समय,`;
  }
  if (isResults) {
    pageSeo.title = `Paris Olympic Games (ओलंपिक खेल) ${olympics_year} Results: Latest News Results, Gold Medalist in India.`;
    pageSeo.description = `Get Paris Olympic Games (ओलंपिक खेल) ${olympics_year} Result, India Gold Medalist and other Updates.`;
    pageSeo.keywords = ` Paris Olympic Games ${olympics_year} Result, India Summer Olympic Games ${olympics_year} Result, India Olympic Games ${olympics_year} Gold Medal, India Olympic Games ${olympics_year} Silver Medal, पेरिस ओलंपिक खेल ${olympics_year} परिणाम, भारत ग्रीष्मकालीन ओलंपिक खेल ${olympics_year} परिणाम, भारत ओलंपिक खेल ${olympics_year} स्वर्ण पदक, भारत ओलंपिक खेल ${olympics_year} रजत पदक`;
  }
  if (isMedalTally) {
    pageSeo.title = `Paris Olympic Games (ओलंपिक खेल) ${olympics_year}:  Latest News Games Medal Tally Gold Silver Medalist and Records in India`;
    pageSeo.description = `Get Paris Olympic Games (ओलंपिक खेल) ${olympics_year}  Medal Tally Gold Silver Medalist Records in India and Other Countries Updates.`;
    pageSeo.keywords = ` Paris Olympic Games ${olympics_year}, Paris Olympic Games ${olympics_year} Medal Tally, Paris Olympic Games ${olympics_year} India Medal Tally, India Olympic Games ${olympics_year} Medal Tally, India Olympics ${olympics_year} Records in India, पेरिस ओलंपिक खेल ${olympics_year}, पेरिस ओलंपिक खेल ${olympics_year} पदक तालिका, पेरिस ओलंपिक खेल ${olympics_year} भारत पदक तालिका, भारत ओलंपिक खेल ${olympics_year} पदक तालिका, भारत ओलंपिक ${olympics_year} भारत में रिकॉर्ड`;
  }
  if (isNews) {
    pageSeo.title = `Paris Olympic Games (ओलंपिक खेल)  ${olympics_year} News: Latest Breaking Samachar Schedule Results India Medal Tally`;
    pageSeo.description = `Get Paris Olympic Games (ओलंपिक खेल)  ${olympics_year} News, Schedule, Results, India Medal Tally and Other Samachar.`;
    pageSeo.keywords = `Paris Olympic Games  ${olympics_year}, ओलंपिक खेल  ${olympics_year}, Summer Olympic Games  ${olympics_year} News, Olympic Games ${olympics_year} Breaking News, Olympic Games ${olympics_year} Latest Samachar, पेरिस ओलंपिक खेल ${olympics_year}, ग्रीष्मकालीन ओलंपिक खेल ${olympics_year} न्यूज़, ओलंपिक खेल ${olympics_year} ब्रेकिंग न्यूज़, ओलंपिक खेल ${olympics_year} ताज़ा ख़बर`;
  }
  if (isPhotos) {
    pageSeo.title = `Paris Olympic Games (ओलंपिक खेल) ${olympics_year} Photos: Latest India Medals History Games Picture Images`;
    pageSeo.description = `Get Paris Olympic Games (ओलंपिक खेल) ${olympics_year} Photos India Medals History Games Picture Images and Other Updates.`;
    pageSeo.keywords = `Paris Olympic Games ${olympics_year}, पेरिस ओलंपिक खेल ${olympics_year}, Paris Olympic Games ${olympics_year} Photos, Olympic Games ${olympics_year} History Photos, Olympic Games ${olympics_year} India Medals Images,पेरिस ओलंपिक खेल ${olympics_year} तस्वीरें, ओलंपिक खेल ${olympics_year} इतिहास तस्वीरें, ओलंपिक खेल ${olympics_year} भारत पदक छवियाँ,`;
  }
  if (isVideos) {
    pageSeo.title = `Paris Olympic Games (ओलंपिक खेल) ${olympics_year} Videos: Latest India Games Replays and Highlights Video`;
    pageSeo.description = `Watch Paris Olympic Games (पेरिस ओलंपिक खेल) ${olympics_year} Videos India Medals History Games Highlights and Replay.`;
    pageSeo.keywords = `Paris Olympic Games ${olympics_year} Videos, पेरिस ओलंपिक खेल ${olympics_year}, Watch Paris Olympic Games ${olympics_year}, India Paris Olympic Games ${olympics_year} Highlights Videos, Paris Olympic Games ${olympics_year} Replays Video, पेरिस ओलंपिक खेल ${olympics_year} वीडियो, पेरिस ओलंपिक खेल ${olympics_year} देखें, भारत पेरिस ओलंपिक खेल ${olympics_year} हाइलाइट्स वीडियो, पेरिस ओलंपिक खेल ${olympics_year} रिप्ले वीडियो,`;
  }

  const breadCrumbArray = isSchedule
    ? [
        { value: "हिंदी समाचार", slug: "/" },
        { value: "खेल", slug: "/news/sports/" },
        { value: `ओलिंपिक  ${olympics_year}`, slug: "/sports/olympics/" },
        { value: `शेड्यूल`, slug: "/sports/olympics/schedule/" },
      ]
    : isMedalTally
    ? [
        { value: "हिंदी समाचार", slug: "/" },
        { value: "खेल", slug: "/news/sports/" },
        { value: `ओलिंपिक  ${olympics_year}`, slug: "/sports/olympics/" },
        { value: `पदक तालिका`, slug: "/sports/olympics/medals-tally/" },
      ]
    : isResults
    ? [
        { value: "हिंदी समाचार", slug: "/" },
        { value: "खेल", slug: "/news/sports/" },
        { value: `ओलिंपिक  ${olympics_year}`, slug: "/sports/olympics/" },
        { value: `नतीजे`, slug: "/sports/olympics/results/" },
      ]
    : isNews
    ? [
        { value: "हिंदी समाचार", slug: "/" },
        { value: "खेल", slug: "/news/sports/" },
        { value: `ओलिंपिक  ${olympics_year}`, slug: "/sports/olympics/" },
        { value: `न्यूज`, slug: "/sports/olympics/news/" },
      ]
    : isPhotos
    ? [
        { value: "हिंदी समाचार", slug: "/" },
        { value: "खेल", slug: "/news/sports/" },
        { value: `ओलिंपिक  ${olympics_year}`, slug: "/sports/olympics/" },
        { value: `फोटो`, slug: "/sports/olympics/photos/" },
      ]
    : isVideos
    ? [
        { value: "हिंदी समाचार", slug: "/" },
        { value: "खेल", slug: "/news/sports/" },
        { value: `ओलिंपिक  ${olympics_year}`, slug: "/sports/olympics/" },
        { value: `वीडियो`, slug: "/sports/olympics/videos/" },
      ]
    : isAmp
    ? [
        { value: "हिंदी समाचार", slug: "/" },
        { value: "खेल", slug: "/news/sports/" },
        { value: `ओलिंपिक  ${olympics_year}`, slug: "/news/sports/olympics/" },
      ]
    : [
        { value: "हिंदी समाचार", slug: "/" },
        { value: "खेल", slug: "/news/sports/" },
        { value: `ओलिंपिक  ${olympics_year}`, slug: "/news/sports/olympics/" },
      ];

  pageSeo.jsonLdForOrganization = jsonLdForHomeOrganization() || "";
  pageSeo.jsonLdForHomeWebSite = jsonLdForHomeWebSite() || "";
  pageSeo.jsonLdForHomeSiteNavigation =
    jsonLdForHomeSiteNavigation(menuData, isMobile || isAmp) || "";
  pageSeo.canonical = isAmp
    ? currentUrl.replace("amp/", "") || currentUrl.replace("amp/", "")
    : currentUrl;
  pageSeo.page = "category";
  pageSeo.breadCrumbArray = breadCrumbArray;

  const pageAds = isMobile ? olympicsMobile() : olympicsDesktop();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "ParisOlympics",
    block_ads: "no",
  });
  const taboolaList = TaboolaList.homePage;
  if (!isAmp) {
    pageSeo.ampHtml = publicRuntimeConfig.siteUrl + "amp/sports/olympics/";
  }

  const pageData = {
    taboolaList,
    isMobile,
    menuData,
    pageAds,
    pageSeo,
    trendingTags: miscData.trendingTags || [],
    loadTv: true,
    topTrending,
    footerData,
    config: googleRemoteConfig,
    switchAds:
      googleRemoteConfig && googleRemoteConfig.length
        ? googleRemoteConfig?.find((i) => i.key == "NW18_HIND_HP_ATF_320") ||
          false
        : false,
    currentUrl,
    breadCrumbArray,
    topNewsStoryData,
    middleData,
    rightData,
    leftData,
    medalTally,
    photoGallery,
    latestNewsData,
    lomp_sdl_with_date,
    date,
    schedule_All,
    medalHopeData,
    performerOfTheDay,
    indiaNewsByTag,
    results,
    olympics_medals,
    latestStories,
    photoStories,
    isNews,
    isPhotos,
    isVideos,
    latestPhotoStories,
    topStoriesData,
    latestVideosStories,
    videos,
    _1xbetData,
    isAmp
  };

  // Pass data to the page via props
  return { props: { pageData } };
};
export default olympicsProps;
