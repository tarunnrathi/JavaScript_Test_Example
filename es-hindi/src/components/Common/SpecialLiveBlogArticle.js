import Head from "next/head";
import React from "react";
import { logEvent } from "includes/googleAnalytic";

const SpecialLiveBlogArticle = ({ blogContent }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="LB_wrap">
        <div className="LB_cta">{blogContent?.live_blog_text}</div>
        <a
          href={blogContent?.story_url}
          onClick={() => {
            logEvent("Article_Topspecial", "Click", blogContent?.story_url);
          }}
        >
          <h3>{blogContent?.story_title}</h3>
        </a>
      </div>
      <style jsx global>{`
        body {
          font-family: "Fira Sans", sans-serif !important;
        }
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
        .LB_wrap {
          background-color: #0f203f;
          border-radius: 21px;
          display: flex;
          padding: 8px;
          color: #fff;
        }
        .LB_cta {
          font-weight: bold;
          height: 26px;
          border-radius: 13px;
          background-color: #e30f01;
          font-size: 12px;
          line-height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          position: relative;
          padding: 0 14px;
        }
        .LB_wrap h3 {
          font-size: 17px;
          line-height: 25px;
          font-weight: normal;
          color: antiquewhite;
        }
        .LB_cta:before {
          width: 8px;
          height: 8px;
          position: absolute;
          left: 4px;
          top: 9px;
          background: #ffffff;
          border-radius: 100px;
          content: "";
          animation-name: mymove;
          animation-duration: 1s;
          animation-iteration-count: infinite;
        }
        @keyframes mymove {
          0% {
            background: #e1261c;
          }
          50% {
            background: #fff;
          }
          100% {
            background: #e1261c;
          }
        }
        .LB_wrap h3::-webkit-scrollbar {
          height: 3px;
        }
        .LB_wrap h3::-webkit-scrollbar-track {
          background: transparent;
        }
        .LB_wrap h3::-webkit-scrollbar-thumb {
          background-color: #939393;
          border-radius: 20px;
        }
        @media (max-width: 768px) {
          .LB_wrap {
            border-radius: 0;
          }
          .LB_cta {
            border-radius: 2px;
            font-size: 11px;
            line-height: 13px;
            padding: 0 3px 0 16px;
            width: min-content;
            white-space: nowrap;
          }
          .LB_cta:before {
            left: 3px;
          }
          .LB_wrap h3 {
            font-size: 14px;
            overflow: auto;
            white-space: nowrap;
          }
        }
      `}</style>
    </>
  );
};
export default SpecialLiveBlogArticle;
