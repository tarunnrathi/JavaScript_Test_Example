import React, { useEffect, useState } from "react";
import { newVidgyorScript } from "includes/article.util";
import { Swiper, SwiperSlide } from "swiper/react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
// import Swiper core and required modules
import SwiperCore, { Pagination, Mousewheel } from "swiper";
import { getRelativeURL } from "util/global/Helper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { logEvent } from "includes/googleAnalytic";

SwiperCore.use([Pagination, Mousewheel]);

const SvConsumptionMobile = ({ data }) => {
  const {
    articleData = [],
    allData = [],
    category = {},
    vid_exist,
    vidStreamData,
  } = data;
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      newVidgyorScript(vidStreamData, vid_exist);
    }, 10);

    !(function () {
      const e = setInterval(function () {
        try {
          if (window.pubstackJSLoaded) {
            clearInterval(e);
            window.refreshPubstackPlayers();
          }
        } catch (error) {
          console.error(error);
        }
      }, 0);
    })();
  }, []);

  const toggleIcon = () => {
    setShowIcon(!showIcon);
  };

  const { weburl = "" } = articleData;

  const shareUrl = getRelativeURL(false, weburl);
  const fbUrl = `https://www.facebook.com/sharer.php?u=${shareUrl}`;
  const whatspUrl = `https://wa.me/?text='Short Video - ${shareUrl}`;

  const cat =
    category?.slug === "short-videos"
      ? ""
      : (category?.slug || "") + "/";
  const click = (url, videoData) => {
    setTimeout(() => {
      window.refreshPubstackPlayers(videoData?.vidStreamData);
    }, 100);
    const newURL = url.replace("https://hindi.news18.com/short-videos/", "");
    history.pushState({}, "", newURL);
  };

  return (
    <div id="JsPlayer" className="vdcnsmpnwrap" style={{ height: "100%" }}>
      <Swiper
        direction={"vertical"}
        spaceBetween={10}
        slidesPerView={1}
        mousewheel={true}
        onSlideChange={(event) => {
          const videoData = allData[event.activeIndex];
          logEvent("infi_scroll_vv", "play", videoData.weburl);
        }}
      >
        {allData.map((video, index) => {
          const {
            display_headline,
            story_id,
            categories,
            auto_youtube_import,
            video_details,
          } = video;
          const videoId =
            auto_youtube_import?.nw_auto_yt_feed_id || video_details?.video_id;
          return (
            <SwiperSlide key={story_id}>
              {({ isActive }) => {
                isActive ? click(video.weburl, video) : "";
                return (
                  <div id={story_id} className="mainCanvas videobox">
                    {isActive && (
                      <div
                        id={`vidgyorPlayer1${story_id}`}
                        data-pubstack-player="true"
                        data-pubstack-config="video-embed"
                        style={{
                          width: "100%",
                          position: "static",
                        }}
                        data-pubstack-guid={
                          videoId?.length > 24
                            ? videoId.slice(2, videoId?.length)
                            : videoId
                        }
                        data-property-category={"category" || categories}
                        data-property-platform={"mobile"}
                        data-embed-mode="manual"
                        data-city-name={"state"}
                        data-district-name={"state"}
                        data-state-name={"state"}
                        data-section-name={"state"}
                        data-article-id={"state"}
                        data-language="hi"
                        data-video-type={"non-local18"}
                        data-video-event="Vertical_Video"
                        data-content-type="shorts"

                        data-article-date={articleData?.created_at}
                        data-publish-time={articleData?.created_at}
                        data-article-type={articleData?.post_type}
                        data-tag={articleData?.tags?.length > 0 ? articleData?.tags?.map(x => x.slug).join(',') : ""}
                        data-taboola={"No"}
                        data-video-identifier={"Videos"}
                        data-author-type={articleData?.publish_by?.length > 0 ? articleData?.publish_by[0]?.english_name : ""}
                        data-desk-video={articleData?.video_details?.type === "desk" ? 1 : 0}
                        data-page-url={articleData?.weburl}
                        data-domain-name="https://hindi.news18.com/"
                        data-amp-filter={"non-amp-hin"}
                        data-video-title={articleData?.headline}
                        data-is-ad-disable="true"
                      />
                    )}
                    {!isActive && <div id={`vidgyorPlayer${story_id}`} />}
                    <figurecaption>
                      {index === 0 ? <h1 className="story-title">
                        <span>
                          NEWS18 HINDI <span className="sit_cat"></span>
                          {categories?.name}
                        </span>
                        {display_headline?.length > 60
                          ? display_headline.slice(0, 50) + "..."
                          : display_headline}
                      </h1> : <h2 className="story-title">
                        <span>
                          NEWS18 HINDI <span className="sit_cat"></span>
                          {categories?.name}
                        </span>
                        {display_headline?.length > 60
                          ? display_headline.slice(0, 50) + "..."
                          : display_headline}
                      </h2>}
                    </figurecaption>
                    <div className="social-share">
                      <a
                        className="arr_redirect"
                        href="javascript:void(0)"
                        onClick={async () => {
                          const shareData = {
                            title: "",
                            text: display_headline,
                            url: shareUrl,
                          };
                          try {
                            await navigator.share(shareData);
                          } catch (err) {
                            //resultPara.textContent = `Error: ${err}`;
                          }
                          logEvent("ss_wapi", "tap", "short-videos_page");
                        }}
                      >
                        <svg
                          id=""
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="28"
                          viewBox="0 0 32 32"
                          fill="#fff"
                        >
                          <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
                        </svg>
                      </a>
                      <>
                        {/* <span
                      onClick={() => {
                        setShowIcon(!showIcon);
                      }}
                      className="share"
                    ></span> */}
                      </>
                      <a href="/" target="_blank">
                        <span className="home"></span>
                      </a>
                    </div>
                    <a
                      className="back-ic"
                      href={publicRuntimeConfig.siteUrl + `short-videos/${cat}`}
                    ><span className="backarrow"></span></a>
                  </div>
                );
              }}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx global>
        {`
          html,
          body,
          body > div {
            margin: 0px;
            height: 100%;
            overflow: hidden;
          }
          .swiper {
            width: 100%;
            height: 100%;
          }
          .swiper-slide {
            height: 100% !important;
          }
          .swiper-slide img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .vdcnsmpnwrap {
            background: #1d1d1d;
            height: 100%;
          }
          .vdcnsmpn-container {
            background: #212121;
            padding: 10px 20px;
            max-width: 1284px;
            margin: auto;
            top: 0;
            bottom: 0;
            position: absolute;
            right: 0;
            left: 0;
          }
          .vdcnsmpn-container * {
            box-sizing: border-box;
          }
          .vdcnsmpn-brdcrmb {
            width: 100%;
            border-bottom: 1px dotted #5a5a5a;
            display: flex;
            align-items: center;
            text-transform: uppercase;
            font-weight: normal;
            margin-bottom: 10px;
            font-size: 13px;
            color: #949494;
            padding-bottom: 5px;
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
            color: #fff;
            font-size: 13px;
            margin-left: 6px;
            line-height: 24px;
            font-weight: normal;
          }
          .vdcnsmpn-middle {
            display: flex;
            justify-content: space-around;
            align-items: center;
            align-content: center;
            // height: 100%;
            font-family: "Mukta";
          }
          .vdcnsmpn-left {
            width: calc(100% - 320px);
          }
          .vdcnsmpn-right {
            width: 300px;
            flex-shrink: 0;
          }
          .vdcnsmpnad {
            margin-bottom: 30px;
          }
          .vdcnsmpnad span {
            background: #2e2e2e;
            height: 20px;
            line-height: 20px;
            color: #dcdcdc;
            font-size: 12px;
            display: block;
            text-align: center;
          }
          .rgtglobahd {
            font-size: 22px;
            color: #f8be01;
            line-height: 20px;
            border-bottom: 1px solid #4a4a4a;
            padding-bottom: 5px;
          }
          .rgtglobahd a {
            color: #f8be01;
          }
          .photostorylist {
          }
          .photostorylist li {
            border-bottom: 1px dashed #363636;
            padding: 10px 0;
          }
          .photostorylist li a {
            display: flex;
          }
          .photostorylist li a figure {
            width: 120px;
            flex-shrink: 0;
            margin-right: 10px;
            border: 1px solid #9b9b9b;
            line-height: 0;
            position: relative;
          }
          .photostorylist li a figure img {
            width: 100%;
          }
          .photostorylist li a figcaption {
            color: #fff;
            font-size: 13px;
            line-height: 24px;
          }
          .morestorybtn {
            background: #2e2e2e;
            height: 25px;
            line-height: 25px;
            color: #dcdcdc;
            font-size: 14px;
            display: block;
            text-align: center;
            color: #f8be01;
            font-weight: bold;
            margin-bottom: 30px;
          }
          .rgttopvideo {
            margin-bottom: 30px;
          }
          .videobox {
            background: #2e2e2e;
            border-top: 1px solid #3e3e3e;
            border-bottom: 1px solid #3e3e3e;
            position: relative;
          }
          #JsPlayer figurecaption {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
          }
          .V-heading,
          .top-news-title {
            border-bottom: 1px solid #4a4a4a;
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
          }
          #JsPlayer {
            font-size: 16px;
            width: 100%;
            line-height: 24px;
            font-weight: 700;
            position: relative;
          }
          #JsPlayer figure img {
            display: block;
            height: 100%;
            object-fit: cover;
            width: 100%;
          }
          #JsPlayer figurecaption {
             position: absolute;
            bottom: 64px;
            display: flex;
            align-items: flex-end;
            padding: 30px 15px 27px 15px;
            width: 100%;
            box-sizing: border-box;
            // border-radius: 100%;
            margin-bottom: 0px;
          }
          // #JsPlayer figurecaption h2.story-title {
          //   color: #fff;
          //   max-width: 80%;
          //   font-size: 22px;
          //   font-weight: bold;
          //   line-height: 28px;
          // }
          // #JsPlayer figurecaption h2.story-title span {
          //   display: inline-block;
          //   font-size: 12px;
          //   line-height: 28px;
          //   font-weight: normal;
          //   letter-spacing: 0;
          //   color: #fff;
          //   text-transform: uppercase;
          //   width: 100%;
          //   font-weight: normal;
          // }
          // #JsPlayer figurecaption h2.story-title .sit_cat {
          //   width: 4px;
          //   height: 4px;
          //   background: no-repeat padding-box #c4c4c4;
          //   vertical-align: middle;
          //   margin: 0 7px;
          //   border-radius: 50%;
          // }
          #JsPlayer figurecaption h1.story-title, #JsPlayer figurecaption h2.story-title {
            color: #fff;
            font-weight: normal;
            font-size: 15px;
            line-height: 25px;
            max-width: 80%;
            text-shadow: 0px 3px 6px #000000ed;
            font-family: "Mukta", sans-serif;
          }
          #JsPlayer figurecaption h1.story-title span, #JsPlayer figurecaption h2.story-title span {
            display: inline-block;
            font-size: 12px;
            line-height: 28px;
            font-weight: normal;
            letter-spacing: 0;
            color: #fff;
            text-transform: uppercase;
            width: 100%;
            font-weight: normal;
          }
          #JsPlayer figurecaption h1.story-title .sit_cat, #JsPlayer figurecaption h2.story-title .sit_cat {
            width: 4px;
            height: 4px;
            background: no-repeat padding-box #c4c4c4;
            vertical-align: middle;
            margin: 0 7px;
            border-radius: 50%;
          }
          .next_arrow_p {
            height: 15px;
            margin: 20px 0 30px 0;
          }
          .p__arrows {
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            width: auto;
            margin: auto;
            height: 15px;
          }
          .p__arrows .p__bullets {
            padding: 0 20px;
          }
          .p__arrows .p__bullets button.p__bullet {
            background: no-repeat padding-box #c7c7c7;
            border-radius: 50%;
            border: 0;
            margin: 0 5px;
            vertical-align: middle;
            padding: 0 3px;
            width: 33px;
            height: 33px;
            position: relative;
            text-align: center;
            font: normal normal normal 17px/24px Mukta;
            letter-spacing: 0px;
            color: #000000;
            cursor: pointer;
          }
          .p__arrows .p__bullets button.p__bullet.p__bullet--active {
            width: 33px;
            height: 33px;
            background: #ed1c24 0% 0% no-repeat padding-box;
            border-radius: 50%;
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
          .readmorebtn,
          .readmorebtn span {
            display: block;
            position: relative;
          }
          .readmorebtn {
            text-align: center;
            margin-top: -29px;
            padding-top: 20px;
          }
          .readmorebtn span {
            background: #e0261d;
            color: #fff;
            border-radius: 20px;
            height: 26px;
            width: 179px;
            margin: auto;
            border: 2px solid #3e3e3e;
            top: 12px;
            font: bold 14px/25px Mukta;
          }
          .social-icons a .facebk,
          .social-icons a .twit {
            border: 1px solid #fff;
            width: 30px;
            height: 30px;
            display: inline-block;
          }
          .top-news-title {
            width: 100%;
            padding-bottom: 15px;
            margin: 10px 0 15px;
            position: relative;
          }
          .social-icons,
          .social-icons a span img {
            position: absolute;
            top: 0;
            right: 0;
          }
          .top-news-title h1 {
            color: #fff;
            font: bold 26px/32px Mukta;
            max-width: 340px;
            text-align: left;
            clear: both;
          }
          .social-icons a span {
            position: relative;
          }
          .social-icons a .facebk {
            background: no-repeat padding-box #4272b8;
            border-radius: 2px;
          }
          .social-icons a .twit {
            border-radius: 2px;
            background: no-repeat padding-box #429cd6;
          }
          .social-icons a .whatsp {
            width: 30px;
            height: 30px;
            border: 1px solid #fff;
            border-radius: 2px;
            display: inline-block;
            background: no-repeat padding-box #52ba63;
          }
          .social-icons a span img {
            text-align: center;
            margin: auto;
            left: 0;
            bottom: 0;
          }
          .arrow {
            display: inline-block;
            position: absolute;
            width: 9px;
            height: 9px;
            background: transparent;
            border-top: 1.5px solid #000000;
            border-left: 1.5px solid #000000;
            transition: all 250ms ease-in-out;
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
          .arrow:before {
            display: block;
            height: 200%;
            width: 200%;
            margin-left: -50%;
            margin-top: -50%;
            content: "";
            transform: rotate(45deg);
          }
          .social-share {
            position: absolute;
            right: 3%;
            bottom: 65px;
          }
          .social-share a {
            display: flex;
            margin-bottom: 10px;
            justify-content: space-around;
          }
          .social-share a span {
            background-color: rgb(000 000 000 / 30%);
            border-radius: 50%;
            height: 34px;
            width: 34px;
            position: relative;
            display: block;
          }
          .social-share a span img {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
          }
          .social-share .share {
            background: url(/images/shortVideos/svshare.svg) no-repeat;
            width: 42px;
            height: 48px;
            margin-bottom: 7px;
            cursor: pointer;
          }
          .social-share a .whatsp {
            background: url(/images/shortVideos/vd_sprite.svg) no-repeat;
            background-position: -564px 2px;
            -webkit-transform: scale(1.2);
            -moz-transform: scale(1.2);
            -ms-transform: scale(1.2);
            -o-transform: scale(1.2);
            background-color: rgb(0 0 0/30%);
            width: 28px;
            height: 30px;
            margin-left: 3px;
          }
          .social-share a .facebk {
            background: url(/images/shortVideos/vd_sprite.svg) no-repeat;
            background-position: -533px 2px;
            transform: scale(1.3);
            background-color: rgb(0 0 0/30%);
            width: 26px;
            height: 26px;
            margin-left: 5px;
            margin-bottom: 18px;
          }
          .social-share a .home {
            background: url(/images/shortVideos/svhome.svg) no-repeat;
            margin: 0;
            border-radius: unset;
            width: 48px;
            height: 48px;
            margin-bottom: 7px;
            // background-size: cover;
            transform: scale(1.2);
          }
          a.back-ic {
            width: 48px;
            position: absolute;
            top: 10px;
            left: 10px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          // a.back-ic:before {
          //   content: "";
          //   width: 8px;
          //   height: 8px;
          //   border-left: 1px solid #fff;
          //   border-bottom: 1px solid #fff;
          //   display: block;
          //   margin: auto;
          //   transform: rotate(45deg);
          // }
          #JsPlayer {
            display: flex;
            justify-content: center;
            background: #2e2e2e;
            // height: 100vh !important;
          }
          #JsPlayer .mainCanvas > div > div {
            height: 100% !important;
          }
          .mainCanvas {
            height: 100% !important;
            display: flex;
            max-width: 100%;
            position: relative;
          }
          .DynamicBottomBar {
            position: absolute;
            right: 3%;
            bottom: 0;
            height: 30px;
          }
          .DynamicBottomBar .Col {
            font-size: 10px;
            padding: 7px 0px 1px;
            width: 20%;
          }
          .DynamicBottomBar .Col a {
            color: #0a2140;
            padding: 0;
            display: block;
          }
          .DynamicBottomBar .Col a .Icon {
            width: 28px;
            height: 22px;
            margin: 0 auto;
            background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/bottom_bar_sprite.svg)
              no-repeat;
          }
          .DynamicBottomBar .Col.show {
            background: #f2f2f2;
          }
          .DynamicBottomBar .NextStory {
            display: flex;
            align-items: center;
            box-shadow: -3px 0 10px #00000029;
            width: 20%;
            justify-content: center;
          }
          .DynamicBottomBar .NextStory a {
            display: flex;
            align-items: center;
          }
          .DynamicBottomBar .NextStory .Text {
            font-family: "Recursive";
            text-align: right;
            font-size: 11px;
            font-weight: bold;
            color: #e2261c;
            text-transform: uppercase;
            line-height: 12px;
            margin-right: 5px;
            order: 1;
            width: 33px;
          }
          .DynamicBottomBar .NextStory .Icon {
            width: 8.5px;
            height: 8.5px;
            position: relative;
            order: 2;
          }
          .DynamicBottomBar .NextStory .Icon::before {
            content: "";
            position: absolute;
            width: 4px;
            height: 4px;
            border-top: 1px solid #2c2c2c;
            border-left: 1px solid #2c2c2c;
            transform: rotate(132deg);
            top: 3px;
            left: 2px;
          }
          .DynamicBottomBar .NextStory .Icon::after {
            content: "";
            position: absolute;
            width: 4px;
            height: 1px;
            background: #2c2c2c;
            top: 5px;
            left: 2px;
          }
          a.tw {
            width: 34px;
            height: 34px;
            background: url(/images/shortVideos/vd_sprite.svg) no-repeat;
            border-radius: 50%;
            background-position: -593px 6px;
            background-color: rgb(000 000 000 / 30%);
          }
          a.telegram {
            width: 34px;
            height: 34px;
            background: url(/images/shortVideos/vd_sprite.svg) no-repeat;
            border-radius: 50%;
            background-position: -625px 6px;
            background-color: rgb(000 000 000 / 30%);
          }
          .DynamicBottomBar .Col a .Text {
            white-space: nowrap;
            text-align: center;
            padding-top: 3px;
          }
          .DynamicBottomBar .share {
            position: absolute;
            bottom: 3%;
            right: 3%;
          }
          .DynamicBottomBar .Col a Icon.explainers {
            background-position: -135px 0px;
          }
          .HideShowIcons {
            height: auto;
          }
          .prevIcon {
            transform: rotate(180deg);
          }
          .show {
            display: block !important;
          }
          .hide {
            display: none !important;
          }
          .mainCanvas iframe {
            width: 100%;
            height: 100%;
          }
          .swiper-container {
            width: 100%;
            height: 100% !important;
            display: flex;
            position: relative;
          }
          #_next {
            height: 100%;
          }
          .arr_redirect {
            //background: #000;
           // border: 1px solid #000;
            border-radius: 24px;
            color: #343a40;
            display: flex;
            position: relative;
            text-transform: capitalize;
            height: 48px;
            width: 48px;
          }
          .backarrow {
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(var(--ggs,1));
            width: 22px;
            height: 22px;
          }
          .backarrow::after,
          .backarrow::before {
              content: "";
              display: block;
              box-sizing: border-box;
              position: absolute;
              left: 3px;
          }
          .backarrow::after {
            width: 11px;
            height: 11px;
            border-bottom: 3px solid #fff;
            border-left: 3px solid #fff;
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
            bottom: 6px;
          }
          .backarrow::before {
            width: 16px;
            height: 3px;
            bottom: 10px;
            background: #fff;
          }
        `}
      </style>
    </div>
  );
};

export default SvConsumptionMobile;
