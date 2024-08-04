// BoardList.js

import React, { useEffect } from "react";

const BoardFaq = ({ board_page_data }) => {
  const listNews =
    board_page_data && board_page_data.length > 0 ? board_page_data[0].faq : [];
  return listNews.length > 0 ? (
    <>
      <h2 className="brdrslthd">FAQs (Frequently Asked Questions)</h2>
      <ul className="brdrsltfaq">
        {listNews.map((data, index) => {
          return (
            <>
              <li
                key={`q${index}`}
                className={`acts`}
              >
                <h3>
                  <a href="JavaScript:void(0)" dangerouslySetInnerHTML={{ __html: data[`q${index + 1}`] }}></a>
                  {/* <div dangerouslySetInnerHTML={{ __html: data[`a${index + 1}`] }}></div> */}
                </h3>
                <p dangerouslySetInnerHTML={{ __html: data[`a${index + 1}`] }}></p>
                {/* <div dangerouslySetInnerHTML={{ __html: data[`a${index + 1}`] }}></div> */}
              </li>
            </>
          );
        })}
      </ul>
      <style jsx global>{`
        .brdrsltfaq {
          margin-bottom: 20px;
        }
        .brdrsltfaq li {
          border-bottom: 1px dashed #696969;
          position: relative;
          padding: 10px 0;
        }
        .brdrsltfaq li h3 a,
        .brdrsltfaq li h3 {
          font-size: 18px;
          color: #001d42;
          line-height: 28px;
          font-weight: bold;
        }
        .brdrsltfaq li.acts p {
          display: block;
        }
        .brdrsltfaq li p {
          color: #636363;
          font-size: 14px;
          line-height: 18px;
          display: none;
        }
        .brdrsltfaq li.acts:after {
          transform: rotate(-45deg);
        }
        .brdrsltfaq li:after {
          content: "";
          width: 9px;
          height: 9px;
          border-top: 2px solid #001d42;
          border-right: 2px solid #001d42;
          position: absolute;
          top: 16px;
          right: 10px;
          transform: rotate(135deg);
        }
      `}</style>
    </>
  ) : (
    ""
  );
};

export default BoardFaq;
