import { useState } from 'react';
const ResultHeadBlock = ({
  head,
  subHead,
  resultFirst,
  resultSecond,
  resultText,
  short,
  temp,
  fullText,
  resultAS,
  isFullScreen
} = {}) => {
  const [showPopup, setShowPop] = useState(false);

  return (
    <>
      {/* <div>
        <h3 className="rsstnm">
          {temp ? `WMWM${short}KAXW` : head}{" "}
          {short == "RJ" ? (
            <>
              <svg
                id="info_Iconn"
                xmlns="http://www.w3.org/2000/svg"
                width="14.145"
                height="14.145"
                viewBox="0 0 14.145 14.145"
                onClick={() => setShowPop((p) => !p)}
              >
                <path
                  id="i_button"
                  d="M7.8-8.5H9.2V-9.928H7.8ZM8.5-.7a5.668,5.668,0,0,1-4-1.677,5.668,5.668,0,0,1-1.677-4,5.668,5.668,0,0,1,1.677-4,5.668,5.668,0,0,1,4-1.677,5.668,5.668,0,0,1,4,1.677,5.668,5.668,0,0,1,1.677,4,5.668,5.668,0,0,1-1.677,4A5.668,5.668,0,0,1,8.5-.7Zm0-12.75a7.03,7.03,0,0,0-5.014,2.059A7.03,7.03,0,0,0,1.428-6.375,7.03,7.03,0,0,0,3.486-1.361,7.03,7.03,0,0,0,8.5.7a7.03,7.03,0,0,0,5.014-2.059,7.03,7.03,0,0,0,2.059-5.014,7.03,7.03,0,0,0-2.059-5.014A7.03,7.03,0,0,0,8.5-13.447ZM7.8-2.822H9.2v-4.25H7.8Z"
                  transform="translate(-1.428 13.447)"
                  fill="#989898"
                ></path>
              </svg>
              {showPopup ? (
                <div id="infoBoxDet" className="infoBoxDet">
                  Polling in Karanpur Assembly constituency in Rajasthan
                  adjourned due to the death of a candidate
                </div>
              ) : null}
            </>
          ) : null}
          <span>{subHead}</span>
        </h3>
        <p className={`rsstwn ${fullText ? "tobancd" : ""}`}>
          {fullText ? (
            fullText
          ) : (
            <>
              <b>{resultFirst}</b>/{resultSecond}
              <span>({resultText})</span>
            </>
          )}
        </p>
      </div> */}
      <div className="lhs_box">
        <h3 className="g_pt_nem">{head}</h3>
        <p className=" g_md_txt ">
          <b className="">{resultFirst}</b>/{resultSecond}
          <span className="">({resultText})</span>
        </p>
        <span className="g_rslt_txt">{resultAS}</span>
      </div>

      <style jsx>{`
        .lhs_box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          width: 100%;
          padding: ${isFullScreen ? "10px 0" : 0};
        }
        .g_pt_nem {
          font-weight: bold;
          font-size: 16px;
          line-height: 18px;
          color: #241f1f;
          text-transform: uppercase;
        }
        .g_pt_nem:lang(ml),
        .g_pt_nem:lang(ta),
        .g_pt_nem:lang(kn){
          font-size:12px;
        }
        .g_md_txt {
          font-size: 12px;
          line-height: 16px;
          color: #222222;
        }
        .g_md_txt span {
          display: block;
        }
        .g_rslt_txt {
          font-size: 11px;
          line-height: 12px;
          color: #241f1f;
          text-transform: uppercase;
        }
        .rsstnm {
          font-size: 18px;
          line-height: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .tobancd {
          font-size: 11px;
          line-height: 18px;
          font-weight: bold;
        }
        .rsstwn {
          font-size: 14px;
          line-height: 20px;
        }
        .rsstwn b {
          font-weight: bold;
        }
        .rsstwn span {
          font-size: 12px;
          margin-top: 10px;
          display: block;
        }
        .rsstnm span {
          font-size: 11px;
          font-weight: 500;
          display: block;
        }
        .infoBoxDet {
          background-color: #fffeeb;
          border: 1px solid #e5e4c9;
          padding: 10px;
          color: #0f162d;
          font-family: inherit;
          font-size: 9px;
          line-height: 16px;
          position: absolute;
          width: 153px;
          left: 0;
          right: 0;
          border-radius: 4px;
          top: 50px;
        }
        .infoSec button {
          background: none;
          border: none;
        }
        .infoSec {
          position: relative;
        }

        #info_Iconn {
          cursor: pointer;
        }
        @media screen and (max-width: 480px) {
          .rsstnm {
            font-size: 15px;
            line-height: 18px;
            margin-bottom: 0px;
            color: #e1261c;
          }
          .rsstnm span {
            color: #241f1f;
          }
          .rsstwn {
            font-size: 12px;
            line-height: 10px;
          }
          .infoBoxDet {
            left: 0px;
            width: 100%;
            top: 25px;
            z-index: 99;
          }
          .lhs_box {
            flex-direction: row;
            padding: 0;
            justify-content: flex-start;
          }
          .g_pt_nem {
            font-weight: bold;
            font-size: 14px;
            line-height: 18px;
            margin-right: 5px;
          }
          .g_md_txt {
            font-size: 11px;
            flex: 1;
            display: flex;
            flex-direction: row-reverse;
          }
          .g_md_txt span {
            margin-right: auto;
            order: 2;
          }
          .g_md_txt b {
            order: 1;
          }
          .g_rslt_txt {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default ResultHeadBlock;
