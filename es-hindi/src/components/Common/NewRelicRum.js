import React from "react";
import Script from "next/script";

const NewRelicRum = () => {
  return (
      <Script
        strategy="beforeInteractive"
        src="/scripts/newrelicrum.js"
        onLoad={() => {
          console.log("Script has loaded");
        }}
      />
  );
};

{
  /* <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `/js/newrelicrum.js` }}></script> */
}

export default NewRelicRum;
