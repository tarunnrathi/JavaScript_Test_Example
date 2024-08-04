import { logEvent } from "includes/googleAnalytic";
import moment from "moment";
import { useEffect, useState } from "react";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import getConfig from "next/config";
import {
  LiveBlogSVG,
  NewsSVG,
  PhotoGallerySVG,
  VideoSVG,
  WebStorySVG,
} from "../../../helper/notificationHubHelper";
import LazyLoadImage from "components/Common/CustomImage";

const { publicRuntimeConfig } = getConfig();

export default function NotificationHub({ data }) {
  const { groupByDate, breadCrumbArray } = data;
  const dateList = Object.keys(groupByDate || {}) || [];
  const [checkedIds, setCheckedId] = useState([dateList[0]]);
  const [localStorageData, setLocalStorageData] = useState("");

  const handleOnArticleClick = (id, article) => {
    logEvent(
      "Notification_Hub",
      "Click",
      `${article.post_id}, ${
        publicRuntimeConfig.siteUrl +
        "latest-notifications/"
      }, ${article.shareurl}, ${article.count}, ${
        article.notification_type
      }, NH_detail_pg`
    );
    let postData = localStorageData;
    if (postData) {
      let shouldUpdate = true;
      if (postData.includes(id)) {
        shouldUpdate = false;
      } else {
        postData = postData + "," + id;
      }
      if (shouldUpdate) {
        localStorage.setItem("read_notification_post_id", postData);
        setLocalStorageData(postData);
      }
    } else {
      postData = "" + id;
      localStorage.setItem("read_notification_post_id", postData);
      setLocalStorageData(postData);
    }
  };

  useEffect(() => {
    const localData = localStorage.getItem("read_notification_post_id") || "";
    const tmpData = localData.split(",");
    setLocalStorageData(tmpData);
  }, []);
  return (
    <>
      <div className="container">
        <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
        <h1 className="title_notification">NOTIFICATION HUB</h1>
        <section className="accordion">
          {dateList.map((dateKey) => {
            const dateArr = dateKey.split("-");
            const validDate = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
            const date = new Date(validDate).toLocaleDateString("en-in", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            return (
              <div className="tab" key={dateKey}>
                <input
                  type="checkbox"
                  name="accordion-1"
                  id={`cb${dateKey}`}
                  onChange={() =>
                    setCheckedId((prevKey) =>
                      prevKey.find((checkedKey) => checkedKey === dateKey)
                        ? [...prevKey.filter((exDate) => exDate !== dateKey)]
                        : [...prevKey, dateKey]
                    )
                  }
                  checked={Boolean(
                    checkedIds.find((checkedKey) => checkedKey === dateKey)
                  )}
                />
                <label for={`cb${dateKey}`} className="tab__label">
                  {date}&nbsp;
                  <span>
                    {(groupByDate?.[dateKey] || [])?.length || 0}
                    &nbsp;Notifications
                  </span>
                </label>
                <div className="tab__content">
                  <ol className="top_nwrgt">
                    {(groupByDate?.[dateKey] || []).map((article) => {
                      const dateTimeArray = article.pushtime.split(" ");
                      const dateString =
                        validDate +
                        " " +
                        dateTimeArray[1] +
                        " " +
                        dateTimeArray[2];
                      const dateWithTime = new Date(dateString);
                      const dateTime = moment(dateWithTime).fromNow();
                      return (
                        <li
                          className={
                            localStorageData.includes(article.post_id)
                              ? ""
                              : "gry"
                          }
                          key={article.post_id}>
                          <a
                            href={article.shareurl}
                            onClick={() =>
                              handleOnArticleClick(article.post_id, article)
                            }
                          >
                            <div className="lgtxt">
                              <h3>{article.title}</h3>
                              {/* <span className="categ">मनोरंजन</span> */}
                              <div className="catime"><span>{dateTime}</span></div>
                              {/* {article.notification_type === "photogallery" ? (
                                <PhotoGallerySVG />
                              ) : article.notification_type === "videos" ? (
                                <VideoSVG />
                              ) : article.notification_type === "webStory" ? (
                                <WebStorySVG />
                              ) : article.notification_type === "news" ? (
                                <NewsSVG />
                              ) : article.notification_type === "liveblog" ? (
                                <LiveBlogSVG />
                              ) : (
                                <></>
                              )} */}
                            </div>
                            <figure><LazyLoadImage src={article.image} width={90} height={60} /></figure>

                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <style jsx>{`
        .title_notification {
          text-align: left;
          font: normal normal bold 20px/18px Mukta;
          letter-spacing: 0px;
          color: #001d42;
          text-transform: uppercase;
          opacity: 1;
          margin: 10px;
        }
        .tab {
          margin-bottom: 5px;
        }
        .tab input {
          position: absolute;
          opacity: 0;
          z-index: -1;
        }
        .tab__content {
          max-height: 0;
          overflow: hidden;
          transition: all 0.35s;
        }
        .tab input:checked ~ .tab__content {
          max-height: max-content;
        }
        .accordion {
          color: #227093;
          overflow: hidden;
        }
        .tab__label,
        .tab__close {
          display: flex;
          color: white;
          background: #0a1834;
          cursor: pointer;
          font-size: 15px;
          line-height: 18px;
        }
        .tab__label {
          justify-content: space-between;
          padding: 10px;
          position: relative;
        }
        .tab__label::after {
          text-align: center;
          position: absolute;
          right: 8px;
          top: 11px;
          content: "+";
          font-size: 25px;
        }
        .tab input:checked + .tab__label::after {
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

        .top_nwrgt li:before {
          content: counter(step-counter);
          margin-right: 5px;
          padding: 3px 8px;
          font-size: 17px;
          color: #868686;
        }
        .top_nwrgt li {
          border-bottom: 1px solid #c7c7c7;
          padding: 7px 10px 8px 0;
          position: relative;
          counter-increment: step-counter;
          display: flex;
          align-items: baseline;
        }
        .top_nwrgt li.gry {
          background-color: #e8e8e8;
        }
        .top_nwrgt li.gry a h3 {
          color: #717171;
        }
        .top_nwrgt a svg {
          position: absolute;
          right: 13px;
          bottom: 13%;
        }
        .top_nwrgt a h3 {
          font-size: 18px;
          line-height: 24px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .top_nwrgt a .catime span {
          font-size: 14px;
          line-height: 18px;
          color: #6f6f6f;
          padding-top: 3px;
        }
        .top_nwrgt a .catime .categ {
          color: #ED1A25;
          line-height: 20px;
          font-weight: bold;
          display: flex;
          align-items: center;
        }
        .top_nwrgt a .catime .categ:after{
          content: "";
          width: 5px;
          height: 5px;
          display:block;
          background-color: #ADADAD;
          border-radius: 50%;
          margin: 0 10px;
        }
        .top_nwrgt li:last-child {
          margin-bottom: 10px;
        }
        .tab__label span {
          margin-right: 35px;
          background-color: #ed1b25;
          font-size: 13px;
          line-height: 18px;
          border-radius: 2px;
          padding: 1px 5px;
        }
        .top_nwrgt li a{display: flex; justify-content: space-between; width: 100%;}
        .lgtxt { width: calc(100% - 100px);}
        .top_nwrgt li a figure{border-radius: 5px; width:90px; height: 60px;}
        .catime {display: flex;  align-items: center; margin-top: 10px;}

        @media (max-width: 768px) {
          .top_nwrgt a h3 {
            font-size: 15px;
          }
          .top_nwrgt li:before {
            font-size: 15px;
          }
          .tab__label,
          .tab__close {
            font-size: 13px;
          }
          .top_nwrgt a .catime span {font-size: 13px; padding-top: 0;}
          .top_nwrgt a .catime .categ{font-size: 11px;}
          .catime{margin-top: 0;}
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
      `}</style>
    </>
  );
}
