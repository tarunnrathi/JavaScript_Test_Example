import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import ResultsProps from "../../helper/WorldCup/resultsProps";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const ResultsComponent = dynamic(() => import("components/WorldCup/Results"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

export default function Results({ pageData, chartBeat }) {
  return (
    <>
      <SiteSeo
        pageSeo={pageData?.pageSeo}
        url={pageData?.currentUrl}
        isArticle={false}
        chartbeat={chartBeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={ResultsComponent}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isWorldCup={true}
          activeId={3}
          isCricketNext={true}
          pageType={"homePage"}
        />
      ) : (
        <DesktopLayout
          isCricketNext={true}
          mainComponent={ResultsComponent}
          data={pageData}
          pageAds={pageData?.pageAds}
          pageSeo={pageData?.pageSeo}
          isWorldCup={true}
          activeId={3}
          config={pageData?.config}
        />
      )}
    </>
  );
}

export function getServerSideProps(context) {
  return ResultsProps(context);
}
