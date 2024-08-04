import React from "react";
import ArticleBody from "components/Common/ArticleBody";

const ReadMore = ({ data = {}, isAmp = false, second = "" }) => {
  return (
    <div>
      <div id="readmore_content" className="rmc">
        <h2 className="readMoreHeading"> अधिक पढ़ें</h2>
        <div className="rmc">
          {isAmp ? (
            <div
              dangerouslySetInnerHTML={{
                __html: second,
              }}
            ></div>
          ) : (
            <ArticleBody
              body={data?.body}
              isDesktop={true}
              id={data?.story_id}
              showAds={false}
              parsed={data?.parsedBody?.slice(1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
