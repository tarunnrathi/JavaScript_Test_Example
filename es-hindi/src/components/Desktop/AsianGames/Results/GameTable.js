import React, { useState } from "react";
import {
  aquaticArcheryResultDataDummy,
  gameList,
  medalsList,
} from "../Common/AsianGamesConstant";

const GameTable = ({ headerTitle, gameIcon }) => {
  const [selectedMedal, setSelectedMedals] = useState("gold");

  return (
    <>
      <div className="schedule_box" id="section-Aquatics">
        <div className="schedule_box_top">
          <h2>Asian Games 2023 Result</h2>
          <p className="schedule_tilte_icon">
            <i>
              <img src={gameIcon} width={40} height={40} />
            </i>
            {headerTitle}
          </p>
        </div>
        <div className="medal">
          {medalsList.map((data) => (
            <div
              className={`medal_row ${
                selectedMedal === data.className ? "active" : ""
              }`}
              onClick={() => setSelectedMedals(data.className)}
              key={data.id}
            >
              <i className={data.className}></i>
              <p>{data.name}</p>
            </div>
          ))}
        </div>
        <div className="schedule_table">
          <div className="schedule_table_row result_table">
            <table>
              <thead>
                <tr>
                  <th>Sport</th>
                  <th>Team</th>
                  <th>Player</th>
                  <th>Round</th>
                </tr>
              </thead>
              <tbody>
                {aquaticArcheryResultDataDummy[selectedMedal].map((data) => (
                  <tr className="medal-Gold" style={{ display: "table-row" }}>
                    <td className="result_sport">{data.sports}</td>
                    <td>
                      <div className="team_name">
                        <i>
                          <img
                            src={`https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/${data.country.toLowerCase()}_flag.png`}
                          />
                        </i>
                        <p>{data.country}</p>
                      </div>
                    </td>
                    <td className="result_player">{data.playerName}</td>
                    <td className="result_round">{data.rounds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="jump_to">
          <a href="javascript:void(0)" className="jump_title DropClickBox">
            Jump to Event
          </a>
          <ul>
            {gameList.map((game) => (
              <li>
                <a
                  data-href={`section-${game.title}`}
                  href="javascript:void(0)"
                >
                  {game.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .schedule_box {
          background: #f6f6f6 0 0 no-repeat padding-box;
          border: 1px solid #c1c1c1;
          border-radius: 10px;
          margin-bottom: 30px;
        }
        .schedule_box_top {
          width: 100%;
          text-align: center;
          padding-top: 15px;
        }
        .schedule_box_top h2 {
          letter-spacing: 8.88px;
          color: #e1261c;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: normal;
        }
        .schedule_tilte_icon {
          letter-spacing: -2.32px;
          color: #001d42;
          font-size: 58px;
          line-height: 58px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border-bottom: 2px #d2d2d2 solid;
          width: 604px;
          margin: auto;
          text-transform: lowercase;
        }
        .schedule_tilte_icon .gamesIcon li {
          margin-bottom: 0;
        }
        .schedule_table table {
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
        }
        .schedule_table table tr th {
          height: 50px;
          background: #001d42 0 0 no-repeat padding-box;
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          text-align: left;
        }
        .schedule_table {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 5px;
          box-sizing: border-box;
        }
        .schedule_table_row {
          width: 100%;
          padding: 0 10px;
        }
        .schedule_table table tbody tr {
          height: 43px;
          background: #fff;
          border-bottom: 1px #dadada solid;
        }
        .schedule_table table tbody tr:nth-child(even) {
          background: #f6f6f6;
        }
        .schedule_time {
          color: #001d42;
          font-size: 14px;
          font-weight: bold;
          padding-left: 10px;
          padding-right: 15px;
        }
        .schedule_time span {
          font-size: 12px;
          font-weight: normal;
          padding-left: 4px;
          text-transform: uppercase;
        }
        .schedule_sport {
          letter-spacing: 0;
          color: #202020;
          font-size: 12px;
          font-weight: 600;
        }
        .schedule_round {
          font-size: 12px;
          color: #202020;
        }
        .schedule_table table tr th:first-child {
          padding-left: 10px;
        }
        .schedule_date {
          display: flex;
          justify-content: center;
          margin: 15px 0 13px;
        }
        ul.schedule_date li {
          width: 40px;
          background: #e0e0e0;
          cursor: pointer;
          text-transform: uppercase;
          margin-right: 2px;
          text-align: center;
          padding: 7px 7px 12px;
          color: #747474;
          position: relative;
          height: 50px;
        }
        ul.schedule_date li span {
          display: block;
          font-size: 12px;
          line-height: 14px;
        }
        ul.schedule_date li span:first-child {
          font-size: 18px;
          line-height: 18px;
        }
        ul.schedule_date li:after {
          content: "";
          width: 100%;
          height: 5px;
          background: #747474;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        ul.schedule_date li.active {
          width: 50px;
          background: #fff;
          height: 55px;
          position: relative;
          top: -5px;
        }
        ul.schedule_date li.active:after {
          background: #e1261d;
        }
        ul.schedule_date li.active span {
          color: #e1261d;
        }
        ul.schedule_date li.active span:first-child {
          font-size: 22px;
          font-weight: 600;
          line-height: 22px;
        }
        .jump_to {
          width: 200px;
          height: 30px;
          background: #e1261d 0 0 no-repeat padding-box;
          border-radius: 6px;
          position: relative;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/filter-arrow.svg);
          background-position: 94%;
          margin: 20px auto;
        }
        a.jump_title {
          letter-spacing: 0;
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: bold;
          line-height: 30px;
          padding: 0 10px;
          position: relative;
          z-index: 2;
          display: block;
        }
        .jump_to ul {
          background: #e8e8e8 0 0 no-repeat padding-box;
          box-shadow: 0 3px 6px #00000029;
          border: 1px solid #d0d0d0;
          border-radius: 0 0 6px 6px;
          position: absolute;
          width: 100%;
          top: 27px;
          display: none;
          z-index: 1;
          max-height: 213px;
          overflow-y: scroll;
        }
        .jump_to ul::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          background-color: #f5f5f5;
        }
        .jump_to ul::-webkit-scrollbar {
          width: 5px;
          background-color: #f5f5f5;
        }
        .jump_to ul::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          background-color: #c1c1c1;
        }
        .jump_to ul.active {
          display: block;
        }
        .jump_to ul li a {
          position: relative;
          color: #001d42;
          font-size: 11px;
          text-transform: uppercase;
          text-align: left;
          display: block;
          padding: 7px 7px 7px 23px;
        }
        .jump_to ul li a::before {
          content: "-";
          position: absolute;
          left: 10px;
          font-size: 18px;
          top: 50%;
          transform: translate(0, -50%);
        }
        .jump_to ul li a:hover {
          background: #e1261d;
          color: #fff;
        }
        .medal {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin: 15px 0;
        }
        .medal_row {
          width: 70px;
          background: #e0e0e0 0 0 no-repeat padding-box;
          margin: 0 1px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          padding: 6px 0;
          border-bottom: 5px #747474 solid;
        }
        .medal_row i {
          width: 11px;
          height: 21px;
          background: 0;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/medalIcon-2.png);
          background-repeat: no-repeat;
          background-position: 0 0;
          margin-bottom: 2px;
          background-size: 68px;
        }
        .medal_row p {
          letter-spacing: 0;
          color: #747474;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 14px;
          width: 100%;
        }
        .medal_row.active {
          width: 80px;
          height: 55px;
          background: #fff;
          border-color: #e1261d;
        }
        .medal_row.active i.gold {
          background-position: -19px 0;
        }
        .medal_row.active i.silver {
          background-position: -38px 0;
        }
        .medal_row.active i.bronze {
          background-position: -57px 0;
        }
        .medal_row.active p {
          color: #001d42;
          font-size: 14px;
          font-weight: bold;
        }
        .result_sport {
          color: #202020;
          font-size: 12px;
          font-weight: bold;
          padding-left: 10px;
        }
        .team_name {
          display: flex;
          font-size: 12px;
          color: #202020;
          align-items: center;
        }
        .team_name i img {
          width: 43px;
          height: 24px;
          margin-right: 10px;
        }
        .result_player {
          font-size: 14px;
          color: #001d42;
          font-weight: bold;
        }
        .result_round {
          color: #001d42;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default GameTable;
