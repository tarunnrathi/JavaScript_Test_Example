// import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import Outbrain from "widgets/Common/Responsive/Outbrain";
import Head from "next/head";
import { CricketNextImgUrls } from "../../CricketNextUtils";
import { useState } from "react";
import ImageFallback from "components/Common/ImageFallback";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

const TeamPlayerInfoCardMobile = dynamic(() => import('./TeamPlayerInfoCardMobile'));

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const CricketTeamSquadMobile = (props) => {
  const { pageContent, pageAds, paramObj } = props?.data;
  const { teamName, teamId, teamDisplayName, currentPath } = paramObj;
  const [openReadMore, setOpenReadMore] = useState(false);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="CN-pageOutter CN-Mobile-HomeOuter">
        <div className="CN-pageWrapper">
          <div className="CN-pageCN-scoreCardsection">
            <div className="bet__ad">
              {/* <SiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              /> */}
              <NewSiteAd
                 slotId="Mobile_ScoreCard_ad"
                 adUnit={props.pageAds?.ScoreCard_ad}
                 sizes={[[320, 60]]}
                 width={320}
                 height={60}
                 removeAdSpan={true}
                 lazyLoad={true}
              />
            </div>
            <div className="CN__scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR isMobile />
            </div>
          </div>
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280]
                ]}
              ></SiteAd> */}
              <NewSiteAd
                 width={336}
                 height={280}
                 slotId={"mobileAdNew300x250_0"}
                 adUnit={pageAds.ATF_320}
                 sizes={[
                   [300, 250],
                   [336, 280]
                 ]}
              />
            </div>
          </div>
          <BreadcrumbCommon breadCrumbArray={[
                { value: "हिंदी समाचार", slug: "/"},
                { value: "क्रिकेट", slug: "/cricket/"},
                { value: `TEAM ${teamDisplayName ? teamDisplayName.toUpperCase() : ""}`},
            ]}/>
          <div className="CN-heading-1">
            <div className="headinnerWrap">
              <div className="flag">
                <ImageFallback
                  src={`${CricketNextImgUrls.teamFlagUrl}${teamId}.png`}
                  fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                  height={25}
                  width={40}
                  alt={teamName}
                  title={teamName}
                />
              </div>
              <div className="headinner">
                टीम <span>{pageContent?.teamName}</span>
              </div>
            </div>
            <div className="icon"></div>
          </div>
          <TeamPlayerInfoCardMobile
            teamPlayers={pageContent?.players}
            pageAds={pageAds}
          />
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                width={300}
                height={250}
                slotId={"mobileAdNew300x250_2"}
                adUnit={pageAds.BTF_300}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                lazyload={true}

              ></SiteAd> */}
              <NewSiteAd
                 width={300}
                 height={250}
                 slotId={"mobileAdNew300x250_2"}
                 adUnit={pageAds.BTF_300}
                 sizes={[
                   [300, 250],
                   [336, 280],
                 ]}
                 lazyLoad={true} 
              />
            </div>
          </div>
          <div
            className={`readMore__wrapper ${openReadMore ? "readMore__content--show" : "" }`}
            dangerouslySetInnerHTML={{
              __html: pageContent?.teamBio,
            }}
          ></div>
          {!openReadMore && pageContent?.teamBio && (
            <div className="readMore__btn--wrapper">
              <button onClick={() => setOpenReadMore(true)}>और पढ़ें</button>
              <div className="readMore__btn--arrows"></div>
            </div>
          )}
          <div className="outbrain_row pageContent">
              <Taboola
                mode={TaboolaList.category.bottom.mode}
                id={TaboolaList.category.bottom.id}
                container={TaboolaList.category.bottom.container}
                placement={TaboolaList.category.bottom.placement}
              />
            </div>
          {typeof pageAds.PG_1x1_2 !== "undefined" &&
            pageAds.PG_1x1_2 !== "" ? (
            // <SiteAd
            //   slotId="PG_1x1_2"
            //   adUnit={pageAds.PG_1x1_2}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="PG_1x1_2"
              adUnit={pageAds.PG_1x1_2}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={false}
              />
          ) : null}
          {typeof pageAds.PG_1x1_3 !== "undefined" &&
            pageAds.PG_1x1_3 !== "" ? (
            // <SiteAd
            //   slotId="PG_1x1_3"
            //   adUnit={pageAds.PG_1x1_3}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   loadonScroll={true}
            // />
            <NewSiteAd
            slotId="PG_1x1_3"
            adUnit={pageAds.PG_1x1_3}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadOnScroll={true}
            />
          ) : null}
        </div>
      </div>
      <style jsx global>{`
        .add {
          background: #dbdde3;
          position: relative;
          padding: 16px 0;
          line-height: 0;
          text-align: center;
          margin-bottom: 10px;
          display: inline-block;
          width: 100%;
          z-index: 1;
          color: #797e90 !important;
          //height: 300px;
          overflow: hidden;
        }
        .addinner-box {
          background: #e8e9ed;
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: auto;
          padding: 0;
          box-sizing: border-box;
          color: #797e90 !important;
          font-size: 11px;
          line-height: 16px;
        }

        // div.addinner_box_300x250 {
        //   height: 268px;
        //   width: 300px;
        // }

        .clearfix {
          clear: both;
        }

        .vsp20 {
          margin-top: 20px;
        }

        .CN-pageOutter {
          margin-bottom: 20px;
          width: 100%;
        }

        .CN-pageWrapper {
          padding: 0 0 10px;
          position: relative;
          background-size: cover;
          background: #fff;
          font-family: "Mukta", sans-serif !important;
        }

        .CN-pageCN-scoreCardsection {
          min-height: 115px;
          background: rgb(0 0 0 / 13%);
        }

        .bet__ad {
          background: #fff;
        }

        .CN-pageCN-scoreCardsection .adunitContainer {
          display: flex;
          justify-content: center;
        }

        //SLICK TRACKER OVERRIDE
        .slick-track {
          gap: 10px;
        }
        .slick-dots li {
          width: 20px !important;
        }
        .CN__scoreCardsection {
          margin-right: 10px;
        }

        .CN-breadcum a {
          padding: 0 4px;
          flex-shrink: 0;
        }

        .CN-breadcum {
          font-size: 13px;
          background: none;
          border-top: none;
          border-bottom: 1px dashed rgb(147 147 147 / 57%);
          display: flex;
          overflow: scroll;
          padding: 8px 10px 5px 10px;
          margin-bottom: 0;
        }

        .CN-breadcum h1 {
          line-height: 13px;
          color: #292929;
          font-weight: 400;
          display: inline-block;
        }

        .CN-heading-1 {
          font-family: "Fira Sans", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          color: #e1261c;
          padding: 0 0 0 10px;
          margin: 5px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          font-size: 20px;
          background: none;
        }
        .CN-heading-1 .headinnerWrap {
          display: flex;
          background: #ffffff;
          padding: 0 5px;
          align-items: center;
        }
        .CN-heading-1 .headinnerWrap .flag {
          width: 40px;
          margin-right: 6px;
        }
        .CN-heading-1 .headinnerWrap .flag img {
          display: block;
        }
        .CN-heading-1 .headinner span {
          color: #001d42;
        }
        .CN-heading-1 .icon {
          border: solid black;
          border-width: 0 2px 2px 0;
          display: inline-block;
          width: 8px;
          height: 8px;
          transform: rotate(-45deg);
          margin-right: 10px;
          z-index: 1;
        }
        .CN-heading-1:after {
          content: "";
          position: absolute;
          background: #fff;
          width: 22px;
          height: 19px;
          right: 0;
        }
        .readMore__wrapper {
          display: block;
          overflow: hidden;
          position: relative;
          height: 152px;
          margin-bottom: 0px !important;
        }
        .readMore__content--show {
          height: auto !important;
        }
        .pageContent {
          padding: 10px;
          font-size: 16px;
          line-height: 1.5;
        }
        .readMore__btn--wrapper {
          position: relative;
          margin: 10px auto 10px;
          background: linear-gradient(transparent, #fff, #fff);
          padding-top: 40px;
          margin-top: -40px;
        }
        .readMore__btn--wrapper button {
          background-color: #eb3d3c;
          border: none;
          width: 135px;
          padding: 10px 15px 10px 0px;
          box-sizing: border-box;
          border-radius: 20px;
          cursor: pointer;
          color: #fff;
          font-size: 14px;
          line-height: 19px;
          font-weight: 400;
          outline: none;
          margin: auto;
          display: block;
          text-transform: capitalize;
        }

        .readMore__btn--arrows {
          position: absolute;
          top: 18px;
          right: 50%;
          width: 13px;
          transform: rotate(89deg);
          height: 1px;
          background-color: #fff;
          margin-right: -52px;
        }
        .readMore__btn--arrows .arrows:before,
        .readMore__btn--arrows .arrows:after {
          content: "";
          position: absolute;
          width: 7px;
          height: 1px;
          top: -2px;
          right: -1px;
          background-color: #fff;
          transform: rotate(45deg);
        }
        .readMore__btn--arrows:after {
          top: 2px;
          transform: rotate(-45deg);
        }
      `}</style>
    </>
  );
};

export default CricketTeamSquadMobile;
