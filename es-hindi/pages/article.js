//Global import
import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import articleProps from "../helper/articleProps";
import Head from "next/head";
import XMLScript from "components/Common/XMLScript";
//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
// const LiveBlogDesktop = dynamic(() =>
//   import("components/Desktop/LiveBlogDesktop"),
// );
const NewLiveBlog = dynamic(() => import("components/Desktop/NewLiveBlog"));
const Article = dynamic(() => import("components/Desktop/Article"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const ArticleMobile = dynamic(() => import("components/Mobile/ArticleMobile"));
const NewLiveBlogMobile = dynamic(() =>
  import("widgets/Mobile/NewLiveBlogMobile")
);

const article = ({ pageData, chartbeat, dataLayer }) => {
  const { articleData: { created_at, updated_at } = {}, category = "" } =
    pageData || {};
  // const latestTimeStamp = pageData?.articleData?.liveUpdates?.latestTime;
  return (
    <>
      {created_at && updated_at && (
        <Head>
          <meta
            property="og:updated_time"
            content={
              pageData?.pageSeo?.jsonLdForArticleConsumption?.datePublished ||
              pageData?.pageSeo?.jsonLdForArticleConsumption?.dateModified
            }
          />
          <meta
            property="article:published_time"
            content={
              pageData?.pageSeo?.jsonLdForArticleConsumption?.datePublished
            }
          />
          <meta
            property="article:modified_time"
            content={
              pageData?.pageSeo?.jsonLdForArticleConsumption?.dateModified
            }
          />
          <meta property="og:category" content={pageData.categoryName || ""} />
        </Head>
      )}
      <XMLScript category={category} />
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.finalURL || pageData.currentUrl}
        isArticle={true}
        chartbeat={chartbeat}
        dataLayer={dataLayer}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={
            pageData?.isNewLiveBlog ? NewLiveBlogMobile : ArticleMobile
          }
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isArticle={true}
          isCricketNext={pageData.isCricketNext}
          pageType="article"
          isDistrict={pageData.isDistrict}
          showSponser={
            Object.keys(pageData._1xbetData || {}).length ? true : false
          }
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={
            pageData?.isNewLiveBlog
              ? NewLiveBlog
              : // : pageData?.liveBlogFlag
                // ? LiveBlogDesktop
                Article
          }
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isArticle={true}
          isCricketNext={pageData.isCricketNext}
          pageType="article"
          config={pageData.config}
          showSponser={
            Object.keys(pageData._1xbetData || {}).length ? true : false
          }
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=240"
  );
  return await articleProps(context, false, true);
}
export default article;
