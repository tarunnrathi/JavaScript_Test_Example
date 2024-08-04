import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/LazyLoadImage";

const VideosSlider = (props) => {
  const dataArraySecond = props.initialData;
  const { keyNum } = props;
  const indexNum = props.index;
  useEffect(() => {
    props.isMobile == false
      ? new Glide(".story_slider_" + keyNum + "_" + indexNum, {
          perView: 4,
          draggable: false,
          type: "slider",
          rewind: false,
          bound: "false",
        }).mount()
      : new Glide(".story_slider_" + keyNum + "_" + indexNum, {
          perView: 2,
          gap: 5,
          slidesToShow: 1,
          peek: { before: 0, after: 80 },
          draggable: true,
        }).mount();
  }, []);

  if (!props.initialData) {
    return false;
  }

  return (
    <>
      <h2 className="sub_title">
        <a
          href={
            "/videos/" + props.channelSlug + "/" + dataArraySecond["slug"] + "/"
          }
        >
          {dataArraySecond["title"]}
        </a>
      </h2>
      <div
        className={
          "story_section_slider story_slider_" + keyNum + "_" + indexNum
        }
      >
        <div className="glide__track" data-glide-el="track">
          <div className="glide__slides">
            {dataArraySecond["stories"].map((storyArraySecond, index) => (
              <div className="story_section_row">
                <a href={storyArraySecond["url"]}>
                  <figure>
                    <LazyLoadImage
                      lazyLoad={true}
                      width={127}
                      height={120}
                      src={storyArraySecond["thumbnail"]}
                      alt={storyArraySecond["title"]}
                      title={storyArraySecond["title"]}
                    />
                    {/* <img
                      loading="lazy"
                      className="lazy"
                      src={storyArraySecond["thumbnail"]}
                      alt={storyArraySecond["title"]}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=200&height=120";
                      }}
                      height={120}
                    /> */}
                    <figcaption>
                      <h2 className="story_title">
                        {storyArraySecond["title"]}
                      </h2>
                    </figcaption>
                  </figure>
                </a>
              </div>
            ))}
          </div>
          {dataArraySecond["stories"].length > 4 ? (
            <div className="glide__arrows" data-glide-el="controls">
              <button
                className="glide__arrow glide__arrow--left"
                data-glide-dir="<"
              >
                prev
              </button>
              <button
                className="glide__arrow glide__arrow--right"
                data-glide-dir=">"
              >
                next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>{" "}
      <a
        href={
          "/videos/" + props.channelSlug + "/" + dataArraySecond["slug"] + "/"
        }
        target="_blank"
        className="read_more_links"
      >
        {" "}
        और भी देखें
        <div className="arrows"></div>
      </a>
    </>
  );
};

export default VideosSlider;
