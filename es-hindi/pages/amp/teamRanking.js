export const config = { amp: true };
import AmpLayout from "layouts/Amp/AmpLayout";
import TeamRankingComponent from "components/Amp/teamRanking/teamRankingAmp";
import teamRankingprops from "../../helper/cnteamRankingprops";
import XMLScript from "components/Common/XMLScript";

const teamRanking = ({ pageData, chartbeat, GA4Data }) => {
  return (<>
      <XMLScript category="cricket" />
        <AmpLayout
        data={{ ...pageData }}
        mainComponent={TeamRankingComponent}
        pageSeo={pageData.pageSeo}
        pageAds={pageData.pageAds}
        chartbeat={chartbeat}
        pageType="cricketnext"
        isCricketNext={true}
        GA4Data={GA4Data}
      />
    </>)
  };

export async function getServerSideProps(context) {
    return teamRankingprops(context, true, true);
}
export default teamRanking;
