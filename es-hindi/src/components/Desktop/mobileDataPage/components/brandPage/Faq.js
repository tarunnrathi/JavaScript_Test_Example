import React, { useState } from "react";

const { specificationURL } = require("/src/includes/brand.helper");

const Faq = ({ brandTitle, faqi = [] }) => {
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
  return (
    <div>
      {" "}
      <div className="faqSection">
        <h3 className="faqHeading">FAQs (Frequently Asked Questions)</h3>
        <ul className="faqAccordian">
          {faqi?.map((data, i) => {
            if (data?.show) {
              return (
                <li onClick={(e) => faqAccordianHandler(e, i)} key={i}>
                  <h4 className={accordBtn === i ? "active" : ""}>
                    {data?.title}
                  </h4>
                  <div
                    className={`faqAccordianContent ${
                      accordBtn === i ? "active" : ""
                    }`}
                  >
                    <p>{data?.startAnsWith}</p>
                    <table>
                      <tr>
                        {data?.headerData?.map((spec) => {
                          return <th>{spec}</th>;
                        })}
                      </tr>

                      {data?.description?.map((desc) => {
                        const listOfKey = Object.keys(desc);

                        return (
                          <tr
                            onClick={() => openSpecPage(desc?.title, desc?.id)}
                          >
                            {listOfKey.map((singleKey) => {
                              if (singleKey !== "id") {
                                if (singleKey === "price") {
                                  return <td> ₹ {desc[singleKey]} </td>;
                                } else if (singleKey === "battery_capacity") {
                                  return <td> {desc[singleKey]} mAh </td>;
                                } else if (singleKey === "camera_i") {
                                  return <td> {desc[singleKey]} MP </td>;
                                } else if (singleKey === "refresh_rate_i") {
                                  return <td> {desc[singleKey]} Hz </td>;
                                } else {
                                  return <td>{desc[singleKey]} </td>;
                                }
                              }
                            })}
                          </tr>
                        );
                      })}
                    </table>
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
            color: #e1261d;
            font-size: 22px;
            margin-bottom: 5px;
          }
          .faqSection .faqSubHead {
            color: #464646;
            font-size: 13px;
            font-weight: normal;
            line-height: 15px;
            border-bottom: 1px solid #d8d8d8;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }

          .faqAccordian li {
            border-bottom: 1px dotted #d8d8d8;
            padding: 12px 0;
            cursor: pointer;
          }
          .faqAccordian li h4 {
            font-size: 18px;
            color: #001d42;
            position: relative;
          }
          .faqAccordian li h4::after {
            content: "";
            border-top: 1px solid #001d42;
            border-left: 1px solid #001d42;
            width: 12px;
            height: 12px;
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
            font-size: 14px;
            line-height: 29px;
            display: block;
          }
          .faqAccordian li h4.active::after {
            transform: rotate(47deg);
            top: 8px;
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
        `}
      </style>
    </div>
  );
};

export default Faq;
