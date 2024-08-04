import SiteAd from 'widgets/Common/Responsive/SiteAd';

const FeedbackMobile = ({ pageAds }) => {
    return (
        <>
            <div className="brdcrm">
                <a href="/">Hindi News</a> <span> › </span> <strong>हमारे बारे में</strong>
            </div>
            <div className='clearfix add'>
                <div className='addinner-box addinner_box_300x250'>
                    <span id="first">विज्ञापन</span>
                    <SiteAd
                        width={336}
                        height={280}
                        slotId={'mobileAdNew300x250_0'}
                        adUnit={pageAds?.ATF_320}
                        sizes={[
                            [300, 250],
                            [336, 280]
                        ]}
                    ></SiteAd>
                </div>
            </div>
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
                </div>
            </div>
            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    outline: 0;
                }
                body {
                    font-family: "Mukta", sans-serif !important;
                }
                .brdcrm {
                    padding: 10px 16px;
                    font-size: 15px;
                }
                .add {
                    background: #dbdde3!Important;
                }
                .add, .add2 {
                    background: #dbdde3;
                    position: relative;
                    padding: 16px 0;
                    line-height: 0;
                    text-align: center;
                }
                div.addinner_box_300x250 {
                    height: 268px;
                    width: 373px;
                }
                .clearfix {
                    clear: both;
                }
                .clearfix:after, .clearfix:before {
                    content: "";
                    display: block;
                    clear: both;
                    visibility: hidden;
                    line-height: 0;
                    height: 0;
                }
                .addinner-box span {
                    color: #797e90;
                    font-size: 11px;
                    text-align: center;
                    padding: 2px 0 0;
                    display: block;
                    line-height: 16px;
                    background-color: #e8e9ed;
                    width: 300px;
                    margin-left: 37px;
                }
                .outer {
                    padding: 15px;
                }
                .section-blog h1 {
                    font-size: 26px;
                    line-height: 28px;
                    margin: 8px 0;
                    font-weight: 700;
                }
                .section-blog p {
                    color: #404040;
                    padding-bottom: 20px;
                    font-size: 16px;
                    line-height: 28px;
                }
                .section-blog p a {
                    color: #e33a0f;
                }
            `}</style>
        </>
    );
};

export default FeedbackMobile;
