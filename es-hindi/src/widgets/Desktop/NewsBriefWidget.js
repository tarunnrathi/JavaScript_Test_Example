import { useEffect, useState } from 'react';
import Glide from '@glidejs/glide';
import getConfig from 'next/config';
import ReactHtmlParser from 'html-react-parser';
// import siteConfig from "config/site.config";

const { publicRuntimeConfig } = getConfig();

const newsBriefWidget = () => {
  const [newsBriefData, setNewsBriefData] = useState([]);

  useEffect(() => {
    getNewsBriefData();
  }, []);

  const getNewsBriefData = () => {
    fetch(
      publicRuntimeConfig.nodeApiAjaxUrl +
        '/get-news-brief/news18_mini_priority'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNewsBriefData(data);
        callSlider();
      })
      .catch((error) => {
        console.log('newsbrief api ' + error);
      });
  };

  function callSlider() {
    if (document.getElementsByClassName('minis_list_1').length) {
      new Glide('.Minis_slider', {
        type: 'carousel',
        dots: '#dots',
        animationTimingFunc: 'linear',
        perView: 3,
        slidesToScroll: 3,
      }).mount();
    }
  }
  return (
    <>
      <div className="home_nw18_minis">
        <div className="minis_headWrap">
          <h2 className="minis_head">
            News18 <span>Minis</span>
          </h2>
          <div className="minis_smalltxt">
            A world of news at your fingertips
          </div>
          <a className="minis_link" href="/minis/">
            SEE MORE
          </a>
        </div>
        <div className="minis_inner">
          <div className="Minis_slider">
            <div data-glide-el="controls">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="arrow_left"
                data-glide-dir="<"
              />
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="arrow_right"
                data-glide-dir=">"
              />
            </div>
            <div className="glide__track" data-glide-el="track">
              <ul className="minis_list_1 glide__slides">
                {newsBriefData != '' && typeof newsBriefData !== 'undefined'
                  ? newsBriefData.map((news, index) => {
                      const imageSrc =
                        typeof news.images !== 'undefined'
                          ? news.images.url
                          : '';
                      const headline =
                        typeof news.headline !== 'undefined'
                          ? news.headline
                          : '';
                      const webUrl =
                        typeof news.url !== 'undefined' ? news.url : '';
                      const intoduction =
                        typeof news.intro !== 'undefined' && news.intro != null
                          ? news.intro
                          : '';
                      // if(intoduction != ''  && intoduction != null && intoduction.length > 340) {
                      //     intoduction = limit_char(intoduction, 340);
                      // }
                      return (
                        <li key={index} className="glide__slide">
                          <div className="imgBox">
                            <a
                              onClick={() => {
                                /*logEvent('News18 Minis', 'Click - Article', webUrl)*/
                              }}
                              href={webUrl}
                            >
                              <img
                                src={imageSrc}
                                alt={headline}
                                title={headline}
                              />
                            </a>
                          </div>
                          <div className="contentBox">
                            <h2 className="heading_1">
                              <a
                                onClick={() => {
                                  /*logEvent('News18 Minis', 'Click - Article', webUrl)*/
                                }}
                                href={webUrl}
                              >
                                {headline}
                              </a>
                            </h2>
                            <div className="fade_line_new">
                              <a
                                onClick={() => {
                                  /*logEvent('News18 Minis', 'Click - Article', webUrl)*/
                                }}
                                href={webUrl}
                              >
                                <p>{ReactHtmlParser(intoduction)}</p>
                              </a>
                            </div>
                          </div>
                          <ul className="ftr_social">
                            <li className="whatsApp">
                              <a
                                onClick={() => {
                                  /*logEvent('News18 Minis', 'Click - Article', 'whatsApp-'+webUrl)*/
                                }}
                                href={
                                  'whatsapp://send?text=' +
                                  headline +
                                  ' - ' +
                                  webUrl
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Whatsapp.svg"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li className="fb">
                              <a
                                onClick={() => {
                                  /*logEvent('News18 Minis', 'Click - Article', 'facebook-'+webUrl)*/
                                }}
                                href={
                                  'https://www.facebook.com/sharer.php?u=' +
                                  webUrl +
                                  '&t=' +
                                  headline
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Facebook.svg"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li className="tw">
                              <a
                                onClick={() => {
                                  /*logEvent('News18 Minis', 'Click - Article', 'twitter-'+webUrl)*/
                                }}
                                href={
                                  'https://twitter.com/share?text=' +
                                  headline +
                                  '&url=' +
                                  webUrl
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Twitter.svg"
                                  alt=""
                                />
                              </a>
                            </li>
                          </ul>
                        </li>
                      );
                    })
                  : ''}
              </ul>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
              {newsBriefData != '' && typeof newsBriefData !== 'undefined'
                ? newsBriefData.map((news, index) => {
                    return (
                      <button
                        className="glide__bullet"
                        data-glide-dir={'=' + index}
                      />
                    );
                  })
                : ''}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .Minis_slider {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        .Minis_slider * {
          box-sizing: inherit;
        }
        .Minis_slider .glide__track {
          overflow: hidden;
          padding-left: 1px;
        }
        .Minis_slider .glide__slides {
          position: relative;
          width: 100%;
          list-style: none;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          touch-action: pan-Y;
          overflow: hidden;
          padding: 0;
          white-space: nowrap;
          display: flex;
          flex-wrap: nowrap;
          will-change: transform;
        }
        .Minis_slider .glide__slides--dragging {
          user-select: none;
        }
        .Minis_slider .glide__slide {
          width: 100%;
          flex-shrink: 0;
          white-space: initial;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
        }
        .Minis_slider .glide__slide a {
          user-select: none;
          -webkit-user-drag: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        .Minis_slider .glide__arrows {
          -webkit-touch-callout: none;
          user-select: none;
        }
        .Minis_slider .glide__bullets {
          -webkit-touch-callout: none;
          user-select: none;
        }
        .Minis_slider .glide--rtl {
          direction: rtl;
        }

        .Minis_slider .glide__bullets {
          align-items: center;
          margin-top: 10px;
          line-height: 10px;
          display: flex;
          justify-content: center;
        }
        .Minis_slider .glide__bullets button:focus {
          outline: none;
        }
        .Minis_slider .glide__bullets button.glide__bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          border: 0;
          background: #c7c7c7;
          padding: 0;
          margin: 0 5px;
        }
        .Minis_slider
          .glide__bullets
          button.glide__bullet.glide__bullet--active {
          background: #e1261d;
          width: 10px;
          height: 10px;
          cursor: pointer;
        }

        .Minis_slider .glide__slide {
          border: 1px solid #e6e6e6;
          border-radius: 10px;
          box-shadow: 0 5px 5px #00000029;
          margin: 5px 0;
        }
        .Minis_slider .arrow_left,
        .arrow_right {
          top: 50%;
          background: #001e44;
          transform: translate(0, -50%);
          width: 24px;
          height: 68px;
        }
        .Minis_slider .arrow_left {
          position: absolute;
          left: -12px;
          z-index: 3;
        }
        .Minis_slider .arrow_right {
          position: absolute;
          right: -12px;
          z-index: 3;
        }
        .Minis_slider .arrow_left:before {
          content: '';
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          width: 12px;
          height: 12px;
          transform: rotate(-45deg);
          position: absolute;
          left: 8px;
          top: 26px;
        }
        .Minis_slider .arrow_right:before {
          content: '';
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          width: 12px;
          height: 12px;
          transform: rotate(132deg);
          position: absolute;
          left: 3px;
          top: 26px;
        }
        .Minis_slider .imgBox {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          overflow: hidden;
        }
        .Minis_slider .imgBox img {
          width: 100%;
          display: block;
        }
        .Minis_slider .contentBox {
          padding: 5px 10px 0 10px;
        }
        .Minis_slider .contentBox .heading_1 {
          font-weight: bold;
          color: #001e44;
          font-size: 16px;
          line-height: 22px;
          margin-bottom: 5px;
        }
        .Minis_slider .contentBox p {
          font-size: 14px;
          color: #6d6d6d;
        }
        .Minis_slider .ftr_social {
          display: flex;
          border-top: 1px solid #e3e3e3;
          padding: 6px 0;
          justify-content: center;
        }
        .Minis_slider .ftr_social li {
          display: flex;
          border-radius: 50%;
          margin-right: 10px;
        }
        .Minis_slider .ftr_social li a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 25px;
        }
        .Minis_slider .ftr_social li img {
          height: 12px;
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
        .Minis_slider .glide__slide {
          position: relative;
          padding-bottom: 43px;
        }
        .Minis_slider .ftr_social {
          position: absolute;
          width: 100%;
          bottom: 0;
        }
        .home_nw18_minis {
          padding: 12px;
          width: 100%;
          overflow: hidden;
          border: 1px solid #e3e3e3;
          background: #f8f8f8;
          border-radius: 10px;
          margin: 12px 0;
        }
        .home_nw18_minis .minis_headWrap {
          display: flex;
          padding: 5px 0 8px;
          margin-bottom: 5px;
          border-bottom: 1px solid #c9c9c9;
        }
        .home_nw18_minis .minis_headWrap .minis_head {
          color: #001e44;
          font-family: 'Segoe Pro Bold';
          font-size: 26px;
          text-transform: uppercase;
          line-height: 26px;
        }
        .home_nw18_minis .minis_headWrap .minis_head span {
          color: #e1261c;
          font-family: 'Segoe Pro Regular';
        }
        .home_nw18_minis .minis_headWrap .minis_smalltxt {
          font-family: 'Segoe Pro Regular';
          text-transform: uppercase;
          color: #b4b4b4;
          font-size: 11px;
          align-self: flex-end;
          line-height: 11px;
          margin-left: 10px;
          margin-right: auto;
        }
        .home_nw18_minis .minis_headWrap .minis_link {
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
        .Minis_slider .contentBox p {
          margin-top: 0;
          position: relative;
        }
        .home_nw18_minis .minis_headWrap {
          padding: 0px 0px 8px;
        }
        .minis_overlay {
          background: -webkit-linear-gradient(
            top,
            transparent,
            transparent,
            #ffffff
          );
          padding: 50px 0 15px 0;
          height: 30px;
          text-align: center;
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          box-sizing: content-box;
        }
        span.minis_fadeInn {
          display: none;
        }
        .Minis_slider .arrow_left,
        .arrow_right {
          width: 22px;
        }
        .Minis_slider .contentBox {
          height: 209px;
          overflow: hidden;
          position: relative;
        }
        .Minis_slider .contentBox:before {
          text-align: center;
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          box-sizing: content-box;
          content: '';
          opacity: 0.7;
          background: #fff;
          width: 100%;
          z-index: 9;
          height: 22px;
        }
        .Minis_slider .glide__slide {
          background: #fff;
        }
      `}</style>
    </>
  );
};

export default newsBriefWidget;
