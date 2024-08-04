import { React, /* useEffect, useState */ } from "react";
import Head from "next/head";
import Crypheader from "./header";
import NewsletterForm from "./subscribe";
import RotateWidget from "./rotatebox";
import CryptoFooter from "./footer";

const crypto_webinar = (props={}) => {
  const { pageSeo={} } = props?.data || {};

  const zepayMarketInfo = props?.data?.zepayMarketInfo || {};
  const filteredData = Array.isArray(zepayMarketInfo)? zepayMarketInfo.filter((item) => item.currency === 'INR'):[];
  const slicedKeys = Object.keys(filteredData).slice(0, 10);
  const sepslicedata = slicedKeys.reduce((obj, key) => {
    obj[key] = filteredData[key];
    return obj;
  }, {});

  const seo_title =
    "Cryptocurrency Price, News, Videos, Buy and Sell Information at News18 Hindi"; //pageSeo.title || "";
  const seo_description =
    "Cryptocurrency (क्रिप्टोकरेंसी): Get the latest news and Cryptocurrency Prices in India, Know about the Bitcoin, dogecoin, shiba rates in INR. Know how to buy sell Cryptocurrency and more."; //pageSeo.description || "";
  const seo_keyword =
    "Cryptocurrency, क्रिप्टोकरेंसी, Bitcoin News, Cryptocurrency news, Bitcoin News, Cryptocurrency price"; //pageSeo.keywords || "";

  return (
    <>
      <Head>
        <title>{seo_title || "News18 Hindi Crypto Page"}</title>
        <meta
          name="description"
          content={seo_description || "News18 Hindi Crypto Page"}
        />
        <meta
          name="keywords"
          content={seo_keyword || "News18 Hindi Crypto Page"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="max-image-preview:large" key="robot" />
        <meta httpEquiv="X-UA-Compatible" content="IE7, IE8, IE9" />
        <meta property="fb:admins" content="503334673" />
        <meta property="fb:pages" content="31867849201" />
        <meta
          property="fb:page_id"
          content="31867849201, 187957574620134, 126166140913489, 784667114916040,1075464282525405, 312128074436"
        />
        <meta property="og:image" content={pageSeo.image} />
        <meta property="fb:app_id" content="115930713951815" />
        <meta
          property="og:title"
          content={typeof seo_title !== "undefined" ? seo_title : ""}
        />
        <meta
          property="og:description"
          content={
            typeof seo_description !== "undefined" ? seo_description : ""
          }
        />
        <meta
          property="og:image"
          content={
            typeof pageSeo.ogImage !== "undefined"
              ? pageSeo.ogImage
              : "https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png"
          }
        />
        <meta
          property="og:image:alt"
          content={
            typeof pageSeo.og_image_alt !== "undefined"
              ? pageSeo.og_image_alt
              : ""
          }
        />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="900" />
        <meta property="og:locale" content="en_US" />

        <meta property="og:site_name" content="News18" />
        <meta
          property="og:url"
          content={typeof pageSeo.weburl !== "undefined" ? pageSeo.weburl : ""}
        />

        <meta
          name="tweetmeme-title"
          content={typeof seo_title !== "undefined" ? seo_title : ""}
        />
        <meta
          name="twitter:title"
          content={typeof seo_title !== "undefined" ? seo_title : ""}
        />
        <meta
          name="twitter:description"
          content={
            typeof seo_description !== "undefined" ? seo_description : ""
          }
        />
        <meta name="twitter:site" content="@cnnnews18" />
        <meta name="twitter:creator" content="@cnnnews18" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content={
            typeof canonical_url !== "undefined"
              ? canonical_url.replace("amp/", "")
              : ""
          }
        />
        <meta
          name="twitter:image"
          content={
            typeof pageSeo.image !== "undefined"
              ? pageSeo.image
              : "https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png"
          }
        />
        <meta
          name="twitter:image:alt"
          content={
            typeof pageSeo.og_image_alt !== "undefined"
              ? pageSeo.og_image_alt
              : ""
          }
        />

        <meta
          itemProp="image"
          content={
            pageSeo.itemPropImage
              ? pageSeo.itemPropImage
              : "https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png"
          }
        />

        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/css/style.css?reset=44"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://images.news18.com/ibnkhabar/uploads/assets/event/common/css/crypto_ki_samjh_1684925598.css"
        />
        <link
          rel="stylesheet"
          href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/css/slick.css"
        />

        <link rel="dns-prefetch" href="https://hindi.news18.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://ajax.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="http://static.ibnlive.in.com" />
        <link rel="dns-prefetch" href="http://img01.ibnlive.in" />
        <link rel="dns-prefetch" href="https://images.news18.com" />
      </Head>
      <div>
        <div className="crypto_wrap">
          <Crypheader data={props?.data || {}} banner={"show"} />

          <section className="crypto_container data_table">
            <span>क्रिप्टोकरेंसी की लाइव ट्रेडिंग</span>
            <div>
              <table>
                <tbody id="tblData">
                  <tr>
                    <th>कॉइन का नाम (कोड)</th>
                    <th>कीमत</th>
                    <th>बदलाव (24 घंटे में)</th>
                    <th>बदलाव (% में)</th>
                    <th>मार्केट कैप</th>
                    <th>कॉइन खरीदें</th>
                  </tr>
                  {Object.entries(sepslicedata).map(([key, itm]) => {
                    return itm.currency == "INR" ? (
                      <tr key={key}>
                        <td>{itm.virtualCurrency}</td>
                        <td> {"₹" + itm.market}</td>
                        <td
                          className={
                            itm.pricechange < 0 ? "arrow red" : "arrow green"
                          }
                        >
                          <span>
                            {itm.pricechange < 0
                              ? itm["24hoursHigh"]
                              : itm["24hoursLow"]}
                          </span>
                        </td>
                        <td className={itm.pricechange < 0 ? "red" : "green"}>
                          {itm.pricechange}
                        </td>
                        <td> &#8377; {` ${itm.volume}T`}</td>
                        <td>
                          <a
                            className={itm.pricechange < 0 ? "btn red" : "btn"}
                            href="https://zebpay.onelink.me/3539094372/f6a53f57"
                            target="_blank"
                          >
                            डाउनलोड ZebPay
                          </a>
                        </td>
                      </tr>
                    ) : (
                      ""
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <NewsletterForm />
          <RotateWidget />
          <CryptoFooter />
        </div>
      </div>
      <style jsx global>{`
        .rotatebox {
          width: 300px;
          height: 250px;
          margin: 14px 0 10px;
          position: relative;
        }
        .rotatebox .closebutton {
          transform: rotate(45deg);
          width: 27px;
          height: 27px;
          margin: 0;
          float: right;
          border-radius: 50%;
          background: #590591;
          box-sizing: border-box;
          position: absolute;
          cursor: pointer;
          top: -52px;
          right: -34px;
          z-index: 1;
        }
        .rotatebox .closebutton:before {
          position: absolute;
          content: "";
          top: 8px;
          left: 13px;
          height: 11px;
          width: 1px;
          background: #fff;
        }
        .rotatebox .closebutton:after {
          position: absolute;
          content: "";
          top: 13px;
          left: 9px;
          width: 10px;
          height: 1px;
          background: #fff;
        }
        .rotatebox .cubewrap {
          perspective: 900px;
          perspective-origin: 50% 100px;
        }
        .rotatebox .cube {
          position: relative;
          width: 200px;
          transform-style: preserve-3d;
        }
        .rotatebox .cube div {
          position: absolute;
          width: 200px;
          height: 200px;
        }
        .rotatebox .back {
          transform: translateZ(-100px) rotateY(180deg);
        }
        .rotatebox .right {
          transform: rotateY(-270deg) translateX(100px);
          transform-origin: top right;
        }
        .rotatebox .left {
          transform: rotateY(270deg) translateX(-100px);
          transform-origin: center left;
        }
        .rotatebox .top {
          transform: rotateX(-90deg) translateY(-100px);
          transform-origin: top center;
        }
        .rotatebox .bottom {
          transform: rotateX(90deg) translateY(100px);
          transform-origin: bottom center;
        }
        .rotatebox .front {
          transform: translateZ(100px);
        }
        @keyframes spin {
          from {
            transform: rotateY(0);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        .rotatebox .cube {
          animation: spin 7s infinite linear;
        }
        @media screen and (max-width: 1800px) {
          .rotatebox {
            border: none;
            width: inherit;
            height: inherit;
          }
          .rotatebox .closebutton {
            width: 20px;
            height: 20px;
            top: -30px;
            right: -22px;
          }
          .rotatebox .closebutton:before {
            top: 4px;
            left: 10px;
          }
          .rotatebox .closebutton:after {
            top: 8px;
            left: 6px;
          }
          .rotatebox .cubewrap {
            position: fixed;
            z-index: 99;
            perspective-origin: 50% 51px;
            bottom: 141px;
            right: 31px;
          }
          .rotatebox .cube {
            width: 102px;
          }
          .rotatebox .cube img {
            width: 102px;
            height: 102px;
          }
          .rotatebox .cube div {
            width: 102px;
            height: 102px;
          }
          .rotatebox .back {
            transform: translateZ(-51px) rotateY(180deg);
          }
          .rotatebox .right {
            transform: rotateY(-270deg) translateX(51px);
            transform-origin: top right;
          }
          .rotatebox .left {
            transform: rotateY(270deg) translateX(-51px);
            transform-origin: center left;
          }
          .rotatebox .top {
            transform: rotateX(-90deg) translateY(-51px);
            transform-origin: top center;
          }
          .rotatebox .bottom {
            transform: rotateX(90deg) translateY(51px);
            transform-origin: bottom center;
          }
          .rotatebox .front {
            transform: translateZ(51px);
          }
        }
        .overlay {
          display: block;
        }
      `}</style>
    </>
  );
};
export default crypto_webinar;
