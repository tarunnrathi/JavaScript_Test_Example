import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import staticPagesProps from "../helper/staticPagesProps";
import PrivacyPolicyDesktop from "components/Desktop/PrivacyPolicy";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const privacyPolicy = ({ pageData, chartbeat }) => {
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
          mainComponent={PrivacyPolicyDesktop}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isStaticPage={true}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={PrivacyPolicyDesktop}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isHome={true}
          config={pageData.config}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  context = { ...context, ...{ pageSeo : {
    pageTitle:"News18 Hindi Privacy Policy: न्यूज़18 इंडिया Privacy Policy",
    pageDescription:"News18 Hindi Privacy Policy: News18 Hindi recommends that you review this Policy periodically, to ensure that you are aware of the current privacy practices.",
    pageKeywords:"News18 Hindi Privacy Policy, न्यूज़18 इंडिया, Privacy Policy",
    og_description: "News18 Hindi Privacy Policy: न्यूज़18 इंडिया Privacy Policy",
  }}}
  return staticPagesProps(context);
}
export default privacyPolicy;
