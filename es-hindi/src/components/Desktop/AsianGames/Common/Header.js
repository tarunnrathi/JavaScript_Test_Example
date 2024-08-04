import React, { useEffect, useState } from "react";
import { AsianGameLogo, /* headerDateArray */ } from "./AsianGamesConstant";
import Glide from "@glidejs/glide";

const AsianGamesHeader = () => {
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    if (document.querySelector(".partnersSlider")) {
      new Glide(document.querySelector(".partnersSlider"), {
        type: "carousel",
        autoplay: 2000,
        perView: 1,
        slidesToScroll: 1,
      }).mount();
    }
  }, []);

  return (
    <>
      <div className="games2020Wraper">
        <div className="games2020Container">
          <div className="gamesDateWraper">
            <div className="games2020Logo">
              <AsianGameLogo />
            </div>
            {/* <ul>
              {headerDateArray.map((data) => (
                <li
                  className={data.id === selectedId ? "active" : ""}
                  key={data.id}
                  onClick={() => setSelectedId(data.id)}
                >
                  <span>{data.date}</span> <span>{data.month}</span>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
      <style jsx>{`
        // top widget
        .games2020Wraper {
          background: -webkit-linear-gradient(0, #001d42 110px, #173153 70px);
          background: -o-linear-gradient(0, #001d42 110px, #173153 70px);
          background: -moz-linear-gradient(0, #001d42 110px, #173153 70px);
          background: linear-gradient(0, #001d42 110px, #173153 70px);
          display: flex;
          justify-content: center;
          font-family: "Mukta", sans-serif;
          font-weight: normal;
        }
        .games2020Container {
          width: 1244px;
        }
        .gamesDateWraper {
          display: flex;
          height: 70px;
          justify-content: space-between;
        }
        .games2020Logo {
          margin-right: 30px;
          display: flex;
          align-items: center;
          padding-top: 6px;
        }
        .games2020Logo img {
          display: block;
        }
        .gamesDateWraper ul {
          display: flex;
          align-items: flex-end;
        }
        .gamesDateWraper ul li {
          width: 44px;
          background: #e0e0e0;
          cursor: pointer;
          text-transform: uppercase;
          margin-right: 2px;
          text-align: center;
          padding: 7px 0 12px;
          color: #747474;
          position: relative;
          height: 55px;
          line-height: 18px;
        }
        .gamesDateWraper ul li::after {
          content: "";
          width: 100%;
          height: 5px;
          background: #747474;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .gamesDateWraper ul li:last-child {
          margin-right: 0;
        }
        .gamesDateWraper ul li span {
          display: block;
        }
        .gamesDateWraper ul li span:first-child {
          font-size: 18px;
        }
        .gamesDateWraper ul li span:last-child {
          font-size: 12px;
        }
        .gamesDateWraper ul li.active {
          width: 54px;
          height: 60px;
          background: #fff;
          line-height: 20px;
          padding-top: 10px;
        }
        .gamesDateWraper ul li.active span {
          color: #e1261d;
        }
        .gamesDateWraper ul li.active::after {
          background: #e1261d;
        }
        .gamesDateWraper ul li.active span:first-child {
          font-size: 22px;
          font-weight: 600;
        }
        .gamesDateWraper ul li.active span:last-child {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default AsianGamesHeader;
