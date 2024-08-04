import SiteAd from "widgets/Common/Responsive/SiteAd";
import dateFormat from "dateformat";
import React, { useState } from "react";
import getConfig from "next/config";
import { calculateDate, getDataWithCategoryId } from "api/individual/Podcast";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const PodcastCategories = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const { topPriorityData, pageAds } = props;
  const { categoryDetailsData, breadCrumbArray } = topPriorityData;
  const category = topPriorityData?.query.category;
  const pageurl = `/podcast/${category}/`;
  // const categoryData = categoryDetailsData?.articlesList;
  const categoriesList = categoryDetailsData?.categoryList;
  const [categoryData, setCategoryData] = useState(
    categoryDetailsData?.articlesList
  );

  const [loadMore, setLoadMore] = useState(1);
  const dataLength = props?.topPriorityData?.dataLength;
  const paramObj = props?.topPriorityData?.paramObj;
  const storyLength = categoryData?.length;
  const pageLimit = 10;
  const loadPosts = async (d) => {
    if (d) {
      const currentLoadMore = d;

      const offset = currentLoadMore * 10;

      let podCastResult = [];
      const categoryId = paramObj?.categoryId;
      podCastResult = await getDataWithCategoryId(
        categoryId,
        offset,
        pageLimit
      );
      if (podCastResult?.length > 0) {
        setLoadMore(currentLoadMore + 1);
        let podCastData = podCastResult;
        setCategoryData((prev) => [...prev, ...podCastData]);
      } else {
        setLoadMore(12);
      }
    }
  };

  const noContent = dataLength > 720 && paramObj.page > 30 ? false : true;
  return (
    <>
      <div className="clearfix">
        <div className="clearfix add">
          <div className="addinner-box addinner_box_300x250">
            <div className="clearfix vsp10 add container-ad">
              <SiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={props?.pageAds.header_ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                style={{ padding: "16px" }}
              ></SiteAd>
            </div>
          </div>
        </div>
        <div className="podcast_page">
          <div className="podcast_container">
            <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
            <div className="podcast-listing_wrapper">
              <div className="podcast-listing_left">
                <div className="podcast-listing_top">
                  <ul className="podcast-tabs">
                    {categoriesList &&
                      categoriesList.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className={category === item.slug ? "active" : ""}
                          >
                            <a href={`/podcast/${item?.slug}/`}>{item?.name}</a>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                {categoryData &&
                categoryDetailsData?.isCategory &&
                categoryData.length > 0 ? (
                  categoryData?.map((item, index) => {
                    // const object = JSON.parse(item.audio_info[0]);
                    const object = item?.podcast_embed;
                    let baseUrl = publicRuntimeConfig.siteUrl;
                    baseUrl = baseUrl.replace(/\/$/, "");
                    const pageUrl = baseUrl + item?.weburl_r;
                    const palinHeadline = item?.display_headline;

                    const facebookShareLink = `https://www.facebook.com/sharer.php?u=${pageUrl}&amp;t=${palinHeadline}`;
                    const twitterShareLink = `https://twitter.com/share?url=${pageUrl}&text=${palinHeadline};`;
                    const whatsappShareLink = `https://web.whatsapp.com/send?text=${palinHeadline}-${pageUrl}`;
                    const title = item?.display_headline;
                    const date = item?.updated_at?.toString();
                    const display = calculateDate(date);
                    const formattedDate = dateFormat(
                      display,
                      "mmmm d, yyyy, h:MM TT"
                    );
                    return (
                      <div className="podcast-listing_row">
                        <div
                          className="podcast-listing_content"
                          style={{ display: "block" }}
                        >
                          <div className="podcast_content_left">
                            <figure>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: object,
                                }}
                              ></div>
                            </figure>
                          </div>
                          <div className="podcast_content_right">
                            <i>{formattedDate}</i>
                            <h1 className="podcast-listing_title">
                              <a href={item?.weburl}>{title}</a>
                            </h1>
                          </div>
                          <div className="share_this">
                            <p>Share</p>
                            <ul>
                              <li>
                                <a href={facebookShareLink}>
                                  <img
                                    src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_fb_1592317881.png"
                                    alt="facebook"
                                    title="facebook"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href={twitterShareLink}>
                                  <img
                                    src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_tw_1592317903.png"
                                    alt="Twitter"
                                    title="Twitter"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href={whatsappShareLink}>
                                  <img
                                    src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_wtsup_1592317921.png"
                                    alt="whatsapp"
                                    title="whatsapp"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="read_more">
                            <a href={item?.weburl}>और भी पढ़ें</a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No stories found matching this criteria</p>
                )}
              </div>
              {/* {categoryDetailsData?.isCategory && (categoryData.length>0) &&
              <Pagination
                    curpage={topPriorityData?.query.page}
                    TotalRecord={450}
                    limit={5}
                    pageurl={pageurl}
                    pageflag={false}
                  />} */}
              {/* {paramObj.page > 1 ?
                                noContent ? <Pagination  curpage={paramObj.page} TotalRecord={dataLength} limit={pageLimit} pageurl={pageurl} pageflag={false} /> : null 
                                :
                                storyLength>0 ? loadMore<=10 ?

                                <button onClick={() => loadPosts(loadMore, categoryData)} className="load_more clearfix">
                                Load More
                                </button>: "":""
                            } */}
              {storyLength >= 10 ? (
                loadMore <= 11 ? (
                  <button
                    onClick={() => loadPosts(loadMore, categoryData)}
                    className="load_more clearfix"
                  >
                    Load More
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {typeof pageAds.PG_1x1 !== "undefined" && pageAds.PG_1x1 !== "" ? (
          <SiteAd
            slotId="PG_1x1"
            adUnit={pageAds.PG_1x1}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          />
        ) : null}
        {typeof pageAds.PG_1x1_2 !== "undefined" && pageAds.PG_1x1_2 !== "" ? (
          <SiteAd
            slotId="PG_1x1_2"
            adUnit={pageAds.PG_1x1_2}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          />
        ) : null}
        {typeof pageAds.PG_1x1_3 !== "undefined" && pageAds.PG_1x1_3 !== "" ? (
          <SiteAd
            slotId="PG_1x1_3"
            adUnit={pageAds.PG_1x1_3}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          />
        ) : null}
        {typeof pageAds.SKIN_OOP !== "undefined" && pageAds.SKIN_OOP !== "" ? (
          <SiteAd
            slotId="SKIN_OOP"
            adUnit={pageAds.SKIN_OOP}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          />
        ) : null}
        {typeof pageAds.SHOSH_OOP !== "undefined" &&
        pageAds.SHOSH_OOP !== "" ? (
          <SiteAd
            slotId="SHOSH_OOP"
            adUnit={pageAds.SHOSH_OOP}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          />
        ) : null}
      </div>
      <style jsx global>
        {`
          html,
          body,
          div,
          span,
          applet,
          object,
          iframe,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          blockquote,
          pre,
          a,
          abbr,
          acronym,
          address,
          big,
          cite,
          code,
          del,
          dfn,
          em,
          img,
          ins,
          kbd,
          q,
          s,
          samp,
          small,
          strike,
          strong,
          sub,
          sup,
          tt,
          var,
          b,
          u,
          i,
          center,
          dl,
          dt,
          dd,
          ol,
          ul,
          li,
          fieldset,
          form,
          label,
          legend,
          table,
          caption,
          tbody,
          tfoot,
          thead,
          tr,
          th,
          td,
          article,
          aside,
          canvas,
          details,
          embed,
          figure,
          figcaption,
          footer,
          header,
          hgroup,
          menu,
          nav,
          output,
          ruby,
          section,
          summary,
          time,
          mark,
          audio,
          video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
            box-sizing: border-box;
          }

          /* HTML5 display-role reset for older browsers */

          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          menu,
          nav,
          section {
            display: block;
          }

          body {
            line-height: 1;
          }

          ol,
          ul {
            list-style: none;
          }

          blockquote,
          q {
            quotes: none;
          }

          blockquote:before,
          blockquote:after,
          q:before,
          q:after {
            content: "";
            content: none;
          }

          table {
            border-collapse: collapse;
            border-spacing: 0;
          }

          /* cyrillic-ext */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 400;
            src: local("Noto Sans"), local("NotoSans"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0IIpQlx3QUlC5A4PNr6DRASf6M7VBj.woff2)
                format("woff2");
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
              U+A640-A69F, U+FE2E-FE2F;
          }

          /* cyrillic */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 400;
            src: local("Noto Sans"), local("NotoSans"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0IIpQlx3QUlC5A4PNr4TRASf6M7VBj.woff2)
                format("woff2");
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }

          /* devanagari */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 400;
            src: local("Noto Sans"), local("NotoSans"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0IIpQlx3QUlC5A4PNr5DRASf6M7VBj.woff2)
                format("woff2");
            unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
              U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
          }

          /* greek-ext */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 400;
            src: local("Noto Sans"), local("NotoSans"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0IIpQlx3QUlC5A4PNr6TRASf6M7VBj.woff2)
                format("woff2");
            unicode-range: U+1F00-1FFF;
          }

          /* greek */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 400;
            src: local("Noto Sans"), local("NotoSans"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0IIpQlx3QUlC5A4PNr5jRASf6M7VBj.woff2)
                format("woff2");
            unicode-range: U+0370-03FF;
          }

          /* vietnamese */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 400;
            src: local("Noto Sans"), local("NotoSans"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0IIpQlx3QUlC5A4PNr6jRASf6M7VBj.woff2)
                format("woff2");
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
              U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
          }

          /* latin-ext */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 400;
            src: local("Noto Sans"), local("NotoSans"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0IIpQlx3QUlC5A4PNr6zRASf6M7VBj.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }

          /* latin */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 400;
            src: local("Noto Sans"), local("NotoSans"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0IIpQlx3QUlC5A4PNr5TRASf6M7Q.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          /* cyrillic-ext */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 700;
            src: local("Noto Sans Bold"), local("NotoSans-Bold"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0NIpQlx3QUlC5A4PNjXhFVadyBx2pqPIif.woff2)
                format("woff2");
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
              U+A640-A69F, U+FE2E-FE2F;
          }

          /* cyrillic */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 700;
            src: local("Noto Sans Bold"), local("NotoSans-Bold"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0NIpQlx3QUlC5A4PNjXhFVYNyBx2pqPIif.woff2)
                format("woff2");
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
          }

          /* devanagari */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 700;
            src: local("Noto Sans Bold"), local("NotoSans-Bold"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0NIpQlx3QUlC5A4PNjXhFVZdyBx2pqPIif.woff2)
                format("woff2");
            unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
              U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
          }

          /* greek-ext */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 700;
            src: local("Noto Sans Bold"), local("NotoSans-Bold"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0NIpQlx3QUlC5A4PNjXhFVaNyBx2pqPIif.woff2)
                format("woff2");
            unicode-range: U+1F00-1FFF;
          }

          /* greek */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 700;
            src: local("Noto Sans Bold"), local("NotoSans-Bold"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0NIpQlx3QUlC5A4PNjXhFVZ9yBx2pqPIif.woff2)
                format("woff2");
            unicode-range: U+0370-03FF;
          }

          /* vietnamese */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 700;
            src: local("Noto Sans Bold"), local("NotoSans-Bold"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0NIpQlx3QUlC5A4PNjXhFVa9yBx2pqPIif.woff2)
                format("woff2");
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
              U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
          }

          /* latin-ext */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 700;
            src: local("Noto Sans Bold"), local("NotoSans-Bold"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0NIpQlx3QUlC5A4PNjXhFVatyBx2pqPIif.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }

          /* latin */

          @font-face {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 700;
            src: local("Noto Sans Bold"), local("NotoSans-Bold"),
              url(https://fonts.gstatic.com/s/notosans/v9/o-0NIpQlx3QUlC5A4PNjXhFVZNyBx2pqPA.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          /* devanagari */

          @font-face {
            font-family: "Khand";
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: local("Khand Medium"), local("Khand-Medium"),
              url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKhcWExbQe3_w.woff2)
                format("woff2");
            unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
              U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
          }

          /* latin-ext */

          @font-face {
            font-family: "Khand";
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: local("Khand Medium"), local("Khand-Medium"),
              url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKhcWE-bQe3_w.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }

          /* latin */

          @font-face {
            font-family: "Khand";
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: local("Khand Medium"), local("Khand-Medium"),
              url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKhcWEwbQc.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          /* devanagari */

          @font-face {
            font-family: "Khand";
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: local("Khand SemiBold"), local("Khand-SemiBold"),
              url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKNdmExbQe3_w.woff2)
                format("woff2");
            unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
              U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
          }

          /* latin-ext */

          @font-face {
            font-family: "Khand";
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: local("Khand SemiBold"), local("Khand-SemiBold"),
              url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKNdmE-bQe3_w.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }

          /* latin */

          @font-face {
            font-family: "Khand";
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: local("Khand SemiBold"), local("Khand-SemiBold"),
              url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKNdmEwbQc.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          /* devanagari */

          @font-face {
            font-family: "Khand";
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local("Khand Bold"), local("Khand-Bold"),
              url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bLpd2ExbQe3_w.woff2)
                format("woff2");
            unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
              U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
          }

          /* latin-ext */

          @font-face {
            font-family: "Khand";
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local("Khand Bold"), local("Khand-Bold"),
              url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bLpd2E-bQe3_w.woff2)
                format("woff2");
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }

          /* latin */

          @font-face {
            font-family: "Khand";
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local("Khand Bold"), local("Khand-Bold"),
              url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bLpd2EwbQc.woff2)
                format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          .podcast_breadcrumbs ul {
            font-family: "Noto Sans", sans-serif;
            display: flex;
            color: #085085;
            align-items: center;
            font-size: 15px;
          }

          .podcast_breadcrumbs ul li {
            padding: 0 8px;
          }

          .podcast_breadcrumbs ul li a {
            color: #8e8e8e;
            text-decoration: none;
          }

          .podcast_breadcrumbs ul li:first-child {
            padding-left: 0;
          }

          .podcast_breadcrumbs {
            width: 100%;
            padding: 20px 0;
          }

          .podcast_box {
            font-family: "Noto Sans", sans-serif;
            width: 100%;
            margin-bottom: 15px;
          }

          .podcast_box a {
            display: block;
            text-decoration: none;
          }

          .podcast_box figure img {
            width: 100%;
            display: block;
            border-radius: 10px;
          }

          ul.time_location {
            display: flex;
            align-items: center;
            list-style: none;
            letter-spacing: -0.24px;
            color: #696969;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: normal;
            padding: 0;
            padding-top: 5px;
          }

          .podcast_section_left .podcast_box:nth-child(1) ul.time_location {
            font-size: 14px;
          }

          ul.time_location li {
            position: relative;
             
          }

          ul.time_location li:after {
            width: 6px;
            height: 6px;
            content: "";
            position: absolute;
            left: 0;
            background: #eb3d3c 0% 0% no-repeat padding-box;
            border-radius: 10px;
            top: 2px;
          }

          .podcast_box figcaption h2 {
            letter-spacing: -0.36px;
            color: #222222;
            font-size: 18px;
            font-weight: bold;
            line-height: 30px;
            margin: 0;
            padding: 0;
            width: 100%;
            position: relative;
            max-height: 60px;
            overflow: hidden;
          }

          .podcast_box figcaption h2:hover {
            color: #eb3d3c;
          }

          .podcast_box figure {
            width: 100%;
            margin: 0;
            padding: 0;
          }

          .podcast_section_right {
            width: 400px;
          }

          .podcast_page_section {
            display: flex;
          }

          .podcast_section_left {
            width: calc(100% - 400px);
            padding-right: 15px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
          }

          .podcast_section_left .podcast_box:nth-child(1) {
            width: 100%;
            padding: 0;
            margin-bottom: 30px;
          }

          .podcast_section_left .podcast_box {
            width: 50%;
            padding: 0 10px;
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
          }

          .podcast_box figcaption {
            background: #fff;
            position: relative;
            margin-top: -20px;
          }

          .podcast_box figcaption {
            display: flex;
            flex-wrap: wrap-reverse;
            position: relative;
            z-index: 1;
          }

          .podcast_container {
            margin: auto;
            max-width: 1245px;
            padding: 0 10px;
            position: relative;
            clear: both;
            margin-bottom: 30px;
          }

          .podcast_topbar_right ul li {
            padding-right: 20px;
          }

          .podcast_topbar_right ul li:last-child {
            padding-right: 0;
          }

          .podcast_box figcaption:after {
            content: "";
            position: absolute;
            width: 40px;
            height: 40px;
            margin: auto;
            left: 0;
            right: 0;
            top: -48px;
            border-radius: 100px;
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/podcast_icon_1591679506.png)
              #eb3d3c;
            background-size: 15px;
            background-repeat: no-repeat;
            background-position: center;
          }

          .podcast_section_left .podcast_box:nth-child(1) h2 {
            font-size: 26px;
            line-height: 46px;
            max-height: 92px;
            overflow: hidden;
          }

          .podcast_title {
            letter-spacing: 0px;
            color: #eb3d3c;
            text-transform: uppercase;
            font-size: 30px;
            margin: 0;
            padding: 0;
            font-family: "Khand", sans-serif;
            font-weight: bold;
          }

          .podcast_title a {
            color: #eb3d3c;
          }

          .latest_podcast_row {
            display: flex;
            margin: 0 10px;
          }

          .latest_podcast_left img {
            width: 100%;
            display: block;
            border-radius: 10px;
          }

          .latest_podcast_left {
          }

          .latest_podcast_right {
            width: 53%;
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/latest_podcast_icon_1591695161.png);
            color: #fff;
            padding: 10px;
            box-sizing: border-box;
            padding-right: 0;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            left: -19px;
            position: relative;
            padding-left: 24px;
            height: 100%;
          }

          .latest_podcast_right:after {
            content: "";
            position: absolute;
            width: 40px;
            height: 40px;
            margin: auto;
            left: -28px;
            border-radius: 100px;
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/podcast_icon_1591679506.png)
              #eb3d3c;
            background-size: 15px;
            background-repeat: no-repeat;
            background-position: center;
            top: 50%;
            transform: translateY(-50%);
          }

          .latest_podcast .podcast_container {
            display: flex;
          }

          .latest_podcast_right h2 {
            letter-spacing: -0.36px;
            color: #ffffff;
            font-size: 18px;
            line-height: 32px;
            font-family: "Noto Sans", sans-serif;
          }

          .latest_podcast_right h2 a {
            color: #fff;
          }

          .latest_podcast_right ul.time_location {
            color: #fff;
            padding-bottom: 10px;
          }

          .latest_podcast_right ul.time_location li {
            padding-left: 12px;
            padding-right: 8px;
            font-family: "Noto Sans", sans-serif;
          }

          .latest_podcast_row:nth-child(1) {
            margin-left: 0;
          }

          .latest_podcast_row:nth-child(2) {
            margin-right: 0;
          }

          .latest_podcast {
            width: 100%;
            background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/latest_podcast_bg_1591686542.png);
            float: left;
            background-size: cover;
            height: 300px;
            display: flex;
            align-items: center;
            position: relative;
            margin: 30px 0;
          }

          .latest_podcast_title {
            position: absolute;
            top: -12px;
            left: 0;
            right: 0;
            margin: auto;
            text-align: center;
            display: inline-block;
            width: 245px;
            height: 53px;
            background: #fff;
            border-radius: 10px;
            font-family: "Khand", sans-serif;
            line-height: 66px;
            letter-spacing: 0px;
            color: #eb3d3c;
            font-size: 36px;
            font-weight: bold;
          }

          .podcast_box figcaption:before {
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_3_1591698372.png);
            width: 100%;
            content: "";
            position: absolute;
            top: -18px;
            height: 64px;
            left: 0;
            right: 0;
            margin: auto;
            background-size: cover;
            background-position: center;
          }

          .podcast_section_left .podcast_box:nth-child(1) figcaption:before {
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_1591679661.png);
            background-size: 100.1%;
            height: 26px;
            top: -22px;
          }

          .podcast_section_left .podcast_box:nth-child(1) figcaption:after {
            width: 56px;
            height: 56px;
            top: -63px;
          }

          .podcast_topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
          }

          .podcast_topbar_right {
            display: flex;
            align-items: center;
            border-bottom: 1px rgba(0, 0, 0, 0.22) solid;
            position: relative;
          }

          .podcast_topbar_right ul {
            display: flex;
            align-items: center;
            list-style: none;
          }

          .podcast_topbar_right ul img {
            width: 120px;
          }

          .podcast_topbar_right ul li:nth-child(4) img {
            width: 50px;
          }

          .podcast_topbar_right ul li:nth-child(3) {
            display: flex;
            align-items: center;
          }

          p.subscribe_to {
            padding: 0;
            margin: 0;
            letter-spacing: -0.36px;
            color: #222222;
            text-transform: uppercase;
            font-size: 16px;
            padding-right: 20px;
            margin-right: 15px;
            font-family: "Noto Sans", sans-serif;
            position: relative;
            font-weight: bold;
          }

          p.subscribe_to:after {
            content: "";
            width: 6px;
            height: 6px;
            position: absolute;
            top: 3px;
            right: 5px;
            border-bottom: 2px solid #222222;
            border-right: 2px solid #222222;
            transform: rotate(-45deg);
          }

          .OUTBRAIN {
            max-width: 1240px;
            margin: auto;
          }

          .podcast_topbar_right:after {
            content: "";
            position: absolute;
            left: 0;
            background: #eb3d3c;
            width: 210px;
            height: 3px;
            top: 34px;
          }

          .podcast_topbar_right ul li:nth-child(4) a {
            display: flex;
            align-items: center;
          }

          .podcast_topbar_right ul li:nth-child(4) p {
            letter-spacing: -0.3px;
            color: #222222;
            font-size: 15px;
            font-weight: bold;
            padding-left: 5px;
          }

          .podcast_topbar_right ul a {
            text-decoration: none;
            font-family: "Noto Sans", sans-serif;
          }

          i.play-icon {
            width: 30px;
            height: 30px;
            position: absolute;
            right: 0;
            left: 0;
            border: 2px solid #fff;
            border-radius: 54px;
            background: #000;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
          }

          i.play-icon:after {
            position: absolute;
            top: 5px;
            left: 10px;
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 10px solid #fff;
            content: "";
          }

          .podcast_content_left {
            position: relative;
            width: 300px;
          }

          .podcast-listing_content {
            display: flex;
            width: 100%;
          }

          .podcast-listing_left img {
            width: 100%;
            display: block;
          }

          .podcast_content_right {
            width: calc(100% - 300px);
            font-family: "Noto Sans", sans-serif;
            padding-left: 20px;
          }

          .podcast_content_left iframe {
            height: 180px;
          }

          .share_icon {
            display: none;
          }

          .podcast-listing_left {
            width: calc(100% - 300px);
            padding-right: 26px;
          }

          .podcast-listing_right {
            width: 300px;
          }

          .podcast_content_right i {
            letter-spacing: -0.24px;
            color: #888888;
            text-transform: uppercase;
            font-size: 12px;
            position: relative;
            font-weight: 500;
            padding-left: 14px;
          }

          .podcast_content_right i:after {
            width: 8px;
            height: 8px;
            content: "";
            position: absolute;
            left: 0;
            background: #eb3d3c 0% 0% no-repeat padding-box;
            border-radius: 10px;
            top: 4px;
          }

          .podcast-listing_title {
            letter-spacing: -0.42px;
            color: #222222;
            font-size: 21px;
            line-height: 34px;
            font-weight: bold;
          }

          .podcast-listing_title a {
            text-decoration: none;
            color: #222222;
          }

          .podcast-listing_intro {
            letter-spacing: -0.3px;
            color: #666666;
            font-size: 15px;
            line-height: 26px;
            height: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }

          .read_more a {
            background: #eb3d3c 0% 0% no-repeat padding-box;
            border-radius: 23px;
            width: 112px;
            height: 30px;
            display: inline-block;
            text-align: center;
            line-height: 33px;
            text-decoration: none;
            letter-spacing: -0.3px;
            color: #ffffff;
            font-size: 14px;
            position: relative;
            z-index: 1;
          }

          .read_more a:hover {
            color: #fff;
          }

          .read_more {
            width: 100%;
            text-align: center;
            position: relative;
            margin-top: 20px;
          }

          .read_more:after {
            content: "";
            position: absolute;
            border: 1px solid #dddddd;
            top: 19px;
            width: 100%;
            left: 0;
          }

          .read_more:before {
            content: "";
            position: absolute;
            background: #eb3d3c;
            top: 19px;
            width: 110px;
            left: 0;
            height: 3px;
            z-index: 1;
          }

          .share_icon {
            position: absolute;
            right: 0;
            top: 0;
            background: #fff;
            height: 100%;
            width: 25px;
            text-align: center;
          }

          ul.share_icon_links {
            display: flex;
            background: #f5f5f5 0% 0% no-repeat padding-box;
            box-shadow: 5px 5px 3px #00000029;
            border-radius: 0px 20px 20px 0px;
            width: 217px;
            position: absolute;
            height: 43px;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            box-sizing: border-box;
            transform: translateY(-50%);
            top: 50%;
            display: none;
          }

          ul.share_icon_links li {
            width: 30px;
            height: 30px;
            background: red;
            border-radius: 100px;
            margin: 0 15px;
            display: inline-block;
            margin-top: 8px;
          }

          ul.share_icon_links li img {
            width: auto;
            height: 16px;
            margin: auto;
            margin-top: 5px;
            border-radius: 0;
            position: relative;
            left: 0;
            top: 2px;
          }

          .share_icon i {
            width: 30px;
            height: 30px;
            border: 2px #000 solid;
            position: absolute;
            left: -20px;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 100px;
            z-index: 1;
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/share_icon_1591679615.png)
              #fff;
            background-repeat: no-repeat;
            background-position: center;
            box-sizing: border-box;
          }

          .podcast-listing_row {
            width: 100%;
            margin-bottom: 40px;
            position: relative;
          }

          .podcast-listing_row .share_this {
            top: inherit;
            bottom: 31px;
          }

          .share_this img:hover {
            opacity: 0.8;
          }

          .podcast-listing_title a:hover {
            color: #eb3d3c;
          }

          .podcast-listing_wrapper {
            display: flex;
            width: 100%;
          }

          .pht_lists {
            padding-bottom: 20px;
            margin-top: 20px;
          }

          .pht_lists h2 {
            color: #eb3d3c;
            font-size: 24px;
            line-height: 36px;
            font-family: "Khand", sans-serif;
            font-weight: 500;
          }

          .pht_lists .main_pht {
            width: 100%;
            margin: 0px auto 5px;
          }

          .pht_lists .main_pht figure {
            border-radius: 10px;
            width: 100%;
          }

          .pht_lists .main_pht figure img {
            width: 100%;
            border-radius: 10px;
            display: block;
          }

          .all-news {
            border-bottom: 1px solid #ccc;
          }

          .all-news li {
            border-bottom: 1px dotted #ccc;
            padding: 10px 0px 15px;
            box-sizing: border-box;
          }

          .all-news li a {
            justify-content: space-between;
          }

          .all-news li a figure {
            width: 100px;
            flex-shrink: 0;
            border-radius: 5px;
          }

          .all-news li a figure img {
            display: inline-block;
            width: 100%;
            border-radius: 10px;
          }

          .all-news li a .statements {
            width: calc(100% - 110px);
            max-height: 66px;
            overflow: hidden;
          }

          .all-news li a .statements p {
            font-size: 14px;
            line-height: 22px;
            font-family: "Noto Sans", devanagari;
            font-weight: 400;
            color: #333333;
          }

          .pht_lists .main_pht figure span {
            color: #fff;
            padding: 10px;
            border-radius: 0px 0px 10px 10px;
            width: 95%;
            margin: auto;
            background-color: rgba(0, 0, 0, 0.8);
            font-size: 14px;
            line-height: 21px;
            font-family: "Noto Sans", devanagari;
            font-weight: 400;
            margin-top: -2px;
            box-sizing: border-box;
            display: block;
          }

          .read_more_links {
            display: block;
            font-size: 14px;
            line-height: 19px;
            font-family: "Noto Sans", devanagari;
            font-weight: 700;
            color: #eb3d3c;
            margin: 10px auto;
            width: 130px;
            position: relative;
            text-align: center;
            cursor: pointer;
          }

          .read_more_links .arrows {
            position: absolute;
            top: 10px;
            right: 15px;
            width: 12px;
            height: 1px;
            background-color: #eb3d3c;
          }

          .read_more_links .arrows:before,
          .read_more_links .arrows:after {
            content: "";
            position: absolute;
            width: 7px;
            height: 1px;
            top: -2px;
            right: -1px;
            background-color: #eb3d3c;
            transform: rotate(45deg);
          }

          .read_more_links .arrows:after {
            top: 2px;
            transform: rotate(-45deg);
          }

          .podcast-listing_top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 20px 0 40px;
          }

          ul.pagination {
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }

          ul.pagination li {
            background: #f5f5f5 0% 0% no-repeat padding-box;
            border: 1px solid #dddddd;
            width: 40px;
            height: 40px;
            display: flex;
            font-family: "Noto Sans", sans-serif;
            align-items: center;
            justify-content: center;
          }

          ul.pagination li a {
            letter-spacing: 0px;
            color: #222222;
            font-size: 14px;
            font-weight: 500;
          }

          ul.pagination li.active {
            background: #222222;
            border: 0;
          }

          ul.pagination li.active a {
            color: #fff;
          }

          ul.podcast-tabs {
            display: flex;
          }

          ul.podcast-tabs li {
            background: #ffffff 0% 0% no-repeat padding-box;
            border: 2px solid #666666;
            width: 152px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            border-radius: 10px;
            margin-right: 20px;
          }

          ul.podcast-tabs li a {
            display: block;
            letter-spacing: -0.4px;
            color: #666666;
            font-family: "Khand", sans-serif;
            font-size: 20px;
          }

          ul.podcast-tabs li.active {
            background: #da4432 0% 0% no-repeat padding-box;
            box-shadow: 3px 3px 0px #00000029;
            border-color: #da4432;
            position: relative;
          }

          ul.podcast-tabs li.active a {
            color: #fff;
          }

          ul.podcast-tabs li.active:after {
            content: "";
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-left: 10px solid #da4432;
            display: block;
            position: absolute;
            right: 0;
            left: 0;
            bottom: -17px;
            margin: auto;
            text-align: center;
            width: 0px;
            transform: rotate(88deg);
          }

          ul.podcast-tabs li.active:before {
            content: "";
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid #00000029;
            display: block;
            position: absolute;
            right: -11px;
            bottom: -20px;
            left: 0;
            margin: auto;
            width: 0;
            transform: rotate(265deg);
          }

          .consumption_title {
            letter-spacing: -0.64px;
            color: #222222;
            font-size: 28px;
            line-height: 44px;
            font-weight: bold;
            padding: 0px;
            min-height: 70px;
          }

          .podcast-consumption .consumption_title {
            min-height: auto;
          }

          .podcast-consumption ul.time_location {
            padding-bottom: 10px;
          }

          .podcast-consumption {
            width: 100%;
            font-family: "Noto Sans", sans-serif;
            margin-bottom: 30px;
          }

          .podcast-consumption-content {
            letter-spacing: -0.36px;
            color: #666666;
            font-size: 16px;
            line-height: 32px;
          }

          .podcast-consumption:first-child {
            padding-top: 0;
            border: 0;
            margin-bottom: 15px;
          }

          .podcast-consumption-content .special-text {
            font-size: 16px;
            margin: 20px 40px 20px 100px !important;
            padding: 10px 10px 10px 13px !important;
          }

          .podcast-consumption-content > p {
            padding-bottom: 20px;
          }

          .podcast-consumption-content h3 {
            font-size: 28px;
            letter-spacing: -0.56px;
            color: #333333;
            line-height: 36px;
            font-weight: 600;
            font-family: "Khand", sans-serif;
            padding-left: 25px;
          }

          .podcast-consumption-content img {
            width: auto;
            margin: auto;
            max-width: 100%;
            padding: 20px 0;
            box-sizing: border-box;
          }

          .consumption-tag {
            display: flex;
            align-items: center;
            padding: 20px 0;
            margin: 20px 0;
            border-top: 1px solid rgba(183, 180, 180, 0.5);
            position: relative;
            border-bottom: 1px solid rgba(183, 180, 180, 0.5);
          }

          .consumption-tag:after {
            content: "";
            position: absolute;
            border-top: 3px solid #eb3d3c;
            width: 129px;
            bottom: -2px;
          }

          .consumption-tag > p {
            letter-spacing: 0px;
            color: #999999;
            font-size: 20px;
            padding-right: 20px;
          }

          .consumption-tag ul {
            display: flex;
            align-items: center;
            margin: 0;
          }

          .consumption-tag ul li a {
            border: 1px solid #999999;
            border-radius: 23px;
            display: inline-block;
            padding: 0 30px;
            letter-spacing: -0.32px;
            color: #666666;
            font-size: 14px;
            margin-right: 20px;
            height: 30px;
            line-height: 30px;
          }

          .consumption-tag ul li a:hover {
            background: #eb3d3c;
            color: #fff;
            border-color: #eb3d3c;
          }

          .podcast_page {
            width: 100%;
            padding-bottom: 50px;
          }

          ul.share_icon_links.show {
            /* display: flex !important; */
          }

          ul.share_icon_links li:nth-child(1) {
            background: #3c5a99;
          }

          ul.share_icon_links li:nth-child(2) {
            background: #55acee;
          }

          ul.share_icon_links li:nth-child(3) {
            background: #43c654;
          }

          .share_icon.open i {
            border-color: #eb3d3c;
            background: url(share-white.png) #eb3d3c;
            background-repeat: no-repeat;
            background-position: center;
          }

          .podcast-consumption-content li {
            counter-increment: my-awesome-counter;
            position: relative;
          }

          .podcast-consumption-content li:after {
            left: 0;
            top: 0;
            content: counter(my-awesome-counter);
            font-size: 34px;
            position: absolute;
            letter-spacing: -0.68px;
            color: #eb3d3c;
            line-height: 32px;
          }

          .podcast-consumption-img img {
            width: 100%;
          }

          .podcast-consumption-img {
            width: 100%;
            margin-bottom: 20px;
            position: relative;
          }

          .podcast-consumption-img iframe {
            width: 100% !important;
            max-width: 100% !important;
            height: 200px;
            border-radius: 10px;
          }

          ul.consumption-share {
            position: absolute;
            bottom: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 100%;
          }

          ul.consumption-share img {
            border-radius: 0;
            width: auto;
          }

          ul.consumption-share li:nth-child(1) {
            background: #3c5a99;
          }

          ul.consumption-share li:nth-child(2) {
            background: #55acee;
          }

          ul.consumption-share li:nth-child(3) {
            background: #43c654;
          }

          ul.consumption-share li {
            width: 56px;
            height: 56px;
            border-radius: 100px;
            margin: 0 22px;
          }

          ul.consumption-share li a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
          }

          .share_this {
            display: flex;
            align-items: center;
            position: absolute;
            top: -30px;
            right: 0;
            border-bottom: 1px rgba(0, 0, 0, 0.22) solid;
            padding-bottom: 4px;
          }

          .podcast-consumption .share_this {
            bottom: -15px;
            top: initial;
            border: 0;
          }

          .share_this ul {
            display: flex;
            align-items: center;
          }

          .title_andshare {
            position: relative;
          }

          .share_this p {
            color: #222222;
            font-size: 16px;
            font-family: "Khand", sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            position: relative;
            top: 3px;
            padding-right: 20px;
          }

          .share_this ul li {
            padding: 0 8px;
          }

          .podcast-listing_row .share_this:after {
            opacity: 0;
          }
          .podcast-listing_row .share_this {
            top: inherit;
            bottom: 31px;
            border: 0;
          }

          ul {
          }

          .share_this img {
            border-radius: 0;
            width: auto;
          }

          .share_this:after {
            content: "";
            position: absolute;
            left: 0;
            background: #eb3d3c;
            width: 43px;
            height: 3px;
            top: 23px;
          }

          .share_this p:after {
            content: "";
            width: 8px;
            height: 8px;
            position: absolute;
            top: 1px;
            right: 8px;
            border-bottom: 1px solid #222222;
            border-right: 1px solid #222222;
            transform: rotate(-45deg);
          }

          .for_pwa {
            display: none !important;
          }

          .subscribe_mobile {
            display: none;
          }

          @media only screen and (max-width: 700px) {
            .podcast_page_section {
              display: block;
              width: 100%;
            }
            .podcast_section_left {
              width: 100%;
              padding: 0;
            }
            .podcast_section_right {
              width: 100%;
            }
            .podcast_box {
              width: 100%;
              margin-bottom: 8px;
            }
            .podcast_topbar {
            }
            .podcast_section_left .podcast_box {
              width: 100%;
              padding: 0;
            }
            .podcast_topbar_right {
            }
            .podcast_container {
              width: 100%;
              margin-bottom: 15px;
            }
            .latest_podcast .podcast_container {
              display: block;
            }
            .latest_podcast_row {
              margin: 0;
            }
            .latest_podcast_left {
              width: 180px;
            }
            .latest_podcast_right {
              width: calc(100% - 180px);
              padding-right: 10px;
              padding-left: 18px;
              left: 0;
              margin-left: -13px;
              height: auto;
            }
            .latest_podcast_left img {
              object-fit: fill !important;
            }

            .latest_podcast_row {
              justify-content: center;
            }

            .latest_podcast_slider .slick-track .latest_podcast_row {
              margin: 0 !important;
            }

            .latest_podcast {
              height: auto;
              margin: 0;
              padding: 60px 0 10px;
              margin-top: 0;
              margin-bottom: 20px;
            }
            ul.time_location {
              display: block;
              padding: 0;
              font-size: 11px;
              font-weight: normal;
              padding-top: 7px;
            }
            ul.time_location li {
              padding-bottom: 5px;
            }
            .podcast_section_left .podcast_box:nth-child(1) h2 {
              font-size: 20px;
              line-height: 27px;
              font-weight: bold;
              height: auto;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
            .podcast_section_left .podcast_box:nth-child(1) {
              margin-bottom: 15px;
            }
            .podcast_title {
              font-size: 22px;
              width: 45%;
            }
            .latest_podcast_title {
              font-size: 22px;
              width: 150px;
            }
            .podcast-listing_wrapper {
              display: block;
            }
            .podcast-listing_left {
              width: 100%;
              padding: 0;
              display: flex;
              flex-wrap: wrap;
            }
            .podcast-listing_content {
            }
            .podcast_content_left {
              width: 100%;
              padding-right: 10px;
            }
            .podcast_content_right {
              width: 100%;
              padding-left: 5px;
              padding-top: 10px;
            }
            .podcast-listing_top {
              flex-wrap: wrap-reverse;
              margin: auto;
              margin-bottom: 15px;
              justify-content: center;
            }
            ul.pagination {
              justify-content: center;
              margin: auto;
              margin-bottom: 20px;
            }
            ul.podcast-tabs {
              margin: auto;
              margin-bottom: 10px;
            }
            ul.podcast-tabs li {
              margin-bottom: 10px;
            }
            i.play-icon {
            }
            .share_icon {
              width: 40px;
              height: 40px;
              bottom: 0;
              top: 50%;
              right: -7px;
              margin: auto;
              padding: 10px 0;
              background: transparent;
              transform: translateY(-50%);
            }
            .share_icon i {
              margin: auto;
              display: block;
              left: initial;
              right: 10px;
              width: 22px;
              height: 22px;
              background-size: 9px;
            }
            .podcast-listing_title {
              font-size: 16px;
              line-height: 26px;
              padding-top: 5px;
              font-weight: bold;
            }
            .read_more {
              margin-top: 20px;
            }
            .read_more a {
              font-size: 13px;
              height: 30px;
              line-height: 30px;
              margin-top: 4px;
              width: 91px;
            }
            .podcast-listing_row {
              margin-bottom: 30px;
            }
            ul.podcast-tabs li {
              width: 89px;
              height: 40px;
              line-height: 40px;
              margin: 0 5px;
            }
            ul.podcast-tabs li a {
              font-size: 17px;
            }
            ul.share_icon_links {
              right: 0;
              border-radius: 20px 0 0 20px;
              width: 90%;
              bottom: -21px;
              top: initial;
              box-shadow: none;
            }
            .consumption_title {
              font-size: 24px;
              line-height: 34px;
            }
            .podcast-consumption-content {
              font-size: 14px;
              line-height: 28px;
            }
            .podcast-consumption-content h3 {
              font-size: 20px;
              padding-left: 19px;
            }
            .podcast-consumption-content li:after {
              font-size: 25px;
            }
            .consumption-tag {
              display: block;
              padding: 15px 0 0;
              margin: 0;
              margin-top: 10px;
            }
            .consumption-tag ul {
              flex-wrap: wrap;
              justify-content: start;
            }
            .consumption-tag > p {
              display: block;
              padding-bottom: 13px;
              font-size: 15px;
            }
            .consumption-tag ul li a {
              width: 100%;
              height: 30px;
              line-height: 26px;
              font-size: 12px;
            }
            .consumption-tag ul li {
              margin-bottom: 10px;
              margin-right: 10px;
            }
            .podcast-consumption-img {
              margin-bottom: 0;
            }
            ul.consumption-share {
              position: relative;
              display: none;
            }
            ul.consumption-share li {
              width: 40px;
              height: 40px;
              margin: 0 10px;
            }
            ul.consumption-share li a {
              width: 40px;
              height: 40px;
            }
            .podcast-consumption-img:after {
              height: 62px;
              background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_3_1591698372.png);
              background-size: cover;
              background-position: center;
              bottom: -9px;
            }
            .podcast_section_left .podcast_box:nth-child(1) figcaption:after {
              width: 40px;
              height: 40px;
              bottom: 115px;
            }
            .podcast_section_left .podcast_box:nth-child(1) figcaption:before {
              background-size: cover;
              background-position: center;
            }
            .podcast-listing_right {
              width: 100%;
            }
            .add {
              margin: auto;
              display: block;
              text-align: center;
              width: 100%;
            }
            ul.pagination {
            }
            ul.pagination.for_pwa {
              display: flex !important;
            }
            .subscribe_mobile {
              position: fixed;
              top: 50%;
              border-radius: 10px;
              background-color: rgb(255, 255, 255);
              box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.45);
              right: -7px;
              border: 1px rgb(191, 191, 191) solid;
              box-sizing: border-box;
              transform: translateY(-50%);
              display: none;
              z-index: 9;
            }
            .subscribe_mobile p {
              color: #ed1c24;
              font-size: 12px;
              text-align: center;
              text-transform: uppercase;
              font-family: "Noto Sans", sans-serif;
              font-weight: bold;
              padding: 10px;
              border-bottom: 1px #e5e5e5 solid;
              margin-bottom: 10px;
            }
            .subscribe_mobile ul li {
              padding: 2px 6px;
            }
            .podcast_section_left .podcast_box:nth-child(1) ul.time_location {
              font-size: 12px;
              font-weight: bold;
            }

            .podcast_box figure {
              display: flex;
              align-items: end;
              position: relative;
            }

            .podcast_box figure img {
              width: 100%;
              height: 95px;
              object-fit: cover;
            }

            ul.time_location li:nth-child(2) {
              display: none;
            }

            .podcast_box figcaption {
              margin: 0;
              align-items: end;
              width: 100%;
            }

            .podcast_box figcaption:before {
              display: none;
            }

            .podcast_box figcaption:after {
              display: none;
            }

            .podcast_box figcaption h2 {
              font-size: 14px;
              line-height: 20px;
              font-weight: 500;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }

            .podcast_box_figure:after {
              content: "";
              position: absolute;
              width: 20px;
              height: 20px;
              margin: auto;
              left: 0;
              border-radius: 100px;
              background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/podcast_icon_1591679506.png)
                #eb3d3c;
              background-size: 8px;
              background-repeat: no-repeat;
              background-position: center;
              z-index: 2;
              right: 7px;
              bottom: 8px;
            }

            .podcast_box_figure:before {
              background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_pwa_1591798318.png);
              width: 100%;
              content: "";
              position: absolute;
              bottom: -1px;
              height: 17px;
              left: 0;
              margin: auto;
              background-size: cover;
              background-position: center;
            }

            .podcast_box_figure {
              width: 100%;
              position: relative;
              padding-right: 10px;
            }

            .podcast_section_left .podcast_box:nth-child(1) figure {
              display: block;
            }

            .podcast_section_left
              .podcast_box:nth-child(1)
              .podcast_box_figure {
              padding: 0;
            }

            .podcast_section_left .podcast_box:nth-child(1) img {
              height: auto;
            }

            .latest_podcast_right h2 {
              font-size: 14px;
              height: 54px;
              overflow: hidden;
              line-height: 25px;
            }

            .latest_podcast_right ul.time_location {
              padding-bottom: 0;
            }

            .latest_podcast_right:after {
              width: 20px;
              height: 20px;
              background-size: 8px;
              left: -12px;
              top: 52%;
            }

            .podcast_topbar_right ul {
              position: absolute;
              top: 21px;
              display: none;
              z-index: 9;
              background: #f7f7f7 0% 0% no-repeat padding-box;
              box-shadow: -5px 1px 0px #0000001a;
              right: 0px;
              padding: 15px;
              box-sizing: border-box;
            }

            .podcast_topbar_right ul li {
              padding: 0;
              padding-bottom: 10px;
            }

            p.subscribe_to {
              margin: 0;
              font-size: 12px;
              padding-bottom: 7px;
              padding-right: 15px;
            }

            p.subscribe_to:after {
              border-bottom: 2px solid #222222;
              border-top: 0;
              top: -1px;
              right: 0px;
              width: 6px;
              height: 6px;
              border-left: 2px solid #222222;
              border-right: 0;
            }

            .podcast_topbar_right:after {
              top: 20px;
              width: 60px;
            }

            .podcast_section_left .podcast_box:nth-child(1):before {
            }

            .podcast_section_left
              .podcast_box:nth-child(1)
              .podcast_box_figure:before {
              background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_3_1591698372.png);
              background-size: cover;
              background-position: center;
              height: 62px;
              bottom: -45px;
            }

            .podcast_section_left
              .podcast_box:nth-child(1)
              .podcast_box_figure:after {
              width: 38px;
              height: 38px;
              background-size: 12px;
              left: 4px;
              bottom: 7px;
            }

            p.podcast-listing_intro {
              display: none;
            }

            .read_more:before {
              width: 80px;
            }

            .podcast_page.podcast-consumption-page .podcast_container {
              padding: 0;
            }

            .podcast_page.podcast-consumption-page
              .podcast_container
              .podcast-consumption-img
              > img {
              border-radius: 0;
              height: 200px;
              object-fit: cover;
            }

            .podcast_page.podcast-consumption-page
              .podcast_container
              ul.time_location {
              padding: 0 10px;
            }

            .podcast_page.podcast-consumption-page
              .podcast_container
              .consumption_title {
              padding: 0 10px 50px;
            }

            .podcast_page.podcast-consumption-page
              .podcast_container
              .podcast_breadcrumbs {
              padding-left: 10px;
            }

            .podcast_page.podcast-consumption-page
              .podcast_container
              .podcast-consumption-content {
              padding: 0 15px;
            }

            .share_this {
              top: inherit;
              bottom: 10px;
              left: 14px;
              width: 155px;
            }

            .podcast-consumption-content .special-text {
              padding: 10px !important;
              margin: 15px !important;
            }import { getConfig } from 'next/config';
import { getConfig } from 'next/config';
import { is } from '../../../.next/static/chunks/pages/home';


            .share_this {
              position: relative;
              left: 0;
              margin: 10px 0;
            }

            .podcast-listing_row .share_this {
              top: inherit;
              bottom: 31px;
              position: static;
              padding-left: 5px;
            }

            .podcast-consumption-img iframe {
              height: 250px;
              margin-bottom: 10px;
              border-radius: 0;
            }

            .podcast_container:nth-child(2) .podcast_breadcrumbs {
              padding: 8px 0;
            }

            .podcast-consumption .share_this {
              bottom: 0;
              top: initial;
              border: 0;
              margin-top: 0;
            }

            .latest_podcast_slider .slick-list.draggable {
              overflow: hidden;
            }
          }

          div#outbrain_widget_1 {
            max-width: 1240px;
            margin: auto;
          }

          .top_addspace {
            padding-top: 90px;
          }
          .load_more {
            width: 130px;
            height: 38px;
            background: #ed1c24;
            -webkit-border-radius: 19px;
            -moz-border-radius: 19px;
            border-radius: 19px;
            font-size: 17px;
            color: #fff;
            line-height: 38px;
            border: none;
            display: table;
            margin: auto;
            cursor: pointer;
        }
        `}
      </style>
    </>
  );
};

export default PodcastCategories;
