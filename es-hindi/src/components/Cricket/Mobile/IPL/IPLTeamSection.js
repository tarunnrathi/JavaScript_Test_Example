import { IPL_YEAR } from "includes/ipl.helper";

const IPLTeamSection = ({ teamCaptionsArr }) => {
  return (
    <>
        <div className="CN-teams-section">
            <div className="ipl_team">
                <h3>आईपीएल {IPL_YEAR} <span></span></h3>
                <div className="team_player_s dflex jstbtwn flex-wrap">
                {teamCaptionsArr.map((cap) => (
                    <a key={cap.id} href={cap.redirectionURL}>
                        <div className="team_player">
                            <img
                                loading="lazy"
                                src={cap.thumnail}
                                data-src={cap.thumnail}
                                alt={cap.team}
                                width="63"
                                height="70"
                            />
                            <div className={`team_player_name playe_r_${cap.colorId}`}>
                                <strong>{cap.team}</strong>
                                <span>{cap.playerName}</span>
                            </div>
                        </div>
                    </a>
                ))}
                </div>
            </div>
        </div>
        <div className="clearfix vsp10"></div>
        <style jsx global>{`
        .CN-teams-section {
            background: url(https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/teams_bg.png) #192f3a 0 0 no-repeat;
            padding: 10px 10px 0 10px;
            background-size: 100%;
            min-height: 490px;
        }
        .ipl_team h3 {
            position: relative;
            font-size: 26px;
            line-height: 28px;
            color: #fb0;
            text-transform: uppercase;
            margin: 40px 0 40px 150px;
        }
        .ipl_team h3 span {
            color: #fff;
            margin-left: 5px;
        }
        body .jstbtwn {
            justify-content: space-between!important;
        }
        .flex-wrap {
            flex-wrap: wrap;
        }
        .dflex {
            display: flex;
        }
        .ipl_team .team_player_s a {
            margin-bottom: 20px;
            width: 47.5%;
            display: block;
            position: relative;
        }
        .ipl_team .team_player_s a:before {
            width: 8px;
            height: 2px;
            background: #f5f5f5;
            right: 10px;
            top: 17px;
        }
        .ipl_team .team_player_s a:after, .ipl_team .team_player_s a:before {
            display: block;
            position: absolute;
            content: "";
        }
        .team_player img {
            position: absolute;
            left: 0;
            top: -15px;
            height: 70px;
        }
        .playe_r_1 {
            background-color: #ee9b00;
        }
        .playe_r_2 {
            background-color: #0355a2;
        }
        .playe_r_3 {
            background-color: #d33f25;
        }
        .playe_r_4 {
            background-color: #482863;
        }
        .playe_r_5 {
            background-color: #005795;
        }
        .playe_r_6 {
            background-color: #1f3a76;
        }
        .playe_r_7 {
            background-color: #1e1e1e;
        }
        .playe_r_8 {
            background-color: #ff4233;
        }
        .playe_r_9 {
            background-color: #0B4973;
        }
        .playe_r_10 {
            background-color: #FFCC00;
        }
        .team_player_name {
            width: 100%;
            height: 55px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .team_player_name strong {
            font-size: 20px;
            line-height: 20px;
            color: #fff;
        }
        .team_player_name span, .team_player_name strong {
            display: block;
            box-sizing: border-box;
            padding-left: 60px;
        }
        .team_player_name span {
            font-size: 12px;
            line-height: 15px;
            color: #fff;
        }
        .team_player_name span, .team_player_name strong {
            display: block;
            box-sizing: border-box;
            padding-left: 60px;
        }
        .ipl_team .team_player_s a:after {
            border-right: 2px solid #f5f5f5;
            border-top: 2px solid #f5f5f5;
            width: 6px;
            height: 6px;
            transform: rotate(45deg);
            top: 14px;
            right: 9px;
        }
        `}</style>
    </>
  );

};

export default IPLTeamSection;
