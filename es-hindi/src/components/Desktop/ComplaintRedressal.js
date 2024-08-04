import React, { useMemo } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";

const complaintRedressalDesktop = (props) => {
  const { pageAds, photoStories, topStories, currentUrl, topStory } = useMemo(
    () => props.data,
    [props.data]
  );
  let rhsTopStoryListing = [];
  if ("rhsTopStoryListing" in topStory)
    rhsTopStoryListing = topStory.rhsTopStoryListing;

  return (
    <>
      <div className="outer">
        <div className="section-blog">
          <div
            className="section-blog-left resLiftSideFull"
            style={!props.isMobile ? {} : { width: "100%" }}
          >
            <div className="pd15 section-blog-left-aricle">
              <div id="text_contener">
                <h1>Complaint Redressal</h1>

                <p>
                  टीवी18 ब्रॉडकास्ट लिमिटेड के समाचार चैनल आईबीएन7 पर प्रसारित
                  सामग्री को लेकर अगर किसी को शिकायत है तो उसे न्यूज
                  ब्रॉडकास्टर्स & डिजिटल एसोसिएशन (एनबीडीए) की आचार संहिता,
                  प्रसारण मानक और समाचार प्रसारण मानक (विवाद निपटारा) नियमों के
                  तहत पहली प्रसारण तिथि के बाद से उचित समय के अंदर (सात दिनों से
                  ज्यादा नहीं) कंपनी द्वारा नियुक्त निम्न अधिकारी के पास अपनी
                  शिकायत दर्ज करानी होगी:
                </p>
                <h3>
                  <b>
                    <p>क्षिप्रा जटाना</p>
                  </b>
                </h3>
                <h3>
                  <b>
                    <p>अनुपालन अधिकारी, टीवी18 ब्रॉडकास्ट लिमिटेड</p>
                  </b>
                </h3>
                <address>
                  <p>एक्सप्रेस ट्रेड टॉवर</p>

                  <p>प्लॉट नं. 15 & 16, सेक्टर 16ए</p>

                  <p>फिल्म सिटी</p>

                  <p>नोएडा, उत्तर प्रदेश 201301</p>

                  <p>फोन: +91 120 4341818</p>

                  <p>फेक्स: +91 11 66173955</p>

                  <p>
                    ई मेल:{" "}
                    <a href="mailto:complaint@network18online.com">
                      complaint@network18online.com
                    </a>
                  </p>

                  <p>
                    वेबसाइट:{" "}
                    <a href="http://www.network18online.com">
                      http://www.network18online.com
                    </a>
                  </p>
                </address>

                <p>
                  फॉर्म भरने के लिए यहाँ <a>क्लिक</a>{" "}
                  करें
                </p>

                <p>
                  दर्शकों के लिए सुविधाजनक होगा अगर वो शिकायत दर्ज कराने से पहले
                  न्यूज ब्रॉडकास्टर्स & डिजिटल एसोसिएशन के द्वारा निर्धारित आचार
                  संहिता, प्रसारण मानकों और समाचार प्रसारण मानक (विवाद निपटारा)
                  नियमों और निर्देशों का अध्ययन कर लें। इस संबंध में पूरी
                  जानकारी न्यूज ब्रॉडकास्टर्स & डिजिटल एसोसिएशन की वेबसाइट{" "}
                  <a href="http://www.nbanewdelhi.com/">www.nbanewdelhi.com</a>{" "}
                  पर उपलब्ध
                </p>
              </div>
            </div>
          </div>
          {!props.isMobile && (
            <RhsCommon
              pageAds={pageAds}
              currentURL={currentUrl}
              photoStories={photoStories}
              isRss={true}
              topStories={
                rhsTopStoryListing.length ? rhsTopStoryListing : topStories
              }
            />
          )}
        </div>
      </div>
      <style jsx global>{`
        .heading {
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 20px;
        }
        .trms_info {
          list-style: none;
        }
        .trms_wrapper ol li {
          font-size: 18px;
          line-height: 28px;
          color: #000000;
          font-family: "Eczar", serif;
          font-weight: 400;
          margin-bottom: 20px;
        }
        .inside {
          margin-left: 2%;
        }
        .inside_2 {
          margin-left: 4%;
        }
        .outer {
          margin: auto;
          max-width: 1245px;
          padding: 0 10px;
          position: relative;
          z-index: 1;
        }
        .section-blog {
          margin: 0;
          padding: 15px 0;
          float: left;
          width: 100%;
        }
        .section-blog-left {
          width: calc(100% - 315px);
          float: left;
        }
        .section-blog-left-aricle {
          width: 100%;
          padding: 10px 0 10px 0;
          -moz-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -o-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        .trms_wrapper {
          width: 100%;
          margin: 0 auto;
          padding: 0px 10px;
        }
        .trms_wrapper .trms_condton_hdng {
          margin: 10px 0px 10px;
          text-decoration: underline;
          font-size: 24px;
          line-height: 32px;
          color: #001d42;
          font-family: "Mukta", sans-serif !important;
          font-weight: bold;
        }
        .section-blog-left-aricle h2 {
          font-size: 19px !important;
          font-weight: 700;
          color: #404040;
          padding-bottom: 16px;
        }
        .trms_wrapper p {
          font-size: 18px;
          line-height: 28px;
          color: #000000;
          font-family: "Eczar", serif;
          font-weight: 400;
          margin-bottom: 20px;
        }
        .section-blog-left-aricle p {
          line-height: 1.45;
          color: #404040;
          padding-bottom: 20px;
          margin: 0;
          font-size: 18px;
          line-height: 28px;
        }

        .section-blog-left-aricle h1 {
          margin: 0px 0 10px 0;
          border-top: 1px solid #dbdbdb;
          border-bottom: 1px solid #dbdbdb;
          padding: 10px 0;
          font-size: 26px;
          line-height: 32px;
        }
        #text_contener h2 {
          font-size: 24px;
          font-weight: bold;
          color: #404040;
          margin: 10px 0 15px 0;
        }
        #text_contener p {
          font-size: 14px;
          line-height: 24px;
          color: #404040;
          padding-bottom: 20px;
        }

        #table4,
        #table4 tbody,
        #table4 tr,
        #table4 th,
        #table4 td {
          border: 1px solid #ccc;
        }
        #table4 th,
        #table4 td a {
          color: #1059a4;
        }
        #table4 th,
        #table4 td {
          padding: 10px;
          font-size: 14px;
          color: #404040;
        }
        #table4 th,
        #table4 td a {
          color: #1059a4;
        }
        #text_contener h2 {
          font-size: 24px;
          font-weight: bold;
          color: #404040;
          margin: 10px 0 15px 0;
        }
        #text_contener h3,
        #text_contener h4 {
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
};

export default complaintRedressalDesktop;
