import dynamic from "next/dynamic";
import budgetProps from "../../helper/budgetProps";
import AmpLayout from "layouts/Amp/AmpLayout";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

export const config = { amp: true };

const BudgetNewsMobile = dynamic(() =>
  import("components/Common/budget/BudgetNewsMobile")
);

const BudgetAmpPage = ({ data }) => {
  const {
    budgetHomeData = {},
    eventSwitchers,
    budgetYear = 2024,
    glossarySponsor,
  } = data.pageContent;
  const { pageAds } = data;

  return (
    <>
      <BreadcrumbCommon breadCrumbArray={data.breadcrumbArray} />
      <BudgetNewsMobile
        homeBudgetNews={budgetHomeData}
        eventSwitches={eventSwitchers}
        isFromHomePage={true}
        pageAds={pageAds}
        isMobile={true}
        isAmp={true}
        sponsors={{}}
        budgetYear={budgetYear}
        glossarySponsor={glossarySponsor}
      />
    </>
  );
};

const ampBudget = ({ pageData, GA4Data }) => {
  return (
    <>
      <AmpLayout
        data={pageData}
        mainComponent={BudgetAmpPage}
        pageAds={pageData.pageAds}
        pageSeo={pageData.pageSeo}
        dtype={"budget"}
        pageType="budget"
        isBudgetPage={true}
        GA4Data={GA4Data}
      />
      {/* <BudgetNewsMobile
        homeBudgetNews={budgetHomeData}
        eventSwitches={eventSwitchers}
        isFromHomePage={true}
        pageAds={pageAds}
        isMobile={true}
        sponsors={{}}
        budgetYear={budgetYear}
        glossarySponsor={glossarySponsor}
      /> */}
      <style jsx global>{`
        body {
          margin: 0 auto;
        }
        * {
          box-sizing: border-box;
          text-decoration: none;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .budget_page_right {
          padding: unset;
        }
        .livetvhd a {
          color: #111;
        }
      `}</style>
    </>
  );
};
export async function getServerSideProps(context) {
  return await budgetProps(context, true);
}
export default ampBudget;
