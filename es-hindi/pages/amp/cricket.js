export const config = { amp: true };
import AmpLayout from "layouts/Amp/AmpLayout";
import CricketHomeAmp from "components/Amp/CricketHomeAmp";
import cnHomeProps from "../../helper/cnHomeProps";
import XMLScript from "components/Common/XMLScript";

const cricket = ({ pageData, chartbeat, GA4Data }) => {
    return (<>
        <XMLScript category="cricket" />
        <AmpLayout
            data={{ ...pageData }}
            mainComponent={CricketHomeAmp}
            pageSeo={pageData.pageSeo}
            pageAds={pageData.pageAds}
            chartbeat={chartbeat}
            pageType="cricketnext"
            isCricketNext={true}
            GA4Data={GA4Data}
        />
    </>);
};

export async function getServerSideProps(context) {
    return cnHomeProps(context, true, true);
}
export default cricket;
