//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import liveTvProps from "../../helper/liveTvProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const LiveTvDesktop = dynamic(() => import("components/Desktop/LiveTvDesktop"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const LiveTvMobile = dynamic(() => import("components/Mobile/LiveTvMobile"));

const LiveTv = ({ pageData, chartbeat }) => {
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
          mainComponent={LiveTvMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          pageType={"livetv"}
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={LiveTvDesktop}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          pageType={"livetv"}
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return await liveTvProps(context);
}

export default LiveTv;
