import React, { useState, memo } from "react";
import getConfig from "next/config";
import PhotoListing from "widgets/Desktop/category/PhotoListing";
import SubCatPhotoListing from "widgets/Desktop/category/SubCatPhotoListing";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import { getBottomStoriesList } from "api/individual/PhotogalleryDetails";
import dynamic from "next/dynamic";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const PhotogalleryTopPriority = dynamic(
  () => import("widgets/Desktop/category/PhotogalleryTopPriority"),
  // { ssr: false }
);
const MemoPhotogalleryTopPriority = memo(PhotogalleryTopPriority);
const MemoPhotoListing = memo(PhotoListing);
const MemoSubCatPhotoListing = memo(SubCatPhotoListing);
const MemoRhsCommon = memo(RhsCommon);
// const MemoSiteAd = memo(SiteAd);
const MemoTaboola = memo(Taboola);

const PhotogalleryCategory = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const query = props?.data?._pageParam?.query || '';
  const pageNo = props?.data?._pageParam?.curr_page_no;
  const limit = props?.data?._pageParam?.pageLimit;
  const outBrainUrl = publicRuntimeConfig.siteUrl + query;
  const noContent = parseInt(pageNo) > 30;
  const categoryStoriesList = props?.data?.categoryStoriesList;
  const dataLength = 1000;
  const section = props.data.subCat;

  const [categoryData, setCategoryData] = useState(categoryStoriesList || []);
  const [catPageLimit, setCatPageLimit] = useState(limit);
  const hasMoreItems = categoryData.length < dataLength;
  const [hasMoreData, setHasMoreData] = useState(hasMoreItems);

  const loadMore = async () => {
    const categoryResult = await getBottomStoriesList(
      section,
      catPageLimit,
      24,
      true
    );
    const latestData = categoryResult || [];
    const newCatData = [...categoryData, ...latestData];
    setCategoryData(() => newCatData);
    setHasMoreData(newCatData?.length < dataLength);
    setCatPageLimit((prev) => prev + limit);
  };
  return (
    <>
      <div className="container clearfix">
        <BreadcrumbCommon breadCrumbArray={props.data.breadCrumbArray} />
        
        <MemoPhotogalleryTopPriority
          data={props?.data?.topPriorityData || {}}
          sliderFlag={props.data.sliderFlag}
          pageAds={props.data?.pageAds || {}}
          subCat={props.data?.subCat || ""}
        />
        <div className="clearfix">
          {noContent ? (
            " No photos found matching this criteria"
          ) : (
            <div className="pht-left">
              {props.data?._pageParam?.sub_cat === "" ? (
                <div className="pht-sld swiper">
                  <div className="blog-list">
                    <MemoPhotoListing
                      initialData={categoryData || {}}
                      outBrainUrl={outBrainUrl}
                    />
                  </div>
                </div>
              ) : (
                <div className="pht-sld clearfix">
                  <ul className="pht-sld-list2 clearfix">
                    <MemoSubCatPhotoListing
                      initialData={categoryData || {}}
                      outBrainUrl={outBrainUrl}
                    />
                  </ul>
                </div>
              )}
              <div className="clearfix"></div>
              {hasMoreData && (
                <button onClick={loadMore} className="load_more">
                  Load More
                </button>
              )}
              <>
                <div className="clearfix"></div>
                <div className="middlead cat-vigyapan">
                  {/* <MemoSiteAd
                    width={728}
                    height={90}
                    slotId={"Desktop_Static_Ad_2"}
                    adUnit={props.pageAds.BTF_728}
                    sizes={[
                      [728, 90],
                      [1, 1],
                    ]}
                    loadonScroll={true}
                  ></MemoSiteAd> */}
                  <NewSiteAd
                    slotId={"Desktop_Static_Ad_2"}
                    adUnit={props.pageAds.BTF_728}
                    sizes={[
                      [728, 90],
                      [1, 1],
                    ]}
                    width={728}
                    height={90}                    
                    loadOnScroll={true}            
                  />
                </div>
              </>
              <MemoTaboola
                mode={TaboolaList.category.bottom.mode}
                id={TaboolaList.category.bottom.id}
                container={TaboolaList.category.bottom.container}
                placement={TaboolaList.category.bottom.placement}
              />
            </div>
          )}
          <div className="pht-right">
            <MemoRhsCommon
              pageAds={props.data?.pageAds || {}}
              currentURL={outBrainUrl}
              latestNewsStories={props.data?.latestNewsStories || {}}
              topStories={props.data?.topStories || {}}
              astroStories={props.data?.astroStories || {}}
              section="latestnews"
              page="photogallery"
              taboolaList={TaboolaList.category}
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        * {
          box-sizing: unset;
        }
        .container {
          max-width: 1265px !important;
          margin: auto;
          padding: 0 10px;
          font-family: "Mukta", sans-serif;
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
        .pht-tplft:after,
        .pht-tplft:before {
          content: "";
          position: absolute;
          width: 40px;
        }
        .pht-tplft:after {
          top: 20px;
          bottom: 20px;
          background: #555;
          right: -20px;
          z-index: -2;
        }
        .pht-tplft:before {
          top: 10px;
          bottom: 10px;
          background: #333;
          right: -10px;
          z-index: -1;
        }
        .pht-tp {
          margin-bottom: 20px;
          height: 516px;
        }
        .pht-tplft {
          width: 585px;
          height: 516px;
          position: relative;
          float: left;
        }
        .phttopgallery {
          position: relative;
          overflow: hidden;
        }
        .phttopgallery-arrow {
          display: flex;
          justify-content: flex-end;
          position: absolute;
          bottom: 15px;
          right: 15px;
        }
        .phttopgallery-arrow button {
          border: none;
          background: #fff;
          width: 40px;
          height: 40px;
          display: block;
          margin: 2px;
          outline: 0;
          padding: 0;
          position: relative;
        }
        .phttopgallery-arrow button:before {
          content: "";
          position: absolute;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-right: 10px solid #eb1c24;
          top: 10px;
          left: 14px;
        }
        .pht-tplft-dtl {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, #000, #111);
          background: -webkit-linear-gradient(transparent, #000, #111);
          font-size: 28px;
          color: #fff;
          line-height: 42px;
          font-weight: 400;
          padding: 150px 32px 15px;
        }
        .pht-tplft-shr {
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          font-family: arial;
          margin: 24px 0 0;
        }
        .pht-tprgt {
          width: 616px;
          float: right;
          height: 516px;
        }
        .pht-tprgt li {
          width: 300px;
          height: 250px;
          position: relative;
          float: left;
          margin: 0 15px 0 0;
        }
        .rgtpht-dtl,
        .rgtpht-shr {
          position: absolute;
          right: 0;
          color: #fff;
        }
        .rgtpht-shr {
          top: 0;
          font-size: 16px;
          font-weight: 700;
          font-family: arial;
          left: 0;
          display: flex;
          justify-content: flex-end;
          padding: 10px 5px 20px 5px;
          background: linear-gradient(rgba(0, 0, 0, 0.8), transparent);
          z-index: 1;
        }
        .rgtpht-shr a {
          color: #fff;
          margin: 0 10px;
        }
        .pht-tplft-shr a:hover i {
          filter: none;
        }
        .rgtpht-shr a:hover i {
          filter: none;
        }
        .rgtpht-dtl {
          bottom: 0;
          left: 0;
          background: -webkit-linear-gradient(transparent, #111, #000);
          font-size: 15px;
          line-height: 24px;
          font-weight: 400;
          z-index: 1;
        }
        .rgtpht-dtl a {
          color: #fff;
          padding: 30px 16px 16px;
          display: block;
        }
        .pht-tprgt li img {
          width: 300px;
          height: 219px;
        }
        .rgtpht-shr a i {
          position: relative;
          top: 2px;
          left: 4px;
          filter: brightness(0) invert(1);
        }
        .pht-tplft-shr a i {
          position: relative;
          top: 2px;
          left: 4px;
          filter: brightness(0) invert(1);
        }
        .icon-heartIcon1 {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/phteyelikeicon_1589956559.png)
            no-repeat 0 0;
          width: 19px;
          height: 16px;
          display: inline-block;
        }
        .icon-eyeIcon {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/phteyelikeicon_1589956559.png)
            no-repeat -20px 0;
          width: 23px;
          height: 16px;
          display: inline-block;
        }
        .phttopgallery-arrow button:last-child {
          transform: rotate(180deg);
        }
        .phttopgallery ul {
          display: flex;
        }
        button:hover {
          cursor: pointer;
        }
        .pht-tplft-shr a {
          cursor: pointer;
          filter: none;
        }
        .phttopgallery ul li {
          position: relative;
          height: 516px;
        }
        .phttopgallery ul li figure {
          margin: 0;
          padding: 0;
          width: 100%;
        }
        figure {
          line-height: 0;
          position: relative;
        }
        .phttopgallery ul li figure img {
          width: 100%;
        }
        .pht-tplft-dtl a {
          color: #fff;
        }
        .pht-tplft-dtl a:hover i {
          filter: none;
        }
        .pht-tplft-shr a {
          color: #fff;
          margin: 0 20px 0 0;
          display: inline-block;
        }
        .pht-left {
          float: left;
          width: calc(100% - 320px);
        }
        .pht-sld {
          position: relative;
          overflow: hidden;
          padding-bottom: 10px;
        }
        .blog-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .pht-tprgt li:nth-child(4n) {
          margin: 0 0 15px;
        }
        .pht-tprgt li:nth-child(2n) {
          margin: 0 0 15px;
        }
        .shosh_ad {
          display:flex;
          justify-content: space-around;
        }
        .pht-tprgt li:nth-child(4) {
          margin-right: 15px;
        }
        .pht-tprgt li:last-child {
          margin-right: 0;
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
      `}</style>
    </>
  );
};
export default React.memo(PhotogalleryCategory);
