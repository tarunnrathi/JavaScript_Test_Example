import { useState } from 'react';
import ErrorBoundary from '../../../../CommonUtils/errorBoundary';

const ProgressBar = ({ statusBar, switches, searchData, searchBoxLabel }) => {
  let { left, right, majorityMark } = statusBar || {};
  let {
    majorityMark: { leftTextStatus, rightTextStatus } = {},
    searchBoxStatus,
  } = switches || {};

  const changeColor = (str, color) => {
    return str
      ? str.replace(
          /<pcolor>(.*)<\/pcolor>/gi,
          `<span style="color:${color}">$1</span>`
        )
      : str;
  };
  const [search, setSearch] = useState('');

  return (
    <ErrorBoundary>
      <div>
        <div className="win_range">
          <div
            className="l_range"
            style={{
              background: left?.color,
              width: `${left?.percent}%`,
              transition: '1s',
            }}></div>
          <div className="R_count">{majorityMark}</div>
          <div
            className="r_range"
            style={{
              background: right?.color,
              width: `${right?.percent}%`,
              transition: '1s',
            }}></div>
        </div>

        <div className="el24_cnt_wrp count_Wrp">
          <div className="ele24_l">
            <div className="pts_wrp">
              <div className="pts" style={{ color: left?.color }}>
                {left?.party}:{left?.winLead}
              </div>
              {leftTextStatus ? (
                <div
                  className="pts_n"
                  dangerouslySetInnerHTML={{
                    __html: changeColor(left?.label, left?.color),
                  }}></div>
              ) : null}
            </div>
          </div>
          {searchBoxStatus ? (
            <form action="" method="post" className="ele24_Serch">
              <input
                type="text"
                placeholder={searchBoxLabel}
                className="input_txt"
                list="electionsearch"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && search.length ? (
                <ul className="dpdwnlist" id="dropdownContent">
                  {searchData
                    ?.filter(
                      i =>
                        i.consname
                          ?.toLowerCase()
                          .includes(search?.toLowerCase()) ||
                        i.candname
                          ?.toLowerCase()
                          .includes(search?.toLowerCase())
                    )
                    .slice(0, 10)
                    ?.map(e => (
                      <li>
                        {' '}
                        <a href={e.url || '#'}>
                          {e.consname || e.candname}
                        </a>{' '}
                      </li>
                    ))}
                </ul>
              ) : null}
              <button
                className="ele24_srhbtn"
                onClick={e => e.preventDefault()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17.484"
                  height="17.484"
                  viewBox="0 0 17.484 17.484">
                  <path
                    id="Path_14647"
                    data-name="Path 14647"
                    d="M9.516-18a6.349,6.349,0,0,1,4.594,1.9,6.474,6.474,0,0,1,1.875,4.617,6.573,6.573,0,0,1-.4,2.3,5.991,5.991,0,0,1-1.148,1.922l.281.281h.8l4.969,4.969-1.5,1.5L14.016-5.484v-.8l-.281-.281a5.991,5.991,0,0,1-1.922,1.148,6.573,6.573,0,0,1-2.3.4A6.474,6.474,0,0,1,4.9-6.891,6.349,6.349,0,0,1,3-11.484,6.43,6.43,0,0,1,4.9-16.1,6.43,6.43,0,0,1,9.516-18Zm0,2.016a4.486,4.486,0,0,0-3.187,1.313,4.322,4.322,0,0,0-1.266,3.188A4.322,4.322,0,0,0,6.328-8.3,4.322,4.322,0,0,0,9.516-7.031,4.322,4.322,0,0,0,12.7-8.3a4.322,4.322,0,0,0,1.266-3.187A4.322,4.322,0,0,0,12.7-14.672,4.486,4.486,0,0,0,9.516-15.984Z"
                    transform="translate(-3 18)"
                    fill="#fff"
                  />
                </svg>
              </button>
            </form>
          ) : null}
          <div className="ele24_r">
            <div className="pts_wrp l">
              <div className="pts" style={{ color: right?.color }}>
                {right?.party}:{right?.winLead}
              </div>
              {rightTextStatus ? (
                <div
                  className="pts_n"
                  dangerouslySetInnerHTML={{
                    __html: changeColor(right?.label, right?.color),
                  }}></div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .pts {
          font: bold 30px/22px Recursive, Fira Sans, sans-serif;
          padding-right: 10px;
          margin-right: 10px;
          border-right: ${leftTextStatus ? '#9b9b9b solid 1px' : 'none'};
        }
        .pts_wrp.l .pts {
          padding: 0 0 0 10px;
          margin: 0 0 0 10px;
          border-left: ${rightTextStatus ? '#9b9b9b solid 1px' : 'none'};
          border-right: none;
        }
        .pts_n span {
          font: bold 18px/18px Recursive, Fira Sans, sans-serif;
        }
        .dpdwnlist:empty {
          display: none;
        }
        @media (max-width:480px){
        .pts_n span {
            font-size: 10px !important;
            line-height: 12px !important;
          }
        }s
      `}</style>
      <style jsx>{`
        .win_range {
          width: 100%;
          height: 16px;
          border-radius: 16px;
          background: #ccc;
          position: relative;
          margin-bottom: 7px;
          overflow: hidden;
        }
        .win_range .R_count {
          display: inline-flex;
          justify-content: center;
          width: 16px;
          font: bold 11px/11px Recursive, Fira Sans, sans-serif;
          color: #000;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 16px;
        }
        .win_range .R_count:before {
          content: '';
          width: 0;
          height: 0;
          position: absolute;
          bottom: -5px;
          left: 2px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 5px solid #000;
        }
        .win_range .l_range {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: right;
        }
        .win_range .r_range {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: left;
        }

        /* seats count */
        .el24_cnt_wrp {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .el24_cnt_wrp.count_Wrp {
          box-shadow: none;
          margin: 0 0 25px 0;
          // height: 34px;
          // overflow: hidden;
        }
        .count_Wrp .ele24_l {
          display: flex;
          justify-content: space-between;
        }
        .pts_wrp {
          display: flex;
          align-items: flex-end;
          height: 34px;
        }

        .pts_n {
          font: normal 13px/15px Recursive, Fira Sans, sans-serif;
          color: #5c5c5c;
        }

        .pts_wrp.l {
          flex-direction: row-reverse;
          text-align: right;
        }

        .dtl_wrp {
          position: absolute;
          bottom: 7px;
          left: 0;
          right: 0;
          text-align: center;
        }
        .dtl_wrp a {
          font: bold 12px/22px Recursive, Fira Sans, sans-serif;
          color: #e1261d;
        }
        .ele24_Serch {
          width: 402px;
          display: flex;
          position: relative;
        }
        .ele24_Serch .input_txt {
          flex-grow: 1;
          background: white;
          border: 1px solid #d5d5d5;
          padding: 0 5px 0 10px;
          font: normal 13px/28px Recursive, Fira Sans, sans-serif;
          color: #a2a2a2;
          border-radius: 16px 0 0 16px;
          height: 32px;
        }
        .ele24_Serch .input_txt::placeholder {
          font: normal normal normal 13px/15px Recursive, Fira Sans, sans-serif;
          color: #8d8989;
        }
        .ele24_Serch .ele24_srhbtn {
          width: 34px;
          height: 32px;
          background: #e1261c;
          border: none;
          border-radius: 0 16px 16px 0;
        }

        @media screen and (max-width: 480px) {
          .win_range {
            margin: 0 10px 5px;
            width: auto;
          }
          .el24_cnt_wrp.count_Wrp {
            margin-bottom: 10px;
            flex-wrap: wrap;
          }
          .count_Wrp .ele24_l {
            order: 1;
            flex: 1;
            margin-left: 10px;
          }
          .count_Wrp .ele24_r {
            order: 2;
            flex: 1;
            margin-right: 10px;
          }
          .ele24_Serch {
            order: 3;
            width: 100%;
            margin: 10px 10px 0;
          }
          .pts {
            font-size: 15px;
            line-height: 20px;
            padding-right: 5px;
            margin-right: 5px;
          }
          .pts_wrp.l .pts {
            padding-right: 5px;
            margin-right: 5px;
          }
          .pts_n {
            font-size: 10px;
            line-height: 7px;
            width: 78px;
            text-align: left;
            margin-bottom: 2px;
          }
          .pts_n span {
            font-size: 10px !important;
            line-height: 12px !important;
          }
          .pts_wrp.l .pts_n {
            text-align: right;
          }
          .pts_wrp.l .pts {
            padding: 0 0 0 5px;
            margin: 0 0 0 5px;
          }
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default ProgressBar;
