import LazyImage from "components/Common/CustomImage";

const LatestNews = ({ asianGamesBottomNews = [] }) => {
  if (!asianGamesBottomNews.length) return null;

  return (
    <>
      <div className="latest-news">
        <h2 className="page_title">
          ताज़ा <span>समाचार</span>
        </h2>
        <ul className="latest_news_list">
          {asianGamesBottomNews.map((data) => (
            <li key={data.story_id}>
              <a href={data?.weburl_r || ""}>
                <figure>
                  <LazyImage
                    src={data?.images?.url || ""}
                    alt={data.headline}
                    title={data.headline}
                    width={207}
                    height={138}
                  />
                  <figcaption>
                    <h3 className="latestnewws_title">{data.headline}</h3>
                  </figcaption>
                </figure>
              </a>
            </li>
          ))}
        </ul>
        <div className="load_more">
          <a href="/tag/asian-games/news/">और पढ़े</a>
        </div>
      </div>
      <style jsx>{`
        // Latest News
        .latest_news_list {
          display: grid;
          grid-template-columns: 216px 216px 216px 216px;
          flex-wrap: wrap;
          justify-content: space-between;
          row-gap: 20px;
          margin-bottom: 20px;
        }
        .latest_news_list li {
          background: #f5f5f5;
        }
        .latestnewws_title {
          font-size: 14px;
          color: #292929;
          line-height: 20px;
          font-weight: normal;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        ul.latest_news_list li a {
          color: #292929;
        }
        .latest_news_list li figcaption {
          padding: 10px;
        }
        .latest_news_list li figure img {
          width: 100%;
          display: block;
        }
        .latest-news {
          margin-top: 30px;
        }
      `}</style>
    </>
  );
};

export default LatestNews;
