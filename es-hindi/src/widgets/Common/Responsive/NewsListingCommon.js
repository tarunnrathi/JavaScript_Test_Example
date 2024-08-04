import React from "react";
// import "lazysizes";
// import { get_static_img } from "includes/helper";
// import siteConfig from "config/site.config";
// import Taboola from "widgets/Common/Responsive/Taboola";
// import { TaboolaList } from "includes/Tabola.helper";
import { imageLoader } from "includes/article.util";
// import Image from "next/image";
import LazyLoadImage from "components/Common/CustomImage";

const NewsListingCommon = (props) => {
  const NewsData = props.initialData;
  const { isMobile } = props;

  return (
    <>
      <div className="newbottomsectionswrap">
        <div className="newbottomsection">
          <ul className="newbottomsectionlistCT">
            {NewsData.map((item, index) => {
              return isMobile ? (
                <>
                  <li
                    key={"list" + index}
                    className={
                      item?.ff_source === "Hyperlocal" &&
                      item?.local18_video !== ""
                        ? "ifvideo"
                        : item?.post_type === "photogallery"
                        ? "ifphoto"
                        : ""
                    }
                  >
                    <a href={item.weburl_r || item.weburl || "No Link"}>
                      <div>
                        <span className="categry">
                          {item.categories.length > 0
                            ? item.categories[item.categories.length - 1].name
                            : "News"}
                        </span>
                        <h3>
                          {item.display_headline ||
                            item.headline ||
                            "News18 Hindi"}
                        </h3>
                      </div>
                      <figure>
                        <LazyLoadImage
                          src={imageLoader(item.images.url, 90, 60)}
                          width={90}
                          height={60}
                          alt={item.display_headline || ""}
                          title={item.display_headline || ""}
                        />
                      </figure>
                    </a>
                  </li>

                  {index === 12
                    ? ""
                    : // <Taboola
                      //   mode={TaboolaList.category.center.mode}
                      //   id={TaboolaList.category.center.id}
                      //   container={TaboolaList.category.center.container}
                      //   placement={TaboolaList.category.center.placement}
                      //   position={"center"}
                      //   isMobile={isMobile}
                      // />
                      ""}
                </>
              ) : (
                <li key={"list" + index}>
                  <a href={item.weburl_r || item.weburl || "No Link"}>
                    <figure>
                      <LazyLoadImage
                        width={281}
                        height={187}
                        src={imageLoader(item.images.url, 281, 187)}
                        alt={item.display_headline || ""}
                        title={item.display_headline || ""}
                      />
                      {item?.ff_source === "Hyperlocal" &&
                      item?.local18_video !== "" ? (
                        <span className="newvdsicon"></span>
                      ) : (
                        ""
                      )}
                      {item?.post_type === "photogallery" ? (
                        <span className="newphticoncount">
                          <img
                            src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Group_993_1688556819.png"
                            alt="Photo"
                          />
                          +{item?.gallery_count || "0"}
                        </span>
                      ) : (
                        ""
                      )}
                    </figure>
                    <h3>
                      {item.display_headline || item.headline || "News18 Hindi"}
                    </h3>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* News Listing start here */}
      {/* {NewsData.map((item, index) => {
        if (index == 12) {
          return (
            <React.Fragment key={index + "fragment"}>
              <div className="taboola_setting">
                <Taboola
                  mode={TaboolaList.category.center.mode}
                  id={TaboolaList.category.center.id}
                  container={TaboolaList.category.center.container}
                  placement={TaboolaList.category.center.placement}
                />
              </div>

              <div
                key={"k" + index}
                className={
                  "blog_list_row " +
                  (item.post_type == "videos"
                    ? "blog_video"
                    : item.post_type == "photogallery"
                    ? "blog_photo"
                    : item.ff_source == "Hyperlocal" && item.local18_video != ""
                    ? "blog_video"
                    : "")
                }
              >
                <a href={item.weburl || item.weburl_r || "No Link"}>
                  <figure>
                    <div className="blog_img">
                      <img
                        src={get_static_img(
                          siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH,
                          281,
                          187
                        )}
                        data-src={get_static_img(
                          item.images.url || "",
                          281,
                          187
                        )}
                        alt={
                          item.display_headline ||
                          item.headline ||
                          "News18 Hindi"
                        }
                        title={
                          item.display_headline ||
                          item.headline ||
                          "News18 Hindi"
                        }
                        className="lazyload"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=561&height=374";
                        }}
                      />
                    </div>
                    <figcaption>
                      <div className="blog_title">
                        {item.display_headline ||
                          item.headline ||
                          "News18 Hindi"}
                      </div>
                    </figcaption>
                  </figure>
                </a>
              </div>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={index + "fragment"}>
              <div
                key={"T" + index}
                className={
                  "blog_list_row " +
                  (item.post_type == "videos"
                    ? "blog_video"
                    : item.post_type == "photogallery"
                    ? "blog_photo"
                    : item.ff_source == "Hyperlocal" && item.local18_video != ""
                    ? "blog_video"
                    : "")
                }
              >
                <a href={item.weburl || item.weburl_r || "No Link"}>
                  <figure>
                    <div className="blog_img">
                      <img
                        src={get_static_img(
                          siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH,
                          281,
                          187
                        )}
                        data-src={get_static_img(
                          item.images.url || "",
                          281,
                          187
                        )}
                        alt={
                          item.display_headline ||
                          item.headline ||
                          "News18 Hindi"
                        }
                        title={
                          item.display_headline ||
                          item.headline ||
                          "News18 Hindi"
                        }
                        className="lazyload"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=561&height=374";
                        }}
                      />
                    </div>
                    <figcaption>
                      <div className="blog_title">
                        {item.display_headline ||
                          item.headline ||
                          "News18 Hindi"}
                      </div>
                    </figcaption>
                  </figure>
                </a>
              </div>
            </React.Fragment>
          );
        }
      })} */}

      {/* News Listing end here */}

      <style jsx global>{`
        .newbottomsectionswrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .newbottomsection {
          width: 100%;
          flex-shrink: 0;
          background: #fff;
          margin: 20px 0 25px;
        }
        .newbottomsectionlistCT {
          column-gap: 12px;
          row-gap: 20px;
          display: grid;
          grid-template-columns: 216px 216px 216px 216px;
        }
        .newbottomsectionlistCT li {
          padding: 10px 0;
          position: relative;
          border-bottom: 1px solid #e0e0e0;
        }
        .newbottomsectionlistCT li a figure {
          width: 216px;
          height: 144px;
          position: relative;
          font-size: 0;
          background-color: #dbdbdb;
        }
        .newbottomsectionlistCT li a figure img {
          width: 100%;
          height: 144px;
        }
        .newbottomsectionlistCT li a h3{
          padding: 5px 0 0;
          font-weight: bold;
          font-size: 16px;
          line-height: 23px;
          margin-bottom: 7px;
          color: #000000;
          height: 50px;
          overflow: hidden;
        }

        .newbottomsectionlistCT li a .counter {
          position: absolute;
          bottom: 7px;
          right: 0;
          width: 55px;
          height: 26px;
          background-color: #ed2129;
          border: 1px solid#fff;
          border-radius: 4px 0px 0px 4px;
          z-index: 11;
          border-right: 0;
        }
        .newbottomsectionlistCT li a .counter h3 {
          text-align: center;
          font-family: Mukta;
          letter-spacing: 0px;
          font-size: 14px;
          font-weight: bold;
          line-height: 11px;
          display: inline-block;
          vertical-align: top;
          background: none;
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000029;
          margin-left: -6px;
          padding: 7px 0;
        }
        .newbottomsectionlistCT li.pht a figure:after {
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          opacity: 0.4;
          border-radius: 4px;
          background-color: #000000;
        }
        .newbottomsectionlistCT li.vid a figure:before {
          content: "";
          background: url(images/Video.png);
          width: 40px;
          height: 40px;
          display: block;
          position: absolute;
          top: 37%;
          left: 0;
          background-size: 100%;
          z-index: 11;
          margin: 0 auto;
          right: 0;
        }
        .newbottomsectionlistCT li.vid a figure:after {
          background-color: #000000;
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          opacity: 0.4;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .newbottomsection {
            width: 100%;
            margin-top: 0px;
          }
          .newbottomsectionlistCT {
            margin-bottom: 20px;
            display: block;
          }
          .newbottomsectionlistCT li {
            width: 100%;
            padding: 10.4px 0;
            font-size: 17px;
            line-height: 1.45;
            border-bottom: 1px solid #ccc;
          }
          .newbottomsectionlistCT li a {
            color: #000;
            display: flex;
          }
          .newbottomsectionlistCT li a figure {
            margin-left: 10px;
            height: 60px;
            width: 90px;
          }

          /* flex-shrink: 0; */
          .newbottomsectionlistCT li a figure img {
            width: 90px;
            height: 60px;
            margin-right: 15px;
          }
          .newbottomsectionlistCT li a h3 {
            font-size: 15px;
            /* width: calc(100% - 90px); */
          }

          .newbottomsectionlistCT li a .counter {
            display: none;
          }
          .newbottomsectionlistCT li.vid a figure:before,
          .newbottomsectionlistCT li.vid a figure:after {
            display: none;
          }

          figure {
            position: relative;
            line-height: 0;
            overflow: inherit;
          }
          .newbottomsectionlistCT li a figure img {
            margin-right: 0;
          }
        }

        @media (max-width: 768px) {
          .newbottomsectionswrap {
            width: 100%;
          }
          .newbottomsectionlistCT li a figure {
            margin: 0;
            height: 60px;
          }
          .newbottomsectionlistCT li a figure img {
            margin-right: 0;
            height: 100%;
          }
          .newbottomsectionlistCT li h3 {
            padding-right: 5px;
          }
          .newbottomsectionlistCT li a > div {
            width: calc(100% - 90px);
          }
        }
      `}</style>
    </>
  );
};

export default NewsListingCommon;
