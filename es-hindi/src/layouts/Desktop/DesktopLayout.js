import Head from "next/head";
import dynamic from "next/dynamic";
import useLoad from "../../hooks/useLoad";
import Footer from "widgets/Desktop/Footer";
import { loadTvfn } from "includes/article.util";
// import HindiGlobalContext from "HindiGlobalContext";
import React, { useCallback, useEffect, useState } from "react";
import NewRelicRum from "components/Common/NewRelicRum";
import NewRelicEvents from "components/Common/NewRelicEvents";
import DesktopLayoutStyle from "styles/Desktop/DesktopLayoutStyle";
import INIT_OOP_Manager from "components/Common/INIT_OOP_Manager";

const Header = dynamic(() => import("widgets/Desktop/Header"));
const ProKabaddiHeader = dynamic(() =>
  import("widgets/Desktop/ProKabaddiHeader")
);
const TaboolaHeader = dynamic(() =>
  import("widgets/Common/Responsive/TaboolaHeader")
);
const ScriptManager = dynamic(() =>
  import("../../components/Common/ScriptManager")
);
const ExitIntentPopup = dynamic(
  () => import("components/Desktop/ExitIntentPopup"),
  { ssr: false }
);

let intervalId = null;

const DesktopLayout = ({
  mainComponent: MainComponent,
  isHome,
  isHomeOnly,
  isIpl,
  isAqi,
  isT20,
  isWorldCup,
  isTag,
  config,
  pageAds,
  isVideo,
  current,
  isPhoto,
  pageType,
  children,
  activeId,
  data = {},
  isArticle,
  isCategory,
  isWebstory,
  dtype = "",
  isCricketNext,
  isProKabaddi,
  isVideoConsumption,
  isBudgetPage,
  showSponser,
  isNewsFeedPage = false,
  showtopHeaderBanner,
  isolympics = false,
}) => {
  const {
    crMenu,
    catName,
    switches,
    menuData,
    isFeature,
    _pageParam,
    _1xbetData,
    isEntPage,
    islifePage,
    footerData,
    trendingTags,
    topNews = {},
    categoryName,
    callJsOnFkYt,
    footerStories,
    footerDataCat,
    sponsors = {},
    dynaMenu = [],
    EventBack = {},
    showBannerInTag,
    currentUrl = "",
    showBannerInIPL,
    showBannerInHome,
    articleData = {},
    taboolaList = {},
    electionWidgetData,
    isWomenWorldCupPage = false,
    vidStreamData,
    vid_exist,
    liveTvFlag = {},
    isShowSponser = true,
    category_hi,
  } = data;
  let { cd19value, cd20value } = data;
  let cd18Value = "";
  const [load] = useLoad();
  const [OpenExitIntendPopup, setExitIntendPopUpOpen] = useState(false);
  const [showExitIntentPopUp, setExitIntentPopUp] = useState(true);
  const myStateRef = React.useRef(showExitIntentPopUp);
  const setMyState = (value) => {
    myStateRef.current = value;
    setExitIntentPopUp(value);
  };
  // const { pageCommonProps = {} } = useContext(HindiGlobalContext);

  const taboolaVariable =
    [
      "article",
      "category",
      "homePage",
      "photogallery",
      "video",
      "category",
      "boardresult",
      "home",
    ].indexOf(pageType) > -1;
  const nw_post_word_count =
    pageType === "article" || data?.pageType === "category"
      ? articleData?.nw_post_word_count || data?.nw_post_word_count
      : pageType === "photogallery"
      ? articleData?.gallery?.[0]?.word_count
      : false;

  const allSlashSplitted =
    articleData.weburl?.split("/") || currentUrl.split("/");

  let cd14Value = _pageParam?.category || "";
  if (allSlashSplitted?.[3] === "news") {
    cd14Value = allSlashSplitted?.[4];
  } else if (allSlashSplitted?.[3] === "photogallery") {
    cd14Value = allSlashSplitted?.[4];
  } else if (allSlashSplitted?.[3] === "ayodhya-ram-mandir") {
    cd14Value = "ram-mandir";
  } else if (allSlashSplitted?.[3] === "videos") {
    cd14Value = allSlashSplitted?.[4];
  } else if (allSlashSplitted?.length === 4 && !allSlashSplitted[1]) {
    cd14Value = "Home";
  } else if (isBudgetPage) {
    cd14Value = "budget";
  } else if (isNewsFeedPage) {
    cd14Value = "news feed";
  } else {
    if (isolympics) {
      cd14Value = "sports";
    }
  }
  if (isT20) {
    cd14Value = "cricket";
  }
  isT20;
  switch (pageType) {
    case "article":
      cd18Value = "Article";
      break;
    case "homePage":
      cd18Value = "Home Page";
      break;
    case "video":
      cd18Value = "Video";
      break;
    case "ram-mandir":
      cd18Value = "ram-mandir";
      break;
    case "photogallery":
      cd18Value = "photogallery";
      break;
    case "newsFeedPage":
      cd18Value = "category page";
      break;
    default:
      cd18Value = "";
      break;
  }

  if (isBudgetPage || isT20) {
    cd18Value = "category page";
  }
  if (isolympics) {
    cd18Value = "category page";
  }

  cd19value = !cd19value
    ? "No Video Player"
    : cd19value?.[cd19value?.length - 1] !== ","
    ? cd19value
    : cd19value.slice(0, cd19value?.length - 1);
  cd20value = !cd20value
    ? "No Video"
    : cd20value?.[cd20value?.length - 1] !== ","
    ? cd20value
    : cd20value.slice(0, cd20value?.length - 1);

  useEffect(() => {
    if (isHome && topNews.onoff === "on") {
      setTimeout(() => {
        loadTvfn();
      }, 2500);
    }
  }, []);

  const handleOnTrigger = useCallback((e) => {
    const event = e ? e : window.event;
    const from = event.relatedTarget || event.toElement;
    if (myStateRef.current) {
      if (!from || from.nodeName === "HTML") {
        setExitIntendPopUpOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    if (document.addEventListener) {
      document.addEventListener("mouseout", (e) => handleOnTrigger(e), false);
    } else if (document.attachEvent) {
      document.attachEvent("onmouseout", handleOnTrigger);
    }
    return () => {
      document.removeEventListener("mouseout", handleOnTrigger, false);
    };
  }, [handleOnTrigger]);

  // Pakistan Ellection
  // useEffect(()=>{
  //   getRedisDataByKey("KHABARN18-site_switcher_widget_assembly_election_dec2023",false,true)
  //   .then(res=>{
  //     if(res.site_switcher_widget_assembly_election.counting_poll){
  //       setcountingTally(res);
  //       setIsVisible(true);
  //     }
  //   }).catch(error=>{
  //     console.log(error);
  //   })
  // },[]);

  const handleCloseButtonClick = () => {
    setExitIntendPopUpOpen(false);
    setMyState(false);
    if (intervalId) {
      clearTimeout(intervalId);
    }
    intervalId = setTimeout(() => {
      setMyState(true);
    }, 50000);
  };

  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content="hi-IN" />
        <meta name="language" content="hi" />
        <meta
          itemProp="image"
          content={
            articleData.images ? articleData.images?.url : articleData.thumbnail
          }
        />
        <NewRelicRum />
        <NewRelicEvents />
        {taboolaList?.header?.page && (
          <TaboolaHeader page={taboolaList?.header?.page} />
        )}
      </Head>
      {OpenExitIntendPopup && (
        <ExitIntentPopup setExitIntendPopUpOpen={handleCloseButtonClick} />
      )}
      {/* {(isVisible &&
        countingTally?.site_switcher_widget_assembly_election?.counting_poll
          ?.counting_tally_across_flag === "1" &&
          countingTally?.site_switcher_widget_assembly_election?.counting_poll
          ?.status?.counting_live_flag === "1"
          ) && (
          <InternationalAcross instance={"result"} lang={"hi"} mode="prod" />
        )} */}
      <INIT_OOP_Manager pageAds={pageAds} isMobile={false} />
      {load && (
        <ScriptManager
          isAqi={isAqi}
          dtype={dtype}
          pageAds={pageAds}
          switches={switches}
          isVideoPage={isVideo}
          isArticle={isArticle}
          cd18value={cd18Value}
          cd14value={cd14Value}
          cd19value={cd19value}
          cd20value={cd20value}
          isFeature={isFeature}
          articleData={
            isBudgetPage || isNewsFeedPage
              ? { post_type: "category" }
              : articleData
          }
          callJsOnFkYt={callJsOnFkYt}
          taboolaVariable={taboolaVariable}
          nw_post_word_count={nw_post_word_count}
          vidStreamData={vidStreamData || {}}
          vid_exist={vid_exist}
          isT20={isT20}
          isolympics={isolympics}
          isBudgetPage={isBudgetPage}
        />
      )}

      {children}

      {isProKabaddi ? (
        <ProKabaddiHeader data={data} activeId={activeId} />
      ) : (
        <Header
          isAd={false}
          isIpl={isIpl}
          isT20={isT20}
          isTag={isTag}
          isHome={isHome}
          isHomeOnly={isHomeOnly}
          crMenu={crMenu}
          config={config}
          pageAds={pageAds}
          catName={catName}
          current={current}
          activeId={activeId}
          pageType={pageType}
          menuData={menuData}
          switches={switches}
          dynaMenu={dynaMenu}
          isArticle={isArticle}
          isEntPage={isEntPage}
          pageParam={_pageParam}
          isWorldCup={isWorldCup}
          _1xbetData={_1xbetData}
          isCategory={isCategory}
          islifePage={islifePage}
          categoryName={categoryName}
          trendingTags={trendingTags}
          background={EventBack || {}}
          isCricketNext={isCricketNext}
          showBannerInIPL={showBannerInIPL}
          showBannerInTag={showBannerInTag}
          showBannerInHome={showBannerInHome}
          isVideoWall={pageType === "videoWall"}
          VideoPage={_pageParam?.category || ""}
          electionWidgetData={electionWidgetData}
          isPhotoStory={pageType === "photo-story"}
          isWomenWorldCupPage={isWomenWorldCupPage || false}
          sponData={
            isWomenWorldCupPage ? { ...(sponsors?.header || {}) } : sponsors
          }
          isBudgetPage={isBudgetPage}
          onoff={
            isWomenWorldCupPage
              ? true
              : !isCricketNext && sponsors?.show_all_page === "1"
              ? true
              : false
          }
          showSponser={showSponser}
          liveTvFlag={liveTvFlag}
          showtopHeaderBanner={showtopHeaderBanner}
          isShowSponser={isShowSponser}
          mostRunsData={data?.mostRunsData}
          mostWickets={data?.mostWickets}
          pointsTableData={data?.pointsTableData}
          // counting_poll={counting_poll}
          // exit_poll={exit_poll}
          category_hi={category_hi}
          // budgetSwitcherData={pageCommonProps.budgetSwitcherData}
        />
      )}

      {/* {showHighlightWidget ? (
        <HighlightsWidget
          highlightsData={highlights}
          showLiveBlog={showLiveBlog}
          switchesData={Eventswitches}
          showSponserAd={showSponserAd}
        />
      ) : null} */}

      {isHome ||
      isTag ||
      isWebstory ||
      isCategory ||
      (isCricketNext && !isArticle && !isPhoto) ? (
        <MainComponent
          data={data}
          isIpl={isIpl}
          pageAds={pageAds}
          cd14Value={cd14Value}
          cd18Value={cd18Value}
          cd19value={cd19value}
          cd20value={cd20value}
          catVideoTrack={cd14Value}
          // counting_poll={counting_poll}
          // exit_poll={exit_poll}
          // budgetSwitcherData={pageCommonProps.budgetSwitcherData}
        />
      ) : (
        <MainComponent
          dtype={dtype}
          isDesktop={true}
          pageAds={pageAds}
          cd14Value={cd14Value}
          cd18Value={cd18Value}
          cd19value={cd19value}
          cd20value={cd20value}
          topPriorityData={data}
          data={data}
          catVideoTrack={cd14Value}
          setCurrentArticle={() => {}}
          // counting_poll={counting_poll}
          // exit_poll={exit_poll}
          // budgetSwitcherData={budgetSwitcherData}
          // budgetSwitcherData={pageCommonProps.budgetSwitcherData}
        />
      )}

      <Footer
        dtype={dtype}
        isHome={isHome}
        config={config}
        pageAds={pageAds}
        pageType={pageType}
        currentUrl={currentUrl}
        footerData={footerData}
        articleData={articleData}
        footerStories={footerStories}
        footerDataCat={footerDataCat}
        isCricketNext={isCricketNext}
        isT20={isT20}
        isWorldCup={isWorldCup}
        isVideoConsumption={isVideoConsumption}
        isVideoWall={pageType === "videoWall"}
        isWomenWorldCupPage={isWomenWorldCupPage}
      />
      <style jsx global>
        {DesktopLayoutStyle}
      </style>
    </>
  );
};

export default DesktopLayout;
