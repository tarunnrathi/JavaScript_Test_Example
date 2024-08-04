import { getRedisDataByKey } from "api/global/Common";
import moment from "moment";
import { useEffect, useState, useContext } from "react";
import { logEvent } from "includes/googleAnalytic";
import { usePathname } from "next/navigation";
import getConfig from "next/config";
// import {
//   LiveBlogSVG,
//   NewsSVG,
//   PhotoGallerySVG,
//   VideoSVG,
//   WebStorySVG,
// } from "../../../helper/notificationHubHelper";
import LazyLoadImage from "components/Common/CustomImage";
import HindiGlobalContext from "HindiGlobalContext"; 

const { publicRuntimeConfig } = getConfig();

const compareTwoArray = (arr1, arr2) => {
  return arr1.length - arr1.filter(x => arr2.includes(x)).length;
}

export default function NotificationPopup({ isMobile = false, pageType = "" }) {
  const pathname = usePathname();
  const {isPopUpOpen, setIsPopUpOpen} = useContext(HindiGlobalContext);
  const [popUpData, setPopUpData] = useState({});
  const [localStorageData, setLocalStorageData] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const localData = localStorage.getItem("read_notification_post_id") || "";
    getRedisDataByKey("all_pusth_notification_data", "KHABARN18-", true)
      .then((response) => {
        const slicedData = (response?.data || []).slice(0, 20);
        const tmpData = localData.split(",");
        const listOfData = tmpData.filter((id) => {
          return response?.data && response?.data?.find((data) => id === data.post_id) || false;
        });
        const postData = listOfData.join(",");
        setLocalStorageData(postData);
        localStorage.setItem("read_notification_post_id", postData);
        
        const notificationCount = compareTwoArray(slicedData.map(itm => itm.post_id), tmpData);
        
        setNotificationCount(notificationCount > 0 ? notificationCount : 0);
        const groupByDate = {};
        let count = 0;
        (response?.data || []).slice(0, 20).forEach((data) => {
          const [date = false] = data.pushtime.split(" ") || [""];
          if (date && groupByDate[date]) {
            count = count + 1;
            groupByDate[date].push({ ...data, count: count });
          } else if (date) {
            count = count + 1;
            groupByDate[date] = [{ ...data, count: count }];
          }
        });
        setPopUpData(groupByDate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOnArticleClick = (id, article) => {
    logEvent(
      "Notification_Hub",
      "Click",
      `${id}, ${publicRuntimeConfig.siteUrl + pathname.replace("/", "")}, ${
        article.shareurl
      }, ${article.count}, ${article.notification_type}, NH_dropdown`
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
        if (notificationCount > 0) {
          setNotificationCount((prevState) => prevState - 1);
        }
      }
    } else {
      postData = "" + id;
      localStorage.setItem("read_notification_post_id", postData);
      setLocalStorageData(postData);
      if (notificationCount > 0) {
        setNotificationCount((prevState) => prevState - 1);
      }
    }
    setIsPopUpOpen(false);
  };

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&amp;display=swap"
      ></link>
      <div className={`notifications ${isPopUpOpen ? "active" : ""}`}>
        <div
          className="icon_wrap news18_bell_icon_floater"
          onClick={() => {
            setIsPopUpOpen((prev) => !prev);
          }}
        >
          {notificationCount !== 0 && (
            <div className="notification_count">{notificationCount}</div>
          )}
          <img
            className="icbell notification_hub_view_all_top_nav"
            src="/images/notificationHub/bell_d.svg"
            alt="bell-icon"
            width={16}
            height={18}
            onClick={() => {
              logEvent(
                "Notification_Hub",
                "Click",
                `notification_hub_bell ${isMobile ? "mobile" : "desktop"}`
              );
            }}
          />
          <img
            className="iclose notification_hub_view_all_top_nav"
            src="/images/notificationHub/close.svg"
            alt="closeButton"
            width={16}
            height={18}
            onClick={() => {
              logEvent("Notification_Hub", "Click", `nh_close_btn`);
            }}
          />
        </div>
        <div className="ovrly"></div>
        <div className="notification_dd">
          <div className="nothead">
            <img
              src="/images/notificationHub/bell_d.svg"
              alt="bell-icon"
              width={16}
              height={18}
            />
            <span>NOTIFICATIONS</span>{" "}
            <a
              onClick={() => {
                setIsPopUpOpen(false);
                logEvent(
                  "Notification_Hub",
                  "Click",
                  `full_list_button, NH_dropdown, ${
                    publicRuntimeConfig.siteUrl + pathname.replace("/", "")
                  }, ${publicRuntimeConfig.siteUrl + "latest-notifications/"}`
                );
              }}
              target="_blank"
              href="/latest-notifications/"
              className="notification_hub_news_stories_top_nav"
            >
              VIEW FULL LIST
            </a>
          </div>
          <div className="nt_listwrp">
            {Object.keys(popUpData || {}).map((dateKey) => {
              const dateArr = dateKey.split("-");
              const validDate = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
              const date = new Date(validDate).toLocaleDateString("en-in", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              return (
                <div key={dateKey}>
                  <label htmlFor="cb1" className="tab__label">
                    {date}
                  </label>
                  <div className="tab__content">
                    <ol className="top_nwrgt">
                      {(popUpData?.[dateKey] || []).map((article) => {
                        const dateTimeArray = article.pushtime.split(" ");
                        const dateString =
                          validDate +
                          " " +
                          dateTimeArray[1] +
                          " " +
                          dateTimeArray[2];
                        const dateWithTime = new Date(dateString).toISOString();
                        const dateTime = moment(dateWithTime).fromNow();
                        return (
                          <li
                            className={
                              localStorageData.includes(article.post_id)
                                ? "notification_hub_news_stories_top_nav"
                                : "gry notification_hub_news_stories_top_nav"
                            }
                            key={article.post_id + dateKey}
                          >
                            <a
                              href={article.shareurl}
                              target="_blank"
                              onClick={() =>
                                handleOnArticleClick(article.post_id, article)
                              }
                              className="notification_hub_news_stories_top_nav"
                            >
                              <div className="lgtxt">
                                <h3>{article.title}</h3>
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
                              <figure><LazyLoadImage src={article.image} width={104} height={70} /> </figure>
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <span className="notify_txt">Notification</span> */}
      </div>
      <style jsx global>{`
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
            format(url("woff2"));
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
            format("woff2");
          unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
            U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
        }
        a {
          text-decoration: none;
          color: #000;
        }
        .notifications .icon_wrap {
          font-size: 28px;
          position: relative;
        }
        .notifications {
          position: relative;
        }
        .notifications .icon_wrap {
          font-size: 28px;
    cursor: pointer;
    padding: 10px 14px;
    max-height: 47px;
    line-height: 1;
        }
        .notifications .icon_wrap .iclose {
          display: none;
        }
        .notifications.active .notification_dd {
          display: block;
          animation: myAnim 0.5s linear 0s 1 normal forwards;
        }
        .notification_dd {
          position: absolute;
          top: 48px;
          right: -26px;
          user-select: none;
          background: #fff;
          width: 340px;
          height: auto;
          display: none;
          padding: 10px;
          border-bottom: 1px solid #d1d1d1;
          box-shadow: 0px 5px 30px #00000026;
          z-index: 1111;
        }
        @keyframes myAnim {
          0% {
            opacity: 0;
            transform: translateY(0px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .notifications.active .icon_wrap {
          background-color: #fff;
          padding: 14px;
          border-top: 2px solid #ed1b25;
        }
        .notifications.active .icon_wrap .iclose {
          display: block;
          width: 13px;
          // padding-top: 5px;
        }
        .notifications.active .icon_wrap .icbell {
          display: none;
        }
        .nothead span {
          margin-left: 7px;
          color: #001d42;
          font-size: 18px;
          line-height: 18px;
          font-weight: bold;
        }
        .nothead {
          display: flex;
          margin: 6px 0 10px;
          align-items: center;
          position: relative;
        }
        .nothead a {
          color: #fff !important;
          text-transform: uppercase;
          background-color: #ed1b25;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #ffffff;
          border-radius: 12px;
          font-size: 11px;
          line-height: 14px;
          padding: 3px 10px 2px;
          position: absolute;
          right: 0;
        }

        .tab__label,
        .tab__close {
          display: flex;
          color: white;
          background: #0a1834;
          cursor: pointer;
          font-size: 13px;
          line-height: 18px;
        }
        .tab__label {
          justify-content: space-between;
          padding: 6px 9px;
          position: relative;
        }
        .tab__label span {
          margin-right: 35px;
          background-color: #ed1b25;
          font-size: 13px;
          line-height: 18px;
          border-radius: 2px;
          padding: 1px 5px;
        }
        .tab__content {
          overflow: hidden;
          transition: all 0.35s;
        }
        .top_nwrgt li:before {
          content: counter(step-counter);
          margin-right: 5px;
          padding: 0 8px;
          font-size: 12px;
          color: #868686;
        }
        .top_nwrgt li {
          border-bottom: 1px solid #c7c7c7;
          padding: 0 10px 0px 0;
          position: relative;
          counter-increment: step-counter;
          display: flex;
          align-items: baseline;
        }
        .top_nwrgt a svg {
          position: absolute;
          right: 13px;
          bottom: 13%;
        }
        .top_nwrgt a h3 {
          font-size: 13px;
          line-height: 18px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: -6px;
          color: #000;
        }
        .top_nwrgt a .catime span {
          font-size: 13px;
          line-height: 2;
          color: #6f6f6f;
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
        .top_nwrgt li.gry {
          background-color: #e8e8e8;
        }
        .top_nwrgt li.gry a h3 {
          color: #717171;
        }
        .notification_count {
          right: 5px;
          top: 6px;
          position: absolute;
          font-size: 10px;
          color: #fff;
          background: #d90000;
          border-radius: 50%;
          padding: 0px 2px;
          height: 18px;
          width: 18px;
          line-height: 18px;
          text-align: center;
          font-weight: 700;
        }
        .notifications.active .notification_count {
          display: none !important;
        }
        .nt_listwrp {
          max-height: 380px;
          overflow-y: scroll;
        }
        .nt_listwrp::-webkit-scrollbar {
          width: 5px;
          border-radius: 3px;
        }
        .nt_listwrp::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .nt_listwrp::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .ovrly {
          display: none;
        }
        .top_nwrgt li a{display: flex; justify-content: space-between; width: 100%;}
        .lgtxt { width: calc(100% - 100px);}
        .top_nwrgt li a figure{border-radius: 5px; width:104px; height: 70px; margin-bottom: 10px;}
        .catime {display: flex;  align-items: center; margin-top: 10px;}
        .top_nwrgt li a figure img {border-radius: 5px; }

        @media screen and (max-width: 800px) {
          .notification_count {
            right: 5px;
            top: 7px;
          }
          .top_nwrgt li {
            padding: 5px 10px 5px 0;
            font-weight: normal;
          }
          .top_nwrgt a h3 {
            margin-bottom: 0;
          }
          .nt_listwrp {
            max-height: 525px;
          }
          .notifications.active .ovrly {
            display: block;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgb(0 0 0 / 60%);
            z-index: 1111;
          }
          .notifications.active .icon_wrap {
            z-index: 111111;
            padding: 14px;
            margin: 0 5px;
          }
          .notification_dd {
            animation: unset !important;
            width: calc(100vw - 15px);
            height: 580px;
            right: -10px;
          }
          .top_nwrgt a .catime span {font-size: 13px; padding-top: 0;}
          .top_nwrgt a .catime .categ{font-size: 11px;}
          .catime{margin-top: 0;}
        }
      `}</style>
    </>
  );
}
