import React /* , { useContext } */ from "react";
import Head from "next/head";
import Header from "widgets/Amp/Header";
import Footer from "widgets/Amp/Footer";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import IplAuctionWidget from "widgets/Common/Responsive/iplAuctionWidget";
// import HighlightsWidgetMobile from "widgets/Mobile/HighlightsWidgetMobile";
import AmpLayoutStyle from "styles/Amp/AmpLayoutStyle";
// import HindiGlobalContext from "HindiGlobalContext";
// import BudgetAmpAcrossSite from "./BudgetAmpAcrossSite";

const AmpLayout = (props) => {
  const MainComponent = props.mainComponent;

  // const { pageCommonProps = {} } = useContext(HindiGlobalContext);
  // const { switcher_widget: { counting_poll = {}, exit_poll = {} } = {} } =
  //   pageCommonProps?.electionSwitcherData || {};
  // const { pageCommonProps = {} } = useContext(HindiGlobalContext);
  const { cd19value, cd20value, isNewLiveBlog } = props.data;

  let cd18Value = "";
  let cd14Value = "";

  const allSlashSplitted =
    props.data?.paramObj?.requestURL?.split("/") ||
    props?.data?.currentUrl?.split("/");

  if (allSlashSplitted?.[3] === "news") {
    cd14Value = allSlashSplitted?.[4];
  } else if (allSlashSplitted?.[3] === "photogallery") {
    cd14Value = allSlashSplitted?.[4];
  } else if (allSlashSplitted?.[3] === "videos") {
    cd14Value = allSlashSplitted?.[4];
  } else if (
    allSlashSplitted?.length === 5 &&
    allSlashSplitted[3] === "amp" &&
    !allSlashSplitted[1]
  ) {
    cd14Value = "Home";
  } else {
    cd14Value = props?.data?.category;
  }

  let cd22value = "Taboola No";
  let cd21value = 0;
  if (
    props?.pageType == "home" ||
    props?.pageType == "article" ||
    props?.pageType == "photogallery" ||
    props?.pageType == "video"
  ) {
    cd22value = "Taboola Yes";
  }
  if (props?.pageType == "article") {
    cd21value = props?.data?.articleData?.nw_post_word_count;
  }

  if (props?.pageType == "photogallery") {
    cd21value = props?.data?.articleData?.gallery?.[0]?.word_count;
  }

  switch (props?.pageType) {
    case "article":
      cd18Value = "Article";
      break;
    case "home":
      cd18Value = "Home Page";
      break;
    case "video":
      cd18Value = "Video";
      break;
    case "photogallery":
      cd18Value = "photogallery";
      break;
    default:
      break;
  }

  // const { highlights_homepage_flag = false, highlights_microsite_flag } = eventSwitcher || {};
  // const showAcrossSiteBudgetWidget =
  //   (props.pageType === "home" && highlights_homepage_flag === "1") ||
  //   (props.isBudgetPage && highlights_microsite_flag === "1")
  //     ? true
  //     : false;

  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content="hi-IN" />
        <meta name="language" content="hi" />
        {isNewLiveBlog && (
          <script
            async
            custom-element="amp-live-list"
            src="https://cdn.ampproject.org/v0/amp-live-list-0.1.js"
          ></script>
        )}
      </Head>
      <Header
        pageAds={props.pageAds}
        data={props.data}
        pageParam={props.data?._pageParam}
        isCricketNext={props?.isCricketNext}
        isT20={props?.isT20}
        districtList={props.data.districtList}
        countingTallyData={props.data?.countingTallyData}
        isWorldCup={props?.isWorldCup}
        GA4Data={props?.GA4Data || {}}
        // exit_poll={exit_poll}
        // counting_poll={counting_poll}
        // pageCommonProps={pageCommonProps}
      />
      <section className="wapper">
        {props.children}

        <SiteSeo
          pageSeo={props.pageSeo}
          district={props.data.district}
          url={props.url || props.data?.articleData?.weburl}
          currentDistrict={props.currentDistrict}
          isHome={props.data?.isHome}
          isArticle={props?.isArticle}
        />

        {
          <IplAuctionWidget
            isAmp={true}
            iplAuctionList={props?.data?.iplAuctionList}
          />
        }
        {/* {showAcrossSiteBudgetWidget && (
          <BudgetAmpAcrossSite
            device={"mobile"}
            pageAds={props.pageAds}
            // isBudgetPage={isBudgetPage}
            highlightData={props.data.highlightData}
            budgetSwitcher={eventSwitcher}
          />
        )} */}
        <MainComponent
          data={props.data}
          pageAds={props.pageAds}
          pageSeo={props.pageSeo}
          isAmp={true}
          GA4Data={props.GA4Data || {}}
        />
      </section>
      <Footer
        cd18value={cd18Value}
        cd14value={cd14Value}
        cd19value={
          !cd19value
            ? "No Video Player"
            : cd19value?.[cd19value?.length - 1] !== ","
            ? cd19value
            : cd19value.slice(0, cd19value?.length - 1)
        }
        cd20value={
          !cd20value
            ? "No Video"
            : cd20value?.[cd20value?.length - 1] !== ","
            ? cd20value
            : cd20value.slice(0, cd20value?.length - 1)
        }
        data={props.data}
        pageSeo={props.pageSeo}
        isPhoto={props.data?.isPhoto}
        isHome={props.data?.isHome}
        isCricketNext={props?.isCricketNext}
        isVideo={props?.isVideo}
        chartbeat={props.chartbeat}
        cd21value={cd21value}
        cd22value={cd22value}
        pageType={props?.pageType}
        stickyFooterData={props?.data?.menuData?.stickyFooter || []}
        GA4Data={props.GA4Data || {}}
        amp_ins_app_cat={props?.category || ""}
        isPhotoghallery={props?.isPhotoghallery}
        currentUrl={props?.data?.currentUrl}
      />

      <style jsx global>
        {AmpLayoutStyle}
      </style>
    </>
  );
};

export default AmpLayout;
