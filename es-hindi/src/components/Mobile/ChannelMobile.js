import React, { useEffect } from "react";
import getConfig from "next/config";
import LazyLoad from "react-lazyload";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import VideoImage from "components/Common/VideoImage";
import VideosAjax from "components/Common/VideosAjax";
import Head from "next/head";
import Glide from "@glidejs/glide";

const moment = require("moment-timezone");

import SocialShare from "./SocialShare";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";

// import VideoMobileStyle from "./VideoMobile.module.css";

const ChannelMobile = (props) => {
  const { publicRuntimeConfig } = getConfig();
  useEffect(() => {
    // new Glide(".watch_more_slider", {
    //   perView: 3,
    //   draggable: true,
    //   type: "slider",
    //   rewind: false,
    //   gap: 5,
    //   slidesToShow: 1
    // }).mount();

    new Glide(".story_slider_pwa", {
      perView: 1,
      gap: 5,
      slidesToShow: 1,
      draggable: true,
      peek: { before: 0, after: 120 }
    }).mount();
  }, []);

  // current url
  const outBrainUrl = props.data.currentUrl;
  const topStoryArraydata = props.data.topStoryArray[0]["stories"].slice(0, 1);
  const topStoryArraylist = props.data.topStoryArray[0]["stories"].slice(1, 7);
  const channelsList = props.data.channels;
  const { youtubeChannelTrendingData } = props.data;

  const featureTime = (fTime) => {
    return (
      moment(fTime)
        .tz("Asia/Kolkata")
        .format("MMMM Do YYYY, h:mm:ss a") + " IST"
    );
  };

  return (
    <>
      <Head>
        <link
          href="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/video_pwa_css_1593578970.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="brdcrm">
        <ul>
          {props.data.breadCrumbArray.map((post) =>
            post.slug != "" ? (
              <li>
                <a href={post.slug}>{post.value + " »"}</a>
              </li>
            ) : (
              <li>
                <span>{post.value}</span>
              </li>
            )
          )}
        </ul>
      </div>

      <div dangerouslySetInnerHTML={{ __html: props.data.titleDiv }}></div>
      <div className="clearfix vsp10"></div>

      <div className="pwa_top_add pwa_add">
        <div className="clearfix add">
          <div className="addinner-box">
            <SiteAd
              slotId={`mobile_atf_320`}
              adUnit={`NW18_HIND_PWA/NW18_HIND_VIDEO_PWA/NW18_HIND_VIDEO_PWA_AL/NW18_HIND_VID_AL_PWA_ROS_ATF_320`}
              sizes={[
                [300, 250],
                [336, 280]
              ]}
              width={336}
              height={280}
            />
          </div>
        </div>
      </div>
      <div className="top_story">
        <h2 className="top_h">
          <a href={topStoryArraydata[0]["url"]}>फ़ीचर वीडियो</a>
        </h2>
        <div className="top_story_img">
          <VideoImage
            headline={topStoryArraydata[0]["title"]}
            // image={topStoryArraydata[0]["thumbnail"]}
            channelLogo=""
            videoId={topStoryArraydata[0]["video"]}
            caption={topStoryArraydata[0]["title"]}
            isMobile={true}
            categories={"videos"}
            tags=""
            hola_player=""
            videoUrl=""
            articleData=""
            youtubeId=""
            videosList={true}
          />
        </div>
        <ul className="date_time">
          <li>{featureTime(topStoryArraydata[0]["published_at"])}</li>{" "}
          <li>Politics</li>{" "}
        </ul>
        <h2 className="top_story_h">
          <a href={topStoryArraydata[0]["url"]}>
            {topStoryArraydata[0]["title"]}
          </a>
        </h2>
        <SocialShare
          url={props.data.currentUrl || outBrainUrl}
          headline={topStoryArraydata[0]["title"]}
        />
      </div>

      <div className="story_slider_pwa story_slider_0_0">
        <div className="glide__track" data-glide-el="track">
          <div className="glide__slides">
            {topStoryArraylist.map((topStoryData, key) => (
              <div>
                <a href={topStoryData["url"]} className="story_slider_row">
                  <figure>
                    <img
                      src="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                      loading="lazy"
                      className="lazy lazy-load fader"
                      data-original={topStoryData["thumbnail"]}
                      alt={topStoryData["title"]}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg";
                      }}
                    />
                  </figure>
                  <div className="story_heading">
                    <p>{topStoryData["title"]}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="glide__bullets" data-glide-el="controls[nav]">
          {topStoryArraylist.map((topStoryData, key) =>
            key <= 5 ? (
              <button className="glide__bullet" data-glide-dir="=0"></button>
            ) : (
              ""
            )
          )}
        </div>
      </div>

      <div className="pwa_top_add pwa_add">
        <div className="clearfix add">
          <div className="addinner-box">
            <SiteAd
              slotId={`mobile_atf_300`}
              adUnit={`NW18_HIND_PWA/NW18_HIND_VIDEO_PWA/NW18_HIND_VIDEO_PWA_AL/NW18_HIND_VID_AL_PWA_ROS_ATF_300`}
              sizes={[
                [300, 250],
                [336, 280]
              ]}
              width={300}
              height={280}
              lazyload={true}
            />
          </div>
        </div>
      </div>

      {/* <div id="video_div">
        <div className="watch_more">
          <h2 className="watch_more_title">
            <a href="#">और देखें</a>
          </h2>
          <div className="watch_more_slider">
            <div className="glide__track" data-glide-el="track">
              <div className="glide__slides">
                {channelsList.map((watch, key) => (
                  <div className="watch_more_row">
                    <a href={"/videos/" + watch["slug"]}>
                      <figure>
                        <img
                          src={watch["banner"]["url"]}
                          loading="lazy"
                          className="lazy lazy-load fader"
                          data-original={watch["banner"]["url"]}
                          alt={watch["title"]}
                          title={watch["title"]}
                        />{" "}
                        <div className="play-icon">
                          <span className="play-button">
                            <span></span>
                          </span>
                        </div>{" "}
                      </figure>
                      <h3 className="watchmore_title">{watch["title"]}</h3>
                    </a>
                  </div>
                ))}
              </div>
              <div className="glide__arrows" data-glide-el="controls">
                <button
                  className="glide__arrow glide__arrow--left"
                  data-glide-dir="<"
                >
                  prev
                </button>
                <button
                  className="glide__arrow glide__arrow--right"
                  data-glide-dir=">"
                >
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

{typeof props.pageAds !== 'undefined' &&
      typeof props.pageAds.PG_1x1 !== 'undefined' &&
      props.pageAds.PG_1x1 !== '' ? (
        <SiteAd
          slotId="PG_1x1"
          adUnit={props.pageAds.PG_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : (
        ''
      )}

      {typeof props.pageAds !== 'undefined' &&
      typeof props.pageAds.PG_Slider_1x1 !== 'undefined' &&
      props.pageAds.PG_Slider_1x1 !== '' ? (
        <SiteAd
          slotId="PG_Slider_1x1"
          adUnit="/1039154/NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1"
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : (
        ''
        )}

      {typeof props.pageAds !== 'undefined' &&
      typeof props.pageAds.SHOSH_OOP !== 'undefined' &&
      props.pageAds.SHOSH_OOP !== '' ? (
        <SiteAd
          slotId="SHOSH_OOP"
          adUnit={props.pageAds.SHOSH_OOP}
          sizes={[[1, 1]]}
          removeAdSpan={true} lazyload={true}
          loadonScroll={true}
        />
      ) : (
        ''
      )}
      {/* <div style={{height:"240px",width:"100%"}}>
        <Taboola mode={TaboolaList.videoPage.center.mode}
          id ={TaboolaList.videoPage.center.id}
          container={TaboolaList.videoPage.center.container}
          placement = {TaboolaList.videoPage.center.placement}
          />
      </div> */}
      <LazyLoad offset={100}>
        <VideosAjax
          key={"limit"}
          channels={channelsList}
          pageAds={props.pageAds}
          isMobile={true}
          dtype={"video"}
          channelSts={true}
        />
      </LazyLoad>
      <div className="pwa_top_add clearfix">
        {/* <Outbrain widgetSrc={outBrainUrl} widgetId="MB_9" /> */}
        <Taboola mode={TaboolaList.videoPage.bottom.mode}
         id ={TaboolaList.videoPage.bottom.id}
         container={TaboolaList.videoPage.bottom.container}
          placement = {TaboolaList.videoPage.bottom.placement}
        />
      </div>

      <style jsx global>{`
        .brdcrm {
          padding: 10px 16px;
          font-size: 15px;
        }
        .brdcrm a {
          padding: 0 5px;
        }
        .brdcrm a:first-child {
          padding: 0 5px 0 0;
        }
        .brdcrm {
          color: #000;
          font-size: 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          clear: both;
          padding: 10px 10px;
        }
        .brdcrm a {
          color: #757575;
          font-weight: 400;
          text-decoration: none;
          margin: 0px;
        }

        .brdcrm li {
          font-size: 12px;
          padding: 0 5px;
          color: #757575;
          list-style: none;
          display: inline;
          text-transform: capitalize;
        }

        .brdcrm li:first-child {
          padding-left: 0;
        }
        .brdcrm h1 {
          display: inline-block;
          font-size: 15px;
        }
        .add {
          background: #dbdde3!Important;
        }
        .watch_more_slider .glide__slides {
          overflow: hidden;
          display: flex;
        }
        .watch_more_slider .glide__arrows {
          top: 29%;
        }
        .watch_more_slider button.glide__arrow.glide__arrow--left {
          right: -23px;
          left: inherit;
        }
        .watch_more_slider button.glide__arrow {
          z-index: 1;
          width: 48px;
          height: 48px;
          background: #e0261d;
          font-size: 0;
          border: 0;
          border-radius: 100%;
          position: absolute;
          outline: none;
          cursor: pointer;
          top: 33%;
          left: -23px;
        }
        .watch_more_slider button.glide__arrow:after {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 19px;
          right: 27px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
          transform: rotate(-45deg);
        }
        .watch_more_slider button.glide__arrow.glide__arrow--right:after {
          right: 7px;
          border-bottom: 0px solid #fff;
          border-right: 0px solid #fff;
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
        }
        .story_section_slider .glide__slides {
          display: flex;
          overflow: hidden;
        }
        .story_section_row {
          padding: 0;
        }
        .story_section_slider button.glide__arrow {
          display: none;
        }
        .social_share_sec {
          margin-bottom: 15px;
        }
        ul.art_social_share {
          font-family: "Mukta", sans-serif !important;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        ul.art_social_share li {
          color: #6b6b6b;
          font-size: 14px;
          margin-left: 15px;
          text-transform: uppercase;
          line-height: 0;
          background-color: #ccc;
        }
        ul.art_social_share li:first-child {
          margin-left: 0px;
        }

        .spriteshare {
          background: url(/images/siteimages/sprite_img_fornewarticle_1636363070.svg)
            0 0 no-repeat;
          width: 40px;
          height: 40px;
          display: block;
        }
        .spriteshare.art-facebook-icon {
          background-position: 0px 0px;
        }
        .spriteshare.art-twitter-icon {
          background-position: 0px -50px;
        }
        .spriteshare.art-linkedin-icon {
          background-position: 0px -100px;
        }
        .spriteshare.art-whatsapp-icon {
          background-position: 0px -150px;
        }
        .spriteshare.art-telegram-icon {
          background-position: 0 -200px;
        }
        .spriteshare.art-email-icon {
          background-position: 0 -250px;
        }
        .top-news-title h1,
        .top-news-title h2 {
          font-size: 26px;
          line-height: 32px;
          color: #001d42;
          font-weight: bold;
          margin: 10px 0px 5px 0px;
          border-bottom: 1px solid #eee;
          padding: 0 15px 5px 15px;
        }
      `}</style>
    </>
  );
};
export default React.memo(ChannelMobile);
