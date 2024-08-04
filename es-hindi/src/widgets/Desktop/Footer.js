import React, { useEffect } from 'react';
//import SiteAd from 'widgets/Common/Responsive/SiteAd';
import LazyLoad from 'react-lazyload';
import TaboolaFooter from "widgets/Common/Responsive/TaboolaFooter";
import NewSiteAd from 'widgets/Common/Responsive/NewSiteAd';
import FlashWidget from 'components/Common/FlashWidget';

const Footer = (props) => {
  const { footerData = [], footerDataCat = {} } = props;
  const {
    footer_headings: footerHeading = [],
    watch_tv: watchTv = [],
    static_pages: staticPages = [],
    social_link: socialLink = [],
    copy_right_year: copyright = ""
  } = footerData;
  let trndingData = [];
  let socialMedia = [];
  let popularTrading = [];
  if (Object.keys(footerDataCat) && Object.keys(footerDataCat).length) {
    for (const i in footerDataCat) {
      if (footerDataCat[i]?.slug == 'trading') {
        trndingData = footerDataCat[i];
      } else if (footerDataCat[i]?.slug == 'social-media') {
        socialMedia = footerDataCat[i];
      } else if (footerDataCat[i]?.slug == 'popular-trading') {
        popularTrading = footerDataCat[i];
      }
    }
  }
  const livetvs = watchTv?.[0]?.data?.filter((item) => item.tv_status == "1") || [];

  useEffect(() => {
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

    if (process.env.siteAd) {
      // window.addEventListener("scroll", func, { passive: true });
    }

    // return () => window.removeEventListener("scroll", func);
  }, []);

  function headingManager(heading = "") {
    return (
      <span className='ftr_title'>
        <span>{heading} </span>
      </span>
    );
  }
  const local18_video = props?.articleData?.local18_video;
  return (
    <React.Fragment>
      {!props.isVideoConsumption && !local18_video && <FlashWidget currentUrl={props.currentUrl} utm={`utm_source=desktop&utm_medium=${props?.pageType}&utm_campaign=newsflash_widget`} />}
      {/* Footer start here */}
      <footer className='common-footer'>
        <section className='ftr_container'>
          <div className='ftr_row'>
            <div className='side_bar ftr_grid5'>
              {headingManager(trndingData?.heading ? trndingData.heading : footerHeading?.[0]?.heading)}
              <div className="link_table w3 trand">
                {trndingData?.data?.length ? trndingData?.data?.map((item, index) => (
                  <a
                    key={index}
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
                    <i className='active'></i>
                    {item?.text_name}
                  </a>
                )) : footerHeading?.[0]?.data?.map((item, index) => (
                  <a
                    key={index}
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
                    <i className='active'></i>
                    {item?.text_name}
                  </a>))}
              </div>
            </div>
            <div className='side_bar ftr_grid5 mrgl_auto'>
              {socialMedia?.heading ? headingManager(socialMedia?.heading) : headingManager(footerHeading?.[1]?.heading)}
              <div className="link_table w3">
                {
                  socialMedia?.data?.length ? socialMedia.data?.map((item, index) => (
                    <a
                      key={index}
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
                      {item?.text_name}
                    </a>
                  )) :
                    footerHeading?.[1]?.data?.map((item, index) => (
                      <a
                        key={index}
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
                        {item?.text_name}
                      </a>
                    ))
                }

              </div>
            </div>

          </div>
          <div className='ftr_row categories'>
            <div className='side_bar w7'>
              {popularTrading?.heading ? headingManager(popularTrading?.heading) : headingManager(footerHeading?.[2]?.heading)}
              <div className="link_table w3">
                {popularTrading?.data?.length ?
                  popularTrading?.data?.map((item, index) => (
                    <a
                      key={index}
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
                      {item?.text_name}
                    </a>
                  ))
                  :
                  footerHeading?.[2]?.data?.map((item, index) => (
                    <a
                      key={index}
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
                      {item?.text_name}
                    </a>
                  ))
                }
              </div>
            </div>
            <div className='side_bar live_tv dropdown'>
              <span>{watchTv?.[0]?.heading}</span>
              {livetvs?.slice(0, 1)?.map((item, index) => (
                <a
                  key={index}
                  className='dropbtn'
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
                  {livetvs?.slice(1)?.map((item, index) => (
                    <a
                      key={index}
                      className='dropbtn'
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
          </div>
          <div className='ftr_row'>
            <div className='side_bar ftr_grid5'>
              {headingManager(footerHeading?.[3]?.heading)}
              <div className="link_table w3">
                {footerHeading?.[3]?.data?.map((item, index) => (
                  <a
                    key={index}
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
                    {item?.text_name}
                  </a>
                ))}
              </div>
            </div>
            <div className='side_bar ftr_grid5 mrgl_auto'>
              {headingManager(footerHeading?.[4]?.heading)}
              <div className="link_table w3">
                {footerHeading?.[4]?.data?.map((item, index) => (
                  <a
                    key={index}
                    href={item?.text_url}
                    target={item.is_new == "1" ? "_blank" : "_self"}
                    onClick={() =>
                      ga(
                        "send",
                        "event",
                        "Footer",
                        "Click",
                        `Lower Footer - ${footerHeading?.[4]?.heading} - ${item?.text_name}`
                      )
                    }
                  >
                    {item?.text_name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className='bottom_footer'>
          <div className='ftr_container'>
            <div className='bottom_row'>
              <div className='logo'>
                <LazyLoad height={25} once>
                  <img
                    src='/images/siteimages/News18_logo.svg'
                    alt='News18 Logo'
                    title='News18 Logo'
                    loading='lazy'
                  />
                </LazyLoad>                
              </div>
              <div className="link_table w4">
                {staticPages?.[0]?.data?.map((item, index) => (
                  <a
                    key={index}
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
              <div className='social_icon'>
                <div className='device'>
                  <a
                    href='https://play.google.com/store/apps/details?id=com.divum.ibn&pid=Bottom_Nav_AOS&c=Internal'
                    onClick={() =>
                      ga(
                        "send",
                        "event",
                        "Footer",
                        "Click",
                        "Lower Footer - News18 - Android"
                      )
                    }
                    className='icon icon-and'
                  >
                    <i className='android'></i>
                  </a>
                  <a
                    href='https://apps.apple.com/in/app/news18/id395194912?pid=Bottom_Nav_iOS'
                    onClick={() =>
                      ga(
                        "send",
                        "event",
                        "Footer",
                        "Click",
                        "Lower Footer - News18 - Ios"
                      )
                    }
                    className='icon icon-expand'
                  >
                    <i className='apple'></i>
                  </a>
                </div>
                <div className="social_net">
                  {socialLink?.[0]?.map((item, index) => (
                    <a
                      key={index}
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
            </div>
            <div className='footer_pra'>
              {copyright.copy_right_year}
              <a
                href='https://images.news18.com/ibnkhabar/uploads/assests/html/IS-739420-I.pdf'
                className='newisologo-img-old'
                target='_blank'
              >
                <img
                  loading='lazy'
                  src='/images/siteimages/BSI_Logo_Desktop_1624612049.svg'
                  alt='ISO 27001'
                  title='ISO 27001'
                  height="77" width="151"
                />
              </a>
            </div>
          </div>
        </section>
        <TaboolaFooter />
      </footer>
      
      {/* Footer end here */}
      {typeof props.pageAds !== "undefined" &&
        typeof props.pageAds.NATIVE_id !== "undefined" &&
        !props.isHome && (        
        <NewSiteAd
          slotId="NATIVE_id"
          adUnit={props.pageAds.NATIVE_id}
          sizes={["fluid"]}       
          removeAdSpan={true}              
          loadOnScroll={true}          
        />
      )}
      {typeof props.pageAds !== 'undefined' &&
        typeof props.pageAds.Shosh_OOP_id !== 'undefined' &&
        (props.dtype !== 'photogallery' || props?.mainCat !== undefined || props.isCricketNext || props?.isWomenWorldCupPage) && (
        <NewSiteAd
          slotId="Shosh_OOP_id"
          adUnit={props.pageAds.Shosh_OOP_id}
          sizes={[[1, 1]]}      
          removeAdSpan={true}              
          loadOnScroll={true}          
        />
      )}
      
      {typeof props.pageAds !== "undefined" &&
        typeof props.pageAds.Skin_OOP_id !== "undefined" && (        
        <NewSiteAd
          slotId="Skin_OOP_id"
          adUnit={props.pageAds.Skin_OOP_id}
          sizes={["fluid"]}
          removeAdSpan={true}              
          loadOnScroll={true}          
        />
      )}

      {typeof props.pageAds !== 'undefined' &&
        typeof props.pageAds.PG_1x1 !== 'undefined' &&
        (props.isCricketNext || props?.isVideoWall) && (        
        <NewSiteAd
          slotId="PG_1x1"
          adUnit={props.pageAds.PG_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}              
          loadOnScroll={true}          
        />
      )}

      {(typeof props.pageAds !== "undefined" && 
      typeof props.pageAds.PG_Slider_1x1 !== "undefined" &&
      props.dtype !== 'photogallery' && props.dtype !== 'category' && 
      props?.pageType !=="article") &&        
        <NewSiteAd
          slotId="PG_Slider_1x1"
          adUnit={props.pageAds.PG_Slider_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}              
          loadOnScroll={true}          
        />
      }

      {props.dtype == 'podcast' && (        
        <NewSiteAd
          slotId="PG_Slider_1x1"
          adUnit={props.pageAds.PG_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}              
          loadOnScroll={true}          
        />
      )}
      <style jsx global>{`
        ${props.articleData && props.articleData.post_type == "text"
          ? ".bottom_footer {margin-bottom: 54px}"
          : ""}

        .logosldier ul {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          border: 1px solid #eee;
          padding: 10px;
        }

        .carousel__inner-slide a {
          display: block;
        }

        footer#footer {
          background: #212121;
        }

        .livesite_title {
          font-size: 20px;
          color: #fff;
          font-weight: 400;
          border-right: 1px solid #818181;
          padding-right: 16px;
          text-transform: uppercase;
          width: 110px;
          height: 100%;
          line-height: 82px;
        }

        .logosldier {
          width: calc(100% - 110px);
          position: relative;
          padding-left: 20px;
        }

        .logosldier button.glide__arrow.glide__arrow--right:after {
          transform: rotate(135deg);
        }

        .logosldier .glide__slides li:first-child {
          border: 0;
        }

        .logosldier .glide__slides li {
          text-align: center;
          border-left: 1px solid #3e3e3e;
        }

        .logosldier .glide__arrows {
          position: absolute;
          display: flex;
          align-items: center;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
        }

        .footer_other_logo button.glide__arrow--left {
          left: 0;
        }

        .logosldier button.glide__arrow--right {
          right: 0;
          position: absolute;
        }

        .logosldier button.glide__arrow {
          position: absolute;
          font-size: 0;
          border: 0;
          background: transparent;
          outline: none;
          cursor: pointer;
        }

        .logosldier button.glide__arrow:after {
          content: "";
          position: absolute;
          top: 50%;
          width: 15px;
          height: 15px;
          border-top: 3px solid #393939;
          border-left: 3px solid #393939;
          transform: rotate(-45deg);
          display: block;
          left: 50%;
          margin: -7px 0 0 -7px;
        }

        .footer_other {
          width: 295px;
          padding-top: 20px;
        }

        .footer_center {
          width: 600px;
          border-left: 1px solid #313131;
          border-right: 1px solid #313131;
          padding: 20px;
        }

        .footer_right {
          margin-left: 25px;
          width: 280px;
          padding-top: 20px;
        }

        .footer_midd {
          background: #1a1a1a;
          border-bottom: 1px solid #313131;
          border-top: 1px solid #313131;
        }

        .footer_title {
          font-size: 20px;
          color: #fff;
          padding-bottom: 10px;
          font-weight: 400;
          text-transform: uppercase;
        }

        ul.footer_links li a {
          color: #818181;
        }

        ul.footer_links {
          display: flex;
          flex-wrap: wrap;
        }

        ul.footer_links li {
          width: 50%;
          padding-bottom: 12px;
        }

        ul.footer_links li {
          font-size: 13px;
        }

        ul.footer_links li a:hover {
          color: #fff;
        }

        ul.footer_news li a {
          display: block;
          background: #0c0c0c;
          font-size: 14px;
          color: #818181;
          border-left: 3px solid #ed1c24;
          padding: 10px;
          margin-bottom: 5px;
        }

        .network_title {
          font-size: 20px;
          color: #fff;
          line-height: 115px;
          border-right: 1px solid #818181;
          float: left;
          position: relative;
          height: 115px;
          font-weight: 400;
          text-transform: uppercase;
          width: 250px;
        }

        ul.network_site li {
          float: left;
          padding: 10px 15px;
          font-size: 16px;
        }

        ul.network_site li a {
          color: #818181;
        }

        ul.network_site {
          width: calc(100% - 280px);
        }

        .footer_network {
          width: 100%;
          padding: 20px 0 0;
        }

        ul.network_site li a:hover {
          color: #fff;
        }

        .footer_txt {
          background: #0c0c0c;
          padding: 10px 0;
          font-size: 11px;
          line-height: 22px;
          color: #8c8c8c;
          margin-top: 20px;
        }

        .logosldier .carousel__back-button {
          position: absolute;
          font-size: 0;
          border: 0;
          background: transparent;
          outline: none;
          cursor: pointer;
          top: 30px;
        }
        .logosldier .carousel__back-button:after {
          content: "";
          position: absolute;
          top: 50%;
          width: 15px;
          height: 15px;
          border-top: 3px solid #393939;
          border-left: 3px solid #393939;
          transform: rotate(-45deg);
          display: block;
          left: 50%;
          margin: -7px 0 0 -7px;
        }
        .carousel__next-button {
          position: absolute;
          font-size: 0;
          border: 0;
          background: transparent;
          outline: none;
          cursor: pointer;
          right: 0;
          top: 30px;
        }
        .logosldier .carousel__next-button:after {
          content: "";
          position: absolute;
          top: 50%;
          width: 15px;
          height: 15px;
          border-top: 3px solid #393939;
          border-left: 3px solid #393939;
          transform: rotate(135deg);
          display: block;
          left: 50%;
          margin: -7px 0 0 -7px;
        }
        .logosldier ul {
          border: 0;
          justify-content: end;
          justify-content: space-between;
        }
        .logosldier ul img {
          max-width: 100%;
          display: block;
        }
        .slideHorizontal___1NzNV {
          text-align: center;
          margin: auto;
        }
        .common-footer .bottom_footer .footer_pra {
          padding-right: 320px !important;
        }

        #article_body table {
          display: table !important;
        }
        .rgt-ad {
          position: relative;
          z-index: 1;
        }
        #footer_ajax_div {
          clear: both;
        }
        * {
          margin: 0;
          padding: 0;
          outline: 0;
        }
        .common-footer * {
          font-family: "Mukta", sans-serif;
          box-sizing: border-box;
        }
        .common-footer {
          width: 100%;
          background: #1a1a1a;
          margin-top: 10px;
          overflow: hidden;
          padding: 0;
        }
        .common-footer .mrgl_auto {
          margin-left: auto;
        }
        .common-footer .ftr_container {
          max-width: 1244px;
          margin: auto;
        }
        .common-footer .ftr_container .ftr_row {
          display: flex;
          justify-content: space-between;
          padding: 25px 0 5px;
          position: relative;
        }
        .common-footer .ftr_container .ftr_row:after {
          content: "";
          position: absolute;
          bottom: 0;
          height: 1px;
          background: #0a0a0a;
          width: 100vw;
          margin-left: -50vw;
          left: 50%;
        }
        .common-footer .ftr_container .ftr_title {
          font-size: 14px;
          color: #fff;
          line-height: 16px;
          font-weight: 700;
          display: block;
          margin-bottom: 20px;
        }
        .common-footer .ftr_container .ftr_title span {
          border-bottom: 2px #fff solid;
        }
        .common-footer .ftr_container .side_bar.ftr_grid5 {
          width: 45%;
        }
        .common-footer .ftr_container .link_table {
          justify-content: flex-start;
          flex-wrap: wrap;
        }
        .common-footer .ftr_container .link_table a {
          padding-right: 10px;
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
          width: 33%;
          min-height: 35px;
          line-height: normal;
          margin-bottom: 5px;
          float: left;
          position: relative;
        }
        .common-footer .ftr_container .link_table.trand a {
          padding-left: 25px;
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
        .common-footer .ftr_container .link_table.w3 a.active i {
          border-left-color: #e91d1d;
        }
        .common-footer .ftr_container .link_table.w3 a.active i:after {
          border-color: #e91d1d;
        }
        .common-footer .ftr_container .link_table.w3 a.active i:before {
          background: #e91d1d;
        }
        .common-footer .ftr_container .ftr_row.categories .side_bar.w7 {
          width: 73%;
          padding-right: 70px;
          position: relative;
        }
        .common-footer .ftr_container .ftr_row.categories .side_bar.w7:after {
          content: "";
          position: absolute;
          top: -26px;
          bottom: -5px;
          width: 1px;
          right: 0;
          background: #0a0a0a;
        }
        .common-footer
          .ftr_container
          .ftr_row.categories
          .side_bar
          .link_table {
          display: flex;
        }
        .common-footer .ftr_container .ftr_row .side_bar.live_tv {
          text-align: center;
          margin: 0 auto;
          position: relative;
          top: -10px;
        }
        .common-footer .ftr_container .ftr_row .side_bar.live_tv span {
          font-family: "Mukta", sans-serif;
          font-size: 36px;
          font-weight: 700;
          line-height: 53px;
          display: block;
          color: #fff;
          text-transform: uppercase;
        }
        .common-footer
          .ftr_container
          .ftr_row.categories
          .side_bar
          .link_table
          a {
          width: 20%;
          padding-left: 10px;
          position: relative;
          line-height: normal;
          min-height: 30px;
        }
        .common-footer
          .ftr_container
          .ftr_row.categories
          .side_bar
          .link_table
          a:before {
          content: "";
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-left: 4px solid #ccc;
          position: absolute;
          left: 0;
          top: 4px;
        }
        .common-footer .ftr_container .ftr_row .side_bar.live_tv > a {
          background: transparent;
          z-index: 2;
          border-radius: 20px;
          text-align: center;
          height: 44px;
          line-height: 44px;
          min-width: 160px;
          padding: 0 15px;
          font-size: 18px;
          text-decoration: none;
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          margin-top: 5px;
          text-transform: uppercase;
          color: #fff;
          transition: all 0.3s;
          overflow: hidden;
          position: relative;
        }
        .common-footer .ftr_container .ftr_row .side_bar.live_tv a:after {
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
        .common-footer .ftr_container .ftr_row .side_bar.live_tv > a:before {
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
        .common-footer
          .ftr_container
          .ftr_row
          .side_bar.live_tv
          > a:hover:before {
          width: 100%;
        }
        .common-footer .ftr_container .ftr_row .side_bar.live_tv a i {
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
        .common-footer .ftr_container .ftr_row .side_bar.live_tv a i:before {
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
        .common-footer .ftr_container .ftr_row .side_bar.live_tv a i:after {
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
        .common-footer .bottom_footer {
          background: rgba(12, 12, 12, 1);
          padding: 15px 0;
        }
        .common-footer .bottom_footer .bottom_row {
          display: flex;
          justify-content: flex-start;
        }
        .common-footer .bottom_footer .bottom_row .logo {
          width: 142px;
          margin-right: 30px;
        }
        .common-footer .bottom_footer .bottom_row .logo img {
          max-width: 100%;
          min-height: 50px;
        }
        .common-footer .bottom_footer .bottom_row .link_table.w4 {
          width: 50%;
        }
        .common-footer .bottom_footer .bottom_row .link_table.w4 a {
          width: 25%;
          float: left;
          min-height: 25px;
        }
        .common-footer .bottom_footer .bottom_row .social_icon {
          margin-left: auto;
        }
        .common-footer .bottom_footer .bottom_row .social_icon a {
          width: 35px;
          height: 35px;
          display: block;
          margin-right: 20px;
          margin-bottom: 15px;
          background-position: 11px -2px;
        }
        .common-footer .bottom_footer .bottom_row .social_icon a i {
          width: 35px;
          height: 35px;
          font-style: normal;
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)no-repeat;
          position: relative;
        }
        .common-footer .bottom_footer .bottom_row .social_icon .device a.apple {
          background-position: 8px -33px;
          margin-right: 0;
        }
        .common-footer .bottom_footer .bottom_row .social_icon a i.facebook {
          background-position: -72px -125px;
          filter: opacity(0.7);
        }
        .common-footer .bottom_footer .bottom_row .social_icon a i.twitter {
          background-position: -73px -152px;
          filter: opacity(0.7);
        }
        .common-footer .bottom_footer .bottom_row .social_icon a i.insta {
          background-position: -75px -177px;
          filter: opacity(0.7);
        }
        .common-footer .bottom_footer .bottom_row .social_icon a i.tely {
          background-position: 7px -145px;
        }
        .common-footer .bottom_footer .bottom_row .social_icon a i.youtube {
          background-position: -75px -231px;
          z-index: 2;
          height: 24px;
          filter: opacity(0.7);
        }
        .common-footer .bottom_footer .bottom_row .social_icon a:last-child {
          margin-right: 0;
        }
        .common-footer .bottom_footer .bottom_row .social_icon .device {
          display: flex;
          justify-content: flex-end;
        }
        .common-footer .bottom_footer .bottom_row .social_icon .device a {
          width: 35px;
          height: 35px;
          display: block;
          margin-right: 20px;
          margin-bottom: 15px;
          background-position: 10px 2px;
          position: relative;
          overflow: hidden;
          border-radius: 50%;
        }
        .common-footer .bottom_footer .bottom_row .social_icon .device a i {
          width: 35px;
          height: 32px;
          font-style: normal;
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)no-repeat;
          position: relative;
          display: block;
        }
        .common-footer
          .bottom_footer
          .bottom_row
          .social_icon
          .device
          a
          i.android {
          background-position: -79px -56px;
        }
        .common-footer
          .bottom_footer
          .bottom_row
          .social_icon
          .device
          a
          i.apple {
          background-position: -78px -92px;
        }
        .common-footer
          .bottom_footer
          .bottom_row
          .social_icon
          .device
          a:last-child {
          margin-right: 0;
        }
        .common-footer .bottom_footer .bottom_row .social_icon .social_net a {
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
          box-shadow: inset 0 30px 0 0 #2397d1, inset 0 -30px 0 0 #2397d1;
        }
        .common-footer .bottom_footer .bottom_row .social_icon .social_net {
          display: flex;
          justify-content: space-between;
        }
        .common-footer .bottom_footer .footer_pra {
          text-align: left !important;
          font-size: 12px !important;
          line-height: 28px !important;
          color: #ccc;
          padding-top: 20px !important;
          max-width: 100% !important;
          padding-right: 320px;
          margin: auto;
          position: relative;
        }
        .common-footer .bottom_footer .footer_pra:before {
          content: "";
          width: 100vw;
          margin-left: -50%;
          left: 50%;
          background: #212121;
          height: 1px;
          top: 0;
          left: 0;
          right: 0;
          position: absolute;
          margin-left: -50vw;
          left: 50%;
        }
        .newisologo-img-old {
          margin-top: 10px;
        }

        .common-footer .bottom_footer .bottom_row .social_icon a i.instagram {
          background-position: -75px -177px;
          filter: opacity(0.7);
        }
        .common-footer
          .bottom_footer
          .bottom_row
          .social_icon
          .social_net
          a:nth-child(4):hover {
          background: #ff0000;
        }

        .dropbtn {
          border: none;
          cursor: pointer;
        }
        .newisologo-img {
          position: absolute;
          top: 10px;
          right: 0;
        }
        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .dropdown-content a {
          color: #fff;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        .dropdown-content a i {
          display: none !important;
        }

        .dropdown-content a {
          text-align: left;
          padding: 8px 7px;
          font-size: 13px;
          width: 190px;
          font-weight: bold;
        }

        .dropdown-content {
          border-radius: 10px 10px 10px 10px;
          background: #a10209;
          top: 102px;
          left: 2px;
        }

        .common-footer .bottom_footer .bottom_row .social_icon a i.jionews {
          background-position: -74px -252px;
        }
        .common-footer .bottom_footer .icon-jionews:hover::before {
          box-shadow: inset 0 0 0 60px #ef3d43;
        }
        .common-footer .bottom_footer .footer_pra {
          max-width: 100%;
        }
        .fbottom-txt .outer {
          font-size: 14px;
          position: relative;
          padding-right: 300px;
          box-sizing: border-box;
          padding-left: 0;
          line-height: 25px;
          padding-top: 10px;
          padding-bottom: 15px;
        }
        .newisologo-img-old {
          position: absolute;
          top: 0;
          right: 0;
        }
        /* Footer css end here */
      `}</style>
    </React.Fragment>
  );
};

export default React.memo(Footer);
