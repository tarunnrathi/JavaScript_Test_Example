import React, { useState } from "react";
import getConfig from "next/config";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import Head from "next/head";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import { videos } from "includes/videos.helper";
import { getArticleList } from "api/global/Common";
import { getCompleteURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const moment = require("moment-timezone");

const Playlist = (props) => {
  const { data, pageAds, catVideoTrack } = props;
  const {
    topStoryArray,
    breadCrumbArray,
    titleDiv,
    topStories,
    urlParam,
    trendingStories,
    articleData,
    photoStories,
  } = data;
  const { publicRuntimeConfig } = getConfig();
  const [loadMore, setLoadMore] = useState(1);
  const [loadCheck, setloadCheck] = useState(topStoryArray.length);
  const [videoData, setVideoData] = useState(topStoryArray);
  // current url
  const outBrainUrl = publicRuntimeConfig.siteUrl + "videos/";

  const cat = catVideoTrack;
  const topStoryArraydata = videos.topStoryArraydata(videoData);
  const topStoryArraylist = videos.topStoryArraylist(videoData);
  const topStoryArraylists = videos.topStoryArraylists(videoData);
  const featureTime = (fTime) => {
    return (
      moment(fTime).tz("Asia/Kolkata").format("MMMM Do YYYY, h:mm:ss a") +
      " IST"
    );
  };
  const loadPosts = async (d) => {
    if (d) {
      const currentLoadMore = d;
      const offset =
        urlParam?.channel === "latest"
          ? currentLoadMore * 24 + 7
          : currentLoadMore * 24;
      const pageLimit = 24;
      const category_videos =
        urlParam?.channel === "latest"
          ? { post_type: "videos" }
          : urlParam?.channel === "local18"
          ? { not: { local18_video: "" } }
          : { "categories.slug": `${cat}`, post_type: "videos" };
      let tempvideoData = await getArticleList({
        count: pageLimit,
        offset: offset,
        filter: category_videos,
        fields: `story_id,display_headline,images,weburl_r`,
      }, true);
      if (typeof tempvideoData === "undefined") {
        tempvideoData = [];
      }
      tempvideoData?.length > 0
        ? setLoadMore(currentLoadMore + 1)
        : setloadCheck(0);
      setVideoData((prev) => [...prev, ...tempvideoData]);
    }
  };
  const { category = "" } = urlParam || {};
  return (
    <>
      <Head>
        <link
          href="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/video_css_1593578949.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="video_page">
        <div className="container">
            <BreadcrumbCommon breadCrumbArray={props.data.breadCrumbArray} />

          <div className="clearfix vsp10"></div>

          <div className="video_container">
            <div className="video_page_left">
              <div id="video_div">
                {topStoryArraydata.map((topNews) => (
                  <div className="featured_video" key={topNews?.story_id}>
                    <div className="featured_video_left">
                      <div dangerouslySetInnerHTML={{ __html: titleDiv }}></div>
                      <ul className="date_time">
                        <li>{featureTime(topNews["updated_at"])}</li>
                      </ul>
                      <h2 className="featured_title">
                        <a
                          href={getCompleteURL(
                            topNews["weburl_r"],
                            topNews["weburl"],
                          )}
                        >
                          {topNews["display_headline"]}
                        </a>
                      </h2>
                      <p className="featured_intro">
                        {topNews["display_headline"]}
                      </p>
                    </div>
                    <div className="featured_video_right">
                      <a
                        href={getCompleteURL(
                          topNews["weburl_r"],
                          topNews["weburl"],
                        )}
                      >
                        <div className="fe_img_wrp">
                          <LazyLoadImage
                            src={topStoryArraydata[0]?.images?.url}
                            width={499}
                            height={281}
                            alt={
                              topStoryArraydata[0]["display_headline"] ||
                              topStoryArraydata[0]["headline"]
                            }
                            title={
                              topStoryArraydata[0]["display_headline"] ||
                              topStoryArraydata[0]["headline"]
                            }
                          />
                          <div className="v_icon"></div>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}

                <ul className="featured_list">
                  {topStoryArraylist.map((topNews) => (
                    <li key={topNews?.story_id}>
                      <a
                        href={getCompleteURL(
                          topNews["weburl_r"],
                          topNews["weburl"],
                        )}
                        target="_blank"
                        className="dflex_center"
                      >
                        <div className="img_ln img_hover">
                          <LazyLoadImage
                            src={topNews.images?.url}
                            width={145}
                            height={87}
                            alt={
                              topNews["display_headline"] || topNews["headline"]
                            }
                            title={
                              topNews["display_headline"] || topNews["headline"]
                            }
                          />
                        </div>
                        <div className="statements">
                          <span>{featureTime(topNews["updated_at"])}</span>
                          <h2>{topNews["display_headline"]}</h2>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ralted_news">
                {topStoryArraylists.map((topNews) => (
                  <div className="story_section_row" key={topNews?.story_id}>
                    <a
                      href={getCompleteURL(
                        topNews["weburl_r"],
                        topNews["weburl"],
                      )}
                      target="_blank"
                    >
                      <div className="img_ln img_hover">
                        <LazyLoadImage
                          src={topNews.images?.url}
                          width={207}
                          height={124}
                          alt={
                            topNews["display_headline"] || topNews["headline"]
                          }
                          title={
                            topNews["display_headline"] || topNews["headline"]
                          }
                        />
                      </div>
                      <figcaption>
                        <h3 className="story_title">
                          {topNews["display_headline"]}
                        </h3>
                      </figcaption>
                    </a>
                  </div>
                ))}
              </div>
              {pageAds?.BTF_728 && (
                <>
                  {/* <SiteAd
                    width={728}
                    height={90}
                    slotId={"Desktop_Static_Ad_2"}
                    adUnit={pageAds.BTF_728}
                    sizes={[
                      [728, 90],
                      [1, 1],
                    ]}
                    loadonScroll={true}
                  ></SiteAd> */}
                  <NewSiteAd
                    slotId={"Desktop_Static_Ad_2"}
                    adUnit={pageAds.BTF_728}
                    sizes={[
                      [728, 90],
                      [1, 1],
                    ]}
                    width={728}
                    height={90}
                    loadOnScroll={true}
                  />
                </>
              )}
              {loadCheck > 0 ? (
                loadMore <= 30 ? (
                  <button
                    type="button"
                    onClick={() => loadPosts(loadMore, videoData)}
                    className="load_more clearfix"
                  >
                    Load More
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {/* Outbrain start here */}
              {<Outbrain widgetId="AR_6" widgetSrc={outBrainUrl} />}
              {/* Outbrain end here */}

              <Taboola
                mode={TaboolaList.category.bottom.mode}
                id={TaboolaList.category.bottom.id}
                container={TaboolaList.category.bottom.container}
                placement={TaboolaList.category.bottom.placement}
              />
            </div>

            <div className="rightwrap">
              <div className="video_page_right rhs_sticky">
                <RhsCommon
                  pageAds={pageAds}
                  currentURL={outBrainUrl}
                  photoStories={photoStories}
                  topStories={topStories}
                  articleData={articleData}
                  hideAstro={true}
                  cat={category}
                  trendingStory={trendingStories}
                  taboolaList={TaboolaList.articlePage}
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
          .ralted_news {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            // float: left;
          }
          .ralted_news .story_section_row {
            width: 25%;
            margin-bottom: 30px;
          }
          .pagination {
            display: flex;
            justify-content: center;
            clear: both;
            margin: 10px 0 30px;
            overflow: hidden;
            float: left;
            width: 100%;
            border-top: 1px rgba(0, 0, 0, 0.14) solid;
            padding-top: 20px;
          }
          .pagination a {
            background: #c5c5c5;
            margin: 0 4px;
            width: 30px;
            height: 30px;
            border-radius: 100px;
            text-align: center;
            font-size: 14px;
            color: #000;
            align-items: center;
            display: flex;
            justify-content: center;
          }
          .pagination a:hover {
            background: #e0261d;
            color: #fff;
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
            line-height: 43px;
            color: #001d42;
            font-family: "Mukta", sans-serif !important;
            font-weight: bold;
            margin-bottom: 2px;
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
            margin: 15px auto;
            cursor: pointer;
          }
          .fe_img_wrp {
            position: relative;
            border: 1px solid #4a4a4a;
            display: block;
            flex-shrink: 0;
            line-height: 0;
          }
          .fe_img_wrp img {
            width: 100%;
          }
          .fe_img_wrp:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000000;
            opacity: 0.3;
          }
          .fe_img_wrp .v_icon,
          .fes_img .v_icon {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/images/v-icon.svg")
              no-repeat center center;
            z-index: 1;
          }
          .lazyload-wrapper {
            min-height: 250px;
          }
          .img_ln {
            margin-right: 10px;
            line-height: 0;
          }
        `}
      </style>
    </>
  );
};
export default React.memo(Playlist);
