import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { jsonLdForWebPage, jsonLdForCricketSiteNavigation } from "includes/schema.util";
import { cricketNews as newsAds } from "includes/Desktop/dfpAdIds";
import { cricketNews as newsMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, ignoreQueryParams } from "includes/article.util";
import { getCricketNewsDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getMenu, getGoogleConfig, getDistricts, getArticleList, getRedisDataByMultiKey,getRedisDataByKey } from "api_dns/global/Common";

const cnNewsProps = async (context) => {
    const isMobile = checkDevice(context);
    let protocol = "https://";
    let host = context.req.headers.host;
    if (host.indexOf("localhost") > -1) {
        protocol = "http://";
    }
    let currentUrl = ignoreQueryParams(context.req.url, false);
    const pageLimit = (isMobile) ? 16 : 20;

    const urlParam = context.query;

    let NewsUrl = ignoreQueryParams(currentUrl, false).split('page')[0];

    let pageNumber = parseInt(urlParam.page) || 1;
    let offset = (pageNumber) ? (pageNumber - 1) * pageLimit : 0;

    const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-cricket_trending_topic";
    let footerData = [], crMenu = [], get1xBet = [], trendingTags={};

    let [
        latestStories = {},
        menuData = {},
        googleRemoteConfig = {},
        // districtList = {},
        redisMultiResults = [],
        categorySponserData = {},
    ] = await Promise.allSettled([
        getArticleList({offset:offset, count: pageLimit, filter: { post_type:"text","subsection.id":"29" }, fields: 'display_headline,weburl_r,images,weburl,headline'}),        
        getMenu(isMobile),
        getGoogleConfig(),
        // getDistricts(),
        getRedisDataByMultiKey(multiRedisString),
        getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
    ]).then(temp => temp?.map(r=>r.value)).catch();

    const catSponData = Object.values(categorySponserData || {})?.find(
        (item) => item.campagin_name === "Lok Sabha Election 2024"
      );

    if (Object.keys(redisMultiResults)?.length > 0) { 
        let keys = Object.keys(redisMultiResults);   
        [footerData, crMenu, get1xBet,trendingTags] = keys.map(i => redisMultiResults[i]? redisMultiResults[i]: []);
    }

    // let _1xbet = get1xBet && Object.values(get1xBet)?.length && Object.values(get1xBet).filter(sponsors => sponsors?.Event_Page === '/cricket/')

    // let _1xbetData = _1xbet?.[0]?.sponserdata || []
    const _1xbetData = catSponData?.sponserdata || [];

    let { title, desc, keywords } = getCricketNewsDetails();
    const pageSeo = {
        title,
        keywords,
        description: desc,
        "canonical": publicRuntimeConfig.siteUrl + "cricket/news/",
        "og_image": "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
        isCricketNextHome: true,
    };
    pageSeo.jsonLdForWebPage = jsonLdForWebPage(
        "Cricket News in Hindi, Match Live Updates, Match Report, Scorecard",
        "Get Cricket News in Hindi, LIve Matchs Report, Breaking News, Ball by ball Match Updates, Upcoming Cricket Series News and More.",
        "Cricket News, Cricket Match Report, Live Score, Cricket Editorial, Cricket Breaking News",
        publicRuntimeConfig.siteUrl + 'cricket/news/',
        null,
        true,
        false,
        true
    ) || '';

    pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(arrayOnly(crMenu))

    const pageAds = isMobile ? newsMobileAds() : newsAds();

    pageAds.setTargetingValues = getSetTargettingValues({
        headline: pageSeo.title,
        description: pageSeo.description,
        seo_keywords: pageSeo.keywords,
        weburl: publicRuntimeConfig.siteUrl + 'cricket/news/',
        article_id: '',
        section: 'Cricket-NEWS',
        block_ads: 'no'
    });
    let taboolaList = TaboolaList.category
    let pageData = {
        latestStories,
        menuData,
        pageAds,
        pageSeo,
        // districtList,
        footerData,
        pageLimit,
        currentUrl,
        NewsUrl,
        pageNumber,
        categoryName: 'CRICKET NEWS IN HINDI',
        crMenu: arrayOnly(crMenu),
        _1xbetData,
        config: googleRemoteConfig,
        taboolaList,
        isMobile,
        trendingTags,
    }

    // Pass data to the page via props
    return { props: { pageData } };
}
export default cnNewsProps;