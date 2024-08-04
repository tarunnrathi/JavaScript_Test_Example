import Head from "next/head";
import dynamic from "next/dynamic";
import HeaderMobile from "widgets/Mobile/HeaderMobile";
import FooterMobile from "widgets/Mobile/FooterMobile";
import NewRelicRum from "components/Common/NewRelicRum";
import NewRelicEvents from "components/Common/NewRelicEvents";
import MobileLayoutStyle from "styles/Mobile/MobileLayoutStyle";
import ScriptManager from "../../components/Common/ScriptManager";
import INIT_OOP_Manager from "components/Common/INIT_OOP_Manager";
import { /* useContext, */ useState } from "react";
// import HindiGlobalContext from "HindiGlobalContext";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
// import HindiGlobalContext from "HindiGlobalContext";
// import InternationalAcross from "../../../common_react/CommonSrc/CommonComponents/election/InternationalAcross";
// import { getRedisDataByKey } from "api/global/Common";

const TaboolaHeader = dynamic(() =>
  import("widgets/Common/Responsive/TaboolaHeader")
);
const ProKabaddiHeader = dynamic(() =>
  import("widgets/Mobile/ProKabaddiHeaderMobile")
);

// const SponserMobile = dynamic(() => import("widgets/Mobile/SponserMobile"));

