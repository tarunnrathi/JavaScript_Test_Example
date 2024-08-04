import { checkDevice, getSetTargettingValues } from "includes/helper";
import getConfig from "next/config";
import { jsonLdForWebPage } from "includes/schema.util";
import { proKabaddiHome as homeAds } from "includes/Desktop/dfpAdIds";
import { ProKabaddi as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import sFetchUtilityDirect from "includes/sFetchUtilityDirect";
import { proKabaddiTeams } from "includes/proKabaddi.helper";
import { getRedisDataByKey, getArticleList } from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";
import SITE_CONfIG from "config/site.config";

const { publicRuntimeConfig } = getConfig();
const getCurrentURL = (context) => {
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  return protocol + host + context.req.url;
};

const playerProps = async (context) => {
  const urlParam = context.query || "";
  let teamName = urlParam?.teamName || "";
  teamName = teamName == "up-yoddhas" ? "up-yoddha" : teamName;
  const playerName = urlParam?.playerId || "";
  const teamId = proKabaddiTeams[teamName]?.id;
  const playerId = playerName?.split("-")?.slice(-1).pop();
  const isMobile = checkDevice(context);
  const currentUrl = getCurrentURL(context);
  let paramObj = {
    pageUrl: "/pro-kabaddi-league/",
    requestURL: currentUrl,
  };


  let [
    footerData = [],
    teams = {},
    matches = {},
    pointTableData = {},
    top_headlines = [],
    photoGallery = [],
    teamData = [],
    playerData = []
  ] = await Promise.all([
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    sFetchUtilityDirect(
      `${SITE_CONfIG.PRO_KABADDI_API}teams/30_team.json`,
      {}
    ),
    sFetchUtilityDirect(
      `${SITE_CONfIG.PRO_KABADDI_API}2019/89_calendar.json`,
      {}
    ),
    sFetchUtilityDirect(
      `${SITE_CONfIG.PRO_KABADDI_API}2019/standings/89_standing.json`,
      {}
    ),
    getArticleList({
      count: 6,
      filter: { post_type: "text", "tags.slug": "pro-kabaddi-league" },
      fields: "display_headline,weburl_r,headline,images",
    }),
    getArticleList({
      count: 5,
      filter: { post_type: "photogallery", "tags.slug": "pro-kabaddi-league" },
      fields: "display_headline,weburl_r,headline,images",
    }),
    sFetchUtilityDirect(
      `${SITE_CONfIG.PRO_KABADDI_API}2019/squads/89_${teamId}_squad.json`,
      {}
    ),
    sFetchUtilityDirect(
      `${SITE_CONfIG.PRO_KABADDI_API}players/${playerId}_player.json`,
      {}
    )
  ]);

  let pageTitle = 'Pro Kabaddi League 2021 Season 8- प्रो कबड्डी लीग 2021 Team, Live Score PKL 2021, Players List 2021, Match Schedule 2021, PKL 2021 Dates and Time Table| News18 हिंदी';
  let pageDescription = 'PKL 2021 Season 8 - Get latest news and Live Score Pro Kabaddi 2021, प्रो कबड्डी लीग 2021 News, vivo Pro Kabaddi League 2021 Team, Pro Kabaddi 2021 Schedule, Venue, Team Player at News18 हिंदी';
  let pageKeywords = 'प्रो कबड्डी लीग 2021,PKL 2021 season 8, प्रो कबड्डी लीग News, Pro Kabaddi live updates, live pro kabaddi score, pro kabaddi schedule, pro kabaddi timings, latest kabaddi news, Pro Kabaddi, Venue, Team Player, प्रो कबड्डी लीग 2021 Team, vivo Pro Kabaddi League 2021 photos, vivo Pro Kabaddi League 2021 video, kabaddi, pro kabaddi, kabaddi 2021, pro kabaddi 2021 match, pkl, vivo kabaddi, vivo pro kabaddi, pkl 2021, pro kabaddi 2021 date, vivo pro kabaddi 2021, pro kabaddi schedule, pro kabaddi 2021 schedule, pro kabaddi season 8, vivo kabaddi 2021 date, vivo, Sports';

  const pageSeo = {
    title: pageTitle,
    keywords: pageKeywords,
    description: pageDescription,
    canonical: currentUrl,
    og_image: SITE_CONfIG.PRO_KABADDI_OG_IMAGE,
  };

  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      pageTitle,
      pageDescription,
      pageKeywords,
      publicRuntimeConfig.siteUrl + "pro-kabaddi-league/",
      null,
      false,
      false,
      false
    ) || "";

  const pageAds = isMobile ? homeMobileAds() : homeAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
  });

  pageSeo.breadCrumbArray = [
    { value: "Home", slug: "" },
    { value: "Pro kabaddi news 2021", slug: "pro-kabaddi-league/" },
    { value: teamName, slug: `pro-kabaddi-league/` },
    { value: urlParam?.playerName, slug: currentUrl }
   ];
  const pageData = {
    isMobile,
    currentUrl,
    pageAds,
    pageSeo,
    footerData,
    teams,
    matches,
    pointTableData,
    top_headlines,
    photoGallery,
    teamData,
    playerData,
    seoData: pageSeo,
  };
  return { props: { pageData } };
};

export default playerProps;
