import React, { useState, useEffect } from "react";
import { newVidgyorScript } from "../video.utils";
import SiteAd from "APP_COMMON/components/Ads/SiteAd";
import VideoWallItem from "./MTVideoWallItem";
import ErrorBoundary from "../../../../CommonUtils/errorBoundary";
import getConfig from "next/config";
import fetchUtility from "APP_COMMON/helpers/includes/sFetchUtility";
const { publicRuntimeConfig } = getConfig();
import * as VIDEO_CONFIG from "../video.config";

const PAGE_LIMIT = 3;

const VideoWall = (props) => {
  const { topPriorityData,siteConfig,pageAds} = props;
  const videowallCat = topPriorityData?.videowallCat;
  const category = videowallCat !== "All" ? videowallCat : "";
  const orientation = topPriorityData?.orientation;
  const url = topPriorityData.currentUrl;
  const shareUrlPrefix = topPriorityData?.shareUrlPrefix;
  let language = siteConfig?.lang;
  const videoIdKey = orientation ? "mongo_id_s" : language != "assam" ? "local18_video_s" : "local18_video";
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

  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [playerInterval, setPlayerInterval] = useState();
  useEffect(() => {
    try{
      if (playerInterval) {
        clearInterval(playerInterval);
      }
      try{
        if (!playerLoaded) {
          const timeInterval = setInterval(() => {
            if (!window.pubstackJSLoaded) {
              let env = siteConfig?.isEnv == "stg" ? "staging" : "production";
              !vid_exist && !VIDEO_CONFIG[language].inHousePlayer && newVidgyorScript(language, env);
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
    } catch(e) {
      console.log(e);
    }
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

  const [nextVideoIdx, setNextVideoIdx] = useState({ position: null });

  const handlePlayNextVideo = (idx) => {
    setNextVideoIdx({ position: idx });
  };

  // Handle Infinite Scroll
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  useEffect(() => {
    const fetchWallsData = async () => {
      // const response = await fetchUtility(`${publicRuntimeConfig.nodeApiAjaxUrl}/solr?start=${offset}&size=true&limit=${pageLimit}&filter=id,display_headline,headline,post_type,post_image,posturl,ff_source&qs=${subString}`, []);
      const offset =
        page === 2
          ? INITIAL_PAGE_LIMIT
          : INITIAL_PAGE_LIMIT + (page - 2) * PAGE_LIMIT;
      const apiData = await((language != "assam") ? fetchUtility({ api: `${siteConfig.clientApiUrl}/${VIDEO_CONFIG[language].siteCode}/get-article-list?offset=0&count=${INITIAL_PAGE_LIMIT}&filter={${category ? `%22${VIDEO_CONFIG.filterArr[language]["categories_slug"]}%22:%22${category}%22` : ''}%22ff_source%22:%22Hyperlocal%22,%22video_wall%22:true,%22not%22:{%22local18_video%22:%22%22}}&fields=story_id,images,display_headline,headline,weburl,weburl_r,local18_video`, 
      defaultValue: {}, _key: null, cache: {}, sprop: VIDEO_CONFIG[language].siteCode, page: 'video-wall', currentUrl: url }) 
      : fetchUtility({api:`${publicRuntimeConfig.siteUrl}api/elastic/query/?start=${offset}&limit=${PAGE_LIMIT}&qs=video_wall:true and ff_source:Hyperlocal${category && ` and ${VIDEO_CONFIG["filterArr"][language]["categories_slug"]}:(${category})`}&filter=ff_source,local18_video,display_headline,headline,post_image,intro,id,posturl,article_data,url,thumbnail,images,weburl,story_id,video_streaming,video_type`, extractor: (data) => data.data}, []));
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
      <div className="home_wrapper">
        <div className="page_sec">
          <div className="content_wrapper_mob">
            <div className="left_right_row">
              <div className="left_row">
                <div className="clearfix vsp16 add add-li">
                  <div className="addinner-box">
                    <SiteAd
                      slotId={"mobile_atf_320"}
                      adUnit={pageAds?.ATF_320}
                      sizes={[
                        [300, 250],
                        [336, 280],
                      ]}
                      // style={{ textAlign: "center" }}
                      width={336}
                      height={280}
                    />
                  </div>
                </div>

                {wallData &&
                  wallData.length > 0 &&
                  wallData.map((item, idx) => {
                    return (
                      <ErrorBoundary {...props}>
                        <VideoWallItem
                          key={`wall_item_${idx}`}
                          item={item}
                          idx={idx}
                          videowallCat={videowallCat}
                          url={url}
                          nextVideoIdx={nextVideoIdx}
                          handlePlayNextVideo={handlePlayNextVideo}
                          orientation={orientation}
                          shareUrlPrefix={shareUrlPrefix}
                          language={language}
                          pageAds={pageAds}
                          listLength={wallData.length}
                          handleLoadMore={handleLoadMore}
                        />
                      </ErrorBoundary>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        {/* {typeof props.pageAds !== "undefined" &&
        typeof props.pageAds.PG_1x1 !== "undefined" ? (
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
        )} */}
      </div>

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
        .home_wrapper {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.71) 0% 0% no-repeat padding-box;
          padding-bottom: 50px;
          box-sizing: border-box;
        }
        .page_sec {
          position: relative;
          padding-top: 0px;
        }
        .popup_close_sec {
          position: fixed;
          top: 10px;
          width: 22px;
          height: 22px;
          right: 10px;
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
          right: 10px;
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
          height: 38px;
          position: absolute;
          width: 38px;
          right: 3px;
          top: -8px;
          border-radius: 0px 0px 8px 8px;
          background: rgba(0, 0, 0, 0.9);
        }
        .content_wrapper_mob {
          width: 100%;
          background: #000000;
          margin: auto;
          padding: 10px 0px 20px 0px;
        }
        .left_right_row {
          display: flex;
          width: 100%;
          justify-content: space-between;
          margin-top: 15px;
        }
        .left_row {
          width: 100%;
        }
        .add {
          background: #dbdde3 !important;
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
};

export default React.memo(VideoWall);
