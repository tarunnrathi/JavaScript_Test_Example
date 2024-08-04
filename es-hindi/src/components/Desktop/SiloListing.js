import { topicParserContent } from "includes/silo.utils";
import React, { useMemo, useState } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const SiloListing = (props) => {
  const {
    pageAds,
    siloListing = [],
    photoStories,
    topStories,
    currentUrl,
  } = useMemo(() => props.data, [props.data]);
  const [activeChild, setActiveChild] = useState(false);
  return (
    <>
      <div className="home_wrapper">
        <div className="content_wrapper">
          <section className="upper_sec">
            <div className="left_wrap">
              <div className="bredcru_m">
                <div className="bredcrum_containr">
                  <a href="/">
                    <span>Home</span>
                  </a>{" "}
                  /<span className="act"> हॉट टॉपिक्स</span>
                </div>
              </div>
              <div className="page_layout">
                <div className="hot_tpics_section">
                  <h1 className="uppr_pag_hdng">हॉट टॉपिक्स</h1>
                  <ul className="hot_topics">
                    {Object.keys(siloListing).map((item, index) => {
                      return (
                        <>
                          <li key={index}>
                            <div className="topic_s_contain">
                              <h2>{item}</h2>
                              <div className="aadharcard_info">
                                {(siloListing[item] || []).map((child, ind) => {
                                  return (
                                    <div
                                      key={ind + child.title}
                                      className="inf_cont_n"
                                    >
                                      <span
                                        className="arrow"
                                        onClick={() =>
                                          setActiveChild(
                                            activeChild === item + ind
                                              ? false
                                              : item + ind,
                                          )
                                        }
                                      ></span>
                                      <a href={child.weburl}>
                                        {topicParserContent(child.title)}
                                      </a>
                                      {activeChild === item + ind &&
                                        (child.children || []).map(
                                          (itm, idx) => (
                                            <div
                                              key={idx + itm.heading}
                                              className="chld_cont_n"
                                            >
                                              <a href={itm.weburl}>
                                                {topicParserContent(
                                                  itm.heading,
                                                )}
                                              </a>
                                            </div>
                                          ),
                                        )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            {/* <div className="read_mor_e_sec">
                                            <a href={item.url} className="rd_more">
                                                और देखें
                                            </a>
                                            </div> */}
                          </li>
                          {index === 5 && (
                            <SiteAd
                              width={728}
                              height={90}
                              slotId={"Desktop_Static_Ad_2"}
                              adUnit={pageAds.BTF_728}
                              sizes={[
                                [728, 90],
                                [1, 1],
                              ]}
                              loadonScroll={true}
                            ></SiteAd>
                          )}
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <RhsCommon
              pageAds={pageAds}
              currentURL={currentUrl}
              photoStories={photoStories}
              isRss={true}
              topStories={topStories}
            />
          </section>
        </div>
      </div>

      <style jsx global>{`
        /* devanagari start*/
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
            format("woff2");
          unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
            U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
        }
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2)
            format("woff2");
          unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
            U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
        }
        /* devanagari end*/
        /* latin start*/
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 400;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnBrXw_1669353352.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 700;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin end*/
        .home_wrapper {
          position: relative;
          width: 100%;
        }
        .home_wrapper * {
          font-family: "Mukta";
        }
        .content_wrapper {
          max-width: 1284px;
          background: #fff;
          margin: auto;
          padding: 20px;
        }
        .upper_sec {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: 0px 0px 25px;
        }
        .left_wrap {
          width: calc(100% - 320px);
        }
        .right_wrap {
          width: 300px;
        }
        .rght_containr {
          position: sticky;
          top: 10px;
          z-index: 1;
        }
        /* breadcrumb section css */
        .bredcru_m {
          border-bottom: 1px dotted #939393;
          padding-bottom: 5px;
          text-transform: uppercase;
          display: flex;
          justify-content: space-between;
        }
        .bredcrum_containr {
          font-weight: 400;
          font-size: 13px;
          min-height: 24px;
          align-items: center;
          line-height: 15px;
          color: #3e3e3e;
        }
        .bredcrum_containr a {
          margin: 0 2px;
          color: #3e3e3e;
        }
        .bredcrum_containr .act {
          color: #838383;
        }
        /* ****************** grid page layout css **************** */
        .uppr_pag_hdng {
          font-size: 36px;
          line-height: 44px;
          color: #001d42;
          font-weight: 800;
          padding: 10px 0px;
        }
        .hot_topics {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hot_topics li {
          width: calc(33% - 10px);
          margin: 0px 0px 20px 0px;
          position: relative;
          background: #ffffff 0% 0% no-repeat padding-box;
          box-shadow: 0px 0px 6px #00000029;
          border: 1px solid #e2e2e2;
        }
        .hot_topics li .topic_s_contain {
          padding: 15px 15px 0px 15px;
        }
        .hot_topics li:nth-child(even) {
          background-color: #f5f5f5;
        }
        .hot_topics li h2 {
          font-size: 22px;
          line-height: 22px;
          color: #e1261d;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .hot_topics li p {
          font-size: 15px;
          line-height: 22px;
          color: #404040;
          font-weight: 400;
          margin-bottom: 0px;
          height: 67px;
          overflow: hidden;
        }
        .aadharcard_info {
          height: 203px;
          overflow-y: auto;
          margin-bottom: 10px;
        }
        .aadharcard_info .inf_cont_n a {
          font-size: 16px;
          color: #001d42;
          border-bottom: 1px solid;
          line-height: 20px;
          font-weight: 400;
          position: relative;
          margin-left: 15px;
          display: inline-block;
        }
        span.arrow {
          position: relative;
          top: 16px;
          width: 6px;
          left: 3px;
          cursor: pointer;
          height: 6px;
          border-top: 1px solid#e1261d;
          border-right: 1px solid#e1261d;
          display: block;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        .inf_cont_n {
          display: block;
          margin-bottom: 2px;
        }
        .chld_cont_n {
          margin-left: 20px;
        }
        .chld_cont_n a {
          border-bottom: none !important;
        }
        .hot_topics li .topic_s_contain .aadharcard_info::-webkit-scrollbar {
          width: 6px;
        }
        .hot_topics
          li
          .topic_s_contain
          .aadharcard_info::-webkit-scrollbar-track {
          background: #d6d6d6 0% 0% no-repeat padding-box;
          border-radius: 10px;
          overflow: hidden;
        }
        .hot_topics
          li
          .topic_s_contain
          .aadharcard_info::-webkit-scrollbar-thumb {
          background: #898989 0% 0% no-repeat padding-box;
          border-radius: 10px;
          overflow: hidden;
        }

        .read_mor_e_sec {
          height: 36px;
          padding: 0px 16px;
          display: flex;
          align-items: center;
          bottom: 0;
          position: absolute;
          width: 100%;
        }
        .hot_topics li:nth-child(odd) .read_mor_e_sec {
          background: #f5f5f5 0% 0% no-repeat padding-box;
        }
        .hot_topics li:nth-child(even) .read_mor_e_sec {
          background: #fff 0% 0% no-repeat padding-box;
        }
        .rd_more {
          font-size: 14px;
          color: #e1261d;
          line-height: 18px;
          font-weight: 700;
          position: relative;
          top: 1px;
          padding-right: 15px;
          display: inline-block;
        }
        .rd_more:after {
          content: "";
          position: absolute;
          top: 6px;
          width: 5px;
          right: 0px;
          height: 5px;
          border-top: 1px solid #e1261d;
          border-right: 1px solid #e1261d;
          display: block;
          transform: rotate(45deg);
        }
        /* *********** adds section ************** */
        .bid_add_sec {
          margin: 0px auto 20px;
          display: block;
          width: 728px;
          height: 90px;
        }
        .bid_add_sec a {
          display: block;
          height: 100%;
        }
        .bid_add_sec a img {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default SiloListing;
