import { React, useState } from "react";
import QuickLinks from "./Home/QuickLinks";
import RightSection from "./Home/RightSection";
import { proKabaddiTeams, teamTranslationArr } from "includes/proKabaddi.helper";
import Slider from "react-slick/lib";
import SvgIcons from "./SvgIcons";
import { imageLoader } from "includes/article.util";
import TopStorySlider from "./TopStorySlider";
import SITE_CONfIG from "config/site.config";
import LazyLoadImage from "components/Common/CustomImage";

const TeamPage = (props) => {
  const { currentUrl } = props.data;
  const slug = currentUrl.split('/');
  const teamUrl = slug[slug.length - 2].split('-');
  let teamName = `${teamUrl[0]} ${teamUrl[1]}`;
  teamName = teamName === "up yoddha" ? "yoddha" : teamName;
  const pointTableData =
    props?.data?.pointTableData?.standings?.groups[0]?.teams;
  const teamStanding = pointTableData?.team?.filter(e => e.team_name.toLowerCase().includes(teamName));
  const { teamData, photoGallery, top_headlines } = props.data;
  const allPlayers = teamData?.squads?.squad?.players;
  const [players, setPlayers] = useState(allPlayers);
  const teamSlug = teamStanding[0]?.team_name?.replace(/ /g, "-").replace(/\./g, "").toLowerCase();
  const teamId = proKabaddiTeams[teamSlug]?.id;
  const allMatches = props?.data?.matches?.calendar?.matches;
  const teamMatches = allMatches.filter(data => (data.teama_id === Number(teamId)) || (data.teamb_id === Number(teamId)));
  const [activeFilter, setActiveFilter] = useState('none');

  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handlePlayers = (playersType) => {
    switch (playersType) {
      case "raider":
        setPlayers(allPlayers.filter(position => position.position_name.includes('Raider')));
        setActiveFilter(playersType);
        break;
      case "defender":
        setPlayers(allPlayers.filter(position => position.position_name.includes('Defender')));
        setActiveFilter(playersType);
        break;
      case "all":
        setPlayers(allPlayers.filter(position => position.position_name.includes('Rounder')));
        setActiveFilter(playersType);
        break;
      default:
        setPlayers(allPlayers);
        setActiveFilter(playersType);
        break;
    }
  }

  return (
    <>
      <div className="pro-main-wrapper">
        <div className="content-wrap">
          <div className="pro-breadcrumb">
            <ul className="breadcrumb-list">
              <li>
                <a href="https://hindi.news18.com/" title="">
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
                <a href="https://hindi.news18.com/pro-kabaddi-league/" title="">
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
              <li>{teamStanding[0]?.team_name}</li>
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
                {teamTranslationArr[teamSlug]}
              </span>
              <span className="big-title">टीम</span>
            </h1>

            <div className="schedule-wrap standing-wrap">
              {/* Team-intro */}
              {teamStanding[0] &&
                <div className="team-intro">
                  <div className="team-image-block">
                    <img
                      src={`${SITE_CONfIG.imageBasePKL}/${teamSlug}.png`}
                      alt={teamTranslationArr[teamSlug]}
                      title={teamStanding[0]?.team_name}
                    />
                  </div>
                  <p className="team-intro-txt">
                    <div dangerouslySetInnerHTML={{ __html: proKabaddiTeams[teamSlug]?.desc }} />
                  </p>
                </div>
              }
              {teamStanding[0] &&
                <>
                  <table className="general-tbl standing-table team-table">
                    <thead>
                      <tr>
                        <th>रैंक</th>
                        <th>टीमें</th>
                        <th>खेले</th>
                        <th>जीते</th>
                        <th>हारे</th>
                        <th>टाई</th>
                        <th>स्कोर अंतर</th>
                        <th>पॉइंट</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h4 className="rank-txt">{teamStanding[0]?.position}</h4>
                        </td>
                        <td>{teamTranslationArr[teamSlug]}</td>
                        <td>{teamStanding[0]?.played}</td>
                        <td>{teamStanding[0]?.wins}</td>
                        <td>{teamStanding[0]?.lost}</td>
                        <td>{teamStanding[0]?.tied}</td>
                        <td>{teamStanding[0]?.points_conceded}</td>
                        <td>{teamStanding[0]?.points}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="view-all-div content-wrap">
                    <a href="/pro-kabaddi-league/pkl-point-table/" title=" View complete Points Table">
                      पूरा देखें पॉइंट टेबल
                    </a>
                  </div>
                </>
              }
              {players?.length > 0 &&
                <div className="team-player-block">
                  <div className="team-player-title">
                    <h3 className="double-title">
                      <span className="small-title">{teamTranslationArr[teamSlug]} स्कवॉड</span>
                      <span className="big-title">स्क्वॉड</span>
                    </h3>
                    <ul className="month-list">
                      <li onClick={() => { handlePlayers('none') }}>
                        <a
                          title="All"
                          className={`sl_postion ${activeFilter == "none" && "active"}`}
                        >
                          All
                        </a>
                      </li>
                      <li onClick={() => { handlePlayers('raider') }}>
                        <a
                          title="Raider"
                          className={`sl_postion ${activeFilter == "raider" && "active"}`}
                        >
                          Raiders
                        </a>
                      </li>
                      <li onClick={() => { handlePlayers('defender') }}>
                        <a
                          title="Defender"
                          className={`sl_postion ${activeFilter == "defender" && "active"}`}
                        >
                          Defenders
                        </a>
                      </li>
                      <li onClick={() => handlePlayers('all')}>
                        <a
                          title="All Rounder"
                          className={`sl_postion ${activeFilter == "all" && "active"}`}
                        >
                          All Rounders
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="players-grid">
                    <ul className="team-player-list clearfix">
                      {players?.map((item, index) => (
                        <li
                          className="player_cls"
                          data-text={item.position_name}
                          key={`player${index}`}
                        >
                          <a href={`/pro-kabaddi-league/${teamSlug}/${item.full_name.replace(/ /g, "-").replace(/\./g, "").toLowerCase()}-${item.player_id}/`} title={item.full_name}>
                            <LazyLoadImage
                              height={141}
                              width={141}
                              src={`${SITE_CONfIG.imageBasePKL}/${teamSlug}-default.png`}
                              title={item.full_name}
                              alt={item.full_name}
                            />
                          </a>
                          <div className="player-details">
                            <a
                              href={`/pro-kabaddi-league/${teamSlug}/${item.full_name.replace(/ /g, "-").replace(/\./g, "").toLowerCase()}-${item.player_id}/`}
                              title={item.full_name}
                            >
                              {item.full_name}
                            </a>
                            <a
                              href={`/pro-kabaddi-league/${teamSlug}/${item.full_name.replace(/ /g, "-").replace(/\./g, "").toLowerCase()}-${item.player_id}/`}
                              title={item.full_name}
                            >
                              <h5 className="team-player-des">
                                {item.position_name}
                              </h5>
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              }
              {/* Team player end */}
              {teamMatches?.length > 0 &&
                <div className="schedule-grid">
                  <h3 className="double-title">
                    <span className="small-title">{teamTranslationArr[teamSlug]} मैच</span>
                    <span className="big-title">शेड्यूल</span>
                  </h3>
                  <div className="schedule-grid-block schedule-new">

                    <Slider className="team-schedule-list" {...settings}>
                      {teamMatches.map((item, index) => {
                        const teamAslug = item.teama
                          .replace(/ /g, "-")
                          .replace(/\./g, "")
                          .toLowerCase();
                        const teamBslug = item.teamb
                          .replace(/ /g, "-")
                          .replace(/\./g, "")
                          .toLowerCase();
                        return (
                          <li key={`team-schedule-list4{index}`}>
                            <div className="team-schedule-wrap">
                              <div className="team-sch-time">
                                <div className="match-details-txt">
                                  <span className="match-date">{new Date(item.matchdate_local).toLocaleString('en-us', { weekday: 'short' })}, {new Date(item.matchdate_local).toLocaleString('en-us', { day: 'numeric' })} {new Date(item.matchdate_local).toLocaleString('en-us', { month: 'long' })}</span>|
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
                                    {item.matchtime_local} (IST)
                                  </span>
                                </div>
                              </div>
                              <div className="team-sch-logo">
                                <div className="team-sch-img">
                                  <a
                                    href={`/pro-kabaddi-league/${teamAslug}-${item.teama_id}/`}
                                    title={item.teama}
                                  >
                                    <img
                                      src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}.png`}
                                      alt={item.teama}
                                      title={item.teama}
                                    />
                                  </a>
                                </div>
                                <div>
                                  <img
                                    src={`${SITE_CONfIG.imageBasePKL}/vs-img.png`}
                                    title="VS"
                                    alt=" VS"
                                  />
                                </div>
                                <div className="team-sch-img">
                                  <a
                                    href={`/pro-kabaddi-league/${teamBslug}-${item.teamb_id}/`}
                                    title={item.teamb}
                                  >
                                    <img
                                      src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}.png`}
                                      alt={item.teamb}
                                      title={item.teamb}
                                    />
                                  </a>
                                </div>
                              </div>

                              <div className="team-sch-status">
                                <div className={`score-txt ${item.teamb_score < item.teama_score &&
                                  "won-team"
                                  }`}>
                                  <h5 className="score-val ">{item.teama_score}</h5>
                                </div>
                                <div>
                                  <img
                                    src={`${SITE_CONfIG.imageBasePKL}/kabaddi.png`}
                                    title="kabaddi"
                                    alt="kabaddi"
                                  />
                                </div>
                                <div className={`score-txt ${item.teama_score < item.teamb_score &&
                                  "won-team"
                                  }`}>
                                  <h5 className="score-val">{item.teamb_score}</h5>
                                </div>
                              </div>
                              <div className="team-sch-result">
                                <span className="match-venue">
                                  <span>{item.matchresult}</span>
                                </span>
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </Slider>
                    <div className="view-all-div content-wrap">
                      <a
                        href="/pro-kabaddi-league/pkl-schedule/"
                        title="VIEW COMPLETE SCHEDULE"
                      >
                        पूरा देखें शेड्यूल
                      </a>
                    </div>
                  </div>
                </div>
              }

              {/* Schedule Slider end */}
              <div className="vsp20 clearfix" />
              {/* Media List start */}
              <div className="schedule-wrap match-centre-wrap">
                <h3 className="double-title big-double">
                  <span className="small-title">फोटो/वीडियो गैलरी</span>
                </h3>
                <div className="media-list-wrap">
                  <ul className="latest-update-media-list media-list">
                    {photoGallery?.slice(0, 4)?.map((item, index) =>
                      <li className={index == 0 ? "item1" : "item2"} key={`photo${index}`}>
                        <div className="media-wrap">
                          <a
                            href={item?.weburl_r}
                            title={item.display_headline}
                          >
                            <LazyLoadImage
                              width={214}
                              height={140}
                              src={item?.images?.url}
                              alt={item?.display_headline}
                              title={item?.display_headline}
                            />
                          </a>
                        </div>
                        <h3 className="media-title">
                          <a
                            href={item.weburl_r}
                            title={item.display_headline}
                          >
                            {item?.display_headline}
                          </a>
                        </h3>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="view-all-div content-wrap">
                  <a
                    href="/pro-kabaddi-league/pkl-news/"
                    title="VIEW COMPLETE SCHEDULE"
                  >
                    पूरा देखें
                  </a>
                </div>
                <div className="vsp20 clearfix" />
              </div>

              {/* Media List start */}
              {/* start*/}
              {/*Main Stories Section*/}
              <div className="main-stories-wrap">
                <div className="img-wrapper">
                  <a href={top_headlines[0]?.weburl_r} title={top_headlines[0]?.display_headline}>
                    <img src={imageLoader(top_headlines[0]?.images?.url)} alt={top_headlines[0]?.display_headline} />
                  </a>
                </div>
                {/*Stories Slider*/}
                <TopStorySlider top_headlines={top_headlines} />
              </div>
              <div className="clearfix" />

              {/*Main Stories Section*/}
              {/* end*/}
            </div>
          </section>
          {/*Schedule Main Section*/}
        </div>

        <RightSection props={props?.data} />
      </section>
      <QuickLinks />
      <style jsx global>
        {`
        .main-block-container {display: flex;  padding-top: 10px;}
    .pro-main-wrapper { padding: 5px 20px 0 20px;}
			.content-wrap { max-width: 1240px; margin: 0 auto;}
			.pro-breadcrumb {display: flex; justify-content: space-between; border-bottom: 1px dotted #969696; padding: 0 0 5px; align-items: center;}
			.breadcrumb-list { display: flex; align-items: center;}
			.breadcrumb-list li {font-size: 14px; color: #001d42;font-weight: 700; text-transform: uppercase; margin: 0 5px 0 0;}
			.breadcrumb-list li a {color: #969696;font-weight: 600;}
			.social-sharing {display: flex; align-items: center;}
			.social-share-link {width: 30px;  height: 30px; display: flex; align-items: center; border: 1px solid #7f7f7f; border-radius: 50%; margin: 0 0 0 10px;}
			.fb-link svg { margin: -10px 0 0;}

      .team-intro {display: flex; align-items: flex-start; margin: 20px 0;}
							.team-image-block { margin: 0 20px 0 0; border: 1px solid #e6e6e6; padding: 30px;}
							.schedule-wrap p.team-intro-txt {margin: 0;}
							.schedule-wrap p {font-size: 16px;color: #333; line-height: 25px; margin: 20px 0;}

              .general-tbl {width: 100%;border-collapse: collapse;border-spacing: 0;}.general-tbl th {font-size: 14px;font-weight: bold;color: #fff;background: #ff2759;text-transform: uppercase;padding: 10px;}.team-table td {font-size: 18px;color: rgba(0, 29, 66, 0.8);}.general-tbl td {font-size: 15px;font-weight: 400;color: #001d42;text-align: center;padding: 9px 10px;vertical-align: middle;border-bottom: 1px solid #ccd2d9;line-height: 1;}.standing-table tr td:nth-child(2), .standing-table tr td:nth-child(8) {background: #f3f3f3;}.standing-table tr td:nth-child(2) {text-align: left;font-weight: bold;}.team-table td:nth-child(2) {font-size: 18px;font-weight: 400;line-height: 18px;}.standing-table tr td:nth-child(8) {font-size: 18px;font-weight: bold;}
              .team-player-block {margin: 30px 0;}.team-player-block .team-player-title {display: flex;align-items: flex-end;justify-content: space-between;border-bottom: 1px solid #ccd2d9;padding-bottom: 10px;}.players-grid {margin: 10px 0;}.team-player-block .double-title {border-bottom: none;}.month-list {display: flex;align-items: center;}.month-list li {cursor:pointer;margin: 0 4px;}.month-list li a.active, .month-list li a:hover {background: #ff2759;border-color: #ff2759;color: #fff;}.month-list li a {font-size: 14px;color: #7c7c7c;background: #f3f3f3;border: 1px solid #ccd2d9;display: inline-block;padding: 8px 15px;border-radius: 5px;}.players-grid {margin: 10px 0;}.team-player-list {width: 100%;border-bottom: 4px solid #ff2759;display: flex;flex-wrap: wrap;}.team-player-list li {width: 19%;float: left;text-align: center;margin: 10px 4px 20px 0;}.team-player-list li .player-details {text-align: center;margin: 10px 0 0;}.team-player-list li .player-details a {color: #001d42;font-size: 16px;font-weight: 700;line-height: 20px;}.team-player-list li .player-details .team-player-des {color: #656565;font-size: 13px;font-weight: normal;} 
              .schedule-grid {margin: 30px 0;} 
              .team-schedule-list {overflow: hidden;padding: 15px;}
              .slick-slider {position: relative;display: block;box-sizing: border-box;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;-webkit-touch-callout: none;-khtml-user-select: none;-ms-touch-action: pan-y;touch-action: pan-y;-webkit-tap-highlight-color: transparent;}
              .team-schedule-list .slick-prev {transform: rotate(180deg);left: -4px;z-index: 1;}
              .team-schedule-list .slick-arrow {top: 70px;text-indent: -99999px;border: none;position: absolute;height: 61px;background: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/arrow.png) center center no-repeat;width: 52px;outline: 0;cursor: pointer;}
              .slick-slider .slick-list, .slick-slider .slick-track {-webkit-transform: translate3d(0, 0, 0);-moz-transform: translate3d(0, 0, 0);-ms-transform: translate3d(0, 0, 0);-o-transform: translate3d(0, 0, 0);transform: translate3d(0, 0, 0);}.slick-list {position: relative;display: block;overflow: hidden;margin: 0;padding: 0;}.slick-track {position: relative;top: 0;left: 0;display: block;margin-left: auto;margin-right: auto;padding: 10px 0;}.team-schedule-list .slick-track {display: flex;}.slick-track:after, .slick-track:before {display: table;content: "";}.slick-initialized .slick-slide {display: block;}.slick-slide {display: none;float: left;height: 100%;min-height: 1px;}.team-sch-time {border-bottom: 1px solid #b4b4b4;padding: 0 0 8px;}.match-details-txt {font-size: 11px;font-weight: 400;color: #000;text-align: center;}.team-sch-time .match-details-txt span {color: #425673;font-size: 14px;}.match-details-txt span {display: inline-block;margin: 0 5px;font-size: 14px;}.team-sch-time .match-details-txt span {color: #425673;font-size: 14px;}.match-time svg {vertical-align: top;}.team-sch-logo {display: flex;align-items: center;justify-content: space-between;text-align: center;padding-top: 10px;}.team-sch-logo .team-sch-img img {width: 50%;display: inline;}.slick-slide img {display: block;}.team-sch-status {display: flex;align-items: center;justify-content: center;text-align: center;padding-top: 5px;padding-bottom: 10px;}.score-txt.won-team {background: #ff2759;border: 1px solid #fff;}.score-txt {text-align: center;border: 1px solid #bebebe;background-color: #fff;border-radius: 50%;width: 40px;padding: 10px 0;margin: 10px auto;}.score-txt.won-team .score-val {color: #fff;}.score-txt .score-val {color: #425673;font-size: 20px;font-weight: 700;text-transform: uppercase;}.team-sch-status div:nth-child(2) {width: 24px;}.team-sch-status div:nth-child(2) img {display: none;}.score-txt .score-val {color: #425673;font-size: 20px;font-weight: 700;text-transform: uppercase;}.team-sch-result .match-venue {display: flex;align-items: center;justify-content: center;border-top: 1px solid #ccd2d9;padding: 8px 0 0;}.team-sch-result .match-venue span {font-size: 12px;font-weight: 400;line-height: 20px;color: #425673;}
              // .team-schedule-list li {border: 1px solid #b4b4b4;padding: 10px;margin: 0 10px 0 0;float: none;height: auto;}
              .team-schedule-list .slick-disabled.slick-prev {
                background: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/arrow-disabled.png) center center no-repeat;
                transform: rotate(0deg);
              }
              .team-schedule-list .slick-next {
                right: 0;
                transform: rotate(0deg);
              }
              .schedule-new .slick-list > div > div {
                border: 1px solid#b4b4b4;
                padding: 10px;
                margin: 0 10px 0 0;
                float: none;
                height: auto;
              }

              .left-section {width: calc(100% - 330px);}   
              .double-title.page-title {align-items: flex-end; margin-bottom: 10px;}
              .double-title {font-weight: 500; display: flex; align-items: flex-start;text-transform: uppercase; border-bottom: 1px solid #ccd2d9; position: relative;}
              .double-title.page-title .small-title {font-size: 36px; line-height: 44px; font-weight: bold;}
              .small-title {font-size: 24px; font-weight: normal; text-transform: uppercase; color: #001d42; padding: 0 0 10px; line-height: 18px;}
              .big-title, .tags-big-title { font-size: 40px; color: rgba(0, 29, 66, 0.1); margin: -3px 0 0 -8px; display: none;}
              .double-title.page-title .big-title { font-size: 40px; margin: 0;}  
              
              .media-list {padding: 0 0 20px 0;display: flex; flex-wrap: wrap;}
							.media-list li {margin-bottom: 20px; width: 23.5%; margin-right: 2%;}
							.media-list li:nth-child(4n) {margin-right: 0;}
							.media-list li .media-wrap {position: relative; overflow: hidden; height: 140px;margin-bottom: 10px;}
							.media-list li .media-wrap img {transform: scale(1); transition: all .5s ease-in-out;}
							.media-list li:hover .media-wrap img { transform: scale(1.2);  transition: all .5s ease-in-out;}
							.media-wrap img {width: 100%;height: 100%;}
							.media-title, .media-title a {font-size: 16px;color: #333;line-height: 24px; margin: 5px 0 0;font-weight: bold;}
							.date-class {font-size: 12px; color: #444;line-height: 14px;}

              .img-wrapper, .main-stories-wrap {position: relative;}
							.img-wrapper a {display: block; position: relative;}
							.img-wrapper a:before { content: ""; background: linear-gradient(transparent, transparent, #000, #000); position: absolute; top: 0; right: 0; bottom: 0px;left: 0;}
							.img-wrapper img { width: 100%;}
							
							
  `}
      </style>
    </>
  );
};

export default TeamPage;
