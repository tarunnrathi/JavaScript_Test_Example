//import SiteAd from "widgets/Common/Responsive/SiteAd";
import TeamRanking from "widgets/Common/Responsive/TeamRanking";
import CricketTweet from "widgets/Common/Responsive/CricketTweet";
import Matches from "./Matches";
import getConfig from "next/config";
//import Outbrain from "widgets/Common/Responsive/Outbrain";
import Predictor from "./Predictor";
import Taboola from "widgets/Common/Responsive/Taboola";
//import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
const { publicRuntimeConfig } = getConfig();

const ScoreRHS = ({ isNews, isIpl, isT20, upcoming = [], recent = [], pageAds, url = "", predictorData, taboola, taboolaList }) => {
  return (
    <div className={isNews ? "news_page_right" : ""}>
      <div className="score-ad">
        {/* <SiteAd
          slotId="cn-add-section-1"
          adUnit={pageAds?.ATF_300_id}
          lazyload={true}
          sizes={[
            [300, 250]
          ]}
          width={300}
          height={250}
          removeAdSpan
        /> */}
        <NewSiteAd
          slotId="cn-add-section-1"
          adUnit={pageAds?.ATF_300_id}          
          sizes={[
            [300, 250]
          ]}
          width={300}
          height={250}
          lazyLoad={true}
          removeAdSpan={true}       
        />
      </div>
      {isT20 ? <TeamRanking /> : null}
      {isIpl || isT20? (
        <>
          <Matches
            ctaLabel="पिछले सारे मैच"
            title={"पिछले मैच"}
            matches={recent}
            ctaLink={`${publicRuntimeConfig.siteUrl}cricket/result/series/${isT20?'t20-world-cup':'ipl-2021'}.html}`}
            type="recent"
          />
          <Matches
            ctaLabel="पूरा शेड्यूल"
            ctaLink={`${publicRuntimeConfig.siteUrl}${isT20?'t20-world-cup/schedule/':'cricket/match-schedule/'}`}
            title={"अगले मैच"}
            matches={upcoming}
            type="upcoming"
          />
        </>
      ) : (
        <TeamRanking />
      )}
      {pageAds?.MTF_300_id ? <div className="score-ad">
        {/* <SiteAd
          slotId="cn-add-section-2"
          adUnit={pageAds?.MTF_300_id}
          sizes={[
            [300, 250],
          ]}
          width={300}
          height={250}
          lazyload={true}
          removeAdSpan
        /> */}
        <NewSiteAd
          slotId="cn-add-section-2"
          adUnit={pageAds?.MTF_300_id}
          sizes={[
            [300, 250],
          ]}
          width={300}
          height={250}
          lazyLoad={true}
          removeAdSpan={true}         
        />
      </div> : null}
      <Predictor data={predictorData}/>
      <CricketTweet />
      <div className="vsp20 clearfix"></div>
      <div className="score-ad">
        {/* <SiteAd
          slotId="cn-add-section-3"
          adUnit={pageAds?.BTF_300_id}
          sizes={[
            [300, 250],
            [300, 600],
          ]}
          width={300}
          height={250}
          lazyload={true}
          removeAdSpan
        /> */}
        <NewSiteAd
          slotId="cn-add-section-3"
          adUnit={pageAds?.BTF_300_id}
          sizes={[
            [300, 250],
            [300, 600],
          ]}
          width={300}
          height={250}
          lazyLoad={true}
          removeAdSpan={true}       
        />
      </div>
      { taboola == true ? <Taboola
              mode={ taboolaList?.rhs?.mode}
              id={ taboolaList?.rhs?.id}
              container={ taboolaList?.rhs?.container}
              placement={ taboolaList?.rhs?.placement}
            /> : ""}
      <style>{`
      .news_page_right {
        width: 300px;
        float: right;
        position: relative;
      }
      .vsp20 {margin-top: 20px;}
        .score-ad {
            margin-bottom: 20px;
        }
        .score-ad span, .news_page_right span {
            background: #eee;
          font-size: 12px;
          color: #444;
          padding: 3px 0 3px 0;
          text-align: center;
          min-height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: normal;
        }
      `}</style>
    </div>
  );
};

export default ScoreRHS;
