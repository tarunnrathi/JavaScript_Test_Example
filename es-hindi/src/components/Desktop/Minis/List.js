import React, { memo } from "react";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
//import { imageLoader } from "includes/article.util";
import { logEvent } from "includes/googleAnalytic";
import ReactHtmlParser from "html-react-parser";
//import Image from "next/image";
import { getCompleteURL } from "util/global/Helper";
import { getSocailShareUI } from "util/individual/Minis";
import LazyLoadImage from "components/Common/CustomImage";

const Minis = (props) => {
  const { photoStories, topStories, newsMini, domain, breadCrumbArray, pageAds } = props?.data;
  return (
    <>
      <div className="container clearfix">
        <div className="leftwrap">
          <ul className="newbrdcrmb">
            {breadCrumbArray && breadCrumbArray?.length > 0 && breadCrumbArray?.map((post, index) =>
              post.slug !== "" && index < breadCrumbArray.length - 1 ? (
                  <li key={`bredCrum-`+index}>
                    <a href={post.slug}>{post.value}</a>/
                  </li>
              ) : (
                <li key={`bredCrum-`+index}>
                  <a>
                    <h2>{post.value}</h2>
                  </a>
                </li>
              )
            )}
          </ul>
          <div className="home_nw18_minis">
            <div className="minis_headWrap">
              <div className="minis_head_div">
                <h2 className="minis_head">News18&nbsp;</h2>
                <span>
                  <h2 className="minis_span_head">Minis</h2>
                </span>
              </div>
              <div className="minis_smalltxt">
                A world of news at your fingertips
              </div>
            </div>
            {
              newsMini && newsMini?.length > 0 && (
                <ul className="minis_inner minis_grid">
                  { newsMini.map((news, index) => {
                    // const width = 360;
                    // const height = 240;
                    //const imageSrc = imageLoader(news?.images?.url, width, height);
                    const title = news?.display_headline || news?.headline;
                    const webUrl = getCompleteURL(news?.weburl_r, news?.weburl);
                    const introduction = news.intro;
                    return (
                      <div className="minis_grid_col" key={`minisList-`+index}>
                        <div className="grid_inner">
                          <div className="imgBox">
                            <a
                              onClick={() => {
                                logEvent("News18 Minis", "Click - Home", webUrl);
                              }}
                              href={webUrl}
                              target="_blank"
                            >
                              <LazyLoadImage
                                src={news?.images?.url}
                                width={280}
                                height={186}
                                alt={title}
                                title={title}                                  
                              />
                              {/* <Image
                                loading="lazy"
                                src={imageSrc}
                                alt={title}
                                title={title}
                                height={186}
                                width={280}
                              /> */}
                            </a>
                          </div>
                          <div className="contentBox">
                            <a
                              className="anchor_heading_1"
                              onClick={() => {
                                logEvent("News18 Minis", "Click - Home", webUrl);
                              }}
                              href={webUrl}
                              target="_blank"
                            >
                              <h2 className="heading_1">{title}</h2>
                            </a>
                            <a
                              onClick={() => {
                                logEvent("News18 Minis", "Click - Home", webUrl);
                              }}
                              href={webUrl}
                              target="_blank"
                            >
                              <p>
                                {ReactHtmlParser(introduction ? introduction : "")}
                              </p>
                            </a>
                          </div>
                          { getSocailShareUI({ webUrl: webUrl, title: title, isMobile:false }) }
                        </div>
                      </div>
                    );
                  })}
                </ul>
              )
            }
          </div>
        </div>
        <div className="rightwrap">
          <RhsCommon
            photoStories={photoStories}
            topStories={topStories}
            pageAds={pageAds}
            page={`minis`}
          />
        </div>
      </div>
      <style jsx global>{`
        .newbrdcrmb {
          display: flex;
          border-bottom: 1px dotted #d9d9d9;
          padding-bottom: 5px;
        }
        .newbrdcrmb li {
          font-size: 13px;
          color: #e1261d;
          text-transform: uppercase;
        }
        .newbrdcrmb li:first-child a {
          padding-left: 0;
        }

        .newbrdcrmb li a {
          color: #e1261d;
          padding: 0 5px;
          display: inline-block;
        }
        .newbrdcrmb li h2 {
          font-size: 13px;
          color: #838383;
          font-weight: normal;
          padding-left: 5px;
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
        .leftwrap {
          width: calc(100% - 325px);
          float: left;
          position: relative;
          padding: 10px 0;
        }
        .rightwrap {
          position: sticky;
          top: 60px;
          z-index: 1;
          margin-top: 5px;
          width: 300px;
          float: right;
        }
        .minis_grid .minis_grid_col .grid_inner {
          background: #fff;
        }
        .minis_grid .minis_grid_col .grid_inner {
          height: 100%;
          box-sizing: border-box;
        }
        .minis_grid .minis_grid_col .grid_inner {
          box-shadow: 0 5px 5px #00000029;
          border-radius: 5px;
          position: relative;
          padding-bottom: 45px;
        }
        .home_nw18_minis {
          padding: 12px;
          overflow: hidden;
          border: 1px solid #e3e3e3;
          background: #f8f8f8;
          border-radius: 10px;
          margin: 10px 0 12px;
          padding-bottom: 38px;
        }
        .home_nw18_minis .slick-dots li {
          width: 17px;
        }
        .home_nw18_minis .slick-dots li button::before {
          font-size: 7px;
        }
        .home_nw18_minis .minis_headWrap {
          display: flex;
          padding: 0 0 5px;
          margin: 0 5px 5px 5px;
          border-bottom: 1px solid #c9c9c9;
        }
        .home_nw18_minis .minis_headWrap .minis_head_div {
          color: #001e44;
          font-size: 26px;
          text-transform: uppercase;
          line-height: 26px;
          font-weight: 900;
          display: flex;
        }
        .home_nw18_minis .minis_headWrap .minis_head_div .minis_head {
          color: #001e44;
          font-size: 26px;
          text-transform: uppercase;
          line-height: 26px;
          font-weight: 900;
        }
        .home_nw18_minis .minis_headWrap .minis_head_div span h2 {
          color: #e1261c;
          font-weight: 900;
          font-size: 26px;
          text-transform: uppercase;
          line-height: 26px;
          font-weight: 900;
          display: flex;
        }
        .home_nw18_minis .minis_headWrap .minis_smalltxt {
          text-transform: uppercase;
          color: #b4b4b4;
          font-size: 11px;
          align-self: flex-end;
          line-height: 11px;
          margin-left: 10px;
          margin-right: auto;
          position: relative;
          top: -3px;
        }
        .home_nw18_minis .minis_headWrap .minis_link {
          font-family: "Lato";
          font-weight: bold;
          text-transform: uppercase;
          color: #e1261c;
          font-size: 14px;
          align-self: flex-end;
          line-height: 11px;
          padding: 2px 18px 2px 0;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/arrow-right.png);
          background-size: 12px;
          background-repeat: no-repeat;
          background-position: center right;
        }
        .minis_grid .minis_grid_col {
          width: 33.3%;
          padding-left: 10px;
          padding-right: 10px;
          margin-bottom: 20px;
          box-sizing: border-box;
        }
        .minis_grid .imgBox {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          overflow: hidden;
          min-height: 191px;
        }
        .minis_grid .imgBox a {
          display: block;
          height: 191px;
          text-decoration: none;
          color: #111;
        }
        .minis_grid .imgBox img {
          width: 100%;
          height: 100%;
          display: block;
        }
        .minis_grid .contentBox {
          padding: 5px 10px 0 10px;
          height: 209px;
          overflow: hidden;
          position: relative;
        }
        .minis_grid .contentBox .anchor_heading_1 .heading_1 {
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          margin-bottom: 5px;
        }
        .minis_grid .contentBox anchor_heading_1 {
          color: #001e44;
          display: block;
        }
        .minis_grid .contentBox p {
          font-size: 14px;
          color: #6d6d6d;
          margin: 0;
          line-height: 22px;
          position: relative;
        }
        .minis_wrap {
          padding: 10px 15px 20px;
          background: #f8f8f8;
          border: 1px solid #e3e3e3;
          border-radius: 10px;
        }
        .minis_grid {
          display: flex;
          flex-wrap: wrap;
          margin-left: -10px;
          margin-right: -10px;
        }
        .minis_grid .ftr_social {
          display: flex;
          justify-content: center;
          border-top: 1px solid #e3e3e3;
          padding: 6px 0;
          bottom: 0;
          position: absolute;
          width: 100%;
        }
        .minis_grid .ftr_social li.whatsApp {
          background: #25d366;
        }
        .minis_grid .ftr_social li {
          display: flex;
          border-radius: 50%;
          margin-right: 10px;
          height: 25px;
          padding: 0;
        }
        .minis_grid .ftr_social li a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 25px;
        }
        .minis_grid .ftr_social li img {
          height: 12px;
          border: none;
        }
        .minis_grid .ftr_social li.fb {
          background: #1877f2;
        }
        .minis_grid .ftr_social li.tw {
          background: #1da1f2;
        }
      `}</style>
    </>
  );
};

export default memo(Minis);
