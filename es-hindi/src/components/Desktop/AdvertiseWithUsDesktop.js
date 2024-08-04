
import { useEffect, useMemo } from "react";
import Glide from "@glidejs/glide";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import LazyLoad from "react-lazyload";

const AdvertiseWithUsDesktop = (props) => {

const { pageAds, photoStories, topStories, currentUrl, topStory, advsData } = useMemo(() => props.data, [props.data]);
let rhsTopStoryListing = [];
if ("rhsTopStoryListing" in topStory) rhsTopStoryListing = topStory.rhsTopStoryListing;

  useEffect(() => {
    let element = document.querySelector(".ads_sldr");
    if (element) {
      new Glide(element, {
        type: "slider",
        autoplay: false,
        animationDuration: 1000,
        perView: 1,
        peek: {
          before: 170, // 287,
          after: 170, // 287,
        },
      }).mount();
    }
  });

  const isEmpty = (anything) => anything && Object.keys(anything).length ? false : true;

  const scrollToTarget = (id) => {
    const element = document.getElementById(id);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="OuterContainer">
          <div className="left">
            <section className="banner">
              <div className="container">
                <img
                  src="https://images.news18.com/ibnlive/uploads/advertise/banner.jpg?impolicy=website&width=924&height=426"
                  alt="banner img"
                  className="banner_img"
                  width="924px"
                  height="426px"
                  loading="lazy"
                />
                <div className="banr_txt_wrp">
                  <h1 className="banr_ttl">
                    For Powerful Ideas and Positive Impact <br />
                    On News18 write to us on
                  </h1>
                  {!isEmpty(advsData?.emailid1) && (
                    <div className="banr_copy">
                      {advsData?.emailid1?.split(",")?.[0] || ""}{" "}
                      <span> {advsData?.emailid1?.split(",")?.[1] || ""}</span>
                    </div>
                  )}
                  {!isEmpty(advsData?.emailid2) && (
                    <div className="banr_copy">
                      {advsData?.emailid2?.split(",")?.[0] || ""}{" "}
                      <span> {advsData?.emailid2?.split(",")?.[1] || ""}</span>
                    </div>
                  )}

                  {!isEmpty(advsData?.emailid3) && (
                    <div className="banr_copy">
                      {advsData?.emailid3?.split(",")?.[0] || ""}{" "}
                      <span> {advsData?.emailid3?.split(",")?.[1] || ""}</span>
                      <br />
                      <p
                        onClick={() => {
                          scrollToTarget("adform", "start");
                        }}
                      >
                        Or Read on… to know why should you get in touch with us
                        Now.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
            {!isEmpty(advsData?.aboutnews18title) && (
              <section className="about">
                <div className="container">
                  <h2 className="abt_ttl">{advsData?.aboutnews18title}</h2>
                  <img
                    src="https://images.news18.com/ibnlive/uploads/advertise/about.png?impolicy=website&width=442&height=230"
                    alt="about img"
                    className="about_img"
                    width="442px"
                    height="230px"
                    loading="lazy"
                  />
                  <p style={{ marginBottom: "50px" }}>
                    {advsData?.aboutnews18desc || ""}
                  </p>
                  {!isEmpty(advsData?.whyadvertisetitle) && (
                    <h2 className="abt_ttl" id="whyAdvertise">
                      {advsData?.whyadvertisetitle}
                    </h2>
                  )}
                  <p>{advsData?.whyadvertisedesc || ""}</p>
                </div>
              </section>
            )}

            {!isEmpty(advsData?.slider) && (
              <section className="ads">
                <div className="container">
                  <div className="ads_sldr">
                    <div className="track" data-glide-el="track">
                      <ul className="slides">
                        {JSON.parse(advsData?.slider)?.map((imgData, id) => (
                          <li className="slide" key={imgData?.id || id}>
                            <img src={imgData?.src} alt="arrow" />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="arrows" data-glide-el="controls">
                      <button
                        type="button"
                        className="arrow arrow--left"
                        data-glide-dir="<"
                      >
                        <img
                          src="https://images.news18.com/ibnlive/uploads/advertise/arrow.png"
                          alt="arrow"
                          height="43px"
                          width="43px"
                          loading="lazy"
                        />
                      </button>
                      <button
                        type="button"
                        className="arrow arrow--right"
                        data-glide-dir=">"
                      >
                        <img
                          src="https://images.news18.com/ibnlive/uploads/advertise/arrow.png"
                          alt="arrow"
                          height="43px"
                          width="43px"
                          loading="lazy"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {!isEmpty(advsData?.whyshouldadvertisetitle) && (
              <section className="who_advertise">
                <div className="container">
                  <div className="col">
                    <h2 className="wha_ttl">
                      {advsData?.whyshouldadvertisetitle}
                    </h2>
                    <p className="wha_copy">
                      {advsData?.whyshouldadvertiseleftdesc}
                    </p>
                  </div>
                  <div className="col clr">
                    {advsData?.whyshouldadvertiserightdesc}
                  </div>
                </div>
              </section>
            )}

            {!isEmpty(advsData?.youtubevideolink) && (
              <section className="video">
                <div className="container">
                  <div className="iframe_wrp">
                    <LazyLoad once offset={200}>
                      <iframe
                        width="815"
                        height="460"
                        src={advsData?.youtubevideolink}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </LazyLoad>
                  </div>
                </div>
              </section>
            )}

            <section className="metrics">
              <h2 className="mt_ttl">Key metrics</h2>
              <div className="mt_colwrp">
                <div className="col">
                  <div className="icon_Wrp">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/advertise/uv.svg?impolicy=website&width=34&height=55"
                      alt="logo1"
                      width="34px"
                      height="55px"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt_txt">
                    250<span>Mn </span>+
                  </div>
                  <div className="gre_txt">monthly unique visitors</div>
                </div>
                <div className="col">
                  <div className="icon_Wrp">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/advertise/pv.svg?impolicy=website&width=34&height=55"
                      alt="logo2"
                      width="34px"
                      height="55px"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt_txt">
                    1.2<span>Bn </span>+
                  </div>
                  <div className="gre_txt"> monthly pageviews</div>
                </div>
                <div className="col">
                  <div className="icon_Wrp">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/advertise/dau.svg?impolicy=website&width=34&height=55"
                      alt="logo3"
                      width="34px"
                      height="55px"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt_txt">
                    12.3<span>Mn </span>+
                  </div>
                  <div className="gre_txt">daily active users</div>
                </div>
              </div>
            </section>

            <section className="leadership">
              <h2 className="lp_ttl">Topical Coverage</h2>
              <div className="lp_colwrp">
                <div className="col">
                  <div className="icon_Wrp">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/advertise/camera.svg?impolicy=website&width=50&height=47"
                      alt="leadership"
                      width="50px"
                      height="47px"
                      loading="lazy"
                    />
                  </div>
                  <div className="lp_txt">
                    Unmatched in <br />
                    Big Event Coverage
                  </div>
                  <div className="lp_copy">
                    When it's about news, we cover it with a bang! Time and
                    again our Election and Budget numbers have proven that India
                    prefers to be with News18 as their credible news
                    destination.
                  </div>
                </div>
                <div className="col">
                  <div className="icon_Wrp">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/advertise/magic_wand.svg?impolicy=website&width=50&height=47"
                      alt="leadership2"
                      width="50px"
                      height="47px"
                      loading="lazy"
                    />
                  </div>
                  <div className="lp_txt">
                    Festivity <br />
                    Dominance
                  </div>
                  <div className="lp_copy">
                    The largest presence in languages gives News18 that unique
                    edge over other sites on regional festivities. Live
                    coverage, Editorial coverage and Engagement add more fervour
                    to these festivals.
                  </div>
                </div>
                <div className="col">
                  <div className="icon_Wrp">
                    <img
                      src="https://images.news18.com/ibnlive/uploads/advertise/fips.svg?impolicy=website&width=50&height=47"
                      alt="leadership3"
                      width="50px"
                      height="47px"
                      loading="lazy"
                    />
                  </div>
                  <div className="lp_txt">Flagship IPs</div>
                  <div className="lp_copy">
                    Network18’s Flagship IPs cut across various categories and
                    offer utility and entertainment to the users. We offer
                    customisable solutions for IPs.
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="right">
          <RhsCommon
            pageAds={pageAds}
            currentURL={currentUrl}
            photoStories={photoStories}
            isRss={true}
            topStories={
                rhsTopStoryListing.length ? rhsTopStoryListing : topStories
            } />
          </div>
        </div>
        <div id="adform">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSft44jcg1wNTlh0-mf9S3o01YkpMtRvOSo_qIzWXBtws5tPoQ/viewform?embedded=true" width="980" height="1300" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>
      </div>
      <style jsx global>
        {`
          @font-face {
            font-family: "Gotham";
            src: url(https://images.news18.com/ibnlive/uploads/advertise/fonts/Gotham-Light.otf);
            font-weight: 300;
          }
          @font-face {
            font-family: "Gotham";
            src: url(https://images.news18.com/ibnlive/uploads/advertise/fonts/GothamMedium_1.ttf);
            font-weight: 500;
          }
          @font-face {
            font-family: "Gotham";
            src: url(https://images.news18.com/ibnlive/uploads/advertise/fonts/GothamBold.ttf);
            font-weight: 700;
          }
          @font-face {
            font-family: "Gotham";
            src: url(https://images.news18.com/ibnlive/uploads/advertise/fonts/Gotham-Black.otf);
            font-weight: 900;
          }
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            font-family: "Gotham", sans-serif !important;
            line-height: 1.1;
          }
          a {
            text-decoration: none;
          }
          img {
            vertical-align: top;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          ul,
          p {
            margin: 0;
          }

          /* page css starts here */
          body {
            background: #f5f5f5;
          }
          .wrapper {
            width: 100%;
            background: #f5f5f5;
          }
          .container {
            max-width: 924px; // 1300px;
            margin: 0 auto;
            position: relative;
          }
          .OuterContainer {
            background: #fff;
            max-width: 1284px;
            margin: auto;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
          }
          .left {
            width: 924px;
          }
          /* banner section */
          .banner {
            border-bottom: #df2928 solid 10px;
          }
          .banner_img {
            max-width: 100%;
          }
          .banr_txt_wrp {
            background-color: #fceaea;
            width: 605px;
            height: 240px;
            position: absolute;
            bottom: -99px;
            left: 100px;
            padding: 30px 25px 25px 35px;
            z-index: 1;
          }
          .banr_ttl {
            font-size: 21px;
            line-height: 26px;
            color: #727271;
            font-weight: 500;
            margin-bottom: 15px;
          }
          .banr_copy {
            font-size: 17px;
            line-height: 32px;
            color: #e20613;
            font-weight: 500;
          }
          .banr_copy span {
            color: #727271;
            text-decoration: underline;
          }
          .banr_copy p {
            cursor: pointer;
          }
          /* about section */
          .about .container {
            padding: 130px 10px 30px 40px;
            background: white;
          }
          .about p {
            font-size: 17px;
            line-height: 26px;
            color: #727271;
            font-weight: 300;
            text-align: justify;
            max-width: 600px;
          }
          .abt_ttl {
            font-size: 32px;
            color: #df2928;
            font-weight: 500;
            margin: 25px 0;
          }
          .about_img {
            height: 230px; //412px;
            float: right;
            shape-outside: url(https://images.news18.com/ibnlive/uploads/advertise/about.png);
            margin: 44px 55px 0 35px;
            shape-margin: 30px;
          }

          /* ads section */
          .ads {
            position: relative;
          }
          .ads:before {
            content: "";
            background: #d9d9d9;
            height: 344px;
            position: absolute;
            left: 0;
            right: 0;
            top: 29%;
            z-index: 1;
          }
          .ads .container {
            padding: 30px 0;
            background-color: #fff;
          }
          .ads_sldr {
            position: relative;
            z-index: 1;
          }
          .ads_sldr .track {
            overflow: hidden;
          }
          .ads_sldr ul {
            display: flex;
            padding: 0;
            margin: 0;
          }
          .ads_sldr li {
            list-style: none;
            text-align: center;
          }
          .ads_sldr .arrow {
            background: transparent;
            border: none;
            cursor: pointer;
          }
          .ads_sldr .arrow.arrow--left {
            position: absolute;
            left: 15%; //20%;
            top: 48%;
            transform: rotate(180deg);
          }
          .ads_sldr .arrow.arrow--right {
            position: absolute;
            right: 15%; //20%;
            top: 48%;
          }

          /* who advertise */
          .who_advertise .container {
            padding: 50px 15px;
            background: white;
            display: flex;
          }
          .who_advertise .col {
            margin: 0 25px;
          }
          .wha_ttl {
            font-size: 32px;
            color: #df2928;
            font-weight: 500;
            margin-bottom: 20px;
          }
          .wha_copy {
            font-size: 17px;
            line-height: 26px;
            color: #727271;
            font-weight: 300;
            text-align: left;
          }
          .clr {
            background: #fceaea;
            padding: 30px;
            font-size: 20px;
            line-height: 26px;
            color: #e20613;
            font-weight: 500;
          }

          /* video */
          .video {
            position: relative;
          }
          .video:before {
            content: "";
            position: absolute;
            height: 420px;
            background: #d9d9d9;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1;
          }
          .video .container {
            background: white;
            position: relative;
            padding: 40px 0 60px 0;
            display: flex;
            justify-content: center;
          }
          .iframe_wrp {
            display: inline-block;
            position: relative;
            z-index: 1;
            margin: 0 auto;
          }

          /* metrics */
          .metrics {
            background: #e20613;
            padding: 30px 0 40px 0;
          }
          .mt_ttl {
            font-size: 49px;
            color: #ffffff;
            font-weight: bold;
            text-align: center;
            margin-bottom: 40px;
          }
          .mt_colwrp {
            display: flex;
            justify-content: center;
          }
          .mt_colwrp .col {
            width: 349px;
            margin: 0 35px;
            background: #f5f5f5;
            padding: 20px 15px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .mt_colwrp .icon_Wrp {
            width: 84px;
            height: 94px;
            background: url(https://images.news18.com/ibnlive/uploads/advertise/Polygon.png)
              no-repeat center;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          }
          .mt_txt {
            font-size: 45px;
            color: #df2928;
            font-weight: 500;
            text-align: center;
            margin-bottom: 11px;
          }
          .mt_txt span {
            font-size: 40px;
          }
          .gre_txt {
            font-size: 16px;
            color: #1d1d1b;
            font-weight: 500;
            text-align: center;
            text-transform: capitalize;
            height: 50px;
            background: #d9d9d9;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            // padding-top: 15px;
          }

          /* leadership */
          .leadership {
            background: #d9d9d9;
            padding: 50px 0 60px 0;
          }
          .lp_ttl {
            font-size: 49px;
            color: #df2928;
            font-weight: bold;
            text-align: center;
            margin-bottom: 60px;
          }
          .lp_colwrp {
            display: flex;
            justify-content: center;
          }
          .lp_colwrp .col {
            width: 372px;
            background: #f5f5f5;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 35px 30px 20px;
            margin: 0 18px;
          }
          .lp_colwrp .icon_Wrp {
            width: 76px;
            height: 87px;
            background: url(https://images.news18.com/ibnlive/uploads/advertise/Polygon.png)
              no-repeat center;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            background-size: 100%;
          }
          .lp_txt {
            font-size: 20px;
            color: #df2928;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            min-height: 40px;
          }
          .lp_copy {
            font-size: 17px;
            line-height: 26px;
            color: #727271;
            font-weight: 300;
            text-align:center;
          }
        `}
      </style>
    </>
  );
};

export default AdvertiseWithUsDesktop;
