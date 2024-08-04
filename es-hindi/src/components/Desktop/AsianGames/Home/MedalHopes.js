import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import LazyImage from "components/Common/CustomImage";

const IndianMedalHopes = ({
  gameList,
  asianGamesMedalHopeNews,
  medalHopeList,
}) => {
  const [selectedGame, setSelectedGame] = useState(gameList?.[0] || {});
  const [isDropdownActive, setDropDownActive] = useState(false);
  const [medalHopePlayerList, setPlayerHopeMedalList] = useState(
    medalHopeList.filter((data) => data.t_name === selectedGame.title)
  );
  const leftSideData = asianGamesMedalHopeNews.slice(0, 2);
  const rightSideData = asianGamesMedalHopeNews.slice(2, 5);

  useEffect(() => {
    if (
      document.querySelector(".medalHopeSlider") &&
      medalHopePlayerList.length
    ) {
      new Glide(document.querySelector(".medalHopeSlider"), {
        type: "slider",
        autoplay: false,
        perView:
          medalHopePlayerList.length > 3 ? 4 : medalHopePlayerList.length,
        slidesToScroll: 1,
        gap: 0,
      }).mount();
    }
  }, [medalHopePlayerList]);

  const handleOnSelectData = (game) => {
    if (selectedGame.tid !== game.tid) {
      setSelectedGame(game);
      setPlayerHopeMedalList(
        medalHopeList.filter((data) => data.t_name === game.title)
      );
    }
    setDropDownActive((prev) => !prev);
  };

  if (!gameList.length) return null;

  return (
    <>
      <div className="medalHopeWrapper">
        <div className="medalHopeInner">
          <div className="medalHopeHeader">
            <div className="medalHopeHeadingWrapper">
              <div className="medalHopeHeadingInner">
                <h3 className="heading-1">ASIAN GAMES 2023</h3>
                <h4 className="heading-2">भारत की पदक आशा</h4>
                <h5 className="heading-3">
                  हांग्जो में भाग लेने वाले भारतीय एथलीटों के बारे में और जानें
                  एशियन गेम्स 2023…
                </h5>
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
                              onClick={() => handleOnSelectData(game)}
                              data-value={game.title}
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
            </div>
          </div>
          <div id="medalHopeSliderSection">
            <div className="medalHopeSlider">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  {medalHopePlayerList.map((data) => (
                    <li className="glide__slide" key={data.id}>
                      <div className="inner">
                        <div className="imageOuter">
                          <div className="imageInnter">
                            <LazyImage
                              src={data.image}
                              alt={data.title}
                              title={data.title}
                              width={150}
                              height={150}
                            />
                          </div>
                        </div>
                        <h3 className="heading-1">{data.title}</h3>
                        <h4 className="subHead">{data.t_name}</h4>
                        <div className="medals_row">
                          <div className={`medal ${data.medal_type}`}></div>
                          <div className="medal"></div>
                          <div className="medal"></div>
                        </div>
                        <div className="madalListOuter"></div>
                        <p className="para">{data.olydesc}</p>
                        {data.link && data.link !== "#" && (
                          <div className="readmoreOuter">
                            <a
                              href={(data?.link || "").replace(
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
            </div>
          </div>
        </div>
        <div className="medalHopesStory">
          <div className="medalHopesStoryWrapper">
            <div className="medalHopesStoryInner">
              <ul className="storyLeft">
                {leftSideData.map((data) => (
                  <li key={data.story_id}>
                    <a href={data?.weburl_r}>
                      <div className="imgbox">
                        <LazyImage
                          src={data?.images?.url || ""}
                          alt={data.display_headline}
                          title={data.display_headline}
                          width={150}
                          height={100}
                        />
                      </div>
                      <h4 className="text">{data.display_headline}</h4>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="storyRight">
                {rightSideData.map((data) => (
                  <li key={data.story_id}>
                    <a href={data?.weburl_r}>
                      <div className="imgbox">
                        <LazyImage
                          src={data?.images?.url || ""}
                          alt={data.display_headline}
                          title={data.display_headline}
                          width={90}
                          height={60}
                        />
                      </div>
                      <h4 className="text">{data.display_headline}</h4>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="moreStory">
              <a href="/tag/asian-games/">और पढ़े</a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        // Medal-Hopes
        .medalHopeWrapper {
          font-family: "Mukta", sans-serif;
          font-weight: normal;
          background-color: #f6f6f6;
          border: 1px solid #c1c1c1;
          border-radius: 10px;
          padding: 20px 0;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/IndianFlag.png);
          background-repeat: no-repeat;
          margin-bottom: 30px;
        }
        .medalHopeHeadingWrapper {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 25px;
        }
        .medalHopeHeadingInner {
          text-align: center;
          margin-right: 33px;
        }
        .medalHopeHeadingInner .heading-1 {
          color: #e1261c;
          font-weight: normal;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 8.8px;
        }
        .medalHopeHeadingInner .heading-2 {
          color: #001d42;
          font-size: 58px;
          font-weight: 600;
          border-bottom: 2px solid #d2d2d2;
          margin-bottom: 7px;
          padding: 0 28px 6px;
          line-height: 58px;
          padding-top: 5px;
        }
        .medalHopeHeadingInner .heading-3 {
          color: #000;
          font-weight: normal;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .medalHopeFilterWrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .medalHopeFilter {
          height: 30px;
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
          width: 151px;
          position: relative;
          width: 151px;
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
          height: 250px;
          overflow-y: auto;
          overflow-x: hidden;
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
        .MH_FilterDropBox li a:hover {
          background: #e1261d;
          color: #fff;
        }
        .MH_FilterDropBox li a::before {
          content: "-";
          position: absolute;
          left: 10px;
          font-size: 18px;
          top: 50%;
          transform: translate(0, -50%);
        }
        .MH_FilterDropBox li.active {
          background: #e1261d;
        }
        .MH_FilterDropBox li.active a {
          color: #fff;
        }
        .medalHopecurrentGame {
          display: flex;
          align-items: center;
          margin-left: 20px;
        }
        .medalHopecurrentGame .gamesIcon {
          margin-right: 10px;
        }
        .medalHopecurrentGame .gamesIcon li {
          margin: 0;
        }
        .medalHopecurrentGame span {
          color: #c1c1c1;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 16px;
          border-bottom: 1px solid #c1c1c1;
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
          height: 100%;
          flex-shrink: 0;
          white-space: initial;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
          border-right: 1px dashed #707070;
          padding: 0 10px;
        }
        .medalHopeSlider .glide__slide:last-child {
          border: 0;
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
          margin-top: 20px;
        }
        .medalHopeSlider .glide__bullets {
          -webkit-touch-callout: none;
          user-select: none;
          text-align: center;
          display: flex;
        }
        .medalHopeSlider .glide__bullets button:focus {
          outline: 0;
        }
        .medalHopeSlider .glide__bullets button.glide__bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 0;
          background: #707070;
          margin: 0 5px;
          padding: 0;
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
          background: 0;
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
          left: 0;
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
          background: 0;
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
          background: white;
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
          margin-bottom: 5px;
        }
        .medalHopeSlider .subHead {
          font-size: 12px;
          color: #464646;
          font-weight: normal;
          text-align: center;
          font-style: italic;
          margin-bottom: 11px;
        }
        .medalHopeSlider .madalListOuter {
          display: flex;
          justify-content: center;
        }
        .medalHopeSlider .madalList {
          border: 1px solid #c4c4c4;
          background: #fff;
          display: flex;
          padding: 4px 19px;
          border-radius: 17px;
        }
        .medalHopeSlider .para {
          font-size: 12px;
          color: #565656;
          font-weight: normal;
          line-height: 20px;
          text-align: center;
          margin-bottom: 10px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .medalHopeSlider .readmoreOuter {
          display: flex;
          justify-content: center;
          border-bottom: #e1261d solid 1px;
        }
        .medalHopeSlider .readmore {
          color: #e1261d;
          font-size: 11px;
          text-transform: uppercase;
          text-align: center;
          border-bottom: 1px solid #e1261d;
          position: relative;
          line-height: 15px;
        }
        .medalHopeSlider .readmore::before {
          content: "+";
          position: absolute;
          left: -10px;
        }
        .medalHopesStory {
          padding: 0 20px;
          margin-top: 20px;
        }
        .medalHopesStoryWrapper {
          padding: 20px;
          box-shadow: 0 0 10px #00000029;
          background: #fff;
          border-top: 6px solid #3279ba;
        }
        .medalHopesStoryInner {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .medalHopesStoryInner .storyLeft {
          width: 50%;
          padding-right: 20px;
          border-right: 1px solid #d8d8d8;
        }
        .medalHopesStoryInner .storyLeft li {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #d8d8d8;
        }
        .medalHopesStoryInner .storyLeft li a {
          display: flex;
        }
        .medalHopesStoryInner .storyLeft li .imgbox {
          margin-right: 10px;
          width: 150px;
          flex-shrink: 0;
        }
        .medalHopesStoryInner .storyLeft li .imgbox img {
          display: block;
          width: 100%;
        }
        .medalHopesStoryInner .storyLeft li .text {
          font-size: 16px;
          color: #001d42;
          line-height: 22px;
        }
        .medalHopesStoryInner .storyLeft li:last-child {
          margin: 0;
        }
        .medalHopesStoryInner .storyRight {
          width: 50%;
          padding-left: 19px;
        }
        .medalHopesStoryInner .storyRight li {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #d8d8d8;
        }
        .medalHopesStoryInner .storyRight li a {
          display: flex;
        }
        .medalHopesStoryInner .storyRight li .imgbox {
          margin-right: 10px;
          width: 90px;
          flex-shrink: 0;
        }
        .medalHopesStoryInner .storyRight li .imgbox img {
          display: block;
          width: 100%;
        }
        .medalHopesStoryInner .storyRight li .text {
          font-size: 14px;
          color: #001d42;
          line-height: 20px;
        }
        .medalHopesStoryInner .storyRight li:last-child {
          margin: 0;
        }
        .moreStory {
          display: flex;
          align-items: center;
        }
        .moreStory::before,
        .moreStory::after {
          content: "";
          background: #f5f5f5;
          width: 100%;
          height: 20px;
        }
        .moreStory a {
          color: red;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 12px;
          flex-shrink: 0;
          padding: 0 15px;
        }
        .medals_row {
          width: 80px;
          height: 30px;
          background: #fff;
          border: 1px solid #c4c4c4;
          border-radius: 17px;
          margin: 0 auto 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .medals_row .medal {
          width: 16px;
          height: 22px;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/silver.svg)
            no-repeat center;
          opacity: 0.3;
        }
        .medals_row .medal.silver {
          opacity: 1;
        }
        .medals_row .medal.gold {
          opacity: 1;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/gold-icon.svg)
            no-repeat center;
        }
        .medals_row .medal.bronze {
          opacity: 1;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/bronze-icon.svg)
            no-repeat center;
        }
      `}</style>
    </>
  );
};

export default IndianMedalHopes;
