import React, { useState, useEffect } from "react";
import Head from "next/head";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import moment from "moment";
import {
  recordsCountWithPostType,
  recordsGroupByWithTime,
  NewsSVG,
  PhotoGallerySVG,
  VideoSVG,
  WebStory,
  Refresh,
  truncateString,
  NewsSVGData,
  PhotoGallerySVGData,
  VideoSVGData,
  WebStorySVGData,
  LiveBlogSVGData,
} from "includes/newsFeed.helper";
import {
  getArticleListWithFilterRange,
  getArticleListWithCount,
  getWebStoryWithCount,
} from "api/global/Common";
import { logEvent } from "includes/googleAnalytic";
import Skeleton from "react-loading-skeleton";
const NewsFeed = ({ data = {} }) => {
  const {
    breadCrumbArray,
    currentDateObj,
    oneDayBackDateObj,
    twoDayBackDateObj,
    currentDateRecord,
    oneDayaBackRecord,
    twoDayBackRecord,
    recordTypeInCurrentDate,
    recordTypeInOneDayBackDate,
    recordTypeInTwoDayBackDate,
    recordGroupByWithTimeCurrentDate,
    recordGroupByWithTimeOneDayBackDate,
    recordGroupByWithTimeTwoDayBackDate,
  } = data;
  const [checkedIds, setCheckedId] = useState([
    { tabFlag0: false, countFlag0: true },
    { tabFlag1: false, countFlag1: true },
    { tabFlag2: false, countFlag2: true },
  ]);
  const [currentDateData, setCurrentDateData] = useState(
    currentDateRecord || []
  );
  const [oneDayBackData, setOneDayBackData] = useState(oneDayaBackRecord || []);
  const [twoDayBackData, setTwoDayBackData] = useState(twoDayBackRecord || []);
  const [currentDateRecordTypeList, setCurrentDateRecordTypeList] = useState({
    text: -1,
    photogallery: -1,
    videos: -1,
    webStory: -1,
  });
  const [oneDayBackRecordTypeList, setOneDayBacRecordTypeList] = useState({
    text: -1,
    photogallery: -1,
    videos: -1,
    webStory: -1,
  });
  const [twoDayBackRecordTypeList, setTwoDayBackRecordTypeList] = useState({
    text: -1,
    photogallery: -1,
    videos: -1,
    webStory: -1,
  });
  const [currentDateList, setCurrentDateList] = useState(
    recordGroupByWithTimeCurrentDate || []
  );
  const [oneDayBackList, setOneDayBackList] = useState(
    recordGroupByWithTimeOneDayBackDate || []
  );
  const [twoDayBackList, setTwoDayBackList] = useState(
    recordGroupByWithTimeTwoDayBackDate || []
  );
  // const displayDate = (date) => {
  //   return moment(new Date(date)).format("hh:mm A");
  // };
  //count for current Date
  useEffect(async () => {
    const [record_News, record_photos, record_videos, record_webStory] =
      await Promise.all([
        getArticleListWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: currentDateObj.gte,
                lte: currentDateObj.lte,
              },
            },
            filter: { post_type: "text" },
          },
          true
        ),
        getArticleListWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: currentDateObj.gte,
                lte: currentDateObj.lte,
              },
            },
            filter: { post_type: "photogallery" },
          },
          true
        ),
        getArticleListWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: currentDateObj.gte,
                lte: currentDateObj.lte,
              },
            },
            filter: { post_type: "videos" },
          },
          true
        ),
        getWebStoryWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: currentDateObj.gte,
                lte: currentDateObj.lte,
              },
            },
          },
          true
        ),
      ]);
    setCurrentDateRecordTypeList({
      text: record_News?.count,
      photogallery: record_photos?.count,
      videos: record_videos?.count,
      webStory: record_webStory?.count,
    });
    checkedIds[0].tabFlag0 = !checkedIds[0].tabFlag0;
    checkedIds[0].countFlag0 = !checkedIds[0].countFlag0;
    setCheckedId(() => [...checkedIds]);
  }, []);
  //count for One Day Back
  useEffect(async () => {
    const [record_News, record_photos, record_videos, record_webStory] =
      await Promise.all([
        getArticleListWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: oneDayBackDateObj.gte,
                lte: oneDayBackDateObj.lte,
              },
            },
            filter: { post_type: "text" },
          },
          true
        ),
        getArticleListWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: oneDayBackDateObj.gte,
                lte: oneDayBackDateObj.lte,
              },
            },
            filter: { post_type: "photogallery" },
          },
          true
        ),
        getArticleListWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: oneDayBackDateObj.gte,
                lte: oneDayBackDateObj.lte,
              },
            },
            filter: { post_type: "videos" },
          },
          true
        ),
        getWebStoryWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: oneDayBackDateObj.gte,
                lte: oneDayBackDateObj.lte,
              },
            },
          },
          true
        ),
      ]);
    setOneDayBacRecordTypeList({
      text: record_News?.count,
      photogallery: record_photos?.count,
      videos: record_videos?.count,
      webStory: record_webStory?.count,
    });
  }, []);
  //count for Two Day Back
  useEffect(async () => {
    const [record_News, record_photos, record_videos, record_webStory] =
      await Promise.all([
        getArticleListWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: twoDayBackDateObj.gte,
                lte: twoDayBackDateObj.lte,
              },
            },
            filter: { post_type: "text" },
          },
          true
        ),
        getArticleListWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: twoDayBackDateObj.gte,
                lte: twoDayBackDateObj.lte,
              },
            },
            filter: { post_type: "photogallery" },
          },
          true
        ),
        getArticleListWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: twoDayBackDateObj.gte,
                lte: twoDayBackDateObj.lte,
              },
            },
            filter: { post_type: "videos" },
          },
          true
        ),
        getWebStoryWithCount(
          {
            countOption: true,
            filterRange: {
              created_at: {
                gte: twoDayBackDateObj.gte,
                lte: twoDayBackDateObj.lte,
              },
            },
          },
          true
        ),
      ]);
    setTwoDayBackRecordTypeList({
      text: record_News?.count,
      photogallery: record_photos?.count,
      videos: record_videos?.count,
      webStory: record_webStory?.count,
    });
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
      <div className="nf_head_wrap">
        <h1 className="nf_head">न्यूज फ़ीड </h1>
        <span
          className="refrsh_btn"
          onClick={() => {
            window.location.reload();
            logEvent("News_Feed", "Click", "Button Refresh");
          }}
        >
          REFRESH
          <Refresh />
        </span>
      </div>
      <section className="accordion">
        {/* current Date */}
        <div className="nftab">
          <input
            type="checkbox"
            name="accordion-1"
            id="cb1"
            checked={checkedIds[0]?.tabFlag0}
            onClick={() => {
              if (checkedIds[0].tabFlag0) {
                logEvent(
                  "News_Feed",
                  "Click",
                  "Menu Collapsed,https://hindi.news18.com/news-feed/"
                );
              } else {
                logEvent(
                  "News_Feed",
                  "Click",
                  "Menu Expand,https://hindi.news18.com/news-feed/"
                );
              }
              checkedIds[0].tabFlag0 = !checkedIds[0].tabFlag0;
              checkedIds[0].countFlag0 = !checkedIds[0].countFlag0;
              setCheckedId(() => [...checkedIds]);
            }}
          />
          <label htmlFor="cb1" className="nftab__label">
            {moment(new Date()).format("dddd") +
              ", " +
              moment(new Date()).format("DD") +
              " " +
              moment(new Date()).format("MMM") +
              " " +
              moment(new Date()).format("YYYY")}{" "}
          </label>
          <div className="nftab__content">
            {Object.keys(currentDateList || {})?.map((item, index) => {
              const record = currentDateList[item] || [];
              return (
                <ul className="nftop_nwrgt">
                  {record?.map((val, i) => {
                    const cat =
                      Array.isArray(val?.categories) &&
                      val?.categories?.length > 0
                        ? val?.categories[0]?.slug
                        : val?.categories !== ""
                        ? val?.categories
                        : "";
                    const ff_source =
                      val?.ff_source === "Hyperlocal"
                        ? "local18"
                        : "non-local18";
                    const type =
                      val?.post_type === "text"
                        ? "article"
                        : val?.post_type === "photogallery"
                        ? "photogallery"
                        : val?.post_type === "videos"
                        ? "video"
                        : val?.id?.includes("webstory")
                        ? "webstory"
                        : "";
                    const label =
                      (val?.headline || val?.hindi_title) +
                      "," +
                      (val?.story_id || val?.id) +
                      "," +
                      cat +
                      "," +
                      ff_source +
                      "," +
                      type;
                    return (
                      <li
                        key={item + i}
                        onClick={() => {
                          logEvent("News_Feed", "Click", label);
                        }}
                      >
                        {i === 0 && (
                          <span className="time">
                            {moment(item).format("hh:mm A")} (IST)
                          </span>
                        )}
                        <span className="updats">
                          {val?.created_at === val?.updated_at
                            ? "New"
                            : "Updated"}
                        </span>
                        <a href={val?.weburl || val?.web_url}>
                          <h3>
                            {val?.liveblog_switcher === 1
                              ? val.headline
                              : val?.display_headline || val?.hindi_title}
                          </h3>
                          <span>
                            {truncateString(
                              val?.intro || val?.blog_content,
                              160
                            )}
                          </span>
                          {val?.liveblog_switcher === 1 ? (
                            <LiveBlogSVGData />
                          ) : val?.post_type === "text" ? (
                            <NewsSVGData />
                          ) : val?.post_type === "photogallery" ? (
                            <PhotoGallerySVGData />
                          ) : val?.post_type === "videos" ? (
                            <VideoSVGData />
                          ) : val?.id?.includes("webstory") ? (
                            <WebStorySVGData />
                          ) : null}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
            <button
              for="cb1"
              onClick={async () => {
                const offset = currentDateData?.length;
                const result = await getArticleListWithFilterRange(
                  {
                    count: 10,
                    offset: offset,
                    fields:
                      "story_id,headline,display_headline,title,post_type,weburl,intro,created_at,updated_at,liveblog_switcher,categories,ff_source,feature_img,keyword,web_url,hindi_title,blog_content,id",
                    filterRange: {
                      created_at: {
                        gte: currentDateObj.gte,
                        lte: currentDateObj.lte,
                      },
                    },
                    filter: { not: { ff_source: "Hyperlocal" } },
                  },
                  true
                );
                if (result?.length > 0) {
                  setCheckedId(() => [...checkedIds]);
                  const newCatData = [...currentDateData, ...result];
                  const recordType = recordsCountWithPostType(newCatData || []);
                  setCurrentDateData(() => newCatData);
                  //setCurrentDateRecordTypeList(() => recordType);
                  const data = recordsGroupByWithTime(newCatData || []);
                  setCurrentDateList(() => data);
                }
              }}
              className="load_more"
            >
              Load More
            </button>
          </div>
        </div>
        {checkedIds[0]?.countFlag0 && (
          <div className="nfcount_wrap">
            <div>
              {currentDateRecordTypeList?.text > -1 ? (
                <>
                  <NewsSVG />
                  <div className="nfcount">
                    <span>
                      {currentDateRecordTypeList?.text === -1
                        ? 0
                        : currentDateRecordTypeList?.text}
                    </span>
                    <br />
                    न्यूज
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
            <div>
              {currentDateRecordTypeList?.photogallery > -1 ? (
                <>
                  <PhotoGallerySVG />
                  <div className="nfcount">
                    <span>
                      {currentDateRecordTypeList?.photogallery === -1
                        ? 0
                        : currentDateRecordTypeList?.photogallery}
                    </span>
                    <br />
                    फोटो गैलरी
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
            <div>
              {currentDateRecordTypeList?.videos > -1 ? (
                <>
                  <VideoSVG />
                  <div className="nfcount">
                    <span>
                      {currentDateRecordTypeList?.videos === -1
                        ? 0
                        : currentDateRecordTypeList?.videos}
                    </span>
                    <br />
                    वीडियो
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
            <div>
              {currentDateRecordTypeList?.webStory > -1 ? (
                <>
                  <WebStory />
                  <div className="nfcount">
                    <span>
                      {currentDateRecordTypeList?.webStory === -1
                        ? 0
                        : currentDateRecordTypeList?.webStory}
                    </span>
                    <br />
                    वेब स्टोरीज
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
          </div>
        )}
        {/* oneDay back Date */}
        <div className="nftab">
          <input
            type="checkbox"
            name="accordion-1"
            id="cb2"
            checked={checkedIds[1]?.tabFlag1}
            onClick={() => {
              if (checkedIds[1].tabFlag1) {
                logEvent(
                  "News_Feed",
                  "Click",
                  "Menu Collapsed,https://hindi.news18.com/news-feed/"
                );
              } else {
                logEvent(
                  "News_Feed",
                  "Click",
                  "Menu Expand,https://hindi.news18.com/news-feed/"
                );
              }
              checkedIds[1].tabFlag1 = !checkedIds[1].tabFlag1;
              checkedIds[1].countFlag1 = !checkedIds[1].countFlag1;
              setCheckedId(() => [...checkedIds]);
            }}
          />
          <label htmlFor="cb2" className="nftab__label">
            {moment(new Date()).subtract(1, "days").format("dddd") +
              ", " +
              moment(new Date()).subtract(1, "days").format("DD") +
              " " +
              moment(new Date()).subtract(1, "days").format("MMM") +
              " " +
              moment(new Date()).subtract(1, "days").format("YYYY")}{" "}
          </label>
          <div className="nftab__content">
            {Object.keys(oneDayBackList || {})?.map((item, index) => {
              const record = oneDayBackList[item] || [];
              return (
                <ul className="nftop_nwrgt">
                  {record?.map((val, i) => {
                    const cat =
                      Array.isArray(val?.categories) &&
                      val?.categories?.length > 0
                        ? val?.categories[0]?.slug
                        : val?.categories !== ""
                        ? val?.categories
                        : "";
                    const ff_source =
                      val?.ff_source === "Hyperlocal"
                        ? "local18"
                        : "non-local18";
                    const type =
                      val?.post_type === "text"
                        ? "article"
                        : val?.post_type === "photogallery"
                        ? "photogallery"
                        : val?.post_type === "videos"
                        ? "video"
                        : val?.id?.includes("webstory")
                        ? "webstory"
                        : "";
                    const label =
                      (val?.headline || val?.hindi_title) +
                      "," +
                      (val?.story_id || val?.id) +
                      "," +
                      cat +
                      "," +
                      ff_source +
                      "," +
                      type;
                    return (
                      <li
                        key={item + i}
                        onClick={() => {
                          logEvent("News_Feed", "Click", label);
                        }}
                      >
                        {i === 0 && (
                          <span className="time">
                            {moment(item).format("hh:mm A")} (IST)
                          </span>
                        )}
                        <span className="updats">
                          {val?.created_at === val?.updated_at
                            ? "New"
                            : "Updated"}
                        </span>
                        <a href={val?.weburl || val?.web_url}>
                          <h3>
                            {val?.liveblog_switcher === 1
                              ? val.headline
                              : val?.display_headline || val?.hindi_title}
                          </h3>
                          <span>
                            {truncateString(
                              val?.intro || val?.blog_content,
                              160
                            )}
                          </span>
                          {val?.liveblog_switcher === 1 ? (
                            <LiveBlogSVGData />
                          ) : val?.post_type === "text" ? (
                            <NewsSVGData />
                          ) : val?.post_type === "photogallery" ? (
                            <PhotoGallerySVGData />
                          ) : val?.post_type === "videos" ? (
                            <VideoSVGData />
                          ) : val?.id?.includes("webstory") ? (
                            <WebStorySVGData />
                          ) : null}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
            <button
              for="cb2"
              onClick={async () => {
                const offset = oneDayBackData?.length;
                const result = await getArticleListWithFilterRange(
                  {
                    count: 10,
                    offset: offset,
                    fields:
                      "story_id,headline,display_headline,title,post_type,weburl,intro,created_at,updated_at,liveblog_switcher,categories,ff_source,feature_img,keyword,web_url,hindi_title,blog_content,id",
                    filterRange: {
                      created_at: {
                        gte: oneDayBackDateObj.gte,
                        lte: oneDayBackDateObj.lte,
                      },
                    },
                    filter: { not: { ff_source: "Hyperlocal" } },
                  },
                  true
                );
                if (result?.length > 0) {
                  setCheckedId(() => [...checkedIds]);
                  const newCatData = [...oneDayBackData, ...result];
                  const recordType = recordsCountWithPostType(newCatData || []);
                  setOneDayBackData(() => newCatData);
                  //setOneDayBacRecordTypeList(() => recordType);
                  const data = recordsGroupByWithTime(newCatData || []);
                  setOneDayBackList(() => data);
                }
              }}
              className="load_more"
            >
              Load More
            </button>
          </div>
        </div>
        {checkedIds[1]?.countFlag1 && (
          <div className="nfcount_wrap">
            <div>
              {oneDayBackRecordTypeList?.text > -1 ? (
                <>
                  <NewsSVG />
                  <div className="nfcount">
                    <span>
                      {oneDayBackRecordTypeList?.text === -1
                        ? 0
                        : oneDayBackRecordTypeList?.text}
                    </span>
                    <br />
                    न्यूज
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
            <div>
              {oneDayBackRecordTypeList?.photogallery > -1 ? (
                <>
                  <PhotoGallerySVG />
                  <div className="nfcount">
                    <span>
                      {oneDayBackRecordTypeList?.photogallery === -1
                        ? 0
                        : oneDayBackRecordTypeList?.photogallery}
                    </span>
                    <br />
                    फोटो गैलरी
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
            <div>
              {oneDayBackRecordTypeList?.videos > -1 ? (
                <>
                  <VideoSVG />
                  <div className="nfcount">
                    <span>
                      {oneDayBackRecordTypeList?.videos === -1
                        ? 0
                        : oneDayBackRecordTypeList?.videos}
                    </span>
                    <br />
                    वीडियो
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
            <div>
              {oneDayBackRecordTypeList?.webStory > -1 ? (
                <>
                  <WebStory />
                  <div className="nfcount">
                    <span>
                      {oneDayBackRecordTypeList?.webStory === -1
                        ? 0
                        : oneDayBackRecordTypeList?.webStory}
                    </span>
                    <br />
                    वेब स्टोरीज
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
          </div>
        )}
        {/* twoDay back Date */}
        <div className="nftab">
          <input
            type="checkbox"
            name="accordion-1"
            id="cb3"
            checked={checkedIds[2]?.tabFlag2}
            onClick={() => {
              if (checkedIds[2].tabFlag2) {
                logEvent(
                  "News_Feed",
                  "Click",
                  "Menu Collapsed,https://hindi.news18.com/news-feed/"
                );
              } else {
                logEvent(
                  "News_Feed",
                  "Click",
                  "Menu Expand,https://hindi.news18.com/news-feed/"
                );
              }
              checkedIds[2].tabFlag2 = !checkedIds[2].tabFlag2;
              checkedIds[2].countFlag2 = !checkedIds[2].countFlag2;
              setCheckedId(() => [...checkedIds]);
            }}
          />
          <label htmlFor="cb3" className="nftab__label">
            {moment(new Date()).subtract(2, "days").format("dddd") +
              ", " +
              moment(new Date()).subtract(2, "days").format("DD") +
              " " +
              moment(new Date()).subtract(2, "days").format("MMM") +
              " " +
              moment(new Date()).subtract(2, "days").format("YYYY")}{" "}
          </label>
          <div className="nftab__content">
            {Object.keys(twoDayBackList || {})?.map((item, index) => {
              const record = twoDayBackList[item] || [];
              return (
                <ul className="nftop_nwrgt">
                  {record?.map((val, i) => {
                    const cat =
                      Array.isArray(val?.categories) &&
                      val?.categories?.length > 0
                        ? val?.categories[0]?.slug
                        : val?.categories !== ""
                        ? val?.categories
                        : "";
                    const ff_source =
                      val?.ff_source === "Hyperlocal"
                        ? "local18"
                        : "non-local18";
                    const type =
                      val?.post_type === "text"
                        ? "article"
                        : val?.post_type === "photogallery"
                        ? "photogallery"
                        : val?.post_type === "videos"
                        ? "video"
                        : val?.id?.includes("webstory")
                        ? "webstory"
                        : "";
                    const label =
                      (val?.headline || val?.hindi_title) +
                      "," +
                      (val?.story_id || val?.id) +
                      "," +
                      cat +
                      "," +
                      ff_source +
                      "," +
                      type;
                    return (
                      <li
                        key={item + i}
                        onClick={() => {
                          logEvent("News_Feed", "Click", label);
                        }}
                      >
                        {i === 0 && (
                          <span className="time">
                            {moment(item).format("hh:mm A")} (IST)
                          </span>
                        )}
                        <span className="updats">
                          {val?.created_at === val?.updated_at
                            ? "New"
                            : "Updated"}
                        </span>
                        <a href={val?.weburl || val?.web_url}>
                          <h3>
                            {val?.liveblog_switcher === 1
                              ? val.headline
                              : val?.display_headline || val?.hindi_title}
                          </h3>
                          <span>
                            {truncateString(
                              val?.intro || val?.blog_content,
                              160
                            )}
                          </span>
                          {val?.liveblog_switcher === 1 ? (
                            <LiveBlogSVGData />
                          ) : val?.post_type === "text" ? (
                            <NewsSVGData />
                          ) : val?.post_type === "photogallery" ? (
                            <PhotoGallerySVGData />
                          ) : val?.post_type === "videos" ? (
                            <VideoSVGData />
                          ) : val?.id?.includes("webstory") ? (
                            <WebStorySVGData />
                          ) : null}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
            <button
              for="cb2"
              onClick={async () => {
                const offset = twoDayBackData?.length;
                const result = await getArticleListWithFilterRange(
                  {
                    count: 10,
                    offset: offset,
                    fields:
                      "story_id,headline,display_headline,title,post_type,weburl,intro,created_at,updated_at,liveblog_switcher,categories,ff_source,feature_img,keyword,web_url,hindi_title,blog_content,id",
                    filterRange: {
                      created_at: {
                        gte: twoDayBackDateObj.gte,
                        lte: twoDayBackDateObj.lte,
                      },
                    },
                    filter: { not: { ff_source: "Hyperlocal" } },
                  },
                  true
                );
                if (result?.length > 0) {
                  setCheckedId(() => [...checkedIds]);
                  const newCatData = [...twoDayBackData, ...result];
                  const recordType = recordsCountWithPostType(newCatData || []);
                  setTwoDayBackData(() => newCatData);
                  //setTwoDayBackRecordTypeList(() => recordType);
                  const data = recordsGroupByWithTime(newCatData || []);
                  setTwoDayBackList(() => data);
                }
              }}
              className="load_more"
            >
              Load More
            </button>
          </div>
        </div>
        {checkedIds[2]?.countFlag2 && (
          <div className="nfcount_wrap">
            <div>
              {twoDayBackRecordTypeList?.text > -1 ? (
                <>
                  <NewsSVG />
                  <div className="nfcount">
                    <span>
                      {twoDayBackRecordTypeList?.text === -1
                        ? 0
                        : twoDayBackRecordTypeList?.text}
                    </span>
                    <br />
                    न्यूज
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
            <div>
              {twoDayBackRecordTypeList?.photogallery > -1 ? (
                <>
                  <PhotoGallerySVG />
                  <div className="nfcount">
                    <span>
                      {twoDayBackRecordTypeList?.photogallery === -1
                        ? 0
                        : twoDayBackRecordTypeList?.photogallery}
                    </span>
                    <br />
                    फोटो गैलरी
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
            <div>
              {twoDayBackRecordTypeList?.videos > -1 ? (
                <>
                  <VideoSVG />
                  <div className="nfcount">
                    <span>
                      {twoDayBackRecordTypeList?.videos === -1
                        ? 0
                        : twoDayBackRecordTypeList?.videos}
                    </span>
                    <br />
                    वीडियो
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
            <div>
              {twoDayBackRecordTypeList?.webStory > -1 ? (
                <>
                  <WebStory />
                  <div className="nfcount">
                    <span>
                      {twoDayBackRecordTypeList?.webStory === -1
                        ? 0
                        : twoDayBackRecordTypeList?.webStory}
                    </span>
                    <br />
                    वेब स्टोरीज
                  </div>
                </>
              ) : (
                <div className="nfcount">
                  <Skeleton className="skeleton" />
                </div>
              )}
            </div>
          </div>
        )}
      </section>{" "}
      <style jsx global>{`
        .skeleton {
          border: 1px solid #d5d5d5;
          border-radius: 6px;
          width: 79px;
          height: 79px;
          display: flex;
          padding: 0px 0 0;
          justify-content: center;
          align-items: center;
          margin-top: 0px;
        }
        .load_more {
          width: 130px;
          height: 38px;
          background: #ed1c24;
          border-radius: 19px;
          font-size: 17px;
          color: #ffffff;
          line-height: 38px;
          border: none;
          display: table;
          margin: 0 auto 10px;
          cursor: pointer;
        }
        .side_srt_gllry {
          margin: 15px 0 !important;
          height: auto;
        }
        body {
          margin: auto;
          background: #fff;
          font-family: "Mukta", sans-serif;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        li {
          list-style: none;
        }
        a {
          text-decoration: none;
        }
        a img {
          border: none;
        }
        .clearfix {
          clear: both;
        }
        .clearfix::after,
        .clearfix::before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0px;
        }
        figure {
          position: relative;
          line-height: 0;
          flex-shrink: 0;
          overflow: hidden;
        }
        button {
          cursor: pointer;
          font-size: 0;
          border: 0;
          outline: none;
        }
        figure img {
          border-radius: 4px;
        }
        a {
          color: #000;
        }
        .newcontainer {
          max-width: 1244px;
          margin: auto;
        }
        .vsp30 {
          height: 30px;
          line-height: 0;
        }
        /* devanagari start*/
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
            format("woff2");
          unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
            U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
        }
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2)
            format("woff2");
          unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
            U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
        }
        /* devanagari end*/
        /* latin start*/
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 400;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnBrXw_1669353352.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 700;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin end*/
        .nf_head {
          font-size: 20px;
          line-height: 18px;
          color: #001d42;
          text-transform: uppercase;
          margin: 10px 0;
        }
        .nftab input {
          position: absolute;
          opacity: 0;
          z-index: -1;
        }
        .nftab__content {
          max-height: 0;
          overflow: hidden;
          transition: all 0.35s;
        }
        .nftab input:checked ~ .nftab__content {
          max-height: max-content;
        }
        .accordion {
          color: #227093;
          overflow: hidden;
        }
        .nftab__label,
        .tab__close {
          display: flex;
          color: white;
          background: #0a1834;
          cursor: pointer;
          font-size: 15px;
          line-height: 20px;
        }
        .nftab__label {
          justify-content: space-between;
          padding: 10px;
          position: relative;
        }
        .nftab__label::after {
          text-align: center;
          position: absolute;
          right: 8px;
          top: 11px;
          content: "+";
          font-size: 25px;
        }
        .nftab input:checked + .nftab__label::after {
          right: 11px;
          content: "-";
          font-size: 30px;
          right: 7px;
        }
        .tab__close {
          justify-content: flex-end;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
        }
        .nftop_nwrgt li {
          border-bottom: 1px solid #c7c7c7;
          padding: 7px 0 8px 15px;
          position: relative;
          display: flex;
          align-items: baseline;
          flex-direction: column;
          margin: 0px 0 0 4px;
          border-left: 1px dashed #aaaaaa;
        }        
        .nftop_nwrgt li:first-child {
          margin-top: 10px;
          padding-top: 0;
        }
        .nftop_nwrgt li:first-child:before {          
          content: "";
          border-radius: 50%;
          width: 10px;
          height: 10px;
          background-color: #f4342f;
          position: absolute;
          left: -5px;
          top: 13px;
        }
        .nftop_nwrgt li:first-child .time {
          margin-top: 0;
        }
        .nftop_nwrgt a svg {
          position: absolute;
          right: 13px;
          top: 9%;
        }
        .nftop_nwrgt li:first-child a svg {
          top: 10;
        }
        .nftop_nwrgt a h3 {
          font-size: 18px;
          line-height: 24px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .nftop_nwrgt a span {
          font-size: 16px;
          line-height: 22px;
          padding-top: 3px;
          color: #838383;
        }
        .nftop_nwrgt li:last-child {
          margin-bottom: 10px;
        }
        .nftop_nwrgt li span {
          margin: 4px 0 5px;
        }
        .nftop_nwrgt li .time {
          font-size: 14px;
          line-height: 18px;
          color: #e22820;
          font-weight: bold;
          display: block;
          width: 100%;
        }
        .nftop_nwrgt li .updats {
          font-size: 11px;
          color: #e22820;
          text-transform: uppercase;
          line-height: 18px;
          font-weight: bold;
        }
        .nf_head_wrap {
          position: relative;
        }
        .refrsh_btn {
          position: absolute;
          right: 0;
          top: -4px;
          color: #3e3e3e;
          text-transform: uppercase;
          background-color: #f7f7f7;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 10px;
          line-height: 8px;
          height: 24px;
          width: 70px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 3px;
        }
        .nfcount_wrap {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          border-bottom: 1px solid #939393;
          margin-bottom: 20px;
          padding: 10px;
        }
        .nfcount_wrap > div {
          background: #f2f2f2 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #d5d5d5;
          border-radius: 6px;
          width: 120px;
          height: 65px;
          display: flex;
          padding: 13px 0 0;
          justify-content: center;
        }
        .nfcount_wrap > div svg {
          margin: -2px 6px 0 0;
        }
        .nfcount {
          color: #767676;
          font-size: 14px;
          line-height: 23px;
        }
        .nfcount span {
          color: #e22820;
          font-size: 34px;
          line-height: 10px;
          font-weight: bold;
        }
        @media (max-width: 768px) {
          .top_nwrgt a h3 {
            font-size: 16px;
          }
          .nftab__label,
          .tab__close {
            font-size: 13px;
          }
          .nfcount_wrap {
            flex-wrap: wrap;
            padding-bottom: 5px;
          }
          .nfcount_wrap>div {
            margin-bottom: 10px;
            width: 23%;
            height: 79px;
            margin-right: 5px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .nfcount {
            font-size: 12px;
            padding: 5px 0;
            text-align: center;
            line-height: 15px;
          }
          .nfcount span {
            font-size: 17px;
          }
          .nfcount_wrap>div:last-child {
            margin-right: 0;
          }
          .nfcount_wrap>div svg {
            margin-right: 0;
          }
        }
      `}</style>
    </>
  );
};
export default NewsFeed;