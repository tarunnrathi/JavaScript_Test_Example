import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import newsFeedProps from "../helper/newsFeedProps";
import dynamic from "next/dynamic";
//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const NewsFeed = dynamic(() => import("components/Common/NewsFeed/NewsFeed"));
//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const NewsFeedMobile = dynamic(() => import("components/Mobile/NewsFeedMobile"));
const NewsFeedPage = ({ pageData, chartbeat }) => {
  chartbeat.page = "category";
  return (
    <>
      <SiteSeo pageSeo={pageData?.pageSeo} url={pageData?.currentUrl} isHome={true} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={NewsFeedMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}          
          pageType={"newsFeedPage"}
          isNewsFeedPage={true}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={NewsFeed}
          pageAds={pageData?.pageAds}
          pageSeo={pageData?.seo}          
          pageType={"newsFeedPage"}
          config={pageData.config}
          isNewsFeedPage={true}
        />
      )}      
    </>
  );
};
export async function getServerSideProps(context) {
  return newsFeedProps(context);
}
export default NewsFeedPage;