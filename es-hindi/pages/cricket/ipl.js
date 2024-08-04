import React from "react";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import iplProps from "../../helper/cricket/iplProps";
import XMLScript from "components/Common/XMLScript";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const IPLDesktop = dynamic(() => import("components/Cricket/Desktop/IPL"));
const IPLMobile = dynamic(() => import("components/Cricket/Mobile/IPL"));

const IPLPage = ({ pageData, chartbeat }) => {
  return (
    <>
      <XMLScript category="cricket" />

      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={IPLMobile}
          isCricketNext={true}
          isIpl={true}
          activeId={1}
          pageType="home"
          dtype="cricket-home-page"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={IPLDesktop}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          activeId={1}
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  return iplProps(context);
}

export default IPLPage;
