import React from "react";
import { siteUrl } from "config/site.config";
import { getRelativeURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";

const StoryWrap = ({ stories, isMobile }) => {
  const slicedCount = isMobile ? 3 : 1;
  const restStories = (stories?.length && [...stories.slice(slicedCount, stories.length)]) || [];
  return (
    <>
      <div className="CN-storyWrap CN-Sections">
        <h1 className="cricket-heading">Cricket News</h1>
        {isMobile ? (
          <div>
            {stories?.length > 0 && (
              <div className="CN-LeadStory">
                <h2 className="CN-LeadHead">
                  <a href={getRelativeURL(false, stories[0]?.weburl) || ""} title={stories[0]?.headline}>
                    {stories[0]?.headline}
                  </a>
                </h2>
                <figure>
                  <a href={getRelativeURL(false, stories[0]?.weburl)}>
                    {/* <span className="CN-LeadBtn">Exclusive</span> */}
                    <LazyLoadImage
                      src={stories[0]?.thumbnail}
                      width={390}
                      height={260}
                      alt={stories[0]?.headline || ""} 
                      title={stories[0]?.headline || ""}
                      defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                      isLazyLoad={true}
                    />
                  </a>
                </figure>
              </div>
            )}
            {stories?.length >= 3 && (
              <div className="CN-Thumbstory">
                <div className="CN-ThumbStory-col">
                  <div className="imgwrap">
                    <a href={getRelativeURL(false, stories[1]?.weburl)}>
                      <LazyLoadImage
                      src={stories[1]?.thumbnail}
                      width={194}
                      height={129}
                      alt={stories[1]?.headline || ""} 
                      title={stories[1]?.headline || ""}
                      defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                      isLazyLoad={true}
                    />
                    </a>
                  </div>
                  <div className="text">
                    <a href={getRelativeURL(false, stories[1]?.weburl)} title={stories[1]?.headline}>
                      {stories[1]?.headline}
                    </a>
                  </div>
                </div>
                <div className="CN-ThumbStory-col">
                  <div className="imgwrap">
                    <a href={getRelativeURL(false, stories[2]?.weburl)}>
                      <LazyLoadImage
                        src={stories[2]?.thumbnail}
                        width={194}
                        height={129}
                        alt={stories[2]?.headline || ""} 
                        title={stories[2]?.headline || ""}
                        defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                        isLazyLoad={true}
                    />
                    </a>
                  </div>
                  <div className="text">
                    <a href={getRelativeURL(false, stories[2]?.weburl)} title={stories[2]?.headline}>
                      {stories[2]?.headline}
                    </a>
                  </div>
                </div>
              </div>
            )}
            <div className="CN-Topstory">
              <ul>
                {restStories.map((story,index) => (
                  <li key={index}>
                    <a href={getRelativeURL(false, story?.weburl)}>{story?.headline}</a>
                  </li>
                ))}
              </ul>
            </div>
            <a href={siteUrl+"cricket/news/"} className="CN-morestory-round-btn">
              और भी...
            </a>
          </div>
        ) : (
          <div className="cn-story-wrap">
            {stories?.length > 0 && (
              <figure className="cn-storybox">
                <a href={getRelativeURL(false, stories[0]?.weburl)} title={stories[0]?.headline}>
                  <LazyLoadImage
                    src={stories[0]?.thumbnail}
                    width={540}
                    height={360}
                    alt={stories[0]?.headline || ""} 
                    title={stories[0]?.headline || ""}
                    defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                    isLazyLoad={true}
                  />
                  <h2 className="fig-caption">{stories[0]?.headline}</h2>
                </a>
              </figure>
            )}
            <ul className="cn-liststory">
              {restStories.map((story) => (
                <li>
                  <a href={getRelativeURL(false, story?.weburl)}>{story?.headline}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <style jsx global>{`
        .CN-storyWrap h1.cricket-heading{
          font-weight: 700;
          color: #e1261d;
          font-size: 25px;
          margin-bottom: 5px;
          font-family: 'Mukta',sans-serif;
        }
        .CN-Mobile-HomeOuter .CN-storyWrap h1.cricket-heading{
          font-size: 20px;
          padding-left: 10px;
        }
        .CN-section .CN-sec-l .cn-story-wrap .cn-storybox {
          width: 540px;
        }
        .CN-section .CN-sec-l .cn-story-wrap {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }
        .CN-section .CN-sec-l .cn-story-wrap .cn-storybox a {
          background: #f3f3f3;
          display: flex;
          flex-wrap: wrap;
        }
        .CN-section .CN-sec-l .cn-story-wrap .cn-storybox .fig-caption {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.45;
          position: relative;
          background: #f3f3f3;
          margin: -80px 0 0 32px;
          padding: 10px 15px 0 15px;
          width: 100%;
        }
        .CN-section .CN-sec-l .cn-story-wrap .cn-storybox a img {
          display: block;
          width: 100%;
        }
        .CN-section .CN-sec-l .cn-story-wrap .cn-liststory {
          width: 365px;
        }
        .CN-section .CN-sec-l .cn-story-wrap .cn-liststory li:first-child {
          border-top: 1px solid #dadada;
        }
        .CN-section .CN-sec-l .cn-story-wrap .cn-liststory li {
          border-bottom: 1px solid #dadada;
        }
        .CN-section .CN-sec-l .cn-story-wrap .cn-liststory li a {
          display: block;
          font-size: 16px;
          font-family: 'Mukta',sans-serif !important;
          padding: 8px 0;
          line-height: 1.5;
          min-height: 43px;
          font-weight: bold;
        }
        .CN-Mobile-HomeOuter .CN-Thumbstory {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
        }
        .CN-Mobile-HomeOuter .CN-Thumbstory .CN-ThumbStory-col {
          width: 48.5%;
          border: 1px solid #d7d7d7;
          border-radius: 5px;
          overflow: hidden;
        }
        .CN-Mobile-HomeOuter .CN-Thumbstory .CN-ThumbStory-col .imgwrap a,
        .CN-Mobile-HomeOuter .CN-Thumbstory .CN-ThumbStory-col .imgwrap img {
          display: block;
          width: 100%;
        }
        .CN-Mobile-HomeOuter .CN-Thumbstory .CN-ThumbStory-col .imgwrap a {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          overflow: hidden;
        }
        .CN-Mobile-HomeOuter .CN-Thumbstory .CN-ThumbStory-col .text {
          padding: 10px;
        }
        .CN-Mobile-HomeOuter .CN-Thumbstory .CN-ThumbStory-col .text a {
          // font-family: 'Karma',serif !important;
          font-size: 16px;
          line-height: 1.5;
          display: block;
          color: #0a0a0a;
        }
        .CN-Mobile-HomeOuter .CN-storyWrap .CN-Topstory {
          background: #f5f5f5;
          padding: 0 10px;
        }
        .CN-Mobile-HomeOuter .CN-storyWrap .CN-Topstory ul {
          border-top: 1px solid #d7d7d7;
          border-bottom: 1px solid #d7d7d7;
          padding: 15px 10px;
        }
        .CN-Mobile-HomeOuter .CN-storyWrap .CN-Topstory ul li {
          margin-bottom: 20px;
          padding-left: 15px;
          position: relative;
        }
        .CN-Mobile-HomeOuter .CN-storyWrap .CN-Topstory ul li::before {
          content: "";
          width: 6px;
          height: 6px;
          position: absolute;
          background: #e1261c;
          border-radius: 50%;
          left: 0;
          top: 6px;
        }
        .CN-Mobile-HomeOuter .CN-storyWrap .CN-Topstory ul li a {
          // font-family: 'Karma',serif !important;
          font-size: 16px;
          line-height: 1.5;
          color: #0a0a0a;
        }
      `}</style>
    </>
  );
};

export default StoryWrap;
