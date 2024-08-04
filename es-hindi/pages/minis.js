//Global import
import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import minisProps from '../helper/minisProps';
import { memo } from 'react';

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Minis = memo(dynamic(() => import("components/Desktop/Minis/List")));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const MinisMobile = dynamic(() => import("components/Mobile/Minis/ListMobile"));

const minis = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={MinisMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            dtype='minis'
            // isTag={true}
            pageType={"minis"}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Minis}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            config={pageData.config}
            pageType={"minis"}
          />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  return minisProps(context);
}

export default minis;
