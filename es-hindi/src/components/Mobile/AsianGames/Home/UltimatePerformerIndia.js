import Glide from "@glidejs/glide";
import { getRedisDataByKey } from "api/global/Common";
import LazyImage from "components/Common/LazyLoadImage";
import { gamesYearList } from "components/Desktop/AsianGames/Common/AsianGamesConstant";
import { useEffect, useState } from "react";

const UltimatePerformerIndia = ({ medalListByYear = [] }) => {
  const [selectedGame, setSelectedGame] = useState(gamesYearList[0]);
  const [winnerListByYear, setWinnerListByYear] = useState(medalListByYear);

  useEffect(() => {
    if (document.querySelector(".medalpartner")) {
      new Glide(document.querySelector(".medalpartner"), {
        type: "carousel",
        autoplay: 2000,
        perView: 1,
        slidesToScroll: 1,
      }).mount();
    }
    if (document.querySelector(".medalWinnerSlider")) {
      new Glide(document.querySelector(".medalWinnerSlider"), {
        type: "slider",
        autoplay: false,
        perView: 1,
        gap: 20,
        slidesToScroll: 1,
      }).mount();
    }
  }, [winnerListByYear]);

  const handleOnGameSelection = (game) => {
    // fetchUtility(
    //   `https://stghindi.news18.com/nodeapi/data/ultimate_asian_performer_${game.year}?prefix=KHABARN18-`
    // )
    getRedisDataByKey(`ultimate_asian_performer_${game.year}`, "KHABARN18-")
      .then((response) => {
        if (!response) {
          setWinnerListByYear([]);
        } else {
          setWinnerListByYear(Object.values(response));
        }
        setSelectedGame(game);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="medalWinnerWrapper">
        <div className="medalWinnerInner">
          <div className="medalWinnerHeader">
            <div className="medalWinnerHeaderInner">
              <h3 className="heading-1">ASIAN GAMES TIMELINE</h3>
              <h4 className="heading-2">भारत के सर्वश्रेष्ठ खिलाड़ी</h4>
              <div className="mw_yearwrap">
                {selectedGame.year} एशियन गेम्स -&nbsp;
                <span>{selectedGame.place}</span>
              </div>
            </div>
          </div>
          <div className="medalWinnerSlider">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {winnerListByYear.map((playerData, index) => (
                  <li
                    className="glide__slide medals-2016"
                    key={`${playerData.yearOly}-${index}`}
                  >
                    <div className="inner">
                      <div className="contentBox">
                        <div className="imageBox">
                          <LazyImage
                            src={playerData.image}
                            alt={playerData.title}
                            title={playerData.title}
                            width="100"
                            height="150"
                          />
                          {playerData.link && playerData.link !== "#" && (
                            <div className="readmoreOuter">
                              <a href={playerData.link} className="readmore">
                                अधिक पढ़ें
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="contentHeader">
                          <div className="iconBoxSec">
                            <div className="Playername">{playerData.title}</div>
                            <div className="textBox">
                              <ul className="gamesIcon winnerIcon">
                                <li className={playerData.t_name}></li>
                              </ul>
                              <div className="game">{playerData.t_name}</div>
                            </div>
                          </div>
                          <div className={`madelWrap bronze_1`}>
                            <div className="content">
                              {playerData.medal_type}
                            </div>
                            <img
                              className="madelIcon"
                              src={`https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/winner-${playerData.medal_type}.png`}
                              width={40}
                              height={40}
                            />
                          </div>
                          {/* <div className="medalpartnerWrap">
                            <p className="heading">Presenting Partner</p>
                            <div className="medalpartner">
                              <div className="track" data-glide-el="track">
                                <ul className="slides">
                                  <li className="slide">partner logo</li>
                                  <li className="slide">partner logo</li>
                                  <li className="slide">partner logo</li>
                                </ul>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="Discrition">{playerData.olydesc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
              <button
                className="glide__bullet glide__bullet--active"
                data-glide-dir="=0"
              ></button>
              <button className="glide__bullet" data-glide-dir="=1"></button>
            </div>
          </div>
          <ul className="mw_years">
            {gamesYearList.map((gameData) => (
              <li
                key={gameData.id}
                className={selectedGame.id === gameData.id ? "active" : ""}
              >
                <a
                  data-place={gameData.place}
                  data-yid={gameData.year}
                  onClick={() => handleOnGameSelection(gameData)}
                  href="javascript:void(0)"
                >
                  {gameData.year}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        // Indias Medal
        .medalWinnerWrapper {
          position: relative;
          background: #373737;
          padding: 10px 0;
          margin-bottom: 30px;
        }
        .medalWinnerWrapper::after {
          content: "";
          width: 100%;
          height: 30px;
          background: #000000;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .medalWinnerInner {
          width: 100%;
          margin: 0 auto;
        }
        .medalWinnerHeader {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          padding: 0 10px;
        }
        .medalWinnerHeaderInner {
          text-align: center;
        }
        .medalWinnerHeaderInner .heading-1 {
          color: #e1261c;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 4.4px;
        }
        .medalWinnerHeaderInner .heading-2 {
          color: #fff;
          font-size: 28px;
          font-weight: 600;
          border-bottom: 2px solid #575757;
          letter-spacing: -1px;
          text-transform: capitalize;
          padding-bottom: 8px;
          padding-top: 5px;
        }
        .medalWinnerHeaderInner .mw_yearwrap {
          background: #191919;
          display: table;
          margin: 0 auto;
          padding: 12px 35px;
          color: #fff;
          font-size: 14px;
          text-transform: uppercase;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .medalWinnerHeaderInner .mw_yearwrap span {
          color: #e1261d;
          font-weight: 600;
          border-bottom: 2px solid #e1261d;
        }
        .medalWinnerSlider {
          width: 100%;
          position: relative;
          box-sizing: border-box;
          margin-bottom: 10px;
        }
        .medalWinnerSlider * {
          box-sizing: inherit;
        }
        .medalWinnerSlider .glide__track {
          overflow: hidden;
        }
        .medalWinnerSlider .glide__slides {
          position: relative;
          width: 100%;
          list-style: none;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          touch-action: pan-Y;
          overflow: hidden;
          padding: 0;
          white-space: nowrap;
          display: flex;
          flex-wrap: nowrap;
          will-change: transform;
        }
        .medalWinnerSlider .glide__slides--dragging {
          user-select: none;
        }
        .medalWinnerSlider .glide__slide {
          width: 100%;
          flex-shrink: 0;
          white-space: initial;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
          background: #4d4d4d;
        }
        .medalWinnerSlider .glide__slide a {
          user-select: none;
          -webkit-user-drag: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        .medalWinnerSlider .glide--rtl {
          direction: rtl;
        }
        .medalWinnerSlider .glide__bullets {
          -webkit-touch-callout: none;
          user-select: none;
        }
        .medalWinnerSlider .glide__bullets {
          text-align: center;
          margin-top: 10px;
          background: none;
          justify-content: center;
        }
        .medalWinnerSlider .glide__bullets button:focus {
          outline: none;
        }
        .medalWinnerSlider .glide__bullets button.glide__bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 0;
          background: #fff;
          margin: 0 5px;
        }
        .medalWinnerSlider
          .glide__bullets
          button.glide__bullet.glide__bullet--active {
          background: #e1261d;
          width: 20px;
          border-radius: 15px;
        }
        .medalWinnerSlider .inner {
          padding: 10px;
        }
        .medalWinnerSlider .imageBox {
          width: 120px;
          padding: 10px 10px 8px;
          background: #fff;
          flex-shrink: 0;
          align-self: flex-start;
          margin-right: 10px;
        }
        .medalWinnerSlider .imageBox img {
          width: 100%;
        }
        .medalWinnerSlider .imageBox .readmoreOuter {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }
        .medalWinnerSlider .imageBox .readmore {
          color: #e1261d;
          font-size: 11px;
          line-height: 1;
          text-transform: uppercase;
          text-align: center;
          border-bottom: 1px solid #e1261d;
          position: relative;
        }
        .medalWinnerSlider .imageBox .readmore::before {
          content: "+";
          position: absolute;
          left: -10px;
        }
        .medalWinnerSlider .contentBox {
          width: 100%;
          display: flex;
          margin-bottom: 10px;
        }
        .medalWinnerSlider .contentHeader {
          width: 100%;
        }
        .medalWinnerSlider .Discrition {
          font-size: 14px;
          line-height: 18px;
          color: #fff;
        }
        .gamesIcon.winnerIcon {
          margin-right: 10px;
          display: block;
        }
        .gamesIcon.winnerIcon li {
          width: 35px;
          margin: 0;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/olympic-m-black-icon.png);
          background-color: #fff;
        }
        .medalWinnerSlider .iconBoxSec {
          margin-bottom: 15px;
        }
        .medalWinnerSlider .Playername {
          color: #ffeb00;
          font-size: 20px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .medalWinnerSlider .textBox {
          display: flex;
          align-items: center;
        }
        .medalWinnerSlider .textBox .game {
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .medalWinnerSlider .madelWrap {
          position: relative;
          display: table;
          align-items: center;
        }
        .medalWinnerSlider .madelWrap .content {
          background: #fff;
          font-size: 12px;
          text-transform: uppercase;
          padding: 7px 48px 7px 15px;
          border-radius: 14px;
        }
        .medalWinnerSlider .madelWrap .madelIcon {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
        }
        .medalWinnerSlider .madelWrap.gold_1 {
          color: #ffa500;
        }
        .medalWinnerSlider .madelWrap.silver_1 {
          color: #acacac;
        }
        .medalWinnerSlider .madelWrap.bronze_1 {
          color: #df622d;
        }
        .medalWinnerInner .mw_years {
          display: flex;
          align-items: flex-end;
          position: relative;
          z-index: 9;
          overflow-x: scroll;
          white-space: nowrap;
          padding-left: 10px;
        }
        .medalWinnerInner .mw_years li {
          margin: 0 2px;
        }
        .medalWinnerInner .mw_years li:first-child {
          margin-left: 0;
        }
        .medalWinnerInner .mw_years li:last-child {
          margin-right: 0;
        }
        .medalWinnerInner .mw_years li a {
          font-size: 13px;
          background: #e0e0e0;
          cursor: pointer;
          text-transform: uppercase;
          text-align: center;
          padding: 17px 0px 18px 0px;
          color: #747474;
          position: relative;
          display: block;
          width: 50px;
        }
        .medalWinnerInner .mw_years li a::after {
          content: "";
          width: 100%;
          height: 5px;
          background: #676767;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .medalWinnerInner .mw_years li.active a {
          background: #fff;
          font-size: 16px;
          color: #e1261d;
          font-weight: 600;
          padding: 18px 0px 20px 0px;
          width: 60px;
        }
        .medalWinnerInner .mw_years li.active a::after {
          background: #e1261d;
        }
        .medalpartnerWrap {
          display: flex;
          align-items: center;
          margin-top: 17px;
          padding-top: 10px;
          border-top: 1px dashed #8b8b8b;
        }
        .medalpartnerWrap img {
          width: 94px;
        }
        .medalpartnerWrap .heading {
          font-size: 10px;
          font-weight: normal;
          color: #fff;
          text-decoration: underline;
          max-width: 54px;
          margin-right: 4px;
          line-height: normal;
          text-align: right;
        }
        .medalpartner {
          width: 94px;
        }
        .medalpartner .track {
          overflow: hidden;
        }
        .medalpartner .slides {
          display: flex;
        }
        .medalpartner li {
          background: #e3e3e3;
          border: 1px solid #e3e3e3;
          width: 94px;
          height: 40px;
        }
      `}</style>
    </>
  );
};

export default UltimatePerformerIndia;
