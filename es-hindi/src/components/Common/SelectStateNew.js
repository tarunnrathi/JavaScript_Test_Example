import React, { Fragment, useState } from "react";
import { logEvent } from "includes/googleAnalytic";
import useDistrict from "hooks/useDistrict";

export default function SelectStateNew(props) {

  const [stateDetail, setStateDetail] = useState(0);
  let [districtList, filteredItems, state, setState] = useDistrict("");
  const [showCities, setShowCities] = useState(false);

  const handleChange = ({ target }) => {
    setState(target.value);
    setShowCities(target.value !== "");
  };
  const topCityData = (itemData) => {
    const stateData = districtList.stateData;
    const cityData = districtList.cityData;
    for (const state of stateData) {
      if (state.id === itemData.parent) {
        return `/news/${state.slug}/${itemData.slug}/`;
      } else {
        if (itemData.parent !== 0) {
          for (const city of cityData) {
            if (city.id === itemData.parent) {
              return `/news/${city.slug}/${itemData.slug}/`;
            }
          }
        } else {
          return `/news/${itemData.slug}/`;
        }
      }
    }
  };
  return (
    <>
      <div
        className={`tpchsstctpopupwrapnw ng-scope ${
          props.showStates ? "adclstpchsstctpopupwrap" : ""
        }`}
      >
        <div
          className={`tpchsstctpopupnw ${
            props.showStates ? "adclstpchsstctpopup" : ""
          }`}
        >
          <a
            onClick={props.handleShowChange}
            id={"शहर चुनें"}
            className="chsstctbtnclosenw hp_local18_select_state"
          ></a>
          <div className="tpchsstctpopup-innw">
            <h2 className="tpchsstctpopuphdnw hp_local18_select_state">
              अपना शहर चुनें
            </h2>
            <div className="tpchsstctnamesnw">
              <input
                type="text"
                className="search-icons ng-pristine ng-untouched ng-valid ng-empty"
                placeholder="अपना शहर चुनें"
                onChange={handleChange}
              />
            </div>
            {showCities && (
              <div className="state-div1 tpctlitsnw ng-hide">
                <ul className="autoboxinner">
                  {state && !filteredItems.length ? (
                    <li style={{ width: "auto" }} key={-1}>
                      <a href="#">No filtered items</a>
                    </li>
                  ) : null}
                  {filteredItems && filteredItems.length > 0
                    ? filteredItems.map((item, index) => (
                        <Fragment key={index}>
                          {index < 20 && (
                            <li
                              key={`RHS_${item.id}${index}`}
                              className="ng-scope filter hp_local18_select_state"
                            >
                              <a
                                onClick={() => {
                                  logEvent(
                                    "Local18_Select",
                                    "Click ",
                                    item.name
                                  );
                                }}
                                className="hp_local18_select_state"
                                href={topCityData(item)}
                              >
                                {item.name}
                              </a>
                            </li>
                          )}
                        </Fragment>
                      ))
                    : null}
                </ul>
              </div>
            )}
            {/* <h3 className="tpchsstcthd">राज्य</h3> */}
            <div className="tpstatesnamesnew">
              {districtList?.stateData &&
                districtList?.stateData.map((item, index) => (
                  <ul key={index}>
                    {item.child && item.child.length > 0 ? (
                      <li
                        onClick={() =>
                          setStateDetail(stateDetail === index ? -1 : index)
                        }
                        className={
                          stateDetail === index
                            ? "active hp_local18_select_state"
                            : "hp_local18_select_state"
                        }
                      >
                        <a className="hp_local18_select_state">{item.name}</a>
                        <div className="tpstatesnamesnew-sublist">
                          {item.child && item.child.length > 0
                            ? item.child.map((element, childIndex) => (
                                <Fragment key={`${index}-${childIndex}`} className="hp_local18_select_state">
                                  <a
                                    onClick={() => {
                                      logEvent(
                                        "Local18_Select",
                                        "Click ",
                                        element.name
                                      );
                                    }}
                                    className="hp_local18_select_state"
                                    href={`/news/${item.slug}/${element.slug}/`}
                                  >
                                    {element.name}
                                  </a>
                                </Fragment>
                              ))
                            : ""}
                        </div>
                      </li>
                    ) : (
                      <li
                        key="RHS_278497_0"
                        className="ng-scope no-filter test noArrow hp_local18_select_state"
                      >
                        <a
                          onClick={() => {
                            logEvent("Local18_Select", "Click ", item.name);
                          }}
                          className="hp_local18_select_state"
                          href={`/news/${item.slug}/`}
                        >
                          {item.name}
                        </a>
                      </li>
                    )}
                  </ul>
                ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .tpstatesnamesnew-sublist a {
          box-sizing: border-box;
          width: 50%;
          font-size: 13px;
          padding: 15px 15px 5px 15px;
          font-weight: normal;
        }
        .tpchsstctpopupwrapnw.adclstpchsstctpopupwrap {
          transition: 0.2s ease-in-out;
          visibility: visible;
          opacity: 1;
        }
        .tpchsstctpopupwrapnw {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgb(232 232 232 / 0.9);
          transition: 0.2s ease-in-out;
          visibility: hidden;
          opacity: 0;
          z-index: 21;
        }
        .tpchsstctpopuphdnw {
          text-align: left;
          color: #ffffff;
          font-size: 20px;
          line-height: 34px;
          margin-bottom: 5px;
          margin-top: 0;
          display: inline-block;
        }
        .tpchsstctpopup-innw {
          overflow-y: auto;
          overflow-x: hidden;
          width: 100%;
          height: 100%;
          margin-left: 0;
          background: #000000;
          box-shadow: 0px -5px 10px #777;
          padding: 20px 25px;
        }
        .tpchsstctpopup.adclstpchsstctpopup {
          right: 0px;
          transition: all 0.5s ease-in-out;
        }
        .tpchsstctpopupnw {
          position: relative;
          top: 0;
          bottom: 0;
          right: 0;
          z-index: 20;
          width: 445px;
          max-height: 595px;
          overflow: hidden;
          transition: all 0.5s ease-in-out;
          margin: 2% auto;
          border-radius: 10px;
        }
        .chsstctbtnclosenw {
          background: transparent;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          position: absolute;
          top: 5px;
          right: 0px;
          z-index: 1;
          cursor: pointer;
          left: unset;
        }
        .chsstctbtnclosenw:hover {
          background: #000;
        }
        .chsstctbtnclosenw:after {
          transform: rotate(-45deg);
        }
        .chsstctbtnclosenw:before,
        .chsstctbtnclosenw:after {
          content: "";
          position: absolute;
          width: 2px;
          height: 16px;
          background: #fff;
          top: 0;
          left: 4px;
        }
        .chsstctbtnclosenw:before {
          transform: rotate(45deg);
        }
        .tpchsstctnamesnw {
          margin: 5px 5px 0;
          display: inline-block;
          float: right;
        }

        .tpchsstctnamesnw input {
          color: #606060;
          font-size: 14px;
          height: 30px;
          border: none;
          box-sizing: border-box;
          background: #fff
            url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/srchstcticon_1607493720.png)
            18px 50% no-repeat;
          border-radius: 20px 20px 0px 0px;
          outline: none;
          width: 100%;
          padding: 0 10px 0 45px;
        }
        .tpctlitsnw ul {
          padding: 1px 0 1px 12px;
          background: #fff;
          border-radius: 0px 0px 20px 20px;
          width: 390px;
          margin-top: -4px;
          margin-bottom: 7px;
          max-height: 150px;
          overflow: auto;
          overflow-x: hidden;
        }
        .tpctlitsnw ul li {
          width: 100%;
          font-size: 14px;
          margin: 3px 3px;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/ctlisticon_1607493481.png)
            0 7px no-repeat;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding-left: 36px;
        }
        .tpchsstcthd {
          background: #fff;
          border-bottom: 2px solid #e1261d;
          text-transform: uppercase;
          font-size: 16px;
          padding: 15px 20px 12px 20px;
          box-shadow: 0px 3px 6px #00000029;
          color: #444;
        }
        .tpstatesnamesnew ul li a {
          font-size: 14px;
          padding: 5px 20px;
          color: #000;
          display: block;
          line-height: 23px;
        }
        .tpstatesnamesnew ul li.active {
          background-color: #727272;
          padding: 0 20px;
          border-radius: 17px;
        }
        .tpstatesnamesnew ul li.active a {
          font-weight: bold;
          color: #fff;
          width: auto;
          padding-left: 0;
        }
        .tpstatesnamesnew ul li.active:before {
          content: "";
          background: #727272;
          width: 35px;
          height: auto;
          position: absolute;
          top: 4px;
          right: 10px;
          border-radius: 5px 5px 0 0;
        }
        .tpstatesnamesnew ul li.active:after {
          transform: rotate(-225deg);
          top: 18px;
          transition: 0.2s ease-in-out;
          border-left: 2px solid #fff;
          border-bottom: 2px solid #fff;
        }
        .tpstatesnamesnew ul li:after {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          border-left: 2px solid #a8a8a8;
          border-bottom: 2px solid #a8a8a8;
          transform: rotate(-45deg);
          top: 13px;
          right: 24px;
          transition: 0.2s ease-in-out;
        }
        .tpstatesnamesnew ul li.noArrow:after {
          display: none;
        }
        .tpstatesnamesnew ul {
          flex-wrap: wrap;
          box-sizing: border-box;
          border: 1px solid #707070;
          border-radius: 20px;
          margin-bottom: 5px;
          background-color: #f1f1f1;
        }
        .tpstatesnamesnew ul li.active .tpstatesnamesnew-sublist {
          display: grid;
          grid-template-columns: 76px 76px 76px 76px;
          column-gap: 10px;
          row-gap: 5px;
          overflow-y: auto;
          height: 100px;
          margin: 0;
        }
        .tpstatesnamesnew-sublist {
          display: none;
          background: #727272;
          border-radius: 0 0 15px 15px;
          margin: -8px 10px 0 10px;
          padding: 0px 0 10px 0;
        }
        .tpstatesnamesnew ul li {
          position: relative;
          cursor: pointer;
        }
        .noarrow::after {
          display: none;
        }
        .tpstatesnamesnew li.active div a {
          font-weight: normal;
        }
        .tpchsstctpopupnw.adclstpchsstctpopup {
          right: 0px;
          transition: all 0.5s ease-in-out;
        }
        // body {
        //   overflow: ${props.showStates ? "hidden" : ""};
        // }
        li {
          list-style: none;
        }
        a {
          text-decoration: none;
          color: #000;
        }
        .tpstatesnamesnew ul li.active > a {
          border-bottom: 1px solid #fff;
          margin-bottom: 10px;
          padding-left: 0;
          font-size: 16px;
          line-height: 27px;
        }
        .tpstatesnamesnew ul li.active a:nth-child(4n + 1) {
          padding-left: 0;
        }
        @media (max-width: 768px) {
          .shrmobwrap {
            height: 840px;
          }
          .tpchsstctpopupwrapnw {
            background-color: #000;
          }
          .tpchsstctpopupnw {
            width: 100%;
            margin: 0;
            max-height: 100%;
            overflow: auto;
          }
          .tpchsstctnamesnw {
            display: block;
            float: none;
            margin: 5px 0;
          }
          .tpchsstctnamesnw input {
            height: 40px;
            font-size: 16px;
            line-height: 27px;
          }
          .tpchsstctpopuphdnw {
            font-size: 18px;
            line-height: 30px;
          }
          .chsstctbtnclosenw {
            top: 14px;
            right: 10px;
          }
          .tpstatesnamesnew ul li.active .tpstatesnamesnew-sublist {
            grid-template-columns: repeat(auto-fill, 126px);
            row-gap: 0px;
          }
          .tpctlitsnw ul {
            width: 100%;
          }
        }
        .tpctlitsnw .autoboxinner li a {
          border-bottom: 1px solid #ddd;
          width: 95%;
          display: block;
          padding: 6px 0;
        }
        .tpctlitsnw .autoboxinner li:last-child a {
          border: 0;
        }
        .tpctlitsnw {
          margin-top: 0px;
        }
      `}</style>
    </>
  );
}
