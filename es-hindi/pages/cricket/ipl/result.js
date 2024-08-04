import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import iplResultsProps from "../../../helper/cricket/iplResultsProps";
import XMLScript from "components/Common/XMLScript";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const IplResult = dynamic(() =>
  import("components/Cricket/Desktop/IPL/IplResult")
);
const IplResultMobile = dynamic(() =>
  import("components/Cricket/Mobile/IPL/IplResult")
);

const Result = ({ pageData, chartbeat }) => {
  return (
    <>
      <XMLScript category="cricket" />
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={IplResultMobile}
          isCricketNext={true}
          isIpl={true}
          activeId={3}
          pageType="home"
          dtype="cricket-home-page"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={IplResult}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          config={pageData.config}
          activeId={3}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return iplResultsProps(context);
}
export default Result;
