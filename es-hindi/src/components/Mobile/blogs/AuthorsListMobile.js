import { setDefaultImage } from "includes/article.util";
import { BlogsCssGlobalVariables, BlogsUtil } from "includes/blogs.util";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { get_static_img } from "includes/helper";
import LazyLoadImage from "components/Common/CustomImage";

const AuthorsListMobile = ({
  pageContent,
  recommendedAuthorBlogs,
  pageAds,
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
        <a href={BlogsUtil.formAuthorBlogsUrl(pageData?.nicename, pageData?.id)}>
          <figure>
            <LazyLoadImage
              src={get_static_img(
                pageData?.avtar,
                180,
                180,
              )}
              onError={setDefaultImage}
              alt={pageData?.hindi_name}
              title={pageData?.hindi_name}
              width={180}
              height={180}
            />
          </figure>
          <h2>
            {pageData?.hindi_name}
            <span>{pageData?.designation}</span>
          </h2>
        </a>
        <ul className="authorsList__top--blogs">
          {recommendedAuthorBlogs &&
            recommendedAuthorBlogs.map((blog, index) => {
              const blogThumbnail = blog?.images?.url;
              const blogDetailsUrl = BlogsUtil.formTopicUrlParam(blog?.weburl_r);
              return (
                <li key={"Author" + index}>
                  <a href={blogDetailsUrl}>
                    <figure>
                      <LazyLoadImage
                        src={blogThumbnail}
                        onError={setDefaultImage}
                        alt={blog?.title}
                        title={blog?.title}
                        width={213}
                        height={180}
                      />
                    </figure>
                    {blog?.display_headline}
                  </a>
                </li>
              );
            })}
        </ul>
        <a
          href={BlogsUtil.formAuthorBlogsUrl(pageData?.nicename, pageData?.id)}
          className="readMoreBtn__wrapper"
        >
          <span className="readMoreBtn">और भी पढ़ें</span>
        </a>
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
                          102,
                          102,
                        )}
                        onError={setDefaultImage}
                        alt={author?.hindi_name}
                        title={author?.hindi_name}
                        width={102}
                        height={102}
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
                  )}
                  <a href={authorBlogsUrl}>
                    <span className="readMoreBtn">और भी पढ़ें</span>
                  </a>
                </li>
                {index === 5 && (
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
          //ADS END
          .authorsList__top {
            margin-top: 20px;
          }
          a {
            text-decoration: none;
            color: ${black};
          }
          .authorsList__top a figure {
            width: 180px;
            height: 180px;
            overflow: hidden;
            border-radius: 100%;
            display: block;
            margin: auto;
          }
          .authorsList__top a figure img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
          .authorsList__top a h2 {
            color: ${darkRed};
            font-size: 24px;
            text-align: center;
            font-weight: 700;
            margin: 15px 0;
            border-bottom: 1px solid #dadada;
            padding-bottom: 15px;
            line-height: 26px;
          }
          .authorsList__top a h2 span {
            font-weight: 400;
            color: ${grey};
            font-size: 16px;
            display: block;
          }

          .readMoreBtn__wrapper {
            background: ${lightRed};
            padding: 8px 20px;
            border-radius: 5px;
            box-shadow: 2px 2px 3px #ccc;
            margin: auto;
            display: table;
          }

          .readMoreBtn {
            position: relative;
            display: inline-block;
            padding-right: 15px;
            color: ${red};
            font-size: 14px;
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

          .authorsList__top--blogs {
            display: flex;
            overflow: scroll;
          }
          .authorsList__top--blogs li {
            width: 60%;
            margin-right: 15px;
            flex-shrink: 0;
          }
          .authorsList__top--blogs::-webkit-scrollbar {
            display: none;
          }
          .authorsList__top--blogs li a {
            color: ${lightGrey1};
            font-size: 15px;
            line-height: 22px;
          }

          .authorsList__top--blogs li a figure {
            line-height: 0;
            overflow: hidden;
            margin-bottom: 12px;
            width: 100%;
            border-radius: 5px;
          }
          .authorsList__top--blogs li a figure img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .authorsList__items--wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 20px 0 15px 0;
            margin-bottom: 10px;
          }
          .authorsList__items--wrapper li {
            width: 46%;
            box-sizing: border-box;
            border-radius: 10px;
            margin: 10px 0;
          }

          .authorsList__items--wrapper li a {
            display: block;
            text-align: center;
          }
          .authorsList__items--wrapper li a figure {
            width: 110px;
            height: 110px;
            overflow: hidden;
            border-radius: 100%;
            margin: auto;
            border: 4px solid ${white};
          }
          .authorsList__items--wrapper li a figure img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
          .authorsList__items--wrapper li a h3 {
            font-size: 15px;
            font-weight: 700;
            padding: 10px 0;
            color: ${fadedGrey};
          }
          .authorsList__items--wrapper li a h3 span {
            font-weight: 400;
            color: ${grey};
            display: block;
            font-size: 13px;
            min-height:10px;
          }
          .authorsList__item--top{
            height:180px
          }

          .authorsList__items--wrapper li a h2,
          .authorsList__items--wrapper li a h4 {
            position: relative;
            padding-left: 18px;
            font-size: 15px;
            font-weight: 400;
            padding-top: 10px;
            text-align: left;
            height: 70px;
            overflow: hidden;
            margin-bottom: 15px;
            border-top: 1px solid ${lightGrey2};
            color: ${lightBlack};
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
        `}
      </style>
    </>
  );
};

export default AuthorsListMobile;
