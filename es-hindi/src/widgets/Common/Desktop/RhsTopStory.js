
import { memo, useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../../GlobalStore";
import { getArticleList } from "api/global/Common";
import { getRelativeURL } from "util/global/Helper";
import getConfig from "next/config";
import LazyLoadImage from "components/Common/CustomImage";
const { publicRuntimeConfig } = getConfig();

const RhsTopStory = ({
  topStories = [],
  articleData = [],
  isRelated = false,
  isRss,
}) => {
  const [relatedStories, setRelatedStories] = useState([]);
  const { globalState = {}, updateData } = useContext(GlobalContext);
  const { ts = [] } = globalState;

  // call LHS related stories
  useEffect(() => {
    if (isRelated) {
      if (articleData?.tags && !topStories?.length) {
        const arr = [];
        (articleData.tags || []).forEach((item) => {
          if (item.slug) {
            arr.push(item.slug);
          }
        });
        getArticleList({
          count: 4,
          offset: 0,
          fields: "story_id,display_headline,headline,weburl,images",
          filter: {
            not: { story_id: `${articleData.id || articleData.story_id}` },
            post_type: "text",
            "tags.slug": arr,
          },
        }, true)
          .then((response) => {
            setRelatedStories([...response]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, []);

  if (!(topStories.length || ts.length)) {
    return null;
  }
  if (!ts.length) {
    updateData(topStories, "ts");
  } else {
    topStories = ts;
  }
  return (
    <>
      <div className="top_story_section">
        {(topStories.length || relatedStories.length) && (
          <>
            <span className="ph_heading cp_rhs_topstory_widget">
              <a href={publicRuntimeConfig.siteUrl+`news/`} className="cp_rhs_topstory_widget">
                {relatedStories && relatedStories.length
                  ? relatedStories &&
                    relatedStories[0] &&
                    relatedStories[0].image
                    ? "चुनाव 2022"
                    : "संबंधित खबरें"
                  : "टॉप स्टोरीज"}{" "}
              </a>
            </span>
            <div className="story_widget">
              <ul>
                {(relatedStories && relatedStories.length
                  ? relatedStories
                  : topStories
                ).map((topNews, index) => {
                  return (
                    <li key={"sbtl-" + index} style={{ position: "relative" }} className="cp_rhs_topstory_widget">
                      <a
                        href={topNews?.weburl ? getRelativeURL(false, topNews?.weburl):''}
                        className="cp_rhs_topstory_widget"
                      >
                        <figure width={102} height={68} className="story_widget_img">
                          <LazyLoadImage
                            src={topNews?.images?.url}
                            width={102}
                            height={68}
                            alt={topNews.display_headline || topNews.headline}
                            title={topNews.display_headline || topNews.headline}                             
                          />
                          {/* <LazyImage
                            width={102}
                            height={68}
                            src={topNews?.images?.url}
                            alt={topNews.display_headline || topNews.headline}
                            title={topNews.display_headline || topNews.headline}
                            borderRadius={4}
                          /> */}
                        </figure>
                        <figcaption className="story_widget_link">
                          {topNews.display_headline || topNews.headline}
                        </figcaption>
                      </a>
                    </li>
                  );
                })}
              </ul>
              {relatedStories && relatedStories.length ? null : (
                <a href={publicRuntimeConfig.siteUrl+`news/`} className="readmore">
                  अधिक पढ़ें
                </a>
              )}
            </div>
          </>
        )}
      </div>
      <style jsx>
        {`
        .readmore {
          display: block;
          font-size: 14px;
          line-height: 20px;
          font-family: "Mukta", sans-serif;
          font-weight: bold;
          color: #e1261d;
          position: relative;
          text-align: center;
        }
        .ph_heading {
          color: #000;
    font-size: 22px;
    line-height: 36px;
    font-weight: bold;
    font-family: "Mukta",sans-serif!important;
    position: relative;
    border-bottom: 2px solid#111
        }
        .ph_heading::before {
          content: "";
          height: 5px;
          width: 25px;
          background: #f4342f;
          position: absolute;
          left: 0;
          bottom: -3px;
      }
      .ph_heading a {
        color: #000000;
        text-decoration: none;
    }
          .top_story_section {
            min-height: 400px;
            overflow: hidden;
            width: 100%;
            margin-bottom: ${isRss ? "0px" : "25px"};
            margin-top: 25px;
          }
          .story_widget {
            background: #f7f7f7;
            width: 100%;
            clear: both;
            margin-bottom: ${isRss ? "0px" : "20px"};
            padding: 10px 10px 1px 10px;
            box-sizing: border-box;
          }
          .story_widget ul li {
            position: relative;
            display: block;
            margin-bottom: 10px;
            border-bottom: 1px solid #c4c4c4;
            padding-bottom: 10px;
          }
          .story_widget ul li a {
            display: flex;
            justify-content: space-between;
            color: #fff;
            text-decoration: none;
          }
          .story_widget_img {
            width: 100px;
            font-size: 0;
            background-color: #dbdbdb;
          }
          .story_widget_img img {
            width: 100%;
          }
          .story_widget_link {
            width: -webkit-calc(100% - 110px);
            width: -moz-calc(100% - 110px);
            width: calc(100% - 110px);
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            color: #000000;
            font-family: "Mukta", sans-serif !important;
            font-weight: bold;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            height: 59px;
          }
          .photo-icon {
            position: absolute;
            bottom: 5px;
            right: 0;
            width: 68px;
            height: 26px;
            background-color: #ff4a4a;
            border: 1px solid #fff;
            border-radius: 4px 0px 0px 4px;
            padding: 0 0px 0 5px;
          }
          .photo-icon h3 {
            text-align: center;
            font-family: Mukta;
            letter-spacing: 0px;
            color: #ffffff;
            font-size: 16px;
            font-weight: bold;
            line-height: 25px;
            display: inline-block;
            vertical-align: middle;
            margin-left: 2px;
          }

          .img-figure {
            margin: auto;
          }
        `}
      </style>
    </>
  );
};
export default memo(RhsTopStory);
