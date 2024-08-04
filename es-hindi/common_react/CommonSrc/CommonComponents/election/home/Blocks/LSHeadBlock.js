import { useState } from 'react';

const LSHeadBlock = ({
  short,
  win,
  winLead,
  info,
  isFullScreen = false,
  resultLS,
}) => {
  const [show, setShow] = useState();
  return (
    <>
      <div style={{ width: '100%',position:'relative' }}>
        <div className="pt_nem">
          {short}
          {info && !isFullScreen ? (
            <div className="icon_wrp">
              {!show ? (
                <svg
                  onClick={
                    info
                      ? e => {
                          e.preventDefault();
                          setShow(prev => !prev);
                        }
                      : null
                  }
                  id="info_Iconn"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 14.145 14.145"
                  className="">
                  <path
                    id="i_button"
                    d="M7.8-8.5H9.2V-9.928H7.8ZM8.5-.7a5.668,5.668,0,0,1-4-1.677,5.668,5.668,0,0,1-1.677-4,5.668,5.668,0,0,1,1.677-4,5.668,5.668,0,0,1,4-1.677,5.668,5.668,0,0,1,4,1.677,5.668,5.668,0,0,1,1.677,4,5.668,5.668,0,0,1-1.677,4A5.668,5.668,0,0,1,8.5-.7Zm0-12.75a7.03,7.03,0,0,0-5.014,2.059A7.03,7.03,0,0,0,1.428-6.375,7.03,7.03,0,0,0,3.486-1.361,7.03,7.03,0,0,0,8.5.7a7.03,7.03,0,0,0,5.014-2.059,7.03,7.03,0,0,0,2.059-5.014,7.03,7.03,0,0,0-2.059-5.014A7.03,7.03,0,0,0,8.5-13.447ZM7.8-2.822H9.2v-4.25H7.8Z"
                    transform="translate(-1.428 13.447)"
                    fill="#989898"
                    className=""></path>
                </svg>
              ) : (
                <svg
                  onClick={
                    info
                      ? e => {
                          e.preventDefault();
                          setShow(prev => !prev);
                        }
                      : null
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  fill={'red'}
                  width="10"
                  height="10"
                  viewBox="0 0 24 24">
                  <path d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M16.707,15.293 c0.391,0.391,0.391,1.023,0,1.414C16.512,16.902,16.256,17,16,17s-0.512-0.098-0.707-0.293L12,13.414l-3.293,3.293 C8.512,16.902,8.256,17,8,17s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L10.586,12L7.293,8.707 c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L12,10.586l3.293-3.293c0.391-0.391,1.023-0.391,1.414,0 s0.391,1.023,0,1.414L13.414,12L16.707,15.293z"></path>
                </svg>
              )}
            </div>
          ) : null}
          {show && info ? <div className="infodet">{info}</div> : null}
        </div>
        <div className="cnt_dtel">
          <div className="cnt">{win}</div>
          <div className="wNl">{winLead}</div>
        </div>
        <div className="ele_txt">{resultLS}</div>
      </div>
      <style jsx>{`
        .pt_nem {
          font-weight: bold;
          font-size: ${isFullScreen ? '18px' : '22px'};
          line-height: 18px;
          color: #ffffff;
          text-transform: uppercase;
          margin-bottom: ${isFullScreen ? '10px' : '20px'};
          display: inline-block;
        }
        .icon_wrp {
          background: white;
          display: inline-flex;
          padding: 1px;
          border-radius: 100%;
          position: absolute;
          right: -9px;
          bottom: 5px;
          cursor: pointer;
          // z-index: 10;
        }
        .icon_wrp svg {
          // z-index: 10;
        }
        .cnt_dtel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: ${isFullScreen ? '10px' : '20px'};
        }
        .cnt {
          font-weight: bold;
          font-size: ${isFullScreen ? '42px' : '46px'};
          line-height: 34px;
          color: #ffffff;
        }
        .wNl {
          font-size: 11px;
          line-height: 11px;
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000029;
          max-width: 30px;
          text-align: center;
        }
        .ele_txt {
          font-size: 11px;
          line-height: 11px;
          color: #ffffff;
        }
        .infodet {
          background-color: #fffeeb;
          border: 1px solid #e5e4c9;
          padding: 10px;
          color: #0f162d;
          font-family: inherit;
          font-size: 9px;
          line-height: 16px;
          position: absolute;
          min-width: 250px;
          left: 136px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          z-index: 99;
          bottom: 11px;
        }
        @media screen and (max-width: 480px) {
          .icon_wrp {
            top: 6px;
            right: 10px;
            width:11px;
            height:10px;
          }
          .pt_nem {
            font-size: 14px;
            line-height: 18px;
            position: unset;
            margin-bottom: 0;
            margin-right: 5px;
          }
          .pt_nem:after {
            content: ':';
            display: inline-block;
          }
          .cnt_dtel {
            margin-bottom: 0;
          }
          .cnt {
            font-size: 14px;
            line-height: 18px;
            margin-right: 10px;
          }
          .wNl {
            font-size: 11px;
            line-height: 13px;
            color: #ffffff;
            text-shadow: 0px 3px 6px #00000029;
            max-width: unset;
          }
          .ele_txt {
            display: none;
          }
          .infodet {
            left: unset;
            right: 9px;
            top: 23px;
            bottom:unset;
          }
        }
      `}</style>
    </>
  );
};

export default LSHeadBlock;
