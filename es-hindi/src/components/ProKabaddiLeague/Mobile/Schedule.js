import { React, useState } from 'react';
import { teamTranslationArr } from 'includes/proKabaddi.helper';
import LazyLoadImage from 'components/Common/CustomImage';
import SITE_CONfIG, { imageBasePKL } from 'config/site.config';
import SiteAd from 'widgets/Common/Responsive/SiteAd';
import ProKabaddiScoreWidget from 'widgets/Common/Responsive/ProKabaddiScoreWidget';

const Schedule = (props) => {
  const allMatches = props?.data?.matches?.calendar?.matches;
  const { pageAds } = props.data;
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
      <div className="wrapper">
        {/*Breadcr.umbs start */}
        <div className="bredcrum">
          <div className="bredcrum-txt">
            <a href="/">
              <span>Hindi News</span>{" "}
            </a>
            <a href="/pro-kabaddi-league/">
              {" "}
              ›› <span>Pro Kabaddi News 2021</span>{" "}
            </a>
            <a>
              {" "}
              ›› <span className="pagetitle">PKL SCHEDULE</span>{" "}
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

        <ProKabaddiScoreWidget isMobile={true}/>

      </div>
      <div className="wrapper">
        {/*Schedule Main Section*/}
        <section className="schedule-main-block">
          <h1 className="double-title page-title">
            <span className="small-title">प्रो कबड्डी शेड्यूल 2021-22</span>
            <span className="big-title">शेड्यूल</span>
          </h1>
          <div className="schedule-wrap">
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
                        href=''
                        onClick={() => handleChange('all_teams')}
                        title="All"
                        className={`m-all sl_month ${filterName == "all" && "active"}`}
                      >
                        All
                      </a>
                    </li>
                    <li>
                      <a
                        href=''
                        onClick={() => filterByMonth('dec')}
                        title="December"
                        className={`m-december sl_month ${filterName == "dec" && "active"}`}
                      >
                        December
                      </a>
                    </li>
                    <li>
                      <a
                        href=''
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
          </div>
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
        </section>
        {/*Schedule Main Section*/}
      </div>
      <div className="schedule-list-wrap sch">
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
            <div className="schedule-page-list result_list" key={item.matchnumber}>
              <div className="matchcontentbox">
                <ul className="livedetails">
                  <li className="first">{item.matchnumber}</li>
                  <li>{new Date(item.matchdate_local).toLocaleString('en-us', { weekday: 'long' })}, {new Date(item.matchdate_local).toLocaleString('en-us', { day: 'numeric' })} {new Date(item.matchdate_local).toLocaleString('en-us', { month: 'long' })}</li>
                  <li>
                    <img
                      src={`${imageBasePKL}/watch.png`}
                      alt="Match Time"
                    />{" "}
                    {item.matchtime_local} (IST)
                  </li>
                </ul>
                <ul className="teamname">
                  <li>
                    <LazyLoadImage
                      src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}.png`}
                      alt={item.teama}
                      title={item.teama}
                      height={83}
                      width={116}
                    />
                    <h4 className="">{teamTranslationArr[teamAslug]}</h4>
                  </li>
                  <li>
                    <LazyLoadImage
                      src={`${SITE_CONfIG.imageBasePKL}/vs.png`}
                      className="img-vs"
                      alt={'VS'}
                      height={44}
                      width={40}
                    />
                  </li>
                  <li>
                    <LazyLoadImage
                      src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}.png`}
                      alt={item.teamb}
                      title={item.teamb}
                      height={83}
                      width={116}
                    />
                    <h4 className="won-team">{teamTranslationArr[teamBslug]}</h4>

                  </li>
                </ul>
                <ul className="teamresult">
                  <li>
                    {item.venue}
                  </li>
                </ul>
                <div className="clearfix" />
              </div>
            </div>
          )
        })}


      </div>
      <div className="wrapper">
        <div className="read_less_containr read_full_containr">
          <p class="pageContent">प्रो कबड्डी लीग (Pro-Kabaddi League) के मुकाबले डबल राउंड रॉबिन और प्लेऑफ के आधार पर होते हैं. पहले सीजन (PKL Season 1) की बात करें तो सभी 8 टीमों को 14-14 मुकाबले खेलने को मिले थे. टॉप-4 टीम ( Top 4 PKL Team) ने प्लेऑफ में जगह बनाई थी. दो सेमीफाइन ( Pro-Kabaddi semi final)के अलावा तीसरे स्थान और फाइनल( Pro-Kabaddi final) के मुकाबले खेले गए. लेकिन टीमों की संख्या 12 होने के बाद अब हर टीम को अधिक मैच ( Pro-Kabaddi Matches) खेलने को मिल रहे हैं. हर टीम 22 मुकाबले (Every Pro-Kabaddi Team Playing 22 Matches, PKL season 8 )खेल रहे हैं. यानी एक तरह से मानें तो लीग की लोकप्रियता के कारण मैचों की संख्या में बढ़ोतरी की जा रही है.</p>
          {readMore &&
            <>
              <h4>PKL Season 8 2021-2022</h4>
              <p>प्रो कबड्डी लीग (Pro-Kabaddi League) के मौजूदा सीजन में भी हर टीम को 22 मुकालबे खेलने होंगे. लेकिन 12 टीमों के बाद से प्लेऑफ में 6 टीमों को जगह मिलती है. एलिमिनेटर-1 और एमिमिनेटर-2 के मुकाबले होते हैं. इसके बाद 2 सेमीफाइनल ( Pro-Kabaddi Semi Final matches) और फिर फाइनल खेला ( PKL Final 2022 ) जाता है. 2014 में शुरुआत के बाद से लीग के प्रति खिलाड़ियों ( PKL Player) और स्पॉन्सर दोनों की दिलचस्पी बढ़ी है. इस कारण आज टीम और खिलाड़ी दोनों की संख्या में इजाफा किया गया है.</p>

            </>}
        </div>
        {!readMore &&
          <div className="buttonGrp rd_full">
            <button type="button" onClick={() => handleReadMore()}>और पढ़ें</button>
            <div className="arrows" />
          </div>
        }
      </div>
      <style jsx global>{`
    .wrapper { margin: 0px auto;}
			.wrapper { margin: 0 auto; position: relative;  padding: 0 10px; box-sizing: border-box;}
      

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
				
				
				
				@media (max-width:768px){	
					.filter-block {display: block;}
					.filter-cell { border: 0; padding-bottom: 0;}
					.month-cell {border: 0; margin-top: 10px; padding: 0; padding-left: 18px;}
					.team-dropdown { margin: 10px 0 0 18px; width: 180px; height: 30px;}
					.select-style, .select-style select{width: 180px; height: 30px;}
					.month-list li:first-child {margin-left: 0;}
				}

        .left-section {width: calc(100% - 330px);}
				.double-title.page-title {align-items: flex-end; margin-bottom: 10px;}
				.double-title {font-weight: 500; display: flex; align-items: flex-start;text-transform: uppercase; border-bottom: 1px solid #ccd2d9; position: relative;}
				.double-title.page-title .small-title {font-size: 36px; line-height: 44px; font-weight: bold;}
				.small-title {font-size: 24px; font-weight: normal; text-transform: uppercase; color: #001d42; padding: 0 0 10px; line-height: 18px;}
				.big-title, .tags-big-title { font-size: 40px; color: rgba(0, 29, 66, 0.1); margin: -3px 0 0 -8px; display: none;}
				.double-title.page-title .big-title { font-size: 40px; margin: 0;}
				
				@media (max-width:768px){	
					.left-section {width: 100%;}
					.double-title.page-title{margin-bottom: 0;}
					.double-title.page-title .small-title{font-size: 24px; line-height: 28px; color: #001d42; text-transform: uppercase;   font-weight: bold; border-bottom: 1px solid #ccd2d9; padding-bottom: 5px; margin-top: 25px;}
					.newadd {background: #efefef;line-height: 0; margin: 10px 0;}
					.newadd span {display: block; font-size: 12px; color: #8E8E8E; text-align: center; height: 20px; line-height: 20px;  width: 100%;}
					.newadd a { margin: 10px auto; display: block; min-height: 300px; width: 300px;}
				}
        .schedule-list-wrap {margin: 20px 0;}
			.schedule-page-list .schedule-page-wrap {background: #f3f3f3;padding: 15px;border-top: 1px solid #ccd2d9;margin: 0 0 15px;}
			
			.matchcontentbox{border-top:1px solid #ccd2d9;border-bottom:0;padding:10px 0 0 0;width:auto;margin-bottom:20px;background:#eeeff0}
			ul.livedetails{display:flex;align-items:center;justify-content:center;border-bottom:1px dotted #b9b9b9;padding-bottom:10px}
			.matchcontentbox .livedetails li{font-size:14px;font-weight:bold;color:#425673;padding:0 5px;border-right:1px solid #373737}
			.matchcontentbox .livedetails li.first{color:#ff2759;text-transform:uppercase}
			.matchcontentbox .livedetails li:last-child{border-right:0}
			.result_list .matchcontentbox ul.teamname{border-bottom:0;padding-bottom:5px}
			.matchcontentbox ul.teamname{display:flex;align-items:center;justify-content:center}
			.matchcontentbox ul.teamname li{font-size:14px;color:#001d42;font-weight:bold;text-transform:uppercase;text-align:center;width:46%;padding:0}
			.result_list .matchcontentbox ul.teamname li{width:50px}
			.result_list .matchcontentbox ul.teamname li:first-child,.result_list .matchcontentbox ul.teamname li:last-child{width:160px}
			.matchcontentbox ul.teamname li img{width:70%}
			.matchcontentbox ul.teamname li h4{margin:5px 0 12px 0}
			.matchcontentbox ul.teamname li:nth-child(2){width:12%}
			.matchcontentbox ul.teamname img.img-vs{width:auto}
			.teamresult{border:1px solid #dadada;background:#fff;border-radius:25px;text-align:center;padding:5px 10px;margin:10px 10px 0 10px}
			.teamresult li{font-size:13px;color:#425673;line-height:20px}
			.teamresult li img{vertical-align:middle;margin-right:5px}
			.result_list .matchcontentbox p{width:100%;text-align:center;padding:6px 0;background:#eeeff0}
			.result_list .matchcontentbox p.jump,.result_list .matchcontentbox p.jump a{font-size:12px;line-height:20px;color:#ff2759;text-transform:uppercase}
			.result_list .matchcontentbox p.jump img{vertical-align:middle;margin-left:5px}

      .sch .matchcontentbox{border-bottom: 1px solid #ccd2d9;}
      .sch .teamresult{font-size: 14px; width: 100%; text-align: center; line-height: 20px; padding: 6px 0px;background: #eeeff0; color: #425673; border-radius: 0; margin: 0; border: 0;}
      .sch .result_list .matchcontentbox p{display: none;}
      .sch .matchcontentbox ul.teamname{border-bottom: 1px dotted #b9b9b9; padding-bottom: 10px;}
      .month-list li a:hover{cursor:pointer;}
      .read_less_containr {
        font-size: 16px;
        line-height: 24px;
        color: #444;
        display: block;
        position: relative;
      }
      .read_less_containr p {
        margin-bottom: 20px;
      }
      .read_less_containr h4 {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 5px;
      }
      .buttonGrp {
        position: relative;
        width: 136px;
        margin: 10px auto 10px;
      }
      .buttonGrp button {
        background-color: #EB3D3C;
        text-transform: capitalize;
        border: none;
        width: 100%;
        padding: 10px 15px 10px 0px;
        box-sizing: border-box;
        border-radius: 20px;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        line-height: 19px;
        font-family: "Noto Sans", devanagari;
        font-weight: 400;
        outline: none;
      }
      .buttonGrp .arrows {
        position: absolute;
        top: 20px;
        right: 12px;
        width: 12px;
        height: 1px;
        background-color: #fff;
      }
      .buttonGrp .arrows {
        width: 13px;
        transform: rotate(90deg);
      }
      .buttonGrp .arrows:before, .buttonGrp .arrows:after {
        content: "";
        position: absolute;
        width: 7px;
        height: 1px;
        top: -2px;
        right: -1px;
        background-color: #fff;
        transform: rotate(45deg);
      }
      .buttonGrp .arrows:after {
        top: 2px;
        transform: rotate(-45deg);
      }
  `}</style>
    </>
  )
}
export default Schedule;