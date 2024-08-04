import React from "react";
import Head from "next/head";
import AsianGamesHeader from "../Common/Header";
import AsianGamesBreadcum from "../Common/BreadCum";
import PageLinkTab from "../Common/PageLinkTab";
import AsianGamesTopStories from "./TopStories";
import IndiaInFocus from "./IndiaInFocus";
import PhotogallerySlider from "./PhotogallerySlider";
import LatestNews from "./LatestNews";
import RhsTopStory from "widgets/Common/Desktop/RhsTopStory";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import RhsPhoto from "widgets/Common/Desktop/RhsPhoto";
import dynamic from "next/dynamic";

const IndianMedalHopes = dynamic(() => import("./MedalHopes"));
const UltimatePerformance = dynamic(() => import("./UltimatePerformance"));
const MedalTallyTable = dynamic(() => import("../Common/MedalTallyTable"));
const IndiaUltimatePerformer = dynamic(() =>
  import("./IndiaUltimatePerformer")
);

const breadCumConstant = [
  { id: 1, url: "/", name: "न्यूज18" },
  { id: 2, url: "/news/", name: "न्यूज" },
  { id: 3, url: "/news/sports/", name: "खेल" },
  { id: 4, name: "एशियन गेम्स 2023" },
];

const AsianGamesHome = ({ data }) => {
  const {
    topNews = [],
    topStories = [],
    photoStories = [],
    pageAds = {},
    asianGamesList = [],
    medalHopeList = [],
    asianUltimatePerformer = [],
    asianGamesMedalHopeNews = [],
    photoNews = [],
    videoNews = [],
    asianGameCricketNews = [],
    asianGamesBottomNews = [],
    asianGameSwitcher = {},
    medalTallyList = [],
    medalListByYear = [],
  } = data;

  const {
    india_ultimate_performer = "off",
    india_medal_hopes = "off",
    performance_of_the_day = "off",
    medal_tally = "off",
  } = asianGameSwitcher;

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Oswald:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="text/javascript"
          src="https://images.news18.com/static_news18/pix/ibnhome/news18/js/desktop/jquery-1.11.3.min.js"
        ></script>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
          href="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2"
        />
      </Head>
      <div id="top-widget-calender-section">
        <AsianGamesHeader />
      </div>
      <div className="olympics-wrapper">
        <div className="olympics-left">
          <AsianGamesBreadcum breadCumConstant={breadCumConstant} />
          <PageLinkTab asianGameSwitcher={asianGameSwitcher} />
          <AsianGamesTopStories storiesList={topNews} />
          {india_medal_hopes === "1" && (
            <IndianMedalHopes
              gameList={asianGamesList}
              asianGamesMedalHopeNews={asianGamesMedalHopeNews}
              medalHopeList={medalHopeList}
            />
          )}
          {performance_of_the_day === "1" && (
            <UltimatePerformance
              asianUltimatePerformer={asianUltimatePerformer}
            />
          )}
          <IndiaInFocus asianGameCricketNews={asianGameCricketNews} />
        </div>
        <div className="olympics-right">
          {medal_tally === "1" && (
            <MedalTallyTable medalTallyList={medalTallyList} />
          )}
          <SiteAd
            adUnit={
              pageAds?.ATF_300_id ? pageAds.ATF_300_id : pageAds.ATF_300_id
            }
            sizes={[[300, 250]]}
            width={300}
            height={250}
            lazyload={true}
            RhsCommonSideTop
          />
          {india_medal_hopes === "1" && (
            <RhsPhoto photoStories={photoStories} />
          )}
        </div>
      </div>
      {india_ultimate_performer === "1" && (
        <IndiaUltimatePerformer medalListByYear={medalListByYear} />
      )}
      <div className="olympics-wrapper">
        <div className="olympics-left">
          <div className="photogallerie_streets">
            <div className="photogallerie">
              <PhotogallerySlider
                isPhotogallery={true}
                header={"फ़ोटो"}
                silderClassName={"photogallerie_sldier"}
                newsList={photoNews}
                loadMoreUrl={"/tag/asian-games/photogallery/"}
                loadMoreText={"और देखें"}
              />
            </div>
            <div className="Videos">
              <PhotogallerySlider
                header={"वीडियो"}
                silderClassName={"videoie_sldier"}
                newsList={videoNews}
                loadMoreUrl={"/tag/asian-games/videos/"}
                loadMoreText={"और देखें"}
              />
            </div>
          </div>
          <LatestNews asianGamesBottomNews={asianGamesBottomNews} />
        </div>
        <div className="olympics-right">
          <RhsTopStory topStories={topStories} />
          <SiteAd
            adUnit={pageAds.BTF_300_id}
            sizes={[
              [300, 250],
              [300, 600],
            ]}
            removeAdSpan={true}
            width={336}
            height={280}
            lazyload={true}
            offset={200}
          />
        </div>
      </div>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          font-family: "Mukta", sans-serif;
          font-size: 15px;
          line-height: 1.1;
          margin: 0;
          padding: 0;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
        }
        img {
          vertical-align: top;
        }
        a {
          text-decoration: none;
        }
        li {
          list-style: none;
        }
        ul,
        p,
        button {
          margin: 0;
          padding: 0;
        }
        figure {
          margin: 0;
          padding: 0;
        }
        // FONT files
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
            format("woff2");
          unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
            U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
        }
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2)
            format("woff2");
          unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
            U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
        }
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 400;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnBrXw_1669353352.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 700;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }
        .olympics-wrapper {
          width: 100%;
          display: flex;
          max-width: 1244px;
          margin: auto;
          font-family: "Mukta", sans-serif;
          margin-bottom: 30px;
          margin-top: 10px;
          margin-top: 10px;
        }
        .olympics-left {
          width: 924px;
          margin-right: 20px;
        }
        .page_title {
          color: #e1261d;
          font-family: "Oswald";
          line-height: 27px;
          margin-bottom: 5px;
          text-transform: uppercase;
          font-size: 22px;
        }
        .page_title span {
          color: #202020;
          font-weight: normal;
        }
        .gamesIcon {
          display: flex;
          flex-wrap: wrap;
        }
        .gamesIcon li {
          width: 40px;
          height: 40px;
          background-color: #3279ba;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/olympic-d-white-icon.png);
          margin: 5px 9px 5px 0;
          border-radius: 50%;
        }
        .gamesIcon li a {
          display: block;
          width: 40px;
          height: 40px;
        }
        .gamesIcon li.Archery {
          background-position: -57px 0px;
        }
        .gamesIcon li.Artistic_Gymnastics {
          background-position: -114px 0px;
        }
        .gamesIcon li.Artistic_Swimming {
          background-position: -171px 0px;
        }
        .gamesIcon li.Athletics {
          background-position: -228px 0px;
        }
        .gamesIcon li.Badminton {
          background-position: -283px 0px;
        }
        .gamesIcon li.Baseball_Softball {
          background-position: -342px 0px;
        }
        .gamesIcon li.Basketball {
          background-position: -399px 0px;
        }
        .gamesIcon li.Beach_Volleyball {
          background-position: -456px 0px;
        }
        .gamesIcon li.Boxing {
          background-position: -509px 0px;
        }
        .gamesIcon li.Canoe_Slalom {
          background-position: -566px 0px;
        }
        .gamesIcon li.Canoe_Sprint {
          background-position: -627px 0px;
        }
        .gamesIcon li.Cycling_BMX_Freestyle {
          background-position: -679px 0px;
        }
        .gamesIcon li.Cycling_BMX_Racing {
          background-position: -735px 0px;
        }
        .gamesIcon li.Cycling_Mountain_Bike {
          background-position: -795px 0px;
        }
        .gamesIcon li.Cycling_Road {
          background-position: -852px 0px;
        }
        .gamesIcon li.Cycling_Track {
          background-position: -907px 0px;
        }
        .gamesIcon li.Diving {
          background-position: -963px 0px;
        }
        .gamesIcon li.Equestrian {
          background-position: -1022px 0px;
        }
        .gamesIcon li.Fencing {
          background-position: -1080px 0px;
        }
        .gamesIcon li.Football {
          background-position: -1135px 0px;
        }
        .gamesIcon li.Golf {
          background-position: -1190px 0px;
        }
        .gamesIcon li.Handball {
          background-position: -1245px 0px;
        }
        .gamesIcon li.Hockey {
          background-position: 0px -54px;
        }
        .gamesIcon li.Judo {
          background-position: -57px -54px;
        }
        .gamesIcon li.Karate {
          background-position: -114px -54px;
        }
        .gamesIcon li.Marathon_Swimming {
          background-position: -171px -54px;
        }
        .gamesIcon li.Modern_Pentathlon {
          background-position: -228px -54px;
        }
        .gamesIcon li.Rhythmic_Gymnastics {
          background-position: -283px -54px;
        }
        .gamesIcon li.Rowing {
          background-position: -342px -54px;
        }
        .gamesIcon li.Rugby {
          background-position: -399px -54px;
        }
        .gamesIcon li.Sailing {
          background-position: -456px -54px;
        }
        .gamesIcon li.Shooting {
          background-position: -509px -54px;
        }
        .gamesIcon li.Skateboarding {
          background-position: -566px -54px;
        }
        .gamesIcon li.Sport_Climbing {
          background-position: -627px -54px;
        }
        .gamesIcon li.Surfing {
          background-position: -679px -54px;
        }
        .gamesIcon li.Swimming {
          background-position: -735px -54px;
        }
        .gamesIcon li.Table_Tennis {
          background-position: -795px -54px;
        }
        .gamesIcon li.Taekwondo {
          background-position: -852px -54px;
        }
        .gamesIcon li.Tennis {
          background-position: -907px -54px;
        }
        .gamesIcon li.Trampoline_Gymnastics {
          background-position: -963px -54px;
        }
        .gamesIcon li.Triathlon {
          background-position: -1022px -54px;
        }
        .gamesIcon li.Volleyball {
          background-position: -1080px -54px;
        }
        .gamesIcon li.Water_Polo {
          background-position: -1135px -54px;
        }
        .gamesIcon li.Weightlifting {
          background-position: -1190px -54px;
        }
        .gamesIcon li.Wrestling {
          background-position: -1245px -54px;
        }
        .olympics-right {
          width: 300px;
        }
        .photogallerie_streets {
          display: flex;
          width: 100%;
        }
        .photogallerie {
          width: 49%;
        }
        .load_more {
          width: 100%;
          display: flex;
          align-items: center;
        }
        .load_more a {
          color: red;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 12px;
          flex-shrink: 0;
          padding: 0 15px;
        }
        .load_more::before,
        .load_more::after {
          content: "";
          background: #f5f5f5;
          width: 100%;
          height: 20px;
        }
        .Videos {
          width: 51%;
          padding-left: 20px;
        }
        .img-figure,
        .inner .lazyload-wrapper,
        .lazyload-wrapper img {
          width: 100% !important;
          height: 100% !important;
        }
        .medalHopeSlider .imageOuter .imageInnter img {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default AsianGamesHome;
