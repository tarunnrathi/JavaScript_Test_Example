import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Taboola from "widgets/Common/Responsive/Taboola";
import ArticleListByCategory from "../homepage/ArticleListByCategory";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const RhsBoard = dynamic(() => import("widgets/Common/Desktop/RhsBoard"));
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import Glide from "@glidejs/glide";
const parseDescription = (desc) => {
  return desc
    ?.replace(/\\'/g, "'")
    .replace(/\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/\\0/g, "\0").replace(/\\*/g, ``)
    .replace(/&quot;/g, `"`)
    .replace(/\[caption.*?\](.*?)\[\/caption\]/, "$1");
}
const Board = (props) => {
  const {
    pageAds,
    photoStories,
    boardData,
    relatedNewsData,
    breadCrumbArray,
    boardResultYear,
    isClassData = false,
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
        autoplay: 4000,
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
        <div className="container dflex justify-space-between flex-wrap">
          <div className="lft_side">
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
                {boardData?.length > 0 && boardData[0].title}{" "}
                {isClassData ? <>(रिजल्ट</> : <>(बोर्ड रिजल्ट </>}
                <>&nbsp;{boardResultYear})</>
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
              <div
                className="main_desc"
                dangerouslySetInnerHTML={{
                  __html: parseDescription(boardData[0]?.intro),
                }}
              ></div>
            </section>
            <div className="middlead">
              <NewSiteAd
                slotId={"Desktop_Static_Ad_2"}
                adUnit={pageAds.BTF_728}
                sizes={[[728, 90]]}
                width={728}
                height={90}
                lazyLoad={true}
              />
            </div>
            {(boardData?.length > 0 &&
              boardData[0]?.page_details?.length > 0) && (
                <>
                  <div className="br_wrap">
                    <div className="br_wrapdv">
                      <div data-glide-el="track">
                        <div className="br_wrapdvlitm">
                          {boardData[0]?.page_details?.map((item, index) => {
                            if (item.image && item.image !== "") {
                              return (
                                <a href={item?.url}><img style={{ width: "100%",height:"425px" }} src={item?.image} alt="img"/></a>
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
                              }else{
                                return null;
                              }
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="middlead">
                    <NewSiteAd
                      slotId={"Desktop_Static_Ad_1"}
                      adUnit={pageAds.MTF_300_id}
                      sizes={[[728, 90]]}
                      width={728}
                      height={90}
                      lazyLoad={true}
                    />
                  </div>
                </>
              )}
            <div className="read_less_full">
              <h2 className="brdrslthd">
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
            <div className="middlead">
              <NewSiteAd
                slotId={"Desktop_Static_Ad_3"}
                adUnit={pageAds.MTF_300_id}
                sizes={[[728, 90]]}
                width={728}
                height={90}
                lazyLoad={true}
              />
            </div>
            {boardData?.length > 0 &&
              boardData[0]?.optionFilter?.length > 0 && (
                <section className="faq_sec">
                  <h3 className="main_heading">
                    FAQs (Frequently Asked Questions)
                  </h3>
                  {boardData[0]?.optionFilter?.length > 0 && (
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
                                        strokeWidth="1"
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
                                    <p className="contentText">
                                      {item?.ans_desc}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              )}
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
            <Taboola
              mode={TaboolaList.category.bottom.mode}
              id={TaboolaList.category.bottom.id}
              container={TaboolaList.category.bottom.container}
              placement={TaboolaList.category.bottom.placement}
            />
          </div>
          <div className="rght_side">
            <div className="register_here">
              <RhsBoard pageAds={pageAds} budgetPhotoStories={photoStories} />
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .middlead {
          display: flex;
          justify-content: center;
          margin: 15px;
          flex-direction: column;
          text-align: center;
        }
        .wrapper {
          width: 100%;
          padding: 0;
        }
        .container {
          max-width: 1244px;
          width: 100%;
          margin: auto;
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
        .lft_side {
          width: 930px;
          overflow: hidden;
        }
        .rght_side {
          width: 300px;
          margin-top: 15px;
          overflow: hidden;
        }
        .main_heading {
          color: #eb3d3c;
          margin-bottom: 10px;
          text-transform: capitalize;
          font-size: 26px;
          line-height: 32px;
          font-weight: bold;
        }
        .main_desc {
          text-align: left;
          font-size: 15px;
          line-height: 22px;
          font-weight: normal;
          color: #333333;
          margin-bottom: 20px;
        }
        .main_desc p{
          line-height: 26px;
        }
        .main_desc h2{
          line-height: 30px;
        }
        .ad_105x45 {
          width: 105px;
          height: 45px;
        }
        .ad_728x90 {
          width: 728px;
          height: 90px;
          margin: 0 auto;
          display: inline-block;
        }
        .ad_300x250 {
          width: 300px;
          height: 250px;
          margin-bottom: 20px;
        }
        .ad_center {
          text-align: center;
        }
        .twitter_rhs {
          text-align: center;
        }
        .read_more {
          display: block;
          font-size: 14px;
          line-height: 19px;
          font-family: "Noto Sans", devanagari;
          font-weight: 700;
          font-family: "Lato", sans-serif;
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
          margin-bottom: 30px;
        }
        .live_result {
          text-transform: capitalize;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: bold;
        }
        .live_resultin {
          overflow: hidden;
        }
        #result-ifr {
          width: 900px;
          height: 470px;
          margin: 0px auto;
          display: block;
        }
        .read_less_full {
          margin-bottom: 50px;
          margin-top: 35px;
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
          font-family: "Noto Sans", devanagari;
          font-weight: 400;
          outline: none;
          font-family: "Lato", sans-serif;
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
          font-size: 15px;
          line-height: 22px;
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
          font-size: 15px;
          line-height: 22px;
          font-weight: normal;
        }
        .read_less_full .read_full_containr p {
          line-height: 25px;
        }
        .read_less_full .read_full_containr p a {
          color:red;
        }
        .read_less_full .read_full_containr ol {
          margin-left: 14px;
        }
        .read_less_full .read_full_containr:after {
          background: none;
          pointer-events: visible;
        }
        .read_full_containr table {
          border-spacing: 0;
          border-bottom: #999 solid 1px;
          border-right: #999 solid 1px;
          margin: 20px 0;
          width: 100% !important;
        }
        .read_full_containr ol li {
          list-style: decimal;
        }
        .read_full_containr img {
          width: 560px;
          line-height: 0;
          height: 360px;
          display: block;
          overflow: hidden;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #cecece;
          background: #fff;
          padding: 10px;
          position: relative;
          margin: 12px auto 12px auto;
        }
        .read_full_containr table thead tr {
          background: #f0f0f0;
        }
        .read_full_containr table td,
        .read_full_containr table th {
          padding: 8px;
          border-top: #999 solid 1px;
          border-left: #999 solid 1px;
        }
        // faq start here
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
          font-family:
            Open Sans,
            sans-serif;
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
          font-size: 18px;
          line-height: 29px;
          font-weight: bold;
          color: #001d42;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 10px 10px 10px 0;
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
          font-size: 15px;
          line-height: 22px;
          font-weight: normal;
          color: #636363;
          padding: 0 0 10px 0;
        }
        .fab {
          color: #fff;
        }
        .icon.fa-minus {
          transform: rotate(-180deg);
        }
        // result n news
        .reslt_n_news {
          margin-bottom: 50px;
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
          margin-bottom: 25px;
          max-width: 291px;
        }
        .rne_list a {
          display: inline-block;
        }
        .rne_list img {
          width: 291px;
          height: 164px;
          border-radius: 10px;
        }
        .rne_list .copy {
          font: normal 20px/25px Lato;
          color: #000218;
          padding: 10px 0;
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
        // RHS
        .register_here {
          text-transform: capitalize;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: bold;
        }
        .buttonGrp1 {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .buttonGrp1 a {
          width: max-content;
          white-space: nowrap;
          margin: 0 8px 6px 0;
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
          cursor: pointer;
        }
        .brdrslthd {
          font-size: 22px;
          line-height: 22px;
          font-weight: bold;
          color: #333;
          margin: 15px 0 20px 0;
        }
        .read_full_containr h2 {
          font-size: 18px;
          color: #333;
          margin: 10px 0;
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
          margin: 25px 0;
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
          margin: 0 17px;
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
        .br_wrapdvlitm > a{margin: 0 auto;}
      `}</style>
    </>
  );
};
export default React.memo(Board);