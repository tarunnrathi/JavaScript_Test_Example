import { topicParserContent } from "includes/silo.utils";
import { useState } from "react";

const SiloListingMobile = (props) => {
  const { siloListing = [] } = props.data;
  const [activeChild, setActiveChild] = useState(false);
  return (
    <>
      <div className="mob_home_wrapper">
        <div className="mob_content_wrapper">
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
                                  (child.children || []).map((itm, idx) => (
                                    <div
                                      key={idx + itm.heading}
                                      className="chld_cont_n"
                                    >
                                      <a href={itm.weburl}>
                                        {topicParserContent(itm.heading)}
                                      </a>
                                    </div>
                                  ))}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        * {
          margin: 0px;
          padding: 0px;
          box-sizing: border-box;
          list-style: none;
          text-decoration: none;
          outline: 0px;
        }
        .mob_home_wrapper {
          position: relative;
          width: 100%;
        }
        .mob_home_wrapper * {
          font-family: "Mukta";
        }
        .mob_content_wrapper {
          background: #fff;
          margin: auto;
          padding: 15px;
        }
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
        .uppr_pag_hdng {
          font-size: 36px;
          line-height: 44px;
          color: #001d42;
          font-weight: 800;
          padding: 10px 0px;
        }
        .hot_topics {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hot_topics li {
          width: 100%;
          margin: 0px auto 20px;
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
        }
        .aadharcard_info {
          margin-bottom: 10px;
        }
        .aadharcard_info a {
          font-size: 16px;
          color: #001d42;
          line-height: 28px;
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
        .chld_cont_n {
          margin-left: 20px;
        }
        .chld_cont_n a {
          border-bottom: none !important;
        }

        .inf_cont_n {
          display: block;
          margin-bottom: 2px;
        }
        .read_mor_e_sec {
          height: 36px;
          padding: 0px 16px;
          display: flex;
          align-items: center;
        }
        .hot_topics li:nth-child(odd) .read_mor_e_sec {
          background: #f5f5f5 0% 0% no-repeat padding-box;
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
        .hot_topics li:nth-child(odd) .read_mor_e_sec {
          background: #f5f5f5 0% 0% no-repeat padding-box;
        }
        .hot_topics li:nth-child(even) .read_mor_e_sec {
          background: #fff 0% 0% no-repeat padding-box;
        }
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

export default SiloListingMobile;
