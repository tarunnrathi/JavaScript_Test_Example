import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import { cricketPlayerProfile as cricketPlayerProfileAds } from "includes/Desktop/dfpAdIds";
import { cricketPlayerProfile as cricketPlayerProfileMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { arrayOnly, ignoreQueryParams } from "includes/article.util";
import { getTeamSquadDetails } from "includes/seo.util";
import { TeamsBioContent } from "components/Cricketnext/CricketNextUtils";
import { TaboolaList } from "includes/Tabola.helper";
import { getMenu, getRedisDataByMultiKey, getGoogleConfig,getRedisDataByKey } from "api_dns/global/Common";
import fetchUtility from "includes/sFetchUtility";

const cnTeamSquadProps = async (context) => {
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
  const teamName = urlParam?.teamName || "";
  const teamDisplayName = teamName ? (teamName.replace('-', ' ')).toUpperCase() : '';
  const teamId = urlParam?.teamId || "";

  let paramObj = {
    teamName,
    teamDisplayName,
    teamId,
    currentUrl,
    currentPath
  };

  let teamSquadData = {}
  // const seriesId = 5612;
  const seriesId = 6122;

  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-cricket_trending_topic";
  let footerData = [], crMenu = [], get1xBet = [], trendingTags={};

  let [
      teamDataResult = {},
      menuData = {},
      googleRemoteConfig = {},
      // districtList = {},
      redisMultiResults = [],
      categorySponserData = {},
  ] = await Promise.allSettled([
      fetchUtility(`http://pvt-events.nw18.com/n18sports/cricket/v1/en/squad/${teamId}/${seriesId}`, {}),
      getMenu(isMobile),
      getGoogleConfig(),
      // getDistricts(),
      getRedisDataByMultiKey(multiRedisString),
      getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]).then(temp => temp?.map(r=>r.value)).catch();

  if(!teamDataResult || !Object.keys(teamDataResult).length) {
    return {
      notFound: true
    }
  }
  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );

  if (Object.keys(redisMultiResults)?.length > 0) { 
      let keys = Object.keys(redisMultiResults);   
      [footerData, crMenu, get1xBet, trendingTags] = keys.map(i => redisMultiResults[i]? redisMultiResults[i]: []);
  }

  const teamData = teamDataResult && teamDataResult.player || [];

  // let _1xbet = get1xBet && Object.values(get1xBet)?.length && Object.values(get1xBet).filter(sponsors => sponsors?.Event_Page === '/cricket/')
  // let _1xbetData = _1xbet?.[0]?.sponserdata || [];
  const _1xbetData = catSponData?.sponserdata || [];

  if (teamData.length > 0) {
    const teamPlayers = teamData;
    let playerData = [];

    teamSquadData.teamId = teamDataResult?.teamId;
    teamSquadData.teamName = teamDataResult?.name;
    teamSquadData.teamBio = TeamsBioContent[teamDisplayName] ? TeamsBioContent[teamDisplayName] : '';

    let playerSkillSvg = {
      1: 'https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Batsmen-small.svg',
      2: 'https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Bowler-small.svg',
      3: 'https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/All-Rounder-small.svg',
      4: 'https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Wicket-Keeper-small.svg',
    }

    teamPlayers && teamPlayers.length !== 0 && teamPlayers.forEach(player => {
      const playerId = player?.id;
      const playerEngName = player?.full_display_name;
      let playerShortName = playerEngName.toLowerCase();
      playerShortName = playerShortName.replace(/ /g, "-");
      const playerObj = {
        playerId,
        playerName: player?.name,
        playerEngName,
        playerBattingStyle: player?.sport_specific_keys?.batting_style,
        skill: player?.skill_name,
        skillImg: playerSkillSvg[player?.skill_id],
        playerUrl: `/cricket/profile/${playerShortName}/${playerId}.html`
      }
      playerData.push(playerObj);
    });

    teamSquadData.players = playerData;
  }

  const pageContent = teamSquadData;
  let { title, description, keywords } = getTeamSquadDetails(teamName, 'World Cup 2022');

  const pageSeo = {
    title,
    keywords,
    description,
    canonical: currentUrl,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    isCricketNextHome: true
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

  const pageAds = isMobile ? cricketPlayerProfileMobileAds() : cricketPlayerProfileAds();

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: `${teamName} TEAM`,
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
    categoryName: `${teamDisplayName.replace(' ', '-')} TEAM`,
    crMenu: arrayOnly(crMenu),
    _1xbetData,
    paramObj,
    config: googleRemoteConfig,
     taboolaList,
     isMobile,
     trendingTags
  };
  return { props: { pageData } };
};
export default cnTeamSquadProps;
