import TopStoryLeft from "../WorldCup/Home/TopStoryLeft";
import TopStoryRight from "../WorldCup/Home/TopStoryRight";
import Photogallery from "../WorldCup/Home/PhotoGallery";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Squad from "../WorldCup/Home/Squad";
// import PointTable from "../WorldCup/Home/PointTable";
// import PlayerOfTheDay from "../WorldCup/Home/PlayerOfTheDay";
// import MostRunsAndWickets from "../WorldCup/Home/MostRunsAndWickets";
import LatestNews from "../WorldCup/Home/LatestNews";
import MoreContentAmp from "../WorldCup/Home/MoreContentAmp";
// import FeatureSectionMobile from "../WorldCup/Home/FeatureSectionMobile";
import WCStatsMobile from "../WorldCup/Home/WCStatsMobile";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const CricketHome = (props) => {
  // const pointTableData = props?.data?.pointTableData || [];
  // const mostWicketdata =
    // props?.data?.mostWicketdata?.leaderboard?.slice(0, 5) || [];
  // const mostRunData = props?.data?.mostRunData?.leaderboard?.slice(0, 5) || [];
  const statsData = props?.data?.statsData || [];
  const checkStats = statsData?.bat?.runs_off_the_bat;
  const latestStories = props?.data?.latestStories || [];
  // const WcPlayerOfTheDay = props?.data?.WcPlayerOfTheDay?.data?.players || [];
  const photoGalleryWc = props?.data?.photoGalleryWc || [];
  const topNews = props?.data?.topNews || {};
  return (
    <>
      <div className="outer">
        <div className="CN-pageWrapper">
          <div className="CN-section">
            <div className="CN-sec-l">
              <div className="ad-container">
                <amp-ad
                  width={320}
                  height={250}
                  type="doubleclick"
                  data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_KHEL_AMP/NW18_HIND_KHEL_CRI_IPLT20_AMP_AL/NW18_HIND_KHEL_CRI_IPLT20_AS_AMP_ROS_ATF_320"
                  data-multi-size="250x250,300x250,336x280"
                  data-multi-size-validation="false"
                  i-amphtml-layout="fixed"
                  data-amp-slot-index="0"
                  data-a4a-upgrade-type="amp-ad-network-doubleclick-impl"
                ></amp-ad>
              </div>
              
                <BreadcrumbCommon breadCrumbArray={[
                    { value: "News18 हिंदी", slug: "/"},
                    { value: "क्रिकेट", slug: "/cricket/"},
                    { value: "T20 क्रिकेट विश्व कप 2023"},
                  ]}/>
              <div className="cn-heading-1">
                  <div className="headinner">क्रिकेट विश्व कप 2023</div>
                  <div className="icon" />
              </div>
              <div className="top_story">
                <TopStoryLeft isAmp={true} topNewsLeft={topNews.left?.[0]} />
                <TopStoryRight isAmp={true} topNewsRight={topNews.right}/>
                <div className="load_more">
                  <a href="/world-cup/news/">
                    <span>और भी पढ़ें</span>
                  </a>
                </div>
              </div>
              <Squad isAmp={true} />
              <div className="points_table_section vspacer20">
                {props.isMobile && props?.pageAds?.ATF_300 && (
                  <div className="add">
                    <div className="addinner-box">
                      <SiteAd
                        width={336}
                        height={280}
                        adUnit={props?.data?.pageAds?.ATF_300_id}
                        sizes={[
                          [300, 250],
                          [336, 280],
                        ]}
                        lazyload={true}
                      ></SiteAd>
                    </div>
                  </div>
                )}

                {/* <PointTable isAmp={true} PointTableData={pointTableData} /> */}
                {/* <PlayerOfTheDay
                  isAmp={true}
                  WcPlayerOfTheDay={WcPlayerOfTheDay}
                /> */}
              </div>
              <div className="mostrun_section vspacer20">
                {/* <MostRunsAndWickets
                  isAmp={true}
                  mostWicketdata={mostWicketdata}
                  mostRunData={mostRunData}
                /> */}
                <Photogallery isAmp={true} photoGalleryWc={photoGalleryWc} />
              </div>
              {/* <FeatureSectionMobile isAmp={true} /> */}
              <div className="clearfix vsp40"></div>
              {checkStats && <WCStatsMobile isAmp={true} statsData={statsData} />}
              <div class="topadd">
                <div class="ad-container">
                  <amp-ad
                    width={320}
                    height={250}
                    type="doubleclick"
                    data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_KHEL_AMP/NW18_HIND_KHEL_CRI_IPLT20_AMP_AL/NW18_HIND_KHEL_CRI_IPLT20_AS_AMP_ROS_BTF_300"
                    data-multi-size="250x250,300x250,336x280"
                    data-multi-size-validation="false"
                    i-amphtml-layout="fixed"
                    data-amp-slot-index="0"
                    data-a4a-upgrade-type="amp-ad-network-doubleclick-impl"
                  ></amp-ad>
                </div>
              </div>
              <LatestNews isAmp={true} latestStories={latestStories} />
              <div className="vsp20 clearfix"></div>
              <MoreContentAmp />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .top_story_left a {
          color: #001d42 ;
        }
        .outer {
          max-width: 1244px;
          margin: 0 auto;
          padding: 0;
          clear: both;
          overflow: hidden;
        }
        body .CN-pageWrapper > div {
          margin-bottom: 0px ;
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
          background: #dbdde3 ;
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
        .top_story_left figure amp-img {
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
        .top_story_right .cricketwallah_right li amp-img {
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
            line-height: 19px ;
            border-collapse: collapse;
          }
          body {
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 19px;
            font-weight: 400;
          }
          .outer {
            width: 100%;
            display: block;
            overflow: auto ;
          }
          .CN-section {
            display: block ;
            width: 100%;
          }
          .CN-section .CN-sec-l {
            width: 100% ;
            min-width: auto ;
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
            width: 100% ;
            margin: 0 ;
          }
          .top_title_m {
            display: block ;
            letter-spacing: 0px;
            color: #001d42;
            font-size: 20px;
            line-height: 24px ;
            font-weight: bold;
            padding: 10px 10px 5px 10px;
          }
          .top_story_left figcaption {
            display: none;
          }
          .top_story_right {
            width: 100% ;
            background: #fff;
            padding: 5px 0 0 ;
          }
          .cricketwallah_right li,
          .cricketwallah_right li:first-child {
            background: #f5f5f5;
            margin-bottom: 5px;
            padding: 10px ;
            border: 0;
          }
          ul.story_list li a figure {
            flex: 0 0 95px;
            margin-left: 10px;
            height: 63px;
            overflow: hidden;
          }
          .cricketwallah_title {
            font-size: 16px ;
            line-height: 24px ;
            color: #000 ;
            font-weight: 500 ;
          }
          .load_more {
            width: 100% ;
            text-align: center;
            background: #f5f5f5;
            display: flex;
            justify-content: center;
            padding: 10px 0 ;
            height: auto ;
          }
          .load_more a {
            border: 2px solid #e1261c;
            background: #fff;
            padding: 5px 12px 2px;
            border-radius: 30px;
            color: #e1261c ;
            font-size: 13px;
            line-height: 19px ;
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
        .squads_title i amp-img {
          display: block;
          width: 75px;
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
            padding: 5px 10px 20px ;
            display: block ;
          }
          .world_cup_squads_left {
            width: 100% ;
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
          .world_cup_squads_left .squads_title i amp-img {
            width: 100%;
            display: block;
          }
          .world_cup_squads_left .squads_title h3 {
            font-size: 24px;
            color: #fff;
            font-weight: 600;
            flex-shrink: 0;
            line-height: 32px ;
          }
          .world_cup_squads_left .squads_title h3 span {
            display: block;
            font-weight: bold;
            color: #ffcc00;
          }
          .world_cup_squads_left .squads_img {
            display: block;
            width: 100%;
            margin: 0 auto;
            height: 191px;
          }
          ul.country_list {
            display: grid ;
            grid-template-columns: repeat(2, 1fr);
            grid-row-gap: 17px;
            grid-column-gap: 10px;
            padding: 0 ;
            width: 100% ;
          }
          ul.country_list li {
            width: 100% ;
            margin: 0 ;
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
        }
        .page_title span {
          color: #202020;
          font-weight: bold;
        }
        .points_table_tab {
          justify-content: left ;
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
        .table_team_name amp-img {
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
        .play_of_day amp-img {
          display: block;
          max-width: none;
        }
        .day_img amp-img {
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
          margin-bottom: 0px;
          font-size: 14px;
          line-height: 20px;
        }
        @media (max-width: 768px) {
          .points_table_section {
            width: 100% ;
            display: block ;
          }
          .points_table {
            width: 100% ;
            margin-bottom: 30px;
          }
          .page_title {
            display: block ;
            padding-left: 10px;
            margin-bottom: 2px;
            line-height: 22px ;
          }
          .points_table_tab {
            padding: 0 10px;
            margin-bottom: 5px;
            padding-top: 10px;
          }
          .points_table_tab li {
            width: 68px;
            padding: 5px 5px 5px ;
            margin: 0 ;
            line-height: 16px ;
            font-size: 14px ;
          }
          ul.points_table_tab li p {
            margin: 0;
            line-height: 15px ;
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
            background: #001d42 ;
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
            padding: 10px 20px ;
            background: #f5f5f5 ;
            border-top: 1px solid #e5e5e5 ;
            margin-bottom: 30px;
            position: relative;
            width: 100% ;
          }
          .play_of_day .page_title {
            padding-left: 0;
          }
          .of_day_img {
            display: block ;
            width: 100% ;
          }
          .day_img {
            width: 100% ;
            height: auto ;
          }
          .day_intro {
            display: block ;
          }
          .play_of_day amp-img {
            display: inline-flex ;
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
          background: #001d42 ;
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
        .photos_icon amp-img {
          width: 100%;
          display: block;
        }
        .photogallerie_row figure > amp-img {
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
            display: block ;
          }
          .most_run_left {
            width: 100% ;
          }
          .latest_photo {
            width: 100% ;
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
        .cricketwallah_img amp-img {
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
        .cricketwallah_right li amp-img {
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
        .latest_news_list li figure amp-img {
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
            line-height: 24px ;
            text-transform: uppercase;
            font-size: 22px;
            font-weight: 600;
            color: #fff;
            padding: 8px 10px 4px 10px;
          }
          .latest-news .page_title span {
            color: #fff ;
          }
          .latest_news_list li {
            background: #f5f5f5 ;
            margin-bottom: 5px ;
            padding: 10px ;
            width: 100% ;
            margin-right: 0 ;
          }
          ul.latest_news_list li a {
            color: #001d42 ;
          }
          .latest_news_list li figure amp-img {
            margin-left: 10px ;
            height: 63px ;
            overflow: hidden ;
            width: 95px ;
            float: right ;
          }
          .latest_news_list li figcaption {
            padding: 0 ;
          }
          .latestnewws_title {
            font-size: 16px ;
            line-height: 24px ;
            color: #000 ;
            font-weight: 500 ;
          }
        }
        .CN-section .CN-sec-r {
          width: 300px;
          min-width: 300px;
        }
        .inner-ad {
          margin-top: 42px;
        }
        .ad-container amp-ad {
          margin: 0 auto;
          width: 320px;
          display: block;
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
