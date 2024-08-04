import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import TeamProps from '../../helper/pro-kabaddi-leage/teamProps';

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const TeamPage = dynamic(() => import("components/ProKabaddiLeague/TeamPage"));
const TeamPageMobile = dynamic(() => import('components/ProKabaddiLeague/Mobile/TeamPage'));

const TeamDetails = ({ pageData, chartbeat }) => {
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
            mainComponent={TeamPageMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isStaticPage={true}
            isProKabaddi={true}
            activeId={6}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={TeamPage}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            isProKabaddi={true}
            config={pageData.config}
            activeId={6}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return TeamProps(context);
}
export default TeamDetails;