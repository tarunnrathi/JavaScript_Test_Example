import React, { useEffect, useState } from "react";
import Head from "next/head";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import dynamic from "next/dynamic";

import ExclusiveNews from "components/Common/ExclusiveNews";
import NewsMini from "components/Desktop/homepage/NewsMini";
import HomeEventSlider from "components/Desktop/home/HomeEventSlider";
import LazyLoad from "react-lazyload";
import Breaking from "components/Common/Breaking";
import AQIWidget from "components/Common/AQIWidget";
import Glide from "@glidejs/glide";
import { DynamicBanner } from "includes/article.util";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import LiveBlogList from "components/Common/LiveBlogList";
import SpecialLiveBlog from "./SpecialLiveBlog";

const HomeNavratri2022 = dynamic(() =>
  import("components/Common/HomeNavratri2022")
);

const AllSectionWrap = dynamic(() =>
  import("components/Desktop/homepage/AllSectionWrap")
);
const ImageWithListRHS = dynamic(() =>
  import("components/Desktop/homepage/ImageWithListRHS")
);
const GetSlider = dynamic(() =>
  import("components/Desktop/homepage/GetSlider")
);
const CricketNewsHome = dynamic(() =>
  import("components/Desktop/home/CricketNewsHome")
);

import HomeTopNews from "components/Desktop/homepage/HomeTopNews";
import GetArticleSideBarList from "components/Desktop/homepage/GetArticleSideBarList";
import EventCoverageTheme2 from "components/Common/EventCoverageTheme2";
import EventCoverageTheme1 from "components/Common/EventCoverageTheme1";
// import BudgetNewsDesktop from "./homepage/BudgetHomeWidget";
 import MedalTally from "components/Common/Olympics/MedalTally";
// import HomeEl from "../../../common_react/CommonSrc/CommonComponents/election/home/HomeEL";
// import ExitPollHome from "../../../common_react/CommonSrc/CommonComponents/election/exitPollHome/ExitPollHome";
// import BudgetHomeWidget from "./homepage/BudgetHomeWidget";
// import BudgetGlossaryWidget from "components/Common/budget/BudgetGlossaryWidget";

const HomeStoryRefresh = dynamic(() =>
  import("components/Common/HomeStoryRefresh")
);

const HomeRashifalWidget = dynamic(() => import("./home/HomeRashifalWidget"));

const GetArticleSideBarListAuto = dynamic(() =>
  import("components/Desktop/homepage/GetArticleSideBarListAuto")
);
const WebStory = dynamic(() => import("components/Desktop/homepage/WebStory"));
const ShortStory = dynamic(() => import("components/Common/HomeShortVideos"));

const PhotogalleryNews = dynamic(() =>
  import("components/Desktop/homepage/Photogallery")
);

const HomeTrending = dynamic(() =>
  import("components/Desktop/homepage/HomeTrending")
);
const ArticleListByCategory = dynamic(() =>
  import("components/Desktop/homepage/ArticleListByCategory")
);

const VideoList = dynamic(() =>
  import("components/Desktop/homepage/VideoList")
);
const BlogList = dynamic(() => import("components/Desktop/homepage/BlogList"));

const PradeshNewsList = dynamic(() =>
  import("components/Desktop/homepage/PradeshNewsList")
);
const ShortNewsHome = dynamic(() =>
  import("widgets/Common/Desktop/ShortNewsHome")
);

