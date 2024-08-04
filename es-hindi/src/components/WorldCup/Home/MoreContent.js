import { useState } from "react";

const MoreContent = () => {
  const [addClass, setAddClass] = useState("");
  const [visible, setVisible] = useState(true);
  const handleClick = () => {
    setAddClass("read_full_containr");
    setVisible(false);
  };

  return (
    <>
      <div className={`read_less_containr ${addClass}`}>
        <p class="pageContent">
          न्यूज18 हिंदी (News18 Hindi) के स्पेशल वनडे वर्ल्ड कप 2023 के पेज पर आपका स्वागत है. इस पेज पर वर्ल्ड कप से जुड़ी वो सभी बातें और अपडेट मिलेंगे, जो आप चाहते हैं. पल-पल की ताजा खबरें और तस्वीरें, मैचों के लाइव स्कोर (Live Score), फुल स्कोरकार्ड (Full Scorecard), लाइव अपडेट (Live Update), हर बॉल की कॉमेंट्री और मैच रिपोर्ट सब कुछ यहां मिलेगा. वर्ल्ड कप की स्पेशल स्टोरी भी होंगी.
        </p>
        <br />
        <p class="pageContent">
          आइए आपको वनडे वर्ल्ड कप के इतिहास के बारे में बताते हैं. वनडे क्रिकेट की बात करें, पहला मुकाबला 52 साल पहले खेला गया था. 5 जनवरी 1971 को ऑस्ट्रेलिया और इंग्लैंड के बीच मेलबर्न में यह मुकाबला हुआ. मैच में ऑस्ट्रेलया को 5 विकेट से जीत मिली. इसके बाद पहला वनडे वर्ल्ड कप 7 से 21 जून 1975 के बीच इंग्लैंड में खेला गया. 8 टीमों के बीच कुल 15 मुकाबले खेले. वेस्टइंडीज ने ऑस्ट्रेलिया को 17 रन से हराकर वर्ल्ड कप का खिताब जीता.
        </p>
        <br />
        <p class="pageContent">
          भारत में 5 अक्टूबर से शुरू होने जा रहा वनडे वर्ल्ड कप ओवरऑल 13वां सीजन है. पहली बार पूरा वर्ल्ड कप भारत में खेला जाएगा. इससे पहले 3 बार भारत में खेले गए वर्ल्ड कप की बात करें, तो कुछ मुकाबले दूसरे देशों में भी हुए. 6 टीमों ने कम से कम एक-एक बार वनडे वर्ल्ड कप का खिताब जीता है. ऑस्ट्रेलिया ने सबसे अधिक 5 बार टाइटल जीता है. 1979 में भी वर्ल्ड कप का दूसरा सीजन इंग्लैंड में खेला गया. वेस्टइंडीज ने इंग्लैंड को हराकर खिताब अपने नाम किया. 1983 में तीसरे सीजन का आयोजन इंग्लैंड और वेल्स में हुआ. इस बार टूर्नामेंट में नया चैंपियन मिला. भारत ने वेस्टइंडीज को 43 रन से हराया और वर्ल्ड कप का अपना पहला टाइटल जीता. इसी के साथ वेस्टइंडीज के लगातार 3 खिताब जीतने का सपना भी टूट गया. 1987 में ऑस्ट्रेलिया की टीम वनडे वर्ल्ड कप जीतने में सफल रही जबकि 1992 का खिताब पाकिस्तान ने जीता. यानी अंतिम तीनों वर्ल्ड कप में नया चैंपियन मिला. 1996 में एक बार फिर नया चैंपियन मिला. इस बार श्रीलंका ने वनडे वर्ल्ड कप का खिताब जीता.
        </p>
        <br />
        <p class="pageContent">
          1999, 2003 और 2007 में हुए वनडे वर्ल्ड कप का खिताब ऑस्ट्रेलिया ने जीता. इस तरह से कंगारू टीम 3 या उससे अधिक खिताब जीतने वाली पहली टीम बनी. 2011 में भारत, श्रीलंका और बांग्लादेश में वर्ल्ड कप के 10वें सीजन का आयोजन किया. एमएस धोनी की कप्तानी में टीम इंडिया चैंपियन बनी. भारत ने 28 साल बाद वनडे वर्ल्ड कप जीता. इस तरह से टीम इंडिया 2 या उससे अधिक खिताब जीतने वाली दुनिया की तीसरी टीम बनी. इससे पहले वेस्टइंडीज और ऑस्ट्रेलिया ने ऐसा किया था.
        </p>
        <br />
        <p class="pageContent">
          2015 में ऑस्ट्रेलिया की टीम एक बार फिर चैंपियन बनी. यह उसका 5वां टाइटल था. 2019 में इंग्लैंड और वेल्स में हुए वर्ल्ड कप के 12वें सीजन में फिर नया चैंपियन मिला. इंग्लैंड ने न्यूजीलैंड को बाउंड्री काउंट नियम से हराकर खिताब जीता. ऐसे में इस बार टीम डिफेंडिंग चैंपियन के तौर पर उतरेगी.
        </p>
        <p class="pageContent">
          वनडे वर्ल्ड कप के इतिहास को देखें, तो अब तक 20 टीमें उतर चुकी हैं और 6 को ही खिताब मिला है. यानी 14 टीमों को अभी भी पहले खिताब का इंतजार है. वनडे वर्ल्ड कप के पहले 4 सीजन में 8-8 टीमों को मौका दिया गया. 2019 में 10 टीमें उतरी थीं. इस बार भी 10 टीमों को मौका मिला है. 2027 में टीमों की संख्या बढ़कर 14 हो जाएगी.
        </p>
      </div>
      {visible && (
        <div className="buttonGrp rd_full">
          <button type="button" onClick={handleClick}>
            और पढ़ें
          </button>
          <div className="arrows"></div>
        </div>
      )}
      <style jsx global>{`
        .read_less_containr {
          display: block;
          overflow: hidden;
          position: relative;
          height: 144px;
        }
        body .pageContent {
          font-size: 16px;
          line-height: 1.5;
          margin-top: 10px;
        }
        .buttonGrp {
          position: relative;
          width: 136px;
          margin: 10px auto 10px;
        }
        .buttonGrp button {
          background-color: #1799bc;
          border: none;
          width: 100%;
          padding: 10px 15px 10px 0px;
          box-sizing: border-box;
          border-radius: 20px;
          cursor: pointer;
          color: #fff;
          font-size: 14px;
          line-height: 19px;
          font-family: "Noto Sans", devanagari;
          font-weight: 400;
          outline: none;
        }
        .buttonGrp button {
          background-color: #eb3d3c;
          text-transform: capitalize;
        }
        .buttonGrp .arrows {
          position: absolute;
          top: 20px;
          right: 12px;
          width: 12px;
          height: 1px;
          background-color: #fff;
        }
        .buttonGrp .arrows {
          width: 13px;
          transform: rotate(89deg);
        }
        .buttonGrp .arrows:before,
        .buttonGrp .arrows:after {
          content: "";
          position: absolute;
          width: 7px;
          height: 1px;
          top: -2px;
          right: -1px;
          background-color: #fff;
          transform: rotate(45deg);
        }
        .buttonGrp .arrows:after {
          top: 2px;
          transform: rotate(-45deg);
        }
        @media (max-width: 768px) {
          p.pageContent {
            padding: 10px 10px;
            font-size: 16px;
            line-height: 1.5 !important;
          }
          .buttonGrp.rd_full {
            position: relative;
            margin: 10px auto 10px;
            background: linear-gradient(transparent, #fff, #fff);
            padding-top: 40px;
            margin-top: -40px;
          }
        }
        .read_full_containr {
          height: auto !important;
        }
      `}</style>
    </>
  );
};

export default MoreContent;
