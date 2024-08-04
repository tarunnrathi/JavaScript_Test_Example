import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import HomeProps from '../../helper/pro-kabaddi-leage/pointTableProps';

const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const PointTableComponent = dynamic(() => import("components/ProKabaddiLeague/PklPointTable"));
const PointTable = dynamic(() => import("components/ProKabaddiLeague/Mobile/PointTable"));

const PklPointTable = ({ pageData, chartbeat }) => {
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
            mainComponent={PointTable}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isProKabaddi={true}
            activeId={5}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={PointTableComponent}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            isProKabaddi={true}
            config={pageData.config}
            activeId={5}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  return HomeProps(context);
}
export default PklPointTable;