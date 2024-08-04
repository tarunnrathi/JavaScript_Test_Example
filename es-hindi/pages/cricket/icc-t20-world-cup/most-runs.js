import mostRunsProps from "../../../helper/t20WorldCup/mostRunsProps";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MostRunsComponent = dynamic(() => import("components/T20WorldCup/MostRuns"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const MostRuns = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={MostRunsComponent}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isT20={true}
            isCricketNext={true}
            pageType={"homePage"}
            activeId={8}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
          :
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={MostRunsComponent}
          isCricketNext={true}
          isT20={true}
          activeId={8}
          pageType='home'
          config={pageData.config}
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
        />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  return mostRunsProps(context);
}
export default MostRuns;
