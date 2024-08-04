import { useEffect, useState } from 'react';
import Image from '../../../../../CommonUtils/Image';
import Glide from '@glidejs/glide';
import ErrorBoundary from '../../../../../CommonUtils/errorBoundary';

const Map = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.367 22.699">
        <path
          id="location_icon"
          d="M0-20.566a6.467,6.467,0,0,1,4.6,1.879,6.332,6.332,0,0,1,1.9,4.57A16.02,16.02,0,0,1,3.25-6.322,35.3,35.3,0,0,1,0-2.184,35.3,35.3,0,0,1-3.25-6.322,16.02,16.02,0,0,1-6.5-14.117a6.332,6.332,0,0,1,1.9-4.57A6.467,6.467,0,0,1,0-20.566ZM0-16.25a2.025,2.025,0,0,0-1.523.635,2.153,2.153,0,0,0-.609,1.549,2.067,2.067,0,0,0,.609,1.523A2.067,2.067,0,0,0,0-11.934a2.067,2.067,0,0,0,1.523-.609,2.067,2.067,0,0,0,.609-1.523,2.153,2.153,0,0,0-.609-1.549A2.025,2.025,0,0,0,0-16.25ZM8.684-2.184Q8.582-.3,6.145.914A13.7,13.7,0,0,1,0,2.133,13.7,13.7,0,0,1-6.145.914Q-8.582-.3-8.684-2.184a2.883,2.883,0,0,1,.939-1.9,7.019,7.019,0,0,1,2.463-1.5l.66.965q-1.828.762-1.879,1.93.051,1.117,1.9,1.879A12.134,12.134,0,0,0,0-.051,12.134,12.134,0,0,0,4.6-.812q1.854-.762,1.9-1.879-.051-1.168-1.879-1.93l.66-.965a7.019,7.019,0,0,1,2.463,1.5A2.883,2.883,0,0,1,8.684-2.184Z"
          transform="translate(8.684 20.566)"
          fill="#e1261c"></path>
      </svg>
    </>
  );
};

