import newsProps from "../../../helper/t20WorldCup/newsProps";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const T20News = dynamic(() => import("components/T20WorldCup/News"));
const T20NewsMobile = dynamic(() => import("components/T20WorldCup/NewsMobile"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const News = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={T20NewsMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isT20={true}
            isCricketNext={true}
            pageType={"homePage"}
            activeId={5}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
          :
      <DesktopLayout
        data={pageData}
        pageAds={pageData.pageAds}
        mainComponent={T20News}
        isCricketNext={true}
        isT20={true}
        pageType='home'
        activeId={5}
        config={pageData.config}
        showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
      />
}
    </>
  );
};

export async function getServerSideProps(context) {
  return newsProps(context);
}
export default News;
