import React from "react";
import getConfig from "next/config";
import LazyImage from "components/Common/LazyImage";
import Skeleton from "react-loading-skeleton";
import { imageLoader } from "includes/article.util";
import Slider from "react-slick";

const { publicRuntimeConfig } = getConfig();

const HomeNewsCartoon = ({ isAmp = false, News: NewsData = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <>
      {NewsData.length ? (
        <>
          <div className="cartoonwrap" role="toolbar">
            <div className="cartoonhd">
              <a
                href={
                  publicRuntimeConfig.siteUrl + "photogallery/cartoon-corner/"
                }
              >
                कार्टून कॉर्नर
              </a>
            </div>
            <ul className="cartoonsslider">
              <Slider {...settings}>
                {NewsData.map((eachNews, i) => {
                  const title = eachNews.display_headline || eachNews.headline;
                  return (
                    <li className="slick-slide" key={i}>
                      <a
                        href={
                          eachNews?.weburl
                            ? eachNews?.weburl.replace(
                                "https://hindi.news18.com/",
                                publicRuntimeConfig.siteUrl +
                                  `${isAmp ? "amp/" : ""}`
                              )
                            : ""
                        }
                      >
                        {isAmp ? (
                          <figure>
                            <amp-img
                              width={360}
                              height={240}
                              src={imageLoader(eachNews?.images.url, 360, 240)}
                              alt={title}
                              title={title}
                              layout="responsive"
                            ></amp-img>
                          </figure>
                        ) : (
                          <LazyImage
                            width={360}
                            height={240}
                            src={imageLoader(eachNews?.images.url, 360, 240)}
                            alt={title}
                            title={title}
                            unoptimized={true}
                            isRes={true}
                            className={"globalmgbox"}
                          />
                        )}
                        <h3>{title}</h3>
                      </a>
                    </li>
                  );
                })}
              </Slider>
            </ul>
          </div>
        </>
      ) : (
        <>{!isAmp ? <Skeleton height={367} /> : ""}</>
      )}
      <style jsx global>{`
        .news-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
          margin-bottom: 25px;
        }
        .cartoon-loader {
          height: 367px;
        }
        .cartoonwrap {
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/cartoonbg.jpg);
          background-size: cover;
          ${isAmp
            ? `
          margin-right: -15px;
          margin-left: -15px;
          margin-bottom: 30px;`
            : `
          margin-right: -10px;
          margin-left: -10px;`}
        }
        .cartoonhd {
          color: #001536;
          font-size: 18px;
          font-weight: 700;
          line-height: 20px;
          padding: 20px 0 10px 10px;
          position: relative;
        }
        .cartoonhd:before {
          content: "";
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/cartoonicon.png)
            0 0 no-repeat;
          width: 35px;
          height: 70px;
          background-size: 35px;
          position: absolute;
          top: -11px;
          left: 94px;
        }
        .cartoonhd a {
          color: #001536;
        }
        .cartoonsslider {
          overflow: hidden;
          padding: 0 10px;
          margin: 10px 0;
          width: 100%;
          box-sizing: border-box;
        }
        .cartoonsslider li {
          position: relative;
        }
        .cartoonsslider li h3 {
          ${isAmp
            ? `
          font-size: 18px;
          font-weight: bold;`
            : `
          font-size: 16px;
          font-weight: 400;
          padding: 10px 10px 8px 10px;
          background: linear-gradient(2deg,#000,transparent);`}
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          line-height: 24px;
          overflow: hidden;
          color: #fff;
          text-shadow: 0 0 2px rgb(0 0 0 / 30%);
          ${isAmp
            ? `
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent,#111,#000);
          background: -webkit-linear-gradient(transparent,#111,#000);
          background: -moz-linear-gradient(transparent,#111,#000);
          padding: 45px 20px 10px;`
            : ""}
        }
        .cartoonwrap {
          background: url("//images.news18.com/static_news18/pix/ibnhome/news18/cartoonbg.jpg");
          background-size: cover;
          margin-right: -10px;
          margin-left: -10px;
        }
        .cartoonhd {
          color: #001536;
          font-size: 18px;
          font-weight: bold;
          line-height: 20px;
          padding: 20px 0 10px 10px;
          position: relative;
        }
        .cartoonhd a {
          color: #001536;
        }
        .cartoonhd:before {
          content: "";
          background: url("//images.news18.com/static_news18/pix/ibnhome/news18/cartoonicon.png")
            0 0 no-repeat;
          width: 35px;
          height: 70px;
          background-size: 35px;
          position: absolute;
          top: -11px;
          left: 94px;
        }
        .cartoonsslider {
          overflow: hidden;
          padding: 0 10px;
          margin: 10px 0;
          width: 100%;
          box-sizing: border-box;
        }
        .cartoonsslider .slick-list {
          overflow: hidden;
          width: 100%;
        }
        .cartoonsslider li {
          position: relative;
        }
        .cartoonsslider li h3 {
          ${!isAmp
            ? "font-size: 16px;  font-weight: normal; padding: 10px 10px 8px 10px;"
            : ""} /*background: -webkit-linear-gradient(transparent, #000);*/ background:linear-gradient(2deg, black, transparent);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          line-height: 24px;
          overflow: hidden;
          color: #fff;
          text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
        }
        .cartoonsslider .slick-track {
          display: flex;
        }
        .cartoonsslider .slick-dots {
          display: flex;
          justify-content: center;
          padding: 15px 0;
          bottom: -30px;
        }
        .cartoonsslider .slick-dots li {
          width: 10px ${!isAmp ? "!important" : ""};
          height: 10px;
          border-radius: 100%;
          border: 1px solid #2c2c2c;
          margin: 0 3px;
          padding: 0px;
        }
        .cartoonsslider .slick-dots li button {
          display: none ${!isAmp ? "!important" : ""};
        }
        .cartoonsslider .slick-dots li.slick-active {
          background: #2c2c2c;
        }
        .cartoonsslider .slick-dots {
          display: flex ${!isAmp ? "!important" : ""};
          flex-direction: row;
        }
        .cartoonsslider .slick-dots li {
          width: 12px ${!isAmp ? "!important" : ""};
          height: 12px;
          border-radius: 100%;
          border: 1px solid #2c2c2c;
          margin: 0 3px;
          padding: 0;
        }
        ${!isAmp
          ? `
        .cartoonsslider .slick-slider {
          margin-bottom: 15px;
        }`
          : ""}
        .cartoonsslider .slick-dots {
          position: static;
          padding: 0;
        }
        .cartoonsslider,
        .cartoonsslider .slick-list {
          overflow: ${isAmp ? "scroll" : "hidden"};
        }
        .cartoonsslider .slick-dots li {
          display: ${isAmp ? "none" : "block"};
        }
      `}</style>
    </>
  );
};

export default HomeNewsCartoon;
