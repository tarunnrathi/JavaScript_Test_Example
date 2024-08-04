import Glide from "@glidejs/glide";
// import fetchUtility from "includes/sFetchUtility";
import getConfig from "next/config";
import React, { useEffect, useState } from "react";
// import moment from "moment";
import VideoImage from "components/Common/VideoImage";
// import InView from "react-intersection-observer";
import { newVidgyorScript } from "includes/article.util";
import * as ReactDOM from "react-dom";
import { getRedisDataByKeyWithCache, getTopVideos, getVideoStreamData } from "api/global/Common";
import { getCompleteURL } from "util/global/Helper";
import { photoGallerydateConversion } from "../../../helper/global";

const RelatedVideo = ({ isMobile = false }) => {
  const { publicRuntimeConfig } = getConfig();
  const [relatedVides, setRelatedVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // let isScroll = true;
  //  const liveTime=(time) => {
  //   return time
  //     .toString()
  //     .replace(
  //       /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
  //       '$1-$2-$3 $4:$5:$6'
  //     );
  // };
  const loadSmartPlayer = (vidStreamData, vid_exist) => {
    newVidgyorScript(vidStreamData, vid_exist);
  };
  const loadVideo = (index1, index2) => {
    const currVideo = relatedVides?.[index1];
    const articleDataCurVid = currVideo;

    const prevVideo = relatedVides?.[index2];

    const currVideoId = currVideo.story_id;
    const prevVideoId = prevVideo.story_id;

    const videoPlayerDiv = document.querySelector(`#content-${currVideoId}`);
    const innerDiv = (
      <VideoImage
        headline={currVideo.display_headline}
        image={
          currVideo?.images?.url ||
          publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
        }
        channelLogo=""
        videoId={
          articleDataCurVid.video_details?.mongo_id ||
          articleDataCurVid.local18_video
        }
        youtubeId={articleDataCurVid.youtubeid}
        caption={currVideo.display_headline}
        categories={"videos"}
        tags=""
        autoPlay={true}
        videosList={true}
        isMobile={isMobile}
        hola_player={articleDataCurVid.hola_player}
        videoUrl={articleDataCurVid?.video_details?.video_url}
        articleData={articleDataCurVid}
        // youtubeId={articleDataCurVid.youtubeid}
        eventName={"RelatedVideo_Carousel_Article"}
        slotIndex={currentIndex + 1}
      />
    );
    ReactDOM.render(innerDiv, videoPlayerDiv);
    ReactDOM.render(<></>, document.querySelector(`#content-${prevVideoId}`));
  };

  const handleScroll = (action) => {
    if (action === "next") {
      if (currentIndex < 4) {
        setCurrentIndex(currentIndex + 1);
        loadVideo(currentIndex + 1, currentIndex);
      } else {
        setCurrentIndex(0);
        loadVideo(0, 4);
      }
    } else {
      if (currentIndex === 0) {
        setCurrentIndex(4);
        loadVideo(4, 0);
      } else {
        setCurrentIndex(currentIndex - 1);
        loadVideo(currentIndex - 1, currentIndex);
      }
    }
  };

  const getStreamVideoObj = async (articleData, streamConfig) => {
    if (publicRuntimeConfig.inHousePlayer) {
        let vid_exist = false;
        const vidStreamData = await getVideoStreamData(articleData, false, streamConfig);
        if(vidStreamData && Object.keys(vidStreamData).length > 0) {
            vid_exist = true;
        }
        return { vid_exist, vidStreamData, ...articleData };
    }
    return articleData;
  };

  useEffect(() => {
    (async () => {
      const streamConfig = await getRedisDataByKeyWithCache("s3-video-config", "KHABARN18-", true);
      const data = await getTopVideos(true);
      const newData = [];
      const dataLength = data.length;
      for(let i = 0; i< dataLength; i++) {
        const artDt = await getStreamVideoObj(data[i], streamConfig)
        newData.push(artDt);
      }
      setRelatedVideos(newData || []);
      if (newData?.length) {
        setTimeout(() => {
          if (document.querySelector(".rtpvd")) {
            const glide = new Glide(`.rtpvd`, {
              type: "slider",
              autoplay: false,
              perView: 1,
              animationDuration: 1000,
              dragThreshold: false,
              swipeThreshold: false,
            });
            glide?.mount();
          }
        }, 100);
      }
      loadSmartPlayer(newData?.[0]?.vidStreamData, newData?.[0]?.vid_exist);
    })();
  }, []);
  if (!relatedVides.length) {
    return null;
  }
  return (
    <>
      <div className="rtpvd">
        <div className="rtpvdh">टॉप वीडियो</div>
        <div className="rtpvdsld">
          <div data-glide-el="track" className="rtpvdsldin">
            <ul>
              {relatedVides.map((itm, index) => {
                return (
                  <li key={"relatedVides" + index}>
                    <section id={`content-${itm.story_id}`} style={{ height: "260px"}}>
                      {index === 0 ? (
                        <VideoImage
                          headline={itm.display_headline}
                          image={
                            itm?.images?.url ||
                            publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                          }
                          channelLogo=""
                          videoId={
                            itm?.video_details?.mongo_id || itm.local18_video
                          }
                          caption={itm.display_headline}
                          categories={"videos"}
                          tags=""
                          autoPlay={index === 0 ? true : false}
                          videosList={true}
                          isMobile={isMobile}
                          hola_player={itm?.hola_player}
                          videoUrl={itm?.video_details?.video_url}
                          articleData={itm}
                          youtubeId={itm?.youtubeid}
                          eventName={"RelatedVideo_Carousel_Article"}
                          slotIndex={currentIndex + 1}
                        />
                      ) : (
                        ""
                      )}
                    </section>
                    <a href={getCompleteURL(itm.weburl_r, itm.weburl)}>
                      <figcaption>
                        <span>
                          <time
                            dateTime={photoGallerydateConversion(
                              itm?.created_at
                            )}
                          />
                          {photoGallerydateConversion(itm?.created_at)}
                        </span>
                        {itm?.display_headline}
                      </figcaption>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rtpvdar" data-glide-el="controls">
            <button
              type="button"
              data-glide-dir="<"
              onClick={() => handleScroll("prev")}
            ></button>
            <button
              type="button"
              data-glide-dir=">"
              onClick={() => handleScroll("next")}
            ></button>
          </div>
          <div data-glide-el="controls[nav]" className="rtpvdbt">
            {relatedVides.map((itm, index) => (
              <button
                key={index}
                type="button"
                data-glide-dir={`=${index}`}
                className={`${index === 0 ? "glide__bullet--active" : ""}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .rtpvd {
          margin: 20px 0;
        }
        .rtpvdh {
          background: #e1261d;
          height: 34px;
          line-height: 38px;
          font-weight: bold;
          color: #fff;
          font-size: 20px;
          padding: 0 25px;
        }
        .rtpvdsld {
          position: relative;
          background: #1c1c1c;
          padding: 20px 0 2px 0;
        }
        .rtpvdsld .rtpvdsldin {
          overflow: hidden;
          width: 600px;
          margin: auto;
        }
        .rtpvdsld ul {
          display: flex;
        }
        .rtpvdsld ul li {
          flex-shrink: 0;
          list-style: none !important;
        }
        .rtpvdsld ul li a figure {
          width: 600px;
          height: 338px;
          position: relative;
        }
        .rtpvdsld ul li a figure:before {
          content: "";
          z-index: 1;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/video_icon_1681135696.svg)
            0 0 no-repeat;
          width: 67px;
          height: 67px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -34px 0 0 -34px;
        }
        .rtpvdsld ul li a figure img {
          width: 600px;
          height: 338px;
        }
        .rtpvdsld ul li a figcaption {
          padding: 10px 0;
          font-size: 18px;
          font-weight: bold;
          line-height: 28px;
          color: #fff;
          width: 600px;
        }
        .rtpvdsld ul li a figcaption span {
          color: #989898;
          line-height: 18px;
          font-size: 10px;
          display: block;
          margin-bottom: 10px;
        }
        .rtpvdsld ul li section:first-child {
          height: 360px;
          position: relative;
          overflow: hidden;
        }
        .rtpvdar button {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 40%;
          left: 25px;
          border: none;
          background: none;
          outline: none;
          border-left: 4px solid #fff;
          border-top: 4px solid #fff;
          transform: rotate(-45deg);
          cursor: pointer;
        }
        .rtpvdar button:last-child {
          left: auto;
          right: 25px;
          transform: rotate(135deg);
        }
        .rtpvdbt {
          display: flex;
          gap: 2px;
          margin: 0 2px;
        }
        .rtpvdbt button {
          border: none;
          background: none;
          outline: none;
          width: 100%;
          height: 6px;
          background: #484848;
        }
        .rtpvdbt button.glide__bullet--active {
          background: #e1261d;
        }
        .closevdsnew {
          display: none;
        }
        @media screen and (max-width: 650px) {
          .rtpvdsld ul li section:first-child {
            height: 200px;
            position: relative;
            overflow: hidden;
          }
          .rtpvdh {
            font-size: 18px;
            padding: 0 10px;
          }
          .rtpvdsld {
            padding: 15px 10px 2px 10px;
          }
          .rtpvdsld ul li {
            margin: 0px 4px !important;
          }
          .rtpvdsld .rtpvdsldin {
            width: 100%;
          }
          .rtpvdsld ul li a figure,
          .rtpvdsld ul li a figure img {
            width: 100%;
            height: 190px;
          }
          .rtpvdsld ul li a figure:before {
            display: none;
          }
          .rtpvdsld ul li a figcaption {
            padding: 8px 0;
            font-size: 15px;
            line-height: 26px;
            width: 95%;
            margin-left: 10px;
          }
          .rtpvdar button {
            width: 15px;
            height: 15px;
            top: 32%;
          }
          .rtpvdbt button {
            height: 4px;
          }
        }
      `}</style>
    </>
  );
};

export default RelatedVideo;
