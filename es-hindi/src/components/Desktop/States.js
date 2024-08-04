import React from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import getConfig from "next/config";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { useInView } from "react-intersection-observer";
// import Head from "next/head";

import TopPrioritys from "widgets/Desktop/category/TopPrioritys";
import StateNewsListing from "widgets/Desktop/category/StateNewsListing";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
// import Pagination from "widgets/Common/Desktop/Pagination";

const States = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const pageNameSlug = props?.data?._pageParam?.page==='lifestyle'?'lifestyle/':props?.data?._pageParam?.page==='world'?'world/':'';

  // current url
  const outBrainUrl = publicRuntimeConfig.siteUrl;

  const selectState = () => {
    const selectStateBtn = document.querySelector(".chsstctbtn");
    if (selectStateBtn) {
      selectStateBtn.click();
    }
  };

  const { ref, inView, entry } = useInView({
    threshold: 0
  });

  return (
    <>
      <div className="container clearfix">
        <div className="news_page_left leftwrap">
          <BreadcrumbCommon breadCrumbArray={props.data.breadCrumbArray} /> 
          <a
            href="javascript:void(0)"
            onClick={selectState}
            className="chsstctbtn-forstatepage chsstctbtn"
          >
            राज्य/शहर चुनें
          </a>
          {/* Top story section start here */}

          <div dangerouslySetInnerHTML={{ __html: props.data.titleDiv }}></div>
          <ul className="insdnav">
              {props.data.categoryStoriesList.map((topNews, key) =>
                topNews !== null && (
                  <li key={key}>
                    <a href={(topNews?.slug==='photogallery')?"/"+topNews?.slug+"/"+pageNameSlug:(topNews?.slug==='videos')?'/videos/':"/news/"+pageNameSlug+topNews?.slug+"/"}>{topNews?.label}</a>
                  </li>
                )
              )}
            </ul>
          <div className="clearfix vsp10"></div>

          {props.data?.topPriorityData ? (
            <div className="section-hotTopic clearfix">
              <TopPrioritys
                initialData={props.data?.topPriorityData}
                sliderFlag={props.data?.sliderFlag}
              />
            </div>
          ) : (
            ""
          )}

          {/* Top story section end here */}

          <div className="clearfix"></div>

          <div className="middlead">
            <SiteAd
              width={728}
              height={90}
              slotId={"Desktop_Static_Ad_2"}
              adUnit={props.pageAds.BTF_728}
              sizes={[[728, 90], [1, 1]]}
              loadonScroll={true}
            ></SiteAd>
          </div>

          <div className="clearfix"></div>

          {/* Blog list section start here */}
          <div className="blog_list">
            {
              <StateNewsListing
                initialData={props.data?.categoryStoriesList}
                pageParam={props.data?._pageParam}
                outBrainUrl={outBrainUrl}
              />
            }
          </div>
          {/* Blog list section end here */}

          <div className="clearfix"></div>

          {/* {props.data._pageParam.page != "states" && props.data._pageParam.page != "world"  ? (
            <Pagination
              curpage={1}
              TotalRecord={24 * 24}
              limit={24}
              pageurl={"/news/" + props.data._pageParam.page + "/"}
              pageflag={false}
            />
          ) : null} */}

          <div className="vsp10"></div>
        </div>
        <div className="rightwrap">
          {/* Side bar start here */}
          <RhsCommon
            pageAds={props.data.pageAds}
            currentURL={outBrainUrl}
            photoStories={props.data.photoStories}
            topStories={props.data.topStories}
            astroStories={props.data.astroStories}
            isRss={true}
          />
          {/* Side bar end here */}
        </div>
      </div>
      <style jsx global>{`
        * {
          box-sizing: unset;
        }

        .container {
          max-width: 1244px;
          margin: auto;
          padding: 0 10px;
          font-family: 'Mukta',sans-serif;
        }

        .container .chsstctbtn-forstatepage {
          top: -2px;
        }

        .top-news-title h1 {
          font-size: 28px;
          line-height: 32px;
          color: #001d42;
          font-family: "Mukta",sans-serif !important;
          font-weight: bold;
          margin-bottom: 2px;
        }

        .section-blog-left-img-list.forstates ul li {
          padding: 6px 30px 6px 0;
        }

        .section-blog-left-img-list ul li span {
          line-height: 20px;
        }

        .news_page_left {
          width: 925px;
          float: left;
        }
        .news_page_right {
          width: 300px;
          float: right;
          position: relative;
        }

        .clearfix {
          clear: both;
        }
        .vsp10 {
          padding-top: 10px;
        }
        .vsp10 {
          display: block;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }

        .brade_crum ul {
          display: flex;
          padding-bottom: 10px;
          align-items: center;
        }
        .brade_crum li {
          font-size: 16px;
          padding: 0 4px;
          color: #282828;
        }
        .brade_crum li a {
          color: #282828;
          text-decoration: none;
        }
        .brade_crum li:first-child {
          padding-left: 0;
        }

        .brdacrum {
          font-size: 14px;
          color: #404040;
          text-transform: uppercase;
          line-height: 18px;
          font-weight: 400;
          margin: 5px 0 15px 0;
        }
        .brdacrum a {
          color: #404040;
          font-weight: 400;
          margin-right: 2px;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .chsstctbtn-forstatepage {
          color: #000000;
          font-weight: bold;
          font-size: 15px;
          height: 32px;
          line-height: 34px;
          padding: 0 32px 0 10px;
          box-sizing: border-box;
          box-shadow: 0px 3px 0px #ee1c25;
          position: absolute;
          top: -3px;
          right: 0px;
        }
        .chsstctbtn-forstatepage:after {
          position: absolute;
          content: "";
          width: 7px;
          height: 7px;
          border-top: 2px solid #ee1c25;
          border-left: 2px solid #ee1c25;
          transform: rotate(-136deg);
          top: 10px;
          right: 10px;
        }
        .leftwrap {
          width: calc(100% - 325px);
          float: left;
          position: relative;
        }
        .section-hotTopic {
          margin-bottom: 10px;
        }
        .clearfix {
          clear: both;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }

        .middlead {
          display: flex;
          justify-content: center;
          margin: 15px;
        }
        .brdacrum {
          font-size: 16px;
          color: #404040;
          text-transform: uppercase;
          line-height: 18px;
          font-weight: 400;
          margin: 5px 0 15px 0;
        }
        .brdacrum a {
          color: #404040;
          font-weight: 400;
          margin-right: 2px;
        }

        .brdacrum h1 {
          display: inline-block;
          font-size: 16px;
          font-weight: 400;
        }
        .rightwrap {
          position: sticky;
          top: 55px;
        }
        .rightwrap {
          width: 300px;
          float: right;
        }

        .top-news-title h1 {
          font-size: 28px;
          line-height: 32px;
          color: #001d42;
          font-family: "Mukta", sans-serif !important;
          font-weight: bold;
          margin-bottom: 2px;
        }
        .insdnav{display:flex;justify-content:flex-start}
        .insdnav li{flex-shrink:0}
        .insdnav li a{height:36px;line-height:35px;display:block;padding:0 4px;margin:0 4px;font-size:16px;color:#757575}
        .insdnav li:first-child a {padding-left:0;}
      `}</style>
    </>
  );
};
export default React.memo(States);
