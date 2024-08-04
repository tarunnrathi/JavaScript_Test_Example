import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import bitbnsProps from "../helper/bitbnsProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Bitbns = dynamic(() => import("components/Desktop/Bitbns"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const BitbnsMobile = dynamic(() => import("components/Mobile/Bitbns"));

const bitbns = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isCategory={true}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={BitbnsMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          pageType="microsite"
          isMobile={true}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={Bitbns}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          pageType="microsite"
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return bitbnsProps(context, "market");
}

export default bitbns;
