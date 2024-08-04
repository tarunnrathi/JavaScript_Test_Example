import * as VIDEO_CONFIG from "./video.config";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const newVidgyorScript = (language, env) => {
    let videoConfig = VIDEO_CONFIG[language]?.video_player;
    var PLAYER_LIBRARY = videoConfig?.PLAYER_LIBRARY;
    var PUBSTACK_VIDEO_CONFIG = {
        env: env,
        access_token: (env == "staging") ? videoConfig?.stg_access_token : videoConfig?.access_token,
        website: {
            id: videoConfig.id,
            c3: videoConfig.c3,
            title: videoConfig.title
        },
        base_href: videoConfig.base_href,
        version: videoConfig.version,
        publisher_id: videoConfig.publisher_id
    };
  
    var loadPubstackPlayer = function () {
        if (typeof window != undefined && window.pubstackJSLoaded) {
            return;
        }
  
        window.PUBSTACK_VIDEO_CONFIG = PUBSTACK_VIDEO_CONFIG;
    
        var head = document.getElementsByTagName('HEAD')[0];
        var script = document.createElement('script');
        script.src = PLAYER_LIBRARY + '?v=' + PUBSTACK_VIDEO_CONFIG.version;
        script.onerror = function (error) {
            console.log(error);
        };
        head.appendChild(script);
    };
    loadPubstackPlayer();
}

const getImageUrl = (item, language) => {
    try{
        let prefix = `${VIDEO_CONFIG[language].imagePrefix}`;
        if(publicRuntimeConfig.isEnv == "stg"){
            prefix = prefix.replace("https://images.news18.com/", "https://images.news18.com/staging/");
        }
        let image_url = `${item?.post_image || item?.thumbnail || item?.images?.url}?impolicy=website&width=300&height=200`;
        let post_image = `${prefix}${image_url}`;
        if (item?.video_encode_s) {
            const parsedVideoObj = JSON.parse(item?.video_encode_s);
            if(parsedVideoObj.thumbnail_url){
                let splitImg = parsedVideoObj?.thumbnail_url.split('uploads/');
                return (splitImg && splitImg[1]) ? `${prefix}${splitImg[1]}` : post_image;
            } else {
                return post_image;
            }
        } else {
            return (image_url?.indexOf('https://') > -1) ? image_url : post_image;
        }
    } catch(e) {
        console.log(e);
        return item?.post_image || item?.thumbnail || item?.images?.url;
    }
};

export {
    //scriptLoader,
    newVidgyorScript,
    getImageUrl
}