import { useEffect } from "react";
import Head from "next/head";
// import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import ScoreRHS from "../Cards/ScoreRHS";
import LiveScoreMobile from "./LiveScoreMobile";
import dynamic from "next/dynamic";
import LatestNews from "../home/LatestNews";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
const LiveScore = ({ data = {}, pageAds, isMobile = false }) => {

  const { livescorecard = {} } = data;

  const team_default_image = 'https://images.news18.com/static_news18/pix/ibnhome/news18/default-flag.jpg';
  let league_type = '';
  // const TEAMICON = 'https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/';

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ];
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let myDate, myFormatDate;

  // filtering live matches
  const livescoreMatchList = Object.values(livescorecard)?.filter((match) => match?.matchstatus !== 'मैच समाप्त');

  // checking if live matches exists?
  const Total_Live_Match_Data = livescoreMatchList?.length ? livescoreMatchList : [];
  const updatedResults = Total_Live_Match_Data;

  const Total_Live_Match_Data_length = Total_Live_Match_Data.length;
  const liveMatchDataIdArr = {}; //object to keep id of live matches
  if (Total_Live_Match_Data_length > 0) {
    for (let xx = 0; xx < Total_Live_Match_Data_length; xx++) {
      liveMatchDataIdArr[xx] = Total_Live_Match_Data[xx]['matchid']; // insering live matches in liveMatchDataIdArr
    }
  }

  useEffect(() => {
    const getLiveData = () => {

      const jsonUrl = 'https://cricketnext.nw18.com/sports/csr/feed/live_matches_hi.json';
      fetch(jsonUrl)
        .then((res) => res.json())
        .then((response) => {
          if (typeof response !== "undefined" && response.length) {
            for (let i = 0; i < response.length; i++) {
              const matchData = response[i];
              const matchId = matchData.matchid;

              const scorelive = get_live_team_scores(matchData);
              const ta = document.getElementById("teamAscores_A" + matchId);
              const tb = document.getElementById("teamBscores_B" + matchId);

              if (ta && tb) {
                if (scorelive[2] && scorelive[3]) {
                  document.getElementById("teamAscores_A" + matchId).innerHTML =
                    scorelive[0];
                  document.getElementById("teamBscores_B" + matchId).innerHTML =
                    scorelive[1];
                  document.getElementById(
                    "teamAscores_Aa" + matchId
                  ).innerHTML = scorelive[2];
                  document.getElementById(
                    "teamBscores_Bb" + matchId
                  ).innerHTML = scorelive[3];
                } else {
                  document.getElementById("teamAscores_A" + matchId).innerHTML =
                    scorelive[0];
                  document.getElementById("teamBscores_B" + matchId).innerHTML =
                    scorelive[1];
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log("hhhh error in live score widget " + err);
        });
    };

    const get_live_team_scores = (scoresData) => {
      const score = [];
      const teamAscores = scoresData?.teama || '';
      const teamARuns = teamAscores?.score || '';
      const teamAWickets = teamAscores?.wickets || '';
      const teamAOvers = teamAscores?.overs || '';

      const innerBoxHtmlA = '<li class="scores_li">' + teamARuns + '/' + teamAWickets + ' <span style="font-weight: normal;">(' + teamAOvers + ' OV) </span></li>';
      score.push(innerBoxHtmlA);

      const teamBscores = scoresData?.teamb || '';
      const teamBRuns = teamBscores?.score || '';
      const teamBWickets = teamBscores?.wickets || '';
      const teamBOvers = teamBscores?.overs || '';

      let innerBoxHtmlB = '';
      if(teamBscores.score) innerBoxHtmlB = '<li class="scores_li">' + teamBRuns + '/' + teamBWickets + ' <span style="font-weight: normal;">(' + teamBOvers + ' OV) </span></li>';
      else innerBoxHtmlB = '(YET TO BAT)';
      score.push(innerBoxHtmlB);

      if(scoresData.testInnings && scoresData.testInnings.teama) {
        const secondInningsData = Object.values(scoresData.testInnings || {});
        const aTeamSecInningData = secondInningsData[0];
        const bTeamSecInningData = secondInningsData[1];

        let innerBoxHtmlA = '';
        if(aTeamSecInningData.score && aTeamSecInningData.wickets && aTeamSecInningData.overs) innerBoxHtmlA = '<li class="scores_li">' + aTeamSecInningData.score + '/' + aTeamSecInningData.wickets + ' <span style="font-weight: normal;">(' + aTeamSecInningData.overs + ' OV) </span></li>';
        score.push(innerBoxHtmlA);

        let innerBoxHtmlB = '';
        if(bTeamSecInningData.score && bTeamSecInningData.wickets && bTeamSecInningData.overs) innerBoxHtmlB = '<li class="scores_li">' + bTeamSecInningData.score + '/' + bTeamSecInningData.wickets + ' <span style="font-weight: normal;">(' + bTeamSecInningData.overs + ' OV) </span></li>';
        else innerBoxHtmlB = '(YET TO BAT)';
        score.push(innerBoxHtmlB);
      }

      return score;
    };
    setInterval(() => {
      !isMobile && getLiveData();
    }, 10000);

  }, []);

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=optional"
        />
        <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Karma:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta itemProp="publisher" content="News18 हिंदी" />
      </Head>
      {isMobile ? (
        <LiveScoreMobile
          livescorecard={livescorecard || {}}
          data={data}
          pageAds={pageAds}
          liveMatchDataIdArr={liveMatchDataIdArr || []}
          updatedResults={updatedResults || []}
        />
      ) : (
        <>
          <div className="CN-pageOutter">
            <div className="CN-pageWrapper CN-SeriesWrap">
              <div className="CN-pageCN-scoreCardsection">
                {/* <SiteAd
                  slotId="Desktop_ScoreCard_ad"
                  adUnit={pageAds?.ScoreCard_ad}
                  sizes={[[1244, 60]]}
                  width={1244}
                  height={60}
                  removeAdSpan={true}
                  lazyload={true}
                /> */}
                <NewSiteAd
                  slotId="Desktop_ScoreCard_ad"
                  adUnit={pageAds?.ScoreCard_ad}
                  sizes={[[1244, 60]]}
                  width={1244}
                  height={60}
                  removeAdSpan={true}
                  lazyLoad={true}
                />
                <div className="CN-scoreCardsection">
                  <DynamicCrTopScoreWidgetWithNoSSR />
                </div>
              </div>
              <div className="CN-section">
                <div className="CN-sec-l">
                <BreadcrumbCommon breadCrumbArray={[
                      { value: "हिंदी समाचार", slug: "/"},
                      { value: "क्रिकेट", slug: "/cricket/"},
                      { value: "लाइव स्कोर"},
                  ]}/>
                  <div className="heading_title">
                    <h1>लाइव मैच</h1>
                  </div>
                  {

                    updatedResults && updatedResults?.length ? updatedResults?.map((data, i) => {

                      // checking if match is live or not
                      const is_live_status = 1;

                      // checking match league and initializing
                      league_type = data['league'];

                      // getting match id
                      const match_id = data['matchid'];
                      const teama_match_id = 'teamAscores_A' + match_id + '';
                      const teamb_match_id = 'teamBscores_B' + match_id + '';

                      const teama_match_id_test = 'teamAscores_Aa' + match_id + '';
                      const teamb_match_id_test = 'teamBscores_Bb' + match_id + '';

                      // getting team names and setting their tag id
                      const teama_match_name = 'teamAName_' + match_id + '';
                      const teamb_match_name = 'teamBName_' + match_id + '';
                      const team_a_name = data['teama'];
                      const team_b_name = data['teamb'];

                      // Initializing teams default image
                      let teama_image = team_default_image;
                      let teamb_image = team_default_image;

                      //getting teams name in english lowercase
                      let teama_lower_name = data['teama_eng']?.toLowerCase() || '';
                      teama_lower_name = teama_lower_name.replace(/ /g, "-"); //returns my_name
                      let teamb_lower_name = data['teamb_eng']?.toLowerCase() || '';
                      teamb_lower_name = teamb_lower_name.replace(/ /g, "-"); //returns my_name

                      // intializing full scorecard , commentry and squad url
                      const Match_Full_ScoreCard = '/cricket/live-score/' + teama_lower_name + '-vs-' + teamb_lower_name + '-live-score-full-' + match_id + '.html';
                      const Match_Commentary = '/cricket/live-score/' + teama_lower_name + '-vs-' + teamb_lower_name + '-ball-by-ball-live-commentary-' + match_id + '.html';
                      const Match_Live_Blog = '/cricket/live-score/' + teama_lower_name + '-vs-' + teamb_lower_name + '-live-score-full-' + match_id + '.html';
                      const Match_Squads = '/cricket/live-score/team-squads/' + teama_lower_name + '-vs-' + teamb_lower_name + '-' + match_id + '.html';

                      if (is_live_status == 1) {

                        // Teams flag image
                        if (league_type == 'ICC' || league_type == 'IPL') {
                          teama_image = data?.teama?.s?.flag;
                          teamb_image = data?.teamb?.s?.flag;
                        }

                        // getting date of the match
                        const match_date = data['matchdate_ist'];
                        const t = match_date?.split("/");

                        if (t?.[2]) {
                          myDate = new Date(t[2], t[0] - 1, t[1]);
                          myFormatDate = days[myDate.getDay()] + " " + myDate.getDate() + " " + MONTHS[myDate.getMonth()];
                        } else {
                          myDate = new Date(new Date().getFullYear(), t?.[0] - 1, t?.[1]);
                          myFormatDate = days[myDate.getDay()] + " " + myDate.getDate() + " " + MONTHS[myDate.getMonth()];
                        }

                        return (
                          <>
                            <div className="CN-result-row" id={match_id}>
                              <h2 className="CN-result-heading">{data['seriesname']}</h2>
                              <div className="result-box">
                                <div className="result-col-l">
                                  <div className="result-col-lWrap">
                                    <span className="cn-rsltHead1">{data['teama']?.teamfa} <span>vs</span> {data['teamb']?.teamfb}, {data['matchno']}</span>
                                    <p className="cn-rsltCont">{myFormatDate} • {data['matchtime_ist']}(IST) • {data['venue']}</p>
                                  </div>
                                  <a href={Match_Full_ScoreCard}>
                                    <div className="result-teamWrap">
                                      <div className="rs-inner">
                                        <div className="result-teambox">
                                          <div className="flag">

                                            { /*<img src={teama_image} alt={data['teama']} /> */}
                                            <object data={teama_image} type="image/png" style={{ width: '100%' }}>
                                              <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/default-flag.jpg" alt={data['teama']?.teamfa} />
                                            </object>

                                          </div>
                                          <div className="scoreWrap">
                                            <span className="teamName"><a href="#" id={teama_match_name || ''}>{team_a_name?.teamfa}</a></span>
                                            <div>
                                              <ul className="scorebox" id={teama_match_id}>
                                              {data?.teama?.score && data?.teama?.wickets ? <li className="scores_li">{data?.teama?.score}/{data?.teama?.wickets} <span style={{ "font-weight": "normal" }}>({data?.teama.overs} OV) </span></li>:"(Yet To Bat)"}
                                              </ul>
                                              <ul className="scorebox" id={teama_match_id_test}>
                                              {data?.testInnings?.teama?.score ?
                                                data?.testInnings?.teama?.score && data?.testInnings?.teama?.wickets ?
                                                  <li className="scores_li">{data?.testInnings?.teama?.score}/{data?.testInnings?.teama?.wickets} <span style={{ "font-weight": "normal" }}>({data?.testInnings?.teama?.overs} OV) </span></li> :"(Yet To Bat)"
                                              : ""}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="vs"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/vs.svg" alt="" /></div>
                                        <div className="result-teambox">
                                          <div className="flag">
                                            <object data={teamb_image} type="image/png" style={{ width: '100%' }}>
                                              <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/default-flag.jpg" alt={data['teamb']?.teamfb} />
                                            </object>
                                          </div>
                                          <div className="scoreWrap">
                                            <span className="teamName"><a href="#" id={teamb_match_name || ''}>{team_b_name?.teamfb}</a></span>
                                            <div>
                                              <ul className="scorebox" id={teamb_match_id}>
                                                {data?.teamb?.score && data?.teamb?.wickets ? <li className="scores_li">{data?.teamb?.score}/{data?.teamb?.wickets} <span style={{ "font-weight": "normal" }}>({data?.teamb?.overs} OV) </span></li>:"(Yet To Bat)"}
                                              </ul>
                                              <ul className="scorebox" id={teamb_match_id_test}>
                                                {data?.testInnings?.teamb?.score ?
                                                  data?.testInnings?.teamb?.score && data?.testInnings?.teamb?.wickets ?
                                                    <li className="scores_li">{data?.testInnings?.teamb?.score}/{data?.testInnings?.teamb?.wickets} <span style={{ "font-weight": "normal" }}>({data?.testInnings?.teamb?.overs} OV) </span></li>
                                                    : "(Yet To Bat)"
                                                : ""}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                                <div className="result-col-r">
                                  <span className="cn-rsltHead2">यह भी देखें:</span>
                                  <ul className="alsocheck">
                                    <li><a href={Match_Full_ScoreCard}>स्कोरकार्ड</a></li>
                                    <li><a href={Match_Commentary}>मैच कॉमेंट्री</a></li>
                                    {data?.blog_url && (
                                      <li>
                                        <a href={`${data?.blog_url}`}>LIVE BLOG </a>
                                      </li>
                                    )}
                                    <li><a href={Match_Squads}>स्क्वॉड</a></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }

                    }) : (<div className="CN-result-row">
                      <div className="vsp15">फिलहाल कोई मैच लाइव नहीं है.</div>
                    </div>)
                  }

                  <LatestNews latestData={data?.latestStories} isMobile={false} />

                  <p className="pageContent">
                    क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में और तकरीबन हर घंटे खेला जाता है.
                    3 अलग-अलग फॉर्मेट में खेला जाने वाला यह खेल 3 घंटे से लेकर 5 दिन तक चलता है.
                    रोज कई तरह के रिकॉर्ड टूटते और बनते हैं. प्रमुख मैचों के लाइव स्कोर (Live-score) यहां देखे जा सकते हैं.
                    इसके अलावा मैच रिपोर्ट, लाइव अपडेट्स, गेंद दर गेंद कॉमेंट्री और नवीनतम आंकड़े यहां देख सकते हैं.
                  </p>
                  <Taboola
                    mode={TaboolaList.category.bottom.mode}
                    id={TaboolaList.category.bottom.id}
                    container={TaboolaList.category.bottom.container}
                    placement={TaboolaList.category.bottom.placement}
                  />
                </div>

                <div className="CN-sec-r">
                  <ScoreRHS pageAds={pageAds} isIpl="" isT20="" recent="" upcoming={data?.upcoming || ''} url={"/cricket/live-score/"} predictorData={data?.predictorData} taboola ={true} taboolaList={TaboolaList.category}/>
                  {typeof pageAds !== "undefined" &&
                    typeof pageAds?.PG_Slider_1x1 !== "undefined" ? (
                    // <SiteAd
                    //   slotId="PG_Slider_1x1"
                    //   adUnit={pageAds?.PG_Slider_1x1}
                    //   sizes={[[1, 1]]}
                    //   removeAdSpan={true}
                    //   loadonScroll={true}
                    // />
                    <NewSiteAd
                      slotId="PG_Slider_1x1"
                      adUnit={pageAds?.PG_Slider_1x1}
                      sizes={[[1, 1]]}
                      removeAdSpan={true}
                      loadOnScroll={true}
                    />
                  ) : null}
                  {typeof pageAds.PG_1x1_2 !== "undefined" &&
                    pageAds.PG_1x1_2 !== "" ? (
                    // <SiteAd
                    //   slotId="PG_1x1_2"
                    //   adUnit={pageAds.PG_1x1_2}
                    //   sizes={[[1, 1]]}
                    //   removeAdSpan={true}
                    //   loadonScroll={true}
                    // />
                    <NewSiteAd
                      slotId="PG_1x1_2"
                      adUnit={pageAds.PG_1x1_2}
                      sizes={[[1, 1]]}
                      removeAdSpan={true}
                      loadOnScroll={false}
                    />
                  ) : null}
                </div>
              </div>

              {pageAds?.BTF_728 ? (
                <div className="ad-container">
                  {/* <SiteAd
                    width={728}
                    height={90}
                    slotId={`commentary-ad-0`}
                    adUnit={pageAds?.BTF_728}
                    sizes={[[728, 90], [1, 1]]}
                    removeAdSpan={true}
                    loadonScroll={true}
                  ></SiteAd> */}
                  <NewSiteAd
                    width={728}
                    height={90}
                    slotId={`commentary-ad-0`}
                    adUnit={pageAds?.BTF_728}
                    sizes={[[728, 90], [1, 1]]}
                    removeAdSpan={true}
                    loadOnScroll={true}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <style jsx global>{`
	        
            .CN-breadcum {
              font-size: 14px;
              font-family: 'Mukta',sans-serif !important;
              line-height: 13px;
              color: #292929;
              text-transform: uppercase;
              padding: 4px 0;
              border-bottom: 1px dotted #939393;
              margin-bottom: 18px;
            }
            .CN-breadcum a:hover{
              color:red !important;
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
            .CN-pageCN-scoreCardsection {
              min-height: 60px;
              background: rgb(0 0 0 / 13%);
              margin-top: 10px;
            }
            .scoreHeading1 {
              color: #464646;
              // font-size: 20px;
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
              font-family: 'Mukta',sans-serif !important;
              text-transform: uppercase;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .CN-pageOutter {
              // background: #f5f5f5;
              margin-bottom: 20px;
              padding: 0 10px;
            }
            .CN-pageWrapper {
              max-width: 1284px;
              margin: 0 auto;
              // padding: 0 20px;
              background: #fff;
              clear: both !important;
            }
            .CN-SeriesWrap {
              padding-top: 18px !important; 
            }
            .CN-pageCN-scoreCardsection {
              min-height: 60px;
              background: rgb(0 0 0 / 13%);
              margin-top: 10px;
            }
    
            .CN-scoreCardsection {
              background: #f5f5f5;
              padding: 0 15px;
            }
            .CN-section {
              font-family: 'Mukta',sans-serif !important;
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
            a,p {
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
            body .CN-pageWrapper > div {
              margin-bottom: 0px!important;
          }
        
        .CN-heading-1 {
          border-bottom: 3px solid #e1261d;
          margin-bottom: 10px;
        }
        .CN-heading-1 .headinner {
          font-size: 22px;
          line-height: 20px;
          color: #e1261d;
          background: #fff;
          position: relative;
          top: 10px;
          padding-right: 4px;
          display: inline-block;
          font-family: 'Mukta',sans-serif;
          text-transform: uppercase;
          font-weight: bold;
          border-bottom: 1px solid transparent;
        }
    
     
        .CN-result-main .CN-result-row {margin-bottom: 20px;}
        .CN-result-main .CN-result-row .header {padding: 0 10px ; border-bottom: 1px solid #D8D8D8; }
        .CN-result-main .CN-result-row .CN-result-heading {font-size: 14px; margin-bottom: 3px; text-transform: uppercase; line-height: 17px; padding-left: 15px; position: relative; margin:8px 0; }
        .CN-result-main .CN-result-row .CN-result-heading::before {content: ''; border-bottom: 1px solid #000000; border-right: 1px solid #000000; width: 5px; height: 5px; transform: rotate(-45deg); position: absolute; left: 0; top: 6px; }
        .CN-result-main .CN-result-row .header .result-col-lWrap {background: #f5f5f5; padding: 8px 10px; position: relative; }
        .CN-result-main .CN-result-row .header .result-col-lWrap::before{content:'';width:100%;height:4px;position:absolute; top:0; left:0;background:#E1261D;}

.CN-result-main .CN-result-row .alsocheck li {width:50%;margin-bottom: 10px;font-size: 11px;color: #aaaaaa;text-transform: uppercase;position: relative;padding-left: 8px;}
.CN-result-main .CN-result-row .alsocheck li:last-child {margin-bottom:0;}
.CN-result-main .CN-result-row .alsocheck li a{color: #E1261D;}
.CN-result-main .CN-result-row .alsocheck li::before{content: '';width: 3px;height: 3px;border-radius: 50%;background: #aaaaaa;position: absolute;left: 0;top: 50%;transform: translate(0, -50%);}

.heading_title h2{
  font-weight: 700;
    background: #fff;
    position: relative;
    z-index: 1;
    display: inline-block;
    padding-right: 5px;
}
.vsp15{
  margin-top: 15px
}
.heading_title:after{
  content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    background: #FF0000;
    bottom: 2px;
    left: 0;
}
.result-teamWrap {margin-top:0 ;display: flex;justify-content: center;padding: 10px 0;border-bottom: 1px solid #D8D8D8;align-items: center;}
.result-teamWrap .vs{width: 40px;text-align: center;height: 40px;box-sizing: border-box;border-radius: 50%;line-height: 49px;display: flex;justify-content: center;align-items: center;}
.result-teamWrap .vs img{width: 15px;}
.result-teamWrap .payer-thumb {text-align: center;}
.result-teamWrap .payer-thumb .teamName {font-size: 14px;line-height: 15px;text-transform: uppercase;text-align: center;margin-bottom: 3px;}
.result-teamWrap .payer-thumb .teamName a {color: #001D42;}
.result-teamWrap .payer-thumb .teamflag{margin-bottom: 4px;width: 72px;margin-left: auto;margin-right: auto}
.result-teamWrap .payer-thumb .teamflag img{width:100%; display: block;}
.result-teamWrap .payer-thumb .match-score {margin-bottom:12px;}
.result-teamWrap .payer-thumb .match-score:last-child {margin-bottom:0;}
.result-teamWrap .payer-thumb .match-score .teamRun {color: #000;font-size: 18px;line-height: 30px;text-transform: uppercase;}
.result-teamWrap .payer-thumb .match-score .inning-txt {color:#606060;font-size: 12px;text-transform: uppercase;line-height: 15px;}
.result-teamWrap .payer-thumb:first-child{margin-right:30px;}
.result-teamWrap .payer-thumb:last-child{margin-left:30px;}
.rs-inner {
  line-height:1.1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-bottom: 10px;
}

article, aside, div, figure, form, h1, h2, h3, h4, h5, h6, li, p, section, ul {
  font-family: 'Mukta',sans-serif !important;
  box-sizing: border-box;
  font-size: inherit;
}
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.news_page {width: 100%;background: #F5F5F5;  overflow: hidden; }
.news_page_left {      font-family: 'Fira Sans';   width:924px;     float: left; }  
.news_page_right {     width: 300px;     float: right;     position: relative; } 
.news_page .container {background: #fff;overflow: hidden;}

.heading_title {font-family: 'Fira Sans';font-weight: normal;padding: 0;position: relative;margin-bottom: 10px;font-size: 22px;color: #E1261D;}
.heading_title h2 {font-weight: 700;    background: #fff;position: relative;z-index: 1;display: inline-block; padding-right: 5px;}
.heading_title:after {content: '';position: absolute;width: 100%;height: 3px;background: #FF0000;bottom: 2px;left: 0;}

.tab_links {background: #F5F5F5; display: flex; border-top: 1px solid #CCCCCC; border-bottom: 1px solid #CCCCCC; margin: 14px 0; }
.tab_links a {font-size: 13px; font-family: 'Fira Sans'; padding: 13px 15px; display: block; text-transform: uppercase; }
.tab_links a.active {border-bottom: 3px #E1261D solid; color: #E1261D; font-weight: 700; }

.teamRanking {width: 100%; border-collapse: collapse; border-spacing: 0;    margin-bottom: 30px; }
.teamRanking tr th {background: #001D42; color: #fff; font-size: 11px; text-transform: uppercase; font-family: 'Fira Sans'; padding: 14px 0; padding-right: 10px; }
.teamRanking tr th:nth-child(1) {text-align: left; padding-left: 20px; }
.teamRanking tr th:nth-child(2) {width: 40%; text-align: left; }

.teambox a {display: flex; align-items: center; }
.teamRanking tbody tr td:nth-child(1) {text-align: left; padding-left: 20px;    width: 10%; }
.teamRanking tbody tr {text-align: center; border-bottom: 1px solid #D8D8D8; background: #F5F5F5; height: 50px; vertical-align: middle; font-family: 'Fira Sans'; }
.teamRanking tbody tr td {font-size: 13px; padding-top: 5px; padding-bottom: 5px; text-align: center; vertical-align: middle; color: #202020;    text-transform: uppercase; }
.teambox h3 {font-weight: normal;}
.teamRanking tbody tr.active {background: #fff;}
   .teamRanking tbody tr.active td {font-size: 17px; font-weight: 600; text-transform: uppercase; }
.active .teamrname {font-weight: bold;}

.result-teamWrap .rs-inner .result-teambox .scoreWrap .teamName a {
  color: #7B7B7B;
}

.CN-result-row {
width: 100%;
margin-bottom: 30px;
overflow: hidden;
}

.CN-result-heading {
font-size: 17px;
margin-bottom: 3px;
text-transform: uppercase;
line-height: 17px;
padding-left: 15px;
position: relative;
margin-top: 12px;
}

.CN-result-heading:after {
content: '';
border-bottom: 1px solid #000000;
border-right: 1px solid #000000;
width: 5px;
height: 5px;
transform: rotate(
-45deg
);
position: absolute;
left: 0;
top: 6px;
}

.result-box {
display: flex;
padding: 15px;
background: #F5F5F5;
position: relative;
border-bottom: 1px solid #D2D2D2;
margin-bottom: 5px;
}

.result-col-l {
width: 80%;
padding-right: 15px;
border-right: 1px solid #CCCCCC;
}

.cn-rsltHead1 {
font-size: 15px;
color: #001D42;
margin-bottom: 10px;
}

.cn-rsltCont {
font-size: 13px;
}

.result-teamWrap {
margin-left: -15px;
border: 1px solid #D2D2D2;
background: #fff;
padding: 12px 15px 0;
}

.result-col-r {
padding-left: 15px;
}

.rs-inner {
display: flex;
padding-bottom: 10px;
}

.result-teambox {
display: flex;
width: 308px;
}

.flag {
width: 72px;
margin-right:0;
}

.flag img {
width: 100%;
}

.teamName a {
font-size: 15px;
color: #7B7B7B;
font-weight: 400 !important ;
text-transform: uppercase;
display: block;

}

.scorebox {
display: flex;
}

.scorebox li {
font-size: 20px;
font-weight:600;
color: #001D42;
margin-right: 15px;
}

.scorebox li span {
color: #606060;
font-size: 12px;

text-transform: uppercase;
}

.result-box::before {
content: '';
position: absolute;
width: 4px;
height: 100%;
background: #E1261D;
left: 0;
top: 0;
}

.result-teamWrap .rs-inner .vs {
background: none !important;
border: none !important;
filter: brightness(0)  !important;
width: 40px;
text-align: center;
height: 40px;
box-sizing: border-box;
border-radius: 50%;
line-height: 49px;
margin: 0 15px;
display: flex;
align-items: center;
justify-content: center;
}

.cn-rsltHead2 {
color: #606060;
margin-bottom: 10px;
font-size: 12px;
font-weight: bold;
}

.alsocheck li { 
    margin-bottom: 10px;
    font-size: 14px;
    color: #aaaaaa;
    text-transform: uppercase;
    position: relative;
    padding-left: 8px;
}

.alsocheck li::before {
content: '';
width: 3px;
height: 3px;
border-radius: 50%;
background: #aaaaaa;
position: absolute;
left: 0;
top: 50%;
transform: translate(0, -50%);
}

.alsocheck li a {
color: #E1261D;
}


.news_listing {
   display: flex;
   flex-wrap: wrap;
}

.latest_news_img {
   width: 100%;
}

.latest_news_img img {
   width: 100%;
   display: block;
}

.news_listing li {
   width: calc(25% - 15px);
   margin-right: 20px;
   margin-bottom: 20px;
   border-bottom: 1px #939393 dotted;
   padding-bottom: 25px;
}

.discription {
font-size: 15px;
color: #282828;
line-height: 22px;
font-family: 'Fira Sans';
font-weight: 600;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
margin-top: 10px;
}

.news_listing li:nth-child(4n+4) {
margin-right: 0;
}



.flag_icon {width: 72px; height: 49px; background: #FFFFFF 0% 0% no-repeat padding-box; box-shadow: 0px 3px 6px #00000029; border: 1px solid #FFFFFF;    background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/all_flags_big.svg);    background-position: -6px -912px; }

.afghanistan {background-position: -6px 0;}
.england {background-position: -6px -170px;}
.namibia {background-position: -6px -341px;}
.oman {background-position: -6px -513px;}
.scotland {background-position: -6px -683px;}
.west-indies {background-position: -6px -855px;}
.australia {background-position: -6px -56px;}
.india {background-position: -6px -228px;}
.netherlands {background-position: -6px -398px;}
.pakistan {background-position: -6px -569px;}
.south-africa {background-position: -6px -741px;}
.bangladesh {background-position: -6px -114px;}
.ireland {background-position: -6px -285px;}
.new-zealand {background-position: -6px -456px;}
.papua-new-guinea {background-position: -6px -627px;}
.sri-lanka {background-position: -6px -798px;}

.scores_li {
display: block;
padding-top: 4px;
}

.scoreWrap {
margin-left: 10px;
}

.scorebox {
display: block;
}

li.scores_li span {font-weight: normal;}

.pageContent {
  padding: 10px 10px;
  font-size: 16px;
  line-height: 1.5;
}
.cn-morebtn1 {background: #F5F5F5; display: block; text-align: center; font-size: 12px; text-transform: uppercase; color: #e1261d; padding: 11px 0; font-weight: bold; margin-bottom: 15px; }
.news_listing li:nth-last-child(-n+4) {padding-bottom: 0; margin-bottom: 5px; }
`}</style>
        </>
      )}
    </>
  );
};

export default LiveScore;
