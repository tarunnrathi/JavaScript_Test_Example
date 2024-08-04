import { useEffect, useState } from 'react';
import Glide from '@glidejs/glide';
import ErrorBoundary from '../../../../CommonUtils/errorBoundary';

const Keycand = ({ keycand }) => {
  const [g, setG] = useState();

  useEffect(() => {
    if (
      document.querySelector('.cndtstrip-slide-in') &&
      keycand?.candidateList.length
    ) {
      let gIndex = 0;
      if (g) {
        gIndex = g.index;
        g.destroy();
      }
      let gl = new Glide('.cndtstrip-slide-in', {
        autoplay: 3000,
        type: 'carousel',
        perView: 4,
        gap: 10,
        startAt: gIndex > keycand?.candidateList.length ? 0 : gIndex,
        slidesToScroll: 1,
        breakpoints: {
          600: {
            perView: 1.3,
          },
        },
      });
      try {
        gl?.mount();
        setG(gl);
      } catch (e) {}
    }
  }, [keycand]);

  return (
    <ErrorBoundary>
      <div className="cndtstrip">
        <div className="cndtstrip-slide">
          <div className="cndtstrip-slide-in">
            <div data-glide-el="track">
              <ul>
                {keycand?.candidateList?.map(e => (
                  <li>
                    <a
                      href={e.candUrl}
                      style={{ borderBottomColor: e.partyColor }}>
                      <figure>
                        <img
                          src={
                            e.candImage ||
                            'https://images.news18.com/ibnkhabar/uploads/assests/images/candidate_icon.png'
                          }
                          alt=""
                          loading="lazy"
                        />
                      </figure>
                      <div>
                        <h3>{e.name}</h3>
                        <span className="span_ellipsis">
                          {e.partyAbbr} | {e.consName}, {e.shortState}
                        </span>
                        <p className={`${e.statusClass}-color`}>{e.status}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cndtarw" data-glide-el="controls">
              <button data-glide-dir="<"></button>
              <button data-glide-dir=">"></button>
            </div>
          </div>
        </div>
        {/* <a href="#" className="cndtmore">
          <span>MORE CANDIDATES</span>
        </a> */}
      </div>
      <style jsx>{`
        .cndtstrip {
          max-width: 1244px;
          margin: 15px auto;
          height: 92px;
        }
        .cndtstrip * {
          box-sizing: border-box;
        }
        .cndtstrip-slide {
          position: relative;
        }
        .cndtstrip-slide-in {
          margin: 0 30px;
          overflow: hidden;
        }
        .cndtstrip-slide ul {
          display: flex;
        }
        .cndtstrip-slide ul li a {
          display: flex;
          justify-content: space-between;
          border: 1px solid #e3e3e3;
          border-radius: 6px;
          background: #fff;
          padding: 10px;
          align-items: center;
          border-bottom: 6px solid #444;
        }
        .cndtstrip-slide ul li a figure {
          width: 60px;
          height: 60px;
          border-radius: 100%;
          overflow: hidden;
          flex-shrink: 0;
          margin-right: 12px;
          background: #ccc;
        }
        .cndtstrip-slide ul li a figure img {
          width: 100%;
        }
        .cndtstrip-slide ul li a div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          flex: 1;
          height: 65px;
        }
        .cndtstrip-slide ul li a div h2,
        .cndtstrip-slide ul li a div h3 {
          color: #010101;
          font-weight: bold;
          line-height: 20px;
          font-size: 15px;
        }
        .cndtstrip-slide ul li a div h2 span,
        .cndtstrip-slide ul li a div h3 span,
        .span_ellipsis {
          color: #474747;
          font-size: 13px;
          display: block;
          padding: 3px 0;
          font-weight: normal;
          display: inline-block;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          position: absolute;
          left: 0;
          right: 0;
          top: 18px;
        }
        .cndtstrip-slide ul li a div p {
          font-size: 20px;
          font-weight: bold;
          text-transform: uppercase;
          line-height: 24px;
        }

        .cndtstrip-slide ul li a div p:lang(te),
        .cndtstrip-slide ul li a div p:lang(tl),
        .cndtstrip-slide ul li a div p:lang(kn),
        .cndtstrip-slide ul li a div p:lang(ta),
        .cndtstrip-slide ul li a div p:lang(hi),
        .cndtstrip-slide ul li a div p:lang(bn),
        .cndtstrip-slide ul li a div p:lang(pa),
        .cndtstrip-slide ul li a div p:lang(mr),
        .cndtstrip-slide ul li a div p:lang(as) {
          font-size: 18px;
        }
        .cndtstrip-slide ul li a div p:lang(ml) {
          font-size: 9px;
        }
        .cndtstrip-slide ul li a div h2:lang(te),
        .cndtstrip-slide ul li a div h3:lang(te),
        .cndtstrip-slide ul li a div h2:lang(ml),
        .cndtstrip-slide ul li a div h3:lang(ml),
        .cndtstrip-slide ul li a div h2:lang(tl),
        .cndtstrip-slide ul li a div h3:lang(tl),
        .cndtstrip-slide ul li a div h2:lang(kn),
        .cndtstrip-slide ul li a div h3:lang(kn),
        .cndtstrip-slide ul li a div h2:lang(ta),
        .cndtstrip-slide ul li a div h3:lang(ta) {
          font-size: 10px;
        }
        .cndtstrip-slide ul li a div p.cndwins {
          color: #439104;
        }
        .cndtstrip-slide ul li a div p.cndleading {
          color: #6d9a48;
        }
        .cndtstrip-slide ul li a div p.cndloses {
          color: #e1261c;
        }
        .cndtstrip-slide ul li a div p.cndtrailing {
          color: #e6635b;
        }
        .cndtarw {
        }
        .cndtarw button {
          position: absolute;
          top: 50%;
          width: 22px;
          height: 22px;
          border: 2px solid #a1a1a1;
          background: #f6f6f6;
          border-radius: 100%;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          outline: 0;
          cursor: pointer;
          left: 0px;
          margin-top: -11px;
        }
        .cndtarw button:last-child {
          right: 0px;
          left: auto;
          transform: rotate(180deg);
        }
        .cndtarw button:before {
          border-right: 6px solid #a1a1a1;
          border-top: 5px solid transparent;
          border-bottom: 6px solid transparent;
          top: 4px;
          left: 3px;
        }
        .cndtarw button:after,
        .cndtarw button:before {
          content: '';
          position: absolute;
        }
        .cndtarw button:after {
          height: 4px;
          width: 5px;
          background: #a1a1a1;
          top: 7px;
          left: 8px;
        }
        .cndtmore {
          display: none;
          margin-top: 10px;
          line-height: 16px;
        }
        .cndtmore span {
          position: relative;
          color: #e1261c;
          font-size: 12px;
          font-weight: bold;
          padding-right: 18px;
        }
        .cndtmore span:before,
        .cndtmore span:after {
          content: '';
          position: absolute;
        }
        .cndtmore span:before {
          width: 10px;
          height: 1px;
          background: #e1261c;
          right: 0px;
          top: 6px;
        }
        .cndtmore span:after {
          width: 6px;
          height: 6px;
          border-right: 1px solid #e1261c;
          border-top: 1px solid #e1261c;
          transform: rotate(45deg);
          top: 3px;
          right: 0px;
        }
        @media screen and (max-width: 720px) {
          .cndtstrip-slide ul li a div p:lang(ml) {
            font-size: 8px;
          }
          .cndtstrip-slide-in {
            margin: 0 10px;
          }
          .cndtarw {
            display: none;
          }
          .cndtmore {
            display: block;
            text-align: center;
          }
          .cndtstrip {
            margin: 5px auto;
          }
          .cndtstrip-slide ul li a div {
            justify-content: flex-end;
          }
          .cndtstrip-slide ul li a div h2,
          .cndtstrip-slide ul li a div h3 {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default Keycand;
