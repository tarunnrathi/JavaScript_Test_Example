//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import photogalleryListProps from "../../helper/photogalleryListProps";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const PhotogalleryCategory = dynamic(() => import("components/Desktop/PhotogalleryCategory"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const CategoryMobile = dynamic(() => import("components/Mobile/PhotogalleryCategoryMobile"));

const category = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isCategory={true} chartbeat={chartbeat} />
      {
        pageData.isMobile ? <MobileLayout
          data={pageData}
          mainComponent={CategoryMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isCategory={true}
          isMobile={true}
          dtype={'category'}
          pageType="photogallery"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          isPhotoLanding={true}
        />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={PhotogalleryCategory}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isCategory={true}
            dtype={'category'}
            pageType="photogallery"
            config={pageData.config}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
            isPhotoLanding={true}
          />
      }
    </>
  );

};

export async function getServerSideProps(context) {
  return photogalleryListProps(context);
}

export default category;
