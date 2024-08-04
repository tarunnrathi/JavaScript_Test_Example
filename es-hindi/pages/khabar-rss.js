//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import rssProps from "../helper/rssProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Rss = dynamic(() => import("components/Desktop/Rss"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const RssMobile = dynamic(() => import("components/Mobile/RssMobile"));

const states = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isState={true} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={RssMobile}
            pageAds={pageData?.pageAds}
            pageSeo={pageData?.pageSeo}
            isCategory={true}
            isMobile={true}
            dtype={'category'}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Rss}
            pageAds={pageData?.pageAds}
            pageSeo={pageData?.pageSeo}
            isCategory={true}
            dtype={'category'}
            config={pageData?.config}
          />
      }
    </>
  );

};

export async function getServerSideProps(context) {
  return rssProps(context);
}

export default states;
