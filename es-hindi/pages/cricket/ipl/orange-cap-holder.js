import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import iplOrangePurpleCapProps from "../../../helper/cricket/iplPurpleOrangeCapProps";
import XMLScript from "components/Common/XMLScript";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const OrangeCapTableMobile = dynamic(() =>
  import("components/Cricket/Mobile/IPL/OrangeCapTable")
);
const OrangeCapTable = dynamic(() =>
  import("components/Cricket/Desktop/IPL/OrangeCapTable")
);

const IplOrangeCapPage = ({ pageData, chartbeat }) => {
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
          mainComponent={OrangeCapTableMobile}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          dtype="cricket-home-page"
          activeId={10}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={OrangeCapTable}
          isCricketNext={true}
          isIpl={true}
          pageType="home"
          config={pageData.config}
          activeId={10}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return iplOrangePurpleCapProps(context);
}
export default IplOrangeCapPage;
