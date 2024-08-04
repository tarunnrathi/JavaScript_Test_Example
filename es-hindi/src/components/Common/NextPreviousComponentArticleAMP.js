import React from "react";
import AmpAnalyticsGA4Events from "widgets/Amp/AmpAnalyticsGA4Events";

const NextPreviousArticleAMP = ({ prev = {}, next = {}, GA4Data={} }) => {
  return (
    <>
      <div className="anarrcont">
        {Object.keys(prev).length > 0 && (
          <div className="anlft">
            <a  className="cp_perpetual_prev" href={"/amp" + prev.weburl_r}>
              <span id={"event_prev"} className="arrow-left cp_perpetual_prev"></span>
            </a>
            <AmpAnalyticsGA4Events
              id={"event_prev"}
              event_name={"perpetual_click_prev_cp"}
              cta_name={"previous_arrow"}
              section={GA4Data?.section || ""}
              subsection={GA4Data?.sub_section || ""}
              article_id={GA4Data?.article_id}
              type_of_article={GA4Data?.type_of_article || ""}
              local18_district={GA4Data?.local18_district || ""}
              domain="https://hindi.news18.com/"
            />
          </div>   
        )}
        {Object.keys(next).length > 0 && (
          <div className={"anrgt"}>
            <a className="cp_perpetual_next" href={"/amp" + next.weburl_r}>
              <span id={"event_next"} className="arrow-right cp_perpetual_next"></span>
            </a>
            <AmpAnalyticsGA4Events
              id={"event_next"}
              event_name={"perpetual_click_next_cp"}
              cta_name={"next_arrow"}
              section={GA4Data?.section || ""}
              subsection={GA4Data?.sub_section || ""}
              article_id={GA4Data?.article_id}
              type_of_article={GA4Data?.type_of_article || ""}
              local18_district={GA4Data?.local18_district || ""}
              domain="https://hindi.news18.com/"
            />
          </div>
        )}
      </div>
      <style jsx>{`
        .arrow-right,
        .arrow-left {
          display: block;
          margin: 30px auto;
          width: 16px;
          height: 16px;
          border-top: 3px solid #000;
          border-left: 3px solid #000;
        }
        .arrow-right {
          transform: rotate(135deg);
        }
        .arrow-left {
          transform: rotate(-45deg);
        }
        .anlft,
        .anrgt {
          background: #ffffff 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 0px 10px 10px 0px;
          width: 50px;
          height: 100px;
          display: flex;
          align-items: center;
          cursor: pointer;
          z-index: 999;
          justify-content: center;
        }
        .anlft {
          position: fixed;
          left: 0;
          top: 45%;
        }
        .anrgt {
          right: 0;
          position: fixed;
          top: 45%;
          border-radius: 10px 0px 0px 10px;
        }

        @media (max-width: 768px) {
          .anrgt {
            opacity: 0.67;
            box-shadow: unset;
            border-radius: 100%;
            width: 80px;
            height: 80px;
            right: -10%;
            justify-content: flex-start;
          }
          .anlft {
            opacity: 0.67;
            box-shadow: unset;
            border-radius: 100%;
            width: 80px;
            height: 80px;
            left: -10%;
          }
          .arrow-right {
            right: 3px;
            position: relative;
          }
          .arrow-left {
            left: 18px;
            position: relative;
          }
          .arrow-right,
          .arrow-left {
            width: 20px;
            height: 20px;
          }
          .anlft > a,
          .anrgt > a {
            width: 50px;
          }
        }
      `}</style>
    </>
  );
};

export default NextPreviousArticleAMP;
