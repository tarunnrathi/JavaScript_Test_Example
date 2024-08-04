import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import ResultProps from '../../helper/pro-kabaddi-leage/resultProps';

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const Result = dynamic(() => import("components/ProKabaddiLeague/PklResult"));
const ResultsMobile = dynamic(() => import("components/ProKabaddiLeague/Mobile/Results"));

const PklResult = ({ pageData, chartbeat }) => {
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
            mainComponent={ResultsMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isStaticPage={true}
            isProKabaddi={true}
            activeId={4}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Result}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            isProKabaddi={true}
            config={pageData.config}
            activeId={4}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return ResultProps(context);
}
export default PklResult;