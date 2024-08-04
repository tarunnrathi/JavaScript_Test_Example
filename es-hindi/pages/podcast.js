//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import podcastProps from "../helper/podcastProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Podcast = dynamic(() => import("components/Desktop/Podcast"));
const PodcastDetails = dynamic(() => import("components/Desktop/PodcastDetails"));
const PodcastCategories = dynamic(() => import("components/Desktop/PodcastCategories"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const mPodcast = dynamic(() => import("components/Mobile/Podcast"));
const mPodcastCategories = dynamic(() => import("components/Mobile/PodcastCategories"));
const mPodcastDetails = dynamic(() => import("components/Mobile/PodcastDetails"));

const PodcastPage = ({ pageData, chartbeat }) => {
  const { query } = pageData;
  const category = query.category ? query.category : "";
  const page = query.page ? query.page : "";
  const article = query.article ? query.article : "";

  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        chartbeat={chartbeat}
        url={pageData.currentUrl}
      />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={(!category && !page && !article) ? mPodcast : (!article) ? mPodcastCategories : mPodcastDetails}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
          /> :
          <DesktopLayout
            data={pageData}
            mainComponent={
              !category && !page && !article
                ? Podcast
                : !article
                  ? PodcastCategories
                  : PodcastDetails
            }
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            dtype={"podcast"}
            config={pageData.config}
          />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  return await podcastProps(context);
}

export default PodcastPage;
