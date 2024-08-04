import Outbrain from "widgets/Common/Responsive/Outbrain";
import SITE_CONfIG from "config/site.config";
import BlogDetailsMobile from "./BlogDetailsMobile";
import AuthorBlogsMobile from "./AuthorBlogsMobile";
import AuthorsListMobile from "./AuthorsListMobile";
import BlogsListMobile from "./BlogsListMobile";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { useState } from "react";
import { timeConverter, BlogsUtil } from 'includes/blogs.util';
import { getArticleList } from "api/global/Common";

const BlogsMobile = (props) => {
  const {
    paramObj,
    pageLimit,
    imageWidth,
    imageHeight,
    authorInfo,
    dataLength,
    pageContent,
    pageAds,
    articleData,
    taboolaList,
  } = props.data;
  const { author, topic, authorId, isAuthorsListPage, requestURL, isBlogDetailPage } = paramObj;
  const pageData = pageContent[0] || [];

  let whatsappUrl = "";
  if (pageData && pageData?.display_headline && pageData?.weburl) {
    whatsappUrl = `whatsapp://send?text=${pageData?.display_headline} - ${BlogsUtil.formTopicUrlParam(pageData?.weburl)}`;
  }

  const shareTopicUrls = {
    facebook:
      `https://www.facebook.com/sharer.php?u=${requestURL}`,
    twitter:
      `https://twitter.com/intent/tweet?mini=true&url=${requestURL}`,
    linkedIn:
      `https://www.linkedin.com/shareArticle/?mini=true&amp;&url=${requestURL}`,
    whatsapp: whatsappUrl,
  };

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
      <div className="clearfix add">
        <div className="addinner-box addinner_box_300x250">
          <SiteAd
             width={336}
             height={280}
            slotId={"mobileAdNew300x250_0"}
            adUnit={pageAds.ATF_320}
            sizes={[
              [300, 250],
              [336, 280]
            ]}
            lazyload={true}
            style={{ padding: "16px" }}
          ></SiteAd>
        </div>
      </div>
      <div className={`${author && topic ? "" : "container"}`}>
        <div
          className={`breadcrumb ${author && topic ? "hide__borderBottom" : ""
            }`}
        >
          {author ? (
            author && topic ? (
              <>
                <a href="/">होम /</a>  <a href="/blogs/">ब्लॉग /</a> 
                <h1> ब्लॉगर </h1>
              </>
            ) : (
              <>
                <a href="/">होम /</a>  <a href="/blogs/">ब्लॉग  /</a>{" "}
                <a href={`/blogs/experts/`}>News 18 Hindi Authors</a> /{" "}
                <h1>{authorInfo.hindi_name}</h1>
              </>
            )
          ) : isAuthorsListPage ? (
            <>
              <a href="/">होम /</a>  <a href="/blogs/">ब्लॉग /</a> {" "}
              <h1>News 18 Hindi Authors</h1>
            </>
          ) : (
            <>
              <a href="/">होम /</a>  <h1>ब्लॉग</h1>
            </>
          )}
        </div>
        {author ? (
          author && topic ? (
            <BlogDetailsMobile
              pageContent={pageData}
              authorInfo={authorInfo}
              imageHeight={imageHeight}
              imageWidth={imageWidth}
              liveTime={timeConverter}
              shareTopicUrls={shareTopicUrls}
              pageAds={pageAds}
              articleData={articleData}
              taboolaList={taboolaList}
            />
          ) : (
            <AuthorBlogsMobile
              pageContent={categoryData}
              authorInfo={authorInfo}
              imageHeight={imageHeight}
              imageWidth={imageWidth}
              shareTopicUrls={shareTopicUrls}
              pageAds={pageAds}
            />
          )
        ) : isAuthorsListPage ? (
          <AuthorsListMobile
            pageContent={pageData.authorsList}
            imageHeight={400}
            imageWidth={400}
            recommendedAuthorBlogs={pageData.recommendedAuthorBlogs}
            pageAds={pageAds}
          />
        ) : (
          <BlogsListMobile
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
        <div className="container">
          {author && topic && (
            <div className="clearfix add">
              <div className="addinner-box addinner_box_300x250">
                <SiteAd
                  width={300}
                  height={250}
                  slotId={`mobileAdNew300x250_blog`}
                  adUnit={pageAds.BTF_300_id}
                  sizes={[
                    [300, 250],
                    [336, 280],
                  ]}
                  lazyload={true}
                ></SiteAd>
              </div>
            </div>
          )}
          <Outbrain widgetId="MB_9" widgetSrc={SITE_CONfIG.mainUrl} />
        </div>
      </div>
      {typeof pageAds.PG_1x1_2 !== "undefined" && pageAds.PG_1x1_2 !== "" ? (
        <SiteAd
          slotId="PG_1x1_2"
          adUnit={pageAds.PG_1x1_2}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : null}
      {typeof pageAds.PG_1x1_3 !== "undefined" && pageAds.PG_1x1_3 !== "" ? (
        <SiteAd
          slotId="PG_1x1_3"
          adUnit={pageAds.PG_1x1_3}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : null}
      <style jsx >
        {`
          body {
            margin: 0;
            padding: 0;
            list-style: none;
            outline: 0;
            text-decoration: none;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          }
          .container {
            padding: 10px;
          }

          .add {
            background: #dbdde3;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
            margin-bottom: 10px;
            display: inline-block;
            width: 100%;
            z-index: 1;
            color: #797e90 !important;
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

          div.addinner_box_300x250 {
            height: 250px;
          }

          .section-blog-left {
            width: calc(100% - 315px);
            float: left;
          }

          .breadcrumb {
            padding: 10px 16px;
            font-size: 15px;
            color: #000;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            font-weight: 700;
            font-family: "Noto Serif", "Droid Serif", sans-serif !important;
          }

          .brdcrm a:first-child {
            padding: 0 5px 0 0;
            flex-shrink: 0;
          }
          .breadcrumb a {
            color: #e1261d;
            font-weight: 400;
          }
          .breadcrumb h1 {
            text-align: left;
            display: inline;
            font-size: inherit;
            color: #757575;
          }

          a {
            text-decoration: none;
            color: #111;
          }

          .clearfix {
            clear: both;
          }
          .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto; margin-top: 10px;cursor:pointer}
        `}
      </style>
    </>
  );
};
export default BlogsMobile;
