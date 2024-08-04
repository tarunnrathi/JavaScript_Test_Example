import * as VIDEO_CONFIG from "../CommonSrc/CommonComponents/videoWall/video.config";
import fetchUtility from "APP_COMMON/helpers/includes/sFetchUtility";

const getVideoWallProps = async ({ _key, fromCache = false, currentUrl, urlParam, isMobile, siteConfig }) => {
  let shareUrlPrefix = "",
    category = '', sharedVidId = urlParam?.video_id || "", orientation = null, categoryName = null,
    initialPageLimit = 5, errMessage = '';
  let vidStreamData = {}, vid_exist = false, streamConfig = {}, streamingVideos = [];
  const { apiUrl, lang: language } = siteConfig;
  try {
    category = urlParam.cat || "";
    categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    initialPageLimit = isMobile ? 5 : sharedVidId ? 14 : 15;
    const filter = {
      // ...(category ? { `${VIDEO_CONFIG.filterArr[language]["categories_slug"]}`: category}: { }),
      ff_source: "Hyperlocal",
      video_wall: true,
      not: { local18_video: "" }
    }
    const apiCall = `${apiUrl}/${VIDEO_CONFIG[language].siteCode}/get-article-list?offset=0&count=${initialPageLimit}&filter=${JSON.stringify(filter)}&fields=story_id,images,display_headline,headline,weburl,weburl_r,local18_video`;
    const videoWalls = await fetchUtility({ api: apiCall, defaultValue: {}, _key: null, cache: {}, sprop: VIDEO_CONFIG[language].siteCode, page: 'video-wall', currentUrl });
    let firstVideoData=[];
    if(videoWalls)
    {
      let apiCall1=`${apiUrl}/${VIDEO_CONFIG[language].siteCode}/get-article?article_id=${videoWalls[0]["story_id"]}`
      firstVideoData=await fetchUtility({ api: apiCall1, defaultValue: {}, _key: null, cache: {} });
    }   
    // calculate video streaming if flag is on
    if (VIDEO_CONFIG[language].inHousePlayer) {
      streamConfig = await fetchUtility(`${apiUrl}/data/s3-video-config`, {});
      for (let i = 0; i < videoWalls?.length; i++) {
        let article_data = videoWalls[i]?.article_data?.[0] ? JSON.parse(videoWalls[i]?.article_data?.[0]) : null;
        //console.log(article_data.video_streaming, "------");
        let video_streaming = videoWalls[i]?.video_streaming_s ? JSON.parse(videoWalls[i]?.video_streaming_s) : article_data.video_streaming ? article_data.video_streaming : null;
        //console.log(video_streaming, "=======");
        if (video_streaming && !video_streaming?.ad_tag && !video_streaming?.ad_tag_desktop && !video_streaming?.ad_tag_pwa && !video_streaming?.player) {
          //console.log("111111", streamConfig, video_streaming);
          if (videoWalls[i]?.video_type_s == "desk") {
            video_streaming.ad_tag = !isMobile ? streamConfig.ad_tag_desktop : streamConfig.ad_tag_pwa;
            video_streaming.player = streamConfig.player;
          } else {
            video_streaming.ad_tag = !isMobile ? streamConfig.ad_tag_desktop_local : streamConfig.ad_tag_pwa_local;
            video_streaming.player = streamConfig.player_local;
          }
        }
        if (video_streaming) {
          streamingVideos.push(video_streaming);
          videoWalls[i].video_streaming = { "success": true, "message": "Success!", "data": { "videos": [video_streaming] } };
        } else {
          videoWalls[i].video_streaming = {};
        }
      }
      if (streamingVideos?.length > 0) {
        //vidStreamData = {"success":true,"message":"Success!","data": {"videos":streamingVideos}};
        vid_exist = Object.keys(streamingVideos || []).length > 0;
      }
    }
    return {
      _key,
      fromCache,
      data: {
        videoWalls,
        firstVideoData,
        shareUrlPrefix,
        orientation,
        category,
        initialPageLimit,
        videowallCat: category || "All",
        meta: { errMessage, apiCall, vidStreamData, vid_exist, streamConfig }
      }
    }
  } catch (e) {
    console.log(e);
    errMessage = e.message;
  }
}

export {
  getVideoWallProps
}