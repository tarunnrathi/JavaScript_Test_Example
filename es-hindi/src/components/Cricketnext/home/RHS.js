import React from "react";
// import getConfig from "next/config";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import TeamRanking from "widgets/Common/Responsive/TeamRanking";
import CricketTweet from "widgets/Common/Responsive/CricketTweet";
import IPLPredictor from "components/Cricket/Common/Predictor";
import Taboola from "widgets/Common/Responsive/Taboola";
// const { publicRuntimeConfig } = getConfig();

const RHS = (props) => {
  return (
    <>
      {props.position == "first" ? (
        <>
          <div
            className="cn-add-section-1"
            style={{ width: "100%", minHeight: "250px" }}
          >
            <SiteAd
              adUnit={props.pageAds?.ATF_300_id}
              lazyload={true}
              sizes={[[300, 250]]}
              width={300}
              height={250}
              removeAdSpan={true}
            />
          </div>
          {!props.isIPL ? (
            <>
            <TeamRanking />
            <div
            className="cn-add-section-2"
            style={{ width: "100%", minHeight: "250px", marginBottom: "10px" }}
          >
            <SiteAd
              adUnit={props.pageAds?.MTF_300_id}
              sizes={[
                [300, 250],
                [300, 600],
                [336, 280],
                [250, 250],
              ]}
              width={300}
              height={250}
              removeAdSpan={true}
              lazyload={true}
            />
          </div>
            </>
          ) : (
            <>
              <IPLPredictor />
              <div
            className="cn-add-section-2"
            style={{ width: "100%", minHeight: "250px", marginBottom: "10px" }}
          >
            <SiteAd
              adUnit={props.pageAds?.MTF_300_id}
              sizes={[
                [300, 250],
                [300, 600],
                [336, 280],
                [250, 250],
              ]}
              width={300}
              height={250}
              removeAdSpan={true}
              lazyload={true}
            />
          </div>
              <div className="cn-add-section-2 cn-mb-20">
                <CricketTweet />
              </div>
            </>
          )}
            <div
            className="cn-add-section-1"
            style={{ width: "100%", minHeight: "250px" }}
          >
            <SiteAd
              adUnit={props.pageAds?.BTF_300_id}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={300}
              height={250}
              removeAdSpan={true}
              lazyload={true}
            />
            { props.taboola == true ? <Taboola
              mode={props?.taboolaList?.rhs?.mode}
              id={props?.taboolaList?.rhs?.id}
              container={props?.taboolaList?.rhs?.container}
              placement={props?.taboolaList?.rhs?.placement}
            /> : ""}
            {/* <img style={{display:"block"}} src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Ad-Unit-300x250.png" /> */}
          </div>
        </>
      ) : (
        <>
          {/* <div className="cn-add-section-1" style={{width:"100%",minHeight:"250px"}}>
                            <SiteAd
                                adUnit={props.pageAds?.BTF_300_id}
                                sizes={[
                                    [300, 250],
                                    [300, 600],
                                ]}
                                width={300}
                                height={250}
                                removeAdSpan= {true}
                            />
                        </div> */}
          <div className="cn-add-section-2 cn-mb-20">
            <CricketTweet />
          </div>
          <div
            className="cn-add-section-1"
            style={{ width: "100%", minHeight: "250px" }}
          >
            <SiteAd
              adUnit={props.pageAds?.BTF_300_id}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={300}
              height={250}
              removeAdSpan={true}
              lazyload={true}
            />
            { props.taboola == true ? <Taboola
              mode={props?.taboolaList?.rhs?.mode}
              id={props?.taboolaList?.rhs?.id}
              container={props?.taboolaList?.rhs?.container}
              placement={props?.taboolaList?.rhs?.placement}
            /> : ""}
            {/* <img style={{display:"block"}} src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Ad-Unit-300x250.png" /> */}
          </div>
        </>
      )}

      <style jsx global>{`
        .cn-add-section-1 {
          margin-bottom: 20px;
        }
        .cn-mb-20 {
          margin-bottom: 20px;
        }
        .cn-add-section-1 {
          margin-bottom: 20px;
        }
        .twitter_right_widget {
          height: 600px;
          overflow: scroll;
        }
      `}</style>
    </>
  );
};

export default RHS;
