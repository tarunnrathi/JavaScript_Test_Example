import { useEffect } from "react";
import Glide from "@glidejs/glide";

const AdvertiseWithUsMobile = (props) => {
  const { advsData } = props.data || {};
  useEffect(() => {
    let element = document.querySelector(".ads_sldr");
    if (element) {
      new Glide(element, {
        type: "slider",
        autoplay: false,
        animationDuration: 1000,
        perView: 1,
        peek: {
          before: 64,
          after: 64,
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
        <section className="banner">
          <div className="container">
            <img
              src="https://images.news18.com/ibnlive/uploads/advertise/banner_m.png?impolicy=website&width=375&height=346"
              alt="banner img"
              className="banner_img"
              width="375px"
              height="346px"
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
                    Or Read on… to know why should you get in touch with us Now.
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
              <p style={{ marginBottom: "30px" }}>
                {advsData?.aboutnews18desc || ""}
              </p>
              <img
                src="https://images.news18.com/ibnlive/uploads/advertise/about_m.png?impolicy=website&width=327&height=171"
                alt="about us"
                className="about_img"
                width="327px"
                height="171px"
                loading="lazy"
              />
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
                        <img src={imgData?.src} alt="" />
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
                      src="https://images.news18.com/ibnlive/uploads/advertise/arrow_m.png?impolicy=website&width=24&height=24"
                      alt="prev"
                      width="24px"
                      height="24px"
                      loading="lazy"
                    />
                  </button>
                  <button
                    type="button"
                    className="arrow arrow--right"
                    data-glide-dir=">"
                  >
                    <img
                      src="https://images.news18.com/ibnlive/uploads/advertise/arrow_m.png?impolicy=website&width=24&height=24"
                      alt="next"
                      width="24px"
                      height="24px"
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
                <h2 className="wha_ttl">{advsData?.whyshouldadvertisetitle}</h2>
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
                <iframe
                  width="1188"
                  height="562"
                  src={advsData?.youtubevideolink}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
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
                  src="https://images.news18.com/ibnlive/uploads/advertise/uv_m.svg?impolicy=website&width=16&height=25"
                  alt="metrics1"
                  width="16px"
                  height="25px"
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
                  src="https://images.news18.com/ibnlive/uploads/advertise/pv_m.svg?impolicy=website&width=16&height=25"
                  alt="metrics2"
                  width="16px"
                  height="25px"
                  loading="lazy"
                />
              </div>
              <div className="mt_txt">
                1.2<span>Bn </span>+
              </div>
              <div className="gre_txt">monthly pageviews</div>
            </div>
            <div className="col">
              <div className="icon_Wrp">
                <img
                  src="https://images.news18.com/ibnlive/uploads/advertise/dau_m.svg?impolicy=website&width=16&height=25"
                  alt="metrics2"
                  width="16px"
                  height="25px"
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
                  src="https://images.news18.com/ibnlive/uploads/advertise/camera_m.svg?impolicy=website&width=44&height=42"
                  alt="camera_m"
                  width="44px"
                  height="42px"
                  loading="lazy"
                />
              </div>
              <div className="lp_txt">
                Unmatched in <br />
                Big Event Coverage
              </div>
              <div className="lp_copy">
                When it's about news, we cover it with a bang! Time and again
                our Election and Budget numbers have proven that India prefers
                to be with News18 as their credible news destination.
              </div>
            </div>
            <div className="col">
              <div className="icon_Wrp">
                <img
                  src="https://images.news18.com/ibnlive/uploads/advertise/magic_wand_m.svg?impolicy=website&width=44&height=42"
                  alt="magic_wand_m"
                  width="44px"
                  height="42px"
                  loading="lazy"
                />
              </div>
              <div className="lp_txt">
                Festivity <br />
                Dominance
              </div>
              <div className="lp_copy">
                The largest presence in languages gives News18 that unique edge
                over other sites on regional festivities. Live coverage,
                Editorial coverage and Engagement add more fervour to these
                festivals.
              </div>
            </div>
            <div className="col">
              <div className="icon_Wrp">
                <img
                  src="https://images.news18.com/ibnlive/uploads/advertise/fips_m.svg?impolicy=website&width=44&height=42"
                  alt="fips_m"
                  width="44px"
                  height="42px"
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
        <div id="adform">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSft44jcg1wNTlh0-mf9S3o01YkpMtRvOSo_qIzWXBtws5tPoQ/viewform?embedded=true" width="380" height="1400" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
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
          .container {
            max-width: 1300px;
            margin: 0 auto;
            position: relative;
          }

          /* banner section */
          .banner {
            border-bottom: #df2928 solid 4px;
          }
          .banner_img {
            width: 100%;
          }
          .banr_txt_wrp {
            background-color: #fceaea;
            position: absolute;
            bottom: -99px;
            left: 24px;
            right: 24px;
            padding: 15px 10px;
            z-index: 1;
          }
          .banr_ttl {
            font-size: 13px;
            line-height: 17px;
            color: #727271;
            font-weight: 500;
            margin-bottom: 5px;
          }
          .banr_copy {
            font-size: 12px;
            line-height: 22px;
            color: #e20613;
            font-weight: 500;
          }
          .banr_copy span {
            color: #727271;
            text-decoration: underline;
          }
          /* about section */
          .about .container {
            padding: 100px 24px 10px;
            background: white;
          }
          .about p {
            font-size: 14px;
            line-height: 19px;
            color: #727271;
            font-weight: 300;
            text-align: justify;
            max-width: 600px;
          }
          .abt_ttl {
            font-size: 18px;
            color: #df2928;
            font-weight: 500;
            margin: 25px 0 10px;
          }
          .about_img {
            width: 100%;
          }

          /* ads section */
          .ads {
            position: relative;
          }
          .ads:before {
            content: "";
            background: #d9d9d9;
            height: 120px;
            position: absolute;
            left: 0;
            right: 0;
            top: 32%;
            z-index: 1;
          }
          .ads .container {
            padding: 10px 0;
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
          .ads_sldr li img{max-width:198px;}
          .ads_sldr .arrow {
            background: transparent;
            border: none;
            cursor: pointer;
          }
          .ads_sldr .arrow.arrow--left {
            position: absolute;
            left: 11%;
            top: 48%;
            transform: rotate(180deg);
          }
          .ads_sldr .arrow.arrow--right {
            position: absolute;
            right: 11%;
            top: 48%;
          }

          /* who advertise */
          .who_advertise .container {
            padding: 20px 24px;
            background: white;
          }
          .wha_ttl {
            font-size: 18px;
            color: #df2928;
            font-weight: 500;
            margin-bottom: 10px;
          }
          .wha_copy {
            font-size: 14px;
            line-height: 19px;
            color: #727271;
            font-weight: 300;
            text-align: left;
            margin-bottom: 20px;
          }
          .clr {
            background: #fceaea;
            padding: 10px;
            font-size: 14px;
            line-height: 1.2;
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
            height: 138px;
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
            padding: 20px 24px 40px;
            display: flex;
            justify-content: center;
          }
          .iframe_wrp {
            position: relative;
            z-index: 1;
            padding-bottom: 57%;
            width: 100%;
          }
          .iframe_wrp iframe {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
          }

          /* metrics */
          .metrics {
            background: #e20613;
            padding: 30px 0 20px 0;
          }
          .mt_ttl {
            font-size: 18px;
            color: #ffffff;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
          }
          .mt_colwrp {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .mt_colwrp .col {
            width: 158px;
            height: 155px;
            margin: 0 0 25px 0;
            background: #f5f5f5;
            padding: 15px 5px 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .mt_colwrp .icon_Wrp {
            width: 38px;
            height: 43px;
            background: url(https://images.news18.com/ibnlive/uploads/advertise/Polygon.png)
              no-repeat center;
            background-size: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            flex-shrink: 0;
          }
          .mt_txt {
            font-size: 30px;
            color: #df2928;
            font-weight: 500;
            text-align: center;
            margin-bottom: 11px;
          }
          .mt_txt span {
            font-size: 27px;
          }
          .gre_txt {
            font-size: 12px;
            color: #1d1d1b;
            font-weight: 500;
            text-align: center;
            text-transform: capitalize;
            height: 30px;
            background: #d9d9d9;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            // padding-top: 10px;
          }

          /* leadership */
          .leadership {
            background: #d9d9d9;
            padding: 20px 24px 30px;
          }
          .lp_ttl {
            font-size: 18px;
            color: #df2928;
            font-weight: bold;
            text-align: center;
            margin-bottom: 30px;
          }
          .lp_colwrp {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .lp_colwrp .col {
            width: 280px;
            background: #f5f5f5;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 24px 18px 20px;
            margin-bottom: 24px;
          }
          .lp_colwrp .icon_Wrp {
            width: 66px;
            height: 76px;
            background: url(https://images.news18.com/ibnlive/uploads/advertise/Polygon_m.png)
              no-repeat center;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            background-size: 100%;
            flex-shrink: 0;
          }
          .lp_txt {
            font-size: 18px;
            color: #df2928;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
            min-height: 40px;
          }
          .lp_copy {
            font-size: 12px;
            line-height: 16px;
            color: #727271;
            font-weight: 300;
          }
        `}
      </style>
    </>
  );
};

export default AdvertiseWithUsMobile;
