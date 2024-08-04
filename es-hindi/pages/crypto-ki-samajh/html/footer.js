import React, { useState } from "react";

const CryptoFooter = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleOverlayClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const msg =
    '<span class="zpay"><a href="https://zebpay.com/in/?utm_source=news18&utm_medium=partner&utm_campaign=Cryptoin&utm_id=referral">ZebPay</a>, भारत का सबसे पुराना और सबसे व्यापक रूप से उपयोग किया जाने वाला बिटकॉइन और क्रिप्टो एसेट एक्सचेंज है. इसके 4 मिलियन से ज़्यादा यूज़र हैं और हर महीने $1 बिलियन से ज़्यादा का लेनदेन होता है है. 2014 में स्थापित, ZebPay का मिशन Google Play Store और Apple App Store और वेब पर भी उपलब्ध अपने आसान और बेहद सुरक्षित एक्सचेंज का उपयोग करके भारतीयों के लिए बिटकॉइन को मुहैया कराना है.<br><br>ZebPay के मेंबर बिटकॉइन, इथेरियम और कई दूसरे क्रिप्टो संपत्तियों में निवेश कर सकते हैं और ZebPay Earn और लेंडिंग प्लेटफॉर्म जैसी अपनी अनोखे फ़ीचर के साथ इन क्रिप्टो होल्डिंग्स पर प्रोत्साहन राशि पा सकते हैं. आप ZebPay के नए ZEBB A के साथ कम से कम रु.100 में भी अपना SIP शुरू कर सकते हैं.</span>';

  return (
    <>
    {showOverlay && (
      <div className="overlay">
        <div className="crypto_popup">
          <div className="popup_text">
            <span className="closed" onClick={handleCloseOverlay}>
              X
            </span>
            <div
              dangerouslySetInnerHTML={{
                __html: msg,
              }}
            ></div>
          </div>
        </div>
      </div>
    )}
    <footer>
      <div className="crypto_container">
        <span>
          सभी अधिकार सुरक्षित हैं{" "}
          <a
            href="https://hindi.news18.com/crypto-ki-samajh/zebpay-contest-terms-and-conditions/"
            target="_blank"
            className="tclink"
          >
            Contest T&C
          </a>
        </span>
        <span onClick={handleOverlayClick}>अबाउट ZebPay</span>
      </div>
    </footer>
    </>

  );
};

export default CryptoFooter;
