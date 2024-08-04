//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import staticPagesProps from "../../helper/staticPagesProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const HindiKeSamrat = dynamic(() => import("components/Desktop/contest/hindi-ke-samrat"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const HindiKeSamratMobile = dynamic(() => import("components/Mobile/contest/hindi-ke-samrat"));


const HindiKeSamratComp = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isState={true} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={HindiKeSamratMobile}
            pageAds={pageData?.pageAds}
            pageSeo={pageData?.pageSeo}
            isCategory={true}
            isMobile={true}
            dtype={'category'}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={HindiKeSamrat}
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
        pageTitle: 'hindi-ke-samrat',
        pageDescription:'hindi-ke-samrat',
        pageKeywords: 'hindi-ke-samrat',
        og_description: 'hindi-ke-samrat'
    }}}
  return staticPagesProps(context);
}
export default HindiKeSamratComp;