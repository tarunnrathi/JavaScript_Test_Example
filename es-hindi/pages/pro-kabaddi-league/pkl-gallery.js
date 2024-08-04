import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import GalleryProps from '../../helper/pro-kabaddi-leage/galleryProps';

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const Gallery = dynamic(()=>import("components/ProKabaddiLeague/Gallery"));
const GalleryMobile = dynamic(()=>import("components/ProKabaddiLeague/Mobile/Gallery"));

const PklGallery = ({ pageData, chartbeat }) => {
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
            mainComponent={GalleryMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isProKabaddi={true}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Gallery}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            isProKabaddi={true}
            config={pageData.config}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return GalleryProps(context);
}
export default PklGallery;