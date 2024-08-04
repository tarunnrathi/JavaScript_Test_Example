import {
  getRedisDataByKeyWithCache,
  getTopVideos,
  getVideoStreamData,
} from "api/global/Common";
import { useEffect, useState } from "react";
import getConfig from "next/config";
import { newVidgyorScript } from "includes/article.util";
import VideoImage from "components/Common/VideoImage";
import { photoGallerydateConversion } from "../../../helper/global";
import * as ReactDOM from "react-dom";
import { logEvent } from "includes/googleAnalytic";

const { publicRuntimeConfig } = getConfig();

export default function TopVideoArticle({ isMobile = false }) {
  const [selectedVideoArticle, setSelectedVideoArticle] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);

  const getStreamVideoObj = async (articleData, streamConfig) => {
    if (publicRuntimeConfig.inHousePlayer) {
      let vid_exist = false;
      const vidStreamData = await getVideoStreamData(
        articleData,
        false,
        streamConfig
      );
      if (vidStreamData && Object.keys(vidStreamData).length > 0) {
        vid_exist = true;
      }
      return { vid_exist, vidStreamData, ...articleData };
    }
    return articleData;
  };

  const loadSmartPlayer = (vidStreamData, vid_exist) => {
    newVidgyorScript(vidStreamData, vid_exist);
  };

  const getVideoWithVideoDetails = async () => {
    const streamConfig = await getRedisDataByKeyWithCache(
      "s3-video-config",
      "KHABARN18-",
      true
    );
    const dataArray = await getTopVideos(true);
    const sortedData = dataArray.sort(
      (art_1, art_2) =>
        new Date(art_2.created_at) - new Date(art_1.created_at)
    );
    const newData = [];
    for (const data of sortedData) {
      const artDt = await getStreamVideoObj(data, streamConfig);
      newData.push(artDt);
    }
    if (newData.length) {
      setRelatedVideos(newData || []);
      setSelectedVideoArticle(newData[0]);
      loadSmartPlayer(newData[0]?.vidStreamData, newData[0]?.vid_exist);
    }
  };

  useEffect(() => {
    getVideoWithVideoDetails();
  }, []);

  const handleOnVideoClick = (video,ind) => {
    if(selectedVideoArticle.story_id === video.story_id) return null;

    const videoPlayerDiv = document.querySelector(`#content-${video.story_id}`);
    const innerDiv = (
      <VideoImage
        headline={video.display_headline}
        image={
          video?.images?.url ||
          publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
        }
        channelLogo=""
        videoId={video.video_details?.mongo_id || video.local18_video}
        youtubeId={video.youtubeid}
        caption={""}
        categories={"videos"}
        tags=""
        autoPlay={true}
        videosList={true}
        isMobile={isMobile}
        hola_player={video.hola_player}
        videoUrl={video?.video_details?.video_url}
        articleData={video}
        // youtubeId={video.youtubeid}
        eventName={"RelatedVideo_Carousel_Article"}
        slotIndex={video.story_id}
        isTopVideo={true}
      />
    );
    ReactDOM.render(innerDiv, videoPlayerDiv);
    ReactDOM.render(
      <></>,
      document.querySelector(`#content-${selectedVideoArticle.story_id}`)
    );
    setSelectedVideoArticle({ ...video });
    const loca18 = video?.video_details?.type === "Hyperlocal"?"local18":"non-local18";
    const device = isMobile?"Mobile":"Desktop" 
    const index = ind+1;
    const slot = "Slot "+index+"|"+device+"|"+loca18+"|"+"nonamp-hi";
    logEvent("Inarticle Top Videos Rail","Click",slot);
  };

  if (!relatedVideos.length) {
    return null;
  }

  return (
    <>
      <div className="rtpvdh"><span className="lft">टॉप वीडियो</span> <span className="rgt"><a href="/videos/">View All</a></span></div>
      <div className="vdwrap">
        <div className="vd_cont">
          {relatedVideos.map((itm, index) => {
            return (
              <section key={itm.story_id} id={`content-${itm.story_id}`}>
                {index === 0 ? (
                  <VideoImage
                    headline={itm.display_headline}
                    image={
                      itm?.images?.url ||
                      publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                    }
                    channelLogo=""
                    videoId={itm?.video_details?.mongo_id || itm.local18_video}
                    caption={""}
                    categories={"videos"}
                    tags=""
                    autoPlay={true}
                    videosList={true}
                    isMobile={isMobile}
                    hola_player={itm?.hola_player}
                    videoUrl={itm?.video_details?.video_url}
                    articleData={itm}
                    youtubeId={itm?.youtubeid}
                    eventName={"RelatedVideo_Carousel_Article"}
                    slotIndex={itm.story_id}
                    isTopVideo={true}
                  />
                ) : (
                  ""
                )}
              </section>
            );
          })}
        </div>
        <ul className="titlwrap">
          {relatedVideos.map((video,ind) => (
            <li
              key={video.story_id}
              className={
                video.story_id === selectedVideoArticle.story_id
                  ? "vactive"
                  : ""
              }
              onClick={() => handleOnVideoClick(video,ind)}
            >
              <span className="">
                <time
                  datetime={photoGallerydateConversion(video?.created_at)}
                  className=""
                ></time>
                {photoGallerydateConversion(video?.created_at)}
              </span>
              <p>{video?.display_headline}</p>
            </li>
          ))}
        </ul>
        <span className="swipe_btm"><img src="/images/lharrow.svg" height="22px" width="22px"/><p>Swipe Left For Next Video</p></span>
      </div>
      <style jsx global>{`
        .vdwrap {
          // border: 1px solid #e2e2e2;
          // border-radius: 4px;
          background: #1c1c1c;
          padding: 10px;
        }
        .titlwrap {
          display: flex;
          justify-content: space-between;
          overflow-x: scroll;
        }
        .titlwrap li:last-child {
          border: 0;
        }
        .titlwrap li {
          border-right: 1px solid #d5d5d5;
          padding: 0 10px !important;
          cursor: pointer;
          list-style: none !important;
        }
        .titlwrap li span {
          color: #989898;
          line-height: 18px;
          font-size: 10px;
          display: block;
          padding-left: 20px;
          position: relative;
        }
        .titlwrap li p {
          font-size: 14px;
          font-weight: bold;
          line-height: 24px;
          color: #fff;
          width: 220px;
          margin: 5px 0 10px;
        }
        .titlwrap li:first-child {
          padding: 0;
        }
        .vd_cont {
          // height: 300px;
          margin: 0 0 10px;
        }
        .rtpvdh {
            background: #e1261d;
            height: 34px;
            line-height: 38px;
            font-weight: bold;
            color: #fff;
            font-size: 20px;
            padding: 0 25px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
        }
        .rtpvdh .rgt{line-height: 30px;} 
        .rtpvdh .rgt a {
          font-size: 14px;
          color: #fff;
        }
        .titlwrap li.vactive {
          background-color: #303030;
          padding: 5px 10px 0 !important;
        }
        .titlwrap li.vactive span {
          color: #7E7E7E;
        }
        .titlwrap li span:before {
          content: "";
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/v-icon.svg);
          width: 18px;
          height: 18px;
          position: absolute;
          left: -2px;
          top: 0px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
        .swipe_btm {
          display: none;
        }
        @media (max-width: 767px) {
          .titlwrap li p {
            width: 165px;
            line-height: 22px;
            font-size: 13px;
          }
          .titlwrap li span {font-size: 11px;}
          .titlwrap li:first-child {margin: 0 !important;}
          .swipe_btm {
            display: flex;
            justify-content: center;
            padding: 10px 0 0;
          }
          .swipe_btm img { width: auto;}
          .swipe_btm p {
            color: #fff;
            font-size: 14px;
            line-height: 22px;
            margin-bottom: 0;
            margin-left: 10px;
          }
          .rtpvdh { padding: 0 10px;}
        }
        .closevdsnew{   
          position: absolute;
          width: 20px;
          height: 20px;
          top: 2px;
          right: 2px;
          z-index: 1;
          text-align: center;
          line-height: 20px;
          font-size: 15px;
          font-family: arial;
          font-weight: bold;
          color: #fff;
          cursor: pointer;
          display:none;
        }
        .vd_cont > section {
          position: relative;
        }
        .titlwrap::-webkit-scrollbar {
          height: 6px;
        }
        
        .titlwrap::-webkit-scrollbar-track {
          background: #484848;
        }
        
        .titlwrap::-webkit-scrollbar-thumb {
          background-color: #e1261d;
        }
       
      `}</style>
    </>
  );
}
