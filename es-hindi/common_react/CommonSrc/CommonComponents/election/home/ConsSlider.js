import { useEffect, useState } from 'react';
import Glide from '@glidejs/glide';
import { capitalize } from '../../../../CommonHelper/commonHelper';
import ErrorBoundary from '../../../../CommonUtils/errorBoundary';

const ConsSlider = ({ data = [] }) => {
  const [g, setG] = useState();

  useEffect(() => {
    if (document.querySelector('.cntcystrip-slide-in')) {
      let gIndex = 0;
      if (g) {
        gIndex = g.index;
        g.destroy();
      }
      let gl = new Glide('.cntcystrip-slide-in', {
        autoplay: 3000,
        type: 'carousel',
        perView: 8,
        gap: 4,
        startAt: gIndex > data?.results?.length ? 0 : gIndex,
        slidesToScroll: 1,
        breakpoints: {
          600: {
            perView: 2.5,
          },
        },
      });
      try {
        gl?.mount();
        setG(gl);
      } catch (e) {}
    }
  }, [data]);

  let dummy = new Array(10).fill({
    consId: '0',
    consName: '...',
    electionType: '...',
    shortState: '...',
    pastResultText: '...',
    result: [
      {
        _id: '...',
        consUrl: '#',
        status: '...',
        winnerParty: '...',
        partyColor: '#000',
      },
    ],
  });

  return (
    <ErrorBoundary>
      <div className="top_widget__wrp">
        <div className="top_widget_container">
          <div className="cntcystrip-slide">
            <div className="cntcystrip-slide-in">
              <div data-glide-el="track" className="track">
                <ul className="slides">
                  {(data?.results || dummy)?.map(d => (
                    <li className="slide">
                      <a href={d.result?.[0]?.consUrl || null}>
                        <div className="cntcy">
                          <b>{d.consName}</b>
                          <span style={{ textTransform: 'uppercase' }}>
                            , {d.shortState}
                          </span>
                        </div>
                        <div
                          className="prt"
                          style={{
                            background: d.result?.[0]?.partyColor || '#000',
                          }}>
                          <b>{d.result?.[0]?.winnerParty || '--'}</b>
                          <span>{capitalize(d.result?.[0]?.status || '')}</span>
                        </div>
                        <div className="yrs">
                          <span style={{ textTransform: 'uppercase' }}>
                            {d.pastResultText}
                          </span>
                        </div>
                      </a>
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
      <style jsx>{`
        .top_widget__wrp {
          text-align: center;
        }
        .top_widget_container {
          display: inline-block;
          max-width: 1244px;
          margin: 0 auto;
        }
        .cntcystrip-slide {
          position: relative;
          margin-bottom: 15px;
        }
        .cntcystrip-slide-in {
          margin: 0 40px;
        }
        .cntcystrip-slide-in .track {
          overflow: hidden;
        }
        .cntcystrip-slide .slides {
          display: flex;
        }
        .cntcystrip-slide ul li a {
          text-align: center;
          font-size: 14px;
        }
        .cntcystrip-slide ul li a .cntcy {
          border: 1px solid #e3e3e3;
          border-radius: 6px 6px 0 0;
          background: #fff;
          height: 35px;
          line-height: 35px;
          color: #a8a8a8;
          line-height: 20px;
          display: flex;
          align-items: center;
          padding: 0 5px;
          justify-content: center;
        }
        .cntcystrip-slide ul li a .cntcy b {
          color: #000000;
          display: inline-block;
          white-space: nowrap;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cntcystrip-slide ul li a .prt {
          border-radius: 0 0 6px 6px;
          height: 42px;
          line-height: 42px;
          color: #fff;
          border-top: none;
          line-height: 20px;
          display: flex;
          align-items: center;
          padding: 0 5px;
          justify-content: center;
        }

        .cntcystrip-slide ul li a .prt b {
          padding-right: 10px;
          margin-right: 10px;
          border-right: 2px solid rgba(225, 225, 225, 0.4);
          display: inline-block;
          white-space: nowrap;
          max-width: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cntcystrip-slide ul li a .prt span {
          display: inline-block;
          max-width: 60px;
          line-height: 14px;
        }
        .cntcystrip-slide ul li a .prt span:lang(ml) {
          font-size: 7px;
        }

        .cntcystrip-slide ul li a .prt span:lang(ta),
        .cntcystrip-slide ul li a .prt span:lang(kn) {
          font-size: 9px;
        }
        .cntcystrip-slide ul li a .prt span:lang(te),
        .cntcystrip-slide ul li a .prt span:lang(bn) {
          font-size: 12px;
        }
        .cntcystrip-slide ul li a .yrs {
          background: #ebebeb;
          border: 1px solid #d6d6d6;
          border-top: none;
          border-radius: 0 0 6px 6px;
          color: #001d42;
          font-size: 12px;
          height: 26px;
          line-height: 26px;
          width: 120px;
          margin: auto;
        }
        .cntcystrip-slide .arrow {
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
          top: 25px;
          right: 0px;
          cursor: pointer;
        }
        .cntcystrip-slide .arrow.arrow--left {
          right: unset;
          left: 0px;
        }
        .cntcymore {
          display: none;
          background: #e3e3e3;
          height: 9px;
          margin: 15px 10px 10px 10px;
          text-align: center;
          line-height: 9px;
        }
        .cntcymore span {
          color: #e1261c;
          font-size: 12px;
          font-weight: bold;
          background: #fff;
          text-decoration: underline;
          padding: 0 3px;
        }

        @media screen and (max-width: 720px) {
          .top_widget_container {
            max-width: 100%;
          }
          .cntcystrip-slide-in {
            margin: 0;
          }
          .cntcystrip-slide .arrow {
            display: none;
          }
          .cntcyarw {
            display: none;
          }
          .cntcymore {
            display: block;
          }
          .top_widget__wrp {
            border-top: 5px #d3d3d3 solid;
            border-bottom: 5px #d3d3d3 solid;
            margin-bottom: 5px;
            padding-top: 10px;
          }
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default ConsSlider;
