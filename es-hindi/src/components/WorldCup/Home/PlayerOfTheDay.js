import React from "react";
import LazyLoadImage from "components/Common/CustomImage";

const PlayerOfTheDay = ({ isAmp = false, WcPlayerOfTheDay }) => {
  return (
    <div className="play_of_day">
      <h2 className="page_title">
        प्लेयर <span> ऑफ द डे</span>
      </h2>
      <div className="of_day_img">
        <div className="day_img">
          <LazyLoadImage
            isLazyLoad={false}
            isAMP={isAmp}
            src={WcPlayerOfTheDay?.player_image}
            height={209}
            width={313}
            title={WcPlayerOfTheDay?.player_title}
            alt={WcPlayerOfTheDay?.player_title}
          />
        </div>
      </div>
      <div className="day_intro">
        <p>{WcPlayerOfTheDay?.player_description || ""}</p>
        <div className="day_icon">
          <LazyLoadImage
            src={`https://images.news18.com/static_news18/pix/ibnhome/news18/cricket-silhouette.svg`}
            height={46}
            width={130}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerOfTheDay;
