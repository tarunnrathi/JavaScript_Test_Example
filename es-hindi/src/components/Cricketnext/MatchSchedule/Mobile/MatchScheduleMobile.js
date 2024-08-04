// import Outbrain from "widgets/Common/Responsive/Outbrain";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import Head from "next/head";
import SITE_CONfIG from "config/site.config";
import { useState } from "react";
import { MatchScheduleTabs } from "../../CricketNextUtils";
import SeriesByScheduleMobile from "./SeriesByScheduleMobile";
import MatchScheduleMonthMobile from "./MatchScheduleMonthMobile";
import MatchScheduleDateMobile from "./MatchScheduleDateMobile";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const MatchScheduleMobile = (props) => {
  const { pageContent, pageAds } = props?.data;
  const [scheduleByDate, setScheduleByDate] = useState(pageContent);
  const [scheduleByMonth, setScheduleByMonth] = useState([]);
  const [scheduleBySeries, setScheduleBySeries] = useState([]);

  const [activeTab, setActiveTab] = useState(
    MatchScheduleTabs.SCHEDULE_BY_DATE
  );
  const handleTabChange = (clickedItem) => {
    setActiveTab(clickedItem);
    getScheduleDataBySelectedTab(clickedItem);
  };

  const getScheduleDataBySelectedTab = (clickedItem) => {
    try {
      if (clickedItem === MatchScheduleTabs.SCHEDULE_BY_SERIES || clickedItem === MatchScheduleTabs.SCHEDULE_BY_MONTH) {
        fetch(`${SITE_CONfIG.CRICKET_NEXT_CSR_API}schedule_by_${clickedItem}_hi.json`)
        .then((resp) => resp.json())
        .then((res) => {
          if(res.status === 200) {
            if (clickedItem === MatchScheduleTabs.SCHEDULE_BY_MONTH) {
              setScheduleByMonth(res?.data);
            } else if(clickedItem === MatchScheduleTabs.SCHEDULE_BY_SERIES) {
              setScheduleBySeries(res?.data);
            }
          }
        })
        .catch((err) => {
          console.log("error in api", err);
        });
      } else {
        setScheduleByDate(scheduleByDate);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const tableHeaders = {
    monthBySchedule: ["महीना", "सीरीज"],
    dateBySchedule: ["तारीख/मैच"],
  };

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
                sizes={[
                  [300, 250],
                  [336, 280]
                  ]}
              ></SiteAd> */}
              <NewSiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280]
                ]}
              />
            </div>
          </div>
          <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: "MATCH SCHEDULE"},
              ]}/>
          <h1 className="CN-heading-1">
            <div className="headinner">
              क्रिकेट <span>मैच शेड्यूल</span>
            </div>
            <div className="icon"></div>
          </h1>
          <ul className="CN-schedule-tabs">
            <li
              className={
                activeTab === MatchScheduleTabs.SCHEDULE_BY_SERIES
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleTabChange(MatchScheduleTabs.SCHEDULE_BY_SERIES)
              }
            >
              <span>सीरीज के शेड्यूल</span>
            </li>
            <li
              className={
                activeTab === MatchScheduleTabs.SCHEDULE_BY_MONTH
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleTabChange(MatchScheduleTabs.SCHEDULE_BY_MONTH)
              }
            >
              <span>महीने का शेड्यूल</span>
            </li>
            <li
              className={
                activeTab === MatchScheduleTabs.SCHEDULE_BY_DATE ? "active" : ""
              }
              onClick={() =>
                handleTabChange(MatchScheduleTabs.SCHEDULE_BY_DATE)
              }
            >
              <span>तारीखवार शेड्यूल</span>
            </li>
          </ul>
          <div className="CN-schedule-main">
            {activeTab === MatchScheduleTabs.SCHEDULE_BY_SERIES && (
              <SeriesByScheduleMobile
                pageContent={scheduleBySeries}
                isCommonSeries={true}
              />
            )}
            {activeTab === MatchScheduleTabs.SCHEDULE_BY_MONTH && (
              <MatchScheduleMonthMobile
                tableHeaders={tableHeaders.monthBySchedule}
                tableContent={scheduleByMonth}
              />
            )}
            {activeTab === MatchScheduleTabs.SCHEDULE_BY_DATE && (
              <MatchScheduleDateMobile
                tableHeaders={tableHeaders.dateBySchedule}
                tableContent={scheduleByDate}
              />
            )}
          </div>
          <div className="vsp20 clearfix"></div>
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                width={300}
                height={280}
                slotId={"mobileAdNew300x250_1"}
                adUnit={pageAds.BTF_300}
                lazyload={true}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
              ></SiteAd> */}
              <NewSiteAd
                width={300}
                height={280}
                slotId={"mobileAdNew300x250_1"}
                adUnit={pageAds.BTF_300}
                lazyLoad={true}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
              />
            </div>
          </div>
          <p className="pageContent">
            क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में खेला जाता है. यह
            खेल टेस्ट, वनडे और टी20 फॉर्मेट में खेला जाता है. ये तीनों फॉर्मेट
            अलग-अलग देशों के बीच खेले जाते हैं. इसके अलावा भारत समेत दुनिया के
            तमाम देशों में ट्वेंटी20 मैचों की लीग होती है. इसी कारण यह खेल साल
            के 365 दिन और लगभग हर घंटे खेला जाता है. इन मैचों की विस्तार से
            जानकारी यहां शेड्यूल (Schedule) से ली जा सकती है.
          </p>
          <div className="outbrain_row">
          <Taboola
            mode={TaboolaList.category.bottom.mode}
            id={TaboolaList.category.bottom.id}
            container={TaboolaList.category.bottom.container}
            placement={TaboolaList.category.bottom.placement}
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
          //background: #e8e9ed;
          background: #dbdde3;
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

        .CN-pageOutter {
          margin-bottom: 20px;
          width: 100%;
        }

        .CN-pageWrapper {
          padding: 0 0 10px;
          position: relative;
          background-size: cover;
          background: #fff;
          font-family: "Mukta", sans-serif !important;
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

        //SLICK TRACKER OVERRIDE
        .slick-track {
          gap: 10px;
        }
        .slick-dots li {
          width: 20px !important;
        }
        .CN__scoreCardsection {
          // padding: 0 5px;
          margin-right: 10px;
        }

        .CN-breadcum a {
          padding: 0 4px;
          flex-shrink: 0;
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

        .CN-breadcum h1 {
          line-height: 13px;
          color: #292929;
          font-weight: 400;
          display: inline-block;
        }

        .CN-heading-1 {
          font-size: 22px;
          background: none;
          font-weight: 700;
          text-transform: uppercase;
          color: #e1261c;
          padding: 5px 0 2px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .CN-heading-1 .headinner {
          background: #ffffff;
          padding: 0 5px;
        }

        .CN-heading-1 .headinner span {
          color: #001d42;
        }
        .CN-heading-1 .icon {
          border: solid black;
          border-width: 0 2px 2px 0;
          display: inline-block;
          width: 8px;
          height: 8px;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          margin-right: 10px;
          z-index: 1;
        }
        .CN-heading-1:after {
          content: "";
          position: absolute;
          background: #fff;
          width: 22px;
          height: 19px;
          right: 0;
        }

        .CN-schedule-tabs {
          display: flex;
          background: #f5f5f5;
          margin-bottom: 10px;
          font-size: 15px;
          text-transform: uppercase;
          border-top: 1px solid #d8d8d8;
          border-bottom: 1px solid #d8d8d8;
          overflow-x: auto;
          white-space: nowrap;
        }

        .CN-schedule-tabs li {
          position: relative;
        }

        .CN-schedule-tabs li span {
          padding: 8px 10px;
          display: block;
        }

        .CN-schedule-tabs .active span {
          font-weight: bold;
          color: #ff0000;
        }

        .CN-schedule-tabs .active:after {
          content: "";
          width: 100%;
          background: #ff0000;
          height: 3px;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .clearfix {
          clear: both;
        }

        .vsp20 {
          margin-top: 20px;
        }

        .pageContent {
          padding: 10px 10px;
          font-size: 16px;
          line-height: 1.5;
        }

        .CN-schedule-main {
          padding: 0 6px;
        }
      `}</style>
    </>
  );
};

export default MatchScheduleMobile;
