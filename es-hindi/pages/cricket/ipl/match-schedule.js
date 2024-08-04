import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import iplMatchScheduleProps from "../../../helper/cricket/iplMatchScheduleProps";
import XMLScript from "components/Common/XMLScript";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const MatchSchedule = dynamic(() =>
  import("components/Cricket/Desktop/IPL/MatchSchedule")
);
const MatchScheduleMobile = dynamic(() =>
  import("components/Cricket/Mobile/IPL/MatchSchedule")
);

const IplMatchSchedule = ({ pageData, chartbeat }) => {
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
          isIpl={true}
          activeId={2}
          pageType="home"
          dtype="cricket-home-page"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={MatchSchedule}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          config={pageData.config}
          activeId={2}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return iplMatchScheduleProps(context);
}
export default IplMatchSchedule;
