import React from "react";
import LazyLoadImage from "components/Common/CustomImage";

const TopStoryLeft = ({isAmp=false, topNewsLeft }) => {
  const { article_details: item } = topNewsLeft || {};
  const src = item?.images?.url;
  return (
    <div className="top_story_left">
      <a href={item?.weburl_r}>
        <figure>
          <h2 className="top_title_m">{item?.display_headline}</h2>
          <LazyLoadImage
            isAMP={isAmp} 
            src={src} 
            height={294}
            width={422}
          />
          <figcaption>
            <h2 className="top_title">{item?.display_headline}</h2>
            <p>{item?.intro}</p>
          </figcaption>
        </figure>
      </a>
    </div>
  );
};

export default TopStoryLeft;
