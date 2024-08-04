import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import PageNavigations from "components/Common/Olympics/PageNavigations";
import { olympics_year, olympics_id, URL } from "api/Constant";
import EventDateWidgetDesktop from "components/Common/Olympics/EventDateWidgetDesktop";
import { Fragment, useState } from "react";
import { getCricketData } from "api/global/Common";
import MedalTally from "components/Common/Olympics/MedalTally";
import EventDateWidgetMobile from "components/Common/Olympics/EventDateWidgetMobile";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import { scrollToTarget } from "includes/article.util";

// const olympics_Event = [
//     { name: 'Archery', sportId: 17 },
//     { name: 'Aquatics', sportId: 16 },
//     { name: 'Athletics', sportId: 18 },
//     { name: 'Badminton', sportId: 6 },
//     { name: 'Basketball', sportId: 20 },
//     { name: 'Boxing', sportId: 22 },
//     { name: 'Breaking', sportId: 73 },
//     { name: 'Canoeing', sportId: 23 },
//     { name: 'Cycling', sportId: 25 },
//     { name: 'Equestrian', sportId: 26 },
//     { name: 'Fencing', sportId: 27 },
//     { name: 'Field hockey', sportId: 9 },
//     { name: 'Football', sportId: 2 },
//     { name: 'Golf', sportId: 13 },
//     { name: 'Gymnastics', sportId: 29 },
//     { name: 'Handball', sportId: 30 },
//     { name: 'Judo', sportId: 33 },
//     { name: 'Modern pentathlon', sportId: 35 },
//     { name: 'Roller sports', sportId: 64 },
//     { name: 'Rowing', sportId: 39 },
//     { name: 'Rugby Sevens', sportId: 40 },
//     { name: 'Sailing', sportId: 41 },
//     { name: 'Shooting', sportId: 42 },
//     { name: 'Sport Climbing', sportId: 66 },
//     { name: 'Surfing', sportId: 67 },
//     { name: 'Table tennis', sportId: 44 },
//     { name: 'Taekwondo', sportId: 45 },
//     { name: 'Tennis', sportId: 7 },
//     { name: 'Triathlon', sportId: 46 },
//     { name: 'Volleyball', sportId: 48 },
//     { name: 'Weightlifting', sportId: 50 },
//     { name: 'Wrestling', sportId: 51 },

// ]
const dateSelected = {};

