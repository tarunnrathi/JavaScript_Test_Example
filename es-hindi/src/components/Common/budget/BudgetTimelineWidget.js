import React, { useRef, useState } from "react";
import Slider from "react-slick";
// import { setDefaultImage } from "includes/article.util";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import BudgetSponsorSlider from "./BudgetSponsorSlider";
import LazyLoadImage from "../CustomImage";

const BudgetTimelineWidget = ({
  isMobile = false,
  timeline = [],
  pageAds = {},
  sponsor = {},
}) => {
  const [currentTimeline, setCurrentTimeline] = useState("2023-2019");
  const sliderRef = useRef();

  const handleTimelineYearsChange = (nextSlide) => {
    let slideYear;
    switch (nextSlide) {
      case 0:
        slideYear = "2023-2019";
        break;
      case 5:
        slideYear = "2018-2014";
        break;
      case 10:
        slideYear = "2013-2009";
        break;
      case 15:
        slideYear = "2008-2004";
        break;
      case 20:
        slideYear = "2003-1999";
        break;
      case 25:
      case 30:
        slideYear = "1998-1991";
        break;
      default:
        slideYear = "2022-2019";
        break;
    }
    setCurrentTimeline(slideYear);
  };

  const sliderSettings = {
    slidesToShow: timeline.length < 5 ? timeline.length : 5,
    slidesToScroll: timeline.length < 5 ? timeline.length : 5,
    speed: 1000,
    infinite: true,
    arrows: true,
    beforeChange: (_, nextSlide) => handleTimelineYearsChange(nextSlide),
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          centerMode: true,
          variableWidth: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="budget_timeline">
        <div className="budget_container relativeBox">
          <p className="budget_timeline_title">बजट टाइमलाइन</p>
          <BudgetSponsorSlider
            sliderId="timelineSlider"
            isMobile={isMobile}
            sponsor={sponsor}
          />
          <div className="budget_timeline_data" id="budget_timeline_data">
            <Slider {...sliderSettings} ref={sliderRef}>
              {timeline &&
                timeline.length !== 0 &&
                timeline.map((item) => {
                  return (
                    <a href="/budget/timeline/" key={item.years}>
                      <i className="budget_timeline_img">
                        <LazyLoadImage
                          src={item?.image_url}
                          alt={item.name}
                          title={item.name}
                          height={152}
                          width={152}
                        />
                      </i>
                      <div className="budget_timeline_intro">
                        <i>{item.years}</i>
                        <span>{item.name}</span>
                        <p>{item.description}</p>
                      </div>
                    </a>
                  );
                })}
            </Slider>
          </div>

          <div className="budget_timeline_button">
            <div
              className="budget_button_left"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <img src="https://images.news18.com/ibnlive/uploads/2019/06/budget_left1_arrow.png" />
            </div>
            <div className="budget_button_middle">
              <ul>
                <li>{currentTimeline}</li>
              </ul>
            </div>
            <div
              className="budget_button_right"
              onClick={() => sliderRef.current.slickNext()}
            >
              <img src="https://images.news18.com/ibnlive/uploads/2019/06/budget_left1_arrow.png" />
            </div>
          </div>
        </div>
      </div>
      <div className={"middlead"}>
        {!isMobile ? (
          <SiteAd
            width={728}
            height={90}
            slotId={"budget_news_mtf"}
            adUnit={pageAds.MTF_728_0}
            sizes={[[728, 90]]}
            lazyload={true}
          ></SiteAd>
        ) : (
          ""
        )}
      </div>
      <style jsx global>{`
        ${!isMobile
          ? `
          .budget_timeline_data {
            overflow: hidden;
            width: 100%;
            text-align: center;
            position: relative;
            z-index: 2;
          }
          .budget_timeline_data .slick-track {
            display: flex;
            justify-content: space-between;
            gap:20px;
          }
          .budget_timeline_data .slick-list {
            overflow: hidden;
            width: 100%;
          }
          .budget_timeline_title {
            margin-bottom: 35px;
            text-align: center;
            color: #ffffff;
            text-shadow: 0px 3px 6px #00000029;
            text-transform: uppercase;
            font-size: 46px;
            position: relative;
            padding-bottom: 15px;
            line-height: 40px;
          }
          .budget_timeline {
            width: 100%;
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_timeline_bg_1609600720.jpg)
              #242d3c;
            padding: 30px 0;
            position: relative;
            margin-top: 40px;
            background-repeat: no-repeat;
            background-size: auto;
            margin-bottom: 30px;
          }
          i.budget_timeline_img img {
            border-radius: 100%;
            border: 4px #fff solid;
            width: 160px;
            height: 160px;
            display: inline-block;
            background: #185c5c;
          }

          p.budget_timeline_title:after {
            content: "";
            width: 40px;
            height: 6px;
            background: #ff5b13 0% 0% no-repeat padding-box;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
          }
          .budget_timeline_intro {
            color: #e8e8e8;
          }
          .budget_timeline_intro i {
            display: block;
            color: #eea630;
            font-style: normal;
            padding-top: 30px;
          }
          .budget_timeline_intro span {
            font-size: 22px;
            padding: 13px 0;
            display: block;
          }
          .budget_timeline_intro p {
            color: #b7b7b7;
            font-size: 14px;
            line-height: 22px;
            overflow: hidden;
            height: 85px;
          }
          .budget_timeline .budget_container {
            background: transparent;
          }
          // i.budget_timeline_img {
          //   position: relative;
          //   line-height: 0;
          //   display: block;
          //   height: 152px;
          //   width: 152px
          // }
          i.budget_timeline_img:before {
            content: "";
            position: absolute;
            background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/img_shadow_1609602381.png);
            left: 0;
            right: 0;
            margin: auto;
            width: 102px;
            height: 9px;
            bottom: -7px;
          }
          i.budget_timeline_img:after {
            width: 10px;
            height: 10px;
            background: #ffffff 0% 0% no-repeat padding-box;
            content: "";
            position: absolute;
            border-radius: 100px;
            bottom: -25px;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 2;
          }
          .budget_timeline:after {
            content: "";
            position: absolute;
            border-top: 1px dashed #ccc;
            width: 100%;
            top: 300px;
            left: 0;
            z-index: 1;
          }
          .budget_timeline_button {
            width: 167px;
            height: 40px;
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 1px solid #b9b9b9;
            border-radius: 6px;
            margin: 25px auto 0;
            overflow: hidden;
          }
          .budget_button_left {
            border-right: 1px solid #b9b9b9;
            width: 28px;
            float: left;
            text-align: center;
            padding: 7px 0px;
            cursor: pointer;
            z-index: 2;
            position: relative;
          }
          .budget_button_right {
            border-left: 1px solid #b9b9b9;
            width: 28px;
            float: left;
            text-align: center;
            padding: 7px 0px;
            cursor: pointer;
          }
          .budget_button_right img{transform: rotate(180deg);}
          .budget_button_middle {
            width: 107px;
            float: left;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            color: #e33a0f;
            padding: 6px 0px;
            position: relative;
            overflow: hidden;
          }
          .sponsrd {
            position: absolute;
            top: 0;
            right: 0;
          }
          `
          : `
          .budget_timeline_data .slick-arrow {
            position: absolute;
            bottom: 0;
            border: none;
            margin: auto;
            left: 0;
            right: 0;
            width: 23px;
            height: 36px;
            font-size: 0;
            outline: none;
            cursor: pointer;
            margin-bottom: 20px;
            background: #000000;
          }
          
          .budget_timeline_data .slick-arrow.slick-next.slick-arrow {
            left: 36px;
            background: #ff5b13;
            border-radius: 0px 4px 4px 0px;
            border-left: 1px rgb(255 255 255 / 12%) solid;
          }
          
          .budget_timeline_data .slick-arrow.slick-prev.slick-arrow {
            right: 10px;
            border-radius: 4px 0px 0px 4px;
          }
          
          .budget_timeline_data .slick-arrow.slick-next.slick-arrow:after {
            border-right: 2px solid #fff;
            border-top: 2px solid #fff;
            width: 4px;
            height: 4px;
            transform: rotate(45deg);
            top: 17px;
            right: 5px;
            content: "";
            position: absolute;
            display: block;
          }
          
          .budget_timeline_data .slick-arrow.slick-next.slick-arrow:before {
            content: "";
            position: absolute;
            display: block;
            width: 10px;
            height: 2px;
            background: #fff;
            right: 7px;
            top: 19px;
          }
          
          .budget_timeline_data .slick-arrow.slick-prev.slick-arrow:after {
            border-right: 2px solid #fff;
            border-top: 2px solid #fff;
            width: 4px;
            height: 4px;
            transform: rotate(226deg);
            top: 17px;
            left: 6px;
            content: "";
            position: absolute;
            display: block;
          }
          
          .budget_timeline_data .slick-arrow.slick-prev.slick-arrow:before {
            content: "";
            position: absolute;
            display: block;
            width: 10px;
            height: 2px;
            background: #fff;
            right: 5px;
            top: 19px;
          }
          
          .budget_timeline_data {
            overflow: hidden;
            width: 100%;
            text-align: center;
            position: relative;
            z-index: 9;
            padding-bottom: 80px;
          }
          
          .budget_timeline_data .slick-track {
            display: flex;
            justify-content: space-between;
          }
          
          .budget_timeline_data .slick-list {
            overflow: hidden;
            width: 100%;
          }
          
          .budget_timeline_title {
            margin-bottom: 30px;
            text-align: center;
            color: #ffffff;
            padding-top: 10px;
            text-shadow: 0px 3px 6px #00000029;
            text-transform: uppercase;
            font-size: 28px;
            position: relative;
            padding-bottom: 8px;
            line-height: 32px;
            font-weight: bold;
            padding-left: 0;
            width: 100%;
          }
          
          .budget_timeline {
            width: 100%;
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/mobile_bg_1609693213.png) #242d3c;
            padding: 20px 0 0;
            position: relative;
            background-repeat: no-repeat;
            background-size: contain;
            border-top: 4px #242d3c solid;
            margin-top: 10px;
          }
          
          i.budget_timeline_img img {
            border-radius: 100%;
            border: 4px #fff solid;
            width: 130px;
            height: 130px;
            background: #185c5c;
          }
          
          .budget_timeline_intro {
            color: #e8e8e8;
          }
          
          .budget_timeline_intro i {
            display: block;
            color: #eea630;
            font-style: normal;
            padding-top: 30px;
          }
          
          .budget_timeline_intro span {
            font-size: 18px;
            padding: 7px 0;
            display: block;
          }
          
          .budget_timeline_intro p {
            color: #b7b7b7;
            font-size: 13px;
            line-height: 22px;
            height: 85px;
            padding: 0 10px;
            overflow: hidden;
          }
          
          .budget_timeline .budget_container {
            background: transparent;
          }
          
          i.budget_timeline_img {
            position: relative;
            overflow: hidden;
            line-height: 0;
          }
          
          i.budget_timeline_img:before {
            content: "";
            position: absolute;
            background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/img_shadow_1609602381.png);
            left: 0;
            right: 0;
            margin: auto;
            width: 102px;
            height: 9px;
            bottom: -7px;
          }
          
          i.budget_timeline_img:after {
            width: 10px;
            height: 10px;
            background: #cccccc 0% 0% no-repeat padding-box;
            content: "";
            position: absolute;
            border-radius: 100px;
            bottom: -25px;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 2;
          }
          
          .budget_timeline:after {
            content: "";
            position: absolute;
            border-top: 1px dashed #ccc;
            width: 100%;
            bottom: 255px;
            left: 0;
            z-index: 1;
            margin-top: 10px;
          }
          
          .budget_timeline_button {
            width: 167px;
            height: 40px;
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 1px solid #b9b9b9;
            border-radius: 6px;
            margin: 25px auto;
            overflow: hidden;
            display: none;
          }
          
          .budget_timeline_data .slick-list {
            padding: 0 35% 0 0;
          }
          
          .budget_timeline_title {
            text-align: left !important;
            padding-left: 20px;
            width: 150px;
          }
          
          p.budget_timeline_title:after {
            content: "";
            width: 25px;
            height: 5px;
            background: #FF5B13 0% 0% no-repeat padding-box;
            position: absolute;
            display: inline-block;
            right: -14px;
            bottom: 11px;
          }
          .budget_timeline_data .slick-list {
            padding: 0px 35% 0 20px !important;
          }
           `}
      `}</style>
    </>
  );
};

export default BudgetTimelineWidget;
