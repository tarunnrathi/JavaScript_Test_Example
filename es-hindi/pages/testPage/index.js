import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import homeProps from "../../helper/homeProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Home = dynamic(() => import("components/Desktop/Home"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const HomeMobile = dynamic(() => import("components/Mobile/HomeMobile"));

const HomePage = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isHome={true} chartbeat={chartbeat} />
      {
        pageData?.currentUrl?.includes("home-mobile") ?
          <MobileLayout
            data={pageData}
            mainComponent={HomeMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            pageType={"homePage"}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={Home}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            pageType={"homePage"}
            config={pageData.config}
          />
      }
    </>
  );
};

export async function getServerSideProps(context) {
  return homeProps(context);
}

export default HomePage;
