import React, { useState } from "react";
import {
  NewsSVGData,
  PhotoGallerySVGData,
  VideoSVGData,
  WebStorySVGData,
  LiveBlogSVGData,
} from "includes/newsFeed.helper";
const TrendingStories = ({
  top_trending_articles = [],
  top_trending_articles_with_category = [],
  categoryName = "",
  pageParam = {},
}) => {
  if (Object.keys(top_trending_articles_with_category)?.length === 0)
    top_trending_articles_with_category = [];
  const [selected, setSelecte] = useState(
    categoryName === "आज की ताजा खबर (Latest Hindi News)" ||
    categoryName === 'राज्य'||
      top_trending_articles_with_category?.length === 0
      ? "true"
      :categoryName !==""? "true":"false"
  );
  const handleChange = (e) => {
    const { value } = e.target;
    setSelecte(value);
  };
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <div>
        <span className="ph_heading">
          <a href="">ट्रेंडिंग स्टोरीज</a>
        </span>
      </div>
      <div className="tags-tab-container ">
        <input
          id="tab1"
          type="radio"
          name="tabs"
          className="tabs-cell"
          value="true"
          checked={selected === "true"}
          onChange={handleChange}
        />
        <label for="tab1" className="tabs-label">
          News18 Hindi
        </label>
        {!categoryName.includes("आज की ताजा खबर (Latest Hindi News)") &&
          categoryName !== "" &&
          top_trending_articles_with_category?.length > 5 && (
            <>
              <input
                id="tab2"
                type="radio"
                name="tabs"
                className="tabs-cell"
                value="false"
                checked={selected === "false"}
                onChange={handleChange}
              />
              <label for="tab2" className="tabs-label">
                {pageParam?.hi_subCategory
                  ? pageParam?.hi_subCategory.replace("&AMP;", "&")
                  : pageParam?.hi_category}
              </label>
            </>
          )}
        {/* data part */}
        {selected === "true" && (
          <section className={"tabs-section"} id="content1">
            <ul className="tr_wrap">
              {top_trending_articles?.length > 0 &&
                top_trending_articles?.slice(0, 10)?.map((item, index) => {
                  return (
                    <li key={index} className="trli">
                      <a
                        href={
                          item?.weburl_r +
                          `?utm_source=${
                            !categoryName.includes(
                              "आज की ताजा खबर (Latest Hindi News)"
                            ) && categoryName !== ""
                              ? pageParam?.subCategory
                                ? pageParam?.subCategory
                                : pageParam?.category
                              : ""
                          }&utm_medium=desktop&utm_campaign=trending_storyinwebsite`
                        }
                      >
                        {item?.liveblog_switcher === 1 ? (
                          <LiveBlogSVGData />
                        ) : item?.post_type === "text" ? (
                          <NewsSVGData />
                        ) : item?.post_type === "photogallery" ? (
                          <PhotoGallerySVGData />
                        ) : item?.post_type === "videos" ? (
                          <VideoSVGData />
                        ) : item?.id?.includes("webstory") ? (
                          <WebStorySVGData />
                        ) : null}
                        <>&nbsp;&nbsp;{`${item?.display_headline}`}</>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </section>
        )}
        {selected === "false" && categoryName !== "" && (
          <section className={"tabs-section"} id="content2">
            <ul className="tr_wrap">
              {top_trending_articles_with_category?.length > 0 &&
                top_trending_articles_with_category
                  ?.slice(0, 10)
                  .map((item, index) => {
                    return (
                      <li key={index} className="trli">
                        <a
                          href={
                            item?.weburl_r +
                            `?utm_source=${
                              !categoryName.includes(
                                "आज की ताजा खबर (Latest Hindi News)"
                              ) && categoryName !== ""
                                ? pageParam?.subCategory
                                  ? pageParam?.subCategory
                                  : pageParam?.category
                                : ""
                            }&utm_medium=desktop&utm_campaign=trending_storyinsection`
                          }
                        >
                          {item?.liveblog_switcher === 1 ? (
                            <LiveBlogSVGData />
                          ) : item?.post_type === "text" ? (
                            <NewsSVGData />
                          ) : item?.post_type === "photogallery" ? (
                            <PhotoGallerySVGData />
                          ) : item?.post_type === "videos" ? (
                            <VideoSVGData />
                          ) : item?.id?.includes("webstory") ? (
                            <WebStorySVGData />
                          ) : null}
                          <>&nbsp;&nbsp;{`${item?.display_headline}`}</>
                        </a>
                      </li>
                    );
                  })}
            </ul>
          </section>
        )}
      </div>
      <style jsx>{`
        .ph_heading {
          color: #000;
          font-size: 22px;
          line-height: 36px;
          font-weight: bold;
          font-family: "Mukta", sans-serif !important;
          position: relative;
          border-bottom: 2px solid#111;
        }
        .ph_heading::before {
          content: "";
          height: 5px;
          width: 25px;
          background: #f4342f;
          position: absolute;
          left: 0;
          bottom: -3px;
        }
        .ph_heading a {
          color: #000000;
          text-decoration: none;
        }
        .tags-tab-container {
          margin: 10px 0;
          padding: 15px 10px;
          background-color: #f7f7f7;
        }
        input.tabs-cell {
          display: none;
        }
        input.tabs-cell:checked + label.tabs-label {
          border-bottom: 3px solid #e1271d;
          font-weight: bold;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #f4322f;
          border-radius: 40px;
          color: #f4322f;
          background-color: #fff;
          width: 115px;
          height: 30px;
          text-align: center;
        }
        label.tabs-label {
          font-size: 16px;
          line-height: 31px;
          text-transform: uppercase;
          color: #767676;
          display: inline-block;
          padding: 0;
          font-weight: normal;
          cursor: pointer;
          margin: 0 15px 0 0;
          min-width: 111px;
          text-align: center;
        }
        #tab1:checked ~ #content1,
        #tab2:checked ~ #content2,
        #tab3:checked ~ #content3,
        #tab4:checked ~ #content4,
        #tab5:checked ~ #content5 {
          display: block;
        }
        section.tabs-section {
          display: none;
          padding: 10px 0 0 0;
        }
        .trli {
          padding: 10px 5px 10px 30px;
          border-bottom: 1px solid #70707033;
          position: relative;
          color: #000;
          font-size: 14px;
          line-height: 20px;
          margin-left: -30px
        }
        .trli svg {
          position: absolute;
          left: 0;
          top: 14px;
        }
        .tr_wrap {
          overflow-y: auto;
          height: 330px;
        }
        .tr_wrap::-webkit-scrollbar {
          width: 10px;
        }
        .tr_wrap::-webkit-scrollbar-track {
          background: #fff;
          border: 1px solid #d3d3d3;
          border-radius: 10px;
        }
        .tr_wrap::-webkit-scrollbar-thumb {
          background-color: #cbbaba;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};
export default TrendingStories;