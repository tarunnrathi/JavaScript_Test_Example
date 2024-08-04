import { imageLoader, setDefaultImage } from "includes/article.util";
import { BlogsCssGlobalVariables, BlogsUtil } from "includes/blogs.util";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { get_static_img } from "includes/helper";
import LazyLoadImage from "components/Common/CustomImage";

const AuthorsList = ({
  pageContent,
  imageWidth,
  imageHeight,
  recommendedAuthorBlogs,
  pageAds
}) => {
  const {
    red,
    lightRed,
    darkRed,
    white,
    lightWhite,
    black,
    lightBlack,
    grey,
    lightGrey1,
    lightGrey2,
    fadedGrey,
  } = BlogsCssGlobalVariables.colors;
  const authorsList = pageContent.slice(1);
  const pageData = pageContent[0] || [];
  return (
    <>
      <div className="authorsList__top">
        <div className="authorsList__top--left">
          <a
            href={BlogsUtil.formAuthorBlogsUrl(pageData?.nicename, pageData?.id)}
          >
            <figure>
              <LazyLoadImage
                src={get_static_img(pageData?.avtar, 260, 260)}
                onError={setDefaultImage}
                alt={pageData?.hindi_name}
                title={pageData?.hindi_name}
                width={260}
                height={260}
              />
            </figure>
          </a>
        </div>
        <div className="authorsList__top--right">
          <a
            href={BlogsUtil.formAuthorBlogsUrl(pageData?.nicename, pageData?.id)}
            className="readMoreBtn__wrapper"
          >
            <span className="readMoreBtn">और भी पढ़ें</span>
          </a>
          <h2>
            {pageData?.hindi_name}
            <span>{pageData?.designation}</span>
          </h2>
          <ul className="authorsList__top--blogs">
            {recommendedAuthorBlogs && recommendedAuthorBlogs.length > 0 &&
              recommendedAuthorBlogs.map((blog, index) => {
                const blogThumbnail = blog?.images?.url;
                const blogDetailsUrl = BlogsUtil.formTopicUrlParam(blog?.weburl_r);
                return (
                  <li key={index}>
                    <a href={blogDetailsUrl}>
                      <figure>
                        <LazyLoadImage
                          src={blogThumbnail}
                          onError={setDefaultImage}
                          alt={blog?.title}
                          title={blog?.title}
                          width={187}
                          height={125}
                        />
                      </figure>
                      {blog?.display_headline}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <ul className="authorsList__items--wrapper">
        {authorsList &&
          authorsList.map((author, index) => {
            const authorBlogsUrl = BlogsUtil.formAuthorBlogsUrl(
              author?.nicename,
              author?.id
            );
            return (
              <>
                <li key={index}>
                  <a href={authorBlogsUrl} className="authorsList__item--top">
                    <figure>
                      <LazyLoadImage
                        src={get_static_img(
                          author?.avtar,
                          142,
                          142,
                        )}
                        onError={setDefaultImage}
                        alt={author?.hindi_name}
                        title={author?.hindi_name}
                        width={142}
                        height={142}
                      />
                    </figure>
                    <h3>
                      {author?.hindi_name}
                      <span> {author?.designation} </span>
                    </h3>
                  </a>
                  {author.author_bio ? (
                    <a href={authorBlogsUrl}>
                      <h2>{author?.author_bio}</h2>
                    </a>
                  ) : (
                    <a>
                      <h4></h4>
                    </a>
                  )
                  }
                  <a href={authorBlogsUrl} className="authorsList__item--bottom">
                    <span className="readMoreBtn">और भी पढ़ें</span>
                  </a>
                </li>
                {(index === 15) && (
                  <div className="middlead">
                    <SiteAd
                      width={728}
                      height={90}
                      slotId={`Desktop_Static_Ad_${index + 1}`}
                      adUnit={pageAds?.BTF_728}
                      sizes={[[728, 90]]}
                      removeAdSpan={true}
                      loadonScroll={true}
                    ></SiteAd>
                  </div>
                )}
              </>
            );
          })}
      </ul>
      <style jsx>
        {`
          .authorsList__top {
            display: flex;
            background: ${lightWhite} 0 0 no-repeat padding-box;
            padding: 20px 10px;
            padding-bottom: 0;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }
          .authorsList__top--left {
            margin-right: 45px;
          }
          a {
            text-decoration: none;
            color: ${black};
          }
          .authorsList__top--left figure {
            width: 260px;
            height: 260px;
            overflow: hidden;
            border-radius: 100%;
          }
          .authorsList__top--left figure img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
          .authorsList__top--right {
            width: 100%;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }
          .readMoreBtn__wrapper {
            background: ${lightRed};
            padding: 8px 20px;
            display: inline-block;
            float: right;
            border-radius: 5px;
            box-shadow: 2px 2px 3px #ccc;
            margin-top: 10px;
          }

          .readMoreBtn {
            position: relative;
            display: inline-block;
            padding-right: 15px;
            color: ${red};
            font-size: 14px;
            font-weight: 700;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }

          .readMoreBtn:after,
          .readMoreBtn:before {
            content: "";
            position: absolute;
          }

          .readMoreBtn:before {
            width: 8px;
            height: 2px;
            background: ${red};
            top: 8px;
            right: 0;
          }

          .readMoreBtn:after {
            width: 4px;
            height: 4px;
            border-right: 2px solid ${red};
            border-bottom: 2px solid ${red};
            top: 6px;
            transform: rotate(-45deg);
            right: 0;
          }

          .readMoreBtn__wrapper .readMoreBtn {
            color: ${white};
            font-size: 15px;
          }

          .readMoreBtn__wrapper .readMoreBtn:before {
            background: ${white};
          }
          .readMoreBtn__wrapper .readMoreBtn:after {
            border-right: 2px solid ${white};
            border-bottom: 2px solid ${white};
          }

          .authorsList__top--right h2 {
            color: ${red};
            font-size: 30px;
            font-weight: 700;
            margin-bottom: 20px;
            border-bottom: 1px solid #dadada;
            padding-bottom: 10px;
            line-height: 32px;
          }
          .authorsList__top--right h2 span {
            font-weight: 400;
            color: ${grey};
            font-size: 16px;
            display: block;
          }
          .authorsList__top--blogs {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }
          .authorsList__top--blogs li {
            width: 32%;
            margin-bottom: 20px;
          }
          .authorsList__top--blogs li a {
            color: ${lightGrey1};
            font-size: 14px;
            line-height: 20px;
          }
          .authorsList__top--blogs li:hover a {
            color: ${darkRed};
          }
          .authorsList__top--blogs li a figure {
            line-height: 0;
            margin-bottom: 12px;
            overflow: hidden;
            width: 100%;
            border-radius: 5px;
          }
          .authorsList__top--blogs li a figure img {
            width: 100%;
            object-fit: cover;
          }
          .authorsList__items--wrapper {
            display: flex;
            flex-wrap: wrap;
            padding: 20px 0 15px 0;
            margin-bottom: 10px;
            border-bottom: 1px dashed rgba(112, 112, 112, 0.5);
          }
          .authorsList__items--wrapper li {
            width: 25%;
            box-sizing: border-box;
            padding: 10px 10px 0 10px;
            border-radius: 10px;
            margin-bottom: 50px;
            transition: all 0.2s ease-in-out;
          }
          .authorsList__item--top {
            height: 220px;
          }
          .authorsList__items--wrapper li:hover {
            background: ${lightRed};
          }

          .authorsList__items--wrapper li:hover a h2:before {
            border-color: ${white};
          }
          .authorsList__items--wrapper li:hover a h2,
          .authorsList__items--wrapper li:hover a h3,
          .authorsList__items--wrapper li:hover a h3 span {
            color: ${white} !important;
          }

          .authorsList__items--wrapper li a {
            display: block;
            text-align: center;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }
          .authorsList__items--wrapper li a figure {
            width: 150px;
            height: 150px;
            overflow: hidden;
            border-radius: 100%;
            margin: auto;
            border: 4px solid ${white};
            line-height: 0;
            position: relative;
          }
          .authorsList__items--wrapper li a figure img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
          .authorsList__items--wrapper li a h3 {
            font-size: 15px;
            font-weight: 700;
            color: ${fadedGrey};
            padding: 10px 0;
          }
          .authorsList__items--wrapper li a h3 span {
            font-weight: 400;
            color: ${grey};
            display: block;
            font-size: 13px;
          }

          .authorsList__items--wrapper li a h2,
          .authorsList__items--wrapper li a h4{
            position: relative;
            padding-left: 18px;
            border-top: 1px solid ${lightGrey2};
            font-size: 14px;
            font-weight: 700;
            color: ${lightBlack};
            line-height: 1.45;
            padding-top: 10px;
            text-align: left;
            height: 50px;
            overflow: hidden;
            margin-bottom: -10px;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }
          .authorsList__items--wrapper li a h2:before {
            content: "";
            position: absolute;
            width: 6px;
            height: 6px;
            border-top: 2px solid ${red};
            border-right: 2px solid ${red};
            transform: rotate(45deg);
            top: 17px;
            left: 0;
          }
          .authorsList__item--bottom {
            position: relative;
            top: 35px;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
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
        `}
      </style>
    </>
  );
};

export default AuthorsList;
