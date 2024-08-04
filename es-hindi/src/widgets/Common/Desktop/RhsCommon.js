import dynamic from "next/dynamic";
import Taboola from "../Responsive/Taboola";
import RhsScorecard from "widgets/Common/Desktop/RhsScorecard";
//import SiteAd from "widgets/Common/Responsive/SiteAd";
// import LazyLoadImage from "components/Common/CustomImage";
import NewSiteAd from "../Responsive/NewSiteAd";
import LiveBlogList from "components/Common/LiveBlogList";
// import RhsShortVideos from "./RhsShortVideos";
// import TrendingStories from "./TrendingStories";
import ShortNewsRhs from "./ShortNewsRhs";

const HomeRashifalWidget = dynamic(() => import("components/Desktop/home/HomeRashifalWidget"));
const RhsPhoto = dynamic(() => import("widgets/Common/Desktop/RhsPhoto"));
const RhsTopStory = dynamic(() => import("widgets/Common/Desktop/RhsTopStory"));
const RhsLatestNews = dynamic(() => import("widgets/Common/Desktop/RhsLatestNews"));
const RhsTrendingStory = dynamic(() => import("widgets/Common/Desktop/RhsTrendingStory"));
const MissionPaani = dynamic(() => import("widgets/Common/Responsive/MissionPaani"));
const BestOfLocal18 = dynamic(() => import("components/Desktop/districtWidget/BestOfLocal18"));
const MovieReviewWidget = dynamic(() =>
  import("components/Desktop/homepage/MovieReviewWidget")
);

