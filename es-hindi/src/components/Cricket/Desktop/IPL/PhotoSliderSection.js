import LazyLoadImage from "components/Common/CustomImage";
import React, { useState } from "react";
import { IPL_YEAR } from "includes/ipl.helper";

const PhotoSliderSection = ({ offFieldPriority, photoPriority = [] }) => {
  const [selectedPhotoArticleIndex, setSelectedPhotoArticleIndex] = useState(0);
  const selectedPhotoArticle = photoPriority.length
    ? photoPriority[selectedPhotoArticleIndex]
    : {};

  const handleOnLeftClick = () => {
    const index = selectedPhotoArticleIndex - 1;
    if (index >= 0) {
      setSelectedPhotoArticleIndex(index);
    } else {
      setSelectedPhotoArticleIndex(photoPriority.length - 1);
    }
  };

  const handleOnRightClick = () => {
    const index = selectedPhotoArticleIndex + 1;
    if (index < photoPriority.length) {
      setSelectedPhotoArticleIndex(index);
    } else {
      setSelectedPhotoArticleIndex(0);
    }
  };

  return (
    <>
      <div className="cn-thumbnailwrap">
        <div className="cn-thumbinner">
          <div className="sponsor-with-heading">
            <h3 className="ipl_headin_g">आईपीएल {IPL_YEAR} फोटो </h3>
          </div>
          <div className="cn-smallstory-wrapper cn-photoslider-wrap">
            <p className="play-icon">
              <img
                src="/images/icons/Photo-Icon.svg"
                alt="Photos"
              />
            </p>
            <div className="cn-photoSlider">
              <div data-glide-el="controls">
                <a
                  href="javascript:void(0)"
                  className="left-arrow"
                  data-glide-dir="<"
                  onClick={handleOnLeftClick}
                ></a>
                <a
                  href="javascript:void(0)"
                  className="right-arrow"
                  data-glide-dir=">"
                  onClick={handleOnRightClick}
                ></a>
              </div>
              <div className="glide__track" data-glide-el="track">
                <ul className="CN-slider-2 glide__slides">
                  {/* {photoPriority.map((photo) => ( */}
                  <li key={selectedPhotoArticle.id} className=" glide__slide">
                    <a href={selectedPhotoArticle.weburl_r}>
                      <div className="content-box">
                        <div className="counter">{selectedPhotoArticle?.gallery_count} photos</div>
                        <h3 className="heading">
                          {selectedPhotoArticle.display_headline}
                        </h3>
                      </div>
                      <LazyLoadImage
                        src={selectedPhotoArticle.images?.url}
                        alt={selectedPhotoArticle.display_headline}
                        width={422}
                        height={294}
                      />
                    </a>
                  </li>
                  {/* ))} */}
                </ul>
              </div>
            </div>
            <a href="/cricket/ipl/photos/" className="cn-morebtn1">
              और फोटो गैलरी
            </a>
          </div>
        </div>
        <div className="cn-thumbinner">
          <div className="sponsor-with-heading">
            <h3 className="ipl_headin_g"> ऑफ द फील्ड </h3>
          </div>
          <div className="cn-smallstory-wrapper">
            {offFieldPriority.map((data) => (
              <div key={data.id} className="cn-smallstory">
                <a href={data.weburl_r}>
                  <div className="imgbox">
                    <LazyLoadImage
                      src={data.images?.url}
                      alt={data?.display_headline}
                      width={100}
                      height={62}
                    />
                  </div>
                  <div className="text-box">
                    <h2 className="heading-1">{data.display_headline}</h2>
                  </div>
                </a>
              </div>
            ))}
            <a href="/cricket/ipl/news/" className="cn-morebtn1">
              और भी पढ़ें
            </a>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .cn-smallstory-wrapper .cn-smallstory a {
          display: flex;
          padding: 21px 0;
        }
        .cn-smallstory-wrapper .cn-smallstory .imgbox {
          margin-right: 15px;
          width: 110px;
        }
        .cn-smallstory-wrapper .cn-smallstory .imgbox img {
          display: block;
          width: 100%;
        }
        .cn-smallstory-wrapper .cn-smallstory .text-box .heading-1 {
          font-size: 14px;
          line-height: 20px;
          color: #292929;
        }
        .cn-smallstory-wrapper .cn-smallstory a .text-box {
          width: calc(100% - 120px);
        }
        .cn-smallstory-wrapper .cn-smallstory:first-child a {
          padding-top: 0;
        }
        .cn-smallstory-wrapper .cn-smallstory {
          border-bottom: 1px solid #dadada;
        }
        .cn-smallstory .imgbox figure {
          overflow: hidden;
        }
        .cn-morebtn1 {
          background: #f5f5f5;
          display: block;
          text-align: center;
          font-size: 12px;
          line-height: 12px;
          text-transform: uppercase;
          color: #ff0000;
          padding: 11px 0;
        }
        .cn-photoslider-wrap {
          position: relative;
        }
        .cn-photoSlider .left-arrow,
        .cn-photoSlider .right-arrow {
          background: rgba(0, 0, 0, 0.7);
          width: 39px;
          height: 62px;
          position: absolute;
          top: 50%;
          left: 0px;
          z-index: 3;
          transform: translate(0, -50%);
        }
        .cn-photoSlider .left-arrow::before {
          content: "";
          border-top: 1px solid #ffffff;
          border-left: 1px solid #ffffff;
          width: 20px;
          height: 20px;
          transform: rotate(-45deg);
          position: absolute;
          left: 15px;
          top: 20px;
        }
        .cn-photoSlider .right-arrow::before {
          content: "";
          border-bottom: 1px solid #ffffff;
          border-right: 1px solid #ffffff;
          width: 20px;
          height: 20px;
          transform: rotate(-45deg);
          position: absolute;
          right: 15px;
          top: 20px;
        }
        .cn-photoSlider a {
          display: block;
          position: relative;
        }
        .cn-photoSlider .right-arrow {
          left: initial;
          right: 0px;
        }
        .cn-photoSlider {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        .cn-photoSlider .glide__track {
          overflow: hidden;
        }
        .cn-photoSlider .glide__slides {
          color: #fff;
          position: relative;
          width: 100%;
          list-style: none;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          touch-action: pan-Y;
          overflow: hidden;
          padding: 0;
          white-space: nowrap;
          display: flex;
          flex-wrap: nowrap;
          will-change: transform;
        }
        .cn-photoSlider a {
          display: block;
          position: relative;
        }
        .cn-photoSlider a .content-box {
          position: absolute;
          bottom: 0;
          padding: 0 20px;
          background: -webkit-linear-gradient(
            top,
            transparent 10%,
            #000000bd 60%
          );
          padding-top: 80px;
          padding-bottom: 15px;
          z-index: 1;
        }
        .cn-photoSlider a .content-box .counter {
          display: inline-block;
          font-style: normal;
          padding: 5px 7px;
          font-size: 14px;
          line-height: 14px;
          background: #e1261c;
          color: #fff;
          margin-bottom: 5px;
        }
        body .cn-photoSlider a .content-box .heading {
          height: 47px;
          overflow: hidden;
          box-sizing: border-box;
          padding: 5px 0px;
        }
        .cn-photoSlider a .content-box .heading {
          font-size: 18px;
          color: #fff;
          line-height: 22px;
        }
        .cn-photoSlider a img {
          width: 100%;
        }
        .cn-photoSlider a {
          display: block;
          position: relative;
        }
        .cn-photoSlider .glide__slide {
          width: 100%;
          height: 100%;
          background: #2d2d2d;
          flex-shrink: 0;
          white-space: initial;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
        }
        .cn-photoslider-wrap .play-icon {
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 1;
        }
        .cn-thumbnailwrap {
          margin-bottom: 25px;
          display: flex;
          justify-content: space-between;
        }
        .cn-thumbnailwrap .cn-thumbinner {
          width: 48%;
        }
        .sponsor-with-heading {
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default PhotoSliderSection;
