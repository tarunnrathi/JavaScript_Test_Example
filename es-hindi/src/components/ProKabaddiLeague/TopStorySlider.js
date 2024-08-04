import React from "react";
import Slider from "react-slick/lib";
import { imageLoader } from "includes/article.util";
import LazyLoadImage from "components/Common/CustomImage";

const TopStorySlider = ({ top_headlines }) => {
  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (<>
    <div className="top-story-div">
      <div className="main-title-div">
        <h2 className="main-title-txt">
          <a href={top_headlines[0]?.weburl_r} title={top_headlines[0]?.display_headline}>
            {top_headlines[0]?.display_headline}
          </a>
        </h2>
      </div>
      <Slider className="top-story-slider" {...settings}>
        {top_headlines?.slice(1, top_headlines.length).map((item, index) =>
          <li key={index}>
            <a
              href={item.url}
              title={item.title}
              tabIndex={0}
            >
              <LazyLoadImage
                width={182}
                height={121}
                src={imageLoader(item?.images?.url)}
                alt={item?.display_headline}
                title={item?.display_headline}
              />
            </a>
            
            <h4 className="top-title-txt">
              <a
                href={item?.weburl_r}
                title={item.display_headline}
                tabIndex={0}
              >
                {item?.display_headline}
              </a>
            </h4>
          </li>
        )}
      </Slider>
    </div>
    <style jsx global>
      {`
      .top-story-div {
        position: relative;
        margin-top: -255px;
      }
    
      .main-title-div {
        position: relative;
        padding: 0px 20px 0 40px;
      }
    
      .main-title-txt,
      .main-title-txt a {
        font-size: 28px;
        font-weight: 600;
        color: #fff;
        margin: 10px 0;
        line-height: 36px;
      }
    
      .main-title-txt,
      .main-title-txt a {
        font-size: 28px;
        font-weight: 600;
        color: #fff;
        margin: 10px 0;
        line-height: 36px;
      }
    
      .top-story-slider {
        background: #fff;
        padding: 0 0 10px 40px;
        overflow-x: hidden;
        margin-left: 40px;
      }
    
      .slick-slider {
        position: relative;
        display: block;
        box-sizing: border-box;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        -ms-touch-action: pan-y;
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
      }
    
      .top-story-slider:before {
        content: "";
        position: absolute;
        height: 2px;
        background: #ccc;
        width: 22px;
        left: 13px;
        top: 115px;
      }
    
      .top-story-slider .slick-disabled.slick-prev {
        background-position: 10px 0px;
        opacity: .4;
      }
    
      .top-story-slider .slick-prev {
        transform: rotate(180deg);
        top: 80px;
        background-position: 10px 0px;
      }
    
      .top-story-slider .slick-arrow {
        text-indent: -99999px;
        border: none;
        position: absolute;
        left: 15px;
        background: url(https://images.news18.com/ibnlive/uploads/2019/07/sprite.png) 12px center no-repeat #fff;
        width: 24px;
        outline: 0;
        cursor: pointer;
        height: 20px;
      }
    
      // .top-story-slider .slick-list {
      //   height: 220px;
      // }
    
      .slick-slider .slick-list,
      .slick-slider .slick-track {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
    
      .slick-list {
        position: relative;
        display: block;
        overflow: hidden;
        margin: 0;
        padding: 0;
      }
    
      .slick-track {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding: 10px 0;
      }
    
      .slick-track:after,
      .slick-track:before {
        display: table;
        content: "";
      }
    
      .slick-initialized .slick-slide {
        display: block;
      }
    
      .top-story-slider li {
        margin: 0 10px 0 0;
        padding: 5px 8px 0 8px;
        cursor: pointer;
      }
    
      .slick-slide {
        display: none;
        float: left;
        height: 100%;
        min-height: 1px;
      }
    
      .top-story-slider li img {
        width: 100%;
      }
    
      .slick-slide img {
        display: block;
      }
    
      .top-title-txt,
      .top-title-txt a {
        font-size: 16px;
        color: #333;
        line-height: 22px;
        margin: 5px 0;
        font-weight: bold;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;
      }
    
    
      .top-story-slider .slick-next {
        top: 130px;
        left: 10px;
        background-position: 10px 0px;
      }
    
      .top-story-slider .slick-prev {
        background-position: 10px 0px
      }
      .top-story-slider li:hover {
        box-shadow: 0px 0px 8px #ccc;
    }
      `}
    </style>
  </>
  )
}

export default TopStorySlider;