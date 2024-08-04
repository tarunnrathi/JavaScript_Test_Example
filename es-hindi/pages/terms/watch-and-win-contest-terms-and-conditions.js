//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import staticPagesProps from "../../helper/staticPagesProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const WatchAndWinContestTermsC = dynamic(() =>
  import("components/Desktop/contest/watch-and-win-contest-termsC"),
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const WatchAndWinContestTems = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isState={true}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={WatchAndWinContestTermsC}
          pageAds={pageData?.pageAds}
          pageSeo={pageData?.pageSeo}
          isCategory={true}
          isMobile={true}
          dtype={"category"}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={WatchAndWinContestTermsC}
          pageAds={pageData?.pageAds}
          pageSeo={pageData?.pageSeo}
          isCategory={true}
          dtype={"category"}
          config={pageData?.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context = {}) {
  context = {
    ...context, ...{
      pageSeo: {
        title: 'Watch and Win Contest Terms and Conditions',
        description: 'Watch and Win Contest Terms and Conditions',
        pageTitle: "Watch and Win Contest Terms and Conditions",
        pageDescription: "Watch and Win Contest Terms and Conditions",
        pageKeywords: "Watch and Win Contest Terms and Conditions",
        og_description: "Watch and Win Contest Terms and Conditions",
      },
    },
  };
  return staticPagesProps(context);
}
export default WatchAndWinContestTems;
