import { React, useEffect } from "react";
import Glide from "@glidejs/glide";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import LazyLoadImage from "components/Common/CustomImage";
import SITE_CONfIG from "config/site.config";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const MatchCenter = (props) => {

  const { matchDetails, pageAds } = props.data;
  const { event } = matchDetails.events || {};
  const { match_detail } = matchDetails || {};
  const { team } = matchDetails.teams || {};
  const teamAslug = team?.[0]?.name?.replace(/ /g, "-")?.replace(/\./g, "")?.toLowerCase();
  const teamBslug = team?.[1]?.name?.replace(/ /g, "-")?.replace(/\./g, "")?.toLowerCase();
  let second_flag = true;
  const top_raider_defender = {
    raider_info: [],
    defender_info: []
  };
  useEffect(() => {
    if (document.getElementsByClassName('topdefsldr').length) {
      new Glide(document.querySelector('.topdefsldr'), {
        autoplay: false,
        type: 'carousal',
        perView: 1,
        gap: 10,
        slidesToScroll: 1,
      }).mount();
    }
  }, []);

  Object.entries(team?.[0]?.squad || {})?.map(([key, squad], i) => {

    if (squad['top_raider']) {
      top_raider_defender.raider_info.team_a = {
        id: squad?.id,
        name: squad?.name,
        raids: squad?.raids,
        points: squad?.points
      };
    }

    if (squad['top_defender']) {
      top_raider_defender.defender_info.team_a = {
        id: squad?.id,
        name: squad?.name,
        raids: squad?.tackles,
        points: squad?.points
      };
    }
  })

  Object.entries(team?.[1]?.squad || {}).map(([key, item], i) => {

    if (item['top_raider']) {
      top_raider_defender.raider_info.team_b = {
        id: item?.id,
        name: item?.name,
        raids: item?.raids,
        points: item?.points,
      };
    }

    if (item['top_defender']) {
      top_raider_defender.defender_info.team_b = {
        id: item?.id,
        name: item?.name,
        raids: item?.tackles,
        points: item?.points
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
      <div className="wrapper">
        <div className="bredcrum">
          <div className="bredcrum-txt">
            <a href="/">
              <span>Hindi News</span>{" "}
            </a>
            <a href="/pro-kabaddi-league/">
              {" "}
              ›› <span>Pro Kabaddi News 2021</span>
            </a>

            <a href="">
              {" "}
              ›› <span className="pagetitle">{team?.[0]?.name} vs {team?.[1]?.name} Match Center</span>{" "}
            </a>
          </div>
        </div>

        <div className="add clearfix">
          <div
            className="addinner-box"
            style={{ height: 268, width: 300, margin: "0 auto" }}
          >
            <span id="first">विज्ञापन</span>
            <SiteAd
              width={336}
              height={280}
              adUnit={pageAds?.ATF_320}
              sizes={[
                [300, 250],
                [336, 280],
                [250, 250]
              ]}
              lazyload={true}
            ></SiteAd>
          </div>
        </div>

        <h1 className="mainhead">pro kabaddi match Center</h1>

        <p className="current_match">{match_detail?.match_number} - {teamTranslationArr[teamAslug]} vs {teamTranslationArr[teamBslug]}</p>
      </div>
      <div className="wrapper">
        <div className="matchcenter">
          <div className="matchcontentbox odd">
            <ul className="livedetails1">
              <li className="first">{match_detail?.match_number}</li>
              <li>{new Date(match_detail?.date).toLocaleString('en-us', { weekday: 'long' })}, {new Date(match_detail?.date).toLocaleString('en-us', { day: 'numeric' })} {new Date(match_detail?.date).toLocaleString('en-us', { month: 'long' })}</li>
              <li>
                <img
                  src={`${SITE_CONfIG.imageBasePKL}/watch.png`}
                  alt="vs"
                />{" "}
                {match_detail?.start_time} (IST)
              </li>
            </ul>
            <ul className="stadium">
              <li>{match_detail?.venue?.name}</li>
            </ul>
            <ul className="teamname">
              <li id="first-team">
                <LazyLoadImage
                  src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}.png`}
                  alt={team?.[0].name}
                  height={78}
                  width={109}
                  className="boock"
                />
                <h4 style={{ color: "#ff2759" }}>{teamTranslationArr[teamAslug]}</h4>
                <ul className="livedot">
                  {Array.apply(null, Array(6)).map((_, idx) =>
                    <li className={idx < 4 ? "active" : ''}>&nbsp;</li>
                  )}
                </ul>
                <div className="team-a-score">
                  <div className={`${team?.[1]?.score < team?.[0]?.score ? "red-circle" :
                    "grey-circle"
                    }`}>{team?.[0]?.score}
                  </div>
                </div>
              </li>
              <li>
                <img
                  src={`${SITE_CONfIG.imageBasePKL}/vs.png`}
                  alt="VS"
                />{" "}
              </li>
              <li id="second-team">
                <LazyLoadImage
                  src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}.png`}
                  alt={team?.[1]?.name}
                  height={78}
                  width={109}
                  className="boock"
                />
                <h4 style={{ color: "#001d42" }}>{teamTranslationArr[teamBslug]}</h4>
                <ul className="livedot">
                  {Array.apply(null, Array(6)).map((_, idx) =>
                    <li className={idx < 6 ? "active" : ''}>&nbsp;</li>
                  )}
                </ul>
                <div className="team-b-score">
                  <div className={`${team?.[1]?.score > team?.[0]?.score ? "red-circle" :
                    "grey-circle"
                    }`}>{team?.[1]?.score}
                  </div>
                </div>
              </li>
            </ul>
            <ul className="concludednow">
              <li>MATCH CONCLUDED</li>
            </ul>
            <ul className="currentstatus">
              {match_detail?.result?.value && <li>{match_detail.result.value}</li>}
            </ul>
            <div className="clearfix" />
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="def-raid-section" id="top-raiders-defenders">
          <h3 className="double-title">
            <span className="small-title">Top Raiders/Defenders</span>
            <span className="big-title">Raiders/Defenders</span>
          </h3>
          <div className="topdefsldr">
            <div className="topdefsldrin" data-glide-el="track">
              <ul>
                <li>
                  <div>
                    <ul className="teamname">
                      <li>
                        <h4>
                          {teamTranslationArr[teamAslug]}
                        </h4>
                      </li>
                      <li>
                        <img
                          src={`${SITE_CONfIG.imageBasePKL}/vs.png`}
                          alt="VS"
                        />
                      </li>
                      <li>
                        <h4>
                          {teamTranslationArr[teamBslug]}
                        </h4>
                      </li>
                    </ul>
                    <ul className="player_thumb">
                      <li>
                        <LazyLoadImage
                          src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}-default.png`}
                          width={141}
                          height={141}
                          alt={top_raider_defender?.raider_info?.team_a?.name}
                        />
                        <h4>{top_raider_defender?.raider_info?.team_a?.name}</h4>
                        <p>Top Raider</p>
                      </li>
                      <li>
                        <LazyLoadImage
                          src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}-default.png`}
                          width={141}
                          height={141}
                          alt={top_raider_defender?.raider_info?.team_b?.name}
                        />
                        <h4>{top_raider_defender?.raider_info?.team_b?.name}</h4>
                        <p>Top Raider</p>
                      </li>
                    </ul>
                    <ul className="raida">
                      <li>{top_raider_defender?.raider_info?.team_a?.raids?.total}</li>
                      <li>&nbsp;</li>
                      <li className="attempt">Raid Attempted</li>
                      <li>&nbsp;</li>
                      <li>{top_raider_defender?.raider_info?.team_b?.raids?.total}</li>
                    </ul>
                    <ul className="raida">
                      <li>{top_raider_defender?.raider_info?.team_a?.points?.total}</li>
                      <li>&nbsp;</li>
                      <li className="attempt">Raid Points</li>
                      <li>&nbsp;</li>
                      <li>{top_raider_defender?.raider_info?.team_b?.points?.total}</li>
                    </ul>
                    <div className="greyline">&nbsp;</div>
                  </div>
                </li>
                <li>
                  <div>
                    <ul className="teamname">
                      <li>
                        {/* <h4>Bengaluru<br>Bulls</h4> */}
                        <h4>
                          {teamTranslationArr[teamAslug]}
                        </h4>
                      </li>
                      <li>
                        <img
                          src={`${SITE_CONfIG.imageBasePKL}/vs.png`}
                          alt="VS"
                        />
                      </li>
                      <li>
                        <h4>
                          {teamTranslationArr[teamBslug]}
                        </h4>
                      </li>
                    </ul>
                    <ul className="player_thumb">
                      <li>
                        <LazyLoadImage
                          src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}-default.png`}
                          width={141}
                          height={141}
                          alt={top_raider_defender?.defender_info?.team_a?.name}
                        />
                        <h4>{top_raider_defender?.defender_info?.team_a?.name}</h4>
                        <p>Top Raider</p>
                      </li>
                      <li>
                        <LazyLoadImage
                          src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}-default.png`}
                          width={141}
                          height={141}
                          alt={top_raider_defender?.defender_info?.team_b?.name}
                        />
                        <h4>{top_raider_defender?.defender_info?.team_b?.name}</h4>
                        <p>Top Raider</p>
                      </li>
                    </ul>
                    <ul className="raida">
                      <li>{top_raider_defender?.defender_info?.team_a?.raids?.total}</li>
                      <li>&nbsp;</li>
                      <li className="attempt">Raid Attempted</li>
                      <li>&nbsp;</li>
                      <li>{top_raider_defender?.defender_info?.team_b?.raids?.total}</li>
                    </ul>
                    <ul className="raida">
                      <li>{top_raider_defender?.defender_info?.team_a?.points.total}</li>
                      <li>&nbsp;</li>
                      <li className="attempt">Raid Points</li>
                      <li>&nbsp;</li>
                      <li>{top_raider_defender?.defender_info?.team_b?.points?.total}</li>
                    </ul>
                    <div className="greyline">&nbsp;</div>
                  </div>
                </li>
              </ul>
            </div>
            <div data-glide-el="controls[nav]" className="topdefsldrbulet">
              <button type="button" data-glide-dir="=0" />
              <button type="button" data-glide-dir="=1" />
            </div>
          </div>

        </div>

      </div>
      <div className="wrapper">
        <div className="squad">
          <h3>Squad</h3>
          <ul className="teamname">
            <li>
              <h4>
                {teamTranslationArr[teamAslug]}
              </h4>
            </li>
            <li>
              <img
                src={`${SITE_CONfIG.imageBasePKL}/vs.png`}
                alt="VS"
              />
            </li>
            <li>
              <h4>
                {teamTranslationArr[teamBslug]}
              </h4>
            </li>
          </ul>
          {Object.entries(team?.[0]?.squad || {}).map(([teamKey, teamData], i) =>
            <>

              <ul className="squaddetails" key={`squaddetails${i}`}>
                <li>
                  <a title={`${teamData.name}${teamData?.starter ? '(S)' : ''}`}>
                    {`${teamData?.name}${teamData?.starter ? '(S)' : ''}`}
                  </a>
                </li>
                <li>{teamData?.points?.total || 0} - {team?.[1]?.squad[teamKey]?.points?.total || 0}</li>
                <li>
                  <a title={`${team?.[1]?.squad[teamKey]?.name}
                    ${team?.[1].squad[teamKey]?.starter ? '(S)' : ''}`}>
                    {team?.[1]?.squad[teamKey]?.name}
                    {team?.[1]?.squad[teamKey]?.starter ? '(S)' : ''}
                  </a>
                </li>
              </ul>
            </>)}

        </div>

      </div>
      <div className="wrapper">
        <div className="add clearfix">
          <div
            className="addinner-box"
            style={{ height: 268, width: 300, margin: "0 auto" }}
          >
            <span id="first">विज्ञापन</span>
            <SiteAd
              width={336}
              height={280}
              adUnit={pageAds?.ATF_300}
              sizes={[
                [300, 250],
                [336, 280],
                [250, 250]
              ]}
              lazyload={true}
            ></SiteAd>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="headtohead">
          <h3>Head to Head</h3>
          <ul className="teamname">
            <li>
              <h4>
                {teamTranslationArr[teamAslug]}
              </h4>
            </li>
            <li>
              <img
                src={`${SITE_CONfIG.imageBasePKL}/vs.png`}
                alt=""
              />{" "}
            </li>
            <li>
              <h4>
                {teamTranslationArr[teamBslug]}
              </h4>
            </li>
          </ul>
          {Object.entries(headToHead).map(([key, headToH]) => {
            let percentage = 0;
            if (headToH.team_a || headToH.team_b) {
              if (headToH.team_a > headToH.team_b) {
                percentage = (headToH.team_a * 100) / (headToH.team_a + headToH.team_b) + "%";
              } else {
                percentage = (headToH.team_b * 100) / (headToH.team_a + headToH.team_b) + "%";
              }
            }
            return (<>
              <ul className="details">
                <li>{headToH.team_a}</li>
                <li>{headToH.title}</li>
                <li>{headToH.team_b}</li>
              </ul>

              <div className="progress_bar-container">
                <div
                  className="progress_bar"
                  style={{
                    height: 5,
                    float: "right",
                    background: "#ff2759",
                    width: percentage
                  }}
                >
                  &nbsp;
                </div>
                <div className="clearfix">&nbsp;</div>
              </div>
            </>)
          })}
        </div>
      </div>
      <div className="wrapper">
        <div className="livematch">
          <h3>
            <span>Live</span> - Match Event
          </h3>
          <div className="live">Match Event</div>
          <div className="liveresult">
            <p>{match_detail?.result?.value}</p>
            <span className="ekcup">
              <LazyLoadImage
                src={`${SITE_CONfIG.imageBasePKL}/cup.png`}
                width={40}
                height={39}
                alt={"winner"}
              />
            </span>
            {match_detail?.player_of_the_match &&
              <span className="playermatch">Player of the Match: {match_detail?.player_of_the_match?.[0]?.value}</span>
            }
          </div>
        </div>
        {event?.map((item, index) => {
          let second_half = (item.status_id === 2 && second_flag) ? true : false;
          if (second_half && second_flag && index == 30) {
            second_flag = false;
            return (
              <div className="livematch">
                <div className="liveresult">
                  <span className="ekcup">
                    <LazyLoadImage
                      src={`${SITE_CONfIG.imageBasePKL}/cup.png`}
                      width={40}
                      height={39}
                      alt={"cup"}
                    />
                  </span>
                  <ul className="comn">
                    <li>00:00</li>
                    <li>Match Resume: Second Half Begins.</li>
                  </ul>
                </div>
              </div>
            )
          }
          return (
            <div className="commentry" key={`commentry${index}`}>
              <span className="comment">
                <LazyLoadImage
                  src={`${SITE_CONfIG.imageBasePKL}/comment.png`}
                  width={40}
                  height={39}
                  alt="comment"
                />
              </span>
              <ul className="comn" style={{ background: "#fff" }}>
                <li>{item.clock}</li>
                <li>
                  <p className="raider">{item.event_text}</p>
                  <p className="raidn">{item.event}</p>
                  <p>{item.raid_points} Raid Point</p>
                  {item.do_or_die &&
                    <p style={{ clear: "both", overflow: "hidden" }}>
                      <span>Do or Die</span>
                    </p>
                  }
                  {item.super_raid &&
                    <p style={{ clear: "both", overflow: "hidden" }}>
                      <span>Super Raid</span>
                    </p>
                  }
                  <p className="livescore">{item?.score && item?.score[0]}-{item?.score && item.score[1]}</p>
                </li>
              </ul>
            </div>)
        }).reverse()}
        <div className="livematch">
          <div className="liveresult">
            <span className="ekcup">
              <img
                src="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/cup.png"
                width={40}
                height={39}
                alt=""
              />
            </span>
            <ul className="comn">
              <li>00:00</li>
              <li>Match Starts: First Half Begins.</li>
            </ul>
          </div>
        </div>

      </div>
      <div className="wrapper">
        <div className="add clearfix">
          <div
            className="addinner-box"
            style={{ height: 268, width: 300, margin: "0 auto" }}
          >
            <span id="first">विज्ञापन</span>
            <a href="#">
              <SiteAd
                width={336}
                height={280}
                adUnit={pageAds?.BTF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                  [250, 250]
                ]}
                lazyload={true}
              ></SiteAd>
            </a>
          </div>
        </div>
      </div>


      <style jsx global>
        {`
        .wrapper { margin: 0px auto;}
        .wrapper { margin: 0 auto; position: relative;  padding: 0 10px; box-sizing: border-box;}
        .newadd {background: #efefef;line-height: 0; margin: 10px 0;}
        .newadd span {display: block; font-size: 12px; color: #8E8E8E; text-align: center; height: 20px; line-height: 20px;  width: 100%;}
        .newadd a { margin: 10px auto; display: block; min-height: 300px; width: 300px;}
        .add.clearfix { background: #dbdde3; height: auto; min-height: 300px;}
        .add span {color: #797e90; font-size: 11px; text-align: center; padding: 2px 0 0; display: block; line-height: 16px;}
        
        .mainhead { font-size: 24px; line-height: 28px;color: #001d42;text-transform: uppercase; font-weight: bold;border-bottom: 1px solid #ccd2d9; padding-bottom: 5px; margin-top: 25px;}
				.current_match {font-size: 14px;color: #838383;	line-height: 18px;	margin: 10px 0px;}
        .matchcontentbox{clear:both;padding:10px 0;border-bottom:1px solid #ccd2d9;border-top:1px solid #ccd2d9}.odd{background:#eeeff0;padding:10px 10px 0 10px !important}.livedetails1{display:flex;align-items:center;justify-content:center}.livedetails1 li{font-size:14px;font-weight:bold;color:#425673;padding:0 8px;border-right:1px solid #373737;text-transform:uppercase}.livedetails1 li:last-child{border-right:0}.livedetails1 li img{vertical-align:middle}.stadium{display:flex;align-items:center;justify-content:center}.stadium li{font-size:14px;float:left;width:100%;text-align:center;line-height:20px;padding:10px 0;background:#eeeff0;color:#525252}.matchcontentbox ul.teamname{display:flex;align-items:center;justify-content:center}.matchcontentbox ul.teamname li{font-size:14px;color:#001d42;font-weight:bold;text-transform:uppercase;text-align:center;width:46%;padding:0}.matchcontentbox ul.teamname li img{width:70%}.matchcontentbox ul.teamname li h4{margin:5px 0 5px 0}.matchcontentbox ul.teamname li ul.livedot{display:flex;align-items:center;justify-content:center;margin-top:5px}.matchcontentbox ul.teamname li{font-size:14px;color:#001d42;font-weight:bold;text-transform:uppercase;text-align:center;width:46%;padding:0}.matchcontentbox ul.teamname li ul.livedot li{width:5px;height:5px;background:#bdbdbd;margin:0 1px;border-radius:20px;min-width:5px}.matchcontentbox ul.teamname li ul.livedot li.active{background:#5ed096}.grey-circle{width:40px;height:40px;border-radius:50%;border:1px solid #bebebe;background:#fafafa;text-align:center;line-height:40px;font-size:20px;color:#425673;margin-top:0 !important}.red-circle{width:42px;height:42px;border-radius:50%;border:4px solid #f5cad4;background:#ff2759;text-align:center;line-height:35px;font-size:20px;color:#fff;margin-top:0 !important}.red-circle,.grey-circle{margin:0 auto !important;margin-top:10px !important}.matchcenter .red-circle,.matchcenter .grey-circle{margin:0 auto}.concludednow li{font-size:14px;font-weight:bold;color:#ff2759;text-align:center}.currentstatus{border:1px solid #dadada;background:#fff;border-radius:25px;text-align:center;padding:5px 15px;display:table;margin:0 auto 0;top:15px;position:relative}.currentstatus li{font-size:14px;color:#001d42;line-height:20px}	

        .topdefsldr{position: relative;  margin: 20px 0;}
				   .topdefsldrin{ overflow: hidden;}
				   .topdefsldr ul{display: flex;padding: 0 0 5px 0; justify-content:start;}
				   .topdefsldr ul li{height: 100%; min-height: 1px; text-align: center; flex-shrink:0;} 
				   .topdefsldr-arrow button{width: 25px;background: transparent;position: absolute;left: -35px;top: 0;bottom: 4px;}					   
				   .topdefsldr-arrow button:last-child{left: auto; right: -35px;}					   
					.topdefsldr-arrow button.left:before, .topdefsldr-arrow button.right:before {content: "";	display: block;	margin: 30px auto; width: 10px;	height: 10px; border-top: 2px solid #000;	border-left: 2px solid #000;transform: rotate(315deg);}
					.topdefsldr-arrow button.right:before {transform: rotate(136deg);}
					.topdefsldrbulet{display: flex; gap:5px; justify-content: center; margin-top: 5px;}
					.topdefsldrbulet button{width: 12px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block;}
					.topdefsldrbulet button.glide__bullet--active{background: #57005d;}
					
					.topdefsldr .teamname{display:flex;justify-content:center}.topdefsldr .player_thumb{display:flex;justify-content:center}.topdefsldr .raida{display:table;margin:0 auto;position:relative;margin-top:10px;margin-bottom:10px}.topdefsldr .greyline{width:100%;height:1px;line-height:1px;border-bottom:1px solid #ccd2d9}.topdefsldr .teamname li{font-size:14px;color:#001d42;text-transform:uppercase;text-align:center;min-width:95px}.topdefsldr h4{color:#a3a8b1}.topdefsldr .player_thumb li{text-align:center;width:50%;margin-bottom:10px}.topdefsldr .player_thumb li h4{font-size:16px;color:#ff2759;margin-top:10px;font-weight:bold}.topdefsldr .player_thumb li p{color:#656565;font-size:13px;margin-top:5px}.topdefsldr .raida li{float:left;padding:0 5px}.topdefsldr .raida li:first-child,.topdefsldr .raida li:last-child{font-size:22px;font-weight:bold;background:#fff;color:#586376;margin-top:4px}.topdefsldr .raida li:first-child{padding-left:0}.topdefsldr .raida li.attempt{background:#fff;padding-top:6px;text-transform:uppercase;font-size:14px;color:#585858}.topdefsldr .raida li:last-child{padding-right:0}.topdefsldr .raida:after{content:'';border-bottom:1px solid #999;position:absolute;width:100%;left:0;top:14px;z-index:-1}

          .def-raid-section .double-title .small-title {color: #425673;}
				.double-title.page-title {align-items: flex-end; margin-bottom: 10px;}
				.double-title {font-weight: 500; display: flex; align-items: flex-start;text-transform: uppercase; border-bottom: 1px solid #ccd2d9; position: relative;}
				.double-title.page-title .small-title {font-size: 36px; line-height: 44px; font-weight: bold;}
				.small-title {font-size: 24px; font-weight: normal; text-transform: uppercase; color: #001d42; padding: 0 0 10px; line-height: 18px;}
				.big-title, .tags-big-title { font-size: 40px; color: rgba(0, 29, 66, 0.1); margin: -3px 0 0 -8px; display: none;}
				.double-title.page-title .big-title { font-size: 40px; margin: 0;}				
				
				.def-raid-section {margin: 30px 0;}

        .squad h3 {
          font-size: 20px;
          line-height: 18px;
          color: #425673;
          text-transform: uppercase;
          margin: 30px 0 7px 0;
          position: relative;
          font-weight: normal;
        }
  
        .squad .teamname {
          display: flex;
          justify-content: center;
          background: #f3f3f3;
          padding-top: 15px;
          border-top: 1px solid #ccd2d9;
        }
  
        .squad .teamname li {
          font-size: 16px;
          color: #001d42;
          text-transform: uppercase;
          text-align: center;
          min-width: 105px;
          font-weight: bold;
          line-height: 1.5;
        }
  
        .squad .teamname li:first-child {
          text-align: left;
        }
  
        .squad .teamname li:last-child {
          text-align: right;
        }
  
        .squad .squaddetails {
          display: flex;
          justify-content: center;
          padding: 10px 0;
          border-bottom: 1px solid #ccd2d9;
        }
  
        .squad .squaddetails li {
          font-size: 16px;
          text-transform: none;
          text-align: center;
          min-width: 95px;
          color: #000;
          width: 105px;
          font-weight: bold;
          line-height: 1.5;
        }
  
        .squad .squaddetails li:first-child {
          text-align: left;
          font-size: 14px;
          color: #425673;
          font-weight: normal;
        }
  
        .squad .squaddetails li:last-child {
          text-align: right;
          font-size: 14px;
          color: #425673;
          font-weight: normal;
        }

        .headtohead h3 {
					font-size: 20px;
					line-height: 18px;
					color: #425673;
					text-transform: uppercase;
					margin: 30px 0 7px 0;
					position: relative;
					font-weight: normal;
				}

				.headtohead ul.teamname {
					display: flex;
					justify-content: center;
					background: #f3f3f3;
					padding-top: 15px;
					border-top: 1px solid #ccd2d9;
					line-height: 1.5;
				}

				.headtohead ul.details {
					display: flex;
					justify-content: center;
					padding: 15px 10px 5px 10px;
					line-height: 1.5;
				}

				.progress_bar-container {
					width: 100%;
					background: #cccccc;
					border-radius: 40px;
					height: 5px;
					line-height: 5px;
					margin-bottom: 5px;
				}
        .progress_bar-container.flipped {
          transform: rotate(180deg);
      }

				.headtohead ul.teamname li {
					font-size: 16px;
					color: #001d42;
					text-transform: uppercase;
					text-align: center;
					min-width: 105px;
					font-weight: bold;
				}

				.headtohead ul.teamname li:first-child {
					text-align: left;
				}

				.headtohead ul.teamname li:last-child {
					text-align: right;
				}

				.headtohead ul.details li {
					font-size: 13px;
					color: #585858;
					text-transform: uppercase;
					text-align: center;
					width: 90px;
					padding-top: 5px;
				}

				.headtohead ul.details li:first-child {
					text-align: left;
					font-size: 22px;
					color: #334a68;
					padding-top: 0px;
					font-weight: bold;
				}

				.headtohead ul.details li:nth-child(2) {
					width: 160px;
				}

				.headtohead ul.details li:last-child {
					text-align: right;
					font-size: 22px;
					color: #334a68;
					padding-top: 0px;
					font-weight: bold;
				}

				.progress_bar-container {
					width: 100%;
					background: #cccccc;
					border-radius: 40px;
					height: 5px;
					line-height: 5px;
					margin-bottom: 5px;
				}

				.progress_bar {
					width: 100%;
					background: #cccccc;
					border-radius: 40px;
					height: 5px;
					line-height: 5px;
				}
        .livematch {
					position: relative;
					line-height: 1.5;
				}

				.livematch h3 {
					font-size: 20px;
					line-height: 18px;
					color: #425673;
					text-transform: uppercase;
					margin: 30px 0 7px 0;
					position: relative;
					border-bottom: 1px solid #ccd2d9;
					padding-bottom: 10px;
					z-index: 5;
				}

				.livematch h3 span {
					color: #ff2759;
				}

				.livematch .live {
					text-transform: uppercase;
					font-size: 30px;
					color: #eeeff0;
					position: absolute;
					display: none;
					top: 4px;
					left: 106px;
					font-style: italic;
					z-index: 2;
				}

				.liveresult {
					background: #ff2759;
					background-position: center center;
					background-size: cover;
					position: relative;
					padding: 10px 10px 10px 25px;
					margin-top: 10px;
					border-radius: 6px;
					margin-left: 10px;
					min-height: 40px;
				}

				.liveresult p {
					font-size: 16px;
					color: #fff;
					font-weight: bold;
					line-height: 20px;
				}

				.ekcup {
					position: absolute;
					top: 10px;
					left: -20px;
				}

				.playermatch {
					margin-top: 5px;
					background: #fff;
					border: 1px solid #b2b2b2;
					border-radius: 30px;
					text-align: center;
					padding: 6px 15px;
					font-size: 14px;
					color: #001d42;
					display: table;
				}

				.commentry {
					position: relative;
					border: 1px solid #ccd2d9;
					border-radius: 6px;
					margin: 10px 0px 0px 10px;
				}

				.comment {
					position: absolute;
					top: 10px;
					left: -20px;
				}

				.commentry ul.comn {
					display: flex;
					padding: 10px 0 10px 25px;
					border-radius: 6px;
					line-height: 1.5;

				}

				.commentry ul.comn li {
					text-transform: uppercase;
					font-size: 12px;
					color: #000;
					text-align: left;
					min-width: 45px;
				}

				.commentry ul.comn li:first-child {
					color: #001d42;
					font-size: 14px;
					font-weight: bold;
				}

				.commentry ul.comn li p.raider {
					font-size: 15px;
					color: #001d42;
					text-transform: capitalize;
				}

				.commentry ul.comn li p {
					margin-bottom: 6px;
				}

				.commentry ul.comn li p.raidn {
					font-size: 12px;
					color: #ff2759;
				}

				.commentry ul.comn li p span {
					background: #f3f3f3;
					padding: 4px 12px;
					display: inline;
					margin-right: 5px;
					border: 1px solid #b2b2b2;
					border-radius: 20px;
					font-size: 14px;
					color: #ff2759;
					text-transform: capitalize;
					float: left;
				}

				.commentry ul.comn li p.livescore {
					font-size: 26px;
					color: #425673;
					font-weight: bold;
					float: left;
					margin-bottom: 0px;
				}

				.liveresult ul.comn {
					display: flex;
				}

				.liveresult ul.comn li {
					text-transform: uppercase;
					font-size: 16px;
					color: #fff;
					text-align: left;
					min-width: 45px;
					font-weight: bold;
					line-height: 20px;
				}

				.liveresult ul.comn li:first-child {
					font-size: 14px;
				}
      `}
      </style>
    </>
  )
}
export default MatchCenter;