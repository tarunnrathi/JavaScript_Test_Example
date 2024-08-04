import FullScoreCard from "../Cards/FullScoreCard";
import Tabs from "../Tabs";
import QuickScoreCard from "../Cards/QuickScoreCard";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import SiteAd from "widgets/Common/Responsive/SiteAd";
import FullScoreBoard from "../Cards/FullScoreBoard";
import TeamSquads from "../Cards/TeamSquads";
import News from "../Cards/News";
import FullCommentary from "../Cards/FullCommentary";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const LiveScoreCardMobile = ({
  tabopt,
  data = {},
  score,
  pageAds = {},
  config,
  updateConfig,
  ta = '',
  tb = '',
  squadData = {},
}) => {
  return (
    <>
      <div className="CN-PageWrap CN-Mobile-PageWrap">
        
      <BreadcrumbCommon breadCrumbArray={[
            { value: "NEWS18 हिंदी", slug: "/"},
            { value: "क्रिकेट", slug: "/cricket/"},
            { value: "LIVE SCORE", slug: "/cricket/live-score/"},
            { value: (config || data).active == 4
              ? `${data.teamfa || data?.teama} vs ${data?.teamfb || data?.teamb} Team`
              : (config || data).active == 5
              ? `${data?.ta || data?.teamfa || data?.teama} vs ${data?.tb || data?.teamfb || data?.teamb} न्यूज`
              : (config || data).active == 2
              ? `${data?.teamfa || data?.teama} vs ${data?.teamfb || data?.teamb} बॉल BY बॉल कॉमेंट्री`
              : data?.crumb ||
                score?.headingOne ||
                data?.headingOne},
        ]}/>
        <div className="scoreCardPage">
          <h2 className="cn-heading-2">
              {(config || data).active == 4
                  ? `${data?.teamfa || data?.teama} vs ${data?.teamfb || data?.teamb} Team`
                  : (config || data).active == 5
                  ? `${data.ta || data?.teamfa || data?.teama} vs ${data.tb || data?.teamfb || data?.teamb} न्यूज`
                  : (config || data).active == 2
                  ? `${data?.teamfa || data?.teama} vs ${data?.teamfb || data?.teamb} बॉल BY बॉल कॉमेंट्री`
                  : score?.headingOne || data?.headingOne}
          </h2>
          <FullScoreCard
            score={score}
            data={data}
            id={data._id}
            url={data.currentUrl}
            pageAds={pageAds}
            isMobile
          />
          {pageAds.header_ATF_320 ? (
          <div className="ad-container">
            <div className="addinner-box">
              <SiteAd
                 width={336}
                 height={280}
                slotId="mobileAdNew300x250_0"
                adUnit={pageAds.header_ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
              ></SiteAd>
            </div>
          </div>
        ) : null}
          <Tabs
            options={tabopt}
            updateConfig={updateConfig}
            active={config.active}
            upcoming={data.upcoming}
          />
          {config.active == 0 ? (
            <QuickScoreCard
              score={score}
              data={data}
              pageAds={pageAds}
              id={data.id}
              config={config}
              isMobile
            />
          ) : null}
          {config.active == 1 ? (
            <FullScoreBoard
              score={score}
              data={data}
              pageAds={pageAds}
              id={data.id}
              config={config}
              isMobile
            />
          ) : null}
          {config.active == 2 ? (
            <FullCommentary
              config={config}
              data={data}
              score={score}
              pageAds={pageAds}
              comments={data.comments}
              summary={data.summary}
              fullList={data.fullList}
              isMobile
            />
          ) : null}
          {config.active == 4 ? (
            <TeamSquads
              score={score}
              data={squadData}
              pageAds={pageAds}
              config={config}
              isMobile
            />
          ) : null}
          {config.active == 5 ? (
            <News
              config={config}
              data={data}
              score={score}
              pageAds={pageAds}
              isMobile
              ta={ta}
              tb={tb}
            />
          ) : null}
        </div>
      </div>
      <style jsx global>{`
        a {
          color: #282828;
        }
        .CN-breadcum {
          font-size: 13px;
          line-height: 13px;
          color: #292929;
          text-transform: uppercase;
          padding: 5px 10px;
          background: #f5f5f5;
          border-top: 1px solid #a8a8a8;
          border-bottom: 1px solid #d8d8d8;
          margin-bottom: 12px;
          line-height: 19px;
          display: flex;
          overflow: scroll;
          white-space: nowrap;
          align-items: baseline;
        }
        .CN-breadcum >a,.CN-breadcum >span{
          min-height: 22px;
          padding: 0 2px;
          flex-shrink: 0;
        }
        .CN-breadcum h1,
        .CN-breadcum h2 {
          font-size: 13px;
          font-family: 'Mukta',sans-serif;
          line-height: 13px;
          color: #292929;
          font-weight: normal;
          display: inline-block;
        }
        .scoreCardPage {
          padding: 0 10px;
        }
        .cn-heading-2 {
          font-size: 20px;
          line-height: 22px;
          color: #e1261d;
          background: #fff;
          display: block;
          text-align: center;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 12px;
          padding-bottom: 5px;
        }
        .superOverWrap {
          display: flex;
          justify-content: center;
          padding: 10px 0;
          border-top: 1px solid #464646;
          align-items: center;
        }
        .superOverWrap .team_left {
          font-family: "Segoe Pro bold";
          color: #fff;
          font-size: 28px;
          line-height: 30px;
          text-transform: uppercase;
        }
        .superOverWrap .team_right {
          color: #fff;
          font-size: 28px;
          line-height: 30px;
          text-transform: uppercase;
        }
        .superOverWrap .SuperOver_text {
          font-size: 12px;
          color: #d8d8d8;
          text-transform: uppercase;
          text-align: center;
          line-height: 13px;
          padding: 0 5px;
        }
        .superOverWrap .SuperOver_text .texts {
          padding: 0 8px;
          color: #ffe200;
          font-size: 12px;
          font-family: "Segoe Pro Bold";
          line-height: 11px;
        }
        .superOverWrap .team_left_1,
        .superOverWrap .team_right_1 {
          color: #fff;
          font-size: 22px;
          line-height: 22px;
          text-transform: uppercase;
        }
        .superOverWrap .team_left_1 {
          text-align: right;
        }
        .superOverWrap .team_right_1 {
          text-align: left;
        }
        .superOverWrap .team_left_1 span,
        .superOverWrap .team_right_1 span {
          display: block;
          font-size: 11px;
          color: #d8d8d8;
          line-height: 15px;
        }
        .ad-container {
          text-align: center;
        }
        .scoreHeading1 {
          color: #464646;
          font-size: 16px;
          text-transform: uppercase;
          line-height: 16px;
          margin-bottom: 5px;
          position: relative;
          padding-left: 20px;
          box-shadow: 0 0 black;
          font-weight: normal;
        }
        .scoreHeading1::before {
          content: "";
          width: 15px;
          height: 6px;
          background: #ff0000;
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
          left: 0;
        }
        .ad-container{
          background: #dbdde3;
          padding: 16px 0;
          text-align: center;
        }
        .ad-container .addinner-box {
          background: #e8e9ed;
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: 250px;
          padding: 0;
          box-sizing: border-box;
        }
        .ad-container span#vigyapan{
          color: #797e90;
          font-size: 11px;
          text-align: center;
          padding: 2px 0 0;
          display: block;
          line-height: 16px;
        }
        .line1 {
          border: 0;
          height: 5px;
          background: #D8D8D8;
          margin: 20px 0 40px;
        }
      `}</style>
    </>
  );
};
export default LiveScoreCardMobile;
