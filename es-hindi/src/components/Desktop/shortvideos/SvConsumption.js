import React, { useEffect, useState } from "react";
import { newVidgyorScript } from "includes/article.util";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { getRelativeURL } from "util/global/Helper";

const SvConsumption = ({ data }) => {
  const [showIcon, setShowIcon] = useState(false);
  const { vid_exist, vidStreamData } = data;

  const allData = data?.allData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextId, setNextId] = useState(allData[1]?.story_id);
  const [prevId, setPrevId] = useState(null);
  const handleScroll = (action, story_id) => {
    if (action === "next") {
      const ele = document.getElementById(nextId);
      ele.scrollIntoView({ behavior: "smooth" });
      setNextId(
        currentIndex + 2 < allData?.length
          ? allData[currentIndex + 2].story_id
          : null
      );
      setCurrentIndex(currentIndex + 1);
      setPrevId(story_id);
      history.pushState(
        {},
        allData[currentIndex + 1].display_headline || "Short-Videos",
        allData[currentIndex + 1].weburl_r
      );
      document.title =
        "News18 Short Videos: Watch Youtube Trending Shorts & Instagram Reels @ News18 Hindi";
      setTimeout(() => {
        window.refreshPubstackPlayers(allData[currentIndex + 1]?.vidStreamData);
      }, 100);
    } else {
      const ele = document.getElementById(prevId);

      ele.scrollIntoView({ behavior: "smooth" });
      setNextId(story_id);
      setPrevId(
        currentIndex - 2 < 0 ? null : allData[currentIndex - 2].story_id
      );
      setCurrentIndex(currentIndex - 1);
      history.pushState(
        {},
        allData[currentIndex - 1]?.display_headline || "Short-Videos",
        allData[currentIndex - 1]?.weburl_r
      );
      document.title =
        "News18 Short Videos: Watch Youtube Trending Shorts & Instagram Reels @ News18 Hindi";
      setTimeout(() => {
        window.refreshPubstackPlayers(allData[currentIndex - 1]?.vidStreamData);
      }, 100);
    }
  };

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

  const { weburl = "" } = data.articleData;
  const cat =
    data?.category?.slug === "short-videos"
      ? ""
      : (data?.category?.slug || "") + "/";

  const shareUrl = getRelativeURL(false, weburl);
  const fbUrl = `https://www.facebook.com/sharer.php?u=${shareUrl}`;
  const whatspUrl = `https://wa.me/?text='Short Video - ${shareUrl}`;
  return (
    <>
      <div id="JsPlayer">
        {allData.map((video, index) => {
          const {
            display_headline,
            story_id,
            weburlVd,
            categories,
            auto_youtube_import = {},
            video_details = {},
          } = video;
          const videoId =
            auto_youtube_import?.nw_auto_yt_feed_id || video_details.video_id;

          return (
            <div key={index} id={story_id} className="mainCanvas">
              {currentIndex === index ? (
                <div
                  id={`vidgyorPlayer${story_id}`}
                  data-pubstack-player="true"
                  data-pubstack-config="video-embed"
                  style={{ width: "364px", height: "", position: "static" }}
                  data-pubstack-guid={
                    videoId?.length > 24
                      ? videoId.slice(2, videoId?.length)
                      : videoId
                  }
                  data-property-category={"category" || categories}
                  data-property-platform={"desktop"}
                  data-embed-mode="manual"
                  data-city-name={"state"}
                  data-district-name={"state"}
                  data-state-name={"state"}
                  data-section-name={"state"}
                  data-article-id={"state"}
                  data-language="hi"
                  data-video-type={"non-local18"}
                  data-video-event="Video"
                />
              ) : (
                <div id={`vidgyorPlayer${story_id}`} />
              )}
              <figurecaption>
                <h2 className="story-title">
                  <span>
                    NEWS18 HINDI<span className="sit_cat"></span>
                    {categories?.name}
                  </span>
                  {display_headline?.length > 60
                    ? display_headline.slice(0, 50) + "..."
                    : display_headline}
                </h2>
              </figurecaption>
              <div className="social-share">
                {index !== 0 ? (
                  <>
                    <span
                      onClick={() => handleScroll("prev", story_id, weburlVd)}
                      className="prevIcon"
                    >
                      <img
                        alt=""
                        src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/Next_1663919184.svg"
                      />
                    </span>
                  </>
                ) : (
                  ""
                )}

                {index !== allData?.length - 1 ? (
                  <>
                    <span
                      onClick={() => handleScroll("next", story_id, weburlVd)}
                      className="nextIcon"
                    >
                      <img
                        alt=""
                        src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/Next_1663919184.svg"
                      />
                    </span>
                  </>
                ) : (
                  ""
                )}

                <a href={fbUrl} target="_blank">
                  <span className="facebk"></span>
                </a>
                <a href={whatspUrl} target="_blank">
                  <span className="whatsp"></span>
                </a>

                <a
                  // className="tw"
                  className={showIcon ? "show tw" : "hide tw"}
                  href={
                    "https://twitter.com/share?text=" +
                    encodeURIComponent(display_headline) +
                    "&url=" +
                    shareUrl
                  }
                  onClick={() => {
                    logEvent(
                      "Social Interactions",
                      "Click",
                      "Social-button-twitter"
                    );
                  }}
                  target="_blank"
                  rel="nofollow"
                  alt={encodeURIComponent(display_headline)}
                ></a>
                <a
                  className={showIcon ? "show telegram" : "hide telegram"}
                  href={
                    "https://telegram.me/share/url?url=" +
                    shareUrl +
                    "&text=" +
                    encodeURIComponent(display_headline)
                  }
                  target="_blank"
                  rel="nofollow"
                  alt={encodeURIComponent(display_headline)}
                ></a>

                <>
                  <span
                    onClick={() => {
                      toggleIcon();
                    }}
                    className="share"
                  ></span>
                </>
              </div>

              <a
                className="back-ic"
                href={publicRuntimeConfig.siteUrl + `short-videos/${cat}`}
              ></a>
            </div>
          );
        })}
      </div>

      <style jsx global>
        {`
          body {
            margin: 0px;
            height: 100vh;
            overflow: hidden;
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
            height: 100%;
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
            padding: 0 0 15px;
            position: relative;
            border: 2px solid #5f5f5f;
          }
          #JsPlayer figure img {
            display: block;
            height: 584px;
            object-fit: cover;
            width: 360px;
          }
          #JsPlayer figurecaption {
            position: absolute;
            bottom: 0;
            // background: linear-gradient(180deg, #00000000 0, #000 100%)
            background: #5951516e;
            //   no-repeat padding-box;
            display: flex;
            align-items: flex-end;
            padding: 30px 15px 10px 15px;
            width: 100%;
            box-sizing: border-box;
            // border-radius: 100%;
            margin-bottom: 33px;
            background: linear-gradient(transparent, #000);
          }
          #JsPlayer figurecaption h2.story-title {
            color: #fff;
            font-weight: bold;
            font-size: 22px;
            line-height: 28px;
            max-width: 80%;
          }
          #JsPlayer figurecaption h2.story-title span {
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
          #JsPlayer figurecaption h2.story-title .sit_cat {
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
            bottom: 55px;
          }
          .social-share a {
            display: block;
          }
          .social-share a span {
            background-color: rgb(000 000 000 / 30%);
            border-radius: 50%;
            height: 34px;
            width: 34px;
            position: relative;
            display: block;
            margin-bottom: 10px;
          }
          .social-share a span img {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
          }
          a.back-ic {
            background: transparent
              linear-gradient(180deg, #000000 0%, #00000000 100%) 0% 0%
              no-repeat padding-box;
            width: 40px;
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            height: 40px;
          }
          a.back-ic:before {
            content: "";
            width: 8px;
            height: 8px;
            border-left: 1px solid #fff;
            border-bottom: 1px solid #fff;
            display: block;
            margin: auto;
            transform: rotate(45deg);
          }

          #JsPlayer {
            display: flex;
            justify-content: center;
            background: #2e2e2e;
            flex-direction: column;
            align-items: center;
            // height: 100vh !important;
          }
          #JsPlayer .mainCanvas > div > div {
            height: 100vh !important;
          }
          .mainCanvas {
            height: 100vh !important;
            display: flex;
            max-width: 360px;
            position: relative;
          }

          .mainCanvas iframe {
            height: 100%;
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
            background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/bottom_bar_sprite.svg)
              no-repeat;
            border-radius: 50%;
            background-position: -593px 6px;
            background-color: rgb(000 000 000 / 30%);
            margin-bottom: 10px;
          }
          a.telegram {
            width: 34px;
            height: 34px;
            background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/bottom_bar_sprite.svg)
              no-repeat;
            border-radius: 50%;
            background-position: -625px 6px;
            background-color: rgb(000 000 000 / 30%);
            margin-bottom: 10px;
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
            cursor: pointer;
          }

          .nextIcon {
            cursor: pointer;
          }

          .show {
            display: block !important;
          }
          .hide {
            display: none !important;
          }

          // body{
          //   overflow: scroll;
          // }

          .social-share button {
            display: block;
            margin-bottom: 33px;
          }

          .social-share span {
            background-color: rgb(000 000 000 / 30%);
            border-radius: 50%;
            height: 34px;
            width: 34px;
            position: relative;
            display: block;
            margin-bottom: 10px;
          }

          .social-share span img {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
          }
          // .ytp-cued-thumbnail-overlay{
          //   width:386px
          // }
          .mainCanvas iframe {
            width: 364px;
          }
          .social-share a span img {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
            width: 20px;
            height: 30px;
          }
          .social-share a .whatsp {
            background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/bottom_bar_sprite.svg)
              no-repeat;
            background-position: -564px 2px;
            transform: scale(1.2);
            background-color: rgb(0 0 0/30%);
            width: 28px;
            height: 28px;
            margin-left: 3px;
          }
          .social-share .share {
            background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/bottom_bar_sprite.svg)
              no-repeat;
            background-position: -102px 6px;
            filter: brightness(9) invert(0);
            background-color: rgb(0 0 0/30%);
            width: 30px;
            padding: 0 3px 0 0;
          }
          .social-share a .facebk {
            background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/bottom_bar_sprite.svg)
              no-repeat;
            background-position: -533px 2px;
            transform: scale(1.3);
            background-color: rgb(0 0 0/30%);
            width: 26px;
            height: 26px;
            margin-left: 5px;
          }
        `}
      </style>
    </>
  );
};

export default SvConsumption;
