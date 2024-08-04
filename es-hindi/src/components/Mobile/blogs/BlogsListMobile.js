import { setDefaultImage } from "includes/article.util";
import { BlogsCssGlobalVariables, BlogsUtil } from "includes/blogs.util";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { get_static_img } from "includes/helper";
import LazyLoadImage from "components/Common/CustomImage";

const BlogsListMobile = ({
  listItemsData,
  noContent,
  liveTime,
  pageAds,
}) => {
  const { lightRed, darkRed, fadedWhite, lightBlack, fadedBlack, grey } =
    BlogsCssGlobalVariables.colors;
  return (
    <>
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
              <div key={listNo} className="list__item">
                <a href={authorBlogsUrl}>
                  <figure className="list__item--figure">
                    <LazyLoadImage
                      src={get_static_img(authorInfo?.avtar, 90, 90)}
                      width={110}
                      height={110}
                      onError={setDefaultImage}
                      alt={display_headline}
                      title={display_headline}
                    />
                  </figure>
                  <h4 className="list__item--authorTextInfo">
                    {authorInfo?.hindi_name}
                    <span>{authorInfo?.designation}</span>
                  </h4>
                </a>
                <h2>
                  <a
                    href={blogDetailsUrl}
                    dangerouslySetInnerHTML={{
                      __html: display_headline,
                    }}
                    className="list__item--headline"
                  ></a>
                  <span className="list__item--date">
                    {blog?.created_at ? liveTime(blog?.created_at) : ''}
                  </span>
                </h2>
                <p>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: intro?.replace(/<[^>]*>/g, ""),
                    }}
                  ></span>
                  <a href={blogDetailsUrl} className="list__item--readMoreBtn">
                    और भी पढ़ें
                  </a>
                </p>
              </div>
              {(listNo === 5) && (
                <div className="clearfix add">
                  <div className="addinner-box addinner_box_300x250">
                    <SiteAd
                      width={300}
                      height={280}
                      slotId={`mobileAdNew300x250_${listNo}`}
                      adUnit={pageAds.ATF_300_id}
                      lazyload={true}
                      sizes={[
                        [300, 250],
                        [336, 280],

                      ]}
                      style={{ padding: "16px" }}
                    ></SiteAd>
                  </div>
                </div>
              )}
              {(listNo === 10) && (
                <div className="clearfix add">
                  <div className="addinner-box addinner_box_300x250">
                    <SiteAd
                      width={300}
                      height={250}
                      slotId={`mobileAdNew300x250_${listNo}`}
                      adUnit={pageAds.BTF_300_id}
                      lazyload={true}
                      sizes={[
                        [300, 250],
                        [336, 280],
                      ]}
                    ></SiteAd>
                  </div>
                </div>
              )}
              {(listNo === 15) && (
                <div className="clearfix add">
                  <div className="addinner-box addinner_box_300x250">
                    <SiteAd
                      width={300}
                      height={250}
                      slotId={`mobileAdNew300x250_${listNo}`}
                      adUnit={pageAds.FBN_320}
                      loadonScroll={true}
                      sizes={[
                        [300, 50],
                      ]}
                    ></SiteAd>
                  </div>
                </div>
              )}
            </>
          );
        })
      ) : (
        <p> No stories found matching this criteria </p>
      )}
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
          .list__item {
            font-family: "Noto Serif", "Droid Serif", sans-serif;
            margin-top: 25px;
            border-bottom: 1px solid #ebebeb;
            padding-bottom: 15px;
          }

          .list__item--figure {
            width: 110px;
            height: 110px;
            overflow: hidden;
            border-radius: 100%;
            margin: auto auto 15px auto;
          }

          .list__item--figure img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .list__item--authorTextInfo {
            font-size: 18px;
            line-height: 22px;
            color: #333;
            text-align: center;
            border-bottom: 1px solid #dedede;
            padding-bottom: 10px;
            margin-bottom: 12px;
            font-weight: 700;
          }

          .list__item--authorTextInfo span {
            font-weight: 400;
            color: ${grey};
            display: block;
            font-size: 14px;
          }

          .list__item--headline {
            color: ${lightBlack};
            font-size: 20px;
            line-height: 28px;
            margin-bottom: 5px 0;
            font-weight: 700;
            display: block;
          }

          .list__item--date {
            color: ${grey};
            font-size: 13px;
            display: block;
          }
          .list__item p {
            color: ${fadedBlack};
            line-height: 24px;
            margin: 10px 0 0 0;
            font-size: 14px;
            text-align: justify;
          }

          .list__item--readMoreBtn {
            position: relative;
            display: inline-block;
            padding-right: 15px;
            color: ${darkRed};
            font-size: 14px;
            margin-left: 10px;
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
        `}
      </style>
    </>
  );
};

export default BlogsListMobile;
