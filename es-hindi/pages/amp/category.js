import AmpLayout from "layouts/Amp/AmpLayout";
import Category from "components/Amp/Category";
import categoryProps from "../../helper/categoryProps";
import XMLScript from "components/Common/XMLScript";

export const config = { amp: true };
const category = ({ pageData, GA4Data }) => {
  const { pcategory = "" } = pageData;
  //   return <AmpLayout data={{ ...pageData, isHome : true}} mainComponent={Category} pageSeo={pageData.pageSeo} pageAds={pageData.pageAds} pageType={"category"}/>;

return(<>
  <XMLScript category={pcategory} />
  <AmpLayout
    data={{ ...pageData, isCategory: true }}
    mainComponent={Category}
    pageAds={pageData.pageAds}
    pageSeo={pageData.pageSeo}
    dtype={"category"}
    pageType="category"
    GA4Data={GA4Data}
  />
</>
);
};

export async function getServerSideProps(context) {
    return await categoryProps(context, false, true);
}
export default category;
