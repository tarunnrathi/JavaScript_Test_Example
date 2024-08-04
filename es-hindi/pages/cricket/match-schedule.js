import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import cnMatchScheduleProps from "../../helper/cnMatchScheduleProps";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MatchSchedule = dynamic(() =>
  import("components/Cricketnext/MatchSchedule/Desktop/MatchSchedule")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const MatchScheduleMobile = dynamic(() =>
  import("components/Cricketnext/MatchSchedule/Mobile/MatchScheduleMobile")
);

const matchSchedule = ({ pageData, chartbeat }) => {
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
          mainComponent={MatchScheduleMobile}
          isCricketNext={true}
          pageType="home"
          dtype="onlycricket-page"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={MatchSchedule}
          isCricketNext={true}
          current={1}
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return cnMatchScheduleProps(context);
}
export default matchSchedule;
