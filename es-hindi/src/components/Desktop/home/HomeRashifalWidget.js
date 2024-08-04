import { getRashifalData } from "api/individual/rashifal";
import moment from "moment";
import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import SVGWhweel from "./SVGWheel";
import ReadMore from "../common/ReadMore";
import { logEvent, logEventNew } from "includes/googleAnalytic";
const { publicRuntimeConfig } = getConfig();
const getChangedTime = (time) => {
    switch (time) {
      case "day":
        return "today";
      case "week":
        return "weekly";
      case "month":
        return "monthly";
      case "year":
        return "yearly";
      default:
        return "today";
    }
  };
  const getFormatedTime = (time) => {
    switch (time) {
      case "day":
        return moment().format("LL");
      case "week":
        return getWeekStartEndDate();
      case "month":
        return getMonthStartEndDate();
      case "year":
        return new Date().getFullYear();
      default:
        return moment().format("LL");
    }
  };
  const getWeekStartEndDate = () => {
    const startOfWeek = moment().startOf("week").add(1, "day").format("MMM D");
    const endOfWeek = moment().endOf("week").add(1, "day").format("MMM D");
    return startOfWeek + " - " + endOfWeek;
  };
  const getMonthStartEndDate = () => {
    const startOfWeek = moment().startOf("month").format("MMM DD");
    const endOfWeek = moment().endOf("month").format("MMM DD");
    return startOfWeek + " - " + endOfWeek;
  };
  const getHindiName = (value) => {
    return rashifalList.filter((itm) => itm.value === value)[0]?.title;
  };
  const rashifalList = [
    { title: "मेष", value: "aries", image: "mesh.png" },
    { title: "वृषभ", value: "taurus", image: "vrish.png" },
    { title: "मिथुन", value: "gemini", image: "mithun.png" },
    { title: "कर्क", value: "cancer", image: "kark.png" },
    { title: "सिंह", value: "leo", image: "singh.png" },
    { title: "कन्या", value: "virgo", image: "kanya.png" },
    { title: "तुला", value: "libra", image: "tula.png" },
    { title: "वृश्चिक", value: "scorpius", image: "vrischik.png" },
    { title: "धनु", value: "sagittarius", image: "dhanu.png" },
    { title: "मकर", value: "capricornus", image: "makar.png" },
    { title: "कुंभ", value: "aquarius", image: "kumbh.png" },
    { title: "मीन", value: "pisces", image: "min.png" },
  ];
