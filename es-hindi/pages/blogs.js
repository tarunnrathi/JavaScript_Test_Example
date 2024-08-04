//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import blogsProps from "../helper/blogsProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Blogs = dynamic(() => import("components/Desktop/blogs/Blogs"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const BlogsMobile = dynamic(() => import("components/Mobile/blogs/BlogsMobile"));

const blogs = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        chartbeat={chartbeat}
        url={pageData.currentUrl}
        isHome={true}
      />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={BlogsMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            dtype="tag"
            isTag={true}
            pageType={pageData.pageType}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Blogs}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            config={pageData.config}
          />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  return blogsProps(context);
}

export default blogs;
