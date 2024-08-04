import TopStoryLeft from "components/WorldCup/Home/TopStoryLeft";
import TopStoryRight from "components/WorldCup/Home/TopStoryRight";
import TopStoryLeftDesktop from "components/WorldCup/Home/TopStoryLeftDesktop";
import Photogallery from "components/WorldCup/Home/PhotoGallery";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Squad from "./Home/Squad";
import PointTable from "./Home/PointTable";
import PlayerOfTheDay from "./Home/PlayerOfTheDay";
import MostRunsAndWickets from "./Home/MostRunsAndWickets";
import WCStats from "./Home/WCStats";
import LatestNews from "./Home/LatestNews";
import FeatureSection from "./Home/FeatureSection";
import MoreContent from "./Home/MoreContent";
import CricketTweet from "widgets/Common/Responsive/CricketTweet";
import FeatureSectionMobile from "./Home/FeatureSectionMobile";
import InterestingFactsMobile from "./Home/InterestingFactsMobile";
import InterestingFacts from "./Home/InterestingFacts";
import WCStatsMobile from "./Home/WCStatsMobile";
import dynamic from "next/dynamic";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false },
);

const tabList = [
  { name: "किस्से भारत-पाक के", slug: 'kisse-india-pak-ke' },
  { name: "गर्व के पल", slug: 'garv-ke-pal' },
  { name: "टर्न अराउंड", slug: 'turn-around' },
  { name: "10 ब्लंडर्स", slug: '10-blunders' },
  { name: "अर्श से फर्श पर ", slug: 'arsh-se-farsh-par' },
  { name: "10 कारनामे", slug: '10-kaarname' },
  { name: "लोकल क्रिकेट अड्डा", slug: 'local18-world-cup' },
];

