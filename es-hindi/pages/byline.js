//Global import
import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import bylineProps from '../helper/bylineProps';
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Byline = dynamic(() => import("components/Desktop/Byline"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const BylineMobile = dynamic(() => import("components/Mobile/BylineMobile"));

const byline = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isHome={true}
        chartbeat={chartbeat}
      />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={BylineMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            dtype='tag'
            isTag={true}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Byline}
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
  return bylineProps(context);
}

export default byline;
