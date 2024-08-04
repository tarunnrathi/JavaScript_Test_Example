import React, { useEffect } from "react";
import { medalsList } from "../Common/AsianGamesConstant";
import AsianGamesHeader from "../Common/Header";
import Head from "next/head";
import AsianGamesBreadcum from "../Common/BreadCum";
import PageLinkTab from "../Common/PageLinkTab";
import Glide from "@glidejs/glide";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";

const breadCumConstant = [
  { id: 1, url: "/", name: "न्यूज18" },
  { id: 2, url: "/news/", name: "न्यूज" },
  { id: 3, url: "/news/sports/", name: "खेल" },
  { id: 4, url: "/sports/asian-games/", name: "एशियन गेम्स 2023" },
  { id: 5, name: "पदक तालिका" },
];

const MedalTally = (props) => {
  const {
    topStories = [],
    metalTallyTableData = [],
    photoStories = [],
  } = props.data;
  useEffect(() => {
    if (document.querySelector(".partnersSliderRhs_medal_tally")) {
      new Glide(document.querySelector(".partnersSliderRhs_medal_tally"), {
        type: "carousel",
        autoplay: 2000,
        perView: 1,
        slidesToScroll: 1,
      }).mount();
    }
  }, []);

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
          <PageLinkTab
            selectedTab={4}
            asianGameSwitcher={{ medal_tally: "1" }}
          />
          <div className="madel_tally_page">
            <div className="madel_tally_top">
              <h2 className="page_title">
                पदक <span>तालिका</span>
              </h2>
              {/* 
              <div className="presenting_partner_rhs">
                <p className="partner_ttl">Presenting Partner</p>
                <div className="partnersSliderRhs_medal_tally">
                  <div className="track" data-glide-el="track">
                    <ul className="slides">
                      <li className="slide">0</li>
                      <li className="slide">1</li>
                      <li className="slide">2</li>
                    </ul>
                  </div>
                </div>
              </div>*/}
            </div>
            <div className="madel_tally_table">
              <table>
                <thead>
                  <tr>
                    <th>Country</th>
                    {medalsList.map((medalData) => (
                      <th>
                        <div className={medalData.className}>
                          <img src={medalData.images} />
                          {medalData.name}
                        </div>
                      </th>
                    ))}
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {metalTallyTableData.map((itm, index) => (
                    <tr className={itm.team_name} key={itm.team_id}>
                      <td className={itm.team_name}>
                        <span style={{ paddingRight: "10px", width: "25px" }}>
                          {index + 1}.
                        </span>
                        <i>
                          <img
                            src={`https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/${itm.team_name
                              ?.toLowerCase()
                              .split(" ")
                              .join("_")}_flag.png`}
                          />
                        </i>
                        {itm.team_name}
                      </td>
                      <td className={itm.team_name}>{itm.gold_count}</td>
                      <td className={itm.team_name}>{itm.silver_count}</td>
                      <td className={itm.team_name}>{itm.bronze_count}</td>
                      <td className={itm.team_name}>{itm.medals_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="olympics-right">
          <RhsCommon
            pageAds={props.pageAds}
            photoStories={topStories}
            topStories={photoStories}
            currentURL={props.currentUrl}
            isAsianGames={true}
          />
        </div>
      </div>
      <style jsx global>
        {`
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
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: "Mukta";
            font-style: normal;
            font-weight: 700;
            src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2)
              format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }

          // Olympic wrapper
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
          .olympics-right {
            width: 300px;
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
          .presenting_partner_rhs .slides {
            display: flex;
          }
          .presenting_partner_rhs .track {
            overflow: hidden;
          }
          .presenting_partner_rhs {
            display: flex;
          }
          .presenting_partner_rhs .partnersSliderRhs_medal_tally {
            width: 95px;
          }
          .presenting_partner_rhs .slide {
            width: 94px;
            height: 40px;
            background: #747474;
          }
          .madel_tally_table {
            width: 100%;
          }
          .madel_tally_table table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
          }
          .madel_tally_table table thead {
            height: 50px;
            background: #001d42 0 0 no-repeat padding-box;
          }
          .madel_tally_table table thead th:first-child {
            text-align: left;
            padding-left: 10px;
            color: #fff;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
            width: 40%;
          }
          .madel_tally_table table tbody .India {
            font-weight: 600;
            color: #ff0000;
          }
          .madel_tally_table table thead th:last-child {
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
          }
          .gold,
          .silver,
          .bronze {
            width: 80px;
            height: 41px;
            background: #fff 0 0 no-repeat padding-box;
            border-radius: 0 0 4px 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-transform: uppercase;
            font-size: 12px;
            margin: auto;
          }
          .madel_tally_table table thead img {
            padding-right: 7px;
          }
          .gold {
            color: orange;
          }
          .silver {
            color: #acacac;
          }
          .bronze {
            color: #df622d;
          }
          .madel_tally_table table thead th {
            vertical-align: baseline;
            width: 9%;
          }
          .madel_tally_table table tbody {
            text-align: center;
            font-size: 14px;
            color: #202020;
          }
          .madel_tally_table table tbody td:first-child {
            text-align: left;
            padding-left: 10px;
            display: flex;
            align-items: center;
          }
          .madel_tally_table table tbody td:first-child img {
            width: 43px;
            height: 24px;
            margin-right: 15px;
          }
          .madel_tally_table table tbody td {
            height: 40px;
          }
          .madel_tally_table table tbody tr {
            height: 40px;
            border-bottom: 1px #d8d8d8 solid;
            background: #fff;
          }
          .madel_tally_table table tbody tr:nth-child(even) {
            background: #f6f6f6;
          }
          .madel_tally_table table tbody tr:first-child {
            font-weight: bold;
          }
          .madel_tally_table table tbody tr:first-child {
            font-weight: bold;
          }
          .madel_tally_top {
            height: 43px;
            background: #f5f5f5 0 0 no-repeat padding-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 10px;
            margin-bottom: 2px;
          }
          .presenting_partner_rhs .partner_ttl {
            font-size: 10px;
            font-weight: normal;
            margin-right: 4px;
            color: #747474;
            line-height: 15px;
            text-decoration: underline;
            text-align: right;
            align-items: center;
            display: flex;
            width: 49px;
          }
        `}
      </style>
    </>
  );
};

export default MedalTally;
