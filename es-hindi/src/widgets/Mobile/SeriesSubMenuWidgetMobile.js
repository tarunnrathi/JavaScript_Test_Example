import React from "react";
import { SeriesTabs } from "components/Cricketnext/CricketNextUtils";

const SeriesSubMenuWidgetMobile = ({ seriesMenuData }) => {
  const { pageType } = seriesMenuData;
  return (
    <>
      <ul className="seriesSubMenu__wrapper">
        <li className="seriesSubMenu__home--btn"><a href={seriesMenuData.seriesHomeUrl}>{seriesMenuData.seriesDisplayName}</a></li>
        <li className={`${pageType === SeriesTabs.NEWS ? 'series__current--tab' : ''}`}><a href={seriesMenuData.seriesNewsUrl}>न्यूज</a></li>
        <li className={`${pageType === SeriesTabs.MATCH_SCHEDULE ? 'series__current--tab' : ''}`}><a href={seriesMenuData.seriesMatchScheduleUrl}>शेड्यूल</a></li>
        <li className={`${pageType === SeriesTabs.RESULT ? 'series__current--tab' : ''}`}><a href={seriesMenuData.seriesResultUrl}>रिजल्ट</a></li>
        <li className={`${pageType === SeriesTabs.PHOTO ? 'series__current--tab' : ''}`}><a href={seriesMenuData.seriesPhotoUrl}>फोटो</a></li>
        <li className={`${pageType === SeriesTabs.VIDEO ? 'series__current--tab' : ''}`}><a href={seriesMenuData.seriesVideoUrl}>वीडियो</a></li>
      </ul>
      <style jsx global>{`
        .seriesSubMenu__wrapper {
          font-size: 14px;
          overflow: auto;
          white-space: nowrap;
          display: flex;
          align-items: center;
          font-family: "Mukta", sans-serif;
        }
        .seriesSubMenu__wrapper::-webkit-scrollbar {
          display: none;
        }

        .seriesSubMenu__wrapper > li {
          display: inline-block;
          color: #fff;
          text-align: center;
          text-decoration: none;
        }

        .seriesSubMenu__home--btn {
          display: flex;
        }

        .seriesSubMenu__wrapper li a {
          color: #001d42;
          text-transform: uppercase;
          padding: 5px 10px;
          display: block;
          position: relative;
        }

        .seriesSubMenu__home--btn a {
          display: flex;
          text-transform: uppercase;
          padding: 5px !important;
          background: #e1261d;
          color: #fff !important;
          font-size: 12px;
          border-radius: 5px;
          margin-right: 10px;
          align-self: center;
          margin-left: 5px;
        }

        .series__current--tab > a {
          color: #e1261c;
        }

        .series__current--tab > a:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background: #e1261c;
          left: 0;
          bottom: 0;
        }
      `}</style>
    </>
  );
};

export default SeriesSubMenuWidgetMobile;
