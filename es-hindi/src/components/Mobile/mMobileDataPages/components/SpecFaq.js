import React, { useState } from "react";

const { specificationURL } = require("/src/includes/brand.helper");

const Faq = ({ faq }) => {
  const [accordBtn, setAccordBtn] = useState();

  const faqAccordianHandler = (event, index) => {
    if (index === accordBtn) {
      setAccordBtn("");
    } else {
      setAccordBtn(index);
    }
  };

  const openSpecPage = (title, id) => {
    window.location.href = title?.includes("(")
      ? `${specificationURL}/${title
          ?.slice(0, title?.indexOf("("))
          ?.replace(/ /g, "-")
          ?.toLowerCase()}${id}/`
      : `${specificationURL}/${title?.replace(/ /g, "-")?.toLowerCase()}-${id}/`;
    // window.scrollTo(0, 0);
  };
  // return <h1>faq</h1>
  return (
    <div>
      {" "}
      <div className="faqSection">
        <h3 className="faqHeading">FAQs (Frequently Asked Questions)</h3>
        <ul className="faqAccordian">
          {faq?.map((data, i) => {
            if (data?.show) {
              return (
                <li onClick={(e) => faqAccordianHandler(e, i)} key={i}>
                  <h4 className={accordBtn === i ? "active" : ""}>
                    {data?.question}
                  </h4>
                  <div
                    className={`faqAccordianContent ${
                      accordBtn === i ? "active" : ""
                    }`}
                  >
                    <p className="SpecFaqAnswer">{data?.answer}</p>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <style jsx global>
        {`
          .faqSection {
            margin-bottom: 30px;
          }
          .faqSection .faqHeading {
            font-size: 13px;
            text-align: center;
            font-weight: normal;
            text-transform: uppercase;
            color: #fff;
            background: #e1261d;
            padding: 7px;
          }
          .faqSection .faqSubHead {
            color: #464646;
            font-size: 13px;
            font-weight: normal;
            line-height: 15px;
            border-bottom: 1px solid #d8d8d8;
            text-align: center;
            background: #f5f5f5;
            padding: 8px 0;
          }
          .faqAccordian li {
            padding: 6px 10px;
            cursor: pointer;
            background: #f5f5f5;
            margin-bottom: 5px;
          }
          .faqAccordian li h4 {
            font-size: 16px;
            color: #001d42;
            position: relative;
            padding-right: 35px;
            line-height: 20px;
          }
          .faqAccordian li h4::after {
            content: "";
            border-top: 2px solid #001d42;
            border-left: 2px solid #001d42;
            width: 8px;
            height: 8px;
            transform: rotate(225deg);
            position: absolute;
            right: 3px;
            top: 0;
            transition: all 0.5s;
          }
          .faqAccordian li .faqAccordianContent {
            height: 0;
            transition: height 0.5s;
            overflow: hidden;
          }
          .faqAccordian li .faqAccordianContent.active {
            height: auto;
          }
          .faqAccordian li .faqAccordianContent a {
            color: #636363;
            font-size: 13px;
            line-height: 19px;
            margin-top: 5px;
            display: block;
          }
          .faqAccordian li h4.active::after {
            transform: rotate(47deg);
            top: 8px;
          }

          .faqAccordian li .faqAccordianContent table {
            background: #fff;
            font-size: 12px;
          }
          .faqAccordian li .faqAccordianContent table th,
          .faqAccordian li .faqAccordianContent table td {
            padding: 5px;
          }

          .faqAccordian li .faqAccordianContent table th:nth-child(1),
          .faqAccordian li .faqAccordianContent table td:nth-child(1) {
            max-width: 100px;
          }

          .startAnsWith {
            font-size: 15px;
          }

          table {
            margin-top: 10px;
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }

          td,
          th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }

          tr:nth-child(even) {
            background-color: #f5f5f5;
          }

          .SpecFaqAnswer {
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
};

export default Faq;
