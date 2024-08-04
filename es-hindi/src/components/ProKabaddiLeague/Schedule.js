import { React, useState } from "react";
import QuickLinks from "./Home/QuickLinks";
import RightSection from "./Home/RightSection";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import SvgIcons from "./SvgIcons";
import SITE_CONfIG from "config/site.config";

const Schedule = (props) => {
  const allMatches = props?.data?.matches?.calendar?.matches;
  const [matches, setMatches] = useState(allMatches);
  const { team } =
    props?.data?.pointTableData?.standings?.groups[0]?.teams;
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(true);
  }
  const [filterName, setFilterName] = useState('all');
  const handleChange = (teamId) => {
    if (teamId === "all_teams") {
      setMatches(allMatches)
    } else {
      const teamMatches = allMatches.filter(data => (data.teama_id === Number(teamId)) || (data.teamb_id === Number(teamId)));
      setMatches(teamMatches);
    }
    setFilterName('all');
  }

  const filterByMonth = (month) => {
    let filteredMatches;
    if (month == "jan") {
      filteredMatches = allMatches.filter(data => data.matchdate_local.includes('01/2022'));
      setFilterName("jan");
    } else {
      filteredMatches = allMatches.filter(data => data.matchdate_local.includes('2021'));
      setFilterName("dec");
    }
    setMatches(filteredMatches);
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
              <li>PKL SCHEDULE</li>
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
                प्रो कबड्डी शेड्यूल 2021-22
              </span>
              <span className="big-title">प्रो कबड्डी शेड्यूल</span>
            </h1>
            <div className="schedule-wrap">
              {/*<p></p>*/}
              <div className="schedule-table">
                <div className="filter-block">
                  <div className="filter-cell">
                    <svg
                      height={14}
                      viewBox="0 0 1792 1792"
                      width={14}
                      fill="#4c607a"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45v-486l-493-493q-31-29-14-70 17-39 59-39h1280q42 0 59 39z" />
                    </svg>
                    Filter Schedule by <span>Month/Team</span>
                  </div>
                  <div className="month-cell">
                    <ul className="month-list">
                      <li>
                        <a
                          href={void (0)}
                          onClick={() => handleChange('all_teams')}
                          title="All"
                          className={`m-all sl_month ${filterName == "all" && "active"}`}
                        >
                          All
                        </a>
                      </li>
                      <li>
                        <a
                          href={void (0)}
                          onClick={() => filterByMonth('dec')}
                          title="December"
                          className={`m-december sl_month ${filterName == "dec" && "active"}`}
                        >
                          December
                        </a>
                      </li>
                      <li>
                        <a
                          href={void (0)}
                          onClick={() => filterByMonth('jan')}
                          title="January"
                          className={`m-january sl_month ${filterName == "jan" && "active"}`}
                        >
                          January
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="team-dropdown">
                    <div className="select-style">
                      <select name="sl_team" id="sl_team" className="teams-dd" onChange={(e) => handleChange(e.target.value)}>
                        <option value="all_teams">All Teams</option>
                        {team.map((item, index) => {
                          const teamSlug = item.team_name.replace(/ /g, "-")
                            .replace(/\./g, "")
                            .toLowerCase()
                          return (
                            <option value={item.team_id} key={item.team_id}>{teamTranslationArr[teamSlug]}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="schedule-list-wrap">
                <div className="schedule-page-list">
                  {matches?.map((item, index) => {
                    const teamAslug = item.teama
                      .replace(/ /g, "-")
                      .replace(/\./g, "")
                      .toLowerCase();
                    const teamBslug = item.teamb
                      .replace(/ /g, "-")
                      .replace(/\./g, "")
                      .toLowerCase();
                    return (
                      <div className={`schedule-page-wrap december ${teamAslug} ${teamBslug}`} key={`schedule${index}`}>
                        <div className="schedule-main-div">
                          <div className="match-time-details">
                            <div className="match-no">{item.matchnumber}</div>
                            <h4 className="match-date">{new Date(item.matchdate_local).toLocaleString('en-us', { weekday: 'long' })}, {new Date(item.matchdate_local).toLocaleString('en-us', { day: 'numeric' })} {new Date(item.matchdate_local).toLocaleString('en-us', { month: 'long' })}</h4>
                            <h5 className="match-time-stamp">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                viewBox="0 0 24 24"
                                fill="#425673"
                              >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                              </svg>
                              {item.matchtime_local} (IST)
                            </h5>
                          </div>
                          <div className="match-other-details">
                            <div className="match-details-txt">
                              <span className="match-venue">
                                <img
                                  src={`${SITE_CONfIG.imageBasePKL}/stadium.png`}
                                  alt="stadium"
                                  title="stadium"
                                />
                                {item.venue}
                              </span>
                              {/*<span class="zone-name">| Zone A</span>*/}
                            </div>
                            <div className="match-team-details">
                              <div className="team-name">
                                <a
                                  href={`/pro-kabaddi-league/${item.teama
                                    .replace(/ /g, "-")
                                    .replace(/\./g, "")
                                    .toLowerCase()}-${item.teama_id}/`}
                                  title={item.teama}
                                >
                                  {teamTranslationArr[teamAslug]}
                                </a>
                              </div>
                              <div className="team-logo">
                                <a
                                  href={`/pro-kabaddi-league/${item.teama
                                    .replace(/ /g, "-")
                                    .replace(/\./g, "")
                                    .toLowerCase()}-${item.teama_id}/`}
                                  title={item.teama}
                                >
                                  <img
                                    src={`${SITE_CONfIG.imageBasePKL}/${item.teama
                                      .replace(/ /g, "-")
                                      .replace(/\./g, "")
                                      .toLowerCase()}.png`}
                                    alt={item.teama}
                                    title={item.teama}
                                  />
                                </a>
                              </div>
                              <div className="vs-logo">
                                <img
                                  src={`${SITE_CONfIG.imageBasePKL}/vs-img.png`}
                                  title="VS"
                                  alt="VS"
                                />
                              </div>
                              <div className="team-logo">
                                <a
                                  href={`/pro-kabaddi-league/${item.teamb
                                    .replace(/ /g, "-")
                                    .replace(/\./g, "")
                                    .toLowerCase()}-${item.teamb_id}/`}
                                  title={item.teamb}
                                >

                                  <img
                                    src={`${SITE_CONfIG.imageBasePKL}/${item.teamb
                                      .replace(/ /g, "-")
                                      .replace(/\./g, "")
                                      .toLowerCase()}.png`}
                                    alt={item.teamb}
                                    title={item.teamb}
                                  />
                                </a>
                              </div>
                              <div className="team-name">
                                <a
                                  href={`/pro-kabaddi-league/${item.teamb
                                    .replace(/ /g, "-")
                                    .replace(/\./g, "")
                                    .toLowerCase()}-${item.teamb_id}/`}
                                  title={item.teamb}
                                >
                                  {teamTranslationArr[teamBslug]}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
          {/*Schedule Main Section*/}
        </div>

        <RightSection props={props?.data} />
      </section>
      <QuickLinks />
      <section className="content-wrap">
        <div className="read_less_containr">
          <p className="pageContent">
            प्रो कबड्डी लीग (Pro-Kabaddi League) के मुकाबले डबल राउंड रॉबिन और
            प्लेऑफ के आधार पर होते हैं. पहले सीजन (PKL Season 1) की बात करें तो
            सभी 8 टीमों को 14-14 मुकाबले खेलने को मिले थे. टॉप-4 टीम ( Top 4 PKL
            Team) ने प्लेऑफ में जगह बनाई थी. दो सेमीफाइन ( Pro-Kabaddi semi
            final)के अलावा तीसरे स्थान और फाइनल( Pro-Kabaddi final) के मुकाबले
            खेले गए. लेकिन टीमों की संख्या 12 होने के बाद अब हर टीम को अधिक मैच
            ( Pro-Kabaddi Matches) खेलने को मिल रहे हैं. हर टीम 22 मुकाबले
            (Every Pro-Kabaddi Team Playing 22 Matches, PKL season 8 )खेल रहे
            हैं. यानी एक तरह से मानें तो लीग की लोकप्रियता के कारण मैचों की
            संख्या में बढ़ोतरी की जा रही है.
          </p>
          {readMore && <>
            <h4>PKL Season 8 2021-2022</h4>
            <p>
              प्रो कबड्डी लीग (Pro-Kabaddi League) के मौजूदा सीजन में भी हर टीम को
              22 मुकालबे खेलने होंगे. लेकिन 12 टीमों के बाद से प्लेऑफ में 6 टीमों
              को जगह मिलती है. एलिमिनेटर-1 और एमिमिनेटर-2 के मुकाबले होते हैं.
              इसके बाद 2 सेमीफाइनल (Pro-Kabaddi Semi Final matches) और फिर फाइनल
              खेला ( PKL Final 2022 ) जाता है. 2014 में शुरुआत के बाद से लीग के
              प्रति खिलाड़ियों ( PKL Player) और स्पॉन्सर दोनों की दिलचस्पी बढ़ी है.
              इस कारण आज टीम और खिलाड़ी दोनों की संख्या में इजाफा किया गया है.
            </p>
          </>}
        </div>
        {!readMore &&
          <div className="buttonGrp rd_full">
            <button type="button" onClick={() => handleReadMore()}>और पढ़ें</button>
            <div className="arrows" />
          </div>
        }
      </section>
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
      .left-section {width: calc(100% - 330px);}
				.double-title.page-title {align-items: flex-end; margin-bottom: 10px;}
				.double-title {font-weight: 500; display: flex; align-items: flex-start;text-transform: uppercase; border-bottom: 1px solid #ccd2d9; position: relative;}
				.double-title.page-title .small-title {font-size: 36px; line-height: 44px; font-weight: bold;}
				.small-title {font-size: 24px; font-weight: normal; text-transform: uppercase; color: #001d42; padding: 0 0 10px; line-height: 18px;}
				.big-title, .tags-big-title { font-size: 40px; color: rgba(0, 29, 66, 0.1); margin: -3px 0 0 -8px; display: none;}
				.double-title.page-title .big-title { font-size: 40px; margin: 0;}
				
				.filter-block {display: flex;align-items: center;justify-content: center;}
				.filter-cell {border-right: 1px solid #ccd2d9;padding: 9px 15px 9px 0;font-size: 14px;color: #ff2759;display: flex;white-space: nowrap;line-height: 1;}
				.filter-cell svg {margin-right: 5px;}
				.filter-cell span {color: #001d42;text-decoration: underline;padding-left: 5px;}
				.month-cell {border-right: 1px solid #ccd2d9;padding: 0 10px;}
				.month-list {display: flex;align-items: center;}
				.month-list li {margin: 0 4px;}
				.month-list li a.active, .month-list li a:hover {background: #ff2759;border-color: #ff2759;color: #fff;}
				.month-list li a {font-size: 14px;color: #7c7c7c;background: #f3f3f3;border: 1px solid #ccd2d9;display: inline-block;padding: 8px 15px;border-radius: 5px;}
				.team-dropdown {margin: 0 0 0 10px;}
				.select-style {width: 220px;border-radius: 5px;overflow: hidden;background: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/down-arrow.png) 95% 50% no-repeat #ff2759; line-height: 1;}
				.select-style select {padding: 5px 8px 4px;width: 100%;border: none;box-shadow: none;background: 0 0;-webkit-appearance: none;font-size: 14px;color: #fff;font-family: "Mukta",sans-serif!important; line-height: 1;}
				.select-style select option {color: #000;}
				
				.schedule-list-wrap {margin: 20px 0;}
				.schedule-page-list .schedule-page-wrap {background: #f3f3f3;padding: 15px;border-top: 1px solid #ccd2d9;margin: 0 0 15px;}
				.schedule-main-div {display: flex;}
				.match-time-details {padding: 0px 30px 0 10px;text-align: center;border-right: 1px solid #ccd2d9;}
				.match-time-details .match-no {font-size: 13px;color: #fff;background: #425673;width: 60%;border-radius: 20px;padding: 5px 10px;text-transform: uppercase;margin: 0 auto 10px;}
				.match-time-details .match-date {color: #425673;font-size: 14px;}
				.match-time-details .match-time-stamp {color: #425673;font-size: 14px;margin: 5px 0 0;}
				.match-time-details .match-time-stamp svg {position: relative;top: 3px;}
				.match-other-details {margin: 0 auto;min-width: 82%;}
				.match-other-details .match-details-txt {color: #425673;}
				.match-details-txt {font-size: 11px;font-weight: 400;color: #000;text-align: center;}
				.match-details-txt span {display: inline-block;margin: 0 5px;font-size: 14px;}
				.match-details-txt span img {position: relative;top: 2px;margin-right: 5px;}
				.match-other-details .match-team-details {margin: 10px 0 0;}
				.match-team-details {display: flex;align-items: center;justify-content: space-around;margin: 5px 0;min-height: 98px;}
				.match-other-details .team-name a {font-size: 18px;}
				.team-name a {font-size: 18px;font-weight: bold;color: #001d42;text-transform: uppercase;display: block;margin-bottom: 10px;}
				.team-logo {text-align: center;}
				.team-logo img {width: 50%;}
        .read_less_containr {font-size: 16px;line-height: 24px;color: #444;display: block; position: relative;}
        .read_less_containr p {margin-bottom: 20px;}.read_less_containr h4 {font-weight: bold;font-size: 20px;margin-bottom: 5px;}.read_less_containr p {margin-bottom: 20px;}.buttonGrp {position: relative;width: 136px;margin: 10px auto 10px;}.buttonGrp button {}.buttonGrp button {background-color: #EB3D3C;text-transform: capitalize;border: none;width: 100%;padding: 10px 15px 10px 0px;box-sizing: border-box;border-radius: 20px;cursor: pointer;color: #fff;font-size: 14px;line-height: 19px;font-family: "Noto Sans", devanagari;font-weight: 400;outline: none;}.buttonGrp .arrows {width: 13px;transform: rotate(89deg);}.buttonGrp .arrows {position: absolute;top: 20px;right: 12px;width: 12px;height: 1px;background-color: #fff;}.buttonGrp .arrows:before, .buttonGrp .arrows:after {content: "";position: absolute;width: 7px;height: 1px;top: -2px;right: -1px;background-color: #fff;transform: rotate(45deg);}.buttonGrp .arrows:after {top: 2px;transform: rotate(-45deg);}
        .month-list li a:hover{cursor:pointer;}
  `}
      </style>
    </>
  );
};

export default Schedule;
