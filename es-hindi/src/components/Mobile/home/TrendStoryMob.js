import LazyLoadImage from "components/Common/CustomImage";
import { Fragment } from "react";

const TrendStoryMob = ({
  trendStory: storyArr = [],
  category = "",
  isAmp = "",
}) => {
  if (!storyArr.length) return null;

  category = "" ? "Home" : category;

  return (
    <>
      {storyArr?.length >= 3 && (
        <>
          <div className="rgt-ts">
            <h2 className="rgt-hd">ट्रेंडिंग</h2>
            <div className="rgt-ts-ls">
              <ul>
                {storyArr?.map((item, index) => {
                  const width = 70;
                  const height = 102;
                  const imagesURL = item?.thumbnail || item?.images?.url || "";
                  return (
                    <Fragment key={"storyArr" + item.id}>
                      {!isAmp ? (
                        <li
                          onClick={() =>
                            ga(
                              "send",
                              "event",
                              `Trending_${category}`,
                              "Click",
                              `${item?.display_headline || item?.title},${
                                item.id
                              }`
                            )
                          }
                        >
                          <a
                            href={
                              item?.url
                                ? item.url.replace(
                                    "https://hindi.news18.com",
                                    ""
                                  )
                                : ""
                            }
                          >
                            {/* <img src={imageSrc} alt={item?.title || item?.display_headline} width={width} height={'102px'} loading="lazy"></img> */}
                            <LazyLoadImage
                              src={imagesURL}
                              width={width}
                              height={height}
                              alt={item?.title || ""}
                              title={item?.title || ""}
                            />
                            <h3>{item?.display_headline || item?.title}</h3>
                          </a>
                        </li>
                      ) : (
                        <>
                          <li id={`ga_amp${index}`}>
                            <a
                              href={
                                item?.url
                                  ? item.url.replace(
                                      "https://hindi.news18.com",
                                      ""
                                    )
                                  : ""
                              }
                            >
                              <amp-img
                                style={{ "flex-shrink": "0" }}
                                src={imageSrc}
                                alt={item?.title || item?.display_headline}
                                width={"67px"}
                                height={"50px"}
                              ></amp-img>
                              <h3>{item?.display_headline || item?.title}</h3>
                            </a>
                          </li>
                          <amp-analytics type="googleanalytics">
                            <script
                              type="application/json"
                              dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                  vars: {
                                    account: "UA-156703-3",
                                  },
                                  triggers: {
                                    "click on #ga_amp${index} trigger": {
                                      on: "click",
                                      selector: "#ga_amp" + index,
                                      request: "event",
                                      vars: {
                                        eventCategory: `Trending_${category}`,
                                        eventAction: "Click",
                                        eventLabel: `${
                                          item?.display_headline || item?.title
                                        } , ${item?.id}`,
                                      },
                                    },
                                  },
                                }),
                              }}
                            ></script>
                          </amp-analytics>
                        </>
                      )}
                    </Fragment>
                  );
                })}
              </ul>
            </div>
            <a
              id="readMore_trend"
              href={
                !isAmp
                  ? category && category != null
                    ? `/news/${category}/`
                    : "/news/"
                  : category && category != null
                  ? `/news/${category}/`
                  : "/news/"
              }
              className="mrtrndst"
              onClick={() =>
                ga(
                  "send",
                  "event",
                  `Trending_${category}`,
                  "Click",
                  "Read more"
                )
              }
            >
              और भी पढ़ें
              <br />
              <img
                src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/trendingarrowmore_1659358270.svg"
                alt=""
                width="13"
              />
            </a>
            <amp-analytics type="googleanalytics">
              <script
                type="application/json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    vars: {
                      account: "UA-156703-3",
                    },
                    triggers: {
                      "click on #readMore_trend trigger": {
                        on: "click",
                        selector: "#readMore_trend",
                        request: "event",
                        vars: {
                          eventCategory: `Trending_${category}`,
                          eventAction: "Click",
                          eventLabel: "Read more",
                        },
                      },
                    },
                  }),
                }}
              ></script>
            </amp-analytics>
          </div>
          <style jsx global>
            {`
              .rgt-ts {
                background: #f5f5f5;
                border: 1px solid #e8e8e8;
                padding: 10px;
                display: flex;
                overflow-x: scroll;
                overflow-y: hidden;
                justify-content: space-between;
                height: 92px;
                font-family: "Mukta", sans-serif;
                align-items: center;
                ${!isAmp ? "margin:0 -15px;" : "margin:0px;"}
              }
              .rgt-ts * {
                font-weight: bold;
              }
              .rgt-hd {
                color: #000000;
                font-size: 15px;
                line-height: 22px;
                flex-shrink: 0;
                text-align: center;
              }
              .rgt-ts-ls {
                margin: 0 10px;
              }
              .rgt-ts-ls ul {
                display: flex;
                gap: 10px;
                counter-reset: section;
              }
              .rgt-ts-ls ul li {
                background: #ffffff;
                border: 1px solid #dbdbdb;
                border-radius: 4px;
                padding: 10px;
                position: relative;
                width: 250px;
              }
              .rgt-ts-ls ul li:before {
                counter-increment: section;
                content: counter(section) "";
                width: 12px;
                height: 12px;
                background: #ffffff;
                box-shadow: 0px 0px 2px #00000029;
                position: absolute;
                border-radius: 2px;
                color: #e1261d;
                font-size: 10px;
                line-height: 13px;
                text-align: center;
                top: 50px;
                left: 70px;
                z-index: 1;
              }
              .rgt-ts-ls ul li a {
                display: flex;
              }
              .rgt-ts-ls ul li a img {
                width: 67px;
                height: 50px;
                flex-shrink: 0;
              }
              .rgt-ts-ls ul li a h2,
              .rgt-ts-ls ul li a h3 {
                color: #404040;
                font-size: 13px;
                line-height: 18px;
                height: 51px;
                overflow: hidden;
                margin-left: 10px;
                font-weight: normal;
              }
              .mrtrndst {
                color: #e82d2e;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
                width: 80px;
                flex-shrink: 0;
                background: #ffffff;
                border: 1px solid #dbdbdb;
                border-radius: 4px;
                padding-top: 20px;
                min-height: 74px;
              }
            `}
          </style>
        </>
      )}
    </>
  );
};
export default TrendStoryMob;
