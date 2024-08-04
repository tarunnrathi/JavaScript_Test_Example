import mostRunsProps from "../../helper/WorldCup/mostRunsProps";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MostRunsComponent = dynamic(() => import("components/WorldCup/MostRuns"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const MostRuns = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={MostRunsComponent}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isWorldCup={true}
          isCricketNext={true}
          pageType={"homePage"}
          activeId={8}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={MostRunsComponent}
          isCricketNext={true}
          isWorldCup={true}
          activeId={8}
          pageType="home"
          config={pageData.config}
        />
      )}
    </>
  );
};

export function getServerSideProps(context) {
  return mostRunsProps(context);
}
export default MostRuns;
