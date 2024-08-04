import React from "react";
import BrandDescription from "./components/BrandDescription";
import MobileBrandView from "./components/MobileBrandView";
import MobileNews from "./components/MobileNews";
import MobileVideos from "./components/MobileVideos";
import OtherMobileListing from "./components/OtherMobileListing";
import SearchForMobile from "./components/SearchForMobile";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Head from "next/head";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

function Mobile(props) {
  const {
    trendingMobileInStock,
    latestNews,
    brandData,
    upcomingMobiles,
    videos,
  } = props.topPriorityData || {};

  return (
    <div className="mobileWidgetFont">
      <BreadcrumbCommon breadCrumbArray={[{ value: "होम", slug: "/"},{ value: "मोबाइल्स"}]} />
      <div className="spctphd">
        <h1>मोबाइल्स</h1>
      </div>

      {/* <QuickView /> */}
      <SearchForMobile />
      <BrandDescription isImage={false} />

      {trendingMobileInStock?.length ? (
        <OtherMobileListing
          span=" मोबाइल"
          title="ट्रेंडिंग और रिकमंडेड"
          data={trendingMobileInStock}
          GlideId="asdasdasd"
        />
      ) : (
        ""
      )}

      <div className="add_secton">
        {props?.pageAds?.header_ATF_320 ? (
          <div className="ad-container">
            <div className="addinner-box">
              <SiteAd
                width={336}
                height={280}
                slotId="mobileAdNew300x250_0"
                adUnit={props?.pageAds.header_ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280]
                ]}
                removeAdSpan={true}
              ></SiteAd>
            </div>
          </div>
        ) : null}
      </div>

      {latestNews?.length ? <MobileNews data={latestNews} title={true} /> : <></>}

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
                  [336, 280]
                ]}
                removeAdSpan={true}
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

      {upcomingMobiles?.length ? (
        <OtherMobileListing
          span="मोबाइल"
          title="जल्‍द लॉन्‍च होने वाले"
          data={upcomingMobiles}
          GlideId="asdas"
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

      {/* {latestNews && latestNews?.length ? (
        <MobileComparisons data={latestNews} />
      ) : (
        ""
      )} */}

      {videos && videos.length ? <MobileVideos data={videos} /> : ""}

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

      {typeof props?.pageAds.PG_1x1_2 !== "undefined" &&
      props?.pageAds.PG_1x1_2 !== "" ? (
        <SiteAd
          slotId="PG_1x1_2"
          adUnit={props?.pageAds.PG_1x1_2}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : null}
      {typeof props?.pageAds.PG_1x1_3 !== "undefined" &&
      props?.pageAds.PG_1x1_3 !== "" ? (
        <SiteAd
          slotId="PG_1x1_3"
          adUnit={props?.pageAds.PG_1x1_3}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : null}
      <style jsx global>
        {`
          
          .mobileWidgetFont {
            font-family: Mukta, sans-serif !important;
          }
          body {
            margin: auto;
          }
          .engfont {
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
            margin: 10px 0;
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
          .brndabt {
            margin-bottom: 45px;
            position: relative;
          }
          .brndabttxt {
            background: #f6f7f7;
            padding: 10px 15px 0px 15px;
            border-bottom: 1px solid #444;
          }
          .brndabttxt.adcls {
            padding-bottom: 30px;
          }
          .spcabttxt-first {
          }
          .spcabttxt-full {
            display: none;
          }
          .brndabttxt p {
            color: #414141;
            font-size: 15px;
            line-height: 22px;
            margin-bottom: 20px;
          }
          .brndabttxt figure {
            background: #ffffff;
            width: 150px;
            height: 90px;
            box-shadow: 0px 3px 6px #00000029;
            float: left;
            justify-content: center;
            display: flex;
            align-items: center;
            margin-right: 15px;
          }
          .brndabttxt figure img {
          }
          .brndmrtxtbtn {
            position: absolute;
            bottom: -15px;
            left: 0;
            right: 0;
            height: 100px;
            background: linear-gradient(transparent, #fff);
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }
          .brndmrtxtbtn span {
            position: relative;
            background: #ffffff;
            box-shadow: 0px 3px 6px #00000033;
            border-radius: 17px;
            width: 140px;
            height: 34px;
            line-height: 34px;
            color: #e1261d;
            font-size: 14px;
            text-align: center;
            font-weight: bold;
          }
          .brndmrtxtbtn span:nth-child(2) {
            display: none;
          }
          .brndmrtxtbtn span:before,
          .brndmrtxtbtn span:after {
            position: absolute;
            content: "";
            width: 6px;
            height: 6px;
            border-bottom: 2px solid #cecece;
            border-left: 2px solid #cecece;
            transform: rotate(-45deg);
            top: 11px;
          }
          .brndmrtxtbtn span:before {
            left: 16px;
          }
          .brndmrtxtbtn span:after {
            right: 16px;
          }
          .brndmrtxtbtn.adcls {
            bottom: 0;
            height: 35px;
          }
          .brndmrtxtbtn.adcls span:before,
          .brndmrtxtbtn.adcls span:after {
            transform: rotate(135deg);
            top: 15px;
          }
          .brndmrtxtbtn.adcls span:nth-child(2) {
            display: block;
          }
          .brndmrtxtbtn.adcls span:nth-child(1) {
            display: none;
          }

          .rlgdtorng {
            font-size: 12px;
            color: #ff5a00;
            line-height: 18px;
            text-align: center;
            margin: 5px 0 0 0;
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
            color: #0076db;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            line-height: 20px;
          }

          .homeNewsHeading {
            margin: 0px 15px;
          }
          .homeNewsHeading .spcnwslist {
            margin: 0px -15px 30px -15px;
          }
        `}
      </style>
    </div>
  );
}

export default Mobile;
