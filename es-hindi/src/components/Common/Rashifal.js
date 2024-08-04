import Glide from "@glidejs/glide";
import { getRashifalData } from "api/individual/rashifal";
import React, { useEffect, useState } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import DharmPriority from "widgets/Common/Responsive/DharmPriority";
import getConfig from "next/config";
import moment from "moment";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import { logEvent, logEventNew } from "includes/googleAnalytic";
import { additionalText } from "includes/_app.util";

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
const Rashifal = (props) => {
  const { urlParam = {}, rashifalData = [], rashifalDetail: { title= "", description: desc = ""} = {},isMobile = false } = props.data || {};
  const [time, setTime] = useState(urlParam.time);
  const [name, setName] = useState(urlParam.name);
  const [currentUrl, setCurrentUrl] = useState(props.data.currentUrl);
  const [rashifalDetail, setrashifalDetail] = useState(rashifalData[0] || {});

  const updateUrl = (url) => {
    setCurrentUrl(url);
    url.replace(publicRuntimeConfig.siteUrl, "/");
    history.replaceState({}, "", url);
  };

  const fetchRashiDetail = async (rashi, type) => {
    type ? logEventNew("Astro Page", "Click", `${rashi} ,${type} ,${isMobile? "mobile" : "desktop"}`) : logEventNew("Astro Page", "Click", `${rashi} ,${isMobile? "mobile" : "desktop"}`);

    setName(rashi);
    type && setTime(type);
    const rashifal = await getRashifalData(rashi, type || time, true);
    if (rashifal && rashifal[0]) {
      setrashifalDetail(rashifal[0]);
    } else {
      setrashifalDetail({});
    }
    updateUrl(
      publicRuntimeConfig.siteUrl +
        "rashifal/" +
        rashi +
        "/" +
        getChangedTime(type || time) +
        "/",
    );
  };
  useEffect(() => {
    setTimeout(() => {
      logEvent("Astro Page", "Impression", isMobile? "mobile" : "desktop")
    }, 1000)
    new Glide(document.querySelector(".horosldr"), {
      autoplay: false,
      type: "slider",
      perView: isMobile ? 2.5 : 6,
      gap: isMobile ? 20 : 15,
      slidesToScroll: 1,
      start: 0,
    }).mount();
  }, []);
  return (
    <>
      <div className="container clearfix">
        <div className="leftwrap">
          <BreadcrumbCommon breadCrumbArray={[ {value: "हिंदी समाचार", slug: "/"}, {value: "एस्ट्रो" } ]} />
          <div className="clearfix vsp10"></div>
          <div>
            <div className="glblhead newsml">
              <h2 className="newglblhd">{title}</h2>
            </div>
            <p className="descrp">{desc}
            </p>
            <div className="horosldr">
              <div data-glide-el="track">
                <ul>
                  {rashifalList.map((item, index) => (
                    <li
                      onClick={() => fetchRashiDetail(item.value)}
                      id={item.value}
                      key={index}
                      className={`${name === item.value ? "active" : ""}`}
                    >
                      <a>
                        <img
                          src={`/images/astro/${item.image}`}
                          alt={item.value}
                          loading="lazy"
                        />
                        <h2>{item.title}</h2>
                        <span>{getFormatedTime(time)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="horosldr-arrow" data-glide-el="controls">
                <button
                  type="button"
                  className="left"
                  onClick={() => logEventNew("Astro Page", "Click", `previous ,${isMobile? "mobile" : "desktop"}`)}
                  data-glide-dir="<"
                ></button>
                <button
                  type="button"
                  className="right"
                  onClick={() => logEventNew("Astro Page", "Click", `next ,${isMobile? "mobile" : "desktop"}`)}
                  data-glide-dir=">"
                ></button>
              </div>
            </div>
          </div>

          <div className="timewrap">
            <div className="heading">
              <h3>{getHindiName(name)} {time === "day" ? "दैनिक" : (time === "week" ? "साप्ताहिक" : (time === "month" ? "मासिक" : "वार्षिक"))} राशिफल</h3>
            <div className="navtime">
              <span
                onClick={() => fetchRashiDetail(name, "day")}
                className={`${time === "day" ? "active" : ""}`}
              >
                दैनिक
              </span>
              <span
                onClick={() => fetchRashiDetail(name, "week")}
                className={`${time === "week" ? "active" : ""}`}
              >
                साप्ताहिक
              </span>
              <span
                onClick={() => fetchRashiDetail(name, "month")}
                className={`${time === "month" ? "active" : ""}`}
              >
                मासिक
              </span>
              <span
                onClick={() => fetchRashiDetail(name, "year")}
                className={`${time === "year" ? "active" : ""}`}
              >
                वार्षिक
              </span>
            </div>
            </div>
            <div className="timdesc">
              <span>
                {rashifalDetail.name || getHindiName(name)} :{" "}
                {getFormatedTime(time)}
              </span>
              {rashifalDetail?.description ? (
                <>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: rashifalDetail.description,
                    }}
                  ></p>
                </>
              ) : (
                <p>No Data Available</p>
              )}
            </div>
            <ul className="artclbyeline-share">
              {isMobile
              ?
              <li>
                <a
                className="arr_redirect"
                href="javascript:void(0)"
                onClick={async () => { 
                  const shareData = {
                    title: "",
                    text: `${rashifalDetail.rashifal_name || getHindiName(name)}\n${currentUrl}\n\n ${additionalText}`,
                  };                                   
                  try {
                    logEventNew("Astro Page", "Click" ,"Share, mobile");
                    await navigator.share(shareData);
                  } catch (err) {
                    //resultPara.textContent = `Error: ${err}`;
                  }            
                  logEvent("ss_wapi","tap","rashifal_page");
                }}
              >
                <svg
                  id=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="25"
                  viewBox="0 0 32 32"
                >
                  <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
                </svg>
                </a>
              </li>
            :
             <>
                <li>
                  <a
                    className="for-whatsapp"
                    onClick={() => logEventNew("Astro Page", "Click", `${name}, Social Share: whatsapp, ${time} ,${isMobile? "mobile" : "desktop"}`)}
                    href={
                      "https://wa.me/?text=" +
                      encodeURIComponent(
                        rashifalDetail.rashifal_name || getHindiName(name),
                      ) +
                      " - " +
                      currentUrl
                    }
                    target="_blank"
                  >
                    <span className="spriteshare art-whatsapp-icon"></span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => logEventNew("Astro Page", "Click", `${name}, Social Share: facebook, ${time} ,${isMobile? "mobile" : "desktop"}`)}
                    href={
                      "https://www.facebook.com/sharer.php?u=" +
                        currentUrl +
                        "&t=" +
                        rashifalDetail.rashifal_name || getHindiName(name)
                    }
                    target="_blank"
                  >
                    <span className="spriteshare art-facebook-icon"></span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => logEventNew("Astro Page", "Click", `${name}, Social Share: telegram, ${time} ,${isMobile? "mobile" : "desktop"}`)}
                    href={
                      "https://telegram.me/share/url?url=" +
                        currentUrl +
                        "&t=" +
                        rashifalDetail.rashifal_name || getHindiName(name)
                    }
                    target="_blank"
                  >
                    <span className="spriteshare art-telegram-icon"></span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => logEventNew("Astro Page", "Click", `${name}, Social Share: twitter, ${time} ,${isMobile? "mobile" : "desktop"}`)}
                    href={
                      "https://twitter.com/share?text=" +
                      currentUrl +
                      "&t=" +
                      (rashifalDetail.rashifal_name || getHindiName(name))
                    }
                    target="_blank"
                  >
                    <span className="spriteshare art-twitter-icon"></span>
                  </a>
                </li>
              </>
            }
            </ul>
          </div>
          <DharmPriority data={props.data.dharmData || []} />
        </div>
        {!isMobile && <div className="rightwrap">
          <RhsCommon
            pageAds={props.pageAds}
            photoStories={props.data.photoStories}
            topStories={props.data.topStories}
            astroStories={props.data.astroStories}
            section={"rashifal"}
            currentURL={props.data.currentUrl}
            isAboutAd={true}
          />
        </div>}
      </div>
      <style jsx global>{`
        .leftwrap {
          width: calc(100% - 325px);
          float: left;
          position: relative;
          font-family: "Mukta", sans-serif;
        }
        .container {
          margin: auto;
          position: relative;
          max-width: 1244px;
        }
        .rightwrap {
          width: 300px;
          float: right;
          position: sticky;
          top: 55px;
        }
        .vsp10 {
          padding-top: 10px;
          display: block;
        }
        .glblhead {
          border-bottom: 1px solid #d9d9d9;
          position: relative;
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .glblhead:before {
          content: "";
          background: #ed1c24;
          width: 25px;
          height: 4px;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .glblhead.newsml .newglblhd,
        .glblhead.newsml .newglblhd a {
          font-size: 18px;
          line-height: 34px;
        }
        .glblhead .newglblhd,
        .glblhead .newglblhd a {
          font-size: 20px;
          line-height: 38px;
          color: #000;
          font-weight: bold;
          display: flex;
          align-items: end;
        }
        .descrp {
          margin: 25px 0;
          font-size: 16px;
          line-height: 24px;
          color: #111111;
        }
        .horosldr {
          position: relative;
          margin: 0 40px 30px;
        }
        .horosldr > div {
          overflow: hidden;
        }
        .horosldr ul {
          display: flex;
          padding: 0 0 5px 0;
        }
        .horosldr ul li {
          cursor: pointer;
          background: #ffffff;
          box-shadow: 0px 2px 4px #0000001a;
          border-radius: 4px;
          border: 2px solid #dfdfdf;
          padding: 15px 10px;
          opacity: 0.5;
          text-align: center;
        }
        .horosldr ul li img {
          width: 75px;
          height: 75px;
        }
        .horosldr ul li a span {
          font-size: 14px;
          line-height: 20px;
          color: #575757;
        }
        .horosldr ul li a h2 {
          font-size: 20px;
          line-height: 20px;
          color: #000;
          margin-top: 20px;
        }
        .horosldr-arrow button {
          width: 25px;
          background: transparent;
          position: absolute;
          left: -36px;
          top: 0;
          bottom: 4px;
          border: 0;
          cursor: pointer;
        }
        .horosldr-arrow button:last-child {
          left: auto;
          right: -36px;
        }
        .horosldr-arrow button.left:before,
        .horosldr-arrow button.right:before {
          content: "";
          display: block;
          margin: 30px auto;
          width: 10px;
          height: 10px;
          border-top: 2px solid #000;
          border-left: 2px solid #000;
          transform: rotate(315deg);
        }
        .horosldr-arrow button.right:before {
          transform: rotate(136deg);
        }
        .horosldr ul li.active {
          border: 2px solid #575757;
          background: #f5f5f5;
          opacity: 1;
        }
        .heading {
          border-bottom: 1px solid #bebebe;
          display: flex;
          padding: 10px 20px;
        }
        .heading h3 {
          width: 20%;

        }
        .timewrap {
          margin-bottom: 35px;
          background-color: #f7f7f7;
          width: 100%;
          align-items: center;
        }
        .navtime {
          // border-bottom: 1px solid #bebebe;
          width: 80%;
          // margin-bottom: 20px;
          text-align: right;
        }
        .navtime span {
          border: 1px solid #d1d1d1;
          background-color: #fff;
          border-radius: 20px;
          padding: 5px 30px 5px 30px;
          margin-right: 5px;
          text-align: center;
          font-size: 17px;
          color: #a8a8a8;
        }
        .navtime span.active {
          background-color: #e1261d;
          border: 1px solid #fff;
          color: #fff;
          box-shadow: #00000029 0px 3px 6px;
          border-style: inset;
        }
        .timdesc span {
          font-size: 14px;
          line-height: 20px;
          color: #6d6d6d;
          margin-bottom: 10px;
          display: block;
          font-weight: 600;
          padding: 10px 20px;

        }
        .timdesc p {
          font-size: 16px;
          line-height: 24px;
          color: #210303;
          padding: 0px 10px;
          margin-bottom: 15px;
        }
        .artclbyeline-share {
          font-family: "Mukta", sans-serif !important;
          display: flex;
          align-items: center;
          list-style: none;
          width: 100%;
          text-align: left;
          padding: 10px 20px;
          margin-top: 0px;
        }
        .artclbyeline-share li:first-child {
          margin-left: 0;
        }
        .artclbyeline-share li {
          color: #6b6b6b;
          font-size: 14px;
          margin-left: 10px;
          text-transform: uppercase;
          line-height: 0;
          background-color: ${isMobile?"":"#ccc"};
        }
        .spriteshare.art-whatsapp-icon {
          background-position: 0px -150px;
        }
        .spriteshare.art-facebook-icon {
          background-position: 0px 0px;
        }
        .spriteshare.art-telegram-icon {
          background-position: 0 -200px;
        }
        .spriteshare.art-twitter-icon {
          background-position: 0px -50px;
        }
        .spriteshare {
          background: url(/images/siteimages/sprite_img_1.svg)
            0 0 no-repeat;
          width: 40px;
          height: 40px;
          display: block;
        }
        .top_story {
          margin-bottom: 10px;
        }
        .seclftimg {
          width: 50%;
          float: left;
          position: relative;
          overflow: hidden;
        }
        .seclftimg ul {
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
        }
        .seclftimg ul li a {
          position: relative;
          display: block;
        }
        .seclftimg ul li a figure {
          line-height: 0;
          height: 251px;
          overflow: hidden;
          width: 100%;
          margin-bottom: 15px;
        }
        .seclftimg ul li a figure img {
          width: 100%;
          height: 251px !important;
        }
        .seclftimg .frstdsc span {
          font-size: 12px;
          line-height: 24px;
          color: #6d6d6d;
          margin-bottom: 7px;
          display: block;
        }
        .seclftimg .frstdsc span b {
          color: #111111;
        }
        .seclftimg .frstdsc h2 {
          font-size: 20px;
          line-height: 30px;
          color: #111111;
          margin-bottom: 9px;
        }
        .seclftimg .frstdsc p {
          font-size: 16px;
          line-height: 24px;
          color: #111111;
        }

        .seclftlst {
          width: 48%;
          float: right;
        }
        .seclftlst ul {
          justify-content: space-between;
          display: flex;
          flex-wrap: wrap;
        }
        .seclftlst ul li {
          width: 50%;
        }
        .seclftlst ul li {
          padding: 0px 20px 20px 0;
          font-size: 17px;
          line-height: 24px;
          box-sizing: border-box;
          font-weight: 700;
          background: #fff;
          position: relative;
        }
        .seclftlst ul li a {
          color: #232323;
          display: block;
        }
        .seclftlst ul li:hover a {
          color: #ed1b24;
        }
        .seclftlst ul li a figure img {
          width: 100%;
          min-height: 123px;
        }
        .seclftlst ul li a h2 {
          font-size: 16px;
          line-height: 24px;
          color: #111111;
          margin-top: 5px;
        }
        .blglst {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
        }
        .blgrw:nth-child(3n + 1) {
          margin-left: 0;
        }
        .blgrw:nth-child(3n + 3) {
          margin-right: 0;
        }
        .blgrw {
          border-bottom: 1px solid#eee;
          padding-bottom: 10px;
          width: 32%;
          position: relative;
          margin: 0;
          margin-bottom: 20px;
        }
        .blgrw a {
          text-decoration: none;
          color: #000;
        }
        .blog_img img {
          width: 100%;
          display: block;
          height: 185px;
        }
        .blog_title {
          font-size: 16px;
          line-height: 24px;
          height: 70px;
          overflow: hidden;
          margin: 5px 0;
          padding: 0 0 8px;
          font-weight: bold;
        }
        .blgrw:after {
          content: "";
          height: 43px;
          width: 42px;
          top: 15px;
          left: 15px;
          position: absolute;
          -webkit-border-radius: 100px;
          -moz-border-radius: 100px;
          border-radius: 100px;
        }
        .blglvd:after {
          background: url(/images/siteimages/video-iconnew.png)
            no-repeat;
          width: 42px;
          height: 44px;
          top: 30%;
          left: 50%;
          margin: -21px 0 0 -21px;
        }
        .blglph:after {
          position: absolute;
          background: url(https://images.news18.com/ibnkhabar/uploads/assests/img/photoB.png)
            0 0 no-repeat;
          width: 42px;
          height: 44px;
          top: 40%;
          left: 50%;
          margin: -21px 0 0 -21px;
        }
        .mobonly {
          display: none
        }
        figure {
          position: relative;
          line-height: 0;
          flex-shrink: 0;
          overflow: hidden;
        }
        @media (max-width:768px){
          .leftwrap{width:100%;}
          // .rightwrap{display:none;}
        }
        @media (max-width:768px){
          .glblhead.newsml {margin: 0 15px 20px;}
        }
        @media (max-width:768px){
          .descrp {margin: 25px 15px;}
          .blog_img img {
            height: 93px;
          }
          .mobonly {
            display: inherit
          }
        }
        @media (max-width:768px){
          .horosldr {margin: 0 0 30px 20px; overflow: hidden;}
          .horosldr ul li {padding: 15px 10px;  min-width: 115px;}
          .horosldr ul li a h2 { margin-top: 8px;}
          .heading { display: block; padding: 10px 10px;   border: none;}
          .heading h3 { 
            width: 100%; 
            border-bottom: 1px solid #bebebe;
          }
          .navtime { width: 100%; margin-top: 20px; }
        }
        @media (max-width:768px){
          .navtime {margin-bottom: 17px;}
          .navtime span  { padding: 2px 19px 1px 18px;}
          .navtime a {font-size: 14px; line-height: 12px; padding: 2px 22px;}
        }
        @media (max-width:768px){
          .seclftimg {width: auto; margin: 0 20px; float: unset;}
          .seclftlst { width: auto;float: unset; margin: 15px 20px;}
          .seclftlst ul li { padding: 0 0 20px;}
          .seclftlst ul li {width: 48%;}
          .seclftlst ul li a figure {height: 85px;}
          .seclftlst ul li a figure img {height: auto;}
        }
        <!-- @media (max-width:768px){
					.blglst {margin: 0 20px; width: auto;}
					.blgrw { width: 48%;}
				} -->
        .arr_redirect {
          background: #ffffff;
          border: 1px solid #c7c7c7;
          border-radius: 24px;
          color: #343a40;
          display: flex;
          float: left;
          line-height: 16px;
          margin: 0;
          position: relative;
          padding: 0;
          text-transform: capitalize;
          text-align: center;
          align-items: center;
          height: 35px;
          min-width: 35px;
          justify-content: center;
          flex-direction: row;
        }
      `}</style>
    </>
  );
};

export default Rashifal;
