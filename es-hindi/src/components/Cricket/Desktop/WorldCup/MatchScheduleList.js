import ImageFallback from "components/Common/ImageFallback";
import React from "react";
import { CricketNextImgUrls } from "../../../Cricketnext/CricketNextUtils";

const MatchScheduleList = ({ pageContent }) => {
  const matchList = pageContent?.match || [];
  return (
    <>
      <div className="CN-schedule-main">
        <div className="CN-schedule-row">
          <h2 className="CN-schedule-heading">{pageContent?.name}</h2>
          {matchList &&
            matchList.length &&
            matchList.map((match, index) => (
              <div className="schedule-box" key={`${index}`}>
                <div className="schedule-col-l">
                  <h3 className="cn-rsltHead1">
                    {match?.teama} <span>vs</span> {match?.teamb},{" "}
                    {match?.matchno}
                  </h3>
                  <p className="cn-rsltCont">
                    {match?.date} • {match?.time} • {match?.venue}
                  </p>
                </div>
                <div className="schedule-col-r">
                  <div className="flag">
                    <span>
                      <ImageFallback
                        src={match?.teama_flag}
                        fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                        height={41}
                        width={72}
                        alt={match?.teama}
                        title={match?.teama}
                      />
                    </span>
                  </div>
                  <div className="vs">
                    <img src={CricketNextImgUrls.vsImgUrl} alt="" />
                  </div>
                  <div className="flag">
                    <span>
                      <ImageFallback
                        src={match?.teamb_flag}
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
            ))}
        </div>
      </div>
      <style jsx global>
        {`
          .CN-schedule-row {
            display: table;
            width: 100%;
          }

          .CN-schedule-row:first-child .CN-schedule-heading {
            margin-top: 12px;
          }

          .CN-schedule-row .CN-schedule-heading {
            font-size: 17px;
            margin-bottom: 3px;
            text-transform: uppercase;
            line-height: 17px;
            padding-left: 15px;
            position: relative;
            font-weight: bold;
            margin-top: 25px;
          }

          .CN-schedule-row .CN-schedule-heading::before {
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
            display: flex;
            padding: 10px 15px;
            background: #f5f5f5;
            position: relative;
            border-bottom: 1px solid #d2d2d2;
            align-items: center;
            margin-bottom: 5px;
          }

          .schedule-box .schedule-col-l {
            padding-right: 15px;
            margin-right: auto;
          }

          .schedule-box .schedule-col-l .cn-rsltHead1 {
            font-weight: bold;
          }
          .schedule-col-l .cn-rsltHead1 span {
            font-weight: normal;
          }

          .schedule-box .schedule-col-l .cn-rsltHead1 {
            font-size: 15px;
            color: #001d42;
            margin-bottom: 10px;
          }

          .schedule-box .schedule-col-l .cn-rsltCont {
            font-size: 14px;
            margin: 0;
          }

          .CN-schedule-row .schedule-box .schedule-col-r {
            width: 245px;
            padding-left: 15px;
            display: flex;
            justify-content: space-between;
            border-left: 1px solid #cccccc;
            padding-top: 8px;
            padding-bottom: 8px;
            align-items: center;
          }

          .flag {
            width: 72px;
          }

          .flag span {
            display: block;
            line-height: 0;
          }

          .schedule-col-r .vs {
            width: 40px;
            text-align: center;
          }
          .schedule-col-r .vs img {
            width: 15px;
          }
        `}
      </style>
    </>
  );
};

export default MatchScheduleList;
