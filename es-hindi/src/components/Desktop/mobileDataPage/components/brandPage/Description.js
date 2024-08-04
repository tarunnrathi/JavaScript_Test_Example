import { setDefaultImage } from "includes/article.util";
import React, { useState } from "react";

const Description = ({ brandDescription={} }) => {
  const [showFull, setShowFull] = useState(false);

  const toggle = () => {
    setShowFull(!showFull);
  };

  return (
    <div className='dt_desc_main' >
      <div id="dt_desc" className={showFull || brandDescription?.brand_description?.length < 940 ? "expand section expander" : "section expander"}>
        <div style={{ height: showFull || brandDescription?.brand_description?.length < 940 ? "" : "155px" }} className="inner-bit">
          <div className="dt_desc_img">
            <img
              src={brandDescription?.brand_logo}
              height={"90px"}
              width={"100%"}
              alt=""
              onError={setDefaultImage}
              loading="lazy"
            />
          </div>
          <div>
            <p >
              {brandDescription?.brand_description}
            </p>
          </div>
        </div>
      </div>

      { brandDescription?.brand_description?.length > 940 ? <div id="dt_expnd" className="expnd_wrp">
        <button
          className={showFull ? "expand-toggle handleArrow" : "expand-toggle"}
          onClick={toggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="7.406"
            viewBox="0 0 12 7.406"
          >
            <path
              id="Path_93"
              data-name="Path 93"
              d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
              transform="translate(-3 9.984) rotate(90)"
              fill="#cecece"
            />
          </svg>
          <span className={showFull ? "hide more" : "more"}>रीड मोर</span>
          <span className={showFull ? "less" : "hide less"}>रीड लेस</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="7.406"
            viewBox="0 0 12 7.406"
          >
            <path
              id="Path_93"
              data-name="Path 93"
              d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
              transform="translate(-3 9.984) rotate(90)"
              fill="#cecece"
            />
          </svg>
        </button>
      </div> :"" }

      <style>
        {`
 .hide {
    display: none;
  }

  .handleArrow svg{
    transform: rotate(180deg)
   }

   #dt_desc.expand:before {
    display: none;
  }

  .dt_desc_main{
      margin-bottom: 30px;
  }
     
      `}
      </style>
    </div>
  );
};

export default Description;
