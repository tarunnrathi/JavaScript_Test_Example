import React, { useEffect, useState } from "react";
import { newVidgyorScript, getImageUrl } from "../video.utils";
import Image from "../../../../CommonUtils/Image";
import VideoWallItem from "./MTVideoWallItem";
import * as VIDEO_CONFIG from "../video.config";
import ErrorBoundary from "../../../../CommonUtils/errorBoundary";
import SiteAd from "APP_COMMON/components/Ads/SiteAd";
import fetchUtility from "APP_COMMON/helpers/includes/sFetchUtility";
const PAGE_LIMIT = 3;

const VideoWall = (props) => {
  const { topPriorityData, loadAd1x1, loadAdSlider1x1 ,siteConfig,pageAds} = props;
  const videowallCat = topPriorityData?.videowallCat;
  const category = videowallCat !== "All" ? videowallCat : "";
  const orientation = topPriorityData?.orientation;
  const url = topPriorityData.currentUrl;
  const shareUrlPrefix = topPriorityData?.shareUrlPrefix;
  let language = siteConfig?.lang;
  const videoIdKey = "local18_video";
  const INITIAL_PAGE_LIMIT = topPriorityData.initialPageLimit;
  const vid_exist = topPriorityData.vid_exist;
  const meta = topPriorityData.meta;
  const { streamConfig } = meta || {};

  const [wallData, setWallData] = useState(topPriorityData?.videoWalls);
  const [refreshing, setRefereshing] = useState(false);

  useEffect(() => {
    if (!refreshing && window.refreshPubstackPlayers) {
      window.refreshPubstackPlayers();
    }
  }, [refreshing]);

  const pauseAllPlayers = async () => {
    const allPlayers = document.getElementsByClassName("pubstack-vjs-tech");
    for (let player of allPlayers) {
      player.pause();
    }
  };

  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [playerInterval, setPlayerInterval] = useState();
  useEffect(() => {
    if (playerInterval) {
      clearInterval(playerInterval);
    }
    try{
      if (!playerLoaded) {
        const timeInterval = setInterval(() => {
          if (!window.pubstackJSLoaded) {
            let env = siteConfig?.isEnv == "stg" && orientation == "" ? "staging" : "production";
            !vid_exist && !VIDEO_CONFIG[language]?.inHousePlayer && newVidgyorScript(language, env);
            // scriptLoader(
            //   "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-bangla/v2/production-player.js?v=1.4",
            //   () => {
            //     setPlayerLoaded(true);
            //   }
            // );
          } else if (window.pubstackJSLoaded) {
            clearInterval(playerInterval);
            setPlayerLoaded(true);
          }
        }, 1000);
        setPlayerInterval(timeInterval);
      }
    } catch(e) {
      console.log(e);
    }
    return () => clearInterval(playerInterval);
  }, [playerLoaded]);

  // const [playerRefreshed, setPlayerRefreshed] = useState(false);
  // const [refreshPlayerInterval, setRefreshPlayerInterval] = useState();
  // useEffect(() => {
  //   if (refreshPlayerInterval) {
  //     clearInterval(refreshPlayerInterval);
  //   }
  //   if (!playerRefreshed) {
  //     const timeInterval = setInterval(() => {
  //       if (window.refreshPubstackPlayers) {
  //         window.refreshPubstackPlayers();
  //         setPlayerRefreshed(true);
  //       }
  //     }, 600);
  //     setRefreshPlayerInterval(timeInterval);
  //   }
  //   return () => clearInterval(refreshPlayerInterval);
  // }, [playerRefreshed]);

  // useEffect(() => {
  //   if (playerLoaded && window.refreshPubstackPlayers) {
  //     window.refreshPubstackPlayers();
  //   }
  // }, [playerLoaded]);

  const [nextVideoIdx, setNextVideoIdx] = useState({ position: null });
  const handlePlayNextVideo = (idx) => {
    setNextVideoIdx({ position: idx });
  };

  const handleRhsVideoClick = (data, position) => {
    try{
      typeof ga !== "undefined" ? ga(
        "send",
        "event",
        "select_video_wall_related_videos",
        "click",
        videowallCat + "," + (language != "assam") ? data.id : data.story_id + "," + position
      ) : null;
      typeof ga !== "undefined" ? ga("send", "pageview") : null;
      setNextVideoIdx({ position: null });
      window.sessionStorage.setItem("selectedVidIdForWall", data[videoIdKey]);
      const updatedWallData = wallData.filter((item) => item[videoIdKey] !== data[videoIdKey]);

      window.scrollTo({
        top: 354,
        behavior: "smooth",
      });
      setRefereshing(true);
      setTimeout(() => {
        setWallData([data, ...updatedWallData], () => {});
        setRefereshing(false);
      }, 800);
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try{
        setRefereshing(true);
        const videoId = window?.sessionStorage?.getItem("selectedVidIdForWall");
        if (videoId) {
            const wallObjForVideoId = topPriorityData?.videoWalls?.find(
                (item) => item[videoIdKey] === videoId
            );

            const updatedWallData = topPriorityData?.videoWalls?.filter(
                (item) => item[videoIdKey] !== videoId
            );
            wallObjForVideoId
                ? setWallData([wallObjForVideoId, ...updatedWallData])
                : setWallData(topPriorityData?.videoWalls);
            setRefereshing(false);
        } else {
            setWallData(topPriorityData?.videoWalls);
            setRefereshing(false);
        }
    } catch(e) {
        console.log(e);
    }
  }, []);

  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  useEffect(() => {
    const fetchWallsData = async () => {
      const offset =
        page === 2
          ? INITIAL_PAGE_LIMIT
          : INITIAL_PAGE_LIMIT + (page - 2) * PAGE_LIMIT;
          /*orientation === "portrait" ||
      orientation === "landscape"
        ? fetchUtility(
            `${
              publicRuntimeConfig.nodeApiAjaxUrl
            }/solr?start=${offset}&limit=${PAGE_LIMIT}&sort=update_date&qs=video_type_s:desk AND display_status_s:1 AND mongo_id_s:* AND video_rotation_s:${
              orientation === "landscape" ? "1" : "2"
            }${category && ` AND ${VIDEO_CONFIG["filterArr"][language]["categories_slug"]}:(${category})`}&filter=*`,
            []
          )
        : */
      const apiData = await ((language != "assam") ? 
      fetchUtility({ api: `${siteConfig.clientApiUrl}/${VIDEO_CONFIG[language].siteCode}/get-article-list?offset=0&count=${INITIAL_PAGE_LIMIT}&filter={${category ? `%22${VIDEO_CONFIG.filterArr[language]["categories_slug"]}%22:%22${category}%22` : ''}%22ff_source%22:%22Hyperlocal%22,%22video_wall%22:true,%22not%22:{%22local18_video%22:%22%22}}&fields=story_id,images,display_headline,headline,weburl,weburl_r,local18_video`, 
      defaultValue: {}, _key: null, cache: {}, sprop: VIDEO_CONFIG[language].siteCode, page: 'video-wall', currentUrl: url }) 
      : fetchUtility({api:`${VIDEO_CONFIG[language].url}api/elastic/query/?start=${offset}&limit=${PAGE_LIMIT}&qs=video_wall:true%20and%20ff_source:Hyperlocal${category && ` and ${VIDEO_CONFIG["filterArr"][language]["categories_slug"]}:${category}`}&filter=ff_source,local18_video,display_headline,headline,post_image,intro,id,posturl,article_data,url,thumbnail,images,weburl,story_id,video_streaming,video_type`, extractor: (data) => data.data}, []));
      //let response = language != "assam" ? apiData : await apiData.json();
      let response = apiData;
      if (
        response &&
        Array.isArray(response) &&
        response?.length < PAGE_LIMIT
      ) {
        setHasMoreData(false);
      }
      try{
        (VIDEO_CONFIG[language].inHousePlayer && Object.keys(response).length > 0) ? response.map((row, idx) => {
          let article_data = response[idx]?.article_data?.[0] ? JSON.parse(response[idx]?.article_data?.[0]) : null;
          let video_streaming = response[idx]?.video_streaming_s ? JSON.parse(response[idx]?.video_streaming_s) : article_data.video_streaming ? article_data.video_streaming : null;
          //console.log(video_streaming, "=======");
          if(video_streaming && !video_streaming?.ad_tag && !video_streaming?.ad_tag_desktop && !video_streaming?.ad_tag_pwa && !video_streaming?.player){
            //console.log("111111", streamConfig, video_streaming);
            if(response[idx]?.video_type_s == "desk"){
              video_streaming.ad_tag = !isMobile ? streamConfig.ad_tag_desktop : streamConfig.ad_tag_pwa;
              video_streaming.player = streamConfig.player;
            } else {
              video_streaming.ad_tag = !isMobile ? streamConfig.ad_tag_desktop_local : streamConfig.ad_tag_pwa_local;
              video_streaming.player = streamConfig.player_local;
            }
          }
          if(video_streaming){
            response[idx].video_streaming = {"success":true,"message":"Success!","data": {"videos":[video_streaming]}};
          } else {
            response[idx].video_streaming = {};
          }
        }) : '';
      } catch(e) {
        console.log(e);
      }
      setWallData([...wallData, ...response]);
    };
    if (page >= 2 && hasMoreData) {
      fetchWallsData();
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      {wallData && wallData.length > 0 && (
        <div className="home_wrapper">
          <div className="page_sec">
            <div className="content_wrapper">
              <div className="left_right_row">
                <div className="left_row">
                  {!refreshing &&
                    wallData
                      .filter((item, index) => index <= 2 || index >= 15)
                      .map((item, idx) => {
                        return (
                          <ErrorBoundary  {...props}>
                            <VideoWallItem
                              item={item}
                              idx={idx}
                              videowallCat={videowallCat}
                              url={url}
                              nextVideoIdx={nextVideoIdx}
                              handlePlayNextVideo={handlePlayNextVideo}
                              orientation={orientation}
                              shareUrlPrefix={shareUrlPrefix}
                              language={language}
                              listLength={wallData.length}
                              handleLoadMore={handleLoadMore}
                              pageAds={pageAds}
                            />
                            {/*(idx % 3 === 0 || idx == 1) && props?.pageAds?.BTF_728 ? (
                              <div className={"ad-place"}>
                                <SiteAd
                                  slotId={`BTF_728_ad_${idx}`}
                                  adUnit={props?.pageAds?.BTF_728}
                                  width={728}
                                  height={90}
                                  sizes={[[728, 90]]}
                                  // style={{ textAlign: "center" }}
                                />
                              </div>
                            ) : null*/}
                          </ErrorBoundary>
                        );
                      })}
                </div>
                <div className="right_row">
                  <div className="ads_sec">
                    {/* <span>विज्ञापन</span> */}
                    <SiteAd
                      adUnit={pageAds?.ATF_300}
                      sizes={[
                        [300, 250],
                        [336, 280],
                      ]}
                      width={336}
                      height={280}
                    />
                    {/* <img
                      src="https://tpc.googlesyndication.com/simgad/6535084307846547085"
                      alt=""
                    /> */}
                  </div>
                  {(wallData?.length > 3) ? <div className="rltd_vids_list_sec">
                    <h2 className="rlt_nws_hdng">{VIDEO_CONFIG[language]?.video_wall_right?.title}</h2>
                    <ul className="rltd_vids_list">
                      {wallData
                        .filter((item, index) => index >= 3 && index < 15)
                        .map((item, idx) => {
                          return (
                            <li
                              onClick={() => handleRhsVideoClick(item, idx + 4)}
                              className="rhs_list_item"
                            >
                              <div className="rltd_vids_rght">
                                <h4 className="hot_trending_title">
                                  {item.display_headline || item.headline}
                                </h4>
                              </div>
                              <div className="rltd_vids_img">
                                <Image
                                  src={getImageUrl(item, language)}
                                  alt={item.display_headline || item.headline}
                                  style={{ width: "100%" }}
                                  loading="lazy"
                                />
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  : null
                  }
                </div>
              </div>
            </div>
          </div>
          {typeof props.pageAds !== "undefined" &&
          typeof props.pageAds.PG_1x1 !== "undefined" && loadAd1x1 ? (
            <SiteAd
              slotId="PG_1x1"
              adUnit={props.pageAds.PG_1x1}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadonScroll={true}
              style={{ height: 0 }}
            />
          ) : (
            ""
          )}
          {typeof props.pageAds !== "undefined" &&
          typeof props.pageAds.PG_Slider_1x1 !== "undefined" && loadAdSlider1x1 ? (
            <SiteAd
              slotId="PG_Slider_1x1"
              adUnit={props.pageAds.PG_Slider_1x1}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadonScroll={true}
              style={{ height: 0 }}
            />
          ) : (
            ""
          )}
        </div>
      )}

    <style global jsx>{`
        .rltd_vids_img img {
          width: 120px;
          height: 80px;
          display: block;
          background: #0000008a;
          opacity: 0.7;
        }
    `}</style>
    <style jsx>{`
        * {
          margin: 0px;
          padding: 0px;
          box-sizing: border-box;
          list-style: none;
        }
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
        .home_wrapper {
          width: 100%;
          height: auto;
          background: #000;
          padding-bottom: 50px;
          margin-top: 0px;
          box-sizing: border-box;
        }
        .page_sec {
          position: relative;
          padding-top: 0px;
        }
        .popup_close_sec {
          position: sticky;
          top: 5px;
          z-index: 99999;
        }
        .popup_close {
          background: #fff 0% 0% no-repeat padding-box;
          margin-bottom: 10px;
          position: relative;
          width: 22px;
          height: 22px;
          border-radius: 100px;
          cursor: pointer;
          margin-top: -45px;
          margin-left: 100%;
        }
        .popup_close:before,
        .popup_close:after {
          position: absolute;
          content: " ";
          height: 11px;
          width: 2px;
          background-color: #000;
          left: 0px;
          transform: rotate(45deg);
          margin: auto;
          top: 1px;
          right: 0px;
          bottom: 0px;
        }
        .popup_close:before {
          transform: rotate(-45deg);
        }
        .popup_close_sec_bg:before {
          content: "";
          height: 22px;
          position: absolute;
          background: rgba(0, 0, 0, 0.9); /* background-color: #000;*/
          width: 22px;
          padding: 8px;
          top: -8px;
          right: -30px;
          border-radius: 0px 0px 8px 8px;
        }

        .content_wrapper {
          max-width: 1284px;
          background: #000000;
          margin: auto;
          padding: 10px 20px 20px 20px;
        }
        .left_right_row {
          display: flex;
          width: 100%;
          justify-content: space-between;
          margin-top: 33px;
        }
        .left_row {
          width: calc(100% - 330px);
          margin-right: 20px;
        }
        .rhs_list_item {
          cursor: pointer;
          margin-bottom: 2px;
        }
        .right_row {
          width: 300px;
        }
        .ads_sec {
          margin-bottom: 20px;
        }
        .ads_sec span {
          display: flex;
          font-size: 11px;
          line-height: 14px;
          height: 18px;
          color: #ffffff;
          font-weight: 400;
          background: #242424;
          align-items: center;
          justify-content: center;
          padding-top: 3px;
        }
        .rltd_vids_list_sec {
          display: block;
          margin-bottom: 20px;
          position: sticky;
          top: 51px;
        }
        .rlt_nws_hdng {
          font-size: 16px;
          line-height: 24px;
          color: #ffffff;
          font-weight: 700;
          background-color: #e1261d;
          display: flex;
          padding: 7px 7px 5px 40px;
          margin-bottom: 10px;
          align-items: center;
          position: relative;
        }
        .rlt_nws_hdng:before {
          content: "";
          width: 17px;
          position: absolute;
          height: 11px;
          background: url("https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/relatedvdsicon_1669351467.svg")
            left top no-repeat;
          left: 10px;
          top: 35%;
        }
        .rltd_vids_list {
          height: 700px;
          overflow-y: auto;
        }
        .rltd_vids_list li {
          display: flex;
          justify-content: space-between;
          padding: 10px 0px;
          border-bottom: 1px solid #383838;
          margin-right: 7px;
        }
        .rltd_vids_list li:first-child {
          margin-top: 0px;
          padding-top: 1px;
        }
        .rltd_vids_list li:last-child {
          border-bottom: none;
        }
        .rltd_vids_rght {
          width: calc(100% - 110px);
          height: 60px;
          overflow: hidden;
        }
        .rltd_vids_rght .hot_trending_title {
          font-size: 14px;
          line-height: 20px;
          color: #c4c4c4;
          font-weight: 700;
        }
        .rltd_vids_img {
          width: 120px;
          height: 80px;
        }
        .video-esicon {
          position: relative;
          width: 100%;
          height: 100%;
          display: block;
          border: 1px solid #9b9b9b;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
        }
        .video-esicon:after {
          content: "";
          background-image: url("images/videoicon.svg");
          width: 24px;
          height: 24px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          background-size: cover;
          background-repeat: no-repeat;
        }

        /* scrollbar css below */
        /* width */
        .rltd_vids_list::-webkit-scrollbar {
          width: 4px;
        }
        /* Track */
        .rltd_vids_list::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px grey;
          border-radius: 2px;
        }
        /* Handle */
        .rltd_vids_list::-webkit-scrollbar-thumb {
          background: #898989;
          border-radius: 2px;
          height: 180px;
        }
        /* Handle on hover */
        .rltd_vids_list::-webkit-scrollbar-thumb:hover {
          background: #898989;
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
    `}</style>
    </>
  );
};

export default VideoWall;
