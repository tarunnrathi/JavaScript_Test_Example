import React, { useState, useEffect } from "react";
import categoryHelper from "includes/category.helper";

const StateLiveTv = (props) => {
  // console.log('Live tV', props);
  // const { pageData } = useContext(UserContext);
  const section = props.pageData.category; // "uttarakhand"
  const [isLiveTV] = useState(true);
  const channel = categoryHelper.getChannelList(section);
  // console.log('channel',channel);

  const stream = channel ? categoryHelper.getStreamChannel(channel) : false;
  const allChannel = categoryHelper.getChannelDetails("none");

  // return ('111');

  useEffect(() => {
    if (isLiveTV) {
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
        _fileref.onload = function () {
          const playerContainer = document.querySelector("#playerContainer");
          playerContainer.innerHTML = "";
          const posterImage =
            "https://hindi.news18.com/js/image/News18 INDIA_LOGO_WEB_NEW_2.png";
          const videoUrl = "";
          const channelName = stream || "news18up";
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

  const handleChannel = () => {
    document.querySelector(".chnllist").classList.toggle("fllst");
  };

  return (
    <React.Fragment>
      {isLiveTV ? (
        <div className="live_tv lvtbbox clearfix">
          <div className="glblbghd">
            <h2 className="hd">
              <span className="blnk"></span> Live TV
            </h2>
            <div className="selectnav" id="lvtvshr-r" onClick={handleChannel}>
              और चैनल देखें
            </div>
            <div className="chnllist">
              <a href="javascript:void(0)" className="chnllist-close" onClick={handleChannel}></a>
              <ul className="clearfix">
                {
                  allChannel && Object.keys(allChannel).length ? (
                    Object.keys(allChannel).map((ele, index) => {
                      return (
                        <li key={index}>
                          <a href={allChannel[ele]?.url}>
                            <img src={allChannel[ele]?.icon || ""} alt={allChannel[ele]?.name} />
                            <span>{allChannel[ele]?.name.toUpperCase() || ""}</span>
                          </a>
                        </li>
                      );
                    })
                  ) : ""
                }
              </ul>
            </div>
          </div>

          <div className="lvtvbox players clearfix" id="playerContainer" />
        </div>
      ) : (
        ""
      )}

      <style jsx>{`
        .lvtbbox {
          background: #121212;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .glblbghd {
          padding: 16px 0 16px 16px;
          width: 100%;
          float: left;
          height: 58px;
          display: -webkit-flex;
          display: flex;
          justify-content: start;
          box-sizing: border-box;
        }
        .glblbghd .hd {
          font-size: 22px;
          color: #fff;
          font-weight: 700;
          line-height: 31px;
          border-right: 1px solid #fff;
          height: 26px;
          padding-right: 16px;
          display: flex;
          flex-shrink: 0;
        }
        .blnk {
          background: red;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          display: inline-block;
          margin-right: 4px;
          animation: mymove 0.5s infinite;
          position: relative;
          top: 10px;
        }
        .selectnav {
          height: 26px;
          line-height: 28px;
          padding: 0 16px;
          border-radius: 5px;
          background: #fff;
          font-size: 12px;
          color: #828282;
          box-shadow: 0 0 2px #222;
          margin-left: 16px;
        }
        .selectnav:after {
          content: "";
          border-top: 8px solid #828282;
          border-left: 8px solid transparent;
          display: inline-block;
          transform: rotate(136deg);
          -webkit-transform: rotate(136deg);
          margin-left: 16px;
          top: -3px;
        }
        .chnllist,
        .chnllist.fllst {
          transition: all 0.5s ease-in-out;
        }
        .chnllist {
          position: fixed;
          top: 0;
          overflow: hidden;
          bottom: 0;
          right: 0;
          padding-top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 99999999;
          transform: scale(0);
          -webkit-transform: scale(0);
        }
        .chnllist-close {
          position: fixed;
          top: 6px;
          right: 3px;
          width: 36px;
          height: 22px;
          padding: 16px 0 0 6px;
        }
        .chnllist-close:before {
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
        }
        .chnllist-close:after {
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
        }
        .chnllist-close:after,
        .chnllist-close:before {
          content: "";
          width: 30px;
          height: 3px;
          background: #fff;
          display: block;
          position: absolute;
        }
        .clearfix {
          clear: both;
        }
        .chnllist li {
          width: 33%;
          margin: 0;
          text-align: center;
          height: 130px;
          float: left;
          padding: 0 5px;
        }
        .chnllist li a {
          margin: auto;
          color: #fff;
        }
        .chnllist li img {
          width: 80px;
        }
        .chnllist li span {
          display: block;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding-top: 5px;
        }
        .lvtvbox {
          background: black;
          height: 250px;
          width: 100%;
        }
        .chnllist, .chnllist.fllst {
          transition: all .5s ease-in-out;
        }
        .chnllist.fllst {
          transform: scale(1);
          -webkit-transform: scale(1);
          padding-top: 50px;
          overflow: scroll;
          height: 100%;
        }
        .chnllist li {
          width: 33%;
          margin: 0;
          text-align: center;
          height: 130px;
          float: left;
          padding: 0 5px;
        }
      `}</style>
    </React.Fragment>
  );
};

export default StateLiveTv;
