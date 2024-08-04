import React, { useState, useEffect, useContext } from "react";
import "lazysizes";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { useRouter } from "next/router";
import englishVariables from "includes/lang.helper.js";
import { GlobalContext } from "../../GlobalStore";
// import HeadSponsor from "components/Common/HeadSponsor";
import DynaMenu from "./DynaMenu";
// import Glide from "@glidejs/glide";
import dynamic from "next/dynamic";
import {
  googleOneTapJs,
  getCookie,
  checkUserExists,
  delete_cookie,
} from "includes/GoogleOneTap.util";
import {
  generate_dfp_ppid,
  generate_dfp_ppid_login_user,
} from "includes/ppid.helper";
import LazyLoadImage from "components/Common/CustomImage";
import { STATIC_IMAGE } from "constant/global/Constant";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import { IPL_YEAR } from "includes/ipl.helper";
import { getRedisDataWithKey } from "api/global/Common";
import { REDIS_KEYS } from "api/Constant";
// import BudgetHighlightAcrossSiteResponsiveWidget from "components/Common/budget/BudgetHighlightAcrossSiteResponsiveWidget";

const SponserMarque = dynamic(() => import("./SponserMarque"));
const DynamicMenuWithNoSSR = dynamic(() => import("./Menu"));

const Header = ({
  pageAds,
  catName,
  categoryName = "",
  menuData = {},
  trendingTags = [],
  isHome,
  // isHomeOnly,
  isTag,
  switches,
  isCategory,
  isCricketNext = false,
  current,
  isIpl,
  crMenu,
  isT20,
  isWorldCup,
  pageType,
  sponData,
  background = {},
  onoff,
  pageParam,
  // isWomenWorldCupPage,
  dynaMenu,
  isArticle,
  _1xbetData,
  // districtList,
  activeId,
  isVideoWall,
  isPhotoStory,
  isBudgetPage,
  showSponser = false,
  liveTvFlag = {},
  showtopHeaderBanner,
  isShowSponser = false,
  mostRunsData,
  mostWickets,
  pointsTableData,
  // budgetSwitcherData = {},
  // counting_poll = {},
  // exit_poll = {},
  category_hi,
}) => {
  // const {
  //   highlights_across_flag = "0",
  //   highlights_microsite_flag = "0",
  //   highlights_sponser_across_flag = "0",
  // } = budgetSwitcherData || {};
  const { globalState = {} } = useContext(GlobalContext) || {};
  const { cats = {} } = globalState;
  const [buttonHovered, setButtonHovered] = useState(false);
  const url = `${publicRuntimeConfig.siteUrl}${useRouter().asPath.replace(
    "/",
    ""
  )}`;
  const [getUserName, setUserName] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [checkOneTap, setCheckOneTap] = useState(1);
  const [flipLogo, setFlipLogo] = useState({});
  useEffect(() => {
    if (getCookie("g_token") === null) {
      generate_dfp_ppid();
      if (checkOneTap === 1) {
        setTimeout(googleOneTapJs, 2000);
        setCheckOneTap(2);
      }
    } else {
      if (getCookie("isSignedIn") === null) {
        checkUserExists(getCookie("g_token"));
      } else {
        setUserName(getCookie("g_username"));
        setIsSignedIn(true);
        generate_dfp_ppid_login_user();
      }
    }
    getRedisDataWithKey("KHABARN18-" + REDIS_KEYS.FLIP_LOGO, false, true)
      .then((data) => {
        setFlipLogo(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

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
        });`;
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

  const associateLength = 0;
  const presentingLength = 0;

  useEffect(() => {
    const func = () => {};

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
  const catDisplay = cats[categoryName] || category_hi || categoryName;

  const [signout, setSignout] = useState(false);
  function removeSession() {
    delete_cookie("g_token");
    delete_cookie("g_username");
    delete_cookie("isSignedIn");
    setIsSignedIn(false);
  }
  return (
    <>
      <header>
        <div className="n18bhdr">
          <div className="n18hcontainer">
            {/* Website Logo */}
            <div className="logonsection">
              {flipLogo?.desktop_status === "1" ? (
                <a href="/" className="nhlogo header_logo flipH">
                  <span className="lg_ani">
                    <h1>
                      <img
                        src={STATIC_IMAGE.NEWS18_SVG_LOGO}
                        alt="News18 हिंदी - Hindi News"
                        className="logonsection_img lazyload header_logo"
                        height="68"
                        width="130"
                      />
                    </h1>
                    <img
                      src={flipLogo?.image_url}
                      alt="News18 हिंदी - Hindi News"
                      className="logonsection_img lazyload header_logo img2"
                      height="68"
                      width="130"
                      onClick={(e) => e.preventDefault()}
                    />
                  </span>
                </a>
              ) : (
                <a href="/" className="nhlogo header_logo">
                  <img
                    src={STATIC_IMAGE.NEWS18_SVG_LOGO}
                    alt="News18 हिंदी - Hindi News"
                    className="logonsection_img lazyload header_logo"
                    height="68"
                    width="130"
                  />
                </a>
              )}
              {onoff &&
              catName !== "business" &&
              categoryName !== "business" &&
              categoryName !== "मनी" &&
              pageParam?.category !== "business" &&
              sponData &&
              sponData.electionLogo &&
              sponData.electionLogo?.data?.uploaded_img_desktop ? (
                <>
                  <h2 className="logonsection_h2" style={{ display: "block" }}>
                    <a
                      href={sponData.electionLogo?.data?.click_tracker || ""}
                      style={{ display: "block" }}
                    >
                      <LazyLoadImage
                        style={{
                          transform: "translateY(-7px)",
                          minWidth: "147px",
                        }}
                        src={
                          sponData.electionLogo?.data?.uploaded_img_desktop ||
                          STATIC_IMAGE.STATE_JANADESH_LOGO
                        }
                        height={65}
                        width={147}
                        alt={"logo"}
                        isLazyLoad={false}
                      />
                    </a>
                  </h2>
                </>
              ) : (
                <>
                  {(!background.desk && catName === "business") ||
                  categoryName === "business" ||
                  categoryName === "मनी" ||
                  pageParam?.category === "business" ? (
                    <>
                      <div className="moneycontrol-logo">
                        <h2 className="money_title">मनी</h2>
                        <span>Powered by</span>
                        <a
                          href="https://www.moneycontrol.com/"
                          rel="nofollow"
                          target="_blank"
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
                          <LazyLoadImage
                            src="/images/logos/mc.png"
                            alt="moneycontrol-logo"
                            height="27"
                            width="125"
                            isLazyLoad={false}
                          />
                        </a>
                      </div>
                    </>
                  ) : !onoff &&
                    !background.desk &&
                    catDisplay !== "" &&
                    !isCricketNext ? (
                    <>{!isT20 ? catDisplay?.replace("&amp;", "&") : null}</>
                  ) : (
                    <h2 className="logonsection_h2">{catDisplay}</h2>
                  )}

                  {!onoff && !background.desk && isCricketNext ? (
                    isT20 || isWorldCup ? (
                      <>
                        {isT20 ? (
                          <LazyLoadImage
                            className="wc-t2-bg"
                            src="https://images.news18.com/static_news18/pix/ibnhome/news18/t20-logo.svg"
                            alt="t20 world cup"
                            width={105}
                            height={92}
                            isLazyLoad={false}
                          />
                        ) : (
                          <img
                            className="wc-t2-bg"
                            src="/images/logos/WorldCupLogo.svg"
                            alt="WorldCupLogo"
                          />
                        )}
                        {isT20 && (
                          <LazyLoadImage
                            className="wc-t2-bg-1"
                            src={STATIC_IMAGE.VISHVA_CUP_2022}
                            alt="vishwa Cup 2022"
                            width={196}
                            height={68}
                            isLazyLoad={false}
                          />
                        )}
                      </>
                    ) : (
                      !onoff &&
                      !background.desk &&
                      !catDisplay &&
                      (isIpl ? (
                        <a href="/cricket/ipl/">
                          <h2
                            className={
                              isIpl ? "logonsection_ipl_h2" : "logonsection_h2"
                            }
                          >
                            T20 रनभूमि {IPL_YEAR}
                          </h2>
                        </a>
                      ) : (
                        <h2
                          className={
                            isIpl ? "logonsection_ipl_h2" : "logonsection_h2"
                          }
                        >
                          cricket
                        </h2>
                      ))
                    )
                  ) : null}
                </>
              )}
            </div>
            {/* Website Logo */}
            {/*Top nav Start */}
            <div className="nhhdr-nav">
              <div className="lnlivetv">
                <div className="languagebox lnlivetv_div">
                  <span>{englishVariables["CHANGE_LANGUAGE"]}</span>
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
                      <a href="https://news18marathi.com/" target="_blank">
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
                  <a href="/livetv/" className="header_watch_live_tv">
                    <span className="nhlivetvicon hsocialsprite header_watch_live_tv"></span>{" "}
                    <strong className="header_watch_live_tv">
                      {englishVariables["LIVE_TV"]}
                    </strong>{" "}
                    <span className="nhltvarrow hsocialsprite header_watch_live_tv"></span>
                  </a>
                  <div className="nhltvddnav">
                    <a
                      href="/livetv/"
                      data-cat="livetv_channel_switch_D"
                      className="header_watch_live_tv"
                    >
                      News18 इंडिया
                    </a>
                    <a
                      href="/livetv/news18-uttar-pradesh-uttarakhand/"
                      data-cat="livetv_channel_switch_D"
                      className="header_watch_live_tv"
                    >
                      News18 उत्तर प्रदेश, उत्तराखंड
                    </a>
                    <a
                      href="https://punjab.news18.com/live-tv/"
                      data-cat="livetv_channel_switch_D"
                      target="_blank"
                      className="header_watch_live_tv"
                    >
                      News18 पंजाब, हरियाणा, हिमाचल
                    </a>
                    <a
                      href="/livetv/news18-bihar-jharkhand/"
                      data-cat="livetv_channel_switch_D"
                      className="header_watch_live_tv"
                    >
                      News18 बिहार, झारखंड
                    </a>
                    <a
                      href="/livetv/news18-madhya-pradesh-chhattisgarh/"
                      data-cat="livetv_channel_switch_D"
                      className="header_watch_live_tv"
                    >
                      News18 मध्य प्रदेश, छत्तीसगढ़
                    </a>
                    <a
                      href="/livetv/news18-rajasthan/"
                      data-cat="livetv_channel_switch_D"
                      className="header_watch_live_tv"
                    >
                      News18 राजस्थान
                    </a>
                  </div>
                </div>

                <div className="lnlapp lnlivetv_div">
                  <>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.divum.ibn&hl=en"
                      target="_blank"
                      rel="nofollow"
                      id="andriod"
                    >
                      <span
                        className="nhappicon hsocialsprite header_download_app"
                        id="andriod"
                        style={{ fontSize: "0px" }}
                      >
                        andriod
                      </span>
                      <strong className="header_download_app">
                        {isTag || isIpl
                          ? englishVariables["DOWNLOAD_APP_HOME"]
                          : englishVariables["DOWNLOAD_APP"]}
                      </strong>
                      <LazyLoadImage
                        src={STATIC_IMAGE.ANDROID_ICON_SVG}
                        title="News18 for Android"
                        alt="News18 for Android"
                        className="lazyload header_download_app"
                        height="14"
                        width="12"
                        isLazyLoad={false}
                        id="andriod"
                      />
                    </a>
                    <a
                      href="https://itunes.apple.com/in/app/news18-for-iphone/id395194912?mt=8"
                      target="_blank"
                      rel="nofollow"
                      className="header_download_app"
                      id="apple"
                    >
                      <LazyLoadImage
                        src={STATIC_IMAGE.APPLE_ICON_SVG}
                        title="News18 for iPhone"
                        alt="News18 for iPhone"
                        className="lazyload header_download_app"
                        height="15"
                        width="12"
                        isLazyLoad={false}
                        id="apple"
                      />
                    </a>
                  </>
                </div>
                <div className="nhsocial lnlivetv_div">
                  <strong>{englishVariables["FOLLOW_US_ON"]}</strong>
                  <a
                    href="https://www.facebook.com/News18India/"
                    className="nhfbicon hsocialsprite nhsocial_a header_follow_us_social"
                    title="News18 India Facebook"
                    id="facebook"
                  />
                  <a
                    href="https://twitter.com/news18india"
                    className="nhtwicon hsocialsprite nhsocial_a header_follow_us_social"
                    title="News18 India Twitter"
                    id="twitter"
                  />
                  <a
                    href="https://www.instagram.com/news18hindi/"
                    className="nhigicon hsocialsprite nhsocial_a header_follow_us_social"
                    title="News18 India Instagram"
                    id="instagram"
                  />
                  <a
                    href="https://www.youtube.com/c/news18India"
                    className="nhutbicon hsocialsprite nhsocial_a header_follow_us_social"
                    title="News18 India Youtube"
                    id="youtube"
                  />
                  <a
                    href="https://t.me/news18hindi"
                    className="nhtelegramicon hsocialsprite nhsocial_a header_follow_us_social"
                    id="telegram"
                  />
                </div>
                {isSignedIn ? (
                  <div className="signoutWrap">
                    <div
                      onClick={() => setSignout(!signout)}
                      className="signedUser"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16.641"
                        height="16.641"
                        viewBox="0 0 16.641 16.641"
                      >
                        <path
                          id="Path_56"
                          data-name="Path 56"
                          d={`M10-1.484a6.168,6.168,0,0,1-2.871-.762A6.082,6.082,
                        0,0,1,
                        5-4.18q.156-1.25,1.875-1.914A8.761,
                        8.761,0,0,1,10-6.758a8.761,8.761,0,0,1,
                        3.125.664Q14.844-5.43,15-4.18a6.082,6.082,0,0,1-2.129,
                        1.934A6.168,6.168,0,0,1,10-1.484ZM10-13.32a2.385,2.385,0,0,1,
                        1.758.7,2.409,2.409,0,0,1,.7,1.777,2.409,2.409,0,0,1-.7,1.777,2.385,2.385,0,0,
                        1-1.758.7,2.385,2.385,0,0,1-1.758-.7,2.409,2.409,0,0,1-.7-1.777,
                        2.409,2.409,0,0,1,.7-1.777A2.385,2.385,0,0,1,10-13.32Zm0-2.5A8.27,
                        8.27,0,0,0,4.1-13.4,8.27,8.27,0,0,0,1.68-7.5,8.27,8.27,0,0,0,
                        4.1-1.6,8.27,8.27,0,0,0,10,.82,8.27,8.27,0,0,0,15.9-1.6,8.27,8.27,0,0,0,18.32-7.5a8.234,8.234,0,0,0-2.441-5.9A8.293,8.293,0,0,0,10-15.82Z`}
                          transform="translate(-1.68 15.82)"
                          fill="#a7a7a7"
                        />
                      </svg>
                      <div
                        className="text"
                        style={signout === true ? { fontWeight: "bold" } : {}}
                      >
                        {signout === false ? "Hi, " : ""}
                        {getUserName}
                      </div>
                      <div
                        className={`dropIcon ${
                          signout === true ? "active" : ""
                        }`}
                      ></div>
                    </div>
                    {signout && (
                      <div className="logout">
                        <a onClick={removeSession}>Logout</a>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {(showSponser &&
                isShowSponser &&
                Object.keys(_1xbetData || {}).length !== 0) ||
              (showSponser &&
                isIpl &&
                Object.keys(_1xbetData || {}).length !== 0) ? (
                <SponserMarque
                  sponserData={_1xbetData}
                  showFullBanner={pageType === "ram-mandir" || isBudgetPage}
                />
              ) : isIpl && liveTvFlag?.widget?.companion_banner === "1" ? (
                <div
                  id="testt"
                  style={{
                    width: 600,
                    height: 60,
                    margin: "auto",
                    marginTop: 10,
                    marginRight: 0,
                  }}
                >
                  <NewSiteAd
                    slotId="BUDGET_HEADER_AD_DESKTOP"
                    adUnit={
                      "NW18_HIND_Desktop/NW18_HIND_EVENT_Home/NW18_HIND_EVENT_Home_Home/NW18_HIND_HP_ROS_EVENT_TOP_600x60"
                    }
                    sizes={[[600, 60]]}
                    width={600}
                    height={60}
                    removeAdSpan={true}
                    lazyLoad={true}
                  />
                </div>
              ) : (
                !isCricketNext && (
                  <div className="nhtranding">
                    Trending Topics :
                    {trendingTags?.map((trendingTag, key) => (
                      <a
                        key={key}
                        href={trendingTag.tag_url}
                        className="header_trending_topics"
                      >
                        {trendingTag.tag_name}
                      </a>
                    ))}
                  </div>
                )
              )}
              {isCricketNext &&
                trendingTags?.status === 1 &&
                !isShowSponser && (
                  <div className="nhtranding">
                    Trending Topics :
                    {trendingTags?.topics.map((trendingTag, key) => (
                      <a
                        key={key}
                        href={trendingTag.tag_url}
                        className="header_trending_topics"
                      >
                        {trendingTag.tag_name}
                      </a>
                    ))}
                  </div>
                )}
              {/* {onoff &&
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
            ) : null} */}
              {/* {isWomenWorldCupPage && onoff ? (
                <HeadSponsor isDesktop={true} sponData={sponData || {}} />
            ) : null} */}
            </div>
            {/*Top nav End */}
          </div>
          {/* </div> */}
        </div>
        <nav>
          <div className={isArticle && !isCricketNext ? "CSRheader" : ""}>
            {dynaMenu?.length ? (
              <DynaMenu pageType={pageType} dynaMenu={dynaMenu} />
            ) : isArticle || pageType === "photogallery" ? (
              <div className={isCricketNext ? "" : "navwrapper"}>
                <DynamicMenuWithNoSSR
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
                  activeId={activeId}
                />
              </div>
            ) : (
              <DynamicMenuWithNoSSR
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
                activeId={activeId}
                mostRunsData={mostRunsData}
                mostWickets={mostWickets}
                pointsTableData={pointsTableData}
              />
            )}
          </div>
        </nav>
      </header>
      {showtopHeaderBanner && (
        <div className="n18thder">
          <div className="inner-ad">
            <LazyLoadImage
              style={{ margin: "auto" }}
              src="https://images.news18.com/ibnkhabar/uploads/2024/03/728-x-90-2024-03-9ced944ae162aedb6202961706f7233f.gif"
              width="728"
              height="90"
            />
          </div>
        </div>
      )}
      {ATF_728 && !showtopHeaderBanner && (
        <div className="n18thder">
          <div className="inner-ad">
            <NewSiteAd
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
              // lazyload={true}
            />
          </div>
        </div>
      )}

      {pageAds?.PG_1x1_3 && (
        <NewSiteAd
          slotId="PG_1x1_3"
          adUnit={pageAds.PG_1x1_3}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadOnScroll={true}
          style={{ height: 0 }}
        />
      )}

      {/* End Top Add on Front */}
      {(isVideoWall || isPhotoStory) && (
        <NewSiteAd
          slotId="PG_Slider_1x1"
          adUnit={
            isVideoWall || isPhotoStory
              ? pageAds?.PG_Slider_1x1
              : "NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"
          }
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadOnScroll={true}
        />
      )}
      {switches && switches.score ? <div id="livescorecard-view"></div> : null}
      {/* <BudgetHighlightAcrossSiteResponsiveWidget
        device="desktop"
        isShowSponser={highlights_sponser_across_flag === "1"}
        showAcrossWidget={
          (highlights_across_flag === "1" && !isHomeOnly) ||
          (isHomeOnly && highlights_microsite_flag === "1")
        }
      /> */}
      {/* {counting_tally_microsite_flag === "1" && (
        <ASCountingDay instance={"result"} lang={"hi"} mode={"prod"} />
      )}
      {showCountingPoll && (
        <LSCountingDay instance={"lsresult"} lang={"hi"} mode={"prod"} />
      )}
      {showExitPoll && <LSAcross instance={"exit"} lang={"hi"} mode={"prod"} />}
      {((counting_tally_sponser_home_flag === "1" && isHome) ||
        (counting_tally_sponser_across_flag === "1" && !isHome)) && (
        <div style={{ minHeight: 60, marginBottom: 10 }}>
          <NewSiteAd
            slotId={"Desktop_Header_Election_ad_unit"}
            adUnit={
              "NW18_HIND_DESKTOP/NW18_HIND_EVENT_HOME/NW18_HIND_EVENT_HOME_HOME/NW18_HIND_HP_ROS_EVENT_TOP_1244X60"
            }
            sizes={[[1244, 60]]}
            width={1244}
            height={60}
            lazyLoad={true}
            style={{ display: "flex", justifyContent: "center" }}
          />
        </div>
      )} */}
      {/* {counting_tally_sponser_home_flag === "1" && adComp()} */}
      {/* <Election2022AcrossWidget electionData={electionData || {}}  isHome={isHome} /> */}
      {/* {countingTallyData && (
        <Card
          mode="desktop"
          content={countingTallyData}
          type="slider"
          config={{
            customTableClass: "counting_tally",
            customStyles: {
              AdBottomSpacing: "10px"
            }
          }}
          adConfig={{
            unit: "/1039154/NW18_HIND_Desktop/NW18_HIND_Election/NW18_HIND_Election_COUNTINGDAY/NW18_HIND_ELECT_SPONSOR_TOP_STRIP_1244x60",
            sizes: [[1244, 60]],
          }}
          pollConfig={{
            dataLoader: fetchCountingTallyData,
            loaderParams: {
              env: "prod",
            lang: 'hindi',
            key: 'counting_poll',
            type: 'home',
            slider:true,
            mode: "desktop"
          }}}
        />
      )} */}
      <style jsx global>{`      
        #credential_picker_container {
          top: 45px !important;
          z-index: 999991 !important;
        }

        .hyd_top_bg .hyd_logo {
          width: 132px;
          flex-shrink: 0;
        }

        .hyd_top_bg .city_logo {
          width: 395px;
          flex-shrink: 0;
        }

        .hyd_top_bg {
          display: flex;
        }

        .hyd_top_bg .hyd_top_strip {
          display: flex;
          overflow: visible;
          width: 100%;
          justify-content: space-between;
        }

        .hyd_top_bg * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          outline: 0;
          border: 0;
        }
        .n18bhdr{
          background: url(${
            isBudgetPage
              ? "/images/N18_English_Budget_Header_bg_D.jpg"
              : isT20 || isWorldCup
              ? "https://images.news18.com/static_news18/pix/ibnhome/news18/images/t20-worldcup/images/wordcup_headerbg.jpg"
              : isIpl
              ? "https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/iplheaderbg.png"
              : "https://hindi.news18.com/images/header.webp"
          })no-repeat top center;
          border-top: 2px solid#e1261d;
          background-color: #eee;
          background-size: cover;
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

        /* Header css start here */
        .n18bhdr * {
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
          // background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/telegram_header_1593419014.png)
          //   no-repeat !important;
          background-size: 16px;
          top: 1px;
          position: relative;
          background-position: -267px -3px !important;
        }
        .logonsection_img {
          width: 130px;
        }
        .logonsection_ipl_h2 {
          font-size: 38px;
          margin-top: 5px;
          color: #fff;
          padding: 5px 0 0 15px;
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          height: 52px;
        }
        .logonsection_h2 {
          font-size: 20px;
          font-weight: 400;
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
        ${
          isHome || isTag || isCategory || isIpl
            ? ".logonsection_h2{display: none;}"
            : ""
        }
        .nhlogo {
          // border-right: 1px solid #374a47;
          // margin-right: 15px;
          margin-right: 15px;
          position: relative;
          display: block;
          width: 130px;
          height: 68px;
        }
        // .logonsection .nhlogo .n18bhdr .logonsection {
        //   min-width: 131px;
        // }
        .lnlivetv {
          display: flex;
          justify-content: space-between;
          z-index: 2;
        }
        .nhlogo .lg_ani {
          display: block;
          width: 130px;
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
        .languagebox span {
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
          top: -5px;
          font-size: 13px;
          text-transform: uppercase;
          color: #001d42;
          vertical-align: text-bottom;
        }
        .lnlivetv:hover .lnlapp strong {
          border-bottom: none;
        }
        .nhtranding {
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
          top: 4px;
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
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)no-repeat;
          display: inline-block;
          vertical-align: top;
        }
        .nhlanguatearrow {
          background-position: -78px -6px;
          width: 12px;
          height: 15px;
          position: absolute;
          top: 5px;
          right: 7px;
        }
        .nhlivetvicon {
          background-position: -12px -7px;
          width: 18px;
          height: 16px;
          position: absolute;
          top: 5px;
          left: 10px;
        }
        .nhltvarrow {
          background-position: -78px -25px;
          width: 12px;
          height: 15px;
          position: relative;
          top: 1px;
          right: -4px;
        }
        .nhappicon {
          background-position: -35px -6px;
          width: 11px;
          height: 18px;
          position: absolute;
          top: 5px;
          left: 10px;
        }
        .nhfbicon {
          position: relative;
          top: 1px;
          background-position: -58px -6px;
          width: 9px;
        }
        .nhtwicon {
          background-position: -10px -24px;
          width: 20px;
        }
        .nhigicon {
          background-position: -33px -25px;
          width: 20px;
        }
        .nhutbicon {
          background-position: -56px -24px;
          width: 20px;
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
          height: 50px;
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
          height: 90px;
          overflow: hidden;
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
        body {
          margin: 0;
          padding: 0;
          font-family: "Mukta", sans-serif;
        }
        /* Header css end here */
        .nav_open {
          ${isCricketNext ? "display:block !important;" : ""}
        }
        // .nav-box {
        //   ${isCricketNext ? "margin-left: 40px;" : "margin-left: 40px;"}
        // }
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
          display: flex;
          width: auto;
          margin: 6px 0;
          align-items: flex-start;
          justify-content: flex-end;
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
          margin-bottom: 5px;
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
        .copowered-list {
          margin: 0px 0px -1px 0px !important;
        }
        .glide_slide .slides {
          display: flex;
          color: white;
          padding: 0;
          margin: 0;
        }
        .associat_partner3 {
          ${associateLength === 1 ? "width: 105px" : "max-width : 220px"}
        }
        .associat_partner3 .heading {
          margin-left: 10px;
        }
        .associat_partner4 {
          ${presentingLength === 1 ? "width: 105px" : "max-width : 300px"};
          overflow: hidden;
        }
        .associat_partner2 {
          max-width: 130px;
        }
        .associat_partner5 {
          max-width: 105px;
        }
        .associat_partner6 {
          max-width: 115px;
        }
        .associat_partner1 {
          max-width: 140px;
        }

        #bannerBox1 {
          width: 100px;
          height: 50px;
          //background: white;
          color: #333;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        #bannerBox2 {
          width: 126px;
          height: 43px;
          //background: white;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #bannerBox5 {
          width: 115px;
          height: 50px;
          //background: white;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #bannerBox3 {
          width: ${pageType === "ram-mandir" ? "105px" : "105px"};
          // width : 97px;
          height: 47px;
          margin-right: 5px;
          //background: white;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #bannerBox1 img {
          height: 50px;
        }
        #bannerBox2 img {
          height: 43px;
        }

        .aso_four li {
          width: 140px !important;
        }
        .aso_third li {
          width: 105px !important;
          ${associateLength === 2 ? "margin-right :5px !important" : ""}
t"
            : ""}
dotted #cbcbcb;
          display: block;
          text-align: left;
          cursor: pointer;
        }
        .navwrapper { height: 110px;
        }        
        
        .subNavWrap{
          position: ${isIpl ? "sticky" : ""} ;
          top: ${isIpl ? "-1px" : ""};
          z-index: ${isIpl ? "5" : "0"}
        }
        header, nav {
          display: ${isIpl ? "initial !important" : ""};
      }

      @keyframes anim {
        0% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg)
        }
    
        25% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg)
        }
    
        30% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg)
        }
    
        70% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg)
        }
    
        75% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg)
        }
    
        100% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg)
        }
    }
    
    @keyframes anim2 {
        0% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg)
        }
    
        20% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg)
        }
    
        25% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg)
        }
    
        75% {
            -webkit-transform: rotateY(90deg);
            -ms-transform: rotateY(90deg);
            transform: rotateY(90deg)
        }
    
        80% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg)
        }
    
        100% {
            -webkit-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            transform: rotateY(0deg)
        }
    }
      
      /* The element to apply the animation to */
      .flipH img {
        position: absolute;
        animation: anim 8s infinite linear;
        top: 0;
        left: 0;
        right: 0;
      }
      .flipH .img2 {
        position: absolute;
        animation: anim2 8s infinite linear;
      }
      `}</style>
    </>
  );
};

export default Header;
