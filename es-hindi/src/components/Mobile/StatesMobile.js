import React, { useEffect } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Glide from "@glidejs/glide";
import { get_static_img } from "includes/helper";
import LazyImage from "components/Common/LazyImage";
import Pagination from "widgets/Common/Desktop/Pagination";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const StatesMobile = (props) => {
  const pageNameSlug =
    props?.data?._pageParam?.page == "lifestyle"
      ? "lifestyle/"
      : props?.data?._pageParam?.page == "world"
      ? "world/"
      : "";

  useEffect(() => {
    if (
      props.data?.sliderFlag &&
      props.data.topPriorityData &&
      props.data.topPriorityData.leftCat
    ) {
      new Glide(".section-topslider", {
        autoplay: 4000,
        infinite: true,
        rewind: true,
        perView: 1,
      }).mount();
    }
  }, []);

  const selectIndividualState = (e) => {
    const eachState = e?.target?.parentNode;
    if (eachState) {
      eachState.classList.toggle("adclschsstct-frstinsdlft");
    }
    const selectStateBtn = document.querySelector(".allcities-forstatesection");
    if (selectStateBtn) {
      selectStateBtn.classList.toggle("adclsallcities-forstatesection");
    }
  };

  const closeIndividualState = (e) => {
    const state = e?.target?.parentNode?.parentNode;
    if (state) {
      state.classList.toggle("adclschsstct-frstinsdlft");
    }
    const selectStateBtn = document.querySelector(".allcities-forstatesection");
    if (selectStateBtn) {
      selectStateBtn.classList.toggle("adclsallcities-forstatesection");
    }
  };

  const selectState = () => {
    const selectStateBtn = document.querySelector(".chsstct-frstinsdrgt");
    if (selectStateBtn) {
      selectStateBtn.click();
    }
  };

  const leftCats =
    props.data.topPriorityData &&
    props.data.topPriorityData.leftCat &&
    props.data.topPriorityData.leftCat.filter((cat) => cat != null);

  return (
    <>
      <section className="clearfix wrapper">
        <BreadcrumbCommon breadCrumbArray={props.data.breadCrumbArray} /> 

        <div dangerouslySetInnerHTML={{ __html: props.data.titleDiv }}></div>
        <div className="clearfix vsp10"></div>

        {props.data._pageParam.page == "states" ? (
          ""
        ) : (
          <div className="glbl-insdnav hdr-entertainment">
            <h2 className="insdnav-hd">
              {props.data._pageParam.page == "world" ? "दुनिया" : "लाइफ"}
            </h2>
            <ul className="insdnav">
              {props.data.categoryStoriesList.map((topNews, key) =>
                topNews == null ? (
                  ""
                ) : (
                  <li className="" key={key}>
                    {/* <a href={"/news/" +props.data._pageParam.page +"/" +topNews?.slug + '/'}>{topNews?.label}</a> */}
                    <a
                      href={`/news/${topNews.slug}`}
                    >
                      {topNews?.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* {props.data._pageParam.page == "states" ? (
          <div className="chsstctstrip">
            <div className="chsstct-frstinsdlft">
              <a
                onClick={(e) => selectIndividualState(e)}
                className="chsstct-forstatepage-inside-city"
                id="seher_chune_0"
              >
                राज्य
              </a>
              <div className="allcities-forstatesection">
                <div>
                  <ul>
                    <li>
                      <a href="/news/delhi-ncr/">दिल्ली-एनसीआर</a>
                    </li>
                    <li>
                      <a href="/news/uttar-pradesh/">उत्तर प्रदेश</a>
                    </li>
                    <li>
                      <a href="/news/bihar/">बिहार</a>
                    </li>
                    <li>
                      <a href="/news/madhya-pradesh/">मध्य प्रदेश</a>
                    </li>
                    <li>
                      <a href="/news/rajasthan/">राजस्थान</a>
                    </li>
                    <li>
                      <a href="/news/uttarakhand/">उत्तराखंड</a>
                    </li>
                    <li>
                      <a href="/news/haryana/">हरियाणा</a>
                    </li>
                    <li>
                      <a href="/news/jharkhand/">झारखंड</a>
                    </li>
                    <li>
                      <a href="/news/chhattisgarh/">छत्तीसगढ़</a>
                    </li>
                    <li>
                      <a href="/news/himachal-pradesh/">हिमाचल प्रदेश</a>
                    </li>
                    <li>
                      <a href="/news/maharashtra/">महाराष्ट्र</a>
                    </li>
                    <li>
                      <a href="/news/punjab/">पंजाब</a>
                    </li>
                  </ul>
                </div>
                <div
                  className="allcities-close"
                  onClick={(e) => closeIndividualState(e)}
                >
                  <span>Close</span>
                </div>
              </div>
            </div>

            <a
              href="javascript:void(0)"
              onClick={selectState}
              className="chsstct-frstinsdrgt"
            >
              राज्य/शहर चुनें
            </a>
          </div>
        ) : (
          ""
        )} */}
        <div className="tpnews clearfix">
          {/* swiper slider start */}
          {leftCats && leftCats.length ? (
            <div className="pgtbox forentertainment section-topslider">
              <div data-glide-el="track">
                <ul>
                  {leftCats.map((topNews, key) => {
                  const { images, display_headline, weburl, intro, post_type } = topNews.article_details || topNews || {};

                    return (<li key={key} className="">
                      <figure>
                        <a href={weburl}>
                          <img
                            alt="Image"
                            src={get_static_img(images?.url, 360, 288)}
                          />
                        </a>
                        <div className="chmpntpnwshd">
                          <a href={weburl}>
                            <div className="tpall">
                              <span className="tpc">
                                {post_type}
                              </span>
                            </div>
                          </a>
                          <h2>
                            <a title="Link" href={weburl}>
                              {display_headline}
                            </a>
                          </h2>
                        </div>
                      </figure>
                    </li>)
                  })}{" "}
                </ul>
              </div>
              <div
                data-glide-el="controls[nav]"
                className="section-topslider-bullets"
              >
                {leftCats.map((topNews, key) => (
                  <button
                    data-glide-dir="{key}"
                    className=""
                    key={key}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {/* swiper slider end */}
          <div className="clearfix add cat-top-ad">
            <div className="addinner-box">
              {/* <span id="first">Advertisement</span> */}
              <SiteAd
                slotId={`mobile_atf_320`}
                adUnit={props.data.pageAds.header_ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                width={336}
                height={280}
                style={{ padding: "16px" }}
              />
            </div>
          </div>
          <div className="vsp16 clearfix"></div>
          {props.data.topPriorityData && props.data.topPriorityData.rightCat ? (
            <ul className="gridview-story fordarkgreenbg">
              {props.data.topPriorityData.rightCat.map((topNews, key) => {
                const { images, display_headline, weburl, intro, post_type } = topNews.article_details || topNews || {};
                
                return(  <li>
                    <figure>
                      <a href={weburl}>
                        <LazyImage
                          src={get_static_img(images?.url, 300, 200)}
                          alt={display_headline || ""}
                          title={display_headline || ""}
                          width={155}
                          height={104}
                        />
                      </a>
                    </figure>
                    <div className="lstintro">
                      <div className="tag-tm">
                        {/* <span className="tg fl">जयपुर</span> */}
                      </div>
                      <h2>
                        <a href={weburl}>{display_headline}</a>
                      </h2>
                    </div>
                  </li>)}
                
              )}
            </ul>
          ) : (
            ""
          )}
          {/* <a
                href={
                  "/news/" +
                  props.data._pageParam.page +
                  "/page-2/"
                }
                className="glblbghd-sts-mrnav"
              >
                और भी पढ़ें...
              </a> */}
        </div>
      </section>

      {/* swiper slider end */}

      <section className="pdngsxtn clearfix">
        {props.data.categoryStoriesList.length > 0
          ? props.data.categoryStoriesList.map((topNews, key) =>
              topNews < 1 ? (
                ""
              ) : (
                <>
                  {topNews?.result.length > 0 && (
                    <div>
                      <div className="glblbghd-sts">
                        <h2 className="hd">{topNews?.label}</h2>
                        <a
                          href={`/news/${topNews.slug}/`}
                          className="glblbghd-sts-mrnav"
                        >
                          {" "}
                          और भी पढ़ें...
                        </a>
                      </div>
                      <div className="pgtbox vsp16">
                        <ul>
                          {topNews?.result.map((temp, key) =>
                          {  
                            const { images, display_headline, weburl, intro, post_type } = temp.article_details || temp || {};
                            
                            return temp == null ? (
                              ""
                            ) : key == 0 ? (
                              <li>
                                <figure>
                                  <a href={weburl}>
                                    <LazyImage
                                      src={get_static_img(
                                        images?.url,
                                        300,
                                        200
                                      )}
                                      alt={display_headline || ""}
                                      title={display_headline || ""}
                                      width={360}
                                      height={220}
                                    />
                                  </a>
                                  <div className="chmpntpnwshd">
                                    <div className="tpall">
                                      {/* <span className="tpc">
                                        {display_headline}
                                      </span> */}
                                    </div>
                                    <h1>
                                      <a href={weburl || ""}>
                                        {display_headline}
                                      </a>
                                    </h1>
                                  </div>
                                </figure>
                              </li>
                            ) : (
                              ""
                            )
                          })}
                        </ul>
                      </div>
                      <ul className="listview-story forinsd clearfix">
                        {topNews?.result.map((temp, key) =>{
                        const { images, display_headline, weburl, intro, post_type } = temp.article_details || temp || {};

                         return temp == null ? (
                            ""
                          ) : key == 0 ? (
                            ""
                          ) : (
                            <li>
                              <figure>
                                <a href={weburl}>
                                  <LazyImage
                                    src={get_static_img(
                                      images?.url,
                                      300,
                                      200
                                    )}
                                    alt={display_headline || ""}
                                    title={display_headline || ""}
                                    width={120}
                                    height={82}
                                  />
                                </a>
                              </figure>
                              <div className="lstintro">
                                <a href={weburl}>
                                  
                                  <h2>{display_headline}</h2>
                                </a>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                  {key == 0 || key == 2 ? (
                    <li className="clearfix vsp16 add add-li">
                      <div className="addinner-box">
                        <SiteAd
                          slotId={
                            key == 0
                              ? `mobile_atf_300`
                              : key == 2
                              ? "mobile_btf_300"
                              : ""
                          }
                          adUnit={
                            key == 0
                              ? props.data.pageAds.ATF_300
                              : key == 2
                              ? props.data.pageAds.BTF_300
                              : ""
                          }
                          sizes={
                            key == 0
                              ? [
                                  [300, 250],
                                  [336, 280],
                                ]
                              : key == 2
                              ? [
                                  [300, 250],
                                  [336, 280],
                                ]
                              : []
                          }
                          width={300}
                          height={250}
                          lazyload={true}
                        />
                      </div>
                    </li>
                  ) : (
                    ""
                  )}
                </>
              )
            )
          : ""}

      </section>
      <style jsx global>{`
        // header, .top_links_cont, .wrapper {
        //   font-family: "Mukta",sans-serif;
        // }

        // .top_links_cont a {
        //   padding: 3px 15px 0px 15px;
        // }

        .top-news-title h1,
        .top-news-title h2 {
          font-size: 26px;
          line-height: 32px;
          color: #001d42;
          font-weight: bold;
          margin: 10px 0px 5px 0px;
          border-bottom: 1px solid #eee;
          padding: 0 15px 5px 15px;
        }
        .top_links_cont_child {
          height: 34px;
          line-height: 34px;
          font-size: 16px;
        }

        header,
        .top_links_cont,
        .wrapper {
          font-family: "Mukta", sans-serif;
        }
        .top_links_cont_child {
          height: 34px;
          line-height: 34px;
          font-size: 16px;
        }
        ul.pagination {
          display: flex;
          clear: both;
        }
        .h1_brdcrumb {
          text-align: left;
          display: inline;
          font-size: inherit;
          color: #757575;
        }
        .top_links_cont a {
          padding: 3px 15px 0px 15px;
        }
        .brdcrm {
          padding: 10px 16px;
          font-size: 15px;
        }
        .brdcrm a {
          padding: 0 5px;
        }
        .brdcrm a:first-child {
          padding: 0 5px 0 0;
        }

        .brdcrm {
          padding: 10px 16px;
          font-size: 15px;
        }
        .brdcrm {
          padding: 4px 16px;
          color: #000;
          font-size: 14px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          background-position: #fff;
          font-weight: 700;
        }
        .brdcrm a:first-child {
          padding: 0 5px 0 0;
        }
        .brdcrm a {
          padding: 0 5px;
        }
        .brdcrm a {
          color: #757575;
          font-weight: 400;
        }
        .brdcrm h1 {
          display: inline-block;
          font-size: 14px;
          font-weight: 400;
        }
        .pdngsxtn {
          padding: 16px;
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
        .glblbghd-sts .glblbghd-sts-mrnav {
          position: absolute;
          height: 26px;
          line-height: 26px;
          padding: 0 14px;
          border-radius: 5px;
          background: #fff;
          font-size: 11px;
          color: #828282;
          border: 1px solid #828282;
          width: 97px;
          margin: 0;
          top: -5px;
          right: 0;
        }
        .glblbghd-sts a {
          color: #001536;
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
        .vsp16 {
          margin-top: 16px;
        }
        .h1_brdcrumb {
          text-align: left;
          display: inline;
          font-size: inherit;
          color: #757575;
        }
        .brdcrm {
          padding: 4px 16px;
          color: #000;
          font-size: 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          background-position: #fff;
          font-weight: 700;
        }
        .brdcrm a {
          color: #757575;
          font-weight: 400;
        }
        .add,
        .add2 {
          background: #dbdde3;
          position: relative;
          padding: 16px 0;
          line-height: 0;
          text-align: center;
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
        .lg-mbl {
          margin-top: 7px;
        }
        .dflx {
          display: flex;
        }
        .jstcntspcbtwn {
          justify-content: space-between;
        }
        .flxwrp {
          flex-wrap: wrap;
        }
        .alignitemcenter {
          align-items: center;
        }
        .container {
          padding: 0 10px;
          position: relative;
        }
        img {
          max-width: 100%;
        }
        // ::-webkit-scrollbar {
        //   width: 0;
        //   background: 0 0;
        // }
        .vsp5 {
          margin-top: 5px;
        }
        .vsp10 {
          margin-top: 10px;
        }
        .vsp15 {
          margin-top: 15px;
        }
        .vsp20 {
          margin-top: 20px;
        }
        .vsp30 {
          margin-top: 30px;
        }
        .vsp40 {
          margin-top: 40px;
        }
        .ty-one {
          position: relative;
          top: -2px;
        }
        .add,
        .add2 {
          z-index: 1;
        }
        // div.addinner_box_300x250 {
        //   height: 250px;
        //   width: 300px;
        // }
        div.addinner_box_320x50 {
          height: 68px;
          width: 320px;
        }
        div.addinner_box_300x100 {
          height: 118px;
          width: 300px;
        }

        .chsstctstrip {
          display: flex;
          justify-content: space-between;
          margin: 2px 10px 0 10px;
        }
        .chsstct-frstinsdlft {
          color: #606060;
          font-weight: bold;
          font-size: 14px;
          height: 34px;
          line-height: 34px;
          padding: 0 28px 0 14px;
          box-sizing: border-box;
          position: relative;
          border-bottom: 3px solid #ee1c25;
          cursor: pointer;
          border-radius: 8px 8px 0 0;
        }
        .chsstct-frstinsdrgt {
          color: #c6080f;
          font-weight: bold;
          font-size: 14px;
          height: 34px;
          line-height: 34px;
          padding: 0 35px 0 8px;
          box-sizing: border-box;
          background: #fff
            url(/images/siteimages/pinicon_1607493634.png)
            92% 50% no-repeat;
        }
        .allcities-forstatesection {
          position: absolute;
          background: #f2f2f2;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 0px 0px 8px 8px;
          top: 31px;
          z-index: 1;
          width: 135px;
          box-sizing: border-box;
          padding: 0 12px;
          left: 0;
          transform: scale(0);
          transition: all 0.5s ease-in-out;
        }
        .chsstct-frstinsdlft:after {
          content: "";
          position: absolute;
          border-bottom: 1px solid #ee1c25;
          border-right: 1px solid #ee1c25;
          width: 7px;
          height: 7px;
          top: 11px;
          right: 14px;
          transform: rotate(45deg);
        }
        .allcities-forstatesection > div {
          height: 200px;
          overflow: hidden;
        }
        .allcities-forstatesection > div {
          height: 200px;
          overflow: hidden;
        }
        .allcities-forstatesection > div ul {
          height: 200px;
          overflow: auto;
          width: 109%;
        }
        .allcities-forstatesection > div ul li a {
          display: block;
          color: #333333;
          font-size: 13px;
          padding: 6px 10px;
          border-bottom: 1px dotted #ccc;
          font-weight: normal;
        }
        .allcities-close {
          position: relative;
          background: #c6080f;
          border-radius: 0 0 8px 8px;
          height: 36px !important;
          margin: 0 -15px;
          line-height: 36px;
          color: #fff;
          font-size: 15px;
          padding-left: 30px;
          cursor: pointer;
        }
        .chsstct-frstinsdlft.adclschsstct-frstinsdlft:after {
          transform: rotate(-135deg);
          top: 15px;
        }
        .allcities-close:before {
          transform: rotate(45deg);
        }
        .allcities-close:before,
        .allcities-close:after {
          content: "";
          width: 2px;
          height: 16px;
          background: #fff;
          position: absolute;
          top: 9px;
          right: 18px;
        }
        .allcities-close:after {
          transform: rotate(-45deg);
        }
        .allcities-close span {
          position: relative;
        }
        .allcities-close span:before {
          content: "";
          width: 8px;
          height: 8px;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          position: absolute;
          transform: rotate(-45deg);
          top: 4px;
          left: -15px;
        }
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
        /* slider image start css*/

        .pgtbox {
          position: relative;
          overflow: hidden;
          clear: both;
          height: 220px;
        }

        .section-topslider {
          position: relative;
          overflow: hidden;
          background: #000;
          height: 260px;
        }

        .section-topslider ul {
          display: flex;
          height: 240px;
        }

        .section-topslider {
          position: relative;
          overflow: hidden;
          background: #000;
        }
        .section-topslider ul {
          display: flex;
        }
        .section-topslider ul li figure {
          position: relative;
          width: 100%;
          line-height: 0;
          min-width: 360px;
        }
        .section-topslider ul li figure img {
          width: 100%;
          height: 240px;
        }

        .section-topslider-bullets {
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          z-index: 2;
        }
        .section-topslider-bullets button {
          width: 8px;
          height: 8px;
          background: #7e8186;
          border-radius: 50%;
          margin: 0 8px 0 0;
          padding: 0;
          outline: 0;
          border: none;
          display: inline-block;
          cursor: pointer;
        }
        .section-topslider-bullets button.glide__bullet--active {
          background: #fff;
        }
        .section-topslider.forentertainment
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #a6214d;
        }
        .section-topslider.forbusiness
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #2163a6;
        }
        .section-topslider.forstates
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #a64d21;
        }

        .pgtbox ul li:first-child {
          margin-bottom: 10px;
          height: 220px;
          overflow: hidden;
        }
        .pgtbox ul li figure {
          position: relative;
          width: 100%;
          float: left;
          margin: 0;
          padding: 0;
          overflow: hidden;
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
        .listview-story.forinsd {
          margin: 16px 0 32px;
        }
        .listview-story.forinsd {
          margin-bottom: 16px !important;
        }
        .listview-story {
          margin: 16px;
          position: relative;
        }
        .listview-story.forinsd li {
          padding-bottom: 0;
          height: auto;
          display: flex;
        }
        .listview-story.forinsd li {
          box-shadow: 0 0 3px #c5c5c5;
        }
        .listview-story li {
          display: flex;
          margin-bottom: 8px;
        }
        .listview-story li figure {
          width: 120px;
          height: 82px;
          position: relative !important;
          flex-shrink: 0;
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
        .listview-story li figure img {
          height: 82px;
          width: 100%;
        }
        .listview-story li .lstintro {
          margin: 3px 16px 0 0;
        }
        .listview-story.forinsd li .lstintro h2,
        .listview-story.forinsd li .lstintro h3 {
          font-size: 14px;
          line-height: 18px;
          height: 54px;
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

        .section-topslider ul li figure {
          position: relative;
          width: 100%;
          line-height: 0;
          height: 240px;
        }
        .pgtbox ul li figure img {
          width: 100%;
          float: left;
        }
        .add {
          background: #dbdde3 !important;
        }
        .add,
        .add2 {
          z-index: 1;
          background: #dbdde3;
          position: relative;
          padding: 16px 0;
          line-height: 0;
          text-align: center;
        }
        /* slider image end css*/

        .gridview-story.fordarkgreenbg {
          border: none;
          margin: 0 16px;
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
          min-height: 250px;
        }
        li {
          list-style: none;
        }
        .gridview-story li figure {
          width: 100%;
          float: left;
          line-height: 0;
          position: relative;
          margin-bottom: 8px;
        }
        .gridview-story li .lstintro {
          padding: 0 8px;
          cursor: pointer;
          margin: 0;
          clear: both;
          overflow: hidden;
        }

        .gridview-story li a {
          color: #000;
          z-index: 9999;
        }
        a img {
          border: none;
        }

        .gridview-story li h2 {
          font-size: 16px;
          line-height: 1.45;
          clear: both;
          font-weight: 400;
        }

        /* start slider */
        .wrapper {
          margin-bottom: 40px;
          font-family: "Mukta", sans-serif;
        }
        .glbl-insdnav,
        .tabnav {
          justify-content: flex-start;
        }
        .glbl-insdnav {
          position: relative;
          clear: both;
          height: 38px;
          overflow: hidden;
        }
        .glbl-insdnav.hdr-entertainment .insdnav-hd {
          background: #a6214d;
        }
        .glbl-insdnav.hdr-lifestyle .insdnav-hd {
          background: #a621a6;
        }
        .glbl-insdnav.hdr-photos .insdnav-hd {
          background: #828282;
        }
        .glbl-insdnav.hdr-states .insdnav-hd {
          background: #a64d21;
        }
        .glbl-insdnav.hdr-videos .insdnav-hd {
          background: #a62121;
        }
        .glbl-insdnav.hdr-sports .insdnav-hd {
          background: #37a621;
        }
        .glbl-insdnav .insdnav-hd {
          height: 38px;
          line-height: 38px;
          display: block;
          padding: 0 16px;
          margin-right: 16px;
          font-size: 12px;
          color: #fff;
          font-weight: 700;
          float: left;
          position: relative;
        }
        .glbl-insdnav .insdnav-hd a {
          color: #fff;
        }
        .glbl-insdnav.hdr-business .insdnav-hd {
          background: #2163a6;
        }
        .glbl-insdnav .insdnav {
          overflow: scroll;
          display: flex;
          justify-content: flex-start;
        }
        .glbl-insdnav .insdnav li {
          flex-shrink: 0;
        }
        .glbl-insdnav .insdnav li a {
          height: 36px;
          line-height: 35px;
          display: block;
          padding: 0 4px;
          margin: 0 4px;
          font-size: 14px;
          color: #757575;
        }
        img {
          max-width: 100%;
        }
        .listview-story li .lstintro h2,
        .listview-story li .lstintro h3 {
          font-size: 16px;
          line-height: 1.45;
          // height: 45px;
          overflow: hidden;
          font-weight: 400;
          display: block;
          margin-top: 2px;
        }

        .chsstct-frstinsdlft.adclschsstct-frstinsdlft {
          background: #e2e2e2;
          color: #c6080f;
        }
        .allcities-forstatesection.adclsallcities-forstatesection {
          transform: scale(1);
          transition: all 0.5s ease-in-out;
        }
        .cat-top-ad {
          padding: 15px 0;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
        }

        .add {
          background: #dbdde3 !important;
        }
        .cat-top-ad,
        .add,
        .add2 {
          height: 290px;
          overflow: hidden;
        }

        .section-topslider {
          position: relative;
          overflow: hidden;
          background: #000;
        }
        .section-topslider ul {
          display: flex;
        }
        .section-topslider ul li figure {
          position: relative;
          width: 100%;
          line-height: 0;
        }
        .section-topslider ul li figure img {
          width: 100%;
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
        .section-topslider.forentertainment ul li .tpall .tpc {
          background: #a6214d;
        }
        .section-topslider.forbusiness ul li .tpall .tpc {
          background: #2163a6;
        }
        .chmpntpnwshd a .tpall span {
          background: #000;
          padding: 0 16px;
          height: 24px;
          line-height: 26px;
          border-radius: 4px;
          font-size: 12px;
          color: #fff;
          display: inline-block;
          position: absolute;
          top: -15px;
          left: 16px;
          font-weight: 400;
        }
        .section-topslider-bullets {
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          z-index: 2;
        }
        .section-topslider-bullets button {
          width: 8px;
          height: 8px;
          background: #7e8186;
          border-radius: 50%;
          margin: 0 8px 0 0;
          padding: 0;
          outline: 0;
          border: none;
          display: inline-block;
          cursor: pointer;
        }
        .section-topslider-bullets button.glide__bullet--active {
          background: #fff;
        }
        .section-topslider.forentertainment
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #a6214d;
        }
        .section-topslider.forbusiness
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #2163a6;
        }
        .section-topslider.forstates
          .section-topslider-bullets
          button.glide__bullet--active {
          background: #a64d21;
        }
        .outbrain_row {
          padding: 0 15px;
        }
        
        h1.article_heading1 {
          font-size: 26px;
          line-height: 32px;
          color: #001d42;
          font-family: "Mukta", sans-serif !important;
          font-weight: bold;
          padding: 10px 0px 10px;
        }
        .top-news-title {
          min-height: 40px;
        }
      `}</style>
    </>
  );
};
export default StatesMobile;
