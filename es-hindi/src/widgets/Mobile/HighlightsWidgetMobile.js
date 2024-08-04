import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const HighlightsWidgetMobile = ({ highlightsData = [], switchesData = {}, isAmp = false, showSponserAd, showLiveBlog }) => {
  useEffect(() => {
    new Glide('.home_strip_slider', {
        autoplay: 4000,
        type: 'sliders',
        perView: 1,
        gap: 10,
        slidesToShow: 1,
        dots: '#dots',
        rewind: true,
        draggable: true,
        peek: {
            before: 0,
            after: 100
        }
    }).mount();
  }, []);

  return (
    <>
      <div className="highlights_widget budget_container" style={{ marginTop: !showSponserAd ? "15px" : 0 }}>
        <div className="home_strip">
          <div className="home_strip_left">
            <a href="/budget/highlights/">
              {" "}
              <i>
                {
                  isAmp ?
                  <amp-img
                    src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_glossary_icon_1609753501.png"
                    width="28px"
                    height="30px"
                    alt="Budget Hightlight"
                    title="Budget Hightlight"
                  ></amp-img>
                :
                <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_glossary_icon_1609753501.png" />}
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
                  {highlightsData.map((item, ind) => (
                    <li key={ind} className={`${item.highlightstypes == "down" ? "strip_low_price" : item.highlightstypes == "up" ? "strip_high_price" : "strip_highlight"}`}>
                      <a href={item.story_url}>
                        <p>{item.headline}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="home_strip_right">
            {" "}
            {switchesData.budget_live_tv_onoff ? (
              <span className="strip_livetv">
                <a href="/livetv/">लाइव टीवी</a>
              </span>
            ) : (
              ""
            )}
            {" "}
            {showLiveBlog ? (
              <span className="strip_liveblog">
              <a href={switchesData.liveblog_url}>{switchesData.liveblog_title}</a>
            </span>
            ) : (
              ""
            )}
            <a href="/budget/highlights/" className="detailedview">
            बजट विस्तार से
            </a>
          </div>
          {showSponserAd ? (
              isAmp ?
              <div className="ad-container sponser-ad">
                <amp-ad
                  width={360}
                  height={50}
                  type="doubleclick"
                  data-lazy-fetch="true"
				          data-loading-strategy="1"
                  data-multi-size="360x50"
                  data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_BUDGET_AMP/NW18_HIND_BUDGET_HOME_AMP/NW18_HIND_BDGT_AMP_SPONSOR_TOP_STRIP_360x50"
                ></amp-ad>
              </div>
              :
              <div className="ad-container sponser-ad">
                <SiteAd
                  width={360}
                  height={50}
                  slotId={'budget_highlight_widget'}
                  adUnit={'NW18_HIND_PWA/NW18_HIND_BUDGET_PWA/NW18_HIND_BUDGET_HOME_PWA/NW18_HIND_BDGT_PWA_SPONSOR_TOP_STRIP_360x50'}
                  sizes={[[360, 50]]}
                  lazyload={true}
                ></SiteAd>
              </div>
            ) : (
              ""
            )}
        </div>
      </div>
      <style jsx>{`
        .home_strip_ad {
          text-align: center;
          background: #000;
        }
        .home_strip {
          width: 100%;
          display: block;
          justify-content: space-between;
          height: auto;
          background: #f3f3f3;
          box-shadow: 0px 3px 6px #00000029;
        }
        .home_strip_left {
          width: 100%;
          display: flex;
          align-items: center;
          background: #fff;
          padding: 2px 10px;
          border-left: 4px #e1261c solid;
        }
        .home_strip_left a {
          display: flex;
          align-items: center;
          font-weight: bold;
        }
        .home_strip_midd {
          width: 100%;
          padding: 5px 10px 10px 5px;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #ececec;
          border-top: 1px dashed #a2a2a2;
          border-bottom: 1px dashed #a2a2a2;
          padding-right: 0;
        }
        .home_strip_slider a.slick-arrow {
          position: absolute;
          top: 23px;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 6px solid #222;
          font-size: 0;
        }
        .home_strip_slider a.slick-prev.slick-arrow {
          left: 6px;
        }
        .home_strip_slider a.slick-next.slick-arrow {
          right: 6px;
          transform: rotate(180deg);
        }
        .home_strip_left i img {
          width: auto;
          height: 30px;
        }
        .home_strip_right {
          width: 100%;
          height: auto;
          overflow: hidden;
          background: #fff;
          font-weight: bold;
          border-bottom: 1px #b6b3b4 solid;
          display: flex;
          padding: 6px 0;
        }
        .home_strip_right span {
          font-size: 12px;
          text-align: left;
          display: block;
          padding-left: 31px;
          position: relative;
          padding-right: 10px;
          border-right: 1px #b6b3b4 solid;
        }
        .home_strip_right span:last-child {
          border: 0;
        }
        .home_strip_left p {
          color: #242d3c;
          font-size: 16px;
          line-height: 16px;
          display: flex;
          text-align: right;
          position: relative;
        }
        .home_strip_left p span {
          display: block;
          color: #e1261c;
          font-size: 16px;
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
          top: 4px;
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
        .home_strip_right span:last-child {
          border: 0;
        }
        .home_strip_slider {
          list-style: none;
          overflow: hidden;
        }
        span.strip_livetv a {
          color: #e1261c;
        }
        span.strip_liveblog a {
          color: #001d42;
        }
        ul.home_strip_slide li {
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
            width: auto;
            float: left;
        }
        .home_strip_slider li p, .strip_highlight p {
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          font-weight: bold;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          -webkit-box-orient: vertical;
          font-size: 14px;
          max-width: 350px;
          max-height: 36px;
      }
        .strip_highlight {
          font-size: 14px;
          color: #001d42;
          border-bottom: 5px #001d42 solid;
        }
        .strip_highlight a {
          color: #001d42;
          text-decoration: none;
        }
        .strip_low_price,
        .strip_high_price {
          font-size: 16px;
        }
        .home_strip_slider li.strip_high_price {
          color: #e1261c;
          border-bottom: 5px #e1261c solid;
          padding-left: 48px;
          position: relative;
        }
        .home_strip_slider li.strip_high_price a {
          color: #e1261c;
        }
        .home_strip_slider li.strip_low_price {
          color: #037500;
          border-bottom: 5px #037500 solid;
          padding-left: 48px;
          position: relative;
        }
        .home_strip_slider li.strip_low_price a {
          color: #037500;
        }
        li.strip_low_price:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/cheaper_icon_1610110650.svg);
          content: "";
          width: 30px;
          height: 30px;
          position: absolute;
          left: 6px;
          top: 50%;
          margin-top: -15px;
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
          top: 50%;
          margin-top: -15px;
          background-size: 17px;
          background-repeat: no-repeat;
          border: 1px #cbcbcb solid;
          border-radius: 100px;
          background-position: center;
        }
        .sponser-ad {
          text-align: center;
        }
        .home_strip_right span:after {
          content: "";
          position: absolute;
          left: 8px;
          top: 0px;
          background-repeat: no-repeat;
          width: 20px;
          height: 21px;
          background-size: 16px;
          background-position: center;
        }
        span.strip_livetv:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/live_tv_icon_1610126712.svg);
          width: 16px;
          height: 16px;
        }
        span.strip_liveblog:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/live_blog_icon_1610126679.svg);
          top: -2px;
        }
        .home_strip_left span {
          letter-spacing: -0.52px;
          color: #e1261c;
          font-size: 26px;
          line-height: 16px;
          padding-left: 5px;
        }
        li.strip_low_price p {
          overflow: hidden;
          font-size: 14px;
          line-height: 20px;
        }
        li.strip_high_price p {
          overflow: hidden;
          font-size: 14px;
          line-height: 20px;
        }
        a.detailedview {
          width: 122px;
          height: 28px;
          background: #e1261c 0% 0% no-repeat padding-box;
          float: right;
          position: absolute;
          right: 0;
          top: 0;
          color: #ffffff;
          text-transform: uppercase;
          font-size: 11px;
          line-height: 28px;
          padding-left: 10px;
        }
        .home_strip_right {
          position: relative;
        }
        a.detailedview:before {
          content: "";
          position: absolute;
          display: block;
          width: 7px;
          height: 2px;
          background: #ffffff;
          right: 12px;
          top: 13px;
        }
        a.detailedview:after {
          border-right: 2px solid #ffffff;
          border-top: 2px solid #ffffff;
          width: 4px;
          height: 4px;
          transform: rotate(45deg);
          top: 11px;
          right: 10px;
          content: "";
          position: absolute;
          display: block;
        }
        span.strip_liveblog {
          border: 0;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
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

export default HighlightsWidgetMobile;
