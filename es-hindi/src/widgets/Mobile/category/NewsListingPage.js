import React from "react";

import 'lazysizes';
import { get_static_img } from 'includes/helper';
import siteConfig from "config/site.config";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const NewsListingPage = (props) => {
  const articleData = props.initialData;

  return (
    <>
      {/* News Listing(Grid layout) start here */}
      <div className="grid_story">
        <div className="container">
          <ul className="grid_list">
            {/* articleData.splice(0, 4).map((topNews, key) */}
            {articleData.map((topNews, key) => {
              return <>
                {(key % 8 == 0 && key > 0) ?
                  <li key={'ad_' + key} className="addcls">
                    <div className="pwa_add">
                      <div className="pwa_add_midd">
                        <span className="">Advertisement</span>
                        <SiteAd slotId="mobile_atf_300" adUnit={props.pageAds.ATF_300} sizes={[[300, 250], [336, 280]]} lazyload={true} />
                        <SiteAd
                          slotId="PG_Slider_1x1"
                          adUnit={
                            "NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1"
                          }
                          sizes={[[1, 1]]}
                          renderOutOfThePage={true}
                          removeAdSpan={true}
                          loadonScroll={true}
                        />
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

      <style jsx global>{`
        ol, ul {
          list-style: none;
        }
        .grid_story {     width: 100%;     clear: both; }  .grid_story_top {     display: flex;     align-items: center;  justify-content: space-between;     box-sizing: border-box;     padding: 15px 0; }  ul.grid_list {  display: flex;     flex-wrap: wrap;  justify-content: center; 	border-bottom: 1px solid #ccc;     margin-bottom: 15px; }  ul.grid_list li {      min-height: 231px;   width: calc(50% - 15px);     margin: 0 5px;     border: 1px solid #ddd;     background: #fff;     margin-bottom: 16px;     box-sizing: border-box;     padding-bottom: 8px;     border-radius: 10px; }  ul.grid_list li a {     display: block;     color: #fff; }  .grid_story_img {     width: 100%;     position: relative; }  .grid_story_img img {     display: block;     width: 100%;     border-radius: 10px; }  ul.grid_list .lstintro {     width: 100%;     color: #000;     padding: 10px;     box-sizing: border-box; }  span.grid_story_tpc {     position: absolute;     bottom: 0;     left: 0;     right: 0;     padding: 8px;     top: auto;     font-weight: 700;     z-index: 2;     background: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));     background: -moz-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));     background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); }  ul.grid_list .lstintro h2 {     height: auto; }  .grid_link {     line-height: 26px;     padding: 0 16px;     border-radius: 5px;     background: #fff;     font-size: 11px;     color: #828282;     border: 1px solid #828282;     text-decoration: none; } 


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
    </>
  );
};

export default NewsListingPage;
