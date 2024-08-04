import React from "react";
import RhsVideoCard from "widgets/Common/Desktop/RhsVideoCard";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "../Responsive/Taboola";

const RhsVideo = ({
  pageAds = {},
  section = "news",
  currentURL,
  trendingVideoData,
  videoData,
  videoTitle,
  // isMobile = false,
  PageType = "C",
  taboolaList,
}) => {
  const blockedTrendingData = [
    "5f59129631560d1ee13861dc",
    "5f72db770ac55c56955e9007",
    "5f91a5800ac55c5695c1c3a3",
  ];

  // let playLists = trendingVideoData.playlists?.filter((playlist) => {
  //   if (!blockedTrendingData.includes(playlist.id)) {
  //     return playlist;
  //   }
  // });
  let playLists;
  if(typeof videoData === 'undefined') {
    playLists= trendingVideoData;
}else{
  playLists = videoData;}
  return (
    <>
      <div className="news_page_right">
        <div className="sideTop">
          {pageAds?.ATF_300_id && (
            <>
              <SiteAd
                adUnit={
                  pageAds?.ATF_300_id ? pageAds.ATF_300_id : pageAds.ATF_300_id
                }
                lazyload={true}
                sizes={[[300, 250], pageAds.isTag ? "" : [1, 1]]}
                width={300}
                height={250}
              />
            </>
          )}
        </div>

        {typeof pageAds !== "undefined" &&
        section == "video" ? (
          <SiteAd
            slotId="PG_Slider_1x1"
            adUnit="NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          />
        ) : (
          ""
        )}

        <div>
          {typeof pageAds !== "undefined" &&
          typeof pageAds.Shosh_OOP_id !== "undefined" ? (
            <SiteAd
              slotId="Shosh_OOP_id"
              renderOutOfThePage={true}
              adUnit={pageAds.Shosh_OOP_id}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadonScroll={true}
            />
          ) : (
            ""
          )}
        </div>

        {typeof pageAds !== "undefined" &&
        typeof pageAds.PG_1x1 !== "undefined" &&
        section == "video" ? (
          <SiteAd
            slotId="PG_1x1"
            adUnit={pageAds.PG_1x1}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          />
        ) : (
          ""
        )}

        {playLists?.map((playlist, index) =>
          playlist.id == "ads" ? (
            <div className="sideMiddle">
              {pageAds?.BTF_300_id && (
                <SiteAd
                  adUnit={pageAds.BTF_300_id}
                  sizes={[
                    [300, 250],
                    [300, 600],
                  ]}
                  width={300}
                  height={250}
                  lazyload={true}
                />
              )}
            </div>
          ) : (
            <RhsVideoCard
              key={playlist.id}
              playlist={playlist}
              videoTitle={videoTitle?videoTitle[index] : ""}
            />
          )
        )}

        {/* <Outbrain widgetId="SB_6" widgetSrc={currentURL} /> */}
        <Taboola
          mode={taboolaList?.rhs.mode}
          id={taboolaList?.rhs.id}
          container={taboolaList?.rhs.container}
          placement={taboolaList?.rhs.placement}
        />
      </div>
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
        .sideMiddle {
          padding-top: 20px;
          min-height: 250px;
          position: relative;
        }
      `}</style>
    </>
  );
};
export default RhsVideo;
