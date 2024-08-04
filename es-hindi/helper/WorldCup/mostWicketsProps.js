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
import { getWcMostWicketDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import { getRedisDataByMultiKey, getMenu } from "api_dns/global/Common";
import { getMostWicketData } from "api_dns/individual/worldCup";
import { breadCrumbSchema } from "api/Constant";

const mostWicketsProps = async (context) => {
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
  let [menuData = {}, redisMultiResults = [], mostWicketdata = {}] =
    await Promise.allSettled([
      getMenu(isMobile),
      getRedisDataByMultiKey(multiRedisString),
      getMostWicketData(),
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

  let { title, desc, keywords } = getWcMostWicketDetails();

  let breadCrumbArray = breadCrumbSchema(currentUrl, 'विश्व कप 2023 - सर्वाधिक विकेट');

  const pageSeo = {
    title,
    keywords,
    description: desc,
    canonical: publicRuntimeConfig.siteUrl + "world-cup/most-wickets/",
    og_image:
      "https://hindi.news18.com/images/siteimages/News18_Hindi_logo_1631086645.svg?impolicy=website&width=130&height=68",
    isCricketNextHome: true,
    page: "Most-wickets",
    breadCrumbArray,
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      "ICC World Cup Cricket 2023 Wicket Tacker List: आईसीसी World Cup में सर्वाधिक विकेट लेने वाले सभी खिलाड़ियों की पूरी लिस्ट",
      "Most Wicket by players in ICC World Cup 2023 (सर्वाधिक विकेट लेने वाले खिलाड़ियों की लिस्ट): Get the Complete List of Players who have taken highest wickets in World Cup 2023",
      "World cup most wicket, leading wicket taker in world cup, most wicket by player, most wicket in world cup, most wicket in ODI wc",
      publicRuntimeConfig.siteUrl + "/world-cup/most-wickets/",
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
    mostWicketdata,
    menuData,
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
export default mostWicketsProps;
