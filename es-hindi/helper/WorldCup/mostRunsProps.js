import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { T20WcMostWicketsAndRuns as homeAds } from "includes/Desktop/dfpAdIds";
import { cricketPlayerProfile as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, getSponserData } from "includes/article.util";
import { getWcMostRunsDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getRedisDataByMultiKey, getMenu } from "api_dns/global/Common";
import { getMostRunData } from "api_dns/individual/worldCup";
import { breadCrumbSchema } from "api/Constant";

const mostRunsProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  const { host = "" } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;

  const multiRedisString =
    "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi";

  let footerData = [],
    crMenu = [],
    get1xBet = [];

  let [menuData = {}, redisMultiResults = [], mostRunData = []] =
    await Promise.allSettled([
      getMenu(isMobile),
      getRedisDataByMultiKey(multiRedisString),
      getMostRunData(),
    ])
      .then((temp) => temp?.map((r) => r.value))
      .catch();

  if (Object.keys(redisMultiResults)?.length > 0) {
    let keys = Object.keys(redisMultiResults);
    [footerData, crMenu, get1xBet] = keys.map((i) =>
      redisMultiResults[i] ? redisMultiResults[i] : [],
    );
  }

  let _1xbetData = getSponserData('/world-cup/', get1xBet);

  let { title, desc, keywords } = getWcMostRunsDetails();

  let breadCrumbArray = breadCrumbSchema(currentUrl, 'विश्व कप 2023 - सर्वाधिक रन');

  const pageSeo = {
    title,
    keywords,
    description: desc,
    canonical: publicRuntimeConfig.siteUrl + "world-cup/most-runs/",
    og_image:
      "https://hindi.news18.com/images/siteimages/News18_Hindi_logo_1631086645.svg?impolicy=website&width=130&height=68",
    isCricketNextHome: true,
    page: "Most-Runs",
    breadCrumbArray
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      "ICC World Cup 2023 Highest Scorer: Get Complete List of Players by Most 100s, Most 50s",
      "Highest Runs by players in ICC World Cup 2023 (सर्वाधिक रन बनाने वाले खिलाड़ियों की लिस्ट): Get the Complete List of Players who have score highest runs in World Cup 2023.",
      "wc most run, world cup most runs, leading run getter in world cup, most run by player most run in world cup, most runs in wc",
      publicRuntimeConfig.siteUrl + "/world-cup/most-runs/",
      null,
      true,
      false,
      true,
    ) || "";

  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(
    arrayOnly(crMenu),
  );

  const pageAds = isMobile ? homeMobileAds() : homeAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "Cricket",
    block_ads: "no",
  });

  let taboolaList = TaboolaList.category;
  let pageData = {
    menuData,
    mostRunData,
    pageAds,
    pageSeo,
    footerData,
    crMenu: arrayOnly(crMenu),
    _1xbetData,
    taboolaList,
    isMobile,
  };

  // Pass data to the page via props
  return { props: { pageData } };
};
export default mostRunsProps;
