import React from "react";
import ImageFallback from "components/Common/ImageFallback";
import { CricketNextImgUrls } from "components/Cricketnext/CricketNextUtils";

const CricketSeriesResultsMobile = ({ pageContent }) => {
  return (
    <>
      {pageContent && pageContent.length !== 0 ? (
        pageContent.map((series) => (
          <div className="CN-result-row" key={series?._id}>
            <h2 className="CN-result-heading">{series?.name}</h2>
            {series.match &&
              series.match.length !== 0 &&
              series.match.map((match) => {
                const teamaEng = match?.teama_eng?.split(" ").join("-").toLowerCase();
                const teambEng = match?.teamb_eng?.split(" ").join("-").toLowerCase();
                return (
                <div className="result__match--wrapper" key={match?.matchfile}>
                  <div className="result__match--info">
                    <h3 className="result__match--heading">{match?.teama} <span>vs</span> {match?.teamb}, {match?.matchno}</h3>
                    <ul className="cn-rsltCont">
                      <li>• {match?.matchDetail?.matchdate} • {match?.matchTime}</li>
                      <li>• {match?.venue} </li>
                      <span>• {match?.matchDetail?.matchresult}</span>
                    </ul>
                  </div>
                  <div className="result__team--details">
                    <div className="payer-thumb">
                      <h3 className="teamName"><a>{match?.teama}</a></h3>
                      <div className="teamflag">
                        <ImageFallback
                          src={`${CricketNextImgUrls.teamFlagUrl}${match?.teama_Id}.png`}
                          fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                          height={41}
                          width={72}
                          alt={match?.teama}
                          title={match?.teama}
                        />
                      </div>
                    </div>
                    <div className="vs"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/result-vs.png" alt="" /></div>
                    <div className="payer-thumb">
                      <h3 className="teamName"><a>{match?.teamb}</a></h3>
                      <div className="teamflag">
                        <ImageFallback
                          src={`${CricketNextImgUrls.teamFlagUrl}${match?.teamb_Id}.png`}
                          fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                          height={41}
                          width={72}
                          alt={match?.teamb}
                          title={match?.teamb}
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="result__box--links">
                    <li><a href={`/cricket/live-score/${teamaEng}-vs-${teambEng}-live-score-full-${match?.matchfile}.html`}>स्कोरकार्ड</a></li>
                    <li><a href={`/cricket/live-score/${teamaEng}-vs-${teambEng}-ball-by-ball-live-commentary-${match?.matchfile}.html`}>मैच कॉमेंट्री</a></li>
                    <li><a href={`/cricket/live-score/team-squads/${teamaEng}-vs-${teambEng}-${match?.matchfile}.html`}>स्क्वॉड</a></li>
                  </ul>
                </div>
              )})}
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>
          No results found matching this criteria
        </p>
      )}
      <style jsx global>
        {`
          .CN-result-row {
            margin-bottom: 10px;
          }

          .CN-result-row .CN-result-heading {
            font-size: 16px;
            text-transform: uppercase;
            line-height: 15px;
            padding-left: 15px;
            position: relative;
            margin-top: 20px;
          }

          .CN-result-row .CN-result-heading::before {
            content: "";
            border-bottom: 1px solid #000000;
            border-right: 1px solid #000000;
            width: 5px;
            height: 5px;
            transform: rotate(-45deg);
            position: absolute;
            left: 3px;
            top: 3px;

          }

          .result__match--wrapper {
            padding: 5px 0;
            position: relative;
            margin-bottom:10px;
          }

          .result__match--info {
            background: #f5f5f5;
            position: relative;
            padding: 10px;
            margin: 0 10px;
          }

          .result__match--info ::before {
            content: "";
            width: 100%;
            height: 4px;
            position: absolute;
            top: 0;
            left: 0;
            background: #e1261d;
          }

          .result__match--heading {
            font-weight: bold;
            font-size: 15px;
            color: #001d42;
            margin-bottom: 5px;
          }
          .result__match--info .cn-rsltCont {
            color: #000;
            font-size: 14px;
            line-height: 22px;
          }
          .cn-rsltCont span {
            color: #e1261d;
          }
          .result__team--details {
            display: flex;
            justify-content: center;
            padding: 15px 0;
            border-top: 1px solid #d8d8d8;
            border-bottom: 1px solid #d8d8d8;
            align-items: center;
            background: #fff;
            gap: 5px;
          }
          .result__team--details .payer-thumb:first-child {
            margin-right: 30px;
          }
          .result__team--details .payer-thumb {
            text-align: center;
          }

          .result__team--details .payer-thumb .teamName {
            font-weight: bold;
            font-size: 15px;
            line-height: 15px;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 3px;
          }
          .teamName a {
            color: #000;
          }

          .result__team--details .payer-thumb .teamflag {
            margin-bottom: 4px;
            width: 55px;
            margin-left: auto;
            margin-right: auto;
          }

          .result__team--details .payer-thumb .teamflag img {
            height: auto;
            width: 100%;
            display: block;
          }

          .result__team--details .vs {
            background: none;
            border: none;
            filter: brightness(0);
            width: 40px;
            text-align: center;
            height: 40px;
            box-sizing: border-box;
            border-radius: 50%;
            line-height: 49px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
          }

          .result__team--details .vs img {
            width: 15px;
          }

          .result__box--links {
            display: flex;
            flex-wrap: wrap;
            margin: 0 10px;
            background: #f5f5f5;
            padding: 10px 10px 0;
            border-bottom: 1px solid #d8d8d8;
          }
          .result__box--links li {
            font-size: 14px;
            width: 50%;
            margin-bottom: 10px;
            color: #aaaaaa;
            text-transform: uppercase;
            position: relative;
            padding-left: 8px;
          }

          .result__box--links li a {
            color: #e1261d;
          }
          .result__box--links li:last-child {
            margin-bottom: 0;
          }

          .result__box--links li::before {
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
        `}
      </style>
    </>
  );
};

export default CricketSeriesResultsMobile;
