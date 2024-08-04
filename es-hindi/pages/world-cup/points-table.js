import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import pointTableProps from "../../helper/WorldCup/pointTableProps";
import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const PointTable = dynamic(() => import("components/WorldCup/PointTable"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const PointTableMobile = dynamic(() =>
  import("components/WorldCup/PointTableMobile"),
);

const PointsTable = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={PointTableMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isWorldCup={true}
          activeId={4}
          isCricketNext={true}
          pageType={"homePage"}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={PointTable}
          isCricketNext={true}
          isWorldCup={true}
          activeId={4}
          config={pageData.config}
        />
      )}
    </>
  );
};

export function getServerSideProps(context) {
  return pointTableProps(context);
}
export default PointsTable;
