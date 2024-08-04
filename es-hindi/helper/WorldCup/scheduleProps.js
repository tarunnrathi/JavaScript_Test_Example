import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { T20WcAds as homeAds } from "includes/Desktop/dfpAdIds";
import { T20WcSchedule as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, getSponserData } from "includes/article.util";
import { getWcScheduleDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getRedisDataByMultiKey, getMenu } from "api_dns/global/Common";
import { getScheduleData } from "api_dns/individual/worldCup";
import { breadCrumbSchema } from "api/Constant";

const scheduleProps = async (context) => {
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

  let [menuData = {}, redisMultiResults = [], pageContent = []] =
    await Promise.allSettled([
      getMenu(isMobile),
      getRedisDataByMultiKey(multiRedisString),
      getScheduleData(),
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

  let { title, desc, keywords } = getWcScheduleDetails();

  let breadCrumbArray = breadCrumbSchema(currentUrl, 'विश्व कप 2023 शेड्यूल')

  const pageSeo = {
    title,
    keywords,
    description: desc,
    canonical: publicRuntimeConfig.siteUrl + "world-cup/schedule/",
    og_image:
      "https://hindi.news18.com/images/siteimages/News18_Hindi_logo_1631086645.svg?impolicy=website&width=130&height=68",
    isCricketNextHome: true,
    page: "schedule",
    breadCrumbArray
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      "ICC Cricket World Cup 2023 Schedule: Your Ultimate Guide to Cricket World Cup Fixtures, Match Date and venue on News18 Hindi",
      "ICC Cricket World Cup 2023: Plan your cricket journey with the comprehensive ICC World Cup 2023 schedule. Stay informed about World Cup Matches Dates, Cricket World Cup Venues, and matchups to witness the excitement of this global sporting spectacle",
      "Cricket World Cup 2023, World Cup 2023, Men’s World Cup 2023 Schedule, ICC World Cup Fixtures, Cricket World Cup Match Time Table, World Cup Matches Dates, World Cup Match Details, World Cup Latest News, World Cup Photos, World Cup Highlights, World Cup News Today",
      publicRuntimeConfig.siteUrl + "/world-cup/schedule/",
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
    pageContent,
  };

  // Pass data to the page via props
  return { props: { pageData } };
};
export default scheduleProps;
