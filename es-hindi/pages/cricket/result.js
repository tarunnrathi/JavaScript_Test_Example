import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import Result from "../../helper/cricketResultprops";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const ResultsComponent = dynamic(() =>
  import("components/Cricketnext/results/ResultsComponent")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const ResultsMobileComponent = dynamic(() =>
  import("components/Cricketnext/results/ResultsComponentMobile")
);

export default function Results({ pageData, chartBeat }) {
  return (
    <>
      <XMLScript category="cricket" />

      <SiteSeo
        pageSeo={pageData?.pageSeo}
        url={pageData?.currentUrl}
        isArticle={false}
        chartbeat={chartBeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          isCricketNext={true}
          mainComponent={ResultsMobileComponent}
          data={pageData}
          pageAds={pageData?.pageAds}
          pageSeo={pageData?.pageSeo}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          dtype="onlycricket-page"
        />
      ) : (
        <DesktopLayout
          isCricketNext={true}
          mainComponent={ResultsComponent}
          data={pageData}
          pageAds={pageData?.pageAds}
          pageSeo={pageData?.pageSeo}
          current={3}
          config={pageData?.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  return Result(context);
}
