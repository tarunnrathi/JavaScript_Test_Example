// import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import CricketProfileNews from "../CricketProfileNews";
import CricketPlayerInfoCard from "./CricketPlayerInfoCard";
import Head from "next/head";
import {
  PlayerProfileTableHeaders,
  PlayerProfileTabs,
} from "components/Cricketnext/CricketNextUtils";
import CricketProfileTable from "../CricketProfileTable";
import ReactHtmlParser from "react-html-parser";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const DynamicScoreRHSWithNoSSR = dynamic(
  () => import('components/Cricketnext/Cards/ScoreRHS'),
  { ssr: false }
);

const CricketPlayerProfile = (props) => {
  const { pageContent, pageAds, paramObj } = props?.data;
  const {
    pageType,
    playerInfoUrl,
    battingUrl,
    bowlingUrl,
    newsUrl,
    currentPath,
    teamUrl
  } = paramObj;

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="CN-pageOutter CN-Desktop-HomeOuter">
        <div className="CN-pageWrapper">
          <div className="CN-pageCN-scoreCardsection">
            {/* <SiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={props.pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}
            /> */}
            <NewSiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={props.pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}        
            />
            <div className="CN-scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR />
            </div>
          </div>
          <div className="CN-section">
            <div className="CN-sec-l">
            <BreadcrumbCommon breadCrumbArray={[
                  { value: "NEWS18 हिंदी", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `TEAM ${pageContent?.team?.name ? pageContent?.team?.name?.toUpperCase() : ''}`, slug: teamUrl},
                  { value: pageContent?.name ? pageContent?.name?.toUpperCase() : ''},
              ]}/>
              <CricketPlayerInfoCard
                paramObj={paramObj}
                pageContent={pageContent}
              />
              <ul className="CN-profile-tabs">
                <li
                  className={`${pageType === PlayerProfileTabs.PLAYER_INFO ? "active" : ""
                    }`}
                >
                  <a href={playerInfoUrl}>खिलाड़ी</a>
                </li>
                <li
                  className={`${pageType === PlayerProfileTabs.BATTING ? "active" : ""
                    }`}
                >
                  <a href={battingUrl}>बैटिंग स्टैट्स</a>
                </li>
                <li
                  className={`${pageType === PlayerProfileTabs.BOWLING ? "active" : ""
                    }`}
                >
                  <a href={bowlingUrl}>बॉलिंग स्टैट्स</a>
                </li>
                <li
                  className={`${pageType === PlayerProfileTabs.NEWS ? "active" : ""
                    }`}
                >
                  <a href={newsUrl}>खबरें</a>
                </li>
              </ul>
              {pageType === PlayerProfileTabs.PLAYER_INFO && (
                <>
                  <CricketProfileTable
                    tableHeaders={PlayerProfileTableHeaders.playerPersonalInfo}
                    currentTab={pageType}
                    tableBodyContent={pageContent}
                    isPlayerPersonalInfo={true}
                  />
                  <CricketProfileTable
                    tableHeaders={PlayerProfileTableHeaders.playerInfo}
                    currentTab={pageType}
                    tableBodyContent={pageContent}
                  />
                  <div className="profile-content" id="profile-content">
                    <div className="CN-heading-1">
                      <span className="headinner">प्रोफ़ाइल</span>
                    </div>
                    <p>{ReactHtmlParser(pageContent?.writeup)}</p>
                  </div>
                </>
              )}
              {pageType === PlayerProfileTabs.BATTING && (
                <CricketProfileTable
                  tableHeaders={PlayerProfileTableHeaders.battingStats}
                  currentTab={pageType}
                  tableBodyContent={pageContent}
                />
              )}
              {pageType === PlayerProfileTabs.BOWLING && (
                <CricketProfileTable
                  tableHeaders={PlayerProfileTableHeaders.bowlingStats}
                  currentTab={pageType}
                  tableBodyContent={pageContent}
                />
              )}
              {pageType === PlayerProfileTabs.NEWS && (
                <CricketProfileNews
                  pageContent={pageContent}
                  paginationData={paramObj}
                  isProfilePage = {true}
                />
              )}
              <div className="middlead">
                {/* <SiteAd
                  width={728}
                  height={90}
                  slotId={"Desktop_Static_Ad_1"}
                  adUnit={pageAds?.BTF_728}
                  sizes={[[728, 90]]}
                  loadonScroll={true}
                ></SiteAd> */}
                <NewSiteAd
                  width={728}
                  height={90}
                  slotId={"Desktop_Static_Ad_1"}
                  adUnit={pageAds?.BTF_728}
                  sizes={[[728, 90]]}
                  loadOnScroll={true}       
                />
              </div>
              <div className="outbrain_row">
                <Outbrain
                  widgetId="AR_6"
                  widgetSrc={`https://hindi.news18.com${currentPath}`}
                />
              </div>
            </div>

            <div className="CN-sec-r">
              <DynamicScoreRHSWithNoSSR pageAds={props.pageAds} isIpl="" isT20="" recent="" upcoming="" url={currentPath} predictorData="" />

              {typeof pageAds !== "undefined" &&
                typeof pageAds.PG_Slider_1x1 !== "undefined" ? (
                // <SiteAd
                //   slotId="PG_Slider_1x1"
                //   adUnit={pageAds.PG_Slider_1x1}
                //   sizes={[[1, 1]]}
                //   removeAdSpan={true}
                //   loadonScroll={true}
                // />
                <NewSiteAd
                  slotId="PG_Slider_1x1"
                  adUnit={pageAds.PG_Slider_1x1}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}     
                />
              ) : null}
              {typeof pageAds.PG_1x1_2 !== "undefined" &&
                pageAds.PG_1x1_2 !== "" ? (
                // <SiteAd
                //   slotId="PG_1x1_2"
                //   adUnit={pageAds.PG_1x1_2}
                //   sizes={[[1, 1]]}
                //   removeAdSpan={true}
                //   loadonScroll={true}
                // />
                <NewSiteAd
                  slotId="PG_1x1_2"
                  adUnit={pageAds.PG_1x1_2}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={false} 
                />
              ) : null}

            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .middlead {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 10px auto;
          min-height: 20px;
          width: max-content !important;
          background: #eee !important;
          color: #444 !important;
          font-size: 12px !important;
          text-align: center !important;
        }

         // FOR HEADER TITLE SIDE LINE
        .nhlogo {
          border-right: 1px solid #374a47;
          margin-right: 15px;
        }

        .CN-pageOutter {
          margin-bottom: 20px;
          width: 100%;
        }
        .CN-pageWrapper {
          max-width: 1244px;
          margin: 0 auto;
          background: #fff;
          clear: both !important;
        }

        .CN-pageCN-scoreCardsection {
          min-height: 60px;
          background: rgb(0 0 0 / 13%);
          margin-top: 10px;
        }

        .CN-scoreCardsection {
          background: #f5f5f5;
          padding: 0 15px;
        }

        .CN-section .CN-sec-l {
          width: 924px;
          min-width: 924px;
        }
        .CN-section .CN-sec-r {
          width: 300px;
          min-width: 300px;
        }
        .cn-thumbnailwrap {
          margin-bottom: 25px;
          display: flex;
          justify-content: space-between;
        }
        .CN-section {
          display: flex;
          justify-content: space-between;
          font-family: "Mukta", sans-serif;
        }
        .cn-mb-40 {
          margin-bottom: 40px;
        }
        .CN-heading-1 {
          border-bottom: 3px solid #e1261d;
          margin-bottom: 10px;
        }
        .CN-heading-1 .headinner {
          font-size: 22px;
          line-height: 20px;
          color: #e1261d;
          background: #fff;
          position: relative;
          top: 10px;
          padding-right: 4px;
          display: inline-block;
          text-transform: uppercase;
          font-weight: bold;
          border-bottom: 1px solid transparent;
        }

        .CN-Desktop-HomeOuter .cn-thumbnailwrap .CN-Sections {
          width: 48%;
        }

        .CN-breadcum {
          font-family: "Mukta", sans-serif !important;
          font-size: 14px;
          line-height: 13px;
          color: #292929;
          text-transform: uppercase;
          padding: 4px 0;
          border-bottom: 1px dotted #939393;
          margin-bottom: 5px;
        }
        .CN-breadcum h1 {
          display: inline-block;
          font-size: 14px;
          line-height: 13px;
          font-weight: normal;
        }

        .CN-profile-tabs {
          background: #f5f5f5;
          display: flex;
          border-top: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
          margin-bottom: 10px;
        }
        .CN-profile-tabs li {
          position: relative;
        }

        .CN-profile-tabs li a {
          font-size: 18px;
          padding: 10px 15px;
          display: block;
          text-transform: uppercase;
          color: #232323;
        }

        .CN-profile-tabs li.active a {
          color: #e1261d;
          font-weight: bold;
        }
        .CN-profile-tabs li.active:after {
          content: "";
          height: 3px;
          width: 100%;
          left: 0;
          background: #e1261d;
          display: block;
          bottom: 0;
          position: absolute;
        }

        .profile-content p {
          color: #000;
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 15px;
        }

        // TABLE
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }

        .CN-profileTable {
          width: 100%;
          margin-bottom: 30px;
        }

        .CN-profileTable tr th {
          background: #001d42;
          color: #fff;
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
          padding: 10px 0;
          text-align: left;
          width: 160px;
        }

        .CN-profileTable tr th,
        .CN-profileTable tr td {
          text-align: center;
        }

        .CN-profileTable tr th:first-child,
        .CN-profileTable tr td:first-child {
          padding-left: 20px;
          text-align: left;
        }

        .CN-profileTable tr th:first-child {
          width: initial;
        }

        .CN-profileTable tbody tr {
          border-bottom: 1px solid #d8d8d8;
          background: #f5f5f5;
        }

        .CN-profileTable tr td {
          padding-right: 10px;
          font-size: 14px;
          padding-top: 6px;
          padding-bottom: 6px;
        }

        .CN-profileTable tr td:first-child {
          font-weight: bold;
        }

        .personalInfo th {
          width: auto !important;
        }
        .personalInfoBody tr td {
          text-align: left;
        }
        .personalInfoBody tr td:first-child {
          width: 200px;
        }

        // PROFILE NEWS PAGE
        .CN-latestStory-widget {
          display: grid;
          grid-template-columns: 217px 217px 217px 217px;
          column-gap: 19px;
          row-gap: 19px;
          border-bottom: 1px solid #d8d8d8;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        .removeGridLayout {
          grid-template-columns: 1fr;
        }

        .CN-latestStory-widget li a {
          display: block;
        }
        .CN-latestStory-widget li a .image-box img {
          display: block;
          width: 100%;
        }
        .CN-latestStory-widget li a p {
          margin-top: 7px;
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 20px;
          color: #292929;
        }

        .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer}

      `}</style>
    </>
  );
};

export default CricketPlayerProfile;
