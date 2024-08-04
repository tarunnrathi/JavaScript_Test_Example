import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import PlaceholderCard from "./PlaceholderCard";
import LazyImage from "components/Common/LazyLoadImage";
import { useEffect } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { getPlayerUrl } from "includes/article.util";

const FullScoreBoard = ({ data, score, current, config, pageAds }) => {
  if (config.isLoading) {
    return <PlaceholderCard />;
  }
  const firstInnings = data?.firstInnings || {};
  const secondInnings = data?.secondInnings || {};
  const thirdInnings = data?.thirdInnings || {};
  const fourthInnings = data?.fourthInnings || {};

  if(!firstInnings || !secondInnings) {
    return null;
  }

  const dataArray = [];
  if(fourthInnings?.status==1) {
    dataArray.push(fourthInnings);
  }
  if(thirdInnings?.status==1) {
    dataArray.push(thirdInnings);
  }
  if(firstInnings?.status==1) {
    dataArray.push(firstInnings);
  }
  if(secondInnings?.status==1) {
    dataArray.push(secondInnings);
  }

  useEffect(() => {
    const b = document.querySelectorAll(".CN-accordion-toggle");
    if (b && b.length) {
      b.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const { target } = e;
          target.classList.toggle("active");
          const next = target.nextElementSibling;
          if(next) {
            next.classList.toggle("active");
          }
        });
      });
    }
  }, []);

  return (
    <>
      {dataArray?.map((inn, dex) => {
        if(inn.status === 1) {
          return (
            <div className="quickScore-wrap" key={dex}>
              <div className="quickScore-box active">
                <a
                  href={`#content-${dex + 1}`}
                  className="CN-accordion-toggle active"
                >
                  <div className="qs-btnwrap live">
                    <div className="flag">
                      <LazyImage
                        src={`${publicRuntimeConfig.cricketImageFlagBase}${inn.battingTeamId}.png`}
                        alt={inn.bat}
                        dontAlter={true}
                        holder={publicRuntimeConfig.flagHolder}
                        width={32}
                        height={18}
                      />
                    </div>
                    <div className="teamname">
                      {inn.Battingteam}{" "}
                    </div>
                  </div>
                  <div className="qs-btnwrap live">
                    <span className="fullMatchScore_luxembourg_firstInnings">
                      {" "}{inn?.Equation?.Total}/{inn?.Equation?.Wickets}
                    </span>
                    <div className="over fullOtherDetails_luxembourg_firstInnings">
                      ({inn?.Equation?.Overs} OV)<span> RR {inn?.Equation?.Runrate}</span>
                    </div>
                    <div className="inning"></div>
                    <div className="dropbtn"></div>
                  </div>
                </a>
                <div
                  className="CN-accordion-content active"
                  id={`content-${dex + 1}`}
                >
                  <div className="inner-wrap">
                    <hr className="line2" />
                    <table className="match-table battingInfo_sweden_secondInnings">
                      <thead>
                        <tr>
                          <th>बैटर</th>
                          <th>R</th>
                          <th>B</th>
                          <th>4s</th>
                          <th>6s</th>
                          <th>SR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inn.batsmen?.list?.map((bl, inbl) => {
                          return (
                            <tr
                              className={`${
                                bl.Howout == "नाबाद" || bl.Howout == "बल्लेबाज़ी" ? "active" : ""
                              }`}
                              key={bl.id}
                            >
                              <td>
                                <div className="playerbox">
                                  <div className="img">
                                    <a
                                      href={getPlayerUrl(bl.playerName_en, bl.id)}
                                    >
                                      <LazyImage
                                        holder={publicRuntimeConfig.capHolder}
                                        src={`${publicRuntimeConfig.cricketImageProfileBase}${bl.id}.png`}
                                        alt={bl.name}
                                        title={bl.name}
                                        height={29}
                                        width={29}
                                        dontAlter={true}
                                      />
                                    </a>
                                  </div>
                                  <div className="txt">
                                    <h3 className="playername">
                                      <a
                                        href={getPlayerUrl(bl.playerName_en, bl.id)}
                                      >
                                        {bl.name}{`${bl.Striker === "Yes" ? '*' : ''}${bl.Is_substituted ? " (Substitute)": ""}${bl.Issupersub ? " (Super Sub)": ""}`}
                                      </a>
                                    </h3>
                                    <p className="playstatus">{bl.Howout}</p>
                                  </div>
                                </div>
                              </td>
                              <td>{bl.Runs || ""}</td>
                              <td>{bl.BallsFaced || ""}</td>
                              <td>{bl.four || ""}</td>
                              <td>{bl.six || ""}</td>
                              <td>{bl.SR || ""}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {inn?.Equation?.extras && inn?.Equation?.extras !== "" ? (
                      <div className="extra-run totalExtra_sweden_secondInnings">
                        <h3 className="heading">
                          Extras:{" "}
                          {Object.values(inn?.Equation?.extras)?.reduce(
                            (a, b) => Number(a) + Number(b)
                          )}
                        </h3>
                        <p>
                          (b - {inn?.Equation?.extras?.Byes || 0}, w - {inn?.Equation?.extras?.Wides || 0}
                          , no - {inn?.Equation?.extras?.Noballs || 0}, lb -{" "}
                          {inn?.Equation?.extras?.Legbyes || 0}, penalty -{" "}
                          {inn?.Equation?.extras?.Penalty || 0})
                        </p>
                      </div>
                    ) : null}
                    <div className="totalwrap">
                      <div className="box1">Total</div>
                      <div className="box2 totalDetails_sweden_secondInnings">
                        {inn?.Equation?.Total || 0}/{inn?.Equation?.Wickets || 0}{" "}
                        <span>
                          ({inn?.Equation?.Overs || 0} OV) RR {inn?.Equation?.Runrate}
                        </span>
                      </div>
                    </div>
                    {inn?.Fallofwicket?.list?.length ? (
                      <>
                        <h3 className="scoreHeading1">Fall of Wickets</h3>
                        <p className="fallWickets-txt fallOfWickets_sweden_secondInnings">
                          {inn.Fallofwicket.list.map((f, fdex) => {
                            return (
                              <>
                                {fdex + 1}-{f.Run} (
                                <a
                                  href={getPlayerUrl(f.name, f.id)}
                                  className="anchor_grey"
                                  key={fdex}
                                >
                                  {f.name}
                                </a>
                                , {f.Over || 0} ov)
                                {inn.Fallofwicket.list.length > 1 &&
                                fdex != inn.Fallofwicket.list.length - 1
                                  ? ", "
                                  : ""}
                              </>
                            );
                          })}
                        </p>
                      </>
                    ) : null}
                    <div className="match-table table2 bowlingInfo_sweden_secondInnings">
                      <thead>
                        <tr>
                          <th>बॉलर</th>
                          <th>O</th>
                          <th>M</th>
                          <th>R</th>
                          <th>WKT</th>
                          <th>WD</th>
                          <th>NB</th>
                          <th>ECON</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inn.bowler?.list?.map((bl, inbl) => {
                          return (
                            <tr
                              className={`${bl.Bowling == "Yes" ? "active" : ""}`}
                              key={bl.id}
                            >
                              <td>
                                <div className="playerbox">
                                  <div className="img">
                                    <a
                                      href={getPlayerUrl(bl.playerName_en, bl.id)}
                                    >
                                      <LazyImage
                                        holder={publicRuntimeConfig.capHolder}
                                        src={`${publicRuntimeConfig.cricketImageProfileBase}${bl.id}.png`}
                                        alt={bl.name}
                                        title={bl.name}
                                        height={29}
                                        width={29}
                                        dontAlter={true}
                                      />
                                    </a>
                                  </div>
                                  <div className="txt">
                                    <h3 className="playername">
                                      <a
                                        href={getPlayerUrl(bl.playerName_en, bl.id)}
                                      >
                                        {`${bl.name}${bl.Bowling === "Yes" ? "*" : ""}${bl.Is_substituted ? " (Substitute)": ""}${bl.Issupersub ? " (Super Sub)": ""}`}
                                      </a>
                                    </h3>
                                    <p className="playstatus">
                                      {bl.Bowling === "Yes" ? "" : ""}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>{bl.Over || ""}</td>
                              <td>{bl.Maiden || ""}</td>
                              <td>{bl.Runs || ""}</td>
                              <td>{bl.Wicket || ""}</td>
                              <td>{bl.wide || ""}</td>
                              <td>{bl.noball || ""}</td>
                              <td>{bl.Econ || ""}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </div>
                    {inn?.notes?.length ?
                    <>
                    <h3 className="scoreHeading1">Match Notes </h3>
                    <h3 className="scoreHeading2">{inn.bat}</h3>
                    <ul className="match-notelist">
                        {inn.notes.map((item, key) => {
                            return (
                                <li key={key}>{item}</li>
                            );
                        })}
                    </ul> </>: null}
                  </div>
                </div>
              </div>
              {dex == 0 ?
                <div className="ad-container">
                  {pageAds?.ATF_300 ?
                  <SiteAd
                  width={300}
                  height={250}
                  slotId="mobileAdNew300x250_1"
                  adUnit={pageAds.ATF_300}
                  lazyload={true}
                  sizes={[[300, 250]]}
                  /> : null}
                  {pageAds?.BTF_728 ?
                  <SiteAd
                    slotId="cricket_next_ad"
                    adUnit={pageAds.BTF_728}
                    sizes={[
                      [728, 90]
                    ]}
                    width={728}
                    loadonScroll={true}
                    height={90}
                    removeAdSpan
                  /> : null}
              </div> :null}
            </div>
          );
        }
      })}
      {pageAds?.BTF_300 && firstInnings.status === 1 ? (
        <div className="ad-container">
          <div className="addinner-box">
            <SiteAd
              width={336}
              height={280}
              slotId="mobileAdNew300x250_2"
              adUnit={pageAds.BTF_300}
              sizes={[[300, 250], [336, 280]]}
              lazyload={true}
            ></SiteAd>
          </div>
        </div>
      ) : null}
      <style jsx global>{`
        .quickScore-wrap a.CN-accordion-toggle {
          display: flex;
        }
        .quickScore-wrap .qs-btnwrap {
          display: flex;
          pointer-events: none;
          align-items: baseline;
        }
        .quickScore-wrap .qs-btnwrap:last-child {
          width:100%;
        }
        .quickScore-wrap .qs-btnwrap:first-child {
          min-width: fit-content;
        }
        .quickScore-wrap .quickScore-box {
          border: 1px solid #d8d8d8;
          border-radius: 25px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .quickScore-wrap .quickScore-box.active {
          box-shadow: 0 5px 7px #d8d8d8;
        }
        .quickScore-wrap .CN-accordion-toggle {
          display: block;
          background: #fff;
          padding: 10px 20px;
        }
        .quickScore-wrap .CN-accordion-toggle.active {
          margin-bottom: 0;
        }
        .quickScore-wrap .qs-btnwrap .flag {
          width: 32px;
          margin-right: 8px;
        }
        .quickScore-wrap .qs-btnwrap .flag img {
          display: block;
        }
        .quickScore-wrap .qs-btnwrap .teamname {
          color: #464646;
          font-family: 'Karma',serif !important;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 14px;
          margin-right:4px;
        }
        .quickScore-wrap .qs-btnwrap .fullMatchScore_luxembourg_firstInnings {
          color: #001d42;
          font-family: 'Karma',serif !important;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 20px;
        }
        .quickScore-wrap .qs-btnwrap .over {
          color: #909090;
          font-size: 14px;
          margin-left: 8px;
        }
        .quickScore-wrap .qs-btnwrap .over span {
          color: #464646;
        }
        .quickScore-wrap .qs-btnwrap .inning {
          color: #464646;
          text-transform: uppercase;
          font-size: 14px;
          margin-right: auto;
          margin-left: 10px;
        }
        .quickScore-wrap .qs-btnwrap .dropbtn {
          width: 12px;
          height: 21px;
          position: relative;
        }
        .quickScore-wrap .qs-btnwrap .dropbtn::before {
          content: "";
          border-bottom: 2px solid #000;
          border-left: 2px solid #000;
          width: 6px;
          height: 6px;
          transform: rotate(-45deg);
          position: absolute;
          left: 3px;
          top: 5px;
        }
        .quickScore-wrap .CN-accordion-content {
          display: none;
          background: #fff;
          padding: 0 20px 20px;
        }
        .quickScore-wrap .CN-accordion-content.active {
          display: block;
        }
        .quickScore-wrap .CN-accordion-toggle.active .qs-btnwrap .dropbtn {
          transform: rotate(-180deg);
        }
        .quickScore-wrap .inner-wrap .line2 {
          margin: 0;
          border: 0;
          height: 5px;
          background: #d8d8d8;
        }
        .quickScore-wrap .inner-wrap .match-table {
          width: 100%;
          font-family: 'Karma',serif !important;
          font-size: 13px;
        }
        .quickScore-wrap .inner-wrap .match-table tr {
          background: #f5f5f5;
          border-bottom: 1px solid #d8d8d8;
        }
        .quickScore-wrap .inner-wrap .match-table tr.active {
          background: #fff;
        }
        .quickScore-wrap .inner-wrap .match-table tr th {
          width: 137px;
          background: #001d42;
          text-transform: uppercase;
          color: #fff;
          font-size: 15px;
          font-weight: normal;
          padding: 13px 0;
          font-family: 'Karma',serif !important;
        }
        .quickScore-wrap .inner-wrap .match-table.table2 tr th {
          width: 96px;
        }
        .quickScore-wrap .inner-wrap .match-table tr td {
          text-align: center;
          padding: 9px 0;
          vertical-align: middle;
          color: #001d42;
          font-size:14px;
        }
        .quickScore-wrap .inner-wrap .match-table tr td .playerbox {
          display: flex;
          align-items: flex-start;
        }
        .quickScore-wrap .inner-wrap .match-table tr td .playerbox .img {
          min-width: 30px;
          width: 30px;
          height: 30px;
          margin-right: 15px;
          border-radius: 50%;
          background: #fff;
          overflow: hidden;
          box-shadow: 0 1px 8px #3336;
        }
        .quickScore-wrap
          .inner-wrap
          .match-table
          tr
          td
          .playerbox
          .txt
          .playername {
          color: #001d42;
          font-size: 13px;
          text-transform: uppercase;
          font-family: 'Karma',serif !important;
        }
        .quickScore-wrap .inner-wrap .match-table tr td .playerbox .txt .playername{
          font-size: 15px;
        }
        .quickScore-wrap
          .inner-wrap
          .match-table
          tr
          td
          .playerbox
          .txt
          .playstatus {
          margin: 0;
          color: #909090;
          font-size: 12px;
        }
        .quickScore-wrap .inner-wrap .match-table tr th:first-child,
        .quickScore-wrap .inner-wrap .match-table tr td:first-child {
          text-align: left;
          padding-left: 20px;
          width: 256px;
        }
        .quickScore-wrap .inner-wrap .match-table tr.active td {
          font-family: 'Karma',serif !important;
          font-weight: bold;
        }
        .quickScore-wrap
          .inner-wrap
          .match-table
          tr.active
          td
          .playerbox
          .txt
          .playstatus {
          font-family: 'Karma',serif !important;
          font-weight: bold;
          color: #e1261d;
        }
        .quickScore-wrap .inner-wrap .extra-run {
          background: #f5f5f5;
          padding: 12px 20px;
        }
        .quickScore-wrap .inner-wrap .extra-run .heading {
          font-family: 'Karma',serif !important;
          font-weight: bold;
          font-size: 13px;
          color: #202020;
          text-transform: uppercase;
        }
        .quickScore-wrap .inner-wrap .extra-run p {
          font-size: 12px;
          margin: 0;
          color: #909090;
        }
        .quickScore-wrap .inner-wrap .totalwrap {
          display: flex;
          background: #001d42;
          color: #fff;
          align-items: center;
          padding: 9px 20px;
          margin-bottom: 23px;
        }
        .quickScore-wrap .inner-wrap .totalwrap .box1 {
          font-size: 13px;
          text-transform: uppercase;
          font-family: 'Karma',serif !important;
          font-weight: bold;
          margin-right: 245px;
        }
        .quickScore-wrap .inner-wrap .totalwrap .box2 {
          font-size: 20px;
          text-transform: uppercase;
          font-family: 'Karma',serif !important;
          font-weight: bold;
        }
        .quickScore-wrap .inner-wrap .totalwrap .box2 span {
          color: #b2b2b2;
          font-size: 14px;
        }
        .quickScore-wrap .inner-wrap .scoreHeading1 {
          border-bottom: 1px solid #d8d8d8;
          padding-left: 0;
          padding-bottom: 5px;
          margin-bottom: 5px;
        }
        .quickScore-wrap .inner-wrap .scoreHeading1::before {
          left: -20px;
        }
        .quickScore-wrap .inner-wrap .fallWickets-txt {
          margin: 0;
          color: #202020;
          font-size: 13px;
          padding-bottom: 27px;
        }
        .quickScore-wrap .inner-wrap .match-table.table2 {
          margin-bottom: 24px;
        }
        .quickScore-wrap .qs-btnwrap.live .teamname {
          font-size: 20px;
          color: #ff5148;
        }
        .quickScore-wrap .inner-wrap .scoreHeading2 {
          color: #202020;
          font-size: 13px;
          font-family: 'Karma',serif !important;
          font-weight: bold;
          padding: 10px 0;
        }
        .quickScore-wrap .inner-wrap .match-notelist {
          color: #202020;
          font-size: 13px;
          margin-bottom: 15px;
        }
        .quickScore-wrap .inner-wrap .match-notelist:last-child {
          margin-bottom: 0;
        }
        .quickScore-wrap .inner-wrap .match-notelist li {
          padding-bottom: 7px;
        }
        .quickScore-wrap .inner-wrap .match-notelist li::before {
          content: "-";
          margin-right: 5px;
        }
        .quickScore-wrap .inner-wrap .match-notelist li:last-child {
          padding-bottom: 0;
        }

        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap{
          padding: 10px;
          margin-left: -10px;
          margin-right: -10px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .CN-accordion-toggle.active .qs-btnwrap .dropbtn{
          margin-top: -54px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .CN-accordion-toggle{
          padding:10px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .CN-accordion-content{
          padding: 0;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .line2{
          display:none;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .match-table tr th{
          padding:4px 0;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .match-table tr th:first-child, .quickScore-wrap .inner-wrap .match-table tr td:first-child{
          padding-left: 10px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .match-table{
          font-size: 11px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .match-table tr td .playerbox .txt .playername{
          font-size: 14px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .match-table tr td .playerbox .img{
          margin-right: 10px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .extra-run{
          padding:10px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .totalwrap .box1{
          margin-right: 40px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .scoreHeading1{
          margin-left: 20px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .fallWickets-txt{
          padding: 0 10px 20px 20px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap a.CN-accordion-toggle{
          display: block;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .scoreHeading2 {
          padding-left: 20px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-wrap .inner-wrap .match-notelist li {
          padding-bottom: 7px;
          padding-left: 20px;
          padding-right: 10px;
        }
      `}</style>
    </>
  );
};

export default FullScoreBoard;
