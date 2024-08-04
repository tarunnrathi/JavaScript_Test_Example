import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { T20WcNewsAds as homeAds } from "includes/Desktop/dfpAdIds";
import { T20WcNews as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, getSponserData } from "includes/article.util";
import { getWcNews } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import {
  getRedisDataByMultiKey,
  getMenu,
  getArticleList,
} from "api_dns/global/Common";
import { breadCrumbSchema } from "api/Constant";

const newsProps = async (context) => {
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
  let [latestStories = [], menuData = {}, redisMultiResults = []] =
    await Promise.allSettled([
      getArticleList({
        count: 20,
        filter: { post_type: "text", "tags.slug": "world-cup-2023" },
        fields: "display_headline,weburl_r,images",
      }),
      getMenu(isMobile),
      getRedisDataByMultiKey(multiRedisString),
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

  let { title, desc, keywords } = getWcNews();

  let breadCrumbArray = breadCrumbSchema(currentUrl, 'विश्व कप 2023 समाचार');

  const pageSeo = {
    title,
    keywords,
    description: desc,
    canonical: publicRuntimeConfig.siteUrl + "world-cup/news/",
    og_image:
      "https://hindi.news18.com/images/siteimages/News18_Hindi_logo_1631086645.svg?impolicy=website&width=130&height=68",
    isCricketNextHome: true,
    page: "News",
    breadCrumbArray
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      "ICC World Cup 2023 News: Stay Informed with Cricket World Cup Live News Updates & Insights!",
      "ICC World Cup 2023: Stay informed and engaged with the latest Cricket World Cup 2023 news. From match previews and player insights to key moments and tournament analysis, dive into comprehensive coverage that brings you closer to the heart of the action.",
      "Cricket World Cup 2023, World Cup 2023 News, Men’s World Cup 2023 News, ICC World Cup News, Cricket World Cup Match Progress News, World Cup Matches Result News, World Cup Cricket Point Tables, World Cup Latest News, World Cup Photos, World Cup Highlights, World Cup News Today",
      publicRuntimeConfig.siteUrl + "/world-cup/news/",
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
    latestStories,
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
export default newsProps;
