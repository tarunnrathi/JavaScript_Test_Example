import Glide from '@glidejs/glide';
import { useEffect, useState } from 'react';
import Loader from '../../Loader';

const ConsResultBlock = ({ instance, cons, lang }) => {
  let [g, setG] = useState(null);
  let { results, labels } = cons || {};

  useEffect(() => {
    if (document.querySelector(`.consslide`)) {
      let index = 0;
      if (g) {
        index = g.index;
        g.destroy();
      }

      let gl = new Glide(`.consslide`, {
        type: 'carousel',
        perView: 1,
        autoplay: 5000,
        startAt: index > cons.length ? 0 : index,
      }).mount();
      setG(gl);
    }
  }, [cons]);

  return (
    <>
      {results ? (
        <div className="cnstrslt" style={{ overflow: 'hidden', height: 154 }}>
          <div className="consslide">
            <div data-glide-el="track">
              <div style={{ display: 'flex', overflow: 'hidden' }}>
                {results.map((item, index) => (
                  <a
                    key={index}
                    href={
                      item?.consUrl
                        ? lang !== 'tl'
                          ? item?.consUrl
                          : item?.shortState?.toLowerCase() === 'ts'
                          ? item?.consUrl
                          : null
                        : null
                    }>
                    <div
                      key={index}
                      style={{
                        background: item?.candidate?.partyColor,
                        height: 154,
                        padding: '10px 0',
                      }}>
                      <div className="cnstrsltnm">
                        <b>{item.consName}</b> {labels.assembly}
                        <span>({item.state})</span>
                      </div>
                      <div className="cnstrsltsts">
                        <b>{item?.candidate?.partyShort}</b> |{' '}
                        {item?.candidate?.status}
                      </div>
                      <div className="cnstrsltwnr">
                        2018 {labels.winner}: <b>{item.past?.partyShort}</b>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-cont">
          <Loader />
        </div>
      )}
      <style jsx>{`
        .cnstrslt {
          margin: 1px 0;
          text-shadow: 0px 3px 6px #00000029;
          text-align: center;
          min-height: 154px;
        }
        .cnstrsltnm {
          color: #fff;
          font-size: 16px;
          line-height: 22px;
          text-transform: capitalize;
        }
        .cnstrsltnm span {
          display: block;
          font-weight: normal;
          font-size: 14px;
        }
        .cnstrsltnm b {
          font-weight: 500;
        }
        .cnstrsltsts {
          color: #fff;
          font-size: 14px;
          line-height: 24px;
        }
        .cnstrsltsts b {
          font-weight: 500;
        }
        .cnstrsltwnr {
          color: #000000;
          background: #ffffff;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 14px;
          display: table;
          margin: 10px auto 0 auto;
          height: 28px;
          line-height: 28px;
          padding: 0 15px;
          font-size: 14px;
        }
        .cnstrsltwnr b {
          font-weight: 500;
        }
        .loader-cont {
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 153px;
        }
      `}</style>
    </>
  );
};

export default ConsResultBlock;
