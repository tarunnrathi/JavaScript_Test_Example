import getConfig from "next/config";
import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { T20WcMostWicketsAndRuns as homeAds } from "includes/Desktop/dfpAdIds";
import { cricketPlayerProfile as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, getSponserData } from "includes/article.util";
import { getWcPointsTableDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getRedisDataByMultiKey, getMenu } from "api_dns/global/Common";
import { getPointTableData } from "api_dns/individual/worldCup";
import { breadCrumbSchema } from "api/Constant";

const { publicRuntimeConfig } = getConfig();
const pointTableProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;

  const multiRedisString =
    "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi";

  let footerData = [],
    crMenu = [],
    get1xBet = [];

  const [menuData = {}, redisMultiResults = [], pointTableData = []] =
    await Promise.allSettled([
      getMenu(isMobile),
      getRedisDataByMultiKey(multiRedisString),
      getPointTableData(),
    ])
      .then((temp) => temp?.map((r) => r.value))
      .catch();

  if (Object.keys(redisMultiResults)?.length > 0) {
    const keys = Object.keys(redisMultiResults);
    [footerData, crMenu, get1xBet] = keys.map((i) =>
      redisMultiResults[i] ? redisMultiResults[i] : [],
    );
  }

  let _1xbetData = getSponserData('/world-cup/', get1xBet);

  const { title, desc, keywords } = getWcPointsTableDetails();

  let breadCrumbArray = breadCrumbSchema(currentUrl, 'विश्व कप 2023 पॉइंट टेबल');

  const pageSeo = {
    title,
    keywords,
    description: desc,
    canonical: publicRuntimeConfig.siteUrl + "world-cup/points-table/",
    og_image:
      "https://hindi.news18.com/images/siteimages/News18_Hindi_logo_1631086645.svg?impolicy=website&width=130&height=68",
    isCricketNextHome: true,
    page: "point-table",
    breadCrumbArray,
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      "ICC Cricket World Cup 2023 Points Table: Tracking Team Standings and Progress",
      "ICC Cricket World Cup 2023 Points Table: Keep an eye on Cricket World Cup 2023 points table Follow the evolving rankings, team performances, and match outcomes as the battle for supremacy unfolds",
      "Cricket World Cup 2023, World Cup 2023 Points Table, Men’s World Cup 2023 Points Table, ICC World Cup Standings, Cricket World Cup Match Progress, World Cup Matches Standings, World Cup Cricket Point Tables, World Cup Latest News, World Cup Photos, World Cup Highlights, World Cup News Today",
      publicRuntimeConfig.siteUrl + "/world-cup/points-table/",
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

  const taboolaList = TaboolaList.category;
  const pageData = {
    menuData,
    pointTableData,
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
export default pointTableProps;
