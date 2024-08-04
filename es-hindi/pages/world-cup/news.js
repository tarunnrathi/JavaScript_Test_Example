import newsProps from "../../helper/WorldCup/newsProps";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const T20News = dynamic(() => import("components/WorldCup/News"));
const T20NewsMobile = dynamic(() => import("components/WorldCup/NewsMobile"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const News = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={T20NewsMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isWorldCup={true}
          isCricketNext={true}
          pageType={"homePage"}
          activeId={5}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageAds={pageData.pageAds}
          mainComponent={T20News}
          isCricketNext={true}
          isWorldCup={true}
          pageType="home"
          activeId={5}
          config={pageData.config}
        />
      )}
    </>
  );
};

export function getServerSideProps(context) {
  return newsProps(context);
}
export default News;
