import React from "react";
import PointsTable from "./PointsTable";
import MatchWidget from "./MatchWidget";
import TopHeadlines from "./TopHeadlines";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import LazyLoadImage from "components/Common/CustomImage";


const RightSection = (props) => {
  const { pageAds } = props;
 
  return (
    <>
      <div className="right-section">
        <div className="small-ad-block placeholderRHS">
          <SiteAd
            adUnit={pageAds?.ATF_300_id}
            sizes={[
              [300, 250],
              [300, 600],
              [336, 280],
              [250, 250],
            ]}
            width={300}
            height={250}
            removeAdSpan={true}
            lazyload={true}
          />
        </div>
        {/*Matches Widget Section*/}
        <MatchWidget props={props?.props?.matches?.calendar} />
        <PointsTable
          tableData={
            props?.props?.pointTableData?.standings?.groups[0]?.teams?.team
          }
        />

        {/*Standing Widget Section*/}
        <div className="small-ad-block placeholderRHS">
          <SiteAd
            adUnit={pageAds?.BTF_300_id}
            sizes={[
              [300, 250],
              [300, 600],
              [336, 280],
              [250, 250],
            ]}
            width={300}
            height={250}
            removeAdSpan={true}
            lazyload={true}
          />
        </div>
        <TopHeadlines headlines={props?.props?.top_headlines} />
        <div className="media-widget-section">
          <h3 className="widget-title">फोटो/वीडियो गैलरी</h3>
          <div className="widget-media-gallery">
            <ul className="media-list">
              {props?.props?.photoGallery.map((item, index) => (
                <li key={`photo${index}`}>
                  <div className="media-wrap">
                    <a href={item?.weburl_r} title={item?.display_headline}>
                      <LazyLoadImage width={index == 0 ? 300 : 144} height={index == 0 ? 200 : 96} src={item?.images?.url} alt={item?.display_headline} title={item?.display_headline} />
                    </a>
                    <div className="media-icon   photo-img">
                      <svg
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z" />
                        <path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="media-title">
                    <a href={item.weburl_r} title={item.display_headline}>
                      {item?.display_headline}
                    </a>
                  </h3>
                </li>
              ))}
            </ul>
            <div className="view-all-div">
              <a
                href="/pro-kabaddi-league/pkl-news/"
                title="view all"
              >
                पूरा देखें
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
    .right-section {width: 300px; margin: 0 0 0 30px;}
    .placeholderRHS {width: 100%;	height: 250px;	background-color: #ccc;}
    .match-widget-section {margin: 20px 0;width: 100%;float: left;clear: both;}
					.big-title, .tags-big-title {font-size: 40px;color: rgba(0, 29, 66, 0.1); margin: -3px 0 0 -8px;display: none;}
					.tags-tab-container {margin: 10px 0 0 0;display: flex;justify-content: space-between;flex-wrap: wrap;}
					input.tabs-cell {display: none;}
					input.tabs-cell:checked + label.tabs-label, label.tabs-label:hover {color: #ff2759;border-bottom: 6px solid #ff2759;padding-bottom: 5px;font-weight: bold;}
					label.tabs-label:nth-child(2) {text-align: left;}
					label.tabs-label:nth-child(4) {text-align: right;}
					label.tabs-label {font-size: 15px;line-height: 18px;text-transform: uppercase;color: #494949;display: inline-block;padding: 0;font-weight: normal;cursor: pointer;border-bottom: 3px solid #b9b9b9;width: 48%;}
					#tab1:checked ~ #content1, #tab2:checked ~ #content2 {display: block;}
					section.tabs-section {display: none;padding: 10px 0 0 0;}
					.tabs-section .schedule-list li:hover {background: #f3f3f3;}
					.tabs-section .schedule-list li {padding: 0px;border-top: none;border-bottom: 1px solid #ccd2d9;background: #fff;}
					.tabs-section .schedule-list li:last-child {border-bottom: none;}
					.schedule-list li {background: #f3f3f3;padding: 15px 20px;border-top: 1px solid #ccd2d9;margin: 0 0 10px;}
					.tabs-section .schedule-list li .match-details-txt {border-bottom: 1px dotted #ccd2d9;padding: 5px 0;}
					.match-details-txt {font-size: 11px;font-weight: 400;color: #000;text-align: center;}
					.tabs-section .schedule-list li .match-details-txt .match-name, .tabs-section .schedule-list li .won-team .team-name a {color: #ff2759;}
					.match-details-txt span {display: inline-block;margin: 0 5px;font-size: 14px;}
					.match-time svg {vertical-align: top;}
					.match-team-details {display: flex;align-items: center;justify-content: space-around;margin: 5px 0;min-height: 98px;}
					.team-logo {text-align: center;}
					.team-logo img {width: 50%;}
					.team-name a {font-size: 18px;font-weight: bold;color: #001d42;text-transform: uppercase;display: block;margin-bottom: 10px;}
					.team-logo {text-align: center;}
					.match-widget-section .view-all-div {margin: 0 auto; padding-bottom: 0;}
					.view-all-div {padding: 10px; text-align: center; position: relative; z-index: 1;border-top: 1px solid #ccd2d9;}
					.view-all-div a {color: #ff2759;text-transform: uppercase; font-size: 14px; font-weight: bold;}
          .standings-widget-section {margin: 30px 0;clear: both;}
					.general-tbl {width: 100%;border-collapse: collapse;border-spacing: 0;}
					.standing-widget-tbl th:first-child {text-align: left;}
					.general-tbl th {font-size: 14px;font-weight: bold;color: #fff;background: #ff2759;text-transform: uppercase;padding: 5px 10px;}
					.general-tbl td {font-size: 15px;font-weight: 400;color: #001d42;text-align: center;padding: 9px 10px;vertical-align: middle;border-bottom: 1px solid #ccd2d9;}
					.standing-widget-tbl td:first-child {background: #f3f3f3;text-align: left;font-size: 14px;font-weight: bold;}
					.standing-widget-tbl td {font-size: 16px;font-weight: 400;line-height: 18px;}
					.standing-widget-tbl td:first-child a {color: #001d42;}
					.standing-widget-tbl td:last-child {background: #f3f3f3;}
          .widget-top-stories {margin: 30px 0;}
					.widget-title {font-size: 24px;font-weight: bold;text-transform: uppercase;color: #001d42;border-bottom: 1px solid #ccd2d9;padding: 0 0 10px;line-height: 18px;}
					.widget-top-stories .top-story-div {margin: 0;}
					.top-story-div {position: relative;margin-top: -255px;}
					.top-story-list li {margin: 15px 0;}
					.top-story-list li a {font-size: 16px;font-weight: bold;color: #333;position: relative;display: flex;line-height: 24px;}
					.arrow-svg {margin: 0 5px 0 -3px;}
          .widget-media-gallery .media-list {flex-wrap: wrap;}
					.media-list {padding: 0 0 20px 0;display: flex;flex-wrap: wrap;}
					.widget-media-gallery .media-list li:first-child {min-width: 100%;max-width: 100%;margin: 0 10px 10px 0;}
					.widget-media-gallery .media-list li {max-width: 48%;min-width: 48%;}
					.media-list li {margin-bottom: 20px;width: 23.5%;margin-right: 2%;}
					.media-list li .media-wrap {position: relative;overflow: hidden;height: 140px;margin-bottom: 10px;}
					.media-wrap {position: relative;}
					.widget-media-gallery .media-list li:first-child a {font-size: 16px;font-weight: 700;}
					.media-icon {position: absolute;bottom: 10px;left: 10px;}
					.widget-media-gallery .media-list li:first-child a {font-size: 16px;font-weight: 700;}
					.widget-media-gallery .media-list li .media-wrap {height: 95px;}
					.widget-media-gallery .media-list li:first-child .media-wrap {height: 140px;}
          .media-title, .media-title a {font-size: 16px;color: #333;line-height: 24px; margin: 5px 0 0;font-weight: bold;display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;}
          .score-txt {
            text-align: center;
            border: 1px solid #bebebe;
            background-color: #fff;
            border-radius: 50%;
            width: 40px;
            padding: 10px 0;
            margin: 10px auto;
          }
          h5.score-val {
            color: #425673;
            font-size: 20px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .score-txt.won-team {
            background: #ff2759;
            border: 1px solid #fff;
            box-shadow: 0 0 3px #ff2759;
          }
          .score-txt.won-team .score-val {
            color: #fff;
          }
          .results-page-list .team-name a {
              color: #425673;
          }
          .results-page-list .team-name.won-team a {
            color: #ff2759;
          }
          .widget-media-gallery .media-list li .media-wrap img {
            width: 100%;
        }
  `}</style>
    </>
  );
};
export default RightSection;
