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
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import PetrolDieselPriceWidget from "widgets/Common/Responsive/PetrolDieselPriceWidget";

const RhsCommon = dynamic(() => import("widgets/Common/Desktop/RhsCommon"));
const Taboola = dynamic(() => import("widgets/Common/Responsive/Taboola"));
const BreadcrumbCommon = dynamic(() =>
  import("widgets/Common/Responsive/BreadcrumbCommon")
);
const BestOfLocal18 = dynamic(() => import("components/Mobile/districtWidget/BestOfLocal18"));

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
const Category = ({ data = {}}) => {
  const {
    _pageParam = {},
    breadCrumbArray = [],
    topPriorityData = "",
    pageAds = {},
    currentUrl,
    localVideosData,
    stateStories,
    photogalleryNews,
    webStoriesNews,
    shortVideosList,
    trendingNews,
    bestOfLocal18,
    isMobile,
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
    query_arr,
  } = _pageParam;
  return (
    <>
      <div className="newcontainer clearfix">
        <div className="newleftwrap">
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
          {pageAds.PG_1x1_2 && (
            // <SiteAd
            //   slotId="PG_1x1_2"
            //   adUnit={pageAds.PG_1x1_2}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   style={{ height: 0 }}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="PG_1x1_2"
              adUnit={pageAds.PG_1x1_2}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              style={{ height: 0 }}
              loadOnScroll={false}
            />
          )}
          {pageAds.PG_1x1_3 && (
            // <SiteAd
            //   slotId="PG_1x1_3"
            //   adUnit={pageAds.PG_1x1_3}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   style={{ height: 0 }}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="PG_1x1_3"
              adUnit={pageAds.PG_1x1_3}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              style={{ height: 0 }}
              loadOnScroll={true}
            />
          )}
            <div style={{ minHeight: "210px"}}>
              <PetrolDieselPriceWidget islocal18W={true} isMobile={true} hi_subCategory={hi_subCategory} hi_category={hi_category} perView={2} city={sub_section}/>
            </div>
            <TopNews city={sub_section} currentURL={currentUrl+"/page-1"} topPriorityData={topPriorityData || []} />
            <VideoWidget aurPadheLink={`/videos/`} localVideosData={localVideosData} />
            <StateStoriesWidget aurPadheLink={`/news/${sectionname}/`} stateStories={stateStories} />
            <PhotogalleryNews aurPadheLink={`/photogallery/${sectionname}/`} data={photogalleryNews} />
            <WebStoryList aurPadheLink={`/web-stories/`} data={webStoriesNews} />
            <ShortVideosList aurPadheLink="/videos/short-videos/" data={shortVideosList} />
            <TrendingNews aurPadheLink="/agency/local18/" data={trendingNews} />
            <div className="addv">
                          {/* <SiteAd
                            slotId={`mobile_btf_300`}
                            adUnit={pageAds.BTF_300}
                            sizes={[
                              [320, 250],
                              [300, 250],
                              [336, 280],
                            ]}
                            width={300}
                            height={250}
                          /> */}
                          <NewSiteAd
                            slotId={`mobile_btf_300`}
                            adUnit={pageAds.BTF_300}
                            sizes={[
                              [320, 250],
                              [300, 250],
                              [336, 280],
                            ]}
                            width={300}
                            height={250}
                          />
                        </div>
            <BestOfLocal18 aurPadheLink="/agency/local18/" data={bestOfLocal18} />

            <Taboola
              mode={TaboolaList.category.center.mode}
              id={TaboolaList.category.center.id}
              container={TaboolaList.category.center.container}
              placement={TaboolaList.category.center.placement}
              isMobile={true}
              position={true}
            />
        </div>
      </div>
      <style jsx global>{`
      @font-face {font-family:'Mukta';font-style:normal;font-weight:700;font-display:swap;src:url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
      .newcontainer {
        max-width: 1244px;
        margin: auto;
        background-color: #fff;
      }
      .addv {width: 300px;height: 250px;background-color: #f4f4f4;border: 1px solid #C7C7C7; margin: 0 auto 20px;}
      .newleftwrap {
        width: 100%;
        float: left;
        position: relative;
        padding: 15px 0;
      }
      .newrightwrap {
        width: 300px;
        float: right;
        padding: 15px 0;
      }
      .lcheading {border-bottom: 1px solid #d9d9d9;position: relative;margin-bottom: 6px; display: flex; justify-content: space-between;align-items: baseline;}
        .lcheading .lcchild, .lcheading .lcchild a {font-size: 20px;line-height: 38px; color: #000; font-weight: bold;display: flex; align-items: baseline;}	
        .lcchild svg {margin-right: 5px;}
        
        .moretrndstroy {color: #fff !important;font-size: 14px;text-align: center;font-weight: bold;background: #E1261C;box-shadow: 0px 3px 6px #00000029;	border: 1px solid #FFFFFF;	border-radius: 16px;	display: table;margin: 15px auto 0;width: 140px;height: 32px;line-height: 32px;}
        .moretrndstroy:after {content: ""; background-image: url(img/Path114.svg);background-repeat: no-repeat;  width: 11px; height: 11px; display: inline-block; margin-left: 6px;filter: brightness(0) invert(1);}
        @media (max-width:768px){
          .lcheading{margin: 0 10px 6px;}
          .trnw_btm li a figure img {
            width: 80px;
            height: 53px;
        }
          .niy_tp figure img, .trnw_tp figure img{
            width: 100%;
        }
      }
      `}</style>
    </>
  );
};
export default React.memo(Category);
