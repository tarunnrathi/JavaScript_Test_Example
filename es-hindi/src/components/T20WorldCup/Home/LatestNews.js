import LazyLoadImage from "components/Common/CustomImage";

const LatestNews = ({ isAmp = false, latestNewsData }) => {
  return (
    <>
      <div className="latest-news vspacer20">
        <h2 className="page_title">
          ताजा <span> खबरें</span>
        </h2>
        <ul className="latest_news_list">
          {latestNewsData?.length > 0 && latestNewsData?.map((news, index) => {
            return (
              <li key={"news" + index}>
                <a href={news?.weburl_r}>
                  <figure>
                    <LazyLoadImage
                      isAMP={isAmp}
                      src={news?.images?.url}
                      height={isAmp ? 63 : 138}
                      width={isAmp ? 95 : 207}
                      isLazyLoad={true}
                      defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                    />
                    <figcaption>
                      <h3 className="latestnewws_title">
                        {news?.display_headline}
                      </h3>
                    </figcaption>
                  </figure>
                </a>
              </li>
            )
          })}
        </ul>
        <div className="load_more">
          <a href="/cricket/icc-t20-world-cup/news/">
            <span>और ताजा खबरें</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default LatestNews;
