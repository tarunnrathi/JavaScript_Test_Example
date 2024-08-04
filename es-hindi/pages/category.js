//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import categoryProps from "../helper/categoryProps";
import districtCategoryProps from "../helper/districtCategoryProps";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Category = dynamic(() => import("components/Desktop/Category"));
const CategoryDistrict = dynamic(() => import("components/Desktop/CategoryDistrict"));
const CategoryDistrictMobile = dynamic(() => import("components/Mobile/CategoryDistrictMobile"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const CategoryMobile = dynamic(() => import("components/Mobile/CategoryMobile"));
// const SubCategoryMobile = dynamic(() => import("components/Mobile/SubCategoryMobile"));

const revampCategoryList = ["lucknow", "ayodhya", "noida", "varanasi", "delhi", "patna", "ranchi", "indore", "jaipur", "burhanpur"];

const category = ({ pageData, chartbeat }) => {
  const { districtCategoryPage = false, pcategory = "" } = pageData;
  
  return (
    <>
      <XMLScript category={pcategory} />
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isCategory={true} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            // mainComponent={subCategory ? SubCategoryMobile : CategoryMobile}
            mainComponent= {districtCategoryPage ? CategoryDistrictMobile : CategoryMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isCategory={true}
            isMobile={true}
            dtype={'category'}
            pageType="category"
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={districtCategoryPage ? CategoryDistrict : Category}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isCategory={true}
            dtype={'category'}
            pageType="category"
            config={pageData.config}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
      }
    </>
  );

};

export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=240"
  );
  const urlParam = context.query;
  const subsection = urlParam.subsection || urlParam.subsection || "";
  if (revampCategoryList.indexOf(subsection) > -1 && !urlParam.page) {
    return await districtCategoryProps(context);
  } else {
    return await categoryProps(context);
  }
}

export default category;
