import React from "react";
// import Taboola from "widgets/Common/Responsive/Taboola";
// import { TaboolaList } from "includes/Tabola.helper";
import { imageLoader } from "includes/article.util";
import LazyLoadImage from "components/Common/CustomImage";
import getConfig from "next/config";
import ampHelper from "includes/Amp/ampHelper";

const { publicRuntimeConfig } = getConfig();

const NewsListingCommonAmp = (props) => {
  const NewsData = props.initialData;
  const getURL = (url, isAmp = false) => {
    return url
      ? url.replace(
          "https://hindi.news18.com/",
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
      {NewsData.length > 1 ? (
        <div className="newbottomsectionswrap">
          <div className="newbottomsection">
            <ul className="newbottomsectionlist">
              {NewsData.map((item, index) => {
                return (
                  <>
                    {index === 1 ? (
                      <div class="clearfix add">
                        <div class="addinner-box">
                          <div class="ad-container go">
                            <amp-ad
                              width={336}
                              height={280}
                              type="doubleclick"
                              data-slot={ampAds.middleAd1}
                              data-multi-size="300x250"
                              data-enable-refresh="30"
                              data-lazy-fetch="true"
                              data-loading-strategy="1"
                            ></amp-ad>
                          </div>
                        </div>
                      </div>
                    ) : index === 22 ? (
                      <div class="clearfix add">
                        <div class="addinner-box">
                          <div class="ad-container go">
                            <amp-ad
                              width={336}
                              height={280}
                              type="doubleclick"
                              data-slot={ampAds.middleAd2}
                              data-multi-size="300x250"
                              data-enable-refresh="30"
                              data-lazy-fetch="true"
                              data-loading-strategy="1"
                            ></amp-ad>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
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
                      <a href={getURL(item.weburl, true)}>
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
                            isAMP={true}
                          />
                        </figure>
                      </a>
                    </li>
                    {/* {index === 12 ? (
                      <Taboola
                        mode={TaboolaList.category.center.mode}
                        id={TaboolaList.category.center.id}
                        container={TaboolaList.category.center.container}
                        placement={TaboolaList.category.center.placement}
                        position={"center"}
                        isMobile={isMobile}
                      />
                    ) : (
                      ""
                    )} */}
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}

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
        .newbottomsectionlist {
          column-gap: 12px;
          row-gap: 20px;
          display: grid;
          grid-template-columns: 216px 216px 216px 216px;
        }
        .newbottomsectionlist li {
          padding: 10px 0;
          position: relative;
          border-bottom: 1px solid #e0e0e0;
        }
        .newbottomsectionlist li a figure {
          width: 216px;
          height: 144px;
          position: relative;
        }
        .newbottomsectionlist li a figure img {
          width: 100%;
          height: 144px;
        }
        .newbottomsectionlist li a h3 {
          padding: 5px 0 0;
          font-weight: bold;
          font-size: 16px;
          line-height: 23px;
          margin-bottom: 7px;
          color: #000000;
        }

        .newbottomsectionlist li a .counter {
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
        .newbottomsectionlist li a .counter h3 {
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
        .newbottomsectionlist li.pht a figure:after {
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          opacity: 0.4;
          border-radius: 4px;
          background-color: #000000;
        }
        .newbottomsectionlist li.vid a figure:before {
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
        .newbottomsectionlist li.vid a figure:after {
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
          .newbottomsectionlist {
            margin-bottom: 20px;
            display: block;
          }
          .newbottomsectionlist li {
            width: 100%;
            padding: 10.4px 0;
            font-size: 17px;
            line-height: 1.45;
            border-bottom: 1px solid #ccc;
          }
          .newbottomsectionlist li a {
            color: #000;
            display: flex;
          }
          .newbottomsectionlist li a figure {
            margin-left: 10px;
            height: 60px;
            width: 90px;
          }

          /* flex-shrink: 0; */
          .newbottomsectionlist li a figure img {
            width: 90px;
            height: 60px;
            margin-right: 15px;
          }
          .newbottomsectionlist li a h3 {
            font-size: 15px;
            /* width: calc(100% - 90px); */
          }

          .newbottomsectionlist li a .counter {
            display: none;
          }
          .newbottomsectionlist li.vid a figure:before,
          .newbottomsectionlist li.vid a figure:after {
            display: none;
          }

          figure {
            position: relative;
            line-height: 0;
            overflow: inherit;
          }
          .newbottomsectionlist li a figure img {
            margin-right: 0;
          }
        }

        @media (max-width: 768px) {
          .newbottomsectionswrap {
            width: 100%;
          }
          .newbottomsectionlist li a figure {
            margin: 0;
            height: 60px;
          }
          .newbottomsectionlist li a figure img {
            margin-right: 0;
            height: 100%;
          }
          .newbottomsectionlist li h3 {
            padding-right: 5px;
          }
          .newbottomsectionlist li a > div {
            width: calc(100% - 90px);
          }
        }
      `}</style>
    </>
  );
};

export default NewsListingCommonAmp;
