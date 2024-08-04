import Head from "next/head";
import React from "react";
import AsianGamesMobileHeader from "../Common/Header";
import AsianGamesMobileBreadcum from "../Common/Breadcum";
import AsianGameTabLinkMobile from "../Common/PageLinkTab";
import TopStories from "./TopStories";
import CricketInFocus from "./CricketInFocus";
import Photogalleries from "./Photogalleries";
import dynamic from "next/dynamic";
import LatestNews from "./LatestNews";
import Videos from "./Videos";

const IndiaMedalHope = dynamic(() => import("./IndiaMedalHope"));
const UltimatePerformanceOfTheDay = dynamic(() =>
  import("./UltimatePerformanceOfTheDay")
);
const UltimatePerformerIndia = dynamic(() =>
  import("./UltimatePerformerIndia")
);
const MedalTallyTable = dynamic(() => import("./MedalTallyTable"));

const breadCumConstant = [
  { id: 1, url: "/", name: "न्यूज18" },
  { id: 2, url: "/news/", name: "न्यूज" },
  { id: 3, url: "/news/sports/", name: "खेल" },
  { id: 4, name: "एशियन गेम्स 2023" },
];

const AsianGamesHomeMobile = ({ data }) => {
  const {
    topNews = [],
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
      <div className="wrapper">
        <AsianGamesMobileHeader />
        <AsianGamesMobileBreadcum breadCumConstant={breadCumConstant} />
        <AsianGameTabLinkMobile asianGameSwitcher={asianGameSwitcher} />
        <TopStories storiesList={topNews} />
        {india_medal_hopes === "1" && (
          <IndiaMedalHope
            gameList={asianGamesList}
            medalHopeList={medalHopeList}
            asianGamesMedalHopeNews={asianGamesMedalHopeNews}
          />
        )}
        {performance_of_the_day === "1" && (
          <UltimatePerformanceOfTheDay
            asianUltimatePerformer={asianUltimatePerformer}
          />
        )}
        <CricketInFocus asianGameCricketNews={asianGameCricketNews} />
        {medal_tally === "1" && (
          <MedalTallyTable medalTallyList={medalTallyList} />
        )}
        {india_ultimate_performer === "1" && (
          <UltimatePerformerIndia medalListByYear={medalListByYear} />
        )}
        <Photogalleries newsList={photoNews} />
        <Videos videoNews={videoNews} />
        <LatestNews asianGamesBottomNews={asianGamesBottomNews} />
      </div>
      <style jsx global>{`
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
        * {
          padding: 0;
          margin: 0;
          list-style: none;
          box-sizing: border-box;
          text-decoration: none;
        }
        body {
          font-family: "Mukta", sans-serif;
          margin: 0 auto;
          padding: 0;
          font-size: 13px;
          line-height: 19px;
        }
        h1 {
          margin: 0;
        }
        img {
          vertical-align: top;
        }
        a {
          text-decoration: none;
          display: block;
        }
        li {
          list-style: none;
        }
        .wrapper {
          width: 100%;
          font-family: "Mukta", sans-serif;
        }
        .load_more {
          width: 100%;
          text-align: center;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          height: 50px;
        }
        .load_more a {
          color: #ff0000;
          width: 110px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
        }
        .load_more span {
          background: #ffffff;
          font-size: 13px;
          text-transform: uppercase;
          font-weight: 600;
          border: 2px solid #e1261c;
          border-radius: 30px;
          width: 110px;
          height: 30px;
          line-height: 27px;
        }
        .pwa_page_title {
          height: 36px;
          background: #ed2128 0% 0% no-repeat padding-box;
          color: #ffffff;
          text-transform: uppercase;
          font-size: 18px;
          line-height: 37px;
          font-weight: 600;
          padding: 0 10px;
        }
        .page_title {
          color: #e1261d;
          font-family: "Mukta", sans-serif;
          line-height: 27px;
          text-transform: uppercase;
          font-size: 18px;
          font-weight: bold;
        }
        .page_title span {
          color: #202020;
          font-weight: normal;
        }
        /*end games 2020 section*/
        ul.gamesIcon {
          display: none;
        }
        ul.gamesIcon.show_event {
          display: grid;
        }
        ul.gamesIcon li.active {
          background-color: #ff5148;
        }
        .partnersldr_otr {
          width: 95px;
        }
        .pp_sldr_txt {
          font-size: 10px;
          color: #ffffff;
        }
        .partnersSlider {
          width: 94px;
        }
        .partnersSlider .track {
          overflow: hidden;
        }
        .partnersSlider .slides {
          display: flex;
        }
        .partnersSlider li {
          background: #e3e3e3;
          border: 1px solid #e3e3e3;
          width: 94px;
          height: 40px;
        }
        .gamesIcon li {
          height: 35px;
          background-color: #3279ba;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/olympic-m-white-icon.png);
          background-position: -10px -10px;
          border-radius: 50%;
        }
        .gamesIcon li a {
          display: block;
          width: 35px;
          height: 35px;
        }
        .gamesIcon li.hide {
          display: none;
        }
        .gamesIcon li.Archery {
          background-position: -65px -10px;
        }
        .gamesIcon li.Artistic_Gymnastics {
          background-position: -10px -65px;
        }
        .gamesIcon li.Artistic_Swimming {
          background-position: -65px -65px;
        }
        .gamesIcon li.Athletics {
          background-position: -120px -10px;
        }
        .gamesIcon li.Badminton {
          background-position: -120px -65px;
        }
        .gamesIcon li.Baseball_Softball {
          background-position: -10px -120px;
        }
        .gamesIcon li.Basketball {
          background-position: -65px -120px;
        }
        .gamesIcon li.Beach_Volleyball {
          background-position: -120px -120px;
        }
        .gamesIcon li.Boxing {
          background-position: -175px -10px;
        }
        .gamesIcon li.Canoe_Slalom {
          background-position: -175px -65px;
        }
        .gamesIcon li.Canoe_Sprint {
          background-position: -175px -120px;
        }
        .gamesIcon li.Cycling_BMX_Freestyle {
          background-position: -10px -175px;
        }
        .gamesIcon li.Cycling_BMX_Racing {
          background-position: -65px -175px;
        }
        .gamesIcon li.Cycling_Mountain_Bike {
          background-position: -120px -175px;
        }
        .gamesIcon li.Cycling_Road {
          background-position: -175px -175px;
        }
        .gamesIcon li.Cycling_Track {
          background-position: -230px -10px;
        }
        .gamesIcon li.Diving {
          background-position: -230px -65px;
        }
        .gamesIcon li.Equestrian {
          background-position: -230px -120px;
        }
        .gamesIcon li.Fencing {
          background-position: -230px -175px;
        }
        .gamesIcon li.Football {
          background-position: -10px -230px;
        }
        .gamesIcon li.Golf {
          background-position: -65px -230px;
        }
        .gamesIcon li.Handball {
          background-position: -120px -230px;
        }
        .gamesIcon li.Hockey {
          background-position: -175px -230px;
        }
        .gamesIcon li.Judo {
          background-position: -230px -230px;
        }
        .gamesIcon li.Karate {
          background-position: -285px -10px;
        }
        .gamesIcon li.Marathon_Swimming {
          background-position: -285px -65px;
        }
        .gamesIcon li.Modern_Pentathlon {
          background-position: -285px -120px;
        }
        .gamesIcon li.Rhythmic_Gymnastics {
          background-position: -285px -175px;
        }
        .gamesIcon li.Rowing {
          background-position: -285px -230px;
        }
        .gamesIcon li.Rugby {
          background-position: -10px -285px;
        }
        .gamesIcon li.Sailing {
          background-position: -65px -285px;
        }
        .gamesIcon li.Shooting {
          background-position: -120px -285px;
        }
        .gamesIcon li.Skateboarding {
          background-position: -175px -285px;
        }
        .gamesIcon li.Sport_Climbing {
          background-position: -230px -285px;
        }
        .gamesIcon li.Surfing {
          background-position: -285px -285px;
        }
        .gamesIcon li.Swimming {
          background-position: -340px -10px;
        }
        .gamesIcon li.Table_Tennis {
          background-position: -340px -65px;
        }
        .gamesIcon li.Taekwondo {
          background-position: -340px -120px;
        }
        .gamesIcon li.Tennis {
          background-position: -340px -175px;
        }
        .gamesIcon li.Trampoline_Gymnastics {
          background-position: -340px -230px;
        }
        .gamesIcon li.Triathlon {
          background-position: -340px -285px;
        }
        .gamesIcon li.Volleyball {
          background-position: -10px -340px;
        }
        .gamesIcon li.Water_Polo {
          background-position: -65px -340px;
        }
        .gamesIcon li.Weightlifting {
          background-position: -120px -340px;
        }
        .gamesIcon li.Wrestling {
          background-position: -175px -340px;
        }
        .gamesIcon li.IconMoreBtn {
          background: #313131;
          border: 1px solid #616262;
          position: relative;
        }
        .gamesIcon li.IconMoreBtn:before {
          content: "";
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          width: 6px;
          height: 6px;
          -webkit-transform: rotate(132deg);
          -ms-transform: rotate(132deg);
          transform: rotate(132deg);
          position: absolute;
          top: 12px;
          left: 14px;
          background: transparent;
        }
        .gamesIcon li.IconMoreBtn:after {
          content: "";
          width: 8px;
          height: 2px;
          background-color: #fff;
          display: block;
          left: 12px;
          position: absolute;
          top: 15px;
        }
        .img-figure,
        .lazyload-wrapper,
        .lazyload-wrapper img {
          width: 100%;
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

export default AsianGamesHomeMobile;
