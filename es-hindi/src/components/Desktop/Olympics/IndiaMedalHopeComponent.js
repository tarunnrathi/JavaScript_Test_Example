import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import React, { useEffect, useState } from "react";
import { olympics_year } from "api/Constant";

export default function IndiaMedalHopeComponent({ medalHopeData = [] }) {
  const [filterOpen, setIsFilterOpen] = useState(false);
  const medalHopeGameList = (
    Array.isArray(medalHopeData) ? medalHopeData : []
  ).reduce(
    (foundValues, nextEmployee) =>
      foundValues.includes(nextEmployee.game)
        ? foundValues
        : foundValues.concat(nextEmployee.game),
    []
  );

  const [filterGameData, setFilterGameData] = useState(
    medalHopeGameList.length
      ? medalHopeData.filter((hope) => hope.game === medalHopeGameList[0])
      : []
  );
  const [selectedGame, setSelectedGame] = useState(
    medalHopeGameList.length ? medalHopeGameList[0] : ""
  );
  if (!medalHopeGameList.length) null;

  const handleOnFilterGame = (game) => {
    if (game !== selectedGame) {
      const filteredData = medalHopeData.filter((hope) => hope.game === game);
      setFilterGameData([...filteredData]);
      setSelectedGame(game);
    }
    setIsFilterOpen(false);
  };

  useEffect(() => {
    if (document.querySelector(".olymimhsldr")) {
      new Glide(document.querySelector(".olymimhsldr"), {
        perView: filterGameData.length > 3 ? 4 : filterGameData.length,
        slidesToScroll: 1,
        gap: 0,
        breakpoints: {
          800: {
            perView: 1,
          },
          480: {
            perView: 1,
          },
        },
      }).mount();
    }
  }, [medalHopeGameList]);

  if (
    !Array.isArray(medalHopeData) ||
    (Array.isArray(medalHopeData) && !medalHopeData.length)
  )
    return null;

  return (
    <>
      <div className="medalHopeWrapper">
        <div className="medalHopeInner">
          <div className="medalHopeHeader">
            <div className="medalHopeHeadingWrapper">
              <div className="medalHopeHeadingInner">
                <h3 className="heading-1">Paris olympics 2024</h3>
                <h2 className="heading-2">{"भारत की पदक आशा"}</h2>
                <h5 className="heading-3">
                  Find out more about the India athletes participating in Paris
                  Olympics {olympics_year}...
                </h5>
                <div className="medalHopeFilterWrap">
                  <div className="medalHopeFilter">
                    <div className="MH_FilterDrop">
                      <div
                        className="MH_FilterVal"
                        onClick={() => setIsFilterOpen(!filterOpen)}
                      >
                        Filter by Event
                      </div>
                      <ul
                        className={`MH_FilterDropBox ${
                          filterOpen ? "active" : ""
                        }`}
                      >
                        {medalHopeGameList.map((game) => (
                          <li key={game}>
                            <a
                              data-value={game}
                              onClick={() => handleOnFilterGame(game)}
                            >
                              {game}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="medalHopecurrentGame">
                    <ul className="gamesIcon">
                      <li className={selectedGame}></li>
                    </ul>
                    <span>{selectedGame}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="medalHopeSliderSection">
            <div className="olymimhsldr sliderSlick">
              <div className="glide__track" data-glide-el="track">
                <div className="glide__slides">
                  {filterGameData.map((data, index) => (
                    <div
                      key={`${index}_${selectedGame}`}
                      className="cursor-pointer"
                    >
                      <div className="imageOuter">
                        <div className="imageInnter">
                          <LazyLoadImage
                            src={data.player_image}
                            height={100}
                            width={100}
                            isLazyLoad={true}
                          />
                        </div>
                      </div>
                      <h3 className="heading-1">{data.player_name}</h3>
                      <h4 className="subHead">{data.game}</h4>
                      <div className="medals_row">
                        <img
                          className={
                            Number(data.gold_medal) > 0 ? "" : "inactive"
                          }
                          alt="gold"
                          src="/images/olympics/gold.svg"
                        />
                        <img
                          className={
                            Number(data.silver_medal) > 0 ? "" : "inactive"
                          }
                          alt="silver"
                          src="/images/olympics/silver.svg"
                        />
                        <img
                          className={
                            Number(data.bronze_medal) > 0 ? "" : "inactive"
                          }
                          alt="bronze"
                          src="/images/olympics/bronze.svg"
                        />
                      </div>
                      <div className="imhnum">
                        <span
                          className={
                            Number(data.gold_medal) > 0 ? "active" : ""
                          }
                        >
                          {data.gold_medal}
                        </span>
                        <span
                          className={
                            Number(data.silver_medal) > 0 ? "active" : ""
                          }
                        >
                          {data.silver_medal}
                        </span>
                        <span
                          className={
                            Number(data.bronze_medal) > 0 ? "active" : ""
                          }
                        >
                          {data.bronze_medal}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {medalHopeGameList.length > 3 && (
                  <div className="glide__arrows" data-glide-el="controls">
                    <button
                      className="glide__arrow glide__arrow--left"
                      data-glide-dir="<"
                      type="button"
                    >
                      prev{" "}
                    </button>
                    <button
                      style={{
                        right: "0 !important",
                        borderRadius: "5px 0 0 5px",
                      }}
                      className="glide__arrow glide__arrow--right"
                      data-glide-dir=">"
                      type="button"
                    >
                      next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="olymhpstry">
          <div className="olymhpstryWrapper">
            <div className="olymhpstryInner">
              <ul className="storyLeft">
                <li>
                  <a href="">
                    <div className="imgbox">
                      <img src="https://images.news18.com/ibnlive/uploads/2022/08/sports-84-16598829693x2.png?impolicy=website&width=150&height=100" />
                    </div>
                    <h4 className="text">
                      Sharath Has Given Belief to Next Generation That You Can
                      Win at Olympics: Kamlesh Mehta
                    </h4>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="imgbox">
                      <img src="https://images.news18.com/ibnlive/uploads/2022/08/sports-84-16598829693x2.png?impolicy=website&width=150&height=100" />
                    </div>
                    <h4 className="text">
                      EXCLUSIVE - 'Felt Like the Worst Race of My Life': Avinash
                      Sable Broke National Record in Tokyo But Wasn't Happy
                    </h4>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="imgbox">
                      <img src="https://images.news18.com/ibnlive/uploads/2022/08/sports-84-16598829693x2.png?impolicy=website&width=150&height=100" />
                    </div>
                    <h4 className="text">
                      EXCLUSIVE - 'Felt Like the Worst Race of My Life': Avinash
                      Sable Broke National Record in Tokyo But Wasn't Happy
                    </h4>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="imgbox">
                      <img src="https://images.news18.com/ibnlive/uploads/2022/08/sports-84-16598829693x2.png?impolicy=website&width=150&height=100" />
                    </div>
                    <h4 className="text">
                      EXCLUSIVE - 'Felt Like the Worst Race of My Life': Avinash
                      Sable Broke National Record in Tokyo But Wasn't Happy
                    </h4>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
      <style jsx>{`
        .medalHopeWrapper {
          font-weight: 400;
          background-color: #f6f6f6;
          border: 1px solid #c1c1c1;
          padding: 0 0 20px 0;
          margin-bottom: 30px;
        }
        .medalHopeHeadingWrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
        }
        .medalHopeHeadingInner {
          text-align: left;
          margin: 0 auto 0 25%;
          max-width: 45%;
          padding-top: 11px;
        }
        .medalHopeHeadingInner .heading-1 {
          color: red;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3.7px;
          line-height: 12px;
        }
        .medalHopeHeadingInner .heading-2 {
          color: #001d42;
          font-size: 28px;
          font-weight: 600;
          border-bottom: 2px solid #d2d2d2;
          margin-bottom: 7px;
          padding: 0 0 6px;
          line-height: 33px;
          text-transform: uppercase;
        }
        .medalHopeHeadingInner .heading-3 {
          color: #636363;
          font-weight: 400;
          font-size: 12px;
          margin-bottom: 20px;
          line-height: 22px;
          margin: 20px 0 0;
        }
        .medalHopeFilterWrap {
          display: flex;
          align-items: center;
          margin: 10px 0 0;
        }
        .medalHopeFilter {
          height: 28px;
          display: flex;
          background: #fff;
          border: 1px solid #ddd;
          background-color: #f6f6f6;
          color: #fff;
        }
        .medalHopeFilter .MH_FilterDrop {
          width: 180px;
          position: relative;
        }
        .medalHopeFilter .MH_FilterDrop:after {
          content: "";
          position: absolute;
          width: 10px;
          height: 14px;
          display: block;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/dropdown-icon.png);
          background-repeat: no-repeat;
          background-position: right 1px center;
          filter: invert(1);
          top: 6px;
          right: 8px;
        }
        .medalHopeFilter .MH_FilterDrop .MH_FilterVal {
          height: 100%;
          padding-left: 10px;
          font-size: 12px;
          text-transform: uppercase;
          text-align: left;
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #333;
          font-weight: 700;
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
        .inactive {
          opacity: 0.3;
          mix-blend-mode: luminosity;
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
          margin-left: 60px;
        }
        .medalHopecurrentGame .gamesIcon {
          margin-right: 7px;
          transform: scale(0.8);
          overflow: hidden;
        }
        .medalHopecurrentGame .gamesIcon li {
          margin: 0;
          background-color: #ef4e37;
        }
        .medalHopecurrentGame span {
          color: #000;
          text-transform: uppercase;
          font-weight: 400;
          font-size: 13px;
        }
        .medals_row {
          margin: 10px auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .medalHopeHeader {
          border: 1px solid #d1d1d1;
          background-image: url(/images/olympics/imhdesk.png);
          background-repeat: no-repeat;
          background-size: cover;
        }

        .olymimhsldr {
          position: relative;
          margin-top: 20px;
          width: 100%;
        }
        .olymimhsldr .glide__track {
          overflow: hidden;
          position: relative;
          margin-right: 1px;
        }
        .olymimhsldr .glide__slides {
          padding: 5px 0;
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .olymimhsldr button.glide__arrow {
          position: absolute;
          top: 30%;
          transform: translateY(-50%);
          border: 0;
          font-size: 0;
          cursor: pointer;
          background: 0 0;
          width: 20px;
          height: 20px;
        }
        .olymimhsldr button.glide__arrow.glide__arrow--left {
          left: 17px;
        }
        .olymimhsldr button.glide__arrow:after {
          border-right: 3px solid #000;
          border-top: 3px solid #000;
          width: 9px;
          height: 9px;
          transform: rotate(45deg);
          top: 62px;
          right: 10px;
          content: "";
          position: absolute;
        }
        .olymimhsldr button.glide__arrow.glide__arrow--left:after {
          transform: rotate(-138deg);
          right: 14px !important;
        }
        .olymimhsldr button.glide__arrow.glide__arrow--right {
          right: 14 !important;
          border-radius: 5px 0 0 5px;
        }
        .olymimhsldr .imageOuter {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          border-radius: 50%;
          border: 1px solid #707070;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
          background: #fff;
        }
        .olymimhsldr .imageOuter .imageInnter {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
        }
        .olymimhsldr .imageOuter .imageInnter img {
          width: 100%;
          height: 100%;
        }
        .olymimhsldr .cursor-pointer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          border-right: 1px dashed #707070;
        }
        .olymimhsldr .heading-1 {
          font-size: 15px;
          line-height: 20px;
          font-weight: 700;
        }
        .olymimhsldr .subHead {
          font-size: 12px;
          line-height: 18px;
          color: #464646;
          font-weight: 400;
        }
        .olymimhsldr .glide__arrow--left:before {
          content: "";
          width: 30px;
          height: 43px;
          background-color: #fff;
          box-shadow: 0 4px 4px 0 #0000001a;
          display: block;
          left: -17px;
          position: absolute;
          top: 46px;
          border-radius: 0 6px 6px 0;
        }
        .olymimhsldr .glide__arrow--right:before {
          content: "";
          width: 30px;
          height: 43px;
          background-color: #fff;
          box-shadow: 0 4px 4px 0 #0000001a;
          display: block;
          right: -1px;
          position: absolute;
          top: 46px;
          border-radius: 6px 0 0 6px;
        }

        .olymhpstry {
          padding: 0 20px;
          margin-top: 20px;
        }
        .olymhpstryWrapper {
          padding: 20px;
          background: #fff;
          box-shadow: 0 0 5px 0 #00000026;
        }
        .olymhpstryInner {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .olymhpstryInner .storyLeft {
          width: 100%;
          display: flex;
          gap: 39px;
        }
        .olymhpstryInner .storyLeft li a {
          display: flex;
          flex-direction: column;
        }
        .olymhpstryInner .storyLeft li .imgbox {
          width: 181px;
          height: 136px;
          flex-shrink: 0;
        }
        .olymhpstryInner .storyLeft li .imgbox img {
          display: block;
          width: 100%;
          height: 100%;
        }
        .olymhpstryInner .storyLeft li .text {
          font-size: 13px;
          color: #111;
          line-height: 20px;
          font-weight: 400;
          width: 100%;
          margin-top: 10px;
        }
        .olymhpstryInner .storyLeft li:last-child {
          margin: 0;
        }
        .imhnum {
          display: flex;
          justify-content: center;
          text-align: center;
        }
        .imhnum span {
          width: 18px;
          margin-right: 20px;
          color: #a6a6a6;
        }
        .imhnum span.active {
          width: 18px;
          margin-right: 20px;
          color: #000;
        }
        .imhnum span:last-child {
          margin-right: 0px;
        }
      `}</style>
    </>
  );
}
