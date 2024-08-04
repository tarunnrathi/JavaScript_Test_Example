import React from "react";
import LazyImage from "components/Common/LazyImage";

const RhsVideoCard = ({ playlist, videoTitle }) => {
  let playlist1=[];
  let title;
  if(playlist.stories) {
    playlist1 =playlist.stories;
    title = playlist;
  }else{
    playlist1 = playlist;
    title = videoTitle;
  }
  return (
    <>
      <div className="trading_news">
        <h3 className="trading_title">
          <a href={`/videos/${title.slug}`}>{title.title}</a>
        </h3>
        <ul className="all_news">
          {playlist1.map((story) => (
            <>
              <li key={`${story.id}-${story.title}`}>
                <a href={story.url} target="_blank" className="dflex_trading">
                  <LazyImage
                    width={135}
                    height={74}
                    src={story.thumbnail}
                    alt={story.title}
                    title={story.title}
                    isRes={false}
                    isSmartPlayer={false}
                  />
                  <div className="trading_title_div">
                    <p>{story.title}</p>
                  </div>
                </a>
              </li>
            </>
          ))}
        </ul>
        <a
          href={`/videos/${title.slug}`}
          target="_blank"
          className="read_more_links"
        >
          और भी देखें<div className="arrows"></div>
        </a>
      </div>
      <style jsx global>{`
       
        .trading_news {
          width: 100%;
          padding-top: 20px;
          margin-bottom: 30px;
        }
        .trading_title {
          padding-top: 20px;
          letter-spacing: 0px;
          color: #e0261d;
          font-size: 24px;
          font-weight: bold;
          padding-bottom: 10px;
        }
        .trading_title a {
          color: #e0261d;
        }
        ul.all_news {
          width: 100%;
          border-bottom: 1px solid rgba(112, 112, 112, 0.3);
          padding-bottom: 10px;
        }
        ul.all_news li {
          margin-bottom: 10px;
        }
        a.dflex_trading {
          display: flex;
        }
        a.dflex_trading figure {
          width: 134px;
          height: 74px;
        }
        a.dflex_trading figure img {
          width: 100%;
          border-radius: 6px;
          height: 100%;
          object-fit: cover;
        }
        a.dflex_trading figure img {
          -webkit-transform: scale(1);
          transform: scale(1);
          -webkit-transition: 0.3s ease-in-out;
          transition: 0.3s ease-in-out;
        }
        a.dflex_trading figure:hover img {
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
          border-radius: 8px;
        }
        .img_hover {
          overflow: hidden;
          border-radius: 8px;
        }
        .trading_title_div {
          width: calc(100% - 134px);
          letter-spacing: 0px;
          color: #333333;
          font-size: 14px;
          line-height: 19px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 55px;
          font-weight: 600;
          padding-left: 10px;
        }
        ul.all_news li:hover p {
          color: #e1261d;
        }
        .read_more_links {
          display: block;
          font-size: 14px;
          line-height: 19px;
          font-family: "Noto Sans", devanagari;
          font-weight: 500;
          color: #eb3d3c;
          margin: 10px auto;
          width: 130px;
          position: relative;
          letter-spacing: -0.28px;
          text-align: center;
          cursor: pointer;
        }
        .read_more_links .arrows {
          position: absolute;
          top: 10px;
          right: 15px;
          width: 12px;
          height: 1px;
          background-color: #eb3d3c;
        }
        .read_more_links .arrows:before,
        .read_more_links .arrows:after {
          content: "";
          position: absolute;
          width: 7px;
          height: 1px;
          top: -2px;
          right: -1px;
          background-color: #eb3d3c;
          transform: rotate(45deg);
        }
        .read_more_links .arrows:after {
          top: 2px;
          transform: rotate(-45deg);
        }
      `}</style>
    </>
  );
};
export default RhsVideoCard;