const Home = ({ data, pageAds = {} }) => {
  const {
    cricketNewsHome: { live = "false" } = {},
    navratriVideoFeed = { streaming: {} },
    navratriVideoData,
    dynamicBanner,
    breaking,
    exnews,
    homeTrendStory,
    eventSlider,
    cricketNewsHome,
    cricketWidgetSponsorsData,
    pradeshNews,
    pradeshLineUp,
    newsMini,
    webStoriesSsr,
    shortVideosSsr,
    techNewsSSR,
    photogalleryNews,
    Sahitya = [],
    blogDataSsr = [],
    // videogallerySsr = [],
    originalVideos = [],
    aqiDataSsr = [],
    foodDataSsr = [],
    CartoonCornerDataSsr = [],
    getCricketArticles,
    getBollywoodArticles,
    getMoneyArticles,
    getSportsArticles,
    topHomeNews: topHomeNewsSSr,
    AjabGajab,
    // districtList,
    liveBlogList,
    // budgetHomeData,
    specialLiveBlog,
    rashifalData,
    eventCoverageSwitcher = {},
    liveTvPosition,
    // electionData,
    // exitPollData,
    short_news_rhs,
    medalTally,
    // pageContent,
    topNewsStoryData
  } = data;

  const [topHomeNews, setTopHomeNews] = useState(topHomeNewsSSr);
  const { rhs, bottom } = TaboolaList.homePage;
  // const { budget_home = "0", budget_live_tv_onoff = "0" } =
  //   budgetSwitcherData || {};

  /** for navratri 2022 video feeds */
  let navratriVideoSwitch = false;
  if (
    navratriVideoFeed?.streaming?.video_feed === "on" &&
    navratriVideoFeed?.streaming?.livefeedhome === "on"
  ) {
    navratriVideoSwitch = true;
  }

  const topStoryLoadCB = (data) => {
    setTopHomeNews(data);
  };
  const callSlider = () => {
    if (document.getElementsByClassName("ads-slider").length) {
      new Glide(".ads-slider", {
        autoplay: 7000,
        slidesToShow: 1,
        slidesToScroll: 1,
      }).mount();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      callSlider();
    }, 7000);
  }, []);

  // const { counting_tally_home_flag, counting_tally_sponser_microsite_flag } = counting_poll;
  // const { exit_poll_home_flag } = exit_poll;
  // const { budget_home_widget_live = false } = budgetSwitcherData || {};

  // const adComp = () => {
  //   if (counting_tally_sponser_microsite_flag === "1") {
  //     return (
  //       <div style={{ minHeight: 60, marginBottom: 10 }}>
  //         <NewSiteAd
  //           slotId={"Desktop_Election_ad_unit"}
  //           adUnit={
  //             "NW18_HIND_DESKTOP/NW18_HIND_EVENT_HOME/NW18_HIND_EVENT_HOME_HOME/NW18_HIND_HP_ROS_EVENT_TOP_1244X60"
  //           }
  //           sizes={[[1244, 60]]}
  //           width={1244}
  //           height={60}
  //           lazyLoad={true}
  //           style={{ display: "flex", justifyContent: "center" }}
  //         />
  //       </div>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  // const tvAdComp = () => {
  //   return (
  //     <div style={{ minHeight: 40, marginBottom: 10 }}>
  //       <NewSiteAd
  //         slotId={"tv_desktop_Election_ad_unit"}
  //         adUnit={
  //           "NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_LIVTV_BTM_362x40"
  //         }
  //         sizes={[[362, 40]]}
  //         width={362}
  //         height={40}
  //         lazyLoad={true}
  //         style={{ display: "flex", justifyContent: "center" }}
  //       />
  //     </div>
  //   );
  // };

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
      <HomeStoryRefresh
        storyCount={liveTvPosition?.live_tv == "true" ? 14 : 16}
        topHomeNews={topHomeNews}
        topStoryLoadCB={topStoryLoadCB}
      />

      <div className="container">
        <DynamicBanner
          data={dynamicBanner}
          obkey={"Below-L2"}
          isMobile={false}
        />
        {/* {counting_tally_home_flag === "1" && (
          <HomeEl {...electionData} ad={adComp} livetvAd={tvAdComp} />
        )}
        {exit_poll_home_flag === "1" && (
          <ExitPollHome
            exitPollHomeData={exitPollData}
            mode={"stg"}
            isMobile={false}
            lang={"hi"}
          />
        )} */}
      </div>
      <Breaking data={breaking} />
      <ExclusiveNews exnews={exnews} />
      <div className="container clearfix">
        <div className="leftwrap">
          {/* {budget_home === "1" && (
            <BudgetNewsDesktop
              homeBudgetNews={pageContent?.budgetHomeData}
              eventSwitches={budgetSwitcherData}
              pageAds={pageAds}
              graphics={pageContent?.graphics}
              isBudgetPage={false}
              budgetYear={pageContent?.budgetYear}
              glossarySponsor={pageContent?.glossarySponsor}
            />
          )} */}
          {Object.keys(eventCoverageSwitcher).length > 0 &&
          eventCoverageSwitcher?.[0]?.status === "1" ? (
            eventCoverageSwitcher?.[0]?.theme === "1" &&
            eventCoverageSwitcher?.[0]?.page === "homepage" ? (
              <EventCoverageTheme1
                data={data}
                liveTvPosition={liveTvPosition}
              />
            ) : (
              eventCoverageSwitcher?.[0]?.theme === "2" &&
              eventCoverageSwitcher?.[0]?.page === "homepage" && (
                <EventCoverageTheme2
                  data={data}
                  liveTvPosition={liveTvPosition}
                />
              )
            )
          ) : null}

          {navratriVideoSwitch && (
            <HomeNavratri2022
              navratriFlags={navratriVideoFeed}
              navratriStreaming={navratriVideoData}
              isMobile={false}
            />
          )}
          {/* {budget_home_widget_live === "1" && (
            <BudgetHomeWidget
              eventSwitches={budgetSwitcherData}
              homeBudgetNews={budgetHomeData}
            />
          )} */}
          {specialLiveBlog?.switch_status === "1" && (
            <SpecialLiveBlog blogContent={specialLiveBlog} />
          )}
          <HomeTopNews
            pageAds={pageAds}
            topHomeNews={topHomeNews}
            isBudget={false}
            liveTvPosition={liveTvPosition}
          />
          <DynamicBanner
            data={dynamicBanner}
            obkey={"Below-Top-Stories"}
            isMobile={false}
          />
          {homeTrendStory && homeTrendStory.storyArr && (
            <HomeTrending trendstory={homeTrendStory} />
          )}
          <HomeEventSlider eventSlider={eventSlider} />
          <div className="middlead">
            <NewSiteAd
              slotId={"Desktop_Static_Ad_1"}
              adUnit={pageAds.MTF_728_id}
              sizes={[[728, 90]]}
              width={728}
              height={90}
              lazyLoad={true}
            />
            {pageAds.PG_1x1_2 && (
              <NewSiteAd
                slotId="PG_1x1_2"
                adUnit={pageAds.PG_1x1_2}
                sizes={[[1, 1]]}
                removeAdSpan={true}
              />
            )}
          </div>
          <div className="vsp40 clearfix"></div>
          {live && live === "true" ? (
            <CricketNewsHome
              sportsNews={cricketNewsHome}
              sponsors={cricketWidgetSponsorsData}
            />
          ) : (
            <ArticleListByCategory
              heading="क्रिकेट"
              isSubMenu={false}
              data={getCricketArticles}
              categoryLink={publicRuntimeConfig.siteUrl + "cricket/"}
              key={`cricketCat`}
              category="cricket"
            />
          )}
           <div className="vsp40 clearfix"></div>
           <ArticleListByCategory
              heading="पेरिस ओलंपिक 2024"
              isSubMenu={false}
              data={topNewsStoryData}
              categoryLink={publicRuntimeConfig.siteUrl + "sports/olympics/"}
              key={``}
              category=""
            />
          <div className="vsp40 clearfix"></div>
          <HomeRashifalWidget isHome={true} rashifalData={rashifalData} />

          <div className="vsp40 clearfix"></div>
          <ArticleListByCategory
            heading="बॉलीवुड"
            isSubMenu={true}
            data={getBollywoodArticles}
            categoryLink={publicRuntimeConfig.siteUrl + "news/entertainment/"}
            key={`bollywoodCat`}
            category="entertainment"
          />
          <DynamicBanner
            data={dynamicBanner}
            obkey={"Above-State-Widget"}
            isMobile={false}
          />
          <div className="vsp40 clearfix"></div>
          <PradeshNewsList
            pradeshNews={pradeshNews}
            stateList={pradeshLineUp}
            // districtList={districtList}
          />
          <div className="vsp40 clearfix"></div>

          <NewsMini newsMini={newsMini} />
        </div>
        <div className="rightwrap">
          {/* {budget_home_widget_live === "1" && (
            <BudgetGlossaryWidget glossary={budgetGlossaryData || []} />
          )} */}
          <div className="sideTop">
            <NewSiteAd
              slotId="pg_1x1"
              adUnit={
                "NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_PG_1x1"
              }
              sizes={[1, 1]}
              removeAdSpan={true}
              loadOnScroll={true}
            />

            {pageAds.ATF_300_id && (
              <>
                <NewSiteAd
                  slotId="NW18_HIND_HP_ATF_300"
                  adUnit={
                    pageAds?.ATF_300_id
                      ? pageAds.ATF_300_id
                      : pageAds.ATF_300_id
                  }
                  sizes={[[300, 250]]}
                  width={300}
                  height={250}
                  lazyLoad={true}
                />
              </>
            )}
          </div>
          <div className="ads-slider">
            <div data-glide-el="track">
              <ul>
                <li className="glide__slide">
                  <div className="sideTop mt-10">
                    <NewSiteAd
                      slotId={"NW18_HIND_HP_ATF_SLUG_300"}
                      adUnit={pageAds.ATF_SLUG_300_id}
                      sizes={[[300, 100]]}
                      width={300}
                      height={100}
                      lazyLoad={true}
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="sideTop mt-10">
                    <NewSiteAd
                      slotId="NW18_HIND_HP_MTF_SLUG_300"
                      adUnit={pageAds.MTF_SLUG_300_id}
                      sizes={[[300, 100]]}
                      width={300}
                      height={100}
                      lazyLoad={true}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <MedalTally medalTally={medalTally} pageAds={pageAds} isMobile={false} />
          </div>

          <ShortNewsHome short_news_rhs={short_news_rhs} />
          <LiveBlogList
            liveBlogList={liveBlogList}
            isMobile={false}
            utm_medium="home_page"
          />
          {/* <div className="medaltally">
            <MedalTallyTable medalTallyList={medalTallyList} heading={"एशियन गेम्स पदक तालिका"} />
          </div> */}
          {/* <ElectionSchedule /> */}
          <div className="sideTop">
            <NewSiteAd
              slotId="NW18_HIND_HP_BTF1_300"
              adUnit={
                "NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_BTF1_300"
              }
              sizes={[[300, 250]]}
              width={300}
              height={250}
              lazyLoad={true}
            />
          </div>
          {foodDataSsr && foodDataSsr.length > 0 && (
            <LazyLoad height={220} once>
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
          )}

          <div className="sideTop food">
            <NewSiteAd
              slotId="NW18_HIND_HP_BTF2_300"
              adUnit={
                "NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_BTF2_300"
              }
              sizes={[[300, 250]]}
              width={300}
              height={250}
              lazyLoad={true}
            />
          </div>
          <div className="clearfix vsp20"></div>
          <LazyLoad height={220} once>
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
        </div>
      </div>
      <div className="clearfix vsp20"></div>

      <div className="container clearfix">
        <ShortStory isMobile={false} shortVideos={shortVideosSsr} />
      </div>
      <div className="container clearfix">
        <WebStory isMobile={false} webStories={webStoriesSsr} />
      </div>

      <div className="container clearfix">
        <div className="leftwrap">
          <div className="vsp40 clearfix"></div>
          <ArticleListByCategory
            heading="मनी"
            isSubMenu={true}
            data={getMoneyArticles}
            categoryLink={publicRuntimeConfig.siteUrl + "news/business/"}
            key={`businessCat`}
            category="business"
          />

          <div className="vsp40 clearfix"></div>
          <ArticleListByCategory
            heading="खेल"
            isSubMenu={true}
            data={getSportsArticles}
            categoryLink={publicRuntimeConfig.siteUrl + "news/sports/"}
            key={`sportsCat`}
            category="sports"
          />
          {/* <MobileWidget mobileNewsData={mobileNewsData} /> */}

          <div className="vsp40 clearfix"></div>
          <ArticleListByCategory
            heading="मोबाइल-टेक"
            isSubMenu={true}
            data={techNewsSSR}
            categoryLink={publicRuntimeConfig.siteUrl + "news/tech/"}
            key={`techCat`}
            category="tech"
          />

          <div className="vsp40 clearfix"></div>
          <PhotogalleryNews
            data={photogalleryNews}
            categoryLink={publicRuntimeConfig.siteUrl + "photogallery/"}
            category={`photogallery`}
          />

          <div className="middlead">
            <NewSiteAd
              slotId={"Desktop_Static_Ad_2"}
              adUnit={pageAds.BTF_728_id}
              sizes={[[728, 90]]}
              width={728}
              height={90}
              loadOnScroll={true}
            />
          </div>

          <div className="vsp40 clearfix"></div>
          <ArticleListByCategory
            heading="साहित्य"
            isSubMenu={false}
            data={Sahitya}
            categoryLink={publicRuntimeConfig.siteUrl + "news/literature/"}
            key={`literatureCat`}
            category="literature"
          />
          <div className="vsp40 clearfix"></div>
          <ArticleListByCategory
            heading="अजब-गजब"
            isSubMenu={false}
            data={AjabGajab}
            categoryLink={publicRuntimeConfig.siteUrl + "news/ajab-gajab/"}
            key={`ajab-gajabCat`}
            category="ajab-gajab"
          />

          <div className="vsp40 clearfix"></div>
          <BlogList data={blogDataSsr} />
        </div>

        <div className="rightwrap">
          <div className="clearfix vsp40"></div>
          <div className="sideTop">
            <NewSiteAd
              slotId="NW18_HIND_HP_BTF3_300"
              adUnit={
                "NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_BTF3_300"
              }
              sizes={[[300, 250]]}
              width={300}
              height={250}
              lazyLoad={true}
            />
          </div>
          <AQIWidget aqiData={aqiDataSsr} />
          <LazyLoad height={545} once>
            <GetArticleSideBarListAuto
              heading="ऑटो"
              isSubMenu={false}
              categoryLink={publicRuntimeConfig.siteUrl + "news/auto/"}
              key={`autoCat`}
              category="auto"
              isAmp={false}
            />
          </LazyLoad>
          <div className="clearfix vsp20"></div>
          <LazyLoad height={545} once>
            <ImageWithListRHS
              heading={"नौकरी"}
              category={"jobs"}
              categoryLink={publicRuntimeConfig.siteUrl + "news/jobs/"}
              key={`jobsCat`}
            />
          </LazyLoad>
          <div className="clearfix vsp20"></div>
          <div className="my-ad-rhs">
            <NewSiteAd
              slotId="NW18_HIND_HP_BTF_300"
              adUnit={pageAds.BTF_300_id}
              sizes={[
                [300, 250],
                [300, 600],
              ]}
              width={300}
              height={250}
              lazyLoad={true}
            />
          </div>
          <div className="vsp20 clearfix"></div>
          <LazyLoad height={220} once>
            <GetSlider
              heading="कार्टून कॉर्नर"
              data={CartoonCornerDataSsr}
              categoryLink={
                publicRuntimeConfig.siteUrl + "news/cartoon-corner/"
              }
              key={`cartoonCornerCat`}
              category="cartoon-corner"
              buttonType={`beckground`}
            />
          </LazyLoad>
          <div className="vsp20 clearfix"></div>

          <Taboola
            mode={rhs.mode}
            id={rhs.id}
            container={rhs.container}
            placement={rhs.placement}
          />
        </div>
      </div>
      <div className="clearfix vsp20"></div>
      <VideoList
        data={originalVideos}
        heading={`टॉप वीडियो`}
        link={publicRuntimeConfig.siteUrl + "videos/originals/"}
        key={`originalVideos`}
      />
      {/* <VideoList
        data={videogallerySsr}
        heading={`टॉप वीडियो`}
        link={
          publicRuntimeConfig.siteUrl + "videos/"
        }
        key={`topVideos`}
      /> */}

      <div className="vsp40 clearfix"></div>
      <LazyLoad height={1000}>
        <AllSectionWrap />
      </LazyLoad>
      <Taboola
        mode={bottom.mode}
        id={bottom.id}
        container={bottom.container}
        placement={bottom.placement}
      />
      <style jsx global>{`
        .vsp20 {
          margin-top: 20px;
        }
        .vsp40{height: 40px; line-height: 0;}  
        .vsp15 {
          margin-top: 15px;
        }
        body {
          margin: 0;
          padding: 0;
          list-style: none;
          outline: 0;
          text-decoration: none;
          // font-family: 'Noto Serif', 'Droid Serif', sans-serif !important;
        }
        figure img {
          width: 100%;
        }
        .leftwrap {
          margin-top: 5px;
        }
        .leftwrap {
          width: calc(100% - 325px);
          float: left;
          position: relative;
        }
        .clearfix:after,
        .clearfix:before {
          content: '';
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .rightwrap {
          position: sticky;
          top: -63%;
          z-index: 1;
          margin-top: 5px;
        }
        .rightwrap {
          width: 300px;
          float: right;
        }
        .globalhd {
          padding-bottom: 4px;
          position: relative;
        }
        .justify-space-betwwen {
          justify-content: space-between;
        }
        .dflex {
          display: flex;
        }

        .globalhd h2 {
          color: #111;
          font-size: 16px;
          font-weight: 700;
          line-height: 28px;
          flex-shrink: 0;
          margin-right: 20px;
          text-transform: uppercase;
        }
        .globalhd.large h2 {
          font-size: 18px;
          line-height: 28px;
        }
        .globalhd:after {
          content: '';
          width: 25px;
          height: 4px;
          position: absolute;
          bottom: -2px;
          left: 0;
          background: #ed1c24;
        }
        .middlead {
          display: flex;
          justify-content: center;
          margin: 15px;
          flex-direction: column;
          text-align: center;
        }
        .sideTop {
          display: flex;
          flex-direction: column;
          position: relative;
          height:280px;
        }
        .middlead span,
        .sideTop span,
        .my-ad-rhs span {
          background: transparent;
          font-size: 12px;
          color: #444;
          padding: 3px 0 3px 0;
          text-align: center;
          min-height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .food{
        margin-top:30px
        }
        .quiz-container {
          margin-top: 30px;
        }
        .quiz-heading{
        margin-boottom:5px !important
        }import LazyImage from './../Common/LazyLoadImage';


        .container {
          margin: auto;
          position: relative;
        }
        .banner_cricket {
          width: 100%;
          text-align: center;
        }
        #div-gpt-ad-1632314167294-0{ text-align: center; }
        .mt-10 {
          margin-top : 10px;
          background: rgba(0,0,0,0.03);
        }

        .ads-slider {
          overflow: hidden;
          position: relative;
          height:120px;
        }
        .ads-slider ul {
          margin-top: 10px;
          position: relative;
          overflow: hidden;
          display: flex;
        }
        .topnews{margin-bottom:10px}
        .logo_im_g img {
          width: auto;
          display: flex;
          justify-content: center;
          margin: 0px auto 10px;
        }
        .native_video{
          padding:17px 0px;
        }   
        .photochild-2{height:100% !important;}  
        .medaltally {
          margin-top: 12px;
        }  
        .newglblhdwrap .newglblhd, .newglblhdwrap .newglblhd a{width: auto;} 
        .medalHopeHeadingInner .heading-1 {
                                color: red;
                    font-weight: 400;
                    text-transform: uppercase;
                    font-size: 12px;
                    letter-spacing: 3.7px;
                    line-height: 12px;
                }
      `}</style>
    </>
  );
};

export default React.memo(Home);
