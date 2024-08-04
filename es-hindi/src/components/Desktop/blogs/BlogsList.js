import { setDefaultImage } from "includes/article.util";
import { BlogsCssGlobalVariables, BlogsUtil } from "includes/blogs.util";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { get_static_img } from "includes/helper";
import LazyLoadImage from "components/Common/CustomImage";

const BlogsList = ({
  listItemsData,
  noContent,
  liveTime,
  pageAds,
}) => {
  const { lightRed, darkRed, fadedWhite, lightBlack, fadedBlack, grey } =
    BlogsCssGlobalVariables.colors;
  return (
    <>
      <ul className="list__items">
        {listItemsData?.length > 0 && noContent ? (
          listItemsData.map((blog, index) => {
            const listNo = index + 1;
            const display_headline = blog?.display_headline || "";
            const intro = blog?.intro || "";
            const authorInfo = blog?.author_byline && blog?.author_byline[0];
            const authorBlogsUrl = BlogsUtil.formAuthorBlogsUrl(
              authorInfo?.nicename,
              authorInfo?.id
            );
            const blogDetailsUrl = BlogsUtil.formTopicUrlParam(blog?.weburl_r);
            return (
              <>
                <li key={"Blog" + listNo} className="list__item">
                  <div className="list__item--left">
                    <a href={authorBlogsUrl}>
                      <figure className="list__item--figure">
                        <LazyLoadImage
                          src={get_static_img(authorInfo?.avtar, 90, 90)}
                          width={90}
                          height={90}
                          onError={setDefaultImage}
                          alt={display_headline}
                          title={display_headline}
                        />
                      </figure>
                      <h3 className="list__item--authorTextInfo">
                        {authorInfo?.hindi_name}
                        <span>{authorInfo?.designation}</span>
                      </h3>
                    </a>
                  </div>
                  <div className="list__item--right">
                    <h2>
                      <a
                        href={blogDetailsUrl}
                        dangerouslySetInnerHTML={{
                          __html: display_headline,
                        }}
                      ></a>
                    </h2>
                    <span className="list__item--date">
                      {blog?.created_at ? liveTime(blog?.created_at) : ''}
                    </span>
                    <p>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: intro?.replace(/<[^>]*>/g, ""),
                        }}
                      ></span>
                      <a
                        href={blogDetailsUrl}
                        className="list__item--readMoreBtn"
                      >
                        और भी पढ़ें
                      </a>
                    </p>
                  </div>
                </li>
                {(listNo === 5 || listNo === 10 || listNo === 15) && (
                  <div className="middlead">
                    <SiteAd
                      width={728}
                      height={90}
                      slotId={`Desktop_Static_Ad_${listNo}`}
                      adUnit={pageAds?.BTF_728}
                      sizes={[[728, 90]]}
                      removeAdSpan={true}
                      loadonScroll={true}
                    ></SiteAd>
                  </div>
                )}
              </>
            );
          })
        ) : (
          <p> No stories found matching this criteria </p>
        )}
      </ul>
      <style jsx>
        {`
          .list__item {
            display: flex;
            border-bottom: 1px solid ${fadedWhite};
            padding-bottom: 25px;
            margin: 25px 0;
            font-family: "Noto Serif", "Droid Serif", sans-serif;
          }

          .list__item--left {
            padding-right: 20px;
            text-align: center;
            margin-right: 20px;
            border-right: 1px solid ${fadedWhite};
            flex-shrink: 0;
            width: 140px;
          }

          .list__item--figure {
            width: 90px;
            height: 90px;
            overflow: hidden;
            border-radius: 100%;
            margin: 10px auto;
          }

          .list__item--figure img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .list__item--authorTextInfo {
            font-size: 15px;
            line-height: 20px;
            color: ${fadedBlack};
          }

          .list__item--authorTextInfo span {
            font-weight: 400;
            color: ${grey};
            display: block;
            font-size: 13px;
          }

          .list__item--right h2 {
            color: ${lightBlack};
            font-size: 20px;
            line-height: 24px;
            margin-bottom: 6px;
            font-weight: 700;
          }

          .list__item--right,
          a:hover {
            color: ${lightBlack};
          }

          .list__item--date {
            color: ${grey};
            font-size: 13px;
            display: block;
            font-family: inherit;
            font-weight: 400;
          }
          .list__item--right p {
            color: ${fadedBlack};
            line-height: 26px;
            margin: 6px 0 0 0;
            font-size: 16px;
            text-align: justify;
            overflow: hidden;
            font-weight: 400;
          }

          .list__item--readMoreBtn {
            position: relative;
            display: inline-block;
            padding-right: 15px;
            color: ${lightRed};
            font-size: 14px;
            margin-left: 10px;
            font-weight: 500;
          }

          .list__item--readMoreBtn:hover {
            color: ${lightRed};
          }

          .list__item--readMoreBtn:after,
          .list__item--readMoreBtn:before {
            content: "";
            position: absolute;
          }

          .list__item--readMoreBtn::before {
            width: 8px;
            height: 2px;
            background: ${darkRed};
            right: 0;
            top: 10px;
          }

          .list__item--readMoreBtn::after {
            content: "";
            width: 4px;
            height: 4px;
            border-right: 2px solid ${darkRed};
            border-bottom: 2px solid ${darkRed};
            transform: rotate(-45deg);
            top: 8px;
            right: 0;
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

export default BlogsList;
