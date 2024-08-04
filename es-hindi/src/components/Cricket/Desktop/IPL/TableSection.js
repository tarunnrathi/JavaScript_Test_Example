import React from "react";
const headerArr = [
  { id: 1, name: "Pos" },
  { id: 2, name: "Teams" },
  { id: 3, name: "Matches" },
  { id: 4, name: "Points" },
  { id: 5, name: "NRR" },
];
const teamsURLIdByTeamId = {
  2955: "gujarat-titans-gt",
  1110: "rajasthan-royals-rr",
  2954: "lucknow-super-giants-lsg",
  1105: "royal-challengers-bangalore-rcb",
  1109: "delhi-capitals-dc",
  1107: "punjab-kings-pbks",
  1106: "kolkata-knight-riders-kkr",
  1379: "sunrisers-hyderabad-srh",
  1108: "chennai-super-kings-csk",
  1111: "mumbai-indians-mi",
};
const TableSection = ({ tableData }) => {
  return (
    <>
      <div className="CN-points-section">
        <div className="table_head_ing">
          <h3 className="ipl_headin_g">अंक तालिका</h3>
          <a href="/cricket/ipl/points-table/" className="full_tbl">
            पूरी तालिका [+]
          </a>
        </div>
        <table className="match-table">
          <tbody>
            <tr>
              {headerArr.map((col) => (
                <th key={col.id}>{col.name}</th>
              ))}
            </tr>
            {tableData?.length > 0 && tableData?.map((data) => {
              const redirectionURL = teamsURLIdByTeamId[data.id];
              return (
                <tr key={data?.id}>
                  <td>{data?.pos}</td>
                  <td>
                    <a href={`/cricket/ipl/${redirectionURL}/`}>
                      <div className="playerbox">
                        <div className="img flag_s">
                          <img
                            className=""
                            loading="lazy"
                            src={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/${data?.id}.png`}
                            data-src={data?.teamLogo}
                            alt="ipl"
                            width="42"
                            height="24"
                          />
                        </div>
                        <div className="txt">
                          <h3 className="playername re_d">{data?.name}</h3>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td>{data?.p}</td>
                  <td>{data?.pts}</td>
                  <td>{data?.nrr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style jsx global>{`
        .match-table tr th:nth-child(2),
        .match-table tr td:nth-child(2) {
          text-align: left;
        }
        .match-table tr td .playerbox .img {
          width: 30px;
          height: 30px;
          margin-right: 15px;
          border-radius: 50%;
          background: #fff;
          overflow: hidden;
          box-shadow: 0 1px 8px #3336;
        }
        .match-table {
          width: 100%;
          font-size: 13px;
        }
        .match-table tr td .playerbox {
          display: flex;
          align-items: center;
        }
        .flag_s {
          width: 42px !important;
          height: 24px !important;
          background: none !important;
          border-radius: initial !important;
          box-shadow: none !important;
        }
        .flag_s img {
          width: 100%;
          height: 100%;
        }
        .match-table tr td .playerbox .img img {
          width: 100%;
        }
        .re_d {
          color: #ff4233 !important;
        }
        .match-table tr td .playerbox .txt .playername {
          color: #001d42;
          font-size: 13px;
          text-transform: capitalize;
          text-decoration: underline;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .match-table tr th:nth-child(1),
        .match-table tr td:nth-child(1) {
          width: 50px;
        }
        .match-table tr td {
          text-align: center;
          padding: 5px 0;
          height: 30px;
          vertical-align: middle;
          color: #001d42;
          border-bottom: 2px solid #d8d8d8;
        }
        .CN-points-section {
          width: 49%;
        }
        .table_head_ing {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .table_head_ing {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .table_head_ing a.full_tbl {
          font-size: 11px;
          line-height: 13px;
          color: #ff0000;
          display: block;
          padding-top: 5px;
          text-decoration: underline;
          box-sizing: border-box;
        }
        .match-table tr th {
          background: #001d42;
          text-transform: uppercase;
          color: #fff;
          padding: 15px 10px 10px 10px;
          line-height: 14px;
          font-size: 12px;
        }
        .match-table tr th:nth-child(1),
        .match-table tr td:nth-child(1) {
          width: 50px;
        }
        .match-table tr:nth-child(odd) {
          background: #f5f5f5;
        }
        .match-table {
          width: 100%;
          font-size: 13px;
        }
      `}</style>
    </>
  );
};
export default TableSection;