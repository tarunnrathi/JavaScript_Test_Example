import React, { useContext } from "react";
import dynamic from "next/dynamic";
import "lazysizes";
import { GlobalContext } from "GlobalStore";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import { ODI_DESCRIPTION, T20_DESCRIPTION, TEST_DESCRIPTION } from "includes/ipl.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
    () => import("widgets/Common/Responsive/CrTopScoreWidget"),
    { ssr: false }
  );
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const TeamRankingComponent = (props) => {
  const { pageAds = {} } = props;
  const { globalState = {} } = useContext(GlobalContext);
  const { t20_country_list = {} } = globalState;

  const tag_set_hi = {
    TEST: "टेस्ट रैंकिंग",
    ODI: "वनडे रैंकिंग",
    T20: "टी20 रैंकिंग",
  };

  const teamRankingResult = props.data?.teamRankingResult;

  const ranktype_value_set = props?.data.ranktype_value;

  //Highlighting the corresponding tab
  const Testactive = ranktype_value_set == "test" ? "active" : "";
  const ODIactive = ranktype_value_set == "odi" ? "active" : "";
  const T20active = ranktype_value_set == "t20" ? "active" : "";

  const h1_tag_set = tag_set_hi?.[ranktype_value_set?.toUpperCase()];
  return (
    <>
      <div className="news_page">
        <div className="container">
        <div className="CN-pageCN-scoreCardsection">
            <div className="bet__ad">
              {/* <SiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={pageAds?.ScoreCard_ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              /> */}
              <NewSiteAd
                  slotId="Mobile_ScoreCard_ad"
                  adUnit={pageAds?.ScoreCard_ad}
                  sizes={[[320, 60]]}
                  width={320}
                  height={60}
                  removeAdSpan={true}
                  lazyLoad={true}
                />
            </div>
            <div className="CN__scoreCardsection">
              {/* scorecard component */}
              <DynamicCrTopScoreWidgetWithNoSSR isMobile />
            </div>
          </div>
        <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds?.ATF_320}
                sizes={[
                 [300, 250],
                  [336, 280]
                ]}
              ></SiteAd> */}
              <NewSiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds?.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280]
                ]}
              />
            </div>
        </div>
          <div className="news_page_left">
          <BreadcrumbCommon breadCrumbArray={[
              {value: "हिंदी समाचार", slug: "/"},
              {value: "क्रिकेट", slug: "/cricket/"},
              {value: h1_tag_set}
            ]} />
            <h1 className="heading_title">{h1_tag_set}</h1>
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
                          <td>{data?.Matches}</td>
                          <td>{data?.Points}</td>
                          <td>{data?.Rating}</td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="vsp20 clearfix"></div>
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                width={300}
                height={280}
                slotId={"mobileAdNew300x250_2"}
                adUnit={pageAds.BTF_300}
                sizes={[
                  [300, 250],
                  [336, 280]

                ]}
                lazyload={true}
              ></SiteAd> */}
              <NewSiteAd
                width={300}
                height={280}
                slotId={"mobileAdNew300x250_2"}
                adUnit={pageAds.BTF_300}
                sizes={[
                  [300, 250],
                  [336, 280]

                ]}
                lazyLoad={true}
              />
            </div>
          </div>
        <div className="vsp20 clearfix"></div>
        <p className="pageContent">
        {ranktype_value_set == "TEST"
                ? TEST_DESCRIPTION
                : ranktype_value_set == "ODI"
                ? ODI_DESCRIPTION
                : T20_DESCRIPTION}
        </p>
        <Taboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
