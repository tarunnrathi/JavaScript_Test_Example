import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import DesktopLayout from "layouts/Desktop/DesktopLayout";
import Bitbnscoins from "components/Desktop/Bitbnscoins";
import bitbnsProps from "../helper/bitbnsProps";

const bitbnscoins = ({ pageData, chartbeat }) => {
  // console.log(pageData);
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isCategory={true} chartbeat={chartbeat} />
      <DesktopLayout
        data={pageData}
        mainComponent={Bitbnscoins}
        pageAds={pageData.pageAds}
        pageSeo={pageData.pageSeo}
        pageType="microsite"
        config={pageData.config}
      />
    </>
  );

};

export async function getServerSideProps(context) {
  return bitbnsProps(context, false, "graph");
}

export default bitbnscoins;
