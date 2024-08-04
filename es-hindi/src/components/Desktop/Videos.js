import React from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
// import Glide from "@glidejs/glide";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import TaboolaReels from "widgets/Common/Responsive/TaboolaReels";

const moment = require("moment-timezone");

import LazyLoadImage from "components/Common/CustomImage";
import { videos } from "includes/videos.helper";
import { getCompleteURL } from "util/global/Helper";
import getConfig from "next/config";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

const Videos = (props) => {
  const { data, pageAds } = props;
  const {
    topStoryArray,
    video_categoryresults,
    video_category,
    topStories,
    urlParam,
    trendingStories,
    articleData,
    photoStories,
  } = data;
  // current url
  const { publicRuntimeConfig } = getConfig();

  const outBrainUrl = publicRuntimeConfig.siteUrl + "videos/";
  const topStoryArraydata = videos.topStoryArraydata(topStoryArray);
  const topStoryArraylist = videos.topStoryArraylist(topStoryArray);
  const latestlist = videos.latestlist(topStoryArray);
  const video_categoryresult = [...video_categoryresults, latestlist];
  const video_categories = [
    ...video_category,
    {
      slug: "latest/",
      key: "latest",
      title: "लेटेस्ट",
    },
  ];
  const featureTime = (fTime) => {
    return (
      moment(fTime).tz("Asia/Kolkata").format("MMMM Do YYYY, h:mm:ss a") +
      " IST"
    );
  };
  const { cat = "" } = urlParam;
  return (
    <>
      <div>
        <div
          style={{
            maxWidth: "1244px",
            boxSizing: "initial",
            width: "100%",
            margin: "0 auto",
            padding: "15px 20px",
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="sectionLeft">
              <h1 className="fe_mhedin">NEWS18 VIDEO NEWS</h1>
              <div className="fe_outer">
                {topStoryArraydata?.length > 0 && (
                  <div className="fe_wrp">
                    <a
                      href={getCompleteURL(
                        topStoryArraydata[0]["weburl_r"],
                        topStoryArraydata[0]["weburl"],
                      )}
                      className="fe_txt_wrp"
                    >
                      <div className="fe_tag">टॉप वीडियोज</div>
                      <div className="fe_pdate">
                        {featureTime(topStoryArraydata[0]?.updated_at)}
                      </div>
                      <div className="fe_ttl">
                        {topStoryArraydata[0]["display_headline"]}
                      </div>
                      <div className="fe_copy">
                        {topStoryArraydata[0]["display_headline"]}
                      </div>
                    </a>
                    <a
                      href={getCompleteURL(
                        topStoryArraydata[0]["weburl_r"],
                        topStoryArraydata[0]["weburl"],
                      )}
                      className="fe_img_wrp"
                    >
                      <LazyLoadImage
                        src={topStoryArraydata[0]?.images?.url}
                        width={430}
                        height={245}
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
                    </a>
                  </div>
                )}
                <div className="fe_stories">
                  <div>
                    <ul className="slides">
                      {topStoryArraylist?.length > 0 &&
                        topStoryArraylist.map((topNews) => (
                          <li className="slide" key={topNews?.story_id}>
                            <a
                              href={getCompleteURL(
                                topNews["weburl_r"],
                                topNews["weburl"],
                              )}
                              className="fe_thumb"
                            >
                              <div className="fes_img">
                                <LazyLoadImage
                                  src={topNews.images?.url}
                                  width={206}
                                  height={110}
                                  alt={
                                    topNews["display_headline"] ||
                                    topNews["headline"]
                                  }
                                  title={
                                    topNews["display_headline"] ||
                                    topNews["headline"]
                                  }
                                />
                                <div className="v_icon"></div>
                              </div>
                              <div className="fe_pdate">
                                {featureTime(topNews?.updated_at)}
                              </div>
                              <div className="fes_copy">
                                {topNews["display_headline"]}
                              </div>
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              {video_categoryresult?.length > 0 &&
                video_categoryresult.map((dataArraySecond, index) =>
                  dataArraySecond.length < 1 ? (
                    ""
                  ) : (
                    <>
                      <div
                        className="ost_outer"
                        key={"video_categoryresult"+dataArraySecond[index]?.story_id}
                      >
                        <div className="ost_heading">
                          <h2>
                            <a
                              href={video_categories[index]["slug"]}
                              className="ost_mttl"
                            >
                              {video_categories[index]["title"]}
                            </a>
                          </h2>
                          <a
                            href={"/videos/" + video_categories[index]["slug"]}
                            target="_blank"
                            className="read_more_links_top"
                          >
                            {" "}
                            और भी देखें<div className="arrows"></div>
                          </a>
                        </div>
                        <ul className="slides">
                          {dataArraySecond?.length > 0 &&
                            dataArraySecond
                              .slice(0, 4)
                              ?.map((storyArraySecond) => (
                                <li
                                  className="slide"
                                  key={"dataArraySecond"+storyArraySecond?.story_id}
                                >
                                  <a
                                    href={getCompleteURL(
                                      storyArraySecond["weburl_r"],
                                      storyArraySecond["weburl"],
                                    )}
                                    className="ost_thumb"
                                  >
                                    <div className="ost_img">
                                      <LazyLoadImage
                                        src={storyArraySecond.images?.url}
                                        width={210}
                                        height={140}
                                        alt={
                                          storyArraySecond["display_headline"] ||
                                          storyArraySecond["headline"]
                                        }
                                        title={
                                          storyArraySecond["display_headline"] ||
                                          storyArraySecond["headline"]
                                        }
                                      />

                                      <div className="v_icon"></div>
                                    </div>
                                    <div className="ost_pdate">
                                      {featureTime(storyArraySecond?.updated_at)}
                                    </div>
                                    <div className="ost_copy">
                                      {storyArraySecond["display_headline"]}
                                    </div>
                                  </a>
                                </li>
                              ))}
                        </ul>
                      </div>
                      {index === 4 && <TaboolaReels />}
                    </>
                  ),
                )}

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

              <Taboola
                mode={TaboolaList.category.bottom.mode}
                id={TaboolaList.category.bottom.id}
                container={TaboolaList.category.bottom.container}
                placement={TaboolaList.category.bottom.placement}
              />
            </div>
            <div style={{ width: "300px" }}>
              {/* Left content */}
              <div className="rightwrap ">
                <div className="video_page_right rhs_sticky">
                  <RhsCommon
                    pageAds={pageAds}
                    currentURL={outBrainUrl}
                    photoStories={photoStories}
                    topStories={topStories}
                    articleData={articleData}
                    hideAstro={true}
                    cat={cat}
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
            .sectionLeft {
              width: 924px;
              margin-right: auto;
            }

            .fe_mhedin {
              font-size: 36px;
              line-height: 44px;
              font-weight: bold;
              color: #001d42;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .fe_outer {
              background: #000;
              padding: 20px;
              margin-bottom: 30px;
            }
            .fe_wrp {
              display: flex;
              margin-bottom: 20px;
            }
            .fe_txt_wrp {
              border-bottom: #4a4a4a solid 1px;
              margin-right: 20px;
              width:100%;
            }
            .fe_tag {
              width: 125px;
              height: 26px;
              background: #ed2129;
              border-radius: 4px;
              font-size: 14px;
              line-height: 20px;
              font-weight: bold;
              color: #ffffff;
              text-transform: uppercase;
              padding: 4px 10px;
              margin-bottom: 10px;
            }
            .fe_pdate {
              font-size: 12px;
              color: #bbbbbb;
              margin-bottom: 8px;
            }
            .fe_ttl {
              font-size: 26px;
              line-height: 34px;
              font-weight: bold;
              letter-spacing: -0.52px;
              color: #ffffff;
              margin-bottom: 12px;
            }
            .fe_copy {
              font-size: 13px;
              line-height: 22px;
              letter-spacing: -0.26px;
              color: #bbbbbb;
            }
            .fe_img_wrp {
              position: relative;
              border: 1px solid #4a4a4a;
              display: inline-block;
              flex-shrink: 0;
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
            .fe_thumb {
              display: block;
              background: #1d1d1d;
              box-shadow: 0px 3px 6px #00000029;
              border: 1px solid #4a4a4a;
              width: 100%;
              height: 100%;
            }
            .fe_stories .track {
              overflow: hidden;
            }
            .fe_stories .slides {
              display: flex;
              margin: 0;
              padding: 0;
              flex-wrap: wrap;
              // justify-content: space-between;
            }

            .fes_img {
              position: relative;
              margin-bottom: 10px;
            }
            .fes_img img {
              width: 100%;
            }
            .fes_img:before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #000000;
              opacity: 0.3;
            }
            .fes_img .v_icon {
              background-size: 42px;
            }
            .fes_pdate {
              font-size: 12px;
              line-height: 22px;
              color: #bbbbbb;
              padding: 0 10px;
              margin-bottom: 5px;
            }
            .fes_copy {
              font-size: 14px;
              line-height: 22px;
              font-weight: bold;
              color: #ffffff;
              padding: 0 10px 15px;
            }
            .fe_stories .bullets {
              display: flex;
              justify-content: center;
              margin-top: 20px;
            }
            .fe_stories .bullet {
              width: 5px;
              height: 5px;
              background: #bababa;
              border-radius: 5px;
              padding: 0;
              border: none;
              margin: 0 5px;
            }
            .fe_stories .bullet.glide__bullet--active {
              width: 20px;
              background: #e1261d;
            }

            .ost_outer {
              display: block;
              position: relative;
              margin-bottom: 30px;
              min-height: 320px;
            }
            .ost_heading {
              display: flex;
              justify-content: space-between;
              height: 27px;
              border-bottom: #e1261d solid 3px;
              position: relative;
              margin-bottom: 16px;
            }
            .ost_mttl {
              font-size: 22px;
              line-height: 27px;
              font-weight: bold;
              color: #e1261d;
              text-transform: uppercase;
              display: inline-block;
              background: white;
              padding-right: 6px;
              position: absolute;
              bottom: -9px;
              left: 0;
              margin: 0;
            }
            .ost_sldr {
              position: relative;
            }
            .ost_sldr .track {
              overflow: hidden;
              margin-bottom: 10px;
            }
            .slides {
              margin: 0;
              padding: 0;
              display: grid;
              grid-template-columns: 220px 220px 220px 220px;
              column-gap: 10px;
              row-gap: 10px;
            }
            .slides li {
              width: 213px;
              // flex-shrink: 0;
            }
            .v_icon {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/images/v-icon.svg")
                no-repeat center center;
              z-index: 1;
            }
            .ost_thumb {
              display: block;
              background: #f4f4f2;
              border-bottom: #d2d2d2 solid 1px;
              width: 100%;
              height: 100%;
              padding-bottom: 15px;
            }
            .ost_img {
              position: relative;
              margin-bottom: 10px;
              overflow: hidden;
              line-height: 0;
            }
            .ost_img img {
              width: 100%;
            }
            .ost_img:before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #000000;
              opacity: 0.3;
            }
            .ost_img .v_icon {
              background-size: 42px;
            }
            .ost_pdate {
              font-size: 12px;
              line-height: 22px;
              color: #7b7b7b;
              padding: 0 10px;
              margin-bottom: 5px;
            }
            .ost_copy {
              font-size: 14px;
              line-height: 22px;
              font-weight: bold;
              color: #282828;
              padding: 0 10px 0;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .ost_sldr .arrow {
              width: 25px;
              height: 33px;
              background: #e1261d;
              box-shadow: 0px 3px 6px #00000029;
              border: none;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin: 0;
              padding: 0;
              cursor: pointer;
              position: absolute;
              top: 49px;
              z-index: 1;
            }
            .ost_sldr .arrow_right {
              right: -12.5px;
            }
            .ost_sldr .arrow_left {
              left: -12.5px;
            }
            .wm_otr {
              text-align: center;
            }
            .wm_txt {
              font-size: 12px;
              line-height: 14px;
              font-weight: bold;
              color: #e1261d;
              text-transform: uppercase;
              border-bottom: #e1261d solid 1px;
            }
            .read_more_links,
            .read_more_links_top {
              font-size: 14px;
              line-height: 19px;
              font-weight: 500;
              color: #eb3d3c;
              width: 130px;
              position: relative;
              letter-spacing: -0.28px;
              cursor: pointer;
              text-align: center;
            }
            .video_breadcrumbs ul {
              font-family: "Noto Sans", sans-serif;
              display: flex;
              color: #085085;
              align-items: center;
              font-size: 15px;
            }
            . video_breadcrumbs ul li:first-child,
            ul.furthered-news-content li:first-child {
              padding-left: 0;
            }
            .video_breadcrumbs ul li {
              padding: 0 8px;
            }
            .video_breadcrumbs ul li h1 {
              font-size: 15px;
            }
            .video_breadcrumbs ul li a {
              color: #8e8e8e;
              text-decoration: none;
            }
            .read_more_links {
              display: block;
              font-family: "Noto Sans", devanagari;
              margin: 10px auto;
            }
            .read_more_links .arrows,
            .read_more_links_top .arrows {
              position: absolute;
              top: 10px;
              right: 15px;
              width: 12px;
              height: 1px;
              background-color: #eb3d3c;
            }
            .read_more_links .arrows:after,
            .read_more_links .arrows:before,
            .read_more_links_top .arrows:after,
            .read_more_links_top .arrows:before {
              content: "";
              position: absolute;
              width: 7px;
              height: 1px;
              top: -2px;
              right: -1px;
              background-color: #eb3d3c;
              transform: rotate(45deg);
            }
            .read_more_links .arrows:after,
            .read_more_links_top .arrows:after {
              top: 2px;
              transform: rotate(-45deg);
            }
            .read_more_links_top {
              display: block;
            }
            .adunitContainer{
              text-align:center;
              margin-bottom:20px;
            }
          `}
        </style>
      </div>
    </>
  );
};
export default React.memo(Videos);
