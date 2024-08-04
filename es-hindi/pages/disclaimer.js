//Global import
import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import staticPagesProps from '../helper/staticPagesProps';

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Disclaimer = dynamic(() => import("components/Desktop/Disclaimer"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const DisclaimerMobile = dynamic(() => import("components/Mobile/DisclaimerMobile"));

const disclaimer = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={DisclaimerMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isStaticPage={true}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Disclaimer}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            config={pageData.config}
          />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  context = { ...context, ...{ pageSeo : {
    pageTitle: 'न्यूज़18 इंडिया, -Disclaimer, न्यूज़18 इंडिया Terms and Conditions',
    pageDescription:'न्यूज़18 इंडिया, -Disclaimer, न्यूज़18 इंडिया Terms and Conditions',
    pageKeywords: 'न्यूज़18 इंडिया Disclaimer and User Agreement Policy',
    og_description: 'न्यूज़18 इंडिया Disclaimer: Network18 Group Hindi News Portals By accessing न्यूज़18 इंडिया or any of its associate/group sites, you have read, understood and agree to be legally bound by the terms of the disclaimer and user agreement',
    breadCrumbArray: [
      { value: "Home", slug: "" },
      { value: "Disclaimer", slug: `disclaimer/` },
     ]
  }}}
  return staticPagesProps(context);
}

export default disclaimer;
