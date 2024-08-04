import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import MobileLayout from "layouts/Mobile/MobileLayout";
import Bitbns from "components/Mobile/Bitbnscoins";
import bitbnsProps from "../helper/bitbnsProps";

const bitbnscoins = ({ pageData, chartbeat }) => {
  //console.log(pageData);
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isCategory={true} chartbeat={chartbeat}/>
      <MobileLayout
        data={pageData}
        mainComponent={Bitbns}
        pageAds={pageData.pageAds}
        pageSeo={pageData.pageSeo}
        pageType="microsite"
        isMobile={true}
      />
    </>
  );

};

export async function getServerSideProps(context) {
    return bitbnsProps(context, true, "graph");
}

export default bitbnscoins;
