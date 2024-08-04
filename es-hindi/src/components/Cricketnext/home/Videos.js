import React from "react";
import { imageLoader } from "includes/article.util";
import { siteUrl } from "config/site.config";

const Videos = ({ videos, isMobile }) => {
  const videoData = videos?.length && (isMobile ? [...videos.slice(1, videos.length)] : videos) || [];

  return (
    <>
      <div className="cn-videowidget dark-box CN-Sections">
        <div className="CN-heading-1">
          <div className="headinner">वीडियो</div>
          <div className="icon"></div>
        </div>
        {isMobile && videos.length && (
          <div className="CN-slider-mobile">
            <div className="heading">
              <a href={videos[0].weburl}>{videos[0].headline}</a>
            </div>
            <div className="image-box">
              <a href={videos[0].weburl}>
                <span className="overlay"></span>
                <span className="img-icon">
                  <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images//cricket/play-icon1.svg" alt="Player Icon" />
                </span>
                <img
                  src={
                    videos[0].thumbnail != ""
                      ? imageLoader(videos[0].thumbnail, 281, 169, true)
                      : "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                  }
                  alt={videos[0].headline}
                />
              </a>
            </div>
          </div>
        )}
        <ul className="cn-h-video">
          {videoData?.length
            ? videoData.map((data, ind) => (
                <li key={ind}>
                  <a href={data.weburl}>
                    <div className="image-box">
                      <span className="img-icon">
                        <img
                          src="https://images.news18.com/static_news18/pix/ibnhome/news18/images//cricket/play-icon1.svg"
                          alt="Player Icon"
                        />
                      </span>
                      <img
                        src={
                          data.thumbnail != ""
                            ? imageLoader(data.thumbnail, 281, 187, true)
                            : "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                        }
                        alt={data.headline}
                      />
                    </div>
                    <div className="content-box">
                      <h3 className="video-heading">{data.headline}</h3>
                    </div>
                  </a>
                </li>
              ))
            : null}
        </ul>
        <a href={siteUrl+"cricket/videos/"} className="cn-morebtn1">
          और भी…
        </a>
      </div>
      <style jsx global>{`
        .cn-videowidget {
          margin-bottom: 25px;
        }
        .cn-h-video {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #dadada;
        }
        .cn-h-video li {
          width: 19%;
        }
        .cn-h-video li a {
          display: block;
        }
        .cn-h-video .image-box {
          position: relative;
        }
        .cn-h-video .image-box span {
          position: absolute;
          right: 4px;
          top: 4px;
        }
        .cn-h-video .image-box img {
          display: block;
          width: 100%;
        }
        .cn-h-video li a .content-box {
          margin-top: 5px;
          margin-bottom: 10px;
        }
        .cn-h-video li a .content-box .video-heading {
          font-size: 15px;
          font-family: "Segoe Pro Bold";
          line-height: 22px;
        }
        .CN-Mobile-HomeOuter .cn-videowidget .cn-h-video {
            overflow-x: auto;
            padding: 10px 10px 0;
            padding-right: 0;
            border-bottom: none;
        }
        .CN-Mobile-HomeOuter .cn-videowidget .cn-h-video li{
            width: auto;
            flex: 0 0 155px;
            padding-right: 10px;
        }
        .CN-Mobile-HomeOuter .cn-videowidget .cn-h-video li a {
            display: block;
            border: 1px solid #707070;
            border-radius: 5px;
            overflow: hidden;
            height: 100%;
            background: #111111;
            box-sizing: border-box;
        }
        .CN-Mobile-HomeOuter .cn-videowidget .cn-h-video li a .image-box {
            overflow: hidden;
            border-bottom: 1px solid #707070;
            position: relative;
        }
        .CN-Mobile-HomeOuter .cn-videowidget .cn-h-video li a .image-box .img-icon {
            width: 20px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .CN-Mobile-HomeOuter .cn-videowidget .cn-h-video li .content-box {
            background: #111111;
            padding: 7px 10px 10px 10px;
        }
        .CN-Mobile-HomeOuter .cn-videowidget .cn-h-video li .content-box .video-heading {
            font-size: 16px;
            line-height: 1.5;
            color: #FFFFFF;
            font-family: "Noto Serif", 'Droid Serif', sans-serif !important;
            font-weight: normal;
        }
      `}</style>
    </>
  );
};

export default Videos;
