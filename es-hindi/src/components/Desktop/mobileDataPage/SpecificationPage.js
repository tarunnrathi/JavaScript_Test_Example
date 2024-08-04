import React, { useEffect } from "react";
import MobileBrandView from "./components/common/MobileBrandView";
import MobileListingV from "./components/common/MobileListingV";
import LatestNewsV from "./components/specificationPage/LatestNewsV";
import OverviewSection from "./components/specificationPage/OverviewSection";
import PrimeDetails from "./components/specificationPage/PrimeDetails";
import Specification from "./components/specificationPage/Specification";
import StickyNav from "./components/specificationPage/StickyNav";
import HeaderSection from "./components/specificationPage/HeaderSection";
import Faq from "./components/specificationPage/Faq";
import getConfig from "next/config";
import Head from 'next/head';

import SiteAd from "widgets/Common/Responsive/SiteAd";

import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const { brandURL } = require("/src/includes/brand.helper");

const SpecificationPage = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const outBrainUrl =
    publicRuntimeConfig.siteUrl + props?.topPriorityData?._pageParam?.query;
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "js/sticky-nav.min.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const {
    specificationDescription,
    specificationDetails,
    otherMobilesOfBrand,
    latestNews,
    trendingMobileInStock,
    brandData,
    pageAds,
    photoStories,
    topStories,
    astroStories,
    specFaq
  } = props?.topPriorityData || {};

  const { brand, title, updated_at } = specificationDetails || {};

  return (
    <div>
      <div className="body-container" id="true">
        <div className="justify-content flex-box">
          <div id="left">
          <BreadcrumbCommon breadCrumbArray={[
            { value: "होम", slug: "/"},
            { value: "मोबाइल्स", slug: "/mobiles/"},
            { value: brand, slug: `${brandURL}/${brand}`.toLowerCase()+"/"},
            { value: title}]} />
            <HeaderSection
              brand={brand}
              title={title}
              updated_at={updated_at}
            />
            <div className="spotc_wrap">
              { specificationDetails && Object.keys(specificationDetails)?.length?<StickyNav brand={brand} specificationDescription={specificationDescription?.mobile_description} /> :"" }
              { specificationDetails && Object.keys(specificationDetails)?.length?<OverviewSection data={specificationDetails} /> :"" }

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

              {specificationDescription?.mobile_description ? (
                <PrimeDetails
                  title={title}
                  specificationDescription={specificationDescription}
                />
              ) : (
                ""
              )}

              {otherMobilesOfBrand && otherMobilesOfBrand.length ? (
                <MobileListingV
                  title={`${brand} के अन्‍य`}
                  data={otherMobilesOfBrand}
                  idForLanding="otherMobile"
                />
              ) : (
                ""
              )}

              <div id="nwnspc" className="section">
                 {latestNews?.length ?<LatestNewsV data={latestNews} /> :''}
                { specificationDetails && Object.keys(specificationDetails)?.length?<Specification title={title} data={specificationDetails} /> :"" }

              </div>
              {trendingMobileInStock?.length ? (
                <MobileListingV
                  title={"ट्रेंडिंग और रिकमंडेड"}
                  data={trendingMobileInStock}
                  idForLanding="trendingMobile"
                />
              ) : (
                ""
              )}
              {brandData && Object.keys(brandData).length ? (
                <MobileBrandView data={brandData} />
              ) : (
                ""
              )}

            <Faq faqi={specFaq} />
            </div>
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

        { typeof pageAds.PG_1x1_2 !== "undefined" && pageAds.PG_1x1_2 !== "" ? (
        <SiteAd slotId="PG_1x1_2" adUnit={pageAds.PG_1x1_2} sizes={[[1, 1]]} removeAdSpan={true} loadonScroll={true} />
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

          // header start

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
          .lst_update a {
            color: #e1261d;
          }
          .dth_r {
            width: 280px;
            height: 40px;
            position: relative;
            z-index: 5;
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
            // display: block;
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
            border-top: #d9d8d9 solid 1px;
            font: normal 13px/24px Mukta, sans-serif;
            color: #001d42;
            padding: 0 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space:normal; 
          }
          .dthrl_row img {
            opacity: 0.3;
          }
          .dthrl_row:hover {
            background: rgba(196, 196, 196, 0.2);
            cursor: pointer;
          }

          // header ends

          // sticky navs start

          .sticky_nav {
            background: #f6f7f7 0% 0% no-repeat padding-box;
            box-shadow: 0px 2px 4px #00000029;
            border-top: 1px solid #d8d8d8;
            height: 42px;
            display: flex;
            align-items: center;
            position: sticky;
            top: 0;
            margin-bottom: 15px;
            z-index: 1;
          }
          .sticky_nav a {
            font: normal 14px/17px "Mukta, sans-serif";
            color: #525252;
            padding: 0 15px;
            display: flex;
            align-items: center;
            height: 100%;
          }
          .sticky_nav .active {
            font: bold 16px/19px "Mukta, sans-serif";
            color: #e1261d;
            border-bottom: #e1261d solid 4px;
          }
          // sticky navs ends

          // <!-- overview section starts here -->

          #section_overview {
            border: 1px solid #d8d8d8;
            display: flex;
            align-items: flex-start;
            margin-bottom: 30px;
            position: relative;
          }
          .msl_outer {
            width: 280px;
            border-right: none;
            position: relative;
            padding: 10px;
          }
          .mmsli_wrap {
            position: relative;
            overflow: hidden;
          }
          .mmsli_wrap .controls {
            position: absolute;
            top: 43%;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
          }
          .mmsli_wrap .controls div {
            padding: 10px;
            cursor: pointer;
          }
          .mmsli_wrap .glide__bullets {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 8px;
          }
          .mmsli_wrap .glide__bullets .glide__bullet {
            width: 5px;
            height: 5px;
            background: #bababa;
            border: none;
            border-radius: 100%;
            margin: 0 5px 5px 5px;
          }
          .mmsli_wrap .glide__bullets .glide__bullet.glide__bullet--active {
            width: 18px;
            background: #e1261d;
            border-radius: 20px;
          }
          .mmsli_wrap .sl_count {
            display: flex;
            justify-content: center;
            align-items: center;
            font: normal 12px/1 Mukta, sans-serif;
            color: #9f9f9f;
          }
          .mmsli_wrap .sl_count .current {
            font-size: 14px;
            color: #000;
            font-weight: bold;
          }
          .mmslider {
            display: flex;
            margin-bottom: 15px;
            justify-content: center;
            height: 400px;

          }
          .mmslider li {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .kisp_h {
            border: #f7f7f7 solid 1px;
            background: #f6f7f7;
            padding: 14px 20px;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
            align-items: center;
          }
          .kisp_h .m_prize {
            font: 700 21px/20px Mukta, sans-serif;
            color: #0076db;
            margin-left: 40px;
          }
          .kisp_h .os {
            font: normal 12px/13px Mukta, sans-serif;
            color: #001d42;
            display: flex;
            align-items: center;
            margin-left: 40px;
          }
          .kisp_h .os span {
            margin-left: 8px;
          }
          .kisp_h .ttl {
            font: 700 18px/20px Mukta, sans-serif;
            color: #001d42;
            text-transform: uppercase;
            margin-right: auto;
          }
          .kisp_body {
            padding: 0 20px;
          }
          .kisp_body .ph_details {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
          }
          .kisp_body .ph_details .col {
            flex-grow: 1;
            padding-right: 8px;
          }
          .ph_details .dt_img {
            margin-bottom: 15px;
            width: 30px;
            height: 30px;
          }
          .ph_details .dt_ttl {
            font: 700 14px/20px Mukta, sans-serif;
            color: #ff5a00;
            margin-bottom: 8px;
          }
          .ph_details .dt_list li {
            font: normal 12px/22px Mukta, sans-serif;
            color: #646464;
            padding: 0 0 5px 10px;
            position: relative;
            width: 140px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .ph_details .dt_list li:before {
            content: "";
            width: 5px;
            height: 5px;
            background: #bababa;
            border-radius: 10px;
            position: absolute;
            top: 8px;
            left: 0;
          }
          .dt_border {
            border-top: 1px dashed #707070;
          }
          .fe_list {
            -moz-column-count: 2;
            -webkit-column-count: 2;
            column-count: 2;
            margin-top: 18px;
            position: relative;
            margin-bottom: 12px;
          }
          .fe_list:before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 48%;
            border-right: #707070 dashed 1px;
          }
          .fe_list li {
            display: flex;
            align-items: center;
            font: normal 13px/40px Mukta, sans-serif;
            color: #212121;
          }
          .fe_list li span {
            margin-left: 10px;
          }
          .fel_bg {
            width: 20px;
            height: 20px;
          }
          .kisp_footer {
            background: #f6f7f7 0% 0% no-repeat padding-box;
            border: 1px solid #f7f7f7;
            height: 50px;
            width: 100%;
            display: flex;
            padding: 0 20px;
            align-items: center;
          }
          .kisp_footer .ps_dtl {
            margin-right: 68px;
          }
          .kisp_footer .psdtl_h {
            font: normal 12px/18px Mukta, sans-serif;
            color: #646464;
          }
          .kisp_footer .psdtl_f {
            font: normal 14px/18px Mukta, sans-serif;
            color: #212121;
          }
          #section_overview .fl_spc {
            position: absolute;
            bottom: 11px;
            right: 20px;
          }
          #section_overview .ki_flsp {
            width: 170px;
            height: 28px;
            background: #e1261d;
            border-radius: 14px;
            border: none;
            cursor: pointer;
            font: bold 14px/17px Mukta, sans-serif;
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 32px;
            margin-left: auto;
          }
          #ki_specs {
            flex-grow: 1;
            position: relative;
            border-left: 1px solid #d8d8d8;
            flex-grow: 1;
          }
          .variant {
            position: relative;
            // width: 160px;
            height: 28px;
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 1px solid #d9d9d9;
            border-radius: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 5px 0 10px;
            overflow: hidden;
          }

          .slide-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
          }

          .slide {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            font: normal 12px/20px Mukta, sans-serif;
            color: #838383;
          }
          .slide span {
            color: #061836;
            font-weight: bold;
            margin-left: 3px;
          }
          .slide-toggle-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 16px;
            height: 16px;
          }

          .slide-toggle {
            cursor: pointer;
            user-select: none;
            height: 8px;
            line-height: 0;
          }
          .slide-toggle.prev svg {
            transform: rotate(180deg);
          }

          //  <!-- overview section ends here -->

          // /* <!-- prime details starts here --> */

          #prime_dtl.expander {
            position: relative;
            overflow: hidden;
            // max-height: 270px;
            padding-bottom: 55px;
            transition: max-height 0.5s ease-in-out;
            -moz-transition: max-height 0.5s ease-in-out;
            -webkit-transition: max-height 0.5s ease-in-out;
          }
          #prime_dtl.expander:before {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: linear-gradient(#f9fbfb00 50%, #ffffff);
            transition: opacity 0.5s ease-in-out;
            -moz-transition: opacity 0.5s ease-in-out;
            -webkit-transition: opacity 0.5s ease-in-out;
          }
          #prime_dtl.expander.expanded:before {
            opacity: 0;
          }
          #prime_dtl p {
            font: normal 14px/20px Mukta, sans-serif;
            color: #414141;
            margin-bottom: 20px;
          }
          #prime_dtl .ttl {
            font: bold 14px/20px Mukta, sans-serif;
            color: #414141;
          }
          .pmdtl_expnd_wrp .expand-toggle {
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
          .pmdtl_expnd_wrp .expand-toggle.btn-expnd svg {
            transform: rotate(180deg);
          }
          .pmdtl_expnd_wrp {
            text-align: center;
            margin: -30px 0 0 0;
            position: relative;
            margin-bottom: 40px;
          }

          // /* <!-- prime details ends here --> */

          // other phones start here

          #trndm {
            background: #f5f5f5;
            padding: 13px 20px 11px 20px;
            margin-bottom: 30px;
          }
          .trndm_wrp_tren,
          .trndm_wrp_other {
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
            height: 32px;
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

          // other phones ends here

          // news start here

          #nwnspc {
            display: flex;
            margin-bottom: 30px;
          }
          #nwnspc .l_news {
            width: 240px;
            margin-right: 40px;
            -webkit-box-shadow: 4px 4px 0 0px rgba(0, 0, 0, 0.2);
            box-shadow: 4px 4px 0 0px rgba(0, 0, 0, 0.2);
            flex-shrink: 0;
            height: 99.5%;
          }
          .lnw_h {
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ed1c24;
            font: bold 18px/22px Mukta, sans-serif;
            color: #ffffff;
            text-transform: uppercase;
          }
          .lnw_wrp {
            background: #202020;
            padding: 15px;
            text-align: center;
            height: 95.7%;
          }
          .lnw_thmb {
            display: block;
            text-align: center;
            border-bottom: 1px dashed #9b9b9b;
            margin-bottom: 15px;
          }
          .lnw_img {
            border: 1px solid #9b9b9b;
            margin-bottom: 10px;
          }
          .lnw_c {
            font: bold 15px/21px Mukta, sans-serif;
            color: #ffffff;
            margin-bottom: 10px;
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
          // news ends here

          // spec start here

          #nwnspc .phspe {
            flex-grow: 1;
            position: relative;
          }
          .phspe:before {
            content: "";
            position: absolute;
            left: 1px;
            right: 1px;
            bottom: 1px;
            background: transparent
              linear-gradient(180deg, #f6f7f700 0%, #f6f7f7 100%) 0% 0%
              no-repeat padding-box;
            height: 87px;
            z-index: 9;
          }
          
          .table_row {
            display: flex;
            border-bottom: 1px solid #d8d8d8;
          }
          .table_row .f_col {
            width: 150px;
            flex-shrink: 0;
            text-align: left;
          }
          .table_row .th {
            font: 700 16px/20px Mukta, sans-serif;
            letter-spacing: -0.72px;
            color: #ff5a00;
            text-transform: uppercase;
            display: inline-block;
            margin: 16px 0px 0px 10px;
          }
          .table_row .s_col {
            background: #f6f7f7;
            flex-grow: 1;
            padding: 10px 20px;
          }
          .table_row .fe_row {
            display: flex;
          }
          .table_row .fe_h {
            width: 165px;
            flex-shrink: 0;
            font: bold 14px/32px Mukta, sans-serif;
            color: #212121;
          }
          .table_row .fe_txt {
            font: normal 14px/32px Mukta, sans-serif;
            color: #212121;
            padding-right: 10px;
            white-space: normal;
          }
          .phsp_tabs_wrp {
            background: #f6f7f7;
            box-shadow: 0px 2px 4px #00000029;
            border: 1px solid #f7f7f7;
            overflow-x: scroll;
            white-space: nowrap;
            padding: 0 42px 0px 10px;
            position: relative;
            height: 42px;
            align-items: center;
            max-width: 644px;
            display: flex;
          }
          .tabs_wrp {
            position: relative;
            margin-bottom: 12px;
            margin-top: -10px;
          }
          .tabs_wrp:before {
            content: "";
            width: 63px;
            background: transparent
              linear-gradient(89deg, #ffffff00 0%, #f6f7f7 100%) 0% 0% no-repeat
              padding-box;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
          }
          .phsp_tabs_wrp a {
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            padding: 6px 10px 5px 10px;
            height: 30px;
            font: normal 14px/14px Mukta, sans-serif;
            color: #525252;
            margin-right: 10px;
          }
          .phsp_tabs_wrp a.active,
          .phsp_tabs_wrp a:hover {
            background: #ed1c24;
            border-radius: 6px;
            color: white;
          }
          .phsp_tabs_wrp::-webkit-scrollbar {
            display: none;
          }
          .specs-wrap .spec-box {
            white-space: nowrap;
            overflow-y: scroll;
            --scroll-color: #999;
            --scroll--hover-color: #666;
            scrollbar-color: #999 #c3bebe;
            scrollbar-width: thin;
            position: relative;
          }
          .specs-wrap .spec-box::-webkit-scrollbar-track {
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
          .specs-wrap .spec-box::-webkit-scrollbar {
            width: 4px;
          }

          .specs-wrap .spec-box::-webkit-scrollbar-thumb {
            background-color: var(--scroll-color);
            border-radius: 4px;
          }
          .specs-wrap {
            position: relative;
            border: 1px solid #d8d8d8;
          }
          .specs-wrap .spec-box {
            height: 890px;
            overflow-x: hidden;
            overflow-y: auto;
          }
          .spec-box {
            position: relative;
          }
          .spec-box-inner {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            transition: 0.4s ease all;
          }

          // spec ends here

          // popular brand start
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
            width: 165px;
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
            position:relative;
            z-index:2;
            display: flex;
          }
          .ppmbthmb_link {
            display: block;
            text-align: center;
            text-decoration: underline;
            font: normal 13px/16px Mukta, sans-serif;
            color: #0076db;
            text-transform: uppercase;
          }

          // popular brand ends here

          html {
            scroll-behavior: smooth;
          }

          .brdacrum {
            font-size: 14px;
            color: #404040;
            line-height: 18px;
            font-weight: 700;
            margin: 5px 0 15px 0;
          }

          .brdacrum a {
            color: #404040;
            font-weight: 400;
            margin-right: 2px;
          }

          .search {
            background-position: -241px -51px;
            width: 20px;
            height: 20px;
          }

          .ppmb_wrp > div {
            overflow: hidden;
          }

          a.mrn:hover {
            color: #fff;
          }

          .controls .leftArrow:hover {
            cursor: pointer;
          }
          .controls .rightArrow:hover {
            cursor: pointer;
          }

          .ad-container{
            display:flex;
            margin-bottom: 30px;

          }

          .table_row:last-child{padding-bottom:30px}

          #section_overview .ki_flsp span{
             padding-top: 3px;
          }

        `}
      </style>
    </div>
  );
};

export default SpecificationPage;
