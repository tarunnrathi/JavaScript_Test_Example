import { useMemo } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";

const Feedback = (props) => {
    const { pageAds, photoStories, topStories, currentUrl, topStory } = useMemo(
        () => props.data,
        [props.data]
    );
    let rhsTopStoryListing = [];
    if ("rhsTopStoryListing" in topStory) rhsTopStoryListing = topStory.rhsTopStoryListing;

    return (
        <>
            <div className="outer">
                <div className="section-blog">
                    <div className=" section-blog-left  resLiftSideFull">
                        <div className="pd15 section-blog-left-aricle">
                            <h1 className="f_heading">हमें बताइए</h1>
                            <div id="text_contener">
                                <p>टीवी18 ब्रॉडकास्ट लिमिटेड के समाचार चैनल News18India पर प्रसारित सामग्री को लेकर अगर किसी को शिकायत है तो उसे न्यूज ब्रॉडकास्टर्स एसोसिएशन (एनबीए) की आचार संहिता, प्रसारण मानक और समाचार प्रसारण मानक (विवाद निपटारा) नियमों के तहत पहली प्रसारण तिथि के बाद से उचित समय के अंदर (सात दिनों से ज्यादा नहीं) कंपनी द्वारा नियुक्त निम्न अधिकारी के पास अपनी शिकायत दर्ज करानी होगी:</p>
                                <p>क्षिप्रा जटाना</p>
                                <p>ईवीपी व लीगल हैड टीवी18 ब्रॉडकास्ट लिमिटेड </p>
                                <p>एक्सप्रेस ट्रेड टॉवर </p>
                                <p>प्लॉट नं. 15 &amp; 16, सेक्टर 16ए </p>
                                <p>फिल्म सिटी </p>
                                <p>नोएडा, उत्तर प्रदेश 201301</p>
                                <p>फोन: +91 120 4341818 </p>
                                <p>फेक्स: +91 11 66173955 </p>
                                <p>ई मेल: <a href="mailto:complaint@network18online.com">complaint@network18online.com</a></p>
                                <p>वेबसाइट: <a href="https://www.nw18.com/">http://www.network18online.com</a></p>
                                <p>फॉर्म भरने के लिए यहाँ  <a>क्लिक</a> करें</p>
                                <p>दर्शकों के लिए सुविधाजनक होगा अगर वो शिकायत दर्ज कराने से पहले न्यूज ब्रॉडकास्टर्स एसोसिएशन के द्वारा निर्धारित आचार संहिता, प्रसारण मानकों और समाचार प्रसारण मानक (विवाद निपटारा) नियमों और निर्देशों का अध्ययन कर लें। इस संबंध में पूरी जानकारी न्यूज ब्रॉडकास्टर्स एसोसिएशन की वेबसाइट <a href="http://www.nbanewdelhi.com/">www.nbanewdelhi.com</a> पर उपलब्ध</p>
                            </div>
                        </div>
                    </div>
                    <RhsCommon
                        pageAds={pageAds}
                        currentURL={currentUrl}
                        photoStories={photoStories}
                        isRss={true}
                        topStories={
                            rhsTopStoryListing.length ? rhsTopStoryListing : topStories
                        } />
                </div>
            </div>
            <style jsx global>{`
              * {
                margin: 0;
                padding: 0;
                outline: 0;
              }
              body {
                font-family: "Noto Serif", 'Droid Serif', sans-serif !important;
              }
              .outer {
                margin: auto;
                max-width: 1245px;
                padding: 0 10px;
                position: relative;
                z-index: 1;
              }
              .section-blog-left {
                width: calc(100% - 315px);
                float: left;
              }
              .section-blog-left-aricle {
                width: 100%;
                padding: 10px 0;
                box-sizing: border-box;
              }
              .section-blog-left-aricle h1 {
                font-size: 32px;
                font-weight: 700;
                line-height: 1.45;
                margin: 13px 0;
                color: #404040;
              }
              .section-blog-left-aricle p {
                line-height: 1.45;
                color: #404040;
                padding-bottom: 20px;
                margin: 0;
                font-size: 18px;
                line-height: 28px;
              }
              #text_contener p a {
                color: #1059a4;
                font-weight: 700;
              }
              a {
                text-decoration: none;
                color: #111;
              }
              .section-blog-left-aricle p b {
                font-weight: 700;
              }
            `}</style>
        </>
    );
};

export default Feedback;
