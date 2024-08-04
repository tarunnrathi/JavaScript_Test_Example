import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import LiveMatchProps from '../../helper/pro-kabaddi-leage/liveMatchProps';

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const LiveMatch = dynamic(() => import('components/ProKabaddiLeague/MatchCenter'));
const LiveMatchMobile = dynamic(() => import('components/ProKabaddiLeague/Mobile/MatchCenter'));

const MatchCenter = ({ pageData, chartbeat }) => {
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
            mainComponent={LiveMatchMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isStaticPage={true}
            isProKabaddi={true}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={LiveMatch}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            isProKabaddi={true}
            config={pageData.config}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return LiveMatchProps(context);
}
export default MatchCenter;