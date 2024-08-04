import { jsonLdForWebPage, jsonLdForCricketSiteNavigation } from "includes/schema.util";
import { T20WcHomeAds as homeAds } from "includes/Desktop/dfpAdIds";
import { T20WcHome as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly } from "includes/article.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getRedisDataByMultiKey, getMenu, getRedisDataByKey, getArticleList, getGoogleConfig, getCricketData, getPriorityData, getCricketDataDirect, RhsphotoStories, RhstopStories } from "api_dns/global/Common";
import { t20_world_cup_series_id, t20_world_cup_year, } from "api/Constant";

const t20WCProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";

  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;

  let cricketWidgetData = await getRedisDataByKey('homepagecricket', false) || {};

  if (Object.keys(cricketWidgetData).length === 0) {
    cricketWidgetData = {
      complete_schedule_url: '',
      complete_result_url: '',
      headline: '',
      series_id: '',
      story_id: '',
      banner: {
        desktop_image_url: '',
        mobile_image_url: '',
        banner_url: '',
      },
    };
  }

  let {
    complete_schedule_url: cnWidgetCompleteScheduleUrl,
    complete_result_url: cnWidgetCompleteResultUrl,
    headline: cnWidgetHeadline,
    series_id: seriesIds,
    story_id: storyIds,
    banner: {
      desktop_image_url: cricketCreativeimageUrlDesktop,
      mobile_image_url: cricketCreativeimageUrlMobile,
      banner_url: cricketCreativeUrl,
    },
  } = cricketWidgetData;

  let cnWidgetImage = isMobile ? cricketCreativeimageUrlMobile : cricketCreativeimageUrlDesktop;

  seriesIds = seriesIds?.split(",");
  storyIds = storyIds?.split(",").map(id => Number(id));

  let storyData = await getArticleList({ filter: { post_type: 'text', story_id: storyIds }, fields: 'display_headline,weburl_r,images,intro' });

  let storiesListLeft = storyData?.slice(0, 2);
  let storiesListRight = storyData?.slice(2, 6);

  let enableCricketCreative = false;
  if (cricketCreativeimageUrlDesktop && cricketCreativeUrl) enableCricketCreative = true;

  let homeSeriesData = {
    storiesListLeft,
    storiesListRight,
    cnWidgetCompleteScheduleUrl,
    cnWidgetCompleteResultUrl,
    enableCricketCreative,
    cricketCreativeUrl,
    cnWidgetImage,
    cnWidgetHeadline,
    series_id: seriesIds
  }

  const seriesId = homeSeriesData?.series_id?.[0] || '';
  const scheduleString = seriesId ? `schedule/series/${seriesId}` : 'schedule/date';
  const schedule_key = `schedule_series_${seriesId ? seriesId : "schedule_date"}`;
  const resultString = seriesId ? `series-result/${seriesId}` : 'match-results';
  const result_key = `schedule_series_${seriesId ? seriesId : "match-results"}`;

  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-CRICKETNEXT_topgalleries_priority,KHABARN18-CRICKETNEXT_hometop_priority,KHABARN18-nw_T20worldcup_l2_menu";

  let footerData = [], crMenu = [], get1xBet = [], gallerySection = [], topStories = [], l2_menu = [];

  let [
    latestStories = [],
    menuData = {},
    googleRemoteConfig,
    matchSchedule = [],
    matchResult = [],
    redisMultiResults = [],
    topNewsStoryData = [],
    pointsTableData = [],
    mostRunsData = [],
    mostWickets = [],
    photoGallery = [],
    statsData = [],
    latestNewsData = [],
    photoStories = [],
    topStoriesData = [],
    categorySponserData = {},
  ] = await Promise.allSettled([
    getArticleList({ count: 20, filter: { post_type: "text", "subsection.id": "29" }, fields: 'display_headline,weburl_r,images,weburl' }),
    getMenu(isMobile),
    getGoogleConfig(),
    getCricketData(scheduleString, schedule_key, 28800),
    getCricketData(resultString, result_key),
    getRedisDataByMultiKey(multiRedisString),
    getPriorityData({ section: "icct20", subSection: "NA", fields: 'display_headline,weburl_r,images,intro', filter: { 'tags.slug': `icc-t20-world-cup` }, fallback: true, count: 6 }),
    getCricketData(`standing/${t20_world_cup_series_id}`, `standing_${t20_world_cup_series_id}`,28800),
    getCricketDataDirect(`stat/2/${t20_world_cup_series_id}`, `stat_2_${t20_world_cup_series_id}`),
    getCricketDataDirect(`stat/13/${t20_world_cup_series_id}`, `stat_13_${t20_world_cup_series_id}`),
    getArticleList({ count: 5, offset: 0, filter: { post_type: "photogallery", 'tags.slug': `icc-t20-world-cup` }, fields: 'id,display_headline,weburl_r,images,headline,intro,created_at,gallery_count' }),
    getCricketData(`tournament/${t20_world_cup_series_id}`, `tournament_${t20_world_cup_series_id}`),
    getArticleList({ count: 15, filter: { post_type: "text", 'tags.slug': `icc-t20-world-cup` }, fields: 'id,display_headline,weburl_r,images,headline,intro' }),
    !isMobile ? RhsphotoStories(false, "icc-t20-world-cup") : [],
    !isMobile
      ? RhstopStories({
        count: 4,
        section: "icct20",
        subSection: "NA",
        filter: { post_type: "text", 'tags.slug': `icc-t20-world-cup` },
        fields: "story_id,headline,weburl,images,display_headline",
      })
      : [],
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]).then(temp => temp?.map(r => r.value)).catch();

  if (Object.keys(redisMultiResults)?.length > 0) {
    let keys = Object.keys(redisMultiResults);
    [footerData, crMenu, get1xBet, gallerySection, topStories, l2_menu] = keys.map(i => redisMultiResults[i] ? redisMultiResults[i] : []);
  }

  // let _1xbet = get1xBet && Object.values(get1xBet)?.length && Object.values(get1xBet).filter(sponsors => sponsors?.Event_Page === '/cricket/series/asia-cup')
  // let _1xbetData = _1xbet?.[0]?.sponserdata;
  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "T20 World CUP"
  );
  const _1xbetData = catSponData?.sponserdata || [];
  const pageSeo = {
    title: `ICC T20 world Cup ${t20_world_cup_year} Points Table, Team Standings, Know Cricket World Cup T20 Team Net Run Rate in Hindi`,
    keywords: `ICC T20 World Cup ${t20_world_cup_year} Points Table, ICC T20 Points Table, Points Table ICC T20 World Cup ${t20_world_cup_year}, ICC T20 World Cup ${t20_world_cup_year} Net Run Rate, आईसीसी T20 वर्ल्ड कप ${t20_world_cup_year} प्वाइंट टेबल`,
    description: `Get ICC Cricket World Cup ${t20_world_cup_year} point table, team standings, net run rate, and other updates for ICC T20 World Cup ${t20_world_cup_year}. Find the latest cricket news, scores, and other information on News18 Hindi`,
    "canonical": currentUrl,
    "og_image": "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    isCricketNextHome: true,
    // ampHtml: publicRuntimeConfig.siteUrl + "amp/cricket/",
    page: "category",
  };
  pageSeo.jsonLdForWebPage = jsonLdForWebPage(
    "Cricket News, Live Scores, Series, Match Schedule, Teams",
    "Get cricket news, live coverage of cricket score, series, cricket match schedule, photos, videos on News18 हिंदी.",
    "Cricket Scores, Cricket Schedule, Cricket Series, Cricket News",
    `${host}/cricket/icc-t20-world-cup/`,
    null,
    true,
    false,
    true
  ) || '';

  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(arrayOnly(crMenu))

  const pageAds = isMobile ? homeMobileAds() : homeAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: '',
    section: 't20WorldCup2024',
    block_ads: 'no'
  });

  if (matchSchedule[0]) homeSeriesData.matchDate = matchSchedule[0]?.name;

  matchSchedule = matchSchedule?.match || matchSchedule[0]?.match || [];
  matchSchedule = matchSchedule?.length > 0 ? matchSchedule?.slice(0, 3) : [];

  matchResult = matchResult[0]?.match || [];
  matchResult = matchResult?.length > 0 ? matchResult?.slice(0, 3) : [];
  const taboolaList = TaboolaList.category;
  let pageData = {
    l2_menu,
    gallerySection,
    latestStories,
    menuData,
    pageAds,
    pageSeo,
    footerData,
    crMenu: arrayOnly(crMenu),
    _1xbetData,
    config: googleRemoteConfig,
    matchSchedule,
    matchResult,
    taboolaList,
    isMobile,
    topNewsStoryData: topNewsStoryData?.slice(0, 6) || [],
    pointsTableData,
    mostRunsData,
    mostWickets,
    photoGallery,
    statsData,
    latestNewsData,
    photoStories,
    topStoriesData
  }

  // Pass data to the page via props
  return { props: { pageData } };
}
export default t20WCProps;