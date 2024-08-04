//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import tagProps from "../helper/tagProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Tag = dynamic(() => import("components/Desktop/Tag"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const TagMobile = dynamic(() => import("components/Mobile/TagMobile"));

const tag = ({ pageData = {}, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isTag={true}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={TagMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          dtype="tag"
          showSponser={
            Object.keys(pageData._1xbetData || {}).length ? true : false
          }
          isTag={true}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={Tag}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          dtype="tag"
          isTag={true}
          showSponser={
            Object.keys(pageData._1xbetData || {}).length ? true : false
          }
          config={pageData.config}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  return tagProps(context);
}
export default tag;
