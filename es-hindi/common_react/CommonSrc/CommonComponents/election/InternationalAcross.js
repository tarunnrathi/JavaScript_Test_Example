import Glide from '@glidejs/glide';
import { useCallback, useEffect, useState } from 'react';
import Loader from './Loader';
import usePolling from './hooks/usePolling';
import ErrorBoundary from '../../../CommonUtils/errorBoundary';

const InternationalAcross = ({
  instance = 'default',
  lang = 'en',
  noLink = false,
  mode = 'prod',
}) => {
  const [loading, setLoading] = useState(true);
  const [toggleClass, setToggleClass] = useState('adcls');
  const [g, setG] = useState(null);

  if (instance !== 'result') {
    return null;
  }

  const fetchPollData = async () => {
    const convertLang = lang === 'hi' || lang === 'en' ? lang : 'en';
    const result = await fetch(
      // `https://elections-v3-gcs-json.news18.com/stg-feed/${convertLang}/intTallyResult.json`
      
      `https://elections-v3-gcs-json.news18.com/feed/${convertLang}/intTallyResult.json` // Prod url
    );
    let { data } = await result.json();
    if (
      data &&
      data.states &&
      Array.isArray(data.states) &&
      data.states?.length
    ) {
      setLoading(false);
    }
    return data;
  };

  const [pollData] = usePolling({
    initial: null,
    dataLoader: fetchPollData,
    nopoll: toggleClass !== '',
    manager: (_, fresh = {}) => fresh,
  });

  const handleScroll = useCallback(() => {
    if (!pollData) {
      fetchPollData();
      if (toggleClass) {
        setToggleClass('');
      } else {
        setToggleClass('adcls');
      }
    }
  }, [pollData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { once: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let el = document.querySelector(`.arsltwgtsld-${instance}`);
    if (pollData && pollData.states && pollData.states.length > 0 && el) {
      let gIndex = 0;
      if (g) {
        gIndex = g.index;
        g.destroy();
      }
      let gValue = new Glide(el, {
        autoplay: pollData.states.length > 1 ? '6000' : false,
        type: 'carousel',
        perView: 1,
        gap: 0,
        slidesToScroll: 1,
        startAt: gIndex > pollData?.states?.length ? 0 : gIndex,
      });
      gValue.mount();
      setG(gValue);
    }
  }, [pollData]);

  const handleOC = e => {
    if (!pollData || !pollData.states || pollData.states.length === 0) {
      window.removeEventListener('scroll', handleScroll);
      // fetchPollData();
    }
    e.preventDefault();
    if (toggleClass) {
      setToggleClass('');
    } else {
      setToggleClass('adcls');
    }
    return false;
  };

  if (!pollData || !pollData?.states || pollData?.states.length === 0)
    return null;

  return (
    <>
      <ErrorBoundary>
        <div className={`arsltwgt arsltwgt-${instance}`}>
          <span className="arsltwgtbtn" onClick={handleOC}>
            <em className="arsltwgtarw"></em>
          </span>
          <div className={`arsltwgtbx arsltwgtbx-${instance} ${toggleClass}`}>
            {loading ? (
              <>
                <div className="arsltwgtarw" onClick={handleOC}></div>
                <div className="loader-cont">
                  <Loader />
                </div>
              </>
            ) : (
              <>
                <div className="arsltwgtarw" onClick={handleOC}></div>
                <div className={`arsltwgtsld arsltwgtsld-${instance}`}>
                  <div data-glide-el="track">
                    <ul>
                      {pollData?.states?.map((item, key) => {
                        return (
                          <li key={key}>
                            <a href={item?.labels?.link || '#'}>
                              <div className="arsltwgthd">
                                <h2>
                                  {item?.labels?.title || ' '}
                                  <span>
                                    {item?.labels && item.labels.subTitle
                                      ? item.labels.subTitle
                                      : ''}
                                  </span>
                                </h2>
                                {pollData.states.length > 1 ? (
                                  <p>
                                    <b>{key + 1}</b>/{pollData.states.length}
                                  </p>
                                ) : null}
                              </div>
                              <div className="arsltwgtprt">
                                {item?.party.map((party, index) => (
                                  <span
                                    key={index}
                                    style={{
                                      background: party?.color,
                                      width:
                                        item.party.length <= 4
                                          ? `${268 / item.party.length}px`
                                          : '68px',
                                    }}>
                                    <em>{party?.name}</em>
                                    <b>{party?.value}</b>
                                    {/* <b>{party?.winOrLead}</b> */}
                                  </span>
                                ))}
                              </div>
                              <div className="arsltwgtbtm">
                                <span>
                                  <b>{item?.resultDone}</b>/{item?.total}{' '}
                                  {item.labels && item.labels.seatsLabel
                                    ? item.labels.seatsLabel?.toUpperCase()
                                    : ''}
                                </span>
                                {item?.labels?.link ? (
                                  <span>
                                    <a href={item.labels.link}>
                                      {item?.labels?.linkText}
                                    </a>
                                  </span>
                                ) : null}
                              </div>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </ErrorBoundary>
      <style jsx>{`
        .arsltwgt {
          position: fixed;
          right: 0;
          z-index: 99999;
          min-height: 144px;
        }
        .arsltwgt-result {
          top: 45%;
        }
        .arsltwgt,
        .arsltwgt * {
          // font-family: 'Recursive', sans-serif;
          box-sizing: border-box;
        }
        .arsltwgtbtn {
          position: absolute;
          right: -26px;
          top: 0;
          background: #ffefb9;
          border: 1px solid #e5e4c9;
          border-radius: 6px 0px 0px 6px;
          overflow: hidden;
          display: block;
          padding: 8px 15px 8px 30px;
          box-shadow: 0px 2px 4px #ccc;
          height: 142px;
        }
        .arsltwgtbtn span {
          color: #e1261c;
          font-size: 15px;
          font-weight: bold;
          line-height: 18px;
          display: block;
        }
        .arsltwgtbtn span b {
          color: #241f1f;
          font-size: 11px;
          font-weight: normal;
          display: block;
        }
        .arsltwgtarw {
          cursor: pointer;
          position: absolute;
          background: #e1261c;
          width: 20px;
          left: 0;
          top: 0;
          bottom: 0;
        }
        .arsltwgtarw:before,
        .arsltwgtarw:after {
          content: '';
          width: 6px;
          height: 6px;
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          position: absolute;
          top: 50%;
          margin-top: -4px;
          transform: rotate(-45deg);
          display: block;
        }
        .arsltwgtarw:before {
          left: 10px;
        }
        .arsltwgtarw:after {
          left: 6px;
        }
        .arsltwgtbx {
          position: absolute;
          right: 0px;
          top: 0;
          background: #ffefb9;
          border: 1px solid #e5e4c9;
          border-radius: 6px 0px 0px 6px;
          display: block;
          box-shadow: 0px 2px 4px #ccc;
          width: 316px;
          padding: 8px 15px 8px 30px;
          overflow: hidden;
          height: 144px;
        }
        .arsltwgtbx.adcls {
          right: -316px;
        }
        .arsltwgtbx .arsltwgtarw {
          transform: rotate(180deg);
          border-radius: 0 6px 6px 0;
        }
        .arsltwgtsld {
          overflow: hidden;
          width: 275px;
        }
        .arsltwgtsld ul {
          display: flex;
        }
        .arsltwgtsld ul li {
          flex-shrink: 0;
          overflow: hidden;
        }
        .arsltwgthd {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .arsltwgthd h2 {
          color: #e1261c;
          font-size: 15px;
          text-transform: uppercase;
          font-weight: bold;
          line-height: 18px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .arsltwgthd h2:lang(ur) {
          font-size: 14px;
        }
        .arsltwgthd h2 span {
          display: block;
          color: #241f1f;
          font-weight: normal;
          font-size: 11px;
        }
        .arsltwgthd h2 span:lang(te),
        .arsltwgthd h2 span:lang(hi) {
          font-size: 14px;
          margin-top: 5px;
        }
        .arsltwgthd p {
          color: #808080;
          font-size: 11px;
        }
        .arsltwgthd p b {
          color: #222222;
          line-height: 18px;
        }
        .arsltwgtprt {
          display: flex;
          gap: 1px;
          margin: 4px 0 6px 0;
        }
        .arsltwgtprt span {
          display: block;
          width: 68px;
          height: 66px;
          border-radius: 6px;
          color: #fff;
          text-shadow: 0px 3px 6px #00000029;
          font-size: 14px;
          text-align: center;
          line-height: 26px;
          font-weight: bold;
          text-transform: uppercase;
          flex-shrink: 0;
          padding-top: 5px;
        }
        .arsltwgtprt span b {
          display: block;
          font-size: 26px;
        }
        .arsltwgtprt span b:lang(ur) {
          font-size: 22px;
        }
        .arsltwgtprt span em {
          font-style: normal;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .arsltwgtbtm {
          display: flex;
          justify-content: space-between;
          color: #474747;
          font-size: 11px;
          line-height: 14px;
          flex-shrink: 0;
        }
        .arsltwgtbtm a {
          position: relative;
          text-decoration: underline;
          color: #0067e0;
          flex-shrink: 0;
        }
        .arsltwgtbtm a:before {
          content: '';
          width: 5px;
          height: 5px;
          display: inline-block;
          border-radius: 100%;
          background: #0067e0;
          margin-right: 5px;
        }
        .arsltwgtbtm span:lang(ur) {
          direction: ltr;
        }
        .arsltwgthd span .subTitleTwo {
          font-weight: bold;
          display: inline;
        }
        .arsltwgt-exit .arsltwgthd h2 {
          letter-spacing: -1px;
          font-size: 12px;
        }
        .arsltwgt-exit .arsltwgthd h2:lang(te),
        .arsltwgt-exit .arsltwgthd h2:lang(hi) {
          font-size: 16px;
        }
        .arsltwgt-exit .arsltwgtprt b {
          font-size: 15px;
        }
        .arsltwgt-exit .arsltwgtprt .bf-data b {
          font-size: 25px;
        }
        .bf-data * {
          animation: bfdata 0.5s infinite;
        }
        .cdjwagncy {
          background: #001d42;
          height: 22px;
          line-height: 22px;
          color: #fff;
          padding: 0 10px;
          border-radius: 11px;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
        }
        @keyframes bfdata {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .bf-sts {
          font-size: 0px;
          height: 12px;
          width: 100px;
          background: gray;
        }

        .bf-head {
          font-size: 0px;
          height: 36px;
          width: 100px;
          background: gray;
        }

        .loader-cont {
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 130px;
        }
        .rswl:lang(te),
        .rswl:lang(hi) {
          font-size: 16px !important;
        }
        .arsltwgthd h2:lang(te),
        .arsltwgthd h2:lang(hi) {
          font-size: 20px !important;
        }
        .arsltwgthd h2 span:lang(te),
        .arsltwgthd h2 span:lang(hi) {
          font-size: 16px !important;
        }
        .arsltwgtbtm:lang(te),
        .arsltwgtbtm:lang(te) {
          font-size: 13px !important;
        }
      `}</style>
    </>
  );
};

export default InternationalAcross;
