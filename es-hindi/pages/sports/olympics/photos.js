//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import olympicsProps from "../../../helper/olympicsProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Photos = dynamic(() => import("components/Desktop/Olympics/Photos"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const PhotosMobile = dynamic(() => import("components/Mobile/Olympics/PhotosMobile"));

const OlympicsPhotos = ({ pageData, chartbeat }) => {
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
          mainComponent={PhotosMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          pageType={"olympicsPhotos"}
          isolympics={true}
          showSponser={
            Object.keys(pageData._1xbetData || {}).length ? true : false
          }
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={Photos}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          pageType={"olympicsPhotos"}
          isolympics={true}
          config={pageData.config}
          showSponser={
            Object.keys(pageData._1xbetData || {}).length ? true : false
          }
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return await olympicsProps(context);
}

export default OlympicsPhotos;