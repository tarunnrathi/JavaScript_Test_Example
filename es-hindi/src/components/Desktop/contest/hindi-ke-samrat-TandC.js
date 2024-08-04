import React, { useMemo } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";

const TreefieTermsAndConditionsDesktop = (props) => {
  const { pageAds, photoStories, topStories, currentUrl, topStory } = useMemo(
    () => props.data,
    [props.data],
  );
  let rhsTopStoryListing = [];
  if ("rhsTopStoryListing" in topStory)
    rhsTopStoryListing = topStory.rhsTopStoryListing;

  return (
    <>
      <div class="outer">
        <div class="section-blog">
          <div
            class="section-blog-left resLiftSideFull"
            style={!props.data.isMobile ? {} : { width: "100%" }}
          >
            <div class="pd15 section-blog-left-aricle">
              <div class="trms_wrapper">
                <h2 class="trms_condton_hdng">
                  Terms & Conditions for “Hindi Ke Samrat” contest.
                </h2>
                <p>
                  The following are the terms and conditions (the{" "}
                  <b>“Terms and Conditions”</b>) of the <b>“Hindi Ke Samrat”</b>{" "}
                  (the <b>“Contest”</b>) to be conducted/organized by TV18
                  Broadcast Limited (<b>“TV18” / “Organizer”</b>) for its
                  television channels “News18 Rajasthan”, “News18 Uttar
                  Pradesh/Uttarakhand”, “News18 Madhya Pradesh/Chhattisgarh” and
                  “News18 Bihar/Jharkhand” ( hereinafter individually referred
                  to as <b>“Channel”</b> and collectively referred to as{" "}
                  <b>“Channels”</b>). By participating in the Contest and/or
                  performing any act as required in relation thereto, you (the{" "}
                  <b>“Participant(s)”</b>) declare that you have read and
                  understood the Terms and Conditions and you unconditionally
                  agree to comply with and abide by these Terms and Conditions
                  as stated herein or as may be modified at any time by TV18. If
                  you do not agree with any of the terms and conditions then the
                  Participant should not participate in the Contest.
                </p>
                <span className="inside heading">
                  <b>
                    <u>RULES OF PARTICIPATION</u>
                  </b>
                </span>
                <ol class="trms_info inside">
                  <li>
                    <span>1. </span>
                    This Contest is open only to Indian citizens who are
                    residing in Rajasthan, Uttar Pradesh, Uttarakhand, Madhya
                    Pradesh, Chhattisgarh, Bihar and Jharkhand at the time of
                    conducting this Contest and are above the age of eighteen
                    (18) years. Persons who are not "competent to contract"
                    within the meaning of the Indian Contract Act, 1872
                    including minors, un-discharged insolvents etc., are not
                    eligible to become a Participant in the Contest.
                  </li>
                  <li>
                    <span>2. </span>This Contest will commence from 12th
                    September 2023 (01:00 PM) and will expire on 14th September
                    2023 (11:59 PM) (the <b>“Contest Period”</b>).
                  </li>
                  <li>
                    <span>3. </span>To participate in the Contest, a Participant
                    has to successfully give a missed call on number specified
                    by TV 18. Thereafter, TV 18 will randomly select
                    participants and call them to ask quiz questions. If the
                    participant answers all questions correctly, he /she will be
                    entitled as winner. TV18 shall not be liable to consider any
                    missed call which has not been received by it on the number{" "}
                    <b>“9990898918”</b> during the Contest Period. No claims or
                    objections shall be entertained in this regard.
                  </li>
                  <li>
                    <span>4. </span>
                    <b>Grant of Rights and License to the Organizer</b>: By
                    participating in the Contest and submitting the Contest
                    Entry/ies, the Participants acknowledge, agree and confirm
                    as follows:
                  </li>
                  <ol class="trms_info inside_2">
                    <li>
                      <span>a. </span>The Participant has an unconditional right
                      and authority to participate and submit the Contest Entry
                      and to grant Organizer the right to broadcast on its
                      channels and all such modes, media and formats determined
                      by the Organizer at its discretion, the Contest Entries
                      that may be submitted and such other details as may be
                      submitted to participate in the Contest.
                    </li>
                    <li>
                      <span>b. </span>By participating in the Contest and
                      accepting and agreeing to the terms and conditions herein
                      and generally as part of the submission process, the
                      Participant hereby exclusively, irrevocably and
                      unconditionally assigns all copyrights and other
                      intellectual property rights relating to the Contest Entry
                      (including without limitation all exploitation rights
                      thereof across all modes, mediums, formats, platforms and
                      technologies, whether in existence now or to be developed
                      in future), for the territory of the entire world in
                      perpetuity, in favour of the Organizer, on and with effect
                      from the date of submission of the entry, for exploitation
                      in the manner determined by the Organizer at its sole
                      discretion. The Participant acknowledges and confirms that
                      it shall, at its own cost and expense, obtain all
                      requisite assignments, licenses, permissions,
                      authorizations, no-objection certificates, written
                      arrangements, etc., from the all other persons (if any)
                      featuring in the photographs submitted by the Participant
                      for the Contest.
                    </li>
                    <li>
                      <span>c. </span>The Participant hereby agrees that the
                      provisions of Section 19(4) of the Copyright Act shall not
                      apply to the above assignment by the Participant. The
                      Participant hereby expressly waives its rights under the
                      said section and also represents that it has entered into
                      valid written agreements whereby the copyright assignments
                      and waivers has been obtained by it, from all authors/
                      contributors of the underlying works comprised in the
                      Contest Entries.
                    </li>
                    <li>
                      <span>d. </span>By participating in the Contest, each
                      Participant unconditionally acknowledges and confirms
                      that: (i) Organizer shall have complete rights (as
                      described above including but not limited to download the
                      Contest Entry to edit, alter or modify the entry or any
                      parts thereof, to ensure that the Contest Entry complies
                      with the technical specifications, and is otherwise
                      suitable for exhibition to the general public, and for
                      ensuring compliance with any applicable censorship or
                      other laws anywhere in the world and to store the Contest
                      Entries on its server or such other servers as may be
                      authorized by Organizer; and (ii) in lieu of the license
                      of the rights in the Contest Entry as aforesaid, the
                      Participant and their friend(s) featuring in the Contest
                      Entry (if any) shall not claim any payments or raise
                      dispute on usage by the Organizer of same. Any breach or
                      violation of sub-clause (ii) above by the Participant
                      shall amount to breach of terms and conditions and entitle
                      the Organizer for all such rights and remedies as
                      mentioned in this terms and conditions and as under
                      applicable laws.
                    </li>
                    <li>
                      <span>e. </span>The Participant grants to Organizer, its
                      irrevocable consent in perpetuity to use the Contest
                      Entries (entirely or in part) in any and all applications
                      including but not limited to advertising, commercials,
                      promotion, stories, text, articles and commercial
                      exploitation, in any and all media forms, including but
                      not limited to radio, broadcast and television, internet,
                      newspapers, magazines and such other modes, media and
                      platforms (whether existing at present, or which may be
                      developed at any time in the future) at any time without
                      the requiring the Participant’s and their friend(s)
                      featuring in the Contest Entry (if any) further knowledge
                      or consent. Further, acceptance of terms and conditions
                      constitutes permission for Organizer, its affiliates,
                      promoters and all related entities to shoot videos, click
                      photographs of such Participant and the child of the
                      Participant featuring in the Contest Entry and use the
                      Participant’s name, photographs, likeness, voice and
                      comments for advertising and promotional purposes in any
                      media worldwide for purposes of advertising and trade
                      without any additional compensation whatsoever.
                    </li>
                    <li>
                      <span>f. </span>In submitting the Contest Entry to the
                      Organizer, the Participant recognizes that the Organizer
                      engages in extensive activities in creating, acquiring and
                      developing literary, artistic, musical and other material,
                      including stories, ideas, themes, plots, titles,
                      screenplays, and concepts for television, motion pictures
                      and other developments, which are called “Materials”. The
                      Participant recognizes that the Materials which the
                      Organizer may use in the future may have originated or may
                      have been acquired from its own employees or others, and
                      may duplicate or resemble elements of the Contest Entries.
                      Participant appreciates the Organizer’s concern that any
                      examination of the Contest Entries, without a full release
                      of liability, might expose the Organizer to a claim of
                      plagiarism, or such other claim or threat of litigation.
                      Therefore, as an inducement for Organizer’s examination
                      and evaluation of the Contest Entries, and in
                      consideration of such examination, and without prejudice
                      to the declarations provided herein or as may be required
                      by the Organizer from time to time, the Participant hereby
                      acknowledges and agrees as follows:
                    </li>
                    <ol class="trms_info inside_2">
                      <li>
                        <span>i. </span>Its submission of the Contest Entry to
                        Organizer is voluntary, is not solicited by Organizer,
                        and not in confidence.
                      </li>
                      <li>
                        <span>ii. </span>There is no agreement between Organizer
                        and the Participant or any third party, express or
                        implied, relating to Organizer’s use or failure to use
                        the Contest Entry or any part thereof.
                      </li>
                      <li>
                        <span>iii. </span>The Participant shall not assert
                        against Organizer, its affiliates, licensees, assigns,
                        officers, agents or employees any claim of any nature
                        arising out of any alleged use by Organizer of the
                        Contest Entries or any part thereof.
                      </li>
                      <li>
                        <span>iv. </span>The Participant will not hold Organizer
                        responsible for any loss, theft of the personal
                        information, or any part thereof, including without
                        limitation, the name, photographs, etc.
                      </li>
                      <li>
                        <span>v. </span>officer, employee, affiliates,
                        promoters, etc. from any and all claims in respect of
                        any aspect of the Contest Entries (which may feature one
                        or more other people /friends) as submitted by the
                        Participant, or any of the intellectual property rights
                        thereof, or the assignment thereof, or privacy or
                        publicity, property rights or of any other claims, as
                        well as claims from any third person(s) associated in
                        any manner with the Contest Entries, or any claims
                        arising from the breach/ violation of any of the
                        foregoing terms and conditions.
                      </li>
                    </ol>
                  </ol>

                  <li>
                    <span>5. </span>
                    <b>
                      Specific Representation and Warranties of all Participants
                    </b>
                    : Each Participant represents and warrants the following:
                  </li>
                  <ol class="trms_info inside_2">
                    <li>
                      <span>a. </span>Contest Entry(s) shall be suitable for
                      presentation in a public forum, in sole determination of
                      the Organizer.
                    </li>
                    <li>
                      <span>b. </span>Contest Entry(s) shall be original work
                      created by the Participant and that it shall in no manner
                      infringe any rights including intellectual property
                      rights, including without limitation, the copyright of a
                      third person/party.
                    </li>
                    <li>
                      <span>c. </span>Contest Entry shall not promote or
                      advertise any product(s), service(s) or brand(s).
                    </li>
                    <li>
                      <span>d. </span>Contest Entry(s) shall not contain content
                      that depicts alcohol or tobacco or drugs.
                    </li>
                    <li>
                      <span>e. </span>Contest Entry(s) shall not in any manner
                      depict or encourage harm or injury to any person, party,
                      animal.
                    </li>
                    <li>
                      <span>f. </span>Contest Entry(s) shall not contain text,
                      images or artwork not created by the Participant.
                    </li>
                    <li>
                      <span>g. </span>It understands that once a Contest Entry
                      has been submitted as an entry to this Contest, all rights
                      therein shall be deemed to have been assigned in favour of
                      TV18 or any of its Affiliates.
                    </li>
                    <li>
                      <span>h. </span>No license fee, royalties, charges, etc.
                      are payable to any person/party/copyright society anywhere
                      in the entire world, in relation to the Contest Entry
                      including the music(s), performance etc. as a part of the
                      Contest Entry and same are rights clear.
                    </li>
                    <li>
                      <span>i. </span>The Contest Entry(s) are not and will not
                      be uploaded/ publicized by Participants in any manner
                      including on social networks/websites/blogs nor be
                      discussed with any party, including without limitation the
                      press, about any information relating to this Contest, the
                      photograph, participation/appearance, or any other
                      information which may come to the knowledge of the
                      Participants, including without limitation in relation to
                      the Organizer or any of its employees, consultants or
                      vendors.
                    </li>
                    <li>
                      <span>j. </span>He / she has an unconditional right and
                      authority to participate and submit the Contest Entry
                      (which may feature one or more people along with them and
                      provide details, if any, of such people) and to grant
                      Organizer the right to broadcast on its channels and all
                      such modes, media and formats determined by the Organizer
                      at its discretion, the Contest Entries that may be
                      submitted and such other details as may be submitted to
                      participate in the Contest.
                    </li>
                    <li>
                      <span>k. </span>He / she exclusively, irrevocably and
                      unconditionally assigns all copyrights and other
                      intellectual property rights relating to the Contest Entry
                      (including without limitation all exploitation rights
                      thereof across all modes, mediums, formats, platforms and
                      technologies, whether in existence now; or in existence
                      now, but not in commercial use on the date of execution
                      hereof; or are developed in future), for the territory of
                      the entire world in perpetuity, in favour of the
                      Organizer, on and with effect from the date of submission
                      of the entry, for exploitation in the manner determined by
                      the Organizer at its sole discretion.
                    </li>
                    <li>
                      <span>l. </span>The Organizer shall have complete rights
                      (as described above including but not limited to download
                      the Contest Entry to edit, alter or modify the entry or
                      any parts thereof, to ensure that the Contest Entry
                      complies with the technical specifications, and is
                      otherwise suitable for exhibition to the general public,
                      and for ensuring compliance with any applicable censorship
                      or other laws anywhere in the world and to store the
                      Contest Entries on its server or such other servers as may
                      be authorized by Organizer; and that in lieu of the
                      license of the rights in the Contest Entry as aforesaid,
                      the Participant and any other person featuring in the
                      Contest Entry shall not claim any payments or raise
                      dispute on usage by the Organizer of same.
                    </li>
                    <li>
                      <span>m. </span>He / she acknowledges that the Organizer
                      shall not be liable for any mishap, injury, accident,
                      untoward incident, physical harm of any nature, death,
                      loss of life or limb, etc., caused to them, either before,
                      during or after the Contest; and the same shall not be
                      attributed to the Organizer and the Organizer shall not be
                      held responsible towards the same nor shall be liable to
                      indemnify or make good any claim being raised against it,
                      for whatsoever nature. In the event of any violation of
                      the aforementioned undertakings or misrepresentation, the
                      Organizer may in its sole discretion disqualify the
                      Contest Entry from the Contest with immediate effect. By
                      participating in the Contest, the Participants also
                      represent and warrant that he/she shall solely be liable
                      for any and all action (criminal/civil) arising therefrom,
                      whether in India or internationally, and shall also be
                      liable to indemnify the Organizer and any of its licensees
                      etc. for any loss, claim, dispute, disruption caused to
                      them.
                    </li>
                  </ol>
                  <li>
                    <span>6. </span>TV18 shall produce a short capsule on the
                    Participant and air the same on the Channel(s) on the Hindi
                    Diwas (<b>“Prize”</b>). A Participant shall not be entitled
                    to receive more than one (1) Prize in this Contest.
                  </li>
                  <li>
                    <span>7. </span>Employees of TV18 & its
                    subsidiaries/affiliates as well as employees of companies
                    sponsoring the Contest/Prizes and their family members are
                    not eligible to participate in the Contest.
                  </li>
                  <li>
                    <span>8. </span>Participants, who have not won the Contest,
                    will not be eligible for any prize or any other
                    gratification for participating in the Contest.
                  </li>
                  <li>
                    <span>9. </span>The outcome of the Contest/decisions made by
                    TV18 regarding the Winning Entry of the Contest shall be
                    final and binding on the Participants and in no event shall
                    the Participant or any other person dispute the decision
                    made by TV18. The decision of TV18 cannot be challenged
                    under any circumstance. By entering into the Contest, it
                    shall be deemed that the Participant has waived his/her
                    right to dispute any decision(s) made by TV18.
                  </li>
                  <li>
                    <span>10. </span>Participants are required to use the same
                    mobile number for participating in the Contest, on which
                    they can be subsequently contacted.
                  </li>
                  <li>
                    <span>11. </span>TV18 makes no representations or warranties
                    (express or implied) as regards the Prize, its condition,
                    its fitness for a particular purpose, etc. TV18 shall not be
                    responsible for any deficiency in the Prize in any manner
                    whatsoever.
                  </li>
                  <li>
                    <span>12. </span>TV18 may require any Participant to produce
                    any other document at its discretion in order to confirm his
                    / her identity before the Prize is given.
                  </li>
                  <li>
                    <span>13. </span>Mere participation in the Contest does not
                    entitle a Participant to win a Prize. The Prize cannot be
                    redeemed/exchanged for cash or cheque or any other benefits.
                    The Participant who has submitted the Winning Entry will not
                    be entitled to any compensation / benefits in any form
                    whatsoever in lieu of the Prize. Further, no requests will
                    be entertained for the exchange of one Prize for another.
                  </li>
                  <li>
                    <span>14. </span>TV18 reserves the right to modify, alter,
                    cancel, postpone or discontinue the Contest at its sole
                    discretion or change all or any part of Terms and
                    Conditions, without giving any prior notice/intimation and
                    without assigning any reason. TV18 shall not be liable for
                    any consequential losses/damages arising out of such change,
                    modifications, alteration, postponement or cancelation of
                    this Contest.
                  </li>
                  <li>
                    <span>15. </span>TV18 reserves the right to disqualify a
                    Participant/Contest Entry in the event TV18 has reason to
                    believe that the Participant has acted in a fraudulent
                    manner and/or has violated these Terms and Conditions.
                  </li>
                  <li>
                    <span>16. </span>Nothing here in amounts to a commitment or
                    representation by TV18 to conduct further schemes/contests.
                  </li>
                  <li>
                    <span>17. </span>TV18 shall not be responsible for the
                    non-delivery/delayed delivery of the Prize for any reason
                    not attributable to TV18’s default or for reasons beyond the
                    control of TV18..
                  </li>
                  <li>
                    <span>18. </span>TV18 is free to reproduce, distribute and
                    publicly display contest entries without limitations or
                    obligation of any kind. TV18 is also free to use any
                    responses sent by Participants for any purpose. TV18
                    reserves the right to analyze and summarize data that it
                    collects and also reserves the right to publish, distribute,
                    and share summaries of the data collected with sponsors or
                    other business partners without limitations or obligations
                    of any kind.
                  </li>
                  <li>
                    <span>19. </span>When you register yourself for the Contest
                    and should you be chosen as one of the winners, you provide
                    us with certain personal data/information which we shall
                    share with the Organisers, sponsors and/or business partners
                    for the Contest related communications and also for the
                    Organizers, sponsors and/or business partners and/or TV18
                    for future prospecting, to contact you for future business
                    engagement, to send marketing and/or promotional materials
                    about their respective services and products etc. from time
                    to time (‘Purpose’). It is clarified that you are giving
                    your express consent to TV18 and the Organizer, sponsors
                    and/or business partners for the use of your personal
                    data/information for the abovementioned Purpose.
                  </li>
                  <li>
                    <span>20. </span>TV18 is free to reproduce, distribute and
                    publicly display contest entries without limitations or
                    obligation of any kind. TV18 is also free to use any
                    responses sent by Participants for any purpose. TV18
                    reserves the right to analyze and summarize data that it
                    collects and also reserves the right to publish, distribute,
                    and share summaries of the data collected with sponsors or
                    other business partners without limitations or obligations
                    of any kind.
                  </li>
                  <li>
                    <span>21. </span>TV18 reserves all rights to make amendments
                    to the existing terms of the Contest, and/or withdraw the
                    Contest and/or, change the schedule of the Contest.
                  </li>
                  <li>
                    <span>22. </span>Participants are required to give the
                    correct details about themselves to TV18. TV18 shall not be
                    liable for any loss or damage cause to a Participant arising
                    due to submission of incorrect details.
                  </li>
                  <li>
                    <span>23. </span>The decision of TV18 and / or its
                    representatives, employees, directors, officers or agents
                    with respect to the Contest, any matter related thereto
                    including the choice of questions or the manner of choosing
                    of Winning Entry will be final and binding on all
                    participants and no questions, correspondence, enquiries,
                    etc. on the manner of conduct of the Contest from any party
                    whatsoever will be entertained.
                  </li>
                  <li>
                    <span>24. </span>To the extent permitted by law, TV18 or its
                    representatives, employees, directors, officers or agents,
                    shall not be liable for any loss suffered or sustained, to
                    person or property including, but not limited to,
                    consequential (including economic) loss by reason of any act
                    or omission, deliberate or negligent on the part of TV18 or
                    its representatives, employees, directors, officers or
                    agents.
                  </li>
                  <li>
                    <span>25. </span>If at any time during the continuance of
                    this Contest, the performance in whole or in part is
                    prevented or delayed by reasons of a Force Majeure event,
                    then from the date of occurrence of such event, there shall
                    not be any claim against TV18 for damages, or any liability
                    against it, in respect of such non-performance or delayed
                    performance. For the purposes of this Contest, Force Majeure
                    event means and includes any event beyond the reasonable
                    control of TV18 including war, hostility, fires, floods,
                    explosives, epidemics, quarantine restrictions, strikes,
                    lock outs, compliance with orders or instructions of any
                    court, statutory or governmental interventions or any other
                    act of God.
                  </li>
                  <li>
                    <span>26. </span>These terms and conditions shall be
                    governed by & construed in accordance with the applicable
                    laws in India. Any dispute including any dispute arising out
                    of all matters with respect to the contest are subject to
                    the jurisdiction of the Courts at Delhi only.
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
      `}</style>
    </>
  );
};

export default TreefieTermsAndConditionsDesktop;
