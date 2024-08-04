import Blocks from './Blocks';
import { useEffect } from 'react';

const ResultBoard = ({
  data,
  temp,
  isMobile,
  isFullScreen = false,
  labels,
  resultChunk,
}) => {
  useEffect(() => {
    // Generate config
    let targets = [];

    data.forEach((item, index) => {
      let t = item.slice(1).map((_, i) => `.multislider-${index}${i + 1}`);
      targets = [...targets, ...t];
    });

    let chunkedTarget = [];
    const chunkSize = data.length - 1;
    for (let i = 0; i < targets.length; i += chunkSize) {
      const chunk = targets.slice(i, i + chunkSize);
      chunkedTarget.push(chunk);
    }

    window.multisides = {};
    window.multisides.targets = chunkedTarget;
    window.multisides.current = 0;
    window.multisides.status = true;

    class customEvent extends EventTarget {
      pause() {
        this.dispatchEvent(new Event('pause'));
      }
      play() {
        this.dispatchEvent(new Event('play'));
      }
    }

    window.multisides.customEvent = new customEvent();

    window.multisides.customEvent.addEventListener('pause', e => {
      window.multisides.status = false;
      clearInterval(window.multisides.interval);
    });

    window.multisides.customEvent.addEventListener('play', e => {
      window.multisides.status = true;
      clearInterval(window.multisides.interval);
      window.multisides.cubePlayer();
      window.multisides.interval = setInterval(
        window.multisides.cubePlayer,
        3000
      );
    });

    const cubePlayer = () => {
      let { current, targets } = window.multisides;

      function iOS() {
        return (
          [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod',
          ].includes(navigator.platform) ||
          // iPad on iOS 13 detection
          (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
        );
      }

      function getVersion() {
        return (
          /iP(hone|ad|od) OS ([1-9]*)/i.exec(window.navigator.userAgent)?.[2] ||
          NaN
        );
      }

      let i = targets[current];
      i?.forEach(key => {
        let c = document.querySelector(`${key} ul`);
        if (c) {
          window.multisides.pos = window.multisides.pos || { [key]: 0 };
          let pos =
            (window.multisides.pos[key] || 0) -
            (iOS() ? (getVersion() < 14 ? 89 : 90) : 90);
          window.multisides.pos[key] = pos;
          c.style.transform = `rotateX(${pos}deg)`;
        }
      });

      if (current == targets.length - 1) {
        window.multisides.current = 0;
      } else {
        window.multisides.current += 1;
      }
    };

    window.multisides.cubePlayer = cubePlayer;
    window.multisides.interval = setInterval(cubePlayer, 3000);
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <div className="results_white_bg">
            <div>
              {labels?.lokSabhaResults} ({resultChunk?.['IN']?.stw}{' '}
              {resultChunk?.['IN']?.stwlabel})
            </div>
            <div>
              <b>{resultChunk?.['IN']?.done}</b>/{resultChunk?.['IN']?.seats}{' '}
              {resultChunk?.['IN']?.slabel}
            </div>
          </div>
        </>
      ) : null}
      <div className="rswgttbl">
        {data?.map((item, pindex) => {
          return (
            <>
              {' '}
              {isMobile && pindex == 3 ? (
                <div className="results_white_bg results_white_bg_t">
                  <div>{labels?.assemblyResults}</div>
                </div>
              ) : null}
              <a href={item?.[0]?.url ? item?.[0]?.url : ''}>
                <ul>
                  {item?.map((i, index) => {
                    return (
                      <li
                        className={index == 0 ? 'rswgttblLi' : ''}
                        key={index}
                        style={{
                          background:
                            index == 0
                              ? pindex <= 2
                                ? i.color
                                : '#eaeaea'
                              : i.color,
                        }}
                        onClick={index == 0 ? e => e.preventDefault() : null}>
                        <Blocks
                          isFullScreen={isFullScreen}
                          pindex={pindex}
                          index={index}
                          type={
                            index == 0
                              ? pindex <= 2
                                ? 'LSHead'
                                : 'resultDetail'
                              : 'result'
                          }
                          {...i}
                          temp={temp}
                        />
                      </li>
                    );
                  })}
                </ul>
              </a>
            </>
          );
        })}
      </div>
      <style jsx global>{`
        .rswgt {
          display: flex;
          justify-content: space-between;
        }

        .rswgtr {
          width: 474px;
          flex-shrink: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .rswgtl {
          width: 769px;
          flex-shrink: 0;
        }
        .rswgttbl {
          position: relative;
        }
        .rswgttbl ul li {
          width: 153px;
          height: 151px;
          flex-shrink: 0;
          align-items: center;
          display: flex;
          justify-content: center;
          text-align: center;
          text-shadow: 0px 3px 6px #00000029;
          color: #fff;
          text-transform: uppercase;
          position: relative;
          border-bottom: 1px white solid;
        }
        .rswgttbl ul li:first-child {
          overflow: visible;
        }
        .rswgttbl ul {
          display: flex;
          gap: 1px;
        }
        .rswgttblLi {
          justify-content: left !important;
          padding: ${isFullScreen ? '0 8px' : '15px'};
          background: #eaeaea;
          text-align: left !important;
          text-shadow: none !important;
          color: #241f1f !important;
          cursor: initial;
        }

        @media screen and (max-width: 480px) {
          .rswgttblLi div {
            // display: flex;
            // justify-content: space-between !important;
            // width: 100%;
            // flex-wrap: wrap;
            align-items: center;
            display: flex;
          }
          .tobancd {
            width: 100%;
          }
          .rswgttblLi {
            // border-left: 5px solid #e1261c;
            padding: 6px 10px;
            width: 100% !important;
            height: auto !important;
            cursor: initial;
          }
          .rswgttbl ul li .rsstnm {
            font-size: 15px;
            line-height: 18px;
            margin-bottom: 0px;
            color: #e1261c;
          }
          .rswgttbl ul li .rsstnm span {
            color: #241f1f;
          }
          .rswgttbl ul li .rsstwn {
            font-size: 12px;
            line-height: 10px;
          }

          .rswgttbl ul li .rsprt {
            font-size: 12px;
            line-height: 14px;
          }
          .rswgttbl ul li .rsst {
            font-size: 21px;
            line-height: 28px;
          }
          .rswgttbl ul li .rswl {
            font-size: 11px;
          }
          .rswgt {
            display: block;
          }
          .rswgtcnd {
            margin-bottom: 10px;
          }
          .rswgtl,
          .rswgtr,
          .rswgtrl,
          .rswgtrr {
            width: 100%;
          }
          .rswgttbl ul {
            margin-bottom: 10px;
            justify-content: center;
          }
          .rswgtspnws,
          .rswgtlvin,
          .rswgttbl ul {
            flex-wrap: wrap;
          }
          .multislider ul,
          .multislider ul li {
            width: 100% !important;
            height: 88px !important;
            margin-bottom: 0;
          }

          .rswgttblLi ~ li {
            width: 24.7% !important;
            height: 88px !important;
            margin-bottom: 0;
          }

          .side-pos-front {
            transform: translateZ(40px) !important;
            z-index: 1;
          }

          .side-pos-right {
            transform: translateZ(-40px) rotatex(180deg) !important;
            z-index: 1;
          }
          .side-pos-back {
            transform: rotateX(90deg) translateY(-45px) !important;
            z-index: 1;
          }
          .side-pos-left {
            transform: rotateX(-90deg) translateY(43px) !important;
            z-index: 1;
          }
          .rsst em {
            font-size: 14px;
          }
          .results_white_bg {
            display: flex;
            padding: 9px 10px;
            background: white;
            justify-content: space-between;
          }
          .results_white_bg div {
            font-size: 11px;
            line-height: 12px;
            color: #241f1f;
            text-transform: uppercase;
          }
          .results_white_bg_t div {
            font-size: 12px;
            line-height: 12px;
            color: #474747;
            text-transform: uppercase;
          }
          .results_white_bg_t {
            padding: 0px 10px;
            padding-bottom: 5px;
          }
        }
      `}</style>
    </>
  );
};

export default ResultBoard;
