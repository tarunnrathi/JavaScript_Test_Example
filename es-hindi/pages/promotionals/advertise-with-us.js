//Global import
import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import staticPagesProps from '../../helper/staticPagesProps';

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const AdvertiseWithUsDesktop = dynamic(() => import("components/Desktop/AdvertiseWithUsDesktop"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const AdvertiseWithUsMobile = dynamic(() => import("components/Mobile/AdvertiseWithUsMobile"));

const advertiseWithUs = ({ pageData, chartbeat }) => {
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
            mainComponent={AdvertiseWithUsMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isStaticPage={true}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={AdvertiseWithUsDesktop}
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
    pageTitle: 'Hindi.news18.com | Advertise with us',
    pageDescription:'News18 provides bespoke solutions with access to audiences across TV, digital and social for businesses looking to expand their reach.',
    pageKeywords: 'Advertise, Premium Cohort, Top Indian Website',
    og_description: 'News18 provides bespoke solutions with access to audiences across TV, digital and social for businesses looking to expand their reach.'
  }}}
  return staticPagesProps(context);
}

export default advertiseWithUs;