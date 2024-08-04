import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
// import LazyLoad from "react-lazyload";
import { setDefaultImage } from "includes/article.util";
import RhsBudget from "widgets/Common/Desktop/RhsBudget";
import BudgetGraphics from "components/Desktop/budget/home/BudgetGraphics";
import SITE_CONfIG from "config/site.config";
import LazyLoadImage from "components/Common/CustomImage";

const HomeLiveTv = dynamic(() => import("components/Mobile/home/HomeLiveTv"));

const BudgetNewsDesktop = ({
  isAmp = false,
  isMobile = false,
  eventSwitches = {},
  homeBudgetNews = {},
  // sponsors = {},
  pageAds = {},
  graphics = [],
  isBudgetPage = false,
  isFromHomePage = false,
  budgetYear,
  glossarySponsor = {},
}) => {
  const { budget_live_tv_onoff = 0 } = eventSwitches;

  const {
    budgetBreakingNews: {
      breaking: {
        main_heading: mainHeading = "",
        url: mainHeadingUrl = "",
        data: breakingNewsData = [],
        status: breakingStatus = 0,
      } = {},
    } = {},
    budgetGlossary: { data: budgetGlossaryData = [] } = {},
    budgetTopPriority = [],
    budgetGraphicData: { graphic = {} } = {},
  } = homeBudgetNews;
  const graph_data = [];
  const isShowGraphic = Boolean(graph_data.length);
  const isLiveTvOn = Boolean(budget_live_tv_onoff);

  const leftSectionNews = !isLiveTvOn
    ? budgetTopPriority[0]?.article_details || {}
    : false;
  const bottomSectionNews =
    leftSectionNews && !isShowGraphic
      ? budgetTopPriority[1]?.article_details || {}
      : budgetTopPriority[0]?.article_details;

  return (
    <>
      <Head>
        <link
          href={
            "https://images.news18.com/ibnkhabar/uploads/assets/event/common/css/budget_landing_home_desktop_full_1611573895.css"
          }
          rel="stylesheet"
        ></link>
      </Head>
      <div className="budget">
        <div className="budget_container">
          <div className="budget_page">
            <div className="budget_page_left">
              <div className="landing_page_content">
                <div className="landing_tilte">
                  {breakingStatus != "0" ? (
                    <>
                      <h2 className="landing_heading">
                        <span>India Budget {budgetYear}</span>
                      </h2>
                      <p className="landing_subheading">
                        <a href={mainHeadingUrl || ""}>{mainHeading || ""}</a>
                      </p>
                    </>
                  ) : null}
                  {breakingNewsData &&
                  breakingNewsData.length &&
                  breakingStatus != "0" ? (
                    <>
                      <ul className="landing_list">
                        {breakingNewsData.map((eachData, index) => {
                          return (
                            eachData?.heading && (
                              <li key={"breakingNewsData" + index}>
                                <a href={eachData.story_url || ""}>
                                  <span>{index + 1}</span>
                                  {eachData.heading || ""}
                                </a>
                              </li>
                            )
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="live_budget">
                  <div className="live_budget_left">
                    {budgetTopPriority &&
                    budgetTopPriority.length &&
                    !budget_live_tv_onoff ? (
                      <div className="full_coverage_top">
                        <a href={leftSectionNews.weburl_r}>
                          <figure>
                            <LazyLoadImage
                              src={
                                leftSectionNews?.images?.url ||
                                SITE_CONfIG.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                              }
                              alt={leftSectionNews?.display_headline}
                              title={leftSectionNews?.display_headline}
                              width={420}
                              height={280}
                            />
                            <h2 className="coverage_title">
                              {leftSectionNews?.display_headline}
                            </h2>
                          </figure>
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                    {budget_live_tv_onoff &&
                    (budget_live_tv_onoff === "1" ||
                      budget_live_tv_onoff === 1) ? (
                      <>
                        <HomeLiveTv
                          props={{
                            topHomeNews: { skinning: 1, isNotTop: true },
                            posterImage:
                              "https://images.news18.com/ibnkhabar/uploads/2023/02/budget.png",
                          }}
                          bottomAdSlot={
                            "NW18_HIND_Desktop/NW18_HIND_BUDGET/NW18_HIND_BUDGET_HOME/NW18_HIND_BDGT_HP_LIVTV_BTM_400x80"
                          }
                          width={400}
                          height={80}
                        />
                      </>
                    ) : (
                      ""
                    )}
                    {graphic?.disply_checkbox &&
                    (graphic?.disply_checkbox == 1 ||
                      graphic?.disply_checkbox == "1") ? (
                      <div className="union_budget_img">
                        <figure>
                          <a href={graphic?.story_url || ""} target="_blank">
                            <LazyLoadImage
                              src={(graphic?.image_path || "").split("type")[0]}
                              onError={setDefaultImage}
                              height={277}
                              width={420}
                              alt={graphic?.title || ""}
                              title={graphic?.title || ""}
                            />
                            <h3 className="union_budget_title">
                              {graphic?.title || ""}
                            </h3>
                          </a>
                        </figure>
                        <a href="/budget/" className="union_budget_link">
                          बजट {budgetYear}
                        </a>
                      </div>
                    ) : (
                      <>
                        <ul className="bdgtnewtw">
                          {graph_data && graph_data.length ? (
                            graph_data.map((eachData, index) => {
                              return (
                                <li key={"budget-graphic" + index}>
                                  <a href={eachData?.weburl_r || ""}>
                                    {/* <i>
                                      <img src={eachData?.icon_path} />
                                    </i> */}
                                    <div className="bdgtnewtw_img">
                                      <img
                                        src={eachData?.icon_path || ""}
                                        height={130}
                                        width={160}
                                        alt={eachData?.text_part2}
                                        title={eachData?.text_part2}
                                      />
                                    </div>
                                    <h3 className="news__title">
                                      {eachData?.text_part1}
                                    </h3>
                                    {/* <span>{eachData?.text_part2}</span> */}
                                  </a>
                                </li>
                              );
                            })
                          ) : (
                            <div className="union_budget_img">
                              <figure>
                                <a
                                  href={bottomSectionNews?.weburl_r || ""}
                                  target="_blank"
                                >
                                  <LazyLoadImage
                                    src={bottomSectionNews?.images?.url || ""}
                                    height={277}
                                    width={420}
                                    alt={bottomSectionNews?.display_headline}
                                    title={bottomSectionNews?.display_headline}
                                  />
                                  <h3 className="union_budget_title">
                                    {bottomSectionNews?.display_headline}
                                  </h3>
                                </a>
                              </figure>
                            </div>
                          )}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="live_budget_right">
                    {budgetTopPriority && budgetTopPriority.length > 1 ? (
                      <>
                        <ul className="budget_news">
                          {(!budget_live_tv_onoff && !isShowGraphic
                            ? budgetTopPriority.slice(2, 8)
                            : budget_live_tv_onoff || isShowGraphic
                            ? budgetTopPriority.slice(1, 8)
                            : budgetTopPriority.slice(0, 8)
                          ).map((news, index) => {
                            const { article_details = {} } = news || {};
                            const newsArticleTitle =
                              article_details?.display_headline;
                            return (
                              <>
                                {article_details ? (
                                  <li key={"budgetRightNews" + index}>
                                    <figure>
                                      <a href={article_details.weburl_r}>
                                        <div className="budget_news_img">
                                          <LazyLoadImage
                                            src={
                                              article_details?.images?.url || ""
                                            }
                                            alt={newsArticleTitle}
                                            title={newsArticleTitle}
                                            className="lazy"
                                            width={index === 0 ? 160 : 110}
                                            height={index === 0 ? 130 : 50}
                                          />
                                        </div>
                                        <h3 className="news__title">
                                          {newsArticleTitle}
                                        </h3>
                                      </a>
                                    </figure>
                                  </li>
                                ) : null}
                              </>
                            );
                          })}
                        </ul>
                        <div className="more_story">
                          <a href="/tag/budget-session/">
                            <span>बजट न्यूज़</span> [+]
                          </a>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* {isBudgetPage && (
                  <>
                    <div className="clearfix vsp20"></div>
                    <BudgetGraphics
                      graphics={graphics}
                      budgetYear={budgetYear}
                    />
                    <div className="clearfix vsp20"></div>
                  </>
                )} */}
              </div>
            </div>
            {/* <RhsBudget
              glossary={budgetGlossaryData}
              pageAds={pageAds}
              isFromHomePage={isFromHomePage}
              sponsor={glossarySponsor}
            /> */}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .budget {
          margin-bottom: 20px;
        }
        .budget_page_left {
          width: 100%;
        }
        .full_coverage_top {
          min-height: 420px;
        }
        .union_budget_img {
          height: 303px;
        }
        body .budget {
          font-family:
            "Noto Serif",
            "Droid Serif",
            sans-serif ${!isAmp ? "!important" : ""};
        }
        .budget .landing_list {
          padding: 0 ${!isAmp ? "!important" : ""};
          width: ${isAmp ? "400%" : ""};
          overflow: ${isAmp ? "visible" : ""};
        }

        .landing_list li {
          ${isMobile ? "padding: 0 10px;" : ""}
          ${isAmp ? "width: 100%;" : ""}
        }

        .landing_list li a {
          padding-bottom: 14px;
          ${isMobile ? "border-bottom: 1px solid rgba(0,0,0,0.2);" : ""}
        }

        .budget .livetv-play {
          height: 215px;
        }
        .bdgtnewtw {
          padding-top: 30px;
        }
        .budget .live_budget_left .livetv-chanel-list li {
          border-top: none;
          background: transparent;
        }

        .union_budget_img {
          margin-top: 0;
        }

        .live_budget_left div:first-child {
          marging-bottom: 15px;
        }

        .budgetPartnerWrapRhs {
          display: flex;
          align-items: center;
        }

        .budgetPartnerWrapRhs .heading {
          color: white;
          font-style: normal;
          font-size: 10px;
        }

        .budget_news_img {
          height: 65px;
        }
        .news__title {
          width: calc(100% - 100px);
          padding: 10px 20px;
          font-size: 14px;
          padding-top: 10px;
          font-weight: bold;
        }

        .budget_news li:first-child img {
          ${!isMobile ? "height: 120px;" : ""}
        }

        ul.budget_link_row {
          margin-bottom: 20px;
        }
        ul.budget_link_row li {
          height: 50px;
          display: flex;
          align-items: center;
          background: #fff;
          padding: 0 10px;
          font-size: 16px;
          border-top: 1px dashed #c4c4c4;
        }
        ul.budget_link_row li a {
          font-weight: bold;
          text-decoration: none;
          color: #010101;
          display: flex;
          align-items: center;
        }
        ul.budget_link_row li i {
          padding-right: 15px;
          width: 40px;
        }
        ul.budget_link_row li span {
          color: #008595;
          padding-left: 5px;
          display: block;
        }
        a.glossary_more {
          margin-top: 15px;
        }

        ul.bdgtnewtw {
          list-style: none;
        }
        ul.bdgtnewtw li {
          margin-bottom: 15px;
          background: #f4f4f2 !important;
          border-bottom: 2px#e3e3e2 solid !important;
          height: fit-content;
          padding: 0;
          border-top: unset;
        }
        ul.bdgtnewtw li figure {
          line-height: inherit;
        }
        ul.bdgtnewtw li a {
          display: flex;
          color: #001d42;
          text-decoration: none;
          align-items: normal;
        }
        ul.bdgtnewtw li .bdgtnewtw_img {
          width: 180px;
          height: 120px;
        }
        .bdgtnewtw li img {
          ${!isMobile ? "height: 120px;" : ""}
        }
      `}</style>
    </>
  );
};

export default BudgetNewsDesktop;
