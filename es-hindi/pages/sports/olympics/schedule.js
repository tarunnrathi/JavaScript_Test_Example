//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import olympicsProps from "../../../helper/olympicsProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Schedule = dynamic(() => import("components/Desktop/Olympics/Schedule"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const OlympicsSchedule = ({ pageData, chartbeat }) => {
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
          mainComponent={Schedule}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          pageType={"OlympicsSchedule"}
          isolympics={true}
          showSponser={
            Object.keys(pageData._1xbetData || {}).length ? true : false
          }
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={Schedule}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          pageType={"OlympicsSchedule"}
          config={pageData.config}
          isolympics={true}
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

export default OlympicsSchedule;
