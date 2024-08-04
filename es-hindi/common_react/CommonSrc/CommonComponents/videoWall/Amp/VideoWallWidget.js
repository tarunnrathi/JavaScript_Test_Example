import React, { useEffect, useState } from "react";
import { imageLoader } from "includes/article.util";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import * as VIDEO_CONFIG from "../video.config";
import { getImageUrl } from "../video.utils";

const VideoWallWidget = (props) => {
  const {
    orientation = "portrait",
    page = "home",
    videoWallData = [],
    category = "",
    title,
    language
  } = props; // portrait | landscape
  let labels = VIDEO_CONFIG[language];
  return (
    <>
      <div className="globalhd">
        <h2>
          <a
            href={`/${orientation === "portrait" ? "shorts" : "video-list"}/${
              category ? category : ""
            }`}
          >
            {title ? title : orientation === "video-wall" ? labels?.home_widget?.wall_title : orientation === "portrait" ? labels?.home_widget?.portrait_title : labels?.home_widget?.landscape_title}
          </a>
        </h2>
      </div>
      <amp-carousel
        type="slides"
        width="450"
        height={orientation === "portrait" ? "700" : "300"}
        layout="responsive"
        autoplay=""
        controls
        delay="4000"
        data-next-button-aria-label="Go to next slide"
        data-previous-button-aria-label="Go to previous slide"
      >
        {videoWallData && videoWallData.length
          ? videoWallData.map((item, key) => (
              <li key={key}>
                <figure>
                  <a
                    href={`/${
                      orientation === "portrait" ? "shorts" : "video-list"
                    }/${
                        category
                          ? `${category}/${item.slug}_${item.mongo_id_s}`
                          : `${item.slug}_${item.mongo_id_s}`
                      }`}
                  >
                    <amp-img
                      alt={item["display_headline"] || item["headline"]}
                      src={imageLoader ? imageLoader(getImageUrl(item, language), 320, 220) : getImageUrl(item, language)}
                      //   src={
                      //     "https://images.news18.com/staging/kannada/uploads///2022///12///image-18-1.png"
                      //   }
                      width={320}
                      height={orientation === "portrait" ? 600 : 220}
                      layout="responsive"
                    ></amp-img>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={orientation === "portrait" ? "100" : "88"}
                      height={orientation === "portrait" ? "100" : "88"}
                      className="main_vid_icn "
                      viewBox={
                        orientation === "portrait" ? "0 0 80 80" : "0 0 88 88"
                      }
                    >
                      <path
                        data-name="Video"
                        d="M465.147,1274.523a35,35,0,1,0,35,35A35,35,0,0,0,465.147,1274.523Zm15.107,37.255-9.895,5.736-10.231,5.934a2.779,2.779,0,0,1-1.389.393,2.306,2.306,0,0,1-1.169-.313,2.563,2.563,0,0,1-1.232-2.269v-23.306a2.51,2.51,0,0,1,1.16-2.281,2.556,2.556,0,0,1,2.631.065c6.814,3.947,13.679,7.928,20.126,11.667a2.483,2.483,0,0,1,0,4.375Z"
                        transform="translate(-421.15 -1268.52)"
                        fill="#fff"
                        opacity="0.9"
                      ></path>
                    </svg>
                  </a>
                  <div className="chmpntpnwshd">
                    <h2>
                      <a
                        href={`/${orientation === "portrait" ? "shorts" : "video-list"}/${
                          category
                            ? `${category}/${item.slug}_${item.mongo_id_s}`
                            : `${item.slug}_${item.mongo_id_s}`
                        }`}
                      >
                        {item["display_headline"] || item["headline"]}
                      </a>
                    </h2>
                  </div>
                </figure>
              </li>
            ))
          : ""}
      </amp-carousel>
      <style jsx global>{`
        .chmpntpnwshd a {color: #fff;display: block;}
        .chmpntpnwshd {
          background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
          position: absolute;bottom: 0;left: 0;right: 0;padding: 20px 16px 24px;cursor: pointer;
        }
        .chmpntpnwshd h1,.chmpntpnwshd h2,.chmpntpnwshd h3 {
          font-size: 18px;
          line-height: 26px;
          font-weight: 700;
          color: #fff
        }
        .main_vid_icn {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          display: block;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default VideoWallWidget;
