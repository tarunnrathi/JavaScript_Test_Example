import {
  arrayOnly,
  getSponserData,
  ignoreQueryParams,
} from "includes/article.util";
import { cricketLiveScore as mobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { cricketLiveScore as desktopAds } from "includes/Desktop/dfpAdIds";
import { getCrPageDetails, getCrPageTitles } from "includes/seo.util";
import {
  jsonLdForWebPage,
  jsonLdForCricketSiteNavigation,
} from "includes/schema.util";
import {
  getActiveInning,
  getCommentryURL,
  getHeadingOne,
  getIsLiveMatch,
  getMatchSlug,
} from "includes/ipl.helper";
import {
  getDistricts,
  getMenu,
  getRedisDataByMultiKey,
  getGoogleConfig,
  getCricketData,
  getArticleList,
} from "api_dns/global/Common";
import { checkDevice } from "includes/helper";

const livescoreProps = async (context) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  const urlParam = context.query;
  const id = urlParam.id;
  let tabname = urlParam.tabname;
  const active = {
    "live-score": 0,
    "live-score-full": 1,
    "team-squads": 4,
    "team-news": 5,
    "ball-by-ball-live-commentary": 2,
  };

  const multiRedisString =
    "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi";
  let footerData = [],
    crMenu = [],
    get1xBet = [];

  let [
    newMatchData = [],
    menuData = {},
    googleRemoteConfig = {},
    // districtList = {},
    redisMultiResults = [],
  ] = await Promise.allSettled([
    getCricketData(`match/${id}/`),
    getMenu(isMobile),
    getGoogleConfig(),
    // getDistricts(),
    getRedisDataByMultiKey(multiRedisString),
  ])
    .then((temp) => temp?.map((r) => r.value))
    .catch();

  if (Object.keys(redisMultiResults)?.length > 0) {
    let keys = Object.keys(redisMultiResults);
    [footerData, crMenu, get1xBet] = keys.map((i) =>
      redisMultiResults[i] ? redisMultiResults[i] : []
    );
  }

  let _1xbetData = getSponserData("/cricket/live-score/", get1xBet);

  let upMatches = [];
  let recentMatches = [];

  let upcoming = false;
  let crumb = "";
  let ta = "";
  let tb = "";
  let tae = "";
  let tbe = "";

  if (!newMatchData || !Object.keys(newMatchData).length) {
    return {
      notFound: true,
    };
  }

  if (
    newMatchData &&
    Object.keys(newMatchData).length &&
    newMatchData?.teamb_en &&
    newMatchData?.teama_en
  ) {
    let currentInnings = getActiveInning(newMatchData);
    newMatchData.slug = getMatchSlug(
      newMatchData?.teama_en,
      newMatchData?.teamb_en
    );
    newMatchData.CommentaryURL = getCommentryURL(
      newMatchData?.matchCode,
      currentInnings
    );
    let [teamPlayerDataA = [], teamPlayerDataB = []] = await Promise.all([
      getCricketData(`squad/${newMatchData?.teama_id}/`),
      getCricketData(`squad/${newMatchData?.teamb_id}/`),
    ]);

    let teamPlayerDataSquadA = teamPlayerDataA?.player || [];
    let teamPlayerDataSquadB = teamPlayerDataB?.player || [];

    if (!teamPlayerDataSquadA)
      teamPlayerDataSquadA = Object.entries(
        newMatchData?.teams?.[newMatchData?.teama_id].players
      ).map((player) => ({
        id: player[0],
        name_eng: player[1],
        name: player[1],
      }));
    if (!teamPlayerDataSquadB)
      teamPlayerDataSquadB = Object.entries(
        newMatchData?.teams?.[newMatchData?.teamb_id].players
      ).map((player) => ({
        id: player[0],
        name_eng: player[1],
        name: player[1],
      }));

    if (teamPlayerDataSquadA?.length > 0) {
      Object.assign(newMatchData?.teams[newMatchData?.teama_id], {
        playerDetails: teamPlayerDataSquadA,
      });
    }
    if (teamPlayerDataSquadB?.length > 0) {
      Object.assign(newMatchData?.teams[newMatchData?.teamb_id], {
        playerDetails: teamPlayerDataSquadB,
      });
    }
    newMatchData.currentInnings = currentInnings;
    newMatchData.isLive = getIsLiveMatch(newMatchData?.status);
  }

  if (newMatchData) {
    ta = newMatchData?.teama_en?.toLowerCase() || "";
    tb = newMatchData?.teamb_en?.toLowerCase() || "";
    let teamNews = await getArticleList({
      count: 20,
      filter: {
        post_type: "text",
        "subsection.id": "29",
        "tags.slug": [ta, tb],
      },
      fields: "display_headline,weburl_r,images",
    });
    newMatchData.news = teamNews;
  }

  let comments = [];
  let fullList = [];
  let summary = [];
  if (
    newMatchData &&
    newMatchData.CommentaryURL &&
    tabname == "ball-by-ball-live-commentary"
  ) {
    try {
      let c = await fetch(newMatchData.CommentaryURL, { timeout: 5000 });
      c = await c.json();
      c = c?.Commentary;
      if (c) {
        let first = c.find((item) => item.Over != "");
        if (first) {
          let prv = c.find(
            (item) => Number(item.Id) > Number(first.Id) && item.Over != ""
          );
          if (prv) {
            first = c[0];
          }
        } else {
          first = c[0];
        }
        fullList =
          c.filter((item) => Number(item.Id) <= Number(first.Id)) || [];
        summary = c.filter((item) => Number(item.Id) > Number(first.Id)) || [];
        comments = fullList.slice(0, 16);
      }
    } catch (error) {}
  }

  const pageAds = isMobile ? mobileAds() : desktopAds();
  let { title, keywords, desc } = getCrPageDetails({
    tae: newMatchData?.teama_en || tae || ta,
    tbe: newMatchData?.teamb_en || tbe || tb,
    ta: newMatchData?.teamfa || ta,
    tb: newMatchData?.teamfb || tb,
    tabname,
  });
  if (newMatchData && Object.keys(newMatchData).length > 1) {
    newMatchData.title = title;
    newMatchData.tabname = tabname;
    newMatchData.headingOne = getHeadingOne(newMatchData);
  }
  const pageHeading = newMatchData?.headingOne.includes("undefined")
    ? "Live Match Scorecard"
    : newMatchData?.headingOne;
  const pageSeo = {
    title: Object.keys(newMatchData).length ? pageHeading : "",
    og_title: title,
    keywords,
    description: desc,
    pageUrl: currentUrl,
    isCricketNext: true,
    jsonLdForWebPage: jsonLdForWebPage(
      pageHeading,
      desc,
      keywords,
      currentUrl,
      {},
      true,
      false,
      true
    ),
    jsonLdForCricketSiteNavigation: jsonLdForCricketSiteNavigation(
      arrayOnly(crMenu)
    ),
    canonical: currentUrl,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    section: "cricket-live-score",
  };

  const pageData = {
    id,
    currentUrl,
    footerData,
    pageAds,
    tabname,
    active: active[tabname],
    once: [2, 4, 5],
    upcoming,
    crumb,
    ta,
    tb,
    pageSeo,
    comments,
    fullList,
    summary,
    upMatches,
    recentMatches,
    menuData,
    crMenu: arrayOnly(crMenu),
    pageTitles: getCrPageTitles({
      tae: newMatchData?.teama_en || tae || ta,
      tbe: newMatchData?.teamb_en || tbe || tb,
      ta: newMatchData?.teamfa || ta,
      tb: newMatchData?.teamfb || tb,
    }),
    config: googleRemoteConfig,
    newMatchData,
    isMobile,
    // districtList,
    _1xbetData,
  };
  return { props: { pageData } };
};
export default livescoreProps;
