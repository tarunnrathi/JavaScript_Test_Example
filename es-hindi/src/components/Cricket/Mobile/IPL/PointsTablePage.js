import { displayAds, IPL_YEAR } from "includes/ipl.helper";
import dynamic from "next/dynamic";
import IplDescription from "./IplDescription";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";

const IplVideosList = ({ data }) => {
  const { pointsTableData, pageAds, seoData } = data;
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
        <div className="vsp10"></div>
        <div className="CN__scoreCardsection">
          <DynamicCrTopScoreWidgetWithNoSSR isMobile isIPL={true} />
        </div>
        {displayAds(pageAds.ATF_320)}
        <BreadcrumbCommon breadCrumbArray={[
            { value: "हिंदी समाचार", slug: "/"},
            { value: "क्रिकेट", slug: "/cricket/"},
            { value: `IPL ${IPL_YEAR}`, slug: "/cricket/ipl/"},
            { value: 'अंक तालिका'},
          ]}
          isCapitalize={true}/>
        <div className="sponsor-with-heading">
            <h1 className="ipl-globahd">IPL {IPL_YEAR} Points Table</h1>
            <div className="predictor_sponsored"></div>
        </div>
        <div className="clearfix vsp10"></div>
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
          <div className="vsp20"></div>
          {displayAds(pageAds.ATF_300)}
          <div className="vsp20"></div>
          {
            seoData && seoData.meta_ipl_page_description && (
              <IplDescription page_description={seoData.meta_ipl_page_description} />
            )
          }
          <div className="vsp20"></div>
        </div>
        <Taboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
/>
      <style jsx global>{`
        .brdacrum {
          font-size: 14px;
          color: #001d42;
          text-transform: uppercase;
          line-height: 18px;
          margin: 12px 10px 0 10px;
          border-bottom: 1px solid #eee;
          padding-bottom: 6px;
          font-weight: 700;
        }
        .brdacrum a {
            color: #404040;
            font-weight: 400;
            margin-right: 2px;
        }
        .sponsor-with-heading {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-right: 10px;
        }
        .ipl-globahd {
            font-size: 24px;
            color: #eb3d3c;   
            line-height: 20px;
            padding: 20px 10px 0 10px;
        }
        .vsp10 {
          margin-top: 10px;
        }
        .vsp20 {
          margin-top: 20px;
        }   
        .ipl-fullpnttbl {
            overflow: scroll;
        }
        .ipl-fullpnttbl table {
          width: 100%;
          overflow: hidden;
          border: 1px solid #f5f5f5;
          box-sizing: border-box;
        }
        .ipl-fullpnttbl tr:nth-child(odd) {
          background: #fff;
        }
        .ipl-fullpnttbl tr:nth-child(even) {
          background: #F0F0F0;
        }
        .ipl-fullpnttbl td:first-child, .ipl-fullpnttbl th:first-child {
          width: 30%;
          text-align: left;
          font-weight: bold;
        }
        .ipl-fullpnttbl table th {
          background: #131749;
          color: #fff;
          text-transform: uppercase;
        }
        .ipl-fullpnttbl td:first-child, .ipl-fullpnttbl th:first-child {
            width: auto;
        }
        .ipl-fullpnttbl th, .ipl-fullpnttbl td {
          font-size: 12px;
          padding: 10px 5px;
        }
        .CN__scoreCardsection {
          height: 160px;
          overflow: hidden;
        }
        .add {
          padding: 15px;
          margin: 20px 0px;
          text-align: center;
          display: flex;
          overflow: hidden;
          background: #dbdde3;
          justify-content: center;
          height: 280px;
        }
        .iplspclcnts {
          background: #f5f5f5;
          padding: 15px;
          font-size: 16px;
          color: #444;
          line-height: 24px;
          margin: 10px;
      }
      `}</style>
    </>
  );

};

export default IplVideosList;
