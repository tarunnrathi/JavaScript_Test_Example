import React, { useEffect, useState } from "react";
import { OlympicDatePlaceList } from "../../../../helper/olympicsHelper";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import { getRedisDataByKey } from "api/global/Common";

const latestYearData = OlympicDatePlaceList.reverse();
export default function UltimatePerformer({ isMobile = false }) {
  const [selectedYearData, setSelectedYearData] = useState(
    OlympicDatePlaceList[0]
  );
  const [dataBasedOnYear, setDataBasedOnYear] = useState([]);

  useEffect(() => {
    getRedisDataByKey(
      `olympics_games_${selectedYearData.year}`,
      "KHABARN18-",
      true
    ).then((res) => {
      setDataBasedOnYear(Array.isArray(res) ? res : []);
    });
  }, []);

  useEffect(() => {
    if (document.querySelector(".medalWinnerSlider")) {
      new Glide(document.querySelector(".medalWinnerSlider"), {
        type: "slider",
        autoplay: false,
        perView: isMobile ? 1 : dataBasedOnYear.length > 1 ? 2 : 1,
        gap: 20,
        slidesToScroll: 1,
      }).mount();
    }
  }, [dataBasedOnYear, isMobile]);

  const handleOnYearSelect = async (yearData) => {
    setSelectedYearData(yearData);
    const data = await getRedisDataByKey(
      `olympics_games_${yearData.year}`,
      "KHABARN18-",
      true
      // "https://stg-api.news18.com/nodeapi/v1/hin/"
    );
    setDataBasedOnYear(Array.isArray(data) ? data : []);
  };

  return (
    <>
      <div className="medalWinnerWrapper">
        <div className="medalWinnerInner">
          <div className="medalWinner-ajax-container">
            <div className="medalWinnerHeader">
              <div className="medalWinnerHeaderInner">
                <h3 className="heading-1">OLYMPICS TIMELINE</h3>
                <h4 className="heading-2">{"भारत के सर्वश्रेष्ठ खिलाड़ी"}</h4>
                <ul className="mw_years">
                  {latestYearData.map((yearData) => (
                    <li
                      key={yearData.year}
                      className={
                        selectedYearData.year === yearData.year ? "active" : ""
                      }
                    >
                      <a
                        data-place={yearData.place}
                        data-yid={yearData.year}
                        onClick={() => handleOnYearSelect(yearData)}
                      >
                        {yearData.year}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mw_yearwrap">
                  {selectedYearData.year} ओलिंपिक -
                  <span>&nbsp;{selectedYearData.place}</span>
                </div>
              </div>
            </div>
            {dataBasedOnYear.length > 0 && (
              <div className="medalWinnerSlider">
                <div data-glide-el="controls" className="upcntrls">
                  <a
                    id="button_1"
                    className="left-arrow l1 act"
                    data-glide-dir="<"
                  ></a>
                  <a
                    id="button_2"
                    className="right-arrow r1 act"
                    data-glide-dir=">"
                  ></a>
                </div>
                <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                    {(dataBasedOnYear || []).map((playerData) => (
                      <li
                        className="glide__slide medals-2016"
                        key={playerData.title + playerData.t_name}
                      >
                        <div className="inner">
                          <div className="contentBox">
                            <div className="contentHeader">
                              <div className="iconBoxSec">
                                <ul className="gamesIcon winnerIcon">
                                  <li className={playerData?.t_name}></li>
                                </ul>
                                <div className="textBox">
                                  <div className="name">{playerData.title}</div>
                                  <div className="game">
                                    {playerData.t_name}
                                  </div>
                                </div>
                              </div>
                              <div className="madelWrap bronze_1">
                                <img
                                  alt="gold.svg"
                                  src={`/images/olympics/${playerData.medal.toLowerCase()}.svg`}
                                />
                              </div>
                            </div>
                            <div className="olymdesc">
                              <div className="Discrition">
                                {isMobile && (
                                  <div className="imageBox">
                                    <LazyLoadImage
                                      src={playerData.image}
                                      alt={playerData.title}
                                      title={playerData.title}
                                      isLazyLoad={true}
                                      width={120}
                                      height={90}
                                    />
                                  </div>
                                )}
                                {playerData.olydesc}
                              </div>
                              {!isMobile && (
                                <div className="imageBox">
                                  <LazyLoadImage
                                    src={playerData.image}
                                    alt={playerData.title}
                                    title={playerData.title}
                                    isLazyLoad={true}
                                    width={120}
                                    height={90}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="readmoreOuter">
                              <a href={playerData.link} className="readmore">
                                और पढ़े
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div data-glide-el="controls[nav]" className="upblt">
              {(dataBasedOnYear || []).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-glide-dir={`=${index}`}
                ></button>
              ))}
              {/* <button type="button" data-glide-dir="=1"></button>
              <button type="button" data-glide-dir="=2"></button>
              <button type="button" data-glide-dir="=3"></button>
              <button type="button" data-glide-dir="=4"></button> */}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .medalWinnerWrapper {
          position: relative;
          background: #001d42;
          padding: 15px 0 10px;
          font-family: "Fira Sans";
          margin-bottom: 30px;
          background-image: url(/images/olympics//upbg.png);
          background-size: contain;
          background-repeat: no-repeat;
          min-height: 627px;
        }
        .medalWinnerWrapper:before {
          content: "";
          width: 100%;
          height: 39%;
          background: linear-gradient(
            180deg,
            rgba(0, 29, 66, 0) 0%,
            #001d42 81.25%
          );
          position: absolute;
          top: 5%;
        }
        // .medalWinnerWrapper::after {
        //   content: "";
        //   width: 100%;
        //   height: 30px;
        //   background: #000;
        //   position: absolute;
        //   bottom: 0;
        // }

        .medalWinnerInner {
          width: 1174px;
          margin: 0 auto;
        }

        .medalWinnerHeader {
          display: flex;
          justify-content: center;
          margin: 45px 0 12px;
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
          width: 100%;
        }

        .medalWinnerHeaderInner .heading-1 {
          color: #ef4e37;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3.7px;
          line-height: 12px;
          text-shadow: 0 4px 4px rgb(0 0 0 / 0.25);
        }

        .medalWinnerHeaderInner .heading-2 {
          color: #fff;
          font-size: 28px;
          font-weight: 600;
          // border-bottom: 2px solid #d2d2d2;
          margin-bottom: 40px;
          padding: 10px 0 6px;
          line-height: 33px;
          text-transform: uppercase;
          text-shadow: 0 4px 4px rgb(0 0 0 / 0.25);
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
          display: table;
          margin: 0 auto 25px;
          padding: 10px 20px;
          color: #fff;
          font-size: 20px;
          line-height: 22px;
          text-transform: uppercase;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        .medalWinnerHeaderInner .mw_yearwrap span {
          color: #ef4e37;
          font-weight: 600;
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
          background: #00152f;
          width: 100%;
          flex-shrink: 0;
          white-space: initial;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: #fff0;
          position: relative;
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
          outline: none;
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
          background: none;
          cursor: pointer;
        }
        .medalWinnerSlider .right-arrow {
          width: 38px;
          height: 44px;
          position: absolute;
          top: 120px;
          left: 100%;
          z-index: 3;
          background: none;
          cursor: pointer;
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

        .olymdesc {
          display: flex;
        }

        .medalWinnerSlider .imageBox {
          width: 120px;
          height: 90px;
        }

        .medalWinnerSlider .imageBox img {
          width: 100%;
          height: 100%;
        }

        .medalWinnerSlider .readmoreOuter {
          display: flex;
          justify-content: center;
          width: 100px;
          height: 29px;
          gap: 12px;
          border-radius: 4px 0 0 0;
          border: 1px solid #343434;
          background-color: #001228;
          margin-top: 10px;
        }

        .medalWinnerSlider .readmore {
          color: #fff;
          font-size: 11px;
          text-transform: uppercase;
          text-align: center;
          position: relative;
          line-height: 16px;
          margin-top: 5px;
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
        }

        .medalWinnerSlider .Discrition {
          font-size: 14px;
          line-height: 20px;
          color: #acacac;
          width: calc(100% - 150px);
          margin-right: 30px;
        }

        .gamesIcon.winnerIcon {
          margin-right: 10px;
        }

        .gamesIcon.winnerIcon li {
          margin: 0;
          background-color: #132e50;
          overflow: hidden;
        }
        .gamesIcon li {
          width: 40px;
          height: 40px;
          background-color: #0a2036;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/olympic-d-white-icon.png);
          margin: 5px 9px 5px 0;
          border-radius: 50%;
        }
        .gamesIcon li a {
          display: block;
          width: 40px;
          height: 40px;
        }
        .gamesIcon li.Archery {
          background-position: -57px 0px;
        }
        .gamesIcon li.Artistic_Gymnastics {
          background-position: -114px 0px;
        }
        .gamesIcon li.Artistic_Swimming {
          background-position: -171px 0px;
        }
        .gamesIcon li.Athletics {
          background-position: -228px 0px;
        }
        .gamesIcon li.Badminton {
          background-position: -283px 0px;
        }
        .gamesIcon li.Baseball_Softball {
          background-position: -342px 0px;
        }
        .gamesIcon li.Basketball {
          background-position: -399px 0px;
        }
        .gamesIcon li.Beach_Volleyball {
          background-position: -456px 0px;
        }
        .gamesIcon li.Boxing {
          background-position: -509px 0px;
        }
        .gamesIcon li.Canoe_Slalom {
          background-position: -566px 0px;
        }
        .gamesIcon li.Canoe_Sprint {
          background-position: -627px 0px;
        }
        .gamesIcon li.Cycling_BMX_Freestyle {
          background-position: -679px 0px;
        }
        .gamesIcon li.Cycling_BMX_Racing {
          background-position: -735px 0px;
        }
        .gamesIcon li.Cycling_Mountain_Bike {
          background-position: -795px 0px;
        }
        .gamesIcon li.Cycling_Road {
          background-position: -852px 0px;
        }
        .gamesIcon li.Cycling_Track {
          background-position: -907px 0px;
        }
        .gamesIcon li.Diving {
          background-position: -963px 0px;
        }
        .gamesIcon li.Equestrian {
          background-position: -1022px 0px;
        }
        .gamesIcon li.Fencing {
          background-position: -1080px 0px;
        }
        .gamesIcon li.Football {
          background-position: -1135px 0px;
        }
        .gamesIcon li.Golf {
          background-position: -1190px 0px;
        }
        .gamesIcon li.Handball {
          background-position: -1245px 0px;
        }
        .gamesIcon li.Hockey,
        .gamesIcon li.hockey {
          background-position: 0px -54px;
        }
        .gamesIcon li.Judo {
          background-position: -57px -54px;
        }
        .gamesIcon li.Karate {
          background-position: -114px -54px;
        }
        .gamesIcon li.Marathon_Swimming {
          background-position: -171px -54px;
        }
        .gamesIcon li.Modern_Pentathlon {
          background-position: -228px -54px;
        }
        .gamesIcon li.Rhythmic_Gymnastics {
          background-position: -283px -54px;
        }
        .gamesIcon li.Rowing {
          background-position: -342px -54px;
        }
        .gamesIcon li.Rugby {
          background-position: -399px -54px;
        }
        .gamesIcon li.Sailing {
          background-position: -456px -54px;
        }
        .gamesIcon li.Shooting {
          background-position: -509px -54px;
        }
        .gamesIcon li.Skateboarding {
          background-position: -566px -54px;
        }
        .gamesIcon li.Sport_Climbing {
          background-position: -627px -54px;
        }
        .gamesIcon li.Surfing {
          background-position: -679px -54px;
        }
        .gamesIcon li.Swimming {
          background-position: -735px -54px;
        }
        .gamesIcon li.Table_Tennis {
          background-position: -795px -54px;
        }
        .gamesIcon li.Taekwondo {
          background-position: -852px -54px;
        }
        .gamesIcon li.Tennis {
          background-position: -907px -54px;
        }
        .gamesIcon li.Trampoline_Gymnastics {
          background-position: -963px -54px;
        }
        .gamesIcon li.Triathlon {
          background-position: -1022px -54px;
        }
        .gamesIcon li.Volleyball {
          background-position: -1080px -54px;
        }
        .gamesIcon li.Water_Polo {
          background-position: -1135px -54px;
        }
        .gamesIcon li.Weightlifting {
          background-position: -1190px -54px;
        }
        .gamesIcon li.Wrestling {
          background-position: -1245px -54px;
        }
        #top-widget-calender-section ul.gamesIcon li.active {
          background-color: #ef4e37;
        }

        .medalWinnerSlider .iconBoxSec {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .medalWinnerSlider .textBox .name {
          color: #fff;
          font-size: 24px;
          font-weight: 700;
        }

        .medalWinnerSlider .textBox .game {
          color: #969696;
          font-size: 13px;
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

        .medalWinnerInner .mw_years {
          display: inline-block;
          justify-content: center;
          align-items: flex-end;
          position: relative;
          z-index: 9;
          margin-bottom: 40px;
          max-width: 100%;
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
          height: 57px;
        }

        .medalWinnerInner .mw_years li {
          margin: 0 6px;
          display: inline-block;
        }

        .medalWinnerInner .mw_years li a {
          font-size: 16px;
          background: #001d42cc;
          cursor: pointer;
          text-transform: uppercase;
          text-align: center;
          color: #b5b5b5;
          position: relative;
          width: 59px;
          border: 1px solid #b5b5b5b2;
          border-radius: 8px;
          height: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .medalWinnerInner .mw_years li.active a {
          background: #fff;
          font-size: 18px;
          color: #fff;
          font-weight: 700;
          width: 65px;
          background-color: #00152f;
          border: 2px solid #fff;
        }
        .medalWinnerInner .mw_years li.active a:before {
          content: "";
          position: absolute;
          bottom: -14px;
          left: 0;
          right: -3px;
          margin: 0 auto;
          box-sizing: border-box;
          display: block;
          width: 0px;
          height: 0px;
          border-left: 9px solid transparent;
          border-right: 9px solid transparent;
          border-bottom: 13px solid currentColor;
          transform: rotate(180deg);
        }

        .medalWinnerInner .mw_years li.active a::after {
          background: #fff;
          font-size: 18px;
          color: #fff;
          font-weight: 700;
          width: 65px;
          background-color: #00152f;
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
          font-weight: 400;
          margin-bottom: 2px;
          color: #fff;
          line-height: 15px;
          text-decoration: underline;
        }

        .medalWinnerSlider .iconBoxSec .textBox {
          display: flex;
          justify-content: center;
          align-items: baseline;
          gap: 10px;
        }
        .upblt {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 20px;
          display: none;
        }
        .upblt button {
          width: 6px;
          height: 6px;
          background: #abb3dc;
          border-radius: 3px;
          display: block;
          border: none;
          outline: none;
        }
        .upblt button.glide__bullet--active {
          background: #ffffff;
          width: 20px;
          height: 4px;
        }

        @media (max-width: 768px) {
          .medalWinnerInner {
            width: 100%;
          }

          .medalWinnerHeader {
            display: block;
            margin: 20px 0;
          }

          .medalWinnerInner .mw_years {
            width: 100%;
            justify-content: flex-start;
          }

          .olymdesc {
            display: block;
          }

          .medalWinnerSlider .Discrition {
            width: 100%;
            margin: 0;
          }

          .medalWinnerSlider .imageBox {
            float: right;
            width: 88px;
            height: 66px;
            margin: 0 0 10px 10px;
          }
          .medalWinnerWrapper {
            background-size: 100% 30%;
          }
          .medalWinnerWrapper:before {
            top: -5%;
          }
          .upblt {
            display: flex;
          }
          .upcntrls {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
