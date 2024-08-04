import SiteAd from 'widgets/Common/Responsive/SiteAd';

const AboutUsMweb = ({ pageAds }) => {
    return (
        <>
            <div className="brdcrm">
                <a href="/">Hindi News</a> <span> › </span><strong>हमारे बारे में</strong>
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
                        <h1 className="insdhd">हमारे बारे में</h1>
                            <div className="insdcntr">
                            <p><b>News18India.com</b> भारत की सबसे विशाल हिंदी वेब साइट जिसमें आपके लिए भरा पड़ा है जानकारी और मनोरंजन का खजाना। <b>News18India.com</b> की कोशिश है आपकी भाषा में, आपके लिए ऎसी सामग्री देने की जो आपको ज़िंदगी में आगे बढ़ने में मदद दे। और एक मंच, आपकी आवाज़ उठाने के लिए। इसलिए आप यहां पाएंगे ताज़ातरीन खबरों से लेकर नौकरी, शिक्षा और नए भारत की बदलती आर्थिक तस्वीर की उपयोगी चर्चा। खेल, सिनेमा और विदेश की चटपटी बातें तो किताबी दुनिया से लिए गए रोचक किस्से। कुल मिला कर हम लाए हैं नेट पर आपके लिए ऎसी दुनिया, जो आपको भर दे ज़िंदगी के जोश से!  <a href="http://www.news18India.com" target="_blank">www.news18India.com</a> का संपूर्ण स्वामित्व web18 Software Services Ltd के पास है जो स्वयं <b>Network 18</b> के स्वामित्व की कंपनी है। <a href="http://www.news18India.com" target="_blank">www.news18India.com</a> पर प्रकाशित सभी सामग्री सर्वाधिकार सुरक्षित है और इसकी किसी भी सामग्री का किसी भी रूप में पुन:प्रकाशन अथवा वितरण प्रतिबंधित है। </p>
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
                    font-family: Mukta, sans-serif !important;
                }
                
                .brdcrm,
                body {
                    background: #fff;
                }
                
                .brdcrm a:first-child {
                    padding: 0 5px 0 0;
                    color: #757575;
                    font-weight: 400;
                }
                
                .brdcrm {
                    padding: 10px 16px;
                    font-size: 15px;
                    color: #000;
                    border-bottom: 1px solid rgba(0, 0, 0, .1);
                    font-weight: 700;
                }
                
                .add {
                    background: #dbdde3 !Important;
                }
                
                .add,
                .add2 {
                    z-index: 1;
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
                
                .clearfix:after,
                .clearfix:before {
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
                
                .insdhd {
                    font-size: 24px;
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
                    color: #e33a0f;
                    font-weight: 700;
                }
                
                .insdhd {
                    font-size: 24px
                }
            `}</style>
        </>
    );
};
export default AboutUsMweb;
