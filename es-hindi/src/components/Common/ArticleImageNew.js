import React, { useEffect, memo } from "react";
import FakeYTPlayer from "../Common/FakeYTPlayer";
import { imageLoader, holaPlayer, scriptLoader, newVidgyorScript } from "includes/article.util";
import Loader from "react-loader-spinner";
import LazyLoadImage from "./CustomImage";

export default memo(function ArticleImageNew({
  headline = "News18",
  image,
  caption = "",
  youtubeId,
  isMobile = false,
  categories,
  isAjax,
  isRes = false,
  hola_player = false,
  videoUrl = "",
  articleData = {},
  local18Video = false,
}) {
  const width = isMobile ? 360 : 509;
  const height = isMobile ? 240 : 339;
  const setDefaultImage = ({ target }) => {
    target.src = target.dataset?.src;
    target.srcset = target.dataset?.src;
    target.onError = "";
  };
  let { vidStreamData, vid_exist }  = articleData;

  useEffect(() => {
    if (hola_player) {
      setTimeout(() => {
        scriptLoader(
          "https://cdnjs.cloudflare.com/ajax/libs/hola_player/1.1.4/hola_player.js",
          () => holaPlayer(articleData, videoUrl, isMobile)
        );
      }, 4000);
    }
  }, []);

  const loadHola = () => {
    let firstplayer;
    const btn = document.querySelector(".playButton");
    const loader = document.querySelector(".hide-player");
    if(loader) {
      loader.classList.toggle("hide-player");
    }

    if(btn) {
      btn.remove();
    }

    const loadIt = () => {
      const player = document.getElementsByClassName("pubstack-vjs-tech")?.[0];
      if(player) {
        player.play().then(() => clearInterval(firstplayer));
      }
    };
    // "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-hindi/v2/prod-player.js?v=1.0.3"
    if (!window.pubstackJSLoaded) {
      scriptLoader(
        newVidgyorScript(vidStreamData, vid_exist),
        () => {
          loadIt();
        }
      );
    } else {
      loadIt();
    }
    firstplayer = setInterval(loadIt, 100);
  };

  if (local18Video && !isAjax) {
    return (
      <div style={{ position: "relative" }}>
        <button className="playButton" onClick={() => loadHola()}>
          <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
            <path
              className="ytp-large-play-button-bg"
              d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
              fill="#424242"
            ></path>
            <path d="M 45,24 27,14 27,34" fill="#fff"></path>
          </svg>
        </button>
        <div className="loader-player hide-player">
          <Loader
            type="Oval"
            color="#555555"
            height={75}
            width={75}
            radius={10}
          />
        </div>
        <div
          data-pubstack-player="true"
          data-pubstack-config="video-embed"
          height={`${height}px`}
          style={{ background: "#ddd", width: "100%", height }}
          data-pubstack-guid={local18Video}
          data-property-category={categories}
          data-property-platform={isMobile ? "mobile" : "desktop"}
          data-embed-mode="manual"
          dangerouslySetInnerHTML={{
            __html: `
          <img style="height:${height}px" src="${imageLoader(
              image,
              width,
              height,
              false,
              true
            )}" width="100%" onload="!function(){var e=setInterval(function(){if(window.pubstackJSLoaded){
              clearInterval(e)
              window.refreshPubstackPlayers()
            }},1e3)}();"
          alt=${caption}
          title=${caption} />
          <h3 class="article_title">${caption}</h3>`,
          }}
        />
        <style jsx>{`
          .playButton {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-60%) translateY(-50%);
            border: 0;
            width: 75px;
            height: 75px;
            padding: 0;
            margin: 0;
            background: transparent;
            border-radius: 5px;
            fill-opacity: 0.8;
            cursor: pointer;
            outline: 0;
          }
          .loader-player {
            position: absolute;
            top: 50%;
            left: 50%;
            padding: 0;
            margin: 0;
            transform: translate(-50%, -50%);
          }
          .hide-player {
            display: none;
          }
        `}</style>
      </div>
    );
  } else if (local18Video) {
    return (
      <div
        data-pubstack-player="true"
        data-pubstack-config="video-embed"
        height={`${height}px`}
        style={{ background: "#ddd", width: "100%", height }}
        data-pubstack-guid={local18Video}
        data-property-category={categories}
        data-property-platform={isMobile ? "mobile" : "desktop"}
        data-embed-mode="manual"
        dangerouslySetInnerHTML={{
          __html: `
          <img style="height:${height}px"  src="${imageLoader(
            image,
            width,
            height,
            false,
            true
          )}" width="100%" onload="!function(){var e=setInterval(function(){if(window.pubstackJSLoaded){
            clearInterval(e)
            window.refreshPubstackPlayers()
          }},1e3)}();"
          alt=${caption}
          title=${caption} />
          <h3 class="article_title">${caption}</h3>`,
        }}
      />
    );
  } else if (youtubeId) {
    return (
      <div
        data-youtube="true"
        data-youtube-id={youtubeId}
        data-youtube-title={headline}
        // data-youtube-category={category}
        data-youtube-category={categories}
        data-youtube-width={"100%"}
        data-youtube-height={height}
        style={{ background: "#ddd", width: "100%", height, margin: "0 auto" }}
      >
        <FakeYTPlayer
          src={youtubeId}
          width={width}
          height={`${height}px`}
        ></FakeYTPlayer>
      </div>
    );
  } else if (hola_player) {
    return (
      <>
        <div
          id={"holaPlayerContainer_" + articleData.story_id}
          className="holaPlayerContainer"
          style={{ width: "360px", height: "240px", background: "#eee" }}
        ></div>
      </>
    );
  } else {
    return (
      <>
        <LazyLoadImage
          src={image}
          width={width}
          height={height}
          alt={caption}
          title={caption}
          layout="responsive"
        />
        <h3 className="article_title">{caption}</h3>
      </>
    );
  }
});
