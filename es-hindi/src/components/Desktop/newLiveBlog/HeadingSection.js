import { scrollToTarget, livePostSourceParser } from "includes/article.util";
import ArticleBody from "components/Common/ArticleBody";
import Byline from "components/Common/ByLine";
import { useEffect, useState, useRef } from "react";
import FullScoreCard from "components/Cricketnext/Cards/FullScoreCard";
import getConfig from "next/config";
import LazyLoadImage from "components/Common/CustomImage";
import fetchUtility from "includes/sFetchUtility";
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
import Glide from "@glidejs/glide";

const { publicRuntimeConfig } = getConfig();

let id;
const HeadingSection = ({
  data,
  breakIt,
  checked,
  toggle,
  pageNumber,
  keyPanelData,
  stickyList,
  showKeyEvent,
  isHighlight,
}) => {
  const [showFull, setShowFull] = useState(false);
  const [score, setScore] = useState(null);
  const blogUpdateTime = blogTimeConversion(data?.updated_at);
  const [showHideToggle, setShowHideToggle] = useState(false);
  const handleShowHighlight = () => {
    showKeyEvent(!isHighlight);
  };
  const handleReadMore = (e) => {
    e.preventDefault();
    setShowFull(!showFull);
  };
  const updateLiveData = (apiUrl) => {
    (async () => {
      const mdata = await fetchUtility(apiUrl, []);
      setScore(mdata);
    })();
  };
  const [contentHeight, setContentHeight] = useState(0);
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = (url) => updateLiveData(url);
    setContentHeight(
      document.getElementsByClassName("contentWrapper")[0]?.clientHeight ?? 0
    );
  }, [score]);

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

  if (score && score?.matchCode) {
    const currentInning = getActiveInning(score);
    score.currentInnings = currentInning;
    score.isLive = getIsLiveMatch(score?.status);
  }

  const newMatchData = score && score?.matchCode ? score : data?.cricketData;
  let cricketHeading = newMatchData ? getInningData(newMatchData) : "";
  cricketHeading =
    (data?.headline || data?.display_headline) +
    (cricketHeading ? ", " + cricketHeading : "");
  const cricketIntro =
    (data?.intro || data?.display_headline) +
    (newMatchData ? getInningData(newMatchData) : "");

  const isLive =
    data?.liveblog_switcher === 1 &&
    new Date() >= new Date(data?.liveblog_start_time) &&
    new Date() <= new Date(data?.liveblog_end_time);
  const articleDate = shortDateConversion(data?.updated_at);

  useEffect(() => {
    const glideElement = document.querySelector(".al_sldr");
    if (!glideElement) return;
    const glide = new Glide(glideElement, {
      type: "slider",
      autoplay: false,
      perView: keyPanelData.length > 5 ? 5 : keyPanelData.length,
      bound: true,
      gap: 40,
    });

    const left = document.querySelector(".arrow--left");
    const right = document.querySelector(".arrow--right");

    glide.mount();

    const updateArrows = () => {
      if (left) {
        if (glide.index === 0) {
          left.disabled = true; // Disable on first slide
          left.classList.remove("active");
        } else {
          left.disabled = false; // Enable on other slides
          left.classList.add("active");
        }
      }

      if (right) {
        if (
          glide.index === keyPanelData.length - glide.settings.perView ||
          keyPanelData.length <= glide.settings.perView
        ) {
          right.disabled = true; // Disable on last slide
          right.classList.remove("active");
        } else {
          right.disabled = false; // Enable on other slides
          right.classList.add("active");
        }
      }
    };

    glide.on(["mount.after", "run"], updateArrows);

    // Initial arrow state
    updateArrows();

    return () => {
      glide.destroy();
    };
  }, [keyPanelData]);

  const handleShowHide = (e) => {
    e.preventDefault();
    if (contentHeight > 100) setShowHideToggle(!showHideToggle);
  };

  return (
    <>
      <div className="LV_wrap">
        {data?.liveblog_switcher === 1 &&
          new Date() >= new Date(data?.liveblog_start_time) &&
          new Date() <= new Date(data?.liveblog_end_time) && (
            <div className="language_row">
              <p className="livenow_btn">Live</p>
              <div className="refresh-box" onClick={() => toggle()}>
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
        <h1 className="live_blog_title">{cricketHeading}</h1>
        <p className="live_blog_intro">{cricketIntro}</p>
        <ul className="topDate">
          <Byline agency={data?.agency} agencyFull={data?.agency_full} />
          <li>
            | <time dateTime={blogUpdateTime}>{blogUpdateTime}</time>
          </li>
        </ul>
        {/* {data.cricketData && <Tabs options={tabOpt} active={3}/>} */}
        {!pageNumber && (
          <div className="first_story">
            <div className="first_story_left">
              <LazyLoadImage
                src={data?.images?.url}
                width={205}
                height={137}
                alt={data?.images?.caption || data?.images?.attribution || ""}
                title={data?.images?.caption || data?.images?.attribution || ""}
              />
            </div>
            <div className="first_story_right">
              {breakIt && (
                <div
                  style={{
                    height: showFull ? "" : "150px",
                    overflow: !showFull ? "hidden" : "",
                  }}
                >
                  <ArticleBody
                    body={data?.body}
                    isDesktop={true}
                    id={data?.story_id}
                    showAds={false}
                    parsed={
                      breakIt
                        ? [data && data?.parsedBody?.length && data?.parsedBody]
                        : data?.parsedBody
                    }
                  />
                </div>
              )}
              {breakIt && (
                <a
                  style={{
                    display: "block",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontFamily: `"Mukta",sans-serif !important`,
                    fontWeight: "bold",
                    color: "#e1261d",
                    background: "#ffffff",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget("readmore_content");
                  }}
                  href="#readmore_content"
                >
                  अधिक पढ़ें ...
                </a>
              )}
              {!breakIt && (
                <div
                  style={{
                    height: showFull ? "" : "178px",
                    overflow: !showFull ? "hidden" : "",
                  }}
                >
                  <ArticleBody
                    body={data?.body}
                    isDesktop={true}
                    id={data?.story_id}
                    showAds={false}
                    parsed={data?.parsedBody}
                  />
                </div>
              )}
              {!breakIt && (
                <a
                  href="#"
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
              )}
            </div>
          </div>
        )}
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
                        {isLive && (
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
                        <p
                          className="name"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToTarget(key_data?.id);
                          }}
                        >
                          {key_data?.blog_title}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="arrows_wrap" data-glide-el="controls">
                  <button
                    type="button"
                    className="arrow arrow--left"
                    data-glide-dir="<"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="13.993"
                      viewBox="0 0 8 13.993"
                      fill="#fff"
                    >
                      <path
                        id="Icon_ionic-ios-arrow-back"
                        data-name="Icon ionic-ios-arrow-back"
                        d="M13.662,13.188,18.957,7.9a1,1,0,0,0-1.416-1.412l-6,5.995a1,1,0,0,0-.029,1.379L17.536,19.9a1,1,0,1,0,1.416-1.412Z"
                        transform="translate(-11.251 -6.194)"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="arrow arrow--right active"
                    data-glide-dir=">"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="13.993"
                      viewBox="0 0 8 13.993"
                      fill="#fff"
                    >
                      <path
                        id="Icon_ionic-ios-arrow-back"
                        data-name="Icon ionic-ios-arrow-back"
                        d="M16.839,13.188,11.544,7.9a1,1,0,0,1,1.416-1.412l6,5.995a1,1,0,0,1,.029,1.379L12.965,19.9a1,1,0,0,1-1.416-1.412Z"
                        transform="translate(-11.251 -6.194)"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="swkey">
              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked={isHighlight}
                  onClick={handleShowHighlight}
                />
                <span className="slider round"></span>
              </label>
              <span>Show Key Event Only</span>
            </div>
          </>
        ) : (
          ""
        )}
        {/* PINNED POST */}
        {!isHighlight && stickyList?.length ? (
          <div className="pinbox_wrap">
            <div className="pinbox_hd">
              <img alt="pin.svg" src="/images/icons/pin.svg" />
              FROM {shortDateConversion(stickyList[0]?.updated_at)}
            </div>
            <div
              className={
                showHideToggle ? "pinbox_cont " : "pinbox_cont showPinned"
              }
            >
              <span className="tm">
                {blogTimeConversionForLiceBlog(stickyList[0]?.updated_at)}
              </span>
              <div className="contentWrapper">
                <h2 className="feed_title">{stickyList[0]?.blog_title}</h2>
                <div className="live_feed_intro" style={{ width: "100%" }}>
                  {livePostSourceParser(
                    stickyList[0]?.blog_content,
                    stickyList[0]?.id,
                    true,
                    true
                  )}
                </div>
              </div>
            </div>
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
          </div>
        ) : (
          ""
        )}

        {data.cricketData && (
          <FullScoreCard
            data={score || data.cricketData}
            score={data.cricketData}
            url={data.weburl}
          />
        )}
      </div>
      <style jsx>
        {`
          .showPinned {
            ${contentHeight > 100 ? "max-height:165px" : "height:100%"};
            overflow: hidden;
          }
          .showPinned:after {
            background: transparent
              linear-gradient(180deg, #ffffffc9 0%, #ffffff 100%) 0% 0%
              no-repeat padding-box;
            ${contentHeight > 100 ? 'content: ""' : ""};
            width: 90%;
            height: 63px;
            display: block;
            position: absolute;
            bottom: 0;
          }
        `}
      </style>
    </>
  );
};

export default HeadingSection;
