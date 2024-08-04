import { useEffect, useState, useRef, memo, useContext } from "react";
import useScrollBar from "hooks/useScrollBar";
import TaboolaFooter from "widgets/Common/Responsive/TaboolaFooter";
import dynamic from "next/dynamic";
import FlashWidget from 'components/Common/FlashWidget';
import StickyFooterMenu from './StickyFooterMenu';
import AppInstall from './AppInstall';

const NewSiteAd = memo(dynamic(() => import("widgets/Common/Responsive/NewSiteAd")));

// import { URL } from "api/Constant";
// import LazyLoadImage from "components/Common/CustomImage";
// import FlashWidget from "components/Common/FlashWidget";
import LazyLoad from "react-lazyload";
import HindiGlobalContext from "HindiGlobalContext";

const FooterMobile = (props) => {
  const temp = useRef(0);
  const { footerData = [], footerDataCat = {}, toggeleHandler } = props;
  // const stickyFooterData = props?.menuData?.footerData || [];
  const {
    footer_headings: footerHeading = [],
    watch_tv: watchTv = [],
    static_pages: staticPages = [],
    social_link: socialLink = [],
    copy_right_year: copyright = "",
  } = footerData;
  let trndingData = [];
  let socialMedia = [];
  let popularTrading = [];
  if (Object.keys(footerDataCat) && Object.keys(footerDataCat).length) {
    for (const i in footerDataCat) {
      if (footerDataCat[i]?.slug == "trading") {
        trndingData = footerDataCat[i];
      } else if (footerDataCat[i]?.slug == "social-media") {
        socialMedia = footerDataCat[i];
      } else if (footerDataCat[i]?.slug == "popular-trading") {
        popularTrading = footerDataCat[i];
      }
    }
  }
  const livetvs =
    watchTv?.[0]?.data?.filter((item) => item.tv_status == "1") || [];

  let pgSlider;
  switch (props.pageType) {
    case "category": {
      pgSlider =
        "NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1";
      break;
    }
  }

  const [scroll, scrollUp] = useScrollBar(true);
  const [fireOps, setFireOps] = useState(false);
  const { isBottomNextPrevOpen } = useContext(HindiGlobalContext);

  useEffect(() => {
    temp.current = temp.current + 1;
    function izootoDependency() {
      const idscript = document.createElement("script");
      const scriptContent = document.createTextNode(
        'window._izq = window._izq || []; window._izq.push(["init"]);'
      );
      idscript.appendChild(scriptContent);

      if (typeof idscript !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(idscript);
      }
    }

    function izooto() {
      const iscript = document.createElement("script");
      iscript.async = true;
      iscript.src =
        "https://cdn.izooto.com/scripts/bbb67b29306b45dfa1a7ccd866c1f6a55f8dc9dd.js";

      if (typeof iscript !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(iscript);
      }
    }

    setTimeout(() => {
      izootoDependency();
      izooto();
    }, 7000);
    // (async () => {
    //   const data = await getRedisDataByKey(REDIS_KEYS.STICKY_FOOTER_DATA)
    //   setStickyFooterData(data?.menu || []);
    // })();
  }, []);

  if (scroll >= 200 && !fireOps) {
    setFireOps(true);
  }
  function headingManager(heading = "") {
    return (
      <span className="ftr_title">
        <span>{heading} </span>
      </span>
    );
  }
  const local18_video = props?.articleData?.local18_video;

  return (
    <>
      {!props.isVideoConsumption && !local18_video && (
        <FlashWidget
          isMobile={true}
          currentUrl={props.currentUrl}
          utm={`utm_source=mobile&utm_medium=${props?.pageType}&utm_campaign=newsflash_widget`}
        />
      )}
      <footer className="common-footer" style={{ display: "block" }}>
        <section className="ftr_container">
          <div className="ftr_row">
            <div className="side_bar">
              {headingManager(
                trndingData.heading
                  ? trndingData.heading
                  : footerHeading?.[0]?.heading
              )}
              <div className="link_table w3 trand">
                {trndingData?.data?.length
                  ? trndingData.data.map((item, key) => (
                      <a
                        key={key}
                        href={item?.text_url}
                        target={item.is_new == "1" ? "_blank" : "_self"}
                        onClick={() =>
                          ga(
                            "send",
                            "event",
                            "Footer",
                            "Click",
                            `Footer - ${trndingData?.heading} - ${item?.text_name}`
                          )
                        }
                      >
                        <i className="active"></i>
                        {item?.text_name}
                      </a>
                    ))
                  : footerHeading[0]?.data.map((item, key) => (
                      <a
                        key={key}
                        href={item?.text_url}
                        target={item.is_new == "1" ? "_blank" : "_self"}
                        onClick={() =>
                          ga(
                            "send",
                            "event",
                            "Footer",
                            "Click",
                            `Footer - ${footerHeading?.[0]?.heading} - ${item?.text_name}`
                          )
                        }
                      >
                        <i className="active"></i>
                        {item?.text_name}
                      </a>
                    ))}
              </div>
            </div>

            <div className="side_bar">
              {socialMedia?.heading
                ? headingManager(socialMedia?.heading)
                : headingManager(footerHeading?.[1]?.heading)}
              <div className="link_table w3 trand">
                {socialMedia?.data?.length
                  ? socialMedia.data.map((item, key) => (
                      <a
                        key={key}
                        href={item?.text_url}
                        target={item.is_new == "1" ? "_blank" : "_self"}
                        onClick={() =>
                          ga(
                            "send",
                            "event",
                            "Footer",
                            "Click",
                            `Footer - ${socialMedia?.heading} - ${item?.text_name}`
                          )
                        }
                      >
                        <i className="active"></i>
                        {item?.text_name}
                      </a>
                    ))
                  : footerHeading[1]?.data.map((item, key) => (
                      <a
                        key={key}
                        href={item?.text_url}
                        target={item.is_new == "1" ? "_blank" : "_self"}
                        onClick={() =>
                          ga(
                            "send",
                            "event",
                            "Footer",
                            "Click",
                            `Footer - ${footerHeading?.[1]?.heading} - ${item?.text_name}`
                          )
                        }
                      >
                        <i className="active"></i>
                        {item?.text_name}
                      </a>
                    ))}
              </div>
            </div>

            <div className="side_bar">
              {popularTrading?.heading
                ? headingManager(popularTrading?.heading)
                : headingManager(footerHeading?.[2]?.heading)}
              <div className="link_table w3 trand">
                {popularTrading?.data?.length
                  ? popularTrading.data.map((item, key) => (
                      <a
                        key={key}
                        href={item?.text_url}
                        target={item.is_new == "1" ? "_blank" : "_self"}
                        onClick={() =>
                          ga(
                            "send",
                            "event",
                            "Footer",
                            "Click",
                            `Footer - ${popularTrading?.heading} - ${item?.text_name}`
                          )
                        }
                      >
                        <i className="active"></i>
                        {item?.text_name}
                      </a>
                    ))
                  : footerHeading[2]?.data.map((item, key) => (
                      <a
                        key={key}
                        href={item?.text_url}
                        target={item.is_new == "1" ? "_blank" : "_self"}
                        onClick={() =>
                          ga(
                            "send",
                            "event",
                            "Footer",
                            "Click",
                            `Footer - ${footerHeading?.[2]?.heading} - ${item?.text_name}`
                          )
                        }
                      >
                        <i className="active"></i>
                        {item?.text_name}
                      </a>
                    ))}
              </div>
            </div>

            {footerHeading[3]?.data?.length ? (
              <div className="side_bar">
                <span className="ftr_title">{footerHeading[3]?.heading}</span>
                <div className="link_table w3 trand">
                  {footerHeading[3].data.map((item, key) => (
                    <a
                      key={key}
                      href={item?.text_url}
                      target={item.is_new == "1" ? "_blank" : "_self"}
                      onClick={() =>
                        ga(
                          "send",
                          "event",
                          "Footer",
                          "Click",
                          `Footer - ${footerHeading?.[3]?.heading} - ${item?.text_name}`
                        )
                      }
                    >
                      <i className="active"></i>
                      {item?.text_name}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="side_bar live_tv dropdown">
            <span>{watchTv?.[0]?.heading}</span>
            {livetvs?.slice(0, 1)?.map((item, key) => (
              <a
                key={key}
                className="dropbtn"
                href={item?.url}
                target={item.is_open_new == "1" ? "_blank" : "_self"}
                onClick={() =>
                  ga(
                    "send",
                    "event",
                    "Footer",
                    "Click",
                    `Footer - ${watchTv?.[0]?.heading} - ${item?.channelname}`
                  )
                }
              >
                {item?.channelname}
                <i></i>
              </a>
            ))}
            {livetvs.length > 1 ? (
              <div className="dropdown-content">
                {livetvs?.slice(1)?.map((item, key) => (
                  <a
                    key={key}
                    className="dropbtn"
                    href={item?.url}
                    target={item.is_open_new == "1" ? "_blank" : "_self"}
                    onClick={() =>
                      ga(
                        "send",
                        "event",
                        "Footer",
                        "Click",
                        `Footer - ${watchTv?.[0]?.heading} - ${item?.channelname}`
                      )
                    }
                  >
                    {item?.channelname}
                    <i></i>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <div className="social_icon">
            <div className="social_net">
              <p>Follow us on</p>
              <div className="social_net_icon">
                {socialLink?.[0]?.map((item, key) => (
                  <a
                    key={key}
                    href={item?.url}
                    className={item?.class_name}
                    target={item.is_open_new == "1" ? "_blank" : "_self"}
                    onClick={() =>
                      ga(
                        "send",
                        "event",
                        "Footer",
                        "Click",
                        `Lower Footer - ${item?.social_title} - ${item?.url}`
                      )
                    }
                  >
                    <i className={item?.social_title}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="device">
              <p>Download News18 App</p>
              <div className="social_net_icon">
                <a
                  href="https://play.google.com/store/apps/details?id=com.divum.ibn&amp;pid=Bottom_Nav_AOS&amp;c=Internal"
                  onClick={() =>
                    ga(
                      "send",
                      "event",
                      "Footer",
                      "Click",
                      "Lower Footer - News18 - Android"
                    )
                  }
                  className="icon icon-and"
                >
                  <i className="android"></i>
                </a>
                <a
                  href="https://apps.apple.com/in/app/news18/id395194912?pid=Bottom_Nav_iOS"
                  onClick={() =>
                    ga(
                      "send",
                      "event",
                      "Footer",
                      "Click",
                      "Lower Footer - News18 - Ios"
                    )
                  }
                  className="icon icon-expand"
                >
                  <i className="apple"></i>
                </a>
              </div>
            </div>
          </div>
          <a
            href="https://images.news18.com/ibnkhabar/uploads/assests/html/IS-739420-I.pdf"
            className="newisologo-img-oldpwa"
            target="_blank"
          >
            <LazyLoad once offset={300}>
              <img
                src="/images/siteimages/BSI_Logo_Mobile_1624612117.svg"
                alt="BSI Logo"
                width="147"
                height="75"
                title="BSI Logo"
              />
            </LazyLoad>
          </a>
        </section>
        <section className="bottom_footer">
          <div className="ftr_container">
            <div className="bottom_row">
              <div className="link_table">
                {staticPages?.[0]?.data?.map((item, key) => (
                  <a
                    key={key}
                    href={item?.url}
                    target={item.is_open_new == "1" ? "_blank" : "_self"}
                    onClick={() =>
                      ga(
                        "send",
                        "event",
                        "Footer",
                        "Click",
                        `Lower Footer - News18 - ${item?.text}`
                      )
                    }
                  >
                    {item?.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <p className="copy_right">{copyright.copy_right_year}</p>
        <TaboolaFooter />
      </footer>
      {fireOps &&
        typeof props.pageAds !== "undefined" &&
        typeof props.pageAds.SHOSH_OOP !== "undefined" &&
        props.pageAds.SHOSH_OOP !== "" &&
        (props.dtype != "photogallery" ||
          props.isCricketNext ||
          props?.isPhotoStory) && (
          // <SiteAd
          //   slotId="Shosh_OOP_id"
          //   renderOutOfThePage={true}
          //   adUnit={props.pageAds.SHOSH_OOP}
          //   sizes={[[1, 1]]}
          //   loadonScroll={true}
          //   removeAdSpan={true}
          //   style={{ height: 0 }}
          // />
          <NewSiteAd
            slotId={"Shosh_OOP_id"}
            adUnit={props.pageAds.SHOSH_OOP}
            sizes={[[1, 1]]}
            loadOnScroll={true}
            removeAdSpan={true}
          ></NewSiteAd>
        )}
      {fireOps &&
        typeof props.pageAds !== "undefined" &&
        typeof props.pageAds.SKIN_OOP !== "undefined" &&
        props.pageAds.SKIN_OOP != "" && (
          // <SiteAd
          //   slotId="Skin_OOP_id"
          //   renderOutOfThePage={true}
          //   adUnit={props.pageAds.SKIN_OOP}
          //   sizes={['fluid']}
          //   removeAdSpan={true}
          //   loadonScroll={true}
          // />
          <NewSiteAd
            slotId={"Skin_OOP_id"}
            adUnit={props.pageAds.SKIN_OOP}
            sizes={["fluid"]}
            loadOnScroll={true}
            removeAdSpan={true}
          ></NewSiteAd>
        )}

      {fireOps &&
        !props.isArticle &&
        typeof props.pageAds !== "undefined" &&
        typeof props.pageAds.PG_1x1 !== "undefined" &&
        (props.isCricketNext || props?.isVideoWall || props?.isPhotoStory || props?.isolympics) && (
          // <SiteAd
          //   slotId="PG_1x1"
          //   adUnit={props.pageAds.PG_1x1}
          //   sizes={[[1, 1]]}
          //   removeAdSpan={true}
          //   loadonScroll={true}
          //   style={{ height: 0 }}
          // />
          <NewSiteAd
            slotId={"PG_1x1"}
            adUnit={props.pageAds.PG_1x1}
            sizes={[[1, 1]]}
            loadOnScroll={true}
            removeAdSpan={true}
          ></NewSiteAd>
        )}
      {fireOps &&
        typeof props.pageAds !== "undefined" &&
        typeof props.pageAds.PG_Slider_1x1 !== "undefined" &&
        props.pageAds.PG_Slider_1x1 !== "" &&
        (props.isCricketNext ||
          props.isWomenWorldCupPage ||
          props?.isVideoWall ||
          props?.isPhotoStory ||
          props?.isArticle) && (
          // <SiteAd
          //   slotId="PG_Slider_1x1"
          //   adUnit={props.pageAds.PG_Slider_1x1}
          //   sizes={[[1, 1]]}
          //   removeAdSpan={true}
          //   loadonScroll={true}
          //   style={{ height: 0 }}
          // />
          <NewSiteAd
            slotId={"PG_Slider_1x1"}
            adUnit={props.pageAds.PG_Slider_1x1}
            sizes={[[1, 1]]}
            loadOnScroll={true}
            removeAdSpan={true}
          ></NewSiteAd>
        )}
      {fireOps && pgSlider && (
        // <SiteAd
        //   slotId="PG_Slider_1x1"
        //   adUnit={
        //     pgSlider
        //   }
        //   sizes={[[1, 1]]}
        //   renderOutOfThePage={true}
        //   removeAdSpan={true}
        //   loadonScroll={true}
        // />
        <NewSiteAd
          slotId={"PG_Slider_1x1"}
          adUnit={pgSlider}
          sizes={[[1, 1]]}
          loadOnScroll={true}
          removeAdSpan={true}
        ></NewSiteAd>
      )}
      <AppInstall/>

      {typeof props.pageAds !== "undefined" &&
        typeof props.pageAds.FBN_320 !== "undefined" && (
          <div className="ftrad">
            {/* <SiteAd
            slotId="sticky_footer_ad"
            adUnit={props.pageAds.FBN_320}
            sizes={[[320, 50]]}
            width={300}
            height={50}
            removeAdSpan={true}
            loadonScroll={true}
          /> */}
            <NewSiteAd
              slotId={"sticky_footer_ad"}
              adUnit={props.pageAds.FBN_320}
              sizes={[[320, 50]]}
              width={300}
              height={50}
              loadOnScroll={true}
            ></NewSiteAd>
            <button
              className="sticky-ad-close-button"
              aria-label="Close this ad"
              onClick={() => {
                const div = document.querySelector(".ftrad");
                if (div) {
                  div.innerHTML = "";
                  div.style.display = "none";
                }
              }}
            ></button>
          </div>
        )}
        <StickyFooterMenu isMobile={true} isAMP={false} toggeleHandler={toggeleHandler} />
      
      {/* {stickyFooterData?.length > 0 && (
        <ul className="btnvav">
          {stickyFooterData.slice(0, 5).map((itm, key) => (
            <li key={key}>
              <a
                title={itm.label}
                href={itm.url}
                onClick={() =>
                  ga(
                    "send",
                    "event",
                    "Sticky Footer Click",
                    "click",
                    `Sticky Footer/${itm.label} click`,
                    "1"
                  )
                }
              >
                <span>
                  <img
                    src={itm?.imgurl}
                    height={20}
                    width={22}
                    loading="lazy"
                  />
                  {itm.highlight_new === "1" && (
                    <img
                      height={12}
                      width={22}
                      src={URL.GET_NEW_ICON}
                      title="Blinker"
                      alt="New Blinker Icon"
                      loading="lazy"
                    />
                  )}
                </span>
                {itm.label}
              </a>
            </li>
          ))}
        </ul>
      )} */}
      <style jsx global>{`
        footer#footer {
          position: fixed;
          bottom: 0;
          width: 100%;
          background: #1a1a1a;
          z-index: 999;
        }
        ul.footer_nav {
          display: flex;
          justify-content: space-between;
          padding: 8px 30px;
          align-items: center;
          text-align: center;
          list-style: none;
          font-size: 14px;
        }
        ul.footer_nav li span {
          display: block;
          padding-bottom: 7px;
          font-size: 18px;
        }
        ul.footer_nav li a {
          color: #fff;
          text-decoration: none;
        }
        ul.footer_nav li {
          opacity: 0.5;
        }

        [className*=" icon-"],
        [class^="icon-"] {
          speak: none;
          font-style: normal;
          font-weight: 400;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .common-footer {
          margin-bottom: 60px;
          width: 100%;
        }
        .ftrad {
          position: fixed;
          bottom: ${isBottomNextPrevOpen ? "85px": "0px"};
          align-items: center;
          justify-content: center;
          width: 100%;
          left: 0px;
          background: #fff;
          padding: 6px 0;
          text-align: center;
          margin: 0px auto;
          box-shadow: 0px -1px 0px #ccc;
          z-index: 999999;
          transition: all 1s ease-in-out;
          height: 62px;
        }        
        .ftrad {
          display: none;
        }
        .gridview-story li .lstintro h4 {
          font-size: 16px !important;
          line-height: 1.45 !important;
        }
        .gridview-story li .lstintro h4 b {
          color: #111 !important;
          font-weight: 400 !important;
        }
        .mvrtng-xsm,
        .txt10 {
          font-size: 12px !important;
        }
        .read-more {
          padding: 0px 15px 20px !important;
        }
        body {
          padding-top: 0px;
        }
        .hgt_m .swiper-slide .scrd-mtchdetl2 {
          height: auto !important;
          min-height: 42px !important;
        }
        * {
          margin: 0;
          padding: 0;
          outline: 0;
        }

        .common-footer * {
          box-sizing: border-box;
        }

        .common-footer {
          background: #1a1a1a;
          overflow: hidden;
          padding: 0;
        }

        .common-footer .ftr_container {
          max-width: 1244px;
          margin: auto;
          padding: 15px 0 0;
          background: #222222;
        }

        .common-footer .ftr_container .ftr_row {
          display: flex;
          justify-content: space-between;
          position: relative;
          flex-direction: column;
        }

        .common-footer .ftr_container .ftr_title {
          font-size: 14px;
          color: #fff;
          line-height: 16px;
          font-weight: 700;
          display: block;
          margin-bottom: 20px;
          margin-left: 0px;
          text-align: left;
        }

        .common-footer .ftr_container .ftr_title span {
          border-bottom: 2px #fff solid;
        }

        .common-footer .ftr_container .side_bar {
          margin-bottom: 10px;
        }

        .common-footer .ftr_container .link_table {
          flex-wrap: wrap;
          display: flex;
        }

        .common-footer .ftr_container .link_table a {
          padding: 0px 10px;
          color: #ccc;
          font-size: 13px;
          line-height: 25px;
          margin-bottom: 10px;
          text-decoration: none;
        }

        .common-footer .ftr_container .link_table a:hover {
          color: #e91d1d;
        }

        .common-footer .ftr_container .link_table.w3 a {
          width: auto;
          line-height: normal;
          margin-bottom: 5px;
          position: relative;
        }

        .common-footer .ftr_container .link_table.w3 a:nth-of-type(even) {
          padding-right: 10px;
        }

        .common-footer .ftr_container .link_table.trand a {
          /* padding-right: 20px; */
          border-right: 1px #fff solid;
          padding: 0 15px;
          margin-bottom: 12px;
        }

        .common-footer .ftr_container .link_table.w3 a i {
          position: absolute;
          left: 15px;
          top: 2px;
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-left: 4px solid #ccc;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
        }

        .common-footer .ftr_container .link_table.w3 a i:before {
          content: "";
          position: absolute;
          left: -12px;
          top: 0;
          width: 7px;
          height: 1px;
          background: #ccc;
        }

        .common-footer .ftr_container .link_table.w3 a i:after {
          content: "";
          position: absolute;
          left: -18px;
          top: -6px;
          border: solid #ccc;
          border-width: 0 1px 1px 0;
          display: inline-block;
          padding: 3px 2px;
          transform: rotate(-94deg);
          -webkit-transform: rotate(-94deg);
        }

        .common-footer .ftr_container .link_table.w3 a i.active {
          border-left-color: #e91d1d;
          display: none;
        }

        .common-footer .ftr_container .link_table.w3 a i.active:after {
          border-color: #e91d1d;
        }

        .common-footer .ftr_container .link_table.w3 a i.active:before {
          background: #e91d1d;
        }

        .common-footer .bottom_footer {
          background: rgba(12, 12, 12, 1);
        }

        .common-footer .bottom_footer .ftr_container {
          padding: 10px 15px;
        }

        .common-footer .bottom_footer .bottom_row .link_table {
          display: flex;
          justify-content: space-between;
        }

        .common-footer .bottom_footer .bottom_row .link_table a {
          margin-bottom: 0;
        }

        .common-footer .ftr_container .ftr_title {
          position: relative;
          margin-left: 10px;
        }

        .common-footer .ftr_container .ftr_title:after {
          content: "";
          position: absolute;
          width: 80px;
          background: #ed1c24;
          height: 3px;
          left: 0;
          bottom: -8px;
        }

        .link_table.w3.trand.language_sites a {
          border-right: 0;
          position: relative;
        }

        .link_table.w3.trand.language_sites a:after {
          content: "-";
          position: absolute;
          left: -3px;
          font-size: 23px;
          top: -7px;
        }

        .link_table.w3.trand.language_sites {
          padding-left: 14px;
        }

        .side_bar.live_tv {
          margin-bottom: 0 !important;
          text-align: center;
          margin: 0 auto;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 10px;
          width: 100%;
          background: #171717;
          border-top: 1px rgb(255 255 255 / 10%) solid;
        }

        .side_bar.live_tv span {
          font-size: 24px;
          font-weight: 700;
          line-height: 53px;
          display: block;
          color: #fff;
          text-transform: uppercase;
          margin-right: 10px;
        }

        .side_bar.live_tv a {
          background: transparent;
          z-index: 2;
          border-radius: 20px;
          text-align: center;
          height: 44px;
          line-height: 44px;
          padding: 0 10px;
          font-size: 16px;
          text-decoration: none;
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 5px;
          text-transform: uppercase;
          color: #fff;
          transition: all 0.3s;
          overflow: hidden;
          position: relative;
        }

        .side_bar.live_tv a:before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: #ee1c25;
          transition: all 0.3s;
          border-radius: 20px;
          z-index: -1;
        }

        .side_bar.live_tv a i {
          width: 26px;
          height: 22px;
          border: 2px #fff solid;
          background: transparent;
          position: relative;
          font-style: normal;
          margin-left: 10px;
          display: inline-block;
          vertical-align: top;
          border-radius: 3px;
        }

        .side_bar.live_tv a i {
          width: 26px;
          height: 22px;
          border: 2px #fff solid;
          background: transparent;
          position: relative;
          font-style: normal;
          margin-left: 10px;
          display: inline-block;
          vertical-align: top;
          border-radius: 3px;
        }

        .side_bar.live_tv a i:before {
          content: "";
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 9px solid #fff;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }

        .side_bar.live_tv a:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #a10209;
          border-radius: 20px;
          z-index: -2;
        }

        .side_bar.live_tv a i:after {
          content: "";
          position: absolute;
          left: 7px;
          top: -10px;
          border: solid #fff;
          border-width: 0 1px 1px 0;
          display: inline-block;
          padding: 3px;
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
        }

        .social_icon .social_net a {
          width: 35px;
          height: 35px;
          border: 1px #fff solid;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .social_icon {
          margin-left: auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 10px 0;
          border-top: 1px rgb(255 255 255 / 10%) solid;
          border-bottom: 1px rgb(255 255 255 / 10%) solid;
        }

        .social_icon a {
          width: 35px;
          height: 35px;
          display: block;
          margin-left: 13px;
          /* margin-bottom: 15px; */
          background-position: 11px -2px;
        }

        .social_icon a i {
          width: 35px;
          height: 35px;
          font-style: normal;
          background: url("/images/siteimages/news18-hn-sprite-icons.svg")
            no-repeat;
          position: relative;
        }

        .social_icon .device a.apple {
          background-position: 8px -33px;
          margin-right: 0;
        }

        .social_icon a i.facebook {
          background-position: -72px -125px;
          filter: opacity(0.7);
          transform: scale(1.2);
        }

        .social_icon a i.twitter {
          background-position: -73px -152px;
          filter: opacity(0.7);
          transform: scale(1.2);
        }

        .social_icon a i.insta {
          background-position: -75px -177px;
          filter: opacity(0.7);
          transform: scale(1.2);
        }

        .social_icon a i.instagram {
          background-position: -75px -177px;
          filter: opacity(0.7);
          transform: scale(1.2);
        }

        .social_icon a i.tely {
          background-position: 7px -145px;
        }

        .social_icon a i.youtube {
          background-position: -75px -231px;
          z-index: 2;
          height: 24px;
          filter: opacity(0.7);
          transform: scale(1.3);
        }

        .social_icon a:last-child {
          margin-right: 0;
        }

        .social_icon .device {
          display: block;
          justify-content: flex-end;
        }

        .social_icon .device a {
          width: 35px;
          height: 35px;
          display: block;
          margin-right: 20px;
          /* margin-bottom: 15px; */
          background-position: 10px 2px;
          position: relative;
          overflow: hidden;
          border-radius: 50%;
        }

        .social_icon .device a i {
          width: 35px;
          height: 32px;
          font-style: normal;
          background: url("/images/siteimages/news18-hn-sprite-icons.svg")
            no-repeat;
          position: relative;
          display: block;
        }

        .social_icon .device a i.android {
          background-position: -76px -58px;
        }

        .social_icon .device a i.apple {
          background-position: -73px -92px;
        }

        .social_icon .device a:last-child {
          margin-right: 0;
        }

        .social_icon .social_net a {
          width: 35px;
          height: 35px;
          border: 1px #fff solid;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .common-footer .bottom_footer .icon::before,
        .common-footer .bottom_footer .icon::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          -webkit-transition: all 0.25s ease;
          transition: all 0.25s ease;
          border-radius: 30px;
        }

        .common-footer .bottom_footer .icon i {
          position: relative;
          color: #fff;
          -webkit-transition: all 0.25s ease;
          transition: all 0.25s ease;
        }

        .common-footer .bottom_footer .icon:hover i {
          filter: brightness(1.3);
        }

        .common-footer .bottom_footer .icon-fill::before {
          -webkit-transition-duration: 0.5s;
          transition-duration: 0.5s;
        }

        .common-footer .bottom_footer .icon-fill:hover::before {
          box-shadow: inset 0 0 0 60px #3a559f;
        }

        .common-footer .bottom_footer .icon-and::before {
          -webkit-transition-duration: 0.5s;
          transition-duration: 0.5s;
        }

        .common-footer .bottom_footer .icon-and:hover::before {
          box-shadow: inset 0 0 0 60px #a5c736;
        }

        .common-footer .bottom_footer .icon-enter::before {
          border-radius: 0;
          margin-left: -100%;
          box-shadow: inset 0 0 0 60px #1da1f2;
        }

        .common-footer .bottom_footer .icon-enter:hover::before {
          margin-left: 0;
        }

        .common-footer .bottom_footer .icon-rotate:before {
          border-radius: 0;
          margin-top: -100%;
          box-shadow: inset 0 0 0 60px #f00;
        }

        .common-footer .bottom_footer .icon-rotate:hover:before {
          margin-top: 0;
        }

        .common-footer .bottom_footer .icon-expand::before {
          background: #c82647;
          box-shadow: inset 0 0 0 60px #0c0c0c;
        }

        .common-footer .bottom_footer .icon-expand:hover::before {
          box-shadow: inset 0 0 0 1px #ab378b;
        }

        .common-footer .bottom_footer .icon-collapse::before {
          border-radius: 0;
        }

        .common-footer .bottom_footer .icon-collapse:hover::before {
          box-shadow:
            inset 0 30px 0 0 #2397d1,
            inset 0 -30px 0 0 #2397d1;
        }

        .common-footer .bottom_footer .bottom_row .social_icon .social_net {
          display: flex;
          justify-content: space-between;
        }

        .social_net_icon {
          display: flex;
          justify-content: center;
        }

        .social_icon p {
          display: block;
          width: 100%;
          color: #fff;
          text-align: center;
          font-size: 13px;
          text-transform: uppercase;
          padding-bottom: 11px;
          margin-bottom: 4px !important;
        }

        p.copy_right {
          color: #fff;
          font-size: 9px;
          line-height: 14px;
          text-align: center;
          padding: 10px 15px;
        }

        .link_table.w3.trand.network_site a {
          border: 0;
          width: 50%;
          text-decoration: underline;
        }
        .dropdown-content {
          display: none;
        }
        .adclsftrwtchlvtvmore {
          display: block;
          flex-wrap: wrap;
          position: absolute;
          top: 10px;
          right: 0px;
        }

        @media screen and (max-width: 768px) {
          .common-footer .social_icon {
            flex-direction: column;
          }
          .common-footer .social_icon .social_net {
            margin-bottom: 20px;
          }
          .social_icon a i.jionews {
            background-position: -74px -252px;
            transform: scale(1.2);
            filter: opacity(0.7);
          }
        }
        .newisologo-img-oldpwa {
          display: block;
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
          margin-bottom: 10px;
          text-align: center;
          padding-top: 5px;
        }
        .newisologo-img-oldpwa img {
          width: 147px;
        }
        .common-footer .ftr_container .link_table.w3 a {
          width: auto !important;
          min-height: 0 !important;
          margin-bottom: 10px !important;
        }
        .common-footer .ftr_container .link_table.trand a {
          padding-left: 15px !important;
        }
        .sticky-ad-close-button {
          position: absolute;
          visibility: hidden;
          width: 28px;
          height: 28px;
          top: -28px;
          right: 0;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='13' height='13' viewBox='341 8 13 13' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%234F4F4F' d='M354 9.31 352.69 8l-5.19 5.19L342.31 8 341 9.31l5.19 5.19-5.19 5.19 1.31 1.31 5.19-5.19 5.19 5.19 1.31-1.31-5.19-5.19z' fill-rule='evenodd'/%3E%3C/svg%3E");
          background-size: 13px 13px;
          background-position: 9px;
          background-color: #fff;
          background-repeat: no-repeat;
          box-shadow: 0 -1px 1px 0 rgb(0 0 0 / 20%);
          border: none;
          border-radius: 12px 0 0 0;
        }
        .sticky-ad-close-button::before {
          position: absolute;
          content: "";
          top: -20px;
          right: 0;
          left: -20px;
          bottom: 0;
        }
        body .pht-artcl-share {
          z-index: 13;
        }
      `}</style>
    </>
  );
};
export default FooterMobile;
