import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import scheduleProps from "../../helper/WorldCup/scheduleProps";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MatchSchedule = dynamic(() => import("components/WorldCup/Schedule"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const Schedule = ({ pageData, chartbeat }) => {
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
          mainComponent={MatchSchedule}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isWorldCup={true}
          activeId={2}
          isCricketNext={true}
          pageType={"homePage"}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={MatchSchedule}
          isCricketNext={true}
          isWorldCup={true}
          activeId={2}
          config={pageData.config}
        />
      )}
    </>
  );
};

export function getServerSideProps(context) {
  return scheduleProps(context);
}
export default Schedule;
