import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
import photoStoryProps from '../helper/photoStoryProps';

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const PhotoStory = dynamic(() => import("components/Desktop/PhotoStory/PhotoStory"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const PhotoStoryMobile = dynamic(() => import("components/Mobile/mPhotoStory/PhotoStoryMobile"));

const photoStory =({ pageData, chartbeat }) => {
    return(
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
            mainComponent={PhotoStoryMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            dtype='tag'
            isTag={true}
            pageType={"photo-story"}
            />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={PhotoStory}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            config={pageData.config}
            pageType={"photo-story"}
          />
      }
        </>
    );

};

export async function getServerSideProps(context) {
    return photoStoryProps(context);
}

export default photoStory;
