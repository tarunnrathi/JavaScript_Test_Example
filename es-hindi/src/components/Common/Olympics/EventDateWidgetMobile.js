import { useState } from "react";
import { olympics_year, URL, olympics_id, dateArray } from "api/Constant";
import { getCricketData } from "api/global/Common";

const EventDateWidgetMobile = (props) => {
  const [eventDate, setEventDate] = useState(dateArray[1]);
  const [isIndiaEvents, setIndiaEvents] = useState(true);
  const [events, setEvents] = useState(
    props?.lomp_sdl_with_date?.events?.length > 0
      ? props?.lomp_sdl_with_date?.events
      : []
  );
  const [toggleDateDropDown, setToggleDateDropDown] = useState(false);
  const loadEvents = (date = "") => {
    const newDate =
      new Date(date).toLocaleDateString("en-US", { day: "2-digit" }) +
      "-" +
      new Date(date).toLocaleDateString("en-US", { month: "2-digit" }) +
      "-" +
      new Date(date).getFullYear();
    getCricketData(
      `${olympics_id}/${URL.GET_OLYMPICS_SCHEDULE_WITH_DATE}/${newDate}`,
      "en"
    )
      .then((res) => {
        setEvents(res?.events?.length > 0 ? res?.events : []);
        setEventDate(date);
        setToggleDateDropDown(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="twrapr" id="top-widget-calender-section">
        <div className="olymwrapr">
          <div className="olymlhs">
            <div className="firesign">
              <img
                src="/images/olympics/mbolympfire.svg"
                className="fire"
                alt="mbolympfire"
              />
              <img
                src="/images/olympics/mbolympring.svg"
                className="ring"
                alt="mbolympring"
              />
            </div>
            <div className="olymttl">
              <h1>
                PARIS OLYMPICS <br></br> {olympics_year}
              </h1>
              <span>26 July - 11 Aug {olympics_year}</span>
            </div>
          </div>
          <div className="olymrhs">
            <img
              className="eiflimg"
              src="/images/olympics/eiffeltower.svg"
              width="90px"
              height="143px"
              alt="eiffeltower"
            />
            <div className="mbsportwrap">
              <div className="mbsportsec">
                <span className="evntname">Olympics Daily Events</span>
                <div className="tsdropdnwrp">
                  <div className="tsdropdn">
                    <div
                      className="tsdropdnval"
                      onClick={() => {
                        setToggleDateDropDown(!toggleDateDropDown);
                      }}
                    >
                      {new Date(eventDate).toLocaleString("en-IN", {
                        month: "long",
                      })}{" "}
                      &nbsp;
                      {new Date(eventDate).toLocaleString("en-US", {
                        day: "2-digit",
                      })}
                      ,{new Date(eventDate).getFullYear()}
                    </div>
                    <ul
                      className="tsdropdnBox"
                      style={
                        toggleDateDropDown
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {dateArray?.map((item, index) => {
                        const newDate = new Date(item);
                        const months = newDate.toLocaleString("en-IN", {
                          month: "long",
                        });
                        const day = newDate.toLocaleString("en-US", {
                          day: "2-digit",
                        });
                        const year = newDate.getFullYear();
                        return (
                          <li
                            onClick={() => loadEvents(item)}
                            key={"date_" + index}
                          >
                            <a data-value="Archery">
                              {months} {day}, {year}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="icon_outer">
                <ul className="gamesIcon day-1" data-id="1">
                  {events.map((item, index) => {
                    return (
                      <li
                        data-day=""
                        data-sports="3x3_Basketball"
                        className={
                          item?.sportsName +
                          (item?.indianEvent === isIndiaEvents &&
                          item?.indianEvent === true
                            ? " active"
                            : "")
                        }
                        key={"lomp_sdl_with_date_" + index}
                      >
                        <a
                          href={`/sports/olympics/schedule/#${item?.sportId}`}
                        ></a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="dtmonth">
                <div className="rhtp">
                  <span
                    onClick={() => setIndiaEvents(true)}
                    style={{ cursor: "pointer" }}
                  >
                    INDIA EVENTS
                  </span>
                  <span
                    onClick={() => setIndiaEvents(false)}
                    style={{ cursor: "pointer" }}
                  >
                    ALL EVENTS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .twrapr {
          padding: 27px 0;
          position: relative;
          margin: auto;
        }
        .twrapr:after {
          content: "";
          width: 100%;
          height: 10px;
          position: absolute;
          z-index: -1;
          background: #00000012;
        }
        .olymwrapr {
          background-image: url(/images/olympics/mbtwbnnr.svg);
          font-weight: 400;
          background-size: cover;
          border-bottom: 3px solid #2a2a2a;
          max-height: 204px;
        }
        .olymlhs {
          display: flex;
          align-items: flex-start;
          position: relative;
          padding: 10px;
        }
        .olymlhs .eiflimg {
          position: absolute;
          right: 0;
        }
        .olymttl {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          padding-right: 10px;
          color: #fff;
          width: 100%;
        }
        .olymttl h1 {
          color: #fff;
          text-align: center;
          text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
          font-size: 30px;
          font-weight: 800;
          line-height: 30px;
        }

        .olymttl span {
          font-weight: normal;
          font-size: 12px;
          text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
          color: #edf6ff;
        }
        .olymrhs:after {
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 0;
          left: 0;
          top: 0;
          background: linear-gradient(
            179deg,
            rgba(0, 0, 0, 0.2) 58.29%,
            #000 99.24%
          );
        }
        .olymrhs {
          display: flex;
          flex: auto;
          justify-content: flex-end;
          padding: 6px 10px;
          gap: 5px;
          position: relative;
        }
        .olymrhs > ul {
          display: flex;
          align-items: center;
        }
        .olymrhs > ul li {
          cursor: pointer;
          margin-right: 24px;
          text-align: center;
          color: #fff;
          position: relative;
        }
        .olymrhs > ul li:last-child {
          margin-right: 0;
        }
        .olymrhs > ul li span {
          display: block;
          font-size: 13px;
          font-weight: 400;
          line-height: 19px;
        }
        .olymrhs > ul li.active {
          width: 24px;
          height: 40px;
          padding-top: 7px;
        }
        .olymrhs > ul li.active::after {
          background: #0a2036;
          content: "";
          width: 100%;
          height: 3px;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .olymrhs > ul li.active span {
          font-size: 18px;
          font-weight: 700;
          line-height: 27px;
          text-shadow: 0 4px 4px rgb(0 0 0 / 0.25);
        }
        .dtmonth {
          display: flex;
          width: 100%;
          gap: 10px;
          color: #fff;
          position: relative;
          margin: 4px 0 4px;
        }
        .dtmonth div {
          width: 50%;
          position: relative;
        }
        .dtmonth .rhtp {
          position: absolute;
          top: -5px;
          right: 0;
          left: 0;
          width: unset;
          font-size: 11px;
          line-height: 13px;
          font-weight: 700;
          display: flex;
          justify-content: center;
        }
        .dtmonth .rhtp span {
          margin: 0 0 0 20px;
        }
        .dtmonth .rhtp span:first-child {
          margin-left: 0;
        }
        .dtmonth .rhtp span:before {
          content: "";
          width: 10px;
          height: 10px;
          background-color: #0a2036;
          border-radius: 100%;
          display: inline-block;
          margin: -2px 7px 0 0;
          vertical-align: middle;
        }
        .dtmonth .rhtp span:first-child:before {
          background-color: #ef4e37;
        }
        .monthlh:after {
          content: "";
          position: absolute;
          left: 10%;
          bottom: -2px;
          height: 3px;
          width: 90%;
          background-color: #00000012;
        }
        .monthrg:after {
          content: "";
          position: absolute;
          left: 18%;
          bottom: -2px;
          height: 3px;
          width: 82%;
          background-color: #00000012;
        }
        /*.icon_outer{display:flex;justify-content:flex-start;width:100%}*/

        .icon_outer {
          min-height: 52px;
        }
        .gamesIcon {
          display: flex;
          overflow-x: scroll;
          white-space: nowrap;
        }
        .gamesIcon li {
          width: 40px;
          height: 40px;
          background-color: #0a2036;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/olympic-d-white-icon.png);
          margin: 5px 5px 5px 0;
          border-radius: 50%;
          transform: scale(0.85);
        }
        .gamesIcon li a {
          display: block;
          width: 40px;
          height: 40px;
        }
        .gamesIcon li.Archery {
          background-position: -57px 0;
        }
        .gamesIcon li.Artistic_Gymnastics {
          background-position: -114px 0;
        }
        .gamesIcon li.Artistic_Swimming {
          background-position: -171px 0;
        }
        .gamesIcon li.Athletics {
          background-position: -228px 0;
        }
        .gamesIcon li.Badminton {
          background-position: -283px 0;
        }
        .gamesIcon li.Baseball_Softball {
          background-position: -342px 0;
        }
        .gamesIcon li.Basketball {
          background-position: -399px 0;
        }
        .gamesIcon li.Beach_Volleyball {
          background-position: -456px 0;
        }
        .gamesIcon li.Boxing {
          background-position: -509px 0;
        }
        .gamesIcon li.Canoe_Slalom {
          background-position: -566px 0;
        }
        .gamesIcon li.Canoe_Sprint {
          background-position: -627px 0;
        }
        .gamesIcon li.Cycling_BMX_Freestyle {
          background-position: -679px 0;
        }
        .gamesIcon li.Cycling_BMX_Racing {
          background-position: -735px 0;
        }
        .gamesIcon li.Cycling_Mountain_Bike {
          background-position: -795px 0;
        }
        .gamesIcon li.Cycling_Road {
          background-position: -852px 0;
        }
        .gamesIcon li.Cycling_Track {
          background-position: -907px 0;
        }
        .gamesIcon li.Diving {
          background-position: -963px 0;
        }
        .gamesIcon li.Equestrian {
          background-position: -1022px 0;
        }
        .gamesIcon li.Fencing {
          background-position: -1080px 0;
        }
        .gamesIcon li.Football {
          background-position: -1135px 0;
        }
        .gamesIcon li.Golf {
          background-position: -1190px 0;
        }
        .gamesIcon li.Handball {
          background-position: -1245px 0;
        }
        .gamesIcon li.Hockey {
          background-position: 0 -54px;
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
        /*#top-widget-calender-section ul.gamesIcon {
          display: none;
      }*/
        .firesign {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 6px;
        }
        .firesign img {
          transform: scale(1.2);
        }
        .firesign .fire {
          width: 34px;
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        }
        .firesign .ring {
          width: 43px;
          filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.35));
          margin-top: -4px;
        }
        .evntname {
          font-size: 11px;
          color: #fff;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
        }

        .tsdropdnwrpWrap {
          display: flex;
          align-items: center;
          padding: 0 10px;
        }
        .tsdropdnwrp {
          height: 24px;
          border-radius: 4px;
          width: 125px;
          display: flex;
          background: #fff;
          border: 1px solid #ddd;
          background-color: #f6f6f6;
          color: #fff;
        }
        .tsdropdnwrp .tsdropdn {
          width: 180px;
          position: relative;
          background-color: #fbfbfb;
        }
        .tsdropdnwrp .tsdropdn:after {
          content: "";
          position: absolute;
          width: 10px;
          height: 14px;
          display: block;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/dropdown-icon.png);
          background-repeat: no-repeat;
          background-position: right 1px center;
          filter: invert(1);
          top: 3px;
          right: 4px;
        }
        .tsdropdnwrp .tsdropdn .tsdropdnval {
          height: 100%;
          padding-left: 10px;
          font-size: 11px;
          text-transform: uppercase;
          text-align: left;
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #333;
          font-weight: 700;
        }
        .tsdropdnBox {
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
        .tsdropdnBox.active {
          display: block;
        }
        .tsdropdnBox li:last-child {
          margin-bottom: 0;
        }
        .tsdropdnBox li a {
          position: relative;
          color: #001d42;
          font-size: 11px;
          text-transform: uppercase;
          text-align: left;
          display: block;
          padding: 7px 7px 7px 23px;
        }
        .tsdropdnBox li a:hover {
          background: #e1261d;
          color: #fff;
        }
        .tsdropdnBox li a::before {
          content: "-";
          position: absolute;
          left: 10px;
          font-size: 18px;
          top: 50%;
          transform: translate(0, -50%);
        }
        .tsdropdnBox li.active {
          background: #e1261d;
        }
        .tsdropdnBox li.active a {
          color: #fff;
        }
        .mbsportsec {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .mbsportwrap,
        .eiflimg {
          position: relative;
          z-index: 9;
        }
        .mbsportwrap {
          display: flex;
          flex-direction: column;
          width: 80%;
        }
        .eiflimg {
          position: absolute;
          left: -14px;
          top: -23px;
        }
        *::-webkit-scrollbar {
          width: 2px;
          height: 2px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *:hover::-webkit-scrollbar-thumb {
          background: #ddd;
          border: 2px solid #a8a8a8;
        }
      `}</style>
    </>
  );
};
export default EventDateWidgetMobile;
