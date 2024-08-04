import { ORANGE_CAP_HEADER, PURPLE_CAP_HEADER } from "includes/ipl.helper";
import React, { useState } from "react";
import IplCapList from "./IplCapList";

const IplRunWicket = ({
  orangeCapPlayerArr,
  purpleCapPlayerArr,
  ImageIdsAvailable,
}) => {
  const [activeTab, setActiveTab] = useState("orange-1");

  const openMatch = (tab) => {
    setActiveTab(tab);
  };

  const tableHeadingArrOrange = ORANGE_CAP_HEADER;

  const tableHeadingArrPurple = PURPLE_CAP_HEADER;

  return (
    <>
      <div className="daily_predictor_tab">
        <div className="cap_tab_link">
          {
            orangeCapPlayerArr.length > 0 && (
              <button
                className={`captablink w3-red ${
                  activeTab === "orange-1" ? "active" : ""
                }`}
                onClick={() => openMatch("orange-1")}
              >
                <h3 className="ipl_cap_headin_g fororangecap">
                  ऑरेंज कैप<span> - सबसे बड़ा 'रन'वीर</span>
                </h3>
              </button>
            )
          }

          {
            purpleCapPlayerArr.length > 0 && (
              <button
                className={`captablink w3-prpl w3-red ${
                  activeTab === "purple-1" ? "active" : ""
                }`}
                onClick={() => openMatch("purple-1")}
              >
                <h3 className="ipl_cap_headin_g">
                  पर्पल कैप <span> -सबसे बड़ा 'शिकारी'</span>
                </h3>
              </button>
            )
          }
        </div>

        {
          activeTab === "orange-1" && orangeCapPlayerArr.length > 0 && (
            <IplCapList
              type={activeTab}
              heading={tableHeadingArrOrange}
              data={orangeCapPlayerArr}
              dataDisplay={`runs_scored`}
              ImageIdsAvailable={ImageIdsAvailable}
            />
          )
        }
        {
          activeTab === "purple-1" && purpleCapPlayerArr.length > 0 && (
            <IplCapList
              type={activeTab}
              heading={tableHeadingArrPurple}
              data={purpleCapPlayerArr}
              dataDisplay={`wickets`}
              ImageIdsAvailable={ImageIdsAvailable}
            />
          )
        }
      </div>
      <style jsx global>{`
        .daily_predictor_tab {
          width: 100%;
        }
        .cap_tab_link {
          display: flex;
        }
        .cap_tab_link .w3-red {
          background: #f55b00;
        }
        .cap_tab_link .captablink {
          border: none;
          outline: none;
          padding: 10px;
          box-sizing: border-box;
          width: 50%;
          cursor: pointer;
        }
        .ipl_cap_headin_g {
          font-size: 13px;
          line-height: 18px;
          color: #fff;
          font-weight: 700;
          text-transform: uppercase;
        }
        .ipl_cap_headin_g span {
          color: #fff;
          font-weight: 400;
        }
        .cap_tab_link .w3-prpl {
          background: #222222;
        }
        .CN-run_s {
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default IplRunWicket;
