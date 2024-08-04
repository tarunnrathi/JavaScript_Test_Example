import React from "react";
import LazyLoadImage from "components/Common/CustomImage";
import { imageLoader } from "includes/article.util";

const TopStoryRight = ({ isAmp = false, topNewsRight }) => {
  return (
    <div className="top_story_right">
      <ul className="cricketwallah_right">
        {topNewsRight?.map((rightNews) => {
          const { article_details: news } = rightNews;
          const imgUrl = news?.images?.url || "";
          const headline = news?.display_headline || news?.headline || "";
          const url = news?.weburl_r || news?.weburl || "";
          const src = imageLoader(imgUrl, 63, 110, false);
          return (
            <>
              <li>
                <a href={url}>
                  <figure>
                    <LazyLoadImage
                      isAMP={isAmp}
                      src={src}
                      width={110}
                      height={63}
                      alt={headline || "top khabrein"}
                    />
                  </figure>
                  <h3 className="cricketwallah_title">{headline}</h3>
                </a>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default TopStoryRight;
