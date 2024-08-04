import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import Loader from "react-loader-spinner";
import { imageLoader } from "includes/article.util";
import Data from "./HomeNewsData";
import { getArticlesByPriorityData } from "api/individual/Home";
import { TEXT } from "constant/global/Constant";
import LazyLoadImage from "components/Common/CustomImage";

const { publicRuntimeConfig } = getConfig();

const HomeNews = ({ newsType = 'pradesh-news', isAmp = false, News = [] }) => {
  const dataObj = { ...Data[newsType] };
  const [NewsData, setNewsData] = useState(News);
  const [activeState, setActiveState] = useState(isAmp ? dataObj['more-url'] : "");
  const [isLoading, setLoading] = useState(false);

  const changeState = (moreUrl, state) => {
    if (moreUrl !== activeState) {
      getData(state);
      setActiveState(moreUrl);
    }
  };

  const getData = async (cat) => {
    setLoading(true);
    const NewsData = await getArticlesByPriorityData({ count: 3, subSection: 'photogallery', filter: { 'post_type': 'photogallery' } }, true);

    if (NewsData && NewsData.length) {
      setNewsData([...NewsData.splice(0, 5)]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!News.length) {
      getData(dataObj['key']);
    }
    setActiveState(dataObj['more-url']);
  }, []);
  return (
    <>
      <div className="superhitgallerywrap clearfix">
        <div className={`globalhd fordarkbackground ${!isAmp ? 'clearfix' : ''}`}>
          <h2>
            <a href={publicRuntimeConfig.siteUrl + dataObj["more-url"].replace("/", "")}>{dataObj["value"]}</a>
          </h2>
        </div>
        {
          dataObj &&
            Object.keys(dataObj).length &&
            dataObj['sub-list'] &&
            dataObj['sub-list'].length &&
            !isAmp && (
            <ul className="globaltab dflx fordark jstcntspcbtwn">
              {
                dataObj['sub-list'].map((eachData) => {
                  return (
                    <li className={`clkSub clkSubphotogallery ${activeState == eachData['more-url'] ? 'act' : ''}`}>
                      <a onClick={() => changeState(eachData['more-url'], eachData['key'])}>{eachData['value']}</a>
                    </li>
                  );
                })
              }
            </ul>
          )}
        {!isLoading && (NewsData.length || News.length) ? (
          <>
            <div id="clkbuttonpradesh">
              <ul className="photogallery dflx flxwrp jstcntspcbtwn">
                {
                  (NewsData || News).map((eachData, index) => {
                    const Width = index == 0 ? 360 : 187;
                    const Height = index == 0 ? 240 : 125;
                    const Src = imageLoader(eachData?.images?.url, Width, Height);
                    const title = eachData?.display_headline || eachData?.headline;
                    return (
                      <li key={`mobilehomepageGallery-`+index}>
                        <a href={eachData['weburl'] ? eachData['weburl'].replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl + `${isAmp ? "amp/" : ''}`) : ''}>
                          {!isAmp ? <span className="photoicon"></span> : ''}
                          {
                            isAmp ?
                              <figure>
                                <span className={newsType === "video-news" ? "videoicon" : "photoicon"}></span>
                                <LazyLoadImage
                                    src={eachData?.images?.url}
                                    width={Width}
                                    height={Height}
                                    alt={title}
                                    title={title}
                                    //data-hero=""
                                    isAMP={true}
                                />
                                {/* <amp-img
                                  width={Width}
                                  height={Height}
                                  src={Src}
                                  alt={title}
                                  title={title}
                                  layout="responsive"
                                ></amp-img> */}
                              </figure>
                              :                              
                              <img
                                width={Width}
                                height={Height}
                                src={imageLoader(Src, Width, Height, false, true)}
                                alt={title}
                                title={title}
                                className={"globalmgbox"}
                                loading="lazy"
                              />
                          }
                          <h3>{title}</h3>
                        </a>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
            <a href={publicRuntimeConfig.siteUrl + activeState.replace("/", "")} className="aurparhenbtn fordarkk">{TEXT.READ_MORE}</a>
          </>
        ) : (
          <>
            {
              !isAmp ?
                <Loader
                  type="Oval"
                  color="#ed1c24"
                  height={60}
                  width={60}
                  className="news-loader"
                /> : ''
            }
          </>
        )}
        <style jsx global>{`
          .news-loader {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 481px;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            margin-bottom: 25px;
          }
          .globalhd {
            border-bottom: 1px solid #001536;
            position: relative;
            display: flex;
            width: 100%;
            padding-bottom: 5px;
            margin-bottom: 10px;
          }
          .clearfix {
            clear: both;
          }
          .globalhd:before {
            content: "";
            width: 15px;
            height: 3px;
            background: #ed1c24;
            position: absolute;
            left: 0;
            bottom: -2px;
          }
          .clearfix::after, .clearfix::before {
            content: "";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            height: 0;
          }
          .superhitgallerywrap {
            background: #151515;
            padding: 10px 0 1px 0;
            margin: 0 ${isAmp ? '-15px 30px -15px' : '-10px'};
          }
          .globalhd.fordarkbackground {
            border: none;
            width: auto;
            margin: 0 10px ${isAmp ? '' : '10px 10px'};
          }
          .globalhd.fordarkbackground:before{display:none}
          .globalhd.fordarkbackground h2 {
            line-height: 30px;
          }
          .globalhd.fordarkbackground a {
            color: ${isAmp ? '#ffcc00' : '#fff'};
          }
          .superhitgallerywrap .globaltab {
            margin: 0 10px 10px 10px;
          }
          .globaltab {
            overflow: scroll;
            margin-bottom: 10px;
          }
          .jstcntspcbtwn {
            justify-content: space-between;
          }
          .dflx {
            display: flex;
          }
          .globaltab li.act {
            font-weight: 700;
          }
          .globaltab.fordark li.act a {
            border: 1px solid #fff;
            color: #fff;
          }
          .globaltab.fordark li a {
            color: #fff;
            display: block;
            border: 1px solid transparent;
          }
          .photogallery {
            padding: 0 10px;
          }
          .flxwrp {
            flex-wrap: wrap;
          }
          .jstcntspcbtwn {
            justify-content: space-between;
          }
          .dflx {
            display: flex;
          }
          .photogallery li:first-child {
            width: 100%;
            margin-bottom: 10px;
          }
          .photogallery li {
            width: 48%;
            position: relative;
          }
          ${isAmp ? `
            .photogallery li figure .photoicon, .photogallery li figure .videoicon{ width: 62px; height: 62px; position: absolute; top: 50%; left: 50%; z-index: 1;margin: -31px 0 0 -31px;}
  
            .photogallery li figure .photoicon{ background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/photo_icon_1633005962.svg) 0 0 no-repeat;}
  
            .photogallery li figure .videoicon{ background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/video_icon_1633005906.svg) 0 0 no-repeat;}
            .photogallery li figure {
              border: 1px solid #707070;
              position: relative;
            }
            .photogallery li:first-child figure .photoicon, .photogallery li:first-child figure .videoicon {transform: scale(1.5);}` : ''
          }
          .photogallery li a {
            color: #fff;
          }
          .photogallery li:first-child figure {
            min-height: 228px;
            background: #000;
          }
          .globalmgbox {
            position: relative;
            overflow: hidden;
            line-height: 0;
          }

          ${!isAmp ? `
          .photogallery li:first-child h2, .photogallery li:first-child h3 {
            font-size: 18px;
            line-height: 28px;
          }` : ''}
          
          .photogallery li h2, .photogallery li h3 {
            ${isAmp ? `
            font-size: 16px;
            font-weight: bold;
            padding: 10px 0;
            bottom: 0;
            left: 0;
            right: 0;
            ` : ``}
            line-height: ${isAmp ? `21px` : `20px`};
            overflow: hidden;
          }
          .photogallery li:first-child h2, .photogallery li:first-child h3 {
            background: -webkit-linear-gradient(transparent,#000);
            padding: 45px 15px 10px;
            font-size: 18px;
            line-height: 24px;
            font-weight: bold;
            position: absolute;
            height: auto;
          }
          ${isAmp ? `
          .photogallery li:first-child h2, .photogallery li:first-child h3 {
            background: -webkit-linear-gradient(transparent,#000);
            padding: 45px 15px 10px;
            font-size: 18px;
            line-height: 24px;
            font-weight: bold;
            position: absolute;
            height: auto;
          }` : ``}
          .photogallery li:first-child h2, .photogallery li:first-child h3 {
            background: -webkit-linear-gradient(transparent,#000);
            padding: 45px 15px 10px;
            font-size: 18px;
            line-height: 24px;
            font-weight: bold;
            position: absolute;
            height: auto;
          }
          .aurparhenbtn.fordarkk {
            ${isAmp ? `
            background: #000;
            color: #ffcc00;
            border: 1px solid #ffcc00;
            margin-bottom: 10px;` : `
            background: #444;
            color: #fff;
            border: 1px solid #eee;
            `}
          }
          @media (max-width: 767px) {
            body .photogallery li h2, body .photogallery li h3 {
                height: 72px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default HomeNews;
