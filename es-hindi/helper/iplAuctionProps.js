import {
  jsonLdForHomeOrganization,
  jsonLdForHomeWebSite,
  jsonLdForHomeSiteNavigation,
} from "includes/schema.util";
import { home as homeAds } from "includes/Desktop/dfpAdIds";
import { staticPagesMobile as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import sFetchUtilityDirect from "includes/sFetchUtilityDirect";
import {
  getMenu,
  getRedisDataByKey,
  RhstopStories,
  RhsphotoStories,
  getDistricts,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";
import { getMeta } from "util/global/Helper";

const IplAuctionProps = async (context, isAmp = false) => {
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;

  if (isAmp && !currentUrl.includes("/amp/")) {
    return {
      redirect: {
        destination: protocol + host + "/amp/",
        statusCode: 301,
      },
    };
  }

  let [
    iplPlayersData = [],
    iplTeamsData = [],
    rhsTopStory = [],
    rhsPhotoGallery = [],
    menuData = {},
    footerData = [],
    // districtList = {},
    googleRemoteConfig = {},
  ] = await Promise.all([
    sFetchUtilityDirect(
      `https://cricketnext.nw18.com/sports/csr/ipl-auction/iplteamsplayers_hi_2024.json`
    ),
    sFetchUtilityDirect(
      `https://cricketnext.nw18.com/sports/csr/ipl-auction/iplteams_hi_2024.json`
    ),
    RhstopStories({
      count: 6,
      section: "category",
      subSection: "nation",
      filter: {"post_type":"text"},
      fields: "story_id,headline,weburl,images,display_headline",
    }),
    RhsphotoStories(),
    getMenu(isMobile, isAmp),

    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    // getDistricts(),
    {},
    isAmp ? [] : {},
  ]);

  const pageSeo = {
    title: getMeta('home')?.title,
    description: getMeta('home')?.description,
    keywords: getMeta('home')?.keywords,
    canonical: (currentUrl.split("page")[0] || "").toLowerCase(),
    og_image:
      "https://images.news18.com/static_news18/pix/ibnhome/news18/images/OG-IPL-2024.jpg",
    page: "IPLAuction",
  };
  !isAmp && (pageSeo.ampHtml = protocol + host + "/amp/ipl-auction/");

  pageSeo.jsonLdForOrganization = jsonLdForHomeOrganization() || "";
  pageSeo.jsonLdForHomeWebSite = jsonLdForHomeWebSite() || "";
  pageSeo.jsonLdForHomeSiteNavigation =
    jsonLdForHomeSiteNavigation(menuData, isMobile || isAmp) || "";

  const pageAds = isMobile ? homeMobileAds() : homeAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "Home",
    block_ads: "no",
  });

  let pageData = {
    rhsTopStory,
    rhsPhotoGallery,
    isMobile,
    menuData,
    // districtList,
    pageAds,
    pageSeo,
    footerData,
    switchAds:
      googleRemoteConfig && googleRemoteConfig.length
        ? googleRemoteConfig?.find((i) => i.key == "NW18_HIND_HP_ATF_320") ||
          false
        : false,
    currentUrl,
    iplPlayersData: iplPlayersData?.ipl_auction_players?.teams||{},
    iplTeamsData: iplTeamsData?.ipl_auction_teams||{},
  };

  return { props: { pageData } };
};
export default IplAuctionProps;
