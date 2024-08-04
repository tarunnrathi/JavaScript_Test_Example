import React from "react";
import ImageFallback from "components/Common/ImageFallback";
import { CricketNextImgUrls } from "components/Cricketnext/CricketNextUtils";

const CricketPlayerInfoCardMobile = ({ paramObj, pageContent }) => {
  const { playerId } = paramObj;
  const {
    name = "",
    writeup = "",
    player_skill = "",
    dob = "",
    batting_style = "",
    team = "",
    playerSkillSvgImg = "",
    teamFlagImg = "",
    currentAge = "",
    playerImage = "",
  } = pageContent;
  return (
    <>
      <div className="playerInfoCard">
        <div className="playerInfoCard__playerImg">
          <span className="playerIcon">
            <img src={playerSkillSvgImg} alt="" />
          </span>
          <div className="playerThumbnail__outer">
            <div className="playerThumbnail">
              <ImageFallback
                src={playerImage}
                fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                height={90}
                width={90}
                alt={name}
                title={name}
              />
            </div>
          </div>
        </div>
        <div className="playerInfoCard__playerBio">
          <h3 className="playerBio__name">{name}</h3>
          <div className="playerBio__country">
            <div className="playerBio__country--flag">
              <ImageFallback
                src={pageContent?.team?.teamFlagImg}
                fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                height={25}
                width={90}
                alt={team?.name}
                title={team?.name}
              />
            </div>
            <h4 className="playerBio__country--name">{team?.name}</h4>
          </div>
          <div className="playerSpecality">
            <div className="playerSpecality__title">{player_skill}</div>
            <ul>
              <li> {currentAge ? currentAge + 'yrs.' : ''}  </li>
              <li>{batting_style}</li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          .playerInfoCard {
            position: relative;
            padding: 10px 10px 10px 65px;
            border: 1px solid #d8d8d8;
            border-radius: 20px;
            box-shadow: 0 3px 10px #00000029;
            margin: 15px 10px 15px 65px;
          }
          .playerInfoCard__playerImg {
            width: 110px;
            height: 110px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            background: #e5e5e5;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            left: -55px;
          }

          .playerIcon {
            position: absolute;
            top: 0;
            right: 0;
          }
          .playerIcon img {
            display: block;
          }

          .playerThumbnail__outer {
            width: 100px;
            height: 100px;
            background: #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }

          .playerThumbnail {
            width: 90px;
            height: 90px;
            background: #fff;
            box-shadow: 0 0 10px #e5e5e5;
            border-radius: 150%;
            overflow: hidden;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          }

          .playerThumbnail img {
            width: 85px;
          }

          .playerInfoCard__playerBio {
            width: 100%;
          }

          .playerBio__name {
            color: #e1261d;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 22px;
            margin-right: 18px;
          }

          .playerBio__country {
            display: flex;
            align-items: center;
            background: #F5F5F5;
            padding: 9px;
            width: max-content;
            margin-bottom: 10px;
          }

          .playerBio__country--flag {
            width: 40px;
            margin-right: 8px;
            display: flex;
          }
          .playerBio__country--flag img {
            display: block;
          }

          .playerBio__country--name {
            color: #202020;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 14px;
          }

          .playerSpecality {
            display: flex;
            font-size: 12px;
            color: #464646;
          }

          .playerSpecality__title {
            color: #e1261d;
            text-transform: uppercase;
            position: relative;
            margin-right: 10px;
            padding-left: 6px;
          }

          .playerSpecality__title::before {
            content: "";
            width: 3px;
            height: 8px;
            background: #e1261d;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }

          .playerSpecality ul {
            display: flex;
          }

          .playerSpecality ul li {
            border-right: 1px solid #464646;
            margin-right: 5px;
            padding-right: 5px;
          }

          .playerSpecality ul li:last-child {
            border: 0;
            padding: 0;
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default CricketPlayerInfoCardMobile;
