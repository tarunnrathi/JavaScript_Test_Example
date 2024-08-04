import { useEffect } from "react";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";

const FeatureSectionMobile = ({ isAmp = false }) => {
  useEffect(() => {
    if (document.getElementsByClassName("features_section").length) {
      new Glide(document.querySelector(`#features_section`), {
        type: "carousel",
        perView: 1,
        gap: 0,
        slidesToShow: 2,
        draggable: true,
      }).mount();
    }
  }, []);
  return (
    <>
      <div className="featuresWidget">
        <h3 className="featureTitle">
          <span>फीचर</span>
        </h3>
        <div className="features_section" id="features_section">
          <div className="glide__track" data-glide-el="track">
            {!isAmp && (
              <ul className="glide__slides">
                <li>
                  <div className="featureWrapper">
                    <div className="featureAuthor">
                      <div className="image">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            "https://images.news18.com/ibnkhabar/uploads/assets/images/1665921003_lalchand_Rajput100.jpg"
                          }
                          alt="Lalchand Rajput"
                          height={90}
                          width={90}
                        />
                      </div>
                      <h4 className="text">लालचंद राजपूत</h4>
                    </div>
                    <div className="content">
                      दो दशक से पत्रकारिता में सक्रिय. खेलों की स्टैट्स से जुड़ी
                      स्टोरी करना और उन्हें किस्सागोई के अंदाज में पेश करना
                      खूबी.
                    </div>
                    <div className="featurestoryWrap">
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-ind-vs-pak-t20-world-cup-when-pakistan-beat-india-first-time-in-cricket-world-cup-tales-video-4787229.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/10/India-vs-PAK-2021-C-16664961213x2.jpg"
                            }
                            height={100}
                            width={100}
                          />

                          <h3 className="featureStoryTitle">
                            T20 World Cup Tales: वो साल, जिसने क्रिकेट वर्ल्ड कप
                            में खत्म कर दी भारत की बादशाहत, VIDEO
                          </h3>
                        </a>
                      </div>
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-cricket-world-cup-tales-pakistan-wins-t20-world-cup-2009-after-beating-sri-lanka-t20wc-in-australia-4772935.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/10/World-Cup-Tales-2-16662487063x2.jpg"
                            }
                            height={100}
                            width={100}
                          />

                          <h3 className="featureStoryTitle">
                            World Cup Tales: जब उलटफेरों में उलझा भारत और
                            पाकिस्तान ले गया वर्ल्ड कप
                          </h3>
                        </a>
                      </div>
                    </div>
                    <div className="load_more">
                      <a href="https://hindi.news18.com/byline/vijay-shukla-2443.html">
                        अन्य लेख
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="featureWrapper">
                    <div className="featureAuthor">
                      <div className="image">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            "https://images.hindi.news18.com/ibnkhabar/uploads/assets/images/1634127575_ICC-VIMAL_KUMAR-pics.jpg"
                          }
                          alt="Vimal Kumar"
                          height={90}
                          width={90}
                        />
                      </div>
                      <h4 className="text">विमल कुमार</h4>
                    </div>
                    <div className="content">
                      दो दशक से पत्रकारिता में सक्रिय. खेलों की स्टैट्स से जुड़ी
                      स्टोरी करना और उन्हें किस्सागोई के अंदाज में पेश करना
                      खूबी.
                    </div>
                    <div className="featurestoryWrap">
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-ind-vs-pak-t20-world-cup-when-pakistan-beat-india-first-time-in-cricket-world-cup-tales-video-4787229.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/10/India-vs-PAK-2021-C-16664961213x2.jpg"
                            }
                            height={100}
                            width={100}
                          />

                          <h3 className="featureStoryTitle">
                            T20 World Cup Tales: वो साल, जिसने क्रिकेट वर्ल्ड कप
                            में खत्म कर दी भारत की बादशाहत, VIDEO
                          </h3>
                        </a>
                      </div>
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-cricket-world-cup-tales-pakistan-wins-t20-world-cup-2009-after-beating-sri-lanka-t20wc-in-australia-4772935.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/10/World-Cup-Tales-2-16662487063x2.jpg"
                            }
                            height={100}
                            width={100}
                          />

                          <h3 className="featureStoryTitle">
                            World Cup Tales: जब उलटफेरों में उलझा भारत और
                            पाकिस्तान ले गया वर्ल्ड कप
                          </h3>
                        </a>
                      </div>
                    </div>
                    <div className="load_more">
                      <a href="https://hindi.news18.com/byline/vimal-kumar-24.html">
                        अन्य लेख
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="featureWrapper">
                    <div className="featureAuthor">
                      <div className="image">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            "https://images.news18.com/ibnkhabar/uploads/assets/images/1666191196_Vijay_1.jpg"
                          }
                          alt="Vijay Kumar"
                          height={90}
                          width={90}
                        />
                      </div>
                      <h4 className="text">विजय प्रभात शुक्ला</h4>
                    </div>
                    <div className="content">
                      दो दशक से पत्रकारिता में सक्रिय. खेलों की स्टैट्स से जुड़ी
                      स्टोरी करना और उन्हें किस्सागोई के अंदाज में पेश करना
                      खूबी.
                    </div>
                    <div className="featurestoryWrap">
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-ind-vs-pak-t20-world-cup-when-pakistan-beat-india-first-time-in-cricket-world-cup-tales-video-4787229.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/10/India-vs-PAK-2021-C-16664961213x2.jpg"
                            }
                            height={100}
                            width={150}
                          />

                          <h3 className="featureStoryTitle">
                            T20 World Cup Tales: वो साल, जिसने क्रिकेट वर्ल्ड कप
                            में खत्म कर दी भारत की बादशाहत, VIDEO
                          </h3>
                        </a>
                      </div>
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-cricket-world-cup-tales-pakistan-wins-t20-world-cup-2009-after-beating-sri-lanka-t20wc-in-australia-4772935.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/10/World-Cup-Tales-2-16662487063x2.jpg"
                            }
                            height={100}
                            width={150}
                          />

                          <h3 className="featureStoryTitle">
                            World Cup Tales: जब उलटफेरों में उलझा भारत और
                            पाकिस्तान ले गया वर्ल्ड कप
                          </h3>
                        </a>
                      </div>
                    </div>
                    <div className="load_more">
                      <a href="https://hindi.news18.com/byline/vijay-shukla-2443.html">
                        अन्य लेख
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            )}
            {isAmp && (
              <amp-carousel
                type="slides"
                width="450"
                height={700}
                layout="responsive"
                autoplay=""
                controls
                delay="4000"
                data-next-button-aria-label="Go to next slide"
                data-previous-button-aria-label="Go to previous slide"
              >
                <li>
                  <div className="featureWrapper">
                    <div className="featureAuthor">
                      <div className="image">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            "https://images.news18.com/ibnkhabar/uploads/assets/images/1665921003_lalchand_Rajput100.jpg"
                          }
                          alt="Lalchand Rajput"
                          height={90}
                          width={90}
                        />
                      </div>
                      <h4 className="text">लालचंद राजपूत</h4>
                    </div>
                    <div className="content">
                      लेखक पूर्व भारतीय क्रिकेटर हैं. टीम इंडिया के कोच रह चुके
                      हैं. फिलहाल जिम्बाब्वे के टेक्निकल डायरेक्टर हैं.
                      जिम्बाब्वे से पहले अफगानिस्तान के भी कोच रह चुके हैं.
                    </div>
                    <div className="featurestoryWrap">
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-t20-world-cup-may-again-see-ups-and-downs-in-india-vs-zimbabwe-match-says-lalchand-rajput-4844389.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/11/Zimbabwe-players-AP44-16676599033x2.jpg"
                            }
                            height={100}
                            width={100}
                          />

                          <h3 className="featureStoryTitle">
                            Exclusive T20 WC 2022: टीम इंडिया को जिम्बाब्वे से
                            क्यों डरना चाहिए? पूर्व कोच ने बताए 5 Points
                          </h3>
                        </a>
                      </div>
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/blogs/lalchand-rajput/t20-world-cup-zimbabwes-team-has-already-defeated-pakistan-in-t20i-says-lalchand-rajput-team-india-4808801.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/10/Zimbabwe-cricket-team-vs-aus-1-16666143593x2.jpg"
                            }
                            height={100}
                            width={100}
                          />

                          <h3 className="featureStoryTitle">
                            T20 World Cup: जिम्बाब्वे का पाकिस्तान को हराना
                            उलटफेर नहीं, अब सेमीफाइनल पर नजर
                          </h3>
                        </a>
                      </div>
                    </div>
                    <div className="load_more">
                      <a href="https://hindi.news18.com/byline/lalchand-rajput-2811.html">
                        अन्य लेख
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="featureWrapper">
                    <div className="featureAuthor">
                      <div className="image">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            "https://images.hindi.news18.com/ibnkhabar/uploads/assets/images/1634127575_ICC-VIMAL_KUMAR-pics.jpg"
                          }
                          alt="Vimal Kumar"
                          height={90}
                          width={90}
                        />
                      </div>
                      <h4 className="text">विमल कुमार</h4>
                    </div>
                    <div className="content">
                      दो दशक से खेल पत्रकारिता में हैं. Social media पर @Vimalwa
                      के तौर पर सक्रिय विमल 4 क्रिकेट वर्ल्ड कप और रियो ओलंपिक
                      कवर कर चुके हैं.
                    </div>
                    <div className="featurestoryWrap">
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-sachin-tendulkar-virat-kohli-are-like-sunil-gavaskar-to-me-says-viv-richards-4711187.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/10/recherds-16652017173x2.jpg"
                            }
                            height={100}
                            width={100}
                          />
                          <h3 className="featureStoryTitle">
                            सचिन तेंदुलकर- विराट कोहली की जगह मेरे लिए गावस्कर
                            जैसी: विव रिचर्ड्स
                          </h3>
                        </a>
                      </div>
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-daren-sammy-interview-sammy-says-rohit-sharma-team-is-updated-version-of-2007-team-4673675.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/09/rohit-sharma-indian-team-16645444073x2.jpg"
                            }
                            height={100}
                            width={100}
                          />

                          <h3 className="featureStoryTitle">
                            Daren Sammy Interview: धोनी की 2007 की टीम से ज्यादा
                            अपडेट है रोहित शर्मा की आज की टीम
                          </h3>
                        </a>
                      </div>
                    </div>
                    <div className="load_more">
                    <a href="https://hindi.news18.com/byline/vimal-kumar-24.html">
                        अन्य लेख
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="featureWrapper">
                    <div className="featureAuthor">
                      <div className="image">
                        <LazyLoadImage
                          isAMP={isAmp}
                          src={
                            "https://images.news18.com/ibnkhabar/uploads/assets/images/1666191196_Vijay_1.jpg"
                          }
                          alt="Vijay Kumar"
                          height={90}
                          width={90}
                        />
                      </div>
                      <h4 className="text">विजय प्रभात शुक्ला</h4>
                    </div>
                    <div className="content">
                      दो दशक से पत्रकारिता में सक्रिय. खेलों की स्टैट्स से जुड़ी
                      स्टोरी करना और उन्हें किस्सागोई के अंदाज में पेश करना
                      खूबी.
                    </div>
                    <div className="featurestoryWrap">
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-ind-vs-pak-t20-world-cup-when-pakistan-beat-india-first-time-in-cricket-world-cup-tales-video-4787229.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/10/India-vs-PAK-2021-C-16664961213x2.jpg"
                            }
                            height={100}
                            width={150}
                          />

                          <h3 className="featureStoryTitle">
                            T20 World Cup Tales: वो साल, जिसने क्रिकेट वर्ल्ड कप
                            में खत्म कर दी भारत की बादशाहत, VIDEO
                          </h3>
                        </a>
                      </div>
                      <div className="featurestory">
                        <a href="https://hindi.news18.com/news/sports/cricket-cricket-world-cup-tales-pakistan-wins-t20-world-cup-2009-after-beating-sri-lanka-t20wc-in-australia-4772935.html">
                          <LazyLoadImage
                            isAMP={isAmp}
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/2022/10/World-Cup-Tales-2-16662487063x2.jpg"
                            }
                            height={100}
                            width={150}
                          />

                          <h3 className="featureStoryTitle">
                            World Cup Tales: जब उलटफेरों में उलझा भारत और
                            पाकिस्तान ले गया वर्ल्ड कप
                          </h3>
                        </a>
                      </div>
                    </div>
                    <div className="load_more">
                    <a href="https://hindi.news18.com/byline/vijay-shukla-2443.html">
                       अन्य लेख
                      </a>
                    </div>
                  </div>
                </li>
              </amp-carousel>
            )}
          </div>
          {!isAmp && (
            <div className="bullets_row">
              <div className="glide__bullets" data-glide-el="controls[nav]">
                <button className="glide__bullet" data-glide-dir="=0" />
                <button className="glide__bullet" data-glide-dir="=1" />
                <button
                  className="glide__bullet glide__bullet--active"
                  data-glide-dir="=2"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx global>
        {`
      .features_section { width: 100%; } .features_section .glide__track { overflow: hidden; } .features_section .glide__slides { display: flex; }
			.featuresWidget{margin-bottom:30px;position:relative;background:#f5f5f5;border-top:1px solid #e9e9e9;padding-top:10px}
			.featuresWidget .featureTitle {color:#e1261d; line-height:22px; font-size:22px; padding-left:10px; font-weight:bold; font-family:'khand',sans-serif }
			.featureWrapper{padding:0 20px}
			.featureWrapper .featureAuthor{display:flex;border-bottom:5px solid #e3e3e3;padding-bottom:15px;margin-bottom:15px;align-items:center}
			.featureWrapper .featureAuthor .image{width:110px;height:110px;border-radius:50%;border:10px solid #fff;overflow:hidden; flex-shrink:0; background:#fff; outline:1px solid #ccc; margin-top:15px; box-shadow:0 0 15px #ccc}
			.featureWrapper .featureAuthor .image img{width:100%;height:100%;object-fit:cover}
			.featureWrapper .featureAuthor .text{color:#3279ba;font-weight:bold;font-size:20px;line-height:25px;margin-left:20px}
			.featureWrapper .content{color:#292929;font-size:16px;line-height:1.5;margin-bottom:10px}
			.featurestoryWrap{display:flex;justify-content:space-between;border-bottom:5px solid #e3e3e3;padding-bottom:10px}
			.featurestoryWrap .featurestory{width:150px}
			.featurestoryWrap .featurestory a{display:block}
			.featurestoryWrap .featurestory img{width:100%;display:block;margin-bottom:7px}
			.featurestoryWrap .featurestory .featureStoryTitle{ color:#282828;font-size:16px;line-height:1.5;font-weight:600; font-family: "Mukta",sans-serif;}
			.load_more{width:100%;text-align:center;background:#f5f5f5;display:flex;justify-content:center;padding:10px 0;height:auto !important}
			.load_more a{border:2px solid #e1261c;background:#fff;padding:5px 12px 2px; border-radius:30px; color:#e1261c; font-size:13px; line-height:19px; font-weight:600; text-transform:uppercase}
			.bullets_row { width: 100%; position: relative; } .bullets_row .glide__bullets { position: relative; background: #f5f5f5; z-index: 2; width: 110px; display: inherit; margin: 20px auto 0; text-align: center; } .bullets_row:after { content: ""; position: absolute; background: #D1D1D1; height: 2px; width: 200px; margin: auto; top: 8px; right: 0; left: 0; z-index: 1; } .bullets_row button.glide__bullet.glide__bullet--active { background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/features-icon-color.svg); } .bullets_row button.glide__bullet { width: 17px; height: 17px; margin: 0 5px; border: 0; background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/features-icon.svg); outline: none; cursor: pointer; position: relative; z-index: 1; background-color: whitesmoke; }
    `}
      </style>
    </>
  );
};

export default FeatureSectionMobile;
