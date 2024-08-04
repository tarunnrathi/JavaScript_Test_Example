import React from "react";
import QuickLinks from "./Home/QuickLinks";
import RightSection from "./Home/RightSection";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import SvgIcons from "./SvgIcons";
import SITE_CONfIG from "config/site.config";
import LazyLoadImage from "components/Common/CustomImage";

const MatchCenter = (props) => {
  const { matchDetails } = props?.data;
  const { event } = matchDetails?.events || {};
  const { match_detail } = matchDetails || {};
  const { team } = matchDetails?.teams || {};
  const teamAslug = team?.[0]?.name?.replace(/ /g, "-")?.replace(/\./g, "")?.toLowerCase();
  const teamBslug = team?.[1]?.name?.replace(/ /g, "-")?.replace(/\./g, "")?.toLowerCase();
  const top_raider_defender = {
    raider_info: [],
    defender_info: []
  };
  let second_flag = true;
  Object.entries(team?.[0]?.squad || {})?.map(([key, squad], i) => {

    if (squad['top_raider']) {
      top_raider_defender.raider_info.team_a = {
        id: squad.id,
        name: squad.name,
        raids: squad.raids,
        points: squad.points
      };
    }

    if (squad['top_defender']) {
      top_raider_defender.defender_info.team_a = {
        id: squad.id,
        name: squad.name,
        raids: squad.tackles,
        points: squad.points
      };
    }

  })

  Object.entries(team?.[1]?.squad || {})?.map(([key, item], i) => {

    if (item['top_raider']) {
      top_raider_defender.raider_info.team_b = {
        id: item.id,
        name: item.name,
        raids: item.raids,
        points: item.points,
      };
    }

    if (item['top_defender']) {
      top_raider_defender.defender_info.team_b = {
        id: item.id,
        name: item.name,
        raids: item.tackles,
        points: item.points
      };
    }

  })
  const headToHead = [];

  const teamARaidPoints = team?.[0]?.stats?.points?.raid_points?.total || 0;
  const teamBRaidPoints = team?.[1]?.stats?.points?.raid_points?.total || 0;

  const teamATacklePoints = team?.[0]?.stats?.points?.tackle_points?.total || 0;
  const teamBTacklePoints = team?.[1]?.stats?.points?.tackle_points?.total || 0;

  const teamAAlloutPoints = team?.[0]?.stats?.points?.all_out || 0;
  const teamBAlloutPoints = team?.[1]?.stats?.points?.all_out || 0;

  const teamAExtrasPoints = team?.[0]?.stats?.points?.extras || 0;
  const teamBExtrasPoints = team?.[1]?.stats?.points?.extras || 0;

  const teamADeclarePoints = team?.[0]?.stats?.points?.declare || 0;
  const teamBDeclarePoints = team?.[1]?.stats?.points?.declare || 0;

  const teamASuperRaidPoints = team?.[0]?.stats?.raids?.super_raids || 0;
  const teamBSuperRaidPoints = team?.[1]?.stats?.raids?.super_raids || 0;

  const teamASuperTacklePoints = team?.[0]?.stats?.tackles?.super_tackles || 0;
  const teamBSuperTacklePoints = team?.[1]?.stats?.tackles?.super_tackles || 0;

  headToHead['raid_points'] = {
    team_a: teamARaidPoints,
    team_b: teamBRaidPoints,
    title: 'Raid Points'
  };

  headToHead['tackle_points'] = {
    team_a: teamATacklePoints,
    team_b: teamBTacklePoints,
    title: 'Tackle Points'
  };

  headToHead['allout_points'] = {
    team_a: teamAAlloutPoints,
    team_b: teamBAlloutPoints,
    title: 'All Out Points'
  };

  headToHead['extras_points'] = {
    team_a: teamAExtrasPoints,
    team_b: teamBExtrasPoints,
    title: 'Extra Points'
  };

  headToHead['declare'] = {
    team_a: teamADeclarePoints,
    team_b: teamBDeclarePoints,
    title: 'Declare Points'
  };

  headToHead['super_raid_points'] = {
    team_a: teamASuperRaidPoints,
    team_b: teamBSuperRaidPoints,
    title: 'Super Raid Points'
  };

  headToHead['super_tackle_points'] = {
    team_a: teamASuperTacklePoints,
    team_b: teamBSuperTacklePoints,
    title: 'Super Tackle Points'
  };
  return (
    <>
      <div className="pro-main-wrapper">
        <div className="content-wrap">
          <div className="pro-breadcrumb">
            <ul className="breadcrumb-list">
              <li>
                <a href="/" title="">
                  Hindi News{" "}
                  <svg
                    viewBox="0 0 32 32"
                    width={10}
                    height={10}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <style
                        dangerouslySetInnerHTML={{
                          __html: ".cls-1{fill:#231f20;}",
                        }}
                      />
                    </defs>
                    <title />
                    <g data-name="Layer 2">
                      <path
                        className="cls-1"
                        d="M16.88,15.53,7,5.66A1,1,0,0,0,5.59,7.07l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.42,0l9.61-9.61A.85.85,0,0,0,16.88,15.53Z"
                      />
                      <path
                        className="cls-1"
                        d="M26.46,15.53,16.58,5.66a1,1,0,0,0-1.41,1.41l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.41,0l9.62-9.61A.85.85,0,0,0,26.46,15.53Z"
                      />
                    </g>
                  </svg>{" "}
                </a>
              </li>
              <li>
                <a href="/pro-kabaddi-league/" title="">
                  Pro Kabaddi News 2021{" "}
                  <svg
                    viewBox="0 0 32 32"
                    width={10}
                    height={10}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <style
                        dangerouslySetInnerHTML={{
                          __html: ".cls-1{fill:#231f20;}",
                        }}
                      />
                    </defs>
                    <title />
                    <g data-name="Layer 2">
                      <path
                        className="cls-1"
                        d="M16.88,15.53,7,5.66A1,1,0,0,0,5.59,7.07l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.42,0l9.61-9.61A.85.85,0,0,0,16.88,15.53Z"
                      />
                      <path
                        className="cls-1"
                        d="M26.46,15.53,16.58,5.66a1,1,0,0,0-1.41,1.41l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.41,0l9.62-9.61A.85.85,0,0,0,26.46,15.53Z"
                      />
                    </g>
                  </svg>
                </a>
              </li>
              <li>{team?.[0]?.name} vs {team?.[1]?.name} Match Center</li>
            </ul>
            <SvgIcons />
          </div>
        </div>
      </div>
      <section className="main-block-container content-wrap top-section latest-update-wraper">
        <div className="left-section">
          {/*Schedule Main Section*/}
          <section className="schedule-main-block">
            <h1 className="double-title page-title">
              <span className="small-title" style={{ fontSize: 40 }}>
                {teamTranslationArr[teamAslug]} VS {teamTranslationArr[teamBslug]} Match Center
              </span>
              <span className="big-title">match centre</span>
            </h1>
            <div className="match-centre-det">
              <div className="match-txt">
                <h5 className="match-txt-value">
                  {match_detail?.match_number} - {teamTranslationArr[teamAslug]} vs {teamTranslationArr[teamBslug]}
                </h5>
              </div>
              <div className="match-detail-opt">
                <ul className="match-opt-list">
                  <li>
                    <a
                      href="#top-raiders-defenders"
                      title="Top Raiders/Defenders"
                    >
                      Top Raiders/Defenders
                    </a>
                  </li>
                  <li>
                    <a href="#squad" title="Squad">
                      Squad
                    </a>
                  </li>
                  <li>
                    <a href="#head-to-head" title="Head to Head">
                      Head to Head{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#live-match-event" title="LIVE Match Events">
                      LIVE Match Events
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="match-details-wrap">
              <div className="schedule-page-wrap">
                <div className="schedule-main-div">
                  <div className="match-other-details">
                    <div className="match-details-txt">
                      <span className="match-name">{match_detail?.match_number}</span>|
                      <span className="match-date">{new Date(match_detail?.date).toLocaleString('en-us', { weekday: 'long' })}, {new Date(match_detail?.date).toLocaleString('en-us', { day: 'numeric' })} {new Date(match_detail?.date).toLocaleString('en-us', { month: 'long' })}</span>
                      |
                      <span className="match-time">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                          fill="#425673"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                        </svg>
                        {match_detail?.start_time} (IST)
                      </span>
                    </div>
                    <div className="match-details-txt">
                      <span className="match-venue">
                        {match_detail?.venue?.name}
                      </span>
                    </div>
                    <div className="match-team-details">
                      <div className={`score-txt team-a-score-center`}>
                        <h5 className="score-val" style={{ color: (team?.[0]?.score > team?.[1]?.score) ? "#ff2759" : "#001d42" }}>
                          {team?.[0]?.score}
                        </h5>
                      </div>
                      <div
                        className={`team-name team_a_name  ${(team?.[0]?.score > team?.[1]?.score) ? "won-team" : ""} `}
                        style={{ textAlign: "left" }}
                      >
                        <a
                          href={`/pro-kabaddi-league/${teamAslug}-${team?.[0]?.id}`}
                          title={team?.[0]?.name}
                        >
                          {teamTranslationArr[teamAslug]}
                        </a>
                        <div className="progress-ellipse first-team-live-dot">
                          {Array.apply(null, Array(6)).map((_, idx) =>
                            <span className={`grey-cell ${idx < 5 ? "green-cell" : ''}`}>&nbsp;</span>
                          )}
                        </div>
                      </div>
                      <div className="team-logo">
                        <a
                          href={`/pro-kabaddi-league/${teamAslug}-${team?.[0]?.id}/`}
                          title=""
                        >
                          <LazyLoadImage src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}.png`}
                            alt={team?.[0]?.name}
                            title={team?.[0]?.name}
                            width={140}
                            height={100}
                          />
                        </a>
                      </div>
                      <div className="vs-logo">
                        <img src={`${SITE_CONfIG.imageBasePKL}/vs-img.png`} />
                      </div>
                      <div className="team-logo">
                        <a
                          href={`/pro-kabaddi-league/${teamBslug}-${team?.[1]?.id}/`}
                          title=""
                        >
                          <LazyLoadImage src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}.png`}
                            alt={team?.[1]?.name}
                            title={team?.[1]?.name}
                            width={140}
                            height={100}
                          />
                        </a>
                      </div>
                      <div
                        className="team-name team_b_name won-team"
                        style={{ textAlign: "right" }}
                      >
                        <a
                          href={`/pro-kabaddi-league/${teamBslug}-${team?.[1].id}/`}
                          title={team?.[1].name}
                        >
                          {teamTranslationArr[teamBslug]}
                        </a>

                        <div className="progress-ellipse second-team-live-dot">
                          {Array.apply(null, Array(6)).map((_, idx) =>
                            <span className={`grey-cell ${idx < 5 ? "green-cell" : ''}`}>&nbsp;</span>
                          )}
                        </div>
                      </div>
                      <div className="score-txt won-team team-b-score-center">
                        <h5 className="score-val" style={{ color: (team?.[1].score > team?.[0]?.score) ? "#ff2759" : "#001d42" }}>
                          {team?.[1]?.score}
                        </h5>
                      </div>
                    </div>
                    <div className="live-txt-div">
                      <span className="live-txt">MATCH CONCLUDED</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="match-part">
                <span className="match-part-val">{match_detail?.result?.value}</span>
              </div>
            </div>

            <div className="vsp20 clearfix" />
            <div className="schedule-wrap match-centre-wrap">
              <p>
                The 2019 Vivo Pro Kabaddi League is going to be the 7th season
                of the tournament. The defending champions are Bengaluru Bulls,
                who had defeated the Gujarat Fortunegiants in the 2018 Pro
                Kabaddi League final. The seventh season of VIVO Pro Kabaddi
                League will begin on July 20, 2019. It will be played in the
                caravan format with the teams playing across 12 cities. The
                final will be played on October 19, 2019.
              </p>

              <div className="def-raid-section" id="top-raiders-defenders">
                <h3 className="double-title">
                  <span className="small-title">Top Raiders/Defenders</span>
                  <span className="big-title">Raiders/Defenders</span>
                </h3>
                <div className="match-title-txt">
                  <h3 className="team-name-txt">
                    <a
                      href={`/pro-kabaddi-league/${teamAslug}-${team?.[0]?.id}/`}
                      title={team?.[0]?.name}
                    >
                      {teamTranslationArr[teamAslug]}
                    </a>
                  </h3>
                  <img src={`${SITE_CONfIG.imageBasePKL}/vs-img.png`} />
                  <h3 className="team-name-txt">
                    <a
                      href={`/pro-kabaddi-league/${teamBslug}-${team?.[1].id}/`}
                      title={team?.[1]?.name}
                    >
                      {teamTranslationArr[teamBslug]}
                    </a>
                  </h3>
                </div>
                <div className="top-player-div">
                  <div className="player-one">
                    <a
                      href={`/pro-kabaddi-league/${teamAslug}/${top_raider_defender?.raider_info?.team_a?.name
                        .replace(/ /g, "-")
                        .replace(/\./g, "")
                        .toLowerCase()}-${top_raider_defender?.raider_info?.team_a?.id}/`}
                      title=""
                    >
                      <LazyLoadImage
                        src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}-default.png`}
                        alt={top_raider_defender?.raider_info?.team_a?.name}
                        title={top_raider_defender?.raider_info?.team_a?.name}
                        height={141}
                        width={141}
                      />
                    </a>
                    <div className="player-det">
                      <h4 className="player-name">
                        <a
                          href={`/pro-kabaddi-league/${teamAslug}/${top_raider_defender?.raider_info?.team_a?.name
                            .replace(/ /g, "-")
                            .replace(/\./g, "")
                            .toLowerCase()}-${top_raider_defender?.raider_info?.team_a?.id}/`}
                          title={top_raider_defender?.raider_info?.team_a?.name}
                        >
                          {top_raider_defender?.raider_info?.team_a?.name}
                        </a>
                      </h4>
                      <h5 className="player-des">Top Defender</h5>
                    </div>
                  </div>
                  <div className="player-scores">
                    <div className="score-text-div">
                      <h4 className="score-val-div">{top_raider_defender?.raider_info?.team_a?.raids.total}</h4>
                      <h4 className="score-val-div">{top_raider_defender?.raider_info?.team_a?.points.total}</h4>
                    </div>
                    <div className="raid-tackle-div">
                      <h5 className="raid-txt">Raid Attempted</h5>
                      <h5 className="raid-txt">Raid Points</h5>
                    </div>
                    <div className="score-text-div">
                      <h4 className="score-val-div">{top_raider_defender?.raider_info?.team_b?.raids?.total}</h4>
                      <h4 className="score-val-div">{top_raider_defender?.raider_info?.team_b?.points?.total}</h4>
                    </div>
                  </div>
                  <div className="player-two">
                    <div className="player-det">
                      <h4 className="player-name">
                        <a
                          href={`/pro-kabaddi-league/${teamBslug}/${top_raider_defender?.raider_info?.team_b?.name
                            .replace(/ /g, "-")
                            .replace(/\./g, "")
                            .toLowerCase()}-${top_raider_defender?.raider_info?.team_b?.id}/`}
                          title={top_raider_defender?.raider_info?.team_b?.name}
                        >
                          {top_raider_defender?.raider_info?.team_b?.name}
                        </a>
                      </h4>
                      <h5 className="player-des">Top Defender</h5>
                    </div>
                    <a
                      href={`/pro-kabaddi-league/${teamBslug}/${top_raider_defender?.raider_info?.team_b?.name
                        .replace(/ /g, "-")
                        .replace(/\./g, "")
                        .toLowerCase()}-${top_raider_defender?.raider_info?.team_b?.id}/`}
                      title={top_raider_defender?.raider_info?.team_b?.name}
                    >
                      <LazyLoadImage
                        src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}-default.png`}
                        alt={top_raider_defender?.raider_info?.team_b?.name}
                        title={top_raider_defender?.raider_info?.team_b?.name}
                        height={141}
                        width={141}
                      />
                    </a>
                  </div>
                </div>
                <div className="top-player-div">
                  <div className="player-one">
                    <a
                      href={`/pro-kabaddi-league/${teamAslug}/${top_raider_defender?.defender_info?.team_a?.name
                        .replace(/ /g, "-")
                        .replace(/\./g, "")
                        .toLowerCase()}-${top_raider_defender?.defender_info?.team_a?.id}/`}
                      title={top_raider_defender?.defender_info?.team_a?.name}
                    >
                      <LazyLoadImage src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}-default.png`}
                        alt={team?.[0]?.name}
                        title={team?.[0]?.name}
                        height={141}
                        width={141}
                      />
                    </a>
                    <div className="player-det">
                      <h4 className="player-name">
                        <a
                          href={`/pro-kabaddi-league/${teamAslug}/${top_raider_defender?.defender_info?.team_a?.name
                            .replace(/ /g, "-")
                            .replace(/\./g, "")
                            .toLowerCase()}-${top_raider_defender?.defender_info?.team_a?.id}/`}
                          title={top_raider_defender?.defender_info?.team_a?.name}
                        >
                          {top_raider_defender?.defender_info?.team_a?.name}
                        </a>
                      </h4>
                      <h5 className="player-des">Top Defender</h5>
                    </div>
                  </div>
                  <div className="player-scores">
                    <div className="score-text-div">
                      <h4 className="score-val-div">{top_raider_defender?.defender_info?.team_a?.raids?.total}</h4>
                      <h4 className="score-val-div">{top_raider_defender?.defender_info?.team_a?.points?.total}</h4>
                    </div>
                    <div className="raid-tackle-div">
                      <h5 className="raid-txt">Tackles Attempted</h5>
                      <h5 className="raid-txt">Tackles Points</h5>
                    </div>
                    <div className="score-text-div">
                      <h4 className="score-val-div">{top_raider_defender?.defender_info?.team_b?.raids?.total}</h4>
                      <h4 className="score-val-div">{top_raider_defender?.defender_info?.team_b?.points?.total}</h4>
                    </div>
                  </div>
                  <div className="player-two">
                    <div className="player-det">
                      <h4 className="player-name">
                        <a
                          href={`/pro-kabaddi-league/${teamBslug}/${top_raider_defender?.defender_info?.team_b?.name
                            .replace(/ /g, "-")
                            .replace(/\./g, "")
                            .toLowerCase()}-${top_raider_defender?.defender_info?.team_b?.id}/`}
                          title={top_raider_defender?.defender_info?.team_b?.name}
                        >
                          {top_raider_defender?.defender_info?.team_b?.name}
                        </a>
                      </h4>
                      <h5 className="player-des">Top Defender</h5>
                    </div>
                    <a
                      href={`/pro-kabaddi-league/${teamBslug}/${top_raider_defender?.raider_info?.team_b?.name
                        .replace(/ /g, "-")
                        .replace(/\./g, "")
                        .toLowerCase()}-${top_raider_defender?.raider_info?.team_b?.id}/`}
                      title={top_raider_defender?.raider_info?.team_b?.name}
                    >
                      <LazyLoadImage
                        src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}-default.png`}
                        title={top_raider_defender?.raider_info?.team_b?.name}
                        alt={top_raider_defender?.raider_info?.team_b?.name}
                        height={141}
                        width={141}
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="two-block-section clearfix">
                <div className="block-two-third" id="squad">
                  <h3 className="double-title">
                    <span className="small-title">Squad</span>
                    <span className="big-title">Squad</span>
                  </h3>
                  <table className="squad-table">
                    <thead>
                      <tr>
                        <th width="45%">
                          <div className="squad-team-name">
                            <LazyLoadImage
                              src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}.png`}
                              alt={teamTranslationArr[teamAslug]}
                              title={teamTranslationArr[teamAslug]}
                              height={56}
                              width={79}
                            />
                            <span className="squad-name-txt">
                              <a href={`/pro-kabaddi-league/${teamAslug}-${team?.[0]?.id}/`}>
                                {teamTranslationArr[teamAslug]}
                              </a>
                            </span>
                          </div>
                        </th>
                        <th width="10%" />
                        <th width="45%">
                          <div className="squad-team-name">
                            <span className="squad-name-txt">
                              <a href={`/pro-kabaddi-league/${teamBslug}-${team?.[1].id}/`}>
                                {teamTranslationArr[teamBslug]}
                              </a>
                            </span>
                            <LazyLoadImage
                              src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}.png`}
                              alt={teamTranslationArr[teamBslug]}
                              title={teamTranslationArr[teamBslug]}
                              width={79}
                              height={57}
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(team?.[0]?.squad || {})?.map(([teamKey, teamData], i) => {
                        const playerSlug = teamData.name
                          .replace(/ /g, "-")
                          .replace(/\./g, "")
                          .toLowerCase();
                        const playerAslug = team?.[1].squad[teamKey]?.name.replace(/ /g, "-")
                          .replace(/\./g, "")
                          .toLowerCase();

                        return (
                          <tr key={`squad${i}`}>
                            <td>
                              <a
                                href={`/pro-kabaddi-league/${teamAslug}/${playerSlug}-${teamData.id}/`}
                                title={`${teamData.name}${teamData?.starter ? '(S)' : ''}`}
                              >
                                {`${teamData?.name}${teamData?.starter ? '(S)' : ''}`}
                              </a>
                            </td>
                            <td>{teamData?.points?.total || 0} - {team?.[1]?.squad?.[teamKey]?.points?.total || 0}</td>
                            <td>
                              <a
                                href={`/pro-kabaddi-league/${teamBslug}/${playerAslug}-${team?.[1].squad?.[teamKey]?.id}/`}
                                title={`${team?.[1].squad?.[teamKey]?.name}${team?.[1].squad?.[teamKey]?.starter ? '(S)' : ''}
                              `}
                              >
                                {team?.[1]?.squad?.[teamKey]?.name}
                                {team?.[1]?.squad?.[teamKey]?.starter ? '(S)' : ''}
                              </a>
                            </td>
                          </tr>
                        )
                      }
                      )}


                    </tbody>
                  </table>
                </div>
                <div className="block-one-third" id="head-to-head">
                  <h3 className="double-title">
                    <span className="small-title">Head to Head</span>
                    <span className="big-title">Head to Head</span>
                  </h3>
                  <table className="squad-table head-to-head">
                    <thead>
                      <tr>
                        <th width="50%">
                          <div className="">
                            <span className="squad-name-txt">
                              <a href={`/pro-kabaddi-league/${teamAslug}-${team?.[0]?.id}/`}>
                                {teamTranslationArr[teamAslug]}
                              </a>
                            </span>
                          </div>
                        </th>
                        <th width="50%">
                          <div className="">
                            <span className="squad-name-txt">
                              <a href={`/pro-kabaddi-league/${teamBslug}-${team?.[1].id}/`}>
                                {teamTranslationArr[teamBslug]}
                              </a>
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(headToHead).map(([key, headToH]) => {
                        let percentage = 0;
                        if (headToH.team_a || headToH.team_b) {
                          if (headToH.team_a > headToH.team_b) {
                            percentage = (headToH.team_a * 100) / (headToH.team_a + headToH.team_b) + "%";
                          } else {
                            percentage = (headToH.team_b * 100) / (headToH.team_a + headToH.team_b) + "%";;
                          }

                        }
                        return (
                          <tr>

                            <td colSpan={2}>
                              <div className="head-score">
                                <h3 className="score-val-txt">{headToH.team_a}</h3>
                                <h4 className="score-of-txt">{headToH.title}</h4>
                                <h3 className="score-val-txt">{headToH.team_b}</h3>
                              </div>
                              <div className={`empty-section ${headToH.team_a < headToH.team_b || headToH.team_a == headToH.team_b ? 'flipped' : ''}`}>
                                <div
                                  className="filled-section"
                                  style={{ width: percentage }}
                                />
                              </div>
                            </td>
                          </tr>)
                      })}

                    </tbody>
                  </table>
                </div>
              </div>

              <div className="live-blog-section" id="live-match-event">
                <h3 className="double-title">
                  <span className="small-title">
                    <span>Live</span> - Match Events
                  </span>
                  <span className="big-title">Match Events</span>
                </h3>
                <div className="blog-section-div">
                  <ul className="blog-list">
                    <li className="trophy">
                      <div className="blog-list-entry">
                        {match_detail?.result?.value && <h3 className="blog-list-title">{match_detail?.result?.value}</h3>}
                        {match_detail?.player_of_the_match &&
                          <span className="player-match-txt">
                            Player of the Match: {match_detail?.player_of_the_match[0]?.value}
                          </span>
                        }
                      </div>
                    </li>
                    {event?.map((item, index) => {
                      let second_half = (item.status_id === 2 && second_flag) ? true : false;
                      if (second_half && second_flag && index == 30) {
                        second_flag = false;
                        return (
                          <li className="trophy" key={`events${index}`}>
                            <div className="blog-list-entry">
                              <div className="blog-time" style={{ color: '#fff', fontSize: '12px', marginRight: '10px' }}>00:00</div>
                              <div className="blog-text-entry">
                                <h3 className="blog-list-title">Match Resume: Second Half Begins.</h3>
                              </div>
                            </div>
                          </li>)
                      }

                      return (
                        <li className={`msg ${item.event === "TimeOut" && "timeout"}`} key={index}>
                          <div className="blog-list-entry">
                            <div className="flex-one">
                              <div className="blog-time">{item.clock}</div>
                              <div className="blog-text-entry">
                                <h4 className="blog-main-entry">
                                  {item.event_text}
                                </h4>
                                <h5 className="blog-entry-sub">
                                  {item.event}
                                </h5>
                              </div>
                              <div className="blog-score">
                                {item.event !== "Substitution" &&
                                  <>
                                    <h5 className="blog-score-txt">{item.raid_points}</h5>
                                    <h6 className="blog-score-type">Raid Point</h6>
                                  </>
                                }
                              </div>
                            </div>
                            <div className="flex-two">
                              {item.event !== "Substitution" &&
                                <div className="blog-score">
                                  <h5 className="blog-score-txt">{item.raid_all_out_points}</h5>
                                  <h6 className="blog-score-type">
                                    RAID ALL OUT POINT
                                  </h6>
                                </div>}
                              <div className="tag-holder">
                                {item.do_or_die &&
                                  <a href="" title="">
                                    Do or Die
                                  </a>
                                }
                                {item.super_raid &&
                                  <a href="" title="">
                                    Super Raid
                                  </a>
                                }
                              </div>
                              {item.event !== "Substitution" &&
                                <div className="score-hyphen">{item?.score && item?.score[0]}{item?.score && "-"}{item?.score && item.score[1]}</div>
                              }
                            </div>
                          </div>
                        </li>)

                    }).reverse()}
                    <li className="trophy">
                      <div className="blog-list-entry">
                        <div
                          className="blog-time"
                          style={{ color: "#fff", fontSize: 12, marginRight: 10 }}
                        >
                          00:00
                        </div>
                        <div clas="blog-text-entry">
                          <h3 className="blog-list-title">Match Starts. First Half Begins.</h3>
                        </div>
                      </div>
                    </li>


                  </ul>
                </div>
              </div>

              <div
                style={{ textAlign: "center", minHeight: 90, marginBottom: 10 }}
              />
              <div className="vsp20 clearfix" />
            </div>
          </section>
          {/*Schedule Main Section*/}
        </div>

        <RightSection props={props?.data} />
      </section>
      <QuickLinks />

      <style jsx global>
        {`
    .pro-main-wrapper { padding: 5px 20px 0 20px;}
			.content-wrap { max-width: 1240px; margin: 0 auto;}
			.pro-breadcrumb {display: flex; justify-content: space-between; border-bottom: 1px dotted #969696; padding: 0 0 5px; align-items: center;}
			.breadcrumb-list { display: flex; align-items: center;}
			.breadcrumb-list li {font-size: 14px; color: #001d42;font-weight: 700; text-transform: uppercase; margin: 0 5px 0 0;}
			.breadcrumb-list li a {color: #969696;font-weight: 600;}
			.social-sharing {display: flex; align-items: center;}
			.social-share-link {width: 30px;  height: 30px; display: flex; align-items: center; border: 1px solid #7f7f7f; border-radius: 50%; margin: 0 0 0 10px;}
			.fb-link svg { margin: -10px 0 0;}
      .match-centre-det {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
      }

      .match-txt-value {
        color: #838383;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
      }
      .match-opt-list {
        display: flex;
      }
      .match-opt-list li {
        margin: 0 0 0 10px;
      }
      .match-opt-list li a {
        color: #ff2759;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        text-decoration: underline;
      }
      .match-details-wrap {
        position: relative;
      }
      .match-details-wrap .schedule-page-wrap {
        background: #f3f3f3;
        padding: 20px 0;
        border-top: 1px solid rgba(0, 29, 66, 0.2);
        border-bottom: 1px solid rgba(0, 29, 66, 0.2);
        margin: 10px 0 20px;
      }
      .schedule-main-div {
        display: flex;
      }
      .match-other-details {
        margin: 0;
        width: 100%;
        min-width: 82%;
      }
      .match-other-details .match-details-txt {
        color: #425673;
         margin: 0 0 10px;
      }
      .match-details-wrap .match-details-txt span {
        font-size: 14px;
        color: #425673;
        text-transform: uppercase;
      }
      .match-details-wrap .match-details-txt .match-venue {
        color: #525252;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        text-transform: capitalize;
      }
      .match-other-details .match-team-details {
        margin: 10px 0 0;
        justify-content: space-between;
      }				
      .match-details-wrap .score-txt {
        background: 0 0;
        border: none;
        width: auto;
        margin: 0 20px;
        padding: 15px 20px;
        border-radius: 0;
      }
      .match-details-wrap .score-txt:nth-child(1) {
        border-right: 1px solid rgba(0, 29, 66, 0.2);
      }
      .match-details-wrap .score-txt:nth-child(7) {
        border-left: 1px solid rgba(0, 29, 66, 0.2);
      }
      .match-details-wrap .score-val {
        font-size: 70px;
        font-weight: bold;
        text-transform: uppercase;
        color: #001d42;
      }
      .match-other-details .team-name a {
        font-size: 18px;
      }
      .progress-ellipse {
        margin: 10px 0 0;
      }
      
      .live-txt-div {
        text-align: center;
        margin: 15px 0 0;
      }
      .live-txt-div .live-txt {
        color: #ff2759;
        font-size: 16px;
        font-weight: 700;
        line-height: 18px;
        text-transform: uppercase;
      }
      .match-part {
        background: #fff;
        color: #001d42;
        font-size: 15px;
        font-weight: 400;
        border: 1px solid rgba(0, 29, 66, 0.2);
        border-radius: 20px;
        padding: 7px 20px;
        margin: 0 auto;
        position: relative;
        display: table;
        margin-top: -37px;
      }

      .progress-ellipse .grey-cell {
        display: inline-block;
        margin: 0 4px 0 0;
        width: 11px;
        height: 6px;
        border-radius: 3px;
        background-color: #979797;
      }
      .progress-ellipse .green-cell {
        background-color: #5ed096;
      }
      .match-details-wrap .team-logo img {
        width: 100%;
      }
      .match-other-details .match-team-details .score-txt.won-team {
        box-shadow: none;
    }
      .schedule-wrap p {font-size: 16px; color: #333; line-height: 25px; margin: 20px 0;}
      .def-raid-section {margin: 30px 0;}
							.def-raid-section .match-title-txt {
								display: flex;
								justify-content: center;
								align-items: center;
							}
							.team-name-txt, .team-name-txt a {
								font-weight: 700;
								font-size: 16px;
								color: #000;
								text-transform: uppercase;
								text-align: center;
								margin: 10px 0 0;
							}
							.def-raid-section .team-name-txt {
								opacity: 0.5;
								color: #001d42;
								font-size: 18px;
								font-weight: 400;
								text-transform: uppercase;
								margin: 0 20px;
							}
							.top-player-div {
								display: flex;
								align-items: center;
								justify-content: space-between;
								padding: 10px 0;
								border-bottom: 1px solid rgba(0, 29, 66, 0.2);
							}
							.top-player-div .player-one, .top-player-div .player-two {
								display: flex;
								align-items: center;
							}
							.top-player-div .player-det {
								margin: 0 15px;
							}
							.top-player-div .player-name, .top-player-div .player-name a {
								color: #ff2759;
								font-size: 16px;
								font-weight: 700;
								line-height: 20px;
							}
							.top-player-div .player-des {
								color: #656565;
								font-size: 13px;
								margin: 5px 0 0;
								font-weight: 400;
							}
							.top-player-div .player-scores {
								display: flex;
								align-items: center;
							}
							.top-player-div .score-text-div {
								opacity: 0.8;
								color: #001d42;
								font-size: 22px;
								font-weight: 700;
							}
							.top-player-div .score-val-div {
								padding: 7px 0;
							}
							.top-player-div .raid-tackle-div {
								text-align: center;
							}
							.top-player-div .raid-txt {
								color: #000;
								font-size: 14px;
								font-weight: 400;
								text-transform: uppercase;
								padding: 10px 0;
								width: 300px;
							}
							.top-player-div .raid-txt:before {
								content: "";
								display: inline-block;
								background: rgba(0, 29, 66, 0.2);
								width: 70px;
								height: 1px;
								position: relative;
								bottom: 4px;
								left: -10px;
							}
							.top-player-div .raid-txt:after {
								content: "";
								display: inline-block;
								background: rgba(0, 29, 66, 0.2);
								width: 70px;
								height: 1px;
								position: relative;
								bottom: 4px;
								right: -10px;
							}
              .two-block-section {
								width: 100%;
							}
							.two-block-section .block-two-third {
								width: 53%;
								margin: 0 30px 0 0;
								float: left;
							}
							.two-block-section .block-one-third {
								width: 43%;
								float: left;
							}
							.squad-table {
								width: 100%;
								border-collapse: collapse;
								border-spacing: 0;
							}
							.squad-table th {
								background-color: #f3f3f3;
								padding: 0 5px;
								height: 60px;
								vertical-align: middle;
								width: 43%;
							}
							.squad-table th:nth-child(2) {
								width: 14%;
							}
							.squad-table .squad-team-name {
								display: flex;
								align-items: center;
							}
							.squad-table .squad-team-name img {
								width: 40%;
							}
							.squad-table .squad-team-name .squad-name-txt, .squad-table .squad-team-name .squad-name-txt a {
								margin: 0 5px;
								color: #001d42;
								font-size: 16px;
								font-weight: 700;
								text-transform: uppercase;
								min-width: 90px;
								white-space: normal;
							}
							.squad-table td:first-child, .squad-table td:first-child a {
								color: #425673;
								font-size: 16px;
								font-weight: 400;
								line-height: 27.48px;
								letter-spacing: 0.83px;
								text-align: left;
							}
							.squad-table td {
								padding: 5px;
								border-bottom: 1px solid rgba(0, 29, 66, 0.2);
								font-size: 18px;
							}
							.squad-table a, .squad-table td:last-child {
								color: #001d42;
								font-size: 16px;
								font-weight: bold;
								line-height: 27.48px;
								letter-spacing: 0.83px;
								text-align: right;
							}
							.squad-table td:nth-child(2) {
								color: #000;
								font-size: 18px;
								font-weight: 400;
								line-height: 51px;
								width: 87px;
								text-align: center;
							}
							.head-to-head {
								display: table;
							}
							.head-to-head th:first-child {
								text-align: left;
							}
							.head-to-head th:last-child > div {
								text-align: right;
							}
							.head-score {
								display: flex;
								align-items: center;
								justify-content: space-between;
							}
							.head-score .score-val-txt {
								opacity: 0.8;
								color: #001d42;
								font-size: 22px;
								font-weight: 700;
								letter-spacing: 0.44px;
							}
							.head-score .score-of-txt {
								opacity: 0.8;
								color: #000;
								font-size: 12px;
								font-weight: 400;
								line-height: 20px;
								text-transform: uppercase;
							}
							.head-to-head .empty-section {
								background-color: rgba(0, 0, 0, 0.2);
								height: 10px;
								border-radius: 5px;
							}
              .head-to-head .empty-section.flipped {
                  transform: rotate(180deg);
              }
							.head-to-head .filled-section {
								background-color: #ff2759;
								height: 10px;
								border-radius: 5px;
							}
							.head-to-head td {
								border-bottom: none;
								padding: 18px 5px;
							}
              .live-blog-section {
								margin: 30px 0;
							}
							.blog-section-div .blog-list {
								margin: 20px 10px;
							}
							.blog-section-div .blog-list .trophy {
								background: url(https://images.news18.com/ibnlive/uploads/2019/07/blog-bg.png) center right no-repeat #ff2759;
								border: 1px solid #ff2759;
								padding: 20px 20px 20px 40px;
							}

							.blog-section-div .blog-list li {
								padding: 15px 15px 15px 40px;
								border-radius: 5px;
								position: relative;
								margin: 0 0 10px;
								border: 1px solid #8593a5;
							}
							.blog-section-div .blog-list .trophy:before {
								background-position: 11px 8px;
								background-color: #ff2759;
								border: 3px solid #fff;
							}
							.blog-section-div .blog-list li:before {
								content: "";
								display: inline-block;
								position: absolute;
								left: -20px;
								width: 40px;
								height: 40px;
								border-radius: 50%;
								top: 50%;
								margin-top: -22px;
								background: url(https://images.news18.com/ibnlive/uploads/2019/07/sprite-icons.png) no-repeat;
							}
							.blog-section-div .blog-list .trophy .blog-list-entry {
								display: flex;
								align-items: center;
							}
							.blog-section-div .blog-list-entry {
								display: flex;
							}
							.blog-section-div .blog-list .trophy .blog-list-title {
								color: #fff;
								font-size: 20px;
								font-weight: 700;
								line-height: 20px;
							}
							.blog-section-div .blog-list .trophy .player-match-txt {
								color: #001d42;
								font-size: 14px;
								font-weight: 400;
								line-height: 20px;
								display: inline-block;
								border-radius: 15px;
								border: 1px solid #b2b2b2;
								background-color: #fff;
								padding: 3px 10px;
								margin: 0 0 0 10px;
							}
							.blog-section-div .blog-list .msg:before {
								background-position: 11px -27px;
								background-color: #fff;
								border: 1px solid #8593a5;
							}
							.blog-section-div .blog-list-entry .flex-one {
								display: flex;
								align-items: center;
								border-right: 1px solid #8593a5;
								width: 48%;
							}
							.blog-section-div .blog-time {
								color: #001d42;
								font-size: 15px;
								font-weight: 700;
								line-height: 20px;
							}
							.blog-section-div .blog-text-entry {
								margin: 0 20px;
								width: 250px;
							}
							.blog-section-div .blog-text-entry .blog-main-entry {
								color: #001d42;
								font-size: 15px;
								font-weight: 400;
								line-height: 22px;
							}
							.blog-section-div .blog-text-entry .blog-entry-sub {
								color: #ff2759;
								font-size: 12px;
								font-weight: 400;
								line-height: 20px;
								text-transform: uppercase;
							}
							.blog-section-div .blog-score {
								display: flex;
								align-items: center;
							}
							.blog-section-div .blog-score .blog-score-txt {
								color: rgba(0, 0, 0, 0.8);
								font-size: 30px;
								font-weight: 400;
								line-height: 35px;
								margin: 0 5px;
							}
							.blog-section-div .blog-score .blog-score-type {
								color: rgba(0, 0, 0, 0.8);
								font-size: 12px;
								font-weight: 400;
								line-height: 14px;
								text-transform: uppercase;
							}
							.blog-section-div .blog-list-entry .flex-two {
								display: flex;
								align-items: center;
								margin: 0 0 0 20px;
								width: 48%;
							}
							.blog-section-div .blog-list-entry .flex-two .tag-holder {
								width: 250px;
								margin: 0 20px;
							}
							.blog-section-div .tag-holder a {
								display: inline-block;
								color: #ff2759;
								font-size: 14px;
								font-weight: 400;
								line-height: 20px;
								border-radius: 15px;
								border: 1px solid #b2b2b2;
								background-color: #f3f3f3;
								padding: 5px 10px;
							}
							.blog-section-div .score-hyphen {
								color: #425673;
								font-size: 30px;
								font-weight: bold;
								line-height: 20px;
								width: 100px;
								text-align: right;
							}
							.blog-section-div .blog-list .msg.timeout {
								background-color: #f3f3f3;
							}
							.blog-section-div .blog-list .msg.timeout .flex-one {
								border: none;
								width: 70%;
								justify-content: start;
							}
              .left-section {width: calc(100% - 330px);}
				.double-title.page-title {align-items: flex-end; margin-bottom: 10px;}
				.double-title {font-weight: 500; display: flex; align-items: flex-start;text-transform: uppercase; border-bottom: 1px solid #ccd2d9; position: relative;}
				.double-title.page-title .small-title {font-size: 36px; line-height: 44px; font-weight: bold;}
				.small-title {font-size: 24px; font-weight: normal; text-transform: uppercase; color: #001d42; padding: 0 0 10px; line-height: 18px;}
				.big-title, .tags-big-title { font-size: 40px; color: rgba(0, 29, 66, 0.1); margin: -3px 0 0 -8px; display: none;}
				.double-title.page-title .big-title { font-size: 40px; margin: 0;}
        .right-section {width: 300px; margin: 0 0 0 30px;}
				.placeholderRHS {width: 100%;	height: 250px;	background-color: #ccc;}
        .main-block-container {
          display: flex;
          padding-top: 10px;
      }
      .match-other-details .won-team.team-name a b{
        color: #ff2759;
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
    }
    .live-blog-section .small-title span {
      color: #ff2759;
    }
      
  `}
      </style>
    </>
  );
};

export default MatchCenter;
