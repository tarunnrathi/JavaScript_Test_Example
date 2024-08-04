import ResultBoard from './ResultBoard';
import RHSBlock from './RHSBlock';
import ErrorBoundary from '../../../../CommonUtils/errorBoundary';
import { useState, useEffect } from 'react';
import { homeWidget, APIConfig } from '../../../../CommonHelper/electionHelper';
import ProgressBar from './ProgressBar';
import StateList from './StateList';
import useLoad from '../../../../CommonUtils/useLoad';
import dynamic from 'next/dynamic';
const Keycand = dynamic(() => import('./Keycand'));
const LiveBlog = dynamic(() => import('./Blocks/LiveBlog'));
const ConsSlider = dynamic(() => import('./ConsSlider'));

const HomeEl = ({
  resultBoard: rb = {},
  topNews: tp = {},
  inNews: ine = {},
  mapData = {},
  liveTv = {},
  synopsis: sy = {},
  placeholders: pl = [],
  options = {},
  sponsors: sp = [],
  config,
  labels,
  liveBlog,
  temp = false,
  winsandleads,
  statusBar: ss = {},
  dropList,
  switches,
  fights: fs = {},
  isMobile,
  ad,
  api,
  searchBoxLabel,
  useAdFlag,
  resultChunk: rc = {},
  livetvAd,
} = {}) => {
  options = {
    anchor: true,
    ...(options || {}),
  };

  let { lang = 'en', mode } = config || {};

  const [map, setMap] = useState(null);
  const [mapShort, setMapShort] = useState(() => mapData?.states?.[0]);

  const [master, setMaster] = useState({
    resultBoard: rb,
    topNews: tp,
    inNews: ine,
    synopsis: sy,
    placeholders: pl,
    sponsors: sp,
    statusBar: ss,
    resultChunk: rc,
  });

  let {
    resultBoard,
    topNews,
    inNews,
    synopsis,
    placeholders,
    sponsors,
    statusBar,
    fights,
    resultChunk,
  } = master || {
    resultBoard: rb,
    topNews: tp,
    inNews: ine,
    synopsis: sy,
    placeholders: pl,
    sponsors: sp,
    statusBar: ss,
    fights: fs,
    resultChunk: rc,
  };

  let { dry, domain, csrDomain } = APIConfig || {};

  const [status, setStatus] = useState(false);
  const cb = async () => {
    if (window.cubew?.update) {
      let el = document.querySelector('.debug-big');
      el.innerHTML += `<br\>Initiated update at ${new Date().toLocaleTimeString()}`;
    }
    updateCons();
    updateKeycand();
    updateMapData(mapShort || mapData?.states?.[0]);
    if (!switches?.byPoll?.showPlaceholder) {
      updateByPoll();
    }

    if (!switches?.voteShare?.showPlaceholder) {
      updateVoterShare();
    }

    if (!switches?.tightFight?.showPlaceholder) {
      updateTf();
    }

    setStatus(true);
    window.cubew = window.cubew || {};
    window.cubew.lastCSRUpdate = new Date().toLocaleTimeString();
    // if (switches.autoRefresh) {
    let data = await homeWidget({
      pub: true,
      fetchIt: true,
      ...(config || {}),
      useBlob: true,
    });
    if (data) {
      setMaster(data);
    }
    // }
    // setTimeout(() => setStatus(false), 1500);
  };

  const updateMapData = async ({ shortState, electionType } = {}) => {
    try {
      let data = await fetch(
        `https://${csrDomain}/${
          mode === 'stg' ? '' : ''
        }${dry}feed/${lang}/${electionType?.toLowerCase()}/${shortState?.toLowerCase()}/analytic.json`
        // `https://${
        //     mode === "stg" ? "stg-" : ""
        //   }elections-v3-api.news18.com/api/${lang}/as/${short?.toLowerCase()}/analytic`
        // `https://elections-v3-api.news18.com/api/${lang}/${electionType?.toLowerCase()}/${shortState?.toLowerCase()}/analytic`
      );
      data = await data.json();
      setMap(data.data || data);
    } catch (error) {}
  };

  const [keycand, setKeycand] = useState(null);
  const updateKeycand = async () => {
    try {
      let data = await fetch(
        `https://${csrDomain}/${
          mode === 'stg' ? '' : ''
        }${dry}feed/${lang}/as/in/key-cand-meta/2024.json`
      );
      // let data = await fetch(
      //   `https://elections-v3-api.news18.com/api/${lang}/as/in/key-cand-meta/2024`
      // );
      data = await data.json();
      setKeycand(data.data);
    } catch (error) {}
  };

  const [cons, setCons] = useState(null);
  const updateCons = async () => {
    try {
      let data = await fetch(
        `https://${csrDomain}/${
          mode === 'stg' ? '' : ''
        }${dry}feed/${lang}/home-cons.json`
      );
      // let data = await fetch(`
      // https://elections-v3-api.news18.com/api/${lang}/home-cons
      // `);
      data = await data.json();
      setCons(data.data);
    } catch (error) {}
  };

  const [byPoll, setByPoll] = useState(null);
  const updateByPoll = async () => {
    try {
      let data = await fetch(
        `https://${csrDomain}/${
          mode === 'stg' ? '' : ''
        }${dry}feed/${lang}/2024/bypoll.json`
      );
      data = await data.json();
      setByPoll(data.data);
    } catch (error) {}
  };

  const [voterShare, setvoterShare] = useState(null);
  const updateVoterShare = async () => {
    try {
      let data = await fetch(
        `https://${csrDomain}/${
          mode === 'stg' ? '' : ''
        }${dry}feed/en/ls/in/voteshare.json`
      );
      data = await data.json();
      setvoterShare(data.data);
    } catch (error) {}
  };

  const [tf, setTf] = useState(null);
  const updateTf = async () => {
    try {
      let data = await fetch(
        `https://${csrDomain}/${
          mode === 'stg' ? '' : ''
        }${dry}feed/${lang}/ls/in/tightfight.json`
      );
      data = await data.json();
      setTf(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    cb();
  }, []);

  const [searchData, setSearchData] = useState();
  const [load] = useLoad();
  useEffect(() => {
    // console.log(mapData, "hello")
    // updateMapData(mapShort || mapData?.[0]?.state);
    // updateKeycand();
    // updateCons();
    // updateFi();
    if (load && switches.searchBoxStatus) {
      (async () => {
        try {
          let data = await fetch(
            `https://${csrDomain}/predictive/predictive.json`
          );
          data = await data.json();
          setSearchData(data);
        } catch (error) {}
      })();
    }
  }, [load]);

  useEffect(() => {
    window.cubew = window.cubew || {};
    window.cubew.ssrCalls = api || 'No SSR Call from widget';
    window.cubew.config = config;
    window.cubew.version = '0.18';
    window.cubew.lastCSRUpdate = '---';
    window.cubew.switches = switches;
    window.cubew.dump = '';

    window.cubef = () => {
      window.cubew.dump += `Version: ${window.cubew.version}`;
      if (!api) {
        window.cubew.dump += '<br> No SSR Call from widget';
      } else {
        window.cubew.dump += `
        <br\> Time taken for ssr calls: ${api.totalTime}s
        <br\> Result API: ${api.resultApi}
        <br\> Widget API: ${api.widgetApi}
        `;
      }
      window.cubew.dump += `
      <br\> ByPoll placeholder switch: ${switches?.byPoll?.showPlaceholder}
      <br\> TightFight placeholder switch: ${switches?.tightFight?.showPlaceholder}
      <br\> Sponsor switch:${switches?.sponsorAd}
      <br\> Auto refresh switch: ${switches?.autoRefresh}
      `;

      let el = document.querySelector('.debug-big');
      el.innerHTML = window.cubew.dump;
      el.style = 'display: block';
      window.cubew.update = true;
    };

    // let params = new URLSearchParams(window.location.search);
    // let d = params.get('debug');
    // if (d == 'true') {
    //   window.cubef();
    // }
  }, []);

  return (
    <ErrorBoundary>
      {/* <section className={`rswgtwrp ${status ? 'ani' : ''}`}> */}
      <section className={`rswgtwrp `} style={{ position: 'relative' }}>
        {liveBlog?.liveBlogStatus ? <LiveBlog {...liveBlog} /> : null}
        {ad
          ? !useAdFlag || (useAdFlag && switches?.companionBanner)
            ? ad()
            : null
          : null}
        {!isMobile ? <ConsSlider data={cons} /> : null}
        <ProgressBar
          searchData={searchData}
          statusBar={statusBar}
          switches={switches}
          searchBoxLabel={searchBoxLabel}
        />
        <StateList dropList={dropList} isMobile={isMobile} />
        <div className="rswgt">
          <div className="rswgtl">
            <ResultBoard
              {...resultBoard}
              temp={temp}
              isMobile={isMobile}
              switches={switches}
              resultChunk={resultChunk}
              labels={labels}
            />
            {isMobile ? <ConsSlider data={cons} /> : null}

            {/* <div className="rswgtspnws">
              <SponsorBlock data={sponsors} />
              <NewsBlock {...topNews} options={options} />
            </div> */}
            {/* <div className="rswgtlvin">
              <NewsBlock {...inNews} inverted={true} options={options} />
            </div> */}
          </div>
          <div className="rswgtr">
            <RHSBlock
              mapData={{
                ...mapData,
                map,
                updateMapData,
                setMap,
                setMapShort,
                mapShort,
              }}
              liveTvData={liveTv}
              synopsisData={synopsis}
              options={options}
              lang={lang}
              keycand={keycand}
              placeholders={placeholders}
              cb={cb}
              labels={labels}
              cons={cons}
              winsandleads={winsandleads}
              byPoll={byPoll}
              switches={switches}
              fights={tf}
              isMobile={isMobile}
              voterShare={voterShare}
              resultChunk={resultChunk}
              livetvAd={livetvAd}
            />
          </div>
        </div>
        {!isMobile ? <Keycand keycand={keycand} /> : null}
        <div className="debug-big"></div>
      </section>
      <style jsx global>{`
      .AWAITED,
      .awaiting,
      .AWAITING,
      .awaited {
        background: gray;
      }
      .AWAITED-color,
      .awaited-color {
        color: gray;
      }
      .won,
      .WON,
      .WINNER,
      .winner,
      .wins,
      .win,
      .WINS,
      .WIN {
        background: #21643d;
      }
      .WINNER-color,
      .WINNNER-color,
      .wins-color,
      .win-color,
      .WINS-color,
      .WIN-color {
        color: #21643d;
      }
      .lead,
      .LEAD,
      .leads,
      .LEADS,
      .leading,
      .LEADING {
        background: #21643d;.
      }
      .leading-color,
      .LEADING-color {
        color: #21643d;
      }
      .LOST,
      .loses,
      .LOSES,
      .lost,
      .losses,
      .LOSSES,
      .loss,
      .LOSS {
        background: #e1261c;
      }
      .losses-color,
      .LOSSES-color,
      .loss-color,
      .LOSS-color {
        color: #e1261c;
      }
      .trailing,
      .TRAILING {
        background: #e1261c;
      }
      .trailing-color,
      .TRAILING-color {
        color: #e1261c;
      }
        .rswgtwrp {
          max-width: 1244px;
          margin: 0 auto;
        }
        .dfltimg {
          height: 153px;
        }
        @media screen and (max-width: 480px) {
          .rswgtwrp {
            padding: 2px;
            margin: 10px 0;
          }
          .rswgttbl ul li .rsstnm:lang(te),
          .rswgttbl ul li .rsstnm:lang(hi) {
            font-size: 18px !important;
            line-height: 20px !important;
          }
          .rswgttbl ul li .rsstwn:lang(te),
          .rswgttbl ul li .rsstwn span:lang(te),
          .rswgttbl ul li .rsstwn:lang(hi),
          .rswgttbl ul li .rsstwn span:lang(hi) {
            font-size: 14px !important;
          }
          .rswgttbl ul li .rswl:lang(te),
          .rswgttbl ul li .rswl:lang(hi) {
            font-size: 12px !important;
          }
        }

        .rsstnm:lang(te),
        .rsstnm:lang(hi) {
          font-size: 22px !important;
          line-height: 24px !important;
        }
        .rsstnm span:lang(te),
        .rsstnm span:lang(hi) {
          font-size: 14px !important;
        }
        .rsstwn:lang(te),
        .rsstwn:lang(hi) {
          font-size: 16px !important;
          line-height: 20px !important;
        }
        .rsstwn span:lang(te),
        .rsstwn span:lang(hi) {
          font-size: 14px !important;
          margin-top: 5px !important;
        }
        .tobancd:lang(te) {
          font-size: 15px !important;
        }
        .rswgtrsy p:lang(te),
        .rswgtrsy p:lang(hi) {
          font-size: 16px !important;
          line-height: 20px !important;
        }
        .cnstrsltnm:lang(te),
        .cnstrsltnm:lang(hi) {
          font-size: 18px !important;
        }
        .cnstrsltnm b:lang(te),
        .cnstrsltnm b:lang(hi) {
          font-weight: bold !important;
        }
        .cnstrsltsts:lang(te),
        .cnstrsltsts:lang(hi) {
          font-size: 16px !important;
        }
        .rswl:lang(te),
        .rswl:lang(hi) {
          font-size: 16px !important;
        }
        .rswgtcnd {
          min-height: 151px !important;
        }
        .rswgtrs {
          min-height: 145px !important;
        }
      `}</style>
      <style jsx>{`
        ${!options.anchor
          ? `a {
        cursor: default !important; 
      };`
          : ''}
        .rswgtwrp {
          max-width: 1244px;
          margin: 0 auto;
        }
        .rswgt {
          display: flex;
          justify-content: center;
        }
        .rswgtl {
          width: 769px;
          flex-shrink: 0;
        }
        .rswgtspnws {
          display: flex;
          justify-content: space-between;
          gap: 1px;
          margin-bottom: 1px;
        }
        .rswgtlvin {
          display: flex;
          justify-content: space-between;
          gap: 1px;
          margin-bottom: 1px;
        }
        .ani {
          position: relative;
        }
        .ani:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0px;
          left: 0px;
          background: #fff;
          animation: fadded 1s ease-in-out;
          z-index: 9;
          opacity: 0;
          visibility: hidden;
        }
        @keyframes fadded {
          0% {
            opacity: 0.9;
            visibility: visible;
          }
          50% {
            opacity: 0.9;
            visibility: visible;
          }
          75% {
            opacity: 0.9;
            visibility: visible;
          }
          100% {
            opacity: 0;
          }
        }

        .debug-big {
          position: absolute;
          width: 100%;
          height: 100%;
          background: gray;
          top: 0;
          opacity: 0.8;
          display: none;
          color: #fff;
          font-size: 20px;
          z-index: 1;
        }

        @media screen and (max-width: 480px) {
          .rswgtwrp {
            padding: 2px;
            margin: 10px 0;
          }
          .rswgtlh {
            border-radius: 0;
            align-items: flex-end;
          }
          .rswgtlh h1 {
            font-size: 20px;
            line-height: 30px;
            font-weight: 700;
            padding: 0 20px;
          }
          .rswgtlh.fr2nd h1,
          .rswgtlh.fr3rd h1 {
            font-size: 14px;
            line-height: 20px;
            padding: 5px 10px 0 10px;
          }
          .rswgtlh.fr2nd figure img {
            width: 50px;
            height: 50px;
          }
          .rswgtlh.fr3rd figure img {
            width: 100px;
            height: 50px;
          }
          .rswgttbl ul {
            margin-bottom: 10px;
          }
          .rswgtsp {
            justify-content: center;
            width: 100%;
            margin-bottom: 10px;
          }
          .rswgtnws,
          .rswgtlvinl {
            padding: 15px 20px 15px 20px;
            margin-bottom: 10px;
          }
          .rswgtnws ul li {
            font-style: normal;
          }
          .rswgtlvinr {
            gap: 0;
            width: 100%;
          }
          .rswgtlvinr li {
            width: 49.8%;
            height: auto;
            text-align: center;
            border: none;
          }
          .rswgtlvinr li img {
            width: 100%;
          }
          .rswgtrr {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin: 10px 0;
          }
          .rswgtrrbx {
            width: 49.8%;
          }
          .frdtrf {
            width: 100%;
            border-left: 5px solid #e1261c;
            height: auto;
            padding: 10px;
            text-align: left;
            justify-content: left;
            margin-bottom: 10px;
          }
          .rswgtdtrf {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            width: 100%;
          }
          .rswgtdtrf h3 {
            font-size: 16px;
            padding: 0;
          }
          .rswgtdtrf time {
            font-size: 32px;
            line-height: 14px;
          }
          .rswgtdtrf time span {
            display: inline-block;
          }
          .dtrfrshply {
            margin: 0;
          }
          .rswgttbl ul li:first-child {
            border-left: 5px solid #e1261c;
            padding: 6px 10px;
            width: 100%;
            height: auto;
          }
          .rswgttbl ul li:first-child div {
            display: flex;
            justify-content: space-between;
            width: 100%;
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
          .rswgttbl ul li {
            width: 24.7%;
            height: auto;
            padding: 10px 0;
          }
          .rswgttbl ul li .rsprt {
            font-size: 12px;
            line-height: 14px;
          }
          .rswgttbl ul li .rsst {
            font-size: 24px;
            line-height: 38px;
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
          .rswgtspnws,
          .rswgtlvin,
          .rswgttbl ul {
            flex-wrap: wrap;
          }
          .rswgtrr {
            order: 3;
          }
          .rswgtwrp {
            padding: 2px;
            margin: 10px 0;
          }
          .rswgtlvin,
          .rswgtspnw ul {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default HomeEl;
