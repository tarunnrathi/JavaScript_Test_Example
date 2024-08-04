import React from "react";
import LazyImage from "components/Common/CustomImage";

const LatestNews = ({ asianGamesBottomNews }) => {
  return (
    <>
      <div className="latest-news">
        <h2 className="pwa_page_title">ताज़ा समाचार </h2>
        <ul className="story_list">
          {asianGamesBottomNews.map((item) => {
            return (
              <li key={`asian-games-lnews${item.story_id}`}>
                <a href={item?.weburl_r || ""}>
                  <h3 className="story_list_title">{item.headline}</h3>
                  <figure>
                    <LazyImage
                      src={item?.images?.url || ""}
                      alt={item.headline}
                      title={item.headline}
                      height={63}
                      width={100}
                    />
                  </figure>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="load_more">
          <a href="/tag/asian-games/news/">
            <span>और पढ़े</span>
          </a>
        </div>
      </div>
      <style jsx global>{`
        .pwa_page_title {
          height: 36px;
          background: #ed2128 0% 0% no-repeat padding-box;
          color: #ffffff;
          text-transform: uppercase;
          font-size: 18px;
          line-height: 37px;
          font-weight: 600;
          padding: 0 10px;
        }
        ul.story_list li a {
          display: flex;
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
          letter-spacing: -0.28px;
          color: #001d42;
        }
        ul.story_list li {
          background: #f5f5f5;
          margin-bottom: 5px;
          padding: 10px;
        }
        ul.story_list {
          padding-top: 5px;
          background: #fff;
        }
        ul.story_list figure img {
          width: 110px;
          height: 73px;
          display: block;
        }
        ul.story_list li figure {
          order: 2;
        }
        .story_list_title {
          width: calc(100% - 110px);
          letter-spacing: -0.28px;
          color: #001d42;
          font-size: 14px;
          line-height: 18px;
          font-weight: 600;
          padding-right: 10px;
        }
      `}</style>
    </>
  );
};
export default LatestNews;
