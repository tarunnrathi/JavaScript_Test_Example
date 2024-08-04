import React, { useState } from "react";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import ProKabaddiScoreWidget from "widgets/Common/Responsive/ProKabaddiScoreWidget";

const PointTable = (props) => {
  const pointTableData =
    props?.data?.pointTableData?.standings?.groups[0]?.teams;
  const { top_headlines, pageAds } = props.data;
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(true);
  }
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
            <a>
              {" "}
              ›› <span className="pagetitle">PKL Point Table</span>{" "}
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
        <div className="wrapper">
          {/*Schedule Main Section*/}
          <section className="schedule-main-block">
            <h1 className="double-title page-title">
              <span className="small-title">
                प्रो कबड्डी पॉइंट टेबल 2021-22
              </span>
              <span className="big-title">पॉइंट टेबल</span>
            </h1>
            <div className="schedule-wrap standing-wrap">
              {/* Table start here */}
              <table className="general-tbl standing-table">
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
                  {pointTableData.team?.map((item, index) => {
                    const hindiName = item.team_name
                      .replace(/ /g, "-")
                      .replace(/\./g, "")
                      .toLowerCase();
                    return (
                      <tr key={hindiName}>
                        <td>
                          <h4 className="rank-txt">{item.position}</h4>
                        </td>
                        <td>
                          <a
                            href={`/pro-kabaddi-league/${hindiName}-${item.team_id}`}
                            title={item.team_name}
                          >
                            {teamTranslationArr[hindiName]}
                          </a>
                        </td>
                        <td>{item.played}</td>
                        <td>{item.wins}</td>
                        <td>{item.lost}</td>
                        <td>{item.tied}</td>
                        <td>{item.points_conceded}</td>
                        <td>{item.points}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {/* Table end here */}
              <div className="vsp20 clearfix" />
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
            <section className="content-wrap">
              <div className="read_less_containr">
                <p className="pageContent">
                  प्रो कबड्डी लीग (Pro-Kabaddi League season) का सीजन लंबा होता है. लीग में 12 टीमें उतरती हैं. ऐसे में सभी को 22-22 मुकाबले खेलने को मिलते हैं. हर टीम को जीतने पर 5 अंक मिलते हैं जबकि ड्रॉ ( PKL Match Draw) पर 3 अंक दिए जाते हैं. अगर कोई टीम मुकाबला 7 या उससे कम अंक से हारती है तो उसे एक अंक मिलते हैं
                </p>
                {readMore &&
                  <>
                    <h4>प्वाइंट सिस्टम ( PKL Point System) </h4>
                    <p>
                      पहले ही सीजन ( Pro-Kabaddi Season 1) से ऐसा ही रखा गया है. पिछले सीजन ( PKL Season 7 ) की बात की जाए तो कोई भी टीम 100 अंक तक नहीं पहुंच सकी थी. 2 टीमों को 80 से अधिक अंक मिले थे. दबंग दिल्ली (PKL Dabang Delhi KC) की टीम 85 अंक के साथ पॉइंट टेबल (Pro-Kabaddi Points Table) में टॉप पर रही थी. वहीं बंगाल वॉरियर्स (PKL Bengal Warriors) को 83 अंक मिले थे. 7 से कम अंक से हारने पर भी टीमों को एक अंक मिलते हैं. यह कई बार टीमों के लिए बेहद अहम रहता है. पिछली बार नंबर-3 से नंबर-5 टीमों के बीच सिर्फ 3 अंक का अंतर था. 2 टीमों ने तो बराबर मुकाबले हारे थे. इसके बाद भी एक टीम एक अंक की बढ़त बनाने में कामयाब रही थी. इससे आपकी रैंकिंग ( Pro-Kabaddi Ranking )में फायदा मिलता है.
                    </p></>}
              </div>
              {!readMore &&
                <div className="buttonGrp">
                  <button type="button" onClick={() => handleReadMore()}>और पढ़ें</button>
                  <div className="arrows"></div>
                </div>
              }
            </section>

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
            {/*Top Stories Widget Section*/}
            <div className="widget-top-stories">
              <h3 className="widget-title">टॉप हेडलाइंस</h3>
              <div className="top-story-div">
                <ul className="top-story-list">
                  {top_headlines.map((item, index) => (
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
          </section>
          {/*Schedule Main Section*/}
        </div>

        {/*Scorecard end */}
      </div>
      <style jsx global>
        {`
        .wrapper { margin: 0px auto;}
        .wrapper { margin: 0 auto; position: relative;  padding: 0 10px; box-sizing: border-box;}
        
        .scorecard {margin: 10px 0;background: #fff;min-height: 150px;background-size: contain;padding: 10px 10px 7px 10px;border-left: 1px solid #ff2759;border-radius: 0 15px 0px 15px;border-right: 10px solid #ff2759;border-top: 1px solid #ff2759;border-bottom: 10px solid #ff2759;font-family: "Mukta",sans-serif;}
				.slick-dotted.slick-slider {margin-bottom: 30px;}
				.scorecard .scorecard-area {position: relative;}
				.cf:before, .cf:after {content: "";display: table;}
				.scorecard-area .slick-list.draggable {clear: both;overflow: hidden;}
				.scorecard .scorecard-repeat {float: left;}
				.scorecard .live {display: flex;align-items: center;justify-content: center;}
				ul.live li.first {font-size: 11px;font-weight: bold;color: #ff2759;padding: 0px 7px 0px 0px;border-right: 1px solid #373737;animation: blinker 1s cubic-bezier(.5, 0, 1, 1) infinite alternate;position: relative;text-transform: uppercase;}
				ul.live li.second {font-size: 11px;color: #373737;padding: 2px 0px 2px 7px;text-transform: uppercase;min-width: 70px;}
				.scorecard .livedetails {display: flex;align-items: center;justify-content: center;border-bottom: 1px solid #ccd2d9;padding-bottom: 5px;margin-top: 5px;}
				.scorecard .livedetails li.first {color: #ff2759;text-transform: uppercase;}
				.scorecard .livedetails li {font-size: 13px;font-weight: bold;color: #425673;padding: 0px 5px;border-right: 1px solid #373737;}
				.scorecard .livedetails li {font-size: 13px;font-weight: bold;color: #425673;padding: 0px 5px;border-right: 1px solid #373737;}
				.scorecard .livedetails li:last-child {border-right: 0px;}
				.livedetails li img {position: relative;top: 3px;margin-right: 2px;}
				.liveteam {display: flex;align-items: center;justify-content: center;margin-top: 7px;font-weight: bold;}
				.liveteam li.first {margin-right: 10px;}
				.red-circle, .grey-circle {margin: 0 auto !important;margin-top: 10px !important;}
				.red-circle, .grey-circle {margin-top: 0px !important;}
				.grey-circle {width: 40px;height: 40px;border-radius: 50%;border: 1px solid #bebebe;background: #fafafa;text-align: center;line-height: 40px;font-size: 20px;color: #425673;margin-top: 0px !important;}
				.liveteam li.four {font-size: 13px;text-transform: uppercase;color: #425673;text-align: left;min-width: 68px;}
				.liveteam li.third {flex-shrink: 0;margin: 0 10px;}
				.liveteam li.five {margin-left: 0px;}
				
				.slick-dots {position: absolute;bottom: -7px;display: block;width: 100%;padding: 0;margin: 0;list-style: none;text-align: center;}
				.slick-dots li {position: relative;display: inline-block;margin: 0 8px;padding: 0;cursor: pointer;}
				.slick-dots li button {font-size: 0;line-height: 0;display: block;cursor: pointer;color: transparent;border: 0;outline: none;background: transparent;}
				.slick-dots li.slick-active button:before {opacity: 1;background: #57005d;}
				.slick-dots li button:before {font-size: 30px;line-height: 20px;position: absolute;top: 0;left: 0;width: 12px;height: 4px;content: '';background: #bdbdbd;text-align: center;opacity: 1;-webkit-font-smoothing: antialiased;border-radius: 2px;-moz-osx-font-smoothing: grayscale;}
        .general-tbl {width: 100%;border-collapse: collapse;border-spacing: 0;}					
					.standing-table tr td:nth-child(2), .standing-table tr td:nth-child(8) {background: #f3f3f3;}
					.standing-table td:nth-child(2) a {display: flex;align-items: center; font-weight: bold;line-height: 18px; font-size: 14px;}					
					.standing-table tr td:nth-child(8) {font-size: 18px;font-weight: bold;}
					.standing-table td:first-child {display: none;}
					.general-tbl th:first-child {display: none;}
					.standing-table td:nth-child(2) a img {display: none;}
					.general-tbl th {font-size: 13px; font-weight: bold;color: #fff;background: #ff2759;text-transform: uppercase;padding: 10px;}
					.general-tbl th:nth-child(2) {width: 138px; text-align: left;}
					.standing-table td:nth-child(2){width: 138px;background: #f3f3f3; text-align: left; font-weight: bold;}
					.standing-table td:last-child{background: #f3f3f3; color: #586376; font-weight: bold;}
					.standing-table td{width: 35px; text-align: center; font-size: 16px; color: #001d42; line-height: 18px; padding: 10px 5px; vertical-align: middle; border-bottom: 1px solid #e5e9ec;}
          .read_less_containr {font-size: 16px;line-height: 24px;color: #444;display: block;overflow: hidden;position: relative;}.read_less_containr p {margin-bottom: 20px;}.read_less_containr h4 {font-weight: bold;font-size: 20px;margin-bottom: 5px;}.read_less_containr p {margin-bottom: 20px;}.buttonGrp {position: relative;width: 136px;margin: 10px auto 10px;}.buttonGrp button {}.buttonGrp button {background-color: #EB3D3C;text-transform: capitalize;border: none;width: 100%;padding: 10px 15px 10px 0px;box-sizing: border-box;border-radius: 20px;cursor: pointer;color: #fff;font-size: 14px;line-height: 19px;font-family: "Noto Sans", devanagari;font-weight: 400;outline: none;}.buttonGrp .arrows {width: 13px;transform: rotate(89deg);}.buttonGrp .arrows {position: absolute;top: 20px;right: 12px;width: 12px;height: 1px;background-color: #fff;}.buttonGrp .arrows:before, .buttonGrp .arrows:after {content: "";position: absolute;width: 7px;height: 1px;top: -2px;right: -1px;background-color: #fff;transform: rotate(45deg);}.buttonGrp .arrows:after {top: 2px;transform: rotate(-45deg);}

          .widget-top-stories {margin: 30px 0;}
					.widget-title {font-size: 24px;font-weight: bold;text-transform: uppercase;color: #001d42;border-bottom: 1px solid #ccd2d9;padding: 0 0 10px;line-height: 18px;}
					.widget-top-stories .top-story-div {margin: 0;}
					.top-story-div {position: relative;margin-top: -255px;}
					.top-story-list li a {font-size: 16px;font-weight: bold;color: #333;position: relative;display: flex;line-height: 24px;}
					.arrow-svg {margin: 0 5px 0 -3px;}
					@media (max-width:768px){
					 .top-story-list li {margin: 10px 0px 0px 0; color: #333333; font-weight: bold; font-size: 16px;	line-height: 24px;}
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
					.right-section {display:none;}
					.double-title.page-title .small-title{font-size: 24px; line-height: 28px; color: #001d42; text-transform: uppercase;   font-weight: bold; border-bottom: 1px solid #ccd2d9; padding-bottom: 5px; margin-top: 25px;}
					.newadd {background: #efefef;line-height: 0; margin: 10px 0;}
					.newadd span {display: block; font-size: 12px; color: #8E8E8E; text-align: center; height: 20px; line-height: 20px;  width: 100%;}
					.newadd a { margin: 10px auto; display: block; min-height: 300px; width: 300px;}
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
      .viewall a {
        color: #ff2759;
    }
      `}
      </style>
    </>
  );
};

export default PointTable;
