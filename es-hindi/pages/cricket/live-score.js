import dynamic from "next/dynamic";
import livescoreProps from "../../helper/cnliveScoreProps";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const LiveScore = dynamic(() =>
  import("components/Cricketnext/LiveScore/LiveScore")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const LiveScoreMobile = dynamic(() =>
  import("components/Cricketnext/LiveScore/LiveScore")
);

const liveScore = ({ pageData, chartbeat }) => {
  return (
    <>
      <XMLScript category="cricket" />

      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isArticle={false}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData?.pageAds}
          mainComponent={LiveScoreMobile}
          isCricketNext={true}
          isMobile={true}
          isIpl=""
          isT20=""
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          dtype="onlycricket-page"
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData?.pageAds}
          mainComponent={LiveScore}
          isCricketNext={true}
          current={2}
          isIpl=""
          isT20=""
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export function getServerSideProps(context) {
  return livescoreProps(context);
}

export default liveScore;
