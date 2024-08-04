import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import categoryHelper from "includes/category.helper";
import { imageLoader, setDefaultImage } from "includes/article.util";
import Head from "next/head";
import initialState from "GlobalStore";

const svLandingMobile = (props) => {
  const { publicRuntimeConfig } = getConfig();
  useEffect(() => {}, []);

  const outBrainUrl = publicRuntimeConfig.siteUrl + "videos/";
  const shortVideoCategoryArray = categoryHelper.shortVideoCategory();
  const { shortVideoMain, pageAds } = props.data;
  const [mainData, setCatData] = useState(shortVideoMain);
  const [startCount, setStartCount] = useState(10);
  const loadMore = async () => {
    const data = await {};

    if (!data?.length) {
      setStartCount(0);
    } else {
      setStartCount(startCount + 10);
      setCatData([...mainData, ...data]);
    }
    // }
  };
  const whatspUrl =
    "https://web.whatsapp.com/send?text=Short Video - https://hindi.news18.com/short-videos/";
  const fbUrl =
    "https://www.facebook.com/sharer.php?u=https://hindi.news18.com/short-videos/";

  return (
    <>
      <Head>
        <link
          href="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/video_pwa_css_1593578970.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="clearfix vsp10"></div>

      <div className="vdcnsmpnwrap">
        <div className="pwa_top_add pwa_add vdcnsmpnad">
          <div className="clearfix add">
            <div className="addinner-box">
              <SiteAd
                slotId={`mobile_atf_320`}
                adUnit={pageAds.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                width={336}
                height={280}
              />
            </div>
          </div>
        </div>
        <div className="vdcnsmpn-container">
          <div className="vdcnsmpn-brdcrmb">
            <a href="/">Home</a> / Short Videos
          </div>

          <div className="vdcnsmpn-middle">
            <div className="vdcnsmpn-left">
              <div className="top-news-title">
                <h1>शॉर्ट वीडियो</h1>
                <div className="social-icons">
                  <a href={fbUrl}>
                    <span className="facebk"></span>
                  </a>
                  <a href="https://twitter.com/news18india">
                    <span className="twit"></span>
                  </a>
                  <a href={whatspUrl}>
                    <span className="whatsp"></span>
                  </a>
                </div>
              </div>

              <div className="videobox">
                <ul className="cat-tab">
                  {shortVideoCategoryArray.map((cat, key) => {
                    return (
                      <li className={cat.name == "सभी" ? "active" : ""}>
                        <a href={`/short-videos${cat.slug}`}>
                          <span>{cat.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <ul className="tag-listing-new">
                  {mainData.map((sv, i) => {
                    return (
                      <>
                        {i == 2 ? (
                          <div className="pwa_top_add pwa_add vdcnsmpnad">
                            <div className="clearfix add">
                              <div className="addinner-box">
                                <SiteAd
                                  slotId={`mobile_atf_300`}
                                  adUnit={pageAds.ATF_300_id}
                                  lazyload={true}
                                  sizes={[
                                    [300, 250],
                                    [336, 280],
                                  ]}
                                  width={300}
                                  height={280}
                                />
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {i == 5 ? (
                          <div className="pwa_top_add pwa_add vdcnsmpnad">
                            <div className="clearfix add">
                              <div className="addinner-box">
                                <SiteAd
                                  slotId={`mobile_btf_300`}
                                  adUnit={pageAds.BTF_300_id}
                                  sizes={[
                                    [300, 250],
                                    [336, 280],
                                  ]}
                                  width={300}
                                  height={250}
                                  lazyload={true}
                                />
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <li>
                          <a href={sv.url}>
                            <figure>
                              <img
                                src={imageLoader(sv?.thumbnail, 220, 300, true)}
                                title={sv.title || ""}
                                onError={(event) => {
                                  setDefaultImage(event, 52, 52);
                                }}
                              ></img>
                            </figure>
                            <figurecaption>
                              <h2 className="story-title">
                                <span className="">
                                  NEWS18 HINDI
                                  {/* {singleD?.slug === "/" ? (
                                  ""
                                ) : (
                                  <span className="sit_cat">hello</span>
                                )} */}
                                  <span className="sit_cat"></span>
                                  {sv?.category?.length > 1
                                    ? initialState?.cats?.[sv?.category[1]] ||
                                      sv?.category[1]
                                    : initialState?.cats?.[sv?.category[0]] ||
                                      sv?.category[0]}
                                </span>

                                {sv.title || ""}
                              </h2>
                            </figurecaption>
                            <a className="video-play-button" href={sv.url}>
                              {" "}
                              <span></span>
                            </a>
                          </a>
                        </li>
                      </>
                    );
                  })}
                </ul>
                {startCount ? (
                  <div className="next_arrow_p">
                    <button onClick={loadMore} className="loadmore">
                      और लोड करें
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_1x1 !== "undefined" &&
      pageAds.PG_1x1 !== "" ? (
        <SiteAd
          slotId="PG_1x1"
          adUnit={pageAds.PG_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : (
        ""
      )}

      {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_Slider_1x1 !== "undefined" &&
      pageAds.PG_Slider_1x1 !== "" ? (
        <SiteAd
          slotId="PG_Slider_1x1"
          adUnit={pageAds.PG_Slider_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : (
        ""
      )}

      {typeof pageAds !== "undefined" &&
      typeof pageAds.SHOSH_OOP !== "undefined" &&
      pageAds.SHOSH_OOP !== "" ? (
        <SiteAd
          slotId="SHOSH_OOP"
          adUnit={pageAds.SHOSH_OOP}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : (
        ""
      )}

      <div className="pwa_top_add clearfix">
        <Outbrain widgetSrc={outBrainUrl} widgetId="MB_9" />
      </div>
      <style jsx global>{`
        body {
          margin: auto;
          font-family: "Mukta", sans-serif;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        ul,
        table,
        figure {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        a {
          text-decoration: none;
        }
        a img {
          border: none;
        }
        * {
          box-sizing: border-box;
        }
        .mblhdr {
          line-height: 0;
        }
        span#vigyapan {
          color: #f5f5f5;
        }
        .vdcnsmpnwrap {
          background: #212121;
          position: relative;
          z-index: 1;
        }
        .vdcnsmpn-container {
          background: #212121;
        }
        .vdcnsmpn-container * {
          box-sizing: border-box;
        }
        .vdcnsmpn-brdcrmb {
          width: 100%;
          border-bottom: 1px dotted #939393;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          font-weight: normal;
          font-size: 13px;
          color: #949494;
          overflow: scroll;
          padding: 5px 15px;
          background: #212121;
        }
        .vdcnsmpn-brdcrmb a {
          margin: 0px 6px;
          font-size: 13px;
          color: #949494;
          line-height: 24px;
        }
        .vdcnsmpn-brdcrmb a:first-child {
          margin-left: 0px;
        }
        .vdcnsmpn-brdcrmb h1,
        .vdcnsmpn-brdcrmb h2 {
          flex-shrink: 0;
          color: #fff;
          font-size: 13px;
          margin-left: 6px;
          line-height: 24px;
          font-weight: normal;
        }
        .vdcnsmpn-left {
          width: 100%;
          font-family: "Mukta";
        }
        .vdcnsmpnad {
          background: #2e2e2e;
          text-align: center;
          padding: 10px 0;
        }
        .vdcnsmpnad span {
          height: 20px;
          line-height: 20px;
          color: #dcdcdc;
          font-size: 12px;
          display: block;
          text-align: center;
        }
        .videobox {
          border-bottom: 1px solid #3e3e3e;
          position: relative;
        }
        .g__arrows,
        ul.tag-listing-new,
        ul.tag-listing-new li a figurecaption {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
        }
        .V-heading,
        .top-news-title {
          border-bottom: 1px dotted #939393;
        }
        ul.tag-listing-new {
          display: flex;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-flex-wrap: wrap;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          padding: 0px 20px 0;
        }
        ul.tag-listing-new li {
          font-size: 16px;
          width: 100%;
          line-height: 24px;
          font-weight: 700;
          padding: 0 0 15px;
          position: relative;
          margin-bottom: 20px;
          border: 2px solid #5f5f5f;
        }
        ul.tag-listing-new li a figure img {
          width: 100%;
          display: block;
          height: 573px;
          object-fit: cover;
        }
        ul.tag-listing-new li a figurecaption {
          position: absolute;
          bottom: 0;
          height: 100%;
          display: flex;
          -webkit-align-items: flex-end;
          -webkit-box-align: flex-end;
          -ms-flex-align: flex-end;
          align-items: flex-end;
          padding: 10px;
          width: 100%;
          background: transparent
            linear-gradient(180deg, #2e2e2e00 0%, #000000 100%) 0% 0% no-repeat
            padding-box;
        }
        ul.tag-listing-new li a figurecaption h2.story-title {
          color: #fff;
          font-size: 20px;
          line-height: 28px;
          font-weight: bold;
        }
        .tag-listing-new li a figurecaption .story-title span {
          display: inline-block;
          letter-spacing: 0;
          color: #c4c4c4;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 28px;
          width: 100%;
          font-weight: normal;
        }
        ul.tag-listing-new li a figurecaption h2.story-title .sit_cat {
          width: 4px;
          height: 4px;
          background: no-repeat padding-box #c4c4c4;
          vertical-align: middle;
          margin: 0 7px;
          border-radius: 50%;
        }
        .next_arrow_g {
          height: 15px;
          margin: 10px 0;
        }
        .next_arrow_p {
          height: 15px;
          margin: 20px 0 30px 0;
          text-align: center;
          padding-bottom: 35px;
        }

        img.video-ic {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          margin: auto;
        }
        .V-heading {
          font: bold 20px/25px Mukta;
          padding: 0 20px 5px;
          color: #f8be01;
        }
        .arrow-v {
          position: absolute;
          right: 20px;
          top: 16px;
        }
        .arrow-v a {
          vertical-align: middle;
          display: inline-block;
          max-height: 31px;
          max-width: 31px;
          cursor: pointer;
        }

        .top-news-title {
          width: 100%;
          margin: 10px 0 20px;
          position: relative;
          padding: 0 0 9px 14px;
        }
        .social-icons {
          position: absolute;
          top: 0;
          right: 3%;
        }
        .social-icons a {
          margin-right: 8px;
        }
        .social-icons a:last-child {
          margin-right: 0;
        }
        .top-news-title h1 {
          color: #fff;
          font-weight: bold;
          font-size: 22px;
          line-height: 32px;
          max-width: 340px;
          text-align: left;
          clear: both;
        }
        .social-icons a span {
          position: relative;
          height: 30px;
          width: 30px;
          background: url(/images/siteimages/sprite_img_1.svg)
            0 0 no-repeat;
          margin: auto;
          cursor: pointer;
          border: 1px solid #fff;
          display: inline-block;
        }
        .social-icons a .facebk {
          border-radius: 2px;
          background-position: -7px -7px !important;
        }
        .social-icons a .twit {
          border-radius: 2px;
          background-position: -5px -56px;
        }
        .social-icons a .whatsp {
          border-radius: 2px;
          background-position: -6px -157px;
        }
        .social-icons a span img {
          text-align: center;
          margin: auto;
          left: 0;
          bottom: 0;
        }
        .arrow,
        ul.cat-tab li {
          display: inline-block;
        }
        .arrow {
          position: absolute;
          width: 9px;
          height: 9px;
          background: 0 0;
          border-top: 1.5px solid #000;
          border-left: 1.5px solid #000;
          transition: 250ms ease-in-out;
          text-decoration: none;
          color: transparent;
          top: 0;
          bottom: 0;
          margin: auto;
          left: 0;
        }
        a.arrow.next {
          transform: rotate(135deg);
          right: 3px;
        }
        a.arrow.prev {
          transform: rotate(-45deg);
          left: 13px;
        }
        .arrow:before {
          display: block;
          height: 200%;
          width: 200%;
          margin-left: -50%;
          margin-top: -50%;
          content: "";
          transform: rotate(45deg);
        }
        ul.tag-listing-new li:last-child {
          margin-bottom: 10px;
        }
        ul.cat-tab {
          padding: 0 20px 20px;
          overflow: auto;
          white-space: nowrap;
        }
        ul.cat-tab li {
          margin-right: 5px;
          box-shadow: 0 3px 6px #00000029;
          border-radius: 14px;
          padding: 0 14px;
          background: no-repeat padding-box #505050;
        }
        ul.cat-tab li.active {
          background: no-repeat padding-box #e0261d;
          border: 1px solid #9d9d9d;
          color: #fff;
        }
        ul.cat-tab li span {
          text-align: center;
          font-size: 15px;
          line-height: 25px;
          color: #c6c6c6;
        }
        ul.cat-tab li.active > span {
          font-weight: bold;
          color: #fff;
        }
        .video-play-button {
          position: absolute;
          z-index: 10;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          box-sizing: content-box;
          display: block;
          width: 21px;
          height: auto;
          border-radius: 50%;
          padding: 18px 18px 18px 28px;
        }
        .video-play-button:before {
          content: "";
          position: absolute;
          z-index: 0;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          display: block;
          width: 50px;
          height: 50px;
          background: #e1261d;
          border-radius: 50%;
          animation: pulse-border 1500ms ease-out infinite;
          border: 2px solid #fff;
          -webkit-box-shadow: -2px 0px 9px 1px rgb(54 54 54 / 47%);
          -moz-box-shadow: -2px 0px 9px 1px rgb(54 54 54 / 47%);
          box-shadow: -2px 0px 9px 1px rgb(54 54 54 / 47%);
        }
        .video-play-button span {
          display: block;
          position: relative;
          z-index: 3;
          width: 0;
          height: 0;
          border-left: 20px solid #fff;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
        }
        .video-play-button:after {
          content: "";
          position: absolute;
          z-index: 1;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          display: block;
          width: 50px;
          height: 50px;
          background: #e1261d;
          border-radius: 50%;
          transition: all 200ms;
        }
        .loadmore {
          width: 130px;
          height: 38px;
          background: #ed1c24;
          border-radius: 19px;
          font-size: 17px;
          color: #ffffff;
          line-height: 38px;
          border: none;
          display: table;
          margin: auto;
          cursor: pointer;
        }
        #JsPlayer {
          display: flex;
          justify-content: center;
          background: #2e2e2e;
        }
      `}</style>
    </>
  );
};
export default React.memo(svLandingMobile);
