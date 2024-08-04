import { setDefaultImage } from "includes/article.util";
import React from "react";
import { getCompleteURL } from "util/global/Helper";
let newsURL = require("/src/includes/brand.helper").newsURL;

const LatestNews = ({ data = [] }) => {
  return (
    <div>
      <section className="lmnm_wrp">
        <h2 className="sc_ttl">
          लेटेस्‍ट मोबाइल <span>न्‍यूज</span>
        </h2>
        <div className="lmn_wrp">
          <div className="lmn_F">
            <div className="lmnc_otr big">
              <a href={data.length && getCompleteURL(data[0]?.weburl_r,data[0]?.weburl)+"/"} className="lmnc_col">
                <img
                  style={{ maxWidth: "330px", height: "220px" }}
                  src={data.length && data[0].images?.url}
                  alt=""
                  onError={setDefaultImage}
                  loading="lazy"
                  // style={{  objectFit:'contain'}}
                />
                <div className="ttl">{data.length && data[0].display_headline}</div>
                <div className="copy">{data.length && data[0].intro}</div>
              </a>
            </div>
            <div className="lmnc_otr sml">
              <a href={data.length && getCompleteURL(data[1]?.weburl_r,data[1]?.weburl)+"/"} className="lmnc_col">
                <img
                  style={{ maxWidth: "100px", height: "66px" }}
                  src={data.length && data[1].images?.url}
                  alt=""
                  onError={setDefaultImage}
                  loading="lazy"
                />
                <div className="ttl">{data.length && data[1].display_headline}</div>
              </a>
            </div>
          </div>
          <div className="lmn_S">
            {data.slice(2, 7).map((news) => {
              return (
                <div className="lmnc_otr sml">
                  <a href={getCompleteURL(news?.weburl_r,news?.weburl)+"/"} className="lmnc_col">
                    <img
                      style={{ maxWidth: "100px", height: "66px" }}
                      src={
                        news?.images?.url ||
                        "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                      }
                      alt=""
                      onError={setDefaultImage}
                      loading="lazy"
                    />
                    <div className="ttl">{news?.display_headline}</div>
                  </a>
                </div>
              );
            })}
          </div>
          <div className="lmn_T">
            {data.slice(7, 9).map((news) => {
              return (
                <div className="lmnc_otr mid">
                  <a href={getCompleteURL(news?.weburl_r,news?.weburl)+"/"} className="lmnc_col">
                    <img
                      style={{ width: "203px", height: "135px" }}
                      src={
                        news?.images?.url ||
                        "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                      }
                      alt=""
                      onError={setDefaultImage}
                      loading="lazy"
                    />
                    <div className="ttl">{news?.display_headline}</div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mr_lmn_wrp">
          <a href={`${newsURL}/`} className="mr_lmn">
            अन्‍य खबरें
          </a>
        </div>
      </section>
    </div>
  );
};

export default LatestNews;
