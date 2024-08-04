import { React } from "react";
import getConfig from "next/config";
import Head from "next/head";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Crypheader from "./header";

const crypto_term = (props = {}) => {
  const { publicRuntimeConfig } = getConfig();
  const { pageSeo = {} } = props?.data || {};
  const zPayWidgetData = props?.data?.zPayWidgetData || {};
  const zepayMarketInfo = props?.data?.zepayMarketInfo || {};

  return (
    <>
      <Head>
        <title>{pageSeo.title}</title>
        <meta name="description" content={pageSeo.description} />
        <meta name="keywords" content={pageSeo.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="max-image-preview:large" key="robot" />
        <meta httpEquiv="X-UA-Compatible" content="IE7, IE8, IE9" />
        <meta property="fb:admins" content="503334673" />
        <meta property="fb:pages" content="31867849201" />
        <meta
          property="fb:page_id"
          content="31867849201, 187957574620134, 126166140913489, 784667114916040,1075464282525405, 312128074436"
        />
        <meta property="og:image" content={pageSeo.image} />
        <meta property="fb:app_id" content="115930713951815" />
        <meta
          property="og:title"
          content={typeof pageSeo.title !== "undefined" ? pageSeo.title : ""}
        />
        <meta
          property="og:description"
          content={
            typeof pageSeo.description !== "undefined"
              ? pageSeo.description
              : ""
          }
        />
        <meta
          property="og:image"
          content={
            typeof pageSeo.ogImage !== "undefined"
              ? pageSeo.ogImage
              : "https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png"
          }
        />
        <meta
          property="og:image:alt"
          content={
            typeof pageSeo.og_image_alt !== "undefined"
              ? pageSeo.og_image_alt
              : ""
          }
        />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="900" />
        <meta property="og:locale" content="en_US" />

        <meta property="og:site_name" content="News18" />
        <meta
          property="og:url"
          content={typeof pageSeo.weburl !== "undefined" ? pageSeo.weburl : ""}
        />

        <meta
          name="tweetmeme-title"
          content={typeof pageSeo.title !== "undefined" ? pageSeo.title : ""}
        />
        <meta
          name="twitter:title"
          content={typeof pageSeo.title !== "undefined" ? pageSeo.title : ""}
        />
        <meta
          name="twitter:description"
          content={
            typeof pageSeo.description !== "undefined"
              ? pageSeo.description
              : ""
          }
        />
        <meta name="twitter:site" content="@cnnnews18" />
        <meta name="twitter:creator" content="@cnnnews18" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content={
            typeof canonical_url !== "undefined"
              ? canonical_url.replace("amp/", "")
              : ""
          }
        />
        <meta
          name="twitter:image"
          content={
            typeof pageSeo.image !== "undefined"
              ? pageSeo.image
              : "https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png"
          }
        />
        <meta
          name="twitter:image:alt"
          content={
            typeof pageSeo.og_image_alt !== "undefined"
              ? pageSeo.og_image_alt
              : ""
          }
        />

        <meta
          itemProp="image"
          content={
            pageSeo.itemPropImage
              ? pageSeo.itemPropImage
              : "https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png"
          }
        />

        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/css/style.css?reset=44"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/css/crypto_ki_samjh.css?reset=50"
        />
        <link
          rel="stylesheet"
          href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/css/slick.css"
        />

        <link rel="dns-prefetch" href="https://hindi.news18.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://ajax.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="http://static.ibnlive.in.com" />
        <link rel="dns-prefetch" href="http://img01.ibnlive.in" />
        <link rel="dns-prefetch" href="https://images.news18.com" />
      </Head>
      <div>
        <div className="crypto_wrap">
          <Crypheader data={props?.data || {}} />

          <div className="terms crypto_container">
        	<span className="heading">TERMS & CONDITIONS </span>
        	<ul>
        		<li>1.The terms and conditions contained herein (hereinafter referred to as "Terms") apply to the various Contests conducted by TV18 Broadcast Limited ("Company") under the tagline, #CryptoKiSamajh (hereinafter referred to as the “Contest”).</li>
        		<li>2.Your participation in the Contest will be construed as an acceptance of the Terms. If you do not agree to any of the Terms you should not participate in the Contest. Company reserves the right to modify the Terms at any time.</li>
        		<li>3.This contest will be conducted on such day/dates as may be communicated by the Company on its twitter handle/social media pages. The winners will be announced on Twitter /social media pages on such day/date(s) as may be communicated by the Company on its twitter handle/social media pages. (“Term/Contest Day”).</li>
        		<li>4.The contest is open to Indian Citizens residing within the geographical territory of India only and who have attained the age of 18 on the day of the Contest. </li>
        		<li>5.Employees of Company & its subsidiaries/group companies as well as those companies & their subsidiaries sponsoring the Contest/Contest prizes and their families are not eligible to participate in the Contest.</li>
        	</ul>
        	<span className="rules">RULES OF PARTICIPATION</span>
        	<ul>
        		<li>1. Company shall post information /questions seeking responses/posts from the participants during the Term through its Twitter/social media handle/page. The information /questions shall be such as may be communicated on the social media /twitter handles of the Company.</li>
        		<li>2. The participants would need to submit their reply (as a comment to Company’s social media post/tweet only wherein question has been posted) using this hashtag #CryptoKiSamajh and/or any other hashtag (#) and page handles specified at the time of contest announcement on Twitter/social media handle. The correct answer in case of questions would be announced at the end of the contest.</li>
        		<li>3. The questions may be changed anytime during the Term of the Contest at the Company’s discretion.  Answers once submitted cannot be modified. No dispute with respect to the question and/or answer shall be raised by the Participant and Company’s decision regarding the same shall be final and binding.</li>
        		<li>4. Contestants need to post/tweet their answers strictly as per the timelines as mentioned in the Contest to qualify for a chance to win.</li>
        		<li>5. Company accepts no responsibility under any circumstance whatsoever for including but not limited to incomplete or incomprehensible questions, entries, for technical and/or telephone networks, which become lost, misdirected or delayed. Any such entries will be deemed void and the decision of the Company in this respect will be final and binding.</li>
        		<li>6. In case of a contest with multiple questions, participants will have to answer correctly all of the Contest’s questions to qualify for a chance to win. Out of all the correct entries, Company will select 5 lucky winners randomly selected at their sole discretion and the same will be announced at the time specified at such time as may have been announced at the time of announcement of the contest. </li>
        		<li>7. The winner(s) of each contest shall win Rs. 1000 (Indian Rupees One Thousand Only) worth BTC or crypto coins in partnering exchange ZebPay’s wallet. The Prize/Crypto coins shall be transferred by ZebPay only to the Winners KYC verified ZebPay wallet. Participant/Winner shall be provided the Prize by ZebPay and Company has no liability towards the same. Winner shall contact with ZebPay for getting the Prize credited in his/her ZebPay wallet. By accepting the prize, winners agree to be responsible for all applicable taxes associated with acceptance of the prize, if any applicable. The Prize would be handed over to the Winner only at the agreed time/place as communicated by the Company and after proper identification, verification and also after the Winner providing proof of payment of all applicable taxes and levies.   </li>
        		<li>8.	The Winners of the Contest will be announced only after the Winner gives their acceptance to compliance of the Terms and Conditions of this Contest. Upon being declared a Winner of the Contest, the Winner will be required to comply with the following pre-requisites prior to being handed over the Prize: <br/> a.	Furnishing his/her name, address, age, sex, contact number and email ID along with supporting documents;<br/>b.	Any valid proof of address<br/> Details need to be provided by the winners in the following format along with supporting documents:<br/>
        			<table>
        				<tr>
        					<td>Name of Winner</td>
        					<td>&nbsp;</td>
        				</tr>
        				<tr>
        					<td>Mobile Number</td>
        					<td>&nbsp;</td>
        				</tr>
        				<tr>
        					<td>Date of Birth</td>
        					<td>&nbsp;</td>
        				</tr>
        				<tr>
        					<td>PAN</td>
        					<td>&nbsp;</td>
        				</tr>
        				<tr>
        					<td>Aadhar Number</td>
        					<td>&nbsp;</td>
        				</tr>
        			</table>
        		</li>
        		<li>9. The discretion of selecting/shortlisting the winner(s) lies solely with Company and it cannot be challenged under any circumstance. The decision of Company in this matter will be final and binding and no questions, correspondence, enquiries, etc. on the manner of the selection and the Contest itself from any party whatsoever will be entertained. The Winner of the Prize will be informed and contacted by way of an email and/or a phone call, at the sole discretion of the Company</li>
        		<li>10.	By entering the Contest, participants grant Company a royalty-free, worldwide, perpetual, non-exclusive license to display, distribute, reproduce the Tweet shared/tweeted by the participants, in whole or in part, in any media now existing or subsequently developed, for any educational, promotional, publicity, exhibition, archival, and any other standard purposes. Company will not be required to pay any consideration or seek any additional approval in connection with such uses</li>
        		<li>11.	Participants affirm and agree that their pictures/videos/footage may be used by the Company or any other third parties for promotional, exhibition and/or publicity and the Participants grant to the Company exclusive right to monetize the pictures/videos/footage taken during the course of the Contest</li>
        		<li>12.	The Participant agrees to provide complete and correct information with respect to his/her identity, contact details, permanent account number (“PAN”), address proof, age, city and such other information as may be required by the Company from time to time. Company has the right at any time to ask the Participant to provide proof of identity and/or eligibility. Failure to provide such proof by Participant immediately upon request by the Company, could result in the disqualification of the Participant from the Contest and/or withdrawal of the Prize at the sole discretion of the Company</li>
        		<li>13.	No request shall be entertained by the Company with regard to transfer of Contest Prize. Company disclaims any liability arising from the Prize. The prizes given to each winner/s is neither assignable nor transferable under any circumstances</li>
        		<li>14.	In the event that any of the Winner is not available/ reachable on the number/email id provided by the Participant, such Winner forfeits his/her right to the Prize and the Company may in its sole discretion hand over the Quiz Prize to another winner and the same shall be final and binding</li>
        		<li>15.	If any of the Winner do not convey their acceptance within 24 hours of intimation of the same, the Contest Prize shall unconditionally and irrevocably lapse and such Winner will cease to have any right, interest or claim in the same.</li>
        		<li>16.	Company shall make reasonable efforts to confirm the identity of the selected participant. However, if the verification of the identity of the participant is not possible due to any reason(s) including but not limited to, the inability to contact the participant, submission of incomplete documents, incorrect information of the participant or any other reason beyond the reasonable control of Company, Company shall be entitled to forfeit the entitlement of the winner(s) and select an alternate winner in its place. </li>
        		<li>17.	The mode and mechanism of the prize disbursal will be communicated to the winner by Company.</li>
        		<li>18.	Company reserves the right to cancel any part or the entire Contest</li>
        		<li>19.	Mere participation in the Contest does not entitle you to win a prize</li>
        		<li>20.	Company shall not be liable for any warranty either expressed or implied concerning the quality, suitability or merchantability of any prize</li>
        		<li>21.	The Management of Company & its subsidiaries/group companies reserve the right to cancel / postpone /stop this Contest at its discretion or change all or any part of terms and conditions that are applicable, without giving prior intimation of any kind and being liable for any consequential losses/damages</li>
        		<li>22.	Nothing here in amounts to a commitment or representation by Company to conduct further or other schemes/contest</li>
        		<li>23.	It is the sole responsibility of the participants to ensure that they are entitled to participate in this contest as per the applicable law of the territory where they reside</li>
        		<li>24.	We are fully committed to following laws related to the collection of personal data. You are required to give us the correct details about yourself and Company will not be liable for any damages direct or indirect for any wrong addresses submitted</li>
        		<li>25.	The decision of Company and / or its representatives, employees, directors, officers or agents with respect to the contest, any matter related thereto including the choice of questions or the manner of choosing of winners will be final and binding on all participants and no questions, correspondence, enquiries, etc. on the manner of conduct of the contest from any party whatsoever will be entertained</li>
        	</ul>
        </div>

          <div className="crypto_container pra">
            <p>
              क्रिप्टोकरेंसी अनियमित डिजिटल एसेट हैं, यह वैध मुद्रा नहीं हैं.
              इनका पिछला प्रदर्शन भविष्य के रिटर्न की गांरटी नहीं है.
              क्रिप्टोकरेंसी में निवेश या ट्रेड करना बाजार जोखिमों और कानूनी
              जोखिमों के अधीन है.
            </p>
          </div>
          <section className="subscribe">
            <div className="crypto_container">
              <div className="sub">
                <h4>हमारे न्यूज़लेटर को </h4>
                <span>सब्सक्राइब करें</span>
              </div>
              <div className="sub_input">
                <span>
                  क्रिप्टो से संबंधित नवीनतम समाचार पाने के लिए सब्सक्राइब करें
                  और अपडेटिड रहें!
                </span>
                <div className="form">
                  <span>
                    <input type="text" id="email" placeholder="आपकी ईमेल" />
                    <button onClick="subscribe()">सब्सक्राइब करें</button>
                    <div className="sub-resp"></div>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="rotatebox">
            <div className="cubewrap">
              <div className="closebutton"></div>
              <div className="cube">
                <div className="front">
                  <a
                    href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                    target="_blank"
                    onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                  >
                    <img
                      src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_1.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="back">
                  <a
                    href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                    target="_blank"
                    onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                  >
                    <img
                      src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_1.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="top">
                  <a
                    href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                    target="_blank"
                    onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                  >
                    <img
                      src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_2.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="bottom">
                  <a
                    href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                    target="_blank"
                    onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                  >
                    <img
                      src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_1.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="left">
                  <a
                    href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                    target="_blank"
                    onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                  >
                    <img
                      src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_2.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="right">
                  <a
                    href="https://zebpay.com/in/register/?utm_source=news18&utm_medium=english&utm_campaign=article&utm_id=referral"
                    target="_blank"
                    onClick="ga('send', 'event', 'cube_innovation', 'Click', 'ZebPay')"
                  >
                    <img
                      src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/cude_2.jpg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
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
              <span onClick="ShowZebPayAboutData()">अबाउट ZebPay</span>
            </div>
          </footer>
        </div>
      </div>
      <style jsx global>{`
        .rotatebox {
          width: 300px;
          height: 250px;
          margin: 14px 0 10px;
          position: relative;
        }
        .rotatebox .closebutton {
          transform: rotate(45deg);
          width: 27px;
          height: 27px;
          margin: 0;
          float: right;
          border-radius: 50%;
          background: #590591;
          box-sizing: border-box;
          position: absolute;
          cursor: pointer;
          top: -52px;
          right: -34px;
          z-index: 1;
        }
        .rotatebox .closebutton:before {
          position: absolute;
          content: "";
          top: 8px;
          left: 13px;
          height: 11px;
          width: 1px;
          background: #fff;
        }
        .rotatebox .closebutton:after {
          position: absolute;
          content: "";
          top: 13px;
          left: 9px;
          width: 10px;
          height: 1px;
          background: #fff;
        }
        .rotatebox .cubewrap {
          perspective: 900px;
          perspective-origin: 50% 100px;
        }
        .rotatebox .cube {
          position: relative;
          width: 200px;
          transform-style: preserve-3d;
        }
        .rotatebox .cube div {
          position: absolute;
          width: 200px;
          height: 200px;
        }
        .rotatebox .back {
          transform: translateZ(-100px) rotateY(180deg);
        }
        .rotatebox .right {
          transform: rotateY(-270deg) translateX(100px);
          transform-origin: top right;
        }
        .rotatebox .left {
          transform: rotateY(270deg) translateX(-100px);
          transform-origin: center left;
        }
        .rotatebox .top {
          transform: rotateX(-90deg) translateY(-100px);
          transform-origin: top center;
        }
        .rotatebox .bottom {
          transform: rotateX(90deg) translateY(100px);
          transform-origin: bottom center;
        }
        .rotatebox .front {
          transform: translateZ(100px);
        }
        @keyframes spin {
          from {
            transform: rotateY(0);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        .rotatebox .cube {
          animation: spin 7s infinite linear;
        }
        @media screen and (max-width: 1800px) {
          .rotatebox {
            border: none;
            width: inherit;
            height: inherit;
          }
          .rotatebox .closebutton {
            width: 20px;
            height: 20px;
            top: -30px;
            right: -22px;
          }
          .rotatebox .closebutton:before {
            top: 4px;
            left: 10px;
          }
          .rotatebox .closebutton:after {
            top: 8px;
            left: 6px;
          }
          .rotatebox .cubewrap {
            position: fixed;
            z-index: 99;
            perspective-origin: 50% 51px;
            bottom: 141px;
            right: 31px;
          }
          .rotatebox .cube {
            width: 102px;
          }
          .rotatebox .cube img {
            width: 102px;
            height: 102px;
          }
          .rotatebox .cube div {
            width: 102px;
            height: 102px;
          }
          .rotatebox .back {
            transform: translateZ(-51px) rotateY(180deg);
          }
          .rotatebox .right {
            transform: rotateY(-270deg) translateX(51px);
            transform-origin: top right;
          }
          .rotatebox .left {
            transform: rotateY(270deg) translateX(-51px);
            transform-origin: center left;
          }
          .rotatebox .top {
            transform: rotateX(-90deg) translateY(-51px);
            transform-origin: top center;
          }
          .rotatebox .bottom {
            transform: rotateX(90deg) translateY(51px);
            transform-origin: bottom center;
          }
          .rotatebox .front {
            transform: translateZ(51px);
          }
        }
      `}</style>
    </>
  );
};
export default crypto_term;
