//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import webstoryProps from "../../helper/webstoryProps";
import dynamic from "next/dynamic";
import XMLScript from "components/Common/XMLScript";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Webstory = dynamic(() => import("components/Desktop/Webstory"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const WebstoryMobile = dynamic(() => import("components/Mobile/Webstory"));

const WebstoryPage = ({ pageData, chartbeat }) => {
    return (
        <>
            <XMLScript category={"web-stories"} />
            <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} chartbeat={chartbeat} />
            {
                pageData.isMobile ?
                    <MobileLayout
                        data={pageData}
                        mainComponent={WebstoryMobile}
                        pageAds={pageData.pageAds}
                        pageSeo={pageData.seo}
                        dtype={"webstory"}
                        isWebstory={true}
                        showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
                    />
                    :
                    <DesktopLayout
                        data={pageData}
                        mainComponent={Webstory}
                        pageAds={pageData.pageAds}
                        pageSeo={pageData.seo}
                        dtype={"webstory"}
                        isWebstory={true}
                        config={pageData.config}
                        showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
                    />
            }
        </>
    );
};

export async function getServerSideProps(context) {
    return webstoryProps(context);
}

export default WebstoryPage;
