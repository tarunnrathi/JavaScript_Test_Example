
/*const getFilterVal = (language, type, val) => {
    let filter = "";
    try{
        switch(language) {
            case "hindi": 
                if(type == "categories_slug"){
                    filter = `${val && ` AND category_slug:(${val})`}`;
                }
            break;
        }
    } catch(e) {
        console.log(e);
    }
    return filter;
}*/
let stg_access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjhjZWFkYzUxZmQzZjBjNDBhZGE4ZTgiLCJzY29wZSI6IklOX0hPVVNFIiwic2Vzc2lvbl9pZCI6IjMyODM3MWJiLWNkNGYtNGNjNi05MDlkLWIwMTVmOTU4YTAxZSIsImZpcnN0bmFtZSI6IlByZWV0YW0iLCJsYXN0bmFtZSI6IkNoYWtyYWJvcnR5IiwiZW1haWxfaWQiOiJQcmVldGFtLkNAbncxOC5jb20iLCJpYXQiOjE3MTY3ODY5OTksImV4cCI6MTc0ODMyMjk5OX0.Y67EoilsWBqmDuUyxJAHLqgdOn1CbfTaF8fjhEIolQs',
access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjhjZGM0ZDFmZGJhYjVjOTI4MTY4Y2YiLCJzY29wZSI6IklOX0hPVVNFIiwic2Vzc2lvbl9pZCI6IjNhZTY5MWQ0LWFmODgtNGRjMC05NGFhLTRkNzg0Y2Q2ZTUzOSIsImZpcnN0bmFtZSI6IlByZWV0YW0iLCJsYXN0bmFtZSI6IkNoYWtyYWJvcnR5IiwiZW1haWxfaWQiOiJQcmVldGFtLkNAbncxOC5jb20iLCJpYXQiOjE3MTY3ODY4NzMsImV4cCI6MTc0ODMyMjg3M30.xBmWsOROTrS0ky94A971lzOU9javMno1XJ3joor_WJo';

