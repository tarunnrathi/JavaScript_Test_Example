import { setDefaultImage } from "includes/article.util";
import React from "react";
import { getCompleteURL } from "util/global/Helper";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const NewsMain = ({ data = [], newsTitle = "", pageAds }) => {
  return (
    <div>
      <div className="mbn_mwrp">
        <div className="mbnc_wrp">
          <a href={data && data.length && getCompleteURL(data[0]?.weburl_r,data[0]?.weburl)+"/"} className="mbn_col">
            <img
              src={data && data.length && data[0]?.images?.url}
              alt=""
              className="mbn_thmb"
              onError={setDefaultImage}
              loading="lazy"
              maxWidth="450px"
              height="300px"
              // style={{  objectFit:'contain' }}
            />
            <div className="thmb_txtwrp">
              {newsTitle? <div className="thmb_tag">{newsTitle}</div> :""}
              <div className="thmb_copy">
                {data && data.length && data[0]?.display_headline}
              </div>
            </div>
          </a>
        </div>
        <div className="mbnc_wrp">
          <a href={data && data.length && getCompleteURL(data[1]?.weburl_r,data[1]?.weburl)+"/"} className="mbn_col">
            <img
              src={data && data.length && data[1]?.images?.url}
              alt=""
              className="mbn_thmb"
              onError={setDefaultImage}
              loading="lazy"
              maxWidth="214px"
              height="143px"
            />
            <div className="thmb_txtwrp">
              <div className="thmb_tag">{newsTitle}</div>
              <div className="thmb_copy">
                {data && data.length && data[1]?.display_headline}
              </div>
            </div>
          </a>
        </div>
        <div className="mbnc_wrp">
          <a href={data && data.length && getCompleteURL(data[2]?.weburl_r,data[2]?.weburl)+"/"} className="mbn_col">
            <img
              src={data && data.length && data[2]?.images?.url}
              alt=""
              className="mbn_thmb"
              onError={setDefaultImage}
              loading="lazy"
              maxWidth="214px"
              height="143px"
            />
            <div className="thmb_txtwrp">
              <div className="thmb_tag">{newsTitle}</div>
              <div className="thmb_copy">
                {data && data.length && data[2]?.display_headline}
              </div>
            </div>
          </a>
        </div>

        {pageAds.BTF_728 ? (
          <div className="ad-container">
            <SiteAd
              width={728}
              height={90}
              slotId={`commentary-ad-0`}
              adUnit={pageAds.BTF_728}
              sizes={[
                [728, 90],
                [1, 1],
              ]}
              removeAdSpan={true}
              loadonScroll={true}
            ></SiteAd>
          </div>
        ) : null}

        {data &&
          data.slice(3).map((news, key) => {
            return (
              <div className="mbnc_wrp">
                <a href={getCompleteURL(news?.weburl_r,news?.weburl)+"/"} className="mbn_col">
                  <img
                    src={news?.images?.url}
                    alt=""
                    className="mbn_thmb"
                    onError={setDefaultImage}
                    loading="lazy"
                    maxWidth="214px"
                    height="143px"
                  />
                  <div className="thmb_txtwrp">
                    <div className="thmb_tag">{newsTitle}</div>
                    <div className="thmb_copy">{news?.display_headline}</div>
                  </div>
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NewsMain;
