import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { cricketPlayerProfile as cricketPlayerProfileAds } from "includes/Desktop/dfpAdIds";
import { cricketPlayerProfile as cricketPlayerProfileMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, ignoreQueryParams } from "includes/article.util";
import { getPlayerProfileDetails } from "includes/seo.util";
import { PlayerProfileTabs } from "components/Cricketnext/CricketNextUtils";
import { TaboolaList } from "includes/Tabola.helper";
import { getDistricts, getMenu, getRedisDataByMultiKey, getGoogleConfig, getCricketData, getArticleList } from "api_dns/global/Common";

const cnPlayerProfileProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  const currentUrl = ignoreQueryParams(
    protocol + host + context.req.url,
    false
  );
  const currentPath = ignoreQueryParams(context.req.url, false);

  const urlParam = context.query;
  const playerName = urlParam?.playerName || "";
  const playerDisplayName = playerName
    ? decodeURI(playerName || "")
        .replace("-", " ")
        .toUpperCase()
    : "";
  const playerId = urlParam?.playerId || "";
  const pageType = urlParam?.pageType || "playerInfo";

  const playerNameFirstLetter = playerDisplayName[0];
  const specialCharactersRegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const validatePlayerName = specialCharactersRegExp.test(
    playerNameFirstLetter
  );

  if (typeof playerNameFirstLetter === "undefined" || validatePlayerName) {
    return {
      notFound: true,
    };
  }

  const playerInfoUrl = `/cricket/profile/${playerName}/${playerId}.html`;
  const battingUrl = `/cricket/profile/${playerName}/batting-${playerId}.html`;
  const bowlingUrl = `/cricket/profile/${playerName}/bowling-${playerId}.html`;
  const newsUrl = `/cricket/profile/${playerName}/news-${playerId}.html`;

  let pageNumber = parseInt(urlParam?.page) || 1;
  const pageLimit = isMobile ? 16 : 20;
  let offset = pageNumber ? (pageNumber - 1) * pageLimit : 0;

  let paramObj = {
    playerName,
    playerId,
    pageType,
    currentUrl,
    currentPath,
    playerInfoUrl,
    battingUrl,
    bowlingUrl,
    newsUrl,
    pageNumber,
    pageLimit,
    topicName: playerName,
  };

  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi";
  let footerData = [], crMenu = [], get1xBet = [];

  let [
      playerProfileData = [],
      menuData = {},
      googleRemoteConfig = {},
      // districtList = {},
      redisMultiResults = [],
  ] = await Promise.allSettled([
      getCricketData(`player-profile/${playerId}`),
      getMenu(isMobile),
      getGoogleConfig(),
      // getDistricts(),
      getRedisDataByMultiKey(multiRedisString)
  ]).then(temp => temp?.map(r=>r.value)).catch();

  if (
    !playerProfileData ||
    (Array.isArray(playerProfileData) && !playerProfileData.length) ||
    (typeof playerProfileData === "object" &&
      !Object.keys(playerProfileData).length)
  ) {
    return {
      notFound: true,
    };
  }
  if (Object.keys(redisMultiResults)?.length > 0) { 
      let keys = Object.keys(redisMultiResults);   
      [footerData, crMenu, get1xBet] = keys.map(i => redisMultiResults[i]? redisMultiResults[i]: []);
  }

  if (pageType === PlayerProfileTabs.NEWS) {
    let newsData = await getArticleList({count: pageLimit, offset: offset, filter: { post_type:"text",'tags.slug':playerName }, fields: 'display_headline,weburl_r,images'}) || [];
    playerProfileData = { news: newsData, ...playerProfileData };
  }

  let _1xbet =
    get1xBet &&
    Object.values(get1xBet)?.length &&
    Object.values(get1xBet).filter(
      (sponsors) => sponsors?.Event_Page === "/cricket/"
    );
  let _1xbetData = _1xbet?.[0]?.sponserdata || [];

  if (typeof playerProfileData === "undefined") {
    playerProfileData = {};
  }
  const pageContent = playerProfileData;

  // FORMING TEAM PAGE REDIRECTION URL FOR BREADCRUM TEAM LINK
  if (pageContent.team?.name && pageContent?.team?.id) {
    const team = pageContent?.team?.name.toLowerCase();
    const teamName = team.replace(" ", "-");
    paramObj.teamUrl = `/cricket/teams/${teamName}-squad-${pageContent?.team?.id}.html`;
  }

  const playerProfileName = pageContent?.name || "";
  let { title, description, keywords } = getPlayerProfileDetails(
    pageType,
    playerProfileName
  );

  const pageSeo = {
    title,
    keywords,
    description,
    canonical: currentUrl,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    isCricketNextHome: true,
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

  const pageAds = isMobile
    ? cricketPlayerProfileMobileAds()
    : cricketPlayerProfileAds();

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: playerDisplayName,
    block_ads: "no",
  });
  let taboolaList = TaboolaList.category;

  let pageData = {
    pageContent,
    menuData,
    pageAds,
    pageSeo,
    footerData,
    // districtList,
    currentUrl,
    categoryName: playerDisplayName,
    crMenu: arrayOnly(crMenu),
    _1xbetData,
    paramObj,
    config: googleRemoteConfig,
    taboolaList,
    isMobile,
  };
  return { props: { pageData } };
};
export default cnPlayerProfileProps;
