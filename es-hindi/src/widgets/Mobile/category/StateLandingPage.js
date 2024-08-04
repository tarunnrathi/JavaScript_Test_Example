import React, { useEffect } from "react";
import { imageLoader } from "includes/article.util";
import LazyImage from "components/Common/LazyImage";
import { get_static_img } from "includes/helper";
// import AstroSlide from "./astroSlide";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Glide from "@glidejs/glide";
import categoryHelper from "includes/category.helper";
import StateLandingBottomPage from "./StateLandingBottomPage";
import StateLiveTv from "./StateLiveTv";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const StateLandingPage = (props) => {
  const {
    data: {
      topPriorityData: { topRecord = [], bottomRecord = [] } = {},
      categoryStoriesList = [],
      pageAds,
      currentUrl,
      sliderFlag,
      _pageParam: {
        category = "",
        subCategory = "",
        sub_cat = "",
        get_section = {},
        isStatePage = false,
      } = {}
    } = {}
  } = props;
  const getCategoryTopSliderAndBottomBoxList = subCategory
    ? categoryHelper.getCategoryTopSliderAndBottomBoxList(subCategory)
    : categoryHelper.getCategoryTopSliderAndBottomBoxList(category);

  // console.log('getCategoryTopSliderAndBottomBoxList', getCategoryTopSliderAndBottomBoxList)
  let bottomListing = [],
    topSliderUrl = [];
  if (getCategoryTopSliderAndBottomBoxList != undefined) {
    bottomListing = getCategoryTopSliderAndBottomBoxList.bottomListing;
    topSliderUrl = getCategoryTopSliderAndBottomBoxList.topSliderUrl;
  }

  // console.log( {topSliderUrl})
  // console.log('bottomListing', bottomListing)

  useEffect(() => {
    if (sliderFlag) {
      new Glide(".section-topslider", {
        autoplay: 4000,
        infinite: true,
        rewind: true,
        perView: 1
      }).mount();
    }
  }, []);

  return (
    <>
      {topSliderUrl != undefined && topSliderUrl.length > 0 ? (
        <div className="glbl-insdnav hdr-entertainment">
          <h2 className="insdnav-hd">{get_section.name}</h2>
          <ul className="insdnav">
            {topSliderUrl.map((topNews, key) => (
              <li className="" key={key}>
                <a href={topNews.slug}>{topNews.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="tpnews clearfix">
        {/* swiper slider start */}
        <div className="pgtbox forentertainment section-topslider">
          <div data-glide-el="track">
            <ul>
              {topRecord.map((topNews, key) => (
                <li key={key} className="">
                  <figure>
                    {(topNews?.ff_source == "Hyperlocal" && topNews?.local18_video_s != '') ? <span className="nwvideoicon"></span> : ""}
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
                    <div className="chmpntpnwshd">
                      <a href={topNews.url}>
                        <div className="tpall">
                          <span className="tpc">{topNews.content_type || ''}</span>
                        </div>
                      </a>
                      <h2>
                        <a title="Link" href={topNews.url}>
                          {topNews.display_headline || topNews.title}
                        </a>
                      </h2>
                    </div>
                  </figure>
                </li>
              ))}{" "}
            </ul>
          </div>
          {!sliderFlag ? (
            ""
          ) : (
            <div
              data-glide-el="controls[nav]"
              className="section-topslider-bullets"
            >
              {topRecord.map((topNews, key) => (
                <button data-glide-dir="{key}" className=""></button>
              ))}
            </div>
          )}
        </div>

        <div className="clearfix add cat-top-ad">
          <div className={"addinner-box addinner_box_300x250"}>
            <SiteAd
              slotId={"mobileAdNew300x250_0"}
              adUnit={pageAds.ATF_320}
              sizes={[[300, 250], [336, 280]]}
              width={336}
              height={280}
              lazyload={true}
              style={{ padding: "16px" }}
            />
          </div>
        </div>
        <ul className="listview-story forbluebg st">
          {bottomRecord && bottomRecord.length
            ? bottomRecord.map((eachData, index) => {

              return index < 5 ? (
                <li className="forpurplebg" key={index}>
                  <figure>
                    {eachData["content_type"] == "photogallery" ? (
                      <span className="sprite phticnl"></span>
                    ) : (
                      ""
                    )}
                    {(eachData?.ff_source == "Hyperlocal" && eachData?.local18_video_s != '') ? <span className="nwvideoicon"></span> : ""}
                    <a title={eachData["title"]} href={eachData["url"]}>
                      <LazyImage
                        width={364}
                        height={288}
                        src={imageLoader(eachData["thumbnail"], 360, 288)}
                        alt={eachData["title"] || "Image"}
                        title={eachData["title"] || "Image"}
                        unoptimized={true}
                        className="lazyload"
                        isRes={true}
                      />
                    </a>
                  </figure>
                  <div className="lstintro">
                    <div className="tag-tm">
                      <span className="tg fl">{eachData?.content_type || ''}</span>
                    </div>
                    {/* <h2>{eachData.title || ''}</h2> */}
                    <h2>
                      <a
                        title={eachData["title"] || ""}
                        href={eachData["url"] || ""}
                      >
                        {eachData["display_headline"] || ""}
                      </a>
                    </h2>
                  </div>
                </li>
              ) : (
                ""
              );
            })
            : ""}
        </ul>
        <a
          title="Link"
          href={`${publicRuntimeConfig.siteUrl}news/${category}/page-2/`}
          className="rdmr clkeventga"
          data-evcat="More Stories"
          data-evact="click"
          data-evlbl={currentUrl + "After top stories"}
          data-evval="1"
        >
          और भी {props.data.mainCat == 'photogallery' ? 'देखें' : 'पढ़ें'}{" "}
        </a>
      </div>

      {
        isStatePage ? <>
          <div className="clearfix vsp10">
            <StateLiveTv pageData={props.data._pageParam} />
          </div>
        </> : ""
      }

      {
        isStatePage && (category == "uttarakhand" || category == "himachal-pradesh") ? <>
          <div className="twtrwdgtm">
            <h3><a href={`https://twitter.com/${category == "uttarakhand" ? "news18_uk" : "News18Himachal"}`} target="_blank">Follow<br />us on</a></h3>
            <div>
              {
                category == "uttarakhand" ?
                  <p><a href="https://twitter.com/news18_uk" target="_blank"><span>News18 Uttarakhand </span>@News18_UK</a></p> :
                  <p><a href="https://twitter.com/News18Himachal" target="_blank"><span>News18 Himachal Pradesh </span>@News18Himachal</a></p>
              }
            </div>
          </div>
        </> : ""
      }

      {/* list box */}

      {bottomListing != undefined && bottomListing.length > 0 ? (
        bottomListing.map((listNews, key) => (
          <StateLandingBottomPage
            initialData={listNews}
            pageParam={props.data._pageParam}
            currentUrl={currentUrl}
            pageAds={pageAds}
            numkey={key}
            key={key}
          />
        ))
      ) : category != 'entertainment' && categoryStoriesList && categoryStoriesList.length && !isStatePage ? (
        <>
          <section className="pdngsxtn clearfix">
            <div className="glblbghd-sts">
              <h2 className="hd">
                {" "}
                <a title="Link" href="/news/entertainment/bollywood/page-2/">
                  {" "}
                  अन्य {props.data.mainCat == 'photogallery' ? 'फोटो' : 'ख़बरें'}{" "}
                </a>
              </h2>
            </div>
            <ul className="gridview-story c">
              {categoryStoriesList.map((eachNews, key) => {
                return (
                  <>
                    {
                      key > 5 ?
                        <>
                          <li key={key}>
                            <a title="Link" href={eachNews.url || ""}>
                              <figure>
                                {(eachNews?.ff_source == "Hyperlocal" && eachNews?.local18_video_s != '') ? <span className="nwvideoicon"></span> : ""}
                                <div className="tgtm-shr">
                                  <span className="tpc fl">
                                    {eachNews.sub_category || "बॉलीवुड"}
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

                          {key == 11 || key == 19 ? (
                            <li className="clearfix vsp16 add add-li">
                              <div className="addinner-box">
                                <SiteAd
                                  slotId={
                                    key == 11
                                      ? `mobile_atf_300`
                                      : key == 19
                                        ? "mobile_btf_300"
                                        : ""
                                  }
                                  adUnit={
                                    key == 11
                                      ? pageAds.ATF_300
                                      : key == 19
                                        ? pageAds.BTF_300
                                        : ""
                                  }
                                  sizes={
                                    key == 11
                                      ? [[300, 250], [336, 280]]
                                      : key == 19
                                        ? [[300, 250], [336, 280]]
                                        : []
                                  }
                                  width={300}
                                  height={280}
                                  lazyload={true}
                                />
                                {key == 11 ? <SiteAd
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
                        : ""
                    }
                  </>
                );
              })}
            </ul>
          </section>

        </>
      ) : ("")
      }
      {/* {!isStatePage && category != 'entertainment' ? <AstroSlide /> : ""} */}
      <style global jsx>{`
        .tpnews {
          background: #fff;
          border-top: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
        }
        .clearfix {
          clear: both;
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
        .section-topslider {
          position: relative;
          overflow: hidden;
          background: #000;
        }
        .pgtbox {
          position: relative;
          overflow: hidden;
          clear: both;
        }
        .section-topslider ul {
          display: flex;
        }
        .pgtbox ul li:first-child {
          margin-bottom: 10px;
        }
        .pgtbox ul li {
          position: relative;
          flex-shrink: 0;
          width: 100%;
        }
        li {
          list-style: none;
        }
        .section-topslider ul li figure {
          position: relative;
          width: 100%;
          line-height: 0;
        }
        .pgtbox ul li figure {
          position: relative;
          width: 100%;
          float: left;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        figure img {
          width: 100%;
          float: left;
        }
        .chmpntpnwshd {
          background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), #000);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 16px 28px;
          cursor: pointer;
        }
        .tpall {
          line-height: 22px;
          margin-bottom: 8px;
        }
        .tpall .tpc {
          background: #000;
          margin-right: 16px;
          padding: 0 16px;
          height: 24px;
          line-height: 26px;
          border-radius: 4px;
          font-size: 12px;
          color: #fff;
          display: inline-block;
        }
        .chmpntpnwshd a {
          color: #fff;
          display: block;
        }
        .chmpntpnwshd a h1,
        .chmpntpnwshd a h2,
        .chmpntpnwshd a h3,
        .chmpntpnwshd h1 a,
        .chmpntpnwshd h2 a,
        .chmpntpnwshd h3 a {
          color: #fff;
          font-size: 18px;
          line-height: 26px;
          font-weight: 700;
        }
        .listview-story {
          margin: 16px;
          position: relative;
        }
        li.forpurplebg {
          position: relative;
          padding-bottom: 21px;
        }
        .listview-story li {
          display: flex;
          margin-bottom: 8px;
        }
        .listview-story li figure {
          width: 110px;
          height: 75px;
          overflow: hidden;
          margin-right: 12px;
          line-height: 0;
          flex-shrink: 0;
          position: relative;
        }
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
        .cat-top-ad {
          padding: 15px 0;
          display: flex;
          justify-content: center;
        }

        .twtrwdgtm {
          background: #E6F6FF;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          width: 340px;
          margin: auto;
          align-items: center;
          height: 66px;
          margin-top: 10px;
        }
        .twtrwdgtm h3 {
          font-size: 12px;
          text-transform: uppercase;
          color: #212121;
          font-weight: bold;
          text-align: right;
          line-height: 16px;
          width: 64px;
        }
        .twtrwdgtm div {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/twtrbg_mobile_1638953065.svg) -4px 1px no-repeat;
          width: 275px;
          height: 84px;
          box-sizing: border-box;
          padding-top: 18px;
          display: flex;
          justify-content: center;
          position: relative;
          margin: -4px -2px -7px 0px;
        }
        .twtrwdgtm div::before {
          width: 39px;
          height: 39px;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/twtrlft_1638953088.svg) no-repeat 0 0;
          flex-shrink: 0;
        }
        .twtrwdgtm div::before, .twtrwdgtm div::after {
          content: "";
        }
        .twtrwdgtm div p {
          color: #e8ffff;
          font-size: 14px;
          margin: 0 10px;
          line-height: 16px;
        }
        .twtrwdgtm div p span {
          display: block;
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
        }
        .nwvideoicon {
					width: 45px;
					height: 45px;
					position: absolute;
					top: 50%;
					left: 50%;
					z-index: 1;
					margin: -22px 0 0 -22px;
					cursor: pointer;
					opacity: .7;
					background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
				}
      `}</style>
    </>
  );
};

export default StateLandingPage;
