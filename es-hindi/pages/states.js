//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import statesProps from "../helper/stateProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const States = dynamic(() => import("components/Desktop/States"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const StatesMobile = dynamic(() => import("components/Mobile/StatesMobile"));

const states = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isState={true} chartbeat={chartbeat} />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={StatesMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isCategory={true}
            isMobile={true}
            dtype={'category'}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={States}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isCategory={true}
            dtype={'category'}
            config={pageData.config}
          />
      }
    </>
  );

};

export async function getServerSideProps(context) {
  return statesProps(context);
}

export default states;
