import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import iplPointsTableProps from "../../../helper/cricket/iplPointsTableProps";
import XMLScript from "components/Common/XMLScript";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const PointsTableMobile = dynamic(() =>
  import("components/Cricket/Mobile/IPL/PointsTablePage")
);
const PointsTable = dynamic(() =>
  import("components/Cricket/Desktop/IPL/PointsTable")
);

const IplPointsTable = ({ pageData, chartbeat }) => {
  return (
    <>
      <XMLScript category="cricket" />

      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={PointsTableMobile}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          dtype="cricket-home-page"
          activeId={8}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={PointsTable}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          config={pageData.config}
          activeId={8}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return iplPointsTableProps(context);
}
export default IplPointsTable;
