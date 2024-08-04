import React, { useMemo, memo } from "react";
import dynamic from "next/dynamic";

const RhsCommon = memo(dynamic(() => import("widgets/Common/Desktop/RhsCommon")));

const CookiePolicyDesktop = (props) => {
  const { pageAds, photoStories, topStories, currentUrl, topStory, isMobile } = useMemo(
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
            <div className="pd15 section-blog-le.ft-aricle">
            <div className="trms_wrapper">
                <h1 className="f_heading"><a id="cookies">Cookie Policy</a></h1>
                <div id="text_contener">
                <p>Network18 Media and Investments Ltd. (“we”, “us”) understands that privacy is important to the data subject (“you”, “your”, “user”, “subscriber”) and we are committed to being transparent about the technologies we use. This Cookie Policy explains how and why cookies and other similar technologies may be stored on and accessed from your device when you use or visit the Our Websites or Applications that post a link to this Policy (collectively, “the Sites”). This Cookie Policy should be read together with our Privacy Policy.</p>

                <h2>What are cookies and other tracking technologies?</h2>
                <p>A cookie is a small text file that a website saves on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences (such as login, language, and font size and other display preferences) over a period of time, so you don't have to keep re-entering them whenever you re-visit the site or browse different pages. The other tracking technologies (e.g. web beacons, pixels, sdk files, scripts) work in a manner similar to the working of cookies and place small data files on your devices to monitor your website activity and enable us to collect information about how you use Our Websites. This allows Our Websites to uniquely identify your device from those of other users of the websites. The information about cookies provided below also applies to the other tracking technologies.</p>

                <h2>How do we use cookies and other tracking technologies?</h2>
                <p>We use cookies to collect and store information when you visit our website and use the website’s services. We use cookies for various purposes such as:<br/>

                a.  To provide non-personalized or personalized advertisements<br/>
                b.  To identify your location<br/>
                c.  To identify your browser and device<br/>
                d.  For analytics and research,<br/>
                e.  To measure and analyze the audience for each page in order to subsequently improve the ergonomics, browsing, or visibility of content;<br/>
                f.  To measure the reliability of Our Websites by analyzing the number of visits to its pages in real time, and offer varied ads that are adapted to users’ areas of interest;<br/>

                </p>

                <p>Cookies may also be saved by social media tools if you use these functionalities (e.g. Facebook, Google, &amp; Twitter).</p>

                <h2>Type of Cookies</h2>

                <h3>First-party cookies</h3>
                <p>These are the cookies that belong to us and that we place on your device or are those set by a website that is being visited by you at the time. We use these cookies as they are absolutely necessary to provide you moneycontol’s services. If you choose to opt out of these cookies, then we may not be able to provide you services. The table below would help you to understand what these necessary cookies do.</p>

                <h3>Third-party cookies</h3>
                <p>These cookies are those that another party places on your device through our site (For e.g. advertising agencies may place their cookies on our website which will collect tracking information and serve you with advertisements).</p>

                <h2>We use the following types of cookies:</h2>
                <h3>Persistent Cookies</h3>
                <p>We use persistent cookies to improve your experience of using the sites. This includes recording your acceptance of our Cookie Policy to remove the cookie message which first appears when you visit the Site.</p>
                <h3>Session Cookies </h3>
                <p>Session Cookies are temporary and deleted from your device when your web browser closes. We use session Cookies to help us track internet usage as described above.</p>

                <p>You may refuse to accept browser Cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of the Site. Unless you have adjusted your browser setting so that it will refuse Cookies, our system will check if Cookies can be captured when you direct your browser to our Site.</p>

                <p>The data collected by the website and/or through cookies that may be placed on your computer will not be kept for longer than is necessary to fulfil the purposes mentioned above. In any event, such information will be kept in our database until we get explicit consent from you to remove all the stored cookies. The cookies placed on the Website include:</p>

                <table cellPadding="5" cellSpacing="0" id="table4" border="1">
                <tbody><tr>
                <th><strong>Cookie Name</strong></th>
                <th><strong>What's it for</strong></th>
                </tr>
                <tr>
                <td>First Party Cookies(Internal Cookies)</td>
                <td>To provide you The website's Services</td>
                </tr>

                <tr>
                <td>Google Analytics</td>
                <td>Google provides us with analytical information about the users. Google Analytics sets a cookie in order to evaluate use of those services and compile a report for us.<a href="">Opt-out of Google Analytics cookies</a></td>
                </tr>

                <tr>
                <td>Google DoubleClick</td>
                <td>We uses Google DoubleClick to measure the effectiveness of our online marketing campaigns.<a href="">Opt-out of DoubleClick cookies</a></td>
                </tr>

                </tbody></table>

                <h2>We categorize cookies as follows:</h2>
                <h3>Strictly Necessary/Technical</h3>
                <p>These Cookies are necessary to allow us to operate our Sites so you may access them as you have requested. These Cookies, for example, let us recognize that you have created an account and have logged in/out to access Site content. They also include Cookies that enable us to remember your previous actions within the same browsing session and secure our Sites.</p>

                <h3>Analytical/Performance</h3>
                <p>These Cookies are used by us or third-party service providers to analyse how the Sites are used and how they are performing. For example, these Cookies track what type of articles are most frequently visited and which locations we receive most of our visitors from. If you subscribe to a newsletter or otherwise register with the Sites, these Cookies may be correlated to you. These Cookies include, for example, Google Analytics cookies.
                </p>
                <h3>Functionality</h3>
                <p>These Cookies let us operate the Sites in accordance with the choices you make. These Cookies permit us to "remember" you in-between visits. For instance, we will recognize your user name and remember how you customized the Sites and services, for example by adjusting text size, fonts, languages and other parts of web pages that are alterable, and provide you with the same customizations during future visits.
                </p>

                <h3>Targeting or Advertising Cookies</h3>

                <p>These cookies are used to deliver content that is more relevant to you and your interests. They are also used to deliver targeted advertising or limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaigns on our websites. They remember that you have visited one of our websites and this information is shared with other parties, including advertisers and our agencies. These cookies may also be linked to site functionality provided by third-parties.
                </p>

                <h3>Third-Party Cookies. </h3>
                <p>
                We use a number of partners that may also set cookies on your device on our behalf when you visit our websites to allow them to deliver tailored advertising within their domains, for example Facebook and Google DoubleClick. We endeavour to identify these cookies before they are used so that you can decide whether you wish to accept them or not. We also use a number of partners to provide digital experiences and functionalities on our websites. For example, while browsing our websites you may be served cookies from third-parties who provide some of its features on Our Websites (e.g., a YouTube video), although you have withdrawn or declined your consent to our cookies. This happens because you have directly given your consent to the use of their cookies. In such cases, you should directly withdraw your consent on the relevant third-party website.</p>

                <h2>Do these cookies collect personal data/identify me? </h2>

                <p>Most types of cookies track consumers via their Device ID or IP address therefore they may collect personal data.
                Based on the type of cookies used by the relevant third-party, the information these cookies collect may include personal data but they may not be able to directly identify you as an individual or have any of your personal information such as Name, E-mail id or Mobile number.</p>

                <h2>How do I refuse or withdraw my consent to the use of Cookies?</h2>
                <p>If you do not want cookies to be dropped on your device, you can adjust the setting of your Internet browser to reject the setting of all or some cookies and to alert you when a cookie is placed on your device. For further information about how to do so, please refer to your browser 'help' / 'tool' or 'edit' section for cookie settings with respect to your browser that may be Google Chrome, Safari, Mozilla Firefox etc.</p>
                <p>
                Please note that if your browser setting is already setup to block all Cookies (including strictly necessary Cookies) you may not be able to access or use all or parts of functionalities of our Sites.</p>
                <p>If you want to remove previously-stored Cookies, you can manually delete the Cookies at any time. However, this will not prevent the Sites from placing further Cookies on your device unless and until you adjust your Internet browser setting as described above.
                </p>
                <p>For more information on the development of user-profiles and the use of targeting/advertising Cookies, please see www.youronlinechoices.eu if you are located in Europe or www.aboutads.info/choices if in the United States.</p>

                <h2>More Information</h2>
                <p>More detail on how businesses use cookies is available at www.allaboutcookies.org.</p>

                <p>If you have any queries regarding this Cookie Policy please contact our Data Protection Officer Tasneem Udaipurwala at <a href="mailto:DPO@nw18.com">DPO@nw18.com</a>.</p>

                </div>
            </div>
            </div>
          </div>
          {/* {!props.isMobile && ( */}
          {(
            <RhsCommon
              pageAds={pageAds}
              currentURL={currentUrl}
              photoStories={photoStories}
              isRss={true}
              topStories={
                rhsTopStoryListing.length ? rhsTopStoryListing : topStories
              }
              isMobile = {isMobile}
            />
          )}
        </div>
      </div>
      <style jsx global>{`
       body {
        font-family: "Mukta",sans-serif;
      } 
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

        #table4, #table4 tbody, #table4 tr, #table4 th, #table4 td {
            border: 1px solid #ccc;
        }
        #table4 th, #table4 td a {
            color: #1059a4;
        }
        #table4 th, #table4 td {
            padding: 10px;
            font-size: 14px;
            color: #404040;
        }
        #table4 th, #table4 td a {
            color: #1059a4;
        }
        #text_contener h2 {
            font-size: 24px;
            font-weight: bold;
            color: #404040;
            margin: 10px 0 15px 0;
        }
        #text_contener h3, #text_contener h4 {
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
      `}</style>
    </>
  );
};

export default CookiePolicyDesktop;
