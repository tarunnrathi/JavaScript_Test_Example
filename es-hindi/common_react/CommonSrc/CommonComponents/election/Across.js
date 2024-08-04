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

  const allStateSlugs = {
    CG: 'chhattisgarh',
    MP: 'madhya-pradesh',
    MZ: 'mizoram',
    RJ: 'rajasthan',
    TS: 'telangana',
  };

  if (
    instance === 'default' ||
    (instance !== 'exit' && instance !== 'result')
  ) {
    return null;
  }

  const fetchPollData = async () => {
    const result = await fetch(
      instance === 'exit'
        ? `https://elections-v3-json.news18.com/${
            mode === 'stg' ? 'stg-' : ''
          }feed/${lang}/as/exit-polls.json`
          :`https://elections-v3-json.news18.com/${
            mode === 'stg' ? 'stg-' : ''
          }feed/${lang}/as/results-live-2.json`
          // :`https://${mode==='stg' ? 'stg-':''}elections-v3-api.news18.com/api/en/as/results-live-2`
    );
    let { data } = await result.json();
    if (
      data &&
      data.results &&
      Array.isArray(data.results) &&
      data.results?.length
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
    if (pollData && pollData.results && pollData.results.length && el) {
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
        startAt: gIndex > pollData?.results?.length ? 0 : gIndex,
      });
      gValue.mount();
      setG(gValue);
    }
  }, [pollData]);

  const handleOC = e => {
    if (
      !pollData ||
      !pollData.results ||
      pollData.results.length === 0
    ) {
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

  const replaceExitPollLabel = (label = '', majority = 0, total = 0) => {
    return label
      .replace('<total>', `<b>${total}</b>`)
      .replace('<majority>', majority);
  };

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
                      {pollData?.results
                        ?.map(item => {
                          if (instance === 'result') {
                            const othParty = item?.parties.find(
                              party => party.partyAbbr?.toLowerCase() === 'oth'
                            );
                            if (othParty) {
                              const resParties = item?.parties.filter(
                                party =>
                                  party.partyAbbr?.toLowerCase() !== 'oth'
                              );
                              const orderedParties = [...resParties, othParty];
                              return { ...item, parties: orderedParties };
                            }
                          }
                          return item;
                        })
                        .map((item, key) => (
                          <li key={key}>
                            {instance === 'exit' ? (
                              <a
                                href={
                                  !noLink
                                    ? lang === 'tl' &&
                                      item?.shortState !== 'TS' &&
                                      allStateSlugs[item.shortState]
                                      ? `https://www.news18.com/elections/${
                                          allStateSlugs[item?.shortState]
                                        }/assembly-exit-poll/`
                                      : allStateSlugs[item?.shortState]
                                      ? `/elections/${allStateSlugs[
                                          item.shortState
                                        ]
                                          .replaceAll(' ', '-')
                                          .toLowerCase()}/assembly-exit-poll/`
                                      : null
                                    : null
                                }>
                                <div className="arsltwgthd">
                                  <h2>
                                    {item?.agency?.stateTitle}
                                    <span>
                                      {item?.agency?.agencyTitle}
                                    </span>
                                  </h2>
                                  <span className="cdjwagncy">
                                    {item?.agency?.name}
                                  </span>
                                </div>
                                <div className="arsltwgtprt">
                                  {item?.agency?.party.map((party, index) => (
                                    <span
                                      key={`${party?.name}${party?.value}${item?.shortState}`}
                                      style={{ background: party?.color }}>
                                      <em>{party?.name}</em>
                                      <b>{party?.value}</b>
                                    </span>
                                  ))}
                                </div>
                                <div className="arsltwgtbtm">
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: replaceExitPollLabel(
                                        pollData?.labels?.exitPollToWin,
                                        item?.majority,
                                        item?.total
                                      ),
                                    }}>
                                  </span>
                                </div>
                              </a>
                            ) : (
                              <>
                                <a
                                  href={
                                    !noLink
                                      ? lang === 'tl' &&
                                        item?._id?.shortState !== 'TS' &&
                                        allStateSlugs[item?._id?.shortState]
                                        ? `https://www.news18.com/elections/${allStateSlugs[
                                            item?._id?.shortState
                                          ]
                                            .replaceAll(' ', '-')
                                            .toLowerCase()}/assembly-election-result/`
                                        : allStateSlugs[item?._id?.shortState]
                                        ? `/elections/${allStateSlugs[
                                            item?._id?.shortState
                                          ]
                                            .replaceAll(' ', '-')
                                            .toLowerCase()}/assembly-election-result/`
                                        : null
                                      : null
                                  }>
                                  <div className="arsltwgthd">
                                    <h2>
                                      {item._id.state}
                                      <span>
                                        {pollData.labels &&
                                        pollData.labels.resultTally
                                          ? pollData.labels.resultTally
                                          : ''}
                                      </span>
                                    </h2>
                                    {instance === 'result' ? (
                                      <p>
                                        <b>{key + 1}</b>/
                                        {pollData.results.length}
                                      </p>
                                    ) : null}
                                  </div>
                                  <div className="arsltwgtprt">
                                    {item?.parties.map((party, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          background: party?.partyColor,
                                        }}>
                                        <em>{party?.partyAbbr}</em>
                                        <b>{party?.winOrLead}</b>
                                      </span>
                                    ))}
                                  </div>
                                  <div className="arsltwgtbtm">
                                    <span>
                                      <b>{item?.resultDone}</b>/{item?.seats}{' '}
                                      {pollData.labels &&
                                      pollData.labels.seatLabel
                                        ? pollData.labels.seatLabel?.toUpperCase()
                                        : ''}
                                    </span>
                                    {!noLink ? (
                                      <span>
                                        <a
                                          href={
                                            lang === 'tl' &&
                                            item?._id?.shortState !== 'TS' &&
                                            allStateSlugs[item?._id?.shortState]
                                              ? `https://www.news18.com/elections/${
                                                  allStateSlugs[
                                                    item?._id?.shortState
                                                  ]
                                                }/assembly-election-result-of-key-candidates/`
                                              : allStateSlugs[
                                                  item?._id?.shortState
                                                ]
                                              ? `/elections/${
                                                  allStateSlugs[
                                                    item?._id?.shortState
                                                  ]
                                                }/assembly-election-result-of-key-candidates/`
                                              : null
                                          }>
                                          {pollData?.labels?.keyCandidateLabel}
                                        </a>
                                      </span>
                                    ) : null}
                                  </div>
                                </a>
                              </>
                            )}
                          </li>
                        ))}
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
        .arsltwgt-exit {
          top: 75%;
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

export default Across;
