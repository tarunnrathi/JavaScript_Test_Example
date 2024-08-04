// import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { SeriesTabs } from "components/Cricketnext/CricketNextUtils";

const CricketProfileNews = dynamic(() => import("../../PlayerProfile/CricketProfileNews"));
const CricketSeriesResultsMobile = dynamic(() => import("./CricketSeriesResultsMobile"));
const SeriesByScheduleMobile = dynamic(() => import("../../MatchSchedule/Mobile/SeriesByScheduleMobile"));
const SeriesNewsLeadStoryMobile = dynamic(() => import("./SeriesNewsLeadStoryMobile"));
const SeriesMediaListingMobile = dynamic(() => import("./SeriesMediaListingMobile"));
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const CricketSeriesHomeMobile = (props) => {
  const { pageContent, pageAds, paramObj, seoData, seriesId } = props?.data || {};
  const { pageType, pageTypeHin, currentPath, seriesHomeUrl, seriesDisplayName, seriesBreadCrumbName, seriesName } = paramObj;
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
              <DynamicCrTopScoreWidgetWithNoSSR isMobile isIPL={props.isIpl} seriesID={seriesId?.[0] || ''}/>
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
                  [336, 280],
                ]}
              ></SiteAd> */}
               <NewSiteAd
                  width={336}
                  height={280}
                  slotId={"mobileAdNew300x250_0"}
                  adUnit={pageAds.ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280],
                  ]}
                />
            </div>
          </div>
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray}/>
          {(pageType === SeriesTabs.NEWS) && (
            <>
              <div className="CN-heading-1">
                <div className="headinner">{seriesDisplayName}<span> न्यूज</span></div>
                <div className="icon"></div>
              </div>
              <SeriesNewsLeadStoryMobile news={pageContent[0]} />
              <CricketProfileNews
                pageContent={pageContent.slice(1)}
                paginationData={paramObj}
                isSeries={true}
                isMobile={true}
                pageAds={pageAds}
              />
            </>
          )}
          {pageType === SeriesTabs.MATCH_SCHEDULE && (
            <>
              <div className="CN-heading-1">
                <div className="headinner">सीरीज शेड्यूल : <span>{seriesDisplayName}</span></div>
                <div className="icon"></div>
              </div>
              <SeriesByScheduleMobile pageContent={pageContent} />
              {seriesName !== 'ipl-2023' ? <p className="pageContent">
                क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में खेला जाता
                है. यह खेल टेस्ट, वनडे और टी20 फॉर्मेट में खेला जाता है. ये
                तीनों फॉर्मेट अलग-अलग देशों के बीच खेले जाते हैं. इसके अलावा
                भारत समेत दुनिया के तमाम देशों में ट्वेंटी20 मैचों की लीग
                होती है. इसी कारण यह खेल साल के 365 दिन और लगभग हर घंटे खेला
                जाता है. इन मैचों की विस्तार से जानकारी यहां शेड्यूल
                (Schedule) से ली जा सकती है.
              </p> : <p className="pageContent">{seoData?.meta_ipl_page_description}</p>}
            </>
          )}
          {pageType === SeriesTabs.RESULT && (
            <>
              <div className="CN-heading-1">
                <div className="headinner">सीरीज के नतीजे : <span>{seriesDisplayName}</span></div>
                <div className="icon"></div>
              </div>
              <CricketSeriesResultsMobile
                pageContent={pageContent}
                seriesName={seriesName}
              />
              {seriesName !== 'ipl-2023' ?
                <p className="pageContent">
                    क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में खेला जाता
                    है और तकरीबन हर घंटे कहीं हार और कहीं जीत होती है. अधिकतर
                    खेलों में नतीजे हार और जीत के फॉर्म में ही आते हैं. क्रिकेट
                    इस मामले में कई खेलों से अलग है. इस खेल में हार-जीत के अलावा
                    मैच टाई और ड्रॉ भी होते हैं. वनडे और टी20 फॉर्मेट में तीन
                    संभावित नतीजे हो सकते हैं- जीत, हार और टाई. टेस्ट और
                    प्रथमश्रेणी फॉर्मेट में ड्रॉ के रूप में एक और नतीजा जुड़
                    जाता है. इस तरह क्रिकेट में चार संभावित नतीजे हो सकते हैं-
                    जीत, हार, टाई और ड्रॉ. क्रिकेट मैचों के इन नतीजों (Results)
                    को यहां देखा जा सकता है.
                  </p> : <p className="pageContent">{seoData?.meta_ipl_page_description}</p>}
            </>
          )}
          {pageType === SeriesTabs.PHOTO && (
            <div className="CN__media--wrapper">
              <div className="CN-heading-1">
                <div className="headinner">लेटेस्ट फोटो गैलरी</div>
                <div className="icon"></div>
              </div>
              <SeriesMediaListingMobile
                pageContent={pageContent}
                paginationData={paramObj}
                pageAds={pageAds}
                isPhotoPage={true}
                contentType={"photogallery"}
              />
            </div>
          )}
          {pageType === SeriesTabs.VIDEO && (
            <>
              <div className="CN__media--wrapper">
                <div className="CN-heading-1">
                  <div className="headinner">लेटेस्ट वीडियो</div>
                  <div className="icon"></div>
                </div>
                <SeriesMediaListingMobile
                  pageContent={pageContent}
                  paginationData={paramObj}
                  pageAds={pageAds}
                  isVideoPage={true}
                  contentType={"videos"}
                />
              </div>
            </>
          )}
             <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
            {/* <SiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_1"
                  adUnit={pageAds.ATF_300}
                  sizes={[[300, 250], [336, 280]]}
                  lazyload={true}
              ></SiteAd> */}
              <NewSiteAd
                  width={336}
                  height={280}
                  slotId="mobileAdNew300x250_1"
                  adUnit={pageAds.ATF_300}
                  sizes={[[300, 250], [336, 280]]}
                  lazyLoad={true}
                />
            </div>
          </div>
          {/* <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              <SiteAd
                width={300}
                height={250}
                slotId={"mobileAdNew300x250_2"}
                adUnit={pageAds.BTF_300}
                sizes={[[300, 250], [336, 280]]}
                lazyload={true}
              ></SiteAd>
            </div>
          </div> */}
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

        .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer}

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

export default CricketSeriesHomeMobile;
