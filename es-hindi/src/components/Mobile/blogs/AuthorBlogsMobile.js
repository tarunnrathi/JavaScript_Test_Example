import { setDefaultImage } from "includes/article.util";
import { BlogsCssGlobalVariables, BlogsUtil } from "includes/blogs.util";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { get_static_img } from "includes/helper";
import LazyLoadImage from "components/Common/CustomImage";

const AuthorBlogsMobile = ({
  pageContent,
  authorInfo,
  shareTopicUrls,
  pageAds,
}) => {
  const {
    red,
    darkRed,
    lightGrey1,
    ash,
    darkSkyBlue,
    lightSkyBlue,
    fadedBlack,
  } = BlogsCssGlobalVariables.colors;

  return (
    <>
      <div className="authorBlogs__authorInfo">
        <figure>
          <LazyLoadImage
            src={get_static_img(
              authorInfo?.avtar,
              110,
              110,
            )}
            onError={setDefaultImage}
            alt={authorInfo?.hindi_name}
            title={authorInfo?.hindi_name}
            width={110}
            height={110}
          />
        </figure>
        <div className="blogAuthorDetails__left--share">
          {authorInfo?.facebook && (
            <a href={authorInfo?.facebook} target="_blank">
              <img
                src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-facebook.png"
                alt={`${authorInfo.hindi_name} Facebook`}
                title={`${authorInfo.hindi_name} Facebook`}
              />
            </a>
          )}
          {authorInfo?.twitter && (
            <a href={'https://twitter.com/'+authorInfo?.twitter} target="_blank">
              <img
                src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-twitter.png"
                alt={`${authorInfo.hindi_name} Twitter`}
                title={`${authorInfo?.hindi_name} Twitter`}
              />
            </a>
          )}
        </div>
        <h4>
          {authorInfo?.hindi_name}
          <span className="com_des">{authorInfo?.designation}</span>
        </h4>
        <p className="authorBlogs__authorInfo--intro">
          {authorInfo?.author_bio}
        </p>
        <div className="authorBlogs__authorInfo--rightShare">
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
      <h2 className="authorBlogs__list--heading">ब्लॉग</h2>
      <ul className="authorBlogs__list">
        {pageContent &&
          pageContent.map((blog, index) => {
            const blogThumbnail = blog?.images?.url;
            const blogDetailsUrl = BlogsUtil.formTopicUrlParam(blog?.weburl_r);
            return (
              <>
                <li key={index}>
                  <a href={blogDetailsUrl}>
                    <figure>
                      <LazyLoadImage
                        src={blogThumbnail}
                        onError={setDefaultImage}
                        alt={blog?.display_headline}
                        title={blog?.display_headline}
                        width={170}
                        height={114}
                      />
                    </figure>
                    {blog?.display_headline}
                  </a>
                </li>
                {(index === 5 ||
                  index === 11 ||
                  index === 17 ||
                  index === 23) && (
                  <div className="clearfix add">
                    <div className="addinner-box addinner_box_300x250">
                      <SiteAd
                        width={300}
                        height={250}
                        slotId={`mobileAdNew300x250_${index}`}
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
              </>
            );
          })}
      </ul>
      <style jsx>
        {`
          .authorBlogs__authorInfo {
            margin-top: 25px;
          }
          .authorBlogs__authorInfo figure {
            width: 110px;
            height: 110px;
            overflow: hidden;
            border-radius: 100%;
            margin: auto auto 15px auto;
          }
          .authorBlogs__authorInfo figure img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
          .authorBlogs__authorInfo h4 {
            font-size: 22px;
            line-height: 26px;
            color: ${darkRed};
            text-align: center;
            border-bottom: 1px solid #dedede;
            padding-bottom: 10px;
            font-weight: 700;
          }
          .authorBlogs__authorInfo h4 span {
            color: ${ash};
            font-weight: 400;
            display: block;
            font-size: 14px;
          }

          .blogAuthorDetails__left--share {
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
          }
          .blogAuthorDetails__left--share a:nth-child(1) {
            background: ${lightSkyBlue};
          }
          .blogAuthorDetails__left--share a:nth-child(2) {
            background: ${darkSkyBlue};
          }
          .blogAuthorDetails__left--share a {
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 8px;
            border-radius: 5px;
          }

          .blogAuthorDetails__left--share a img {
            filter: brightness(0) invert(1);
          }

          .authorBlogs__authorInfo--intro {
            color: ${fadedBlack};
            line-height: 28px;
            margin: 10px 0;
            font-size: 18px;
            text-align: justify;
          }

          .authorBlogs__authorInfo--rightShare {
            color: ${ash};
            display: flex;
            align-items: center;
            font-size: 18px;
            margin: 15px 0 20px 0;
          }
          .authorBlogs__authorInfo--rightShare a {
            margin-left: 18px;
          }

          // author blogs list
          .authorBlogs__list--heading {
            color: ${darkRed};
            font-size: 22px;
            margin-bottom: 15px;
          }

          .authorBlogs__list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }
          .authorBlogs__list li {
            width: 48%;
            margin-bottom: 30px;
            flex-shrink: 0;
          }

          .authorBlogs__list li a {
            color: ${lightGrey1};
            font-size: 14px;
            line-height: 20px;
            transition: all 0.2s ease-in-out;
          }

          .authorBlogs__list li a figure {
            line-height: 0;
            overflow: hidden;
            margin-bottom: 12px;
            width: 100%;
            border-radius: 5px;
          }

          .authorBlogs__list li a figure img {
            width: 100%;
          }

          // ADS
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

          // div.addinner_box_300x250 {
          //   height: 250px;
          //   width: 300px;
          // }
        `}
      </style>
    </>
  );
};

export default AuthorBlogsMobile;
