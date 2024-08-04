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
import { getWcPhotos } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import {
  getRedisDataByMultiKey,
  getMenu,
  getArticleList,
} from "api_dns/global/Common";
import { breadCrumbSchema } from "api/Constant";

const photosProps = async (context) => {
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
        filter: { post_type: "photogallery", "tags.slug": "world-cup-2023" },
        fields: "id,display_headline,weburl_r,images,headline,intro,created_at",
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

  let { title, desc, keywords } = getWcPhotos();

  let breadCrumbArray = breadCrumbSchema(currentUrl, 'विश्व कप 2023 फोटो गैलरी');

  const pageSeo = {
    title,
    keywords,
    description: desc,
    canonical: publicRuntimeConfig.siteUrl + "world-cup/photos/",
    og_image:
      "https://hindi.news18.com/images/siteimages/News18_Hindi_logo_1631086645.svg?impolicy=website&width=130&height=68",
    isCricketNextHome: true,
    page: "Photo",
    breadCrumbArray
  };
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      "ICC Cricket World Cup 2023 Photo: Capturing the Essence of Cricket World Cup 2023: Browse Exclusive Photos!",
      "ICC Cricket World Cup 2023: Immerse yourself in the visual journey of Cricket World Cup 2023 through a captivating collection of exclusive photos. Relive the excitement, emotions, and defining moments of the tournament through stunning images that capture the essence of this global cricket spectacle.",
      "Cricket World Cup 2023, World Cup 2023 Photos, Men’s World Cup 2023 Images, ICC World Cup Pictures, Cricket World Cup Match Progress Photos, World Cup Matches Result Images, World Cup Cricket Pictures, World Cup Latest Photos, World Cup Photos, World Cup Highlights, World Cup News Today",
      publicRuntimeConfig.siteUrl + "/world-cup/photos/",
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
export default photosProps;
