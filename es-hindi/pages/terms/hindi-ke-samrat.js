//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import staticPagesProps from "../../helper/staticPagesProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const HindiKeSamratTandC = dynamic(() =>
  import("components/Desktop/contest/hindi-ke-samrat-TandC"),
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const states = ({ pageData, chartbeat }) => {
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
          mainComponent={HindiKeSamratTandC}
          pageAds={pageData?.pageAds}
          pageSeo={pageData?.pageSeo}
          isCategory={true}
          isMobile={true}
          dtype={"category"}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={HindiKeSamratTandC}
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
        pageTitle: "hindi-ke-samrat-TandC",
        pageDescription: "hindi-ke-samrat-TandC",
        pageKeywords: "hindi-ke-samrat-TandC",
        og_description: "hindi-ke-samrat-TandC",
      },
    },
  };
  return staticPagesProps(context);
}
export default states;
