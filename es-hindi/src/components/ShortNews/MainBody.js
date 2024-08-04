import LazyLoadImage from "components/Common/CustomImage";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import { shortDateConversion } from "../../../helper/global";
import MemoNewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import getConfig from "next/config";
import { logEvent, logPageViewUpdated } from "includes/googleAnalytic";
import { getArticleList } from "api/global/Common";
import { logGA4VirtualPageView } from "includes/article.util";

const { publicRuntimeConfig } = getConfig();

export default function MainBodyWithSwiper({
  latestNews,
  isMobile,
  slug = "",
  category = "",
  setLatestNewsWithAds = [],
  latestNewsData = {},
  getLatestNewsWithAd,
  shortNewsCat = {},
}) {
  const { latestNewsWithAd, newsArray } = latestNewsData;
  const latestDataLength = latestNewsWithAd.length;
  const [swiper, setSwiper] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isShareWrapOpen, setShareWrapOpen] = useState(false);
  const [isAllDataFetched, setAllDataFetched] = useState(false);
  const fetchMoreShorts = async (activeIndex) => {
    if (activeIndex === latestNewsWithAd.length - 5) {
      let articleList = [];
      if (slug) {
        articleList = await getArticleList(
          {
            offset: newsArray.length,
            count: 20,
            filter: category
              ? {
                  shortnews_status: "1",
                  not: { weburl_short: slug },
                  "categories.slug": category,
                }
              : { shortnews_status: "1", not: { weburl_short: slug } },
            fields:
              "weburl_r,weburl_short,shorts_bulletin,shortnews_status,images,headline,display_headline,created_at,story_id,weburl",
          },
          true
        );
      } else {
        articleList = await getArticleList(
          {
            offset: newsArray.length,
            count: 20,
            filter: category
              ? { shortnews_status: "1", "categories.slug": category }
              : { shortnews_status: "1" },
            fields:
              "weburl_r,weburl_short,shorts_bulletin,shortnews_status,images,headline,display_headline,created_at,story_id,weburl,categories",
          },
          true
        );
      }
      if (articleList.length) {
        setLatestNewsWithAds(
          getLatestNewsWithAd([...newsArray, ...articleList])
        );
        setSelectedIndex(activeIndex);
      } else {
        setAllDataFetched(true);
      }
    }
  };
  useEffect(() => {
    if (latestDataLength - 5 === selectedIndex && !isAllDataFetched) {
      fetchMoreShorts(selectedIndex, swiper);
    }
  }, [selectedIndex]);

  useEffect(() => {
    const tempSwiper = new Swiper(".swiper-container", {
      direction: "vertical",
      effect: "coverflow",
      centeredSlides: true,
      onAny: (eventName, event) => {
        if (eventName === "slideChangeTransitionEnd") {
          setSelectedIndex(() => event.activeIndex);
          if (
            latestNewsWithAd &&
            latestNewsWithAd[event.activeIndex] &&
            !latestNewsWithAd[event.activeIndex].isAd
          ) {
            self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "6683813" });
            const articleObj = latestNewsWithAd[event.activeIndex] || {};
            document.title = articleObj?.display_headline;
            history.replaceState(
              {},
              latestNewsWithAd[event.activeIndex].display_headline ||
                "Article Short News",
              category
                ? `/short-news/${category}/${
                    latestNewsWithAd[event.activeIndex].weburl_short
                  }`
                : `/short-news/${
                    latestNewsWithAd[event.activeIndex].weburl_short
                  }`
            );
            if (Object.keys(articleObj)?.length > 0) {
              logPageViewUpdated(
                articleObj,
                "short news",
                "short news page",
                "No video player",
                "No video",
                true
              );
            }
            logEvent(
              "sn_scroll",
              isMobile ? "mobile" : "desktop",
              `Short News Position ${event.activeIndex}`
            );
            logGA4VirtualPageView(
              `${publicRuntimeConfig.siteUrl}${
                category
                  ? `short-news/${category}/${
                      latestNewsWithAd[event.activeIndex].weburl_short
                    }`
                  : `short-news/${
                      latestNewsWithAd[event.activeIndex].weburl_short
                    }`
              }`
            );
          }
        }
      },
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      parallax: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      },
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      initialSlide: selectedIndex,
    });
    setSwiper(() => tempSwiper);
  }, []);
  const handleOnSwipe = (type) => {
    if (swiper) {
      if (type === "next" && selectedIndex < latestNewsWithAd.length - 1) {
        swiper.slideNext();
        setSelectedIndex((prev) => prev + 1);
        return;
      } else if (type === "prev" && selectedIndex > 0) {
        swiper.slidePrev();
        setSelectedIndex((prev) => prev - 1);
        return;
      }
    }
  };
  const handleOnShareWrapOpen = (news) => {
    logEvent(
      "Short News Article Share",
      "Click",
      `Short News, ${news.story_id}, ${news.categories?.[0]?.name}, ${
        news.is_hyperlocal_vw ? "local18" : "non-local18"
      }`
    );
    setShareWrapOpen((prev) => !prev);
  };
  if (!latestNews.length) return null;
  return (
    <>
      <div className="crd_cnt_wrp">
        <div className="crd_stk_wrp swiper-container">
          <div className="crd_stk_ul swiper-wrapper">
            {latestNewsWithAd.map((news, parentIndex) => {
              return (
                <div
                  key={`${news.story_id}_${parentIndex}`}
                  className="crd_stk_li swiper-slide"
                >
                  {!news.isAd ? (
                    <>
                      <figure>
                        <LazyLoadImage
                          src={news?.images?.url || ""}
                          width="326"
                          height="181"
                          alt={news?.display_headline || "No Headline"}
                          title={news?.display_headline || "No Headline"}
                        />
                        <span className="iscateg">
                          {shortNewsCat.icon && <img src={shortNewsCat.icon} />}
                          {/* <img src="/images/impactShort/manoranjan.svg"></img> */}
                          {shortNewsCat.title || news.categories?.[0]?.name}
                        </span>
                        {isMobile ? (
                          <>
                            <div className="impshare">
                              <a
                                className="arr_redirect"
                                href="javascript:void(0)"
                                onClick={async () => {
                                  const shareData = {
                                    title: "",
                                    text: news?.display_headline,
                                    url: category
                                      ? `${publicRuntimeConfig.siteUrl}short-news/${category}/${news.weburl_short}`
                                      : `${publicRuntimeConfig.siteUrl}short-news/${news.weburl_short}`,
                                  };
                                  try {
                                    await navigator.share(shareData);
                                  } catch (err) {
                                    //resultPara.textContent = `Error: ${err}`;
                                  }
                                  // logEvent(
                                  //   "Short_News_Article_Share_Click",
                                  //   "Click",
                                  //   `${news.display_headline}, ${news?.story_id}, ${
                                  //     news?.is_hyperlocal_vw ? "local18" : "non-local18"
                                  //   }, ${news?.categories?.[0].slug}`
                                  // );
                                  logEvent("ss_wapi", "tap", "short-news_page");
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
                            </div>
                          </>
                        ) : (
                          <div className="impshare">
                            <span
                              className="shr"
                              onClick={() => handleOnShareWrapOpen(news)}
                            ></span>
                            <span
                              className={`shr_wrp ${
                                isShareWrapOpen ? "shr_wrp_opn" : ""
                              }`}
                            >
                              <span className="shr_lst">
                                <a
                                  className="facebk shr_icn"
                                  href={`https://www.facebook.com/sharer.php?u=${
                                    category
                                      ? `${publicRuntimeConfig.siteUrl}short-news/${category}/${news.weburl_short}`
                                      : `${publicRuntimeConfig.siteUrl}short-news/${news.weburl_short}`
                                  }&t=${news?.display_headline}`}
                                  target="_blank"
                                >
                                  <LazyLoadImage
                                    src="/images/impactShort/Facebook.svg"
                                    width={32}
                                    height={32}
                                    isLazyLoad={false}
                                  />
                                </a>
                                <a
                                  className="whatsp shr_icn"
                                  href={`https://wa.me/?text=${
                                    news?.display_headline
                                  } - ${
                                    category
                                      ? `${publicRuntimeConfig.siteUrl}short-news/${category}/${news.weburl_short}`
                                      : `${publicRuntimeConfig.siteUrl}short-news/${news.weburl_short}`
                                  }`}
                                  target="_blank"
                                >
                                  <LazyLoadImage
                                    src="/images/impactShort/WhatsApp.svg"
                                    width={32}
                                    height={32}
                                    isLazyLoad={false}
                                  />
                                </a>
                              </span>
                            </span>
                          </div>
                        )}
                      </figure>
                      <div className="stk_cnt">
                        <div className="dte">
                          {shortDateConversion(news?.created_at)}
                        </div>
                        <h2 className="story-title">
                          {news?.display_headline || ""}
                        </h2>
                        {news.shorts_bulletin.map((bullets, index) => (
                          <h2 className="bullt" key={index}>
                            {bullets}
                          </h2>
                        ))}
                        <div className="fttr">
                          <a
                            className="mre"
                            href={news?.weburl_r}
                            onClick={() => {
                              logEvent(
                                "Short_news_article_read_story",
                                "Click",
                                `${news.display_headline}, ${news?.story_id}, ${
                                  news?.is_hyperlocal_vw
                                    ? "local18"
                                    : "non-local18"
                                }, ${news?.categories?.[0].slug}`
                              );
                            }}
                            target="_blank"
                          >
                            पूरी कहानी पढ़ें
                          </a>

                          {isMobile ? (
                            <span className="clkbtn">
                              <img src="/images/impactShort/swipe_up.svg" />{" "}
                              Swipe Up for next
                            </span>
                          ) : (
                            <span className="clkbtn">
                              Click on{" "}
                              <img src="/images/impactShort/expand-crcl.svg" />{" "}
                              for next
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="stk_cnt ad">
                      <span>Advertisement</span>
                      <MemoNewSiteAd
                        slotId={`NW18_HIND_PWA_ROS_SHRT_STRY_300x250_${news.story_id}_${parentIndex}`}
                        adUnit="NW18_HIND_PWA/NW18_HIND_PWA_SHORTS_STORIES/NW18_HIND_PWA_SHORTS_STORIES_ROS/NW18_HIND_PWA_ROS_SHRT_STRY_300x250"
                        sizes={[[300, 250]]}
                        width={300}
                        height={250}
                        removeAdSpan={true}
                        lazyLoad={true}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="arr_btn">
          <a
            className={`prv swiper-button-prev ${
              selectedIndex > 0 ? "active" : ""
            }`}
            onClick={() => handleOnSwipe("prev")}
          ></a>
          <a
            className={`nxt swiper-button-next ${
              selectedIndex < latestNewsWithAd.length - 1 ? "active" : ""
            }`}
            onClick={() => handleOnSwipe("next")}
          ></a>
        </div>
        <div className="bar"></div>
      </div>
      <style jsx global>{`
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
        body {
          font-size: 100%;
          font-weight: 400;
          margin: auto;
          font-family: "Mukta", sans-serif;
        }
        .crd_cnt_wrp {
          margin: auto;
          height: calc(calc(var(--vh, 1vh) * 100) - 120px);
          max-height: 580px;
          max-width: 350px;
          position: relative;
          width: 100%;
        }
        .crd_stk_wrp {
          border-radius: 28px;
          box-shadow: 0px 3px 20px #00000029;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .crd_stk_li {
          font-size: 16px;
          width: 100%;
          line-height: 24px;
          font-weight: 700;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          text-align: left !important;
          height: 100%;
          justify-content: flex-start;
        }
        .stk_cnt {
          padding: 12px;
        }
        .crd_stk_li figure {
          margin: 0 0 0;
          overflow: hidden;
          max-height: 184px;
          width: 100%;
          position: relative;
        }
        .crd_stk_li figure img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .crd_stk_li .story-title {
          color: #000000;
          font-size: 18px;
          font-weight: 600;
          line-height: 27px;
          margin: 0 0 10px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .dte {
          color: #5c6b88;
          font-size: 11px;
          line-height: 17px;
          margin: 0 0 5px;
        }
        .bullt {
          color: #000000;
          font-size: 15px;
          font-weight: 400;
          line-height: 24px;
          margin: 0 0 5px;
          padding: 0 0 0 26px;
          position: relative;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .bullt:before {
          content: "";
          background-image: url(/images/impactShort/bullets.svg);
          width: 16px;
          height: 16px;
          display: block;
          position: absolute;
          left: 0;
          top: 5px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: 9px;
          background-position: 56% 50%;
        }
        .fttr {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin: auto 0 0 0;
          width: 100%;
          // position: absolute;
          bottom: 6px;
          left: 3%;
          right: 3%;
          width: auto;
        }
        .fttr .mre {
          width: 107px;
          background-color: #f04b46;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #ffffff;
          border-radius: 15px;
          text-decoration: none;
          color: #fff;
          display: inline-block;
          font-size: 15px;
          line-height: 20px;
          font-weight: bold;
          padding: 4px 0;
          position: relative;
          text-align: center;
        }
        .shr {
          width: 32px;
          height: 32px;
          background-color: #f04b46;
          border-radius: 50%;
          display: block;
          position: relative;
        }
        .shr:before {
          content: "";
          background-image: url(/images/impactShort/Share.svg);
          width: 17px;
          height: 17px;
          display: block;
          position: absolute;
          left: -3px;
          top: 7px;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          margin: 0 auto;
          right: 0;
          bottom: 0;
        }
        .bar {
          border-radius: 28px;
          bottom: -8px;
          content: "";
          display: block;
          height: 100%;
          position: absolute;
          width: 100%;
          z-index: 0;
          pointer-events: none;
          opacity: 1;
          -webkit-transition: all ease-in-out 0.4s;
          -moz-transition: all ease-in-out 0.4s;
          -ms-transition: all ease-in-out 0.4s;
          transition: all ease-in-out 0.4s;
        }
        .bar::before {
          background-color: #ff9a9b;
          border-radius: 0 0 28px 28px;
          box-shadow: 0px 3px 20px #00000029;
          content: "";
          display: block;
          height: 12px;
          width: 100%;
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          margin: 0 auto;
          max-width: 90%;
        }
        .bar::after {
          background-color: #ffc6c6;
          border-radius: 0 0 28px 28px;
          box-shadow: 0px 3px 20px #00000029;
          content: "";
          display: block;
          height: 10px;
          width: 100%;
          position: absolute;
          bottom: -12px;
          left: 0;
          right: 0;
          margin: 0 auto;
          max-width: 80%;
        }
        .arr_btn {
          align-items: center;
          display: flex;
          justify-content: center;
          flex-direction: column;
          position: absolute;
          top: 40%;
          right: -60px;
        }
        .arr_btn a {
          align-items: center;
          background-color: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 100%;
          color: #fff;
          display: flex;
          justify-content: center;
          height: 48px;
          width: 48px;
          opacity: 1;
          position: relative;
          right: 0;
          left: auto;
        }
        .arr_btn .active {
          background-color: transparent;
          border-color: #bfcfe1;
          opacity: 1;
        }
        .prv:after,
        .nxt:after {
          content: "";
          display: block;
          border: solid #313131;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 6px;
          position: absolute;
          top: 13px;
          left: 15px;
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          -webkit-transition: all ease-in-out 0.3s;
          -ms-transition: all ease-in-out 0.3s;
          -o-transition: all ease-in-out 0.3s;
          transition: all ease-in-out 0.3s;
          color: #00adef;
          font-size: 15px;
        }
        .prv:after {
          top: 19px;
          left: 15px;
          transform: rotate(-135deg);
          -webkit-transform: rotate(-135deg);
        }
        .nxt {
          top: 30px;
        }
        .shr_wrp {
          background-color: #fff;
          border: 1px solid #c2cde3;
          border-radius: 6px;
          box-shadow: 0px 3px 6px #00000029;
          display: block;
          padding: 10px;
          position: absolute;
          left: auto;
          right: 0;
          bottom: 45px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
          transform-origin: 100% 0;
          transform: scale(0.9) translate(10px, 40px);
        }
        .shr_wrp::before {
          content: "";
          display: block;
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 7px solid #fff;
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          margin: auto;
          z-index: 1;
        }
        .shr_wrp::after {
          content: "";
          display: block;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #c2cde3;
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          margin: auto;
          z-index: 0;
        }
        .shr_lst {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 32px;
        }
        .shr_icn {
          display: block;
          margin: 0 0 10px;
        }
        .shr_icn img {
          height: auto;
          width: auto;
          object-fit: cover;
          display: block;
        }
        .shr_wrp_opn.shr_wrp {
          opacity: 1;
          visibility: visible;
          transform: scale(1) translate(0px, 0px);
          bottom: 53px;
          right: -6px;
        }
        html,
        body {
          position: relative;
          height: 100%;
        }
        body {
          color: #000;
          margin: 0;
          padding: 0;
        }
        .swiper-container {
          width: 100%;
          height: 100%;
        }
        .swiper-slide {
          text-align: center;
          background: #fff;
        }
        .stk_cnt.ad {
          height: 100%;
          width: -webkit-fill-available;
          padding: 8px;
        }
        .stk_cnt.ad span {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          color: #000;
          font-size: 11px;
          font-weight: 600;
          line-height: 15px;
          padding: 4px 10px 3px;
          text-transform: uppercase;
          text-align: center;
          margin-top: 2px;
        }
        .stk_cnt.ad > div {
          align-items: center;
          background-color: #eeeeee;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          width: 100%;
          margin-top: 14px;
        }
        .iscateg {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background-color: #fff;
          border-radius: 19px;
          font-size: 14px;
          line-height: 22px;
          padding: 2px 13px;
          color: #ec2028;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .crd_stk_li figure .iscateg img {
          object-fit: unset;
          margin-right: 5px;
          width: 15px;
          height: 20px;
        }
        .impshare {
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
        .clkbtn {
          font-size: 14px;
          font-weight: 700;
          line-height: 23.27px;
          text-align: left;
          color: #bbbbbb;
        }
        .clkbtn img {
          vertical-align: middle;
        }
        .dtcount span {
          font-size: 14px;
          font-weight: 700;
          line-height: 23.27px;
          color: #5c6b88;
        }
        .dtcount {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        .newchoosecitybtn {
          vertical-align: middle;
        }

        @media (max-width: 767px) {
          .crd_cnt_wrp {
            height: calc(calc(var(--vh, 1vh) * 100) - 100px);
            box-shadow: 0px 3px 15px #00000029;
            border-radius: 28px;
          }
          .arr_btn {
            display: none;
          }
          .dte {
            font-size: 14px;
            line-height: 23.27px;
          }
          .crd_stk_li figure {
            height: 181px;
          }
          .story-title {
            font-size: 18px;
            line-height: 24px;
            -webkit-line-clamp: 2;
          }
          .fttr {
            margin: 8px 0;
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
          .stk_cnt {
            padding: 10px 12px;
          }
        }
      `}</style>
    </>
  );
}
