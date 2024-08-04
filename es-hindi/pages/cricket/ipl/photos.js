import React from "react";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import iplPhotosProps from "../../../helper/cricket/iplPhotosProps";
import XMLScript from "components/Common/XMLScript";

const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const IplPhotos = dynamic(() =>
  import("components/Cricket/Mobile/IPL/IplPhotos")
);
const IplPhotosDesktop = dynamic(() =>
  import("components/Cricket/Desktop/IPL/IplPhotos")
);

const IplPhotosPage = ({ pageData, chartbeat }) => {
  return (
    <>
      <XMLScript category="cricket" />

      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={IplPhotos}
          isCricketNext={true}
          isIpl={true}
          activeId={5}
          pageType="home"
          dtype="cricket-home-page"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={IplPhotosDesktop}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          config={pageData.config}
          activeId={5}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  return iplPhotosProps(context);
}

export default IplPhotosPage;
