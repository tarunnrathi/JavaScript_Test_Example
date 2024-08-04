import { useState } from "react";
import { olympics_year, URL, olympics_id, dateArray } from "api/Constant";
import { getCricketData } from "api/global/Common";
const EventDateWidgetDesktop = (props) => {
    const [eventDate, setEventDate] = useState(props?.date);
    const [isIndiaEvents, setIndiaEvents] = useState(true);
    const [events, setEvents] = useState(props?.lomp_sdl_with_date?.events?.length > 0 ? props?.lomp_sdl_with_date?.events : []);
    const loadEvents = (date = "") => {
        const newDate = (new Date(date)).toLocaleDateString("en-US", { day: "2-digit" }) + "-" + (new Date(date)).toLocaleDateString("en-US", { month: "2-digit" }) + "-" + (new Date(date)).getFullYear();
        getCricketData(
            `${olympics_id}/${URL.GET_OLYMPICS_SCHEDULE_WITH_DATE}/${newDate}`, "en"
        ).then((res) => {
            setEvents(res?.events?.length > 0 ? res?.events : []);
            setEventDate((new Date(date)).getDate().toString());
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>
            <div className="twrapr" id="top-widget-calender-section">
                <div className="olymwrapr">
                    <div className="olymlhs">
                        <img src="/images/olympics/olympicsgn.svg" />
                        <div className="olymttl">
                            <span>PARIS OLYMPICS {olympics_year}</span>
                            <span>26 July - 11 Aug {olympics_year}</span>
                        </div>
                        <img className="eiflimg" src="/images/olympics/eiffeltower.svg" />
                    </div>
                    <div className="olymrhs">
                        <div className="dtmonth">
                            <div className="monthlh"><span>July</span></div>
                            <div className="monthrg"><span>August</span></div>
                            <div className="rhtp">
                                <span onClick={() => setIndiaEvents(true)} style={{ cursor: "pointer" }}>INDIA EVENTS</span>
                                <span onClick={() => setIndiaEvents(false)} style={{ cursor: "pointer" }}>ALL EVENTS</span>
                            </div>
                        </div>
                        <ul>
                            {dateArray.map((item, index) => {
                                const newDate = new Date(item).getDate().toString();
                                return (
                                    <li
                                        key={"date_" + index}
                                        className={newDate === eventDate ? "active" : ""}
                                        onClick={() => loadEvents(item)}
                                    >
                                        <span>{newDate}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="icon_outer">
                            <ul className="gamesIcon day-1" data-id="1">
                                {events.map((item, index) => {
                                    return (
                                        <li data-day=""
                                            data-sports={item?.sportsName}
                                            className={item?.sportsName + (((item?.indianEvent === isIndiaEvents) && item?.indianEvent === true) ? " active" : "")}
                                            key={"lomp_sdl_with_date_" + index}
                                        >
                                            <a href={`/sports/olympics/schedule/#${item?.sportId}`}></a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
            .twrapr{
                padding: 27px 0;
                position: relative;
                max-width: 1244px;
                margin: auto;
            }
            .twrapr:after {
                content: "";
                width: 100%;
                height: 20px;
                position: absolute;
                z-index: -1;
                background: #00000012;
            }
            .olymwrapr {
                background-image: url(/images/olympics/twbg.svg);
                display: flex;
                justify-content: space-between;
                font-weight: normal;
                background-size: cover;
                height: 135px;
                border-bottom: 3px solid #2A2A2A;
                padding: 0 20px;
            }
            
            .olymlhs{
                margin-right: 15px;
                display: flex;
                align-items: center;
                padding-top: 6px;
                padding-right: 70px;
                position: relative;
            }
            .olymlhs .eiflimg{  
                position: absolute;
                right: -20px;
            }
            .olymttl {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
                margin-left: 10px;
                color: #fff;
                font-family: "Montserrat", sans-serif;
            }
            .olymttl span {
                font-weight: 800;
                font-size: 26px;
            }
            .olymttl span {
                font-weight: 500;
                font-size: 20px;
            }

            .olymrhs {
                display: flex;
                flex: auto;
                flex-direction: column;
                justify-content: center;
                padding: 11px 0;
                gap: 5px;
                    width: 60%;
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
                background: #0A2036;
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
                text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
            }
            .dtmonth {
                display: flex;
                width: 100%;
                gap: 10px;
                color: #fff;
                margin-top: 10px;
                position: relative;
            }
            .dtmonth div {
                width: 50%;
                position: relative;
            }
            .dtmonth .rhtp {
            position: absolute;
            top: 2px;
            right: 0;
            width: unset;
            font-size: 11px;
            line-height: 13px;
            font-weight: 700;
            display: flex;
        }
        .dtmonth .rhtp span {
            margin: 0 0 0 20px;
        }
        .dtmonth .rhtp span:before {
            content: "";
            width: 10px;
            height: 10px;
            background-color: #0A2036;
            border-radius: 100%;
            display: inline-block;
            margin: -2px 7px 0 0;
            vertical-align: middle;
        }
        .dtmonth .rhtp span:first-child:before { background-color: #EF4E37;}
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
                left: 16%;
                bottom: -2px;
                height: 3px;
                width: 82%;
                background-color: #00000012;
            }
            
            .icon_outer{display: flex;justify-content: flex-start; width: 100%;    margin-top: -5px;}
            .icon_outer{min-height:52px;}
            
            .gamesIcon {
            display: flex;
            overflow-x: scroll;
            white-space: nowrap;
            }
            .gamesIcon li {
            width: 40px;
            height: 40px;
            background-color: #0A2036;
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
            .gamesIcon li.Hockey {
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
                background-color: #EF4E37;
            }
            .olympics-wrapper{width:100%;display:flex;max-width:1244px;margin:auto;margin-bottom:30px;margin-top:10px;margin-top:10px}
            .olympics-left{width:924px;margin-right:20px}
            .olympics-right{width:300px}
            .page_title{color:#e1261d;font-family:"Oswald";line-height:27px;margin-bottom:5px;text-transform:uppercase;font-size:22px}
            .page_title span{color:#202020;font-weight:400}
            @media (max-width:768px){
            .olympics-wrapper {max-width: 100%;display: block;}
            .olympics-left, .olympics-right {width: 100%; margin: 0;}          
            }
             *::-webkit-scrollbar {
                    width: 2px;
                    height:2px;
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
    )
}
export default EventDateWidgetDesktop;