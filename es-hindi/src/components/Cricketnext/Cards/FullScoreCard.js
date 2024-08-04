import { useEffect } from "react";
import LazyImage from "components/Common/LazyLoadImage";
import getConfig from "next/config";
import SocialSharing from "./SocialSharing";
import SuperOverWidget from "./SuperOverWidget";

const { publicRuntimeConfig } = getConfig();

const FullScoreCard = ({ score = {}, data = {}, id, url, isMobile, isAmp }) => {
  if(!data?.teams) {
    return null;
  }
  const { flagHolder, capHolder } = publicRuntimeConfig;

  useEffect(() => {
    const shareicon = {
      shareBtn: document.querySelector(".fxt_btn"),
      shareToggle: document.querySelector(".fxt_share"),
      doToggle: function (e) {
        e.preventDefault();
        this.shareToggle.classList.toggle("expanded");
      },
    };
    shareicon?.shareBtn?.addEventListener("click", function (e) {
      shareicon.doToggle(e);
    });
  }, []);

  const isTestMatch =
    data.matchType &&
    (data.matchType === "टेस्ट" ||
      data.matchType === "warm-up टेस्ट" ||
      data.matchType === "टेस्ट" ||
      data.matchType === "first-class" ||
      data.matchType === "first-class");

  const firstInnings = data?.firstInnings || {};
  const secondInnings = data?.secondInnings || {};
  const thirdInnings = data?.thirdInnings || {};
  const fourthInnings = data?.fourthInnings || {};

  const battingTeamCaptainDetails = Object.keys(data?.teams)?.length > 0 && data?.teams[firstInnings?.battingTeamId]?.captain || {};
  const bowlingTeamCaptainDetails = Object.keys(data?.teams)?.length > 0 && data?.teams[firstInnings?.Bowlingteam_id]?.captain || {};

  const teamAData = firstInnings?.Equation || {};
  const teamBData = secondInnings?.Equation || {};
  const teamCData = thirdInnings?.Equation || {};
  const teamDData = fourthInnings?.Equation || {};

  return (
    <>
      <div className="CN-Score-widget">
        <span className="mtsts">
          <span className="matchStatus">{data.status}</span>
        </span>
        <div className="fxt_share" data-amp-bind-class="visible ? 'fxt_share expanded' : 'fxt_share'" role="button" tabIndex="0" on="tap:AMP.setState({visible: !visible})">
          <img
            className="fxt_btn"
            src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/share-icon.svg"
          />
          <SocialSharing
            url={url}
            title={data.title}
          />
        </div>
        <div className="match-headingwrap">
          <h3 className="heading-1">{`${data.teama} vs ${
              data.teamb
            } मैच स्कोरकार्ड (${data?.matchType?.replace(
              "WARM-UP ODI",
              "WARM-UP"
            )})`}</h3>
          <h3 className="heading-2">{data.venue_mov}</h3>
        </div>
        <div className="socrebox">
          <div className="scrbxinr widget-team-one">
          {!isMobile ? 
            <>
              <div className="tmtx">
                <h3 className="teamName">
                  <a href="#">{firstInnings.Battingteam}</a>
                </h3>
                <div className="matchScore">
                  {isTestMatch && (
                    <div className="inning-txt inning-L">1st INN</div>
                  )}
                  <h4 className="teamRun scoreInnFirstL">
                    {teamAData?.Total}/{teamAData?.Wickets}
                  </h4>
                </div>
                <p className="teamRunRate runRateInnFirstL">
                  ({teamAData?.Overs}) RR {teamAData?.Runrate}
                </p>
                {isTestMatch && thirdInnings && thirdInnings.status === 1 && (
                  <>
                    <div className="matchScore">
                      <div className="inning-txt inning-L">2nd INN</div>
                      <h4 className="teamRun scoreInnSecondL">
                        {teamCData?.Total}/{teamCData?.Wickets}
                      </h4>
                    </div>
                    <p className="teamRunRate runRateInnSecondL">
                      ({teamCData?.Overs}) RR {teamCData?.Runrate}
                    </p>
                  </>
                )}
              </div>
              <div className="team-imgwrap">
                <LazyImage
                  className="teamflag"
                  src={`${publicRuntimeConfig.cricketImageFlagBase}${firstInnings.battingTeamId}.png`}
                  alt={data?.teamfa}
                  title={data?.teamfa}
                  dontAlter={true}
                  holder={flagHolder}
                  height={65}
                  width={102}
                  greed={false}
                />

                <span className="player-thumb">
                  <LazyImage
                    src={`${publicRuntimeConfig.cricketImageProfileBase}${battingTeamCaptainDetails?.id}.png`}
                    alt={battingTeamCaptainDetails?.name}
                    title={battingTeamCaptainDetails?.name}
                    dontAlter={true}
                    holder={capHolder}
                    height={64}
                    width={64}
                    greed={false}
                  />
                </span>
              </div>
            </> 
            :   
            <>          
              <div className="team-imgwrap">
                <LazyImage
                  className="teamflag"
                  src={`${publicRuntimeConfig.cricketImageFlagBase}${firstInnings.battingTeamId}.png`}
                  alt={data?.teamfa}
                  title={data?.teamfa}
                  dontAlter={true}
                  holder={flagHolder}
                  height={40}
                  width={72}
                  greed={false}
                />

                <span className="player-thumb">
                  <LazyImage
                    src={`${publicRuntimeConfig.cricketImageProfileBase}${battingTeamCaptainDetails?.id}.png`}
                    alt={battingTeamCaptainDetails?.name}
                    title={battingTeamCaptainDetails?.name}
                    dontAlter={true}
                    holder={capHolder}
                    height={44}
                    width={44}
                    greed={false}
                  />
                </span>
              </div>
              <div className="tmtx">
                <h3 className="teamName">
                  <a href="#">{firstInnings.Battingteam}</a>
                </h3>
                <div className="matchScore">
                  {isTestMatch && (
                    <div className="inning-txt inning-L">1st INN</div>
                  )}
                  <h4 className="teamRun scoreInnFirstL">
                    {teamAData?.Total}/{teamAData?.Wickets}
                  </h4>
                </div>
                <p className="teamRunRate runRateInnFirstL">
                  ({teamAData?.Overs}) RR {teamAData?.Runrate}
                </p>
                {isTestMatch && thirdInnings && thirdInnings.status === 1 && (
                  <>
                    <div className="matchScore">
                      <div className="inning-txt inning-L">2nd INN</div>
                      <h4 className="teamRun scoreInnSecondL">
                        {teamCData?.Total}/{teamCData?.Wickets}
                      </h4>
                    </div>
                    <p className="teamRunRate runRateInnSecondL">
                      ({teamCData?.Overs}) RR {teamCData?.Runrate}
                    </p>
                  </>
                )}
              </div>
            </>}
          </div>
          <div className="vs">
            {isAmp ? <amp-img
              src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/vs-icon-3.png"
              alt="v/s"
              width={15}
              height={24}
            /> : <LazyImage
              src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/vs-icon-3.png"
              alt="v/s"
              width={15}
              height={24}
              greed={false}
              dontAlter={true}
            />}
          </div>
          {!isMobile && data.isso && data.isso == "no" && (
            <div className="final-resultbtn ">
              {score?.equation || data?.equation || data?.Toss_mov}
            </div>
          )}{" "}

          <div className="scrbxinr widget-team-two">
            <div className="team-imgwrap">
              {isAmp ? <amp-img
                src={`${publicRuntimeConfig.cricketImageFlagBase}${firstInnings.Bowlingteam_id}.png`}
                alt={data?.teamfb}
                title={data?.teamfb}
                height={isMobile ? 40 : 65}
                width={isMobile ? 72 : 102}
                className="teamflag"
              /> : <LazyImage
                className="teamflag"
                src={`${publicRuntimeConfig.cricketImageFlagBase}${firstInnings.Bowlingteam_id}.png`}
                alt={data?.teamfb}
                title={data?.teamfb}
                dontAlter={true}
                holder={flagHolder}
                height={isMobile ? 40 : 65}
                width={isMobile ? 72 : 102}
                greed={false}
              />}
              <span className="player-thumb">
                {isAmp ? <amp-img src={
                    `${publicRuntimeConfig.cricketImageProfileBase}${bowlingTeamCaptainDetails?.id}.png`
                  }
                  alt={bowlingTeamCaptainDetails?.name}
                  title={bowlingTeamCaptainDetails?.name}
                  height={isMobile ? 44 : 64}
                  width={isMobile ? 44 : 64} /> : <LazyImage
                  src={`${publicRuntimeConfig.cricketImageProfileBase}${bowlingTeamCaptainDetails?.id}.png`}
                  alt={bowlingTeamCaptainDetails?.name}
                  title={bowlingTeamCaptainDetails?.name}
                  dontAlter={true}
                  holder={capHolder}
                  height={isMobile ? 44 : 64}
                  width={isMobile ? 44 : 64}
                  greed={false}
                />}
              </span>
            </div>
            <div className="tmtx">
              <h3 className="teamName">
                <a href="#">{firstInnings.Bowlingteam}</a>
              </h3>
              {
                secondInnings.status === 1 && (
                  <>
                  <div className="matchScore">
                    {isTestMatch && (
                      <div className="inning-txt inning-R">1st INN</div>
                    )}
                    <h4 className="teamRun scoreInnFirstR">
                      {teamBData?.Total}/{teamBData?.Wickets}
                    </h4>
                  </div>
                  <p className="teamRunRate runRateInnFirstR">
                    ({teamBData?.Overs}) RR {teamBData?.Runrate}
                  </p>
                  </>
                )
              }
              {isTestMatch && fourthInnings && fourthInnings.status === 1 && (
                <>
                  <div className="matchScore">
                    <div className="inning-txt inning-R">2nd INN</div>
                    <h4 className="teamRun scoreInnSecondR">
                      {teamDData?.Total}/{teamDData?.Wickets}
                    </h4>
                  </div>
                  <p className="teamRunRate runRateInnSecondR">
                    ({teamDData?.Overs}) RR {teamDData?.Runrate}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        {isMobile && data.isso && data.isso === "no" && (
          <div className="mobile-final-resultbtn ">
            {score?.equation || data?.equation || data?.Toss_mov}
          </div>
        )}

        {data?.isso === 'yes' && data?.superscore?.length > 0 && (
          <>
            <SuperOverWidget
              data={data?.superscore}
            />
            <div className="SuperOver_result">
              <div className="final-resultbtn ">
                {score?.matchresult}
              </div>
            </div>
          </>
        )}
      </div>
      <style jsx global>{`
        @keyframes blinker {  from { opacity: 1; }to { opacity: 0; }}
        @font-face {
            font-family: "Segoe Pro Regular";
            font-style: normal;
            font-weight: normal;
            src: local("Segoe Pro Regular"),
              url("https://images.news18.com/static_news18/pix/ibnhome/news18/images/articleRevampImg/SegoePro-Regular.woff2")
                format("woff2");
            font-display: optional;
          }
          @font-face {
            font-family: "Segoe Pro Bold";
            font-style: normal;
            font-weight: normal;
            src: local("Segoe Pro Bold"),
              url("https://images.news18.com/static_news18/pix/ibnhome/news18/images/articleRevampImg/SegoePro-Bold.woff2")
                format("woff2");
            font-display: optional;
          }							
        .CN-Score-widget {font-family: 'Karma',serif ${isAmp ? '' : '!important'};background:url("https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Score-card-lrg.png");color: #FFF;padding: 26px 30px 40px 30px;border-radius: 20px;position: relative}
         .mtsts{background: #FF5148;font-family: 'Karma',serif ${isAmp ? '' : '!important'};font-weight: bold;font-size: 11px;text-transform: uppercase;position: absolute;padding: 4px 11px;border-radius: 15px;left: 50%;top: -10px;transform: translate(-50%, 0)}
         .mtsts::before{content: "";background: #ffffff;width: 8px;height: 8px;border-radius: 100%;display: inline-block;margin-right: 5px;position: relative;top:0}
         .mtsts.live::before {animation: blinker 1s cubic-bezier(.5, 0, 1, 1) infinite alternate}
         .match-headingwrap {text-align: center;border-bottom: 1px solid #464646;padding-bottom: 10px;margin-bottom: 15px}
         .heading-1 {font-size: 20px;font-family: 'Mukta',sans-serif ${isAmp ? '' : '!important'};font-weight: bold;line-height:25px;margin-bottom: 7px}
         .heading-2 {color: #D8D8D8;font-family: 'Mukta',sans-serif ${isAmp ? '' : '!important'};font-weight: normal;font-size: 13px;line-height:18px}
         .socrebox{display: flex;justify-content: center;padding-bottom: 20px;position:relative;font-family: 'Mukta',sans-serif ${isAmp ? '' : '!important'}}
         .scrbxinr{display: flex;align-items:flex-start}
         .tmtx {position: relative}
         .tmtx .teamName{font-size: 14px;line-height: 15px;text-transform: uppercase;font-weight: normal;font-family: 'Karma',serif ${isAmp ? '' : '!important'}}
         .tmtx .teamName a{color: #FF5148}
         .tmtx .matchScore {width:160px;padding-bottom: 5px;padding-top: 7px}
         .tmtx .matchScore .inning-txt{color: #D8D8D8;font-size: 12px;text-transform: uppercase;padding-top: 13px}
         .tmtx .matchScore .inning-txt.inning-L{float:left}
         .tmtx .matchScore .inning-txt.inning-R{float:right}
         .tmtx .matchScore .teamRun{color: #ffffff;font-size: 30px;line-height: 25px;text-transform: uppercase;font-weight: normal;font-family: "Fira Sans",sans-serif ${isAmp ? '' : '!important'}}
         .tmtx .teamRunRate {margin: 0;font-size: 12px;color: #D8D8D8;line-height: 15px;font-family: 'Karma',serif ${isAmp ? '' : '!important'};font-weight: normal}
         .team-imgwrap {position: relative}
         .team-imgwrap .teamflag{width: 102px}
         .team-imgwrap .player-thumb {position: absolute;z-index: 1;bottom: 0;width: 64px; top: 0}
         .vs{width: 15px;padding: 0 68px;align-self: baseline;position: relative;top: 20px}
         .vs img {max-width: 15px ${isAmp ? '' : '!important'}}
         .scrbxinr:first-child .team-imgwrap .player-thumb {right: -24px}
         .scrbxinr:last-child .team-imgwrap .player-thumb {left: -24px}
         .scrbxinr:first-child .tmtx {margin-right: 15px;text-align: right}
         .scrbxinr:last-child .tmtx {margin-left: 15px}
         ${!isAmp ? `.final-resultbtn{font-family: 'Karma',serif !important;font-weight: bold;width: 330px;background: #FF5148;text-align: center;font-size: 13px;text-transform: uppercase;padding: 8px 10px;border-radius: 5px;position: absolute;top: 80px}`:""}
         .fxt_share {position: absolute;right: 30px;cursor: pointer}
         .socialbox {position: absolute;background: #FF5148;right: 14px;top: -5px;border-radius: 30px;width: 0;overflow: hidden;transition: width 1s}
         .socialbox ul {display: flex;width: 100%;height: 100%;align-items: center}
         .socialbox ul li {display: inline-block}
         .socialbox ul li a {display: block;padding:3px 8px}
        .fxt_share.expanded .socialbox {width:108px}
        .superOverWrap {align-items: center}
        .SuperOver_text {font-size: 12px;text-transform: uppercase;position: relative;color: #FFE200;text-align: center;line-height: 15px;display: flex;align-items: center}
        .SuperOver_text span {padding:0 10px}
        .SuperOver_text::before {content:'';height:2px; width:25px;background:#fff}
        .SuperOver_text::after {content:'';height:2px; width:25px;background:#fff}
        .CN-Score-widget .socrebox.superOverWrap .scrbxinr .tmtx .matchScore {padding-top: 0}
        ${!isAmp ? `.SuperOver_result {position: relative;min-width: 100%;height: 30px;display: block}
        .SuperOver_result .final-resultbtn {top: 0;left: 0;right: 0;margin: auto}`:""}
        .CN-Score-widget .socrebox.superOverWrap .scrbxinr .tmtx .matchScore .teamRun {font-size:22px}
        .CN-Score-widget .socrebox.superOverWrap .scrbxinr .tmtx .matchScore .teamRun span {font-family:'Segoe Pro Regular';font-size:12px;color: #D8D8D8;margin-left: 10px}
        //.CN-Score-widget{background: #000;padding: 26px 10px 0;margin-bottom:10px}
        .match-headingwrap .heading-1{font-size:16px;font-family:'Segoe Pro Regular';line-height:25px;margin-bottom:0;font-weight:400}
        .match-headingwrap .heading-2{font-size:12px}
        //.socrebox{justify-content: space-between;padding-bottom:10px;padding-left:20px;padding-right:20px}
        //.scrbxinr{width:98px;flex-direction:column}
       //.scrbxinr .team-imgwrap{margin-bottom:8px}
       //.scrbxinr.widget-team-two .team-imgwrap{margin-left:26px}
       //.scrbxinr .team-imgwrap .teamflag{width:72px}
       //.vs{padding:0}
       //.scrbxinr .tmtx{order:2}
       //.scrbxinr.widget-team-one .tmtx{align-self:flex-end}
       //.scrbxinr.widget-team-two .tmtx{align-self:flex-start}
       //.scrbxinr .tmtx .matchScore{width:100%;padding:0}
       //.scrbxinr .tmtx .teamName{margin-bottom:10px}
       .widget-team-two .tmtx, .CN-PageWrap.CN-Mobile-PageWrap .CN-Score-widget .socrebox .widget-team-two .teamName{text-align:left}
       .match-score .teamRun{ font-size: 28px;line-height:30px; }
       //.scrbxinr .tmtx .teamRunRate{font-size:11px}
       //.scrbxinr .tmtx{margin-left: 0;margin-right:0}
        .mobile-final-resultbtn{background: #ff5148;text-align: center;font-size:14px;text-transform:uppercase;padding:10px 0;align-self:self-start;margin-left:-10px;margin-right: -10px;border-bottom-left-radius:20px;border-bottom-right-radius: 20px}
       //.scrbxinr .team-imgwrap .player-thumb{width: 44px}
        .scrbxinr .tmtx .matchScore .inning-txt.inning-L{float:none}
       .scrbxinr .tmtx .matchScore .inning-txt.inning-R{float:none}

       @media (max-width:768px){
        .CN-Score-widget{
          padding: 26px 10px 0;
          margin: 10px 0 15px;
          background: #000;
        }
        .match-headingwrap{margin-bottom: 35px;}
        .CN-Score-widget .socrebox{
          display: flex;
          -webkit-box-pack: justify;
          justify-content: space-between;
          padding-bottom: 10px;
          padding-left: 20px;
          padding-right: 20px;
        }
        .scrbxinr:first-child {
          text-align: right;
        }
        .scrbxinr {
            width: 98px;
            display: unset;
        }
        .team-imgwrap {
          position: relative;
          margin-bottom: 4px;
        }
        .team-imgwrap .teamflag {
          width: 72px;
          display: block;
          margin: 0px;
          margin-left: auto;
        }
        .tmtx {
          position: relative;
          margin: 10px 0 0 0;
        } 
        .scrbxinr:first-child .tmtx{margin-right: 0;}
        .scrbxinr:last-child .tmtx{margin-left: 0;}
        .tmtx .matchScore { width: auto;}
        .team-imgwrap .player-thumb {
          position: absolute;
          z-index: 1;
          bottom: 0;
          width: 64px;
          top: -26px;
        }
        .scrbxinr:last-child .team-imgwrap .player-thumb {
          left: -20px;
        }
        .scrbxinr:first-child .team-imgwrap .player-thumb {
          right: -15px;
        }
        .team-imgwrap .player-thumb figure, .team-imgwrap .player-thumb img {
          height: 64px !important;
          width: 64px !important;
        }
        .vs {
          width: 15px;
          padding: 0 37px;
          margin-top: 10px;
          height: 100%;
          display: block;
          top: unset;
        }
       }
    `}</style>
    </>
  );
};

export default FullScoreCard;
