import React from "react";

const PurpleOrangeCapCommonTable = ({
  headers,
  backgroundColour,
  tableData = [],
  columnKey = "",
  ImageIdsAvailable = [],
}) => {
  const addImageFallback = (event) => {
    event.currentTarget.src =
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png";
  };

  return (
    <>
      <table
        className="match-table CN-wicket_s"
        cellSpacing="0"
        cellPadding="0"
      >
        <tbody>
          <tr bgcolor={backgroundColour}>
            {headers.map((header) => (
              <th key={header.id}>{header.title}</th>
            ))}
          </tr>
          {tableData.map((player, index) => {
            const imageURL = ImageIdsAvailable.includes(player.player_id)
              ? `https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/128X128/${player.player_id}.png`
              : "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png";
            return (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <a href="javascript:void(0)">
                    <div className="playerbox">
                      <div className="img">
                        <img
                          style={{
                            backgroundImage: `url("https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png")`,
                          }}
                          className=""
                          loading="lazy"
                          src={imageURL}
                          data-src={imageURL}
                          onError={addImageFallback}
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
                <td>{player[columnKey]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx global>{`
        .match-table {
          width: 100%;
          font-size: 13px;
        }
        .match-table tr:nth-child(odd) {
          background: #f5f5f5;
        }
        .match-table tr:nth-child(even) {
          background: #fff;
        }
        .match-table tr th:nth-child(1),
        .match-table tr td:nth-child(1) {
          width: 50px;
        }
        .match-table tr th:nth-child(2),
        .match-table tr td:nth-child(2) {
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
        .match-table tr td {
          text-align: center;
          padding: 5px 0;
          height: 30px;
          vertical-align: middle;
          color: #001d42;
          border-bottom: 2px solid #d8d8d8;
        }
        .CN-wicket_s tr th {
          background: ${backgroundColour};
        }
        .match-table tr th {
          text-transform: uppercase;
          color: #fff;
          padding: 15px 10px 10px 10px;
          line-height: 14px;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};

export default PurpleOrangeCapCommonTable;
