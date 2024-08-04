import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import LatestNewsProps from '../../helper/pro-kabaddi-leage/latestNewsProps';

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const LatestNews =  dynamic(() => import("components/ProKabaddiLeague/LatestNews"));
const LatestNewsMobile =  dynamic(() => import("components/ProKabaddiLeague/Mobile/LatestNews"));

const PklNews = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={LatestNewsMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isProKabaddi={true}
            activeId={2}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={LatestNews}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            isProKabaddi={true}
            config={pageData.config}
            activeId={2}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return LatestNewsProps(context);
}
export default PklNews;