import React, { useEffect } from "react";
// import getConfig from "next/config";
import { imageLoader } from "includes/article.util";
import Glide from "@glidejs/glide";
import LazyImage from "components/Common/LazyImage";

// const { publicRuntimeConfig } = getConfig();
// const isAmp = false;
const HomeTopNews = ({ data, isAmp = false }) => {
  useEffect(() => {
    setTimeout(() => {
      const elm = document?.getElementById(`topNewsGlide`);
      if (elm && !isAmp) {
        new Glide(`#topNewsGlide`, {
          type: "carousel",
          autoplay: 4000,
          perView: 1.5,
          gap: 10,
          slidesToScroll: 1,
          dots: false,
        })?.mount();
      }
    }, 2000);
  }, []);

  return (
    <>
      <div className="newtdwdgt">
        <div className="globalhd">
          <h2>
            <a href="/news/">
              टॉप <span> न्यूज़</span>
            </a>
          </h2>
        </div>

        <div className="newtdwdgt-story">
          <ul className="bigStory">
            <li>
              <a href={!isAmp ? data?.[0]?.weburl_r : data?.[0]?.weburl || ""}>
                <figure>
                  {isAmp ? (
                    <amp-img
                      width="370"
                      height="247"
                      alt="A view of the sea"
                      src={
                        data?.[0]?.images.url
                          ? imageLoader(data?.[0]?.images.url, 370, 247)
                          : ""
                      }
                      layout="responsive"
                    ></amp-img>
                  ) : (
                    <LazyImage
                      src={
                        data?.[0]?.images.url
                          ? imageLoader(data?.[0]?.images.url, 372, 223)
                          : ""
                      }
                      width={372}
                      height={223}
                      alt={data?.[0]?.display_headline}
                      title={data?.[0]?.display_headline}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=372&height=223";
                      }}
                      loading="lazy"
                    />
                  )}
                </figure>
                <h2>{data?.[0]?.display_headline}</h2>
              </a>
            </li>
          </ul>

          <div id="topNewsGlide">
            {isAmp ? (
              <ul>
                {data &&
                  data.slice(1, data?.length).map((item, index) => {
                    return (
                      <li key={index}>
                        <a href={!isAmp ? item?.weburl_r : item?.weburl || ""}>
                          <figure>
                            <amp-img
                              width="249"
                              height="166"
                              src={
                                item?.images.url
                                  ? imageLoader(item?.images.url, 370, 247)
                                  : ""
                              }
                              alt={item?.display_headline || ""}
                              title={item?.display_headline || ""}
                              layout="responsive"
                            ></amp-img>
                          </figure>
                          <h2>{item?.display_headline}</h2>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <div data-glide-el="track">
                <ul>
                  {data &&
                    data.slice(1, data?.length).map((item, index) => {
                      return (
                        <li key={index}>
                          <a href={item?.weburl_r || item?.weburl}>
                            <figure>
                              <LazyImage
                                src={
                                  item?.images.url
                                    ? imageLoader(item?.images.url, 250, 150)
                                    : ""
                                }
                                width={250}
                                height={150}
                                alt={item?.display_headline || ""}
                                title={item?.display_headline || ""}
                                loading="lazy"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=372&height=223";
                                }}
                              />
                            </figure>
                            <h2>{item?.display_headline}</h2>
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {!isAmp ? (
              <div
                data-glide-el="controls[nav]"
                className="phnlgblts dflx jstcntr"
              >
                <button type="button" data-glide-dir="=0"></button>
                <button type="button" data-glide-dir="=1"></button>
                <button type="button" data-glide-dir="=2"></button>
                <button type="button" data-glide-dir="=3"></button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <a href="/news/" className="newtdwdgtbtn">
          अधिक पढ़ें
        </a>
      </div>

      <style jsx global>{`
        .newtdwdgt {
          padding: 15px 10px;
          background: #f5f5f5;
        }
        .newtdwdgt .globalhd h2,
        .newtdwdgt .globalhd h2 a {
          color: #000;
          font-size: 18px;
        }
        .newtdwdgt .globalhd h2 a span {
          color: red;
          font-size: 18px;
        }
        .newtdwdgt-story .bigStory:nth-child(1) li:nth-child(1) {
          min-height: 227px;
        }

        .newtdwdgt .globalhd {
          border-bottom: 1px solid #585858;
          padding-bottom: 8px;
          position: relative;
          margin-bottom: 8px;
        }
        .newtdwdgt .globalhd::after {
          content: "";
          width: 25px;
          height: 4px;
          position: absolute;
          bottom: -2px;
          left: 0px;
          background: rgb(237, 28, 36);
        }
        .newtdwdgt-story {
        }
        .newtdwdgt-story ul {
        }
        .newtdwdgt-story ul li {
          position: relative;
          background: #000;
          border: 1px solid #5c5c5c;
          box-shadow: 0px 0px 8px #111;
          width: 205px;
          flex-shrink: 0;
          margin-right: 15px;
        }
        .newtdwdgt-story ul li a figure {
          position: relative;
          overflow: hidden;
          line-height: 0;
          border-bottom: 1px solid #5c5c5c;
          ${isAmp ? "" : `height:150px`};
        }

        .newtdwdgt-story ul li a figure img {
          width: 100%;
          height: 150px;
          filter: brightness(0.7);
        }
        .newtdwdgt-story ul li a h2 {
          color: #ffffff;
          text-shadow: 0px 3px 6px #0000004d;
          font-size: 15px;
          line-height: 21px;
          font-weight: bold;
          padding: 10px;
        }
        .newtdwdgt-story .bigStory:nth-child(1) li:nth-child(1) a figure,
        .newtdwdgt-story .bigStory:nth-child(1) li:nth-child(1) a figure img {
          height: auto;
        }

        .newtdwdgt-story .bigStory:nth-child(1) li:nth-child(1) {
          margin-bottom: 15px;
          width: auto;
          margin-right: 0;
          min-height: 227px;
        }
        .newtdwdgt-story
          .bigStory:nth-child(1)
          li:nth-child(1)
          a
          figure:before {
          transform: scale(1.5);
        }
        .newtdwdgt-story .bigStory:nth-child(1) li:nth-child(1) a h2 {
          font-size: 16px;
          line-height: 20px;
          position: absolute;
          bottom: 0;
          background: transparent
            linear-gradient(180deg, #00000000 0%, #000000 100%) 0% 0% no-repeat
            padding-box;
          left: 0;
          right: 0;
          padding: 100px 10px 10px 10px;
        }
        #topNewsGlide ul:nth-child(1) {
          display: flex;
          // overflow: scroll;
          margin-right: -10px;
        }

        #topNewsGlide {
          ${isAmp ? `overflow: scroll` : `overflow: hidden`};
          margin-right: -10px;
        }
        .newtdwdgtbtn {
          background: #e1261d;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #ffffff;
          border-radius: 15px;
          height: 30px;
          line-height: 30px;
          font-weight: bold;
          color: #fff;
          font-size: 14px;
          display: table;
          margin: 20px auto 0px auto;
          padding: 0px 15px;
        }
        .newtdwdgtbtn:hover {
          color: #fff;
        }

        .trnd_ctrls {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 15px;
        }
        .trnd_ctrls .glide__bullets {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin: 0 30px 3px 30px;
        }
        .trnd_ctrls .glide__bullets .glide__bullet {
          width: 5px;
          height: 5px;
          background: #bababa;
          border: none;
          border-radius: 100%;
          margin: 0 5px 0px 5px;
        }
        .trnd_ctrls .glide__bullets .glide__bullet.glide__bullet--active {
          width: 18px;
          background: #e1261d;
          border-radius: 20px;
        }
        .trnd_ctrls .controls {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default HomeTopNews;