const VIDEO_CONFIG = {
    filterArr: {
        "hindi" : {
            "categories_slug" : "subcategory_slug_ss"
        },
        "english" : {
            "categories_slug" : "category_slug_ss"
        },
        "punjabi" : {
            "categories_slug" : "categories_slug"
        },
        "odia" : {
            "categories_slug" : "categories_slug"
        },
        "kannada" : {
            "categories_slug" : "categories_slug"
        },
        "tamil" : {
            "categories_slug" : "categories_slug"
        },
        "telugu" : {
            "categories_slug" : "categories_slug"
        },
        "malayalam" : {
            "categories_slug" : "categories_slug"
        },
        "urdu" : {
            "categories_slug" : "categories_slug"
        },
        "bengali" : {
            "categories_slug" : "categories_slug"
        },
        "assam" : {
            "categories_slug" : "categories.slug"
        },
        "lokmat" : {
            "categories_slug" : "categories.slug"
        },
        "gujarati" : {
            "categories_slug" : "categories_slug"
        },
    },
    "api": {
        home_widget: (orientation, category, language) => {
          let api = orientation === "video-wall" ? `/solr?limit=5&sort=update_date&qs=video_wall_i:1 AND ff_source:hyperlocal AND -local18_video_s:""${category ? ` AND ${VIDEO_CONFIG.filterArr[language]["categories_slug"]}:(${category})` : ''}&filter=ff_source,local18_video_s,display_headline,headline,post_image,slug,thumbnail` 
          : orientation !== "portrait" ? `/solr?limit=5&sort=update_date&qs=video_type_s:"desk" AND display_status_s:1 AND mongo_id_s:* AND video_rotation_s:1${category ? ` AND ${VIDEO_CONFIG.filterArr[language]["categories_slug"]}:(${category})` : ''}&filter=*` :
          `/solr?limit=5&sort=update_date&qs=video_type_s:"desk" AND display_status_s:1 AND mongo_id_s:* AND video_rotation_s:2${category ? ` AND ${VIDEO_CONFIG.filterArr[language]["categories_slug"]}:(${category})` : ''}&filter=*`;
          return api;
        },
        article_carousel: (catId, language, etl) => {
            let ac_api = (etl == true && language == "hindi") ? `get-article-list?offset=0&count=5&fields=ff_source,local18_video,display_headline,headline,weburl,weburl_r,images,story_id,intro&filter={${catId && `"categories.slug":"${catId}",`}"ff_source":"Hyperlocal","video_wall":true,"not":{"local18_video":""}}` : 
            (language == "assam") ? `api/elastic/query/?sort=updated_at&qs=video_wall:true and ff_source:Hyperlocal${catId ? ` and ${VIDEO_CONFIG.filterArr[language]["categories_slug"]}:${catId}` : ''}&limit=5&filter=ff_source,local18_video,display_headline,headline,post_image,intro,id,posturl,article_data,url,thumbnail,images,story_id` 
            : (language == "lokmat") ? `v1/mar/get-article-list?offset=0&count=5&filter={${catId ? `%22${VIDEO_CONFIG.filterArr[language]["categories_slug"]}%22:%22${catId}%22` : ''},%22ff_source%22:%22Hyperlocal%22,%22video_wall%22:true,%22not%22:{%22local18_video%22:%22%22}}&fields=story_id,images,display_headline,headline,weburl,weburl_r,local18_video`
            : `/solr?limit=5&sort=update_date&qs=video_wall_i:1 AND ff_source:hyperlocal AND -local18_video_s:""${catId ? ` AND ${VIDEO_CONFIG.filterArr[language]["categories_slug"]}:(${catId})` : ''}&filter=ff_source,local18_video_s,display_headline,headline,post_image,intro,id,posturl,article_data,url,thumbnail`;
            return ac_api;
        },
        article_widget: (category, tags, language) => {
            //let tags_slug = (tags && tags.length > 0) ? tags.filter((item) => item.slug).join(',') : '';
            let ar_api = `/solr?limit=5&sort=update_date&qs=video_type_s:%22desk%22+AND+display_status_s:1+AND+mongo_id_s:*+AND+video_rotation_s:2&fq=tags_slug:(${tags})+OR+${VIDEO_CONFIG.filterArr[language]["categories_slug"]}:%22${category}%22`;
            return ar_api;
        }
    },
    "english" : {
        url: "https://www.news18.com/",
        name: "News18 English",
        logo: "https://images.news18.com/static_news18/pix/ibnhome/news18/images/news18-logo-v1.png",
        imagePrefix: "https://images.news18.com/ibnlive/uploads/",
        home_widget: {
            wall_title: "Video",
            portrait_title: "Shorts",
            landscape_title: "Video List",
            moreBtn: "See More",
        },
        article_carousel: {
            title: "Related Video",
        },
        video_wall_right:{
            title: "More Videos"
        },
        ads: {
            desktop: {
                ATF_728_id: `NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                header_ATF_728: `NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                ATF_300 : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_LOCAS18_NWS_VDO_AS_ROS_ATF_300',
                Shosh_OOP_id : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_Shosh_OOP',
                Skin_OOP_id  : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_Skin_OOP',
                PG_1x1 : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_PG_1x1',
                PG_Slider_1x1: 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_PG_SLIDER_1x1'
            },
            mobile: {
                SHOSH_OOP:
                  "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_SHOSH_OOP",
                SKIN_OOP:
                  "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_SKIN_OOP",
                PG_1x1:
                  "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_PG_1x1",
                PG_Slider_1x1:
                  "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_PG_SLIDER_1x1",
            }
        },
        video_player: {
            PLAYER_LIBRARY: 'https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/pubstack-player.web.api.min.js',
            stg_access_token: stg_access_token,
            access_token: access_token,
            title: 'News18.com',
            publisher_id: '6683813',
            version: '5.2',
            base_href: 'https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/',
            id: '5ee0c7d7274b9d7d0ae8f433',
            c3: '30'
        }
    },
    "kannada": {
        url: "https://kannada.news18.com/",
        name: "News18 ಕನ್ನಡ",
        logo: "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/kannada_600x60_1612341990.png",
        imagePrefix: "https://images.news18.com/kannada/uploads/",
        home_widget: {
            wall_title: "ವೀಡಿಯೊ",
            portrait_title: "ಶಾರ್ಟ್ಸ್",
            landscape_title: "ವಿಡಿಯೋ ಲಿಸ್ಟ್",
            moreBtn: "ಮತ್ತಷ್ಟು ನೋಡಿ",
        },
        article_carousel: {
            title: "ಸಂಬಂಧಿತ ವಿಡಿಯೋ"
        },
        video_wall_right:{
            title: "ಸಂಬಂಧಿತ ವಿಡಿಯೋ"
        },
        ads: {
            desktop: {
                ATF_728_id: `NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                header_ATF_728: `NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                ATF_300 : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_LOCAS18_NWS_VDO_AS_ROS_ATF_300',
                Shosh_OOP_id : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_Shosh_OOP',
                Skin_OOP_id  : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_Skin_OOP',
                PG_1x1 : 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_PG_1x1',
                PG_Slider_1x1: 'NW18_KNDA_Desktop/NW18_KNDA_ROS/NW18_KNDA_LOCAL18_NEWS_VIDEO_AS/NW18_KNDA_ROS_AS_PG_SLIDER_1x1'
            },
            mobile: {
                SHOSH_OOP:
                  "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_SHOSH_OOP",
                SKIN_OOP:
                  "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_SKIN_OOP",
                PG_1x1:
                  "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_PG_1x1",
                PG_Slider_1x1:
                  "NW18_KNDA_PWA/NW18_KNDA_ROS_PWA/NW18_KNDA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_KNDA_AS_PWA_ROS_PG_SLIDER_1x1",
            }
        },
        video_player: {
            PLAYER_LIBRARY: 'https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/news18-player/v-12/player.nw18.web.api.min.js',
            stg_access_token: stg_access_token,
            access_token: access_token,
            title: 'News18 Kannada',
            publisher_id: '6683813',
            version: '1.37',
            base_href: 'https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/news18-player/v-12/',
            id: '5ee0c7d7274b9d7d0ae8f438',
            c3: '1'
        }
    },
    "punjabi": {
        url: "https://punjab.news18.com/",
        name: "News18 ਪੰਜਾਬ",
        logo: "https://images.news18.com/punjabi/uploads/News18_Punjab_logo_600x60.png",
        imagePrefix: "https://images.news18.com/punjabi/uploads/",
        home_widget: {
            wall_title: "ਵੀਡੀਓ",
            portrait_title: "ਸ਼ਾਰਟਸ",
            landscape_title: "ਵੀਡੀਓ ਸੂਚੀ",
            moreBtn: "ਹੋਰ ਵੇਖੋ",
        },
        article_carousel: {
            title: "ਸੰਬੰਧਿਤ ਵੀਡੀਓ"
        },
        video_wall_right:{
            title: "ਸੰਬੰਧਿਤ ਵੀਡੀਓ"
        },
        ads: {
            desktop: {
                ATF_728_id: `NW18_PJB_Desktop/NW18_PJB_LOCAL18_NEWS/NW18_PJB_LOCAL18_NEWS_VIDEO_AS/NW18_PJB_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                BTF_728: `NW18_PJB_Desktop/NW18_PJB_LOCAL18_NEWS/NW18_PJB_LOCAL18_NEWS_VIDEO_AS/NW18_PJB_LOCAS18_NWS_VDO_AS_ROS_MID_728`,
                MID_728: `NW18_PJB_Desktop/NW18_PJB_LOCAL18_NEWS/NW18_PJB_LOCAL18_NEWS_VIDEO_AS/NW18_PJB_LOCAS18_NWS_VDO_AS_ROS_MID_728`,
                ATF_300 : 'NW18_PJB_Desktop/NW18_PJB_LOCAL18_NEWS/NW18_PJB_LOCAL18_NEWS_VIDEO_AS/NW18_PJB_LOCAS18_NWS_VDO_AS_ROS_ATF_300',
                Shosh_OOP_id : 'NW18_PJB_Desktop/NW18_PJB_LOCAL18_NEWS/NW18_PJB_LOCAL18_NEWS_VIDEO_AS/NW18_PJB_ROS_AS_Shosh_OOP',
                Skin_OOP_id  : 'NW18_PJB_Desktop/NW18_PJB_LOCAL18_NEWS/NW18_PJB_LOCAL18_NEWS_VIDEO_AS/NW18_PJB_ROS_AS_Skin_OOP',
                PG_1x1 : 'NW18_PJB_Desktop/NW18_PJB_LOCAL18_NEWS/NW18_PJB_LOCAL18_NEWS_VIDEO_AS/NW18_PJB_ROS_AS_PG_1x1',
                PG_Slider_1x1: 'NW18_PJB_Desktop/NW18_PJB_LOCAL18_NEWS/NW18_PJB_LOCAL18_NEWS_VIDEO_AS/NW18_PJB_ROS_AS_PG_SLIDER_1x1'
            },
            mobile: {
                ATF_320:
                'NW18_PJB_PWA/NW18_PJB_LOCAL18_NEWS_PWA/NW18_PJB_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_PJB_LOCAS18_NWS_VDO_AS_PWA_ROS_ATF_320',
                ATF_300:
                    'NW18_PJB_PWA/NW18_PJB_LOCAL18_NEWS_PWA/NW18_PJB_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_PJB_LOCAS18_NWS_VDO_AS_PWA_ROS_ATF_300',
                BTF_300:
                'NW18_PJB_PWA/NW18_PJB_LOCAL18_NEWS_PWA/NW18_PJB_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_PJB_LOCAS18_NWS_VDO_AS_PWA_ROS_BTF_300',
                PG_1x1:
                'NW18_PJB_PWA/NW18_PJB_LOCAL18_NEWS_PWA/NW18_PJB_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_PJB_AS_PWA_ROS_PG_1x1',
                PG_Slider_1x1:
                'NW18_PJB_PWA/NW18_PJB_LOCAL18_NEWS_PWA/NW18_PJB_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_PJB_AS_PWA_ROS_PG_SLIDER_1x1',
                SHOSH_OOP: `NW18_PJB_PWA/NW18_PJB_LOCAL18_NEWS_PWA/NW18_PJB_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_PJB_AS_PWA_ROS_SHOSH_OOP`,
                SKIN_OOP: `NW18_PJB_PWA/NW18_PJB_LOCAL18_NEWS_PWA/NW18_PJB_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_PJB_AS_PWA_ROS_SKIN_OOP`,
            }
        },
        video_player: {
            PLAYER_LIBRARY: "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/pubstack-player.web.api.min.js",
            stg_access_token: stg_access_token,
            access_token: access_token,
            title: 'News18 Punjab',
            publisher_id: '6683813',
            version: '5.2',
            base_href: 'https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/',
            id: '5ee0c7d7274b9d7d0ae8f43c',
            c3: '9'
        },
        seo: {
            title: `Punjab Latest Videos - Latest Videos from Punjab, ਲਾਈਵ ਪੰਜਾਬ ਵੀਡੀਓਜ਼, - News18 Punjab`,
            description: `Watch the latest videos on Sports, crime, entertainment, & political news videos from Punjab and much more on News18 Punjab`,
            keywords: `Punjab Videos, Punjabi Videos, Live Videos, Live Punjab Videos, Latest Punjab Videos, video News in Punjabi, Live Punjabi videos, Punjab viral videos, Latest video News, Amritsar videos, Chandigarh Videos, Ludhiana Videos, Jalandhar videos, ਵੀਡੀਓ, ਪੰਜਾਬ ਵੀਡੀਓ, ਪੰਜਾਬ ਵੀਡੀਓਜ਼, ਅੰਮ੍ਰਿਤਸਰ ਵੀਡੀਓਜ਼, ਚੰਡੀਗੜ੍ਹ ਵੀਡੀਓਜ਼, ਲੁਧਿਆਣਾ ਵੀਡੀਓਜ਼, ਜਲੰਧਰ ਵੀਡੀਓਜ਼`
        },
        inHousePlayer: true,
    },
    "tamil": {
        url: "https://tamil.news18.com/",
        name: "News18 Tamil",
        logo: "",
        imagePrefix: "https://images.news18.com/tamil/uploads/",
        home_widget: {
            wall_title: "காணொளி",
            portrait_title: "",
            landscape_title: "",
            moreBtn: "",
        },
        article_carousel: {
            title: ""
        },
        video_wall_right:{
            title: ""
        },
        ads: {
            desktop: {
                ATF_728_id: ``,
                BTF_728: ``,
                header_ATF_728: ``,
                ATF_300 : '',
                Shosh_OOP_id : '',
                Skin_OOP_id  : '',
                PG_1x1 : '',
                PG_Slider_1x1: ''
            },
            mobile: {
                header_ATF_320:
                '',
                ATF_300:
                    '',
                BTF_300:
                '',
                FBN_320:
                '',
                PG_1x1:
                '',
                PG_Slider_1x1:
                '',
                SHOSH_OOP: ``,
                SKIN_OOP: ``,
            }
        },
        video_player: {
            PLAYER_LIBRARY: "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-8/pubstack-player.web.api.min.js",
            stg_access_token: stg_access_token,
            access_token: access_token,
            title: 'News18 Tamil',
            publisher_id: '6683813',
            version: '4.9',
            base_href: 'https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-8/',
            id: '5ee0c7d7274b9d7d0ae8f43c',
            c3: '9'
        }
    }, 
    "telugu" : {},
    odia: {
        url: "https://odia.news18.com/",
        name: "News18 Odia",
        logo: "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/odia_1588591468.png",
        imagePrefix: "https://images.news18.com/odia/uploads/",
        home_widget: {
            wall_title: "Video",
            portrait_title: "Shorts",
            landscape_title: "Video List",
            moreBtn: "See More",
        },
        article_carousel: {
            title: "Related Video",
        },
        video_wall_right:{
            title: "More Videos"
        },
        ads: {
            desktop: {
                ATF_728_id: `NW18_ODIA_Desktop/NW18_ODIA_LOCAL18_NEWS/NW18_ODIA_LOCAL18_NEWS_VIDEO_AS/NW18_ODIA_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                BTF_728: `NW18_ODIA_Desktop/NW18_ODIA_LOCAL18_NEWS/NW18_ODIA_LOCAL18_NEWS_VIDEO_AS/NW18_ODIA_LOCAS18_NWS_VDO_AS_ROS_BTF_728`,
                header_ATF_728: `NW18_ODIA_Desktop/NW18_ODIA_LOCAL18_NEWS/NW18_ODIA_LOCAL18_NEWS_VIDEO_AS/NW18_ODIA_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                ATF_300:
                    "NW18_ODIA_Desktop/NW18_ODIA_LOCAL18_NEWS/NW18_ODIA_LOCAL18_NEWS_VIDEO_AS/NW18_ODIA_LOCAS18_NWS_VDO_AS_ROS_ATF_300",
                Shosh_OOP_id:
                    "NW18_ODIA_Desktop/NW18_ODIA_LOCAL18_NEWS/NW18_ODIA_LOCAL18_NEWS_VIDEO_AS/NW18_ODIA_ROS_AS_Shosh_OOP",
                Skin_OOP_id:
                    "NW18_ODIA_Desktop/NW18_ODIA_LOCAL18_NEWS/NW18_ODIA_LOCAL18_NEWS_VIDEO_AS/NW18_ODIA_ROS_AS_Skin_OOP",
                PG_1x1:
                    "NW18_ODIA_Desktop/NW18_ODIA_LOCAL18_NEWS/NW18_ODIA_LOCAL18_NEWS_VIDEO_AS/NW18_ODIA_ROS_AS_PG_1x1",
                PG_Slider_1x1:
                    "NW18_ODIA_Desktop/NW18_ODIA_LOCAL18_NEWS/NW18_ODIA_LOCAL18_NEWS_VIDEO_AS/NW18_ODIA_ROS_AS_PG_SLIDER_1x1",
        
                MID_728:
                    "NW18_ODIA_Desktop/NW18_ODIA_LOCAL18_NEWS/NW18_ODIA_LOCAL18_NEWS_VIDEO_AS/NW18_ODIA_LOCAS18_NWS_VDO_AS_ROS_MID_728",
            },
            mobile: {
                SHOSH_OOP:
                    "NW18_ODIA_PWA/NW18_ODIA_LOCAL18_NEWS_PWA/NW18_ODIA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ODIA_AS_PWA_ROS_SHOSH_OOP",
                SKIN_OOP:
                    "NW18_ODIA_PWA/NW18_ODIA_LOCAL18_NEWS_PWA/NW18_ODIA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ODIA_AS_PWA_ROS_SKIN_OOP",
                PG_1x1:
                    "NW18_ODIA_PWA/NW18_ODIA_LOCAL18_NEWS_PWA/NW18_ODIA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ODIA_AS_PWA_ROS_PG_1x1",
                PG_Slider_1x1:
                    "NW18_ODIA_PWA/NW18_ODIA_LOCAL18_NEWS_PWA/NW18_ODIA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ODIA_AS_PWA_ROS_PG_SLIDER_1x1",
                header_ATF_320: "",
                ATF_320:
                    "NW18_ODIA_PWA/NW18_ODIA_LOCAL18_NEWS_PWA/NW18_ODIA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ODIA_LOCAS18_NWS_VDO_AS_PWA_ROS_ATF_320",
                ATF_300:
                    "NW18_ODIA_PWA/NW18_ODIA_LOCAL18_NEWS_PWA/NW18_ODIA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ODIA_LOCAS18_NWS_VDO_AS_PWA_ROS_ATF_300",
                BTF_300:
                    "NW18_ODIA_PWA/NW18_ODIA_LOCAL18_NEWS_PWA/NW18_ODIA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ODIA_LOCAS18_NWS_VDO_AS_PWA_ROS_BTF_300",
                FBN_320:"NW18_ODIA_PWA/NW18_ODIA_LOCAL18_NEWS_PWA/NW18_ODIA_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ODIA_LOCAS18_NWS_VDO_AS_PWA_ROS_FBN_320"
            },
        },
        video_player: {
            PLAYER_LIBRARY: "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/pubstack-player.web.api.min.js",
            stg_access_token: stg_access_token,
            access_token: access_token,
            title: "News18.com",
            publisher_id: "6683813",
            version: "5.2",
            base_href: "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/",
            id: "5ee0c7d7274b9d7d0ae8f43f",
            c3: "30",
        },
        inHousePlayer: true,
    },
    "hindi" : {
        url: "https://hindi.news18.com/",
        name: "News18 Hindi",
        logo: "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
        imagePrefix: "https://images.news18.com/hindi/uploads/",
        home_widget: {
            wall_title: "वीडियो",
            portrait_title: "शॉर्ट वीडियो",
            landscape_title: "वीडियो लिस्ट",
            moreBtn: "और देखें",
        },
        article_carousel: {
            title: "संबंधित वीडियो",
        },
        video_wall_right:{
            title: "अन्य वीडियो"
        },
        ads: {
            desktop: {
                ATF_728_id: `NW18_HIND_Desktop/NW18_HIND_LOCAL18_NEWS/NW18_HIND_LOCAL18_NEWS_VIDEO_AS/NW18_HIND_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                ATF_300: `NW18_HIND_Desktop/NW18_HIND_LOCAL18_NEWS/NW18_HIND_LOCAL18_NEWS_VIDEO_AS/NW18_HIND_LOCAS18_NWS_VDO_AS_ROS_ATF_300`,
                BTF_728: `NW18_HIND_Desktop/NW18_HIND_LOCAL18_NEWS/NW18_HIND_LOCAL18_NEWS_VIDEO_AS/NW18_HIND_LOCAS18_NWS_VDO_AS_ROS_MID_728`,
                Shosh_OOP_id: `NW18_HIND_Desktop/NW18_HIND_LOCAL18_NEWS/NW18_HIND_LOCAL18_NEWS_VIDEO_AS/NW18_HIND_ROS_AS_Shosh_OOP`,
                Skin_OOP_id: `NW18_HIND_Desktop/NW18_HIND_LOCAL18_NEWS/NW18_HIND_LOCAL18_NEWS_VIDEO_AS/NW18_HIND_ROS_AS_Skin_OOP`,
                PG_1x1: `NW18_HIND_Desktop/NW18_HIND_LOCAL18_NEWS/NW18_HIND_LOCAL18_NEWS_VIDEO_AS/NW18_HIND_ROS_AS_PG_1x1`,
                PG_Slider_1x1: `NW18_HIND_Desktop/NW18_HIND_LOCAL18_NEWS/NW18_HIND_LOCAL18_NEWS_VIDEO_AS/NW18_HIND_ROS_AS_PG_SLIDER_1x1`,
            },
            mobile: {
                ATF_320: `NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_HIND_LOCAS18_NWS_VDO_AS_PWA_ROS_ATF_320`,
                ATF_300: `NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_HIND_LOCAS18_NWS_VDO_AS_PWA_ROS_ATF_300`,
                BTF_300: `NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_HIND_LOCAS18_NWS_VDO_AS_PWA_ROS_BTF_300`,
                SHOSH_OOP: `NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_HIND_AS_PWA_ROS_SHOSH_OOP`,
                SKIN_OOP: `NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_HIND_AS_PWA_ROS_SKIN_OOP`,
                PG_1x1: `NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_HIND_AS_PWA_ROS_PG_1x1`,
                PG_Slider_1x1: `NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_HIND_AS_PWA_ROS_PG_SLIDER_1x1`,
            }
        },
        video_player: {
            PLAYER_LIBRARY: "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/pubstack-player.web.api.min.js",
            stg_access_token: stg_access_token,
            access_token: access_token,
            title: 'News18 Hindi',
            publisher_id: '6683813',
            version: '5.2',
            base_href: 'https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/',
            id: '5ee0c7d7274b9d7d0ae8f43c',
            c3: '9'
        },
        seo: {
            title: `Uttar Pradesh News Videos: Watch UP News Videos Online, उत्तर प्रदेश की ताज़ा खबर - News18 Hindi`,
            description: `Uttar Pradesh News Videos: Watch UP (उत्तर प्रदेश) Latest News Videos Online in Hindi. उत्तर प्रदेश की ताज़ा खबर, ब्रेकिंग और लेटेस्ट उत्तर प्रदेश समाचार on News 18 Hindi`,
            keywords: `Uttar Pradesh News, UP News, Uttar Pradesh Samachar, UP Samachar, Uttar Pradesh News Video, UP News Video, Uttar Pradesh Samachar Video, UP Samachar Video, Uttar Pradesh News Video in Hindi, UP News Video in Hindi, Uttar Pradesh Samachar Video Hindi, UP Samachar Video Hindi`
        },
        inHousePlayer: false,
    },
    "gujarati" : {},
    "lokmat" : {
        url: "https://lokmat.news18.com/",
        name: "News18 Lokmat",
        logo: "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/lokmat_600x60_center_1610952605.png",
        imagePrefix: "https://images.news18.com/ibnlokmat/uploads/",
        home_widget: {
            wall_title: "संबंधित व्हिडिओ",
            portrait_title: "",
            landscape_title: "",
            moreBtn: "संबंधित व्हिडिओ",
        },
        article_carousel: {
            title: "संबंधित व्हिडिओ"
        },
        video_wall_right:{
            title: "संबंधित व्हिडिओ"
        },
        ads: {
            desktop: {
                ATF_728_id: `NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                BTF_728: "NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_LOCAS18_NWS_VDO_AS_ROS_BTF_728",
                MID_728: "NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_LOCAS18_NWS_VDO_AS_ROS_BTF_728",
                header_ATF_728: `NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                ATF_300: "NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_LOCAS18_NWS_VDO_AS_ROS_ATF_300",
                Shosh_OOP_id: "NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_ROS_AS_Shosh_OOP",
                Skin_OOP_id: "NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_ROS_AS_Skin_OOP",
                PG_1x1: "NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_ROS_AS_PG_1x1",
                PG_1x1_2: "NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_ROS_AS_PG_1x1_2",
                PG_1x1_3: "NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_ROS_AS_PG_1x1_3",
                PG_Slider_1x1: "NW18_MAR_Desktop/NW18_MAR_LOCAL18_NEWS/NW18_MAR_LOCAL18_NEWS_VIDEO_AS/NW18_MAR_ROS_AS_PG_SLIDER_1x1",
            },
            mobile: {
                ATF_320: 'NW18_MAR_PWA/NW18_MAR_LOCAL18_NEWS_PWA/NW18_MAR_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_MAR_LOCAS18_NWS_VDO_AS_PWA_ROS_ATF_320',
                ATF_300: 'NW18_MAR_PWA/NW18_MAR_LOCAL18_NEWS_PWA/NW18_MAR_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_MAR_LOCAS18_NWS_VDO_AS_PWA_ROS_ATF_300',
                BTF_300: 'NW18_MAR_PWA/NW18_MAR_LOCAL18_NEWS_PWA/NW18_MAR_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_MAR_LOCAS18_NWS_VDO_AS_PWA_ROS_BTF_300',
                SHOSH_OOP: "NW18_MAR_PWA/NW18_MAR_LOCAL18_NEWS_PWA/NW18_MAR_LOCAL18_NEWS_PWA_AS/NW18_MAR_AS_PWA_ROS_SHOSH_OOP",
                SKIN_OOP: "NW18_MAR_PWA/NW18_MAR_LOCAL18_NEWS_PWA/NW18_MAR_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_MAR_AS_PWA_ROS_SKIN_OOP",
                PG_1x1: "NW18_MAR_PWA/NW18_MAR_LOCAL18_NEWS_PWA/NW18_MAR_LOCAL18_NEWS_PWA_AS/NW18_MAR_AS_PWA_ROS_PG_1x1",
                PG_Slider_1x1: "NW18_MAR_PWA/NW18_MAR_LOCAL18_NEWS_PWA/NW18_MAR_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_MAR_AS_PWA_ROS_PG_SLIDER_1x1",
            }
        },
        video_player: {
            PLAYER_LIBRARY: "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/pubstack-player.web.api.min.js",
            stg_access_token: stg_access_token,
            access_token: access_token,
            title: 'News18 Lokmat',
            publisher_id: '6683813',
            version: '5.2',
            base_href: 'https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/',
            id: '5ee0c7d7274b9d7d0ae8f436',
            c3: '8'
        },
        seo: {
            title: `Marathi videos &amp; Viral News Videos , Marathi Cinema and Tv videos, Travel, Sports, National News &amp; Viral Videos in Marathi, व्हिडिओ बातम्या, व्हिडिओ बातम्या, व्हिडिओ न्यूज - News18 Lokmat`,
            description: `News18 Lokmat News Videos : Latest marathi news videos, entertainment news videos, exclusive video of latest news updates, popular and trending videos on YouTube, social viral, entertainment &amp; Tv updates. Also watch latest videos on maharashtra politics, breaking news videos, व्हिडिओ बातम्या, व्हिडिओ बातम्या, व्हिडिओ न्यूज, cricket videos and Viral videos on News18 Lokmat`,
            keywords: `breaking news video, marathi Video Gallery, marathi Viral videos, latest videos of entertainment, latest celebrity videos, marathi news bulletin videos, trending YouTube videos, sport videos, marathi news videos, latest news videos, entertainment news videos, politics news videos, entertainment news videos, sports news video, mumbai video, nagpur video, pune video, nashik video, local18 video, व्हिडिओ बातम्या, व्हिडिओ बातम्या, व्हिडिओ न्यूज`
        },
        siteCode: "mar"
    },
    "assam" : {
        url: "https://assam.news18.com/",
        name: "News18 অসম",
        logo: "https://static.assam.news18.com/assam/uploads/2020/03/assam.png",
        imagePrefix: "https://images.news18.com/assam/uploads/",
        home_widget: {
            wall_title: "Videos",
            portrait_title: "Short Videos",
            landscape_title: "Video List",
            moreBtn: "Read More",
        },
        article_carousel: {
            title: "সম্পৰ্কীয় ভিডিঅ",
        },
        video_wall_right:{
            title: "সম্পৰ্কীয় ভিডিঅ"
        },
        ads: {
            desktop: {
                ATF_728_id: `NW18_ASAM_Desktop/NW18_ASAM_ROS/NW18_ASAM_LOCAL18_NEWS_VIDEO_AS/NW18_ASAM_LOCAS18_NWS_VDO_AS_ROS_ATF_728`,
                ATF_300: `NW18_ASAM_Desktop/NW18_ASAM_ROS/NW18_ASAM_LOCAL18_NEWS_VIDEO_AS/NW18_ASAM_LOCAS18_NWS_VDO_AS_ROS_ATF_300`,
                BTF_728: `NW18_ASAM_Desktop/NW18_ASAM_ROS/NW18_ASAM_LOCAL18_NEWS_VIDEO_AS/NW18_ASAM_LOCAS18_NWS_VDO_AS_ROS_MID_728`,
                Shosh_OOP_id: `NW18_ASAM_Desktop/NW18_ASAM_ROS/NW18_ASAM_LOCAL18_NEWS_VIDEO_AS/NW18_ASAM_ROS_AS_Shosh_OOP`,
                Skin_OOP_id: `NW18_ASAM_Desktop/NW18_ASAM_ROS/NW18_ASAM_LOCAL18_NEWS_VIDEO_AS/NW18_ASAM_ROS_AS_Skin_OOP`,
                PG_1x1: `NW18_ASAM_Desktop/NW18_ASAM_ROS/NW18_ASAM_LOCAL18_NEWS_VIDEO_AS/NW18_ASAM_ROS_AS_PG_1x1`,
                PG_Slider_1x1: `NW18_ASAM_Desktop/NW18_ASAM_ROS/NW18_ASAM_LOCAL18_NEWS_VIDEO_AS/NW18_ASAM_ROS_AS_PG_SLIDER_1x1`,
            },
            mobile: {
                ATF_320: `NW18_ASAM_PWA/NW18_ASAM_ROS_PWA/NW18_ASAM_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ASAM_LOCAS18_NWS_VDO_AS_PWA_ROS_ATF_320`,
                ATF_300: `NW18_ASAM_PWA/NW18_ASAM_ROS_PWA/NW18_ASAM_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ASAM_LOCAS18_NWS_VDO_AS_PWA_ROS_ATF_300`,
                BTF_300: `NW18_ASAM_PWA/NW18_ASAM_ROS_PWA/NW18_ASAM_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ASAM_LOCAS18_NWS_VDO_AS_PWA_ROS_BTF_300`,
                SHOSH_OOP: `NW18_ASAM_PWA/NW18_ASAM_ROS_PWA/NW18_ASAM_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ASAM_AS_PWA_ROS_SHOSH_OOP`,
                SKIN_OOP: `NW18_ASAM_PWA/NW18_ASAM_ROS_PWA/NW18_ASAM_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ASAM_AS_PWA_ROS_SKIN_OOP`,
                PG_1x1: `NW18_ASAM_PWA/NW18_ASAM_ROS_PWA/NW18_ASAM_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ASAM_AS_PWA_ROS_PG_1x1`,
                PG_Slider_1x1: `NW18_ASAM_PWA/NW18_ASAM_ROS_PWA/NW18_ASAM_LOCAL18_NEWS_VIDEO_PWA_AS/NW18_ASAM_AS_PWA_ROS_PG_SLIDER_1x1`,
            }
        },
        video_player: {
            PLAYER_LIBRARY: "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/pubstack-player.web.api.min.js",
            stg_access_token: stg_access_token,
            access_token: access_token,
            title: 'News18 Assam',
            publisher_id: '6683813',
            version: '5.2',
            base_href: 'https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/v2-9/',
            id: '5ee0c7d7274b9d7d0ae8f43c',
            c3: '9'
        },
        seo: {
            title: `Assam Latest Videos - Latest Videos from Assam - News18 Assam`,
            description: `Watch the latest videos on Sports, crime, entertainment, & political news videos from Assam and much more on News18 Assam`,
            keywords: `Assam Videos, Assamese Videos, Live Videos, Live Assam Videos, Latest Assam Videos, video News in Assamese, Live Assamese videos, Assam viral videos, Latest video News`
        },
        siteCode: "asm"
    },
    "bengali" : {},
    "urdu" : {},
    "malayalam" : {},
};
module.exports = VIDEO_CONFIG;