import React from "react";
import LazyLoadImage from "components/Common/LazyLoadImage";
import { imageLoader } from "includes/article.util";

const SpecialNews = ({ isAmp = false, NewsData = {} }) => {
  const title = NewsData?.title;
  if (!Object.keys(NewsData).length) {
    return null;
  }
  return (
    <>
      {NewsData.result && NewsData.result.length && (
        <>
          {NewsData.display !== "0" ?
            <>
              {title ?
                <>
                  <div className="globalhd large">
                    <h2>{title}</h2>
                  </div><div className="clearfix"></div></>
                : ""}
              {NewsData['mobileImage'] ? <div className="ayodhyabanner">
                <a href={NewsData['url'] ? NewsData['url'] : ''} className="cricket-poster">
                  {
                    isAmp ?
                      <figure>
                        <amp-img
                          src={NewsData['mobileImage']}
                          alt={NewsData['display_headline'] || NewsData['title'] || ''}
                          title={NewsData['display_headline'] || NewsData['title'] || ''}
                          height={76}
                          width={413}
                          layout="responsive"
                          style={{ width: "100%", height: "76px" }}
                        ></amp-img>
                      </figure>
                      :
                      <img
                        // width={391}
                        // height={76}
                        src={NewsData['mobileImage']}
                        style={{ width: "100%", height: "76px" }}
                        alt={NewsData['display_headline'] || NewsData['title'] || ''}
                        title={NewsData['display_headline'] || NewsData['title'] || ''}
                        unoptimized={true}
                        className={"globalmgbox"}
                        loading="lazy"
                      />
                  }
                </a>
              </div> : ""}
            </> : ''}
          <ul className="ayodhyaspecial-slider">
            {
              NewsData.result.map((eachData, index) => {
                return index < 2 ? (
                  <li key={index}>
                    <a href={eachData['url'] ? eachData['url'] : ''}>
                      {
                        isAmp ?
                          <figure>
                            <amp-img
                              src={eachData['thumbnail'] ? imageLoader(eachData['thumbnail'], 185, 123) : ''}
                              alt={eachData['display_headline'] || eachData['title'] || ''}
                              title={eachData['display_headline'] || eachData['title'] || ''}
                              width={185}
                              height={123}
                              layout="responsive"
                            ></amp-img>
                          </figure>
                          :
                          <LazyLoadImage
                            width={185}
                            height={123}
                            src={eachData['thumbnail'] ? imageLoader(eachData['thumbnail'], 185, 123) : ''}
                            alt={eachData['display_headline'] || eachData['title'] || ''}
                            title={eachData['display_headline'] || eachData['title'] || ''}
                            unoptimized={true}
                            isRes={true}
                            className={"globalmgbox"}
                          />
                      }
                      <h3>{eachData['display_headline'] || eachData['title']}</h3>
                    </a>
                  </li>
                ) : index < 4 ? (
                  <li key={index}>
                    <a href={eachData['url'] ? eachData['url'] : ''}>
                      <h3>{eachData['display_headline'] || eachData['title']}</h3>
                    </a>
                  </li>
                ) : '';
              })
            }
          </ul>
          <a href={NewsData['url'] ? NewsData['url'] : ''} className="aurparhenbtn">और भी पढ़ें</a>
          <style jsx global>{`
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
        .cricket-poster figure {
          width: auto  ${!isAmp ? '!important' : ''};
          height: auto  ${!isAmp ? '!important' : ''};
        }
        .cricket-poster figure div:first-child {
          background: transparent  ${!isAmp ? '!important' : ''};
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
          margin-top:10px;
        }
        .ayodhyaspecial-slider li {
          ${!isAmp ? 'border-radius: 10px;' : ''}
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
          ${!isAmp ? 'border-radius: 10px;' : ''}
          overflow: hidden;
          border: 1px solid #e3e3e3;
          width: 48%;
          position: relative;
          box-sizing: border-box;
        }
        .ayodhyaspecial-slider li:nth-child(3), .ayodhyaspecial-slider li:nth-child(4) {
          width: 100%;
          border: none;
          border-bottom: 1px solid #e3e3e3;
          padding-left: ${isAmp ? '12px' : '16px'};
        }
        .ayodhyaspecial-slider li:nth-child(3):before, .ayodhyaspecial-slider li:nth-child(4):before {
          content: "";
          width: ${isAmp ? '4px' : '6px'};
          height: ${isAmp ? '4px' : '6px'};
          border-top: 2px solid #ed1c24;
          border-left: 2px solid #ed1c24;
          position: absolute;
          top: ${isAmp ? '18px' : '15px'};
          transform: rotate(135deg);
          left: 5px;
        }
        ${!isAmp ? `
        .ayodhyaspecial-slider li a h3 {
          padding: 10px;
          color: #111;
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
        }
        .ayodhyaspecial-slider li:nth-child(4) {
          border-bottom: none;
        }` : ''}
        .hd_heading{
          padding: 10px;
          border-bottom: 1px solid #222;
          margin: 10px 0;
        }
          `}</style>
        </>
      )}
    </>
  )
};

export default SpecialNews;