// const RhsAstroSlider = dynamic(() => import("components/Common/RhsAtroSlide"));
// const AstroDaily = dynamic(() => import("components/Common/AstroDaily"));
// const show_latest_rhs_component = ['livetv', 'latestnews', 'category'];
const RhsCommon = ({
  pageAds = {},
  section = "news",
  isMobile = false,
  topicName = "",
  topStories = [],
  photoStories = [],
  // astroStories = {},
  latestNewsStories = [],
  page = "",
  isbitbns = false,
  isNewLiveBlog,
  stories,
  relatedStories = [],
  articleData = [],
  // isStatePage = false,
  trendingStory = {},
  cat = "",
  taboolaList = {},
  isRss = false,
  isAboutAd = "",
  bestOfLocal18 = [],
  isInphoGraphics = false,
  liveBlogList=[],
  utm_medium,
  isLiveBlogPositionOnArticle=false,
  isLiveBlogPositionOnLiveBlog=false,
  // top_trending_articles=[],
  // top_trending_articles_with_category=[],
  categoryName="",
  pageParam={},
  short_news_rhs = []
}) => {
  return (
    <>
      <aside className="news_page_right">
        <div>
          {!isMobile && (
            <div className="sideTop rhs_common_side_top">
              {pageAds?.ATF_300_id && ( 
                <>
                  {/* <SiteAd
                    adUnit={
                      pageAds?.ATF_300_id
                        ? pageAds.ATF_300_id
                        : pageAds.ATF_300_id
                    }
                    sizes={[[300, 250]]}
                    width={300}
                    height={250}
                    lazyload={true}
                    RhsCommonSideTop
                  /> */}
                  <NewSiteAd
                    slotId="ATF_300_id"
                    adUnit={
                      pageAds?.ATF_300_id
                        ? pageAds.ATF_300_id
                        : pageAds.ATF_300_id
                    }
                    sizes={[[300, 250]]}
                    width={300}
                    height={250}
                    lazyLoad={false}                          
                  />
                </>
              )}
              {!isbitbns &&
                ["news", "photogallery", "latestnews", "categorynews"].includes(
                  section,
                ) &&
                page !== "photogallery" &&
                !isInphoGraphics && (
                  // <SiteAd
                  //   slotId="pg_slider_1x1"
                  //   adUnit={
                  //     section === "news"
                  //       ? "NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AS/NW18_HIND_ROS_AS_PG_SLIDER_1x1"
                  //       : section === "photogallery"
                  //       ? "NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"
                  //       : "NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"
                  //   }
                  //   sizes={[1, 1]}
                  //   removeAdSpan={true}
                  //   loadonScroll={true}
                  // />
                  <NewSiteAd
                    slotId="pg_slider_1x1"
                    adUnit={
                          section === "news"
                            ? "NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AS/NW18_HIND_ROS_AS_PG_SLIDER_1x1"
                            : section === "photogallery"
                            ? "NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"
                            : "NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"
                    }
                    sizes={[1, 1]}
                    removeAdSpan={true}
                    loadOnScroll={true}                       
                  />
                )}
            </div>
          )}
          {section === "aqi" && (
            // <SiteAd
            //   slotId="pg_slider_1x1"
            //   adUnit={
            //     "NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"
            //   }
            //   sizes={[1, 1]}
            //   removeAdSpan={true}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="pg_slider_1x1"
              adUnit={
                    "NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"
              }
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={true}                       
            />
          )}
          {section === "tag" && topicName === "cryptocurrency" && (
            <div className="bitbns_crypto_sidebar">
              <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/crypto/images/crypto_per.png"/>
              <a href="https://hindi.news18.com/news/business/cryptocurrency/bitcoin-price-in-india-today-inr/">
                VISIT MARKETPLACE
              </a>
            </div>
          )}
          <div>
            {typeof pageAds !== "undefined" &&
              typeof pageAds.Shosh_OOP_id !== "undefined" &&
              section === "photogallery" && (
                // <SiteAd
                //   slotId="Shosh_OOP_id"
                //   renderOutOfThePage={true}
                //   adUnit={pageAds.Shosh_OOP_id}
                //   sizes={[[1, 1]]}
                //   removeAdSpan={true}
                //   loadonScroll={true}
                // />
                <NewSiteAd
                  slotId="Shosh_OOP_id"
                  adUnit={pageAds.Shosh_OOP_id}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}                    
                />
              )}
          </div>
          {!isbitbns &&
            typeof pageAds !== "undefined" &&
            typeof pageAds.PG_1x1 !== "undefined" && (
              // <SiteAd
              //   slotId="PG_1x1"
              //   adUnit={pageAds.PG_1x1}
              //   sizes={[[1, 1]]}
              //   removeAdSpan={true}
              //   loadonScroll={true}
              // />
              <NewSiteAd
                slotId="PG_1x1"
                adUnit={pageAds.PG_1x1}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                loadOnScroll={true}                    
              />
            )}
          {!isbitbns &&
            typeof pageAds !== "undefined" &&
            typeof pageAds.PG_1x1_2 !== "undefined" && (
              // <SiteAd
              //   slotId="PG_1x1_2"
              //   adUnit={pageAds.PG_1x1_2}
              //   sizes={[[1, 1]]}
              //   removeAdSpan={true}
              //   style={{ height: "0" }}
              //   loadonScroll={true}
              // />
              <NewSiteAd
                slotId="PG_1x1_2"
                adUnit={pageAds.PG_1x1_2}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                //loadOnScroll={true}                    
              />
            )}
          {/* {!isbitbns &&
            !(
              ["news", "photogallery", "latestnews", "categorynews"].includes(
                section,
              ) && page !== "photogallery"
            ) &&
            typeof pageAds !== "undefined" &&
            typeof pageAds.PG_Slider_1x1 !== "undefined" && (
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
            )} */}
          {bestOfLocal18.length > 0 && <BestOfLocal18 data={bestOfLocal18} />}
          {section === "tag" && topicName === "mission-paani" && (
            <MissionPaani name="desktop-rhs" />
          )} 
          {(articleData?.subsection?.[0]?.slug == 'film-review' || pageParam?.get_section?.slug == 'film-review') &&

            <><MovieReviewWidget /><br></br></>}        
          {section !== "rashifal" &&
            <HomeRashifalWidget weburl={articleData?.weburl} isArticle={articleData?.story_id} title={articleData.display_headline || articleData.headline} storyId={articleData.story_id} isRhs={true} />
          }
          {<ShortNewsRhs category={pageParam?.category} short_news_rhs={short_news_rhs} /> }
          {isNewLiveBlog && (
            <RhsTopStory
              latestNews={stories}
              articleData={articleData}
              isRelated={true}
              relatedStories={relatedStories}
            />
          )}
          <RhsScorecard />
          <RhsTrendingStory trendingStory={trendingStory} cat={cat} />
          {section !== "photogallery" && section !== "latestnews" && (
            <RhsPhoto photoStories={photoStories} />
          )}

          {section === "latestnews" && !isMobile && (
            <RhsLatestNews latestNews={latestNewsStories} />
          )}

          {page === "livetv" && !isMobile && (
            <RhsLatestNews latestNews={latestNewsStories} />
          )}

          {/* {section != "photogallery" && !hideAstro && <RhsAstroPhoto astroStories={astroStories} />} */}
          {section === "photogallery" && !isMobile && (
            <RhsPhoto photoStories={photoStories} isPhoto={true} />
          )}
          {!isMobile && (
            <div className="sideMiddle">
              {pageAds?.BTF_300_id && (
                <>
                  {/* <SiteAd
                    adUnit={pageAds.BTF_300_id}
                    sizes={[
                      [300, 250],
                      [300, 600],
                    ]}
                    removeAdSpan={true}
                    width={336}
                    height={280}
                    lazyload={true}
                    offset={200}
                  /> */}
                  <NewSiteAd
                    slotId="BTF_300_id"
                    adUnit={pageAds.BTF_300_id}
                    sizes={[
                      [300, 250],
                      [300, 600],
                    ]}
                    width={336}
                    height={280}
                    lazyLoad={true}
                    removeAdSpan={true}                                      
                  />
                </>
              )}
            </div>
          )}
          {(liveBlogList?.length >0 && isLiveBlogPositionOnLiveBlog) && (
            <LiveBlogList liveBlogList={liveBlogList} isMobile={false} utm_medium={utm_medium}/>
          )} 
          {/* {(liveBlogList?.length >0 && isLiveBlogPositionOnArticle) && (
            <LiveBlogList liveBlogList={liveBlogList} isMobile={false} utm_medium={utm_medium}/>
          )} */}
          {section !== "photogallery" && page !== "livetv" && (
            <RhsTopStory
              topStories={topStories}
              articleData={articleData}
              relatedStories={relatedStories}
              isRss={isRss}
            />
          )}
          {/* <RhsShortVideos />
          {page === "category" && (
            <TrendingStories
              top_trending_articles={top_trending_articles || []}
              top_trending_articles_with_category={
                top_trending_articles_with_category || []
              }
              categoryName={categoryName || ""}
              pageParam={pageParam}
            />
          )} */}

          {!isRss && <div className="clearfix vsp10"></div>}
          {/* {!isStatePage && section === "categorynews" && !isRss && (
            <RhsAstroSlider astroStories={astroStories} />
          )}
          {!isRss && (<div className="clearfix vsp10"></div>)}
          {!isStatePage && section === "categorynews" && !isRss && (
            <AstroDaily astroDataAmp={panchangData} />
          )} */}

          {!isAboutAd && !isRss && (
            <Taboola
              mode={taboolaList?.rhs?.mode}
              id={taboolaList?.rhs?.id}
              container={taboolaList?.rhs?.container}
              placement={taboolaList?.rhs?.placement}
            />
          )}
        </div>
      </aside>
      <style jsx global>{`
        .news_page_right {
          width: 300px;
          float: right;
          position: relative;
        }
        .sideTop {
          min-height: 250px;
          position: relative;
        }
        .rhs_common_side_top {
          min-height: 280px;
        }
        .adunitContainer {
          line-height: 0;
        }
        .sideMiddle {
          padding-top: 20px;
          min-height: 250px;
          position: relative;
        }
        .sideMiddle span,
        .sideTop span {
          background: #eee;
          font-size: 12px;
          color: #444;
          padding: 3px 0 3px 0;
          text-align: center;
          min-height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: normal;
        }
        .bitbns_crypto_sidebar * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .bitbns_crypto_sidebar {
          width: 300px;
          height: 100px;
          position: relative;
          margin: auto;
        }
        .bitbns_crypto_sidebar img {
          width: 100%;
        }
        .bitbns_crypto_sidebar a {
          background: #da5c4f;
          padding: 10px 25px 10px 15px;
          border-radius: 4px;
          color: #fff;
          text-transform: uppercase;
          text-decoration: underline;
          position: absolute;
          bottom: 0;
          right: 5px;
          font-size: 13px;
        }
        .bitbns_crypto_sidebar a:after {
          content: "";
          position: absolute;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 3px;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          top: 14px;
          right: 9px;
        }
        .forsticky {
          position: sticky;
          top: 0;
        }
      `}</style>
    </>
  );
};
export default RhsCommon;
