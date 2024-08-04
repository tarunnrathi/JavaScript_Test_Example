import React, { useMemo } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";

const TreefieTermsAndConditionsDesktop = (props) => {
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
              <div className="trms_wrapper">
                <h2 className="trms_condton_hdng">
                  TERMS & CONDITIONS FOR ‘TREE-FIE’ CONTEST
                </h2>
                <p>
                  The terms and conditions contained herein (hereinafter
                  referred to as <b>"Terms"</b>) apply to the Tree-Fie Contest (
                  <b>“Contest”</b>) conducted by TV18 Broadcast Limited (
                  <b>"TV18"</b>) for its special campaign “India Pedh Lagao” to
                  be hosted from 22nd April 2023 till 30th April 2023 on News18
                  Rajasthan, News18 Uttar Pradesh/Uttarakhand, News18 Madhya
                  Pradesh/Chhattisgarh, News18 Bihar/Jharkhand, News18
                  Punjab/Haryana & News18 Jammu/Kashmir/Ladakh/Himachal. Your
                  participation in the Contest will be construed as an
                  acceptance of the Terms. If you do not agree to any of the
                  Terms you should not participate in the Contest. TV18 reserves
                  the right to modify the Terms at any time.
                </p>
                <ol className="trms_info inside">
                  <li>
                    <span>A. </span> This Contest will commence on 22th April
                    2023, [7:00] AM/PM and end on 30th April 2023 (“Term”).
                  </li>
                  <li>
                    <span>B. </span> The Contest is open to Indian Citizens
                    residing within the geographical territory of India only. It
                    is the sole responsibility of the viewer to ensure that they
                    are entitled to participate in this Contest as per the
                    applicable law.
                  </li>
                  <li>
                    <span>C. </span> Employees of TV18 & its subsidiaries/group
                    companies as well as those companies & their subsidiaries
                    sponsoring the Contest/Contest prizes and their families are
                    not eligible to participate in the Contest.
                  </li>
                </ol>
                <span className="inside heading">
                  <b>
                    <u>RULES OF PARTICIPATION</u>
                  </b>
                </span>
                <ol className="trms_info inside">
                  <li>
                    <span>1. </span>During the Term of the Contest interested
                    viewers/participants shall take and share a selfie with
                    their tree either through our various social media handles
                    or by uploading the same on their account and tagging us,
                    ‘News18’ on the same.
                  </li>
                  <li>
                    <span>2. </span>In order to share the selfie with us, the
                    viewers/participants shall give a missed call on the number
                    [9990 8989 18], pursuant to which the said
                    viewer/participant will receive a ‘Thank you’ message as a
                    confirmation of their participation.
                  </li>
                  <li>
                    <span>3. </span>Among the entries received, a total of 20
                    participant/viewers will be randomly selected as the winners
                    of the Contest. The winner(s) of the Contest shall be
                    announced and will be contacted individually.
                  </li>
                  <li>
                    <span>4. </span>The winner will be chosen by TV18, randomly
                    amongst the entries/participation received from
                    participants/viewers through the missed call.
                  </li>
                  <li>
                    <span>5. </span>The winning participants/viewers will be
                    gifted a 1000 INR voucher from Amazon subject to receipt of
                    necessary documents/information in order to ascertain
                    identity of the winners.
                  </li>
                  <li>
                    <span>6. </span>The discretion of shortlisting the winner(s)
                    lies solely with TV18 and it cannot be challenged under any
                    circumstance. The decision of TV18 in this matter will be
                    final and binding and no questions, correspondence,
                    enquiries, etc. on the manner of the selection and the
                    Contest itself from any party whatsoever will be
                    entertained.
                  </li>
                  <li>
                    <span>7. </span>An entry/participation will be considered
                    only when the participants/viewer successfully receive a
                    ‘Thank you’ message after giving a missed call on the number
                    displayed on the News18 India channel or after tagging
                    ‘News18’ in their posts. TV18 shall not be liable to
                    consider any entry which has not been received in the TV18
                    system. No claims or objections shall be entertained in this
                    regard.
                  </li>
                  <li>
                    <span>8. </span>Participants are required to use the same
                    mobile number for participating in the Contest, on which
                    they can be subsequently contacted. The participants can
                    only make one call on the aforesaid number.
                  </li>
                  <li>
                    <span>9. </span>The winner(s) will also be required to send
                    (by post or email as may be requested) copies of the
                    following documents to TV18 (Identification documents)
                    before being entitled to receive the Prize:
                    <p></p>
                    <ol className="trms_info inside_2">
                      <li>
                        <span>a. </span>Identity Proof (Driving
                        License/Passport/Ration Card/PAN Card/Voters ID Card
                        etc.);
                      </li>
                      <li>
                        <span>b. </span>Current Address Proof (same as for
                        Identity Proof); and
                      </li>
                      <li>
                        <span>c. </span>Copy of PAN This list is indicative and
                        TV18 may require any winner to produce any other
                        document at its discretion in order to confirm his/her
                        identity before reaching the venue.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <span>10. </span>Mere participation in the Contest does not
                    entitle you to be selected as a winner. The Amazon Voucher
                    is neither transferable nor exchangeable.
                  </li>
                  <li>
                    <span>11. </span>The Management of TV18 & its
                    subsidiaries/group companies reserve the right to cancel /
                    postpone /stop this Contest at its discretion or change all
                    or any part of terms and conditions that are applicable,
                    without giving prior intimation of any kind and being liable
                    for any consequential losses/damages.
                  </li>
                  <li>
                    <span>12. </span>The participant/viewer of the Contest
                    agrees that they shall indemnify, hold harmless TV18, its
                    employees, officers or any other person in relation to any
                    injury/damage/harm/loss suffered by them, in any manner,
                    whatsoever in connection with the Contest and shall also not
                    file in person/ through any family member, criminal and/or
                    civil proceedings in any courts or forum anywhere in the
                    world against the sponsor, and/or the TV18 to claim any
                    damages or reliefs’ or otherwise.
                  </li>
                  <li>
                    <span>13. </span>Nothing here in amounts to a commitment or
                    representation by TV18 to conduct further or other
                    schemes/contest.
                  </li>
                  <li>
                    <span>14. </span>TV18 is free to reproduce, distribute and
                    publicly display contest entries without limitations or
                    obligation of any kind. TV18 reserves the right to analyze
                    and summarize data that we collect and also reserves the
                    right to publish, distribute, share summaries of the data
                    collected with sponsors or other business partners without
                    limitations or obligations of any kind.
                  </li>
                  <li>
                    <span>15. </span> TV18 reserves all rights to make
                    amendments to the existing terms of the Contest, and/or
                    withdraw the Contest.
                  </li>
                  <li>
                    <span>16. </span> We are fully committed to following laws
                    related to the collection of data and to our carefully
                    considered policy on data collection. You are required to
                    give us the correct details about yourself and TV18 will not
                    be liable for any damages direct or indirect for any wrong
                    addresses submitted.
                  </li>
                  <li>
                    <span>17. </span>The decision of TV18 and / or its
                    representatives, employees, directors, officers or agents
                    with respect to the Contest, any matter related thereto
                    including the manner of choosing of winner(s) will be final
                    and binding on all participants and no questions,
                    correspondence, enquiries, etc. on the manner of conduct of
                    the Contest from any party whatsoever will be entertained.
                  </li>
                  <li>
                    <span>18. </span>To the extent permitted by law, TV18 or its
                    representatives, employees, directors, officers or agents,
                    shall not be liable for any loss suffered or sustained, to
                    person or property including, but not limited to,
                    consequential (including economic) loss by reason of any act
                    or omission, deliberate or negligent on the part of TV18 or
                    its representatives, employees, directors, officers or
                    agents.
                  </li>
                  <li>
                    <span>19. </span>These terms and conditions shall be
                    governed by & construed in accordance with the applicable
                    laws in India. Any dispute including any dispute arising out
                    of all matters with respect to the contest are subject to
                    the jurisdiction of the Courts at Delhi only.
                  </li>
                </ol>
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
      `}</style>
    </>
  );
};

export default TreefieTermsAndConditionsDesktop;
