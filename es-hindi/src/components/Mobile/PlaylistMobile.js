import React, { useEffect, useState } from "react";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import Head from "next/head";
import Glide from "@glidejs/glide";

const moment = require("moment-timezone");

import SocialShare from "./SocialShare";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import { videos } from "includes/videos.helper";
import { getArticleList } from "api/global/Common";
import { getCompleteURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const PlaylistMobile = (props) => {
  const { data, catVideoTrack } = props;
  const {
    topStoryArray,
    pageAds,
    urlParam,
    currentUrl,
    breadCrumbArray,
    titleDiv,
  } = data;
  const [loadMore, setLoadMore] = useState(1);
  const [loadCheck, setloadCheck] = useState(topStoryArray.length);
  const [videoData, setVideoData] = useState(topStoryArray);
  useEffect(() => {
    new Glide(".story_slider_pwa", {
      perView: 1,
      gap: 5,
      slidesToShow: 1,
      draggable: true,
      peek: { before: 0, after: 120 },
    }).mount();
  }, []);
  // current url
  const outBrainUrl = currentUrl;
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
  return (
    <>
      <Head>
        <link
          href="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/video_pwa_css_1593578970.css"
          rel="stylesheet"
        ></link>
      </Head>
      <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />

      <div dangerouslySetInnerHTML={{ __html: titleDiv }}></div>
      <div className="clearfix vsp10"></div>

      <div className="pwa_top_add pwa_add">
        <div className="clearfix add">
          <div className="addinner-box">
            {/* <SiteAd
              slotId={`mobile_atf_320`}
              adUnit={pageAds.header_ATF_320}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={336}
              height={280}
              lazyload={true}
              style={{ padding: "16px" }}
            /> */}
            <NewSiteAd
              slotId={"mobile_atf_320"}
              adUnit={pageAds.header_ATF_320}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={336}
              height={280}
              lazyLoad={true}
              style={{ padding: "16px" }}
            />
          </div>
        </div>
      </div>
      {topStoryArraydata && topStoryArraydata.length !== 0 && (
        <div className="top_story">
          <a
            href={
              topStoryArraydata[0]
                ? getCompleteURL(
                    topStoryArraydata[0]["weburl_r"],
                    topStoryArraydata[0]["weburl"]
                  )
                : "/videos/"
            }
          >
            <div className="fe_img_wrp">
              <div className="img_nw img_hover">
                <LazyLoadImage
                  src={topStoryArraydata[0]?.images?.url}
                  width={354}
                  height={240}
                  alt={
                    topStoryArraydata?.[0]?.["display_headline"] ||
                    topStoryArraydata?.[0]?.["headline"]
                  }
                  title={
                    topStoryArraydata?.[0]?.["display_headline"] ||
                    topStoryArraydata?.[0]?.["headline"]
                  }
                />
              </div>
              <div className="v_icon"></div>
            </div>
            <ul className="date_time">
              <li>{featureTime(topStoryArraydata[0]["updated_at"])}</li>{" "}
            </ul>
            <h2 className="top_story_h">
              {topStoryArraydata[0]
                ? topStoryArraydata[0]["display_headline"]
                : ""}
            </h2>
          </a>
          <SocialShare
            url={currentUrl || outBrainUrl}
            headline={
              topStoryArraydata[0]
                ? topStoryArraydata[0]["display_headline"]
                : ""
            }
          />
        </div>
      )}

      <div className="story_slider_pwa story_slider_0_0">
        <div className="glide__track" data-glide-el="track">
          <div className="glide__slides">
            {topStoryArraylist.map((topStoryData) => (
              <div key={topStoryData?.story_id}>
                <a
                  href={getCompleteURL(
                    topStoryData["weburl_r"],
                    topStoryData["weburl"]
                  )}
                  className="story_slider_row"
                >
                  <LazyLoadImage
                    src={topStoryData?.images?.url}
                    width={100}
                    height={60}
                    alt={
                      topStoryData["display_headline"] ||
                      topStoryData["headline"]
                    }
                    title={
                      topStoryData["display_headline"] ||
                      topStoryData["headline"]
                    }
                  />
                  <div className="story_heading">
                    <p>{topStoryData["display_headline"]}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="glide__bullets" data-glide-el="controls[nav]">
          {topStoryArraylist.map((topStoryData, key) =>
            key <= 5 ? (
              <button
                className="glide__bullet"
                data-glide-dir="=0"
                key={key}
                type="button"
              ></button>
            ) : (
              ""
            )
          )}
        </div>
      </div>

      <div className="pwa_top_add pwa_add">
        <div className="clearfix add">
          <div className="addinner-box">
            {/* <SiteAd
              slotId={`mobile_atf_300`}
              adUnit={`NW18_HIND_PWA/NW18_HIND_VIDEO_PWA/NW18_HIND_VIDEO_PWA_AL/NW18_HIND_VID_AL_PWA_ROS_ATF_300`}
              lazyload={true}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={300}
              height={280}
            /> */}
            <NewSiteAd
              slotId={"mobile_atf_300"}
              adUnit={`NW18_HIND_PWA/NW18_HIND_VIDEO_PWA/NW18_HIND_VIDEO_PWA_AL/NW18_HIND_VID_AL_PWA_ROS_ATF_300`}
              lazyLoad={true}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={300}
              height={280}
            />
          </div>
        </div>
      </div>

      {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_1x1 !== "undefined" &&
      pageAds.PG_1x1 !== "" && (
        // <SiteAd
        //   slotId="PG_1x1"
        //   adUnit={pageAds.PG_1x1}
        //   sizes={[[1, 1]]}
        //   removeAdSpan={true}
        //   loadonScroll={true}
        // />
        <NewSiteAd
          slotId={"PG_1x1"}
          adUnit={pageAds.PG_1x1}
          sizes={[[1, 1]]}          
          loadOnScroll={true}
          removeAdSpan={true}
        />
      )}

      {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_Slider_1x1 !== "undefined" &&
      pageAds.PG_Slider_1x1 !== "" && (
        // <SiteAd
        //   slotId="PG_Slider_1x1"
        //   adUnit={pageAds.PG_Slider_1x1}
        //   sizes={[[1, 1]]}
        //   removeAdSpan={true}
        //   loadonScroll={true}
        // />
        <NewSiteAd
          slotId={"PG_Slider_1x1"}
          adUnit={pageAds.PG_Slider_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadOnScroll={true}
        />
      )}

      {typeof pageAds !== "undefined" &&
      typeof pageAds.SHOSH_OOP !== "undefined" &&
      pageAds.SHOSH_OOP !== "" && (
        // <SiteAd
        //   slotId="SHOSH_OOP"
        //   adUnit={pageAds.SHOSH_OOP}
        //   sizes={[[1, 1]]}
        //   removeAdSpan={true}
        //   loadonScroll={true}
        // />
        <NewSiteAd
          slotId={"SHOSH_OOP"}
          adUnit={pageAds.SHOSH_OOP}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadOnScroll={true}
        />
      )}

      <div className="ralted_news">
        {topStoryArraylists.map((topNews) => (
          <div className="story_section_row" key={topNews?.story_id}>
            <a
              href={getCompleteURL(topNews["weburl_r"], topNews["weburl"])}
              target="_blank"
            >
              <div className="img_hover">
                <LazyLoadImage
                  src={topNews.images?.url}
                  width={165}
                  height={99}
                  alt={topNews["display_headline"] || topNews["headline"]}
                  title={topNews["display_headline"] || topNews["headline"]}
                />
              </div>
              <figcaption>
                <h3 className="story_title">
                  {topNews["display_headline"] || topNews["headline"]}
                </h3>
              </figcaption>
            </a>
          </div>
        ))}
      </div>
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
      <div className="vsp10"></div>
      <div className="pwa_top_add clearfix">
        <Outbrain widgetSrc={outBrainUrl} widgetId="MB_9" />
      </div>

      <Taboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
      />
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
          background: #dbdde3 !important;
        }
        .ralted_news {
          display: flex;
          flex-wrap: wrap;
          float: left;
          padding: 0 20px;
        }
        .ralted_news .story_section_row {
          width: 50%;
          margin-bottom: 15px;
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
        .pagination ul {
          display: inline-block;
        }
        .pagination ul li {
          display: inline-block;
          text-transform: uppercase;
          background: #ed1c24;
          width: 33px;
          height: 33px;
          margin: 0 2px;
        }
        .pagination ul li a.selected {
          background: #ed1c24;
          color: #fff;
        }
        .pagination ul li a {
          text-decoration: none;
          color: #fff;
          display: block;
          width: 33px;
          height: 33px;
          text-align: center;
          color: #000;
          line-height: 33px;
        }
        .pagination ul li.next a {
          background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/icon.png)
            no-repeat -178px -825px;
          width: 20px;
        }
        .pagination ul li.prev a {
          background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/icon.png)
            no-repeat -152px -825px;
          width: 20px;
        }
        .pagination ul li a.selected {
          background: #ed1c24;
          color: #fff;
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
        .story_section_row img {
          height: 110px;
          width: 100%;
          display: block;
          font-size: 0;
          background: #ccc;
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
          margin-bottom: 10pxx;
        }
        .fe_img_wrp {
          position: relative;
          border: 1px solid #4a4a4a;
          display: block;
          flex-shrink: 0;
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
        .story_title {
          line-height: 18px;
        }
        .img_nw {
          line-height: 0;
        }
        .social_share_sec {
          margin-bottom: 15px;
          display: flex;
          align-content: center;
          justify-content: space-between;
        }
        .follow_us {
          border-left: #5a5a5a solid 1px;
          display: flex;
          align-items: center;
          width: 126px;
          height: 40px;
          border-radius: 50px;
          background: #f2eeee;
          border: #b2b2b2 solid 1px;
          padding: 2px 10px;
          margin: auto 0;
          justify-content: center;
      }
      .fl_txt {
        font: 400 13px/14px"Mukta",sans-serif;
        color: #5a5a5a;
        width: 62px;
        text-transform: none;
        margin-left: 9px;
      }      
      `}</style>
    </>
  );
};
export default React.memo(PlaylistMobile);
