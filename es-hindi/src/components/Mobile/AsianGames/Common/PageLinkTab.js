import { tabConstant } from "components/Desktop/AsianGames/Common/AsianGamesConstant";
import React from "react";

const AsianGameTabLinkMobile = ({
  selectedTab = 1,
  asianGameSwitcher = {},
}) => {
  return (
    <>
      <div className="page_links">
        {tabConstant.map((tab) => {
          if (tab["switch_key"] && asianGameSwitcher[tab["switch_key"]] === "1") {
            return (
              <a
                className={selectedTab === tab.id ? "active" : ""}
                href={tab.relativeUrls}
                key={tab.id}
              >
                {tab.title}
              </a>
            );
          }
          if (!tab["switch_key"]) {
            return (
              <a
                className={selectedTab === tab.id ? "active" : ""}
                href={tab.relativeUrls}
                key={tab.id}
              >
                {tab.title}
              </a>
            );
          }
        })}
      </div>
      <style jsx>{`
        .page_links {
          width: 100%;
          height: 50px;
          background: #f5f5f5;
          display: flex;
          align-items: flex-end;
          padding: 0 10px;
          box-sizing: border-box;
          margin-bottom: 5px;
          border-bottom: 3px #e6e6e6 solid;
          overflow-x: scroll;
          white-space: nowrap;
        }
        .page_links a {
          height: 34px;
          background: #eaeaea 0% 0% no-repeat padding-box;
          display: flex;
          align-items: center;
          padding: 0 10px;
          color: #001d42;
          font-size: 14px;
          font-family: "Recursive", sans-serif;
          letter-spacing: -0.28px;
          text-transform: uppercase;
          margin-right: 2px;
        }
        .page_links a.active {
          height: 40px;
          background: #ff5148 0% 0% no-repeat padding-box;
          color: #fff;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default AsianGameTabLinkMobile;
