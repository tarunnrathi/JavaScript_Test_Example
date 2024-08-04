import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import ScheduleProps from '../../helper/pro-kabaddi-leage/scheduleProps';

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const Schedule = dynamic(() => import("components/ProKabaddiLeague/Schedule"));
const ScheduleMobile = dynamic(() => import('components/ProKabaddiLeague/Mobile/Schedule'));

const PklSchedule = ({ pageData, chartbeat }) => {
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
            mainComponent={ScheduleMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isProKabaddi={true}
            activeId={3}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Schedule}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            isProKabaddi={true}
            isCricketNext={true}
            config={pageData.config}
            activeId={3}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return ScheduleProps(context);
}
export default PklSchedule;