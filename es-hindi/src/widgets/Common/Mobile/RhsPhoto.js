import React, { memo } from "react";
import { imageLoader } from "includes/article.util";

const RhsPhoto = ({ photoStories = [] }) => {
  return (
    <>
      <div className="side_bab_gallery">
        <span className="ph_heading">
          <a href="/photogallery/">फोटो</a>
        </span>
        <ul className="gallery_list">
          {photoStories &&
            photoStories.map((topNews, key) => (
              <li key={"sbph-" + topNews.id}>
                <a href={topNews.url || topNews.weburl}>
                  <div className="gallery_img">
                    <img
                      alt={topNews.display_headline || topNews.title || topNews.intro}
                      title={topNews.display_headline || topNews.title || topNews.intro}
                      src={imageLoader(topNews?.images?.url || "", 360, 288)}
                      className="lazyload"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=360&height=288";
                      }}
                    />

                    {/* <LazyImage
                      width={key == 0 ? 340 : 162}
                      height={key == 0 ? 220 : 107}
                      src={ topNews.images.url}
                      alt={topNews.display_headline || topNews.title || topNews.intro}
                      title={topNews.display_headline || topNews.title || topNews.intro}
                    /> */}
                  </div>
                  <p className="gallery_title">
                    {topNews.display_headline || topNews.title || topNews.intro}
                  </p>
                </a>
              </li>
            ))}
        </ul>
      </div>
      <style jsx>{`
        .side_bab_gallery {
          width: 100%;
          margin: 15px 0;
          clear: both;
          min-height: 376px;
        }
        .gallery_list {
          display: flex;
          flex-wrap: wrap;
        }
        .gallery_list li:first-child {
          width: 100%;
          margin-bottom: 0;
          padding: 0;
        }
        .gallery_list li {
          width: 50%;
          position: relative;
          padding: 0 4px;
          box-sizing: border-box;
        }
        .gallery_img {
          width: 100%;
          position: relative;
          margin-bottom: 10px;
          background: #eee;
        }
        .gallery_img figure {
          width: 100%;
        }
        .gallery_img img {
          width: 100%;
          display: block;
        }
        .gallery_list li:first-child .gallery_title {
          background: rgba(0, 0, 0, 0.57);
          position: absolute;
          bottom: 9px;
          padding: 3px 10px;
          width: 100%;
          box-sizing: border-box;
          line-height: 1.65;
          left: 0;
          color: #fff;
        }
        .gallery_list li:first-child a {
          color: #fff;
        }
        .gallery_list .gallery_title {
          font-size: 14px;
          line-height: 20px;
          color: #232323;
          box-sizing: border-box;
        }
        .gallery_list li a {
          text-decoration: none;
        }
        .gallery_list li:nth-child(odd) {
          padding-right: 0;
        }
        .gallery_list li:nth-child(even) {
          padding-left: 0;
        }
        .gallery_img:after {
          content: "";
          width: 62px;
          height: 62px !important;
          position: absolute;
          top: 50%;
          left: 0;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/photo_icon_blk_1632135667.svg)
            no-repeat;
          right: 0;
          margin: auto;
          transform: translateY(-50%);
        }
        .ph_heading {
          color: #101010;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 5px;
          font-family: Mukta, sans-serif;
        }
        .ph_heading a {
          color: #101010;
          text-decoration: none;
        }
        .gallery_list li:hover .gallery_title {
          color: #ed1c24;
        }
        .gallery_list li:hover .gallery_img:after {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/photo_icon_rgt_1632134712.svg)
            no-repeat;
        }
      `}</style>
    </>
  );
};
export default memo(RhsPhoto);
