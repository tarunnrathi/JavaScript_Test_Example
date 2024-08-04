//import LazyImage from "components/Common/LazyImage";
import React, { memo, useContext, useEffect } from "react";
import { GlobalContext } from "../../../GlobalStore";
//import { get_static_img } from "includes/helper";
import getConfig from "next/config";
import LazyLoadImage from "components/Common/CustomImage";
import {getCompleteURL } from "util/global/Helper";

const { publicRuntimeConfig } = getConfig();

const getURL = (isAmp = false, url) => {
  return url
    ? url.replace(
        "https://hindi.news18.com/",
        publicRuntimeConfig.siteUrl + `${isAmp ? "amp/" : ""}`
      )
    : "";
};
const RhsTopStory = ({ isAmp = false, topStories = [] }) => {
  const { globalState = {}, updateData } = useContext(GlobalContext);
  const { ts = [] } = globalState;

  if (!(topStories.length || ts.length)) {
    return null;
  }

  useEffect(() => {
    if (!ts.length) {
      updateData(topStories, "ts");
    }
  }, []);
  return (
    <>
      <div className="top_story_new">
        <div className="globalhdnew">
          <h2>
            <a href="/news/">टॉप स्टोरीज </a>
          </h2>
        </div>
        <div className="story_widget">
          <ul>
            {(ts.length ? ts : topStories) &&
              (ts.length ? ts : topStories).map((topNews) => (
                <li key={"sbtl-" + topNews.id} style={{ position: "relative" }}>
                  <a
                    href={getCompleteURL(topNews.weburl_r,topNews.weburl)}                      
                  >
                    <figure>
                      {isAmp ? (
                        <figure>
                          <LazyLoadImage
                            src={topNews?.images?.url}
                            width={100}
                            height={67}
                            alt={topNews.display_headline || topNews.headline}
                            title={topNews.display_headline || topNews.headline}
                            isAMP={isAmp}
                          />                          
                        </figure>
                      ) : (
                        <LazyLoadImage
                            src={topNews?.images?.url}
                            width={100}
                            height={67}
                            alt={topNews.display_headline || topNews.headline}
                            title={topNews.display_headline || topNews.headline}
                            isAMP={isAmp}
                          />
                      )}
                    </figure>
                    <figcaption className="story_widget_link">
                      {topNews.display_headline || topNews.headline}
                    </figcaption>
                  </a>
                </li>
              ))}
          </ul>
          <a href="https://hindi.news18.com/news/" className="readmorenew">
            अधिक पढ़ें
          </a>
        </div>
      </div>
      <style jsx>
        {`
          .globalhdnew {
            ${isAmp ? `margin: 10px 0px;` : `margin: 10px 15px;`}
          }
          .top_story_new {
            margin-top: 15px;
          }
          .story_widget {
            background: #f4f4f4;
            clear: both;
            padding: 10px 10px 1px 10px;
            box-sizing: border-box;            
            ${isAmp ? `margin: 0px 0px 15px 0px;` : `margin: 0px 15px 15px 15px;`}
          }
          .story_widget ul li {
            display: block;
            margin-bottom: 15px;
            display: block;
            margin-bottom: 15px;
            border-bottom: 1px #e0dfdf solid;
            padding-bottom: 10px;
          }
          .story_widget ul li a {
            display: flex;
            color: #fff;
            text-decoration: none;
            flex-direction: row-reverse;
          }
          .story_widget ul li a figure {
            width: 100px;
            flex-shrink: 0;
          }
          .story_widget ul li a figure img {
            width: 100%;
            border-radius: 4px;
          }

          .story_widget_link {
            width: 100%;
            font-size: 14px;
            line-height: 22px;
            overflow: hidden;
            color: #000000;
            font-family: Mukta;
            font-weight: 700;
            margin-right: 10px;
          }
          .story_widget li:hover .story_widget_link {
            color: #ed1c24;
          }
          .readmorenew {
            display: block;
            font-size: 14px;
            line-height: 20px;
            font-family: "Mukta", sans-serif;
            font-weight: bold;
            color: #e1261d;
            position: relative;
            text-align: center;
          }
          .story_widget figure .img-figure > div {
            border-radius: 4px;
          }
          .story_widget ul li a figure figure amp-img {
            border-radius: 4px;
          }
          .story_widget figure .img-figure > div,
          .story_widget figure .img-figure img {
            border-radius: 4px;
          }
        `}
      </style>
    </>
  );
};
export default memo(RhsTopStory);
