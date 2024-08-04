// import CandidateResultBlock from "./Blocks/CandidateResultBlock";
import LiveTVBlock from './Blocks/LiveTVBlock';
// import SynopsisBlock from "./Blocks/SynopsisBlock";
// import ConsResultBlock from "./Blocks/ConsResultBlock";
import ErrorBoundary from '../../../../CommonUtils/errorBoundary';
import dynamic from 'next/dynamic';
const Keycand = dynamic(() => import('./Keycand'));
const TopFights = dynamic(() => import('./Blocks/TopFights'));
const SliderBlock = dynamic(() => import('./Blocks/SliderBlock'));
const CounterBlock = dynamic(() => import('./Blocks/CounterBlock'));
const SquareBlock = dynamic(() => import('./Blocks/SquareBlock'));
const MapBlock = dynamic(() => import('./Blocks/MapBlock'));

const RHSBlock = ({
  mapData = {},
  liveTvData = {},
  lang,
  placeholders,
  cb,
  labels,
  winsandleads,
  byPoll,
  switches,
  fights,
  isMobile,
  keycand,
  voterShare,
  resultChunk,
  livetvAd,
}) => {

  return (
    <>
      <ErrorBoundary>
        <div className="rswgtrl">
          {!isMobile || (isMobile && switches?.mSwitcher2) ? (
            <MapBlock
              mapData={mapData}
              winsandleads={winsandleads}
              lang={lang}
              resultChunk={resultChunk}
            />
          ) : null}
          {/* <CandidateResultBlock
            options={options}
            instance={"first"}
            keycand={keycand}
          /> */}
          <LiveTVBlock
            {...liveTvData}
            lang={lang}
            labels={labels}
            livetvAd={livetvAd}
            switches={switches}
          />
          {/* <ConsResultBlock cons={cons} lang={lang} /> */}
          {isMobile ? <Keycand keycand={keycand} /> : null}
        </div>

        {switches?.mSwitcher1 || !isMobile ? (
          <div className="rswgtrr">
            <CounterBlock
              cb={cb}
              labels={labels}
              switches={switches}
              isMobile={isMobile}
            />
            <TopFights
              byPoll={byPoll}
              switches={switches}
              fights={fights}
              labels={labels}
            />
            {/* {placeholders?.slice(0, 2).map(item => { */}
            {/* return <SquareBlock {...item} />; */}
            {/* })} */}
            {switches?.voteShare?.showPlaceholder ? (
              <SquareBlock {...(switches?.voteShare || {})} />
            ) : (
              <SliderBlock blocks={voterShare} labels={labels} />
            )}
            {placeholders?.placeholder1 ? (
              <SquareBlock {...placeholders.placeholder1} />
            ) : null}
          </div>
        ) : null}

        {/* <SynopsisBlock {...synopsisData} /> */}
      </ErrorBoundary>
      <style jsx>{`
        .rswgtwrp {
          max-width: 1244px;
          margin: 0 auto;
        }
        .rswgtlh {
          background: #f8f8f8;
          border: 1px solid #d3d3d3;
          border-bottom: 4px solid #d3d3d3;
          text-align: center;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          margin-bottom: 15px;
          overflow: hidden;
        }
        .rswgtlh h1 {
          color: #001d42;
          font-size: 34px;
          line-height: 40px;
          font-weight: bold;
          margin: 30px 0 10px 0;
        }
        .rswgtlh h1 span {
          color: #e1261c;
        }
        .rswgtlh figure,
        .rswgtlh figure {
          line-height: 0;
        }
        .rswgtlh.fr2nd h1,
        .rswgtlh.fr3rd h1 {
          font-size: 30px;
          margin: 20px 20px 0 0;
        }
        .rswgtlvdt {
          color: #e1261c;
          font-size: 12px;
          text-transform: uppercase;
          font-weight: bold;
          position: absolute;
          text-align: center;
          width: 100%;
          left: 0;
          top: 10px;
        }
        .rswgtlvdt:before {
          content: '';
          background: #e1261c;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          display: inline-block;
          margin-right: 5px;
          animation: rslvdt 0.5s infinite;
        }
        .rswgtlvdt figure {
          line-height: 0;
          flex-shrink: 0;
        }
        @keyframes rslvdt {
          from {
            background: #e1261c;
          }
          to {
            background: #f8f8f8;
          }
        }

        .rswgt {
          display: flex;
          justify-content: space-between;
        }
        .rswgtl {
          width: 769px;
          flex-shrink: 0;
        }
        .rswgttbl {
        }
        .rswgttbl ul {
          display: flex;
          gap: 1px;
          margin-bottom: 1px;
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
        }
        .rswgttbl ul li:first-child {
          justify-content: left;
          padding: 15px;
          background: #eaeaea;
          text-align: left;
          text-shadow: none;
          color: #241f1f;
        }
        .rswgttbl ul li .rsstnm {
          font-size: 18px;
          line-height: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .rswgttbl ul li .rsstnm span {
          font-size: 11px;
          font-weight: 500;
        }
        .rswgttbl ul li .rsstwn {
          font-size: 14px;
          line-height: 20px;
        }
        .rswgttbl ul li .rsstwn span {
          font-size: 12px;
          margin-top: 10px;
        }
        .rswgttbl ul li .rsprt {
          font-size: 12px;
          font-weight: bold;
          line-height: 20px;
        }
        .rswgttbl ul li .rsst {
          font-size: 40px;
          font-weight: bold;
          line-height: 55px;
        }
        .rswgttbl ul li .rswl {
          font-size: 13px;
          line-height: 20px;
        }
        .rswgttbl ul li div span {
          display: block;
        }
        .rswgtspnws {
          display: flex;
          justify-content: space-between;
          gap: 1px;
          margin-bottom: 1px;
        }
        .rswgtsp {
          display: flex;
          justify-content: space-between;
          gap: 1px;
        }
        .rswgtsp li {
          width: 153px;
          height: 151px;
          flex-shrink: 0;
          background: #ffba00;
          text-align: center;
        }
        .rswgtsp li:last-child {
          background: #e6e6e6;
        }
        .rswgtsp li span {
          display: block;
          color: #000000;
          text-shadow: 0px 3px 6px #00000029;
          font-size: 12px;
          line-height: 14px;
          margin: 14px 0 5px 10px;
        }
        .rswgtsp li img {
          width: 123px;
          height: 108px;
          box-shadow: 0px 3px 6px #00000029;
        }
        .rswgtnws {
          background: #f5f5f5;
          border: 1px dashed #acacac;
          padding: 15px 20px 0 20px;
          width: 100%;
        }
        .rswgtnwshd {
          border-bottom: 2px solid #e1261c;
          color: #e1261c;
          font-size: 18px;
          line-height: 18px;
          font-weight: bold;
        }
        .rswgtnwshd span {
          background: #f5f5f5;
          position: relative;
          top: 4px;
          padding-right: 5px;
        }
        .rswgtnws ul {
        }
        .rswgtnws ul li {
          font-size: 14px;
          font-weight: bold;
          font-style: italic;
          margin-top: 14px;
          line-height: 18px;
          position: relative;
          padding-left: 12px;
        }
        .rswgtnws ul li a {
          color: #001d42;
          text-decoration: underline;
        }
        .rswgtnws ul li:before {
          content: '';
          background: #b9b9b9;
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 100%;
          top: 5px;
          left: 0px;
        }
        .rswgtlvin {
          display: flex;
          justify-content: space-between;
          gap: 1px;
          margin-bottom: 1px;
        }
        .rswgtlvinl {
          background: #363636;
          padding: 15px 20px 0 20px;
          width: 100%;
        }
        .rswgtlvinlhd {
          border-bottom: 2px solid #ffce00;
          color: #ffce00;
          font-size: 18px;
          line-height: 18px;
          font-weight: bold;
        }
        .rswgtlvinlhd span {
          background: #363636;
          position: relative;
          top: 4px;
          padding-right: 5px;
        }
        .rswgtlvinl ul {
        }
        .rswgtlvinl ul li {
          font-size: 14px;
          margin-top: 14px;
          line-height: 18px;
          position: relative;
          padding-left: 12px;
        }
        .rswgtlvinl ul li a {
          color: #fff;
        }
        .rswgtlvinl ul li:before {
          content: '';
          background: #ffce00;
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 100%;
          top: 5px;
          left: 0px;
        }
        .rswgtlvinr {
          display: flex;
          justify-content: space-between;
          gap: 1px;
        }
        .rswgtlvinr li {
          width: 153px;
          height: 151px;
          flex-shrink: 0;
          background: #fff;
          border: 1px solid #e2e2e2;
          overflow: hidden;
        }
        .rswgtlvinr li img {
          width: 100%;
        }
        .rswgtlvinr li .hd1 {
          font-size: 15px;
          line-height: 18px;
          font-weight: bold;
          color: #000000;
          padding: 10px 0 6px 10px;
        }
        .rswgtlvinr li .hd1 span {
          color: #e1261c;
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
        .rswgtlvinr li .hd2 svg {
          width: 17px;
          height: 23px;
          position: absolute;
          left: 0;
          top: 0;
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
        .rswgtrl {
          width: 320px;
          flex-shrink: 0;
        }

        @keyframes rslvdt {
          from {
            background: #e1261c;
          }
          to {
            background: #f8f8f8;
          }
        }

        .rswgtrr {
          width: 153px;
          flex-shrink: 0;
        }

        @media screen and (max-width: 480px) {
          .rsprt {
            max-width: 60px;
          }
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

          .rswgtrr {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin: 5px 0;
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
        }
      `}</style>
    </>
  );
};

export default RHSBlock;
