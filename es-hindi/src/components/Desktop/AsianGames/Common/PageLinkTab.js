import React from "react";
import { tabConstant } from "./AsianGamesConstant";

const PageLinkTab = ({ selectedTab = 1, asianGameSwitcher = {} }) => {
  return (
    <>
      <div className="page_links">
        {tabConstant.map((tab) => {
          if (
            tab["switch_key"] &&
            asianGameSwitcher[tab["switch_key"]] === "1"
          ) {
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
          height: 60px;
          background: #f5f5f5;
          display: flex;
          align-items: flex-end;
          padding: 0 20px;
          box-sizing: border-box;
          margin-bottom: 23px;
          border-bottom: 3px #e6e6e6 solid;
        }
        .page_links a {
          height: 42px;
          background: #eaeaea 0 0 no-repeat padding-box;
          display: flex;
          align-items: center;
          padding: 0 10px;
          color: #001d42;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: -0.32px;
          margin-right: 5px;
        }
        .page_links a.active {
          height: 45px;
          background: #ff5148 0 0 no-repeat padding-box;
          color: #fff;
          font-weight: 600;
        }
        .page_links a:last-child {
          margin-right: 0;
        }
      `}</style>
    </>
  );
};

export default PageLinkTab;
