import ImageFallback from "components/Common/ImageFallback";
import React from "react";
import { CricketNextImgUrls } from "../../CricketNextUtils";

const SeriesByScheduleMobile = ({ pageContent, isCommonSeries = false }) => {
  // pageContent = isCommonSeries ? pageContent : [pageContent];
  return (
    <>
      <div className="CN-schedule-main">
        {pageContent && pageContent.length > 0 ? (
          pageContent.map((series) => (
            <div className="CN-schedule-row" key={series?._id}>
              <h2 className="CN-schedule-heading">{series?.name}</h2>
              {series.match &&
                series.match.length !== 0 &&
                series.match.map((match, index) => {
                  const matchNumber = isCommonSeries ? match.matchnumber : match?.matchno;
                  const matchDate = isCommonSeries ? match.serieseFormatDate: match?.matchdate;
                  const matchTime = isCommonSeries ? match.matchTime : match?.time;
                  const teamaId = isCommonSeries ? match.teama_Id : match?.teama_id;
                  const teambId = isCommonSeries ? match.teamb_Id : match?.teamb_id;
                  return (
                    <div
                      className="schedule-box"
                      key={`${index}-${series?._id}`}
                    >
                      <div className="schedule-col-l">
                        <h3 className="cn-rsltHead1">
                          {match?.teama} <span>vs</span> {match?.teamb},{" "}
                          {matchNumber}
                        </h3>
                        <p className="cn-rsltCont">
                          {matchDate} • {matchTime} •{" "}
                          {match?.venue}
                        </p>
                      </div>
                      <div className="schedule-col-r">
                        <div className="flag">
                          <span>
                            <ImageFallback
                              src={`${CricketNextImgUrls.teamFlagUrl}${teamaId}.png`}
                              fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                              height={41}
                              width={72}
                              alt={match?.teama}
                              title={match?.teama}
                            />
                          </span>
                        </div>
                        <div className="vs__logo">
                          <img src={CricketNextImgUrls.vsImgUrl} alt="" />
                        </div>
                        <div className="flag">
                          <span>
                            <ImageFallback
                              src={`${CricketNextImgUrls.teamFlagUrl}${teambId}.png`}
                              fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                              height={41}
                              width={72}
                              alt={match?.teamb}
                              title={match?.teamb}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                );
                })}
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            No results found matching this criteria
          </p>
        )}
      </div>
      <style jsx global>
        {`
          .CN-schedule-row {
            display: table;
            width: 100%;
            margin-bottom: 20px;
          }

          .CN-schedule-heading {
            margin-bottom: 3px;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 16px;
            line-height: 17px;
            padding-left: 15px;
            position: relative;
            background: #fff;
          }

          .CN-schedule-heading::before {
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

          .schedule-box {
            position: relative;
            padding: 5px 15px;
            margin-bottom: 5px;
            border-bottom: 1px solid #d8d8d8;
            background: #f5f5f5;
          }

          .schedule-box::before {
            content: "";
            position: absolute;
            width: 4px;
            height: 100%;
            background: #e1261d;
            left: 0;
            top: 0;
          }

          .schedule-box .cn-rsltHead1 {
            font-weight: bold;
          }

          .schedule-box .cn-rsltHead1 {
            font-size: 14px;
            color: #001d42;
            margin-bottom: 6px;
          }

          .schedule-box .cn-rsltCont {
            font-size: 13px;
          }

          .schedule-box .cn-rsltCont {
            font-size: 12px;
            margin: 0;
            line-height: 22px;
            padding-bottom: 10px;
          }

          .schedule-box .schedule-col-r {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
          }

          .flag {
            width: 72px;
          }

          .flag span {
            display: block;
          }

          .vs__logo {
            width: 40px;
            text-align: center;
          }

          .vs__logo img {
            width: 15px;
          }
        `}
      </style>
    </>
  );
};

export default SeriesByScheduleMobile;
