import Glide from '@glidejs/glide';
import { useEffect, useState } from 'react';

const SliderBlock = ({ blocks = {}, labels = {} }) => {
  const [g, setG] = useState();
  useEffect(() => {
    if (
      document.querySelector('.sliderblock-slider') &&
      blocks?.voteShare?.length
    ) {
      let gIndex = 0;
      if (g) {
        gIndex = g.index;
        g.destroy();
      }
      let gl = new Glide('.sliderblock-slider', {
        autoplay: 4000,
        type: 'carousel',
        perView: 1,
        gap: 1,
        startAt: gIndex > blocks?.voteShare?.length ? 0 : gIndex,
        slidesToScroll: 1,
        breakpoints: {
          600: {
            perView: 1,
          },
        },
      });
      try {
        gl?.mount();
        setG(gl);
      } catch (e) {}
    }
  }, [blocks]);
  return (
    <div className="sliderblock-slider">
      <div data-glide-el="track" className="track">
        <ul className="slides sliderblock">
          {blocks?.voteShare?.map(side => (
            <li style={{ width: '100%' }}>
              <div style={{ background: side.partyColor }}>
                <span className="rsprt-slider">{side.partyName}</span>
                <span className="rsst-slider">
                  {side.voteShare}
                  <sup> %</sup>
                </span>
                <span className="rswl-slider">{labels?.voteShareLabel}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .sliderblock-slider {
          width: 153px;
          height: 151px;
        }
        .sliderblock-slider .track {
          overflow: hidden;
        }
        .sliderblock {
          width: 100%;
          height: 100%;
          display: flex;
        }
        .sliderblock div {
          width: 153px;
          height: 151px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .sliderblock li {
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

        .rsprt-slider,
        .rsst-slider,
        .rswl-slider {
          display: block;
          color: #fff;
          text-transform: uppercase;
        }
        .rsprt-slider {
          font-size: 18px;
          font-weight: bold;
          line-height: 15px;
          white-space: nowrap;
          max-width: 100px;
          // text-overflow: ellipsis;
          // display: inline-block;
          // overflow: hidden;
        }
        .rsst-slider {
          font-size: 40px;
          font-weight: bold;
          line-height: 65px;
        }
        .rsst-slider sup {
          font-weight: normal;
          font-size: 20px;
        }
        .rswl-slider {
          font-size: 13px;
          line-height: 20px;
        }

        @media (max-width: 769px) {
          .sliderblock-slider {
            width: 49.8%;
          }
        }
      `}</style>
    </div>
  );
};

export default SliderBlock;
