import LazyImage from "components/Common/CustomImage";

const AsianGamesTopStories = ({ storiesList = [] }) => {
  if (!storiesList.length) return null;
  let stories = [...storiesList];
  const rightData = stories.shift();

  const { article_details: rightContent } = rightData;

  return (
    <>
      <div className="top_story">
        <div className="top_story_left">
          <a href={rightContent.weburl_r || ""}>
            <figure>
              <LazyImage
                src={rightContent?.images?.url || ""}
                title={rightContent.display_headline}
                alt={rightContent.display_headline}
                width={515}
                height={343}
              />
              <figcaption>
                <h2 className="top_title">{rightContent.display_headline}</h2>
                <p>{rightContent.intro}</p>
              </figcaption>
            </figure>
          </a>
        </div>
        <div className="top_story_right">
          <ul className="cricketwallah_right">
            {stories.map((storyData) => {
              const { article_details: story } = storyData;
              return (
                <li key={story.story_id}>
                  <a href={story.weburl_r || ""}>
                    <figure>
                      <LazyImage
                        src={story?.images?.url || ""}
                        title={story.display_headline}
                        alt={story.display_headline}
                        height={63}
                        width={100}
                      />
                    </figure>
                    <h3 className="cricketwallah_title">
                      {story.display_headline}
                    </h3>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="load_more">
          <a href="/tag/asian-games/news/">और पढ़े</a>
        </div>
      </div>
      <style jsx>{`
        // Top-story
        .top_story {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        .top_story_left {
          width: 515px;
          margin-bottom: 10px;
        }
        .top_story_right {
          width: calc(100% - 515px);
          padding-left: 20px;
          box-sizing: border-box;
        }
        .top_story_right .cricketwallah_right {
          width: 100%;
          padding-left: 0;
        }
        .top_story_left figure img {
          width: 100%;
          display: block;
          height: 343px;
        }
        .top_story_left figcaption {
          height: 108px;
          background: #f5f5f5 0 0 no-repeat padding-box;
          padding: 7px 10px 5px 10px;
        }
        .top_story_left a {
          color: #001d42;
        }
        .top_title {
          font-size: 22px;
          line-height: 26px;
          margin-bottom: 3px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .top_story_left figcaption p {
          font-size: 12px;
          line-height: 18px;
          font-weight: normal;
          height: 36px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .top_story_right .cricketwallah_right li img {
          width: 110px;
          height: 73px;
        }
        .top_story_right .cricketwallah_title {
          width: 100%;
        }
        .top_story_right .cricketwallah_right li:last-child {
          padding-bottom: 0;
          border: 0;
        }
        .cricketwallah_right {
          width: 50%;
          padding-left: 20px;
          box-sizing: border-box;
        }
        .cricketwallah_right li a {
          display: flex;
          color: #001d42;
        }
        .cricketwallah_right li img {
          width: 90px;
          height: 60px;
          display: block;
        }
        .cricketwallah_title {
          font-size: 14px;
          line-height: 20px;
          width: calc(100% - 90px);
          padding-left: 10px;
        }
        .cricketwallah_right li {
          border-bottom: 1px #dadada solid;
          padding: 10px 0;
        }
        .cricketwallah_right li:first-child {
          padding-top: 0;
        }
        .cricketwallah_img {
          width: 130px;
          height: 130px;
          background: #fff 0 0 no-repeat padding-box;
          border: 1px solid #707070;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cricketwallah_img img {
          width: 110px;
          height: 110px;
          border-radius: 50%;
        }
        .cricketwallah_content {
          width: 100%;
          padding-left: 20px;
          font-size: 13px;
          font-weight: normal;
        }
        .cricketwallah_content p {
          font-size: 13px;
          line-height: 20px;
          padding-bottom: 5px;
          font-weight: normal;
        }
        .cricketwallah_content h3 {
          color: #202020;
          font-size: 20px;
          line-height: 25px;
          padding-bottom: 10px;
        }
        .cricketwallah_more {
          letter-spacing: 0.24px;
          color: red;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 600;
          text-decoration: underline;
        }
        .load_more {
          width: 100%;
          display: flex;
          align-items: center;
        }
        .load_more a {
          color: red;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 12px;
          flex-shrink: 0;
          padding: 0 15px;
        }
        .load_more::before,
        .load_more::after {
          content: "";
          background: #f5f5f5;
          width: 100%;
          height: 20px;
        }
      `}</style>
    </>
  );
};

export default AsianGamesTopStories;
