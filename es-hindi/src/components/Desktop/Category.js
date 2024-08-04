import React from "react";
import getConfig from "next/config";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import { TaboolaList } from "includes/Tabola.helper";
import dynamic from "next/dynamic";
import categoryHelper from "includes/category.helper";
import useLoadMore from "hooks/useLoadMore";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import WebstoryCSR from "widgets/Common/Responsive/WebstoryCSR";
import Head from "next/head";
// import NewsListing from "widgets/Desktop/category/NewsListing";

const BreadcrumbCommon = dynamic(() =>
import("widgets/Common/Responsive/BreadcrumbCommon")
);
const SheherChuneCommon = dynamic(() =>
import("widgets/Common/Responsive/ShehrChuneCommon")
);
const PetrolDieselPriceWidget = dynamic(() =>
 import("widgets/Common/Responsive/PetrolDieselPriceWidget")
);

const TopPriorityCommon = dynamic(() =>
  import("widgets/Common/Responsive/TopPriorityCommon")
);
const NewsListingCommon = dynamic(() =>
  import("widgets/Common/Responsive/NewsListingCommon")
);
const CategoryPageTempOne = dynamic(() =>
  import("widgets/Common/Responsive/CategoryPageTempOne")
);
const StateLandingCommonPage = dynamic(() =>
  import("widgets/Common/Responsive/StatelandingPageCommon")
);

const RhsCommon = dynamic(() => import("widgets/Common/Desktop/RhsCommon"));
const Taboola = dynamic(() => import("widgets/Common/Responsive/Taboola"));

