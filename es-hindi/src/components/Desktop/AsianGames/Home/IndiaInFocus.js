import LazyImage from "components/Common/CustomImage";

const IndiaInFocus = ({ asianGameCricketNews = [] }) => {
  if (!asianGameCricketNews.length) return null;

  let cricketInFocusArr = [...asianGameCricketNews];
  const leftData = cricketInFocusArr.shift() || {};
  const lastData = cricketInFocusArr.pop() || {};

  return (
    <>
      <div className="india_focus">
        <h2 className="page_title">
          क्रिकेट <span>इन फोकस</span>
        </h2>
        <div className="india_focus_row">
          <div className="india_focus_left">
            <a href={leftData?.weburl_r || ""}>
              <figure>
                <LazyImage
                  src={leftData?.images?.url || ""}
                  title={leftData.headline}
                  alt={leftData.headline}
                  width={331}
                  height={221}
                  lazyLoad={true}
                />
                <figcaption>
                  <h3 className="india_focus_title">
                    {leftData.display_headline}
                  </h3>
                  <p>{leftData.intro}</p>
                </figcaption>
              </figure>
            </a>
          </div>
          <ul className="india_focus_midd">
            {cricketInFocusArr.map((data) => (
              <li key={data.story_id}>
                <a href={data?.weburl_r || ""}>
                  <figure>
                    <LazyImage
                      src={data?.images?.url || ""}
                      title={data.headline}
                      alt={data.headline}
                      width={100}
                      height={63}
                    />
                  </figure>
                  <h3 className="india_focus_midd_title">{data.headline}</h3>
                </a>
              </li>
            ))}
          </ul>
          <div className="india_focus_right">
            <div className="india_focus_story">
              <a href={lastData?.weburl_r || ""}>
                <figure>
                  <LazyImage
                    src={lastData?.images?.url || ""}
                    title={lastData.headline}
                    alt={lastData.headline}
                    height={136}
                    width={203}
                    lazyLoad={true}
                  />
                  <figcaption>
                    <h3 className="india_focus_story_hding">
                      {lastData.headline}
                    </h3>
                  </figcaption>
                </figure>
              </a>
            </div>
            <div className="more_india">
              <a href="/tag/asian-games/news/">
                और <br></br> क्रिकेट इन फोकस <br></br> पढ़े
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        // India In Focus
        .india_focus {
          width: 100%;
        }
        .india_focus_row {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }
        .india_focus_left {
          width: 331px;
        }
        .india_focus_midd {
          width: 350px;
        }
        .india_focus_right {
          width: 203px;
        }
        .india_focus_left a {
          color: #001d42;
        }
        india_focus_left figure img {
          width: 100%;
        }
        .india_focus_left figure img {
          width: 100%;
          display: block;
        }
        .india_focus_left figcaption {
          height: 177px;
          background: #f4f4f2 0 0 no-repeat padding-box;
          padding: 10px;
          border-bottom: 1px #dadada solid;
          box-sizing: border-box;
        }
        .india_focus_title {
          font-size: 20px;
          line-height: 26px;
          padding-bottom: 2px;
        }
        .india_focus_left figcaption p {
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0;
          color: #636363;
          height: 55px;
          overflow: hidden;
        }
        .india_focus_midd li a {
          display: flex;
          color: #001d42;
        }
        .india_focus_midd li figure img {
          width: 100px;
          height: 67px;
          display: block;
        }
        .india_focus_midd_title {
          letter-spacing: 0;
          font-size: 13px;
          line-height: 20px;
          font-weight: bold;
          width: calc(100% - 100px);
          padding-left: 10px;
        }
        .india_focus_midd li {
          background: #f4f4f2;
          margin-bottom: 15px;
          border-bottom: 1px #dadada solid;
          padding: 10px;
        }
        .india_focus_midd li:last-child {
          margin-bottom: 0;
        }
        .india_focus_story {
          width: 100%;
          border-bottom: 1px #dadada solid;
          margin-bottom: 20px;
        }
        .india_focus_story figure img {
          width: 100%;
          display: block;
        }
        .india_focus_story a {
          color: #001d42;
        }
        .india_focus_story_hding {
          font-size: 13px;
          line-height: 20px;
          font-weight: bold;
        }
        .india_focus_story figcaption {
          background: #f4f4f2;
          padding: 10px;
        }
        .more_india {
          height: 138px;
          background: #f4f4f2;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-bottom: 1px #dadada solid;
        }
        .more_india a {
          display: block;
          color: red;
          font-weight: bold;
          text-decoration: underline;
          letter-spacing: 0.24px;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 18px;
        }
      `}</style>
    </>
  );
};

export default IndiaInFocus;
