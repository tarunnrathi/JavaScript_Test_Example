import React, { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const BudgetNewsMobile = dynamic(() =>
  import("components/Common/budget/BudgetNewsMobile")
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

const BudgetMobile = ({ data, hasLayout = true }) => {
  const {
    pageAds,
    BUDGET_PAGES,
    pageConfig,
    pageContent,
    taboolaList,
    breadcrumbArray,
  } = useMemo(() => data, [data]);
  const { sectionName, budgetYear } = pageConfig;

  useEffect(() => {
    // initGA();
    // logPageViewUpdated(
    //   {
    //     post_type: "category page",
    //   },
    //   "budget",
    //   "category page",
    //   isBudgetHome ? "Vidgyor Player" : "No video player",
    //   isBudgetHome ? "LiveTV" : "No video"
    // );
  }, []);

  return (
    <>
      {hasLayout && <BreadcrumbCommon breadCrumbArray={breadcrumbArray} />}
      {/* <div className="breadcrumb">
        <ul>
          <li>
            <a href="/">हिंदी न्यूज</a>
          </li>
          <li> » </li>
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
      <div className="clearfix add">
        <div className="addinner-box">
          <SiteAd
            width={336}
            height={280}
            slotId={"budget_news_first"}
            adUnit={pageAds.ATF_320_0}
            sizes={[
              [300, 250],
              [336, 280],
            ]}
          ></SiteAd>
        </div>
      </div>
      {sectionName === BUDGET_PAGES.HOME ? (
        <>
          <BudgetNewsMobile
            homeBudgetNews={pageContent?.budgetHomeData}
            eventSwitches={pageContent?.eventSwitchers}
            pageAds={pageAds}
            graphics={pageContent?.graphics}
            isBudgetPage={true}
            isMobile={true}
            budgetYear={budgetYear}
            glossarySponsor={pageContent?.glossarySponsor}
          />
          <BudgetTimelineWidget
            pageAds={pageAds}
            isMobile={true}
            timeline={pageContent?.timeline}
            sponsor={pageContent?.timelineSponsor}
          />
          {pageContent?.eventSwitchers?.calculator_onoff == "1" ||
          pageContent?.eventSwitchers?.calculator_onoff == 1 ? (
            <BudgetCalculator sponsor={pageContent.calculatorSponsor} />
          ) : null}
          <BudgetSectorialReport
            sectorialReports={pageContent.sectorialReports}
            sponsor={pageContent?.sectorialSponsor}
            isMobile={true}
          />
        </>
      ) : (
        <div className="budget_page">
          <div className="budget_page_left">
            <BudgetHeadline
              heading={pageContent.heading}
              sponsor={pageContent?.headlineSponsor}
              isMobile={true}
            />
            {sectionName === BUDGET_PAGES.TIMELINE ? (
              <BudgetTimeline
                pageAds={pageAds}
                timeline={pageContent?.timeline}
                isMobile
              />
            ) : sectionName === BUDGET_PAGES.HIGHLIGHTS ? (
              <BudgetHighlights
                pageAds={pageAds}
                highlights={pageContent?.highlights}
                filter={pageContent?.hfilter}
                isMobile={true}
                eventSwitches={pageContent?.eventSwitchers}
                hasLayout={hasLayout}
              />
            ) : sectionName === BUDGET_PAGES.GLOSSARY ? (
              <BudgetGlossary
                glossary={pageContent?.rhsGlossaryData}
                budgetYear={budgetYear}
                isMobile={true}
              />
            ) : null}
          </div>
        </div>
      )}

      <div className="clearfix add">
        <div className="addinner-box">
          <SiteAd
            width={300}
            height={250}
            slotId={"budget_news_second"}
            adUnit={pageAds.BTF_300_id}
            sizes={[
              [300, 250],
              [336, 280],
            ]}
            lazyload={true}
          ></SiteAd>
        </div>
      </div>
      <Taboola
        mode={taboolaList.bottom.mode}
        id={taboolaList.bottom.id}
        container={taboolaList.bottom.container}
        placement={taboolaList.bottom.placement}
      />
      <SiteAd
        slotId="PG_1x1"
        adUnit={pageAds.PG_1x1}
        sizes={[[1, 1]]}
        removeAdSpan={true}
        loadonScroll={true}
      />
      <SiteAd
        slotId="PG_Slider_1x1"
        adUnit={pageAds.PG_Slider_1x1}
        sizes={[[1, 1]]}
        removeAdSpan={true}
        loadonScroll={true}
      />
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
          .add {
            background: #dbdde3 !important;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
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
            src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
              format("woff2");
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

          .breadcrumb {
            width: calc(100% - 20px);
            padding: 4px 0;
            border-bottom: 1px dashed #c4c4c4;
            margin: auto;
            margin-bottom: 5px;
          }

          .breadcrumb ul {
            display: flex;
            align-items: center;
            font-size: 14px;
            list-style-type: none;
          }

          .breadcrumb ul li {
            letter-spacing: 0px;
            font-size: 14px;
            margin: 0 3px;
            color: #969696;
            flex-shrink: 0;
          }

          .breadcrumb ul li:first-child {
            margin-left: 0;
          }

          .breadcrumb ul li a {
            text-decoration: none;
            color: #969696;
            font-weight: 200;
          }
        `}
      </style>
    </>
  );
};

export default React.memo(BudgetMobile);
