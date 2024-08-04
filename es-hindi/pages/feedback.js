//Global import
import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import staticPagesProps from '../helper/staticPagesProps';

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Feedback = dynamic(() => import("components/Desktop/Feedback"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const FeedbackMobile = dynamic(() => import("components/Mobile/FeedbackMobile"));

const feedback = ({ pageData, chartbeat }) => {
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
            mainComponent={FeedbackMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isStaticPage={true}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Feedback}
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
    pageTitle: 'Feedback: न्यूज़18 इंडिया, Send Your Feedback, News18 Hindi Khabar',
    pageDescription:'Share your feedback with us at News18 Hindi (न्यूज़18 इंडिया), we always take your feedback positively and our continuous efforts is for betterment of our site.',
    pageKeywords:'Feedback for News18 Hindi, न्यूज़18 इंडिया,  समाचार, समाचार लाइव, Breaking News, Latest News, World News',
    og_description:'Share your feedback with us at News18 Hindi (न्यूज़18 इंडिया), we always take your feedback positively and our continuous efforts is for betterment of our site.',
    breadCrumbArray: [
      { value: "Home", slug: "" },
      { value: "Feedback", slug: `feedback` },
     ]
  }}}
  return staticPagesProps(context);
}

export default feedback;
