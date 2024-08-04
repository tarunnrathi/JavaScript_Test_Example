import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import cnPlayerProfileProps from "../../helper/cnPlayerProfileProps";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const CricketPlayerProfile = dynamic(() =>
  import("components/Cricketnext/PlayerProfile/Desktop/CricketPlayerProfile")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const CricketPlayerProfileMobile = dynamic(() =>
  import(
    "components/Cricketnext/PlayerProfile/Mobile/CricketPlayerProfileMobile"
  )
);

const playerProfile = ({ pageData, chartbeat }) => {
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
          mainComponent={CricketPlayerProfileMobile}
          isCricketNext={true}
          pageType="home"
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={CricketPlayerProfile}
          isCricketNext={true}
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return cnPlayerProfileProps(context);
}
export default playerProfile;
