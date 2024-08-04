import Slider from "react-slick";
import ReactHtmlParser from "html-react-parser";
import { logEvent } from "includes/googleAnalytic";
import { Fragment } from "react";
import ReadMore from "components/Desktop/common/ReadMore";
import getConfig from "next/config";
import LazyLoadImage from "components/Common/CustomImage";

const { publicRuntimeConfig } = getConfig();

const NewsMini = ({ newsMini = [] }) => {
  if (!newsMini.length) {
    return null;
  }

  newsMini = [...newsMini, "Shadow"];
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <>
      <div className="newglblhdwrap miniwrapper">
        <h2 className="newglblhd">NEWS<span>18 </span>MINIS <em> A WORLD OF NEWS AT YOUR FINGERTIPS</em></h2>
        <ReadMore
            link={publicRuntimeConfig.siteUrl+'minis/'}
            label={`और भी पढ़ें`}
        />
      </div>

      <div className="home_nw18_minis">
        <div className="minis_inner">
          <Slider className="Minis_slider" {...settings}>
            {newsMini != "" && typeof newsMini !== "undefined"
              ? newsMini.map((news, index) => {
                  const width = 276;
                  const height = 184;
                  const imageSrc = news?.images?.url;
                  const headline = news.display_headline;
                  const webUrl = news.weburl
                    ? news.weburl.replace("https://hindi.news18.com", "")
                    : "";
                  const introduction = news.intro;

                  return (
                    <Fragment key={index}>
                      {index != 4 && (
                        <div key={index} onClick={() => {
                          logEvent(
                            "News18 Minis",
                            "Click - Home",
                            webUrl
                          );
                          }}>
                          <div className="imgBox">
                            <a
                              href={webUrl}
                            >
                              <figure width={width} height={height}>
                                <LazyLoadImage
                                  src={imageSrc}
                                  width={width}
                                  height={height}
                                  alt={headline}
                                  title={headline}
                                />
                              </figure>
                            </a>
                          </div>
                          <div className="contentBox">
                            <a
                              className="anchor_heading_1"
                              href={webUrl}
                            >
                              <h2 className="heading_1">{headline}</h2>
                            </a>
                            <a
                              href={webUrl}
                            >
                              {
                                introduction && (
                                  <div>
                                    {ReactHtmlParser(
                                      introduction.substring(0, 200)
                                    )}
                                    <span>
                                      पूरा पढ़ें
                                    </span>
                                  </div>
                                )
                              }                              
                            </a>
                          </div>
                        </div>
                      )}

                      {index == 4 && (
                        <div onClick={() => {
                            logEvent(
                              "News18 Minis",
                              "Click - Home",
                              "Last Card - Read More"
                            );
                          }}>
                          <a
                            href="/minis/"
                            className="minishadow"
                          >
                            <div className="minisShadow_inner">
                              <h3 className="shadow_text1">News18 Minis </h3>
                              <h4 className="shadow_text2"> से और पढ़ें</h4>
                            </div>
                          </a>
                          <div className="imgBox">
                            <a target="_blank">
                              <img
                                src=""
                                alt=""
                                title=""
                                width="280px"
                                height="186px"
                              />
                            </a>
                          </div>
                          <div className="contentBox"></div>
                        </div>
                      )}
                    </Fragment>
                  );
                })
              : ""}
          </Slider>
        </div>
      </div>
      <style jsx global>{`
        .Minis_slider a {
          cursor: pointer;
        }
        .Minis_slider button {
          border: none;
        }
        .Minis_slider {
          width: 100%;
        }
        .miniwrapper h2 { width: auto;}
        .Minis_slider.slick-slider {
          position: relative;
          display: block;
          box-sizing: border-box;         
        }
        .Minis_slider .slick-list {
          position: relative;
          display: block;
          overflow: hidden;
          margin: 0px 20px;
          padding: 0;

        }
        .Minis_slider.slick-slider .slick-track,
        .Minis_slider.slick-slider .slick-list {          
          transform: translate3d(0, 0, 0);
        }
        .Minis_slider .slick-track {
          position: relative;
          top: 0;
          left: 0;
          display: flex;
          margin-left: auto;
          margin-right: auto;
        }
        .Minis_slider .slick-track:before,
        .Minis_slider .slick-track:after {
          display: table;
          content: "";
        }
        .Minis_slider .slick-track:after {
          clear: both;
        }
        .Minis_slider .slick-slide {
          width: 281px !important;
        }
        .Minis_slider .slick-slide {
          display: none;
          float: left;
          height: 426px;
          min-height: 1px;
          position: relative;
        }
        .Minis_slider .slick-slide img {
          display: block;
        }
        .Minis_slider.slick-initialized .slick-slide {
          display: block;
        }
        .Minis_slider .slick-slide {
          margin: 0px 5px;
        }
        .Minis_slider .slick-slide img {
          width: 100%;
        }
        .Minis_slider .slick-slide {
          transition: all ease-in-out 0.3s;
          outline: none;
          margin-bottom: 5px;
          margin-top: 5px;
          // padding-bottom: 45px;
          background: #FFFFFF;
          box-shadow: 0px 0px 4px #0000001A;
          border: 1px solid #DBDBDB;
          border-radius: 4px;
          overflow: hidden;          
        }
        .Minis_slider .slick-list:focus {
          outline: none;
        }
        .Minis_slider .slick-list.dragging {
          cursor: pointer;
          cursor: hand;
        }
        .slick-next,
        .slick-next:focus,
        .slick-next:hover,
        .slick-prev,
        .slick-prev:focus,
        .slick-prev:hover {
          color: transparent;
          outline: none;
          background: #001e44;
        }
        .Minis_slider button {
					position: absolute;
					width: 25px;
					height: 32px;
					background: #FF0000;
					left: 0px;
          top: 50%;
					border-radius: 0px 4px 4px 0px;
				  }

          // .Minis_slider button:before, .Minis_slider button:after {
          //   content: "";
          //   position: absolute;
          //   width: 5px;
          //   height: 5px;
          //   border-top: 1px solid #fff;
          //   border-left: 1px solid #fff;
          //   transform: rotate(-45deg);
          //   top: 13px;
				  // }
				  
				  .Minis_slider button:before {           
            left: 13px;
				  }
          .Minis_slider button:after {
            left: 8px;
				  }		
				 
				  .Minis_slider button {
					border: none;
          z-index:1;
          cursor: pointer;
				  }
        .Minis_slider .slick-next {
          right: -14px;
          left: auto;
          color: transparent;
          transform: rotate(180deg);
        }
        .Minis_slider .slick-prev {
          left: -14px;
          color: transparent;
        }
       
        .Minis_slider .slick-dotted.slick-slider {
          margin-bottom: 30px;
        }
        .Minis_slider .slick-dots {
          position: absolute;
          display: block;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
          text-align: center;
        }
        .Minis_slider .slick-dots li {
          position: relative;
          display: inline-block;
          margin: 0;
          padding: 0;
          cursor: pointer;
        }
        .Minis_slider .slick-dots li button {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 20px;
          height: 4px;
          padding: 0;
          cursor: pointer;
          color: transparent;
          border: 0;
          outline: none;
          background: #c7c7c7;
          border-radius: 8px;
        }
        .Minis_slider .slick-dots li button:hover,
        .Minis_slider .slick-dots li button:focus {
          outline: none;
        }
        .Minis_slider .slick-dots li button:hover:before,
        .Minis_slider .slick-dots li button:focus:before {
          opacity: 1;
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
          height: 240px;
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
          content: "";
          opacity: 0.7;
          background: #fff;
          width: 100%;
          z-index: 9;
          height: 22px;
        }
        .Minis_slider .contentBox .anchor_heading_1 .heading_1 {
          font-weight: bold;
          color: #000000;
          font-size: 18px;
          line-height: 26px;
          margin-top: 5px;
          white-space: break-spaces;
          word-break: break-word;
        }
        .Minis_slider .contentBox p, .Minis_slider .contentBox a div {
          font-size: 14px;
          color: #434343;
          line-height: 21px;
          padding: 5px 0 10px;
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
        .Minis_slider .ftr_social {
          position: absolute;
          width: 100%;
          bottom: 0;
        }
        .Minis_slider .slick-dots li.slick-active button {
          background: #e1261d;
          width: 20px;
          height: 4px;
        }

        .home_nw18_minis {
          padding: 15px;
          overflow: hidden;
          background: #F5F5F5;
          padding-bottom: 38px;
        }
        .home_nw18_minis .slick-dots li {
          width: 17px;
          margin-left: 10px;
        }
        .home_nw18_minis .slick-dots li button::before {
          font-size: 7px;
        }
        .Minis_slider .contentBox p {
          position: relative;
        }
        .minis_overlay {
          background: -webkit-linear-gradient(
            top,
            transparent,
            transparent,
            #fff
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
        .Minis_slider .contentBox p a {
          color: #6d6d6d;
        }
        .Minis_slider .glide__slide {
          background: #fff;
        }
        .minishadow {
          background: rgba(0, 0, 0, 0.99);
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 99;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          outline: 0;
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
          line-height: 30px;
          letter-spacing: 5.5px;
        }
        .minishadow .minisShadow_inner .shadow_text2 {
          font-weight: normal;
          font-size: 32px;
          text-transform: uppercase;
          padding-bottom: 10px;
        }
        .Minis_slider .slick-next:active, .Minis_slider .slick-next:hover, .Minis_slider .slick-next:focus, .Minis_slider .slick-prev:active, .Minis_slider .slick-prev:hover, .Minis_slider .slick-prev:focus {
          background: red;
        }        
        .newglblhdwrap{border-bottom: 1px solid #d9d9d9; position: relative; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: baseline;}
        .newglblhdwrap:before{content: ""; background: #ED1C24; width: 25px; height: 4px; position: absolute; left: 0; bottom: 0;}
        .newglblhdwrap .newglblhd, .newglblhdwrap .newglblhd a{font-size: 20px;line-height: 38px; color: #000; font-weight: bold; display: flex;align-items: end;}
        .newglblhdwrap .newglblhd span, .newglblhdwrap .newglblhd a span{color:#ED1C24; margin-right: 5px;}
        .newglblhdwrap .newglblhd em, .newglblhdwrap .newglblhd a em{color: #868686;font-weight: normal;text-transform: uppercase;font-style: normal;font-size: 12px; position: relative; margin-left: 10px; top: 2px;}
        .newglblhdwrap.newsml .newglblhd, .newglblhdwrap.newsml .newglblhd a{font-size: 18px;    line-height: 37px;}
        .moretrndstroy{color: #E82D2E;font-size: 14px;display: block;text-align: center;line-height: 24px;font-weight: bold;}
        .moretrndstroy:after{content: "";background: url(/images/siteimages/newiconsprite_1669351342.svg) -164px 0px no-repeat;width: 11px;height: 11px;display: inline-block;margin-left: 6px;}
        .Minis_slider .contentBox a span, .Minis_slider .contentBox p span {
          color: #EC2027;
          font-weight: bold;
          padding-left: 5px;
        }
        .Minis_slider.slick-initialized .slick-slide:last-child {
          padding-bottom: 45px;
        }

        button.slick-arrow.slick-next:before {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          border-top: 2px solid#fff;
          border-left: 2px solid#fff;
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
          top: 11px;
          left: 35%;
      }
      button.slick-arrow.slick-prev:before {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          border-top: 2px solid#fff;
          border-left: 2px solid#fff;
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
          top: 10px;
          left: 40%;
      }
      .Minis_slider a figure {
        background-color: #dbdbdb;
        font-size: 0;
      }
      `}</style>
    </>
  );
};

export default NewsMini;
