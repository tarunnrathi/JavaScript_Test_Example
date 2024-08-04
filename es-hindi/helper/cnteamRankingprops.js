import { arrayOnly } from "includes/article.util";
import { jsonLdForCricketSiteNavigation, jsonLdForWebPage } from "includes/schema.util";
import {checkDevice, getSetTargettingValues} from "includes/helper";
import { cricketRankings as cricketRankingsAds } from "includes/Desktop/dfpAdIds";
import { cricketRankings as cricketRankingsMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { TaboolaList } from "includes/Tabola.helper";
import { getDistricts, getMenu, getRedisDataByMultiKey, getGoogleConfig, getCricketData,getRedisDataByKey } from "api_dns/global/Common";

const teamRankingprops = async (context) => {

  const isMobile = checkDevice(context);
  let ranktype = context.query.ranktype ? context.query.ranktype : "";
  let ranktype_value = ranktype.toLowerCase();
  if(!(ranktype_value === 'test' || ranktype_value === 'odi' || ranktype_value === 't20')) ranktype_value = 'test'
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  const currentUrl =
    protocol + host + encodeURI(context.req && context.req.url);
  let seoDetails = {};

  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-cricket_trending_topic";
  let footerData = [], crMenu = [], get1xBet = [], trendingTags={};

  let [
      teamRankingResult = [],
      menuData = {},
      googleRemoteConfig = {},
      // districtList = {},
      redisMultiResults = [],
      categorySponserData = {},
  ] = await Promise.allSettled([
      getCricketData(`team-ranking/${ranktype_value}`),
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

  // let _1xbet =
  //   get1xBet &&
  //   Object.values(get1xBet)?.length &&
  //   Object.values(get1xBet).filter(
  //     (sponsors) => sponsors?.Event_Page === "/cricket/"
  //   );

  //let _1xbetData = _1xbet?.[0]?.sponserdata || [];
  const _1xbetData = catSponData?.sponserdata || [];

    // pageSeo
    
    let title= '';
    let description='';
    let keywords='';
  

if(ranktype_value=='t20'){
    title="ICC T20I Ranking: ICC Ranking for Twenty20 International Cricket Teams | ICC T20I Ranking - News18";
    description='ICC T20I Ranking - Get full list of ICC Ranking for Twenty20 International Cricket Teams including latest cricket news, photos, videos and more only at News18.com.';
    keywords='ICC T20I Ranking, ICC Teams Ranking, ICC Ranking in Twenty20 International Cricket Teams, ICC Ranking in T20I, Top Cricket Teams';
}else if(ranktype_value=='odi'){
    title="ICC ODI Ranking: ICC Ranking for One Day International Cricket Teams | ICC ODI Ranking - News18";
    description='ICC ODI Ranking - Get full list of ICC Ranking for One Day International Cricket Teams including latest cricket news, photos, videos and more only at News18.com.';
    keywords='ICC ODI Ranking, ICC Teams Ranking, ICC Ranking in One Day International Cricket Teams, ICC Ranking in ODI, Top Cricket Teams';
}else if(ranktype_value=='test'){
    title="ICC Test Ranking: ICC Ranking for Test Cricket Teams | ICC Test Ranking - News18";
    description='ICC Test Ranking - Get full list of ICC Ranking for Test Cricket Teams including latest cricket news, photos, videos and more only at News18.com.';
    keywords='ICC Test Ranking, ICC Teams Ranking, ICC Ranking in Test Cricket Teams, ICC Ranking in Test, Top Cricket Teams';
}


const pageSeo = {
    title,
    keywords,
    description,
    canonical: currentUrl,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    isCricket: true,
    ampHtml: `${currentUrl.replace('/cricket/', '/cricket/amp/')}`  
  };

  pageSeo.jsonLdForWebPage =
  jsonLdForWebPage(
    title,
    description,
    keywords,
    currentUrl,
    null,
    true,
    false,
    true
  ) || "";

  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(
    arrayOnly(crMenu)
  );

  let pageAds={};
  pageAds = isMobile ? cricketRankingsMobileAds() : cricketRankingsAds();

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: `${ranktype_value} TEAM RANKINGS`,
    block_ads: "no",
  });
  pageSeo.breadCrumbArray = [
   { value: "हिंदी समाचार", slug: "" },
   { value: "Cricket", slug: "cricket" },
   { value: "ranking", slug: `${ranktype_value}-ranking.html` }
  ];
  let taboolaList = TaboolaList.category

  let pageData = {
    menuData,
    crMenu: arrayOnly(crMenu),
    _1xbetData,
    teamRankingResult,
    seoDetails,
    pageAds,
    currentUrl,
    ranktype_value,
    categoryName: `${ranktype_value} TEAM RANKING`,
    pageSeo,
    footerData,
    config: googleRemoteConfig,
    taboolaList,
    isMobile,
    // districtList,
    trendingTags,
  };

  return {
    props: { pageData },
  };
};

export default teamRankingprops;
