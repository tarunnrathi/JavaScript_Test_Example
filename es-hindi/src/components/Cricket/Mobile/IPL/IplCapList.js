import React from "react";

const IplCapList = ({
  type,
  heading,
  data,
  dataDisplay,
  ImageIdsAvailable=[],
}) => {
  return (
    <>
      <div className="matc_h">
        <div className="iplcaps-table">
            <table
              className={`match-table ${
                type === "orange-1" ? "CN-run_s" : "CN-wicket_s"
              }`}
              cellSpacing="0"
              cellPadding="0"
            >
              <tbody>
                <tr>
                  {heading.map((col) => (
                    <th key={col.id}>{col.name}</th>
                  ))}
                </tr>
                {data.map((player, index) => {
                  const imageURL = ImageIdsAvailable.includes(player.player_id)
                    ? `https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/128X128/${player.player_id}.png`
                    : "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png";
                  return (
                    <tr key={`capList${index}`}>
                      <td>
                        <a href="javascript:void(0)">
                          <div className="playerbox">
                            <div className="img">
                              <img
                                loading="lazy"
                                src={imageURL}
                                data-src={imageURL}
                                alt="ipl"
                                width="30"
                                height="30"
                              />
                            </div>
                            <div className="txt">
                              <h3 className="playername">{player.player_name}</h3>
                            </div>
                          </div>
                        </a>
                      </td>
                      <td>{player.team_short_name}</td>
                      <td>{player.matches_played}</td>
                      <td>
                        {dataDisplay === "sixes"
                          ? player.sixes
                          : dataDisplay === "runs_scored"
                          ? player.runs_scored
                          : player.wickets}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          {data.length < 5 && data.length > 0 && (
            <a
              href={
                type === "orange-1"
                  ? "/cricket/ipl/orange-cap/"
                  : "/cricket/ipl/purple-cap/"
              }
              className="full_tbl"
            >
              पूरी तालिका [+]
            </a>
          )}
        </div>
      </div>
      <style jsx global>{`
        .iplcaps-table {
          border-bottom: 4px solid #eeeeee;
        }
        .CN-run_s {
          margin-bottom: 10px;
        }
        .CN-wicket_s tr th {
          background: #001d42;
        }
        .CN-run_s tr th {
          background: #f55b00;
        }
        .match-table {
          width: 100%;
          font-size: 13px;
        }
        .full_tbl {
          display: block;
          text-align: center;
          margin: 10px auto;
          width: 60%;
          border: 2px solid #e1261c;
          border-radius: 20px;
          height: 28px;
          line-height: 28px;
          color: #e1261c;
          font-size: 14px;
          font-weight: bold;
        }
        .match-table {
          width: 100%;
          font-size: 13px;
        }
        .match-table tr:nth-child(odd) {
          background: #f5f5f5;
        }
        .match-table tr th {
          text-transform: uppercase;
          color: #fff;
          padding: 10px;
          line-height: 14px;
          font-size: 12px;
        }
        .match-table tr td:first-child,
        .match-table tr th:first-child {
          text-align: left;
        }
        .match-table tr:nth-child(even) {
          background: #fff;
        }
        .match-table tr td:first-child,
        .match-table tr th:first-child {
          text-align: left;
        }
        .match-table tr td {
          padding: 5px 10px;
          height: 30px;
          vertical-align: middle;
          color: #001d42;
          border-bottom: 2px solid #d8d8d8;
        }
        .match-table tr td:nth-child(2),
        .match-table tr th:nth-child(2) {
          text-align: left;
        }
        .match-table tr td .playerbox {
          display: flex;
          align-items: center;
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
        .match-table tr td .playerbox .img img {
          width: 100%;
        }
        .match-table tr td .playerbox .txt .playername {
          color: #001d42;
          font-size: 13px;
          text-transform: capitalize;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default IplCapList;
