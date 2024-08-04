import React from "react";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import iplNewsProps from "../../../helper/cricket/iplNewsProps";
import XMLScript from "components/Common/XMLScript";

const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));

const IplNews = dynamic(() => import("components/Cricket/Mobile/IPL/IplNews"));
const IplNewsDesktop = dynamic(() =>
  import("components/Cricket/Desktop/IPL/IplNewsDesktop")
);

const IplNewsPage = ({ pageData, chartbeat }) => {
  return (
    <>
      <XMLScript category="cricket" />

      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={IplNews}
          isCricketNext={true}
          isIpl={true}
          activeId={4}
          pageType="home"
          dtype="cricket-home-page"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={IplNewsDesktop}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          config={pageData.config}
          activeId={4}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  return iplNewsProps(context);
}

export default IplNewsPage;
