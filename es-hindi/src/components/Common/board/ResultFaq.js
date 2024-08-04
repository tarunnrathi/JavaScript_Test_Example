// BoardList.js

import React, { Fragment, useEffect } from "react";

const BoardFaq = ({ board_page_data }) => {
  const listNews =
    board_page_data && board_page_data.length > 0 ? board_page_data[0].faq : [];

  // useEffect(() => {
  //   const toggles = document.getElementsByClassName("toggle");
  //   const contentDiv = document.getElementsByClassName("content");
  //   const icons = document.getElementsByClassName("icon");
  //   for (let i = 0; i < toggles.length; i++) {
  //     toggles[i].addEventListener("click", () => {
  //       if (
  //         parseInt(contentDiv[i].style.height) !== contentDiv[i].scrollHeight
  //       ) {
  //         contentDiv[i].style.height = `${contentDiv[i].scrollHeight}px`;
  //         icons[i].classList.remove("fa-plus");
  //         icons[i].classList.add("fa-minus");
  //       } else {
  //         contentDiv[i].style.height = "0px";
  //         icons[i].classList.remove("fa-minus");
  //         icons[i].classList.add("fa-plus");
  //         contentDiv[i].classList.remove("heightActive");
  //         contentDiv[i].classList.add("heightActive");
  //       }
  //       for (let j = 0; j < contentDiv.length; j++) {
  //         if (j !== i) {
  //           contentDiv[j].style.height = 0;
  //           icons[j].classList.remove("fa-minus");
  //           icons[j].classList.add("fa-plus");
  //         }
  //       }
  //     });
  //   }
  // }, []);

  return listNews.length > 0 ? (
    <>
      <h2 className="brdrslthd">FAQs (Frequently Asked Questions)</h2>
      <div className="accordion-wrapper">
        <div className="box">
          <div className="container">
            {listNews &&
              listNews.map((data, index) => {
                return (
                  <>
                    <div className="ac_wrap">
                      <button className="toggle" dangerouslySetInnerHTML={{ __html: data[`q${index + 1}`] }}>
                        {/* {data[`q${index + 1}`]} */}
                        {/* <div dangerouslySetInnerHTML={{ __html: data[`q${index + 1}`] }}></div> */}
                        {/* <svg
                          className="icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16.434"
                          height="10.397"
                          viewBox="0 0 16.434 10.397"
                        >
                          <path
                            id="Shape_1544_copy_2"
                            data-name="Shape 1544 copy 2"
                            d="M1067.5,287l-7.5-7.3,1.75-1.7,5.75,5.6,5.751-5.6,1.75,1.7Z"
                            transform="translate(-1059.283 -277.302)"
                            fill="#001d42"
                            stroke="rgba(0,0,0,0)"
                            strokeWidth="1"
                          />
                        </svg> */}
                      </button>
                      <div className="content">
                        <p className="contentText"><div dangerouslySetInnerHTML={{ __html: data[`a${index + 1}`] }}></div></p>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .faq_sec {
          margin-bottom: 30px;
        }
        .single-accordion {
          text-align: center;
          margin: 50px 30px 100px;
        }
        .head-tittle {
          font-size: 50px;
          font-weight: bold;
          line-height: 1.22;
          top: 6px;
          color: #000;
          text-transform: capitalize;
          display: block;
          text-align: center;
          text-decoration: underline;
          text-decoration-style: solid;
          text-decoration-color: #015ab6;
        }
        .box {
          width: 100%;
          min-width: 300px;
        }
        .container {
          width: 100%;
        }
        .ac_wrap {
          border-bottom: 1px dotted #696969;
        }
        .ac_wrap:last-child {
          border-bottom: none;
        }

        .toggle {
          font: bold 18px/29px Lato;
          color: #001d42;
          // width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 10px 10px 10px 0;
          text-align: left;
        }

        .toggle:before {
          content: 'Q :';
          display: inline-block;
          margin-right: 10px;
          color: #EB3D3C;
          position: relative;
          top: -4px
        }

        .content:before {
          content: 'Ans :';
          display: inline-block;
          margin-right: 10px;
          -webkit-flex-shrink: 0;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          position: relative;
          top: -4px
      }

        .content {
          background: rgba(255, 255, 255, 0.2);
          font-size: 1rem;
          -webkit-transition: all 1s ease;
          -o-transition: all 1s ease;
          transition: all 1s ease;
          border-radius: 0 0 5px 5px;
          display:flex;
        }
        .content p {
          margin: 0;
          font: normal 14px/18px Lato;
          color: #636363;
          padding: 0 0 10px 0;
        }
        .fab {
          color: #fff;
        }
        .icon.fa-minus {
          transform: rotate(-180deg);
        }
      `}</style>
    </>
  ) : (
    ""
  );
};

export default BoardFaq;
