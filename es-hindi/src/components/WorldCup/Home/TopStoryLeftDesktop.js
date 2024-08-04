import { Wrapper, imageLoader } from 'includes/article.util';
import { setDefaultImage } from "includes/article.util";
import { Fragment } from 'react';
// import Image from 'next/image';
import LazyLoadImage from 'components/Common/CustomImage';

const HomeTopNews = ({ videoStatus, topNews, videoIframe }) => {
  const rightNews =  videoStatus == 1 ? topNews.right.slice(0, 4) : topNews.right.slice(0, 7);
  const skinning = topNews?.skinning == 1;
  return (
    <>
      <div className="topnews dflex justify-space-betwwen">
        <div className="topnews-left ">
          <ul className="topnews-left-list">
            {topNews.left &&
              topNews.left.filter(Boolean).map((storyData, index) => {
                const { article_details: item } = storyData;
                let width = index == 0 ? 521 : 80;
                let height = index == 0 ? 347 : 53;
                let lazyImg = item?.images?.url || "";
                let src = imageLoader(lazyImg, width, height, false);
                return (
                  <Fragment key={index}>
                    {
                      item ?
                        <>
                          <li key={`list${index}`}>
                            <a
                              href={item?.weburl_r}
                            >
                              <figure>
                                <LazyLoadImage
                                  src={src}
                                  width={width}
                                  height={height}
                                  alt={item?.display_headline || 'top news'}
                                  className={"globalmgbox"}
                                  unoptimized={true}
                                />
                              </figure>
                              <h2>{item?.display_headline || item?.title}</h2>
                            </a>
                          </li>
                        </>
                        : ""
                    }
                  </Fragment>
                );
              })}
          </ul>
        </div>
        <div className="topnews-right">
          {videoStatus == 1 ? (
            <Wrapper
              wrap={skinning}
              wrapper={(child) => (
                <div className="livetvsponsorbox hindi_live_tv_skinning_wrap">
                  {child}
                </div>
              )}
            >
              <div className={`livetv ${skinning ? 'forsponsores' : ''}`}>
                <div className={`livetv-play ${skinning ? 'forsponsores' : ''}`}>
                  <div id="vidgyor_parent">
                    <iframe width="375" height="220" src={videoIframe} allowFullScreen="allowFullScreen"></iframe>
                  </div>
                </div>
              </div>
            </Wrapper>
          ) : null}
          <ul className="top-kharein">
            {rightNews &&
              rightNews.map((storyData, index) => {
                const { article_details: item } = storyData;
                let width = 80;
                let height = 53;
                let lazyImg = item?.images?.url || "";
                let src = imageLoader(lazyImg, width, height, false);
                return item?.display_headline ? (
                  <li key={index} className={"rltdnw"}>
                    <a href={item?.weburl_r}>
                      <figure>
                        <LazyLoadImage
                          src={src}
                          width={width}
                          height={height}
                          alt={item?.display_headline || 'top khabrein'}
                          onError={setDefaultImage}
                          unoptimized={true}
                        />
                      </figure>
                      <h3>{item?.display_headline || item?.title}</h3>
                    </a>
                  </li>
                ) : (
                  ''
                )
              })}
          </ul>
        </div>
      </div>
      <style jsx global>{`
      
      .forsponsores{
        margin-bottom:0px !important;
      }
        .topnews-left-list li:first-child .rltdnws {margin: 0px 15px 0 50px;}
        .topnews-left-list li:first-child .rltdnws a{width: 410px;}
        // .top-kharein li .rltdnwsclick{margin-top: -8px;}
        // .top-kharein li .rltdnws {margin: 5px 0 0 0;}
        .top-kharein li .rltdnws a{width: 370px}
        .topnews-left-list li:last-child {padding-bottom: 5px;}
        .rltdnws-content.active-related-article {max-height: 150px; transition: 0.3s ease-in-out; }

        .topnews .globalhd {
          margin-top: 0px;
        }
        .topnews-left-list li a h2:hover {
          color: #ed1c24;
        }
        ul.topnews-left-list {
          background: #f3f3f3;
        }
        .topnews-left-list li:first-child a h2 {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.45;
          position: relative;
          background: #f3f3f3;
          margin: -70px 0 0 32px;
          padding: 10px 15px 0 15px;
          width: 100%;
        }

        .topnews-left-list li a h2,
        .topnews-left-list li a h3 {
          font-size: 17px;
          font-weight: 400;
          line-height: 1.45;
          margin: auto;
          width: 100%;
        }
        .topnews-left-list li:first-child {
          background: #f3f3f3;
          // padding-bottom: 20px;
          margin: 0 0 12px 0;
        }
        .topnews-left-list li {
          margin: 0 12px 12px 12px;
        }
        .topnews-left-list li:first-child figure {
          width: 100%;
          margin: 0;
          min-height: 250px;
        }
        .topnews-left-list li figure {
          width: 80px;
          margin-right: 15px;
          flex-shrink: 0;
        }
        .topnews-left {
          width: 56%;
          background: #fff;
        }
        .topnews-left-list li:first-child a {
          flex-wrap: wrap;
        }
        .topnews-left-list li a {
          display: flex;
          font-weight: 700;
          color: #000;
        }
        .justify-space-betwwen {
          justify-content: space-between;
        }
        .topnews-right {
          width: 42.5%;
        }
        .top-kharein li {
          font-size: 17px;
          line-height: 1.45;
          border-bottom: 1px dashed #ccc;
          padding: 12px 0;
        }
        .top-kharein li.rltdnw {
          padding: 12px 0 6px;
        }
        .top-kharein li h3 {
          font-size: 17px;
          font-weight: normal;
        }
        .top-kharein li a {
          color: #000;
          display: flex;
        }
        .top-kharein li a figure {
          flex-shrink: 0;
          margin-right: 15px;
          width: 80px;
        }
        .top-kharein li a figure img {
          width: 80px;
          flex-shrink: 0;
          margin-right: 15px;
        }
        .justify-space-betwwen {
          justify-content: space-between;
        }
        .dflex {
          display: flex;
        }
        .livetv-play {
          width: 100%;
          height: 220px;
          overflow: hidden;
          margin-bottom: 15px;
          position: relative;
          z-index: 1;
        }
        .livetv-play img {
          width: 100%;
        }
        .top-kharein li:hover a {
          color: #ed1c24;
        }
          @keyframes blinker{0%{-webkit-transform:scale(0);opacity:0;}50%{opacity:1;}to{-webkit-transform:scale(1);opacity:0;}}
        ${skinning
          ? `
        .topnews-left.forsponsores{width: 42%}	
        .topnews-right.forsponsores{display: flex; flex-wrap: wrap; width: 56%;}
        .livetvsponsorbox{width: 100%; display: flex;}
        .livetvsponsorimg{text-align:center; max-width: 100%; flex-shrink: 0; margin-top: 0px;}
        .livetv.forsponsores{width: 100%; margin:0 1px;}
        .livetv-play.forsponsores{height: 212px;}
        .livetvsponsorimg.hindi_hp_page_left_ad, .livetvsponsorimg.hindi_hp_page_right_ad{margin-top: 30px;}
        .newlivetv-widget{width: 100%;}
        .lokmat_live_tv_skinning_wrap {width: 100%;}
        .topnews-right.forsponsores .lokmat_live_tv_skinning_wrap h2, .newlivetv-widget h2{margin-left: 79px;}
        .topnews-right.forsponsores .lokmat_live_tv_skinning_wrap .livetvsponsorbox .livetvsponsorimg{margin-top:0px; background: #eee;}
        .hindi_live_tv_pg_top_ad,
        .hindi_live_tv_pg_bottom_ad,
        {display: flex;justify-content: center;}
        
        `
          : ''}
      `}</style>
    </>
  );
};

export default HomeTopNews;
