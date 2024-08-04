import React from "react";

const ScoresWidgetCommon = () => {
  return (
    <>
      <div className="clearfix  scr-strp">
        <div className="hgt_m">
        </div>
      </div>
      <style global jsx>{`
        .scr-strp {
          margin-bottom: 0;
        }
        .clearfix {
          clear: both;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .hgt_m {
          box-shadow: 0 0 5px #e0dfdf;
        }
        .scrvns.livemtch {
          border-bottom: 1px solid #fc7474;
          padding: 1px 16px 6px 44px;
          height: 24px;
          box-sizing: border-box;
          overflow: hidden;
          line-height: 25px;
        }
        .scrvns {
          font-size: 12px;
          color: #292627;
          background: #ebebeb;
          padding: 6px 16px;
          border-bottom: 1px solid #d8d7d7;
          position: relative;
        }
        .lvbtn {
          background: red;
          width: 36px;
          text-align: center;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          line-height: 26px;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
        }
        .scrvns b {
          display: block;
        }
        .scrd-mtchdetl2 {
          padding: 12px 0;
          height : 98px;
        }
        .scrd-mtchdetl2 li.off {
          opacity: 0.7;
        }
        .county-name {
          line-height: 1;
          margin-bottom: 3px;
          display: flex;
          align-items: center;
        }
        .county-name img {
          width: 34px;
          margin-right: 5px;
        }
        .county-name strong {
          font-size: 13px;
        }
        .scrd-mtchdetl2 li .ingns {
          position: relative;
          margin: 0 0 0 40px;
          font-size: 12px;
          color: #737373;
          line-height: 18px;
          top: -6px;
        }

        
        .hgt_m {
          box-shadow: 0 0 5px #e0dfdf;
        }
        .scrd {
          padding: 12px 0;
        }
        .scrvns {
          font-size: 12px;
          color: #292627;
          background: #ebebeb;
          padding: 6px 16px;
          border-bottom: 1px solid #d8d7d7;
          position: relative;
        }
        .scrvns b {
          display: block;
        }
        .scrd-mtchdetl {
          padding: 12px 0;
        }
        .scrd-mtchdetl li {
          float: left;
          width: 29%;
          padding: 0 5%;
        }
        .scrd-mtchdetl li:first-child {
          border-right: 1px solid #e1e0e1;
          width: 50%;
        }
        .scrd-mtchdetl li .tms {
          margin: 8px 0;
        }
        .scrd-mtchdetl li .tms span {
          font-size: 12px;
          font-weight: 700;
          width: 40%;
          float: left;
        }
        .scrd-mtchdetl li .tms span:first-child {
          text-align: right;
        }
        .scrd-mtchdetl li .tms span:last-child {
          text-align: left;
        }
        .scrd-mtchdetl li .tms span:nth-child(2) {
          font-weight: 400;
          width: 20%;
          text-align: center;
          line-height: 18px;
        }
        .scrd-mtchdetl li .tms span img {
          vertical-align: middle;
          border: 1px solid #cacaca;
          margin: 0 4px;
        }
        .scrd-mtchdetl li .mtchstrt {
          font-size: 12px;
          color: #292627;
        }
        .scrd-mtchdetl li .mtchstrt span {
          font-size: 24px;
          font-weight: 700;
          line-height: 24px;
        }
        .scrd-ntfy {
          background: #001636;
          height: 24px;
          text-align: center;
          padding: 4px 16px;
          box-sizing: border-box;
          color: #fff;
          font-size: 12px;
          line-height: 18px;
        }
        .txtcaps {
          text-transform: uppercase;
        }
        .scrvns.livemtch {
          border-bottom: 1px solid #fc7474;
          padding: 1px 16px 6px 44px;
          height: 24px;
          box-sizing: border-box;
          overflow: hidden;
          line-height: 25px;
        }
        .lvbtn {
          background: red;
          width: 36px;
          text-align: center;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          line-height: 26px;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
        }
        .scrd-mtchdetl2 {
          padding: 12px 0;
          height : 98px;
        }
        .scrd-mtchdetl2 li {
          float: left;
          width: 43%;
          margin: 0 2.9%;
          position: relative;
        }
        .scrd-mtchdetl2 li:first-child {
          border-right: 1px solid #e1e0e1;
        }
        .scrd-mtchdetl2 li .tms {
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          width: 31px;
          position: absolute;
          left: 0;
          top: 0;
        }
        .scrd-mtchdetl2 li .tms img {
          border: 1px solid #cacaca;
          display: block;
          margin-bottom: 4px;
          width: 31px;
        }
        .scrd-mtchdetl2 li .ingns {
          position: relative;
          margin: 0 0 0 40px;
          font-size: 12px;
          color: #737373;
          line-height: 18px;
          top: -6px;
        }
        .scrd-mtchdetl2 li .ingns span {
          color: #292627;
          font-size: 16px;
          font-weight: 700;
        }
        .scrd-mtchdetl2 li.off {
          opacity: 0.7;
        }
        .county-name {
          line-height: 1;
          margin-bottom: 3px;
          display: flex;
          align-items: center;
        }
        .county-name img {
          width: 34px;
          margin-right: 5px;
        }
        .county-name strong {
          font-size: 13px;
        }
      `}</style>
    </>
  );
};

export default ScoresWidgetCommon;
