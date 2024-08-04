import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import staticPagesProps from "../helper/staticPagesProps";
import complaintRedressalDesktop from "components/Desktop/ComplaintRedressal";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const complaintRedressal = ({ pageData, chartbeat }) => {
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
          mainComponent={complaintRedressalDesktop}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isStaticPage={true}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={complaintRedressalDesktop}
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
    pageTitle: "न्यूज़18 इंडिया संपर्क, संपर्क आईबीएन खबर, Complaint Redressal, Hindi Khabar",
    pageDescription: "न्यूज़18 इंडिया  Top Hindi News Portal For सिनेमा, व्यापार, वित्त, मज़ा, वीडियो, क्रिकेट, यात्रा, सेलिब्रिटी पिक्चर्स, फिल्म गपशप, Current Affairs, Breaking News, India News In Hindi. Submit your complaint relating to Content at IBNKhabar.com and We will get back to you as early as possible",
    pageKeywords:"न्यूज़18इंडिया, न्यूज़18 News, न्यूज़18इंडिया समाचार, हिन्दी समाचार, हिन्दी में समाचार, समाचार चैनल हिंदी, लाइव हिन्दी समाचार, नवीनतम समाचार हिंदी, News India, Complaint Redressal, complaint relating to Content, Indian Hindi News",
    og_description:"न्यूज़18 इंडिया संपर्क, संपर्क आईबीएन खबर, Complaint Redressal, Hindi Khabar",
  }}}
  return staticPagesProps(context);
}
export default complaintRedressal;
