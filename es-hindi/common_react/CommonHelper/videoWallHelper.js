import * as VIDEO_CONFIG from "../CommonSrc/CommonComponents/videoWall/video.config";
import moment from "moment";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import fetchUtility from "includes/sFetchUtility";
import { capitalize } from "./commonHelper";

const getVideoWallProps = async (language, currentUrl, urlParam, isAmp, isMobile, menuData, protocol, host, jsonLdForWebPage, jsonLdForHomeSiteNavigation, getSetTargettingValues, Data, config) => {
    let videoWallForVidId = [], videoWalls = [], wallType = "video-wall", shareUrlPrefix = "", 
    category = '', sharedVidId = urlParam?.video_id || "", orientation = null, categoryName = null, pageSeo = {}, pageAds = {},
     initialPageLimit = 5, errMessage = '', apiCall = ``;
    let vidStreamData = {}, vid_exist = false, streamConfig = {}, streamingVideos = [];
    const { etl = false } = config || {};
    try{
        
        const getOrientation = () => {
            if (currentUrl.includes("shorts")) {
                wallType = "shorts";
                shareUrlPrefix = protocol + host + "/" + wallType;
                return "portrait";
            } else if (currentUrl.includes("video-list")) {
                wallType = "video-list";
                shareUrlPrefix = protocol + host + "/" + wallType;
                return "landscape";
            }
            return "";
        };

        category = urlParam.cat || "";

        // shared video id for the video to be played at first position
        /*if (currentUrl.includes("vdid")) {
            sharedVidId = currentUrl.split("vdid_")[1].split("/")[0];
            category = ""; // remove category filter if search is for particular video id, filter results based on latest videos irrespective of category
            if (currentUrl.includes("-vdid")) {
              let categoryUrlArray = currentUrl.split("-vdid_")[0].split("/");
              category = categoryUrlArray[categoryUrlArray.length - 1];
            }
        }*/

        orientation = getOrientation(); // rotation - landscape|portrait form of videos
        categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        initialPageLimit = isMobile ? 5 : sharedVidId ? 14 : 15;
        let canonicalUrl = currentUrl;
        apiCall = `${publicRuntimeConfig.siteUrl.replace('betaassam', 'assam')}api/elastic/query/?limit=${initialPageLimit}&sort=updated_at&qs=video_wall:true%20and%20ff_source:Hyperlocal${category && ` and ${VIDEO_CONFIG["filterArr"][language]["categories_slug"]}:${category}`}&filter=ff_source,local18_video,display_headline,headline,post_image,intro,id,posturl,article_data,url,thumbnail,images,weburl`;
        let _videoWalls = [];
        try{
          _videoWalls = 
            (etl == true && language == "hindi") ? await fetchUtility(`${publicRuntimeConfig.apiUrl}get-article-list?count=${initialPageLimit}&offset=0&fields=ff_source,local18_video,display_headline,headline,weburl,weburl_r,images,story_id,intro&filter={${category && `"categories.slug":"${category}",`}"ff_source":"Hyperlocal","video_wall":true,"not":{"local18_video":""}}`, []) : 
            (language == "lokmat") ? await fetchUtility(`${publicRuntimeConfig.apiUrl}v1/mar/get-article-list?offset=0&count=${initialPageLimit}&filter={${category ? `%22${VIDEO_CONFIG.filterArr[language]["categories_slug"]}%22:%22${category}%22` : ''},%22ff_source%22:%22Hyperlocal%22,%22video_wall%22:true,%22not%22:{%22local18_video%22:%22%22}}&fields=story_id,images,display_headline,headline,weburl,weburl_r,local18_video`, [])
            : (language != "assam") ? await fetchUtility(`${publicRuntimeConfig.apiUrl}/solr?limit=${initialPageLimit}&sort=update_date&qs=video_wall_i:1 AND ff_source:hyperlocal AND -local18_video_s:""${category && ` AND ${VIDEO_CONFIG["filterArr"][language]["categories_slug"]}:(${category})`}&filter=ff_source,local18_video_s,display_headline,headline,post_image,intro,id,posturl,article_data,url,thumbnail,video_streaming_s,video_type_s`, [])
            : /*await fetchUtility({api:apiCall, extractor: (data) => data.data}, [])*/
            await Data?.queryElastic([
              {
                //sort: "updated_at:desc",
                query: `video_wall:true and ff_source:Hyperlocal${category && ` and ${VIDEO_CONFIG["filterArr"][language]["categories_slug"]}:${category}`}`,
                limit: initialPageLimit,
                filter: "ff_source,local18_video,display_headline,headline,post_image,intro,id,posturl,article_data,url,thumbnail,images,weburl,story_id,video_streaming,video_type",
              }
            ]);
          if(language == "assam"){
            videoWalls = _videoWalls && _videoWalls[0];
          } else {
            videoWalls = _videoWalls;
          }
        } catch(e) {
          console.log(e);
          errMessage = e.message;
        }
        // calculate video streaming if flag is on
        try{
          if(VIDEO_CONFIG[language].inHousePlayer){
            streamConfig = await fetchUtility(`${publicRuntimeConfig.apiUrl}/data/s3-video-config`, {});
            for (let i = 0; i < videoWalls?.length; i++) {
              let article_data = videoWalls[i]?.article_data?.[0] ? JSON.parse(videoWalls[i]?.article_data?.[0]) : null;
              //console.log(article_data.video_streaming, "------");
              let video_streaming = videoWalls[i]?.video_streaming_s ? JSON.parse(videoWalls[i]?.video_streaming_s) : article_data.video_streaming ? article_data.video_streaming : null;
              //console.log(video_streaming, "=======");
              if(video_streaming && !video_streaming?.ad_tag){
                if(!video_streaming?.ad_tag_desktop && !video_streaming?.ad_tag_pwa){
                  //console.log("111111", streamConfig, video_streaming);
                  if(videoWalls[i]?.video_type_s == "desk"){
                    video_streaming.ad_tag_desktop = streamConfig.ad_tag_desktop;
                    video_streaming.ad_tag_pwa = streamConfig.ad_tag_pwa;
                  } else {
                    video_streaming.ad_tag_desktop = streamConfig.ad_tag_desktop_local;
                    video_streaming.ad_tag_pwa = streamConfig.ad_tag_pwa_local;
                  }
                }
              }
              if(video_streaming && !video_streaming?.player){
                if(videoWalls[i]?.video_type_s == "desk"){
                  video_streaming.player = streamConfig.player;
                } else {
                  video_streaming.player = streamConfig.player_local;
                }
              }
              if(video_streaming && videoWalls[i]?.article_data?.[0]){
                let articleData = JSON.parse(videoWalls?.[0]?.article_data?.[0]);
                video_streaming.thumbnail = articleData?.images_all_sizes?.url;
              }
              if(video_streaming){
                streamingVideos.push(video_streaming);
                videoWalls[i].video_streaming = {"success":true,"message":"Success!","data": {"videos":[video_streaming]}};
              } else {
                videoWalls[i].video_streaming = {};
              }
            }
            if(streamingVideos?.length > 0){
              //vidStreamData = {"success":true,"message":"Success!","data": {"videos":streamingVideos}};
              vid_exist = Object.keys(streamingVideos || []).length > 0;
            }
          }
        } catch(e) {
          console.log(e);
        }
        let title = '', description = '', keywords = '';
        try{
          title = VIDEO_CONFIG[language]?.seo?.title; 
          description = VIDEO_CONFIG[language]?.seo?.description; 
          keywords = VIDEO_CONFIG[language]?.seo?.keywords; 
        } catch(e) {
          console.log(e);
        }

        // set page seo
        pageSeo = {
            title: title ? title : `${categoryName} Latest Videos: Watch ${categoryName} New Videos Online - News18 ${capitalize(language)}`,
            description: description ? description : `${categoryName} Breaking Videos: Watch ${categoryName} Latest Videos Online on ${capitalize(language)} News18.`,
            keywords: keywords ? keywords : `${categoryName} Breaking Videos, ${categoryName} Latest Videos, ${categoryName} New Videos, ${categoryName} Breaking News, News18 ${capitalize(language)}`,
            canonical: isAmp ? canonicalUrl.replace("amp/", "") : canonicalUrl,
            og_image: VIDEO_CONFIG[language].logo,
            pageUrl: `${publicRuntimeConfig.siteUrl}video-wall/${
              category ? `${category}/` : ""
            }`,
            isVideowall: true,
            cat: urlParam.cat || "",
            page: "videowall",
        };
        
        if(jsonLdForWebPage){
          pageSeo.jsonLdForWebPage = jsonLdForWebPage(
              pageSeo.title,
              pageSeo.description,
              pageSeo.keywords,
              `${publicRuntimeConfig.siteUrl}video-wall/${
              category ? `${category}/` : ""
              }`,
              "",
              false
          ) || "";
        }

        //pageSeo.jsonLdForNewsMediaOrganization = jsonLdForNewsMediaOrganization();
        if(jsonLdForHomeSiteNavigation){
          pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(menuData, isMobile);
        }
        if (videoWalls[0] && videoWalls[0]["article_data"]) {
          pageSeo.jsonLdForVideoObject = jsonLdForNonYTVideoObject(
            language,
            JSON.parse(videoWalls[0]["article_data"]),
            pageSeo.description,
            pageSeo.keywords
          );
        }

        pageAds = isMobile ? videowallMobileAds(language) : videowallAds(language);
        pageAds.setTargetingValues = getSetTargettingValues({
            headline: pageSeo.title,
            description: pageSeo.description,
            seo_keywords: pageSeo.keywords,
            weburl: currentUrl,
            section: "VideoWall",
            content_type: "video",
            block_ads: "no",
            district: category,
        });
    } catch(e) {
        console.log(e);
        errMessage = e.message;
    }
    return {
        videoWalls,
        pageSeo,
        pageAds,
        shareUrlPrefix,
        orientation, 
        category,
        initialPageLimit,
        videowallCat: category || "All",
        meta: {errMessage, apiCall, vidStreamData, vid_exist, streamConfig, etl}
    }
}

