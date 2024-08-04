import { useEffect, useState } from "react";
import { gamesYearList } from "../Common/AsianGamesConstant";
import Glide from "@glidejs/glide";
// import fetchUtility from "includes/sFetchUtility";
import LazyImage from "components/Common/CustomImage";
import { getRedisDataByKey } from "api/global/Common";

const IndiaUltimatePerformer = ({ medalListByYear = [] }) => {
  const [selectedGame, setSelectedGame] = useState(gamesYearList[0]);
  const [winnerListByYear, setWinnerListByYear] = useState(
    medalListByYear || []
  );
  useEffect(() => {
    // if (document.querySelector(".presenting_partner_medal")) {
    //   new Glide(document.querySelector(".presenting_partner_medal"), {
    //     type: "slider",
    //     autoplay: 2000,
    //     perView: 1,
    //     slidesToScroll: 1,
    //     gap: 0,
    //   }).mount();
    // }
    // if (document.querySelector(".medalWinnerSlider")) {
    //   new Glide(document.querySelector(".medalWinnerSlider"), {
    //     type: "slider",
    //     autoplay: false,
    //     perView: winnerListByYear.length >= 2 ? 2 : 1,
    //     gap: 20,
    //     slidesToScroll: 1,
    //   }).mount();
    // }
    if (document.querySelector(".medalWinnerSlider")) {
      new Glide(document.querySelector(".medalWinnerSlider"), {
        type: "slider",
        autoplay: false,
        perView: 2,
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
          <div className="medalWinner-ajax-container">
            {/* <div className="medalWinnerInner_sldr">
              <p className="heading">Presenting Partner</p>
              <div className="presenting_partner_medal">
                <div className="track" data-glide-el="track">
                  <ul className="slides">
                    <li className="slide">Partner logo</li>
                    <li className="slide">Partner logo</li>
                    <li className="slide">Partner logo</li>
                  </ul>
                </div>
              </div>
            </div> */}
            <div className="medalWinnerHeader">
              <div className="medalWinnerHeaderInner">
                <h3 className="heading-1">ASIAN GAMES TIMELINE</h3>
                <h4 className="heading-2">भारत के सर्वश्रेष्ठ खिलाड़ी</h4>
                <div className="mw_yearwrap">
                  {selectedGame.year} एशियन गेम्स -&nbsp;
                  <span>{selectedGame.place}</span>
                </div>
              </div>
              <div className="medalPartner"></div>
            </div>
            <div className="medalWinnerSlider">
              <div data-glide-el="controls">
                <a
                  href="javascript:void(0)"
                  id="button_1"
                  className="left-arrow l1 act"
                  data-glide-dir="<"
                ></a>
                <a
                  href="javascript:void(0)"
                  id="button_2"
                  className="right-arrow r1 act"
                  data-glide-dir=">"
                ></a>
              </div>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  {(winnerListByYear || []).map((playerData, index) => (
                    <li className="glide__slide medals-2016" key={index}>
                      <div className="inner">
                        <div className="imageBox">
                          <LazyImage
                            src={playerData.image}
                            alt={playerData.title}
                            title={playerData.title}
                            width={100}
                            height={100}
                          />
                          {playerData.link && playerData.link !== "#" && (
                            <div className="readmoreOuter">
                              <a href={playerData.link} className="readmore">
                                अधिक पढ़ें
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="contentBox">
                          <div className="contentHeader">
                            <div className="iconBoxSec">
                              <ul className="gamesIcon winnerIcon">
                                <li className={playerData.t_name}></li>
                              </ul>
                              <div className="textBox">
                                <div className="name">{playerData.title}</div>
                                <div className="game">{playerData.t_name}</div>
                              </div>
                            </div>
                            <div className="madelWrap bronze_1">
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
                          </div>
                          <div className="Discrition">{playerData.olydesc}</div>
                        </div>
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
          </div>
          <ul className="mw_years">
            {gamesYearList.map((gameData) => (
              <li
                key={gameData.id}
                className={gameData.id === selectedGame.id ? "active" : ""}
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
        // Indias medal winners
        .medalWinnerWrapper {
          position: relative;
          background: #373737;
          padding: 15px 0 10px;
          font-family: "Mukta", sans-serif;
          margin-bottom: 30px;
        }
        .medalWinnerWrapper::after {
          content: "";
          width: 100%;
          height: 30px;
          background: #000;
          position: absolute;
          bottom: 0;
        }
        .medalWinnerInner {
          width: 1174px;
          margin: 0 auto;
        }
        .medalWinnerHeader {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
          position: relative;
        }
        .medalWinnerHeader .medalPartner {
          width: 94px;
          position: absolute;
          right: 0;
          top: 15px;
        }
        .medalWinnerHeaderInner {
          text-align: center;
        }
        .medalWinnerHeaderInner .heading-1 {
          color: #fff;
          font-weight: normal;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 8.8px;
          line-height: 12px;
        }
        .medalWinnerHeaderInner .heading-2 {
          color: #fff;
          font-size: 58px;
          font-weight: 600;
          padding: 0;
          line-height: 58px;
          position: relative;
          padding-top: 7px;
        }
        .medalWinnerHeaderInner .heading-2:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 35px;
          right: 35px;
          background: #575757;
          height: 1px;
        }
        .medalWinnerHeaderInner .mw_yearwrap {
          background: #191919;
          display: table;
          margin: 0 auto;
          padding: 10px 20px;
          color: #fff;
          font-size: 20px;
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
          margin-bottom: 15px;
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
          background: #4d4d4d;
          width: 100%;
          flex-shrink: 0;
          white-space: initial;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
          position: relative;
        }
        .medalWinnerSlider .glide__slide::after {
          content: "";
          width: 10px;
          height: 100%;
          position: absolute;
          left: 100%;
          top: 0;
          border-right: 1px dashed #d1d1d1;
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
          margin-top: 20px;
        }
        .medalWinnerSlider .glide__bullets button:focus {
          outline: 0;
        }
        .medalWinnerSlider .glide__bullets button.glide__bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 0;
          background: #fff;
          margin: 0 5px;
          padding: 0;
        }
        .medalWinnerSlider
          .glide__bullets
          button.glide__bullet.glide__bullet--active {
          background: #e1261d;
          width: 20px;
          border-radius: 15px;
        }
        .medalWinnerSlider .left-arrow {
          width: 38px;
          height: 44px;
          position: absolute;
          top: 120px;
          right: 100%;
          left: initial;
          z-index: 3;
          background: 0;
        }
        .medalWinnerSlider .right-arrow {
          width: 38px;
          height: 44px;
          position: absolute;
          top: 120px;
          left: 100%;
          z-index: 3;
          background: 0;
        }
        .medalWinnerSlider .left-arrow:before {
          content: "";
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          width: 23px;
          height: 23px;
          transform: rotate(-45deg);
          position: absolute;
          left: 8px;
          top: 10px;
        }
        .medalWinnerSlider .right-arrow:before {
          content: "";
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          width: 23px;
          height: 23px;
          transform: rotate(132deg);
          position: absolute;
          left: 3px;
          top: 10px;
        }
        .medalWinnerSlider .inner {
          padding: 20px;
          display: flex;
          position: relative;
        }
        .medalWinnerSlider .inner::after {
          content: "";
          width: 10px;
          height: 100%;
          position: absolute;
          left: 100%;
          top: 0;
          border-right: 1px dashed #d1d1d1;
        }
        .medalWinnerSlider .imageBox {
          width: 120px;
          padding: 10px;
          background: #fff;
          flex-shrink: 0;
          align-self: flex-start;
        }
        .medalWinnerSlider .imageBox img {
          width: 100%;
        }
        .medalWinnerSlider .imageBox .readmoreOuter {
          display: flex;
          justify-content: center;
        }
        .medalWinnerSlider .imageBox .readmore {
          color: #e1261d;
          font-size: 11px;
          text-transform: uppercase;
          text-align: center;
          border-bottom: 1px solid #e1261d;
          position: relative;
          line-height: 15px;
          margin-top: 5px;
        }
        .medalWinnerSlider .imageBox .readmore::before {
          content: "+";
          position: absolute;
          left: -10px;
        }
        .medalWinnerSlider .contentBox {
          width: 100%;
          margin-left: 20px;
        }
        .medalWinnerSlider .contentHeader {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px dashed #8b8b8b;
        }
        .medalWinnerSlider .Discrition {
          font-size: 12px;
          line-height: 20px;
          color: #fff;
        }
        .gamesIcon.winnerIcon {
          margin-right: 10px;
        }
        .gamesIcon.winnerIcon li {
          margin: 0;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/olympic-d-black-icon.png);
          background-color: #fff;
        }
        .medalWinnerSlider .iconBoxSec {
          display: flex;
        }
        .medalWinnerSlider .textBox .name {
          color: #ffeb00;
          font-size: 20px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .medalWinnerSlider .textBox .game {
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .medalWinnerSlider .madelWrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .medalWinnerSlider .madelWrap .content {
          background: #fff;
          font-size: 12px;
          text-transform: uppercase;
          padding: 7px 48px 7px 15px;
          border-radius: 14px;
          line-height: 14px;
        }
        .medalWinnerSlider .madelWrap .madelIcon {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
        }
        .medalWinnerSlider .madelWrap.gold_1 {
          color: orange;
        }
        .medalWinnerSlider .madelWrap.silver_1 {
          color: #acacac;
        }
        .medalWinnerSlider .madelWrap.bronze_1 {
          color: #df622d;
        }
        .medalWinnerInner .mw_years {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          position: relative;
          z-index: 9;
        }
        .medalWinnerInner .mw_years li {
          margin: 0 5px;
        }
        .medalWinnerInner .mw_years li a {
          font-size: 16px;
          background: #e0e0e0;
          cursor: pointer;
          text-transform: uppercase;
          text-align: center;
          padding: 14px 0 19px 0;
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
          font-size: 18px;
          color: #e1261d;
          font-weight: 600;
          padding: 18px 0 20px 0;
          width: 65px;
        }
        .medalWinnerInner .mw_years li.active a::after {
          background: #e1261d;
        }
        .medalWinner-ajax-container {
          position: relative;
        }
        .medalWinnerInner_sldr {
          width: 94px;
          text-align: center;
          position: absolute;
          top: 14px;
          right: 0;
        }
        .medalWinnerInner_sldr .heading {
          font-size: 10px;
          font-weight: normal;
          margin-bottom: 2px;
          color: #fff;
          line-height: 15px;
          text-decoration: underline;
        }
        .presenting_partner_medal .track {
          overflow: hidden;
        }
        .presenting_partner_medal .slides {
          display: flex;
        }
        .presenting_partner_medal {
          width: 94px;
        }
        .presenting_partner_medal .slide {
          width: 94px;
          height: 40px;
          background: #747474;
        }
      `}</style>
    </>
  );
};

export default IndiaUltimatePerformer;
