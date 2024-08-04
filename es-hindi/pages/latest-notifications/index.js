//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import notificationHubProps from "../../helper/notificationHubProps";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import { useMemo } from "react";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const NotificationHub = dynamic(() =>
  import("components/Responsive/NotificationHub")
);

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const DesktopWithRHS = (props) => {
  const {
    pageAds = {},
    photoStories = [],
    topStories = [],
    currentUrl = "",
    topStory = {},
  } = useMemo(() => props.data, [props.data]);
  const { rhsTopStoryListing = [] } = topStory || {};

  return (
    <>
      <div className="outer">
        <div className="section-blog">
          <div className="section-blog-left  resLiftSideFull">
            <NotificationHub data={props.data} />
          </div>
          <RhsCommon
            pageAds={pageAds}
            currentURL={currentUrl}
            photoStories={photoStories}
            isRss={true}
            topStories={
              rhsTopStoryListing.length ? rhsTopStoryListing : topStories
            }
          />
        </div>
      </div>
      <style jsx global>{`
        body {
          font-family: "Mukta", sans-serif;
        }
        .outer {
          margin: auto;
          max-width: 1245px;
          padding: 0 10px;
          position: relative;
          z-index: 1;
          margin-bottom: 10px;
        }
        .section-blog-left {
          width: calc(100% - 315px);
          float: left;
        }

        .section-blog-left-aricle {
          width: 100%;
          padding: 10px 0;
          box-sizing: border-box;
        }
        .sideMiddle {
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

const category = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isCategory={true}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <MobileLayout
          data={pageData}
          mainComponent={NotificationHub}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isCategory={true}
          isMobile={true}
          dtype={"category"}
          pageType="photogallery"
        />
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={DesktopWithRHS}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
          isCategory={true}
          dtype={"category"}
          pageType="photogallery"
          config={pageData.config}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return await notificationHubProps(context);
}

export default category;
