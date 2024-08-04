import LazyLoadImage from "components/Common/CustomImage";
import useLoadMore from "hooks/useLoadMore";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false },
);

const NewsMobile = (props) => {
  const worldCupNews = props?.data?.latestStories || [];
  const firstStory = (worldCupNews || []).slice(0, 1);
  const latestData = (worldCupNews || []).slice(1, 1000);

  const query_arr = { post_type: "text", "tags.slug": "world-cup-2023" };
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
                  { value: `विश्व कप 2023 समाचार`},
              ]}/>
              {/* CN-innersection start */}
              <div className="CN-innersection">
                <div className="cn-heading-1">
                  <div className="headinner">
                    विश्व कप 2023 <span>समाचार</span>
                  </div>
                  <div className="icon"></div>
                </div>
                {/*CN-listing-wrap-Mobile START----*/}
                {/* CN-LeadStory start */}
                {firstStory && firstStory.length ? (
                  <div className="CN-LeadStory">
                    <h2 className="CN-LeadHead">
                      <a href={firstStory[0]["weburl_r"]}>
                        {firstStory[0]["display_headline"] != ""
                          ? firstStory[0]["display_headline"]
                          : firstStory[0]["headline"]}
                      </a>
                    </h2>
                    <a href={firstStory[0]["weburl_r"]}>
                      <LazyLoadImage
                        height="240"
                        width="360"
                        src={firstStory[0]?.images?.url}
                        alt={
                          firstStory[0]["display_headline"] != ""
                            ? firstStory[0]["display_headline"]
                            : firstStory[0]["headline"]
                        }
                        title={
                          firstStory[0]["display_headline"] != ""
                            ? firstStory[0]["display_headline"]
                            : firstStory[0]["headline"]
                        }
                      />
                    </a>
                  </div>
                ) : null}
                {/* CN-LeadStory end */}
                {/* CN-Thumbstory-2 end */}
                <div>
                  <ul className="CN-Thumbstory-2">
                    {categoryData && categoryData.length
                      ? categoryData.map((latest, index) => (
                          <>
                            {index == 2 ? (
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
                            <li key={`map_${index}`}>
                              <a href={latest.weburl_r}>
                                <div className="text">
                                  <p>
                                    {latest.display_headline != ""
                                      ? latest?.display_headline
                                      : latest?.headline}
                                  </p>
                                </div>
                                <div className="imgwrap">
                                  <LazyLoadImage
                                    height="73"
                                    width="110"
                                    src={latest?.images?.url}
                                    alt={
                                      latest?.display_headline != ""
                                        ? latest?.display_headline
                                        : latest?.headline
                                    }
                                    title={
                                      latest?.display_headline != ""
                                        ? latest?.display_headline
                                        : latest?.headline
                                    }
                                  />
                                </div>
                              </a>
                            </li>
                          </>
                        ))
                      : null}
                  </ul>
                </div>
                {hasMoreData && (
                  <button onClick={loadMore} className="load_more">
                    Load More
                  </button>
                )}
                {/* CN-Thumbstory-2 end */}
                {/*CN-listing-wrap-Mobile END----*/}
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
              {/* CN-innersection end */}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .mobinner-ad {
          display: none;
        }
        .adbox {
          display: none;
        }
        @media (max-width: 768px) {
          .mobinner-ad {
            display: block;
          }
          .inner-ad {
            display: none;
          }
          .wrap-ad {
            display: none;
          }
          .adbox {
            background: #dbdde3 !important;
            padding: 16px 0;
            position: relative;
            display: block;
          }
        }
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
          padding: 10px 10px;
          font-size: 16px;
          line-height: 1.5 !important;
        }
        .CN-LeadStory {
          margin-bottom: 10px;
        }
        .CN-LeadStory .CN-LeadHead {
          font-size: 20px;
          line-height: 24px;
          background: none;
          padding: 10px;
          font-weight: bold;
          position: relative;
        }
        .CN-LeadStory .CN-LeadHead a {
          line-height: 24px;
          color: #001d42;
        }
        .CN-LeadStory figure {
          height: 240px;
          overflow: hidden;
        }
        .CN-LeadStory figure a {
          display: block;
          position: relative;
        }
        .CN-LeadStory figure a img {
          width: 100%;
          display: block;
        }
        .CN-Thumbstory-2 {
          padding: 0 10px;
        }
        .CN-Thumbstory-2 li {
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #d7d7d7;
        }
        .CN-Thumbstory-2 li {
          min-height: 85px;
        }
        .CN-Thumbstory-2 li a {
          display: flex;
          justify-content: space-between;
        }
        .CN-Thumbstory-2 li a .text p {
          font-size: 16px;
          line-height: 1.5;
        }
        .CN-Thumbstory-2 li a .imgwrap {
          flex: 0 0 110px;
          margin-left: 10px;
          height: 73px;
          overflow: hidden;
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .CN-Thumbstory-2 li a .imgwrap img {
          display: block;
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
          margin-top: 14px;
          margin-bottom: 10px;
        }
        .bet__ad, .add {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default NewsMobile;
