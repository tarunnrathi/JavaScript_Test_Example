import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import mobileDataPageProps from "../../helper/mobileDataPageProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Mobile = dynamic(() =>
  import("components/Desktop/mobileDataPage/Mobile")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const MobMobile = dynamic(() =>
  import("components/Mobile/mMobileDataPages/Mobile")
);

const mobileDataPage = ({ pageData, chartbeat }) => {
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
          mainComponent={MobMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          dtype={"mobileDataPage"}
          isMobileDataPage={true}
          config={pageData.config}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={Mobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          dtype={"mobileDataPage"}
          isMobileDataPage={true}
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return mobileDataPageProps(context, false, "mobile");
}

export default mobileDataPage;
