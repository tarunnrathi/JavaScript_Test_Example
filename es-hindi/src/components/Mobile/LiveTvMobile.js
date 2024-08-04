import Head from "next/head";
import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import HomeNewsGalleryNew from "./home/HomeNewsGalleryNew";
import HomeTopNews from "./LiveTv/TopNews";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import getConfig from "next/config";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import { logEvent } from "includes/googleAnalytic";
const { publicRuntimeConfig } = getConfig();

const LiveTvMobile = (props) => {
  const {
    // latestNewsStories = [],
    pageAds = {},
    breadCrumbArray = [],
    topNewsLiveTv = {},
    channelList = [],
    videogallerySsr = [],
    page_h1 = "",
    channelDetails = {},
    liveTvTimer = [],
    isMobile,
  } = props.topPriorityData || {};

  useEffect(() => {
    setTimeout(() => {
      // const _fileref1 = document.createElement("script");
      // _fileref1.setAttribute(
      //   "src",
      //   "https://static.vidgyor.com/player/v12/js/jsmethod.min.js",
      // );
      // // _fileref1.async = true;
      // if (typeof _fileref1 !== "undefined") {
      //   document.getElementsByTagName("head")[0].appendChild(_fileref1);
      // }

      // const _fileref = document.createElement("script");
      // _fileref.setAttribute(
      //   "src",
      //   "https://static.vidgyor.com/player/v12/js/vgr_util_src.min.js",
      // );
      // // _fileref.async = true;
      // if (typeof _fileref !== "undefined") {
      //   document.getElementsByTagName("head")[0].appendChild(_fileref);
      // }

      const _fileref2 = document.createElement("script");
      _fileref2.setAttribute(
        "src",
        "https://static.vidgyor.com/player/v12/js/player.min.js"
      );
      // _fileref.async = true;
      if (typeof _fileref2 !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(_fileref2);
      }

      _fileref2.onload = function () {
        const posterImage =
          "https://static.hindi.news18.com/ibnkhabar/uploads/2018/03/News18-INDIA_LOGO_WEB_NEW_2.png";
        window.vgrPlayerJSLoad = true;
        setTimeout(() => {
          VIDGYOR.initPlayer({
            playerDivId: "livePlayer",
            accountId: "62bd56e4517f060009f59961",
            videoId: channelDetails.vidgyor_id, //"news18hindi_ga",
            isAutoPlay: true,
            isMute: "",
            posterImageUrl: channelDetails.icon || posterImage,
            tapToUnmute: false,
            disableAds: "",
            gaTitle: "Live TV, " + channelDetails.name,
            pipconf: "r,20,5,180,320,180,320",
            pip: "1",
          });
        }, 1000);
      };
    }, 100);
  }, []);

  useEffect(() => {
    //   new Glide(".newlvtv-slider", { perView: 4, gap: 0 }).mount();
    liveTvTimer.length &&
      new Glide(".newlvtvshow-slider", { perView: 1, gap: 0 }).mount();
    // setActiveState("uttar-pradesh");
  }, []);
  return (
    <>
      <Head>
        <meta name="robots" content="max-image-preview:large" />
        {/* <script src=""></script> */}
      </Head>
      <div className="leftwrap">
        <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
        <div className="lv_tv_hdng_secton">
          <div className="lv_tv_lft_hdng">
            <span>Live TV</span>
            <h1>{page_h1}</h1>
          </div>
        </div>
        <div className="newlvtvwrap">
          <div className="newlvtv-slider">
            <ul>
              {Object.keys(channelList).map((itm, key) => (
                <li
                  key={"list" + key}
                  className={`${
                    channelList[itm].id === channelDetails.id ? "act" : ""
                  }`}
                >
                  <a href={channelList[itm].url} title={channelList[itm].name}>
                    {channelList[itm].title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {pageAds.BAND_TOP_340 ? (
            <div className="ad-container">
              <div
                className="hindi_mobile_livetv_pg_ad_top"
                id="Mobile_Static_Ad_Live_TV_ATF"
              >
                {/* <SiteAd
                  width={340}
                  height={40}
                  slotId="mobileAdNew300x250_4"
                  adUnit={pageAds.BAND_TOP_340}
                  sizes={[[320, 50]]}
                  lazyload={true}
                ></SiteAd> */}
                <NewSiteAd
                  slotId="mobileAdNew300x250_4"
                  adUnit={pageAds.BAND_TOP_340}
                  sizes={[[320, 50]]}
                  width={340}
                  height={40}
                  lazyLoad={true}
                />
              </div>
            </div>
          ) : null}
          <div className="newlvtvmiddlevideo">
            <figure>
              <div
                id="livePlayer"
                className="vgrPlayerContainer"
                style={{ height: "360px", width: "100%" }}
              >
                <div id="closeButtonContainer">
                  {/* <div id="closeButton"></div> */}
                </div>
              </div>
            </figure>
            <div className="newlvtvmiddlevideo-items">
              <div className="khbr_hdng">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                >
                  <path
                    id="live"
                    d="M20,20H2a2,2,0,0,1-2-2V6A2,2,0,0,1,2,4H9.59L6.29.71,7,0l4,4,4-4,.7.71L12.41,4H20a2,2,0,0,1,2,2V18A2,2,0,0,1,20,20ZM8,8v8l7-4Z"
                    fill="#fff"
                  ></path>
                </svg>
                <strong>LIVE Now</strong>
              </div>
            </div>
          </div>
          {liveTvTimer.length && (
            <div className="newlvtvshow-slider">
              <div data-glide-el="track">
                <ul>
                  {liveTvTimer.map((itm, index) =>
                    !itm.live_now_flag ? (
                      <li key={"li" + index}>
                        {itm.show_name}
                        <span>{itm.show_timing}</span>
                      </li>
                    ) : (
                      ""
                    )
                  )}
                </ul>
                <div
                  data-glide-el="controls"
                  className="contorls-forstatesection"
                >
                  <button type="button" data-glide-dir="<"></button>
                  <button type="button" data-glide-dir=">"></button>
                </div>
              </div>
            </div>
          )}
        </div>
        <ul className="artclbyeline-share">
          <li>
            <a
              className="arr_redirect"
              href="javascript:void(0)"
              onClick={async () => {
                const shareData = {
                  title: "",
                  text: "Live TV:  Programs Schedule Online, Watch Live TV Streaming",
                  url: "https://hindi.news18.com/livetv/",
                };
                try {
                  await navigator.share(shareData);
                } catch (err) {
                  //resultPara.textContent = `Error: ${err}`;
                }
                logEvent("ss_wapi", "tap", "liveTv_page");
              }}
            >
              <svg
                id=""
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="25"
                viewBox="0 0 32 32"
              >
                <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
              </svg>
            </a>
          </li>
        </ul>
        {pageAds.ATF_320 ? (
          <div className="ad-container">
            <div className="addinner-box">
              {/* <SiteAd
                width={336}
                height={280}
                slotId="mobileAdNew300x250_0"
                adUnit={pageAds.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
              ></SiteAd> */}
              <NewSiteAd
                slotId="mobileAdNew300x250_0"
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
        ) : null}
        <HomeNewsGalleryNew
          videogallerySsr={videogallerySsr ? videogallerySsr : []}
          heading="लेटेस्ट वीडियो"
          link={publicRuntimeConfig.siteUrl + "videos/"}
          key={`videosCat`}
        />
        {pageAds.ATF_300 ? (
          <div className="ad-container">
            <div className="addinner-box">
              {/* <SiteAd
                width={300}
                height={280}
                slotId="mobileAdNew300x250_1"
                adUnit={pageAds.ATF_300}
                lazyload={true}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
              ></SiteAd> */}
              <NewSiteAd
                slotId="mobileAdNew300x250_1"
                adUnit={pageAds.ATF_300}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                width={300}
                height={280}
                loadOnScroll={true}
              />
            </div>
          </div>
        ) : null}
        <HomeTopNews data={topNewsLiveTv} />
        {pageAds.BTF_300 ? (
          <div className="ad-container">
            <div className="addinner-box">
              {/* <SiteAd
                width={300}
                height={250}
                slotId="mobileAdNew300x250_2"
                adUnit={pageAds.BTF_300}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                lazyload={true}
              ></SiteAd> */}
              <NewSiteAd
                slotId="mobileAdNew300x250_2"
                adUnit={pageAds.BTF_300}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                width={300}
                height={250}
                loadOnScroll={true}
              />
            </div>
          </div>
        ) : null}
      </div>

      {typeof pageAds.PG_1x1_2 !== "undefined" && pageAds.PG_1x1_2 !== "" ? (
        // <SiteAd
        //   slotId="PG_1x1_2"
        //   adUnit={pageAds.PG_1x1_2}
        //   sizes={[[1, 1]]}
        //   removeAdSpan={true}
        //   loadonScroll={true}
        // />
        <NewSiteAd
          slotId="PG_1x1_2"
          adUnit={pageAds.PG_1x1_2}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          lazyLoad={false}
        />
      ) : null}

      {typeof pageAds.PG_1x1_3 !== "undefined" && pageAds.PG_1x1_3 !== "" ? (
        // <SiteAd
        //   slotId="PG_1x1_3"
        //   adUnit={pageAds.PG_1x1_3}
        //   sizes={[[1, 1]]}
        //   removeAdSpan={true}
        //   loadonScroll={true}
        // />
        <NewSiteAd
          slotId="PG_1x1_3"
          adUnit={pageAds.PG_1x1_3}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadOnScroll={true}
        />
      ) : null}

      {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_Slider_1x1 !== "undefined" &&
      pageAds.PG_Slider_1x1 !== "" ? (
        // <SiteAd
        //   slotId="PG_Slider_1x1"
        //   adUnit={pageAds.PG_Slider_1x1}
        //   sizes={[[1, 1]]}
        //   removeAdSpan={true}
        //   loadonScroll={true}
        // />
        <NewSiteAd
          slotId="PG_Slider_1x1"
          adUnit={pageAds.PG_Slider_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadOnScroll={true}
        />
      ) : (
        ""
      )}

      {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_1x1 !== "undefined" &&
      pageAds.PG_1x1 !== "" ? (
        // <SiteAd
        //   slotId="PG_1x1"
        //   adUnit={pageAds.PG_1x1}
        //   sizes={[[1, 1]]}
        //   removeAdSpan={true}
        //   loadonScroll={true}
        // />
        <NewSiteAd
          slotId="PG_1x1"
          adUnit={pageAds.PG_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadOnScroll={true}
        />
      ) : (
        ""
      )}
      <div className="clearfix"></div>
      <Taboola
        mode={TaboolaList.liveTvPage.bottom.mode}
        id={TaboolaList.liveTvPage.bottom.id}
        container={TaboolaList.liveTvPage.bottom.container}
        placement={TaboolaList.liveTvPage.bottom.placement}
      />
      <style jsx global>{`
        .liv_tv_secton {
          font-family: "Mukta", sans-serif !important;
        }
        .jstcntr {
          justify-content: center;
        }
        .phnlgblts {
          margin: 18px 0;
        }
        .phnlgblts button {
          margin: 0 5px;
          padding: 0;
          width: 6px;
          height: 6px;
          background: #ccc;
          border: none;
          outline: none;
          border-radius: 100%;
        }
        .phnlgblts button.glide__bullet--active {
          background: #e1261d;
          width: 18px;
          border-radius: 5px;
        }
        .globalhd {
          border-bottom: 1px solid #001536;
          position: relative;
          display: flex;
          width: 100%;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }
        .globalhd:before {
          content: "";
          width: 15px;
          height: 3px;
          background: #ed1c24;
          position: absolute;
          left: 0;
          bottom: -2px;
        }
        .ad-container {
          background: #dbdde3;
          padding: 16px 0;
          text-align: center;
        }
        .ad-container .addinner-box {
          background: #e8e9ed;
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: 250px;
          padding: 0;
          box-sizing: border-box;
        }
        .ad-container span#vigyapan {
          color: #797e90;
          font-size: 11px;
          text-align: center;
          padding: 2px 0 0;
          display: block;
          line-height: 16px;
        }
        .dflx {
          display: flex;
        }

        .contorls-forstatesection button {
          background: transparent;
          border: none;
          outline: none;
          position: absolute;
          top: 7px;
          left: 0;
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
        .contorls-forstatesection button:before {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(-45deg);
          top: 11px;
          left: 13px;
        }
        .contorls-forstatesection button:last-child {
          left: auto;
          right: 0;
          transform: rotate(180deg);
        }

        .lv_tv_hdng_secton {
          padding: 10px;
        }
        .artclbyeline-share {
          font-family: "Mukta", sans-serif;
          display: flex;
          align-items: center;
          list-style: none;
          justify-content: center;
          padding: 10px 0px;
        }
        .artclbyeline-share li {
          color: #6b6b6b;
          font-size: 14px;
          margin-left: 10px;
          text-transform: uppercase;
          line-height: 0;
          //background-color: #ccc;
        }
        .artclbyeline-share li:first-child {
          margin-left: 0;
        }
        .spriteshare {
          background: url(/images/siteimages/sprite_img_1.svg) 0 0 no-repeat;
          width: 32px;
          height: 32px;
          display: block;
        }
        .spriteshare.art-facebook-icon {
          background-position: -3px -3px;
        }
        .spriteshare.art-twitter-icon {
          background-position: -3px -53px;
        }
        .spriteshare.art-whatsapp-icon {
          background-position: -3px -154px;
        }

        .lv_tv_rght_hdng {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          top: -8px;
        }
        .lv_tv_lft_hdng span {
          text-transform: uppercase;
          font-size: 14px;
          line-height: 18px;
          font-weight: 700;
          color: #e1261d;
          padding-left: 18px;
          position: relative;
        }
        .lv_tv_lft_hdng h1 {
          text-transform: uppercase;
          font-size: 26px;
          line-height: 32px;
          font-weight: 700;
          color: #001d42;
        }
        .lv_tv_lft_hdng span:before {
          z-index: 2;
          -webkit-animation: blinker 2s infinite;
          animation: blinker 2s infinite;
        }
        .lv_tv_lft_hdng span:before,
        .lv_tv_lft_hdng span:after {
          content: "";
          position: absolute;
          opacity: 0;
          box-sizing: border-box;
          top: 5px;
          left: 0px;
          width: 12px;
          height: 12px;
          border: 2px solid #e21b22;
          box-shadow:
            0 0 10px #e21b22,
            inset 0 0 10px #e21b22;
          border-radius: 100px;
          background-clip: padding-box;
        }
        .lv_tv_lft_hdng span:after {
          z-index: 1;
          -webkit-animation: blinker 2s infinite 1s;
          animation: blinker 2s infinite 1s;
        }
        @-webkit-keyframes blinker {
          0% {
            -webkit-transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          to {
            -webkit-transform: scale(1);
            opacity: 0;
          }
        }
        @keyframes blinker {
          0% {
            -webkit-transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          to {
            -webkit-transform: scale(1);
            opacity: 0;
          }
        }

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
        .article_section {
          width: 100%;
          background: rgb(245, 245, 245);
          overflow: hidden;
        }
        .container {
          margin: auto;
          position: relative;
          background: rgb(255, 255, 255);
          overflow: hidden;
          padding: 0px 20px 10px;
          max-width: 1284px;
        }
        .artcl_container {
          display: flex;
          -webkit-box-pack: justify;
          justify-content: space-between;
          padding-top: 10px;
        }
        .artcl_container .artcl_lft {
          width: calc(100% - 320px);
        }
        .artcl_container .artcl_rght {
          width: 300px;
        }
        .scrollbar {
          white-space: nowrap;
          overflow-x: scroll;
          --scroll-color: #c6c6c6;
          --scroll--hover-color: #666;
          position: relative;
        }
        .scrollbar::-webkit-scrollbar {
          height: 5px;
        }
        .scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--scroll-color);
          border-radius: 4px;
        }
        .dflthdr {
          line-height: 0;
          text-align: center;
        }
        .newlvtvwrap {
          background: #000000;
        }
        .newlvtv-slider {
          width: 100%;
          overflow: hidden;
          padding: 15px 0;
          position: relative;
        }
        .newlvtv-slider ul {
          display: flex;
          margin: 0px 10px;
          overflow: scroll;
          padding-bottom: 5px;
          height: 35px;
        }
        .newlvtv-slider ul li {
          flex-shrink: 0;
          position: relative;
          width: auto !important;
        }
        .newlvtv-slider ul li a {
          display: block;
          color: #eaedf3;
          border: 1px solid #404040;
          border-radius: 4px;
          font-size: 14px;
          line-height: 24px;
          height: 24px;
          color: #fff;
          background: #2c2c2c;
          font-weight: bold;
          margin-right: 15px;
          padding: 0px 15px;
          opacity: 0.5;
        }
        .newlvtv-slider ul li.act a {
          color: #fff;
          opacity: 1;
          background: #ed2129;
          border-color: #ed2129;
        }
        .newlvtv-slider ul li.act:after {
          border-right: 5px solid #ed2129;
          border-top: 5px solid #ed2129;
          width: 9px;
          height: 9px;
          transform: rotate(135deg);
          top: 13px;
          left: 45%;
          content: "";
          position: absolute;
        }
        .topsliderarrow {
          position: absolute;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 18px;
        }
        .topsliderarrow:before {
          content: "";
          position: relative;
          width: 5px;
          height: 5px;
          border-left: 2px solid #ccc;
          border-bottom: 2px solid #ccc;
          transform: rotate(45deg);
        }
        .topsliderarrow.forleft {
          left: 5px;
        }
        .topsliderarrow.forlright {
          right: 5px;
          transform: rotate(180deg);
        }
        .newlvtvmiddlevideo {
          width: 100%;
          margin: 0px auto 20px auto;
          box-sizing: border-box;
          border: 1px solid #5c5c5c;
        }
        .newlvtvmiddlevideo figure {
          position: relative;
          height: 240px;
          width: 100%;
          overflow: hidden;
        }
        .newlvtvmiddlevideo figure iframe {
          width: 100%;
          height: 240px;
        }
        .newlvtvmiddlevideo-items {
          display: flex;
          align-items: center;
          width: 100%;
          height: 60px;
          background: #1d1d1d 0% 0% no-repeat padding-box;
          border-radius: 0px 0px 4px 4px;
        }
        .khbr_hdng {
          width: 83px;
          height: 60px;
          background-color: #e52100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .khbr_hdng strong {
          font-size: 12px;
          line-height: 20px;
          color: #ffffff;
          text-transform: uppercase;
          font-weight: 700;
          display: block;
        }
        .newlvtvshow-slider {
          width: 100%;
          overflow: hidden;
          padding: 2px 0;
          position: relative;
          border-top: 1px solid #ccc;
        }
        .newlvtvshow-slider ul {
          display: flex;
          margin: 0px 25px;
          overflow: hidden;
          padding: 5px 0;
        }
        .newlvtvshow-slider ul li {
          flex-shrink: 0;
          position: relative;
          width: 220px;
          border-left: 1px solid #ccc;
          line-height: 14px;
          font-size: 13px;
          color: #eee;
          text-transform: uppercase;
          padding: 0px 10px;
          font-weight: bold;
        }
        .newlvtvshow-slider ul li span {
          display: block;
          font-size: 11px;
          font-weight: normal;
          color: #ccc;
          padding-top: 3px;
        }
        .newlvtvshowarrow {
          position: absolute;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 12px;
        }
        .newlvtvshowarrow:before {
          content: "";
          position: relative;
          width: 5px;
          height: 5px;
          border-left: 2px solid #ccc;
          border-bottom: 2px solid #ccc;
          transform: rotate(45deg);
        }
        .newlvtvshowarrow.forleft {
          left: 5px;
        }
        .newlvtvshowarrow.forlright {
          right: 5px;
          transform: rotate(180deg);
        }
        .arr_redirect {
          background: #ffffff;
          border: 1px solid #c7c7c7;
          border-radius: 24px;
          color: #343a40;
          display: flex;
          float: left;
          line-height: 16px;
          margin: 0;
          position: relative;
          padding: 0;
          text-transform: capitalize;
          text-align: center;
          align-items: center;
          height: 35px;
          min-width: 35px;
          justify-content: center;
          flex-direction: row;
        }
      `}</style>
    </>
  );
};

export default LiveTvMobile;
