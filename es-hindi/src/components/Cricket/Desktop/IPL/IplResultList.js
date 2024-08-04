import ImageFallback from "components/Common/ImageFallback";
import { CricketNextImgUrls } from "components/Cricketnext/CricketNextUtils";
import { IPL_SERIES_NAME, getTeamNameSlug } from "includes/ipl.helper";
import React from "react";

const IplResultList = ({ pageContent }) => {
  const matchList = pageContent?.match || [];
  const getSeriresUrl = (teama, teamb) => getTeamNameSlug(teama)+'-vs-'+getTeamNameSlug(teamb);

  return (
      <>
          <div className="CN-result-row">
            <h2 className="CN-result-heading">{pageContent?.name}</h2>
            {matchList && matchList.length && matchList.map((match, index) => (
                <div className="result-box" key={index}>
                  <div className="result-col-l">
                    <div className="result-col-lWrap">
                      <h3 className="cn-rsltHead1">{match?.teama} <span>vs</span> {match?.teamb}, {match?.matchno}</h3>
                      <p className="cn-rsltCont">{match?.matchDetail?.matchdate} • {match?.venue}</p>
                    </div>
                    <div className="result-teamWrap">
                      <div className="rs-inner">
                        <div className="result-teambox">
                          <div className="flag">
                            <span>
                              <ImageFallback
                                src={match?.matchDetail?.first?.team?.teamFlag}
                                fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                                height={41}
                                width={72}
                                alt={match?.teama}
                                title={match?.teama}
                              />
                            </span>
                          </div><div className="scoreWrap">
                            <h4 className="teamName">
                              <span>{match?.teama}</span>
                            </h4>
                          </div></div>
                        <div className="vs">
                          <img src={CricketNextImgUrls.vsRedImgUrl} alt="vs image" /></div>
                        <div className="result-teambox">
                          <div className="flag">
                            <span>
                              <ImageFallback
                                src={match?.matchDetail?.second?.team?.teamFlag}
                                fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                                height={41}
                                width={72}
                                alt={match?.teamb}
                                title={match?.teamb}
                              />
                            </span>
                          </div>
                          <div className="scoreWrap"><h4 className="teamName"><span>{match?.teamb}</span></h4></div></div></div>
                      <div className="rs-matchresult">मैच रिजल्ट्स: <span>{match?.matchDetail?.matchresult}</span></div>
                    </div>
                  </div>
                  <div className="result-col-r">
                    <h4 className="cn-rsltHead2">यह भी देखें</h4>
                    <ul className="result__box--links">
                      <li><a href={`/cricket/live-score/${IPL_SERIES_NAME}-live-score-full-${match?.matchfile}.html`}>स्कोरकार्ड</a></li>
                      <li><a href={`/cricket/live-score/${IPL_SERIES_NAME}-ball-by-ball-live-commentary-${match?.matchfile}.html`}>मैच कॉमेंट्री</a></li>
                      <li><a href={`/cricket/live-score/team-squads/${getSeriresUrl(match?.teama_eng, match?.teamb_eng)}-${match?.matchfile}.html`}>स्क्वॉड</a></li>
                    </ul>
                  </div>
                </div>
              )
            )}
          </div>
      <style jsx global>
        {`
          .CN-result-row {
            display: table;
            width: 100%;
          }

          .CN-result-row .result-box {
            display: flex;
            padding: 15px;
            background: #f5f5f5;
            position: relative;
            border-bottom: 1px solid #d2d2d2;
            margin-bottom: 5px;
          }

          .CN-result-row .CN-result-heading {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 3px;
            text-transform: uppercase;
            line-height: 17px;
            padding-left: 15px;
            position: relative;
            margin-top: 12px;
          }
          
          .CN-result-row .CN-result-heading::before {
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

          .CN-result-row .result-box {
            display: flex;
            padding: 15px;
            background: #f5f5f5;
            position: relative;
            border-bottom: 1px solid #d2d2d2;
            margin-bottom: 5px;
          }

          .CN-result-row .result-box::before {
            content: "";
            position: absolute;
            width: 4px;
            height: 100%;
            background: #e1261d;
            left: 0;
            top: 0;
          }

          .CN-result-row .result-box .result-col-l {
            width: 80%;
            padding-right: 15px;
            border-right: 1px solid #cccccc;
          }

          .cn-rsltHead1 {
            font-size: 16px;
            font-weight: bold;
            color: #001d42;
            margin-bottom: 5px;
          }
          .cn-rsltCont {
            font-size: 14px;
          }

          .result-teamWrap {
            margin-left: -15px;
            border: 1px solid #d2d2d2;
            background: #fff;
            padding: 10px 15px 0;
          }

          .result-teamWrap .rs-inner {
            display: flex;
            padding-bottom: 5px;
            border-bottom: 1px dashed #d5d5d5;
          }
          .result-teamWrap .rs-inner .result-teambox {
            display: flex;
            width: 308px;
            justify-content: flex-start;
          }
          .result-teamWrap .rs-inner .result-teambox:last-child {
            justify-content: flex-end;
        }
          .rs-inner .result-teambox .flag {
            width: 72px;
            margin-right: 10px;
          }
          .result-teamWrap .rs-inner .result-teambox .flag span {
            display: block;
          }
          .scoreWrap {
            display: flex;
            align-items: center;
          }
          .scoreWrap .teamName {
            margin-bottom: 5px;
          }

          .scoreWrap .teamName span {
            font-size: 15px;
            color: #7b7b7b;
            display: block;
          }

          .result-teamWrap .rs-inner .vs {
            background: none;
            border: none;
            filter: brightness(0);
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
          .rs-inner .vs img {
            width: 14px;
          }

          .result-teamWrap .rs-matchresult {
            font-size: 13px;
            padding: 5px 0;
            color: #606060;
          }

          .result-teamWrap .rs-matchresult span {
            color: #e1261d;
            font-weight: bold;
          }

          .result-box .result-col-r {
            padding-top: 10px;
            width: 18%;
            padding-left: 15px;
          }

          .result-box .result-col-r .cn-rsltHead2 {
            color: #606060;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .result__box--links li {
            margin-bottom: 4px;
            font-size: 14px;
            color: #aaaaaa;
            text-transform: uppercase;
            position: relative;
            padding-left: 8px;
          }

          .result__box--links li a {
            color: #e1261d;
          }

          .result__box--links li::before {
            content: "";
            width: 3px;
            height: 3px;
            background: #e1261d;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(0, -50%);
          }
          `}
      </style>
    </>
  );
};

export default IplResultList;
