import Head from "next/head";
import React, { useEffect } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import HomeVideogalleryNews from "./home/VideogalleryNews";
import Glide from "@glidejs/glide";
import HomeTopNews from "./LiveTv/TopNews";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const LiveTvDesktop = (props) => {
  const {
    latestNewsStories = [],
    breadCrumbArray = [],
    topNewsLiveTv = {},
    channelList = [],
    videogallerySsr = [],
    page_h1 = "",
    channelDetails = {},
    liveTvTimer = [],
    photoStories = [],
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
    new Glide(".newlvtv-slider", { perView: 4, gap: 0 }).mount();
    liveTvTimer.length &&
      new Glide(".newlvtvshow-slider", { perView: 4, gap: 0 }).mount();
    // setActiveState("uttar-pradesh");
  }, []);
  return (
    <>
      <Head>
        <meta name="robots" content="max-image-preview:large" />
        {/* <script src=""></script> */}
      </Head>
      <div className="container clearfix">
        <div className="leftwrap">
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />

          <div className="clearfix"></div>
          <div className="middlead cat-vigyapan">
            {/* <SiteAd
              slotId="Desktop_Static_Ad_Live_TV_ATF"
              adUnit={props.pageAds?.TOP_BAND_940}
              sizes={[[920, 100]]}
              removeAdSpan={false}
              lazyload={true}
            /> */}
            <NewSiteAd
              slotId="Desktop_Static_Ad_Live_TV_ATF"
              adUnit={props.pageAds?.TOP_BAND_940}
              sizes={[[920, 100]]}
              removeAdSpan={true}
              lazyLoad={true}
            />
          </div>
          <div className="lv_tv_hdng_secton">
            <div className="lv_tv_lft_hdng">
              <span>Live TV</span>
              <h1>{page_h1 || "NEWS18 इंडिया LIVE TV "}</h1>
            </div>
            <div className="lv_tv_rght_hdng">
              <ul className="artclbyeline-share">
                <li>
                  <a
                    href="https://www.facebook.com/sharer.php?u=https://hindi.news18.com/livetv/&amp;t= Live TV:  Programs Schedule Online, Watch Live TV Streaming"
                    target="_blank"
                  >
                    <span className="spriteshare art-facebook-icon"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/share?text= Live TV:  Programs Schedule Online, Watch Live TV Streaming&amp;url=https://hindi.news18.com/livetv/"
                    target="_blank"
                  >
                    <span className="spriteshare art-twitter-icon"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://web.whatsapp.com/send?text=https://hindi.news18.com/livetv/"
                    target="_blank"
                  >
                    <span className="spriteshare art-whatsapp-icon"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="newlvtvwrap">
            <div className="newlvtv-slider">
              <div data-glide-el="track">
                <ul>
                  {Object.keys(channelList).map((itm, key) => (
                    <li
                      key={"li" + key}
                      className={`${
                        channelList[itm].id === channelDetails.id ? "act" : ""
                      }`}
                    >
                      <a
                        href={channelList[itm].url}
                        title={channelList[itm].name}
                      >
                        {channelList[itm].title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                data-glide-el="controls"
                className="contorls-forstatesection"
              >
                <button type="button" data-glide-dir="<"></button>
                <button type="button" data-glide-dir=">"></button>
              </div>
            </div>
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
            {liveTvTimer.length ? (
              <div className="newlvtvshow-slider">
                <div data-glide-el="track">
                  <ul>
                    {liveTvTimer.map((itm, index) =>
                      index > 0 ? (
                        <li key={"list" + index}>
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
            ) : (
              ""
            )}
          </div>
          <div className="clearfix"></div>
          <div className="middlead cat-vigyapan">
            {/* <SiteAd
              slotId="Desktop_Static_Ad_Live_TV_BTF"
              adUnit={props.pageAds?.BTM_BAND_940}
              sizes={[
                [920, 100],
                [1, 1],
              ]}
              lazyload={true}
              // width={920}
              // height={100}
              removeAdSpan={false}
            /> */}
            <NewSiteAd
              slotId="Desktop_Static_Ad_Live_TV_BTF"
              adUnit={props.pageAds?.BTM_BAND_940}
              sizes={[
                [920, 100],
                [1, 1],
              ]}
              lazyLoad={true}
            />
          </div>
          <HomeVideogalleryNews
            heading="लेटेस्ट वीडियो"
            videogallerySsr={videogallerySsr ? videogallerySsr : []}
          />
          <HomeTopNews topNews={topNewsLiveTv} />
          {/* <SiteAd
            slotId="Shosh_OOP_id"
            renderOutOfThePage={true}
            adUnit={props.pageAds?.Shosh_OOP_id}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          /> */}
          <NewSiteAd
            slotId="Shosh_OOP_id"
            adUnit={props.pageAds?.Shosh_OOP_id}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadOnScroll={true}
          />
          {/* <div id="content_video_ima-ad-container"></div> */}
          <div className="clearfix"></div>
          <Taboola
            mode={TaboolaList.liveTvPage.bottom.mode}
            id={TaboolaList.liveTvPage.bottom.id}
            container={TaboolaList.liveTvPage.bottom.container}
            placement={TaboolaList.liveTvPage.bottom.placement}
          />
        </div>

        <div className="rightwrap">
          <RhsCommon
            pageAds={props.pageAds}
            latestNewsStories={latestNewsStories}
            page="livetv"
            taboolaList={TaboolaList.liveTvPage}
            photoStories={photoStories}
          />
        </div>
      </div>
      <style jsx global>{`
        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
          display: block;
        }
        body {
          line-height: 1;
          font-family: "Noto Sans", arial, sans-serif;
        }
        .container {
          max-width: 1244px;
          margin: auto;
          padding: 0 10px;
        }

        .leftwrap {
          width: calc(100% - 325px);
          float: left;
          position: relative;
          font-family: "Mukta";
        }
        .rightwrap {
          position: sticky;
          top: 55px;
        }
        .rightwrap {
          width: 300px;
          float: right;
        }
        .contorls-forstatesection button {
          background: #000;
          border: none;
          outline: none;
          position: absolute;
          top: 11px;
          left: 0;
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
        .cat-vigyapan #vigyapan {
          background: #eee;
          display: flex;
          width: 100%;
          justify-content: center;
          font-size: 13px;
          padding: 2px 0;
        }
        .middlead {
          display: flex;
          justify-content: center;
          margin: 15px;
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
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .artclbyeline-share {
          font-family: "Mukta", sans-serif;
          display: flex;
          align-items: center;
          list-style: none;
          width: calc(100% - 246px);
        }
        .artclbyeline-share li {
          color: #6b6b6b;
          font-size: 14px;
          margin-left: 10px;
          text-transform: uppercase;
          line-height: 0;
          background-color: #ccc;
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
          margin: 5px 0px;
        }
        .lv_tv_lft_hdng h1 {
          text-transform: uppercase;
          font-size: 32px;
          line-height: 44px;
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
          // overflow: hidden;
          // padding: 0px 20px 10px;
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
          margin: 0px 25px;
          overflow: hidden;
          padding-bottom: 5px;
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
          width: 632px;
          height: 422px;
          margin: 0px auto 20px auto;
          box-sizing: border-box;
          border: 1px solid #5c5c5c;
        }
        .newlvtvmiddlevideo figure {
          position: relative;
          height: 360px;
          width: 100%;
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
          margin: 0px 32px;
          overflow: hidden;
          padding: 0px 0;
        }
        .newlvtvshow-slider ul li {
          flex-shrink: 0;
          position: relative;
          width: 220px;
          border-left: 1px solid #ccc;
          line-height: 11px;
          font-size: 13px;
          color: #eee;
          text-transform: uppercase;
          padding: 9px 0px 0px 11px;
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
        .newvdwdgt-story ul li:nth-child(4) {
          width: 402px !important;
        }
        .newvdwdgt-story ul li:nth-child(1) {
          width: 402px !important;
        }
      `}</style>
    </>
  );
};

export default LiveTvDesktop;
