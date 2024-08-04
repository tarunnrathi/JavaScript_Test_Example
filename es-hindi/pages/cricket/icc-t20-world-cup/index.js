import t20WCProps from "../../../helper/t20WorldCup/t20WcProps";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const T20WcHome = dynamic(() => import("components/T20WorldCup/T20WcHome"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const t20WorldCup = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={T20WcHome}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isT20={true}
            isCricketNext={true}
            pageType={"homePage"}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
          :
          <DesktopLayout
            data={pageData}
            pageAds={pageData.pageAds}
            mainComponent={T20WcHome}
            isT20={true}
            isCricketNext={true}
            pageType='home'
            config={pageData.config}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  return t20WCProps(context);
}
export default t20WorldCup;
