import React, { useContext } from "react";
import { GlobalContext } from "GlobalStore";

const TeamRankingComponent = (props) => {
  const teamRankingResult = props?.data?.teamRankingResult;
  const { globalState = {} } = useContext(GlobalContext);
  const { t20_country_list = {} } = globalState;

  const ranktype_value_set = props?.data.ranktype_value;
  const tag_set_hi = {
    TEST: "टेस्ट रैंकिंग",
    ODI: "वनडे रैंकिंग",
    T20: "टी20 रैंकिंग",
  };

  const Testactive = ranktype_value_set == "test" ? "active" : "";
  const ODIactive = ranktype_value_set == "odi" ? "active" : "";
  const T20active = ranktype_value_set == "t20" ? "active" : "";

  const h1_tag_set = tag_set_hi?.[ranktype_value_set];

  return (
    <>
      <div className="news_page">
        <div className="container">
          <div className="news_page_left">
            <div className="ad-container">
              <amp-ad
                width={336}
                height={280}
                type="doubleclick"
                data-multi-size="300x250"
                data-slot="/1039154/CRINXT_HIND_AMP/CRINXT_HIND_RANKING_AMP/CRINXT_HIND_RANKING_AMP_AL/CRINXT_HIND_RNKG_AL_AMP_ROS_ATF_320"
              ></amp-ad>
            </div>
            <div className="brade_crum">
              <a href="/">NEWS18 हिंदी</a> » <a href="/cricket/">क्रिकेट</a> »{" "}
              <h1 className="bredcrum_heading">{h1_tag_set}</h1>
            </div>
            <div className="heading_title">
              <h2>टीम रैंकिंग</h2>
            </div>
            <div className="ad-container">
              <amp-ad
                width={336}
                height={280}
                type="doubleclick"
                data-lazy-fetch="true"
				        data-loading-strategy="1"
                data-multi-size="300x250"
                data-slot="/1039154/CRINXT_HIND_AMP/CRINXT_HIND_RANKING_AMP/CRINXT_HIND_RANKING_AMP_AL/CRINXT_HIND_RNKG_AL_AMP_ROS_ATF_300"
              ></amp-ad>
            </div>
            <div className="tab_links">
              <a className={Testactive} href="/cricket/amp/test-ranking.html">
                टेस्ट रैंकिंग
              </a>
              <a className={ODIactive} href="/cricket/amp/odi-ranking.html">
                वनडे रैंकिंग
              </a>
              <a className={T20active} href="/cricket/amp/t20-ranking.html">
                टी20 रैंकिंग
              </a>
            </div>

            <table className="teamRanking">
              <thead>
                <tr>
                  <th>रैंकिंग</th>
                  <th>टीम</th>
                  <th>मैच</th>
                  <th>पॉइंट</th>
                  <th>रेटिंग</th>
                </tr>
              </thead>
              <tbody>
                {teamRankingResult?.map((data, i) => {
                  const dataImage =
                    data?.image !=
                    "https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/.png"
                      ? data.image
                      : "";
                  return (
                    <>
                      {dataImage && (
                        <tr key={i}>
                          <td>{data?.rank}</td>
                          <td>
                            <div className="teambox">
                              <a>
                                <div className="img big">
                                  <amp-img
                                    className="lazyload"
                                    src={dataImage}
                                    alt={data?.Country}
                                    title={data?.Country}
                                    width="35"
                                    height="23"
                                  ></amp-img>
                                </div>
                                <h3 className="teamrname">
                                  {t20_country_list[data?.Country] ||
                                    data?.Country ||
                                    ""}
                                </h3>
                              </a>
                            </div>
                          </td>
                          <td>{data?.Matches}</td>
                          <td>{data?.Points}</td>
                          <td>{data?.Rating}</td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="ad-container">
          <amp-ad
            width={336}
            height={280}
            type="doubleclick"
            data-multi-size="300x250"
            data-lazy-fetch="true"
				    data-loading-strategy="1"
            data-slot="/1039154/CRINXT_HIND_AMP/CRINXT_HIND_RANKING_AMP/CRINXT_HIND_RANKING_AMP_AL/CRINXT_HIND_RNKG_AL_AMP_ROS_BTF_300"
          ></amp-ad>
        </div>
      </div>

      <style jsx>{`
		   

         url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Mukta:wght@500;800&display=swap');


			article, aside, div, figure, form, h1, h2, h3, h4, h5, h6, li, p, section, ul {
				box-sizing: border-box;
				font-size: inherit;
			}
			* {
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}
      .ad-container{display: flex;
      justify-content: center;
      margin-top:5px;
      padding-top: 10px;
      padding-bottom: 10px;
      background: #dbdde3;}

			.news_page {width: 100%;background: #F5F5F5;  overflow: hidden;    padding-top: 20px;}
			.news_page_left {       font-family: 'Mukta', sans-serif; width:100%;     float: left; }  
			.news_page_right {     width: 300px;     float: right;     position: relative; } 
			.container {     max-width: 1284px;     margin: auto;     padding:0px; } 
			.news_page .container {background: #fff;overflow: hidden;}
			.brade_crum {font-family: "Mukta",sans-serif;text-transform: uppercase;min-height: 20px;overflow: auto;white-space: nowrap;-webkit-text-size-adjust: 100%;font-size: 13px;margin-bottom:10px;padding: 0 10px;}
            .brade_crum a{color: #5A5A5A; font-size: 100%; min-height: 20px; margin: 0 8px;}
            .brade_crum a:first-child {margin-left:0;}
            .bredcrum_heading {display: inline-block;color: #5A5A5A;font-size: 100%;font-weight: normal;margin-left: 8px;}
			
			.heading_title {background: #ED2128;text-align: left;padding:5px  10px;height: 36px;line-height: 36px;font-size: 18px;color: #fff;}
            .heading_title h2 {font-size: 18px;    ;font-family: 'Mukta',sans-serif;color: #fff}
			
			.tab_links {background: #F5F5F5; display: flex; border-top: 1px solid #CCCCCC; border-bottom: 1px solid #CCCCCC; margin: 14px 0; }
			.tab_links a {font-size: 13px;
            font-family: 'Mukta', sans-serif;
            padding: 13px 10px;
            display: block;
            text-transform: uppercase; }
			.tab_links a.active {border-bottom: 3px #E1261D solid; color: #fff; font-weight: 700; }

			.teamRanking {width: 100%; border-collapse: collapse; border-spacing: 0; }
			.teamRanking tr th {    background: #001D42;
            color: #fff;
            font-size: 10px;
            text-transform: uppercase;
            font-family: 'Mukta',sans-serif;
            padding: 8px 6px;
            padding-right: 10px;}
			.teamRanking tr th:nth-child(1) {text-align: left; padding-left: 10px; }
			.teamRanking tr th:nth-child(2) {width: 40%; text-align: left; }

			.teambox a {display: flex; align-items: center;text-decoration: underline;font-family: 'Playfair Display', serif;
         text-align: left;}
			.teamRanking tbody tr td:nth-child(1) {text-align: left; padding-left: 10px; }
			.teamRanking tbody tr {text-align: center; border-bottom: 1px solid #D8D8D8; background: #F5F5F5; height: 50px; vertical-align: middle;    font-family: 'Mukta', sans-serif; }
			.img.big img {margin-right: 10px; }
			.teamRanking tbody tr td {font-size: 13px; padding-top: 5px; padding-bottom: 5px; text-align: center; vertical-align: middle; color: #202020;    text-transform: uppercase; }
			.teambox h3 {font-weight: bold;    font-family: 'Mukta', sans-serif;    padding-left: 10px;}
			.teamRanking tbody tr.active {background: #fff;}
			.teamRanking tbody tr.active td {font-size: 17px; font-weight: 600; text-transform: uppercase; }
    `}</style>
    </>
  );
};

export default TeamRankingComponent;
