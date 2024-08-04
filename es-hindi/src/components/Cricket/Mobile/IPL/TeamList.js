import React from "react";
import LazyLoadImage from "components/Common/CustomImage";

const TeamList = ({
  headerTitle,
  playerData = [],
  skillsKey = "",
  ImageIdsAvailable,
}) => {
  const addImageFallback = (event) => {
    event.currentTarget.src =
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png";
  };

  //https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/${player.id}.png
  //https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/128X128/66803.png
  return (
    <>
      <h3 className="teamplayerhd">{headerTitle}</h3>
      <ul className="teamplayerdetails">
        {playerData.map((player) => {
          const imageURL = player.id
            ? `https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/128X128/${player.id}.png`
            : "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png";
          return (
            <li key={player.id}>
              <a>
                <figure>
                  <LazyLoadImage
                    src={imageURL}
                    alt="ipl"
                    width={188}
                    height={188}
                    isLazyLoad={true}
                    defaultImageURL="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png"
                  />
                  {/* <img
                    loading="lazy"
                    src={imageURL}
                    data-src={imageURL}
                    onError={addImageFallback}
                    alt="ipl"
                  /> */}
                </figure>
                <div className="teamplayerintro">
                  <h4>{`${player.name} ${
                    player.sport_specific_keys.is_captain === "1" ? "(C)" : ""
                  }`}</h4>
                  <p>{skillsKey === 'bowling_style' ? player.sport_specific_keys.bowling_style : player.sport_specific_keys.batting_style}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
      <style jsx global>{`
        .teamplayerdetails {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .teamplayerdetails li {
          margin-bottom: 30px;
          width: 48%;
        }
        .teamplayerhd {
          padding: 0px 10px;
          font-size: 21px;
        }
        figure img {
          width: 100%;
          background: #efefef;
        }
        .teamplayerintro h4,  .teamplayerintro p {
          text-align: center;
          display: block;
          width: 100%;
        }
        .teamplayerintro h4 {
          font-size: 18px;
          margin: 0px;
          padding: 0px;
        }
        .teamplayerintro p {
          font-size: 16px;
          margin: 0px;
          padding: 0px;
        }
      `}</style>
    </>
  );
};

export default TeamList;
