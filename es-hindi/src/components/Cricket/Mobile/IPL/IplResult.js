import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { IPL_YEAR } from "includes/ipl.helper";

const IplResultList = dynamic(() => import("components/Cricket/Mobile/IPL/IplResultList"));

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const IplResult = (props) => {
  const { pageContent, pageAds, paramObj, seoData } = props?.data;
  const { pageTypeHin, seriesDisplayName, seriesName } = paramObj;

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
              <SiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              />
            </div>
            <div className="CN__scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR isMobile isIPL={props.isIpl}/>
            </div>
          </div>
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              <SiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
              ></SiteAd>
            </div>
          </div>
          <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "CRICKET", slug: "/cricket/"},
                  { value: `IPL ${IPL_YEAR}`, slug: "/cricket/ipl/"},
                  { value: pageTypeHin},
                ]}/>
          
          <div className="CN-heading-1">
            <div className="headinner">सीरीज के नतीजे : <span>{seriesDisplayName}</span></div>
            <div className="icon"></div>
          </div>
          {
              pageContent && pageContent[0]?.match?.length > 0 ? (
                <IplResultList pageContent={pageContent[0]} />
              ) : (
                <p style={{ textAlign: "center" }}>
                  No results found matching this criteria
                </p>
              )
            }

          <p className="pageContent">{seoData?.meta_ipl_page_description}</p>

          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              <SiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_1"
                  adUnit={pageAds.ATF_300}
                  sizes={[[300, 250], [336, 280]]}
                  lazyload={true}
              ></SiteAd>
            </div>
          </div>
        </div>
        <Taboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
      />
      </div>
      <style jsx global>{`

        .add {
          background: #dbdde3;
          position: relative;
          padding: 16px 0;
          line-height: 0;
          text-align: center;
          display: inline-block;
          width: 100%;
          z-index: 1;
          color: #797e90 !important;
          height: 280px;
          overflow: hidden;
        }
        .addinner-box {
          //background: #e8e9ed;
          background: #dbdde3;
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
          height: 220px;
          background: rgb(0 0 0 / 13%);
          overflow: hidden;
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

        .CN-breadcum {
          font-size: 12px;
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

        .CN-breadcum h1 {
          line-height: 13px;
          color: #292929;
          font-weight: 400;
          display: inline-block;
        }

        .CN-heading-1 {
          font-size: 20px;
          background: none;
          font-weight: bold;
          text-transform: uppercase;
          color: #e1261c;
          padding: 5px 0 0 10px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .CN-heading-1 .headinner {
          background: #fff;
          padding: 0 5px;
          border-bottom: 1px dotted #d7d7d7;
        }

        .CN-heading-1 .headinner span {
          color: #001d42;
        }

        .CN-heading-1 .icon {
          border: solid #000;
          border-width: 0 2px 2px 0;
          display: inline-block;
          width: 8px;
          height: 8px;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
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
        .pageContent {
          padding: 10px;
          font-size: 16px;
          line-height: 1.5;
        }

        // PROFILE NEWS PAGE
        .CN-latestStory-widget {
          padding: 0 10px;
          margin-bottom: 10px;
        }
        .CN-latestStory-widget li {
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #d7d7d7;
        }

        .CN-latestStory-widget li a {
          display: flex;
          flex-direction: row-reverse;
        }

        .CN-latestStory-widget li a .image-box {
          flex: 0 0 110px;
          margin-left: 10px;
          height: 73px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .CN-latestStory-widget li a .image-box img {
          display: block;
        }

        .CN-latestStory-widget li a p {
          font-size: 16px;
          line-height: 1.5;
          color: #0a0a0a;
        }

        .load_more {
          display: block;
          text-align: center;
          border-radius: 8px;
          width: 200px;
          color: #fff;
          text-decoration: none;
          border: 0;
          cursor: pointer;
          margin: 15px auto;
          padding: 10px 20px;
          background: #ee1b24;
          clear: both;
        }

        .CN__media--wrapper {
          background: #222222;
          padding: 10px 0;
        }

        .CN__media--wrapper .icon {
          border: solid #fff;
          border-width: 0 2px 2px 0;
        }

        .CN__media--wrapper .CN-heading-1:after {
          background: #222;
        }

        .CN__media--wrapper .headinner {
          border-bottom: 1px dotted #989898 !important;
          color: #ffcc00;
          background: #222 !important;
        }
      `}</style>
    </>
  );
};

export default IplResult;