const Category = ({ data = {}, pageAds }) => {
  const {
    _pageParam = {},
    breadCrumbArray = [],
    // mainCat,
    titleDiv,
    topPriorityData = "",
    sliderFlag = false,
    astroStories = [],
    categoryStoriesList = [],
    dataLength,
    photoStories,
    topStories,
    datedAstroData,
    // latestNewsStories,
    isStatePage = false,
    categoryName,
    pcategory,
    isMobile,
    isEntPage,
    isBusinessPage,
    // top_trending_articles,
    // top_trending_articles_with_category,
    short_news_rhs 
  } = data;
  const {
    query,
    hi_category,
    category: sectionname = "",
    subCategory: sub_section,
    // allStates = [],
    curr_page_no: page = 0,
    pageLimit,
  } = _pageParam;
  const { publicRuntimeConfig } = getConfig();
  // current url
  const outBrainUrl = publicRuntimeConfig.siteUrl + query;
  const noContent = page > 30 ? false : true;
  let query_arr = pcategory === "news" ? {}: { "categories.slug": pcategory };
  const topPriorityDataIds = [
    ...(topPriorityData.leftCat || []),
    ...(topPriorityData.rightCat || []),
    ...(categoryStoriesList || [])
  ]?.map((item) => item.story_id);
  
  const { loadMore, categoryData , hasMoreData } = useLoadMore(
    categoryStoriesList,
    pageLimit,
    dataLength,
    query_arr,
    page,
    "category",
    topPriorityDataIds
  );

  const pageNum = page - 1;
  // const selectState = () => {
  //   const selectStateBtn = document.querySelector(".chsstctbtn");
  //   if (selectStateBtn) {
  //     selectStateBtn.click();
  //   }
  // };
  let state_landing_temp,
    entertainment_page_temp = true;

  let subMenuContentData;
  const subMenuArray = categoryHelper.getCategoryTopSliderAndBottomBoxList(sectionname);
  subMenuContentData = subMenuArray
    ? [
        {
          slug: `/news/${sectionname}/`,
          sectionName: sectionname,
          name: (hi_category || ""),
          type: "box",
        },
        ...(subMenuArray?.topSliderUrl?.length > 0 ? subMenuArray.topSliderUrl : (subMenuArray.bottomListing || [])),
      ]
    : [];
  subMenuContentData = subMenuContentData ? subMenuContentData : [];

  if (subMenuContentData.length > 0) {
    if (
      (sectionname === "states" ||
        sectionname === "lifestyle" ||
        sectionname === "world") &&
      pageNum < 1 &&
      !sub_section
    ) {
      state_landing_temp = true;
    } else {
      entertainment_page_temp = true;
    }
  } else {
    // category_listing_temp = true;
  }


  const subMenuContent = () => {
    return subMenuContentData.length > 1 ? (
      <div className="quicklinks">
        <ul className="insdnav">
          {subMenuContentData.map(
            (topNews, key) =>
              topNews !== null && (
                <li
                  key={key}
                  className={
                    topNews.sectionName ===
                    (sub_section ? sub_section : sectionname)
                      ? "active lp_local18_select_district"
                      : "lp_local18_select_district"
                  }
                >
                  <a href={topNews.slug} className="lp_local18_select_district">
                    {topNews.name}
                  </a>
                </li>
              )
          )}
        </ul>
      </div>
    ) : (
      ""
    );
  };
  let newcategoryName = categoryName.replace("&AMP;", "&");

  const stateData = {
    slug: sectionname || "",
    label: newcategoryName || ""
  }
  return (
    <>
    <Head>
      {/* {sectionname === "entertainment" && (
        <script async type="text/javascript">{`
        setTimeout(() => {
        (function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "kxxjg01c8x");
      }, 3000);
        `}</script>
      )} */}
    
    </Head>
      <div className="newcontainer clearfix">
        <div className="newleftwrap">
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
          <div className="hd_heading">
            {titleDiv ? (
              <div dangerouslySetInnerHTML={{ __html: titleDiv }}></div>
              ) : (
              <h2>{newcategoryName.replace("&amp;",'&')}</h2>
            )}
            {isStatePage && sectionname !== "states" && (
              <SheherChuneCommon stateData={stateData} />
            )}
          </div>

          {page <= 1 &&
            subMenuContentData   &&
            subMenuContent()}

          {/* Top story section start here */}
          {topPriorityData && page < 2 ? (
            <TopPriorityCommon
              initialData={topPriorityData}
              sliderFlag={sliderFlag}
              isMobile={isMobile}
            />
          ) : (
            ""
          )}

          {page < 2 && (
            <div>
              <div className="clearfix"></div>
              <div className="middlead cat-vigyapan">
                {/* <SiteAd
                  width={728}
                  height={90}
                  slotId={"Desktop_Static_Ad_2"}
                  adUnit={pageAds.BTF_728}
                  sizes={[
                    [728, 90],
                    [1, 1],
                  ]}
                  loadonScroll={true}
                ></SiteAd> */}
                <NewSiteAd
                  slotId={"Desktop_Static_Ad_2"}
                  adUnit={pageAds.BTF_728}
                  sizes={[
                    [728, 90],
                    [1, 1],
                  ]}
                  width={728}
                  height={90}
                  loadOnScroll={true}
                />
              </div>
            </div>
          )}
          {isStatePage ? <PetrolDieselPriceWidget city={sectionname} /> : (sub_section && !isBusinessPage && !isEntPage) ? <PetrolDieselPriceWidget city={sub_section} /> : "" }
          <div className="blog_list">
          <NewsListingCommon initialData={categoryData} isMobile={false} />
          </div>
          {hasMoreData && (
            <button type="button" onClick={loadMore} className="load_more">
              Load More
            </button>
          )}
          <CategoryPageTempOne data={data} />
          {/*

          Bottom Story Listing Temp Wise

          */}
            {(sectionname && !sub_section && ((state_landing_temp || entertainment_page_temp) && (page <= 1))) ?  <WebstoryCSR section={sectionname} filter={ { categories: sectionname }}/> : ""}
          {page <= 1 && state_landing_temp ? (<>
            <StateLandingCommonPage data={data} />
            </>
          ) : page <= 1 && entertainment_page_temp ? (<>
            </>
          ) : (
            <><NewsListingCommon initialData={categoryData} isMobile={isMobile} />
          </>)}

          {/* Blog list section end here */}
          <div className="clearfix"></div>
          <div className="vsp10"></div>

          {(sectionname && !sub_section) && (!(state_landing_temp || entertainment_page_temp)) ?  <WebstoryCSR section={sectionname} filter={ { categories: sectionname }}/> : ""}
          <Taboola
            mode={TaboolaList.category.bottom.mode}
            id={TaboolaList.category.bottom.id}
            container={TaboolaList.category.bottom.container}
            placement={TaboolaList.category.bottom.placement}
          />
          <div className="vsp10"></div>
          <div className="clearfix"></div>
          {/* </div> */}

          {noContent ? "" : <p> No stories found matching this criteria</p>}
        </div>

        <div className="newrightwrap">
          <RhsCommon
            pageAds={data.pageAds}
            currentURL={outBrainUrl}
            photoStories={photoStories}
            topStories={topStories}
            astroStories={astroStories}
            section="categorynews"
            isStatePage={isStatePage}
            panchangData={datedAstroData}
            noContent={noContent}
            taboolaList={TaboolaList.category}
            // top_trending_articles ={top_trending_articles}
            // top_trending_articles_with_category={top_trending_articles_with_category}
            short_news_rhs={short_news_rhs}
            categoryName={categoryName||""}
            page="category"
            pageParam={_pageParam}
          />
        </div>

        {/* {mainCat !== "photogallery" ? (
          <div className="rightwrap">
            <RhsCommon
              pageAds={data.pageAds}
              currentURL={outBrainUrl}
              photoStories={photoStories}
              topStories={topStories}
              astroStories={astroStories}
              section="categorynews"
              isStatePage={isStatePage}
              panchangData={datedAstroData}
              category_top={category_top}
              noContent={noContent}
              taboolaList={TaboolaList.category}
            />
          </div>
        ) : (
          <div className="rightwrap">
            <RhsCommon
              pageAds={data.pageAds}
              currentURL={outBrainUrl}
              latestNewsStories={latestNewsStories}
              topStories={topStories}
              astroStories={astroStories}
              section="latestnews"
              taboolaList={TaboolaList.category}
            />
          </div>
        )} */}
      </div>
      <style jsx global>{`
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
          margin-bottom: 10px;
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

        * {
          box-sizing: unset;
        }
        .container {
          max-width: 1244px;
          margin: auto;
          padding: 0 10px;
        }
        .news_page_left {
          width: 925px;
          float: left;
        }
        .news_page_right {
          width: 300px;
          float: right;
          position: relative;
        }
        .clearfix {
          clear: both;
        }
        .vsp10 {
          padding-top: 10px;
        }
        .vsp10 {
          display: block;
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
        .brade_crum ul {
          display: flex;
          padding-bottom: 10px;
          align-items: center;
        }
        .brade_crum li {
          font-size: 16px;
          padding: 0 4px;
          color: #282828;
        }
        .brade_crum li a {
          color: #282828;
          text-decoration: none;
        }
        .brade_crum li:first-child {
          padding-left: 0;
        }
        .middlead {
          display: flex;
          justify-content: center;
          margin: 15px;
        }
        .brdacrum {
          font-size: 16px;
          color: #404040;
          text-transform: uppercase;
          line-height: 18px;
          font-weight: 400;
          margin: 5px 0 15px 0;
        }
        .brdacrum a {
          color: #404040;
          font-weight: 400;
          margin-right: 2px;
        }
        .brdacrum h1 {
          display: inline-block;
          font-size: 16px;
          font-weight: 400;
        }
        .cat-vigyapan #vigyapan {
          background: #eee;
          display: flex;
          width: 100%;
          justify-content: center;
          font-size: 13px;
          padding: 2px 0;
        }
        .leftwrap {
          width: calc(100% - 325px);
          float: left;
          position: relative;
          font-family: "Mukta", sans-serif;
        }
        .rightwrap {
          position: sticky;
          top: 55px;
        }
        .rightwrap {
          width: 300px;
          float: right;
        }
        .chsstctbtn-forstatepage {
          color: #000000;
          font-weight: bold;
          font-size: 15px;
          height: 32px;
          line-height: 34px;
          padding: 0 32px 0 10px;
          box-sizing: border-box;
          box-shadow: 0px 3px 0px #ee1c25;
          position: absolute;
          top: 3px;
          right: 0px;
          cursor: pointer;
        }
        .chsstctbtn-forstatepage:after {
          position: absolute;
          content: "";
          width: 7px;
          height: 7px;
          border-top: 2px solid #ee1c25;
          border-left: 2px solid #ee1c25;
          transform: rotate(-136deg);
          top: 10px;
          right: 10px;
        }
        .top_story {
          margin-bottom: 10px;
        }
        .top-news-title h1 {
          font-size: 28px;
          line-height: 32px;
          color: #001d42;
          font-family: "Mukta", sans-serif !important;
          font-weight: bold;
          margin-bottom: 2px;
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
        .insdnav {
          display: flex;
          justify-content: flex-start;
        }
        .insdnav li {
          flex-shrink: 0;
        }
        .insdnav li a {
          height: 36px;
          line-height: 35px;
          display: block;
          padding: 0 4px;
          margin: 0 4px;
          font-size: 16px;
          color: #757575;
        }
        .insdnav li:first-child a {
          padding-left: 0;
        }

        /*
        ========================== New css added below this line ====================================
        */

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
          padding: 7px 8px 3px;
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
            font-size: 20px;
            line-height: 32px;
            width: calc(100% - 120px);
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
        .moretrndstroy-secion.stripes {
          text-align: center;
          position: relative;
          height: 26px;
          display: block;
          margin: 5px 0;
          background: transparent;
          padding: 4px 0 2px 0;
        }
        .moretrndstroy-secion.stripes div {
          width: 120px;
          margin: 0 auto;
          background-color: #ffffff;
          display: block;
          z-index: 11;
          position: relative;
        }
        .moretrndstroy-secion.stripes:before,
        .moretrndstroy-secion.stripes:after {
          display: block;
          position: absolute;
          bottom: -2px;
          content: "";
          width: 100%;
          right: 0;
          left: 0;
        }
        .moretrndstroy-secion.stripes:before {
          border: 1px dotted #939393;
          top: 0;
          margin: 4px 0;
          height: 4px;
          border-right: 0;
          border-left: 0;
        }
        .moretrndstroy-secion.stripes:after {
          height: 5px;
          margin: 5px 0;
          border: 1px dotted #939393;
          border-right: 0;
          border-left: 0;
        }
        .moretrndstroy-secion.stripes .moretrndstroy {
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
          display: inline;
        }

        .moretrndstroy-secion {
          text-align: center;
          background: #f7f7f7;
          padding: 4px 0 2px 0;
        }
        .moretrndstroy-secion .moretrndstroy {
          color: #e1261d;
          font-weight: bold;
          font-size: 14px;
          line-height: 20px;
        }
        /* adhik padhe css */

        .quicklinks {
          padding: 6px 10px;
          background-color: #f4f4f4;
          border-bottom: 1px solid #e0e0e0;
          margin-bottom: 10px;
        }
        .quicklinks ul {
          display: flex;
          justify-content: flex-start;
        }
        .quicklinks ul li {
          flex-shrink: 0;
        }
        .quicklinks ul li a {
          height: 36px;
          line-height: 40px;
          display: block;
          padding: 0 4px;
          margin: 0 4px;
          font-size: 15px;
          color: #767676;
        }
        .quicklinks ul li.active {
          padding: 3px 0;
        }
        .quicklinks ul li.active a {
          background: #ffffff 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #ec2027;
          border-radius: 15px;
          height: 28px;
          font-size: 15px;
          line-height: 21px;
          color: #e1261d;
          font-weight: bold;
          padding: 3px 16px;
        }

        @media (max-width: 768px) {
          .quicklinks ul {
            overflow: scroll;
            overflow-y: hidden;
          }
          .categry {
            line-height: 22px;
          }
        }
        /* quick link css end here*/

        .nwvideoicon {
          width: 45px;
          height: 45px;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          margin: -22px 0 0 -22px;
          cursor: pointer;
          background: url(/images/siteimages/video-iconnew.png)
            0 0 no-repeat;
          transform: scale(0.6);
        }

        .photoicon {
          width: 45px;
          height: 45px;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          margin: -22px 0 0 -22px;
          cursor: pointer;
          background: url(https://images.news18.com/ibnkhabar/uploads/assests/img/photoB.png)
            0 0 no-repeat;
        }

        .newphticoncount {
          position: absolute;
          background: #ed2129;
          height: 28px;
          line-height: 28px;
          border: 1px solid #fff;
          border-right: none;
          border-radius: 3px 0 0 3px;
          bottom: 5px;
          display: flex;
          font-size: 14px;
          color: #fff;
          right: 0;
          padding: 0 5px 0 2px;
          font-weight: bold;
          width: 60px;
          z-index: 1;
        }

        .newphticoncount img {
          height: 28px !important;
          position: relative;
          vertical-align: middle;
        }

        .newvdsicon {
          position: absolute;
          top: 50%;
          left: 50%;
          background: url(/images/siteimages/video-iconnew.png)
            0 0 no-repeat;
          width: 40px;
          height: 40px;
          margin: -16px 0 0 -16px;
          z-index: 1;
        }

        a:hover {
          color: #ec2027;
        }
        button {
          border: none;
        }
        .categry {
          font-size: 13px;
          color: #ec2027;
          line-height: 20px;
          font-weight: 700;
        }
        .top-kharein li a > div {
          margin-top: -6px;
      }
      
      
        
        li figure {
          overflow: hidden;
          border-radius: 4px;
        }
        li img {
          transform: scale(1);
          -webkit-transition: 0.3s ease-in-out;
          -moz-transition: 0.3s ease-in-out;
          -o-transition: 0.3s ease-in-out;
          transition: 0.3s ease-in-out;
          border-radius: 4px;
        }
        li:hover img {
          transition: 0.3s ease-in-out;
          transform: scale(1.2);
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};
export default React.memo(Category);
