import React, {
  useState,
  useEffect,
  // useRef,
  Fragment,
  useContext,
} from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import SelectState from "components/Common/SelectState";
import { arrayOnly } from "includes/_app.util.js";
import englishVariables from "includes/lang.helper.js";
import { useRouter } from "next/router";
import Image from "next/image";
// import Glide from "@glidejs/glide";
import dynamic from "next/dynamic";
import NewIcon from "../../components/Common/icon/newIcon.js";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd.js";
import HindiGlobalContext from "HindiGlobalContext";
import { IPL_YEAR } from "includes/ipl.helper.js";
import {
  googleOneTapJs,
  getCookie,
  checkUserExists,
  delete_cookie,
} from "includes/GoogleOneTap.util";
import Menu from "./Menu";
import {
  generate_dfp_ppid,
  generate_dfp_ppid_login_user,
} from "includes/ppid.helper";
// import BudgetHighlightAcrossSiteResponsiveWidget from "components/Common/budget/BudgetHighlightAcrossSiteResponsiveWidget.js";
import NotificationPopup from "components/Responsive/NotificationPopUp.js";
import LazyLoadImage from "components/Common/CustomImage.js";
import { STATIC_IMAGE } from "constant/global/Constant";
import useDistrict from "hooks/useDistrict.js";
import SponserMobile from "./SponserMobile.js";
// import { getRedisDataWithKey } from "api/global/Common";
// import { REDIS_KEYS } from "api/Constant";

// const HeadSponsor = dynamic(() => import("components/Common/HeadSponsor"));
// const ElectionMobileHeadSponsor = dynamic(() =>
//   import("components/Common/ElectionMobileHeadSponsor")
// );
const Search = dynamic(() => import("widgets/Common/Search/index.js"));
// const ASCountingDay = dynamic(() =>
//   import(
//     "../../../common_react/CommonSrc/CommonComponents/election/ASCountingDay"
//   )
// );
// const LSCountingDay = dynamic(() =>
//   import(
//     "../../../common_react/CommonSrc/CommonComponents/election/LSCountingDay"
//   )
// );
// const LSAcross = dynamic(() =>
//   import("../../../common_react/CommonSrc/CommonComponents/election/LSAcross")
// );
// const SponserMobile = dynamic(() => import("./SponserMobile.js"));
// const EntertainmentLifestyleSponser = dynamic(() =>
//   import("./EntertainmentLifestyleSponser.js")
// );
// const CricketSponser = dynamic(() => import("./CricketSponser.js"));

