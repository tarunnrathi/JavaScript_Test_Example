import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import getConfig from "next/config";
import dateFormat from "dateformat";
import RhsScorecard from "widgets/Common/Desktop/RhsScorecard";
import React, { useState } from "react";
import { calculateDate, getDataWithCategoryId } from "api/individual/Podcast";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const PodcastCategories = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const { topPriorityData } = props;
  const category = topPriorityData?.query.category;
  const pageNumber = topPriorityData?.query.page
    ? topPriorityData?.query.page
    : 0;
  const outBrainUrl = topPriorityData?.currentUrl.replace(
    /https:\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );
  const categoryDetails = topPriorityData?.categoryDetailsData;
  const categoriesList = categoryDetails?.categoryList;
  // const articleList = categoryDetails?.articlesList;
  const [articleList, setArticleList] = useState(categoryDetails?.articlesList);
  const pageNumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const photoStories = topPriorityData?.photogallery.items;
  const topStories = topPriorityData?.topStories;
  const pageurl = `/podcast/${topPriorityData?.query.category}/`;

  const [loadMore, setLoadMore] = useState(1);
  const dataLength = props?.topPriorityData?.dataLength;
  const paramObj = props?.topPriorityData?.paramObj;
  const storyLength = articleList.length;
  const pageLimit = 10;
  const loadPosts = async (d) => {
    if (d) {
      const currentLoadMore = d;
      const offset = currentLoadMore * 10;

      let podCastResult = [];
      let categoryId = paramObj?.categoryId;
      podCastResult = await getDataWithCategoryId(
        categoryId,
        offset,
        pageLimit
      );

      if (podCastResult?.length > 0) {
        let podCastData = podCastResult;
        setLoadMore(currentLoadMore + 1);
        setArticleList((prev) => [...prev, ...podCastData]);
      } else {
        setLoadMore(12);
        //podCastResult = [];
      }

      let updateLoadMore = currentLoadMore + 1;
    }
  };

  let noContent = dataLength > 720 && paramObj.page > 30 ? false : true;
  return (
    <div>
      <div className="clearfix">
        <div className="podcast_page">
          <div className="podcast_container">
            <BreadcrumbCommon breadCrumbArray={topPriorityData?.breadCrumbArray} />
            <div className="podcast-listing_wrapper">
              <div className="podcast-listing_left">
                <div className="podcast-listing_top">
                  <ul className="podcast-tabs">
                    {categoriesList &&
                      categoriesList.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className={category === item.slug ? "active" : ""}
                          >
                            <a href={`/podcast/${item?.slug}/`}>{item?.name}</a>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                {articleList &&
                categoryDetails?.isCategory &&
                articleList.length > 0 ? (
                  articleList.map((item, index) => {
                    const webUrl = item?.weburl.replace(
                      "https://hindi.news18.com",
                      ""
                    );
                    let baseUrl = publicRuntimeConfig.siteUrl;
                    baseUrl = baseUrl.replace(/\/$/, "");
                    const pageUrl = baseUrl + item?.weburl_r;
                    const palinHeadline = item?.display_headline;
                    // const object = JSON.parse(item.audio_info[0]);
                    const object = item?.podcast_embed;
                    let facebookShareLink = `https://www.facebook.com/sharer.php?u=${pageUrl}&;t=${palinHeadline}`;
                    let twitterShareLink = `https://twitter.com/share?url=${pageUrl}&text=${palinHeadline}`;
                    let whatsappShareLink = `https://web.whatsapp.com/send?text=${palinHeadline}-${pageUrl}`;
                    const date = item?.updated_at.toString();
                    const display = calculateDate(date);

                    const formattedDate = dateFormat(
                      display,
                      "mmmm d, yyyy, h:MM TT"
                    );
                    return (
                      <div className="podcast-listing_row">
                        <div className="podcast-listing_content">
                          <div className="podcast_content_left">
                            <figure>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: object,
                                }}
                              ></div>
                            </figure>
                          </div>
                          <div className="podcast_content_right">
                            <i>{formattedDate}</i>
                            <h1 className="podcast-listing_title">
                              <a href={webUrl}>{item?.display_headline}</a>
                            </h1>
                            <p className="podcast-listing_intro">
                              {item?.intro}
                            </p>
                          </div>
                        </div>
                        <div className="share_this">
                          <p>Share</p>
                          <ul>
                            <li>
                              <a href={facebookShareLink}>
                                <img
                                  src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_fb_1592317881.png"
                                  alt="facebook"
                                  title="facebook"
                                />
                              </a>
                            </li>
                            <li>
                              <a href={twitterShareLink}>
                                <img
                                  src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_tw_1592317903.png"
                                  alt="Twitter"
                                  title="Twitter"
                                />
                              </a>
                            </li>
                            <li>
                              <a href={whatsappShareLink}>
                                <img
                                  src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_wtsup_1592317921.png"
                                  alt="whatsapp"
                                  title="whatsapp"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="read_more">
                          <a href={webUrl}>और भी पढ़ें</a>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No stories found matching this criteria</p>
                )}
              </div>
              <div className="rightwrap">
                <div className="rhsScoreCard">
                  <RhsScorecard />
                </div>
                <RhsCommon
                  pageAds={props.pageAds}
                  currentURL={outBrainUrl}
                  topicName={"podcast"}
                  photoStories={photoStories}
                  topStories={topStories}
                />
              </div>
            </div>
          </div>
        </div>
        {/* {categoryDetails?.isCategory && (articleList.length>0) &&
        <Pagination
          curpage={pageNumber}
          TotalRecord={450}
          limit={10}
          pageurl={pageurl}
          pageflag={false}
        />} */}
        {/* {paramObj.page > 1 ? noContent ? <Pagination  curpage={paramObj.page} TotalRecord={dataLength} limit={pageLimit} pageurl={pageurl} pageflag={false} /> : null  : storyLength> 0 ? loadMore <=10 ? <button onClick={() => loadPosts(loadMore,articleList)} className="load_more clearfix"> Load More </button>: "":""
                            } */}
        {storyLength >= 10 ? (
          loadMore <= 11 ? (
            <button
              onClick={() => loadPosts(loadMore, articleList)}
              className="load_more clearfix"
            >
              Load More
            </button>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>

      <style jsx global>
        {`
          .rhsScoreCard {
            background: #fff;
            display: block;
            width: 100%;
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
          .podcast_page {
            width: 100%;
          }
          .podcast_container {
            margin: auto;
            max-width: 1245px;
            padding: 0 10px;
            position: relative;
            clear: both;
            margin-bottom: 30px;
          }
          .podcast_breadcrumbs {
            width: 100%;
            padding: 20px 0;
          }
          .podcast_breadcrumbs ul {
            font-family: "Noto Sans", sans-serif;
            display: flex;
            color : #085085;
            align-items: center;
            font-size: 15px;
          }
          .podcast_breadcrumbs ul li:first-child {
            padding-left: 0;
          }
          .podcast_breadcrumbs ul li {
            padding: 0 8px;
          }
          .podcast-listing_wrapper {
            display: flex;
            width: 100%;
          }
          .podcast-listing_left {
            width: calc(100% - 300px);
            padding-right: 26px;
          }
          .podcast-listing_top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 20px 0 40px;
          }
          ul.podcast-tabs {
            display: flex;
          }
          ul.podcast-tabs li {
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 2px solid #666666;
            width: 152px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 10px;
            margin-right: 20px;
          }
          ul.podcast-tabs li a {
            display: block;
            letter-spacing: -0.4px;
            color: #666666;
            font-family: "Khand", sans-serif;
            font-size: 20px;
          }
          ul.podcast-tabs li.active {
            background: #da4432 0% 0% no-repeat padding-box;
            box-shadow: 3px 3px 0px #00000029;
            border-color: #da4432;
            position: relative;
          }
          ul.podcast-tabs li.active:before {
            content: "";
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid #00000029;
            display: block;
            position: absolute;
            right: -11px;
            bottom: -20px;
            left: 0;
            margin: auto;
            width: 0;
            transform: rotate(265deg);
          }
          ul.podcast-tabs li.active:after {
            content: "";
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-left: 10px solid #da4432;
            display: block;
            position: absolute;
            right: 0;
            left: 0;
            bottom: -17px;
            margin: auto;
            text-align: center;
            width: 0px;
            transform: rotate(88deg);
          }
          ul.podcast-tabs li.active a {
            color: #fff;
          }
          ul.pagination {
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
          .pagination {
            margin: 20px 0;
            padding: 0;
            float: left;
            width: 100%;
            clear: both;
            text-align: center;
          }
          ul.pagination li {
            background: #f5f5f5 0% 0% no-repeat padding-box;
            border: 1px solid #dddddd;
            width: 40px;
            height: 40px;
            display: flex;
            font-family: "Noto Sans", sans-serif;
            align-items: center;
            justify-content: center;
          }
          ul.pagination li.active {
            background: #222222;
            border: 0;
          }
          ul.pagination li a {
            letter-spacing: 0px;
            color: #222222;
            font-size: 14px;
            font-weight: 500;
          }
          ul.pagination li.active a {
            color: #fff;
          }
          .podcast-listing_row {
            width: 100%;
            margin-bottom: 40px;
            position: relative;
          }
          .podcast-listing_content {
            display: flex;
            width: 100%;
          }
          .podcast_content_left {
            position: relative;
            width: 300px;
          }
          .podcast_content_left iframe {
            height: 180px;
          }
          .podcast_content_right {
            width: calc(100% - 300px);
            font-family: "Noto Sans", sans-serif;
            padding-left: 20px;
          }
          .podcast_content_right i {
            letter-spacing: -0.24px;
            color: #888888;
            text-transform: uppercase;
            font-size: 12px;
            position: relative;
            font-weight: 500;
            padding-left: 14px;
          }
          .podcast_content_right i:after {
            width: 8px;
            height: 8px;
            content: "";
            position: absolute;
            left: 0;
            background: #eb3d3c 0% 0% no-repeat padding-box;
            border-radius: 10px;
            top: 4px;
          }
          .podcast-listing_title {
            letter-spacing: -0.42px;
            color: #222222;
            font-size: 21px;
            line-height: 34px;
            font-weight: bold;
          }
          .podcast-listing_title a {
            text-decoration: none;
            color: #222222;
          }
          .podcast-listing_intro {
            letter-spacing: -0.3px;
            color: #666666;
            font-size: 15px;
            line-height: 26px;
            height: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .podcast-listing_row .share_this {
            top: inherit;
            bottom: 31px;
            border: 0;
          }
          .share_this {
            display: flex;
            align-items: center;
            position: absolute;
            top: -30px;
            right: 0;
            border-bottom: 1px rgba(0, 0, 0, 0.22) solid;
            padding-bottom: 4px;
          }
          .share_this p {
            color: #222222;
            font-size: 16px;
            font-family: "Khand", sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            position: relative;
            top: 3px;
            padding-right: 20px;
          }
          .share_this p:after {
            content: "";
            width: 8px;
            height: 8px;
            position: absolute;
            top: 7px;
            right: 8px;
            border-bottom: 1px solid #222222;
            border-right: 1px solid #222222;
            transform: rotate(-45deg);
          }
          .share_this ul {
            display: flex;
            align-items: center;
          }
          .share_this ul li {
            padding: 0 8px;
          }
          .share_this img {
            border-radius: 0;
            width: auto;
          }
          .podcast-listing_left img {
            width: 100%;
            display: block;
          }
          a img {
            border: none;
          }
          .share_this:after {
            content: "";
            position: absolute;
            left: 0;
            background: #eb3d3c;
            width: 43px;
            height: 3px;
            top: 23px;
          }
          .podcast-listing_row .share_this:after {
            opacity: 0;
          }
          .read_more {
            width: 100%;
            text-align: center;
            position: relative;
            margin-top: 20px;
          }
          .read_more:before {
            content: "";
            position: absolute;
            background: #eb3d3c;
            top: 19px;
            width: 110px;
            left: 0;
            height: 3px;
            z-index: 1;
          }
          .read_more a {
            background: #eb3d3c 0% 0% no-repeat padding-box;
            border-radius: 23px;
            width: 112px;
            height: 30px;
            display: inline-block;
            text-align: center;
            line-height: 33px;
            text-decoration: none;
            letter-spacing: -0.3px;
            color: #ffffff;
            font-size: 14px;
            position: relative;
            z-index: 1;
          }
          .read_more a:hover {
            color: white !important;
          }import { useState } from 'react';

          .read_more:after {
            content: "";
            position: absolute;
            border: 1px solid #dddddd;
            top: 19px;
            width: 100%;
            left: 0;
          }
          .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer}

        `}
      </style>
    </div>
  );
};

export default PodcastCategories;
