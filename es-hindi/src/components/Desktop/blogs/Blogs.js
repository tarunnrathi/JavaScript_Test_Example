import getConfig from "next/config";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import BlogsList from "./BlogsList";
import AuthorBlogs from "./AuthorBlogs";
import BlogDetails from "./BlogDetails";
import SITE_CONfIG from "config/site.config";
import AuthorsList from "./AuthorsList";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { useState } from "react";
import { timeConverter, BlogsUtil } from 'includes/blogs.util';
import { getArticleList } from "api/global/Common";

const Blogs = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const {
    paramObj,
    pageLimit,
    imageWidth,
    imageHeight,
    photoStories,
    topStory,
    topStories,
    authorInfo,
    dataLength,
    pageContent,
    pageAds,
    articleData,
    taboolaList,
  } = props.data;
  const { author, topic, authorId, isAuthorsListPage, requestURL, isBlogDetailPage } = paramObj;
  const pageData = pageContent[0] || [];

  const outBrainUrl = props.data.currentUrl.replace(
    /https:\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );

  const shareTopicUrls = {
    facebook:
      `https://www.facebook.com/sharer.php?u=${requestURL}`,
    twitter:
      `https://twitter.com/share?url=${requestURL}`,
    linkedIn:
      `https://www.linkedin.com/shareArticle/?mini=true&amp;url=${requestURL}`,
  };

  let rhsTopStoryListing = [];
  if ("rhsTopStoryListing" in topStory)
    rhsTopStoryListing = topStory.rhsTopStoryListing;

  const noContent = dataLength > 450 && paramObj.page > 30 ? false : true;

  const criteriaCheck = !isAuthorsListPage && !author && !topic;
  const [categoryData, setCategoryData] = useState(pageContent);
  const [catPageLimit, setCatPageLimit] = useState(pageLimit);
  const hasMoreItems = criteriaCheck ? categoryData.length < 960 : categoryData.length >= 28;
  const [hasMoreData, setHasMoreData] = useState(hasMoreItems);
  const loadMore = async() => {
    const blogApi = criteriaCheck ? await getArticleList({ count: 15, offset: catPageLimit, filter: { "post_type": "blog" }, fields: BlogsUtil.apiQueryFilters.blogsList }, true)
                  : await getArticleList({ count: 28, offset: catPageLimit, filter: { "post_type": "blog", "all_authors": `${authorId}` }, fields: BlogsUtil.apiQueryFilters.authorBlogs }, true);
    const latestData = blogApi || [];
    const newCatData = [...categoryData, ...latestData];
    setCategoryData(() => newCatData);

    const isData = criteriaCheck ? newCatData.length < 960 : latestData.length >= 28;
    setHasMoreData(isData);
    setCatPageLimit((prev) => prev + pageLimit);
  };

  return (
    <>
      <div className="outer">
        <div className="section-blog clearfix">
          <div className="section-blog-left resLiftSideFull">
            <div
              className={`breadcrumb ${author && topic ? "hide__borderBottom" : ""
                }`}
            >
              {author ? (
                author && topic ? (
                  <>
                    <a href="/">होम /</a>  <a href="/blogs/">ब्लॉग /</a> 
                    <span> ब्लॉगर </span>
                  </>
                ) : (
                  <>
                    <a href="/">होम /</a>  <a href="/blogs/">ब्लॉग /</a> {" "}
                    <a href={`/blogs/experts/`}>NEWS 18 HINDI AUTHORS /</a> {" "}
                    <span>{authorInfo.hindi_name}</span>
                  </>
                )
              ) : isAuthorsListPage ? (
                <>
                  <a href="/">होम /</a>  <a href="/blogs/">ब्लॉग /</a> {" "}
                  <span>NEWS 18 HINDI AUTHORS</span>
                </>
              ) : (
                <>
                  <a href="/">होम /</a>  <span>ब्लॉग</span>
                </>
              )}
            </div>
            {author ? (
              author && topic ? (
                <BlogDetails
                  pageContent={pageData}
                  articleData={articleData}
                  authorInfo={authorInfo}
                  imageHeight={imageHeight}
                  imageWidth={imageWidth}
                  liveTime={timeConverter}
                  shareTopicUrls={shareTopicUrls}
                  pageAds={pageAds}
                  taboolaList={taboolaList}
                />
              ) : (
                <AuthorBlogs
                  pageContent={categoryData}
                  authorInfo={authorInfo}
                  imageHeight={imageHeight}
                  imageWidth={imageWidth}
                  shareTopicUrls={shareTopicUrls}
                />
              )
            ) : isAuthorsListPage ? (
              <AuthorsList
                pageContent={pageData.authorsList}
                imageHeight={400}
                imageWidth={400}
                recommendedAuthorBlogs={pageData.recommendedAuthorBlogs}
                pageAds={pageAds}
              />
            ) : (
              <BlogsList
                listItemsData={categoryData}
                noContent={noContent}
                liveTime={timeConverter}
                pageAds={pageAds}
              />
            )}
            {categoryData.length > 0
              && !isBlogDetailPage
              && !isAuthorsListPage
              && hasMoreData
              && <button onClick={loadMore} className="load_more">Load More</button>}
            <Outbrain widgetId="AR_9" widgetSrc={SITE_CONfIG.mainUrl} />
          </div>
          <div className="rightwrap">
            <RhsCommon
              section="tag"
              pageAds={pageAds}
              currentURL={outBrainUrl}
              topicName={author}
              photoStories={photoStories}
              topStories={
                rhsTopStoryListing.length ? rhsTopStoryListing : topStories
              }
            />
          </div>
        </div>
        <SiteAd
          slotId="Shosh_OOP_id"
          renderOutOfThePage={true}
          adUnit={pageAds?.Shosh_OOP_id}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      </div>
      <style jsx>
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

          .breadcrumb {
            font-size: 14px;
            text-transform: uppercase;
            line-height: 18px;
            position: relative;
            border-bottom: 1px solid #ebebeb;
            padding: 15px 0 10px 0;
            margin-bottom: 25px;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          }
          .hide__borderBottom {
            border-bottom: none;
          }
          .breadcrumb a {
            color: #e1261d;
            font-size: 14px;
            font-weight: 400;
          }

          .breadcrumb span {
            color: #404040;
            font-size: 14px;
            font-weight: 400;
          }

          .breadcrumb a:hover {
            color: #e1261d;
          }

          .breadcrumb a:last-of-type,
          span {
            font-weight: 700;
          }

          .breadcrumb a:last-of-type:hover {
            color: #000;
          }

          a {
            text-decoration: none;
            color: #111;
          }

          .rightwrap {
            width: 300px;
            float: right;
          }

          .clearfix {
            clear: both;
          }
          .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer}
        `}
      </style>
    </>
  );
};
export default Blogs;
