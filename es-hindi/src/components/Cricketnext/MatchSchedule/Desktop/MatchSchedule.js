// import Outbrain from "widgets/Common/Responsive/Outbrain";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import Head from "next/head";
import SITE_CONfIG from "config/site.config";
import { useState } from "react";
import SeriesBySchedule from "./SeriesBySchedule";
import { MatchScheduleTabs } from "../../CricketNextUtils";
import MatchScheduleTableDate from "./MatchScheduleTableDate";
import MatchScheduleTableMonth from "./MatchScheduleTableMonth";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
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

const MatchSchedule = (props) => {
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
    monthBySchedule: ["महीना", "सीरीज", "तारीख", "मैच"],
    dateBySchedule: ["तारीख", "मैच", "समय/स्थान"],
  };

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
              removeAdSpan={true} lazyload={true}

            /> */}
            <NewSiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={props.pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true} 
              lazyLoad={true}
            />
            <div className="CN-scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR />
            </div>
          </div>
          <div className="CN-section">
            <div className="CN-sec-l">
            <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: "MATCH SCHEDULE"},
              ]}/>
              <div className="CN-heading-1">
                <h1 className="headinner">क्रिकेट मैच शेड्यूल</h1>
              </div>
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
                    activeTab === MatchScheduleTabs.SCHEDULE_BY_DATE
                      ? "active"
                      : ""
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
                  <SeriesBySchedule
                    pageContent={scheduleBySeries}
                    isCommonSeries={true}
                  />
                )}
                {activeTab === MatchScheduleTabs.SCHEDULE_BY_MONTH && (
                  <MatchScheduleTableMonth
                    tableHeaders={tableHeaders.monthBySchedule}
                    tableContent={scheduleByMonth}
                  />
                )}
                {activeTab === MatchScheduleTabs.SCHEDULE_BY_DATE && (
                  <MatchScheduleTableDate
                    tableHeaders={tableHeaders.dateBySchedule}
                    tableContent={scheduleByDate}
                  />
                )}
              </div>
              <div className="vsp20 clearfix"></div>
              <p className="pageContent">
                क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में खेला जाता है.
                यह खेल टेस्ट, वनडे और टी20 फॉर्मेट में खेला जाता है. ये तीनों
                फॉर्मेट अलग-अलग देशों के बीच खेले जाते हैं. इसके अलावा भारत समेत
                दुनिया के तमाम देशों में ट्वेंटी20 मैचों की लीग होती है. इसी
                कारण यह खेल साल के 365 दिन और लगभग हर घंटे खेला जाता है. इन
                मैचों की विस्तार से जानकारी यहां शेड्यूल (Schedule) से ली जा
                सकती है.
              </p>
            </div>
            <div className="CN-sec-r">
              <DynamicScoreRHSWithNoSSR pageAds={props.pageAds} isIpl="" isT20="" recent="" upcoming="" url={"/cricket/match-schedule/"} predictorData="" taboola ={true} taboolaList={TaboolaList.category} />
            </div>
          </div>
          <div className="CN-section cn-mb-40">
            <div className="CN-sec-l">
              <div className="outbrain_row">
              <Taboola
                mode={TaboolaList.category.bottom.mode}
                id={TaboolaList.category.bottom.id}
                container={TaboolaList.category.bottom.container}
                placement={TaboolaList.category.bottom.placement}
              />
              </div>
            </div>
            <div className="CN-sec-r">
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
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
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

        .CN-schedule-tabs {
          background: #f5f5f5;
          display: flex;
          border-top: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
        }

        .CN-schedule-tabs li {
          position: relative;
        }

        .CN-schedule-tabs li span {
          font-size: 18px;
          padding: 10px 15px;
          display: block;
          color: #232323;
          cursor: pointer;
        }

        .CN-schedule-tabs .active span {
          font-weight: bold;
          color: #e1261d;
        }

        .CN-schedule-tabs .active:after {
          content: "";
          height: 3px;
          width: 100%;
          left: 0;
          background: #e1261d;
          display: block;
          bottom: 0;
          position: absolute;
        }
        .clearfix {
          clear: both;
        }
        .vsp20 {
          margin-top: 20px;
        }
        .pageContent {
          font-size: 16px;
          line-height: 1.5;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default MatchSchedule;
