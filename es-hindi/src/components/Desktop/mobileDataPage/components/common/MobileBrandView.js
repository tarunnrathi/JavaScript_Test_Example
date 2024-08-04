import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { setDefaultImage } from "includes/article.util";

const { brandURL } = require("/src/includes/brand.helper");

const MobileBrandView = ({ data = {} }) => {
  useEffect(() => {
    if (Object.keys(data).length) {
      const elm = document?.querySelector(`.ppmb_wrp`);

      if (elm) {
        new Glide(".ppmb_wrp", {
          autoplay: 4000,
          type: "carousel",
          perView: 5,
          slidesToScroll: 1,
          gap: 10,
        }).mount();
      }
    }
  }, []);
  return (
    <div>
      <div id="ppmb" className="section">
        <h2 className="sc_ttl">
          अलग-अलग ब्रांड के<span> लोकप्रिय मोबाइल</span>
        </h2>
        <div className="ppmb_otr">
          <div className="ppmb_wrp">
            <div data-glide-el="track">
              <ul className="ppmbsldr">
                {data &&
                  Object.keys(data)?.map((brand) => {
                    return (
                      <div style={{ margin: "0px 5px" }} className="brandList glide__slide">
                        <a
                          // className="onHover"
                          href={`${brandURL}/${brand}/`.toLowerCase()+"/"}
                        >
                          <div className="ppmbthmb">
                            <img
                              src={data[brand]?.image}
                              alt=""
                              className="ppmb_img"
                              onError={setDefaultImage}
                              loading="lazy"
                            />
                          </div>
                          <div
                            className="ppmbthmb_link"
                          >
                            {brand}
                          </div>
                        </a>
                      </div>
                    );
                  })}
              </ul>
            </div>
            <div className="controls" data-glide-el="controls">
              <div className="leftArrow" data-glide-dir="<">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.406"
                  height="12"
                  viewBox="0 0 7.406 12"
                >
                  <path
                    id="Path_1"
                    data-name="Path 1"
                    d="M-3.984-3l-6-6,6-6,1.406,1.406L-7.219-9l4.641,4.594Z"
                    transform="translate(9.984 15)"
                    fill="#425673"
                  />
                </svg>
              </div>
              <div className="rightArrow" data-glide-dir=">">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.406"
                  height="12"
                  viewBox="0 0 7.406 12"
                >
                  <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
                    transform="translate(9.984 15)"
                    fill="#425673"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
        ul .brandList a{
          display:inline-block;
        }
        `}
      </style>
    </div>
  );
};

export default MobileBrandView;
