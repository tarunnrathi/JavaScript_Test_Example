import React from "react";
import getConfig from "next/config";
import LazyLoadImage from "components/Common/CustomImage";
import { imageLoader, DynamicBanner } from "includes/article.util";

const { publicRuntimeConfig } = getConfig();

const CricketNews = ({ isAmp = false, NewsData = {}, banner }) => {
  return (
    <>
      {NewsData && NewsData.length ? (
        <>
          <div className={isAmp ? `globalhd` : `globalhd clearfix`}>
            <h2>
              <a href={publicRuntimeConfig.siteUrl +'amp/cricket/'}>क्रिकेट</a>
            </h2>
          </div>
          <div>
            <DynamicBanner data={banner} obkey={"On-Cricket-Widget"} isMobile={true}/>
          </div>
          <ul className="ayodhyaspecial-slider">
            {
              NewsData.map((eachData, index) => {
                const title = eachData?.display_headline || eachData?.headline;
                const images = eachData?.images?.url;
                const weburl = eachData?.weburl;
                return index < 2 ? (
                  <li key={index}>
                    <a href={weburl ? weburl.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl+`${isAmp ? "amp/" : ''}`) : ''}>
                      {
                        isAmp ?
                          <figure>
                            <LazyLoadImage
                              src={images}
                              width={185}
                              height={123}
                              alt={title}
                              title={title}
                              //data-hero=""
                              isAMP={true}
                          />
                            {/* <amp-img
                                src={images ? imageLoader(images, 185, 123) : ''}
                                alt={title}
                                title={title}
                                width={185}
                                height={123}
                                layout="responsive"
                            ></amp-img> */}
                          </figure>
                        :
                          <LazyLoadImage
                            width={185}
                            height={123}
                            src={images ? imageLoader(images, 185, 123) : ''}
                            alt={title}
                            title={title}
                            className={"globalmgbox"}
                          />
                      }
                      <h3>{title}</h3>
                    </a>
                  </li>
                ) : index < 4 ? (
                  <li key={index}>
                    <a href={weburl ? weburl.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl+`${isAmp ? "amp/" : ''}`) : ''}>
                      <h3>{title}</h3>
                    </a>
                  </li>
                ) : '';
              })
            }
          </ul>
          <a href={publicRuntimeConfig.siteUrl + "news/sports/cricket/"} className="aurparhenbtn">और भी पढ़ें</a>
        </>
        ) : null}
      <style jsx global>{`
        #cricket-dhamal-banner {
          width: 100%;
        }
        .expand {
          left: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          max-width: 100vw;
          right: 50%;
          width: 100vw;
          position: relative;
        }
        .anchor-block{ width: 100%; }

        .cricket-poster {
          width: 100%;
        }
        .globalhd {
          border-bottom: 1px solid #001536;
          position: relative;
          display: flex;
          width: 100%;
          padding-bottom: 5px;
          margin-bottom: 10px;
          ${isAmp ? "font-family: Khand;" : "margin-top: 20px;"}
        }
        .clearfix {
          clear: both;
        }
        .clearfix::after, .clearfix::before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .globalhd:before {
          content: "";
          width: 15px;
          height: 3px;
          background: #ed1c24;
          position: absolute;
          left: 0;
          bottom: -2px;
          ${isAmp ? "visibility: visible;" : ""}
        }
        .clearfix::after, .clearfix::before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .globalhd h2 {
          color: #001536;
          font-size: 20px;
          font-weight: 700;
          display: inline-block;
          flex-shrink: 0;
          line-height: 20px;
        }
        .globalhd h2 a {
          color: #001536;
        }
        .cricket-poster figure {
          width: auto ${!isAmp ? '!important' : ''};
          height: auto ${!isAmp ? '!important' : ''};
        }
        .cricket-poster figure div:first-child {
          background: transparent ${!isAmp ? '!important' : ''};
        }
        .cricket-news-skeleton .ayodhyaspecial-slider li:nth-child(3):before, 
        .cricket-news-skeleton .ayodhyaspecial-slider li:nth-child(4):before {
          display : none;
        }
        .cricket-news-skeleton .ayodhyaspecial-slider li:nth-child(3),
        .cricket-news-skeleton .ayodhyaspecial-slider li:nth-child(4) {
          padding-left : 0;
        }
        .cricket-news-skeleton .ayodhyaspecial-slider {
          margin : 10px 0 40px 0;
        }
        .cricket-news-skeleton .ayodhyaspecial-slider li {
          margin : 5px 0;
        }
        .news-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 481px;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
          margin-bottom: 25px;
        }
        .cricket-loader {
          height: 476px;
        }
        .ayodhyabanner {
          display: flex;
          justify-content: center;
          line-height: 0;
          border-bottom: 2px solid #eee;
          margin-bottom: 15px;
          position: relative;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .ayodhyabanner img {
          width: 100%;
        }
        .ayodhyaspecial-slider {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .ayodhyaspecial-slider li {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e3e3e3;
          width: 48%;
          position: relative;
          box-sizing: border-box;
        }
        .ayodhyaspecial-slider li a figure {
          width: 100%;
          line-height: 0;
        }
        .ayodhyaspecial-slider li a h3 {
          padding: 10px;
          color: #111;
          ${isAmp ? `
          font-size: 16px;
          line-height: 21px;
          font-weight: bold;` : `
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;`}
        }
        .ayodhyaspecial-slider li {
          overflow: hidden;
          border: 1px solid #e3e3e3;
          width: 48%;
          position: relative;
          box-sizing: border-box;
          ${isAmp ? "" : "border-radius: 10px;"}
        }
        .ayodhyaspecial-slider li:nth-child(3), .ayodhyaspecial-slider li:nth-child(4) {
          width: 100%;
          border: none;
          border-bottom: 1px solid #e3e3e3;
          padding-left: ${isAmp ? "12px" : "16px"};
        }
        .ayodhyaspecial-slider li:nth-child(3):before, .ayodhyaspecial-slider li:nth-child(4):before {
          content: "";
          width: ${isAmp ? "4px" : "6px"};
          height: ${isAmp ? "4px" : "6px"};
          border-top: 2px solid #ed1c24;
          border-left: 2px solid #ed1c24;
          position: absolute;
          top: ${isAmp ? "18px" : "15px"};
          transform: rotate(135deg);
          left: 5px;
        }
        ${isAmp ? `
        .globalhd {
          font-family: Khand;
        }` : `
        .ayodhyaspecial-slider li a h3 {
          padding: 10px;
          color: #111;
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
        }
        .ayodhyaspecial-slider li:nth-child(4) {
          border-bottom: none;
        }`}
      `}</style>
    </>
  );
};

export default CricketNews;
