import { setDefaultImage } from "includes/article.util";
import React from "react";
import { getCompleteURL } from "util/global/Helper";
let newsURL = require("/src/includes/brand.helper").newsURL;
const LatestNewsV = ({ data = [] }) => {
  return (
    <div id="news">
      <div className="l_news">
        <div className="lnw_h">लेटेस्‍ट मोबाइल न्‍यूज </div>
        <div className="lnw_wrp">
          {data &&
            data.slice(0, 4).map((news) => {
              return (
                <a href={getCompleteURL(news["weburl_r"], news["weburl"])+"/"} className="lnw_thmb">
                  <img
                    style={{ width: "174px", height: "117px" }}
                    src={news?.images?.url}
                    alt=""
                    className="lnw_img"
                    onError={setDefaultImage}
                    loading="lazy"
                  />
                  <div className="lnw_c">{news?.display_headline}</div>
                </a>
              );
            })}
          <a href={`${newsURL}/`} className="mrn">
            अन्‍य खबरें
          </a>
        </div>
      </div>
    </div>
  );
};

export default LatestNewsV;
