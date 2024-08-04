import React, { useEffect, memo } from "react";
import FakeYTPlayer from "../Common/FakeYTPlayer";
import { holaPlayer, newVidgyorScript, scriptLoader } from "includes/article.util";
import siteConfig from "config/site.config";
import Head from "next/head";
import LazyLoadImage from "./CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

export default memo(function ArticleImage({
  headline = "News18",
  image,
  caption = "",
  youtubeId,
  isMobile = false,
  categories,
  isAjax,
  // isRes = false,
  hola_player = false,
  videoUrl = "",
  articleData = {},
  isAmp = false,
  local18Video = false,
  url = "",
  category,
  pageAds = {},
  firebase_ad_config = {},
}) {
  const width = isMobile ? 400 : 540;
  const height = isMobile ? 250 : 360;
  image = image.replace("images.hindi.news18.com", "images.news18.com");
  let { vidStreamData, vid_exist }  = articleData;

  useEffect(() =>{
    setTimeout(() => {
      newVidgyorScript(vidStreamData, vid_exist);
    }, 10);
  }, [])

  useEffect(() => {
    if (hola_player) {
      setTimeout(() => {
        scriptLoader(
          "https://cdnjs.cloudflare.com/ajax/libs/hola_player/1.1.4/hola_player.js",
          () => holaPlayer(articleData, videoUrl, isMobile)
        );
      }, 4000);
    }
    if (local18Video && !isAjax) {
      !(function () {
        const e = setInterval(function () {
          if (window.pubstackJSLoaded) {
            clearInterval(e);
          window.refreshPubstackPlayers(vid_exist ? vidStreamData : '')
          }
        }, 1e3);
      })();
    }
    const videoNews = document.querySelector(".localvideopl");
    const closer = document.querySelector(".closevdsnew");
    if (closer) {
      closer.addEventListener("click", () => {
        document.removeEventListener("scroll", addClass);
        videoNews.classList.remove("adclbt");
        videoNews.classList.add("frlsp");
        document.querySelector(".pubstack-vjs-tech").muted = "true";
        // setHeight(isMobile ? 250 : 360);
      });
    }
    const addClass = () => {
      const next = document.querySelector(".agli_khb_r_secs");
      const nextPosition =
        parseInt(next.offsetTop || 0) +
        parseInt(videoNews.offsetHeight || 0) +
        (isMobile ? 0 : 400);
      const windowOffset = parseInt(window.pageYOffset);
      if (nextPosition < windowOffset) {
        document.removeEventListener("scroll", addClass);
        videoNews.classList.remove("adclbt");
        videoNews.classList.add("frlsp");
        document.querySelector(".pubstack-vjs-tech").muted = "true";
        // setHeight(isMobile ? 245 : 190);
        return;
      }
      const x =
        parseInt(videoNews.offsetTop || 0) +
        parseInt(videoNews.offsetHeight || 0) +
        (isMobile ? 0 : 400);
      if (windowOffset >= x && !videoNews.classList.contains("adclbt")) {
        videoNews.classList.add("adclbt");
        videoNews.classList.remove("frlsp");
        // setHeight(isMobile ? 245 : 190);
      } else if (x > windowOffset && videoNews.classList.contains("adclbt")) {
        videoNews.classList.remove("adclbt");
        videoNews.classList.add("frlsp");
        // setHeight(isMobile ? 250 : 360)
      }
    };
    if (local18Video && !isAjax) {
      document.addEventListener("scroll", addClass);
    }
    return () => {
      if (local18Video && !isAjax) {
        document.removeEventListener("scroll", addClass);
      }
    };
  }, []);

  let l18_ads = {};
  let l18_feature_video_ad = false;
  let l18_lband_ad = false;
  if (firebase_ad_config.length > 0) {
    const fl_dat = firebase_ad_config
      .map((item) => item)
      .filter((item) => item.key === "L18_FEATURED_VIDEO_AD");
    l18_ads = fl_dat.length > 0 ? JSON.parse(fl_dat[0].value) : "";
  }

  l18_feature_video_ad = l18_ads.status ? true : false;
  l18_lband_ad = l18_ads.lband ? true : false;
  //https://images.news18.com/dlxczavtqcctuei/news18/prod/pubstack.html
  if (local18Video && isAmp) {
    let videopubSrc = "";
    videopubSrc = `https://images.news18.com/dlxczavtqcctuei/news18/prod/pubstack_hindi_prod.html?guid=${local18Video}&section_name=${
      articleData.section[0] || ""
    }&article_id=${articleData.story_id || ""}&city_name=${
      articleData?.dis?.en
    }&district_name=${articleData?.dis?.en || ""}&state_name=${
      articleData?.dis?.stateName || ""
    }&language=hi&video_type=${
      local18Video ? "local18" : "non-local18"
    }&video_event=Feature_Article&domain=hindi.news18.com&data-article-date=${articleData?.created_at}&data-publish-time=${articleData?.created_at}&}
    data-article-type=${articleData?.post_type}&data-tag=${articleData?.tags?.length>0?articleData?.tags?.map(x=>x.slug).join(','):""}&data-taboola=${"Yes"}&data-video-identifier=${"Videos"}
    &data-author-type=${articleData?.publish_by?.length>0?articleData?.publish_by[0]?.english_name:""}&data-desk-video=${articleData?.video_details?.type === "desk" ? 1:0}
    &data-page-url=${articleData?.weburl}&data-amp-filter=${"amp-hin"}&data-video-title=${articleData?.headline}`;
    return (
      <>
        <div
          className="newdscrtcardbox"
          id="JsPlayer"
          style={{ background: "#000", margin: "0 -15px" }}
        >
          <amp-iframe
            src={videopubSrc}
            id="vidgyorPlayer1"
            sandbox="allow-scripts allow-same-origin"
            layout="responsive"
            width="360"
            height="240"
            allowfullscreen=""
            placeholder=""
          >
            {url ? <amp-img layout="fill" src={url?url+"?impolicy=website&width=320&height=240":""} placeholder></amp-img> : ""}
          </amp-iframe>
        </div>
        {l18_feature_video_ad && l18_lband_ad ? (
          <div>
            <p className="ampaddcntr">
              <div className="ad-container go">
                <amp-ad
                  width="340"
                  height="60"
                  type="doubleclick"
                  data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_LOCAL18_NEWS_AMP/NW18_HIND_LOCAL18_NEWS_AMP_AS/NW18_HIND_LOCAS18_NWS_AS_AMP_ROS_LBAND_340x60"
                  json="adTarget"
                  data-lazy-fetch="true"
                  data-loading-strategy="1"
                  data-multi-size-validation="false"
                  data-multi-size="340x60"
                  rtc-config='{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}'
                ></amp-ad>
              </div>
            </p>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }

  if (local18Video && !isAjax) {
    return (
      <div
        className={
          l18_feature_video_ad && l18_lband_ad && !isMobile
            ? "artcl_contents_img ifcmlsp"
            : "artcl_contents_img"
        }
      >
        {!isMobile && l18_feature_video_ad && l18_lband_ad && (
          <div className="cmlsp">
            {pageAds?.LBAND_1x1 && (
              <>
                <NewSiteAd
                  slotId="lband-ad"
                  adUnit={pageAds?.LBAND_1x1 ? pageAds.LBAND_1x1 : ""}
                  sizes={[
                    [1, 1],
                    [1, 1],
                  ]}
                  width={100}
                  height={300}
                  removeAdSpan={true}
                  lazyLoad={true}
                />
              </>
            )}
          </div>
        )}
        <div
          className={
            l18_feature_video_ad && l18_lband_ad && !isMobile
              ? "localvideopl frlsp"
              : "localvideopl"
          }
          style={{
            overflow: "hidden",
            position: "relative",
            height: isMobile ? "250px" : height,
            width: isMobile ? "inherit" : width,
            margin: isMobile ? "0px -10px" : "auto",
            padding: isMobile ? (height === 245 ? "0" : "0px 5px") : "",
            background: isMobile ? "#eee" : "",
          }}
        >
          <div className="loader-player hide-player"></div>
          <div id="JsPlayer">
            <a className="closevdsnew">X</a>
            <div
              id="vidgyorPlayer2"
              data-pubstack-player="true"
              data-pubstack-config="video-embed"
              style={{ width: "100%", position: "static" }}
              data-pubstack-guid={local18Video}
              data-property-category={category || categories}
              data-property-platform={isMobile ? "mobile" : "desktop"}
              data-embed-mode="manual"
              data-city-name={articleData?.dis?.en || ""}
              data-district-name={articleData?.dis?.en || ""}
              data-state-name={articleData?.dis?.stateName || ""}
              data-section-name={articleData.section[0] || ""}
              data-article-id={articleData.story_id || ""}
              data-language="hi"
              data-video-type={local18Video ? "local18" : "non-local18"}
              data-video-event={"Feature_Article"}
              dangerouslySetInnerHTML={{
                __html: `
              <img style="height:${height}px" src="${
                image + `?impolicy=website&width=${width}&height=${height}`
              }" width="100%" onload="!function(){var e=setInterval(function(){if(window.pubstackJSLoaded){
                  clearInterval(e)
                  window.refreshPubstackPlayers()
                }},1e3)}();"
              alt=${caption}
              title=${caption} />
              <h3 class="article_title">${caption}</h3>`,
              }}
              data-article-date={articleData?.created_at}
              data-publish-time={articleData?.created_at}
              data-article-type={articleData?.post_type}
              data-tag={articleData?.tags?.length>0?articleData?.tags?.map(x=>x.slug).join(','):""}
              data-taboola={"Yes"}
              data-video-identifier={"Feature Videos"}
              data-author-type={articleData?.publish_by?.length>0?articleData?.publish_by[0]?.english_name:""}
              data-desk-video={articleData?.video_details?.type === "desk" ? 1:0}
              data-page-url={articleData?.weburl}
              data-domain-name="https://hindi.news18.com/"
              data-amp-filter={"non-amp-hin"}
              data-video-title={articleData?.headline}
            />
          </div>
        </div>

        {isMobile && l18_feature_video_ad && l18_lband_ad && (
          <div className="comingbottomad">
            {pageAds?.LBAND_340x60 && (
              // <SiteAd
              //   adUnit={pageAds?.LBAND_340x60 ? pageAds.LBAND_340x60 : ""}
              //   sizes={[[340, 60]]}
              //   width={340}
              //   height={60}
              //   slotId="lband-bottom-ad"
              //   removeAdSpan={true}
              //   lazyload={true}
              // />
              <NewSiteAd
                slotId="lband-bottom-ad"
                adUnit={pageAds?.LBAND_340x60 ? pageAds.LBAND_340x60 : ""}
                sizes={[[340, 60]]}
                width={340}
                height={60}
                removeAdSpan={true}
                lazyLoad={true}
              />
            )}
          </div>
        )}
        <style jsx global>{`
          .ifcmlsp {
            justify-content: flex-end;
            height: 420px;
            max-height: 420px;
          }
          .cmlsp {
            position: absolute;
            height: 420px;
            left: 0;
            bottom: 0;
            right: 0;
          }
          .ifcmlsp .frlsp {
            width: 475px !important;
            margin: 0 !important;
            height: 360px !important;
            background: #000;
          }
          #JsPlayer {
            width: 100%;
          }
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
          .adclbt {
            position: fixed !important;
            margin: ${isMobile ? "0px -15px" : ""};
            top: ${isMobile ? "48px" : "35%"};
            background: ${isMobile ? "#000" : ""};
            width: ${isMobile ? "100%!important" : "300px!important"};
            height: ${isMobile ? "" : "190px!important"};
            border: ${isMobile ? "" : "5px solid #000"};
            overflow: ${isMobile ? "hidden" : "hidden"};
            // bottom: ${isMobile ? "" : "0px"};
            right: ${isMobile ? "0px" : "0px"};
            left: ${isMobile ? "11px" : ""};
            z-index: 99999;
            box-sizing: ${isMobile ? "" : "border-box"};
            cursor: pointer;
          }
          .localvideopl #vidgyorPlayer2 {
            height: ${isMobile ? "250px" : "360px"};
          }
          .adclbt #vidgyorPlayer2 iframe {
            height: 190px;
            width: 100%;
          }
          .frlsp #vidgyorPlayer2 iframe {
            height: ${isMobile ? "250px" : "360px"};
            width: 100%;
          }
          .adclbt #vidgyorPlayer2 {
            height: 190px !important;
          }
          .adclbt .article_title {
            display: ${isMobile ? "" : "none"};
          }
          .closevdsnew {
            position: absolute;
            background: #fff;
            width: 20px;
            height: 20px;
            top: 0;
            right: 0;
            z-index: 1;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            font-family: arial;
            font-weight: bold;
            display: none;
          }
          .adclbt .closevdsnew {
            display: block;
          }
        `}</style>
      </div>
    );
  } else if (local18Video) {
    return (
      <div className="artcl_contents_img" id="JsPlayer">
        <div
          id="vidgyorPlayer3"
          data-pubstack-player="true"
          data-pubstack-config="video-embed"
          height={`${height}px`}
          style={{
            overflow: "hidden",
            position: "relative",
            height: isMobile ? "240px" : height,
            width: isMobile ? "inherit" : width,
            margin: isMobile ? "0px -15px" : "auto",
          }}
          data-pubstack-guid={local18Video}
          data-property-category={category || categories}
          data-property-platform={isMobile ? "mobile" : "desktop"}
          data-embed-mode="manual"
          data-city-name={articleData?.dis?.en || ""}
          data-district-name={articleData?.dis?.en || ""}
          data-state-name={articleData?.dis?.stateName || ""}
          data-section-name={articleData.section[0] || ""}
          data-article-id={articleData.story_id || ""}
          data-language="hi"
          data-video-type={local18Video ? "local18" : "non-local18"}
          data-video-event={
            local18Video ? "Feature_Article" : "Feature_Article_JSPlayer"
          }
          dangerouslySetInnerHTML={{
            __html: `
            <img style="height:${height}px"  src="${
              image + `?impolicy=website&width=${width}&height=${height}`
            }" width="100%" onload="!function(){var e=setInterval(function(){if(window.pubstackJSLoaded){
              clearInterval(e)
              window.refreshPubstackPlayers()
            }},1e3)}();"
            alt=${caption}
            title=${caption} />
            <p class="article_title">${caption}</p>`,
          }}
        />
      </div>
    );
  } else if (youtubeId) {
    let opt = {};
    if (isMobile) {
      opt = {
        position: "relative",
        display: "flex",
        alignItems: "center",
        background: "#000",
        overflow: "hidden",
        justifyContent: "center",
      };
    }
    return (
      <div className="artcl_contents_img">
        <div
          id={`videoPlayer-${youtubeId}`}
          data-youtube="true"
          data-youtube-id={youtubeId}
          data-youtube-title={headline}
          // data-youtube-category={category}
          data-youtube-category={category || categories}
          data-youtube-width={"100%"}
          data-youtube-height={height}
          data-video-event={"Feature_Article_Youtube"}
          style={{
            background: "#ddd",
            width: "100%",
            height: isMobile ? "260px" : height,
            margin: "0 auto",
            ...opt,
          }}
        >
          <FakeYTPlayer
            src={youtubeId}
            width={width}
            height={height}
            isAmp={isAmp}
            image={image}
          ></FakeYTPlayer>
        </div>
      </div>
    );
  } else if (hola_player) {
    return (
      <>
        <div className="artcl_contents_img">
          <div
            id={"holaPlayerContainer_" + articleData.story_id}
            className="holaPlayerContainer"
          ></div>
        </div>
      </>
    );
  } else {
    if (isMobile) {
      return (
        <>
          <Head>
            {articleData?.liveblog_switcher === "1" && (
              <link rel="preload" as="image" href={image} />
            )}
          </Head>
          <div className="article_img img-wrapper">
            <figure className="article_img_inner">
              {
                <>
                  <span>
                    <LazyLoadImage
                      src={image}
                      width={400}
                      height={300}
                      alt={caption}
                      title={caption}
                    />
                  </span>
                </>
              }
            </figure>
            <figcaption className="article_img_dis">{caption}</figcaption>
          </div>
        </>
      );
    }

    if (isAmp) {
      return youtubeId ? (
        <amp-youtube
          data-videoid={(articleData?.youtubeid || "").split(/[\&?]/)[0]}
          layout="responsive"
          width="480"
          height="270"
        ></amp-youtube>
      ) : (
        <>
          <Head>
            {articleData?.liveblog_switcher === "1" && (
              <link
                rel="preload"
                as="image"
                href={image + "?impolicy=website&width=320&height=240"}
              />
            )}
          </Head>
          <div className="article_img img-wrapper">
            <figure className="article_img_inner">
              <amp-img
                src={image + "?impolicy=website&width=320&height=240"}
                width="320"
                height="240"
                layout="responsive"
                alt={caption}
                title={caption}
                data-hero=""
              ></amp-img>
              <figcaption className="article_img_dis">{caption}</figcaption>
            </figure>
          </div>
        </>
      );
    }
    return (
      <>
        <Head>
          <link rel="preload" as="image" href={image} />
        </Head>
        <figure className="artcl_contents_img">
          <LazyLoadImage
            src={image}
            width={width}
            height={height}
            alt={caption}
            title={caption}
            data-src={`${siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?impolicy=website&width=${width}`}
            loading="eager"
          />
          <figcaption className="article_title">{caption}</figcaption>
        </figure>
      </>
    );
  }
});
