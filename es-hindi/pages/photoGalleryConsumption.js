import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import pgConsProps from "../helper/pgConsProps";
import Head from "next/head";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Photogallery = dynamic(() => import("components/Desktop/Photogallery"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const PhotogalleryMobile = dynamic(() => import("components/Mobile/PhotogalleryMobile.js"));

const photoGalleryConsumption = ({ pageData = {}, chartbeat }) => {
  const {
    articleData: { created_at, updated_at } = {}
  } = pageData;

  return (
    <>
      <Head>
        {created_at && updated_at && (
          <>
            <meta property="og:updated_time" content={pageData?.pageSeo?.jsonLdForArticleConsumption?.dateModified} />
            <meta property="article:published_time" content={pageData?.pageSeo?.jsonLdForArticleConsumption?.datePublished} />
            <meta property="article:modified_time" content={pageData?.pageSeo?.jsonLdForArticleConsumption?.dateModified} />
            <meta property="og:category" content={pageData.categoryName || ''} />
          </>
        )}
        <link rel="amphtml" href={'https://hindi.news18.com/amp' + pageData?.articleData?.weburl_r}/>
      </Head>
      <XMLScript category={"photogallery"} />
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
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
            //isPGCons={true}
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
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return pgConsProps(context, false);
}
export default photoGalleryConsumption;
