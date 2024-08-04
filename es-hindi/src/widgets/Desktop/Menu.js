import React, { useState } from "react";
import ReactHtmlParser from "html-react-parser";
import { arrayOnly } from "includes/article.util";
import IplHeader from "components/Cricketnext/IplHeader";
import SeriesSubMenuWidget from "./SeriesSubMenuWidget";
import NewIcon from "../../components/Common/icon/newIcon.js";
import dynamic from "next/dynamic";
import "lazysizes";

const NormalNavBar = dynamic(() => import("./NormalNavBar"));
const WorldCupMenu = dynamic(() => import("./WorldCupMenu"));
// const T20WorldCupMenu = dynamic(() => import("./T20WorldCupMenu"));


const Menu = ({
  menuData = {},
  // districtList = {},
  isHome = false,
  isCricketNext,
  current = 0,
  isIpl,
  isWorldCup,
  crMenu = [],
  isT20,
  pageType,
  activeId,
  mostRunsData,
  mostWickets,
  pointsTableData
}) => {
  const showHamburger = isHome;
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuDetails = [{ label: "logo" }, ...arrayOnly(menuData?.["MENU-L1"])];
  const mainMenu = arrayOnly(menuData?.["MENU-L1"]);
  const otherMenu = arrayOnly(menuData?.["MENU-L2"]);
  return (
    <>
      <div className="nav_wapper">
        {!isIpl && (
          <NormalNavBar
            menuDetails={menuDetails}
            isCricketNext={isCricketNext}
            setToggleMenu={setToggleMenu}
            showHamburger={showHamburger}
            toggleMenu={toggleMenu}
            // districtList={districtList}
            crMenu={crMenu}
            current={current}
            pageType={pageType}
          />
        )}

        {(isT20 || isWorldCup) && (
          <WorldCupMenu isWorldCup={isWorldCup} activeId={activeId} mostRunsData={mostRunsData} mostWickets={mostWickets} isT20={isT20} pointsTableData={pointsTableData} />
        )}
        <div
          className={!toggleMenu ? "open_nav" : "open_nav active"}
          id="open-nav"
        >
          <div className="open_nav_sub">
            <ul className="sub-links clearfix">
              {mainMenu.length !== 0 &&
                mainMenu.map((menuList, index) => {
                  return (
                    <li key={index}>
                      <>
                        <a
                          href={menuList.url ? menuList.url : menuList.link}
                          title={menuList.label}
                          className="header_hamburger_l1"
                        >
                          {ReactHtmlParser(menuList.label)}
                        </a>
                      </>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="sub_links">
            <ul>
              {otherMenu &&
                otherMenu.length !== 0 &&
                otherMenu.map((leftM, index) => {
                  return (
                    <li key={index}>
                      <>
                        <a
                          href={leftM.url ? leftM.url : leftM.link}
                          title={leftM.label}
                        >
                          {ReactHtmlParser(leftM.label)}
                        </a>
                      </>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <div className="subNavWrap">
        {/* sub navigation start here */}
        {isIpl ? <IplHeader activeId={activeId} /> : null}
        {!isCricketNext ? (
          <div id="sub_navigation" className="subnavg">
            <div className="container">
              <ul className="subnavg_ul">
                {otherMenu &&
                  otherMenu.length !== 0 &&
                  otherMenu.map((leftM, index) => {
                    return (
                      <li key={index + "-sub_menu"} className="subnavg_li">
                        <a
                          href={leftM.url ? leftM.url : leftM.link}
                          title={ReactHtmlParser(leftM.label)}
                          className="header_l2"
                        >
                          {ReactHtmlParser(leftM.label)}
                          {leftM?.highlight_new === "1" && (
                            <NewIcon
                              styleStr={`.subnavg_li svg {position: absolute;top: 5px; right: -17px; height: 12px;}`}
                            />
                          )}
                        </a>
                      </li>
                    );
                  })}
                  <li key={"100-sub_menu"} className="subnavg_li">
                    <a
                        href="https://www.news18.com/missionswachhtapaani/"
                        title="Mission Paani"
                        className="header_l2"
                      >
                      <img
                        src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/mission_paani.jpg"
                        alt="Mission Paani"
                        title="Mission Paani"
                        height="25"
                        width="103"
                      />
                    </a>
                </li>
                <li key={"100-sub_menu_loca18"} className="subnavg_li">
                    <a
                        href="/local18/?utm_source=header&utm_medium=desktop&utm_campaign=local18_branding"
                        title="loca18"
                        className="header_l2 hp_local18_logo"
                      >
                      <img
                        src="/images/logos/local18Desk.png"
                        alt="loca18"
                        title="local18"
                        height="31"
                        width="85"
                        className="hp_local18_logo"
                        id="loca18 logo"
                      />
                    </a>
                </li>
                {/* <li key={"100-sub_menu"} className="subnavg_li"> */}
                {/* <a href="https://www.news18.com/netrasuraksha/" title="Netra Suraksha">
                  <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/netra-suraksha.jpg" alt="Netra Suraksha" title="Netra Suraksha" />
                </a> */}
                {/* </li> */}
                {/* <li key={"sub_menu"} className="subnavg_li impressionclick"
                  dangerouslySetInnerHTML={{
                    __html: `
                    <a href="https://www.news18.com/younggenius/" onclick="ga('send', 'event', 'Navigation', 'Click', 'byjus_logo_hin')" target="_blank" title="Hindi home page">
                      <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/byjus-young-genius.jpg" alt="Young Genius" title="Young Genius"/>
                    </a>
                    `
                  }}
                ></li> */}

                {/* <li key={"sub_menu"} className="subnavg_li impressionclick"
                  dangerouslySetInnerHTML={{
                    __html: `
                    <a href="https://hindi.news18.com/crypto-ki-samajh/" onclick="ga('send', 'event', 'Navigation', 'Click', 'cryptokisamaj_logo_hin')" target="_blank" title="Hindi home page">
                      <img src="https://images.news18.com/ibnkhabar/uploads/2021/09/logo-103x25.jpg" alt="Crypto ki Samajh" title="Crypto ki Samaj"/>
                    </a>
                    `
                  }}
                >
                </li> */}
              </ul>
            </div>
          </div>
        ) : null}
        {isCricketNext && pageType === "series" && (
          <SeriesSubMenuWidget seriesMenuData={menuData?.seriesMenuData} />
        )}
        {/* sub navigation end here */}
      </div>

      <style jsx global>{`
        .hamburgerMenuCls{
          display: inline-block;
          width: 25px;
          height: 21px;
          position: absolute;
          top: 25%;
          cursor: pointer;
        }
        .navigationMain {
          font-family: 'Mukta', sans-serif;
          width: 100%;
          background: #f5f5f5;
          line-height:32px;
        }
        .dflex {
          display: flex;
        }

        .container {
          position: relative;
          margin: auto;
        }

        .sec_nav ul li a {
          font-size: 14px;
          padding: 13px 15px;
          display: block;
          font-family: Lato, sans-serif;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sec_nav {
          border-top: 1px solid #d4d4d4;
          box-shadow: 2px 2px 18px rgba(0, 0, 0, 0.4);
          margin-bottom: 15px;
        }

        .sec_nav ul li a {
          color: #1c1c1c;
          padding: 0 15px;
          font-weight: 400;
          font-size: 13px;
          text-transform: capitalize;
        }

        .sec_nav ul {
          height: 45px;
        }

        ul.sub_menu {
          position: absolute;
          left: 0;
          top: 37px;
          background: #fff;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          z-index: 1;
          width: 350px;
          display: none;
        }

        ul.sub_menu li a {
          display: flex;
          align-items: center;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.6;
        }

        ul.sub_menu li figure {
          padding-right: 10px;
        }

        ul.sub_menu li {
          border-top: 1px solid #fbf9f9;
          border-bottom: 1px solid #e0e0e0;
          margin-right: 10px;
        }

        ul.sub_menu li:first-child a {
          font-weight: 700;
          line-height: 1.5;
        }

        a.header_search:after,
        a.header_search:before {
          position: absolute;
          content: '';
        }

        a.header_search:before {
          width: 11px;
          height: 11px;
          border-radius: 100%;
          border: 2px solid #888;
          left: -20px;
          top: 0;
        }

        a.header_search:after {
          width: 3px;
          height: 10px;
          background: #888;
          border-radius: 30px;
          left: -5px;
          transform: rotate(-45deg);
          top: 11px;
        }

        a.header_search {
          margin-top: 3px;
          position: relative;
          height: 22px;
        }

        .searchandtv {
          display: flex;
          align-items: center;
        }

        #seacrh_box {
          position: absolute;
          top: 48px;
          background: #fff;
          width: 400px;
          padding: 10px 10px 0;
          right: 0;
          display: none;
          box-shadow: 0 1px 2px #ccc;
        }

        .top-nav ul li > a:hover {
          color: #ee1b24;
        }

        .open_nav {
          position: absolute;
          background: #f5f5f5;
          width: 100%;
          top: 0;
          padding: 20px;
          box-shadow: 0 7px 10px -2px rgba(0, 0, 0, 0.3);
          left: 0;
          z-index: 9;
          display: none;
          margin: 0 -10px;
          z-index: 9;
          display: none;
          padding-top: 40px;
          padding-bottom: 0;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        .sub-links {
          display: flex;
          flex-flow: wrap;
        }

        .sub-links li {
          width: 13%;
          padding: 8px 0;
        }

        .sub-links li a {
          padding: 0;
        }

        a.opne_nav {
          top: 14px;
          right: 15px;
          left: 0;
          background: 0 0;
          padding-top: 12px;
          border-bottom: 2px #222 solid;
          position: absolute;
          width: 18px;
          z-index: 10;
        }

        a.opne_nav span:after,
        a.opne_nav span:before {
          content: '';
          width: 18px !important;
          height: 2px !important;
          background: #222;
          display: block;
          position: absolute;
        }

        a.opne_nav span:before {
          top: 2px !important;
        }

        a.opne_nav span:after {
          top: 7px !important;
        }

        .sub_links{
          background-color: #fff;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .sub-links > li > a{
          font-size: 14px;
          color: #000;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* .. {
    padding-left: 15px
} */

        .sec_nav ul li:first-child a {
          padding-left: 0;
        }

        .sec_nav .container {
          padding: 0;
        }

        a.opne_nav.addcls {
          border-color: #fff;
          top: 20px;
        }

        a.opne_nav.addcls span:after {
          top: 0 !important;
          transform: rotate(45deg);
          background: #bd1e24;
        }

        a.opne_nav.addcls span:before {
          top: 0 !important;
          transform: rotate(-45deg);
          background: #bd1e24;
        }
        .nav_open,
        .nav_open:after,
        .nav_open:before {
          content: '';
          width: 25px;
          height: 2px;
          background: #222;
          display: block;
          position: absolute;
          transition: all 0.5s ease-in-out;
          top: 9px;
          cursor: pointer;
        }

        .nav_open {
          top: 50%;
          transform: translateY(-50%);
        }

        .nav_open:after {
          top: 7px;
        }

        .nav_open:before {
          top: -7px;
        }

        .nav_bar_li {
          margin-right: 27px;
          list-style: none;
          position: relative;
          padding: 10px 0 6px 0;
        }

        .nav_bar li a {
          font-size: 16px;
          color: #222;
          font-weight: 700;
          padding: 0 3px;
          display: block;
          position: relative;
        }
        .nav_bar li a svg {
          position: absolute;
          right: -17px;
          top: -4px;
          height: 12px;
        }

        .header_midd {
          height: 120px;
          width: 100%;
        }

        // .nav_bar {
        //   padding-left: ${!showHamburger ? "40px" : "0"};
        // }

        .nav_bar li a:hover {
          color: #e1261d;
        }

        .top_search_icond {
          position: relative;
          height: 36px;
          padding: 0 20px;
          border-left: 1px solid #ccc;
          cursor: pointer;
        }

        .top_search_icond:after,
        .top_search_icond:before {
          content: '';
          position: absolute;
        }

        .top_search_icond:before {
          width: 12px;
          height: 12px;
          border-radius: 100%;
          border: 2px solid #666666;
          left: 10px;
          top: 8px;
        }

        .top_search_icond:after {
          width: 2px;
          height: 8px;
          background: #666666;
          border-radius: 30px;
          left: 24px;
          transform: rotate(-45deg);
          top: 20px;
        }

        .header_search {
          display: flex;
          align-items: center;
          position: absolute;
          right: -31px;
          top: 50%;
          transform: translateY(-50%);
        }

        .container {
          position: relative;
        }

        .glbl-nav-r {
          float: right;
          position: relative;
          top: 3px;
        }

        .subnavg {
          font-family: 'Mukta', sans-serif;
          background: #fff;
          line-height: 41px;
          box-shadow: 0px 3px 3px #0000001A;
          height: 41px;
          margin-bottom: 15px;
        }

        .subnavg_li a {
          font-size: 15px;
          color: #1c1c1c;
          white-space: nowrap;
        }

        .subnavg_ul {
          display: flex;
        }

        .subnavg_li {
          margin-right: 27px;
          list-style: none;
          position: relative;
        }
        .subnavg_li img { 
          position: relative;
          top: 5px;   
        }
        li.subnavg_li:hover img {
          transform: scale(1) !important;
          transition: unset;
        }
        .subnavg_li svg { 
          position: absolute;
          right: -22px;
          height: 12px;
        }
        .tplvtbtn {
          background: #ed1c24;
          height: 26px;
          line-height: 26px;
          margin-left: 15px;
          color: #fff !important;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 700;
          display: block;
          padding: 0 10px 0 30px;
          border-radius: 25px;
          position: relative;
        }

        .tplvtbtn:after,
        .tplvtbtn:before {
          content: '';
          position: absolute;
        }

        .tplvtbtn:after {
          width: 4px;
          height: 5px;
          left: 14px;
          transform: rotate(-45deg);
          top: 3px;
          border-left: 2px solid #fff;
          border-bottom: 2px solid #fff;
        }

        .tplvtbtn:before {
          width: 11px;
          height: 7px;
          border-radius: 4px;
          border: 2px solid #fff;
          left: 10px;
          top: 9px;
        }

        .chsstctbtn {
          color: #c6080f;
          font-weight: bold;
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          padding: 0 38px 0 10px;
          box-sizing: border-box;
          border-bottom: 3px solid #ee1c25;
          border-left: 1px solid #ccc;
          background: #fff url(/images/siteimages/pinicon_1607493634.png) 92% 50% no-repeat;
          position: relative;
          cursor: pointer;
        }

        .chsstctbtn:before,
        .chsstctbtn:after {
          position: absolute;
          content: '';
          top: 0;
          bottom: 0;
          width: 1px;
          background: #fafafa;
        }

        .chsstctbtn:after {
          right: -2px;
        }

        .chsstctbtn:before {
          left: -2px;
        }

        .open_nav {
          position: absolute;
          background: #f5f5f5;
          width: 100%;
          box-shadow: 0 7px 10px -2px rgba(0, 0, 0, 0.3);
          z-index: 9;
          display: none;
          padding-bottom: 0;
          max-width: 1244px;
          padding: 0px 0px;
          z-index: 99;
          padding-top: 48px;
          border-top: 1px solid #e5e5e5;
        }
        .sub-links li a:hover{
          color:#ee1b24;
        }

        a.opne_nav {
          top: 14px;
          right: 15px;
          left: 0;
          background: 0 0;
          padding-top: 12px;
          border-bottom: 2px #222 solid;
          position: absolute;
          width: 18px;
          z-index: 99;
        }
        a.opne_nav span:after,
        a.opne_nav span:before {
          content: '';
          width: 18px !important;
          height: 2px !important;
          background: #222;
          display: block;
          position: absolute;
        }
        a.opne_nav span:before {
          top: 2px !important;
        }
        a.opne_nav span:after {
          top: 7px !important;
        }
        .navigation {
          padding-left: 15px;
        }
        .sec_nav ul li:first-child a {
          padding-left: 0;
        }
        .sec_nav .container {
          padding: 0;
        }
        a.opne_nav.addcls {
          border-color: #fff;
          top: 20px;
        }
        a.opne_nav.addcls span:after {
          top: 0 !important;
          transform: rotate(45deg);
          background: #bd1e24;
        }
        a.opne_nav.addcls span:before {
          top: 0 !important;
          transform: rotate(-45deg);
          background: #bd1e24;
        }
        .sub_links {
          display: flex;
          border-top: 1px solid #e5e5e5;
          padding: 13px;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          margin-top: 19px;
        }
        .open_nav_sub {
          border-top: 1px solid #e5e5e5;
          padding: 0 20px;
        }

        .header_search {
          z-index: 10;
        }

        .addcls:after {
          content: '';
          z-index: 99;
          top: 0 !important;
          transform: rotate(-45deg);
          background: #bd1e24;
        }

        .addcls:before {
          content: '';
          top: 0 !important;
          transform: rotate(45deg);
          background: #bd1e24;
        }

        .addcls {
          z-index: 999;
          background: transparent;
        }

        .sub_links ul {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .sub_links ul li a {
          font-size: 14px;
          color: #555;
          float: left;
          margin-right: 40px;
          font-weight: 400;
        }
        .sub_links ul li a:hover{
          color:#ee1b24;
        }
        .open_nav.active {
          display: block;
          top: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
        .nav_wapper {
          border-bottom: 1px solid #d4d4d4;
          box-shadow: 0px 6px 0px #fff;
          position: sticky;
          left: 0;
          top: 0;
          z-index: 9;
          width: 100%;
          background: #f5f5f5;
          border-bottom: ${isCricketNext ? "1px solid #d4d4d4;" : ";"} 
          box-shadow: ${isCricketNext ? "0 0 10px #3333334f;" : ";"}
          height:50px;
        }


        .submenu_boxwrap {
          width: 500px;
          position: absolute;
          left: 0;
          top: 37px;
          z-index: 10;
          overflow: hidden;
          min-height: 210px;
          padding: 15px 15px 15px 0;
          box-sizing: border-box;
          background-color: #fff !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          display: flex;
        }
        .submenu_boxwrap p {
          color: #000;
          font-size: 20px;
          line-height: 20px;
        }
        .submenu_boxwrap.nomoredropdown {
          width: 350px;
          padding: 15px;
        }
        .submenu_boxwrap a {
          display: flex;
          font-size: 13px;
          line-height: 18px;
          color: #333;
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          text-transform: initial;
          padding: 6px 0;
          border-bottom: 1px solid #ccc;
        }
        .submenu_boxwrap a:first-child {
          font-weight: 700 !important;
          border-left: none;
          padding-left: 0;
          color: #333;
          padding-top: 0px;
          border-top: none;
        }
        .submenu_boxwrap a:last-child {
          border-bottom: 0px;
        }
        .submenu_boxwrap a img {
          width: 78px;
          height: 52px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .nav_hover li:hover {
          box-shadow: inset 0 -4px 0 #e1261d;
        }
        .nav_hover li:hover .submenu_boxwrap {
          display: block;
        }
        .submenu_boxwrap ul {
          box-sizing: border-box;
          background: #fff;
          min-height: 220px;
          overflow-y: scroll;
          height: 320px;
        }
        .submenu_boxwrap ul li {
          color: #000;
          font-size: 14px;
        }
        .submenu_boxwrap ul li > a:first-child {
          height: 30px;
          line-height: 30px;
          width: 150px;
          border-bottom: none;
          color: #000;
          font-weight: 400 !important;
          padding: 0;
          font-size: 13px;
          position: relative;
          margin-right: 5px;
          line-height: 30px;
        }
        .submenu_boxwrap ul li > a:first-child span {
          position: relative;
          z-index: 1;
          padding-left: 10px;
        }
        .submenu_boxwrap ul li > a:first-child::before,
        .submenu_boxwrap ul li a:first-child::after {
          content: '';
          position: absolute;
          transition: all 0.3s ease-in-out;
          z-index: 1;
        }
        .submenu_boxwrap ul li > a:first-child:before {
          background: #ed1c24;
          width: 0%;
          top: 0;
          bottom: 0;
        }
        .submenu_boxwrap ul li > a:first-child:after {
          border-top: 16px solid transparent;
          border-bottom: 16px solid transparent;
          border-right: 16px solid #fff;
          left: 0;
          margin-left: -16px;
          top: 0;
        }
        .submenu_boxwrap ul li:hover > a:first-child:before {
          width: 100%;
          transition: all 0.3s ease-in-out;
        }
        .submenu_boxwrap ul li:hover > a:first-child:after {
          transition: all 0.3s ease-in-out;
          left: 100%;
        }
        .submenu_boxwrap ul li:hover > a:first-child span {
          color: #fff;
        }
        .innerSubmenu {
          width: 350px;
          position: absolute;
          left: 153px;
          top: 15px;
          bottom: 0;
          min-height: 210px;
          background: #fff;
          padding-left: 10px;
          padding-right: 15px;
        }
        .outterSubmenu {
          width: 350px;
        }
        .for-logo {
          display: none !important;
        }
        .topnav {
          z-index: 1;
        }
        ${showHamburger ? ".nav_open{display: none !important;}" : ""}
        .impressionclick { margin-top: 6px; }

        .CN-menu2-wrapper {
          box-shadow: 0px 3px 6px #00000029;
          border-top: 1px #D4D4D4 solid;
          border-bottom: 1px #D4D4D4 solid;
          position: sticky;
          z-index: 9;
          top: 48px;
          background: #fff;
        }
        .CN-menu2-wrapper .CN-menu2-inner {
            margin: 0 auto;
            max-width: 1244px;
            display: flex;
        }
        .CN-menu2-wrapper .CN-menu2 {
          display: flex;
          align-items: center;
        }
        .CN-menu2-wrapper .CN-menu2 > li {
          margin-right: 15px;
        }
        .CN-menu2-wrapper .CN-menu2 > li >a {
          text-transform: uppercase;
          font-size: 15px;
          font-family: 'Mukta',sans-serif;
          color: #000;
          display: block;
          padding: 11px 10px;
        }
        .CN-menu2-wrapper .series-navBtn{
          font-size: 14px;
          font-family: 'Mukta',sans-serif;
          font-weight: bold;
          padding: 4px 10px;
          background: #e1261d;
          color: #fff;
          display: flex;
          text-transform: uppercase;
          border-radius: 5px;
          margin-right: 15px;
          align-self: center;
        }
        .submenu_boxwrap ul{
          overflow-x: hidden;
        }
        
        .submenu_boxwrap ul::-webkit-scrollbar-track{
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
          background-color: #F5F5F5;
        }
        
        .submenu_boxwrap ul::-webkit-scrollbar{
          width: 6px;
          background-color: #F5F5F5;
        }
        
        .submenu_boxwrap ul::-webkit-scrollbar-thumb{
          background-color: #999;
        }
        .subNavWrap{
          position : relative;
          // ${isCricketNext ? "" : "height:60px;"} 
        }
        
        .nav_wapper{height:50px}
        .CN-menu2-wrapper ul li.active a {
          color: #e1261d;
          font-family: 'Segoe Pro Bold' ,system-ui;
          position: relative;
          font-weight: bold;
        }
        .CN-menu2-wrapper .CN-menu2>li.active>a::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          background: #e1261d;
          left: 0;
          bottom:0;
      }
      `}</style>
    </>
  );
};

export default Menu;
