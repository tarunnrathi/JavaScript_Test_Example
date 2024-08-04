import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { setDefaultImage } from "includes/article.util";
import { getCompleteURL } from "util/global/Helper";
let newsURL = require("/src/includes/brand.helper").newsURL;

const LatestNewsView = ({ data = [] }) => {
  useEffect(() => {
    if (data) {
      const elm = document?.getElementById(`brandNews`);
      if(elm) {
        new Glide('#brandNews', {
          autoplay: 2000,
          type: 'carousel',
          startAt: 1,
          perView: 4,
          slidesToScroll: 1,
          gap: 12,
        }).mount();
      }
    }
  }, []);

  return (
    <div>
      <section id="latest_news">
        <div id='brandNews' className="lnw_sldr">
          <h2 className="sc_ttl_w">लेटेस्‍ट मोबाइल न्‍यूज </h2>
          <div className="track" data-glide-el="track">
            <ul className="lnw_wrp">
              {data &&
                data.length &&
                data.map((news) => {
                  return (
                    <li className="lnw_thmb glide__slide">
                      <a href={getCompleteURL(news["weburl_r"], news["weburl"])+"/"} >
                        <img
                          style={{ width: "174px", height: "117px" }}
                          src={news?.images?.url}
                          alt=""
                          className="lnw_img"
                          onError={setDefaultImage}
                          loading="lazy"
                        />
                        <div className="lnw_c">{news?.display_headline}</div>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="lnctrl">
            <div className="controls" data-glide-el="controls">
              <div data-glide-dir="<">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.203"
                  height="13.203"
                  viewBox="0 0 13.203 13.203"
                >
                  <path
                    id="Path_95"
                    data-name="Path 95"
                    d="M16.68-8.32V-6.68h-10L11.25-2.07,10.078-.9l-6.6-6.6,6.6-6.6L11.25-12.93,6.68-8.32Z"
                    transform="translate(-3.477 14.102)"
                    fill="#9B9B9B"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
              <button className="glide__bullet" data-glide-dir="=0"></button>
              <button className="glide__bullet" data-glide-dir="=1"></button>
              <button className="glide__bullet" data-glide-dir="=2"></button>
              <button className="glide__bullet" data-glide-dir="=3"></button>
              <button className="glide__bullet" data-glide-dir="=4"></button>
              <button
                className="glide__bullet glide__bullet--active"
                data-glide-dir="=5"
              ></button>
            </div>
            <div className="controls" data-glide-el="controls">
              <div data-glide-dir=">">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.203"
                  height="13.203"
                  viewBox="0 0 13.203 13.203"
                >
                  <path
                    id="Path_96"
                    data-name="Path 96"
                    d="M3.32-8.32V-6.68h10L8.75-2.07,9.922-.9l6.6-6.6-6.6-6.6L8.75-12.93,13.32-8.32Z"
                    transform="translate(-3.32 14.102)"
                    fill="#9B9B9B"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <a href={`${newsURL}/`} className="mrn">
          अन्‍य खबरें
        </a>
      </section>
    </div>
  );
};

export default LatestNewsView;
