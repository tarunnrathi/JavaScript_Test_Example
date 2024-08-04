import ImageFallback from "components/Common/ImageFallback";
import { CricketNextImgUrls } from "../../../Cricketnext/CricketNextUtils";

const MatchScheduleListMobile = ({ pageContent }) => {
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
                  <div className="vs__logo">
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

export default MatchScheduleListMobile;
