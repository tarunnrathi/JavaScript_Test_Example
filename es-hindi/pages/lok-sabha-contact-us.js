//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import staticPagesProps from "../helper/staticPagesProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const LokSabhaContactUs = dynamic(() => import("components/Common/LokSabhaContactUs"));

const HindiKeSamratComp = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isState={true} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={LokSabhaContactUs}
            pageAds={pageData?.pageAds}
            pageSeo={pageData?.pageSeo}
            isCategory={true}
            isMobile={true}
            dtype={'category'}
            showtopHeaderBanner={true}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={LokSabhaContactUs}
            pageAds={pageData?.pageAds}
            pageSeo={pageData?.pageSeo}
            isCategory={true}
            dtype={'category'}
            config={pageData?.config}
            showtopHeaderBanner={true}
          />
      }
    </>
  );

};

export async function getServerSideProps(context = {}) {
    context = { ...context, ...{ pageSeo : {
        pageTitle: 'lok-sabha-contact-us',
        pageDescription:'lok-sabha-contact-us',
        pageKeywords: 'lok-sabha-contact-us',
        og_description: 'lok-sabha-contact-us'
    }}}
  return staticPagesProps(context);
}
export default HindiKeSamratComp;