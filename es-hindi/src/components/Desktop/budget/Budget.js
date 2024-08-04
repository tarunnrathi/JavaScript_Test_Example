import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const BudgetNewsDesktop = dynamic(() =>
  import("components/Common/budget/BudgetNewsDesktop")
);
const BudgetTimelineWidget = dynamic(() =>
  import("components/Common/budget/BudgetTimelineWidget")
);
const BudgetCalculator = dynamic(() =>
  import("components/Common/budget/BudgetCalculator")
);
const BudgetSectorialReport = dynamic(() =>
  import("components/Common/budget/BudgetSectorialReport")
);

const BudgetHeadline = dynamic(() =>
  import("components/Common/budget/BudgetHeadline")
);
const BudgetTimeline = dynamic(() =>
  import("components/Common/budget/BudgetTimeline")
);
const BudgetHighlights = dynamic(() =>
  import("components/Common/budget/BudgetHighlights")
);
const BudgetGlossary = dynamic(() =>
  import("components/Common/budget/BudgetGlossary")
);

const RhsBudget = dynamic(() => import("widgets/Common/Desktop/RhsBudget"));

const Budget = ({ data, hasLayout = true }) => {
  const {
    pageAds,
    BUDGET_PAGES,
    pageConfig,
    pageContent,
    taboolaList,
    breadcrumbArray,
    // isBudgetHome,
  } = useMemo(() => data, [data]);
  const { sectionName, budgetYear } = pageConfig;

  // useEffect(() => {
  //   initGA();
  //   logPageViewUpdated(
  //     {
  //       post_type: "category",
  //     },
  //     "budget",
  //     "category page",
  //     isBudgetHome ? "Vidgyor Player" : "No video player",
  //     isBudgetHome ? "LiveTV" : "No video"
  //   );
  // }, []);

  return (
    <>
      <div className="budget_container">
        {hasLayout && <BreadcrumbCommon breadCrumbArray={breadcrumbArray} />}
        {/* <div className="breadcrumb">
          <ul>
            <li>
              <a href="/">हिंदी न्यूज</a>
            </li>
            <li> »</li>
            {sectionName === BUDGET_PAGES.HOME ? (
              <li>
                <span className="breadcrumbh1">बजट {budgetYear}</span>
              </li>
            ) : (
              <>
                <li>
                  <a href="/budget/">बजट {budgetYear}</a>
                </li>
                <li> »</li>
                <li>
                  <span className="breadcrumbh1">{breadcrumb}</span>
                </li>
              </>
            )}
          </ul>
        </div> */}
        {sectionName === BUDGET_PAGES.HOME && (
          <div className="top-news-title">
            <h1>{pageContent?.heading?.headline}</h1>
          </div>
        )}
      </div>

      {sectionName === BUDGET_PAGES.HOME ? (
        <>
          <BudgetNewsDesktop
            homeBudgetNews={pageContent?.budgetHomeData}
            eventSwitches={pageContent?.eventSwitchers}
            pageAds={pageAds}
            graphics={pageContent?.graphics}
            isBudgetPage={true}
            budgetYear={budgetYear}
            glossarySponsor={pageContent?.glossarySponsor}
          />
          <BudgetTimelineWidget
            pageAds={pageAds}
            timeline={pageContent?.timeline}
            sponsor={pageContent?.timelineSponsor}
          />
          {pageContent?.eventSwitchers?.calculator_onoff === "1" ||
          pageContent?.eventSwitchers?.calculator_onoff === 1 ? (
            <BudgetCalculator sponsor={pageContent.calculatorSponsor} />
          ) : null}
          <BudgetSectorialReport
            sectorialReports={pageContent.sectorialReports}
            sponsor={pageContent?.sectorialSponsor}
          />
        </>
      ) : (
        <div className="budget_container">
          <div className="budget_page">
            <div className="budget_page_left">
              <BudgetHeadline
                heading={pageContent.heading}
                sponsor={pageContent?.headlineSponsor}
              />
              {sectionName === BUDGET_PAGES.TIMELINE ? (
                <BudgetTimeline
                  pageAds={pageAds}
                  timeline={pageContent?.timeline}
                />
              ) : sectionName === BUDGET_PAGES.HIGHLIGHTS ? (
                <BudgetHighlights
                  pageAds={pageAds}
                  highlights={pageContent?.highlights}
                  filter={pageContent?.hfilter}
                  hasLayout={hasLayout}
                />
              ) : sectionName === BUDGET_PAGES.GLOSSARY ? (
                <BudgetGlossary
                  glossary={pageContent?.rhsGlossaryData}
                  budgetYear={budgetYear}
                />
              ) : null}
            </div>
            <RhsBudget
              pageAds={pageAds}
              glossary={pageContent?.rhsGlossaryData}
              budgetPhotoStories={
                sectionName === BUDGET_PAGES.GLOSSARY
                  ? pageContent?.budgetPhotoStories
                  : []
              }
              sponsor={pageContent?.glossarySponsor}
            />
          </div>
        </div>
      )}
      <div className={"middlead"}>
        <SiteAd
          width={728}
          height={90}
          slotId={"budget_news_btf"}
          adUnit={pageAds.BTF_728_0}
          sizes={[[728, 90]]}
          loadonScroll={true}
        ></SiteAd>
      </div>
      <Taboola
        mode={taboolaList.bottom.mode}
        id={taboolaList.bottom.id}
        container={taboolaList.bottom.container}
        placement={taboolaList.bottom.placement}
      />
      {typeof pageAds !== "undefined" &&
      typeof pageAds.Shosh_OOP_id !== "undefined" ? (
        <SiteAd
          slotId="Shosh_OOP_id_budget"
          renderOutOfThePage={true}
          adUnit={pageAds.Shosh_OOP_id}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : (
        ""
      )}
      {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_1x1_2 !== "undefined" ? (
        <SiteAd
          slotId="PG_1x1_2"
          adUnit={pageAds.PG_1x1_2}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          style={{ height: "0" }}
          loadonScroll={true}
        />
      ) : (
        ""
      )}
      {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_Slider_1x1 !== "undefined" ? (
        <SiteAd
          slotId="PG_Slider_1x1"
          adUnit={pageAds.PG_Slider_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadonScroll={true}
        />
      ) : null}
      <style jsx global>
        {`
          body {
            margin: auto;
            background: #fff;
            font-family: "Mukta", sans-serif;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          ul,
          table,
          figure {
            margin: 0;
            padding: 0;
          }

          li {
            list-style: none;
          }

          a {
            text-decoration: none;
          }

          a img {
            border: none;
          }

          * {
            box-sizing: border-box;
          }

          .clearfix {
            clear: both;
          }

          .clearfix::after,
          .clearfix::before {
            content: "";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            height: 0px;
          }

          figure {
            position: relative;
            line-height: 0;
            flex-shrink: 0;
            overflow: hidden;
          }

          button {
            cursor: pointer;
            font-size: 0;
            border: 0;
            outline: none;
          }

          .vsp20 {
            margin-top: 20px;
          }
          .middlead {
            flex-direction: column;
            text-align: center;
            margin-bottom: 15px;
          }
          .adunitContainer {
            display: flex;
            justify-content: center;
          }
          /* devanagari start*/
          @font-face {
            font-family: "Mukta";
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
              U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
          }

          @font-face {
            font-family: "Mukta";
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2)
              format("woff2");
            unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
              U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
          }

          /* devanagari end*/
          /* latin start*/
          @font-face {
            font-family: "Mukta";
            font-style: normal;
            font-weight: 400;
            src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnBrXw_1669353352.woff2)
              format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          @font-face {
            font-family: "Mukta";
            font-style: normal;
            font-weight: 700;
            src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2)
              format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          /* latin end*/

          .budget_container {
            max-width: 1244px;
            width: 100%;
            margin: auto;
            position: relative;
            z-index: 1;
          }

          .budget_page {
            max-width: 100%;
            width: 100%;
            display: flex;
            justify-content: space-between;
          }

          .budget_page_left {
            width: calc(100% - 320px);
          }
          .budget_page_right {
            width: 300px;
          }
          .budget_page_right_sticky {
            position: sticky;
            top: 40px;
          }
          .breadcrumb {
            width: 100%;
            padding: 5px 0;
            border-bottom: 1px dashed #c4c4c4;
            margin-bottom: 10px;
          }
          .breadcrumb ul {
            display: flex;
            align-items: center;
            font-size: 11px;
            list-style-type: none;
          }
          .breadcrumb ul li {
            font-size: 15px;
            margin: 0 4px;
            color: #969696;
            line-height: 24px;
          }
          .breadcrumb ul li h1 {
            font-size: 15px;
            color: #001d42;
            font-weight: normal;
          }
          .breadcrumb ul li a {
            text-decoration: none;
            color: #969696;
            font-weight: 200;
          }
          .breadcrumb ul li:first-child {
            margin-left: 0;
          }

          .landing_page_content {
            width: 100%;
          }

          .top-news-title h1 {
            font-size: 28px;
            line-height: 32px;
            color: #001d42;
            font-weight: bold;
            margin-bottom: 2px;
          }
        `}
      </style>
    </>
  );
};

export default React.memo(Budget);
