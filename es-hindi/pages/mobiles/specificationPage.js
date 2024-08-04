import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import mobileDataPageProps from "../../helper/mobileDataPageProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const SpecificationPage = dynamic(() =>
  import("components/Desktop/mobileDataPage/SpecificationPage")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const MobSpeacification = dynamic(() =>
  import("components/Mobile/mMobileDataPages/Specification")
);

const specificationPage = ({ pageData, chartbeat }) => {
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
          mainComponent={MobSpeacification}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          dtype={"mobileDataPage"}
          isMobileDataPage={true}
          config={pageData.config}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={SpecificationPage}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          dtype={"SpecificationPage"}
          isMobileDataPage={true}
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return mobileDataPageProps(context, false, "specification");
}

export default specificationPage;
