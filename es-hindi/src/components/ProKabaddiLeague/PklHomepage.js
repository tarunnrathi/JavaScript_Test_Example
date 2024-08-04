import React, { useState } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import QuickLinks from "./Home/QuickLinks";
import TopHeadlines from "./Home/TopHeadlines";
import { teamTranslationArr } from "includes/proKabaddi.helper";
import { imageLoader } from "includes/article.util";
import SvgIcons from "./SvgIcons";
import TopStorySlider from "./TopStorySlider";
import SITE_CONfIG from "config/site.config";
import LazyLoadImage from "components/Common/CustomImage";

const PklHomepage = (props) => {
  const { pageAds } = props;
  const { top_headlines, photoGallery } = props.data;
  const pointTableData =
    props?.data?.pointTableData?.standings?.groups[0]?.teams;
  const teamsSlider = pointTableData.team;
  const { matches } = props?.data?.matches?.calendar;
  const widgetMatches = matches.filter(
    (data) => data.matchnumber == "Match 4" || data.matchnumber == "Match 5"
  );
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(true);
  };
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
              <li>Pro Kabaddi News 2021</li>
            </ul>
            <SvgIcons />
          </div>
          <h1 className="heading">टॉप प्रो कबड्डी न्यूज़ 2021-22</h1>
        </div>
      </div>
      <section className="main-block-container content-wrap top-section">
        {/*Left section*/}
        <div className="left-section">
          {/*Main Stories Section*/}
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

          {/*Main Stories Section*/}
        </div>
        {/*Left section*/}
        {/*Right section*/}

        <div className="right-section">
          <div className="small-ad-block placeholderRHS">
            <SiteAd
              adUnit={pageAds?.ATF_300_id}
              sizes={[
                [300, 250],
                [300, 600],
                [336, 280],
                [250, 250],
              ]}
              width={300}
              height={250}
              removeAdSpan={true}
              lazyload={true}
            />
          </div>
          <TopHeadlines headlines={top_headlines} />
        </div>
      </section>
      <div className="view-all-div content-wrap">
        <a href="/pro-kabaddi-league/pkl-news/" title="View All">
          पूरा देखें
        </a>
      </div>
      <section className="content-wrap half-block-content">
        {/*Schedule Block*/}
        <div className="half-section">
          <div className="schedule-block">
            <h3 className="double-title">
              <span className="small-title">शेड्यूल</span>
              <span className="big-title">शेड्यूल</span>
            </h3>
            <ul className="schedule-list">
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
                  <li key={`match${mindex}`}>
                    <div className="match-details-txt">
                      <span className="match-name">{mItem.matchnumber}</span>|
                      <span className="match-date">
                        {new Date(mItem.matchdate_local).toLocaleString(
                          "en-us",
                          { weekday: "long" }
                        )}
                        ,{" "}
                        {new Date(mItem.matchdate_local).toLocaleString(
                          "en-us",
                          { day: "numeric" }
                        )}{" "}
                        {new Date(mItem.matchdate_local).toLocaleString(
                          "en-us",
                          { month: "long" }
                        )}
                      </span>
                      |
                      <span className="match-time">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                        </svg>
                        {mItem.matchtime_local} (IST)
                      </span>
                    </div>
                    <div className="match-team-details">
                      <div className="team-name text-right">
                        <a
                          href={`/pro-kabaddi-league/${teamAslug}-${mItem.teama_id}/`}
                          title={mItem.teama}
                        >
                          {teamTranslationArr[teamAslug]}
                        </a>
                      </div>
                      <div className="team-logo">
                        <a
                          href={`/pro-kabaddi-league/${teamAslug}-${mItem.teama_id}/`}
                          title={mItem.teama}
                        >
                          <img
                            src={`${SITE_CONfIG.imageBasePKL}/${teamAslug}.png`}
                            alt={mItem.teama}
                            title={mItem.teama}
                          />
                        </a>
                      </div>
                      <div className="vs-logo">
                        <img
                          src={`${SITE_CONfIG.imageBasePKL}/vs-img.png`}
                          title="vs"
                          alt="vs"
                        />
                      </div>
                      <div className="team-logo">
                        <a
                          href={`/pro-kabaddi-league/${teamBslug}-${mItem.teamb_id}/`}
                          title={mItem.teamb}
                        >
                          <img
                            src={`${SITE_CONfIG.imageBasePKL}/${teamBslug}.png`}
                            alt={mItem.teamb}
                            title={mItem.teamb}
                          />
                        </a>
                      </div>
                      <div className="team-name">
                        <a
                          href={`/pro-kabaddi-league/${teamBslug}-${mItem.teamb_id}/`}
                          title={mItem.teamb}
                        >
                          {teamTranslationArr[teamBslug]}
                        </a>
                      </div>
                    </div>
                    <div className="match-details-txt">
                      <span className="match-venue">{mItem.venue}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="view-all-div content-wrap">
              <a href="/pro-kabaddi-league/pkl-schedule/" title="">
                पूरा देखें शेड्यूल
              </a>
            </div>
          </div>
        </div>
        {/*Schedule Block*/}
        {/*Standing Block*/}
        <div className="half-section">
          <div className="standing-block">
            <div className="standing-title">
              <h3 className="double-title">
                <span className="small-title">पॉइंट टेबल</span>
                <span className="big-title">पॉइंट टेबल</span>
              </h3>
              {/*<div class="tag-block">
							<span class="tag-txt">ZONE A</span>
						</div>*/}
            </div>
            <div className="general-table-div">
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
                  {pointTableData.team?.slice(0, 8)?.map((item, index) => {
                    const teamSlug = item.team_name
                      .replace(/ /g, "-")
                      .replace(/\./g, "")
                      .toLowerCase();
                    return (
                      <tr key={`table${index}`}>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="view-all-div content-wrap">
              <a href="/pro-kabaddi-league/pkl-point-table/" title="">
                पूरा देखें पॉइंट टेबल
              </a>
            </div>
          </div>
        </div>
        {/*Standing Block*/}
      </section>
      <div className="content-wrap">
        <div className="ad-block placeholder">
          <SiteAd
            slotId="Desktop_Static_Header_Ad_728x90"
            adUnit={pageAds?.BTF_728_id}
            sizes={[[728, 90]]}
            width={728}
            height={90}
            removeAdSpan={true}
            lazyload={false}
          />
        </div>
      </div>
      <section className="full-length teams-section">
        <div className="content-wrap">
          <h3 className="double-title big-double">
            <span className="small-title">अपनी फेवरेट टीम को फॉलो करें</span>
            <span className="big-title">अपनी फेवरेट टीम को फॉलो करें</span>
          </h3>
          <div className="teams-grid">
            <ul className="teams-list">
              {teamsSlider.map((teamItem, teamIndex) => {
                const hindiName = teamItem.team_name
                  .replace(/ /g, "-")
                  .replace(/\./g, "")
                  .toLowerCase();
                return (
                  <li key={`team${teamIndex}`}>
                    <a
                      href={`/pro-kabaddi-league/${teamItem.team_name
                        .replace(/ /g, "-")
                        .replace(/\./g, "")
                        .toLowerCase()}-${teamItem.team_id}/`}
                      title={teamItem.team_name}
                      tabIndex={0}
                    >
                      <LazyLoadImage
                        src={`${SITE_CONfIG.imageBasePKL}/${hindiName}.png`}
                        alt={teamItem.team_name}
                        title={teamItem.team_name}
                        width={140}
                        height={100}
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
                      <h4 className="team-name-txt">
                        {teamTranslationArr[hindiName]}
                      </h4>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <section className="media-section">
        <div className="content-wrap">
          <div className="main-block-container">
            <div className="left-section">
              <h3 className="double-title">
                <span className="small-title">फोटो/वीडियो गैलरी</span>
                <span className="big-title">फोटो/वीडियो गैलरी</span>
              </h3>

              <div className="media-list-wrap">
                <ul className="media-list">
                  {photoGallery.slice(0, 4).map((photoItem, photoIndex) => (
                    <li key={`photo${photoIndex}`}>
                      <div className="media-wrap">
                        <a
                          href={photoItem?.weburl_r}
                          title={photoItem?.display_headline}
                        >
                          <LazyLoadImage
                            height={143}
                            width={214}
                            src={imageLoader(photoItem?.images?.url)}
                            title={photoItem?.display_headline}
                            alt={photoItem?.display_headline}
                          />
                        </a>
                        <div className="media-icon  photo-img">
                          <svg
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                          >
                            <path fill="none" d="M0 0h24v24H0V0z" />
                            <path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="media-title">
                        <a href={photoItem?.weburl_r} title={photoItem?.title}>
                          {photoItem?.display_headline}
                        </a>
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
              {/*Media Gallery List*/}
              <div className="view-all-div content-wrap">
                <a href="/pro-kabaddi-league/pkl-gallery/" title="View All">
                  पूरा देखें
                </a>
              </div>
            </div>
            <div className="right-section">
              <div className="small-ad-block placeholderRHS">
                <SiteAd
                  adUnit={pageAds?.BTF_300_id}
                  sizes={[
                    [300, 250],
                    [300, 600],
                    [336, 280],
                    [250, 250],
                  ]}
                  width={300}
                  height={250}
                  removeAdSpan={true}
                  lazyload={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <QuickLinks />
      <section className="content-wrap">
        <div className="read_less_containr read_full_containr">
          <p className="pageContent">
            प्रो-कबड्डी (Pro Kabaddi) प्रोफेशनल कबड्डी लीग है. इसकी शुरुआत 2014
            में हुई. 2006 में एशियन गेम्स की सफलता और आईपीएल (IPL) की तर्ज पर
            इसकी शुरुआत की गई. लीग की शुरुआत के बाद से हर साल इसकी व्यूअरशिप नए
            रिकॉर्ड (PKL New record) बना रही है. इसी को देखते हुए टीमों की
            संख्या में भी इजाफा किया गया है. प्रो-कबड्डी लीग (Pro-Kabaddi League
            season 1) के पहले सीजन में जहां 8 टीमों ( Pro-Kabaddi 8 Teams) उतरी
            थीं. अब इनकी संख्या बढ़कर 12 हो गई है. इस लीग (Pro Kabaddi League)
            में भारत के खिलाफ दुनिया के सभी बड़े देश के खिलाड़ी उतरते हैं.
          </p>
          {readMore && (
            <>
              <h4>Pro-Kabaddi Teams</h4>
              <p>
                प्रो कबड्डी लीग (Pro-Kabaddi League Teams) की 12 टीमें ये हैं:
                जयपुर पिंक पैंथर्स (Jaipur Pink Panther), यू मुंबा (U Mumba),
                पटना पायरेट्स (Patna Pirates), बेंगलुरू बुल्स (Bengaluru Bulls),
                बंगाल वारियर्स (Bengal Warriors), दबंग दिल्ली (Dabang Delhi KC),
                गुजरात फॉर्च्यून जाएंट्स (Gujarat Fortune Giants), हरियाणा
                स्टीलर्स (Haryana Steelers), पुणेरी पल्टन (Puneri Paltan), तमिल
                थलाइवाज (Tamil Thalaivas), तेलुगू टाइटंस (Telugu Titans) और यूपी
                योद्धा (UP Yoddha).
              </p>
              <h4>Pro-Kabaddi Player salary</h4>
              <p>
                अब तक 5 टीमें प्रो-कबड्डी लीग (Pro-Kabaddi League) का खिताब जीत
                चुकी हैं. पटना पायरेट्स ने सबसे अधिक 3 बार टाइटल पर कब्जा किया
                है. पहले सीजन (PKL Season 1) में जहां सबसे महंगे खिलाड़ी को 12.60
                लाख रुपए मिले थे. मौजूदा सीजन के लिए सबसे महंगे खिलाड़ी प्रदीप
                नरवाल को 1.65 करोड़ रुपए मिले. यानी अब कबड्डी के खिलाड़ियों की
                सैलरी (Pro-Kabaddi player salary) में भी बड़ा उछाल आया है.
                चैंपियन टीम को प्राइज मनी के तौर पर 3 करोड़ जबकि रनरअप को 1.8
                करोड़ रुपए मिलते हैं. बॉलीवुड स्टार अभिषेक बच्चन (Abhishek
                Bachchan ) के अलावा कई बड़े बिजनेस ग्रुप ने भी लीग की टीमें खरीदी
                हैं.
              </p>
              <p>
                कोरोना के कारण पिछला सीजन (PKL Season) नहीं हो सका था. लेकिन एक
                बार फिर लीग वापसी करने को तैयार है. अब तक 7 सीजन ( PKL Season 7)
                के मुकाबले हो चुके हैं. यू मुंबा (Pro-Kabaddi U Mumba) और पटना
                पायरेट्स (Pro-Kabaddi Patna Pirates) लीग के इतिहास में सबसे अधिक
                मुकाबले जीतने वाली टीम हैं. प्रदीप नरवाल ( Pradeep Narwal )और
                राहुल चौधरी (Rahul Chaudhari) सबसे सफल खिलाड़ी हैं. दोनों ने अब
                तक तक 1000 से अधिक अंक बटोरे हैं.
              </p>
            </>
          )}
        </div>
        {!readMore && (
          <div className="buttonGrp rd_full">
            <button type="button" onClick={() => handleReadMore()}>
              और पढ़ें
            </button>
            <div className="arrows" />
          </div>
        )}
      </section>

      <style jsx global>
        {`
          .pro-main-wrapper { padding: 5px 20px 0 20px;}
          body h1.heading {font-size: 28px; margin: 12px 0 6px 0; line-height: 22px;}
          h1.heading {font-weight: 700; color: #e1261d; font-size: 25px; margin: 20px 0 0 0; font-family: 'Mukta',sans-serif;}
          .content-wrap { max-width: 1240px; margin: 0 auto;}
          .pro-breadcrumb {display: flex; justify-content: space-between; border-bottom: 1px dotted #969696; padding: 0 0 5px; align-items: center;}
          .breadcrumb-list { display: flex; align-items: center;}
          .breadcrumb-list li {font-size: 14px; color: #001d42;font-weight: 700; text-transform: uppercase; margin: 0 5px 0 0;}
          .breadcrumb-list li a {color: #969696;font-weight: 600;}
          .social-sharing {display: flex; align-items: center;}
          .social-share-link {width: 30px;  height: 30px; display: flex; align-items: center; border: 1px solid #7f7f7f; border-radius: 50%; margin: 0 0 0 10px;}
          .fb-link svg { margin: -10px 0 0;}
          @media (max-width:768px){	
            .bredcrum {padding-bottom: 4px; text-transform: uppercase; display: flex; justify-content: space-between; margin-top: 10px;border-bottom: 1px dotted #939393; margin-bottom: 10px; height: 25px;}
            .bredcrum .bredcrum-txt { font-size: 14px; line-height: 22px; display: flex;}
            .bredcrum .bredcrum-txt a {color: #969696;flex-shrink: 0;}
            .bredcrum .bredcrum-txt .pagetitle { color: #001d42; font-weight: bold;}
          }
          .left-section {width: calc(100% - 330px);}
				.main-block-container {display: flex; padding-top: 10px;}
        .img-wrapper, .main-stories-wrap {position: relative;min-height: 610px;}
        .img-wrapper a {display: block; position: relative;}
        .img-wrapper a:before { content: ""; background: linear-gradient(transparent, transparent, #000, #000); position: absolute; top: 0; right: 0; bottom: 0px;left: 0;}
        .img-wrapper img { width: 100%;}

        
        .right-section {width: 300px; margin: 0 0 0 30px;}
				.placeholderRHS {width: 100%;	height: 250px;	background-color: #ccc;}	
        .widget-top-stories {margin: 30px 0;}
        .widget-title {font-size: 24px;font-weight: bold;text-transform: uppercase;color: #001d42;border-bottom: 1px solid #ccd2d9;padding: 0 0 10px;line-height: 18px;}
        .widget-top-stories .top-story-div {margin: 0;}
        .top-story-div {position: relative;margin-top: -255px;}
        .top-story-list li {margin: 18px 0;}
        .top-story-list li a {font-size: 16px;font-weight: bold;color: #333;position: relative;display: flex;line-height: 24px;}
        .arrow-svg {margin: 0 5px 0 -3px;}
        .view-all-div {padding: 10px;text-align: center;position: relative;	z-index: 1;	border-top: 1px solid #ccd2d9;}
			.view-all-div a {color: #ff2759;text-transform: uppercase;font-size: 14px;font-weight: bold;}
      .half-block-content {display: flex; margin: 37px auto 0;}
			.half-section {width: 49%;margin: 0 30px 0 0;}
      .half-section:nth-child(2) {
        margin: 0;
    }
			.double-title.page-title {align-items: flex-end; margin-bottom: 10px;}
			.double-title {font-weight: 500; display: flex; align-items: flex-start;text-transform: uppercase; border-bottom: 1px solid #ccd2d9; position: relative;}
			.double-title.page-title .small-title {font-size: 36px; line-height: 44px; font-weight: bold;}
			.small-title {font-size: 24px; font-weight: normal; text-transform: uppercase; color: #001d42; padding: 0 0 10px; line-height: 18px;}
			.big-title, .tags-big-title { font-size: 40px; color: rgba(0, 29, 66, 0.1); margin: -3px 0 0 -8px; display: none;}
			.double-title.page-title .big-title { font-size: 40px; margin: 0;}
      .schedule-list li:hover {background: #f3f3f3;}
      .schedule-list li {background: #f3f3f3;
padding: 15px 20px;
border-top: 1px solid #ccd2d9;
margin: 0 0 10px;}
      .schedule-list li:last-child {border-bottom: none;}
      .schedule-list li {background: #f3f3f3;padding: 15px 20px;border-top: 1px solid #ccd2d9;margin: 0 0 10px;}
      // .schedule-list li .match-details-txt {border-bottom: 1px dotted #ccd2d9;padding: 5px 0;}
      .match-details-txt {font-size: 11px;
font-weight: 400;
color: #000;
text-align: center;}
.match-team-details {
display: flex;
align-items: center;
justify-content: space-around;
margin: 5px 0;
min-height: 98px;
}
.match-details-txt span {
display: inline-block;
margin: 0 5px;
font-size: 14px;
}
.match-time svg {
vertical-align: top;
}
.match-team-details {
display: flex;
align-items: center;
justify-content: space-around;
margin: 5px 0;
min-height: 98px;
}
.team-name a {
font-size: 18px;
font-weight: bold;
color: #001d42;
text-transform: uppercase;
display: block;
margin-bottom: 10px;
}
.team-logo {
text-align: center;
}
.team-logo img {
width: 50%;
}

      .schedule-list li .match-details-txt .match-name, .schedule-list li .won-team .team-name a {color: #ff2759;}
      .standing-title {display: flex;justify-content: space-between;}
					.standing-block {clear: both;}
					.general-tbl {width: 100%;border-collapse: collapse;border-spacing: 0;}
					.general-tbl th {font-size: 14px;font-weight: bold;color: #fff;background: #ff2759;text-transform: uppercase;padding: 5px 10px;}
					.general-tbl td {font-size: 15px;font-weight: 400;color: #001d42;text-align: center;padding: 9px 10px;vertical-align: middle;border-bottom: 1px solid #ccd2d9;}
					.general-tbl td:nth-child(1) h4 {font-size: 15px; font-weight: normal;}
					.general-tbl td:nth-child(2) {text-align: left;font-weight: bold;}
					.general-tbl td:nth-child(8) {font-size: 18px; font-weight: bold;}
					.general-tbl td:nth-child(2), .general-tbl td:nth-child(8)  {background: #f3f3f3;}
          .teams-section {
            background: #e5e8ec;
            padding: 30px 0;
          }
          .teams-list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
          }
          .teams-list li {
        min-width: 15%;
        padding: 25px 10px;
        text-align: center;
        position: relative;
        cursor: pointer;
    }
    .teams-list li:hover {
      box-shadow: 0 2px 10px #ccc;
      background: rgba(243, 244, 246, 0.6);
  }
    
    
    .teams-list li:before {
        width: 1px;
        height: 120px;
        background: linear-gradient(transparent, #555, transparent);
        top: 50%;
        margin-top: -60px;
        right: 0;
    }
    
    .teams-list li:after {
        width: 140px;
        height: 1px;
        background: linear-gradient( 45deg, transparent, #999, transparent);
        bottom: 0;
        margin-left: -70px;
    }
    .teams-list li:before, .teams-list li:after {
        content: "";
        position: absolute;
    }
    .team-name-txt, .team-name-txt a {
        font-weight: 700;
        font-size: 16px;
        color: #000;
        text-transform: uppercase;
        text-align: center;
        margin: 10px 0 0;
    }
    .teams-list li:nth-child(6n):before {
        display: none;
    }
    .media-section .main-block-container {display: flex; padding-top: 10px; margin: 20px 0 0;}
							.media-list {padding: 0 0 20px 0;display: flex; flex-wrap: wrap;}
							.media-list li {margin-bottom: 20px; width: 23.5%; margin-right: 2%;}
							.media-list li:nth-child(4n) {margin-right: 0;}
							.media-list li .media-wrap {position: relative; overflow: hidden; height: 140px;margin-bottom: 10px;}
							.media-list li .media-wrap img {transform: scale(1); transition: all .5s ease-in-out;}
							.media-list li:hover .media-wrap img { transform: scale(1.2);  transition: all .5s ease-in-out;}
							.media-wrap img {width: 100%;height: 100%;}
							.media-title, .media-title a {font-size: 16px;color: #333;line-height: 24px; margin: 5px 0 0;font-weight: bold;}
							.date-class {font-size: 12px; color: #444;line-height: 14px;}
							.media-icon {position: absolute; bottom: 10px; left: 10px;}
              
      .read_less_containr {font-size: 16px;line-height: 24px;color: #444;display: block;position: relative;}
      .read_less_containr p {margin-bottom: 20px;}
      .read_less_containr h4 {font-weight: bold;font-size: 20px;margin-bottom: 5px;}
      .read_less_containr p {margin-bottom: 20px;}.buttonGrp {position: relative;width: 136px;margin: 10px auto 10px;}.buttonGrp button {}.buttonGrp button {background-color: #EB3D3C;text-transform: capitalize;border: none;width: 100%;padding: 10px 15px 10px 0px;box-sizing: border-box;border-radius: 20px;cursor: pointer;color: #fff;font-size: 14px;line-height: 19px;font-family: "Noto Sans", devanagari;font-weight: 400;outline: none;}.buttonGrp .arrows {width: 13px;transform: rotate(89deg);}.buttonGrp .arrows {position: absolute;top: 20px;right: 12px;width: 12px;height: 1px;background-color: #fff;}.buttonGrp .arrows:before, .buttonGrp .arrows:after {content: "";position: absolute;width: 7px;height: 1px;top: -2px;right: -1px;background-color: #fff;transform: rotate(45deg);}.buttonGrp .arrows:after {top: 2px;transform: rotate(-45deg);}
            `}
      </style>
    </>
  );
};

export default PklHomepage;
