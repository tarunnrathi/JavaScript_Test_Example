import dynamic from "next/dynamic";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import TeamList from "./TeamList";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import { IPL_YEAR } from "includes/ipl.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
const DynamicRHSWithNoSSR = dynamic(
  () => import("components/Cricketnext/home/RHS"),
  { ssr: false }
);
const TeamDesktop = ({ pageAds, data }) => {
  const {
    paramObj: { teamName, teamShortName } = {},
    teamsData = [],
    ImageIdsAvailable = [],
    seoData = {},
  } = data;

 
  return (
    <>
      <div className="CN-pageOutter CN-Desktop-HomeOuter">
        <div className="CN-pageWrapper">
          <div className="CN-pageCN-scoreCardsection">
            <SiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}
              lazyload={true}
            />
            <div className="CN-scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR isIPL={true} />
            </div>
          </div>
          <section className="iplwrapper">
            <div className="container clearfix">
              <div className="ipl-leftwrap">
              <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `IPL ${IPL_YEAR}`,slug: "/cricket/ipl/"},
                  { value: `${teamName}`},
                ]}
                isCapitalize={true}/>
                <h1 className="ipl-globahd">
                  {`${teamName} (${teamShortName})`}
                </h1>
                <TeamList
                  playerData={teamsData["batsman"]}
                  headerTitle={"बल्लेबाज"}
                  skillsKey={"batting_style"}
                  ImageIdsAvailable={ImageIdsAvailable}
                />
                <TeamList
                  playerData={teamsData["bowler"]}
                  headerTitle={"गेंदबाज"}
                  skillsKey={"bowling_style"}
                  ImageIdsAvailable={ImageIdsAvailable}
                />
                <TeamList
                  playerData={teamsData["allRounder"]}
                  headerTitle={"ऑलराउंडर्स"}
                  skillsKey={"batting_style"}
                  ImageIdsAvailable={ImageIdsAvailable}
                />
                <TeamList
                  playerData={teamsData["wicketKeeper"]}
                  headerTitle={"विकेटकीपर्स"}
                  skillsKey={"batting_style"}
                  ImageIdsAvailable={ImageIdsAvailable}
                />
                <div className="vsp20"></div>
                <SiteAd
                  width={728}
                  height={90}
                  style={{ textAlign: "center" }}
                  adUnit={pageAds.BTF_728}
                  sizes={[[728, 90]]}
                  lazyload={true}
                ></SiteAd>
                <div className="vsp20"></div>
                {seoData.description && (
                  <div className="iplspclcnts clearfix">
                    {seoData.description}
                  </div>
                )}
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
          </section>
        </div>
      </div>
      <style jsx global>{`
        .ipl-rightwrap {
          float: right;
          width: 300px;
        }
        .predictor_sponsored {
          text-align: center;
        }
        .sponsor-with-heading {
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .ipl-globahd {
          font-size: 28px !important;
          margin-bottom: 5px !important;
          line-height: 32px !important;
        }
        .ipl-globahd {
          font-size: 30px;
          color: #eb3d3c;
          line-height: 36px;
          margin-bottom: 10px;
        }
        .iplwrapper {
          background: #f5f5f5;
        }
        .iplwrapper .container {
          padding: 15px;
          background: #fff;
          box-sizing: border-box;
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
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .ipl-leftwrap {
          float: left;
          width: calc(100% - 320px);
        }
        .brdacrum {
          margin-bottom: 5px;
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
        .CN-pageCN-scoreCardsection {
          min-height: 60px;
          background: rgb(0 0 0 / 13%);
          margin-top: 10px;
        }
        .CN-scoreCardsection {
          background: #f5f5f5;
          padding: 0 15px;
        }
        .slick-arrow {
          cursor: pointer !important;
        }
        .iplspclcnts {
          background: #f5f5f5;
          padding: 15px 20px;
          font-size: 18px;
          color: #444;
          line-height: 28px;
          margin-bottom: 20px;
        }
        .n18bhdr + div {
          position: sticky;
          top: 0;
          z-index: 5;
        }
      `}</style>
    </>
  );
};
export default TeamDesktop;