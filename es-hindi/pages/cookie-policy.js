import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import staticPagesProps from "../helper/staticPagesProps";
import CookiePolicyDesktop from "components/Desktop/CookiePolicy";
//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const cookiePolicy = ({ pageData, chartbeat }) => {
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
          mainComponent={CookiePolicyDesktop}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isStaticPage={true}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={CookiePolicyDesktop}
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
    pageTitle: "News18 Hindi Cookie Policy: न्यूज़18 इंडिया खबर, News18",
    pageDescription:"News18 Hindi Cookie Policy: News18 Hindi is committed to being transparent about the technologies we use. This Cookie Policy explains how and why cookies and other similar technologies may be stored on and accessed from your device when you use or visit the Our Websites.",
    pageKeywords: "Cookie Policy, न्यूज़18 इंडिया, News18 Hindi Cookie Policy, Breaking News, Latest News, World News",
    og_description:"News18 Hindi Cookie Policy: न्यूज़18 इंडिया खबर, News18",
  }}}
  return staticPagesProps(context);
}
export default cookiePolicy;
