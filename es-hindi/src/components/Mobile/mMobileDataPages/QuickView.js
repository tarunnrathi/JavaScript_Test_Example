import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { InView } from 'react-intersection-observer';
import { logEvent } from "includes/googleAnalytic";
import { getMobile } from "api/global/Common";
import { imgURL } from "api/Constant";

const { specificationURL } = require("/src/includes/brand.helper");

const QuickMobileView = ({ data: mbData, headline }) => {

  const [mobileData, setMobileData] = useState({});
  const [mobileId] = mbData.split(",");

  const callApi = async () => {
    const id = mobileId;
    const data = await  getMobile({id: id}, true)
    setMobileData(data);
  };

  useEffect(() => {
    callApi();

    // if( mobileData &&  Object.keys(mobileData)?.length  ){

    setTimeout(() => {

    const elm = document?.querySelector(`.${mobileId}`);

      if(elm) {
        new Glide(document.querySelector(`.${mobileId}`), {
            autoplay: 4000,
            type: 'carousel',
            perView: 1.2,
            gap: 0,
            slidesToScroll: 1,
            }).mount();
    }
    }, 3000);

    // }

  }, []);

  function numberWithCommas(x) {
    return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const {
    release_date,
    title,
    price,
    id,
    volte,
    no_of_sim_cards,
    finger_print_sensor,
    fm_radio,
    internal_storage_display,
    gorilla_glass3,
    splashproof,
  } = mobileData || {};

  const { cpu, architecture, ram, chipset } =
    (mobileData?.performance_specs_91?.[0] &&
      JSON.parse(mobileData?.performance_specs_91?.[0])) ||
    {};
  const { screen_size, display_type, pixel_density, refresh_rate } =
    (mobileData?.display_specs_91?.[0] &&
      JSON.parse(mobileData?.display_specs_91?.[0])) ||
    {};
  const { front_camera, rear_camera } =
    (mobileData?.special_specs_91?.[0] &&
      JSON.parse(mobileData?.special_specs_91?.[0])) ||
    {};
  const { flash } =
    (mobileData?.camera_specs_91?.[0] &&
      JSON.parse(mobileData?.camera_specs_91?.[0])) ||
    {};
  const { quick_charging, usb_typec, capacity } =
    (mobileData?.battery_specs_91?.[0] &&
      JSON.parse(mobileData?.battery_specs_91?.[0])) ||
    {};

  const { operating_system } =
    (mobileData?.general_specs_91?.[0] &&
      JSON.parse(mobileData?.general_specs_91?.[0])) ||
    {};
  const { fastCharging } =
    (mobileData?.specs?.[0] && JSON.parse(mobileData?.specs?.[0])) || {};

  const newReleaseDate = release_date && "" + release_date;

  const year = newReleaseDate && newReleaseDate.slice(0, 4);
  const month = newReleaseDate && newReleaseDate.slice(5, 7);
  const date = newReleaseDate && newReleaseDate.slice(8, 10);

  const fullSpecificationURL = title?.includes('(') ?`${specificationURL}/${title?.slice(0, title?.indexOf('('))
  ?.replace(/ /g, "-")
  ?.toLowerCase()}${id}`:`${specificationURL}/${title
  ?.replace(/ /g, "-")
  ?.toLowerCase()}-${id}`;

  const redirectToSpec =() => {

    logEvent('Article_embed_click', 'Click', headline);
    window.location.href =title?.includes('(') ?`${specificationURL}/${title?.slice(0, title?.indexOf('('))
    ?.replace(/ /g, "-")
    ?.toLowerCase()}${id}`:`${specificationURL}/${title
    ?.replace(/ /g, "-")
    ?.toLowerCase()}-${id}/`;
  };

  return (
    <div className="spcmbl-forartcl" onClick={redirectToSpec}>

     <InView
     as="div"
     threshold={0.1}
     onChange={(inView, _, entry) =>
       inView &&
       logEvent('Article_embed_view', 'View', headline)
     }
     >
     <h2 className="spcmblhd">
        {title} <span>KEY SPECS</span>
      </h2>
      <div className="spcmbl-in">
        <div className="spcmbl-inlft">
          <figure>
            <img src={imgURL} style={{ width: "85px", height: '180px' }} alt="" />
          </figure>
          <a href={fullSpecificationURL+"/"} onClick={() => logEvent('Article_embed_click', 'Click', headline)} >Phone Photogallery</a>
        </div>

        <div className={`spcmbl-inrgt${mobileId}`} >
          <div className={`${mobileId}`}>
            <div data-glide-el="track">
              <div className={`phnfourbxwrap`}>
                <div className={`phnfourbxin`}>
                  <div className="icnhd">
                    <span>
                      <em className="dimsprite icnfst"></em>
                    </span>
                    परफॉरमेंस
                  </div>
                  <div className="phninsd">
                    <span>{cpu?.length>20? `${cpu?.slice(0, 20)}...`:cpu || "NA"} </span>
                    <span>{chipset?.length>20? `${chipset?.slice(0, 20)}...`:chipset || "NA"}</span>
                    <span> {ram ? `${ram} रैम` : "NA"}</span>
                  </div>
                </div>

                <div className={`phnfourbxin`}>
                  <div className="icnhd">
                    <span>
                      <em className="dimsprite icnscnd"></em>
                    </span>
                    डिस्प्ले
                  </div>
                  <div className="phninsd">
                    <span> {screen_size || "NA"} </span>
                    <span>
                      {pixel_density} , {display_type}{" "}
                    </span>
                    <span>
                      {refresh_rate ? `${refresh_rate} रिफ्रेश रेट` : "NA"}{" "}
                    </span>
                  </div>
                </div>

                <div className={`phnfourbxin`}>
                  <div className="icnhd">
                    <span>
                      <em className="dimsprite icnthrd"></em>
                    </span>
                    कैमरा
                  </div>
                  <div className="phninsd">
                    <span>{rear_camera || "NA"} </span>
                    <span> {flash ? `${flash} फ्लैश` : "NA"} </span>
                    <span>
                      {" "}
                      {front_camera ? `${front_camera} फ्रंट कैमरा` : "NA"}{" "}
                    </span>
                  </div>
                </div>

                <div className={`phnfourbxin`}>
                  <div className="icnhd">
                    <span>
                      <em className="dimsprite icnfrth"></em>
                    </span>
                    बैटरी
                  </div>
                  <div className="phninsd">
                    <span>{capacity || "NA"}</span>
                    <span>
                      {quick_charging?.includes("Yes")
                        ? "फास्ट चार्जिंग"
                        : "NA"}
                    </span>
                    <span>{usb_typec ? "यूएसबी टाइप-C पोर्ट" : "NA"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div data-glide-el="controls[nav]" className="phnlgblts dflx jstcntr">
              <button data-glide-dir="=0"></button>
              <button data-glide-dir="=1"></button>
              <button data-glide-dir="=2"></button>
              <button data-glide-dir="=3"></button>
            </div>
          </div>

          <div className="phnprc">₹ {numberWithCommas(price)}</div>
          <div className="phnrlsdt">
            {" "}
            जारी करने की तारीख:{" "}
            {newReleaseDate ? (
              <span>{date + "-" + month + "-" + year}</span>
            ) : (
              "NA"
            )}
          </div>

          <a
            href={`${specificationURL}/${title
              ?.replace(/ /g, "-")
              ?.toLowerCase()}-${id}/`}
            className="flspcfnbtn"
          >
            सभी स्‍पेसिफिकेशंस
          </a>
        </div>
      </div>

      <div className="phnflspcfn">
        <span className={
                  internal_storage_display
                    ? ""
                    : "icon_deactive_homePage"
                } >
          <em className={
                  internal_storage_display
                    ? "dimsprite icnram"
                    : "dimsprite icnram light"
                } ></em>
        </span>
        <span className={
                  volte
                    ? ""
                    : "icon_deactive_homePage"
                }>
          <em className={
                  volte
                    ? "dimsprite icnvolt"
                    : "dimsprite icnvolt light"
                } ></em>
        </span>
        <span className={
                  splashproof
                    ? ""
                    : "icon_deactive_homePage"
                }>
          <em className={
                  splashproof
                    ? "dimsprite icnsplsh"
                    : "dimsprite icnsplsh light"
                } ></em>
        </span>
        <span className={
                  volte
                    ? ""
                    : "icon_deactive_homePage"
                }>
          <em className= {volte?"dimsprite icnsprbrnd":"dimsprite icnsprbrnd light"} ></em>
        </span>
        <span className={
                  no_of_sim_cards === 2
                    ? ""
                    : "icon_deactive_homePage"
                }>
          <em className={
                  no_of_sim_cards === 2
                    ? "dimsprite icnsim"
                    : "dimsprite icnsim light"
                } ></em>
        </span>
        <span className={
                  finger_print_sensor
                    ? ""
                    : "icon_deactive_homePage"
                }>
          <em className={
                  finger_print_sensor
                    ? "dimsprite icnfngrprt"
                    : "dimsprite icnfngrprt light"
                } ></em>
        </span>
        <span className={
                  fm_radio
                    ? ""
                    : "icon_deactive_homePage"
                }>
          <em className={
                  fm_radio
                    ? "dimsprite icnfmrd"
                    : "dimsprite icnfmrd light"
                }></em>
        </span>
        <span className={
                  gorilla_glass3
                    ? ""
                    : "icon_deactive_homePage"
                }>
          <em className={
                  gorilla_glass3
                    ? "dimsprite icngrlgls"
                    : "dimsprite icngrlgls light"
                } ></em>
        </span>
      </div>
     </InView>

      <style jsx global>
        {`
          .spcmbl-forartcl {
            margin: 15px -15px !important;
            font-family: Mukta, sans-serif !important;
          }
          .spcmblhd {
            color: #001d42;
            font-size: 16px !important;
            font-weight: bold;
            text-transform: uppercase;
            border-top: 1px solid #d8d8d8;
            height: 40px;
            line-height: 40px !important;
            position: relative;
            background: #f6f7f7;
            margin: 0 !important;
            padding: 0 15px;
          }
          .spcmblhd span {
            color: #e1261d;
          }
          .spcmbl-in {
            padding: 15px 0 15px 15px;
            background: #fff;
            display: flex;
          }
          .spcmbl-inlft {
            width: 85px;
            flex-shrink: 0;
            margin-right: 15px;
          }
          .spcmbl-inlft figure {
            line-height: 0;
          }
          .spcmbl-inlft figure img {
            width: 100%;
            margin:0px;
          }
          .spcmbl-inlft a {
            color: #e1261d !important;
            font-size: 11px !important;
            line-height: 13px !important;
            text-decoration: underline;
            text-align: center;
            display: block;
            margin-top: 10px;
          }
          .spcmbl-inrgt${mobileId} {
            width: 100%;
            overflow: hidden;
          }
          .phnfourbx1 {
          }
          .phnfourbxwrap {
            display: flex;
            padding: 0 5px 5px 5px;
            display: flex;
gap: 10px;
    justify-content: flex-start;
          }
          .phnfourbxwrap .phnfourbxin {
            background: #f6f7f7;
            box-shadow: 0px 2px 4px #00000029;
            border: 1px solid #d8d8d8;
            padding: 8px 8px 2px 8px;
            text-align:left;
// flex-shrink: 0;
    // margin: 0px!Important;
    width: 204px !important;
          }
          .phnfourbxwrap .phnfourbxin .icnhd {
            color: #ff5a00;
            font-size: 14px;
            font-weight: bold;
            line-height: 20px;
            display: flex;
            align-items: center;
          }
          .phnfourbxwrap .phnfourbxin .icnhd span {
            width: 30px;
            height: 30px;
            flex-shrink: 0;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .phnfourbxwrap${mobileId} .phnfourbxin${mobileId} .icnhd span em {
            margin: 0;
          }
          .phninsd {
            margin-top: 10px;
          }
          .phninsd span {
            display: block;
            color: #646464;
            font-size: 12px;
            position: relative;
            line-height: 22px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .phninsd span:before {
            content: "";
            width: 5px;
            height: 5px;
            display: inline-block;
            background: #bababa;
            border-radius: 100%;
            position: relative;
            top: -2px;
            margin-right: 5px;
          }
          .dimsprite {
            background: url(dimsprite.png) 0 0 no-repeat;
            display: inline-block;
          }
          .dimsprite.icnfst {
            width: 30px;
            height: 30px;
            background-position: -41px 0px;
          }
          .dimsprite.icnscnd {
            width: 18px;
            height: 30px;
            background-position: -72px 0px;
          }
          .dimsprite.icnthrd {
            width: 30px;
            height: 19px;
            background-position: -91px 0px;
          }
          .dimsprite.icnfrth {
            width: 16px;
            height: 30px;
            background-position: -122px 0px;
          }
          .flspcfnbtn {
            background: #e1261d;
            height: 28px;
            line-height: 30px !important;
            color: #fff !important;
            border-radius: 14px;
            font-size: 14px !important;
            padding: 2px 15px;
            position: relative;
            font-weight: bold !important;
            display: inline-block;
          }
          .phnlgblts {
            // margin-left: 3px;
            justify-content: left !important;
          }
          .phnlgblts button {
            margin: 0 2px;
            padding: 0;
            width: 6px;
            height: 6px;
            background: #ccc;
            border: none;
            outline: none;
            border-radius: 100%;
          }
          .phnlgblts button.glide__bullet--active {
            background: #e1261d;
            width: 18px;
            border-radius: 5px;
          }
          .phnprc {
            color: #0076db;
            font-weight: bold;
            font-size: 16px;
            line-height: 16px;
            margin: 5px 0px;
            text-align:left !important;
          }
          .phnrlsdt {
            font-size: 12px;
            color: #212121;
            line-height: 18px;
            margin: 5px 0px;
            text-align:left !important;

          }
          .phnflspcfn {
            border-bottom: 1px solid #d8d8d8;
            background: #f6f7f7;
            margin: 0 !important;
            padding: 10px 0px;

          }
          .phnflspcfn {
            display: flex;
            justify-content: center;
          }
          .phnflspcfn span {
            width: 25px;
            height: 28px;
            flex-shrink: 0;
            margin-right: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0.8;
          }
          .phnflspcfn span em {
            margin: 0;
          }
          .dimsprite.icnram {
            width: 18px;
            height: 20px;
            background-position: -139px 0px;
          }
          .dimsprite.icnvolt {
            width: 14px;
            height: 18px;
            background-position: -158px 0px;
          }
          .dimsprite.icnsplsh {
            width: 14px;
            height: 20px;
            background-position: -174px 0px;
          }
          .dimsprite.icnsprbrnd {
            width: 14px;
            height: 18px;
            background-position: -190px 0px;
          }
          .dimsprite.icnsim {
            width: 18px;
            height: 20px;
            background-position: -206px 0px;
          }
          .dimsprite.icnfngrprt {
            width: 18px;
            height: 20px;
            background-position: -225px 0px;
          }
          .dimsprite.icnfmrd {
            width: 20px;
            height: 13px;
            background-position: -244px 0px;
          }
          .dimsprite.icngrlgls {
            width: 12px;
            height: 20px;
            background-position: -265px 0px;
          }
          .phnvs {
            text-align: center;
            line-height: 0;
          }
          .phnvs svg,
          .phnvs img {
            width: 28px;
            height: 61px;
          }
          .phnspc20 {
            margin-top: 20px;
          }
          .icon_deactive_homePage{position: relative;}
            .icon_deactive_homePage svg, .icon_deactive_homePage div{opacity: 0.3;}
            .icon_deactive_homePage:before{content: '';width: 1px;background-color: #ff0000;position: absolute;top: -2px;bottom: -5px;transform: rotate(45deg);left:10px}
       

            .spcmblhd {
              color: #001D42;
              font-size: 16px !important;
              font-weight: bold;
              text-transform: uppercase;
              border-top: 1px solid #D8D8D8;
              height: 40px;
              line-height: 40px!important;
              position: relative;
              background: #F6F7F7;
              margin: 0!important;
              padding: 0 15px;
              white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
          }

          .sprite {
            background: url("https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/sprite_1643807363.png");
          }
          .bg-card {
            background-position: -10px -180px;
          }
          .bg-lte {
            background-position: -240px -10px;
          }
          .bg-splash {
            background-position: -240px -90px;
          }
          .bg-4g {
            background-position: -190px -105px;
          }
          .bg-dual_sim {
            background-position: -50px -180px;
          }
          .bg-fingerprint {
            background-position: -90px -180px;
          }
          .bg-fm {
            background-position: -130px -180px;
          }
          .bg-g_glass {
            background-position: -170px -180px;
          }
          .bg-w_charging {
            background-position: -130px -70px;
          }
          .bg-performance {
            background-position: -190px -10px;
          }
          .bg-display {
            background-position: -110px -130px;
          }
          .bg-camera {
            background-position: -60px -130px;
          }
          .bg-battery {
            background-position: -10px -130px;
          }
          .bg-android_b {
            background-position: -70px -10px;
          }
          .bg-mobile {
            background-position: -70px -70px;
          }
          .bg-ram {
            background-position: -130px -10px;
          }
          .bg-fingerprint_b {
            background-position: -10px -70px;
          }
          .bg-5g {
            background-position: -10px -10px;
          }

          .dimsprite {
            background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/dimsprite.png")
              0 0 no-repeat;
            display: inline-block;
          }

          .dimsprite.andrdicn {
            flex-shrink: 0;
            width: 12px;
            height: 14px;
            background-position: -27px 0px;
            position: relative;
            top: 2px;
            margin-right: 7px;
          }

          // .phnfourbxwrap${mobileId}.glide__slide--active{
          //   box-shadow: 0px 3px 6px #00000029;
          // }
        `}
      </style>
    </div>
  );
};

export default QuickMobileView;
