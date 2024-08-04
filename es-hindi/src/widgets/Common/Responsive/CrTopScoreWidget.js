import React, { useEffect, useState, useRef } from "react";
import fetchUtility from "includes/sFetchUtility";
import Slider from "react-slick";
import TopSliderCard from "components/Cricketnext/Cards/TopSliderCard";
import getConfig from "next/config";
import useLoad from "hooks/useLoad";
import { IPL_SERIES_ID } from "includes/ipl.helper";
import { t20_world_cup_series_id} from "api/Constant";
const { publicRuntimeConfig } = getConfig();
const CrTopScoreWidget = ({
  isMobile = false,
  isAmp = false,
  womenwc = "",
  data = [],
  isIPL = false,
  seriesID = false,
  isHome = false,
  isT20 = false
}) => {
  let matchId = "";
  if (isT20) matchId = `${t20_world_cup_series_id}_`;
  if (isIPL) matchId = `${IPL_SERIES_ID}_`;
  else if (seriesID) matchId = `${seriesID}_`;
  else if (womenwc) matchId = `${womenwc}_`;
  const [isLoaded] = useLoad();
  const [cricketData, setCricketData] = useState(() => {
    if (data && data.length) {
      return [...data];
    } else {
      let dummy = {
        status: "...",
        matchno: "...",
        matchtype: "...",
        date: "...",
        day: "",
        year: " ...",
        venue: "Loading...",
        quickScoreUrl: "",
        a: {
          fullName: "...",
          name: "...",
          image: "",
          scores: [],
        },
        b: {
          fullName: "...",
          name: "...",
          image: "",
          scores: [],
        },
        isso: "no",
        type: "recent",
      };
      return new Array(4).fill(dummy);
    }
  });
  const updateLiveData = async () => {
    let data = await fetchUtility(
      `${publicRuntimeConfig.CRICKET_NEXT_CSR_API}recent_matches_${matchId}hi.json`,
      []
    );
    if (!(data && data.length)) {
      data = await fetchUtility(
        `${publicRuntimeConfig.CRICKET_NEXT_CSR_API}recent_matches_hi.json`,
        []
      );
    }
    if (data && data.length) {
      // setCricketData(pd => [...data, ...pd.filter(item => item.type != 'live')]);
      if (isHome) {
        data = await fetchUtility(
          `${publicRuntimeConfig.CRICKET_NEXT_CSR_API}live_matches_hi.json`,
          []
        );
        data = data.filter(
          (match) =>
            match.league === "IPL" ||
            (match.league === "ICC" &&
              (match.teama_eng === "India" ||
                match.teamb_eng === "India" ||
                match.seriesname === "आईसीसी क्रिकेट विश्व कप, 2023" ||
                match.seriesname ===
                  "आईसीसी क्रिकेट विश्व कप वार्म-अप मैच, 2023" ||
                  match?.series_Id === `${t20_world_cup_series_id}`))
        );
      }
      setCricketData(data);
    }
  };
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id;
    if (isLoaded && !id) {
      id = setInterval(tick, 10000);
    } else {
      clearInterval(id);
    }
    isLoaded && updateLiveData();
    return () => clearInterval(id);
  }, [isLoaded]);
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = () => updateLiveData();
  });
  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: cricketData?.length > 4 ? 4 : cricketData?.length,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 1,
          swipeToSlide: true,
          arrows: false,
          centerMode: true,
          centerPadding: "0",
        },
      },
    ],
  };
  return (
    <>
      <div
        className={`CN-scoreCardsection ${
          isMobile || isAmp
            ? "mobile-CrTopScoreWidget"
            : "desktop-CrTopScoreWidget"
        }`}
      >
        <div className="CN-scoreCard">
          <Slider {...settings}>
            {cricketData?.length &&
              cricketData.map((data) => <TopSliderCard data={data} />)}
          </Slider>
        </div>
      </div>
      <style jsx global>{`
        .CN-scoreCardsection {
          height: 160px;
          overflow: hidden;
          position: relative;
          margin-bottom: 10px;
          font-family: "Mukta", sans-serif;
        }
        .CN-scoreCard {
          padding: 10px 0;
        }
        .CN-score-section .CN-scoreWrap {
          padding: 15px 0 10px;
          position: relative;
          background-size: cover;
          background: #f5f5f5;
        }
        .CN-score-section .CN-scoreWrap::before {
          content: "";
          width: 50%;
          height: 5px;
          background: #001d42;
          position: absolute;
          top: 0;
          left: 0;
        }
        .CN-score-section .CN-scoreWrap::after {
          content: "";
          width: 50%;
          height: 5px;
          background: #e1261d;
          position: absolute;
          top: 0;
          right: 0;
        }
        .CN-scoreCard {
          height: 160px;
          position: relative;
          padding: 10px;
          width: 100%;
          box-sizing: border-box;
        }
        .CN-scoreCard * {
          box-sizing: inherit;
        }
        .CN-scoreCard .slick-track {
          color: #fff;
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
        .CN-scoreCard .slick-slide {
          width: 100%;
          background: #2d2d2d;
          border-radius: 10px;
          overflow: hidden;
          margin-right: 3px;
          margin-left: 3px;
          //min-width: ${isMobile ? "" : "385px !important"};
        }
        .CN-scoreCard .slick-list {
          overflow: ${isMobile ? "hidden" : ""};
        }
        .mobile-CrTopScoreWidget .slick-slide {
          height: 120px;
          min-width: 318px;
          margin: 0 !important;
        }
        .CN-scoreCard .slick-slide:first-child {
          margin-right: 0px;
        }
        .CN__scoreCardsection {
          margin-right: 0;
        }
        .slick-dots li button {
          font-size: 0px;
          line-height: 0;
          display: block;
          padding: 5px;
          color: transparent;
          border: 0px;
          outline: none;
          background: transparent;
        }
        .slick-dots li,
        .slick-dots li button {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .CN-scoreCard .slick-slide a {
          user-select: none;
          -webkit-user-drag: none;
          -moz-user-select: none;
          -ms-user-select: none;
          color: #fff;
        }
        .CN-scoreCard .slick-track .strip {
          color: #ffffff;
          font-size: 13px;
          line-height: initial;
          background: #ff5148;
          display: flex;
          justify-content: space-between;
          padding: 3px 10px;
        }
        .CN-scoreCard .slick-track .strip .match-date span {
          font-weight: bold;
        }
        .CN-scoreCard .slick-track .strip .match-status {
          text-transform: uppercase;
          font-weight: bold;
          position: relative;
        }
        .CN-scoreCard .slick-track .strip .match-status.live::before {
          content: "";
          background: #ffffff;
          width: 6px;
          height: 6px;
          border-radius: 100%;
          display: inline-block;
          margin-right: 5px;
          position: relative;
          top: -2px;
          animation: blinker 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
        }
        @keyframes blinker {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .CN-scoreCard .slick-dots {
          display: flex !important;
          margin-top: 10px;
          justify-content: center;
        }
        .CN-scoreCard .slick-track .teamscoreWrap {
          display: flex;
          justify-content: center;
          padding: 5px 0;
          align-items: flex-end;
          min-height: 65px;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .vs {
          padding: 0 18px 6px;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .vs img {
          width: 14px;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          width: 110px;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox:first-child * {
          text-align: right;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox:last-child {
          align-items: flex-start;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .text .score-1 {
          font-size: 12px;
          line-height: 12px;
          position: absolute;
          top: 0;
          width: 100%;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .text .score-2 {
          font-size: 17px;
          font-weight: bold;
          line-height: 15px;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .text .runrate {
          font-size: 11px;
          line-height: 10px;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .flagWrap {
          display: flex;
          padding-top: 4px;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .heading {
          font-size: 13px;
          line-height: 13px;
          color: #fff;
          text-transform: uppercase;
          font-weight: bold;
          white-space: normal;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .flagWrap .flag {
          width: 43px;
        }
        .CN-scoreCard
          .slick-track
          .teamscoreWrap
          .scorebox
          .flagWrap
          .flag
          img {
          width: 43px;
          height: 29px;
          font-size: 8px;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox:first-child .text {
          margin-right: 5px;
          position: relative;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox:last-child .text {
          margin-left: 5px;
          position: relative;
        }
        .CN-scoreCard .slick-track .score-ftr {
          margin-bottom: 0 !important;
          color: #d8d8d8;
          font-size: 12px;
          text-align: center;
          line-height: 13px;
          font-weight: bold;
          padding: 6px 0;
          border-top: 1px solid #505050;
        }
        .CN-scoreCard .slick-track .score-ftr span {
          font-family: "Karma", serif !important;
          font-weight: bold;
        }
        .CN-scoreCard .slick-prev,
        .CN-scoreCard .slick-next {
          border: none;
          outline: none;
          font-size: 0;
          width: 10px;
          height: 15px;
          position: absolute;
          top: 50%;
          left: -15px;
          z-index: 3;
          transform: translate(0, -50%);
          cursor: pointer;
        }
        .CN-scoreCard .slick-next {
          left: initial;
          right: -15px;
        }
        .slick-dots li.slick-active button::before {
          opacity: 0.75;
          color: rgb(0, 0, 0);
        }
        .slick-dots li button:focus::before,
        .slick-dots li button:hover::before {
          opacity: 1;
        }
        .slick-dots li button::before {
          content: "";
        }
        .slick-dots li button::before {
          font-family: slick;
          font-size: 6px;
          line-height: 20px;
          position: absolute;
          top: 0px;
          left: 0px;
          width: 20px;
          height: 20px;
          content: "•";
          text-align: center;
          opacity: 0.25;
          color: rgb(0, 0, 0);
          -webkit-font-smoothing: antialiased;
        }
        .CN__scoreCardsection {
          margin-right: 0 !important;
        }
        .CN-scoreCard .slick-prev::before {
          content: "";
          border-top: 2px solid #909090;
          border-left: 2px solid #909090;
          width: 8px;
          height: 8px;
          transform: rotate(-45deg);
          position: absolute;
          left: 2px;
          top: 3px;
        }
        .CN-scoreCard .slick-next::before {
          content: "";
          border-bottom: 2px solid #909090;
          border-right: 2px solid #909090;
          width: 8px;
          height: 8px;
          transform: rotate(-45deg);
          position: absolute;
          right: 2px;
          top: 3px;
        }
        .CN-score-1 {
          display: none;
        }
        .slick-dots li button:before {
          content: "";
        }
        .CN-scoreCard .slick-dots li {
          width: 15px;
          height: 4px;
          border-radius: 20px;
          border: 0;
          background: #202020;
          padding: 0;
          margin: 0 2px;
        }
        .CN-scoreCard .slick-dots li.slick-active {
          background: #e1261d;
        }
      `}</style>
    </>
  );
};
export default React.memo(CrTopScoreWidget);
