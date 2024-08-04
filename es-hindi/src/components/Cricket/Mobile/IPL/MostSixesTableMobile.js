import { displayAds, IPL_YEAR } from "includes/ipl.helper";
import dynamic from "next/dynamic";
import IplCapList from "./IplCapList";
import IplDescription from "./IplDescription";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
const MostSixesTableMobile = ({ data }) => {
  const { tableData, seoData, pageAds, ImageIdsAvailable } = data;
  const headerArr = [
    { id: 2, name: "Player" },
    { id: 3, name: "Team" },
    { id: 4, name: "Matches" },
    { id: 5, name: "Sixes" },
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
                  { value: `IPL ${IPL_YEAR}`,slug: "/cricket/ipl/"},
                  { value: `MOST SIXES`},
                ]}
                isCapitalize={true}/>
        <div className="sponsor-with-heading">
            <h1 className="ipl-globahd">Most Sixes in IPL {IPL_YEAR}</h1>
            <div className="predictor_sponsored"></div>
        </div>
        <div className="clearfix vsp10"></div>
        {tableData?.length > 0 &&
          <IplCapList
            type={`purple-1`}
            heading={headerArr}
            data={tableData}
            dataDisplay={`sixes`}
            ImageIdsAvailable={ImageIdsAvailable}
          />
          }
          {displayAds(pageAds.ATF_300)}
          <div className="vsp20"></div>
          {
            seoData && seoData.meta_ipl_page_description && (
              <IplDescription page_description={seoData.meta_ipl_page_description} />
            )
          }
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
        .clearfix {
          clear: both;
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
      `}</style>
    </>
  );
};
export default MostSixesTableMobile;