import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { T20WcResultAds as homeAds } from "includes/Desktop/dfpAdIds";
import { T20WcResults as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, getSponserData } from "includes/article.util";
import { getWcResultDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getRedisDataByMultiKey, getMenu } from "api_dns/global/Common";
import { getResultData } from "api_dns/individual/worldCup";
import { breadCrumbSchema } from "api/Constant";

const resultsProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;

  const multiRedisString =
    "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi";

  let footerData = [],
    crMenu = [],
    get1xBet = [];

  let [menuData = {}, redisMultiResults = [], worldCupResults = []] =
    await Promise.allSettled([
      getMenu(isMobile),
      getRedisDataByMultiKey(multiRedisString),
      getResultData(),
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

  let breadCrumbArray = breadCrumbSchema(currentUrl, 'विश्व कप 2023 परिणाम')

  let { title, desc, keywords } = getWcResultDetails();
  const pageSeo = {
    title,
    keywords,
    description: desc,
    canonical: publicRuntimeConfig.siteUrl + "world-cup/results/",
    og_image:
      "https://hindi.news18.com/images/siteimages/News18_Hindi_logo_1631086645.svg?impolicy=website&width=130&height=68",
    isCricketNextHome: true,
    page: "result",
    breadCrumbArray,
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      "ICC Cricket World Cup 2023 Results Live Score: Instant Access to Latest Match Results and Outcomes Cricket World Cup Cricket Match on News18 Hindi",
      "ICC Cricket World Cup 2023 Result: Stay updated with real-time Cricket World Cup 2023 match results and outcomes. From thrilling victories to surprising upsets, get the latest scoop on team performances and player achievements",
      "Cricket World Cup 2023, World Cup 2023 Result, Men’s World Cup 2023 Score, ICC World Cup Results, Cricket World Cup Match Results, World Cup Matches Score, World Cup Cricket Matches Results, World Cup Latest News, World Cup Photos, World Cup Highlights, World Cup News Today",
      publicRuntimeConfig.siteUrl + "/world-cup/results/",
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
    pageAds,
    pageSeo,
    footerData,
    crMenu: arrayOnly(crMenu),
    _1xbetData,
    taboolaList,
    isMobile,
    worldCupResults,
  };

  // Pass data to the page via props
  return { props: { pageData } };
};
export default resultsProps;
