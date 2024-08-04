import React from "react";
import AsianGamesMobileHeader from "../Common/Header";
import AsianGamesMobileBreadcum from "../Common/Breadcum";
import AsianGameTabLinkMobile from "../Common/PageLinkTab";
import Head from "next/head";

const breadCumConstant = [
  { id: 1, url: "/", name: "NEWS18" },
  { id: 2, url: "/news/", name: "NEWS" },
  { id: 3, url: "/news/sports/", name: "SPORTS" },
  { id: 4, url: "/sports/asian-games", name: "ASIAN GAMES 2023" },
  { id: 5, name: "RESULTS" },
];

const AsianGamesResultMobile = () => {
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
        <AsianGameTabLinkMobile />
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
      `}</style>
    </>
  );
};

export default AsianGamesResultMobile;
