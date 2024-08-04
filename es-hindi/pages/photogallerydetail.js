//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import articleProps from "../helper/articleProps";
import Head from "next/head";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Photogallery = dynamic(() => import("components/Desktop/Photogallery"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const PhotogalleryMobile = dynamic(() => import("components/Mobile/PhotogalleryMobile.js"));

const photogallery = ({ pageData = {}, chartbeat }) => {
  const {
    articleData: { created_at, updated_at } = {}
  } = pageData;

  return (
    <>
      <Head>
        {created_at && updated_at && (
          <>
            <meta property="og:updated_time" content={updated_at} />
            <meta property="article:published_time" content={created_at} />
            <meta property="article:modified_time" content={updated_at} />
            <meta property="og:category" content={pageData.categoryName || ''} />
          </>
        )}
      </Head>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.finalURL || pageData.currentUrl} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={PhotogalleryMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            dtype="photogallery"
            isCricketNext={pageData.isCricketNext}
            pageType="photogallery"
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Photogallery}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            dtype="photogallery"
            isCricketNext={pageData.isCricketNext}
            isPhoto={true}
            pageType="photogallery"
            config={pageData.config}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return articleProps(context, false);
}
export default photogallery;
