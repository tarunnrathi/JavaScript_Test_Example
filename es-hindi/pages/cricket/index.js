import cnHomeProps from "../../helper/cnHomeProps";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const CricketHome = dynamic(() => import("components/Cricketnext/CricketHome"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const CricketHomeMobile = dynamic(() =>
  import("components/Cricketnext/CricketHomeMobile")
);

const cricketHome = ({ pageData, chartbeat }) => {
  return (
    <>
      <XMLScript category="cricket" />

      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={CricketHomeMobile}
          isCricketNext={true}
          pageType="home"
          dtype="onlycricket-page"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={CricketHome}
          isCricketNext={true}
          pageType="home"
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return cnHomeProps(context);
}
export default cricketHome;
