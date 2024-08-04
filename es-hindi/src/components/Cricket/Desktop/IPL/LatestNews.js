import LazyImage from "components/Common/LazyImage";
import React from "react";
const LatestNews = ({ latestNewsData }) => {
  return (
    <>
      <div className="CN-sec-l">
        <h3 className="ipl_headin_g">
          ताजा <span>खबरें</span>
        </h3>
        <ul className="CN-latestStory-widget">
          {latestNewsData.map((news) => (
            <li key={news.id}>
              <a href={news.weburl_r}>
                <div className="image-box">
                  <LazyImage
                    src={news.images?.url}
                    data-src={news.images?.url}
                    alt={news.display_headline}
                    className=""
                    loading="lazy"
                    width="215"
                    height="140"
                  />
                </div>
                <p>{news.display_headline}</p>
              </a>
            </li>
          ))}
        </ul>
        <a href="/cricket/ipl/news/" className="cn-morebtn1">
          और ताजा खबरें
        </a>
      </div>
      <style jsx global>{`
        .CN-section {
          display: flex;
          justify-content: space-between;
        }
        .cn-mb-40 {
          margin-bottom: 40px;
        }
        .CN-section .CN-sec-l {
          width: 924px;
        }
        .CN-latestStory-widget {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          border-bottom: 1px solid #dadada;
        }
        .CN-latestStory-widget li a .image-box img {
          display: block;
          width: 100%;
        }
        .CN-latestStory-widget li a p {
          font-size: 14px;
          line-height: 20px;
          margin: 0;
          color: #292929;
          padding: 8px;
          background: #f5f5f5;
          box-sizing: border-box;
        }
        .CN-latestStory-widget li {
          width: 24%;
          margin-bottom: 20px;
        }
        .CN-latestStory-widget li a {
          display: block;
        }
        .CN-latestStory-widget li a figure {
          overflow: hidden;
        }
        .cn-morebtn1 {
          background: #f5f5f5;
          display: block;
          text-align: center;
          font-size: 12px;
          line-height: 12px;
          text-transform: uppercase;
          color: #ff0000;
          padding: 11px 0;
        }
      `}</style>
    </>
  );
};
export default LatestNews;