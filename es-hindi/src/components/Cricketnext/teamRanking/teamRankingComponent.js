import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { GlobalContext } from "GlobalStore";
import "lazysizes";
import ScoreRHS from "../Cards/ScoreRHS";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import { ODI_DESCRIPTION, T20_DESCRIPTION, TEST_DESCRIPTION } from "includes/ipl.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),

);
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const TeamRankingComponent = (props) => {
  const { pageAds = {} } = props;
  const { globalState = {} } = useContext(GlobalContext);
  const { t20_country_list = {} } = globalState;

  const teamRankingResult = props.data?.teamRankingResult;

  const tag_set_hi = {
    TEST: "टेस्ट रैंकिंग",
    ODI: "वनडे रैंकिंग",
    T20: "टी20 रैंकिंग",
  };

  const ranktype_value_set = props?.data.ranktype_value;

  const page_slower_set = ranktype_value_set?.toLowerCase();
  const pageurl =
    "https://www.hindi.news18.com/cricket/" + page_slower_set + "-ranking.html";

  //Highlighting the corresponding tab
  const Testactive = ranktype_value_set == "test" ? "active" : "";
  const ODIactive = ranktype_value_set == "odi" ? "active" : "";
  const T20active = ranktype_value_set == "t20" ? "active" : "";

  const h1_tag_set = tag_set_hi?.[ranktype_value_set?.toUpperCase()] || "रैंकिंग";
  return (
    <>
      <div className="news_page">
        <div className="container">
        <div className="CN-pageCN-scoreCardsection">
            {/* <SiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={props.pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}
              lazyload={true}
            /> */}
            <NewSiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={props.pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}
              lazyLoad={true}
            />
            <div className="CN-scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR />

            </div>
          </div>
          <div className="news_page_left">
            <div className="brade_crum">
            <BreadcrumbCommon breadCrumbArray={[
              {value: "हिंदी समाचार", slug: "/"},
              {value: "क्रिकेट", slug: "/cricket/"},
              {value: h1_tag_set}
            ]} />
              
              <div className="heading_title">
                <h1>{h1_tag_set}</h1>
              </div>
              <div className="tab_links">
                <a className={Testactive} href="/cricket/test-ranking.html">
                  टेस्ट रैंकिंग
                </a>
                <a className={ODIactive} href="/cricket/odi-ranking.html">
                  वनडे रैंकिंग
                </a>
                <a className={T20active} href="/cricket/t20-ranking.html">
                  टी20 रैंकिंग
                </a>
              </div>

              <table className="teamRanking">
                <thead>
                  <tr>
                    <th>रैंकिंग</th>
                    <th>टीम</th>
                    <th>मैच</th>
                    <th>पॉइंट</th>
                    <th>रेटिंग</th>
                  </tr>
                </thead>
                <tbody>
                  {teamRankingResult?.map((data, i) => {
                    const dataImage =
                      data?.image !=
                      "https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/.png"
                        ? data.image
                        : "";
                    // : "https://images.news18.com/static_news18/pix/ibnhome/news18/images/default-218x145.jpg";

                    var active_class = "";
                    if (i === 0) {
                      var active_class = "active";
                    }

                    return (
                      <>
                        {dataImage && (
                          <tr key={i} className={active_class}>
                            <td>{data?.rank}</td>
                            <td>
                              <div className="teambox">
                                <a>
                                  <div className="img big">
                                    <img
                                      src={dataImage}
                                      className="lazyload"
                                      alt={data?.Country}
                                      title={data?.Country}
                                      width="58px"
                                      height="38px"
                                    />
                                  </div>
                                  <span className="teamrname">
                                    {t20_country_list[data?.Country] ||
                                      data?.Country ||
                                      ""}
                                  </span>
                                </a>
                              </div>
                            </td>
                            <td>{data?.Matches || ""}</td>
                            <td>{data?.Points || ""}</td>
                            <td>{data?.Rating || ""}</td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="vsp20 clearfix"></div>
            <p className="pageContent">
              {ranktype_value_set == "test"
                ? TEST_DESCRIPTION
                : ranktype_value_set == "odi"
                ? ODI_DESCRIPTION
                : T20_DESCRIPTION}
            </p>

            <div className={"outBrainWrapper"}>
            <Taboola
                mode={TaboolaList.category.bottom.mode}
                id={TaboolaList.category.bottom.id}
                container={TaboolaList.category.bottom.container}
                placement={TaboolaList.category.bottom.placement}
              />
            </div>
          </div>

          <div className="news_page_right">
            <div className="CN-sec-r">
              <ScoreRHS
                pageAds={props?.pageAds}
                isIpl=""
                isT20=""
                recent=""
                upcoming=""
                url={pageurl}
                predictorData=""
                taboola ={true}
                taboolaList={TaboolaList.category}
              />
               {typeof pageAds !== "undefined" &&
              typeof pageAds.PG_Slider_1x1 !== "undefined" ? (
                // <SiteAd
                //   slotId="PG_Slider_1x1"
                //   adUnit={pageAds.PG_Slider_1x1}
                //   sizes={[[1, 1]]}
                //   removeAdSpan={true}
                //   loadonScroll={true}
                // />
                <NewSiteAd
                  slotId="PG_Slider_1x1"
                  adUnit={pageAds.PG_Slider_1x1}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        article,
        aside,
        div,
        figure,
        form,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        li,
        p,
        section,
        ul {
          box-sizing: border-box;
          font-size: inherit;
        }
        * {
          font-family: "Mukta", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .news_page {
          width: 100%;
          background: #f5f5f5;
          overflow: hidden;
        }
        .news_page_left {
          font-family: "Mukta", sans-serif;
          width: 924px;
          float: left;
        }
        .news_page_right {
          width: 300px;
          float: right;
          position: relative;
        }
        .container {
          max-width: 1284px;
          margin: auto;
          padding: 10px;
        }
        .news_page .container {
          background: #fff;
          overflow: hidden;
        }
        .brade_crum ul {
          display: flex;
          padding-bottom: 5px;
          color: #000;
          align-items: center;
          border-bottom: 1px #ccc dotted;
          font-family: "Fira Sans";
          margin-bottom: 15px;
        }
        .brade_crum li {
          text-transform: uppercase;
          display: flex;
          align-items: center;
          font-weight: normal;
          font-size: 11px;
          padding: 0 4px;
          color: #000;
        }
        .brade_crum li a {
          color: #000;
          text-decoration: none;
        }
        .brade_crum li a:hover {
          color: red;
        }
        .brade_crum li h1 {
          color: #969696;
          text-decoration: none;
          font-weight: normal;
        }

        .brade_crum li:first-child {
          padding-left: 0;
        }

        .heading_title {
          font-family: "Fira Sans";
          font-weight: normal;
          padding: 0;
          position: relative;
          margin-bottom: 10px;
          font-size: 22px;
          color: #e1261d;
        }
        .heading_title h2 {
          font-weight: 700;
          background: #fff;
          position: relative;
          z-index: 1;
          display: inline-block;
          padding-right: 5px;
        }
        .heading_title:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: #ff0000;
          bottom: 2px;
          left: 0;
        }

        .tab_links {
          background: #f5f5f5;
          display: flex;
          border-top: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
          margin: 14px 0;
        }
        .tab_links a {
          font-size: 16px;
          font-family: "Fira Sans";
          padding: 13px 15px;
          display: block;
          text-transform: uppercase;
        }
        .tab_links a.active {
          border-bottom: 3px #e1261d solid;
          color: #e1261d;
          font-weight: 700;
        }

        .teamRanking {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          margin-bottom: 30px;
        }
        .teamRanking tr th {
          background: #001d42;
          color: #fff;
          font-size: 11px;
          text-transform: uppercase;
          font-family: "Fira Sans";
          padding: 14px 0;
          padding-right: 10px;
        }
        .teamRanking tr th:nth-child(1) {
          text-align: left;
          padding-left: 20px;
        }
        .teamRanking tr th:nth-child(2) {
          width: 40%;
          text-align: left;
        }

        .teambox a {
          display: flex;
          align-items: center;
        }
        .teamRanking tbody tr td:nth-child(1) {
          text-align: left;
          padding-left: 20px;
          width: 10%;
        }
        .teamRanking tbody tr {
          text-align: center;
          border-bottom: 1px solid #d8d8d8;
          background: #f5f5f5;
          height: 50px;
          vertical-align: middle;
          font-family: "Fira Sans";
        }
        .img.big img {
          margin-right: 10px;
        }
        .teamRanking tbody tr td {
          font-size: 13px;
          padding-top: 5px;
          padding-bottom: 5px;
          text-align: center;
          vertical-align: middle;
          color: #202020;
          text-transform: uppercase;
        }
        .teambox span {
          font-weight: normal;
        }
        .teamRanking tbody tr.active {
          background: #fff;
        }
        .teamRanking tbody tr.active td {
          font-size: 17px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .active .teamrname {
          font-weight: bold;
          font-size: 16px;
        }
        .teamrname {
          font-size: 16px;
        }
        .clearfix {
          clear: both;
        }
        .vsp20 {
          margin-top: 20px;
        }
        .pageContent {
          font-size: 16px;
          line-height: 1.5;
          margin-top: 10px;
        }

        .CN-section .CN-sec-r {
          width: 300px;
          min-width: 300px;
        }
        .CN-pageCN-scoreCardsection {
          min-height: 60px;
          background: rgb(0 0 0 / 13%);
          margin-top: 10px;
        }
        .CN-scoreCardsection {
          background: #f5f5f5;
          padding: 0 15px;
        }

      `}</style>
    </>
  );
};

export default TeamRankingComponent;
