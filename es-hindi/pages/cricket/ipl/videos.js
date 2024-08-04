import React from "react";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import iplVideosProps from "../../../helper/cricket/iplVideosProps";
import XMLScript from "components/Common/XMLScript";

const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const IplVideosList = dynamic(() =>
  import("components/Cricket/Mobile/IPL/IplVideosList")
);

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const IplVideosListDesktop = dynamic(() =>
  import("components/Cricket/Desktop/IPL/IplVideosList")
);

const IplVideosPage = ({ pageData, chartbeat }) => {
  return (
    <>
      <XMLScript category="cricket" />
      
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={IplVideosList}
          isCricketNext={true}
          isIpl={true}
          activeId={6}
          pageType="home"
          dtype="cricket-home-page"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={IplVideosListDesktop}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          config={pageData.config}
          activeId={6}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  return iplVideosProps(context);
}

export default IplVideosPage;
