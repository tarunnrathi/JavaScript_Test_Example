import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import playlistProps from "../helper/playlistProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Playlist = dynamic(() => import("components/Desktop/Playlist"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const PlaylistMobile = dynamic(() =>
  import("components/Mobile/PlaylistMobile")
);

const playlist = ({ pageData }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isVideo={true}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
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
  return playlistProps(context);
}

export default playlist;
