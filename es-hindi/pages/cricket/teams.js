import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import cnTeamSquadProps from "../../helper/cnTeamSquadProps";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const CricketTeamSquad = dynamic(() =>
  import("components/Cricketnext/TeamSquad/Desktop/CricketTeamSquad")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const CricketTeamSquadMobile = dynamic(() =>
  import("components/Cricketnext/TeamSquad/Mobile/CricketTeamSquadMobile")
);

const teamSquad = ({ pageData, chartbeat }) => {
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
        mainComponent={CricketTeamSquadMobile}
        isCricketNext={true}
        pageType="home"
        config={pageData?.config}
        showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        dtype="onlycricket-page"
      />
      ) : (
      <DesktopLayout
        data={pageData}
        pageAds={pageData.pageAds}
        mainComponent={CricketTeamSquad}
        isCricketNext={true}
        current={9}
        config={pageData?.config}
        showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
      />
      )}
    </>
  );
};

export function getServerSideProps(context) {
  return cnTeamSquadProps(context, false);
}
export default teamSquad;
