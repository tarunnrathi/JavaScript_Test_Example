// TopKhabare.js
import React, { useEffect, useState } from "react";
import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();
// import fetchUtility from "includes/sFetchUtility";

const TopKhabare = ({ global_keyword, newsData }) => {
  let topRecord = [];
  let categoryBoxRecord = [];
  let categoryBoxBottomRecord = [];
  topRecord = newsData.slice(0, 1);
  categoryBoxRecord = newsData.slice(1, 3);
  categoryBoxBottomRecord = newsData.slice(3, 8);

  return (
    <>
      <div className="related_news_sec">
        <h2>टॉप ख़बरें</h2>
        <div className="rltd_nws dflex justify-space-between flex-wrap">
          <div className="rltd_left">
            <div className="trending_subLft_sec">
              {topRecord.map((listNews, key) => (
                <a href={listNews.url}>
                  <figure className="tranding_nws_main_img">
                    <img
                      src={listNews.thumbnail}
                      title={listNews.title}
                      className="fader"
                    />
                    <p>{listNews.title}</p>
                  </figure>
                </a>
              ))}

              <div className="topics">
                <ul className="topics_stories dflex justify-space-between flex-wrap">
                  {categoryBoxRecord.map((listNews, key) => (
                    <li>
                      {" "}
                      <a href={listNews.url} className="clearfix">
                        {" "}
                        <span className="imgs">
                          <img
                            src={listNews.thumbnail}
                            alt={listNews.title}
                            title={listNews.title}
                            className="fader"
                          />
                        </span>{" "}
                        <span className="text_container">
                          {" "}
                          <span className="contnts">{listNews.title}</span>{" "}
                        </span>{" "}
                      </a>{" "}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="rltd_right">
            <ul className="related_stories">
              {categoryBoxBottomRecord.map((listNews, key) => (
                <li>
                  {" "}
                  <a href={listNews.url} className="clearfix">
                    {" "}
                    <span className="imgs">
                      <img
                        src={listNews.thumbnail}
                        alt={listNews.title}
                        className="fader"
                      />
                    </span>{" "}
                    <span className="text_container">
                      {" "}
                      <span className="contnts">{listNews.title}</span>{" "}
                    </span>{" "}
                  </a>{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a href="/tag/board-results/" className="read_more" target="_blank">
          और पढ़ें
          <div className="arrows"></div>
        </a>
      </div>
      <style jsx global>{`
        .related_news_sec h2 {
          font-size: 26px;
          line-height: 36px;
          font-weight: 600;
          color: #eb3d3c;
        }
        .related_news_sec .rltd_nws {
          border-bottom: 1px solid #ddd;
          margin-top: 10px;
        }
        .related_news_sec .rltd_nws .rltd_left {
          width: 600px;
        }
        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .tranding_nws_main_img {
          position: relative;
          width: 100%;
          max-height: 310px;
          border-radius: 10px;
          overflow: hidden;
        }
        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .tranding_nws_main_img
          img {
          display: block;
          width: 600px;
          height: 400px;
        }
        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .tranding_nws_main_img
          p {
          position: absolute;
          right: 0;
          bottom: 0;
          background-color: #fff;
          color: #000218;
          font-size: 22px;
          line-height: 30px;
          width: 90%;
          padding: 10px;
          box-sizing: border-box;
          border-radius: 10px 0 0 0;
          height: 70px;
          overflow: hidden;
          font-weight: 700;
        }
        .related_news_sec .rltd_nws .rltd_left .trending_subLft_sec .topics {
          margin-top: 30px;
        }
        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .topics
          .topics_stories {
          padding: 0 6px;
          box-sizing: border-box;
        }
        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .topics
          .topics_stories
          li {
          width: 48%;
          margin-bottom: 20px;
          padding: 10px 5px;
          box-sizing: border-box;
          border-radius: 10px;
        }
        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .topics
          .topics_stories
          li
          a
          .imgs {
          width: 100px;
          border-radius: 5px;
          overflow: hidden;
          height: auto;
          float: left;
        }
        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .topics
          .topics_stories
          li
          a
          .imgs
          img {
          width: 100px;
          height: 67px;
          display: inline-block;
          transition: transform 0.3s;
          border-radius: 10px;
        }
        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .topics
          .topics_stories
          li
          a
          .text_container {
          float: right;
          width: calc(100% - 110px);
          box-sizing: border-box;
        }
        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .topics
          .topics_stories
          li
          a
          .text_container
          .contnts {
          font-size: 14px;
          line-height: 22px;
          color: #000218;
          display: block;
          font-weight: 500;
          overflow: hidden;
          height: 66px;
        }
        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .topics
          .topics_stories
          li
          a
          .text_container
          .contnts:hover {
          color: #eb3d3c;
        }
        .related_news_sec .rltd_nws .rltd_right {
          width: 320px;
        }
        .related_news_sec .rltd_nws .rltd_right .related_stories li {
          width: 100%;
          padding: 0 10px 15px 10px;
          box-sizing: border-box;
        }
        .related_news_sec .rltd_nws .rltd_right .related_stories li a {
          display: block;
          width: inherit;
        }
        .related_news_sec .rltd_nws .rltd_right .related_stories li a .imgs {
          width: 111px;
          border-radius: 5px;
          overflow: hidden;
          height: auto;
          float: left;
        }
        .related_news_sec
          .rltd_nws
          .rltd_right
          .related_stories
          li
          a
          .imgs
          img {
          width: 110px;
          height: 74px;
          display: inline-block;
          transition: transform 0.3s;
          border-radius: 10px;
        }
        .related_news_sec
          .rltd_nws
          .rltd_right
          .related_stories
          li
          a
          .text_container {
          float: right;
          width: calc(100% - 125px);
          padding: 0 8px 0 0;
          box-sizing: border-box;
          overflow: hidden;
          height: 67px;
        }
        .related_news_sec
          .rltd_nws
          .rltd_right
          .related_stories
          li
          a
          .text_container
          .contnts {
          font-size: 14px;
          line-height: 22px;
          color: #000218;
          display: block;
          overflow: hidden;
          font-weight: 500;
        }
        .related_news_sec
          .rltd_nws
          .rltd_right
          .related_stories
          li
          a
          .text_container
          .contnts:hover {
          color: #eb3d3c;
        }
        .videos_sec {
          width: 100%;
          margin: 20px auto 30px;
          padding: 10px;
          box-sizing: border-box;
        }

        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .topics
          .topics_stories
          li
          a
          .imgs {
          width: 100px;
          border-radius: 5px;
          overflow: hidden;
          height: auto;
          float: left;
        }

        .related_news_sec
          .rltd_nws
          .rltd_left
          .trending_subLft_sec
          .topics
          .topics_stories
          li
          a
          .text_container {
          float: right;
          width: calc(100% - 110px);
          box-sizing: border-box;
        }

        @media (max-width: 767px) {
          .related_news_sec {
            margin: 0 0 10px;
          }

          .related_news_sec
            .rltd_nws
            .rltd_left
            .trending_subLft_sec
            .tranding_nws_main_img
            img {
            width: 100%;
          }
          .related_news_sec
            .rltd_nws
            .rltd_left
            .trending_subLft_sec
            .tranding_nws_main_img {
            max-height: inherit;
          }

          .related_news_sec .rltd_nws .rltd_left {
            width: 100%;
          }

          .related_news_sec .rltd_nws {
            border-bottom: 0 solid #ddd;
          }

          .related_news_sec h2 {
            font-size: 20px;
            padding-top: 15px;
            line-height: 20px;
          }

          .related_news_sec .rltd_nws .rltd_left .trending_subLft_sec .topics {
            margin-top: 10px;
          }

          .related_news_sec
            .rltd_nws
            .rltd_left
            .trending_subLft_sec
            .topics
            .topics_stories {
            padding: 0;
          }

          .related_news_sec
            .rltd_nws
            .rltd_left
            .trending_subLft_sec
            .topics
            .topics_stories
            li
            a
            .imgs {
            width: 111px;
          }
          .related_news_sec
            .rltd_nws
            .rltd_left
            .trending_subLft_sec
            .topics
            .topics_stories
            li {
            width: 100%;
            padding: 0;
          }
          .related_news_sec
            .rltd_nws
            .rltd_left
            .trending_subLft_sec
            .topics
            .topics_stories
            li {
            margin-bottom: 10px;
          }
          .related_news_sec
            .rltd_nws
            .rltd_left
            .trending_subLft_sec
            .topics
            .topics_stories
            li
            a
            .text_container {
            width: calc(100% - 125px);
          }

          .related_news_sec .rltd_nws .rltd_right {
            width: 100%;
          }

          .related_news_sec .rltd_nws .rltd_right .related_stories li {
            padding: 0 0 10px;
            box-sizing: border-box;
          }
        }
      `}</style>
    </>
  );
};

export default TopKhabare;
