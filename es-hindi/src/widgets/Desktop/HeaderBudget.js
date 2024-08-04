import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import "lazysizes";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { useRouter } from "next/router";
import englishVariables from "includes/lang.helper.js";
import HeadSponsor from "components/Common/HeadSponsor";
import DynaMenu from "./DynaMenu";
import Glide from "@glidejs/glide";
import dynamic from "next/dynamic";
import { googleOneTapJs, getCookie, checkUserExists, delete_cookie } from "includes/GoogleOneTap.util";
import fetchUtility from "includes/sFetchUtility";

const DynamicMenuWithNoSSR = dynamic(() => import("./Menu"), { ssr: false });
const Header = ({
  pageAds,
  catName,
  categoryName = "",
  menuData = {},
  // imageM,
  // trendingTags,
  isHome,
  isTag,
  switches,
  isCategory,
  isCricketNext,
  current,
  isIpl,
  crMenu,
  isT20,
  isWorldCup,
  config,
  pageType,
  sponData,
  // background = {},
  onoff,
  VideoPage,
  pageParam,
  isWomenWorldCupPage,
  // electionData,
  // dataPage,
  dynaMenu,
  isArticle,
  electionWidgetData,
  _1xbetData,
  // districtList
}) => {
  const backgroundImg = _1xbetData.desktop_creative ? _1xbetData.desktop_creative : 'https://images.news18.com/ibnkhabar/uploads/2023/01/News18_Hindi_Budget_2023_header_bg_D.jpg';
  _1xbetData = _1xbetData?.sponserdata || [];
  const {
    sponser_label,
    click_tracker_logo,
    uploaded_img_path,
    impression_tracker_logo,
  } = _1xbetData?.["associate-partner"]?.[0] || {};

  const [buttonHovered, setButtonHovered] = useState(false);
  // const [stickyMenu, setStickyMenu] = useState("");
  const url = `${publicRuntimeConfig.siteUrl}${useRouter().asPath.replace(
    "/",
    ""
  )}`;

  const [getUserName, setUserName] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [checkOneTap, setCheckOneTap] = useState(1);
  const [apiMenuData, setApiMenuData] = useState([]);
    useEffect(() => {
    if (getCookie("g_token") === null) {
      if (checkOneTap == 1) {
        setTimeout(googleOneTapJs, 2000);
        setCheckOneTap(2);
      }
    }
    else {
      if (getCookie("isSignedIn") === null) {

        checkUserExists(getCookie("g_token"));
      }
      else {
        setUserName(getCookie("g_username"));
        setIsSignedIn(true);
      }

    }

  }, []);

  const processImpression = (item) => {
    try {
      const script = document.createElement("script");
      const showscript = document.createElement("script");
      const div = document.createElement("div");
      script.defer = true;

      const data = (/googletag.defineSlot\('(.*?),(.*?]),(.*?)\)/gim).exec(
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
    } catch {
      //
    }
  };

  useEffect(() => {
    if (electionWidgetData?.delhi?.mcd?.switcher?.Hindi_OnOff == 1) {
      const widgetScriptt = document.createElement("script");
      widgetScriptt.src =
        "https://images.news18.com/ibnkhabar/uploads/assets/event/common/js/Delhi_MuncipleElection2022WidgetDesktop_1669808497.js?v=1";
      document.head.appendChild(widgetScriptt);
    }
  }, [electionWidgetData]);

  useEffect(() => {
    if (isArticle || pageType == "photogallery") {
      fetchUtility(`${publicRuntimeConfig.nodeApiAjaxUrl}/menu`, [])
        .then((dataFromAPI) => {
          setApiMenuData(dataFromAPI);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const associateLength = _1xbetData?.["associate-partner"]?.length;

  useEffect(() => {
    const func = () => {
      // let activeClass = "adclhdr";
      // if (window.scrollY === 0) {
      //   activeClass = "";
      // }
      // setStickyMenu(activeClass);
    };

    if (document.querySelector(".aso_one")) {
      new Glide(document.querySelector(".aso_one"), {
        type: `${_1xbetData?.["co-presenting"]?.length > 1 ? "carousel" : ""}`,
        autoplay: 2000,
        animationDuration: 1000,
        perView: 1,
        gap: 0,
      })?.mount();
    }

    if (document.querySelector(".aso_second")) {
      new Glide(document.querySelector(".aso_second"), {
        type: `${_1xbetData?.["presented-by"]?.length > 1 ? "carousel" : ""}`,
        autoplay: 2000,
        animationDuration: 1000,
        perView: 1,
        gap: 0,
      })?.mount();
    }

    if (document.querySelector(".aso_third")) {
      new Glide(".aso_third", {
        type: `${associateLength > 1 ? "carousel" : ""}`,
        autoplay: 2000,
        animationDuration: 1000,
        perView: `${associateLength === 1 ? 1 : (associateLength === 2 ? 2 : 3)}`,
        gap: `${associateLength === 1 ? 0 : 5}`,
      })?.mount();
    }

    if (document.querySelector(".aso_four")) {
      new Glide(document.querySelector(".aso_four"), {
        type: `${_1xbetData?.["presented-by"]?.length > 1 ? "carousel" : ""}`,
        autoplay: 2000,
        animationDuration: 1000,
        perView: 1,
        gap: 0,
      })?.mount();
    }
    if (document.querySelector(".aso_five")) {
      new Glide(document.querySelector(".aso_five"), {
        type: `${_1xbetData?.["technology-partner"]?.length > 1 ? "carousel" : ""}`,
        autoplay: 2000,
        animationDuration: 1000,
        perView: 1,
        gap: 0,
      })?.mount();
    }
    if (document.querySelector(".aso_six")) {
      new Glide(document.querySelector(".aso_six"), {
        type: `${_1xbetData?.["presenting-partner"]?.length > 1 ? "carousel" : ""}`,
        autoplay: 2000,
        animationDuration: 1000,
        perView: 1,
        gap: 0,
      })?.mount();
    }

    onoff &&
      catName !== "business" &&
      categoryName !== "business" &&
      categoryName !== "मनी" &&
      pageParam?.category !== "business" &&
      sponData &&
      sponData.electionLogo &&
      sponData.electionLogo?.data?.uploaded_img_desktop &&
      sponData.electionLogo?.data?.click_tracker &&
      sponData.electionLogo?.data?.impression_tracker &&
      processImpression(sponData.electionLogo?.data);

    window.addEventListener("scroll", func, { passive: true });

    return () => window.removeEventListener("scroll", func);
  }, []);
  const ATF_728 = pageAds.header ? pageAds.header : pageAds.ATF_728_id;

  // const catDisplay = cats[categoryName] || categoryName;

  const [signout, setSignout] = useState(false);
  function removeSession() {
    delete_cookie('g_token');
    delete_cookie('g_username');
    delete_cookie('isSignedIn');
    setIsSignedIn(false);
  }

  return (
    <>

      <div className="n18nheader">
        {/* Top Add on Front */}
        {ATF_728 ? (
          <div className="n18thder">
            <div className="inner-ad">
              <SiteAd
                slotId="NW18_HIND_ROS_SECTION_ROS_ATF_728"
                adUnit={pageAds.header ? pageAds.header : pageAds.ATF_728_id}
                sizes={[
                  [970, 90],
                  [728, 90],
                  [468, 60],
                ]}
                width={728}
                height={90}
                removeAdSpan={true}
                config={config}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        {pageAds?.PG_1x1_3 && <SiteAd slotId="PG_1x1_3" adUnit={pageAds.PG_1x1_3} sizes={[[1, 1]]} removeAdSpan={true} style={{ height: 0 }} loadonScroll={true} />}

        {/* End Top Add on Front */}
        {typeof VideoPage === "videos" ? (
          <SiteAd
            slotId="PG_Slider_1x1"
            adUnit="NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          />
        ) : (
          ""
        )}
        <div
          className={`n18bhdr inn18bhdr ${isWomenWorldCupPage ? "worldcupHeader" : ""
            }`}
        >
          <div className="n18hcontainer">
            {/* Website Logo */}
            <div className="logonsection">
              <a href="/" className="nhlogo">
                <img
                  src="/images/siteimages/News18_Hindi_logo_1631086645.svg"
                  alt="News18 हिंदी - Hindi News"
                  className="logonsection_img lazyload"
                  height="68"
                  width="130"
                />
              </a>
            </div>
            {/* Website Logo */}
            {/*Top nav Start */}
            <div className="nhhdr-nav">
              <div className="lnlivetv">
                <div className="languagebox lnlivetv_div">
                  <span className="languagebox_span">
                    {englishVariables["CHANGE_LANGUAGE"]}
                  </span>
                  <div
                    className="languagebox_linner linner"
                    onMouseEnter={() => setButtonHovered(true)}
                    onMouseLeave={() => setButtonHovered(false)}
                  >
                    <a href="https://hindi.news18.com/">
                      हिन्दी <span className="nhlanguatearrow hsocialsprite" />
                    </a>
                    <div
                      className={!buttonHovered ? " lddnav" : " active lddnav"}
                    >
                      <a href="https://www.news18.com" target="_blank">
                        ENGLISH
                      </a>
                      <a href="https://bengali.news18.com" target="_blank">
                        বাংলা{" "}
                      </a>
                      <a href="https://lokmat.news18.com/" target="_blank">
                        मराठी
                      </a>
                      <a href="https://gujarati.news18.com/" target="_blank">
                        ગુજરાતી
                      </a>
                      <a href="https://assam.news18.com/" target="_blank">
                        অসমীয়া{" "}
                      </a>
                      <a href="https://kannada.news18.com" target="_blank">
                        ಕನ್ನಡ{" "}
                      </a>
                      <a href="https://tamil.news18.com" target="_blank">
                        தமிழ்{" "}
                      </a>
                      <a href="https://malayalam.news18.com" target="_blank">
                        മലയാളം{" "}
                      </a>
                      <a href="https://telugu.news18.com" target="_blank">
                        తెలుగు{" "}
                      </a>
                      <a href="https://punjab.news18.com" target="_blank">
                        ਪੰਜਾਬੀ{" "}
                      </a>
                      <a href="https://urdu.news18.com" target="_blank">
                        اردو{" "}
                      </a>
                      <a href="https://odia.news18.com" target="_blank">
                        ଓଡ଼ିଆ{" "}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="nhlivetv lnlivetv_div">
                  <a href="/livetv/">
                    <span className="nhlivetvicon hsocialsprite"></span>{" "}
                    <strong>{englishVariables["LIVE_TV"]}</strong>{" "}
                    <span className="nhltvarrow hsocialsprite"></span>
                  </a>
                  <div className="nhltvddnav">
                    <a href="/livetv/" data-cat="livetv_channel_switch_D">
                      News18 इंडिया
                    </a>
                    <a
                      href="/livetv/news18-uttar-pradesh-uttarakhand/"
                      data-cat="livetv_channel_switch_D"
                    >
                      News18 उत्तर प्रदेश, उत्तराखंड
                    </a>
                    <a
                      href="https://punjab.news18.com/live-tv/"
                      data-cat="livetv_channel_switch_D"
                      target="_blank"
                    >
                      News18 पंजाब, हरियाणा,हरियाणा
                    </a>
                    <a
                      href="/livetv/news18-bihar-jharkhand/"
                      data-cat="livetv_channel_switch_D"
                    >
                      News18 बिहार, झारखंड
                    </a>
                    <a
                      href="/livetv/news18-madhya-pradesh-chhattisgarh/"
                      data-cat="livetv_channel_switch_D"
                    >
                      News18 मध्य प्रदेश, छत्तीसगढ़
                    </a>
                    <a
                      href="/livetv/news18-rajasthan/"
                      data-cat="livetv_channel_switch_D"
                    >
                      News18 राजस्थान
                    </a>
                  </div>
                </div>
                {/* {!!onoff ? <div className="lnlapp lnlivetv_div"> */}
                {true ? (
                  <div className="lnlapp lnlivetv_div">
                    <a
                      href="https://hindi.news18.com/app-download/"
                      target="_blank"
                    >
                      <span className="nhappicon hsocialsprite" />
                      <strong>
                        {isHome || isTag
                          ? englishVariables["DOWNLOAD_APP_HOME"]
                          : englishVariables["DOWNLOAD_APP"]}
                      </strong>
                    </a>
                    {!isHome ? (
                      <>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.divum.ibn&hl=en"
                          target="_blank"
                          rel="nofollow"
                        >
                          <img
                            src="/images/siteimages/an_nw_1631086677.svg"
                            title="News18 for Android"
                            alt="News18 for Android"
                            className="lazyload"
                            height="14"
                            width="12"
                          />
                        </a>
                        <a
                          href="https://itunes.apple.com/in/app/news18-for-iphone/id395194912?mt=8"
                          target="_blank"
                          rel="nofollow"
                        >
                          <img
                            src="/images/siteimages/app_nw_1631086710.svg"
                            title="News18 for iPhone"
                            alt="News18 for iPhone"
                            className="lazyload"
                            height="15"
                            width="12"
                          />
                        </a>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ) : null}
                <div className="nhsocial lnlivetv_div nhsocial">
                  <strong>{englishVariables["FOLLOW_US_ON"]}</strong>
                  <a
                    href="https://www.facebook.com/News18India/"
                    className="nhfbicon hsocialsprite nhsocial_a"
                    title="News18 India Facebook"
                  />
                  <a
                    href="https://twitter.com/news18india"
                    className="nhtwicon hsocialsprite nhsocial_a"
                    title="News18 India Twitter"
                  />
                  <a
                    href="https://www.instagram.com/news18hindi/"
                    className="nhigicon hsocialsprite nhsocial_a"
                    title="News18 India Instagram"
                  />
                  <a
                    href="https://www.youtube.com/c/news18India"
                    className="nhutbicon hsocialsprite nhsocial_a"
                    title="News18 India Youtube"
                  />
                  <a
                    href="https://t.me/news18hindi"
                    className="nhtelegramicon hsocialsprite nhsocial_a"
                  />
                </div>
                {isSignedIn ?
                  <div className="signoutWrap">
                    <div onClick={() => setSignout(!signout)} className="signedUser">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.641" height="16.641" viewBox="0 0 16.641 16.641">
                        <path id="Path_56" data-name="Path 56" d="M10-1.484a6.168,6.168,0,0,1-2.871-.762A6.082,6.082,0,0,1,5-4.18q.156-1.25,1.875-1.914A8.761,8.761,0,0,1,10-6.758a8.761,8.761,0,0,1,3.125.664Q14.844-5.43,15-4.18a6.082,6.082,0,0,1-2.129,1.934A6.168,6.168,0,0,1,10-1.484ZM10-13.32a2.385,2.385,0,0,1,1.758.7,2.409,2.409,0,0,1,.7,1.777,2.409,2.409,0,0,1-.7,1.777,2.385,2.385,0,0,1-1.758.7,2.385,2.385,0,0,1-1.758-.7,2.409,2.409,0,0,1-.7-1.777,2.409,2.409,0,0,1,.7-1.777A2.385,2.385,0,0,1,10-13.32Zm0-2.5A8.27,8.27,0,0,0,4.1-13.4,8.27,8.27,0,0,0,1.68-7.5,8.27,8.27,0,0,0,4.1-1.6,8.27,8.27,0,0,0,10,.82,8.27,8.27,0,0,0,15.9-1.6,8.27,8.27,0,0,0,18.32-7.5a8.234,8.234,0,0,0-2.441-5.9A8.293,8.293,0,0,0,10-15.82Z" transform="translate(-1.68 15.82)" fill="#a7a7a7" />
                      </svg>
                      <div className="text" style={signout === true ? { fontWeight: "bold" } : {}}>{signout === false ? "Hi, " : ""}{getUserName}</div>
                      <div className={`dropIcon ${signout === true ? "active" : ""}`}></div>
                    </div>
                    {signout && <div className="logout"><a onClick={removeSession}>Logout</a></div>}
                  </div>
                  : ""
                }
              </div>

              {isCricketNext && _1xbetData?.["associate-partner"]?.length ?
                <div className='betLogo'>
                  <div className='betLogoDiv'>
                    <h3 className='heading'>{sponser_label}</h3>
                    <ul>
                      <li>
                        {/* <div
                          className='heightZero'
                          dangerouslySetInnerHTML={{
                            __html: impression_tracker_logo,
                          }}
                        /> */}
                        <a href={click_tracker_logo} target="_blank" rel="nofollow"><img src={uploaded_img_path} alt={'text'} title="" /></a></li>
                    </ul>
                  </div>
                </div> : ''}

              {/* {((isHome && showBannerInHome) || (isTag && showBannerInTag)) && ( */}
                <div className="sponsors_Wrp">
                  {_1xbetData?.["presenting-partner"]?.length && (
                    <div className="associat_partner associat_partner1">
                      <h3 className="heading">
                        <span>{ _1xbetData?.["presenting-partner"][0].sponser_label} </span>
                      </h3>
                      <div className="aso_six glide_slide">
                        <div className="track" data-glide-el="track">
                          <ul className="slides">
                            {_1xbetData?.["presenting-partner"]?.map(
                              (singleData) => {
                                return (
                                  <li
                                    className="slide"
                                    style={{ color: "white" }}
                                  >
                                    <div id="bannerBox1">
                                      <div
                                        className="heightZero"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            singleData.impression_tracker_logo,
                                        }}
                                      />
                                      <a
                                        href={singleData.click_tracker_logo}
                                        target="_blank"
                                        rel="nofollow"
                                      >
                                        <img
                                          src={singleData.uploaded_img_path}
                                          alt={"text"}
                                          title=""
                                        />
                                      </a>
                                    </div>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {_1xbetData?.["co-presenting"]?.length && (
                    <div className="associat_partner associat_partner1">
                      <h3 className="heading">
                        <span>{ _1xbetData?.["co-presenting"][0].sponser_label}</span>
                      </h3>
                      <div className="aso_one glide_slide">
                        <div className="track" data-glide-el="track">
                          <ul className="slides">
                            {_1xbetData?.["co-presenting"]?.map(
                              (singleData) => {
                                return (
                                  <li
                                    className="slide"
                                    style={{ color: "white" }}
                                  >
                                    <div id="bannerBox2">
                                      <div
                                        className="heightZero"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            singleData.impression_tracker_logo,
                                        }}
                                      />
                                      <a
                                        href={singleData.click_tracker_logo}
                                        target="_blank"
                                        rel="nofollow"
                                      >
                                        <img
                                          src={singleData.uploaded_img_path}
                                          alt={"text"}
                                          title=""
                                        />
                                      </a>
                                    </div>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {_1xbetData?.["technology-partner"]?.length && (
                    <div className="associat_partner associat_partner1">
                      <h3 className="heading">
                        <span>{ _1xbetData?.["technology-partner"][0].sponser_label}</span>
                      </h3>
                      <div className="aso_five glide_slide">
                        <div className="track" data-glide-el="track">
                          <ul className="slides">
                            {_1xbetData?.["technology-partner"]?.map(
                              (singleData) => {
                                return (
                                  <li
                                    className="slide"
                                    style={{ color: "white" }}
                                  >
                                    <div id="bannerBox2">
                                      <div
                                        className="heightZero"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            singleData.impression_tracker_logo,
                                        }}
                                      />
                                      <a
                                        href={singleData.click_tracker_logo}
                                        target="_blank"
                                        rel="nofollow"
                                      >
                                        <img
                                          src={singleData.uploaded_img_path}
                                          alt={"text"}
                                          title=""
                                        />
                                      </a>
                                    </div>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {_1xbetData?.["presented-by"]?.length && (
                    <div className="associat_partner associat_partner2">
                      <h3 className="heading">
                        <span>{ _1xbetData?.["presented-by"][0].sponser_label}</span>
                      </h3>
                      <div className="aso_second glide_slide">
                        <div className="track" data-glide-el="track">
                          <ul className="slides">
                            {_1xbetData?.["presented-by"]?.map((singleData, index) => {
                              return (
                                <li
                                  className="slide"
                                  style={{ color: "white" }}
                                  key={index}
                                >
                                  <div id="bannerBox3">
                                    <div
                                      className="heightZero"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          singleData.impression_tracker_logo,
                                      }}
                                    />
                                    <a
                                      href={singleData.click_tracker_logo}
                                      target="_blank"
                                      rel="nofollow"
                                    >
                                      <img
                                        src={singleData.uploaded_img_path}
                                        alt={"text"}
                                        title=""
                                      />
                                    </a>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {_1xbetData?.["associate-partner"]?.length && (
                    <div className="associat_partner associat_partner3">
                      <h3 className="heading">
                        <span>{ _1xbetData?.["associate-partner"][0].sponser_label}</span>
                      </h3>
                      <div className="aso_third glide_slide">
                        <div className="track" data-glide-el="track">
                          <ul className="slides">
                            {_1xbetData?.["associate-partner"]?.map(
                              (singleData, index) => {
                                return (
                                  <li
                                    className="slide"
                                    style={{ color: "white" }}
                                    key={index}
                                  >
                                    <div id="bannerBox3">
                                      <div
                                        className="heightZero"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            singleData.impression_tracker_logo,
                                        }}
                                      />
                                      <a
                                        href={singleData.click_tracker_logo}
                                        target="_blank"
                                        rel="nofollow"
                                      >
                                        <img
                                          src={singleData.uploaded_img_path}
                                          alt={"text"}
                                          title=""
                                        />
                                      </a>
                                    </div>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              {/* )} */}

              {onoff &&
                catName !== "business" &&
                categoryName !== "business" &&
                categoryName !== "मनी" &&
                pageParam?.category !== "business" &&
                sponData &&
                sponData !== "" &&
                sponData?.sponserdata &&
                !isWomenWorldCupPage ? (
                <HeadSponsor
                  isDesktop={true}
                  sponData={sponData?.sponserdata || {}}
                />
              ) : null}
              {isWomenWorldCupPage && onoff ? (
                <HeadSponsor isDesktop={true} sponData={sponData || {}} />
              ) : null}
            </div>
            {/*Top nav End */}
          </div>
        </div>
      </div>
      <div className={isArticle && !isCricketNext ? "CSRheader" : ""}>
        {dynaMenu?.length ? (
          <DynaMenu pageType={pageType} dynaMenu={dynaMenu}/>
        ) : (isArticle || pageType == 'photogallery') ? (
          <div className="navwrapper">
            <DynamicMenuWithNoSSR
              menuData={apiMenuData}
              isHome={isHome}
              isCricketNext={isCricketNext}
              current={current}
              isIpl={isIpl}
              crMenu={crMenu}
              isWorldCup={isWorldCup}
              isT20={isT20}
              pageType={pageType}
              // districtList={districtList}
            />
          </div>
        ) : (
          <Menu
            menuData={menuData}
            isHome={isHome}
            isCricketNext={isCricketNext}
            current={current}
            isIpl={isIpl}
            crMenu={crMenu}
            isT20={isT20}
            isWorldCup={isWorldCup}
            pageType={pageType}
            // districtList={districtList}
          />
        )}
      </div>

      {

      electionWidgetData?.delhi?.mcd?.switcher?.Hindi_OnOff==1?
        <div id="bengalDesktopWidget">
   <div className="hyd_top_bg">
      <div className="wrap">
         <div className="hyd_top_strip">
            <div style={{ cursor: "pointer" }} className="hyd_logo urlRediect">
            <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/textlogo_1669703602.svg" alt="Delhi logo" title="Delhi logo" />
            </div>
            <div style={{ cursor: "pointer" }} className="city_logo urlRediect">
            <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/building_desktop_1669703504.svg" alt="city logo" title="city logo" />
            </div>
            <ul style={{ cursor: "pointer" }} id="result_list" className="result_list">
				<li className="skelanimation" style={{ minWidth: "150px", background: "#dadada", height: "66px", borderRadius: "6px" }}></li>
				<li className="skelanimation" style={{ minWidth: "70px", background: "#dadada", height: "66px", borderRadius: "6px" }}></li>
				<li className="skelanimation" style={{ minWidth: "70px", background: "#dadada", height: "66px", borderRadius: "6px" }}></li>
				<li className="skelanimation" style={{ minWidth: "70px", background: "#dadada", height: "66px", borderRadius: "6px" }}></li>
				<li className="skelanimation" style={{ minWidth: "70px", background: "#dadada", height: "66px", borderRadius: "6px" }}></li>
				<li className="skelanimation" style={{ minWidth: "70px", background: "#dadada", height: "66px", borderRadius: "6px" }}></li>
            </ul>
            <div className="details_box skelanimation"></div>
         </div>
      </div>
   </div>
</div>

       		:null
      }

      {switches && switches.score ? <div id="livescorecard-view"></div> : null}
      <style jsx global>{`
       #credential_picker_container{
        top:45px !important;
        z-index:999991 !important;
      }        
        .hyd_top_bg .hyd_logo{
          width:132px;
          flex-shrink:0;
        }

        .hyd_top_bg .city_logo{
          width:395px;
          flex-shrink:0;
        }

        .hyd_top_bg {
          display:flex;
        }

        .hyd_top_bg .hyd_top_strip{
          display:flex;
          overflow:visible;
          width:100%;
          justify-content: space-between;
        }

        .hyd_top_bg * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          outline: 0;
          border: 0;
        }
        .hyd_top_bg {
          background: url("https://images.news18.com/ibnlive/uploads/2020/11/1606463824_top_bg.png");
          background-position: top;
          background-repeat: no-repeat;
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
          max-width: 1244px;
          margin: 0 auto;
          position: relative;
        }
        @keyframes loading {
          100% {
            background-position: 100% 0;
          }
        }
        .result_list{display:flex;overflow:hidden;}
        .skelanimation{position:relative;}
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

        /* Header css start here */
        .n18nheader * {
          box-sizing: border-box;
          line-height: 1;
        }
        .nhhdr-nav {
          width: auto;
          position: absolute;
          right: 0;
          top: 0;
        }
        .n18thder {
          text-align: center;
          padding: 5px 0;
          min-height: 100px;
        }
        .n18hcontainer {
          font-family: "Mukta", sans-serif;
          width: 1244px;
          position: relative;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          height: ${onoff ? "120px" : "107px"};
        }
        .logonsection {
          display: flex;
          align-items: center;
          position: relative;
          color: #fff;
          font-size: 25px;
        }
        .nhtelegramicon {
          width: 17px;
          height: 15px;
          display: inline-block;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/telegram_header_1593419014.png)
            no-repeat !important;
          background-size: 16px;
          top: 1px;
          position: relative;
        }
        .logonsection_img {
          width: 130px;
        }
        .logonsection_h2 {
          font-size: 30px;
          margin-top: 5px;
          color: #fff;
          padding: 5px 0 0 15px;
          height: 68px;
          position: absolute;
          margin-left: 152px;
          white-space: nowrap;
          margin-top: 5px;
          text-transform: uppercase;
          line-height: 68px;
        }
        .logonsection_h2:before {
          content: "";
          position: absolute;
          width: 1px;
          background-color: ${isT20 ? "#fff" : "#374a47"};
          top: 0px;
          bottom: 0;
          left: -8px;
        }
        ${isHome || isTag || isCategory
          ? ".logonsection_h2{display: none;}"
          : ""}
        .nhlogo {
          margin-right: 15px;
          padding-right: 15px;
          position: relative;
        }
        .logonsection .nhlogo .n18bhdr .logonsection {
          min-width: 131px;
        }
        .lnlivetv {
          display: flex;
          justify-content: space-between;
          z-index: 2;
        }
        .lnlivetv_div {
          margin-right: 15px;
          box-shadow: 2px 2px 4px rgba(00, 00, 00, 0.4);
          padding: 2px 10px 6px;
          border-radius: 0 0 7px 7px;
        }
        .nhsocial.lnlivetv_div.nhsocial {
          margin-right: 0;
          box-shadow: rgba(0, 0, 0, 0.4) 2px 2px 4px;
          padding: 2px 10px 6px;
          border-radius: 0px 0px 7px 7px;
        }
        .languagebox {
          background: #e1261d;
          display: flex;
          justify-content: space-between;
          color: #fff;
          align-items: center;
          padding-right: 0;
          padding-bottom: 0;
          padding-top: 1px;
          font-weight: 700;
        }
        .languagebox_span {
          padding-right: 10px;
          font-size: 13px;
          padding-bottom: 2px;
        }
        .languagebox_linner {
          background: #fff;
          padding-left: 15px;
          min-width: 130px;
          color: #6c6c6c;
          font-size: 13px;
          position: relative;
          border-radius: 0 0 7px 7px;
          display: flex;
          align-items: center;
          height: 100%;
        }
        .languagebox .linner a {
          color: #3c3c3c;
          display: block;
        }
        .nhlivetv {
          height: 27px;
          border-radius: 0 0 7px 7px;
          padding: 5px 10px 0;
          box-sizing: border-box;
          background: #e1261d;
          color: #fff;
          box-shadow: 2px 2px 4px rgb(0 0 0 / 20%);
          position: relative;
        }
        .nhlivetv .nhltvddnav {
          background: #e1261d;
          color: #fff;
          font-size: 14px;
          position: absolute;
          top: 21px;
          width: 100%;
          left: 0;
          display: none;
          padding-top: 6px;
          box-shadow: 2px 2px 4px rgb(0 0 0 / 20%);
          z-index: 10;
        }
        .nhlivetv:hover .nhltvddnav {
          display: block;
        }
        .nhlivetv .nhltvddnav a {
          display: block;
          padding: 4px 10px;
          color: #fff;
          margin: 5px 0;
          line-height: 20px;
        }
        .nhlivetv .nhltvddnav a:hover {
          background: #b50d05;
        }
        .nhlivetv strong {
          padding: 0 10px 0 4px;
          font-size: 13px;
          color: #fff;
          margin-left: 24px !important;
        }
        .lnlapp {
          background: #fff;
          position: relative;
          padding-left: 30px;
        }
        .lnlapp a img {
          width: 12px;
          margin-left: 10px;
          position: relative;
          top: 3px;
        }
        .lnlapp strong {
          position: relative;
          top: 1px;
          font-size: 13px;
          text-transform: uppercase;
          color: #001d42;
        }
        .lnlivetv:hover .lnlapp strong {
          border-bottom: none;
        }
        .nhtranding {
          font-family: "Mukta", sans-serif;
          border-radius: 20px;
          padding: 8px 20px;
          background: #fff;
          font-size: 13px;
          color: #e1261d;
          margin: 23px 0;
          /* display: inline-block; */
          font-weight: 700;
          float: right;
          box-shadow: 2px 2px 4px rgba(00, 00, 00, 0.2);
        }
        .nhtranding a {
          color: #646464;
          padding-left: 20px;
          font-weight: 400;
        }
        .nhtranding a:hover {
          color: #e1261d;
        }
        .nhsocial {
          background: #fff;
          padding: 0 15px;
          display: flex;
        }
        .nhsocial a {
          margin-top: 2px;
        }
        .nhsocial_a {
          margin-right: 20px;
          top: 0;
          height: 18px;
        }
        .nhsocial > a:last-child {
          margin-right: 0;
        }
        .nhsocial strong {
          font-size: 13px;
          font-weight: bold !important;
          color: #666;
          text-transform: uppercase;
          padding-right: 25px;
          position: relative;
          top: 4px;
        }
        .nhsocial strong:after {
          content: "";
          width: 5px;
          height: 5px;
          position: absolute;
          border-left: 1px solid #7a7a7a;
          border-top: 1px solid #7a7a7a;
          right: 10px;
          top: 7px;
          transform: rotate(132deg);
        }
        .nhlivetv-icon {
          background-position: 0px -2px;
          width: 18px;
          height: 16px;
          position: relative;
          top: 2px;
        }
        .hsocialsprite {
          // background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/social_sprite_img_1631086597.svg) no-repeat;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/sclsprt_migration_1694779057.svg) no-repeat;
          display: inline-block;
          vertical-align: top;
        }
        .nhlanguatearrow {
          background-position: -67px -2px;
          width: 12px;
          height: 15px;
          position: absolute;
          top: 5px;
          right: 7px;
        }
        .nhlivetvicon {
          background-position: -2px -3px;
          width: 18px;
          height: 16px;
          position: absolute;
          top: 5px;
          left: 10px;
        }
        .nhltvarrow {
          background-position: -67px -22px;
          width: 12px;
          height: 15px;
          position: relative;
          top: 1px;
          right: -4px;
        }
        .nhappicon {
          background-position: -25px -2px;
          width: 11px;
          height: 18px;
          position: absolute;
          top: 5px;
          left: 10px;
        }
        .nhfbicon {
          position: relative;
          top: 1px;
          background-position: -47px -2px;
          width: 8px;
        }
        .nhtwicon {
          background-position: -2px -20px;
          width: 17px;
        }
        .nhigicon {
          background-position: -25px -21px;
          width: 17px;
        }
        .nhutbicon {
          background-position: -46px -20px;
          width: 17px;
        }
        .linner:hover .lddnav {
          display: block;
        }
        .lddnav a {
          display: block;
          padding: 6px 10px;
          margin: 5px 0;
          color: #3c3c3c !important;
          font-size: 12px;
        }
        .lddnav {
          font-size: 12px;
          background: #fff;
          width: 100%;
          box-sizing: border-box;
          position: absolute;
          top: 21px;
          left: 0;
          display: none;
          box-shadow: 2px 2px 4px rgba(00, 00, 00, 0.2);
          z-index: 99;
        }
        .n18bhdr {
          background: url(${backgroundImg}) no-repeat top center;
          border-top: 2px solid #e1261d;
          background-color: #eee;
          background-size: cover;
          padding-bottom: 5px;
        }
        .lddnav.active {
          display: block;
        }

        .lddnav {
          background: #fff;
          width: 100%;
          position: absolute;
          top: 21px;
          left: 0;
          display: none;
          box-shadow: 2px 2px 4px rgba(00, 00, 00, 0.2);
          z-index: 99999;
          padding-top: 6px;
        }

        .languagebox .linner:hover .lddnav {
          display: block;
        }

        .languagebox .linner .lddnav.adcls {
          display: block;
        }

        .adclhdr .nav_wapper {
          position: fixed !important;
          left: 0;
          top: 0;
          z-index: 9;
          width: 100%;
          height:50px;
        }

        .languagebox .linner .lddnav a {
          display: block;
          padding: 10px 15px;
          margin: 5px 0;
          color: #6c6c6c;
          font-size: 12px;
        }

        .languagebox .linner .lddnav a:hover {
          background: #e1261d;
          color: #fff;
        }
        .moneycontrol-logo {
          border-left: 1px solid #374b48;
          padding-left: 20px;
          position: relative;
          padding-bottom: 10px;
          top: -11px;
          height: 74px;
        }
        .moneycontrol-logo .money_title {
          font-size: 30px;
          color: #fff;
          overflow: hidden;
          font-weight: bold;
          line-height: 44px;
          height: auto !important;
          border: 0;
          padding: 0;
        }
        .moneycontrol-logo span {
          display: block;
          font-size: 14px;
          color: #cbcbcb;
          padding-bottom: 4px;
          margin-top: -7px;
        }
        .inner-ad {
          display: flex;
          height:90px;
          overflow:hidden;
        }
        .inner-ad span {
          background: #eee;
          display: block;
          font-size: 12px;
          color: #444;
          padding: 6px 0 3px 0;
        }

        .adclhdr .add-logo {
          display: block;
          margin-top: 2px;
          float: left;
          margin-right: 20px;
          position: relative;
          height: 0;
        }
        .adclhdr .add-logo img {
          width: 70px;
        }
        .nhtranding .backtoNw18 {
          font-size: 13px;
          font-family: lato, system-ui;
          font-weight: 700;
          color: #e1261d;
          position: relative;
          display: block;
        }
        .nhtranding .backtoNw18 .arrow {
          position: absolute;
          left: 0;
          width: 15px;
          height: 16px;
          top: 50%;
          background: #cecece;
          transform: translateY(-50%);
        }
        .backtoNw18 span {
          color: #001d42;
          text-decoration: underline;
        }
        body{margin: 0; padding:0; }   
        /* Header css end here */
        .nav_open {
          ${isCricketNext ? "display:block !important;" : ""}
        }
        .nav-box {
          ${isCricketNext ? "margin-left: 40px;" : "margin-left: 40px;"}
        }
        .worldcupHeader {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Women_World_Cup_2022_bg_D.jpg)
            no-repeat top center;
          height: 120px;
          border-top: 2px solid #e1261d;
          background-size: cover;
        }
        .wc-t2-bg-1,
        .wc-t2-bg {
          margin-left: 15px;
        }

        .solo-spon {
          margin-left: 215px !important;
        }

        .solo-spon img {
          width: 140px !important;
          height: 60px !important;
        }
        .CSRheader {
          height: 110px;
        }
        
        //  1xbet Logo
        .betLogo {
          display: flex;
          justify-content: flex-end;
          margin-top: 5px;
        }
        .betLogo .heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: #fff;
          font-weight: normal;
          margin-right: 10px;
          margin-bottom: 5px;
        }

        .heightZero {
          height: 0px;
        }

        // banner
        .sponsors_Wrp {
          align-items: flex-end;
          display: flex;
          width: auto;
          justify-content: flex-end;
          margin-bottom: 3px;
        }
        .associat_partner {
          margin-left: 20px;
        }
        .associat_partner .heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          color: #fff;
          font-weight: normal;
          margin-right: 10px;
          margin-top: 5px;
          text-transform: uppercase;
          font-family: "Khand", sans-serif;
          margin-bottom : 1px;
        }
        .associat_partner .heading:after {
          content: "";
          width: 100%;
          height: 2px;
          background: rgba(225, 225, 225, 0.7);
          margin-right: 5px;
        }
        .associat_partner .heading span {
          margin-right: 5px;
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
        .associat_partner3 {
           ${associateLength === 1 ? 'width: 105px' : (associateLength === 2 ? 'max-width : 220px' : 'max-width: 330px')};
        }
        .associat_partner4 {
          ${associateLength === 1 ? 'width: 105px' : (associateLength === 2 ? 'max-width : 220px' : 'max-width: 330px')};
       }
        .associat_partner2 {
          max-width: 130px;
        }
        .associat_partner1 {
          max-width: 140px;
        }
        .associat_partner1.associat_partner {
          //margin-left: 0;
        }

        #bannerBox1 {
          width: 140px;
          height: 60px;
          //background: white;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #bannerBox2 {
          width: 126px;
          height: 54px;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #bannerBox3 {
          width: 105px;
          height: 45px;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }
         #bannerBox1 img{height: 60px}
         #bannerBox2 img{height: 54px}

        .aso_third li{
          width : 105px !important;
        }
        .aso_third ul{
          ${associateLength === 1 ? 'margin-left :0px !important' : 'margin-left:  9px !important'}
        }

        div.signoutWrap {position:relative;border-radius:0;padding:0;margin-left: 15px;box-shadow: 0px 0px 4px #00000066;
    width: 145px;}
    .signedUser{display:flex;align-items:center;position:relative;cursor:pointer;background:#fff;padding:4px 10px;padding-right:24px;border-radius:0 0 7px 7px;z-index:10;}
    .signedUser svg{margin-right:6px;}
    .signedUser .text{max-width:134px;color:#666666;font-size:11px;text-transform:uppercase;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;padding-top: 2px;font-weight: 700;}
    .signedUser .dropIcon{width:7px;height:7px;border-bottom: 2px solid #666666;border-right: 2px solid #666666;transform: rotate(45deg);position:absolute;top: 7px;right:10px;transition: all 0.1s ease-in;}
    .signedUser .dropIcon.active{transform: rotate(-134deg);top:11px;}
    .signoutWrap .logout{width:100%;font-size:11px;padding:7px 10px 7px;display:block;position:absolute;top:100%;background:#fff;z-index:9;left:0;margin-top:-10px;border-radius: 0 0 7px 7px;box-shadow:0 0 10px #000;}
    .signoutWrap .logout a{padding:9px 0px 3px;border-top:1px dotted #CBCBCB;display:block;text-align:left;cursor:pointer;}
    .navwrapper{
      height:110px;
    }
      `}</style>
      {/* </div> */}
    </>
  );
};

export default Header;
