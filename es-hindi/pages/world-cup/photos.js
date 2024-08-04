import React from "react";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import photosProps from "../../helper/WorldCup/photosProps";

const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));

const Photos = dynamic(() => import("components/WorldCup/Photos"));

const PhotosMobile = dynamic(() => import("components/WorldCup/PhotosMobile"));

const T20PhotosPage = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={PhotosMobile}
          isCricketNext={true}
          isWorldCup={true}
          pageType="home"
          dtype="cricket-home-page"
          activeId={6}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={Photos}
          isCricketNext={true}
          isWorldCup={true}
          activeId={6}
          pageType="home"
          config={pageData.config}
        />
      )}
    </>
  );
};
export function getServerSideProps(context) {
  return photosProps(context);
}

export default T20PhotosPage;