const HomeRashifalWidget = ({ rashifalData, isRhs, isMobile,isHome, weburl, isArticle = false, title, storyId }) => {
    const [time, setTime] = useState("day");
    const [name, setName] = useState("aries");
    const [loader, setLoader] = useState(false);
    const [rashifalDetail, setrashifalDetail] = useState(rashifalData?.[0] || {});
    const [selectChannelActive, setSelectChannelActive] = useState(false);
    const fetchRashiDetail = async (rashi, type) => {
        type ? logEventNew("Astro Widget", "Click" , `${isHome ? "Homepage," : ""} ${isArticle ? `${weburl},` : ""}${storyId ? `${storyId},` : ""} ${rashi}, ${time}, ${isMobile ? "MWeb" : "desktop"}`) : logEventNew("Astro Widget", "Click" , ` ${isHome ? "Homepage," : ""} ${isArticle ? `${weburl},` : ""}  ${storyId ? `${storyId},` : ""} ${rashi}, ${isMobile ? "MWeb" : "desktop"}`);

        if(document.getElementsByClassName("slect-rashi-list")?.[0])
          document.getElementsByClassName("slect-rashi-list")[0].style.display = "none";
        setLoader(true)
        setName(rashi);
        type && setTime(type);
        const rashifal = await getRashifalData(rashi, type || time, true);
        if (rashifal && rashifal[0]) {
          setrashifalDetail(rashifal[0]);
          setLoader(false);
        } else {
          setLoader(false);
          setrashifalDetail({});
        }
        if(document.getElementsByClassName("slect-rashi-list")?.[0])
          document.getElementsByClassName("slect-rashi-list")[0].style.display = "";
      };
    useEffect(() => {
        if(!(rashifalData && rashifalData[0]?.description)){
            fetchRashiDetail("aries", "day");
        }
        setTimeout(() => {
          logEvent("Astro Widget", "Impression" , `${isHome ? "Homepage," : ""} ${isArticle ? `${weburl},` : ""} ${title ? `${title},` : ""} ${storyId ? `${storyId},` : ""} ${isMobile ? "MWeb" : "desktop"}`);
        },1000);

    }, [rashifalData]);
    if(!rashifalDetail?.description && name === "aries") {
      return isRhs ? <div style={{ minHeight: "703px"}}></div> : null;
    }
    return(<>
        <div className="mrg10">
        <div className="newglblhdwrap miniwrapper">
          <h2 className="newglblhd">राशिफल</h2>
          {!isMobile ? 
            <a
              onClick={() => logEventNew("Astro Widget", "Click", `${isHome ? "Homepage," : ""} ${isArticle ? `${weburl},` : ""} Read More Button, ${publicRuntimeConfig.siteUrl+'rashifal/'} ,${isMobile? "MWeb" : "desktop"}`)}
              href={publicRuntimeConfig.siteUrl+'rashifal/'} className="moretrndstroy">और पढ़ें</a>
           : <a
              onClick={() => logEventNew("Astro Widget", "Click", `${isHome ? "Homepage," : ""} ${isArticle ? `${weburl},` : ""} Read More Button, ${publicRuntimeConfig.siteUrl+'rashifal/'} ,${isMobile? "MWeb" : "desktop"}`)}
              href={publicRuntimeConfig.siteUrl+'rashifal/'} style={{ width: isMobile ? "75px" : "auto", fontSize: isMobile ? "15px" : "auto"}} className={`${isMobile ? "moretrndstroy2" : "moretrndstroy"}`}>{"और पढ़ें"}</a>
        }
        </div>
        <div className={`rashfl_wrap ${loader ? "loader_rashi" : ""}`}>
          <div className="lft_wrap">
           <div className="tp_rw"> 
                  <div className={`slect-rashihd ${!isMobile ? "slect-rashirhs" : ""} ${selectChannelActive ? "acdcslvtvhd" :""}`} onClick={() => {
                    isMobile && setSelectChannelActive(!selectChannelActive);
                      logEventNew("Astro Widget", "Click" , `${isHome ? "Homepage," : ""} ${isArticle ? `${weburl},` : ""} Drop Down Open, ${name}, ${isMobile ? "MWeb" : "desktop"}`)
                    }}>
                    {getHindiName(name)}
                    <ul className="slect-rashi-list">
                      {rashifalList.map(itm => <li key={itm.title} className="select_rashi">
                        <span
                          onClick={(e) => fetchRashiDetail(itm.value, time)}
                          className="events_ana select_rashi"
                        >
                          {itm.title}
                        </span>
                      </li>)}
                    </ul>
                  </div>
              <h3>{getFormatedTime(time)}</h3>
            </div>
            <div className="navtime">
              <span
                onClick={() => fetchRashiDetail(name, "day")}
                className={`${time === "day" ? "active select_rashi" : "select_rashi"}`}
              >
                दैनिक
              </span>
              <span
                onClick={() => fetchRashiDetail(name, "week")}
                className={`${time === "week" ? "active select_rashi" : " select_rashi"}`}
              >
                साप्ताहिक
              </span>
              <span
                onClick={() => fetchRashiDetail(name, "month")}
                className={`${time === "month" ? "active select_rashi" : " select_rashi"}`}
              >
                मासिक
              </span>
              <span
                onClick={() => fetchRashiDetail(name, "year")}
                className={`${time === "year" ? "active select_rashi" : " select_rashi"}`}
              >
                वार्षिक
              </span>
            </div>
            
            {isRhs && <div className="hrwheel"><SVGWhweel fetchRashiDetail={fetchRashiDetail} name={name} time={time}/></div>}
            {rashifalDetail?.description ? <div className="detail_wrap" dangerouslySetInnerHTML={{ __html: rashifalDetail?.description }}></div>: <div className="detail_wrap">No data Available</div>}
            <a 
              onClick={() => logEventNew("Astro Widget", "Click", `${isHome ? "Homepage," : ""} ${isArticle ? `${weburl},` : ""} Read More Button, ${name}, ${time} ,${isMobile? "MWeb" : "desktop"}`)}
              className="aur_wrap" href={publicRuntimeConfig.siteUrl +
                "rashifal/" +
                name +
                "/" +
                getChangedTime(time) +
                "/"}>और भी पढ़ें
                <span className="aurrow"></span>
                </a>
          </div>
          <div className="rgt_wrap">
            {} {!isRhs && <div className="hrwheel"><SVGWhweel fetchRashiDetail={fetchRashiDetail} name={name} time={time}/></div>}
            
          </div>
          <div className="rfsponslogo"><img src="https://images.news18.com/ibnkhabar/uploads/2024/04/Chirag-Daruwalla-Logo-Black-Bg-2024-04-c63bd9d91ae461bfa1b3ee50c19449e3.jpg?impolicy=website&width=183&height=38"></img></div>
        </div>
        </div>
        <style jsx>{`${isRhs ? `
        .moretrndstroy{
          color: #e82d2e;
          font-size: 14px;
          display: block;
          text-align: center;
          line-height: 24p;
          margin: 5px 0px;
          font-weight: bold;
        }
        .moretrndstroy:after{
          content: "";
          background: url(/images/siteimages/newiconsprite_1669351342.svg) -164px 0px no-repeat;
          width: 11px;
          height: 11px;
          display: inline-block;
          margin-left: 6px;
          vertical-align: middle;
        }
        .newglblhdwrap {
          border-bottom: 1px solid#d9d9d9;
          position: relative;
          margin-bottom: 10px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          -moz-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: baseline;
          -webkit-align-items: baseline;
          -moz-box-align: baseline;
          -ms-flex-align: baseline;
          align-items: baseline
      }
      .newglblhdwrap:before {
          content: "";
          background: #ed1c24;
          width: 25px;
          height: 4px;
          position: absolute;
          left: 0;
          bottom: 0
      }
      .newglblhdwrap .newglblhd,.newglblhdwrap .newglblhd a {
          font-size: 20px;
          line-height: 38px;
          color: ##e82d2e;
          font-weight: bold;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: end;
          -webkit-align-items: end;
          -moz-box-align: end;
          -ms-flex-align: end;
          align-items: end
      }
      .newglblhdwrap .newglblhd span,.newglblhdwrap .newglblhd a span {
          color: #ed1c24;
          margin-right: 5px
      }
      .newglblhdwrap .newglblhd em,.newglblhdwrap .newglblhd a em {
          color: #868686;
          font-weight: normal;
          text-transform: uppercase;
          font-style: normal;
          font-size: 12px;
          position: relative;
          top: 2px;
          margin-left: 10px
      }
      .newglblhdwrap.newsml .newglblhd,.newglblhdwrap.newsml .newglblhd a {
          font-size: 18px;
          line-height: 34px
      }
        .loader_rashi {
            opacity: .5;
            cursor: none;
        }
        .aur_wrap:hover {
            color: #fff !important;
        }
        .rashfl_wrap {
          display: block;
          text-align: center;
         padding: 10px ;
          width: 100%;
          background: #000;
          border-radius: 15px;
          background-image: url(/images/astro/bg_rashi.png);
          overflow: hidden;
          margin-top: 15px;
          position: relative;
        }
        .lft_wrap {
          padding-right: 0px;
        }
        .rashfl_wrap select {
          font-size: 25px;
          line-height: 34px;
          background-color: #ED1C24;
          color: #fff;
          border: 2px solid #ED1C24;
          border-radius: 40px;
          padding: 0 18px;
          margin: 0 auto 6px;
          text-align: center;
          font-family: inherit;
          height: 46px;
        }
        .rashfl_wrap h3 {
          color: #fff;
          font-size: 16px ;
          line-height: 27px ;
          font-weight: normal;
        }
        .tp_rw {
          display: block ;
        }
      .navtime{
        display: flex;
        justify-content: space-evenly;
        margin: 20px 0 17px;
        max-width: initial;
        margin-left: -6px;
        position: relative;
        z-index: 9;
      }
      .navtime span{
        background-color: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 40px;
        color:#9E9E9E;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
        padding: 3px 15px;
      }
      .navtime span.active{background-color: #EC2027;  color: #fff;}
      .detail_wrap {
        overflow: hidden;
        color: #fff;
        font-size: 14px; line-height: 22px;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        margin-top: 10px;
          }
          .aur_wrap{
            background-color: #ED1C24;
            border-radius: 30px;
            width: 120px;
            height: 30px;
            color: #fff;
            padding: 3px 20px;
            margin: 15px auto 12px;
            display: block;
            position: relative;
          }
          .aurrow{
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(var(--ggs, 1));
            width: 14px;
            height: 14px;
            position: absolute;
            top: 13px;
            right: 10px
          }
          .aurrow::after,
          .aurrow::before {
          content: "";
          width: 16px;
          display: block;
          box-sizing: border-box;
          position: absolute;
          right: 3px
          }
          .aurrow::after {
          width: 8px;
          height: 8px;
          border-top: 2px solid;
          border-right: 2px solid;
          transform: rotate(45deg);
          bottom: 7px
          }
          .aurrow::before {
          width: 11px;
          height: 2px;
          bottom: 10px;
          background: currentColor
          } 
          
          @keyframes rotating{
            0% {
                transform: rotate(0deg);
            }
            
            100% {
                transform: rotate(-360deg);
            }
          }
          .hrwheel {
            background-image: url(/images/astro/sun.svg);
            background-position: center;
          }
          .hrwheel img {
            animation: rotating 60s linear infinite;
            width: 100%;
          }
          .hrwheel img:hover {
            animation-play-state: paused;
          } 
          .hrwheel svg {
            display: inline-block;
            max-width: 100%;
            width: 100%;
            height: auto;
            vertical-align: middle;
            border-style: none;
            animation: rotating 60s linear infinite;
            z-index:0;
          }
          .hrwheel:hover svg {
            animation-play-state: paused;
          }
          .hrwheel svg > g:hover > path, .slected > path {
            fill: #ED1C24;
            cursor: pointer;
            stroke: #ED1C24;
          }
          .hrwheel svg > g.selected > path{
            fill: #ED1C24;
            stroke: #ED1C24;
          }
          .hrwheel svg > g#Base:hover > path  {
            fill:none;
            stroke: #fff;
          }
          .hrwheel svg > g#Sunsign:hover > path  {
            fill:#fff;
            stroke: none;
          }
          g#Sunsign path {
            stroke: none;
          }
          .slect-rashihd {
            font-size: 25px;
            line-height: 34px;
            background-color: #ED1C24;
            color: #fff;
            border: 2px solid #ED1C24;
            border-radius: 40px;
            padding: 5px 23px;
            margin: 0 15px 0 0;
            font-family: inherit;
            height: 46px;
            width: 117px;
            position: relative;
            margin: 0 auto;
            z-index: 90;
            text-align: left;
          }
          .slect-rashihd:before {
            content: "";
            width: 6px;
            height: 6px;
            border-top: 2px solid #fafafa;
            border-left: 2px solid #ffffff;
            right: 15%;
            transform: rotate(-135deg);
            top: 35%;
            transition: all 0.5s ease-in-out;
            display: block;
            position: absolute;
          }
          
          .slect-rashi-list {
            background: #ed1c24;
            padding: 10px 12px 0 12px;
            top: 43px;
            z-index: 1;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 40%), 0 10px 10px -5px rgb(0 0 0 / 4%);
            display: none;
            right: -2px;
            overflow-y: scroll;
            max-height: 450px;
            overflow-x: hidden;
            width: 117px;
            position: absolute;
          }
          ::-webkit-scrollbar {
            width: 10px;
          }          
          .slect-rashi-list li span {
            color: #fff;
            font-size: 15px;
            position: relative;
            padding-left: 10px;
            display: block;
            line-height: 18px;
            margin-bottom: 18px;
            text-align: left;
            cursor: pointer;
          }
          .slect-rashi-list li span:before {
            content: "";
            width: 3px;
            height: 16px;
            background: #ed1c24;
            position: absolute;
            top: 3px;
            left: 0;
          }
          .slect-rashihd.acdcslvtvhd {
            background: #ed1c24;
            color: #fff;
          }
          .slect-rashihd.acdcslvtvhd:before {
            border-top: 1px solid #fff;
            border-left: 1px solid #fff;
            right: 15px;
          }
          .slect-rashihd.acdcslvtvhd {
            border-bottom-left-radius: unset;
            border-bottom-right-radius: unset;
            border-top-right-radius: 18px !important;
            border-top-left-radius: 18px !important;
        }
          .slect-rashihd.acdcslvtvhd .slect-rashi-list {
            display: block;
            border-top-left-radius: unset;
          }
          .slect-rashirhs:hover .slect-rashi-list  {
            display: block;
            border-top-left-radius: unset;
          }
          .slect-rashirhs:hover  {
            color: #fff;
            border-radius: unset !important;
            border-top-right-radius: 18px !important;
            border-top-left-radius: 18px !important;
          }
          .rfsponslogo{display:none;}
          
          ` : 
        
          `
          .slect-rashihd:hover .slect-rashi-list {
            display: block;
            border-top-left-radius: unset;
          }
        
          .slect-rashihd {
            font-size: 25px;
            line-height: 34px;
            background-color: #ED1C24;
            color: #fff;
            border: 2px solid #ED1C24;
            border-radius: 40px;
            padding: 5px 23px;
            margin: 0 15px 0 0;
            font-family: inherit;
            height: 46px;
            min-width: 117px;
            position: relative;
          }
          .slect-rashihd:before {
            content: "";
            width: 8px;
            height: 8px;
            border-top: 2px solid #fff;
            border-left: 2px solid #fff;
            right: 20%;
            transform: rotate(-135deg);
            top: 36%;
            transition: all 0.5s ease-in-out;
            display: block;
            position: absolute;
          }
          .slect-rashihd:hover {
            color: #fff;
            border-radius: unset !important;
            border-top-right-radius: 18px !important;
            border-top-left-radius: 18px !important;
        }
          
          
          .slect-rashi-list {
            position: absolute;
            background: #ed1c24;
            padding: 10px 12px 0 12px;
            top: 44px;
            z-index: 1;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 40%), 0 10px 10px -5px rgb(0 0 0 / 4%);
            display: none;
            left: -2px;
            width: 180px;
            overflow-y: scroll;
            max-height: 370px;
            overflow-x: hidden;
            width: 116px;
          }
          
          .slect-rashi-list li span {
            color: #fff;
            font-size: 17px;
            position: relative;
            padding-left: 10px;
            display: block;
            line-height: 1.45;
            margin-bottom: 18px;
            cursor: pointer;
          }
          .aur_wrap:hover {
              color: #fff !important;
          } 
          .loader_rashi {
            opacity: .5;
            cursor: none;
          }
          .rashfl_wrap {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            background: #000;
            padding: 30px 13px  30px 30px;
            border-radius: 15px;
            background-image: url(/images/astro/bg_rashi.png);
            overflow: hidden;
            position: relative;
          }
          .lft_wrap {
            padding-right: 10px;
          }
          .rashfl_wrap select {
            font-size: 25px;
            line-height: 34px;
            background-color: #ED1C24;
            color: #fff;
            border: 2px solid #ED1C24;
            border-radius: 40px;
            padding: 0 18px;
            margin: 0px 15px 0px 0px;
            text-align: center;
            font-family: inherit;
           height:46px;
        }
          .rashfl_wrap h3 {
            font-size: 20px;
            line-height: 34px;
            color: #fff;
        }
          .tp_rw {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .navtime{
          display: flex;
          margin: 20px 0 17px;
          margin-left: -6px;
          width: 100%;
        }
        .navtime span{
          background-color: #FFFFFF;
          border: 1px solid #D5D5D5;
          border-radius: 40px;
          color:#9E9E9E;
          font-size: 16px;
          line-height: 20px;
          cursor: pointer;
          padding: 3px 15px;
          margin-left: 7px;
        }
        .navtime span.active{background-color: #EC2027;  color: #fff;}
        .detail_wrap {
          overflow: hidden;
          color: #fff;
          font-size: 16px;
          line-height: 27px;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
            }
            .aur_wrap{
              background-color: #ED1C24;
              border-radius: 30px;
              width: 120px;
              height: 30px;
              color: #fff;
              padding: 3px 20px;
              margin: 20px 0 0;
              display: block;
              position: relative;
            }
            .aurrow{
              box-sizing: border-box;
              position: relative;
              display: block;
              transform: scale(var(--ggs, 1));
              width: 14px;
              height: 14px;
              position: absolute;
              top: 13px;
              right: 15px
            }
            .aurrow::after,
            .aurrow::before {
            content: "";
            display: block;
            box-sizing: border-box;
            position: absolute;
            right: 3px
            }
            .aurrow::after {
            width: 8px;
            height: 8px;
            border-top: 2px solid;
            border-right: 2px solid;
            transform: rotate(45deg);
            bottom: 7px
            }
            .aurrow::before {
            width: 11px;
            height: 2px;
            bottom: 10px;
            background: currentColor
            } 
            
            .rgt_wrap {
              display: block;
              min-width: 45%;
            }
            @keyframes rotating{
              0% {
                  transform: rotate(0deg);
              }
              
              100% {
                  transform: rotate(-360deg);
              }
            }
            .hrwheel {
              background-image: url(/images/astro/sun.svg);
              background-position: center;
          }
            .hrwheel img {
              animation: rotating 60s linear infinite;
            }
            .hrwheel img:hover {
              animation-play-state: paused;
            }
            .hrwheel svg {
                display: inline-block;
                max-width: 100%;
                width: 100%;
                height: auto;
                vertical-align: middle;
                border-style: none;
                animation: rotating 60s linear infinite;
              }
              .hrwheel:hover svg {
                animation-play-state: paused;
              }
              .hrwheel svg > g > path{fill: #fff;}
              .hrwheel svg > g:hover > path, .slected > path {
                fill: #ED1C24;
                cursor: pointer;
                stroke: #ED1C24;
              }
              .hrwheel svg > g.selected > path{
                fill: #ED1C24;
                stroke: #ED1C24;
              }
              .hrwheel svg > g#Base:hover > path  {
                fill:none;
                stroke: #fff;
              }
              .hrwheel svg > g#Sunsign:hover > path  {
                fill:#fff;
                stroke: none;
              }
              .rfsponslogo {
                position: absolute;
                bottom: 3px;
                width: 20%;
              }
              .rfsponslogo img{
                width: 100%;
              }

    
            `
          }`}</style>
        <style jsx>{` 
          
        `}</style>
    </>)
};
export default HomeRashifalWidget;