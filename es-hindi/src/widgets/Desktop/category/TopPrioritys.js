import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { get_static_img } from "includes/helper";

const TopPrioritys = (props) => {

  useEffect(() => {
    if (props.sliderFlag) {
      if (
        Array.isArray(props.initialData.leftCat) &&
        props.initialData.leftCat.length
      ) {
        new Glide(".section-blog-left-img", {
          perView: 1,
          autoplay: 2000
        }).mount();
      }
    }
  }, []);

  if (!props.initialData.leftCat) {
    return false;
  }

  return (
    // <topOtherStoriesContext.Provider>
    <>
      <div className="section-blog-left-img">
        <div data-glide-el="track">
          <ul>
            {props.initialData.leftCat.map((topNews, key) => {
              const { images, display_headline, headline, weburl_r, intro, post_type, ff_source, local18_video, categories } = topNews.article_details || topNews || {};
              return topNews == null ? (
                ""
              ) : (
                <li key={`pl${key}`}>
                  <a href={weburl_r}>
                    <figure>
                      {(ff_source == 'Hyperlocal' && local18_video != '') ? <span className="nwvideoicon"></span> : ""}
                      <img
                        src={get_static_img(
                          images?.url,
                          561,
                          374
                        )}
                        alt={display_headline || headline || ""}
                        title={display_headline || headline || ""}
                        width={561}
                        height={374}
                        className="lazyload"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=561&height=374";
                        }}
                      />
                    </figure>
                    <h2>
                      <span>{categories.length > 0 ? categories[1] ? categories[1].name : categories[0].name : 'News'}</span>
                      {display_headline || headline || "News18 Hindi"}
                    </h2>
                  </a>
                </li>
              );
                      })}
          </ul>
          <div
            className="section-blog-left-img-bullets"
            data-glide-el="controls[nav]"
          >
            {props.initialData.leftCat.map((topNews, key) => (
              <button data-glide-dir={"=" + key} className=""></button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-blog-left-img-list forstates">
        <ul>
          {props.initialData.rightCat.map((topNewsRight, key) => {
            const { images, display_headline, headline, weburl_r, intro, post_type, ff_source, local18_video, categories } = topNewsRight.article_details || topNewsRight || {};
            return topNewsRight == null ? (
              ""
            ) : (
              <li key={`pr${key}`}>
                <span>{categories.length > 0 ? categories[1] ? categories[1].name : categories[0].name : 'News'}</span>
                <a href={weburl_r}>
                  <h3>{display_headline || headline || 'News18 Hindi'}</h3>
                </a>
              </li>
            );
            })}
        </ul>
      </div>

      <style jsx global>{`
        .photo_icon:after {
          background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/photo-ss.png)
            no-repeat;
          content: "";
          width: 20px;
          height: 20px;
          display: inline-block;
          vertical-align: middle;
          left: 0;
          position: absolute;
          top: 16px;
        }

        .video_icon:after {
          background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/video-ss.png)
            no-repeat;
          content: "";
          width: 20px;
          height: 20px;
          display: inline-block;
          vertical-align: middle;
          left: 0;
          position: absolute;
          top: 12px;
        }

        .section-blog-left {
          width: calc(100% - 315px);
          float: left;
        }
        .outer {
          margin: auto;
          max-width: 1245px;
          padding: 0 10px;
          position: relative;
          z-index: 1;
        }
        .add {
          position: relative;
          z-index: 99;
        }
        .foraddshow {
          width: 100%;
          min-height: 250px;
          background: #f5f5f5;
          line-height: 0px;
        }

        .section-blog-left-img {
          width: 61%;
          float: left;
          position: relative;
          overflow: hidden;
        }
        .section-blog-left-img ul {
          display: flex;
        }
        .section-blog-left-img ul li a {
          position: relative;
          display: block;
        }
        .section-blog-left-img ul li a figure {
          width: 100%;
          line-height: 0;
        }
        .section-blog-left-img ul li a figure img {
          width: 100%;
        }
        .section-blog-left-img ul li a h1,
        .section-blog-left-img ul li a h2 {
          background: linear-gradient(transparent, #000);
          bottom: 0;
          font-size: 26px;
          left: 0;
          line-height: 36px;
          padding: 50px 20px 35px 20px;
          position: absolute;
          right: 0;
          color: #fff;
        }
        .section-blog-left-img ul li a h1 span,
        .section-blog-left-img ul li a h2 span {
          font-size: 15px;
          color: #fff;
          display: block;
          background: #e1261c;
          position: absolute;
          top: -5px;
          padding: 0 10px;
          height: 38px;
          line-height: 38px;
          left: 0;
        }
        .section-blog-left-img-list {
          width: 36%;
          float: right;
        }
        .section-blog-left-img-list ul li {
          padding: 10px 30px 10px 0;
          font-size: 16px;
          line-height: 26px;
          box-sizing: border-box;
          font-weight: 700;
          background: #fff;
          border-bottom: 1px solid #eee;
          position: relative;
        }
        .section-blog-left-img-list ul li:after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          border-top: 2px solid #ccc;
          border-right: 2px solid #ccc;
          top: 50%;
          right: 3px;
          transform: rotate(45deg);
          margin-top: -6px;
        }
        .section-blog-left-img-list ul li span {
          font-size: 12px;
          color: #e1261c;
          display: block;
          line-height: 20px;
        }
        .section-blog-left-img-list ul li:first-child {
          border-top: 1px solid #eee;
        }
        .section-blog-left-img-list ul li a {
          color: #232323;
          display: block;
        }
        .section-blog-left-img-list ul li:hover a {
          color: #ed1b24;
        }
        .section-blog-left-img-list ul li:hover:after {
          border-top: 2px solid #ed1b24;
          border-right: 2px solid #ed1b24;
        }
        .section-blog-left-img-list.forstates ul li {
          padding: 6px 30px 6px 0;
        }
        .section-blog-left-img-bullets {
          position: absolute;
          bottom: 15px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
        }
        .section-blog-left-img-bullets button {
          width: 10px;
          height: 10px;
          border-radius: 100%;
          margin: 0 6px;
          padding: 0;
          outline: 0;
          border: none;
        }
        .section-blog-left-img-bullets button.glide__bullet--active {
          opacity: 0.5;
        }
        .blog-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .blog-list .blog-list-blog {
          width: 32%;
          margin-bottom: 20px;
          position: relative;
        }
        .section-blog-left-img ul li{flex-shrink:0}
        .section-blog-left-img-list ul li a h3 {
          font-size: 17px;
          line-height: 24px;
        }
        .section-blog-left-img ul li a h1,
        .section-blog-left-img ul li a h2 {
          background: linear-gradient(transparent, #000);
          bottom: 0;
          font-size: 26px;
          left: 0;
          line-height: 36px;
          padding: 50px 20px 35px 20px;
          position: absolute;
          right: 0;
          color: #fff;
        }
        .section-blog-left-img ul li a figure {width: 550px; line-height: 0;height: 374px; overflow: hidden;}
        .section-blog-left-img ul li a figure img {width: 550px!important;height: 372px!important;}
        .nwvideoicon {
					width: 45px;
					height: 45px;
					position: absolute;
					top: 50%;
					left: 50%;
					z-index: 1;
					margin: -22px 0 0 -22px;
					cursor: pointer;
					opacity: .7;
					background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
				}
      `}</style>
    </>
    // </topOtherStoriesContext.Provider>
  );
};

export default TopPrioritys;
