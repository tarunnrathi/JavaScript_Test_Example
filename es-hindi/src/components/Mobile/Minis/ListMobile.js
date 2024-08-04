//import { imageLoader } from "includes/article.util";
import ReactHtmlParser from "html-react-parser";
import React from "react";
import { getCompleteURL } from "util/global/Helper";
//import Image from "next/image";
import { getSocailShareUI } from "util/individual/Minis";
import LazyLoadImage from "components/Common/CustomImage";

const Minis = (props) => {
  const { newsMini ,breadCrumbArray} = props?.data || {};

  return (
    <>
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
          <h1 className="minis_head">
            News18 <span>Minis</span>
            <a className="minis_link">A world of news at your fingertips</a>
          </h1>
        </div>
        <div className="Minis_slider regular slider">
          {newsMini && newsMini?.length > 0 && newsMini?.map((news, index) => {
            const width = 360;
            const height = 240;
            //const imageSrc = imageLoader(news?.images?.url, width, height);
            const title = news?.display_headline || news?.headline;
            const webUrl = getCompleteURL(news?.weburl_r, news?.weburl);
            const introduction = news.intro;
            return (
                <div className="inner" key={`mobileMinisList-`+index}>
                  <div className="imgBox">
                  <LazyLoadImage
                    src={news?.images?.url}
                    width={width}
                    height={height}
                    alt={title}
                    title={title}                                  
                  />
                    {/* <Image
                      loading="lazy"
                      src={imageSrc}
                      alt={title}
                      title={title}
                      width={width}
                      height={height}
                    /> */}
                  </div>
                  <div className="contentBox">
                    <h2 className="heading_1">{title}</h2>
                    <p>{ReactHtmlParser(introduction ? introduction : "")}</p>
                  </div>
                  <div className="ftr_box">
                    <a className="ftr_a readStory_1" href={webUrl}>
                      पूरा पढ़ें
                    </a>
                    { getSocailShareUI({ webUrl: webUrl, title: title, isMobile:true}) }
                  </div>
                </div>
            );
          })}
        </div>
      </div>
      <style jsx global>{`
      .newbrdcrmb {
          display: flex;
          border-bottom: 1px dotted #d9d9d9;
          padding-bottom: 5px;
          margin-left: 10px;
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
          font-weight: 400;
        }
        .home_nw18_minis {
          padding-bottom: 50px;
          background: #202020;
        }
        .home_nw18_minis .minis_headWrap {
          display: flex;
          justify-content: space-between;
          padding: 7px 10px;
          box-shadow: 0 3px 8px #00000029;
          position: relative;
          //z-index: 99;
          width: 100%;
          background: #fff;
          top: 0;
        }
        .home_nw18_minis .minis_headWrap .minis_head {
          display: flex;
          font-weight: normal;
        }
        .home_nw18_minis .minis_headWrap .minis_head {
          color: #001e44;
          font-family: "Fira Sans";
          font-size: 26px;
          text-transform: uppercase;
          line-height: 26px;
        }
        .home_nw18_minis .minis_headWrap .minis_head span {
          color: #e1261c;
          font-family: "Fira Sans";
        }
        .home_nw18_minis .minis_headWrap .minis_head span {
          margin-right: 10px;
          font-weight: bold;
          margin-left: 5px;
        }
        .Minis_slider {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        .home_nw18_minis .minis_headWrap .minis_link {
          align-self: flex-end;
          line-height: 12px;
        }
        .home_nw18_minis .minis_headWrap .minis_link {
          font-family: "Fira Sans";
          text-transform: uppercase;
          color: #b4b4b4;
          font-size: 11px;
          align-self: flex-end;
          line-height: 11px;
        }
        .Minis_slider * {
          box-sizing: inherit;
        }
        .inner .imgBox {
          overflow: hidden;
        }
        .inner .imgBox img {
          width: 100%;
          display: block;
        }
        .inner .contentBox {
          padding: 10px;
          height: 233px;
          overflow: hidden;
          position: relative;
        }
        .inner .contentBox .heading_1 {
          font-weight: bold;
          color: #ffffff;
          font-size: 22px;
          line-height: 30px;
          margin-bottom: 5px;
        }
        .inner .contentBox p {
          position: relative;
        }
        .inner .contentBox p {
          font-size: 14px;
          color: #c1c1c1;
          line-height: 22px;
        }
        .Minis_slider .ftr_box {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-bottom: 13px;
          margin-top: 5px;
        }
        .Minis_slider .ftr_box .ftr_a {
          font-size: 13px;
          font-weight: bold;
          padding: 6px 14px;
        }
        .Minis_slider .ftr_box .ftr_a {
          outline: 0;
        }
        .Minis_slider .ftr_box .ftr_a {
          margin-left: 10px;
          background: #e1261c;
          text-transform: uppercase;
          color: #fff;
          font-family: "Fira Sans";
          line-height: 17px;
          border-radius: 15px;
        }
        .Minis_slider .ftr_social {
          display: flex;
          justify-content: center;
        }
        .Minis_slider .ftr_social li {
          display: flex;
          border-radius: 50%;
          margin-right: 15px;
        }
        .Minis_slider .ftr_social li img {
          height: 18px;
        }
        .Minis_slider .ftr_social li a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 35px;
          height: 35px;
        }
        .Minis_slider .ftr_social li.whatsApp {
          background: #25d366;
        }
        .Minis_slider .ftr_social li.fb {
          background: #1877f2;
        }
        .Minis_slider .ftr_social li.tw {
          background: #1da1f2;
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

export default Minis;
