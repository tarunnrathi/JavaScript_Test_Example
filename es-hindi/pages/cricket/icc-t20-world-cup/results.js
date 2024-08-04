import dynamic from "next/dynamic";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import resultsProps from "../../../helper/t20WorldCup/resultsProps";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const ResultsComponent = dynamic(() => import("components/T20WorldCup/Results"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

export default function Results({ pageData, chartbeat }) {

  return (
    <>
      <SiteSeo
        pageSeo={pageData?.pageSeo}
        url={pageData?.currentUrl}
        isArticle={false}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ?
        <MobileLayout
          data={pageData}
          mainComponent={ResultsComponent}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isT20={true}
          activeId={3}
          isCricketNext={true}
          pageType={"homePage"}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
        :
        <DesktopLayout
          isCricketNext={true}
          mainComponent={ResultsComponent}
          data={pageData}
          pageAds={pageData?.pageAds}
          pageSeo={pageData?.pageSeo}
          isT20={true}
          activeId={3}
          config={pageData?.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      }
    </>
  );

}

export async function getServerSideProps(context) {
  return await resultsProps(context);
}
