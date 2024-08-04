import React, { useMemo, useState } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";

const PrivacyPolicyDesktop = (props) => {
  const { pageAds, photoStories, topStories, currentUrl, topStory } = useMemo(
    () => props.data,
    [props.data]
  );
  let rhsTopStoryListing = [];
  if ("rhsTopStoryListing" in topStory)
    rhsTopStoryListing = topStory.rhsTopStoryListing;
    const [isActive, setActive] = useState(true);

    const toggleClass = () => {
        setActive(!isActive);
      };

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
                <h1 className="f_heading">
                  <a id="cookies">Privacy Policy</a>
                </h1>

                <div className="privacytab">
                  <a href="javascript:void(0)" className={isActive ? 'active': null} onClick={toggleClass}>
                    Non-European Union Residents
                  </a>
                  <a href="javascript:void(0)" className={isActive ? null: 'active'} onClick={toggleClass}>For European Union Residents</a>
                </div>

                <div className="privacytabcontent" style={isActive ? { display: "block" } : { display: "none" }}>
                  <div id="text_contener">
                    <div style={{ marginTop: "20px" }}></div>
                    <p>
                      Network18 Media and Investments Ltd. ("we", "us" ,
                      "news18.com", “firstpost.com”, “overdrive.in”,
                      “forbesindia.com”, “betterphotography.in”, "News18",
                      “Firstpost”, “Overdrive”, “ForbesIndia”, “Better
                      Photography”, “Network18”) is committed to protecting the
                      privacy of the users ("you" / "your" / "yourself") of its
                      website / software applications offered by Network18
                      (collectively, "Applications") and has provided this
                      privacy policy ("Policy") to familiarize you with the
                      manner in which Network18 uses and discloses your
                      information collected through the Applications.{" "}
                    </p>

                    <p>
                      The terms of the Policy provided herein govern your use of
                      any and all of the Applications and the information
                      accessible on or from these Applications. The Policy also
                      lays down how Network18 may collect, use and share any
                      information you provide.
                      <br />
                      Network18 reserves the right, at its discretion, to
                      change, modify, add or remove portions of this Policy at
                      any time. Network18 recommends that you review this Policy
                      periodically to ensure that you are aware of the current
                      privacy practices.
                    </p>

                    <p>
                      This Policy shall be construed as provided in compliance
                      with Information Technology Act, 2000 as amended and read
                      with the Information Technology (Reasonable Security
                      Practices and Procedures and Sensitive Personal Data or
                      Information) Rules, 2011.
                    </p>
                    <h2>Collection of Information</h2>
                    <p>
                      <b>
                        1. Network18 may collect the following two types of
                        information:
                      </b>
                      <br />
                      a. "Personal Information" which shall mean information
                      which could reasonably be used to identify you personally,
                      such as your name, email address, registration account
                      details, physical address or other relevant personal
                      details; and demographic information, such as gender, pin
                      code or similar information. For the purpose of this
                      policy, sensitive personal data or information has been
                      considered as a part of Personal Information, which may
                      include information such as password, financial
                      information (details of bank account, credit card, debit
                      card, or other payment instrument details).
                      <br />
                      <br />
                      b. "Non-Personal Information" which shall mean information
                      that does not identify you or any other individual, and
                      includes session, web beacons and usage data, log data and
                      aggregate information. We use this information to
                      inter-alia deliver our web pages to you upon request, to
                      tailor our Application/website to the interests of our
                      users, to measure traffic within our Application/website,
                      to improve the Application/website quality, functionality
                      and interactivity and let advertisers know the geographic
                      locations from where our visitors come.
                      <br />
                      <br />
                      c. Network18 may install cookies or other similar data
                      collection software in your computer system/device for
                      such purpose and you hereby consent to the same. We may
                      use "cookies", beacons or similar electronic tools to
                      collect information to assign each visitor a unique,
                      random number as a User Identification (User ID) to
                      understand the user's individual interests using the
                      identified computer. Unless you voluntarily identify
                      yourself (through registration, for example), we will have
                      no way of knowing who you are, even if we assign a cookie
                      to your computer. The only personal information a cookie
                      can contain is information you supply. A cookie cannot
                      read data off your hard drive. Our advertisers may also
                      assign their own cookies to your browser (if you click on
                      their ads), a process that we do not control.
                    </p>

                    <p>
                      2. You represent that the information or data you provide
                      from time to time is and shall be correct, current and
                      updated and you have all the rights, permissions and
                      consents to provide such information or data. Your
                      providing the information or data and Network18’s
                      consequent storage, collection, usage, transfer, access or
                      processing of the same shall not be in violation of any
                      third party agreement, laws, judgments, orders or decrees.
                    </p>

                    <h2>Use of Information</h2>
                    <p>
                      1. You may need to provide Network18 with your Personal
                      Information while registering yourself on any of the
                      Applications. The information so provided by you to
                      Network18 or otherwise captured by Network18 may be used
                      for a number of purposes connected with Network18’s
                      business operations which may include the following:
                      <br />
                      <br />
                      a. Processing orders or applications;
                      <br />
                      <br />
                      b. Provisioning of services, testing or improvement of
                      services, recommending various products or services
                      including those of third parties;
                      <br />
                      <br />
                      c. Dealing with requests, enquiries and complaints,
                      customer services and related activities;
                      <br />
                      <br />
                      d. Marketing products and services of Network18 and its
                      analysis;
                      <br />
                      <br />
                      e. Responding to your queries and fulfilling your requests
                      for information regarding the Applications;
                      <br />
                      <br />
                      f. Notifying you of any new offers or services of
                      Network18 and sending you important information regarding
                      the Applications, changes to any of Network18’s policies
                      and/or other administrative information;
                      <br />
                      <br />
                      g. Keeping you informed about the latest content available
                      on the Applications and special offers with respect to the
                      same;
                      <br />
                      <br />
                      h. Sending you surveys and marketing communications that
                      Network18 believes may be of interest to you;
                      <br />
                      <br />
                      i. Conducting internal reviews and data analysis for the
                      Applications;
                      <br />
                      <br />
                      j. Personalizing your experience while using the
                      Applications by presenting advertising, products and
                      offers tailored to you;
                      <br />
                      <br />
                      k. If you wish to subscribe to any content package or
                      service offered by Network18 through the Applications, for
                      completing your purchase. (For example, to have your
                      payments processed, communicate with you regarding your
                      purchase and provide you with related customer service);
                      <br />
                      <br />
                      l. Improving the services, content and advertising on the
                      Applications;
                      <br />
                      <br />
                      m. Protecting the integrity of the Applications; and
                      <br />
                      <br />
                      n. Responding to judicial process and provide information
                      to law enforcement agencies or in connection with an
                      investigation on matters related to public safety, as
                      permitted by law.
                    </p>

                    <p>
                      2. Your Personal Information will be kept confidential to
                      the maximum possible extent and will be used to support
                      your relationship with Network18, to notify you of any
                      updated information and new activities and other related
                      functions offered by Network18. Any personally
                      identifiable information provided by you will not be
                      considered as sensitive if it is freely available and / or
                      accessible in the public domain. Further, any comments,
                      messages, blogs, scribbles etc.
                      posted/uploaded/conveyed/communicated by users on the
                      public sections of the Application becomes published
                      content and is not considered personally identifiable
                      information subject to this Policy.
                    </p>

                    <p>
                      3. Network18 may use Personal Information to verify
                      whether you are entitled to access and use the
                      Applications and the products and services made available
                      through the Applications. This Personal Information may
                      also be used to enable Network18 to enhance your
                      experience of the Applications.
                    </p>

                    <p>
                      4. Further, with respect to Non-Personal Information
                      automatically collected and stored in files, Network18
                      uses this information to understand and analyze trends, to
                      administer the Applications, to learn about user behavior
                      on the Applications, and to gather demographic information
                      about the user base as a whole. Network18 may use this
                      information in its marketing and advertising services.
                      Network18 may also use such information to measure traffic
                      patterns on the Applications. As Non-Personal Information
                      does not personally identify you, Network18 may use and
                      disclose Non-Personal Information for any purpose.
                    </p>

                    <h2>Disclosure</h2>
                    <p>
                      1. Network18 does not sell or rent Personal Information.
                      Personal Information may be disclosed under the following
                      circumstances:
                      <br />
                      <br />
                      a. Network18 may disclose your Personal Information to its
                      affiliates, group companies, consultants, vendors and
                      contractors who provide various services including,
                      contact information verification, payment processing,
                      customer service, website hosting, data analysis,
                      infrastructure provision, IT services, and other similar
                      services, under confidentiality restrictions, in order to
                      enable such vendor and service providers to provide the
                      services subscribed to by you;
                      <br />
                      <br />
                      b. Network18 may provide your information or data to its
                      partners, associates, advertisers, service providers or
                      other third parties to provide, advertise or market their
                      legitimate products and/or services which may be of your
                      interest. You will have the choice to 'opt out' of such
                      marketing or promotional communications at your will; and
                      <br />
                      <br />
                      c. As necessary or appropriate: (a) in any manner
                      permitted under applicable law, including laws outside
                      your country of residence; (b) to comply with legal
                      process whether local or foreign; (c) to respond to
                      requests from public and government authorities, including
                      public and government authorities outside your country of
                      residence; (d) to enforce Network18’s terms and
                      conditions; (e) to protect Network18’s rights, privacy,
                      safety or property, and/or that of Network18’s affiliates,
                      you or others; and (f) to allow Network18 to pursue
                      available remedies or limit the damages that Network18 may
                      sustain.
                      <br />
                      <br />
                      d. We may disclose to third party services certain
                      personally identifiable information listed below:
                      <br />
                      <br />
                      i. Information you provide us such as name, email, mobile
                      phone number.
                      <br />
                      <br />
                      ii. Information we collect as you access and use our
                      service, including device information, location and
                      network carrier.
                      <br />
                      <br />
                      e. This information is shared with third party service
                      providers so that we can:
                      <br />
                      <br />
                      i. Personalize the app for you.
                      <br />
                      <br />
                      ii. Perform behavioural analytics.
                    </p>

                    <p>
                      2. Your consent being part of the terms and conditions
                      through which Network18 provide you with a service. your
                      consent to collecting Personal and Non-Personal
                      Information may be implicit or implied or through course
                      of conduct.
                    </p>

                    <p>
                      3. Application may present display advertising and may
                      collect data about traffic via Google Analytics or any
                      equivalent analytical tool, Demographics and Interest
                      Reporting.
                    </p>

                    <h2>Information Security and Storage</h2>
                    <p>
                      1. Network18 uses reasonable security measures, at the
                      minimum those mandated under the Information Technology
                      Act, 2000 as amended and read with Information Technology
                      (Reasonable Security Practices and Procedures and
                      Sensitive Personal Data or Information) Rules, 2011, to
                      safeguard and protect your data and information. Network18
                      implements such measures, as stated above, to protect
                      against unauthorized access to, and unlawful interception
                      of, Personal Information. You accept the inherent security
                      implications of providing information over Internet/
                      cellular/data networks and will not hold Network18
                      responsible for any breach of security or the disclosure
                      of Personal Information unless Network18 has been grossly
                      and wilfully negligent.
                    </p>

                    <p>
                      2. Your information or data will primarily be stored in
                      electronic form. However, certain data can also be stored
                      in physical form. Network18 may store, collect, process
                      and use your data in countries other than the Republic of
                      India but under full compliance with applicable laws.
                      Network18 may enter into agreement with third parties (in
                      or outside of India) to store your information or data.
                      These third parties may have their own security standards
                      to safeguard your information or data and Network18 will
                      on commercial reasonable basis require such third parties
                      to adopt reasonable security standards to safeguard your
                      information / data.
                    </p>

                    <p>
                      3. Notwithstanding anything contained in this Policy or
                      elsewhere, Network18 shall not be held responsible for any
                      loss, damage or misuse of your Personal Information, if
                      such loss, damage or misuse is attributable to a Force
                      Majeure Event. A "Force Majeure Event" shall mean any
                      event that is beyond the reasonable control of Network18
                      and shall include, without limitation, sabotage, fire,
                      flood, explosion, acts of God, civil commotion, strikes or
                      industrial action of any kind, riots, insurrection, war,
                      acts of government, computer hacking, unauthorized access
                      to computer data and storage device, computer crashes,
                      breach of security and encryption, etc.
                    </p>

                    <h2>Third Party Websites, Applications and Services</h2>
                    <p>
                      The Application/website may include links to other
                      websites/applications. Such websites/application are
                      governed by their respective privacy policies, which are
                      beyond our control. Once you leave our servers (you can
                      tell where you are by checking the URL in the location bar
                      on your browser), use of any information you provide is
                      governed by the privacy policy of the operator of the
                      website/application you are visiting. That policy may
                      differ from ours. If you can't find the privacy policy of
                      any of these websites/application via a link from the
                      website's homepage, you should contact the
                      website/application directly for more information.
                    </p>

                    <h2>Access, Correction and Deletion</h2>
                    <p>
                      Network18 provides you with all information that Network18
                      maintains about you such as the transaction and contact
                      information upon proper verification. This may be provided
                      to you on request, in case you experience any doubts. You
                      may request access and/or correct the information
                      Network18 has collected from you by contacting Network18
                      at{" "}
                      <a href="mailto:data.privacy@nw18.com">
                        data.privacy@nw18.com
                      </a>{" "}
                      . If you wish to have the information or data that you
                      have provided to Network18 deleted, you can always do so
                      by sending a request to us on the e-mail id. You may note
                      that correction or deletion of certain information or data
                      may lead to cancellation of your registration with the
                      Application(s) or your access to certain features of the
                      Application(s). You also agree and acknowledge that
                      certain data or information cannot be corrected or deleted
                      or prohibited to be deleted as required under any
                      applicable law, law enforcement requests or under any
                      judicial proceedings. If you have questions or concerns
                      about this Policy, please contact Network18 at{" "}
                      <a href="mailto:data.privacy@nw18.com">
                        data.privacy@nw18.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="privacytabcontent" style={isActive ? { display: "none" } : { display: "block" }}>
                  <div id="text_contener">
                    <h2>Our Commitment</h2>
                    <p>
                      Network18 Media and Investments Ltd. (“we”, “us” , “the
                      website”) is strongly committed to the data subject’s
                      (“you”, “your”, “subscriber”, “user”) right to privacy and
                      to keeping your personal and financial information secure.
                      To earn your trust and confidence in our commitment, we
                      are fully disclosing our privacy practices. We encourage
                      you to read our privacy statement to understand what types
                      of personally identifiable information we collect and how
                      we use this information. This statement applies solely to
                      the information collected on News18.com.
                    </p>

                    <p>
                      This privacy policy describes the usage of information
                      provided or collected on the sites and applications where
                      this privacy policy is posted. We follow this privacy
                      policy in accordance with applicable law in the regions
                      where we operate. In some cases, we may provide additional
                      data privacy notices specific to certain services or
                      regions. Those terms are to be read in combination with
                      this policy.
                    </p>

                    <p>
                      {" "}
                      Please keep in mind that when you provide information to
                      us on a third-party site or platform (for example, via our
                      applications like social media login) the information we
                      collect is through those third-party sites linked with our
                      applications and is covered by this privacy policy, and
                      the information the third-party site or platform collects
                      is subject to the third-party site or platform’s privacy
                      practices. Privacy choices you have made on the
                      third-party site or platform will not apply to our use of
                      the information we have collected directly through our
                      sites or applications. Please also keep in observance that
                      our sites and applications may contain links to other
                      sites not owned or controlled by us and we are not
                      responsible for the privacy practices of those sites. We
                      encourage you to be aware when you leave our sites or
                      applications and to read the privacy policies of other
                      sites that may collect your personal information.
                    </p>

                    <p>
                      All capitalized terms that have not been specifically
                      defined herein shall have the same meaning as provided
                      under the Terms of Use.
                    </p>

                    <p>
                      This Privacy Policy should be read in conjunction and
                      together with the Terms of Use applicable to the service
                      (website, application or other service) you are using
                    </p>

                    <h2>User Consent</h2>
                    <p>
                      By using Network18’s service (for example, when you
                      register for an account, purchase a service, enter a
                      contest or promotion, communicate with us, on our sites or
                      applications), you agree to our collection, use and
                      sharing of your personal information as described in this
                      policy. In some cases, particularly if you reside in a
                      country governed by a data protection regulation, we may
                      ask you to provide explicit consent to access our services
                      before proceeding for further operations.
                    </p>

                    <p>
                      In case of any roaming user profile or if you are a
                      traveller visiting various countries around the world and
                      avail Network18’s services, then we will consider the
                      country of registration as your primary country and the
                      consents obtained at the time of registration will be
                      valid for your processing of personal information. The
                      privacy terms applicable as per the law of that country at
                      the time of registration will apply to you.
                    </p>

                    <h2>
                      Accessing Website and Network 18 Services through VPN{" "}
                    </h2>
                    <p>
                      You should not access or use the Website or Network 18
                      Services by means of any mechanism or technology which
                      conceals your actual geo-location or provides incorrect
                      details of your location (for example, use a virtual
                      private network (VPN) to access the Services).{" "}
                    </p>

                    <p>
                      We will not be responsible or liable for any collection,
                      storage or processing of your personal information or data
                      if you use any mechanism or technology to access or use
                      Website or Services which conceals your actual
                      geo-location.
                    </p>

                    <h2>Collection of Personal Information and it’s use</h2>

                    <p>
                      ‘Personal Information’ or ‘PII’ is defined as any
                      information that identifies (whether directly or
                      indirectly) a particular individual or natural person,
                      such as the individual’s name, postal address, email
                      address, and mobile number indicating to that particular
                      person or is identifiable. When anonymous information is
                      directly or indirectly associated with personal
                      information, the resulting information can also be treated
                      as personal information.
                    </p>

                    <p>
                      Network18 only collects the necessary personally
                      identifiable information in order to respond to your
                      requests for our customized products and services.{" "}
                    </p>

                    <p>
                      Network18 does not collect personally identifiable
                      information about you except when you specifically and
                      knowingly provide it. Network18 and its service partners
                      use your personally identifiable information to operate
                      the sites and services and to inform you of new features,
                      services, and products from Network18 and its affiliates.
                    </p>

                    <h3>I. Information you provide to us </h3>
                    <p>
                      We may ask for and collect the following personal
                      information about you when you use the website and without
                      this information we may not be able to provide you with
                      all the requested services;
                    </p>

                    <h4>a. Registration Data</h4>
                    <p>
                      To use certain features on the website, Application and
                      for the Services (such as event registrations and website
                      campaigns, surveys, quizzes, polls), you may provide basic
                      contact Information, including but not limited to:
                      <br />
                      <span>•</span> First Name <br />
                      <span>•</span> Last Name
                      <br />
                      <span>•</span> Email Address
                      <br />
                      <span>•</span> Phone number
                      <br />
                    </p>

                    <h4>b. Mobile device permissions </h4>
                    <p>
                      When accessing our application on mobile devices, we may
                      request and gain access to the following:
                      <br />
                      • Accounts - Used for managing multiple user accounts
                      within the app and for Login purposes
                      <br />
                      • Contacts - Used for accessing users Contact in order to
                      share articles through the app
                      <br />
                      • Phone - To read phone state and enable user
                      notifications on user’s device. IMEI is being collected to
                      uniquely identify every user only
                      <br />
                      • Camera - In order for the user to upload images and
                      profile image of the User. Let’s user use Camera inside of
                      Network18
                      <br />
                      • Microphone - To enable voice command related actions
                      <br />
                      • Storage - To access files folders from inside the App
                      <br />
                      • SMS - To send and receive verification messages
                      <br />
                    </p>

                    <p>
                      Permissions to these settings may be essential in adequate
                      running of the application. Permissions can be managed
                      through the respective user devices using the “settings”
                      option.
                    </p>

                    <h3>II. Information you provide to us voluntarily</h3>
                    <p>
                      If you send us personal correspondence, such as emails or
                      letters, or if other users or third parties send us
                      correspondence about your activities or postings on the
                      website, we may collect and store such information.
                    </p>

                    <p>
                      We may collect additional information at other times, when
                      you provide feedback(s), modify your content or email
                      preferences, respond to surveys, or communicate with us.
                      This information may include your name, e-mail id, mobile
                      number, location, etc.
                    </p>

                    <h3>III. Information we collect automatically </h3>
                    <p>
                      We collect information about you and your use of our
                      service, your interactions with us and our advertising
                      agencies, as well as information regarding your computer
                      or other devices used to access our service(such as mobile
                      devices, tablets and other viewing devices). This
                      information may include, but is not limited to:
                      <br />
                      • Activities on the website such as type of pages viewed,
                      time spent on pages, search queries etc.
                      <br />
                      • Your interactions with our email, customer care and
                      messaging platform.
                      <br />
                      • Geo-location information through IP addresses;
                      <br />
                      • Device information like device id, device model etc. and
                      other unique identifiers
                      <br />
                      • Advertising identifiers, such as those found on mobile
                      devices & tablets, devices that include identifiers(for
                      example the Identifiers for Advertisers (IDFA) on iOS
                      devices and GAID on Android devices);
                      <br />
                      • Information collected via the use of cookies and other
                      technologies* ;<br />
                    </p>

                    <p>
                      *Note: To improve the responsiveness of the "Application"
                      for our users, we may use "cookies", or similar electronic
                      tools to collect information to assign each visitor a
                      unique, random number as a User Identification ("User ID")
                      to understand the user's individual interests using the
                      identified computer. Unless you voluntarily identify
                      yourself (through registration, for example), we would not
                      know who you are, even if we assign a cookie to your
                      computer. The only personal information which a cookie can
                      hold is the information you supply. A cookie cannot read
                      data from your hard drive. Our advertisers may also assign
                      their own cookies to your browser(s) (if you click on
                      their ads), a process that we do not control. We receive
                      and store certain types of information whenever you
                      interact with us via website(s), Application(s) or
                      Services through your computer/laptop/notebook/
                      mobile/tablet/pad/handheld device or any other electronic
                      device capable of connecting to internet. For more details
                      you can refer to our<a href="#cookies">Cookie Policy</a>
                    </p>

                    <h3>IV. Inferred Information through usage and log data</h3>

                    <p>
                      We may track certain information about you based upon your
                      behaviour on the website. We use this information for
                      conducting internal research on our users' demographics,
                      devices, interests, and behaviour to better understand,
                      protect and serve our users. This information is compiled
                      and analysed on an aggregated basis.{" "}
                    </p>

                    <p>
                      We may also collect Your Information to track user
                      behaviour and preferences for internal analytics and
                      research. We may also use your information: <br />
                      • To evaluate Your interest for news, services, offers,
                      subscriptions, advertisements; <br />
                      • To perform analytics and conduct customer research, to
                      determine your interest, for identifying content that
                      generate sales and to analyse traffic patterns.
                      <br />
                    </p>

                    <h4>a. Interactive features</h4>
                    <p>
                      The website has many features that provide for
                      users/members to disclose their identities and communicate
                      with other users/members. Your use of such features and
                      disclosure of any personal details (e.g. e-mail address,
                      name, social media information) by you through these
                      features are at your sole risk and the website accepts no
                      responsibility for the same. However, if your privacy has
                      been intruded as a result of participating in such
                      features, you could notify us by e-mail at{" "}
                      <a href="mailto:GDPR@nw18.com">GDPR@nw18.com</a>.
                    </p>

                    <p>
                      If you choose to post messages on social media accounts,
                      message boards, chat rooms or other message areas or leave
                      feedback, we will collect that information you provide to
                      us. We retain this information as necessary to resolve
                      disputes, provide customer support and troubleshoot
                      problems as permitted by law. We may also retain such
                      information on an aggregated basis to formulate market
                      trends and market sentiments. We do not, however,
                      associate any of your personal information with these
                      comments or posts while performing such analysis.
                    </p>

                    <h4>b. User Experience and Support </h4>
                    <p>
                      We identify and use Your IP address to help diagnose any
                      problems with our server, and to administer our
                      application. Your IP address is also used to help identify
                      you and to gather broad demographic information to
                      customize your experience on the website.
                    </p>
                    <p>
                      We will occasionally ask you to complete optional online
                      surveys. These surveys may ask you for contact information
                      and demographic information (like zip code, age, etc.). We
                      use this data to tailor your experience on the website,
                      providing you with content that we think you might be
                      interested in and to display content according to your
                      preferences. However, such surveys will always remain
                      optional and you can choose whether or not to provide your
                      personal information for such surveys.
                    </p>

                    <h3>V. Information we collect through third parties </h3>
                    <h4>a. Social Media Login</h4>
                    <p>
                      When you sign in through, or use your other accounts like
                      on Facebook, Gmail, and WhatsApp, Twitter etc. to share or
                      respond to posts, we shall retrieve Information from such
                      accounts to continue to interact with you and to continue
                      providing the Services. We collect the following
                      information from the respective social media platforms,
                      including but not limited to:
                      <br />
                      • Facebook – <br />
                      • Google – <br />
                      • Twitter- <br />
                      • WhatsApp- <br />
                    </p>

                    <h4>a. Transactional or Billing Information</h4>
                    <p>
                      Based on Your purchase of a subscription package, our
                      payment gateway partner may collect information with
                      respect to your credit/debit card details or other bank
                      account details along with your billing address. This
                      information is stored by our payment gateway partner.
                    </p>

                    <p>
                      For provision of services and subscriptions, you may be
                      required to present financial or sensitive personal
                      information to our partners, on their respective websites.
                      You understand, agree and acknowledge that Network18 does
                      not process any information provided on partner/vendor
                      websites. Your Personal Information, Sensitive Personal
                      Data or Information and financial information will be
                      dealt by these partners in accordance with their
                      respective privacy policies and other terms and conditions
                      and Network18 shall not be liable, accountable or
                      responsible for Your Personal Information, Sensitive
                      Personal Data and Financial Information which you provide
                      to these payment gateways. Network18 may however receive a
                      copy of such information (e.g. transaction IDs and
                      details) provided by you to third parties (vendors,
                      partners) solely for the purpose of reconciliation and
                      validation of transaction, or for the purpose of
                      resolution of complaints such as a transaction failure,
                      processing of refunds, only as permissible by the local
                      law. Network18 will not process any information without
                      consents, as applicable by the local laws.{" "}
                    </p>

                    <h4>b. Auto renewal Subscription </h4>
                    <p>
                      When you chose any subscription or paid service, we or our
                      payment gateway provider may collect your purchase,
                      address or billing information, including your credit card
                      number and expiration date etc. However when you order
                      using an in-app purchase option, same are handled by such
                      platform providers. The subscriptions or paid Services may
                      be on auto renewal mode unless cancelled. If at any point
                      you do not wish to auto-renew your subscription, you may
                      cancel your subscription before the end of the
                      subscription term. We do not capture/store any personal
                      payment information with us.
                    </p>

                    <h4>c. Information from other Sources</h4>
                    <p>
                      We may receive information about you from other sources,
                      add it to our account information and treat it in
                      accordance with this policy. If you provide information to
                      the platform provider or other partner, whom we provide
                      services, your account information and order information
                      may be passed on to us. We may obtain updated contact
                      information from third parties in order to correct our
                      records and fulfil the Services or to communicate with
                      you. Demographic and purchase information: We may
                      reference other sources of demographic and other
                      information in order to provide you with more targeted
                      communications and promotions, based on the consents
                      provided by you.
                    </p>

                    <h2>Purposes and Lawfulness of processing</h2>
                    <p>
                      The website will only collect and process personal data
                      about you where we have lawful basis. Lawful basis on
                      which we would process your personal information includes
                      obtaining explicit consent from you for processing your
                      personal information or processing for “legitimate
                      interests” where processing is necessary by us to provide
                      you with customer support or process your data for
                      providing premium services (For e.g. processing of your
                      information by our payment gateway service providers).
                    </p>

                    <p>
                      We use information to provide, analyse, administer,
                      enhance and personalize our service and marketing efforts,
                      to process your registration, and to communicate with you
                      related to the cases mentioned below. For example, we use
                      information to:
                      <br />
                      • The main uses of your persol information are to verify
                      your identity; to help provide our services and to
                      administer those services
                      <br />
                      • communicate with you concerning our service (for example
                      by email, push notifications text messaging, and online
                      messaging channels), so that we communicate news regarding
                      the website to you, details about new features and content
                      available on the the website, and special offers,
                      promotional announcements, contests and consumer surveys,
                      and to assist you with operational requests such as
                      password reset requests. <br />
                      • For marketing (where you have agreed to this) and for
                      market research purposes, including internal demographic
                      studies, to provide, optimize and personalize our services
                      and to send you newsletters and information (where you
                      have agreed to this) about our products and services.
                      <br />
                      • determine your requirements and provide personalized
                      suggestions, tips and news alerts for various topics all
                      of which we think will be of interest to you;
                      <br />
                      • prevent, detect and investigate potentially prohibited
                      or illegal activities, including fraud;
                      <br />
                      • analyze and understand our audience, improve our service
                      (including our user interface experiences) and optimize
                      content selection, recommendation algorithms and delivery;
                      <br />
                      • Notify you about changes in terms of service.
                      <br />
                      • Allow you to participate in interactive features (notify
                      you about events, run competitions and games) offered
                      through our Services.
                      <br />
                      • Carry out our obligations and enforce our rights arising
                      from any contracts entered into between you and us,
                      including for billing, chargeback and collection.
                      <br />
                    </p>
                    <p>
                      We may use your information to provide you with
                      personalised experience when you visit/use one of our
                      sites/apps, and for insight and marketing purposes.
                    </p>

                    <p>
                      We provide personalisation by using data you submit to us
                      in terms of cookies, IP addresses, web beacons or similar
                      technologies in relation to the devices you use. By doing
                      so, we can provide you with contents and/or advertising
                      that we believe is more relevant to your interests. Please
                      provide explicit consent for the same when we collect your
                      data and/or adjust your user preferences in your account
                      profile concerning your choices/preferences provided.
                    </p>

                    <p>
                      You can click on http://www.youronlinechoices.eu to modify
                      your choices with respect to capturing of cookies from
                      your website.
                    </p>

                    <p>
                      You can also raise a request to alter your consent choices
                      at <a href="mailto:GDPR@nw18.com">GDPR@nw18.com</a>.
                    </p>

                    <h2>Information used by the company</h2>
                    <p>
                      The Information as supplied by the users enables us to
                      improve the Services and provide you the most
                      user-friendly experience. In some cases/provision of
                      certain service(s) or utility (ies), we may require your
                      contact address as well. All required information is
                      service dependent and the Company may use the above said
                      user Information to, maintain, protect, and improve the
                      Services (including advertising on the "Application") and
                      for developing new services. We may also use your email
                      address or other personally identifiable information to
                      send commercial or marketing messages with your consent,
                      as applicable by local laws [with an option to subscribe /
                      unsubscribe (where feasible)]. We may, however, use your
                      email address without further consent for non-marketing or
                      administrative purposes (such as notifying you of major
                      changes, for customer service purposes, billing, etc.)
                    </p>

                    <p>
                      Any personally identifiable information provided by you
                      will not be considered as sensitive if it is freely
                      available and / or accessible in the public domain like
                      any comments, messages, blogs, scribbles available on
                      social platforms like Facebook, twitter etc. Any
                      posted/uploaded/conveyed/communicated by users on the
                      public sections of the website or the Application becomes
                      published content and is not considered personally
                      identifiable information subject to this Privacy Policy.
                      In case you choose to decline to submit personally
                      identifiable information, we may not be able to provide
                      certain services to you. In any case, we will not be
                      liable and or responsible for the denial of certain
                      services to you for lack of you providing the necessary
                      personal information. When you register with the
                      Application or Services, we contact you from time to time
                      about updating your personal information to provide the
                      users such features that we believe may benefit / interest
                      you.
                    </p>

                    <h2>Disclosure to third parties</h2>
                    <h4>a. General Disclosure</h4>
                    <p>
                      At times the website may make certain personal information
                      available to strategic partners that work with the website
                      to provide service, or that help the website market to
                      customers. For example, when you purchase and activate
                      subscription, you authorize the website to exchange the
                      information you provide during the activation process to
                      carry out a service. If you have approved the service,
                      your account will be governed by the website’s privacy
                      policy. Personal information will only be shared by the
                      website to provide or improve our service and marketing
                      aspects; it will not be shared with third parties for
                      their marketing purposes.{" "}
                    </p>

                    <p>
                      We may also carefully select other companies to send you
                      information about their products or services which are
                      related to the site's service but are not necessary to its
                      operation (an "Extended Service"). If the website intends
                      to use personally identifiable information for an Extended
                      Service, the website site will provide you with the
                      ability and requisite instructions to decline this
                      service.You may also stop the delivery of informational or
                      promotional mail from the website by following the
                      instructions on the mail.
                    </p>

                    <p>
                      People we may disclose your personal information will
                      include:
                      <br />
                      • Members of Web18;
                      <br />
                      • Members of Web18;
                      <br />
                      • our related companies;
                      <br />
                      • advertisers and content partners, either in an aggregate
                      form e.g. “5,000 users clicked on a banner ad”;
                      <br />
                      • Credit-reporting and fraud-checking agencies;
                      <br />
                      • Our professional advisers, including our accountants,
                      auditors and lawyers;
                      <br />
                      • other telecommunication and information service
                      providers;
                      <br />
                      • by disclosing individual records such as IP addresses as
                      may be required by law; or
                      <br />
                      • Government and regulatory authorities and other
                      organisations, as required or authorised by law. We will
                      ensure that these people only use such information to
                      perform the above functions, and that they have adequate
                      procedures in place to deal with your data securely. Some
                      of these people may be based outside India.
                      <br />
                    </p>

                    <h4>b. Advertising </h4>
                    <p>
                      When we present information to our advertisers -- to help
                      them understand our audience and confirm the value of
                      advertising on our websites or Applications -- it is
                      usually in the form of aggregated statistics on traffic to
                      various pages / content within our websites or
                      Applications. We use third-party advertising companies to
                      serve ads when you visit our websites or Applications.
                      These companies may use information (including your name,
                      address, email address or telephone number or any other
                      personally identifiable information) about your visits to
                      this and other websites or application, in order to
                      provide advertisements about goods and services of
                      interest to you. We do not provide any personally
                      identifiable information to third party websites /
                      advertisers / ad-servers without your consent.
                    </p>

                    <h4>c. Service Providers</h4>

                    <p>
                      We may disclose your information if we use third party
                      processors to administer and process your personal
                      information for the purposes notified in the Privacy
                      Policy, e.g. for hosting activities related to the use of
                      our Sites or services. The website may include links to
                      various third-party websites that may collect Your
                      Personal Information. Use of Your information collected by
                      such third-party platform will be governed by the privacy
                      policy in such third-party platform. Such websites or
                      applications are governed by their respective privacy
                      policies, which are beyond our control. Once you leave our
                      servers (you can tell where you are by checking the URL in
                      the location bar on your browser), use of any information
                      you provide is governed by the privacy policy of the
                      operator of the application, and you are visiting. That
                      policy may differ from ours. If you can't find the privacy
                      policy of any of these sites via a link from the
                      application's homepage, you should contact the application
                      owners directly for more information.
                    </p>

                    <p>
                      We may share non-personally identifiable information
                      publicly and with our partners — like publishers,
                      advertisers, developers, or rights holders. For example,
                      we share information publicly to show trends about the
                      general use of our services. We also allow specific
                      partners to collect information from your browser or
                      device for marketing/promotions and measurement purposes
                      using their own cookies or similar technologies.
                    </p>

                    <h4>d. Promotional Offers</h4>
                    <p>
                      We’ll share or disclose your personal information outside
                      of the website when we have your consent. For example,
                      providing SMS and E-mail related services such as
                      marketing newsletters, promotions and offers.
                    </p>

                    <h4>e. Business Transfers </h4>
                    <p>
                      We provide personal information to our affiliates and
                      other trusted businesses or persons to process it for us,
                      based on our instructions and in compliance with our
                      Privacy Policy and any other appropriate confidentiality
                      and security measures. For example, we may use service
                      providers to help us with customer support. We may share
                      your information with other members of the Web18 Group. As
                      used in this Privacy Policy the Web18 Group includes Web18
                      Holdings Limited, Cayman Islands and all of its subsidiary
                      and affiliated entities, including companies such as those
                      branded under Network18 labels. In this Privacy Policy
                      "we", "us", "our" and "ourselves" means any member of this
                      Group.
                    </p>

                    <p>
                      In the event Network18 Media and Investments Ltd. is
                      merged with or acquired by another company or in case of
                      re-organization or re-structuring of business, we and our
                      affiliates may share your personal information, wholly or
                      in part, with another business entity.
                    </p>

                    <h4>f. Legal</h4>
                    <p>
                      The website may disclose personally identifiable
                      information if required to do so by law or in the
                      good-faith belief that such action is necessary to: <br />
                      • We find that your actions on our web sites violate the
                      Web18 Terms of Service or any of our usage guidelines for
                      specific products or services;
                      <br />
                      • conform to the edicts of the law or comply with legal
                      process served on the site or its owners; <br />
                      • protect and defend the rights or property of the
                      site-owners, the site or the users of the website;
                      <br />
                      • Act under exigent circumstances to protect the personal
                      safety of users of the website, the site, its owners, or
                      the public.
                      <br />
                      • We may need to share details with third parties (such as
                      auditors or legal advisors) to obtain advice. Any such
                      processing will be governed by an agreement in the form
                      required by law, preserving any statutory data protection
                      rights.
                      <br />
                    </p>

                    <h2>Your Controls and Choices</h2>
                    <h3>Managing Your Information</h3>
                    <p>
                      When you use the Services from Network18 (websites or any
                      of its sub sites), we make good efforts to provide you, as
                      and when requested by you, with access to your personal
                      information and shall further ensure that any personal
                      information or sensitive personal data or information
                      found to be inaccurate or deficient shall be corrected or
                      amended as feasible, subject to any requirement for such
                      personal information or sensitive personal data or
                      information to be retained by law or for legitimate
                      business purposes.
                    </p>

                    <p>
                      We ask individual users to identify themselves and the
                      information requested to be accessed, corrected or removed
                      before processing such requests, and we may decline to
                      process requests that are unreasonably repetitive or
                      systematic, require disproportionate technical effort,
                      jeopardize the privacy of others, or would be extremely
                      impractical (for instance, requests concerning information
                      residing on backup tapes), or for which access is not
                      otherwise required. In any case, where we provide
                      information access and correction, we perform this service
                      free of charge, except if doing so would require a
                      disproportionate effort. Because of the way we maintain
                      certain services, after you delete your information,
                      residual copies may take a period of time before they are
                      deleted from our active servers and may remain in our
                      backup systems.
                    </p>

                    <p>
                      To exercise rights applicable to you as a data subject,
                      you must write to us at and raise a request for the
                      specified right. Kindly ensure you use appropriate
                      subjects to mention the right (e.g. Data Access Request,
                      Data Portability Request, Data Deletion Request) while
                      raising all such requests, this would help us process your
                      requests in a faster and more efficient manner.
                    </p>
                    <p>
                      We may take 30 days from the date of receipt of request to
                      complete your requests. However, if the nature of the
                      requests are excessive in nature or would require
                      significant effort then may ask for an extension of 60
                      days by giving a prior notice to you with the reason for
                      the extension.
                    </p>

                    <p>
                      We provide you the ability to exercise certain controls
                      and choices regarding our collection, use and sharing of
                      your personal information. In accordance with applicable
                      law, your controls and choices may include:{" "}
                    </p>

                    <h4>a. Data Access and Data Portability</h4>
                    <p>
                      The EU – General Data Protection Regulation) entitles you,
                      as the data subject, to request copies of your personal
                      information held by us. You may also be entitled to
                      request copies of personal information that you have
                      provided to us in a structured, commonly used, and
                      machine-readable format and/or request us to transmit this
                      information to another service provider (where technically
                      feasible).{" "}
                    </p>

                    <h4>
                      b. Rectification of Inaccurate or Incomplete Information
                    </h4>
                    <p>
                      You can ask us to correct inaccurate or incomplete
                      personal information concerning you (this is the
                      information which you cannot update yourself within your
                      Network18 account) by sending us an e-mail.
                    </p>

                    <p>
                      You can access and update some of your personal
                      information through your account settings. If you have
                      chosen to connect your the website profile to a
                      third-party application, like Facebook or Google, you can
                      change your settings and remove permission for the app by
                      changing your account settings. You are responsible for
                      keeping your personal information up-to-date. The website
                      may send you periodic reminders via e-mail to maintain the
                      accuracy of your personal information.
                    </p>

                    <h4>c. Data Retention and Erasure</h4>

                    <p>
                      We retain your personal information as long as necessary
                      for the legitimate interests specified in this policy and
                      for us to comply with our legal obligations. If you no
                      longer want us to use your information then you can
                      request that we erase your personal information and close
                      your account.
                    </p>

                    <p>
                      Please note that if your request for the erasure of your
                      personal information;
                      <br />
                      • We may retain some of your personal information as
                      necessary for our legitimate business interests, such as
                      fraud detection and prevention and enhancing safety. For
                      example, if we suspend a account for fraud or safety
                      reasons, we may retain certain information from that
                      account to prevent that user from opening a new account in
                      the future
                      <br />
                      • We may retain and use your personal information to the
                      extent necessary to comply with our legal obligations and
                      reasons of public interests in the area of public health.
                      For example, we may keep some of your information for tax,
                      legal reporting and auditing obligations.
                      <br />
                      • Information you have shared with others (e.g., Reviews,
                      forum postings) may continue to be publicly visible on the
                      website, even after your account is cancelled. However,
                      attribution of such information to you will be removed.
                      Additionally, some copies of your information (e.g., log
                      records) may remain in our database, but are disassociated
                      from personal identifiers.
                      <br />
                      • Because we maintain copies of personal information to
                      protect from accidental or malicious loss and destruction,
                      residual copies of your personal information may not be
                      removed from our backup systems for a limited period of
                      time.
                      <br />
                      • For archiving purposes in the public interest,
                      scientific or historical research purposes or statistical
                      purposes
                      <br />
                    </p>

                    <h4>
                      d. Withdrawing Consent and Restriction of Processing
                    </h4>
                    <p>
                      For withdrawing your consent at any time during the tenure
                      of your services with us, you may choose to do so by
                      sending us an e-mail. We shall review your request and may
                      ask you to verify your identity. Post verification we will
                      withdraw the consent for which request was made by you and
                      stop any further processing of your personal information
                    </p>

                    <h4>e. Objection to Processing</h4>
                    <p>
                      Where your personal information is processed for direct
                      marketing purposes, you may, at any time ask us to cease
                      processing your data for these direct marketing purposes
                      by sending an e-mail to us.
                    </p>

                    <p>
                      Please be aware that if you do not allow us to collect
                      personal information from you, we may not be able to
                      deliver certain experiences, products, and services to
                      you, and some of our services may not be able to take
                      account of your interests and preferences. If collection
                      of personal information is mandatory, we will make that
                      clear at the point of collection so that you can make an
                      informed decision whether to participate. If you have
                      questions about the specific personal information about
                      you that we process or retain, and your rights regarding
                      that personal information, please contact our customer
                      support team.
                    </p>

                    <h2>If you fail to provide consent </h2>
                    <p>
                      It is our duty to inform you that the website is an
                      ad-serving platform. Advertisements form the core of our
                      business, therefore permissions to use and process your
                      personal information to provide advertisements is
                      essential for us to provide services to You. Use of
                      personal information for ad-serving is a binding criterion
                      and we will not be able to provide you with Our services
                      if you fail to authorise us to use your personal
                      information for the purpose of ad-serving and the
                      activities related to it.
                    </p>

                    <h2>Children’s Privacy</h2>
                    <p>
                      The website is not intentionally designed for or directed
                      at persons less than 16 years of age. Network18 Media and
                      Investments Ltd. does not knowingly permit any person who
                      is under 16 years of age to register with the services or
                      to provide any other personally identifying information.
                      If Network18 Media and Investments Ltd. becomes aware that
                      any personally identifiable information of persons less
                      than 16 years of age has been collected on the website
                      without verified parental consent, then Network18 Media
                      and Investments Ltd. will take the appropriate steps to
                      delete any such information and notify the parent.{" "}
                    </p>
                    <p>
                      However, we consider it the responsibility of parents to
                      monitor their children’s use of our services.
                      Nevertheless, it is our policy not to collect and process
                      any personal information from children below 16 years of
                      age or offer to send any promotional materials to persons
                      in that category. Network18 Media and Investments Ltd.
                      does not seek or intend to seek or receive any personal
                      information from children. Should a parent or guardian
                      have reasons to believe that a minor has provided
                      Network18 Media and Investments Ltd. with personal
                      information without their prior consent, please contact
                      our customer support team to ensure that the personal
                      information is removed from the website.
                    </p>

                    <h2>Data transfer, storage & processing globally </h2>
                    <p>
                      We operate globally and may transfer your personal
                      information to individual companies of the Network18 Media
                      and Investments Ltd. affiliated companies or third parties
                      in locations around the world for the purposes described
                      in this privacy policy. Wherever your personal information
                      is transferred, stored or processed by us, we will take
                      reasonable steps to safeguard the privacy of your personal
                      information. Additionally, when using or disclosing
                      personal information transferred from the European Union,
                      we use standard contractual clauses approved by the
                      European Commission, adopt other means under European
                      Union law for ensuring adequate safeguards.
                    </p>
                    <h2>Security and compliance with laws</h2>
                    <p>
                      We are continuously implementing and updating
                      administrative, technical, and physical security measures
                      to help protect your information against unauthorized
                      access, loss, destruction, or alteration. Some of the
                      safeguards we may use to protect your information are
                      firewalls and data encryption, and information access
                      controls. If you know or have reason to believe that your
                      account credentials have been lost, stolen, altered, or
                      otherwise compromised or in case of any actual or
                      suspected unauthorized use of your account, please contact
                      us by contacting our customer support team.
                    </p>
                    <h2>Change in Policy </h2>
                    <p>
                      This Privacy Policy is subject to change from time to
                      time. We reserve the right, at our sole discretion, to
                      modify the terms of this Privacy Policy from time to time
                      in order to ensure compliance with applicable laws
                      (“Updated Terms”). The Updated Terms shall be effective
                      immediately and shall supersede the terms of this Privacy
                      Policy. We will notify you of any changes to this privacy
                      policy if the changes made to the policy significantly
                      affects your rights or as may be required by law. You
                      shall be solely responsible for reviewing the Privacy
                      Policy from time to time for any modifications. By
                      continuing to use the website after the updated Terms have
                      been published, you affirm your agreement to the updated
                      terms.
                    </p>

                    <h2>Contact information</h2>
                    <h4>a. Support</h4>
                    <p>
                      If you require any information or clarification regarding
                      the use of your personal information or this privacy
                      policy or grievances with respect to use of your personal
                      information, please email us at{" "}
                      <a href="mailto:GDPR@NW18.com">GDPR@NW18.com</a>
                    </p>
                    <h4>b. Data Controller Officer</h4>
                    <p>
                      The data controller for the News18.com is Network18 Media
                      & Investments Ltd with the business address of: <br />
                      First Floor, Empire Complex,
                      <br />
                      414 Senapati Bapat Marg,
                      <br />
                      Lower Parel, Mumbai-400013
                      <br />
                      Maharashtra, India
                      <br />
                      Ph: +91 22 4001 9000
                      <br />
                      <br />
                      The data protection officer (DPO) appointed by Network18
                      Media & Investments Ltd. is Tasneem Udaipurwala, who can
                      be contacted at{" "}
                      <a href="mailto:dpo@nw18.com">DPO@nw18.com</a>
                    </p>
                    <h4>c. Complaints</h4>
                    <p>
                      You can write to our data protection officer in case of
                      any grievance or compliant. You have the right to
                      complaint about the data processing activities carried out
                      by News18.com before the competent data protection
                      authorities.{" "}
                    </p>
                    <p>
                      If you have any queries, complaints regarding the
                      collecting, processing, transfer of personal
                      data/information or regarding this policy please do
                      contact our Data Protection Officer.
                    </p>
                  </div>
                </div>
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

        #table4,
        #table4 tbody,
        #table4 tr,
        #table4 th,
        #table4 td {
          border: 1px solid #ccc;
        }
        #table4 th,
        #table4 td a {
          color: #1059a4;
        }
        #table4 th,
        #table4 td {
          padding: 10px;
          font-size: 14px;
          color: #404040;
        }
        #table4 th,
        #table4 td a {
          color: #1059a4;
        }
        #text_contener h2 {
          font-size: 24px;
          font-weight: bold;
          color: #404040;
          margin: 10px 0 15px 0;
        }
        #text_contener h3,
        #text_contener h4 {
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .privacytab {
            background: #efefef;
            display: flex;
            border-bottom: 1px solid #e1e1e1;
        }
        .privacytab a.active {
            color: #e1251d;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0px 3px 0px #e1251d;
        }
        .privacytab a {
            color: #222;
            font-size: 14px;
            text-transform: uppercase;
            display: block;
            padding: 5px 15px;
            width: 50%;
            flex-shrink: 0;
        }
      `}</style>
    </>
  );
};

export default PrivacyPolicyDesktop;
