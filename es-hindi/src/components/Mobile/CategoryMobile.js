import React from "react";
import dynamic from "next/dynamic";
import useLoadMore from "hooks/useLoadMore";
import categoryHelper from "includes/category.helper";
// const StateLiveTv = dynamic(() =>
//   import("widgets/Mobile/category/StateLiveTv")
// );
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import WebstoryCSR from "widgets/Common/Responsive/WebstoryCSR";
import Head from "next/head";

// const Taboola = dynamic(() => import("widgets/Common/Responsive/Taboola"));
// import { TaboolaList } from "includes/Tabola.helper";

// const SiteAd = dynamic(() => import("widgets/Common/Responsive/SiteAd"));
const NewSiteAd = dynamic(() => import("widgets/Common/Responsive/NewSiteAd"));
// const SheherChune = dynamic(() =>
//   import("widgets/Desktop/category/SheherChune")
// );

const BreadcrumbCommon = dynamic(() =>
  import("widgets/Common/Responsive/BreadcrumbCommon")
);
const SheherChuneCommon = dynamic(() =>
  import("widgets/Common/Responsive/ShehrChuneCommon")
);
const TopPriorityCommon = dynamic(() =>
  import("widgets/Common/Responsive/TopPriorityCommon")
);
const PetrolDieselPriceWidget = dynamic(() =>
  import("widgets/Common/Responsive/PetrolDieselPriceWidget")
);

// const NewsListingCommon = dynamic(() =>
//   import("widgets/Common/Responsive/NewsListingCommon"),
// );
const CategoryPageTempOne = dynamic(() =>
  import("widgets/Common/Responsive/CategoryPageTempOne")
);
const StateLandingCommonPage = dynamic(() =>
  import("widgets/Common/Responsive/StatelandingPageCommon")
);

const RhsPhoto = dynamic(() => import("widgets/Common/Desktop/RhsPhoto"));
// const RhsTopStory = dynamic(() => import("widgets/Common/Mobile/RhsTopStory"));
const MovieReviewWidget = dynamic(() =>
  import("components/Desktop/homepage/MovieReviewWidget")
);

