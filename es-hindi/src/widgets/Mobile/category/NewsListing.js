import React from "react";
import 'lazysizes';
import { get_static_img } from 'includes/helper';
import siteConfig from "config/site.config";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const NewsListing = (props) => {
  const NewsDataTop = props.initialData.first;
  const NewsDataMid = props.initialData.second;
  const NewsDataBottom = props.initialData.third;

  return (
    <>
      {/* News Listing(Grid layout) start here */}
      <div className="grid_story">
        <div className="container">
          {(props.nextPageUrl) ?
            <div className="grid_story_top">
              <h2 className="grid_hd"><a href="#"></a></h2>
              <a href={props.nextPageUrl} className="grid_link">Aur Dekhe ...</a>
            </div>
            : ""
          }
          <ul className="grid_list">
            {NewsDataTop.map((topNews, key) => (
              <li key={key}>
                <a href={topNews.weburl}>
                  <figure>
                    <div className={"grid_story_img " + `${topNews.post_type == 'photogallery' ? ' list_photo_icon':''}${topNews.post_type == 'video' ? ' list_video_icon' : ''}`}>
                      {
                        (topNews.images) ? <img src={get_static_img(siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH, 360, 288)} data-src={get_static_img(topNews.images.url, 360, 288)} alt={topNews.title} title={topNews.title} className="lazyload" /> : <img src={get_static_img(siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH, 360, 288)} data-src={get_static_img('', 360, 288)} alt={topNews.title} title={topNews.title} className="lazyload" />
                      }

                      <span className="grid_story_tpc">{topNews.categories}</span>
                    </div>
                    <div className="lstintro">
                      <h2>{topNews.title}</h2>
                    </div>
                  </figure>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Section start here */}
      <div className="pwa_add">
        <div className="pwa_add_midd">
          <span className="">Advertisement</span>
          <SiteAd slotId="mobile_atf_300" adUnit={props.pageAds.ATF_300} sizes={[[300, 250], [336, 280]]} lazyload={true}/>
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
      {/* Add Section end here */}

      <div className="grid_story">
        <div className="container">
          <ul className="grid_list">
            {NewsDataMid.map((bottomNews, key) => (
              <li key={key}>
                <a href={bottomNews.weburl}>
                  <figure>
                    <div className={"grid_story_img " + `${bottomNews.post_type == 'photogallery' ? ' list_photo_icon':''}${bottomNews.post_type == 'video' ? ' list_video_icon' : ''}`}>

                      {
                        (bottomNews.images) ? <img src={get_static_img(siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH, 360, 288)} data-src={get_static_img(bottomNews.images.url, 360, 288)} alt={bottomNews.title} title={bottomNews.title} className="lazyload" /> : <img src={get_static_img(siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH, 360, 288)} data-src={get_static_img('', 360, 288)} alt={bottomNews.title} title={bottomNews.title} className="lazyload" />
                      }

                      <span className="grid_story_tpc">{bottomNews.categories}</span>
                    </div>
                    <div className="lstintro">
                      <h2>{bottomNews.title}</h2>
                    </div>
                  </figure>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Section start here */}
      <div className="pwa_add">
        <div className="pwa_add_midd">
          <span className="">Advertisement</span>
          <SiteAd slotId="mobile_btf_300" adUnit={props.pageAds.BTF_300} sizes={[[300, 250], [336, 280]]} lazyload={true} />
        </div>
      </div>
      {/* Add Section end here */}

      <div className="grid_story">
        <div className="container">
          <ul className="grid_list">
            {NewsDataBottom.map((bottomNews, key) => (
              <li key={key}>
                <a href={bottomNews.weburl}>
                  <figure>
                    <div className={"grid_story_img " + `${bottomNews.post_type == 'photogallery' ? ' list_photo_icon':''}${bottomNews.post_type == 'video' ? ' list_video_icon' : ''}`}>
                      <img src={get_static_img(siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH, 360, 288)} data-src={get_static_img(bottomNews.images.url, 360, 288)} alt={bottomNews.title} title={bottomNews.title} className="lazyload" />
                      <span className="grid_story_tpc">{bottomNews.categories}</span>
                    </div>
                    <div className="lstintro">
                      <h2>{bottomNews.title}</h2>
                    </div>
                  </figure>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* News Listing(Grid layout) end here */}

      <style jsx global>{`
        ol, ul {
          list-style: none;
        }
        .grid_story {     width: 100%;     clear: both; }  .grid_story_top {     display: flex;     align-items: center;     justify-content: space-between;     box-sizing: border-box;     padding: 15px 0; }  ul.grid_list {     display: flex;     flex-wrap: wrap;     align-items: center;     justify-content: center; 	border-bottom: 1px solid #ccc;     margin-bottom: 15px; }  ul.grid_list li {     width: calc(50% - 5px);     margin: 0 5px;  min-height: 240px;     border: 1px solid #ddd;     background: #fff;     margin-bottom: 16px;     box-sizing: border-box;     padding-bottom: 8px;     border-radius: 10px; }  ul.grid_list li:nth-child(odd) {     margin-left: 0; }  ul.grid_list li:nth-child(even) {     margin-right: 0; }  ul.grid_list li a {     display: block;     color: #fff; }  .grid_story_img {     width: 100%;     position: relative; }  .grid_story_img img {     display: block;     width: 100%;     border-radius: 10px; }  ul.grid_list .lstintro {     width: 100%;     color: #000;     padding: 10px;     box-sizing: border-box; }  span.grid_story_tpc {     position: absolute;     bottom: 0;     left: 0;     right: 0;     padding: 8px;     top: auto;     font-weight: 700;     z-index: 2;     background: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));     background: -moz-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));     background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); }  ul.grid_list .lstintro h2 {     height: auto; }  .grid_link {     line-height: 26px;     padding: 0 16px;     border-radius: 5px;     background: #fff;     font-size: 11px;     color: #828282;     border: 1px solid #828282;     text-decoration: none; } 
      `}</style>
    </>
  );
};

export default NewsListing;
