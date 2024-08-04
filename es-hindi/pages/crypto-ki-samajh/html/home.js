import { React, useEffect, useState } from "react";
import getConfig from "next/config";
import Head from "next/head";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Crypheader from "./header";
import NewsletterForm from "./subscribe";
import RotateWidget from "./rotatebox";
import CryptoFooter from "./footer";

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import Slider from 'react-slick';

const Crypto_home = (props={}) => {
  const { publicRuntimeConfig } = getConfig();

  const [showOverlay, setShowOverlay] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const { pageSeo={} } = props?.data || {};
  const zPayWidgetData = props?.data?.zPayWidgetData || {};
  const zepayMarketInfo = props?.data?.zepayMarketInfo || {};
  const videoData = props?.data?.videoData || {};

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const unique =
    videoData.length > 0
      ? [...new Set(videoData.map((item) => item.bifurcation))]
      : "";

  // console.log({ unique });
  const articleData = props?.data?.tag_data || {};
  function changeVideos(e) {
    // e.preventDefault();
  }

  function makeThisFrameActive() {}

  const video_slider = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,

    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const article_slider = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const videoTab = {
    Episodes: "एपिसोड",
    Explainers: "एक्सप्लेनर",
    "Did You Know": "डिड यू नो",
    Vignettes: "विग्नेट",
    "News Stories": "न्यूज़ स्टोरीज़",
  };

  return (
    <>
      <Head>
        <title>{pageSeo.title}</title>
        <meta name="description" content={pageSeo.description} />
        <meta name="keywords" content={pageSeo.keywords} />
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
          content={typeof pageSeo.title !== "undefined" ? pageSeo.title : ""}
        />
        <meta
          property="og:description"
          content={
            typeof pageSeo.description !== "undefined"
              ? pageSeo.description
              : ""
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
          content={typeof pageSeo.title !== "undefined" ? pageSeo.title : ""}
        />
        <meta
          name="twitter:title"
          content={typeof pageSeo.title !== "undefined" ? pageSeo.title : ""}
        />
        <meta
          name="twitter:description"
          content={
            typeof pageSeo.description !== "undefined"
              ? pageSeo.description
              : ""
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
          <Crypheader data={props?.data || {}} />

          <section className="exchange">
            <span>
              <a
                href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                target="_blank"
                onClick="ga('send', 'event', 'ticker', 'Click', 'ZebPay')"
              >
                एक्सचेंज
              </a>
            </span>
            <div className="marquee">
              <marquee>
                <div className="exchange-slider">
                  <a
                    href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                    target="_blank"
                    onClick="ga('send', 'event', 'ticker', 'Click', 'ZebPay')"
                  >
                    {(Array.isArray(zepayMarketInfo) ? zepayMarketInfo : []).map((zep, key) => {
                      return zep.currency === "INR" ? (
                        <div className="sub-exchange" key={key}>
                          <span className="curr-stat-wrap">
                            <span className="curr-stat">
                              {" "}
                              {zep.virtualCurrency ? zep.virtualCurrency : 0}
                              <span className="cur">/inr</span>
                            </span>
                            <span
                              className={
                                zep.currency == "INR" && zep.pricechange >= 0
                                  ? "curr-percent green"
                                  : "curr-percent"
                              }
                            >
                              {zep.pricechange < 0
                                ? "+" + zep.pricechange + "%"
                                : "0%"}{" "}
                            </span>
                          </span>
                          <span className="money">
                            {zep.market ? "₹" + zep.market : "0"}
                          </span>
                        </div>
                      ) : (
                        ""
                      );
                    })}
                  </a>
                </div>
              </marquee>
            </div>
          </section>

          <section className="crypto_about" id="about">
            <div className="crypto_container">
              <div className="row">
                <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/bitcoint_group.png" />
                <div className="about_text">
                  <span className="heading">अबाउट</span>
                  <p>
                    क्रिप्टोकरेंसी, हाल के दिनों में सबसे नवीनतम और रोमांचक असैट
                    वर्गों में से एक के रूप में उभरी है। भारत में भी, शुरुआती
                    आशंकाओं ने क्रिप्टोकरेंसी की असीमित संभावनाओं में विश्वास
                    पैदा किया है। अपने काम को और अधिक दिलचस्प बनाने और निवेशकों
                    को उनकी क्रिप्टोकरेंसी यात्रा की शुरूआत करवाने के लिए,
                    ZebPay और News18 Network मिल के, डिजिटल करेंसी से संबंधित
                    सभी प्रश्नों का उत्तर देने और उनमें निवेश करने का तरीका
                    समझाने के लिए, वन-स्टॉप मीडिया हब 'क्रिप्टो की समझ' पेश कर
                    रहे हैं। वित्त संबंधी भविष्य जानने के लिए तैयार हो जाइए!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {articleData.length > 0 ? (
            <section className="crypto_article" id="articles">
              <div className="crypto_container">
                <span className="heading">आर्टिकल</span>
                <ul className="article_slider">
                  <Slider {...article_slider}>
                    {articleData.map((adata, key) => (
                      <li key={key}>
                        <img
                          src={
                            adata.thumbnail
                              ? adata.thumbnail
                              : "https://images.news18.com/ibnkhabar/uploads/2023/03/cryptocurrency-16783367853x2.jpg"
                          }
                          width={470}
                          height={270}
                          title="News18 Hindi"
                          alt="News18 Hindi"
                        />
                        <span className="slide_title">
                          {adata.display_headline
                            ? adata.display_headline
                            : adata.headline || "News18 Hindi"}
                        </span>
                        <p>
                          {adata.intro
                            ? adata.intro
                            : adata.headline || "News18 Hindi"}
                        </p>
                        <a href={adata.url || ""}>और पढ़े...</a>
                      </li>
                    ))}
                  </Slider>
                </ul>
              </div>
            </section>
          ) : (
            ""
          )}

          {videoData.length > 0 ? (
            <section className="video_section" id="video">
              <div className="crypto_container">
                <ul className="tab_crypto tabs-nav">
                  {unique.map((value, key) =>
                    value != "" ? (
                      <li
                        id={value}
                        // onClick={changeVideos()}
                        key={key}
                        className={
                          activeTab === `tab${key + 1}` ? "active" : ""
                        }
                        onClick={() => handleTabClick(`tab${key + 1}`)}
                      >
                        <a href={void 0} data-toggle="tab">
                          {videoTab[value]}
                        </a>
                      </li>
                    ) : (
                      ""
                    )
                  )}
                </ul>
                <div className="cypto_tab_details">
                  {unique.map((value, key) =>
                    value != "" ? (
                      <>
                        <div
                          key={key}
                          className={
                            activeTab === `tab${key + 1}`
                              ? "tab_panel tab-content show"
                              : "tab_panel tab-content hide"
                          }
                          id={`tab${key + 1}`}
                        >
                          {videoData
                            .filter((d) => d.bifurcation == value)
                            .map((val, k) =>
                              k == 0 ? (
                                <div className="big_video" key={"big" + k}>
                                  <iframe
                                    width="100%"
                                    height="600"
                                    src={
                                      "https://www.youtube.com/embed/" +
                                      val["videoId"]
                                    }
                                    title={val.description || ""}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                  ></iframe>
                                  <p className="big_video_html">
                                    {val.description || ""}
                                  </p>
                                </div>
                              ) : (
                                ""
                              )
                            )}
                          <div className="small_video">
                            <ul className="slider-nav">

                              <Slider {...video_slider}>
                                {videoData
                                  .filter((d) => d.bifurcation == value)
                                  .map((val, k) =>
                                    k > 0 ? (
                                      <li
                                        key={k}
                                        onClick={makeThisFrameActive(this)}
                                        vId={val.videoId}
                                      >
                                        <img
                                          src={val.image}
                                          title={val.description || ""}
                                          alt={val.description || ""}
                                        />
                                      </li>
                                    ) : (
                                      ""
                                    )
                                  )}
                              </Slider>
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )
                  )}
                </div>
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
        @media screen and (max-width: 720px) {
          .privacytab {
            padding: 5px 5px 3px 5px;
          }
        }

        .slick-list,
        .slick-slider {
          overflow: hidden;
        }
        button.slick-prev.slick-arrow {
          left: 0 !important;
        }
        button.slick-next.slick-arrow {
          right: 0 !important;
        }
        .crypto_article ul li .slide_title {
          padding: 15px 30px !important;
        }
        .crypto_article ul li p {
          padding: 10px 30px !important;
        }
        .overlay {
          display: block;
        }

        .crypto_article ul li p {
          height: 140px;
          overflow: hidden;
        }

        .subscribe .crypto_container .sub_input .form input{width: 100%;background: #fff;outline: none;border: none;height: 37px;border-radius: 20px;padding-left: 18px;}

        .video_section .crypto_container .small_video ul{
          display:block;
        }

        
      `}</style>
    </>
  );
};
export default Crypto_home;
