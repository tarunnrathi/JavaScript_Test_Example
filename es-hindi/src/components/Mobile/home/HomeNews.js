import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import Skeleton from "react-loading-skeleton";
import Data from "./HomeNewsData";
import { logEvent } from "includes/googleAnalytic";
import { DOMAIN_URL, STATIC_IMAGE, TEXT } from "constant/global/Constant";
import SelectStateAmpNew from "components/Common/SelectStateAmpNew";
import LazyLoadImage from "components/Common/CustomImage";
const { publicRuntimeConfig } = getConfig();

const HomeNews = ({
  newsType = "pradesh-news",
  isAmp = false,
  News = [],
  lineUp,
  isElection,
  districtList,
}) => {
  const dataObj = { ...Data[newsType] };
  const [NewsData, setNewsData] = useState(News.length ? News : null);
  const [showStates, setShowStates] = useState(false);
  const [activeState, setActiveState] = useState(
    isAmp
      ? `/news/${lineUp?.[0]?.slug}/`
      : lineUp?.[0]?.slug
      ? `/news/${lineUp?.[0]?.slug}/`
      : "",
  );
  const [isLoading, setLoading] = useState(News.length == 0);
  const [currentState, setCurrentState] = useState(lineUp?.[0]?.slug);
  const changeState = (moreUrl, state) => {
    if (moreUrl !== activeState) {
      getData(state);
      setActiveState(moreUrl);
    }
    logEvent("select_state_pradesh", "Click", state);
    setCurrentState(state);
  };

  const handleShowChange = () => {
    setShowStates((prev) => !prev);
    if (!showStates) {
      logEvent("Top_Nav_Local18_district", "Click", "अपना शहर चुनें");
    }
  };

  const getData = async (cat) => {
    setLoading(true);
    const NewsData = await getArticles(
      {
        count: 5,
        category: cat ? cat : "statehome",
      },
      true
    );

    if (NewsData && NewsData.length) {
      setNewsData(NewsData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!News.length) {
      getData(lineUp?.[0]?.slug || dataObj["key"]);
    }
    if (newsType === "pradesh-news") {
      getData(lineUp?.[0]?.slug);
    }
    setActiveState(
      lineUp?.[0]?.slug ? `/news/${lineUp?.[0]?.slug}/` : dataObj["more-url"],
    );
  }, []);

  const getBigStoryData = (NewsData || News)[0];

  return (
    <>
      <div
        className={`globalhd ${isAmp ? "" : " clearfix "} ${
          newsType == "world-news" || newsType == "lifestyle-news"
            ? "no-border"
            : ""
        }`}
      >
        <h2>
          <a
            className="districtSelect"
            data-vars-event-category="Pradesh_click"
            data-vars-event-label="Homepage"
            onClick={() => logEvent("Pradesh_click", "Click", "Homepage")}
            href={lineUp?.[0]?.slug ? `/news/states/` : dataObj["more-url"]}
          >
            {dataObj["value"] === "प्रदेश" ? (
              isAmp ? (                
                <amp-img
                  src="/images/logos/local18Mob.png"
                  width={75}
                  height={28}
                  alt={'pradeshnews-logo'}
                  title={'pradeshnews-logo'}         
                />
              ) : (
                <img
                  src="/images/logos/local18Mob.png"
                  width="75px"
                  height="28px"
                />
              )              
            ) : (
              dataObj["value"]
            )}
          </a>
        </h2>
        {newsType === "money-news" && (
          <div className="moneycontrol-globalhd">
            <span>Powered by</span>
            <a
              href="https://www.moneycontrol.com/"
              rel="nofollow"
              target="_blank"
              onClick={logEvent("MC_logo", "Click", "Homepage")}
            >
              {!isAmp ? (
                <LazyLoadImage
                  src={STATIC_IMAGE.MONEY_CONTROL_LOGO}
                  alt="moneycontrol-logo"
                />
              ) : (
                <figure>                  
                  <LazyLoadImage
                    src={STATIC_IMAGE.MONEY_CONTROL_LOGO}
                    width={95}
                    height={20}
                    alt={'moneycontrol-logo'}
                    title={'moneycontrol-logo'}
                    isAMP={true}                         
                  />
                </figure>
              )}
            </a>
          </div>
        )}
        {newsType === "pradesh-news" && isAmp ? (
          <a
            className="chsstctbtn-forstatesection districtSelect hp_local18_select_state"
            data-vars-event-category="Select_city_Pradesh"
            data-vars-event-label="शहर चुनें"
            on="tap:AMP.setState({visible: !visible})"
          >
            राज्य/शहर चुनें
          </a>
        ) : newsType === "pradesh-news" ? (
          <a
            onClick={handleShowChange}
            className="chsstctbtn-forstatesection districtSelect hp_local18_select_state"
          >
            राज्य/शहर चुनें
          </a>
        ) : (
          ""
        )}
      </div>
      {dataObj &&
        Object.keys(dataObj).length > 0 &&
        dataObj["sub-list"] &&
        dataObj["sub-list"].length > 0 && (
          <ul className="globaltab dflx jstcntspcbtwn news-home-tab">
            {(lineUp && lineUp.length ? lineUp : dataObj["sub-list"]).map(
              (eachData, index) => {
                return (
                  <li
                    key={`subList-` + index}
                    className={`clkSub clkSubpradesh ${
                      activeState ===
                      (eachData.slug
                        ? `/news/${eachData.slug}/`
                        : eachData["more-url"])
                        ? "act"
                        : ""
                    }`}
                  >
                    <a
                      onClick={() =>
                        changeState(
                          eachData.slug
                            ? `/news/${eachData.slug}/`
                            : eachData["more-url"],
                          eachData.slug || eachData["key"],
                        )
                      }
                    >
                      {eachData.state_name || eachData["value"]}
                    </a>
                  </li>
                );
              },
            )}
          </ul>
        )}
      {(NewsData || News) && (NewsData || News).length > 0 ? (
        <>
          <div className="shrmobwrap">
            <div id="clkbuttonpradesh">
              <div className="bigstory">
                <a
                  href={
                    isElection
                      ? getBigStoryData?.["weburl"]?.replace(
                          DOMAIN_URL,
                          publicRuntimeConfig.siteUrl +
                            `${isAmp ? "amp/" : ""}`,
                        )
                      : getBigStoryData["weburl"]
                      ? getBigStoryData["weburl"].replace(
                          DOMAIN_URL,
                          publicRuntimeConfig.siteUrl +
                            `${isAmp ? "amp/" : ""}`,
                        )
                      : ""
                  }
                >
                  {isAmp ? (
                    <figure>
                      {getBigStoryData?.ff_source === "Hyperlocal" &&
                      getBigStoryData?.local18_video !== "" ? (
                        <em className="nwvideoicon"></em>
                      ) : (
                        ""
                      )}
                      <LazyLoadImage
                        src={getBigStoryData?.images?.url}
                        width={384}
                        height={256}
                        alt={getBigStoryData["display_headline"]}
                        title={getBigStoryData["display_headline"]}
                        isAMP={true}                         
                      />
                      {/* <amp-img
                        src={imageLoader(
                          getBigStoryData?.images?.url,
                          540,
                          360,
                        )}
                        alt={
                          getBigStoryData["display_headline"] ||
                          getBigStoryData["headline"] ||
                          ""
                        }
                        title={
                          getBigStoryData["display_headline"] ||
                          getBigStoryData["headline"] ||
                          ""
                        }
                        width={540}
                        height={360}
                        layout="responsive"
                      ></amp-img> */}
                    </figure>
                  ) : (
                    <div style={{ position: "relative" }}>
                      {getBigStoryData?.ff_source === "Hyperlocal" &&
                      getBigStoryData?.local18_video !== "" ? (
                        <em className="nwvideoicon"></em>
                      ) : (
                        ""
                      )}
                      <LazyLoadImage
                        width={360}
                        height={285}
                        src={getBigStoryData?.image?.url}
                        alt={
                          getBigStoryData["display_headline"] ||
                          getBigStoryData["headline"] ||
                          ""
                        }
                        title={
                          getBigStoryData["display_headline"] ||
                          getBigStoryData["headline"] ||
                          ""
                        }
                      />
                    </div>
                  )}
                </a>
                <h3>
                  <a
                    className="districtSelect"
                    href={
                      isElection
                        ? getBigStoryData?.weburl?.replace(
                            DOMAIN_URL,
                            publicRuntimeConfig.siteUrl +
                              `${isAmp ? "amp/" : ""}`,
                          )
                        : getBigStoryData["weburl"]
                        ? getBigStoryData["weburl"].replace(
                            DOMAIN_URL,
                            publicRuntimeConfig.siteUrl +
                              `${isAmp ? "amp/" : ""}`,
                          )
                        : ""
                    }
                    data-vars-event-category="select_story_pradesh"
                    data-vars-event-label={`${
                      getBigStoryData["display_headline"] ||
                      getBigStoryData["headline"]
                    },${getBigStoryData["id"]}`}
                    onClick={() =>
                      logEvent(
                        "select_story_pradesh",
                        "Click",
                        `${
                          getBigStoryData["display_headline"] ||
                          getBigStoryData["headline"]
                        },${getBigStoryData["id"]}`,
                      )
                    }
                  >
                    {getBigStoryData["display_headline"] ||
                      getBigStoryData["headline"]}
                  </a>
                </h3>
              </div>

              <div className="clearfix vsp10"></div>
              <ul className="global-storylist">
                {(NewsData || News).map((eachData, index) => {
                  return (
                    index !== 0 &&
                    index < 5 && (
                      <li key={`subStory-` + index}>
                        <a
                          className="districtSelect"
                          href={
                            isElection
                              ? eachData["weburl"]?.replace(
                                  DOMAIN_URL,
                                  publicRuntimeConfig.siteUrl +
                                    `${isAmp ? "amp/" : ""}`,
                                )
                              : eachData["weburl"]
                              ? eachData["weburl"].replace(
                                  DOMAIN_URL,
                                  publicRuntimeConfig.siteUrl +
                                    `${isAmp ? "amp/" : ""}`,
                                )
                              : ""
                          }
                          data-vars-event-category="select_story_pradesh"
                          data-vars-event-label={`${
                            eachData?.display_headline ||
                            eachData?.headline ||
                            eachData?.headline
                          },${eachData.id}`}
                          onClick={() =>
                            logEvent(
                              "select_story_pradesh",
                              "Click",
                              `${
                                eachData?.display_headline ||
                                eachData?.headline ||
                                eachData?.headline
                              },${eachData.id}`,
                            )
                          }
                        >
                          {isAmp ? (
                            <figure>
                              {(NewsData || News)[index]?.ff_source ==
                                "Hyperlocal" &&
                              (NewsData || News)[index]?.local18_video != "" ? (
                                <em className="nwvideoicon"></em>
                              ) : (
                                ""
                              )}
                              <LazyLoadImage
                                src={eachData?.images?.url}
                                width={81}
                                height={54}
                                alt={eachData['display_headline'] || eachData['headline'] || ''}
                                title={eachData['display_headline'] || eachData['headline'] || ''}
                                isAMP={true}
                              />
                              {/* <amp-img
                                src={imageLoader(eachData?.images?.url, 81, 54)}
                                alt={
                                  eachData["display_headline"] ||
                                  eachData["headline"] ||
                                  ""
                                }
                                title={
                                  eachData["display_headline"] ||
                                  eachData["headline"] ||
                                  ""
                                }
                                width={81}
                                height={54}
                                layout="responsive"
                              ></amp-img> */}
                            </figure>
                          ) : (
                            <div style={{ position: "relative" }}>
                              {(NewsData || News)[index]?.ff_source ==
                                "Hyperlocal" &&
                              (NewsData || News)[index]?.local18_video != "" ? (
                                <em className="nwvideoicon"></em>
                              ) : (
                                ""
                              )}
                              <LazyLoadImage
                                width={80}
                                height={54}
                                src={eachData?.images?.url}
                                alt={
                                  eachData["display_headline"] ||
                                  eachData["headline"] ||
                                  ""
                                }
                                title={
                                  eachData["display_headline"] ||
                                  eachData["headline"] ||
                                  ""
                                }
                                className={"globalmgbox"}
                              />
                            </div>
                          )}
                          {eachData["display_headline"] || eachData["headline"]}
                        </a>
                      </li>
                    )
                  );
                })}
              </ul>
            </div>

            <a
              data-vars-event-category="read_more_pradesh"
              data-vars-event-label={`${lineUp?.[0]?.slug}`}
              href={
                dataObj["more-url"] ? dataObj["more-url"] : lineUp?.[0]?.slug
              }
              onClick={() =>
                logEvent("read_more_pradesh", "Click", currentState)
              }
              className="aurparhenbtn districtSelect"
            >
              {TEXT.READ_MORE}
            </a>

            {!isAmp && newsType === "bollywood-news" && (
              <a
                onClick={() =>
                  logEvent(
                    "WhatsApp Banner",
                    "Click",
                    `WhatsApp Banner – Homepage`,
                  )
                }
                href="https://wa.link/su7d58"
              >
                <img
                  id="whatsappBanner"
                  loading="lazy"
                  src={STATIC_IMAGE.WATSAPP_BANNER}
                ></img>
              </a>
            )}
            {isAmp && newsType === "pradesh-news" && (
              <div
                className="district-sidebar-new"
                data-amp-bind-class="!visible ?'district-sidebar-new':'district-container-hide'"
              >
                <SelectStateAmpNew
                  showStates={true}
                  districtList={districtList}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {!isAmp ? (
            <div className="skeleton-background home-news-skeleton">
              <ul>
                <li>
                  <Skeleton height={309} />
                </li>
                <li>
                  <Skeleton height={60} />
                </li>
                <li>
                  <Skeleton height={60} />
                </li>
                <li>
                  <Skeleton height={60} />
                </li>
                <li>
                  <Skeleton height={60} />
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </>
      )}
      <style jsx global>{`
        .skeleton-background {
          border-radius: 10px;
          padding: 5px;
          background-color: rgba(0, 0, 0, 0.03);
          overflow: hidden;
        }
        .home-news-skeleton ul li {
          margin: 10px 0;
        }
        .home-news-skeleton ul li:first-child {
          margin: 0 0 10px;
        }
        .news-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 630px;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
          margin-bottom: 25px;
        }
        .globalhd {
          border-bottom: 1px solid #001536;
          position: relative;
          display: flex;
          width: 100%;
          padding-bottom: 5px;
          margin-bottom: 10px;
          margin-top: 20px;
          ${isAmp ? "font-family: Khand;" : ""}
        }
        .clearfix {
          clear: both;
        }
        .globalhd:before {
          content: "";
          width: 15px;
          height: 3px;
          background: #ed1c24;
          position: absolute;
          left: 0;
          bottom: -2px;
        }
        .clearfix::after,
        .clearfix::before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .globalhd h2 {
          color: #001536;
          font-size: 20px;
          font-weight: 700;
          display: inline-block;
          flex-shrink: 0;
          line-height: 20px;
        }
        .globalhd h2 a {
          color: #001536;
        }
        .globaltab {
          overflow: scroll;
          margin-bottom: 10px;
        }
        .jstcntspcbtwn {
          justify-content: space-between;
        }
        .dflx {
          display: flex;
        }
        .globaltab li.act {
          font-weight: 700;
        }
        .globaltab li {
          flex-shrink: 0;
        }
        .globaltab li.act a {
          border: 1px solid #ed1c24;
          color: #ed1c24;
        }
        .globaltab li a {
          color: #333;
          display: block;
          border: 1px solid #fff;
          border-radius: 20px;
          line-height: 26px;
          padding: 0 10px;
          font-size: 13px;
          outline: 0;
        }
        .bigstory {
          clear: both;
          background: #f3f3f3;
          position: relative;
          height: 267px;
        }
        .bigstory figure {
          position: relative;
          overflow: hidden;
          line-height: 0;
          height: 267px;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .bigstory figure img {
          width: 100%;
        }
        .bigstory h3 {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, #111, #000);
          background: -webkit-linear-gradient(transparent, #111, #000);
          background: -moz-linear-gradient(transparent, #111, #000);
          padding: ${isAmp ? "45px 15px 10px 15px" : "45px 20px 10px 20px"};
          z-index: 1
        }
        .bigstory h3 a {
          display: block;
          font-size: 18px;
          line-height: 24px;
          color: #fff;
          font-weight: 700;
        }
        .vsp10 {
          margin-top: 10px;
        }
        .global-storylist {
          margin-bottom: 10px;
        }
        .global-storylist li:first-child {
          /* margin-top: -12px;
          padding-top: 12px;
          */
        }
        ul.global-storylist li {
          position: relative;
        }
        .global-storylist li {
          font-size: 16px;
          line-height: ${isAmp ? "21px" : "20px"};
          padding: 12px 0;
          width: 100%;
          border-bottom: 1px solid #ccc;
          ${isAmp ? "font-weight: bold;" : ""}
        }
        ul.global-storylist li h3 {
          font-size: 16px;
          font-weight: normal;
          ${isAmp
            ? `
          line-height: 21px;`
            : ``}
        }
        .global-storylist li a {
          display: flex;
          ${isAmp
            ? `
          align-items: flex-start;
          justify-content: space-between;
          padding-left: 10px;
          font-weight: bold;`
            : `align-items: center;`}
          color: #222;
          font-weight: bold;
        }
        .global-storylist li figure {
          position: relative;
          width: 80px;
          height: 53px;
          background: #eee;
          flex-shrink: 0;
          ${isAmp ? "margin-left: 10px;" : "margin-right: 10px;"}
        }
        .globalmgbox {
          position: relative;
          overflow: hidden;
          line-height: 0;
        }
        .globaltab.dflx.jstcntspcbtwn {
          padding-bottom: 15px;
        }
        .moneycontrol-globalhd {
          display: flex;
          align-items: center;
          padding-left: 20px;
        }
        .moneycontrol-globalhd span {
          display: block;
          font-size: 12px;
          color: #8a8989;
          padding-bottom: 4px;
          width: 70px;
        }
        .moneycontrol-globalhd a {
          display: block;
          ${isAmp ? "width: 95px;" : ""}
        }
        .moneycontrol-globalhd img {
          width: 95px;
        }
        .no-border {
          border: none;
        }
        .aurparhenbtn {
          color: #ed1c24;
          border: 1px solid #ed1c24;
          border-radius: 20px;
          height: 26px;
          line-height: 26px;
          font-weight: 700;
          font-size: 14px;
          outline: 0;
          box-sizing: border-box;
          display: block;
          ${isAmp
            ? "margin: 15px auto 30px auto;"
            : "margin: 15px auto 20px auto;"}
          width: 105px;
          overflow: hidden;
          text-align: center;
        }
        .chsstctbtn-forstatesection {
          color: #c6080f;
          font-weight: bold;
          font-size: 13px;
          height: 34px;
          line-height: 34px;
          padding: 0 35px 0 8px;
          box-sizing: border-box;
          background: #fff
            url(/images/siteimages/pinicon_1607493634.png)
            92% 50% no-repeat;
          position: absolute;
          top: 4px;
          right: 0;
          box-shadow: none;
          border-bottom: 3px solid #ee1c25;
        }

        body.adclstpchsstctbody {
          overflow: hidden;
        }
        .autosuggest {
          width: 100% ${!isAmp ? "!important" : ""};
          text-align: left;
          height: 500px;
          overflow: hidden;
        }
        .autosuggest .autoboxinner {
          width: 100%;
          height: 99%;
          overflow: auto;
          padding-right: 15px;
        }
        .autosuggest1 {
          display: none ${!isAmp ? "!important" : ""};
        }
        .autosuggest a {
          float: left;
          padding: 10px 0px;
          cursor: pointer;
          width: 120px;
          text-align: center;
          width: 14.282%;
        }

        .no-result-found {
          padding-bottom: 3px;
        }
        ul.news-home-tab {
          display: ${!isAmp ? "flex" : "none"};
        }
        .nwvideoicon {
          width: 45px;
          height: 45px;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          margin: -22px 0 0 -22px;
          cursor: pointer;
          opacity: 0.7;
          background: url(/images/siteimages/video-iconnew.png)
            0 0 no-repeat;
          transform: scale(0.6);
        }
        .nwvdicn {
          background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/video-iconh.png)
            0 0 no-repeat;
          width: 20px;
          height: 20px;
          background-size: 20px;
          position: absolute;
          left: 30px;
          top: 30px;
          filter: grayscale(100);
        }
        #whatsappBanner {
          width: 100%;
        }
        .shrmobwrap {
          position: relative;
        }
        .district-sidebar-new {
          display: none;
        }
        .district-container-hide {
          display: block;
        }
      `}</style>
    </>
  );
};

export default HomeNews;
