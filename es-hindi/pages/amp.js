export const config = { amp: true };
import AmpLayout from "layouts/Amp/AmpLayout";
import Home from "components/Amp/Home";
import homeProps from "../helper/homeProps";

const homePage = ({ pageData, chartbeat, GA4Data }) => {
  return <AmpLayout data={{ ...pageData, isHome: true }}  mainComponent={Home} pageSeo={pageData.pageSeo} pageAds={pageData.pageAds} chartbeat={chartbeat} pageType={"home"} GA4Data={GA4Data} />;
};

export async function getServerSideProps(context) {
  return await homeProps(context, true);
}

export default homePage;
