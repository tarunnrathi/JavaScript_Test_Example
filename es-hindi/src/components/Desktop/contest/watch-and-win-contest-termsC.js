import React, { useMemo } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";

const Kehta_Hai_VoterDesktop = (props) => {
  const { pageAds, photoStories, topStories, currentUrl, topStory } = useMemo(
    () => props.data,
    [props.data],
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
            style={!props.data.isMobile ? {} : { width: "100%" }}
          >
            <div className="pd15 section-blog-left-aricle">
              <div className="trms_wrapper">
                <h1 className="trms_condton_hdng">Terms & Conditions for “Watch & Win” contest</h1>
                <p>The terms and conditions contained herein (hereinafter referred to as "Terms") apply to the Watch & Win (“Contest”) conducted by TV18 Broadcast Limited ("TV18") for its flagship channel News18 India on TV, Social Media, Digital Media and Trade Portals, to be hosted on 3rd December 2022. Your participation in the Contest will be construed as an acceptance of the Terms. If you do not agree to any of the Terms you should not participate in the Contest. TV18 reserves the right to modify the Terms at any time.</p>
                <ul className="topContent">
                  <li>The registrations for the Contest will commence on 1st December 2023 at 6:00 AM and end on 2nd December 2023 at 11:59 PM IST (“Term”).</li>
                  <li>The Contest is open to Indian Citizens residing within the geographical territory of India only. It is the sole responsibility of the viewer to ensure that they are entitled to participate in this Contest as per the applicable law.</li>
                  <li>Employees of TV18 & its subsidiaries/group companies as well as those companies & their subsidiaries sponsoring the Contest/Contest prizes and their families are not eligible to participate in the Contest.</li>
                </ul>
                <h2 className="trms_condton_hdng">Rules of Participation</h2>
                <ul className="topContentRules">
                    <li>During the Term of the Contest interested viewers/participants shall give a missed call on the number 9990898918, pursuant to which the said viewer/participant will receive a ‘Thank you’ message as confirmation of their participation. </li>
                    <li>During the Term of the Contest, interested viewers/participants can simply click on the social media post/banner to participate in the contest. On clicking the creative, they will be landed to the contest page wherein they can share the required inputs.</li>
                    <li>During the Term of the Contest, interested viewers/participants, viewers of the WhatsApp News18 India channel will receive the link leading to the contest page.</li>
                    <li>A landing page with Google Form seeking basic details from the viewers along with the question for the contest needs to be filled by the viewers/participants wanting to participate in the contest.</li>
                    <li>Among the entries received, a total of 10 participants/viewers will be randomly selected as the winners of the Contest. The winner(s) of the Contest shall be announced on News18 India channel, Social Media handles and WhatsApp channel and will be contacted individually.  </li>
                    <li>The winners will be chosen by TV18, randomly amongst the entries/participation received from participants/viewers through the missed call.</li>
                    <li>The winning participants/viewers will receive attractive prizes/smartphone as a gratification.</li>
                    <li>The discretion of shortlisting the winner(s) lies solely with TV18 and it cannot be challenged under any circumstance. The decision of TV18 in this matter will be final and binding and no questions, correspondence, enquiries, etc. on the manner of the selection and the Contest itself from any party whatsoever will be entertained.</li>
                    <li>An entry/participation will be considered only when the participants/viewer successfully fill all the details in the Google Form. TV18 shall not be liable to consider any entry which has not been received in the TV18 system. No claims or objections shall be entertained in this regard. </li>
                    <li>Participants are required to use the same mobile number for participating in the Contest, on which they can be subsequently contacted. </li>
                    <li>The winner(s) will also be required to send (through the Google Form or email, as may be requested) copies of the following documents to TV18 (Identification documents) before being entitled to receive the Prize:
                      <ul className="innerContent">
                        <li>Identity Proof (Driving License/Passport/Ration Card/PAN Card/Voters ID Card etc.);</li>
                        <li>Current Address Proof (same as for Identity Proof); and</li>
                        <li>Copy of PAN</li>
                      </ul>
                      <p>This list is indicative and TV18 may require any winner to produce any other document at its discretion in order to confirm his/her identity before reaching the venue. </p>
                    </li>
                    <li>Mere participation in the Contest does not entitle you to be selected as a winner. The Invitation is neither transferable nor exchangeable.</li>
                    <li>The Management of TV18 & its subsidiaries/group companies reserve the right to cancel / postpone /stop this Contest at its discretion or change all or any part of terms and conditions that are applicable, without giving prior intimation of any kind and being liable for any consequential losses/damages.</li>
                    <li>The participant/viewer of the Contest agrees that they shall indemnify, hold harmless TV18, its employees, officers or any other person in relation to any injury/damage/harm/loss suffered by them, in any manner, whatsoever in connection with the Contest and shall also not file in person/ through any family member, criminal and/or civil proceedings in any courts or forum anywhere in the world against the sponsor, and/or the TV18 to claim any damages or reliefs’ or otherwise. </li>
                    <li>Nothing here in amounts to a commitment or representation by TV18 to conduct further or other schemes/contest.</li>
                    <li>TV18 is free to reproduce, distribute and publicly display contest entries without limitations or obligation of any kind. TV18 reserves the right to analyze and summarize data that we collect and also reserves the right to publish, distribute, and share summaries of the data collected with sponsors or other business partners without limitations or obligations of any kind.</li>
                    <li>TV18 reserves all rights to make amendments to the existing terms of the Contest, and/or withdraw the Contest.</li>
                    <li>We are fully committed to following laws related to the collection of data and to our carefully considered policy on data collection. You are required to give us the correct details about yourself and TV18 will not be liable for any damages direct or indirect for any wrong addresses submitted.  </li>
                    <li>The decision of TV18 and / or its representatives, employees, directors, officers or agents with respect to the Contest, any matter related thereto including the manner of choosing of winner(s) will be final and binding on all participants and no questions, correspondence, enquiries, etc. on the manner of conduct of the Contest from any party whatsoever will be entertained.</li>
                    <li>To the extent permitted by law, TV18 or its representatives, employees, directors, officers or agents, shall not be liable for any loss suffered or sustained, to person or property including, but not limited to, consequential (including economic) loss by reason of any act or omission, deliberate or negligent on the part of TV18 or its representatives, employees, directors, officers or agents.</li>
                    <li>These terms and conditions shall be governed by & construed in accordance with the applicable laws in India. Any dispute, including any dispute arising out of all matters with respect to the contest are subject to the jurisdiction of the Courts at Delhi only.</li>
                </ul>  
              </div>
            </div>
          </div>
          {!props.data.isMobile && (
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
        .trms_wrapper {
          font-size: 18px;          
          font-family:"Mukta",sans-serif;
          color: #1c1c1c;
        }
        .trms_wrapper h1, h2 {font-size: 24px; text-decoration: underline; padding: 10px 0px;}
        .trms_wrapper h1 {font-size: 32px;}
        .trms_wrapper p {
          line-height: 28px;
          font-weight: 400;
          color: #1c1c1c;
        }
        .trms_wrapper ul {margin: 20px;}
        .trms_wrapper ul li {
          line-height: 28px;
          font-weight: 400;
          margin-bottom: 20px;
          list-style-type:decimal
        }
        .topContent li, .innerContent li {
          list-style-type:disclosure-closed !important;
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
          padding: 0px 0 10px 0;
          
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        .trms_wrapper {
          width: 100%;
          margin: 0 auto;
          padding: 0px 10px;
        }
      `}</style>
    </>
  );
};

export default Kehta_Hai_VoterDesktop;
