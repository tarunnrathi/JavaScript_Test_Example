//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import aqiProps from "../../helper/aqiProps";
import dynamic from "next/dynamic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Aqi = dynamic(() => import("components/Desktop/Aqi"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const AqiMobile = dynamic(() => import("components/Mobile/AqiMobile"));

const aqi = ({ pageData }) => {
    return (
        <>
            <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} />
            {
                pageData.isMobile ?
                    <MobileLayout
                        data={pageData}
                        mainComponent={AqiMobile}
                        pageAds={pageData?.pageAds}
                        pageSeo={{}}
                        pageType="aqi"
                        config={{}}
                        isAqi={true}
                    />
                    :
                    <DesktopLayout
                        data={pageData}
                        mainComponent={Aqi}
                        pageAds={pageData?.pageAds}
                        pageSeo={{}}
                        pageType="aqi"
                        config={pageData.config}
                        isAqi={true}
                    />
            }
        </>
    );
};

export async function getServerSideProps(context) {
    return await aqiProps(context);
}
export default aqi;
