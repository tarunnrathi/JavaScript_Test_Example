import React, { useContext, useEffect, useState } from "react";
import "lazysizes";
import CnTabs from "./CnTabs";
import { GlobalContext } from "GlobalStore";
// import getConfig from "next/config";
import SITE_CONfIG from "config/site.config";

// const { publicRuntimeConfig } = getConfig();

const TeamRanking = () => {
  const dummy = new Array(5).fill({
    no: "N",
    Country: "Loading",
    Rating: "...",
    Points: "...",
  });
  const { globalState = {} } = useContext(GlobalContext);
  const { t20_country_list = {} } = globalState;
  const [batRankDataTest, setbatRankDataTest] = useState(dummy);
  const [batRankDataODI, setbatRankDataODI] = useState(dummy);
  const [batRankDataT20, setbatRankDataT20] = useState(dummy);
  const [iselected, setIselected] = useState("टी20");

  useEffect(() => {
    // let teamCricketRanking;
    let T20MatchRanking;
    try {
      fetch(`${SITE_CONfIG.CRICKET_NEXT_CSR_API}team_ranking_t20_hi.json`)
        .then((res) => res.json())
        .then((res) => {
          T20MatchRanking = res?.slice(0, 5);
          setbatRankDataT20(T20MatchRanking);
        })
        .catch((err) => {
          console.log("error in api", err);
        });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  function getRankingData(seriesType) {
    // let teamCricketRanking;
    const SeriesRedisKey =
      seriesType === "टी20" ? "t20" : seriesType === "वनडे" ? "odi" : "test";
    try {
      fetch(
        `${SITE_CONfIG.CRICKET_NEXT_CSR_API}team_ranking_${SeriesRedisKey}_hi.json`
      )
        .then((res) => res.json())
        .then((res) => {
          const dataList = res?.slice(0, 5);
          if (seriesType === "वनडे") {
            setbatRankDataODI(dataList);
          } else if (seriesType === "टी20") {
            setbatRankDataT20(dataList);
          } else {
            setbatRankDataTest(dataList);
          }
        })
        .catch((err) => {
          console.log("error in api", err);
        });
    } catch (error) {
      console.log("error", error);
    }
  }

  const selectHandler = (tab) => {
    {
      batRankDataODI[0].rank !== "N" ||
      batRankDataT20[0].rank !== "N" ||
      batRankDataTest[0].rank !== "N"
        ? getRankingData(tab)
        : "";
    }
    setIselected(tab);
  };
  return (
    <>
      <div className="CN-TeamRanking">
        <h2 className="tmrnk-hd">टीम रैंकिंग</h2>
        <CnTabs
          tabs={["टेस्ट", "वनडे", "टी20"]}
          selected={iselected}
          selectHandler={selectHandler}
        >
          <div className="tmrnk-tbl">
            {iselected === "टेस्ट" && (
              <table cellPadding="0" cellSpacing="0" width="100%">
                <tbody>
                  <tr>
                    <th>रैंक</th>
                    <th>टीम</th>
                    <th>पॉइंट</th>
                    <th>रेटिंग</th>
                  </tr>
                  {batRankDataTest &&
                    batRankDataTest.map((rankData, index) => (
                      <tr key={`test-` + index}>
                        <td>{rankData.rank}</td>
                        <td>
                          {t20_country_list[rankData.Country] ||
                            rankData.Country}
                        </td>
                        <td>{rankData.Points}</td>
                        <td>{rankData.Rating}</td>
                      </tr>
                    ))}

                  <tr>
                    <td className="flrnk" colSpan="4">
                      <a href="/cricket/test-ranking.html">फुल रैंकिंग</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {iselected === "वनडे" && (
              <table cellPadding="0" cellSpacing="0" width="100%">
                <tbody>
                  <tr>
                    <th>रैंक</th>
                    <th>टीम</th>
                    <th>पॉइंट</th>
                    <th>रेटिंग</th>
                  </tr>
                  {batRankDataODI &&
                    batRankDataODI.map((rankData, index) => (
                      <tr key={`odi-` + index}>
                        <td>{rankData.rank}</td>
                        <td>
                          {t20_country_list[rankData.Country] ||
                            rankData.Country}
                        </td>
                        <td>{rankData.Points}</td>
                        <td>{rankData.Rating}</td>
                      </tr>
                    ))}
                  <tr>
                    <td className="flrnk" colSpan="4">
                      <a href="/cricket/odi-ranking.html">फुल रैंकिंग</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {iselected === "टी20" && (
              <table cellPadding="0" cellSpacing="0" width="100%">
                <tbody>
                  <tr>
                    <th>रैंक</th>
                    <th>टीम</th>
                    <th>पॉइंट</th>
                    <th>रेटिंग</th>
                  </tr>
                  {batRankDataT20 &&
                    batRankDataT20.map((rankData, index) => (
                      <tr key={`t20-` + index}>
                        <td>{rankData.rank}</td>
                        <td>
                          {t20_country_list[rankData.Country] ||
                            rankData.Country}
                        </td>
                        <td>{rankData.Points}</td>
                        <td>{rankData.Rating}</td>
                      </tr>
                    ))}
                  <tr>
                    <td className="flrnk" colSpan="4">
                      <a href="/cricket/t20-ranking.html">फुल रैंकिंग</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </CnTabs>
      </div>
      <style jsx global>{`
        .CN-TeamRanking {clear:both;margin-bottom:20px;font-family: 'Karma',serif !important; min-height360px; }
        .tmrnk-hd {background: #000000;padding: 10px 10px;font-size: 16px;color: #ffffff;text-transform: uppercase;font-weight: bold;}
        .tmrnk-tab {margin: 10px 0 10px 0;display: flex;}
        .tmrnk-tab li {position: relative;}
        .tmrnk-tab li a {background: #fff;height: 30px;line-height: 30px;font-size: 14px;color: #949494;overflow: hidden;padding: 0 10px;display: block;text-transform: uppercase;cursor:pointer;}
        .tmrnk-tab li.active a {font-weight: bold;background: #E1261D;color: #fff;overflow: visible;}
        .tmrnk-tab li.active a:before {content: "";border-bottom: 10px solid #E1261D;border-right: 10px solid transparent;position: absolute;bottom: -4px;left: 50%;margin-left: -4px;transform: rotate(-45deg);}
        .tmrnk-tbl table{min-height:267px;}
        .tmrnk-tbl{border-top:1px solid #dfdfdf; color:#000;}
        .tmrnk-tbl th, .tmrnk-tbl td{padding:13px 0; text-align:left;line-height:14px;}
        .tmrnk-tbl th{font-size: 14px;font-weight: bold;color: #000000;}
        .tmrnk-tbl td{font-size:13px}
        .tmrnk-tbl tr:nth-child(even){background:#f3f3f3}
        .tmrnk-tbl tr:nth-child(odd){background:#fff}
        .tmrnk-tbl tr td:first-child{padding:10px 10px}
        .tmrnk-tbl tr td.flrnk{text-align: center;background: #fff;border-top: 1px solid #dfdfdf;padding: 5px 0;font-family: 'Segoe Pro bold';}
        .tmrnk-tbl tr td.flrnk a{color:#FF0000; font-size:11px; text-transform:uppercase}
        .CN-Mobile-HomeOuter .CN-TeamRanking{
          font-family: 'Karma',serif !important;
          padding: 10px;
          background: #ffffff;
          border: 10px solid #DADADA;
          margin-bottom: 30px;
        }
        .CN-Mobile-HomeOuter .CN-TeamRanking .tmrnk-tab li a{
          font-size: 16px;
        }
        .CN-Mobile-HomeOuter .CN-TeamRanking .tmrnk-tab th, .CN-Mobile-HomeOuter .CN-TeamRanking .tmrnk-tbl td{
          padding: 8px 0;
        }
        .CN-Mobile-HomeOuter .CN-TeamRanking .tmrnk-tbl tr td:first-child {
          padding: 10px 10px;
        }
        .CN-Mobile-HomeOuter .CN-TeamRanking .tmrnk-tbl tr td.flrnk a {
          font-size: 13px;
          font-family: 'Mukta',sans-serif !important;
          font-weight: bold;
        }
        .CN-Mobile-HomeOuter .CN-TeamRanking .tmrnk-tbl tr td.flrnk{
          padding: 5px 0 0 0;
        }
    `}</style>
    </>
  );
};

export default TeamRanking;
