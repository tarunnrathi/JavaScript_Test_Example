import dynamic from "next/dynamic";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import PurpleOrangeCapCommonTable from "./PurpleOrangeCapCommonTable";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import { IPL_YEAR } from "includes/ipl.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const DynamicRHSWithNoSSR = dynamic(
  () => import("components/Cricketnext/home/RHS"),
  { ssr: false }
);
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
const MostSixesTable = ({ data, pageAds }) => {
  const { tableData, seoData, ImageIdsAvailable } = data;
  const headerArr = [
    { id: 1, title: "Pos" },
    { id: 2, title: "Player" },
    { id: 3, title: "Team" },
    { id: 4, title: "Matches" },
    { id: 5, title: "SIXES" },
  ];
  return (
    <>
      <div className="CN-pageOutter CN-Desktop-HomeOuter">
        <div className="CN-pageWrapper">
          <div className="CN-pageCN-scoreCardsection">
            <SiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}
              lazyload={true}
            />
            <div className="CN-scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR isIPL={true} />
            </div>
          </div>
          <div className="iplwrapper">
            <div className="container clearfix">
              <div className="ipl-leftwrap">
              <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `IPL ${IPL_YEAR}`,slug: "/cricket/ipl/"},
                  { value: `MOST SIXES`},
                ]}
                isCapitalize={true}/>
                <h1 className="ipl_headin_g forpurplecap">Most Sixes in IPL</h1>
                {/* <div className="vsp20"></div> */}
                {tableData?.length > 0 &&
                <PurpleOrangeCapCommonTable
                  headers={headerArr}
                  backgroundColour={"#001D42"}
                  tableData={tableData}
                  columnKey={"sixes"}
                  ImageIdsAvailable={ImageIdsAvailable}
                />
                }
                <div className="vsp20"></div>
                <SiteAd
                  width={728}
                  height={90}
                  style={{ textAlign: "center" }}
                  adUnit={pageAds.BTF_728}
                  sizes={[[728, 90]]}
                  lazyload={true}
                ></SiteAd>
                <div className="vsp20"></div>
                {seoData.meta_ipl_page_description && (
                  <div className="iplspclcnts clearfix">
                    {seoData.meta_ipl_page_description}
                  </div>
                )}
                 <Taboola
                  mode={TaboolaList.category.bottom.mode}
                  id={TaboolaList.category.bottom.id}
                  container={TaboolaList.category.bottom.container}
                  placement={TaboolaList.category.bottom.placement}
                />
              </div>
              <div className="ipl-rightwrap">
                <DynamicRHSWithNoSSR
                  position={"first"}
                  pageAds={pageAds}
                  isIPL={true}
                  taboola ={true}
                  taboolaList={TaboolaList.category}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
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
        .slick-arrow {
          cursor: pointer !important;
        }
        .iplspclcnts {
          background: #f5f5f5;
          padding: 15px 20px;
          font-size: 18px;
          color: #444;
          line-height: 28px;
          margin-bottom: 20px;
        }
        .vsp20 {
          margin-top: 20px;
        }
        .clearfix {
          clear: both;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .ipl-rightwrap {
          float: right;
          width: 300px;
        }
        .ipl-fullpnttbl tr:nth-child(odd) {
          background: #fff;
        }
        .ipl_headin_g {
          font-size: 22px;
          line-height: 27px;
          color: #e1261d;
          font-weight: bold;
          text-transform: uppercase;
        }
        .ipl-leftwrap {
          float: left;
          width: calc(100% - 320px);
        }
        .brdacrum {
          font-size: 14px;
          color: #001d42;
          text-transform: uppercase;
          line-height: 18px;
          font-weight: 700;
          margin-bottom: 15px;
          border-bottom: 2px solid #eee;
          padding-bottom: 6px;
        }
        .brdacrum a {
          color: #404040;
          font-weight: 400;
          margin-right: 2px;
        }
        .brdacrum a {
          color: #404040;
          font-weight: 400;
          margin-right: 2px;
        }
        .n18bhdr + div {
          position: sticky;
          top: 0;
          z-index: 5;
        }
      `}</style>
    </>
  );
};
export default MostSixesTable;