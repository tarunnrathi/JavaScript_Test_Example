import { React, useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import { imageLoader } from "includes/article.util";
import LazyLoadImage from "components/Common/CustomImage";
import SITE_CONfIG from "config/site.config";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import ProKabaddiScoreWidget from "widgets/Common/Responsive/ProKabaddiScoreWidget";

const PlayerProfile = (props) => {
  const { playerData, pageAds } = props.data;
  const playerStats = playerData?.over_all_stats?.filter(
    (e) => e.series_name === "Pro Kabaddi League Season 8, 2021"
  )[0];
  const teamSquad = props?.data?.teamData?.squads?.squad?.players;
  const { photoGallery } = props.data;
  const { top_headlines } = props.data;
  const teamSlug = playerData?.bio?.team_name?.replace(/ /g, "-")?.replace(/\./g, "")?.toLowerCase();

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
    if (document.getElementsByClassName('teamsquadsldr').length) {
      new Glide(document.querySelector('.teamsquadsldr'), {
        autoplay: false,
        type: 'carousal',
        perView: 2,
        gap: 30,
        slidesToScroll: 1,
      }).mount();
    }
    if (document.getElementsByClassName("phsmllnewssldr").length) {
      new Glide(document.querySelector(".phsmllnewssldr"), {
        autoplay: 4000,
        type: "carousal",
        perView: 2,
        gap: 10,
        slidesToScroll: 1,
      }).mount();
    }
    if (document.getElementsByClassName("smllnewssldr").length) {
      new Glide(document.querySelector(".smllnewssldr"), {
        autoplay: 4000,
        type: "carousal",
        perView: 2,
        gap: 10,
        slidesToScroll: 1,
      }).mount();
    }
  }, []);
  return (
    <>
      <div className="wrapper">
        {/*Breadcrumbs start */}
        <div className="bredcrum">
          <div className="bredcrum-txt">
            <a href="/">
              <span className="">Hindi News</span>{" "}
            </a>
            <a href="/pro-kabaddi-league/">
              {" "}
              ›› <span className="">Pro Kabaddi News 2021</span>{" "}
            </a>
            <a href={`/pro-kabaddi-league/${teamSlug}-${playerData?.bio?.team_id}`}>
              {" "}
              ›› <span className="">{playerData?.bio?.team_name} Team</span>{" "}
            </a>
            <a href="">
              {" "}
              ›› <span className="pagetitle">{playerData?.bio?.full_name.toUpperCase()}</span>{" "}
            </a>
          </div>
        </div>

        {/*Breadcrumbs end */}
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
        {/*Scorecard start */}
        <ProKabaddiScoreWidget isMobile={true} />
        {/*Scorecard end */}
        <div className="profile_player">
          <h3>{playerData?.bio?.full_name.toUpperCase()}</h3>
        </div>
      </div>
      {playerData.bio &&
        <div className="player_grid">
          <div className="wrapper">
            <div className="player_gridinner1">
              <div className="player-img-wrap">
                <LazyLoadImage
                  alt={playerData?.bio?.full_name}
                  title={playerData?.bio?.full_name}
                  src={`${SITE_CONfIG.imageBasePKL}/${teamSlug}-default.png`}
                  height={140}
                  width={140}
                />
                <div className="jersey-wrap">
                  <div className="jersey-inner">
                    <img
                      src={`${SITE_CONfIG.imageBasePKL}/jersey_icon.png`}
                      title="icon"
                      alt="icon"
                    />
                    <span className="jersey-val">{playerData?.bio?.jersey_no}</span>
                  </div>
                </div>
              </div>
              <div className="team-div">
                <div className="label-div">
                  <label className="label-txt">टीम</label>
                  <h4 className="label-val">{teamTranslationArr[teamSlug]}</h4>
                </div>
                <div className="label-div">
                  <label className="label-txt">टीम पोजीशन</label>
                  <h4 className="label-val">{playerData?.bio?.position_name}</h4>
                </div>
              </div>
            </div>
            <div className="player_detailswrap">
              <div className="player_detailsbox">
                <div className="player_detailhead">कद</div>
                <div className="player_detailtxt">{playerData?.bio?.height} </div>
              </div>
              <div className="player_detailsbox">
                <div className="player_detailhead">वजन</div>
                <div className="player_detailtxt">{playerData?.bio?.weight
                  ? playerData?.bio?.weight
                  : "-"}</div>
              </div>
              <div className="player_detailsbox">
                <div className="player_detailhead">जन्मदिन </div>
                <div className="player_detailtxt">{playerData?.bio?.date_of_birth}</div>
              </div>
              <div className="player_detailsbox2">
                <LazyLoadImage
                  src={`${SITE_CONfIG.imageBasePKL}/${playerData?.bio?.team_name
                    ?.replace(/ /g, "-")
                    .replace(/\./g, "")
                    .toLowerCase()}.png`}
                  height={88}
                  width={115}
                  alt={playerData?.bio?.team_name}
                  title={playerData?.bio?.team_name}
                />
              </div>
              <div className="player_detailsbox">
                <div className="player_detailhead">नागरिकता</div>
                <div className="player_detailtxt">India</div>
              </div>
            </div>
          </div>
        </div>
      }

      {playerData.bio &&
        <div className="this_season">
          <div className="wrapper">
            <h3>
              {playerData?.bio?.full_name} <span>सीजन 8 </span>
            </h3>
            <div className="totalwrap">
              <div className="totalbox">
                <div className="totalbox_head">
                  कुल मैच
                  <br />
                  Played
                </div>
                <p>{playerStats?.match_played}</p>
              </div>
              <div className="totalbox">
                <div className="totalbox_head">
                  कुल <br />
                  अंक
                </div>
                <p>{playerStats?.point}</p>
              </div>
              <div className="totalbox">
                <div className="totalbox_head">
                  Cards
                  <br />
                  Received
                </div>
                <ul className="totalcard">
                  <li>{playerStats?.red_cards ? playerStats?.red_cards : 0}</li>
                  <li>{playerStats?.yellow_cards ? playerStats?.yellow_cards : 0}</li>
                  <li>{playerStats?.green_cards ? playerStats?.green_cards : 0}</li>
                </ul>
              </div>
            </div>
            <div className="total-points-wrap">
              <ul className="total-points red">
                <li>
                  <p className="points">{playerStats?.total_raid_points}</p>
                  <div className="border" />
                  <p className="points-in">total raid points</p>
                </li>
                <li>
                  <p className="points">{playerStats?.raid_bonus_points}</p>
                  <div className="border" />
                  <p className="points-in">Raid Bonus Points</p>
                </li>
                <li>
                  <p className="points">{playerStats?.raid_touch_points}</p>
                  <div className="border" />
                  <p className="points-in">Raid Touch Points</p>
                </li>
                <li>
                  <p className="points">{playerStats?.success_raid_percent} </p>
                  <div className="border" />
                  <p className="points-in">Success Raid %</p>
                </li>
              </ul>
              <ul className="total-points red">
                <li>
                  <p className="points">{playerStats?.total_defending_points}</p>
                  <div className="border" />
                  <p className="points-in">Total Defending Points</p>
                </li>
                <li>
                  <p className="points">{playerStats?.defending_bonus_points}</p>
                  <div className="border" />
                  <p className="points-in">Defending Bonus Points</p>
                </li>
                <li>
                  <p className="points">{playerStats?.defence_touch_points}</p>
                  <div className="border" />
                  <p className="points-in">Defending Touch Points</p>
                </li>
                <li>
                  <p className="points">{playerStats?.tackle_success_rate}</p>
                  <div className="border" />
                  <p className="points-in">Tackle Success RaTE %</p>
                </li>
              </ul>
            </div>
            <div className="total-points-wrap">
              <ul className="total-points othercolor">
                <li>
                  <p className="points">{playerStats?.raids}</p>
                  <div className="border" />
                  <p className="points-in">Total Raids</p>
                </li>
                <li>
                  <p className="points">{playerStats?.super_raids}</p>
                  <div className="border" />
                  <p className="points-in">Super Raids</p>
                </li>
                <li>
                  <p className="points">{playerStats?.success_raids}</p>
                  <div className="border" />
                  <p className="points-in">Successful Raids</p>
                </li>
                <li>
                  <p className="points">{playerStats?.unsuccess_raids}</p>
                  <div className="border" />
                  <p className="points-in">unsuccessful Raids</p>
                </li>
              </ul>
              <ul className="total-points othercolor">
                <li>
                  <p className="points">{playerStats?.tackles}</p>
                  <div className="border" />
                  <p className="points-in">Total Tackles</p>
                </li>
                <li>
                  <p className="points">{playerStats?.super_tackles}</p>
                  <div className="border" />
                  <p className="points-in">Super Tackles</p>
                </li>
                <li>
                  <p className="points">{playerStats?.success_tackles}</p>
                  <div className="border" />
                  <p className="points-in">Successful Tackles</p>
                </li>
                <li>
                  <p className="points">{playerStats?.unsuccesful_tackles}</p>
                  <div className="border" />
                  <p className="points-in">Unsuccess Tackles</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
      {teamSquad?.length > 0 && teamSlug &&
        <div className="wrapper">
          <div className="teamsquad" role="toolbar">
            <h3>{teamTranslationArr[teamSlug]} स्कवॉड</h3>
            <div className="teamsquadsldr">
              <div className="teamsquadsldrin" data-glide-el="track">
                <ul>
                  {teamSquad && teamSquad.map((item, index) =>

                    <li key={`squad${index}`}>
                      <a href={`/pro-kabaddi-league/${playerData?.bio?.team_name
                        .replace(/ /g, "-")
                        .replace(/\./g, "")
                        .toLowerCase()}/${item.full_name
                          .replace(/ /g, "-")
                          .replace(/\./g, "")
                          .toLowerCase()}-${item.player_id}/`}
                        title={item.full_name}
                        tabIndex={0}
                      >
                        <LazyLoadImage
                          src={`${SITE_CONfIG.imageBasePKL}/${playerData?.bio?.team_name
                            .replace(/ /g, "-")
                            .replace(/\./g, "")
                            .toLowerCase()}-default.png`}
                          height={141}
                          width={141}
                          title={item.full_name}
                          alt={item.full_name}
                        />
                      </a>
                      <div className="player-details">
                        <a href={`/pro-kabaddi-league/${playerData?.bio?.team_name
                          .replace(/ /g, "-")
                          .replace(/\./g, "")
                          .toLowerCase()}/${item.full_name
                            .replace(/ /g, "-")
                            .replace(/\./g, "")
                            .toLowerCase()}-${item.player_id}/`}
                          title={item.full_name}
                          tabIndex={0}
                        >
                          {item.full_name}
                        </a>
                        <h5 className="team-player-des">{playerData?.bio?.position_name}</h5>
                      </div>
                    </li>
                  )}

                </ul>
              </div>
              <div data-glide-el="controls[nav]" className="teamsquadbulet">
                {Array.apply(null, Array(teamSquad.length)).map((_, idx) => <button type="button" data-glide-dir={`=${idx}`} />)}
              </div>
            </div>
          </div>
        </div>
      }
      <>
        <div className="bignews">
          <a href={top_headlines[0]?.weburl_r} title={top_headlines[0]?.display_headline}>
            <LazyLoadImage
              width={355}
              height={237}
              src={top_headlines[0]?.images?.url}
              alt={top_headlines[0]?.display_headline}
            />
            <div className="overlay">&nbsp;</div>
          </a>
        </div>
        <h1 className="homepage">
          <a href={top_headlines[0]?.weburl_r} title={top_headlines[0]?.display_headline}>
            {top_headlines[0]?.display_headline}
          </a>
        </h1>
        <div className="smllnewssldr">
          <div className="smllnewssldrin" data-glide-el="track">
            <ul>
              {top_headlines?.slice(2, 6).map((headline, hIndex) => (
                <li key={`headline${hIndex}`}>
                  <a href={headline?.weburl_r} tabIndex={-1}>
                    <LazyLoadImage
                      width={163}
                      height={108}
                      src={headline?.images?.url}
                      alt={headline?.display_headline}
                      title={headline?.display_headline}
                    />
                  </a>
                  <h2>
                    <a
                      alt={headline?.display_headline}
                      title={headline?.display_headline}
                      tabIndex={-1}
                    >
                      {headline?.display_headline}
                    </a>
                  </h2>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
      <div className="wrapper">
        <div className="photogallery">
          <h3 className="toptitle">फोटो/वीडियो गैलरी</h3>
          <div className="biggallery">
            <a href={photoGallery[0]?.weburl_r}>
              <LazyLoadImage
                width={355}
                height={237}
                src={photoGallery[0]?.images?.url}
                alt={photoGallery[0]?.display_headline}
              />
              <svg
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"></path>
              </svg>
            </a>
            <h3 className="title">{photoGallery[0]?.display_headline}</h3>
          </div>
          <div className="phsmllnewssldr">
            <div className="phsmllnewssldrin" data-glide-el="track">
              <ul>
                {photoGallery.slice(2, 6).map((photoItem, photoIndex) => (
                  <li key={`photo${photoIndex}`}>
                    <a href={photoItem.weburl_r} tabIndex={-1}>
                      <LazyLoadImage
                        width={163}
                        height={108}
                        src={photoItem?.images?.url}
                        alt={photoItem.display_headline}
                        title={photoItem.display_headline}
                      />
                    </a>
                    <h2>
                      <a
                        href={photoItem.weburl_r}
                        title={photoItem.display_headline}
                        tabIndex={-1}
                      >
                        {photoItem.display_headline}
                      </a>
                    </h2>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="clearfix" />
        <div className="viewall">
          <a href="/ppro-kabbadi-league/pkl-news/">पूरा देखें</a>
        </div>
      </div>
      <div className="wrapper">
        <div className="newadd clearfix">
          <span>विज्ञापन</span>
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
      <div className="wrapper">
        <div className="widget-top-stories">
          <h3 className="widget-title">टॉप हेडलाइंस</h3>
          <div className="top-story-div">
            <ul className="top-story-list">
              {top_headlines.map((item, index) => (
                <li key={`headline${index}`}>
                  <a href={item.weburl_r} title={item.display_headline}>
                    <span className="arrow-svg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        viewBox="0 0 24 24"
                        fill="#001d42"
                      >
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                        <path fill="none" d="M0 0h24v24H0V0z" />
                      </svg>
                    </span>
                    <span className="list-txt">{item.display_headline}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="viewall">
              <a
                href="/pro-kabaddi-league/pkl-news/"
                title="view all"
                target="_blank"
              >
                पूरा देखें
              </a>
            </div>
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
        
        .profile_player h3 {font-size: 24px;line-height: 28px;	color: #001d42;	text-transform: uppercase;	font-weight: bold;border-bottom: 1px solid #ccd2d9;	padding-bottom: 5px;	margin-top: 25px;}    
        .player_grid {
          background: #f3f3f3;
          padding: 10px 0 0px;
          border-top: 1px solid #ccd2d9;
          border-bottom: 1px solid #ccd2d9;
        line-height: 1.5;
      }
      .player_gridinner1 {
          display: flex;
          margin-bottom: 15px;
      }
      .player_grid .player_detailswrap {
          display: flex;
          flex-wrap: wrap;
      }
      .player_gridinner1 .player-img-wrap {
          width: 141px;
          margin-right: 20px;
          position: relative;
      }
      .player_gridinner1 .player-img-wrap img {
          width: 100%;
      }
      .player_gridinner1 .jersey-wrap {
          position: absolute;
          bottom: 10px;
          right: -3px;
          border-radius: 50%;
          background: #001d422e;
          padding: 4px;
      }
      .player_gridinner1 .jersey-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #425673;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #ffffff;
      }
      .player_gridinner1 .player-img-wrap img {
          width: 100%;
      }
      .player_gridinner1 .jersey-inner img {
          width: 17px;
      }
      .player_gridinner1 .jersey-inner .jersey-val {
          margin: 3px 0 0 2px;
      }
      .player_gridinner1 .label-div {
          margin: 0 0 25px;
      }
      .player_gridinner1 .label-txt {
          color: #535353;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          line-height: 28px;
      }
      .player_gridinner1 .label-val {
          color: #ff2759;
          font-size: 18px;
          font-weight: 700;
          line-height: 18px;
          text-transform: uppercase;
      }
      .player_grid .player_detailsbox {
          flex: 0 0 33%;
          padding-right: 5px;
          box-sizing: border-box;
          margin-bottom: 25px;
      }
      .player_grid .player_detailsbox:nth-child(3n) {
          padding-right: 0;
      }
      .player_grid .player_detailsbox2 {
          flex: 0 0 66%;
          padding-right: 5px;
          box-sizing: border-box;
      }
      .player_grid .player_detailsbox:last-child {
          margin-bottom: 0;
          padding-right: 0;
      }
      .player_grid .player_detailhead {
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 10px;
      }
      .player_grid .player_detailtxt {
          font-size: 18px;
          text-transform: uppercase;
          color: #535353;
      }
      .player_grid .player_detailsbox2 img {
          width: 50%;
      }    
      .this_season h3 {
        font-size: 20px;
        line-height: 20px;
        color: #001d42;
        text-transform: uppercase;
        margin: 15px 0;
        position: relative;
        font-weight: bold;
    }
    .this_season h3 span {
        color: #425673;
        font-weight: initial;
    }
    .this_season .totalwrap {
        display: flex;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        padding: 10px 0;
    }
    .this_season .totalbox {
        flex: 0 0 33%;
        border-right: 1px solid #cccccc;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .this_season .totalbox:first-child {
        padding-left: 0;
    }
    
    .this_season .totalbox .totalbox_head {
        font-size: 12px;
        text-transform: uppercase;
        margin-bottom: 16px;
    }
    .this_season .totalbox p {
        color: #001d42;
        font-size: 48px;
        font-weight: bold;
        line-height: 35px;
    }
    .this_season .totalbox:last-child {
        border: 0;
       padding-right: 0;
    }
    .this_season .totalbox .totalcard {
        display: flex;
    }
    .this_season .totalbox .totalcard li {
        padding: 6px;
        font-size: 16px;
        width: 19px;
        box-sizing: border-box;
        border-radius: 5px;
        height: 31px;
        line-height: 22px;
        margin-right: 10px;
    }
    .this_season .totalbox .totalcard li:nth-child(1) {
        background: #ed1c24;
    }
    .this_season .totalbox .totalcard li:nth-child(2) {
        background: #ffcc00;
    }
    .this_season .totalbox .totalcard li:last-child {
        margin-right: 0;
      background: #1f6500;
    }
    .this_season .total-points-wrap {
        padding: 20px 0;
        border-bottom: 1px solid #cccccc;
    }
    .this_season .total-points {
        display: flex;
        flex-wrap: wrap;
    }
    .this_season .total-points li {
        width: 25%;
        padding: 0 10px;
        text-align: center;
        box-sizing: border-box;
    }
    .this_season .total-points li:first-child {
        padding-left: 0;
    }
    .this_season .total-points li .points {
        font-size: 28px;
        color: #000000;
        margin: 5px 0;
    }
    .this_season .total-points.red li .points {
        color: #ff2759;
    }
    .this_season .total-points li:first-child .points {
        font-weight: bold;
    }
    .this_season .total-points li .border {
        display: block;
        width: 100%;
        height: 6px;
        border-radius: 5px;
        background: #001d42;
    }
    .this_season .total-points.red li .border {
        background: #ff2759;
    }
    .this_season .total-points li .points-in {
        font-size: 12px;
        color: #000000;
        text-transform: uppercase;
        text-align: center;
        line-height: 16px;
        margin: 5px 0;
    }
    .this_season .total-points li:last-child {
        padding-right: 0;
    }
    .this_season .total-points-wrap:last-child {
        border-bottom: 4px solid #425673;
    }
    .this_season .total-points.othercolor li:first-child .border {
        background: #586376;
    }
    .this_season .total-points.othercolor li:nth-child(2) .border {
        background: #5ed096;
    }
    .this_season .total-points.othercolor li:nth-child(3) .border {
        background: #5ed096;
    }
    .this_season .total-points.othercolor li .border {
        background: #ff2759;
    }
    .this_season .total-points.othercolor li:first-child .points {
        color: #586376;
    }
    .teamsquad { position: relative; border-bottom: 4px solid #ff2759; padding-bottom: 10px;}
			.teamsquad h3 { font-size: 20px; line-height: 18px; color: #425673; text-transform: uppercase; margin: 30px 0 10px 0; position: relative;border-bottom: 1px solid #ccd2d9; padding-bottom: 10px; z-index: 5; font-weight: normal;}
      .teamsquadsldr{position: relative;  margin: 20px 20px 0;}
				   .teamsquadsldrin{ overflow: hidden; margin-bottom: 30px;}
				   .teamsquadsldr ul{display: flex;padding: 0 0 5px 0; justify-content:start;}
				   .teamsquadsldr ul li{height: 100%; min-height: 1px; text-align: center; flex-shrink:0;}  
				   .player-details {text-align: center; margin: 10px 0 0;}
					.player-details a {color: #001d42; font-size: 16px; font-weight: 700; line-height: 20px;}
					.team-player-des {color: #656565; font-size: 13px;margin: 5px 0 0; font-weight: normal;}
					.teamsquadbulet{display: flex; gap:6px; justify-content: center; margin-top: 5px;}
					.teamsquadbulet button{width: 13px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block; line-height: 20px;}
					.teamsquadbulet button.glide__bullet--active{background: #ED1C24;}	
					.teamsquadsldr ul li a img{width:100%;}
          .phsmllnewssldr {
            position: relative;
            margin: -20px 10px;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 3;
            overflow: hidden;
          }
  
          .phsmllnewssldrin {
            overflow: hidden;
            margin-bottom: 30px;
          }
  
          .phsmllnewssldr ul {
            display: flex;
            padding: 0 0 5px 0;
            justify-content: start;
          }
  
          .phsmllnewssldr ul li {
            height: 100%;
            flex-shrink: 0;
            width: 195px;
            float: left;
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
  
          .teamsquadbulet {
            display: flex;
            gap: 6px;
            justify-content: center;
            margin-top: 5px;
          }
  
          .teamsquadbulet button {
            width: 13px;
            height: 4px;
            background: #D6D6D6;
            border-radius: 3px;
            display: block;
            line-height: 20px;
          }
  
          .teamsquadbulet button.glide__bullet--active {
            background: #ED1C24;
          }
  
          .phsmllnewssldr ul li a img {
            width: 100%;
          }
  
          .phsmllnewssldr li h2 {
            color: #333333;
            font-size: 16px;
            line-height: 24px;
            margin: 5px 5px 10px 5px;
          }
  
          .photogallery .phsmllnewssldr {
            margin-top: 10px;
          }
          .photogallery {
            border-bottom: 1px solid #ccd2d9;
            clear: both;
            width: 100%;
            float: left;
            padding-bottom: 10px;
            overflow: hidden;
          }
    
          .photogallery h3.toptitle {
            font-size: 20px;
            line-height: 18px;
            color: #425673;
            text-transform: uppercase;
            margin: 30px 0 10px 0;
            position: relative;
            border-bottom: 1px solid #ccd2d9;
            padding-bottom: 7px;
            z-index: 5;
            font-weight: bold;
          }
    
          .biggallery {
            position: relative;
          }
    
          .photogallery .biggallery h3.title {
            font-size: 18px;
            font-weight: bold;
            color: #333333;
            line-height: 22px;
          }
    
          .photogallery img {
            width: 100%;
          }
          .widget-top-stories {
            margin: 30px 0;
          }
    
          .widget-title {
            font-size: 24px;
            font-weight: bold;
            text-transform: uppercase;
            color: #001d42;
            border-bottom: 1px solid #ccd2d9;
            padding: 0 0 10px;
            line-height: 18px;
          }
    
          .widget-top-stories .top-story-div {
            margin: 0;
          }
    
          .top-story-div {
            position: relative;
            margin-top: -255px;
          }
    
          .top-story-list li a {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            position: relative;
            display: flex;
            line-height: 24px;
          }
    
          .arrow-svg {
            margin: 0 5px 0 -3px;
          }
    
          @media (max-width:768px) {
            .top-story-list li {
              margin: 10px 0px 0px 0;
              color: #333333;
              font-weight: bold;
              font-size: 16px;
              line-height: 24px;
            }
          }
          .viewall {
            font-size: 15px;
            font-weight: bold;
            text-transform: uppercase;
            color: #ff2759;
            text-align: center;
            margin-top: 10px;
            margin-bottom: 30px;
        }
        .bignews{position:relative;overflow:hidden}.bignews img{width:100%}.overlay{background:-webkit-linear-gradient(top,transparent 50%,#000 138%);bottom:0;left:0;width:100%;text-align:center;position:absolute;z-index:2;height:100%}.homepage{font-size:22px;font-weight:bold;color:#fff;line-height:30px;padding:10px 10px 25px 10px;text-align:left;background:#000}h1.homepage a{color:#fff !important; display: -webkit-box; -webkit-line-clamp: 2;-webkit-box-orient: vertical; overflow: hidden; max-height: 60px; padding-top: 2px;}
        .smllnewssldr{position: relative;  margin: -20px 10px; align-items: center;justify-content: center; position: relative; z-index: 3;overflow: hidden;}
		   .smllnewssldrin{ overflow: hidden; margin-bottom: 30px;}
		   .smllnewssldr ul{display: flex; padding: 0 0 5px 0; justify-content:start;}
		   .smllnewssldr ul li{height: 100%; flex-shrink:0; background: #eaeaea; padding: 5px; width: 195px; float: left;}
       .smllnewssldr ul li a img{width:100%;}
			
			.smllnewssldr li h2 {
				color: #333333;
				font-size: 16px;
				line-height: 24px;
				margin: 5px 5px 10px 5px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
			}
  `}
      </style>
    </>
  );
};

export default PlayerProfile;
