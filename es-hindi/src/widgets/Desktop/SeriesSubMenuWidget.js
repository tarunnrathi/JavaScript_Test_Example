import React from "react";
import { SeriesTabs } from "components/Cricketnext/CricketNextUtils";

const SeriesSubMenuWidget = ({ seriesMenuData }) => {
  const { pageType } = seriesMenuData;
  return (
    <>
      <div className="seriesSubMenu__wrapper">
        <div className="seriesSubMenu">
          <a href={seriesMenuData.seriesHomeUrl} className="seriesSubMenu__home--btn">{seriesMenuData.seriesDisplayName}</a>
          <ul className="seriesSubMenu__links--wrapper">
            <li className={`${pageType === SeriesTabs.NEWS ? 'current' : ''}`}><a href={seriesMenuData.seriesNewsUrl}>न्यूज</a></li>
            <li className={`${pageType === SeriesTabs.MATCH_SCHEDULE ? 'current' : ''}`}><a href={seriesMenuData.seriesMatchScheduleUrl}>शेड्यूल</a></li>
            <li className={`${pageType === SeriesTabs.RESULT ? 'current' : ''}`}><a href={seriesMenuData.seriesResultUrl}>रिजल्ट</a></li>
            <li className={`${pageType === SeriesTabs.PHOTO ? 'current' : ''}`}><a href={seriesMenuData.seriesPhotoUrl}>फोटो</a></li>
            <li className={`${pageType === SeriesTabs.VIDEO ? 'current' : ''}`}><a href={seriesMenuData.seriesVideoUrl}>वीडियो</a></li>
          </ul>
        </div>
      </div>
      <style jsx global>{`
        .seriesSubMenu__wrapper {
          box-shadow: 0px 3px 6px #00000029;
          border-bottom: 1px #d4d4d4 solid;
          position: sticky;
          top: 48px;
          background: #fff;
          font-family: "Mukta", sans-serif;
        }

        .seriesSubMenu {
          margin: 0 auto;
          max-width: 1244px;
          display: flex;
          width: 100%;
          height: 44px;
        }

        .seriesSubMenu__home--btn {
          font-size: 14px;
          font-weight: bold;
          padding: 5px 10px;
          text-transform: uppercase;
          background: #e1261d;
          color: #fff !important;
          display: flex;
          border-radius: 5px;
          margin-right: 15px;
          align-self: center;
        }

        .seriesSubMenu__links--wrapper {
          display: flex;
          align-items: center;
        }

        .seriesSubMenu__links--wrapper > li {
          margin-right: 15px;
        }

        .seriesSubMenu__links--wrapper > li > a {
          font-size: 15px;
          font-family: "Mukta", sans-serif;
          text-transform: uppercase;
          color: #000;
          display: block;
          padding: 10px 10px;
        }

        .seriesSubMenu__links--wrapper > li.current > a {
          color: #e1261d;
          font-weight: bold;
          position: relative;
        }
        .seriesSubMenu__links--wrapper > li.current > a::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: #e1261d;
          left: 0;
          bottom: 0;
        }
        .nav_wapper {
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
};

export default SeriesSubMenuWidget;
