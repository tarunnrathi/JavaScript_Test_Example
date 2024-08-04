import { getArticleListWithFilterRange } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getCompleteURL } from "util/global/Helper";
import { getAlt, getImage, getTitle } from "util/individual/Home";
import { longDateConversion } from "../../../../helper/global";
import { logEventNew } from "includes/googleAnalytic";


const SearchResultScreen = ({ search, isMobile, pageType }) => {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [post_type, setPostType] = useState("text");

    const fetchLatestData = () => {
            setLoader(true);
            getArticleListWithFilterRange({ count: 50, offset:0, filter:{ global_search: search, ...(post_type && {post_type: post_type}) }, filterRange: {}, fields: "headline,created_at,story_id,categories,images,display_headline,weburl,post_type,weburl_r,web_url,hindi_title,blog_content,id,feature_img" }, true).then(res => {            
            setLoader(false);
            setData(res);
            document.getElementById("search-input")?.blur();
        })
    };

    useEffect(() => {
        search.length >= 4 && fetchLatestData();
        post_type && logEventNew("Search Button", "click", `${pageType}, ${post_type}  ,${isMobile ? "mobile" : "desktop"}`)
        
    }, [search, post_type]);
    const left = data.length > 3 ? data.slice(0, data.length/2 - 1) : data;
    const right = data.length > 3 ? data.slice(data.length/2 - 1, data.length) : [];
    return(<>
        <div className="rslt_wrap">
        {loader ? <Skeleton width={isMobile ? 320 : 1000} height={isMobile ? 600: 500} /> : <>
           <div className="rslt_lhs">
              <ul>
                <li className={`${post_type === "" ? "active search_lhs_template" : "search_lhs_template"}`} onClick={() => setPostType("")}>All</li>
                <li className={`${post_type === "text" ? "active search_lhs_template" : "search_lhs_template"}`} onClick={() => setPostType("text")}>News</li>
                <li className={`${post_type === "photogallery" ? "active search_lhs_template" : "search_lhs_template"}`} onClick={() => setPostType("photogallery")}>Photos</li>
                <li className={`${post_type === "videos" ? "active search_lhs_template" : "search_lhs_template"}`} onClick={() => setPostType("videos")}>Videos</li>
              </ul>
            </div> 
            <div className="rslt_rhs">
              <div className="wgd_l"> 
                {left.length > 0 ? left.map((item,index) =>  {
                    const isWebstory = item?.id?.includes("webstory");
                    const width = index === 0 ? 400 :104;
                    const height = index === 0 ? 300 : 70;
                    const src = getImage({...item, post_type: isWebstory ? "webstory" : item.post_type});
                    const title = getTitle({...item, post_type: isWebstory ? "webstory" : item.post_type});
                    const alt = getAlt({...item, post_type: isWebstory ? "webstory" : item.post_type});
                    return title && (   
                                  
                        <li key={index} className={"rltdnw search_middle_story_card"}>
                          <a onClick={() => logEventNew("Search Button", "click", `${pageType}, ${item.post_type}, ${item.story_id || item.id}, ${item?.categories?.[0]?.slug || item.categories}, ${isMobile ? "mobile" : "desktop"}`)} href={getCompleteURL(item?.weburl_r || item?.web_url_r, item?.weburl || item?.web_url)} className="search_middle_story_card">
                            <div className="topNewImgContainer search_middle_story_card">
                              {item?.ff_source && item?.ff_source === "Hyperlocal" && (
                                <span className="nwvideoicon"></span>
                              )}
                              <figure width={width} height={height}>
                                <LazyLoadImage
                                  src={src}
                                  width={width}
                                  height={height}
                                  alt={alt}
                                  className="search_middle_story_card"
                                />
                              </figure>
                            </div>
                            <div className="srtitle search_middle_story_card">
                              <h3 className="search_middle_story_card" >
                                {item?.liveblog_switcher === 1 && (
                                  <span className="livenow_btn">Live</span>
                                )}
                                {title}
                              </h3>
                              <span className="srtm">{longDateConversion(item.created_at)}</span>
                              {item.post_type === "photogallery" && <svg id="Photo" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                          <rect id="Rectangle_1563" data-name="Rectangle 1563" width="15" height="15" fill="#fff"/>
                                          <path id="Path_30" data-name="Path 30" d="M15,9.415c-.022.078-.043.157-.068.235a1.4,1.4,0,0,1-1.278.968l-.19,0c-3.137,0-6.275-.006-9.412.005A1.5,1.5,0,0,1,2.6,9.734a1.427,1.427,0,0,1-.078-.613q-.008-3.486,0-6.971a2.356,2.356,0,0,1,.018-.291A1.4,1.4,0,0,1,3.855.645c.068,0,.136,0,.2,0h9.4A1.408,1.408,0,0,1,14.982,1.82c0,.008.012.015.018.022Zm-.941-2.427c0-.063.005-.09.005-.118q0-2.4,0-4.795a.471.471,0,0,0-.523-.5q-4.779,0-9.56,0a.474.474,0,0,0-.523.527q0,3.077,0,6.154c0,.035.007.07.013.124.051-.048.086-.081.12-.115q.936-.935,1.872-1.87a1.1,1.1,0,0,1,1.614,0c.235.238.473.474.717.718l.6-.718q.837-1,1.673-2.011a1.119,1.119,0,0,1,1.171-.414,1.215,1.215,0,0,1,.648.473c.715.837,1.432,1.672,2.173,2.536M3.626,9.567a.512.512,0,0,0,.4.119H12.77c.273,0,.546,0,.819,0a.459.459,0,0,0,.475-.483c0-.2-.007-.4,0-.6a.4.4,0,0,0-.112-.3q-1.411-1.639-2.817-3.284c-.156-.182-.222-.181-.378.007Q9.5,6.541,8.235,8.057a.481.481,0,0,1-.8.032q-.5-.5-.992-.992c-.163-.164-.191-.164-.353,0L3.724,9.462c-.033.033-.065.069-.1.105" fill="#ed1c24"/>
                                          <path id="Path_31" data-name="Path 31" d="M10.93,14.363c-.208-.051-.547-.131-.885-.222Q5.592,12.95,1.138,11.756A1.41,1.41,0,0,1,.086,9.984Q.6,7.99,1.122,6a.47.47,0,0,1,.429-.395.433.433,0,0,1,.466.3.679.679,0,0,1,0,.341q-.5,1.95-1.011,3.9c-.1.4.013.611.411.717L10.892,13.4a.472.472,0,0,0,.648-.38c.1-.4.2-.811.3-1.217a.468.468,0,1,1,.907.22c-.1.435-.208.87-.324,1.3a1.439,1.439,0,0,1-1.495,1.039" fill="#ed1c24"/>
                                          <path id="Path_34" data-name="Path 34" d="M5.648,5.006A1.246,1.246,0,1,1,6.891,3.76,1.25,1.25,0,0,1,5.648,5.006m0-.937a.309.309,0,0,0,.311-.3.312.312,0,0,0-.623-.014.31.31,0,0,0,.312.315" fill="#ed1c24"/>
                                        </svg>}
                                {item.post_type === "videos" && <svg id="Video1_D" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                <rect id="Rectangle_1564" data-name="Rectangle 1564" width="15" height="15" fill="#fff"/>
                                <path id="Path_36" data-name="Path 36" d="M15,3.72v7.559a.508.508,0,0,0-.028.08,2.191,2.191,0,0,1-2.165,1.853q-5.307,0-10.614,0A2.194,2.194,0,0,1,.072,11.574c-.026-.1-.048-.2-.072-.3V3.72a.5.5,0,0,0,.027-.08A2.19,2.19,0,0,1,2.178,1.788q5.322-.006,10.644,0a2.184,2.184,0,0,1,2.1,1.61c.03.107.055.215.082.322M7.485,12.334h5.243a1.321,1.321,0,0,0,1.393-1.385q0-3.449,0-6.9a1.321,1.321,0,0,0-1.392-1.385H2.271a1.321,1.321,0,0,0-1.392,1.4v6.87a1.322,1.322,0,0,0,1.407,1.4h5.2" fill="#ed1c24"/>
                                <path id="Path_40" data-name="Path 40" d="M5.742,7.5c0-.708,0-1.416,0-2.124a.471.471,0,0,1,.23-.457.463.463,0,0,1,.508.048Q8.164,6.025,9.852,7.079a.452.452,0,0,1,0,.841Q8.167,8.976,6.479,10.03a.463.463,0,0,1-.508.05.47.47,0,0,1-.231-.456c0-.707,0-1.415,0-2.123m.886,1.4,2.24-1.4L6.628,6.1Z" fill="#ed1c24"/>
                                </svg>}
                            </div>
                          </a>
                        </li>
                      
                    );
                  }) : <>No result available</>}
                </div>
                <div className="wgd_r"> 
                {right.length > 0 ? right.map((item,index) =>  {
                    const isWebstory = item?.id?.includes("webstory");
                    const width = 104;
                    const height = 70;
                    const src = getImage({...item, post_type: isWebstory ? "webstory" : item.post_type});
                    const title = getTitle({...item, post_type: isWebstory ? "webstory" : item.post_type});
                    const alt = getAlt({...item, post_type: isWebstory ? "webstory" : item.post_type});
                    return title && (   
                                  
                        <li key={index} className={"rltdnw"}>
                          <a href={getCompleteURL(item?.weburl_r || item?.web_url_r, item?.weburl || item?.web_url)}>
                            <div className="srtitle2 search_news_stories">
                              <h3 className="search_news_stories">
                                {title}
                              </h3>
                              <span className="srtm search_news_stories">{longDateConversion(item.created_at)}</span>
                              {item.post_type === "photogallery" && <svg id="Photo" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                          <rect id="Rectangle_1563" data-name="Rectangle 1563" width="15" height="15" fill="#fff"/>
                                          <path id="Path_30" data-name="Path 30" d="M15,9.415c-.022.078-.043.157-.068.235a1.4,1.4,0,0,1-1.278.968l-.19,0c-3.137,0-6.275-.006-9.412.005A1.5,1.5,0,0,1,2.6,9.734a1.427,1.427,0,0,1-.078-.613q-.008-3.486,0-6.971a2.356,2.356,0,0,1,.018-.291A1.4,1.4,0,0,1,3.855.645c.068,0,.136,0,.2,0h9.4A1.408,1.408,0,0,1,14.982,1.82c0,.008.012.015.018.022Zm-.941-2.427c0-.063.005-.09.005-.118q0-2.4,0-4.795a.471.471,0,0,0-.523-.5q-4.779,0-9.56,0a.474.474,0,0,0-.523.527q0,3.077,0,6.154c0,.035.007.07.013.124.051-.048.086-.081.12-.115q.936-.935,1.872-1.87a1.1,1.1,0,0,1,1.614,0c.235.238.473.474.717.718l.6-.718q.837-1,1.673-2.011a1.119,1.119,0,0,1,1.171-.414,1.215,1.215,0,0,1,.648.473c.715.837,1.432,1.672,2.173,2.536M3.626,9.567a.512.512,0,0,0,.4.119H12.77c.273,0,.546,0,.819,0a.459.459,0,0,0,.475-.483c0-.2-.007-.4,0-.6a.4.4,0,0,0-.112-.3q-1.411-1.639-2.817-3.284c-.156-.182-.222-.181-.378.007Q9.5,6.541,8.235,8.057a.481.481,0,0,1-.8.032q-.5-.5-.992-.992c-.163-.164-.191-.164-.353,0L3.724,9.462c-.033.033-.065.069-.1.105" fill="#ed1c24"/>
                                          <path id="Path_31" data-name="Path 31" d="M10.93,14.363c-.208-.051-.547-.131-.885-.222Q5.592,12.95,1.138,11.756A1.41,1.41,0,0,1,.086,9.984Q.6,7.99,1.122,6a.47.47,0,0,1,.429-.395.433.433,0,0,1,.466.3.679.679,0,0,1,0,.341q-.5,1.95-1.011,3.9c-.1.4.013.611.411.717L10.892,13.4a.472.472,0,0,0,.648-.38c.1-.4.2-.811.3-1.217a.468.468,0,1,1,.907.22c-.1.435-.208.87-.324,1.3a1.439,1.439,0,0,1-1.495,1.039" fill="#ed1c24"/>
                                          <path id="Path_34" data-name="Path 34" d="M5.648,5.006A1.246,1.246,0,1,1,6.891,3.76,1.25,1.25,0,0,1,5.648,5.006m0-.937a.309.309,0,0,0,.311-.3.312.312,0,0,0-.623-.014.31.31,0,0,0,.312.315" fill="#ed1c24"/>
                                        </svg>}
                                {item.post_type === "videos" && <svg id="Video1_D" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                <rect id="Rectangle_1564" data-name="Rectangle 1564" width="15" height="15" fill="#fff"/>
                                <path id="Path_36" data-name="Path 36" d="M15,3.72v7.559a.508.508,0,0,0-.028.08,2.191,2.191,0,0,1-2.165,1.853q-5.307,0-10.614,0A2.194,2.194,0,0,1,.072,11.574c-.026-.1-.048-.2-.072-.3V3.72a.5.5,0,0,0,.027-.08A2.19,2.19,0,0,1,2.178,1.788q5.322-.006,10.644,0a2.184,2.184,0,0,1,2.1,1.61c.03.107.055.215.082.322M7.485,12.334h5.243a1.321,1.321,0,0,0,1.393-1.385q0-3.449,0-6.9a1.321,1.321,0,0,0-1.392-1.385H2.271a1.321,1.321,0,0,0-1.392,1.4v6.87a1.322,1.322,0,0,0,1.407,1.4h5.2" fill="#ed1c24"/>
                                <path id="Path_40" data-name="Path 40" d="M5.742,7.5c0-.708,0-1.416,0-2.124a.471.471,0,0,1,.23-.457.463.463,0,0,1,.508.048Q8.164,6.025,9.852,7.079a.452.452,0,0,1,0,.841Q8.167,8.976,6.479,10.03a.463.463,0,0,1-.508.05.47.47,0,0,1-.231-.456c0-.707,0-1.415,0-2.123m.886,1.4,2.24-1.4L6.628,6.1Z" fill="#ed1c24"/>
                                </svg>}
                            </div>
                            <div className="topNewImgContainer">
                              {item?.ff_source && item?.ff_source === "Hyperlocal" && (
                                <span className="nwvideoicon"></span>
                              )}
                              <figure width={width} height={height} className="search_news_stories">
                                <LazyLoadImage
                                  src={src}
                                  width={width}
                                  height={height}
                                  alt={alt}
                                  className="search_news_stories"
                                />
                              </figure>
                            </div>
                          </a>
                        </li>
                      
                    );
                  }) : <></>}
                </div>
              </div>
        </>}
        </div>
        <style jsx>{`
        .rslt_wrap {display: flex;}
        .rslt_lhs { width: 20%; position: relative;}
        .rslt_rhs { width: 80%; display: flex; justify-content: space-between;}
        .rslt_lhs ul {padding: 0 25px; cursor: pointer; position: fixed;}
        .rslt_lhs ul li.active {background-color: #E1261D; color: #fff; height: 36px;}
        .rslt_lhs ul li {font-size: 20px; padding: 2px 17px; margin-bottom: 30px; position: relative; width: 100px;}
        .rslt_lhs ul li.active:before {border-width: 17px 0 19px 19px;  content: "";position: absolute; border-style: solid;top: 0px; transform: rotate(180deg);border-color: #e1261d transparent;right: -18px;}
        .wgd_l {width: 400px;}
        .wgd_r { width: 341px;}
        .topNewImgContainer figure > img{border-radius: 5px;}        
        .srtm{font-size: 13px; line-height: 23px; color: #969696; letter-spacing: 0;}
        .rslt_rhs .rltdnw { border-bottom: 1px solid#e0e0e0;  padding: 20px 0; position: relative;}
        .rslt_rhs .rltdnw a { display: flex;}
        .rslt_rhs .rltdnw a h3 { font-size: 14px; line-height: 23px;}
        .rslt_rhs .rltdnw a .srtitle, .rslt_rhs .rltdnw a .srtitle2  { width: calc(100% - 124px); position: relative;}
        
        .rslt_rhs .rltdnw a .topNewImgContainer{ margin-left: 10px; position: relative;}
        .rslt_rhs .rltdnw a .topNewImgContainer figure,  .rslt_rhs .wgd_l .rltdnw a .topNewImgContainer figure { width: 104px; height: 70px; border-radius: 5px;}
        .wgd_l .rltdnw:first-child { margin-bottom: 0;}
        .wgd_l .rltdnw:first-child a { display: block; }
        .wgd_l .rltdnw:first-child a .topNewImgContainer {margin: 0;}
        .rslt_rhs .wgd_l .rltdnw:first-child a .topNewImgContainer figure, .rslt_rhs .wgd_l .rltdnw:first-child a .topNewImgContainer figure img {width: 400px; height: 283px;}
       .rslt_rhs .wgd_l .rltdnw a{flex-direction: row-reverse;} 
       .rslt_rhs .rltdnw:first-child a .srtitle {  width: 100%;}
       .rslt_rhs .rltdnw:first-child {padding-top: 0;}
       .wgd_l .rltdnw:first-child h3 {font-size: 20px !important; line-height: 35px !important;  color: #000;  padding-top: 5px;}
       .rslt_rhs .rltdnw a .srtitle svg, .rslt_rhs .rltdnw a .srtitle2 svg {margin: 0 10px;vertical-align: middle;}     

        @media (max-width: 768px){
          .rslt_wrap {display: block;}
          .rslt_lhs, .rslt_rhs {  width: 100%;padding: 48px 10px 0;flex-wrap: wrap;}
          .wgd_l, .wgd_r{ width: 100%;}
          .rslt_lhs ul{display:flex; padding: 0 10px; justify-content: flex-start;    margin-bottom: 10px; position:relative;}
          .rslt_lhs ul li { font-size: 16px; line-height: 27px; color: #0E1F3F; padding: 0 0 5px; font-weight: normal; cursor: pointer; margin: 0 30px 0 0;  width: auto; font-weight: 600;}
          .rslt_lhs ul li.active:before {content: ""; display: none; }
          .rslt_lhs ul li.active {color: #E1261D; border-bottom: 3px solid #E1261D; padding-bottom: 5px;font-weight: bold; background-color: transparent;}
          .wgd_l .rltdnw a, .wgd_l .rltdnw:first-child a, .rslt_rhs .rltdnw a{display: flex; justify-content: space-between;}
          .rslt_rhs .wgd_l .rltdnw:first-child a .topNewImgContainer figure, .rslt_rhs .wgd_l .rltdnw:first-child a .topNewImgContainer figure img{ width: 104px; height: 70px; border-radius: 5px;}
          .wgd_l .rltdnw:first-child h3 { font-size: 14px !important; line-height: 23px !important; color: #333333;}
          .rslt_rhs .rltdnw:first-child a .srtitle {width: calc(100% - 124px);}
          .rslt_lhs {
            position: fixed;
            background-color: #fff;
            z-index: 9;
            top: 66px;
            padding: 9px 0 0;
        }
        }

        `}</style>
    </>)
};

export default SearchResultScreen;