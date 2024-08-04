import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import staticPagesProps from "../helper/staticPagesProps";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const AboutUs = dynamic(() => import("components/Desktop/AboutUs"));
//Mobile import

const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const AboutUsMweb = dynamic(() => import("components/Mobile/AboutUsMweb"));

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
          mainComponent={AboutUsMweb}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isStaticPage={true}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={AboutUs}
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
    pageTitle: 'About News18 Hindi: न्यूज़18 इंडिया खबर, लाइव, हिंदी वेब साइट',
    pageDescription:'About News18 Hindi: न्यूज़18 इंडिया is a Network 18 Venture प्रकाशन हिन्दी समाचार, व्यापार समाचार, दैनिक समाचार, कॉर्पोरेट समाचार, विश्व समाचार, India News, Technology News, Science News, Current Affairs News',
    pageKeywords: 'News18 Hindi, न्यूज़18 इंडिया, News18 नेटवर्क, समाचार, समाचार लाइव, Breaking News, Latest News, World News',
    og_description: 'About News18 Hindi: न्यूज़18 इंडिया is a Network 18 Venture प्रकाशन हिन्दी समाचार, व्यापार समाचार, दैनिक समाचार, कॉर्पोरेट समाचार, विश्व समाचार, India News, Technology News, Science News, Current Affairs News',
    breadCrumbArray : [
      { value: "Home", slug: "" },
      { value: "About Us", slug: `about-us/` },
     ]
  }}}
  return staticPagesProps(context);
}
export default aboutUs;
