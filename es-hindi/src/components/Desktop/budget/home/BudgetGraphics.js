import LazyLoadImage from "components/Common/CustomImage";
import React from "react";

const BudgetGraphics = ({ graphics, budgetYear }) => {
  return (
    <>
      <div className="budget_graphic">
        <div className="budget_graphic_title">
          <div className="budgetGraphicTWrap">
            <p className="budget_title">बजट ग्राफिक्स</p>
            <h3 className="budget_subtitle">Budget {budgetYear}</h3>
          </div>
        </div>
        <div className="budget_graphic_box">
          {graphics &&
            graphics.length !== 0 &&
            graphics.map((news, i) => {
              const newsArticleTitle = news?.display_headline;
              return (
                <div className="budget_graphic_row" key={"graphic" + i}>
                  <a href={news?.weburl_r} target="_blank">
                    <LazyLoadImage
                      src={news?.images?.url || ""}
                      alt={newsArticleTitle}
                      title={newsArticleTitle}
                      width={250}
                      height={170}
                    />
                    <h3 className="graphics_tilte">{newsArticleTitle}</h3>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
      <style jsx global>{`
        .budget_graphic_row img {
          width: 100%;
          display: block;
          background: #ffffff 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          border-radius: 5px;
          padding: 5px;
        }
        .budget_graphic_box {
          display: flex;
          justify-content: space-between;
          clear: both;
          width: 100%;
        }
        .budget_graphic_row {
          width: 100%;
          padding: 0 20px;
          border-right: 1px dashed #707070;
          max-width: 280px;
        }
        .graphics_tilte {
          color: #001d42;
          font-size: 14px;
          line-height: 24px;
          padding: 10px 0;
        }
        .budget_graphic_row:first-child {
          padding-left: 0;
        }
        .budget_graphic_row:last-child {
          padding-right: 0;
          border: 0;
        }
        .budget_graphic {
          width: 100%;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_graphics_bg_1609695632.png)
            #f6f6f6;
          background-size: auto;
          float: left;
          padding: 20px;
          padding-top: 10px;
          border: 1px rgb(0 0 0 / 17%) solid;
          border-radius: 10px;
          background-repeat: no-repeat;
        }
        .budget_graphic_title {
          width: 480px;
          float: right;
          text-align: center;
          padding-bottom: 25px;
        }
        .budget_title {
          color: #001d42;
          font-size: 46px;
          font-weight: bold;
          line-height: 40px;
          margin: 24px 0 5px 0;
        }
        .tav_calculate iframe {
          width: 100%;
          height: 480px;
        }
        .budget_subtitle {
          color: #e1261c;
          text-transform: uppercase;
          font-size: 14px;
          padding: 3px 0 10px;
          border-bottom: 5px #d2d2d2 solid;
        }
        .budget_graphic_title span {
          color: #464646;
          font-size: 14px;
          padding-top: 10px;
          display: block;
        }

        .budget_graphic_title {
          text-align: left;
          display: flex;
          justify-content: flex-end;
        }
        .budgetGraphicTWrap {
          margin-right: 10px;
        }
        .budgetPartnerWrap2 {
          width: 111px;
          background: #00000059;
          padding: 3px;
          align-items: center;
        }
        .budgetPartnerWrap2 .heading {
          color: #fff;
          font-family: Lato, sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: normal;
          text-decoration: underline;
          line-height: 15px;
          margin: 5px 0;
          text-align: center;
        }
        .budgetPartnerWrap2 a {
          display: block;
        }
        .budgetPartnerWrap2 a img {
          width: 100%;
          display: block;
        }
      `}</style>
    </>
  );
};

export default BudgetGraphics;
