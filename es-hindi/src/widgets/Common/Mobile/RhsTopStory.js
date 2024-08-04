import LazyImage from "components/Common/LazyImage";
import React, { memo, useContext, useEffect } from "react";
import { GlobalContext } from "../../../GlobalStore";
import { get_static_img } from "includes/helper";

const RhsTopStory = ({ topStories = [] }) => {
  const { globalState = {}, updateData } = useContext(GlobalContext);
  const { ts = [] } = globalState;

  if (!(topStories.length || ts.length)) {
    return null;
  }

  useEffect(() => {
    if (!ts.length) {
      updateData(topStories, "ts");
    } else {
      topStories = ts;
    }
  }, []);

  return (
    <>
      <div className="top_story_section">
        <span className="ph_heading">
          <a href="/news/">टॉप स्टोरीज </a>
        </span>
        <div className="story_widget">
          <ul>
            {topStories &&
              topStories.map((topNews) => (
                <li key={"sbtl-" + topNews.id} style={{ position: "relative" }}>
                  <a href={topNews.url || topNews.weburl}>
                    <figure className="story_widget_img">
                      <LazyImage
                        width={100}
                        height={67}
                        src={topNews.thumbnail ? get_static_img(topNews.thumbnail, 100, 67) : topNews.images ? get_static_img(topNews.images, 100, 67) : ''}
                        alt={topNews.display_headline || topNews.title}
                        title={topNews.display_headline || topNews.title}
                      />
                    </figure>
                    <figcaption className="story_widget_link">{topNews.display_headline || topNews.title}</figcaption>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <style jsx>
        {`
          .top_story_section {
            min-height: 400px; 
            overflow: hidden;
            width: 100%;
            padding-top: 20px;
          }
          .story_widget ul li {
            display: block;
            margin-bottom: 15px;
            display: block;
            margin-bottom: 15px;
            border-bottom: 1px #ffffff40 solid;
            padding-bottom: 10px;
          }
          .story_widget {
            background: #333333;
            width: 100%;
            clear: both;
            margin-bottom: 20px;
            padding: 10px 10px 1px 10px;
            box-sizing: border-box;
          }
          .story_widget ul li a {
            display: flex;
            color: #fff;
            text-decoration: none;
          }
          .story_widget_img img {
            width: 100%;
            display: block;
          }
          .story_widget_img {
            margin-right: 10px;
            width: 100px;
            flex-shrink: 0;
          }
          .story_widget_link{
            width: 100%;
            font-size: 14px;
            line-height: 22px;
            overflow: hidden;
            color: #000000;
            font-family: Mukta;
            font-weight: bold;
            margin-right: 10px;
        }
                
          .story_widget li:hover .story_widget_link {
            color: #ed1c24;
          }
        `}
      </style>
    </>
  );
};
export default memo(RhsTopStory);
