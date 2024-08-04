import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import mobileDataPageProps from "../../helper/mobileDataPageProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const BrandPage = dynamic(() =>
  import("components/Desktop/mobileDataPage/BrandPage")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const MobBrandPage = dynamic(() =>
  import("components/Mobile/mMobileDataPages/BrandPage")
);

const brandPage = ({ pageData, chartbeat }) => {
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
          mainComponent={MobBrandPage}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          dtype={"mobileDataPage"}
          isMobileDataPage={true}
          config={pageData.config}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={BrandPage}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          dtype={"BrandPage"}
          isMobileDataPage={true}
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return mobileDataPageProps(context, false, "brand");
}

export default brandPage;
