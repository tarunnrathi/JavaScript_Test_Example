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
                  {/* <img
                    style={{
                      backgroundImage: `url("https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png")`,
                    }}
                    loading="lazy"
                    src={imageURL}
                    data-src={imageURL}
                    onError={addImageFallback}
                    alt="ipl"
                  /> */}
                  <LazyLoadImage
                    src={imageURL}
                    alt="ipl"
                    width={75}
                    height={75}
                    isLazyLoad={true}
                    defaultImageURL="https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png"
                  />
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
        .teamplayerhd {
          color: #ed1c24;
          font-size: 14px;
          background: #f3f3f3;
          padding: 10px;
          margin: 5px 0 10px;
        }
        .teamplayerdetails {
          display: flex;
          flex-wrap: wrap;
        }
        .teamplayerdetails li {
          width: 33.33%;
          margin-bottom: 20px;
        }
        li {
          list-style: none;
        }
        .teamplayerdetails li a {
          display: flex;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .teamplayerdetails li a figure {
          width: 75px;
          height: 75px;
          margin-right: 15px;
          background: #000;
          border-radius: 10px;
          flex-shrink: 0;
          overflow: hidden;
        }
        figure {
          line-height: 0;
          position: relative;
        }
        figure img {
          width: 100%;
          transform: scale(1);
          transition: all 0.5s ease-in-out;
        }
        a img {
          border: none;
        }
        .teamplayerdetails li a .teamplayerintro {
          width: 100%;
        }
        .teamplayerdetails li a .teamplayerintro h4 {
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
        }
        .teamplayerdetails li a .teamplayerintro p {
          font-size: 14px;
        }
        figure,
        footer,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        nav,
        ol,
        p,
        ul {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default TeamList;
