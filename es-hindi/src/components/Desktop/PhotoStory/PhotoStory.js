import React, { useState, useRef } from "react";
import getConfig from "next/config";
import LazyLoad from "react-lazyload";
import Byline from "components/Common/ByLine";
import SocialShare from "components/Desktop/SocialShare";
import { useInView, InView } from "react-intersection-observer";
import parser from "html-react-parser";
import {
    pageEvents,
    imageLoader,
    sectionExtractor
  } from "includes/article.util";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import { photoGallerydateConversion } from "../../../../helper/global";
import LazyLoadImage from "components/Common/CustomImage";

const PhotoStory = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const { isAjax = false, dtype, pageAds = {} } = props;
  const {
    articleData = {},
    category,
    pageNumber,    
    brdSlug = "",
    currentUrl,
  } = props?.data || {};

  const callFired = useRef(false);
  const count = useRef(0);
  const {
    headline,    
    creationDate,   
    agency,
    agency_full: agencyFull,
    author_byline: authorByline = {},    
    byline,
    fms_autopublished,
    section,
    weburl = "",
    story_id: storyId,
    ff_source,
    ff_author_name,
    publish_by,
    images,
    orderbyinfographic,
    updated_at,
    created_at,
  } = articleData;
  
  let {gallery} = articleData;
  gallery = orderbyinfographic === "DESC" ? gallery?.reverse():gallery;
  const publishedBy = articleData["publish_by"]?.[0]?.["english_name"] || "";
  const publishedByWithId =publish_by?.length>0?publishedBy + "_" + publish_by[0]?.ID:'';
  const { ref, inView, entry } = useInView({
    threshold: 0.3,
    fallbackInView: true
  });

  // current url
  const outBrainUrl = (articleData?.url || weburl).replace(
    /https:\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );

  // set current gallery number
  const [currentPage, setCurrentPage] = useState(pageNumber);

  let adInd = 0;

  const updateCurrentPage = (galleryNo) => {
    setCurrentPage(galleryNo);
    pageEvents({
      inView,
      entry,
      isAjax,
      authorByline: authorByline.length
        ? authorByline[0]
        : { language_name: "", author_type: "" },
      byline,
      fms_autopublished,
      creationDate,
      section,
      callFired,
      url: outBrainUrl,
      headline,
      storyId,
      agency,
      ff_source,
      ff_author_name,
      publishedBy,
      articleData,
      publishByFull: publish_by,
      allSections: sectionExtractor(articleData),
      publishedByWithId: publishedByWithId,
    });
  };
  const galleryCount = gallery?.length;

  return (
    <>
      <div className="container clearfix">
        <div className="leftwrap">
          <div>
            <div className="breadcum">
              {category ? (
                <>
                  <a href={publicRuntimeConfig.siteUrl}>HOME</a> /
                  <a href={`${publicRuntimeConfig.siteUrl}photogallery/`}>
                    PHOTO STORY
                  </a>{" "}
                  /
                  <a
                    href={`${publicRuntimeConfig.siteUrl}/photogallery/${category}/`}
                  >
                    {category?.toUpperCase()}
                  </a>{" "}
                  /<h2>{brdSlug}</h2>
                </>
              ) : (
                <>
                  <a href={`${publicRuntimeConfig.siteUrl}`}>HOME</a> /
                  <a href={`${publicRuntimeConfig.siteUrl}photogallery/`}>
                    PHOTO STORY
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="clearfix vsp10"></div>
          <h1 className="phtstrhd">{headline}</h1>
          <div className="">
            <div className="artcl_contents">
              <div className="artcl_contents_img">
                {images?.url != "" && (
                  // <LazyLoad once>
                  //   <img src={images?.url+'?im=Resize,width=518,aspect=fit,type=normal'} alt={images?.caption || "Images"} />
                  // </LazyLoad>
                  <LazyLoadImage
                    src={images?.url}
                    width={518}
                    height={345}
                    alt={images?.caption || "Images"}
                    title={images?.caption || "Images"}
                    isPolicy={false}
                  />
                )}
              </div>
              <div className="article_content_row">
                <div className="artclbyeline">
                  <ul className="artclbyeline-agency">
                    <Byline
                      agency={agency}
                      agencyFull={agencyFull}
                      storyId={storyId}
                    />
                    <li>
                      {" "}
                      LAST UPDATED :&nbsp;
                      <span>
                        {updated_at
                        ?photoGallerydateConversion(updated_at)
                        :photoGallerydateConversion(created_at)
                        }
                      </span>
                    </li>
                    <li className="forauthr">
                      <a href="#">
                        <img
                          src={"https://images.news18.com/ibnkhabar/uploads/2019/09/byeline-editor.jpg"}
                          alt="Editor default picture"
                          title="Editor default picture"
                        />
                      </a>{" "}
                      PUBLISHED BY : <a href="#">{publishedBy}</a>
                    </li>
                  </ul>
                  <SocialShare
                    headline={headline}
                    url={currentUrl || outBrainUrl}
                    story_id={storyId}
                    type="info"
                  />
                </div>
              </div>
            </div>
            {gallery?.length > 0
            && gallery.map((item, ind) => {
                const galleryNo = ind + 1,
                  showAd = galleryNo !== 1 && !(galleryNo % 3);
                showAd && adInd++;
                const caption = parser(item.caption);
                if(galleryCount-1 !== ind) {
                  count.current = count.current + 1;
                }
                return (
                  <>
                    <InView
                      as="div"
                      threshold={0.2}
                      onChange={(inView) =>
                        inView &&
                        currentPage != galleryNo &&
                        updateCurrentPage(galleryNo)
                      }
                    >
                      <div
                        className="ph-glrbox clearfix"
                        id={`gallery-${galleryNo}`}
                        galleryid={storyId}
                      >
                        <div className="photowithdetail">
                          <h2>
                            {/* {orderbyinfographic === "DESC"
                              ? galleryCount - ind
                              : galleryNo} */}
                              {ind+1}
                            . {item.alt}
                          </h2>
                          <div className="photowithdetail-photo">
                            <figure>
                              {/* <LazyLoad once>
                                <img src={item.img+'?im=Resize,width=518,aspect=fit,type=normal'} alt={item.alt || "Images"} />
                              </LazyLoad> */}
                              <LazyLoadImage
                                src={item.img}
                                width={518}
                                height={389}
                                alt={item.alt || "Images"}
                                title={item.alt || "Images"}
                                isPolicy={false}
                              />
                              <h3>{item.dataTitle}</h3>
                            </figure>
                            <p>{caption}</p>
                          </div>
                        </div>
                      </div>
                    </InView>
                  </>
                );
            })}
          </div>
          <Outbrain widgetId="AR_6" widgetSrc={outBrainUrl} />
        </div>
        <div className="rightwrap">
          <RhsCommon
            pageAds={props?.data?.pageAds}
            currentURL={outBrainUrl}
            photoStories={props?.data?.photoStories}
            topStories={props?.data?.topStories||[]}
            astroStories={props?.data?.astroStories}
            section="categorynews"
            panchangData={props?.data?.datedAstroData||[]}
            taboolaList={props?.data?.taboolaList}
            isRss={true}
            isInphoGraphics ={props?.data?.isInphoGraphics}
          />
        </div>

      </div>
      <Taboola
          mode={TaboolaList.photoPage.bottom.mode}
          id={TaboolaList.photoPage.bottom.id}
          container={TaboolaList.photoPage.bottom.container}
          placement={TaboolaList.photoPage.bottom.placement}
        />
      <style jsx global>{`
      body{
        font-family: "Mukta", sans-serif;
      }
        .top_story_left a,
        .blog_list_row .blog_img {
          border-radius: 10px;
          overflow: hidden;
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
        .phtstrhd {
          color: #001d42;
          font-size: 36px;
          line-height: 44px;
        }
        .phtstrtupdt {
          padding: 5px 0;
          display: flex;
          justify-content: space-between;
          border-top: 1px dotted rgb(147, 147, 147);
          border-bottom: 3px solid #d3d3d3;
          margin-top: 8px;
          align-items: center;
        }
        .phtstrtupdt-lft {
          display: flex;
        }
        .phtstrtupdt-lft li {
          color: #454545;
          font-size: 13px;
          font-weight: bold;
          text-transform: uppercase;
          margin-right: 10px;
        }
        .phtstrtupdt-lft li a {
          color: #e1261d;
          font-weight: bold;
        }
        .phtstrtupdt-lft li span {
          font-weight: normal;
          color: #949494;
        }
        .phtstrtupdt-lft li.forauthr {
          font-weight: normal;
          border-left: 1px solid #d3d3d3;
          padding-left: 10px;
        }
        .phtstrtupdt-lft li.forauthr a {
          font-size: 11px;
        }
        .artclbyeline-share {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          text-align: left;
        }
        .artclbyeline-share li {
          color: #6b6b6b;
          font-size: 14px;
          margin-left: 10px;
          text-transform: uppercase;
          line-height: 0;
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
        .spriteshare.gn_icon {
          display: inline-flex;
          width: 40px;
          height: 40px;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          margin-left: 10px;
          background: #fff url(/images/siteimages/news18-hn-sprite-icons.svg)no-repeat;
          background-position: -10px -374px;
        }
        .follow_us {
          border-left: 1px solid rgb(90, 90, 90);
          padding-left: 8px;
          display: flex;
          align-items: center;
        }
        .fl_txt {
          font-size: 11px;
          color: rgb(90, 90, 90);
          width: 30px;
          text-transform: none;
          line-height: 12px;
        }
        .photowithdetail {
          border-bottom: 3px solid #d3d3d3;
          padding: 20px;
        }
        .photowithdetail h2 {
          color: #e1261d;
          font-size: 20px;
          line-height: 28px;
          margin-bottom: 12px;
        }
        .photowithdetail-photo {
          background: #f5f5f5;
          padding: 10px;
        }
        .photowithdetail-photo figure {
          width: 540px;
          line-height: 0;
          overflow: hidden;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #cecece;
          background: #fff;
          padding: 10px;
          position: relative;
          margin: auto auto 12px auto;
        }
        .photowithdetail-photo figure img {
          width: 100%;
        }
        .photowithdetail-photo figure h3 {
          position: absolute;
          background: transparent
            linear-gradient(180deg, #00000000 0%, #000000 100%) 0% 0% no-repeat
            padding-box;
          line-height: 20px;
          font-size: 14px;
          padding: 40px 10px 10px 10px;
          bottom: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          color: #fff;
        }
        .photowithdetail-photo p {
          font-size: 18px;
          line-height: 28px;
          color: #404040;
        }
        .phtstrtupdt-lft li {
          position: relative;
        }
        .phtstrtupdt-lft li:before {
          content: "";
          background: #454545;
          width: 5px;
          height: 5px;
          border-radius: 100%;
          top: 2px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
        .phtstrtupdt-lft li:first-child:before {
          background: #e1261d;
        }
        .phtstrtupdt-lft li:last-child:before {
          display: none;
        }

        /* ****** default css ignore it ******* */
        * {
          margin: 0px;
          padding: 0px;
          box-sizing: border-box;
          list-style: none;
          text-decoration: none;
        }
        /* ****** section css use it ********** */
        img {
          max-width: 100%;
          margin: 0px auto;
          height: auto;
        }
        a {
          color: rgb(40, 40, 40);
        }
        .artcl_contents {
          display: flex;
          -webkit-box-pack: justify;
          justify-content: space-between;
          padding: 10px;
          background: rgb(247, 247, 247);
        }
        .artcl_contents_img {
          padding-left: 0px;
          width: 540px;
          position: relative;
          max-height: 360px;
          height: 360px;
          overflow: hidden;
          background: rgb(0, 0, 0);
          display: flex;
          -webkit-box-pack: center;
          justify-content: center;
        }
        .artcl_contents_img img {
          width: 100%;
        }
        .article_title {
          font-size: 17px;
          line-height: 21px;
          color: rgb(238, 238, 238);
          padding: 10px 10px 5px;
          position: absolute;
          bottom: 0px;
          left: 0px;
          width: 100%;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.8);
          font-family: Mallanna, serif !important;
        }
        .article_content_row {
          width: calc(100% - 560px);
          padding-right: 10px;
        }
        .artclbyeline {
          width: 100%;
        }
        .seconadaryheading {
          height: 140px;
          overflow: hidden;
          font-family: Mallanna, serif;
          margin-bottom: 5px;
          font-size: 20px;
          line-height: 28px;
          color: rgb(64, 64, 64);
          font-weight: 700;
        }
        body .artclbyeline a.readmore {
          display: inline-block;
          padding-left: 0px;
          margin: 0px 0px 5px;
          left: 50%;
          transform: translateX(-50%);
          background: none;
        }
        .artclbyeline-agency {
          border-bottom: 1px dotted rgb(147, 147, 147);
          border-top: 1px dotted rgb(147, 147, 147);
          padding: 3px 0px;
          list-style: none;
          margin: 0px;
          font-size: 13px;
        }
        .artclbyeline-agency li {
          position: relative;
          color: rgb(148, 148, 148);
          text-transform: uppercase;
          font-size: 13px;
          padding: 3px 0px 3px 10px;
          font-weight: normal;
          line-height: 20px;
        }
        .artclbyeline-agency li::before {
          content: "";
          background: rgb(133, 133, 133);
          width: 4px;
          height: 4px;
          border-radius: 100%;
          position: absolute;
          top: 10px;
          left: 0px;
        }
        .artclbyeline-agency li a {
          color: rgb(225, 38, 29);
          text-decoration: none;
          position: relative;
          font-weight: bold;
        }
        .artclbyeline-agency li b {
          font-weight: bold;
          color: rgb(69, 69, 69);
        }
        .artclbyeline-share {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          list-style: none;
          width: 100%;
          text-align: left;
          padding: 12px 0px;
          border-bottom: 1px dotted rgb(147, 147, 147);
          margin-top: 0px;
        }
        .artclbyeline-share li {
          color: rgb(107, 107, 107);
          font-size: 16px;
          margin-left: 10px;
          text-transform: uppercase;
          line-height: 0;
          background-color: rgb(204, 204, 204);
        }
        .artclbyeline-share li:first-child {
          margin-left: 0px;
        }        
        .artclbyeline-author {
          display: flex;
          gap: 15px;
        }
        .artclbyeline-author li {
          font-size: 13px;
          color: rgb(148, 148, 148);
          font-weight: bold;
          margin-top: 8px;
          display: flex;
          align-items: center;
          -webkit-box-align: center;
        }
        #newbyelineAuthordefault {
          margin-right: 8px;
          width: 14px;
          height: 13px;
        }
        .newbyeline-author-intro {
          font-size: 18px;
        }
        a:hover {
          color: rgb(225, 38, 29);
          text-decoration: none;
        }
        /* devanagari start*/
            @font-face {font-family:'Mukta';font-style:normal;font-weight:400;font-display:swap;src:url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
            @font-face {font-family:'Mukta';font-style:normal;font-weight:700;font-display:swap;src:url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
            /* devanagari end*/
            /* latin start*/
            @font-face {font-family: 'Mukta';font-style: normal;font-weight: 400;src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnBrXw_1669353352.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
            @font-face {font-family: 'Mukta';font-style: normal;font-weight: 700;src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
            /* latin end*/
      `}</style>
    </>
  );
};
export default PhotoStory;
