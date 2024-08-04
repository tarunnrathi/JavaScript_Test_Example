import React from "react";
import categoryHelper from "includes/category.helper";
import ManoranjanBottom from "./manoranjanBottom";

const EntertainmentPage = (props) => {

  const manoranjanTopUrlArray = categoryHelper.manoranjanTopUrlArray();
  // console.log({manoranjanTopUrlArray})

  return (
    <>

      {/* <div className="tpnews clearfix"></div> */}
      <div className="statelistingnewswrap">
        {manoranjanTopUrlArray.map((listNews, key) => (
          listNews.section != 'webstory' ? <ManoranjanBottom initialData={listNews} pageParam={props.pageParam} key={key} numkey = {key} /> : "Webstory"
        ))}
      </div>

      {/* <AstroSlide astroStories={props?.astroStories || []} /> */}

      <style jsx global>{`
        .glblbghd-sts-mrnav,
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

        .glblbghd-sts-mrnav {
          margin-bottom: 0;
        }

        .glblbghd-sts {
          border-bottom: 1px solid #001536;
          position: relative;
          display: flex;
          width: 100%;
          padding-bottom: 4px;
          margin-bottom: 8px;
          color: #001536;
          font-size: 22px;
          font-weight: 700;
          line-height: 20px;
        }
        .glblbghd-sts:before {
          content: "";
          width: 15px;
          height: 3px;
          background: #ed1c24;
          position: absolute;
          left: 0;
          bottom: -2px;
        }
        .glblbghd-sts .hd {
          float: left;
          font-size: 22px;
          color: #000;
          line-height: 24px;
          margin-top: 5px;
          font-weight: 700;
        }

        .glblbghd-sts a {
          color: #001536;
        }

        .gridview-story {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          border-bottom: 1px solid #ccc;
        }

        .gridview-story li {
          border: 1px solid #ddd;
          background: #fff;
          width: 48%;
          margin-bottom: 16px;
          box-sizing: border-box;
          padding-bottom: 10px;
        }

        .gridview-story li figure {
          width: 100%;
          float: left;
          line-height: 0;
          position: relative;
          margin-bottom: 8px;
        }

        .gridview-story li a {
          color: #000;
          z-index: 9999;
        }

        a img {
          border: none;
          width: 100%;
        }

        .gridview-story li .lstintro {
          padding: 0 8px;
          cursor: pointer;
          margin: 0;
          clear: both;
          overflow: hidden;
        }
        .gridview-story li h3 {
          font-size: 16px;
          line-height: 1.45;
          clear: both;
          font-weight: 400;
        }
        .gridview-story li a {
          color: #000;
          z-index: 9999;
        }

        .gridview-story li figure .tgtm-shr .tpc {
          display: none !important;
        }
        .pwa_add .addinner-box {
          height: 268px;
          width: 300px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default EntertainmentPage;
