import dynamic from "next/dynamic";
import livescoreProps from "../../helper/liveScoreCardProps";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const LiveScoreCard = dynamic(() =>
  import("components/Cricketnext/LiveScoreCard/LiveScoreCard")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const LiveScoreCardMobile = dynamic(() =>
  import("components/Cricketnext/LiveScoreCard/LiveScoreCard")
);

const liveScore = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isArticle={false}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={LiveScoreCardMobile}
          isCricketNext
          isIpl={pageData.matchData?.isIpl}
          isT20={pageData?.matchData?.isT20}
          dtype="onlycricket-page"
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={LiveScoreCard}
          isCricketNext={true}
          current={2}
          isIpl={pageData?.matchData?.isIpl}
          isT20={pageData?.matchData?.isT20}
          config={pageData.config}
        />
      )}
    </>
  );
};
export function getServerSideProps(context) {
  return livescoreProps(context);
}
export default liveScore;
