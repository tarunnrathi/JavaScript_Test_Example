import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// import Taboola from "widgets/Common/Responsive/Taboola";
import ArticleListByCategory from "components/Desktop/homepage/ArticleListByCategory";
// import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
// const RhsBoard = dynamic(() => import("widgets/Common/Desktop/RhsBoard"));
const NewSiteAd = dynamic(() => import("widgets/Common/Responsive/NewSiteAd"));
import Glide from "@glidejs/glide";
const parseDescription = (desc) => {
  return desc
    ?.replace(/\\'/g, "'")
    .replace(/\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/\\0/g, "\0")
    .replace(/\\*/g, ``)
    .replace(/&quot;/g, `"`)
    .replace(/\[caption.*?\](.*?)\[\/caption\]/, "$1");
};
const BoardMobile = (props) => {
  const {
    pageAds,
    photoStories,
    boardData,
    relatedNewsData,
    breadCrumbArray,
    boardResultYear,
  } = props.data;
  const [ind, setInd] = useState(null);
  const btnClick = (index) => {
    if (index === ind) {
      setInd(null);
    } else {
      setInd(index);
    }
  };
  useEffect(() => {
    if (boardData[0]?.page_details?.length > 1) {
      new Glide(document.querySelector(".br_wrapdv"), {
        autoplay: 3000,
        type: "carousel",
        perView: 1,
        gap: 0,
        slidesToScroll: 1,
      }).mount();
    }
  }, []);
  return (
    <>
      <div className="wrapper">
        <div className="ad_center">
          <NewSiteAd
            slotId={`mobile_atf_320`}
            adUnit={pageAds.header_ATF_320}
            sizes={[
              [300, 250],
              [336, 280],
            ]}
            width={336}
            height={280}
          />
        </div>
        <div className="content_Wrp">
          <div className="brade_crum forblogs">
            {/* <a href="/">Home</a> » <a href="/news/">NEWS</a> »{" "}
            <a href="/education-career/">EDUCATIONg and CAREER</a> »{" "}
            <span className="brd_act">
              <span className="breadcrumbh1">
                <b>State Board Results 2022</b>
              </span>
            </span> */}
            <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
          </div>
          <section className="section_top">
            <h1 className="main_heading">
              {boardData?.length > 0 && boardData[0].title} <>(बोर्ड रिजल्ट </>
              <>{boardResultYear})</>
            </h1>
            {boardData?.length > 0 && (
              <div className="buttonGrp1">
                {boardData[0]?.sub_page?.map((item, index) => {
                  return (
                    <a key={index} href={`/india-result/${item?.weburl}`}>
                      <button className="board_button1">{item?.title}</button>
                    </a>
                  );
                })}
              </div>
            )}
            <p
              className="main_desc"
              dangerouslySetInnerHTML={{
                __html: parseDescription(boardData[0]?.intro),
              }}
            />
          </section>
          {/* {boardData?.length > 0 && boardData[0]?.page_details?.length > 0 && (
            <div className="live_result">
              {boardData[0]?.page_details?.map((item, index) => {
                if (item?.url !== "") {
                  return (
                    <iframe
                      src={
                        "https://www.news18.com/board-results-pubstack/board_iframe_slider.html?bid=5e26af84ff22f41c7f7ce25e"
                      }
                      title={""}
                      id={`result-ifr`}
                      defer
                      loading="lazy"
                      allowfullscreen={"allowfullscreen"}
                      scrolling="no"
                      frameborder="0"
                    ></iframe>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )} */}
          {(boardData?.length > 0 && boardData[0]?.page_details?.length > 0) && (
            <div className="br_wrap">
              <div className="br_wrapdv">
                <div data-glide-el="track">
                  <div className="br_wrapdvlitm">
                    {boardData[0]?.page_details?.map((item, index) => {
                      if (item.image && item.image !== "") {
                        return (
                          <a href={item?.url}><img style={{ width: "100%", height: "auto" }} src={item?.image} alt="img" /></a>
                        )
                      } else {
                        if (item?.url !== "") {
                          return (
                            <div>
                              <iframe
                                src={item?.url}
                                title={""}
                                id={`result-ifr`}
                                defer
                                loading="lazy"
                                allowFullScreen={"allowfullscreen"}
                                scrolling="no"
                                frameBorder="0"
                              ></iframe>
                            </div>
                          )
                        } else {
                          return null;
                        }
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="ad_center">
            <NewSiteAd
              slotId={`mobile_atf_300`}
              adUnit={pageAds.ATF_300}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={336}
              height={280}
            />
          </div>
          <div className="read_less_full">
            <h2 className="subhead">
              {boardData?.length > 0 && boardData[0].title} <>रिजल्ट </>
              <>{boardResultYear}</>
            </h2>
            <div
              className="read_full_containr"
              dangerouslySetInnerHTML={{
                __html: parseDescription(boardData[0]?.description),
              }}
            />
          </div>
        </div>
        <div className="ad_center">
          <NewSiteAd
            slotId={`mobile_mtf_300`}
            adUnit={pageAds.MTF_300}
            sizes={[
              [300, 250],
              [336, 280],
            ]}
            width={336}
            height={280}
          />
        </div>
        {boardData?.length > 0 && boardData[0]?.optionFilter?.length > 0 && (
          <section className="faq_sec">
            <h3 className="faq_heading">FAQs (Frequently Asked Questions)</h3>
            <div className="accordion-wrapper">
              <div className="box">
                <div className="container">
                  {boardData[0]?.optionFilter
                    ?.sort((a, b) => {
                      return a.rank - b.rank;
                    })
                    ?.map((item, index) => {
                      return (
                        <div className="ac_wrap">
                          <button
                            className="toggle"
                            onClick={() => btnClick(index)}
                          >
                            {item?.question}
                            <svg
                              className={
                                ind === index ? "icon fa-minus" : "icon"
                              }
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
                                stroke-width="1"
                              />
                            </svg>
                          </button>
                          <div
                            className="content"
                            style={
                              ind === index
                                ? { height: "auto" }
                                : { height: "0px" }
                            }
                          >
                            <p className="contentText">{item?.ans_desc}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </section>
        )}
        <div className="ad_center">
          <NewSiteAd
            slotId={`mobile_btf_300`}
            adUnit={pageAds.BTF_300}
            sizes={[
              [300, 250],
              [336, 280],
            ]}
            width={336}
            height={280}
          />
        </div>
        <section className="reslt_n_news">
          <h3 className="main_heading">
            {boardData?.length > 0 && boardData[0].title} रिजल्ट्स न्यूज
          </h3>
          <ArticleListByCategory
            heading=""
            isSubMenu={false}
            data={relatedNewsData || []}
            categoryLink={"/tag/board-result/"}
            key={`boardCat`}
            category="board-result"
          />
        </section>
      </div>
      <style jsx global>{`
        .wrapper {
          width: 100%;
          padding: 0;
        }
        .dflex {
          display: flex;
        }
        .justify-space-between {
          justify-content: space-between;
        }
        .justify-space-evenly {
          justify-content: space-evenly;
        }
        .justify-space-center {
          justify-content: center;
        }
        .flex-wrap {
          flex-wrap: wrap;
        }
        .align-items {
          align-items: center;
        }
        .flex-dir {
          flex-direction: column;
        }
        .content_Wrp {
          padding: 0 15px;
        }
        .rght_side {
          padding: 0 15px;
          overflow: hidden;
        }
        .main_heading {
          font-size: 24px;
          line-height: 1.5;
          font-weight: bold;
          color: #eb3d3c;
          margin-bottom: 10px;
          text-transform: capitalize;
        }
        .main_heading a {
          color: #eb3d3c;
        }
        .main_desc {
          text-align: left;
          font-size: 14px;
          line-height: 22px;
          color: #333333;
          margin-bottom: 20px;
        }
        .ad_center {
          text-align: center;
          padding: 20px 0;
          margin-bottom: 0px;
        }
        .twitter_rhs {
          text-align: center;
        }
        .read_more {
          display: block;
          font-size: 14px;
          line-height: 19px;
          font-weight: 700;
          color: #eb3d3c;
          margin: 10px auto;
          width: 130px;
          position: relative;
          text-align: center;
          cursor: pointer;
        }
        .read_more .arrows {
          position: absolute;
          top: 10px;
          right: 15px;
          width: 12px;
          height: 1px;
          background-color: #eb3d3c;
        }
        .read_more .arrows:before,
        .read_more .arrows:after {
          content: "";
          position: absolute;
          width: 7px;
          height: 1px;
          top: -2px;
          right: -1px;
          background-color: #eb3d3c;
          transform: rotate(45deg);
        }
        .read_more .arrows:after {
          top: 2px;
          transform: rotate(-45deg);
        }
        .brade_crum {
          padding-bottom: 0;
          padding-top: 10px;
        }
        .forblogs {
          //border-bottom: 1px solid #ebebeb;
          padding: 15px 0 10px 0;
          margin-bottom: 10px;
        }
        .buttonGrp1 {
          margin-bottom: 10px;
        }
        .board_button1 {
          background: #606060;
          font-size: 14px;
          line-height: 19px;
          color: #fff;
          font-weight: 400;
          text-transform: uppercase;
          outline: none;
          -webkit-border-radius: 20px;
          -moz-border-radius: 20px;
          border-radius: 20px;
          border: 1px solid;
          padding: 5px 20px;
          margin-right: 5px;
          cursor: pointer;
        }
        .live_result {
          text-transform: capitalize;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: bold;
        }
        #result-ifr {
          width: 100%;
          height: 686px;
          margin: 0px auto;
          display: block;
        }
        .read_less_full {
          margin-bottom: 50px;
        }
        .buttonGrp {
          position: relative;
          width: 136px;
          margin: 30px auto 0px;
        }
        .buttonGrp button {
          background-color: #1799bc;
          border: none;
          width: 100%;
          padding: 10px 15px 10px 0px;
          box-sizing: border-box;
          border-radius: 20px;
          cursor: pointer;
          color: #fff;
          font-size: 14px;
          line-height: 19px;
          font-weight: 400;
          outline: none;
        }
        .buttonGrp .arrows {
          position: absolute;
          top: 20px;
          right: 12px;
          width: 12px;
          height: 1px;
          background-color: #fff;
        }
        .buttonGrp .arrows:before,
        .buttonGrp .arrows:after {
          content: "";
          position: absolute;
          width: 7px;
          height: 1px;
          top: -2px;
          right: -1px;
          background-color: #fff;
          transform: rotate(45deg);
        }
        .buttonGrp .arrows:after {
          top: 2px;
          transform: rotate(-45deg);
        }
        .read_less_full .read_less_containr {
          display: block;
          overflow: hidden;
          position: relative;
          background: #fff;
          height: 100px;
          padding: 0px 20px 0px 0px;
          box-sizing: border-box;
          line-height: 2;
          padding-bottom: 0;
        }
        .read_less_full .read_less_containr p {
          font-size: 14px;
          line-height: 25px;
          font-weight: 400;
          color: #000;
        }
        .read_less_full .read_less_containr:after {
          position: absolute;
          bottom: 0;
          height: 100%;
          width: 100%;
          content: "";
          background: linear-gradient(
            to top,
            rgba(255, 255, 255, 1) 20%,
            rgba(255, 255, 255, 0) 80%
          );
          pointer-events: none;
        }
        .read_less_full .buttonGrp {
          margin-bottom: 20px;
          margin-top: 10px;
        }
        .read_less_full .buttonGrp button {
          background-color: #eb3d3c;
          text-transform: capitalize;
        }
        .read_less_full .buttonGrp .arrows {
          width: 13px;
          transform: rotate(89deg);
        }
        .read_less_full .buttonGrp.rd_less .arrows {
          width: 13px;
          transform: rotate(-89deg);
        }
        .read_less_full .rd_less button {
          background-color: #707070;
        }
        .read_less_full .read_full_containr {
          height: auto;
        }
        .read_less_full .read_full_containr p a {
          color: red;
        }
        .read_less_full .read_full_containr ol {
          margin-left: 10px;
        }
        .read_less_full .read_full_containr:after {
          background: none;
          pointer-events: visible;
        }
        .brdrslthd {
          font-size: 26px;
          line-height: 1.5;
          font-weight: 600;
          color: #eb3d3c;
          margin: 0px 0 5px 0;
        }
        .subhead {
          font-size: 22px;
          line-height: 29px;
          font-weight: 600;
          color: #333;
          margin: 0px 0 5px 0;
        }
        //faq start here
        .faq_sec {
          margin-bottom: 30px;
        }
        .faq_heading {
          font-size: 13px;
          line-height: 27px;
          font-weight: bold;
          color: #fff;
          text-transform: uppercase;
          height: 32px;
          background: #e1261d;
          padding: 3px 15px;
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
          background: #f5f5f5;
          margin-bottom: 5px;
        }
        .ac_wrap:last-child {
          border-bottom: none;
        }
        .toggle {
          font-size: 16px;
          line-height: 20px;
          font-weight: bold;
          color: #001d42;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 10px 15px;
          text-align: left;
        }
        .content {
          background: rgba(255, 255, 255, 0.2);
          font-size: 1rem;
          height: 0;
          overflow: hidden;
          -webkit-transition: all 1s ease;
          -o-transition: all 1s ease;
          transition: all 1s ease;
          border-radius: 0 0 5px 5px;
        }
        .content p {
          margin: 0;
          font-size: 14px;
          line-height: 18px;
          color: #636363;
          padding: 0 15px 10px;
        }
        .fab {
          color: #fff;
        }
        .icon {
          flex-shrink: 0;
          margin: 5px 0 0 10px;
        }
        .icon.fa-minus {
          transform: rotate(-180deg);
        }
        //result n news
        .reslt_n_news {
          margin: 0 15px 50px;
        }
        .rne_list {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -15px;
        }
        .rne_list li {
          flex: 1;
          margin: 0 14px;
          border-bottom: 1px dotted #707070;
          margin-bottom: 20px;
        }
        .rne_list a {
          display: inline-flex;
          flex-direction: row-reverse;
          padding-bottom: 20px;
        }
        .rne_list img {
          width: 129px;
          height: 72px;
          border-radius: 10px;
        }
        .rne_list .copy {
          font-size: 14px;
          line-height: 22px;
          color: #000218;
          margin-right: 15px;
        }
        .load_more {
          display: block;
          width: 100%;
          background: #f5f5f5;
          text-align: center;
        }
        .load_more span {
          display: inline-block;
          background: white;
          color: #eb3d3c;
          font-size: 14px;
          text-transform: uppercase;
          padding: 1px 10px;
          font-weight: bold;
        }
        .read_full_containr h1 {
          font-size: 20px;
          color: #333;
          margin: 10px 0;
          font-weight: bold;
        }
        .read_full_containr ul li {
          list-style: disc;
        }
        .read_full_containr ul {
          position: relative;
          padding-left: 18px;
          margin: 10px 0;
        }
        .br_wrap {
          position: relative;
        }
        .br_wrap:after {
          background: #f0eeef;
          right: 0;
        }
        .rmgblhd {
          text-align: center;
          color: #000;
          font-size: 30px;
          line-height: 22px;
          margin: 20px 0 10px;
        }
        .rmgblhd:after {
          content: "";
          background: url(https://hindi.news18.com/images/rammandir/hdbtmarw.svg)
            0 0 no-repeat;
          width: 320px;
          height: 10px;
          margin: 10px auto;
          background-size: 320px;
          display: block;
        }
        .br_wrapdv {
          overflow: hidden;
          margin: 0 0px;
          display: flex;
          justify-content: center;
        }
        .br_wrapdvlitm {
          display: flex;
          margin-bottom: 10px;
        }
        .br_wrapdvlitm div {
          overflow: hidden;
        }
        .br_wrapdvlitm div figure {
          width: 100%;
          position: relative;
          overflow: hidden;
          margin: 0;
        }
        .br_wrapdvlitm div figure img {
          width: 100%;
          border-radius: 0px;
          max-height: calc(calc(var(--vh, 1vh) * 100) - 0);
        }
        .shvar button {
          position: absolute;
          top: 45%;
          width: 40px;
          height: 40px;
          background: #ff0000;
          left: -14px;
          border-radius: 100%;
          border: none;
          outline: none;
          cursor: pointer;
        }
        .shvar button:last-child {
          right: -14px;
          left: auto;
          transform: rotate(180deg);
        }
        .shvar button:after,
        .shvar button:before {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(-45deg);
          top: 15px;
        }
        .shvar button:after {
          left: 14px;
        }
        .read_full_containr > table,
        .read_full_containr > table > tr,
        .read_full_containr > table tr > td,
        .read_full_containr > table tr > th {
          border: 1px solid #ddd !important;
          border-spacing: 0;
        }
        .read_full_containr img {
          width: 100% !important;
          height: 320px !important;
          line-height: 0;
          // margin: auto auto 12px auto;
          width: 100%;
          display: block;
        }
        .read_full_containr ol li {
          list-style: decimal;
        }
        .read_full_containr table {
          border-spacing: 0;          
          border-bottom: #999 solid 1px;
          border-right: #999 solid 1px;
          margin: 20px 0;
          width: 100%!important          
        }
        .read_full_containr table td,
        .read_full_containr table th {
          padding: 8px;
          border-top: #999 solid 1px;
          border-left: #999 solid 1px;
        }
        
      `}</style>
    </>
  );
};
export default React.memo(BoardMobile);