import React from "react";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import dynamic from "next/dynamic";
import RamMandirTopNews from "widgets/Common/RamMandir/RamMandirTopNews";
import LazyLoad from "react-lazyload";


const AudioPlayer = dynamic(() => import("components/Common/AudioPlayer"));
const RamMandirInfo = dynamic(() => import("widgets/Common/RamMandir/RamMandirInfo"));
const RamMandirTour = dynamic(() => import("widgets/Common/RamMandir/RamMandirTour"));
const RamMandirDetails = dynamic(() => import("widgets/Common/RamMandir/RamMandirDetails"));
const RamMandirPhotos = dynamic(() => import("widgets/Common/RamMandir/RamMandirPhotos"));
const RamMandirTimeLine = dynamic(() => import("widgets/Common/RamMandir/RamMandirTimeLine"));
const RamMandirVideos = dynamic(() => import("widgets/Common/RamMandir/RamMandirVideos"));
const RamMandirWebstories = dynamic(() => import("widgets/Common/RamMandir/RamMandirWebstories"));
const TopPriorityData = dynamic(() => import("widgets/Common/RamMandir/TopPrioritData"));

const RamMandir = (props) => {
  const { topPriorityData = [], photoStories = [],
    videoStories = [],
    webStoriesList = [], pageAds = {}, liveTvFlag = {}, topNewsStories = [] } = props.data || {};
  const companion_banner = liveTvFlag?.widget?.companion_banner;
 
  return (<>
      {companion_banner == 1 && <div style={{ minHeight: "60px", margin: "auto", background: "#00000021", marginTop: "10px" }}>
        <NewSiteAd
          slotId="Desktop_ScoreCard_ad"
          adUnit={pageAds?.companion_banner}
          sizes={[[1244, 60]]}
          width={1244}
          height={60}
          style={{ marginLeft: "45px" }}
          removeAdSpan= {true}
          lazyLoad={false}
        />
      </div>}
    <TopPriorityData liveTvFlag={liveTvFlag} pageAds={pageAds} topPriorityData={topPriorityData} />
    <div className="rmwrp">
      <div style={{ minHeight: "90px" }} >
        <NewSiteAd
          slotId="MTF_728_id"
          adUnit={props.pageAds?.MTF_728_id}
          style={{ textAlign: "center", marginTop: "10px" }}
          sizes={[[728, 90]]}
          loadOnScroll={true}
        />
      </div>

      <RamMandirTimeLine />      
    </div>
    <RamMandirPhotos pageAds={pageAds} photoStories={photoStories} />
      <div style={{ minHeight: "90px" }} >
        <NewSiteAd
          slotId="ROS_MID_728_2"
          adUnit={props.pageAds?.ROS_MID_728}
          style={{ textAlign: "center", marginTop: "10px" }}
          sizes={[[728, 90]]}
          loadOnScroll={true}
        />
      </div>
      <RamMandirDetails /> 
      <RamMandirTour />

      <div className="rmwrp">
        <RamMandirVideos videoStories={videoStories} />
        <RamMandirWebstories webStoriesList={webStoriesList} />
      </div>
    <RamMandirTopNews topNewsStories={topNewsStories} />
    <AudioPlayer src="https://images.news18.com/ibnkhabar/uploads/2024/01/New18-Pranam-Siya-Ram-Song-short-version-2024-01-dddeea57de2fcb94e04d8bf4b644af3c.mp3" autoPlay={true} />
    
    <LazyLoad height={900} once offset={200}>
        <RamMandirInfo />
      </LazyLoad>
    <div style={{ minHeight: "90px" }} >

      <NewSiteAd
        slotId="BTF_728_2"
        adUnit={props.pageAds?.BTF_728}
        style={{ textAlign: "center", marginTop: "10px" }}
        sizes={[[728, 90]]}
        loadOnScroll={true}
      />
    </div>
    {typeof pageAds !== "undefined" &&
      typeof pageAds.Shosh_OOP_id !== "undefined" &&
      <NewSiteAd
        slotId="Shosh_OOP_id"
        adUnit={pageAds.Shosh_OOP_id}
        sizes={[[1, 1]]}
        removeAdSpan={true}
        loadOnScroll={true}
      />
    }
    {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_1x1 !== "undefined" && (

        <NewSiteAd
          slotId="PG_1x1"
          adUnit={pageAds.PG_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          loadOnScroll={true}
        />
      )}
    {
      typeof pageAds !== "undefined" &&
      typeof pageAds.PG_1x1_2 !== "undefined" && (

        <NewSiteAd
          slotId="PG_1x1_2"
          adUnit={pageAds.PG_1x1_2}
          sizes={[[1, 1]]}
          removeAdSpan={true}
        //loadOnScroll={true}                    
        />
      )}

    <style jsx global>{`    
    @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;700&family=Noto+Sans:wght@300;400;500;600;700;800;900&display=swap');
        figure img {
            border-radius: 4px;
            transform: scale(1);
            transition: all .3s ease-in-out;
        }
        figure {
            position: relative;
            line-height: 0;
            flex-shrink: 0;
            overflow: hidden;
        }
        figure:hover img {
            transform: scale(1.2);
            transition: all .3s ease-in-out;
        }
        .popup-content .popshvsldlitm div figure{width: 100%; position: relative;overflow: hidden; margin: 0; }
        .popup-content .popshvsldlitm div figure img{width: 100%; border-radius: 0px; height: auto; transform: none;}
        .shvsldlitm figure img, .shvsldnlitm figure img {
            transform: none;
        }
    `}</style>
  </>)

}

export default RamMandir;