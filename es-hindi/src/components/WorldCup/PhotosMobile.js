import LazyLoadImage from "components/Common/CustomImage";
import useLoadMore from "hooks/useLoadMore";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false },
);

const PhotosMobile = (props) => {
  const latestData = props.data.latestStories;

  const query_arr = {
    post_type: "photogallery",
    "tags.slug": "world-cup-2023",
  };
  const { loadMore, categoryData, hasMoreData } = useLoadMore(
    latestData,
    20,
    1000,
    query_arr,
  );
  return (
    <>
      <div className="outer">
        <div className="CN-pageWrapper">
          <div className="bet__ad">
            <SiteAd
              slotId="Mobile_ScoreCard_ad"
              adUnit={props.pageAds?.scoreCard_Ad}
              sizes={[[320, 60]]}
              width={320}
              height={60}
              removeAdSpan={true}
              lazyload={true}
            />
          </div>
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
          <div className="add">
            <div className="addinner-box">
              <SiteAd
                width={336}
                height={280}
                adUnit={props?.pageAds?.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                  [250, 250],
                ]}
                lazyload={true}
              ></SiteAd>
            </div>
          </div>
          <div className="CN-section">
            <div className="CN-sec-l">
              
            <BreadcrumbCommon breadCrumbArray={[
                  { value: "NEWS18 हिंदी", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `WORLD CUP`, slug: "/world-cup/"},
                  { value: `विश्व कप 2023 फोटो गैलरी`},
              ]}/>
              {/* CN-innersection start */}

              <div className="CN-innersection">
                <div className="cn-heading-1">
                  <div className="headinner">विश्व कप 2023 फोटो गैलरी</div>
                  <div className="icon" />
                </div>
                {/*CN-videoinner START----*/}

                <div className="CN-videoinner">
                  {categoryData && categoryData.length
                    ? categoryData.map((latest, index) => (
                        <>
                          {index == 1 ? (
                            <>
                              {props.data.pageAds.ATF_300 ? (
                                <div
                                  className="ad-container add"
                                  style={{ marginBottom: "10px" }}
                                >
                                  <div className="addinner-box">
                                    <SiteAd
                                      width={336}
                                      height={280}
                                      slotId="mobileAdNew300x250_1"
                                      adUnit={props.data.pageAds.ATF_300}
                                      lazyload={true}
                                      sizes={[
                                        [300, 250],
                                        [336, 280],
                                      ]}
                                    ></SiteAd>
                                  </div>
                                </div>
                              ) : null}
                            </>
                          ) : null}
                          <div className="CN-videosec-h">
                            <div className="heading">
                              <a href={latest.weburl_r}>
                                {latest.display_headline != ""
                                  ? latest.display_headline
                                  : latest.headline}
                              </a>
                            </div>
                            <div className="image-box">
                              <a href={latest?.weburl_r}>
                                <span className="overlay"></span>
                                <span className="img-icon">
                                  <img
                                    src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Photo-Icon.svg"
                                    alt={
                                      latest.display_headline != ""
                                        ? latest.display_headline
                                        : latest.headline
                                    }
                                    title={
                                      latest.display_headline != ""
                                        ? latest.display_headline
                                        : latest.headline
                                    }
                                  />
                                </span>
                                <LazyLoadImage
                                  width={353}
                                  height={235}
                                  src={latest?.images?.url}
                                  alt={
                                    latest.display_headline != ""
                                      ? latest.display_headline
                                      : latest.headline
                                  }
                                  title={
                                    latest.display_headline != ""
                                      ? latest.display_headline
                                      : latest.headline
                                  }
                                />
                              </a>
                            </div>
                          </div>
                        </>
                      ))
                    : null}
                </div>
              </div>
              {hasMoreData && (
                <button onClick={loadMore} className="load_more">
                  Load More
                </button>
              )}
              {/*CN-videoinner END----*/}
              <p className="pageContent">
                क्रिकेट दुनिया के अधिक पसंद किए जाने वाले खेलों में एक है. ऐसे
                में वर्ल्ड कप (World Cup 2023) के दाैरान 10 टीमों से
                संबंधित सिर्फ खबर ही नहीं बल्कि खिलाड़ियाें के प्रदर्शन, टीमों के
                प्रदर्शन और एनालिसिस महत्वपूर्ण हो जाते हैं. हर दिन अधिकतम 3
                मुकाबले होने हैं. ऐसे में रोजाना कुछ ना कुछ नए रिकॉर्ड बनेंगे और
                टूटेंगे भी. वर्ल्ड कप से जुड़ी फोटो (Photos) को यहां देखा जा सकता
                है.{" "}
              </p>
              {/* CN-innersection end */}
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
            //line-height: 19px !important;
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
          padding: 0 0 0 10px;
          margin-bottom: 10px;
          border: none;
        }
        .cn-heading-1 div {
          font-size: 22px;
          line-height: 20px;
          color: #ffcc00;
          font-weight: bold;
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
          padding: 10px 10px;
          font-size: 16px;
          line-height: 1.5;
        }
        .CN-innersection {
          background: #222222;
          padding: 10px 0 0 0;
          margin-bottom: 10px;
        }
        .cn-heading-1 {
          padding: 0 0 0 10px;
          margin-bottom: 10px;
          border: none;
        }
        .cn-heading-1 div {
          font-size: 22px;
          line-height: 20px;
          color: #ffcc00;
          font-weight: bold;
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
        .CN-innersection {
          background: #222222;
          padding: 10px 0 0 0;
          margin-bottom: 10px;
        }
        .CN-videosec-h {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 10px 0;
          margin-bottom: 30px;
        }
        .CN-videosec-h::before {
          content: "";
          position: absolute;
          width: 40px;
          background: #e1261c;
          height: 6px;
          top: 0;
          left: 0;
        }
        .CN-videosec-h .heading {
          margin-bottom: 5px;
          width: auto !important;
        }
        .CN-videosec-h .heading a {
          display: block;
          font-size: 16px;
          line-height: 22px;
          font-family: "Segoe Pro bold";
          color: #fff;
        }
        .CN-videosec-h .image-box {
          position: relative;
        }
        .CN-videosec-h .image-box a {
          border-radius: 5px;
          overflow: hidden;
          border: 1px solid #707070;
        }
        .CN-videosec-h .image-box a,
        .image-box a img {
          display: block;
          width: 100%;
        }
        .CN-videosec-h .image-box .img-icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
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
          margin-bottom: 10px;
        }
        .addinner-box {
          background: #fff;
        }
        .bet__ad, .add {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default PhotosMobile;
