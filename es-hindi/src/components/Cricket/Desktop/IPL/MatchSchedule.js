import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { IPL_YEAR } from "includes/ipl.helper";
const MatchScheduleList = dynamic(() =>
  import("components/Cricket/Desktop/IPL/MatchScheduleList")
);
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
const DynamicRHSWithNoSSR = dynamic(
  () => import("components/Cricketnext/home/RHS"),
  { ssr: false }
);
const MatchSchedule = (props) => {
  const { pageContent, pageAds, paramObj, seoData } = props?.data;
  const {
    pageTypeHin,
    seriesDisplayName,
  } = paramObj;
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="CN-pageOutter CN-Desktop-HomeOuter">
        <div className="CN-pageWrapper">
          <div className="CN-pageCN-scoreCardsection">
            <SiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={props.pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}
              lazyload={true}
            />
            <div className="CN-scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR isIPL={props.isIpl} />
            </div>
          </div>
          <div className="CN-section">
            <div className="CN-sec-l">
              
			        <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `IPL ${IPL_YEAR}`, slug: "/cricket/ipl/"},
                  { value: pageTypeHin},
                ]}
                isCapitalize={true}/>
              <div className="section__heading">
                <h1>
                  सीरीज शेड्यूल :{" "}
                  <b className="section__heading--sub">
                    {seriesDisplayName}
                  </b>
                </h1>
              </div>
              {
                pageContent && pageContent?.match?.length > 0 ? (
                  <MatchScheduleList pageContent={pageContent} />
                ) : (
                  <p style={{ textAlign: "center" }}>
                    No results found matching this criteria
                  </p>
                )
              }
              <p className="pageContent" dangerouslySetInnerHTML={{
                          __html: seoData?.meta_ipl_page_description
                        }}
                       ></p>
              <div className="middlead">
                <SiteAd
                  width={728}
                  height={90}
                  slotId={"Desktop_Static_Ad_1"}
                  adUnit={pageAds?.BTF_728}
                  sizes={[[728, 90]]}
                  loadonScroll={true}
                ></SiteAd>
              </div>
              <Taboola
                  mode={TaboolaList.category.bottom.mode}
                  id={TaboolaList.category.bottom.id}
                  container={TaboolaList.category.bottom.container}
                  placement={TaboolaList.category.bottom.placement}
          />
            </div>
            <div className="CN-sec-r">
                <DynamicRHSWithNoSSR
                  isIPL={true}
                  position={"first"}
                  pageAds={props.pageAds}
                  taboola ={true}
                  taboolaList={TaboolaList.category}
                />
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .middlead {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 20px auto 10px auto;
          min-height: 20px;
          width: max-content !important;
          background: #eee !important;
          color: #444 !important;
          font-size: 12px !important;
          text-align: center !important;
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
        .CN-section .CN-sec-l {
          width: 924px;
          min-width: 924px;
        }
        .CN-section .CN-sec-r {
          width: 300px;
          min-width: 300px;
        }
        .CN-section {
          display: flex;
          justify-content: space-between;
          font-family: "Mukta", sans-serif;
        }
        .section__heading {
          border-bottom: 3px solid #e1261d;
          margin-bottom: 10px;
        }
        .section__heading h1 {
          font-size: 22px;
          line-height: 20px;
          color: #e1261d;
          background: #fff;
          position: relative;
          top: 10px;
          padding-right: 4px;
          display: inline-block;
          text-transform: uppercase;
          font-weight: bold;
          border-bottom: 1px solid transparent;
        }
        .section__heading--text {
          background: #f5f5f5 !important;
        }
        .section__heading--sub {
          color: #001d42;
        }
        .CN-breadcum {
          font-family: "Mukta", sans-serif !important;
          font-size: 14px;
          line-height: 13px;
          color: #292929;
          text-transform: uppercase;
          padding: 4px 0;
          border-bottom: 1px dotted #939393;
          margin-bottom: 5px;
        }
        .CN-breadcum h1 {
          display: inline-block;
          font-size: 14px;
          line-height: 13px;
          font-weight: normal;
        }
        // PROFILE NEWS PAGE
        .CN-latestStory-widget {
          display: grid;
          grid-template-columns: 217px 217px 217px 217px;
          column-gap: 19px;
          row-gap: 19px;
          padding-bottom: 15px;
          margin-bottom: 10px;
          border-bottom: 1px solid #d8d8d8;
        }
        .removeGridLayout {
          grid-template-columns: 1fr;
        }
        .CN-latestStory-widget li {
          border-bottom: 1px #939393 dotted;
          padding-bottom: 10px;
        }
        .CN-latestStory-widget li a {
          display: block;
        }
        .CN-latestStory-widget li a .image-box img {
          display: block;
          width: 100%;
        }
        .CN-latestStory-widget li a .image-box {
          position: relative;
        }
        .image-box .article__icon {
          width: 30px;
          position: absolute;
          right: 4px;
          top: 4px;
          z-index: 3;
        }
        .CN-latestStory-widget li a p {
          font-size: 16px;
          line-height: 24px;
          font-weight: bold;
          margin-bottom: 0px;
          color: #292929;
        }
        .load_more {
          display: block;
          text-align: center;
          background: #bababa;
          border-radius: 8px;
          width: 200px;
          color: #fff;
          text-decoration: none;
          border: 0;
          cursor: pointer;
          margin: 20px auto 0 auto;
          padding: 10px 20px;
          transition: all 0.3s ease-in-out;
          clear: both;
        }
        .load_more:hover {
          background: #ee1b24;
        }
        .pageContent {
          font-size: 16px;
          line-height: 1.5;
          margin-top: 10px;
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
export default MatchSchedule;