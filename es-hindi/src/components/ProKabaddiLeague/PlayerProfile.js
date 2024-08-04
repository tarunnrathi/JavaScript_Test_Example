import { React, useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import QuickLinks from "./Home/QuickLinks";
import RightSection from "./Home/RightSection";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import SvgIcons from "./SvgIcons";
import { imageLoader } from "includes/article.util";
import TopStorySlider from "./TopStorySlider";
import SITE_CONfIG from "config/site.config";
import LazyLoadImage from "components/Common/CustomImage";

const PlayerProfile = (props) => {
  const { top_headlines, photoGallery, playerData } = props.data;
  const playerStats = playerData?.over_all_stats?.filter(
    (e) => e.series_name === "Pro Kabaddi League Season 8, 2021"
  )[0];
  const teamSquad = props?.data?.teamData?.squads?.squad?.players;
  const teamName = playerData?.bio?.team_name?.replace(/ /g, "-")?.replace(/\./g, "")?.toLowerCase();
  const teamSlug = teamName == "up-yoddhas" ? "up-yoddha" : teamName;

  useEffect(() => {
    if (document.getElementsByClassName("plyrsldr").length) {
      new Glide(document.querySelector(`.plyrsldr`), {
        autoplay: false,
        type: "carousal",
        perView: 5,
        gap: 10,
        slidesToScroll: 1,
      }).mount();
    }
  }, []);
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
              <li>
                <a href="" title="">
                  {playerData?.bio?.team_name} Team
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
              <li>{playerData?.bio?.full_name.toUpperCase()}</li>
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
                {playerData?.bio?.full_name.toUpperCase()}
              </span>
              <span className="big-title">
                {playerData?.bio?.full_name.toUpperCase()}
              </span>
            </h1>
            {playerData.bio && (
              <div className="schedule-wrap player-wrap">
                <div className="player-info-wrap">
                  <div className="player-grid clearfix">
                    <div className="team-div">
                      <div className="label-div">
                        <label className="label-txt">टीम पोजीशन</label>
                        <h4 className="label-val">
                          {playerData?.bio?.position_name}
                        </h4>
                      </div>
                      <div className="label-div">
                        <label className="label-txt">TEAM</label>
                        <h4 className="label-val">
                          {teamTranslationArr[teamSlug]}
                        </h4>
                      </div>
                    </div>
                    <div className="player-img-div">
                      <div className="player-img-wrap">
                        <img
                          src={`${SITE_CONfIG.imageBasePKL}/${teamSlug}-default.png`}
                          title={playerData?.bio?.full_name}
                          alt={playerData?.bio?.full_name}
                        />
                        <div className="jersey-div">
                          <img
                            src={`${SITE_CONfIG.imageBasePKL}/jersey_icon.png`}
                            title=""
                            alt=""
                          />
                          <span className="jersey-val">
                            {playerData?.bio?.jersey_no}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="player-stats-div">
                      <div className="stats-div">
                        <div className="height-div">
                          <h5 className="main-label-txt">कद</h5>
                          <h4 className="main-label-value">
                            {playerData?.bio?.height}
                          </h4>
                        </div>
                        <div className="weight-div">
                          <h5 className="main-label-txt">वजन</h5>
                          <h4 className="main-label-value">
                            {playerData?.bio?.weight
                              ? playerData?.bio?.weight
                              : "-"}
                          </h4>
                        </div>
                      </div>
                      <div className="stats-team-logo">
                        <a href="" title="">
                          <img
                            src={`${
                              SITE_CONfIG.imageBasePKL
                            }/${playerData?.bio?.team_name
                              ?.replace(/ /g, "-")
                              .replace(/\./g, "")
                              .toLowerCase()}.png`}
                            alt=""
                            title=""
                          />
                        </a>
                      </div>
                    </div>
                    <div className="player-other-div">
                      <div className="other-div">
                        <h5 className="main-label-txt">जन्मदिन</h5>
                        <h4 className="main-label-value">
                          {playerData?.bio?.date_of_birth}
                        </h4>
                      </div>
                      <div className="other-div">
                        <h5 className="main-label-txt">नागरिकता</h5>
                        <h4 className="main-label-value">
                          {playerData?.bio?.nationality}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="player-this-season">
                  <h3 className="double-title">
                    <span className="small-title">
                      <strong>{playerData?.bio?.full_name}</strong> सीजन 8
                    </span>
                    <span className="big-title">सीजन 8</span>
                  </h3>
                  <div className="row-left">
                    <div className="row-wrap">
                      <div className="heading-wrap">
                        <img
                          src={`${SITE_CONfIG.imageBasePKL}/player-tr.png`}
                        />
                        <div className="heading-txt">
                          <p className="heading">
                            कुल मैच <br />
                            Played
                            <br />
                          </p>
                          <p className="count">{playerStats?.match_played}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row-wrap">
                      <ul className="player-total-points">
                        <li className="red">
                          <p className="points">
                            {playerStats?.total_raid_points}
                          </p>
                          <div className="border" />
                          <p className="points-in">total raid points</p>
                        </li>
                        <li className="red">
                          <p className="points">
                            {playerStats?.raid_bonus_points}
                          </p>
                          <div className="border" />
                          <p className="points-in">raid bonus points</p>
                        </li>
                        <li className="red">
                          <p className="points">
                            {playerStats?.raid_touch_points}
                          </p>
                          <div className="border" />
                          <p className="points-in">raid touch points</p>
                        </li>
                        <li className="red">
                          <p className="points">
                            {playerStats?.success_raid_percent}
                          </p>
                          <div className="border" />
                          <p className="points-in">success raid %</p>
                        </li>
                      </ul>
                    </div>
                    <div className="row-wrap">
                      <ul className="player-total-points">
                        <li className="red">
                          <p className="points">
                            {playerStats?.total_defending_points}
                          </p>
                          <div className="border" />
                          <p className="points-in">total defending points</p>
                        </li>
                        <li className="red">
                          <p className="points">
                            {playerStats?.defending_bonus_points}
                          </p>
                          <div className="border" />
                          <p className="points-in">defending bonus points</p>
                        </li>
                        <li className="red">
                          <p className="points">
                            {playerStats?.defence_touch_points}
                          </p>
                          <div className="border" />
                          <p className="points-in">defending touch points</p>
                        </li>
                        <li className="red">
                          <p className="points">
                            {playerStats?.tackle_success_rate}
                          </p>
                          <div className="border" />
                          <p className="points-in">tackle success rate %</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row-right">
                    <div className="row-wrap">
                      <div className="heading-wrap">
                        <div className="heading-txt">
                          <p className="count">{playerStats?.point}</p>
                          <p className="heading">
                            कुल <br /> अंक
                          </p>
                        </div>
                        <ul className="cards-wrap">
                          <li>
                            <p className="cards-heading">cards</p>
                          </li>
                          <li>
                            <div className="cards red-card" />
                            <p className="cards-count">
                              {playerStats?.red_cards}
                            </p>
                          </li>
                          <li>
                            <div className="cards yellow-card" />
                            <p className="cards-count">
                              {playerStats?.yellow_cards}
                            </p>
                          </li>
                          <li>
                            <div className="cards green-card" />
                            <p className="cards-count">
                              {playerStats?.green_cards}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row-wrap">
                      <ul className="player-total-points">
                        <li className="light-blue">
                          <p className="points">{playerStats?.raids}</p>
                          <div className="border" />
                          <p className="points-in">total raids </p>
                        </li>
                        <li className="green">
                          <p className="points">{playerStats?.super_raids}</p>
                          <div className="border" />
                          <p className="points-in">super raids</p>
                        </li>
                        <li className="green">
                          <p className="points">{playerStats?.success_raids}</p>
                          <div className="border" />
                          <p className="points-in">successfull raids</p>
                        </li>
                        <li className="orange">
                          <p className="points">
                            {playerStats?.unsuccess_raids}
                          </p>
                          <div className="border" />
                          <p className="points-in">unsuccessfull raids</p>
                        </li>
                        <li className="dark-blue">
                          <p className="points">{playerStats?.empty_raid}</p>
                          <div className="border" />
                          <p className="points-in">empty raids</p>
                        </li>
                      </ul>
                    </div>
                    <div className="row-wrap">
                      <ul className="player-total-points">
                        <li className="light-blue">
                          <p className="points">{playerStats?.tackles}</p>
                          <div className="border" />
                          <p className="points-in">total tackles</p>
                        </li>
                        <li className="green">
                          <p className="points">{playerStats?.super_tackles}</p>
                          <div className="border" />
                          <p className="points-in">super tackles</p>
                        </li>
                        <li className="green">
                          <p className="points">
                            {playerStats?.success_tackles}
                          </p>
                          <div className="border" />
                          <p className="points-in">successfull tackles</p>
                        </li>
                        <li className="orange">
                          <p className="points">
                            {playerStats?.unsuccesful_tackles}
                          </p>
                          <div className="border" />
                          <p className="points-in">unsuccessfull tackles</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {teamSquad?.length > 0 && teamSlug && (
              <div className="schedule-grid">
                <h3 className="double-title">
                  <span className="small-title">
                    {teamTranslationArr[teamSlug]} स्कवॉड
                  </span>
                  <span className="big-title">स्कवॉड</span>
                </h3>
                <div className="plyrsldr">
                  <div className="plyrsldrin" data-glide-el="track">
                    <ul>
                      {teamSquad &&
                        teamSquad.map((item, index) => (
                          <li key={index}>
                            <a
                              href={`/pro-kabaddi-league/${playerData?.bio?.team_name
                                .replace(/ /g, "-")
                                .replace(/\./g, "")
                                .toLowerCase()}/${item.full_name
                                .replace(/ /g, "-")
                                .replace(/\./g, "")
                                .toLowerCase()}-${item.player_id}/`}
                              title={item.full_name}
                              tabIndex={0}
                            >
                              <img
                                src={`${SITE_CONfIG.imageBasePKL}/${teamSlug}-default.png`}
                                title={item.full_name}
                                alt={item.full_name}
                              />
                            </a>
                            <div className="player-details">
                              <a
                                href={`/pro-kabaddi-league/${teamSlug}/${playerData?.bio?.team_name
                                  .replace(/ /g, "-")
                                  .replace(/\./g, "")
                                  .toLowerCase()}-${item.player_id}/`}
                                title={item.full_name}
                                tabIndex={0}
                              >
                                {item.full_name}
                              </a>
                              <h5 className="team-player-des">
                                {playerData?.bio?.position_name}
                              </h5>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="plyrsldr-arrow" data-glide-el="controls">
                    <button className="left" data-glide-dir="<" />
                    <button className="right" data-glide-dir=">" />
                  </div>
                </div>
              </div>
            )}

            <div className="main-stories-wrap">
              <div className="img-wrapper">
                <a
                  href={top_headlines[0]?.weburl_r}
                  title={top_headlines[0]?.display_headline}
                >
                  <img
                    src={imageLoader(top_headlines[0]?.images?.url)}
                    alt={top_headlines[0]?.display_headline}
                  />
                </a>
              </div>
              {/*Stories Slider*/}
              <TopStorySlider top_headlines={top_headlines} />
            </div>
            <div className="schedule-wrap match-centre-wrap">
              <h3 className="double-title big-double">
                <span className="small-title">फोटो/वीडियो गैलरी</span>
              </h3>
              <div className="media-list-wrap">
                <ul className="latest-update-media-list media-list">
                  {photoGallery?.slice(0, 4)?.map((item, index) => (
                    <li
                      className={index == 0 ? "item1" : "item2"}
                      key={`photos${index}`}
                    >
                      <div className="media-wrap">
                        <a href={item.weburl_r} title={item?.display_headline}>
                          <LazyLoadImage
                            height={143}
                            width={214}
                            src={item?.images?.url}
                            alt={item?.display_headline}
                            title={item?.display_headline}
                          />
                        </a>
                      </div>
                      <h3 className="media-title">
                        <a href={item?.weburl_r} title={item?.display_headline}>
                          {item?.display_headline}
                        </a>
                      </h3>
                    </li>
                  ))}
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
          </section>
          {/*Schedule Main Section*/}
        </div>

        <RightSection props={props?.data} />
      </section>
      <QuickLinks />
      <style jsx global>
        {`
          .left-section {
            width: calc(100% - 330px);
          }
          .right-section {
            width: 300px;
            margin: 0 0 0 30px;
          }
          .pro-main-wrapper {
            padding: 5px 20px 0 20px;
          }
          .content-wrap {
            max-width: 1240px;
            margin: 0 auto;
          }
          .pro-breadcrumb {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dotted #969696;
            padding: 0 0 5px;
            align-items: center;
          }
          .breadcrumb-list {
            display: flex;
            align-items: center;
          }
          .breadcrumb-list li {
            font-size: 14px;
            color: #001d42;
            font-weight: 700;
            text-transform: uppercase;
            margin: 0 5px 0 0;
          }
          .breadcrumb-list li a {
            color: #969696;
            font-weight: 600;
          }
          .social-sharing {
            display: flex;
            align-items: center;
          }
          .social-share-link {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            border: 1px solid #7f7f7f;
            border-radius: 50%;
            margin: 0 0 0 10px;
          }
          .fb-link svg {
            margin: -10px 0 0;
          }
          .player-grid {
            background-color: #f3f3f3;
            border-top: 1px solid #ccd2d9;
            border-bottom: 1px solid #ccd2d9;
            margin: 0 0 10px 0;
            padding: 0 30px;
          }
          .player-grid > div {
            padding: 20px 10px;
          }
          .player-grid .team-div {
            float: left;
            width: 22%;
          }
          .player-grid .player-img-div {
            float: left;
            width: 16%;
          }
          .player-grid .label-div {
            margin: 10px 0 20px;
          }
          .player-grid .label-txt {
            color: #535353;
            font-size: 12px;
            font-weight: 400;
          }
          .player-grid .label-val {
            color: #ff2759;
            font-size: 16px;
            font-weight: 700;
            line-height: 20px;
            text-transform: uppercase;
            margin: 5px 0 0;
          }
          .player-grid .player-img-wrap {
            position: relative;
          }
          .player-grid .jersey-div {
            display: flex;
            align-items: center;
            background-color: #425673;
            position: absolute;
            bottom: 0;
            right: 0;
            border: 1px solid #fff;
            box-shadow: 0 0 3px #425673;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            justify-content: center;
          }
          .player-grid .jersey-div .jersey-val {
            color: #ffffff;
            margin: 3px 0 0 2px;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .player-grid .player-stats-div {
            float: left;
            width: 22%;
            margin: 0 0 0 20px;
            padding: 20px 10px 0;
          }
          .player-grid .stats-div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 10px;
          }
          .player-grid .main-label-txt {
            color: #535353;
            font-size: 12px;
            font-weight: 400;
            margin-bottom: 10px;
            text-transform: uppercase;
          }
          .player-grid .main-label-value {
            color: #535353;
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            text-transform: uppercase;
          }
          .player-grid .stats-team-logo {
            margin: 10px 0 0;
          }
          .player-grid .player-other-div {
            float: right;
            width: 20%;
            margin: 0 0 0 40px;
          }
          .player-grid .player-other-div .other-div {
            padding: 10px 0 30px;
          }
          .player-info-div p {
            color: #535353;
            font-size: 15px;
            font-weight: 400;
            line-height: 22px;
          }
          .player-this-season {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            margin-bottom: 30px;
            border-bottom: #001d42 solid 4px;
          }
          .player-this-season .double-title {
            background: #f3f3f3;
            padding: 10px 0 0 10px;
            width: 100%;
            border-bottom: none;
            font-weight: 400;
          }
          .player-this-season .double-title strong {
            font-weight: 600;
          }
          .row-wrap {
            display: flex;
            position: relative;
            min-height: 115px;
          }
          .row-left {
            width: 45%;
            position: relative;
          }
          .row-right {
            width: 55%;
            position: relative;
          }
          .row-left .row-wrap:first-child {
            padding: 20px 30px 0 0;
          }

          .row-left .row-wrap:before {
            content: "";
            position: absolute;
            width: 1px;
            background: #cccccc;
            top: 10px;
            right: 0;
            bottom: 10px;
          }
          .row-left .row-wrap:after {
            content: "";
            position: absolute;
            height: 1px;
            background: #cccccc;
            left: 0;
            right: 10px;
            bottom: 0px;
          }
          .heading-wrap {
            display: flex;
            justify-content: space-between;
            flex: 1;
          }
          .heading-wrap img {
            height: 103px;
          }
          .heading-wrap .heading-txt {
            display: flex;
            padding-top: 20px;
          }
          .heading-wrap .heading {
            font-size: 16px;
            color: #535353;
            text-transform: uppercase;
            text-align: right;
            margin: 0;
            line-height: 17px;
            margin-top: 7px;
          }
          .heading-wrap .count {
            font-size: 48px;
            color: #001d42;
            margin: 0;
            font-weight: 700;
            line-height: 1;
            padding-left: 10px;
          }
          .player-total-points {
            display: flex;
            padding: 25px 0;
          }
          .player-total-points li {
            width: 20%;
            padding: 0 10px;
            text-align: center;
          }

          .player-total-points .points {
            font-size: 28px;
            color: black;
            margin: 5px 0;
            opacity: 0.8;
          }
          .red .points {
            color: #ff2759;
            opacity: 1;
          }

          .player-total-points .border {
            display: block;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #001d42;
          }
          .red .border {
            background: #ff2759;
          }
          .player-total-points .points-in {
            font-size: 12px;
            color: black;
            text-transform: uppercase;
            text-align: center;
            line-height: 1.2;
            margin: 5px 0;
            opacity: 0.8;
          }
          .player-total-points li:first-child .points {
            font-size: 36px;
            font-weight: 700;
          }
          .row-right .row-wrap:first-child {
            padding: 20px 0 0 30px;
            min-height: 123px;
          }
          .row-right .heading-wrap .count {
            padding-right: 10px;
            padding-left: 0;
          }
          .row-right .heading-wrap .heading {
            text-align: left;
          }
          .cards-wrap {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 20px;
            padding-right: 15%;
          }
          .cards-wrap li {
            margin: 0 5px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
          }
          .cards-wrap li .cards-heading {
            font-size: 16px;
            color: #535353;
            text-transform: uppercase;
            text-align: right;
            margin: 0;
            line-height: 1.3;
          }
          .cards-wrap .cards {
            min-width: 20px;
            border-radius: 3px;
            min-height: 30px;
            display: flex;
          }
          .red-card {
            background: #ed1c24;
          }
          .yellow-card {
            background: #ffcc00;
          }
          .green-card {
            background: #1f6500;
          }
          .cards-wrap .cards-count {
            font-size: 16px;
            color: #535353;
            text-transform: uppercase;
            justify-content: center;
            margin: 0;
            line-height: 1;
            width: 100%;
            display: flex;
          }
          .light-blue .points {
            color: #586376;
            opacity: 1;
          }
          .light-blue .border {
            background: #586376;
          }
          .green .border {
            background: #5ed096;
          }
          .orange .border {
            background: #eb5844;
          }
          .dark-blue .border {
            background: #001d42;
          }

          .row-right .row-wrap:after {
            content: "";
            position: absolute;
            height: 1px;
            background: #cccccc;
            left: 10px;
            right: 0px;
            bottom: 0px;
          }
          .row-left .row-wrap .player-total-points li {
            width: 24%;
          }
          .plyrsldr {
            position: relative;
            margin: 20px 40px;
          }
          .plyrsldrin {
            overflow: hidden;
          }
          .plyrsldr ul {
            display: flex;
            padding: 0 0 5px 0;
            justify-content: start;
          }
          .plyrsldr ul li {
            height: 100%;
            min-height: 1px;
            text-align: center;
            flex-shrink: 0;
          }
          .player-details {
            text-align: center;
            margin: 10px 0 0;
          }
          .player-details a {
            color: #001d42;
            font-size: 16px;
            font-weight: 700;
            line-height: 20px;
          }
          .team-player-des {
            color: #656565;
            font-size: 13px;
            margin: 5px 0 0;
            font-weight: normal;
          }
          .plyrsldr-arrow button {
            width: 25px;
            background: transparent;
            position: absolute;
            left: -35px;
            top: 0;
            bottom: 4px;
            border: 0;
          }
          .plyrsldr-arrow button:last-child {
            left: auto;
            right: -35px;
          }

          .plyrsldr-arrow button.left:before,
          .plyrsldr-arrow button.right:before {
            content: "";
            display: block;
            margin: 30px auto;
            width: 10px;
            height: 10px;
            border-top: 2px solid #000;
            border-left: 2px solid #000;
            transform: rotate(315deg);
          }

          .plyrsldr-arrow button.right:before {
            transform: rotate(136deg);
          }
          .plyrsldr ul li a img {
            width: 100%;
          }
          .schedule-grid {
            margin: 30px 0;
            padding: 10px 0;
            border-bottom: 4px solid #ff2759;
          }
          .main-block-container {
            display: flex;
            padding-top: 10px;
          }

          .img-wrapper,
          .main-stories-wrap {
            position: relative;
            min-height: 610px;
          }
          .img-wrapper a {
            display: block;
            position: relative;
          }
          .img-wrapper a:before {
            content: "";
            background: linear-gradient(transparent, transparent, #000, #000);
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0px;
            left: 0;
          }
          .img-wrapper img {
            width: 100%;
          }

          .schedule-wrap p.team-intro-txt {
            margin: 0;
          }
          .schedule-wrap p {
            font-size: 16px;
            color: #333;
            line-height: 25px;
            margin: 20px 0;
          }
          .media-list li:nth-child(4n) {
            margin-right: 0;
          }
          .schedule-wrap.match-centre-wrap {
            margin-top: 18px;
          }
        `}
      </style>
    </>
  );
};

export default PlayerProfile;
