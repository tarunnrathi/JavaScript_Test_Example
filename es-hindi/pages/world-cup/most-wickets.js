import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import mostWicketsProps from "../../helper/WorldCup/mostWicketsProps";
import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const MostWicketsComponent = dynamic(() =>
  import("components/WorldCup/MostWickets"),
);

const MostWickets = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={MostWicketsComponent}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isWorldCup={true}
          isCricketNext={true}
          pageType={"homePage"}
          dtype="cricket-home-page"
          activeId={7}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={MostWicketsComponent}
          isCricketNext={true}
          isWorldCup={true}
          pageType="home"
          activeId={7}
          config={pageData.config}
        />
      )}
    </>
  );
};

export function getServerSideProps(context) {
  return mostWicketsProps(context);
}
export default MostWickets;
