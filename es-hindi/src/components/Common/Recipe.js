import React from "react";
import { logEvent } from "includes/googleAnalytic";
import dynamic from "next/dynamic";
import { photoGallerydateConversion } from "../../../helper/global";

const ArticleImage = dynamic(() => import("./ArticleImage"));
const Byline = dynamic(() => import("./ByLine"));
const BylineAuthor = dynamic(() => import("./BylineAuthor"));

export default function Recipe({
  articleData = {},
  actualUrl = "",
  isDesktop = false,
  isAmp,
  isAjax,
  storyId,
}) {
  const {
    recipe_rating,
    recipe_category,
    recipe_prep_time,
    recipe_cook_time,
    recipe_serving_people,
    recipe_calorie,
    headline,
    images: { url: thumbnail, caption } = {},
    created_at,
    updated_at,
    agency,
    agency_full: agencyFull,
    author_byline: authorByline = {},
    author,
    youtubeid: youtubeId,
    categories,
    intro = "",
  } = articleData;

  const changeHeight = () => {
    const elem = document.querySelector(".read");
    const descDiv = elem.nextElementSibling;
    // let elmHgt = document.defaultView.getComputedStyle(descDiv, null);
    if (elem.classList.contains("expand")) {
      descDiv.style.height = "auto";
      descDiv.style.animation = "auto";
      elem.classList.remove("expand");
      elem.classList.add("collapsed");
    } else {
      descDiv.style.height = "70px";
      elem.classList.remove("collapsed");
      elem.classList.add("expand");
    }
  };
  // const getExertEnable = () => {
  //   let elem = document.querySelector(".full_desc_h3");
  //   let spanRead = document.querySelector("span.read");
  //   if (
  //     elem &&
  //     elem.textContent.length &&
  //     elem.textContent.length >= 140 &&
  //     elem.offsetHeight > 70
  //   ) {
  //     spanRead.style.display = "block";
  //     elem.style.height = "70px";
  //   } else {
  //     if (spanRead) {
  //       spanRead.style.display = "none";
  //     }
  //   }
  // };
  let totalRecipeTime = 0;
  if (recipe_cook_time || recipe_prep_time) {
    totalRecipeTime =
      Number(
        (recipe_cook_time || "0 min").toString().replace("min", "").trim(),
      ) +
      Number(
        (recipe_prep_time || "0 min").toString().replace("min", "").trim(),
      );
  }

  return (
    <>
      {isDesktop && (
        <div className="rcp-rtng" style={{ marginBottom: "15px" }}>
          <div className="rcp-rt-l">
            <ArticleImage
              headline={headline}
              image={thumbnail}
              caption={caption ? caption : ""}
              youtubeId={youtubeId}
              isMobile={false}
              categories={categories}
              isAjax={isAjax}
              isRes={true}
            />
          </div>
          <div className="rcp-rtng-rgt">
            <h1>{articleData.headline}</h1>
            <div className="clearfix">
              <div className="rcp-rt-s fleft">
                {new Array(5).fill(0).map((_, index) => (
                  <span
                    key={index}
                    className={`rcpstar-sprite rcpstar${
                      index + 1 <= recipe_rating
                        ? "-full"
                        : index + 1 === Math.round(recipe_rating) &&
                          recipe_rating - index + 1 !== 0
                        ? "-half"
                        : ""
                    }`}
                  ></span>
                ))}
              </div>
              <div className="rcp-rt-st fleft">{recipe_rating}/5</div>
              <div className="rcp-cktm fleft">
                <span></span>
                {totalRecipeTime} min.
              </div>
              <div className="rcpofon fleft">
                <span
                  className={recipe_category === "veg" ? "rcp-off" : "rcp-on"}
                ></span>
              </div>
            </div>
            <ul className="clearfix rcpdtl">
              <li>
                <span>प्रेप टाइम</span>
                {recipe_prep_time} min
              </li>
              <li>
                <span>कुकिंग टाइम </span>
                {recipe_cook_time} min
              </li>
              <li>
                <span>सर्विंग</span>
                {recipe_serving_people} लोग
              </li>
              <li>
                <span>कैलोरीज़</span>
                {recipe_calorie}
              </li>
            </ul>
            <div className="bynow-text dbnow" style={{ borderBottom: "none" }}>
              <div
                className="newbyeline recipe-newbyeline"
                style={{
                  display: "flex",
                  width: "100%",
                  float: "none",
                  justifyContent: "space-between",
                }}
              >
                <ul className="artclbyeline-agency">
                  <Byline agency={agency} agencyFull={agencyFull} />
                  <li>
                    <b>Last Updated : </b>
                    <time dateTime={updated_at ? updated_at : created_at}>
                      {/* {updateDate !== "" ? updateDate : creationDate} */}
                      {updated_at
                        ? photoGallerydateConversion(updated_at)
                        : photoGallerydateConversion(created_at)}
                    </time>
                  </li>
                </ul>
                <ul className="newbyeline-share-rcp">
                  <li>
                    <a
                      href={
                        "https://www.facebook.com/sharer.php?u=" +
                        actualUrl +
                        "&t=" +
                        articleData.headline
                      }
                      target="_blank"
                    >
                      <span className="spriteshare art-facebook-icon"></span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={
                        "https://twitter.com/share?text=" +
                        articleData.headline +
                        "&url=" +
                        actualUrl
                      }
                      target="_blank"
                    >
                      <span className="spriteshare art-twitter-icon"></span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={
                        "https://www.linkedin.com/shareArticle/?mini=true&url=" +
                        actualUrl
                      }
                      target="_blank"
                    >
                      <span className="spriteshare art-linkedin-icon"></span>
                    </a>
                  </li>
                  <li style={{ background: "#25d366" }}>
                    <a
                      className="for-whatsapp"
                      href={
                        "https://web.whatsapp.com/send?text=" +
                        articleData.headline +
                        " - " +
                        actualUrl
                      }
                      target="_blank"
                    >
                      <svg
                        enableBackground="new 0 0 100 100"
                        height="100px"
                        id="Layer_1"
                        version="1.1"
                        viewBox="0 0 100 100"
                        width="100px"
                        xmlSpace="preserve"
                        xmlns="https://www.w3.org/2000/svg"
                        xmlnsXlink="https://www.w3.org/1999/xlink"
                      >
                        <g>
                          <defs>
                            <rect height="100" id="SVGID_1_" width="100" />
                          </defs>
                          <path
                            d={`M95,49.247c0,24.213-19.779,43.841-44.182,43.841c-7.747,0-15.025-1.98-21.357-5.455L5,95.406   
                            l7.975-23.522c-4.023-6.606-6.34-14.354-6.34-22.637c0-24.213,19.781-43.841,44.184-43.841C75.223,5.406,95,25.034,95,49.247    
                            M50.818,12.388c-20.484,0-37.146,16.535-37.146,36.859c0,8.066,2.629,15.535,7.076,21.611l-4.641,13.688l14.275-4.537   
                            c5.865,3.851,12.891,6.097,20.437,6.097c20.481,0,37.146-16.533,37.146-36.858C87.964,28.924,71.301,12.388,50.818,12.388    
                            M73.129,59.344c-0.273-0.447-0.994-0.717-2.076-1.254c-1.084-0.537-6.41-3.138-7.4-3.494c-0.993-0.359-1.717-0.539-2.438,0.536   
                            c-0.721,1.076-2.797,3.495-3.43,4.212c-0.632,0.719-1.263,0.809-2.347,0.271c-1.082-0.537-4.571-1.673-8.708-5.334   
                            c-3.219-2.847-5.393-6.364-6.025-7.44c-0.631-1.075-0.066-1.656,0.475-2.191c0.488-0.482,1.084-1.255,1.625-1.882   
                            c0.543-0.628,0.723-1.075,1.082-1.793c0.363-0.717,0.182-1.344-0.09-1.883c-0.27-0.537-2.438-5.825-3.34-7.976   
                            c-0.902-2.151-1.803-1.793-2.436-1.793c-0.631,0-1.354-0.09-2.076-0.09s-1.896,0.269-2.889,1.344   
                            c-0.992,1.076-3.789,3.676-3.789,8.963c0,5.288,3.879,10.397,4.422,11.114c0.541,0.716,7.49,11.92,18.5,16.223   
                            C63.2,71.177,63.2,69.742,65.186,69.562c1.984-0.179,6.406-2.599,7.312-5.107C73.398,61.943,73.398,59.792,73.129,59.344`}
                          />
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        "https://telegram.me/share/url?url=?mini=true&url=" +
                        actualUrl
                      }
                      target="_blank"
                    >
                      <span className="spriteshare art-telegram-icon"></span>
                    </a>
                  </li>
                  <li
                    style={{
                      background: "#4e4e4e",
                      width: "40px",
                      display: "flex",
                      height: "40px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <a
                      href={`mailto:?subject=${articleData.headline} - ${actualUrl}`}
                      target="_blank"
                      rel="nofollow"
                      className="for_mail"
                    >
                      <svg
                        height="16px"
                        version="1.1"
                        viewBox="0 0 20 16"
                        width="20px"
                        id="Layer_111"
                      >
                        <title></title>
                        <desc></desc>
                        <defs></defs>
                        <g
                          fill="none"
                          fillRule="evenodd"
                          id="Page-1"
                          stroke="none"
                          strokeWidth="1"
                        >
                          <g
                            fill="#000000"
                            id="Icons-Communication"
                            transform="translate(-168.000000, -43.000000)"
                          >
                            <g
                              id="email"
                              transform="translate(168.000000, 43.000000)"
                            >
                              <path
                                d="M18,0 L2,0 C0.9,0 0,0.9 0,2 L0,14 C0,15.1 0.9,16 2,16 L18,16 C19.1,16 20,15.1 20,14 L20,2 C20,0.9 19.1,0 18,0 L18,0 Z M18,4 L10,9 L2,4 L2,2 L10,7 L18,2 L18,4 L18,4 Z"
                                id="Shape"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <div className="follow_us">
                      <div className="fl_txt">Follow us on</div>
                      <a
                        href="https://news.google.com/publications/CAAqBwgKML6x9wowu8nWAg"
                        className="gn_icon"
                        onClick={() =>
                          logEvent(
                            "Social_Share",
                            "Click",
                            `${articleData.headline},${storyId},google`,
                          )
                        }
                      ></a>
                    </div>
                  </li>
                </ul>
                <ul className="artclbyeline-author">
                  <BylineAuthor
                    authorByline={authorByline}
                    author={author}
                    isMobile={false}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isDesktop && (
        <div className="pdngsxtn-lr art-heading clearfix">
          <div
            className="cnsmpn-box"
            style={{ padding: isAmp ? "5px" : "5px 12px" }}
          >
            <div className="pdngsxtn-lr clearfix">
              <div className="rcprtngl forrcpmpn">
                <span className="rcptg fl">
                  {recipe_category === "veg" ? "वेज" : ""}
                </span>
                <div className="rcprtng-str fl">
                  <div className="star-nmbr forrcpcnsmpnlg fl">
                    {new Array(5).fill(0).map((_, index) => (
                      <span
                        key={index}
                        className={`starsprite rcpcnsmpnlg${
                          index + 1 <= recipe_rating
                            ? "-full"
                            : index + 1 === Math.round(recipe_rating) &&
                              recipe_rating - index + 1 !== 0
                            ? "-half"
                            : ""
                        }`}
                      ></span>
                    ))}
                  </div>
                  <div className="star-pnts fl">{recipe_rating}</div>
                </div>
                <div className="rcp-rgt fr">
                  <span className="fl">
                    <img
                      src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/watchiconnew_1669295510.png"
                      width="12px"
                      height="12px"
                      alt={articleData.headline}
                    ></img>
                    {totalRecipeTime} min.
                  </span>
                  <span className="fl">
                    <em className="onln"></em>
                  </span>
                </div>
              </div>
              <h1 className="cnsmpn-hd">{articleData.headline}</h1>
              {!isAmp ? (
                <div className="short_desc">
                  <span
                    className="read expand"
                    onClick={() => changeHeight()}
                  ></span>
                  <h3 className="full_desc_h3">{intro}</h3>
                </div>
              ) : (
                <div className="short_desc">
                  <amp-script
                    layout="container"
                    script="inline_amp"
                    className="amp-script-sample"
                    sandbox="allow-forms"
                    height="70px"
                    width="auto"
                  >
                    <span className="read expand" id="readSpan"></span>
                    <h3 className="full_desc_h3 intros">{articleData.intro}</h3>
                  </amp-script>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<script id="inline_amp" type="text/plain" target="amp-script">
                      function changeHeight(){let e=document.querySelector(".read"),a=document.querySelector(".full_desc_h3");e.c
                      lassList.contains("expand")?(a.style.height="auto",a.style.animation="auto",e.classList.remove("expand"),e.classList.add("collapsed")):(a
                      .
                      style.height="70px",e.classList.remove("collapsed"),e.classList.add("expand"))}let
                       readSpan=document.getElementById("readSpan");rea
                      dSpan.addEventListener("click",changeHeight);</script>`,
                    }}
                  ></div>
                </div>
              )}
              <ul className="txt12 mvdtl2 forrcp">
                <li>
                  <span>प्रेप टाइम </span>
                  {recipe_prep_time} min
                </li>
                <li>
                  <span>कुकिंग टाइम </span>
                  {recipe_cook_time} min
                </li>
                <li>
                  <span>सर्विंग</span>
                  {recipe_serving_people} लोग
                </li>
                <li>
                  <span>कैलोरीज</span>
                  {recipe_calorie}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        .rcp-rtng {
          background: #efefef;
          padding: 20px;
          float: left;
          width: 100%;
          box-sizing: border-box;
          margin-top: 10px;
        }
        .rcp-rt-l {
          width: 35%;
          float: left;
          position: relative;
        }
        .rcp-rt-l img {
          width: 100%;
          border: 1px solid #a5a5a5;
          box-sizing: border-box;
        }
        .rcp-rtng-rgt {
          width: 62%;
          float: right;
          position: relative;
          margin-top: -15px;
        }
        .rcp-rtng-rgt h1,
        .rcp-rtng-rgt h2 {
          font-size: 26px;
          line-height: 30px;
          color: #000000;
          margin-bottom: 15px;
        }
        .rcp-rt-s span {
          width: 20px;
          height: 20px;
          float: left;
          margin-right: 5px;
        }
        .rcpstar-sprite {
          background: url(https://images.news18.com/ibnkhabar/uploads/assests/img/rcpsprite.png)
            no-repeat 0px 0px;
          display: block;
        }
        .rcpstar {
          background-position: -40px 0px;
        }
        .rcpstar-half {
          background-position: -19px 0px;
        }
        .rcpstar-full {
          background-position: 0px 0px;
        }
        .rcp-cktm {
          color: #606060;
          font-size: 16px;
          padding: 0 10px 0 15px;
          position: relative;
          top: -2px;
        }
        .rcp-cktm span {
          width: 13px;
          height: 13px;
          border: 1px solid #7c7c7c;
          border-radius: 100%;
          display: inline-block;
          margin-right: 8px;
          position: relative;
          top: 2px;
        }
        .rcp-cktm span:before {
          content: "";
          position: absolute;
          display: block;
          top: 1px;
          left: 1px;
          width: 6px;
          height: 6px;
          border-right: 1px solid #8a8a8a;
          border-bottom: 1px solid #8a8a8a;
        }
        .rcp-off {
          width: 18px;
          height: 18px;
          border: 1px solid #00923f;
          background: #fff;
          display: flex;
        }
        .rcp-off:before {
          content: "";
          margin: auto;
          width: 10px;
          height: 10px;
          background: #00923f;
          display: block;
          border-radius: 100%;
        }
        .rcp-on {
          width: 18px;
          height: 18px;
          border: 1px solid #630404;
          background: #fff;
          display: flex;
        }
        .rcp-on:before {
          content: "";
          margin: auto;
          width: 10px;
          height: 10px;
          background: #630404;
          display: block;
          border-radius: 100%;
        }
        .rcpdtl {
          display: flex;
          padding: 15px 0 20px 0;
        }
        .rcpdtl li {
          padding: 0 20px;
          border-left: 1px solid #b7b7b7;
          font-size: 14px;
          color: #000000;
          font-weight: bold;
          width: 100%;
        }
        .rcpdtl li span {
          display: block;
          font-size: 16px;
          color: #4f4f4f;
          font-weight: normal;
        }
        .rcpdtl li:first-child {
          padding-left: 0px;
          border: none;
        }
        .rcpshr img {
          margin-right: 20px;
          float: left;
        }
        .rcpmdladd {
          text-align: center;
        }
        .fleft {
          float: left;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .rcp-rt-st {
          color: #000000;
          font-size: 14px;
          padding-left: 5px;
        }
        .rcp-rtng-rgt h1,
        .rcp-rtng-rgt h2 {
          font-size: 26px;
          line-height: 30px;
          color: #000;
          margin: 15px 0;
        }
        .recipe-newbyeline {
          border-bottom: 1px dashed #939393;
          border-top: 1px dashed #939393;
        }
        .recipe-newbyeline .newbyeline-agency {
          margin: 0;
          border-top: none;
          border-bottom: none;
        }
        .newbyeline-share-rcp {
          padding: 12px 0;
          display: flex;
          align-items: center;
          order: 2;
        }
        .newbyeline-author-intro a {
          color: #949494;
        }
        .newbyeline-author-intro a span {
          color: #e1261c;
        }
        .newbyeline-author li {
          font-size: 13px;
          color: #949494;
          font-weight: bold;
          margin-top: 8px;
          display: flex;
          align-items: center;
        }
        .newbyeline-author {
          padding: 0 10px;
          order: 3;
        }
        .newbyeline-author img {
          width: auto;
        }
        .newbyeline-author li img {
          margin-right: 8px;
        }
        .newbyeline-share-rcp li {
          color: #6b6b6b;
          font-size: 14px;
          margin-left: 10px;
          text-transform: uppercase;
          line-height: 0;
        }
        .newbyeline-share-rcp li:first-child {
          margin-left: 0;
        }
        .rcpstar-half {
          background-position: -19px 0px;
        }
        .rcpstar-full {
          background-position: 0px 0px;
        }
        .rcprtngl.forrcpmpn {
          padding-bottom: 0;
          display: flex;
          justify-content: space-between;
        }
        .cnsmpn-hd {
          font-size: 22px;
          color: #303030;
          line-height: 30px;
          font-weight: 700;
          margin: 8px 0;
        }
        .mvdtl2 {
          color: #828282;
          display: flex;
          padding: 4px 0 0;
          font-size: 12px;
        }
        .mvdtl2 li span {
          color: #4f4f4f;
          font-weight: 700;
          width: 100%;
        }
        .mvdtl2 li:last-child {
          border: none;
          padding: 0 0 0 24px;
        }
        .mvdtl2.forrcp li:first-child {
          padding: 0 12px 0 0;
        }
        .mvdtl2 li {
          border-right: 1px solid silver;
          display: flex;
          flex-wrap: wrap;
          padding: 0 12px;
        }
        .rcprtngl.forrcpmpn .rcptg {
          display: block;
          font-weight: 700;
          position: relative;
          padding: 1px 8px 0 0;
          background: 0 0;
          font-size: 16px;
          line-height: 22px;
          color: #373737;
          height: auto;
          top: 0;
          border-radius: 0;
          margin-right: 0;
        }
        .f1 {
          display: flex;
          align-items: center;
        }
        .starsprite.rcpcnsmpnlg {
          background-position: 0px -134px;
        }
        .starsprite.rcpcnsmpnlg-half {
          background-position: -18px -134px;
        }
        .starsprite {
          background: url(https://images.news18.com/ibnkhabar/uploads/assests/pwa/images/star-sprite.png)
            no-repeat;
          display: block;
          width: 17px;
          height: 17px;
          display: inline-block;
          margin-right: 2px;
          background-position: -34px -134px;
        }
        .rcprtngl.forrcpmpn .rcp-rgt {
          color: #606060;
        }
        .rcprtngl .rcp-rgt,
        .rcprtngl .rcptg {
          font-size: 12px;
          color: #fff;
        }
        .rcprtngl .rcp-rgt span {
          margin-left: 8px;
        }
        .wtchicon-grey:before,
        .rcprtngl .rcprtng-str .star-pnts {
          color: #fff;
          font-size: 12px;
          position: relative;
          margin: 4px 8px;
        }
        .rcprtngl.forrcpmpn .star-pnts {
          color: #606060;
          margin: 4px;
          font-weight: 700;
        }
        .artcl_contents_img {
          ${!isAmp ? "width: 100% !important;" : ""}
        }
        .artcl_contents_img img {
          ${!isAmp ? "width: 100% !important;" : ""}
          max-width: 100%;
          margin: 0px auto;
          height: auto;
        }
        .artclbyeline-agency {
          ${!isAmp ? "border: none !important;" : ""}
        }
        .artcl_contents {
          ${!isAmp ? "padding: 0 !important;" : ""}
          ${!isAmp ? "background: #efefef !important;" : ""}
        }

        .for-whatsapp svg {
          filter: brightness(0) invert(1);
          ${!isAmp ? "height: 40px !important;" : ""}
          ${!isAmp ? "width: 40px !important;" : ""}
        }
        .for_mail svg#Layer_111 {
          ${!isAmp ? "height: 20px !important;" : ""}
          ${!isAmp ? "width: 20px !important;" : ""}
          filter: brightness(0) invert(1);
        }
      `}</style>
    </>
  );
}
