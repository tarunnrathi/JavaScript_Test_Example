import Byline from "components/Common/ByLine";
import {
  imageLoader,
  livePostSourceParser,
  scrollToTarget,
} from "includes/article.util";
import ampHelper from "includes/Amp/ampHelper";
import { useState, useRef, useEffect } from "react";
import getConfig from "next/config";
import LazyLoadImage from "components/Common/CustomImage";
import fetchUtility from "includes/sFetchUtility";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  blogTimeConversion,
  shortDateConversion,
  blogTimeConversionForLiceBlog,
} from "../../../../helper/global";
import {
  getActiveInning,
  getInningData,
  getIsLiveMatch,
} from "includes/ipl.helper";
import { logEvent } from "includes/googleAnalytic";
import { additionalText } from "includes/_app.util";

const NewSiteAd = dynamic(() => import("widgets/Common/Responsive/NewSiteAd"));
const { publicRuntimeConfig } = getConfig();
const FullScoreCard = dynamic(() =>
  import("components/Cricketnext/Cards/FullScoreCard")
);
const SocialShare = dynamic(() => import("widgets/Amp/SocialShare"));
const ArticleBody = dynamic(() => import("components/Common/ArticleBody"));

let id;

const HeadingSection = ({
  data = {},
  // breakIt,
  isAmp = false,
  pageAds,
  checked,
  toggle,
  paramObj,
  pageSeo,
  pageNumber,
  first = "",
  keyPanelData,
  stickyList,
  showKeyEvent,
  isHighlight,
}) => {
  let ampAds, adTarget;
  const [showFull, setShowFull] = useState(false);
  const [score, setScore] = useState(null);
  const [showHideToggle, setShowHideToggle] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const ampstickyContentLength = stickyList[0]?.blog_content?.length;

  const blogUpdateTime = blogTimeConversion(data?.updated_at);

  const updateLiveData = (apiUrl) => {
    (async () => {
      const mdata = await fetchUtility(apiUrl, []);
      setScore(mdata);
    })();
  };

  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = (url) => updateLiveData(url);
    setContentHeight(
      document.getElementsByClassName("contentWrapper")[0]?.clientHeight ?? 0
    );
  }, []);

  useEffect(() => {
    function tick(url) {
      savedCallback.current(url);
    }
    const isLive = data.cricketData?.isLive;
    if (isLive && !id) {
      id = setInterval(
        () =>
          tick(
            `${publicRuntimeConfig.CRICKET_NEXT_CSR_API}match_${data?.cricketData?.matchCode}_hi.json`
          ),
        10000
      );
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, []);

  const handleReadMore = (e) => {
    e.preventDefault();
    setShowFull(!showFull);
  };
  if (isAmp) {
    ampAds = ampHelper.get_amp_ad_article(
      paramObj?.subCategory,
      "LiveBlog",
      "article"
    );
    adTarget = ampHelper.get_ad_targetting(data, paramObj, pageSeo, "news");
  }

  // let baseUrl = publicRuntimeConfig.siteUrl;
  // baseUrl = baseUrl.replace(/\/$/, "");

  if (score && score?.matchCode) {
    const currentInning = getActiveInning(score);
    score.currentInnings = currentInning;
    score.isLive = getIsLiveMatch(score?.status);
  }

  const newMatchData = score && score?.matchCode ? score : data?.cricketData;

  let cricketHeading = "";

  newMatchData
    ? (cricketHeading = getInningData(newMatchData))
    : (cricketHeading = "");

  const isBlogActive =
    data?.liveblog_switcher === 1 &&
    new Date() >= new Date(data?.liveblog_start_time) &&
    new Date() <= new Date(data?.liveblog_end_time);
  const articleDate = shortDateConversion(data?.updated_at);

  const handleShowHighlight = () => {
    showKeyEvent(!isHighlight);
  };
  const handleShowHide = (e) => {
    e.preventDefault();
    if (contentHeight > 150) setShowHideToggle(!showHideToggle);
  };

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={imageLoader(data?.images?.url, 470, 300, false, "fill")}
        />
      </Head>
      <div className="L_wrap">
        <div className="TopStoryBox">
          <div className="TstoryHead">
            {data?.liveblog_switcher === 1 &&
              new Date() >= new Date(data?.liveblog_start_time) &&
              new Date() <= new Date(data?.liveblog_end_time) && (
                <div className="auto-refresh">
                  <p className="liveNow">Live</p>
                  {!isAmp && (
                    <div className="LiveNowWrap">
                      <div className="refresh-box">
                        <span className="rfs-h">Auto Refresh</span>
                        <label className="auto-switch">
                          <input
                            onClick={() => toggle()}
                            type="checkbox"
                            value={checked ? "on" : "off"}
                            className={checked ? "on" : "off"}
                          />
                          <div className="auto-slider">
                            <span className={`switch${checked ? "On" : "Off"}`}>
                              {checked ? "On" : "Off"}
                            </span>
                          </div>
                        </label>
                      </div>
                      <div className="autoRegreshBrder"></div>
                    </div>
                  )}
                </div>
              )}
            <h1 className="heading_1">
              {data?.headline || data?.display_headline}
              {cricketHeading && `, ${cricketHeading}`}
            </h1>
          </div>
          <div className="TstoryImg">
            {isAmp ? (
              <LazyLoadImage
                src={data?.images?.url}
                width={470}
                height={300}
                alt={data?.images?.caption || data?.images?.attribution || ""}
                title={data?.images?.caption || data?.images?.attribution || ""}
                isAMP={isAmp}
                isLazyLoad={false}
              />
            ) : (
              <span>
                <LazyLoadImage
                  src={data?.images?.url}
                  width={470}
                  height={300}
                  alt={data?.images?.caption || data?.images?.attribution || ""}
                  title={
                    data?.images?.caption || data?.images?.attribution || ""
                  }
                  isLazyLoad={false}
                />
              </span>
            )}
          </div>
          {isAmp ? (
            <div className="ad-container">
              <div
                style={{
                  height: "280px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <amp-ad
                  width={336}
                  height={280}
                  type="doubleclick"
                  data-slot={ampAds?.topAd}
                  json={adTarget}
                  data-multi-size="300x250,336x280"
                  data-lazy-fetch="true"
                  data-loading-strategy="1"
                  data-multi-size-validation="false"
                  rtc-config='{ "vendors": {"openwrap": { "PROFILE_ID" : "2059", "PUB_ID" : "113941" },"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  } },"timeoutMillis": 1000}'
                ></amp-ad>
              </div>
            </div>
          ) : pageAds?.header_ATF_320 ? (
            <div className="ad-container">
              <div className="addinner-box">
                <NewSiteAd
                  slotId="PG_1x1"
                  adUnit={pageAds.PG_1x1}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}
                />
                <NewSiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_0"
                  adUnit={pageAds?.header_ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280],
                  ]}
                  removeAdSpan={true}
                ></NewSiteAd>
                <NewSiteAd
                  slotId="PG_1x1_2"
                  adUnit={pageAds.PG_1x1_2}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}
                />
                <NewSiteAd
                  slotId="PG_1x1_3"
                  adUnit={pageAds.PG_1x1_3}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}
                />
                <NewSiteAd
                  slotId="PG_Slider"
                  adUnit={
                    "NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AS/NW18_HIND_AS_PWA_ROS_PG_SLIDER_1x1"
                  }
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}
                />
              </div>
            </div>
          ) : null}
          <div className="TstoryDis">
            {!pageNumber ? (
              <div className="text">
                {data?.intro}
                {cricketHeading && ` ${cricketHeading}`}
              </div>
            ) : null}
            <ul className="topDate">
              <Byline agency={data?.agency} agencyFull={data?.agency_full} />
              <li>
                | <time dateTime={blogUpdateTime}>{blogUpdateTime}</time>
              </li>
            </ul>
            <div className=" social_share_sec">
              {isAmp ? (
                <SocialShare
                  headline={data?.headline}
                  url={paramObj?.requestURL}
                />
              ) : (
                <ul
                  className=" art_social_share"
                  style={{ backgroundColor: "#fff" }}
                >
                  <li>
                    <a
                      className="arr_redirect"
                      onClick={async () => {
                        const shareData = {
                          title: "",
                          text: `${data?.display_headline}\n${data?.weburl}\n\n ${additionalText}`,
                        };
                        try {
                          await navigator.share(shareData);
                        } catch (err) {
                          //resultPara.textContent = `Error: ${err}`;
                        }
                        logEvent("ss_wapi", "tap", "liveBlog_page");
                      }}
                    >
                      <svg
                        id=""
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="25"
                        viewBox="0 0 32 32"
                      >
                        <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {isAmp ? (
          <div className="ad-container">
            <div
              style={{
                height: "280px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <amp-ad
                width={336}
                height={280}
                type="doubleclick"
                data-slot={ampAds?.middleAd1}
                json={adTarget}
                data-multi-size="300x250,336x280"
                data-lazy-fetch="true"
                data-loading-strategy="1"
                data-multi-size-validation="false"
                rtc-config='{ "vendors": {"openwrap": { "PROFILE_ID" : "2059", "PUB_ID" : "113941" },"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  } },"timeoutMillis": 1000}'
              ></amp-ad>
            </div>
          </div>
        ) : (
          pageAds?.ATF_300 && (
            <div className="ad-container">
              <div className="addinner-box">
                <NewSiteAd
                  slotId="PG_1x1"
                  adUnit={pageAds.PG_1x1}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}
                />
                <NewSiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_1"
                  adUnit={pageAds?.ATF_300}
                  sizes={[
                    [300, 250],
                    [336, 280],
                  ]}
                  lazyload={true}
                ></NewSiteAd>
                <NewSiteAd
                  slotId="PG_1x1_2"
                  adUnit={pageAds.PG_1x1_2}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}
                />
                <NewSiteAd
                  slotId="PG_1x1_3"
                  adUnit={pageAds.PG_1x1_3}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}
                />
                <NewSiteAd
                  slotId="PG_Slider"
                  adUnit={
                    "NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AS/NW18_HIND_AS_PWA_ROS_PG_SLIDER_1x1"
                  }
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}
                />
              </div>
            </div>
          )
        )}
        <div className="LiveBlog_shortDis">
          {!pageNumber && !isAmp && (
            <>
              <div
                style={{
                  height: showFull ? "" : "240px",
                  overflow: !showFull ? "hidden" : "",
                }}
                className={"content_sec"}
              >
                <ArticleBody
                  body={data?.body}
                  isDesktop={true}
                  id={data?.story_id}
                  showAds={false}
                  parsed={data?.parsedBody}
                />
              </div>
              <a
                className="adhipadhe"
                onClick={handleReadMore}
                style={{
                  color: "#e1261d",
                  fontSize: "14px",
                  alignItems: "",
                  display: showFull ? "none" : "block",
                }}
              >
                अधिक पढ़ें ...
              </a>
            </>
          )}
          {!pageNumber && isAmp && (
            <>
              <div
                className="showLess"
                data-amp-bind-class="keys?'showLess':'showMore'"
                // style={{
                //   height: showFull ? "" : "190px",
                //   overflow: !showFull ? "hidden" : "",
                // }}
              >
                <div
                  className="content_sec"
                  dangerouslySetInnerHTML={{
                    __html: first,
                  }}
                ></div>
              </div>
              <a
                className="adhipadhe"
                on={`tap:AMP.setState({keys: !keys})`}
                data-amp-bind-class="keys?'show':'hide'"
              >
                अधिक पढ़ें ...
              </a>
            </>
          )}
          {data?.cricketData && !isAmp && (
            <div className="CN-PageWrap CN-Mobile-PageWrap topm">
              <FullScoreCard
                data={score || data.cricketData}
                score={data.cricketData}
                isMobile={true}
                isAmp={isAmp}
                url={data.weburl}
              />
            </div>
          )}
        </div>
        {/* KEY EVENTS PANEL */}
        {keyPanelData?.length ? (
          <>
            <div className="lv_wrap">
              <p>UPDATED {articleDate}</p>
              <div className="al_sldr">
                <div className="track" data-glide-el="track">
                  <ul className="slides menus">
                    {keyPanelData?.map((key_data, idx) => (
                      <li className="slide list-item active-menu" key={idx}>
                        <span className="date">
                          {shortDateConversion(key_data?.updated_at)}
                        </span>
                        {/* When liveblog is active date time stamp with each post title */}
                        {isBlogActive && (
                          <span className="tm">
                            {new Date(key_data?.updated_at).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            )}
                          </span>
                        )}
                        {!isAmp ? (
                          <p
                            className="name"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToTarget(key_data?.id);
                            }}
                          >
                            {key_data?.blog_title}
                          </p>
                        ) : (
                          <p
                            className="name"
                            on={`tap:AMP.scrollTo(id='${key_data?.id}', position='center')`}
                            tabIndex={idx}
                            role="button"
                          >
                            {key_data?.blog_title}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {!isAmp && (
              <div className="swkey">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isHighlight}
                    onClick={handleShowHighlight}
                  />
                  <span className="slider round"></span>
                </label>
                <span>Show Key Event Only</span>
              </div>
            )}
          </>
        ) : (
          ""
        )}

        {/* PINNED POST */}
        {!isHighlight && stickyList?.length ? (
          <div className="pinbox_wrap">
            <div className="pinbox_hd">
              {!isAmp ? (
                <img alt="pin.svg" src="/images/icons/pin.svg" />
              ) : (
                <amp-img
                  src="/images/icons/pin.svg"
                  width="55px"
                  height="27px"
                />
              )}
              FROM {shortDateConversion(stickyList[0]?.updated_at)}
            </div>
            <div
              className={
                showHideToggle ? "pinbox_cont" : "pinbox_cont showPinned"
              }
              data-amp-bind-class="showkeys?'pinbox_cont':'pinbox_cont showPinned'"
            >
              <span className="tm">
                {blogTimeConversionForLiceBlog(stickyList[0]?.updated_at)}
              </span>
              <div className="contentWrapper">
                <h2 className="feed_heading">{stickyList[0]?.blog_title}</h2>
                {!isAmp ? (
                  <div className="live_feed_intro" style={{ width: "100%" }}>
                    {livePostSourceParser(
                      stickyList[0]?.blog_content,
                      stickyList[0]?.id,
                      true,
                      true
                    )}
                  </div>
                ) : (
                  <p
                    className="feed_cont"
                    dangerouslySetInnerHTML={{
                      __html: ampHelper.getAMPCodes(
                        stickyList[0]?.blog_content
                      ),
                    }}
                  ></p>
                )}
              </div>
            </div>
            {!isAmp ? (
              <button type="button" className="pnbtn" onClick={handleShowHide}>
                {!showHideToggle ? (
                  <>
                    {" "}
                    और भी पढ़ें<span className="plus"></span>
                  </>
                ) : (
                  <>
                    कम पढ़ें<span className="minus"></span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                className="pnbtn"
                on={`tap:AMP.setState({showkeys: !showkeys})`}
              >
                <p
                  data-amp-bind-class="showkeys?'hide':'show' "
                  className="show"
                >
                  {" "}
                  और भी पढ़ें<span className="plus"></span>
                </p>
                <p
                  data-amp-bind-class="showkeys?'show':'hide' "
                  className="hide"
                >
                  कम पढ़ें <span className="minus"></span>
                </p>
              </button>
            )}
          </div>
        ) : (
          ""
        )}
        <style jsx global amp-custom>
          {`
            .show {
              display: block;
            }
            .hide {
              display: hide;
            }
            .showLess {
              height: 188px;
              overflow: hidden;
              display: block;
              color: #e1261d;
              font-size: 14px;
              align-items: "";
            }
            .showMore {
              color: #e1261d;
              font-size: 14px;
              align-items: "";
            }
            .content_sec p,
            .read_more_links {
              margin-bottom: 20px;
              font-size: 18px;
              line-height: 28px;
              color: #000000;
              font-weight: 400;
            }

            .content_sec p a,
            .read_more_links a {
              font-weight: bold;
              font-size: 18px;
              line-height: 21px;
              color: #e1261d;
            }
            .topm {
              padding: 0 10px;
              margin: 20px 0;
            }
            .scrollO {
              overflow-x: scroll;
            }
            .content_sec p a {
              display: initial;
            }
            .arr_redirect {
              background: #ffffff;
              border: 1px solid #c7c7c7;
              border-radius: 24px;
              color: #343a40;
              display: flex;
              float: left;
              line-height: 16px;
              margin: 0;
              position: relative;
              padding: 0;
              text-transform: capitalize;
              text-align: center;
              align-items: center;
              height: 35px;
              min-width: 35px;
              justify-content: center;
              flex-direction: row;
            }
            .lv_wrap {
              background-color: #f8f8f8;
              padding: 15px;
              border-radius: 5px;
            }
            .lv_wrap p {
              color: #000000;
              text-transform: uppercase;
              font-size: 14px;
              line-height: 23px;
            }
            .al_sldr {
              margin-bottom: 10px;
              padding-top: 27px;
              overflow-x: scroll;
              overflow-y: hidden;
            }
            .al_sldr .slide {
              display: flex;
              flex-direction: column;
              cursor: pointer;
              position: relative;
              width: 150px;
              margin-right: 20px;
            }
            .al_sldr .slide:before {
              display: none;
            }
            .sldr_img {
              margin: 16px 0 20px 0;
            }
            .al_sldr .name {
              font-weight: bold;
              font-size: 14px;
              line-height: 23px;
              color: #ec2128;
              text-transform: capitalize;
              margin: 0 0 5px 0;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .al_sldr .date {
              font-size: 14px;
              line-height: 23px;
              color: #707070;
            }

            .al_sldr .slides {
              display: -webkit-box;
              border-top: 1px dashed #707070;
              padding-top: 22px;
              width: fit-content;
            }
            .al_sldr .slide:after {
              content: "";
              border-radius: 50%;
              width: 10px;
              height: 10px;
              background-color: #656565;
              position: absolute;
              left: 13px;
              top: -28px;
            }
            .al_sldr .slide:first-child:after {
              left: 0;
            }
            .al_sldr .slide.active:after {
              background-color: #ec2128;
            }
            .pinbox_wrap {
              background-color: #fff;
              border: 1px solid #051936;
              border-radius: 5px;
              position: relative;
              margin: 0 10px;
            }
            .pinbox_hd {
              background-color: #051936;
              border-radius: 2px 5px 0px 0px;
              padding: 5px 15px;
              color: #fff;
              display: flex;
              font-size: 16px;
              line-height: 27px;
              font-weight: bold;
            }
            .pinbox_cont {
              padding: 10px 20px 20px;
              font-size: 16px;
              line-height: 27px;
            }
            .tm {
              color: #939393;
            }
            .pinbox_cont p {
              color: #050505;
              position: relative;
              margin: 0;
            }
            // .pinbox_cont p:after {background: transparent linear-gradient(180deg, #FFFFFFC9 0%, #FFFFFF 100%) 0% 0% no-repeat padding-box; content: "";width: 100%; height: 63px; display: block; position: absolute; bottom: 0;}
            .pnbtn {
              width: 135px;
              height: 40px;
              border-radius: 50px;
              background-color: #051936;
              color: #fff;
              text-align: center;
              padding: 7px 10px;
              position: absolute;
              left: 0;
              right: 0;
              margin: 0 auto;
              bottom: -19px;
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              cursor: pointer;
              font-size: 16px;
            }
            .plus,
            .plus::after {
              display: block;
              box-sizing: border-box;
              background: currentColor;
              border-radius: 10px;
            }
            .plus {
              margin-top: -2px;
              position: relative;
              transform: scale(var(--ggs, 1));
              width: 16px;
              height: 2px;
            }
            .plus::after {
              content: "";
              position: absolute;
              width: 2px;
              height: 16px;
              top: -7px;
              left: 7px;
            }
            .swkey {
              margin: 20px 0;
              display: flex;
              align-items: center;
              padding: 0 10px;
            }
            .swkey > span {
              color: #000;
              font-size: 16px;
              line-height: 27px;
              margin-left: 10px;
            }
            .switch {
              position: relative;
              display: inline-block;
              width: 40px;
              height: 20px;
            }
            .switch input {
              opacity: 0;
              width: 0;
              height: 0;
            }
            .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #8c8c8c;
              -webkit-transition: 0.4s;
              transition: 0.4s;
              border-radius: 34px;
            }
            .slider:before {
              position: absolute;
              content: "";
              height: 18px;
              width: 18px;
              left: 1px;
              bottom: 1px;
              background-color: white;
              -webkit-transition: 0.4s;
              transition: 0.4s;
              border-radius: 50%;
            }
            input:checked + .slider {
              background-color: #22874d;
            }
            input:checked + .slider:before {
              transform: translateX(20px);
            }
            .al_sldr .slide:focus::after,
            .al_sldr .slide:hover::after {
              content: "";
              background-color: #ec2128;
            }
            .al_sldr .slide:hover .name {
              text-decoration: underline;
            }
            .pinbox_hd img {
              margin-right: 10px;
            }
            .live_feed_intro {
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }
            .L_wrap {
              margin-bottom: 30px;
            }
            .showPinned {
              overflow: hidden;
              ${contentHeight > 150 || (isAmp && ampstickyContentLength > 200)
                ? "max-height:180px"
                : "max-height:225px"};
            }
            .showPinned:after {
              background: transparent
                linear-gradient(180deg, #ffffffc9 0%, #ffffff 100%) 0% 0%
                no-repeat padding-box;
              ${contentHeight > 150 || (isAmp && ampstickyContentLength > 200)
                ? 'content: ""'
                : ""};
              width: 90%;
              height: 63px;
              display: block;
              position: absolute;
              bottom: 0;
            }
            .minus {
              box-sizing: border-box;
              position: relative;
              display: block;
              transform: scale(var(--ggs, 1));
              width: 16px;
              height: 2px;
              background: currentColor;
              border-radius: 10px;
            }
            .pnbtn p.show {
              display: contents;
            }
            .feed_heading {
              font-size: 20px;
              line-height: 28px;
              font-weight: bold;
              margin-bottom: 10px;
              font-family: "mukta";
            }
            .pinbox_cont ol,
            .pinbox_cont ul {
              margin: initial;
              padding: 0 0px 0 30px;
            }
            .pinbox_cont ul li {
              list-style: initial;
            }
            .pinbox_cont ol li {
              list-style: decimal;
              margin: initial;
              padding: 0 10px;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default HeadingSection;
