import { newsPageLimit, newsURL } from "includes/brand.helper";
import React, { useState } from "react";
import Pagination from "./components/Pagination";
import MobileBrandView from "./components/MobileBrandView";
import MobileNews from "./components/MobileNews";
import OtherMobileListing from "./components/OtherMobileListing";
import SearchForMobile from "./components/SearchForMobile";
import SiteAd from "widgets/Common/Responsive/SiteAd";

import { getArticleList } from "api/global/Common";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

function NewsPage(props) {
  const { urlParam, brandTitle, latestNews, brandData, trendingMobileInStock } =
    props?.topPriorityData || {};

  const [newsData, setNewsData] = useState(latestNews);

  const [pageNumber, setPageNumber] = useState(urlParam.page);
  const notFound = pageNumber > newsPageLimit;
  const subStringforNews= urlParam?.name ? { "tags.slug": `${urlParam?.name?.toLowerCase()}`,"post_type":"text"}:{ "tag_topic": "mobile","post_type":"text"};


  const paginationClick = async (param) => {

    let paginatedData = [];
    let startPoint = 19 * (param - 1)
    paginatedData = await getArticleList({count: 19, offset: startPoint, fields: '*,', filter: subStringforNews}, true),
    setNewsData(paginatedData);
    setPageNumber(param);
    if (brandTitle) {
      history.pushState("", "", `${newsURL}/${brandTitle}/page-${param}`);
    } else {
      history.pushState("", "", `${newsURL}/page-${param}`);
    }
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className='mobileWidgetFont'>
      <BreadcrumbCommon breadCrumbArray={[{ value: "होम", slug: "/"},{ value: "मोबाइल्स", slug: "/mobiles/"}, { value: "मोबाइल न्यूज़", slug: newsURL+"/"}, { value: brandTitle || "All"}]} />

        <div className="spctphd">
          <h1>मोबाइल न्‍यूज</h1>
        </div>
        <SearchForMobile title={brandTitle} />
        {newsData?.length && !notFound ? (
          <MobileNews data={newsData} title={false} pageAds={props?.pageAds} />
        ) : (
          <p className="notFound">No data present</p>
        )}

        {newsData?.length && !notFound ? (
          <Pagination
            curpage={pageNumber || 1}
            TotalRecord={300}
            limit={10}
            pageurl={`${newsURL}/${brandTitle}/`}
            pageflag={false}
            paginationClick={paginationClick}
          />
        ) : null}

        {props?.pageAds?.ATF_300 ? (
          <div className="add_secton">
            <div className="ad-container">
              <div className="addinner-box">
                <SiteAd
                  width={300}
                  height={280}
                  slotId="mobileAdNew300x250_1"
                  adUnit={props?.pageAds.ATF_300}
                  lazyload={true}
                  sizes={[

                    [300, 250],
                    [336, 280],

                  ]}
                  removeAdSpan={true}
                ></SiteAd>
              </div>
            </div>
          </div>
        ) : null}
        {trendingMobileInStock?.length ? (
          <OtherMobileListing
            span="मोबाइल"
            title="ट्रेंडिंग और रिकमंडेड"
            data={trendingMobileInStock}
            GlideId="iasdn"
          />
        ) : (
          ""
        )}

        {props?.pageAds?.BTF_300 ? (
          <div className="add_secton">
            <div className="ad-container">
              <div className="addinner-box">
                <SiteAd
                  width={300}
                  height={250}
                  slotId={"mobileAdNew"}
                  adUnit={props?.pageAds.BTF_300}
                  sizes={[
                    [300, 250],
                    [336, 280],
                  ]}
                  removeAdSpan={true}
                  lazyload={true}
                ></SiteAd>
              </div>
            </div>
          </div>
        ) : null}
        {brandData && Object.keys(brandData).length ? (
          <MobileBrandView data={brandData} />
        ) : (
          ""
        )}

        <SiteAd
          slotId="pg_slider_1x1"
          adUnit={props?.pageAds?.PG_Slider_1x1}
          sizes={[1, 1]}
          removeAdSpan={true}
          loadonScroll={true}
        />

        {props.pageAds?.PG_1x1 && (
          <SiteAd
            slotId="PG_1x1"
            adUnit={props.pageAds.PG_1x1}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          />
        )}

{ typeof props?.pageAds.PG_1x1_2 !== "undefined" && props?.pageAds.PG_1x1_2 !== "" ? (
        <SiteAd slotId="PG_1x1_2" adUnit={props?.pageAds.PG_1x1_2} sizes={[[1, 1]]} removeAdSpan={true} loadonScroll={true} />
        ) : null}
          { typeof props?.pageAds.PG_1x1_3 !== "undefined" && props?.pageAds.PG_1x1_3 !== "" ? (
        <SiteAd slotId="PG_1x1_3" adUnit={props?.pageAds.PG_1x1_3} sizes={[[1, 1]]} removeAdSpan={true} loadonScroll={true} />
        ) : null}
        <style jsx global>
          {`
          .mobileWidgetFont{
               font-family : Mukta, sans-serif !important;
            }
            body {
              margin: auto;
            }
            .engfont {
              //font-family: "Recursive", sans-serif;
            }
            figure,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            header,
            ul,
            ol,
            output,
            p {
              margin: 0;
              padding: 0;
            }
            li {
              list-style: none;
            }
            button,
            button:focus,
            input:focus,
            textarea:focus {
              outline: 0;
              border: none;
              outline: none;
              padding: 0;
              margin: 0;
              background: none;
            }
            table {
              border-collapse: collapse;
              border-spacing: 0;
            }
            a {
              text-decoration: none;
              outline: 0;
            }
            * {
              box-sizing: border-box;
            }
            .clearfix {
              clear: both;
            }
            .clearfix:after,
            .clearfix:before {
              content: "";
              display: block;
              clear: both;
              visibility: hidden;
              line-height: 0;
              height: 0;
            }
            .dflx {
              display: flex;
            }
            .jstbtwn {
              justify-content: space-between;
            }
            .flxwrp {
              flex-wrap: wrap;
            }
            .jstcntr {
              justify-content: center;
            }
            .algncntr {
              align-items: center;
            }
            .spcwrapper {
              max-width: 360px;
              margin: auto;
            }

            .spctphd {
              padding: 15px 15px 5px 15px;
            }
            .spctphd h1,
            .spctphd h2 {
              color: #001d42;
              font-size: 24px;
              font-weight: bold;
              line-height: 28px;
              margin-bottom: 5px;
            text-transform: capitalize;

            }
            .spctphd ul {
            }
            .spctphd ul li {
              color: #828282;
              font-size: 12px;
            }
            .spctphd ul li a {
              color: #e1261d;
              text-decoration: underline;
            }
            .spctphd ul li:first-child:after {
              content: "";
              width: 5px;
              height: 5px;
              background: #bababa;
              display: inline-block;
              border-radius: 100%;
              vertical-align: middle;
              margin: 0 10px;
            }

            .spctpsrch {
              background: #f6f7f7;
              padding: 15px;
              border-bottom: 1px solid #d8d8d8;
              position: relative;
              z-index: 2;
            }
            .spctpsrch div {
              background: #fff;
              width: 100%;
              height: 38px;
              box-shadow: 0px 3px 6px #00000029;
              border: 1px solid #d9d9d9;
              border-radius: 20px;
              padding: 0 10px;
              overflow: hidden;
              position: relative;
              transition: all 0.5s ease-in-out;
              border-bottom: none;
            }
            .spctpsrch div:after {
              content: "";
              background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/dimsprite.png")
                0 0 no-repeat;
              width: 16px;
              height: 16px;
              position: absolute;
              top: 12px;
              right: 16px;
            }
            .spctpsrch div input {
              //font-family: "Recursive", sans-serif;
              font-size: 13px;
              color: #828282;
              height: 36px;
              border: none;
              width: 100%;
            }
            .spctpsrch ul {
              height: 0px;
              overflow: auto;
              box-shadow: 0px 3px 6px #00000029;
              border-radius: 0 0 20px 20px;
              padding: 0 10px;
              position: absolute;
              transition: all 0.5s ease-in-out;
              background: #fff;
              left: 15px;
              right: 15px;
              top: 53px;
              border: 1px solid #d9d9d9;
              border-top: none;
              visibility: hidden;
            }
            .spctpsrch ul li a {
              height: 37px;
              line-height: 37px;
              border-top: 1px solid #d9d9d9;
              color: #000;
              font-size: 13px;
              padding: 0 5px;
              display: block;
              position: relative;
            }
            // .spctpsrch ul li a:after {
            //   background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/dimsprite.png")
            //     0 0 no-repeat;
            //   content: "";
            //   position: absolute;
            //   top: 11px;
            //   right: 5px;
            //   width: 16px;
            //   height: 16px;
            //   opacity: 0.4;
            // }
            .spctpsrch.adcls div {
              transition: all 0.5s ease-in-out;
              border-radius: 15px 15px 0 0;
            }
            .spctpsrch.adcls ul {
              height: 300px;
              transition: all 0.5s ease-in-out;
              visibility: visible;
            }

            .phnglblhd {
              color: #001d42;
              font-size: 18px;
              font-weight: bold;
              text-transform: uppercase;
              border-bottom: 1px solid #bebebe;
              line-height: 24px;
              padding-bottom: 10px;
              margin-bottom: 10px;
              position: relative;
            }
            .phnglblhd span {
              color: #e1261d;
            }
            .phnglblhd:after {
              content: "";
              width: 25px;
              height: 4px;
              position: absolute;
              left: 0;
              bottom: -1px;
              background: #ed1c24;
            }
            .phnglblhd.forbg {
              margin-left: 15px;
              margin-right: 15px;
            }

            .psrlhdn {
              position: relative;
              overflow: hidden;
            }

            .phnlgblts {
              margin: 18px 0;
            }
            .phnlgblts button {
              margin: 0 5px;
              padding: 0;
              width: 6px;
              height: 6px;
              background: #ccc;
              border: none;
              outline: none;
              border-radius: 100%;
            }
            .phnlgblts button.glide__bullet--active {
              background: #e1261d;
              width: 18px;
              border-radius: 5px;
            }

            .spcglbg {
              background: #f5f5f5;
              border-bottom: 1px solid #d8d8d8;
              padding: 15px 0 0 0;
              margin-bottom: 30px;
            }
            .vsp60 {
              margin-top: 60px;
            }
            .spcnwslist li figcaption a span {
              display: block;
              color: #e1261d;
              font-size: 11px;
              text-transform: uppercase;
              margin-bottom: 2px;
            }
            .spcnwslist {
            }
            .spcnwslist li {
              display: flex;
              justify-content: space-between;
              background: #f5f5f5;
              padding: 10px;
              margin-bottom: 5px;
            }
            .spcnwslist li figcaption h2 {
              font-size: 14px;
              line-height: 18px;
            }
            .spcnwslist li figcaption h2 a {
              color: #001d42;
            }
            .spcnwslist li figcaption a span {
              display: block;
              color: #e1261d;
              font-size: 11px;
              text-transform: uppercase;
              margin-bottom: 2px;
            }
            .spcnwslist li figure {
              width: 100px;
              height: 67px;
              overflow: hidden;
              line-height: 0;
              flex-shrink: 0;
              margin-left: 15px;
            }
            .spcnwslist li figure img {
              width: 100%;
            }
            .spcnwslist li:first-child {
              display: block;
            }
            .spcnwslist li:first-child figcaption h2 {
              // font-family: "Playfair Display", serif;
              font-size: 18px;
              line-height: 24px;
              margin-bottom: 5px;
            }
            .spcnwslist li:first-child figure {
              width: 100%;
              margin-left: 0;
              height: auto;
            }

            .notFound {
              text-align: center;
              // height: 40px;
              font-size: 17px;
              color: black;
              margin: 10px 0px;
            }


          .add_secton,
          .middlead,
          .ad_cntainer {
            margin: 0px 0px 30px 0px;

            padding: 10px 0px 10px;
            text-align: center;
            display: flex;
            overflow: hidden;
            background: #f5f5f5;
            justify-content: center;
            height: 300px;
          }

          .phnprc {
            color: #0076DB;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            line-height: 20px;
        }
          `}
        </style>
      </div>
    </>
  );
}

export default NewsPage;
