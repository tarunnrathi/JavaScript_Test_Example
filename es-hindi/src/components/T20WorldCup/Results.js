import dynamic from "next/dynamic";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const ResultList = dynamic(() => import("components/Cricket/Desktop/IPL/IplResultList"));
const ResultListMobile = dynamic(() => import("components/Cricket/Mobile/IPL/IplResultList"));
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
import { t20_world_cup_year } from "api/Constant";
const RhsPhoto = dynamic(() => import("widgets/Common/Desktop/RhsPhoto"));
const RhsTopStory = dynamic(() => import("widgets/Common/Desktop/RhsTopStory"));
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
const TaboolaDesktop = dynamic(() => import("widgets/Common/Responsive/Taboola"));
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

const Result = (props) => {
  return (
    <>
      <div className="outer">
        <div className="CN-pageWrapper">
          {props.isMobile &&
            <div className="bet__ad">
              <NewSiteAd
                slotId={"Mobile_ScoreCard_ad"}
                adUnit={props.pageAds?.scoreCard_Ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyLoad={true}
              />
            </div>
          }
          {/* <div
            style={{
              height: "160px",
              overflow: "hidden",
              padding: "0 10px",
            }}
          > */}
            <DynamicCrTopScoreWidgetWithNoSSR
              isT20={true}
            />
          {/* </div> */}
          {props.isMobile && (<div className="add">
            <div className="addinner-box">
              <NewSiteAd
                slotId={"Mobile_ATF_320"}
                width={336}
                height={280}
                adUnit={props?.pageAds?.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                  [250, 250]
                ]}
                lazyLoad={true}
              ></NewSiteAd>
            </div>
          </div>
          )}
          {!props.isMobile && (
            <div style={{ minHeight: "60px", background: "#00000021", marginTop: "10px" }}>
              <NewSiteAd
                slotId="Desktop_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[1244, 60]]}
                width={1244}
                height={60}
                removeAdSpan={true}
                lazyLoad={false}
              />
            </div>
          )}
          <div className="CN-section">
            <div className="CN-sec-l">
              <BreadcrumbCommon breadCrumbArray={[
                { value: "हिंदी समाचार", slug: "/" },
                { value: "क्रिकेट", slug: "/cricket/" },
                { value: `t20 world cup ${t20_world_cup_year}`, slug: "/cricket/icc-t20-world-cup/" },
                { value: `T20 World Cup नतीजे` },
              ]} />
              <div className="CN-innersection">
                <div className="cn-heading-1">
                  <div className="headinner">
                    <h1> ICC Men's T20 World Cup {t20_world_cup_year} : <span> नतीजे</span></h1>
                  </div>
                  <div className="icon" />
                </div>
                {
                  props?.data?.resultData && props?.data?.resultData[0]?.match?.length > 0 ? (
                    props?.data?.isMobile
                      ? <ResultListMobile pageContent={props?.data?.resultData[0]} />
                      :
                      <ResultList pageContent={props?.data?.resultData[0]} />
                  ) : (
                    <p style={{ textAlign: "center" }}>
                      No results found matching this criteria
                    </p>
                  )
                }
                <div
                  id="inifiniteLoader"
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    display: "none",
                  }}
                >
                  <div style={{ background: "none" }}>
                    <img
                      width={30}
                      align="absmiddle"
                      src="https://images.news18.com/static_news18/pix/web/ajax-loader.gif"
                    />
                  </div>
                </div>
                {props.isMobile && props?.pageAds?.BTF_300 ? (
                  <div className="add">
                    <div className="addinner-box">
                      <NewSiteAd
                        slotId="Desktop_BTF_300"
                        width={336}
                        height={280}
                        adUnit={props?.pageAds?.BTF_300}
                        sizes={[
                          [300, 250],
                          [336, 280],
                        ]}
                        lazyLoad={true}
                      ></NewSiteAd>
                    </div>
                  </div>
                ) : null}
                <div className="vsp20 clearfix"></div>
                <p className="pageContent">
                  क्रिकेट सहित दुनिया का कोई भी खेल हो, रिजल्ट ही सबसे मुख्य
                  होता है. कौन-सी टीम जीती या कौन-सी हारी. टी20 की बात करें, तो
                  हमें 4 तरह के रिजल्ट देखने को मिलते हैं- जीत, हार, टाई और
                  परिणाम नहीं. बारिश के कारण कई बार मैच का रिजल्ट नहीं निकल पाता
                  है. रिजल्ट के लिए कई बार सुपर ओवर का भी सहारा लिया जाता है.
                  बड़े टूर्नामेंट में हर मैच के रिजल्ट महत्वूपर्ण होते हैं,
                  क्योंकि टीमें इससे अगले राउंड में जा सकती हैं या फिर बाहर हो
                  सकती हैं. टी20 वर्ल्ड कप (T20 World Cup {t20_world_cup_year}) के रिजल्ट
                  (Results) यहां देखे जा सकते हैं.
                </p>
              </div>
            </div>
            <div className="CN-sec-r">
              {!props.isMobile &&
                <NewSiteAd
                  slotId="cn-add-section-1"
                  adUnit={props?.pageAds?.ATF_300_id}
                  lazyload={true}
                  sizes={[[300, 250]]}
                  width={300}
                  height={250}
                  removeAdSpan
                />}

              {!props?.isMobile && <div className="cn-add-section-2" style={{ minHeight: 519 }}>
                <div className="vsp20"></div>
                <RhsPhoto photoStories={props?.data?.photoStories} isPhoto={false} />
              </div>}
              {!props.isMobile && props?.pageAds?.BTF_300_id && (
                <div style={{ marginTop: '10px' }}>
                  <NewSiteAd
                    slotId="cn-add-section-2"
                    adUnit={props?.pageAds?.BTF_300_id}
                    sizes={[
                      [300, 250],
                      [336, 280],
                      [300, 600]
                    ]}
                    width={300}
                    height={250}
                    lazyLoad={true}
                    removeAdSpan={true}
                  />
                </div>
              )}
              <RhsTopStory
                topStories={props?.data?.topStoriesData}
                articleData={{}}
                relatedStories={{}}
                isRss={false}
              />
            </div>
          </div>
          {props?.isMobile
            ?
            <Taboola
              mode={props?.data?.taboolaList?.rhs?.mode}
              id={props?.data?.taboolaList?.rhs?.id}
              container={props?.data?.taboolaList?.rhs?.container}
              placement={props?.data?.taboolaList?.rhs?.placement}
            />
            : <TaboolaDesktop
              mode={TaboolaList.articlePage.bottom.mode}
              id={TaboolaList.articlePage.bottom.id}
              container={TaboolaList.articlePage.bottom.container}
              placement={TaboolaList.articlePage.bottom.placement}
            />
          }
        </div>
      </div>
      <style jsx global>{`
      .headinner h1{
        font-size: ${props?.isMobile ? "22px" : "26px"};
        line-height: 25px;
      }
			@font-face {
				font-family: "Mukta";
				font-style: normal;
				font-weight: 400;
				font-display: swap;
				src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)format(url("woff2"));
				src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)format("woff2");
				unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB
			}
			body{margin: auto;font-family: "Mukta",sans-serif;background: #fff;}h1, h2, h3, h4, h5, h6, p, ul, ol, header, footer, nav, article, aside, figure, figcaption{margin: 0; padding: 0;}li{list-style: none;}a{text-decoration: none; color: #000;}a img{border: none;} 
			a, abbr, acronym, address, applet, article, aside, audio, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, summary, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {margin: 0; padding: 0; border: 0; font: inherit; vertical-align: baseline;}
			img { border: none; max-width: 100%;}
			.mobinner-ad{display:none;}
			.adbox{display:none;}
			@media (max-width:768px){
				.mobinner-ad{display:block;} 
				.inner-ad{display:none;}
				.wrap-ad{display:none;} 
				.adbox {background: #dbdde3!Important;padding: 16px 0;position: relative;display:block;}
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
				.vsp20 { margin-top: 20px; }
				@media (max-width:768px){
					* { padding: 0; margin: 0; list-style: none; box-sizing: border-box; text-decoration: none; border-collapse: collapse; } body { font-family: 'Mukta',sans-serif!important; margin: 0; padding: 0; font-size: 13px; line-height: 19px; font-weight: 400; } .outer { width: 100%; display: block; overflow: auto !important; } .CN-section{display: block !important;width: 100%;} .CN-section .CN-sec-l { width: 100% !important; min-width: auto !important; } 
					.CN-breadcum { font-size: 13px; height: 34px; background: none; border-top: none; border-bottom: 1px dashed rgb(147 147 147 / 57%); display: flex; overflow: scroll; padding: 8px 10px 5px 10px; margin-bottom: 0;    line-height: 1.4; } .CN-breadcum a { padding: 0 4px; flex-shrink: 0; } body .CN-breadcum a span { padding: 0 4px 0 0; } body .CN-breadcum h1, body .CN-breadcum h2 { font-size: 13px; line-height: 19px; flex-shrink: 0; }
					.CN-sec-r {display: none;}
				}
				.cn-heading-1 {border-bottom: 3px solid #e1261d;margin-bottom: 10px;}
							.cn-heading-1 div {font-size: 22px;line-height: 20px;color: #e1261d;font-weight: bold;background: #fff;	position: relative;	top: 8px;padding-right: 4px;display: inline-block;text-transform: uppercase;}
							.cn-heading-1 div span {color: #001D42!important;top: 0;}
							.pageContent {font-size: 16px;line-height: 1.5; margin-top: 10px;}
							.CN-section .CN-sec-r {width: 300px; min-width: 300px;}
							@media (max-width:768px){
								.cn-heading-1{padding: 0 0 0 10px; margin-bottom: 10px; border: none;}
								.CN-schedule-main {padding: 0 10px;}
								.pageContent {padding: 10px 10px;font-size: 16px;line-height: 1.5;}
                .headinner h1 {
                  border-bottom: 1px solid #d8d8d8;
                  padding-bottom: 5px;
                  font-size:22px;
                }
                .CN-result-row .CN-result-heading{font-weight: bold;      font-size: 18px;}
                .add{text-align: center;}
							}
              .inner-ad{margin-top:42px;}
              .CN-section{margin-top:10px;}
              .CN-scoreCardsection {
                background: #f5f5f5;
                padding: 0 15px;
            }
	`}</style>
    </>
  );
};

export default Result;
