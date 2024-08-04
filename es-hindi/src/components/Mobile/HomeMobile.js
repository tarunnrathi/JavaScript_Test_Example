/* eslint-disable */
import dynamic from "next/dynamic";
import React from "react";
import ExclusiveNews from "components/Common/ExclusiveNews";
import HomeTopNews from "components/Mobile/home/HomeTopNews";
const SpecialNews = dynamic(() => import("components/Mobile/home/SpecialNews"));
import LazyLoad from "react-lazyload";
import Breaking from "components/Common/Breaking";
import AQIWidget from "components/Common/AQIWidget";
import Head from "next/head";
import { DynamicBanner } from "includes/article.util";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import TopBannerApp from "widgets/Mobile/TopBannerApp";
import LiveBlogList from "components/Common/LiveBlogList";

import getConfig from "next/config";
// import BudgetHomeWidgetMobile from "./home/BudgetHomeWidget";
import SpecialLiveBlogMobile from "./SpecialLiveBlogMobile";
import HomeLiveTv from "./home/HomeLiveTv";

const { publicRuntimeConfig } = getConfig();

// const HomeLiveTv = dynamic(() => import("components/Mobile/home/HomeLiveTv"), {
//   ssr: false,
// });

const HomeRashifalWidget = dynamic(() =>
  import("components/Desktop/home/HomeRashifalWidget")
);
const NewSiteAd = dynamic(() => import("widgets/Common/Responsive/NewSiteAd"));
const HomeNavratri2022 = dynamic(() =>
  import("components/Common/HomeNavratri2022")
);

// const CricketNewsHome = dynamic(() =>
//   import("components/Mobile/home/CricketNewsHome"),
// );

const PhotoGallery = dynamic(() =>
  import("components/Mobile/home/PhotoGallery")
);
const Minis = dynamic(() => import("components/Mobile/home/Minis"));
const ShortStory = dynamic(() => import("components/Common/HomeShortVideos"));
const WebStory = dynamic(() => import("components/Desktop/homepage/WebStory"));
import EventCoverageTheme1 from "components/Common/EventCoverageTheme1";
import EventCoverageTheme2Mweb from "components/Common/EventCoverageTheme2Mweb";
// import HomeEl from "../../../common_react/CommonSrc/CommonComponents/election/home/HomeEL";
// import ExitPollHome from "../../../common_react/CommonSrc/CommonComponents/election/exitPollHome/ExitPollHome";
// import BudgetNewsMobile from "components/Common/budget/BudgetNewsMobile";
const GetArticleSideBarList = dynamic(() =>
  import("components/Mobile/home/GetArticleSideBarList")
);
const GetArticleSideBar = dynamic(() =>
  import("components/Mobile/home/GetArticleSideBar")
);
const GetSlider = dynamic(() => import("components/Mobile/common/GetSlider"));
const GetVideoSlider = dynamic(() =>
  import("components/Mobile/common/GetVideoSlider")
);

const PradeshNewsList = dynamic(() =>
  import("components/Mobile/home/PradeshNewsList")
);

const ArticleListByCategory = dynamic(() =>
  import("components/Desktop/homepage/ArticleListByCategory")
);

const BlogList = dynamic(() => import("components/Mobile/home/BlogList"));

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
const ShortNewsHome = dynamic(() =>
  import("widgets/Common/Desktop/ShortNewsHome")
);

