import React from "react";
import { IPL_YEAR } from "includes/ipl.helper";
const IPLTeamSection = ({ teamCaptionsArr }) => {
  return (
    <>
      <div className="CN-teams-section">
        <div className="ipl_team">
          <h3>
            आईपीएल {IPL_YEAR} <span></span>
          </h3>
          <div className="team_player_s">
            {teamCaptionsArr.map((cap) => (
              <a key={cap.id} href={cap.redirectionURL}>
                <div className="team_player">
                  <img
                    className=""
                    loading="lazy"
                    src={cap.thumnail}
                    data-src={cap.thumnail}
                    alt={cap.team}
                    width="60"
                    height="70"
                  />
                  <div className={`team_player_name playe_r_${cap.colorId}`}>
                    <strong>{cap.team}</strong>
                    <span>{cap.playerName}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .CN-teams-section {
          background: url(https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/teams_bg.png)
            #192f3a 0% 0% no-repeat padding-box;
          padding: 10px 10px 0px 10px;
          border-radius: 10px;
          box-sizing: border-box;
        }
        .ipl_team .team_player_s a:before {
          width: 8px;
          height: 2px;
          background: #f5f5f5;
          right: 21px;
          top: 17px;
        }
        .ipl_team .team_player_s a:after,
        .ipl_team .team_player_s a:before {
          display: block;
          position: absolute;
          content: "";
          opacity: 0.5;
        }
        .ipl_team .team_player_s a:after {
          border-right: 2px solid #f5f5f5;
          border-top: 2px solid #f5f5f5;
          width: 6px;
          height: 6px;
          transform: rotate(45deg);
          top: 14px;
          right: 20px;
        }
        .ipl_team h3 {
          position: relative;
          font-size: 24px;
          line-height: 24px;
          color: #ffbb00;
          text-transform: uppercase;
          margin-top: 5px;
        }
        .ipl_team .team_player_s a {
          margin-bottom: 20px;
          width: 19%;
          display: block;
          position: relative;
        }
        .ipl_team {
          margin-left: 34px !important;
        }
        .ipl_team h3 span {
          display: inline-block;
          color: #fff;
        }
        .ipl_team h3:after {
          content: "";
          border-bottom: 2px solid #ccc;
          display: inline-block;
          position: absolute;
          left: 23%;
          bottom: 3px;
          right: 10px;
          opacity: 0.1;
        }
        .team_player_s {
          display: flex;
          justify-content: space-between;
          margin: 25px 0px 20px;
          flex-wrap: wrap;
        }
        .team_player_s .team_player img {
          height: 70px;
          width: 60px;
        }
        .team_player_name strong {
          font-size: 20px;
          line-height: 20px;
          color: #fff;
        }
        .team_player_name span {
          font-size: 12px;
          line-height: 15px;
          color: #fff;
          margin-top: 5px;
        }
        .team_player_name strong,
        .team_player_name span {
          display: block;
          box-sizing: border-box;
          padding-left: 60px;
        }
        .team_player_name {
          width: 160px;
          height: 55px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .playe_r_1 {
          background-color: #ee9b00;
        }
        .playe_r_2 {
          background-color: #0355a2;
        }
        .playe_r_3 {
          background-color: #d33f25;
        }
        .playe_r_4 {
          background-color: #482863;
        }
        .playe_r_5 {
          background-color: #005795;
        }
        .playe_r_6 {
          background-color: #1f3a76;
        }
        .playe_r_7 {
          background-color: #1e1e1e;
        }
        .playe_r_8 {
          background-color: #ff4233;
        }
        .playe_r_9 {
          background-color: #0b4973;
        }
        .playe_r_10 {
          background-color: #ffcc00;
        }
      `}</style>
    </>
  );
};
export default IPLTeamSection;