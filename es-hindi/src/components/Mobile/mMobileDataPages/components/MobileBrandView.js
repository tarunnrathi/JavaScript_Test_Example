import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { setDefaultImage } from "includes/article.util";

const { brandURL } = require("/src/includes/brand.helper");

const MobileBrandView = ({ data ={} }) => {
  useEffect(() => {
    setTimeout(() => {
      const elm = document?.querySelector(`.phnbybrndlsld`);
      if (elm) {
        new Glide(".phnbybrndlsld", {
          autoplay: 4000,
          type: "carousel",
          perView: 2.5,
          gap: 0,
          slidesToScroll: 1,
        })?.mount();
      }
    }, 2000);
  }, []);
  return (
    <div>
      <div id='brandWidget' className="spcbybrndphn spcglbg">
        <h2 className="phnglblhd forbg">
          अलग-अलग ब्रांड के<span> लोकप्रिय (पॉप्‍युलर) मोबाइल</span>
        </h2>

        <div className="phnbybrndlsld psrlhdn">
          <div data-glide-el="track">
            <ul className="dflx">
              {data &&
                Object.keys(data)?.map((brand) => {
                  return (
                    <li className="glide__slide">

                      <a href={`${brandURL}/${brand}/`.toLowerCase()+"/"} >
                      <div className="bybrndbx">
                        <figure>
                          <img
                            src={data[brand]?.image}
                            alt=""
                            className="ppmb_img"
                            loading="lazy"
                            onError={setDefaultImage}
                            // height={"80px"}
                            // width={"86px"}
                          />
                        </figure>
                        <a href={`${brandURL}/${brand}/`.toLowerCase()+"/"} className="ppmbthmb_link">
                          {brand}
                        </a>
                      </div>
                      </a>

                    </li>
                  );
                })}
            </ul>
          </div>
          <div data-glide-el="controls[nav]" className="phnlgblts dflx jstcntr">
            <button data-glide-dir="=0"></button>
            <button data-glide-dir="=1"></button>
            <button data-glide-dir="=2"></button>
            <button data-glide-dir="=3"></button>
            <button data-glide-dir="=4"></button>
            <button data-glide-dir="=5"></button>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          .spcbybrndphn {
          }
          .phnbybrndlsld {
          }
          .bybrndbx {
            margin-left: 15px;
            text-align: center;
            padding: 5px 0;
          }
          .bybrndbx h2,
          .bybrndbx h3, .bybrndbx a {
            font-size: 13px;
            line-height: 16px;
            font-weight: bold;
            color: #0076db;
            text-decoration: underline;
            margin-top: 5px;
          }
          .bybrndbx figure {
            background: #ffffff;
            border: 1px solid #e0e0e0;
            line-height: 0;
            margin: auto;
          }
          .bybrndbx figure img {
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default MobileBrandView;
