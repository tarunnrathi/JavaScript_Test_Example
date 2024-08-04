import React, { useState, useRef } from "react";
import SelectState from "components/Common/SelectState";
import { loadGS } from "includes/article.util";
import { logEvent } from "includes/googleAnalytic";
import Search from "widgets/Common/Search";

const DynaMenu = ({ dynaMenu, pageType }) => {
  const [showStates, setShowStates] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const cse = useRef(false);

  const handleShowChange = () => {
    setShowStates((prev) => !prev);
    if (!showStates) {
      logEvent("Top_Nav_Local18_district", "Click", "राज्य/शहर चुनें");
    }
  };

  const toggleSearchBar = (e) => {
    // e.preventDefault();
    setSearchBar(!searchBar);
    // if (!cse.current) {
    //   loadGS();
    //   cse.current = true;
    // }
  };

  return (
    <>
      <div className="nav_wapper">
        <nav id="navigation" className="navigationMain">
          <div className="container">
            <ul className="nav_bar dflex">
              {dynaMenu?.length &&
                dynaMenu?.map((menu) => {
                  return (
                    <li key={menu?.slug} className="nav_bar_li">
                      <a href={menu?.url} className="lvtv-fnt">
                        {/* { menu.slug === 'mobiles'?  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="10" viewBox="0 0 23 12">
  <g id="Group_553" data-name="Group 553" transform="translate(-731 -212)">
    <rect id="Rectangle_1" data-name="Rectangle 1" width="23" height="12" rx="2" transform="translate(731 212)" fill="#db3832"/>
    <path id="Path_1" data-name="Path 1" d="M5.391,0H3.51L1.71-4.833q.09.711.14,1.256T1.9-2.286V0H.585V-6.237H2.421L4.266-1.395a14.68,14.68,0,0,1-.2-2.322v-2.52H5.391Zm4.833-5.184h-2.2V-3.69H9.945v1.035H8.028v1.593h2.349V0H6.552V-6.237h3.825ZM17.19,0H15.273L14.5-4.761,13.68,0H11.808L10.782-6.237h1.476l.621,5.121.864-5.121h1.548l.81,5.121.729-5.121h1.4Z" transform="translate(733.415 221.237)" fill="#fff"/>
  </g>
</svg>
  :"" }  */}
                        {menu?.label}
                      </a>
                    </li>
                  );
                })}
            </ul>
            <div className="header_search">
              <a onClick={handleShowChange} className="chsstctbtn">
                राज्य/शहर चुनें
              </a>
              <span
                className="top_search_icond"
                id="search-click"
                onClick={toggleSearchBar}
              />
              <a href="/livetv/" className="top_livetvbtn">
                लाइव टीवी
              </a>
            </div>
            {/* <div
              id="search-box"
              dangerouslySetInnerHTML={{
                __html: "<gcse:search></gcse:search>",
              }}
            ></div> */}
          </div>

          <SelectState
            showStates={showStates}
            handleShowChange={handleShowChange}
            // districtList={districtList}
          />
        </nav>
      </div>
      {searchBar && <Search pageType={pageType} handleClose={() => setSearchBar(false)}/>}
      <style jsx global>
        {`
          .dflex {
            display: flex;
          }

          .container {
            position: relative;
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
            border-bottom: "1px solid #d4d4d4";
            box-shadow: "0 0 10px #3333334f";
            height: 50px;
          }

          .navigationMain {
            font-family: "Mukta", sans-serif;
            width: 100%;
            background: #f5f5f5;
          }
          .nav_bar_li {
            margin-right: 25px;
            list-style: none;
            position: relative;
            padding: 10px 0 6px 0;
          }

          ul.nav_bar li a {
            font-size: 16px !important;
            color: #222;
            font-weight: 700 !important;
            padding: 0 3px;
            display: block;
            position: relative;
          }
          ul.nav_bar li a svg {
            position: absolute;
            right: 3px;
            top: -7px;
          }

          .header_midd {
            height: 120px;
            width: 100%;
          }

          ul.nav_bar {
            padding-left: "40px";
          }

          ul.nav_bar li a:hover {
            color: #e1261d;
          }
          .header_search {
            display: flex;
            align-items: center;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
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
            content: "";
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
          .top_search_icond {
            position: relative;
            height: 36px;
            padding: 0 20px;
            border-left: 1px solid #ccc;
            cursor: pointer;
          }

          .top_search_icond:after,
          .top_search_icond:before {
            content: "";
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

          .top_livetvbtn {
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

          .top_livetvbtn:after,
          .top_livetvbtn:before {
            content: "";
            position: absolute;
          }

          .top_livetvbtn:after {
            width: 4px;
            height: 5px;
            left: 14px;
            transform: rotate(-45deg);
            top: 3px;
            border-left: 2px solid #fff;
            border-bottom: 2px solid #fff;
          }

          .top_livetvbtn:before {
            width: 11px;
            height: 7px;
            border-radius: 4px;
            border: 2px solid #fff;
            left: 10px;
            top: 9px;
          }

          #search-box {
            position: absolute;
            top: 48px;
            background: #fff;
            width: 400px;
            padding: 10px 10px 0 10px;
            right: 0;
            display: ${searchBar ? "block" : "none"};
            box-shadow: 0 1px 2px #ccc;
            z-index: 999;
          }
        `}
      </style>
    </>
  );
};

export default DynaMenu;
