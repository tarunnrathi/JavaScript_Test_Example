import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { jsonLdForWebPage, jsonLdForCricketSiteNavigation } from "includes/schema.util";
import { cricketHome as homeAds } from "includes/Desktop/dfpAdIds";
import { cricketHome as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly } from "includes/article.util";
import { getCricketHomeDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getRedisDataByMultiKey, getDistricts, getMenu, getRedisDataByKey, getArticleList, getGoogleConfig, getCricketData } from "api_dns/global/Common";

const cnHomeProps = async (context, isAmp = false) => {
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
      banner: {
        desktop_image_url: cricketCreativeimageUrlDesktop,
        mobile_image_url: cricketCreativeimageUrlMobile,
        banner_url: cricketCreativeUrl,
      },
    } = cricketWidgetData;    

    let cnWidgetImage = isMobile ? cricketCreativeimageUrlMobile : cricketCreativeimageUrlDesktop;

    seriesIds = seriesIds?.split(",");

    let seriesNameSlug = cricketCreativeUrl.split("/").pop().replace(/\.html$/, "") || "sports";

    let storyData = await getArticleList({filter: { post_type:'text',"tags.slug": seriesNameSlug}, fields: 'display_headline,weburl_r,images,intro,headline'});

    let storiesListLeft = storyData?.slice(0, 2);
    let storiesListRight = storyData?.slice(2, 6);

    let enableCricketCreative = false;
    if(cricketCreativeimageUrlDesktop && cricketCreativeUrl) enableCricketCreative = true;

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

      const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-CRICKETNEXT_topgalleries_priority,KHABARN18-CRICKETNEXT_hometop_priority,KHABARN18-cricket_trending_topic";

      let footerData = [], crMenu = [], get1xBet = [], gallerySection = [], topStories = [], trendingTags={};

    let [
        offTheFieldData = [],
        featuresData = [],
        archivesData = [],
        latestStories = [],
        menuData = {},
        googleRemoteConfig,
        districtList = {},
        matchSchedule = [],
        matchResult = [],
        redisMultiResults = [],
        categorySponserData = {},
    ] = await Promise.allSettled([
        getArticleList({count: 3, filter: { 'tags.slug':'off-the-field' }, fields: 'display_headline,weburl_r,images'}),
        getArticleList({count: 3, filter: { 'tags.slug':'number-game' }, fields: 'display_headline,weburl_r,images'}),
        getArticleList({count: 3, filter: { 'tags.slug':'on-this-day' }, fields: 'display_headline,weburl_r,images'}),
        getArticleList({count: 20, filter: { post_type:"text","subsection.id":"29" }, fields: 'display_headline,weburl_r,images,weburl'}),        
        getMenu(isMobile, isAmp),
        getGoogleConfig(),
        isAmp && getDistricts(),
        getCricketData(scheduleString),
        getCricketData(resultString),
        getRedisDataByMultiKey(multiRedisString),
        getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
    ]).then(temp => temp?.map(r=>r.value)).catch();

    const catSponData = Object.values(categorySponserData || {})?.find(
      (item) => item.campagin_name === "Lok Sabha Election 2024"
    );
     

    if (Object.keys(redisMultiResults)?.length > 0) { 
      let keys = Object.keys(redisMultiResults);   
      [footerData, crMenu, get1xBet, gallerySection, topStories, trendingTags] = keys.map(i => redisMultiResults[i]? redisMultiResults[i]: []);
    }

    //let _1xbet = get1xBet && Object.values(get1xBet)?.length && Object.values(get1xBet).filter(sponsors => sponsors?.Event_Page === '/cricket/')

    //let _1xbetData = _1xbet?.[0]?.sponserdata || []
    const _1xbetData = catSponData?.sponserdata || [];

    let { title, desc, keywords } = getCricketHomeDetails();
    const pageSeo = {
        title,
        keywords,
        description: desc,
        "canonical": isAmp ? publicRuntimeConfig.siteUrl + "amp/cricket/" : publicRuntimeConfig.siteUrl + "cricket/",
        "og_image": "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
        isCricketNextHome: true,
        ampHtml: publicRuntimeConfig.siteUrl + "amp/cricket/",
        page: "Home",
    };
    pageSeo.jsonLdForWebPage = jsonLdForWebPage(
        "Cricket News, Live Scores, Series, Match Schedule, Teams",
        "Get cricket news, live coverage of cricket score, series, cricket match schedule, photos, videos on News18 हिंदी.",
        "Cricket Scores, Cricket Schedule, Cricket Series, Cricket News",
        publicRuntimeConfig.siteUrl + '/cricket/',
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
        section: 'Cricket',
        block_ads: 'no'
    });

    if(matchSchedule[0]) homeSeriesData.matchDate = matchSchedule[0]?.name;

    matchSchedule = matchSchedule?.match || matchSchedule[0]?.match || [];
    matchSchedule = matchSchedule?.length > 0 ? matchSchedule?.slice(0, 3) : [];

    matchResult = matchResult[0]?.match || [];
    matchResult = matchResult?.length > 0 ? matchResult?.slice(0, 3) : [];
    let taboolaList = TaboolaList.category;
    let pageData = {
        currentUrl,
        topStories,
        homeSeriesData,
        offTheFieldData,
        featuresData,
        archivesData,
        gallerySection,
        latestStories,
        menuData,
        pageAds,
        pageSeo,
        footerData,
        crMenu: arrayOnly(crMenu),
        districtList,
        _1xbetData,
        config: googleRemoteConfig,
        matchSchedule,
        matchResult,
        taboolaList,
        isMobile,
        trendingTags,
    }

    // Pass data to the page via props
    return { props: { pageData } };
}
export default cnHomeProps;