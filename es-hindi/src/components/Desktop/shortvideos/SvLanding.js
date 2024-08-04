import React, { useEffect } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import getConfig from "next/config";
import VideoBox from "./common/VideoBox";
import RhsCommon from "./common/RhsCommon";
import Outbrain from "widgets/Common/Responsive/Outbrain";

const { publicRuntimeConfig } = getConfig();

const SvLanding = ({ topPriorityData }) => {
  const { shortsData, pageAds } = topPriorityData || {};
  const outBrainUrl = publicRuntimeConfig.siteUrl + "videos/";
  const whatspUrl =
    "https://web.whatsapp.com/send?text=Short Video - https://hindi.news18.com/short-videos/";
  const fbUrl =
    "https://www.facebook.com/sharer.php?u=https://hindi.news18.com/short-videos/";
  return (
    <div>
      <div className="vdcnsmpnwrap">
        <div className="vdcnsmpn-container">
          <div className="vdcnsmpn-brdcrmb">
            <a href="/">Home</a> / Short Videos
          </div>
          {typeof pageAds !== "undefined" &&
          typeof pageAds.PG_Slider_1x1 !== "undefined" &&
          pageAds.PG_Slider_1x1 !== "" ? (
            <SiteAd
              slotId="PG_Slider_1x1"
              adUnit={pageAds.PG_Slider_1x1}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              style={{ height: 0 }}
              loadonScroll={true}
            />
          ) : (
            ""
          )}

          {typeof pageAds !== "undefined" &&
          typeof pageAds.SHOSH_OOP !== "undefined" &&
          pageAds.SHOSH_OOP !== "" ? (
            <SiteAd
              slotId="SHOSH_OOP"
              adUnit={pageAds.SHOSH_OOP}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadonScroll={true}
            />
          ) : (
            ""
          )}

          <div className="vdcnsmpn-middle">
            <div className="vdcnsmpn-left">
              <div className="top-news-title">
                <h1>शॉर्ट वीडियो</h1>
                <div className="social-icons">
                  <a href={fbUrl}>
                    <span className="facebk"></span>
                  </a>
                  <a href="https://twitter.com/news18india">
                    <span className="twit"></span>
                  </a>
                  <a href={whatspUrl}>
                    <span className="whatsp"></span>
                  </a>
                </div>
              </div>

              {shortsData &&
                shortsData?.length &&
                shortsData.map((singleD, index) => {
                  return <VideoBox index={index} singleD={singleD} />;
                })}
            </div>
            <RhsCommon
              pageAds={pageAds}
              RhsBiharNews={topPriorityData?.RhsBiharNews}
              RhsRajasthanNews={topPriorityData?.RhsRajasthanNews}
            />
          </div>
          <Outbrain widgetId="AR_6" widgetSrc={outBrainUrl} />
        </div>
      </div>
      <style jsx global>
        {`
          .glide_slider {
            overflow: hidden;
          }
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
          .vdcnsmpn-brdcrmb {
            width: 100%;
            border-bottom: 1px dotted #5a5a5a;
            display: flex;
            align-items: center;
            text-transform: uppercase;
            font-weight: normal;
            margin-bottom: 10px;
            font-size: 13px;
            color: #949494;
            padding-bottom: 5px;
          }
          .vdcnsmpn-brdcrmb a {
            margin: 0px 6px;
            font-size: 13px;
            color: #949494;
            line-height: 24px;
          }
          .vdcnsmpn-brdcrmb a:first-child {
            margin-left: 0px;
          }
          .vdcnsmpn-brdcrmb h1,
          .vdcnsmpn-brdcrmb h2 {
            color: #fff;
            font-size: 13px;
            margin-left: 6px;
            line-height: 24px;
            font-weight: normal;
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
            padding: 20px 20px 0 20px;
            border-top: 1px solid #3e3e3e;
            border-bottom: 1px solid #3e3e3e;
            margin-bottom: 40px;
            position: relative;
          }
          .g__arrows,
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
            -ms-flex-pack: justify;
            // justify-content: space-between;
            // -webkit-flex-wrap: wrap;
            // -ms-flex-wrap: wrap;
            // flex-wrap: wrap;
            padding: 20px 0 0;
            margin-bottom: 15px;
          }
          ul.tag-listing-new li {
            font-size: 16px;
            width: 24%;
            line-height: 24px;
            font-weight: 700;
            padding: 0 0 15px;
            position: relative;
            margin-bottom: 5px;
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
            line-height: 24px;
            font-weight: bold;
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
          ul.tag-listing-new li a figurecaption h2.story-title .sit_cat {
            width: 4px;
            height: 4px;
            background: no-repeat padding-box #c4c4c4;
            vertical-align: middle;
            margin: 0 7px;
            border-radius: 50%;
          }
          .next_arrow_g {
            height: 15px;
            margin: 10px 0;
          }
          .g__arrows {
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            width: 190px;
            margin: auto;
            height: 15px;
          }
          .g__bullets {
            padding: 0 20px 20px 20px;
            display: flex;
            justify-content: center;
          }
          .g__bullets button {
            width: 6px;
            height: 6px;
            background: no-repeat padding-box #8d8d8d;
            border-radius: 50%;
            border: 0;
            margin: 0 5px;
            vertical-align: middle;
            padding: 0 3px;
          }
          .g__bullets button.glide__bullet--active {
            width: 20px;
            height: 7px;
            background: no-repeat padding-box #e1261c;
            border-radius: 3px;
          }
          img.video-ic {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto;
          }
          .V-heading {
            font: bold 20px/25px Mukta;
            padding: 0 20px 5px 0;
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
            margin-left: 5px;
          }
          .readmorebtn,
          .readmorebtn span {
            display: block;
            position: relative;
          }
          .readmorebtn {
            text-align: center;
            display: table;
            margin: auto;
            // margin-top: -29px;
            // padding-top: 20px;
          }
          .readmorebtn span {
            background: #e0261d;
            color: #fff;
            border-radius: 20px;
            height: 26px;
            // width: 179px;
            padding: 0px 15px;
            margin: auto;
            border: 1px solid #9d9d9d;
            top: 12px;
            font-size: 14px;
            line-height: 25px;
            font-weight: bold;
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
            max-width: 340px;
            text-align: left;
            clear: both;
            font-weight: bold;
            font-size: 26px;
            line-height: 32px;
          }
          .social-icons a span {
            position: relative;
            height: 30px;
            width: 30px;
            background: url(/images/siteimages/sprite_img_1.svg)
              0 0 no-repeat;
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
          .social-icons a span img {
            text-align: center;
            margin: auto;
            left: 0;
            bottom: 0;
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

          .sideMiddle {
            padding-top: 20px;
            min-height: 250px;
            position: relative;
          }
          .news18viral {
            padding-top: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default SvLanding;
