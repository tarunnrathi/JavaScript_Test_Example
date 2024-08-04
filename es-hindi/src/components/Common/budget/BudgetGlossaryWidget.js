import React from "react";
import Slider from "react-slick";
// import LazyLoad from "react-lazyload";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import BudgetSponsorSlider from "./BudgetSponsorSlider";
import BudgetAMPSlider from "./BudgetAMPSlider";
import LazyLoadImage from "../CustomImage";

const BudgetGlossaryWidget = ({
  isMobile = false,
  isAmp = false,
  glossary = [],
  sponsor = {},
}) => {
  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
  };

  return (
    <>
      {isMobile ? (
        <div className="clearfix add">
          <div className="addinner-box">
            <SiteAd
              width={300}
              height={250}
              slotId={"budget_news_third"}
              adUnit={
                "NW18_HIND_PWA/NW18_HIND_BUDGET_PWA/NW18_HIND_BUDGET_HOME_PWA/NW18_HIND_BDGT_PWA_HP_ATF_300"
              }
              sizes={[[300, 250]]}
              lazyload={true}
            ></SiteAd>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="glossary_section">
        <i className="glossary_section_logo">
          {isAmp ? (
            <figure style={{ width: "70px" }}>
              <amp-img
                width={70}
                height={73}
                src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_glossary_icon_1609753501.png"
                alt={"NEWS_HINDI"}
                title={"NEWS_HINDI"}
                layout="responsive"
              ></amp-img>
            </figure>
          ) : (
            <LazyLoadImage
              src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_glossary_icon_1609753501.png"
              style={{ width: "70px" }}
              width={70}
              height={73}
              alt="NEWS_HINDI"
              title="NEWS_HINDI"
              isLazyLoad={false}
            />
          )}
          <div className="glossaryrhsTxt">
            <p>
              <span>बजट</span> ग्लॉसरी
            </p>
          </div>
          {isAmp ? (
            <BudgetAMPSlider sponsor={sponsor} />
          ) : (
            <BudgetSponsorSlider
              sliderId="glossaryWidget"
              sponsor={sponsor}
              isMobile={isMobile}
            />
          )}
        </i>
        <div className="glossary_section_slider">
          {isAmp ? (
            <BudgetAMPSlider glossary={glossary} />
          ) : (
            <Slider {...sliderSettings}>
              {glossary &&
                glossary.length !== 0 &&
                glossary.map((item, index) => {
                  return (
                    <div className="glossary_section_row" key={index}>
                      <span>{item.headline}</span>
                      <p>{item.description}</p>
                    </div>
                  );
                })}
            </Slider>
          )}
        </div>
        {
          <a href="/budget/glossary/" className="glossary_more">
            + आगे पढ़ें
          </a>
        }
      </div>

      <style jsx global>{`
      .glossary_section {
        width: 300px;
        height: 445px;
        background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_glossary_bg_1609596619.jpg);
        margin: 20px 0;
        background-size: cover;
        background-position: center;
        text-align: center;
        position: relative;
      }
      .glossary_section_slider {
        width: 100%;
        overflow: hidden;
      }
      .glossary_section_slider .slick-track {
        display: flex;
        overflow: hidden;
      }
      .glossary_section_slider .slick-list {
        overflow: hidden;
      }
      .glossary_section_row {
        color: #fff;
        font-size: 13px;
        line-height: 24px;
        padding: 0 15px;
      }
      .glossary_section_row p {
        max-height: 170px;
        overflow: hidden;
        line-height: 24px;
      }

      .glossary_section_row span {
        color: #ffdd00;
        text-transform: uppercase;
        border-bottom: 1px #ffdd00 solid;
        margin-bottom: 13px;
        display: inline-block;
        font-weight: bold;
        height: 24px;
        overflow: hidden;
        line-height: 22px;
      }
      i.glossary_section_logo {
        border-bottom: 1px dashed rgb(255 255 255 / 49%);
        width: 93%;
        display: flex;
        margin: auto;
        margin-bottom: 10px;
        align-items: center;
        justify-content: ${
          Object.keys(sponsor) && Object.keys(sponsor).length !== 0
            ? "unset"
            : "space-between"
        };
        padding-bottom: 10px;
      }

      i.glossary_section_logo p {
        color: #ffffff;
        text-transform: uppercase;
        font-size: 36px;
        line-height: 36px;
        text-align: right;
        font-style: normal;
        font-size: 20px;
        line-height: 21px;
        letter-spacing: 2px;
      }
      i.glossary_section_logo p span {
        color: #ffffff;
        text-transform: uppercase;
        font-size: 18px;
        line-height: 18px;
        display: inline-block;
        margin-bottom: 12px;
        position: relative;
      }
      i.glossary_section_logo img {
        max-width: 100%;
        padding: 10px 0 0;
      }
      .glossary_section_slider ul.slick-dots {
        width: 93%;
        text-align: center;
        display: block;
        border-top: 1px dashed rgb(255 255 255/49%);
        padding-top: 5px;
        margin: auto;
        position: unset;
      }
      .glossary_section_slider ul.slick-dots li {
        padding: 0 10px;
        display: inline-block;
        width: 5px;
        height: 5px;
      }
      .glossary_section_slider ul.slick-dots li button {
        width: 5px;
        height: 5px;
        border: 0;
        font-size: 0;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        border-radius: 100px;
        padding: 0;
        margin: 0;
        background-color: #fff;
      }
      .glossary_section_slider ul.slick-dots li.slick-active button {
        width: 8px;
        height: 8px;
        background: #e1261c;
      }
      a.glossary_more {
        width: 98px;
        height: 24px;
        background: #e1261c 0% 0% no-repeat padding-box;
        border-radius: 12px;
        display: inline-block;
        color: #ffffff;
        text-transform: uppercase;
        font-size: 12px;
        line-height: 24px;
        text-decoration: none;
        position: ${isAmp ? "absolute" : "relative"} ;
        top: ${isAmp ? "75%" : ""} ;
        ${isAmp && "left:50%;transform:translateX(-50%)"}       
      }
      .glossary_section_slider a.slick-arrow,
      .glossary_section_slider button.slick-arrow {
        position: absolute;
        bottom: 60px;
        background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/slider_arrow_1609598899.svg) ${
          !isAmp ? "!important" : ""
        };
        width: 11px;
        height: 8px;
        font-size: 0;
        background: none;
        background-repeat: no-repeat;
        padding: 0;
        border: none;
        margin: 0;
        top: auto;
      }
      .glossary_section_slider a.slick-arrow:before,
      .glossary_section_slider button.slick-arrow:before {
        display: none;
      }
      .glossary_section_slider a.slick-next.slick-arrow,
      .glossary_section_slider button.slick-next.slick-arrow {
        right: 15px;
        top: auto;
      }
      .glossary_section_slider a.slick-prev.slick-arrow,
      .glossary_section_slider button.slick-prev.slick-arrow {
        left: 14px;
        transform: rotate(180deg);
      }

      a.glossary_more:hover {
        color: #fff;
      }

      ${
        !isMobile &&
        !isAmp &&
        `.glossaryrhsTxt {
        margin-left:15px;
      }`
      }
      
      .budgetPartnerWrapRhs {
        width: 100%;
        padding: 3px;
        display: flex;
        align-items: center;
        margin-bottom: 2px;
        justify-content: flex-end;
      }

      .budgetPartnerWrapRhs .heading {
        color: #fff;
        font-family: Lato, sans-serif;
        font-size: 11px;
        text-transform: uppercase;
        font-weight: normal;
        line-height: 15px;
        margin-right: 5px;
        text-align: right;
        font-style: normal;
      }
      .budgetPartnerWrapRhs a {
        display: block;
      }
      .budgetPartnerWrapRhs a img {
        width: 100%;
        display: block;
        padding: 0;
      }

      .slick-slide {
        float: none;
        padding: 0;
        background: none;
      }
      .slick-slide:hover {
        background: none;
      }

      .glossary_section_slider .slick-slider {
        position: unset;
      }

      @media screen and (max-width: 800px) {
        .glossary_section {
          width: 100%;
          height: 430px;
          background-size: 100% 100%;
        }
        .glossary_section_row {
          color: #fff;
          font-size: 12px;
          line-height: 20px;
          padding: 0 15px;
          padding-bottom: 20px;
        }

        .glossary_section_row span {
          margin-bottom: 10px;
          font-size: 14px;
        }

        .glossary_section_slider ul.slick-dots {
          padding-top: 25px;
        }

        .glossary_section_slider a.slick-arrow,
        .glossary_section_slider button.slick-arrow {
          display: none;
        }

        .glossary_section_row p {
          min-height: 130px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
          color: #fff;
          font-size: 12px;
          line-height: 20px;
        }

        .glossaryrhsTxt {
          margin-left:'4px';
        }

        ${
          (isMobile || isAmp) &&
          Object.keys(sponsor) &&
          Object.keys(sponsor).length !== 0 &&
          `i.glossary_section_logo {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          justify-content: space-between;
          ${isAmp ? "padding:10px 0" : ""}
        }`
        }

        i.glossary_section_logo p span {
          font-size: 16px;
          font-weight: normal;
          line-height: 16px;
          margin-bottom: 10px;
        }

        i.glossary_section_logo p {
          font-size: 20px;
          line-height: 21px;
          letter-spacing: 2px;
          text-align: center; 
        }

        i.glossary_section_logo img {
          height: 108px;
          max-width: 100%;
          padding: 10px 0 0;
          height: auto;
          display: block;
        }

        a.glossary_more {
          margin-top: 5px;
        }
        ${isMobile && `.report_slide{margin:10px 0;}`} 
      `}</style>
    </>
  );
};

export default BudgetGlossaryWidget;
