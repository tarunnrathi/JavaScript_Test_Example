import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { imageLoader } from "includes/article.util";
// import LazyImage from "components/Common/LazyImage";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import siteConfig from "config/site.config";
import { getCompleteURL } from "util/global/Helper";
import useLoadMore from "hooks/useLoadMore";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import LazyLoadImage from "components/Common/CustomImage";

// const MemoLazyImage = memo(LazyImage);
// const MemoSiteAd = memo(SiteAd);

const PhotogalleryTopPriority = (props) => {
  const {
    data: { topRecord = [], bottomRecord = [] } = {},
    sliderFlag = false,
    pageAds,
    category = "",
  } = props;
  if (!sliderFlag) {
    return false;
  }
  useEffect(() => {
    if (topRecord && topRecord.length > 0) {
      new Glide(".section-topslider", {
        startAt: 0,
        perView: 1,
        autoplay: 5000,
        rewind: false,
        dots: true,
        arrows: false,
      }).mount();
    }
  }, []);

  const query_arr = props?.section === '' ? {"post_type":"photogallery"} : {"post_type":"photogallery","categories.slug":`${props?.section}`};
  const {loadMore, categoryData, hasMoreData} = useLoadMore(bottomRecord, 10, 500, query_arr)

  return (
    <>
      <div className="tpnews clearfix ">
        {
          <div className="section-topslider forphotos pgtbox">
            <div data-glide-el="track">
              <ul>
                {topRecord &&
                  topRecord?.length > 0 &&
                  topRecord.map((topPhotos, key) => (
                    <li key={key}>
                      <figure>
                        <a
                          title={topPhotos?.headline || ""}
                          href={
                            getCompleteURL(
                              topPhotos?.weburl_r,
                              topPhotos?.weburl
                            ) || ""
                          }
                        >
                          <span className="sprite phticnl"></span>
                          <LazyLoadImage
                            src={
                              topPhotos?.images?.url
                                ? topPhotos?.images?.url
                                : siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                            }
                            alt={topPhotos.headline || ""}
                            title={topPhotos.headline || ""}
                            width={360}
                            height={274} 
                            isLazyLoad={false}                       
                          />
                          {/* <MemoLazyImage
                            src={
                              topPhotos?.images?.url
                                ? imageLoader(topPhotos?.images?.url, 360, 274)
                                : imageLoader(
                                    siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH,
                                    360,
                                    274
                                  )
                            }
                            alt={topPhotos.headline || ""}
                            title={topPhotos.headline || ""}
                            width={360}
                            height={274}
                            isRes={"mobile"}
                          /> */}
                          <div className="chmpntpnwshd">
                            <div className="tpall clearfix">
                              <span className="tpc fl">
                                {topPhotos?.section || ""}
                              </span>
                            </div>
                            <h3>
                              <a
                                className="title"
                                href={
                                  getCompleteURL(
                                    topPhotos?.weburl_r,
                                    topPhotos?.weburl
                                  ) || ""
                                }
                              >
                                {topPhotos?.display_headline ||
                                  topPhotos?.headline}
                              </a>
                            </h3>
                          </div>
                        </a>
                      </figure>
                    </li>
                  ))}
              </ul>
            </div>
            <div
              className="section-topslider-bullets"
              data-glide-el="controls[nav]"
            >
              {topRecord.map((topPhotos, key) => (
                <button data-index={key} key={key}></button>
              ))}
            </div>
          </div>
        }
        <div className="clearfix add cat-top-ad">
          <div className={"addinner-box addinner_box_300x250"}>
            {/* <MemoSiteAd
              slotId={"mobileAdNew300x250_0"}
              adUnit={pageAds.ATF_320}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={336}
              height={280}
              lazyload={true}
              style={{ padding: "16px" }}
            /> */}
            <NewSiteAd
              slotId={"mobileAdNew300x250_0"}
              adUnit={pageAds.ATF_320}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={336}
              height={280}
              lazyLoad={true}
              style={{ padding: "16px" }}
            />
            {/* <div className="mobileShosh">
                    <SiteAd
                        slotId={"mobileAdNew300x250_1"}
                        adUnit={pageAds.SHOSH_OOP}
                        sizes={[[250,250],[300,250],[336,280]]}
                        width={336}
                        height={280}
                    />
                </div>
            */}
          </div>
        </div>
        {categoryData && categoryData.length && (
          <>
            <ul className="listview-story forbluebg">
              {categoryData.map((eachData, index) => {
                const Src = eachData?.images?.url
                  ? imageLoader(eachData?.images?.url, 360, 288)
                  : imageLoader(
                      siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH,
                      360,
                      288
                    );
                return (
                  <li className="forpurplebg " key={"bottomRecord" + index}>
                    <figure>
                      <span className="sprite phticns"></span>
                      <a
                        title={eachData["headline"]}
                        href={getCompleteURL(eachData["weburl_r"], eachData["weburl"])}
                      >
                        <LazyLoadImage
                            src={Src}
                            alt={eachData["headline"] || "Image"}
                            title={eachData["headline"] || "Image"}
                            width={364}
                            height={288}
                            className="lazyload"                      
                          />
                        {/* <MemoLazyImage
                          width={364}
                          height={288}
                          src={Src}
                          alt={eachData["headline"] || "Image"}
                          title={eachData["headline"] || "Image"}
                          unoptimized={true}
                          className="lazyload"
                          isRes={"mobile"}
                        /> */}
                      </a>
                    </figure>
                    <div className="lstintro">
                      <div className="tag-tm">
                        <span className="tg fl">{eachData?.section || ""}</span>
                      </div>
                      <a
                        title={eachData["headline"] || ""}
                        href={getCompleteURL(eachData["weburl_r"], eachData["weburl"])}
                      >
                        <h2>
                          {eachData?.display_headline || eachData?.headline}
                        </h2>
                      </a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        )}
        {
          <a
            title="Link"
            // href={
            //   (category === ""
            //     ? "/photogallery"
            //     : category === "cricket"
            //     ? "/photogallery/sports/cricket"
            //     : "/photogallery/" + category) + "/page-1/"
            // }
            onClick={loadMore}
            className="rdmr clkeventga"
            data-evcat="More Stories"
            data-evact="click"
            data-evval="1"
          >
            और भी देखें ...{" "}
          </a>
        }
      </div>
      <style jsx global>
        {`
          .chmpntpnwshd .tpall .tpc .fl {
            background: #000;
            margin-right: 16px;
            padding: 0 16px;
            height: 24px;
            line-height: 26px;
            border-radius: 4px;
            font-size: 12px;
            color: #fff;
            display: inline-block;
          }
          .pgtbox {
            position: relative;
            overflow: hidden;
          }
          .pgtbox ul {
            display: flex;
            margin: 0;
            padding: 0;
          }
          .pgtbox ul li {
            position: relative;
            flex-shrink: 0;
            height: 100%;
            list-style: none;
            width: 100%;
          }
          .pgtbox ul li figure {
            position: relative;
            width: 100%;
            float: left;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          .pgtbox ul li figure img {
            width: 100%;
            float: left;
            transform: scale(1);
          }
          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: #7e8186;
            border-radius: 50%;
            margin-right: 8px;
            display: inline-block;
            cursor: pointer;
          }
          .swiper-pagination-bullet-active {
            background: #fff;
          }
          .chmpntpnwshd,
          .aembd-gallery .eginner ul li h2 {
            background: -webkit-linear-gradient(
              top,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 1)
            );
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 120px 16px 16px 16px;
            cursor: pointer;
          }
          .chmpntpnwshd h1,
          .chmpntpnwshd h2,
          .chmpntpnwshd h3 {
            font-size: 18px;
            line-height: 22px;
          }
          .chmpntpnwshd a {
            color: #fff;
            display: block;
          }
          .tpall {
            line-height: 22px;
            margin-bottom: 8px;
          }
          .tpall .tpc {
            background: rgba(0, 0, 0, 0.7);
            margin-right: 16px;
            padding: 0px 16px;
            display: inline-block;
            font-size: 12px;
            color: #fff;
            height: 24px;
            line-height: 26px;
          }
          .tpall .tm {
            color: #fff;
            font-size: 12px;
            float: right;
            font-weight: normal;
            background: none !important;
          }
          .tpall .tshr {
            display: inline-block;
          }
          .tpall .tshr span {
            padding-right: 16px;
            font-size: 12px;
            color: #fff;
          }
          .tpall .tshr span em {
            margin-left: 4px;
            display: inline-block;
          }
          .pgblut {
            position: relative;
            margin-top: -16px;
            text-align: center;
            width: 100%;
          }
          .pgtbox.fordarkgreenbg .chmpntpnwshd span {
            background: #004d40;
          }
          .pgtbox.fordarkgreenbg .swiper-pagination-bullet-active {
            background: #004d40;
          }
          .rdmr {
            color: #ed1c24;
            border: 1px solid #ed1c24;
            border-radius: 20px;
            height: 26px;
            line-height: 26px;
            font-weight: 700;
            font-size: 14px;
            box-sizing: border-box;
            display: block;
            margin: 16px auto;
            width: 150px;
            overflow: hidden;
            text-align: center;
          }
          .mobileShosh {
            display: none;
          }
          .chmpntpnwshd h3 a {
            color: #fff;
            font-size: 18px;
            line-height: 26px;
            font-weight: 700;
          }
        `}
      </style>
    </>
  );
};

export default PhotogalleryTopPriority;
