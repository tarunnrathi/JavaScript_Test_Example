//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import rashifalProps from "../helper/rashifalProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Rashifal = dynamic(() => import("components/Common/Rashifal"));
//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const WebstoryPage = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={Rashifal}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          dtype={"webstory"}
          isWebstory={true}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={Rashifal}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          dtype={"webstory"}
          isWebstory={true}
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return await rashifalProps(context);
}

export default WebstoryPage;
