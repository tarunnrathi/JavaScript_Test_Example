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
                <h2 className="trms_condton_hdng">
                    Terms & Conditions for “Kehta Hai Voter” contest.
                </h2>
                <p>
                The following are the terms and conditions (the <b>“Terms and Conditions”</b>) of the <b>“Kehta Hai Voter”</b> (<b>the “Contest”</b>) to be conducted/organized by TV18 Broadcast Limited (<b>"TV18"</b>) for its television channel <b>“News18 Madhya Pradesh / Chhattisgarh” and “News18 Rajasthan”</b> (hereinafter referred to as “Channels”. By participating in the Contest and/or performing any act as required in relation thereto, you (the <b>“Participant(s)”</b>) )declare that you have read and understood the Terms and Conditions and you unconditionally accept and agree to comply with and abide by these Terms and Conditions as stated herein or as may be modified at any time by TV18. <span className="underline">If you do not agree with any of the terms and conditions then the Participant should not participate in the Contest</span>.
                </p>                
                <ol className="trms_info inside">
                  <li>
                    <span>1.&nbsp;&nbsp; </span>
                    	This Contest is open only to Indian citizens who are residing in Madhya Pradesh, Chhattisgarh & Rajasthan at the time of conducting this Contest and are above the age of eighteen (18) years. Persons who are not "competent to contract" within the meaning of the Indian Contract Act, 1872 including minors, un-discharged insolvents etc., are not eligible to participate in the Contest.
                  </li>
                  <li>
                    <span>2.&nbsp;&nbsp; </span>Employees of TV18 & its subsidiaries/affiliates as well as employees of companies sponsoring the Contest/Prizes and their family members are not eligible to participate in the Contest.
                  </li>
                  <li>
                    <span>3.&nbsp;&nbsp; </span>This Contest will commence from 8th November (2:30pm) and will go on for 10 days (<b>the “Contest Period”</b>).
                  </li>
                  <li>
                    <span>4.&nbsp;&nbsp; </span>
                    To participate in the Contest, a Participant has to successfully place a missed call to the number specified by TV18 in the promo of  <b>“Kehta Hai Voter”</b> contest, to be aired on the Channel during the Contest Period. Every day during the Contest Period, TV18 shall randomly reach out to Participants for their videos bytes and  select one (1) Participant as the lucky winner (<b>“Winner”</b>) for the Channel on the basis of TV18’s selection criteria.
                  </li>
                  <li>
                    <span>5.&nbsp;&nbsp; </span>
                    TV18 shall not be liable to consider any missed call which has not been received/acknowledged in TV18’s system. No claims or objections shall be entertained in this regard. 
                  </li>                  
                  <li>
                    <span>6.&nbsp;&nbsp; </span>Each Winner of the Contest shall receive a mobile phone (“Prize”). TV18 may at its sole discretion telecast the Participant’s byte or a video featuring the Participant on the Channel. Once a Participant becomes a Winner, he/she won’t be eligible to participate again in this <b>Contest</b>.
                  </li>
                  <li>
                    <span>7.&nbsp;&nbsp; </span>The entire selection process shall be at the sole discretion of the TV18. TV18 shall have the absolute right to edit, amend, change or deviate from the process detailed above at any time of the selection process at its sole discretion without giving prior notice. Mere participation in the selection process and sending entries does not entitle the Participant to be selected. The selection process may vary and shall be as per TV18’s sole discretion. The Participant or any third party shall have no right to question the selection process. TV18 shall have the right to determine the criteria for the selection process in their sole discretion. TV18 reserves all rights to make amendments to the existing terms of the Contest, and/or withdraw the Contest and/or, change the schedule of the Contest.
                  </li>
                  <li>
                    <span>8.&nbsp;&nbsp; </span><span className="underline"><b>Grant of Rights and License to TV18:</b></span> By participating in the Contest and submitting the bytes, the Participants acknowledge, agree and confirm as follows:
                  </li>
                  <ol className="trms_info inside_2">
                    <li>
                        <span>a. &nbsp;&nbsp; </span>The Participant has an unconditional right and authority to participate and submit video byte and to grant TV18 the right to broadcast on its channels and all such modes, media and formats determined by TV18 at its discretion, the video bytes that may be submitted and such other details as may be submitted to participate in the Contest.
                    </li>
                    <li>
                        <span>b. &nbsp;&nbsp; </span>By participating in the Contest and accepting and agreeing to the terms and conditions herein and generally as part of the submission process, the Participant hereby exclusively, irrevocably and unconditionally assigns all copyrights and other intellectual property rights relating to the video bytes (including without limitation all exploitation rights thereof across all modes, mediums, formats, platforms and technologies, whether in existence now or to be developed in future), for the territory of the entire world in perpetuity, in favour of TV18, on and with effect from the date of submission of the video bytes, for exploitation in the manner determined by TV18 at its sole discretion. The Participant acknowledges and confirms that it shall, at its own cost and expense, obtain all requisite assignments, licenses, permissions, authorizations, no-objection certificates, written arrangements, etc., from the all other persons (if any) featuring in the video submitted by the Participant for the Contest.
                    </li>
                    <li>
                        <span>c. &nbsp;&nbsp; </span>The Participant hereby agrees that the provisions of Section 19(4) of the Copyright Act shall not apply to the above assignment by the Participant. The Participant hereby expressly waives its rights under the said section and also represents that it has entered into valid written agreements whereby the copyright assignments and waivers has been obtained by it, from all authors/ contributors of the underlying works comprised in the video bytes. 
                    </li>
                    <li>
                        <span>d. &nbsp;&nbsp; </span>By participating in the Contest, each Participant unconditionally acknowledges and confirms that: (i) TV18 shall have complete rights (as described above including but not limited to edit the video byte, alter or modify the video byte or any parts thereof, to ensure that the video byte complies with the technical specifications, and is otherwise suitable for exhibition to the general public, and for ensuring compliance with any applicable censorship or other laws anywhere in the world and to store the video bytes on its server or such other servers as may be authorized by TV18; and (ii) in lieu of the license of the rights in the video bytes as aforesaid, the Participant and their friend(s) featuring in the video bytes (if any) shall not claim any payments or raise dispute on usage by TV18 of same. Any breach or violation of sub-clause (ii) above by the Participant shall amount to breach of terms and conditions and entitle TV18 for all such rights and remedies as mentioned in this terms and conditions and as under applicable laws.
                    </li>
                    <li>
                        <span>e. &nbsp;&nbsp; </span>The Participant grants to TV18, its irrevocable consent in perpetuity to use the video bytes (entirely or in part) in any and all applications including but not limited to advertising, commercials, promotion, stories, text, articles and commercial exploitation, in any and all media forms, including but not limited to radio, broadcast and television, internet, newspapers, magazines and such other modes, media and platforms (whether existing at present, or which may be developed at any time in the future) at any time without the requiring the Participant’s and their friend(s) featuring in the video bytes (if any) further knowledge or consent. Further, acceptance of terms and conditions constitutes permission for TV18, its affiliates, promoters and all related entities to shoot videos, click photographs of such Participant featuring in the Contest Entry and use the Participant’s name, photographs, likeness, voice and comments for advertising and promotional purposes in any media worldwide for purposes of advertising and trade without any additional compensation whatsoever.
                    </li>
                    <li>
                        <span>f. &nbsp;&nbsp; </span>In submitting the video bytes to TV18, the Participant recognizes that TV18 engages in extensive activities in creating, acquiring and developing literary, artistic, musical and other material, including stories, ideas, themes, plots, titles, screenplays, and concepts for television, motion pictures and other developments, which are called “Materials”. The Participant recognizes that the Materials which TV18 may use in the future may have originated or may have been acquired from its own employees or others, and may duplicate or resemble elements of the video bytes. Participant appreciates TV18’s concern that any examination of the video bytes, without a full release of liability, might expose TV18 to a claim of plagiarism, or such other claim or threat of litigation. Therefore, as an inducement for TV18’s examination and evaluation of the video bytes, and in consideration of such examination, and without prejudice to the declarations provided herein or as may be required by TV18 from time to time, the Participant hereby acknowledges and agrees as follows:
                    </li>
                    <ol className="trms_info inside_2">
                      <li>
                        <span>(i) &nbsp;&nbsp; </span>Its submission of the video bytes to TV18 is voluntary, is not solicited by TV18, and not in confidence.
                      </li>
                      <li>
                        <span>(ii) &nbsp;&nbsp;</span>There is no agreement between TV18 and the Participant or any third party, express or implied, relating to TV18’s use or failure to use the video bytes or any part thereof.
                      </li>
                      <li>
                        <span>(iii) &nbsp;&nbsp; </span>The Participant shall not assert against TV18, its affiliates, licensees, assigns, officers, agents or employees any claim of any nature arising out of any alleged use by TV18 of the video bytes or any part thereof.
                      </li>
                      <li>
                        <span>(iv) &nbsp;&nbsp; </span>The Participant will not hold TV18 responsible for any loss, theft of the personal information, or any part thereof, including without limitation, the name, video bytes, stories, photographs, etc.
                      </li>
                      <li>
                        <span>(v) &nbsp;&nbsp; </span>The Participant hereby agrees to indemnify and keep indemnified TV18, officer, employee, affiliates, promoters, etc. from any and all claims in respect of any aspect of the video bytes (which may feature one or more other people /friends) as submitted by the Participant, or any of the intellectual property rights thereof, or the assignment thereof, or privacy or publicity, property rights or of any other claims, as well as claims from any third person(s) associated in any manner with the video bytes, or any claims arising from the breach/ violation of any of the foregoing terms and conditions.
                      </li>
                    </ol>
                  </ol>
                  <li>
                    <span>9.&nbsp;&nbsp; </span>Participants, who have not won the Contest, will not be eligible for any prize or any other gratification for participating in the Contest.
                  </li>
                  <li>
                    <span>10.&nbsp;&nbsp; </span>The Prize shall be provided to the Winner(s) within three (3) months of announcement of the Winner(s), subject to receipt of necessary documents/information from the Winner(s). TV18 shall make three attempts to provide/deliver Prize to the Winner(s). In the event, all three attempts are unsuccessful, the Prize shall stand forfeited.
                  </li>
                  <li>
                    <span>11.&nbsp;&nbsp; </span>The outcome of the Contest/decisions made by TV18 regarding Winners of the Contest shall be final and binding on the Participants and in no event shall the Participant or any other person dispute the decision made by TV18. The decision of TV18 cannot be challenged under any circumstance. By entering into the Contest, it shall be deemed that the Participant has waived his/her right to dispute any decision(s) made by TV18.
                  </li>
                  <li>
                    <span>12.&nbsp;&nbsp; </span>Participants are required to use the same mobile number for participating in the Contest, on which they can be subsequently contacted. The participants can give as many missed call(s) as they wish to. 
                  </li>
                  <li>
                    <span>13.&nbsp;&nbsp; </span>All applicable, taxes and levies on the winnings as imposed by Central, State and Local government authorities including gift tax will need to be paid by the winners and they are fully responsible in this regard for the same. 
                  </li>
                  <li>
                    <span>14.&nbsp;&nbsp; </span>Participants acknowledge that the Prize is sponsored and agree that TV18 will not be responsible for the same. TV18 makes no representations or warranties (express or implied), and shall have no responsibility as regards the Prize, its condition, its fitness for a particular purpose, etc. TV18 shall not be responsible for any deficiency in the Prize in any manner whatsoever. TV18 accepts no responsibility for the quality of the Prize. In case of any problems with the usability of the Prize, the Winner will need to directly contact the telecom service provider for the same.
                  </li>
                  <li>
                    <span>15.&nbsp;&nbsp; </span>Participants are required to give the correct details about themselves to TV18. TV18 shall not be liable for any loss or damage cause to a Participant arising due to submission of incorrect details. TV18 may require any Winner to produce any other document at its discretion in order to confirm his / her identity before the Prize is disbursed. 
                  </li>
                  <li>
                    <span>16.&nbsp;&nbsp; </span>Mere participation in the Contest does not entitle a Participant to win a Prize. The Prize cannot be redeemed/exchanged for cash or cheque or any other benefits. The Winners will not be entitled to any compensation / benefits in any form whatsoever in lieu of the Prize. Further, no requests will be entertained for the exchange of one Prize for another.
                  </li>
                  <li>
                    <span>17.&nbsp;&nbsp; </span>TV18 reserves the right to modify, alter, cancel, postpone or discontinue the Contest at its sole discretion or change all or any part of Terms and Conditions, without giving any prior notice/intimation and without assigning any reason. TV18 shall not be liable for any consequential losses/damages arising out of such change, modifications, alteration, postponement or cancelation of this Contest.
                  </li>
                  <li>
                    <span>18.&nbsp;&nbsp; </span>TV18 reserves the right to disqualify a Participant/Winner in the event TV18 has reason to believe that the Participant/Winner has acted in a fraudulent manner and/or has violated these Terms and Conditions.
                  </li>
                  <li>
                    <span>19.&nbsp;&nbsp; </span>The Participant/viewer of the Contest agrees that they shall indemnity, hold harmless TV18, its employees, officers or any other person in relation to any injury/damage/harm/loss suffered by them, in any manner, whatsoever in connection with the Contest and shall also not file in person/ through any family member, criminal and/or civil proceedings in any courts or forum anywhere in the world against the sponsor, and/or the TV18 to claim any damages or reliefs’ or otherwise. 
                  </li>
                  <li>
                    <span>20.&nbsp;&nbsp; </span>Nothing here in amounts to a commitment or representation by TV18 to conduct further schemes/contests.
                  </li>
                  <li>
                    <span>21.&nbsp;&nbsp; </span>TV18 shall not be responsible for the non-delivery/delayed delivery of the Prize for any reason not attributable to TV18’s default or for reasons beyond the control of TV18.
                  </li>
                  <li>
                    <span>22.&nbsp;&nbsp; </span>TV18 is free to reproduce, distribute and publicly display contest entries without limitations or obligation of any kind. TV18 is also free to use any responses sent by Participants for any purpose. TV18 reserves the right to analyze and summarize data that it collects and also reserves the right to publish, distribute, share summaries of the data collected with sponsors or other business partners without limitations or obligations of any kind.
                  </li>
                  <li>
                    <span>23.&nbsp;&nbsp; </span>The decision of TV18 and / or its representatives, employees, directors, officers or agents with respect to the Contest, any matter related thereto including the choice of questions or the manner of choosing of winner(s) will be final and binding on all participants and no questions, correspondence, enquiries, etc. on the manner of conduct of the Contest from any party whatsoever will be entertained.
                  </li>
                  <li style={{backgroundColor:"yellow"}}>
                    <span>24.&nbsp;&nbsp; </span>Our AR services require us to collect images and other information from your device’s camera and photos. For example, you won’t be able to use/apply the AR filters unless we can access your camera or photos.
                  </li>
                  <li style={{backgroundColor:"yellow"}}>
                    <span>25.&nbsp;&nbsp; </span>We are fully committed to following laws related to the collection of data and to our carefully considered policy on data collection. You are only required to share/upload your picture with us and TV18 shall not be liable for any damages direct or indirect for any dispute arising out of the use of the said picture.
                  </li>
                  <li>
                    <span>26.&nbsp;&nbsp; </span>To the extent permitted by law, TV18 or its representatives, employees, directors, officers or agents, shall not be liable for any loss suffered or sustained, to person or property including, but not limited to, consequential (including economic) loss by reason of any act or omission, deliberate or negligent on the part of TV18 or its representatives, employees, directors, officers or agents.
                  </li>
                  <li>
                    <span>27.&nbsp;&nbsp; </span>If at any time during the continuance of this Contest, the performance in whole or in part is prevented or delayed by reasons of a Force Majeure event, then from the date of occurrence of such event, there shall not be any claim against TV18 for damages, or any liability against it, in respect of such non-performance or delayed performance. For the purposes of this Contest, Force Majeure event means and includes any event beyond the reasonable control of TV18 including war, hostility, fires, floods, explosives, epidemics, quarantine restrictions, strikes, lock outs, compliance with orders or instructions of any court, statutory or governmental interventions or any other act of God.
                  </li>
                  <li>
                    <span>28.&nbsp;&nbsp; </span>These terms and conditions shall be governed by & construed in accordance with the applicable laws in India. Any dispute including any dispute arising out of all matters with respect to the contest are subject to the jurisdiction of the Courts at Delhi only.
                  </li>
                </ol>
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
        .underline{
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Kehta_Hai_VoterDesktop;
