import { setDefaultImage } from "includes/article.util";
import React, { useState } from "react";

export default function BrandDescription({
  isImage = false,
  brandDescription = "",
}) {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div>
      {" "}
      <div className="brndabt">
        <div className={!isActive ? "brndabttxt " : "brndabttxt adcls"}>
          {isImage && (
            <figure>
              <img
                src={brandDescription?.brand_logo}
                alt=""
                loading="lazy"
                onError={setDefaultImage}
              />
            </figure>
          )}

          <div className="spcabttxt-first">
            {isImage ? (
              <p
                style={{
                  height: isActive ? "" : "90px",
                  overflow: isActive ? "" : "hidden",
                }}
              >
                {brandDescription?.brand_description}
              </p>
            ) : (
              <p
                style={{
                  height: isActive ? "" : "90px",
                  overflow: isActive ? "" : "hidden",
                }}
              >
                क्या आप मोबाइल फोन खोज रहे हैं? और कन्फ्यूज़ हैं कि कौन-सा फोन
                लिया जाए? आपको परेशान होने की जरूरत नहीं! यह पेज आपकी मदद के लिए
                ही है. यहां आपको अपने लिए एक बेहतरीन स्मार्टफोन चुनने में सहायता
                की जाएगी. हमारे इस टूल से आप अपनी जरूरत के हिसाब से एक फोन चुन
                सकते हैं. आपको बस यह तय करना है कि आपको पैसा कितना लगाना है और
                कौन-से फीचर चाहिएं. फीचर जैसे कि फोन की रैम कितनी चाहिए, इंटरनल
                स्टोरेज क्या हो, 5G चाहिए या 4G ही काफी रहेगा, कोई खास ब्रांड
                चाहिए, कैमरा कितने मेगापिक्सल का हो, या फिर स्क्रीन साइज को लेकर
                कोई विशेष चॉइस है. बस, यहां आपको फिल्टर लगाने हैं और आपके सामने
                केवल वही फोन आएंगे, जो आपके द्वारा बताए गए फीचर्स पर खरा उतरते
                हों. है ना कमाल! और केवल यही नहीं, आप यहां अलग-अलग फोन्स के बीच
                तुलना भी कर सकते हैं, ताकि आप अपने लिए सबसे अच्छा फोन चुन पाएं.
              </p>
            )}
          </div>
        </div>
        <span
          className={!isActive ? "brndmrtxtbtn " : "brndmrtxtbtn adcls"}
          onClick={toggleClass}
        >
          <span>
            <b>रीड मोर</b>
          </span>
          <span>
            <b>रीड लेस</b>
          </span>
        </span>
      </div>
      <style></style>
    </div>
  );
}
