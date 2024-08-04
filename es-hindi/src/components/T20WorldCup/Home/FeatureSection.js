import { useEffect } from "react";
import Glide from '@glidejs/glide';

const FeatureSection = (props) => {
  useEffect(() => {
		if (document.getElementsByClassName('features_section').length) {
      new Glide(document.querySelector(`#features_section`), {
        type: 'carousel',
        perView: 1,
        gap: 0,
        slidesToShow: 2,
        draggable: true,
      }).mount();
  }
	  }, []);
  return (
    <>
    <div className="cricketwallah vspacer20">
  <div className="border_title">
    <h2 className="page_title">फीचर</h2>
  </div>
  <div className="features_section" id="features_section">
    <div className="glide__track" data-glide-el="track">
      <div
        className="glide__slides"
        style={{
          transition: "transform 0ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s",
          width: 6174,
          transform: "translate3d(-3528px, 0px, 0px)"
        }}
      >
        <div className="features_row">
          <div className="cricketwallah_left">
            <div>
              <div className="cricketwallah_img">
                <img
                  src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/images/1634127575_ICC-VIMAL_KUMAR-pics.jpg"
                  alt="Vimal Kumar"
                />
              </div>

            </div>
            <div className="cricketwallah_content">
              <h3> विमल कुमार</h3>
              <p>
                दो दशक से खेल पत्रकारिता में हैं. Social media पर @Vimalwa के
                तौर पर सक्रिय विमल 4 क्रिकेट वर्ल्ड कप और रियो ओलंपिक कवर कर
                चुके हैं.
              </p>
              <a
                href="https://hindi.news18.com/blogs/vimal-kumar-24.html"
                className="cricketwallah_more"
              >
                अन्य लेख
              </a>
            </div>
          </div>
          <ul className="cricketwallah_right">
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-sachin-tendulkar-virat-kohli-are-like-sunil-gavaskar-to-me-says-viv-richards-4711187.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/recherds-16652017173x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  सचिन तेंदुलकर- विराट कोहली की जगह मेरे लिए गावस्कर जैसी: विव
                  रिचर्ड्स
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-daren-sammy-interview-sammy-says-rohit-sharma-team-is-updated-version-of-2007-team-4673675.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/09/rohit-sharma-indian-team-16645444073x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  Daren Sammy Interview: धोनी की 2007 की टीम से ज्यादा अपडेट है
                  रोहित शर्मा की आज की टीम
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-virat-kohli-will-perform-brilliantly-in-austarlias-pitches-t20-world-cup-says-sunil-narine-4612157.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/09/sunil-narain-16634261863x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  टीम इंडिया को हराना आसान नहीं... कोहली ऑस्ट्रेलिया में मचाएंगे
                  धमाल, विंडीज धुरंधर ने ऐसा क्यों कहा
                </h3>
              </a>
            </li>
          </ul>
        </div>
        <div className="features_row">
          <div className="cricketwallah_left">
            <div>
              <div className="cricketwallah_img">
                <img
                  src="https://images.news18.com/ibnkhabar/uploads/assets/images/1665921003_lalchand_Rajput100.jpg"
                  alt="Lalchand Rajput"
                />
              </div>
            </div>
            <div className="cricketwallah_content">
              <h3>लालचंद राजपूत</h3>
              <p>
                लेखक पूर्व भारतीय क्रिकेटर हैं. टीम इंडिया के कोच रह चुके हैं.
                फिलहाल जिम्बाब्वे के टेक्निकल डायरेक्टर हैं. जिम्बाब्वे से पहले
                अफगानिस्तान के भी कोच रह चुके हैं.{" "}
              </p>
              <a
                href="https://hindi.news18.com/blogs/lalchand-rajput-2811.html"
                className="cricketwallah_more"
              >
                अन्य लेख
              </a>
            </div>
          </div>
          <ul className="cricketwallah_right">
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-t20-world-cup-may-again-see-ups-and-downs-in-india-vs-zimbabwe-match-says-lalchand-rajput-4844389.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/11/Zimbabwe-players-AP44-16676599033x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  Exclusive T20 WC 2022: टीम इंडिया को जिम्बाब्वे से क्यों डरना
                  चाहिए? पूर्व कोच ने बताए 5 Points
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/blogs/lalchand-rajput/t20-world-cup-zimbabwes-team-has-already-defeated-pakistan-in-t20i-says-lalchand-rajput-team-india-4808801.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/Zimbabwe-cricket-team-vs-aus-1-16666143593x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  T20 World Cup: जिम्बाब्वे का पाकिस्तान को हराना उलटफेर नहीं,
                  अब सेमीफाइनल पर नजर
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/blogs/lalchand-rajput/jasprit-bumrah-best-replacement-is-bumrah-himself-says-lalchand-rajput-icc-t20-world-cup-mohammed-shami-4745405.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/Jasprit-Bumrah-5-AP-C-16657540053x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  T20 World Cup: बुमराह का रिप्लेसमेंट सिर्फ बुमराह हैं, और कोई
                  ढूंंढे़ नहीं मिलेगा...
                </h3>
              </a>
            </li>
          </ul>
        </div>
        <div className="features_row">
          <div className="cricketwallah_left">
            <div>
              <div className="cricketwallah_img">
                <img
                  src="https://images.news18.com/ibnkhabar/uploads/assets/images/1666191196_Vijay_1.jpg"
                  alt="Vijay Prabhat Shukla"
                />
              </div>
            </div>
            <div className="cricketwallah_content">
              <h3>विजय प्रभात शुक्ला</h3>
              <p>
                दो दशक से पत्रकारिता में सक्रिय. खेलों की स्टैट्स से जुड़ी
                स्टोरी करना और उन्हें किस्सागोई के अंदाज में पेश करना खूबी.
              </p>
              <a
                href="https://hindi.news18.com/byline/vijay-shukla-2443.html"
                className="cricketwallah_more"
              >
                अन्य लेख
              </a>
            </div>
          </div>
          <ul className="cricketwallah_right">
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-ind-vs-pak-t20-world-cup-when-pakistan-beat-india-first-time-in-cricket-world-cup-tales-video-4787229.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/India-vs-PAK-2021-C-16664961213x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  T20 World Cup Tales: वो साल, जिसने क्रिकेट वर्ल्ड कप में खत्म
                  कर दी भारत की बादशाहत, VIDEO
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-cricket-world-cup-tales-pakistan-wins-t20-world-cup-2009-after-beating-sri-lanka-t20wc-in-australia-4772935.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/World-Cup-Tales-2-16662487063x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  World Cup Tales: जब उलटफेरों में उलझा भारत और पाकिस्तान ले गया
                  वर्ल्ड कप
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-t20-world-cup-tales-when-yuvraj-singh-ms-dhoni-sluggish-batting-cost-team-india-as-they-lost-t20-wc-trophy-in-2014-4784971.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/T20-WC-INDIA-GFX-11-16664344823x2.jpeg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  T20 World Cup: जब धोनी-युवराज की सुस्त रफ्तार ने छीन लिया भारत
                  से वर्ल्ड कप
                </h3>
              </a>
            </li>
          </ul>
        </div>
        <div className="features_row">
          <div className="cricketwallah_left">
            <div>
              <div className="cricketwallah_img">
                <img
                  src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/images/1634127575_ICC-VIMAL_KUMAR-pics.jpg"
                  alt="Vimal Kumar"
                />
              </div>
            </div>
            <div className="cricketwallah_content">
              <h3> विमल कुमार</h3>
              <p>
                दो दशक से खेल पत्रकारिता में हैं. Social media पर @Vimalwa के
                तौर पर सक्रिय विमल 4 क्रिकेट वर्ल्ड कप और रियो ओलंपिक कवर कर
                चुके हैं.
              </p>
              <a
                href="https://hindi.news18.com/blogs/vimal-kumar-24.html"
                className="cricketwallah_more"
              >
                अन्य लेख
              </a>
            </div>
          </div>
          <ul className="cricketwallah_right">
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-sachin-tendulkar-virat-kohli-are-like-sunil-gavaskar-to-me-says-viv-richards-4711187.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/recherds-16652017173x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  सचिन तेंदुलकर- विराट कोहली की जगह मेरे लिए गावस्कर जैसी: विव
                  रिचर्ड्स
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-daren-sammy-interview-sammy-says-rohit-sharma-team-is-updated-version-of-2007-team-4673675.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/09/rohit-sharma-indian-team-16645444073x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  Daren Sammy Interview: धोनी की 2007 की टीम से ज्यादा अपडेट है
                  रोहित शर्मा की आज की टीम
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-virat-kohli-will-perform-brilliantly-in-austarlias-pitches-t20-world-cup-says-sunil-narine-4612157.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/09/sunil-narain-16634261863x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  टीम इंडिया को हराना आसान नहीं... कोहली ऑस्ट्रेलिया में मचाएंगे
                  धमाल, विंडीज धुरंधर ने ऐसा क्यों कहा
                </h3>
              </a>
            </li>
          </ul>
        </div>
        <div className="features_row">
          <div className="cricketwallah_left">
            <div>
              <div className="cricketwallah_img">
                <img
                  src="https://images.news18.com/ibnkhabar/uploads/assets/images/1665921003_lalchand_Rajput100.jpg"
                  alt="Lalchand Rajput"
                />
              </div>
              {/*<div class="partnersLogos">
											<h3 class="heading">Presenting Partner</h3>
											<div class="partnersSlider">
													<div class="glide__track" data-glide-el="track">
														<ul class="glide__slides">
												   <li class="glide__slide"><a href="#"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/partners.jpg" /></a></li>
												   <li class="glide__slide"><a href="#"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/partners.jpg" /></a></li>
												   <li class="glide__slide"><a href="#"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/partners.jpg" /></a></li>
											   </ul>
													</div>
											</div>
											</div>*/}
            </div>
            <div className="cricketwallah_content">
              <h3>लालचंद राजपूत</h3>
              <p>
                लेखक पूर्व भारतीय क्रिकेटर हैं. टीम इंडिया के कोच रह चुके हैं.
                फिलहाल जिम्बाब्वे के टेक्निकल डायरेक्टर हैं. जिम्बाब्वे से पहले
                अफगानिस्तान के भी कोच रह चुके हैं.{" "}
              </p>
              <a
                href="https://hindi.news18.com/blogs/lalchand-rajput-2811.html"
                className="cricketwallah_more"
              >
                अन्य लेख
              </a>
            </div>
          </div>
          <ul className="cricketwallah_right">
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-t20-world-cup-may-again-see-ups-and-downs-in-india-vs-zimbabwe-match-says-lalchand-rajput-4844389.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/11/Zimbabwe-players-AP44-16676599033x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  Exclusive T20 WC 2022: टीम इंडिया को जिम्बाब्वे से क्यों डरना
                  चाहिए? पूर्व कोच ने बताए 5 Points
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/blogs/lalchand-rajput/t20-world-cup-zimbabwes-team-has-already-defeated-pakistan-in-t20i-says-lalchand-rajput-team-india-4808801.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/Zimbabwe-cricket-team-vs-aus-1-16666143593x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  T20 World Cup: जिम्बाब्वे का पाकिस्तान को हराना उलटफेर नहीं,
                  अब सेमीफाइनल पर नजर
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/blogs/lalchand-rajput/jasprit-bumrah-best-replacement-is-bumrah-himself-says-lalchand-rajput-icc-t20-world-cup-mohammed-shami-4745405.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/Jasprit-Bumrah-5-AP-C-16657540053x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  T20 World Cup: बुमराह का रिप्लेसमेंट सिर्फ बुमराह हैं, और कोई
                  ढूंंढे़ नहीं मिलेगा...
                </h3>
              </a>
            </li>
          </ul>
        </div>
        <div className="features_row">
          <div className="cricketwallah_left">
            <div>
              <div className="cricketwallah_img">
                <img
                  src="https://images.news18.com/ibnkhabar/uploads/assets/images/1666191196_Vijay_1.jpg"
                  alt="Vijay Prabhat Shukla"
                />
              </div>
              {/*<div class="partnersLogos">
											<h3 class="heading">Presenting Partner</h3>
											<div class="partnersSlider">
													<div class="glide__track" data-glide-el="track">
														<ul class="glide__slides">
												   <li class="glide__slide"><a href="#"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/partners.jpg" /></a></li>
												   <li class="glide__slide"><a href="#"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/partners.jpg" /></a></li>
												   <li class="glide__slide"><a href="#"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/partners.jpg" /></a></li>
											   </ul>
													</div>
											</div>
											</div>*/}
            </div>
            <div className="cricketwallah_content">
              <h3>विजय प्रभात शुक्ला</h3>
              <p>
                दो दशक से पत्रकारिता में सक्रिय. खेलों की स्टैट्स से जुड़ी
                स्टोरी करना और उन्हें किस्सागोई के अंदाज में पेश करना खूबी.
              </p>
              <a
                href="https://hindi.news18.com/byline/vijay-shukla-2443.html"
                className="cricketwallah_more"
              >
                अन्य लेख
              </a>
            </div>
          </div>
          <ul className="cricketwallah_right">
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-ind-vs-pak-t20-world-cup-when-pakistan-beat-india-first-time-in-cricket-world-cup-tales-video-4787229.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/India-vs-PAK-2021-C-16664961213x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  T20 World Cup Tales: वो साल, जिसने क्रिकेट वर्ल्ड कप में खत्म
                  कर दी भारत की बादशाहत, VIDEO
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-cricket-world-cup-tales-pakistan-wins-t20-world-cup-2009-after-beating-sri-lanka-t20wc-in-australia-4772935.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/World-Cup-Tales-2-16662487063x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  World Cup Tales: जब उलटफेरों में उलझा भारत और पाकिस्तान ले गया
                  वर्ल्ड कप
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-t20-world-cup-tales-when-yuvraj-singh-ms-dhoni-sluggish-batting-cost-team-india-as-they-lost-t20-wc-trophy-in-2014-4784971.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/T20-WC-INDIA-GFX-11-16664344823x2.jpeg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  T20 World Cup: जब धोनी-युवराज की सुस्त रफ्तार ने छीन लिया भारत
                  से वर्ल्ड कप
                </h3>
              </a>
            </li>
          </ul>
        </div>
        <div className="features_row">
          <div className="cricketwallah_left">
            <div>
              <div className="cricketwallah_img">
                <img
                  src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/images/1634127575_ICC-VIMAL_KUMAR-pics.jpg"
                  alt="Vimal Kumar"
                />
              </div>
              {/*<div class="partnersLogos">
											<h3 class="heading">Presenting Partner</h3>
											<div class="partnersSlider">
													<div class="glide__track" data-glide-el="track">
														<ul class="glide__slides">
												   <li class="glide__slide"><a href="#"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/partners.jpg" /></a></li>
												   <li class="glide__slide"><a href="#"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/partners.jpg" /></a></li>
												   <li class="glide__slide"><a href="#"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/partners.jpg" /></a></li>
											   </ul>
													</div>
											</div>
											</div>*/}
            </div>
            <div className="cricketwallah_content">
              <h3> विमल कुमार</h3>
              <p>
                दो दशक से खेल पत्रकारिता में हैं. Social media पर @Vimalwa के
                तौर पर सक्रिय विमल 4 क्रिकेट वर्ल्ड कप और रियो ओलंपिक कवर कर
                चुके हैं.
              </p>
              <a
                href="https://hindi.news18.com/blogs/vimal-kumar-24.html"
                className="cricketwallah_more"
              >
                अन्य लेख
              </a>
            </div>
          </div>
          <ul className="cricketwallah_right">
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-sachin-tendulkar-virat-kohli-are-like-sunil-gavaskar-to-me-says-viv-richards-4711187.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/10/recherds-16652017173x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  सचिन तेंदुलकर- विराट कोहली की जगह मेरे लिए गावस्कर जैसी: विव
                  रिचर्ड्स
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-daren-sammy-interview-sammy-says-rohit-sharma-team-is-updated-version-of-2007-team-4673675.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/09/rohit-sharma-indian-team-16645444073x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  Daren Sammy Interview: धोनी की 2007 की टीम से ज्यादा अपडेट है
                  रोहित शर्मा की आज की टीम
                </h3>
              </a>
            </li>
            <li>
              <a href="https://hindi.news18.com/news/sports/cricket-virat-kohli-will-perform-brilliantly-in-austarlias-pitches-t20-world-cup-says-sunil-narine-4612157.html">
                <figure>
                  <img src="https://images.news18.com/ibnkhabar/uploads/2022/09/sunil-narain-16634261863x2.jpg?impolicy=website&width=100&height=63" />
                </figure>
                <h3 className="cricketwallah_title">
                  टीम इंडिया को हराना आसान नहीं... कोहली ऑस्ट्रेलिया में मचाएंगे
                  धमाल, विंडीज धुरंधर ने ऐसा क्यों कहा
                </h3>
              </a>
            </li>
          </ul>
        </div>
      </div>
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
    </div>
  </div>
</div>

    </>
  );
};

export default FeatureSection;
