import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { getCompleteURL } from "util/global/Helper";
import { TEXT } from "constant/global/Constant";
import { getArticleList } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";

const HomeNewsGalleryNew = ({
  data,
  isAmp = false,
  heading,
  link = "",
  key
}) => {
  const [videogalleryNews, setVideogellaryNews] = useState(
    data && data.length > 0 ? data : [],
  );
  const [isLoading, setIsLoading] = useState(data && data.length > 0 ? false : true);

  const getData = async () => {
    setIsLoading(true);

    const videogalleryData = await getArticleList({
      count: 6,
      offset: 0,
      fields:
        "story_id,display_headline,title,images,categories,post_type,weburl_r,weburl,intro",
      filter: { post_type: "videos" },
    }, true);

    if (videogalleryData && videogalleryData.length) {
      setVideogellaryNews(videogalleryData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const elm = document?.getElementById(`videoGlide`+key);
      if (elm && !isAmp) {
        new Glide(`#videoGlide`+key, {
          type: "carousel",
          autoplay: 4000,
          perView: 1.5,
          gap: 10,
          slidesToScroll: 1,
          dots: false,
        })?.mount();
      }
    }, 2000);

    if (data && !data.length) {
      getData();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {!isLoading && videogalleryNews && videogalleryNews.length > 0 ? (
        <div className="newvdwdgt">
          <div className="globalhd">
            <h2>
              <a href={link}>{heading}</a>
            </h2>
          </div>

          <div className="newvdwdgt-story">
            <ul className="bigStory">
              <li>
                <a
                  href={getCompleteURL(
                    videogalleryNews?.[0]?.weburl_r,
                    videogalleryNews?.[0]?.weburl,
                  )}
                >
                  <figure>
                    {isAmp ? (                      
                      <LazyLoadImage
                        src={videogalleryNews?.[0]?.images?.url}
                        width="370"
                        height="247"
                        alt={videogalleryNews?.[0]?.display_headline}
                        title={videogalleryNews?.[0]?.display_headline}
                        isAMP={true}
                      />
                    ) : (                      
                      <LazyLoadImage
                        src={videogalleryNews?.[0]?.images?.url}
                        width="370"
                        height="247"
                        alt={videogalleryNews?.[0]?.display_headline}
                        title={videogalleryNews?.[0]?.display_headline}
                    />
                    )}
                  </figure>
                  <h2>{videogalleryNews?.[0]?.display_headline}</h2>
                </a>
              </li>
            </ul>

            <div id={`videoGlide${key}`} className="videoGlide">
              {isAmp ? (
                <ul>
                  {videogalleryNews &&
                    videogalleryNews
                      .slice(1, videogalleryNews?.length)
                      .map((item, index) => {
                        return (
                          <li key={`videosList-` + index}>
                            <a
                              href={getCompleteURL(
                                item?.weburl_r,
                                item?.weburl,
                              )}
                            >
                              <figure>                                
                                <LazyLoadImage
                                  src={item?.images?.url}
                                  width="249"
                                  height="166"
                                  alt={item?.display_headline}
                                  title={item?.display_headline}
                                  isAMP={true}
                                />
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
                    {videogalleryNews &&
                      videogalleryNews
                        .slice(1, videogalleryNews?.length)
                        .map((item, i) => {
                          return (
                            <li key={`videosList-` + i}>
                              <a
                                href={getCompleteURL(
                                  item?.weburl_r,
                                  item?.weburl,
                                )}
                              >
                                <figure>                                  
                                  <LazyLoadImage
                                    src={item?.images?.url}
                                    width="250"
                                    height="150"
                                    alt={item?.display_headline}
                                    title={item?.display_headline}
                                    isAMP={true}
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

              {!isAmp && (
                <div
                  data-glide-el="controls[nav]"
                  className="phnlgblts dflx jstcntr"
                >
                  <button type="button" data-glide-dir="=0"></button>
                  <button type="button" data-glide-dir="=1"></button>
                  <button type="button" data-glide-dir="=2"></button>
                  <button type="button" data-glide-dir="=3"></button>
                </div>
              )}
            </div>
          </div>
          <a
            href={link}
            className="newvdwdgtbtn"
          >
            {TEXT.READ_MORE_VIDEO}
          </a>
        </div>
      ) : (
        ""
      )}

      <style jsx global>{`
        .newvdwdgt {
          padding: 15px 10px;
          background: #212121;
        }
        .newvdwdgt .globalhd {
          border-bottom: 1px solid #585858;
          margin-top: 0px;
        }
        .newvdwdgt .globalhd h2,
        .newvdwdgt .globalhd h2 a {
          color: #fff;
          font-size: 18px;
        }

        .newvdwdgt-story {
        }
        .newvdwdgt-story ul {
        }
        .newvdwdgt-story ul li {
          position: relative;
          background: #000;
          border: 1px solid #5c5c5c;
          box-shadow: 0px 0px 8px #111;
          width: 205px;
          flex-shrink: 0;
          margin-right: 15px;
        }
        .newvdwdgt-story ul li a figure {
          position: relative;
          overflow: hidden;
          line-height: 0;
          border-bottom: 1px solid #5c5c5c;
          ${isAmp ? "" : `height:150px`};
        }
        .newvdwdgt-story ul li a figure:before {
          content: "";
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/newwdgt_video_icon_1654592513.svg)
            top center no-repeat;
          position: absolute;
          width: 32px;
          height: 32px;
          top: 50%;
          left: 50%;
          background-size: 38px;
          margin: -16px 0 0 -16px;
          z-index: 1;
        }
        .newvdwdgt-story ul li a figure img {
          width: 100%;
          height: 150px;
          filter: brightness(0.7);
        }
        .newvdwdgt-story ul li a h2 {
          color: #ffffff;
          text-shadow: 0px 3px 6px #0000004d;
          font-size: 15px;
          line-height: 21px;
          font-weight: bold;
          padding: 10px;
        }
        .newvdwdgt-story .bigStory:nth-child(1) li:nth-child(1) a figure,
        .newvdwdgt-story .bigStory:nth-child(1) li:nth-child(1) a figure img {
          height: auto;
        }

        .newvdwdgt-story .bigStory:nth-child(1) li:nth-child(1) {
          margin-bottom: 15px;
          width: auto;
          margin-right: 0;
        }
        .newvdwdgt-story
          .bigStory:nth-child(1)
          li:nth-child(1)
          a
          figure:before {
          transform: scale(1.5);
        }
        .newvdwdgt-story .bigStory:nth-child(1) li:nth-child(1) a h2 {
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
        .videoGlide ul:nth-child(1) {
          display: flex;
          margin-right: -10px;
        }

        .videoGlide {
          ${isAmp ? `overflow: scroll` : `overflow: hidden`};
          margin-right: -10px;
        }
        .newvdwdgtbtn {
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
        .newvdwdgtbtn:hover {
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

export default HomeNewsGalleryNew;
