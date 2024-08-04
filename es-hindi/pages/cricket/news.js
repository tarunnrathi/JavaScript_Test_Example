import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import cnNewsProps from "../../helper/cnNewsListingProps";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const cnNews = dynamic(() => import("components/Cricketnext/cnNewsListing"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const cnNewsMobile = dynamic(() =>
  import("components/Cricketnext/cnNewsListingMobile")
);

const cricketNews = ({ pageData = {} }) => {
  return (
    <>
      <XMLScript category="cricket" />

      <SiteSeo pageSeo={pageData.pageSeo} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={cnNewsMobile}
          isCricketNext={true}
          isMobile={true}
          pageType="news"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          dtype="onlycricket-page"
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={cnNews}
          isCricketNext={true}
          pageType="news"
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};
export async function getServerSideProps(context) {
  return cnNewsProps(context);
}
export default cricketNews;
