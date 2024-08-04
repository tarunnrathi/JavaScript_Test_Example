import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import categoryHelper from "includes/category.helper";
import { get_static_img } from "includes/helper";
import ManoranjanBottom from "./manoranjanBottom";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const EntertainmentPage = (props) => {
  useEffect(() => {
    if (props.sliderFlag) {
      new Glide(".section-topslider", {
        autoplay: 4000,
        infinite: true,
        rewind: true,
        perView: 1
      }).mount();
    }
  }, []);
  const manoranjanTopUrlArray = categoryHelper.manoranjanTopUrlArray();

  return (
    <>
      <div className="glbl-insdnav hdr-entertainment">
        <h2 className="insdnav-hd manoranjan-hd">
          <a href="/news/entertainment/">मनोरंजन</a>
        </h2>
        <ul className="insdnav">
          {manoranjanTopUrlArray.map((topNews, key) => (
            <li className="" key={key}>
              <a href={topNews.slug}>{topNews.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="tpnews clearfix">
        {/* swiper slider start */}
        <div className="pgtbox forentertainment section-topslider">
          <div data-glide-el="track">
            <ul>
              {props.initialData.topRecord.map((topNews, key) => (
                <li key={key} className="">
                  <figure>
                    <a href="">
                      <img
                        alt="Image"
                        src={get_static_img(
                          topNews?.images?.url || '',
                          360,
                          288
                        )}
                        className="lazyload"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=360&height=288";
                        }}
                      />
                    </a>
                    <div className="chmpntpnwshd">
                      <a href={topNews.weburl}>
                        <div className="tpall">
                          <span className="tpc">{topNews.subsection ? topNews.subsection[topNews.subsection.length - 1] : topNews.categories[topNews.categories.length - 1]}</span>
                        </div>
                      </a>
                      <h2>
                        <a title="Link" href={topNews.weburl}>
                          {topNews.display_headline}
                        </a>
                      </h2>
                    </div>
                  </figure>
                </li>
              ))}{" "}
            </ul>
          </div>
          <div
            data-glide-el="controls[nav]"
            className="section-topslider-bullets"
          >
            {props.initialData.topRecord.map((topNews, key) => (
              <button data-glide-dir="{key}" key={key} className=""></button>
            ))}
          </div>
        </div>
        {/* swiper slider end */}

        <div className="pwa_add">
          <div className="addinner-box">
            <SiteAd
              slotId={`mobile_atf_320`}
              adUnit={`NW18_HIND_PWA/NW18_HIND_MANORANJAN_PWA/NW18_HIND_MANORANJAN_PWA_AL/NW18_HIND_MANO_AL_PWA_ROS_ATF_320`}
              sizes={[
                [300, 250],
                [336, 280]
              ]}
              width={336}
              height={280}
              lazyload={true}
              style={{ padding: '16px' }}
            />
          </div>
        </div>

        <ul className="listview-story clearfix">
          {props.initialData.bottomRecord.map((topNews, key) => (
            <li className="forpurplebg" key={key}>
              <figure>
                <span className=""></span>
                <a href={topNews.weburl}>
                  <img
                    alt="Image"
                    src={get_static_img(
                      topNews?.images?.url || '',
                      360,
                      288
                    )}
                    className="lazyload"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=360&height=288";
                    }}
                  />
                </a>
              </figure>
              <div className="lstintro">
                <a href={topNews.weburl}>
                  {" "}
                  <div className="tag-tm">
                    {/* <span className="tg fl">{topNews.sub_category ? topNews.sub_category[topNews.sub_category.length - 1] : topNews.category[topNews.category.length - 1]}</span> */}
                    <span className="tpc">{topNews.subsection ? topNews.subsection[topNews.subsection.length - 1] : topNews.categories[topNews.categories.length - 1]}</span>
                  </div>
                </a>
                <h3 className="mvnm">
                  <a href={topNews.weburl}>{topNews.display_headline}</a>
                </h3>
              </div>
            </li>
          ))}
        </ul>

        <a href={`${publicRuntimeConfig.siteUrl}news/entertainment/page-2/`} className="rdmr">
          और भी पढ़ें{" "}
        </a>
      </div>

      {/* end bottom sectoiion */}
      {/* list box */}
      {manoranjanTopUrlArray.map((listNews, key) => (
        listNews.section != 'webstory' ? <ManoranjanBottom initialData={listNews} pageParam={props.pageParam} key={key} /> : "Webstory"
      ))}
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
          height: 280px;
          width: 336px;
          margin: 0 auto;
          text-align: center;
        }
       
      `}</style>
    </>
  );
};

export default EntertainmentPage;
