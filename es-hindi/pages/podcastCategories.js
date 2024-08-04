import PodcastCategories from "components/Desktop/PodcastCategories";
import DesktopLayout from "layouts/Desktop/DesktopLayout";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import podcastProps from "../helper/podcastProps";

const podcastCategories = ({ pageData }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} />
      <DesktopLayout
        data={pageData}
        mainComponent={PodcastCategories}
        pageAds={pageData.pageAds}
        pageSeo={pageData.seo}
        dtype={"podcast"}
        config={pageData.config}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  return podcastProps(context);
}

export default podcastCategories;
