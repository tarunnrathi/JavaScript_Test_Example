//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import staticPagesProps from "../../helper/staticPagesProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const WatchWinContest = dynamic(() => import("components/Desktop/contest/watch-and-win-contest"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const WatchWinContestMobile = dynamic(() => import("components/Mobile/contest/watch-and-win-contest"));


const WatchWinContestCom = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isState={true} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={WatchWinContestMobile}
            pageAds={pageData?.pageAds}
            pageSeo={pageData?.pageSeo}
            isCategory={true}
            isMobile={true}
            dtype={'category'}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={WatchWinContest}
            pageAds={pageData?.pageAds}
            pageSeo={pageData?.pageSeo}
            isCategory={true}
            dtype={'category'}
            config={pageData?.config}
          />
      }
    </>
  );
};

export async function getServerSideProps(context = {}) {
    context = { ...context, ...{ pageSeo : {
        title: 'Watch and Win Contest',
        description: 'Watch and Win Contest',
        pageTitle: 'watch-and-win-contest',
        pageDescription:'watch-and-win-contest',
        pageKeywords: 'watch-and-win-contest',
        og_description: 'watch-and-win-contest'
    }}}
  return staticPagesProps(context);
}


export default WatchWinContestCom;