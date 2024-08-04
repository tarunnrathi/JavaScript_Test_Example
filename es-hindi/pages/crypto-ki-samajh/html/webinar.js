import { React, useEffect, useState } from "react";
import getConfig from "next/config";
import Head from "next/head";
import Crypheader from "./header";
import NewsletterForm from "./subscribe";
import RotateWidget from "./rotatebox";
import CryptoFooter from "./footer";

const crypto_webinar = (props={}) => {
  const { publicRuntimeConfig } = getConfig();
  const { pageSeo={} } = props?.data || {};
  const zPayWidgetData = props?.data?.zPayWidgetData || {};
  const zepayMarketInfo = props?.data?.zepayMarketInfo || {};
  const videoData = props?.data?.videoData || {};
  const urlParam = props?.data?.urlParam || "";
  //   console.log({urlParam})
  const slug = urlParam ? urlParam.slug : "";
  //   console.log({slug})
  let webinarData = slug ? props?.data?.webinarData[slug] : "";
  webinarData = webinarData ? webinarData[0] : "";
  const seo_title = webinarData ? webinarData.seo_title : pageSeo.title;
  const seo_description = webinarData
    ? webinarData.seo_description
    : pageSeo.description;
  const seo_keyword = webinarData ? webinarData.seo_keyword : pageSeo.keywords;

  // const webinarId = webinarData ? webinarData["ID"] : "";
  // const webinarType = webinarData ? webinarData["webinar_type"] : "";
  const webinarDateTime = webinarData ? webinarData["webinat_date_time"] : "";
  const webinarGoLink = webinarData ? webinarData["webinar_go_link"] : "";
  const webinarYoutubeLink = webinarData ? webinarData["webinar_yt_link"] : "";
  const overviewHeading = webinarData ? webinarData["overview_heading"] : "";
  const speakerHeding = webinarData ? webinarData["speaker_heading"] : "";
  const discussionHeding = webinarData ? webinarData["discussion_heading"] : "";
  const overviewHeadingLink = webinarData
    ? webinarData["overview_heading_link"]
    : "";
  const GoLink = webinarGoLink ? webinarGoLink : "#";
  // const webinarSeoTitle = webinarData ? webinarData["seo_title"] : "";
  // const webinarSeoKeyword = webinarData ? webinarData["seo_keyword"] : "";
  // const webinarSeoDescription = webinarData ? webinarData["seo_description"] : "";

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
          <Crypheader data={props?.data || {}} banner={"hide"} />

          <section className="banner video">
            <div className="crypto_container">
              <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cypto_ki_smajh.png" />
              {webinarYoutubeLink ? (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${webinarYoutubeLink}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreenbanner={false}
                ></iframe>
              ) : (
                ""
              )}
            </div>
            {webinarDateTime ? (
              <div className="reg_now">
                <span>{webinarDateTime}</span>
                <a href={GoLink} target="_blank" className="regbutton">
                  Register Now!
                </a>
              </div>
            ) : (
              ""
            )}
          </section>

          {overviewHeadingLink ? (
            <section className="crypto_about" id="about">
              <div className="crypto_container">
                <div className="row">
                  <div className="about_text">
                    <span className="heading">{overviewHeading}</span>
                    <p>{overviewHeadingLink}</p>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}

          {speakerHeding ? (
            <section className="crypto_article" id="articles">
              <div className="crypto_container">
                <span className="heading">{speakerHeding}</span>
                <ul className="article_slider2">
                  {webinarData["speaker"].map((value, key) => {
                    <li key={key}>
                      <a href="javascript:void(0)">
                        <img src={value.section_image_url || ""} />
                        <span className="slide_title">
                          {value.speaker_name || ""}
                        </span>
                        <p>{value.speaker_degination || ""}</p>
                        <span>{value.speaker_title || ""}</span>
                      </a>
                    </li>;
                  })}
                </ul>
              </div>
            </section>
          ) : (
            ""
          )}

          {discussionHeding ? (
            <section className="discus">
              <div className="crypto_container">
                <span className="heading">{discussionHeding}</span>
                <ul>
                  {webinarData.discussion.map((value, key) => (
                    <li key={key}>{value.discussion_topic}</li>
                  ))}
                </ul>
              </div>
            </section>
          ) : (
            ""
          )}
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
