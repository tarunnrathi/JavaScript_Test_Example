import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import homeProps from '../../helper/pro-kabaddi-leage/homeProps';

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const PklHomepage = dynamic(() => import("components/ProKabaddiLeague/PklHomepage"));
const HomepageMobile = dynamic(() => import("components/ProKabaddiLeague/Mobile/Homepage"));

const Homepage = ({ pageData, chartbeat }) => {

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
            mainComponent={HomepageMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isStaticPage={true}
            isProKabaddi={true}
            activeId={1}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={PklHomepage}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isProKabaddi={true}
            isHome={true}
            activeId={1}
            config={pageData.config}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return homeProps(context);
}
export default Homepage;