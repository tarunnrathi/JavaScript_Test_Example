import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import LazyImage from "components/Common/LazyImage";
import Skeleton from "react-loading-skeleton";
import { imageLoader } from "includes/article.util";
import Data from "./HomeNewsData";
import { getArticles } from "api/individual/Home";
import { TEXT } from "constant/global/Constant";
import LazyLoadImage from "components/Common/CustomImage";

const { publicRuntimeConfig } = getConfig();

const HomeNews = ({ newsType = 'knowledge-news', isAmp = false, News = [] }) => {
  const dataObj = { ...Data[newsType] };
  const [NewsData, setNewsData] = useState(isAmp ? News : null);
  const [activeState, setActiveState] = useState("");
  const [isLoading, setLoading] = useState(isAmp ? false : true);

  const getData = async (cat) => {
    setLoading(true);
    const NewsData = await getArticles({ count: 4, category: cat ? cat : 'statehome' }, true);

    if (NewsData && NewsData.length) {
      setNewsData(NewsData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(dataObj['key']);
    setActiveState(dataObj['more-url']);
  }, []);

  return (
    <>
      <div className={`globalhd ${isAmp ? '' : 'clearfix'}`}>
				<h2>
          <a href={publicRuntimeConfig.siteUrl + dataObj["more-url"].replace("/", "")}>{dataObj["value"]}</a>
        </h2>
      </div>
      {!isLoading && NewsData?.length > 0 ? (
        <>
          <div id="clkbuttonknowledge">
            <ul className="global-storylist-grid dflx jstcntspcbtwn flxwrp">
              {NewsData.map((eachData, index) => {
                const title = eachData?.display_headline || eachData?.headline;
                return (
                  <li key={`list`+eachData.story_id+`-`+index}>
                    <h3>
                      <a href={eachData?.weburl ? eachData?.weburl.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl+`${isAmp ? "amp/" : ''}`) : ''} >
                        {
                          isAmp ?
                            <figure>                              
                              <LazyLoadImage
                                src={eachData?.images?.url}
                                width={187}
                                height={125}
                                alt={title}
                                title={title}
                                isAMP={true}                         
                              />
                            </figure>
                          :
                          <figure width={187} height={125}>
                            <LazyLoadImage
                              width={187}
                              height={125}
                              src={eachData?.images?.url}
                              alt={title}
                              title={title}                              
                              className={"globalmgbox"}
                            />
                          </figure>
                        }
                        {title}
                      </a>
                    </h3>
                  </li>
                );
              })}
            </ul>
          </div>
          <a href={publicRuntimeConfig.siteUrl + dataObj["more-url"].replace("/", "")} className="aurparhenbtn">{TEXT.READ_MORE}</a>
        </>
        ) : (
          <>
            {!isAmp ?
              <div className='skeleton-background home-news-grid-skeleton' >
                <ul className="global-storylist-grid dflx jstcntspcbtwn flxwrp">
                  <li>
                    <Skeleton height={135}/>
                    <Skeleton height={17} count={3}/>
                  </li>
                  <li>
                    <Skeleton height={135}/>
                    <Skeleton height={17} count={3}/>
                  </li>
                  <li>
                    <Skeleton height={135}/>
                    <Skeleton height={17} count={3}/>
                  </li>
                  <li>
                    <Skeleton height={135}/>
                    <Skeleton height={17} count={3}/>
                  </li>
                </ul>
              </div>
            : '' }
          </>
      )}
      <style jsx global>{`
        .home-news-grid-skeleton{
          padding-bottom : 50px;
        }
        .news-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 479px;
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
        .globalhd h2 {
          color: #001536;
          font-size: 20px;
          font-weight: 700;
          display: inline-block;
          flex-shrink: 0;
          line-height: 20px;
        }
        .globalhd h2 a {
          color: #001536;
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
        .globaltab li {
          flex-shrink: 0;
        }
        .globaltab li.act a {
          border: 1px solid #ed1c24;
          color: #ed1c24;
        }
        .globaltab li a {
          color: #333;
          display: block;
          border: 1px solid #fff;
          border-radius: 20px;
          line-height: 26px;
          padding: 0 10px;
          font-size: 13px;
          outline: 0;
        }
        .bigstory {
          clear: both;
          background: #f3f3f3;
          position: relative;
          min-height: 227px;
        }
        .bigstory figure {
          position: relative;
          overflow: hidden;
          line-height: 0;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .bigstory figure img {
          width: 100%;
        }
        .bigstory h3 {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent,#111,#000);
          background: -webkit-linear-gradient(transparent,#111,#000);
          background: -moz-linear-gradient(transparent,#111,#000);
          padding: ${isAmp ? '45px 15px 10px 15px' : '45px 20px 10px 20px;'};
        }
        .bigstory h3 a {
          display: block;
          font-size: 18px;
          line-height: 24px;
          color: #fff;
          font-weight: 700;
        }
        .vsp10 {
          margin-top: 10px;
        }
        .global-storylist {
          margin-bottom: 10px;
        }
        .global-storylist li:first-child {
          /* padding-top: 0; */
        }
        ul.global-storylist li {
          position: relative;
        }
        .global-storylist li {
          font-size: 16px;
          ${isAmp ? `
          line-height: 21px;
          font-weight: bold;` : `line-height: 20px;`}
          padding: 12px 0;
          width: 100%;
          border-bottom: 1px solid #ccc;
        }
        ul.global-storylist li h3 {
          font-size: 16px;
          font-weight: normal;
          line-height: 21px;
        }
        .global-storylist li a {
          ${isAmp ? `
          display: flex; 
          align-items: flex-start;
          font-weight: bold;` : `
          display: flex;
          align-items: center;`}
          color: #222;
          font-weight: bold;
        }
        .global-storylist li figure {
          width: 80px;
          height: 53px;
          background: #eee;
          flex-shrink: 0;
          ${isAmp ? ' margin-left: 10px;' : 'margin-right: 10px;'}
        }
        .globalmgbox {
          position: relative;
          overflow: hidden;
          line-height: 0;
        }
        .globaltab.dflx.jstcntspcbtwn {
          padding-bottom: 15px;
        }
        .moneycontrol-globalhd {
          display: flex;
          align-items: center;
          padding-left: 20px;
        }
        .moneycontrol-globalhd span {
          display: block;
          font-size: 12px;
          color: #8a8989;
          padding-right: 6px;
          padding-bottom: 4px;
        }
        .moneycontrol-globalhd a {
          display: block;
        }
        .moneycontrol-globalhd img {
          width: 95px;
        }
        .no-border {
          border : none;
        }
        .aurparhenbtn {
          color: #ed1c24;
          border: 1px solid #ed1c24;
          border-radius: 20px;
          height: 26px;
          line-height: 26px;
          font-weight: 700;
          font-size: 14px;
          outline: 0;
          box-sizing: border-box;
          display: block;
          margin: ${isAmp ? '15px auto 30px auto' : '15px auto 20px auto'};
          width: 105px;
          overflow: hidden;
          text-align: center;
        }
        .global-storylist-grid {
          margin-bottom: 10px;
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
        .global-storylist-grid li {
          font-size: 16px;
          line-height: 20px;
          padding-bottom: 10px;
          margin-bottom: 10px;
          width: 48%;
          border-bottom: 1px solid #ccc;
        }
        .global-storylist-grid li h3 {
          font-size: 16px;
          ${isAmp ? `font-weight: bold; line-height: 21px;` : `font-weight: normal;`}
          font-weight: bold;
          line-height: 21px;
        }
        .global-storylist-grid li figure {
          margin-bottom: 5px;
          min-height: 110px;
          background: #eee;
        }
        .globalmgbox {
          position: relative;
          overflow: hidden;
          line-height: 0;
        }
      `}</style>
    </>
  );
};

export default HomeNews;
