import React from "react";
import getConfig from "next/config";
import LazyLoad from "react-lazyload";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import VideoImage from "components/Common/VideoImage";
import RhsVideo from "widgets/Common/Desktop/RhsVideo";
import VideosAjax from "components/Common/VideosAjax";
import Head from "next/head";
import { TaboolaList } from "includes/Tabola.helper";
import Taboola from "widgets/Common/Responsive/Taboola";

const moment = require("moment-timezone");

const Channel = (props) => {
  const { publicRuntimeConfig } = getConfig();

  const outBrainUrl = publicRuntimeConfig.siteUrl + "videos/";
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
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/video_css_1593578949.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="video_page">
        <div className="container">
          <div className="video_breadcrumbs">
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

          <div className="video_container">
            <div className="video_page_left">
              <div id="video_div">
                {topStoryArraydata.map((topNews, key) => (
                  <div className="featured_video">
                    <div className="featured_video_left">
                      <div className="featured_heading">फ़ीचर वीडियो</div>
                      <ul className="date_time">
                        <li>{featureTime(topNews["published_at"])}</li>
                      </ul>
                      <h2 className="featured_title">
                        <a href={topNews["url"]}>{topNews["title"]}</a>
                      </h2>
                      <p className="featured_intro">{topNews["title"]}</p>
                    </div>
                    <div className="featured_video_right">
                      <VideoImage
                        headline={topNews["title"]}
                        image={topNews["thumbnail"]}
                        channelLogo=""
                        videoId={topNews["video"]}
                        caption={topNews["title"]}
                        isMobile={false}
                        categories={"videos"}
                        tags=""
                        hola_player=""
                        videoUrl=""
                        articleData=""
                        youtubeId=""
                        videosList={true}
                      />
                    </div>
                  </div>
                ))}

                <ul className="featured_list">
                  {topStoryArraylist.map((topNews, key) => (
                    <li>
                      <a
                        href={topNews["url"]}
                        target="_blank"
                        className="dflex_center"
                      >
                        <figure className="img_hover">
                          <img
                            // src="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                            loading="lazy"
                            className=""
                            src={topNews["thumbnail"]}
                            alt=""
                            title={topNews["title"]}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg";
                            }}
                          />
                        </figure>
                        <div className="statements">
                          <span>{featureTime(topNews["published_at"])}</span>
                          <h2>{topNews["title"]}</h2>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div style={{height:"540px",width:"100%"}}>
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
                  isMobile={false}
                  dtype={"video"}
                  channelSts={true}
                />
              </LazyLoad>

              {props.pageAds?.BTF_728 && (
                <>
                  <SiteAd
                    width={728}
                    height={90}
                    slotId={"Desktop_Static_Ad_2"}
                    adUnit={props.pageAds.BTF_728}
                    sizes={[
                      [728, 90],
                      [1, 1]
                    ]}
                    loadonScroll={true}
                  ></SiteAd>
                </>
              )}

              {/* Outbrain start here */}
              {/* {<Outbrain widgetId="AR_6" widgetSrc={outBrainUrl} />} */}
              {/* Outbrain end here */}
              <Taboola mode={TaboolaList.videoPage.bottom.mode}
               id ={TaboolaList.videoPage.bottom.id}
               container={TaboolaList.videoPage.bottom.container}
                placement = {TaboolaList.videoPage.bottom.placement}
              />
            </div>

            <div className="rightwrap ">
              <div className="video_page_right rhs_sticky">
                <RhsVideo
                  section="video"
                  pageAds={props.pageAds}
                  currentURL={outBrainUrl}
                  trendingVideoData={youtubeChannelTrendingData}
                  taboolaList={TaboolaList.videoPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          .rightwrap {
            position: sticky;
            top: 55px;
          }
          .rightwrap {
            width: 300px;
            float: right;
          }

          .story_section_slider {
            border-bottom: 0px rgba(0, 0, 0, 0.14) solid;
          }
          body .trading_title {
            width: 100%;
            height: auto;
            padding-left: 0px;
          }
          body .video_page_left {
            float: none;
          }
          body .rightwrap {
            float: none;
          }
          body .news_page_right {
            float: none;
          }
          body .rhs_sticky {
            position: sticky !important;
            top: 0px !important;
          }
          .top-news-title h1 {
            font-size: 28px;
            line-height: 32px;
            color: #001d42;
            font-family: "Mukta", sans-serif !important;
            font-weight: bold;
            margin-bottom: 2px;
          }
        `}
      </style>
    </>
  );
};
export default React.memo(Channel);
