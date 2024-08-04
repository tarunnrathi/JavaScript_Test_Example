import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import scheduleProps from "../../../helper/t20WorldCup/scheduleProps";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MatchSchedule = dynamic(() => import('components/T20WorldCup/Schedule'))
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const Schedule = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      { pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={MatchSchedule}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isT20={true}
            activeId={2}
            isCricketNext={true}
            pageType={"homePage"}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
          :
          <DesktopLayout
            data={pageData}
            pageAds={pageData.pageAds}
            mainComponent={MatchSchedule}
            isCricketNext={true}
            isT20={true}
            activeId={2}
            config={pageData.config}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  return scheduleProps(context);
}
export default Schedule;
