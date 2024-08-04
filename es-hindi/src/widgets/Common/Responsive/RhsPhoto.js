import React, { useContext } from "react";
import getConfig from "next/config";
//import { imageLoader } from "includes/article.util";
import Slider from "react-slick/lib";
import ReactHtmlParser from "html-react-parser";
import {getCompleteURL,getRelativeURL } from "util/global/Helper";
import { GlobalContext } from "../../../GlobalStore";
//import { get_static_img } from "includes/helper";
import LazyLoadImage from "components/Common/CustomImage";
const { publicRuntimeConfig } = getConfig();

const RhsPhoto = ({ isMobile = false, isAmp = false, photoStories = [] }) => {
  const { globalState = {}, updateData } = useContext(GlobalContext);
  const { ps = [] } = globalState;

  if (!(photoStories.length || ps.length)) {
    return null;
  }

  if (!ps.length) {
    updateData(photoStories, "ps");
  } else {
    photoStories = ps;
  }

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: isAmp ? false : true,
    arrows: false,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    gap: 0,
  };
  return (
    <>
      <div className="photowidget photodiv">
        <div className="globalhdnew">
          <h2>
            <a href={publicRuntimeConfig.siteUrl + "photogallery/"}>फोटो</a>
          </h2>
        </div>
        {photoStories && photoStories.length && (
          <Slider className="photowidget-slider" {...settings}>
            {photoStories.map((topNews, key) => {
              const width = 412;
              const height = 240;
              // const filterOut =
              //   (topNews?.images?.url || "") !== undefined
              //     ? (topNews?.images?.url || "").includes("storyasset.link")
              //     : false;
              // const imageSrc = topNews?.images?.url || ""
              //   ? topNews?.images?.url || ""
              //   : imageLoader(topNews?.images?.url || "", width, height);
              return (
                <div className="slide" key={key}>
                  <a
                    href={getCompleteURL(topNews.weburl_r,topNews.weburl)}
                    // /	onClick={() => logEvent("webstory","Click-home",item.web_strory_url)}
                  >
                    {isAmp ? (
                      <figure>
                        <LazyLoadImage
                          src={topNews?.images?.url}
                          width={width}
                          height={height}
                          alt={topNews.display_headline || topNews.headline}
                          title={topNews.display_headline || topNews.headline}
                          isAMP={isAmp}
                          isRes={true}
                        />                        
                      </figure>
                    ) : (
                      <LazyLoadImage
                      src={topNews?.images?.url}
                      width={width}
                      height={height}
                      alt={topNews.display_headline || topNews.headline}
                      title={topNews.display_headline || topNews.headline}
                      isAMP={isAmp}
                    />
                      // <img
                      //     src={get_static_img(
                      //       imageSrc || publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH,
                      //       width,
                      //       height
                      //     )}
                      //     data-src={get_static_img(
                      //       imageSrc || publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH,
                      //       width,
                      //       height
                      //     )}
                      //     alt={topNews.display_headline || topNews.headline}
                      //     title={topNews.display_headline || topNews.headline}
                      //     loading="lazy"
                      //   />
                      // <img
                      //   width={width}
                      //   height={height}
                      //   src={imageSrc}
                      //   alt={topNews.display_headline || topNews.headline}
                      //   title={topNews.display_headline || topNews.headline}
                      //   loading="lazy"
                      // />
                    )}
                    <span className="phototitle">
                      {topNews?.headline ? ReactHtmlParser(topNews?.headline?.replace(/\\/g, "")):null}
                    </span>
                  </a>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
      <style jsx global>{`
        .photowidget {
          margin-top: 10px;
        }
        .photowidget-slider .slick-track {
          display: flex;
        }
        .photowidget-slider .slick-slide {
          flex-shrink: 0;
          overflow: hidden;
          position: relative;
          justify-content: center;
          background: #000;
          ${isAmp ? `display:block` : `display: flex`}
        }
        .globalhdnew {
          border-bottom: 1px solid #001536;
          position: relative;
          margin: 10px 15px;
        }
        .globalhdnew:before {
          content: "";
          width: 25px;
          height: 5px;
          background: #ed1c24;
          position: absolute;
          left: 0;
          bottom: -2px;
        }
        .globalhdnew h2 {
          color: #001536;
          font-size: 20px;
          font-weight: 700;
          display: inline-block;
          line-height: 20px;
        }
        .phototitle {
          font-size: 16px;
          background: linear-gradient(transparent, #000);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 30px 20px 10px 20px;
          text-align: center;
          color: #fff;
          font-weight: bold;
          line-height: 22px;
        }
        ${!isAmp
          ? `.photowidget .slick-dots{text-align:center;padding:5px 0px;position:relative;z-index:1}
      .photowidget .slick-dots li {width:5px;height:5px;border-radius:100%;margin:0px 5px;background:#ccc;display:inline-block;}
      .photowidget .slick-dots li.slick-active{width:15px;border-radius:20px;background:#e40406}
      .photowidget .slick-dots li button{display:none;}`
          : ""}

        .slick-list {
          ${isAmp ? `overflow:scroll` : `overflow:hidden`};
        }
      `}</style>
    </>
  );
};

export default RhsPhoto;
