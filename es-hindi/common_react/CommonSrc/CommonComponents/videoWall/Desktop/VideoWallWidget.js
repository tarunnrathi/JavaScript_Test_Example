import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import Image from "../../../../CommonUtils/Image";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import fetchUtility from "includes/sFetchUtility";
import * as VIDEO_CONFIG from "../video.config";
import ErrorBoundary from "../../../../CommonUtils/errorBoundary";
import { getImageUrl } from "../video.utils";

function VideoWallHome(props) {
  const {
    orientation = "portrait",
    page = "home",
    videoWallData = [],
    category = null,
    moreBtn,
    title,
    language = "punjabi",
    strategy = "CSR",
    tags = null
  } = props; // portrait | landscape
  const [mainData, setMainData] = useState({});
  const [loadGlide, setLoadGlide] = useState(false);
  let labels = VIDEO_CONFIG[language];
  const navigateToVideoWallPage = (e, postId, videoId, position, slug) => {
    try{
      e.preventDefault();
      /*if (videoId) {
        window.sessionStorage.setItem("selectedVidIdForWall", videoId);
      }*/
      if (position) {
        typeof ga !== "undefined" ? ga(
          "send",
          "event",
          page === "home"
            ? `select_home_page_${
              orientation === "video-wall" ? "video-wall" : orientation === "portrait" ? "vertical" : "horizontal"
              }_videos`
            : "select_videos",
          "click",
          parseInt(position) + 1 + "," + postId
        ) : null;
      }
      if (videoId) {
        window.location.href = `${window.location.origin}/${
          orientation === "video-wall" ? "video-wall" : orientation === "portrait" ? "shorts" : "video-list"
        }/${category ? `${category}/${slug}_${videoId}` : `${slug}_${videoId}`}`;
      } else {
        window.location.href = `${window.location.origin}/${
          orientation === "video-wall" ? "video-wall" : orientation === "portrait" ? "shorts" : "video-list"
        }/${category ? category : ""}`;
      }
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try{
      //console.log(document?.querySelector, document?.querySelector(`.nwvdsslide-in-${orientation}`), "====", mainData);
      if(mainData?.length > 0 && !loadGlide && document?.querySelector(`.nwvdsslide-in-${orientation}`)){
        setLoadGlide(true);
        new Glide(document?.querySelector(`.nwvdsslide-in-${orientation}`), {
          autoplay: false,
          type: "carousel",
          perView: orientation === "portrait" && page != "article" ? 4 : 3,
          gap: orientation === "portrait" ? 15 : 40,
          slidesToScroll: 1,
        }).mount();
      }
    } catch(e) {
      console.log(e);
    }
  }, [mainData]);

  useEffect(async () => {
    try{
      if(strategy == "CSR"){
        let apiPath = page != "article" ? VIDEO_CONFIG["api"].home_widget(orientation, category, language) : VIDEO_CONFIG["api"].article_widget(category, tags, language);
        if(page == "home"){
          let apiData = await fetchUtility(`${publicRuntimeConfig.nodeApiAjaxUrl}${apiPath}`, []);
          //console.log(apiData, "api data");
          setMainData(apiData);
        } else {
          let apiData = await fetchUtility(`${publicRuntimeConfig.nodeApiAjaxUrl}${apiPath}`, []);
          //console.log(apiData, "api data category");
          setMainData(apiData);
        }
      } else {
        setMainData(videoWallData);
      }
    } catch(e) {
      console.log(e);
    }
  }, []);

  return (
    <ErrorBoundary {...props}>
    {
        mainData?.length > 0 && 
            <div className="nwvdswrap">
                <div className="globalhd large">
                    <h2>
                        <a href={`/${orientation === "video-wall" ? "video-wall" : orientation === "portrait" ? "shorts" : "video-list"}/${
                          category ? category : ""
                        }`} 
                        onClick={(e) => navigateToVideoWallPage(e)} 
                        className="title-button">{title ? title : orientation === "video-wall" ? labels?.home_widget?.wall_title : orientation === "portrait" ? labels?.home_widget?.portrait_title : labels?.home_widget?.landscape_title}</a>
                    </h2>
                </div>

                <div className="nwvdsslide">
                    <div className={`nwvdsslide-in-${orientation}`}>
                        <div data-glide-el="track">
                            <ul>
                                {
                                    mainData &&
                                    mainData.map((item, idx) => {
                                    return (
                                        <li key={`wall_${idx}_${orientation}`}>
                                            <a
                                            href={`/${
                                              orientation === "video-wall" ? "video-wall" : orientation === "portrait" ? "shorts" : "video-list"
                                            }/${category ? category : ""}`}
                                                onClick={(e) =>
                                                    navigateToVideoWallPage(
                                                    e,
                                                    item.id,
                                                    item.mongo_id_s,
                                                    idx,
                                                    item.slug
                                                )}
                                            >
                                            <figure>
                                                <Image
                                                    src={getImageUrl(item, language)}
                                                    // src={`https://images.news18.com/staging/kannada/uploads///2022///12///image-18-1.png`}
                                                    alt={item?.display_headline || item?.headline}
                                                />
                                            </figure>
                                            <h3>{item?.display_headline || item?.headline}</h3>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="nwvdsar" data-glide-el="controls">
                            <button data-glide-dir="<"></button>
                            <button data-glide-dir=">"></button>
                        </div>

                        <div data-glide-el="controls[nav]" className="nwvdsblt">
                            <button type="button" data-glide-dir="=0"></button>
                            <button type="button" data-glide-dir="=1"></button>
                            <button type="button" data-glide-dir="=2"></button>
                            <button type="button" data-glide-dir="=3"></button>
                            <button type="button" data-glide-dir="=4"></button>
                        </div>
                    </div>
                </div>

                <a onClick={(e) => navigateToVideoWallPage(e)} className="aurbhi-button">
                {moreBtn ? moreBtn : labels?.home_widget?.moreBtn} <span></span>
                </a>
            </div>
        }
      <style global jsx>
      {`
        .nwvdswrap {
          width: ${(page == "article") ? '95%' : '900px'};
          background: #1f1f1f;
          padding: 15px 0;
          margin: 16px 0;
        }
        .nwvdsslide {
          position: relative;
        }
        .nwvdsslide-in-${orientation} {
          overflow: hidden;
          margin: 0 35px;
        }
        .nwvdsslide-in-${orientation} ul {
          display: flex;
          margin-bottom: 30px;
        }
        .nwvdsslide-in-${orientation} ul li {
          background: #000;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #707070;
          border-radius: 5px;
          overflow: hidden;
          cursor: pointer;
        }
        .nwvdsslide-in-${orientation} ul li a figure {
          width: 100%;
          height: ${orientation === "portrait" ? "335px" : "135px"};
          position: relative;
        }
        .nwvdsslide-in-${orientation} ul li a figure:before {
          content: "";
          width: 45px;
          height: 45px;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          margin: -22px 0 0 -22px;
          cursor: pointer;
          background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/video-iconnew.png)
            0 0 no-repeat;
        }
        .nwvdsslide-in-${orientation} ul li a figure img {
          width: 100%;
          height: ${orientation === "portrait" ? "335px" : "135px"};
          border-radius: 5px 5px 0 0;
        }
        .nwvdsslide-in-${orientation} ul li a h3 {
          padding: 10px;
          font-size: 15px;
          line-height: 22px;
          color: #d0d0d0;
          height: 79px;
          overflow: hidden;
        }

        .nwvdswrap .globalhd {
          border-bottom: 1px solid #d0d0d0;
          margin: 0 20px 20px 20px;
        }
        .nwvdswrap .globalhd h2,
        .nwvdswrap .globalhd h2 a {
          color: #fff !important;
        }

        .nwvdsar {
        }
        .nwvdsar button {
          position: absolute;
          top: 50%;
          width: 25px;
          height: 32px;
          background: #ff0000;
          left: 0px;
          border-radius: 0px 4px 4px 0px;
          border: none;
          outline: none;
          cursor: pointer;
        }
        .nwvdsar button:last-child {
          right: 0px;
          left: auto;
          transform: rotate(180deg);
        }
        .nwvdsar button:after,
        .nwvdsar button:before {
          content: "";
          position: absolute;
          width: 5px;
          height: 5px;
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          transform: rotate(-45deg);
          top: 13px;
        }
        .nwvdsar button:after {
          left: 8px;
        }
        .nwvdsblt {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 5px;
        }
        .nwvdsblt button {
          width: 20px;
          height: 4px;
          background: #d6d6d6;
          border-radius: 3px;
          display: block;
          border: none;
          outline: none;
        }
        .nwvdsblt button.glide__bullet--active {
          background: #ed1c24;
        }
        .nwvdswrap .aurbhi-button {
          color: #d0d0d0;
          padding-right: 20px;
          cursor: pointer;
          display: block;
          text-align: right;
          float: none!important;
        }
        .nwvdswrap .aurbhi-button span {
          background: #ed1c24;
          width: 19px;
          height: 19px;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          border-radius: 100%;
          display: inline-block;
          position: relative;
          top: 3px !important;
          margin-left: 4px !important;
        }
        .nwvdswrap .aurbhi-button span::before {
          left: 4px;
        }
        .nwvdswrap .aurbhi-button span::after, .nwvdswrap .aurbhi-button span::before {
          content: "";
          position: absolute;
          top: 7px;
          width: 4px;
          height: 4px;
          border-top: 1px solid #fff;
          border-right: 1px solid #fff;
          display: block;
          transform: rotate(45deg);
        }
        .nwvdswrap .aurbhi-button span::after {
          left: 8px;
        }
        .nwvdswrap .title-button {
          cursor: pointer;
        }
      `}
      </style>
    </ErrorBoundary>
  );
}

export default VideoWallHome;
