//import { districtList } from 'includes/district.helper';
import React, { Fragment, useState } from "react";
import { logEvent } from "includes/googleAnalytic";

export default function SelectState(props) {
  const [stateDetail, setStateDetail] = useState(-1);
  const { districtList, filteredItems, state, setState } = props;

  const handleChange = ({ target }) => {
    setState(target.value);
  };
  const showStateDetail = (target) => {
    setStateDetail((prev) => (target == prev ? -1 : target));
  };
  const topCityData = (itemData) => {
    const { stateData } = districtList;
    const { cityData } = districtList;
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
        className={`tpchsstctpopupwrap ng-scope ${
          props.showStates ? "adclstpchsstctpopupwrap" : ""
        }`}
      >
        <div
          className={`tpchsstctpopup ${
            props.showStates ? "adclstpchsstctpopup" : ""
          }`}
        >
          <a
            onClick={props.handleShowChange}
            id={"close button"}
            className="chsstctbtnclose cp_local18_widget"
          ></a>
          <div className="tpchsstctpopup-in">
            <div className="tpchsstctpopuphd">अपना शहर चुनें</div>
            <div className="tpchsstctnames">
              <input
                type="text"
                className="search-icons ng-pristine ng-untouched ng-valid ng-empty"
                placeholder="अपना शहर चुनें"
                onChange={handleChange}
              />
              <div className="state-div1 tpctlits ng-hide">
                <ul className="autoboxinner">
                  {state && !filteredItems.length ? (
                    <li style={{ width: "auto" }} key={-1}>
                      No filtered items
                    </li>
                  ) : null}
                  {filteredItems && filteredItems.length > 0
                    ? filteredItems.map((item, index) => (
                        <Fragment key={index}>
                          {index < 20 && (
                            <li
                              key={`RHS_${item.id}${index}`}
                              className="ng-scope filter cp_local18_widget"
                            >
                              <a
                                onClick={() => {
                                  logEvent(
                                    "Local18_Select",
                                    "Click ",
                                    item.name
                                  );
                                }}
                                href={topCityData(item)}
                                className="cp_local18_widget"
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
            </div>
            <span className="tpchsstcthd">राज्य</span>
            <div className="tpstatesnames">
              {districtList?.stateData &&
                districtList?.stateData.map((item, index) => (
                  <ul key={index}>
                    {item.child && item.child.length > 0 ? (
                      <li
                        onClick={() => showStateDetail(index)}
                        className={
                          stateDetail === index
                            ? "active cp_local18_widget"
                            : "cp_local18_widget"
                        }
                      >
                        <a className="cp_local18_widget">{item.name}</a>
                        <div className="tpstatesnames-sublist">
                          {item.child && item.child.length > 0
                            ? item.child.map((element, childIndex) => (
                                <Fragment
                                  key={`${index}-${childIndex}`}
                                >
                                  <a
                                    onClick={() => {
                                      logEvent(
                                        "Local18_Select",
                                        "Click ",
                                        element.name
                                      );
                                    }}
                                    className="cp_local18_widget"
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
                        className="ng-scope no-filter test noArrow cp_local18_widget"
                      >
                        <a
                          onClick={() => {
                            logEvent("Local18_Select", "Click ", item.name);
                          }}
                          className="cp_local18_widget"
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
        .tpstatesnames-sublist a {
          box-sizing: border-box;
          width: 50%;
          font-size: 13px;
          padding: 15px 15px 5px 15px;
          font-weight: normal;
        }
        .tpchsstctpopupwrap.adclstpchsstctpopupwrap {
          transition: 0.2s ease-in-out;
          visibility: visible;
          opacity: 1;
        }
        .tpchsstctpopupwrap {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.4);
          transition: 0.2s ease-in-out;
          visibility: hidden;
          opacity: 0;
          z-index: 999999;
        }
        .tpchsstctpopuphd {
          text-align: center;
          color: #e1261d;
          font-size: 24px;
          line-height: 36px;
          margin: 15px 0;
          font-weight: bold;
        }
        .tpchsstctpopup-in {
          overflow-y: scroll;
          overflow-x: hidden;
          width: 295px;
          height: 100%;
          margin-left: 24px;
          background: #f7f7f7;
          box-shadow: 0px -5px 10px #777;
        }
        .tpchsstctpopup.adclstpchsstctpopup {
          right: 0px;
          transition: all 0.5s ease-in-out;
        }
        .tpchsstctpopup {
          position: fixed;
          top: 0;
          bottom: 0;
          right: -306px;
          z-index: 20;
          width: 306px;
          overflow: hidden;
          transition: all 0.5s ease-in-out;
        }
        .chsstctbtnclose {
          background: #ee1c25;
          width: 48px;
          height: 48px;
          border-radius: 100%;
          position: absolute;
          top: 5px;
          left: 0px;
          z-index: 1;
          cursor: pointer;
        }
        .chsstctbtnclose:hover {
          background: #000;
        }
        .chsstctbtnclose:after {
          transform: rotate(-45deg);
        }
        .chsstctbtnclose:before,
        .chsstctbtnclose:after {
          content: "";
          position: absolute;
          width: 3px;
          height: 24px;
          background: #fff;
          top: 12px;
          left: 22px;
        }
        .chsstctbtnclose:before {
          transform: rotate(45deg);
        }
        .tpchsstctnames {
          margin: 0 8px;
        }
        .tpchsstctnames input {
          color: #606060;
          font-size: 14px;
          height: 44px;
          border: none;
          box-sizing: border-box;
          background: #e3e3e3
            url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/srchstcticon_1607493720.png)
            18px 50% no-repeat;
          border-radius: 16px;
          outline: none;
          width: 100%;
          padding: 0 10px 0 45px;
        }
        .tpctlits ul {
          display: flex;
          padding: 10px 0 0 20px;
          flex-wrap: wrap;
          box-sizing: border-box;
        }
        .tpctlits ul li {
          width: 50%;
          font-size: 14px;
          margin: 12px 0;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/ctlisticon_1607493481.png)
            0 0 no-repeat;
          box-sizing: border-box;
          padding-left: 28px;
        }
        .tpchsstcthd {
          background: #fff;
          border-bottom: 2px solid #e1261d;
          text-transform: uppercase;
          font-size: 16px;
          padding: 15px 20px 12px 20px;
          box-shadow: 0px 3px 6px #00000029;
          color: #444;
          display: block;
        }
        .tpstatesnames ul li a {
          font-size: 14px;
          padding: 11px 20px;
          color: #222;
          display: block;
          line-height: 20px;
        }
        .tpstatesnames ul li.active a {
          font-weight: bold;
        }
        .tpstatesnames ul li.active:before {
          content: "";
          background: #e3e3e3;
          width: 35px;
          height: 30px;
          position: absolute;
          top: 4px;
          right: 10px;
          border-radius: 5px 5px 0 0;
        }
        .tpstatesnames ul li.active:after {
          transform: rotate(-225deg);
          top: 18px;
          transition: 0.2s ease-in-out;
        }
        .tpstatesnames ul li:after {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          border-left: 2px solid #606060;
          border-bottom: 2px solid #606060;
          transform: rotate(-45deg);
          top: 14px;
          right: 24px;
          transition: 0.2s ease-in-out;
        }
        .tpstatesnames ul li.noArrow:after {
          display: none;
        }
        .tpstatesnames ul {
          flex-wrap: wrap;
          box-sizing: border-box;
        }
        .tpstatesnames ul li.active .tpstatesnames-sublist {
          display: flex;
          flex-wrap: wrap;
        }
        .tpstatesnames-sublist {
          display: none;
          background: #e3e3e3;
          border-radius: 0 0 15px 15px;
          margin: -8px 10px 0 10px;
          padding: 0px 0 10px 0;
        }
        .tpstatesnames ul li {
          position: relative;
          cursor: pointer;
        }
        .noarrow::after {
          display: none;
        }
        .tpstatesnames li.active div a {
          font-weight: normal;
        }
        .tpchsstctpopup.adclstpchsstctpopup {
          right: 0px;
          transition: all 0.5s ease-in-out;
        }
        body {
          overflow: ${props.showStates ? "hidden" : ""};
        }
        li {
          list-style: none;
        }
        a {
          text-decoration: none;
          color: #000;
        }
      `}</style>
    </>
  );
}
