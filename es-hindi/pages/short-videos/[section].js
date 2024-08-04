//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import svCategoryProps from "../../helper/shortvideos/svCategoryProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const SvCategory = dynamic(() => import("components/Desktop/shortvideos/SvCategory"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const SvCategoryMobile = dynamic(() => import("components/Mobile/mshortvideos/SvCategoryMobile"));

const svCategoryPage = ({ pageData, chartbeat }) => {
    return (
        <>
            <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isShortVideos={true} chartbeat={chartbeat} />
            {
                pageData.isMobile ?
                    <MobileLayout
                        data={pageData}
                        mainComponent={SvCategoryMobile}
                        pageAds={pageData?.pageAds}
                        pageSeo={pageData?.pageSeo}
                        config={pageData.config}
                    />
                    :
                    <DesktopLayout
                        data={pageData}
                        mainComponent={SvCategory}
                        pageAds={pageData.pageAds}
                        pageSeo={pageData.pageSeo}
                        config={pageData.config}
                    />
            }
        </>
    );
};

export async function getServerSideProps(context) {
    return svCategoryProps(context);
}

export default svCategoryPage;
