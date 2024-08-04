import React from "react";
import dynamic from "next/dynamic";
import { imageLoader } from "includes/article.util";
import LazyLoadImage from "components/Common/CustomImage";
import useLoadMore from "hooks/useLoadMore";
// const SiteAd = dynamic(() => import("widgets/Common/Responsive/SiteAd"));
const NewSiteAd = dynamic(() => import("./NewSiteAd"));
const TopPriorityCommon = (props) => {
  const topPriorityDataIds = [
    ...props.initialData.leftCat,
    ...props.initialData.rightCat,
  ]?.map((item) => item.story_id);
  const isMobile = props.isMobile || false;
  const { pageAds } = props;
  let query_arr = { "categories.slug": props?.pcategory };
  const { loadMore, categoryData, hasMoreData } = useLoadMore(
    props.initialData.rightCat,
    24,
    100,
    query_arr,
    1,
    "",
    topPriorityDataIds
  );
  if (
    [
      ...(props.initialData?.leftCat || []),
      ...(props.initialData?.rightCat || []),
    ].length === 0
  ) {
    return null;
  }
  return (
    <>
      <div className="topnews">
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
                liveblog_switcher,
                // ff_source,
                // local18_video,
              } = topNews.article_details || topNews || {};
              return (
                <li key={`pl${key}`} className="lp_local18_stories_card">
                  <a href={weburl_r} className="lp_local18_stories_card">
                    <figure
                      className={
                        post_type == "photogallery"
                          ? "forphotoicon"
                          : post_type === "videos"
                          ? "forvideoicon"
                          : ""
                      }
                    >
                      <LazyLoadImage
                        src={
                          key === 0
                            ? imageLoader(images?.url, 521, 347)
                            : imageLoader(images?.url, 104, 70)
                        }
                        alt={display_headline || headline || ""}
                        title={display_headline || headline || ""}
                        width={key === 0 ? 521 : 104}
                        height={key === 0 ? 347 : 70}
                      />
                      {/* {ff_source === "Hyperlocal" && local18_video !== "" ? (
                        <span className="newvdsicon"></span>
                      ) : (
                        ""
                      )}
                      {post_type === "photogallery" ? (
                        <span className="newphticoncount">
                          <LazyLoadImage
                            src={
                              "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Group_993_1688556819.png"
                            }
                            alt={"Photo"}
                            title={"Photo"}
                            width={60}
                            height={20}
                          />
                          +{gallery.length || "1"}
                        </span>
                      ) : (
                        ""
                      )} */}
                    </figure>
                    <div>
                      <span className="categry">
                        {/* {categories.length > 0
                          ? categories[categories.length - 1].name
                          : "News"} */}
                        {categories.length > 0
                          ? categories[0].name.replace("&amp;", "&")
                          : "News"}
                      </span>
                      <h2>
                        {liveblog_switcher === 1 && (
                          <span
                            className={`livenow_btn ${
                              key === 0 ? "liveadj" : ""
                            }`}
                          >
                            Live
                          </span>
                        )}
                        {display_headline || headline}
                      </h2>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {isMobile && (
          <div className="newadd clearfix">
            <span id="first">Advertisement</span>
            {/* <SiteAd
              slotId={`mobile_atf_320`}
              adUnit={pageAds.header_ATF_320}
              sizes={[
                [320, 250],
                [300, 250],
                [336, 280],
              ]}
              width={300}
              height={250}
            /> */}
            <NewSiteAd
              slotId={`mobile_atf_320`}
              adUnit={pageAds.header_ATF_320}
              sizes={[
                [320, 250],
                [300, 250],
                [336, 280],
              ]}
              width={300}
              height={250}
            />
          </div>
        )}
        <div className=" topnews-right">
          <ul className=" top-kharein">
            {categoryData?.map((topNewsRight, key) => {
              const {
                categories,
                images,
                display_headline,
                headline,
                weburl_r,
                // intro,
                post_type,
                liveblog_switcher,
                // ff_source,
                // local18_video,
              } = topNewsRight.article_details || topNewsRight || {};
              return !isMobile ? (
                <li key={"list" + key} className="rltdnw lp_local18_news_stories">
                  <a href={weburl_r} className="lp_local18_news_stories">
                    <figure
                      className={
                        post_type === "photogallery"
                          ? "forphotoicon"
                          : post_type === "videos"
                          ? "forvideoicon"
                          : ""
                      }
                    >
                      <LazyLoadImage
                        src={imageLoader(images?.url, 104, 70)}
                        alt={display_headline || headline || ""}
                        title={display_headline || headline || ""}
                        width={104}
                        height={70}
                      />
                    </figure>

                    <div>
                      <span className="categry">
                        {categories.length > 0
                          ? categories[categories.length - 1].name
                          : "News"}
                      </span>

                      <h3>
                        {liveblog_switcher === 1 && (
                          <span className={`livenow_btn`}>Live</span>
                        )}
                        {display_headline || headline}
                      </h3>
                    </div>
                  </a>
                </li>
              ) : (
                <li className=" rltdnw lp_local18_news_stories">
                  <a href={weburl_r} className="lp_local18_news_stories">
                    <div>
                      <span className="categry">
                        {categories.length > 0
                          ? categories[categories.length - 1].name
                          : "News"}
                      </span>
                      <h3>
                        {liveblog_switcher === 1 && (
                          <span className={`livenow_btn`}>Live</span>
                        )}
                        {display_headline || headline}
                      </h3>
                    </div>
                    <figure
                      className={
                        post_type == "photogallery"
                          ? "forphotoicon"
                          : post_type === "videos"
                          ? "forvideoicon"
                          : ""
                      }
                    >
                      <LazyLoadImage
                        src={imageLoader(images?.url, 104, 70)}
                        alt={display_headline || headline || ""}
                        title={display_headline || headline || ""}
                        width={104}
                        height={70}
                      />
                    </figure>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {isMobile ? (
          <div className="moretrndstroy-secion">
            <div>
              <a onClick={loadMore}>
                <span className="moretrndstroy">और भी पढ़ें</span>
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <style jsx global>{`
        .livenow_btn {
          background: #ed1c24;
          color: #fff;
          border-radius: 2px;
          font-size: 11px;
          text-transform: uppercase;
          padding: 3px 7px 2px 23px;
          font-weight: bold;
          margin-right: 5px;
          position: relative;
        }
        .livenow_btn:after,
        .livenow_btn:before {
          content: "";
          position: absolute;
          opacity: 0;
          box-sizing: border-box;
          top: 5px;
          left: 6px;
          width: 12px;
          height: 12px;
          border: 2px solid #fff;
          box-shadow:
            0 0 10px #fff,
            inset 0 0 10px #fff;
          border-radius: 100px;
          background-clip: padding-box;
        }
        .livenow_btn:before {
          z-index: 2;
          -webkit-animation: blinker 2s infinite;
          animation: blinker 2s infinite;
        }
        .liveadj {
          bottom: 4px;
        }
        .livenow_btn:after {
          z-index: 1;
          -webkit-animation: blinker 2s infinite 1s;
          animation: blinker 2s infinite 1s;
        }
        @keyframes blinker {
          0% {
            -webkit-transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          to {
            -webkit-transform: scale(1);
            opacity: 0;
          }
        }
        .forvideoicon:before {
          position: absolute;
          top: ${isMobile ? "50%" : "50%"};
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
          z-index: 1;
        }
        .forphotoicon:before {
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
          bottom: ${isMobile ? "5px" : "10px"};
          right: 0;
          width: 30px;
          z-index: 1;
        }
        .load_more {
          width: 130px;
          height: 38px;
          background: #ed1c24;
          border-radius: 19px;
          font-size: 17px;
          color: #ffffff;
          line-height: 38px;
          border: none;
          display: table;
          margin: auto;
          cursor: pointer;
        }
        .section-blog {
          display: flex;
          justify-content: space-between;
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
          border-bottom: 0;
          border-radius: 4px;
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
          width: 104px;
          margin-right: 15px;
          flex-shrink: 0;
          height: 70px;
          font-size: 0;
          background-color: #dbdbdb;
          position: relative;
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
          top: 72%;
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

        .newadd {
          min-width: 300px;
          text-align: center;
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
            top: 64%;
            line-height: 22px;
            height: 22px;
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
          border-bottom: 1px solid #e0e0e0;
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
          width: 104px;
          position: relative;
        }
        .top-kharein li a figure img {
          width: 104px;
          height: 70px;
          flex-shrink: 0;
          margin-right: 15px;
        }
        .top-kharein li h3 {
          font-size: 16px;
          font-weight: 700;
          line-height: 25px;
        }
        @media (max-width: 768px) {
          .topnews-right {
            width: 100%;
          }
          .top-kharein li a figure {
            margin: 0;
            height: 70px;
          }
          .top-kharein li a figure img {
            margin-right: 0;
            height: 100%;
          }
          .top-kharein li h3 {
            padding-right: 10px;
          }
          .top-kharein li a > div {
            width: calc(100% - 90px);
            margin-left: 10px;
          }
        }
      `}</style>
    </>
  );
};
export default TopPriorityCommon;
