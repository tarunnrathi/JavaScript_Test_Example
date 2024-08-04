import { setDefaultImage } from "includes/article.util";
import React from "react";

const MobileComparison = ({ data = [] }) => {
  return (
    <div>
      <section className="mcm_wrp">
        <h2 className="sc_ttl">
          मोबाइल <span>की तुलना</span>
        </h2>
        <div className="mc_wrp">
          {data.slice(0, 2).map((news) => {
            return (
              <div className="mc_F">
                <div className="mcc_otr mid">
                  <a href={news?.url+"/"} className="mcc_col">
                    <img
                      src={news?.thumbnail}
                      alt=""
                      onError={setDefaultImage}
                      loading="lazy"
                      maxWidth='216px'
                      height='144px'
                    />
                    <div className="ttl">{news?.display_headline}</div>
                  </a>
                </div>
              </div>
            );
          })}
          <div className="mc_S">
            {data.slice(2, 5).map((news) => {
              return (
                <div className="mcc_otr sml">
                  <a href={news?.url+"/"} className="mcc_col">
                    <img
                      src={news?.thumbnail}
                      alt=""
                      onError={setDefaultImage}
                      loading="lazy"
                      maxWidth='100px'
                      height='66px'
                    />
                    <div className="ttl">{news?.display_headline}</div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="mr_mc_wrp">
          <a href="" className="mr_mc">
            MORE की तुलना
          </a>
        </div> */}
      </section>
    </div>
  );
};

export default MobileComparison;
