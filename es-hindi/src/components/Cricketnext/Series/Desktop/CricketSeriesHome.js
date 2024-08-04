// import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { SeriesTabs } from "components/Cricketnext/CricketNextUtils";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

const CricketProfileNews = dynamic(() =>
  import("components/Cricketnext/PlayerProfile/CricketProfileNews")
);
const CricketSeriesResults = dynamic(() => import("./CricketSeriesResults"));
const SeriesBySchedule = dynamic(() =>
  import("components/Cricketnext/MatchSchedule/Desktop/SeriesBySchedule")
);
const SeriesNewsWidget = dynamic(() => import("./SeriesNewsWidget"));

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
const DynamicScoreRHSWithNoSSR = dynamic(
  () => import("components/Cricketnext/Cards/ScoreRHS"),
  { ssr: false }
);
const DynamicRHSWithNoSSR = dynamic(
  () => import("components/Cricketnext/home/RHS"),
  { ssr: false }
);

import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const CricketSeriesHome = (props) => {
  const { pageContent, pageAds, paramObj, seoData, seriesId } = props?.data || {};
  const {
    pageType,
    pageTypeHin,
    currentPath,
    seriesHomeUrl,
    seriesDisplayName,
    seriesBreadCrumbName,
    seriesName,
  } = paramObj;
  let breadCrumbArray = [
    { value: "NEWS18 हिंदी", slug: "/"},
    { value: "क्रिकेट", slug: "/cricket/"},
  ];
  if(seriesName === "ipl-2023") {
    breadCrumbArray.push(
      { value: `IPL 2023`, slug: "/cricket/ipl/"},
    )
    breadCrumbArray.push(
      { value: pageTypeHin},
    )
  } else {
    pageType !== SeriesTabs.NEWS && breadCrumbArray.push(
      { value: `SERIES`, slug: seriesHomeUrl},
    )
    breadCrumbArray.push(
      { value: seriesBreadCrumbName},
    )
    
  }
  
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
            {/* <SiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={props.pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}
              lazyload={true}
            /> */}
            <NewSiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={props.pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}
              lazyLoad={true}
              />
            <div className="CN-scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR isIPL={props.isIpl} seriesID={seriesId?.[0] || ''} />
            </div>
          </div>
          <div className="CN-section">
            <div className="CN-sec-l">
              
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray}/>
              {pageType === SeriesTabs.NEWS && (
                <>
                  <SeriesNewsWidget
                    pageContent={pageContent.slice(0, 6)}
                    seriesDisplayName={seriesDisplayName}
                  />
                  <div className="section__heading">
                    <span>लेटेस्ट क्रिकेट न्यूज</span>
                  </div>
                  <CricketProfileNews
                    pageContent={pageContent.slice(6)}
                    paginationData={paramObj}
                    isSeries={true}
                  />
                </>
              )}
              {pageType === SeriesTabs.MATCH_SCHEDULE && (
                <>
                  <div className="section__heading">
                    <span>
                      सीरीज शेड्यूल :{" "}
                      <b className="section__heading--sub">
                        {seriesDisplayName}
                      </b>
                    </span>
                  </div>
                  <SeriesBySchedule pageContent={pageContent} />
                  {seriesName !== "ipl-2023" ? (
                    <p className="pageContent">
                      क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में खेला जाता
                      है. यह खेल टेस्ट, वनडे और टी20 फॉर्मेट में खेला जाता है.
                      ये तीनों फॉर्मेट अलग-अलग देशों के बीच खेले जाते हैं. इसके
                      अलावा भारत समेत दुनिया के तमाम देशों में ट्वेंटी20 मैचों
                      की लीग होती है. इसी कारण यह खेल साल के 365 दिन और लगभग हर
                      घंटे खेला जाता है. इन मैचों की विस्तार से जानकारी यहां
                      शेड्यूल (Schedule) से ली जा सकती है.
                    </p>
                  ) : (
                    <p className="pageContent">
                      {seoData?.meta_ipl_page_description}
                    </p>
                  )}
                </>
              )}
              {pageType === SeriesTabs.RESULT && (
                <>
                  <div className="section__heading">
                    <span>
                      सीरीज के नतीजे:{" "}
                      <b className="section__heading--sub">
                        {seriesDisplayName}
                      </b>
                    </span>
                  </div>
                  <CricketSeriesResults
                    pageContent={pageContent}
                    seriesName={seriesName}
                  />
                  {seriesName !== "ipl-2023" ? (
                    <p className="pageContent">
                      क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में खेला जाता
                      है और तकरीबन हर घंटे कहीं हार और कहीं जीत होती है. अधिकतर
                      खेलों में नतीजे हार और जीत के फॉर्म में ही आते हैं.
                      क्रिकेट इस मामले में कई खेलों से अलग है. इस खेल में
                      हार-जीत के अलावा मैच टाई और ड्रॉ भी होते हैं. वनडे और टी20
                      फॉर्मेट में तीन संभावित नतीजे हो सकते हैं- जीत, हार और
                      टाई. टेस्ट और प्रथमश्रेणी फॉर्मेट में ड्रॉ के रूप में एक
                      और नतीजा जुड़ जाता है. इस तरह क्रिकेट में चार संभावित
                      नतीजे हो सकते हैं- जीत, हार, टाई और ड्रॉ. क्रिकेट मैचों के
                      इन नतीजों (Results) को यहां देखा जा सकता है.
                    </p>
                  ) : (
                    <p className="pageContent">
                      {seoData?.meta_ipl_page_description}
                    </p>
                  )}
                </>
              )}
              {pageType === SeriesTabs.PHOTO && (
                <>
                  <div className="section__heading">
                    <span>लेटेस्ट फोटो गैलरी</span>
                  </div>
                  <CricketProfileNews
                    pageContent={pageContent}
                    paginationData={paramObj}
                    isSeries={true}
                    isPhotoPage={true}
                    contentType={"photogallery"}
                  />
                </>
              )}
              {pageType === SeriesTabs.VIDEO && (
                <>
                  <div className="section__heading">
                    <span>लेटेस्ट वीडियो</span>
                  </div>
                  <CricketProfileNews
                    pageContent={pageContent}
                    paginationData={paramObj}
                    isSeries={true}
                    isVideoPage={true}
                    contentType={"videos"}
                  />
                </>
              )}
              <div className="middlead">
                {/* <SiteAd
                  width={728}
                  height={90}
                  slotId={"Desktop_Static_Ad_1"}
                  adUnit={pageAds?.BTF_728}
                  sizes={[[728, 90]]}
                  loadonScroll={true}
                ></SiteAd> */}
                <NewSiteAd
                  width={728}
                  height={90}
                  slotId={"Desktop_Static_Ad_1"}
                  adUnit={pageAds?.BTF_728}
                  sizes={[[728, 90]]}
                  loadOnScroll={true}
                />
              </div>
              <div className="outbrain_row">
              <Taboola
                mode={TaboolaList.category.bottom.mode}
                id={TaboolaList.category.bottom.id}
                container={TaboolaList.category.bottom.container}
                placement={TaboolaList.category.bottom.placement}
              />
              </div>
            </div>

            <div className="CN-sec-r">
              {props.isIpl ? (
                <DynamicRHSWithNoSSR
                  isIPL={true}
                  position={"first"}
                  pageAds={props.pageAds}
                  taboola ={true}
                  taboolaList={TaboolaList.category}
                />
              ) : (
                <DynamicScoreRHSWithNoSSR
                  pageAds={props.pageAds}
                  isIpl=""
                  isT20=""
                  recent=""
                  upcoming=""
                  url={currentPath}
                  predictorData=""
                  taboola ={true}
                  taboolaList={TaboolaList.category}
                />
              )}
              {typeof pageAds !== "undefined" &&
              typeof pageAds.PG_Slider_1x1 !== "undefined" ? (
                // <SiteAd
                //   slotId="PG_Slider_1x1"
                //   adUnit={pageAds.PG_Slider_1x1}
                //   sizes={[[1, 1]]}
                //   removeAdSpan={true}
                //   loadonScroll={true}
                // />
                <NewSiteAd
                  slotId="PG_Slider_1x1"
                  adUnit={pageAds.PG_Slider_1x1}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}
                />
              ) : null}
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

        // FOR HEADER TITLE SIDE LINE
        .nhlogo {
          border-right: 1px solid #374a47;
          margin-right: 15px;
        }

        .n18nheader + div {
          position: sticky;
          top: 0;
          z-index: 5;
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

        .section__heading span {
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

        .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer}

        .load_more:hover {
          background: #ee1b24;
        }

        .pageContent {
          font-size: 16px;
          line-height: 1.5;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default CricketSeriesHome;
