import { useEffect, useState } from 'react';
import Glide from '@glidejs/glide';
import ErrorBoundary from '../../../../CommonUtils/errorBoundary';
const StateList = ({ dropList, isMobile }) => {
  let { stateListHorizontal, stateListDropdown } = dropList || {};
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (
      document.querySelector('.state_sldr') &&
      ((isMobile && stateListHorizontal?.length) ||
        (!isMobile && stateListHorizontal?.filter(e => !e.isSticky)?.length))
    ) {
      new Glide('.state_sldr', {
        autoplay: 3000,
        type: 'slider',
        perView: isMobile ? 5 : 12,
        gap: 0,
        slidesToShow: isMobile ? 5 : 1,
        draggable: true,
        bound: true,
      }).mount();
    }
  }, []);
  return (
    <ErrorBoundary>
      <div className="chst_wrp" style={{ marginBottom: 5 }}>
        <div className="choose_state">
          <div className="select_dropdown" id="customDropdown">
            <div className="selected" onClick={() => setShow(prev => !prev)}>
              <span>{stateListDropdown?.labels?.choose}</span>
            </div>
            {show ? (
              <ul className="dpdwnlist" id="dropdownContent">
                {stateListDropdown?.states?.map(e => (
                  <li>
                    {' '}
                    <a href={e.link || '#'}>{e.state}</a>{' '}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div className="chst_right_col_Wrp">
          {!isMobile ? (
            <ul className="state_fixed">
              {stateListHorizontal
                ?.filter(e => e.isSticky)
                ?.map(e => (
                  <li>
                    <a href={e.link}>{e.state} </a>
                  </li>
                ))}
            </ul>
          ) : null}
          <div className="state_sldr_wrp">
            <div className="state_sldr">
              <div className="track" data-glide-el="track">
                <ul className="slides">
                  {isMobile
                    ? stateListHorizontal
                        ?.filter(e => e.isSticky)
                        ?.map(e => (
                          <li className="boldit">
                            <a href={e.link}>{e.state} </a>
                          </li>
                        ))
                    : null}
                  {stateListHorizontal
                    ?.filter(e => !e.isSticky)
                    ?.map(e => (
                      <li className={`slide`}>
                        <a href={e.link}>{e.state} </a>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="arrows" data-glide-el="controls">
                <button className="arrow arrow--left" data-glide-dir="<">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8.641"
                    height="14"
                    viewBox="0 0 8.641 14">
                    <path
                      id="Path_1"
                      data-name="Path 1"
                      d="M17.992-5.141,12.633-10.5l5.359-5.359L16.352-17.5l-7,7,7,7Z"
                      transform="translate(-9.352 17.5)"
                      fill="#e1261c"
                    />
                  </svg>
                </button>
                <button className="arrow arrow--right" data-glide-dir=">">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8.641"
                    height="14"
                    viewBox="0 0 8.641 14">
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M10.008-5.141,15.367-10.5l-5.359-5.359L11.648-17.5l7,7-7,7Z"
                      transform="translate(-10.008 17.5)"
                      fill="#e1261c"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .dpdwnlist {
          position: absolute;
          top: 32px;
          left: 0;
          right: 0;
          z-index: 9;
          padding: 0;
          margin: 0;
          background: white;
          border: #ccc solid 1px;
          border-radius: 4px;
          overflow: auto;
          height: 110px;
        }
        .dpdwnlist::-webkit-scrollbar {
          width: 5px;
        }
        .dpdwnlist::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .dpdwnlist::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .dpdwnlist::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .dpdwnlist li {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 13px;
          line-height: 20px;
          text-transform: uppercase;
          color: #000;
          padding: 5px 8px;
          border-bottom: #f0f0f0 solid 1px;
          justify-content: flex-start;
          text-align: left;
        }
        .dpdwnlist li a {
          color: #0067e0;
        }
      `}</style>
      <style jsx>{`
        .chst_wrp {
          display: flex;
          background: #eaeaea;
          align-items: center;
          min-height: 40px;
          position: relative;
        }
        .chst_right_col_Wrp {
          display: flex;
          flex-grow: 1;
          max-width: 100%;
          min-width: 0;
        }
        .select_dropdown {
          position: relative;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          width: 140px;
          height: 32px;
          background: #e1261c
            url(https://images.news18.com/n18-elections/2024/05/up_down_arrow_wht1.svg)
            no-repeat center right 10px;
          border-radius: 4px;
          vertical-align: top;
          margin: 0 8px 0 10px;
        }
        .select_dropdown .selected {
          display: block;
          width: 100%;
        }
        .select_dropdown .selected span {
          font-weight: bold;
          font-size: 14px;
          line-height: 20px;
          color: #ffffff;
          text-transform: capitalize;
          pointer-events: none;
          text-align: left;
          display: block;
          padding: 5px 10px;
        }

        .strp_states a {
          padding-left: 0;
          font-size: 10px;
        }
        .strp_states a:before {
          display: none;
        }
        .state_fixed {
          display: flex;
          padding-right: 20px;
          border-right: #cccccc solid 1px;
          flex: 1;
          max-width: 440px;
          overflow: hidden;
          justify-content: space-between;
        }
        .state_fixed a,
        .boldit a {
          display: block;
          padding: 8px 0;
          font-weight: bold;
          font-size: 14px;
          line-height: 15px;
          color: #001d42;
          text-transform: uppercase;
          margin: 0 4px;
        }
        .state_sldr_wrp {
          max-width: 100%;
          min-width: 0;
          flex: 1;
          padding: 0 25px 0 15px;
        }
        .state_sldr {
          width: 100%;
        }
        .state_sldr .track {
          overflow: hidden;
        }
        .state_sldr .slides {
          display: flex;
        }
        .state_sldr li {
          flex-shrink: 0;
        }
        .state_sldr a {
          display: block;
          padding: 8px;
          font-size: 14px;
          line-height: 15px;
          color: #001d42;
          text-transform: uppercase;
          margin: 0 4px;
        }
        .state_sldr .arrow {
          width: 20px;
          height: 30px;
          background: #ffffff;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #dedede;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 5px;
          right: -10px;
          cursor: pointer;
        }
        .state_sldr {
          position: relative;
        }
        .state_sldr .arrow.arrow--left {
          top: 0;
          left: -10px;
        }
        .state_sldr .arrow.arrow--right {
          top: 0;
          right: -32px;
        }

        @media screen and (max-width: 720px) {
          /* choose state*/
          .state_fixed a,
          .boldit a {
            padding: 8px;
          }
          // .state_sldr_wrp {
          //   min-width: unset;
          //   max-width: unset;
          // }
          // .choose_state {
          //   position: sticky;
          //   top: 0;
          //   left: 0;
          //   background: #eaeaea;
          //   padding: 4px 10px 4px 3px;
          //   z-index: 1;
          // }
          // .chst_right_col_Wrp {
          //   overflow-x: scroll;
          //   overflow-y:hidden;
          //   -webkit-overflow-scrolling: touch;
          // }
          .state_sldr .arrow {
            display: none;
          }
          .select_dropdown {
            margin: 0;
          }
          // .state_sldr .track {
          //   overflow: visible;
          // }
          // .state_fixed {
          //   max-width: unset;
          //   overflow: visible;
          // }
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default StateList;
