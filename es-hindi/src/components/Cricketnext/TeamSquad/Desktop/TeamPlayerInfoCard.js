import ImageFallback from "components/Common/ImageFallback";
import React from "react";
import { CricketNextImgUrls } from "../../CricketNextUtils";

const TeamPlayerInfoCard = ({ teamPlayers }) => {
  return (
    <>
      {teamPlayers && teamPlayers.length !== 0 ? (
        <ul className="CN-team-wrap">
          {teamPlayers.map((player) => (
            <li className="CN-team-box">
              <a href={player?.playerUrl}>
                <div className="player-img">
                  <span className="player-icon">
                    <img src={player?.skillImg} alt="" />
                  </span>
                  <div className="player-thumb-outer">
                    <div className="player-thumb">
                      <ImageFallback
                        src={`${CricketNextImgUrls.playerThumbnailUrl}/${player?.playerId}.png`}
                        fallbackSrc={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png`}
                        height={60}
                        width={60}
                        alt={player?.playerName}
                        title={player?.playerName}
                      />
                    </div>
                  </div>
                </div>
                <div className="player-description">
                  <div className="specality">{player?.skill}</div>
                  <h3 className="player-name">{player?.playerName}</h3>
                  <span className="player-role">{player?.playerBattingStyle}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center" }}>No content found matching this criteria</p>
      )}
      <style jsx global>{`
        .CN-team-wrap {
          display: grid;
          grid-template-columns: 294px 294px 294px;
          column-gap: 19px;
          row-gap: 19px;
        }
        .CN-team-wrap > li {
          border-bottom: 1px solid #d8d8d8;
        }
        .CN-team-wrap li a {
          display: flex;
          background: #f5f5f5;
          padding: 8px;
          align-items: center;
        }
        .CN-team-wrap li a .player-img {
          width: 90px;
          height: 90px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          background: #e5e5e5;
          border-radius: 50%;
          position: relative;
        }
        .CN-team-wrap li a .player-img .player-icon {
          position: absolute;
          bottom: 0;
          right: -7px;
        }
        .CN-team-wrap li a .player-img .player-icon img {
          display: block;
        }
        .CN-team-wrap li a .player-thumb-outer {
          width: 80px;
          height: 80px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }
        .CN-team-wrap li a .player-thumb {
          width: 74px;
          height: 74px;
          background: #fff;
          box-shadow: 0 0 10px #e5e5e5;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .CN-team-wrap li a .player-thumb img {
          width: 70px;
        }

        .CN-team-wrap li a .player-description {
          margin-left: 17px;
        }

        .CN-team-wrap li a .player-description .specality {
          font-weight: bold;
          color: #e1261d;
          text-transform: uppercase;
          position: relative;
          margin-bottom: 5px;
          padding-left: 6px;
          font-size: 11px;
        }

        .CN-team-wrap li a .player-description .specality::before {
          content: "";
          width: 3px;
          height: 8px;
          background: #e1261d;
          position: absolute;
          top: 2px;
          left: 0;
        }

        .CN-team-wrap li a .player-description .player-name {
          color: #001d42;
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 5px;
        }

        .CN-team-wrap li a .player-description .player-role {
          font-size: 13px;
          color: #464646;
        }
      `}</style>
    </>
  );
};

export default TeamPlayerInfoCard;
