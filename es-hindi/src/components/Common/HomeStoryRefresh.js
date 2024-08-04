import { getHomeTopNews } from "api/global/Common";
import { scrollToTarget } from "includes/article.util";
import { logEvent } from "includes/googleAnalytic";
import React, { useEffect, useState } from "react";
import LazyLoadImage from "./CustomImage";

const compareTwoArray = (arr1, arr2) => {
    return arr1.length - arr1.filter(x => arr2.includes(x)).length;
}
var timer = null;
const HomeStoryRefresh = ({ topHomeNews = {}, storyCount = 16, topStoryLoadCB = () => {}, isMobile }) => {
    const [updateCount, setUpdateCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pageUpdatedText, setPageUpdatedText] = useState(false);
    const [topStories, setTopStories] = useState(topHomeNews?.stories?.slice(0, storyCount) || []);
    const handleRefreshClick = () => {  
        logEvent("Refreshfeed_home", "click", `${updateCount} new stories,${isMobile ? "mobile" : "desktop"}`)
        setLoading(true);
        document.body.style.opacity = 0.5;
        getHomeTopNews({ count: storyCount, fields: 'story_id,related_story,updated_at,display_headline,images,weburl,post_type,ff_source,local18_video,gif_n18_images,ff_source,showRelatedArticle,liveblog_end_time,liveblog_start_time,liveblog_switcher,local18_video,headline,weburl_r,id,hindi_title,blog_title,feature_img,web_url,web_url_r' }, true).then(res => {
            document.body.style.opacity = 1;
            const updatedStories = (res?.stories || []).map(item => ({
                ...item,
                isNew: topStories.find(it => it.story_id === item.story_id) ? false : true
            }));
            setTopStories(res?.stories);
            setPageUpdatedText(true)
            setLoading(false)
            setUpdateCount(0);
            topStoryLoadCB({...res, stories: updatedStories});
            setTimeout(() => {
                setPageUpdatedText(false)
            }, 1500)
            scrollToTarget("hometopnews")
        })

    };
    const fetchTopStories = async () => {
        
        getHomeTopNews({ count: storyCount, fields: 'story_id' }, true).then((res) => {
            const newStories = res?.stories || [];
            // compare two Array to get difference
            const count = compareTwoArray(topStories.map(itm => itm.story_id), newStories.map(itm => itm.story_id))
            setUpdateCount(count);
        })
    }
    useEffect(() => {
        timer && clearInterval(timer);
        if(topHomeNews?.stories?.length > 0) {
            timer = setInterval(async () => {
                await fetchTopStories()
            }, 30000)
        }
    }, [topHomeNews]);
        return (<> 
            {updateCount === 0 && !pageUpdatedText ? null : (!loading && updateCount> 0) ? 
                
            <button className="news_updates new_khabar" onClick={handleRefreshClick}>
                {updateCount} {" "} नई {updateCount === 1 ? "खबर" : "खबरें"}
                
            </button>
             : 
            (!pageUpdatedText ? <div className="loader">
                <LazyLoadImage src="/images/icons/loader.png" width={64} height={42}/>
                LOADING STORIES
            </div> : <button className="news_updates page_updated">
                PAGE UPDATED
                <svg id="Group_2" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                    <g id="Tick" transform="translate(-12.2 -12.2)">
                        <path id="Path_2" data-name="Path 2" d="M33.741,40.192l-2.192-2.409L30.5,38.812l3.169,3.513,5.648-5.62-1-1.1Z" transform="translate(-12.208 -16.262)" fill="#fff"/>
                        <path id="Path_3" data-name="Path 3" d="M22.7,12.2A10.5,10.5,0,1,0,33.2,22.7,10.5,10.5,0,0,0,22.7,12.2Zm0,19.288A8.788,8.788,0,1,1,31.488,22.7,8.788,8.788,0,0,1,22.7,31.488Z" transform="translate(0 0)" fill="#fff"/>
                    </g>
                </svg>

            </button>)}
            <style jsx global>{`
            svg#Group_2 {
                margin-left: 7px;
            }
            .loader {
                z-index: 8;
                position: fixed;
                left: 50%;
                -webkit-transform: translatex(-50%);
                -moz-transform: translatex(-50%);
                -ms-transform: translatex(-50%);
                -o-transform: translatex(-50%);
                transform: translatex(-50%);
                top: 10%;
                font-weight: 600;
                // font: normal normal bold 16px/27px Mukta;
                letter-spacing: 0px;
                color: #090909;
                
            }
            .loader img {
                display: flex;
                margin: auto;
                width: 64px;
                height: 42px;
            }
            .page_updated {
                width: 169px !important;
                height: 40px !important;
                background: green 0%0%no-repeat padding-box !important;
            }
            .news_updates {
                z-index: 9999;
                position: fixed;
                left: 50%;
                -webkit-transform: translatex(-50%);
                -moz-transform: translatex(-50%);
                -ms-transform: translatex(-50%);
                -o-transform: translatex(-50%);
                transform: translatex(-50%);
                top: 5%;
                width: 133px;
                color: white;
                height: 33px;
                font-size: 14px;
                background: #ED1C24 0% 0% no-repeat padding-box;
                box-shadow: 0px 3px 6px #00000029;
                border: 2px solid #FFFFFF;
                border-radius: 50px;
                display: flex;
                margin: 10px auto;
                text-align: center;
                letter-spacing: 0px;
                color: #fff;
                text-decoration: none;
                font-weight: 600;
                letter-spacing: 0px;
                line-height: 28px;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
            .new_khabar:after {
                content: "";
                background: url(/images/siteimages/newiconsprite_1669351342.svg)-163px 0px no-repeat;
                width: 11px;
                height: 11px;
                display: inline-block;
                margin-left: 8px;
                -webkit-filter: brightness(0)invert(1);
                filter: brightness(0)invert(1);
                transform: rotate(270deg);
            }
            
            @media (max-width:768px){
                .loader{ z-index: 99; }
              }
            `}</style>
        
        </>)
};

export default HomeStoryRefresh;