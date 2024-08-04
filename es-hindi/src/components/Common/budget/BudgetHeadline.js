import React from "react";
import BudgetSponsorSlider from "./BudgetSponsorSlider";

const BudgetHeadline = ({ heading, sponsor = {}, isMobile = false }) => {
  return (
    <>
      <div className="glossary_content relativeBox">
        <h1 className="glossary_title">{heading.label}</h1>
        <p>{heading.description}</p>
        <BudgetSponsorSlider sponsor={sponsor} sliderId="commonHeadlineSlide" isMobile={isMobile} />
      </div>
      <style>{`
      .glossary_content p {
        color: #464646;
        font-size: 15px;
        line-height: 22px;
        padding-bottom: 20px;
      }

      .relativeBox {
        position: relative;
      }

      .glossary_title {
        color: #e1261c;
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        font-style: italic;
        border-bottom: 1px #c4c4c4 solid;
        padding-bottom: 18px;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }

      @media screen and (max-width: 700px) {
        .glossary_content p {
          padding: 0 10px;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .glossary_title {
          color: #e1261c;
          text-align: left;
          font-size: 22px;
          font-weight: bold;
          margin-top: 10px;
          border-bottom: 1px #c4c4c4 solid;
          padding-bottom: 7px;
          margin-bottom: 5px;
          line-height: 32px;
          font-style: normal;
          padding-left: 10px;
        }
      }
      `}</style>
    </>
  );
};

export default BudgetHeadline;
