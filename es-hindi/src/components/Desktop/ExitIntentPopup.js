import { getTopNews } from "api/individual/Home";
import LazyLoadImage from "components/Common/CustomImage";
import React, { useEffect, useState } from "react";

export default function ExitIntentPopup({ setExitIntendPopUpOpen }) {
  const [priorityNews, setPriorityNews] = useState([]);
  useEffect(() => {
    getTopNews(12, "story_id,images,headline,weburl_r").then((news) => {
      setPriorityNews(news.stories);
    });
  }, []);

  if (!priorityNews?.length) return null;

  return (
    <>
      <div id="openModal" className="modalDialog">
        <div>
          <div className="ext_header">
            <div className="ext_heading_1" style={{ color: "rgb(6, 6, 6)" }}>
              जाने से पहले पढ़ें और कहानियाँ..
            </div>
            <a
              onClick={setExitIntendPopUpOpen}
              title="Close"
              id="exit_intent_popup"
              className="close exit_intent"
            >
              X
            </a>
          </div>
          <div className="ext_contnt">
            <div className="extlhs">
              <ul className="extfocus">
                {priorityNews.slice(0, 2).map((news) => (
                  <li key={news.story_id} className="exit_intent">
                    <a href={news.weburl_r} className="exit_intent">
                      <figure>
                        <LazyLoadImage
                          src={news.images.url}
                          height={221}
                          width={331}
                          isLazyLoad={true}
                        />
                      </figure>
                      <h3 className="extfocus_title">{news.headline}</h3>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="extmddl">
              <ul className="extfocus">
                {priorityNews.slice(2, 7).map((news) => (
                  <li key={news.story_id} className="exit_intent">
                    <a href={news.weburl_r} className="exit_intent">
                      <figure>
                        {/* <img src="https://images.news18.com/ibnlive/uploads/2022/06/sports-101-16561770933x2.png?impolicy=website&width=331&height=221" /> */}
                        <LazyLoadImage
                          src={news.images.url}
                          height={75}
                          width={100}
                          isLazyLoad={true}
                        />
                      </figure>
                      <h3 className="extfocus_title">{news.headline}</h3>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="extrhs">
              <ul className="extfocus">
                {priorityNews.slice(7).map((news) => (
                  <li key={news.story_id} className="exit_intent">
                    <a href={news.weburl_r} className="exit_intent">
                      <figure>
                        <LazyLoadImage
                          src={news.images.url}
                          height={75}
                          width={100}
                          isLazyLoad={true}
                        />
                      </figure>
                      <h3 className="extfocus_title">{news.headline}</h3>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .modalDialog {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.87);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2147483647;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.65);
        }
        .modalDialog > div {
          width: 960px;
          background: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 6px 15px;
          border-radius: 6px;
          border-top: 6px solid #1194ff;
        }
        .close {
          font-size: 19px;
          cursor: pointer;
          margin-inline-start: 20px;
          background: #f1f1f1;
          line-height: 30px;
          padding: 1px 9px;
          border-radius: 50px;
          color: #b2b2b2;
          text-decoration: none;
          font-weight: 700;
          width: 30px;
          height: 30px;
        }
        .ext_header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin: 5px 0 12px;
        }
        .ext_heading_1 {
          font-style: normal;
          font-weight: 800;
          font-size: 20px;
          line-height: normal;
          color: rgba(0, 0, 0, 0.87);
          width: 583px;
          word-break: break-word;
          overflow: hidden;
        }
        .extfocus li a {
          display: flex;
          color: #001d42;
        }
        .extfocus li figure img {
          width: 100px;
          height: 75px;
          display: block;
        }
        .extfocus_title {
          letter-spacing: 0;
          font-size: 16px;
          line-height: 23px;
          font-weight: 400;
          width: calc(100% - 100px);
          padding-left: 10px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          max-height: 44px;
          font-weight: 600;
          color: #272626;
        }
        .extfocus li {
          border-bottom: 1px #dadada solid;
          padding: 9px 0;
        }
        .extfocus li:first-child {
          padding-top: 0;
        }
        .extfocus li:last-child {
          border: 0;
        }
        .ext_contnt {
          display: flex;
          gap: 10px;
        }
        .extlhs .extfocus li a {
          display: flex;
          flex-direction: column;
        }
        .extlhs .extfocus li figure img {
          width: 100%;
          height: 180px;
        }
        .extlhs .extfocus li .extfocus_title {
          width: 100%;
          padding: 5px 0 0;
          max-height: 51px;
        }
      `}</style>
    </>
  );
}