const HomeMobile = ({ data = {} /* , budgetSwitcherData = {} */ }) => {
  const {
    pageAds,
    cricketNewsHome: { live = "false" } = {},
    switchAds,
    // videogallerySsr,
    originalVideos,
    navratriVideoFeed,
    navratriVideoData,
    dynamicBanner,
    breaking,
    exnews,
    homeTrendStory,
    currentUrl,
    eventSlider,
    // cricketNewsHome,
    // cricketWidgetSponsorsData,
    pradeshNews,
    pradeshLineUp,
    newsMini,
    // topHomeNews,
    webStoriesSsr,
    shortVideosSsr,
    aqiDataSsr = [],
    techNewsSSR,
    foodDataSsr = [],
    photogalleryNews,
    Sahitya = [],
    AjabGajab = [],
    blogDataSsr = [],
    CartoonCornerDataSsr = [],
    // videowallPortraitData=[],
    // videowallLandscapeData=[],
    getCricketArticles,
    getBollywoodArticles,
    getSportsArticles,
    getMoneyArticles,
    // districtList,
    switches,
    // topNews
    // budgetHomeData,
    liveBlogList = [],
    specialLiveBlog,
    rashifalData,
    eventCoverageSwitcher = {},
    liveTvPosition,
    short_news_rhs,
    medalTally,
    // pageContent,
    topNewsStoryData
  } = data;

  // const { budget_home = "0", budget_live_tv_onoff = "0" } =
  //   budgetSwitcherData || {};

  let adTwo = (
    <div className="clearfix add">
      <div className="addinner-box addinner_box_300x250">
        <NewSiteAd
          width={300}
          height={250}
          slotId={"mobileAdNew300x250_0"}
          adUnit={pageAds.mobile_first}
          sizes={[
            [300, 250],
            [336, 280],
          ]}
          //lazyLoad={true}
        ></NewSiteAd>
      </div>
    </div>
  );

  /* for navratri 2022 video feeds */
  let navratriVideoSwitch = false;
  if (navratriVideoFeed) {
    if (
      navratriVideoFeed?.streaming?.video_feed == "on" &&
      navratriVideoFeed?.streaming?.livefeedhome == "on"
    ) {
      navratriVideoSwitch = true;
    }
  }

  if (switchAds && switchAds.value == "true") {
    [adTwo] = [adTwo];
  }

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="600" />
        <script async type="text/javascript">{`
        setTimeout(() => {
        (function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "kxxjg01c8x");
      }, 3000);
        `}</script>
      </Head>
      {/* {topHomeNews?.onoff && topHomeNews?.onoff === "on" && (
        <LazyLoad height={598} once>
          <HomeLiveTv props={data} />
        </LazyLoad>
      )} */}
      {liveTvPosition != {} &&
        liveTvPosition?.live_tv == "true" &&
        liveTvPosition?.top_block_slot1 == true && (
          <LazyLoad height={598} once>
            <HomeLiveTv props={data} />
          </LazyLoad>
        )}
      {pageAds.PG_1x1_2 && (
        <NewSiteAd
          slotId={"PG_1x1_2"}
          adUnit={pageAds.PG_1x1_2}
          sizes={[[1, 1]]}
          //loadOnScroll={true}
          removeAdSpan={true}
        ></NewSiteAd>
      )}

      {pageAds.PG_1x1_3 && (
        <NewSiteAd
          slotId={"PG_1x1_3"}
          adUnit={pageAds.PG_1x1_3}
          sizes={[[1, 1]]}
          loadOnScroll={true}
          removeAdSpan={true}
        ></NewSiteAd>
      )}

      {switches?.score && (
        <DynamicCrTopScoreWidgetWithNoSSR
          isMobile={true}
          isHome={true}
          isT20={true}
        />
      )}
      <DynamicBanner data={dynamicBanner} obkey={"Below-L2"} isMobile={true} />
      {/* {budget_home_widget_live === "1" && (
        <BudgetHomeWidgetMobile
          homeBudgetNews={budgetHomeData}
          eventSwitches={budgetSwitcherData}
          isMobile={true}
        />
      )} */}
      <Breaking data={breaking} isMobile={true} />
      {eventCoverageSwitcher &&
      Object.keys(eventCoverageSwitcher).length > 0 &&
      eventCoverageSwitcher?.[0]?.status == "1" ? (
        eventCoverageSwitcher?.[0]?.theme == "1" &&
        eventCoverageSwitcher?.[0]?.page == "homepage" ? (
          <EventCoverageTheme1
            data={data}
            liveTvPosition={liveTvPosition}
            isMobile
          />
        ) : (
          eventCoverageSwitcher?.[0]?.theme == "2" &&
          eventCoverageSwitcher?.[0]?.page == "homepage" && (
            <EventCoverageTheme2Mweb
              data={data}
              liveTvPosition={liveTvPosition}
            />
          )
        )
      ) : null}

      {specialLiveBlog?.switch_status === "1" && (
        <SpecialLiveBlogMobile blogContent={specialLiveBlog} />
      )}
      {/* {budget_home === "1" && (
        <BudgetNewsMobile
          homeBudgetNews={pageContent?.budgetHomeData}
          eventSwitches={budgetSwitcherData}
          pageAds={pageAds}
          graphics={pageContent?.graphics}
          isBudgetPage={false}
          isMobile={true}
          budgetYear={pageContent?.budgetYear}
          glossarySponsor={pageContent?.glossarySponsor}
          adTwo={adTwo}
        />
      )} */}

      <ExclusiveNews exnews={exnews} isMobile={true} />
      {navratriVideoSwitch && (
        <HomeNavratri2022
          navratriFlags={navratriVideoFeed}
          navratriStreaming={navratriVideoData}
          isMobile={true}
        />
      )}
      <HomeTopNews
        props={data}
        adTwo={adTwo}
        trendStory={homeTrendStory}
        currentUrl={currentUrl}
        isBudget={false}
      />

      <TopBannerApp />
      {liveTvPosition != {} &&
        liveTvPosition?.live_tv == "true" &&
        liveTvPosition?.top_block_slot3 == true && (
          <LazyLoad height={598} once>
            <HomeLiveTv
              props={data}
              medalTally={medalTally}
              pageAds={pageAds}
              isMobile={true}
            />
          </LazyLoad>
        )}

      <DynamicBanner
        data={dynamicBanner}
        obkey={"Below-Top-Stories"}
        isMobile={true}
      />

      <div className="containerNew">
        <SpecialNews NewsData={eventSlider} />
        <div className="clearfix add">
          <div className="addinner-box addinner_box_300x250">
            <NewSiteAd
              slotId={"PG_1x1"}
              adUnit={
                "NW18_HIND_PWA/NW18_HIND_HOME_PWA/NW18_HIND_HOME_HOME_PWA/NW18_HIND_PWA_HP_PG_1x1"
              }
              sizes={[[1, 1]]}
              loadOnScroll={true}
              removeAdSpan={true}
            ></NewSiteAd>
            <NewSiteAd
              slotId={"mobileAdNew300x250_1"}
              adUnit={pageAds.mobile_second}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={300}
              height={250}
              lazyLoad={true}
            ></NewSiteAd>
            <NewSiteAd
              slotId={"PG_Slider_1x1_home"}
              adUnit={
                "NW18_HIND_PWA/NW18_HIND_HOME_PWA/NW18_HIND_HOME_HOME_PWA/NW18_HIND_PWA_HP_PG_SLIDER_1x1"
              }
              sizes={[[1, 1]]}
              loadOnScroll={true}
              removeAdSpan={true}
            ></NewSiteAd>
          </div>
        </div>

        {/* {live && live == "true" ? (
          <CricketNewsHome
            sportsNews={cricketNewsHome}
            sponsors={cricketWidgetSponsorsData}
            isMobile={true}
          />
        ) : (
          <ArticleListByCategory
            heading="क्रिकेट वर्ल्ड कप"
            isSubMenu={true}
            data={getCricketArticles}
            categoryLink={publicRuntimeConfig.siteUrl + "world-cup/"}
            key={`cricketCat`}
            category="cricket"
            isMobile={true}
          />
        )} */}

        <ArticleListByCategory
          heading="क्रिकेट"
          isSubMenu={false}
          data={getCricketArticles}
          categoryLink={publicRuntimeConfig.siteUrl + "cricket/"}
          key={`cricketCat`}
          category="cricket"
          isMobile={true}
        />
        <ArticleListByCategory
          heading="पेरिस ओलंपिक 2024"
          isSubMenu={false}
          data={topNewsStoryData}
          categoryLink={publicRuntimeConfig.siteUrl + "sports/olympics/"}
          key={``}
          category=""
          isMobile={true}
        />

        {/* <ArticleListByCategory
            heading="एशियन गेम्स 2023"
            isSubMenu={true}
            data={topNews}
            categoryLink={publicRuntimeConfig.siteUrl + "sports/asian-games/"}
            key={`asian_game_2023`}
            category="asian_game_2023"
            isMobile={true}
        /> */}
        <ShortNewsHome short_news_rhs={short_news_rhs} isMobile={true} />
        {rashifalData?.length > 0 && (
          <HomeRashifalWidget
            isMobile={true}
            isHome={true}
            rashifalData={rashifalData}
            isRhs={true}
          />
        )}

        <ArticleListByCategory
          heading="बॉलीवुड"
          isSubMenu={true}
          data={getBollywoodArticles}
          categoryLink={publicRuntimeConfig.siteUrl + "news/entertainment/"}
          key={`bollywoodCat`}
          category="entertainment"
          isMobile={true}
        />

        <PradeshNewsList
          pradeshNews={pradeshNews}
          stateList={pradeshLineUp}
          // districtList={districtList}
          isMobile={true}
        />
        <LiveBlogList
          liveBlogList={liveBlogList}
          isMobile={true}
          utm_medium="home_page"
        />
        {/* <ElectionSchedule /> */}

        <DynamicBanner
          data={dynamicBanner}
          obkey={"Above-State-Widget"}
          isMobile={true}
        />
        <Minis data={newsMini} />

        {/*
        <MobileDataPageWidget
          mobileNewsData={mobileNewsData}
        />
         */}

        <div className="clearfix add">
          <div className="addinner-box avinash">
            {/* <SiteAd
              width={300}
              height={250}
              slotId={"div-gpt-ad-12356"}
              adUnit={pageAds.mobile_fifth}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
           lazyload={true}
            ></SiteAd> */}
            <NewSiteAd
              slotId={"div-gpt-ad-12356"}
              adUnit={pageAds.mobile_fifth}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={300}
              height={250}
              lazyLoad={true}
            ></NewSiteAd>
          </div>
        </div>
        <AQIWidget isMobile={true} aqiData={aqiDataSsr} />
        <ShortStory isMobile={true} shortVideos={shortVideosSsr} />

        <WebStory
          isMobile={true}
          webStories={webStoriesSsr}
          categoryLink={publicRuntimeConfig.siteUrl + "web-stories/"}
        />

        <ArticleListByCategory
          heading="मनी"
          isSubMenu={true}
          data={getMoneyArticles}
          categoryLink={publicRuntimeConfig.siteUrl + "news/business/"}
          key={`businessCat`}
          category="business"
          isMobile={true}
        />

        <ArticleListByCategory
          heading="खेल"
          isSubMenu={true}
          data={getSportsArticles}
          categoryLink={publicRuntimeConfig.siteUrl + "news/sports/"}
          key={`sportsCat`}
          category="sports"
          isMobile={true}
        />
        <ArticleListByCategory
          heading="मोबाइल-टेक"
          isSubMenu={true}
          data={techNewsSSR}
          categoryLink={publicRuntimeConfig.siteUrl + "news/tech/"}
          key={`techCat`}
          category="tech"
          isMobile={true}
        />

        <LazyLoad height={675} once>
          <GetArticleSideBar
            heading="नॉलेज"
            isSubMenu={false}
            categoryLink={publicRuntimeConfig.siteUrl + "news/knowledge/"}
            key={`knowledgeCat`}
            category="knowledge"
            isAmp={false}
          />
        </LazyLoad>

        <LazyLoad height={675} once>
          <GetArticleSideBar
            heading="नौकरी"
            isSubMenu={true}
            categoryLink={publicRuntimeConfig.siteUrl + "news/jobs/"}
            key={`knowledgeCat`}
            category="jobs"
            isAmp={false}
          />
        </LazyLoad>

        <LazyLoad height={675} once>
          <GetSlider
            heading="फूड"
            data={foodDataSsr}
            categoryLink={
              publicRuntimeConfig.siteUrl + "news/lifestyle/recipe/"
            }
            key={`recipeCat`}
            category="recipe"
            buttonType={`beckground`}
          />
        </LazyLoad>
        <LazyLoad height={675} once>
          <GetArticleSideBar
            heading="दुनिया"
            isSubMenu={false}
            categoryLink={publicRuntimeConfig.siteUrl + "news/world/"}
            key={`worldCat`}
            category="world"
            isAmp={false}
          />
        </LazyLoad>

        <PhotoGallery
          heading="सुपरहिट गैलरी"
          data={photogalleryNews}
          categoryLink={publicRuntimeConfig.siteUrl + "photogallery/"}
          key={`photogalleryCat`}
          category="photogallery"
          buttonType={`beckground`}
        />

        <LazyLoad height={675} once>
          <GetArticleSideBarList
            heading="हेल्थ & फिटनेस"
            isSubMenu={false}
            categoryLink={
              publicRuntimeConfig.siteUrl + "news/lifestyle/health/"
            }
            key={`healthCat`}
            category="health"
            isAmp={false}
          />
        </LazyLoad>

        <LazyLoad height={675} once>
          <GetArticleSideBarList
            heading="करियर"
            isSubMenu={false}
            categoryLink={publicRuntimeConfig.siteUrl + "news/career/"}
            key={`careerCat`}
            category="career"
            isAmp={false}
            isDisplayTopBar={true}
            item={3}
          />
        </LazyLoad>

        <ArticleListByCategory
          heading="साहित्य"
          isSubMenu={false}
          data={Sahitya}
          categoryLink={publicRuntimeConfig.siteUrl + "news/literature/"}
          key={`literatureCat`}
          category="literature"
          isMobile={true}
        />

        <GetArticleSideBarList
          heading="अजब-गजब"
          isSubMenu={false}
          data={AjabGajab}
          categoryLink={publicRuntimeConfig.siteUrl + "news/ajab-gajab/"}
          key={`ajabGajabCat`}
          category="ajab-gajab"
          isMobile={true}
        />
        <LazyLoad height={675} once>
          <BlogList
            data={blogDataSsr}
            categoryLink={publicRuntimeConfig.siteUrl + "blogs/"}
          />
        </LazyLoad>

        <LazyLoad height={675} once>
          <GetSlider
            heading="कार्टून कॉर्नर"
            data={CartoonCornerDataSsr}
            categoryLink={publicRuntimeConfig.siteUrl + "news/cartoon-corner/"}
            key={`cartoonCornerCat`}
            category="cartoon-corner"
            buttonType={`beckground`}
          />
        </LazyLoad>
        <LazyLoad height={675} once>
          <GetArticleSideBar
            heading="ऑटो"
            isSubMenu={false}
            categoryLink={publicRuntimeConfig.siteUrl + "news/auto/"}
            key={`autoCat`}
            category="auto"
            isAmp={false}
          />
        </LazyLoad>
        <LazyLoad height={675} once>
          <GetArticleSideBar
            heading="देश"
            isSubMenu={false}
            categoryLink={publicRuntimeConfig.siteUrl + "news/nation/"}
            key={`nationCat`}
            category="nation"
            isAmp={false}
          />
        </LazyLoad>
        <LazyLoad height={675} once>
          <GetArticleSideBar
            heading="धर्म"
            isSubMenu={false}
            categoryLink={publicRuntimeConfig.siteUrl + "news/dharm/"}
            key={`dharmCat`}
            category="dharm"
            isAmp={false}
          />
        </LazyLoad>
        <LazyLoad height={675} once>
          <GetArticleSideBar
            heading="लाइफ़"
            isSubMenu={false}
            categoryLink={publicRuntimeConfig.siteUrl + "news/lifestyle/"}
            key={`lifestyleCat`}
            category="lifestyle"
            isAmp={false}
          />
        </LazyLoad>
        <LazyLoad height={675} once>
          <GetVideoSlider
            heading="टॉप वीडियो"
            isSubMenu={false}
            data={originalVideos}
            categoryLink={publicRuntimeConfig.siteUrl + "videos/originals/"}
            key={`videosOrgCat`}
            category="videosOrgCat"
            buttonType={`beckground`}
          />
        </LazyLoad>

        {/* <LazyLoad height={675} once>
          <GetVideoSlider
            heading="टॉप वीडियो"
            isSubMenu={false}
            data={videogallerySsr}
            categoryLink={publicRuntimeConfig.siteUrl + "videos/"}
            key={`videosCat`}
            category="videosCat"
            buttonType={`beckground`}
          />
        </LazyLoad> */}

        <LazyLoad height={675} once>
          <GetArticleSideBar
            heading="क्राइम"
            isSubMenu={false}
            categoryLink={publicRuntimeConfig.siteUrl + "news/crime/"}
            key={`crimeCat`}
            category="crime"
            isAmp={false}
          />
        </LazyLoad>

        <Taboola
          mode={TaboolaList.homePage.bottom.mode}
          id={TaboolaList.homePage.bottom.id}
          container={TaboolaList.homePage.bottom.container}
          placement={TaboolaList.homePage.bottom.placement}
        />
      </div>
      <style jsx global>
        {`
          .mrg10 {
            margin: 10px;
          }
          .vsp20 {
            height: 20px;
            line-height: 0;
          }
          .vsp10 {
            height: 10px;
            line-height: 0;
          }
          .scr-strp {
            overflow: hidden;
            height: 147px;
          }
          .scrd-mtchdetl2 {
            height: 98px;
          }
          .containerNew {
            position: relative;
            overflow: hidden;
          }
          .add {
            background: #dbdde3 !important;
          }
          .add,
          .add2 {
            background: #dbdde3;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
            z-index: 1;
            height: 282px;
          }
          .clearfix:after,
          .clearfix:before {
            content: "";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            height: 0;
          }
          .addinner-box {
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
          .container-ad {
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 20px;
          }
          .align {
            text-align: center;
          }
          .quiz-heading {
            margin-boottom: 5px;
          }
          .CN-scoreCardsection {
            position: relative;
            background: #f5f5f5;
            border-bottom: 1px solid #d8d8d8;
            padding: 12px 10px;
            margin-bottom: 10px;
          }
          .banner_cricket {
            width: 100%;
            text-align: center;
          }
          .banner_cricket img {
            width: 100%;
            display: block;
          }
          #div-gpt-ad-1632314637116-0 {
            text-align: center;
          }
          body .ayodhyaspecial-slider li a h3 {
            font-size: 16px;
            font-weight: bold;
          }
          body .photogallery li:first-child h2,
          body .photogallery li:first-child h3 {
            padding: 20px 0px 10px;
            position: static;
            font-size: 18px;
            line-height: 32px;
          }
          body ul.photogallery li h2,
          body ul.photogallery li h3 {
            font-size: 16px;
            line-height: 24px;
            padding: 20px 0px 10px;
            height: 90px;
            box-sizing: border-box;
            overflow: hidden;
          }
          body .ayodhyaspecial-slider li a h3 {
            line-height: 24px;
          }
          body .web_stories .slick-dots li.slick-active button::before {
            top: 0;
          }
          body .web_stories .slide a figure {
            margin-bottom: 8px;
          }
          body .Minis_slider .contentBox {
            padding: 10px 10px 0 10px;
          }
          body .Minis_slider .contentBox .heading_1 {
            font-size: 18px;
            line-height: 24px;
          }
          body .Minis_slider .contentBox p {
            font-size: 16px;
          }
          .nwvideoicon {
            width: 45px;
            height: 45px;
            top: 50%;
            left: 50%;
            position: absolute;
            z-index: 1;
            margin: -22px 0 0 -22px;
            cursor: pointer;
            opacity: 0.7;
            background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
            transform: scale(1);
          }
          .global-storylist li .nwvideoicon {
            top: 48%;
            left: 40px;
            transform: scale(0.7);
          }
          .logo_im_g img {
            width: auto;
            display: flex;
            justify-content: center;
            margin: 10px auto 10px;
          }
          .formoneyspecial em {
            width: 60px;
            display: inline-block;
            line-height: 12px;
            font-size: 11px;
            text-align: right;
            margin-right: 5px;
            top: 2px;
          }
          .medalHopeHeadingInner .heading-1 {
            color: red;
            font-weight: 400;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 3.7px;
            line-height: 12px;
          }
        `}
      </style>
    </>
  );
};

export default HomeMobile;
