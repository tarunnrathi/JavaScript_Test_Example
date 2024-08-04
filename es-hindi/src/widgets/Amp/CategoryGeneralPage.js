import React, { useEffect, useState } from "react";
import { imageLoader } from "includes/article.util";
import LazyImage from "components/Common/LazyImage";
import SITE_HELPER from "includes/helper";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Glide from "@glidejs/glide";
import ampHelper from "includes/Amp/ampHelper";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const getURL = (isAmp = false, url) => {
    return url ? url.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl+`${isAmp ? "amp/" : ''}`) : '';
};

const CategoryGeneralPage = (props) => {
  const {
    data: {
      categoryStoriesList = [],
    } = {},
  } = props;

  const ampAds = ampHelper.get_amp_ad_article(
    props?.data?._pageParam?.subCategory,
    props?.data?._pageParam?.category,
    "listing"
  );
  return (
    <>
      <div className="pdngsxtn-lr">
        <div className="glblbghd-sts">
          <ul className="gridview-story">
            {categoryStoriesList.map((eachNews, key) => {
              return (
                <>
                  <li key={key}>
                    <a title="Link" href={getURL(true, eachNews.url)}>
                      <figure className={eachNews.url.includes("photogallery")? "relative photoicon" : eachNews.url.includes("videos")? "relative videoicon" : ""}>
                        {(eachNews?.ff_source == "Hyperlocal" && eachNews?.local18_video_s != '') ? <span className="nwvideoicon"></span> : ""}
                        {/* <div className="tgtm-shr">
                          <span className="tpc fl">
                            {eachNews.sub_category || ""}
                          </span>
                        </div> */}
                        <amp-img
                          alt={eachNews.display_headline || ""}
                          src={imageLoader(eachNews["thumbnail"], 180, 120)}
                          width={180}
                          height={120}
                          layout="responsive"
                        ></amp-img>
                        {/* <span class="sprite vdsicns"></span> */}
                      </figure>
                    </a>
                    <div className="lstintro">
                      <h2>
                        <a title="Link" href={getURL(true, eachNews.url)}>
                          {eachNews.display_headline || eachNews.headline || ""}
                        </a>
                      </h2>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
      <style global jsx>{`
      `}</style>
    </>
  );
};

export default CategoryGeneralPage;
