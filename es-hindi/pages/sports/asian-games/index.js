import React from "react";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import asianGamesHomeProps from "../../../helper/asianGamesHelpers/asianGamesHomeProps";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const AsianGamesDesktop = dynamic(() =>
  import("components/Desktop/AsianGames/Home")
);

const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const AsianGamesMobile = dynamic(() =>
  import("components/Mobile/AsianGames/Home")
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
          mainComponent={AsianGamesMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isCategory={true}
          dtype={"category"}
          config={pageData.config}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={AsianGamesDesktop}
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
