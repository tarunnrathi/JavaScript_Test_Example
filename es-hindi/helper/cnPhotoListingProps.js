import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { jsonLdForWebPage, jsonLdForCricketSiteNavigation } from "includes/schema.util";
import { cricketPhotos as photoAds } from "includes/Desktop/dfpAdIds";
import { cricketPhotos as photoMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, ignoreQueryParams } from "includes/article.util";
import { getCricketPhotosDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getMenu, getRedisDataByMultiKey, getGoogleConfig, getDistricts, getArticleList,getRedisDataByKey } from "api_dns/global/Common";

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

    let PhotoUrl = ignoreQueryParams(currentUrl, false).split('page')[0];

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
        getArticleList({offset:offset, count: pageLimit, filter: { post_type:"photogallery","subsection.id":"29" }, fields: 'gallery_count,display_headline,weburl_r,images,weburl,headline'}),        
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
        [footerData, crMenu, get1xBet, trendingTags] = keys.map(i => redisMultiResults[i]? redisMultiResults[i]: []);
    }

    // let _1xbet = get1xBet && Object.values(get1xBet)?.length && Object.values(get1xBet).filter(sponsors => sponsors?.Event_Page === '/cricket/')

    // let _1xbetData = _1xbet?.[0]?.sponserdata || [];

    const _1xbetData = catSponData?.sponserdata || [];

    let { title, desc, keywords } = getCricketPhotosDetails();
    const pageSeo = {
        title,
        keywords,
        description: desc,
        "canonical": publicRuntimeConfig.siteUrl + 'cricket/photos/',
        "og_image": "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
        isCricketNextHome: true,
    };
    pageSeo.jsonLdForWebPage = jsonLdForWebPage(
        "Cricket Photogallery: Matches Photos, Cricket Photographs, Cricket News Images",
        "Get latest photos, pictures, Pics, Images of Cricket Matches, players, actions, galleries of latest cricket news and live events.",
        "Cricket Matches Photos, Photos, Pictures, Galleries, photos, Cricket News",
        publicRuntimeConfig.siteUrl + 'cricket/photos/',
        null,
        true,
        false,
        true
    ) || '';

    pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(arrayOnly(crMenu))

    const pageAds = isMobile ? photoMobileAds() : photoAds();

    pageAds.setTargetingValues = getSetTargettingValues({
        headline: pageSeo.title,
        description: pageSeo.description,
        seo_keywords: pageSeo.keywords,
        weburl: publicRuntimeConfig.siteUrl + 'cricket/photos/',
        article_id: '',
        section: 'Cricket-PHOTOS',
        block_ads: 'no'
    });
    let taboolaList = TaboolaList.category;
    let pageData = {
        latestStories,
        menuData,
        pageAds,
        pageSeo,
        footerData,
        pageLimit,
        // districtList,
        currentUrl,
        PhotoUrl,
        pageNumber,
        categoryName: 'CRICKET PHOTO GALLERY',
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