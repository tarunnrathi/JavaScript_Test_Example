import React, { useState } from "react";

const Description = () => {
  const [showFull, setShowFull] = useState(false);

  const toggle = () => {
    setShowFull(!showFull);
  };
  return (
    <div>
      <div
        id="dt_desc"
        className={showFull ? "expand section expander" : "section expander"}
      >
        <div className="inner-bit">
          <p
            style={{ height: showFull ? "" : "80px" }}
            className="show dsc_copy"
          >
            क्या आप मोबाइल फोन खोज रहे हैं? और कन्फ्यूज़ हैं कि कौन-सा फोन लिया
            जाए? आपको परेशान होने की जरूरत नहीं! यह पेज आपकी मदद के लिए ही है.
            यहां आपको अपने लिए एक बेहतरीन स्मार्टफोन चुनने में सहायता की जाएगी.
            हमारे इस टूल से आप अपनी जरूरत के हिसाब से एक फोन चुन सकते हैं. आपको
            बस यह तय करना है कि आपको पैसा कितना लगाना है और कौन-से फीचर चाहिएं.
            फीचर जैसे कि फोन की रैम कितनी चाहिए, इंटरनल स्टोरेज क्या हो, 5G
            चाहिए या 4G ही काफी रहेगा, कोई खास ब्रांड चाहिए, कैमरा कितने
            मेगापिक्सल का हो, या फिर स्क्रीन साइज को लेकर कोई विशेष चॉइस है. बस,
            यहां आपको फिल्टर लगाने हैं और आपके सामने केवल वही फोन आएंगे, जो आपके
            द्वारा बताए गए फीचर्स पर खरा उतरते हों. है ना कमाल! और केवल यही
            नहीं, आप यहां अलग-अलग फोन्स के बीच तुलना भी कर सकते हैं, ताकि आप
            अपने लिए सबसे अच्छा फोन चुन पाएं.
          </p>
        </div>
      </div>
      <div id="dt_expnd" className="expnd_wrp">
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
              // "translate(-3 9.984) rotate(90)"
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
      <style jsx global>
        {`
          .hide {
            display: none;
          }
          .handleArrow svg {
            transform: rotate(180deg);
          }

          #dt_desc.expand:before {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Description;