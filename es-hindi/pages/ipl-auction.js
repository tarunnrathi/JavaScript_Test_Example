//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import IplAuctionProps from "../helper/iplAuctionProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const IplAuctionComponent = dynamic(() => import("components/Desktop/IplAuction"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const IplAuction = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isHome={true} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={IplAuctionComponent}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            isCricketNext={true}
            pageType={"iplAuction"}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={IplAuctionComponent}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            pageType={"iplAuction"}
            config={pageData.config}
          />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  return await IplAuctionProps(context);
}

export default IplAuction;