/>
        {typeof pageAds.PG_1x1_2 !== "undefined" &&
          pageAds.PG_1x1_2 !== "" ? (
            // <SiteAd
            //   slotId="PG_1x1_2"
            //   adUnit={pageAds.PG_1x1_2}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="PG_1x1_2"
              adUnit={pageAds.PG_1x1_2}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={false}
            />
          ) : null}
          {typeof pageAds.PG_1x1_3 !== "undefined" &&
          pageAds.PG_1x1_3 !== "" ? (
            // <SiteAd
            //   slotId="PG_1x1_3"
            //   adUnit={pageAds.PG_1x1_3}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="PG_1x1_3"
              adUnit={pageAds.PG_1x1_3}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={true}
           />
          ) : null}
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
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .CN__scoreCardsection {
            // padding: 0 5px;
            margin: 0 10px;
          }
          .CN-pageCN-scoreCardsection {
            min-height: 115px;
            background: rgb(0 0 0 / 13%);
          }
  
          .bet__ad {
            background: #fff;
          }
  
          .CN-pageCN-scoreCardsection .adunitContainer {
            display: flex;
            justify-content: center;
          }
        .brade_crum {
          font-family: "Mukta", 'sans-serif';
          text-transform: uppercase;
          min-height: 20px;
          overflow: auto;
          white-space: nowrap;
          -webkit-text-size-adjust: 100%;
          font-size: 13px;
          margin-bottom: 10px;
          padding: 0 10px;
        }
        .brade_crum a {
          color: #5a5a5a;
          font-size: 100%;
          min-height: 20px;
          margin: 0 8px;
        }
        .brade_crum a:first-child {
          margin-left: 0;
        }
        .bredcrum_heading {
          display: inline-block;
          color: #5a5a5a;
          font-size: 100%;
          font-weight: normal;
          margin-left: 8px;
        }

        .add {
            background: #dbdde3;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
            margin-bottom: 10px;
            display: inline-block;
            width: 100%;
            z-index: 1;
            color: #797e90 !important;
            //height: 300px;
            overflow: hidden;
          }
          .addinner-box {
            //background: #e8e9ed;
            background: #dbdde3;
            min-width: 250px;
            display: inline-block;
            margin: 0 auto;
            text-align: center;
            min-height: auto;
            padding: 0;
            box-sizing: border-box;
            color: #797e90 !important;
            font-size: 11px;
            line-height: 16px;
          }
  
          // div.addinner_box_300x250 {
          //   height: 268px;
          //   width: 300px;
          // }
        .news_page {
          width: 100%;
          background: #f5f5f5;
          overflow: hidden;
          padding-top: 20px;
        }
        .news_page_left {
          font-family: "Mukta", 'sans-serif';
          width: 100%;
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
          padding: 0px;
        }
        .news_page .container {
          background: #fff;
          overflow: hidden;
        }
        .heading_title {
          background: #ed2128;
          text-align: left;
          padding-left: 10px;
          height: 36px;
          line-height: 36px;
          font-size: 18px;
          color: #fff;
        }
        .heading_title h2 {
          font-size: 18px;
          text-transform: uppercase;
          font-family: "Mukta", sans-se;
        }

        .tab_links {
          background: #f5f5f5;
          display: flex;
          border-top: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
          margin: 14px 0;
        }
        .tab_links a {
          font-size: 13px;
          font-family: "Mukta", 'sans-serif';
          padding: 13px 10px;
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
        }
        .teamRanking tr th {
          background: #001d42;
          color: #fff;
          font-size: 10px;
          text-transform: uppercase;
          font-family: "Mukta", 'sans-serif';
          padding: 8px 6px;
          padding-right: 10px;
        }
        .teamRanking tr th:nth-child(1) {
          text-align: left;
          padding-left: 10px;
        }
        .teamRanking tr th:nth-child(2) {
          width: 40%;
          text-align: left;
        }

        .teambox a {
          display: flex;
          align-items: center;
          text-decoration: underline;
          font-family: "Playfair Display", serif;
          text-align: left;
        }
        .teamRanking tbody tr td:nth-child(1) {
          text-align: left;
          padding-left: 10px;
        }
        .teamRanking tbody tr {
          text-align: center;
          border-bottom: 1px solid #d8d8d8;
          background: #f5f5f5;
          height: 50px;
          vertical-align: middle;
          font-family: "Mukta", 'sans-serif';
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
          font-weight: bold;
          font-family: "Mukta", 'sans-serif';
        }
        .teamRanking tbody tr.active {
          background: #fff;
        }
        .teamRanking tbody tr.active td {
          font-size: 17px;
          font-weight: 600;
          text-transform: uppercase;
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
          margin: 10px 6px;
          
        }
      `}</style>
    </>
  );
};

export default TeamRankingComponent;
