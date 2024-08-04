import React, { useState } from "react";
import getConfig from "next/config";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import { setDefaultImage } from "includes/article.util";
import { timeConverter, getQuery } from "includes/blogs.util";
import { getArticleList } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import SearchButton from "components/Common/SearchButton";

const Agency = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const { topic } = props.data;
  const [tagData, setTagData] = useState(props.data.tagData);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(1);
  const [ct, setCt] = useState(props.data.ct || "");
  const { dataLength } = props.data;
  const { paramObj } = props.data;
  const { topicName } = props.data;
  const { imageWidth } = props.data;
  const { imageHeight } = props.data;
  const { photoStories } = props.data;
  const { topStory } = props.data;
  const { topStories } = props.data;
  const { urlParam } = props.data;
  const outBrainUrl = props.data.currentUrl.replace(/https:\/\/(stg|beta)?hindi.news18.com\//, publicRuntimeConfig.siteUrl);

  const fields = 'weburl_r,display_headline,images,intro,post_type,section,created_at,ff_source,local18_video';

  const loadPosts = async (d) => {
    if (d) {
      const currentLoadMore = d;
      const offset = currentLoadMore * 15;
      const pageLimit = 15;
      const subString = getQuery(ct, topic, urlParam);

      let tagResult = [];

      tagResult = await getArticleList({ count: pageLimit, offset: offset, filter: subString, fields: fields }, true);

      const tagDta = tagResult;
      (tagDta.length === 0 || tagDta.length < 15) ? setLoadMore(31) : setLoadMore(currentLoadMore + 1);
      setTagData((prev) => [...prev, ...tagDta]);
    }
  };

  const { rhsTopStoryListing = [] }= topStory;

  const noContent = dataLength > 450 && paramObj.page > 30 ? false : true;

  let ctTag = "";
  if (ct === "news") {
    ctTag = "खबरें";
  } else if (ct === "photogallery") {
    ctTag = "फोटो";
  } else if (ct === "videos") {
    ctTag = "वीडियो";
  }

  const storyLength = tagData.length;

  const changeState = (e, state) => {
    e.preventDefault();
    if (state !== ct) {
      setLoading(true);
      setCt(state);
      if (state === props.data.ct) {
        setLoadMore(1);
        setTagData(props.data.tagData);
      } else {
        setTagData([]);
      }
      getData(state);
    }
  };

  const getData = async (cat) => {
    const subString = getQuery(cat, topic, urlParam);
    let tagResult = [];
    const pageLimit = 15;
    const offset = 0;

    tagResult = await getArticleList({ count: pageLimit, offset: offset, filter: subString, fields: fields }, true);

    setLoadMore(1);
    setTagData([...tagResult]);
    setLoading(false);
  };

  const breadCrumbArray = [
    {value: "होम", slug: "/"},
    {value: "एजेंसी", slug: "/agency/"}
  ]
  if(topicName && ct) {
    breadCrumbArray.push(
      {value: topicName, slug: `/agency/${paramObj.topic}/`},
    )
    breadCrumbArray.push(
      {value: ctTag},
    )
  } else if(topicName) {
    breadCrumbArray.push(
      {value: topicName},
    )
  } else if(ctTag) {
    breadCrumbArray.push(
      {value: ctTag},
    )
  }
  return (
    <>
       <div className="outer">
        <div className="section-blog clearfix">
          <div className="section-blog-left resLiftSideFull">
            <BreadcrumbCommon 
              breadCrumbArray= {breadCrumbArray}
            />
            <div className="vsp10 clearfix"></div>
            <div className="search-listing">
              <div className="author-brief">
                <h1 className="top-heading">{topicName}</h1>
              </div>

              <>
                <div id="top-area-nav">
                  <ul className="parent">
                    <li>
                      <a
                        className={ct === "" ? "act" : ""}
                        onClick={(e) => changeState(e, "")}
                      >
                        सभी
                      </a>
                    </li>
                    <li>
                      <a
                        className={ct === "news" ? "act" : ""}
                        onClick={(e) => changeState(e, "news")}
                      >
                        खबरें
                      </a>
                    </li>
                    <li>
                      <a
                        className={ct === "photogallery" ? "act" : ""}
                        onClick={(e) => changeState(e, "photogallery")}
                      >
                        {" "}
                        फोटो
                      </a>
                    </li>
                    <li>
                      <a
                        className={ct === "videos" ? "act" : ""}
                        onClick={(e) => changeState(e, "videos")}
                      >
                        वीडियो
                      </a>
                    </li>
                    <SearchButton  pageType={"agency"}/>
                  </ul>
                </div>
                <ul className="listingData">
                  {tagData?.length > 0 && noContent ? (
                    tagData.map((item, ind) => {
                      const listNo = ind + 1;
                      const { display_headline } = item;
                      const thumbnail = item.images.url || '';
                      const url = item.weburl_r || '';
                      const intro = item.intro || '';
                      let category = "";
                      if (item?.section && item.section.length > 0) {
                        category = item.section.join(", ").toString() || "";
                      } else {
                        category = "";
                      }
                      return (
                        <>
                          {" "}
                          <li key={listNo}>
                            <figure>
                              {item?.ff_source &&
                              item?.local18_video &&
                              item?.ff_source === "Hyperlocal" &&
                              item?.local18_video !== "" ? (
                                <span className="nwvideoicon"></span>
                              ) : (
                                ""
                              )}
                              <a href={url}>
                                <LazyLoadImage
                                  src={thumbnail}
                                  width={imageWidth}
                                  height={imageHeight}
                                  onError={setDefaultImage}
                                  alt={display_headline}
                                  title={display_headline}
                                />
                              </a>
                            </figure>

                            <div className="search-listing-details">
                              <h2>
                                <a
                                  href={url}
                                  dangerouslySetInnerHTML={{
                                    __html: display_headline,
                                  }}
                                ></a>
                              </h2>
                              <p>
                                <a
                                  href={url}
                                  dangerouslySetInnerHTML={{
                                    __html: intro + "...",
                                  }}
                                ></a>
                              </p>
                              <span className="post-date">
                                <a> {category}</a>
                                {"|"} {item?.created_at ? timeConverter(item?.created_at) : ''}
                              </span>
                            </div>
                          </li>
                        </>
                      );
                    })
                  ) : (
                    <p>
                      {loading ? "" : "No stories found matching this criteria"}
                    </p>
                  )}
                </ul>
              </>
            </div>
          </div>

          {/* Side bar start here */}
          <div className="rightwrap">
            <RhsCommon
              section="tag"
              pageAds={props.pageAds}
              currentURL={outBrainUrl}
              topicName={topic}
              photoStories={photoStories}
              topStories={
                rhsTopStoryListing.length ? rhsTopStoryListing : topStories
              }
            />
            {/* Side bar end here */}
          </div>
        </div>

        {storyLength >= 15 ? loadMore <= 30 ? <button type="button" onClick={() => loadPosts(loadMore, tagData)} className="load_more clearfix">Load More</button> : "" : ""}

        <Outbrain widgetId="AR_6" widgetSrc={outBrainUrl} />
      </div>
      <style jsx global>
        {`
          body {
            margin: 0;
            padding: 0;
            list-style: none;
            outline: 0;
            text-decoration: none;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          }
          .outer {
            margin: auto;
            max-width: 1245px;
            padding: 0px 10px;
            position: relative;
            z-index: 1;
          }

          .section-blog-left {
            width: calc(100% - 315px);
            float: left;
          }
          .brdacrum {
            font-size: 14px;
            color: #404040;
            text-transform: uppercase;
            line-height: 18px;
            // font-weight: 700;
            margin: 5px 0px 15px 0px;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          }
          .brdacrum a {
            color: #404040;
            font-weight: 400;
            margin-right: 2px;
          }
          .brdacrum a:last-of-type {
            font-weight: 700;
          }
          .brdacrum a:last-of-type:hover {
            color: #000;
          }
          #top-area-nav {
            margin: 0px 0px 0px;
            padding: 0px;
            float: left;
            width: 100%;
          }
          ul.parent {
            border-bottom: 1px solid #ccc !important;
            float: left;
            width: 100%;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
            position:relative;
          }
          #top-area-nav ul.parent li {
            float: left !important;
            margin: 4px 11px;
            position: relative;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          }
          #top-area-nav ul.parent li a.act {
            color: #ed1c24;
            border-bottom: solid 3px #ed1c24;
          }
          #top-area-nav ul.parent li a:hover {
            color: #ed1c24;
            border-bottom: solid 3px #ed1c24;
            cursor: pointer;
          }

          .search-listing ul li {
            float: left !important;
          }

          .search-listing ul li {
            display: flex;
            justify-content: space-between;
            margin: 25px 0;
          }
          // .search-listing ul li figure img {
          //   width: 100%;
          // }
          .search-listing ul li figure {
            margin-right: 15px;
            flex-shrink: 0;
            line-height: 0;
            width: 220px;
            position: relative;
          }
          .search-listing ul li .search-listing-details h2 a,
          .search-listing ul li .search-listing-details h3 a {
            font-size: 24px;
            line-height: 24px;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          }
          // .search-listing ul li .search-listing-details h2 a:hover,
          // .search-listing ul li .search-listing-details h3 a:hover {
          //   color: black;
          // }

          a {
            text-decoration: none;
            color: #111;
          }
          .search-listing ul li .search-listing-details p {
            color: #222;
            font-size: 16px;
            line-height: 24px;
            margin: 8px 0px !important;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          }

          .search-listing ul li p {
            // max-height: 45px !important;
            overflow: hidden;
          }

          .search-listing ul li {
            display: flex;
            justify-content: space-between;
            // margin: 25px 0px;
          }
          .search-listing-details h2 a :hover {
            color: black;
          }
          .search-listing ul li:first-child {
            margin-top: 10px;
          }
          .search-listing ul li .search-listing-details p a {
            color: #222;
          }
          .search-listing ul li .search-listing-details span {
            font-size: 12px;
            color: #999;
            display: block;
            text-transform: uppercase;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          }
          .search-listing ul li .search-listing-details span a {
            color: #ee1b24;
          }
          span .post-date {
            margin: 4px 0;
          }
          .red-text {
            color: #ed1c24 !important;
          }
          span.post-date a {
            padding-right: 5px;
          }
          .rightwrap {
            width: 300px;
            float: right;
          }
          .top-heading {
            letter-spacing: 2px;
            color: #ee1b24;
            font-size: 1.6em;
            margin: 0 0 10px !important;
            text-transform: uppercase;
            padding: 10px 0 !important;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          }
          .vsp10 {
            margin-top: 10 px;
          }
          .clearfix {
            clear: both;
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
            margin-left: 400px;
            cursor: pointer;
          }
          .nwvideoicon {
            width: 45px;
            height: 45px;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 2;
            margin: -22px 0 0 -22px;
            cursor: pointer;
            background: url(/images/siteimages/video-iconnew.png)
              0 0 no-repeat;
          }
        `}
      </style>
    </>
  );
};
export default Agency;
