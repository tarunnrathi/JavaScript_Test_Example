import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import PlayerProps from '../../helper/pro-kabaddi-leage/playerProps';

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const PlayerProfile = dynamic(() => import("components/ProKabaddiLeague/PlayerProfile"));
const PlayerMobile = dynamic(() => import("components/ProKabaddiLeague/Mobile/PlayerProfile"));

const PlayerDetails = ({ pageData, chartbeat }) => {
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
            mainComponent={PlayerMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isProKabaddi={true}
            isStaticPage={true}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={PlayerProfile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            config={pageData.config}
            isProKabaddi={true}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return PlayerProps(context);
}
export default PlayerDetails;