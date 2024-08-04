import React, { useState, useEffect } from "react";
import { Waypoint } from 'react-waypoint';
import getConfig from 'next/config';
import 'lazysizes';
import { get_static_img } from 'includes/helper';
import siteConfig from "config/site.config";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const { publicRuntimeConfig } = getConfig();

const CategoryAjax = (props) => {
    // console.log("props ajax: ", props);

    const [pageNo, setPageNo] = useState(3);
    const [articleData, setArticleData] = useState([]);

    let _sub_cat = '';
    const pageLimit = (props.pageParam.pageLimit > 0) ? props.pageParam.pageLimit : 18;

    if (props.pageParam.sub_cat) {
        _sub_cat = '/' + props.pageParam.sub_cat;
    }

    const fetchArticle = async () => {
        // console.log("API pageNo : ", pageNo);
        // console.log("API Calls pageCount : " + pageCount + ", pageNo : " + pageNo + ", curr_page_no :", props.pageParam.curr_page_no);

        let categoryStoriesList = await fetch(publicRuntimeConfig.nodeApiAjaxUrl + "/pwa/get-category-page-stories-list/" + props.pageParam.category + _sub_cat + "/" + pageLimit + "/" + pageNo);
        categoryStoriesList = await categoryStoriesList.json();

        // console.log("API Call: ", publicRuntimeConfig.nodeApiAjaxUrl + "/pwa/get-category-page-stories-list/" + props.pageParam.category + _sub_cat + "/" + pageLimit + "/" + pageNo);

        setArticleData([...articleData, ...categoryStoriesList.data]);
        const _pg = parseInt(pageNo) + 1;
        setPageNo(_pg);

        const currentUrl = '/' + props.pageParam.category + _sub_cat + '/page-' + pageNo + "/";
        const currentHash = currentUrl.replace(siteConfig.mainUrl, publicRuntimeConfig.siteUrl);
        history.replaceState({}, '', currentHash);

        const hash = currentUrl.replace(siteConfig.mainUrl, '');
        ga('set', { location: currentHash, page: hash });
        ga("send", "pageview");

        self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "6683813" });

        // PV Candidate
        // await axios(publicRuntimeConfig.nodeApiAjaxUrl + "/pv-candidate");
    };

    const ajaxCategoryListing = (srcollProp) => {
        if (srcollProp.previousPosition === "below") {
            fetchArticle();
        }
    };

    // const handleWaypointEnter = (scrollProp) => {
    //     if (scrollProp.previousPosition != "above") {
    //         if (parseInt(pageNo) > 2) {
    //             setPageNo(parseInt(pageNo) + 1);
    //         }
    //     }
    // };

    // const handleWaypointEnterBack = (scrollProp) => {
    //     if (scrollProp.previousPosition == "above" && pageNo > 2) {
    //         setPageNo(parseInt(pageNo) - 1);
    //     }
    // };

    useEffect(() => {
        // setPageNo(props.pageNo);
        // fetchArticle();
    }, []);

    return (
        <React.Fragment>
            {/* News Listing(Grid layout) start here */}
            <div className="grid_story">
                <div className="container">
                    <ul className="grid_list">
                        {articleData.map((topNews, key) => {
                            return <>
                                {(key % 8 == 0 || key == 0) ?
                                    <li key={'ad_' + key} className="addcls">
                                        <div className="pwa_add">
                                            <div className="pwa_add_midd">
                                                <span className="">Advertisement</span>
                                                <SiteAd slotId={"mobile_atf_300_" + key} adUnit={props.pageAds.ATF_300} sizes={[[300, 250], [336, 280]]} lazyload={true}/>
                                            </div>
                                        </div>
                                    </li>
                                    : ''
                                }

                                <li key={key}>
                                    <a href={topNews.weburl}>
                                        <figure>
                                            <div className={"grid_story_img " + `${topNews.post_type == 'photogallery' ? ' list_photo_icon':''}${topNews.post_type == 'video' ? ' list_video_icon' : ''}`}>
                                                <img src={get_static_img(siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH, 360, 288)} data-src={get_static_img(topNews.images.url, 360, 288)} alt={topNews.title} title={topNews.title} className="lazyload" />
                                                <span className="grid_story_tpc">{topNews.categories}</span>
                                            </div>
                                            <div className="lstintro">
                                                <h2>{topNews.title}</h2>
                                            </div>
                                        </figure>
                                    </a>
                                </li>
                            </>;
                        })}
                    </ul>
                </div>
            </div>
            {/* News Listing(Grid layout) end here */}

            <Waypoint onEnter={ajaxCategoryListing} />

            <style jsx global>{`
                ol, ul {
                    list-style: none;
                  }
                  .grid_story {     width: 100%;     clear: both; }  .grid_story_top {     display: flex;     align-items: center;  justify-content: space-between;     box-sizing: border-box;     padding: 15px 0; }  ul.grid_list {  display: flex;     flex-wrap: wrap;  justify-content: center; 	border-bottom: 1px solid #ccc;     margin-bottom: 15px; }  ul.grid_list li {     min-height: 231px;    width: calc(50% - 15px);     margin: 0 5px;     border: 1px solid #ddd;     background: #fff;     margin-bottom: 16px;     box-sizing: border-box;     padding-bottom: 8px;     border-radius: 10px; }  ul.grid_list li a {     display: block;     color: #fff; }  .grid_story_img {     width: 100%;     position: relative; }  .grid_story_img img {     display: block;     width: 100%;     border-radius: 10px; }  ul.grid_list .lstintro {     width: 100%;     color: #000;     padding: 10px;     box-sizing: border-box; }  span.grid_story_tpc {     position: absolute;     bottom: 0;     left: 0;     right: 0;     padding: 8px;     top: auto;     font-weight: 700;     z-index: 2;     background: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));     background: -moz-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));     background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); }  ul.grid_list .lstintro h2 {     height: auto; }  .grid_link {     line-height: 26px;     padding: 0 16px;     border-radius: 5px;     background: #fff;     font-size: 11px;     color: #828282;     border: 1px solid #828282;     text-decoration: none; } 
          
          
                  ul.grid_list .lstintro h2{
                      font-size: 14px;
                      line-height: 1.65;
                  }
                  ul.grid_list li.addcls {
                    width: 100%;
                    margin: 0 0;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                  }
            `}</style>
        </React.Fragment>
    );
};

export default CategoryAjax;
