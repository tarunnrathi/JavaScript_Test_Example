import React, { useEffect } from "react";
import categoryHelper from "includes/category.helper";
import { get_static_img } from "includes/helper";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { imageLoader } from "includes/article.util";
import LazyImage from "components/Common/LazyImage";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Glide from "@glidejs/glide";

const SubEntertainmentPage = (props) => {
  const {
    data: {
      topPriorityData: { topRecord = [], bottomRecord = [] },
      _pageParam: { query = "", hi_subCategory },
      sliderFlag = "",
      pageAds,
    },
  } = props;

  const manoranjanTopUrlArray = categoryHelper.manoranjanTopUrlArray();

  useEffect(() => {
    // query_arr && getData();

    if (sliderFlag) {
      new Glide(".section-topslider", {
        autoplay: 4000,
        infinite: true,
        rewind: true,
        perView: 1,
      }).mount();
    }
  }, []);

  return (
    <>
      <div className="glbl-insdnav hdr-entertainment">
        <h2 className="insdnav-hd">
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
              {topRecord.map((topNews, key) => (
                <li key={key} className="">
                  <figure>
                    <a href="">
                      <img
                        alt="Image"
                        src={get_static_img(
                          topNews.thumbnail,
                          360,
                          288
                        )}
                      />
                    </a>
                    <div className="chmpntpnwshd test11">
                      <a href={topNews.url}>
                        <div className="tpall">
                          <span className="tpc">
                            {hi_subCategory ||
                              topNews?.content_type}
                          </span>
                        </div>
                      </a>
                      <h2>
                        <a title="Link" href={topNews.url}>
                          {topNews.display_headline || topNews?.title}
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
            {topRecord.map((topNews, key) => (
              <button data-glide-dir="{key}" className="" key={key}></button>
            ))}
          </div>
        </div>
        {/* swiper slider end */}

        <div className="pwa_add">
          <div className="addinner-box">
            {/* <span id="first">विज्ञापन</span> */}
            <SiteAd
              slotId={"mobile_atf_320"}
              adUnit={pageAds.ATF_320}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={336}
              height={280}
            />
          </div>
        </div>

        <ul className="listview-story clearfix">
          {bottomRecord.map((topNews, key) => (
            <li className="forpurplebg " key={key}>
              <figure>
                <span className=""></span>
                <a href={topNews.url}>
                  <img
                    alt="Image"
                    src={get_static_img(
                      topNews.thumbnail,
                      360,
                      288
                    )}
                  />
                </a>
              </figure>
              <div className="lstintro">
                <a href={topNews.url}>
                  {" "}
                  <div className="tag-tm">
                    <span className="tg fl">
                      {hi_subCategory ||
                        topNews.content_type}
                    </span>
                  </div>
                </a>
                <h3 className="mvnm">
                  <a href={topNews.url}>
                    {topNews.display_headline ||
                      topNews?.title}
                  </a>
                </h3>
              </div>
            </li>
          ))}
        </ul>

        <a href={`${publicRuntimeConfig.siteUrl}${query}page-2/`} className="rdmr">
          और भी पढ़ें{" "}
        </a>
      </div>

      {props.categoryStoriesList && props.categoryStoriesList.length ? (
        <>
          <section className="pdngsxtn clearfix">
            <div className="glblbghd-sts">
              <h2 className="hd">
                {" "}
                <a title="Link" href="/news/entertainment/bollywood/page-2/">
                  {" "}
                  अन्य ख़बरें{" "}
                </a>
              </h2>
            </div>
            <ul className="gridview-story d">
              {props.categoryStoriesList.map((eachNews, key) => {
                return (
                  <>
                    {key > 11 ? (
                      <li key={key}>
                        <a title="Link" href={eachNews.url || ""}>
                          <figure>
                            <div className="tgtm-shr">
                              <span className="tpc fl">
                                {hi_subCategory || eachNews.sub_category[0] ||
                                  eachNews.sub_category ||
                                  "बॉलीवुड"}
                              </span>
                              <span className="tpc fr">17 hours ago</span>
                            </div>
                            <LazyImage
                              width={364}
                              height={288}
                              src={imageLoader(eachNews["thumbnail"], 360, 288)}
                              alt={eachNews["title"] || "Image"}
                              title={eachNews["title"] || "Image"}
                              unoptimized={true}
                              className="lazyload"
                              isRes={true}
                            />
                          </figure>
                        </a>
                        <div className="lstintro">
                          <h2>
                            <a title="Link" href={eachNews.url || ""}>
                              {eachNews.title || ""}
                            </a>
                          </h2>
                        </div>
                      </li>
                    ) : (
                      ""
                    )}

                    {key == 17 || key == 25 ? (
                      <li className="clearfix vsp16 add add-li">
                        <div className="addinner-box">
                          {/* <span id="first">विज्ञापन</span> */}
                          <SiteAd
                            slotId={
                              key == 17
                                ? `mobile_atf_300`
                                : key == 25
                                ? "mobile_btf_300"
                                : ""
                            }
                            adUnit={
                              key == 17
                                ? pageAds.ATF_300
                                : key == 25
                                ? pageAds.BTF_300
                                : ""
                            }
                            sizes={
                              key == 17
                              ? [[300, 250], [336, 280]]
                              : key == 25
                              ? [[300, 250], [336, 280]]
                              : []
                            }
                            width={300}
                            height={280}
                            lazyload={true}
                          />
                          {key == 17 ? <SiteAd
                            slotId="PG_Slider_1x1"
                            adUnit={
                              "NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1"
                            }
                            sizes={[[1, 1]]}
                            renderOutOfThePage={true}
                            removeAdSpan={true}
                            loadonScroll={true}
                          />
                          : null}
                        </div>
                      </li>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </ul>
          </section>
        </>
      ) : (
        ""
      )}
      <style jsx global>{`
        .pdngsxtn {
          padding: 16px;
        }
        .clearfix {
          clear: both;
        }
        .glblbghd-sts {
          border-bottom: 1px solid #001536;
          margin-top: 24px;
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
          text-decoration: none;
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
        .gridview-story li a {
          color: #000;
          z-index: 9999;
        }
        .gridview-story li a figure {
          width: 100%;
          overflow: hidden;
          line-height: 0;
          position: relative;
          float: left;
        }
        .gridview-story li figure {
          width: 100%;
          float: left;
          line-height: 0;
          position: relative;
          margin-bottom: 8px;
        }
        .gridview-story li figure .tgtm-shr {
          top: 0;
          padding: 0;
          background: 0 0;
          display: none !important;
        }
        .tgtm-shr {
          background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), #000);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px 8px 8px;
          cursor: pointer;
          color: #fff;
          height: auto;
          z-index: 9999;
        }
        .gridview-story li .lstintro {
          padding: 0 8px;
          cursor: pointer;
          margin: 0;
          clear: both;
          overflow: hidden;
        }
        .gridview-story li h2 {
          font-size: 16px;
          line-height: 1.45;
          clear: both;
          font-weight: 400;
        }
        .add {
          background: #dbdde3 !important;
        }
        .vsp16 {
          margin-top: 16px;
        }
        .addinner-box {
          //background: #e8e9ed;
          background: #dbdde3;
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: auto;
          padding: 0;
          box-sizing: border-box;
        }
        .addinner-box span {
          color: #797e90;
          font-size: 11px;
          text-align: center;
          padding: 2px 0 0;
          display: block;
          line-height: 16px;
        }
        .gridview-story li.add-li {
          padding: 10px 0;
          width: 100%;
          text-align: center;
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

export default SubEntertainmentPage;
