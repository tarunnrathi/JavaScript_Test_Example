// import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import CricketPlayerInfoCard from "./CricketPlayerInfoCardMobile";
import Head from "next/head";
import {
  PlayerProfileTableHeaders,
  PlayerProfileTabs,
} from "components/Cricketnext/CricketNextUtils";

const Outbrain = dynamic(() => import("widgets/Common/Responsive/Outbrain"));
// import Outbrain from "widgets/Common/Responsive/Outbrain";
const CricketProfileNews = dynamic(() => import("../CricketProfileNews"));
// import CricketProfileNews from "../CricketProfileNews";
const CricketProfileTable = dynamic(() => import("../CricketProfileTable"));
// import CricketProfileTable from "../CricketProfileTable";
import ReactHtmlParser from "react-html-parser";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const CricketPlayerProfileMobile = (props) => {
  const { pageContent, pageAds, paramObj } = props?.data;
  const {
    pageType,
    playerInfoUrl,
    battingUrl,
    bowlingUrl,
    newsUrl,
    currentPath,
    teamUrl,
  } = paramObj;
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="CN-pageOutter CN-Mobile-HomeOuter">
        <div className="CN-pageWrapper">
          <div className="CN-pageCN-scoreCardsection">
            <div className="bet__ad">
              {/* <SiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              /> */}
              <NewSiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyLoad={true}       
              />
            </div>
            <div className="CN__scoreCardsection">
              {/* scorecard component */}
              <DynamicCrTopScoreWidgetWithNoSSR isMobile />
            </div>
          </div>
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                 width={336}
                 height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds.ATF_320}
                sizes={[[300, 250], [336, 280]]}
              ></SiteAd> */}
              <NewSiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds.ATF_320}
                sizes={[[300, 250], [336, 280]]} 
              />
            </div>
          </div>
          
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
              <div className="clearfix add">
                <div className="addinner-box addinner_box_300x250">
                  {/* <SiteAd
                    width={300}
                    height={280}
                    slotId={"mobileAdNew300x250_1"}
                    adUnit={pageAds.ATF_300}
                    lazyload={true}
                    sizes={[[300, 250], [336, 280]]}
                  ></SiteAd> */}
                  <NewSiteAd
                    width={300}
                    height={280}
                    slotId={"mobileAdNew300x250_1"}
                    adUnit={pageAds.ATF_300}
                    lazyLoad={true}
                    sizes={[[300, 250], [336, 280]]}
                  />
                </div>
              </div>
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
              pageAds={pageAds}
              isMobile={true}
              isProfilePage = {true}
            />
          )}
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                width={300}
                height={250}
                slotId={"mobileAdNew300x250_2"}
                adUnit={pageAds.BTF_300}
                sizes={[[300, 250], [336, 280]]}
                lazyload={true}
              ></SiteAd> */}
               <NewSiteAd
                  width={300}
                  height={250}
                  slotId={"mobileAdNew300x250_2"}
                  adUnit={pageAds.BTF_300}
                  sizes={[[300, 250], [336, 280]]}
                  lazyLoad={true}
                />
            </div>
          </div>
          <div className="profile-content outbrain_row">
            <Outbrain
              widgetId="MB_6"
              widgetSrc={`https://hindi.news18.com${currentPath}`}
            />
          </div>
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
          {typeof pageAds.PG_1x1_3 !== "undefined" &&
            pageAds.PG_1x1_3 !== "" ? (
            // <SiteAd
            //   slotId="PG_1x1_3"
            //   adUnit={pageAds.PG_1x1_3}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="PG_1x1_3"
              adUnit={pageAds.PG_1x1_3}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={true}
            />
          ) : null}
        </div>
      </div>
      <style jsx global>{`
        .CN-pageOutter {
          margin-bottom: 20px;
          width: 100%;
        }

        .CN-pageWrapper {
          padding: 0 0 10px;
          position: relative;
          background-size: cover;
          background: #fff;
          font-family: "Mukta", sans-serif;
        }

        .CN-pageCN-scoreCardsection {
          min-height: 115px;
          background: rgb(0 0 0 / 13%);
        }

        .bet__ad {
          background: #fff;
        }

        .CN-pageCN-scoreCardsection .adunitContainer {
          display: flex;
          justify-content: center;
        }

        .add {
          background: #dbdde3;
          position: relative;
          padding: 16px 0;
          line-height: 0;
          text-align: center;
          margin-bottom: 10px;
          display: inline-block;
          width: 100%;
          z-index: 1;
          color: #797e90 !important;
          //height: 300px;
          overflow: hidden;
        }
        .addinner-box {
          background: #e8e9ed;
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: auto;
          padding: 0;
          box-sizing: border-box;
          color: #797e90 !important;
          font-size: 11px;
          line-height: 16px;
        }

        // div.addinner_box_300x250 {
        //   height: 268px;
        //   width: 300px;
        // }

        //SLICK TRACKER OVERRIDE
        .slick-track {
          gap: 10px;
        }
        .slick-dots li {
          width: 20px !important;
        }
        .CN__scoreCardsection {
          margin-right: 10px;
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
          top: 8px;
          padding-right: 4px;
          text-transform: uppercase;
          font-weight: bold;
        }

        .CN-breadcum {
          font-size: 13px;
          background: none;
          border-top: none;
          border-bottom: 1px dashed rgb(147 147 147 / 57%);
          display: flex;
          overflow: scroll;
          padding: 8px 10px 5px 10px;
          margin-bottom: 0;
        }

        .CN-breadcum a {
          padding: 0 4px;
          flex-shrink: 0;
        }

        .CN-breadcum h1 {
          line-height: 13px;
          color: #292929;
          font-weight: 400;
          display: inline-block;
        }

        .CN-profile-tabs {
          display: flex;
          background: #f5f5f5;
          margin-bottom: 10px;
          font-family: "Segoe Pro Regular";
          font-size: 15px;
          text-transform: uppercase;
          border-top: 1px solid #d8d8d8;
          border-bottom: 1px solid #d8d8d8;
          overflow-x: auto;
          white-space: nowrap;
        }
        .CN-profile-tabs li {
          position: relative;
        }

        .CN-profile-tabs li a {
          padding: 8px 10px;
          display: block;
          color: #232323;
        }

        .CN-profile-tabs li.active a {
          font-weight: bold;
          color: #ff0000;
        }
        .CN-profile-tabs li.active:after {
          content: "";
          width: 100%;
          background: #ff0000;
          height: 3px;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .profile-content {
          padding: 0 10px;
        }

        .profile-content p {
          font-size: 13px;
          line-height: 22px;
          margin-bottom: 15px;
        }
        .profile-content p:last-child {
          margin-bottom: 0;
        }

        // TABLE MOBILE
        .CN-profileTable {
          width: 100%;
          margin-bottom: 20px;
          border-collapse: collapse;
          border-spacing: 0;
          font-family: "Mukta", sans-serif;
        }

        .CN-profileTable tr th {
          background: #001d42;
          color: #fff;
          font-size: 11px;
          text-transform: uppercase;
          padding: 4px 0;
          text-align: center;
        }

        .CN-profileTable tr th:first-child,
        .CN-profileTable tr td:first-child {
          padding-left: 10px;
          font-weight: bold;
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
          text-align: center;
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
          padding: 0 10px;
          margin-bottom: 10px;
        }
        .CN-latestStory-widget li {
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #d7d7d7;
        }

        .CN-latestStory-widget li a {
          display: flex;
        }

        .CN-latestStory-widget li a .image-box {
          flex: 0 0 110px;
          margin-right: 10px;
          height: 73px;
          overflow: hidden;
          border-radius: 5px;
        }

        .CN-latestStory-widget li a .image-box img {
          display: block;
        }
        .CN-latestStory-widget li a p {
          font-size: 15px;
          line-height: 1.5;
          font-weight: bold;
          color: #0a0a0a;
        }

        .load_more {
          display: block;
          text-align: center;
          border-radius: 8px;
          width: 200px;
          color: #fff;
          text-decoration: none;
          border: 0;
          cursor: pointer;
          margin: 15px auto;
          padding: 10px 20px;
          background: #ee1b24;
          clear: both;
          font-size: 15px;
        }
      `}</style>
    </>
  );
};

export default CricketPlayerProfileMobile;
