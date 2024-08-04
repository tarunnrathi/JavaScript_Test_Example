import React from "react";
import { imageLoader } from "includes/article.util";
import LazyImage from "components/Common/LazyImage";
// import SITE_HELPER from "includes/helper";
// import AstroSlide from "./astroSlide";
import SiteAd from "widgets/Common/Responsive/SiteAd";
// import Glide from "@glidejs/glide";
import categoryHelper from "includes/category.helper";
// import PhotogalleryTopPriority from "widgets/Mobile/category/PhotogalleryTopPriority";
import Pagination from "widgets/Common/Mobile/Pagination";

const StateCategoryPage = (props) => {
  const {
    data: {
      topPriorityData: { topRecord = [], bottomRecord = [] } = {},
      categoryStoriesList = [],
      pageAds,
      currentUrl,
      sliderFlag,
      _pageParam: {
        category = "",
        subCategory = "",
        sub_cat = "",
        get_section = {},
        curr_page_no = '',
        dataLength = '',
        pageLimit= '',

      } = {}
    } = {}
  } = props;
  let getCategoryTopSliderAndBottomBoxList = {};

  let bottomListing = [],
    topSliderUrl = [];
  if (category == "entertainment") {
    topSliderUrl = categoryHelper.manoranjanTopUrlArray();
  } else {
    getCategoryTopSliderAndBottomBoxList = subCategory
      ? categoryHelper.getCategoryTopSliderAndBottomBoxList(subCategory)
      : categoryHelper.getCategoryTopSliderAndBottomBoxList(category);
    if (getCategoryTopSliderAndBottomBoxList != undefined) {
      bottomListing = getCategoryTopSliderAndBottomBoxList.bottomListing;
      topSliderUrl = getCategoryTopSliderAndBottomBoxList.topSliderUrl;
    }
  }

  const bftAdPosition = categoryStoriesList.length >= 13 ? 13 : categoryStoriesList.length;

  return (
    <>
      {topSliderUrl?.length > 0 ? (
        <div className="glbl-insdnav hdr-entertainment">
          <h2 className="insdnav-hd">{get_section.name}</h2>
          <ul className="insdnav">
            {topSliderUrl.map((topNews, key) => (
              <li className="" key={key}>
                <a href={topNews.slug}>{topNews.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}

      <section className="pdngsxtn clearfix">
        {/* <div className="glblbghd-sts">
          <h2 className="hd">
            {props.data._pageParam.hi_subCategory
              ? props.data._pageParam.hi_subCategory
              : props.data._pageParam.hi_category}
          </h2>
        </div> */}
        <ul className="gridview-story e">
          {categoryStoriesList.map((eachNews, key) => {
            return (
              <>
                <li key={key}>
                  <a title="Link" href={eachNews.url || ""}>
                    <figure>
                      <div className="tgtm-shr">
                        <span className="tpc fl">{eachNews.sub_category}</span>
                      </div>
                      <LazyImage
                        width={364}
                        height={288}
                        src={imageLoader(eachNews["thumbnail"], 360, 288)}
                        alt={eachNews.display_headline || eachNews["title"] || "Image"}
                        title={eachNews.display_headline || eachNews["title"] || "Image"}
                        unoptimized={true}
                        className="lazyload"
                        isRes={true}
                      />
                    </figure>
                  </a>
                  <div className="lstintro">
                    <h2>
                      <a title="Link" href={eachNews.url || ""}>
                        {eachNews.display_headline || eachNews.title || ""}
                      </a>
                    </h2>
                  </div>
                </li>

                {key == 5 || key == bftAdPosition ? (
                  <li className="clearfix vsp16 add add-li">
                    <div className="addinner-box">
                      <SiteAd
                        slotId={
                          key == 5
                            ? `mobile_atf_300`
                            : key == bftAdPosition
                            ? "mobile_btf_300"
                            : ""
                        }
                        adUnit={
                          key == 5
                            ? pageAds.ATF_300
                            : key == bftAdPosition
                            ? pageAds.BTF_300
                            : ""
                        }
                        sizes={
                          key == 5
                            ? [[300, 250], [336, 280]]
                            : key == bftAdPosition
                            ? [[300, 250], [336, 280]]
                            : ""
                        }
                        width={300}
                        height={280}
                        lazyload={true}
                      />
                      {key == 5 ? <SiteAd
                        slotId="PG_Slider_1x1"
                        adUnit={
                          "NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1"
                        }
                        sizes={[[1, 1]]}
                        renderOutOfThePage={true}
                        removeAdSpan={true}
                        loadonScroll={true}
                      />
                      : null}
                    </div>
                  </li>
                ) : (
                  ""
                )}

              </>
            );
          })}
        </ul>
      </section>
      <Pagination
                  curpage={props.data._pageParam.curr_page_no}
                  TotalRecord={props.data.dataLength}
                  limit={props.data._pageParam.pageLimit}
                  pageurl={"/" + props.data._pageParam.query.replace("news/", "")}
                  pageflag={false}
          />
      {/* <AstroSlide /> */}
      <style global jsx>{`
        .tpnews {
          background: #fff;
          border-top: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
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
        .section-topslider {
          position: relative;
          overflow: hidden;
          background: #000;
        }
        .pgtbox {
          position: relative;
          overflow: hidden;
          clear: both;
        }
        .section-topslider ul {
          display: flex;
        }
        .pgtbox ul li:first-child {
          margin-bottom: 10px;
        }
        .pgtbox ul li {
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }
        li {
          list-style: none;
        }
        .section-topslider ul li figure {
          position: relative;
          width: 100%;
          line-height: 0;
        }
        .pgtbox ul li figure {
          position: relative;
          width: 100%;
          float: left;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        figure img {
          width: 100%;
          float: left;
        }
        .chmpntpnwshd {
          background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), #000);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 16px 28px;
          cursor: pointer;
        }
        .tpall {
          line-height: 22px;
          margin-bottom: 8px;
        }
        .tpall .tpc {
          background: #000;
          margin-right: 16px;
          padding: 0 16px;
          height: 24px;
          line-height: 26px;
          border-radius: 4px;
          font-size: 12px;
          color: #fff;
          display: inline-block;
        }
        .chmpntpnwshd a {
          color: #fff;
          display: block;
        }
        .chmpntpnwshd a h1,
        .chmpntpnwshd a h2,
        .chmpntpnwshd a h3,
        .chmpntpnwshd h1 a,
        .chmpntpnwshd h2 a,
        .chmpntpnwshd h3 a {
          color: #fff;
          font-size: 18px;
          line-height: 26px;
          font-weight: 700;
        }
        .listview-story {
          margin: 16px;
          position: relative;
        }
        li.forpurplebg {
          position: relative;
          padding-bottom: 21px;
        }
        .listview-story li {
          display: flex;
          margin-bottom: 8px;
        }
        .listview-story li figure {
          width: 110px;
          height: 75px;
          overflow: hidden;
          margin-right: 12px;
          line-height: 0;
          flex-shrink: 0;
          position: relative;
        }
        .glblbghd-sts-mrnav,
        .rdmr {
          color: #ed1c24;
          border: 1px solid #ed1c24;
          border-radius: 20px;
          height: 26px;
          line-height: 26px;
          font-weight: 700;
          font-size: 14px;
          box-sizing: border-box;
          display: block;
          margin: 16px auto;
          width: 150px;
          overflow: hidden;
          text-align: center;
        }
        .pdngsxtn {
          padding: 1px 16px;
        }
        .clearfix {
          clear: both;
        }
        .glblbghd-sts {
          border-bottom: 1px solid #001536;
          margin-top: 10px;
          position: relative;
          display: flex;
          width: 100%;
          padding-bottom: 4px;
          margin-bottom: 8px;
          color: #001536;
          font-size: 22px;
          font-weight: 700;
          line-height: 20px;
        }
        .glblbghd-sts:before {
          content: "";
          width: 15px;
          height: 3px;
          background: #ed1c24;
          position: absolute;
          left: 0;
          bottom: -2px;
        }
        .glblbghd-sts .hd {
          float: left;
          font-size: 22px;
          color: #000;
          line-height: 24px;
          margin-top: 5px;
          font-weight: 700;
        }
        .glblbghd-sts a {
          color: #001536;
          text-decoration: none;
        }
        .gridview-story {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          border-bottom: 1px solid #ccc;
        }
        .gridview-story li {
          border: 1px solid #ddd;
          background: #fff;
          width: 48%;
          margin-bottom: 16px;
          box-sizing: border-box;
          padding-bottom: 10px;
        }
        .gridview-story li a {
          color: #000;
          z-index: 9999;
        }
        .gridview-story li a figure {
          width: 100%;
          overflow: hidden;
          line-height: 0;
          position: relative;
          float: left;
        }
        .gridview-story li figure {
          width: 100%;
          float: left;
          line-height: 0;
          position: relative;
          margin-bottom: 8px;
        }
        .gridview-story li figure .tgtm-shr {
          top: 0;
          padding: 0;
          background: 0 0;
          display: none !important;
        }
        .tgtm-shr {
          background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), #000);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px 8px 8px;
          cursor: pointer;
          color: #fff;
          height: auto;
          z-index: 9999;
        }
        .gridview-story li .lstintro {
          padding: 0 8px;
          cursor: pointer;
          margin: 0;
          clear: both;
          overflow: hidden;
        }
        .gridview-story li h2 {
          font-size: 16px;
          line-height: 1.45;
          clear: both;
          font-weight: 400;
        }
        .add {
          background: #dbdde3 !important;
        }
        .vsp16 {
          margin-top: 16px;
        }
        .addinner-box {
          //background: #e8e9ed;
          background: #dbdde3;
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
        .gridview-story li.add-li {
          padding: 10px 0;
          width: 100%;
          text-align: center;
        }
        .cat-top-ad {
          padding: 15px 0;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default StateCategoryPage;