const HeaderMobile = (props) => {
  let onoff = props;
  const {
    // districtList,
    _1xbetData: betData_1x,
    menuData = {},
    imageM = {},
    electionWidgetData,
    categoryName,
    pageParam,
    sponData,
    isWomenWorldCupPage,
    pageAds,
    isT20,
    background,
    isHome,
    // isHomeOnly,
    showBannerInHome,
    showBannerInTag,
    showBannerInIPL,
    isTag,
    // switches = {},
    isArticle,
    pageType,
    isIpl,
    showSponser,
    // countingTallyData,
    // isEntPage,
    // islifePage,
    isWorldCup = false,
    toggeleHandler,
    toggleMenu = false,
    // budgetSwitcherData,
    // isBudgetPage,
    showtopHeaderBanner,
    // dtype = "",
    // counting_poll = {},
    // exit_poll = {},
    // budgetSwitcherData,
  } = props;
  const search =
    menuData?.footerData?.length > 0
      ? menuData?.footerData?.filter((item) => item?.search === 1)
      : [];
  const city =
    menuData?.footerData?.length > 0
      ? menuData?.footerData?.filter((item) => item?.city === 1)
      : [];

  // const {
  //   highlights_across_flag = "0",
  //   highlights_microsite_flag = "0",
  //   highlights_sponser_across_flag = "0",
  // } = budgetSwitcherData || {};

  // const {
  //   status: countingPollStatus = {},
  //   counting_tally_sponser_home_flag,
  //   counting_tally_home_flag,
  //   counting_tally_sponser_across_flag,
  //   counting_tally_microsite_flag,
  // } = counting_poll || {};
  // const { status: exitPollStatus = {}, exit_poll_home_flag } = exit_poll || {};
  // const showCountingPoll =
  //   (isHomeOnly &&
  //     counting_tally_home_flag !== "1" &&
  //     countingPollStatus?.counting_live_flag === "1") ||
  //   (!isHomeOnly && countingPollStatus?.counting_live_flag === "1")
  //     ? true
  //     : false;
  // const showExitPoll =
  //   (isHomeOnly &&
  //     exit_poll_home_flag !== "1" &&
  //     exitPollStatus?.exit_poll_live_flag === "1") ||
  //   (!isHomeOnly && exitPollStatus?.exit_poll_live_flag === "1")
  //     ? true
  //     : false;

  // const {
  //   sponser_label,
  //   click_tracker_logo,
  //   upload_image_mobile,
  //   // impression_tracker_logo,
  // } =
  //   (isHome && showBannerInHome) ||
  //   (isTag && showBannerInTag) ||
  //   (isIpl && showBannerInIPL) ||
  //   showSponser ||
  //   (props?.isCricketNext && !isIpl) ||
  //   isEntPage ||
  //   islifePage
  //     ? betData_1x?.["associate-partner"]?.[0] ||
  //       betData_1x?.["co-presenting"]?.[0] ||
  //       betData_1x?.["partner"]?.[0] ||
  //       {}
  //     : {};
  // const cse = useRef(false);
  const url = `${publicRuntimeConfig.siteUrl}${useRouter().asPath.replace(
    "/",
    ""
  )}`;
  const _1xbetData = betData_1x;
  // const backgroundImg = {
  //   mob: "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Women_World_Cup_2022_bg_M.jpg",
  // };
  // const { pageCommonProps = {} } = useContext(HindiGlobalContext);

  onoff =
    (isHome && showBannerInHome) ||
    (isTag && showBannerInTag) ||
    (isIpl && showBannerInIPL) ||
    showSponser;

  const menuArray = arrayOnly(menuData?.["MENU-L1"] || []);
  // const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleLangMenu, setToggleLangMenu] = useState(false);
  // const [showStates, setShowStates] = useState(false);
  // const [showSearch, setShowSearch] = useState(false);
  const { searchBar, setSearchBar, showStates, handleShowChange, isNotificationOnScroll } = useContext(HindiGlobalContext);
  const [getUserName, setUserName] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [checkOneTap, setCheckOneTap] = useState(1);
  const [signout, setSignout] = useState(false);
  const [fireOps, setFireOps] = useState(false);
  const [districtList, filteredItems, state, setState] = useDistrict("");
  const [flipLogo, setFlipLogo] = useState({});
  if (!fireOps) {
    setFireOps(true);
  }

  useEffect(() => {
    if (getCookie("g_token") === null) {
      generate_dfp_ppid();
      if (checkOneTap === 1) {
        setTimeout(googleOneTapJs, 10000);
        setCheckOneTap(2);
      }
    } else {
      if (getCookie("isSignedIn") === null) {
        checkUserExists(getCookie("g_token"));
      } else {
        generate_dfp_ppid_login_user();
        setUserName(getCookie("g_username"));
        setIsSignedIn(true);
      }
    }
    // getRedisDataWithKey("KHABARN18-" + REDIS_KEYS.FLIP_LOGO, false, true)
    //   .then((data) => {
    //     setFlipLogo(data);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  }, []);

  // const handleShowChange = () => {
  //   setShowStates((prev) => !prev);
  //   if (!showStates) {
  //     logEvent("Top_Nav_Local18_district", "Click", "अपना शहर चुनें");
  //   }
  // };

  function removeSession() {
    delete_cookie("g_token");
    delete_cookie("g_username");
    delete_cookie("isSignedIn");
    setIsSignedIn(false);
  }

  const closeSubMenu = () => {
    document.querySelector(".sub-navg.scrlsbnv").classList.remove("scrlsbnv");
  };

  const toggleSearch = () => {
    // if (!cse.current) {
    //   loadGS();
    //   cse.current = true;
    // }
    setSearchBar();
  };

  // useEffect(() => {
  // let sponsorsLength = 0;
  // (_1xbetData?.["co-presenting"] && _1xbetData["co-presenting"]?.length) ||
  //   0;
  // sponsorsLength =
  //   sponsorsLength +
  //   ((_1xbetData?.["associate-partner"] &&
  //     _1xbetData["associate-partner"]?.length) ||
  //     0);
  // sponsorsLength =
  //   sponsorsLength +
  //   ((_1xbetData?.["presented-by"] && _1xbetData["presented-by"]?.length) ||
  //     0);
  // sponsorsLength =
  //   sponsorsLength +
  //   ((_1xbetData?.["co-partner"] && _1xbetData["co-partner"]?.length) ||
  //     0);
  // sponsorsLength = sponsorsLength + (_1xbetData?.["partner"] || 0);
  // const keys = Object.keys(_1xbetData || {}).filter(
  //   (key) => !key.includes("present")
  // );
  // keys?.length > 0 &&
  //   keys.forEach((key) => {
  //     if (_1xbetData[key]?.length > 0) {
  //       sponsorsLength = sponsorsLength + 1;
  //     }
  //   });
  // if (document.querySelector(".aso_one") && sponsorsLength) {
  //   new Glide(".aso_one", {
  //     type: `${sponsorsLength > 1 ? "carousel" : ""}`,
  //     autoplay: `${sponsorsLength > 1 ? 5000 : false}`,
  //     animationDuration: 1000,
  //     perView: 1,
  //     gap: 0,
  //   }).mount();
  // }
  // if (document.querySelector(".aso_new") && sponsorsLength) {
  //   new Glide(".aso_new", {
  //     type: `${sponsorsLength > 1 ? "carousel" : ""}`,
  //     autoplay: `${sponsorsLength > 1 ? 4000 : false}`,
  //     animationDuration: 2000,
  //     perView: 1,
  //     gap: 0,
  //   })?.mount();
  // }
  // }, []);

  // useEffect(() => {
  //   if (electionWidgetData?.delhi?.mcd?.switcher?.Hindi_OnOff === 1) {
  //     const widgetScriptt = document.createElement("script");
  //     widgetScriptt.src =
  //       "https://images.news18.com/ibnkhabar/uploads/assets/event/common/js/Delhi_MuncipleElection2022WidgetMobile_1669808519.js?v=1";
  //     document.head.appendChild(widgetScriptt);
  //   }
  // }, [electionWidgetData]);

  // const toggeleHandler = (e) => {
  //   e.preventDefault();
  //   const tempToggle = !toggleMenu;
  //   setToggleMenu(tempToggle);

  //   if (!tempToggle) {
  //     setToggleLangMenu(false);
  //     document.querySelectorAll("ul.sub-navg").forEach((el) => {
  //       el.classList.remove("scrlsbnv");
  //     });
  //   }
  // };

  const processImpression = (item) => {
    try {
      const script = document.createElement("script");
      const showscript = document.createElement("script");
      const div = document.createElement("div");
      script.defer = true;

      const data = /googletag.defineSlot\('(.*?),(.*?]),(.*?)\)/gim.exec(
        item.impression_tracker
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
    } catch (error) {
      console.log(error);
    }
  };

  const langHandler = (e) => {
    e.preventDefault();
    setToggleLangMenu(!toggleLangMenu);
  };

  const subMenuHandler = (e) => {
    const ID = e.target.getAttribute("rel");
    document.getElementById(ID).classList.toggle("scrlsbnv");
  };

  useEffect(() => {
    onoff &&
      categoryName !== "business" &&
      categoryName !== "मनी" &&
      pageParam?.category !== "business" &&
      sponData &&
      sponData.electionLogo &&
      sponData.electionLogo?.data?.uploaded_img_mobile &&
      sponData.electionLogo?.data?.click_tracker &&
      sponData.electionLogo?.data?.impression_tracker &&
      processImpression(sponData.electionLogo?.data);
  });

  if (isIpl && showBannerInIPL) {
    _1xbetData["presented-by"] = _1xbetData?.["co-partner"];
  }

  return (
    <>
      <header>
        {/* {isWomenWorldCupPage && (
          <HeadSponsor
            isMobile={true}
            sponData={sponData?.sponserdata}
            background={backgroundImg}
            isWomenWorldCupPage={isWomenWorldCupPage}
          />
        )} */}
        {typeof pageAds !== "undefined" &&
          typeof pageAds.PG_1x1_4 !== "undefined" && (
            <NewSiteAd
              slotId="PG_1x1_4"
              adUnit={pageAds.PG_1x1_4}
              sizes={[[1, 1]]}
              width={300}
              height={250}
              loadOnScroll={true}
              removeAdSpan={true}
            ></NewSiteAd>
          )}
        {!isT20 ? (
          <div
            id="header"
            className={
              isWorldCup
                ? "header worldcupHeader"
                : isIpl
                ? "header iplHeader"
                : "header"
            }
          >
            <div className="mainelmt">
              {!isIpl && (
                <a
                  title="Explore News18 हिंदी"
                  href="#"
                  className="hmbrgr header_hamburger"
                  onClick={toggeleHandler}
                />
              )}
              <>
                {flipLogo?.mobile_status === "1" ? (
                  <a href="/" title="Link" className="lg-mbl flipHm">
                    <span className="lg_ani">
                      <h1>
                        <img
                          src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/News18-hindi-svg.svg"
                          alt="News18 इण्डिया-Hindi News"
                          width="104"
                          height="26"
                          loading="lazy"
                        />
                      </h1>
                      <img
                        src={flipLogo?.image_url}
                        alt="News18 इण्डिया-Hindi News"
                        width="104"
                        height="26"
                        loading="lazy"
                        className="img2"
                        onClick={(e) => e.preventDefault()}
                      />
                    </span>
                  </a>
                ) : (
                  <a href="/" title="Link" className="lg-mbl">
                    <img
                      src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/News18-hindi-svg.svg"
                      alt="News18 इण्डिया-Hindi News"
                      width="104"
                      height="26"
                      loading="lazy"
                    />
                  </a>
                )}
                {isIpl && (
                  <div
                    className="rgtsponsrs dflex jstbtwn algncntr"
                    style={{ paddingLeft: "10px" }}
                  >
                    <a href="/cricket/ipl/">
                      <h2 style={{ fontSize: "18px", color: "white" }}>
                        T20 रनभूमि {IPL_YEAR}
                      </h2>
                    </a>
                  </div>
                )}
              </>
              {onoff &&
              categoryName !== "business" &&
              categoryName !== "मनी" &&
              pageParam?.category !== "business" &&
              sponData &&
              sponData.electionLogo &&
              sponData.electionLogo?.data?.uploaded_img_mobile ? (
                <h2>
                  <a
                    href={sponData.electionLogo?.data?.click_tracker || ""}
                    style={{ display: "block" }}
                  >
                    <img
                      style={{
                        width: "75px",
                        borderLeft: "1px solid rgba(0,0,0,0.3)",
                        marginLeft: "5px",
                        padding: "10px 0 10px 5px",
                        transform: "translateY(-1px)",
                      }}
                      src={
                        props.sponData.electionLogo?.data
                          ?.uploaded_img_mobile ||
                        "https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/Battle_For_The_States_Hindi_M_1644928926.svg"
                      }
                      alt={"logo"}
                    />
                  </a>
                </h2>
              ) : (
                categoryName === "business" ||
                categoryName === "मनी" ||
                (pageParam?.category === "business" && (
                  <h2
                    style={{
                      paddingLeft: "10px",
                      marginLeft: "10px",
                      borderLeft: "1px solid rgba(0,0,0,0.5)",
                    }}
                    className="money_title"
                  >
                    मनी
                  </h2>
                ))
              )}
            </div>
            {!onoff && isT20 && (
              <img
                src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/T20_Vishva_Cup_2022_m_1663586689.svg"
                alt="News18 इण्डिया-Hindi News"
                className="worldcup-img"
              ></img>
            )}
            {!onoff && isWorldCup && (
              <img
                className="worldcup-img"
                alt="WCLogoMob"
                src="/images/logos/WCLogoMob.svg"
              />
            )}
            {/* {!isWomenWorldCupPage &&
            onoff &&
            categoryName !== "business" &&
            categoryName !== "मनी" &&
            pageParam?.category !== "business" &&
            sponData &&
            sponData.sponserdata ? (
              <ElectionMobileHeadSponsor sponData={sponData.sponserdata} />
            ) : (
              ""
            )} */}
            {(!background?.mob && categoryName === "business") ||
            categoryName === "मनी" ||
            pageParam?.category === "business" ? (
              <>
                <div className="money_header">
                  <div className="money_header_right">
                    <span>Powered by</span>
                    <a
                      href="https://www.moneycontrol.com/"
                      rel="nofollow"
                      target="_blank"
                      style={{ position: "relative", zIndex: 1 }}
                      onClick={() =>
                        ga(
                          "send",
                          "event",
                          "MC_logo",
                          "Click",
                          `Article Page: ${url}`
                        )
                      }
                    >
                      <Image
                        width="125"
                        height="27"
                        src="/images/logos/mc.png"
                        alt="Moneycontrol Logo"
                        title="Moneycontrol Logo"
                        layout="responsive"
                        unoptimized={true}
                      />
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                {
                  // !click_tracker_logo &&
                  // (isWomenWorldCupPage || !onoff) &&
                  isWomenWorldCupPage || (!isT20 && !isWorldCup && !isIpl) ? (
                    <div className="mainelmt">
                      {city?.length === 0 && <a
                        className="nshct cp_local18_widget_district_select"
                        onClick={handleShowChange}
                      >
                        शहर चुनें
                      </a>}
                      {isNotificationOnScroll && <NotificationPopup isMobile={true} />}
                      {search?.length === 0 && <span
                        className="nsrch header_search_icon"
                        onClick={toggleSearch}
                      >
                        {/* SEARCH */}
                      </span>}

                      {/* <div
                    className="search_bar"
                    id="search-bar-goog"
                    dangerouslySetInnerHTML={{
                      __html: "<gcse:search></gcse:search>",
                    }}
                  ></div> */}
                      {isSignedIn ? (
                        <li className="signoutWrap">
                          <div
                            className="signedUser"
                            onClick={() => setSignout(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21.633"
                              height="21.633"
                              viewBox="0 0 21.633 21.633"
                            >
                              <path
                                id="Path_415"
                                data-name="Path 415"
                                d="M13-1.93a8.018,8.018,0,0,1-3.732-.99A7.906,7.906,0,0,1,6.5-5.434q.2-1.625,2.438-2.488A11.39,
                          11.39,0,0,1,13-8.785a11.39,11.39,0,0,1,4.063.863Q19.3-7.059,19.5-5.434A7.906,7.906,0,0,1,
                          16.732-2.92,8.018,8.018,0,0,1,13-1.93Zm0-15.387a3.1,3.1,0,0,1,2.285.914,3.132,3.132,0,0,1,.914,
                          2.311,3.132,3.132,0,0,1-.914,2.311A3.1,3.1,0,0,1,13-10.867a3.1,3.1,0,0,1-2.285-.914A3.132,3.132,
                          0,0,1,9.8-14.092a3.132,3.132,0,0,1,.914-2.311A3.1,3.1,0,0,1,13-17.316Zm0-3.25a10.751,10.751,0,0,
                          0-7.668,3.148A10.751,10.751,0,0,0,2.184-9.75,10.751,10.751,0,0,0,5.332-2.082,10.751,10.751,0,0,0,
                          13,1.066a10.751,10.751,0,0,0,7.668-3.148A10.751,10.751,0,0,0,23.816-9.75a10.7,10.7,0,0,
                          0-3.174-7.668A10.78,10.78,0,0,0,13-20.566Z"
                                transform="translate(-2.184 20.566)"
                                fill="#a7a7a7"
                              />
                            </svg>
                            <div className="signouttxt">Hi, {getUserName}</div>
                          </div>
                          {signout === true ? (
                            <div href="#" className="dropIcon">
                              <a onClick={removeSession}>Logout</a>
                              <div
                                onClick={() => setSignout(false)}
                                className="closeBtn"
                              ></div>
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : null
                }
                {/* {(isEntPage || islifePage) && _1xbetData.length !== 0 && (
                <EntertainmentLifestyleSponser _1xbetData={_1xbetData} />
              )} */}
                {((isHome && showBannerInHome) ||
                  (isTag && showBannerInTag) ||
                  (isIpl && showBannerInIPL) ||
                  showSponser) && <SponserMobile _1xbetData={_1xbetData} />}
                {/* {props?.isCricketNext && !isIpl && (
                <CricketSponser
                  click_tracker_logo={click_tracker_logo}
                  _1xbetData={_1xbetData}
                  impression_tracker_logo={impression_tracker_logo}
                  upload_image_mobile={upload_image_mobile}
                  sponser_label={sponser_label}
                />
              )} */}
              </>
            )}
          </div>
        ) : (
          <div className="worldcupHeader header">
            <div className="wchmen wc">
              <a
                title="Explore News18 हिंदी"
                href="#"
                className="hmbrgr header_hamburger"
                onClick={toggeleHandler}
              ></a>
              <a href="/" title="Link" className="lg-mbl">
                <LazyLoadImage
                  className="wc-t2-bg-1"
                  src={
                    "https://images.news18.com/static_news18/pix/ibnhome/news18/t20-logo.svg"
                  }
                  alt="vishwa Cup 2022"
                  width={75}
                  height={46}
                  isLazyLoad={false}
                />
                {/* <img
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/News18-hindi-svg.svg"
                  alt="News18 इण्डिया-Hindi News"
                  width="104"
                  height="26"
                /> */}
              </a>
              <LazyLoadImage
                className="wc-t2-bg-1"
                src={STATIC_IMAGE.VISHVA_CUP_2022}
                alt="vishwa Cup 2022"
                width={135}
                height={36}
                isLazyLoad={false}
              />
              {/* <img
                alt="News18 इण्डिया-Hindi News"
                className="worldcup-img"
                src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/T20_Vishva_Cup_2022_m_1663586689.svg"
              /> */}
            </div>
            <div className="betLogo">
              {betData_1x?.["associate-partner"]?.length > 1 ? (
                <marquee scrollamount={3}>
                  <ul style={{ display: "flex" }}>
                    {betData_1x?.["associate-partner"].map(
                      (sponserData, index) => (
                        <li key={index} style={{ marginRight: "10px" }}>
                          <div
                            className="heightZero"
                            dangerouslySetInnerHTML={{
                              __html: sponserData?.impression_tracker_logo,
                            }}
                          />
                          {/* <div
                      className="heightZero"
                      dangerouslySetInnerHTML={{
                        __html:
                          betData_1x["associate-partner"][1]
                            .impression_tracker_logo,
                      }}
                    /> */}
                          <a
                            href={sponserData?.click_tracker_logo}
                            target="_blank"
                            rel="nofollow"
                          >
                            <h3 className="heading">
                              {sponserData?.sponser_label}
                            </h3>
                            <img
                              style={{ height: "36px" }}
                              src={sponserData?.upload_image_mobile}
                              alt=""
                            />
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </marquee>
              ) : (
                <ul>
                  {betData_1x?.["associate-partner"].map(
                    (sponserData, index) => (
                      <li key={index}>
                        <div
                          className="heightZero"
                          dangerouslySetInnerHTML={{
                            __html: sponserData?.impression_tracker_logo,
                          }}
                        />
                        {/* <div
                      className="heightZero"
                      dangerouslySetInnerHTML={{
                        __html:
                          betData_1x["associate-partner"][1]
                            .impression_tracker_logo,
                      }}
                    /> */}
                        <a
                          href={sponserData?.click_tracker_logo}
                          target="_blank"
                          rel="nofollow"
                        >
                          <h3 className="heading">
                            {sponserData?.sponser_label}
                          </h3>
                          <img
                            style={{ height: "36px" }}
                            src={sponserData?.upload_image_mobile}
                            alt=""
                          />
                        </a>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        )}
        <nav>
          <div className="top_sticky">
            <Menu props={props} />
          </div>

          {/* slide menu start */}
          <div className="transparentbg"></div>
          {toggleMenu && (
            <div className={toggleMenu ? "adclsnav nav" : ""}>
              <div className="tplng">
                <a
                  title="link"
                  className="navclbtn"
                  onClick={toggeleHandler}
                ></a>
                <h3>भाषा चुनें :</h3>
                <ul>
                  <li className="act">
                    <a title="link" href="/">
                      हिंदी
                    </a>
                  </li>
                  <li>
                    <a title="link" href="#" onClick={langHandler}>
                      (12 और भाषाओं में भी)
                    </a>
                  </li>
                </ul>
                <div className="local18">
                  <a
                    href="https://hindi.news18.com/news18local/?utm_source=header&utm_medium=mobile&utm_campaign=local18_branding"
                    title="loca18 hp_local18_logo"
                  >
                    <img
                      src="/images/logos/local18Desk.png"
                      alt="loca18"
                      title="local18"
                      height="31"
                      width="85"
                      className="hp_local18_logo"
                      id="loca18 logo"
                    />
                  </a>
                </div>
              </div>

              <ul
                className={toggleLangMenu ? "lngsubn lng-scrlsbnv" : "lngsubn"}
              >
                <li>
                  <a href="https://www.news18.com/" target="_blank">
                    English
                  </a>
                </li>
                <li>
                  <a href="https://bengali.news18.com/" target="_blank">
                    বাংলা (Bengali)
                  </a>
                </li>
                <li>
                  <a href="https://news18marathi.com/" target="_blank">
                    मराठी (Marathi)
                  </a>
                </li>
                <li>
                  <a href="https://gujarati.news18.com/" target="_blank">
                    ગુજરાતી (Gujarati)
                  </a>
                </li>
                <li>
                  <a href="https://kannada.news18.com/" target="_blank">
                    ಕನ್ನಡ (Kannada)
                  </a>
                </li>
                <li>
                  <a href="https://tamil.news18.com/" target="_blank">
                    தமிழ் (Tamil)
                  </a>
                </li>
                <li>
                  <a href="https://malayalam.news18.com/" target="_blank">
                    മലയാളം (Malayalam)
                  </a>
                </li>
                <li>
                  <a href="https://telugu.news18.com/" target="_blank">
                    తెలుగు (Telugu)
                  </a>
                </li>
                <li>
                  <a href="https://punjab.news18.com/" target="_blank">
                    ਪੰਜਾਬੀ (Punjabi)
                  </a>
                </li>
                <li>
                  <a href="https://urdu.news18.com/" target="_blank">
                    اردو (Urdu)
                  </a>
                </li>
                <li>
                  <a href="https://assam.news18.com/" target="_blank">
                    অসমীয়া (Assamese)
                  </a>
                </li>
                <li>
                  <a href="https://odia.news18.com/" target="_blank">
                    ଓଡ଼ିଆ (Odia)
                  </a>
                </li>
                <li className="lnglastlist">
                  <a title="link" href=""></a>
                </li>{" "}
                <li className="lnglastchildlink">
                  <a title="link" href="#" onClick={langHandler}>
                    वापस जाएं
                  </a>
                </li>
              </ul>

              <ul
                className={toggleMenu ? "navg adclsnavg" : "navg"}
                id="menu-news18-india-top-menu"
              >
                <li className="notifyme" style={{ display: "none" }}>
                  <a title="Link" href="/notifications/" className="">
                    <span className="icon-navnotification">
                      <object
                        data="https://images.news18.com/ibnkhabar/uploads/assests/img/icon-notification.svg"
                        type="image/svg+xml"
                      ></object>
                    </span>
                    {englishVariables["NOTIFICATION"]}
                  </a>
                  <span className="subscribe-btn">Subscribed</span>
                </li>

                {menuArray.map((menuD, key) => (
                  <Fragment key={`state_${key}`}>
                    {key === 2 && (
                      <li key="state" className="icon-chsstct">
                        <a
                          href="#"
                          onClick={handleShowChange}
                          className="header_hamburger_l1"
                        >
                          अपना शहर चुनें
                        </a>
                      </li>
                    )}
                    <li
                      key={key}
                      rel={menuD?.label + key}
                      className={menuD["children"]?.length ? "has-submenu" : ""}
                    >
                      {menuD["children"]?.length > 0 ? (
                        <a
                          onClick={subMenuHandler}
                          rel={menuD?.label + key}
                          className="header_hamburger_l1"
                        >
                          {/* <span
                      // style={{
                      //   background: `url(${menuD.imgurl}) 15px 50% no-repeat`,
                      //   backgroundSize: "22px",
                      // }}
                      ></span> */}
                          {menuD.label}
                          {menuD?.highlight_new === "1" ? <NewIcon /> : ""}
                        </a>
                      ) : (
                        <a href={menuD.url} className="header_hamburger_l1">
                          {/* <span
                      // style={{
                      //   background: `url(${menuD.imgurl}) 15px 50% no-repeat`,
                      //   backgroundSize: "22px",
                      // }}
                      ></span> */}
                          {menuD.label}
                          {menuD?.highlight_new === "1" ? <NewIcon /> : ""}
                        </a>
                      )}
                      {menuD["children"]?.length !== 0 && (
                        <em
                          className="menbtn"
                          rel={menuD?.label + key}
                          data-slug={menuD?.label || ""}
                          onClick={subMenuHandler}
                        ></em>
                      )}
                    </li>
                  </Fragment>
                ))}

                {menuArray.map(
                  (menuD, key) =>
                    menuD["children"]?.length !== 0 && (
                      <ul
                        key={"sub" + key}
                        className="sub-navg"
                        id={menuD?.label + key}
                      >
                        {menuD["children"]?.length
                          ? menuD["children"].map((submenuD, submenuKey) => {
                              if (submenuD.label !== "वापस जाएं") {
                                return (
                                  <li
                                    key={submenuKey}
                                    rel={submenuD.label + submenuKey}
                                  >
                                    <a
                                      href={submenuD.url}
                                      className="header_hamburger_l1"
                                    >
                                      {submenuD.label}
                                    </a>
                                  </li>
                                );
                              } else {
                                return (
                                  <li
                                    key={submenuKey}
                                    rel={submenuD.label + submenuKey}
                                    onClick={closeSubMenu}
                                  >
                                    <a className="header_hamburger_l1">
                                      {submenuD.label}
                                    </a>
                                  </li>
                                );
                              }
                            })
                          : ""}
                      </ul>
                    )
                )}
              </ul>
            </div>
          )}
          <SelectState
            showStates={showStates}
            handleShowChange={handleShowChange}
            districtList={districtList}
            filteredItems={filteredItems}
            state={state}
            setState={setState}
          />
        </nav>
        {/* <BudgetHighlightAcrossSiteResponsiveWidget
          isShowSponser={highlights_sponser_across_flag === "1"}
          showAcrossWidget={
            (highlights_across_flag === "1" && !isHomeOnly) ||
            (isHomeOnly && highlights_microsite_flag === "1")
          }
        /> */}
        {/* <Election2022AcrossWidget electionData={props?.electionData || {}}  isHome={props?.isHome || false} isMobile={true} /> */}
        {/* {countingTallyData &&
        <Card
          mode = "mobile"
          content={countingTallyData}
          type="slider"
          config = {{
            customTableClass: 'counting_tally',
          }}
          adConfig={{
            unit: "/1039154/NW18_HIND_PWA/NW18_HIND_ELECTION_PWA/NW18_HIND_Election_COUNTINGDAY_PWA/NW18_HIND_ELECT_PWA_SPONSOR_TOP_STRIP_360x50",
            sizes: [[360, 50]]
          }}
          pollConfig={{
            dataLoader: fetchCountingTallyData,
            loaderParams: {
              env: "prod",
            lang: 'hindi',
            key: 'counting_poll',
            type: 'home',
            slider: true,
          }}}
        />
      } */}
        {/* {switches.score && (
        <>
          <div className="clearfix  scr-strp">
            <div className="hgt_m"></div>
          </div>
        </>
      )} */}
        {/* {showAcrossSiteBudgetWidget && (
        <BudgetHighlightAcrossSiteResponsiveWidget
          device={"mobile"}
          pageAds={pageAds}
          isBudgetPage={isBudgetPage}
        />
      )} */}
        {/* {counting_tally_microsite_flag === "1" && (
          <ASCountingDay instance={"result"} lang={"hi"} mode={"prod"} />
        )}
        {showCountingPoll && (
          <LSCountingDay instance={"lsresult"} lang={"hi"} mode={"prod"} />
        )}
        {showExitPoll && (
          <LSAcross instance={"exit"} lang={"hi"} mode={"prod"} />
        )}
        {((counting_tally_sponser_home_flag === "1" && isHome) ||
          (counting_tally_sponser_across_flag === "1" && !isHome)) && (
          <div style={{ minHeight: 60 }}>
            <NewSiteAd
              slotId={"Mobile_Header_Election_ad_unit"}
              adUnit={
                "NW18_HIND_PWA/NW18_HIND_HOME_EVENT_PWA/NW18_HIND_HOME_HOME_EVENT_PWA/NW18_HIND_EVNT_PWA_HP_ROS_EVENT_TOP_320X60"
              }
              sizes={[
                [340, 50],
                [320, 60],
              ]}
              width={340}
              height={60}
              lazyLoad={true}
              style={{ display: "flex", justifyContent: "center" }}
            />
          </div>
        )} */}
        {/* slide menu end */}
      </header>
      {fireOps &&
        !isArticle &&
        typeof pageAds !== "undefined" &&
        typeof pageAds.PG_1x1 !== "undefined" &&
        pageType === "category" && (
          <NewSiteAd
            slotId="PG_1x1"
            adUnit={props.pageAds.PG_1x1}
            sizes={[[1, 1]]}
            loadOnScroll={true}
            removeAdSpan={true}
          ></NewSiteAd>
        )}
      {electionWidgetData?.delhi?.mcd?.switcher?.Hindi_OnOff === 1 && (
        <div id="bengalMobileWidget">
          <div className="hyd_mobile_widget" style={{ minHeight: "190px" }}>
            <div className="wrap">
              <div className="hyd_top_strip">
                <div
                  style={{ cursor: "pointer" }}
                  className="hyd_logo urlRediect"
                >
                  <span>
                    <img
                      src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/building_mobile_1669703525.svg"
                      alt="Delhi logo"
                      title="Delhi logo"
                    />
                  </span>
                  <span style={{ marginLeft: "35px" }}>
                    <img
                      src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/textlogo_1669703602.svg"
                      alt="charminar"
                      title="charminar"
                    />
                  </span>
                </div>
                <ul
                  style={{ cursor: "pointer" }}
                  className="result_list"
                  id="result_list"
                >
                  <li
                    className="skelanimation"
                    style={{
                      background: "#dadada",
                      height: "66px",
                      borderRadius: "6px",
                    }}
                  ></li>
                  <li
                    className="skelanimation"
                    style={{
                      background: "#dadada",
                      height: "66px",
                      borderRadius: "6px",
                    }}
                  ></li>
                  <li
                    className="skelanimation"
                    style={{
                      background: "#dadada",
                      height: "66px",
                      borderRadius: "6px",
                    }}
                  ></li>
                  <li
                    className="skelanimation"
                    style={{
                      background: "#dadada",
                      height: "66px",
                      borderRadius: "6px",
                    }}
                  ></li>
                  <li
                    className="skelanimation"
                    style={{
                      background: "#dadada",
                      height: "66px",
                      borderRadius: "6px",
                    }}
                  ></li>
                  <li
                    className="skelanimation"
                    style={{
                      background: "#dadada",
                      height: "66px",
                      borderRadius: "6px",
                    }}
                  ></li>
                </ul>
                <div className="skelanimation details_box_top"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showtopHeaderBanner && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <LazyLoadImage
            style={{ margin: "auto" }}
            src="https://images.news18.com/ibnkhabar/uploads/2024/03/360-x-60-gif-2024-03-89741ddb8549046bb8a55ab48aa0a41c.gif"
            width="360"
            height="60"
          />
        </div>
      )}
      {searchBar && (
        <Search
          pageType={pageType}
          isMobile={true}
          handleClose={() => setSearchBar(false)}
        />
      )}
      <style jsx global>{`
        .local18 img {
          position: relative;
        }
        h1.article_heading1 {
          font-size: 26px;
          line-height: 32px;
          color: #001d42;
          font-weight: bold;
          padding: 10px 0px 0px;
          min-height: 111px;
        }
        .short_desc h3 {
          color: #404040;
          font-size: 15px !important;
          line-height: 24px !important;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: bold;
          text-align: left;
          padding-right: 8px;
          min-height: 70px;
        }
        .artcl_byline_sec .artcl_byeline li {
          min-height: 27px;
        }
        // @font-face {
        //   font-family: "Mukta";
        //   font-style: normal;
        //   font-weight: 400;
        //   font-display: swap;
        //   src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
        //     format("woff2");
        // }
        // body {
        //   margin: auto;
        //   background: #fff;
        //   font-family: "Mukta", sans-serif;
        // }
        // * {
        //   margin: 0;
        //   padding: 0;
        //   list-style: none;
        //   text-decoration: none;
        //   border: none;
        //   box-sizing: border-box;
        // }
        // .clearfix {
        //   clear: both;
        // }
        .clearfix::after,
        .clearfix::before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0px;
        }
        // figure {
        //   position: relative;
        //   line-height: 0;
        //   overflow: hidden;
        // }
        // button {
        //   cursor: pointer;
        //   font-size: 0;
        //   border: 0;
        //   outline: none;
        // }
        #credential_picker_iframe {
          z-index: 999999 !important;
        }
        .hyd_top_bg * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          outline: 0;
          border: 0;
        }
        .hyd_top_bg {
          // background: url("https://images.news18.com/ibnlive/uploads/2020/11/1606463824_top_bg.png");
          background-position: top;
          background-repeat: no-repeat;
          min-height: 272px;
          position: relative;
          clear: both;
          margin-top: 10px;
          background-size: cover;
        }
        .hyd_top_bg:after {
          content: "";
          height: 3px;
          bottom: 0;
          left: 0;
          right: 0;
          background: #dbdbdb;
          position: absolute;
        }
        .hyd_top_bg .wrap {
          max-width: 100%;
          margin: 0 auto;
          position: relative;
        }
        @keyframes loading {
          100% {
            background-position: 100% 0;
          }
        }
        .hyd_top_strip .hyd_logo {
          position: relative;
          display: flex;
        }
        .result_list {
          display: flex;
          overflow: hidden;
        }
        .skelanimation {
          position: relative;
        }
        .skelanimation:after {
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          left: 0;
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
            100deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0) 80%
          );
          background-size: 110px 100%;
          background-position: -100px 0;
          background-repeat: no-repeat;
          animation: loading 1s infinite;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .hyd_mobile_widget {
          background-color: #ececec;
          position: relative;
          padding: 5px 10px 5px;
          border-bottom: 3px #dbdbdb solid;
        }
        .globalhd {
          margin-top: 20px;
        }
        .melwgt .melwgthd h2 {
          max-width: 200px;
        }
        .header {
          height: ${onoff ? "auto" : isIpl ? "60px" : "54px"};
          padding: ${onoff ? " 5px 5px 5px 15px" : " 0 15px!important"};
          display: flex !important;
          justify-content: space-between;
          align-content: center;
          border-top: 2px solid #ec2027;
          height: 54px;
          padding: 0 15px;
          background: #fff;
        }
        .header .mainelmt {
          display: flex;
          align-items: center;
        }

        .header .mainelmt a {
          font-size: 13px;
          color: #727272;
          font-weight: bold;
        }

        .hmbrgr {
          width: 18px;
          height: 14px;
          position: relative;
          background: url(/images/siteimages/news18-hn-sprite-icons.svg);
          background-position: -80px -455px;
          display: block;
          margin-right: 15px;
        }
        .nwlg {
          width: 112px;
          height: 30px;
          line-height: 0;
          align-self: center;
          background: url(/images/siteimages/news18-hn-sprite-icons.svg);
          background-position: -14px -488px;
        }
        .nshct {
          color: #c6080f;
          background-image: url(/images/siteimages/news18-hn-sprite-icons.svg);
          background-position: -16px -317px;
          height: auto;
          padding-top: 20px;
          font-size: 9px;
          margin: auto 0;
        }
        .nsrch {
          background-image: url(/images/siteimages/news18-hn-sprite-icons.svg);
          background-position: -21px -422px;
          padding-top: 20px;
          font-size: 9px;
          width: 18px;
          margin: auto 0;
        }

        .wchmen {
          float: left;
        }
        .wchmen.wc {
          display: flex;
          align-items: center;
        }
        .worldcupHeader {
          background: url(/images/siteimages/m-wordcup_headerbg.png) no-repeat
            top center;
          -webkit-background-size: 100%;
          -moz-background-size: 100%;
          -o-background-size: 100%;
          background-size: 100%;
          height: 62px;
        }
        .worldcupHeader .worldcup-img {
          margin-left: -10px;
          width: 100px;
        }
        .worldcupHeader .hmbrgr {
          filter: brightness(0) invert(1);
          background-position: -212px -422px;
        }
        .worldcupHeader .lg-mbl {
          width: 109px;
          float: left;
          margin-top: 8px;
        }
        .worldcupHeader .wc .lg-mbl {
          width: auto;
        }
        {/* .worldcupHeader .betLogo {
          width: 85px;
        } */}
        .iplHeader {
          background: url(https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/IPL-2020-mobile-bg.png)
            no-repeat top center;
          -webkit-background-size: 100%;
        }
        .app_icon_span {
          display: block;
          font-size: 11px;
          display: block;
          text-align: center;
          color: #fff;
          font-weight: bold;
          margin-bottom: 2px;
        }
        .app_icon_img {
          width: 25px;
        }
        .mobile_nav_icon {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
        }
        .nav_icon {
          content: "";
          height: 2px;
          position: relative;
          left: 0px;
          top: 2px;
          width: 22px;
          display: block;
          background: #000;
          margin: auto;
        }
        .logo {
          margin-left: 15px;
          line-height: 0;
        }
        .transparentbg,
        .nav {
          position: fixed;
          top: 0;
          bottom: 0;
        }
        .transparentbg {
          right: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: -1;
          opacity: 0;
          transition: all 0.2s ease-in-out;
        }
        .transparentbg.adclstrnsbg {
          opacity: 1;
          transition: all 0.2s ease-in-out;
          z-index: 4;
        }
        .nav {
          background: #f5f5f5;
          width: 88%;
          right: -101%;
          z-index: 99999;
        }
        .navg,
        .navg.adclsnavg,
        .sub-navg,
        .nav,
        nav.adclsnav {
          transition: all 0.3s ease-in-out;
        }
        .tplng {
          height: 98px;
          box-sizing: border-box;
          padding: 16px;
          position: relative;
          border-bottom: 1px solid #9b9b9b;
          background-size: 149px;
        }
        .navclbtn {
          width: 14%;
          height: 45px;
          position: absolute;
          left: -14%;
          top: 0;
          background: #ed1c24;
        }
        .navclbtn:after,
        .navclbtn:before {
          content: "";
          width: 3px;
          height: 22px;
          left: 50%;
          background: #fff;
          display: block;
          position: absolute;
          margin-left: -2px;
          top: 11px;
          transform: rotate(135deg);
        }
        .navclbtn:before {
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
        }
        .tplng h3 {
          font-size: 10px;
          color: #000;
          margin-top: 2px;
        }
        .pgtbox ul li,
        li,
        ul {
          list-style: none;
        }
        .tplng li,
        .tplng li a {
          color: #7e8186;
        }
        .tplng li {
          font-size: 12px;
          margin-right: 20px;
          float: left;
        }
        .tplng li.act {
          display: block;
          width: 100%;
          font-size: 18px;
          margin-top: 4px;
        }
        .tplng li.act a {
          color: #ed1c24;
          font-weight: 700;
        }

        .lngsubn,
        .lngsubn .lnglastchildlink {
          position: fixed;
          left: -100%;
          transition: all 0.3s ease-in-out;
          bottom: -1px;
        }
        .lngsubn {
          background: #f5f5f5;
          width: 88%;
          top: 98px;
          padding-left: 56px;
          box-sizing: border-box;
          overflow: scroll;
          z-index: 9999;
          height: 100%;
        }
        .lngsubn li {
          width: 100%;
          float: left;
          height: 48px;
          line-height: 48px;
          padding: 0 12px;
          font-size: 14px;
          box-sizing: border-box;
          border-bottom: 1px solid #dfdfdf;
        }
        .lngsubn li a {
          color: #000;
          font-weight: 400 !important;
          text-decoration: none;
        }
        .navg {
          display: block !important;
          position: fixed;
          top: 98px;
          width: 88%;
          bottom: 0;
          right: -100%;
          overflow: scroll;
        }
        .navg.adclsnavg {
          right: 0;
        }
        .navg li,
        .navg li a span {
          position: relative;
          background: #f5f5f5;
          float: left;
          box-sizing: border-box;
        }

        .navg li:first-child {
          border: none;
        }
        .navg li a {
          color: #000;
          display: block;
          padding: 0 16px;
        }
        .navg li:nth-child(2) a {
          font-weight: bold;
        }
        .navg li a svg {
          position: absolute;
          top: 7px;
        }
        .sub-navg li:nth-child(2) a {
          font-weight: 400;
        }
        .nav.adclsnav {
          right: 0;
        }
        /* .navigation li a span.icon-coronavirus {
          background: #f5f5f5
            url(https://images.news18.com/ibnkhabar/uploads/assets/event/coronavirus/images/corona1_1585050116.png)
            no-repeat 50% 20px;
          background-size: 26px;
          top: -9px;
        } */
        .navg li a span:before {
          margin: auto;
        }
        [class*=" icon-"],
        [class^="icon-"] {
          speak: none;
          font-style: normal;
          font-weight: 400;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-display: optional;
        }

        .icon-livetv:after {
          content: "";
          border-top: 3px solid transparent;
          border-bottom: 3px solid transparent;
          border-left: 4px solid #b5b5b5;
          display: block;
          font-size: 0;
          width: 0;
          height: 0;
          margin: auto;
          position: relative;
          left: 0;
          top: -12px;
        }

        .bgclr-feature {
          background: #a95600;
        }

        .bgclr-feature .glblbghd .hd {
          border-color: #c56f16;
        }

        .bgclr-panchmisheli {
          background: #1693a5;
        }

        .bgclr-panchmisheli .glblbghd .hd {
          border-color: #2badc0;
        }
        .navg li.active a span.icon-featured {
          background: url(https://static.bengali.news18.com/static-bengali/2018/09/feature_red.png)
            21px 14px no-repeat #f5f5f5;
          background-size: 27px;
          top: -1px;
        }
        .menbtn {
          top: 0;
          margin-top: 8px;
          position: absolute;
          right: 16px;
          width: 25px;
          height: 25px;
        }

        .menbtn:before {
          content: "";
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 8px solid #ababab;
          position: absolute;
          top: 7px;
          left: 10px;
          display: block;
        }
        .tplng li:last-child:after {
          content: "";
          width: 5px;
          height: 5px;
          border-top: 2px solid #ed1c24;
          border-left: 2px solid #ed1c24;
          display: inline-block;
          transform: rotate(-135deg);
          position: relative;
          top: -2px;
          left: 6px;
        }
        .lng-scrlsbnv,
        .lngsubn .lnglastchildlink.lng-scrlsbnv-lstchld {
          left: 0;
          transition: all 0.5s ease-in-out;
        }
        .sub-navg {
          position: fixed;
          background: #f5f5f5;
          width: 88%;
          top: 143px;
          right: -100%;
          padding-left: 56px;
          box-sizing: border-box;
          bottom: 0;
          overflow: scroll;
          z-index: 9999;
          // height: 100%;
          // display: none;
        }
        .sub-navg.scrlsbnv {
          right: 0;
          // display: block;
          transition: all 0.5s ease-in-out;
        }
        .navg a {
          text-decoration: none;
        }

        .tplng a {
          text-decoration: none;
        }
        .st0 {
          fill: none;
          stroke: #ffffff;
          strokemiterlimit: 10;
        }
        .st1 {
          fillrule: evenodd;
          cliprule: evenodd;
          fill: #001636;
        }
        .st2 {
          fillrule: evenodd;
          cliprule: evenodd;
          fill: #ffffff;
        }
        .st3 {
          fillrule: evenodd;
          cliprule: evenodd;
          fill: #fefefe;
        }
        .st4 {
          fillrule: evenodd;
          cliprule: evenodd;
          fill: #ee1c25;
        }
        .st5 {
          fill: #3d3d3d;
        }
        .money_header span {
          display: block;
          font-size: 10px;
          color: #8a8989;
          padding-bottom: 4px;
        }
        .money_header_right {
          width: 94px;
        }
        .money_header:after {
          width: 94px;
          display: flex;
          align-items: center;
          /* background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/moneycontrol_bg_icon_1591714054.png); */
          padding-right: 18px;
          background-position: right;
          background-size: contain;
          content: "";
          right: 3px;
          height: 63px;
          position: absolute;
          background-repeat: no-repeat;
          top: -8px;
        }
        .money_header_title {
          color: #424242;
          font-size: 14px;
          /* line-height: 27px; */
          font-weight: 700;
          padding-left: 8px;
          border-left: 1px solid rgba(63, 63, 63, 0.54);
          position: absolute;
          left: 127px;
          top: -10px;
          padding-top: 5px;
        }
        .money_header img {
          width: 100px;
        }
        .chs-stct {
          color: #c6080f;
          font-weight: bold;
          font-size: 12px;
          line-height: 16px;
          height: 48px;
        }

        .chs-stct .st0 {
          fill: #e1261d;
        }
        .search_icon {
          position: relative;
          height: 48px;
          font-size: 12px;
          margin: 0px 0px 0px 10px;
        }
        .search_icon a {
          font-size: 12px;
          display: block;
        }
        .hdrrgt {
          display: flex;
          align-items: center;
          margin-top: 10px;
        }
        .fr {
          float: right;
        }

        .search_icon a {
          text-decoration: none;
          line-height: 17px;
          font-size: 10px;
          font-weight: 700;
          color: #727272;
        }

        li {
          list-style: none;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .navg li a span {
          color: #ababab;
          width: 46px;
          font-size: 22px;
          text-align: center;
          filter: grayscale(1);
          display: block;
          height: 48px;
          top: -2px;
          padding: 14px 16px;
        }
        .tplncnt {
          height: 38px;
          display: ${
            props?.dtype === "cricket-home-page" ? "block" : "-webkit-box"
          };
          border-top: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
          background: #f7f7f7;
          padding: 0 !important;
          overflow-x: ${props?.dtype === "cricket-home-page" ? "" : "overlay"};
        }
        .top_sticky {
          height: 38px;
          position: sticky;
          top: 0;
          z-index: 99;
          overflow: ${props.isCricketNext ? "initial" : ""};
        }

        .tplnchld {
          padding: 0 10px 0;
          height: 34px;
          color: #606060;
          font-size: 15px;
          line-height: 34px;
          text-align: center;
          -webkit-flex: none;
          -ms-flex: none;
          flex: none;
          -webkit-text-decoration: none;
          text-transform: uppercase;
          font-weight: 400;
          position: relative;
          margin-right: 5px;
        }
        .tplnchld svg {
          position: absolute;
          right: -7px;
        }

        .navg .icon-chsstct a {
          color: #c6080f !important;
        }
        .icon-chsstct span {
          background: url(/images/siteimages/pinicon_1607493634.png) 15px 50%
            no-repeat !important;
          font-size: 16px !important;
          font-weight: bold;
          filter: initial !important;
          transform: translateY(2px);
        }
        li:first-child a.tplnchld {
          position: relative;
          left: 0;
          border-right: solid 1px #e8e8e8;
          background: #fff;
          z-index: 1;
          width: 40px;
          display: block;
        }
        li:first-child a.tplnchld:after {
          content: "";
          background: ${props.isCricketNext ? "#e1261c" : ""};
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          bottom: 0;
        }
        .lngsubn .lnglastchildlink {
          left: ${toggleLangMenu ? "0" : "none"};
          background: #171717;
          width: 88%;
          height: 50px;
          z-index: 99;
          line-height: 1;
          -webkit-flex-flow: row-reverse;
          -ms-flex-flow: row-reverse;
          flex-flow: row-reverse;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
        }
        .lngsubn li.lnglastlist {
          margin-bottom: 96px;
        }
        .lngsubn .lnglastchildlink a {
          color: #fff;
          font-size: 14px;
          display: inline-block;
          margin-right: 16px;
          position: relative;
        }
        .lngsubn .lnglastchildlink a:before {
          width: 8px;
          content: "";
          height: 8px;
          border-left: 2px solid #fff;
          border-top: 2px solid #fff;
          -webkit-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          transform: rotate(-45deg);
          position: absolute;
          left: -15px;
        }
        .game_icon {
          position: relative;
          text-align: center;
          margin: 5px 16px 4px 8px;
          line-height: 16px;
        }
        .game_icon span {
          font-size: 9px;
          display: block;
          text-align: center;
          color: #000;
          font-weight: normal;
        }
        ${
          imageM &&
          imageM.mobile_header_colorcode &&
          imageM.mobile_header_colorcode !== ""
            ? `#header{background-color: ${imageM.mobile_header_colorcode};}`
            : ""
        }

        .outer-spnsrd-slider {
          ${background?.mob ? background.mob : ""}
          background-size: cover;
        }
        a.nav_icon,
        a.nav_icon:after,
        a.nav_icon:before {
          ${background?.mobBurger ? background.mobBurger : ""}
        }

        .betLogo {
          width: 105px;
          display: flex;
          font-size: 14px;
          justify-content: flex-end;
        }

        .betLogo .heading {
          text-align: center;
          font-size: 8px;
          line-height: 10px;
          color: ${isWorldCup || isT20 ? "#fff" : "#000"};
          font-weight: normal;
        }

        .heightZero {
          height: 0px;
        }

        // banner css
        .sponsors_Wrp {
          align-items: flex-end;
          display: flex;
          width: auto;
          justify-content: flex-end;
          margin-top: 5px;
        }
        .associat_partner .heading {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 7px;
          color: ${isIpl ? "white" : "black"};
          font-weight: normal;
          margin: 0 0 2px 0;
          text-transform: uppercase;
        }
        .associat_partner .heading span {
          flex-shrink: 0;
        }
        .glide_slide .track {
          overflow: hidden;
        }
        .glide_slide .slides {
          display: flex;
          color: white;
          padding: 0;
          margin: 0;
        }
        .associat_partner1 {
          max-width: ${isT20 ? "100%" : "80px"};
          width: ${isT20 ? "100%" : ""};
        }
        .associat_partner1.associat_partner {
          margin-left: 0;
        }

        #bannerBox {
          width: 80px;
          height: 40px;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 5px;
        }
        #bannerBox img {
          max-width: 100%;
        }
        a.nav_icon,
        a.nav_icon:after,
        a.nav_icon:before {
          content: "";
          background: #000;
          height: 2px;
          position: relative;
          left: 0;
          width: 22px;
          display: block;
          margin: auto;
        }
        .jstbtwn {
          justify-content: space-between !important;
        }
        .algncntr {
          align-items: center;
        }
        .dflex {
          display: flex;
        }
        .spnsrd-slider {
          width: 105px;
          height: 55px;
        }
        .spnsrd-slider .glide__track {
          overflow: hidden;
        }
        .spnsrd-slider ul {
          display: flex;
          overflow: hidden;
          align-items: center;
        }
        .spnsrd-slider ul li span {
          color: #fff;
          font-size: 12px;
          display: block;
          text-align: center;
        }
        .signoutWrap {
          display: flex;
          width: 69px;
          height: 48px;
          margin-left: 7px;
          justify-content: center;
          line-height: 12px;
          position: relative;
        }
        .signoutWrap .signedUser svg {
          margin: 0px auto 2px;
          display: table;
          height: 20px;
          width: 17px;
        }
        .signoutWrap .signedUser .signouttxt {
          max-width: 69px;
          font-size: 9px;
          font-weight: 700;
          line-height: 17px;
          color: #727272;
          text-transform: uppercase;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 10px;
        }
        .signoutWrap .dropIcon {
          position: absolute;
          top: 100%;
          z-index: 9999;
          width: 120px;
          border: 1px solid #d7d7d7;
          border-radius: 0 0 6px 6px;
          background: #ededed;
          right: 0;
          margin-top: -2px;
          box-shadow: 0px 3px 6px #00000029;
        }
        .signoutWrap .dropIcon a {
          font-size: 13px;
          text-transform: uppercase;
          color: #ed2128;
          font-weight: bold;
          display: block;
          padding: 10px;
          height: auto !important;
        }
        .signoutWrap .dropIcon .closeBtn {
          width: 9.3px;
          height: 9.3px;
          position: absolute;
          right: 10px;
          transform: translateY(-50%);
          top: 50%;
        }
        .signoutWrap .dropIcon .closeBtn::before,
        .signoutWrap .dropIcon .closeBtn::after {
          content: "";
          width: 1px;
          height: 8px;
          background: #0a2040;
          display: block;
          position: absolute;
          left: 4px;
        }
        .signoutWrap .dropIcon .closeBtn::before {
          transform: rotate(134deg);
        }
        .signoutWrap .dropIcon .closeBtn::after {
          transform: rotate(-134deg);
        }
        .worldcupHeader .betLogo a {
          height: 50px !important;
          display: block;
        }
        .worldcupHeader .betLogo .heading {
          line-height: 12px !important;
        }
        .joinUs_Wasp {
          display: flex;
          align-items: center;
          width: 83px;
          height: 35px;
          border: #c8c8c8 solid 1px;
          background-color: #f3f3f3;
          border-radius: 30px;
          padding: 5px 7px;
          margin: auto 0;
          justify-content: center;
        }
        .joinUs_Wasp span {
          margin: 4px 6px 0 0;
          font-size: 11px;
          color: #373737;
          line-height: 18px;
          text-transform: uppercase;
          font-weight: bold;
        }
        .local18 {
          position: absolute;
          right: 7px;
          bottom: 0px;
          display: block;
        }
        .local18 a {
          display: block;
        }
        @media screen and (max-width: 359px) {
          .joinUs_Wasp {
            display: none;
          }
        }
        @media screen and (max-width: 767px) {
          header,
          nav {
            display: initial;
          }
        }
        .navg li {
          width: 100%;
          border-top: 1px solid #dfdfdf;
          line-height: 48px;
          padding: 0 16px 0 0;
          font-size: 16px;
          position: relative;
        }
        @keyframes anim {
          0% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg);
          }

          25% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg);
          }

          30% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg);
          }

          70% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg);
          }

          75% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg);
          }

          100% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg);
          }
        }

        @keyframes anim2 {
          0% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg);
          }

          20% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg);
          }

          25% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg);
          }

          75% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg);
          }

          80% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg);
          }

          100% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg);
          }
        }

        /* The element to apply the animation to */
        .flipHm img {
          position: absolute;
          animation: anim 8s infinite linear;
          top: 0;
          left: 0;
          right: 0;
        }
        .flipHm .img2 {
          position: absolute;
          animation: anim2 8s infinite linear;
        }
        .header .mainelmt a.lg-mbl {
          position: relative;
        }
        .header .mainelmt a.lg-mbl .lg_ani {
          display: block;
          width: 104px;
          height: 26px;
        }
      `}</style>
    </>
  );
};
export default HeaderMobile;
