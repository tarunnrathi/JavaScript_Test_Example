//Global import
import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import staticPagesProps from '../helper/staticPagesProps';

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const ContactUs = dynamic(() => import("components/Desktop/ContactUs"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const ContactUsMobile = dynamic(() => import("components/Mobile/ContactUsMobile"));

const contactUs = ({ pageData, chartbeat }) => {
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
            mainComponent={ContactUsMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isStaticPage={true}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={ContactUs}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            config={pageData.config}
          />
      }
    </>
  );
};

export async function getServerSideProps(context={}) {
  context = { ...context, ...{ pageSeo : {
    pageTitle:'न्यूज़18 इंडिया संपर्क, संपर्क आईबीएन खबर, Send Your Feedback, Hindi Khabar',
    pageDescription: "न्यूज़18इ ंडिया India's Top Hindi News Portal For सिनेमा, व्यापार, वित्त, मज़ा, वीडियो, क्रिकेट, यात्रा, सेलिब्रिटी पिक्चर्स, फिल्म गपशप, Current Affairs, Breaking News, India News In Hindi",
    pageKeywords: "न्यूज़18इंडिया, न्यूज़18 News, न्यूज़18इंडिया समाचार, हिन्दी समाचार, हिन्दी में समाचार, समाचार चैनल हिंदी, लाइव हिन्दी समाचार, नवीनतम समाचार हिंदी, News India, Indian News, Indian Hindi News",
    og_description : 'न्यूज़18 इंडिया संपर्क, संपर्क आईबीएन खबर, Send Your Feedback, Hindi Khabar',
    breadCrumbArray : [
      { value: "Home", slug: "" },
      { value: "Contact Us", slug: `contact-us/` },
     ]
  } } };
  return staticPagesProps(context);
}

export default contactUs;
