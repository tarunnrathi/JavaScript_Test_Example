import React, { useEffect, useState } from 'react';
import getConfig from "next/config";
import SiteAd from "widgets/Common/Responsive/SiteAd";
// import Outbrain from "widgets/Common/Responsive/Outbrain";
// import categoryHelper from "includes/category.helper";
import { imageLoader } from 'includes/article.util';
import Head from "next/head";
import { getCompleteURL } from 'util/global/Helper';
import { getArticleList } from 'api/global/Common';
import BreadcrumbCommon from 'widgets/Common/Responsive/BreadcrumbCommon';
import Taboola from 'widgets/Common/Responsive/Taboola';
import { TaboolaList } from 'includes/Tabola.helper';
import TaboolaReels from 'widgets/Common/Responsive/TaboolaReels';
import { logEvent } from 'includes/googleAnalytic';

const SvCategoryMobile = (props) => {
  const { publicRuntimeConfig } = getConfig();
  useEffect(() => { }, []);

  // const outBrainUrl = publicRuntimeConfig.siteUrl + "videos/";
  // const shortVideoCategoryArray = categoryHelper.shortVideoCategory();
  const { shortsData, pageAds, section, categoryShortsData = [] } = props.data;
  const [catData, setCatData] = useState(shortsData);
  const [cur_page, setcurPage] = useState(3);
  const [startCount, setStartCount] = useState(catData?.length);

  const loadMore = async () => {
    let short_videos = (section) ? { "categories.slug": `${section}`, "nw_auto_yt_video_type": "shorts" } : { "nw_auto_yt_video_type": "shorts" };
    let data = await getArticleList({ count: 10, offset: startCount + 1, filter: short_videos, fields: `story_id,display_headline,images,weburl_r,weburl,created_at` }, true);
    if (!data?.length) {
      setStartCount(0);
    } else {
      const result = [...catData, ...data]
      setCatData(result);
      setStartCount((cur_page - 1) * 10);
      setStartCount(result?.length)
      setcurPage(cur_page + 1);
    }
    // }
  };
 
  return (
    <>
      <Head>
        <link
          href="https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/video_pwa_css_1593578970.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="clearfix vsp10"></div>

      <div className="vdcnsmpnwrap">
        <div className="vdcnsmpn-container">
          <BreadcrumbCommon breadCrumbArray={props.data?.breadCrumbArray} />

          <div className="vdcnsmpn-middle">
            <div className="vdcnsmpn-left">
              <div className="top-news-title">
                <h1>शॉर्ट वीडियो <span>{section}</span></h1>
                <div className="social-icons">
                  <a
                    className="arr_redirect"
                    href="javascript:void(0)"
                    onClick={async () => {
                      const shareData = {
                        title: "",
                        text: "",
                        url: " https://hindi.news18.com/short-videos/",
                      };
                      try {
                        await navigator.share(shareData);
                      } catch (err) {
                        //resultPara.textContent = `Error: ${err}`;
                      }
                      logEvent("ss_wapi", "tap", "short-videos_page");
                    }}
                  >
                    <svg
                      id=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="25"
                      viewBox="0 0 32 32"
                    >
                      <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="pwa_top_add pwa_add vdcnsmpnad ">
                <div className="clearfix add">
                  <div className="addinner-box">
                    <SiteAd
                      slotId={`mobile_atf_320`}
                      adUnit={pageAds.ATF_320}
                      sizes={[
                        [300, 250],
                        [336, 280],
                      ]}
                      width={336}
                      height={280}
                    />
                  </div>
                </div>
              </div>

              {(typeof pageAds !== "undefined" &&
                typeof pageAds.PG_1x1 !== "undefined" &&
                pageAds.PG_1x1 !== "") && (
                  <SiteAd
                    slotId="PG_1x1"
                    adUnit={pageAds.PG_1x1}
                    sizes={[[1, 1]]}
                    removeAdSpan={true}
                    style={{ height: 0 }}
                    loadonScroll={true}
                  />
                )}

              {(typeof pageAds !== "undefined" &&
                typeof pageAds.PG_Slider_1x1 !== "undefined" &&
                pageAds.PG_Slider_1x1 !== "") && (
                  <SiteAd
                    slotId="PG_Slider_1x1"
                    adUnit={pageAds.PG_Slider_1x1}
                    sizes={[[1, 1]]}
                    removeAdSpan={true}
                    style={{ height: 0 }}
                    loadonScroll={true}
                  />
                )}
              {(typeof pageAds !== "undefined" &&
                typeof pageAds.SHOSH_OOP !== "undefined" &&
                pageAds.SHOSH_OOP !== "") && (
                  <SiteAd
                    slotId="SHOSH_OOP"
                    adUnit={pageAds.SHOSH_OOP}
                    sizes={[[1, 1]]}
                    removeAdSpan={true}
                    loadonScroll={true}
                  />
                )}
              <div className="videobox">
                {/* <ul className="cat-tab">
                  {shortVideoCategoryArray.map((cat, key) => {
                    return(
                    <li className={cat.section == section?"active":''}>
                      <a href={`/short-videos${cat.slug}`}><span>{cat.name}</span></a></li>
                    )
                    })}
                </ul> */}

                <ul className="tag-listing-new" >
                  {
                    catData?.map((sv, i) => {
                      return (
                        <React.Fragment key={"list" + i}>
                          {i != 0 && i % 4 == 0 && i % 8 !== 0 ? (
                            <>
                              <div
                                className="pwa_top_add pwa_add vdcnsmpnad"
                                key={i}
                              >
                                <div className="clearfix add">
                                  <div className="addinner-box">
                                    <SiteAd
                                      slotId={`mobile_atf_300_${i}`}
                                      adUnit={pageAds.ATF_300_id}
                                      lazyload={true}
                                      sizes={[
                                        [300, 250],
                                        [336, 280],
                                      ]}
                                      width={300}
                                      height={280}
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null}
                          {i === 8 && (
                            <div style={{ minHeight: "250px" }}>
                              <TaboolaReels />
                            </div>
                          )}

                          {i % 8 == 0 && i != 0 ? (
                            <div className="pwa_top_add pwa_add vdcnsmpnad">
                              <div className="clearfix add">
                                <div className="addinner-box">
                                  <SiteAd
                                    slotId={`mobile_btf_300_${i}`}
                                    adUnit={pageAds.BTF_300_id}
                                    sizes={[
                                      [300, 250],
                                      [336, 280],
                                    ]}
                                    width={300}
                                    height={250}
                                    lazyload={true}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : null}

                          <li key={i}>
                            <a href={getCompleteURL(sv?.weburl_r, sv?.weburl)}>
                              <figure>
                                <img
                                  src={imageLoader(
                                    sv?.images?.url,
                                    220,
                                    300,
                                    true
                                  )}
                                  title={sv.display_headline || ""}
                                ></img>
                              </figure>
                              <figurecaption>
                                <h2 className="story-title">
                                  <span className="">
                                    NEWS18 HINDI
                                    {section && (
                                      <>
                                        <span className="sit_cat"></span>
                                        {section}
                                      </>
                                    )}
                                  </span>

                                  {sv.display_headline || ""}
                                </h2>
                              </figurecaption>
                              <a
                                className="video-play-button"
                                href={getCompleteURL(sv?.weburl_r, sv?.weburl)}
                              >
                                {" "}
                                <span></span>
                              </a>
                            </a>
                          </li>
                        </React.Fragment>
                      );
                    })
                  }
                </ul>
                {startCount ? (
                  <div className="next_arrow_p">
                    <button onClick={loadMore} className="loadmore">
                      और लोड करें
                    </button>
                  </div>) : null
                }
              </div>
            </div>
          </div>
        </div>
        <Taboola
          mode={TaboolaList.category.bottom.mode}
          id={TaboolaList.category.bottom.id}
          container={TaboolaList.category.bottom.container}
          placement={TaboolaList.category.bottom.placement}
        />
      </div>

      {/* <div className="pwa_top_add clearfix">
        <Outbrain widgetSrc={outBrainUrl} widgetId="MB_9" />
      </div> */}
      <style jsx global>{`
        body {
          margin: auto;
          font-family: "Mukta", sans-serif;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        ul,
        table,
        figure {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        a {
          text-decoration: none;
        }
        a img {
          border: none;
        }
        * {
          box-sizing: border-box;
        }
        .mblhdr {
          line-height: 0;
        }
        span#vigyapan {
          color: #f5f5f5;
        }
        .vdcnsmpnwrap {
          background: #212121;
          position:relative;
          z-index:1;
        }
        .vdcnsmpn-container {
          background: #212121;
        }
        .vdcnsmpn-container * {
          box-sizing: border-box;
        }
        .vdcnsmpn-left {
          width: 100%;
          font-family: "Mukta";
        }
        .vdcnsmpnad {
          background: #2e2e2e;
          text-align: center;
          padding: 10px 0;
          margin:0 auto;
        }
        .vdcnsmpnad span {
          height: 20px;
          line-height: 20px;
          color: #dcdcdc;
          font-size: 12px;
          display: block;
          text-align: center;
        }
        .videobox {
          border-bottom: 1px solid #3e3e3e;
          position: relative;
        }
        .g__arrows,
        ul.tag-listing-new,
        ul.tag-listing-new li a figurecaption {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
        }
        .V-heading,
        .top-news-title {
          border-bottom: 1px dotted #939393;
        }
        ul.tag-listing-new {
          display: flex;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-flex-wrap: wrap;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          padding: 0px 10px 0;
          gap: 15px;
        }
        ul.tag-listing-new li {
          font-size: 16px;
          width: 47.5%;
          line-height: 24px;
          font-weight: 700;
          position: relative;
          border: 2px solid #5f5f5f;
        }
        ul.tag-listing-new li a figure img {
          width: 100%;
          display: block;
          height: 299px;
          object-fit: cover;
        }
        ul.tag-listing-new li a figurecaption {
          position: absolute;
          bottom: 0;
          height: 100%;
          display: flex;
          -webkit-align-items: flex-end;
          -webkit-box-align: flex-end;
          -ms-flex-align: flex-end;
          align-items: flex-end;
          padding: 10px;
          width: 100%;
          background: transparent
            linear-gradient(180deg, #2e2e2e00 0%, #000000 100%) 0% 0% no-repeat
            padding-box;
        }
        ul.tag-listing-new li a figurecaption h2.story-title {
          color: #fff;
          font-size: 14px;
          line-height: 22px;
          font-weight: bold;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tag-listing-new li a figurecaption .story-title span {
          display: inline-block;
          letter-spacing: 0;
          color: #c4c4c4;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 28px;
          width: 100%;
          font-weight: normal;
        }
        ul.tag-listing-new li a figurecaption h2.story-title .sit_cat {
          width: 4px;
          height: 4px;
          background: no-repeat padding-box #c4c4c4;
          vertical-align: middle;
          margin: 0 7px;
          border-radius: 50%;
        }
        .next_arrow_g {
          height: 15px;
          margin: 10px 0;
        }
        .next_arrow_p {
          height: 15px;
          margin: 20px 0 30px 0;
          text-align: center;
          padding-bottom: 35px;
        }

        img.video-ic {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          margin: auto;
        }
        .V-heading {
          font: bold 20px/25px Mukta;
          padding: 0 20px 5px;
          color: #f8be01;
        }
        .arrow-v {
          position: absolute;
          right: 20px;
          top: 16px;
        }
        .arrow-v a {
          vertical-align: middle;
          display: inline-block;
          max-height: 31px;
          max-width: 31px;
          cursor: pointer;
        }

        .top-news-title {
          width: 100%;
          margin: 10px 0 20px;
          position: relative;
          padding: 0 0 9px 14px;
        }
        .social-icons {
          position: absolute;
          top: 0;
          right: 3%;
        }
        .social-icons a {
          margin-right: 8px;
        }
        .social-icons a:last-child {
          margin-right: 0;
        }
        .top-news-title h1 {
          color: #fff;
          font-weight: bold;
          font-size: 22px;
          line-height: 32px;
          max-width: 340px;
          text-align: left;
          clear: both;
        }
        .top-news-title h1 span{
          display: block;
          font-size: 18px;
         line-height: 17px;
        }
        .social-icons a span {
          position: relative;
          height: 30px;
          width: 30px;
          background: url(/images/siteimages/sprite_img_1.svg)
            0 0 no-repeat;
          margin: auto;
          cursor: pointer;
          border: 1px solid #fff;
          display: inline-block;
        }
        .social-icons a .facebk {
          border-radius: 2px;
          background-position: -7px -7px !important;
        }
        .social-icons a .twit {
          border-radius: 2px;
          background-position: -5px -56px;
        }
        .social-icons a .whatsp {
          border-radius: 2px;
          background-position: -6px -157px;
        }
        .social-icons a span img {
          text-align: center;
          margin: auto;
          left: 0;
          bottom: 0;
        }
        .arrow,
        ul.cat-tab li {
          display: inline-block;
        }
        .arrow {
          position: absolute;
          width: 9px;
          height: 9px;
          background: 0 0;
          border-top: 1.5px solid #000;
          border-left: 1.5px solid #000;
          transition: 250ms ease-in-out;
          text-decoration: none;
          color: transparent;
          top: 0;
          bottom: 0;
          margin: auto;
          left: 0;
        }
        a.arrow.next {
          transform: rotate(135deg);
          right: 3px;
        }
        a.arrow.prev {
          transform: rotate(-45deg);
          left: 13px;
        }
        .arrow:before {
          display: block;
          height: 200%;
          width: 200%;
          margin-left: -50%;
          margin-top: -50%;
          content: "";
          transform: rotate(45deg);
        }
        // ul.tag-listing-new li:last-child {
        //   margin-bottom: 10px;
        // }
        ul.cat-tab {
          padding: 0 20px 20px;
          overflow: auto;
          white-space: nowrap;
        }
        ul.cat-tab li {
          margin-right: 5px;
          box-shadow: 0 3px 6px #00000029;
          border-radius: 14px;
          padding: 0 14px;
          background: no-repeat padding-box #505050;
        }
        ul.cat-tab li.active {
          background: no-repeat padding-box #e0261d;
          border: 1px solid #9d9d9d;
          color: #fff;
        }
        ul.cat-tab li span {
          text-align: center;
          font-size: 15px;
          line-height: 25px;
          color: #c6c6c6;
        }
        ul.cat-tab li.active > span {
          font-weight: bold;
          color: #fff;
        }
        .video-play-button {
          position: absolute;
          z-index: 10;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          box-sizing: content-box;
          display: block;
          width: 21px;
          height: auto;
          border-radius: 50%;
          padding: 18px 12px 18px 28px;
        }
        .video-play-button:before {
          content: "";
          position: absolute;
          z-index: 0;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          display: block;
          width: 36px;
          height: 36px;
          background: #e1261d;
          border-radius: 50%;
          animation: pulse-border 1500ms ease-out infinite;
          border: 2px solid #fff;
          -webkit-box-shadow: -2px 0px 9px 1px rgb(54 54 54 / 47%);
          -moz-box-shadow: -2px 0px 9px 1px rgb(54 54 54 / 47%);
          box-shadow: -2px 0px 9px 1px rgb(54 54 54 / 47%);
        }
        .video-play-button span {
          display: block;
          position: relative;
          z-index: 3;
          width: 0;
          height: 0;
          border-left: 11px solid#fff;
          border-top: 8px solid transparent;
          border-bottom: 7px solid transparent;
        }
        .video-play-button:after {
          content: "";
          position: absolute;
          z-index: 1;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          display: block;
          width: 36px;
          height: 36px;
          background: #e1261d;
          border-radius: 50%;
          transition: all 200ms;
        }
        .loadmore {
          width: 130px;
          height: 38px;
          background: #ed1c24;
          border-radius: 19px;
          font-size: 17px;
          color: #ffffff;
          line-height: 38px;
          border: none;
          display: table;
          margin: auto;
          cursor: pointer;
        }
        .arr_redirect {
          background: #ffffff;
          border: 1px solid #c7c7c7;
          border-radius: 24px;
          color: #343a40;
          display: flex;
          float: left;
          line-height: 16px;
          margin: 0;
          position: relative;
          padding: 0;
          text-transform: capitalize;
          text-align: center;
          align-items: center;
          height: 35px;
          min-width: 35px;
          justify-content: center;
          flex-direction: row;
        }
      `}</style>
    </>
  );
};

export default SvCategoryMobile;
