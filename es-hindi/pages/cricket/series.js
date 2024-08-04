import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import cnSeriesProps from "../../helper/cnSeriesProps";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const CricketSeriesHome = dynamic(() =>
  import("components/Cricketnext/Series/Desktop/CricketSeriesHome")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const CricketSeriesHomeMobile = dynamic(() =>
  import("components/Cricketnext/Series/Mobile/CricketSeriesHomeMobile")
);

const series = ({ pageData, chartbeat }) => {
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
          mainComponent={CricketSeriesHomeMobile}
          isCricketNext={true}
          pageType="series"
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={CricketSeriesHome}
          isCricketNext={true}
          pageType={"series"}
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return await cnSeriesProps(context);
}
export default series;
