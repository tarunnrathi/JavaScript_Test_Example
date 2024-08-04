import React from "react";
// import dynamic from "next/dynamic";
import { imageLoader } from "includes/article.util";
import LazyLoadImage from "components/Common/CustomImage";
import getConfig from "next/config";
import ampHelper from "includes/Amp/ampHelper";

const { publicRuntimeConfig } = getConfig();

const TopPriorityAmp = (props) => {
  const isMobile = props.isMobile || false;
  //   const { pageAds } = props;

  const getURL = (url, isAmp = false) => {
    return url
      ? url.replace(
          "https://esstg-hindi.news18.com/",
          publicRuntimeConfig.siteUrl + `${isAmp ? "amp/" : ""}`,
        )
      : "";
  };
  //   const { isMobile } = props;

  const ampAds = ampHelper.get_amp_ad_article(
    props?.data?._pageParam?.subCategory,
    props?.data?._pageParam?.category,
    "listing",
  );

  return (
    <>
      <div className="topnews dflex justify-space-betwwen">
        <div className=" topnews-left ">
          <ul className=" topnews-left-list">
            {props.initialData.leftCat.map((topNews, key) => {
              const {
                categories,
                images,
                display_headline,
                headline,
                weburl_r,
                // intro,
                // gallery,
                post_type,
                ff_source,
                local18_video,
              } = topNews.article_details || topNews || {};

              return (
                <li
                  key={`pl${key}`}
                  className={
                    post_type === "videos"
                      ? "rltdnw ifvideo"
                      : post_type === "photogallery"
                      ? "rltdnw ifphoto"
                      : "rltdnw"
                  }
                >
                  <a href={getURL(weburl_r, true)}>
                    <figure>
                      <LazyLoadImage
                        src={
                          key === 0
                            ? imageLoader(images?.url, 380, 253)
                            : imageLoader(images?.url, 80, 53)
                        }
                        alt={display_headline || headline || ""}
                        title={display_headline || headline || ""}
                        width={key === 0 ? 380 : 80}
                        height={key === 0 ? 253 : 53}
                        isAMP={true}
                      />
                    </figure>
                    <div>
                      <span className="categry">
                        {/* {categories.length > 0
                          ? categories[categories.length - 1].name
                          : "News"} */}
                        {categories.length > 0
                        ? categories[0].name.replace('&amp;', '&')
                        : "News"}
                      </span>
                      <h2>{display_headline || headline}</h2>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div class="clearfix add">
          <div class="addinner-box">
            <div class="ad-container go">
              <amp-ad
                width={336}
                height={280}
                type="doubleclick"
                data-slot={ampAds.topAd}
                data-multi-size="300x250"
                data-enable-refresh="30"
                data-lazy-fetch="true"
                data-loading-strategy="1"
              ></amp-ad>
            </div>
          </div>
        </div>

        <div className=" topnews-right">
          <ul className=" top-kharein">
            {props.initialData.rightCat.map((topNewsRight, key) => {
              const {
                categories,
                images,
                display_headline,
                headline,
                weburl_r,
                // intro,
                post_type,
                ff_source,
                local18_video,
              } = topNewsRight.article_details || topNewsRight || {};
              return !isMobile ? (
                ""
              ) : (
                <li
                  key={"list" + key}
                  className={
                    post_type === "videos"
                      ? "rltdnw ifvideo"
                      : post_type === "photogallery"
                      ? "rltdnw ifphoto"
                      : "rltdnw"
                  }
                >
                  <a href={weburl_r}>
                    <div>
                      <span className="categry">
                        {categories.length > 0
                          ? categories[categories.length - 1].name
                          : "News"}
                      </span>
                      <h3>{display_headline || headline}</h3>
                    </div>
                    <figure>
                      <LazyLoadImage
                        src={imageLoader(images?.url, 80, 53)}
                        alt={display_headline || headline || ""}
                        title={display_headline || headline || ""}
                        width={80}
                        height={53}
                        isAMP={true}
                      />
                    </figure>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <style jsx global>{`
      .topnews .ifvideo figure:before {
        position: absolute;
        top: 50%;
        left: 50%;
        background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Video_1688556982.png)
          0 0 no-repeat;
        background-size: 38px;
        width: 50px;
        height: 50px;
        margin: -16px 0 0 -16px;
        content: "";
        background-size: 32px;
        transform: scale(0.8);
        z-index: 99;
      }
      .topnews .ifphoto figure:before {
        content: "";
        position: absolute;
        background: #ed2129
          url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Group_993_1688556819.png)
          0 0 no-repeat;
        background-size: 32px;
        height: 26px;
        border: 1px solid #fff;
        border-right: none;
        border-radius: 3px 0 0 3px;
        bottom: 5px;
        right: 0;
        width: 30px;
        z-index: 1;
      }

        .topnews {
          margin-bottom: 10px;
          justify-content: space-between;
          display: flex;
        }
        .topnews-left {
          width: 56%;
          background: #fff;
        }
        .topnews-left-list li:first-child {
          background: #f3f3f3;
          margin: 0 0 8px;
          padding: 0;
        }
        .topnews-left-list li:first-child figure{
          z-index:0;
        }
        .topnews-left-list li {
          padding: 10px 0 12px;
          margin: 0 12px;
          border-bottom: 1px solid #ccc;
        }
        .topnews-left-list li a {
          display: flex;
          font-weight: 700;
          color: #000;
          position: relative;
        }
        .topnews-left-list li:first-child a {
          flex-wrap: wrap;
        }
        .topnews-left-list li figure {
          width: 90px;
          margin-right: 15px;
          flex-shrink: 0;
          height: 60px;
          overflow: hidden;
          font-size: 0;
          background-color: #dbdbdb;
        }
        .topnews-left-list li:first-child figure {
          width: 100%;
          margin: 0;
          min-height: 320px;
        }
        figure img {
          width: 100%;
          border: none;
          border-radius: 4px;
        }
        .topnews-left-list li:first-child a h2 {
          font-size: 22px;
          font-weight: 700;
          line-height: 28px;
          position: relative;
          background: #f3f3f3;
          padding: 25px 15px;
          width: 100%;
        }
        .topnews-left-list li a h2,
        .topnews-left-list li a h3 {
          font-size: 15px;
          font-weight: 700;
          line-height: 21px;
          margin: auto;
          width: 100%;
          min-height: 42px;
        }
        .topnews-left-list li:first-child .categry {
          position: absolute;
          bottom: 22%;
          left: 14px;
          z-index: 1;
          background: no-repeat padding-box #ec2027;
          border-radius: 4px;
          color: #fff;
          padding: 0 10px;
          font-size: 14px;
          line-height: 26px;
        }
        .categry {
          font-size: 13px;
          color: #ec2027;
          line-height: 26px;
          font-weight: 700;
        }
        @media (max-width: 768px) {
          .topnews {
            display: block;
          }
          .topnews-left {
            width: 100%;
          }
          .topnews-left-list li {
            display: none;
          }
          .topnews-left-list li:first-child {
            display: block;
          }
          .topnews-left-list li:first-child figure {
            min-height: 227px;
          }
          figure img {
            height: 100%;
          }
          .topnews-left-list li:first-child a h2 {
            padding: 21px 10px 10px;
            font-size: 20px;
            line-height: 26px;
            height: 100px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: 10px;
          }
          .categry {
            line-height: 22px;
          }
          .topnews-left-list li:first-child .categry {
            bottom: 29%;
            line-height: 22px;
          }
        }
        .topnews-right {
          width: 42.5%;
        }
        .topnews .globalhd {
          margin-top: 0;
        }
        .top-kharein li {
          padding: 10.4px 0;
          font-size: 17px;
          line-height: 1.45;
          border-bottom: 1px solid #ccc;
        }
        .top-kharein li:first-child {
          padding-top: 0;
        }
        .top-kharein li a {
          color: #000;
          display: flex;
        }
        .top-kharein li a figure {
          flex-shrink: 0;
          margin-right: 15px;
          width: 90px;
        }
        .top-kharein li a figure img {
          width: 90px;
          height: 60px;
          flex-shrink: 0;
          margin-right: 15px;
        }
        .top-kharein li h3 {
          font-size: 15px;
          font-weight: 700;
          line-height: 21px;
        }
        @media (max-width: 768px) {
          .topnews-right {
            width: 100%;
          }
          .top-kharein li a figure {
            margin: 0;
            height: 60px;
          }
          .top-kharein li a figure img {
            margin-right: 0;
            height: 100%;
          }
          .top-kharein li h3 {
            padding-right: 5px;
          }
          .top-kharein li a > div {
            width: calc(100% - 90px);
          }
        }
      `}</style>
    </>
  );
};

export default TopPriorityAmp;
