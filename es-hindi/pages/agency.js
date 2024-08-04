//Global import
import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import agencyProps from '../helper/agencyProps';
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Agency = dynamic(() => import("components/Desktop/Agency"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const AgencyMobile = dynamic(() => import("components/Mobile/AgencyMobile"));

const agency = ({ pageData, chartbeat }) => {
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
            mainComponent={AgencyMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            dtype='tag'
            isTag={true}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Agency}
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
  return agencyProps(context);
}

export default agency;
