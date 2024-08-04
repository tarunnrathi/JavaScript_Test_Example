import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { cricketMatchSchedule as cricketMatchScheduleAds } from "includes/Desktop/dfpAdIds";
import { cricketMatchSchedule as cricketMatchScheduleMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, ignoreQueryParams } from "includes/article.util";
import { getCricketMatchScheduledDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getDistricts, getMenu, getRedisDataByMultiKey, getGoogleConfig, getCricketData, getRedisDataByKey } from "api_dns/global/Common";

const cnMatchScheduleProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  const currentUrl = ignoreQueryParams(protocol + host + context.req.url, false);

  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-cricket_trending_topic,";
  let footerData = [], crMenu = [], get1xBet = [] , trendingTags={};;

  let [
      matchScheduleDataByDay = [],
      menuData = {},
      googleRemoteConfig = {},
      // districtList = {},
      redisMultiResults = [],
      categorySponserData = {},
  ] = await Promise.allSettled([
      getCricketData('schedule/date'),
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

  // let _1xbetData = _1xbet?.[0]?.sponserdata || [];
  const _1xbetData = catSponData?.sponserdata || [];

  if (typeof matchScheduleDataByDay === "undefined") {
    matchScheduleDataByDay = [];
  }
  const pageContent = matchScheduleDataByDay || '';

  let { title, desc, keywords } = getCricketMatchScheduledDetails();

  const pageSeo = {
    title,
    keywords,
    description: desc,
    canonical: currentUrl,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    isCricketNextHome: true,
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      title,
      desc,
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

  const pageAds = isMobile
    ? cricketMatchScheduleMobileAds()
    : cricketMatchScheduleAds();

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "MATCHES-SCHEDULE",
    block_ads: "no",
  });
  let taboolaList = TaboolaList.category;
  let pageData = {
    pageContent,
    menuData,
    pageAds,
    pageSeo,
    // districtList,
    footerData,
    currentUrl,
    categoryName: "MATCHES SCHEDULE",
    crMenu: arrayOnly(crMenu),
    _1xbetData,
    config: googleRemoteConfig,
    taboolaList,
    isMobile,
    trendingTags
  };
  return { props: { pageData } };
};
export default cnMatchScheduleProps;
