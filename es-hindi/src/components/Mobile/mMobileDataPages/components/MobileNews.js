import { setDefaultImage } from "includes/article.util";
import React from "react";
import { getCompleteURL } from "util/global/Helper";
import SiteAd from "widgets/Common/Responsive/SiteAd";

export default function MobileNews({ data = [], title = "", pageAds }) {
  return (
    <div className="homeNewsHeading">
      {title && (
        <h2 className="phnglblhd">
          लेटेस्‍ट मोबाइल<span> न्‍यूज</span>
        </h2>
      )}
      <ul className="spcnwslist">
        <li>
          <a className="anchor" href={getCompleteURL(data[0]?.weburl_r,data[0]?.weburl)+"/"}>
            <figcaption>
              <h2>
                <div>{data[0]?.display_headline}</div>
              </h2>
            </figcaption>
            <figure>
              <img
                src={data[0]?.images?.url}
                alt={data[0]?.headline || data[0]?.display_headline}
                height={"227px"}
                width={"340px"}
                loading="lazy"
                onError={setDefaultImage}
              />
            </figure>
          </a>
        </li>

        {pageAds?.header_ATF_320 ? (
          <div className="add_secton">
            <div className="ad-container">
              <div className="addinner-box">
                <SiteAd
                   width={336}
                   height={280}
                  slotId="mobileAdNew300x250_0"
                  adUnit={pageAds?.header_ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280],
                   ]}
                  removeAdSpan={true}
                ></SiteAd>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {data &&
          data?.slice(1, 10)?.map((mobileData, index) => {
            return (
              <li>
                <a className="anchor" href={getCompleteURL(mobileData?.weburl_r,mobileData?.weburl)+"/"}>
                  <figcaption>
                    <div>
                      <h2>{mobileData?.display_headline}</h2>
                    </div>
                  </figcaption>
                  <figure>
                    <img
                      src={mobileData?.images?.url}
                      alt={mobileData?.headline || mobileData?.display_headline}
                      height={index === 0 ? "227px" : "66px"}
                      width={index === 0 ? "340px" : "100px"}
                      loading="lazy"
                      onError={setDefaultImage}
                    />
                  </figure>
                </a>
              </li>
            );
          })}
      </ul>
      <style jsx global>{`
        .spcnwslist li {
          display: flex;
          justify-content: space-between;
          background: #f5f5f5;
          padding: 10px;
          margin-bottom: 5px;
        }
        .spcnwslist li .anchor figcaption h2 {
          font-size: 15px;
          line-height: 20px;
        }
        .spcnwslist li a figcaption h2 {
          color: #001d42;
        }
        .spcnwslist li a figure {
          width: 100px;
          height: 67px;
          overflow: hidden;
          line-height: 0;
          flex-shrink: 0;
          margin-left: 15px;
        }
        .spcnwslist li a figure img {
          width: 100%;
        }
        .spcnwslist li:first-child {
          display: block;
        }
        .spcnwslist li:first-child figcaption div {
          font-size: 18px;
          line-height: 24px;
          margin-bottom: 5px;
        }
        .spcnwslist li:first-child figure {
          width: 100%;
          margin-left: 0;
          height: auto;
        }
        .phnnxtprvbtn {
          background: #f6f7f7;
          padding: 6px 0;
          border: 1px solid #f7f7f7;
          margin-bottom: 30px;
        }
        .phnnxtprvbtn a {
          background: #ffffff 0% 0% no-repeat padding-box;
          border: 2px solid #e1261c;
          border-radius: 20px;
          width: 80px;
          text-align: center;
          color: #e1261c;
          font-size: 13px;
          font-weight: bold;
          height: 36px;
          line-height: 34px;
          margin: 0 5px;
        }
        .phnnxtprvbtn a .dsbld {
          filter: grayscale(1);
          opacity: 0.4;
        }

        .spcmblcmprsnmore {
          background: #f5f5f5;
          text-align: center;
          display: block;
        }
        .spcmblcmprsnmore span {
          letter-spacing: 0.24px;
          text-decoration: underline;
          color: #e1261d;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: bold;
          background: #fff;
          padding: 0 8px;
          height: 22px;
          line-height: 22px;
          display: inline-block;
        }

        .anchor {
          display: flex;
        }
        .spcnwslist li:first-child a {
          display: block;
        }
      `}</style>

      {/* <!-- next prev button start --> */}
    </div>
  );
}
