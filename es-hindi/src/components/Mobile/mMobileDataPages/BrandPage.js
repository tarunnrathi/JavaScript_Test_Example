import React, { useState } from "react";
import LatestNewsView from "./components/LatestNewsView";
import MobileBrandView from "./components/MobileBrandView";
import MobileListing from "./components/MobileListing";
import BrandDescription from "./components/BrandDescription";
import SearchForMobile from "./components/SearchForMobile";
import Faq from "./components/Faq";
import Pagination from "./components/Pagination";
import { brandPageLimit, brandURL } from "includes/brand.helper";
import SiteAd from "widgets/Common/Responsive/SiteAd";

import getConfig from "next/config";
import { getMobilelist } from "api/global/Common";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

export default function BrandPage(props) {
  const [showOption, setShowOption] = useState(false);
  const [brandListData, setBrandListData] = useState(
    props?.topPriorityData?.MobilesOfBrand || []
  );

  const [activeEle, setActiveEle] = useState("");

  const [sortOptions, setSortOptions] = useState({
    price: "up",
    release_date: "up",
  });

  const { publicRuntimeConfig } = getConfig();

  const {
    brandDescription,
    urlParam,
    brandTitle,
    MobilesOfBrand,
    latestNews,
    brandData,
    faq
  } = props?.topPriorityData || {};

  const [pageNumber, setPageNumber] = useState(parseInt(urlParam?.page) || 0);
  const [sortFilter, setSortFilter] = useState({});

  const notFound = pageNumber > brandPageLimit;
  let tempFilter = {"brand_slug":`${brandTitle}`}
  const handleSorting = async (ele, order) => {
    const mobilesOfBrand = await getMobilelist({filter: tempFilter, fields:`*,`, sortBy: ele, sortOrder:order}, true)
    setSortFilter({ ...sortFilter, ele, order });

    setBrandListData(mobilesOfBrand);
  };

  const paginationClick = async (param) => {
    let paginatedData = [];

    if (sortFilter && Object.keys(sortFilter).length) {
      let startPoint = 10 * (param - 1)
      paginatedData = await getMobilelist({offset: startPoint, count:10, filter: tempFilter, fields:`*,`, sortBy: sortFilter?.ele, sortOrder: sortFilter?.order}, true)
    } else {
      paginatedData = await getMobilelist({offset: startPoint, count:10, filter: tempFilter, fields:`*,`, sortOrder: sortFilter?.order}, true)
    }
    setBrandListData(paginatedData);
    setPageNumber(param);
    history.pushState("", "", `${brandURL}/${brandTitle}/page-${param}`);
    window.scrollTo(0, 0);
  };

  const onSortClick = (ele) => {
    setActiveEle(ele);
    setSortOptions({
      ...sortOptions,
      [ele]: sortOptions[ele] === "up" ? "down" : "up",
    });
    handleSorting(ele, sortOptions[ele] === "up" ? "desc" : "asc");
  };
  return (
    <div className="mobileWidgetFont">
       <BreadcrumbCommon breadCrumbArray={[{ value: "होम", slug: "/"},{ value: "मोबाइल्स", slug: "/mobiles/"}, { value: brandTitle}]} />


      <div className="spctphd">
        <h1>{brandTitle} Mobile Phones</h1>

        <li className='whatIcon'>
            <a
              title="Whatsapp Share"
              className="for-whatsapp"
              href={"https://wa.me/?text=" + encodeURIComponent(brandTitle?.toLowerCase()) + ' - ' + publicRuntimeConfig.siteUrl + brandURL.slice(1,)+"/"}
              target="_blank"
            >
              <span className="spriteshare art-whatsapp-icon"></span>
            </a>
          </li>
      </div>

      <SearchForMobile />

      {brandDescription &&
      Object.keys(brandDescription)?.length &&
      brandDescription?.brand_description ? (
        <BrandDescription
          brandDescription={brandDescription}
          isImage={true}
        ></BrandDescription>
      ) : (
        ""
      )}

{brandListData?.length && pageNumber < 2 && !notFound ? (
         <div onClick={() => setShowOption(!showOption)} className="sortDropdown">
        <div className="dropbtn">
          {" "}
          <span className=""></span>Sort
        </div>

        {/* <span class="dropdownIcon "></span> */}
        <div className="dropdownIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="13.313"
            viewBox="0 0 8 13.313"
          >
            <path
              id="Path_1183"
              data-name="Path 1183"
              d="M9.719-2.937,12.813-6,9.719-9.062,10.656-10l4,4-4,4ZM5.344-2l-4-4,4-4,.938.938L3.188-6,6.281-2.937Z"
              transform="translate(-2 -1.344) rotate(90)"
              fill="#6e6e6e"
            />
          </svg>
        </div>

        {showOption ? (
          <div className="dropdown-cont">
            <div
              className={
                activeEle === "price"
                  ? "filterOptions activeEle"
                  : "filterOptions"
              }
              onClick={() => onSortClick("price")}
            >
              <div>Price</div>
              <div className="arrows">
                {sortOptions.price === "up" ? (
                  <div
                    className="upArrow"
                    // onClick={() => handleSorting("price", "desc")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-arrow-up"
                    >
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                  </div>
                ) : (
                  ""
                )}

                {sortOptions.price === "down" ? (
                  <div
                    className="downArrow"
                    onClick={() => handleSorting("price", "asc")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-arrow-down"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              className={
                activeEle === "release_date"
                  ? "filterOptions activeEle"
                  : "filterOptions"
              }
              onClick={() => onSortClick("release_date")}
            >
              <div>Release date</div>
              <div className="arrows">
                {sortOptions.release_date === "up" ? (
                  <div
                    className="upArrow"
                    onClick={() => handleSorting("release_date", "desc")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-arrow-up"
                    >
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                  </div>
                ) : (
                  ""
                )}

                {sortOptions.release_date === "down" ? (
                  <div
                    className="downArrow"
                    onClick={() => handleSorting("release_date", "asc")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-arrow-down"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* <div  onClick={()=> handleSorting('price')}>Price

            </div> */}
            {/* <div onClick={()=> handleSorting('release_date')}>Release date</div> */}
          </div>
        ) : (
          ""
        )}
      </div>
        ) : (
          ""
        )}

      <div>
        {brandListData?.length && !notFound ? (
          <MobileListing
            data={brandListData}
            pageAds={props?.pageAds}
          />
        ) : (
          <p className="notFound">No data present</p>
        )}

        {brandListData?.length && !notFound ? (
          <Pagination
            curpage={pageNumber || 1}
            TotalRecord={300}
            limit={10}
            pageurl={`/mobiles/${brandTitle}/`}
            pageflag={false}
            paginationClick={paginationClick}
          />
        ) : null}
      </div>

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
      {latestNews?.length ? <LatestNewsView data={latestNews} /> : ""}

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

      <Faq faq={faq} />

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

          .mobileWidgetFont {
            font-family: Mukta, sans-serif !important;
          }
          body {
            margin: auto;
          }
          .engfont {
            // //font-family: "Recursive", sans-serif;
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
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
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
          // .spctpsrch div {
          //   background: #fff;
          //   width: 100%;
          //   height: 38px;
          //   box-shadow: 0px 3px 6px #00000029;
          //   border: 1px solid #d9d9d9;
          //   border-radius: 20px;
          //   padding: 0 10px;
          //   overflow: hidden;
          //   position: relative;
          //   transition: all 0.5s ease-in-out;
          //   border-bottom: none;
          // }
          .spctpsrch div:after {
            content: "";
            background: url(dimsprite.png) 0 0 no-repeat;
            width: 16px;
            height: 16px;
            position: absolute;
            top: 12px;
            right: 16px;
          }
          .spctpsrch div input {
            // //font-family: "Recursive", sans-serif;
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
          //   background: url(dimsprite.png) 0 0 no-repeat;
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
          // glide contols
          body {
            margin: auto;
          }
          .engfont {
            // //font-family: "Recursive", sans-serif;
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
            padding: 10px 15px;
          }
          .spctphd h1,
          .spctphd h2 {
            color: #001d42;
            font-size: 24px;
            font-weight: bold;
            line-height: 28px;
            margin-bottom: 5px;
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
          // .spctpsrch div {
          //   background: #fff;
          //   width: 100%;
          //   height: 38px;
          //   box-shadow: 0px 3px 6px #00000029;
          //   border: 1px solid #d9d9d9;
          //   border-radius: 20px;
          //   padding: 0 10px;
          //   overflow: hidden;
          //   position: relative;
          //   transition: all 0.5s ease-in-out;
          //   border-bottom: none;
          // }
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
          // .spctpsrch.adcls div {
          //   transition: all 0.5s ease-in-out;
          //   border-radius: 15px 15px 0 0;
          // }
          // .spctpsrch.adcls ul {
          //   height: 300px;
          //   transition: all 0.5s ease-in-out;
          //   visibility: visible;
          // }

          .phnglblhd {
            color: #001d42;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #bebebe;
            line-height: 20px;
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
          .spcglbg {
            background: #f5f5f5;
            border-bottom: 1px solid #d8d8d8;
            padding: 15px 0 0 0;
            margin-bottom: 30px;
          }
          .phnglblhd {
            color: #001d42;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            line-height: 20px;
          }
          .phnglblhd span {
            color: #e1261d;
          }
          .phnlgblts {
            margin: 18px 0;
          }
          .jstcntr {
            justify-content: center;
          }
          .phnlgblts button.glide__bullet--active {
            background: #e1261d;
            width: 18px;
            border-radius: 5px;
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
          .phnlgar {
            position: absolute;
            top: 50%;
            margin-top: -12px;
            left: 0px;
            right: 0px;
          }
          .phnglblhd::after {
            content: "";
            width: 25px;
            height: 4px;
            position: absolute;
            left: 0;
            bottom: -1px;
            background: #ed1c24;
          }
          .phnlgar button {
            position: absolute;
            top: 0;
            left: 10px;
            width: 10px;
            height: 10px;
            transform: rotate(-45deg);
          }
          .phnlgar button:last-child {
            left: auto;
            right: 10px;
            transform: rotate(135deg);
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
          .phnlgar button::before {
            content: "";
            position: absolute;
            width: 12px;
            height: 12px;
            border-top: 2px solid #425673;
            border-left: 2px solid #425673;
          }
          // glide ends
          .dflx {
            display: flex;
          }
          .brndabt {
            margin-bottom: 45px;
            position: relative;
          }

          .brndabttxt {
            background: #f6f7f7;
            padding: 15px 15px 0px 15px;
            border-bottom: 1px solid #d8d8d8;
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
            font-size: 13px;
            line-height: 20px;
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
            width: 130px;
            height: 74px;
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
          .spcrsltfnd {
            padding: 0 15px;
          }

          .spcrsltfndtop {
          }

          .spcrsltfndtop h2,
          .spcrsltfndtop h3 {
            font-size: 14px;
            font-weight: bold;
            color: #646464;
          }

          .spcrsltfndtop ul {
            margin: 10px 0 15px 0;
          }

          .spcrsltfndtop ul li {
            position: relative;
            background: #fdfdfd;
            height: 22px;
            line-height: 22px;
            border: 1px solid #ff2825;
            border-radius: 4px;
            color: #ff2825;
            font-size: 12px;
            padding: 0 16px 0 8px;
            margin-right: 15px;
          }

          .spcrsltfndtop ul li:after {
            content: "X";
            background: #ff2825;
            width: 13px;
            height: 13px;
            border-radius: 100%;
            position: absolute;
            text-align: center;
            color: #fff;
            display: flex;
            top: 3px;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            line-height: 13px;
            right: -6px;
          }

          .dimsprite {
            background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/dimsprite.png")
              0 0 no-repeat;
            display: inline-block;
          }

          .dimsprite.andrdicn {
            flex-shrink: 0;
            width: 12px;
            height: 14px;
            background-position: -27px 0px;
            position: relative;
            top: 2px;
            margin-right: 7px;
          }

          .andrd svg{
            flex-shrink: 0;
            width: 12px;
            height: 14px;
            background-position: -27px 0px;
            position: relative;
            top: 2px;
            margin-right: 7px;
          }
          .andrd {
            // text-align: center;
            font-size: 12px;
            color: #001d42;
            font-weight: bold;
            display: flex;
          }

          .phnprc {
            flex-shrink: 0;
            color: #0076db;
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
            margin-right: 20px;
          }

          .phnrlsdt {
            font-size: 12px;
            color: #212121;
            line-height: 18px;
          }

          .phnrlsdt span {
            display: block;
            color: #646464;
          }

          .phnresultbox {
            background: #ffffff;
            box-shadow: 0px 2px 4px #00000029;
            border: 1px solid #d8d8d8;
            border-top: 4px solid #001d42;
            padding: 16px 16px 0 16px;
            margin: 15px 15px 20px 15px;
          }

          .phnfourbx {
            margin: 15px 0;
            display: flex;
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

          .phnresultbox .phnfourbx li .icnhd span {
            opacity: 0.5;
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

          .phnresultboxphn {
          }

          .phnresultboxphn figure {
            flex-shrink: 0;
            margin-right: 15px;
            width: 38px;
          }

          .phnresultboxphn figure img {
            width: 100%;
          }

          .phnresultboxphntxt {
            width: 100%;
          }

          .phnresultboxphntxt h2,
          .phnresultboxphntxt h3 {
            color: #001d42;
            font-size: 18px;
            line-height: 20px;
          }

          .tpbtmmrgn {
            margin: 8px 0;
          }

          .phnflspcfcn {
            background: #f6f7f7;
            height: 38px;
            line-height: 38px;
            font-size: 14px;
            font-weight: bold;
            color: #e1261d;
            text-align: center;
            display: block;
            border: 1px solid #f7f7f7;
            margin: 0 -15px;
          }

          .phnnxtprvbtn {
            background: #f6f7f7;
            padding: 6px 0;
            border: 1px solid #f7f7f7;
            margin-bottom: 30px;
          }

          .phnnxtprvbtn a {
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 2px solid #e1261c;
            border-radius: 20px;
            width: 80px;
            text-align: center;
            color: #e1261c;
            font-size: 13px;
            font-weight: bold;
            height: 36px;
            line-height: 34px;
            margin: 0 5px;
          }

          .phnnxtprvbtn a.dsbld {
            filter: grayscale(1);
            opacity: 0.4;
          }

          .vsp60 {
            margin-top: 60px;
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
          .notFound {
            text-align: center;
            // height: 40px;
            font-size: 17px;
            color: black;
            margin: 10px 0px;
          }

          // .dropbtn {
          //   width: 100px;
          //   // background-color: red;
          //   color: red;
          //   padding: 10px;
          //   font-size: 16px;
          //   border: none;
          //   cursor: pointer;
          //   // border: 0.1px solid black;
          //   border-radius: 20px;
          //   box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
          // }

          .dropbtn {
            width: 110px;
            height: 28px;
            background: #ffffff;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            margin-bottom: 10px;
            text-transform: uppercase;
            font-size: 14px;
            line-height: 28px;
            color: red;
          }

          .dropbtn:before {
            content: "";
            width: 15px;
            height: 18px;
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/dimsprite_1650355544.png) -104px -33px
              no-repeat;
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            margin-left: 6px;
          }

          .sortDropdown {
            margin: 0px 15px;
            position: relative;
            display: inline-block;
          }

          // .dropdown-cont {
          //   margin-top: 2px;
          //   // display: none;
          //   position: absolute;
          //   background-color: #f9f9f9;
          //   min-width: 160px;
          //   box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          //   z-index: 5;
          //   font-size: 14px;
          //   right: 0px;
          // }


          .dropdown-cont{
position: absolute;
    background-color: #fff;
    z-index: 5;
    font-size: 14px;
    right: 0px;
    border: 1px solid #D9D9D9;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 0 0 4px 4px;
    top: 25px;
    left: 0px;
          }

          .dropdown-cont .filterOptions {
            justify-content: space-between;
            color: black;
            padding: 4px 6px 4px 10px;
            text-decoration: none;
            display: flex;
            align-items: center;
            font-size: 14px;
            border-bottom: 1px solid #D9D9D9;

          }




          .upArrow:hover,
          .downArrow:hover {
            cursor: pointer;
          }

          .sortSearch {
            display: flex;
          }

          .dropdownIcon {
            // background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/social_sprite_img_1631086597.svg) no-repeat;
            display: inline-block;
            vertical-align: top;
          }

          .dropdownIcon {
            // background-position: -67px -2px;
            width: 12px;
            height: 15px;
            position: absolute;
            top: 3px;
            right: 6px;
          }

          .upArrow {
            // margin-right: 7px;
            width: 15px;
            color: #707070;
            height : 15px;
            position :relative;
            top: -2px;
          }

          .downArrow {
            width: 15px;
            height : 15px;
            color: #707070;
            position :relative;
            top: -2px;
          }
          .arrows {
            display: flex;
            align-items: center;

          }

          // .livenow_btn {
          //   // position: absolute;
          //   // background: #ED1C24;
          //   color: #fff;
          //   border-radius: 2px;
          //   font-size: 11px;
          //   text-transform: uppercase;
          //   // right: 10px;
          //   // top: 10px;
          //   padding: 3px 7px 3px 23px;
          //   font-weight: bold;
          //   // margin-right: 5px;
          //   position: relative;
          // }
          // .livenow_btn:after,
          // .livenow_btn:before {
          //   content: "";
          //   position: absolute;
          //   opacity: 0;
          //   box-sizing: border-box;
          //   top: 3px;
          //   left: 6px;
          //   width: 12px;
          //   height: 12px;
          //   border: 2px solid #fff;
          //   box-shadow: 0 0 10px green, inset 0 0 10px green;
          //   border-radius: 100px;
          //   background-clip: padding-box;
          // }
          // .livenow_btn:before {
          //   z-index: 2;
          //   -webkit-animation: blinker 2s infinite;
          //   animation: blinker 2s infinite;
          // }

          // .livenow_btn:after {
          //   z-index: 1;
          //   -webkit-animation: blinker 2s infinite 1s;
          //   animation: blinker 2s infinite 1s;
          // }
          // @keyframes blinker {
          //   0% {
          //     -webkit-transform: scale(0);
          //     opacity: 0;
          //   }
          //   50% {
          //     opacity: 1;
          //   }
          //   to {
          //     -webkit-transform: scale(1);
          //     opacity: 0;
          //   }
          // }

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

          // .activeEle {
          //   background: #d7dbdb;
          // }

          .flspcfnbtn {
            background: #f6f7f7;
            padding: 10px 0;
            display: flex;
            justify-content: center;
            margin: 0px -15px;
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

          .spriteshare {
            background: url(/images/siteimages/sprite_img_fornewarticle_1636363070.svg)
              0 0 no-repeat;
            width: 40px;
            height: 40px;
            display: block;
            
          }

          .whatIcon{
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 4px 0px 0px 4px;
            position: fixed;
            right: 0;
            top: 136px;
            z-index: 9;
            overflow: hidden;
          }

          .spriteshare.art-whatsapp-icon {
            background-position: 0px -150px;
          }
        `}
      </style>
    </div>
  );
}
