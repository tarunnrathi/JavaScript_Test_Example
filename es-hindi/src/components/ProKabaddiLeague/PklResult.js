import { useState, React } from "react";
import QuickLinks from "./Home/QuickLinks";
import RightSection from "./Home/RightSection";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import SvgIcons from "./SvgIcons";
import SITE_CONfIG from "config/site.config";

const PklResult = (props) => {
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
              <li>PKL RESULT</li>
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
                प्रो कबड्डी रिजल्ट 2021-22
              </span>
              <span className="big-title">प्रो कबड्डी रिजल्ट</span>
            </h1>
            <div className="schedule-wrap">
              {/*schedule-table start*/}
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
                    Filter Result by <span>Month/Team</span>
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
                          const teamSlug = item?.team_name.replace(/ /g, "-")
                            .replace(/\./g, "")
                            .toLowerCase()
                          return (
                            <option value={item?.team_id} key={item?.team_id}>{teamTranslationArr[teamSlug]}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/*schedule-table end*/}
              <div className="schedule-list-wrap">
                <div className="results-page-list">
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
                      <div key={`match-result${index}`}
                        className={`schedule-page-wrap  february ${teamAslug} ${teamBslug}`}
                      >
                        <div className="schedule-main-div">
                          <div className="match-other-details">
                            <div className="match-team-details">
                              <div
                                className={`score-txt ${item.teama_score > item.teamb_score &&
                                  "won-team"
                                  }`}
                              >
                                <h5 className="score-val">{item.teama_score}</h5>
                              </div>
                              <div
                                className={`team-name ${item.teama_score > item.teamb_score &&
                                  "won-team"
                                  }`}
                              >
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
                              <div
                                className={`team-name ${item.teama_score < item.teamb_score &&
                                  "won-team"
                                  }`}
                              >
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
                              <div
                                className={`score-txt ${item.teama_score < item.teamb_score &&
                                  "won-team"
                                  }`}
                              >
                                <h5 className="score-val">{item.teamb_score}</h5>
                              </div>
                            </div>

                            <div className="match-details-txt">
                              <span className="match-venue">
                                <img
                                  src={`${SITE_CONfIG.imageBasePKL}/trophy.png`}
                                  alt="trophy"
                                  title="trophy"
                                />
                                <span>{item.matchresult}</span>
                              </span>
                            </div>
                          </div>
                          <div className="match-time-details">
                            <div className="match-no">
                              <span className="match-name">{item.matchnumber}</span>|
                              <span className="zone-name">Zone A</span>
                            </div>
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
                            <h3 className="match-center-link">
                              <a
                                href={`/pro-kabaddi-league/${item.teama
                                  .replace(/ /g, "-")
                                  .replace(/\./g, "")
                                  .toLowerCase()}-vs-${item.teamb
                                    .replace(/ /g, "-")
                                    .replace(/\./g, "")
                                    .toLowerCase()}-live-score-match-centre-${item.match_id}/`}
                                title=""
                              >
                                Match Center
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={10}
                                  height={10}
                                  viewBox="0 0 24 24"
                                  fill="#ff2759"
                                >
                                  <path d="M0 0h24v24H0z" fill="none" />
                                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                </svg>
                              </a>
                            </h3>
                          </div>
                        </div>
                      </div>
                    )
                  }).reverse()}


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
            प्प्रो-कबड्डी लीग (Pro-Kabaddi League) के अब तक हो चुके 7 सीजन ( PKL Season 7) की बात की जाए तो पहले सीजन का खिताब जयपुर पिंक पैंथर्स (PKL Jaipur Pink Panther) ने जीता था. लेकिन इसके बाद टीम अब तक चैंपियन नहीं बन सकी है. 2015 में हुए दूसरे सीजन ( Pro-Kabaddi Season 2) का खिताब यू मुम्बा ने जीता. इसके बाद अगले तीनों सीजन के खिताब पटना पायरेट्स (Patna Pirates) ने जीते. टीम 2 या उससे अधिक बार टाइटल जीतने वाली लीग की एकमात्र टीम है. 2018 में बेंगलुरु बुल्स (PKL Bengaluru Bulls) ने और 2019 में बंगाल वारियर्स (PKL Bengal Warriors) ने खिताब पर कब्जा किया. अब तक 5 टीमें खिताब जीत चुकी हैं. 7 टीमों को अभी भी पहले
          </p>
          {readMore &&
            <p>खिताब का इंतजार है. कोरोना के कारण 2020 का सीजन नहीं खेला जा सका था. हालांकि 8 टीमें ही अब तक सभी 7 सीजन के मुकाबले सकी हैं. 2017 से 12 टीमों को शामिल किया गया. यू मुम्बा (Pro-Kabaddi U Mumba) ने सबसे अधिक 81 मुकाबले जीते हैं. इसके अलावा पटना पायरेट्स ( Pro-Kabaddi Patna Pirates) ने भी 70 मुकाबलों ने जीत दर्ज की है. दबंग दिल्ली ने सबसे अधिक 69 मुकाबले गंवाए हैं.</p>
          }

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
        .pro-main-wrapper { padding: 5px 20px 0 20px;}
        .content-wrap { max-width: 1240px; margin: 0 auto;}
        .pro-breadcrumb {display: flex; justify-content: space-between; border-bottom: 1px dotted #969696; padding: 0 0 5px; align-items: center;}
        .breadcrumb-list { display: flex; align-items: center;}
        .breadcrumb-list li {font-size: 14px; color: #001d42;font-weight: 700; text-transform: uppercase; margin: 0 5px 0 0;}
        .breadcrumb-list li a {color: #969696;font-weight: 600;}
        .social-sharing {display: flex; align-items: center;}
        .social-share-link {width: 30px;  height: 30px; display: flex; align-items: center; border: 1px solid #7f7f7f; border-radius: 50%; margin: 0 0 0 10px;}
        .fb-link svg { margin: -10px 0 0;}
        .main-block-container {display: flex; padding-top: 10px;}
			.content-wrap {max-width: 1240px; margin: 0 auto;}
      .filter-block {display: flex;align-items: center;justify-content: center;}
							.filter-cell {border-right: 1px solid #ccd2d9;padding: 9px 15px 9px 0;font-size: 14px;color: #ff2759;display: flex;white-space: nowrap;line-height: 1;}
							.filter-cell svg {margin-right: 5px;}
							.filter-cell span {color: #001d42;text-decoration: underline;padding-left: 5px;}
							.month-cell {border-right: 1px solid #ccd2d9;padding: 0 10px;}
							.month-list {display: flex;align-items: center;}
							.month-list li {margin: 0 4px;}
							.month-list li a.active, .month-list li a:hover {background: #ff2759;border-color: #ff2759;color: #fff;}
							.month-list li a {font-size: 14px;color: #7c7c7c;background: #f3f3f3;border: 1px solid #ccd2d9;display: inline-block;padding: 8px 15px;border-radius: 5px;}
              .month-list li a:hover{cursor:pointer;}
							.team-dropdown {margin: 0 0 0 10px;}
							.select-style {width: 220px;border-radius: 5px;overflow: hidden;background: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images/down-arrow.png) 95% 50% no-repeat #ff2759; line-height: 1;}
							.select-style select {padding: 5px 8px 4px;width: 100%;border: none;box-shadow: none;background: 0 0;-webkit-appearance: none;font-size: 14px;color: #fff;font-family: "Mukta",sans-serif!important; line-height: 1;}
							.select-style select option {color: #000;}
              .left-section {width: calc(100% - 330px);}
				.double-title.page-title {align-items: flex-end; margin-bottom: 10px;}
				.double-title {font-weight: 500; display: flex; align-items: flex-start;text-transform: uppercase; border-bottom: 1px solid #ccd2d9; position: relative;}
				.double-title.page-title .small-title {font-size: 36px; line-height: 44px; font-weight: bold;}
				.small-title {font-size: 24px; font-weight: normal; text-transform: uppercase; color: #001d42; padding: 0 0 10px; line-height: 18px;}
				.big-title, .tags-big-title { font-size: 40px; color: rgba(0, 29, 66, 0.1); margin: -3px 0 0 -8px; display: none;}
				.double-title.page-title .big-title { font-size: 40px; margin: 0;}

				.schedule-list-wrap {margin: 20px 0;}
				.results-page-list .schedule-page-wrap {background: #f3f3f3;padding: 15px 20px;border-top: 1px solid #ccd2d9; margin: 0 0 15px;}
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
				.team-name a {font-size: 18px;font-weight: bold; color: #425673; text-transform: uppercase;display: block;margin-bottom: 10px;}
				.team-logo {text-align: center;}
				.team-logo img {width: 50%;}				
				.score-txt {text-align: center;border: 1px solid #bebebe;background-color: #fff;border-radius: 50%;width: 40px;padding: 10px 0;margin: 10px auto;}
				.score-txt .score-val {color: #425673;font-size: 20px;font-weight: 700;text-transform: uppercase;}
				.results-page-list .score-txt.won-team {background: #ff2759;border: 1px solid #fff;box-shadow: 0 0 3px #ff2759;}
				.results-page-list .score-txt.won-team .score-val {color: #fff;}
				.results-page-list .team-name.won-team a {color: #ff2759;}
				.results-page-list .team-name a {color: #425673;}
				.results-page-list .match-venue {display: flex;align-items: center;border-radius: 14px;border: 1px solid #dadada;background-color: #fff; padding: 5px 25px; vertical-align: middle;width: 60%;margin: 0 auto;justify-content: center;}
				.results-page-list .match-time-details {border-right: none;border-left: 1px solid #ccd2d9;padding: 0px 10px 0 30px;}
				.results-page-list .match-no {color: #8a8a8a;background: 0 0;width: 100%;padding: 0;}
				.results-page-list .match-no span {display: inline-block;margin: 0 5px;}
				.results-page-list .match-no span {display: inline-block;margin: 0 5px;}
				.match-center-link {margin: 5px auto 0;}
				.match-center-link a {color: #ff2759;font-size: 12px;font-weight: 400;line-height: 20px;text-transform: uppercase;}
        .read_less_containr {font-size: 16px;line-height: 24px;color: #444;display: block;position: relative;}.read_less_containr p {margin-bottom: 20px;}.read_less_containr h4 {font-weight: bold;font-size: 20px;margin-bottom: 5px;}.read_less_containr p {margin-bottom: 20px;}.buttonGrp {position: relative;width: 136px;margin: 10px auto 10px;}.buttonGrp button {}.buttonGrp button {background-color: #EB3D3C;text-transform: capitalize;border: none;width: 100%;padding: 10px 15px 10px 0px;box-sizing: border-box;border-radius: 20px;cursor: pointer;color: #fff;font-size: 14px;line-height: 19px;font-family: "Noto Sans", devanagari;font-weight: 400;outline: none;}.buttonGrp .arrows {width: 13px;transform: rotate(89deg);}.buttonGrp .arrows {position: absolute;top: 20px;right: 12px;width: 12px;height: 1px;background-color: #fff;}.buttonGrp .arrows:before, .buttonGrp .arrows:after {content: "";position: absolute;width: 7px;height: 1px;top: -2px;right: -1px;background-color: #fff;transform: rotate(45deg);}.buttonGrp .arrows:after {top: 2px;transform: rotate(-45deg);}
    
  `}
      </style>
    </>
  );
};

export default PklResult;
