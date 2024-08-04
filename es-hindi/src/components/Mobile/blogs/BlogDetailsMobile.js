import {
  setDefaultImage,
} from "includes/article.util";
import { BlogsUtil } from "includes/blogs.util";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import InstallAppIcon from "widgets/Mobile/InstallAppIcon";
import { get_static_img } from "includes/helper";
import LazyLoadImage from "components/Common/CustomImage";
import { logEvent } from "includes/googleAnalytic";
import { additionalText } from "includes/_app.util";

const BlogDetailsMobile = (props) => {
  const {
    pageContent,
    authorInfo,
    liveTime,
    shareTopicUrls,
    pageAds,
    articleData,
    taboolaList,
  } = props;

  const authorBlogsUrl = BlogsUtil.formAuthorBlogsUrl(
    authorInfo?.nicename,
    authorInfo?.id
  );

  return (
    <>
        <div className="container">
          <div className="headline__container">
            <h1>{articleData?.display_headline}</h1>
            <div className="blogAuthorDetails__top">
              <h3 className="blogAuthorDetails__intro">{articleData?.intro}</h3>
              <div className="blogAuthorDetails__top--wrapper">
                <figure>
                  <a href={authorBlogsUrl}>
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
                  </a>
                </figure>
                <div className="blogAuthorDetails__top--right">
                  <h3>
                  <a href={authorBlogsUrl}>
                    <span>{authorInfo?.hindi_name}</span>
                    {authorInfo?.designation}
                  </a>
                  </h3>
                  <div className="blogAuthorDetails__source">
                    <span>
                      Source: <strong> News18Hindi </strong>
                    </span>
                  </div>
                  <div className="blogAuthorDetails__topRight--topshare">
                    <span>शेयर करें: </span>
                    <a
                      className="arr_redirect"
                      href="javascript:void(0)"
                      onClick={async () => {   
                        const shareData = {
                          title: "",
                          text: `${articleData?.display_headline}\n${articleData?.weburl}\n\n ${additionalText}`,  
                        };                           
                        try {
                          await navigator.share(shareData);
                        } catch (err) {
                          //resultPara.textContent = `Error: ${err}`;
                        }
                        logEvent("ss_wapi","tap","blog_page");
                      }}
                    >
                      <svg
                        id=""
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="25"
                        viewBox="0 0 32 32"
                      >
                        <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
                      </svg>
                    </a>                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <figure className="articleimg">
            <LazyLoadImage
              src={articleData?.images?.url}
              width={450}
              height={237}
              alt={pageContent?.display_headline}
              title={pageContent?.display_headline}
            />
            <h5>{articleData?.images?.caption}</h5>
          </figure>
          <div className="blog__headline">
            <ul className="blog__headline--text">
              <li>
                <p>
                  <a href="/agency/News18Hindi">News18Hindi</a>
                </p>
              </li>
              <li>
                <b>Last updated:</b>
                {liveTime(pageContent?.updated_at)}
              </li>
            </ul>
          </div>
            <div className="clearfix add">
              <div className="addinner-box addinner_box_300x250">
                <SiteAd
                  width={300}
                  height={280}
                  slotId={`mobileAdNew300x250_1`}
                  adUnit={pageAds.ATF_300_id}
                  lazyload={true}
                  sizes={[
                    [300, 250],
                    [336, 280]
                  ]}
                  style={{ padding: "16px" }}
                ></SiteAd>
              </div>
            </div>
          <div
            className="blog__description"
            dangerouslySetInnerHTML={{
              __html: articleData?.body,
            }}
          ></div>
          <strong
            className="blog__description"
            style={{ display: "inline-block" }}
          >
            (डिस्क्लेमर: ये लेखक के निजी विचार हैं. लेख में दी गई किसी भी
            जानकारी की सत्यता/सटीकता के प्रति लेखक स्वयं जवाबदेह है. इसके लिए
            News18Hindi उत्तरदायी नहीं है.)
          </strong>
          <article className="blogAuthorDetails__bottom--wrapper">
            <div className="blogAuthorDetails__bottom">
              <span className="blogAuthorDetails__bottom--topbtn">
                ब्लॉगर के बारे में
              </span>
              <div className="blogAuthorDetails__bottom--headline">
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
                    {authorInfo?.hindi_name}
                    <span>{authorInfo?.designation}</span>
                  </h3>
                </a>
              </div>
              <p>{authorInfo?.author_bio}</p>
              <p>
                <a href={authorBlogsUrl} className="readMoreBtn">
                  और भी पढ़ें
                </a>
              </p>
            </div>
          </article>
          <div className="blogAuthorDetails__share">
            <span>SHARE THIS:</span>
            <a href={shareTopicUrls.facebook} target="_blank">
              <span className="icon-facebook"></span>
            </a>
            <a href={shareTopicUrls.twitter} target="_blank">
              <span className="icon-twitter"></span>
            </a>
            <a href={shareTopicUrls.linkedIn} target="_blank">
              <span className="icon-linkedIn"></span>
            </a>
            <a href={shareTopicUrls?.whatsapp} target="_blank">
              <span className="icon-whatsapp"></span>
            </a>
          </div>
          <div className="tag">
            {articleData &&
              articleData?.tags &&
              articleData?.tags.map((tag, index) => (
                <a key={index} href={`/tag/${tag.slug}/`}>
                  {tag?.name}
                </a>
              ))}
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
      {/* <InstallAppIcon category={'APPdownload_Mweb_Blog'} label={'Mobile Blog'} /> */}
      <style jsx global>{`
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
        .headline__container {
          padding: 0 10px;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }
        .container {
          padding: 0 10px;
        }
        .headline__container h1 {
          font-size: 24px;
          line-height: 36px;
          color: #303030;
          font-weight: 700;
          margin: 8px 0;
        }

        .blogAuthorDetails__top {
          border-top: 1px solid #d4d4d4;
          border-bottom: 1px solid #d4d4d4;
          padding: 12px 0;
          margin-bottom: 15px;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }

        .blogAuthorDetails__intro {
          font-size: 15px !important;
          line-height: 24px;
          font-weight: 700;
          color: #666;
          margin-bottom: 20px;
        }
        .blogAuthorDetails__top--wrapper {
          display: flex;
        }
        .blogAuthorDetails__top--wrapper figure {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 100%;
          flex-shrink: 0;
          margin-right: 15px;
        }
        .blogAuthorDetails__top--wrapper figure a img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        a {
          text-decoration: none;
          color: #111;
        }

        .blogAuthorDetails__top--right {
          width: 100%;
        }

        .blogAuthorDetails__top--right h3 {
          color: #bebdbd;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
        }

        .blogAuthorDetails__top--right h3 span {
          color: #c0221f;
          font-size: 18px;
          font-weight: 700;
          display: block;
        }

        .blogAuthorDetails__source {
          font-size: 14px !important;
          color: #888;
        }
        .blogAuthorDetails__source span {
          display: block;
          margin: 10px 0;
        }
        .blogAuthorDetails__source span b {
          font-weight: 700;
        }
        .blogAuthorDetails__topRight--topshare {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #bebdbd;
        }

        .blogAuthorDetails__topRight--topshare a {
          margin-left: 18px;
        }

        .articleimg {
          background: #444;
          min-height: 240px;
          padding-bottom: 0;
          line-height: 0;
          position: relative;
          margin: 15px 0;
        }
        .articleimg img {
          width: 100%;
        }

        .articleimg h5 {
          font-size: 0.83em;
          line-height: 20px;
          color: #eee;
          padding: 10px;
          position: absolute;
          bottom: 0px;
          left: 0;
          width: 100%;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.6);
          font-weight: normal;
        }

        .blog__headline--text {
          border-top: 1px solid #cdcdcd;
          padding: 10px 0;
          margin: 0 16px 16px 16px;
          border-bottom: 1px solid #cdcdcd;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }
        .blog__headline--text li {
          font-size: 14px;
          padding: 5px 0 6px 14px;
          position: relative;
          color: #949494;
          text-transform: uppercase;
        }
        .blog__headline--text li a {
          color: #949494;
        }
        .blog__headline--text li::before {
          content: "";
          background: #858585;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          position: absolute;
          top: 8px;
          left: 0;
        }

        .blog__description {
          line-height: 28px;
          font-size: 18px;
          word-break: break-word;
          color: #212121;
          padding: 10px 16px;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
          overflow: hidden;
          margin: 10px 0;
        }

        .blog__description p {
          line-height: 32px;
          margin-bottom: 20px;
        }

        .blog__description p img {
          width: 100%;
          height: auto;
        }

        .blog__description .articleimg {
          width: 100%;
          position: relative;
          margin: 10px auto;
          overflow: hidden;
        }

        .blog__description .articleimg img {
          border: none;
          box-shadow: none;
          height: 100%;
          margin: unset;
          padding: unset;
          width: 100%;
        }

        .blogAuthorDetails__bottom--wrapper {
          line-height: 28px;
          font-size: 18px;
          word-break: break-word;
          color: #212121;
          padding: 10px 16px;
        }
        .blogAuthorDetails__bottom {
          background: transparent;
          border-radius: 10px;
          padding: 50px 20px 0 20px;
          margin: 0px 0;
          position: relative;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }
        .blogAuthorDetails__bottom--topbtn {
          position: absolute;
          top: 0;
          height: 44px;
          line-height: 44px;
          padding: 0;
          border-radius: 4px;
          font-size: 20px;
          color: #000;
          background: #fff;
          font-weight: bold;
        }
        .blogAuthorDetails__bottom--headline a {
          display: flex;
          align-items: center;
        }
        .blogAuthorDetails__bottom--headline a figure {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 100%;
          margin-right: 15px;
          flex-shrink: 0;
        }
        .blogAuthorDetails__bottom--headline a figure img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        .blogAuthorDetails__bottom--headline a h3 {
          font-size: 20px;
          color: #e33128;
          font-weight: 700;
          line-height: 26px;
        }

        .blogAuthorDetails__bottom--headline a h3 span {
          font-size: 14px;
          font-weight: 400;
          color: #777;
          display: block;
        }

        .blogAuthorDetails__bottom p {
          margin: 15px 0 20px 0;
          font-size: 14px;
          line-height: 26px;
          color: #333;
        }

        .readMoreBtn {
          color: #e33128;
          text-align: end;
          width: 100%;
          display: inline-block;
          font-size: 15px !important;
        }

        .blogAuthorDetails__share {
          margin-bottom: 20px;
          padding: 0 10px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }

        .blogAuthorDetails__share span {
          font-size: 14px;
          color: #555;
        }

        .blogAuthorDetails__share a {
          width: 35px;
          height: 35px;
          font-size: 18px;
          margin-right: 0;
          border-radius: 0;
          margin-left: 14px;
        }

        .blogAuthorDetails__share a span {
          background: #f5f5f5
            url(https://images.news18.com/ibnkhabar/uploads/2020/01/article-icons.png)
            0 0 no-repeat;
          width: 35px;
          height: 35px;
          display: block;
          border-radius: 100%;
        }

        .icon-facebook {
          background-position: 0 0;
        }
        .icon-twitter {
          background-position: -36px 0 !important;
        }
        .icon-linkedIn {
          background-position: -72px 0 !important;
        }
        .icon-whatsapp {
          background-position: -108px 0 !important;
        }

        .tag a {
          height: 28px;
          line-height: 28px;
          font-size: 14px;
          padding: 0 16px;
          border-radius: 5px;
          background: #fff;
          color: #828282;
          border: 1px solid #828282;
          margin: 0 14px 14px 0;
          display: inline-block;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }

        .bynow-text {
          font-size: 15px;
          color: #626262;
          padding-bottom: 15px;
          margin-bottom: 10px;
          border-bottom: 1px solid #ccc;
          line-height: 22px;
          font-family: "Noto Serif", "Droid Serif", sans-serif;
        }
        .arr_redirect {
          background: #ffffff;
          border: 1px solid #c7c7c7;
          border-radius: 24px;
          color: #343a40;
          display: flex;
          float: left;
          line-height: 16px;
          margin: 0;
          position: relative;
          padding: 0;
          text-transform: capitalize;
          text-align: center;
          align-items: center;
          height: 35px;
          min-width: 35px;
          justify-content: center;
          flex-direction: row;
        }
      `}</style>
    </>
  );
};

export default BlogDetailsMobile;