const Schedule = (props) => {
  const {
    breadCrumbArray,
    lomp_sdl_with_date,
    date,
    schedule_All,
    medalTally,
    pageAds,
    isMobile,
  } = props?.data;
  const allSchedule = schedule_All;
  // const [dateSelect, setDateSelect] = useState("");
  const [dropDownIndex, setDropDownIndex] = useState();
  const [dropDown, setDropDown] = useState(true);
  const event = allSchedule.map((item) => {
    return item.events;
  });

  const [ent, setEnt] = useState(event.map((even) => even.filter((item) => even[0].date === item.date)));

  const dateChange = (tempDate, index, sport_id) => {
    const newTempDate =
      new Date(tempDate).toLocaleDateString("en-US", { day: "2-digit" }) +
      "-" +
      new Date(tempDate).toLocaleDateString("en-US", { month: "2-digit" }) +
      "-" +
      new Date(tempDate).getFullYear();
    getCricketData(
      `${olympics_id}/${URL.GET_OLYMPICS_SCHEDULE}/${newTempDate}/${sport_id}`,
      "en"
    )
      .then((res) => {
        const tempdata = ent;
        tempdata[index] = res?.events;
        setEnt(() => [...(tempdata || [])]);
        // setDateSelect(tempDate);
        const obj = {
          sportId: sport_id,
          index: index,
          date: newTempDate,
        };
        dateSelected[sport_id] = obj;
        // console.log(dateSelected);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {isMobile ? (
        <EventDateWidgetMobile
          lomp_sdl_with_date={lomp_sdl_with_date}
          date={date}
        />
      ) : (
        <EventDateWidgetDesktop
          lomp_sdl_with_date={lomp_sdl_with_date}
          date={date}
        />
      )}
      <div className="olympics-wrapper">
        <div className="olympics-left">
          {isMobile && (
            <div className="add">
              <div className="addinner-box">
                <NewSiteAd
                  slotId="Mobile_ATF_320_ad"
                  width={336}
                  height={280}
                  adUnit={pageAds?.ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280],
                    [250, 250],
                  ]}
                  lazyload={true}
                ></NewSiteAd>
              </div>
            </div>
          )}
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />

          <PageNavigations title="शेड्यूल" />

          {allSchedule?.map((item, index) => {
            let dateList = new Set(item?.events?.map((item) => item?.date));
            dateList = [...dateList];
            return (
              <Fragment key={"schedule_All_" + index}>
                <div
                  className="jumpolypschedule_box"
                  id={`${item?.sportId}`}
                ></div>
                <div className="schdlheading">
                  <div className="medalHopeHeadingInner olpschdl">
                    {index === 0 ? (
                      <h1 className="heading-1">
                        Paris olympics {olympics_year} Schedule
                      </h1>
                    ) : (
                      <h3 className="heading-1">
                        Paris olympics {olympics_year} Schedule
                      </h3>
                    )}

                    <div className="schldhead">
                      <ul className="gamesIcon">
                        <li className={item?.sportsName}></li>
                      </ul>
                      <h2 className="heading-2">{item?.sportsName}</h2>
                    </div>
                  </div>
                  <div className="scheduledrp">
                    <div className="scheduledn">
                      <div
                        className="schedulednval"
                        onClick={() => {
                          if (dropDownIndex === index) {
                            setDropDownIndex("");
                          } else {
                            setDropDownIndex(index);
                          }
                          setDropDown(true);
                        }}
                      >
                        Select Sport
                      </div>
                      <ul
                        className="schedulednBox"
                        style={
                          dropDownIndex === index && dropDown
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        {allSchedule?.map((item, index) => {
                          return (
                            <li
                              data-value={item?.name}
                              key={"olympics_Event_" + index}
                              onClick={() => {
                                setDropDown(!dropDown);
                              }}

                            >
                              <a
                                // href={`/sports/olympics/schedule/#${item?.sportId}`}
                                href={`#${item?.sportId}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToTarget(`${item?.sportId}`);
                                }}
                              >
                                {item?.sportsName}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="olypschedule_box">
                  <ul className="olypschedule_date">
                    {dateList.map((newItem, idx) => {
                      newItem =
                        newItem.split("/")[2] +
                        "-" +
                        newItem.split("/")[1] +
                        "-" +
                        newItem.split("/")[0];
                      let getDate2 = new Date(newItem).toDateString("en-US", {
                        day: "2-digit",
                      });
                      getDate2 = getDate2.trim();

                      const filterData = dateSelected[item?.sportId] || {};
                      let getDate1 = "";
                      if (Object.keys(filterData).length > 0) {
                        const newDate =
                          filterData?.date.split("-")[2] +
                          "-" +
                          filterData?.date.split("-")[1] +
                          "-" +
                          filterData?.date.split("-")[0];
                        getDate1 = new Date(newDate).toDateString("en-US", {
                          day: "2-digit",
                        });
                        getDate1 = getDate1.trim();
                      }
                      return (
                        <li
                          className={
                            Object.keys(filterData).length > 0
                              ? getDate2 === getDate1
                                ? "active"
                                : ""
                              : idx === 0
                                ? "active"
                                : ""
                          }
                          key={"dateArray_" + idx + index}
                          data-value="active"
                          id="Aquatics-16-24072021-data"
                          onClick={() =>
                            dateChange(newItem, index, item?.sportId)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <span>{new Date(newItem).getDate()}</span>{" "}
                          <span>
                            {new Date(newItem).toLocaleDateString("en-US", {
                              month: "short",
                            })}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {/* <div className="rhtp"><span>INDIA EVENTS</span></div> */}
                  {!isMobile ? (
                    <div className="olypschedule_table" id={`${item?.sportId}`}>
                      <div className="olypschedule_table_row">
                        <table>
                          <thead>
                            <tr>
                              <th>Time</th>
                              <th>Sport</th>
                              <th>Round</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ent[index]
                              ?.slice(0, (ent[index]?.length % 2 === 0 ? ent[index]?.length / 2 : ent[index]?.length / 2 + 1))
                              .map((evnt, i) => {
                                return (
                                  <tr key={"events_" + i + index}>
                                    <td className="olypschedule_time">
                                      {evnt?.time}
                                      <span>
                                        {/* {Number(evnt?.time?.split(":")[0]) > 12
                                          ? "PM"
                                          : "AM"} */}
                                      </span>
                                    </td>
                                    <td className="olypschedule_sport">
                                      {evnt?.eventNameDisplay}
                                    </td>
                                    <td className="olypschedule_sport">
                                      {evnt?.round}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>

                      <div className="olypschedule_table_row">
                        <table>
                          <thead>
                            <tr>
                              <th>Time</th>
                              <th>Sport</th>
                              <th>Round</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ent[index]
                              ?.slice((ent[index]?.length % 2 === 0 ? ent[index]?.length / 2 : ent[index]?.length / 2 + 1))
                              .map((evnt, i) => {
                                return (
                                  <tr key={"events_" + i}>
                                    <td className="olypschedule_time">
                                      {evnt?.time}
                                      <span>
                                        {/* {Number(evnt?.time?.split(":")[0]) > 12
                                          ? "PM"
                                          : "AM"} */}
                                      </span>
                                    </td>
                                    <td className="olypschedule_sport">
                                      {evnt?.eventNameDisplay}
                                    </td>
                                    <td className="olypschedule_sport">
                                      {evnt?.round}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="olypschedule_table" id={`${item?.sportId}`}>
                      <div className="olypschedule_table_row">
                        <table>
                          <thead>
                            <tr>
                              <th>Time</th>
                              <th>Sport / Round</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ent[index].map((evnt, i) => {
                              return (
                                <tr key={"events_" + i + index}>
                                  <td className="olypschedule_time">
                                    {evnt?.time}
                                    <span>
                                      {Number(evnt?.time?.split(":")[0]) > 12
                                        ? "PM"
                                        : "AM"}
                                    </span>
                                  </td>
                                  <td className="olypschedule_sport">
                                    <p>{evnt?.eventNameDisplay}</p>
                                    <span>{evnt?.round}</span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
        <MedalTally
          medalTally={medalTally}
          pageAds={pageAds}
          pageType={"schedule"}
          isMobile={isMobile}
        />
        <div>
          {isMobile && (
            <div className="add">
              <div className="addinner-box">
                <NewSiteAd
                  slotId="Mobile_ATF_300_3"
                  width={336}
                  height={280}
                  adUnit={pageAds?.ATF_300}
                  sizes={[
                    [300, 250],
                    [336, 280],
                    [250, 250],
                  ]}
                  lazyload={true}
                ></NewSiteAd>
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
      <style jsx global>{`
             .add{text-align: center; margin: 15px 0;}
        .olympics-wrapper{width:100%;display:flex;max-width:1244px;margin:auto;margin-bottom:30px;margin-top:10px;margin-top:10px}
        .olympics-left{width:924px;margin-right:20px}
        .olympics-right{width:300px}
        .page_title{color:#e1261d;font-family:"Oswald";line-height:27px;margin-bottom:5px;text-transform:uppercase;font-size:22px}
        .page_title span{color:#202020;font-weight:400}
        @media (max-width:768px){
          .olympics-wrapper {max-width: 100%;display: block;}
          .olympics-left, .olympics-right {width: 100%; margin: 0;}          
        }

        .vspacer20{margin-top:20px}
        // .breadcum{width:100%;border-bottom:1px dotted rgb(147 147 147 / 57%);font-size:11px;color:#969696;display:flex;align-items:center;font-family:"Oswald";text-transform:uppercase;padding-bottom:4px;font-weight:400}
        // .breadcum a{margin:0 9px;color:#969696}
        // .breadcum h1{color:#001d42;font-size:11px;margin-left:8px;font-weight:400}
        // .breadcum a:first-child{margin-left:0}

        

                .olpschdl.medalHopeHeadingInner{text-align:left;max-width:100%;padding-top:11px}
               .olpschdl.medalHopeHeadingInner .heading-1{color:#f00;font-weight:400;text-transform:uppercase;font-size:12px;letter-spacing:3.6px;line-height:12px}
               .olpschdl.medalHopeHeadingInner .heading-2{color: #000; font-size: 28px; font-weight: 700;line-height: 33px;    text-transform: uppercase;padding: 0 0 6px;}
               .schldhead {display: flex;align-items: center;}
               .olypschedule_box {
               border: 1px solid #C0C0C0;
               background: #F4F4F4;
               margin-bottom: 30px;
                   padding: 30px;position: relative;
               }
               .olypschedule_box_top {
               width: 100%;
               text-align: center;
               padding-top: 15px;
               }
               .olypschedule_box_top h2 {
               letter-spacing: 8.88px;
               color: #e1261c;
               text-transform: uppercase;
               font-size: 12px;
               font-weight: normal;
               }
               .olypschedule_tilte_icon {
               letter-spacing: -2.32px;
               color: #001d42;
               font-size: 58px;
               line-height: 58px;
               font-weight: bold;
               display: flex;
               align-items: center;
               justify-content: center;
               padding: 0;
               border-bottom: 2px #d2d2d2 solid;
               width: 604px;
               margin: auto;
               text-transform: lowercase;
               }
               .olypschedule_tilte_icon .gamesIcon li {
               margin-bottom: 0;
               }
               .olypschedule_table table {
               border-collapse: collapse;
               border-spacing: 0;
               width: 100%;
               }
               .olypschedule_table table tr th {
               height: 50px;
               background: #222222;
               color: #fff;
               text-transform: uppercase;
               font-size: 13px;
               text-align: left;
               }
               .olypschedule_table {
               width: 100%;
               display: flex;
               justify-content: space-between;
               gap: 15px;
               box-sizing: border-box;
               }
               .olypschedule_table_row {
               width: 50%;
               }
               .olypschedule_table table tbody tr {
               height: 43px;
               background: #fff;
               border-bottom: 1px #dadada solid;
               }
               .olypschedule_time {
               color: #001d42;
               font-size: 14px;
               font-weight: bold;
               padding-left: 10px;
               padding-right: 15px;
               }
               .olypschedule_time span {
               font-size: 12px;
               font-weight: normal;
               padding-left: 4px;
               text-transform: uppercase;
               }
               .olypschedule_sport {
               letter-spacing: 0px;
               color: #202020;
               font-size: 13px;
               font-weight: 600;
               width: 80%;
               padding: 0 10px 0 0;
               }
               .olypschedule_sport:last-child {font-weight: normal;}
               .olypschedule_round {
               font-size: 12px;
               color: #202020;
               }
               .olypschedule_table table tr th:first-child {
               padding-left: 10px;
               }
               .olypschedule_date {
               display: flex;
               justify-content: flex-start;
               margin: 0 0 13px;
                   border-bottom: 1px solid #D2D2D2;
               }
               ul.olypschedule_date li {
               width: 40px;
               background: #E9E9E9;
               cursor: pointer;
               text-transform: uppercase;
               margin-right: 2px;
               text-align: center;
               padding: 7px 7px 12px;
               color: #747474;
               position: relative;
               height: 50px;
               cursor: pointer;
               }
               ul.olypschedule_date li span {
               display: block;
               font-size: 12px;
               line-height: 14px;
               }
               ul.olypschedule_date li span:first-child {
               font-size: 15px;
               line-height: 18px;
               }
               ul.olypschedule_date li:after {
               content: "";
               width: 100%;
               height: 5px;
               background: #CFCECE;
               position: absolute;
               bottom: 0;
               left: 0;
               }
               ul.olypschedule_date li.active {
               width: 50px;
               background: #fff;
               position: relative;
               box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
               }
               ul.olypschedule_date li.active:after {
               background: #e1261d;
               }
               ul.olypschedule_date li.active span {
               color: #e1261d;
               }
               ul.olypschedule_date li.active span:first-child {
               font-size: 22px;
               font-weight: 600;
               line-height: 22px;
               }
               
              .scheduledrpWrap{display:flex;align-items:center;padding: 0 10px;}   
              .scheduledrp{height:30px;width: 160px;display:flex;background:#fff; border:1px solid #C0C0C0;background-color:#F6F6F6;color:#fff;     margin-bottom: 12px; border-radius: 4px;}
              .scheduledrp .scheduledn{width:180px;position:relative;}
              .scheduledrp .scheduledn:after{content:"";position:absolute;width:10px;height:14px;display:block;background:url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/dropdown-icon.png);background-repeat:no-repeat;background-position:right 1px center;filter:invert(1);top:7px;right:4px}
              .scheduledrp .scheduledn .schedulednval{height:100%;padding-left:10px;font-size:12px;text-align:left;display:flex;align-items:center;cursor:pointer;color:#333;font-weight:700}
              .schedulednBox{width:100%;position:absolute;top:22px;font-size:11px;background:#e8e8e8;border-bottom-left-radius:6px;border-bottom-right-radius:6px;border:1px solid #d0d0d0;border-top:0;display:none;z-index:99;height:250px;overflow-y:auto;overflow-x:hidden}
              .schedulednBox.active{display:block}.schedulednBox li:last-child{margin-bottom:0}
              .schedulednBox li a{position:relative;color:#001d42;font-size:11px;text-transform:uppercase;text-align:left;display:block;padding:7px 7px 7px 23px}.schedulednBox li a:hover{background:#e1261d;color:#fff}
              .schedulednBox li a::before{content:"-";position:absolute;left:10px;font-size:18px;top:50%;transform:translate(0,-50%)}
              .schedulednBox li.active{background:#e1261d}
              .schedulednBox li.active a{color:#fff} 
              .schdlheading{display: flex;justify-content: space-between; align-items: flex-end;} 
                @media (max-width:768px){
                    .schdlheading{flex-direction: column; padding: 10px; margin-top: 10px;}
                    .scheduledrp{margin: 12px auto 0;}
                    .olpschdl.medalHopeHeadingInner{border-bottom: 1px solid #ddd;width: 100%;}
                    .olypschedule_box{padding: 10px;}
                    .olypschedule_date{overflow: scroll;}
                    // .rhtp{position: relative;width: 100%; margin: 22px auto;}
                    // .rhtp span{position: relative;}
                    // .rhtp span:after{margin: 1px 0;}
                    .olypschedule_table{flex-direction: column;}
                    .olypschedule_table_row {width: 100%;}
                    ul.olypschedule_date li{width: 50px;padding: 6px 17px;}
                    .olypschedule_sport{line-height: 16px; min-height: 46px;} 
                    .olypschedule_sport:last-child {  font-weight: bold;}
                    .olypschedule_sport span{font-weight: 400}
                    .olypschedule_time{display: flex; align-items: center; padding: 3px 15px 0 10px;}
                   
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
            `}</style>
    </>
  );
};
export default Schedule;
