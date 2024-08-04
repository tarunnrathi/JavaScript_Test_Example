import Head from "next/head";
import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import { logEvent } from "includes/googleAnalytic";
const SpecialLiveBlogMobile = ({ blogContent }) => {
  // useEffect(() => {
  //   new Glide(document.querySelector(".sldr"), {
  //     type: "slider",
  //     perView: 1,
  //     gap: 17,
  //     autoplay: 2000,
  //     startat: 0,
  //     bound: true,
  //   }).mount();
  // }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="LU_wrap">
        <a href={blogContent?.story_url} className="left_col">
          <div className="live_txt">{blogContent?.live_blog_text}</div>
          <h1
            className="LU_ttl"
            onClick={() => {
              logEvent("Home_Topspecial", "Click", "liveblog");
            }}
          >
            {(blogContent?.story_title).substring(0, 100)}
          </h1>
          <div
            className="img_wrp"
            onClick={() => {
              logEvent("Home_Topspecial", "Click", "liveblog");
            }}
          >
            <LazyLoadImage
              src={blogContent?.story_image}
              width={360}
              height={260}
              isLazyLoad={true}
            />            
          </div>
        </a>
        {/* <div className="full_width">
          <div className="sldr">
            <div className="track" data-glide-el="track">
              <ul className="slides">
                <li className="slide">
                  <a
                    href={blogContent?.story_url1}
                    className="oth_story"
                    onClick={() => {
                      logEvent("Home_Topspecial", "Click", "story1");
                    }}
                  >
                    <div className="no">1</div>
                    {(blogContent?.story_title1).substring(0, 70)}
                  </a>
                </li>
                <li className="slide">
                  <a
                    href={blogContent?.story_url2}
                    className="oth_story"
                    onClick={() => {
                      logEvent("Home_Topspecial", "Click", "story2");
                    }}
                  >
                    <div className="no">2</div>
                    {(blogContent?.story_title2).substring(0, 70)}
                  </a>
                </li>
                <li className="slide">
                  <a
                    href={blogContent?.story_url3}
                    className="oth_story"
                    onClick={() => {
                      logEvent("Home_Topspecial", "Click", "story3");
                    }}
                  >
                    <div className="no">3</div>
                    {(blogContent?.story_title3).substring(0, 70)}
                  </a>
                </li>
              </ul>
            </div>
            <div className="bullets" data-glide-el="controls[nav]">
              <button className="bullet" data-glide-dir="=0"></button>
              <button className="bullet" data-glide-dir="=1"></button>
              <button className="bullet" data-glide-dir="=2"></button>
            </div>
          </div>
        </div> */}

        <div className="full_width">
          <a
            href={blogContent?.story_url1}
            className="oth_story"
            id="8593827"
            onClick={() => {
              logEvent("Home_Topspecial", "Click", "story1");
            }}
          >
            {/* <div className="no">1</div> */}
            <span> {(blogContent?.story_title1).substring(0, 70)}</span>
          </a>
          <a
            href={blogContent?.story_url2}
            className="oth_story"
            onClick={() => {
              logEvent("Home_Topspecial", "Click", "story2");
            }}
          >
            {/* <div className="no">2</div> */}
            <span> {(blogContent?.story_title2).substring(0, 70)}</span>
          </a>
          <a
            href={blogContent?.story_url3}
            className="oth_story"
            onClick={() => {
              logEvent("Home_Topspecial", "Click", "story3");
            }}
          >
            {/* <div className="no">3</div> */}
            <span>{(blogContent?.story_title3).substring(0, 70)}</span>
          </a>
        </div>
      </div>
      <style jsx global>{`
        .LU_wrap {
          background:  #011633;
          margin-bottom: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
        }
        .LU_wrap .left_col img {
          vertical-align: top;
          width: 100%;
        }
        .LU_wrap .img_wrp {
          background: #f0f0f0;
          text-align: center;
          margin-bottom: 8px;
        }
        .live_txt {
          padding: 6px 5px;
          height: 26px;
          background: #e30f01;
          border-radius: 0 4px 4px 0;
          position: relative;
          font-weight: bold;
          font-size: 13px;
          line-height: 15px;
          color: #fff;
          text-transform: uppercase;
          display: block;
          width: max-content;
          margin-top: 10px;
        }
        .live_txt:before {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 8px;
          background: white;
          margin-right: 5px;
          animation: blinker 1s step-start infinite;
        }
        .LU_ttl {
          text-align: left;
          color: #FFFFFF;
          margin: 20px 15px 15px;
          font-size: 32px;
          line-height: 40px;
          font-weight: bold;
          overflow: hidden; display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;
        }
        .LU_desc {
          font-weight: normal;
          font-size: 13px;
          line-height: 19px;
          color: #535353;
          margin: 0 10px 10px;
          font-family: "Recursive";
        }
        .full_width {
          width: 100%;
          background-color: #ed1c25;
          text-align: left;
          display: flex;
          flex-direction: row;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 0;
          max-height: 75px;
          padding-top: 7px;
          margin: 0;
        }
        .oth_story {
          height: 75px;
          color: #fff;
          border-radius: 2px;
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
          width: 74%;
          padding: 3px 20px;
          position: relative;
          flex: none;
        }
        a.oth_story:hover {color: #fff;}            
        .oth_story:after {background-color: #93090F; content: "";  width: 1px; height: 80%;height: 55%; position: absolute; right: 0;  top: 0; bottom: 0;  margin: auto;}
        .oth_story:last-child:after {display: none;}
        .oth_story span {overflow: hidden; display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;}
      `}</style>
    </>
  );
};
export default SpecialLiveBlogMobile;
