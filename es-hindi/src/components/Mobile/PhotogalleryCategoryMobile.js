import React, { useEffect, useRef, memo } from "react";
import OptionTab from "components/Common/OptionTab";
import { pageEvents } from "includes/article.util";
import PhotogalleryTopPriority from "widgets/Mobile/category/PhotogalleryTopPriority";
import PhotogalleryBottomlisting from "widgets/Mobile/category/PhotogalleryBottomlisting";
import { useInView } from "react-intersection-observer";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const MemoOptionTab = memo(OptionTab);
const MemoPhotogalleryTopPriority = memo(PhotogalleryTopPriority);
const MemoPhotogalleryBottomlisting = memo(PhotogalleryBottomlisting);
const MemoTaboola = memo(Taboola);

const CategoryMobile = (props) => {
  const { isAjax = false } = props;
  const callFired = useRef(false);
  const activeTabUrl = "/photogallery/";
  const currentTitle = "";
  const currentUrl = props.data?.currentUrl || "";
  const pageNo = props?.data?.pageNo || 0;
  const topPriorityPhotos = props.data?.topPriorityData || null;
  const bottomStories = props.data.categoryStoriesList || [];
  const showAnyaText = props.data?.showAnyaPhotoText || false;
  const sliderFlag = props.data?.sliderFlag;
  const sectionCategory = props?.data?._pageParam?.subCategory || props?.data?._pageParam?.category || "";

  const { ref, inView, entry } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    pageEvents({
      inView,
      entry,
      isAjax,
      callFired,
      url: currentUrl,
      storyId: pageNo,
      headline: props?.data?.pageSeo?.title || "",
    });
  }, [inView]);

  const submenusObj = {
    key: "photogallery",
    value: "फोटो",
    colorClass: "bgclr-pradesh",
    template: "one",
    subCatDisplay: "1",
    "more-url": "/photogallery/",
    "sub-list": [
      {
        key: "entertainment",
        value: "मनोरंजन",
        "more-url": "/photogallery/entertainment/",
        rel: "/photogallery/entertainment/",
      },
      {
        key: "cricket",
        value: "क्रिकेट",
        "more-url": "/photogallery/sports/cricket/",
        rel: "/photogallery/sports/cricket/",
      },
      {
        key: "tech",
        value: "मोबाइल-टेक",
        "more-url": "/photogallery/tech/",
        rel: "/photogallery/tech/",
      },
      {
        key: "auto",
        value: "ऑटो",
        "more-url": "/photogallery/auto/",
        rel: "/photogallery/auto/",
      },
      {
        key: "lifestyle",
        value: "लाइफ़",
        "more-url": "/photogallery/lifestyle/",
        rel: "/photogallery/lifestyle/",
      },
    ],
  };
  const onOptionClick = (title) => {
    const dataArray = [...submenusObj["sub-list"]];
    // setCurrentTitle(title);
    dataArray.map((eachData) => {
      if (eachData.value == title && activeTabUrl !== eachData["more-url"]) {
        window.location.href = eachData["more-url"];
        // updateUrl(eachData["more-url"]);
      }
    });
  };
  // const updateUrl = (url) => {
  //   history.replaceState({}, '', `${url}`);
  // };
  // let outBrainUrl = (currentUrl).replace(
  //   /https:\/\/(stg|beta)?hindi.news18.com\//,
  //   publicRuntimeConfig.siteUrl
  // );
  let breadCrumbArray =
    props.data.breadCrumbArray && props.data.breadCrumbArray.length <= 2
      ? props.data.breadCrumbArray
      : props.data.breadCrumbArray
      ? props.data.breadCrumbArray.slice(0, 2)
      : [];
  breadCrumbArray = currentTitle
    ? [
        ...breadCrumbArray,
        {
          value: currentTitle,
        },
      ]
    : props.data.breadCrumbArray || [];
  return (
    <>
      <section className="clearfix wrapper">
        <BreadcrumbCommon breadCrumbArray={props.data.breadCrumbArray} />
        {typeof props.data?.pageAds.PG_1x1 !== "undefined" &&
        props.data?.pageAds.PG_1x1 !== "" && (
          // <MemoSiteAd
          //   slotId="PG_1x1"
          //   adUnit={props.data?.pageAds.PG_1x1}
          //   sizes={[[1, 1]]}
          //   removeAdSpan={true}
          //   loadonScroll={true}
          // />
          <NewSiteAd
            slotId="PG_1x1"
            adUnit={props.data?.pageAds.PG_1x1}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadOnScroll={true}
          />
        )}
        {/* <MemoSiteAd
          slotId="PG_Slider_1x1"
          adUnit={
            "NW18_HIND_PWA/NW18_HIND_PHOTO_PWA/NW18_HIND_PHOTO_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1"
          }
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        /> */}
        <NewSiteAd
          slotId="PG_Slider_1x1"
          adUnit={
            "NW18_HIND_PWA/NW18_HIND_PHOTO_PWA/NW18_HIND_PHOTO_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1"
          }
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadOnScroll={true}
        />
        {(typeof props.data?.pageAds.PG_1x1_2 !== "undefined" &&
        props.data?.pageAds.PG_1x1_2 !== "") && (
          // <MemoSiteAd
          //   slotId="PG_1x1_2"
          //   adUnit={props.data?.pageAds.PG_1x1_2}
          //   sizes={[[1, 1]]}
          //   removeAdSpan={true}
          //   loadonScroll={true}
          // />
            <NewSiteAd
              slotId="PG_1x1_2"
              adUnit={props.data?.pageAds.PG_1x1_2}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={false}
            />
        )}
        {(typeof props.data?.pageAds.PG_1x1_3 !== "undefined" &&
        props.data?.pageAds.PG_1x1_3 !== "") && (
          // <MemoSiteAd
          //   slotId="PG_1x1_3"
          //   adUnit={props.data?.pageAds.PG_1x1_3}
          //   sizes={[[1, 1]]}
          //   removeAdSpan={true}
          //   loadonScroll={true}
          // />
          <NewSiteAd
            slotId="PG_1x1_3"
            adUnit={props.data?.pageAds.PG_1x1_3}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadOnScroll={true}
          />
        )}
        {pageNo > 1 
        ? (
          null
        ) 
        : (
        <MemoOptionTab
          head={submenusObj["value"]}
          url={submenusObj["more-url"]}
          options={[
            ...submenusObj["sub-list"].map((eachOption) => {
              return { title: eachOption.value, url: eachOption["more-url"] };
            }),
          ]}
          updateState={onOptionClick}
          component="photolisting"
        />
        )}
        {topPriorityPhotos && Object.keys(topPriorityPhotos).length > 0 && (
          <MemoPhotogalleryTopPriority
            data={topPriorityPhotos}
            sliderFlag={sliderFlag}
            pageAds={props?.data?.pageAds || []}
            showAnyaText={showAnyaText}
            category={sectionCategory}
            section={props.data?.subCat}
          />
        )}
      </section>
      {/* <div style={{height:"240px"}}>
      <Taboola mode={TaboolaList.photoPage.center.mode}
       id ={TaboolaList.photoPage.center.id}
       container={TaboolaList.photoPage.center.container}
        placement = {TaboolaList.photoPage.center.placement}
      />
      </div> */}
      <section className="photo_section_b" id={"page_no" + pageNo} ref={ref}>
        {bottomStories && bottomStories.length > 0 && (
          <section className="pdngsxtn clearfix">
            <ul className="gridview-story">
              <MemoPhotogalleryBottomlisting
                data={bottomStories}
                pageAds={props?.data?.pageAds}
                showAnyaText={showAnyaText}
                isAjax={isAjax}
                currentUrl={currentUrl}
                pageNo={pageNo}
              />
            </ul>
          </section>
        )}
      </section>
      {/* {
        (!isAjax) && isPageStringExist && (
          <div className="more-photos">
            <LazyLoad once offset={1000}>
              <CategoryAjax
                pageParam={props?.data?._pageParam}
                pageAds={props?.data?.pageAds}
                pageSeo={props?.data?.pageSeo}
                comp={CategoryMobile}
                pageNo={pageNo + 1}
                categoryData={bottomStories}
              />
            </LazyLoad>
          </div>
        )
      } */}
      {/* { (isPageStringExist) ? "" : <AstroSlide/> }   */}

      {/* <div className="page_outbrain">
        <Outbrain widgetId="MB_6" widgetSrc={outBrainUrl} />
      </div> */}
      <MemoTaboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
      />
      <style jsx global>{`
        ul.pagination {
          display: flex;
          clear: both;
        }
        .top_links_cont a {
          padding: 3px 18px 0px 18px;
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
        .glbl-insdnav.hdr-photos .insdnav-hd {
          background: #828282;
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
        .glbl-insdnav {
          justify-content: flex-start;
          position: relative;
          clear: both;
          height: 38px;
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
        .section-topslider {
          position: relative;
          overflow: hidden;
          background: #000;
        }
        .section-topslider ul {
          display: flex;
        }
        .section-topslider ul li figure {
          position: relative;
          width: 100%;
          line-height: 0;
        }
        .section-topslider ul li figure img {
          width: 100%;
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
        .chmpntpnwshd a .tpall span {
          background: #000;
          padding: 0 16px;
          height: 24px;
          line-height: 26px;
          border-radius: 4px;
          font-size: 12px;
          color: #fff;
          display: inline-block;
          position: absolute;
          top: -15px;
          left: 16px;
          font-weight: 400;
        }
        .section-topslider-bullets {
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          z-index: 2;
        }
        .section-topslider-bullets button {
          width: 8px;
          height: 8px;
          background: #7e8186;
          border-radius: 50%;
          margin: 0 8px 0 0;
          padding: 0;
          outline: 0;
          border: none;
          display: inline-block;
          cursor: pointer;
        }
        .section-topslider-bullets button.glide__bullet--active {
          background: #fff;
        }
        .section-topslider.forentertainment
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #a6214d;
        }
        .section-topslider.forbusiness
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #2163a6;
        }
        .section-topslider.forstates
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #a64d21;
        }
        .pdngsxtn {
          padding: 1px 16px;
        }
        .pdngsxtn-sub {
          padding-top: 0px;
        }
        .sprite {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/phticnnew_1588065870.png)
            no-repeat;
        }
        .sprite.phticnl,
        .sprite.phticns,
        .sprite.vdsicnl {
          top: 50%;
          left: 50%;
          z-index: 1;
        }
        .sprite.phticnl {
          width: 55px;
          height: 55px;
          background-position: 0 0;
          position: absolute;
          margin: -27px 0 0 -27px;
          cursor: pointer;
          opacity: 0.7;
        }
        .sprite.phticns {
          width: 32px;
          height: 32px;
          background-position: 0 0;
          background-size: 32px;
          position: absolute;
          margin: -16px 0 0 -16px;
          cursor: pointer;
          opacity: 0.7;
        }
        .vdsicnl,
        .vdsicns {
          background: rgba(0, 0, 0, 0.6);
          border-radius: 100%;
          cursor: pointer;
          top: 50%;
          left: 50%;
          z-index: 1;
        }
        .chmpntpnwshd a {
          color: #fff;
          display: block;
        }
        .tpnews {
          background: #fff;
          border-top: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
        }
        .listview-story {
          margin: 16px;
          position: relative;
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
        .listview-story li figure img {
          height: 75px;
          width: 100%;
        }
        .listview-story li .lstintro {
          margin: 8px 16px 0 0;
          position: relative;
        }
        .listview-story li .lstintro .tg {
          display: block;
          font-weight: 700;
          color: #000;
          font-size: 13px;
          float: none;
        }
        .listview-story li .lstintro .tm {
          display: none !important;
        }
        .listview-story li .lstintro h2,
        .listview-story li .lstintro h3 {
          font-size: 16px;
          line-height: 1.45;
          // height: 45px;
          overflow: hidden;
          font-weight: 400;
          display: block;
          margin-top: 2px;
        }
        .listview-story li .lstintro .tag-tm {
          margin-top: -15px;
        }
        .listview-story.forinsd {
          margin-bottom: 16px !important;
        }
        .listview-story.forinsd {
          margin: 16px 0 32px;
        }
        .listview-story.forinsd li {
          box-shadow: 0 0 3px #c5c5c5;
        }
        .rdmrstr {
          top: 0;
          right: -2px;
          bottom: -1px;
          left: -2px;
          display: flex;
          color: #fff;
          background: rgba(0, 0, 0, 0.8);
          z-index: 9999;
        }
        .tpall .tm {
          display: none !important;
        }
        .gridview-story.fordarkgreenbg {
          border: none;
          margin: 0 16px;
        }
        .gridview-story li .lstintro .tag-tm .tm,
        .chmpntpnwshd .tpall .tm {
          display: none !important;
        }
        .top-news-title {
          float: left;
          font-size: 12px;
          color: #4e4c4c;
          line-height: 35px;
          font-weight: 700;
          background: #f7f7f7;
          display: block;
          width: 100%;
          padding: 1%;
          margin-bottom: 5px;
        }
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
        .pgtbox ul li {
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }
        .pgtbox ul li figure {
          position: relative;
          width: 100%;
          float: left;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        .pgtbox ul li figure img {
          width: 100%;
          float: left;
        }
        .pgtbox ul li:first-child {
          margin-bottom: 10px;
        }
        li {
          list-style: none;
        }
        .section-topslider ul li figure {
          position: relative;
          width: 100%;
          line-height: 0;
        }
        figure img {
          width: 100%;
          float: left;
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
        li.forpurplebg {
          position: relative;
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
        .glblbghd-sts {
          border-bottom: 1px solid #001536;
          margin-top: 24px;
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
        .gridview-story li a figure img {
          height: auto;
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
          //display: inline-block;
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
        .glblbghd-sts .glblbghd-sts-mrnav {
          position: absolute;
          height: 26px;
          line-height: 26px;
          padding: 0 14px;
          border-radius: 5px;
          background: #fff;
          font-size: 11px;
          color: #828282;
          border: 1px solid #828282;
          width: 97px;
          margin: 0;
          top: -5px;
          right: 0;
        }
        .bread_cr_mb {
          font-size: 11px;
          display: inline-block;
          font-weight: 400;
          color: #757575;
        }
      `}</style>
    </>
  );
};
export default CategoryMobile;
