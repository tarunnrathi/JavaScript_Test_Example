import SiteAd from "widgets/Common/Responsive/SiteAd";
// import { imageLoader } from "includes/article.util";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const LiveScoreMobile = ({
  data = {},
  pageAds = {},
  livescorecard = {},
  // liveMatchDataIdArr = [],
  updatedResults = [],
}) => {
  const team_default_image =
    "https://images.news18.com/static_news18/pix/ibnhome/news18/default-flag.jpg";
  const IMAGEURL =
    "https://images.news18.com/static_news18/pix/ibnhome/news18/";

  const defaultImg64_110x73 =
    "data:image/jpeg;base64,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";

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
  useEffect(() => {
    const getLiveData = () => {

      // Api to get live match scores and other live match details
      const jsonUrl = "https://cricketnext.nw18.com/sports/csr/feed/live_matches_hi.json";
      fetch(jsonUrl)
        .then((res) => res.json())
        .then((response) => {
          if (typeof response !== "undefined" && response.length) {
            for (let i = 0; i < response.length; i++) {
              const matchData = response[i];
              const matchId = matchData.matchid;

              const scorelive = get_live_team_scores(matchData);
              const teamaname = document.getElementById(
                "teamAName_" + matchId
              ).innerText;
              const teambname = document.getElementById(
                "teamBName_" + matchId
              ).innerText;

              if (teamaname && teambname) {
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
      getLiveData();
    }, 10000);
  }, []);

  if (livescorecard != "undefined") {
    return (
      <>
        <div className="news_page">
          <div className="container">
            <div className="CN-pageCN-scoreCardsection">
              <div className="bet__ad">
                <SiteAd
                  slotId="Mobile_ScoreCard_ad"
                  adUnit={pageAds?.ScoreCard_ad}
                  sizes={[[320, 60]]}
                  width={320}
                  height={60}
                  removeAdSpan={true}
                  lazyload={true}
                />

              </div>
              <div className="CN__scoreCardsection">
                {/* scorecard component */}
                <DynamicCrTopScoreWidgetWithNoSSR isMobile />
              </div>
            </div>
            <div className="clearfix add">
              <div className="addinner-box addinner_box_300x250">
                <SiteAd
                  width={336}
                  height={280}
                  slotId={"mobileAdNew300x250_0"}
                  adUnit={pageAds?.header_ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280]
                  ]}
                ></SiteAd>
              </div>
            </div>

            <div className="news_page_left">
            <BreadcrumbCommon breadCrumbArray={[
                {value: "हिंदी समाचार", slug: "/"},
                {value: "क्रिकेट", slug: "/cricket/"},
                {value: "लाइव स्कोर"}
              ]} />
              <div className="heading_title">
                <h1>लाइव मैच</h1>
              </div>
              {updatedResults && updatedResults?.length ? (
                updatedResults.map((data, i) => {

                  const is_live_status = 1;

                  //get league type
                  const league_type = data["league"];

                  // getting matchid
                  const match_id = data["matchid"];

                  // getting teamA and teamB scoresbox id.
                  const teama_match_id = "teamAscores_A" + match_id + "";
                  const teamb_match_id = "teamBscores_B" + match_id + "";

                  const teama_match_id_test = "teamAscores_Aa" + match_id + "";
                  const teamb_match_id_test = "teamBscores_Bb" + match_id + "";

                  const teama_match_name = "teamAName_" + match_id + "";
                  const teamb_match_name = "teamBName_" + match_id + "";

                  // getting team names.
                  const team_a_name = data["teama"];
                  const team_b_name = data["teamb"];

                  // initializing team flag with default image
                  let teama_image = team_default_image;
                  let teamb_image = team_default_image;

                  // getting team names in english
                  let teama_lower_name = data["teama_eng"]?.toLowerCase() || "";
                  teama_lower_name = teama_lower_name.replace(/ /g, "-");
                  let teamb_lower_name = data["teamb_eng"]?.toLowerCase() || "";
                  teamb_lower_name = teamb_lower_name.replace(/ /g, "-");

                  // intializing full scorecard , commentry and squad url
                  const Match_Full_ScoreCard =
                    "/cricket/live-score/" +
                    teama_lower_name +
                    "-vs-" +
                    teamb_lower_name +
                    "-live-score-full-" +
                    match_id +
                    ".html";
                  const Match_Commentary =
                    "/cricket/live-score/" +
                    teama_lower_name +
                    "-vs-" +
                    teamb_lower_name +
                    "-ball-by-ball-live-commentary-" +
                    match_id +
                    ".html";
                  const Match_Live_Blog =
                    "/cricket/live-score/" +
                    teama_lower_name +
                    "-vs-" +
                    teamb_lower_name +
                    "-live-score-full-" +
                    match_id +
                    ".html";

                  const Match_Squads =
                    "/cricket/live-score/team-squads/" +
                    teama_lower_name +
                    "-vs-" +
                    teamb_lower_name +
                    "-" +
                    match_id +
                    ".html";

                  if (is_live_status == 1) {
                    if (league_type == "ICC" || league_type == "IPL") {
                      teama_image = data?.teama?.s?.flag;
                      teamb_image = data?.teamb?.s?.flag;
                    }

                    let myFormatDate = "";
                    const match_date = data["matchdate_ist"];
                    const t = match_date?.split("/");

                    // getting date of the match
                    if (t?.[2]) {
                      const myDate = new Date(t?.[2], t?.[0] - 1, t?.[1]);
                      myFormatDate =
                        days[myDate.getDay()] +
                        " " +
                        myDate.getDate() +
                        " " +
                        MONTHS[myDate.getMonth()];
                    } else {
                      const myDate = new Date(
                        new Date().getFullYear(),
                        t?.[0] - 1,
                        t?.[1]
                      );
                      myFormatDate =
                        days[myDate.getDay()] +
                        " " +
                        myDate.getDate() +
                        " " +
                        MONTHS[myDate.getMonth()];
                    }
                    return (
                      <>
                        <div className="CN-result-main">
                          <div className="CN-result-row">
                            <div className="header">
                              <h2 className="CN-result-heading">
                                {data["seriesname"]}
                              </h2>
                              <div className="result-col-lWrap">
                                <span className="cn-rsltHead1">
                                  {team_a_name?.teamfa} <span>vs</span> {team_b_name?.teamfb},{" "}
                                  {data["matchno"]}
                                </span>
                                <p className="cn-rsltCont">
                                  • {myFormatDate} • {data["matchtime_ist"]}{" "}
                                  (IST) <br /> • {data["venue"]}{" "}
                                </p>
                              </div>
                            </div>
                            <a
                              href={Match_Full_ScoreCard}
                            >
                              <div className="result-teamWrap">
                                <div className="payer-thumb">
                                  <span className="teamName" id={teama_match_name}>{team_a_name?.teamfa}</span>
                                  <div className="teamflag">
                                    {/*<img src={teama_image} alt={data['teama']} />  */}
                                    <object
                                      data={teama_image}
                                      type="image/png"
                                      style={{ width: "100%" }}
                                    >
                                      <img
                                        src={team_default_image}
                                        alt={data["teama"]?.teamfa}
                                      />
                                    </object>
                                  </div>
                                  <div>
                                    <div className="match-score">
                                      <span className="teamRun">
                                      <ul className="scorebox" id={teama_match_id}>
                                        {data?.teama?.score && data?.teama?.wickets ? <li className="scores_li">{data?.teama?.score}/{data?.teama?.wickets} <span style={{ "font-weight": "normal" }}>({data?.teama?.overs} OV) </span></li>:"(Yet To Bat)"}
                                      </ul>
                                      <ul className="scorebox" id={teama_match_id_test}>
                                        {data?.testInnings?.teama?.score ?
                                          data?.testInnings?.teama?.score && data?.testInnings?.teama?.wickets ?
                                            <li className="scores_li">{data?.testInnings?.teama?.score}/{data?.testInnings?.teama?.wickets} <span style={{ "font-weight": "normal" }}>({data?.testInnings?.teama?.overs} OV) </span></li> :"(Yet To Bat)"
                                        : ""}
                                      </ul>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="vs">
                                  <img
                                    src="https://images.news18.com/static_news18/pix/ibnhome/news18/vs.svg"
                                    alt="vs"
                                  />
                                </div>
                                <div className="payer-thumb">
                                  <span className="teamName" id={teamb_match_name}>{team_b_name?.teamfb}</span>
                                  <div className="teamflag">
                                    <object
                                      data={teamb_image}
                                      type="image/png"
                                      style={{ width: "100%" }}
                                    >
                                      <img
                                        src={team_default_image}
                                        alt={data["teamb"]?.teamfb}
                                      />
                                    </object>
                                  </div>
                                  <div>
                                    <div className="match-score">
                                      <span className="teamRun">
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
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                            <ul className="alsocheck">
                              <li>
                                <a href={Match_Full_ScoreCard}>स्कोरकार्ड</a>
                              </li>
                              <li>
                                <a href={Match_Commentary}>मैच कॉमेंट्री</a>
                              </li>
                              {data?.blog_url && (
                                <li>
                                  <a href={`${data?.Match_Live_Blog|| '/'}`}>LIVE BLOG </a>
                                </li>
                              )}
                              <li>
                                <a href={Match_Squads}>स्क्वॉड</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    );
                  }
                })
              ) : (
                <div className="vsp15">फिलहाल कोई मैच लाइव नहीं है.</div>
              )}
              <div className="clearfix add">
                <div className="addinner-box addinner_box_300x250">
                  <SiteAd
                    width={300}
                    height={280}
                    slotId={"mobileAdNew300x250_1"}
                    adUnit={pageAds?.ATF_300}
                    lazyload={true}
                    sizes={[
                      [300, 250],
                      [336, 280],
                    ]}
                  ></SiteAd>
                </div>
              </div>
              <div className="latest_news">
                <div className="heading_titleh2">
                  <h2>लेटेस्ट न्यूज</h2>
                </div>
                <ul className="latest_news_list">
                  {data?.latestStories.map((catdata, index) => {
                    const imageUrl =
                      typeof catdata.images.url !== "undefined" &&
                      catdata.images.url != ""
                        ? catdata.images.url
                        : IMAGEURL + "images/default-110x73.jpg";
                    return (
                      <React.Fragment key={`categoryList-${index + 1}`}>
                        <li>
                          <a href={catdata.weburl_r}>
                            <h3 className="story_title">{catdata.display_headline}</h3>
                            <div className="story_img">
                              <img
                                src={defaultImg64_110x73} //setDefaultimage
                                data-src={imageUrl}
                                width={110}
                                height={73}
                                alt={catdata.display_headline}
                                title={catdata.display_headline}
                                className="lazyload"
                              />
                            </div>
                          </a>
                        </li>
                      </React.Fragment>
                    );
                  })}

                  <div className="more_story">
                    <a href="/cricket/news/">आर्काइव</a>
                  </div>
                </ul>

                <div className="clearfix add">
                  <div className="addinner-box addinner_box_300x250">
                    <SiteAd
                      width={300}
                      height={250}
                      slotId={"mobileAdNew300x250"}
                      adUnit={pageAds?.BTF_300}
                      sizes={[
                        [300, 250],
                        [336, 280],
                      ]}
                      lazyload={true}
                    ></SiteAd>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <LatestNews latestData={data?.latestStories} isMobile={true}/> */}
          <p className="pageContent">
            क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में और तकरीबन हर घंटे
            खेला जाता है. 3 अलग-अलग फॉर्मेट में खेला जाने वाला यह खेल 3 घंटे से
            लेकर 5 दिन तक चलता है. रोज कई तरह के रिकॉर्ड टूटते और बनते हैं.
            प्रमुख मैचों के लाइव स्कोर (Live-score) यहां देखे जा सकते हैं. इसके
            अलावा मैच रिपोर्ट, लाइव अपडेट्स, गेंद दर गेंद कॉमेंट्री और नवीनतम
            आंकड़े यहां देख सकते हैं.
          </p>
          <div className="outbrain_row">
          <Taboola
            mode={TaboolaList.category.bottom.mode}
            id={TaboolaList.category.bottom.id}
            container={TaboolaList.category.bottom.container}
            placement={TaboolaList.category.bottom.placement}
    />
          </div>
          {typeof pageAds.PG_1x1_2 !== "undefined" &&
          pageAds.PG_1x1_2 !== "" ? (
            <SiteAd
              slotId="PG_1x1_2"
              adUnit={pageAds.PG_1x1_2}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadonScroll={true}
            />
          ) : null}
          {typeof pageAds.PG_1x1_3 !== "undefined" &&
          pageAds.PG_1x1_3 !== "" ? (
            <SiteAd
              slotId="PG_1x1_3"
              adUnit={pageAds.PG_1x1_3}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadonScroll={true}
            />
          ) : null}
        </div>

        <style jsx>{`
          article,
          aside,
          div,
          figure,
          form,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          li,
          p,
          section,
          ul {
            box-sizing: border-box;
            font-size: inherit;
          }
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .CN__scoreCardsection {
            // padding: 0 5px;
            margin-right: 10px;
          }
          .CN-pageCN-scoreCardsection {
            min-height: 115px;
            background: rgb(0 0 0 / 13%);
          }
          .bet__ad {
            background: #fff;
          }
          .vsp15 {
            margin-top: 15px;
          }
          .clearfix {
            clear: both;
          }
          .CN__scoreCardsection {
            margin-right:0 !important;
          }
          
          .add {
            background: #dbdde3;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
            margin-bottom: 10px;
            display: inline-block;
            width: 100%;
            z-index: 1;
            color: #797e90 !important;
            //height: 300px;
            overflow: hidden;
          }
          .addinner-box {
            //background: #e8e9ed;
            background: #dbdde3;
            min-width: 250px;
            display: inline-block;
            margin: 0 auto;
            text-align: center;
            min-height: auto;
            padding: 0;
            box-sizing: border-box;
            color: #797e90 !important;
            font-size: 11px;
            line-height: 16px;
          }

          // div.addinner_box_300x250 {
          //   height: 268px;
          //   width: 300px;
          // }
          .pageContent {
            padding: 10px 10px;
            font-size: 16px;
            line-height: 1.5;
          }

          .news_page {
            width: 100%;
            background: #f5f5f5;
            overflow: hidden;
          }
          .news_page_left {
            font-family: "Mukta", sans-serif;
            width: 100%;
            float: left;
          }
          .news_page_right {
            width: 300px;
            float: right;
            position: relative;
          }
          .container {
            max-width: 1284px;
            margin: auto;
            padding: 0px;
          }
          .news_page .container {
            background: #fff;
            overflow: hidden;
          }

          .brade_crum > ul {
            display: flex;
            padding-bottom: 5px;
            color: #969696;
            align-items: center;
            border-bottom: 1px #ccc dotted;
            padding: 5px 0;
          }
          .brade_crum li {
            text-transform: uppercase;
            display: flex;
            align-items: center;
            font-weight: normal;
            font-size: 11px;
            padding: 0 4px;
            color: #282828;
          }
          .brade_crum > li a {
            color: #969696;
            text-decoration: none;
          }
          .brade_crum > li:first-child {
            padding-left: 0;
          }

          .brade_crum h1{
            color:#969696
          }

          .heading_title {
            background: #ed2128;
            text-align: left;
            padding-left: 10px;
            height: 36px;
            line-height: 36px;
            font-size: 18px;
            color: #fff;
            display: flex;
            align-items: center;
          }
          .heading_title h2 {
            font-size: 18px;
            text-transform: uppercase;
            font-family: "Recursive", sans-se;
          }

          .CN-result-main .CN-result-row {
            margin-bottom: 20px;
          }
          .CN-result-main .CN-result-row .header {
            padding: 0 10px;
            border-bottom: 1px solid #d8d8d8;
            display: flex;
            flex-direction: column;
            height: auto;
          }
          .CN-result-main .CN-result-row .CN-result-heading {
            margin-bottom: 3px;
            text-transform: uppercase;
            line-height: 17px;
            padding-left: 15px;
            position: relative;
            margin: 8px 0;
            width: 100%;
          }
          .CN-result-main .CN-result-row .CN-result-heading::before {
            content: "";
            border-bottom: 1px solid #000000;
            border-right: 1px solid #000000;
            width: 5px;
            height: 5px;
            transform: rotate(-45deg);
            position: absolute;
            left: 0;
            top: 6px;
          }
          .CN-result-main .CN-result-row .header .result-col-lWrap {
            background: #f5f5f5;
            padding: 8px 10px;
            position: relative;
            width: 100%;
          }
          .CN-result-main .CN-result-row .header .result-col-lWrap::before {
            content: "";
            width: 100%;
            height: 4px;
            position: absolute;
            top: 0;
            left: 0;
            background: #e1261d;
          }

          .CN-result-main
            .CN-result-row
            .header
            .result-col-lWrap
            .cn-rsltHead1 {
            font-size: 14px;
            color: #001d42;
          }
          .CN-result-main
            .CN-result-row
            .header
            .result-col-lWrap
            .cn-rsltCont {
            color: #464646;
            font-size: 14px;
            line-height: 22px;
          }
          .result-teamWrap {
            display: flex;
            justify-content: center;
            padding: 10px 0;
            border-bottom: 1px solid #d8d8d8;
            align-items: center;
          }
          .result-teamWrap .vs {
            background: none;
            border:none;
            filter: brightness(0) ;
            width: 40px !important;
            text-align: center;
            height: 40px;
            box-sizing: border-box;
            border-radius: 50%;
            line-height: 49px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .result-teamWrap .vs img {
            width: 15px;
          }
          .result-teamWrap .payer-thumb {
            text-align: center;
          }
          .result-teamWrap .payer-thumb .teamName {
            font-size: 14px;
            line-height: 15px;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 3px;
          }
          .result-teamWrap .payer-thumb .teamName a {
            color: #001D42;
          }
          .result-teamWrap .payer-thumb .teamflag {
            margin-bottom: 4px;
            width: 55px;
            height:32px;
            margin-left: auto;
            margin-right: auto;
          }
          .result-teamWrap .payer-thumb .teamflag img {
            width: 100%;
            display: block;
          }
          .result-teamWrap .payer-thumb .match-score {
            height:28px;
            margin-bottom: 12px;
          }
          .result-teamWrap .payer-thumb .match-score:last-child {
            margin-bottom: 0;
          }
          .result-teamWrap .payer-thumb .match-score .teamRun {
            color: #001d42;
            font-size: 18px;
            font-weight:bold;
            line-height: 30px;
            text-transform: uppercase;
          }
          .result-teamWrap .payer-thumb .match-score .inning-txt {
            color: #606060;
            font-size: 12px;
            text-transform: uppercase;
            line-height: 15px;
          }
          .result-teamWrap .payer-thumb:first-child {
            margin-right: 30px;
          }
          .result-teamWrap .payer-thumb:last-child {
            margin-left: 30px;
          }
          .CN-result-main .CN-result-row .alsocheck {
            display: flex;
            flex-wrap: wrap;
            margin: 0 10px;
            background: #f5f5f5;
            padding: 10px 10px 0;
            border-bottom: 1px solid #d8d8d8;
          }
          .CN-result-main .CN-result-row .alsocheck li {
            width: 50%;
            margin-bottom: 5px;
            font-size: 11px;
            color: #E1261D;
            text-transform: uppercase;
            position: relative;
            padding-left: 8px;
          }
          .CN-result-main .CN-result-row .alsocheck li:last-child {
            margin-bottom: 0;
          }
          .CN-result-main .CN-result-row .alsocheck li a {
            font-size:14px;
            color: #E1261D;
          }
          .CN-result-main .CN-result-row .alsocheck li::before {
            content: "";
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: #aaaaaa;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(0, -50%);
          }
          .series-banner {
            margin-bottom: 10px;
          }
          .series-banner img {
            display: block;
            width: 100%;
          }

          .story_title {
            color: #282828;
            font-size: 14px;
            line-height: 24px;
            font-weight: normal;
            padding-right: 10px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            width: calc(100% - 110px);
          }

          ul.latest_news_list li {
            background: #f5f5f5;
            margin-bottom: 5px;
            padding: 10px;
          }


          ul.latest_news_list li a {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          ul.latest_news_list li:first-child a {
           display:block;
          }
          
          .story_img {
            width: 110px;
            height: 73px;
          }
          ul.latest_news_list li:first-child .story_img{
                      width:100%;
                      height:auto;
          }
          ul.latest_news_list li:first-child .story_img img{
            width:100%;
            height:auto;
          }
           ul.latest_news_list li:first-child .story_title  {
            font-weight:bold;
            font-size:20px;
            line-height:26px;
            padding:10px 0;
            width:100%;

          }
          .story_img img {
            width: 100%;
            display: block;
          }

          .heading_titleh2 {

            width: 100%;
            height: 32px;
            background: #0a2040 0% 0% no-repeat padding-box;
            text-align: center;
            line-height: 32px;
            letter-spacing: 0px;
            color: #ffffff;
            font-size: 16px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: start;
          }

          .heading_titleh2 h2 {
            font-size: 16px;
            padding-left:15px;
          }

          .more_story {
            background: #f5f5f5;
            margin-bottom: 5px;
            padding: 10px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .more_story a {
            width:240px;
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 2px solid #e1261c;
            border-radius: 30px;
            line-height: 32px;
            letter-spacing: 0px;
            color: #e1261c;
            text-transform: uppercase;
            font-size: 13px;
            font-family: "Recursive", sans-serif;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
          }

          .flag {
            width: 45px;
            height: 30px;
            border: 1px solid #fff;
            box-shadow: 0 0 6px #00000029;
            background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/all_flags_big.svg);
            background-position: -3px -1124px;
            background-size: 49px;
            display: table;
            margin: 0 auto;
            margin-bottom: 6px;
          }
          .flag.afghanistan {
            background-position: -3px 0;
          }
          .flag.england {
            background-position: -3px -103px;
          }
          .flag.namibia {
            background-position: -3px -205px;
          }
          .flag.oman {
            background-position: -3px -308px;
          }
          .flag.scotland {
            background-position: -3px -411px;
          }
          .flag.west-indies {
            background-position: -3px -1090px;
          }
          .flag.australia {
            background-position: -3px -34px;
          }
          .flag.india {
            background-position: -3px -137px;
          }
          .flag.netherlands {
            background-position: -3px -240px;
          }
          .flag.pakistan {
            background-position: -3px -343px;
          }
          .flag.south-africa {
            background-position: -3px -445px;
          }
          .flag.bangladesh {
            background-position: -3px -69px;
          }
          .flag.ireland {
            background-position: -3px -171px;
          }
          .flag.new-zealand {
            background-position: -3px -274px;
          }
          .flag.papua-new-guinea {
            background-position: -3px -377px;
          }
          .flag.sri-lanka {
            background-position: -3px -480px;
          }


          .tab_links {
            background: #f5f5f5;
            display: flex;
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            margin: 14px 0;
          }
          .tab_links a {
            font-size: 13px;
            padding: 13px 10px;
            display: block;
            text-transform: uppercase;
          }
          .tab_links a.active {
            border-bottom: 3px #e1261d solid;
            color: #e1261d;
            font-weight: 700;
          }

          .teamRanking {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
          }
          .teamRanking tr th {
            background: #001d42;
            color: #fff;
            font-size: 10px;
            text-transform: uppercase;
            font-family: "Recursive", sans-serif;
            padding: 8px 6px;
            padding-right: 10px;
          }
          .teamRanking tr th:nth-child(1) {
            text-align: left;
            padding-left: 10px;
          }
          .teamRanking tr th:nth-child(2) {
            width: 40%;
            text-align: left;
          }

          .teambox a {
            display: flex;
            align-items: center;
            text-decoration: underline;
            text-align: left;
          }
          .teamRanking tbody tr td:nth-child(1) {
            text-align: left;
            padding-left: 10px;
          }
          .teamRanking tbody tr {
            text-align: center;
            border-bottom: 1px solid #d8d8d8;
            background: #f5f5f5;
            height: 50px;
            vertical-align: middle;
          }
          .img.big img {
            margin-right: 10px;
          }
          .teamRanking tbody tr td {
            font-size: 13px;
            padding-top: 5px;
            padding-bottom: 5px;
            text-align: center;
            vertical-align: middle;
            color: #202020;
            text-transform: uppercase;
          }
          .teambox h3 {
            font-weight: bold;
            font-family: "Recursive", sans-serif;
          }
          .teamRanking tbody tr.active {
            background: #fff;
          }
          .teamRanking tbody tr.active td {
            font-size: 17px;
            font-weight: 600;
            text-transform: uppercase;
          }
          .scorebox{
            line-height:1;
          }
        `}</style>
      </>
    );
  }
};

export default React.memo(LiveScoreMobile);
