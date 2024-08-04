import { Wrapper, loadTvfn } from "includes/article.util";
import parser from "html-react-parser";
import { Fragment, useEffect } from "react";
import { logEvent } from "includes/googleAnalytic";
import { getCompleteURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import { getAlt, getImage, getTitle } from "util/individual/Home";
import ReadMore from "components/Desktop/common/ReadMore";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const HomeTopNews = ({ pageAds = {}, topHomeNews = {}, isBudget = false,liveTvPosition={} }) => {
  const getTopNews = topHomeNews?.stories || [];
  const skinning = topHomeNews?.skinning === 1;

  let previous = "";
  const toggleRelatedArticle = (e, slug = "", story_id = "") => {
    ga(
      "send",
      "event",
      "related_news",
      "click",
      slug + "," + story_id.split("-")[1]
    );

    if (previous && previous !== e) {
      document.getElementById(`${previous}`).classList.remove("adcls");
      document
        .getElementById(`${previous}`)
        .nextElementSibling?.classList?.remove("active-related-article");
    }
    previous = e;
    document.getElementById(`${e}`).classList.toggle("adcls");
    document
      .getElementById(`${e}`)
      .nextElementSibling?.classList?.toggle("active-related-article");
  };

  const topNewsLeft = getTopNews.slice(0, 6) || [];
  //let topNewsRight = getTopNews.slice(6, 12) || [];
  let topNewsRight = liveTvPosition!={} && liveTvPosition?.live_tv=="true" && !isBudget ? getTopNews.slice(6, 12) || [] : getTopNews.slice(6, 16) || [];

  if ( liveTvPosition!={} && liveTvPosition?.live_tv=="true" && !isBudget) {
    topNewsRight = getTopNews.slice(6, 13) || [];
  }

  useEffect(() => {
    if ( liveTvPosition!={} && liveTvPosition?.live_tv=="true" && !isBudget) {
      loadTvfn();
    }
  }, []);

  return (
    <>
      <div className="topnews dflex justify-space-betwwen" id="hometopnews">
        <div className="topnews-left ">
          <div className="hd_heading">
            TOP <h1>HINDI NEWS</h1>
          </div>
          <ul className="topnews-left-list">
            {topNewsLeft &&
              topNewsLeft.map((item, index) => {
                const width = index === 0 ? 521 : 104 ;
                const height = index === 0 ? 347 : 70;
                const src = getImage(item);
                const title = getTitle(item);
                const alt = getAlt(item);
                return (
                  <Fragment key={index}>
                    {item && (
                      <>
                        {index == 3 && (
                          <li key={`list${index}`}>
                            <div id="native-ad-hp-2020">
                              <NewSiteAd
                                slotId={"native-ad-hp-1"}
                                adUnit={pageAds?.NATIVE_id}
                                sizes={["fluid"]}
                                width={"100%"}
                                removeAdSpan={true}
                                lazyLoad={true}
                              />
                            </div>
                          </li>
                        )}

                        <li key={`list-${index}`}>
                          <a
                            href={getCompleteURL(item?.weburl_r || item?.web_url_r, item?.weburl || item?.web_url)}
                          >
                            <div className="topNewImgContainer">
                              {item?.ff_source &&
                                item?.ff_source === "Hyperlocal" && (
                                  <span className="nwvideoicon"></span>
                                )}
                              <figure width={width} height={height}>
                                <LazyLoadImage
                                  src={src}
                                  width={width}
                                  height={height}
                                  alt={alt}
                                />
                              </figure>
                            </div>
                            <h2>
                              {item?.liveblog_switcher === 1 && (
                                <span
                                  className={`livenow_btn ${index === 0 ? "liveadj" : ""
                                    }`}
                                >
                                  Live
                                </span>
                              )}
                              {title} {item.isNew ? <span className="just-in">JUST IN</span> : ""}
                            </h2>
                          </a>
                          {item?.showRelatedArticle &&
                            item?.related_story &&
                            Array.isArray(item?.related_story) &&
                            item?.related_story?.length && (
                              <>
                                <div
                                  id={`left${index}`}
                                  className="rltdnwsclick"
                                  onClick={() =>
                                    toggleRelatedArticle(
                                      `left${index}`,
                                      title,
                                      item.id
                                    )
                                  }
                                >
                                  संबंधित खबरें
                                </div>

                                <div className="rltdnws-content">
                                  <div className="rltdnws">
                                    {(item?.related_story).map(
                                      (eachItem, index) => {
                                        return (
                                          <>
                                            {eachItem && (
                                              <a
                                                key={`eachItem${index}`}
                                                href={`${eachItem?.url}?ref=hp_related_stories`}
                                                onClick={() =>
                                                  logEvent(
                                                    "hp_related_story",
                                                    "click",
                                                    eachItem?.url
                                                  )
                                                }
                                              >
                                                {parser(eachItem?.title || "")}{" "}
                                              </a>
                                            )}
                                          </>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                        </li>
                      </>
                    )}
                  </Fragment>
                );
              })}
          </ul>
        </div>
        <div className="topnews-right">
          {liveTvPosition!={} && liveTvPosition?.live_tv=="true" && !isBudget && (
            <Wrapper
              wrap={skinning}
              wrapper={(child) => (
                <div className="livetvsponsorbox hindi_live_tv_skinning_wrap">
                  {child}
                </div>
              )}
            >
              <div className={`livetv ${skinning ? "forsponsores" : ""}`}>
                <div className="livetv-hdr dflex justify-space-betwwen">
                  <h2 className="livetvhd">
                    <a href="/livetv/">लाइव टीवी</a>
                  </h2>

                  <div className="livetv-chanelhd">
                    चैनल चुनें
                    <ul className="livetv-chanel-list">
                      <li>
                        <a
                          href="/livetv/news18-rajasthan/"
                          data-cat="livetv_channel_switch_D"
                          className="events_ana"
                        >
                          News18 राजस्थान
                        </a>
                      </li>
                      <li>
                        <a
                          href="/livetv/news18-bihar-jharkhand/"
                          data-cat="livetv_channel_switch_D"
                          className="events_ana"
                        >
                          News18 बिहार, झारखंड
                        </a>
                      </li>
                      <li>
                        <a
                          href="/livetv/news18-uttar-pradesh-uttarakhand/"
                          data-cat="livetv_channel_switch_D"
                          className="events_ana"
                        >
                          News18 उत्तर प्रदेश, उत्तराखंड
                        </a>
                      </li>
                      <li>
                        <a
                          href="/livetv/news18-madhya-pradesh-chhattisgarh/"
                          data-cat="livetv_channel_switch_D"
                          className="events_ana"
                        >
                          News18 मध्य प्रदेश, छत्तीसगढ़
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {skinning && (
                  <NewSiteAd
                    slotId={"Desktop_Static_Ad_Live_TV_TOP"}
                    style={{ textAlign: "center", height: "40px" }}
                    adUnit={
                      "NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_LIVTV_TOP_362x40"
                    }
                    sizes={[362, 40]}
                    className={"skinningAdTop"}
                    width={362}
                    height={40}
                    removeAdSpan={true}
                    lazyLoad={true}
                  />
                )}
                <div
                  className={`livetv-play ${skinning ? "forsponsores" : ""}`}
                >
                  <div
                    id="vidgyor_parent"
                    style={{
                      height: skinning ? "210px" : "220px",
                      width: "100%",
                    }}
                  >
                    <img
                      id="tvposterhome"
                      src="https://images.news18.com/ibnkhabar/uploads/2019/09/livetv.jpg?impolicy=website&width=407&height=229"
                      alt="News18 India Livetv"
                      title="News18 India Livetv"
                    />
                    <div
                      style={{ height: "100%", width: "100%" }}
                      id="vidgyor_container"
                    >
                      <div id="closeButtonContainer"></div>
                    </div>
                  </div>
                </div>
              </div>
              {skinning && (
                <NewSiteAd
                  slotId={"Desktop_Static_Ad_Live_TV_Bottom"}
                  adUnit={
                    "NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_LIVTV_BTM_362x40"
                  }
                  sizes={[362, 40]}
                  removeAdSpan={true}
                  style={{ textAlign: "center", height: "40px" }}
                  lazyLoad={true}
                />
              )}
            </Wrapper>
          )}
          <div className="globalhd">
            <h2>
              <a href="/news/">ताज़ा समाचार</a>
            </h2>
            <ReadMore
                link={publicRuntimeConfig.siteUrl+'news/'}
                label={`और भी पढ़ें`}
            />
          </div>
          <ul className="top-kharein">
            {topNewsRight &&
              topNewsRight.map((item, index) => {
                const width = 104;
                const height = 70;
                const src = getImage(item);
                const title = getTitle(item);
                const alt = getAlt(item);
                return title && (
                  <li key={index} className={"rltdnw"}>
                    <a href={getCompleteURL(item?.weburl_r || item?.web_url_r, item?.weburl || item?.web_url)}>
                      <div className="topNewImgContainer">
                        {item?.ff_source && item?.ff_source === "Hyperlocal" && (
                          <span className="nwvideoicon"></span>
                        )}
                        <figure width={width} height={height}>
                          <LazyLoadImage
                            src={src}
                            width={width}
                            height={height}
                            alt={alt}
                          />
                        </figure>
                      </div>
                      <h3>
                        {item?.liveblog_switcher === 1 && (
                          <span className="livenow_btn">Live</span>
                        )}
                        {title} {item.isNew ? <span className="just-in">JUST IN</span> : ""}
                      </h3>
                    </a>
                    {item?.showRelatedArticle &&
                      item?.related_story &&
                      Array.isArray(item?.related_story) &&
                      item?.related_story?.length && (
                        <>
                          <div
                            id={`right${index}`}
                            className="rltdnwsclick"
                            onClick={() =>
                              toggleRelatedArticle(
                                `right${index}`,
                                title,
                                item.id
                              )
                            }
                          >
                            संबंधित खबरें
                          </div>
                          <div className="rltdnws-content">
                            <div className="rltdnws">
                              {(item?.related_story_ss).map(
                                (eachItem, childIndex) => {
                                  return (
                                    <Fragment key={childIndex}>
                                      {eachItem && (
                                        <a
                                          key={`eachItem${childIndex}`}
                                          href={`${eachItem?.url}?ref=hp_related_stories`}
                                          onClick={() =>
                                            logEvent(
                                              "hp_related_story",
                                              "click",
                                              eachItem?.url
                                            )
                                          }
                                        >
                                          {parser(eachItem?.title || "")}
                                        </a>
                                      )}
                                    </Fragment>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </>
                      )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .just-in {
          background: #f3f3f3;
          color: #ed1c25;
          font: normal normal bold 11px / 18px Mukta;
          padding: 0px 6px;
          border-radius: 4px;
          vertical-align: middle;      
        }
        .topNewImgContainer {
          position: relative;
        }
        .forsponsores {
          margin-bottom: 0px !important;
        }
        .skinningAdTop {
          text-align: center;
          margin-top: 5px;
          z-index: -2;
        }
        .skinningAdBottom {
          text-align: center;
        }
        .rltdnws-content {
          max-height: 0px;
          overflow: hidden;
          margin-top: 5px;
          transition: 0.3s ease-in-out;
        }
        .rltdnwsclick {
          cursor: pointer;
          color: #ed1c24;
          text-align: center;
          text-transform: uppercase;
          font-size: 11px;
          font-family: arial;
          font-weight: bold;
          padding-top: 2px;
        }
        .rltdnwsclick:before {
          content: "";
          border-left: 2px solid #ed1c24;
          border-bottom: 2px solid #ed1c24;
          width: 4px;
          height: 4px;
          display: inline-block;
          position: relative;
          top: -2px;
          transform: rotate(-45deg);
          margin-right: 5px;
        }
        .rltdnwsclick.adcls:before {
          transform: rotate(-225deg);
          top: 0px;
        }
        .rltdnws {
          border: 1px solid #777;
          border-bottom-width: 3px;
          border-right-width: 4px;
          background: #fff;
          padding: 8px 10px 0 10px;
          box-shadow: 0px 2px 4px #ccc;
        }
        .rltdnws a {
          position: relative;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 450px;
          display: block !important;
          color: #333 !important;
          margin-bottom: 5px;
          line-height: 18px;
        }
        .rltdnws a:before {
          content: "";
          width: 5px;
          height: 5px;
          background: #ed1c24;
          display: inline-block;
          border-radius: 100%;
          position: relative;
          top: -2px;
          margin-right: 8px;
        }
        .rltdnws a:hover {
          color: #ed1c24 !important;
        }
        .topnews-left-list li:first-child .rltdnws {
          margin: 0px 15px 0 50px;
        }
        .topnews-left-list li:first-child .rltdnws a {
          width: 410px;
        }
        .top-kharein li .rltdnws a {
          width: 370px;
        }
        // .topnews-left-list li:last-child {
        //   padding-bottom: 5px;
        // }
        .rltdnws-content.active-related-article {
          max-height: 150px;
          transition: 0.3s ease-in-out;
        }

        .topnews .globalhd {
          margin-top: 0px;
        }
        .topnews-left-list li a h2:hover {
          color: #ed1c24;
        }
        .hd_heading {
          font-size: 20px;
          font-weight: bold;
          margin: 6px 0;
          display: block;
          width: 100%;
          background: #fff;
          line-height: 18px;
        }
        .hd_heading h1 {
          font-weight: bold;
          font-size: 20px;
          display: inline-block;
        }
        // ul.topnews-left-list {
        //   background: #f3f3f3;
        // }
        .topnews-left-list li:first-child a h2 {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.45;
          position: absolute;
          background: #f3f3f3;          
          padding: 10px 15px 0 15px;
          bottom: 5px;
          left: 5px;
          width: 430px;
          border-radius: 4px;
        }

        .topnews-left-list li a h2,
        .topnews-left-list li a h3 {
          font-size: 17px;
          font-weight: bold;
          line-height: 1.45;
          margin: auto;
          width: calc(100% - 90px);
          white-space: break-spaces;
        }
        .topnews-left-list li:first-child {
          background: #f3f3f3;
          margin: 0 0 12px 0;
          position: relative;
          padding: 0;
          border: 0;
        }
        .topnews-left-list li {
          margin: 0 12px 0 12px;
          min-height: 53px;
          border-bottom: 1px solid#e0e0e0;
          padding: 10px 0;
        }
        .topnews-left-list li:first-child figure {
          width: 514px;
          margin: 0;
          min-height: 347px;
        }
        .topnews-left-list li:first-child figure img {
          width: auto;
          height: 347px;
          display: block;
          margin: 0 auto;
        }
        .topnews-left-list li figure {
          width: 104px;
          margin-right: 15px;
          flex-shrink: 0;
          height: 70px;
          position: relative;
          overflow: hidden;
          font-size: 0;
          background-color: #dbdbdb;
          border-radius: 4px;
        }
        .topnews-left-list li figure img {
          width: 104px;
          height: 70px;
        }
        .topnews-left {
          width: 56%;
          background: #fff;
        }
        .topnews-left-list li:first-child a {
          flex-wrap: wrap;
        }
        .topnews-left-list li a {
          display: flex;
          font-weight: 700;
          color: #000;
        }
        .justify-space-betwwen {
          justify-content: space-between;
        }
        .topnews-right {
          width: 42.5%;
        }
        .globalhd {
          border-bottom: 1px solid #001536;
          padding-bottom: 4px;
          position: relative;
          display: flex;
          justify-content: space-between;
        }
        .globalhd h2 {
          color: #111;
          font-size: 16px;
          font-weight: 700;
          line-height: 28px;
          flex-shrink: 0;
          margin-right: 20px;
          text-transform: uppercase;
        }
        .globalhd:after {
          content: "";
          width: 25px;
          height: 4px;
          position: absolute;
          bottom: -2px;
          left: 0;
          background: #ed1c24;
        }
        .top-kharein {
          background-color: #F3F3F3;
          padding: 0 10px;
        }
        .top-kharein li {
          font-size: 15px;
          line-height: 1.45;
          border-bottom: 1px solid #E0E0E0;
          padding: 12px 0;
        }
        .top-kharein li.rltdnw {
          padding: 12px 0 6px;
        }
        .top-kharein li h3 {
          font-size: 15px;
          font-weight: bold;
          white-space: break-spaces;
        }
        .top-kharein li a {
          color: #000;
          display: flex;
        }
        .top-kharein li a figure {
          flex-shrink: 0;
          margin-right: 15px;
          width: 104px;
          position: relative;
          height: 70px;
          overflow: hidden;
          font-size: 0;
          background-color: #dbdbdb;
          border-radius: 4px;
        }
        .top-kharein li a figure img {
          width: 104px;
          flex-shrink: 0;
          margin-right: 15px;
          height: 70px;
        }
        .livetv-hdr {
          position: relative;
          z-index: 1;
        }

        .justify-space-betwwen {
          justify-content: space-between;
        }
        .dflex {
          display: flex;
        }
        .livetvhd {
          color: #001536;
          font-size: 18px;
          text-transform: uppercase;
          border-bottom: 3px solid #ed1c24;
          padding-right: 20px;
        }
        .livetvhd a {
          color: #001536;
          font-weight: bold;
        }
        .livetv-chanelhd {
          color: #ed1c24;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          height: 30px;
          line-height: 30px;
          padding: 0 18px 0 15px;
          position: relative;
        }
        .livetv-chanelhd:before {
          content: "";
          width: 6px;
          height: 6px;
          border-top: 1px solid #ed1c24;
          border-left: 1px solid #ed1c24;
          right: 2px;
          transform: rotate(-135deg);
          top: 10px;
          transition: all 0.5s ease-in-out;
          display: block;
          position: absolute;
        }
        .livetv-chanel-list {
          position: absolute;
          background: #f7f6f1;
          padding: 10px 12px 0 12px;
          top: 30px;
          z-index: 1;
          box-shadow:
            0 20px 25px -5px rgb(0 0 0 / 40%),
            0 10px 10px -5px rgb(0 0 0 / 4%);
          display: none;
          right: 0;
          width: 180px;
        }
        .livetv-chanel-list li a {
          color: #555;
          font-size: 14px;
          font-weight: 700;
          position: relative;
          padding-left: 10px;
          display: block;
          line-height: 1.45;
          margin-bottom: 18px;
        }
        .livetv-play {
          width: 100%;
          height: 220px;
          overflow: hidden;
          margin-bottom: 15px;
          position: relative;          
        }
        .livetv-play img {
          width: 100%;
        }
        .livetv-player {
          background: #000;
          height: 229px;
          width: 100%;
        }
        .top-kharein li:hover a {
          color: #ed1c24;
        }
        .livetv-chanelhd:hover {
          background: #ed1c24;
          color: #fff;
          padding: 0 30px 0 15px;
        }
        .livetv-chanelhd:hover .livetv-chanel-list {
          display: block;
        }
        .livetv-chanelhd:hover::before {
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          right: 15px;
        }
        .livetv-chanel-list li a:before {
          content: "";
          width: 3px;
          height: 16px;
          background: #ed1c24;
          position: absolute;
          top: 3px;
          left: 0;
        }
        .livenow_btn {
          background: #ed1c24;
          color: #fff;
          border-radius: 2px;
          font-size: 11px;
          text-transform: uppercase;
          padding: 3px 7px 2px 23px;
          font-weight: bold;
          margin-right: 5px;
          position: relative;
        }
        .livenow_btn:after,
        .livenow_btn:before {
          content: "";         
          position: absolute;
          opacity: 0;
          box-sizing: border-box;
          top: 5px;
          left: 6px;
          width: 12px;
          height: 12px;
          border: 2px solid #fff;
          box-shadow:
            0 0 10px #fff,
            inset 0 0 10px #fff;
          border-radius: 100px;
          background-clip: padding-box;
        }
        .livenow_btn:before {
          z-index: 2;
          -webkit-animation: blinker 2s infinite;
          animation: blinker 2s infinite;
        }
        .liveadj {
          bottom: 7px;
        }
        .livenow_btn:after {
          z-index: 1;
          -webkit-animation: blinker 2s infinite 1s;
          animation: blinker 2s infinite 1s;
        }
        .nwvideoicon {
          width: 45px;
          height: 45px;
          position: absolute;
          top: 50%;
          left: 43%;
          z-index: 1;
          margin: -22px 0 0 -22px;
          cursor: pointer;
          background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
          transform: scale(0.6);
        }
        @keyframes blinker {
          0% {
            -webkit-transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          to {
            -webkit-transform: scale(1);
            opacity: 0;
          }
        }
        .topnews-left-list li #native-ad-hp-2020 {
          height: 70px;
        }
        ${skinning
          ? `
        .topnews-left.forsponsores{width: 42%}	
        .topnews-right.forsponsores{display: flex; flex-wrap: wrap; width: 56%;}
        .livetvsponsorbox{width: 100%;}
        .livetvsponsorimg{text-align:center; max-width: 100%; flex-shrink: 0; margin-top: 0px;}
        .livetv.forsponsores{width: 100%; margin:0 1px;}
        .livetv-play.forsponsores{height: 212px;}
        .livetvsponsorimg.hindi_hp_page_left_ad, .livetvsponsorimg.hindi_hp_page_right_ad{margin-top: 30px;}
        .newlivetv-widget{width: 100%;}
        .lokmat_live_tv_skinning_wrap {width: 100%;}
        .topnews-right.forsponsores .lokmat_live_tv_skinning_wrap h2, .newlivetv-widget h2{margin-left: 79px;}
        .topnews-right.forsponsores .lokmat_live_tv_skinning_wrap .livetvsponsorbox .livetvsponsorimg{margin-top:0px; background: #eee;}
        .hindi_live_tv_pg_top_ad,
        .hindi_live_tv_pg_bottom_ad {display: flex;justify-content: center;}
        `
          : ""}
      `}</style>
    </>
  );
};

export default HomeTopNews;
