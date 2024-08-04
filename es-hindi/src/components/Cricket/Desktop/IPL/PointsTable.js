import { IPL_YEAR } from "includes/ipl.helper";
import dynamic from "next/dynamic";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";

import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicRHSWithNoSSR = dynamic(
  () => import("components/Cricketnext/home/RHS"),
  { ssr: false }
);

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const PointsTable = ({ data, pageAds }) => {
  const { pointsTableData, seoData } = data;
  const tableHeaders = [
    { id: 1, title: "टीम" },
    { id: 2, title: "मैच" },
    { id: 3, title: "जीत" },
    { id: 4, title: "हार" },
    { id: 5, title: "टाई" },
    { id: 6, title: "रनरेट" },
    { id: 7, title: "अंक" },
    { id: 8, title: "नेट रनरेट" },
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
                { value: `IPL ${IPL_YEAR}`, slug: "/cricket/ipl/"},
                { value: 'अंक तालिका'},
              ]}
              isCapitalize={true}/>
                <h1 className="ipl-globahd">IPL {IPL_YEAR} Points Table</h1>
                <div className="vsp20"></div>

                <div className="ipl-fullpnttbl">
                  <table cellPadding="0" cellSpacing="0" border="0">
                    <tbody>
                      <tr>
                        {tableHeaders.map((header) => (
                          <th key={header.id}>{header.title}</th>
                        ))}
                      </tr>
                      {pointsTableData.map((data) => (
                        <tr key={data.id}>
                          <td>{data.name}</td>
                          <td>{data.p}</td>
                          <td>{data.w}</td>
                          <td>{data.l}</td>
                          <td>{data.t}</td>
                          <td>{data.nr}</td>
                          <td>
                            <b>{data.pts}</b>
                          </td>
                          <td>{data.nrr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                  <div className="iplspclcnts clearfix"
                  dangerouslySetInnerHTML={{__html:seoData.meta_ipl_page_description}}>
                  </div>
                )}
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
              <Taboola
                mode={TaboolaList.category.bottom.mode}
                id={TaboolaList.category.bottom.id}
                container={TaboolaList.category.bottom.container}
                placement={TaboolaList.category.bottom.placement}
              />
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
        .ipl-fullpnttbl td:first-child,
        .ipl-fullpnttbl th:first-child {
          width: 30%;
          text-align: left;
          font-weight: bold;
        }
        .ipl-fullpnttbl table th {
          background: #131749;
          color: #fff;
          text-transform: uppercase;
        }
        .ipl-fullpnttbl th,
        .ipl-fullpnttbl td {
          font-size: 14px;
          padding: 12px 15px;
          text-align: center;
          color: #000;
        }
        .ipl-fullpnttbl tr:nth-child(even) {
          background: #f0f0f0;
        }
        .ipl-fullpnttbl table {
          width: 100%;
          overflow: hidden;
          border: 1px solid #f5f5f5;
          box-sizing: border-box;
        }
        .ipl-globahd {
          font-size: 28px !important;
          margin-bottom: 5px !important;
          line-height: 32px !important;
          color: #eb3d3c;
        }
        .vsp20 {
          margin-top: 20px;
        }
        .iplwrapper .container {
          padding: 15px;
          background: #fff;
          box-sizing: border-box;
        }
        .container {
          margin: auto;
          max-width: 1244px;
          padding: 0 10px;
          position: relative;
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
        .iplwrapper {
          background: #f5f5f5;
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

export default PointsTable;
