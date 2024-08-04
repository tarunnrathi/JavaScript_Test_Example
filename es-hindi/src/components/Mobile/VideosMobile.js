import React, { useEffect,useState } from "react";
import Glide from "@glidejs/glide";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import TaboolaReels from "widgets/Common/Responsive/TaboolaReels";
import { getArticleList } from "api/global/Common";

const moment = require("moment-timezone");

import LazyLoadImage from "components/Common/CustomImage";
import { videos } from "includes/videos.helper";
import { getCompleteURL } from "util/global/Helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const VideosMobile = (props) => {
  useEffect(() => {
    const sliders = document.querySelectorAll(".ost_sldr");
    for (let i = 0; i < sliders.length; i++) {
      const glide = new Glide(sliders[i], {
        type: "carousel",
        autoplay: false,
        animationDuration: 1000,
        perView: 1.62,
        gap: 15,
      });
      glide.mount();
    }
  }, []);
  const { data } = props;
  const { pageAds, topStoryArray, video_categoryresults, video_category } =
    data;
  const topStoryArraydata = videos.topStoryArraydata(topStoryArray);
  const [topStoryArraylist,seTtopStoryArraylist]= useState(videos.topStoryArraylist(topStoryArray));
  const [toggle,setToggle]= useState(true);
  //const topStoryArraylist = videos.topStoryArraylist(topStoryArray);
  const latestlist = videos.latestlist(topStoryArray);
  const video_categoryresult = [...video_categoryresults, latestlist];
  const video_categories = [
    ...video_category,
    {
      slug: "latest/",
      key: "latest",
      title: "लेटेस्ट",
    },
  ];
  const featureTime = (fTime) => {
    return (
      moment(fTime).tz("Asia/Kolkata").format("MMMM Do YYYY, h:mm:ss a") +
      " IST"
    );
  };
  const loadMore = async() => {
    const data = await getArticleList({
      count: 9,
      offset: (topStoryArraylist||[])?.length+1,
      filter: { post_type: "videos" },
      fields: `story_id,display_headline,images,weburl_r,weburl,updated_at`,
      sortBy: "updated_at"
    },true);
    let result = [...topStoryArraylist,...data];
    seTtopStoryArraylist(result);
    setToggle(false);
  }
  return (
    <>
    <BreadcrumbCommon breadCrumbArray={[
      { value: "हिंदी समाचार", slug: "/"},
      { value: "Videos"},
    ]} />

      {/* <div dangerouslySetInnerHTML={{ __html: props.data.titleDiv }}></div> */}
      <div className="clearfix vsp10"></div>

      <h1 className="fe_mhedin">NEWS18 VIDEO </h1>
      <div className="fe_outer">
        <div className="fe_tag">टॉप वीडियोज</div>
        <a
          href={getCompleteURL(
            topStoryArraydata[0]["weburl_r"],
            topStoryArraydata[0]["weburl"],
          )}
          className="fe_wrp"
        >
          <div className="fe_img_wrp">
            <LazyLoadImage
              src={topStoryArraydata[0]?.images?.url}
              width={384}
              height={215}
              alt={
                topStoryArraydata[0]["display_headline"] ||
                topStoryArraydata[0]["headline"]
              }
              title={
                topStoryArraydata[0]["display_headline"] ||
                topStoryArraydata[0]["headline"]
              }
            />
            <div className="v_icon"></div>
          </div>
          <div className="fe_txt_wrp">
            <div className="fe_pdate">
              {featureTime(topStoryArraydata[0]["updated_at"])}
            </div>
            <div className="fe_ttl">
              {topStoryArraydata[0]["display_headline"]}
            </div>
            <div className="fe_copy">
              {topStoryArraydata[0]["display_headline"]}
            </div>
          </div>
        </a>

        <div className="pwa_top_add pwa_add">
          <div className="clearfix add">
            <div className="addinner-box">
              {/* <SiteAd
                slotId={`mobile_atf_320`}
                adUnit={pageAds.header_ATF_320}
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
                slotId={"mobile_atf_320"}
                adUnit={pageAds.header_ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                width={336}
                height={280}
                lazyLoad={true}
                style={{ padding: "16px" }}
              />
            </div>
          </div>
        </div>
        {typeof pageAds !== "undefined" &&
          typeof pageAds.PG_1x1 !== "undefined" &&
          pageAds.PG_1x1 !== "" && (
            <NewSiteAd
              slotId={"PG_1x1"}
              adUnit={pageAds.PG_1x1}
              sizes={[[1, 1]]}
              loadOnScroll={true}
              removeAdSpan={true}
            />
          )}
        {typeof pageAds !== "undefined" &&
          typeof pageAds.PG_Slider_1x1 !== "undefined" &&
          pageAds.PG_Slider_1x1 !== "" && (
            <NewSiteAd
              slotId={"PG_Slider_1x1"}
              adUnit={pageAds.PG_Slider_1x1}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={true}
            />
          )}
        <div className="fe_stories">
          <div>
            <ul className="slides">
              {topStoryArraylist.map((topNews) => (
                <li className="slide" key={topNews?.story_id}>
                  <a
                    href={getCompleteURL(
                      topNews["weburl_r"],
                      topNews["weburl"],
                    )}
                    className="fe_thumb"
                  >
                    <div className="fes_img">
                      <LazyLoadImage
                        src={topNews.images?.url}
                        width={212}
                        height={115}
                        alt={topNews["display_headline"] || topNews["headline"]}
                        title={
                          topNews["display_headline"] || topNews["headline"]
                        }
                      />
                      <div className="v_icon"></div>
                    </div>
                    <div>
                      <div className="fes_pdate">
                        {featureTime(topNews["updated_at"])}
                      </div>
                      <div className="fes_copy">
                        {topNews["display_headline"]}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            {toggle && <div className="fe_load" onClick={() => loadMore()}>LOAD MORE<span></span></div>}
            {/* <div className="fe_load">
              LOAD MORE <span></span>
            </div> */}
          </div>
        </div>
      </div>
      {pageAds.ATF_300 && (
        <div className="pwa_top_add pwa_add">
          <div className="clearfix add">
            <div className="addinner-box">
              <NewSiteAd
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds.ATF_300}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                width={336}
                height={280}
                lazyLoad={true}
                style={{ padding: "20px", textAlign: "center" }}
              />
            </div>
          </div>
        </div>
      )}

      {video_categoryresult.map((dataArraySecond, index) =>
        dataArraySecond.length < 1 ? (
          ""
        ) : (
          <>
            <div className="ost_outer" key={dataArraySecond[index]?.story_id}>
              <div className="ost_heading">
                <h2 className="ost_mttl">
                  <a href={"/videos/" + video_categories[index]["slug"]}>
                    {video_categories[index].title}
                  </a>
                </h2>
                <a
                  href={"/videos/" + video_categories[index]["slug"]}
                  target="_blank"
                  className="read_more_links"
                >
                  {" "}
                  और भी देखें<div className="arrows"></div>
                </a>
              </div>
              <a
                href={getCompleteURL(
                  dataArraySecond[0]["weburl_r"],
                  dataArraySecond[0]["weburl"],
                )}
                className="ost_wrp"
              >
                <div className="ost_img_wrp">
                  <LazyLoadImage
                    src={dataArraySecond[0]?.images?.url}
                    width={360}
                    height={216}
                    alt={
                      dataArraySecond[0]["display_headline"] ||
                      dataArraySecond[0]["headline"]
                    }
                    title={
                      dataArraySecond[0]["display_headline"] ||
                      dataArraySecond[0]["headline"]
                    }
                  />
                  <div className="v_icon"></div>
                </div>
                <div className="ost_txt_wrp">
                  <div className="ost_pdate">
                    {featureTime(dataArraySecond[0]["updated_at"])}
                  </div>
                  <div className="ost_ttl">
                    {dataArraySecond[0]["display_headline"]}
                  </div>
                </div>
              </a>
              <div className="ost_sldr">
                <div className="track" data-glide-el="track">
                  <ul className="slides">
                    {dataArraySecond?.slice(1, 7)?.map((storyArraySecond) => (
                      <li className="slide" key={storyArraySecond?.story_id}>
                        <a
                          href={getCompleteURL(
                            storyArraySecond["weburl_r"],
                            storyArraySecond["weburl"],
                          )}
                          className="ost_thumb"
                        >
                          <div className="osts_img">
                            <LazyLoadImage
                              src={storyArraySecond.images?.url}
                              width={223}
                              height={133}
                              alt={
                                storyArraySecond["display_headline"] ||
                                storyArraySecond["headline"]
                              }
                              title={
                                storyArraySecond["display_headline"] ||
                                storyArraySecond["headline"]
                              }
                            />
                            <div className="v_icon"></div>
                          </div>
                          <div className="osts_pdate">
                            {featureTime(storyArraySecond["updated_at"])}
                          </div>
                          <div className="osts_copy">
                            {storyArraySecond["display_headline"]}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {dataArraySecond.length > 1 && (
                  <div className="bullets" data-glide-el="controls[nav]">
                    <button
                      className="bullet"
                      data-glide-dir="=0"
                      type="button"
                    ></button>
                    <button
                      className="bullet"
                      data-glide-dir="=1"
                      type="button"
                    ></button>
                    <button
                      className="bullet"
                      data-glide-dir="=2"
                      type="button"
                    ></button>
                  </div>
                )}
              </div>
            </div>
            {index === 4 && <TaboolaReels />}
          </>
        ),
      )}
      {pageAds.BTF_300 && (
        <div className="pwa_top_add pwa_add">
          <div className="clearfix add">
            <div className="addinner-box">
              <NewSiteAd
                slotId={"mobileAdNew300x250_1"}
                adUnit={pageAds.BTF_300}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                width={336}
                height={280}
                lazyLoad={true}
                style={{ padding: "20px", textAlign: "center" }}
              />
            </div>
          </div>
        </div>
      )}

      <Taboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
      />

      <style jsx global>{`
        .fe_mhedin {
          font-size: 20px;
          line-height: 44px;
          font-weight: bold;
          color: #001d42;
          text-transform: uppercase;
          padding: 0 10px;
        }
        .fe_outer {
          background: #000000;
          padding: 16px;
          min-height: 1070px;
        }
        .fe_tag {
          width: 132px;
          height: 26px;
          background: #ed2129;
          border-radius: 4px;
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
          color: #ffffff;
          text-transform: uppercase;
          padding: 4px 10px;
          margin-bottom: 10px;
        }
        .fe_wrp {
          display: block;
          background: #1d1d1d;
          box-shadow: 0px 3px 8px #00000029;
          border: 1px solid #4a4a4a;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        .fe_img_wrp {
          position: relative;
          border: 1px solid #4a4a4a;
          display: inline-block;
          flex-shrink: 0;
        }
        .fe_img_wrp img {
          width: 100%;
        }
        .fe_img_wrp:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000000;
          opacity: 0.3;
        }
        .fe_img_wrp .v_icon,
        .fes_img .v_icon {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/images/v-icon.svg")
            no-repeat center center;
          z-index: 1;
        }
        .fe_txt_wrp {
          padding: 5px 11px 12px;
        }
        .fe_pdate {
          font-size: 12px;
          line-height: 22px;
          color: #bbbbbb;
          margin-bottom: 4px;
        }
        .fe_ttl {
          font-size: 18px;
          line-height: 28px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
        }
        .fe_copy {
          font-size: 12px;
          line-height: 22px;
          letter-spacing: -0.24px;
          color: #bbbbbb;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        // .fe_stories {
        //   margin-right: -15px;
        // }
        .fe_stories .track {
          overflow: hidden;
          padding: 0 0 0 1px;
        }
        .fe_stories .slides {
          margin: 0;
          padding: 0;
        }
        .fe_stories .slides li {          
          flex-shrink: 0;
        }
        .fe_thumb {
          display: flex;
          width: 100%;
          height: 100%;
          padding: 5px 0 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #70707080;
        }
        .fes_img {
          position: relative;
          margin-bottom: 5px;
          min-width: 130px;
          height: 68px;
          overflow: hidden;
        }
        .fes_img:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000000;
          opacity: 0.3;
        }
        .fes_img .v_icon {
          background-size: 42px;
        }
        .fes_pdate {
          font-size: 12px;
          line-height: 20px;
          color: #bbbbbb;
          padding: 0 10px;
          margin-top: -2px;
        }
        .fes_copy {
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
          color: #ffffff;
          padding: 0 10px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .fe_stories .bullets {
          display: flex;
          justify-content: center;
          margin-top: 15px;
        }
        .fe_stories .bullet {
          width: 5px;
          height: 5px;
          background: #bababa;
          border-radius: 5px;
          padding: 0;
          border: none;
          margin: 0 5px;
        }
        .fe_stories .bullet.glide__bullet--active {
          width: 20px;
          background: #e1261d;
        }

        .ost_outer {
          background: #f2f5f9;
          padding: 16px;
          margin-bottom: 5px;
          min-height: 110px;
        }
        .ost_wrp {
          background: #ffffff;
          box-shadow: 0px 3px 8px #90a4b73d;
          border: 1px solid white;
          border-radius: 4px;
          margin-bottom: 15px;
          overflow: hidden;
        }
        .ost_img_wrp {
          position: relative;
          flex-shrink: 0;
          width: 100%;
          height: 216px;
          overflow: hidden;
          justify-content: center;
          display: flex;
        }

        .ost_img_wrp:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000000;
          opacity: 0.3;
        }
        .ost_img_wrp .v_icon,
        .osts_img .v_icon {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/images/v-icon.svg")
            no-repeat center center;
          z-index: 1;
        }
        .ost_txt_wrp {
          padding: 5px 11px 0px;
        }
        .ost_pdate {
          font-size: 12px;
          line-height: 22px;
          color: #7b7b7b;
        }
        .ost_ttl {
          font-size: 18px;
          line-height: 28px;
          font-weight: 700;
          color: #0a2140;
          margin-bottom: 6px;
        }

        .ost_heading {
          display: flex;
          justify-content: space-between;
          height: 27px;
          border-bottom: #c3c3c3 solid 1px;
          position: relative;
          margin-bottom: 16px;
        }
        .ost_mttl {
          font-size: 18px;
          line-height: 27px;
          font-weight: bold;
          color: #e1261d;
          text-transform: uppercase;
          display: inline-block;
          margin: 0;
          position: relative;
        }
        .ost_mttl:before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          width: 30px;
          background: #e1261d;
        }
        .ost_sldr {
          margin: 0 -15px 15px 0;
        }
        .ost_sldr .track {
          overflow: hidden;
          padding: 0 0 15px 1px;
        }
        .ost_sldr .slides {
          display: flex;
          margin: 0;
          padding: 0;
        }
        .ost_sldr .slides li {
          width: 223px !important;
        }
        .ost_thumb {
          display: block;
          background: white;
          box-shadow: 0px 3px 8px #90a4b73d;
          border: 1px solid #d9e1e9;
          border-radius: 4px;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .osts_img {
          position: relative;
          margin-bottom: 5px;
          line-height: 0;
        }
        .osts_img:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000000;
          opacity: 0.3;
        }
        .osts_img .v_icon {
          background-size: 42px;
        }
        .osts_pdate {
          font-size: 12px;
          line-height: 22px;
          color: #7b7b7b;
          padding: 0 10px;
          margin-bottom: 3px;
        }
        .osts_copy {
          font-size: 14px;
          line-height: 22px;
          font-weight: bold;
          color: #0a2140;
          padding: 0 10px 10px;
        }
        .ost_sldr .bullets {
          display: flex;
          justify-content: center;
        }
        .ost_sldr .bullet {
          width: 5px;
          height: 5px;
          background: #bababa;
          border-radius: 5px;
          padding: 0;
          border: none;
          margin: 0 5px;
        }
        .ost_sldr .bullet.glide__bullet--active {
          width: 20px;
          background: #e1261d;
        }
        .wm_outer {
          text-align: center;
        }
        .wm_txt {
          width: 154px;
          height: 32px;
          background: #ffffff 0% 0% no-repeat padding-box;
          border: 2px solid #e1261d;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font: 700 13px/15px "Recursive";
          color: #e1261d;
          text-transform: uppercase;
        }
        .brdcrm {
          height: 46px;
          overflow: hidden;
        }
        .brdcrm {
          padding: 10px 16px;
          font-size: 15px;
        }
        .brdcrm a {
          padding: 0 5px;
        }
        .brdcrm a:first-child {
          padding: 0 5px 0 0;
        }
        .brdcrm {
          color: #000;
          font-size: 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          clear: both;
          padding: 10px 10px;
        }
        .brdcrm a {
          color: #757575;
          font-weight: 400;
          text-decoration: none;
          margin: 0px;
        }

        .brdcrm li {
          font-size: 12px;
          padding: 0 5px;
          color: #757575;
          list-style: none;
          display: inline;
          text-transform: capitalize;
        }

        .brdcrm li:first-child {
          padding-left: 0;
        }
        .brdcrm h1 {
          display: inline-block;
          font-size: 15px;
        }
        .read_more_links {
          display: block;
          font-size: 14px;
          line-height: 19px;
          font-weight: 500;
          color: #eb3d3c;
          position: relative;
          letter-spacing: -0.28px;
          text-align: center;
          cursor: pointer;
          width: 130px;
        }
        .read_more_links .arrows {
          position: absolute;
          top: 10px;
          right: 15px;
          width: 12px;
          height: 1px;
          background-color: #eb3d3c;
        }
        .read_more_links .arrows:before,
        .read_more_links .arrows:after {
          content: "";
          position: absolute;
          width: 7px;
          height: 1px;
          top: -2px;
          right: -1px;
          background-color: #eb3d3c;
          transform: rotate(45deg);
        }
        .read_more_links .arrows:after {
          top: 2px;
          transform: rotate(-45deg);
        }
        .pwa_top_add {
          width: 100%;
          text-align: center;
          margin-bottom: 20px;
          height: 280px;
        }
        .fe_img_wrp.fe_img_wrp {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 215px;
          width: 100%;
          overflow: hidden;
        }
        .fe_img_wrp figure {
          width: 100%;
        }
        
        .fes_img figure,
        .fes_img figure img {
          width: 100%;
        }
        .fe_load {
          background: #ED1C25 0% 0% no-repeat padding-box;
          border-radius: 22px;
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
        }
        .fe_load span {
          box-sizing: border-box;
          position: relative;
          display: block;
          transform: scale(var(--ggs,1));
          width: 22px;
          height: 22px;
          border: 2px solid transparent;
          border-radius: 100px
        }
        .fe_load span::after {
            content: "";
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 10px;
            height: 10px;
            border-bottom: 2px solid;
            border-right: 2px solid;
            transform: rotate(45deg);
            left: 7px;
            top: 0px
        }
        .slide:last-child .fe_thumb {
          border-bottom: 0;
        }
      `}</style>
    </>
  );
};
export default React.memo(VideosMobile);
