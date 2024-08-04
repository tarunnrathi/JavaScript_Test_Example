export const config = { amp: true };
import AmpLayout from "layouts/Amp/AmpLayout";
import photoStoryProps from "../../helper/photoStoryProps";
import PhotoStory from "components/Amp/PhotoStory/PhotoStory";
import XMLScript from "components/Common/XMLScript";

const photoStory =({ pageData, chartbeat, GA4Data }) => {
    return(<>
    <XMLScript category={"photogallery"} />
    <AmpLayout
    data={{ ...pageData, isBlog: true }}
    mainComponent={PhotoStory}
    pageAds={pageData?.pageAds}
    pageSeo={pageData?.pageSeo}
    chartbeat={chartbeat}
    dtype={"photo-story"}
    pageType="photo-story"
    GA4Data={GA4Data}
  />
    </>

);
};
export async function getServerSideProps(context) {
return photoStoryProps(context, true);
}
export default photoStory;
