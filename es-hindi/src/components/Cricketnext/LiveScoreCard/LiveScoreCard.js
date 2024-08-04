import { useState, useRef, useEffect } from "react";
import FullScoreCard from "../Cards/FullScoreCard";
import Tabs from "../Tabs";
import Head from "next/head";
import QuickScoreCard from "../Cards/QuickScoreCard";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import fetchUtility from "includes/sFetchUtility";
import FullScoreBoard from "../Cards/FullScoreBoard";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import TeamSquads from "../Cards/TeamSquads";
import News from "../Cards/News";
import ScoreRHS from "../Cards/ScoreRHS";
import FullCommentary from "../Cards/FullCommentary";
import LiveScoreCardMobile from "./LiveScoreCardMobile";
import { getActiveInning, getCommentryURL, getIsLiveMatch } from "includes/ipl.helper";
import SITE_CONfIG from "config/site.config";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const LiveScoreCard = ({ data = {}, pageAds, isMobile = false }) => {
  if(typeof data?.newMatchData?.status === 'undefined') {
    return null;
  }
  let newMatchData = data?.newMatchData;
  const tabopt = [
    {
      name: "क्विक स्कोरकार्ड",
      url: `${publicRuntimeConfig.siteUrl}cricket/live-score/${data?.newMatchData?.slug}-live-score-${data?.newMatchData?.matchCode}.html`,
      apiUrl: `${SITE_CONfIG.CRICKET_NEXT_CSR_API}match_${data?.newMatchData?.matchCode}_hi.json`,
      fired: data.active == 0
    },
    {
      name: "फुल स्कोरकार्ड",
      url: `${publicRuntimeConfig.siteUrl}cricket/live-score/${data?.newMatchData?.slug}-live-score-full-${data?.newMatchData?.matchCode}.html`,
      apiUrl: `${SITE_CONfIG.CRICKET_NEXT_CSR_API}match_${data?.newMatchData?.matchCode}_hi.json`,
      fired: data.active == 1
    },
    { name: "कमेंट्री",
      url: `${publicRuntimeConfig.siteUrl}cricket/live-score/${data?.newMatchData?.slug}-ball-by-ball-live-commentary-${data?.newMatchData?.matchCode}.html`,
      apiUrl: "",
      fired: data.active == 2 },
    {
      name: "लाइव ब्लॉग",
      url: data.storyurl,
      apiUrl: "",
      hide: true,
      dontPrevent: true,
      fired: data.active == 3
    },
    {
      name: "मैच की जानकारियां",
      url: `${publicRuntimeConfig.siteUrl}cricket/live-score/team-squads/${data?.newMatchData?.slug}-${data?.newMatchData?.matchCode}.html`,
      apiUrl: `${SITE_CONfIG.CRICKET_NEXT_CSR_API}match_${data?.newMatchData?.matchCode}_hi.json`,
      once: false,
      fired: data.active == 4
    },
    // {
    //   name: "न्यूज़",
    //   url: `${publicRuntimeConfig.siteUrl}cricket/live-score/team-news/${data?.newMatchData?.slug}-${data?.newMatchData?.matchCode}.html`,
    //   once: false,
    //   always: true,
    //   fired: data.active == 5
    // },
  ];
  const [score, setScore] = useState({});
  const [config, setConfig] = useState({
    active: data.active,
    apiUrl: `${SITE_CONfIG.CRICKET_NEXT_CSR_API}match_${data?.newMatchData?.matchCode}_hi.json`,
    isLoading: false,
  });
  let id;
  const updateConfig = (active = 0, apiUrl) => {
    clearInterval(id);
    setConfig({ active, apiUrl, isLoading: true });
    if(apiUrl) {
      updateLiveData(apiUrl, active);
    }
  };
  const updateLiveData = (apiUrl, active) => {
    (async () => {
      const mdata = await fetchUtility(apiUrl || config.apiUrl, []);
      setScore((p) => ({ ...p, ...mdata }));
      if (apiUrl) {
        setConfig((prev) => ({ ...prev, isLoading: false }));
      }
    })();
  };
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = (url) => updateLiveData(url);
  });
  useEffect(() => {
    function tick(url) {
      savedCallback.current(url);
    }
    const isLive = data?.newMatchData?.isLive;
    if (isLive && !id) {
      if (data.once.includes(config.active)) {
        id = setInterval(
          () =>
            tick(
              `${publicRuntimeConfig.cricketNextApiUrl}match/${data?.newMatchData?.matchCode}/`,
            ),
          10000
        );
      } else {
        id = setInterval(tick, 10000);
      }
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [config.active]);

  if(score && score.matchCode) {
    const currentInning = getActiveInning(score);
    score.currentInnings = currentInning;
    score.isLive = getIsLiveMatch(score?.status);
    score.CommentaryURL = getCommentryURL(score?.matchCode, currentInning);
    score.headingOne = newMatchData?.headingOne;
  }

  newMatchData = (score && score.matchCode) ? score : newMatchData;
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=optional"
        />
        <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Karma:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        <meta itemProp="publisher" content="News18 हिंदी" />
      </Head>
      {isMobile ? (
        <LiveScoreCardMobile
          tabopt={tabopt}
          data={newMatchData}
          score={score}
          pageAds={pageAds}
          updateConfig={updateConfig}
          config={config}
          ta={data?.ta}
          tb={data?.tb}
          squadData={data?.newMatchData}
        />
      ) : (
        <>
          <div className="CN-pageOutter">
            <div className="CN-pageWrapper CN-SeriesWrap">
              <div className="CN-section">
                <div className="CN-sec-l">
                  
                <BreadcrumbCommon breadCrumbArray={[
                      { value: "NEWS18 हिंदी", slug: "/"},
                      { value: "क्रिकेट", slug: "/cricket/"},
                      { value: "LIVE SCORE", slug: "/cricket/live-score/"},
                      { value: (config || data).active == 4
                        ? `${data?.newMatchData.teamfa || data?.newMatchData.teama} vs ${data?.newMatchData.teamfb || data?.newMatchData.teamb} Team`
                        : (config || data).active == 5
                        ? `${data.ta || data?.newMatchData.teamfa || data?.newMatchData.teama} vs ${data.tb || data?.newMatchData.teamfb || data?.newMatchData.teamb} न्यूज`
                        : (config || data).active == 2
                        ? `${data?.newMatchData.teamfa || data?.newMatchData.teama} vs ${data?.newMatchData.teamfb || data?.newMatchData.teamb} बॉल BY बॉल कॉमेंट्री`
                        : data.crumb ||
                          score?.headingOne ||
                          data?.newMatchData?.headingOne},
                  ]}/>
                  <div className="CN-innersection">
                    <h2 className="cn-heading-2">
                      {(config || data).active == 4
                        ? `${data?.newMatchData.teamfa || data?.newMatchData.teama} vs ${data?.newMatchData.teamfb || data?.newMatchData.teamb} Team`
                        : (config || data).active == 5
                        ? `${data.ta || data?.newMatchData.teamfa || data?.newMatchData.teama} vs ${data.tb || data?.newMatchData.teamfb || data?.newMatchData.teamb} न्यूज`
                        : (config || data).active == 2
                        ? `${data?.newMatchData.teamfa || data?.newMatchData.teama} vs ${data?.newMatchData.teamfb || data?.newMatchData.teamb} बॉल BY बॉल कॉमेंट्री`
                        : score?.headingOne || data?.newMatchData?.headingOne}
                    </h2>
                    <FullScoreCard
                      score={score}
                      data={newMatchData}
                      id={data.id}
                      url={data.currentUrl}
                      pageAds={pageAds}
                    />
                  </div>
                  <Tabs
                    options={tabopt}
                    updateConfig={updateConfig}
                    active={config.active}
                    upcoming={data.upcoming}
                    titles={data.pageTitles}
                  />
                  {config.active == 0 ? (
                    <QuickScoreCard
                      score={score}
                      data={newMatchData}
                      pageAds={pageAds}
                      id={data?.newMatchData?.matchCode}
                      config={config}
                    />
                  ) : null}
                  {config.active == 1 ? (
                    <FullScoreBoard
                      score={score}
                      data={newMatchData}
                      pageAds={pageAds}
                      id={data.id}
                      config={config}
                    />
                  ) : null}
                  {config.active === 2 ? (
                    <FullCommentary
                      config={config}
                      data={newMatchData}
                      score={score}
                      pageAds={pageAds}
                      comments={data.comments}
                      summary={data.summary}
                      fullList={data.fullList}
                    />
                  ) : null}
                  {config.active === 4 ? (
                    <TeamSquads
                      config={config}
                      data={data?.newMatchData}
                      score={score}
                      pageAds={pageAds}
                    />
                  ) : null}
                  {config.active === 5 ? (
                    <News
                      config={config}
                      data={newMatchData}
                      score={score}
                      ta={data.ta}
                      tb={data.tb}
                    />
                  ) : null}
                </div>
                <div className="CN-sec-r">
                  <ScoreRHS pageAds={pageAds} isIpl={data.newMatchData?.isIpl} isT20={data.newMatchData?.isT20} recent={data.recentMatches} upcoming={data.upMatches} url={data.currentUrl} predictorData={data?.predictorData}/>
                </div>
              </div>
              {pageAds.BTF_728 ? (
                <div className="ad-container">
                  <SiteAd
                    width={728}
                    height={90}
                    slotId={`commentary-ad-0`}
                    adUnit={pageAds.BTF_728}
                    sizes={[[728, 90], [1, 1]]}
                    removeAdSpan={true}
                    loadonScroll={true}
                  ></SiteAd>
                </div>
              ) : null}
            </div>
          </div>
          <style jsx global>{`
            .CN-breadcum {
              font-size: 14px;
              line-height: 13px;
              color: #292929;
              text-transform: uppercase;
              padding: 4px 0;
              border-bottom: 1px dotted #939393;
              margin-bottom: 18px;
            }
            .CN-breadcum h1{
              font-size: 14px;
              font-weight: 400;
              display: inline-block;
            }
            .CN-breadcum h2 {
              display: inline-block;
              font-size: 11px;
              font-weight: 400;
            }
            .scoreHeading1 {
              color: #464646;
              font-size: 20px;
              text-transform: uppercase;
              font-family: 'Karma',serif !important;
              line-height: 27px;
              margin-bottom: 4px;
              position: relative;
              padding-left: 20px;
              font-weight: normal;
            }
            .scoreHeading1::before {
              content: "";
              width: 15px;
              height: 8px;
              background: #ff0000;
              position: absolute;
              top: 50%;
              transform: translate(0, -50%);
              left: 0;
            }
            .cn-heading-2 {
              font-size: 24px;
              line-height: 27px;
              color: #e1261d;
              background: #fff;
              display: block;
              text-align: center;
              text-transform: uppercase;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .CN-pageOutter {
              background: #f5f5f5;
              margin-bottom: 20px;
            }
            .CN-pageWrapper {
              max-width: 1284px;
              margin: 0 auto;
              padding: 0 20px;
              background: #fff;
              clear: both !important;
            }
            .CN-SeriesWrap {
              padding-top: 18px !important;
            }
            .CN-section {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .CN-section .CN-sec-l {
              width: 924px;
              min-width: 924px;
            }
            .CN-section .CN-sec-r {
              width: 300px;
              min-width: 300px;
            }
            a,
            p {
              color: #232323;
            }
            .CN-pageOutter a:hover {
              color: inherit;
            }
            .ad-container {
              text-align: center;
              margin-bottom: 10px;
            }
            table {
              border-collapse: collapse;
              border-spacing: 0;
            }
            .line1 {
              border: 0;
              height: 5px;
              background: #D8D8D8;
              margin: 20px 0 40px;
            }
          `}</style>
        </>
      )}
    </>
  );
};
export default LiveScoreCard;
