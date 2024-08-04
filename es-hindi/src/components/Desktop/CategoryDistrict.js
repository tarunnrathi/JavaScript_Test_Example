import React from "react";
import getConfig from "next/config";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import { TaboolaList } from "includes/Tabola.helper";
import dynamic from "next/dynamic";
import categoryHelper from "includes/category.helper";
import useLoadMore from "hooks/useLoadMore";
import PhotogalleryNews from "./districtWidget/photoGallery";
import WebStoryList from "./districtWidget/webstoryList";
import TrendingNews from "./districtWidget/trendingNews";
import PetrolDieselPriceWidget from "widgets/Common/Responsive/PetrolDieselPriceWidget";

const RhsCommon = dynamic(() => import("widgets/Common/Desktop/RhsCommon"));
const Taboola = dynamic(() => import("widgets/Common/Responsive/Taboola"));
const BreadcrumbCommon = dynamic(() =>
  import("widgets/Common/Responsive/BreadcrumbCommon")
);
const TopNews = dynamic(() =>
  import("./districtWidget/topNews")
);
const VideoWidget = dynamic(() =>
  import("./districtWidget/videoWidget")
);
const ShortVideosList = dynamic(() =>
  import("./districtWidget/shortVideosList")
);
const StateStoriesWidget = dynamic(() =>
  import("./districtWidget/stateStoriesWidget")
);
const NewsListingCommon = dynamic(() =>
  import("widgets/Common/Responsive/NewsListingCommon")
);
const Category = ({ data = {} }) => {
  const {
    _pageParam= {},
    breadCrumbArray = [],
    // mainCat,
    titleDiv,
    topPriorityData = "",
    sliderFlag = false,
    astroStories = [],
    categoryStoriesList = [],
    dataLength,
    photoStories,
    topStories,
    datedAstroData,
    // latestNewsStories,
    isStatePage = false,
    categoryName,
    currentURL,
    localVideosData,
    stateStories,
    photogalleryNews,
    webStoriesNews,
    shortVideosList,
    trendingNews,
    bestOfLocal18,
    isMobile,
    // top_trending_articles,
    // top_trending_articles_with_category
    pcategory
  } = data;
  const {
    query,
    category: sectionname = "",
    subCategory: sub_section,
    hi_subCategory,
    hi_category,
    // allStates = [],
    curr_page_no: page = 0,
    pageLimit,
    //query_arr,
  } = _pageParam;

  const { publicRuntimeConfig } = getConfig();
  // current url
  const outBrainUrl = publicRuntimeConfig.siteUrl + query;
  const noContent = page > 30 ? false : true;

  const pageNum = page - 1;
  let query_arr = { "categories.slug": pcategory };
  const topPriorityDataIds = [
    ...(topPriorityData.leftCat || []),
    ...(topPriorityData.rightCat || []),
    ...(categoryStoriesList || [])
  ]?.map((item) => item.story_id);
  const { loadMore, categoryData , hasMoreData } = useLoadMore(
    categoryStoriesList,
    pageLimit,
    dataLength,
    query_arr,
    page,
    "category",
    topPriorityDataIds
  );


  return (
    <>
      <div className="newcontainer clearfix">
        <div className="newleftwrap">
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
            <div style={{ minHeight: "137px"}}>
              <PetrolDieselPriceWidget islocal18W={true} hi_subCategory={hi_subCategory} hi_category={hi_category} perView={2.2} city={sub_section}/>
            </div>
            <TopNews city={sub_section} currentURL={outBrainUrl} topPriorityData={topPriorityData || []} />
            <div className="blog_list">
              <NewsListingCommon initialData={categoryData} isMobile={false} />
            </div>
            {hasMoreData && (
              <button type="button" onClick={loadMore} className="load_more">
                Load More
              </button>
            )}
            <VideoWidget aurPadheLink={`/videos/`} localVideosData={localVideosData} />
            <StateStoriesWidget aurPadheLink={`/news/${sectionname}/`} stateStories={stateStories} />
            <PhotogalleryNews aurPadheLink={`/photogallery/${sectionname}/`} data={photogalleryNews} />
            <WebStoryList aurPadheLink={`/web-stories/`} data={webStoriesNews} />
            <ShortVideosList aurPadheLink="/videos/short-videos/" data={shortVideosList} />
            <TrendingNews aurPadheLink="/agency/local18/" data={trendingNews} />
            
            <Taboola
              mode={TaboolaList.category.bottom.mode}
              id={TaboolaList.category.bottom.id}
              container={TaboolaList.category.bottom.container}
              placement={TaboolaList.category.bottom.placement}
            />
            <div className="vsp10"></div>
            <div className="clearfix"></div>
        </div>
        <div className="newrightwrap">
          <RhsCommon
            pageAds={data.pageAds}
            currentURL={outBrainUrl}
            photoStories={photoStories}
            topStories={topStories}
            bestOfLocal18={bestOfLocal18}
            astroStories={astroStories}
            section="categorynews"
            isStatePage={isStatePage}
            panchangData={datedAstroData}
            noContent={noContent}
            taboolaList={TaboolaList.category}
            // top_trending_articles ={top_trending_articles}
            // top_trending_articles_with_category={top_trending_articles_with_category}
            categoryName={categoryName||""}
            page="category"
            pageParam={_pageParam}
          />
        </div>
      </div>
      <style jsx global>{`
        .newcontainer {
            max-width: 1244px;
            margin: auto;
            background-color: #fff;
        }
      @font-face {font-family:'Mukta';font-style:normal;font-weight:700;font-display:swap;src:url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}

        figure img {
          border-radius: 4px;
        }
          figure {
            position: relative;
            line-height: 0;
            flex-shrink: 0;
            overflow: hidden;
        }
        .newleftwrap{width: calc(100% - 325px);float: left;position: relative; padding: 15px 0;}
        .newrightwrap {width: 280px;float: right;padding: 15px 0;}
        .newbuttonlist{display: flex; align-items: center;} 
        .newbuttonlist span{cursor: pointer; color: #524F4F;font-size: 15px; line-height: 24px; display: block; text-align: center; padding: 3px 12px; margin: auto 2px; height: 30px; background-color: #FFFFFF; border: 1px solid #E0E0E0; border-radius: 15px;}
        .newbuttonlist.gry span { background-color: #F2F2F2;}
        .newbuttonlist span.active, .newbuttonlist.gry a.active{color: #fff;background-color: #E1261C; box-shadow: 0px 3px 6px #00000029;  border: 1px solid #FFFFFF; border-radius: 15px;padding: 4px 12px;}
        .newbuttonlist span:last-child{margin-right: 0;}
        
        .lcheading {border-bottom: 1px solid #d9d9d9;position: relative;margin-bottom: 6px; display: flex; justify-content: space-between;align-items: baseline;}
        .lcheading .lcchild, .lcheading .lcchild a {font-size: 20px;line-height: 38px; color: #000; font-weight: bold;display: flex; align-items: baseline;}	
        .lcchild svg {margin-right: 5px;}
        .moretrndstroy {color: #E82D2E; font-size: 14px; display: block; text-align: center; line-height: 24px; font-weight: bold; margin: 0;}
        .moretrndstroy:after {content: ""; background-image: url(/images/districts/Path114.svg);background-repeat: no-repeat; width: 11px;height: 11px; display: inline-block; margin-left: 6px;}        
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
          margin-bottom: 18px;
        }
      `}</style>
    </>
  );
};
export default React.memo(Category);