const TopFights = ({ fights = {}, byPoll, switches, labels = {}, tf = {} }) => {
  const [g, setG] = useState();
  const [gt, setGt] = useState();

  useEffect(() => {
    if (
      document.querySelector('.elec_box') &&
      byPoll?.candList?.filter(
        e =>
          e?.statusClass?.toLowerCase() == 'winner' ||
          e?.statusClass?.toLowerCase() == 'leading' ||
          e?.statusClass?.toLowerCase() == 'win'
      ).length
    ) {
      let gIndex = 0;
      if (g) {
        gIndex = g.index;
        g.destroy();
      }
      let gl = new Glide('.elec_box', {
        autoplay: 3000,
        type: 'carousel',
        perView: 1,
        startAt: gIndex > byPoll?.candList?.length ? 0 : gIndex,
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
  }, [byPoll]);

  useEffect(() => {
    if (
      document.querySelector('.fights') &&
      fights?.tightFight?.margin?.length > 1
    ) {
      let gIndex = 0;
      if (gt) {
        gIndex = gt.index;
        gt.destroy();
      }
      let gl = new Glide('.fights', {
        autoplay: 5000,
        type: 'carousel',
        perView: 1,
        startAt: gIndex > fights?.tightFight?.margin?.length ? 0 : gIndex,
        slidesToScroll: 1,
        breakpoints: {
          600: {
            perView: 1,
          },
        },
      });
      try {
        gl?.mount();
        setGt(gl);
      } catch (e) {}
    }
  }, [fights]);

  return (
    <ErrorBoundary>
      <ul className="rswgtlvinr">
        <li>
          {switches?.tightFight?.showPlaceholder ? (
            <a href={switches?.tightFight?.link || null}>
              <Image src={switches?.tightFight?.url} />
            </a>
          ) : (
            <div className="fights">
              <div data-glide-el="track" className="track">
                <ul className="slides">
                  {fights?.tightFight?.margin?.map(e => (
                    <a href={e.link || null}>
                      <li style={{ width: '100%' }}>
                        <h3
                          className="hd1"
                          dangerouslySetInnerHTML={{ __html: e.title }}></h3>
                        <h4 className="hd2">
                          <Map />
                          <span>
                            {e.constituency}
                            <br />({e.state})
                          </span>
                        </h4>
                        <p
                          style={{ fontSize: '11px' }}
                          dangerouslySetInnerHTML={{
                            __html: e.statusText,
                          }}></p>
                      </li>
                    </a>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </li>
        <li>
          {switches?.byPoll?.showPlaceholder ? (
            <a href={switches?.byPoll?.url || null}>
              <Image src={switches?.byPoll?.link} />
            </a>
          ) : (
            <a href="/elections/by-polls-result/">
              <div className="elec_box">
                <div data-glide-el="track" className="track">
                  <ul className="slides">
                    {byPoll?.candList
                      ?.filter(
                        e =>
                          e?.statusClass?.toLowerCase() == 'winner' ||
                          e?.statusClass?.toLowerCase() == 'leading' ||
                          e?.statusClass?.toLowerCase() == 'win'
                      )
                      ?.map(e => (
                        <li>
                          <div className="box_ttl">
                            {labels?.assemblyBypoll?.split(' ')?.[0]}{' '}
                            <span>
                              {labels?.assemblyBypoll?.split(' ')?.[1]}
                            </span>
                          </div>
                          <div className="location">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17.367"
                              height="22.699"
                              viewBox="0 0 17.367 22.699">
                              <path
                                id="location_icon"
                                d="M0-20.566a6.467,6.467,0,0,1,4.6,1.879,6.332,6.332,0,0,1,1.9,4.57A16.02,16.02,0,0,1,3.25-6.322,35.3,35.3,0,0,1,0-2.184,35.3,35.3,0,0,1-3.25-6.322,16.02,16.02,0,0,1-6.5-14.117a6.332,6.332,0,0,1,1.9-4.57A6.467,6.467,0,0,1,0-20.566ZM0-16.25a2.025,2.025,0,0,0-1.523.635,2.153,2.153,0,0,0-.609,1.549,2.067,2.067,0,0,0,.609,1.523A2.067,2.067,0,0,0,0-11.934a2.067,2.067,0,0,0,1.523-.609,2.067,2.067,0,0,0,.609-1.523,2.153,2.153,0,0,0-.609-1.549A2.025,2.025,0,0,0,0-16.25ZM8.684-2.184Q8.582-.3,6.145.914A13.7,13.7,0,0,1,0,2.133,13.7,13.7,0,0,1-6.145.914Q-8.582-.3-8.684-2.184a2.883,2.883,0,0,1,.939-1.9,7.019,7.019,0,0,1,2.463-1.5l.66.965q-1.828.762-1.879,1.93.051,1.117,1.9,1.879A12.134,12.134,0,0,0,0-.051,12.134,12.134,0,0,0,4.6-.812q1.854-.762,1.9-1.879-.051-1.168-1.879-1.93l.66-.965a7.019,7.019,0,0,1,2.463,1.5A2.883,2.883,0,0,1,8.684-2.184Z"
                                transform="translate(8.684 20.566)"
                                fill="#e1261c"
                              />
                            </svg>
                            <span>
                              {e.candCons} <br />({e.state})
                            </span>
                          </div>
                          <div
                            className="win_box"
                            style={{ background: e.candPartyColor }}>
                            <div className="party_name">{e.candParty}</div>
                            <div className="leading_txt">{e.status}</div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </a>
          )}
        </li>
      </ul>
      <style jsx global>{`
        .rswgtlvinr li .hd2 svg {
          width: 17px;
          height: 23px;
          position: absolute;
          left: 0;
          top: 0;
        }
        .rswgtlvinr li img {
          width: 100%;
          height: 151px;
        }
      `}</style>
      <style jsx>{`
        .elec_box .track,
        .fights .track {
          overflow: hidden;
        }
        .elec_box .slides,
        .fights .slides {
          display: flex;
        }
        .rswgtlvinr {
          display: flex;
          justify-content: space-between;
          gap: 1px;
          flex-direction: column;
          text-transform: uppercase;
        }
        .rswgtlvinr li {
          width: 153px;
          height: 151px;
          flex-shrink: 0;
          background: #fff;
          border: 1px solid #e2e2e2;
          overflow: hidden;
        }

        .rswgtlvinr li .hd1 {
          font-size: 15px;
          line-height: 18px;
          font-weight: bold;
          color: #000000;
          padding: 10px 0 6px 10px;
        }
        .rswgtlvinr li .hd2 {
          padding-left: 25px;
          font-size: 13px;
          line-height: 16px;
          color: #474747;
          font-weight: normal;
          position: relative;
          margin: 0 0 8px 10px;
        }
        .rswgtlvinr li p {
          background: #f5f5f5;
          padding: 10px;
          min-height: 72px;
          font-size: 13px;
          line-height: 18px;
          margin: 5px;
        }
        .rswgtlvinr li p span {
          font-weight: bold;
        }

        .rswgtlvinr li .hd1 span {
          color: #e1261c;
        }
        @media screen and (max-width: 480px) {
          .rswgtlvinr {
            gap: 0;
            width: 100%;
            display: flex;
            flex-direction: row;
          }
          .rswgtlvinr li {
            width: 50%;
            height: auto;
            // text-align: center;
            border: none;
          }
          .rswgtlvinr li img,
          .rswgtlvinr li a {
            width: 100%;
          }
        }

        .elec_box li {
          background: #ffffff;
          border: 1px solid #e2e2e2;
          padding: 10px;
        }
        .box_ttl {
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
          color: #000000;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .box_ttl span {
          color: #e1261c;
        }
        .location {
          display: flex;
          font-size: 12px;
          line-height: 16px;
          color: #474747;
          margin-bottom: 5px;
        }
        .location svg {
          margin-right: 10px;
        }
        .win_box {
          background: #f5f5f5;
          padding: 6px;
          font-size: 13px;
          line-height: 20px;
          text-align: center;
        }
        .party_name {
          font-weight: bold;
          font-size: 14px;
          line-height: 30px;
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000029;
        }
        .leading_txt {
          font-weight: bold;
          font-size: 22px;
          line-height: 30px;
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000029;
          text-transform: uppercase;
        }

        @media (max-width: 769px) {
          .elec_box li {
            padding: 5px;
          }
          .win_box {
            min-height: 61px;
          }
          .location,
          .box_ttl {
            padding: 0 10px;
          }
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default TopFights;
