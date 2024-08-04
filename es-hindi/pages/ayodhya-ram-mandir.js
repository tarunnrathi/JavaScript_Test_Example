//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import RamMandirProps from "../helper/ramMandirProps";

const RamMandir = dynamic(() => import("components/Desktop/RamMandir"));
const RamMandirMobile = dynamic(() => import("components/Mobile/RamMandirMobile"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));

//Desktop import

//Mobile import

const AyodhyaRamMandir = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isShortVideos={true} chartbeat={chartbeat} />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={RamMandirMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          pageType="ram-mandir"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          isDistrict={pageData.isDistrict}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={RamMandir}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          pageType="ram-mandir"
          showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return RamMandirProps(context);
}

export default AyodhyaRamMandir;
