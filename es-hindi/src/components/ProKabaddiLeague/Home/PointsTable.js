import React from "react";
import { teamTranslationArr } from "includes/proKabaddi.helper";

const PointsTable = (tableData) => {
  return (
    <>
      <div className="standings-widget-section">
        <h3 className="double-title">
          <span className="small-title">पॉइंट टेबल</span>
        </h3>
        <table className="general-tbl standing-widget-tbl">
          <thead>
            <tr>
              <th>टीमें</th>
              <th>खेले</th>
              <th>जीते</th>
              <th>हारे</th>
              <th>टाई</th>
              <th>पॉइंट</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.tableData?.slice(0, 6)?.map((item, index) => {
              const hindiName = item.team_name.replace(/ /g, '-').replace(/\./g, '').toLowerCase();
              return (
                <tr key={hindiName}>
                  <td>
                    <a
                      href={`/pro-kabaddi-league/${hindiName}-${item.team_id}/`}
                      title={teamTranslationArr[hindiName]}
                    >
                      {teamTranslationArr[hindiName]}
                    </a>
                  </td>
                  <td>{item.played}</td>
                  <td>{item.wins}</td>
                  <td>{item.lost}</td>
                  <td>{item.tied}</td>
                  <td>{item.points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="view-all-div">
          <a
            href="/pro-kabaddi-league/pkl-point-table/"
            title="View Complete Points Table"
          >
            पूरा देखें पॉइंट टेबल
          </a>
        </div>
      </div>
    </>
  );
};
export default PointsTable;
