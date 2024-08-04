//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import olympicsProps from "../../../helper/olympicsProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Results = dynamic(() => import("components/Desktop/Olympics/Results"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));

const OlympicsSchedule = ({ pageData, chartbeat }) => {
    return (
        <>
            <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} chartbeat={chartbeat} />
            {
                pageData.isMobile ?
                    <MobileLayout
                        data={pageData}
                        mainComponent={Results}
                        pageAds={pageData.pageAds}
                        pageSeo={pageData.seo}
                        pageType={"OlympicsResults"}
                        isolympics={true}
                        showSponser={Object.keys(pageData._1xbetData || {}).length ? true : false}
                    />
                    :
                    <DesktopLayout
                        data={pageData}
                        mainComponent={Results}
                        pageAds={pageData.pageAds}
                        pageSeo={pageData.seo}
                        pageType={"OlympicsResults"}
                        isolympics={true}
                        config={pageData.config}
                        showSponser={Object.keys(pageData._1xbetData || {}).length ? true : false}
                    />
            }
        </>
    );
};

export async function getServerSideProps(context) {
    return olympicsProps(context);
}

export default OlympicsSchedule;
