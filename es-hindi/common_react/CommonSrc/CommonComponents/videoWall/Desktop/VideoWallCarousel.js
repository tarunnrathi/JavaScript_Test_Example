import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import Image from "../../../../CommonUtils/Image";
import * as VIDEO_CONFIG from "../video.config";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import fetchUtility from "includes/sFetchUtility";
import ErrorBoundary from "../../../../CommonUtils/errorBoundary";
import { getImageUrl } from "../video.utils";

function VideoWallCarousel(props) {
  const { relatedVideoWallData, videowallCategory = "", postId = "", title, language, strategy = "CSR", etl = false } = props;
  const [mainData, setMainData] = useState({});
  const [loadGlide, setLoadGlide] = useState(false);
  let labels = VIDEO_CONFIG[language];

  async function fetchData() {
    try{
      if(strategy == "CSR"){
        let apiPath = VIDEO_CONFIG["api"].article_carousel(videowallCategory, language, etl);
        let apiData = [], finalData = [];
        if(etl == true && language == "hindi"){
          apiData = await fetchUtility(`${publicRuntimeConfig.apiUrl}${apiPath}`, []);
        }
        else if(language != "assam"){
          apiData = await fetchUtility(`${publicRuntimeConfig.nodeApiAjaxUrl}${apiPath}`, []);
            //console.log(apiData, "api data", apiPath);
        } else {
          //console.log("assam case");
          let newData = await fetch(`${publicRuntimeConfig.siteUrl}${apiPath}`);
          apiData = await newData.json();
          //console.log(resp, "===");
          /*let [_apiData = []] = await props?.elData?.queryElastic([
              {
                query: `video_wall_i:1 and ff_source:hyperlocal and -local18_video_s:"" ${videowallCategory ? ` and ${VIDEO_CONFIG.filterArr[language]["categories_slug"]}:${videowallCategory}` : ''}`,
                limit: 5,
                filter: "ff_source,local18_video_s,display_headline,headline,post_image,intro,id,posturl,article_data,url,thumbnail",
              },
            ])
          console.log(_apiData, "api data");
          setMainData(_apiData);*/
        }
        // additional check for hindi
        try{
          if(postId){
            (apiData && Object.keys(apiData).length > 0) ? apiData.map((row) => {
              let main_id = row?.id || row?.story_id;
              let _id = (main_id && main_id.indexOf('-') > -1) ? main_id?.split('-')[1] : main_id;
              if(_id != postId){
                finalData.push(row);
              }
            }) : finalData = apiData;
          } else {
            finalData = apiData;
          }
        } catch(e) {
          console.log(e);
          finalData = apiData;
        }
        setMainData(finalData);
      } else {
        setMainData(relatedVideoWallData);
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    try{
      if(mainData?.length > 0 && !loadGlide && document?.querySelector(".newrltdvds-slide-in")){
        setLoadGlide(true);
        new Glide(".newrltdvds-slide-in", {
          autoplay: false,
          type: "carousel",
          perView: 2.6,
          gap: 15,
          slidesToScroll: 1,
          breakpoints: {
            650: {
              perView: 1.2,
            },
          },
        }).mount();
      }
    } catch(e) {
      console.log(e);
    }
  }, [mainData]);

  const navigateToVideoWallPage = (e, videoId, position, slug) => {
    try{
      e.preventDefault();
      window.sessionStorage.setItem("selectedVidIdForWall", videoId);
      typeof ga !== "undefined" ? ga(
        "send",
        "event",
        "select_related_videos",
        "click",
        language == "hindi" ? (`${window.location.href},${window.location.origin}/video-wall/${
          videowallCategory
            ? `${videowallCategory}`
            : ``
        }/`) : videowallCategory + "," + postId + "," + (parseInt(position) + 1)
      ) : null;
      window.location.href = `${window.location.origin}/video-wall/${
        videowallCategory
          ? `${videowallCategory}`
          : ``
      }/`;
    } catch(e) {
      console.log(e);
    }
  };
  return (
    <ErrorBoundary {...props}>
    {
      mainData?.length > 2 && 
      <div className="newrltdvds">
        <div className="newrltdvds-left">
          <div>
            <img
              src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/relatedvdsicon_1669351467.svg"
              alt=""
            />
            <span>{title ? title : labels?.article_carousel?.title}</span>
          </div>
        </div>
        <div className="newrltdvds-slide">
          <div className="newrltdvds-slide-in">
            <div data-glide-el="track">
              <ul>
                {mainData.map((item, idx) => {
                  return (
                    <li>
                      <a
                        onClick={(e) =>
                          navigateToVideoWallPage(e, (language != "assam" && !etl) ? item?.local18_video_s : item?.local18_video, idx, item.slug)
                        }
                      >
                        <figure>
                          <Image
                            src={getImageUrl(item, language)}
                            alt={item?.display_headline || item?.headline}
                            style={{ width: "100%" }}
                          />
                        </figure>
                        <h3>{item?.display_headline || item?.headline}</h3>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div data-glide-el="controls" className="newrltdvdsarrow">
              <button data-glide-dir="<"></button>
              <button data-glide-dir=">"></button>
            </div>
          </div>
        </div>
      </div>
      }
      <style jsx>
      {`
          .newrltdvds {
            background: #3e3e3e;
            height: 100px;
            display: flex;
            align-items: center;
            overflow: hidden;
            border-radius: 4px;
            justify-content: space-between;
            margin-bottom: 15px;
          }
          .newrltdvds-left {
            background: #e1261d;
            width: 100px;
            text-transform: uppercase;
            flex-shrink: 0;
            height: 100px;
            align-items: center;
            display: flex;
            justify-content: center;
            border-radius: 4px 0px 0px 4px;
            padding-top: 6px;
          }
          .newrltdvds-left > div {
            line-height: 0;
            text-align: center;
          }
          .newrltdvds-left > div img {
            display: block;
            margin: auto auto 7px auto;
          }
          .newrltdvds-left > div span {
            font-size: 11px;
            font-weight: bold;
            line-height: 24px;
            color: #fff;
          }
          .newrltdvds-slide {
            position: relative;
            height: 80px;
            width: 100%;
            overflow: hidden;
          }
          .newrltdvds-slide-in {
            margin: 0px 30px;
          }
          .newrltdvds-slide-in > div {
            overflow: hidden;
          }
          .newrltdvds-slide-in ul {
            display: flex;
            height: 80px;
          }
          .newrltdvds-slide-in ul li {
            flex-shrink: 0;
            border-right: 1px solid #6c6c6c;
            padding-right: 20px;
          }
          .newrltdvds-slide-in ul li a {
            display: flex;
            cursor: pointer;
          }
          .newrltdvds-slide-in ul li a figure {
            border: 1px solid #9b9b9b;
            border-radius: 4px;
            line-height: 0;
            overflow: hidden;
            margin-right: 15px;
            width: 120px;
            height: 80px;
            flex-shrink: 0;
            position: relative;
          }
          .newrltdvds-slide-in ul li a figure:before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/videoicon_1669351679.svg) 0 0 no-repeat;
            width: 32px;
            height: 32px;
            margin: -16px 0 0 -16px;
            z-index: 1;
          }
          .newrltdvds-slide-in ul li a figure:after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: #000000;
            border-radius: 4px 4px 0px 0px;
            opacity: 0.3;
            content: "";
          }
          .newrltdvds-slide-in ul li a figure img {
            border-radius: 4px;
            min-width: 100%;
            width: 120px;
            height: 80px;
          }
          .newrltdvds-slide-in ul li a h2,
          .newrltdvds-slide-in ul li a h3 {
            color: #fff;
            font-size: 14px;
            line-height: 20px;
            font-weight: bold;
            word-wrap: break-word;
            word-break: break-word;
            overflow: hidden;
          }
          .newrltdvdsarrow {
          }
          .newrltdvdsarrow button {
            position: absolute;
            width: 14px;
            height: 80px;
            left: 5px;
            background: none;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            border: none;
            cursor: pointer;
          }
          .newrltdvdsarrow button:last-child {
            right: 5px;
            left: auto;
            transform: rotate(180deg);
          }
          .newrltdvdsarrow button:after {
            content: "";
            width: 6px;
            height: 6px;
            border-left: 2px solid #fff;
            border-top: 2px solid #fff;
            display: block;
            transform: rotate(-45deg);
            position: absolute;
            top: 50%;
            left: 5px;
          }
          @media screen and (max-width: 650px) {
            .newrltdvds {
              border-radius: 0;
              display: block;
              height: 130px;
            }
            .newrltdvds-left {
              width: 100%;
              height: 30px;
              border-radius: 0;
              padding-top: 0;
              display: block;
            }
            .newrltdvds-left > div {
              line-height: 34px;
              text-align: left;
            }
            .newrltdvds-left > div img {
              display: inline-block;
              margin: 0 10px;
              width: auto;
            }
            .newrltdvds-left > div span {
              font-size: 16px;
            }
            .newrltdvdsarrow {
              display: none;
            }
            .newrltdvds-slide {
              height: 90px;
            }
            .newrltdvds-slide-in {
              margin: 10px 0 0 10px;
            }
          }
        `}
      </style>
    </ErrorBoundary>
  );
}

export default VideoWallCarousel;
