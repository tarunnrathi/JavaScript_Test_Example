import dynamic from "next/dynamic";
import Head from "next/head";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
// import BlogSection from "./BlogSection";
import IPLStats from "./IPLStats";
import IPLTeamSection from "./IplTeamSection";
import IPLTopStories from "./IplTopStories";
import LatestNews from "./LatestNews";
import PhotoSliderSection from "./PhotoSliderSection";
import RunWicketSection from "./RunWicketSection";
import TableSection from "./TableSection";
import VideoNewsList from "./VideoNews";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import { IPL_YEAR } from "includes/ipl.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const DynamicRHSWithNoSSR = dynamic(
  () => import("components/Cricketnext/home/RHS"),
  { ssr: false }
);
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
const teamCaptionsArr = [
  {
    id: 1,
    team: "CSK",
    playerName: "Ruturaj Gaikwad (C)",
    colorId: 1,
    thumnail:
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/66584.png?impolicy=website&amp;width=60&amp;height=70",
    redirectionURL: "/cricket/ipl/chennai-super-kings-csk/",
  },
  {
    id: 2,
    team: "DC",
    playerName: "David Warner (C)",
    colorId: 2,
    thumnail:
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/5380.png",
    redirectionURL: "/cricket/ipl/delhi-capitals-dc/",
  },
  {
    id: 3,
    team: "PBKS",
    playerName: "Shikhar Dhawan (C)",
    colorId: 3,
    thumnail:
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/128X128/3722.png?impolicy=website&amp;width=60&amp;height=70",
    redirectionURL: "/cricket/ipl/punjab-kings-pbks/",
  },
  {
    id: 4,
    team: "KKR",
    playerName: "Shreyas Iyer (C)",
    colorId: 4,
    thumnail:
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/63961.png?impolicy=website&amp;width=60&amp;height=70",
    redirectionURL: "/cricket/ipl/kolkata-knight-riders-kkr/",
  },
  {
    id: 5,
    team: "MI",
    playerName: "Hardik Pandya (C)",
    colorId: 5,
    thumnail:
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/63751.png?impolicy=website&amp;width=60&amp;height=70",
    redirectionURL: "/cricket/ipl/mumbai-indians-mi/",
  },
  {
    id: 6,
    team: "RR",
    playerName: "Sanju Samson (C)",
    colorId: 6,
    thumnail:
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/61837.png",
    redirectionURL: "/cricket/ipl/rajasthan-royals-rr/",
  },
  {
    id: 7,
    team: "RCB",
    playerName: "Faf du Plessis (C)",
    colorId: 7,
    thumnail:
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/128X128/28891.png?impolicy=website&amp;width=60&amp;height=70",
    redirectionURL: "/cricket/ipl/royal-challengers-bangalore-rcb/",
  },
  {
    id: 8,
    team: "SRH",
    playerName: "Pat Cummins (C)",
    colorId: 8,
    thumnail:
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/56964.png?impolicy=website&amp;width=60&amp;height=70",
    redirectionURL: "/cricket/ipl/sunrisers-hyderabad-srh/",
  },
  {
    id: 9,
    team: "GT",
    playerName: "Shubman Gill (C)",
    colorId: 9,
    thumnail:
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/66818.png?impolicy=website&amp;width=60&amp;height=70",
    redirectionURL: "/cricket/ipl/gujarat-titans-gt/",
  },
  {
    id: 10,
    team: "LSG",
    playerName: "KL Rahul (C)",
    colorId: 10,
    thumnail:
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/128X128/60122.png?impolicy=website&amp;width=60&amp;height=70",
    redirectionURL: "/cricket/ipl/lucknow-super-giants-lsg/",
  },
];
const IPLDesktop = ({ pageAds, data }) => {
  const {
    topNewsStoryData = [],
    pointsTableData = [],
    photoPriority = [],
    offFieldPriority = [],
    orangeCapData = [],
    purpleCapData = [],
    latestNewsData = [],
    videoPriorityData = [],
    statsData = {},
    seoData = {},
    ImageIdsAvailable = [],
  } = data;
  // const {
  //   data: iplBlogData = [],
  //   status: blogSwitcher,
  // } = data.iplBlogData;
  return (
    <>
      <Head>
        <meta name="robots" content="max-image-preview:large" />
      </Head>
      <div className="CN-pageOutter CN-Desktop-HomeOuter">
        <div className="CN-pageWrapper">
          <div className="CN-pageCN-scoreCardsection">
            <div className="CN-scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR isIPL={true} />
            </div>            
            <NewSiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}
              lazyLoad={true}
            />
          </div>
          <div className="iplwrapper">
            <div className="container clearfix">
              <div className="ipl-leftwrap">
              <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `IPL ${IPL_YEAR}`},
                ]}/>
                <h1 className="ipl-globahd">IPL {IPL_YEAR}</h1>
                <IPLTopStories topNewsStoryData={topNewsStoryData} />
                <div className="clearfix vsp40"></div>
                <IPLTeamSection teamCaptionsArr={teamCaptionsArr} />
                <div className="clearfix vsp40"></div>
                {(Boolean(orangeCapData.length) ||
                  Boolean(purpleCapData.length)) && (
                    <div className="CN-tableSection">
                      <TableSection tableData={pointsTableData} />
                      <RunWicketSection
                        orangeCapData={orangeCapData}
                        purpleCapData={purpleCapData}
                        ImageIdsAvailable={ImageIdsAvailable}
                      />
                    </div>
                  )}
                <PhotoSliderSection
                  photoPriority={photoPriority}
                  offFieldPriority={offFieldPriority}
                />                
                <NewSiteAd
                  slotId="Desktop_BTF_728"
                  width={728}
                  height={90}
                  style={{ textAlign: "center" }}
                  adUnit={pageAds.BTF_728}
                  sizes={[[728, 90]]}
                  lazyLoad={true}
                />
                <div className="clearfix vsp40"></div>
                <div className="sponsor-with-heading">
                  <h3 className="ipl_headin_g">आईपीएल {IPL_YEAR} <span>स्टैट्स</span>{" "}</h3>
                </div>
                {/* <h2 className="ipl-globahd">
                  <a href="void:javascript(0);">
                    आईपीएल {IPL_YEAR} <span>स्टैट्स</span>{" "}
                  </a>
                </h2> */}
                <IPLStats pageAds={pageAds} statsData={statsData} />
                {/* {Boolean(iplBlogData.length) && (blogSwitcher === 1) && (
                  <>
                    <div className="clearfix vsp40"></div>
                    <BlogSection iplBlogData={iplBlogData} />
                  </>
                )} */}
                <div className="clearfix vsp40"></div>
                <LatestNews latestNewsData={latestNewsData} />
                <div className="clearfix vsp40"></div>
                <VideoNewsList videoPriorityData={videoPriorityData} />               
                <NewSiteAd
                  width={728}
                  height={90}                  
                  adUnit={pageAds.MTF_300_id}
                  sizes={[[728, 90]]}
                  loadOnScroll={true}
                  slotId={"Desktop_MTF_300_id"}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: seoData.meta_ipl_page_description,
                  }}
                ></div>
              </div>
              <div className="ipl-rightwrap">
                <DynamicRHSWithNoSSR
                  position={"first"}
                  pageAds={pageAds}
                  isIPL={true}
                  taboola ={true}
                  taboolaList={TaboolaList.category}
                />
              </div>
            </div>
            <Taboola
              mode={TaboolaList.category.bottom.mode}
              id={TaboolaList.category.bottom.id}
              container={TaboolaList.category.bottom.container}
              placement={TaboolaList.category.bottom.placement}
            />
          </div>
        </div>
        
      </div>
      <style jsx global>{`
        .CN-pageOutter {
          margin-bottom: 20px;
          width: 100%;
        }
        .CN-pageWrapper {
          max-width: 1244px;
          margin: 0 auto;
          background: #fff;
          clear: both !important;
        }
        .iplmorebtn span:before {
          height: 1px;
          width: 10px;
          background: #eb3d3c;
          top: 8px;
          right: 0;
        }
        .iplmorebtn span:before,
        .iplmorebtn span:after {
          content: "";
          position: absolute;
        }
        .iplmorebtn span:after {
          width: 6px;
          height: 6px;
          border-top: 1px solid #eb3d3c;
          border-right: 1px solid #eb3d3c;
          transform: rotate(45deg);
          top: 5px;
          right: 0px;
        }
        .CN-pageCN-scoreCardsection {
          min-height: 60px;
          background: rgb(0 0 0 / 13%);
          margin-top: 10px;
        }
        .CN-scoreCardsection {
          background: #f5f5f5;
          padding: 0 15px;
          height: 140px !important;
        }
        .slick-arrow {
          cursor: pointer !important;
        }
        .vsp40 {
          margin-top: 40px;
        }
        .ipl_headin_g {
          font-size: 22px;
          line-height: 31px;
          color: #e1261d;
          font-weight: bold;
          text-transform: uppercase;
          position: relative;
        }
        .clearfix {
          clear: both;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        .CN-tableSection {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }
        .ipl-globahd a {
          color: #eb3d3c;
        }
        .ipl-globahd a:hover {
          color: #000;
        }
        .ipl-globahd a span {
          color: #202020;
        }
        .ipl-globahd {
          font-size: 28px;
          color: #eb3d3c;
          line-height: 32px;
          margin-bottom: 5px;
        }
        a img {
          border: none;
        }
        .team_player img {
          position: absolute;
          left: 0px;
          top: -15px;
        }
        .iplwrapper {
          background: #f5f5f5;
        }
        .ipl-rightwrap {
          float: right;
          width: 300px;
        }
        .iplwrapper .container {
          padding: 15px;
          background: #fff;
          box-sizing: border-box;
        }
        .container {
          margin: auto;
          max-width: 1244px;
          padding: 0 10px;
          position: relative;
        }
        .clearfix {
          clear: both;
        }
        .ipl-leftwrap {
          float: left;
          width: calc(100% - 320px);
        }
        .brdacrum {
          font-size: 14px;
          color: #001d42;
          text-transform: uppercase;
          line-height: 18px;
          font-weight: 700;
          margin-bottom: 15px;
          border-bottom: 2px solid #eee;
          padding-bottom: 6px;
        }
        .brdacrum a {
          color: #404040;
          font-weight: 400;
          margin-right: 2px;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .ipl-globahd {
          font-size: 28px;
          margin-bottom: 5px;
          line-height: 32px;
          color: #eb3d3c;
        }
        li {
          list-style: none;
        }
        figure img {
          width: 100%;
          transform: scale(1);
          transition: all 0.5s ease-in-out;
        }
        figure:hover img {
          transform: scale(1.2);
          transition: all 0.3s ease-in-out;
        }
        a img {
          border: none;
        }
        .n18bhdr + div {
          position: sticky;
          top: 0;
          z-index: 5;
        }
        .sponsor-with-heading {
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: space-between;
          
      `}</style>
    </>
  );
};
export default IPLDesktop;