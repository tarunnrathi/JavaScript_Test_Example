import DesktopLayout from "layouts/Desktop/DesktopLayout";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import podcastProps from "../helper/podcastProps";
import PodcastDetails from '../src/components/Desktop/PodcastDetails';

const podcastDetails = ({ pageData }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} />
      <DesktopLayout
        data={pageData}
        mainComponent={PodcastDetails}
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

export default podcastDetails;
