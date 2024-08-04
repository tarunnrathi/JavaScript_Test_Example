import TeamList from "components/Cricket/Mobile/IPL/TeamList";
import { displayAds, IPL_YEAR } from "includes/ipl.helper";
import dynamic from "next/dynamic";
import IplDescription from "./IplDescription";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
const TeamMobile = ({ pageAds, data }) => {
  const {
    paramObj: { teamName } = {},
    teamsData = [],
    ImageIdsAvailable = [],
    seoData = {}
  } = data;
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
                  { value: `IPL ${IPL_YEAR}`,slug: "/cricket/ipl/"},
                  { value: `${teamName}`},
                ]}
                isCapitalize={true}/>
        <div className="sponsor-with-heading">
            <h1 className="ipl-globahd">{teamName}</h1>
        </div>
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
        <div className="clearfix vsp10"></div>
          {displayAds(pageAds.BTF_300)}
          <div className="vsp20"></div>
          {seoData && seoData.description && (
            <IplDescription page_description={seoData.description} />
          )}
      <Taboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
      />
      <style jsx global>{`
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
        .sponsor-with-heading {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-right: 10px;
        }
        .ipl-globahd {
            font-size: 24px;
            color: #eb3d3c;   
            line-height: 20px;
            padding: 20px 10px 0 10px;
        }
        .vsp10 {
          margin-top: 10px;
        }
        .vsp20 {
          margin-top: 20px;
        }
        .CN__scoreCardsection {
          height: 160px;
          overflow: hidden;
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
export default TeamMobile;