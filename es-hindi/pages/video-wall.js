//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import videoWallProps from "../helper/video-wallProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MainVideoWall = dynamic(() => import("../common_react/CommonSrc/CommonComponents/videoWall/Desktop/MainVideoWall"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const MainVideoWallMobile = dynamic(() => import("../common_react/CommonSrc/CommonComponents/videoWall/Mobile/MainVideoWall"));

const VideoWallPage = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isHome={true} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={MainVideoWallMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            pageType={"videoWall"}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={MainVideoWall}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            pageType={"videoWall"}
            config={pageData.config}
          />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  return videoWallProps(context);
}

export default VideoWallPage;
