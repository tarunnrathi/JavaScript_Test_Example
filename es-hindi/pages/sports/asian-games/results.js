import React from "react";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import asianGamesHomeProps from "../../../helper/asianGamesHelpers/asianGamesHomeProps";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const ResultsDesktop = dynamic(() =>
  import("components/Desktop/AsianGames/Results")
);

const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const AsianGamesResultsMobile = dynamic(() =>
  import("components/Mobile/AsianGames/Results")
);

const AsianGamesHomePage = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isHome={true}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={AsianGamesResultsMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isCategory={true}
          dtype={"category"}
          config={pageData.config}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={ResultsDesktop}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isHome={true}
          pageType={"homePage"}
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return asianGamesHomeProps(context);
}

export default AsianGamesHomePage;
