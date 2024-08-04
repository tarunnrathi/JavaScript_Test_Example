import IPLPredictor from "components/Cricket/Common/Predictor";
import { displayAds, IPL_YEAR } from "includes/ipl.helper";
import dynamic from "next/dynamic";
// import IPLBlogs from "./IPLBlogs";
import IplDescription from "./IplDescription";
import IplLatestNews from "./IplLatestNews";
import IplPhotoSlider from "./IplPhotoSlider";
import IPLPointTable from "./IPLPointTable";
import IplRunWicket from "./IplRunWicket";
import IPLStats from "./IPLStats";
import IPLTeamSection from "./IPLTeamSection";
import IplTopStories from "./IplTopStories";
import IplVideos from "./IplVideos";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
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
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/128X128/66584.png?impolicy=website&amp;width=60&amp;height=70",
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
const IPLMobile = ({ pageAds, data }) => {
  const {
    topNewsStoryData = [],
    pointsTableData = [],
    photoPriority = [],
    videoPriorityData = [],
    offFieldPriority = [],
    orangeCapData = [],
    purpleCapData = [],
    latestNewsData = [],
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
      <div className="vsp10"></div>
      <div className="CN__scoreCardsection">
        <DynamicCrTopScoreWidgetWithNoSSR isMobile isIPL={true} />
      </div>
      {displayAds(pageAds.ATF_320)}
      <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `IPL ${IPL_YEAR}`},
                ]}/>
      <h1 className="ipl-globahd">IPL {IPL_YEAR} </h1>
      <IplTopStories IPLData={topNewsStoryData} />
      <IPLTeamSection teamCaptionsArr={teamCaptionsArr} />
      {displayAds(pageAds.ATF_300)}
      <IPLPredictor />
      <IPLPointTable tableData={pointsTableData} />
      <div className="clearfix vsp10"></div>
      <IPLStats pageAds={pageAds} statsData={statsData} />
      <IplRunWicket
        orangeCapPlayerArr={orangeCapData}
        purpleCapPlayerArr={purpleCapData}
        ImageIdsAvailable={ImageIdsAvailable}
      />
      {/* {
        blogSwitcher === 1 && (
          <IPLBlogs iplBlogData={iplBlogData} />
        )
      } */}
      <IplPhotoSlider
        OffTheFieldArr={offFieldPriority}
        photoPriority={photoPriority}
      />
      <IplLatestNews latestNews={latestNewsData} />
      <IplVideos videoData={videoPriorityData} />
      {seoData && seoData.meta_ipl_page_description && (
        <IplDescription page_description={seoData.meta_ipl_page_description} />
      )}
      <Taboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
/>
      <style jsx global>{`
        .CN__scoreCardsection {
          height: 160px;
          overflow: hidden;
        }
        .brdacrum {
          font-size: 14px;
          color: #001d42;
          text-transform: uppercase;
          line-height: 18px;
          margin: 12px 10px 0 10px;
          border-bottom: 1px solid #eee;
          padding-bottom: 6px;
          font-weight: 700;
        }
        .brdacrum a {
          color: #404040;
          font-weight: 400;
          margin-right: 2px;
        }
        .ipl-globahd {
          font-size: 24px;
          color: #eb3d3c;
          line-height: 20px;
          padding: 20px 10px 0 10px;
        }
        .vsp20 {
          margin-top: 20px;
        }
        .vsp10 {
          margin-top: 10px;
        }
        .CN-Sections {
          border-bottom: 6px solid #eeeeee;
          margin-bottom: 30px;
        }
        .clearfix {
          clear: both;
        }
        .add {
          padding: 15px;
          margin: 20px 0px;
          text-align: center;
          display: flex;
          overflow: hidden;
          background: #dbdde3;
          justify-content: center;
          height: 280px;
        }
      `}</style>
    </>
  );
};
export default IPLMobile;