import { getArticleListWithFilterRange } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";
import { logEventNew } from "includes/googleAnalytic";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getCompleteURL } from "util/global/Helper";
import { getAlt, getImage, getTitle } from "util/individual/Home";

const SearchInitializationScreen = ({ isMobile, pageType }) => {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);

    const fetchLatestData = () => {
      getArticleListWithFilterRange({ count: 50, offset:0, filter: {  not: { post_type: "text", "nw_auto_yt_video_type": "watch"} }, filterRange: {}, fields: "headline,images,story_id,nw_auto_yt_video_type,categories,display_headline,weburl,post_type,weburl_r,web_url,hindi_title,blog_content,id,feature_img" }, true).then(res => {
            setLoader(false);
            setData(res);
        })
    };

    useEffect(() => {
        fetchLatestData()
    }, []);
    return(<>
    
        <div className="grid_contner">
        {loader ? <Skeleton width={isMobile ? 320 : 1000} height={isMobile ? 600: 500} /> : <>
            {data.map((item,index) =>  {
                const isWebstory = item?.id?.includes("webstory");
                const isShorts = item.nw_auto_yt_video_type === "shorts";
                const width = isWebstory ? 200: 220;
                const height = isWebstory ? 293 : 165;
                const src = getImage({...item, post_type: isWebstory ? "webstory" : item.post_type});
                const alt = getAlt({...item, post_type: isWebstory ? "webstory" : item.post_type});
                return (!isShorts ? 
                      <a key={index} onClick={() => logEventNew("Search Button", "click", `${pageType}, (below cards) : ${item.post_type}, ${item.story_id || item.id}, ${item?.categories?.[0]?.slug || item.categories}, ${isMobile ? "mobile" : "desktop"}`)} href={getCompleteURL(item?.weburl_r || item?.web_url_r, item?.weburl || item?.web_url)} className="search_story_cards" >
                        <figure width={width} height={height} className={item?.post_type +" search_story_cards" || "webstory search_story_cards"}>
                          <LazyLoadImage
                            src={src}
                            alt={alt}
                            width={width}
                            height={height}
                            className="search_story_cards"
                          />
                          <figcaption className="captionin search_story_cards"><span className={item?.post_type + " search_story_cards" || "webstory search_story_cards"}>{alt}</span></figcaption>
                      </figure>
                    </a> : 
                      <a key={index} onClick={() => logEventNew("Search Button", "click", `${pageType}, (below cards) : ${item.post_type}, ${item.story_id || item.id}, ${item?.categories?.[0]?.slug || item.categories}, ${isMobile ? "mobile" : "desktop"}`)} href={getCompleteURL(item?.weburl_r || item?.web_url_r, item?.weburl || item?.web_url)} className="search_story_cards">
                        <figure width={150} height={293}  className={item?.post_type + " search_story_cards" || "webstory search_story_cards"}>
                          <img
                            src={src}
                            alt={alt}
                            width={150} height={293}
                            style={{ objectFit: "cover" }}
                            className="search_story_cards"
                          />
                          {/* <span className={item?.post_type || "webstory"}></span> */}
                      </figure>
                    </a>
                );
              })}
        </>}
        </div>
        <style jsx global>{`
          .grid_wrap{    
            overflow-y: auto;
            // max-height: 439px;
            overflow-x: hidden;
            margin-top: 20px;
          }
          .grid_contner {
            column-count: 5;
            column-gap: 20px;
            padding: 0 30px;
          }      
          .grid_contner figure {
            margin: 0;
            display: grid;
            grid-template-rows: 1fr auto;
            margin-bottom: 10px;
            break-inside: avoid;
            position: relative;
          }      
          .grid_contner figure > img {
            grid-row: 1 / -1;
            grid-column: 1;
            max-width: 100%;
            display: block;
            // height: auto;
            border-radius: 5px;
            
          }
          .grid_contner figure span {
            color: #fff;
            font-size: 15px;
            line-height: 17px;
          }
        .grid_contner figure:after {
          content: "";
          width: 20px;
          height: 20px;
          position: absolute;
          top: 10px;
          right: 10px;
          background-repeat: no-repeat;
          background-color: rgb(0 0 0 / 60%);
          border-radius: 50%;
          padding: 2px;
          text-align: center;
          background-size: 55%;
          background-position: center;
        }
         figure.photogallery:after {
          background-image: url(/images/search-results/camera.svg);
        }
        figure.videos:after {
          background-image: url(/images/search-results/vd.svg);
        }
         figure.webstory:after {
          background-image: url(/images/search-results/ws.svg);
        }
        .captionin {
          position: absolute;
          bottom: 0;
          background: transparent linear-gradient(180deg, #00000000 0%, #000000 100%) 0% 0% no-repeat padding-box;
          padding: 10px 16px;
          width: 100%;
          border-radius: 5px;
          height: 80px;
          display: flex;
          align-content: flex-end;
          align-items: flex-end;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .grid_contner{
            columns: 2;
            column-gap: 0;
            height: auto!important;
            padding: 0px;
            padding: 0;
          }
          .grid_contner a{
            position: relative!important;
            transform: none!important;
            width: 100%!important;
            display: block;
            padding: 5px!important;
            box-sizing: border-box;
            padding-bottom: 0px !important;
            padding-top: 0px !important;
            float: left !important;
            transform: unset !important;
            position: initial !important;
          }
          .grid_contner a img{
            width: 100%!important;
            border-radius:5px;
            // height: auto !important;
          }
      }
          
          `}</style>
    </>)
};

export default SearchInitializationScreen;