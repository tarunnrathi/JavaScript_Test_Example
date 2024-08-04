import React from "react";

import getConfig from "next/config";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import MobileListingV from "../mobileDataPage/components/common/MobileListingV";
import LatestNews from "../mobileDataPage/components/mobile/LatestNews";
import Videos from "./components/mobile/Videos";
import MobileBrandView from "./components/common/MobileBrandView";
import HeaderSection from "./components/mobile/HeaderSection";
import Description from "./components/mobile/Description";
// import Head from 'next/head';

const { specificationURL } = require("/src/includes/brand.helper");
const { brandURL } = require("/src/includes/brand.helper");

import SiteAd from "widgets/Common/Responsive/SiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

function Mobile(props) {
  const { publicRuntimeConfig } = getConfig();

  const outBrainUrl =
    publicRuntimeConfig.siteUrl + props?.topPriorityData?._pageParam?.query;

  const {
    trendingMobileInStock,
    latestNews,
    brandData,
    upcomingMobiles,
    videos,
    pageAds,
    photoStories,
    topStories,
    astroStories,
  } = props?.topPriorityData || {};

  return (
    <div>
      <div className="body-container" id="true">
        <div className="justify-content flex-box">
          <div id="left">
          <BreadcrumbCommon breadCrumbArray={[{ value: "होम", slug: "/"},{ value: "मोबाइल्स"}]} />

            {/* <FullView />   */}
            <HeaderSection />

            <Description />

            {trendingMobileInStock?.length ? (<MobileListingV
              title={"ट्रेंडिंग और रिकमंडेड"}
              data={trendingMobileInStock}
              idForLanding="trendingMobile"
            />) : ""}

            {props?.pageAds.BTF_728 ? (
              <div className="ad-container">

                <SiteAd
                  width={728}
                  height={90}
                  slotId={`commentary-ad-0`}
                  adUnit={props?.pageAds.BTF_728}
                  sizes={[[728, 90], [1, 1]]}
                  removeAdSpan={true}
                  loadonScroll={true}
                ></SiteAd>
              </div>
            ) : null}
            {latestNews && latestNews?.length ? (
              <LatestNews data={latestNews} />
            ) : (
              ""
            )}

            {brandData && Object.keys(brandData).length ? (
              <MobileBrandView data={brandData} />
            ) : (
              ""
            )}

            {upcomingMobiles?.length ? (
              <MobileListingV
                title={"जल्‍द लॉन्‍च होने वाले"}
                data={upcomingMobiles}
                idForLanding="upcomingMobile"
              />
            ) : (
              ""
            )}

            {/* {latestNews && latestNews?.length ? (
              <MobileComparison data={latestNews} />
            ) : (
              ""
            )} */}

            {videos && videos.length ? <Videos data={videos} /> : ""}
          </div>

          <div>
            {typeof pageAds !== "undefined" &&
              typeof pageAds.Shosh_OOP_id !== "undefined" ? (
              <SiteAd
                slotId="Shosh_OOP_id"
                renderOutOfThePage={true}
                adUnit={pageAds.Shosh_OOP_id}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                loadonScroll={true}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {typeof pageAds.PG_1x1_2 !== "undefined" && pageAds.PG_1x1_2 !== "" ? (
          <SiteAd slotId="PG_1x1_2" adUnit={pageAds.PG_1x1_2} sizes={[[1, 1]]} removeAdSpan={true} loadonScroll={true}/>
        ) : null}
        {/* {   typeof pageAds.PG_1x1_3 !== "undefined" && pageAds.PG_1x1_3 !== "" ? (
        <SiteAd slotId="PG_1x1_3" adUnit={pageAds.PG_1x1_3} sizes={[[1, 1]]}  removeAdSpan={true} />
        ) : null} */}

        <div className="rightwrap">
          <RhsCommon
            pageAds={pageAds}
            currentURL={outBrainUrl}
            photoStories={photoStories}
            topStories={topStories}
            astroStories={astroStories}
            section="categorynews"
          />
        </div>

      </div>

      <style jsx global>
        {`
        * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }
          a {
            text-decoration: none;
          }
          body {
            padding: 0;
            margin: 0;
            background: #f5f5f5;
          }
          ul,
          li {
            list-style: none;
          }
          .body-container {
            display: flex;
            justify-content: space-between;
            max-width: 1244px;
            box-sizing: initial;
            width: 100%;
            margin: -15px auto 0px;
            padding: 20px;
            background: #fff;
          }
          .justify-content {
            justify-content: space-between;
          }
          .flex-box {
            display: flex;
          }
          #left {
            max-width: 924px;
            width: 100%;
          }
          #right {
            max-width: 300px;
          }
          /* common page css */
          .sc_ttl {
            font: bold 18px/22px Mukta, sans-serif;
            color: #001d42;
            text-transform: uppercase;
            padding-bottom: 8px;
            border-bottom: #bebebe solid 1px;
            position: relative;
            margin-bottom: 10px;
          }
          .sc_ttl:before {
            content: "";
            width: 25px;
            height: 4px;
            background: #ed1c24;
            position: absolute;
            left: 0;
            bottom: -1px;
          }
          .sc_ttl span {
            color: #e1261d;
          }
          .sprite {
            background: url("https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/sprite_1643807363.png");
          }
          .bg-card {
            background-position: -10px -180px;
          }
          .bg-lte {
            background-position: -240px -10px;
          }
          .bg-splash {
            background-position: -240px -90px;
          }
          .bg-4g {
            background-position: -190px -105px;
          }
          .bg-dual_sim {
            background-position: -50px -180px;
          }
          .bg-fingerprint {
            background-position: -90px -180px;
          }
          .bg-fm {
            background-position: -130px -180px;
          }
          .bg-g_glass {
            background-position: -170px -180px;
          }
          .bg-w_charging {
            background-position: -130px -70px;
          }
          .bg-performance {
            background-position: -190px -10px;
          }
          .bg-display {
            background-position: -110px -130px;
          }
          .bg-camera {
            background-position: -60px -130px;
          }
          .bg-battery {
            background-position: -10px -130px;
          }
          .bg-android_b {
            background-position: -70px -10px;
          }
          .bg-mobile {
            background-position: -70px -70px;
          }
          .bg-ram {
            background-position: -130px -10px;
          }
          .bg-fingerprint_b {
            background-position: -10px -70px;
          }
          .bg-5g {
            background-position: -10px -10px;
          }

          // <!-- header part of the page start -->
          .dt_header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
            margin-top: 15px;
          }
          .dth_ttl {
            font: bold 36px/44px Mukta, sans-serif;
            color: #001d42;
          }
          .lst_update {
            display: flex;
            align-items: center;
          }
          .lst_update li {
            font: normal 12px/16px Mukta, sans-serif;
            color: #646464;
            padding-left: 10px;
            margin-left: 10px;
          }
          .lst_update li:first-child {
            padding: 0;
            margin: 0;
            position: relative;
          }
          .lst_update li:first-child::before {
            content: "";
            width: 5px;
            height: 5px;
            background: #bababa;
            position: absolute;
            border-radius: 100%;
            right: -12.5px;
            top: 5px;
          }
          .lst_update a {
            color: #e1261d;
          }
          .dth_r {
            width: 280px;
            height: 40px;
            position: relative;
            // z-index: 999;
          }
          .srh_otr {
            background: #ffffff 0% 0% no-repeat padding-box;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #d9d9d9;
            border-radius: 20px;
            overflow: hidden;
          }
          .dth_r .form {
            display: flex;
            height: 40px;
            align-items: center;
          }
          .dth_r .form input {
            flex-grow: 1;
            height: 100%;
            background: transparent;
            border-radius: 20px 0 0 20px;
            border: none;
            padding-left: 16px;
          }
          .dth_r .form input::placeholder {
            font: normal 13px/20px Mukta, sans-serif;
            color: #e1261d;
          }
          .dth_r .form input:focus {
            outline: none;
          }
          .dth_r .submit {
            width: 38px;
            background: transparent;
            border: none;
            cursor: pointer;
          }
          .dth_r .submit:focus {
            outline: none;
          }
          .dthrl_wrp {
            width: 280px;
            display: none;
            background: #ffffff;
            padding: 0 13px 10px 13px;
            z-index: 991;
          }
          .dthrl_inner {
            height: 245px;
            white-space: nowrap;
            overflow-y: scroll;
            overflow-x: hidden;

            --scroll-color: black;
            --scroll--hover-color: #666;
            scrollbar-color: black #c3bebe;
            scrollbar-width: thin;
          }
          .dthrl_inner::-webkit-scrollbar-track {
            background: -moz-linear-gradient(
              left,
              rgba(228, 245, 252, 0) 0%,
              rgba(228, 245, 251, 0) 1%,
              rgba(234, 234, 234, 0) 27%,
              rgba(234, 234, 234, 1) 28%,
              rgba(234, 234, 234, 1) 73%,
              rgba(234, 234, 234, 0) 74%,
              rgba(234, 234, 234, 0) 100%
            );
            background: -webkit-linear-gradient(
              left,
              rgba(228, 245, 252, 0) 0%,
              rgba(228, 245, 251, 0) 1%,
              rgba(234, 234, 234, 0) 27%,
              rgba(234, 234, 234, 1) 28%,
              rgba(234, 234, 234, 1) 73%,
              rgba(234, 234, 234, 0) 74%,
              rgba(234, 234, 234, 0) 100%
            );
            background: linear-gradient(
              to right,
              rgba(228, 245, 252, 0) 0%,
              rgba(228, 245, 251, 0) 1%,
              rgba(234, 234, 234, 0) 27%,
              rgba(234, 234, 234, 1) 28%,
              rgba(234, 234, 234, 1) 73%,
              rgba(234, 234, 234, 0) 74%,
              rgba(234, 234, 234, 0) 100%
            );
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00e4f5fc', endColorstr='#00eaeaea',GradientType=1 );
          }
          .dthrl_inner::-webkit-scrollbar {
            width: 4px;
          }

          .dthrl_inner::-webkit-scrollbar-thumb {
            background-color: var(--scroll-color);
            border-radius: 4px;
          }
          .dthrl_row {
            min-height: 40px;
            border-bottom: #d9d8d9 solid 1px;
            font: normal 13px/24px Mukta, sans-serif;
            color: #001d42;
            padding: 0 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space:normal; 
          }
          .dthrl_row.active {
            color: #e1261d;
          }
          .dthrl_row.active img {
            opacity: 1;
            padding-right: 4px;
          }
          .dthrl_row img {
            opacity: 0.3;
          }
          .dthrl_row:hover {
            background: rgba(196, 196, 196, 0.2);
            cursor: pointer;
          }

          // <!-- header part of the page ends -->

          // <!-- description details starts here -->

          #dt_desc.expander {
            position: relative;
            overflow: hidden;
            // max-height: 133px;
            padding: 15px 20px;
            background: #f6f7f7 0% 0% no-repeat padding-box;
            transition: max-height 0.5s ease-in-out;
            -moz-transition: max-height 0.5s ease-in-out;
            -webkit-transition: max-height 0.5s ease-in-out;
            border-top: #d8d8d8 solid 1px;
            border-bottom: #d8d8d8 solid 1px;
          }
          #dt_desc.expander:before {
            content: "";
            width: 100%;
            height: 87px;
            position: absolute;
            left: 0;
            bottom: 0;
            background: transparent
              linear-gradient(180deg, #f6f7f700 0%, #f6f7f7 100%) 0% 0%
              no-repeat padding-box;
            transition: opacity 0.5s ease-in-out;
            -moz-transition: opacity 0.5s ease-in-out;
            -webkit-transition: opacity 0.5s ease-in-out;
          }
          #dt_desc.expander.expanded:before {
            opacity: 0;
          }
          #dt_desc p {
            font: normal 14px/20px Mukta, sans-serif;
            color: #414141;
          }
          #dt_desc .ttl {
            font: bold 14px/20px Mukta, sans-serif;
            color: #414141;
          }
          #dt_desc .dt_desc_img {
            width: 150px;
            height: 90px;
            background: white;
            box-shadow: 0px 3px 6px #00000029;
            opacity: 1;
            flex-shrink: 0;
            margin-right: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          #dt_desc .dsc_copy {
            font: normal 15px/25px Mukta, sans-serif;
            color: #414141;
          }
          #dt_expnd .expand-toggle {
            width: 140px;
            align-items: center;
            display: inline-flex;
            justify-content: space-between;
            padding: 0 15px;
            height: 34px;
            background: #ffffff;
            box-shadow: 0px 3px 6px #00000033;
            border-radius: 17px;
            opacity: 1;
            border: none;
            font: bold 14px/20px Mukta, sans-serif;
            letter-spacing: 0px;
            color: #e1261d;
            cursor: pointer;
          }
          #dt_expnd .expand-toggle.btn-expnd svg {
            transform: rotate(180deg);
          }
          #dt_expnd.expnd_wrp {
            text-align: center;
            margin-top: -20px;
            margin-bottom: 30px;
            position: relative;
          }

          // <!-- description details ends here -->

          // <!-- trending and recomended mobile starts here -->
          #trndm {
            background: #f5f5f5;
            padding: 13px 20px 11px 20px;
            margin-bottom: 30px;
          }
          .trndm_wrp_up,
          .trndm_wrp_tren {
            position: relative;
            overflow: hidden;
          }
          .trndsdr {
            display: flex;
          }
          .trndthmb_wrp {
            display: block;
            background: white;
            width: 100%;
            height: 100%;
            padding: 10px 0 0px 0;
            box-shadow: 0px 3px 6px #0000001a;
            border: 1px solid #e0e0e0;
            text-align: center;
            position: relative;
          }
          .trndthmb_ttl {
            height:32px;
            font: bold 16px/16px Mukta, sans-serif;
            color: #212121;
            margin-bottom: 10px;
            padding: 0 10px;
            width: 204px;
            // white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
          }
          .trndthmb_and {
            height:14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font: normal 12px/14px Mukta, sans-serif;
            color: #001d42;
            margin-bottom: 15px;
          }
          .trndthmb_and svg {
            margin-right: 8px;
          }
          .trndthmb_img {
            margin-bottom: 10px;
            width: 100%;
            height: 160px;
          }
          .trndthmb_prz {
            font: bold 17px/20px Mukta, sans-serif;
            color: #0076db;
            margin-bottom: 11px;
          }
          .trndfe_list {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            padding: 15px 15px 0 15px;
          }
          .trndfe_list li {
            display: flex;
            align-items: center;
            padding: 0 6px;
            margin-bottom: 9px;
          }
          .trndfe_list .txt {
            font: normal 11px/11px Mukta, sans-serif;
            color: #212121;
            width: 14px;
          }
          .trnd_deactiv {
            opacity: 0.3;
          }
          .trndbtn_wrp {
            height: 32px;
            width: 100%;
            border-top: #e0e0e0 solid 1px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .trnd_bg {
            width: 20px;
            height: 20px;
          }
          .trndbtn_wrp .rd_mr {
            font: bold 12px/12px Mukta, sans-serif;
            color: #e1261d;
            text-transform: uppercase;
          }
          .trnd_ctrls {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 15px;
          }
          .trnd_ctrls .glide__bullets {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            margin: 0 30px 3px 30px;
          }
          .trnd_ctrls .glide__bullets .glide__bullet {
            width: 5px;
            height: 5px;
            background: #bababa;
            border: none;
            border-radius: 100%;
            margin: 0 5px 0px 5px;
          }
          .trnd_ctrls .glide__bullets .glide__bullet.glide__bullet--active {
            width: 18px;
            background: #e1261d;
            border-radius: 20px;
          }
          .trnd_ctrls .controls {
            cursor: pointer;
          }

          // <!-- trending and recomended mobile ends here -->

          // <!-- latest mobile news starts here -->
          .lmnm_wrp {
            margin-bottom: 30px;
          }
          .lmnm_wrp .sc_ttl {
            margin-bottom: 5px;
          }
          .lmn_wrp {
            display: flex;
            margin: 0 -10px;
          }
          .lmn_F {
            display: flex;
    flex-direction: column;
            max-width: 351px;
            min-width: 351px;
          }
          .lmn_T {
            max-width: 223px;
            min-width: 223px;
            display: flex;
            flex-direction: column;
          }
          .lmnc_otr {
            margin: 0 10px 15px 10px;
          }
          .lmnc_otr img {
            vertical-align: top;
            max-width: 100%;
          }
          .lmnc_col {
            display: block;
            height: 100%;
            background: #f6f7f7;
            border-bottom: #d2d2d2 solid 1px;
          }
          .lmnc_otr.big .ttl {
            font: bold 20px/26px Mukta, sans-serif;
            color: #001d42;
            margin: 7px 15px 9px 15px;
          }

          .lmnc_otr.big{flex-grow:1; height: 394px; }
          .lmnc_otr.big .copy {
            font: normal 13px/18px Mukta, sans-serif;
            color: #636363;
            margin: 0 15px 8px 15px;
            height: 70px;
            overflow: hidden;
          }
          .lmnc_otr.sml .lmnc_col {
            padding: 10px;
            display: flex;
          }
          .lmnc_otr.sml img {
            max-width: 100px;
            margin-right: 15px;
          }
          .lmnc_otr.sml .ttl {
            font: bold 15px/21px Mukta, sans-serif;
            color: #001d42;
          }
          .lmnc_otr.mid .ttl {
            font: bold 15px/21px Mukta, sans-serif;
            color: #001d42;
            margin: 7px 10px 0 10px;
          }
          .lmnc_otr.mid {
            height: 50%;
          }
          .mr_lmn_wrp {
            height: 20px;
            background: #f5f5f5;
            text-align: center;
            margin-top: -5px;
          }
          .mr_lmn_wrp .mr_lmn {
            display: inline-block;
            font: bold 12px/1.8 Mukta, sans-serif;
            color: #e1261d;
            text-transform: uppercase;
            height: 100%;
            background: white;
            padding: 0 10px;
          }

          // <!-- latest mobile news ends here -->

          // brand view starts here
          #ppmb {
            margin-bottom: 30px;
          }
          .ppmb_otr {
            padding: 0 10px;
            background: #f5f5f5;
            border-bottom: #bebebe solid 1px;
            margin-top: -10px;
          }
          .ppmb_wrp {
            position: relative;
            // overflow: hidden;
            padding: 10px 10px;
          }
          .ppmb_wrp:before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0px;
            background: #f5f5f5;
            width: 1px;
            z-index: 1;
          }
          .ppmb_wrp:after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0px;
            background: #f5f5f5;
            width: 1px;
            z-index: 1;
          }
          .ppmb_wrp .controls {
            position: absolute;
            left: 1px;
            right: 1px;
            top: 36%;
            display: flex;
            justify-content: space-between;
          }
          .ppmb_wrp li {
            padding: 10px 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          .ppmb_wrp .ppmbthmb {
            // width: 110px;
            height: 60px;
            background: #ffffff 0% 0% no-repeat padding-box;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 20px 12px 20px;
            margin: 0;
            border: 1px solid #e0e0e0;
            margin-bottom: 4px;
          }
          .ppmb_link {
            text-align: center;
            text-decoration: underline;
            font: normal 13px/16px Mukta, sans-serif;
            color: #0076db;
          }
          .ppmbsldr {
            display: flex;
            position:relative;
            z-index:2;
          }
          .ppmbthmb_link {
            display: block;
            text-align: center;
            text-decoration: underline;
            font: normal 13px/16px Mukta, sans-serif;
            color: #0076db;
            text-transform: uppercase;
          }

          // brand view ends here

          //  Mobile Comparison start
          .mcm_wrp {
            margin-bottom: 30px;
          }
          .mcm_wrp .sc_ttl {
            margin-bottom: 5px;
          }
          .mc_wrp {
            display: flex;
            margin: 0 -7.5px;
          }
          .mc_F {
            max-width: 231px;
            min-width: 231px;
            display: flex;
            flex-direction: column;
          }
          .mcc_otr {
            margin: 0 7.5px 15px 7.5px;
          }
          .mcc_otr.mid {
            height: 100%;
          }
          .mcc_otr img {
            vertical-align: top;
            max-width: 100%;
          }
          .mcc_col {
            display: block;
            height: 100%;
            background: #f6f7f7;
            border-bottom: #d2d2d2 solid 1px;
          }
          .mcc_otr.sml .mcc_col {
            padding: 10px;
            display: flex;
          }
          .mcc_otr.sml img {
            max-width: 100px;
            margin-right: 15px;
          }
          .mcc_otr.sml .ttl {
            font: bold 15px/21px Mukta, sans-serif;
            color: #001d42;
          }
          .mcc_otr.mid .ttl {
            font: bold 18px/24px Mukta, sans-serif;
            color: #001d42;
            margin: 10px;
          }
          .mr_mc_wrp {
            height: 20px;
            background: #f5f5f5;
            text-align: center;
            margin-top: -5px;
          }
          .mr_mc_wrp .mr_mc {
            display: inline-block;
            font: bold 12px/1.8 Mukta, sans-serif;
            color: #e1261d;
            text-transform: uppercase;
            text-decoration: underline;
            height: 100%;
            background: white;
            padding: 0 10px;
          }

          //  Mobile Comparison ends

          // videos start here
          .mvm_wrp {
            background: #202020;
            padding: 15px 16px;
            margin-bottom: 30px;
            text-align: center;
          }
          .mv_sh {
            text-align: center;
            font: normal normal normal 12px/12px Mukta, sans-serif;
            // letter-spacing: 8.88px;
            color: #ffffff;
            text-transform: uppercase;
          }
          .mv_mh {
            text-align: center;
            font: normal normal bold 30px Mukta, sans-serif;
            // letter-spacing: -1.92px;
            color: #ff9122;
            text-transform: uppercase;
            margin-bottom: 14px;
            border-bottom: 1px solid #565656;
          }
          .vli_wrp {
            display: flex;
            margin: 0 -14px 20px -14px;
          }
          .vc_otr {
            padding: 0 14px;
            border-right: 1px solid #565656;
            flex: 1;
            max-width:230px
          }
          .vc_otr:last-child {
            border: none;
          }
          .v_col {
            padding: 0 10px 14px;
            display: block;
          }
          .v_imgwrp {
            position: relative;
            border: 1px solid #585858;
            height: 110px;
            overflow: hidden;
          }
          .v_imgwrp:before {
            content: "";
            background: rgba(0, 0, 0, 0.5);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
          .v_col img {
            vertical-align: top;
            max-width: 100%;
          }
          .v_col .ttl {
            text-align: center;
            font: normal normal bold 15px/21px Mukta, sans-serif;
            color: #ffffff;
            margin-top: 8px;
          }
          .v_col .vi_wrp {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .mrn {
            background: #ed1c24;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 98px;
            height: 26px;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #ffffff;
            border-radius: 18px;
            font: bold 12px/14px Mukta, sans-serif;
            color: #ffffff;
            text-transform: uppercase;
          }

          // videos ends here

          .ppmb_wrp > div {
            overflow: hidden;
          }

          .controls .leftArrow:hover {
            cursor: pointer;
          }
          .controls .rightArrow:hover {
            cursor: pointer;
          }

          .ppmb_img:hover {
            cursor: pointer;
          }

          .exp {
            list-style: none;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            text-align: center;
            font: normal 11px/18px Mukta, sans-serif;
            color: #646464;
            margin-bottom: 10px;
          }

          .mrn:hover{
             color: black;
          }

          .ad-container{
            display:flex;
            margin-bottom: 30px;

          }

         

          
        `}
      </style>
    </div>
  );
}

export default Mobile;
