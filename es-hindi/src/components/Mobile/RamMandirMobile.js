import React from "react";
import dynamic from "next/dynamic";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import RamMandirTopNews from "widgets/Common/RamMandir/RamMandirTopNews";
import LazyLoad from "react-lazyload";

const AudioPlayer = dynamic(() => import("components/Common/AudioPlayer"));
const RamMandirTour = dynamic(() => import("widgets/Common/RamMandir/RamMandirTour"));
const RamMandirInfo = dynamic(() => import("widgets/Common/RamMandir/RamMandirInfo"));
const RamMandirDetails = dynamic(() => import("widgets/Common/RamMandir/RamMandirDetails"));
const RamMandirPhotos = dynamic(() => import("widgets/Common/RamMandir/RamMandirPhotos"));
const RamMandirTimeLine = dynamic(() => import("widgets/Common/RamMandir/RamMandirTimeLine"));
const RamMandirVideos = dynamic(() => import("widgets/Common/RamMandir/RamMandirVideos"));
const RamMandirWebstories = dynamic(() => import("widgets/Common/RamMandir/RamMandirWebstories"));
const TopPriorityData = dynamic(() => import("widgets/Common/RamMandir/TopPrioritData"));

const RamMandirMobile = (props) => {
    const { topPriorityData = [], photoStories = [], 
        videoStories = [],
        webStoriesList = [], pageAds = {}, liveTvFlag = {}, topNewsStories = [] } = props.data || {};
        const companion_banner = liveTvFlag?.widget?.companion_banner;
    return (<>
    {companion_banner == 1 && <div style={{ minHeight: "60px", margin: "auto", background: "#f5f5f5", paddingTop: "10px", paddingBottom: "10px" }}>
            
            <NewSiteAd
              slotId="Mobile_ScoreCard_ad"
              adUnit={pageAds?.companion_banner}
              sizes={[[320, 60]]}
              width={320}
              height={60}
              style={{ marginLeft: "45px" }}
              removeAdSpan= {true}
              lazyLoad={false}
            />
          </div>}
    <TopPriorityData pageAds={pageAds} liveTvFlag={liveTvFlag} isMobile={true} topPriorityData={topPriorityData}/>
    <div style={{ minHeight: "300px"}}>
    <NewSiteAd 
        slotId="MTF_300_1"
        adUnit={pageAds?.MTF_300}
        sizes={[
            [320, 250],
            [300, 250],
            [336, 280],]}
        style={{ textAlign: "center" }}
        loadOnScroll={true}
    />
    </div>
    <RamMandirTimeLine />
    <RamMandirPhotos isMobile={true} pageAds={pageAds} photoStories={photoStories}/>
    <div style={{ minHeight: "300px"}}>
    
    <NewSiteAd 
        slotId="MID_300_2"
        adUnit={pageAds?.MID_300}
        sizes={[
            [320, 250],
            [300, 250],
            [336, 280],]}
        style={{ textAlign: "center" }}
        loadOnScroll={true}
    />
    </div>
    <RamMandirDetails isMobile={true} />
    <RamMandirTour isMobile={true} />

    <RamMandirVideos videoStories={videoStories} />
    <div style={{ minHeight: "300px"}}>
        <NewSiteAd 
            slotId="BTF_300_3"
            adUnit={pageAds?.BTF_300}
            sizes={[
                [320, 250],
                [300, 250],
                [336, 280],]}
            style={{ textAlign: "center" }}
            loadOnScroll={true}
        />
    </div>
    <RamMandirWebstories webStoriesList={webStoriesList} />
    <RamMandirTopNews isMobile={true} topNewsStories={topNewsStories} />
    <LazyLoad height={1000} once offset={200}>
        <RamMandirInfo />
    </LazyLoad>
    <AudioPlayer src="https://images.news18.com/ibnkhabar/uploads/2024/01/New18-Pranam-Siya-Ram-Song-short-version-2024-01-dddeea57de2fcb94e04d8bf4b644af3c.mp3" isMobile={true} />

    <style jsx global>{`    
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
    `}</style>
    </>)

}

export default RamMandirMobile;