export const config = { amp: true };
import AmpLayout from "layouts/Amp/AmpLayout";
import WcHomeAmp from "../../src/components/Amp/WcHomeAmp";
import WcProps from "../../helper/WorldCup/WCProps";
import XMLScript from "components/Common/XMLScript";

const WorldCup = ({ pageData, chartbeat }) => {
  return (<>
      <XMLScript category="cricket" />
      <AmpLayout
        data={{ ...pageData }}
        mainComponent={WcHomeAmp}
        pageSeo={pageData.pageSeo}
        pageAds={pageData.pageAds}
        chartbeat={chartbeat}
        isCricketNext={true}
        isWorldCup={true}
      />
    </>  
  );
};

export async function getServerSideProps(context) {
  return WcProps(context, true, true);
}
export default WorldCup;
