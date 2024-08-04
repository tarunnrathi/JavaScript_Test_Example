import React from "react";
import ImageFallback from "components/Common/ImageFallback";
import { CricketNextImgUrls } from "components/Cricketnext/CricketNextUtils";
import ReactHtmlParser from "react-html-parser";

const CricketPlayerInfoCard = ({ paramObj, pageContent }) => {
  const { playerInfoUrl, playerId } = paramObj;
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
                height={128}
                width={128}
                alt={name}
                title={name}
              />
            </div>
          </div>
        </div>
        <div className="playerInfoCard__playerBio">
          <div className="playerInfoCard__playerBio--top">
            <h3 className="playerBio__name">{name}</h3>
            <div className="playerBio__country">
              <div className="playerBio__country--flag">
                <ImageFallback
                  src={pageContent?.team?.teamFlagImg}
                  fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                  height={27}
                  width={40}
                  alt={team?.name}
                  title={team?.name}
                />
              </div>
              <h4 className="playerBio__country--name">{team?.name}</h4>
            </div>
            <div className="playerSpecality">
              <div className="playerSpecality__title">{player_skill}</div>
              <ul>
                <li> {currentAge ? currentAge + 'yrs.' : ''} </li>
                <li>{batting_style}</li>
              </ul>
            </div>
          </div>
          <div className="playerInfoCard__playerBio--bottom">
            <p>{ReactHtmlParser(writeup.substring(0, 300))}</p>
            {writeup && typeof writeup !== "undefined" && (
              <p>
                <a href={`${playerInfoUrl}#profile-content`}>और भी पढ़ें</a>
              </p>
            )}
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          html {
            scroll-behavior: smooth;
          }
          .playerInfoCard {
            position: relative;
            padding: 28px 20px 28px 110px;
            border: 1px solid #d8d8d8;
            border-radius: 20px;
            margin: 10px 0px 20px 90px;
            box-shadow: 0 3px 10px #00000029;
            min-height: 200px;
          }
          .playerInfoCard__playerImg {
            width: 180px;
            height: 180px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            background: #e5e5e5;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            left: -90px;
          }

          .playerIcon {
            position: absolute;
            top: 0;
            right: 20px;
          }
          .playerIcon img {
            display: block;
          }

          .playerThumbnail__outer {
            width: 160px;
            height: 160px;
            background: #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }

          .playerThumbnail {
            width: 140px;
            height: 140px;
            background: #fff;
            box-shadow: 0 0 10px #e5e5e5;
            border-radius: 150%;
            overflow: hidden;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          }

          .playerThumbnail img {
            width: 120px;
          }

          .playerInfoCard__playerBio {
            width: 100%;
          }

          .playerInfoCard
            .playerInfoCard__playerBio
            .playerInfoCard__playerBio--top {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }

          .playerInfoCard
            .playerInfoCard__playerBio
            .playerInfoCard__playerBio--top
            .playerBio__name {
            font-size: 26px;
          }

          .playerBio__name {
            color: #e1261d;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 24px;
            margin-right: 18px;
          }

          .playerBio__country {
            display: flex;
            align-items: center;
            margin-right: 20px;
          }

          .playerBio__country--flag {
            width: 40px;
            margin-right: 8px;
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
            font-weight: 500;
            padding-top: 5px;
            font-size: 13px;
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
            top: 0px;
            left: 0;
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

          .playerInfoCard__playerBio--bottom p {
            color: #000;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            margin: 0;
          }

          .playerInfoCard__playerBio--bottom a {
            color: #e1261d;
            text-transform: uppercase;
            display: block;
            font-weight: bold;
            line-height: 2;
          }
        `}
      </style>
    </>
  );
};

export default CricketPlayerInfoCard;
