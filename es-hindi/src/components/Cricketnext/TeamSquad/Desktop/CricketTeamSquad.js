// import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
// import Outbrain from "widgets/Common/Responsive/Outbrain";
import Head from "next/head";
import { CricketNextImgUrls } from "../../CricketNextUtils";
import { useState } from "react";
import ImageFallback from "components/Common/ImageFallback";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const TeamPlayerInfoCard = dynamic(() => import('./TeamPlayerInfoCard'));

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const DynamicScoreRHSWithNoSSR = dynamic(
  () => import("components/Cricketnext/Cards/ScoreRHS"),
  { ssr: false }
);

const CricketTeamSquad = (props) => {
  const { pageContent, pageAds, paramObj } = props?.data;
  const { teamName, teamId, teamDisplayName, currentPath } = paramObj;
  const [openReadMore, setOpenReadMore] = useState(false);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&display=swap" rel="stylesheet" />
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
            <div className="CN-scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR />
            </div>
          </div>
          <div className="CN-section">
            <div className="CN-sec-l">
              
              <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `TEAM ${teamDisplayName ? teamDisplayName.toUpperCase() : ""}`},
              ]}/>
              <div className="teamHeading">
                <div className="teamHeading-inner">
                  <div className="flag">
                    <ImageFallback
                      src={`${CricketNextImgUrls.teamFlagUrl}${teamId}.png`}
                      fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                      height={30}
                      width={50}
                      alt={teamName}
                      title={teamName}
                    />
                  </div>
                  <span>टीम {pageContent?.teamName}</span>
                </div>
              </div>
              <TeamPlayerInfoCard teamPlayers={pageContent?.players} pageAds={pageAds} />
              <div
                className={`readMore__wrapper ${openReadMore ? "readMore__content--show" : ""}`}
                dangerouslySetInnerHTML={{
                  __html: pageContent?.teamBio,
                }}
              ></div>
              {!openReadMore && pageContent?.teamBio && (
                <div className="readMore__btn--wrapper">
                  <button onClick={() => setOpenReadMore(true)}>
                    और पढ़ें
                  </button>
                  <div className="readMore__btn--arrows"></div>
                </div>
              )}
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
              <DynamicScoreRHSWithNoSSR
                pageAds={props.pageAds}
                isIpl=""
                isT20=""
                recent=""
                upcoming=""
                url={currentPath}
                predictorData=""
                taboola ={true}
                taboolaList={TaboolaList.category}
              />
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
                  loadOnScroll={true}
              />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          line-height: 1.2;
        }

        // FOR HEADER TITLE SIDE LINE
        .nhlogo {
          border-right: 1px solid #374a47;
          margin-right: 15px;
        }

        .cn-dropdown.current::after {
          color: #e1261d;
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

        .CN-section {
          display: flex;
          justify-content: space-between;
          font-family: "Mukta", sans-serif;
        }
        .cn-mb-40 {
          margin-bottom: 40px;
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
        .teamHeading {
          border-bottom: 3px solid #e1261d;
          margin-bottom: 10px;
        }
        .teamHeading-inner {
          display: table;
          position: relative;
          top: 7px;
          background: #fff;
          padding-right: 5px;
        }
        .teamHeading-inner .flag {
          width: 50px;
          margin-right: 8px;
          display: inline-block;
        }
        .teamHeading-inner .flag img {
          display: block;
        }
        .teamHeading .teamHeading-inner span {
          font-size: 22px;
          color: #e1261d;
          background: #fff;
          position: relative;
          top: -2px;
          text-transform: uppercase;
          font-weight: bold;
        }

        .readMore__wrapper {
          display: block;
          overflow: hidden;
          position: relative;
          margin-top: 20px;
          height: 144px;
        }

        .readMore__content--show {
          height: auto !important;
        }

        .pageContent {
          font-size: 16px;
          line-height: 1.5;
          margin-top: 10px;
        }

        .readMore__btn--wrapper {
          position: relative;
          width: 136px;
          margin: 10px auto 10px;
        }

        .readMore__btn--wrapper button {
          background-color: #eb3d3c;
          text-transform: capitalize;
          border: none;
          width: 100%;
          padding: 10px 15px 10px 0px;
          box-sizing: border-box;
          border-radius: 20px;
          cursor: pointer;
          color: #fff;
          font-size: 14px;
          line-height: 19px;
          font-weight: 400;
          outline: none;
        }

        .readMore__btn--arrows {
          position: absolute;
          top: 18px;
          right: 15px;
          width: 12px;
          height: 1px;
          background-color: #fff;
          width: 13px;
          transform: rotate(89deg);
        }

        .readMore__btn--arrows:before,
        .readMore__btn--arrows:after {
          content: "";
          position: absolute;
          width: 7px;
          height: 1px;
          top: -2px;
          right: -1px;
          background-color: #fff;
          transform: rotate(45deg);
        }

        .readMore__btn--arrows:after {
          top: 2px;
          transform: rotate(-45deg);
        }
      `}</style>
    </>
  );
};

export default CricketTeamSquad;
