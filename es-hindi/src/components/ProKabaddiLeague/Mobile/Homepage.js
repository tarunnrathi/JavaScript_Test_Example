import { React, useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import QuickLinks from "../Home/QuickLinks";
import LazyLoadImage from "components/Common/CustomImage";
import SITE_CONfIG from "config/site.config";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import ProKabaddiScoreWidget from "widgets/Common/Responsive/ProKabaddiScoreWidget";

const Homepage = (props) => {
  const { pageAds, top_headlines, photoGallery } = props.data;
  const pointTableData =
    props?.data?.pointTableData?.standings?.groups[0]?.teams;
  const teamsSlider = pointTableData.team;
  const { matches } = props?.data?.matches?.calendar;
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(true);
  }
  const widgetMatches = matches.filter(data => data.matchnumber == "Match 4" || data.matchnumber == "Match 5");
  useEffect(() => {
    if (document.getElementsByClassName("smllnewssldr").length) {
      new Glide(document.querySelector(".smllnewssldr"), {
        autoplay: 4000,
        type: "carousal",
        perView: 2,
        gap: 10,
        slidesToScroll: 1,
      }).mount();
    }
    if (document.getElementsByClassName("followsldr").length) {
      new Glide(document.querySelector(".followsldr"), {
        autoplay: false,
        type: "carousal",
        perView: 3,
        gap: 5,
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
        <ProKabaddiScoreWidget
          isMobile={true}
        />
      </div>
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
              <li key={`homepage${hIndex}`}>
                <a href={headline?.weburl_r} tabIndex={-1}>
                  <LazyLoadImage
                    src={headline?.images?.url}
                    alt={headline?.display_headline}
                    title={headline?.display_headline}
                    width={168}
                    height={112}
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
              {top_headlines?.map((item, index) => (
                <li key={`top${index}`}>
                  <a href={item?.weburl_r} title={item?.display_headline}>
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
                    <span className="list-txt">{item?.display_headline}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="viewall">
              <a
                href="/pro-kabaddi-league/pkl-news/"
                title="view all"
              >
                पूरा देखें
              </a>
            </div>
          </div>
        </div>
      </div>
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
      <div className="matches">
        <h3> मैच</h3>
        <ul className="matchtab">
          <li className="tab-button active" rel="Schedule">
            शेड्यूल
          </li>
          <li className="tab-button" rel="Results">
            रिजल्ट
          </li>
        </ul>
        <div id="Schedule-box" className="matchcontent">
          {widgetMatches?.map((mItem, mindex) => {
            const teamAslug = mItem.teama
              .replace(/ /g, "-")
              .replace(/\./g, "")
              .toLowerCase();
            const teamBslug = mItem.teamb
              .replace(/ /g, "-")
              .replace(/\./g, "")
              .toLowerCase();
            return (
              <div className="matchcontentbox" key={mItem.matchnumber}>
                <ul className="livedetails">
                  <li className="first">{mItem.matchnumber}</li>
                  <li>{new Date(mItem.matchdate_local).toLocaleString('en-us', { weekday: 'long' })}, {new Date(mItem.matchdate_local).toLocaleString('en-us', { day: 'numeric' })} {new Date(mItem.matchdate_local).toLocaleString('en-us', { month: 'long' })}</li>
                  <li>
                    <img
                      src={`${SITE_CONfIG.imageBase}/watch.png`}
                      alt=""
                    />
                    {mItem.matchtime_local} (IST)
                  </li>
                </ul>
                <ul className="teamname">
                  <li>
                    <a href={`/pro-kabaddi-league/${teamAslug}-${mItem.teama_id}/`} title={mItem.teama}>
                      <LazyLoadImage
                        src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}.png`}
                        alt={mItem.teama}
                        title={mItem.teama}
                        width={116}
                        height={83}
                      />
                    </a>
                    <a href={`/pro-kabaddi-league/${teamAslug}-${mItem.teama_id}/`} title={mItem.teama}>
                      <h4>{teamTranslationArr[teamAslug]}</h4>
                    </a>
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
                    <a href={`/pro-kabaddi-league/${teamBslug}-${mItem.teamb_id}/`} title={mItem.teamb}>
                      <LazyLoadImage
                        src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}.png`}
                        alt={mItem.teamb}
                        title={mItem.teamb}
                        width={116}
                        height={83}
                      />
                    </a>
                    <a href={`/pro-kabaddi-league/${teamBslug}-${mItem.teamb_id}/`} title={mItem.teamb}>
                      <h4>{teamTranslationArr[teamBslug]}</h4>
                    </a>
                  </li>
                </ul>
              </div>
            )
          })}
          <div className="viewall">
            <a href="/pro-kabaddi-league/pkl-schedule/">
              पूरा देखें शेड्यूल
            </a>
          </div>
        </div>

      </div >
      <div className="wrapper">
        <div className="teampointtable">
          <h3>पॉइंट टेबल</h3>
          <table className="general-tbl standing-table">
            <thead>
              <tr>
                <th>रैंक</th>
                <th>टीमें</th>
                <th>खेले</th>
                <th>जीते</th>
                <th>हारे</th>
                <th>टाई</th>
                <th>स्कोर</th>
                <th>पॉइंट</th>
              </tr>
            </thead>
            <tbody>
              {pointTableData.team?.slice(0, 7)?.map((item, index) => {
                const teamSlug = item.team_name
                  .replace(/ /g, "-")
                  .replace(/\./g, "")
                  .toLowerCase();
                return (
                  <tr key={`team${index}`}>
                    <td>
                      <h4 className="rank-txt">{index + 1}</h4>
                    </td>
                    <td>
                      <a
                        href={`/pro-kabaddi-league/${item.team_name
                          .replace(/ /g, "-")
                          .replace(/\./g, "")
                          .toLowerCase()}-${item.team_id}`}
                        title={item.team_name}
                      >
                        {teamTranslationArr[teamSlug]}
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
          <div className="viewall">
            <a href="/pro-kabaddi-league/pkl-point-table/">
              पूरा देखें पॉइंट टेबल
            </a>
          </div>
        </div>
      </div>
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
      <div className="wrapper">
        <div className="followsquad" role="toolbar">
          <h3>अपनी फेवरेट टीम को फॉलो करें</h3>
          {/*Follow slider start*/}
          <div className="followsldr">
            <div className="followsldrin" data-glide-el="track">
              <ul>
                {teamsSlider?.map((teamItem, teamIndex) => {
                  const hindiName = teamItem.team_name
                    .replace(/ /g, "-")
                    .replace(/\./g, "")
                    .toLowerCase();
                  return (
                    <li key={hindiName}>
                      <a
                        href={`/pro-kabaddi-league/${teamItem.team_name
                          .replace(/ /g, "-")
                          .replace(/\./g, "")
                          .toLowerCase()}-${teamItem.team_id}/`}
                        title={teamItem.team_name}
                        tabIndex={0}
                      >
                        <LazyLoadImage
                          src={`${SITE_CONfIG.imageBasePKL}/${teamItem.team_name
                            .replace(/ /g, "-")
                            .replace(/\./g, "")
                            .toLowerCase()}.png`}
                          height={71}
                          width={100}
                          alt={teamItem.team_name}
                          title={teamItem.team_name}
                        />
                      </a>
                      <a
                        href={`/pro-kabaddi-league/${teamItem.team_name
                          .replace(/ /g, "-")
                          .replace(/\./g, "")
                          .toLowerCase()}-${teamItem.team_id}/`}
                        title={teamItem.team_name}
                        tabIndex={0}
                      >
                        <h4 className="team-name-txt">{teamTranslationArr[hindiName]}</h4>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="followsldr-arrow" data-glide-el="controls">
              <button className="left" data-glide-dir="<" />
              <button className="right" data-glide-dir=">" />
            </div>
            <div data-glide-el="controls[nav]" className="teamsquadbulet">
              {Array.apply(null, Array(6)).map((_, idx) => <button type="button" data-glide-dir={`=${idx}`} />)}
            </div>
          </div>

          {/*Follow slider end*/}
        </div>
      </div>
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
                {photoGallery?.slice(2, 6)?.map((photoItem, photoIndex) => (
                  <li key={`photo${photoIndex}`}>
                    <a href={photoItem?.weburl_r} tabIndex={-1}>
                      <LazyLoadImage
                        width={163}
                        height={108}
                        src={photoItem?.images?.url}
                        alt={photoItem?.display_headline}
                        title={photoItem?.display_headline}
                      />
                    </a>
                    <h2>
                      <a
                        href={photoItem?.weburl_r}
                        title={photoItem?.display_headline}
                        tabIndex={-1}
                      >
                        {photoItem?.display_headline}
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
          <a href="/pro-kabaddi-league/pkl-gallery/">पूरा देखें</a>
        </div>
      </div>
      <div className="wrapper">
        <QuickLinks />
      </div>
      <div className="wrapper">
        <div className="read_less_containr read_full_containr">
          <p className="pageContent">
            प्रो-कबड्डी (Pro Kabaddi) प्रोफेशनल कबड्डी लीग है. इसकी शुरुआत 2014 में
            हुई. 2006 में एशियन गेम्स की सफलता और आईपीएल (IPL) की तर्ज पर इसकी शुरुआत
            की गई. लीग की शुरुआत के बाद से हर साल इसकी व्यूअरशिप नए रिकॉर्ड (PKL New
            record) बना रही है. इसी को देखते हुए टीमों की संख्या में भी इजाफा किया गया
            है. प्रो-कबड्डी लीग (Pro-Kabaddi League season 1) के पहले सीजन में जहां 8
            टीमों ( Pro-Kabaddi 8 Teams) उतरी थीं. अब इनकी संख्या बढ़कर 12 हो गई है. इस
            लीग (Pro Kabaddi League) में भारत के खिलाफ दुनिया के सभी बड़े देश के
            खिलाड़ी उतरते हैं.
            .</p>
          {readMore &&
            <>
              <h4>Pro-Kabaddi Teams</h4>
              <p>
                प्रो कबड्डी लीग Pro-Kabaddi League की 12 टीमें ये हैं: जयपुर पिंक
                पैंथर्स (Jaipur Pink Panther), यू मुंबा (U Mumba), पटना पायरेट्स (Patna
                Pirates), बेंगलुरू बुल्स (Bengaluru Bulls), बंगाल वारियर्स (Bengal
                Warriors), दबंग दिल्ली (Dabang Delhi KC), गुजरात फॉर्च्यून जाएंट्स
                (Gujarat Fortune Giants), हरियाणा स्टीलर्स (Haryana Steelers), पुणेरी
                पल्टन (Puneri Paltan), तमिल थलाइवाज (Tamil Thalaivas), तेलुगू टाइटंस
                (Telugu Titans) और यूपी योद्धा (UP Yoddha).
              </p>
              <h4>Pro-Kabaddi Player salary</h4>
              <p>
                अब तक 5 टीमें प्रो-कबड्डी लीग (Pro-Kabaddi League) का खिताब जीत चुकी हैं.
                पटना पायरेट्स ने सबसे अधिक 3 बार टाइटल पर कब्जा किया है. पहले सीजन (PKL
                Season 1) में जहां सबसे महंगे खिलाड़ी को 12.60 लाख रुपए मिले थे. मौजूदा
                सीजन के लिए सबसे महंगे खिलाड़ी प्रदीप नरवाल को 1.65 करोड़ रुपए मिले. यानी
                अब कबड्डी के खिलाड़ियों की सैलरी (Pro-Kabaddi player salary) में भी बड़ा
                उछाल आया है. चैंपियन टीम को प्राइज मनी के तौर पर 3 करोड़ जबकि रनरअप को 1.8
                करोड़ रुपए मिलते हैं. बॉलीवुड स्टार अभिषेक बच्चन (Abhishek Bachchan ) के
                अलावा कई बड़े बिजनेस ग्रुप ने भी लीग की टीमें खरीदी हैं.
              </p>
              <p>
                कोरोना के कारण पिछला सीजन (PKL Season) नहीं हो सका था. लेकिन एक बार फिर
                लीग वापसी करने को तैयार है. अब तक 7 सीजन ( PKL Season 7) के मुकाबले हो
                चुके हैं. यू मुंबा (Pro-Kabaddi U Mumba) और पटना पायरेट्स (Pro-Kabaddi
                Patna Pirates) लीग के इतिहास में सबसे अधिक मुकाबले जीतने वाली टीम हैं.
                प्रदीप नरवाल ( Pradeep Narwal )और राहुल चौधरी (Rahul Chaudhari) सबसे सफल
                खिलाड़ी हैं. दोनों ने अब तक तक 1000 से अधिक अंक बटोरे हैं.
              </p>
            </>}
        </div>
        {!readMore &&
          <div className="buttonGrp rd_full">
            <button type="button" onClick={() => handleReadMore()}>और पढ़ें</button>
            <div className="arrows" />
          </div>
        }
      </div>
      {/* <div className="wrapper">
        <div className="newadd clearfix">
          <span>विज्ञापन</span>
          <a href="#">
            <img src="https://s0.2mdn.net/simgad/6236000348784375636" alt="" />
          </a>
        </div>
      </div> */}
      <style jsx global>{`
      .wrapper { margin: 0px auto;}
			.wrapper { margin: 0 auto; position: relative;  padding: 0 10px; box-sizing: border-box;}
			.newadd {background: #efefef;line-height: 0; margin: 10px 0;}
			.newadd span {display: block; font-size: 12px; color: #8E8E8E; text-align: center; height: 20px; line-height: 20px;  width: 100%;}
			.newadd a { margin: 10px auto; display: block; min-height: 300px; width: 300px;}
      
        .bignews{position:relative;overflow:hidden}.bignews img{width:100%}.overlay{background:-webkit-linear-gradient(top,transparent 50%,#000 138%);bottom:0;left:0;width:100%;text-align:center;position:absolute;z-index:2;height:100%}.homepage{font-size:22px;font-weight:bold;color:#fff;line-height:30px;padding:10px 10px 25px 10px;text-align:left;background:#000}h1.homepage a{color:#fff !important; display: -webkit-box; -webkit-line-clamp: 2;-webkit-box-orient: vertical; overflow: hidden; max-height: 60px; padding-top: 2px;}
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
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
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

      .matches h3 {
        margin: 30px 10px 15px;
        position: relative;
        font-size: 24px;
        line-height: 18px;
        color: #001d42;
        text-transform: uppercase;
        font-weight: bold;
        padding-bottom: 5px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ccd2d9;
      }
  
      .matchtab {
        clear: both;
        width: 100%;
        float: left;
      }
  
      .matchcontent {
        width: 100%;
        clear: both;
      }
  
      .result_list {
        margin-top: 20px;
      }
  
      .hide {
        display: none !important;
      }
  
      .tab-button {
        margin-bottom: 10px;
      }
  
      .matchtab li {
        display: block;
        text-align: left;
        font-size: 15px;
        text-transform: uppercase;
        color: #494949;
        border-bottom: 3px solid #b9b9b9;
        width: 45%;
        float: left;
        padding-bottom: 7px;
      }
  
      .matchtab li:first-child {
        margin-left: 3%;
      }
  
      .matchtab li.active {
        color: #ff2759;
        border-bottom: 6px solid #ff2759;
        font-weight: 600;
        padding-bottom: 4px;
      }
  
      .matchtab li:last-child {
        text-align: right;
        margin-left: 3%;
        margin-right: 3%;
      }
  
      .matchcontentbox {
        clear: both;
        padding: 10px 0;
        border-bottom: 1px solid #ccd2d9;
        border-top: 1px solid #ccd2d9;
      }
  
      .matchcontentbox .livedetails {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px dotted #b9b9b9;
        padding-bottom: 10px;
      }
  
      .matchcontentbox ul.teamname {
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      .matchcontentbox .livedetails li {
        font-size: 14px;
        font-weight: bold;
        color: #425673;
        padding: 0px 5px;
        border-right: 1px solid #373737;
      }
  
      .matchcontentbox .livedetails li.first {
        color: #ff2759;
        text-transform: uppercase;
      }
  
      .matchcontentbox .livedetails li:last-child {
        border-right: 0px;
      }
  
      .livedetails li img {
        position: relative;
        top: 3px;
        margin-right: 2px;
      }
  
      .matchcontentbox ul.teamname li {
        font-size: 14px;
        color: #001d42;
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
        width: 46%;
        padding: 0;
      }
  
      .matchcontentbox ul.teamname li img {
        width: 70%;
      }
  
      .matchcontentbox ul.teamname li h4 {
        margin: 5px 0 5px 0;
      }
  
      .matchcontentbox ul.teamname li:nth-child(2) {
        width: 12%;
      }
  
      .matchcontentbox ul.teamname img.img-vs {
        width: auto;
      }
  
      .odd {
        background: #eeeff0;
        padding: 10px 10px 0 10px !important;
      }
  
      .matchcontentbox .livedetails {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px dotted #b9b9b9;
        padding-bottom: 10px;
      }
  
      .result_list .matchcontentbox {
        border-top: 1px solid #ccd2d9;
        border-bottom: 0px;
        padding: 10px 0px 0 0;
        width: auto;
        margin-bottom: 20px;
      }
  
      #Results-box.result_list .matchcontentbox {
        margin-bottom: 0px;
        border-bottom: 1px solid #ccd2d9;
      }
  
      .result_list .matchcontentbox ul.teamname {
        border-bottom: 0px;
        padding-bottom: 5px;
      }
  
      .result_list .matchcontentbox ul.teamname li {
        width: 50px;
      }
  
      .result_list .matchcontentbox ul.teamname li:first-child,
      .result_list .matchcontentbox ul.teamname li:last-child {
        width: 160px;
      }
  
      .teamresult {
        border: 1px solid #dadada;
        background: #fff;
        border-radius: 25px;
        text-align: center;
        padding: 5px 10px;
        margin: 10px 10px 0 10px;
      }
  
      .teamresult li {
        font-size: 13px;
        color: #425673;
        line-height: 20px;
      }
  
      .teamresult li img {
        vertical-align: middle;
        margin-right: 5px;
      }
  
      .result_list .matchcontentbox p {
        font-size: 14px;
        float: left;
        width: 100%;
        text-align: center;
        line-height: 20px;
        color: #425673;
      }
  
      .result_list .matchcontentbox p.jump,
      .result_list .matchcontentbox p.jump a {
        font-size: 12px;
        line-height: 20px;
        color: #ff2759;
        text-transform: uppercase;
      }
  
      #Results-box.result_list .matchcontentbox p {
        margin: 10px 0px;
      }
  
      .result_list .matchcontentbox p.jump,
      .result_list .matchcontentbox p.jump a {
        font-size: 12px;
        line-height: 20px;
        color: #ff2759;
        text-transform: uppercase;
      }
  
      .result_list .matchcontentbox p.jump img {
        vertical-align: middle;
        margin-left: 5px;
      }

      .teampointtable {
        position: relative
      }
  
      .teampointtable h3 {
        font-size: 24px;
        line-height: 18px;
        color: #001d42;
        text-transform: uppercase;
        margin: 30px 0 10px 0;
        position: relative;
        border-bottom: 1px solid #ccd2d9;
        padding-bottom: 10px;
        z-index: 5
      }
  
      .teampointtable .topdefender {
        text-transform: uppercase;
        font-size: 30px;
        color: #eeeff0;
        position: absolute;
        top: -2px;
        left: 160px;
        z-index: 2;
        display: none
      }
  
      .viewall {
        font-size: 15px;
        font-weight: bold;
        text-transform: uppercase;
        color: #ff2759;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 30px
      }
  
      .viewall a {
        color: #ff2759
      }
  
      .general-tbl {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
      }
  
      .standing-table tr td:nth-child(2),
      .standing-table tr td:nth-child(8) {
        background: #f3f3f3;
      }
  
      .standing-table td:nth-child(2) a {
        display: flex;
        align-items: center;
        font-weight: bold;
        line-height: 18px;
        font-size: 14px;
      }
  
      .standing-table tr td:nth-child(8) {
        font-size: 18px;
        font-weight: bold;
      }
  
      .standing-table td:first-child {
        display: none;
      }
  
      .general-tbl th:first-child {
        display: none;
      }
  
      .standing-table td:nth-child(2) a img {
        display: none;
      }
  
      .general-tbl th {
        font-size: 13px;
        font-weight: bold;
        color: #fff;
        background: #ff2759;
        text-transform: uppercase;
        padding: 0 5px;
      }
  
      .general-tbl th:nth-child(2) {
        width: 138px;
        text-align: left;
      }
  
      .standing-table td:nth-child(2) {
        width: 138px;
        background: #f3f3f3;
        text-align: left;
        font-weight: bold;
      }
  
      .standing-table td:last-child {
        background: #f3f3f3;
        color: #586376;
        font-weight: bold;
      }
  
      .standing-table td {
        width: 35px;
        text-align: center;
        font-size: 16px;
        color: #001d42;
        line-height: 18px;
        padding: 10px 5px;
        vertical-align: middle;
        border-bottom: 1px solid #e5e9ec;
      }
      .followsldr {
        position: relative;
        margin: 0;
      }

      .followsldrin {
        overflow: hidden;
        margin-bottom: 20px;
      }

      .followsldr ul {
        display: flex;
        padding: 0 0 5px 0;
        justify-content: start;
      }

      .followsldr ul li {
        height: 100%;
        min-height: 1px;
        text-align: center;
        flex-shrink: 0;
        background: #f3f3f3;
        border: 1px solid #e5e5e5;
        padding: 6px;
        min-height: 100px;
        min-height: 150px;
        line-height: 1.5;
      }

      .followsldr ul li a {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      .followsldr ul h4 {
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        padding: 5px 0;
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

      .followsldr ul li a img {
        width: 100%;
      }

      .followsldr-arrow {
        position: absolute;
        bottom: 11px;
        width: 115px;
        height: 20px;
        left: 0;
        right: 0;
        margin: 6px auto;
      }

      .followsldr-arrow button {
        width: 25px;
        background: transparent;
        position: absolute;
        left: -35px;
        top: 0;
        bottom: 4px;
        border: 0;
      }

      .followsldr-arrow button:last-child {
        left: auto;
        right: -35px;
      }

      .followsldr-arrow button.left:before,
      .followsldr-arrow button.right:before {
        content: "";
        display: block;
        margin: 30px auto;
        width: 8px;
        height: 8px;
        border-top: 2px solid #435775;
        border-left: 2px solid #435775;
        transform: rotate(315deg);
      }

      .followsldr-arrow button.right:before {
        transform: rotate(136deg);
      }
      .followsquad {
        position: relative;
        padding-bottom: 30px;
      }
  
      .followsquad h3 {
        font-size: 24px;
        line-height: 18px;
        color: #001d42;
        text-transform: uppercase;
        margin: 30px 0 2px 0;
        position: relative;
        border-bottom: 1px solid #ccd2d9;
        padding-bottom: 10px;
        z-index: 5;
      }
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
        color: #333;
        font-size: 14px;
        line-height: 20px;
        margin: 5px 5px 10px 5px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-weight: normal;
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
				overflow: hidden
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
				font-weight: bold
			}

			.biggallery {
				position: relative
			}

			.photogallery .biggallery h3.title {
				font-size: 18px;
        font-weight: bold;
        color: #333;
        line-height: 22px;
        font-family: "Mukta",sans-serif;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        max-height: 44px;
        padding-top: 2px;
			}

			.photogallery img {
				width: 100%
			}
      .double-title.page-title {align-items: flex-end; margin-bottom: 10px;}			
			.double-title.page-title .small-title {font-size: 36px; line-height: 44px; font-weight: bold;}
			.small-title {font-size: 24px; font-weight: normal; text-transform: uppercase; color: #001d42; padding: 0 0 10px; line-height: 18px;}
			.big-title, .tags-big-title { font-size: 40px; color: rgba(0, 29, 66, 0.1); margin: -3px 0 0 -8px; display: none;}
			.double-title.page-title .big-title { font-size: 40px; margin: 0;}
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
      .double-title {
        display: block;
        border-bottom: 0;
        margin-bottom: 0;
    }
      .quick-list li {
        width: 50%;
        flex-shrink: 0;
      }
      .small-title {
        font-size: 24px;
        line-height: 18px;
        color: #001d42;
        text-transform: uppercase;
        font-weight: bold;
        border-bottom: 1px solid #ccd2d9;
        padding-bottom: 5px;
        margin-bottom: 15px;
        display: block;
        margin-top: 60px;
      }
      .quick-list-div {
          margin: 10px 0;
      }
      .quick-list {
        display: flex;
        flex-wrap: wrap;
      }
    `}</style>
    </>
  );
};
export default Homepage;
