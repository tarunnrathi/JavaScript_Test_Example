import React from "react";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import photosProps from "../../../helper/t20WorldCup/photosProps";

const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));

const T20Photos = dynamic(() =>
  import("components/T20WorldCup/Photos")
);

const T20PhotosMobile = dynamic(() =>
  import("components/T20WorldCup/PhotosMobile")
);

const T20PhotosPage = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={T20PhotosMobile}
          isCricketNext={true}
          isT20={true}
          pageType="home"
          dtype="cricket-home-page"
          activeId={6}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={T20Photos}
          isCricketNext={true}
          isT20={true}
          activeId={6}
          pageType="home"
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  return photosProps(context);
}

export default T20PhotosPage;
