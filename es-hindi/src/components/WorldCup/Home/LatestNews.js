import LazyLoadImage from "components/Common/CustomImage";
import { imageLoader } from 'includes/article.util';

const LatestNews = ({ isAmp = false, latestStories }) => {
  return (
    <>
      <div className="latest-news vspacer20">
        <h2 className="page_title">
          ताजा <span> खबरें</span>
        </h2>
        <ul className="latest_news_list">
          {latestStories?.map((news) => {
            let src = imageLoader(news?.images?.url, 212, 150, false);
            return (
            <li>
              <a href={`${news?.weburl_r}`}>
                <figure>
                  <LazyLoadImage
                    isAMP={isAmp}
                    src={src}
                    height={150}
                    width={212}
                    alt={`${news?.display_headline}`}
                    title={`${news?.display_headline}`}
                  />
                  <figcaption>
                    <h3 className="latestnewws_title">
                      {news?.display_headline}
                    </h3>
                  </figcaption>
                </figure>
              </a>
            </li>
          )})}
        </ul>
        <div className="load_more">
          <a href="/world-cup/news/">
            <span>और ताजा खबरें</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default LatestNews;
