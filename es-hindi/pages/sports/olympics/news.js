//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import olympicsProps from "../../../helper/olympicsProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const News = dynamic(() => import("components/Desktop/Olympics/News"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const NewsMobile = dynamic(() => import("components/Mobile/Olympics/NewsMobile"));

const OlympicsPage = ({ pageData, chartbeat }) => {
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
          mainComponent={NewsMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          pageType={"olympicsNews"}
          isolympics={true}
          showSponser={
            Object.keys(pageData._1xbetData || {}).length ? true : false
          }
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={News}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          pageType={"olympicsNews"}
          isolympics={true}
          config={pageData.config}
          showSponser={
            Object.keys(pageData._1xbetData || {}).length ? true : false
          }
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return await olympicsProps(context);
}

export default OlympicsPage;
