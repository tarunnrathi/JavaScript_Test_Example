import LazyLoadImage from "components/Common/CustomImage";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { t20_world_cup_year } from "api/Constant";
import { getArticleList } from "api/global/Common";
import { useState } from "react";
import dynamic from "next/dynamic";
const RhsPhoto = dynamic(() => import("widgets/Common/Desktop/RhsPhoto"));
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const News = (props) => {
  const [loadMoreData, setLoadMoreData] = useState(props?.data?.latestStories?.length > 0 ? props?.data?.latestStories : 0);
  const [hideLoadMore, setHideLoadMore] = useState(false);
  const loadMore = async () => {
    let tempData = await getArticleList({
      count: 20,
      offset: loadMoreData?.length > 0 ? loadMoreData?.length : 0,
      filter: { post_type: "text", 'tags.slug': `icc-t20-world-cup` },
      fields: 'display_headline,weburl_r,images,weburl',
    }, true);
    if (tempData?.length === 0) {
      setHideLoadMore(true);
    }
    setLoadMoreData([...loadMoreData, ...tempData]);
  }
  return (
    <>
      <div className="outer">
        <div className="CN-pageWrapper">
          {/* {!props.isMobile && (
            <div style={{ minHeight: "60px", background: "#00000021", marginTop: "10px" }}>
              <SiteAd
                slotId="Desktop_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[1244, 60]]}
                width={1244}
                height={60}
                removeAdSpan={true}
                lazyload={false}
              />
            </div>
          )} */}
          {/* <div
            style={{
              height: "160px",
              overflow: "hidden",
              padding: "0 10px",
            }}
          > */}
            <DynamicCrTopScoreWidgetWithNoSSR isT20={true} />
          {/* </div> */}
          <div className="CN-section">
            <div className="CN-sec-l">
              <BreadcrumbCommon breadCrumbArray={[
                { value: "हिंदी समाचार", slug: "/" },
                { value: "क्रिकेट", slug: "/cricket/" },
                { value: `ICC T20 World Cup ${t20_world_cup_year}`, slug: "/cricket/icc-t20-world-cup/" },
                { value: `T20 World Cup न्यूज़` },
              ]} />
              <div className="CN-innersection">
                <div className="cn-heading-1">
                  <div className="headinner"><h1>T20 World Cup {t20_world_cup_year}  <span>News</span></h1></div>
                  <div className="icon" />
                </div>
                {/*CN-listing-wrap START----*/}

                <ul className="CN-listing-wrap">
                  {loadMoreData?.length > 0 && loadMoreData?.map((item, index) => {
                    return (
                      <li className="CN-list-box" key={index}>
                        <a href={item?.weburl_r}>
                          <div className="image-wrap">
                            <LazyLoadImage
                              src={item?.images.url}
                              width={216}
                              height={144}
                              alt={item?.display_headline}
                              isLazyLoad={true}
                            />
                          </div>
                          <div className="content-box">
                            <p className="discription">
                              {item?.display_headline}
                            </p>
                          </div>
                        </a>
                      </li>
                    )
                  })}
                </ul>
                {!hideLoadMore && (
                  <button type="button" onClick={loadMore} className="load_more">
                    Load More
                  </button>
                )}

                {/*CN-listing-wrap END----*/}
                <p className="pageContent">
                  क्रिकेट दुनिया के अधिक पसंद किए जाने वाले खेलों में एक है. ऐसे
                  में टी20 वर्ल्ड कप (T20 World Cup {t20_world_cup_year}) के दाैरान 16 टीमों से
                  संबंधित सिर्फ खबर ही नहीं बल्कि खिलाड़ियाें के प्रदर्शन, टीमों
                  के प्रदर्शन और एनालिसिस महत्वपूर्ण हो जाते हैं. हर दिन अधिकतम
                  3 मुकाबले होने हैं. ऐसे में रोजाना कुछ ना कुछ नए रिकॉर्ड
                  बनेंगे और टूटेंगे भी. वर्ल्ड कप से जुड़ी न्यूज (News) को यहां
                  देखा जा सकता है.{" "}
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

              {!props?.isMobile && <div className="cn-add-section-2" style={{ minHeight: 519 }}>
                <div className="vsp20"></div>
                <RhsPhoto photoStories={props?.data?.photoStories} isPhoto={false} />
              </div>}
              {props?.pageAds?.BTF_300_id && (
                <div style={{ marginTop: '10px' }}>
                  <SiteAd
                    slotId="cn-add-section-2"
                    adUnit={props?.pageAds?.BTF_300_id}
                    sizes={[
                      [300, 250],
                      [336, 280],
                      [300, 600]
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
          <Taboola
            mode={TaboolaList.articlePage.bottom.mode}
            id={TaboolaList.articlePage.bottom.id}
            container={TaboolaList.articlePage.bottom.container}
            placement={TaboolaList.articlePage.bottom.placement}
          />
        </div>
      </div>
      <style jsx global>{`
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
        margin-top: 35px;
      }
      .headinner h1 {
        font-size: ${props?.isMobile ? "22px" : "26px"};
        line-height: 25px;
      } 
        .outer { max-width: 1244px; margin: 0 auto;padding: 0;clear: both;overflow: hidden;}
        body .CN-pageWrapper > div {margin-bottom: 0px!important;}
        body .CN-section, body .CN-section * {font-family: 'Mukta',sans-serif !important;}
        .CN-section {display: flex;justify-content: space-between;}
        .CN-section .CN-sec-l {	width: 924px;min-width: 924px;}
        .CN-breadcum {font-size: 14px;padding: 4px 0;background: none;border-bottom: 1px dotted #939393;margin-bottom: 10px;line-height: 13px;color: #292929;text-transform: uppercase;}
        .CN-breadcum h1, .CN-breadcum h2 {display: inline-block;}
        .CN-breadcum h1 {font-size: 14px;font-weight: 400;font-family: 'Mukta',sans-serif !important;}
        .newadd{background: #efefef;line-height: 0; display: table; margin: auto;}
        .newadd span{display: block;font-size: 12px;color: #8E8E8E;text-align: center;height: 20px;line-height: 20px;width: 100%;}
        .adbox {
          background: #dbdde3!Important;
          padding: 16px 0;
          position: relative;
        }
        .vsp20 {margin-top: 20px;}
        @media (max-width:768px){
          * { padding: 0; margin: 0; list-style: none; box-sizing: border-box; text-decoration: none; line-height: 19px !important; border-collapse: collapse; } body { font-family: 'Mukta',sans-serif!important; margin: 0; padding: 0; font-size: 13px; line-height: 19px; font-weight: 400; } .outer { width: 100%; display: block; overflow: auto !important; } .CN-section{display: block !important;width: 100%;} .CN-section .CN-sec-l { width: 100% !important; min-width: auto !important; } 
          .CN-breadcum { font-size: 13px; height: 34px; background: none; border-top: none; border-bottom: 1px dashed rgb(147 147 147 / 57%); display: flex; overflow: scroll; padding: 8px 10px 5px 10px; margin-bottom: 0;    line-height: 1.4; } .CN-breadcum a { padding: 0 4px; flex-shrink: 0; } body .CN-breadcum a span { padding: 0 4px 0 0; } body .CN-breadcum h1, body .CN-breadcum h2 { font-size: 13px; line-height: 19px; flex-shrink: 0; }
          .CN-sec-r {display: none;}
        }	
        .cn-heading-1 {border-bottom: 3px solid #e1261d;margin-bottom: 10px;}
						.cn-heading-1 div {font-size: 22px;line-height: 20px;color: #e1261d;font-weight: bold;background: #fff;	position: relative;	top: 8px;padding-right: 4px;display: inline-block;text-transform: uppercase;}
						.cn-heading-1 div span {color: #001D42!important;top: 0;}
						.pageContent {font-size: 16px;line-height: 1.5; margin-top: 10px;}
						@media (max-width:768px){
							.cn-heading-1{padding: 0 0 0 10px; margin-bottom: 10px; border: none;}
							.CN-schedule-main {padding: 0 10px;}
							.pageContent {padding: 10px 10px;font-size: 16px;line-height: 1.5;}
						}
            .CN-listing-wrap { display: grid; grid-template-columns: 216px 216px 216px 216px; column-gap: 19px; row-gap: 19px; border-bottom: 1px solid #d8d8d8; padding-bottom: 20px; } .CN-listing-wrap li { border-bottom: 1px #939393 dotted; padding-bottom: 10px; } .CN-listing-wrap li a { display: block; } .CN-listing-wrap .image-wrap, .CN-latestStory-widget li .image-box { height: 144px; overflow: hidden; } .CN-listing-wrap .image-wrap { position: relative; } .CN-listing-wrap .image-wrap img { display: block; width: 100%; } .CN-listing-wrap li a .content-box { margin-bottom: 0px; margin-top: 7px; } .CN-listing-wrap li a .content-box .discription { font-size: 16px; line-height: 24px; font-weight: bold; margin-bottom: 0px; color: #292929; }
            .CN-section .CN-sec-r { width: 300px;min-width: 300px;}
            .inner-ad{margin-top:42px;}
            .CN-scoreCardsection {
              background: #f5f5f5;
              padding: 0 15px;
          }
			`}</style>
    </>
  );
};

export default News;
