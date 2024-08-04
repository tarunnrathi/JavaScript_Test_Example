//import LazyImage from "components/Common/LazyImage";
import React, { memo, useContext } from "react";
import { GlobalContext } from "../../../GlobalStore";
import { getRelativeURL } from "util/global/Helper";
import getConfig from "next/config";
import LazyLoadImage from "components/Common/CustomImage";
const { publicRuntimeConfig } = getConfig();

const RhsPhoto = ({ photoStories = [], isPhoto = false }) => {
  const { globalState = {}, updateData } = useContext(GlobalContext);
  const { ps = [] } = globalState;

  if (!(photoStories.length || ps.length)) {
    return null;
  }

  if (!ps.length) {
    updateData(photoStories, "ps");
  }

  return (
    <>
      <div className="side_srt_gllry">

        <span className="ph_heading cp_rhs_photo_widget">
          <a href={publicRuntimeConfig.siteUrl + `photogallery/`} className="cp_rhs_photo_widget">फोटो</a>
        </span>

        <ul className="PH-listing-wrap">
          {photoStories &&
            photoStories.map((topNews, key) => (
              <li className="PH-list-box cp_rhs_photo_widget" key={"sbph-" + key}>
                <a href={
                  (topNews.weburl || topNews. weburl_r)  ? getRelativeURL(false, (topNews.weburl || topNews. weburl_r)) : ""
                }
                className="cp_related_photogallery cp_rhs_photo_widget">
                  <div className="image-wrap">
                    <figure
                      width={135}
                      height={76}
                    >
                      <LazyLoadImage
                        width={135}
                        height={76}
                        src={topNews.images?.url}
                        alt={topNews.headline || topNews.display_headline}
                        title={topNews.headline || topNews.display_headline}
                      />
                    </figure>
                    <span className="photo-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15.533" height="13.438" viewBox="0 0 15.533 13.438"
                      >
                        <g id="Group_993" data-name="Group 993" transform="translate(0 0.01)">
                          <path id="Path_520" data-name="Path 520" d="M0,64.02a3.1,3.1,0,0,1,.176-.4.676.676,0,0,1,.577-.335H12.141a.948.948,0,0,1,.975.666,1.006,1.006,0,0,1,.048.3q0,1.661,0,3.321a.189.189,0,0,1-.111.189q-2.194,1.273-4.386,2.552A1.071,1.071,0,0,1,7.3,70.18q-1.09-.945-2.171-1.894a1.883,1.883,0,0,0-1.43-.5,1.972,1.972,0,0,0-1.026.409l-2.55,1.85A1.286,1.286,0,0,1,0,70.117v-6.1m9.634,2.3a1.754,1.754,0,1,0-1.7,1.793,1.754,1.754,0,0,0,1.7-1.793" transform="translate(0 -60.105)" fill="#fff" />
                          <path id="Path_521" data-name="Path 521" d="M0,171.5l3.151-2.316a1.028,1.028,0,0,1,1.463.065l2.1,1.855a1.942,1.942,0,0,0,2.381.243q1.825-1.05,3.645-2.108l.419-.243v3.949a.858.858,0,0,1-.828.886c-.084.006-.162.005-.242.005H.935a.8.8,0,0,1-.935-.61V171.5" transform="translate(0 -160.422)" fill="#fff" />
                          <path id="Path_522" data-name="Path 522" d="M56.733,11.429V4.178a1.786,1.786,0,0,0-1.391-1.791,2.16,2.16,0,0,0-.5-.05q-4.823,0-9.646,0h-.212l.121-1.067c.015-.136.034-.271.046-.407A.867.867,0,0,1,46.193.007c1.526.175,3.051.355,4.577.531,1.265.147,2.53.289,3.794.436,1,.116,2,.225,2.994.357a.832.832,0,0,1,.7.945q-.28,2.417-.563,4.832-.215,1.844-.427,3.688a.754.754,0,0,1-.531.631" transform="translate(-42.731 0)" fill="#fff" />
                          <path id="Path_523" data-name="Path 523" d="M139.511,106.181a.915.915,0,1,1-.911.916.915.915,0,0,1,.911-.916" transform="translate(-131.637 -100.848)" fill="#fff" />
                        </g>
                      </svg>
                      {topNews?.gallery_count || 0}
                    </span>
                  </div>
                  <p className="gallery_title">
                    {topNews.headline || topNews.display_headline}
                  </p>
                </a>
              </li>
            ))}
        </ul>
        <div className="aur_dekhen">
          <a
            href={publicRuntimeConfig.siteUrl + "photogallery/"}
            className="readmore"
          >
            और देखें
          </a>
        </div>
      </div>
      <style jsx global>{`
        .side_srt_gllry {
          // height: 910px;
          overflow: hidden;
          width: 100%;
          margin: 15px 0;
          clear: both;
          margin-bottom: 25px;
        }
        .gallery_title {
          padding: 6px 6px 2px;
          width: 100%;
          box-sizing: border-box;
          line-height: 20px;
          font-size: 13px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          background-color: #000;
          color: #fff;
          max-height: 65px;
      }
        .ph_heading {
          color: #000000;
          font-size: 22px;
          line-height: 36px;
          font-weight: bold;
          font-family: "Mukta", sans-serif !important;
          position: relative;
          border-bottom: 1px solid #d9d9d9;
          width: 100%;
          display: block;
        }
        .ph_heading::before {
          content: "";
          height: 5px;
          width: 25px;
          background: #f4342f;
          position: absolute;
          left: 0;
          bottom: -3px;
        }
        .ph_heading a {
          color: ${isPhoto ? "#ffff" : "#000000"};
          -webkit-text-decoration: none;
          text-decoration: none;
        }
        .PH-listing-wrap {display: flex; flex-wrap: wrap; justify-content: space-between;gap: 8px; padding-left: 0;margin: 10px 0; }
			  .PH-listing-wrap li {box-sizing: border-box; width: 31.4%;} 
    		.PH-listing-wrap li a { display: block; } 
    		.PH-listing-wrap .image-wrap { position: relative;} 
    		.PH-listing-wrap .image-wrap > img { display: block; width: 100%;}
        .PH-listing-wrap .image-wrap figure {
          height: 76px;
          border-radius: unset;
      }
    		
        .photo-icon {
          position: absolute;
          background: #E1261D;
          height: 25px;
          line-height: 30px;
          bottom: 0;
          display: flex;
          font-size: 16px;
          color: #fff;
          left: 0;
          padding: 0 0 0 7px;
          font-weight: normal;
          z-index: 1;
          border-radius: 0px 10px 0px 0px;
          width: 50px;
        }
        .photo-icon svg {
            height: 24px!important;
            position: relative;
            vertical-align: middle;
            margin-right: 5px;
        }
        .readmore {
          display: block;
          font-size: 14px;
          line-height: 20px;
          font-family: "Mukta", sans-serif !important;
          font-weight: bold;
          color: ${isPhoto ? "#f8be01" : "#e1261d"};
          background: ${isPhoto ? "" : "#ffffff"};
          margin: 10px 0px;
          position: relative;
          text-align: center;
        }
        .aur_dekhen {
          background: ${isPhoto ? "#2e2e2e" : "#f7f7f7"};
        }
        .aur_dekhen a.readmore {
          display: block;
          margin: 3px auto;
          width: 60px;
        }
        .image-wrap figure img {
          border-radius: 4px 0 0 0;
          width: 100%;
        }
      `}</style>
    </>
  );
};
export default memo(RhsPhoto);
