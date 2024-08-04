import { jsonLdForWebPage, jsonLdForCricketSiteNavigation } from "includes/schema.util";
import { T20WcNewsAds as homeAds } from "includes/Desktop/dfpAdIds";
import { T20WcNews as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly } from "includes/article.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getRedisDataByMultiKey, getMenu, getRedisDataByKey, getArticleList, getGoogleConfig, getCricketData,RhsphotoStories ,getCricketDataDirect} from "api_dns/global/Common";
import { t20_world_cup_year ,t20_world_cup_series_id} from "api/Constant";

const newsProps = async (context) => {
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
  const resultString = seriesId ? `series-result/${seriesId}` : 'match-results';
  const schedule_key = `schedule_series_${seriesId ? seriesId : "schedule_date"}`;
  const result_key = `schedule_series_${seriesId ? seriesId : "match-results"}`;

  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-CRICKETNEXT_topgalleries_priority,KHABARN18-CRICKETNEXT_hometop_priority";

  let footerData = [], crMenu = [], get1xBet = [], gallerySection = [], topStories = [];

  let [
    latestStories = [],
    menuData = {},
    googleRemoteConfig,
    // districtList = {},
    matchSchedule = [],
    matchResult = [],
    redisMultiResults = [],
    photoStories = [],
    mostRunsData = [],
    mostWickets = [],
    categorySponserData = {},
  ] = await Promise.allSettled([
    getArticleList({ count: 20, filter: { post_type: "text", 'tags.slug':`icc-t20-world-cup` }, fields: 'display_headline,weburl_r,images,weburl' }),
    getMenu(isMobile),
    getGoogleConfig(),
    // getDistricts(),
    getCricketData(scheduleString, schedule_key),
    getCricketData(resultString, result_key),
    getRedisDataByMultiKey(multiRedisString),
    !isMobile ? RhsphotoStories(false,"icc-t20-world-cup"):[],
    getCricketDataDirect(`stat/2/${t20_world_cup_series_id}`, `stat_2_${t20_world_cup_series_id}`),
    getCricketDataDirect(`stat/13/${t20_world_cup_series_id}`, `stat_13_${t20_world_cup_series_id}`),
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]).then(temp => temp?.map(r => r.value)).catch();

  if (Object.keys(redisMultiResults)?.length > 0) {
    let keys = Object.keys(redisMultiResults);
    [footerData, crMenu, get1xBet, gallerySection, topStories] = keys.map(i => redisMultiResults[i] ? redisMultiResults[i] : []);
  }

  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "T20 World CUP"
  );
  const _1xbetData = catSponData?.sponserdata || [];
  const pageSeo = {
    title: `ICC T20 World Cup ${t20_world_cup_year} News (T20 वर्ल्ड कप न्यूज़) - Latest Cricket T20 World Cup News Today in Hindi`,
    keywords:`ICC Men's T20 World Cup ${t20_world_cup_year} News, T20 World Cup ${t20_world_cup_year} News, ICC T20 World Cup ${t20_world_cup_year} News, T20 World Cup ${t20_world_cup_year} Latest News, T20 World Cup Breaking News`,
    description: `ICC T20 World Cup ${t20_world_cup_year} News: Get ICC Mens T20 World Cup (आईसीसी मेन्स टी20 विश्व कप) latest update, breaking news about Cricket Match for T20 World Cup ${t20_world_cup_year}.`,
    "canonical": currentUrl,
    "og_image": "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    isCricketNextHome: true,
    //ampHtml: publicRuntimeConfig.siteUrl + "amp/cricket/",
    page: "category",
  };
  pageSeo.jsonLdForWebPage = jsonLdForWebPage(
    "Cricket News, Live Scores, Series, Match Schedule, Teams",
    "Get cricket news, live coverage of cricket score, series, cricket match schedule, photos, videos on News18 हिंदी.",
    "Cricket Scores, Cricket Schedule, Cricket Series, Cricket News",
    `${host}/cricket/icc-t20-world-cup/news/`,
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
  let taboolaList = TaboolaList.category;
  let pageData = {
    topStories,
    homeSeriesData,
    gallerySection,
    latestStories,
    menuData,
    pageAds,
    pageSeo,
    footerData,
    crMenu: arrayOnly(crMenu),
    // districtList,
    _1xbetData,
    config: googleRemoteConfig,
    matchSchedule,
    matchResult,
    taboolaList,
    isMobile,
    photoStories,
    mostRunsData,
    mostWickets
  }

  // Pass data to the page via props
  return { props: { pageData } };
}
export default newsProps;