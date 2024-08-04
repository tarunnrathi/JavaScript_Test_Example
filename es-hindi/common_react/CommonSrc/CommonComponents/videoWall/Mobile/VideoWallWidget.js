import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import Image from "../../../../CommonUtils/Image";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import fetchUtility from "includes/sFetchUtility";
import * as VIDEO_CONFIG from "../video.config";
import ErrorBoundary from "../../../../CommonUtils/errorBoundary";
import { getImageUrl } from "../video.utils";

function VideoWallWidget(props) {
  const {
    orientation = "portrait",
    page = "home",
    videoWallData = [],
    category = "",
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
      if (position !== undefined || position !== null) {
        typeof ga !== "undefined" ? ga(
          "send",
          "event",
          page === "home"
            ? `select_home_page_${
                orientation === "portrait" ? "vertical" : "horizontal"
              }_videos`
            : "select_videos",
          "click",
          parseInt(position) + 1 + (category ? "," + category : "") + "," + postId
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
      if(mainData?.length > 0 && !loadGlide && document?.querySelector(`.mnwvdsslide-in-${orientation}`)){
        setLoadGlide(true);
        new Glide(document.querySelector(`.mnwvdsslide-in-${orientation}`), {
          autoplay: false,
          type: "carousel",
          perView: 1.2,
          focusAt: "center",
          gap: 0,
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
  }, [])

  return (
    <ErrorBoundary {...props}>
      {
        mainData?.length > 0 && 
          <div className="mnwvdswrap">
            <div className="globalhd large">
              <h2>
                <a
                  href={`/${orientation === "video-wall" ? "video-wall" : orientation === "portrait" ? "shorts" : "video-list"}/${
                    category ? category : ""
                  }`}
                  onClick={(e) => navigateToVideoWallPage(e)}
                >
                  {title ? title : orientation === "video-wall" ? labels?.home_widget?.wall_title : orientation === "portrait" ? labels?.home_widget?.portrait_title : labels?.home_widget?.landscape_title}
                </a>
              </h2>
            </div>

            <div className="mnwvdsslide">
              <div className={`mnwvdsslide-in-${orientation}`}>
                <div data-glide-el="track">
                  <ul>
                    {mainData &&
                      mainData.map((item, idx) => {
                        return (
                          <li key={`wall_${idx}`}>
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
                                )
                              }
                            >
                              <figure>
                                <Image
                                  src={getImageUrl(item, language)}
                                  // src={`https://images.news18.com/staging/kannada/uploads///2022///12///image-18-1.png`}
                                  alt=""
                                />
                              </figure>
                              <h3>{item?.display_headline || item?.headline}</h3>
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <div className="mnwvdsar" data-glide-el="controls">
                  <button data-glide-dir="<"></button>
                  <button data-glide-dir=">"></button>
                </div>

                <div data-glide-el="controls[nav]" className="mnwvdsblt">
                  <button type="button" data-glide-dir="=0"></button>
                  <button type="button" data-glide-dir="=1"></button>
                  <button type="button" data-glide-dir="=2"></button>
                  <button type="button" data-glide-dir="=3"></button>
                  <button type="button" data-glide-dir="=4"></button>
                </div>
              </div>
            </div>

            <a
              href={`/${orientation === "video-wall" ? "video-wall" : orientation === "portrait" ? "shorts" : "video-list"}/${
                category ? category : ""
              }`}
              onClick={(e) => navigateToVideoWallPage(e)}
              className="maurbhi-button"
            >
              {moreBtn ? moreBtn : labels?.home_widget?.moreBtn}
            </a>
        </div>
      }
      <style global jsx>
        {`
          .mnwvdswrap {
            background: #1f1f1f;
            padding: 15px 0;
            margin: 10px 0;
          }
          .mnwvdsslide {
            position: relative;
          }
          .mnwvdsslide-in-${orientation} {
            overflow: hidden;
            margin: 0 10px;
            /* padding: 40px 0 0px 0; */
            padding-top: 30px;
          }
          .mnwvdsslide-in-${orientation} ul {
            display: flex;
            margin-bottom: 30px;
          }
          .mnwvdsslide-in-${orientation} ul li {
            background: #000;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #d0d0d0;
            border-radius: 5px;
            overflow: hidden;
            transition: all 0.5s ease-in-out;
            opacity: 0.8;
            filter: brightness(0.5);
          }
          .mnwvdsslide-in-${orientation} ul li.glide__slide--active {
            transform: scale(1.1);
            z-index: 2;
            transition: all 0.5s ease-in-out;
            filter: brightness(1);
            opacity: 1;
          }
          .mnwvdsslide-in-${orientation} ul li a figure {
            width: 100%;
            height: ${orientation === "portrait" ? "475px" : "135px"};
            position: relative;
          }
          .mnwvdsslide-in-${orientation} ul li a figure:before {
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
          .mnwvdsslide-in-${orientation} ul li a figure img {
            width: 100%;
            height: ${orientation === "portrait" ? "475px" : "135px"};
            border-radius: 5px 5px 0 0;
          }
          .mnwvdsslide-in-${orientation} ul li a h3 {
            padding: 10px;
            font-size: 15px;
            line-height: 22px;
            color: #d0d0d0;
            height: 79px;
            overflow: hidden;
          }
          .mnwvdswrap .globalhd {
            border-bottom: 1px solid #d0d0d0;
            margin: 0 20px 20px 20px;
          }
          .mnwvdswrap .globalhd h2,
          .mnwvdswrap .globalhd h2 a {
            color: #fff !important;
            border-bottom: none;
          }
          .mnwvdsar {
            position: absolute;
            bottom: 40px;
            left: 0;
            right: 0;
            width: 200px;
            margin: auto;
          }
          .mnwvdsar button {
            position: absolute;
            top: 50%;
            border: none;
            outline: none;
            background: none;
            width: 12px;
            height: 12px;
            border-top: 2px solid #a2a2a2;
            border-left: 2px solid #a2a2a2;
            transform: rotate(-45deg);
            margin-top: 6px;
          }
          .mnwvdsar button:last-child {
            right: 0px;
            left: auto;
            transform: rotate(135deg);
          }
          .mnwvdsblt {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin: 60px 0 26px 0;
          }
          .mnwvdsblt button {
            width: 20px;
            height: 4px;
            background: #d6d6d6;
            border-radius: 3px;
            display: block;
            border: none;
            outline: none;
          }
          .mnwvdsblt button.glide__bullet--active {
            background: #ed1c24;
          }
          .maurbhi-button {
            background: #000;
            font-size: 14px;
            font-weight: 700;
            position: relative;
            border-radius: 20px;
            text-align: right;
            border: 1px solid #ed1c24;
            display: table;
            margin: auto;
            color: #e82d2e;
            height: 30px;
            line-height: 30px;
            padding: 0 20px;
          }
        `}
      </style>
    </ErrorBoundary>
  );
}

export default VideoWallWidget;
