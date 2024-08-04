import React, { Fragment, useEffect } from "react";
import SelectStateAmp from "components/Common/SelectStateAmp";
import ElectionMobileHeadSponsor from "components/Common/ElectionMobileHeadSponsor";
import CricketHeaderMobile from "components/Cricketnext/CricketHeaderMobile";
import NewIcon from "../../components/Common/icon/newIcon.js";
import LazyLoadImage from "components/Common/CustomImage.js";
// import HindiGlobalContext from "HindiGlobalContext.js";
import AmpAnalyticsGA4Events from "./AmpAnalyticsGA4Events.js";
// import BudgetAmpAcrossSite from "layouts/Amp/BudgetAmpAcrossSite.js";

const Header = (props) => {
  const isElectionHeaderSponserOn = props.data.showBannerInHome;
  const getSponserdata = props.data._1xbetData;
  const trending = props.data?.menuData?.["MENU-L2"] || [];
  // const { counting_tally_amp_flag, counting_tally_microsite_flag } = props.counting_poll || {};
  // const { exit_poll_amp_flag } = props.exit_poll || {};
  // const showCountingPoll = counting_tally_amp_flag === "1" ? true : false;
  // const showExitPoll = exit_poll_amp_flag === "1" ? true : false;
  // const { budgetSwitcherData, highlightData } = props.pageCommonProps;
  // const { highlights_across_flag } = budgetSwitcherData;

  const processImpression = (item) => {
    try {
      const script = document.createElement("script");
      const showscript = document.createElement("script");
      const div = document.createElement("div");
      script.defer = true;

      const data = /googletag.defineSlot\('(.*?),(.*?]),(.*?)\)/gim.exec(
        item.amp_impression_tracker
      );
      if (data && data[0]) {
        const i = data[3] ? data[3].replace(/'/gim, "").trim() : "";
        script.innerHTML = `
        window.googletag = window.googletag || {cmd: []};
        window.googletag.cmd.push(function() {
          ${data[0]}.addService(window.googletag.pubads());
          googletag.display(${i});
        });
      `;

        div.setAttribute("id", i);
        showscript.innerHTML = `
        window.googletag = window.googletag || {cmd: []};
        window.googletag.cmd.push(function() {
          googletag.display('${i}');
        });
        `;
        div.appendChild(showscript);
        document.head.appendChild(script);
        document.head.appendChild(div);
      }
    } catch {
      //
    }
  };

  useEffect(() => {
    props.onoff &&
      props.data?.paramObj?.category !== "business" &&
      props.pageParam?.category !== "business" &&
      props.data?.sponsors &&
      props.data?.sponsors?.electionLogo &&
      props.data?.sponsors?.electionLogo?.data?.uploaded_img_mobile &&
      props.data?.sponsors?.electionLogo?.data?.click_tracker &&
      props.data?.sponsors?.electionLogo?.data?.amp_impression_tracker &&
      processImpression(props.data?.sponsors?.electionLogo?.data);
  }, []);

  // const { pageCommonProps = {} } = useContext(HindiGlobalContext);

  return (
    <>
      <amp-iframe
        title="User Sync"
        width={1}
        height={1}
        style={{ position: "absolute", top: "0px" }}
        sandbox="allow-same-origin allow-scripts"
        frameborder="0"
        src="https://ads.pubmatic.com/AdServer/js/pwtSync/load-cookie.html?pubid=113941&profid=2059&bidders=appnexus,pubmatic,districtm,rubicon,ix"
      >
        <amp-img
          layout="fill"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          placeholder
        ></amp-img>
      </amp-iframe>

      {/* {props.data?.isHome && props.onoff ? <HeaderSponsors isAmp={true} sponData={props.data.sponsors && props.data.sponsors.header} background={props?.data?.EventBack}/> : null} */}
      <amp-sidebar
        id="distcrictlistpopup"
        layout="nodisplay"
        side="right"
        className="district-sidebar"
      >
        <SelectStateAmp showStates={true} districtList={props.districtList} />
      </amp-sidebar>
      <amp-sidebar
        id="sidebar1"
        className="sample-sidebar my-custom-sidebar"
        layout="nodisplay"
        side="left"
      >
        <button
          on="tap:sidebar1.toggle"
          className="close-icon"
          role="button"
          type="button"
        ></button>
        <div className="select-language-head">
          <span className="bhashatxt">भाषा चुनें :</span>
          <a title="link" href={"/amp/"} className="homeurl">
            हिंदी
          </a>
          <label className="select-language">
            (12 और भाषाओं में भी)
            <input type="checkbox" />
            <div className="submenu" id="one-level-menu">
              <ul className="sub-menu-list">
                <li className="small_icon_sprite" id={"language_English"}>
                  <a href="https://www.news18.com/">
                    <span>English</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_English"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"English"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Bengali"}>
                  <a href="https://bengali.news18.com">
                    <span>বাংলা (Bengali)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Bengali"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Bengali"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Marathi"}>
                  <a href="https://news18marathi.com">
                    <span>मराठी (Marathi)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Marathi"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Marathi"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Gujarati"}>
                  <a href="https://gujarati.news18.com">
                    <span>ગુજરાતી (Gujarati)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Gujarati"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Gujarati"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Kannada"}>
                  <a href="https://kannada.news18.com">
                    <span>ಕನ್ನಡ (Kannada)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Kannada"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Kannada"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Tamil"}>
                  <a href="https://tamil.news18.com">
                    <span>தமிழ் (Tamil)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Tamil"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Tamil"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Malayalam"}>
                  <a href="https://malayalam.news18.com">
                    <span>മലയാളം (Malayalam)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Malayalam"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Malayalam"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Telugu"}>
                  <a href="https://telugu.news18.com">
                    <span>తెలుగు (Telugu)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Telugu"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Telugu"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Punjabi"}>
                  <a href="https://punjab.news18.com">
                    <span>ਪੰਜਾਬੀ (Punjabi)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Punjabi"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Punjabi"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Urdu"}>
                  <a href="https://urdu.news18.com">
                    <span>اردو (Urdu)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Urdu"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Urdu"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Odia"}>
                  <a href="https://odia.news18.com">
                    <span>ଓଡ଼ିଆ (Odia)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Odia"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Odia"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
                <li className="small_icon_sprite" id={"language_Assamese"}>
                  <a href="https://assam.news18.com">
                    <span>অসমীয়া (Assamese)</span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"language_Assamese"}
                  event_name={"hamburger_menu_lang_select"}
                  cta_name={"Assamese"}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
              </ul>
              <div className="return-button">
                {" "}
                <span>वापस जाएं</span>
              </div>
            </div>
          </label>
        </div>
        <ul className="menu-list">
          {props.data?.menuData?.["MENU-L1"] ? (
            (props.data?.menuData?.["MENU-L1"]).map((menus, index) => (
              <React.Fragment key={"menu" + index}>
                <li className="small_icon_sprite" id={"menu" + index}>
                  <a href={"/" + menus.url.replace("/", "")}>
                    <span>
                      {menus.label}
                      {menus?.highlight_new === "1" ? <NewIcon /> : ""}
                    </span>
                  </a>
                </li>
                <AmpAnalyticsGA4Events
                  id={"menu" + index}
                  event_name={"hamburger_menu_l1"}
                  cta_name={menus.label}
                  section={props?.GA4Data?.section || ""}
                  subsection={props?.GA4Data?.sub_section || ""}
                  article_id={props?.GA4Data?.article_id}
                  type_of_article={props?.GA4Data?.type_of_article || ""}
                  local18_district={props?.GA4Data?.local18_district || ""}
                  domain="https://hindi.news18.com/"
                />
              </React.Fragment>
            ))
          ) : (
            <Fragment></Fragment>
          )}
        </ul>
      </amp-sidebar>
      <header>
        <div id="header" className="header">
          <div className="mobile_nav_icon">
            <button
              className="nav_icon"
              on="tap:sidebar1.open"
              role="button"
              aria-label="Explore News18 हिन्दी"
              type="button"
              id="hamburger_menu"
            />
            <AmpAnalyticsGA4Events
              id="hamburger_menu"
              event_name={"hamburger_menu"}
              cta_name={"hamburger_menu"}
              section={props?.GA4Data?.section || ""}
              subsection={props?.GA4Data?.sub_section || ""}
              article_id={props?.GA4Data?.article_id}
              type_of_article={props?.GA4Data?.type_of_article || ""}
              local18_district={props?.GA4Data?.local18_district || ""}
              domain="https://hindi.news18.com/"
            />
            <a href="/amp/" className="logo" id="logo_top_nav">
              <LazyLoadImage
                isAMP={true}
                width={`${props.isT20 ? "86" : "115"}`}
                height={`${props.isT20 ? "45" : "52"}`}
                src={
                  props.isT20
                    ? "https://images.news18.com/ibnkhabar/uploads/assests/images/2020/bihar-elec-nw18logo.png"
                    : props.data?.isHome && props.data?.EventBack?.mobLogo
                    ? props.data?.EventBack?.mobLogo
                    : "/images/siteimages/news18-hindi-logo.png"
                }
                alt="News18 Hindi"
                title="News18 Hindi"
                layout="fixed"
              />
              <AmpAnalyticsGA4Events
                id="logo_top_nav"
                event_name={"logo_top_nav"}
                cta_name={"logo_top_nav"}
                section={props?.GA4Data?.section || ""}
                subsection={props?.GA4Data?.sub_section || ""}
                article_id={props?.GA4Data?.article_id}
                type_of_article={props?.GA4Data?.type_of_article || ""}
                local18_district={props?.GA4Data?.local18_district || ""}
                domain="https://hindi.news18.com/"
              />
            </a>
            {props?.isT20 && (
              <a href="/t20-world-cup/amp/" className="biharelec-logo">
                <LazyLoadImage
                  isAMP={true}
                  width={75}
                  height={30}
                  src={`https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/T20_Vishva_Cup_2022_m_1663586689.svg`}
                  alt="News18 Hindi"
                  title="News18 Hindi"
                  layout="fixed"
                />
              </a>
            )}
            {props?.isWorldCup && (
              <a href="/amp/world-cup/" className="biharelec-logo">
                <amp-img
                  width={100}
                  height={100}
                  src="/images/logos/WCLogoMob.svg"
                  alt="News18 Hindi"
                  title="News18 Hindi"
                />
              </a>
            )}
            {props.onoff &&
            props.data?.paramObj?.category !== "business" &&
            props.pageParam?.category !== "business" &&
            props.data?.sponsors &&
            props.data?.sponsors?.electionLogo &&
            props.data?.sponsors?.electionLogo?.data?.uploaded_img_mobile ? (
              <h2
                style={{
                  width: "75px",
                  borderLeft: "1px solid rgba(0,0,0,0.3)",
                  marginLeft: "5px",
                  padding: "2px 0 2px 5px",
                }}
              >
                <a
                  href={
                    props.data?.sponsors?.electionLogo?.data?.click_tracker ||
                    ""
                  }
                  style={{ display: "block" }}
                >
                  <LazyLoadImage
                    isAMP={true}
                    width="73"
                    height="35"
                    src={
                      props.data?.sponsors?.electionLogo?.data
                        ?.uploaded_img_mobile ||
                      "https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/Battle_For_The_States_Hindi_M_1644928926.svg"
                    }
                    alt={"logo"}
                    title="News18 Hindi"
                  />
                </a>
              </h2>
            ) : (
              ""
            )}
            {(props.data.paramObj?.category === "business" ||
              props.pageParam?.category === "business" ||
              props.data?.paramObj?.category === "मनी") && (
              <div
                style={{
                  paddingLeft: "10px",
                  marginLeft: "10px",
                  borderLeft: "1px solid rgba(0,0,0,0.5)",
                  fontSize: "1.7em",
                  fontWeight: "600",
                }}
              >
                मनी
              </div>
            )}
          </div>
          {/* {props.onoff && props.data?.paramObj?.category !== "business" && props.pageParam?.category !== 'business' && getSponserdata ? ( */}
          {isElectionHeaderSponserOn && getSponserdata ? (
            <ElectionMobileHeadSponsor sponData={getSponserdata} isAmp={true} />
          ) : (
            <>
              {props.data?.paramObj?.category === "business" &&
              props.pageParam?.category === "business" ? (
                <>
                  <div className="money_header">
                    <div className="money_header_right">
                      <span>Powered by</span>
                      <a
                        href="https://www.moneycontrol.com/"
                        rel="nofollow"
                        target="_blank"
                        id="moneycontrolheader"
                      >
                        <LazyLoadImage
                          src="/images/siteimages/moneycontrol_logo_1591703617.png"
                          width="75"
                          height="20"
                          alt="moneycontrol"
                          title="News18 India"
                        />
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {!props.isT20 && !props.isWorldCup && (
                    <div className="hdrrgt">
                      <button
                        id="seher-chune"
                        on="tap:distcrictlistpopup.open"
                        data-vars-event-category="Top_Nav_Local18_district"
                        data-vars-event-label="शहर चुनें"
                        className="chs-stct districtSelect"
                        role="button"
                        type="button"
                      >
                        <svg
                          version="1.1"
                          id=""
                          x="0px"
                          y="0px"
                          width="17px"
                          height="20px"
                          viewBox="0 0 17 20"
                          style={{
                            enableBackground: "new 0 0 17 20",
                            display: "block",
                            margin: "0 auto 2px auto",
                          }}
                        >
                          <path
                            className="st0"
                            d="M15.8,16c-0.1,1.1-0.8,1.9-2.1,2.6s-3.1,1-5.2,1c-2.1,0-3.8-0.3-5.2-1S1.2,17,1.2,16c0-0.6,0.3-1.1,0.8-1.6
    c0.5-0.5,1.2-0.9,2.1-1.3l0.6,0.8c-1,0.4-1.6,1-1.6,1.6c0,0.6,0.6,1.2,1.6,1.6c1,0.4,2.3,0.6,3.9,0.6s2.8-0.2,3.9-0.6
    c1-0.4,1.6-1,1.6-1.6c0-0.7-0.6-1.2-1.6-1.6l0.6-0.8c0.9,0.3,1.6,0.8,2.1,1.3C15.6,14.8,15.8,15.4,15.8,16z M8.5,0.4
    C10,0.4,11.3,1,12.4,2c1,1,1.6,2.3,1.6,3.9c-0.2,2.2-1.1,4.4-2.8,6.6c-1.6,2.2-2.5,3.4-2.8,3.5c-0.2-0.1-1.1-1.3-2.8-3.5
    C4.1,10.3,3.2,8.1,3,5.9C3,4.3,3.6,3,4.6,2C5.7,1,7,0.4,8.5,0.4z M8.5,4C8,4,7.6,4.2,7.2,4.6C6.9,4.9,6.7,5.4,6.7,5.9
    s0.2,0.9,0.5,1.3S8,7.7,8.5,7.7s0.9-0.2,1.3-0.5s0.5-0.8,0.5-1.3s-0.2-1-0.5-1.3C9.4,4.2,9,4,8.5,4z"
                          />
                        </svg>
                        शहर चुनें
                        <AmpAnalyticsGA4Events
                          id="seher-chune"
                          event_name={"select_city"}
                          cta_name={"शहर चुनें"}
                          section={props?.GA4Data?.section || ""}
                          subsection={props?.GA4Data?.sub_section || ""}
                          article_id={props?.GA4Data?.article_id}
                          type_of_article={
                            props?.GA4Data?.type_of_article || ""
                          }
                          local18_district={
                            props?.GA4Data?.local18_district || ""
                          }
                          domain="https://hindi.news18.com/"
                        />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <nav>
          <div className="tplc">
            <li>
              <a
                href={
                  props?.isCricketNext || props?.isT20 ? "/cricket/" : "/amp/"
                }
                className="home-icon tplc_child"
              >
                <span>
                  {props.isCricketNext ? (
                    <LazyLoadImage
                      src={
                        props.isCricketNext
                          ? "/images/siteimages/cn-icon.svg"
                          : "/images/siteimages/news18hindilogo_homeiconnew_1631196395.svg"
                      }
                      width="19"
                      height="17"
                      alt="News18 India"
                      title="News18 India"
                    />
                  ) : (
                    <>
                      <span id={"menutrending" + "होम"}>{"होम"}</span>
                      <AmpAnalyticsGA4Events
                        id={"menutrending" + "होम"}
                        event_name={"top_navigation"}
                        cta_name={"होम"}
                        section={props?.GA4Data?.section || ""}
                        subsection={props?.GA4Data?.sub_section || ""}
                        article_id={props?.GA4Data?.article_id}
                        type_of_article={props?.GA4Data?.type_of_article || ""}
                        local18_district={
                          props?.GA4Data?.local18_district || ""
                        }
                        domain="https://hindi.news18.com/"
                      />
                    </>
                  )}
                </span>
              </a>
            </li>
            {props?.isCricketNext || props.isT20 || props.isWorldCup ? (
              <CricketHeaderMobile
                isIpl={props?.isIpl || ""}
                isWorldCup={props.isWorldCup || ""}
                isAmp={true}
                isT20={props?.isT20 || ""}
                pageType={props?.pageType || ""}
              />
            ) : null}
            {!props.isWorldCup &&
              trending &&
              trending.map((topNavData, key) => (
                <>
                  <li key={key}>
                    <a
                      key={"menutrending" + topNavData.id}
                      className="tplc_child"
                      href={topNavData.url}
                      id={"menutrending" + key + "11"}
                    >
                      {topNavData.highlight_new === "1" ? <NewIcon /> : null}
                      {topNavData.label}
                    </a>
                  </li>
                  <AmpAnalyticsGA4Events
                    id={"menutrending" + key + "11"}
                    event_name={"top_navigation"}
                    cta_name={topNavData.label}
                    section={props?.GA4Data?.section || ""}
                    subsection={props?.GA4Data?.sub_section || ""}
                    article_id={props?.GA4Data?.article_id}
                    type_of_article={props?.GA4Data?.type_of_article || ""}
                    local18_district={props?.GA4Data?.local18_district || ""}
                    domain="https://hindi.news18.com/"
                  />
                </>
              ))}
          </div>
        </nav>
      </header>
      {/* {highlights_across_flag === "1" && (
        <BudgetAmpAcrossSite
          highlightData={highlightData}
          budgetSwitcher={budgetSwitcherData}
        />
      )} */}
      {/* {showExitPoll && (
        <amp-iframe
          layout="responsive"
          frameborder="0"
          height="235"
          width="320"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox allow-presentation allow-top-navigation"
          src="https://elections-v3-gcs-json.news18.com/feed/iframe/AMP_Exit_Poll_Iframe.html?lang=hi&"
        >
          <amp-img
            layout="fill"
            src="https://foo.com/foo.png"
            placeholder
          ></amp-img>
        </amp-iframe>
      )}
      {showCountingPoll && (
        <amp-iframe
          layout="responsive"
          frameborder="0"
          height="185"
          width="320"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox allow-presentation allow-top-navigation"
          src="https://elections-v3-gcs-json.news18.com/feed/iframe/resulttallyscrollAmp.html?lang=hi&"
        >
          <amp-img
            layout="fill"
            src="https://foo.com/foo.png"
            placeholder
          ></amp-img>
        </amp-iframe>
      )}
      {counting_tally_microsite_flag === "1" && (
        <amp-iframe
          layout="responsive"
          frameborder="0"
          height="185"
          width="320"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox allow-presentation allow-top-navigation"
          src="https://elections-v3-gcs-json.news18.com/feed/iframe/assembelyAmp.html?lang=hi&"
        >
          <amp-img
            layout="fill"
            src="https://foo.com/foo.png"
            placeholder
          ></amp-img>
        </amp-iframe>
      )} */}
      <style jsx global>{`    
      .header {
        width: 100%;        
        padding: 0 15px;
        z-index: 12;
        position: relative;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        align-items: center;
        background: ${
          props?.isT20 || props?.isWorldCup
            ? "url(/images/siteimages/m-wordcup_headerbg.png) no-repeat top center"
            : ""
        }
        background-size: 100%;
      }
      .logo {
        margin-left: 15px;
        line-height: 0;
      }
      .mobile_nav_icon {
        display: flex;
        align-items: center;
      }
      .hdrrgt {
        display: flex;
        align-items: center;
      }
      .melwgt .melwgthd h2 {
        max-width: 200px;
    }
      .nav_icon {
        height: 15px;
        position: relative;
        width: 22px;
        display: block;
        background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/hmbrgricnnew_1669296204.png) no-repeat 0 0;
        margin: auto;
        border:none;
      }
      
      body {
          font-family: 'Mukta',sans-serif;
          font-weight: normal;
          margin: 0 auto
        }
    
        header,
        footer,
        article,
        figure {
          display: block;
          margin: 0;
          padding: 0
        }
    
        a {
          text-decoration: none
        }
    
        h1,
        h2,
        p,
        div,
        ul,
        li {
          margin: 0;
          padding: 0
        }
    
        ul,
        li {
          list-style: none
        }

        body{font-weight:400;
          margin:0 auto font-size: 14px;
          line-height: 1.4;color: #000
        }
        article,figure,footer,header{
          display:block;margin:0;padding:0}
          a,div,h1,h2,li,p,ul{margin:0;padding:0}li,ul{list-style:none}header{text-align:center;}
        *{margin:0;padding:0;box-sizing:border-box}
        a{text-decoration:none}header{top:0;left:0}
        header{padding: 0}ul{list-style:none}
        header{position:relative;width:100%;left:0;top:0;z-index:9999;background:#fff}
        .my-custom-sidebar{background:#f5f5f5;max-width:88%;width:88%;height:100%;max-height:100%}
        .close-icon{position:absolute;right:0;top:0;background:#ed1c24;
          width:44px;height:44px;border:0;z-index:1}.close-icon:focus{outline:0}
          .close-icon:after,.close-icon:before{content:no-close-quote;width:3px;height:22px;left:50%;
            background:#fff;display:block;position:absolute;margin-left:-2px;top:11px}
            .close-icon:after{transform: rotate(-45deg);}
            .close-icon:before{transform: rotate(45deg);}
            .select-language-head{background:url(/images/siteimages/navlngbg.svg) 98% 1px no-repeat #ededed;
            padding:16px;position:relative;border-bottom:1px solid #9b9b9b;background-size:149px}
            .select-language-head .bhashatxt{font-size:10px;color:#000;margin-top:2px;margin-bottom:3px;font-weight:normal}
            .select-language-head a{display:block}.homeurl{color:#ed1c24;font-weight:700;font-size:18px}
            .select-language{background:transparent;border:0;color:#7e8186;font-size:12px;position:relative;padding:0;display:block}
            amp-sidebar input[type="checkbox"]{position:absolute;visibility:hidden}amp-sidebar input:checked+.submenu{transform:translateX(0);overflow-y:auto;z-index:1}
            .select-language:focus{outline:0}.select-language:after{content: "";
          width: 12px;
          height: 7px;
          display: inline-block;
          background: url(/images/siteimages/newdnarrowred_1669296439.png) no-repeat 0 0;
          margin-left: 5px;}.menu-list{margin:0;padding:0;height:calc(100% - 100px);overflow-y:auto}.menu-list a,.sub-menu-list a{
            border-bottom: 1px solid#dfdfdf;display:flex;align-items:center}
            .menu-list i,.sub-menu-list i{position:relative;top:1px;width:52px;
              font-size:22px;color:#ababab;text-align:center; 
               filter: grayscale(1)}.menu-list span,.sub-menu-list span{
                color:#000;font-size:16px;flex:1;position:relative}amp-sidebar .submenu{
                  height:100%;background:#f5f5f5;top:0;left:0;position:fixed;right:0;top:0;transform:translateX(-100%);}.return-button{background:#171717;left:0;width:100%;height:50px;
                    z-index:99;line-height:1;flex-flow:row-reverse;align-items:center;display:flex}
                    .return-button span{color:#fff;font-size:14px;display:inline-block;margin-right:16px;position:relative}
                  .return-button span:before{width:8px;content:"";
                  height:8px;border-left:2px solid #fff;
                  border-top:2px solid #fff;transform:rotate(-45deg);position:absolute;left:-15px}
                  ul.sub-menu-list{height:calc(100% - 50px);overflow-y:auto}
                  .tplc{display:flex;height:36px;justify-content:space-between;
                    overflow-y:hidden;border-top:1px solid #ececec;
                    border-bottom:1px solid #ececec;background:#f7f7f7;font-family: 'Mukta', sans-serif;}
                    .tplc a{padding:0 10px 0;height:34px;color:#606060;font-size:15px;line-height:34px;
                      text-align:center;flex:none;font-weight: 400;position: relative; margin-right: 15px;}
                      li:last-child a{border-right:0}

          .small_icon_sprite {height: 48px; padding: 10px 30px;}

        footer {
          background: #000;
          font-size: 12px;
          padding: 10px 0;
          text-align: center;
          color: #fff
        }

        footer a {
          display: block;
          color: #fff;
          padding-top: 10px;
          border-top: 1px solid #fff;
          margin-top: 10px
        }
        .tplc {
          display: -webkit-box;;
          height: 34px;
          justify-content: space-between;
          overflow-y: hidden;
          border-top: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
          background: #f7f7f7;
          position: sticky;
          top: 0;
          z-index: 10;
      }
      li:first-child a.tplc_child {
      position: sticky;
      left: 0;
      border-right: solid 1px #E8E8E8;
      background: #fff;
      z-index: 1;
    }
    li:first-child a.tplc_child span {
      position: relative;
      top: 2px;
    }
    .tplc_child svg{
      position: absolute;
      right: -7px;
    }
    .menu-list li a svg {
      position: absolute;
      top: -7px;
    }
    .imp-div {
      position:absolute;
    }
    .chs-stct {
      color: #c6080f;
      font-weight: bold;
      font-size: 13px;
      height: 48px;
      outline: 0;
      border: 0;
      background: transparent;
    }
    
    .chs-stct .st0{fill:#E1261D;}
    .district-sidebar{
      background: transparent;
      max-width:310px;
      width:90%;
      height:100%;
      max-height:100%
    } 
     a {
      color: #000;
      } 
      .biharelec-logo {
        display: block;
        float: left;
        margin-top: 5px;
        padding-left: 5px;
        position: relative;
        margin-left: 5px;
        line-height: 0;
    }
    .joinUs_Wasp {
      display: flex;
      align-items: center;
      width: 112px;
      height: 35px;
      border: #c8c8c8 solid 1px;
      background-color: #f3f3f3;
      border-radius: 9px;
      padding: 5px 7px;
      margin: auto 0;
      justify-content:center;
      margin-right: -19px;
      margin-top: 12px;
    }
    .joinUs_Wasp span {
      margin: 4px 6px 0 0;
      font-size: 11px;
      color: #373737;
      line-height: 18px;
      text-transform: uppercase;
      font-weight: bold;
    }
    @media screen and (max-width: 767px) {
      header, nav{
        display:initial;
        z-index: 99;
      }
    }
    @media screen and (max-width: 359px) {
      .joinUs_Wasp {
        display: none;
      }
    }
    `}</style>
    </>
  );
};

export default Header;
