export const config = { amp: true };
import getConfig from "next/config";
import AmpLayout from "layouts/Amp/AmpLayout";
import Webstory from "components/Amp/Webstory";
import webstoryProps from "../../helper/webstoryProps";

const webstory = ({ pageData, chartbeat }) => {
//   return <AmpLayout data={{ ...pageData, isHome : true}} mainComponent={Category} pageSeo={pageData.pageSeo} pageAds={pageData.pageAds} pageType={"category"}/>;

return(
  <AmpLayout
  data={{ ...pageData }}
  mainComponent={Webstory}
  pageAds={pageData.pageAds}
  pageSeo={pageData.pageSeo}
  dtype={"webstory"}
  pageType="webstory"
/>
);
};

export async function getServerSideProps(context) {
    return webstoryProps(context, true, true);
}
export default webstory;
