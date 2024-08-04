import React, { useEffect, useRef, useState, memo } from "react";
import Loader from "react-loader-spinner";
import Image from "../../../../CommonUtils/Image";
import { useInView } from "react-intersection-observer";
import SiteAd from "APP_COMMON/components/Ads/SiteAd";
import * as VIDEO_CONFIG from "../video.config";
import { getImageUrl } from "../video.utils";

export const AdItem = memo(({ idx, pageAds }) => {
  return (
    <SiteAd
      slotId={`mobileAdNew300x250_${idx}`}
      adUnit={
        idx === 2
          ? pageAds?.ATF_300
          : pageAds?.BTF_300
      }
      sizes={[
        [320, 250],
        [300, 250],
        [336, 280],
      ]}
      lazyload={true}
      width={300}
      height={250}
      // style={{ textAlign: "center" }}
    />
  );
});

function VideoWallItem({
  item = {},
  videowallCat,
  url,
  nextVideoIdx,
  idx,
  handlePlayNextVideo,
  orientation,
  shareUrlPrefix,
  language,
  pageAds,
  listLength,
  handleLoadMore,
}) {
  const playerRef = useRef();
  const wrapperRef = useRef();
  const headline = item?.display_headline || item?.headline;
  const videoIdKey = "local18_video";

  const getShareUrl = () => {
    if (orientation) {
      return `${shareUrlPrefix}/${item.slug}_${item[videoIdKey]}/`;
    } else {
      return item.posturl || item.url || item.weburl;
    }
  };

  const vastTag = {
    section_name: videowallCat,
    article_id: (language != "assam") ? item?.id?.split("-")[1] : item.story_id,
    city_name: videowallCat,
    district_name: videowallCat,
    language,
    state_name: language,
    video_type: "non-local18",
  };

  const { ref, inView } = useInView({
    threshold: idx === 0 ? 0.2 : 0.8, // if first video in the list play immediately
    // triggerOnce: false,
  });

  const [videoPlay, setVideoPlay] = useState({
    loading: false,
    played: false,
  });

  const checkPlayerExistsOnWindowOrNot = () => {
    return "refreshPubstackPlayers" in window;
  };

  const refreshPlayer = async () => {
    // check whether pubstack player is already exists in window or not and wait for it to load
    if (checkPlayerExistsOnWindowOrNot()) {
      (VIDEO_CONFIG[language].inHousePlayer && item?.video_streaming) ? window.refreshPubstackPlayers(item?.video_streaming) : window.refreshPubstackPlayers();
      return true;
    }
    await new Promise((resolve, reject) => {
      let int = setInterval(() => {
        if (checkPlayerExistsOnWindowOrNot()) {
          (VIDEO_CONFIG[language].inHousePlayer && item?.video_streaming) ? window.refreshPubstackPlayers(item?.video_streaming) : window.refreshPubstackPlayers();
          clearInterval(int);
          return resolve();
        }
      }, 100);
    });
    return true;
  };

  const handlePlay = async (vidId, postId) => {
    try{
      setVideoPlay({ ...videoPlay, loading: true });
      typeof ga !== "undefined" ? ga(
        "send",
        "event",
        "select_video_wall_related_videos",
        "click",
        videowallCat + "," + postId + "," + (parseInt(idx) + 1)
      ) : null;

      var thisPlayer;
      const loadIt = (playerWrapperEl) => {
        const playerEl =
          playerWrapperEl.getElementsByTagName("video")[0] ||
          playerWrapperEl
            ?.getElementsByTagName("iframe")[0]
            ?.contentWindow?.document?.getElementsByTagName("video")[0];
        if (playerEl) {
          setVideoPlay({ played: true, loading: false });
          clearInterval(thisPlayer);
          setTimeout(() => {
            playerEl.onended = () => {
              handlePlayNextVideo(idx + 1);
            };
            // window.pubstackvideo(playerEl.playerId).on("ended", () => {
            //   handlePlayNextVideo(idx + 1);
            // });
            playerEl.play();
          }, 200);
        }
      };

      const playerWrapperEl = playerRef.current;
      playerWrapperEl.setAttribute("data-pubstack-player", "true");
      playerWrapperEl.setAttribute("data-pubstack-config", "video-embed");
      playerWrapperEl.setAttribute(
        "class",
        "hidden player_wrapper vgrPlayerContainer"
      );
      playerWrapperEl.setAttribute("data-pubstack-guid", vidId);
      playerWrapperEl.setAttribute("data-property-platform", "mobile");
      playerWrapperEl.setAttribute("data-property-category", videowallCat);
      playerWrapperEl.setAttribute("data-embed-mode", "manual");
      playerWrapperEl.setAttribute("data-video-event", "Videowall");
      playerWrapperEl.setAttribute("data-language", vastTag.language);
      playerWrapperEl.setAttribute("data-city-name", vastTag.city_name);
      playerWrapperEl.setAttribute("data-section-name", vastTag.section_name);
      playerWrapperEl.setAttribute("data-article-id", vastTag.article_id);
      playerWrapperEl.setAttribute("data-district-name", vastTag.district_name);
      playerWrapperEl.setAttribute("data-video-type", vastTag.video_type);
      playerWrapperEl.setAttribute("data-request-url", "video-wall");
      playerWrapperEl.setAttribute("data-state-name", vastTag.state_name);

      playerWrapperEl.setAttribute("language", vastTag.language);
      playerWrapperEl.setAttribute("city_name", vastTag.city_name);
      playerWrapperEl.setAttribute("section_name", vastTag.section_name);
      playerWrapperEl.setAttribute("article_id", vastTag.article_id);
      playerWrapperEl.setAttribute("district_name", vastTag.district_name);
      playerWrapperEl.setAttribute("state_name", vastTag.state_name);
      playerWrapperEl.setAttribute("video_type", vastTag.video_type);
      playerWrapperEl.setAttribute("data-pubstack-player-name", "vidgyor");
      playerWrapperEl.setAttribute("id", `vidgyorPlayer${idx}`);

      playerWrapperEl.style.width = "100%";
      playerWrapperEl.style.height = "221px";

      await refreshPlayer();

      thisPlayer = setInterval(() => loadIt(playerWrapperEl), 100);
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (inView && videoPlay.played === false) {
      handlePlay(item[videoIdKey], (language != "assam") ? item?.id : item.story_id);
    } else if (inView && videoPlay.played === true) {
      const playerWrapperEl = playerRef.current;
      const playerEl =
        playerWrapperEl.getElementsByTagName("video")[0] ||
        playerWrapperEl
          ?.getElementsByTagName("iframe")[0]
          ?.contentWindow?.document?.getElementsByTagName("video")[0];
      playerEl.play();
    } else {
      if (videoPlay.played === true) {
        const playerWrapperEl = playerRef.current;
        const playerEl =
          playerWrapperEl.getElementsByTagName("video")[0] ||
          playerWrapperEl
            ?.getElementsByTagName("iframe")[0]
            ?.contentWindow?.document?.getElementsByTagName("video")[0];
        playerEl.pause();
      }
    }
    if (inView && listLength === idx + 1) {
      handleLoadMore();
    }
  }, [inView]);

  useEffect(() => {
    if (nextVideoIdx.position === idx) {
      const playerWrapperEl = wrapperRef.current;
      playerWrapperEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [nextVideoIdx]);

  // Read More description handle
  const [readMore, setReadMore] = useState(false);
  let descriptionClass = "wall_cont";
  const handleDescriptionClick = (postId) => {
    if (!readMore) {
      typeof ga !== "undefined" ? ga(
        "send",
        "event",
        "video_wall_read_more",
        "click",
        videowallCat + "," + postId + "," + (parseInt(idx) + 1)
      ) : null;
    }
    setReadMore((prev) => !prev);
  };
  if (readMore === true) {
    descriptionClass = descriptionClass + " expnd_contnt";
  }

  return (
    <>
      <div ref={ref} key={`wall_${vastTag.article_id}`} className="wall_row_section">
        <div ref={wrapperRef}>
          {idx === 0 ? <h1>{headline}</h1> : <h2>{headline}</h2>}
          <div>
            <figure className="main_img_sec">
              {(!videoPlay.played || videoPlay.loading) && (
                <Image
                  src={getImageUrl(item, language)}
                  alt=""
                  // width={"100%"}
                  height={221}
                  loading="lazy"
                />
              )}
              {!videoPlay.loading && !videoPlay.played && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="88"
                  height="88"
                  className="main_vid_icn "
                  viewBox="0 0 88 88"
                  onClick={() => handlePlay(item[videoIdKey], vastTag.article_id)}
                >
                  <defs>
                    <filter
                      id="Video"
                      x="0"
                      y="0"
                      width="88"
                      height="88"
                      filterUnits="userSpaceOnUse"
                    >
                      <feOffset dy="3" input="SourceAlpha"></feOffset>
                      <feGaussianBlur
                        stdDeviation="3"
                        result="blur"
                      ></feGaussianBlur>
                      <feFlood floodOpacity="0.161"></feFlood>
                      <feComposite operator="in" in2="blur"></feComposite>
                      <feComposite in="SourceGraphic"></feComposite>
                    </filter>
                  </defs>
                  <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#Video)"
                    // style="mix-blend-mode: hard-light;isolation: isolate"
                  >
                    <path
                      id="Video-2"
                      data-name="Video"
                      d="M465.147,1274.523a35,35,0,1,0,35,35A35,35,0,0,0,465.147,1274.523Zm15.107,37.255-9.895,5.736-10.231,5.934a2.779,2.779,0,0,1-1.389.393,2.306,2.306,0,0,1-1.169-.313,2.563,2.563,0,0,1-1.232-2.269v-23.306a2.51,2.51,0,0,1,1.16-2.281,2.556,2.556,0,0,1,2.631.065c6.814,3.947,13.679,7.928,20.126,11.667a2.483,2.483,0,0,1,0,4.375Z"
                      transform="translate(-421.15 -1268.52)"
                      fill="#fff"
                      opacity="0.9"
                    ></path>
                  </g>
                </svg>
              )}
              {videoPlay.loading && (
                <div className="loader-player">
                  <Loader
                    type="Oval"
                    color="#555555"
                    height={75}
                    width={75}
                    radius={10}
                  />
                </div>
              )}
              <div ref={playerRef} />
            </figure>
          </div>
          <p
            onClick={() => handleDescriptionClick(vastTag.article_id)}
            className={descriptionClass}
          >
            {item.intro}
          </p>
          <ul className="social_icns_sec">
            <li
              onClick={() =>
                typeof ga !== "undefined" ? ga(
                  "send",
                  "event",
                  "Social_Share",
                  "click",
                  headline + "," + vastTag.article_id + ",facebook"
                ) : null
              }
            >
              <a
                href={
                  "https://www.facebook.com/sharer.php?u=" +
                  getShareUrl() +
                  "&t=" +
                  headline
                }
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6.688"
                  height="13.313"
                  className="fb_icn"
                  viewBox="0 0 6.688 13.313"
                >
                  <path
                    id="Path_20"
                    data-name="Path 20"
                    d="M11.344-12.656V-10H10a.591.591,0,0,0-.5.328A1.42,1.42,0,0,0,9.344-9v1.656h2v2.688h-2V.656H6.656V-4.656h-2V-7.344h2V-10a2.654,2.654,0,0,1,.781-1.875,2.692,2.692,0,0,1,1.906-.781Z"
                    transform="translate(-4.656 12.656)"
                    fill="#eaeaea"
                  ></path>
                </svg>
              </a>
            </li>
            <li
              onClick={() =>
                typeof ga !== "undefined" ? ga(
                  "send",
                  "event",
                  "Social_Share",
                  "click",
                  headline + "," + vastTag.article_id + ",twitter"
                ) : null
              }
            >
              <a
                href={
                  "https://twitter.com/share?text=" +
                  headline +
                  "&url=" +
                  getShareUrl()
                }
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.938"
                  height="11.344"
                  className="twt_icn"
                  viewBox="0 0 13.938 11.344"
                >
                  <path
                    id="Path_22"
                    data-name="Path 22"
                    d="M14.969-10a6.315,6.315,0,0,1-1.625.469,2.894,2.894,0,0,0,1.25-1.594,5.625,5.625,0,0,1-1.812.688,2.864,2.864,0,0,0-2.125-.906,2.83,2.83,0,0,0-2,.844,2.866,2.866,0,0,0-.844,2.031,2.272,2.272,0,0,0,.094.656,8.451,8.451,0,0,1-3.328-.906A7.988,7.988,0,0,1,2-10.812a2.818,2.818,0,0,0-.375,1.422A2.837,2.837,0,0,0,1.969-8a2.8,2.8,0,0,0,.906,1,2.856,2.856,0,0,1-1.281-.344v.031a2.757,2.757,0,0,0,.641,1.828A2.881,2.881,0,0,0,3.875-4.5a2.844,2.844,0,0,1-.75.094,2.184,2.184,0,0,1-.531-.062,2.832,2.832,0,0,0,1,1.422,2.823,2.823,0,0,0,1.656.578,5.179,5.179,0,0,1-1.625.906,5.806,5.806,0,0,1-1.906.313q-.344,0-.687-.031a8.516,8.516,0,0,0,2.047.938A7.821,7.821,0,0,0,5.406,0a7.844,7.844,0,0,0,6.047-2.656,8.52,8.52,0,0,0,2.109-5.469L13.531-8.5A6.15,6.15,0,0,0,14.969-10Z"
                    transform="translate(-1.031 11.344)"
                    fill="#eaeaea"
                  ></path>
                </svg>
              </a>
            </li>
            <li
              onClick={() =>
                typeof ga !== "undefined" ? ga(
                  "send",
                  "event",
                  "Social_Share",
                  "click",
                  headline + "," + vastTag.article_id + ",whatsapp"
                ) : null
              }
            >
              <a
                href={
                  "whatsapp://send?text=" + headline + " - " + getShareUrl()
                }
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.313"
                  height="13.313"
                  className="whatapp_icn"
                  viewBox="0 0 13.313 13.313"
                >
                  <path
                    id="Path_23"
                    data-name="Path 23"
                    d="M11.156-4.687a.632.632,0,0,1,.3.172.561.561,0,0,1,.031.3,1.676,1.676,0,0,1-.141.516,1.125,1.125,0,0,1-.5.516,1.35,1.35,0,0,1-.656.219,1.173,1.173,0,0,1-.469.047,6.573,6.573,0,0,1-1.5-.516A5.567,5.567,0,0,1,6.266-4.969q-.7-.906-.781-1.047t-.344-.641a2.238,2.238,0,0,1-.25-1.125,1.717,1.717,0,0,1,.234-.937A2.18,2.18,0,0,1,5.5-9.156q.281-.25.469-.187h.313a.514.514,0,0,1,.156.031q.094.031.188.281l.469,1.25a.234.234,0,0,1,0,.281l-.156.281-.281.281a.416.416,0,0,0-.094.141.253.253,0,0,0,.031.2,5.13,5.13,0,0,0,.3.469,6.473,6.473,0,0,0,.578.719,4.871,4.871,0,0,0,.813.594l.5.25q.219.156.344-.031l.531-.625a.27.27,0,0,1,.188-.094.918.918,0,0,1,.219.031ZM8-12.656a6.616,6.616,0,0,1,4.719,1.938A6.616,6.616,0,0,1,14.656-6a6.616,6.616,0,0,1-1.937,4.719A6.616,6.616,0,0,1,8,.656,6.665,6.665,0,0,1,4.438-.375L1.344.656,2.375-2.437A6.665,6.665,0,0,1,1.344-6a6.616,6.616,0,0,1,1.938-4.719A6.616,6.616,0,0,1,8-12.656Zm0,1.313A5.346,5.346,0,0,0,4.219-9.781,5.346,5.346,0,0,0,2.656-6a5.3,5.3,0,0,0,.969,3.063L3-1l1.938-.625A5.3,5.3,0,0,0,8-.656a5.346,5.346,0,0,0,3.781-1.562A5.346,5.346,0,0,0,13.344-6a5.346,5.346,0,0,0-1.562-3.781A5.346,5.346,0,0,0,8-11.344Z"
                    transform="translate(-1.344 12.656)"
                    fill="#eaeaea"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {(idx + 1) % 3 === 0 && (
        <div className="clearfix vsp16 add add-li">
          <div className="addinner-box">
            <AdItem idx={idx} pageAds={pageAds} />
          </div>
        </div>
      )}

      <style global jsx>{`
        .wall_row_section .main_img_sec img {
          width: ${orientation && orientation === "portrait" ? "auto" : "100%"};
          height: 100%;
          display: block;
          background: #0000008a;
          opacity: 0.7;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .wall_row_section .main_img_sec {
          width: 100%;
          height: 221px;
          overflow: hidden;
          border: 1px solid #9b9b9b;
          margin-bottom: 10px;
          position: relative;
        }
      `}</style>

      <style jsx>{`
        .clearfix {
          clear: both;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .wall_row_section {
          border-bottom: 4px solid #272727;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .wall_row_section h2,
        .wall_row_section h1 {
          font-size: 20px;
          line-height: 26px;
          color: #ffd800;
          display: flex;
          font-weight: 700;
          padding: 5px 15px 5px;
          align-items: center;
          margin-bottom: 12px;
        }

        .main_vid_icn {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          display: block;
          cursor: pointer;
        }

        .wall_cont {
          font-size: 18px;
          line-height: 28px;
          color: #a2a2a2;
          font-weight: 400;
          margin-top: 18px;
          margin-bottom: 24px;
          height: 56px;
          overflow: hidden;
          padding: 0px 32px 0px 15px;
          position: relative;
        }
        .wall_cont:after {
          content: "";
          position: absolute;
          width: 10px;
          height: 7px;
          right: 20px;
          bottom: 4px;
          background: url("https://images.news18.com/stgrevamp-english/2023/02/arr_ow.png") right top no-repeat;
          transition: all 0.1s ease-in-out;
        }
        .wall_row_section .expnd_contnt {
          height: auto;
        }
        .wall_row_section .expnd_contnt:after {
          transform: rotate(-180deg);
        }
        .social_icns_sec {
          display: flex;
          padding: 0px 15px;
        }
        .social_icns_sec li {
          margin-right: 10px;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #797979;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .social_icns_sec li:last-child {
          margin-right: 0px;
        }
        .social_icns_sec li a {
          display: flex;
          align-items: center;
        }
        .hidden {
          display: none;
        }
        .loader-player {
          position: absolute;
          top: 50%;
          left: 50%;
          padding: 0;
          margin: 0;
          transform: translate(-50%, -50%);
        }
        .add {
          background: #dbdde3 !important;
          min-width: 300px;
          min-height: 296px;
        }
        .vsp16 {
          margin-top: 16px;
        }
        .addinner-box {
          background: #e8e9ed;
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: auto;
          padding: 0;
          box-sizing: border-box;
        }
        .addinner-box span {
          color: #797e90;
          font-size: 11px;
          text-align: center;
          padding: 2px 0 0;
          display: block;
          line-height: 16px;
        }
        .add-li {
          padding: 10px 0;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </>
  );
}

export default React.memo(VideoWallItem);
