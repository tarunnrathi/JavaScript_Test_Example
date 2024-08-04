import Glide from '@glidejs/glide';
import { useCallback, useEffect, useState } from 'react';
import Loader from './Loader';
import usePolling from './hooks/usePolling';
import ErrorBoundary from '../../../CommonUtils/errorBoundary';

const Across = ({
  instance = 'default',
  lang = 'en',
  noLink = false,
  mode = 'prod',
}) => {
  const [loading, setLoading] = useState(true);
  const [toggleClass, setToggleClass] = useState('adcls');
  const [g, setG] = useState(null);
  const [showDropdown, setShowDropDown] = useState(false);

  if (
    instance === 'default' ||
    (instance !== 'exit' && instance !== 'result')
  ) {
    return null;
  }

  const fetchPollData = async () => {
    const result = await fetch(
      `https://elections-v3-gcs-json.news18.com/feed/${lang}/ls/in/exitpoll.json`
    );
    let fetchResults = await result.json();
    if (
      fetchResults &&
      fetchResults.data &&
      Array.isArray(fetchResults.data.agency) &&
      fetchResults.data.agency?.length
    ) {
      setLoading(false);
    }
    return fetchResults.data;
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
    if (pollData && pollData.agency && pollData.agency.length && el) {
      let gIndex = 0;
      if (g) {
        gIndex = g.index;
        g.destroy();
      }
      let gValue = new Glide(el, {
        autoplay: '5000',
        type: 'carousel',
        perView: 1,
        gap: 0,
        slidesToScroll: 1,
        startAt: gIndex > pollData?.agency?.length ? 0 : gIndex,
      });
      gValue.mount();
      setG(gValue);
    }
  }, [pollData]);

  const handleOC = e => {
    if (!pollData || !pollData.agency || pollData.agency.length === 0) {
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

  const handleOptions = () => {
    setShowDropDown(!showDropdown);
  };

  return (
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
                <Loader className="loader_gif" />
              </div>
            </>
          ) : (
            <>
              <div className="arsltwgtarw" onClick={handleOC}></div>
              <div className={`arsltwgtsld arsltwgtsld-${instance}`}>
                <div data-glide-el="track">
                  <ul>
                    {pollData?.agency
                      .sort((a, b) =>
                        a.isNW18Poll === b.isNW18Poll
                          ? 0
                          : a.isNW18Poll
                          ? -1
                          : 1
                      )
                      .map((item, key) => (
                        <li key={key}>
                          <a href="/elections/lok-sabha/exit-poll/">
                            <div className="arsltwgthd">
                              <h2>
                                {item?.accrossWidgetTitle}
                                <span>{item?.accrossWidgetAgencyTitle}</span>
                              </h2>
                            </div>
                            <div className="arsltwgtprt">
                              {item?.party.length > 4
                                ? item.party
                                    .filter(item => item?.isAlliance)
                                    .slice(0, 4)
                                    .map((party, index) => (
                                      <span
                                        key={`${party?.name}${party?.value}`}
                                        style={{
                                          background: party?.color,
                                        }}>
                                        <em>{party?.name}</em>
                                        <b>{party?.value}</b>
                                      </span>
                                    ))
                                : item?.party
                                    .filter(item => item?.isAlliance)
                                    .map((party, index) => (
                                      <span
                                        key={`${party?.name}${party?.value}`}
                                        style={{
                                          background: party?.color,
                                        }}>
                                        <em>{party?.name}</em>
                                        <b>{party?.value}</b>
                                      </span>
                                    ))}
                            </div>
                            <div className="arsltwgtbtm">
                              <span>{item?.declaredSeatsLabel}</span>
                            </div>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </>
          )}
          {pollData?.showStates ? (
            <div className="select_Wrp">
              <span>{pollData?.widgetStatelabel || ''}</span>
              <div className="select_dropdown" id="customDropdown">
                <div className="selected" onClick={handleOptions}>
                  <span>{pollData?.chooseStateLabel || ''}</span>
                </div>
                {showDropdown && (
                  <ul className="dpdwnlist" id="dropdownContent">
                    {pollData?.states?.map((st, idx) => (
                      <li key={st.name - idx}>
                        {' '}
                        <a href={st.stateLink}>{st.stateName}</a>{' '}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8.422"
                height="14.5"
                viewBox="0 0 8.422 14.5">
                <path
                  id="up_down_arrow"
                  d="M11-2.578,8.078-5.5,6.789-4.211,11,0l4.211-4.211L13.922-5.5Zm0-9.344L13.922-9l1.289-1.289L11-14.5,6.789-10.289,8.078-9Z"
                  transform="translate(-6.789 14.5)"
                  fill="#fff"
                />
              </svg>
            </div>
          ) : null}
        </div>
      </div>
      <style jsx global>{`
        .loader_gif {
          border: 4px solid #fff;
          border-top: 4px solid #ccc;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
          left: 50%;
          top: 50%;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <style jsx>{`
        .arsltwgt {
          position: fixed;
          right: 0;
          z-index: 99999;
          min-height: 144px;
        }
        .arsltwgt-exit {
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
          top: -74px;
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
          background: #000;
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
          top: -74px;
          background: #ffefb9;
          border: 1px solid #e5e4c9;
          border-radius: 6px 0px 0px 6px;
          display: block;
          box-shadow: 0px 2px 4px #ccc;
          width: 316px;
          padding: 3px 15px 8px 30px;
          height: ${pollData?.showStates ? '185px' : '142px'};
          // overflow: hidden;
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
          font-size: 15px !important;
          // text-transform: uppercase;
          font-weight: bold;
          line-height: 18px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .arsltwgthd h2 span {
          display: block;
          color: #241f1f;
          font-weight: normal;
          font-size: 11px;
        }
        .arsltwgthd h2 span b {
          font-weight: bold;
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
          flex: 1;
        }
        .arsltwgtprt span b {
          display: block;
          font-size: 26px;
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
          font-size: 14px;
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
          font-size: 18px !important;
        }
        .arsltwgthd h2 span:lang(te),
        .arsltwgthd h2 span:lang(hi) {
          font-size: 16px !important;
        }
        .arsltwgtbtm:lang(te),
        .arsltwgtbtm:lang(te) {
          font-size: 13px !important;
        }

        .select_Wrp {
          display: flex;
          border-top: 3px solid #000000;
          padding-top: 5px;
          margin-top: 5px;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        .select_Wrp span {
          font-weight: bold;
          font-size: 11px;
          line-height: 14px;
          color: #000000;
        }
        .select_Wrp svg {
          position: absolute;
          top: 10px;
          right: 10px;
          pointer-events: none;
        }
        /* above is old css */
        /* add this new css */
        .select_dropdown {
          position: relative;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          width: 130px;
          height: 26px;
          background: #e1261c url(images/exit-poll-landing/up_down_arrow_w.svg)
            no-repeat center right 10px;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #ffffff;
          border-radius: 13px;
          vertical-align: top;
        }
        .select_dropdown .selected {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 11px;
          line-height: 20px;
          color: #ffffff;
          text-transform: uppercase;
          width: 100%;
          padding: 5px 10px;
        }
        .select_dropdown .selected span {
          font-weight: bold;
          font-size: 11px;
          line-height: 20px;
          color: #ffffff;
          text-transform: capitalize;
          pointer-events: none;
        }
        .dpdwnlist {
          display: block;
          position: absolute;
          top: 24px;
          left: 0;
          right: 0;
          z-index: 1;
          padding: 0;
          margin: 0;
          background: white;
          border: #ccc solid 1px;
          border-radius: 4px;
          overflow: auto;
          max-height: 110px;
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
          font-size: 11px;
          line-height: 20px;
          text-transform: uppercase;
          color: #000;
          padding: 5px;
          border-bottom: #f0f0f0 solid 1px;
        }
        .dpdwnlist li a {
          color: #0067e0;
          text-decoration: underline;
        }
        .strp_states a {
          padding-left: 0;
          font-size: 10px;
        }
        .strp_states a:before {
          display: none;
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default Across;
