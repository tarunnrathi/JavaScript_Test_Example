//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import videosProps from "../../helper/videosProps";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Videos = dynamic(() => import("components/Desktop/Videos"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const VideosMobile = dynamic(() => import("components/Mobile/VideosMobile"));

const videos = ({ pageData, chartbeat }) => {
  return (
    <>
      <XMLScript category={"videos"} />
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isVideo={true}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageType={"video"}
          mainComponent={VideosMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isCategory={true}
          isMobile={true}
          dtype={"category"}
          isVideo={true}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageType={"video"}
          mainComponent={Videos}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isCategory={true}
          dtype={"category"}
          config={pageData.config}
          isVideo={true}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return videosProps(context);
}

export default videos;
