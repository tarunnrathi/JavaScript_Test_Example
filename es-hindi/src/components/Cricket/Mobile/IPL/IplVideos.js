import { IPL_YEAR } from "includes/ipl.helper";
import React from "react";

const IplVideos = ({ videoData }) => {
  const topVideos = videoData.slice(0, 1);
  const bottomVideos = videoData.slice(1, 4);
  return (
    <>
      <div className="CN-Sections dark-box">
        <div className="CN-heading-1">
          <div className="headinner"> IPL {IPL_YEAR} वीडियो </div>
          <div className="icon"></div>
        </div>
        {topVideos.map((item, index) => (
          <div className="CN-videosec-h" key={`topVideos_${index}`}>
          <div className="heading">
            <a href={item.weburl_r}>{item.display_headline}</a>
          </div>
          <div className="image-box">
            <a href={item.weburl_r}>
              <span className="overlay"></span>
              <span className="img-icon">
                <img
                  src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/play-icon1.svg"
                  alt="ipl"
                  width="40"
                  height="40"
                />
              </span>
              <img
                loading="lazy"
                src={`${
                  item.images?.url
                  }?impolicy=website&width=360`}
                data-src={`${
                  item.images?.url
                  }?impolicy=website&width=360`}
                alt={item.display_headline}
                height="240"
              />
            </a>
          </div>
        </div>
        ))}

        <ul className="CN-video-smallh">
          {
            bottomVideos && bottomVideos.map ((item, index) => (
              <li key={`bottomVideos_${index}`}>
                <a href={item.weburl_r}>
                  <div className="image-box">
                    <span className="img-icon">
                        <img
                          src="https://images.news18.com/static_news18/pix/ibnhome/news18/images//cricket/play-icon1.svg"
                          alt="ipl"
                          width="40"
                          height="40"
                        />
                    </span>
                    <img
                      loading="lazy"
                      src={`${
                        item.images?.url
                        }?impolicy=website&width=160`}
                      data-src={`${
                        item.images?.url
                        }?impolicy=website&width=160`}
                      alt={item?.display_headline}
                      height="93"
                    />
                  </div>
                  <div className="caption">
                      <p>{item.display_headline}</p>
                  </div>
                </a>
              </li>
            ))
          }
        </ul>
		    <a href="/cricket/ipl/videos/" className="CN-morestory-btn" alt="और वीडियो देखें">और वीडियो देखें</a>
      </div>
      <style jsx global>{`
        .CN-Sections.dark-box {
          background: #222222;
          padding: 10px 0;
        }
        .CN-Sections.dark-box .CN-heading-1 {
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/cn-heading-bg-2.png);
      }
      .CN-heading-1 {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 18px;
        color: #E1261C;
        padding: 0 0 0 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/cn-heading-bg.png);
        background-repeat: repeat-x;
        background-position: center;
        position: relative;
    }
    .CN-Sections.dark-box .CN-heading-1 .headinner {
      color: #FFCC00;
      background: #222;
      border-bottom-color: #989898;
  }
  .CN-heading-1 .headinner {
      padding: 0 5px;
      border-bottom: 1px dotted #D7D7D7;
  }
  .CN-Sections.dark-box .CN-heading-1 .icon {
    border-color: #ffffff;
}
.CN-heading-1 .icon {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  width: 8px;
  height: 8px;
  -webkit-transform: rotate(-45deg);
  margin-right: 10px;
  z-index: 1;
}
.CN-Sections.dark-box .CN-heading-1:after {
  background: #222;
}
.CN-heading-1:after {
  content: '';
  position: absolute;
  width: 22px;
  height: 19px;
  right: 0;
}
.CN-videosec-h {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px 0;
}
.CN-videosec-h::before {
  content: '';
  position: absolute;
  width: 40px;
  background: #e1261c;
  height: 6px;
  top: 0;
  left: 0;
}
.CN-videosec-h .heading {
  margin-bottom: 5px;
}
.CN-videosec-h .heading a {
  display: block;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
}
.CN-videosec-h .image-box {
  position: relative;
}
.CN-videosec-h .image-box a, .image-box a img {
  display: block;
  width: 100%;
}
.CN-videosec-h .image-box .img-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.CN-videosec-h .image-box a, .image-box a img {
  display: block;
  width: 100%;
}
.CN-video-smallh {
  display: flex;
  overflow-x: auto;
  padding: 10px 10px 0;
}
.CN-Sections.dark-box .CN-morestory-btn {
  color: #FFCC00;
  border-color: #FFCC00;
  background: #0A0A0A;
  font-weight: 600;
  text-align: center;
  display: table;
  border: 2px solid #E1261C;
  text-transform: uppercase;
  margin: 10px auto;
  border-radius: 20px;
  width: 240px;
  font-size: 14px;
    line-height: 14px;
    padding: 7px 8px 5px !important;
    box-sizing: border-box;
}
.CN-video-smallh li {
  flex: 0 0 155px;
  padding-right: 10px;
}
.CN-video-smallh li a {
  display: block;
  border: 1px solid #707070;
  border-radius: 5px;
  overflow: hidden;
  height: 100%;
  background: #111111;
  box-sizing: border-box;
}
.CN-video-smallh li a .image-box {
  border-bottom: 1px solid #707070;
  position: relative;
  width: 155px;
}
.CN-video-smallh li a .image-box .img-icon {
  width: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.CN-video-smallh li a .image-box .img-icon img {
  width: 100%;
}
.CN-video-smallh li a .image-box img {
  display: block;
}
.CN-video-smallh li .caption {
  background: #111111;
  padding: 7px 10px 10px 10px;
}
.CN-video-smallh li .caption p {
  color: #FFFFFF;
}
      `}</style>
    </>
  );
};

export default IplVideos;
