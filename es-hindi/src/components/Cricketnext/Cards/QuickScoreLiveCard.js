import LazyImage from "components/Common/LazyLoadImage";
import { getPlayerUrl } from "includes/article.util";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const QuickScoreLiveCard = ({ data = {}, score = {}, isMobile }) => {

  let activeInning, battingTeam;

  if(data?.matchType=='टेस्ट' || data?.matchType=="first-class") {
    if(data?.firstInnings?.status==1) {
      activeInning='firstInnings';
      battingTeam=data?.firstInnings?.Battingteam;
    }
    if(data?.secondInnings?.status==1) {
      activeInning='secondInnings';
      battingTeam=data?.secondInnings?.Battingteam;
    }
    if(data.thirdInnings.status==1) {
      activeInning='thirdInnings';
      battingTeam=data.thirdInnings.Battingteam;
    }
    if(data.fourthInnings.status==1) {
      activeInning='fourthInnings';
      battingTeam=data.fourthInnings.Battingteam;
    }
  } else {
    if(data?.firstInnings?.status==1) {
      activeInning='firstInnings';
      battingTeam=data?.firstInnings?.Battingteam;
    }
    if(data?.secondInnings?.status==1) {
      activeInning = 'secondInnings';
      battingTeam = data?.secondInnings?.Battingteam;
    }
  }

  const liveBatsmen = data[activeInning]?.livePlayers?.BatsMan || [];
  const liveBowler = data[activeInning]?.livePlayers?.Bowler || [];
  const partnership = data[activeInning]?.Equation?.partnership || {};
  const lastWicket = data[activeInning]?.lastWicket || {};

  const balls = parseInt(partnership?.Balls) || 0;
  const Overs = Math.floor(balls / 6) + '.' + balls % 6;

  return (
    <>
      <h3 className="scoreHeading1">लाइव स्कोर</h3>
      <div className="quickScore-live">
        <table className="cs-table">
          <thead>
            <tr>
              <th>बैटर</th>
              <th>r</th>
              <th>b</th>
              <th>4s</th>
              <th>6s</th>
              <th>sr</th>
            </tr>
          </thead>
          <tbody>
            {liveBatsmen && liveBatsmen.length > 0 && liveBatsmen?.map((player, dex) => {
              return (
                <tr key={player.id}>
                  <td>
                    <div className="playerbox">
                      <a
                        href={`${publicRuntimeConfig.siteUrl}cricket/profile/${player.playerName_en?.toLowerCase()?.split(" ")?.join("-")}/${
                          player.id
                        }.html`}
                      >
                        <div className="img">
                          <LazyImage
                            src={`${publicRuntimeConfig.cricketImageProfileBase}${player.id}.png`}
                            alt={player.name}
                            title={player.name}
                            dontAlter={true}
                            holder={publicRuntimeConfig.capHolder}
                            height={30}
                            width={30}
                          />
                        </div>
                        <div className="txt">
                          <h3 className="playername">{`${player.name}${player.Isonstrike === true ? "*" : ""}${player.Is_substituted ? " (Substitute)": ""}${player.Issupersub ? " (Super Sub)": ""}`}</h3>
                        </div>
                      </a>
                    </div>
                  </td>
                  <td>{player.Runs}</td>
                  <td>{player.BallsFaced}</td>
                  <td>{player.four}</td>
                  <td>{player.six}</td>
                  <td>{player.SR}</td>
                </tr>
              );
            })}
          </tbody>
          {partnership && partnership?.Batsmen && partnership?.Batsmen?.length ? (
            <tfoot>
              <tr>
                {isMobile ? (
                  <td colSpan="6">
                    <div className="tfooter-wrap">
                      <div className="ftr-cont">
                        <div className="heading1">मौजूदा साझेदारी</div>
                      </div>
                      <div className="ftr-cont">
                        <div className="wickets">
                        {partnership?.Runs || 0} <span>({Overs || 0} OV) R/R: {partnership?.Runrate || 0}</span>
                        </div>
                      </div>
                    </div>
                    <ul className="currentPartners">
                      {partnership?.Batsmen?.map((player) => {
                        return (
                          <li>
                            <a href={getPlayerUrl(player.playerName_en, player.Batsman)}>{player.name}</a>
                            <span> {player.Runs}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                ) : (
                  <>
                    <td>मौजूदा साझेदारी</td>
                    <td colSpan="5">
                      <div className="table-ftrWrap">
                        <div className="total">
                          {partnership?.Runs || 0}{" "}
                          <span className="ftr-rr">
                            ({Overs || 0} OV) R/R: {partnership?.Runrate || 0}
                          </span>
                        </div>
                        <div className="lastwicket">
                          <ul className="currentPartners">
                          {partnership?.Batsmen?.map((player) => {
                              return (
                                <li>
                                  <a href={getPlayerUrl(player.playerName_en, player.Batsman)}>{player.name}</a>
                                  <span> {player.Runs}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            </tfoot>
          ) : null}
        </table>
        <table className="cs-table table2">
          <thead>
            <tr>
              <th>बॉलर</th>
              <th>o</th>
              <th>m</th>
              <th>r</th>
              <th>wkt</th>
              <th>wd</th>
              <th>nb</th>
              <th>econ</th>
            </tr>
          </thead>
          <tbody>
            {liveBowler && liveBowler.length > 0 && liveBowler?.map((player, dex) => {
              return (
                <tr key={player.id}>
                  <td>
                    <div className="playerbox">
                      <a
                        href={`${publicRuntimeConfig.siteUrl}cricket/profile/${player.playerName_en?.toLowerCase()?.split(" ")?.join("-")}/${
                          player.id
                        }.html`}
                      >
                        <div className="img">
                          <LazyImage
                            src={`${publicRuntimeConfig.cricketImageProfileBase}${player.id}.png`}
                            alt={player.name}
                            title={player.name}
                            dontAlter={true}
                            holder={publicRuntimeConfig.capHolder}
                            height={30}
                            width={30}
                          />
                        </div>
                        <div className="txt">
                          <h3 className="playername">{`${player.name}${player.Isbowlingnow ? "*" : ""}${player.Is_substituted ? " (Substitute)": ""}${player.Issupersub ? " (Super Sub)": ""}`}</h3>
                        </div>
                      </a>
                    </div>
                  </td>
                  <td>{player.Over}</td>
                  <td>{player.Maiden}</td>
                  <td>{player.Runs}</td>
                  <td>{player.Wicket}</td>
                  <td>{player.wide}</td>
                  <td>{player.noball}</td>
                  <td>{player.Econ}</td>
                </tr>
              );
            })}
          </tbody>
          {/* {(score?.lastWicket || data?.lastWicket || { name: "0" })?.name != "0" ? ( */}
          <tfoot>
            <tr>
              {isMobile ? (
                <td colSpan="8">
                  <div className="tfooter-wrap">
                    <div className="ftr-cont">
                      <div className="heading1">पिछला विकेट</div>
                      <div className="small-head">
                        {lastWicket?.batsmanData?.name} <span>{lastWicket?.batsmanData?.Howout}</span>
                      </div>
                    </div>
                    <div className="ftr-cont">
                      <div className="wickets">
                        {lastWicket?.Score}/{lastWicket?.Wicket_No}{" "}
                        <span>({lastWicket?.Overs})</span>
                      </div>
                      <div className="rr">
                        {lastWicket?.batsmanData?.Runs} ({lastWicket?.batsmanData?.BallsFaced}){" "}
                        <span>SR {lastWicket?.batsmanData?.SR}</span>
                      </div>
                    </div>
                  </div>
                </td>
              ) : (
                <>
                  <td>पिछला विकेट</td>
                  <td colSpan="7">
                    <div className="table-ftrWrap">
                      <div className="total">
                        {lastWicket?.Score}/{lastWicket?.Wicket_No}{" "}
                        <span className="wickets">({lastWicket?.Overs})</span>
                      </div>
                      <div className="lastwicket">
                        <div className="player">
                          <a href="#">
                            {lastWicket?.batsmanData?.name} <span>{lastWicket?.batsmanData?.Howout}</span>
                          </a>
                        </div>
                        <div className="rr">
                          {lastWicket?.batsmanData?.Runs} ({lastWicket?.batsmanData?.BallsFaced})
                        </div>
                        <div className="sr">SR {lastWicket?.batsmanData?.SR}</div>
                      </div>
                    </div>
                  </td>
                </>
              )}
            </tr>
          </tfoot>
          {/* ) : null} */}
        </table>
      </div>
      <style>{`
        .quickScore-live {border-radius: 15px;background: #fff;margin-bottom:27px;box-shadow: 0 5px 7px #D8D8D8;padding: 20px;}
        .quickScore-live .overbox{padding-bottom: 10px;display: flex;align-items: center;}
        .quickScore-live .overbox .txt{color: #464646;font-size: 18px;font-family: 'Segoe Pro Regular';margin-right: 15px;}
        .quickScore-live .overbox ul {display: flex;}
        .quickScore-live .overbox ul li{width: 30px;background: #464646;color: #fff;border-radius: 50%;height: 30px;font-size: 16px;font-family: 'Segoe Pro Regular';text-align: center;line-height: 28px;margin-right:10px;}
        .quickScore-live .cs-table{width: 100%;font-family: 'Segoe Pro Regular';font-size: 13px;margin-bottom:30px;border-collapse: collapse;}
        .quickScore-live .cs-table:last-child{margin-bottom:0;}
        .quickScore-live .cs-table tr{background: #F5F5F5;border-bottom: 1px solid #D8D8D8;}
        .quickScore-live .cs-table tr.active {background:#fff;}
        .quickScore-live .cs-table tr th {width:137px;background:#001D42;text-transform: uppercase;color:#fff;font-family: 'Segoe Pro Regular';padding: 13px 0;}
        .quickScore-live .cs-table.table2 tr th {width:96px;}
        .quickScore-live .cs-table tr td {text-align: center;padding: 9px 0;vertical-align: middle;color: #001d42;}
        .quickScore-live .cs-table tr td .playerbox a{display: flex;align-items:center;}
        .quickScore-live .cs-table tr td .playerbox .img{flex:0 0 30px;height: 30px;margin-right: 15px;border-radius: 50%;background: #fff;overflow: hidden;box-shadow: 0 1px 8px #3336;}
        .quickScore-live .cs-table tr td .playerbox .txt .playername {color: #001D42;font-size:15px;text-transform: uppercase;font-family: 'Karma',serif !important;font-weight:bold;}
        .quickScore-live .cs-table tr th:first-child, .quickScore-live .cs-table tr td:first-child{text-align: left;padding-left:20px;width: 256px;}
        .quickScore-live .cs-table tfoot tr {background:#FF5148;}
        .quickScore-live .cs-table tfoot tr td{color:#fff; text-transform: uppercase;font-family: 'Segoe Pro Bold';}
        .quickScore-live .cs-table tfoot tr td:first-child{font-size:13px;}
        .quickScore-live .cs-table tfoot tr td .table-ftrWrap {display: flex;align-items: center;}
        .quickScore-live .cs-table tfoot tr td:nth-child(2) .total{font-size:20px;text-align: left;padding-left: 55px; margin-right: auto}
        .quickScore-live .cs-table tfoot tr td:nth-child(2) .total .ftr-rr{font-size:14px;padding-left: 15px}
        .quickScore-live .cs-table tfoot tr td:nth-child(2) .total .wickets {font-size: 14px;}
        .quickScore-live .cs-table tfoot tr td:nth-child(2) .lastwicket {display: flex;padding-right: 30px;align-items: center;}
        .quickScore-live .cs-table tfoot tr td:nth-child(2) .lastwicket .player {padding-right: 25px;}
        .quickScore-live .cs-table tfoot tr td:nth-child(2) .lastwicket .player a{color:#fff;}
        .quickScore-live .cs-table tfoot tr td:nth-child(2) .lastwicket .player a span{font-size: 12px;text-transform: initial;font-family: 'Segoe Pro Regular'; margin-left: 5px;}
        .quickScore-live .cs-table tfoot tr td:nth-child(2) .lastwicket .rr {font-size: 20px;margin-right: 18px;}
        .quickScore-live .cs-table tfoot tr td:nth-child(2) .lastwicket .sr {font-size: 14px;}
        .quickScore-live .cs-table.table2 tfoot tr td:nth-child(2) .total {padding-left: 0;}
        .quickScore-live .cs-table.table2 tr th:first-child, .quickScore-live .cs-table.table2 tr td:first-child {width: 286px;}
        .cmntry-dtls {font-size: 13px;margin-bottom: 0;padding-bottom: 15px;}
        .quickScore-live .currentPartners{display: flex;text-transform: initial;font-family: 'Segoe Pro Regular';}
        .quickScore-live .currentPartners li{margin-right:20px;}
        .quickScore-live .currentPartners li:last-child{margin-right:0;}
        .quickScore-live .currentPartners li a{color: #fff;}
        .quickScore-live .currentPartners li a span{font-family: 'Segoe Pro Bold';}

        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live{padding: 15px 0;border: 1px solid #D8D8D8;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table{margin-bottom: 30px;padding: 15px 0;font-size: 11px;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table:last-child {margin-bottom: 0;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tr th{padding:4px 0;font-size: 14px;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tr th:first-child, .quickScore-live .cs-table tr td:first-child {padding-left: 10px;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tr td .playerbox a .txt .playername{font-size: 14px;line-height: 12px;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tr td .playerbox .img{margin-right: 10px;}


        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr td:nth-child(2) .total .ftr-rr{color:#000;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr td .table-ftrWrap{justify-content: space-between;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr td:nth-child(2) .total{margin:0;}

        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr .tfooter-wrap {display: flex;justify-content: space-between;align-items: center;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr .tfooter-wrap .ftr-cont .heading1 {font-size: 15px;color: #fff;font-family: 'Mukta',sans-serif !important;font-weight: bold;text-transform: uppercase;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr .tfooter-wrap .ftr-cont .small-head {font-size: 12px;color: #fff;text-transform: uppercase;margin-top: 22px;font-family: 'Segoe Pro Regular'}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr .tfooter-wrap .ftr-cont .small-head span {display: block;text-transform: initial;color: #000;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr .tfooter-wrap .ftr-cont .wickets {font-size: 20px;color: #fff;font-family: 'Segoe Pro Bold';}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr .tfooter-wrap .ftr-cont .wickets span {font-size: 14px;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr .tfooter-wrap .ftr-cont .rr {font-size: 15px;margin-top: 22px;color: #fff;font-family: 'Segoe Pro Bold';}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr .tfooter-wrap .ftr-cont .rr span {font-size: 14px;font-family: 'Segoe Pro Regular';color: #000;padding-left: 16px;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .cs-table tfoot tr td {padding:5px 7px;}
        .CN-PageWrap.CN-Mobile-PageWrap .quickScore-live .currentPartners{font-size:11px;}
    `}</style>
    </>
  );
};

export default QuickScoreLiveCard;
