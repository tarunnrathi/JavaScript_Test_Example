import React, { useState, useEffect, useContext } from "react";
import UserContext from 'widgets/Common/Responsive/GlobalContext';
// import $ from "jquery";

const LiveTv = () => {
  const { pageData } = useContext(UserContext);
  const [isLiveTV, setIsLiveTV] = useState(pageData.liveTvFlag);

  useEffect(() => {
    if(isLiveTV) {
      setTimeout(() => {
        const _fileref = document.createElement("script");
        _fileref.setAttribute(
          "src",
          "//content.vidgyor.com/live/dai/js/vidgyor_livemidroll_vjs_n18.min.js"
        );
        _fileref.async = true;
        if (typeof _fileref !== "undefined") {
          document.getElementsByTagName("head")[0].appendChild(_fileref);
        }
        _fileref.onload = function() {
          const playerContainer = document.querySelector("#playerContainer");
          playerContainer.innerHTML = "";
          const posterImage =
            "//images.news18.com/static-guju/uploads/2019/11/GujaratiLIVE-TV-.png?impolicy=website&width=386&height=220";
          const videoUrl = "";
          const channelName = "news18india_home";
          const isMute = true;
          const isAutoplay = true;
          VIDGYOR.loadPlayer(
            posterImage,
            videoUrl,
            channelName,
            isMute,
            isAutoplay
          );
          VIDGYOR.hideControlBar(false);
        };
      }, 4000);
    }
  }, []);

  return (
    <React.Fragment>
      {
        isLiveTV ? <div className="live_tv">
        <h2 className="livetv_title"><a href="/live-tv/etv-gujarati/">LIVE TV</a></h2>
        <div className="newlivetv-widget-play" id="playerContainer" />
      </div> : ''
      }

      <style>{`
        .newlivetv-widget-play {
            width: 100%;
            height: 220px;
            background: #000 url(//images.gujarati.news18.com/static-guju/uploads/2019/11/GujaratiLIVE-TV-.png);
            overflow: hidden;
            background-size: 100% 100%;
        }
        .live_tv {
            width: 100%;
            padding-bottom: 15px;
        }
      `}</style>
    </React.Fragment>
  );
};

export default LiveTv;
