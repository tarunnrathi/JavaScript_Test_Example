import { useMemo } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";

const AboutUs = (props) => {
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
                    <div className="section-blog-left  resLiftSideFull">
                        {/* <div className="pd15 section-blog-left-aricle"> */}
                            <h1 className="insdhd">हमारे बारे में</h1>
                            <div className="insdcntr">
                            <p><b>News18India.com</b> भारत की सबसे विशाल हिंदी वेब साइट जिसमें आपके लिए भरा पड़ा है जानकारी और मनोरंजन का खजाना। <b>News18India.com</b> की कोशिश है आपकी भाषा में, आपके लिए ऎसी सामग्री देने की जो आपको ज़िंदगी में आगे बढ़ने में मदद दे। और एक मंच, आपकी आवाज़ उठाने के लिए। इसलिए आप यहां पाएंगे ताज़ातरीन खबरों से लेकर नौकरी, शिक्षा और नए भारत की बदलती आर्थिक तस्वीर की उपयोगी चर्चा। खेल, सिनेमा और विदेश की चटपटी बातें तो किताबी दुनिया से लिए गए रोचक किस्से। कुल मिला कर हम लाए हैं नेट पर आपके लिए ऎसी दुनिया, जो आपको भर दे ज़िंदगी के जोश से!  <a href="http://www.news18India.com" target="_blank">www.news18India.com</a> का संपूर्ण स्वामित्व web18 Software Services Ltd के पास है जो स्वयं <b>Network 18</b> के स्वामित्व की कंपनी है। <a href="http://www.news18India.com" target="_blank">www.news18India.com</a> पर प्रकाशित सभी सामग्री सर्वाधिकार सुरक्षित है और इसकी किसी भी सामग्री का किसी भी रूप में पुन:प्रकाशन अथवा वितरण प्रतिबंधित है। </p>
                           </div>
                        </div>
                    </div>
                    <RhsCommon
                        pageAds={pageAds}
                        currentURL={currentUrl}
                        photoStories={photoStories}
                        isRss={true}
                        topStories={rhsTopStoryListing.length ? rhsTopStoryListing : topStories}
                    />
                </div>
                <div className="jsx-bc2511fbe87bb179 clearfix vsp10"></div>
                <div className="jsx-bc2511fbe87bb179 clearfix vsp10"></div>
            {/* </div> */}
            <style jsx global>{`
              
              body {
                font-family: "Mukta", sans-serif
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
              
              .insdhd {
                font-size: 32px;
                font-weight: 700;
                line-height: 1.45;
                margin: 13px 0;
                color: #404040;
              }
              
              .insdcntr {}
              
              .insdcntr p {
                line-height: 1.45;
                color: #404040;
                padding-bottom: 20px;
                margin: 0;
                font-size: 18px;
                line-height: 28px;
              }
              
              .insdcntr p a {
                color: #1059a4;
                font-weight: 700;
              }
              
              .section-blog-left-aricle h1 {
                font-size: 32px;
                font-weight: 700;
                line-height: 1.45;
                margin: 13px 0;
                //color: #404040;
              }
              
              .section-blog-left-aricle p {
                line-height: 1.45;
                //color: #404040;
                padding-bottom: 20px;
                margin: 0;
                font-size: 18px;
                line-height: 28px;
              }
              
              .section-blog-left-aricle p b {
                font-weight: 700;
              }
              
              .section-blog-left-aricle p b a {
                color: #1059a4;
              }
              
            `}</style>
        </>
    );
};
export default AboutUs;
