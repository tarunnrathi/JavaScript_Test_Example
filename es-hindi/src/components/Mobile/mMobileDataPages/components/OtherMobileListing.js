import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { setDefaultImage } from "includes/article.util";
import { imgURL } from "api/Constant";

const { specificationURL } = require("/src/includes/brand.helper");

export default function OtherMobileListing({
  title = "",
  span = "",
  data = [],
  GlideId = "",
}) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    setTimeout(() => {
      const elm = document?.querySelector(`.${GlideId}`);
      if (elm) {
        new Glide(`.${GlideId}`, {
          type: "carousel",
          autoplay: 4000,
          perView: 1.5,
          gap: 0,
          slidesToScroll: 1,
          dots: false,
        })?.mount();
      }
    }, 2000);
  }, []);

  return (
    <>
      <>
        <div>
          <div className="spcothrphn spcglbg" id={GlideId}>
            <h2 className="phnglblhd forbg">
              {title} <span>{span}</span>
            </h2>
            {/* <!-- large photo slider start --> */}
            <div className={`${GlideId} psrlhdn`}>
              <div data-glide-el="track">
                <ul className="dflx">
                  {data &&
                    data.map((mobile) => {
                      const { operating_system } =
                        (mobile.general_specs_91?.length &&
                          JSON.parse(mobile.general_specs_91)) ||
                        {};

                        const { osVersion } =
                        (mobile?.specs?.length &&
                          JSON.parse(mobile?.specs)) ||
                        {};

                      const {
                        title,
                        price,
                        release_date,
                        internal_storage_display,
                        volte,
                        no_of_sim_cards,
                        finger_print_sensor,
                        fm_radio,
                      } = mobile || {};

                      const newReleaseDate = release_date && "" + release_date;

                      const year = newReleaseDate && newReleaseDate.slice(0, 4);
                      const month = newReleaseDate && newReleaseDate.slice(5, 7);
                      const date = newReleaseDate && newReleaseDate.slice(8, 10);

                      const specificationFullURL = title?.includes('(') ?`${specificationURL}/${title?.slice(0, title?.indexOf('('))
                      ?.replace(/ /g, "-")
                      ?.toLowerCase()}${mobile?.id}`:`${specificationURL}/${title
                      ?.replace(/ /g, "-")
                      ?.toLowerCase()}-${mobile?.id}`;
                      return (
                        <li>
                          <a
                            href={specificationFullURL+"/"}
                          >
                            <div className={ (GlideId === 'asdas') ? 'upcomingMobiles':"glblphnbx"} >
                              <h2>{title?.length>40? `${(title || "").slice(0, 35)}...` :title}</h2>

                              <div className="andrd">
                                 { operating_system ==='Android' || mobile?.operating_system ==='Android' ? <em className="dimsprite andrdicn"></em>:""}

            { operating_system === 'iOS' || mobile?.operating_system === 'iOS' ? <svg id="Capa_1" width='12' version="1.1" viewBox="0 0 90 90" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><g><path d="M49.6,6.8C52.9,3,58.3,0.2,62.8,0c0.6,5.3-1.5,10.6-4.7,14.4c-3.1,3.8-8.3,6.8-13.3,6.4     C44.2,15.6,46.7,10.2,49.6,6.8z M75.3,78.8c-3.7,5.5-7.6,10.9-13.7,11.1c-6,0.1-7.9-3.6-14.8-3.6c-6.9,0-9,3.5-14.7,3.7     c-5.9,0.2-10.4-5.9-14.2-11.4C10.2,67.4,4.3,47,12.3,33.3c3.9-6.8,10.9-11.2,18.5-11.3c5.8-0.1,11.3,3.9,14.8,3.9     c3.5,0,10.2-4.8,17.2-4.1c2.9,0.1,11.1,1.2,16.4,8.9c-0.4,0.3-9.8,5.7-9.7,17.1C69.6,61.4,81.4,66,81.5,66     C81.4,66.3,79.6,72.5,75.3,78.8z" id="Apple"/></g></g></svg> :"" }

                                {operating_system || (mobile?.operating_system? `${mobile?.operating_system} v${osVersion}`:"") }
                              </div>
                              <figure>
                                <img
                                  src={
                                    imgURL ||
                                    "https://www.forbes.com/uk/advisor/wp-content/uploads/2020/11/phones-switch-apps.jpg"
                                  }
                                  loading="lazy"
                                  onError={setDefaultImage}
                                  width={"65px"}
                                  height={"137px"}
                                />
                              </figure>
                              <div className="phnprc">
                                ₹ {numberWithCommas(mobile?.price)}
                              </div>

                              {GlideId === "asdas" ? (
                                <div className="phnexpctd">(Expected)</div>
                              ) : (
                                ""
                              )}
                              {GlideId === "asdas" ? (
                                <div className="rlgdtorng">
                                  जारी करने की तारीख :
                                  {newReleaseDate
                                    ? date + "-" + month + "-" + year
                                    : "NA"}
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="glblphnicn">
                                <span className={!internal_storage_display?"icon_deactive":""} >
                                  <em className={internal_storage_display?"dimsprite icnram":"dimsprite icnram light"}></em>
                                  <b>{internal_storage_display || "NA" }</b>
                                </span>
                                <span className={!volte?"icon_deactive dsbld":"dsbld"} >
                                  <em
                                    className={
                                      volte
                                        ? "dimsprite icnvolt"
                                        : "dimsprite icnvolt light"
                                    }
                                  ></em>
                                </span>
                                <span className={no_of_sim_cards !== 2?"icon_deactive":""}>
                                  <em
                                    className={
                                      no_of_sim_cards === 2
                                        ? "dimsprite icnsim"
                                        : "dimsprite icnsim light"
                                    }
                                  ></em>
                                </span>
                                <span className={!finger_print_sensor?"icon_deactive":""}>
                                  <em
                                    className={
                                      finger_print_sensor
                                        ? "dimsprite icnfngrprt"
                                        : "dimsprite icnfngrprt light"
                                    }
                                  ></em>
                                </span>
                                <span className={!fm_radio?"icon_deactive":""}>
                                  <em
                                    className={
                                      fm_radio
                                        ? "dimsprite icnfmrd"
                                        : "dimsprite icnfmrd light"
                                    }
                                  ></em>
                                </span>
                              </div>

                              <a
                                href={specificationFullURL+"/"}
                              >
                                <span>रीड मोर</span>
                              </a>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div
                data-glide-el="controls[nav]"
                className="phnlgblts dflx jstcntr"
              >
                <button data-glide-dir="=0"></button>
                <button data-glide-dir="=1"></button>
                <button data-glide-dir="=2"></button>
                <button data-glide-dir="=3"></button>
              </div>
            </div>
          </div>
          <style jsx global>
            {`
              .spcglbg {
                background: #f5f5f5;
                border-bottom: 1px solid #d8d8d8;
                padding: 15px 0 0 0;
                margin-bottom: 30px;
              }
              .spcothrphn {
              }
              .psrlhdn {
                position: relative;
                overflow: hidden;
              }
              .phnglblsld {
              }
              .glblphnbx {
                height:340px;
                background: #ffffff;
                box-shadow: 0px 3px 6px #0000001a;
                margin-left: 15px;
                border: 1px solid #e0e0e0;
                text-align: center;
                padding: 12px 0;
              }
              .glblphnbx h2,
              .glblphnbx h3 {
                height:32px;
                font-size: 16px;
                line-height: 18px;
                font-weight: bold;
                color: #212121;
                padding: 0px 10px;
              }
              .glblphnbx figure {
                width: 65px;
                height: 135px;
                overflow: hidden;
                line-height: 0;
                margin: 8px auto 15px auto;
              }
              .glblphnbx figure img {
                width:auto;
                height: 135px;
              }
              .glblphnicn {
                display: flex;
                justify-content: center;
                margin: 12px 0;
              }
              .glblphnicn span {
                width: 35px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .glblphnicn span.dsbld {
                opacity: 0.5;
              }
              .glblphnicn span b {
                font-size: 11px;
                color: #212121;
                display: block;
                width: 15px;
                text-align: left;
                line-height: 10px;
                position: relative;
                top: 1px;
                margin-left: 2px;
              }
              .glblphnbx a {
                display: block;
                border-top: 1px solid #e0e0e0;
                padding-top: 8px;
              }
              .glblphnbx a span {
                color: #e1261d;
                font-size: 12px;
                line-height: 14px;
                text-transform: uppercase;
                font-weight: bold;
                // text-decoration: underline;
              }
              .dimsprite {
                background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/dimsprite.png")
                  0 0 no-repeat;
                display: inline-block;
              }
              .dimsprite.icnandrdlg {
                background-position: 2px -31px;
                width: 40px;
                height: 40px;
              }
              .dimsprite.icnphnlg {
                background-position: -39px -33px;
                width: 22px;
                height: 40px;
              }
              .dimsprite.icnramlg {
                background-position: -62px -33px;
                width: 40px;
                height: 16px;
              }

              .dimsprite.andrdicn {
                width: 12px;
                height: 14px;
                background-position: -27px 0px;
                position: relative;
                top: 2px;
                margin-right: 7px;
              }
              .andrd {
                height:33px;
                text-align: center;
                font-size: 12px;
                color: #001d42;
                font-weight: bold;
                padding: 8px 0;
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
              .light {
                opacity: 0.5;
              }

              .phnexpctd {
                // font-family: "Recursive", sans-serif;
                list-style: none;
                text-align: center;
                box-sizing: border-box;
                color: #646464;
                font-size: 11px;
                line-height: 18px;
              }


              .icon_deactive{position: relative;}
              .icon_deactive svg, .icon_deactive div{opacity: 0.3;}
              .icon_deactive:before{content: '';width: 1px;background-color: #ff0000;position: absolute;top: -3px;bottom: -2px;transform: rotate(45deg);left:16px}
       

              // .upcomingMobiles{

              // }
       

              .upcomingMobiles {
                height:380px;
                background: #ffffff;
                box-shadow: 0px 3px 6px #0000001a;
                margin-left: 15px;
                border: 1px solid #e0e0e0;
                text-align: center;
                padding: 12px 0;
              }
              .upcomingMobiles h2,
              .upcomingMobiles h3 {
                height:32px;
                font-size: 16px;
                line-height: 18px;
                font-weight: bold;
                color: #212121;
                padding: 0px 10px;
              }
              .upcomingMobiles figure {
                width: 65px;
                height: 135px;
                overflow: hidden;
                line-height: 0;
                margin: 8px auto 15px auto;
              }
              .upcomingMobiles figure img {
                width: auto;
          height: 135px;
              }

              .upcomingMobiles a {
                display: block;
                border-top: 1px solid #e0e0e0;
                padding-top: 8px;
              }
              .upcomingMobiles a span {
                color: #e1261d;
                font-size: 12px;
                line-height: 14px;
                text-transform: uppercase;
                font-weight: bold;
                // text-decoration: underline;
              }
            `}
          </style>
        </div>
      </>
    </>
  );
}
