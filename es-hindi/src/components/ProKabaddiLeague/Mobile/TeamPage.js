import { React, useEffect } from "react";
import Glide from "@glidejs/glide";
import { proKabaddiTeams, teamTranslationArr } from "includes/proKabaddi.helper";
import ProKabaddiScoreWidget from "widgets/Common/Responsive/ProKabaddiScoreWidget";
import SITE_CONfIG from "config/site.config";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import LazyLoadImage from "components/Common/CustomImage";

const TeamPage = (props) => {
  const { currentUrl, teamData, top_headlines, photoGallery, pageAds } = props.data;
  const slug = currentUrl.split('/');
  const teamUrl = slug[slug.length - 2].split('-');
  let teamName = `${teamUrl[0]} ${teamUrl[1]}`;
  teamName = teamName === "up yoddha" ? "yoddha" : teamName;
  const pointTableData =
    props?.data?.pointTableData?.standings?.groups[0]?.teams;
  const teamStanding = pointTableData?.team?.filter(e => e.team_name.toLowerCase().includes(teamName));
  const allPlayers = teamData?.squads?.squad?.players;
  const teamSlug = teamStanding[0]?.team_name.replace(/ /g, "-").replace(/\./g, "").toLowerCase();
  const teamId = proKabaddiTeams[teamSlug]?.id;
  const allMatches = props?.data?.matches?.calendar?.matches;
  const teamMatches = allMatches.filter(data => (data.teama_id === Number(teamId)) || (data.teamb_id === Number(teamId)));

  useEffect(() => {
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
      })?.mount();
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
    if (document.getElementsByClassName("teamatchsdr").length) {
      new Glide(document.querySelector('.teamatchsdr'), {
        autoplay: false,
        type: 'carousal',
        perView: 1,
        gap: 10,
        slidesToScroll: 1,
      })?.mount();
    }

  }, [])
  return (
    <>
      <div className="wrapper">
        {/*Breadcrumbs start */}
        <div className="bredcrum">
          <div className="bredcrum-txt">
            <a href="https://hindi.news18.com/">
              <span className="">Hindi News</span>{" "}
            </a>
            <a href="https://hindi.news18.com/pro-kabaddi-league/">
              {" "}
              ›› <span className="">Pro Kabaddi News 2021</span>{" "}
            </a>
            <a href="https://hindi.news18.com/pro-kabaddi-league/pkl-news/">
              {" "}
              ›› <span className="pagetitle">PKL {teamName}</span>{" "}
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
        <ProKabaddiScoreWidget isMobile={true} />
        <h1 className="mainhead">{teamTranslationArr[teamSlug]}</h1>
        <div className="teamlogo">
          <img
            src={`${SITE_CONfIG.imageBasePKL}/${teamStanding[0]?.team_name
              .replace(/ /g, "-")
              .replace(/\./g, "")
              .toLowerCase()}.png`}
            alt={teamTranslationArr[teamSlug]}
            title={teamTranslationArr[teamSlug]}
          />
        </div>
        <div className="intro">
          <div dangerouslySetInnerHTML={{ __html: proKabaddiTeams[teamSlug]?.desc }} />
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
        <div className="teampointtable">
          <h3>दबंग दिल्ली केसी This Season</h3>
          <div className="topdefender">Standings</div>
          <ul className="standinghead">
            <li>Teams</li>
            <li>P</li>
            <li>W</li>
            <li>L</li>
            <li>T</li>
            <li>SD</li>
            <li>PTS</li>
          </ul>
          <ul className="standingpoint">
            <li>{teamTranslationArr[teamSlug]}</li>
            <li>{teamStanding[0]?.played}</li>
            <li>{teamStanding[0]?.wins}</li>
            <li>{teamStanding[0]?.lost}</li>
            <li>{teamStanding[0]?.tied}</li>
            <li>{teamStanding[0]?.points_conceded}</li>
            <li>{teamStanding[0]?.points}</li>
          </ul>
          <div className="viewall">
            <a href="/pro-kabaddi-league/pkl-point-table/">
              पूरा देखें पॉइंट टेबल
            </a>
          </div>
        </div>
      </div>


      <div className="wrapper">
        <div className="teamsquad" role="toolbar">
          <h3>{teamTranslationArr[teamSlug]} स्कवॉड</h3>
          {/*Player slider start*/}
          <div className="teamsquadsldr">
            <div className="teamsquadsldrin" data-glide-el="track">
              <ul>
                {allPlayers?.map((item, index) =>
                  <li key={`squad${index}`}>
                    <a href={`/pro-kabaddi-league/${teamSlug}/${item.full_name.replace(/ /g, "-").replace(/\./g, "").toLowerCase()}-${item.player_id}/`} title={item.full_name}
                      tabIndex={0}>
                      <img
                        src={`${SITE_CONfIG.imageBasePKL}/${teamSlug}-default.png`}
                        title={item.full_name}
                        alt={item.full_name}
                      />
                    </a>
                    <div className="player-details">
                      <a
                        href={`/pro-kabaddi-league/${teamSlug}/${item.full_name.replace(/ /g, "-").replace(/\./g, "").toLowerCase()}-${item.player_id}/`}
                        title={item.full_name}
                        tabIndex={0}
                      >
                        {item.full_name}
                      </a>
                      <h5 className="team-player-des">Raider </h5>
                    </div>
                  </li>
                )}


              </ul>
            </div>
            <div data-glide-el="controls[nav]" className="teamsquadbulet">
              <button type="button" data-glide-dir="=0" />
              <button type="button" data-glide-dir="=1" />
              <button type="button" data-glide-dir="=2" />
              <button type="button" data-glide-dir="=3" />
              <button type="button" data-glide-dir="=4" />
              <button type="button" data-glide-dir="=5" />
              <button type="button" data-glide-dir="=6" />
            </div>
          </div>

          {/*Player slider end*/}
        </div>
      </div>
      {teamMatches?.length > 0 &&
        <div className="wrapper">
          <div className="teamresultcon">
            <h3>{teamTranslationArr[teamSlug]} मैच</h3>
            <div className="teamatchsdr">
              <div className="teamatchsdrin" data-glide-el="track">
                <ul>
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
                      <li key={item.matchnumber}>
                        <div>
                          <div className="matchno">{item.matchnumber}</div>
                          <ul className="livedetails">
                            <li>{new Date(item.matchdate_local).toLocaleString('en-us', { weekday: 'long' })}, {new Date(item.matchdate_local).toLocaleString('en-us', { day: 'numeric' })} {new Date(item.matchdate_local).toLocaleString('en-us', { month: 'long' })}</li>
                            <li>
                              <img
                                src={`${SITE_CONfIG.imageBasePKL}/watch.png`}
                                alt="watch"
                              />{" "}
                              {item.matchtime_local} (IST)
                            </li>
                          </ul>
                          <ul className="teamname">
                            <li>
                              <div className="boock">
                                <img
                                  src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}.png`}
                                  alt={item.teama}
                                  title={item.teama}
                                />
                              </div>
                            </li>
                            <li>
                              <img
                                src={`${SITE_CONfIG.imageBasePKL}/vs.png`}
                                alt="vs"
                              />{" "}
                            </li>
                            <li>
                              <div className="boock">
                                <img
                                  src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}.png`}
                                  alt={item.teamb}
                                  title={item.teamb}
                                />
                              </div>
                            </li>
                          </ul>
                          <ul className="teamname borderbt">
                            <li>
                              <div className={`${item.teama_score > item.teamb_score ? "red-circle" :
                                "grey-circle"
                                }`}>{item.teama_score}</div>
                            </li>
                            <li>
                              <img
                                src={`${SITE_CONfIG.imageBasePKL}/kabaddi.png`}
                                alt="kabaddi"
                              />
                            </li>
                            <li>
                              <div className={`${item.teamb_score > item.teama_score ? "red-circle" :
                                "grey-circle"
                                }`}>{item.teamb_score}</div>
                            </li>
                          </ul>
                          <ul className="teamstatus">
                            <li>
                            <img
                                src={`${SITE_CONfIG.imageBasePKL}/winner_cup.png`}
                                alt="winner_cup"
                              />
                              {item.matchresult}
                            </li>
                          </ul>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div data-glide-el="controls[nav]" className="teamatchsdrbulet">
                <button type="button" data-glide-dir="=0" />
                <button type="button" data-glide-dir="=1" />
              </div>
            </div>
          </div>
          <div className="viewall">
            <a
              href="/pro-kabaddi-league/pkl-schedule/"
              title="पूरा देखें शेड्यूल"
            >
              पूरा देखें शेड्यूल
            </a>
          </div>
        </div>
      }
      <div className="bignews">
        <a href={top_headlines[0]?.weburl_r} title={top_headlines[0]?.display_headline}>
          <img src={top_headlines[0]?.images?.url} alt={top_headlines[0]?.display_headline} />
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
      <>
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
            <a href="/pro-kabaddi-league/pkl-news/">पूरा देखें</a>
          </div>
        </div>
        {/* Gallery end */}
        <div className="wrapper">
          <div className="newadd clearfix">
            <span>विज्ञापन</span>
            <SiteAd
              width={336}
              height={280}
              adUnit={pageAds?.BTF_300}
              sizes={[
                [300, 250],
                [336, 280],
                [250, 250]
              ]}
              lazyload={true}
            ></SiteAd>
          </div>
        </div>
      </>
      <div className="wrapper">
        <div className="widget-top-stories">
          <h3 className="widget-title">टॉप हेडलाइंस</h3>
          <div className="top-story-div">
            <ul className="top-story-list">
              {top_headlines?.map((item, index) => (
                <li key={index}>
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

      <style jsx global>{`
      .wrapper { margin: 0px auto;}
			.wrapper { margin: 0 auto; position: relative;  padding: 0 10px; box-sizing: border-box;}
			.newadd {background: #efefef;line-height: 0; margin: 10px 0;}
			.newadd span {display: block; font-size: 12px; color: #8E8E8E; text-align: center; height: 20px; line-height: 20px;  width: 100%;}
			.newadd a { margin: 10px auto; display: block; min-height: 300px; width: 300px;}
      
        .mainhead{font-size:24px;line-height:28px;color:#001d42;text-transform:uppercase;font-weight:bold;border-bottom:1px solid #ccd2d9;padding-bottom:5px;margin-top:25px}.teamlogo{text-align:center;padding:10px 0;border:1px solid #e6e6e6;margin:10px 0}.intro{font-size:14px;color:#000;line-height:22px;margin-top:10px}
        .teampointtable{position:relative}.teampointtable h3{font-size:20px;line-height:18px;color:#425673;text-transform:uppercase;margin:30px 0 10px 0;position:relative;border-bottom:1px solid #ccd2d9;padding-bottom:10px;z-index:5}.teampointtable .topdefender{text-transform:uppercase;font-size:30px;color:#eeeff0;position:absolute;top:-2px;left:160px;z-index:2;display:none}.standinghead{display:flex;align-items:center;justify-content:center;background:#ff2759;text-transform:uppercase}.standinghead li{width:35px;text-align:center;font-weight:bold;font-size:13px;color:#fff;line-height:24px;color:#fff;padding:0 5px}.standinghead li:first-child{width:138px;text-align:left}.standingpoint{display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e5e9ec}.standingpoint li{width:35px;text-align:center;font-size:16px;color:#001d42;line-height:18px;padding:10px 5px}.standingpoint li:first-child{width:138px;background:#f3f3f3;font-size:14px;text-align:left;font-weight:bold}.standingpoint li:last-child{background:#f3f3f3;color:#586376;font-weight:bold}.viewall{font-size:15px;font-weight:bold;text-transform:uppercase;color:#ff2759;text-align:center;margin-top:10px;margin-bottom:30px}.viewall a{color:#ff2759}
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
          .teamsquad { position: relative; border-bottom: 4px solid #ff2759; padding-bottom: 10px;}
			.teamsquad h3 { font-size: 20px; line-height: 18px; color: #425673; text-transform: uppercase; margin: 30px 0 10px 0; position: relative;border-bottom: 1px solid #ccd2d9; padding-bottom: 10px; z-index: 5; font-weight: normal;}
      .teamatchsdr{position: relative;  margin: 20px 0 0;}
				   .teamatchsdrin{ overflow: hidden;}
				   .teamatchsdr ul{display: flex;padding: 0 0 5px 0; justify-content:start;}
				   .teamatchsdr ul li{height: 100%; min-height: 1px; text-align: center; flex-shrink:0;} 
				   .teamatchsdr-arrow button{width: 25px;background: transparent;position: absolute;left: -35px;top: 0;bottom: 4px;}					   
				   .teamatchsdr-arrow button:last-child{left: auto; right: -35px;}					   
					.teamatchsdr-arrow button.left:before, .teamatchsdr-arrow button.right:before {content: "";	display: block;	margin: 30px auto; width: 10px;	height: 10px; border-top: 2px solid #000;	border-left: 2px solid #000;transform: rotate(315deg);}
					.teamatchsdr-arrow button.right:before {transform: rotate(136deg);}
					.teamatchsdrbulet{display: flex; gap:5px; justify-content: center; margin-top: 5px;}
					.teamatchsdrbulet button{width: 12px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block;}
					.teamatchsdrbulet button.glide__bullet--active{background: #57005d;}
					
					.teamatchsdr .teamatchsdrin>ul>li>div:first-child{border:3px solid #dadada;position:relative;padding:10px;margin-bottom:15px;margin-top:10px}.matchno{position:absolute;background:#fff;top:-10px;left:10px;padding:0 10px;font-size:13px;font-weight:bold;color:#ff2759;text-transform:uppercase}.teamatchsdr .livedetails{display:flex;align-items:center;border-bottom:1px dotted #b4b4b4;padding-bottom:5px}.teamatchsdr .livedetails li{font-size:13px;font-weight:bold;color:#425673;padding:0 5px;border-right:1px solid #373737}.teamatchsdr .livedetails li:first-child{padding-left:0}.teamatchsdr .livedetails li:last-child{border-right:0}.livedetails li img{position:relative;top:3px;margin-right:2px}.teamatchsdr .teamname{display:flex;align-items:center;justify-content:center;margin-top:5px}.teamatchsdr .teamname li{width:104px;font-size:14px;color:#001d42;font-weight:bold;text-transform:uppercase;text-align:center}.borderbt{border-bottom:1px solid #b4b4b4;padding-bottom:10px}.red-circle{width:42px;height:42px;border-radius:50%;border:4px solid #f5cad4;background:#ff2759;text-align:center;line-height:35px;font-size:20px;color:#fff;margin-top:0 !important}.teamatchsdr .red-circle{margin:0 auto;}.red-circle,.grey-circle{margin:0 auto !important;margin-top:10px !important}.teamstatus li{color:#ff2759;font-size:13px;display:flex;margin-top:10px}.teamstatus li img{margin-right:5px}
          .teamresultcon{position:relative;border-bottom:3px solid #ff2759;padding-bottom:10px;margin-bottom:10px;overflow:hidden}.teamresultcon h3{font-size:20px;line-height:18px;color:#425673;text-transform:uppercase;margin:30px 0 10px 0;position:relative;border-bottom:1px solid #ccd2d9;padding-bottom:10px;z-index:5}
           .bignews img{width:100%}.overlay{background:-webkit-linear-gradient(top,transparent 50%,#000 138%);bottom:0;left:0;width:100%;text-align:center;position:absolute;z-index:2;height:100%}.homepage{font-size:22px;font-weight:bold;color:#fff;line-height:30px;padding:10px 10px 25px 10px;text-align:left;background:#000}h1.homepage a{color:#fff !important}
          .smllnewssldr{position: relative;  margin: -20px 10px; align-items: center;justify-content: center; position: relative; z-index: 3;overflow: hidden;}
		   .smllnewssldrin{ overflow: hidden; margin-bottom: 30px;}
		   .smllnewssldr ul{display: flex; padding: 0 0 5px 0; justify-content:start;}
		   .smllnewssldr ul li{height: 100%; flex-shrink:0; background: #eaeaea; padding: 5px; width: 195px; float: left;}  
		   .player-details {text-align: center; margin: 10px 0 0;}
			.player-details a {color: #001d42; font-size: 16px; font-weight: 700; line-height: 20px;}
			.team-player-des {color: #656565; font-size: 13px;margin: 5px 0 0; font-weight: normal;}
			.teamsquadbulet{display: flex; gap:6px; justify-content: center; margin-top: 5px;}
			.teamsquadbulet button{width: 13px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block; line-height: 20px;}
			.teamsquadbulet button.glide__bullet--active{background: #ED1C24;}	
			.smllnewssldr ul li a img{width:100%;}
			
			.smllnewssldr li h2 {
				color: #333333;
				font-size: 16px;
				line-height: 24px;
				margin: 5px 5px 10px 5px;
			}
      .phsmllnewssldr{position: relative;  margin: -20px 10px; align-items: center;justify-content: center; position: relative; z-index: 3;overflow: hidden;}
				   .phsmllnewssldrin{ overflow: hidden; margin-bottom: 30px;}
				   .phsmllnewssldr ul{display: flex; padding: 0 0 5px 0; justify-content:start;}
				   .phsmllnewssldr ul li{height: 100%; flex-shrink:0; width: 195px; float: left;}  
				   .player-details {text-align: center; margin: 10px 0 0;}
					.player-details a {color: #001d42; font-size: 16px; font-weight: 700; line-height: 20px;}
					.team-player-des {color: #656565; font-size: 13px;margin: 5px 0 0; font-weight: normal;}
					.teamsquadbulet{display: flex; gap:6px; justify-content: center; margin-top: 5px;}
					.teamsquadbulet button{width: 13px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block; line-height: 20px;}
					.teamsquadbulet button.glide__bullet--active{background: #ED1C24;}	
					.phsmllnewssldr ul li a img{width:100%;}					
					.phsmllnewssldr li h2 {color: #333333;font-size: 16px; line-height: 24px;	margin: 5px 5px 10px 5px;}
        .photogallery .phsmllnewssldr {margin-top: 10px;}
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
        .widget-top-stories {margin: 30px 0;}
				.widget-title {font-size: 24px;font-weight: bold;text-transform: uppercase;color: #001d42;border-bottom: 1px solid #ccd2d9;padding: 0 0 10px;line-height: 18px;}
				.widget-top-stories .top-story-div {margin: 0;}
				.top-story-div {position: relative;margin-top: -255px;}
				.top-story-list li a {font-size: 16px;font-weight: bold;color: #333;position: relative;display: flex;line-height: 24px;}
				.arrow-svg {margin: 0 5px 0 -3px;}
				@media (max-width:768px){
				 .top-story-list li {margin: 10px 0px 0px 0; color: #333333; font-weight: bold; font-size: 16px;	line-height: 24px;}
				}
        .bignews{position:relative;overflow:hidden}
      `}</style>
    </>
  );
};

export default TeamPage;
