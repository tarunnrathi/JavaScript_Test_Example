//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import svLandingProps from "../../helper/shortvideos/svLandingProps";
import dynamic from "next/dynamic";
import SvLanding from "components/Desktop/shortvideos/SvCategory";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
// const SvLanding = dynamic(() => import("components/Desktop/shortvideos/SvLanding"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
// const SvLandingMobile = dynamic(() => import("components/Mobile/mshortvideos/SvLandingMobile"));
const SvLandingMobile = dynamic(() => import("components/Mobile/mshortvideos/SvCategoryMobile"));

const svLandingPage = ({ pageData, chartbeat }) => {
    return (
        <>
            <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isShortVideos={true} chartbeat={chartbeat} />
            {
                pageData.isMobile ?
                    <MobileLayout
                        data={pageData}
                        mainComponent={SvLandingMobile}
                        pageAds={pageData.pageAds}
                        pageSeo={pageData.pageSeo}
                        isCategory={true}
                        dtype={'category'}
                        config={pageData.config}
                        showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
                    />
                    :
                    <DesktopLayout
                        data={pageData}
                        mainComponent={SvLanding}
                        pageAds={pageData.pageAds}
                        pageSeo={pageData.pageSeo}
                        config={pageData.config}
                        showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
                    />
            }
        </>
    );
};

export async function getServerSideProps(context) {
    // return {props: {}}
    return svLandingProps(context);
}

export default svLandingPage;
