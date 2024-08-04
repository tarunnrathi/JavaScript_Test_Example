import { setDefaultImage } from "includes/article.util";
import { BlogsUtil } from "includes/blogs.util";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import { get_static_img } from "includes/helper";
import LazyLoadImage from "components/Common/CustomImage";

const BlogDetails = ({
  pageContent,
  authorInfo,
  liveTime,
  shareTopicUrls,
  pageAds,
  articleData,
  taboolaList,
}) => {
  const articleContent = articleData?.body?.replace(
    new RegExp("\n", "g"),
    "<br/>"
  );
  const authorBlogsUrl = BlogsUtil.formAuthorBlogsUrl(
    authorInfo?.nicename,
    authorInfo?.id
  );
  return (
    <>
      <h1>{articleData?.display_headline}</h1>
      <div className="blogAuthorDetails__top">
        <div className="blogAuthorDetails__top--left">
          <a href={authorBlogsUrl}>
            <figure>
              <LazyLoadImage
                src={get_static_img(
                  authorInfo?.avtar,
                  100,
                  100,
                )}
                onError={setDefaultImage}
                alt={authorInfo?.hindi_name}
                title={authorInfo?.hindi_name}
                width={100}
                height={100}
              />
            </figure>
            <h3>
              <span>{authorInfo?.hindi_name}</span>
              {authorInfo?.designation}
            </h3>
          </a>
        </div>
        <div className="blogAuthorDetails__top--right">
          <h3 className="blogAuthorDetails__intro">{articleData?.intro}</h3>
          <div className="blogAuthorDetails__source">
            <span>
              Source: <strong> News18Hindi </strong>
            </span>
            <span>
              Last updated on:
              <strong>
                {liveTime(pageContent?.updated_at)}
              </strong>
            </span>
          </div>

          <div className="blogAuthorDetails__topRight--topshare">
            <span>शेयर करें: </span>
            <a href={shareTopicUrls.facebook} target="_blank">
              <img
                src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-facebook.png"
                alt="Share this page on Facebook"
                title="Share this page on Facebook"
              />
            </a>
            <a href={shareTopicUrls.twitter} target="_blank">
              <img
                src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-twitter.png"
                alt="Share this page on Twitter"
                title="Share this page on Twitter"
              />
            </a>
            <a href={shareTopicUrls.linkedIn} target="_blank">
              <img
                src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-linkedin.png"
                alt="Share this page on LinkedIn"
                title="Share this page on LinkedIn"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="middlead">
        <SiteAd
          width={728}
          height={90}
          slotId={"Desktop_Static_Ad_1"}
          adUnit={pageAds.BTF_728}
          sizes={[[728, 90]]}
          loadonScroll={true}
        ></SiteAd>
      </div>
      <div className="articleimg">
        <LazyLoadImage
          src={articleData?.images?.url}
          onError={setDefaultImage}
          alt={pageContent?.display_headline}
          title={pageContent?.display_headline}
          width={700}
          height={620}
        />
        <h5>{articleData?.images.caption}</h5>
      </div>
      <div>
        <div
          className="blog__description"
          dangerouslySetInnerHTML={{
            __html: articleContent,
          }}
        ></div>
        <strong className="blog__description">
          (डिस्क्लेमर: ये लेखक के निजी विचार हैं. लेख में दी गई किसी भी जानकारी
          की सत्यता/सटीकता के प्रति लेखक स्वयं जवाबदेह है. इसके लिए News18Hindi
          उत्तरदायी नहीं है.)
        </strong>
        <div className="blogAuthorDetails__bottom">
          <span className="blogAuthorDetails__bottom--topbtn">
            ब्लॉगर के बारे में
          </span>
          <div className="blogAuthorDetails__bottom--left">
            <a href={authorBlogsUrl}>
              <figure>
                <LazyLoadImage
                  src={get_static_img(
                    authorInfo?.avtar,
                    100,
                    100,
                  )}
                  onError={setDefaultImage}
                  alt={authorInfo?.hindi_name}
                  title={authorInfo?.hindi_name}
                  width={100}
                  height={100}
                />
              </figure>
            </a>
          </div>
          <div className="blogAuthorDetails__bottom--right">
            <h3>
            <a href={authorBlogsUrl}>
              {authorInfo?.hindi_name}
              <span>{authorInfo?.designation}</span>
            </a>
            </h3>
            <p>{authorInfo?.author_bio}</p>
            <strong>
              <a href={authorBlogsUrl} className="readMoreBtn">
                और भी पढ़ें
              </a>
            </strong>
          </div>
        </div>
        <div className="blogAuthorDetails__share">
          <a href={shareTopicUrls.facebook} target="_blank">
            <img
              src="https://images.news18.com/ibnkhabar/uploads/2019/09/byeline-fb.jpg"
              alt="facebook"
              title="facebook"
            />
          </a>
          <a href={shareTopicUrls.twitter} target="_blank">
            <img
              src="https://images.news18.com/ibnkhabar/uploads/2019/09/byeline-tw.jpg"
              alt="Twitter"
              title="twitter"
            />
          </a>
          <a href={shareTopicUrls.linkedIn} target="_blank">
            <img
              src="https://images.news18.com/ibnkhabar/uploads/2019/09/linedin.jpg"
              alt="whatsapp"
              title="Linked-In"
            />
          </a>
        </div>
        <div className="blogDetails__tags">
          <div className="tag">
            <ul>
              {articleData &&
                articleData?.tags &&
                articleData?.tags.map((tag, index) => (
                  <li key={index}>
                    <a href={`/tag/${tag.slug}/`}>{tag.name}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="bynow-text">
          <span>First published: </span>
          {liveTime(pageContent?.created_at)}
        </div>
      </div>
      <Taboola
        mode={taboolaList.bottom.mode}
        id={taboolaList.bottom.id}
        container={taboolaList.bottom.container}
        placement={taboolaList.bottom.placement}
      />
      <style jsx global>{`
        h1,
        h2,
        h3,
        h4,
        p,
        span {
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }
        .blogAuthorDetails__top {
          display: flex;
          border-top: 1px solid #d4d4d4;
          border-bottom: 1px solid #d4d4d4;
          padding: 3px 0;
          margin-bottom: 15px;
          margin-top: 15px;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }

        .blogAuthorDetails__top--left {
          padding-right: 30px;
          margin-right: 30px;
          border-right: 1px solid #ebebeb;
        }
        .blogAuthorDetails__top--left a figure {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 100%;
          margin: auto auto 10px auto;
        }
        .blogAuthorDetails__top--left a figure img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        .blogAuthorDetails__top--left a h3 {
          color: #bebdbd;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.65;
          text-align: center;
        }

        .blogAuthorDetails__top--left a h3 span {
          color: #c0221f;
          font-size: 18px;
          font-weight: 700;
          display: block;
        }

        a {
          text-decoration: none;
          color: #111;
        }

        .blogAuthorDetails__top--right {
          width: 100%;
        }

        .blogAuthorDetails__intro {
          font-size: 16px;
          line-height: 26px;
          font-weight: 700;
          color: #666;
          margin-top: 5px;
        }
        .blogAuthorDetails__source {
          font-size: 14px !important;
          color: #888;
        }
        .blogAuthorDetails__source span {
          display: block;
          margin: 20px 0;
        }
        .blogAuthorDetails__source span b {
          font-weight: 700;
        }
        .blogAuthorDetails__topRight--topshare {
          display: flex;
          align-items: center;
          font-size: 15px;
          color: #bebdbd;
        }

        .blogAuthorDetails__topRight--topshare a {
          margin-left: 18px;
        }

        .articleimg {
          position: relative;
          margin-top: 15px;
          margin-bottom: 15px;
          line-height: 0;
        }
        .articleimg img {
          width: 100%;
        }

        .articleimg h5 {
          font-size: 14px;
          line-height: 20px;
          color: #eee;
          padding: 10px;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.6);
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }
        .blog__description {
          color: #404040;
          padding-bottom: 20px;
          margin: 0;
          font-size: 18px !important;
          line-height: 1.45 !important;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
          overflow: hidden;
        }
        .blog__description p img {
          width: 100%;
          height: auto;
        }
        .blogAuthorDetails__bottom {
          display: flex;
          padding: 50px 20px 0 0;
          margin: 20px 0 0 0;
          position: relative;
          border-bottom: 1px #e0e0e0 solid;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }
        .blogAuthorDetails__bottom--topbtn {
          background: 0 0;
          color: #404040;
          box-shadow: none;
          font-weight: 700;
          width: 100%;
          padding: 0;
          border-radius: 0;
          position: absolute;
          top: -5px;
          height: 44px;
          line-height: 44px;
        }
        .blogAuthorDetails__bottom--left {
          margin-right: 30px;
        }
        .blogAuthorDetails__bottom--left a figure {
          width: 120px;
          height: 120px;
          overflow: hidden;
          border-radius: 100%;
          margin-bottom: 10px;
        }
        .blogAuthorDetails__bottom--left a figure img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        .blogAuthorDetails__bottom--right {
          width: 100%;
        }
        .blogAuthorDetails__bottom--right h3 {
          font-size: 20px;
          color: #e33128;
          font-weight: 700;
          margin-bottom: 20px;
        }
        .blogAuthorDetails__bottom--right h3 span {
          font-size: 14px;
          font-weight: 400;
          color: #777;
          margin-left: 20px;
        }
        .blogAuthorDetails__bottom--right p {
          font-size: 16px;
          color: #333;
          line-height: 28px;
        }
        .readMoreBtn {
          color: #e33128;
          text-align: end;
          width: 100%;
          display: inline-block;
        }
        .blogAuthorDetails__share {
          text-align: center;
          padding: 12px 0;
          border-top: 1px solid #eee;
        }
        .blogAuthorDetails__share a {
          margin: 0 2px;
        }
        .blogDetails__tags {
          padding: 0;
          text-align: center;
          margin-bottom: 20px;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }
        .blogDetails__tags ul {
          margin: 0;
          padding: 10px 0;
        }
        .blogDetails__tags ul li {
          font-size: 14px;
          list-style: none;
          display: inline-block;
          margin: 0 0 10px 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          padding: 6px 8px;
        }
        .blogDetails__tags ul li a {
          color: #888;
          padding: 6px 5px;
        }
        .bynow-text {
          font-size: 14px;
          color: #404040;
          padding-bottom: 15px;
          margin-bottom: 10px;
          border-bottom: 1px solid #ccc;
          line-height: 19px;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }
        .special-text {
          font-size: 18px;
          line-height: 28px;
          color: #505050;
          margin: 20px 40px 0px 20px;
          border-left: 8px solid #ee1b24;
          padding: 10px 10px 10px 15px;
          font-style: italic;
          font-weight: bold;
        }

        .middlead {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 5px auto;
          min-height: 20px;
          width: max-content !important;
          background: #eee !important;
          color: #444 !important;
          font-size: 12px !important;
          text-align: center !important;
        }
      `}</style>
    </>
  );
};

export default BlogDetails;
