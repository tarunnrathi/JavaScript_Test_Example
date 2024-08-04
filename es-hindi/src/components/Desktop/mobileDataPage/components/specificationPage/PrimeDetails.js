import React, { useState } from "react";

const PrimeDetails = ({ title = "", specificationDescription = {} }) => {
  const [showFull, setShowFull] = useState(false);

  const toggle = () => {
    setShowFull(!showFull);
  };

  return (
    <div>
      <div id="prime_dtl" className="section expander">
        <h2 className="sc_ttl">
          {title} <span>डिटेल्स</span>
        </h2>
        <div className="inner-bit">
          <p style={{ height: showFull ? "" : "80px" }}>
            {specificationDescription?.mobile_description}
          </p>
        </div>
      </div>
      <div className="pmdtl_expnd_wrp">
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
      </div>
      <style>
        {`
 .hide {
    display: none;
  }
     
  .handleArrow svg{
    transform: rotate(180deg)
   }
      `}
      </style>
    </div>
  );
};

export default PrimeDetails;
