import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import iplTeamsProps from "../../../helper/cricket/IplTeamsDataProps";
import XMLScript from "components/Common/XMLScript";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const TeamDataMobile = dynamic(() =>
  import("components/Cricket/Mobile/IPL/TeamData")
);
const TeamDataDesktop = dynamic(() =>
  import("components/Cricket/Desktop/IPL/TeamData")
);

const Team = ({ pageData, chartbeat }) => {
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
          mainComponent={TeamDataMobile}
          isCricketNext={true}
          isIpl={true}
          activeId={pageData.teamId}
          pageType="home"
          dtype="cricket-home-page"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={TeamDataDesktop}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          config={pageData.config}
          activeId={pageData.teamId}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return iplTeamsProps(context);
}
export default Team;
