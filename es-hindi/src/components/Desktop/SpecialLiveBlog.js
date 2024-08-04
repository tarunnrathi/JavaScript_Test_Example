import Head from "next/head";
import React from "react";
import LazyLoadImage from "components/Common/CustomImage";
import { logEvent } from "includes/googleAnalytic";
const SpecialLiveBlog = ({ blogContent }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="LU_wrap">
        <a
          href={blogContent?.story_url}
          className="left_col"
          onClick={() => {
            logEvent("Home_Topspecial", "Click", "liveblog");
          }}
        >
          <div className="live_txt">{blogContent?.live_blog_text}</div>
          <h1 className="LU_ttl">
            {(blogContent?.story_title).substring(0, 100)}
          </h1>
          <h2 className="LU_desc">
            {(blogContent?.story_exceprt).substring(0, 200)}
          </h2>
        </a>
        <a
          href={blogContent?.story_url}
          className="right_col"
          onClick={() => {
            logEvent("Home_Topspecial", "Click", "liveblog");
          }}
        >
          <LazyLoadImage
            src={blogContent?.story_image}
            width={536}
            height={357}
            isLazyLoad={true}
          />
        </a>
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
           <span> {(blogContent?.story_title1).substring(0, 100)}</span>
          </a>
          <a
            href={blogContent?.story_url2}
            className="oth_story"
            onClick={() => {
              logEvent("Home_Topspecial", "Click", "story2");
            }}
          >
            {/* <div className="no">2</div> */}
           <span> {(blogContent?.story_title2).substring(0, 100)}</span>
          </a>
          <a
            href={blogContent?.story_url3}
            className="oth_story"
            onClick={() => {
              logEvent("Home_Topspecial", "Click", "story3");
            }}
          >
            {/* <div className="no">3</div> */}
            <span>{(blogContent?.story_title3).substring(0, 100)}</span>
          </a>
        </div>
      </div>
      <style jsx global>{`        
        
        article,
        aside,
        div,
        figure,
        form,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        li,
        p,
        section,
        ul {
          margin: 0;
          padding: 0;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        a,
        a:hover {
          text-decoration: none;
        }
        @import url("https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@1,300&display=swap");
        .LU_wrap {
          background: #011633;
          margin-bottom: 20px;
          padding: 20px;
          display: flex;
          flex-wrap: wrap;
        }
        .LU_wrap .left_col,
        .LU_wrap .right_col {
          flex: 1;
          margin-bottom: 20px;
        }
        .LU_wrap .right_col {
          width: 536px;
          text-align: center;
          height: 357px;
        }
        .LU_wrap .right_col img {
          vertical-align: top;
          width: 536px;
          display: inline-block;
          height: 100%;
        }
        .full_width {
          width: 100%;
          display: flex;
          background: #ED1C25 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 2px;
        }
        .live_txt {
          padding: 0 5px;
          height: 26px;
          background: #e30f01;
          -webkit-border-radius: 0 4px 4px 0;
          -moz-border-radius: 0 4px 4px 0;
          border-radius: 0 4px 4px 0;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 13px;
          line-height: 15px;
          color: #fff;
          text-transform: uppercase;
          margin: 0 0 0 -20px
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
          color: #FFFFFF;
          margin: 20px 0 15px 0;
          font-size: 32px;
          line-height: 40px;
          font-weight: bold;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
        .LU_desc {
          font-weight: normal;
          font-size: 13px;
          line-height: 21px;
          color: #FFFFFF;
          // overflow: hidden;
          // display: -webkit-box;
          // -webkit-line-clamp: 3;
          // -webkit-box-orient: vertical;
          // margin: 0 0 0 10px;
        }
        .oth_story {
          display: flex;
          height: 75px;
          align-items: center;
          overflow: hidden;
          color: #fff;
          border-radius: 2px;
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
          width: 34%;
          padding: 3px 20px;
          position: relative;
        }
        a.oth_story:hover {color: #fff;}            
        .oth_story:after {background-color: #93090F; content: "";  width: 1px; height: 80%;height: 55%; position: absolute; right: 0;  top: 0; bottom: 0;  margin: auto;}
        .oth_story:last-child:after {display: none;}
        .LU_wrap .left_col {margin: 0 20px 0 0;}
        // .oth_story span {overflow: hidden; display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;}
      `}</style>
    </>
  );
};
export default SpecialLiveBlog;
