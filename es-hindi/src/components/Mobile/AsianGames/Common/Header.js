import Glide from "@glidejs/glide";
import { AsianGameLogo } from "components/Desktop/AsianGames/Common/AsianGamesConstant";
import React, { useEffect } from "react";

const AsianGamesMobileHeader = () => {
  // const [selectedDateId, setSelectedDateId] = useState(1);
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
      <div id="top-widget-calender-section">
        <div className="games2020Wraper">
          <div className="gamesDateWraper">
            <div className="gamesDateInner">
              <div className="games2020Logo">
                <AsianGameLogo />
              </div>
              {/* <div className="partnersldr_otr">
                <p className="pp_sldr_txt">Presenting Partner</p>
                <div className="partnersSlider">
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
            {/* <ul className="DateScroll">
              {headerDateArray.map((date) => (
                <li
                  key={date.id}
                  className={date.id === selectedDateId ? "active" : ""}
                  data-id={date.id}
                  onClick={() => setSelectedDateId(date.id)}
                >
                  <span>{date.date}</span> <span>{date.month}</span>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
      <style jsx>{`
        /*start games 2020 section*/
        .gamesDateWraper {
          background: #173153;
        }
        .gamesDateInner {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          padding: 0 4px 0 10px;
        }
        .games2020Logo {
          margin-right: auto;
          margin-top: 3px;
        }
        .games2020Logo img {
          display: block;
        }
        .gamesIconWrapper {
          background: #001d42;
          padding: 10px;
        }
        ul.DateScroll {
          display: flex;
          align-items: flex-end;
          overflow-x: scroll;
          white-space: nowrap;
          padding: 0 10px;
        }
        ul.DateScroll li {
          width: 40px;
          background: #e0e0e0;
          cursor: pointer;
          text-transform: uppercase;
          margin-right: 2px;
          text-align: center;
          padding: 5px 0px 8px;
          color: #747474;
          position: relative;
          flex-shrink: 0;
        }
        ul.DateScroll li::after {
          content: "";
          width: 100%;
          height: 5px;
          background: #747474;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        ul.DateScroll li:last-child {
          margin-right: 0;
        }
        ul.DateScroll li span {
          display: block;
        }
        ul.DateScroll li span:first-child {
          font-size: 18px;
          line-height: 18px;
        }
        ul.DateScroll li span:last-child {
          font-size: 12px;
        }
        ul.DateScroll li.active {
          width: 50px;
          background: #fff;
        }
        ul.DateScroll li.active span {
          color: #e1261d;
        }
        ul.DateScroll li.active::after {
          background: #e1261d;
        }
        ul.DateScroll li.active span:first-child {
          font-size: 22px;
          font-weight: 600;
          line-height: 20px;
        }
        ul.DateScroll li.active span:last-child {
          font-size: 14px;
        }
        .topIcon_1 {
          display: grid;
          grid-template-columns: 35px 35px 35px 35px 35px 35px 35px 35px;
          flex-wrap: wrap;
          justify-content: space-between;
          row-gap: 9px;
          margin-bottom: 9px;
        }
        .indiaEvent {
          width: 175px;
          background: #fff;
          display: flex;
          margin-left: auto;
          padding: 2px 2px 2px 7px;
          align-items: center;
          border-radius: 4px;
          justify-content: space-between;
          margin: 0 auto;
        }
        .indiaEvent .heading {
          color: #e1261d;
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .indiaEvent .onoff {
          display: flex;
          background: #d9d9d9;
          border-radius: 4px;
          overflow: hidden;
          margin-left: 9px;
        }
        .indiaEvent .onoff span {
          display: flex;
          font-size: 11px;
          text-transform: uppercase;
          color: #626262;
          padding: 2px 5px;
          width: 36px;
          min-height: 20px;
          text-align: center;
          cursor: pointer;
          align-items: center;
          justify-content: center;
        }
        .indiaEvent .onoff span.active {
          background: #1c7e0a;
          color: #fff;
          font-size: 13px;
        }
        .gamesDateInner .indiaEvent {
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default AsianGamesMobileHeader;
