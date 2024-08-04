import getConfig from 'next/config';
import Slider from 'react-slick';
import ReactHtmlParser from 'html-react-parser';
import { imageLoader } from 'includes/article.util';
import { logEvent } from 'includes/googleAnalytic';
import LazyLoadImage from 'components/Common/LazyLoadImage';
import { Fragment } from 'react';

const { publicRuntimeConfig } = getConfig();

const NewsMini = ({ isAmp = false, News = [] }) => {
  if (!News.length) {
    return null;
  }
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    arrows: false,
  };

  if(News.length) {
    News = [...News, 'Shadow'];
  }

  return (
    <>
      <div className="home_nw18_minis">
        <div className="minis_headWrap">
          <h2 className="minis_head">
            News18 <span>Minis</span>
          </h2>
          <a href={publicRuntimeConfig.siteUrl+'minis/'} className="minis_link">A world of news at your fingertips</a>
        </div>
        {/* <div className="minis_inner"> */}
        <Slider className="Minis_slider" {...settings}>
          {News
            ? News.map((news, index) => {
                const width = 314;
                const height = 240;
                const imageSrc = imageLoader(news?.images?.url, width, height);
                const headline = news.display_headline || news.headline;
                const webUrl = news.weburl
                  ? news.weburl.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl+`${isAmp ? "amp/" : ''}`)
                  : '';
                const introduction = news.intro;

                return (
                  <Fragment key={index}>
                    {index != 4 ? (
                      <div key={`mobileMinis-`+index} className="inner">
                        <div className="imgBox">
                          <a
                            onClick={() => {
                              logEvent('News18 Minis', 'Click - Home', webUrl);
                            }}
                            href={webUrl}
                          >
                            {
                              isAmp ?
                              <figure>
                                <amp-img
                                    src={imageSrc}
                                    alt={headline}
                                    title={headline}
                                    width={width}
                                    height={height}
                                    layout="responsive"
                                ></amp-img>
                              </figure>
                              :
                              <LazyLoadImage
                                src={imageSrc}
                                alt={headline}
                                title={headline}
                                width={width}
                                height={height}
                              />
                            }
                          </a>
                        </div>
                        <div className="contentBox">
                          <h2 className="heading_1">
                            <a
                              onClick={() => {
                                logEvent(
                                  'News18 Minis',
                                  'Click - Home',
                                  webUrl
                                );
                              }}
                              href={webUrl}
                            >
                              {headline}
                            </a>
                          </h2>
                          <div>
                            <a
                              onClick={() => {
                                logEvent(
                                  'News18 Minis',
                                  'Click - Home',
                                  webUrl
                                );
                              }}
                              href={webUrl}
                            >
                              <p>{ReactHtmlParser(introduction ? introduction : '')}</p>
                            </a>
                          </div>
                        </div>
                        <div className="ftr_readfullstory">
                          <a
                            href={webUrl}
                            onClick={() => {
                              logEvent('News18 Minis', 'Click - Home', webUrl);
                            }}
                          >
                            पूरा पढ़ें
                          </a>
                        </div>
                      </div>
                    ) : null}

                    {index == 4 ? (
                      <div className="inner">
                        <a
                          href={publicRuntimeConfig.siteUrl + "minis/"}
                          className="minishadow"
                          onClick={() => {
                            logEvent(
                              'News18 Minis',
                              'Click - Home',
                              'Last Card - Read More'
                            );
                          }}
                        >
                          <div className="minisShadow_inner">
                            <h3 className="shadow_text1">News18 Minis </h3>
                            <h4 className="shadow_text2"> से और पढ़ें</h4>
                          </div>
                        </a>
                        <div className="imgBox">
                          <a href="" target="_blank">
                            <div
                              className="sha"
                            />
                          </a>
                        </div>
                        <div className="contentBox">
                          <h2 className="heading_1">
                            <a href="" target="_blank"></a>
                          </h2>
                          <div>
                            <a href=""></a>
                          </div>
                        </div>
                        <div className="ftr_readfullstory">
                          <a href="">पूरा पढ़ें</a>
                        </div>
                      </div>
                    ) : null}
                  </Fragment>
                );
              })
            : ''}
        </Slider>
        {/* </div> */}
      </div>
      <style jsx global>{`
        .slick-slider{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;-khtml-user-select:none;touch-action:pan-y;-webkit-tap-highlight-color:transparent}.slick-list,.slick-slider{position:relative;display:block}.slick-list{overflow:hidden;margin:0;padding:0}.slick-list:focus{outline:none}.slick-list.dragging{cursor:pointer;cursor:hand}.slick-slider .slick-list,.slick-slider .slick-track{-webkit-transform:translateZ(0);transform:translateZ(0)}.slick-track{position:relative;top:0;left:0;display:block;margin-left:auto;margin-right:auto}.slick-track:after,.slick-track:before{display:table;content:""}.slick-track:after{clear:both}.slick-loading .slick-track{visibility:hidden}.slick-slide{display:none;float:left;height:100%;min-height:1px}[dir=rtl] .slick-slide{float:right}.slick-slide img{display:block}.slick-slide.slick-loading img{display:none}.slick-slide.dragging img{pointer-events:none}.slick-initialized .slick-slide{display:block}.slick-loading .slick-slide{visibility:hidden}.slick-vertical .slick-slide{display:block;height:auto;border:1px solid transparent}.slick-arrow.slick-hidden{display:none}.slick-loading .slick-list{background:#fff url(/_next/static/media/ajax-loader.fb6f3c230cb846e25247dfaa1da94d8f.gif) 50% no-repeat}.slick-next,.slick-prev{font-size:0;line-height:0;position:absolute;top:50%;display:block;width:20px;height:20px;padding:0;-webkit-transform:translateY(-50%);transform:translateY(-50%);cursor:pointer;border:none}.slick-next,.slick-next:focus,.slick-next:hover,.slick-prev,.slick-prev:focus,.slick-prev:hover{color:transparent;outline:none;background:transparent}.slick-next:focus:before,.slick-next:hover:before,.slick-prev:focus:before,.slick-prev:hover:before{opacity:1}.slick-next.slick-disabled:before,.slick-prev.slick-disabled:before{opacity:.25}.slick-next:before,.slick-prev:before{font-family:slick;font-size:20px;line-height:1;opacity:.75;color:#fff;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.slick-prev{left:-25px}[dir=rtl] .slick-prev{right:-25px;left:auto}.slick-prev:before{content:"←"}[dir=rtl] .slick-prev:before{content:"→"}.slick-next{right:-25px}[dir=rtl] .slick-next{right:auto;left:-25px}.slick-next:before{content:"→"}[dir=rtl] .slick-next:before{content:"←"}.slick-dotted.slick-slider{margin-bottom:30px}.slick-dots{position:absolute;bottom:-25px;display:block;width:100%;padding:0;margin:0;list-style:none;text-align:center}.slick-dots li{position:relative;display:inline-block;margin:0 5px;padding:0}.slick-dots li,.slick-dots li button{width:20px;height:20px;cursor:pointer}.slick-dots li button{font-size:0;line-height:0;display:block;padding:5px;color:transparent;border:0;outline:none;background:transparent}.slick-dots li button:focus,.slick-dots li button:hover{outline:none}.slick-dots li button:focus:before,.slick-dots li button:hover:before{opacity:1}.slick-dots li button:before{font-family:slick;font-size:6px;line-height:20px;position:absolute;top:0;left:0;width:20px;height:20px;content:"•";text-align:center;opacity:.25;color:#000;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.slick-dots li.slick-active button:before{opacity:.75;color:#000}
        
        .home_nw18_minis {
          background: #f8f8f8;
          border-top: 1px solid #e3e3e3;
          // border-bottom: 4px solid #001e44;
          ${isAmp ? `margin-bottom: 30px; padding: 12px 0 4px; font-family: Khand;` : `margin-bottom: 20px; padding: 12px 0;`}
        }
        .home_nw18_minis .minis_headWrap {
          display: flex;
          justify-content: space-between;
          padding: 0 0 8px;
          margin: 0 10px;
          margin-bottom: 5px;
          border-bottom: 1px solid #c9c9c9;
        }
        .home_nw18_minis .minis_headWrap .minis_head {
          display: flex;
          margin-right: 10px;
        }
        .home_nw18_minis .minis_headWrap .minis_head {
          color: #001e44;
          // ${isAmp ? '' : 'font-family: "Times";'}
          font-size: 26px;
          text-transform: uppercase;
          line-height: 26px;
          font-weight: 700;
        }
        .home_nw18_minis .minis_headWrap .minis_head span {
          color: #e1261c;
          // ${isAmp ? '' : 'font-family: "Times";'}
          margin-left: 5px;
        }
        .home_nw18_minis .minis_headWrap .minis_link {
          ${isAmp ? 'font-family: Mukta,sans-serif;' : ''}
          text-align: right;
        }
        .Minis_slider .slick-slide {
          margin-bottom: 10px;
        }
        .home_nw18_minis .minis_headWrap .minis_link {
          // ${!isAmp ? 'font-family: "Times";' : ''}
          text-transform: uppercase;
          color: #b4b4b4;
          font-size: 11px;
          align-self: flex-end;
          line-height: 11px;
          padding: 2px 18px 2px 0;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/arrow-right.png);
          background-size: 12px;
          background-repeat: no-repeat;
          background-position: center right;
        }
        ${!isAmp ? '.slick-list {margin-bottom: 20px;}': ''}
        .Minis_slider.slick-slider {
          position: relative;
          display: block;
          box-sizing: border-box;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -khtml-user-select: none;
          -ms-touch-action: pan-y;
          touch-action: pan-y;
          -webkit-tap-highlight-color: transparent;
        }
        .Minis_slider {
          width: 100%;
        }
        .Minis_slider.slick-initialized .slick-slide {
          display: block;
        }
        .Minis_slider .slick-slide > div {
          transition: all ease-in-out 0.3s;
          outline: none;
          border: 1px solid #e6e6e6;
          ${isAmp ? `box-shadow: 3px 3px 0px rgba(0,0,0,5%); padding-bottom: 32px; background: #fff;` : `border-radius: 10px; box-shadow: 0 5px 5px #00000029; padding-bottom: 45px;`}
          margin-bottom: 5px;
          margin-top: 5px;
          overflow: hidden;
        }
        .Minis_slider .slick-slide > div {
          margin: ${isAmp ? '0px 10px 0 0' : '0px 5px'};
        }
        .Minis_slider .slick-slide {
          display: none;
          float: left;
          height: 100%;
          min-height: 1px;
          position: relative;
        }
        ${isAmp ? '' : '.Minis_slider .imgBox {border-top-left-radius: 5px; border-top-right-radius: 5px; overflow: hidden;}'}
        .Minis_slider .contentBox {
          padding: 5px 10px 0 10px;
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
        .Minis_slider .contentBox .heading_1 {
          font-weight: bold;
          color: #001e44;
          font-size: 16px;
          line-height: 22px;
          margin-bottom: 5px;
        }
        .Minis_slider .contentBox p {
          ${isAmp ? 'font-size: 15px; line-height: 21px; font-family: Mukta,sans-serif; margin: 0;' : 'font-size: 14px;'}
          color: #6d6d6d;
          position: relative;
          font-family: Mukta,sans-serif;
          margin: 0;
        }
        .ftr_readfullstory {
          position: absolute;
          width: 100%;
          bottom: 5px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
          ${isAmp ? ' padding-right: 23px;' : 'border-top: 1px solid #e3e3e3;'}
        }
        .ftr_readfullstory a {
          background: red;
          padding: 2px 10px;
          display: block;
          border-radius: 21px;
          font-size: 12px;
          text-transform: uppercase;
          color: #fff;
          ${!isAmp ? 'font-family: "Fira Sans";' : 'font-weight: bold;'}
        }
        .minishadow {
          background: rgba(0, 0, 0, 0.99);
          position: absolute;
          width: 97%;
          height: 100%;
          z-index: 99;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .Minis_slider .imgBox {
          ${!isAmp ? 'border-top-left-radius: 5px; border-top-right-radius: 5px;' : ''}
          overflow: hidden;
        }
        .minishadow .minisShadow_inner {
          color: #fff;
          text-align: center;
          border-top: 4px solid #fff;
          border-bottom: 4px solid #fff;
          padding: 5px 0;
        }
        .minishadow .minisShadow_inner .shadow_text1 {
          font-weight: normal;
          font-size: 18px;
          text-transform: uppercase;
          ${!isAmp ? 'font-family: "Fira Sans";' : ''}
          line-height: 30px;
          letter-spacing: 5.5px;
        }
        .minishadow .minisShadow_inner .shadow_text2 {
          font-weight: normal;
          font-size: 32px;
          text-transform: uppercase;
          ${!isAmp ? 'font-family: "Fira Sans";' : ''}
          padding-bottom: 10px;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #e1261d;
          width: 10px;
          height: 10px;
          font-size: 14px;
          top: 1px;
          left: 2px;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #e1261d;
          height: 10px;
          font-size: 13px;
          top: 1px;
          left: 2px;
        }
        .slick-dots li:last-child button:hover:before,
        .slick-dots li:last-child button:focus:before {
          opacity: 1;
          color: #e1261d;
          height: 10px;
          font-size: 13px;
          top: 1px;
          left: 2px;
        }
        .slick-dots li {
          margin: 0;
        }
        .Minis_slider .slick-list { ${isAmp ? 'overflow: scroll; width: 100%;' : '' }}
        .sha {
          width:  360px;
          height: ${isAmp ? '214px' : '240px'};
        }
      `}</style>
    </>
  );
};

export default NewsMini;
