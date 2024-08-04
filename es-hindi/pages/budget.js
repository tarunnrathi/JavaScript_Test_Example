//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import budgetProps from "../helper/budgetProps";
import INIT_OOP_Manager from "components/Common/INIT_OOP_Manager";
import Head from "next/head";
import NewRelicRum from "components/Common/NewRelicRum";
import NewRelicEvents from "components/Common/NewRelicEvents";
import TaboolaHeader from "widgets/Common/Responsive/TaboolaHeader";
// import { useEffect } from "react";
// import { logPageViewUpdated } from "includes/googleAnalytic";

//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const BudgetDesktop = dynamic(() => import("components/Desktop/budget/Budget"));

//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const BudgetMobile = dynamic(() =>
  import("components/Mobile/budget/BudgetMobile")
);

const Budget = ({ pageData, chartbeat }) => {
  const { highlights_sponser_microsite_flag = false } =
    pageData.pageContent?.eventSwitchers || {};
  const { hasLayout } = pageData;
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        hasLayout === "false" ? (
          <>
            <Head>
              <NewRelicRum />
              <NewRelicEvents />
              {pageData.taboolaList?.header?.page && (
                <TaboolaHeader page={pageData.taboolaList?.header?.page} />
              )}
            </Head>
            <INIT_OOP_Manager pageAds={pageData.pageAds} isMobile={true} />
            <BudgetMobile data={pageData} hasLayout={false} />
          </>
        ) : (
          <MobileLayout
            data={pageData}
            mainComponent={BudgetMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            isBudgetPage={true}
            showSponser={
              highlights_sponser_microsite_flag === "1" &&
              Object.keys(pageData._1xbetData || {}).length
                ? true
                : false
            }
            pageType={"budget"}
          />
        )
      ) : hasLayout === "false" ? (
        <>
          <Head>
            <NewRelicRum />
            <NewRelicEvents />
            {pageData.taboolaList?.header?.page && (
              <TaboolaHeader page={pageData.taboolaList?.header?.page} />
            )}
          </Head>
          <INIT_OOP_Manager pageAds={pageData.pageAds} isMobile={true} />
          <BudgetDesktop data={pageData} hasLayout={false} />
        </>
      ) : (
        <DesktopLayout
          data={pageData}
          mainComponent={BudgetDesktop}
          pageAds={pageData.pageAds}
          pageSeo={pageData.seo}
          isBudgetPage={true}
          showSponser={
            highlights_sponser_microsite_flag === "1" &&
            Object.keys(pageData._1xbetData || {}).length
              ? true
              : false
          }
          config={pageData.config}
          pageType={"budget"}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return budgetProps(context);
}

export default Budget;
