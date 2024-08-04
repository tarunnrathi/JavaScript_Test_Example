import React, { useState } from "react";
import getConfig from "next/config";
import initialState from "GlobalStore";
import RhsCommon from "./common/RhsCommon";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Outbrain from "widgets/Common/Responsive/Outbrain";
// import { imageLoader, setDefaultImage } from 'includes/article.util';
import { getCompleteURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";
import { getArticleList } from "api/global/Common";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import TaboolaReels from "widgets/Common/Responsive/TaboolaReels";

const { publicRuntimeConfig } = getConfig();
const SvCategory = ({ topPriorityData }) => {
  const outBrainUrl = publicRuntimeConfig.siteUrl + "videos/";
  const { shortsData = [], section, pageAds } = topPriorityData || {};
  const [catData, setCatData] = useState(shortsData);
  const [cur_page, setcurPage] = useState(3);
  const [startCount, setStartCount] = useState(28);
  const loadMore = async () => {
    const short_videos = section
      ? { "categories.slug": `${section}`, nw_auto_yt_video_type: "shorts" }
      : { nw_auto_yt_video_type: "shorts" };
    const data = await getArticleList(
      {
        count: 8,
        offset: startCount,
        filter: short_videos,
        fields: `story_id,display_headline,images,weburl_r,weburl`,
      },
      true
    );
    if (!data?.length) {
      setStartCount(0);
    } else {
      setCatData([...catData, ...data]);
      setStartCount((cur_page - 1) * 28);
      setcurPage(cur_page + 1);
    }
  };
  const shareUrl = `${publicRuntimeConfig.siteUrl}short-videos/`;
  const fbUrl = `https://www.facebook.com/sharer.php?u=${shareUrl}`;
  const twitterUrl = `https://twitter.com/share?text=short-videos&url=${shareUrl}`;
  const whatspUrl = `https://web.whatsapp.com/send?text=Short Video - ${shareUrl}`;

  return (
    <div>
      <div className="vdcnsmpnwrap">
        <div className="vdcnsmpn-container">
          <BreadcrumbCommon
            breadCrumbArray={topPriorityData?.breadCrumbArray}
          />
          {typeof pageAds !== "undefined" &&
            typeof pageAds.PG_1x1 !== "undefined" &&
            pageAds.PG_1x1 !== "" && (
              <SiteAd
                slotId="PG_1x1"
                adUnit={pageAds.PG_1x1}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                style={{ height: 0 }}
                loadonScroll={true}
              />
            )}
          {typeof pageAds !== "undefined" &&
            typeof pageAds.PG_Slider_1x1 !== "undefined" &&
            pageAds.PG_Slider_1x1 !== "" && (
              <SiteAd
                slotId="PG_Slider_1x1"
                adUnit={pageAds.PG_Slider_1x1}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                style={{ height: 0 }}
                loadonScroll={true}
              />
            )}
          <div className="vdcnsmpn-middle">
            <div className="vdcnsmpn-left">
              <div className="top-news-title">
                <h1>
                  {initialState?.cats?.[topPriorityData?.section]} शॉर्ट वीडियो
                </h1>
                <div className="social-icons">
                  <a href={fbUrl} target="_blank">
                    <span className="facebk"></span>
                  </a>
                  <a href={twitterUrl} target="_blank">
                    <span className="twit"></span>
                  </a>
                  <a href={whatspUrl} target="_blank">
                    <span className="whatsp"></span>
                  </a>
                </div>
              </div>
              {/* <!-- video box start --> */}
              <div className="videobox">
                <ul className="tag-listing-new">
                  {catData?.length &&
                    catData?.map((item, index) => {
                      return (
                        <>
                          <li key={item?.source_id}>
                            <a
                              href={getCompleteURL(
                                item?.weburl_r,
                                item?.weburl
                              )}
                            >
                              <figure>
                                <LazyLoadImage
                                  src={item?.images?.url}
                                  width={400}
                                  height={400}
                                  alt={item?.display_headline}
                                />
                              </figure>
                              <figurecaption>
                                <h2 className="story-title">
                                  <div>
                                    <span className="">
                                      NEWS18 HINDI
                                      {section && (
                                        <>
                                          <span className="sit_cat"></span>
                                          {section}
                                        </>
                                      )}
                                    </span>
                                  </div>
                                  {item?.display_headline}
                                </h2>
                              </figurecaption>
                              <a
                                className="video-play-button"
                                href={getCompleteURL(
                                  item?.weburl_r,
                                  item?.weburl
                                )}
                              >
                                {" "}
                                <span></span>
                              </a>
                            </a>
                          </li>
                          {index === 11 && (
                            <div style={{ minHeight: "50px", width: "100%" }}>
                              <TaboolaReels />
                            </div>
                          )}
                        </>
                      );
                    })}
                </ul>
                {startCount ? (
                  <div className="next_arrow_p">
                    <button
                      type="button"
                      onClick={loadMore}
                      className="loadmore"
                    >
                      और लोड करें
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* <!-- video box end --> */}
            </div>
            <RhsCommon
              pageAds={pageAds}
              RhsBiharNews={topPriorityData?.RhsBiharNews}
              RhsRajasthanNews={topPriorityData?.RhsRajasthanNews}
              taboolaList={TaboolaList.articlePage}
            />
          </div>
          <Taboola
            mode={TaboolaList.category.bottom.mode}
            id={TaboolaList.category.bottom.id}
            container={TaboolaList.category.bottom.container}
            placement={TaboolaList.category.bottom.placement}
          />
        </div>
        <Outbrain widgetSrc={outBrainUrl} widgetId="AR_6" />
      </div>
      <style jsx global>
        {`
          .vdcnsmpnwrap {
            background: #1d1d1d;
          }
          .vdcnsmpn-container {
            background: #212121;
            padding: 10px 20px;
            max-width: 1284px;
            margin: auto;
          }
          .vdcnsmpn-container * {
            box-sizing: border-box;
          }
          .vdcnsmpn-middle {
            display: flex;
            justify-content: space-between;
          }
          .vdcnsmpn-left {
            width: calc(100% - 320px);
            font-family: "Mukta";
          }
          .vdcnsmpn-right {
            width: 300px;
            flex-shrink: 0;
          }
          .vdcnsmpnad {
            margin-bottom: 30px;
          }
          .vdcnsmpnad span {
            background: #2e2e2e;
            height: 20px;
            line-height: 20px;
            color: #dcdcdc;
            font-size: 12px;
            display: block;
            text-align: center;
          }
          .rgtglobahd {
            font-size: 22px;
            color: #f8be01;
            line-height: 20px;
            border-bottom: 1px solid #4a4a4a;
            padding-bottom: 5px;
          }
          .rgtglobahd a {
            color: #f8be01;
          }
          .photostorylist {
          }
          .photostorylist li {
            border-bottom: 1px dashed #4a4a4a;
            padding: 10px 0;
          }
          .photostorylist li a {
            display: flex;
          }
          .photostorylist li a figure {
            width: 120px;
            flex-shrink: 0;
            margin-right: 10px;
            border: 1px solid #9b9b9b;
            line-height: 0;
            position: relative;
          }
          .photostorylist li a figure img {
            width: 100%;
          }
          .photostorylist li a figcaption {
            color: #fff;
            font-size: 14px;
            line-height: 22px;
          }
          .morestorybtn {
            background: #2e2e2e;
            height: 25px;
            line-height: 25px;
            color: #dcdcdc;
            font-size: 14px;
            display: block;
            text-align: center;
            color: #f8be01;
            font-weight: bold;
            margin-bottom: 30px;
          }
          .rgttopvideo {
            margin-bottom: 30px;
          }

          .videobox {
            background: #2e2e2e;
            border-top: 1px solid #3e3e3e;
            border-bottom: 1px solid #3e3e3e;
            margin-bottom: 40px;
            position: relative;
            padding: 20px;
          }
          .p__arrows,
          ul.tag-listing-new,
          ul.tag-listing-new li a figurecaption {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
          }
          .V-heading,
          .top-news-title {
            border-bottom: 1px solid #4a4a4a;
          }
          ul.tag-listing-new {
            display: flex;
            -webkit-box-pack: justify;
            // -webkit-justify-content: space-between;
            // -ms-flex-pack: justify;
            // justify-content: space-between;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            gap: 10px;
          }
          ul.tag-listing-new li {
            font-size: 16px;
            width: 24%;
            line-height: 24px;
            font-weight: 700;
            padding: 0 0 15px;
            position: relative;
            border: 2px solid #5f5f5f;
          }
          ul.tag-listing-new li a figure img {
            width: 100%;
            display: block;
            height: 364px;
            object-fit: cover;
          }
          ul.tag-listing-new li a figurecaption {
            position: absolute;
            bottom: 0;
            background: linear-gradient(180deg, #00000000 0, #000 100%)
              no-repeat padding-box;
            height: 80%;
            display: flex;
            -webkit-align-items: flex-end;
            -webkit-box-align: flex-end;
            -ms-flex-align: flex-end;
            align-items: flex-end;
            padding: 10px;
            width: 100%;
          }
          ul.tag-listing-new li a figurecaption h2.story-title {
            color: #fff;
            font-size: 17px;
            font-weight: bold;
            line-height: 24px;
          }
          .tag-listing-new li a figurecaption .story-title span {
            display: inline-block;
            font-size: 12px;
            line-height: 28px;
            letter-spacing: 0;
            color: #c4c4c4;
            text-transform: uppercase;
            width: 100%;
            font-weight: normal;
          }
          .next_arrow_p {
            height: 15px;
            margin: 20px 0 0px 0;
            text-align: center;
            padding-bottom: 35px;
          }

          .V-heading {
            font: bold 20px/25px Mukta;
            padding: 0 20px 5px;
            color: #f8be01;
          }
          .arrow-v {
            position: absolute;
            right: 20px;
            top: 16px;
          }
          .arrow-v a {
            vertical-align: middle;
            display: inline-block;
            max-height: 31px;
            max-width: 31px;
            cursor: pointer;
          }
          .readmorebtn,
          .readmorebtn span {
            display: block;
            position: relative;
          }
          .readmorebtn {
            text-align: center;
            margin-top: -29px;
            padding-top: 20px;
          }
          .readmorebtn span {
            background: #e0261d;
            color: #fff;
            border-radius: 20px;
            height: 26px;
            width: 179px;
            margin: auto;
            border: 2px solid #3e3e3e;
            top: 12px;
            font: bold 14px/25px Mukta;
          }
          .top-news-title {
            width: 100%;
            padding-bottom: 15px;
            margin: 10px 0 15px;
            position: relative;
          }
          .social-icons {
            position: absolute;
            top: 0;
            right: 0;
          }
          .social-icons a {
            margin-right: 8px;
          }
          .social-icons a:last-child {
            margin-right: 0;
          }
          .top-news-title h1 {
            color: #fff;
            font: bold 26px/32px Mukta;
            max-width: 340px;
            text-align: left;
            clear: both;
          }
          .social-icons a span {
            position: relative;
            height: 30px;
            width: 30px;
            background: url(/images/siteimages/sprite_img_1.svg) 0 0 no-repeat;
            margin: auto;
            cursor: pointer;
            border: 1px solid #fff;
            display: inline-block;
          }
          .social-icons a .facebk {
            border-radius: 2px;
            background-position: -7px -7px !important;
          }
          .social-icons a .twit {
            border-radius: 2px;
            background-position: -5px -56px;
          }
          .social-icons a .whatsp {
            border-radius: 2px;
            background-position: -6px -157px;
          }
          .arrow {
            display: inline-block;
            position: absolute;
            width: 9px;
            height: 9px;
            background: transparent;
            border-top: 1.5px solid #000000;
            border-left: 1.5px solid #000000;
            transition: all 250ms ease-in-out;
            text-decoration: none;
            color: transparent;
            top: 0;
            bottom: 0;
            margin: auto;
            left: 0;
          }
          a.arrow.next {
            transform: rotate(135deg);
            right: 3px;
          }
          a.arrow.prev {
            transform: rotate(-45deg);
            left: 13px;
          }
          .arrow:before {
            display: block;
            height: 200%;
            width: 200%;
            margin-left: -50%;
            margin-top: -50%;
            content: "";
            transform: rotate(45deg);
          }

          .video-play-button {
            position: absolute;
            z-index: 10;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            box-sizing: content-box;
            display: block;
            width: 18px;
            height: 19px;
            border-radius: 50%;
            padding: 18px 18px 18px 28px;
          }
          .video-play-button:before {
            content: "";
            position: absolute;
            z-index: 0;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: block;
            width: 35px;
            height: 35px;
            background: #e1261d;
            border-radius: 50%;
            animation: pulse-border 1500ms ease-out infinite;
            border: 2px solid #fff;
          }
          .video-play-button span {
            display: block;
            position: relative;
            z-index: 3;
            width: 0;
            height: 0;
            border-left: 13px solid #fff;
            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
          }
          .video-play-button:after {
            content: "";
            position: absolute;
            z-index: 1;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: block;
            width: 35px;
            height: 35px;
            background: #e1261d;
            border-radius: 50%;
            transition: all 200ms;
          }
          .loadmore {
            width: 130px;
            height: 38px;
            background: #ed1c24;
            border-radius: 19px;
            font-size: 17px;
            color: #ffffff;
            // color: black;
            line-height: 38px;
            border: none;
            display: table;
            margin: auto;
            cursor: pointer;
          }
          .news18viral {
            padding-top: 20px;
          }
          ul.tag-listing-new li a figurecaption h2.story-title .sit_cat {
            width: 4px;
            height: 4px;
            background: no-repeat padding-box #c4c4c4;
            vertical-align: middle;
            margin: 0 7px;
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
};

export default SvCategory;
