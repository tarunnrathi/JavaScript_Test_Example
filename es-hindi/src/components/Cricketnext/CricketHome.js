import StoryWrap from "components/Cricketnext/home/StoryWrap";
import OfTheField from "components/Cricketnext/home/OfTheField";
import Photogallery from "components/Cricketnext/home/PhotoGallery";
import Features from "components/Cricketnext/home/Features";
import OnThisDay from "components/Cricketnext/home/OnThisDay";
import LatestNews from "components/Cricketnext/home/LatestNews";
import CnSeriesWidget from "widgets/Common/Responsive/CnSeriesWidget";
import Head from "next/head";
// import Outbrain from "widgets/Common/Responsive/Outbrain";
import StaticContent from "./home/StaticContent";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from 'next/dynamic';
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import('widgets/Common/Responsive/CrTopScoreWidget'),
  { ssr: false }
);

const DynamicRHSWithNoSSR = dynamic(
  () => import('components/Cricketnext/home/RHS'),
  { ssr: false }
);

const CricketHome = (props) => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Karma:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="CN-pageOutter CN-Desktop-HomeOuter">
        <div className="CN-pageWrapper">

          <div className="CN-pageCN-scoreCardsection">
            <div className="CN-scoreCardsection">
              {/* scorecard component */}
              <DynamicCrTopScoreWidgetWithNoSSR />
            </div>
            <div style={{ minHeight: "60px", background: "#00000021", marginTop: "10px" }}>
              {/* <SiteAd
                slotId="Desktop_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[1244, 60]]}
                width={1244}
                height={60}
                removeAdSpan= {true}
                lazyload={true}
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
            </div>
            <div className="CN-section">
              <div className="CN-sec-l">
                <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/" },
                  { value: "Cricket" },
                ]} />
                <StoryWrap stories={props.data?.topStories} />

                <CnSeriesWidget
                  homeSeriesData={props.data?.homeSeriesData}
                  matchSchedule={props.data?.matchSchedule}
                  matchResult={props.data?.matchResult}
                />
                <div className="cn-thumbnailwrap">
                  <OfTheField offTheFieldData={props.data?.offTheFieldData} />
                  <Photogallery gallery={props.data?.gallerySection} />
                </div>
                <div className="cn-thumbnailwrap">
                  <Features featuresData={props.data?.featuresData} />
                  <OnThisDay archivesData={props.data?.archivesData} />
                </div>
              </div>
              <div className="CN-sec-r">
                <DynamicRHSWithNoSSR position={"first"} pageAds={props.pageAds} taboola={false} taboolaList={TaboolaList.category} />
              </div>
            </div>

            {/* <Videos videos={props.data.videoSection} /> */}
            <div className="CN-section cn-mb-40">
              <div className="CN-sec-l">
                <LatestNews latestData={props.data.latestStories} />
                <StaticContent />
                {/* <div className="outbrain_row">
                  <Outbrain widgetId="AR_6" widgetSrc="https://hindi.news18.com/cricket/" />
                </div> */}
                <Taboola
                  mode={TaboolaList.category.bottom.mode}
                  id={TaboolaList.category.bottom.id}
                  container={TaboolaList.category.bottom.container}
                  placement={TaboolaList.category.bottom.placement}
                />
              </div>
              <div className="CN-sec-r">
                <DynamicRHSWithNoSSR position={"second"} pageAds={props.pageAds} taboola={true} taboolaList={TaboolaList.category} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,900&display=swap");
        .CN-pageOutter {
          // background: #f5f5f5;
          margin-bottom: 20px;
          width: 100%;
        }
        .CN-pageWrapper {
          max-width: 1244px;
          margin: 0 auto;
          background: #fff;
          clear: both !important;
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
          font-family: 'Mukta',sans-serif;
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
          font-family: 'Mukta',sans-serif;
          text-transform: uppercase;
          font-weight: bold;
          border-bottom: 1px solid transparent;
        }
        .cn-smallstory-wrapper .cn-smallstory .text-box .heading-1 {
          font-size: 16px;
          line-height: 1.5;
          font-weight: bold;
        }
        .CN-Desktop-HomeOuter .cn-thumbnailwrap .CN-Sections {
          width: 48%;
        }
        .lazyload-wrapper {
          margin: 0px 0px 10px 0px;
        }
        .CN-scoreCardsection {
          background: #f5f5f5;
          padding: 0 15px;
        }
      `}</style>
    </>
  );
};

export default CricketHome;
