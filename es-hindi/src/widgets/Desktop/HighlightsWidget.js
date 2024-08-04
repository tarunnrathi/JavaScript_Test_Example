import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const HighlightsWidget = ({ highlightsData = [], switchesData = {}, showSponserAd, showLiveBlog }) => {

  useEffect(() => {
    new Glide('.home_strip_slider', {
        type: 'carousel',
        autoplay: 4000,
        perView: 5,
        gap: 10,
        slidesToShow: 1,
        rewind: false,
    }).mount();

  }, []);

  return (
    <>
      <div className="highlights_widget budget_container" style={{ marginTop: !showSponserAd ? "15px" : 0 }}>
        <div className="container">
          <div className="home_strip">
          <div className="home_strip_left">
          <a href="/budget/highlights/">
            <i>
              <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_glossary_icon_1609753501.png" />
            </i>
            <p>
              बजट 2023<span>हाइलाइट्स</span>
            </p>
          </a>
          </div>
          <div className="home_strip_midd">
          <div className="home_strip_slider">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {highlightsData.map((item, ind) => (<li key={ind} className={`${item.highlightstypes == "down" ? "strip_low_price" : item.highlightstypes == "up" ? "strip_high_price" : "strip_highlight"}`} >
                  <a href={item.story_url}>
                    <p>{item.headline}</p>
                  </a>
                </li>))}
              </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
              <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                prev
              </button>
              <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                next
              </button>
            </div>
          </div>
          </div>
          <div className="home_strip_right">
          {switchesData.budget_live_tv_onoff ? (
            <span className="strip_livetv">
              <a href="/livetv/">लाइव टीवी</a>
            </span>
          ) : (
            ""
          )}
          {showLiveBlog ? (
            <span className="strip_liveblog">
              <a href={switchesData.liveblog_url}>
                {switchesData.liveblog_title}
              </a>
            </span>
          ) : (
            ""
          )}
          </div>
          </div>
        </div>
        {showSponserAd ? (
          <div className="sponser-ad">
            <SiteAd
              width={1244}
              height={60}
              slotId={'budget_highlight_widget'}
              adUnit={'NW18_HIND_Desktop/NW18_HIND_BUDGET/NW18_HIND_BUDGET_HOME/NW18_HIND_BDGT_SPONSOR_TOP_STRIP_1244x60'}
              sizes={[[1244, 60]]}
              lazyload={true}
            ></SiteAd>
          </div>
        ) : (
          ""
        )}
      </div>
      <style jsx>{`
        .nhhdr-nav {
          width: auto;
        }
        .n18bhdr .lnlivetv .languagebox,
        .n18bhdr .lnlivetv .nhlivetv,
        .n18bhdr .lnlivetv .lnlapp,
        .n18bhdr .nhsocial {
          width: auto;
          flex-shrink: 0;
        }
        .budget_container {
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .home_strip_ad {
          max-width: 1244px;
          height: 60px;
          background: #000;
          margin-bottom: 1px;
        }
        .home_strip {
          width: 100%;
          display: flex;
          justify-content: space-between;
          height: 58px;
          border: 1px #b6b3b4 solid;
          background: #f3f3f3;
        }
        .home_strip_left {
          display: flex;
          align-items: center;
          background: #fff;
          padding: 0 10px 0 5px;
          flex-shrink: 0;
          border-right: 1px #b6b3b4 solid;
        }
        .home_strip_left a {
          display: flex;
          align-items: center;
        }
        .home_strip_midd {
          width: calc(100% - 280px);
          padding: 0 20px;
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
        }
        .home_strip_left i img {
          width: auto;
          height: 50px;
        }
        .home_strip_right {
          width: 105px;
          height: 56px;
          background: #fff;
          border-left: 1px #b6b3b4 solid;
          font-weight: bold;
        }
        .home_strip_left p {
          color: #242d3c;
          font-size: 12px;
          font-weight: bold;
          line-height: 16px;
          text-align: right;
          position: relative;
        }
        .home_strip_left p span {
          display: block;
          color: #e1261c;
          font-size: 16px;
        }
        .sponser-ad {
          text-align: center;
        }
        .home_strip_left i {
          padding-right: 5px;
          display: flex;
          align-items: center;
        }
        .home_strip_left p:before {
          width: 8px;
          height: 8px;
          animation-name: mymove;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          content: "";
          position: relative;
          top: -1px;
          background: #e1261c;
          border-radius: 100px;
          display: inline-block;
          margin-right: 2px;
        }
        @keyframes mymove {
          0% {
            background: #e1261c;
          }
          50% {
            background: #fff;
          }
          100% {
            background: #e1261c;
          }
        }
        .home_strip_right span {
          font-size: 12px;
          text-align: left;
          display: block;
          border-bottom: 1px #b6b3b4 solid;
          line-height: 29px;
          padding-left: 34px;
          text-decoration: underline;
          position: relative;
        }
        .home_strip_right span:last-child {
          border: 0;
        }
        .home_strip_slider {
          list-style: none;
          overflow: hidden;
        }
        .strip_livetv a {
          color: #e1261c;
        }
        .strip_liveblog a {
          color: #001d42;
        }
        .home_strip_slide li {
          background: #ffffff 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 5px;
        }
        .home_strip_slider li{
          background: #ffffff 0% 0% no-repeat padding-box;
          font-weight: bold;
          line-height: 20.99px;
          box-shadow: 0px 3px 6px #00000029;
          margin: 0 5px;
          padding: 0 10px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          height: 48px;
          outline: none;
          border-radius: 0px 0px 5px 5px;
          width: auto !important;
          float: left;
      }

        .strip_highlight {
          font-size: 14px;
          color: #001d42;
          border-bottom: 5px #001d42 solid;
        }
        .strip_low_price,
        .strip_high_price {
          font-size: 14px !important;
        }
        .strip_high_price {
          color: #e1261c;
          border-bottom: 5px #e1261c solid;
          padding-left: 43px !important;
          position: relative;
          line-height: 1;
          font-size: 16px; /* width: auto !important; */
        }
        .strip_high_price a p {
          color: #e1261c;
        }
        .strip_low_price {
          color: #037500;
          border-bottom: 5px #037500 solid;
          padding-left: 43px !important;
          position: relative;
          line-height: 1;
          font-size: 16px;
        }
        .strip_low_price a p {
          color: #037500;
        }
        .strip_low_price:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/cheaper_icon_1610110650.svg);
          content: "";
          width: 30px;
          height: 30px;
          position: absolute;
          left: 6px;
          top: 7px;
          background-size: 17px;
          background-repeat: no-repeat;
          border: 1px #cbcbcb solid;
          border-radius: 100px;
          background-position: center;
        }
        .strip_high_price:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/dearer_icon_1610110679.svg);
          content: "";
          width: 30px;
          height: 30px;
          position: absolute;
          left: 6px;
          top: 7px;
          background-size: 17px;
          background-repeat: no-repeat;
          border: 1px #cbcbcb solid;
          border-radius: 100px;
          background-position: center;
        }
        .home_strip_right span:after {
          content: "";
          position: absolute;
          left: 8px;
          top: 7px;
          background-repeat: no-repeat;
          width: 20px;
          height: 21px;
        }
        .strip_livetv:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/live_tv_icon_1610126712.svg);
          width: 20px;
          height: 21px;
        }
        .home_strip_slider li p, .strip_highlight p {
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          font-weight: bold;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          -webkit-box-orient: vertical;
          font-size: 14px!important;
          max-width: 350px;
          max-height: 36px;
      }
        .home_strip_slider .glide__slides {
          display: flex;
          width: 100%;
          overflow: hidden;
          margin-top: 4px;
        }
        .home_strip_slider .glide__track {
          overflow: hidden;
          width: 100%;
          padding: 0;
        }
        .home_strip_slider {
          width: 100%;
        }
        .home_strip_slider button.glide__arrow.glide__arrow--left {
          position: absolute;
          top: 23px;
          border: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 6px solid #222;
          font-size: 0;
          left: 6px;
          background: none;
          padding: 0;
          outline: none;
          cursor: pointer;
        }
        .home_strip_slider button.glide__arrow.glide__arrow--right {
          position: absolute;
          top: 23px;
          border: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 6px solid #222;
          font-size: 0;
          right: 6px;
          transform: rotate(180deg);
          background: none;
          padding: 0px;
          outline: none;
          cursor: pointer;
        }
        .strip_liveblog:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/live_blog_icon_1610126679.svg);
          top: 5px;
        }
        /**{box-sizing: border-box;  margin: 0;padding: 0}*/
        @font-face {
          font-family: "Segoe Pro Regular";
          font-style: normal;
          font-weight: normal;
          src: local("Segoe Pro Regular"),
            url("https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/fonts/SegoePro-Regular.woff")
              format("woff");
        }
        @font-face {
          font-family: "Segoe Pro Bold";
          font-style: normal;
          font-weight: normal;
          src: local("Segoe Pro Bold"),
            url("https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/fonts/SegoePro-Bold.woff")
              format("woff");
        }
        @font-face {
          font-family: "Segoe Condensed";
          font-style: normal;
          font-weight: normal;
          src: local("Segoe Condensed"),
            url("https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/fonts/SegoePro-Cond.woff")
              format("woff");
        }
        @font-face {
          font-family: "Segoe Pro Cond Bold";
          font-style: normal;
          font-weight: normal;
          src: local("Segoe Pro Cond Bold"),
            url("https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/fonts/SegoePro-CondBold.woff")
              format("woff");
        }
        @font-face {
          font-family: "Segoe Pro Regular";
          font-style: normal;
          font-weight: normal;
          src: local("Segoe Pro Regular"),
            url("https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/fonts/SegoePro-Regular.woff")
              format("woff");
        }
        @font-face {
          font-family: "Segoe Pro Bold";
          font-style: normal;
          font-weight: normal;
          src: local("Segoe Pro Bold"),
            url("https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/fonts/SegoePro-Bold.woff")
              format("woff");
        }
        @font-face {
          font-family: "Segoe Condensed";
          font-style: normal;
          font-weight: normal;
          src: local("Segoe Condensed"),
            url("https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/fonts/SegoePro-Cond.woff")
              format("woff");
        }
        @font-face {
          font-family: "Segoe Pro Cond Bold";
          font-style: normal;
          font-weight: normal;
          src: local("Segoe Pro Cond Bold"),
            url("https://images.news18.com/static_news18/pix/ibnhome/news18/delhi-assembly-election-2020/fonts/SegoePro-CondBold.woff")
              format("woff");
        }
      `}</style>
    </>
  );
};

export default HighlightsWidget;
