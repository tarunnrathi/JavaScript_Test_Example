import LazyLoadImage from "components/Common/CustomImage";
import CricketTweet from "widgets/Common/Responsive/CricketTweet";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import useLoadMore from "hooks/useLoadMore";
import dynamic from "next/dynamic";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false },
);

const News = (props) => {
  const worldCupNews = props?.data?.latestStories || [];

  const query_arr = { post_type: "text", "tags.slug": "world-cup-2023" };
  const dataLength = 1000;
  const { loadMore, categoryData, hasMoreData } = useLoadMore(
    worldCupNews,
    20,
    dataLength,
    query_arr,
  );
  return (
    <>
      <div className="outer">
        <div className="CN-pageWrapper">
          <div
            id="topScoreWidget_data"
            style={{
              minHeight: 115,
              background: "rgb(0 0 0 / 13%)",
              marginBottom: 15,
            }}
          >
            <DynamicCrTopScoreWidgetWithNoSSR seriesID={5612} />
          </div>
          <div
              style={{
                minHeight: "60px",
                background: "#00000021",
                marginTop: "10px",
              }}
            >
              <SiteAd
                slotId="Desktop_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[1244, 60]]}
                width={1244}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              />
          </div>
          <div className="CN-section">
            <div className="CN-sec-l">
              
            <BreadcrumbCommon breadCrumbArray={[
                  { value: "NEWS18 हिंदी", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `WORLD CUP`, slug: "/world-cup/"},
                  { value: `विश्व कप 2023 समाचार`},
              ]}/>
              <div className="CN-innersection">
                <div className="cn-heading-1">
                  <div className="headinner"> विश्व कप 2023 समाचार</div>
                  <div className="icon" />
                </div>
                {/*CN-listing-wrap START----*/}

                <ul className="CN-listing-wrap">
                  {categoryData?.map((news) => (
                    <li className="CN-list-box">
                      <a href={`${news?.weburl_r}`}>
                        <div className="image-wrap">
                          <LazyLoadImage
                            src={`${news?.images?.url}`}
                            alt={`${news?.display_headline}`}
                            title={`${news?.display_headline}`}
                            width={216}
                            height={144}
                          />
                        </div>
                        <div className="content-box">
                          <p className="discription">
                            {news?.display_headline}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                {/*CN-listing-wrap END----*/}
                {hasMoreData && (
                  <button onClick={loadMore} className="load_more">
                    Load More
                  </button>
                )}
                <p className="pageContent">
                  क्रिकेट दुनिया के अधिक पसंद किए जाने वाले खेलों में एक है. ऐसे
                  में वर्ल्ड कप (World Cup 2023) के दाैरान 10 टीमों से संबंधित
                  सिर्फ खबर ही नहीं बल्कि खिलाड़ियाें के प्रदर्शन, टीमों के
                  प्रदर्शन और एनालिसिस महत्वपूर्ण हो जाते हैं. हर दिन अधिकतम 3
                  मुकाबले होने हैं. ऐसे में रोजाना कुछ ना कुछ नए रिकॉर्ड बनेंगे
                  और टूटेंगे भी. वर्ल्ड कप से जुड़ी न्यूज (News) को यहां देखा जा
                  सकता है.{" "}
                </p>
              </div>
            </div>
            <div className="CN-sec-r">
              <SiteAd
                slotId="cn-add-section-1"
                adUnit={props?.pageAds?.ATF_300_id}
                lazyload={true}
                sizes={[[300, 250]]}
                width={300}
                height={250}
                removeAdSpan
              />

              <div className="cn-add-section-2" style={{ minHeight: 600 }}>
                <div className="vsp20"></div>
                <CricketTweet />
              </div>
              {props?.pageAds?.BTF_300_id && (
                <div style={{ marginTop: "10px" }}>
                  <SiteAd
                    slotId="cn-add-section-2"
                    adUnit={props?.pageAds?.BTF_300_id}
                    sizes={[
                      [300, 250],
                      [336, 280],
                      [300, 600],
                    ]}
                    width={300}
                    height={250}
                    lazyload={true}
                    removeAdSpan
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .outer {
          max-width: 1244px;
          margin: 0 auto;
          padding: 0;
          clear: both;
          overflow: hidden;
        }
        body .CN-pageWrapper > div {
          margin-bottom: 0px !important;
        }
        body .CN-section,
        body .CN-section * {
          font-family: "Mukta", sans-serif !important;
        }
        .CN-section {
          display: flex;
          justify-content: space-between;
        }
        .CN-section .CN-sec-l {
          width: 924px;
          min-width: 924px;
        }
        .CN-breadcum {
          font-size: 14px;
          padding: 4px 0;
          background: none;
          border-bottom: 1px dotted #939393;
          margin-bottom: 10px;
          line-height: 13px;
          color: #292929;
          text-transform: uppercase;
        }
        .CN-breadcum h1,
        .CN-breadcum h2 {
          display: inline-block;
        }
        .CN-breadcum h1 {
          font-size: 14px;
          font-weight: 400;
          font-family: "Mukta", sans-serif !important;
        }
        .newadd {
          background: #efefef;
          line-height: 0;
          display: table;
          margin: auto;
        }
        .newadd span {
          display: block;
          font-size: 12px;
          color: #8e8e8e;
          text-align: center;
          height: 20px;
          line-height: 20px;
          width: 100%;
        }
        .adbox {
          background: #dbdde3 !important;
          padding: 16px 0;
          position: relative;
        }
        .vsp20 {
          margin-top: 20px;
        }
        @media (max-width: 768px) {
          * {
            padding: 0;
            margin: 0;
            list-style: none;
            box-sizing: border-box;
            text-decoration: none;
            line-height: 19px !important;
            border-collapse: collapse;
          }
          body {
            font-family: "Mukta", sans-serif !important;
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 19px;
            font-weight: 400;
          }
          .outer {
            width: 100%;
            display: block;
            overflow: auto !important;
          }
          .CN-section {
            display: block !important;
            width: 100%;
          }
          .CN-section .CN-sec-l {
            width: 100% !important;
            min-width: auto !important;
          }
          .CN-breadcum {
            font-size: 13px;
            height: 34px;
            background: none;
            border-top: none;
            border-bottom: 1px dashed rgb(147 147 147 / 57%);
            display: flex;
            overflow: scroll;
            padding: 8px 10px 5px 10px;
            margin-bottom: 0;
            line-height: 1.4;
          }
          .CN-breadcum a {
            padding: 0 4px;
            flex-shrink: 0;
          }
          body .CN-breadcum a span {
            padding: 0 4px 0 0;
          }
          body .CN-breadcum h1,
          body .CN-breadcum h2 {
            font-size: 13px;
            line-height: 19px;
            flex-shrink: 0;
          }
          .CN-sec-r {
            display: none;
          }
        }
        .cn-heading-1 {
          border-bottom: 3px solid #e1261d;
          margin-bottom: 10px;
        }
        .cn-heading-1 div {
          font-size: 22px;
          line-height: 20px;
          color: #e1261d;
          font-weight: bold;
          background: #fff;
          position: relative;
          top: 8px;
          padding-right: 4px;
          display: inline-block;
          text-transform: uppercase;
        }
        .cn-heading-1 div span {
          color: #001d42 !important;
          top: 0;
        }
        .pageContent {
          font-size: 16px;
          line-height: 1.5;
          margin-top: 10px;
        }
        @media (max-width: 768px) {
          .cn-heading-1 {
            padding: 0 0 0 10px;
            margin-bottom: 10px;
            border: none;
          }
          .CN-schedule-main {
            padding: 0 10px;
          }
          .pageContent {
            padding: 10px 10px;
            font-size: 16px;
            line-height: 1.5;
          }
        }
        .CN-listing-wrap {
          display: grid;
          grid-template-columns: 216px 216px 216px 216px;
          column-gap: 19px;
          row-gap: 19px;
          border-bottom: 1px solid #d8d8d8;
          padding-bottom: 20px;
        }
        .CN-listing-wrap li {
          border-bottom: 1px #939393 dotted;
          padding-bottom: 10px;
        }
        .CN-listing-wrap li a {
          display: block;
        }
        .CN-listing-wrap .image-wrap,
        .CN-latestStory-widget li .image-box {
          height: 144px;
          overflow: hidden;
        }
        .CN-listing-wrap .image-wrap {
          position: relative;
        }
        .CN-listing-wrap .image-wrap img {
          display: block;
          width: 100%;
        }
        .CN-listing-wrap li a .content-box {
          margin-bottom: 0px;
          margin-top: 7px;
        }
        .CN-listing-wrap li a .content-box .discription {
          font-size: 16px;
          line-height: 24px;
          font-weight: bold;
          margin-bottom: 0px;
          color: #292929;
        }
        .CN-section .CN-sec-r {
          width: 300px;
          min-width: 300px;
        }
        .inner-ad {
          margin-top: 42px;
        }
        .load_more {
          width: 130px;
          height: 38px;
          background: #ed1c24;
          border-radius: 19px;
          font-size: 17px;
          color: #ffffff;
          line-height: 38px;
          border: none;
          display: table;
          margin: auto;
          cursor: pointer;
          margin-bottom: 14px;
        }
        .CN-scoreCardsection {          
          overflow: hidden;
          position: relative;
          margin-bottom: 10px;
          font-family: "Mukta",sans-serif;
          background: #f5f5f5;
          padding: 0 15px;
          height: 140px;
        }
        .CN-scoreCard .slick-prev::before {
          content: "";
          border-top: 2px solid#909090;
          border-left: 2px solid#909090;
          width: 8px;
          height: 8px;
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
          position: absolute;
          left: 10px !important;
          top: 3px;
        }
        .CN-scoreCard .slick-next::before{right: 12px !important;}
        .CN-scoreCard .slick-track .teamscoreWrap{padding: 7px 0 12px !important;}
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .text .runrate {
          font-size: 10px !important;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .text .score-2 {
          font-size: 16px !important;
        }
        .lazyload-wrapper {
          margin: 0px 0px 10px 0px;
        }
      `}</style>
    </>
  );
};

export default News;
