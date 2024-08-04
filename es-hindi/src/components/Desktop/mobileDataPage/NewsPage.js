import React, { useState } from "react";
import HeaderSection from "./components/news/HeaderSection";
import NewsMain from "./components/news/NewsMain";
import PopularFilter from "./components/news/PopularFilter";
import MobileListingV from "./components/common/MobileListingV";
import MobileBrandView from "./components/common/MobileBrandView";
import getConfig from "next/config";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import { newsPageLimit } from "includes/brand.helper";
import Head from 'next/head';
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { getArticleList } from "api/global/Common";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const { specificationURL } = require("/src/includes/brand.helper");
const { newsURL } = require("/src/includes/brand.helper");


const NewsPage = (props) => {
  const [newsData, setNewsData] = useState(props?.topPriorityData?.latestNews);
  const [loadMore, setLoadMore] = useState(1);
  const [loadCheck, setloadCheck] = useState(props?.topPriorityData?.latestNews.length);

  const {
    urlParam,
    currentUrl,
    brandTitle,
    trendingMobileInStock,
    brandData,
    pageAds,
    photoStories,
    topStories,
    astroStories,
  } = props?.topPriorityData || {};

  const [newsTitle, setNewsTitle] = useState(brandTitle);
  const [pageNumber, setPageNumber] = useState(urlParam.page);

  const { publicRuntimeConfig } = getConfig();

  const outBrainUrl =
    publicRuntimeConfig.siteUrl + props?.topPriorityData?._pageParam?.query;

  const notFound = urlParam?.page > newsPageLimit;
  const subStringforNews = urlParam?.name ? { "tags.slug": `${urlParam?.name?.toLowerCase()}`, "post_type": "text" } : { "tag_topic": "mobile", "post_type": "text" };


  const loadPosts = async (d) => {
    if (d) {
      const currentLoadMore = d;
      const offset = currentLoadMore * 24;
      const pageLimit = 24;
      let tempNewsData = await getArticleList({ count: pageLimit, offset: offset, fields: '*,', filter: subStringforNews }, true)
      if (typeof tempNewsData === "undefined") {
        tempNewsData = [];
      }
      tempNewsData?.length > 0 ? setLoadMore(currentLoadMore + 1) : setloadCheck(0);
      setNewsData((prev) => [...prev, ...tempNewsData]);
    }
  };
  return (
    <div>
      <div className="body-container" id="true">
        <div className="justify-content flex-box">
          <div id="left">
          <BreadcrumbCommon breadCrumbArray={[{ value: "होम", slug: "/"},{ value: "मोबाइल्स", slug: "/mobiles/"}, { value: "मोबाइल न्यूज़", slug: newsURL+"/"}, { value: newsTitle || "All"}]} />
            <HeaderSection />

            <PopularFilter
              newsData={newsData}
              notFound={notFound}
              newsTitle={newsTitle}
            />

            {newsData?.length && !notFound ? (
              <NewsMain newsTitle={newsTitle} data={newsData} pageAds={pageAds} />
            ) : (
              <p className="notFound">No data present</p>
            )}

            {loadCheck > 0 && newsData.length > 6 ? (
              loadMore <= 30 ? (
                <button
                  onClick={() => loadPosts(loadMore, newsData)}
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
            background: url("images/sprite.png");
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

          //    header start
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

          // header ends

          // popular filter start

          .fltb_wrp {
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            padding: 15px 0 10px 30px;
            border-top: #d8d8d8 solid 1px;
          }
          .flt_by {
            font: bold 14px/17px Mukta, sans-serif;
            color: #525252;
          }
          .fltb_h {
            font: bold 14px/17px Mukta, sans-serif;
            color: #525252;
            margin-bottom: 8px;
          }
          .fltb_list {
            display: flex;
            flex-wrap: wrap;
          }
          .fltb_tags {
            background: #efefef;
            padding: 5px 10px 4px 10px;
            border: none;
            border-radius: 6px;
            font: normal 13px/15px Mukta, sans-serif;
            margin: 0 0 5px 5px;
            color: #4e4e4e;
          }
          .fltb_tags.active,
          .fltb_tags:hover {
            background: #ee1c24;
            color: white;
            cursor: pointer;
          }

          // popular filter ends

          // news main start

          .mbn_mwrp {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -10px 0px -10px;
          }
          .mbnc_wrp {
            width: 25%;
            padding: 0 10px;
            margin-bottom: 20px;
          }
          .mbn_col {
            display: block;
            background: #f5f5f5;
            border: 1px solid #d8d8d8;
            min-height: 260px;
            position: relative;
            height: 100%;
          }
          .mbn_thmb {
            width: 100%;
            vertical-align: top;
          }
          .mbnc_wrp:first-child {
            width: 50%;
          }
          .mbnc_wrp:first-child .thmb_txtwrp {
            text-align: center;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: -moz-linear-gradient(
              top,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 1) 100%
            ); /* FF3.6-15 */
            background: -webkit-linear-gradient(
              top,
              rgba(0, 0, 0, 0) 0%,
              rgba(15, 5, 5, 1) 100%
            ); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 1) 100%
            ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 ); /* IE6-9 */
          }
          .mbnc_wrp:first-child .thmb_tag {
            font: normal 12px/1 Mukta, sans-serif;
            color: #ffffff;
            text-shadow: 0px 3px 6px #00000029;
            text-transform: uppercase;
          }
          .mbnc_wrp:first-child .thmb_copy {
            font: bold 23px/29px Mukta, sans-serif;
            color: #ffffff;
            text-shadow: 0px 3px 6px #00000029;
          }
          .thmb_txtwrp {
            padding: 10px;
          }
          .thmb_tag {
            font: normal 12px/1 Mukta, sans-serif;
            color: #e1261d;
            text-transform: uppercase;
            margin-bottom: 6px;
          }
          .thmb_copy {
            font: bold 15px/22px Mukta, sans-serif;
            color: #001d42;
          }
          // news main ends

          // <!-- trending and recomended mobile starts here -->
          #trndm {
            background: #f5f5f5;
            padding: 13px 20px 11px 20px;
            margin-bottom: 30px;
          }
          .trndm_wrp,
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
            height: 14px;
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

          .sprite {
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/sprite_1643807363.png);
          }

          .bg-card {
            background-position: -10px -180px;
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
            margin: 10px auto 30px;

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
};

export default NewsPage;
