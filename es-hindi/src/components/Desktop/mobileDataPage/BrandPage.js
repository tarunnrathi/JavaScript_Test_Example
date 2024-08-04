import React, { useState } from "react";
import MobileContent from "./components/brandPage/MobileListingH";
import Description from "./components/brandPage/Description";
import MobileBrandView from "./components/common/MobileBrandView";
import LatestNewsView from "./components/brandPage/LatestNewsH";
import HeaderSection from "./components/brandPage/HeaderSection";
import Pagination from "./components/common/Pagination";
import getConfig from "next/config";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import { brandPageLimit } from "includes/brand.helper";
import Head from 'next/head';

import SiteAd from "widgets/Common/Responsive/SiteAd";
import Faq from "./components/brandPage/Faq";
import { getMobilelist } from "api/global/Common";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const { specificationURL } = require("/src/includes/brand.helper");
const { brandURL } = require("/src/includes/brand.helper");

function BrandPage(props) {
  const { urlParam, articleData = {} } = props?.topPriorityData || {};

  const { publicRuntimeConfig } = getConfig();

  const outBrainUrl =
    publicRuntimeConfig.siteUrl + props?.topPriorityData?._pageParam?.query;

  const {
    brandTitle,
    MobilesOfBrand,
    latestNews,
    pageAds,
    photoStories,
    topStories,
    astroStories,
    brandDescription,
    brandData,
    faq
  } = props?.topPriorityData || {};

  const [brandListData, setBrandListData] = useState(MobilesOfBrand || []);
  const [loadMore, setLoadMore] = useState(1);
  const [loadCheck, setloadCheck] = useState(MobilesOfBrand.length);

  const [pageNumber, setPageNumber] = useState(urlParam.page);

  const [sortFilter, setSortFilter] = useState({});
  let tempFilter = {"brand_slug":`${brandTitle}`}
  const handleSorting = async (ele, order) => {
    const mobilesOfBrand = await getMobilelist({filter: tempFilter, fields:`*,`, sortBy: ele, sortOrder:order}, true)
    setSortFilter({ ...sortFilter, ele, order });
    setBrandListData(mobilesOfBrand);
  };

  const notFound = pageNumber > brandPageLimit;

  const loadPosts = async (d) => {
    if (d) {
      const currentLoadMore = d;
      const offset = currentLoadMore * 24;
      const pageLimit = 24;
      let tempBrandData
      if (sortFilter && Object.keys(sortFilter).length) {
        tempBrandData = await getMobilelist({offset: offset, count:pageLimit, filter: tempFilter, fields:`*,`, sortBy: sortFilter?.ele, sortOrder: sortFilter?.order}, true)
      } else {
        tempBrandData = await getMobilelist({offset: offset, count:pageLimit, filter: tempFilter, fields:`*,`, sortOrder: sortFilter?.order}, true)
       
      }
      if (typeof tempBrandData === "undefined") {
        tempBrandData = [];
      }
      tempBrandData?.length > 0 ?setLoadMore(currentLoadMore + 1): setloadCheck(0);
      setBrandListData((prev) => [...prev, ...tempBrandData]);
    }
  };

  
  return (
    <div className="body-container">

      <div className="justify-content flex-box">
        <div id="left">
        <BreadcrumbCommon breadCrumbArray={[{ value: "होम", slug: "/"},{ value: "मोबाइल्स", slug: "/mobiles/"}, { value: brandTitle}]} />

          <HeaderSection
            title={brandTitle}
            page={pageNumber}
            notFound={notFound}
            brandListData={brandListData}
            handleSorting={handleSorting}
          />
          {brandDescription && Object.keys(brandDescription).length && brandDescription?.brand_description ? (
            <Description brandDescription={brandDescription} />
          ) : (
            ""
          )}

          {brandListData?.length && !notFound ? (
            <div className="bottom_content_wrp">
              <div className="mdl_cnt">
                <MobileContent data={brandListData} pageAds={pageAds} />
              </div>
            </div>
          ) : (
            <p className="notFound">No data present</p>
          )}

          {loadCheck > 0 ? (
                loadMore <= 30 ? (
                  <button
                    onClick={() => loadPosts(loadMore, brandListData)}
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

          {latestNews?.length ? <LatestNewsView data={latestNews} /> : ""}

          {brandData && Object.keys(brandData).length ? (
            <MobileBrandView data={brandData} />
          ) : (
            ""
          )}

          <Faq brandTitle={brandTitle} faqi={faq} />
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
            font-family: Mukta, sans-serif;
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
          // <!-- header part of the specification details page -->

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
            text-transform: capitalize;
          }
          // .dth_r {
          //   width: 280px;
          //   height: 40px;
          //   background: #ffffff 0% 0% no-repeat padding-box;
          //   box-shadow: 0px 3px 6px #00000029;
          //   border: 1px solid #d9d9d9;
          //   border-radius: 20px;
          //   position: relative;
          // }
          .dth_r .form {
            display: flex;
            height: 100%;
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
          // .dthrl_wrp {
          //   width: 280px;
          //   display: none;
          //   position: absolute;
          //   top: 60px;
          //   left: 0;
          //   background: #ffffff;
          //   box-shadow: 0px 3px 6px #00000029;
          //   border: 1px solid #d9d9d9;
          //   border-radius: 20px;
          //   padding: 10px 13px;
          //   z-index: 991;
          // }
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
          //   <!-- header part of the specification details page ends here -->

          //   <!-- description details starts here -->
          #dt_desc.expander {
            position: relative;
            overflow: hidden;
            // max-height: 195px;
            padding: 15px 20px;
            background: #f6f7f7 0% 0% no-repeat padding-box;
            border: 1px solid #f7f7f7;
            transition: max-height 0.5s ease-in-out;
            -moz-transition: max-height 0.5s ease-in-out;
            -webkit-transition: max-height 0.5s ease-in-out;
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
            // margin-bottom: 20px;
          }
          #dt_desc .ttl {
            font: bold 14px/20px Mukta, sans-serif;
            color: #414141;
          }
          #dt_desc .inner-bit {
            display: flex;
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
            font: normal 13px/20px Mukta, sans-serif;
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
            margin-top: -15px;
            margin-bottom: 30px;
            position: relative;
          }

          // <!-- description details ends here -->

          // mobile content start
          .bottom_content_wrp {
            display: flex;
          }
          .mdl_cnt {
            flex-grow: 1;
          }
          .apld_flt_wrp {
            display: flex;
            align-items: flex-start;
          }
          .rel_cnt {
            font: normal 12px/22px Mukta, sans-serif;
            color: #646464;
            margin-right: 20px;
            flex-shrink: 0;
          }
          .apld_fltrs {
            display: flex;
            flex-wrap: wrap;
          }
          .apld_fltr {
            font: normal 12px/1 Mukta, sans-serif;
            color: #ff2825;
            padding: 4px 12px 3px 8px;
            background: #fdfdfd;
            border: 1px solid #ff2825;
            border-radius: 4px;
            position: relative;
            margin: 0 21px 12px 0;
          }
          .apld_fltr .close {
            position: absolute;
            right: -7px;
            top: 3px;
            cursor: pointer;
          }

          .ph_row {
            background: #ffffff;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #d8d8d8;
            margin-bottom: 30px;
            display: flex;
          }
          .ph_row:nth-last-child(2) {
            margin-bottom: 30px;
          }
          .ml_cnt {
            width: 165px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex-direction: column;
          }
          .mr_cnt {
            border-left: 1px solid #d8d8d8;
            flex-grow: 1;
          }

          .ml_cnt img{
            width: 96px;
            height: 200px;
            margin-bottom: 10px;
          }
          .mc_h {
            border: #f7f7f7 solid 1px;
            background: #f6f7f7;
            padding: 14px 20px;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
          }
          .mc_h .m_prize {
            font: 700 21px/20px Mukta, sans-serif;
            color: #0076db;
            margin-left: 40px;
          }
          .mc_h .os {
            font: normal 12px/13px Mukta, sans-serif;
            color: #001d42;
            display: flex;
            align-items: center;
            margin-left: 40px;
          }
          .mc_h .os span {
            margin-left: 8px;
          }
          .mc_h .ttl {
            font: 700 18px/20px Mukta, sans-serif;
            color: #001d42;
            text-transform: uppercase;
            margin-right: auto;
          }
          .mc_b {
            padding: 0 20px;
          }
          .mc_b .ph_details {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
          }
          .mc_b .ph_details .col {
            flex-grow: 1;
            padding: 0 10px;
            border-right: 1px dashed #707070;
          }
          .ph_details .col:last-child {
            padding-right: 0;
            border: none;
          }
          .ph_details .col:first-child {
            padding-left: 0;
          }
          .ph_details .dt_img {
            margin-bottom: 15px;
            width: 30px;
            height: 30px;
          }
          .ph_details .dt_ttl {
            font: 700 14px/14px Mukta, sans-serif;
            color: #ff5a00;
            margin-bottom: 8px;
          }
          .ph_details .dt_list li {
            font: normal 12px/18px Mukta, sans-serif;
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
            top: 6px;
            left: 0;
          }
          .ph_details .dt_list li:last-child {
            padding-bottom: 0;
          }
          .mc_f {
            background: #f6f7f7 0% 0% no-repeat padding-box;
            border: 1px solid #f7f7f7;
            height: 50px;
            display: flex;
            padding: 0 20px;
            align-items: center;
            justify-content: space-between;
          }
          .mc_f .ps_dtl {
            margin-right: 68px;
          }
          .mc_f .psdtl_h {
            font: normal 12px/18px Mukta, sans-serif;
            color: #646464;
          }
          .mc_f .psdtl_f {
            font: normal 14px/18px Mukta, sans-serif;
            color: #212121;
          }
          .phfe_list {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
          }
          .phfe_list li {
            display: flex;
            align-items: center;
            padding: 0 6px;
          }
          .phfe_list li:first-child {
            padding-left: 0;
          }
          .phfe_list .txt {
            font: normal 11px/11px Mukta, sans-serif;
            color: #212121;
            width: 14px;
          }
          .phfe_bg {
            width: 20px;
            height: 20px;
          }
          .phfe_bg.bg-w_charging {
            background-size: 128px;
            background-position: -61px -32px;
          }
          .phfe_deactiv {
            opacity: 0.3;
          }
          .phfl_spe {
            font: bold 13px/13px Mukta, sans-serif;
            color: #e1261d;
            text-transform: uppercase;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
          }
          .phfl_spe span {
            display: inline-block;
            margin-right: 8px;
            margin-top: 2px;
          }
          .ph_thmb {
            margin-bottom: 10px;
          }
          .ph_redet {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-bottom: 10px;
            font: normal 12px/18px Mukta, sans-serif;
            color: #646464;
          }
          .ph_redet span {
            display: block;
            color: #212121;
          }

          // mobile content end

          // latest news start
          #latest_news {
            background: #333;
            display: flex;
            align-items: flex-end;
            padding: 15px 20px 0;
            margin-bottom: 30px;
          }
          .sc_ttl_w {
            font: bold 18px/22px Mukta, sans-serif;
            color: #e8e8e8;
            text-transform: uppercase;
            padding-bottom: 8px;
            border-bottom: #bebebe solid 1px;
            position: relative;
            margin-bottom: 10px;
          }
          .sc_ttl_w:before {
            content: "";
            width: 25px;
            height: 4px;
            background: #ed1c24;
            position: absolute;
            left: 0;
            bottom: -1px;
          }
          .lnw_sldr {
            overflow: hidden;
            position: relative;
            max-width: 733px;
            margin-right: 20px;
          }
          .lnw_wrp {
            display: flex;
          }
          .lnw_img {
            border: 1px solid #9b9b9b;
            margin-bottom: 6px;
          }
          .lnw_c {
            font: bold 14px/20px Mukta, sans-serif;
            color: #ffffff;
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
            margin-bottom: 67px;
            text-transform: uppercase;
          }
          .lnctrl {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 15px 0 10px 0;
          }
          .lnctrl .glide__bullets {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            margin: 0 30px 3px 30px;
          }
          .lnctrl .glide__bullets .glide__bullet {
            width: 5px;
            height: 5px;
            background: #bababa;
            border: none;
            border-radius: 100%;
            margin: 0 5px 0px 5px;
          }
          .lnctrl .glide__bullets .glide__bullet.glide__bullet--active {
            width: 18px;
            background: #e1261d;
            border-radius: 20px;
          }
          .lnctrl .controls {
            cursor: pointer;
          }
          // latest news end

          // brand start here
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
          // brand ends here

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

          .controls .leftArrow:hover {
            cursor: pointer;
          }
          .controls .rightArrow:hover {
            cursor: pointer;
          }

          
          .notFound {
            text-align: center;
            height: 40px;
            font-size: 20px;
            color: black;
          }

          .ad-container{
            display:flex;
            margin-bottom: 30px;
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
        `}
      </style>
    </div>
  );
}

export default BrandPage;
