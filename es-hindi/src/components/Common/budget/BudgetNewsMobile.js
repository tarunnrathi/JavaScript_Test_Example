import dynamic from "next/dynamic";
import React, { useEffect } from "react";
// import LazyLoad from "react-lazyload";
// import { imageLoader, setDefaultImage } from "includes/article.util";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import Glide from "@glidejs/glide";
import SITE_CONfIG from "config/site.config";
import LazyLoadImage from "../CustomImage";

const HomeLiveTv = dynamic(() => import("components/Mobile/home/HomeLiveTv"));
const BudgetGlossaryWidget = dynamic(() => import("./BudgetGlossaryWidget"));
const BudgetGraphicsMobile = dynamic(() =>
  import("components/Mobile/budget/home/BudgetGraphicsMobile")
);

const BudgetNewsMobile = ({
  isAmp = false,
  isMobile = false,
  eventSwitches = {},
  homeBudgetNews = {},
  // sponsors = {},
  // pageAds = {},
  graphics = [],
  isBudgetPage = false,
  budgetYear,
  glossarySponsor = {},
  adTwo,
}) => {
  const { budget_live_tv_onoff = 0, highlights_sponser_home_flag } =
    eventSwitches;
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
  const leftSectionNews = budgetTopPriority[0]?.article_details || {};

  useEffect(() => {
    if (isMobile && document.querySelector(".glide")) {
      new Glide(".glide", {
        perView: 1,
        gap: 0,
        slidesToShow: 1,
      }).mount();
    }
  }, []);

  const headlineStories =
    breakingNewsData && breakingNewsData.filter((el) => el?.heading !== "");

  return (
    <>
      <div className="budget">
        <div className="landing_title">
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
          {isAmp ? (
            headlineStories &&
            breakingNewsData &&
            breakingNewsData.length &&
            breakingStatus !== "0" ? (
              <>
                <div className="glide">
                  <div data-glide-el="track" className="glide__track">
                    <ul className="landing_list glide__slides">
                      {headlineStories.map((eachData, index) => {
                        return (
                          <li
                            key={"breakingNewsData" + index}
                            className="glide__slide"
                          >
                            <a href={eachData.story_url || ""}>
                              {eachData.heading}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              ""
            )
          ) : headlineStories &&
            breakingNewsData &&
            breakingNewsData.length &&
            breakingStatus != "0" ? (
            <>
              <div className="glide">
                <div data-glide-el="track" className="glide__track">
                  <ul className="landing_list glide__slides">
                    {headlineStories.map((eachData, index) => {
                      return (
                        <li
                          key={"breakingNewsData" + index}
                          className="glide__slide"
                        >
                          <a href={eachData.story_url || ""}>
                            {eachData.heading}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="glide__bullets" data-glide-el="controls[nav]">
                  {headlineStories.map((e, i) => (
                    <button
                      key={i}
                      className="glide__bullet"
                      data-glide-dir={"=" + i}
                    ></button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        {budget_live_tv_onoff &&
        (budget_live_tv_onoff == "1" || budget_live_tv_onoff == 1) ? (
          <>
            {!isAmp ? (
              <HomeLiveTv
                props={{
                  posterImage: "/images/budget_live_tv.jpg/",
                  topHomeNews: {
                    skinning: highlights_sponser_home_flag === "1" ? 1 : 0,
                    isNotTop: true,
                  },
                }}
                bottomAdSlot={
                  "NW18_HIND_PWA/NW18_HIND_BUDGET_PWA/NW18_HIND_BUDGET_HOME_PWA/NW18_HIND_BDGT_PWA_HP_LIVTV_BTM_360x40"
                }
                width={360}
                height={40}
                isBudget={true}
                isAmp={isAmp}
              />
            ) : (
              <HomeLiveTv
                props={{
                  posterImage: "/images/budget_live_tv.jpg/",
                  isAmp: true,
                  isBudget: true,
                }}
              />
            )}
          </>
        ) : (
          ""
        )}
        {adTwo}
        <div className="budget_container">
          <div className="budget_page">
            <div className="budget_page_left">
              <div className="top_section">
                {budgetTopPriority && budgetTopPriority.length ? (
                  <div className="full_coverage">
                    <div className="full_coverage_top">
                      <a href={leftSectionNews.weburl_r} target="_blank">
                        <figure>
                          <h2 className="coverage_title">
                            {leftSectionNews?.display_headline}
                          </h2>
                          {isAmp ? (
                            <figure>
                              <amp-img
                                width={385}
                                height={265}
                                src={
                                  (leftSectionNews?.images?.url ||
                                    SITE_CONfIG.THUMBNAIL_IMAGE_PLACEHOLDER_PATH) +
                                  `?impolicy=website&width=385&height=265`
                                }
                                alt={leftSectionNews?.display_headline}
                                title={leftSectionNews?.display_headline}
                              ></amp-img>
                            </figure>
                          ) : (
                            <LazyLoadImage
                              src={
                                leftSectionNews?.images?.url ||
                                SITE_CONfIG.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                              }
                              alt={leftSectionNews?.display_headline}
                              title={leftSectionNews?.display_headline}
                              width={385}
                              height={265}
                            />
                          )}
                        </figure>
                      </a>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {budgetTopPriority && budgetTopPriority.length >= 2 ? (
                  <>
                    <div className="right_news">
                      {budgetTopPriority.slice(0).map((news, index) => {
                        const { article_details = {} } = news || {};
                        const newsArticleTitle =
                          article_details?.display_headline;
                        return index > 0 && index < 3 ? (
                          <div className="right_news_row" key={index}>
                            <a
                              href={article_details?.weburl_r || ""}
                              target="_blank"
                            >
                              <figure>
                                <div className="list_img">
                                  {isAmp ? (
                                    <figure>
                                      <amp-img
                                        width={1.5}
                                        height={1}
                                        src={article_details?.images?.url || ""}
                                        alt={newsArticleTitle}
                                        title={newsArticleTitle}
                                        layout="responsive"
                                      ></amp-img>
                                    </figure>
                                  ) : (
                                    <LazyLoadImage
                                      src={article_details?.images?.url || ""}
                                      data-src={
                                        article_details?.images?.url || ""
                                      }
                                      alt={newsArticleTitle}
                                      title={newsArticleTitle}
                                      width={181}
                                      height={124}
                                    />
                                  )}
                                </div>
                                <h2 className="listing_title">
                                  {newsArticleTitle}
                                </h2>
                              </figure>
                            </a>
                          </div>
                        ) : (
                          ""
                        );
                      })}
                    </div>
                  </>
                ) : (
                  ""
                )}
                {budgetTopPriority && budgetTopPriority.length >= 4 ? (
                  <>
                    <div className="listing_news">
                      {budgetTopPriority.map((news, index) => {
                        const { article_details = {} } = news || {};
                        const newsArticleTitle =
                          article_details?.display_headline;
                        return index > 2 && article_details ? (
                          <div className="listing_row" key={index}>
                            <a href={article_details.weburl_r} target="_blank">
                              <h2 className="listing_title">
                                {newsArticleTitle}
                              </h2>
                              {isAmp ? (
                                <figure
                                  style={{ width: "100px", height: "60px" }}
                                >
                                  <amp-img
                                    width="100"
                                    height="60"
                                    src={article_details?.images?.url || ""}
                                    alt={newsArticleTitle}
                                    title={newsArticleTitle}
                                    layout="responsive"
                                    style={{ width: "100%" }}
                                  ></amp-img>
                                </figure>
                              ) : (
                                <figure>
                                  <LazyLoadImage
                                    src={article_details?.images?.url || ""}
                                    data-src={
                                      article_details?.images?.url || ""
                                    }
                                    alt={newsArticleTitle}
                                    title={newsArticleTitle}
                                    className="list_img"
                                    width={100}
                                    height={60}
                                  />
                                </figure>
                              )}
                            </a>
                          </div>
                        ) : (
                          ""
                        );
                      })}
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="more_story">
                  <a href="/tag/budget-session/">बजट न्यूज़ [+]</a>
                </div>
              </div>
              {graphic?.disply_checkbox &&
              (graphic?.disply_checkbox == 1 ||
                graphic?.disply_checkbox == "1") ? (
                <div className="union_budget_img">
                  <figure>
                    <a href={graphic?.story_url || ""} target="_blank">
                      {isAmp ? (
                        <figure>
                          <amp-img
                            width={1.5}
                            height={1}
                            src={
                              (
                                graphic?.image_path ||
                                SITE_CONfIG.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                              ).split("type")[0]
                            }
                            alt={"image"}
                            layout="responsive"
                          ></amp-img>
                        </figure>
                      ) : (
                        <img
                          src={(graphic?.image_path || "").split("type")[0]}
                          height={277}
                          alt={"image"}
                        />
                      )}
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
                  <ul className="budget_link_row">
                    {graph_data && graph_data.length
                      ? graph_data.map((eachData, index) => {
                          return (
                            <li key={"budget-graphic" + index}>
                              <a href={eachData?.url || "/"}>
                                <i>
                                  {isAmp ? (
                                    <amp-img
                                      src={
                                        eachData?.icon_path ||
                                        SITE_CONfIG.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                                      }
                                      width={25}
                                      height={25}
                                    />
                                  ) : (
                                    <img src={eachData?.icon_path} />
                                  )}
                                </i>
                                {eachData?.text_part1}
                                <span>{eachData?.text_part2}</span>
                              </a>
                            </li>
                          );
                        })
                      : ""}
                  </ul>
                </>
              )}
            </div>
            {/* {!isMobile ? (
              <div className="clearfix add">
                <div className="addinner-box">
                  <SiteAd
                    width={300}
                    height={280}
                    slotId={"budget_news_second"}
                    adUnit={pageAds?.ATF_300}
                    lazyload={true}
                    sizes={[
                      [300, 250],
                      [336, 280],
                    ]}
                  ></SiteAd>
                </div>
              </div>
            ) : (
              ""
            )} */}
            {isBudgetPage && (
              <BudgetGraphicsMobile
                graphics={graphics}
                budgetYear={budgetYear}
                isAmp={isAmp}
              />
            )}
            <div className="budget_page_right">
              <BudgetGlossaryWidget
                // isMobile={isMobile}
                glossary={budgetGlossaryData}
                sponsor={glossarySponsor}
                isAmp={isAmp}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          font-family: Mukta, sans-serif;
        }

        .budget {
          margin-bottom: 20px;
        }
        .full_coverage_top {
          ${isMobile || isAmp ? "" : "height:500px;"}
        }
        .full_coverage_top img {
          height: 250px;
          border-radius: unset ${!isAmp ? "" : ""};
        }
        .union_budget_img {
          height: 303px;
        }

        .budget .landing_list {
          ${isMobile ? "padding: 0  " : ""};
          ${isAmp && headlineStories.length > 1 ? "width:300%" : ""};
          overflow: ${isAmp ? "visible" : ""};
        }

        .landing_list li {
          ${isMobile ? "padding: 0 10px; min-height: 50px;" : ""}
          ${isAmp ? "width: 100%;" : ""}
        }
        .landing_list li a {
          padding-bottom: 5px;
        }
        .glide__track {
          ${isAmp ? "overflow: auto;" : ""}
        }

        .glide .glide__bullet {
          margin: 0 5px;
          width: 8px;
          height: 8px;
          border: none;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 5px;
        }

        .glide .glide__bullet.glide__bullet--active {
          background-color: #e33a0f;
          width: 10px;
          height: 10px;
        }

        .landing_title .glide {
          color: #4f4f4f;
          font-size: 14px;
          line-height: 22px;
          padding: 10px 0;
          text-align: center;
          font-weight: 700;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          height: 103px;
          overflow: hidden;
        }

        .budget .livetv-play {
          height: 250px;
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

        body {
          padding-top: 0;
        }
        .add,
        .add2 {
          background: #dbdde3;
          position: relative;
          padding: 16px 0;
          line-height: 0;
          text-align: center;
        }
        .addinner-box {
          background: #e8e9ed;
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: auto;
          padding: 0;
          box-sizing: border-box;
        }
        .addinner-box span {
          color: #797e90;
          font-size: 11px;
          text-align: center;
          padding: 2px 0 0;
          display: block;
          line-height: 16px;
        }
        .budget_page {
          max-width: 100%;
          width: 100%;
          display: block;
        }
        body {
          margin: 0;
          padding: 0;
        }
        .landing_list ul.slick-dots {
          position: absolute;
          bottom: 7px;
          width: 100%;
          text-align: center;
        }
        .landing_list ul.slick-dots li {
          display: inline-block;
          padding: 0 10px;
        }
        .landing_list ul.slick-dots li button {
          width: 5px;
          height: 5px;
          font-size: 0;
          border: 0;
          background: #939393;
          border-radius: 100px;
        }
        .landing_list ul.slick-dots li.slick-active button {
          width: 8px;
          height: 8px;
          background: #e1261c;
        }
        .landing_page_content {
          width: 100%;
        }
        .landing_title {
          width: 100%;
          text-align: center;
          overflow: hidden;
        }
        .landing_heading {
          padding-bottom: 2px;
          color: #e33a0f;
          text-transform: uppercase;
          font-size: 15px;
          font-weight: 700;
          background: #f6f6f6;
          line-height: 1;
          width: calc(100% - 20px);
          margin: auto;
          margin-top: 9px;
          margin-bottom: 10px;
        }
        .landing_heading span {
          background: #fff;
          padding: 3px 10px;
        }
        .landing_subheading {
          font-size: 20px;
          color: #242d3c;
          font-weight: 700;
          line-height: 28px;
          padding: 0 10px;
          padding-bottom: 15px;
        }
        .landing_subheading a {
          color: #242d3c;
        }
        .landing_list {
          text-align: left;
          list-style: none;
          display: flex;
          padding: 0 10px;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
        }

        .landing_list li:first-child {
          margin-left: 0;
        }
        .landing_list li:last-child {
          margin-right: 0;
        }
        .landing_list li a {
          color: #4f4f4f;
          display: flex;
          text-decoration: none;
          align-items: center;
          justify-content: center;
          ${isAmp ? "margin: 0 5px; background: #f1f1f1; padding: 5px;" : ""}
        }
        ul.landing_list li span {
          color: #bfbfbf;
          font-size: 45px;
          font-style: normal;
          padding-right: 10px;
        }
        .landing_list .slick-list {
          overflow: hidden;
        }
        .landing_list .slick-track {
          overflow: hidden;
          display: flex;
          text-align: center;
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
          font-weight: 700;
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
        ul.budget_link_row li:last-child {
          border-bottom: 1px dashed #c4c4c4;
        }
        ul.budget_link_row {
          margin-bottom: 20px;
        }

        .budget_page_right {
          width: 100%;
          padding: 0 10px;
        }
        .budget_page_left {
          width: 100%;
          margin-bottom: 20px;
        }
        .top_section {
          width: 100%;
          display: block;
        }
        .full_coverage {
          width: 100%;
        }
        .right_news {
          width: calc(100% - 10px);
          display: flex;
          margin: auto;
          margin-bottom: 5px;
        }
        .right_news_row img {
          width: 100%;
          display: block;
          border-radius: 5px 5px 0 0;
        }
        .full_coverage_top {
          width: 100%;
          margin-bottom: 10px;
        }
        .full_coverage_top img {
          width: 100%;
          display: block;
        }

        .listing_news {
          width: 100%;
          padding: 0 10px;
        }

        .listing_row:last-child {
          margin-bottom: 20px;
        }
        .listing_row {
          width: 100%;
          padding: 10px 0;
          border-bottom: 1px dashed #c4c4c4;
        }

        .listing_row a {
          color: #333333;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        .listing_row figure {
          display: flex;
          align-items: end;
          width: auto;
          float: none;
          margin: 0;
          border-radius: 6px;
        }

        .listing_row a figure img {
          width: 100%;
          display: block;
          border-radius: 6px;
        }

        .slick-slide {
          float: none;
          padding: 0;
          background: 0 0;
        }
        .listing_row figure .list_img {
          width: 100px;
        }
        .listing_title {
          width: calc(100% - 100px);
          color: #001d42;
          font-size: 13px;
          line-height: 21px;
          padding-right: 15px;
          font-weight: 700;
        }

        .coverage_title {
          background: #001d42;
          line-height: 24px;
          font-size: 18px;
          padding: 23px 10px 13px;
          position: relative;
        }
        .coverage_title:after {
          width: 40px;
          height: 6px;
          background: red;
          content: "";
          position: absolute;
          top: 10px;
          left: 10px;
        }
        .full_coverage_top a {
          text-decoration: none;
          color: #fff;
        }
        .full_coverage_link {
          color: #f3352f;
          font-size: 13px;
          font-weight: 700;
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/link_arrow_1609601606.svg);
          background-repeat: no-repeat;
          background-position: right center;
          padding-right: 27px;
        }

        .right_news_row .listing_title {
          width: 100%;
          padding: 10px;
          min-height: 106px;
          background: #f4f4f2 0 0 no-repeat padding-box;
          font-weight: 700;
          line-height: 21px;
        }
        .right_news_row {
          width: calc(100% - 10px);
          background: #f4f4f2;
          margin: 0 5px;
          border: 1px solid #d7d7d7;
          border-radius: 0 0 5px 5px;
        }
        .right_news_row a {
          text-decoration: none;
          color: #001d42;
        }
        .budget_graphic_row img {
          width: 100%;
          display: block;
          background: #fff 0 0 no-repeat padding-box;
          border: 1px solid #707070;
          border-radius: 5px;
          padding: 5px;
          height: 104px;
        }
        .budget_graphic_row {
          width: 100%;
          padding: 0 10px;
        }
        .graphics_tilte {
          color: #001d42;
          font-size: 13px;
          line-height: 20px;
          padding: 5px 0;
          font-weight: 700;
        }
        .budget_graphic_row:first-child {
          padding-left: 0;
        }
        .budget_graphic_row:last-child {
          padding-right: 0;
          border: 0;
        }

        .budget_container {
          width: 100%;
          margin: auto;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .more_story {
          width: 100%;
          background: #ddd;
          text-align: center;
          height: 10px;
          line-height: 6px;
          margin-bottom: 20px;
        }
        .more_story a {
          background: #fff;
          padding: 0 12px;
          font-size: 14px;
          text-transform: uppercase;
          color: #e33a0f;
          font-weight: 700;
        }
        .more_budget_link {
          font-weight: 700;
          color: #e1261d;
          text-transform: uppercase;
          text-align: center;
          display: inherit;
          position: relative;
          text-decoration: none;
          font-size: 12px;
        }
        .union_budget_img {
          margin-bottom: 10px;
        }
        .union_budget_img figure {
          width: 100%;
          line-height: 0;
          position: relative;
        }
        .union_budget_img figure img {
          width: 100%;
        }
        .union_budget_img figure a h3 {
          color: #fff;
          padding: 50px 10px 10px 10px;
          font-weight: 700;
          font-size: 16px;
          position: absolute;
          bottom: 0;
          background: linear-gradient(transparent, #000);
          line-height: 26px;
          left: 0;
          right: 0;
        }
        .union_budget_link {
          background: #eee;
          font-size: 13px;
          text-align: center;
          display: block;
          padding: 5px 0;
          color: #666;
        }

        .highlight_fullimg {
          width: 100%;
          padding-bottom: 30px;
          margin-bottom: 20px;
        }
        .highlight_fullimg img {
          width: 100%;
          display: block;
        }

        .coverage_title {
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default BudgetNewsMobile;
