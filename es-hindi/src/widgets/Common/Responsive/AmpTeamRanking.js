import React, { useContext, useState } from "react";
import CnTabs from "./CnTabs";
import { GlobalContext } from "GlobalStore";

const AmpTeamRanking = ({ teamRankingData = [] }) => {
  const { globalState = {} } = useContext(GlobalContext);
  const { t20_country_list = {} } = globalState;

  const [iselected, setIselected] = useState("टी20");
  const selectHandler = (tab) => {
    {
      batRankDataODI[0].no != "N" ||
      batRankDataT20[0].no != "N" ||
      batRankDataTest[0].no != "N"
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
          isAmp={true}
          tabs={["टेस्ट", "वनडे", "टी20"]}
          selected={iselected}
          selectHandler={selectHandler}
        >
          <div className="tmrnk-tbl">
            <table cellPadding="0" cellSpacing="0" width="100%">
              <tbody>
                <tr>
                  <th>रैंक</th>
                  <th>टीम</th>
                  <th>पॉइंट</th>
                  <th>रेटिंग</th>
                </tr>
                {teamRankingData &&
                  teamRankingData?.length &&
                  teamRankingData.map((rankData, index) => (
                    <tr key={index}>
                      <td>{rankData.no}</td>
                      <td>
                        {t20_country_list[rankData.Country] || rankData.Country}
                      </td>
                      <td>{rankData.Points}</td>
                      <td>{rankData.Rating}</td>
                    </tr>
                  ))}

                <tr>
                  <td className="flrnk" colSpan="4">
                    {/* <a href="https://hindi.news18.com/cricket/test-ranking.html">फुल रैंकिंग</a> */}
                    <a href="https://hindi.news18.com/cricket/t20-ranking.html">
                      फुल रैंकिंग
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CnTabs>
      </div>
      <style jsx global>{`
        .CN-TeamRanking {clear:both;margin-bottom:20px; min-height360px; }
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
          // font-family: 'Mukta',sans-serif !important;
          font-weight: bold;
        }
        .CN-Mobile-HomeOuter .CN-TeamRanking .tmrnk-tbl tr td.flrnk{
          padding: 5px 0 0 0;
        }
    `}</style>
    </>
  );
};

export default AmpTeamRanking;
