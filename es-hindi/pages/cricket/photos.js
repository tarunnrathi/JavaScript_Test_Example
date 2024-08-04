import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import cnPhotosProps from "../../helper/cnPhotoListingProps";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const cnPhotos = dynamic(() => import("components/Cricketnext/cnPhotoListing"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const cnPhotoMobile = dynamic(() =>
  import("components/Cricketnext/cnPhotoListingMobile")
);

const cricketPhotos = ({ pageData = {} }) => {
  return (
    <>
      <XMLScript category="cricket" />

      <SiteSeo pageSeo={pageData.pageSeo} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={cnPhotoMobile}
          isCricketNext={true}
          isMobile={true}
          pageType="photo"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          dtype="onlycricket-page"
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={cnPhotos}
          isCricketNext={true}
          pageType="photo"
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  return cnPhotosProps(context);
}
export default cricketPhotos;
