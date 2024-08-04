export const config = { amp: true };
import AmpLayout from "layouts/Amp/AmpLayout";
import IplAuctionAmp from "components/Amp/IplAuctionAmp";
import IplAuctionProps from "../../helper/iplAuctionProps";
import XMLScript from "components/Common/XMLScript";

const IplAuction = ({ pageData, chartbeat }) => {
    return (<>
        <XMLScript category="cricket" />
        <AmpLayout
            data={{ ...pageData }}
            mainComponent={IplAuctionAmp}
            pageSeo={pageData.pageSeo}
            pageAds={pageData.pageAds}
            chartbeat={chartbeat}
            isCricketNext={true}
        /></>
    )
};

export async function getServerSideProps(context) {
    return IplAuctionProps(context, true, true);
}
export default IplAuction;
