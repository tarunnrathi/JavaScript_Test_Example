import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import WCProps from "../../helper/WorldCup/WCProps";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const WcHome = dynamic(() => import("components/WorldCup/WCHome"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const WorldCup = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={WcHome}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isWorldCup={true}
          isCricketNext={true}
          pageType={"homePage"}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={WcHome}
          isWorldCup={true}
          isCricketNext={true}
          pageType="home"
          config={pageData.config}
        />
      )}
    </>
  );
};

export function getServerSideProps(context) {
  return WCProps(context);
}
export default WorldCup;
