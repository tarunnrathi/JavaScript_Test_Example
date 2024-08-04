import React, { useState } from "react";
import QuickLinks from "./Home/QuickLinks";
import RightSection from "./Home/RightSection";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import SvgIcons from "./SvgIcons";
import SITE_CONfIG from "config/site.config";
import LazyLoadImage from "components/Common/CustomImage";

const PklPointTable = (props) => {

  const pointTableData =
    props?.data?.pointTableData?.standings?.groups[0]?.teams;
  const latestNews = props?.data?.latestNews;
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(true);
  }
  return (
    <>
      <div className="pro-main-wrapper">
        <div className="content-wrap">
          <div className="pro-breadcrumb">
            <ul className="breadcrumb-list">
              <li>
                <a href="/" title="">
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
                <a href="/pro-kabaddi-league/" title="">
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
              <li>PKL POINT TABLE</li>
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
                      <tr key={`pt${index}`}>
                        <td>
                          <h4 className="rank-txt">{item.position}</h4>
                        </td>
                        <td>
                          <a href={`/pro-kabaddi-league/${hindiName}-${item.team_id}/`} title={teamTranslationArr[hindiName]}>
                            <LazyLoadImage
                              src={`${SITE_CONfIG.imageBasePKL}/${hindiName}.png`}
                              title={teamTranslationArr[hindiName]}
                              alt={teamTranslationArr[hindiName]}
                              width={70}
                              height={50}
                            />
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
              <div className="vsp20 clearfix" />
              <div
                style={{ textAlign: "center", minHeight: 90, marginBottom: 10 }}
              />
              <div className="schedule-wrap match-centre-wrap">
                <h3 className="double-title big-double">
                  <span className="small-title">लेटेस्ट अपडेट</span>
                </h3>
                <div className="media-list-wrap">
                  <ul className="latest-update-media-list media-list">
                    {latestNews?.map((item, index) => (
                      <li className="item2" key={`latestNews${index}`}>
                        <div className="media-wrap">
                          <a href={item?.weburl_r} title={item.display_headline}>
                            <LazyLoadImage
                              width={214}
                              height={143}
                              src={item?.images?.url}
                              alt={item.display_headline}
                              title={item.display_headline}
                            />
                          </a>
                        </div>
                        <div className="date-class">{new Date(item.updated_at).toLocaleString('en-us', { weekday: 'long' })}, {new Date(item.updated_at).toLocaleString('en-us', { day: 'numeric' })} {new Date(item.updated_at).toLocaleString('en-us', { month: 'long', year: 'numeric' })}</div>
                        <h3 className="media-title">
                          <a href={item.weburl_r}>{item?.display_headline}</a>
                        </h3>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="vsp20 clearfix" />
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
            प्रो कबड्डी लीग (Pro-Kabaddi League season) का सीजन लंबा होता है. लीग में 12 टीमें उतरती हैं. ऐसे में सभी को 22-22 मुकाबले खेलने को मिलते हैं. हर टीम को जीतने पर 5 अंक मिलते हैं जबकि ड्रॉ ( PKL Match Draw) पर 3 अंक दिए जाते हैं. अगर कोई टीम मुकाबला 7 या उससे कम अंक से हारती है तो उसे एक अंक मिलते हैं. प्वाइंट सिस्टम ( PKL Point System) पहले ही सीजन ( Pro-Kabaddi Season 1) से ऐसा ही रखा गया है. पिछले सीजन ( PKL Season 7 ) की बात की जाए तो कोई भी टीम 100 अंक तक नहीं पहुंच सकी थी. 2 टीमों को 80 से अधिक अंक मिले थे. दबंग दिल्ली (PKL Dabang Delhi KC) की टीम 85 अंक के साथ पॉइंट टेबल (Pro-Kabaddi Points Table) में
            {readMore && <span>टॉप पर रही थी. वहीं बंगाल वॉरियर्स (PKL Bengal Warriors) को 83 अंक मिले थे. 7 से कम अंक से हारने पर भी टीमों को एक अंक मिलते हैं. यह कई बार टीमों के लिए बेहद अहम रहता है. पिछली बार नंबर-3 से नंबर-5 टीमों के बीच सिर्फ 3 अंक का अंतर था. 2 टीमों ने तो बराबर मुकाबले हारे थे. इसके बाद भी एक टीम एक अंक की बढ़त बनाने में कामयाब रही थी. इससे आपकी रैंकिंग ( Pro-Kabaddi Ranking )में फायदा मिलता है.</span>}
          </p>
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
      .general-tbl {width: 100%;border-collapse: collapse;border-spacing: 0;}
						.general-tbl th {font-size: 14px;font-weight: bold;color: #fff;background: #ff2759;text-transform: uppercase;padding: 10px;}
						.standing-wrap .standing-table td:first-child {box-sizing: border-box;}
						.standing-wrap .standing-table td {font-size: 18px;}
						.general-tbl td {font-size: 15px;font-weight: 400;color: #001d42;text-align: center;padding: 9px 10px;vertical-align: middle;border-bottom: 1px solid #ccd2d9;}
						.standing-table tr td:nth-child(2), .standing-table tr td:nth-child(8) {background: #f3f3f3;}
						.standing-table tr td:nth-child(2) {text-align: left;font-weight: bold;}
						.standing-wrap .standing-table td:nth-child(2) a {display: flex;align-items: center;font-size: 18px;font-weight: bold;line-height: 18px;}
						.standing-wrap .standing-table td:nth-child(2) a img {margin: 0 40px 0 20px;}
						.standing-wrap .standing-table td:last-child {font-weight: 700;}
						.standing-table tr td:nth-child(8) {font-size: 18px;font-weight: bold;}
            .main-block-container {display: flex; padding-top: 10px;}
			.content-wrap {max-width: 1240px; margin: 0 auto;}
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
      .read_less_containr {font-size: 16px;line-height: 24px;color: #444;display: block;position: relative;}.read_less_containr p {margin-bottom: 20px;}.read_less_containr h4 {font-weight: bold;font-size: 20px;margin-bottom: 5px;}.read_less_containr p {margin-bottom: 20px;}.buttonGrp {position: relative;width: 136px;margin: 10px auto 10px;}.buttonGrp button {}.buttonGrp button {background-color: #EB3D3C;text-transform: capitalize;border: none;width: 100%;padding: 10px 15px 10px 0px;box-sizing: border-box;border-radius: 20px;cursor: pointer;color: #fff;font-size: 14px;line-height: 19px;font-family: "Noto Sans", devanagari;font-weight: 400;outline: none;}.buttonGrp .arrows {width: 13px;transform: rotate(89deg);}.buttonGrp .arrows {position: absolute;top: 20px;right: 12px;width: 12px;height: 1px;background-color: #fff;}.buttonGrp .arrows:before, .buttonGrp .arrows:after {content: "";position: absolute;width: 7px;height: 1px;top: -2px;right: -1px;background-color: #fff;transform: rotate(45deg);}.buttonGrp .arrows:after {top: 2px;transform: rotate(-45deg);}
  `}
      </style>
    </>
  );
};


export default PklPointTable;