const MobileLayout = ({
  isIpl,
  data,
  isAqi,
  isT20,
  isWorldCup,
  pageAds,
  isVideo,
  current,
  pageType,
  children,
  activeId,
  isArticle,
  isWebstory,
  isCategory,
  dtype = "",
  isTag = false,
  isCricketNext,
  isHome = false,
  isHomeOnly = false,
  mainComponent: MainComponent,
  isProKabaddi,
  isVideoConsumption,
  showSponser,
  isBudgetPage,
  isNewsFeedPage = false,
  showtopHeaderBanner,
  // isShowSponser = true,
  isolympics = false,
}) => {
  const {
    loadTv,
    crMenu,
    imageM,
    catName,
    paramObj,
    switches,
    menuData,
    isFeature,
    _1xbetData,
    footerData,
    isEntPage,
    islifePage,
    categoryName,
    callJsOnFkYt,
    dynaMenu = [],
    footerDataCat,
    sponsors = {},
    EventBack = {},
    currentUrl = "",
    showBannerInTag,
    _pageParam = {},
    articleData = {},
    taboolaList = {},
    liveCricketScore,
    // districtList = [],
    showBannerInHome,
    showBannerInIPL,
    isWomenWorldCupPage = false,
    electionWidgetData = false,
    liveTvElectionFooterUrl = "",
    vidStreamData,
    vid_exist,
    liveTvFlag,
  } = data;

  const { cd19value, cd20value } = data;
  const [toggleMenu, setToggleMenu] = useState(false);
  // const { pageCommonProps = {} } = useContext(HindiGlobalContext);
  // const[countingTally,setcountingTally] = useState({});
  // const[isVisible,setIsVisible] = useState(false);
  // const { pageCommonProps = {} } = useContext(HindiGlobalContext);
  // const { switcher_widget: { counting_poll = {}, exit_poll = {} } = {} } =
  //   pageCommonProps?.electionSwitcherData || {};

  let taboolaVariable = false;

  if (
    pageType === "article" ||
    pageType === "category" ||
    pageType === "homePage" ||
    pageType === "photogallery" ||
    pageType === "video" ||
    dtype === "category" ||
    pageType === "boardresult" ||
    pageType === "home"
  ) {
    if (dtype !== "tag" || !isTag) {
      taboolaVariable = true;
    }
  }
  const nw_post_word_count =
    pageType === "article" || pageType === "category"
      ? articleData?.nw_post_word_count || data?.nw_post_word_count
      : pageType === "photogallery"
      ? articleData?.gallery?.[0]?.word_count
      : false;

  let cd18Value = "";
  let cd14Value = "";

  const allSlashSplitted =
    articleData?.weburl?.split("/") || currentUrl?.split("/");

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
  } else {
    cd14Value = _pageParam.category;
  }
  if (isNewsFeedPage) {
    cd14Value = "news feed";
  }
  if (isT20) {
    cd14Value = "cricket";
  }

  if (isBudgetPage) {
    cd14Value = "budget";
  }

  switch (pageType) {
    case "article":
      cd18Value = "Article";
      break;
    case "home":
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
      break;
  }

  if (isBudgetPage || isT20) {
    cd18Value = "category page";
  }

  const toggeleHandler = (e) => {
    if (e) e.preventDefault();
    const tempToggle = !toggleMenu;
    setToggleMenu(tempToggle);

    if (!tempToggle) {
      // setToggleLangMenu(false);
      setToggleMenu(false);
      document.querySelectorAll("ul.sub-navg").forEach((el) => {
        el.classList.remove("scrlsbnv");
      });
    }
  };

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

  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content="hi-IN" />
        <meta name="language" content="hi" />
        <meta
          itemProp="image"
          content={
            articleData?.images
              ? articleData?.images?.url
              : articleData?.thumbnail
          }
        />

        <NewRelicRum />
        <NewRelicEvents />
        {taboolaList?.header?.page && (
          <TaboolaHeader page={taboolaList?.header?.page} />
        )}
      </Head>
      {/* {(isVisible &&
        countingTally?.site_switcher_widget_assembly_election?.counting_poll
          ?.counting_tally_across_flag === "1" &&
          countingTally?.site_switcher_widget_assembly_election?.counting_poll
          ?.status?.counting_live_flag === "1"
          ) && (
          <InternationalAcross instance={"result"} lang={"hi"} mode="prod" />
        )} */}
      <INIT_OOP_Manager pageAds={pageAds} isMobile={true} />
      <ScriptManager
        dtype={dtype}
        isVideo={true}
        isMobile={true}
        loadTv={loadTv}
        pageAds={pageAds}
        paramObj={paramObj}
        switches={switches}
        isArticle={isArticle}
        isVideoPage={isVideo}
        cd14value={cd14Value}
        isFeature={isFeature}
        category={categoryName}
        articleData={
          isBudgetPage || isNewsFeedPage
            ? { post_type: "category" }
            : articleData
        }
        callJsOnFkYt={callJsOnFkYt}
        isCricketNext={isCricketNext}
        cd18value={cd18Value || pageType}
        taboolaVariable={taboolaVariable}
        liveCricketScore={liveCricketScore}
        nw_post_word_count={nw_post_word_count}
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
        vidStreamData={vidStreamData || {}}
        vid_exist={vid_exist}
        isT20={isT20}
      />
      {isIpl && liveTvFlag?.widget?.companion_banner === "1" && (
        <div
          style={{
            width: "100%",
            height: 60,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NewSiteAd
            slotId="BUDGET_HEADER_AD_PWA"
            adUnit={
              "NW18_HIND_PWA/NW18_HIND_HOME_EVENT_PWA/NW18_HIND_HOME_HOME_EVENT_PWA/NW18_HIND_EVNT_PWA_HP_ROS_EVENT_TOP_360x60"
            }
            sizes={[[360, 60]]}
            width={360}
            height={60}
            removeAdSpan={true}
            lazyLoad={true}
          />
        </div>
      )}

      {/* {isShowSponser && showSponser && !isT20 && (
        <SponserMobile _1xbetData={_1xbetData} isT20={isT20} />
      )} */}
      {isProKabaddi && <ProKabaddiHeader activeId={activeId} data={data} />}
      {children}
      {!isProKabaddi && pageType !== "photo-story" && (
        <HeaderMobile
          isIpl={isIpl}
          isAqi={isAqi}
          isT20={isT20}
          isTag={isTag}
          imageM={imageM}
          crMenu={crMenu}
          isHome={isHome}
          isHomeOnly={isHomeOnly}
          pageAds={pageAds}
          catName={catName}
          current={current}
          menuData={menuData}
          pageType={pageType}
          dynaMenu={dynaMenu}
          switches={switches}
          activeId={activeId}
          isArticle={isArticle}
          isEntPage={isEntPage}
          trending={menuData["MENU-L2"] || []}
          pageParam={_pageParam}
          isWorldCup={isWorldCup}
          _1xbetData={_1xbetData}
          islifePage={islifePage}
          categoryName={categoryName}
          // districtList={districtList}
          isCricketNext={isCricketNext}
          showBannerInIPL={showBannerInIPL}
          showBannerInTag={showBannerInTag}
          showBannerInHome={showBannerInHome}
          showSponser={showSponser}
          electionWidgetData={electionWidgetData}
          showtopHeaderBanner={showtopHeaderBanner}
          isWomenWorldCupPage={isWomenWorldCupPage}
          sponData={
            isWomenWorldCupPage
              ? { sponserdata: { ...(sponsors.header || {}) } }
              : sponsors
              ? sponsors
              : {}
          }
          background={pageType === "home" ? EventBack || {} : {}}
          onoff={
            isWomenWorldCupPage
              ? true
              : !isCricketNext && sponsors.show_all_page === "1"
              ? true
              : false
          }
          toggeleHandler={toggeleHandler}
          toggleMenu={toggleMenu}
          isBudgetPage={isBudgetPage}
          mostRunsData={data?.mostRunsData}
          mostWickets={data?.mostWickets}
          pointsTableData={data?.pointsTableData}
          dtype={dtype}
          // budgetSwitcherData={pageCommonProps.budgetSwitcherData}
          // counting_poll={counting_poll}
          // exit_poll={exit_poll}
        />
      )}

      {isHome || isTag || isWebstory || isCategory ? (
        <MainComponent
          data={data}
          catVideoTrack={cd14Value}
          isIpl={isIpl}
          // budgetSwitcherData={pageCommonProps.budgetSwitcherData}
          // counting_poll={counting_poll}
          // exit_poll={exit_poll}
        />
      ) : (
        <MainComponent
          isMobile
          data={data}
          dtype={dtype}
          isIpl={isIpl}
          pageAds={pageAds}
          topPriorityData={data}
          catVideoTrack={cd14Value}
          setCurrentArticle={() => {}}
          // budgetSwitcherData={pageCommonProps.budgetSwitcherData}
          // counting_poll={counting_poll}
          // exit_poll={exit_poll}
        />
      )}
      <FooterMobile
        dtype={dtype}
        pageAds={pageAds}
        currentUrl={currentUrl}
        pageType={pageType}
        isArticle={isArticle}
        footerData={footerData}
        articleData={articleData}
        isVideoConsumption={isVideoConsumption}
        footerDataCat={footerDataCat}
        isCricketNext={isCricketNext}
        isVideoWall={pageType === "videoWall"}
        isPhotoStory={pageType === "photo-story"}
        isWomenWorldCupPage={isWomenWorldCupPage}
        liveTvElectionFooterUrl={liveTvElectionFooterUrl}
        onoff={sponsors.show_all_page === "1" ? true : false}
        menuData={menuData}
        toggeleHandler={toggeleHandler}
        isolympics={isolympics}
      />
      <style jsx global>
        {MobileLayoutStyle}
      </style>
    </>
  );
};

export default MobileLayout;
