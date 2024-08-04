import LazyLoadImage from "components/Common/CustomImage";
import React from "react";
const IPLTopStories = ({ topNewsStoryData }) => {
  return (
    <>
      <ul className="ipl-topstories">
        {topNewsStoryData.map((data, index) =>
          index === 0 ? (
            <li key={data?.id || index}>
              <a href={data.weburl_r}>
                  <LazyLoadImage
                    src={data?.images?.url || ""}
                    alt={data.display_headline}
                    width={422}
                    height={280}
                  />
                <div className="ipl-topstories-intro">
                  <h2 className="heading-1">{data.display_headline}</h2>
                  <p>{data.intro}</p>
                </div>
              </a>
            </li>
          ) : (
            <li key={data.id || index}>
              <a href={data.weburl_r}>
                  <LazyLoadImage
                    src={data?.images?.url || ""}
                    alt={data.display_headline}
                    width={110}
                    height={75}
                  />
                <div className="ipl-topstories-intro">
                  <h2 className="heading-1">{data.display_headline}</h2>
                </div>
              </a>
            </li>
          )
        )}
      </ul>
      <a href="/cricket/ipl/news/" className="iplmorebtn">
        <span>और खबरें</span>
      </a>
      <style jsx global>{`
        .iplmorebtn:hover {
          filter: grayscale(1);
        }
        .iplmorebtn span {
          position: relative;
          color: #eb3d3c;
          font-size: 15px;
          padding-right: 18px;
          font-weight: bold;
        }
        .iplmorebtn {
          display: block;
          text-align: center;
          margin-top: 20px;
        }
        .ipl-topstories-intro p {
          max-height: 90px;
          overflow: hidden;
        }
        .ipl-topstories {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(2, 1fr);
        }
        .ipl-topstories li:first-child {
          grid-column: 1/2;
          grid-row: 1/6;
          margin-left: 0px;
          border: none;
        }
        .ipl-topstories li {
          border-bottom: 1px dotted #e2e2e2;
          padding-bottom: 8px;
          margin-left: 10px;
        }
        .ipl-topstories li:first-child a {
          display: block;
        }
        .ipl-topstories li:first-child a figure {
          border-radius: 10px;
          width: 100%;
          margin-right: 0px;
        }
        .ipl-topstories li a figure {
          position: relative;
          line-height: 0;
          overflow: hidden;
          border-radius: 6px;
          width: 110px;
          flex-shrink: 0;
          margin-right: 15px;
        }
        .ipl-topstories li a {
          display: flex;
        }
        .ipl-topstories li:first-child .ipl-topstories-intro {
          background: #f5f5f5;
          border-radius: 0 0 10px 10px;
          padding: 0px;
          width: 95%;
          margin: auto;
          margin-left: 0px;
        }
        .ipl-topstories-intro {
          width: 100%;
          box-sizing: border-box;
        }
        .ipl-topstories li:first-child .ipl-topstories-intro h2 {
          font-size: 25px;
          line-height: 31px;
          color: #000;
          font-weight: 500;
        }
        .ipl-topstories-intro h2,
        .ipl-topstories-intro h3 {
          font-size: 16px;
          color: #666666;
          line-height: 26px;
          font-weight: normal;
          margin-left: 10px;
        }
        .ipl-topstories-intro p {
          max-height: 90px;
          overflow: hidden;
          margin-left: 10px;
        }
        .ipl-topstories-intro p {
          font-size: 14px;
          color: #666666;
          line-height: 22px;
          margin-top: 5px;
        }
        .ipl-topstories li:hover .ipl-topstories-intro h1,
        .ipl-topstories li:hover .ipl-topstories-intro h2 {
          color: #e1261d;
        }
        .ipl-topstories-intro h2,
        .ipl-topstories-intro h3 {
          font-size: 16px;
          color: #666666;
          line-height: 26px;
          font-weight: normal;
        }
      `}</style>
    </>
  );
};
export default IPLTopStories;