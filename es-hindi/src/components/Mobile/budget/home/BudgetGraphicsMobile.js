import LazyLoadImage from "components/Common/CustomImage";
import React from "react";
import Slider from "react-slick";

const BudgetGraphicsMobile = ({ graphics, budgetYear, isAmp }) => {
  const sliderSettings = {
    slidesToShow: graphics && graphics.length <= 1 ? 1 : 1.1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    centerMode: true,
  };
  return (
    <>
      <div className="budget_graphic">
        <div className="budget_graphic_title">
          <p className="budget_title">बजट ग्राफिक्स</p>
          <h3 className="budget_subtitle">Budget {budgetYear}</h3>
        </div>
        <div className="budget_graphic_box">
          <Slider {...sliderSettings}>
            {graphics &&
              graphics.length !== 0 &&
              graphics.slice(0, 3).map((news, index) => {
                const newsArticleTitle = news?.display_headline;
                return (
                  <div className="budget_graphic_row" key={index}>
                    <a href={news?.weburl_r} target="_blank">
                      <LazyLoadImage
                        src={news?.images?.url || ""}
                        alt={newsArticleTitle}
                        title={newsArticleTitle}
                        height={92}
                        width={183}
                      />
                      <h3 className="graphics_tilte">{newsArticleTitle}</h3>
                    </a>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
      <style jsx global>{`
        .budget_graphic_row img {
          width: 100%;
          display: block;
          background: #fff 0 0 no-repeat padding-box;
          border: 1px solid #707070;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          padding: 5px;
        }

        .budget_graphic_row {
          width: 100%;
          padding: 0 10px;
          max-width: 210px;
        }

        .graphics_title {
          color: #001d42;
          font-size: 13px;
          line-height: 20px;
          padding: 5px 0;
          font-weight: bold;
        }

        .budget_graphic_row:first-child {
          padding-left: 0;
        }

        .budget_graphic_row:last-child {
          padding-right: 0;
          border: 0;
        }

        .budget_graphic {
          width: calc(100% - 20px);
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_graphics_bg_1609695632.png)
            #f6f6f6;
          background-size: 54%;
          padding: 10px;
          padding-top: 10px;
          border: 1px rgb(0 0 0 / 17%) solid;
          border-radius: 10px;
          overflow: hidden;
          margin: 10px auto;
          background-repeat: no-repeat;
        }

        .budget_graphic_title {
          width: 75%;
          float: right;
          text-align: center;
          padding-bottom: 10px;
          padding-top: 10px;
        }

        .budget_title {
          color: #001d42;
          font-size: 24px;
          font-weight: bold;
          line-height: 34px;
        }

        .budget_subtitle {
          color: #e1261c;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: bold;
        }

        .budget_graphic_title span {
          color: #464646;
          font-size: 14px;
          padding-top: 3px;
          display: block;
          text-align: left;
          border-top: 4px #d2d2d2 solid;
          margin-top: 10px;
        }

        .budget_graphic_row a {
          text-decoration: none;
        }

        .budget_graphic_box {
          // display: flex;
          // justify-content: space-between;
          clear: both;
          width: 100%;
          position: relative;
          padding-bottom: 40px;
        }

        .budget_graphic_box ul.slick-dots {
          width: 100%;
          position: absolute;
          bottom: -20px;
          text-align: center;
          border-bottom: 4px #d2d2d2 solid;
          padding-bottom: 12px;
          margin-bottom: 30px;
          display: block ${(!isAmp && "!important") || ""};
        }

        .budget_graphic_box ul.slick-dots li {
          display: inline-block;
          padding: 0 11px;
        }

        .budget_graphic_box ul.slick-dots li button {
          border: 0;
          width: 5px;
          height: 5px;
          background: #939393;
          font-size: 0;
          border-radius: 100px;
        }

        .budget_graphic_box ul.slick-dots li.slick-active button {
          width: 8px;
          height: 8px;
          background: #e1261c;
        }

        .budget_graphic_box .slick-list {
          width: 100%;
        }

        .budget_graphic_box .slick-track {
          display: flex;
          overflow: hidden;
        }

        .budget_graphic_box .slick-slide {
          margin: 0 10px;
        }

        .budget_graphic_box .slick-list {
          padding: 0 10px 0 5px ${isAmp ? "" :"!important"};
        }
      `}</style>
    </>
  );
};

export default BudgetGraphicsMobile;