const CricketHome = (props) => {
  const pointTableData = props?.data?.pointTableData || [];
  const mostWicketdata =
    props?.data?.mostWicketdata?.leaderboard?.slice(0, 5) || [];
  const mostRunData = props?.data?.mostRunData?.leaderboard?.slice(0, 5) || [];
  const statsData = props?.data?.statsData || [];
  const latestStories = props?.data?.latestStories || [];
  const WcPlayerOfTheDay = props?.data?.WcPlayerOfTheDay?.data?.players || [];
  const photoGalleryWc = props?.data?.photoGalleryWc || [];
  const videoStatus = props?.data?.worldCupVideo?.data?.is_status || false;
  const videoIframe = props?.data?.worldCupVideo?.data?.videoIframe || '';
  const topNews = props?.data?.topNews || {};
  const WcFeatureData = props?.data?.WcFeatureData || [];
  const interestingFacts = props?.data?.interestingFacts || [];
  const WCSwitcher = props?.data?.WCSwitcher?.data || {};
  let flags = {};
  if(Object.keys(WCSwitcher).length > 0) {
    flags.features_flag = WCSwitcher.features_flag;
    flags.play_of_day_flag = WCSwitcher.play_of_day_flag;
    flags.wickets_flag = WCSwitcher.wickets_flag;
    flags.run_flag = WCSwitcher.run_flag;
    flags.photo_flag = WCSwitcher.photo_flag;
    flags.point_table_gp1 = WCSwitcher.point_table_gp1;
    flags.point_table_gp2 = WCSwitcher.point_table_gp2;
    flags.t20_stats_flag = WCSwitcher.t20_flag;
  }
  let { features_flag = "0", play_of_day_flag = "0", wickets_flag = "0", run_flag = "0", photo_flag = "1", point_table_gp1 = "0", point_table_gp2 = "0", t20_stats_flag = "0"} = flags; 
  return (
    <>
      <div className="outer">
        <div className="CN-pageWrapper">
          {props.isMobile && (
            <div className="bet__ad">
              <SiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={props.pageAds?.scoreCard_Ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              />
            </div>
          )}
          <div
            id="topScoreWidget_data"
            style={{
              minHeight: 115,
              background: "rgb(0 0 0 / 13%)",
              marginBottom: 15,
            }}
          >
            <DynamicCrTopScoreWidgetWithNoSSR seriesID={5612} />
          </div>
          {!props?.isMobile && (
            <div
              style={{
                minHeight: "60px",
                background: "#00000021",
                marginTop: "10px",
              }}
            >
              <SiteAd
                slotId="Desktop_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[1244, 60]]}
                width={1244}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              />
            </div>
          )}
          {props?.isMobile && (
            <div className="add">
              <div className="addinner-box">
                <SiteAd
                  width={336}
                  height={280}
                  adUnit={props?.pageAds?.ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280],
                    [250, 250],
                  ]}
                  lazyload={true}
                ></SiteAd>
              </div>
            </div>
          )}
          <div className="CN-section">
            <div className="CN-sec-l">
              
            <BreadcrumbCommon breadCrumbArray={[
                  { value: "NEWS18 हिंदी", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `विश्व कप 2023`},
              ]}/>
              <div className="cn-heading-1">
                <div className="headinner">क्रिकेट विश्व कप 2023</div>
                <div className="icon" />
              </div>
              {!props?.isMobile && (
                <TopStoryLeftDesktop
                  videoStatus={videoStatus}
                  topNews={topNews}
                  videoIframe={videoIframe}
                />
              )}

              <div className="top_story">
                {props?.isMobile && (
                  <TopStoryLeft topNewsLeft={topNews.left?.[0]} />
                )}
                {props?.isMobile && (
                  <TopStoryRight topNewsRight={topNews.right} />
                )}
                {props?.isMobile && (
                  <div className="load_more">
                    <a href="/world-cup/news/">
                      <span>और भी पढ़ें</span>
                    </a>
                  </div>
                )}
              </div>

              {props?.isMobile && videoStatus && (
                <div className="world_cup_video">
                  <iframe
                    width="375"
                    height="220"
                    src={videoIframe}
                    allowFullScreen="allowFullScreen"
                  ></iframe>
                </div>
              )}

              <Squad />

              <div className="points_table_section vspacer20">
                {props.isMobile && props?.pageAds?.ATF_300 && (
                  <div className="add">
                    <div className="addinner-box">
                      <SiteAd
                        width={336}
                        height={280}
                        adUnit={props?.data?.pageAds?.ATF_300}
                        sizes={[
                          [300, 250],
                          [336, 280],
                        ]}
                        lazyload={true}
                      ></SiteAd>
                    </div>
                  </div>
                )}

                {point_table_gp1 === "1" && point_table_gp2 === "1" && (
                  <PointTable isAmp={false} PointTableData={pointTableData} />
                )}
                {play_of_day_flag === "1" && (
                  <PlayerOfTheDay WcPlayerOfTheDay={WcPlayerOfTheDay} />
                )}
              </div>

              <div className="mostrun_section vspacer20">
                {run_flag === "1" && wickets_flag === "1" && (
                  <MostRunsAndWickets
                    isAmp={false}
                    mostWicketdata={mostWicketdata}
                    mostRunData={mostRunData}
                  />
                )}
                {photo_flag === "1" && (
                  <Photogallery photoGalleryWc={photoGalleryWc} />
                )}
              </div>

              {props.isMobile
                ? features_flag === "1" &&
                  WcFeatureData.length > 0 && (
                    <FeatureSectionMobile WcFeatureData={WcFeatureData} />
                  )
                : features_flag === "1" &&
                  WcFeatureData.length > 0 && (
                    <FeatureSection WcFeatureData={WcFeatureData} />
                  )}

              {props.isMobile
                ? interestingFacts.length > 0 && (
                    <InterestingFactsMobile
                      tabList={tabList}
                      interestingFacts={interestingFacts}
                    />
                  )
                : interestingFacts.length > 0 && (
                    <InterestingFacts
                      tabList={tabList}
                      interestingFacts={interestingFacts}
                    />
                  )}

              {props.isMobile
                ? t20_stats_flag === "1" && (
                    <WCStatsMobile isAmp={false} statsData={statsData} />
                  )
                : t20_stats_flag === "1" && <WCStats statsData={statsData} />}
              {props.isMobile && (
                <div className="clearfix add">
                  <div className="addinner-box">
                    <SiteAd
                      width={336}
                      height={280}
                      adUnit={props?.data?.pageAds?.BTF_300}
                      sizes={[
                        [300, 250],
                        [336, 280],
                        [250, 250],
                      ]}
                      lazyload={true}
                    ></SiteAd>
                  </div>
                </div>
              )}

              <LatestNews latestStories={latestStories} />

              <MoreContent />
            </div>
            {!props?.isMobile && (
              <div className="CN-sec-r add">
                <>
                  <SiteAd
                    adUnit={props.data?.pageAds?.ATF_300_id}
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
                </>
                <div className="cn-add-section-2" style={{ minHeight: 600 }}>
                  <div className="vsp20"></div>
                  <CricketTweet />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <SiteAd
                    adUnit={props.data?.pageAds?.BTF_300_id}
                    sizes={[
                      [300, 250],
                      [300, 600],
                      [336, 280],
                    ]}
                    width={300}
                    height={250}
                    removeAdSpan={true}
                    lazyload={true}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .top_story_left a {
          color: #001d42 !important;
        }
        .outer {
          max-width: 1244px;
          margin: 0 auto;
          padding: 0;
          clear: both;
          overflow: hidden;
        }
        body .CN-pageWrapper > div {
          margin-bottom: 0px !important;
        }
        body .CN-section,
        body .CN-section * {
          font-family: "Mukta", sans-serif !important;
        }
        .CN-section {
          display: flex;
          justify-content: space-between;
        }
        .CN-section .CN-sec-l {
          width: 924px;
          min-width: 924px;
        }
        .CN-breadcum {
          font-size: 14px;
          padding: 4px 0;
          background: none;
          border-bottom: 1px dotted #939393;
          margin-bottom: 10px;
          line-height: 13px;
          color: #292929;
          text-transform: uppercase;
        }
        .CN-breadcum h1,
        .CN-breadcum h2 {
          display: inline-block;
        }
        .CN-breadcum h1 {
          font-size: 14px;
          font-weight: 400;
          font-family: "Mukta", sans-serif !important;
        }
        .newadd {
          background: #efefef;
          line-height: 0;
          display: table;
          margin: auto;
        }
        .newadd span {
          display: block;
          font-size: 12px;
          color: #8e8e8e;
          text-align: center;
          height: 20px;
          line-height: 20px;
          width: 100%;
        }
        .adbox {
          background: #dbdde3 !important;
          padding: 16px 0;
          position: relative;
        }
        .top_story {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
        .top_story_left {
          width: 515px;
          margin-bottom: 10px;
        }
        .top_story_left a {
          color: #001d42;
        }
        figure {
          line-height: 0;
          position: relative;
        }
        .top_story_left figure img {
          width: 100%;
          display: block;
        }
        .top_story_left figcaption {
          height: 97px;
          background: #f5f5f5 0% 0% no-repeat padding-box;
          padding: 7px 10px 5px 10px;
        }
        .top_title {
          font-size: 22px;
          line-height: 26px;
          font-weight: bold;
        }
        .top_story_left figcaption p {
          font-size: 13px;
          line-height: 20px;
          margin-bottom: 0px;
          font-weight: normal;
          height: 36px;
          overflow: hidden;
        }
        .top_story_right {
          width: calc(100% - 515px);
          padding-left: 20px;
          box-sizing: border-box;
        }
        .top_story_right .cricketwallah_right {
          width: 100%;
          padding-left: 0;
          box-sizing: border-box;
        }
        .cricketwallah_right li:first-child {
          padding-top: 0;
        }
        .cricketwallah_right li {
          border-bottom: 1px #dadada solid;
          padding: 10px 0;
        }
        .cricketwallah_right li a {
          display: flex;
          color: #001d42;
        }
        .cricketwallah_right li a figure {
          flex-shrink: 0;
        }
        .top_story_right .cricketwallah_right li img {
          width: 110px;
          height: 73px;
          display: block;
        }
        .cricketwallah_title {
          font-size: 16px;
          line-height: 24px;
          font-weight: bold;
          padding-left: 10px;
        }
        .load_more {
          width: auto;
          padding: 0 20px;
          text-align: center;
          overflow: hidden;
          height: 20px;
          background: #f5f5f5;
          margin-top: 1px;
        }
        .load_more a {
          color: #ff0000;
        }
        .load_more span {
          background: #ffffff;
          padding: 3px 11px;
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .top_title_m {
          display: none;
        }
        @media (max-width: 768px) {
          * {
            padding: 0;
            margin: 0;
            list-style: none;
            box-sizing: border-box;
            text-decoration: none;
            //line-height: 19px !important;
            border-collapse: collapse;
          }
          body {
            font-family: "Mukta", sans-serif !important;
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 19px;
            font-weight: 400;
          }
          .outer {
            width: 100%;
            display: block;
            overflow: auto !important;
          }
          .CN-section {
            display: block !important;
            width: 100%;
          }
          .cn-heading-1 {
            margin-bottom: 10px;
            border: none;
          }
          .cn-heading-1 div {
            padding: 0 10px;
          }
          .CN-section .CN-sec-l {
            width: 100% !important;
            min-width: auto !important;
          }
          .CN-breadcum {
            font-size: 13px;
            height: 34px;
            background: none;
            border-top: none;
            border-bottom: 1px dashed rgb(147 147 147 / 57%);
            display: flex;
            overflow: scroll;
            padding: 8px 10px 5px 10px;
            margin-bottom: 0;
          }
          .CN-breadcum a {
            padding: 0 4px;
            flex-shrink: 0;
          }
          body .CN-breadcum a span {
            padding: 0 4px 0 0;
          }
          body .CN-breadcum h1,
          body .CN-breadcum h2 {
            font-size: 13px;
            line-height: 19px;
            flex-shrink: 0;
          }
          .top_story {
            display: block;
          }
          .top_story_left {
            width: 100% !important;
            margin: 0 !important;
          }
          .top_title_m {
            display: block !important;
            letter-spacing: 0px;
            color: #001d42;
            font-size: 20px;
            line-height: 24px !important;
            font-weight: bold;
            padding: 10px 10px 5px 10px;
          }
          .top_story_left figcaption {
            display: none;
          }
          .top_story_right {
            width: 100% !important;
            background: #fff;
            padding: 5px 0 0 !important;
          }
          .cricketwallah_right li,
          .cricketwallah_right li:first-child {
            background: #f5f5f5;
            margin-bottom: 5px;
            padding: 10px !important;
            border: 0;
          }
          ul.story_list li a figure {
            flex: 0 0 95px;
            margin-left: 10px;
            height: 63px;
            overflow: hidden;
          }
          .cricketwallah_title {
            font-size: 16px !important;
            line-height: 24px !important;
            color: #000 !important;
            font-weight: 500 !important;
          }
          .load_more {
            width: 100% !important;
            text-align: center;
            background: #f5f5f5;
            display: flex;
            justify-content: center;
            padding: 10px 0 !important;
            height: auto !important;
          }
          .load_more a {
            border: 2px solid #e1261c;
            background: #fff;
            padding: 5px 12px 2px;
            border-radius: 30px;
            color: #e1261c !important;
            font-size: 13px;
            line-height: 19px !important;
            font-weight: 600;
            text-transform: uppercase;
          }
          .load_more a span {
            padding: 0;
          }
          .top_story {
            margin-bottom: 30px;
          }
        }
        .world_cup_squads {
          font-family: "Mukta", sans-serif;
          margin-top: 40px;
          box-sizing: border-box;
          width: 100%;
          border: 4px solid #031f2e;
          background: #437995;
          display: flex;
          align-items: flex-start;
          padding: 5px 0px 0 15px;
        }
        .vspacer20 {
          margin-top: 20px;
        }
        .world_cup_squads_left {
          width: 333px;
        }
        .squads_title {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 10px;
        }
        .squads_title i img {
          display: block;
          width: 75px;
        }
        body .squads_title h3,
        body .page_title,
        body .page_title span,
        body .upcomming-matches-widget .heading {
          font-family: "khand" !important;
        }
        .squads_title h3 {
          text-align: center;
          letter-spacing: 0px;
          text-shadow: 0px 3px 6px #00000029;
          text-transform: uppercase;
          color: #fff;
          font-size: 24px;
          line-height: 28px;
          padding-left: 20px;
          font-family: "khand";
        }
        .squads_title h3 span {
          display: block;
          font-weight: bold;
          color: #ffcc00;
        }
        .squads_img {
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/t20_squads-img.png)
            0 0 no-repeat;
          background-size: 333px;
          width: 333px;
          height: 183px;
        }
        ul.country_list {
          display: flex;
          flex-wrap: wrap;
          width: calc(100% - 333px);
          padding-left: 30px;
          padding-top: 20px;
        }
        ul.country_list li {
          display: flex;
          width: 33.23%;
          color: #ffffff;
          font-size: 15px;
          line-height: 20px;
          margin-bottom: 15px;
        }
        ul.country_list li a {
          color: #fff;
        }
        ul.country_list li i {
          display: inline-block;
          vertical-align: middle;
          width: 30px;
          height: 20px;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #e8e8e8;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/all_flags_new_sml.svg);
          margin-right: 10px;
        }
        ul.country_list li i.england {
          background-position: -2.5px -75px;
        }
        ul.country_list li i.namibia {
          background-position: 0px -150px;
        }
        ul.country_list li i.scotland {
          background-position: 0px -300px;
        }
        ul.country_list li i.west-indies {
          background-position: 0px -375px;
        }
        ul.country_list li i.australia {
          background-position: 0px -25px;
        }
        ul.country_list li i.india {
          background-position: -2.5px -100px;
        }
        ul.country_list li i.netherlands {
          background-position: 0px -175px;
        }
        ul.country_list li i.pakistan {
          background-position: -2.5px -250px;
        }
        ul.country_list li i.south-africa {
          background-position: 0px -325px;
        }
        ul.country_list li i.bangladesh {
          background-position: -2.5px -50px;
        }
        ul.country_list li i.ireland {
          background-position: 0px -125px;
        }
        ul.country_list li i.new-zealand {
          background-position: 0px -200px;
        }
        ul.country_list li i.sri-lanka {
          background-position: -2.5px -350px;
        }
        .flgimgnew {
          width: 30px;
          height: 20px;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #e8e8e8;
          margin-right: 10px;
          vertical-align: middle;
        }
        @media (max-width: 768px) {
          .world_cup_squads {
            margin-bottom: 30px;
            background: linear-gradient(0deg, #254252 0%, #457d9a 100%);
            border: 4px solid #031f2e;
            padding: 5px 10px 20px !important;
            display: block !important;
          }
          .world_cup_squads_left {
            width: 100% !important;
            height: 226px;
            display: flex;
            align-items: flex-end;
            position: relative;
          }
          .world_cup_squads_left .squads_title {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
          }
          .world_cup_squads_left .squads_title i {
            width: 74px;
            flex-shrink: 0;
            margin-right: 10px;
          }
          .world_cup_squads_left .squads_title i img {
            width: 100%;
            display: block;
          }
          .world_cup_squads_left .squads_title h3 {
            font-size: 24px;
            font-family: "khand", sans-serif !important;
            color: #fff;
            font-weight: 600;
            flex-shrink: 0;
            line-height: 32px !important;
          }
          .world_cup_squads_left .squads_title h3 span {
            display: block;
            font-weight: bold;
            color: #ffcc00;
            font-family: "khand", sans-serif !important;
          }
          .world_cup_squads_left .squads_img {
            display: block;
            width: 100%;
            margin: 0 auto;
            height: 191px;
          }
          ul.country_list {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            grid-row-gap: 17px;
            grid-column-gap: 10px;
            padding: 0 !important;
            width: 100% !important;
          }
          ul.country_list li {
            width: 100% !important;
            margin: 0 !important;
          }
          ul.country_list li a {
            display: flex;
            align-items: center;
          }
          ul.country_list li i {
            width: 32px;
            height: 22px;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #e8e8e8;
            background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/all_flags_sml.svg) -2px
              0;
            margin-right: 10px;
          }
          ul.country_list li .teamName {
            color: #ffffff;
            text-transform: capitalize;
            font-size: 15px;
          }
        }
        .points_table_section {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
        }
        .points_table {
          width: 447px;
        }
        .points_table .page_title {
          border-bottom: 1px #d8d8d8 solid;
          margin-bottom: 8px;
        }
        .page_title {
          color: #e1261d;
          line-height: 27px;
          margin-bottom: 5px;
          text-transform: uppercase;
          font-size: 24px;
          font-weight: bold;
          font-family: "khand", sans-serif !important;
        }
        .page_title span {
          color: #202020;
          font-weight: bold;
        }
        .points_table_tab {
          justify-content: left !important;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .points_table_tab li {
          width: 68px;
          border-bottom: 3px #c6c6c6 solid;
          text-align: center;
          margin: 0 10px;
          line-height: 13px;
          padding: 5px 0;
          position: relative;
          cursor: pointer;
        }
        ul.points_table_tab li p {
          color: #696969;
          font-size: 14px;
          font-weight: bold;
          line-height: 13px;
          margin-bottom: 5px;
        }
        .points_table_tab li span {
          color: #696969;
          font-size: 14px;
        }
        .points_table_tab li.active {
          border-color: #e1261c;
        }
        .points_table_tab li.active p,
        .points_table_tab li.active span {
          color: #e1261c;
        }
        .points_table_tab li.active:after {
          content: "";
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-right: 5px solid #e1261c;
          display: block;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          width: 5px;
          transform: rotate(-90deg);
          bottom: -12px;
        }
        .info_table {
          width: 100%;
        }
        .info_table table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        .info_table table tr:first-child {
          border-bottom: 0;
          font-weight: bold;
        }
        .info_table table tr {
          border-bottom: 1px #d8d8d8 solid;
          background: #fff;
          font-weight: normal;
        }
        .info_table table tr:nth-child(odd) {
          background: #f6f6f6;
        }
        .info_table table tr th {
          background: #7b7b7b 0% 0% no-repeat padding-box;
          color: #fff;
          font-size: 14px;
          padding: 10px;
          font-weight: bold;
        }
        .info_table table tr td {
          height: 40px;
          text-align: center;
          color: #202020;
          font-size: 13px;
          vertical-align: middle;
        }
        .table_team_name {
          display: flex;
          align-items: center;
        }
        .table_team_name img {
          height: 26px;
          max-width: none;
          width: auto;
        }
        .table_team_name p {
          color: #001d42;
          padding-left: 10px;
          font-size: 14px;
          font-weight: inherit;
          margin-bottom: 0px;
        }
        .table_team_name p a {
          color: #001d42;
        }
        .group_detail {
          display: none;
        }
        .display_block_class {
          display: table-row-group;
        }
        .load_more {
          width: auto;
          padding: 0 20px;
        }
        .play_of_day {
          background: #f5f5f5 0% 0% no-repeat padding-box;
          border: 1px solid #e5e5e5;
          width: 447px;
          padding: 10px;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/dag-bg.png);
          background-position: top center;
          border-bottom: 10px #d9d9d9 solid;
          padding-bottom: 0;
          box-sizing: border-box;
        }
        .play_of_day .page_title {
          display: inline-block;
          margin-bottom: 10px;
        }
        .of_day_img {
          display: flex;
          justify-content: space-between;
          align-items: self-end;
        }
        .day_img {
          background: #ffffff 0% 0% no-repeat padding-box;
          overflow: hidden;
          box-shadow: 0px 3px 6px #00000029;
          border: 10px solid #fff;
          width: 292px;
          height: 201px;
          outline: 1px solid #707070;
        }
        .play_of_day img {
          display: block;
          max-width: none;
        }
        .day_img img {
          width: 100%;
        }
        .day_intro {
          display: flex;
          align-items: self-end;
          font-size: 13px;
          line-height: 18px;
          color: #292929;
          padding-top: 10px;
          justify-content: space-between;
        }
        .day_intro p {
          padding-bottom: 10px;
          font-family: "Mukta", sans-serif;
          margin-bottom: 0px;
          font-size: 14px;
          line-height: 20px;
        }
        @media (max-width: 768px) {
          .points_table_section {
            width: 100% !important;
            display: block !important;
          }
          .points_table {
            width: 100% !important;
            margin-bottom: 30px;
          }
          .page_title {
            display: block !important;
            padding-left: 10px;
            margin-bottom: 2px;
            line-height: 22px !important;
          }
          .points_table_tab {
            padding: 0 10px;
            margin-bottom: 5px;
            padding-top: 10px;
          }
          .points_table_tab li {
            width: 68px;
            padding: 5px 5px 5px !important;
            margin: 0 !important;
            line-height: 16px !important;
            font-size: 14px !important;
          }
          ul.points_table_tab li p {
            margin: 0;
            line-height: 15px !important;
            font-weight: bold;
            color: #000;
          }
          .points_table_tab li.active {
            border-color: #e1261c;
            background: #f5f5f5;
          }
          .info_table table tr th:first-child {
            width: 42px;
            padding-left: 10px;
          }
          .info_table table tr th {
            background: #001d42 !important;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            padding: 6px 5px;
            text-align: center;
          }
          .info_table table tr th:nth-child(2) {
            text-align: left;
          }
          .play_of_day {
            padding: 10px 20px !important;
            background: #f5f5f5 !important;
            border-top: 1px solid #e5e5e5 !important;
            margin-bottom: 30px;
            position: relative;
            width: 100% !important;
          }
          .play_of_day .page_title {
            padding-left: 0;
          }
          .of_day_img {
            display: block !important;
            width: 100% !important;
          }
          .day_img {
            width: 100% !important;
            height: auto !important;
          }
          .day_intro {
            display: block !important;
          }
          .play_of_day img {
            display: inline-flex !important;
            justify-content: flex-end;
          }
          .day_icon {
            display: flex;
            justify-content: flex-end;
          }
        }
        body .most-ran-table tr th {
          font-weight: bold;
          font-size: 13px;
          background: #001d42 !important;
        }
        body .most-ran-table tr td .playerbox .txt .playername,
        body .most-ran-table tr td a {
          font-weight: bold;
          text-decoration: none;
          font-size: 14px;
        }
        .mostrun_section {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
        }
        .most_run_left {
          width: 447px;
        }
        .most_run {
          margin-bottom: 40px;
        }
        .latest_photo {
          width: 447px;
        }
        .latest_photo_list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .latest_photo_list li:first-child {
          width: 100%;
        }
        .latest_photo_list li {
          width: calc(50% - 3px);
          margin-bottom: 5px;
        }
        .photogallerie_row {
          width: 100%;
          position: relative;
        }
        .photogallerie_row:before {
          background: transparent
            linear-gradient(180deg, #00000000 0%, #000000 100%) 0% 0% no-repeat
            padding-box;
          z-index: 1;
          opacity: 0.9;
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
        }
        .photogallerie_row figure {
          width: 100%;
        }
        .latest_photo_list li:first-child .photos_icon {
          width: 40px;
          height: 40px;
        }
        .photos_icon {
          width: 32px;
          height: 32px;
          position: absolute;
          right: 3px;
          top: 3px;
          z-index: 1;
        }
        .photos_icon img {
          width: 100%;
          display: block;
        }
        .photogallerie_row figure > img {
          width: 100%;
          display: block;
        }
        .latest_photo_list li:first-child .photogallerie_row figcaption {
          padding: 40px 10px 10px 10px;
        }
        .photogallerie_row figcaption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 10px 10px 10px;
          z-index: 1;
        }
        .latest_photo_list li:first-child .photogallerie_title {
          font-size: 18px;
          line-height: 24px;
        }
        .photogallerie_title {
          color: #ffffff;
          font-size: 13px;
          line-height: 20px;
          font-weight: bold;
        }
        @media (max-width: 768px) {
          .mostrun_section {
            display: block !important;
          }
          .most_run_left {
            width: 100% !important;
          }
          .latest_photo {
            width: 100% !important;
          }
        }
        .cricketwallah {
          background: #f5f5f5;
          border: 1px solid #e5e5e5;
          margin-top: 40px;
          display: flex;
          flex-wrap: wrap;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .border_title {
          width: 100%;
          position: relative;
          margin-bottom: 15px;
        }
        .border_title .page_title {
          background: #f5f5f5;
          display: inline-block;
          position: relative;
          z-index: 1;
          padding-right: 7px;
        }
        .border_title:after {
          width: 100%;
          height: 3px;
          background: #e1261d;
          content: "";
          position: absolute;
          left: 0;
          bottom: 11px;
        }
        .features_section {
          width: 100%;
        }
        .features_section .glide__track {
          overflow: hidden;
        }
        .features_section .glide__slides {
          display: flex;
        }
        .features_row {
          display: flex;
        }
        .cricketwallah_left {
          width: 50%;
          display: flex;
          border-right: 1px #d8d8d8 solid;
          box-sizing: border-box;
          padding-right: 20px;
        }
        .cricketwallah_img {
          width: 120px;
          height: 120px;
          box-shadow: 0px 3px 6px #00000029;
          background: #ffffff 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          border-radius: 85px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cricketwallah_img img {
          width: 100px;
          height: 100px;
          border-radius: 100px;
        }
        .cricketwallah_content {
          width: calc(100% - 150px);
          padding-left: 20px;
          font-size: 13px;
          font-weight: normal;
        }
        .cricketwallah_content h3 {
          color: #202020;
          font-weight: bold;
          font-size: 20px;
          line-height: 25px;
          padding-bottom: 10px;
        }
        .cricketwallah_content p {
          font-size: 16px;
          line-height: 24px;
          font-weight: normal;
          margin-bottom: 10px;
        }
        .cricketwallah_more {
          letter-spacing: 0.24px;
          color: #ff0000;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 600;
        }
        .cricketwallah_right {
          width: 50%;
          padding-left: 20px;
          box-sizing: border-box;
        }
        .cricketwallah_right li {
          border-bottom: 1px #dadada solid;
          padding: 10px 0;
        }
        .cricketwallah_right li a {
          display: flex;
          color: #001d42;
        }
        .cricketwallah_right li a figure {
          flex-shrink: 0;
        }
        .cricketwallah_right li img {
          width: 90px;
          height: 60px;
          display: block;
        }
        .cricketwallah_title {
          font-size: 16px;
          line-height: 24px;
          font-weight: bold;
          padding-left: 10px;
        }
        .bullets_row {
          width: 100%;
          position: relative;
        }
        .bullets_row .glide__bullets {
          position: relative;
          background: #f5f5f5;
          z-index: 2;
          width: 110px;
          display: inherit;
          margin: 20px auto 0;
          text-align: center;
        }
        .bullets_row:after {
          content: "";
          position: absolute;
          background: #d1d1d1;
          height: 2px;
          width: 200px;
          margin: auto;
          top: 8px;
          right: 0;
          left: 0;
          z-index: 1;
        }
        .bullets_row button.glide__bullet.glide__bullet--active {
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/features-icon-color.svg);
        }
        .bullets_row button.glide__bullet {
          width: 17px;
          height: 17px;
          margin: 0 5px;
          border: 0;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/features-icon.svg);
          outline: none;
          cursor: pointer;
          position: relative;
          z-index: 1;
          background-color: whitesmoke;
        }

        .wickets_section_s {
          width: 307px;
          height: 130px;
          border-bottom: 1px solid #fff;
        }
        .wickets_section_s,
        .all_fifties,
        .dismissals {
          position: relative;
        }
        .fifties_sec {
          display: flex;
        }
        .all_fifties {
          width: 153px;
          height: 130px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
        }
        .dismissals {
          width: 153px;
          height: 130px;
          border-bottom: 1px solid #fff;
        }
        .wickets_sec .lower_sections {
          display: flex;
        }
        .lower_sections .hundreds {
          width: 153px;
          height: 261px;
          position: relative;
        }
        .lowrr_sections .overs {
          width: 307px;
          height: 130px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
          position: relative;
        }
        .runs_sec .lowrr_sections .hundreds {
          display: flex;
        }
        .lowrr_sections .hundreds {
          position: relative;
        }
        lowrr_sections .hundreds .run_in_overs {
          width: 153px;
          height: 130px;
          border-right: 1px solid #fff;
        }
        .lowrr_sections .hundreds .run_in_boundries {
          width: 153px;
          height: 130px;
        }
        .run_in_boundries {
          position: relative;
          width: 153px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
          height: 130px;
        }
        .upper_sections .hundreds {
          position: relative;
          width: 153px;
          border-bottom: 1px solid #fff;
          height: 261px;
        }
        .stats p span {
          font-size: 12px;
          line-height: 14px;
          text-transform: uppercase;
        }
        @media (max-width: 768px) {
          .latesPhotoWrapper .page_title {
            background: #000000;
            padding: 12px 10px 5px 10px;
            margin-bottom: 0;
            color: #ffcc00;
          }
          .latesPhotoWrapper,
          .world_cup_stats {
            margin-bottom: 30px;
          }
        }
        .latest-news {
          margin-top: 40px;
        }
        .latest_news_list {
          display: flex;
          flex-wrap: wrap;
        }
        .latest_news_list li {
          width: 23%;
          margin-right: 2.5%;
          margin-bottom: 20px;
          background: #f5f5f5;
        }
        ul.latest_news_list li a {
          color: #292929;
        }
        .latest_news_list li figure img {
          width: 100%;
          display: block;
        }
        .latest_news_list li figcaption {
          padding: 10px;
        }
        .latestnewws_title {
          font-size: 16px;
          color: #292929;
          line-height: 24px;
          font-weight: bold;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .latest_news_list li:nth-child(4n + 4) {
          margin-right: 0px;
        }
        .vsp20 {
          margin-top: 20px;
        }
        @media (max-width: 768px) {
          .latest-news .page_title {
            background: #ed2128;
            line-height: 24px !important;
            text-transform: uppercase;
            font-size: 22px;
            font-weight: 600;
            color: #fff;
            padding: 8px 10px 4px 10px;
            font-family: "Mukta", sans-serif !important;
          }
          .latest-news .page_title span {
            color: #fff !important;
            font-family: "Mukta", sans-serif !important;
          }
          .latest_news_list li {
            background: #f5f5f5 !important;
            margin-bottom: 5px !important;
            padding: 10px !important;
            width: 100% !important;
            margin-right: 0 !important;
          }
          ul.latest_news_list li a {
            color: #001d42 !important;
          }
          .latest_news_list li figure img {
            margin-left: 10px !important;
            height: 63px !important;
            overflow: hidden !important;
            width: 95px !important;
            float: right !important;
          }
          .latest_news_list li figcaption {
            padding: 0 !important;
          }
          .latestnewws_title {
            font-size: 16px !important;
            line-height: 24px !important;
            color: #000 !important;
            font-weight: 500 !important;
          }
        }
        .CN-section .CN-sec-r {
          width: 300px;
          min-width: 300px;
        }
        .inner-ad {
          margin-top: 42px;
        }
        .bet__ad,
        .add {
          text-align: center;
        }
        .CN-scoreCardsection {
          overflow: hidden;
          position: relative;
          margin-bottom: 10px;
          font-family: "Mukta", sans-serif;
          background: #f5f5f5;
          padding: 0 15px;
          height: ${props.isMobile ? "180px !important" : "140px"};
        }
        .CN-scoreCard .slick-prev::before {
          content: "";
          border-top: 2px solid#909090;
          border-left: 2px solid#909090;
          width: 8px;
          height: 8px;
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
          position: absolute;
          left: 10px !important;
          top: 3px;
        }
        .CN-scoreCard .slick-next::before {
          right: 12px !important;
        }
        .CN-scoreCard .slick-track .teamscoreWrap {
          padding: 7px 0 12px !important;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .text .runrate {
          font-size: 10px !important;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .text .score-2 {
          font-size: 16px !important;
        }
        .lazyload-wrapper {
          margin: 0px 0px 10px 0px;
        }
        .cn-heading-1 {
          border-bottom: 3px solid #e1261d;
          margin-bottom: 10px;
        }
        .cn-heading-1 div {
          font-size: 22px;
          line-height: 20px;
          color: #e1261d;
          font-weight: bold;
          background: #fff;
          position: relative;
          top: 8px;
          padding-right: 4px;
          display: inline-block;
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
};

export default CricketHome;
