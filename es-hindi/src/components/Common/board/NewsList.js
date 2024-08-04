// BoardList.js

import React, { useEffect, useState } from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import fetchUtility from "includes/sFetchUtility";

const NewsList = ({
  listItem,
  board_page = false,
  global_keyword = false,
  global_keyword2 = false,
}) => {
  const [NewsData, setNewsData] = useState([]);
  const [Start, setStart] = useState(0);
  const [Limit, setLimit] = board_page ? useState(15) : useState(6);

  const topic = board_page
    ? global_keyword.replace(/[^\w\d\s-]/gim, "")
    : listItem.tag.replace(/[^\w\d\s-]/gim, "");
  const topic2 = board_page
    ? global_keyword2.replace(/[^\w\d\s-]/gim, "")
    : listItem.tag.replace(/[^\w\d\s-]/gim, "");

  const query_arr = board_page
    ? `(tag_topic:("${topic}")%20OR%20tag_topic:("${topic2}"))%20AND%20flag:1`
    : `(tag_topic:("${topic}")%20OR%20sslugs:("${topic}"))%20AND%20flag:1`;

  const cache_key = board_page
    ? "tag_topic_" + global_keyword
    : "tag_topic_" + listItem.tag;
  const getData = async () => {
    const newsData = await []
    if (newsData && newsData.length) {
      setNewsData(newsData);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let topRecord = [];
  let categoryBoxRecord = [];
  topRecord = NewsData.slice(0, 2);
  categoryBoxRecord = NewsData.slice(2, 6);

  return NewsData.length>0 ? (
    <>
      <div className="career_sec">
        {board_page ? (
          <h2 className="brdrslthd">{global_keyword} News</h2>
        ) : (
          <h2>
            <a href={`/tag${listItem.tag_url}`} target="/blank">
              {listItem.display_name}{" "}
            </a>
          </h2>
        )}

        {board_page ? (
          <ul className="brdrsltnwslist">
            {NewsData.map((listNews, key) => (
              <li>
                <a href={listNews.url}>
                  <figure>
                    <img
                      src={listNews.thumbnail}
                      alt={listNews.title}
                      title={listNews.title}
                      className="fader"
                    />
                  </figure>
                  <p>{listNews.title}</p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="careers dflex justify-space-between">
            <div className="career_right">
              <ul className="dflex justify-space-between flex-wrap">
                {topRecord.map((listNews, key) => (
                  <li>
                    <a href={listNews.url} target="_blank">
                      <figure>
                        {" "}
                        <img
                          src={listNews.thumbnail}
                          alt={listNews.title}
                          title={listNews.title}
                          className="fader"
                        />{" "}
                      </figure>
                      <h3>{listNews.title}</h3>
                      <p>{listNews.title}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="career_lft">
              <div className="career_rightAdds">
                <ul className="all_n_ews">
                  {categoryBoxRecord.map((listNews, key) => (
                    <li>
                      <a href={listNews.url} target="_blank" className="dflex">
                        <div className="statements">
                          <p>{listNews.title}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {board_page ? (
          <a
            href={`/tag/${global_keyword.toLowerCase().replace(/\s/g, "-")}/`}
            target="_blank"
            className="read_more"
          >
            और पढ़ें<div className="arrows"></div>
          </a>
        ) : (
          <a
            href={`/tag${listItem.tag_url}`}
            target="_blank"
            className="read_more"
          >
            और पढ़ें<div className="arrows"></div>
          </a>
        )}
        {/* loop end */}
      </div>
      <style jsx global>{`
        .career_sec {
          padding-bottom: 40px;
        }
        .career_sec h2 a {
          color: #eb3d3c;
          font-size: 26px;
          line-height: 36px;
          font-weight: 600;
          flex-shrink: 0;
          margin-bottom: 5px;
          margin-right: 20px;
          display: block;
        }
        .careers {
          border-bottom: 1px solid #ddd;
          margin-bottom: 20px;
          padding-bottom: 15px;
          box-sizing: border-box;
        }
        .careers .career_right {
          width: calc(100% - 315px);
        }
        .flex-wrap {
          flex-wrap: wrap;
        }
        .justify-space-between {
          justify-content: space-between;
        }
        .dflex {
          display: flex;
        }
        .careers .career_right ul li {
          width: 49%;
        }
        .careers .career_right ul li figure {
          width: 100%;
          display: block;
          border-radius: 5px;
          overflow: hidden;
        }
        .careers .career_right ul li figure img {
          width: 300px;
          height: 200px;
          display: block;
        }
        .careers .career_right ul li h3 {
          font-size: 20px;
          line-height: 25px;
          font-weight: 500;
          color: #000218;
          margin: 15px auto 5px;
          overflow: hidden;
          height: 47px;
        }
        .careers .career_right ul li p {
          font-size: 13px;
          line-height: 21px;
          font-weight: 400;
          color: #999;
        }
        .careers .career_lft {
          width: 300px;
        }
        .careers .career_lft .career_rightAdds .all_n_ews li {
          margin-bottom: 10px;
          border-bottom: 1px dotted #ccc;
          padding: 0 10px 10px 0;
          box-sizing: border-box;
        }
        .careers .career_lft .career_rightAdds .all_n_ews li a .statements p {
          font-size: 15px;
          line-height: 24px;
          font-weight: 400;
          color: #000;
        }

        .brdrsltnwslist {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .brdrsltnwslist li {
          border-bottom: 1px dashed #707070;
          margin-bottom: 20px;
          padding-bottom: 20px;
          width: 32%;
        }
        .brdrsltnwslist li a figure {
          position: relative;
          line-height: 0;
          margin-bottom: 15px;
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          height: 164px;
        }
        .brdrsltnwslist li a p {
          color: #000218;
          font-size: 20px;
          line-height: 25px;
        }
        .brdrsltnwslist li a figure img {
          width: 100%;
          height: 164px;
        }
        @media screen and (max-width: 720px) {
          .careers {
            padding: 0;
          }
          .careers .career_right ul {
            flex-direction: inherit !important;
            flex-wrap: nowrap;
            marging-bottom: 15px;
          }
          .careers .career_right ul li {
            width: 48%;
          }

          .brdrsltnwslist li {
            width: 48%;
          }

          .careers .career_lft, .careers .career_right{
            width:100%;
          }

          .careers .career_right ul li figure img {
            width: 100%;
            height: 110px;
          }


        }


        .all-news li a .statements p:hover {
          color: #eb3d3c;
        }
        .careers .career_lft .career_rightAdds .all_n_ews li:last-child {
          border: none;
        }
      `}</style>
    </>
  ) :'';
};

export default NewsList;
