export const config = { amp: true };
import AmpLayout from "layouts/Amp/AmpLayout";
import blogsProps from "../../helper/blogsProps";
import BlogsAMP from "components/Amp/blogs/BlogsAMP";

const blogs =({ pageData, chartbeat, GA4Data }) => {
        return(
        <AmpLayout
        data={{ ...pageData, isBlog: true }}
        mainComponent={BlogsAMP}
        pageAds={pageData?.pageAds}
        pageSeo={pageData?.pageSeo}
        chartbeat={chartbeat}
        dtype={"blogs"}
        pageType="blogs"
        GA4Data={GA4Data}
      />
    );
};
export async function getServerSideProps(context) {
    return blogsProps(context, true);
}
export default blogs;
