import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import staticPagesProps from "../../helper/staticPagesProps";
//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const TreefieTermsAndConditionsDesktop = dynamic(() =>
  import("components/Desktop/TreefieTermsAndConditions")
);
//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const aboutUs = ({ pageData, chartbeat }) => {
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
          mainComponent={TreefieTermsAndConditionsDesktop}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isStaticPage={true}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={TreefieTermsAndConditionsDesktop}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isHome={true}
          config={pageData.config}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context={}) {
  context = { ...context, ...{ pageSeo : {
    pageTitle: 'Treefie Challenge Terms and Conditions',
    pageDescription:'Treefie Challenge Terms and Conditions - News18 Hindi',
    pageKeywords: 'Treefie Challenge',
    og_description: 'Treefie Challenge Terms and Conditions - News18 Hindi',
}}}
  return staticPagesProps(context);
}
export default aboutUs;
