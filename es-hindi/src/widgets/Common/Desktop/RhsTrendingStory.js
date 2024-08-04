import React, { Fragment, memo } from "react";
//import { imageLoader } from "includes/article.util";
import LazyLoadImage from "components/Common/CustomImage";

const RhsTrendingStory = ({ trendingStory: storyArr = [], cat = {} }) => {
  return (
    <>
      {storyArr && storyArr?.length >= 3 && (
        <div className="rgt-trndstory">
          <h2 className="rgt-trndstoryhd">ट्रेंडिंग</h2>
          <div className="rgt-trndstory-list">
            <ul>
              {storyArr.map((item, index) => {
                const width = 216;
                const height = 144;
                const imagesURL = item?.thumbnail || item?.images?.url || "";
                //const imageSrc = imageLoader(imagesURL, width, height);
                return (
                  <Fragment key={index}>
                    {(item?.display_headline || item?.title) != null &&(
                      <li
                        onClick={() =>
                          ga(
                            "send",
                            "event",
                            `Trending_${cat}`,
                            "Click",
                            `${item?.display_headline || item?.title},${
                              item.id
                            }`,
                          )
                        }
                      >
                        <a
                          href={
                            item?.url
                              ? item.url.replace("https://hindi.news18.com", "")
                              : ""
                          }
                        >
                          <LazyLoadImage
                            src={imagesURL}
                            width={width}
                            height={height}
                            alt={item?.title || ""}
                            title={item?.title || ""}                            
                          />
                          {/* <img
                            src={imageSrc}
                            alt={item?.title || ""}
                            width={width}
                            height={"102px"}
                            loading="lazy"
                          ></img> */}
                          <h3>{item?.display_headline || item?.title}</h3>
                        </a>
                      </li>
                    )}
                  </Fragment>
                );
              })}
            </ul>
          </div>
          <a
            href={`/news/${cat}/`}
            className="moretrndstroy"
            onClick={() =>
              ga("send", "event", `Trending_${cat}`, "Click", "Read more")
            }
          >
            और भी पढ़ें{" "}
            <img
              src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/trendingarrowmore_1659358270.svg"
              alt=""
            />
          </a>
        </div>
      )}
      <style jsx global>
        {`
          .rgt-trndstory {
            background: #f5f5f5;
            border: 1px solid #e8e8e8;
            padding: 10px 10px 0 10px;
            margin: 30px 0;
            font-family: "Mukta", sans-serif;
          }
          .rgt-trndstory * {
            font-weight: bold;
          }
          .rgt-trndstoryhd {
            color: #000000;
            font-size: 18px;
            line-height: 22px;
            margin-bottom: 5px;
          }
          .rgt-trndstory-list {
            height: 230px;
            overflow: auto;
          }
          .rgt-trndstory-list::-webkit-scrollbar {
            width: 3px;
            border-radius: 2px;
          }
          .rgt-trndstory-list::scrollbar {
            width: 3px;
          }
          .rgt-trndstory-list::-webkit-scrollbar-track {
            background: #bfc0c0;
          }
          .rgt-trndstory-list::scrollbar-track {
            background: #bfc0c0;
          }
          .rgt-trndstory-list::-webkit-scrollbar-thumb {
            background: #70706f;
          }
          .rgt-trndstory-list::scrollbar-thumb {
            background: #70706f;
          }
          .rgt-trndstory-list ul {
            counter-reset: section;
            margin-right: 6px;
          }
          .rgt-trndstory-list ul li {
            background: #ffffff;
            border: 1px solid #dbdbdb;
            border-radius: 4px;
            padding: 10px;
            position: relative;
            margin-bottom: 5px;
          }
          .rgt-trndstory-list ul li:before {
            counter-increment: section;
            content: counter(section) "";
            width: 13px;
            height: 13px;
            background: #ffffff;
            box-shadow: 0px 0px 2px #00000029;
            position: absolute;
            border-radius: 2px;
            color: #e1261d;
            font-size: 10px;
            line-height: 14px;
            text-align: center;
            bottom: 5px;
            left: 70px;
          }
          .rgt-trndstory-list ul li a {
            display: flex;
          }
          .rgt-trndstory-list ul li a img {
            width: 67px;
            height: 50px;
            -webkit-flex-shrink: 0;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            margin-right: 15px;
            border-radius: 4px;
          }
          .rgt-trndstory-list ul li a h2,
          .rgt-trndstory-list ul li a h3 {
            color: #404040;
            font-size: 13px;
            line-height: 18px;
          }
          .moretrndstroy {
            color: #e82d2e;
            font-size: 14px;
            display: block;
            text-align: center;
            line-height: 24px;
            margin: 5px 0;
          }
          .moretrndstroy img {
            margin-left: 2px;
          }
        `}
      </style>
    </>
  );
};
export default memo(RhsTrendingStory);
