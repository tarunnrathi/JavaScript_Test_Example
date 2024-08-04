import ImageFallback from "components/Common/ImageFallback";
import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { CricketNextImgUrls } from "../../CricketNextUtils";

const TeamPlayerInfoCardMobile = ({ teamPlayers, pageAds }) => {
  return (
    <>
      {teamPlayers && teamPlayers.length !== 0 ? (
        <ul className="CN-team-wrap">
          {teamPlayers.map((player, index) => (
            <>
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
                  <div className="read-more">और भी...</div>
                </a>
              </li>
              {index === 4 && (
                <div className="clearfix add">
                  <div className="addinner-box addinner_box_300x250">
                    <SiteAd
                      width={300}
                      height={280}
                      slotId={"mobileAdNew300x250_1"}
                      adUnit={pageAds.ATF_300}
                      lazyload={true}
                      sizes={[[300, 250], [336, 280]]}
                    ></SiteAd>
                  </div>
                </div>
              )}
            </>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center" }}>
          No content found matching this criteria
        </p>
      )}
      <style jsx global>{`
        .CN-team-wrap {
          padding: 0 10px;
        }
        .CN-team-wrap > li {
          border: 1px solid #d8d8d8;
          border-radius: 10px;
          background: #fff;
          margin-bottom: 10px;
          box-shadow: 0 5px 10px #00000029;
        }
        .CN-team-wrap li a {
          display: flex;
          padding: 4px 6px;
          align-items: center;
          position: relative;
        }
        .CN-team-wrap li a .player-img {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          background: #e5e5e5;
          border-radius: 50%;
          position: relative;
        }
        .player-icon {
          position: absolute;
          bottom: -5px;
          left: -5px;
        }

        .player-icon img {
          display: block;
        }

        .player-thumb-outer {
          width: 60px;
          height: 60px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }
        .player-thumb {
          width: 54px;
          height: 54px;
          background: #fff;
          box-shadow: 0 0 10px #e5e5e5;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .player-thumb img {
          width: 50px;
        }

        .player-description {
          margin: 5px 0px 0px 17px;
        }

        .specality {
          color: #e1261d;
          text-transform: uppercase;
          position: relative;
          margin-top: 5px;
          padding-left: 6px;
          font-size: 11px;
          line-height: 11px;
        }
        .specality::before {
          content: "";
          width: 3px;
          height: 8px;
          background: #e1261d;
          position: absolute;
          top: 2px;
          left: 0;
        }

        .player-name {
          color: #001d42;
          font-weight: bold;
          font-size: 15px;
          text-transform: uppercase;
          margin-bottom:-4px;
        }

        .player-role {
          font-size: 12px;
          color: #464646;
        }

        .CN-team-wrap li a .read-more {
          position: absolute;
          right: 15px;
          bottom: 10px;
          font-size: 11px;
          color: #e1261d;
          text-transform: uppercase;
          font-family: "Segoe Pro Regular";
          padding: 0 15px 20px 0;
          line-height: 12px;
        }

        .CN-team-wrap li a .read-more:after {
          content: "";
          border-bottom: 1px solid #e1261d;
          border-right: 1px solid #e1261d;
          width: 5px;
          height: 5px;
          transform: rotate(-45deg);
          position: absolute;
          right: 2px;
          top: 3px;
        }
      `}</style>
    </>
  );
};

export default TeamPlayerInfoCardMobile;
