import React from "react";

const BudgetAmpAcrossSite = ({
  highlightData = [],
  BUDGETYEAR = 2024,
  budgetSwitcher = {},
}) => {
  const live_blog_url =
    budgetSwitcher?.liveblog_url || "https://hindi.news18.com/budget/";

  return (
    <>
      {highlightData && (
        <div className="hghlts_wrp">
          <div className="hlght_text">
            <amp-img
              src="https://images.news18.com/ibnlive/uploads/2023/01/budget_glossary_icon_1609753501.png"
              alt=""
              width="28"
              height="29"
            ></amp-img>
            <p className="budget_23">
              union <br /> BUDGET {BUDGETYEAR}
            </p>
            <p className="hlghts">HIGHLIGHTS</p>
          </div>
          <div className="top_slider">
            {highlightData
              ? highlightData.map((highlight, index) => {
                  const _title =
                    typeof highlight.headline !== "undefined" &&
                    highlight.headline !== ""
                      ? highlight.headline.replace(/\\/g, "")
                      : "";
                  if (highlight.highlightstypes === "up") {
                    return (
                      <div className="green" key={index}>
                        <div className="svg_Wrp">
                          <svg
                            id="Component_20_1"
                            data-name="Component 20 - 1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.636"
                            height="16.701"
                            viewBox="0 0 16.636 16.701"
                          >
                            <path
                              id="Path_4977"
                              data-name="Path 4977"
                              d="M-3.652-16.5H5.5l-.9,1.848H1.59a4.629,4.629,0,0,1,.988,1.8H5.5L4.6-11H2.75A5.141,5.141,0,0,1,1.332-7.949a5.014,5.014,0,0,1-2.965,1.5V-6.4h-.645L3.223,0H.9L-4.6-6.4V-8.25h2.32A3.3,3.3,0,0,0-.193-9.045,3.046,3.046,0,0,0,.859-11H-4.6l.945-1.848H.6a3.107,3.107,0,0,0-1.16-1.311,3.126,3.126,0,0,0-1.719-.494H-4.6Z"
                              transform="translate(4.598 16.5)"
                              fill="#909090"
                            />
                            <path
                              id="Path_4978"
                              data-name="Path 4978"
                              d="M-1.092-9.217H1.092v4.875L2.971-6.221l1.32,1.295L0-.635-4.291-4.926l1.32-1.295,1.879,1.879Z"
                              transform="translate(12.345 17.336)"
                              fill="#037500"
                            />
                          </svg>
                        </div>
                        <a target="_blank" href="/budget/highlights/">
                          {_title}
                        </a>
                      </div>
                    );
                  } else if (highlight.highlightstypes == "down") {
                    return (
                      <div className="red" key={index}>
                        <div className="svg_Wrp">
                          <svg
                            id="Component_21_1"
                            data-name="Component 21 – 1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.636"
                            height="16.803"
                            viewBox="0 0 16.636 16.803"
                          >
                            <path
                              id="Path_4980"
                              data-name="Path 4980"
                              d="M-3.652-16.5H5.5l-.9,1.848H1.59a4.629,4.629,0,0,1,.988,1.8H5.5L4.6-11H2.75A5.141,5.141,0,0,1,1.332-7.949a5.014,5.014,0,0,1-2.965,1.5V-6.4h-.645L3.223,0H.9L-4.6-6.4V-8.25h2.32A3.3,3.3,0,0,0-.193-9.045,3.046,3.046,0,0,0,.859-11H-4.6l.945-1.848H.6a3.107,3.107,0,0,0-1.16-1.311,3.126,3.126,0,0,0-1.719-.494H-4.6Z"
                              transform="translate(4.598 16.5)"
                              fill="#909090"
                            />
                            <path
                              id="Path_4979"
                              data-name="Path 4979"
                              d="M1.092-.533H-1.092V-5.408L-2.971-3.529l-1.32-1.295L0-9.115,4.291-4.824,2.971-3.529,1.092-5.408Z"
                              transform="translate(12.345 17.336)"
                              fill="#e1261c"
                            />
                          </svg>
                        </div>
                        <a target="_blank" href="/budget/highlights/">
                          {_title}
                        </a>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="slide_text">
                        <a target="_blank" href="/budget/highlights/">
                          {_title}
                        </a>
                      </div>
                    );
                  }
                })
              : ""}
          </div>

          <div className="hghlts_right">
            <a href={live_blog_url} className="live_blog">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18.359"
                height="18.359"
                viewBox="0 0 18.359 18.359"
              >
                <path
                  id="Path_4982"
                  data-name="Path 4982"
                  d="M0,1.68a.951.951,0,0,1-.586-.273A.8.8,0,0,1-.82.82v-2.5H-4.18a1.59,1.59,0,0,1-1.172-.469A1.59,1.59,0,0,1-5.82-3.32V-11.68a1.59,1.59,0,0,1,.469-1.172A1.59,1.59,0,0,1-4.18-13.32H7.5a1.59,1.59,0,0,1,1.172.469A1.734,1.734,0,0,1,9.18-11.68V-3.32a1.734,1.734,0,0,1-.508,1.172A1.59,1.59,0,0,1,7.5-1.68H4.1L1.016,1.406A.821.821,0,0,1,.43,1.68Zm.82-5V-.781L3.4-3.32H7.5V-11.68H-4.18V-3.32ZM-7.5-5H-9.18V-15a1.734,1.734,0,0,1,.508-1.172A1.734,1.734,0,0,1-7.5-16.68H5.82V-15H-7.5Z"
                  transform="translate(9.18 16.68)"
                  fill="#001d42"
                />
              </svg>
              <span>live blog</span>
            </a>
            <a href="/budget/highlights/" className="detailed_view">
              <span>detailed view</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-arrow-right"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      )}

      <style jsx>
        {`
          .sponsorad {
            height: 50px;
            background: #000;
          }
          .hghlts_wrp {
            margin-bottom: 15px;
          }
          .hlght_text {
            display: inline-flex;
            align-items: center;
            padding: 4px 0 4px 10px;
            border-left: #e1261c solid 4px;
          }
          .budget_23 {
            font-size: 11px;
            line-height: 11px;
            color: #242d3c;
            position: relative;
            text-transform: uppercase;
            text-align: right;
            margin: 0 4px;
          }
          .budget_23:before {
            content: "";
            width: 8px;
            height: 8px;
            background: #e1261c;
            display: inline-block;
            border-radius: 10px;
            margin-right: 5px;
          }
          .hlghts {
            font-weight: bold;
            font-size: 26px;
            line-height: 20px;
            color: #e1261c;
          }
          .top_slider {
            position: relative;
            background: #e7e7e7;
            overflow: hidden;
            display: flex;
            overflow-x: scroll;
            padding: 11px 10px;
            border-top: 1px dashed #a2a2a2;
            border-bottom: 1px dashed #a2a2a2;
          }
          .top_slider > div {
            margin-right: 10px;
            flex-shrink: 0;
          }
          .top_slider > div:last-child {
            margin-right: 0;
          }
          .top_slider .slide_text {
            font-weight: bold;
            font-size: 14px;
            line-height: 17px;
            color: #001d42;
            padding: 13px 10px 14px;
            border-bottom: #001d42 solid 5px;
            border-radius: 5px;
            background: white;
            width: 260px;
            flex-shrink: 0;
          }
          .top_slider .green {
            font-weight: bold;
            font-size: 14px;
            line-height: 18px;
            color: #037500;
            padding: 5px 10px 2px;
            border-bottom: #037500 solid 5px;
            border-radius: 5px;
            background: white;
            max-width: 210px;
            display: flex;
            align-items: center;
            text-transform: capitalize;
          }
          .top_slider .red {
            font-weight: bold;
            font-size: 14px;
            line-height: 18px;
            color: #e1261c;
            padding: 5px 10px 2px;
            border-bottom: #e1261c solid 5px;
            border-radius: 5px;
            background: white;
            max-width: 210px;
            display: flex;
            align-items: center;
            text-transform: capitalize;
          }
          .top_slider .green .svg_Wrp,
          .top_slider .red .svg_Wrp {
            width: 30px;
            height: 30px;
            border: 1px solid #cbcbcb;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 30px;
            margin-right: 10px;
            flex-shrink: 0;
          }
          .hghlts_right {
            display: flex;
            border-bottom: #b6b3b4 solid 1px;
            box-shadow: 0px 3px 6px #00000029;
          }
          .hghlts_right a {
            height: 28px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            flex-shrink: 0;
            position: relative;
          }
          .hghlts_right a span {
            padding-left: 5px;
            font-weight: bold;
            font-size: 11px;
            line-height: 11px;
            text-transform: uppercase;
            text-decoration: underline;
          }
          .hghlts_right a.live_tv {
            color: #e1261c;
          }
          .hghlts_right a.live_blog {
            color: #001d42;
            margin-left: 10px;
          }
          .hghlts_right a.live_blog:before {
            content: "";
            width: 1px;
            height: 18px;
            background: #b6b3b4;
            display: block;
            position: absolute;
            left: 0;
            top: 5px;
          }
          .detailed_view {
            display: flex;
            align-items: center;
            background: #e1261c;
            margin-left: auto;
            padding: 0 10px;
          }
          .detailed_view span {
            font-weight: bold;
            font-size: 11px;
            line-height: 14px;
            color: #ffffff;
            text-transform: uppercase;
          }
          .detailed_view svg {
            margin-left: 3px;
          }
        `}
      </style>
    </>
  );
};

export default BudgetAmpAcrossSite;
