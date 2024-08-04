import LazyImage from "components/Common/CustomImage";

const CricketInFocus = ({ asianGameCricketNews = [] }) => {
  if (!asianGameCricketNews.length) return null;

  let cricketInFocusArr = [...asianGameCricketNews];
  const leftData = cricketInFocusArr.shift() || {};

  return (
    <>
      <div className="top_story">
        <h2 className="pwa_page_title">क्रिकेट इन फोकस</h2>
        <div className="top_story_left">
          <a href={leftData?.weburl_r || ""}>
            <figure>
              <h2 className="top_title">{leftData.headline}</h2>
              <LazyImage
                src={leftData?.images?.url || ""}
                title={leftData.headline}
                alt={leftData.display_headline}
                width={400}
                height={221}
              />
            </figure>
          </a>
        </div>
        <ul className="story_list">
          {cricketInFocusArr.map((data) => (
            <li key={data.story_id}>
              <a href={data?.weburl_r || ""}>
                <h3 className="story_list_title">{data.headline}</h3>
                <figure>
                  <LazyImage
                    src={data?.images?.url || ""}
                    title={data.headline}
                    alt={data.headline}
                    width={100}
                    height={63}
                  />
                </figure>
              </a>
            </li>
          ))}
        </ul>
        <div className="load_more">
          <a href="/tag/asian-games/">
            <span>और पढ़े</span>
          </a>
        </div>
      </div>
      <style jsx>{`
        // Top Story and India In Focus and Latest News
        .top_story {
          margin-bottom: 20px;
        }
        .top_story_left {
          width: 100%;
          background: #f5f5f5;
          padding: 5px 10px 10px;
          margin-bottom: 5px;
        }
        .top_story_left a {
          color: #001d42;
        }
        .top_story_left figure img {
          width: 100%;
          display: block;
        }
        .top_title {
          letter-spacing: 0px;
          color: #001d42;
          font-size: 18px;
          line-height: 24px;
          font-family: "Playfair Display";
          padding-bottom: 10px;
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

export default CricketInFocus;
