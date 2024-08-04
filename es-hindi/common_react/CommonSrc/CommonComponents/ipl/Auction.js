import { useEffect, useState } from "react";
import { iplAuctionContent } from "../../../CommonHelper/iplHelper";
import Glide from "@glidejs/glide";
// import { useAmp } from "next/amp";
import ErrorBoundary from "../../../CommonUtils/errorBoundary";

const Auction = ({
  lang: hcLang,
  mode: hcMode,
  players,
  eventLabel,
  // width,
  // height,
} = {}) => {
  let [master, setMaster] = useState(() => players);
  // const isAmp = useAmp();
  const [g, setG] = useState(null);

  useEffect(() => {
    if (
      !(!players?.OnOff || players?.OnOff == "N" || !players?.players.length)
    ) {
      updateContent();
      var inId = setInterval(() => {
        updateContent();
      }, 30000);
    }

    return () => clearInterval(inId);
  }, []);

  useEffect(() => {
    let el = document.querySelector(".ipl_widget_slider");
    if (el) {
      let gIndex = 0;
      if (g) {
        gIndex = g.index;
        g.destroy();
      }
      let glide = new Glide(".ipl_widget_slider", {
        autoplay: 5000,
        type: "carousel",
        perView: 3,
        gap: 10,
        slidesToShow: 1,
        dots: "#dots",
        draggable: true,
        startAt: gIndex > (master || players)?.players ? 0 : gIndex,
        breakpoints: {
          767: {
            perView: 1,
            slidesToShow: 1,
            peek: {
              before: 0,
              after: 70,
            },
          },
        },
      });
      setG(glide);
      glide.mount();
    }
  }, [master]);

  const updateContent = async () => {
    try {
      let data = await iplAuctionContent({
        mode: hcMode,
        lang: hcLang,
      });
      if (data?.players) {
        setMaster(data.players);
      }
    } catch (error) {}
  };

  if (!players?.OnOff || players?.OnOff == "N" || !players?.players.length) {
    return null;
  }

  // if (isAmp) {
  //   return (
  //     <>
  //       <amp-iframe
  //         width="300"
  //         height="300"
  //         layout="responsive"
  //         sandbox="allow-scripts allow-same-origin"
  //         src="https://foo.com/iframe"
  //       >
  //         <amp-img layout="fill" src="" placeholder=""></amp-img>
  //       </amp-iframe>
  //     </>
  //   );
  // }

  master = master || players;

  return (
    <ErrorBoundary>
      <div
        id="ipl-widget"
        className="ipl-widget"
        onClick={() => {
          if (eventLabel && typeof ga != "undefined") {
            ga("send", "event", {
              eventCategory: "IPL_Auction_widget",
              eventAction: "Click",
              eventLabel,
            });
          }
        }}
      >
        <div className="ipl_widget_outter">
          <div className="ipl_widget">
            <div className="ipl_widget_left">
              <a href={master?.urls?.detailPageLink || ""}>
                <p
                  className={`ipl_widget_text ${
                    master?.labels?.liveUpdates
                      ?.toLocaleLowerCase()
                      ?.includes("live")
                      ? ""
                      : "ipl_widget_highlight"
                  }`}
                  id="ipl_widget_text"
                >
                  {master?.labels?.liveUpdates}
                  <span>{master?.labels?.iplAuctionText}</span>
                </p>
                <i>
                  <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/players_icon_1612895589.svg" />
                </i>
              </a>
              <a href={master?.urls?.detailPageLink} className="detailedview ">
                {master?.labels?.iplDetailView}
              </a>
            </div>
            <div className="ipl_widget_midd">
              <div className="ipl_widget_slider">
                <div className="glide__track" data-glide-el="track">
                  <div className="glide__slides" id="players-list">
                    {master?.players
                      ? master.players.map((player) => (
                          <div
                            className="ipl_widget_row"
                            style={{ borderColor: player.teamColor }}
                          >
                            <a href={player.teamUrl || ""}>
                              <div className="ipl_widget_row_left">
                                <p>{player.name}</p>
                                <span style={{ borderColor: player.teamColor }}>
                                  {player.teamShort} | {player.designation}
                                </span>
                              </div>
                              <p className="ipl_widget_row_right">
                                ₹{" "}
                                {player?.amount &&
                                typeof player.amount == "number"
                                  ? (player.amount / 10000000).toFixed(2)
                                  : "0.00"}
                                <br />
                                <span>({master?.labels?.crorelabel})</span>
                              </p>
                            </a>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                <div
                  className="glide__bullets"
                  id="glide__bullets_id"
                  data-glide-el="controls[nav]"
                >
                  {master?.players.map((_, index) => (
                    <button
                      className="glide__bullet"
                      data-glide-dir={`=${index}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            <div className="ipl_widget_right">
              <a href={master?.urls?.liveBlogLink} className="ipl_liveblog">
                {master?.labels?.iplLiveBlogText}
              </a>
              <button
                className="find_squad"
                onClick={() => {
                  let element = document.getElementById("find_squad_open");
                  element?.classList.toggle("show");
                }}
              >
                {master?.labels?.findPlayerSquad}
              </button>
              <ul className="find_squad_open" id="find_squad_open">
                {master?.dropDownLlist?.map((list) => (
                  <li>
                    <a href={list.link}>{list.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @font-face {
          font-family: "Segoe Pro Regular";
          font-style: normal;
          font-weight: normal;
          src: local("Segoe Pro Regular"),
            url("https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/fonts/SegoePro-Regular.woff")
              format("woff");
        }

        @font-face {
          font-family: "Segoe Pro Bold";
          font-style: normal;
          font-weight: normal;
          src: local("Segoe Pro Bold"),
            url("https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/fonts/SegoePro-Bold.woff")
              format("woff");
        }
        .ipl_widget_outter {
          background: #fff;
          max-width: 1284px;
          margin: auto;
          padding: 10px 10px;
          box-sizing: border-box;
        }
        .ipl_widget {
          display: flex;
          max-width: 1244px;
          height: 60px;
          margin: auto;
          background: #f5f5f5 0% 0% no-repeat padding-box;
          border: 1px solid #d0d0d0;
          align-items: center;
        }
        .ipl_widget_left {
          width: 230px;
          height: 60px;
          background: #ff5148 0% 0% no-repeat padding-box;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 10px;
          box-sizing: border-box;
        }
        div#ipl-widget {
          min-height: 65px;
        }
        .ipl_widget_highlight::after {
          display: none;
        }
        div#ipl-widget {
          clear: both;
          width: 100%;
          background: #f5f5f5;
        }
        .ipl_widget_right {
          width: 168px;
          height: 58px;
          border-left: 1px #d0d0d0 solid;
          box-sizing: border-box;
          padding-left: 3px;
          padding-right: 1px;
          position: relative;
        }
        .ipl_widget_midd {
          width: calc(100% - 398px);
          padding: 0 6px;
          box-sizing: border-box;
          min-width: 830px;
        }
        .ipl_widget_slider .glide__track {
          overflow: hidden;
          width: 100%;
        }
        .ipl_widget_slider .glide__slides {
          display: flex;
          overflow: hidden;
          padding: 9px 0;
          height: auto;
        }
        .find_squad {
          width: 160px;
          height: 24px;
          background: #001d42 0% 0% no-repeat padding-box;
          border-radius: 2px;
          color: #fff;
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/dropdown_arrow_1609752439.png);
          background-position: 96% center;
          appearance: none;
          font-size: 11px;
          padding: 0 5px 0 6px;
          font-family: "Segoe Pro Bold";
          text-transform: uppercase;
          border: 0;
          text-align: left;
          outline: none;
        }
        ul.find_squad_open {
          list-style: none;
          background: #001d42 0% 0% no-repeat padding-box;
          position: absolute;
          width: 160px;
          border-radius: 2px;
          top: 52px;
          display: none;
          z-index: 99;
        }
        ul.find_squad_open li a {
          color: #fff;
          font-size: 11px;
          text-decoration: none;
          position: relative;
          font-family: "Segoe Pro Regular";
          text-transform: uppercase;
          padding: 5px 6px 5px 14px;
          display: block;
          border-bottom: 1px rgb(255 255 255 / 31%) solid;
        }
        ul.find_squad_open li a:after {
          content: "-";
          position: absolute;
          left: 5px;
          top: 4px;
        }
        .ipl_widget_row {
          height: 48px;
          background: #ffffff 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #0000003d;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 4px #000 solid;
          overflow: hidden;
          min-width: 271px;
          margin: 0 5px;
        }

        .ipl_widget_row_right {
          width: 80px;
          height: 44px;
          background: #efefef 0% 0% no-repeat padding-box;
          border-radius: 0px 4px 0px 0px;
          text-align: center;
          color: #464646;
          font-family: "Segoe Pro Bold";
          line-height: 16px;
          padding-top: 7px;
          margin: 0;
        }
        .ipl_widget_row_left p {
          color: #464646;
          font-size: 15px;
          font-family: "Segoe Pro Bold";
          line-height: 15px;
          padding-bottom: 3px;
          margin: 0;
        }
        .ipl_widget_row_left span {
          border-left: 4px #b32524 solid;
          letter-spacing: 0px;
          color: #464646;
          text-transform: uppercase;
          font-family: "Segoe Pro Regular";
          font-size: 13px;
          padding-left: 3px;
          line-height: 10px;
          display: inline-block;
        }
        .ipl_widget_row_right span {
          color: #464646;
          font-size: 12px;
          font-family: "Segoe Pro Regular";
        }
        .ipl_widget_row_left {
          width: calc(100% - 58px);
          padding-left: 10px;
          box-sizing: border-box;
        }
        a.ipl_liveblog {
          color: #e1261d;
          font-size: 11px;
          position: relative;
          font-family: "Segoe Pro Bold";
          text-align: center;
          display: block;
          padding: 4px 4px 5px 22px;
          border-bottom: 1px #d0d0d0 solid;
          margin-bottom: 4px;
          line-height: 16px;
          text-transform: uppercase;
          text-decoration: underline;
        }

        .ipl_widget_text {
          text-align: right;
          display: block;
          padding-right: 10px;
          color: #fff;
          text-transform: uppercase;
          font-size: 14px;
          font-family: "Segoe Pro Regular";
          position: relative;
          line-height: 18px;
          margin: 0;
        }
        .ipl_widget_text span {
          display: block;
          font-family: "Segoe Pro Bold";
          font-size: 18px;
        }
        .ipl_widget_text:after {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 100px;
          right: 103px;
          top: 7px;
        }

        a.ipl_liveblog:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/live_blog_1612899802.svg);
          background-repeat: no-repeat;
          background-position: left center;
          content: "";
          position: absolute;
          left: 0;
          width: 18px;
          height: 18px;
        }

        .ipl_widget_row a {
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
          text-decoration: none;
        }

        @keyframes mymove {
          0% {
            background: #ff5148;
          }
          50% {
            background: #fff;
          }
          100% {
            background: #ff5148;
          }
        }
        .ipl_widget_left i {
          position: relative;
          top: 3px;
        }
        .ipl_widget_text:after {
          animation-name: mymove;
          animation-duration: 1s;
          animation-iteration-count: infinite;
        }
        .ipl_widget_slider .glide__bullets {
          display: none;
        }
        .ipl_widget_left a:first-child {
          display: flex;
          color: #fff;
        }
        .detailedview {
          display: none;
        }
        ul.find_squad_open.show {
          display: block;
        }

        .navigation {
          margin-bottom: 0;
        }
        .ipl-widget-urudu .ipl_widget_row_left {
          padding-right: 20px;
        }
        body .ipl_widget_row_left p {
          padding-bottom: 0px;
          font-size: 14px;
          padding-top: 3px;
        }

        @media screen and (max-width: 767px) {
          .ipl_widget {
            width: 100%;
            height: auto;
            display: block;
            box-sizing: border-box;
            border: 0;
          }
          .ipl_widget_left {
            width: 100%;
            justify-content: flex-start;
            padding-left: 10px;
            position: relative;
            height: 42px;
          }
          .ipl_widget_midd {
            width: 100%;
            padding: 0;
            padding-left: 10px;
            min-width: inherit;
          }
          .ipl_widget_right {
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: auto;
            align-items: center;
            border-top: 1px dashed #c4c4c4;
            background: #fff;
            box-shadow: 0px 3px 6px #00000029;
            padding: 0 10px;
            position: relative;
          }
          a.ipl_liveblog {
            border: 0;
            padding-left: 20px;
            font-size: 11px;
            margin: 0;
            line-height: 17px;
            text-transform: uppercase;
            text-decoration: underline;
          }
          a.ipl_liveblog:after {
            background-size: 13px;
            width: 13px;
            top: 5px;
          }
          .ipl_widget_slider .glide__bullets {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1px 0 10px;
          }
          .ipl_widget_slider button.glide__bullet {
            width: 4px;
            height: 4px;
            background: #011e44 0% 0% no-repeat padding-box;
            border-radius: 4px;
            border: 0;
            margin: 0 6px;
            outline: none;
            padding: 0;
          }
          .ipl_widget_slider button.glide__bullet.glide__bullet--active {
            background: #ed1c24;
            width: 6px;
            height: 6px;
          }
          .detailedview {
            display: block;
            color: #ffffff;
            text-transform: uppercase;
            font-size: 11px;
            position: absolute;
            right: 15px;
            bottom: 3px;
            font-family: "Segoe Pro Bold";
            padding-right: 9px;
            text-decoration: underline;
          }
          .detailedview:after,
          .detailedview:before {
            display: block;
            position: absolute;
            content: "";
          }
          .detailedview:after {
            border-right: 2px solid #fff;
            border-top: 2px solid #fff;
            width: 4px;
            height: 4px;
            transform: rotate(45deg);
            top: 6px;
            right: -4px;
          }
          .detailedview:before {
            width: 6px;
            height: 2px;
            background: #fff;
            right: -2px;
            top: 8px;
          }
          .ipl_widget_text {
            line-height: 18px;
          }
          ul.find_squad_open {
            right: 10px;
            top: 24px;
          }
          ul.find_squad_open li a {
            padding: 9px 6px 9px 14px;
          }
          ul.find_squad_open li a:after {
            top: 8px;
          }
          .ipl_widget_outter {
            padding: 0;
          }
          .ipl_widget_row {
            flex-shrink: 0.1;
            width: 100%;
          }

          .ipl_amp_widget .amp-carousel-button-next {
            right: 0;
            margin: 0;
          }
          .ipl_amp_widget .amp-carousel-button-prev {
            left: 0;
            margin: 0;
          }
          .ipl_amp_widget .ipl_widget_midd {
            padding-left: 0;
          }
          .ipl_amp_widget .ipl_widget_row {
            position: relative;
            top: 8px;
            min-width: calc(100% - 90px);
          }
          .ipl_amp_widget .ipl_widget_text:before {
            content: "";
            position: absolute;
            background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/players_icon_1612895589.svg);
            width: 29px;
            height: 32px;
            right: -24px;
            top: 4px;
          }

          .hide-detailed-view {
            display: none;
          }
          body .ipl_widget_row_left p {
            padding-bottom: 0px;
            font-size: 14px;
            padding-top: 3px;
          }
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default Auction;
