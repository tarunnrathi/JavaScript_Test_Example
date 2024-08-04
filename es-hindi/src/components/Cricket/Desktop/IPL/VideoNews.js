import LazyImage from "components/Common/LazyImage";
import React from "react";
import { IPL_YEAR } from "includes/ipl.helper";

const VideoNewsList = ({ videoPriorityData }) => {
  return (
    <>
      <div className="CN-section-full">
        <div className="cn-heading-1">
          <span> IPL {IPL_YEAR} वीडियो </span>
        </div>
        <ul className="cn-h-video">
          {videoPriorityData.map((video) => (
            <li key={video.id}>
              <a href={video.weburl_r}>
                <div className="image-wrap">
                  <LazyImage
                    className=""
                    loading="lazy"
                    src={video.images?.url}
                    data-src={video.images?.url}
                    alt={video?.display_headline}
                    width="200"
                    height="130"
                  />
                </div>
                <div className="content-box">
                  <h3 className="video-heading">{video.display_headline}</h3>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/cricket/ipl/videos/"
          className="cn-morebtn1"
          alt="और वीडियो देखें"
        >
          और वीडियो देखें{" "}
        </a>
      </div>
      <style jsx global>{`
        .cn-morebtn1 {
          background: #f5f5f5;
          display: block;
          text-align: center;
          font-size: 12px;
          line-height: 12px;
          text-transform: uppercase;
          color: #ff0000;
          padding: 11px 0;
        }
        .CN-section-full {
          margin-bottom: 25px;
        }
        .cn-heading-1 {
          margin-bottom: 6px;
        }
        body .cn-heading-1 span {
          font-size: 28px !important;
          line-height: 32px !important;
          font-weight: bold;
          text-transform: uppercase;
        }
        .cn-heading-1 span {
          font-size: 22px;
          line-height: 27px;
          color: #e1261d;
          background: #fff;
          position: relative;
          top: 6px;
          padding-right: 4px;
          display: inline-block;
          text-transform: uppercase;
          font-weight: bold;
        }
        .cn-h-video {
          justify-content: initial;
          flex-wrap: wrap;
        }
        .cn-h-video {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #dadada;
        }
        .cn-h-video li {
          margin-right: 1%;
          margin-bottom: 10px;
        }
        .cn-h-video .image-wrap figure {
          overflow: hidden;
        }
        .cn-h-video li {
          width: 24%;
        }
        .cn-h-video li a {
          display: block;
        }
        .cn-h-video .image-wrap {
          position: relative;
        }
        .cn-h-video .image-wrap img {
          display: block;
          width: 100%;
          height: 100% !important;
        }
        .cn-h-video .image-wrap {
          position: relative;
        }
        .cn-h-video li a .content-box {
          margin-top: 7px;
          margin-bottom: 10px;
        }
        body .cn-h-video li a .content-box .video-heading {
          height: 60px;
          overflow: hidden;
          padding: 2px 0px;
          box-sizing: border-box;
        }
        .cn-h-video li a .content-box .video-heading {
          font-size: 14px;
          line-height: 20px;
        }
      `}</style>
    </>
  );
};

export default VideoNewsList;
