import React, { useEffect } from "react";
import OtherMobileListing from "./components/OtherMobileListing";
import Glide from "@glidejs/glide";
import MobileDescription from "./components/MobileDescription";
import SpecificationComponent from "./components/SpecificationComponent";
import KeySpecs from "./components/KeySpecs";
import LatestNewsView from "./components/LatestNewsView";
import MobileBrandView from "./components/MobileBrandView";
import SearchForMobile from "./components/SearchForMobile";
import Faq from "./components/SpecFaq";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Head from "next/head";
import { specificationURL } from "includes/brand.helper";

const { brandURL } = require("/src/includes/brand.helper");

import { scrollToTarget } from "includes/article.util";
import getConfig from "next/config";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const { publicRuntimeConfig } = getConfig();

export default function Specification(props, context) {
  useEffect(() => {
    setTimeout(() => {
      const elm = document?.querySelector(`.phnlgsld`);
      if (elm) {
        new Glide(".phnlgsld", {
          autoplay: 4000,
          type: "carousel",
          perView: 1,
          gap: 0,
          slidesToScroll: 1,
        })?.mount();
      }
    }, 2000);
  }, []);

  const scroll = (e, id) => {
    e.preventDefault();
    scrollToTarget(id);
  };

  const { brand, title, updated_at, id } =
    props?.topPriorityData?.specificationDetails || {};

  const {
    specificationDescription,
    brandTitle,
    specificationDetails,
    otherMobilesOfBrand,
    latestNews,
    trendingMobileInStock,
    brandData,
    specFaq,
  } = props?.topPriorityData || {};

  const updated_at_date = updated_at && "" + updated_at;
  const year = updated_at_date && updated_at_date.slice(0, 4);
  const month = updated_at_date && updated_at_date.slice(5, 7);
  const day = updated_at_date && updated_at_date.slice(8, 10);

  const currentURL = title?.includes("(")
    ? `${specificationURL}/${title
      ?.slice(0, title?.indexOf("("))
      ?.replace(/ /g, "-")
      ?.toLowerCase()}${id}`
    : `${specificationURL}/${title?.replace(/ /g, "-")?.toLowerCase()}-${id}`;
  return (
    <>
      <div className="mobileWidgetFont">
        
      <BreadcrumbCommon breadCrumbArray={[
            { value: "होम", slug: "/"},
            { value: "मोबाइल्स", slug: "/mobiles/"},
            { value: brand, slug: `${brandURL}/${brand}`.toLowerCase()+"/"},
            { value: title}]} />
        
        <div className="spctphd">
          <div className="topHead">
            <h1>{title}</h1>
            <ul className="dflx">
              {/* <li>
              <a href="#">{brand}</a>
            </li> */}
              {updated_at_date ? (
                <li>पिछली बार अपडेट किया गया : {`${day}-${month}-${year}`}</li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <li className="whatIcon">
            <a
              title="Whatsapp Share"
              className="for-whatsapp"
              href={`https://wa.me/?text=https://${publicRuntimeConfig.siteUrl}${currentURL.slice(1,)}/`}
              target="_blank"
            >
              <span className="spriteshare art-whatsapp-icon"></span>
            </a>
          </li>
        </div>

        <SearchForMobile title={brandTitle} />
        <div className="clearfix firstsection">
          {specificationDetails && Object.keys(specificationDetails)?.length ? (
            <ul className="spcnv dflx">
              <li className="active">
                <a onClick={(e) => scroll(e, "spcovrw")} href="#spcovrw">
                  अवलोकन
                </a>
              </li>
              {specificationDescription?.mobile_description ? (
                <li>
                  <a
                    onClick={(e) => scroll(e, "spcabt")}
                    href="#spcabt"
                    className="active"
                  >
                    मोबाइल के बारे में
                  </a>
                </li>
              ) : (
                ""
              )}

              <li>
                <a onClick={(e) => scroll(e, "asdmf")} href="#asdmf">
                  {brand} के अन्‍य मोबाइल्‍स
                </a>
              </li>
              <li>
                <a onClick={(e) => scroll(e, "newsWidget")} href="#newsWidget">
                  लेटेस्‍ट मोबाइल न्‍यूज{" "}
                </a>
              </li>
              <li>
                <a onClick={(e) => scroll(e, "spcspcfcn")} href="#spcspcfcn">
                  स्‍पेसिफिकेशंस
                </a>
              </li>
              <li>
                <a onClick={(e) => scroll(e, "asdmfsad")} href="#asdmfsad">
                  ट्रेंडिंग और रिकमंडेड
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => scroll(e, "brandWidget")}
                  href="#brandWidget"
                >
                  अलग-अलग ब्रांड के लोकप्रिय मोबाइल
                </a>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>

        {specificationDetails && Object.keys(specificationDetails)?.length ? (
          <KeySpecs data={specificationDetails} />
        ) : (
          ""
        )}

        {specificationDescription &&
          Object.keys(specificationDescription)?.length ? (
          <MobileDescription
            specificationDescription={specificationDescription}
            title={title}
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
                    [336, 280],
                  ]}
                  removeAdSpan={true}
                ></SiteAd>
              </div>
            </div>
          ) : null}
        </div>

        {otherMobilesOfBrand?.length ? (
          <OtherMobileListing
            title="अन्‍य"
            span={`${brand} मोबाइल्‍स`}
            data={otherMobilesOfBrand}
            GlideId="asdmf"
          />
        ) : (
          ""
        )}

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

        {latestNews?.length ? <LatestNewsView data={latestNews} /> : ""}

        {specificationDetails && Object.keys(specificationDetails)?.length ? (
          <SpecificationComponent title={title} data={specificationDetails} />
        ) : (
          ""
        )}

        {trendingMobileInStock?.length ? (
          <OtherMobileListing
            span="मोबाइल"
            title="ट्रेंडिंग और रिकमंडेड"
            data={trendingMobileInStock}
            GlideId="asdmfsad"
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

        <Faq faq={specFaq} />

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
      </div>
      <style jsx global>
        {`

          .mobileWidgetFont {
            font-family: Mukta, sans-serif !important;
          }
          body {
            margin: auto;
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
            justify-content: space-between;
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
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 15px 15px 2px 15px;
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

          .dflx {
            display: flex;
          }

          .spcnv {
            position: sticky;
            top: 0;
            border-bottom: 1px solid #d8d8d8;
            padding-left: 5px;
            overflow: scroll;
            background: #fff;
            z-index: 1;
          }
          .spcnv li {
            flex-shrink: 0;
          }
          .spcnv li a {
            display: block;
            height: 40px;
            line-height: 40px;
            color: #525252;
            font-size: 13px;
            padding: 0 10px;
            position: relative;
            background: #fff;
          }
          .spcnv li.active a {
            color: #e1261d;
            font-size: 14px;
            font-weight: bold;
            border-bottom: 3px solid #e1261d;
          }
          .spcnv li.active {
            position: sticky;
            right: 0;
            left: 0;
          }
          .spcovrw {
            border: 1px solid #d8d8d8;
            margin: 10px 15px;
          }
          .spcky {
            background: #f6f7f7;
            padding: 10px;
          }
          .spcky h2 {
            color: #001d42;
            font-size: 16px;
            line-height: 20px;
          }
          .spcky .gbdrpdn {
            width: 120px;
            height: 24px;
            line-height: 24px;
            background: #fff;
            border: 1px solid #d9d9d9;
            border-radius: 14px;
            padding: 0 10px;
            font-size: 12px;
            color: #061836;
            font-weight: bold;
            position: relative;
          }
          .spcky .gbdrpdn:after {
            content: "";
            background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/dimsprite.png") -17px
              0px no-repeat;
            width: 8px;
            height: 13px;
            position: absolute;
            top: 5px;
            right: 10px;
          }
          .dimsprite {
            background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/dimsprite.png")
              0 0 no-repeat;
            display: inline-block;
          }
          .dimsprite.andrdicn {
            width: 12px;
            height: 14px;
            background-position: -27px 0px;
            position: relative;
            top: 2px;
            margin-right: 7px;
          }
          .andrd {
            text-align: center;
            font-size: 12px;
            color: #001d42;
            font-weight: bold;
            padding: 8px 0;
          }
          .phnlgsld {
            overflow: hidden;
            position: relative;
          }
          .phnlgsld ul {
            display: flex;
          }
          .phnlgsld ul li {
            text-align: center;
            align-items: center;
            display: flex;
          }
          .phnlgar {
            position: absolute;
            top: 50%;
            margin-top: -12px;
            left: 0px;
            right: 0px;
          }
          .phnlgar button {
            position: absolute;
            top: 0;
            left: 10px;
            width: 10px;
            height: 10px;
            transform: rotate(-45deg);
          }
          .phnlgar button:before {
            content: "";
            position: absolute;
            width: 12px;
            height: 12px;
            border-top: 2px solid #425673;
            border-left: 2px solid #425673;
          }
          .phnlgar button:last-child {
            left: auto;
            right: 10px;
            transform: rotate(135deg);
          }
          .phnprc {
            color: #0076db;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            line-height: 20px;
          }
          .phnrlsdt {
            font-size: 12px;
            color: #212121;
            line-height: 18px;
            text-align: center;
            margin: 5px 0 10px 0;
          }
          .phnrlsdt span {
            display: block;
            color: #646464;
          }
          .phnfourbx {
            margin: 0 8px 0 10px;
            flex-wrap: wrap;
          }
          .phnfourbx li {
            background: #f6f7f7;
            padding: 12px 5px 12px 12px;
            margin: 1px;
            width: 49%;
          }
          .phnfourbx li .icnhd {
            color: #ff5a00;
            font-size: 14px;
            font-weight: bold;
            line-height: 20px;
            display: flex;
            align-items: center;
          }
          .phnfourbx li .icnhd span {
            width: 30px;
            height: 30px;
            flex-shrink: 0;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .phninsd {
            margin-top: 10px;
          }
          .phninsd span {
            display: block;
            color: #646464;
            font-size: 12px;
            position: relative;
            line-height: 22px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .phninsd span:before {
            content: "";
            width: 5px;
            height: 5px;
            display: inline-block;
            background: #bababa;
            border-radius: 100%;
            position: relative;
            top: -2px;
            margin-right: 5px;
          }
          .dimsprite.icnfst {
            width: 30px;
            height: 30px;
            background-position: -41px 0px;
          }
          .dimsprite.icnscnd {
            width: 18px;
            height: 30px;
            background-position: -72px 0px;
          }
          .dimsprite.icnthrd {
            width: 30px;
            height: 19px;
            background-position: -91px 0px;
          }
          .dimsprite.icnfrth {
            width: 16px;
            height: 30px;
            background-position: -122px 0px;
          }
          .phnflspcfn {
            margin: 12px;
            height: 280px;
            overflow: hidden;
            transition: all 0.5s ease-in-out;
          }
          .phnflspcfn.adcls {
            height: 100%;
            transition: all 0.5s ease-in-out;
          }
          .phnflspcfn li {
            display: flex;
            align-items: center;
            color: #212121;
            font-size: 13px;
            line-height: 36px;
          }
          .phnflspcfn li span {
            width: 25px;
            height: 28px;
            flex-shrink: 0;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0.8;
          }
          .dimsprite.icnram {
            width: 18px;
            height: 20px;
            background-position: -139px 0px;
          }
          .dimsprite.icnvolt {
            width: 14px;
            height: 18px;
            background-position: -158px 0px;
          }
          .dimsprite.icnsplsh {
            width: 14px;
            height: 20px;
            background-position: -174px 0px;
          }
          .dimsprite.icnsprbrnd {
            width: 14px;
            height: 18px;
            background-position: -190px 0px;
          }
          .dimsprite.icnsim {
            width: 18px;
            height: 20px;
            background-position: -206px 0px;
          }
          .dimsprite.icnfngrprt {
            width: 18px;
            height: 20px;
            background-position: -225px 0px;
          }
          .dimsprite.icnfmrd {
            width: 20px;
            height: 13px;
            background-position: -244px 0px;
          }
          .dimsprite.icngrlgls {
            width: 12px;
            height: 20px;
            background-position: -265px 0px;
          }
          .flspcfnbtn {
            background: #f6f7f7;
            padding: 10px 0;
            display: flex;
            justify-content: center;
          }
          .flspcfnbtn a {
            display: block;
            margin: auto;
            background: #e1261d;
            height: 28px;
            line-height: 33px;
            color: #fff;
            border-radius: 14px;
            font-size: 14px;
            font-weight: bold;
            padding: 0 15px;
            position: relative;
          }
          .spcabt {
            margin: 30px 15px;
            position: relative;
          }
          .spcabttxt {
            padding-bottom: 30px;
          }
          .spcabttxt.adcls {
          }
          .spcabttxt p {
            color: #414141;
            font-size: 13px;
            line-height: 20px;
            margin-bottom: 20px;
          }
          .spcabttxt-full {
            display: none;
          }
          .mrtxtbtn {
            position: absolute;
            bottom: 45px;
            left: 0;
            right: 0;
            height: 50px;
            background: linear-gradient(transparent, #fff);
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }
          .mrtxtbtn span {
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
          .mrtxtbtn span:nth-child(2) {
            display: none;
          }
          .mrtxtbtn span:before,
          .mrtxtbtn span:after {
            position: absolute;
            content: "";
            width: 6px;
            height: 6px;
            border-bottom: 2px solid #cecece;
            border-left: 2px solid #cecece;
            transform: rotate(-45deg);
            top: 11px;
          }
          .mrtxtbtn span:before {
            left: 16px;
          }
          .mrtxtbtn span:after {
            right: 16px;
          }
          .mrtxtbtn.adcls {
            bottom: 0;
          }
          .mrtxtbtn.adcls span:before,
          .mrtxtbtn.adcls span:after {
            transform: rotate(135deg);
            top: 15px;
          }
          .mrtxtbtn.adcls span:nth-child(2) {
            display: block;
          }
          .mrtxtbtn.adcls span:nth-child(1) {
            display: none;
          }

          .brdcrm {
            background: #fff;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            position: relative;
            padding: 4px 16px;
            color: #000;
            font-size: 12px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            background-position: #fff;
            font-weight: 700;
          }

          html {
            scroll-behavior: smooth;
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

          .andrd svg {
            flex-shrink: 0;
            width: 12px;
            height: 14px;
            background-position: -27px 0px;
            position: relative;
            top: 2px;
            margin-right: 7px;
          }

          .spriteshare {
            background: url(/images/siteimages/sprite_img_fornewarticle_1636363070.svg)
              0 0 no-repeat;
            width: 40px;
            height: 40px;
            display: block;
          }

          .whatIcon {
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 4px 0px 0px 4px;
            position: fixed;
            right: 0;
            z-index: 9;
            overflow: hidden;
          }

          .spriteshare.art-whatsapp-icon {
            background-position: 0px -150px;
          }

          .spctphd .topHead {
            max-width: 305px;
          }
        `}
      </style>
    </>
  );
}
