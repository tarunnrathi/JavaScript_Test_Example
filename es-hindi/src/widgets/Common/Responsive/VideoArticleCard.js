import React, { useState, useEffect } from "react";
import ReactHtmlParser from "html-react-parser";
import getConfig from "next/config";
import VideoImage from "components/Common/VideoImage";
import VideoArticleCardStyles from "./VideoArticleCard.module.css";
import { useInView } from "react-intersection-observer";
import { logEvent, logEventNew } from "includes/googleAnalytic";
import VideoMobileStyle from "components/Mobile/VideoMobile.module.css";
import LazyLoad from "react-lazyload";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { additionalText } from "includes/_app.util";
const { publicRuntimeConfig } = getConfig();

const VideoArticleCard = ({
  articleData,
  isMobile,
  channelLogo,
  categoryName,
  catVideoTrack,
  videoTitle,
  videoId,
  pageAds,
  // _1xbetData
}) => {
  const lengthCheck = isMobile ? 100 : 300;
  const [readMore, setReadMore] = useState(
    articleData.intro.length > lengthCheck ? true : false
  );

  const { ref, inView, entry } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView || entry && entry.boundingClientRect.top < 0 && entry.isIntersecting && (articleData.youtubeid || articleData.auto_youtube_import?.nw_auto_yt_feed_id)) {
      logEvent("video_impressions_yt_video", "Impressions", `Youtube, ${articleData.headline || articleData.display_headline}, ${articleData.headline || articleData.display_headline}`);
      logEventNew('Video_Impression_Video_Youtube', 'Impression', `${videoTitle}, ${videoId}, ${catVideoTrack} , ${articleData?.story_id}`);
    }
  }, [inView]);

  // current url
  const outBrainUrl = (articleData.url || articleData.weburl).replace(
    /(https|http):\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );

  let {
    images: { url: thumbnail, caption } = {},
    auto_youtube_import: autoYoutubeImport,
    tag_topic: storyTags,
    youtubeid: youtubeId,
    // intro,
    hola_player: holaPlayer,
    videoUrl,
    external_video: externalVideo,
    video_details
  } = articleData;

  if (typeof autoYoutubeImport?.nw_auto_yt_feed_id === "undefined" && video_details && video_details.video_id) {
    if (youtubeId == "") {
      // extract youtubeId from body
      const youtubeData = articleData.body.match(
        /youtube.com\/embed\/([A-Za-z0-9-_]+)/
      );
      youtubeId =
        youtubeData != null && typeof youtubeData !== "undefined"
          ? youtubeData[1]
          : "";
    }
  }
  const featureTime = (fTime) => {
    const r = new Date(fTime);
    return (
      r.toLocaleDateString('en-us', { month: 'long', day: '2-digit' }) + ", " + r.toLocaleDateString('en-us', { year: 'numeric' }) + ", " + ("0" + r.getHours()).slice(-2) + ':' + ("0" + r.getMinutes()).slice(-2) + " IST"
    );
  };

  return (
    <div
      id={`video_consumption_${articleData.story_id}`}
      className={`${isMobile ? VideoArticleCardStyles.top_story_video : ""}
              ${VideoArticleCardStyles.furthered_section}`}
      rel={outBrainUrl}
      galtitle={articleData.headline}
      data-dm-type="no"
      data-video_id={articleData.story_id}
    >
      <div className="videoSection">
        <figure
          className={`${
            isMobile
              ? VideoArticleCardStyles.top_story_img
              : VideoArticleCardStyles.furthered_img
          }`}
        >
          {/* youtube frame come here */}
          {externalVideo ? (
            <div
              className={`${
                isMobile
                  ? VideoArticleCardStyles.mvideo_ifram_thard
                  : VideoArticleCardStyles.video_ifram_thard
              }`}
            >
              {ReactHtmlParser(externalVideo)}
            </div>
          ) : (
            <div ref={ref}>
              <VideoImage
                headline={articleData.headline}
                image={thumbnail || articleData?.video_encode?.thumbnail_url}
                channelLogo={channelLogo}
                videoId={
                  video_details?.mongo_id || autoYoutubeImport?.nw_auto_yt_feed_id
                }
                caption={caption ? caption : ""}
                isMobile={isMobile}
                categories={"videos"}
                tags={storyTags}
                hola_player={holaPlayer}
                videoUrl={videoUrl || articleData?.video_encode?.video_url}
                articleData={articleData}
                youtubeId={youtubeId}
                catVideoTrack={catVideoTrack}
                videoTitle={videoTitle}
              />
              <style jsx global>{`
                .adclssticktatbtm iframe {
                  width: ${isMobile ? "100%!important" : "300px!important"};
                  height: ${isMobile ? "" : "190px!important"};
                  min-width: ${isMobile ? "100%!important" : "300px!important"};
                  min-height: ${isMobile ? "" : "190px!important"};
                }
                .adclssticktatbtm {
                  position: fixed !important;
                  margin: ${isMobile ? "0px -15px" : ""};
                  top: ${isMobile ? "46px" : ""};
                  bottom: ${isMobile ? "" : "5px"};
                  background: ${isMobile ? "#000" : ""};
                  width: ${isMobile ? "100%!important" : "300px!important"};
                  height: ${isMobile ? "" : "190px!important"};
                  border: ${isMobile ? "" : "5px solid #000"};
                  overflow: ${isMobile ? "hidden" : "hidden"};

                  right: ${isMobile ? "0px" : "5px"};
                  left: ${isMobile ? "15px" : ""};
                  z-index: 999;
                  box-sizing: ${isMobile ? "" : "border-box"};
                  cursor: pointer;
                }
                .adclssticktatbtm video {
                  height: ${isMobile ? "" : "190px !important"};
                }
                .adclssticktatbtm .pubstack-video-js {
                  height: ${isMobile ? "" : "190px !important"};
                }
                .adclssticktatbtm .article_title {
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
                .adclssticktatbtm .closevdsnew {
                  display: block;
                }
                .localvideopl:hover ~ i {
                  display: none;
                }
                .svgloader {
                  position: absolute;
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: 0;
                  z-index: 99;
                  background: #272727;
                }
                .svgloader img {
                  position: absolute;
                  top: 50%;
                  right: 0;
                  bottom: 0;
                  left: 50%;
                  z-index: 99;
                  width: 52px;
                  height: 52px;
                  margin: -26px 0 0 -26px;
                  animation: rotate 1s linear infinite;
                }
                @keyframes rotate {
                  from {
                    transform: rotate(-0deg);
                  }
                  to {
                    transform: rotate(-359deg);
                  }
                }
                .mvt {
                  height: 291px;
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
                .VideoArticleCard_video_share_m__6dDPt {
                  display: flex;
                  align-items: center;
                  margin-top: 0px !important;
                  justify-content: flex-end;
                }
              `}</style>
            </div>
          )}
        </figure>

        <div
          className={`${
            isMobile
              ? VideoArticleCardStyles.videos_consumption_row
              : VideoArticleCardStyles.furthered_content
          }`}
        >
          <ul className={VideoArticleCardStyles.date_time}>
            <li>{featureTime(articleData.updated_at)}</li>
            <li>
              {typeof autoYoutubeImport !== "undefined"
                ? autoYoutubeImport?.nw_auto_yt_feed_channel_name
                : categoryName + " NEWS18HINDI"}
            </li>
          </ul>
          {isMobile ? (
            <>
              <h1 className={VideoArticleCardStyles.top_story_h}>
                {articleData.headline}
              </h1>
              <div className="VideoArticleCard_video_share_m__6dDPt">
                <a
                  className="arr_redirect"
                  onClick={async () => {
                    const shareData = {
                      title: "",
                      text: `${articleData?.headline}\n${articleData?.weburl}\n\n ${additionalText}`,
                    };
                    try {
                      await navigator.share(shareData);
                    } catch (err) {
                      //resultPara.textContent = `Error: ${err}`;
                    }
                    logEvent("ss_wapi","tap","videos_page");
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
              </div>
            </>
          ) : (
            <>
              <div className={VideoArticleCardStyles.video_share}>
                <a
                  href={
                    "https://www.facebook.com/sharer.php?u=" +
                    outBrainUrl +
                    "&t=" +
                    articleData.headline
                  }
                  target="_blank"
                >
                  <span className={VideoArticleCardStyles.icon_facebook}></span>
                </a>
                {/* <a
                  href={`https://kooapp.com/create?title=${articleData.headline}&link=${outBrainUrl}&language=hi&handle=News18Hindi&utm_source=News18Hindi&utm_campaign=News18Hindi`}
                  target="_blank"
                >
                  <span className={VideoArticleCardStyles.icon_koo}></span>
                </a> */}
                <a
                  href={
                    "https://twitter.com/share?text=" +
                    // articleData.headline.replaceAll("|","-") +
                    encodeURIComponent(articleData.headline) +
                    "&url=" +
                    outBrainUrl
                  }
                  target="_blank"
                >
                  <span className={VideoArticleCardStyles.icon_twitter}></span>
                </a>
                <a
                  href={
                    "https://web.whatsapp.com/send?text=" +
                    encodeURIComponent(articleData.headline) +
                    "-" +
                    outBrainUrl
                  }
                  target="_blank"
                  // data-action="share/whatsapp/share"
                >
                  <span className={VideoArticleCardStyles.icon_whatsapp}></span>
                </a>
              </div>
              <h1 className={VideoArticleCardStyles.content_title}>
                {articleData.headline}
              </h1>
            </>
          )}

          {isMobile && (
            <LazyLoad once className="mvt">
              <div className={VideoMobileStyle.addinner_box}>
                {/*<span id="first">विज्ञापन</span>*/}
                <SiteAd
                  // slotId="mobile_atf_320"
                  width={336}
                  height={280}
                  adUnit={pageAds?.header_ATF_320}
                  sizes={[
                    [320, 250],
                    [300, 250],
                    [320, 300],
                    [336, 280],
                  ]}
                  targetingArguments={{
                    Content_Type: "video",
                  }}
                  style={{ padding: "16px 0" }}
                />
              </div>
            </LazyLoad>
          )}
          <p
            className={`${isMobile ? VideoArticleCardStyles.video_embed_p : ""}`}
          >
            {articleData.intro.length > lengthCheck && readMore
              ? articleData.intro.slice(0, lengthCheck)
              : articleData.intro}
          </p>

          {articleData.intro.length > lengthCheck ? (
            <a
              className={VideoArticleCardStyles.read_more_btn}
              onClick={() => setReadMore((prevState) => !prevState)}
            >
              {readMore ? "और अधिक पढ़ें" : "कम पढ़ें"}
            </a>
          ) : null}
        </div>
      </div>
      {/* {isMobile && (
        <InstallAppIcon
          category={"APPdownload_Mweb_Video"}
          label={"Mobile Video"}
          isSponcer={Object.keys(_1xbetData)?.length >0?true:false}
        />
      )} */}
    </div>
  );
};

export default VideoArticleCard;