const CategoryMobile = ({ data = {} }) => {
  const {
    _pageParam = {},
    // topStories,
    dataLength,
    photoStories,
    topPriorityData,
    sliderFlag = false,
    pageAds,
    // astroStories = [],
    titleDiv,
    breadCrumbArray = [],
    categoryStoriesList,
    // isBusinessPage,
    // isCategoryMobilePage,
    categoryName,
    isMobile,
    isCommon,
    pcategory,
    isEntPage,
    isBusinessPage,
  } = data;
  const {
    isStatePage = false,
    curr_page_no: page = 0,
    category: sectionname = "",
    subCategory: sub_section,
    hi_category,
    // allStates,
    pageLimit,
    query_arr,
    // hi_category,
  } = _pageParam;

  const noContent = page > 30 ? false : true;
  const pageNum = page - 1;

  let state_landing_temp,
    entertainment_page_temp = true;
  let subMenuContentData;
  const subMenuArray =
    categoryHelper.getCategoryTopSliderAndBottomBoxList(sectionname);

  subMenuContentData = subMenuArray
    ? [
        {
          slug: `/news/${sectionname}/`,
          sectionName: sectionname,
          name: hi_category || "",
          type: "box",
        },
        ...(subMenuArray?.topSliderUrl?.length > 0
          ? subMenuArray.topSliderUrl
          : subMenuArray.bottomListing || []),
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
          {/* <li className="active"><a href="#">{sectionname}</a></li> */}
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

  // const selectState = (type) => {
  //   const btn =
  //     type === "name"
  //       ? document.querySelector(".state-sheher-chune")
  //       : document.querySelector(".chs-stct");
  //   btn?.click();
  // };

  const { loadMore, categoryData } = useLoadMore(
    categoryStoriesList,
    pageLimit,
    dataLength,
    query_arr,
    false,
    page,
    "category"
  );
  let newcategoryName = categoryName.replace("&AMP;", "&");

  const stateData = {
    slug: sectionname || "",
    label: newcategoryName || "",
  };

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
      <div className="newcontainer">
        <div className="newleftwrap">
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
          {pageAds.PG_1x1_2 && (
            // <SiteAd
            //   slotId="PG_1x1_2"
            //   adUnit={pageAds.PG_1x1_2}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   style={{ height: 0 }}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="PG_1x1_2"
              adUnit={pageAds.PG_1x1_2}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              style={{ height: 0 }}
              loadOnScroll={false}
            />
          )}
          {pageAds.PG_1x1_3 && (
            // <SiteAd
            //   slotId="PG_1x1_3"
            //   adUnit={pageAds.PG_1x1_3}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   style={{ height: 0 }}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="PG_1x1_3"
              adUnit={pageAds.PG_1x1_3}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              style={{ height: 0 }}
              loadOnScroll={true}
            />
          )}
          <div className="hd_heading">
            {titleDiv ? (
              <div dangerouslySetInnerHTML={{ __html: titleDiv }}></div>
            ) : (
              <h2>{newcategoryName.replace("&amp;", "&")}</h2>
            )}
            {isStatePage && sectionname !== "states" ? (
              <SheherChuneCommon withBg={false} stateData={stateData} />
            ) : (
              ""
            )}
          </div>

          {page <= 1 && subMenuContentData && subMenuContent()}

          {/* {subMenuContentData.length > 0 ? (
            <div className="glbl-insdnav hdr-entertainment">
              <h2 className="insdnav-hd manoranjan-hd">
                <a
                  href={
                    sub_section
                      ? "/news/" + sectionname + "/" + sub_section + "/"
                      : "/news/" + sectionname + "/"
                  }
                >
                  {sectionname == "world"
                    ? "दुनिया"
                    : sectionname == "lifestyle"
                    ? "लाइफ"
                    : sectionname == "states"
                    ? "राज्य"
                    : hi_category}
                </a>
              </h2>
              {subMenuContentData && subMenuContent()}
            </div>
          ) : (
            ""
          )} */}

          {/* Top story section start here */}
          {topPriorityData && page < 2 ? (
            <TopPriorityCommon
              initialData={{
                ...topPriorityData,
                rightCat: [...topPriorityData.rightCat, ...categoryStoriesList],
              }}
              sliderFlag={sliderFlag}
              isMobile={isMobile}
              pageAds={pageAds}
              page={page}
              entertainment_page_temp={entertainment_page_temp}
              pcategory={pcategory}
              isCommon={isCommon}
            />
          ) : (
            ""
          )}
          {isStatePage ? (
            <PetrolDieselPriceWidget perView={2} city={sectionname} />
          ) : sub_section && !isBusinessPage && !isEntPage ? (
            <PetrolDieselPriceWidget perView={2} city={sub_section} />
          ) : (
            ""
          )}
          {sectionname && !sub_section ? (
            <WebstoryCSR
              isMobile={true}
              section={sectionname}
              filter={{ categories: sectionname }}
            />
          ) : (
            ""
          )}

          {/* {page <= 1 && entertainment_page_temp ? (
            <div className="moretrndstroy-secion">
              <div>
                <a href={"/" + _pageParam.query + "page-2"}>
                  <span className="moretrndstroy">और भी पढ़ें</span>
                </a>
              </div>
            </div>
          ) : (
            ""
          )} */}

          {page <= 1 && state_landing_temp ? (
            <StateLandingCommonPage data={data} />
          ) : page <= 1 && entertainment_page_temp ? (
            <CategoryPageTempOne data={data} isMobile={isMobile} />
          ) : (
            // <NewsListingCommon initialData={categoryData} isMobile={isMobile} />
            ""
          )}

          <div className="clearfix"></div>
          <div className="vsp10"></div>

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
          {_pageParam?.category == "" && photoStories?.length && (
            <RhsPhoto photoStories={photoStories} />
          )}
          {sub_section == "film-review" && (
            <MovieReviewWidget data={topPriorityData} />
          )}
          <Taboola
            mode={TaboolaList.category.center.mode}
            id={TaboolaList.category.center.id}
            container={TaboolaList.category.center.container}
            placement={TaboolaList.category.center.placement}
            isMobile={true}
            position={true}
          />

          {noContent ? "" : <p> No stories found matching this criteria</p>}

          {/* outbrain start here */}
          <div className="outbrain_row">
            <Taboola
              mode={TaboolaList.category.bottom.mode}
              id={TaboolaList.category.bottom.id}
              container={TaboolaList.category.bottom.container}
              placement={TaboolaList.category.bottom.placement}
            />
          </div>
        </div>
        <div className="newrightwrap">&nbsp;</div>
      </div>
      {/* Outbrain end here */}

      <style jsx global>{`
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
          margin-bottom: ${sectionname === "states" ? "10px" : "0px"};
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
            font-size: 20px;
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
          border: 1px dotted#939393;
          top: 0;
          margin: 4px 0;
          height: 5px;
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

        .quicklinks {
          padding: 6px 10px;
          background-color: #f4f4f4;
          position: sticky;
          top: 0;
          z-index: 99;
          display: inline-grid;
          //  margin-left: -10px;
          //  margin-right:-10px;
          width: 100%;
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

        .newadd {
          background: #efefef;
          line-height: 0;
          display: table;
          margin: 10px auto;
          height: 270px;
        }
        .newadd span {
          display: block;
          font-size: 12px;
          color: #8e8e8e;
          text-align: center;
          height: 20px;
          line-height: 20px;
          width: 100%;
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
          background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
          width: 40px;
          height: 40px;
          margin: -16px 0 0 -16px;
          z-index: 1;
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
        }
      `}</style>
    </>
  );
};
export default CategoryMobile;
