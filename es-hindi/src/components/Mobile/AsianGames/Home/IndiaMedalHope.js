import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import React, { useEffect, useState } from "react";

const IndiaMedalHope = ({
  gameList = [],
  medalHopeList = [],
  asianGamesMedalHopeNews = [],
}) => {
  const [selectedGame, setSelectedGame] = useState(gameList?.[0] || {});
  const [medalHopePlayerList, setPlayerHopeMedalList] = useState(
    medalHopeList.filter((data) => data.t_name === selectedGame.title)
  );
  const [isDropdownActive, setDropDownActive] = useState(false);

  useEffect(() => {
    if (
      document.querySelector(".medalHopeSlider") &&
      medalHopePlayerList.length
    ) {
      new Glide(document.querySelector(".medalHopeSlider"), {
        type: "slider",
        autoplay: false,
        perView: medalHopePlayerList.length >= 2 ? 2 : 1,
        slidesToScroll: 1,
        gap: 20,
      }).mount();
    }
  }, [medalHopePlayerList]);

  const handleOnGameSelect = (game) => {
    if (selectedGame.tid !== game.tid) {
      setSelectedGame(game);
      setPlayerHopeMedalList(
        medalHopeList.filter((data) => data.t_name === game.title)
      );
    }
    setDropDownActive((prev) => !prev);
  };

  return (
    <>
      <div className="medalHopeWrapper">
        <div className="medalHopeInner">
          <div className="medalHopeHeader">
            <div className="medalHopeHeadingWrapper">
              <div className="medalHopeHeadingInner">
                <h3 className="heading-1">ASIAN GAMES 2023</h3>
                <h4 className="heading-2">भारत की पदक आशा</h4>
                <p className="heading-3">
                  हांग्जो में भाग लेने वाले भारतीय एथलीटों के बारे में और जानें
                  एशियन गेम्स 2023…
                </p>
              </div>
            </div>
            <div className="medalHopeFilterWrap">
              <div className="medalHopeFilter">
                <h3 className="heading">Filter by Event</h3>
                <div className="MH_FilterDrop">
                  <div
                    className="MH_FilterVal"
                    onClick={() => setDropDownActive((prev) => !prev)}
                  >
                    {selectedGame.title}
                  </div>
                  <ul
                    className={`MH_FilterDropBox ${
                      isDropdownActive ? "active" : ""
                    }`}
                  >
                    {gameList.map((game) => (
                      <li key={game.tid}>
                        <a
                          data-value={game.title}
                          onClick={() => handleOnGameSelect(game)}
                          href="javascript:void(0)"
                        >
                          {game.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="medalHopecurrentGame">
                <ul className="gamesIcon">
                  <li className={selectedGame.title}></li>
                </ul>
                <span>{selectedGame.title}</span>
              </div>
            </div>
          </div>
          <div id="medalHopeSliderSection">
            <div className="medalHopeSlider">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  {medalHopePlayerList.map((data) => (
                    <li key={data.id} className="glide__slide">
                      <div className="inner">
                        <div className="imageOuter">
                          <div className="imageInnter">
                            <LazyLoadImage
                              src={data.thumbnail}
                              alt={data.title}
                              title={data.title}
                              height={150}
                              width={150}
                              isRes={true}
                            />
                          </div>
                        </div>
                        <h3 className="heading-1">{data.title}</h3>
                        <h4 className="subHead">{data.t_name}</h4>
                        <div className="madalListOuter">
                          <ul className="madalList">
                            <li className={`${data.medal_type}`}></li>
                            <li></li>
                            <li></li>
                          </ul>
                        </div>
                        {data.link && data.link !== "#" && (
                          <div className="readmoreOuter">
                            <a
                              href={(data.link || "").replace(
                                "https://hindi.news18.com",
                                ""
                              )}
                              className="readmore"
                            >
                              अधिक पढ़ें
                            </a>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div data-glide-el="controls" className="glide__arrows">
                <a
                  href="javascript:void(0)"
                  id="button_1"
                  className="left-arrow l1 act"
                  data-glide-dir="<"
                >
                  &lt;
                </a>
                <div className="glide__bullets" data-glide-el="controls[nav]">
                  <button
                    className="glide__bullet glide__bullet--active"
                    data-glide-dir="=0"
                  ></button>
                  <button
                    className="glide__bullet"
                    data-glide-dir="=1"
                  ></button>
                  <button
                    className="glide__bullet"
                    data-glide-dir="=2"
                  ></button>
                </div>
                <a
                  href="javascript:void(0)"
                  id="button_2"
                  className="right-arrow r1 act"
                  data-glide-dir=">"
                >
                  &gt;
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="medalHopesStory">
          <ul>
            <ul className="storyLeft">
              {asianGamesMedalHopeNews.map((data) => (
                <li key={data.story_id}>
                  <a href={data?.weburl_r || ""}>
                    <h4 className="text">{data.headline}</h4>
                    <div className="imgbox">
                      <LazyLoadImage
                        src={data?.images?.url || ""}
                        alt={data.headline}
                        title={data.headline}
                        width={110}
                        height={73}
                        isRes={true}
                      />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <a href="/tag/asian-games/" className="moreStory">
              और पढ़े
            </a>
          </ul>
        </div>
      </div>
      <style jsx>{`
        // India's Medal hopes
        .medalHopeWrapper {
          font-weight: normal;
          background-color: #f6f6f6;
          border: 1px solid #c1c1c1;
          border-radius: 10px;
          padding: 10px 0;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/pwa_IndianFlag.png);
          background-repeat: no-repeat;
          margin: 0 10px;
          margin-bottom: 20px;
        }
        .medalHopeHeadingWrapper {
          display: flex;
          justify-content: flex-end;
          padding-right: 10px;
        }
        .medalHopeHeadingInner {
          width: 280px;
        }
        .medalHopeHeadingInner .heading-1 {
          color: #e1261c;
          font-weight: normal;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 4.4px;
          text-align: center;
        }
        .medalHopeHeadingInner .heading-2 {
          color: #001d42;
          font-size: 29px;
          font-weight: 600;
          border-bottom: 2px solid #d2d2d2;
          margin-bottom: 5px;
          letter-spacing: -1px;
          line-height: 26px;
          padding-bottom: 5px;
          text-align: center;
        }
        .medalHopeHeadingInner .heading-3 {
          color: #000000;
          font-weight: normal;
          font-size: 12px;
          margin-bottom: 7px;
          line-height: 16px;
          text-align: center;
        }
        .medalHopeFilterWrap {
          width: 250px;
          margin: 0 auto 15px;
        }
        .medalHopeFilter {
          height: 30px;
          margin-bottom: 10px;
          display: flex;
          background: #e1261d;
          border-radius: 6px;
          color: #fff;
          padding: 8px 0 8px 11px;
        }
        .medalHopeFilter .heading {
          font-size: 12px;
          text-transform: uppercase;
          border-bottom: 1px solid;
          margin-right: 10px;
          display: flex;
          align-items: center;
        }
        .medalHopeFilter .MH_FilterDrop {
          width: 132px;
          position: relative;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/dropdown-icon.png);
          background-repeat: no-repeat;
          background-position: right 9px center;
        }
        .medalHopeFilter .MH_FilterDrop .MH_FilterVal {
          height: 100%;
          padding-left: 23px;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 600;
          text-align: left;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .medalHopeFilter .MH_FilterDrop .MH_FilterVal::before {
          content: "-";
          position: absolute;
          left: 10px;
          font-size: 18px;
          top: 50%;
          transform: translate(0, -50%);
        }
        .MH_FilterDropBox {
          width: 100%;
          position: absolute;
          top: 22px;
          font-size: 11px;
          background: #e8e8e8;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          border: 1px solid #d0d0d0;
          border-top: 0;
          display: none;
          z-index: 99;
        }
        .MH_FilterDropBox.active {
          display: block;
        }
        .MH_FilterDropBox li:last-child {
          margin-bottom: 0;
        }
        .MH_FilterDropBox li a {
          position: relative;
          color: #001d42;
          font-size: 11px;
          text-transform: uppercase;
          text-align: left;
          display: block;
          padding: 7px 7px 7px 23px;
        }
        .MH_FilterDropBox li a::before {
          content: "-";
          position: absolute;
          left: 10px;
          font-size: 18px;
          top: 50%;
          transform: translate(0, -50%);
        }
        .medalHopecurrentGame {
          text-align: center;
        }
        .medalHopecurrentGame .gamesIcon {
          display: flex;
          justify-content: center;
        }
        .medalHopecurrentGame .gamesIcon li {
          width: 35px;
        }
        .medalHopecurrentGame span {
          color: #c1c1c1;
          text-transform: uppercase;
          font-size: 14px;
          border-bottom: 1px solid;
        }
        .medalHopeSlider {
          width: 100%;
          position: relative;
          box-sizing: border-box;
        }
        .medalHopeSlider * {
          box-sizing: inherit;
        }
        .medalHopeSlider .glide__track {
          overflow: hidden;
        }
        .medalHopeSlider .glide__slides {
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
        .medalHopeSlider .glide__slides--dragging {
          user-select: none;
        }
        .medalHopeSlider .glide__slide {
          width: 100%;
          height: 100%;
          flex-shrink: 0;
          white-space: initial;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
        }
        .medalHopeSlider .glide__slide a {
          user-select: none;
          -webkit-user-drag: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        .medalHopeSlider .glide__arrows {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 17px;
          margin-bottom: 15px;
        }
        .medalHopeSlider .glide__bullets {
          -webkit-touch-callout: none;
          user-select: none;
          text-align: center;
          display: flex;
        }
        .medalHopeSlider .glide__bullets button:focus {
          outline: none;
        }
        .medalHopeSlider .glide__bullets button.glide__bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 0;
          background: #707070;
          margin: 0 5px;
        }
        .medalHopeSlider
          .glide__bullets
          button.glide__bullet.glide__bullet--active {
          background: #e1261d;
          width: 20px;
          border-radius: 15px;
        }
        .medalHopeSlider .glide--rtl {
          direction: rtl;
        }
        .medalHopeSlider .left-arrow {
          width: 17px;
          height: 11px;
          position: relative;
          font-size: 0;
          margin-right: 40px;
        }
        .medalHopeSlider .left-arrow:before {
          content: "";
          border-top: 2px solid #e1261d;
          border-left: 2px solid #e1261d;
          width: 6px;
          height: 6px;
          -webkit-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          transform: rotate(-45deg);
          position: absolute;
          left: 0px;
          top: 2px;
        }
        .medalHopeSlider .left-arrow:after {
          content: "";
          width: 17px;
          height: 2px;
          background-color: #e1261d;
          display: block;
          left: 0;
          position: absolute;
          top: 5px;
        }
        .medalHopeSlider .right-arrow {
          position: relative;
          font-size: 0;
          width: 17px;
          height: 11px;
          margin-left: 40px;
        }
        .medalHopeSlider .right-arrow:after {
          content: "";
          width: 17px;
          height: 2px;
          background-color: #e1261d;
          display: block;
          left: 0;
          position: absolute;
          top: 5px;
        }
        .medalHopeSlider .right-arrow:before {
          content: "";
          border-top: 2px solid #e1261d;
          border-left: 2px solid #e1261d;
          width: 6px;
          height: 6px;
          -webkit-transform: rotate(132deg);
          -ms-transform: rotate(132deg);
          transform: rotate(132deg);
          position: absolute;
          top: 2px;
          left: 8px;
          background: transparent;
        }
        .medalHopeSlider .inner {
          position: relative;
        }
        .medalHopeSlider .inner::after {
          content: "";
          width: 10px;
          height: 100%;
          position: absolute;
          left: 100%;
          top: 0;
          border-right: 1px dashed #707070;
        }
        .medalHopeSlider .imageOuter {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          border-radius: 50%;
          border: 1px solid #707070;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
        }
        .medalHopeSlider .imageOuter .imageInnter {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
        }
        .medalHopeSlider .imageOuter .imageInnter img {
          width: 100%;
          height: 100%;
        }
        .medalHopeSlider .heading-1 {
          text-align: center;
          font-size: 15px;
          text-transform: uppercase;
          color: #3279ba;
        }
        .medalHopeSlider .subHead {
          font-size: 12px;
          color: #464646;
          font-weight: normal;
          text-align: center;
          font-style: italic;
          margin-bottom: 5px;
        }
        .medalHopeSlider .madalListOuter {
          display: flex;
          justify-content: center;
          margin-bottom: 17px;
        }
        .medalHopeSlider .madalList {
          border: 1px solid #c4c4c4;
          background: #fff;
          display: flex;
          padding: 4px 19px;
          border-radius: 17px;
        }
        .medalHopeSlider .madalList li {
          width: 11px;
          height: 22px;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/medal-icon.png);
          background-repeat: no-repeat;
          margin-right: 5px;
        }
        .medalHopeSlider .madalList li.gold {
          background-position: -30px 0;
        }
        .medalHopeSlider .madalList li.silver {
          background-position: -60px 0;
        }
        .medalHopeSlider .madalList li.bronze {
          background-position: -90px 0;
        }
        .medalHopeSlider .madalList li:last-child {
          margin-right: 0;
        }
        .medalHopeSlider .readmoreOuter {
          display: flex;
          justify-content: center;
        }
        .medalHopeSlider .readmore {
          color: #e1261d;
          font-size: 11px;
          text-transform: uppercase;
          text-align: center;
          border-bottom: 1px solid #e1261d;
          position: relative;
        }
        .medalHopeSlider .readmore::before {
          content: "+";
          position: absolute;
          left: -10px;
        }
        .medalHopesStory {
          background: #fff;
          border-top: 6px solid #3279ba;
          padding: 10px;
          box-shadow: 0 0 10px #00000029;
        }
        .medalHopesStory ul {
          margin-bottom: 10px;
        }
        .medalHopesStory ul li {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #d8d8d8;
        }
        .medalHopesStory ul li a {
          display: flex;
        }
        .medalHopesStory ul li .imgbox {
          align-self: self-start;
          margin-left: 10px;
          width: 110px;
          flex-shrink: 0;
        }
        .medalHopesStory ul li .imgbox img {
          display: block;
          width: 100%;
        }
        .medalHopesStory ul li .text {
          font-size: 14px;
          color: #001d42;
          line-height: 18px;
        }
        .medalHopesStory ul li:last-child {
          margin: 0;
        }
        .medalHopesStory .moreStory {
          color: #ff0000;
          width: 110px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          background: #ffffff;
          font-size: 13px;
          text-transform: uppercase;
          font-weight: 600;
          border: 2px solid #e1261c;
          border-radius: 30px;
          line-height: 27px;
        }
      `}</style>
    </>
  );
};

export default IndiaMedalHope;
