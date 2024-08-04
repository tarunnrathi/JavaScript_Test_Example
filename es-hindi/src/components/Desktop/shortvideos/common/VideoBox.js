import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import initialState from "GlobalStore";
import { imageLoader, setDefaultImage } from 'includes/article.util';

const VideoBox = ({ singleD = {}, index }) => {
  useEffect(() => {
    if (singleD?.value?.length > 4) {
      const elm = document?.getElementById(`glide_slider_${index}`);

      if (elm) {
        new Glide(`#glide_slider_${index}`, {
          // autoplay: 1000,
          type: "carousel",
          perView: 4,
          slidesToScroll: 1,
          gap: 10,
        }).mount();
      }
    }
  }, []);
  return (
    <>
      {singleD?.value && singleD?.value?.length ? (
        <div className="videobox">
          <h2 className="V-heading">{singleD?.name} शॉर्ट वीडियो</h2>
          <div id={`glide_slider_${index}`} className={`glide_slider`}>
            {singleD?.value?.length > 4 && (
              <div data-glide-el="controls" className="arrow-v">
                <a data-glide-dir="<">
                  <img src="/images/shortVideos/Previous.png" />
                </a>
                <a data-glide-dir=">">
                  <img src="/images/shortVideos/Next.png" />
                </a>
              </div>
            )}

            <div data-glide-el="track">
              <ul className="tag-listing-new">
                {singleD?.value?.length &&
                  singleD?.value?.map((item) => {
                    return (
                      <li>
                        <a href={item.url}>
                          <figure>
                          <img src={imageLoader(item?.thumbnail, 220, 300, true)}
                          title={item?.display_headline|| ''}
                          onError={(event) => {setDefaultImage(event, 52, 52);}} ></img>

                            {/* <img
                              src={item?.thumbnail}
                              width="205"
                              height="364"
                              title={item?.display_headline}
                              className=""
                              loading="lazy"
                            /> */}
                          </figure>
                          <figurecaption>
                            <h2 className="story-title">
                              <span className="">
                                NEWS18 HINDI
                                {/* {singleD?.slug === "/" ? (
                                  ""
                                ) : (
                                  <span className="sit_cat">hello</span>
                                )} */}
                                <span className="sit_cat"></span>
                                {singleD?.slug === "/"
                                  ? item?.category?.length > 1
                                    ? initialState?.cats?.[item?.category[1]] ||
                                      item?.category[1]
                                    : initialState?.cats?.[item?.category[0]] ||
                                      item?.category[0]
                                  : singleD?.name}
                              </span>
                              {item?.display_headline || item?.title}
                            </h2>
                          </figurecaption>
                          <a className="video-play-button" href="#">
                            {" "}
                            <span></span>
                          </a>
                        </a>
                      </li>
                    );
                  })}
              </ul>

              {singleD.value?.length > 4 && (
                <div className="g__bullets" data-glide-el="controls[nav]">
                  <button className="" data-glide-dir="=0"></button>
                  <button className="" data-glide-dir="=1"></button>
                  <button className="" data-glide-dir="=2"></button>
                  <button className="" data-glide-dir="=3"></button>
                  <button className="" data-glide-dir="=4"></button>
                  <button className="" data-glide-dir="=5"></button>
                </div>
              )}
            </div>
          </div>
          {index !== 0 ? (
            <a
              href={`/short-videos/${singleD?.section}`}
              className="readmorebtn"
            >
              <span>और {singleD?.name} शॉर्ट वीडियो देखें</span>
            </a>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default VideoBox;