const videowallMobileAds = (language) => {
    return (VIDEO_CONFIG[language].ads?.mobile) ? VIDEO_CONFIG[language].ads.mobile : {
      SHOSH_OOP:
        "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_SHOSH_OOP",
      SKIN_OOP:
        "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_SKIN_OOP",
      PG_1x1:
        "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_PG_1x1",
      PG_Slider_1x1:
        "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_PG_SLIDER_1x1",
    };
}

const videowallAds = (language) => {
    return  (VIDEO_CONFIG[language].ads?.desktop) ? VIDEO_CONFIG[language].ads?.desktop : {
        ATF_728: `NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
        header_ATF_728: `NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
        ATF_300 : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_LOCAS18_NWS_VDO_AS_ROS_ATF_300',
        Shosh_OOP_id : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_Shosh_OOP',
        Skin_OOP_id  : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_Skin_OOP',
        PG_1x1 : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_PG_1x1',
        PG_Slider_1x1: 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_PG_SLIDER_1x1'
    };
}

const limitChar = (str = "", length) => {
    if (str.length < length) {
      return str;
    }
  
    return str.substring(0, length) + "...";
};


const stripTags = (str = "") => {
    return str.replace(/(<([^>]+)>)/gi, "");
};

const jsonLdForNonYTVideoObject = (language, post_data = [], pageDescription, keywords="") => {
    let json_ld_array = {};
    try{
      if (
        typeof post_data !== "undefined" &&
        Object.keys(post_data).length > 0
      ) {
        const formatDuration = (duration) => moment.utc(duration?.split(".")[0]*1000).format("[T]HH[H]mm[M]ss[S]");
        const formatNewDuration = (duration) => {
          const durationArray = duration?.split(":");  
          if(durationArray.length>2){
            const totalDurationInSec = parseInt(durationArray[0])*60*60 + parseInt(durationArray[1])*60 + parseInt(durationArray[2]);
            return moment.utc(totalDurationInSec*1000).format("[T]HH[H]mm[M]ss[S]")
          }else if(durationArray.length === 2){
            const totalDurationInSec = parseInt(durationArray[0])*60 + parseInt(durationArray[1]);
            return moment.utc(totalDurationInSec*1000).format("[T]HH[H]mm[M]ss[S]")
          }
        } 
        let article_headline = typeof post_data["article_headline"] !== "undefined" ? post_data["article_headline"] : post_data["headline"];
        if (typeof post_data["article_headline"] !== "undefined" && post_data["article_headline"] != "") {
          article_headline = post_data["article_headline"];
        } else {
          article_headline = post_data["headline"] || post_data["title"];
        }
        json_ld_array["@context"] = "https://schema.org";
        json_ld_array["@type"] = "VideoObject";
        json_ld_array["name"] = limitChar(article_headline, 107);
        json_ld_array["headline"] = article_headline;
        json_ld_array["description"] = stripTags(post_data["intro"]) || pageDescription;
        json_ld_array["thumbnailUrl"] = post_data["images"] ? post_data["images"]["url"] : post_data["thumbnail"];
        json_ld_array["uploadDate"] = post_data["timestampCreationDate"] || post_data["creation_date"] || "";
        json_ld_array["datePublished"] = post_data["timestampCreationDate"] || post_data["creation_date"] || "";
        json_ld_array["dateModified"] = post_data['timestampUpdateDate']? post_data['timestampUpdateDate'] : (post_data['timestampCreationDate'] || post_data["creation_date"] ? post_data['timestampCreationDate'] || post_data["creation_date"] : "");
        json_ld_array["keywords"] = keywords;
        if(post_data?.video_streaming && Object.keys(post_data?.video_streaming).length > 0){
          let _seconds = '';
          try{
            _seconds = post_data?.video_streaming?.["duration"];
            if(_seconds?.indexOf(":") > -1){
              _seconds = _seconds.split(":")[0] * 60 + _seconds.split(":")[1];
            }
          } catch(e) {
            console.log(e);
          }
          json_ld_array["duration"] = formatDuration(_seconds);
          let mp4_obj = post_data?.video_streaming?.mp4 ? [{"src" :post_data?.video_streaming?.mp4}] : post_data?.video_streaming?.sources?.filter((row) => (row.type == "video/mp4"));
          //console.log(mp4_obj, mp4_obj?.[0]?.["src"].split("hdnts"));
          //let postfix = "hdnts=exp=1748086003~acl=/*~hmac=1a7f5180dcc6cd7600edf87c39c7d1bf2b8c48d3ada30a598dcdfba04de897ec";
          let mp4_stream = (mp4_obj?.[0]?.["src"]) ? mp4_obj?.[0]?.["src"].split("?")[0] : post_data?.video_streaming?.sources[0]["src"];
          json_ld_array["contentUrl"] = mp4_stream?.replace("https://nw18videostorage.blob.core.windows.net/", "https://media-assets.nw18.com/");
        } else {    
          json_ld_array["duration"] = (post_data["ff_video_duration"] && formatDuration(post_data["ff_video_duration"])) || (post_data["ff_video_duration_s"] && formatDuration(post_data["ff_video_duration_s"])) || (post_data["video_encode"]?.duration && formatNewDuration(post_data["video_encode"]?.duration)) || "";
          json_ld_array["contentUrl"] = post_data["ff_video_mp4_path"]?.replace("https://nw18videostorage.blob.core.windows.net/", "https://media-assets.nw18.com/") ||
          post_data["ff_video_mp4_path_s"]?.replace("https://nw18videostorage.blob.core.windows.net/", "https://media-assets.nw18.com/") ||
          post_data["video_encode"]?.video_url || "";
        }
        json_ld_array["embedUrl"] = post_data["weburl"];
        json_ld_array["url"] = post_data["weburl"];
        json_ld_array["interactionCount"] = Math.floor(Math.random() * (2271 - 2262 + 1) + 2262);
        json_ld_array["publisher"] = {
          "@type": "Organization",
          name: VIDEO_CONFIG[language].name ? VIDEO_CONFIG[language].name : "News18",
          url: VIDEO_CONFIG[language].url ? VIDEO_CONFIG[language].url : "https://www.news18.com/",
          logo: {
            "@type": "ImageObject",
            url: VIDEO_CONFIG[language].logo ? VIDEO_CONFIG[language].logo : "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/kannada_600x60_1612341990.png",
            width: 600,
            height: 60,
          },
        };
      }
      if (json_ld_array["thumbnailUrl"] === "") {
        json_ld_array["thumbnailUrl"] = publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH;
      }
    } catch(e) {
      console.log(e);
    }
    return json_ld_array;
};

export {
    getVideoWallProps
}