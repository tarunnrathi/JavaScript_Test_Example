import React from "react";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import medalTallyProps from "../../../helper/asianGamesHelpers/medalTallyProps";
import MobileLayout from "layouts/Mobile/MobileLayout";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MedalTallyDesktop = dynamic(() =>
  import("components/Desktop/AsianGames/MedalTally")
);
const MedalTallyMobile = dynamic(() =>
  import("components/Mobile/AsianGames/MedalTally")
);

const AsianGamesMedalTally = ({ pageData, chartbeat }) => {
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
          mainComponent={MedalTallyMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isHome={true}
          pageType={"homePage"}
          config={pageData.config}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={MedalTallyDesktop}
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
  return medalTallyProps(context);
}

export default AsianGamesMedalTally;
