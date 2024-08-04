import LazyImage from "components/Common/CustomImage";
import React from "react";

const TopStories = ({ storiesList = [] }) => {
  if (!storiesList.length) return null;

  let articleStoryList = [...storiesList];
  const topNews = articleStoryList.shift() || {};

  const { article_details: topData = {} } = topNews;

  return (
    <>
      <div className="top_story">
        <div className="top_story_left">
          <a href={topData.weburl_r || ""}>
            <figure>
              <h2 className="top_title">{topData.display_headline}</h2>
              <LazyImage
                src={topData?.images?.url || ""}
                title={topData.display_headline}
                alt={topData.display_headline}
                height={247}
                width={400}
              />
            </figure>
          </a>
        </div>
        <ul className="story_list">
          {articleStoryList.map((storyData) => {
            const { article_details: story } = storyData;
            return (
              <li key={story.story_id}>
                <a href={story.weburl_r || ""}>
                  <h3 className="story_list_title">{story.display_headline}</h3>
                  <figure>
                    <LazyImage
                      src={story?.images?.url || ""}
                      title={story.display_headline}
                      alt={story.display_headline}
                      width={110}
                      height={73}
                    />
                  </figure>
                </a>
              </li>
            );
          })}
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

export default TopStories;
