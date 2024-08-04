import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import pointTableProps from "../../../helper/t20WorldCup/pointTableProps";
import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const PointTable = dynamic(() => import("components/T20WorldCup/PointTable"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const PointTableMobile = dynamic(() => import("components/T20WorldCup/PointTableMobile"));

const PointsTable = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={PointTableMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isT20={true}
            activeId={4}
            isCricketNext={true}
            pageType={"homePage"}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
          :
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={PointTable}
          isCricketNext={true}
          isT20={true}
          activeId={4}
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
    }
    </>
  );
};

export async function getServerSideProps(context) {
  return pointTableProps(context);
}
export default PointsTable;
