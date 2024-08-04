//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import channelProps from "../../helper/channelProps";
import dynamic from "next/dynamic";
import Playlist from "components/Desktop/Playlist";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const PlaylistMobile = dynamic(() =>
  import("components/Mobile/PlaylistMobile")
);

const channel = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isVideo={true}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          pageType={"video"}
          mainComponent={PlaylistMobile}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isCategory={true}
          isMobile={true}
          dtype={"category"}
        />
      ) : (
        <DesktopLayout
          data={pageData}
          pageType={"video"}
          mainComponent={Playlist}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isCategory={true}
          dtype={"category"}
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return await channelProps(context);
}

export default channel;
