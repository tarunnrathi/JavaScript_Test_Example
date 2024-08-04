import LazyLoadImage from "components/Common/LazyLoadImage";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const TopSliderCard = ({ data }) => {
  const { matchno, date, day, matchstatus, teama: teamA, teamb: teamB, venue, type, matchresult, gacode, teama_eng, teamb_eng, matchid, testInnings } = data;
  const flagPlaceholder = "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/DefaultFlag-90x50-new.png";

  const quickScoreUrl = `cricket/live-score/${teama_eng?.toLowerCase().replaceAll(' ', '-')}-vs-${teamb_eng?.toLowerCase().replaceAll(' ', '-')}-live-score-${matchid}.html`;

  const teamATestInn = {};
  const teamBTestInn = {};

  if(testInnings && testInnings?.teama && testInnings?.teama.score) {
    teamATestInn.score = testInnings?.teama.score;
    teamATestInn.wickets = testInnings?.teama.wickets;
    teamA.overs = testInnings?.teama.overs;
    teamA.runRate = testInnings?.teama.runRate;
  }

  if(testInnings && testInnings?.teamb && testInnings?.teamb.score) {
    teamBTestInn.score = testInnings?.teamb.score;
    teamBTestInn.wickets = testInnings?.teamb.wickets;
    teamB.overs = testInnings?.teamb.overs;
    teamB.runRate = testInnings?.teamb.runRate;
  }

  return (
    <>
    <a className={type == "Up Next" ? 'disable-click' : ''} href={type != "Up Next" && quickScoreUrl ? `${publicRuntimeConfig.siteUrl}${quickScoreUrl}` : '#'} onClick={() => gacode ? ga(...gacode.split(',').map((item) => item.trim())) : ''}>
      <div className="strip">
        <div className="match-date">
          {matchno} - <span>{date}</span> {day}
        </div>
        <div className={`match-status ${matchstatus?.toLowerCase()}`}>{matchstatus}</div>
      </div>
      <div className="teamscoreWrap">
        <div className="scorebox">
          <h3 className="heading">{teamA?.s.short}</h3>
          <div className="flagWrap">
            {type !== "Up Next" ? <div className="text">
              <div className='score-2'>{`${teamA?.score || 0}/${teamA?.wickets || 0}`}</div>
              {teamATestInn?.score && <div className='score-2'>{`${teamATestInn?.score || 0}/${teamATestInn?.wickets || 0}`}</div>}
              <div className="runrate">{teamA ? `(${teamA?.overs ? teamA?.overs : ""}) RR ${teamA?.runRate ? teamA?.runRate : ""}` : "बल्लेबाजी बाकी है"}</div>
            </div>: null}
            <div className="flag">
              <LazyLoadImage src={teamA?.s.flag || flagPlaceholder} alt={teamA?.s.short} dontAlter={true} holder={flagPlaceholder}/>
            </div>
          </div>
        </div>
        <div className="vs">
          <img
            src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/vs-icon-2.png"
            alt="Team Versus"
            title="Team Versus"
          />
        </div>
        <div className="scorebox">
          <h3 className="heading">{teamB?.s.short}</h3>
          <div className="flagWrap">
            <div className="flag">
              <LazyLoadImage src={teamB?.s.flag || flagPlaceholder} alt={teamB?.s.short} dontAlter={true} holder={flagPlaceholder}/>
            </div>
            {type !== "Up Next" ? <div className="text">
              <div className='score-2'>{`${teamB?.score || 0}/${teamB?.wickets || 0}`}</div>
              {teamBTestInn?.score && <div className='score-2'>{`${teamBTestInn?.score || 0}/${teamBTestInn?.wickets || 0}`}</div>}
              <div className="runrate">{teamB ? `(${teamB?.overs ? teamB?.overs : ""}) RR ${teamB?.runRate ? teamB?.runRate : ""}` : "बल्लेबाजी बाकी है"}</div>
            </div> : null }
          </div>
        </div>
      </div>
      <p className="score-ftr">{matchresult || venue}</p>
    </a>
    <style jsx global>{`
     .disable-click {
        pointer-events: none;
        cursor: default;
      }
    `}</style>
    </>
  );
};

export default TopSliderCard;
