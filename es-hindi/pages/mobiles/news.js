import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import mobileDataPageProps from "../../helper/mobileDataPageProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const NewsPage = dynamic(() =>
  import("components/Desktop/mobileDataPage/NewsPage")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const NewsPageMobile = dynamic(() =>
  import("components/Mobile/mMobileDataPages/NewsPage")
);

const newsPage = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isDataPage={true}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={NewsPageMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          dtype={"mobileDataPage"}
          isMobileDataPage={true}
          config={pageData.config}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={NewsPage}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          dtype={"NewsPage"}
          isMobileDataPage={true}
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return mobileDataPageProps(context, false, "news");
}

export default newsPage;
