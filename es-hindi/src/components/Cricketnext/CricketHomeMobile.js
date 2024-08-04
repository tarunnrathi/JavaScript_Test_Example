import StoryWrap from "components/Cricketnext/home/StoryWrap";
import OfTheField from "components/Cricketnext/home/OfTheField";
import Photogallery from "components/Cricketnext/home/PhotoGallery";
import Features from "components/Cricketnext/home/Features";
import OnThisDay from "components/Cricketnext/home/OnThisDay";
import LatestNews from "components/Cricketnext/home/LatestNews";
import CnSeriesWidget from "widgets/Common/Responsive/CnSeriesWidget";
import TeamRanking from "widgets/Common/Responsive/TeamRanking";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import Head from "next/head";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import StaticContent from "./home/StaticContent";
import dynamic from 'next/dynamic';
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import('widgets/Common/Responsive/CrTopScoreWidget'),
  { ssr: false }
);

const CricketHomeMobile = ({ data, pageAds }) => {
  return (
    <>
      <Head>
        {/* <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&display=swap" rel="stylesheet"/> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Karma:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>  */}
      </Head>
      <div className="CN-pageOutter CN-Mobile-HomeOuter">
        <div className="CN-pageWrapper">
          <div style={{ minHeight: "60px", background: "#f5f5f5", paddingTop: "10px", paddingBottom: "10px" }}>
            {/* <SiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={pageAds?.ScoreCard_ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan= {true}
                lazyload={true}
            /> */}
            <NewSiteAd
              slotId="Mobile_ScoreCard_ad"
              adUnit={pageAds?.ScoreCard_ad}
              sizes={[[320, 60]]}
              width={320}
              height={60}
              removeAdSpan= {true}
              lazyLoad={true}
            />
          </div>
          {/* scorecard component */}
          {/*test test*/}
          <div style={{ height: "160px", overflow: "hidden", padding: "0 10px" }}>
          <DynamicCrTopScoreWidgetWithNoSSR isMobile data={data?.scoreCardData || []}/>
          </div>
          <BreadcrumbCommon breadCrumbArray={[
              { value: "हिंदी समाचार", slug: "/"},
              { value: "Cricket"},
            ]}/>
          {pageAds.header_ATF_320 ? (
            <div className="ad-container">
              <div className="addinner-box">
                {/* <SiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_0"
                  adUnit={pageAds.header_ATF_320}
                  sizes={[[300, 250], [336, 280]]}
                ></SiteAd> */}
                <NewSiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_0"
                  adUnit={pageAds.header_ATF_320}
                  sizes={[[300, 250], [336, 280]]}
                />
              </div>
            </div>
          ) : null}
          <StoryWrap stories={data?.topStories} isMobile />
          {/* <DynamicCrTopScoreWidgetWithNoSSR homeSeriesData={data?.homeSeriesData} isMobile /> */}
          <CnSeriesWidget
            homeSeriesData={data?.homeSeriesData}
            isMobile={true}
            matchSchedule={data?.matchSchedule}
            matchResult={data?.matchResult}
          />
          <OfTheField offTheFieldData={data?.offTheFieldData} isMobile />
          {pageAds.ATF_300 ? (
            <div className="ad-container">
              <div className="addinner-box">
                {/* <SiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_1"
                  adUnit={pageAds.ATF_300}
                  sizes={[[300, 250], [336, 280]]}
                  lazyload={true}
                ></SiteAd> */}
                <NewSiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_1"
                  adUnit={pageAds.ATF_300}
                  sizes={[[300, 250], [336, 280]]}
                  loadOnScroll={true}
                />
              </div>
            </div>
          ) : null}
          <Photogallery gallery={data?.gallerySection} isMobile />
          <Features featuresData={data?.featuresData} isMobile/>
          {pageAds.BTF_300 ? (
            <div className="ad-container" style={{ marginBottom: "30px" }}>
              <div className="addinner-box">
                {/* <SiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_2"
                  adUnit={pageAds.BTF_300}
                  sizes={[[300, 250], [336, 280]]}
                  lazyload={true}
                ></SiteAd> */}
                <NewSiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_2"
                  adUnit={pageAds.BTF_300}
                  sizes={[[300, 250], [336, 280]]}
                  loadOnScroll={true}
                />
              </div>
            </div>
          ) : null}
          <OnThisDay archivesData={data?.archivesData} isMobile/>
          {/* <Videos videos={data.videoSection} isMobile/> */}
          <TeamRanking />
          <LatestNews latestData={data.latestStories} isMobile/>
          <StaticContent />
          {/* <div className="outbrain_row">
            <Outbrain widgetId="MB_6" widgetSrc="https://hindi.news18.com/cricket/" />
          </div>                         */}
            <Taboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
      />
        </div>
      </div>
      <style jsx global>{`
        .wapper {
          height: 670px;
        }
        .CN-pageOutter {
          margin-bottom: 20px;
          width: 100%;
        }
        .CN-pageWrapper {
          padding: 0 0 10px;
          position: relative;
          background-size: cover;
          background: #fff;
        }
        .CN-Mobile-HomeOuter .CN-Sections {
          border-bottom: 6px solid #eeeeee;
          margin-bottom: 30px;
          font-family: 'Mukta',sans-serif !important;
        }
        .CN-Mobile-HomeOuter .CN-heading-1 {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 22px;
          color: #e1261c;
          padding: 0 0 0 10px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/cn-heading-bg.png);
          background-repeat: repeat-x;
          background-position: center;
          position: relative;
          font-family: 'Mukta',sans-serif !important;
          width: 100%;
          line-height:1.2;
        }
        .CN-Mobile-HomeOuter .CN-heading-1:after {
          content: "";
          position: absolute;
          background: #fff;
          width: 22px;
          height: 19px;
          right: 0;
        }
        .CN-Mobile-HomeOuter .CN-heading-1 .headinner {
          background: #ffffff;
          padding: 0 5px;
          border-bottom: 1px dotted #d7d7d7;
          font-size: 22px;
        }
        .CN-Mobile-HomeOuter .CN-heading-1 .headinner span {
          color: #001d42;
        }
        .CN-Mobile-HomeOuter .CN-heading-1 .icon {
          border: 1px solid black;
          border-width: 0 2px 2px 0;
          display: inline-block;
          width: 8px;
          height: 8px;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          margin-right: 10px;
          z-index: 1;
        }
        .CN-Mobile-HomeOuter .CN-Sections .cn-smallstory .text-box .heading-1 {
          font-size: 16px;
          line-height: 1.5;
          font-weight: normal;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box {
          background: #222222;
          padding: 10px 0;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-heading-1 .headinner {
          color: #ffcc00;
          background: #222;
          border-bottom-color: #989898;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-heading-1 .icon {
          border-color: #ffffff;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-heading-1:after {
          background: #222;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-heading-1 {
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/cn-heading-bg-2.png);
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-slider-mobile {
          position: relative;
          box-sizing: border-box;
          padding-top: 10px;
         margin:10px;
         overflow:hidden
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-slider-mobile::before {
          content: "";
          position: absolute;
          width: 40px;
          background: #e1261c;
          height: 6px;
          top: 0;
          left: 0;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-slider-mobile .heading {
          margin-bottom: 5px;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-slider-mobile .heading a {
          display: block;
          font-size: 16px;
          line-height: 22px;
          font-family: 'Mukta',sans-serif !important;
          color: #fff;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-slider-mobile .image-box {
          position: relative;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-slider-mobile .image-box a {
          border-radius: 10px;
          overflow: hidden;
        }

        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-slider-mobile .image-box a,
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-slider-mobile .image-box a img {
          display: block;
          width: 100%;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-slider-mobile .image-box .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: -webkit-linear-gradient(top, transparent 10%, #000000c9 80%);
          border-radius: 5px;
          left: 0;
          top: 0;
          border: 1px solid #707070;
          box-sizing: border-box;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .CN-slider-mobile .image-box .img-icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        .CN-Mobile-HomeOuter .CN-Sections.dark-box .cn-morebtn1 {
          margin-bottom: 0;
          color: #FFCC00;
          border-color: #FFCC00;
          background: #0A0A0A;
      }
      .CN-Mobile-HomeOuter .CN-Sections .cn-smallstory-wrapper .cn-smallstory .imgbox{
        border-radius: 5px;
        margin-right: 0;
        flex: 0 0 110px;
        overflow: hidden;
        align-self: flex-start;
      }


      .CN-Mobile-HomeOuter .CN-LeadStory {
        margin-bottom: 10px;
        overflow: hidden;
      }
      .CN-LeadStory figure, .CN-Thumbstory figure{
        margin: auto;
      }
      .CN-Mobile-HomeOuter .CN-LeadStory .CN-LeadHead {
        font-size: 18px;
        line-height: 24px;
        background: #001e44;
        padding: 20px 10px 15px 10px;
        position: relative;
      }
      .CN-Mobile-HomeOuter .CN-LeadStory .CN-LeadHead:before {
        content: "";
        position: absolute;
        width: 40px;
        background: #e1261c;
        height: 6px;
        top: 10px;
        left: 0;
      }
      .CN-Mobile-HomeOuter .CN-LeadStory .CN-LeadHead a {
        color: #fff;
        font-family: 'Mukta',sans-serif !important;
      }
      .CN-Mobile-HomeOuter .CN-LeadStory figure a {
        display: block;
        position: relative;
      }
      .CN-Mobile-HomeOuter .CN-LeadStory figure a .CN-LeadBtn {
        position: absolute;
        top: 12px;
        left: 12px;
        background: #e1261d;
        padding: 2px 10px;
        font-size: 11px;
        color: #fff;
        text-transform: uppercase;
      }
      .CN-Mobile-HomeOuter .CN-LeadStory figure a img {
        width: 100%;
        display: block;
      }
      .CN-Mobile-HomeOuter .CN-morestory-round-btn {
        font-family: 'Mukta',sans-serif !important;
        font-weight: 600;
        text-align: center;
        display: table;
        color: #e1261c;
        border: 2px solid #e1261c;
        padding: 5px 8px;
        text-transform: uppercase;
        margin: 10px auto;
        border-radius: 20px;
        width: 240px;
        font-size: 13px;
      }
      .ad-container{
        background: #dbdde3;
        padding: 16px 0;
        text-align: center;
        //height: 330px;
        overflow: hidden;
      }
      .ad-container .addinner-box {
        //background: #e8e9ed;
        background: #dbdde3;
        min-width: 250px;
        display: inline-block;
        margin: 0 auto;
        text-align: center;
        min-height: 250px;
        padding: 0;
        box-sizing: border-box;
      }
      .ad-container span#vigyapan{
        color: #797e90;
        font-size: 11px;
        text-align: center;
        padding: 2px 0 0;
        display: block;
        line-height: 16px;
      }
      .outbrain_row{
        padding: 0 15px;
      }
      .CN-breadcum {
        font-size: 13px;
        font-family: 'Mukta',sans-serif;
        line-height: 13px;
        color: #292929;
        text-transform: uppercase;
        padding: 5px 0 5px 10px;
        background: #f5f5f5;
        border-top: 1px solid #a8a8a8;
        border-bottom: 1px solid #d8d8d8;
        margin-bottom: 5px;
        display: flex;
        overflow: scroll;
        white-space: nowrap;
        align-items: baseline;
        height: 26px;
      }
      .CN-breadcum a{
        margin-right: 5px;
      }
      .CN-breadcum h1{
        display: inline-block;
        font-size: 13px;
        line-height: 13px;
        font-weight: normal;
      }
      .slick-track{display:flex}
      `}</style>
    </>
  );
};

export default CricketHomeMobile;
