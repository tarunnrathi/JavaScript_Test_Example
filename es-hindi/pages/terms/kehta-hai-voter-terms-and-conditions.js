//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import staticPagesProps from "../../helper/staticPagesProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const KehtaHaiVoterTandC = dynamic(() =>
  import("components/Desktop/contest/kehta-hai-voter-TandC"),
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const kehtaHaiVvoter = ({ pageData, chartbeat }) => {
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
          mainComponent={KehtaHaiVoterTandC}
          pageAds={pageData?.pageAds}
          pageSeo={pageData?.pageSeo}
          isCategory={true}
          isMobile={true}
          dtype={"category"}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={KehtaHaiVoterTandC}
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
    ...context,
    ...{
      pageSeo: {
        pageTitle: "Kehta Hai Voter-TandC",
        pageDescription: "Kehta Hai Voter-TandC",
        pageKeywords: "Kehta Hai Voter-TandC",
        og_description: "Kehta Hai Voter-TandC",
      },
    },
  };
  return staticPagesProps(context);
}
export default kehtaHaiVvoter;
