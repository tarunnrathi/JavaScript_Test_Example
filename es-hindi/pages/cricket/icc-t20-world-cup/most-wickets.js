import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import mostWicketsProps from "../../../helper/t20WorldCup/mostWicketsProps";
import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const MostWicketsComponent = dynamic(() => import("components/T20WorldCup/MostWickets"));

const MostWickets = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={MostWicketsComponent}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isT20={true}
            isCricketNext={true}
            pageType={"homePage"}
            dtype="cricket-home-page"
            activeId={7}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
          :
          <DesktopLayout
            data={pageData}
            pageAds={pageData.pageAds}
            mainComponent={MostWicketsComponent}
            isCricketNext={true}
            isT20={true}
            pageType='home'
            activeId={7}
            config={pageData.config}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  return mostWicketsProps(context);
}
export default MostWickets;
