import React from "react";
import HeadingSection from "widgets/Mobile/newLiveBlogMobile/HeadingSection";
import LiveFeedRow from "widgets/Mobile/newLiveBlogMobile/LiveFeedRow";
// import getConfig from "next/config";
// import ReactHtmlParser from "html-react-parser";
import ampHelper from "includes/Amp/ampHelper";
import Head from "next/head";
import {
  /* findIndexOfCharFromLast,  */ relatedCard,
  imageLoader,
} from "includes/article.util";
import validator from "includes/Amp/validator";
import RhsPhoto from "widgets/Common/Responsive/RhsPhoto";
// import englishVariables from "includes/lang.helper.js";
// import InstallAppIcon from "widgets/Mobile/InstallAppIcon";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const LiveBlog = (props) => {
  const { pageSeo } = props;
  const {
    articleData = {},
    topstories,
    paramObj = "",
    photoStories,
    breadCrumbArray,
  } = props?.data || {};
  const { liveUpdates, pageNumber, relatedArticles } = articleData;
  // const { publicRuntimeConfig } = getConfig();
  // const headline = articleData?.headline;

  const posts = liveUpdates?.posts;
  const breakIt = posts?.length >= 10;
  // const url = props?.data?.paramObj?.requestURL;

  // const indexOfDot = findIndexOfCharFromLast(url, ".");

  // const beforeDot = url.slice(0, indexOfDot);
  // const afterDot = url.slice(indexOfDot + 1);

  // let currentURL = beforeDot.replace("/amp", "") + "-page-2." + afterDot;
  // currentURL = currentURL.includes("localhost")
  //   ? currentURL.replace("https", "http")
  //   : currentURL;

  const newBody = validator(ampHelper.getAMPCodes(articleData?.body));
  // const fullArrayBody = newBody && newBody.split("<p>");

  const first = newBody && newBody.split("<p>").join("<p>");

  // const second = breakIt
  //   ? newBody &&
  //     newBody.split("<p>").slice(2, fullArrayBody?.length).join("<p>")
  //   : "";

  const stickyList = liveUpdates?.sticky || [];
  const ampAds = ampHelper.get_amp_ad_article(
    paramObj?.subCategory,
    "LiveBlog",
    "article"
  );
  const adTarget = ampHelper.get_ad_targetting(
    articleData,
    paramObj,
    pageSeo,
    "news"
  );
  const tabs = liveUpdates?.highlight.length
    ? ["लाइव अपडेट", "Key Events"]
    : ["लाइव अपडेट"];
  const tapArray = ["tap:tab_1.show,tab_2.hide", "tap:tab_1.hide,tab_2.show"];
  const highlights = liveUpdates?.highlight.sort((h1, h2) => {
    const date1 = new Date(h1.updated_at);
    const date2 = new Date(h2.updated_at);
    return date2 - date1;
  });
  const keyPanelData = [...stickyList, ...posts].sort((h1, h2) => {
    const date1 = new Date(h1.updated_at);
    const date2 = new Date(h2.updated_at);
    return date2 - date1;
  });
  return (
    <>
      <Head>
        <link
          rel="preload"
          href={imageLoader(articleData?.images?.url, 470, 300, false, "fill")}
          as="image"
        />
        <meta
          property="og:category"
          content={props.data?.paramObj.category || ""}
        />
      </Head>
      <div>
        <div className="LiveBlog_outer">
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />

          <HeadingSection
            data={articleData}
            breakIt={breakIt}
            isAmp={true}
            paramObj={props.data?.paramObj}
            pageSeo={props.data?.paramObj}
            pageNumber={pageNumber}
            first={first}
            keyPanelData={highlights}
            stickyList={stickyList}
          />
          {/* <KeyEvents data={liveUpdates?.posts} isAmp={true} /> */}
          <div className="feedsWrapper" id="feedWrapper">
            <amp-selector layout="container">
              <ul className="tabs">
                {tabs.map((data, idx) => {
                  const selected = idx === 0 ? true : false;
                  return (
                    <li key={idx}>
                      <a
                        on={tapArray[idx]}
                        option={idx + 1}
                        selected={selected}
                      >
                        {data}
                      </a>
                    </li>
                  );
                })}
                {/* <li class="tab-links" onclick="MyTab(event, 'Highlight', 'feedWrapper')"><a href="javascript:void(0);">Highlight</a></li>
                <li class="tab-links" onclick="MyTab(event, 'Comments', 'feedWrapper')"><a href="javascript:void(0);">Comments</a></li>
                <li class="tab-links" onclick="MyTab(event, 'Related', 'feedWrapper')"><a href="javascript:void(0);">Related</a></li> */}
              </ul>
            </amp-selector>
            {/* { true  ? (
            <div className="updateBtn">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  updatePosts();
                }}
                className="news_updates"
              >
                <i className="sprite_cls"></i>
                {5} new updates
              </a>
            </div>
          ) : (
            ""
          )} */}
            <div className="pcw">
              {/* <!---Live Feed----> */}
              <div className="tab_1 LiveFeed" id="tab_1">
                {/* {stickyList?.length > 0 && stickyList?.map((post, index) => {
                  return (
                    <React.Fragment key={"stickyList" + index}>
                      <LiveFeedRow
                        data={post}
                        articleData={articleData}
                        isAmp={true}
                        stories={relatedArticles}
                        index={3}
                      />
                    </React.Fragment>
                  );
                })} */}
                <amp-live-list
                  layout="container"
                  data-poll-interval="30000"
                  data-max-items-per-page="20"
                  id="amp-live-blog-n18"
                >
                  <button
                    className="news_updates"
                    update={""}
                    on="tap:amp-live-blog-n18.update"
                    type="button"
                  >
                    <span className="sprite_cls"></span>Live Updates
                  </button>
                  <div items={""}>
                    {keyPanelData?.length > 0 &&
                      keyPanelData.map((feed, index) => {
                        return (
                          <React.Fragment key={"posts" + index}>
                            <LiveFeedRow
                              data={feed}
                              articleData={articleData}
                              isAmp={true}
                              stories={relatedArticles}
                              index={index}
                            />
                          </React.Fragment>
                        );
                      })}
                  </div>
                </amp-live-list>
                {liveUpdates?.total && (
                  <div className="updateBtn">
                    <a href={pageSeo?.canonical}>अगले पेज पर जाएँ</a>
                  </div>
                )}
              </div>
              {highlights?.length > 0 && (
                <div className="tab_2" id="tab_2" hidden>
                  {highlights.map((feed, index) => (
                    <React.Fragment key={"posts" + index}>
                      <LiveFeedRow
                        data={feed}
                        articleData={articleData}
                        isAmp={true}
                        stories={relatedArticles}
                        index={index}
                      />
                    </React.Fragment>
                  ))}
                </div>
              )}
              <div className="ad-container">
                <div
                  style={{
                    height: "280px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <amp-ad
                    width={336}
                    height={280}
                    type="doubleclick"
                    data-slot={ampAds?.middleAd2}
                    json={adTarget}
                    data-multi-size="300x250,336x280"
                    data-lazy-fetch="true"
                    data-loading-strategy="1"
                    data-multi-size-validation="false"
                    rtc-config='{ "vendors": {"openwrap": { "PROFILE_ID" : "2059", "PUB_ID" : "113941" },"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  } },"timeoutMillis": 1000}'
                  ></amp-ad>
                </div>
              </div>
              <div
                className={"tops"}
                dangerouslySetInnerHTML={{
                  __html: relatedCard(topstories, false, true, "टॉप स्टोरीज"),
                }}
              ></div>
              <RhsPhoto photoStories={photoStories} />
              {/* {breakIt ? (
              <ReadMore data={articleData} isAmp={true} second={second} />
            ) : null} */}
            </div>
          </div>
          {/* <!----feeds wrapper ends------> */}
        </div>
        <div className="outbrain_row">
          {/* <amp-embed
            width="100"
            height="100"
            type="outbrain"
            layout="responsive"
            data-widgetIds="AMP_5"
          ></amp-embed> */}
          <amp-embed
            data-loading-strategy="prefer-viewability-over-views"
            data-lazy-fetch="true"
            width="100"
            height="100"
            type="taboola"
            layout="responsive"
            data-publisher="network18media-news18hindi"
            data-mode="thumbnails-a"
            data-placement="Below Article Thumbnails AMP"
            data-target_type="mix"
            data-article="auto"
            data-url=""
          ></amp-embed>
        </div>
        {/* <InstallAppIcon
          category={"APPdownload_Mweb_Liveblog"}
          label={"Mobile Liveblog"}
          isAMP={true}
        /> */}
        <style jsx global>{`
          * {
            outline: 0;
          }
          .show {
            display: block;
          }
          .hide {
            display: hide;
          }
          body {
            // font-family: "Recursive", sans-serif;
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 19px;
            font-family: "Mukta", serif;
          }
          article,
          aside,
          div,
          figure,
          form,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          li,
          p,
          section,
          ul {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          article,
          aside,
          figure,
          section {
            display: block;
          }
          a,
          a:hover {
            text-decoration: none;
          }
          li,
          ul {
            list-style: none;
          }
          a {
            color: #282828;
          }
          img {
            max-width: 100%;
            border: 0;
          }
          .LiveBlog_Wrapper {
          }
          .TopStoryBox {
            margin-top: 16px;
            margin-bottom: 18px;
          }
          .TopStoryBox .TstoryHead {
            padding: 0 10px;
            margin-bottom: 10px;
          }
          .TopStoryBox .TstoryHead span {
            background: red;
            color: #fff;
            text-transform: uppercase;
            font-size: 11px;
            line-height: 16px;
            padding: 3px 12px;
            border-radius: 12px;
            margin-bottom: 4px;
            display: table;
          }
          .TopStoryBox .TstoryHead .heading_1 {
            font-size: 30px;
            font-family: "mukta";
            line-height: 33px;
            letter-spacing: -1px;
          }
          .TopStoryBox .TstoryImg {
            margin-bottom: 12px;
          }
          .TopStoryBox .TstoryImg img {
            display: block;
            width: 100%;
          }
          .TopStoryBox .TstoryDis {
            padding: 0 10px;
          }
          .TopStoryBox .TstoryDis .text {
            font-size: 14px;
            color: #5a5a5a;
            line-height: 18px;
            padding-bottom: 15px;
            // margin-bottom: 15px;
            // border-bottom: 5px solid #0a2040;
            font-weight: 600;
          }

          .TopStoryBox .socalWrap {
            display: flex;
          }
          .LiveBlog_shortDis {
            padding: 0 10px;
            // font-family: "Crimson Pro", serif;
            font-size: 22px;
            line-height: 28px;
            margin-bottom: 10px;
            font-weight: 500;
            color: #000000;
          }
          .LiveBlog_shortDis a {
            color: #0000ff;
            font-size: 14px;
            text-transform: uppercase;
            // font-family: "Recursive";
            font-weight: bold;
            text-decoration: underline;
          }
          .feedsWrapper {
            background: #ededed;
          }
          .feedsWrapper .tabs {
            display: flex;
            background: #fff;
            padding: 0 10px;
          }
          .feedsWrapper .tabs li a {
            font-size: 14px;
            color: #959595;
            text-transform: uppercase;
            padding: 1px 8px;
            display: block;
          }
          .feedsWrapper .tabs li.active a {
            background: #ededed;
            color: #ed2128;
            font-weight: bold;
          }
          .liveUpdatesWrapper {
            background: #0a2040;
          }

          .pcw {
            background: #ededed;
            padding: 15px 10px;
          }
          .pcw .feedBox_outer {
            background: #fff;
            border-top: 1px solid #c3c3c3;
            margin-bottom: 19px;
            box-shadow: 0 0 10px #00000029;
          }
          .updateBtn {
            display: flex;
            justify-content: center;
            // margin-top: 20px;
          }
          // .updateBtn a {
          //   font-size: 14px;
          //   color: red;
          //   padding: 6px 10px;
          //   border: 1px solid;
          //   font-weight: bold;
          //   border-radius: 20px;
          //   position: relative;
          //   display: flex;
          //   align-items: center;
          // }
          .updateBtn a::before {
            background-repeat: no-repeat;
            display: table;
            content: "";
            // width: 22px;
            height: 22px;
            background-position: -395px -2px;
            margin-right: 7px;
          }
          .feedBox_outer .feed_inner {
            padding: 0 28px;
            padding-top: 16px;
            margin-bottom: 10px;
          }
          .feed_inner .feed_timeWrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
          }
          .feed_inner .feed_timeWrap .feed_time {
            font-size: 12px;
            line-height: 22px;
            color: #959595;
          }
          .feed_inner .feed_timeWrap .feed_time span {
            font-weight: bold;
          }
          .feed_inner .nw18Feed {
            margin-bottom: 16px;
          }
          .feed_inner .nw18Feed .logo {
            display: table;
            width: 63px;
            margin-bottom: 10px;
          }
          .feed_inner .nw18Feed .logo img {
            display: block;
            width: 100%;
          }
          .feed_inner .nw18Feed .content {
            color: #5a5a5a;
            font-size: 14px;
            line-height: 18px;
            font-weight: bold;
          }
          .feed_inner .feed_heading {
            font-size: 20px;
            line-height: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            font-family: "mukta";
          }
          .feed_inner .feed_heading a {
            display: block;
            color: #000000;
          }
          .feed_inner .feed_heading2 {
            font-size: 22px;
            line-height: 28px;
            font-weight: bold;
          }
          .feed_inner .feed_heading2 a {
            display: block;
            color: #000000;
          }
          .feed_inner .feed_author {
            color: #114da5;
            font-size: 10px;
            text-transform: uppercase;
            line-height: 28px;
            font-weight: bold;
          }
          .feed_inner .feed_cont {
            // font-family: "Crimson Pro", serif;
            font-size: 20px;
            line-height: 28px;
            color: #000000;
            margin-bottom: 10px;
          }
          .feed_inner .feed_cont mark {
            background: #fff;
            color: #0000ff;
            font-weight: bold;
          }
          .feed_inner .feed_cont:last-child {
            margin-bottom: 0;
          }
          .feed_inner .feed_timeWrap .liveTvBtn {
            border: 1px solid #0a2040;
            color: #ed2128;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 12px;
            padding: 1px 9px;
            display: flex;
            align-items: center;
          }
          .feed_inner .feed_timeWrap .liveTvBtn span {
            width: 19px;
            height: 15px;
            display: table;
            margin-right: 5px;
            background-repeat: no-repeat;
            background-position: -482px -6px;
          }
          .feedBox_outer .feed_ftr {
            display: flex;
            justify-content: space-between;
            padding: 0 28px;
            align-items: center;
            padding-bottom: 21px;
          }
          .feedBox_outer .feed_ftr .feed_social {
            display: flex;
          }
          .feedBox_outer .feed_ftr .feed_social li {
            margin-right: 15px;
          }
          .feedBox_outer .feed_ftr .feed_social li a {
            width: 34px;
            height: 34px;
            display: block;
            border: 1px solid #707070;
            border-radius: 50%;
            background-image: url(/images/siteimages/live-blog-sprite.png);
            background-repeat: no-repeat;
            background-position: 0 0;
          }
          .feedBox_outer .feed_ftr .feed_social li a.fb {
            background-position: -6px 1px;
          }
          .feedBox_outer .feed_ftr .feed_social li a.tw {
            background-position: -56px 1px;
          }
          .feedBox_outer .feed_ftr .feed_social li a.in {
            background-position: -111px 1px;
          }
          .feedBox_outer .feed_ftr .feed_social li a.wapp {
            background-position: -163px 2px;
          }
          .feedBox_outer .feed_ftr .feed_pin {
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            background-position: -316px -5px;
          }
          .feedBox_outer .feed_liveTvebox {
            padding-top: 6px;
            padding-bottom: 6px;
            position: relative;
            margin-bottom: 10px;
          }
          .feedBox_outer .feed_liveTvebox::before,
          .feedBox_outer .feed_liveTvebox::after {
            content: "";
            width: 100%;
            height: 6px;
            background: #ed2128;
            position: absolute;
          }
          .feedBox_outer .feed_liveTvebox::before {
            top: 0;
          }
          .feedBox_outer .feed_liveTvebox::after {
            bottom: 0;
          }
          .feedBox_outer .feed_liveTvebox img {
            width: 100%;
            display: block;
          }
          .feed_inner .feed_tweeter {
            margin-bottom: 10px;
          }
          .feed_inner .feed_tweeter img {
            width: 100%;
            display: block;
          }
          .pcw .feedBox_outer.nw18Feed_outer {
            border-top: 3px solid #114da5;
            border-bottom: 3px solid #114da5;
          }

          .pcw .HighlightWrap {
            padding: 16px 28px;
            background: #fff;
            border-top: 1px solid #c3c3c3;
            margin-bottom: 5px;
            box-shadow: 0 0 10px #00000029;
          }
          .pcw .HighlightWrap .Highlight_time {
            font-size: 12px;
            line-height: 22px;
            color: #959595;
          }
          .pcw .HighlightWrap .Highlight_time span {
            font-weight: bold;
          }
          .pcw .HighlightWrap .Highlight_heading {
            font-size: 20px;
            line-height: 28px;
            font-weight: bold;
            color: #000000;
          }
          .pcw .HighlightWrap .Highlight_heading a {
            display: block;
            color: #0000ff;
          }

          .pcw .comments_btn_1 {
            background: #0000ff;
            font-size: 12px;
            color: #fff;
            text-transform: uppercase;
            padding: 5px 20px;
            font-weight: bold;
            display: table;
            margin: 0 auto;
            margin-bottom: 13px;
            border-radius: 18px;
          }
          .pcw .commentRow {
            margin-bottom: 20px;
          }
          .pcw .commentBox {
            background: #fff;
            padding: 15px 25px;
            border-radius: 15px;
            font-size: 20px;
            line-height: 28px;
            // font-family: "Crimson Pro";
            color: #000000;
            position: relative;
            margin-bottom: 30px;
          }
          .pcw .commentBox::after {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border-width: 20px 17px 0 0px;
            border-color: #ffffff transparent transparent transparent;
            border-style: solid;
            top: 100%;
            left: 30px;
          }
          .pcw .commentAuthor {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
          }
          .pcw .Commentleft {
            display: flex;
            align-items: center;
          }

          .ad-container > div {
            justify-content: center;
          }

          .pcw .relatedWrap {
            padding: 17px;
            background: #fff;
          }
          .pcw .relatedViewMore {
            background: #0000ff;
            color: #fff;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
            padding: 7px 11px;
            border-radius: 18px;
            margin: 0 auto;
            display: table;
            margin-top: -18px;
            position: relative;
            padding-left: 40px;
          }
          .pcw .relatedViewMore .icon {
            width: 16px;
            height: 16px;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            left: 17px;
          }
          .pcw .relatedViewMore .icon::before,
          .pcw .relatedViewMore .icon::after {
            content: "";
            width: 1px;
            height: 16px;
            background: #fff;
            position: absolute;
            left: 7px;
          }
          .pcw .relatedViewMore .icon::after {
            transform: rotate(90deg);
            width: 1.4px;
          }

          .feedBox_outer.liveTvFeed {
            margin-bottom: 0;
            border-top: 3px solid #ed2128;
          }
          .feed_inner .feed_image {
            margin-bottom: 10px;
            border: 1px solid #114da5;
          }
          .feed_inner .feed_image img {
            width: 100%;
            display: block;
          }
          .liveBlog_tags {
            display: flex;
            margin-top: 10px;
            flex-wrap: wrap;
          }
          .liveBlog_tags li {
            margin-right: 5px;
            margin-bottom: 10px;
          }
          .liveBlog_tags li a {
            padding: 1px 13px;
            display: block;
            border-radius: 5px;
            background: #fff;
          }
          .liveBlog_tags li.active a {
            background: #5a5a5a;
            color: #fff;
          }
          .feedBox_outer .feed_slider_wrapper {
            position: relative;
            background: #ed2128;
            padding: 15px 20px;
            margin-bottom: 10px;
          }
          .feed_slider {
            width: 100%;
            box-sizing: border-box;
          }
          .feed_slider .glide * {
            box-sizing: inherit;
          }
          .feed_slider .glide__track {
            overflow: hidden;
          }
          .feed_slider .glide__slides {
            position: relative;
            width: 100%;
            list-style: none;
            backface-visibility: hidden;
            transform-style: preserve-3d;
            touch-action: pan-Y;
            overflow: hidden;
            padding: 0;
            white-space: nowrap;
            display: flex;
            flex-wrap: nowrap;
            will-change: transform;
          }
          .feed_slider .glide__slides--dragging {
            user-select: none;
          }
          .feed_slider .glide__slide {
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            white-space: initial;
            user-select: none;
          }
          .feed_slider .glide__slide a {
            user-select: none;
          }
          .feed_slider .glide__arrows {
            user-select: none;
          }
          .feed_slider .left-arrow {
            width: 16px;
            height: 16px;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            left: 2px;
            z-index: 3;
          }
          .feed_slider .right-arrow {
            width: 16px;
            height: 16px;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            right: 2px;
            z-index: 3;
          }
          .feed_slider .left-arrow:before {
            content: "";
            border-top: 2px solid #fff;
            border-left: 2px solid #fff;
            width: 8px;
            height: 8px;
            transform: rotate(-45deg);
            position: absolute;
            left: 2px;
            top: 3px;
          }
          .feed_slider .left-arrow:after {
            content: "";
            width: 15px;
            height: 2px;
            position: absolute;
            background: #fff;
            top: 7px;
          }
          .feed_slider .right-arrow:before {
            content: "";
            border-top: 2px solid #fff;
            border-left: 2px solid #fff;
            width: 8px;
            height: 8px;
            transform: rotate(132deg);
            position: absolute;
            left: 5px;
            top: 4px;
          }
          .feed_slider .right-arrow:after {
            content: "";
            width: 14px;
            height: 2px;
            position: absolute;
            background: #fff;
            top: 8px;
          }
          .feed_slider .imageBox {
            border: 1px solid #fff;
            margin-bottom: 7px;
          }
          .feed_slider .imageBox img {
            width: 100%;
            display: block;
          }
          .feed_slider .contentBox {
            color: #fff;
            font-size: 10px;
            line-height: 14px;
          }

          .pcw .liveOption {
            background: #fff;
            border-top: 1px solid #c3c3c3;
            box-shadow: 0 0 10px #00000029;
            padding: 0 28px;
            padding-top: 16px;
            margin-bottom: 30px;
            position: relative;
            padding-bottom: 10px;
          }
          .pcw .liveOption .heading_box {
            border: 1px solid #0a2040;
            display: table;
            margin-left: auto;
            margin-right: auto;
            margin-top: -24px;
            margin-bottom: 10px;
            background: #fff;
            font-size: 12px;
            line-height: 18px;
            color: #0000ff;
            text-transform: uppercase;
            font-weight: bold;
            padding: 1px 16px;
          }
          .pcw .liveOption .heading_1 {
            font-size: 20px;
            line-height: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .pcw .liveOption .heading_1 a {
            display: block;
            color: #000000;
          }

          .Option_row {
            position: relative;
            min-height: 1.5rem;
            padding-left: 1.5rem;
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }
          .Option_row .option_input {
            position: absolute;
            z-index: -1;
            opacity: 0;
            box-sizing: border-box;
            padding: 0;
          }
          .option_label {
            width: 100%;
            position: relative;
            margin-bottom: 0;
            vertical-align: top;
          }
          .option_label {
            cursor: pointer;
          }
          .option_label::before {
            position: absolute;
            top: 4px;
            left: -1.5rem;
            display: block;
            width: 16px;
            height: 16px;
            pointer-events: none;
            content: "";
            background-color: #fff;
            border: #adb5bd solid 1px;
            box-sizing: border-box;
          }
          .option_label::before {
            border-radius: 2px;
          }
          .option_label::after {
            position: absolute;
            top: 4px;
            left: -1.5rem;
            display: block;
            width: 1rem;
            height: 1rem;
            content: "";
            background: no-repeat 50%/50% 50%;
          }
          .option_input:checked ~ .option_label::before {
            color: #fff;
            border-color: #007bff;
            background-color: #007bff;
          }
          .option_input:checked ~ .option_label::after {
            background-image: url(../image/check.png);
          }
          .OptionWrap .votebox {
            width: 100%;
            height: 26px;
            background: #fff;
            border: 1px solid #bababa;
            border-radius: 3px;
            position: relative;
            display: flex;
            align-items: center;
            padding-left: 7px;
            font-size: 16px;
            color: #000000;
            font-weight: bold;
            text-transform: uppercase;
          }
          .OptionWrap .votepersentage {
            color: #5a5a5a;
            font-size: 14px;
            margin-top: 4px;
          }
          .OptionWrap .votebox .progressbar {
            left: 0px;
            position: absolute;
            background: #ededed;
            height: 100%;
          }
          .OptionWrap .votebox .txt {
            position: relative;
            z-index: 9;
          }

          .liveOption .commentWrapper {
            display: flex;
            justify-content: space-between;
            position: absolute;
            bottom: -12px;
            width: 100%;
            left: 0;
            padding: 0 28px;
          }
          .liveOption .commentWrapper .btn {
            background: #0000ff;
            color: #fff;
            font-size: 12px;
            line-height: 18px;
            padding: 2px 20px;
          }

          .liveUpdatesSlider {
            width: 100%;
            position: relative;
            box-sizing: border-box;
            background: #0a2040;
            padding: 28px 0 0;
          }
          .liveUpdatesSlider .heading_box {
            border: 1px solid #0a2040;
            display: table;
            margin-left: auto;
            margin-right: auto;
            margin-top: -37px;
            margin-bottom: 16px;
            background: #fff;
            font-size: 12px;
            line-height: 18px;
            color: #0000ff;
            text-transform: uppercase;
            font-weight: bold;
            padding: 1px 16px;
          }
          .liveUpdatesSlider * {
            box-sizing: inherit;
          }
          .liveUpdatesSlider .glide__track {
            overflow: hidden;
          }
          .liveUpdatesSlider .glide__slides {
            position: relative;
            width: 100%;
            list-style: none;
            backface-visibility: hidden;
            transform-style: preserve-3d;
            touch-action: pan-Y;
            overflow: hidden;
            padding: 0;
            white-space: nowrap;
            display: flex;
            flex-wrap: nowrap;
            will-change: transform;
          }
          .liveUpdatesSlider .glide__slides--dragging {
            user-select: none;
          }
          .liveUpdatesSlider .glide__slide {
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            white-space: initial;
            user-select: none;
          }
          .liveUpdatesSlider .glide__slide a {
            user-select: none;
          }
          .liveUpdatesSlider .glide__arrows {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 19px 0;
          }
          .liveUpdatesSlider .glide__bullets {
            user-select: none;
            text-align: center;
            display: flex;
          }
          .liveUpdatesSlider .glide__bullets button:focus {
            outline: none;
          }
          .liveUpdatesSlider .glide__bullets button.glide__bullet {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            border: 0;
            background: #ffffff;
            margin: 0 5px;
            padding: 0;
          }
          .liveUpdatesSlider
            .glide__bullets
            button.glide__bullet.glide__bullet--active {
            background: #e1261d;
            width: 6px;
            height: 6px;
          }
          .liveUpdatesSlider .glide--rtl {
            direction: rtl;
          }
          .liveUpdatesSlider .left-arrow {
            width: 16px;
            height: 16px;
            position: relative;
            font-size: 0;
            margin-right: 40px;
          }
          .liveUpdatesSlider .left-arrow:before {
            content: "";
            border-top: 2px solid #959595;
            border-left: 2px solid #959595;
            width: 8px;
            height: 8px;

            transform: rotate(-45deg);
            position: absolute;
            left: 2px;
            top: 3px;
          }
          .liveUpdatesSlider .left-arrow:after {
            content: "";
            width: 16px;
            height: 2px;
            background-color: #959595;
            display: block;
            left: 0;
            position: absolute;
            top: 7px;
          }
          .liveUpdatesSlider .right-arrow {
            position: relative;
            font-size: 0;
            width: 16px;
            height: 16px;
            margin-left: 40px;
          }
          .liveUpdatesSlider .right-arrow:after {
            content: "";
            width: 14px;
            height: 2px;
            background-color: #959595;
            display: block;
            left: 0;
            position: absolute;
            top: 6px;
          }
          .liveUpdatesSlider .right-arrow:before {
            content: "";
            border-top: 2px solid #959595;
            border-left: 2px solid #959595;
            width: 8px;
            height: 8px;

            transform: rotate(132deg);
            position: absolute;
            top: 2px;
            left: 5px;
            background: transparent;
          }
          .liveUpdatesSlider .glide__slide a .image {
            display: block;
            margin-bottom: 10px;
            border: 1px solid #fff;
          }
          .liveUpdatesSlider .glide__slide a .image img {
            display: block;
            width: 100%;
          }
          .liveUpdatesSlider .glide__slide a .text {
            color: #fff;
            text-align: center;
            font-size: 16px;
            line-height: 20px;
          }
          .hide {
            display: none;
          }

          .rmc {
            width: 100%;
            background: #5a5a5a;
            // margin-left: -10px;
            // margin-right: -10px;
            margin-top: 10px;
          }
          .rmc .readMoreHeading {
            background: #0a2040;
            color: #fff;
            padding: 10px;
            text-transform: uppercase;
            font-size: 16px;
          }
          .rmc .rmc {
            color: #fff;
            color: #fff;
            padding: 10px;
          }
          .rmc .rmc p {
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 15px;
            margin-top: 0px;
          }

          .updateBtn a {
            font-size: 14px;
            color: red;
            padding: 6px 10px;
            border: 1px solid;
            font-weight: bold;
            border-radius: 20px;
            position: relative;

            display: flex;

            align-items: center;
            background: #fff;
            cursor: pointer;
          }

          .liveNow {
            background: red;
            color: #fff;
            text-transform: uppercase;
            font-size: 11px;
            line-height: 16px;
            padding: 3px 12px;
            border-radius: 12px;
            margin-bottom: 4px;
            display: table;
            height: 10px;
          }

          .topDate {
            font-family: mukta;
            font-size: 12px;
            line-height: 22px;
            color: #959595;
            margin-bottom: 20px;
            border-bottom: 5px solid #0a2040;
            display: block;
            padding-bottom: 8px;
            display: flex;
          }

          .topDate li:first-child {
            padding-right: 5px;
          }

          ul.art_social_share {
            font-family: "Mukta", sans-serif;

            display: flex;

            align-items: center;

            justify-content: center;
            width: 100%;
          }
          ul.art_social_share li {
            color: #6b6b6b;
            font-size: 14px;
            margin-left: 15px;
            text-transform: uppercase;
            line-height: 0;
            background-color: #ccc;
          }
          ul.art_social_share li:first-child {
            margin-left: 0px;
          }

          .spriteshare {
            background: url(/images/siteimages/sprite_img_1.svg) 0 0 no-repeat;
            width: 40px;
            height: 40px;
            display: block;
          }
          .spriteshare.art-facebook-icon {
            background-position: 0px 0px;
          }
          .spriteshare.art-twitter-icon {
            background-position: 0px -50px;
          }
          .spriteshare.art-linkedin-icon {
            background-position: 0px -100px;
          }
          .spriteshare.art-whatsapp-icon {
            background-position: 0px -150px;
          }
          .spriteshare.art-telegram-icon {
            background-position: 0 -200px;
          }
          .spriteshare.art-email-icon {
            background-position: 0 -250px;
          }

          .TstoryImg img {
            display: block;
            width: 100%;
          }

          // .TstoryImg .i-amphtml-layout-container {
          //   display: block;
          //   width: 100%;
          // }

          .TopStoryBox .TstoryDis .text {
            font-size: 14px;
            color: #5a5a5a;
            line-height: 18px;
            padding-bottom: 15px;
            // margin-bottom: 15px;
            font-weight: 600;
            font-size: 18px;
            line-height: 28px;
            color: #404040;
            font-size: 18px;
            line-height: 28px;
            font-weight: bold;
          }

          .LiveBlog_shortDis p {
            font-size: 14px;
            color: #5a5a5a;
            line-height: 18px;
            font-weight: 600;
            font-size: 18px;
            line-height: 28px;
            color: #404040;
            font-size: 18px;
            line-height: 28px;
            font-weight: bold;
            // margin: 0px;
          }
          .news_updates {
            width: 130px;
            height: 30px;
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 1px solid #d73a34;
            border-radius: 15px;
            display: flex;
            margin: 10px auto;
            text-align: center;
            letter-spacing: 0px;
            color: #ed2128;
            text-decoration: none;
            font-size: 14px;
            line-height: 28px;
            // font-family: "Fira Sans";
            justify-content: center;
            align-items: center;
          }
          .news_updates .sprite_cls {
            background-image: url(/images/siteimages/live-blog-sprite.png);
            background-position: -340px -4px;
            display: block;
            width: 29px;
            height: 20px;
            display: inline-block;
            position: relative;
            top: 5px;
            left: 5px;
          }

          .rmc a {
            color: yellowgreen;
          }

          .auto-refresh {
            margin-bottom: 10px;
            font-family: mukta;
          }
          .related_nws_sec {
            background: #3e3e3e;
            margin: 0px -15px 20px;
          }
          .related_nws_sec .slction_section {
            padding: 15px 0;
          }
          .related_nws_sec .slction_section a {
            background: #1a1a1a;
            color: #fff;
            border: 1px solid #9b9b9b;
          }
          .related_nws_sec .slction_section a p {
            background: #1a1a1a;
            color: #fff;
          }

          .rltd_nws_hdng {
            font-size: 18px;
            justify-content: center;
            line-height: 36px;
            height: 36px;
            color: #fff;
            font-weight: bold;
            font-family: "Mukta", sans-serif;
            background-color: #e1261d;
            text-align: left;
            padding-left: 15px;
          }
          .rltd_lists_sldr {
            display: flex;
            padding: 15px;
          }
          .rltd_lists_sldr li {
            border: 1px solid #9b9b9b;
            width: 173px;
          }
          .rltd_lists_sldr_img {
            width: 171px;
            overflow: hidden;
          }
          .rltd_lists_sldr_img img {
            width: 100%;
            display: block;
          }
          .rltd_lists_sldr li:last-child {
            margin-right: 0px;
          }

          .related_nws_slidr {
            width: 100%;
            overflow: hidden;
          }
          .related_nws_slidr .glide__bullets {
            display: inline-flex;
            justify-content: center;
            position: relative;
            top: -8px;
            margin: 0 auto;
            text-align: center;
            left: 50%;
            right: 50%;
            transform: translate(-50%, -50%);
          }
          .related_nws_slidr .glide__bullets button.glide__bullet {
            width: 8px;
            height: 8px;
            background: #bababa;
            display: block;
            margin-right: 8px;
            border-radius: 50%;
            overflow: hidden;
            outline: none;
            border: none;
            cursor: pointer;
          }
          .related_nws_slidr .glide_arroe_buttons {
            position: relative;
            top: 13px;
            display: flex;
            justify-content: space-between;
            padding: 0px 70px;
          }

          .related_nws_slidr .left-arrow,
          .related_nws_slidr .right-arrow {
            width: 15px;
            height: 15px;
            transform: translate(0, -50%);
          }
          .related_nws_slidr .left-arrow::before {
            content: "";
            border-top: 2px solid #fff;
            border-left: 2px solid #fff;
            width: 8px;
            height: 8px;
            transform: rotate(-45deg);
            position: absolute;
            left: 2px;
            top: 3px;
          }
          .related_nws_slidr .left-arrow::after {
            content: "";
            width: 10px;
            height: 2px;
            background: #fff;
            position: absolute;
            left: 3px;
            top: 7px;
          }

          .related_nws_slidr .right-arrow::before {
            content: "";
            border-bottom: 2px solid #fff;
            border-right: 2px solid #fff;
            width: 8px;
            height: 8px;
            transform: rotate(-45deg);
            position: absolute;
            right: 2px;
            top: 3px;
          }
          .related_nws_slidr .right-arrow::after {
            content: "";
            height: 2px;
            width: 10px;
            position: absolute;
            right: 3px;
            top: 7px;
            background: #fff;
          }
          .glide__bullets .glide__bullet--active {
            background: #e1261d;
          }
          .slction_section {
            width: 100%;
            display: flex;
            overflow: scroll;
            padding-bottom: 5px;
          }
          .slidr_sec {
            margin: 0px -15px 20px;
            background-color: #f2f2f2;
            padding: 10px 0;
            border-bottom: 3px solid #061836;
          }

          .slction_section a figure {
            width: 200px;
            overflow: hidden;
            height: 133px;
          }
          .slction_section a p {
            margin-bottom: 0px;
            color: #061836;
            font-size: 16px;
            background: #ffffff;
            line-height: 1.5;
            padding: 8px;
            font-weight: bold;
            font-family: "Mukta", sans-serif;
            text-align: left;
            overflow: hidden;
            margin: 0;
          }

          .slction_section a figure img {
            width: 100%;
            display: block;
          }
          .slction_section a {
            width: 200px;
            box-shadow: 0px 2px 4px #00000029;
            margin-left: 10px;
            background: #ffff;
            flex-shrink: 0;
          }
          .tops {
            margin-top: 15px;
          }
          .LiveBlog_shortDis a {
            color: #ed2128;
            display: block;
            text-align: center;
          }
          .feedsWrapper .tabs li a {
            padding: 10px 15px 5px 15px;
          }
          .LiveBlog_shortDis {
            margin-top: 10px;
          }
          .rmc .rmc p {
            font-size: 15px;
            line-height: 26px;
            margin-bottom: 20px;
          }
          .autoRegreshBrder {
            display: none;
          }
          .feedBox_outer table {
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .feedBox_outer table td {
            padding: 8px;
            vertical-align: top;
            font-size: 14px;
            border: 1px solid #eee;
            text-align: left;
          }
          .feedBox_outer table tr:first-of-type td {
            background: #666;
            color: #fff;
            font-weight: bold;
          }
          .feedBox_outer table {
            width: 100%;
            border-collapse: collapse;
            overflow: scroll;
            display: block;
          }

          .live_feed_intro img,
          .live_feed_intro figure {
            width: 100%;
            height: auto;
          }

          .feed_inner .feed_cont img,
          .feed_inner .feed_cont p img {
            width: 100%;
            height: auto;
          }

          .related_nws_sec .slction_section a p {
            overflow: initial;
            white-space: initial;
            display: flex;
            word-break: break-all;
            min-height: 118px;
            line-height: 28px;
          }
          .related_nws_sec .slction_section {
            overflow-x: scroll;
            overflow-y: hidden;
            height: 300px;
          }
          .photodiv {
            margin-top: 35px;
          }
          .rltnsls {
            width: 100%;
            display: flex;
            overflow: scroll;
            padding-bottom: 5px;
          }
          .rltn {
            background: #3e3e3e;
            margin: 20px 0;
            min-height: 340px;
          }
          .rltn .rltnsls {
            padding: 15px 0;
          }
          .rltn .rltnsls a {
            border: 1px solid#9b9b9b;
          }
          .rltn .rltnsls a,
          .rltn .rltnsls a p {
            background: #1a1a1a;
            color: #fff;
          }
          .rlthd {
            font-size: 18px;
            justify-content: center;
            line-height: 36px;
            height: 36px;
            color: #fff;
            font-weight: 700;
            font-family: Mukta;
            background-color: #e1261d;
            text-align: left;
            padding-left: 15px;
          }
          .rltnsls a figure {
            width: 200px;
            overflow: hidden;
            height: 133px;
          }
          .rltnsls a p {
            color: #061836;
            font-size: 16px;
            background: #fff;
            line-height: 1.5;
            padding: 8px;
            font-weight: 700;
            font-family: Mukta;
            text-align: left;
            overflow: hidden;
            margin: 0;
          }
          .rltnsls a figure img {
            width: 100%;
            display: block;
          }
          .last_div,
          .rltnsls a {
            box-shadow: 0 2px 4px#00000029;
          }
          .rltnsls a {
            width: 200px;
            background: #fff;
            flex-shrink: 0;
            margin-left: 12px;
          }
          .feedBox_outer .feed_inner > p amp-iframe {
            min-width: 100%;
            min-height: 360px;
            max-width: 100%;
            max-height: 360px;
          }
          .feedBox_outer .feed_inner p a {
            color: #e1261d;
          }
          .feed_inner ul,
          .feed_inner ol {
            margin: 0 1em;
          }
          .feed_inner li {
            list-style: inherit;
            font-family: Mukta, serif;
          }
          .feed_inner ul {
            list-style: disc;
          }
          .feed_inner ol {
            list-style: decimal;
          }
          .feedsWrapper li:has(a[selected]) {
            background: #ededed;
            color: #ed2128;
            font-weight: bold;
            text-transform: uppercase;
            padding: 10px 15px 5px;
            font-size: 14px;
          }
          .feedsWrapper .tabs li:has(a[selected]) a {
            color: #ed2128;
            outline: 0;
          }
        `}</style>
      </div>
    </>
  );
};

export default LiveBlog;
