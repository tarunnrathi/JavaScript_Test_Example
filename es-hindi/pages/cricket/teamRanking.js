import dynamic from "next/dynamic";
import cnteamRankingprops from "../../helper/cnteamRankingprops";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const TeamRanking = dynamic(() =>
  import("components/Cricketnext/teamRanking/teamRankingComponent")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const TeamRankingMobile = dynamic(() =>
  import("components/Cricketnext/teamRanking/teamRankingComponentMobile")
);

const teamRanking = ({ pageData, chartbeat }) => {
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
          pageAds={pageData.pageAds}
          mainComponent={TeamRankingMobile}
          isCricketNext={true}
          current={4}
          config={pageData?.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          dtype="onlycricket-page"
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={TeamRanking}
          isCricketNext={true}
          current={4}
          config={pageData?.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
};

export function getServerSideProps(context) {
  return cnteamRankingprops(context, false);
}

export default teamRanking;
