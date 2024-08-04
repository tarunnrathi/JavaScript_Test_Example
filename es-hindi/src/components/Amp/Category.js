import React from "react";
import dynamic from "next/dynamic";

import Head from "next/head";
// import useLoadMore from "hooks/useLoadMore";
import categoryHelper from "includes/category.helper";

const SubMenus = dynamic(() => import("components/Common/SubMenus"));
const BreadcrumbCommon = dynamic(() =>
  import("widgets/Common/Responsive/BreadcrumbCommon"),
);
const TopPriorityAmp = dynamic(() =>
  import("widgets/Common/Amp/TopPriorityAmp"),
);

const SheherChuneCommon = dynamic(() =>
  import("widgets/Common/Responsive/ShehrChuneCommon"),
);

const NewsListingCommon = dynamic(() =>
  import("widgets/Common/Amp/Category/NewsListingAmp"),
);

// const CategoryPageTempOne = dynamic(() =>
//   import("widgets/Common/Amp/Category/CategoryPageAmpTempOne")
// );
// const StateLandingCommonPage = dynamic(() =>
//   import("widgets/Common/Responsive/StatelandingPageCommon")
// );

const Category = (props) => {
  const {
    // _pageParam = {},
    // topStories,
    // dataLength,
    // photoStories,
    topPriorityData,
    sliderFlag = false,
    // pageAds,
    // astroStories = [],
    titleDiv,
    // breadCrumbArray = [],
    categoryStoriesList,
    // isBusinessPage,
    // isCategoryMobilePage,
    categoryName,
    // isMobile,
    // currentUrl,
    breadCrumbArray,
  } = props.data;  

  const {
    isStatePage = false,
    curr_page_no: page = 0,
    category: sectionname = "",
    subCategory: sub_section,
    // allStates,
    // pageLimit,
    // query_arr,
    // hi_category,
    get_section,
  } = props.data._pageParam;

  // const noContent = page > 30 ? false : true;
  const pageNum = page - 1;
  const newcategoryName = categoryName.replace('&AMP;', '&');

  // let state_landing_temp,
  //   entertainment_page_temp = false;
  //   category_listing_temp = false;
  // let entertainment_page_temp = false;

  let subMenuContentData;
  const subMenuArray =
    sectionname && sub_section !== ""
      ? categoryHelper.getCategoryTopSliderAndBottomBoxList(sub_section)
      : categoryHelper.getCategoryTopSliderAndBottomBoxList(sectionname);

  subMenuContentData =
    subMenuArray !== undefined ? subMenuArray.bottomListing : [];
  subMenuContentData =
    subMenuContentData !== undefined ? subMenuContentData : [];

  if (subMenuContentData.length > 0) {
    if (
      (sectionname === "states" ||
        sectionname === "lifestyle" ||
        sectionname === "world") &&
      pageNum < 1 &&
      !sub_section
    ) {
      // state_landing_temp = true;
    } else {
      // entertainment_page_temp = true;
    }
  } else {
    // category_listing_temp = true;
  }

  // // const { loadMore, categoryData } = useLoadMore(
  // //   categoryStoriesList,
  // //   pageLimit,
  // //   dataLength,
  // //   query_arr,
  // //   false,
  // //   page,
  // // );

  return (
    <>
      <Head>
        <meta name="robots" content="max-image-preview:large" />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async src="https://cdn.ampproject.org/v0/validator.js"></script>
      </Head>
      <div className="newcontainer">
        <div className="newleftwrap">
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
          <div className="clearfix vsp10"></div>

          <div className="hd_heading">
            {titleDiv ? (
              <div dangerouslySetInnerHTML={{ __html: titleDiv }}></div>
              ) : (
              <h2>{newcategoryName}</h2>
            )}
            {isStatePage ? <SheherChuneCommon withBg={false} /> : ""}
          </div>

          {page <= 1 && (
            <SubMenus
              isAmp={true}
              getSectionName={get_section.name}
              category={sectionname}
              subCategory={sub_section}
            />
          )}

          {topPriorityData && page < 2 ? (
            <TopPriorityAmp
              initialData={topPriorityData}
              sliderFlag={sliderFlag}
              isMobile={true}
            />
          ) : (
            ""
          )}

          {/* {page <= 1 && entertainment_page_temp ? (
            <div className="moretrndstroy-secion stripes">
              <div>
                <a href={"/" + _pageParam.query + "page-2"}>
                  <span className="moretrndstroy">और भी पढ़ें</span>
                </a>
              </div>
            </div>
          ) : (
            ""
          )} */}

          <NewsListingCommon
            initialData={categoryStoriesList}
            isMobile={true}
          />
          <div className="clearfix"></div>
          <div className="vsp10"></div>

          {/* <button type="button" onClick={loadMore} className="load_more">
            Load More
          </button> */}

          <div className="vsp10"></div>

          <div className="t-height">
            <amp-embed
              width="100"
              height="100"
              type="taboola"
              data-loading-strategy="prefer-viewability-over-views"
              data-lazy-fetch="true"
              layout="responsive"
              data-publisher="network18media-news18hindi"
              data-mode="thumbnails-a"
              data-placement="Below Section Thumbnails AMP"
              data-target_type="mix"
              data-category="auto"
              data-url=""
            ></amp-embed>
          </div>
        </div>
      </div>
      {/* {categoryStoriesList.length > 18 && subMenuContentData.length <= 0 ? (
        <button type="button" onClick={loadMore} className="load_more">
          Load More
        </button>
      ) : page > 1 && categoryStoriesList.length > 18 ? (
        <button type="button" onClick={loadMore} className="load_more">
          Load More
        </button>
      ) : (
        ""
      )} */}

      {/* <section className="photo_cont">
        <SubMenus
          isAmp={true}
          getSectionName={get_section.name}
          category={sectionname}
          subCategory={sub_section}
        />
        <div class="tpnews clearfix">
          <div class="pgtbox">
            {category_top && noContent ? (
              <CategoryTopPage data={props.data} currentUrl={currentUrl} />
            ) : (
              ""
            )}

            {category_general && noContent ? (
              <CategoryGeneralPage data={props.data} />
            ) : (
              ""
            )}
          </div>
        </div>
        {noContent ? "" : <p> No stories found matching this criteria</p>}
        <div className="vsp10"></div>

        <div className="t-height">
          <amp-embed
            width="100"
            height="100"
            type="taboola"
            data-loading-strategy="prefer-viewability-over-views"
            data-lazy-fetch="true"
            layout="responsive"
            data-publisher="network18media-news18hindi"
            data-mode="thumbnails-a"
            data-placement="Below Section Thumbnails AMP"
            data-target_type="mix"
            data-category="auto"
            data-url=""
          ></amp-embed>
        </div>
      </section> */}
      <style global jsx>{`
        body {
          -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
          -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
          -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
          animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        }
        @-webkit-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @-moz-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @-ms-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        .t-height {
          min-height: 1000px;
        }
        .add {
          background: #dbdde3;
        }
        .add,
        .add2 {
          background: #dbdde3;
          position: relative;
          padding: 16px 0;
          line-height: 0;
          text-align: center;
          z-index: 1;
          margin-bottom: 20px;
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
        div.addinner_box_300x250 {
          height: 268px;
          width: 300px;
        }
        .addinner-box {
          background: #e8e9ed;
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: auto;
          padding: 0;
          box-sizing: border-box;
        }
        .addinner-box span {
          color: #797e90;
          font-size: 11px;
          text-align: center;
          padding: 2px 0 0;
          display: block;
          line-height: 16px;
        }
        .container-ad {
          width: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
        .align {
          text-align: center;
        }

        @-o-keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @keyframes -amp-start {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
        a {
          text-decoration: none;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family:
            "Noto Sans Tamil",
            arial,
            halvetica sans-serif;
        }

        footer {
          display: block;
          margin: 0;
          padding: 0;
        }
        footer {
          background: #000;
          font-size: 12px;
          padding: 10px 0;
          text-align: center;
          color: #fff;
        }
        footer a {
          display: block;
          color: #fff;
          padding-top: 10px;
          border-top: 1px solid #fff;
          margin-top: 10px;
        }

        .select-language-head {
          background: url(https://images.news18.com/ibnkhabar/uploads/2018/07/navlngbg.png)
            98% 1px no-repeat #ededed;
          padding: 16px;
          position: relative;
          border-bottom: 1px solid #9b9b9b;
          background-size: 149px;
          height: 100px;
        }
        .select-language-head h3 {
          font-size: 10px;
          color: #000;
          margin-top: 2px;
          margin-bottom: 3px;
          font-weight: normal;
        }
        .select-language-head a {
          display: block;
        }
        .homeurl {
          color: #ed1c24;
          font-weight: 700;
          font-size: 18px;
        }
        .select-language {
          background: transparent;
          border: none;
          color: #7e8186;
          font-size: 12px;
          position: relative;
          padding: 0;
          display: block;
        }
        amp-sidebar input[type="checkbox"] {
          position: absolute;
          visibility: hidden;
        }
        amp-sidebar input:checked + .submenu {
          -webkit-transform: translateX(0);
          transform: translateX(0);
          overflow-y: auto;
          z-index: 1;
        }
        .select-language:focus {
          outline: none;
        }
        .select-language:after {
          content: "";
          width: 5px;
          height: 5px;
          border-top: 2px solid #ed1c24;
          border-left: 2px solid #ed1c24;
          display: inline-block;
          transform: rotate(-135deg);
          position: relative;
          top: -2px;
          left: 6px;
        }
        .menu-list {
          margin: 0;
          padding: 0;
          height: calc(100% - 100px);
          overflow-y: auto;
        }

        .vodeoiconb {
          background: url(/images/siteimages/video-iconnew.png)
            no-repeat;
          height: 45px;
          width: 44px;
          position: absolute;
          left: 6px;
          top: 6px;
          z-index: 99;
        }

        .photo_icon_s {
          background: url(https://images.news18.com/ibnkhabar/uploads/2018/01/photoS.png)
            no-repeat;
          position: absolute;
          width: 35px;
          height: 35px;
          left: 6px;
          top: 6px;
          z-index: 99;
        }

        /*.tgsrch-nav{display:none;}*/
        .show {
          display: block;
        }
        .hide {
          display: none;
        }
        [class*=" icon-"],
        [class^="icon-"] {
          position: relative;
          top: -3px;
        }

        /*Styles for the flex layout based tabs*/
        amp-selector[role="tablist"].tabs-with-flex {
          display: flex;
          flex-wrap: wrap;
        }
        amp-selector[role="tablist"].tabs-with-flex [role="tab"] {
          flex-grow: 1;
          text-align: center;
          padding: var(--space-1);
        }
        amp-selector[role="tablist"].tabs-with-flex [role="tab"][selected] {
          outline: none;
          border-bottom: 1px solid #a62121;
          color: #a62121;
          font-weight: bold;
        }
        amp-selector[role="tablist"].tabs-with-flex [role="tabpanel"] {
          display: none;
          width: 100%;
          order: 1;
        }
        amp-selector[role="tablist"].tabs-with-flex
          [role="tab"][selected]
          + [role="tabpanel"] {
          display: block;
        }
        amp-selector[role="tablist"].tabs-with-selector {
          display: flex;
        }
        amp-selector[role="tablist"].tabs-with-selector [role="tab"][selected] {
          outline: none;
          border-bottom: 2px solid #828282;
        }
        amp-selector[role="tablist"].tabs-with-selector
          [role="tab"][selected]
          a {
          color: #828282;
          font-weight: bold;
        }
        amp-selector[role="tablist"].tabs-with-selector {
          display: flex;
        }
        amp-selector[role="tablist"].tabs-with-selector [role="tab"] {
          text-align: center;
        }
        amp-selector.tabpanels [role="tabpanel"] {
          display: none;
        }
        amp-selector.tabpanels [role="tabpanel"][selected] {
          outline: none;
          display: block;
          padding: 10px;
        }

        .photoicon:after {
          background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/photo-iconnew.png)
            no-repeat;
        }
        .videoicon:after {
          background: url(/images/siteimages/video-iconnew.png)
            no-repeat;
        }
        .add {
          padding: 10px 0;
          width: 100%;
          background: #dbdde3;
          height: 300px;
        }

        .slick-list {
          overflow: scroll;
        }

        /* ============================= New css adeed here  =========================================== */
        .hd_heading,
        .hd_heading h2 {
          line-height: 44px;
          color: #001d42;
          font-size: 30px;
          font-weight: 700;
        }
        .hd_heading {
          margin: 6px 0;
          display: block;
          width: 100%;
          background: #fff;
          position: relative;
        }
        .hd_heading h1 {
          font-weight: 700;
          font-size: 20px;
          display: inline-block;
        }
        .hd_heading .newchoosecitywrap {
          position: absolute;
          right: 0;
          top: 0;
        }
        .newchoosecitywrap {
          position: relative;
          z-index: 1;
        }
        .newchoosecitywrap:hover .newchoosecitybtn {
          border-radius: 4px;
          background: #ec2027;
        }
        .newchoosecitywrap:hover .newhdrlnghover {
          display: block;
          border-color: #e1271c;
          left: 0;
          right: 0;
          background: #fff;
        }
        .newhdrlnghover div {
          height: 190px;
          overflow: auto;
          width: 111%;
        }
        .newchoosecitybtn {
          width: 120px;
          height: 28px;
          line-height: 28px;
          color: #ffffff;
          font-size: 13px;
          font-weight: bold;
          background: #ec2027;
          box-shadow: 0px 2px 4px #00000029;
          border: 1px solid #e1271c;
          border-radius: 14px;
          display: block;
          padding: 0 12px 0 33px;
          position: relative;
        }
        .newchoosecitybtn.whtbtn {
          background-color: #fff;
          color: #ec2027;
        }
        .newchoosecitybtn.whtbtn:before {
          content: "";
          filter: none;
        }
        .newchoosecitybtn.whtbtn:after {
          content: "";
          filter: none;
        }
        .newchoosecitywrap:hover .newchoosecitybtn.whtbtn {
          background-color: #fff;
        }
        .newchoosecitybtn:before {
          content: "";
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/path110_1688556945.png);
          width: 20px;
          height: 14px;
          background-repeat: no-repeat;
          vertical-align: bottom;
          position: absolute;
          left: 12px;
          top: 7px;
          filter: brightness(0) invert(1);
        }
        .newchoosecitybtn:after {
          content: "";
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/path45_1688556893.png);
          width: 20px;
          height: 20px;
          display: inline-block;
          background-repeat: no-repeat;
          vertical-align: middle;
          position: absolute;
          right: 0;
          top: 6px;
          filter: brightness(0) invert(1);
        }
        .newchoosecitybtn .newiconsprite.choosebtn {
          top: 4px;
          left: 10px;
        }
        .newhdrlnghover {
          position: absolute;
          overflow: hidden;
          background: #fff;
          top: 26px;
          left: -1px;
          box-shadow: 0px 2px 4px #0000001a;
          border: 1px solid #c4c4c4;
          border-radius: 0 0 4px 4px;
          display: none;
          right: -1px;
          border-top: none;
        }
        .newhdrlnghover a {
          font-size: 13px;
          margin: 5px 0;
          font-weight: normal;
          padding: 0 8px;
          color: #6a6a6a;
          display: block;
        }
        .newhdrlnghover a:hover {
          background: #ec2027;
          color: #fff;
        }
        .newhdrlng:hover .newhdrlnghover {
          display: block;
        }
        @media (max-width: 768px) {
          .hd_heading h2 {
            font-size: 24px;
            line-height: 32px;
            width: 65%;
          }
          .hd_heading .newchoosecitywrap {
            top: 4px;
          }
          .newchoosecitybtn.topwig {
            color: #e1271c;
            font-weight: bold;
            box-sizing: border-box;
            background-color: #fff;
            box-shadow: none;
            border-radius: 8px 8px 0px 0px;
            border-bottom: 2px solid #ee1c25;
            cursor: pointer;
            width: 80px;
            height: 24px;
            font-size: 13px;
            padding: 0 17px;
            line-height: 23px;
            border-top: 0;
            border-left: 0;
            border-right: 0;
          }
          .newchoosecitywrap:hover .newchoosecitybtn.topwig {
            border-radius: 0;
            background: #ffffff;
          }
          .newchoosecitybtn.topwig:before {
            filter: unset;
            left: 5px;
            background-size: 8px;
          }
          .newchoosecitybtn.topwig:after {
            filter: unset;
            height: 10px;
            right: 5px;
            background-size: 6px;
            width: 6px;
          }
        }

        /* adhik padhe css */
        .moretrndstroy-secion {
          text-align: center;
          position: relative;
          position: relative;
          height: 26px;
          display: block;
          margin: 5px 0;
          background: transparent;
          padding: 4px 0 2px 0;
        }
        .moretrndstroy-secion div {
          width: 120px;
          margin: 0 auto;
          background-color: #ffffff;
          display: block;
          z-index: 11;
          position: relative;
        }
        .moretrndstroy-secion:before,
        .moretrndstroy-secion:after {
          display: block;
          position: absolute;
          bottom: -2px;
          content: "";
          width: 100%;
          right: 0;
          left: 0;
        }
        .moretrndstroy-secion:before {
          border: 1px dotted #939393;
          top: 0;
          margin: 4px 0;
          height: 4px;
          border-right: 0;
          border-left: 0;
        }
        .moretrndstroy-secion:after {
          height: 5px;
          margin: 5px 0;
          border: 1px dotted #939393;
          border-right: 0;
          border-left: 0;
        }
        .moretrndstroy {
          color: #e1261d;
          font-weight: bold;
          font-size: 14px;
          line-height: 20px;
          background-color: #ffffff;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #e2332b;
          border-radius: 16px;
          z-index: 11;
          padding: 5px 20px 4px;
        }
        /* adhik padhe css */
        .video-slide-in ul li:nth-child(1) a figure:before {
          transform: scale(1.7);
        }
        .video-slide-in ul li a figure:before {
          content: "";
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Video_1688556982.png);
          width: 30px;
          height: 30px;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          background-size: 100%;
          z-index: 11;
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
          margin: auto;
          cursor: pointer;
        }

        .newcontainer {
          max-width: 1244px;
          margin: auto;
          background-color: #fff;
          padding: 0 10px;
        }
        .newleftwrap {
          width: calc(100% - 325px);
          float: left;
          position: relative;
          padding: 15px 0;
        }
        .newrightwrap {
          width: 300px;
          float: right;
          padding: 15px 0;
        }
        @media (max-width: 768px) {
          .newrightwrap {
            display: none;
          }
          .newleftwrap {
            width: 100%;
          }
        }
        .newglblhdwrap {
          border-bottom: 1px solid #d9d9d9;
          position: relative;
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .newglblhdwrap:before {
          content: "";
          background: #ed1c24;
          width: 25px;
          height: 4px;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .newglblhdwrap .newglblhd,
        .newglblhdwrap .newglblhd a {
          font-size: 20px;
          line-height: 38px;
          color: #000;
          font-weight: bold;
          display: flex;
          align-items: end;
        }
        .newglblhdwrap .newglblhd span,
        .newglblhdwrap .newglblhd a span {
          color: #ed1c24;
          margin-right: 5px;
        }
        .newglblhdwrap .newglblhd em,
        .newglblhdwrap .newglblhd a em {
          color: #868686;
          font-weight: normal;
          text-transform: uppercase;
          font-style: normal;
          font-size: 12px;
          position: relative;
          top: 2px;
          margin-left: 10px;
        }
        .newglblhdwrap.newsml .newglblhd,
        .newglblhdwrap.newsml .newglblhd a {
          font-size: 18px;
          line-height: 34px;
        }

        .glbl-insdnav,
        .tabnav {
          justify-content: flex-start;
        }
        .glbl-insdnav {
          position: relative;
          clear: both;
          height: 38px;
        }
        .glbl-insdnav.hdr-lifestyle .insdnav-hd {
          background: #a621a6;
        }
        .glbl-insdnav.hdr-photos .insdnav-hd {
          background: #828282;
        }
        .glbl-insdnav.hdr-states .insdnav-hd {
          background: #a64d21;
        }
        .glbl-insdnav.hdr-videos .insdnav-hd {
          background: #a62121;
        }
        .glbl-insdnav.hdr-sports .insdnav-hd {
          background: #37a621;
        }
        .glbl-insdnav .insdnav-hd {
          height: 38px;
          line-height: 38px;
          display: block;
          padding: 0 16px;
          margin-right: 16px;
          font-size: 12px;
          color: #fff;
          font-weight: 700;
          float: left;
          position: relative;
        }
        .glbl-insdnav .insdnav-hd a {
          color: #fff;
        }
        .glbl-insdnav.hdr-business .insdnav-hd {
          background: #2163a6;
        }
        .glbl-insdnav .insdnav {
          overflow: scroll;
          display: flex;
          justify-content: flex-start;
        }
        .glbl-insdnav .insdnav li {
          flex-shrink: 0;
        }
        .glbl-insdnav .insdnav li a {
          height: 36px;
          line-height: 35px;
          display: block;
          padding: 0 4px;
          margin: 0 4px;
          font-size: 14px;
          color: #757575;
        }
        a:hover {
          color: #ec2027;
        }
        .categry {
          font-size: 13px;
          color: #ec2027;
          line-height: 26px;
          font-weight: 700;
        }

        /* if photo and video icon */

        .newbottomsectionlist li.ifvideo a figure:before {
          position: absolute;
          top: 50%;
          left: 50%;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Video_1688556982.png)
            0 0 no-repeat;
          background-size: 38px;
          width: 50px;
          height: 50px;
          margin: -16px 0 0 -16px;
          content: "";
          background-size: 32px;
          transform: scale(0.8);
          z-index: 1;
        }
        .newbottomsectionlist li.ifphoto a figure:before {
          content: "";
          position: absolute;
          background: #ed2129
            url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Group_993_1688556819.png)
            0 0 no-repeat;
          background-size: 32px;
          height: 26px;
          border: 1px solid #fff;
          border-right: none;
          border-radius: 3px 0 0 3px;
          bottom: 5px;
          right: 0;
          width: 30px;
          z-index: 1;
        }

        .categry {
          font-size: 13px;
          color: #ec2027;
          line-height: 26px;
          font-weight: 700;
        }
      `}</style>
    </>
  );
};

export default Category;
