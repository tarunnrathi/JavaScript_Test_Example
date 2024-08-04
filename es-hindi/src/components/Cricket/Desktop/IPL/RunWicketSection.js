import React from "react";
const orangeHeadingArr = [
  { id: 1, name: "Pos" },
  { id: 2, name: "Player" },
  { id: 3, name: "Team" },
  { id: 4, name: "Matches" },
  { id: 5, name: "Runs" },
];
const purpleHeadingArr = [
  { id: 1, name: "Pos" },
  { id: 2, name: "Player" },
  { id: 3, name: "Team" },
  { id: 4, name: "Matches" },
  { id: 5, name: "Wickets" },
];
const RunWicketSection = ({
  orangeCapData=[],
  purpleCapData=[],
  ImageIdsAvailable,
}) => {
  const addImageFallback = (event) => {
    event.currentTarget.src =
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png";
  };
  return (
    <>
      <div className="CN-run-wickets-section">
        <div className="sub_table">
          <div className="table_head_ing">
            <div className="capicon">
              <img
                src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Orange-cap.png"
                alt="Orange Cap"
              />
            </div>
            <h3 className="ipl_headin_g">
              ऑरेंज कैप<span> - सबसे बड़ा 'रन'वीर</span>
            </h3>
            <a href="/cricket/ipl/orange-cap-holder/" className="full_tbl">
              पूरी तालिका [+]
            </a>
          </div>
          <table
            className="match-table CN-run_s"
            cellSpacing="0"
            cellPadding="0"
          >
            <tbody>
              <tr bgcolor="#f55b00">
                {orangeHeadingArr.map((col) => (
                  <th style={{ background: "#f55b00" }} key={col?.id}>
                    {col?.name}
                  </th>
                ))}
              </tr>
              {orangeCapData?.length > 0 && orangeCapData.map((player, index) => {
                const imageURL = ImageIdsAvailable?.includes(player.player_id)
                  ? `https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/128X128/${player?.player_id}.png`
                  : "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png";
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a href="javascript:void(0)">
                        <div className="playerbox">
                          <div className="img">
                            <img
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
                            <h3 className="playername">{player?.player_name}</h3>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>{player?.team_short_name}</td>
                    <td>{player?.matches_played}</td>
                    <td>{player?.runs_scored}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="sub_table">
          <div className="table_head_ing">
            <div className="capicon">
              <img
                src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Purple-cap.png"
                alt="Purple Cap"
              />
            </div>
            <h3 className="ipl_headin_g">
              पर्पल कैप<span> - सबसे बड़ा 'शिकारी'</span>
            </h3>
            <a href="/cricket/ipl/purple-cap-holder/" className="full_tbl">
              पूरी तालिका [+]
            </a>
          </div>
          <table
            className="match-table CN-run_s"
            cellSpacing="0"
            cellPadding="0"
          >
            <tbody>
              <tr bgcolor="#f55b00">
                {purpleHeadingArr.map((col) => (
                  <th key={col?.id} style={{ background: "#60398f" }}>
                    {col?.name}
                  </th>
                ))}
              </tr>
              {purpleCapData?.length >0  && purpleCapData.map((player, index) => {
                const imageURL = ImageIdsAvailable.includes(player.player_id)
                  ? `https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/128X128/${player.player_id}.png`
                  : "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png";
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a href="javascript:void(0)">
                        <div className="playerbox">
                          <div className="img">
                            <img
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
                            <h3 className="playername">{player?.player_name}</h3>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>{player?.team_short_name}</td>
                    <td>{player?.matches_played}</td>
                    <td>{player?.wickets}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx global>{`
        .CN-run-wickets-section {
          width: 49%;
        }
        .table_head_ing .capicon {
          height: 15px;
        }
        .match-table tr:nth-child(even) {
          background: #fff;
        }
        .match-table tr:nth-child(odd) {
          background: #f5f5f5;
        }
        .match-table tr th:nth-child(1),
        .match-table tr td:nth-child(1) {
          width: 50px;
        }
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
        .match-table tr td .playerbox .img img {
          width: 100%;
        }
        .match-table tr td .playerbox .txt .playername {
          color: #001d42;
          font-size: 13px;
          text-transform: capitalize;
          text-decoration: underline;
        }
        .match-table tr td .playerbox {
          display: flex;
          align-items: center;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .CN-run_s td,
        .CN-wicket_s td {
          padding: 6px 0px !important;
        }
        .match-table tr td {
          text-align: center;
          padding: 5px 0;
          height: 30px;
          vertical-align: middle;
          color: #001d42;
          border-bottom: 2px solid #d8d8d8;
        }
        .CN-run-wickets-section .sub_table {
          margin-bottom: 15px;
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
      `}</style>
    </>
  );
};
export default RunWicketSection;