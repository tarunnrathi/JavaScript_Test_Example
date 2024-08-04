import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import cnVideosProps from "../../helper/cnVideoListingProps";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const cnVideos = dynamic(() => import("components/Cricketnext/cnVideoListing"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const cnVideosMobile = dynamic(() =>
  import("components/Cricketnext/cnVideoListingMobile")
);

const cricketVideos = ({ pageData = {} }) => {
  return (
    <>
      <XMLScript category="cricket" />

      <SiteSeo pageSeo={pageData.pageSeo} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={cnVideosMobile}
          isCricketNext={true}
          isMobile={true}
          pageType="video"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          dtype="onlycricket-page"
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={cnVideos}
          isCricketNext={true}
          pageType="video"
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  return cnVideosProps(context);
}
export default cricketVideos;
