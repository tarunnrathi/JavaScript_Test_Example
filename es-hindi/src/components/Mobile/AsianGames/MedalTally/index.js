import Head from "next/head";
import React from "react";
import AsianGamesMobileHeader from "../Common/Header";
import AsianGamesMobileBreadcum from "../Common/Breadcum";
import AsianGameTabLinkMobile from "../Common/PageLinkTab";
import { medalsList } from "components/Desktop/AsianGames/Common/AsianGamesConstant";

const breadCumConstant = [
  { id: 1, url: "/", name: "न्यूज18" },
  { id: 2, url: "/news/", name: "न्यूज" },
  { id: 3, url: "/news/sports/", name: "खेल" },
  { id: 4, url: "/sports/asian-games/", name: "एशियन गेम्स 2023" },
  { id: 5, name: "पदक तालिका" },
];

const MedalTallyMobile = ({ data }) => {
  const { metalTallyTableData } = data;
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
        <AsianGameTabLinkMobile
          asianGameSwitcher={{ medal_tally: "1" }}
          selectedTab={4}
        />

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
      <style jsx global>{`
        * {
          padding: 0;
          margin: 0;
          list-style: none;
          box-sizing: border-box;
          text-decoration: none;
        }
        body {
          font-family: Recursive, sans-serif;
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
        .madel_tally_table table tbody .India {
          font-weight: 600;
          color: #ff0000;
        }
        .wrapper {
          width: 100%;
          font-family: "Recursive";
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
          font-family: "Recursive", sans-serif;
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
          background: #001d42 0% 0% no-repeat padding-box;
        }
        .madel_tally_table table thead th:first-child {
          text-align: left;
          padding-left: 10px;
          color: #ffffff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: bold;
          width: 40%;
        }
        .madel_tally_table table thead th:last-child {
          color: #ffffff;
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
          background: #ffffff 0% 0% no-repeat padding-box;
          border-radius: 0px 0px 4px 4px;
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
          color: #ffa500;
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
          background: #f5f5f5 0% 0% no-repeat padding-box;
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
        .presenting_partner_rhs .slides {
          display: flex;
        }
        .presenting_partner_rhs .track {
          overflow: hidden;
        }
        .presenting_partner_rhs {
          display: flex;
        }
        .presenting_partner_rhs .partnersSliderRhs {
          width: 95px;
        }
        .presenting_partner_rhs .slide {
          width: 94px;
          height: 40px;
          background: #747474;
        }

        .madel_tally_top {
          background: #f5f5f5 0% 0% no-repeat padding-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 10px;
          margin-bottom: 2px;
        }
        madel_tally_table {
          width: 100%;
          padding: 10px 0px;
        }
        .madel_tally_table table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        .madel_tally_table table thead {
          height: 30px;
          background: #001d42 0% 0% no-repeat padding-box;
        }
        .madel_tally_table table thead th:first-child {
          text-align: left;
          padding-left: 10px;
          color: #ffffff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: bold;
          width: 40%;
          vertical-align: middle;
        }
        .madel_tally_table table thead th:last-child {
          color: #ffffff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          vertical-align: middle;
        }
        .madel_tally_table table thead img {
          padding-right: 0;
        }
        .gold {
          color: #ffa500;
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
          display: none;
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
        .gold,
        .silver,
        .bronze {
          width: 28px;
          height: 26px;
          background: #ffffff 0% 0% no-repeat padding-box;
          border-radius: 0px 0px 4px 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
          font-size: 0;
          margin: auto;
        }
        .medalTally_presenting {
          display: flex;
          align-items: center;
        }
        .medalTally_presenting .heading {
          font-size: 10px;
          font-weight: normal;
          color: #747474;
          text-decoration: underline;
          max-width: 54px;
          margin-right: 4px;
          line-height: normal;
          text-align: right;
        }
        .MTpartnersSlider {
          width: 94px;
        }
        .MTpartnersSlider .track {
          overflow: hidden;
        }
        .MTpartnersSlider .slides {
          display: flex;
        }
        .MTpartnersSlider li {
          background: #e3e3e3;
          border: 1px solid #e3e3e3;
          width: 94px;
          height: 40px;
        }
      `}</style>
    </>
  );
};

export default MedalTallyMobile;
