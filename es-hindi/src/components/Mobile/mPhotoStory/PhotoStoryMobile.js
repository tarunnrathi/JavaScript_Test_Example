import React, { useEffect, useRef, useState } from "react";
import getConfig from "next/config";
import { useInView, InView } from "react-intersection-observer";
import {
    pageEvents,   
    sectionExtractor
} from "includes/article.util";
import Head from "next/head";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import useScrollBar from "hooks/useScrollBar";
import parser from "html-react-parser";
import Byline from "components/Common/ByLine";
import { dateConversion } from "../../../../helper/global";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import HeaderMobile from "widgets/Mobile/HeaderMobile";
// import LazyLoad from "react-lazyload";
import { photoGallerydateConversion } from "../../../../helper/global";
import LazyLoadImage from "components/Common/CustomImage";

const PhotoStoryMobile =(props) => {
    const [scroll] = useScrollBar();
    const [isReadMore, setIsReadMore] = useState(-1);
    const [clickShareIcon, setClickShareIcon] = useState(false);
    const [port, setPort] = useState(0);
    const { publicRuntimeConfig } = getConfig();
    const { isAjax = false } = props;
    const {
        articleData = {},
        category,
        brdSlug = "",
        currentUrl,        
    } = props?.data || {};

    const callFired = useRef(false);    
    const {
        headline,        
        creation_date2,
        agency,
        agency_full: agencyFull,
        author_byline: authorByline = {},
        publish_by = [],
        byline,
        fms_autopublished,
        section,
        weburl = "",        
        story_id: storyId,
        ff_source = "",
        ff_author_name,
        images,
        orderbyinfographic,
        updated_at,
        created_at,
    } = articleData;
    let {gallery} = articleData;
    gallery = orderbyinfographic === "DESC" ? gallery?.reverse():gallery;
    const publishedBy = articleData["publish_by"]?.[0]?.["english_name"] || "";
    // current url
    const outBrainUrl = weburl.replace(
        /https:\/\/(stg|beta)?hindi.news18.com\//,
        publicRuntimeConfig.siteUrl
    );
    const getGalleryAd = (adInd, isFirst, storyId) => {
        const sizes = [[320, 50], [360, 50]];
        return (
          <SiteAd
            slotId={`mobileAdNew300x250_${storyId}_${adInd}`}
            adUnit={`NW18_HIND_PWA/NW18_HIND_PHOTO_PWA/NW18_HIND_PHOTO_STORIES_PWA_AS/NW18_HIND_PHT_STRYS_AS_PWA_ROS_ATF_320`}
            sizes={sizes}
            width={320}
            isPhotos={true}
            height={50}
            removeAdSpan={true}
            style={{ height: "60px", background: '#f5f5f5' }}
            className='topmblstkbnr'
          />
        );
    };
    const toggleReadMore = (e, index) => {
        e.preventDefault();
        ga(
          "send",
          "event",
          "photo_listing",
          "Click_read_more",
          headline + "," + storyId + "," + parseInt(index) + parseInt(1)
        );
        setIsReadMore(index);
        document.body.classList.add("adclsbody");
    };
    const closePopup = (event) => {
        document.body.classList.remove("adclsbody");
        setIsReadMore(-1);
    };
    const ToggleButton=() => {
        setClickShareIcon(!clickShareIcon);
    };
    const firstView = (
        <div className="views">
          <div>
            <Head>
                <meta name="robots" content="max-image-preview:large" />
            </Head>
            <HeaderMobile
             menuData={ props?.data?.menuData}
             trending={props?.data?.menuData?.["MENU-L2"] || []}
            />
            <div className="ad-holder"></div>
            {getGalleryAd(0, true)}
            <div className="breadcum">
              {category && category != "" ? (
                <>
                  <a href="/">Home / </a>
                  <a href="/photogallery/">PHOTO STORY / </a>
                  <a href={`/photogallery/${category}`}>{category}</a>
                  {" / "}
                  <h2>{brdSlug}</h2>
                </>
              ) : (
                <>
                  <a href="/">Home / </a>
                  <a href="/photogallery/">Photo / </a>
                </>
              )}
            </div>
            <h1
              className={
                scroll > 100 ? "phtstrhdmb phtstrhdmb-stick" : "phtstrhdmb"
              }
            >
              {headline}
            </h1>
            <div className="add">
              <div className="ad-container">
                <div className="addinner-box">
                  <SiteAd
                    width={336}
                    height={280}
                    slotId={`ATF_300`}
                    adUnit={props?.data?.pageAds?.ATF_300}
                    sizes={[[300, 250], [336, 280], [250, 250]]}
                    //lazyload={true}
                  />
                </div>
              </div>
            </div>            
            {props?.data?.pageAds && props?.data?.pageAds.PG_1x1_2 !== "" && (
              <SiteAd
                slotId="PG_1x1_2"
                adUnit={props?.data?.pageAds?.PG_1x1_2}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                loadonScroll={true}
              />
            )}
            {props?.data?.pageAds && props?.data?.pageAds.PG_1x1_3 !== "" && (
              <SiteAd
                slotId="PG_1x1_3"
                adUnit={props?.data?.pageAds?.PG_1x1_3}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                loadonScroll={true}
              />
            )}
            {/* Full photo story start  */}
            {images.url !== "" && (
              <div className={"photowithdetail"}>
                <figure className="featureHeight">
                  {/* <LazyLoad once>
                    <img src={images.url+'?im=Resize,width=420,aspect=fit,type=normal'} alt={images.caption || "Images"} />
                  </LazyLoad> */}
                  <LazyLoadImage
                    src={images.url}
                    width={420}
                    height={285}
                    alt={images.caption || "Images"}
                    title={images.caption || "Images"}
                    isPolicy={false}
                  />
                </figure>
              </div>
            )}
          </div>
        </div>
    );

    const pageRefs =
    gallery &&
    gallery.length &&
    gallery.reduce((acc, value, ind) => {
      acc[ind + 1] = useRef();
      return acc;
    }, {});

    const { ref, inView, entry } = useInView({
        threshold: 0.3,
        fallbackInView: true,
    });

    useEffect(() => {
        const publishedBy = publish_by.length ? publish_by[0]?.english_name : '';
        const publishedByWithId = publishedBy+"_"+publish_by[0]?.ID;
        pageEvents({
          inView,
          entry,
          isAjax,
          authorByline,
          byline,
          fms_autopublished,
          section,
          callFired,
          url: outBrainUrl,
          headline,
          storyId,
          agency,
          ff_source,
          ff_author_name,
          publishedBy: publishedBy,
          articleData,
          publishByFull: publish_by,
          category,
          allSections: sectionExtractor(articleData),
          publishedByWithId: publishedByWithId,
        });
      }, [inView]);

    let adInd = 0;
    const galleryCount = gallery?.length;

    const photoViews = gallery?.length >0 ? gallery.map((item, ind) => {
      const galleryNo = ind + 1,
      showAd = galleryNo !== 1 && galleryNo % 2;
      showAd && adInd++;
      const captionObj = { state: true, value: item.caption };
      const caption = parser(captionObj.value);
      return (
        <div className="views" key={galleryNo} style={{ paddingTop: '190px' }}>
        <InView
          as="div"
          className="inviewDiv"
          threshold={0.2}
        >
          <div
              className="pht-artcl-img"
              id={`gallery-${galleryNo}`}
              galleryid={storyId}
              ref={pageRefs[galleryNo]}
            >
              <div className="photowithdetail photowithdetail-in">
                <h2>
                  {/* {orderbyinfographic == "DESC"
                    ? galleryCount - ind
                    : galleryNo} */}
                    {ind+1}
                  . {item.alt}
                </h2>
                <figure>
                  {/* <LazyLoad once>
                    <img src={item.img+'?im=Resize,width=420,aspect=fit,type=normal'} alt={item.alt || "Images"} />
                  </LazyLoad>                   */}
                  <LazyLoadImage
                    src={item.img}
                    width={420}
                    height={285}
                    alt={item.alt || "Images"}
                    title={item.alt || "Images"}
                    isPolicy={false}
                  />
                  <h3>{item.dataTitle}</h3>
                </figure>
                <div className='moretxtdiv'>
                  {caption}
                    <div
                      className={
                        ind === isReadMore
                          ? "moretext adclsmoretext"
                          : "moretext"
                      }
                    >
                      <div className="inviewDiv">
                          <h4>
                            {orderbyinfographic == "DESC"
                              ? galleryCount - ind
                              : galleryNo}
                            . {item.alt}
                          </h4>
                          <span>{caption}</span>
                      </div>
                      <a onClick={closePopup} className="moretextclose">
                        X
                      </a>
                    </div>
                    {caption?.length>140 && (
                      <a
                      onClick={(e) => {
                        toggleReadMore(e, ind);
                      }}
                      className="clickformoretext"
                    >
                      {/* {isReadMore == -1 ? "...और भी पढ़ें" : ""} */}
                      {"...और भी पढ़ें"}
                    </a>
                    )}

                </div>
              </div>
          </div>
          </InView>
        </div>
      );
    }):[];
    const authorView = (
      <div className="tabolaviews">
      <div className="clearfix add" style={{ padding: '16px 0px' }}>
        <div className="addinner-box addinner_box_300x250">
          <SiteAd
            width={336}
            height={280}
            slotId={`BTF_300`}
            adUnit={props?.data?.pageAds?.BTF_300}
            sizes={[
              [300, 250],
              [336, 280],
              [250, 250]
            ]}
          />
        </div>
        </div>
          <ul className="phtstrtupdt">
            <Byline agency={agency} agencyFull={agencyFull} storyId={storyId} />
            <li>
              • LAST UPDATED :{" "}
              <span>
              {updated_at
              ?photoGallerydateConversion(updated_at)
              :photoGallerydateConversion(created_at)
              }
              </span>
            </li>
            <li className="forauthr">
            • <a href="#">
              <img
                  src={"https://images.news18.com/ibnkhabar/uploads/2019/09/byeline-editor.jpg"}
                  alt="Editor default picture"
                  title="Editor default picture"
              ></img>
              </a>{" "}
              PUBLISHED BY : <a href="#">{publishedBy}</a>
            </li>
            <li>
              • FIRST PUBLISHED :{" "}
              <span>
                {dateConversion(creation_date2)}
              </span>
            </li>
          </ul>
          <Taboola
            mode={TaboolaList.photoPage.bottom.mode}
            id={TaboolaList.photoPage.bottom.id}
            container={TaboolaList.photoPage.bottom.container}
            placement={TaboolaList.photoPage.bottom.placement}
          />
      </div>
    );
    const views = [firstView, ...photoViews, authorView];
    useEffect(() => {
        const el = document.querySelector(".topmblstkbnr");
        const pl = document.querySelector(".ad-holder");
        if (window.scrollY && el && pl && scroll > 100) {
          el.classList.add("top-fixed-ad");
          pl.classList.add("show");
        } else if (el && pl) {
          el.classList.remove("top-fixed-ad");
          pl.classList.remove("show");
        }
        setPort(window.innerHeight);
    }, [scroll]);   

    const whatsappLink = "https://web.whatsapp.com/send?text=" + headline + "-" + currentUrl;
    const facebookLink =
        "https://www.facebook.com/sharer.php?u=" + currentUrl + "&t=" + headline;
    const telegramLink =
        "https://telegram.me/share/url?url=" + headline + "-" + currentUrl;
    const twitterLink =
        "https://twitter.com/share?text=" + headline + "&url=" + currentUrl;
    const linkedinLink =
        "https://www.linkedin.com/shareArticle/?mini=true&url=" + currentUrl;

    return(
        <>
        {views.map((v, index) => {
          return(
            <React.Fragment key={index}>
              {v}
            </React.Fragment>
          );
        })}
        <ul
        className={
          clickShareIcon === false ? "phtstrshr" : "phtstrshr adclsshowall"
        }
      >
        <li>
          <span
            className="exitclick"
            onClick={() => {
              setTimeout(function () {
                window.scrollTo(0, 1);
              }, 100);
            }}
          />
        </li>
        <li
          onClick={() =>
            ga(
              "send",
              "event",
              "Social_Share",
              "Click_Photo_listing",
              headline + "," + storyId + ",whatsapp"
            )
          }
        >
          <a className="for-whatsapp" href={whatsappLink} target="_blank">
            <span className="spriteshare art-whatsapp-icon"></span>
          </a>
        </li>
        <li
          onClick={() =>
            ga(
              "send",
              "event",
              "Social_Share",
              "Click_Photo_listing",
              headline + "," + storyId + ",moreshr"
            )
          }
        >
          <span className="for-moreshr" onClick={ToggleButton}></span>
        </li>
        <li
          onClick={() =>
            ga(
              "send",
              "event",
              "Social_Share",
              "Click_Photo_listing",
              headline + "," + storyId + ",facebook"
            )
          }
        >
          <a href={facebookLink} target="_blank">
            <span className="spriteshare art-facebook-icon"></span>
          </a>
        </li>
        <li
          onClick={() =>
            ga(
              "send",
              "event",
              "Social_Share",
              "Click_Photo_listing",
              headline + "," + storyId + ",telegram"
            )
          }
        >
          <a href={telegramLink} target="_blank">
            <span className="spriteshare art-telegram-icon"></span>
          </a>
        </li>
        <li
          onClick={() =>
            ga(
              "send",
              "event",
              "Social_Share",
              "Click_Photo_listing",
              headline + "," + storyId + ",twitter"
            )
          }
        >
          <a href={twitterLink} target="_blank">
            <span className="spriteshare art-twitter-icon"></span>
          </a>
        </li>
        <li
          onClick={() =>
            ga(
              "send",
              "event",
              "Social_Share",
              "Click_Photo_listing",
              headline + "," + storyId + ",linkedin"
            )
          }
        >
          <a href={linkedinLink} target="_blank">
            <span className="spriteshare art-linkedin-icon"></span>
          </a>
        </li>
      </ul>
      <style jsx global>{`
          .add {
              background: #dbdde3;
              position: relative;
              padding: 0px 0px;
              line-height: 0;
              text-align: center;
              display: inline-block;
              width: 100%;
              z-index: 1;
              color: #797e90 !important;
              height: 280px;
              overflow: hidden;
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
              color: #797e90 !important;
              font-size: 11px;
              line-height: 16px;
            }
          .inviewDiv {
              width:100%
          }
          .fleft {
          float: left;
          }
          .fright {
          float: right;
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
          body {
          font-family: "Mallanna", sans-serif;
          }
          // wrapper
          .wrapper {
          margin-bottom: 60px;
          }

          // breadcrumb
          .brdcrmb {
          font-size: 11px;
          color: #757575;
          text-transform: uppercase;
          line-height: 18px;
          position: relative;
          padding: 10px 16px;
          }
          .brdcrmb a {
          padding: 0 5px 0 0;
          color: #757575;
          font-weight: 400;
          }

          // Full photo story
          .phtartcl-body {
          background: #161616;
          padding-bottom: 10px;
          }
          .pht-artcl-top {
          border-bottom: 1px solid #454545;
          padding: 12px 16px;
          position: relative;
          }
          .pht-artcl-top .heading {
          color: #fff;
          font-size: 22px;
          line-height: 30px;
          font-weight: 700;
          margin: 8px 0;
          }
          .pht-artcl-top .sub-heading {
          font-size: 16px;
          color: #fff;
          }
          .phtartcl-body .pht-newbyeline-agency {
          font-size: 10px;
          line-height: 14px;
          color: #959595;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          border: 0;
          text-transform: uppercase;
          }
          .phtartcl-body .pht-newbyeline-agency li:first-child {
          margin-right: 4px;
          }
          .phtartcl-body .pht-newbyeline-agency li a {
          color: #959595;
          }
          .pht-artcl-share {
          font-size: 12px;
          color: #fff;
          padding: 16px 32px;
          // To make share div stick at the top
          position: sticky;
          top: 0;
          z-index: 12;
          background: #000;
          }
          .pht-artcl-share .artcl-count {
          margin-top: 12px;
          }
          .pht-artcl-share .share-icon {
          display: flex !important;
          justify-content: space-between;
          }
          .pht-artcl-img img {
          height: auto;
          overflow: hidden;
          position: relative;
          vertical-align: middle;
          text-align: center;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: block;
          height: 0;
          max-height: 100%;
          max-width: 100%;
          min-height: 100%;
          min-width: 100%;
          width: 0;
          margin: auto;
          object-fit: fill;
          }
          .pht-artcl-img-txt {
          color: #fff;
          font-size: 14px;
          line-height: 22px;
          padding: 12px 16px 16px;
          overflow: hidden;
          position: relative;
          }
          .aglikhabar {
          border-bottom: 2px solid #ee1c25;
          background: #161616;
          box-sizing: border-box;
          font-size: 17px;
          font-weight: 700;
          padding: 0 0 0 16px;
          position: relative;
          line-height: 28px;
          height: 32px;
          width: 100%;
          clear: both;
          float: left;
          color: #fff;
          margin-bottom: 16px;
          }
          .aglikhabar::before {
          content: "";
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid #ee1c25;
          position: absolute;
          bottom: -10px;
          left: 20px;
          }
          // ad container
          .ad-container {
          position: relative;
          padding: 16px 0;
          line-height: 0;
          text-align: center;
          background: #dbdde3 !important;
          z-index: 1;
          }
          .ad-inner-box {
          background: #e8e9ed;
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: auto;
          padding: 0;
          box-sizing: border-box;
          }
          .ad-inner-box span {
          color: #797e90;
          font-size: 11px;
          text-align: center;
          padding: 2px 0 0;
          display: block;
          line-height: 16px;
          }
          .aurpadhe-text {
          border-bottom: 1px solid #565656;
          text-align: center;
          line-height: 16px;
          color: #959595;
          font-size: 12px;
          display: block;
          background: #161616;
          margin: -16px 16px 24px;
          }
          .aurpadhe-text span {
          background: #161616;
          padding: 0 8px;
          display: inline-block;
          position: relative;
          top: 10px;
          }
          .brdcrmb h2 {
          color: #757575;
          font-size: 11px;
          font-weight: 400;
          }
          body {
          margin: auto;
          font-family: "Mukta", sans-serif;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          ul,
          table,
          figure {
          margin: 0;
          padding: 0;
          }
          li {
          list-style: none;
          }
          a {
          text-decoration: none;
          }
          a img {
          border: none;
          }
          * {
          box-sizing: border-box;
          }
          html,
          body {
          height: 110%;
          }
          .mblhdr {
          line-height: 0;
          }
          .topmblstkbnr {
            height:60px;
            padding:5px;
          line-height: 0;
          display: flex;
          justify-content: center;           
          background: #f5f5f5;
          border-bottom: 1px solid #e4e4e4;
          position: sticky;
          top: 0;
          z-index: 999;
          }
          
          .phtstrhdmb {
          color: #001d42;
          font-size: 28px;
          line-height: 32px;
          padding: 10px 15px;
          position: sticky;
          top: 61px;
          z-index: 99;
          }
          .phtstrhdmb.phtstrhdmb-stick {
          height: 32px;
          line-height: 32px;
          background: #ebebeb;
          font-size: 15px;
          padding: 0px;
          display: block;
          position: fixed;
          width: 100%;
          margin-top: -1px;
          overflow: hidden;
          left: 0px;
          text-align: center;
          }
          .phtstrslidemb {
          overflow: hidden;
          }
          .phtstrslidemb.phtstrslidemb-stick .slick-list {
          position: relative;
          top: 50px;
          }
          .phtstrslidemb li {
          }
          .phtstrslidemb li img {
          width: 100%;
          }
          .phtstrslidemb .slick-arrow {
          display: none !important;
          }
          .photowithdetail {
          padding: 15px;            
          }
          .photowithdetail h2 {
          color: #e1261d;
          font-size: 20px;
          line-height: 28px;
          margin-bottom: 12px;
          }
          .photowithdetail figure {
          line-height: 0;
          overflow: hidden;
          position: relative;
          margin: 0 -15px 10px -15px;
          height: 50vh;
          }
          .photowithdetail figure img {
          width: 100%;
          }
          .photowithdetail figure h3 {
          position: absolute;
          background: transparent linear-gradient(180deg, #00000000 0%, #000000 100%) 0% 0% no-repeat padding-box;
          line-height: 20px;
          font-size: 14px;
          bottom: 0px;
          left: 0px;
          right: 0px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          color: #fff;
          text-align: center;
          padding: 40px 10px 10px 10px;
          }
          .photowithdetail .moretxtdiv {
          font-size: 16px;
          line-height: 26px;
          color: #404040;
          // height: 80px;
          overflow: hidden;
          position: relative;
          }
          .phtstrslidemb li:first-child .photowithdetail {
          border: none;
          }
          .phtstrslidemb li:first-child .photowithdetail h2 {
          color: #e1261d;
          font-size: 20px;
          line-height: 28px;
          margin-bottom: 12px;
          }
          .phtstrslidemb li:first-child .photowithdetail .moretxtdiv {
          display: block;
          }
          .phtstrslidemb .slick-slide {
          height: 100vh !important;
          }
          .phtstrslidemb li {
          }

          .phtstrshr {
          width: 40px;
          background: #52ba63 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000066;
          border: 1px solid #ffffff;
          border-radius: 6px 0px 0px 6px;
          position: fixed;
          top: 40%;
          right: 0px;
          z-index: 111;
          overflow: hidden;
          }
          .phtstrshr li {
          display: none;
          }
          .phtstrshr li:nth-child(1),
          .phtstrshr li:nth-child(2),
          .phtstrshr li:nth-child(3) {
          display: block;
          }
          .phtstrshr.adclsshowall li {
          display: block;
          }
          .spriteshare {
            background: url(/images/siteimages/news18-hn-sprite-icons.svg)no-repeat;
          width: 40px;
          height: 40px;
          display: block;
          }
          .spriteshare.art-facebook-icon {
          background-position: -97px -4px;
          }
          .spriteshare.art-twitter-icon {
          background-position: -139px -4px;
          }
          .spriteshare.art-linkedin-icon {
          background-position: -181px -4px;
          }
          .spriteshare.art-whatsapp-icon {
          background-position: -9px -113px;
          }
          .spriteshare.art-telegram-icon {
          background-position: -226px -4px;
          }
          .spriteshare.art-email-icon {
          background-position: -9px -162px;
          }
          .for-moreshr {
          background: #343434;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          }
          .for-moreshr:before {
          content: "";
          position: absolute;
          display: block;
          width: 16px;
          height: 18px;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/shareiconnew_1658309142.svg)
              0 0 no-repeat;
          }
          .for-moreshr:after {
          content: "-";
          position: absolute;
          display: none;
          }
          .for-moreshr.adclsmoreshr {
          }
          .for-moreshr.adclsmoreshr:before {
          display: none;
          }
          .for-moreshr.adclsmoreshr:after {
          display: block;
          width: 12px;
          height: 2px;
          background: #fff;
          }
          .moretext {
          display: none;
          position: fixed;
          background: rgba(0, 0, 0, 0.9);
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9999;
          }
          .moretext div {
          }
          .moretext div h4 {
          color: #e1c31d;
          font-size: 20px;
          line-height: 28px;
          margin-bottom: 5px;
          }
          .moretext div span {
          color: #fff;
          font-size: 18px;
          line-height: 28px;
          }
          .clickformoretext {
          background: #fff;
          color: #e1261d;
          font-size: 16px;
          font-weight: bold;
          padding: 0 5px;
          line-height: 30px;
          }
          .moretext.adclsmoretext {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px;
          }
          .moretextclose {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          line-height: 45px;
          color: #fff;
          display: block;
          text-align: center;
          font-size: 18px;
          }
          body.adclsbody {
          overflow: hidden;
          }
          .mblftr {
          background: #f5f5f5;
          padding: 5px 0;
          display: flex;
          justify-content: center;
          position: sticky;
          bottom: 0;
          }
          .phtstrtupdt {
          padding: 15px 0px;
          border-top: 3px solid #d3d3d3;
          
          }
          .phtstrtupdt.nbdr {
          border-top: none;
          padding-top: 0;
          border-bottom: 5px solid #d3d3d3;
          }
          .phtstrtupdt li {
          padding: unset !important;
          color: #454545;
          font-size: 13px;
          font-weight: bold;
          text-transform: uppercase;
          line-height: 22px;
          }
          .phtstrtupdt li a {
          color: #e1261d;
          font-weight: bold;
          }
          .phtstrtupdt li span {
          font-weight: normal;
          color: #949494;
          }
          .phtstrtupdt li.forauthr {
          font-weight: normal;
          border-top: 1px dashed #d3d3d3;
          border-bottom: 1px dashed #d3d3d3;
          padding: 10px 0;
          margin-top: 10px;
          }
          .phtstrtupdt li.forauthr img {
          margin-right: 5px;
          position: relative;
          top: 1px;
          width: auto;
          display: inline-block;
          }
          .phtstrtupdt li.forauthr a {
          font-size: 15px;
          }
          .phtstrtags {
          border-bottom: 1px dashed #d3d3d3;
          margin: 0 15px 15px 15px;
          padding-bottom: 10px;
          }
          .phtstrtags h3 {
          color: #404040;
          font-size: 16px;
          line-height: 28px;
          }
          .phtstrtags div a {
          color: #0076bf;
          font-size: 16px;
          line-height: 28px;
          text-decoration: underline;
          margin-right: 10px;
          }
          .btnvav {
          display: none !important;
          }
          .ftrad {
          bottom: 0px !important;
          }
          .slick-vertical .slick-slide {
          height: 420px;
          }
          .featureimage {
          display: none;
          }
          .featureHeight {
          height: 300px !important;
          }
          footer {
          display: none !important;
          }
          .exitclick {
          position: fixed;
          top: 40%;
          width: 40px;
          height: 40px;
          background: #e1261d;
          z-index: 999;
          right: 0px;
          margin-top: -41px;
          border-radius: 4px 0 0 4px;
          border: 1px solid #eee;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          }
          .exitclick:before {
          content: "";
          width: 10px;
          height: 10px;
          border-left: 2px solid #fff;
          border-top: 2px solid #fff;
          display: block;
          transform: rotate(45deg);
          position: relative;
          top: 3px;
          left: 1px;
          }
          .top_links_cont {
          position: static !important;
          }
          .views {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          scroll-snap-align: start;
          }
          .tabolaviews {
            position: relative;
            scroll-snap-align: start;
            z-index:1;
            padding: 110px 10px 10px 10px;              
            }
          .views > div {
          position: relative;
          height: 100vh;
          overflow: hidden;
          }
          html {
          scroll-snap-type: y mandatory;
          }
          .top-fixed-ad {
          position: fixed;
          margin: 0 auto;
          top: 0;
          left: 0;
          right: 0;
          }
          .ad-holder {
          display: none;
          height: 60px;
          }
          .show {
          display: block;
          }
          .ftrad {
          display: block !important;
          }
          .photowithdetail-in,
          .phtstrtupdt {
          
          }

          a.clickformoretext {
            position: absolute;
            right: 0px;
            bottom: 0px;
            display: block;
            height: 20px;
            line-height: 20px;
          }
          body .moretext.adclsmoretext {
          display: flex;
          padding: 15px;
          top: initial;
          align-items: flex-start;
          height: 33vh;
          z-index: 10;
          bottom: 63px;
          overflow:scroll;
          }

          .show_full > a {
          display: none !important;
          }

          /* *** fallback **** */
          @media all and (max-width: 767px) {
          .photowithdetail-in .moretxtdiv {
              height: 73px;
          }
          }

          /* *** iphone 6/7/8 Plus **** */
          @media all and (max-width: 414px) and (max-height: 736px) {
          .photowithdetail-in,
            {
              margin-top: 150px;
          }
          }

          @media all and (max-width: 394px) and (max-height: 728px) {
          .photowithdetail-in,
          {
              margin-top: 120px;
          }
          }

          @media all and (max-width: 393px) and (max-height: 719px) {
          .photowithdetail-in,
            {
              margin-top: 110px;
          }
          }

          /* *** pixel 5 **** */
          @media all and (max-width: 393px) and (max-height: 851px) {
          }

          /* *** iphone 12 pro **** */
          @media all and (max-width: 390px) and (max-height: 844px) {
          .photowithdetail-in,
            {
              margin-top: 150px;
          }
          }

          @media all and (max-width: 384px) and (max-height: 713px) {
          .photowithdetail-in,
            {
              margin-top: 125px;
          }
          }

          @media all and (max-width: 360px) and (max-height: 670px) {
          .photowithdetail-in,
            {
              margin-top: 120px;
          }
          }

          /* *** iphone X **** */
          @media all and (max-width: 375px) and (max-height: 812px) {
          }
          /* *** iphone SE/6/7/8 **** */
          @media all and (max-width: 375px) and (max-height: 667px) {
            {
              margin-top: 150px;
          }
          }
      `}</style>

          <style jsx global>{`
          /* *** iphone 6/7/8 Plus **** */
          // @media all and (max-width: 414px) and (max-height: 736px) {
          // .photowithdetail-in .moretxtdiv {
          //     height: calc(${port}px - 690px);
          // }
          // }

          // @media all and (max-width: 415px) and (max-height: 800px) {
          // .photowithdetail-in .moretxtdiv {
          //     height: calc(${port}px - 668px);
          // }
          // }

          // @media all and (max-width: 394px) and (max-height: 728px) {
          // .photowithdetail-in .moretxtdiv {
          //     height: calc(${port}px - 630px);
          // }
          // }
          // @media all and (max-width: 393px) and (max-height: 719px) {
          // .photowithdetail-in .moretxtdiv {
          //     height: calc(${port}px - 645px);
          // }
          // }
          @media all and (max-width: 361px) and (max-height: 665px) {
          .photowithdetail-in .moretxtdiv {
              height: calc(${port}px - 590px);
          }
          }
          /* devanagari start*/
          @font-face {font-family:'Mukta';font-style:normal;font-weight:400;font-display:swap;src:url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
          @font-face {font-family:'Mukta';font-style:normal;font-weight:700;font-display:swap;src:url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
          /* devanagari end*/
          /* latin start*/
          @font-face {font-family: 'Mukta';font-style: normal;font-weight: 400;src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnBrXw_1669353352.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
          @font-face {font-family: 'Mukta';font-style: normal;font-weight: 700;src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
          /* latin end*/
          .TABOOLA{
            position:relative;
            z-index:1;
          }
          @media screen and (min-width: 768px) and (max-width: 912px){.clickformoretext{display:none !important;}}
      `}</style>
      </>
    );

};

export default PhotoStoryMobile;
