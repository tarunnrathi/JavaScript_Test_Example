import { useMemo } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";

const Disclaimer = (props) => {
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
                    <div className=" section-blog-left  resLiftSideFull">
                        <div className="pd15 section-blog-left-aricle">
                            <h1 className="f_heading">News18India.com DISCLAIMER &amp; TERMS OF USE</h1>
                            <div id="text_contener">
                                <p>By accessing NEWS18INDIA.COM  or any of its associate/group sites, you have read, understood and agree to be legally bound by the terms of the following disclaimer and user agreement:
                                </p>
                                <p>This Site is owned and operated by Web18 Software Services Limited ("the Company/Web18") and contains material which is derived in whole or in part from material supplied by the Company, various new agencies and other sources, and is protected by international copyright and trademark laws. The restrictions on use of the material and content on this Web18 Site by the Subscriber are specified below. Except where specifically authorised, the Subscriber may not modify, copy, reproduce, republish, upload, post, transmit or distribute in any way any material from this site including code and software.</p>

                                <p>Web18 has taken due care and caution in compilation of data for its web site. The views and investment tips expressed if any by investment experts on Web18 are their own, and not that of the website or its management. Web18 advises users to check with certified experts before taking any investment decision. However, Web18 does not guarantee the accuracy, adequacy or completeness of any information and is not responsible for any errors or omissions or for the results obtained from the use of such information. Web18 especially states that it has no financial liability whatsoever to any user on account of the use of information provided on its website. The Stock Market data has been provided on this site through moneycontrol.com for information purposes only.</p>

                                <p>The Company shall have the right at any time to change or modify the terms and conditions applicable to Subscriber's use of the Web18 Site, or any part thereof, or to impose new conditions, including but not limited to, adding fees and charges for use. Such changes, modifications, additions or deletions shall be effective immediately upon notice thereof, which may be given by means including but not limited to, posting on the Web18 Site, or by electronic or conventional mail, or by any other means by which Subscriber obtains notice thereof. Any use of the Web18 Site by Subscriber after such notice shall be deemed to constitute acceptance by Subscriber of such changes, modifications or additions.</p>

                                <h2>Terms of Use:</h2>

                                <p>By visiting our site you are agreeing to be bound by the following terms and conditions. We may change these terms and conditions at any time. Your continued use of NEWS18INDIA.COM  means that you accept any new or modified terms and conditions that we come up with. Please re-visit the `Terms of Use' link at our site from time to time to stay abreast of any changes that we may introduce.</p>

                                <p>The term 'NEWS18INDIA.COM' is used through this entire Terms of Use document to refer to the website, its owners and the employees and associates of the owner</p>

                                <p>The term 'NEWS18INDIA.COM' is used through this entire Terms of Use document to refer to the website, its owners and the employees and associates of the owner</p>

                                <h2>1) REGISTRATION</h2>
                                <p>By registering, you certify that all information you provide, now or in the future, is accurate. Your registration at NEWS18INDIA.COM  is valid for 90 days from the date you first login and is automatically renewed for a period of 90 days every time you login thereafter. If you do not login at NEWS18INDIA.COM  for a continuous period of 90 days your registration could be automatically cancelled. NEWS18INDIA.COM  reserves the right, in its sole discretion, to deny you access to this website or any portion thereof without notice for the following reasons (a) immediately by NEWS18INDIA.COM  for any unauthorized access or use by you (b) immediately by NEWS18INDIA.COM  if you assign or transfer (or attempt the same) any rights granted to you under this Agreement; (c) immediately, if you violate any of the other terms and conditions of this User Agreement</p>

                                <h2>2) LICENSE:</h2>
                                <p>NEWS18INDIA.COM  hereby grants you a limited, non-exclusive, non-assignable and non-transferable license to access NEWS18INDIA.COM  provided and expressly conditioned upon your agreement that all such access and use shall be governed by all of the terms and conditions set forth in this USER AGREEMENT.</p>
                                <h2>3) COPYRIGHT &amp; NO RETRANSMISSION OF INFORMATION:</h2>

                                <p>NEWS18INDIA.COM  as well as the design and information contained in this site is the valuable, exclusive property of NEWS18INDIA.COM , and nothing in this Agreement shall be construed as transferring or assigning any such ownership rights to you or any other person or entity.</p>

                                <p>You may not resell, redistribute, broadcast or transfer information, software and applications or use the information, software and applications provided by NEWS18INDIA.COM  in a searchable, machine-readable database unless separately and specifically authorized in writing by NEWS18INDIA.COM  prior to such use. You may not rent, lease, sublicense, distribute, transfer, copy, reproduce, publicly display, publish, adapt, store or time-share NEWS18INDIA.COM , any part thereof, or any of the software, application or information received or accessed therefrom to or through any other person or entity unless separately and specifically authorized in writing by NEWS18INDIA.COM  prior to such use. In addition, you may not remove, alter or obscure any copyright, legal or proprietary notices in or on any portions of NEWS18INDIA.COM  without prior written authorization. Except as set forth herein, any other use of the information, software or application contained in this site requires the prior written consent of GBN and may require a separate fee.</p>

                                <h2>4) DELAYS IN SERVICES:</h2>
                                <p>Neither NEWS18INDIA.COM  (including its and their directors, employees, affiliates, agents, representatives or subcontractors) shall be liable for any loss or liability resulting, directly or indirectly, from delays or interruptions due to electronic or mechanical equipment failures, telephone interconnect problems, defects, weather, strikes, walkouts, fire, acts of God, riots, armed conflicts, acts of war, or other like causes. NEWS18INDIA.COM  shall have no responsibility to provide you access to NEWS18INDIA.COM  while interruption of NEWS18INDIA.COM  is due to any such cause shall continue.</p>

                                <h2>5) LIABILITY DISCLAIMER :</h2>
                                <p>YOU EXPRESSLY AGREE THAT USE OF THE WEBSITE IS AT YOUR SOLE RISK.</p>
                                <p>THE CONTENTS, INFORMATION, SOFTWARE, PRODUCTS, FEATURES AND SERVICES PUBLISHED ON THIS WEB SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE CONTENTS HEREIN. NEWS18INDIA.COM  AND/OR ITS RESPECTIVE SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THIS WEB SITE AT ANY TIME. THIS WEB SITE MAY BE TEMPORARILY UNAVAILABLE FROM TIME TO TIME DUE TO REQUIRED MAINTENANCE, TELECOMMUNICATIONS INTERRUPTIONS, OR OTHER DISRUPTIONS. NEWS18INDIA.COM  (AND ITS OWNERS, SUPPLIERS, CONSULTANTS, ADVERTISERS, AFFILIATES, PARTNERS, EMPLOYEES OR ANY OTHER ASSOCIATED ENTITIES, ALL COLLECTIVELY REFERRED TO AS ASSOCIATED ENTITIES HEREAFTER) SHALL NOT BE LIABLE TO USER OR MEMBER OR ANY THIRD PARTY SHOULD NEWS18INDIA.COM  EXERCISE ITS RIGHT TO MODIFY OR DISCONTINUE ANY OR ALL OF THE CONTENTS, INFORMATION, SOFTWARE, PRODUCTS, FEATURES AND SERVICES PUBLISHED ON THIS WEBSITE.</p>

                                <p>IN NO EVENT SHALL NEWS18INDIA.COM  AND/OR ITS ASSOCIATED ENTITIES BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF THIS WEB SITE OR WITH THE DELAY OR INABILITY TO USE THIS WEBSITE, OR FOR ANY CONTENTS, INFORMATION, SOFTWARE, PRODUCTS, FEATURES AND SERVICES OBTAINED THROUGH THIS WEB SITE, OR OTHERWISE ARISING OUT OF THE USE OF THIS WEB SITE, WHETHER BASED ON CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE, EVEN IF NEWS18INDIA.COM  OR ANY OF ITS ASSOCIATED ENTITIES HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES.</p>

                                <h2>6) USE OF MESSAGE BOARDS, CHAT ROOMS AND OTHER COMMUNICATION FORUMS:</h2>
                                <p>If this Web site may contain message/bulletin boards, chat rooms, or other message or communication facilities (collectively, "Forums"), you agree to use the Forums only to send and receive messages and material that are proper and related to the particular Forum. By way of example, and not as a limitation, you agree that when using a Forum, you shall not do any of the following:</p>

                                <p>• Defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as rights of privacy and publicity) of others.</p>
                                <p>• Publish, post, distribute or disseminate any defamatory, infringing, obscene, indecent or unlawful material or information.</p>
                                <p>• Upload files that contain software or other material protected by intellectual property laws (or by rights of privacy of publicity) unless you own or control the rights thereto or have received all necessary consents.</p>
                                <p>• Upload files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of another’s computer.</p>
                                <p>• Conduct or forward surveys, contests, or chain letters. </p>
                                <p>• Download any file posted by another user of a Forum that you know, or reasonably should know, cannot be legally distributed in such manner.</p>

                                <p>All Forums are public and not private communications. Chats, postings, conferences, and other communications by other users are not endorsed by NEWS18INDIA.COM , and such communications shall not be considered reviewed, screened, or approved by NEWS18INDIA.COM . NEWS18INDIA.COM  reserves the right for any reason to remove without notice any contents of the Forums received from users, including without limitation message board postings.</p>

                                <h2>7) EQUIPMENT AND OPERATION</h2>
                                <p>You shall provide and maintain all telephone/internet and other equipment necessary to access NEWS18INDIA.COM , and the costs of any such equipment and/or telephone/internet connections or use, including any applicable taxes, shall be borne solely by you. You are responsible for operating your own equipment used to access NEWS18INDIA.COM .</p>

                                <h2>8) LINKS TO THIRD PARTY SITES</h2>
                                <p>The links in this site will allow you to leave NEWS18INDIA.COM . The linked sites are not under the control of NEWS18INDIA.COM . NEWS18INDIA.COM  has not reviewed, nor approved these sites and is not responsible for the contents or omissions of any linked site or any links contained in a linked site. The inclusion of any linked site does not imply endorsement by NEWS18INDIA.COM  of the site. Third party links to NEWS18INDIA.COM  shall be governed by a separate agreement.</p>

                                <h2>9) "KEHTA HAI VOTER" CONTEST </h2>
                                <p>The following are the terms and conditions (the “Terms and Conditions”) of the “Kehta Hai Voter” (the “Contest”) to be conducted/organized by TV18 Broadcast Limited ("TV18") for its television channel “News18 Bihar/Jharkhand” (hereinafter referred to as “Channel”. By participating in the Contest and/or performing any act as required in relation thereto, you (the “Participant(s)”) declare that you have read and understood the Terms and Conditions and you  unconditionally accept and agree to comply with and abide by these Terms and Conditions as stated herein or as may be modified at any time by TV18. If you do not agree with any of the terms and conditions then the Participant should not participate in the Contest.</p>
                                <p>1.	This Contest is open only to Indian citizens who are residing in Bihar at the time of conducting this Contest and are above the age of eighteen (18) years. Persons who are not "competent to contract" within the meaning of the Indian Contract Act, 1872 including minors, un-discharged insolvents etc., are not eligible to participate in the Contest. </p>

                                <p>2.	Employees of TV18 &amp; its subsidiaries/affiliates as well as employees of companies sponsoring the Contest/Prizes and their family members are not eligible to participate in the Contest.</p>

                                <p>3.	This Contest will commence from 26th October 2020 (12:01 AM) and will expire on 5th November 2020 (11:59 PM) (the “Contest Period”).</p>

                                <p>4.	To participate in the Contest, a Participant has to successfully place a missed call to the number specified by TV18 in the promo of  “Kehta Hai Voter” contest, to be aired on the Channel during the Contest Period. Every day during the Contest Period, TV18 shall randomly reach out to Participants for their videos bytes and  select one (1) Participant as the lucky winner (“Winner”) for the Channel on the basis of TV18’s selection criteria.</p>

                                <p>5.	TV18 shall not be liable to consider any missed call which has not been received/acknowledged in TV18’s system. No claims or objections shall be entertained in this regard. </p>

                                <p>6.	Each Winner of the Contest shall receive a mobile phone (“Prize”). TV18 may at its sole discretion telecast the Participant’s byte or a video featuring the Participant on the Channel. Once a Participant becomes a Winner, he/she won’t be eligible to participate again in this Contest. </p>

                                <p>7.	The entire selection process shall be at the sole discretion of the TV18. TV18 shall have the absolute right to edit, amend, change or deviate from the process detailed above at any time of the selection process at its sole discretion without giving prior notice. Mere participation in the selection process and sending entries does not entitle the Participant to be selected. The selection process may vary and shall be as per TV18’s sole discretion. The Participant or any third party shall have no right to question the selection process. TV18 shall have the right to determine the criteria for the selection process in their sole discretion. TV18 reserves all rights to make amendments to the existing terms of the Contest, and/or withdraw the Contest and/or, change the schedule of the Contest.</p>

                                <p>8.	Grant of Rights and License to TV18: By participating in the Contest and submitting the bytes, the Participants acknowledge, agree and confirm as follows:
                                </p><p>a.	The Participant has an unconditional right and authority to participate and submit video byte and to grant TV18 the right to broadcast on its channels and all such modes, media and formats determined by TV18 at its discretion, the video bytes that may be submitted and such other details as may be submitted to participate in the Contest.</p>
                                <p>c.	The Participant hereby agrees that the provisions of Section 19(4) of the Copyright Act shall not apply to the above assignment by the Participant. The Participant hereby expressly waives its rights under the said section and also represents that it has entered into valid written agreements whereby the copyright assignments and waivers has been obtained by it, from all authors/ contributors of the underlying works comprised in the video bytes. </p>
                                <p>d.	By participating in the Contest, each Participant unconditionally acknowledges and confirms that: (i) TV18 shall have complete rights (as described above including but not limited to edit the video byte, alter or modify the video byte or any parts thereof, to ensure that the video byte complies with the technical specifications, and is otherwise suitable for exhibition to the general public, and for ensuring compliance with any applicable censorship or other laws anywhere in the world and to store the video bytes on its server or such other servers as may be authorized by TV18; and (ii) in lieu of the license of the rights in the video bytes as aforesaid, the Participant and their friend(s) featuring in the video bytes (if any) shall not claim any payments or raise dispute on usage by TV18 of same. Any breach or violation of sub-clause (ii) above by the Participant shall amount to breach of terms and conditions and entitle TV18 for all such rights and remedies as mentioned in this terms and conditions and as under applicable laws.</p>
                                <p>e.	The Participant grants to TV18, its irrevocable consent in perpetuity to use the video bytes (entirely or in part) in any and all applications including but not limited to advertising, commercials, promotion, stories, text, articles and commercial exploitation, in any and all media forms, including but not limited to radio, broadcast and television, internet, newspapers, magazines and such other modes, media and platforms (whether existing at present, or which may be developed at any time in the future) at any time without the requiring the Participant’s and their friend(s) featuring in the video bytes (if any) further knowledge or consent. Further, acceptance of terms and conditions constitutes permission for TV18, its affiliates, promoters and all related entities to shoot videos, click photographs of such Participant featuring in the Contest Entry and use the Participant’s name, photographs, likeness, voice and comments for advertising and promotional purposes in any media worldwide for purposes of advertising and trade without any additional compensation whatsoever.</p>
                                <p>f.	In submitting the video bytes to TV18, the Participant recognizes that TV18 engages in extensive activities in creating, acquiring and developing literary, artistic, musical and other material, including stories, ideas, themes, plots, titles, screenplays, and concepts for television, motion pictures and other developments, which are called “Materials”. The Participant recognizes that the Materials which TV18 may use in the future may have originated or may have been acquired from its own employees or others, and may duplicate or resemble elements of the video bytes. Participant appreciates TV18’s concern that any examination of the video bytes, without a full release of liability, might expose TV18 to a claim of plagiarism, or such other claim or threat of litigation. Therefore, as an inducement for TV18’s examination and evaluation of the video bytes, and in consideration of such examination, and without prejudice to the declarations provided herein or as may be required by TV18 from time to time, the Participant hereby acknowledges and agrees as follows: </p>
                                <p>(i)	Its submission of the video bytes to TV18 is voluntary, is not solicited by TV18, and not in confidence. </p>
                                <p>(ii)	There is no agreement between TV18 and the Participant or any third party, express or implied, relating to TV18’s use or failure to use the video bytes or any part thereof.</p>
                                <p>(iii)	The Participant shall not assert against TV18, its affiliates, licensees, assigns, officers, agents or employees any claim of any nature arising out of any alleged use by TV18 of the video bytes or any part thereof.</p>
                                <p>(iv)	The Participant will not hold TV18 responsible for any loss, theft of the personal information, or any part thereof, including without limitation, the name, video bytes, stories, photographs, etc.</p>
                                <p>(v)	The Participant hereby agrees to indemnify and keep indemnified TV18, officer, employee, affiliates, promoters, etc. from any and all claims in respect of any aspect of the video bytes (which may feature one or more other people /friends) as submitted by the Participant, or any of the intellectual property rights thereof, or the assignment thereof, or privacy or publicity, property rights or of any other claims, as well as claims from any third person(s) associated in any manner with the video bytes, or any claims arising from the breach/ violation of any of the foregoing terms and conditions.</p>

                                <p>9.	Participants, who have not won the Contest, will not be eligible for any prize or any other gratification for participating in the Contest.</p>

                                <p>10.	The Prize shall be provided to the Winner(s) within three (3) months of announcement of the Winner(s), subject to receipt of necessary documents/information from the Winner(s). TV18 shall make three attempts to provide/deliver Prize to the Winner(s). In the event, all three attempts are unsuccessful, the Prize shall stand forfeited.</p>

                                <p>11.	The outcome of the Contest/decisions made by TV18 regarding Winners of the Contest shall be final and binding on the Participants and in no event shall the Participant or any other person dispute the decision made by TV18. The decision of TV18 cannot be challenged under any circumstance. By entering into the Contest, it shall be deemed that the Participant has waived his/her right to dispute any decision(s) made by TV18.</p>

                                <p>12.	Participants are required to use the same mobile number for participating in the Contest, on which they can be subsequently contacted. The participants can give as many missed call(s) as they wish to. </p>

                                <p>13.	All applicable, taxes and levies on the winnings as imposed by Central, State and Local government authorities including gift tax will need to be paid by the winners and they are fully responsible in this regard for the same. </p>

                                <p>14.	Participants acknowledge that the Prize is sponsored and agree that TV18 will not be responsible for the same. TV18 makes no representations or warranties (express or implied), and shall have no responsibility as regards the Prize, its condition, its fitness for a particular purpose, etc. TV18 shall not be responsible for any deficiency in the Prize in any manner whatsoever. TV18 accepts no responsibility for the quality of the Prize. In case of any problems with the usability of the Prize, the Winner will need to directly contact the telecom service provider for the same.</p>

                                <p>15.	Participants are required to give the correct details about themselves to TV18. TV18 shall not be liable for any loss or damage cause to a Participant arising due to submission of incorrect details. TV18 may require any Winner to produce any other document at its discretion in order to confirm his / her identity before the Prize is disbursed. </p>

                                <p>16.	Mere participation in the Contest does not entitle a Participant to win a Prize. The Prize cannot be redeemed/exchanged for cash or cheque or any other benefits. The Winners will not be entitled to any compensation / benefits in any form whatsoever in lieu of the Prize. Further, no requests will be entertained for the exchange of one Prize for another.</p>

                                <p>17.	TV18 reserves the right to modify, alter, cancel, postpone or discontinue the Contest at its sole discretion or change all or any part of Terms and Conditions, without giving any prior notice/intimation and without assigning any reason. TV18 shall not be liable for any consequential losses/damages arising out of such change, modifications, alteration, postponement or cancelation of this Contest.</p>

                                <p>18.	TV18 reserves the right to disqualify a Participant/Winner in the event TV18 has reason to believe that the Participant/Winner has acted in a fraudulent manner and/or has violated these Terms and Conditions.</p>

                                <p>19.	The Participant/viewer of the Contest agrees that they shall indemnity, hold harmless TV18, its employees, officers or any other person in relation to any injury/damage/harm/loss suffered by them, in any manner, whatsoever in connection with the Contest and shall also not file in person/ through any family member, criminal and/or civil proceedings in any courts or forum anywhere in the world against the sponsor, and/or the TV18 to claim any damages or reliefs’ or otherwise. </p>

                                <p>20.	Nothing here in amounts to a commitment or representation by TV18 to conduct further schemes/contests.</p>

                                <p>21.	TV18 shall not be responsible for the non-delivery/delayed delivery of the Prize for any reason not attributable to TV18’s default or for reasons beyond the control of TV18.</p>

                                <p>22.	TV18 is free to reproduce, distribute and publicly display contest entries without limitations or obligation of any kind. TV18 is also free to use any responses sent by Participants for any purpose. TV18 reserves the right to analyze and summarize data that it collects and also reserves the right to publish, distribute, share summaries of the data collected with sponsors or other business partners without limitations or obligations of any kind.</p>

                                <p>23.	The decision of TV18 and / or its representatives, employees, directors, officers or agents with respect to the Contest, any matter related thereto including the choice of questions or the manner of choosing of winner(s) will be final and binding on all participants and no questions, correspondence, enquiries, etc. on the manner of conduct of the Contest from any party whatsoever will be entertained.</p>

                                <p>24.	To the extent permitted by law, TV18 or its representatives, employees, directors, officers or agents, shall not be liable for any loss suffered or sustained, to person or property including, but not limited to, consequential (including economic) loss by reason of any act or omission, deliberate or negligent on the part of TV18 or its representatives, employees, directors, officers or agents.</p>

                                <p>25.	If at any time during the continuance of this Contest, the performance in whole or in part is prevented or delayed by reasons of a Force Majeure event, then from the date of occurrence of such event, there shall not be any claim against TV18 for damages, or any liability against it, in respect of such non-performance or delayed performance. For the purposes of this Contest, Force Majeure event means and includes any event beyond the reasonable control of TV18 including war, hostility, fires, floods, explosives, epidemics, quarantine restrictions, strikes, lock outs, compliance with orders or instructions of any court, statutory or governmental interventions or any other act of God.</p>

                                <p>26.	These terms and conditions shall be governed by &amp; construed in accordance with the applicable laws in India. Any dispute including any dispute arising out of all matters with respect to the contest are subject to the jurisdiction of the Courts at Delhi only.</p>

                                <h2>10) INDEMNIFICATION: </h2>
                                <p>YOU SHALL INDEMNIFY, DEFEND AND HOLD HARMLESS NEWS18INDIA.COM  (INCLUDING ITS AND THEIR OFFICERS, DIRECTORS, EMPLOYEES, AFFILIATES, GROUP COMPANIES, AGENTS, REPRESENTATIVES OR SUBCONTRACTORS) FROM ANY AND ALL CLAIMS AND LOSSES IMPOSED ON, INCURRED BY OR ASSERTED AS A RESULT OF OR RELATED TO: (a) your access and use of NEWS18INDIA.COM  (b) any non-compliance by user with the terms and conditions hereof; or (c) any third party actions related to users receipt and use of the information, whether authorized or unauthorized. Any clause declared invalid shall be deemed severable and not affect the validity or enforceability of the remainder. These terms may only be amended in a writing signed by NEWS18INDIA.COM .</p>

                                <h2>11) CONFLICTING TERMS:</h2>
                                <p>If there is any conflict between this User Agreement and other documents, this User Agreement shall govern, whether such order or other documents is prior to or subsequent to this User Agreement, or is signed or acknowledged by any director, officer, employee, representative or agent of NEWS18INDIA.COM .</p>

                                <h2>12) CONFIDENTIALITY/NON-COMPETITION CLAUSE: </h2>

                                <p>You agree to keep the information received from the NEWS18INDIA.COM  and services CONFIDENTIAL and will NOT Disclose the knowledge gained to other any person or firm for any reason. You hereby consent to the Jurisdiction of the Courts of New Delhi, India with respect to violation of any part of this Agreement.</p>

                                <h2>13) TERMINATION: </h2>
                                <p>This User Agreement and the license rights granted hereunder shall remain in full force and effect unless terminated or canceled for any of the following reasons: (a) immediately by NEWS18INDIA.COM  for any unauthorized access or use by you (b) immediately by NEWS18INDIA.COM  if you assign or transfer (or attempt the same) any rights granted to you under this Agreement; (c) immediately, if you violate any of the other terms and conditions of this User Agreement. Termination or cancellation of this Agreement shall not effect any right or relief to which NEWS18INDIA.COM  may be entitled, at law or in equity. Upon termination of this User Agreement, all rights granted to you will terminate and revert to NEWS18INDIA.COM . Except as set forth herein, regardless of the reason for cancellation or termination of this User Agreement, the fee charged if any for access to NEWS18INDIA.COM  is non-refundable for any reason.</p>

                                <h2>14) JURISDICTION: </h2>

                                <p>The terms of this agreement are exclusively based on and subject to Indian law. You hereby consent to the exclusive jurisdiction and venue of courts in New Delhi, India in all disputes arising out of or relating to the use of this website. Use of this website is unauthorized in any jurisdiction that does not give effect to all provisions of these terms and conditions, including without limitation this paragraph.</p>
                            </div>
                        </div>
                    </div>
                    <RhsCommon
                        pageAds={pageAds}
                        currentURL={currentUrl}
                        photoStories={photoStories}
                        isRss={true}
                        topStories={
                            rhsTopStoryListing.length ? rhsTopStoryListing : topStories
                        } />
                </div>
            </div>
            <style jsx global>{`
              * {
                margin: 0;
                padding: 0;
                outline: 0;
              }
              body {
                font-family: "Noto Serif", 'Droid Serif', sans-serif !important;
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
              .section-blog-left-aricle h1 {
                font-size: 32px;
                font-weight: 700;
                line-height: 1.45;
                margin: 13px 0;
                color: #404040;
              }
              .section-blog-left-aricle p {
                line-height: 1.45;
                color: #404040;
                padding-bottom: 20px;
                margin: 0;
                font-size: 18px;
                line-height: 28px;
              }
              #text_contener p a {
                color: #1059a4;
                font-weight: 700;
              }
              a {
                text-decoration: none;
                color: #111;
              }
              .section-blog-left-aricle p b {
                font-weight: 700;
              }
            `}</style>
        </>
    );
};

export default Disclaimer;
