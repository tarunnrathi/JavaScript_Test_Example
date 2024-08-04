import Glide from '@glidejs/glide';
import { useCallback, useEffect, useState } from 'react';
import Loader from './Loader';
import usePolling from './hooks/usePolling';
import ErrorBoundary from '../../../CommonUtils/errorBoundary';
import { APIConfig } from '../../../CommonHelper/electionHelper';
const assemblyState = require('../../../CommonUtils/AssemblyState.json');
const loksabhaState = require('../../../CommonUtils/LoksabhaState.json');
const stateNames = require('../../../CommonUtils/stateNames.json');

const Across = ({
  instance = 'default',
  lang = 'en',
  noLink = false,
  mode = 'prod',
}) => {
  const [loading, setLoading] = useState(true);
  const [toggleClass, setToggleClass] = useState('adcls');
  const [g, setG] = useState(null);
  const [allParties, setAllParties] = useState([]);
  const [allianceData, setAllianceData] = useState([]);

  const allStateSlugs = {
    AR: 'andhra-pradesh',
    OD: 'odisha',
  };

  if (
    instance === 'default' ||
    (instance !== 'exit' && instance !== 'result' && instance !== 'lsresult')
  ) {
    return null;
  }

  const fetchData = async () => {
    const { dry } = APIConfig;
    const result = await fetch(
      // `https://elections-v3-gcs-json.news18.com/feed/${lang}/ls/results-live.json`
      `https://elections-v3-gcs-json.news18.com/${dry}feed/${lang}/ls/results-live.json`
    );
    let fetchResults = await result.json();
    if (
      fetchResults &&
      fetchResults.data &&
      Array.isArray(fetchResults.data.nation.alliance) &&
      fetchResults.data.nation.alliance?.length
    ) {
      setLoading(false);
      let allParties = fetchResults.data?.nation?.alliance?.flatMap(
        alliance => alliance.parties
      );
      setAllParties([
        {
          parties: allParties.sort((a, b) => {
            if (a.partyAbbr.toLowerCase() === 'oth') return 1;
            if (b.partyAbbr.toLowerCase() === 'oth') return -1;
          }),
        },
      ]);

      let nationAlliance = fetchResults.data?.nation?.alliance || [];
      nationAlliance = nationAlliance?.map(item => {
        let { parties, ...rest } = item || {};
        return rest;
      });
      setAllianceData([
        {
          parties: nationAlliance.sort((a, b) => {
            if (a.allianceAbbr.toLowerCase() === 'oth') return 1;
            if (b.allianceAbbr.toLowerCase() === 'oth') return -1;
          }),
        },
      ]);
    }
    return fetchResults.data;
  };

  const [nationData] = usePolling({
    initial: null,
    dataLoader: fetchData,
    nopoll: toggleClass !== '',
    manager: (_, fresh = {}) => fresh,
  });

  const handleScroll = useCallback(() => {
    if (!nationData) {
      fetchData();
      if (toggleClass) {
        setToggleClass('');
      } else {
        setToggleClass('adcls');
      }
    }
  }, [nationData]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { once: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    let el = document.querySelector(`.arsltwgtsld-${instance}`);
    if (
      nationData &&
      nationData.nation?.alliance &&
      nationData.nation?.alliance.length &&
      el
    ) {
      let gIndex = 0;
      if (g) {
        gIndex = g.index;
        g.destroy();
      }
      let gValue = new Glide(el, {
        autoplay: '6000',
        type: 'carousel',
        perView: 1,
        gap: 0,
        slidesToScroll: 1,
        startAt: gIndex > nationData?.nation?.alliance?.length ? 0 : gIndex,
      });
      gValue.mount();
      setG(gValue);
    }
  }, [nationData]);

  const handleOC = e => {
    if (
      !nationData ||
      !nationData.nation?.alliance ||
      nationData.nation?.alliance.length === 0
    ) {
      window.removeEventListener('scroll', handleScroll);
      // fetchData();
    }
    e.preventDefault();
    if (toggleClass) {
      setToggleClass('');
    } else {
      setToggleClass('adcls');
    }
    return false;
  };

  const sortData = parties => {
    let sortedParties = parties.sort(
      (a, b) =>
        b.winOrLead - a.winOrLead ||
        a.partyOrder - b.partyOrder ||
        a.allianceOrder - b.allianceOrder
    );
    return sortedParties;
  };

  // let urlList =

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
                  <Loader className="loadcircle" />
                </div>
              </>
            ) : (
              <>
                <div className="arsltwgtarw" onClick={handleOC}></div>
                <div className={`arsltwgtsld arsltwgtsld-${instance}`}>
                  <div data-glide-el="track">
                    <ul>
                      {/* National Alliance Slide */}
                      {allianceData?.map((item, key) => {
                        item.parties = sortData(item.parties);
                        return (
                          <li>
                            <a
                              href={
                                !nationData?.isManual
                                  ? '/elections/analytics-center/?s=IN&t=LS&v=list'
                                  : '/elections/lok-sabha/'
                              }>
                              <div className="arsltwgthd">
                                <h2>
                                  {loksabhaState['IN'][lang]['allianceTitle']}
                                  <span>
                                    {nationData?.labels?.resultTally?.toUpperCase()}
                                  </span>
                                </h2>
                              </div>
                              <div className="arsltwgtprt">
                                {item?.parties?.length > 4
                                  ? item?.parties
                                      ?.slice(0, 4)
                                      ?.map((party, idx) => (
                                        <>
                                          <span
                                            key={`${party?.allianceAbbr}`}
                                            style={{
                                              background: party?.allianceColour,
                                            }}>
                                            <em>{party?.allianceAbbr}</em>
                                            <b>{party?.winOrLead}</b>
                                          </span>
                                        </>
                                      ))
                                  : item?.parties.map((party, idx) => (
                                      <>
                                        <span
                                          key={`${party?.allianceAbbr}`}
                                          style={{
                                            background: party?.allianceColour,
                                          }}>
                                          <em>{party?.allianceAbbr}</em>
                                          <b>{party?.winOrLead}</b>
                                        </span>
                                      </>
                                    ))}
                              </div>
                              <div className="arsltwgtbtm">
                                <span>
                                  <b>{nationData?.nation?.resultDone}/</b>
                                  {nationData?.nation?.seats}{' '}
                                  {nationData?.labels?.seatLabel.toUpperCase()}
                                </span>
                                <a href="/elections/lok-sabha/lok-sabha-election-result-key-candidates-performance/">
                                  {nationData?.labels?.keyCandidateLabel}
                                </a>
                              </div>
                            </a>
                          </li>
                        );
                      })}

                      {/* First 4 Loksabha Parties Slide */}
                      {allParties?.map((item, index) => {
                        item.parties = sortData(item.parties);
                        return (
                          <li>
                            <a
                              href={
                                !nationData?.isManual
                                  ? '/elections/analytics-center/?s=IN&t=LS&v=list'
                                  : '/elections/lok-sabha/'
                              }>
                              <div className="arsltwgthd">
                                <h2>
                                  {loksabhaState['IN'][lang]['partyTitle']}
                                  <span>
                                    {nationData?.labels?.resultTally?.toUpperCase()}
                                  </span>
                                </h2>
                              </div>
                              <div className="arsltwgtprt">
                                {item?.parties
                                  ?.slice(0, 4)
                                  ?.map((party, idx) => (
                                    <>
                                      <span
                                        key={`${party?.partyAbbr}`}
                                        style={{
                                          background: party?.partyColor,
                                        }}>
                                        <em>{party?.partyAbbr}</em>
                                        <b>{party?.winOrLead}</b>
                                      </span>
                                    </>
                                  ))}{' '}
                              </div>
                              <div className="arsltwgtbtm">
                                <span>
                                  <b>{nationData?.nation?.resultDone}/</b>
                                  {nationData?.nation?.seats}{' '}
                                  {nationData?.labels?.seatLabel.toUpperCase()}
                                </span>
                                <a href="/elections/lok-sabha/lok-sabha-election-result-key-candidates-performance/">
                                  {nationData?.labels?.keyCandidateLabel}
                                </a>
                              </div>
                            </a>
                          </li>
                        );
                      })}

                      {/* Next 4 loksabha parties Slide */}

                      {allParties?.map((item, index) => {
                        item.parties = sortData(item.parties);
                        return (
                          <li>
                            <a
                              href={
                                !nationData?.isManual
                                  ? '/elections/analytics-center/?s=IN&t=LS&v=list'
                                  : '/elections/lok-sabha/'
                              }>
                              <div className="arsltwgthd">
                                <h2>
                                  {loksabhaState['IN'][lang]['partyTitle']}
                                  <span>
                                    {nationData?.labels?.resultTally?.toUpperCase()}
                                  </span>
                                </h2>
                              </div>
                              <div className="arsltwgtprt">
                                {item?.parties
                                  ?.slice(4, 8)
                                  ?.map((party, idx) => (
                                    <>
                                      <span
                                        key={`${party?.partyAbbr}`}
                                        style={{
                                          background: party?.partyColor,
                                        }}>
                                        <em>{party?.partyAbbr}</em>
                                        <b>{party?.winOrLead}</b>
                                      </span>
                                    </>
                                  ))}{' '}
                              </div>
                              <div className="arsltwgtbtm">
                                <span>
                                  <b>{nationData?.nation?.resultDone}/</b>
                                  {nationData?.nation?.seats}{' '}
                                  {nationData?.labels?.seatLabel.toUpperCase()}
                                </span>
                                <a href="/elections/lok-sabha/lok-sabha-election-result-key-candidates-performance/">
                                  {nationData?.labels?.keyCandidateLabel}
                                </a>
                              </div>
                            </a>
                          </li>
                        );
                      })}

                      {/* Assembly Slides */}
                      {nationData?.assembly?.map((item, index) => {
                        item.parties = sortData(item.parties);
                        return (
                          <li>
                            <a
                              href={
                                !nationData?.isManual
                                  ? `/elections/analytics-center/?s=${item.shortState}&t=AS&v=list`
                                  : '/elections/lok-sabha/'
                              }>
                              <div className="arsltwgthd">
                                <h2>
                                  {/* {item?.state} */}
                                  {
                                    assemblyState[item.shortState][lang][
                                      'title'
                                    ]
                                  }
                                  <span>
                                    {nationData?.labels?.resultTally?.toUpperCase()}
                                  </span>
                                </h2>
                              </div>
                              <div className="arsltwgtprt">
                                {item?.parties?.length > 4
                                  ? item?.parties
                                      ?.slice(0, 4)
                                      ?.map((party, idx) => (
                                        <>
                                          <span
                                            key={`${party?.partyAbbr}`}
                                            style={{
                                              background: party?.partyColor,
                                            }}>
                                            <em>{party?.partyAbbr}</em>
                                            <b>{party?.winOrLead}</b>
                                          </span>
                                        </>
                                      ))
                                  : item?.parties.map((party, idx) => (
                                      <>
                                        <span
                                          key={`${party?.partyAbbr}`}
                                          style={{
                                            background: party?.partyColor,
                                          }}>
                                          <em>{party?.partyAbbr}</em>
                                          <b>{party?.winOrLead}</b>
                                        </span>
                                      </>
                                    ))}
                              </div>
                              <div className="arsltwgtbtm">
                                <span>
                                  <b>{item?.resultDone}/</b>
                                  {item?.seats}{' '}
                                  {nationData?.labels?.seatLabel.toUpperCase()}
                                </span>
                                <a
                                  href={`/elections/${
                                    stateNames.fullNames[item.shortState]
                                  }/${
                                    stateNames.fullNames[item.shortState]
                                  }-assembly-election-result-key-candidates-performance/`}>
                                  {nationData?.labels?.keyCandidateLabel}
                                </a>
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
        .arsltwgt-lsresult {
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
          top: 0;
          background: #ffefb9;
          border: 1px solid #e5e4c9;
          border-radius: 6px 0px 0px 6px;
          display: block;
          box-shadow: 0px 2px 4px #ccc;
          width: 316px;
          padding: 3px 15px 8px 30px;
          height: 160px;
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
          font-size: 15px;
          // text-transform: uppercase;
          font-weight: bold;
          line-height: 18px;
          // flex-shrink: 0;
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
      `}</style>
    </>
  );
};

export default Across;
