import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { scrollToTarget, setDefaultImage } from "includes/article.util";
import { imgURL } from "api/Constant";

const OverviewSection = ({ data = {} }) => {

  const [currentGlide, setCurrentGlide] = useState(0);
  const {
    ram_display,
    internal_storage_display,
    price,
    release_date,
    volte,
    splashproof,
    gorilla_glass3,
    finger_print_sensor,
    no_of_sim_cards,
    fm_radio,
    sim_size,
    mobile_images_91

  } = data;

  const newReleaseDate = release_date ? "" + release_date : "";

  const year = newReleaseDate && newReleaseDate.slice(0, 4);
  const month = newReleaseDate && newReleaseDate.slice(5, 7);
  const date = newReleaseDate && newReleaseDate.slice(8, 10);
  function numberWithCommas(x = "") {
    return x && x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let { expandableStorageUpto, simType, osVersion } =
    (data?.specs?.length && JSON.parse(data?.specs)) || {};

  let fourG = data?.specs?.length && JSON.parse(data?.specs)["4g"];

  let { operating_system } =
    (data?.general_specs_91?.length && JSON.parse(data?.general_specs_91)) ||
    {};
  const { cpu, architecture, ram, chipset } =
    (data?.performance_specs_91?.length &&
      JSON.parse(data?.performance_specs_91)) ||
    {};

  let { screen_size, display_type, pixel_density, refresh_rate } =
    (data?.display_specs_91?.length && JSON.parse(data?.display_specs_91)) ||
    {};

  let { front_camera, rear_camera } =
    (data?.special_specs_91?.length && JSON.parse(data?.special_specs_91 )) ||
    {};

  let { flash } =
    (data?.camera_specs_91?.length && JSON.parse(data?.camera_specs_91 )) ||
    {};

  let { quick_charging, usb_typec, capacity } =
    (data?.battery_specs_91?.length && JSON.parse(data?.battery_specs_91 )) ||
    {};
  let { expandable_memory, internal_memory } =
    (data?.storage_specs_91?.length && JSON.parse(data?.storage_specs_91 )) ||
    {};

    const scroll = (e, id) => {
      e.preventDefault();
      scrollToTarget(id);
    };

    let glide = '';
  useEffect(() => {
   const ele = document?.getElementById('specSlide');
    if(mobile_images_91?.length && ele && ele?.children) {
      glide = new Glide("#specSlide", {
        // autoplay: 2000,
        type: "slider",
        focusAt: "center",
        perView: 1,
        slidesToScroll: 1,
      });
        if(glide) {
        glide.mount();
      }
      glide.on(['mount.after', 'run'], function () {
        document.getElementById('current').innerHTML = `0${glide.index+1}/`;
      });
    }
  }, []);

  return (
    <div>
      <div id="section_overview" className="section">
        <div className="msl_outer">
          <div className="mmsli_wrap" id='specSlide'>

            {mobile_images_91?.length ? <div data-glide-el="track">
              <ul className="mmslider" >
                <li className="glide__slide">
                  <img
                    src={imgURL}
                    alt=""
                    // max-width="170px"
                    // height="400"
                    onError={setDefaultImage}
                    loading="lazy"
                    className='overviewImage'
                  />
                </li>
                {mobile_images_91?.length && mobile_images_91.map((image, key) => {
                   return <li className="glide__slide">
                   <img
                     src={
                      imgURL || imgURL
                     }
                     alt=""
                     // max-width="170px"
                    //  height="400"
                     onError={setDefaultImage}
                     loading="lazy"
                     className='overviewImage'

                   />
                 </li>;
                })}
              </ul>
            </div> :(
              <ul className="mmslider">
              {/* <li className="glide__slide"> */}
                <img
                  src={imgURL }
                  alt=""
                  // max-width="170px"
                  height="400"
                  onError={setDefaultImage}
                  loading="lazy"
                  className='overviewImage'
                />
              {/* </li> */}
              </ul>
            )}

           {mobile_images_91?.length? <div className="controls" data-glide-el="controls">
              <div data-glide-dir="<">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.406"
                  height="12"
                  viewBox="0 0 7.406 12"
                >
                  <path
                    id="Path_1"
                    data-name="Path 1"
                    d="M-3.984-3l-6-6,6-6,1.406,1.406L-7.219-9l4.641,4.594Z"
                    transform="translate(9.984 15)"
                    fill="#425673"
                  />
                </svg>
              </div>
              <div data-glide-dir=">">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.406"
                  height="12"
                  viewBox="0 0 7.406 12"
                >
                  <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
                    transform="translate(9.984 15)"
                    fill="#425673"
                  />
                </svg>
              </div>
            </div> :""}

            {mobile_images_91?.length? <div className="glide__bullets" data-glide-el="controls[nav]">
              <button className="glide__bullet" data-glide-dir="=0"></button>
              {mobile_images_91?.length && mobile_images_91.map ((image, key) => {
                return <button className="glide__bullet" data-glide-dir={`=${key+1}`}></button>;
              }) }
            </div> :''}

             {mobile_images_91?.length? <div className="sl_count">
              <div id='current' className="current">01/</div>
              <div>{`0${1 + (mobile_images_91?.length || 0) }`}</div>
            </div> :""}
          </div>
        </div>
        {/* <!-- msl_outer ends here --> */}
        <div id="ki_specs">
          <div className="ki_specs_wrp">
            <div className="kisp_h">
              <h2 className="ttl">प्रमुख विशेषताएं</h2>
              {/* <div className="variant">
                <div className="slide-container">
                  <div className="slide" pos="1">
                    वेरिएंट:{" "}
                    <span>
                      {ram_display} + {internal_storage_display}
                    </span>
                  </div>
                </div>
                <div className="slide-toggle-container">
                  <p className="slide-toggle prev" direction="prev">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="7.406"
                      viewBox="0 0 12 7.406"
                    >
                      <path
                        id="Path_93"
                        data-name="Path 93"
                        d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
                        transform="translate(-3 9.984) rotate(90)"
                        fill="#333"
                      ></path>
                    </svg>
                  </p>
                  <p className="slide-toggle" direction="next">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="7.406"
                      viewBox="0 0 12 7.406"
                    >
                      <path
                        id="Path_93"
                        data-name="Path 93"
                        d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
                        transform="translate(-3 9.984) rotate(90)"
                        fill="#333"
                      ></path>
                    </svg>
                  </p>
                </div>
              </div> */}
              <div className="os">
                { operating_system ==='Android' || data?.operating_system ==='Android' ? <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.648"
                  height="14"
                  viewBox="0 0 11.648 14"
                >
                  <path
                    id="Path_92"
                    data-name="Path 92"
                    d="M9.086-12.824H8.512v-.6h.574Zm-2.926,0H5.586v-.6H6.16Zm3.227-1.668.766-.766a.3.3,0,0,0,0-.41.3.3,0,0,0-.41,0l-.848.875a3.436,3.436,0,0,0-1.559-.355,3.436,3.436,0,0,0-1.559.355L4.9-15.668a.252.252,0,0,0-.383.027.239.239,0,0,0,0,.383l.738.766a3.612,3.612,0,0,0-1.039,1.217,3.371,3.371,0,0,0-.383,1.6h7a3.277,3.277,0,0,0-.4-1.6A3.758,3.758,0,0,0,9.387-14.492Zm2.9,3.418a.818.818,0,0,0-.6.246.953.953,0,0,0-.273.629v4.074a.953.953,0,0,0,.273.629.835.835,0,0,0,.615.246.835.835,0,0,0,.615-.246.852.852,0,0,0,.246-.629V-10.2a.852.852,0,0,0-.246-.629A.852.852,0,0,0,12.285-11.074Zm-9.9,0a.852.852,0,0,0-.629.246.852.852,0,0,0-.246.629v4.074a.852.852,0,0,0,.246.629.835.835,0,0,0,.615.246A.835.835,0,0,0,2.988-5.5a.953.953,0,0,0,.273-.629V-10.2a.953.953,0,0,0-.273-.629A.818.818,0,0,0,2.387-11.074ZM3.836-5.25A.556.556,0,0,0,4-4.84a.556.556,0,0,0,.41.164h.6v2.051A.852.852,0,0,0,5.258-2a.835.835,0,0,0,.615.246A.835.835,0,0,0,6.488-2a.953.953,0,0,0,.273-.629V-4.676H7.91v2.051A.953.953,0,0,0,8.184-2,.835.835,0,0,0,8.8-1.75.835.835,0,0,0,9.414-2a.852.852,0,0,0,.246-.629V-4.676h.6a.556.556,0,0,0,.41-.164.556.556,0,0,0,.164-.41v-5.824h-7Z"
                    transform="translate(-1.512 15.75)"
                    fill="#97c02f"
                  />
                </svg> :"" }
                { operating_system === 'iOS' || data?.operating_system === 'iOS' ? <svg id="Capa_1" width='12' version="1.1" viewBox="0 0 90 90" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><g><path d="M49.6,6.8C52.9,3,58.3,0.2,62.8,0c0.6,5.3-1.5,10.6-4.7,14.4c-3.1,3.8-8.3,6.8-13.3,6.4     C44.2,15.6,46.7,10.2,49.6,6.8z M75.3,78.8c-3.7,5.5-7.6,10.9-13.7,11.1c-6,0.1-7.9-3.6-14.8-3.6c-6.9,0-9,3.5-14.7,3.7     c-5.9,0.2-10.4-5.9-14.2-11.4C10.2,67.4,4.3,47,12.3,33.3c3.9-6.8,10.9-11.2,18.5-11.3c5.8-0.1,11.3,3.9,14.8,3.9     c3.5,0,10.2-4.8,17.2-4.1c2.9,0.1,11.1,1.2,16.4,8.9c-0.4,0.3-9.8,5.7-9.7,17.1C69.6,61.4,81.4,66,81.5,66     C81.4,66.3,79.6,72.5,75.3,78.8z" id="Apple"/></g></g></svg> :"" }

                <span>{operating_system || (data?.operating_system? ` ${data?.operating_system} v${osVersion}`:'') }</span>
              </div>
              <div className="m_prize">₹ {numberWithCommas(price)}</div>
            </div>
            <div className="kisp_body">
              <div className="ph_details">
                <div className="col">
                  <div className="bg-performance sprite dt_img"></div>
                  <div className="dt_ttl">परफॉरमेंस</div>
                  <ul className="dt_list">
                    <li>{cpu || "NA"}</li>
                    <li>{chipset || "NA"}</li>
                    <li>{ram ? `${ram} रैम`:"NA"}</li>
                  </ul>
                </div>
                <div className="col">
                  <div className="bg-display sprite dt_img"></div>
                  <div className="dt_ttl">डिस्प्ले</div>
                  <ul className="dt_list">
                    <li>{screen_size || "NA"}</li>
                    <li>
                      {" "}
                      {pixel_density} , {display_type}{" "}
                    </li>
                    <li>{refresh_rate ? `${refresh_rate} रिफ्रेश रेट` :"NA"}</li>
                  </ul>
                </div>
                <div className="col">
                  <div className="bg-camera sprite dt_img"></div>
                  <div className="dt_ttl">कैमरा</div>
                  <ul className="dt_list">
                    <li>{rear_camera || "NA"}</li>
                    <li>{flash? `${flash} फ्लैश`:'NA'}</li>
                    <li>{front_camera?`${front_camera} फ्रंट कैमरा`:'NA'}</li>
                  </ul>
                </div>
                <div className="col">
                  <div className="bg-battery sprite dt_img"></div>
                  <div className="dt_ttl">बैटरी</div>
                  <ul className="dt_list">
                    <li>{capacity || "NA"}</li>
                    <li>
                      {" "}
                      {quick_charging?.includes("Yes")
                        ? "फास्ट चार्जिंग"
                        : "NA"}{" "}
                    </li>
                    <li>{usb_typec ? "यूएसबी टाइप-C Port" : "NA"}</li>
                  </ul>
                </div>
              </div>
              <div className="dt_border"></div>
              <div className="fe_list">
                <li className={!internal_memory ? "icon_deactive_overview" : ""}>
                  <div
                    className={
                      internal_memory
                        ? "fel_bg sprite bg-card"
                        : "fel_bg sprite bg-card light"
                    }
                  ></div>
                  <span>
                    {" "}
                    {internal_memory
                      ? `${internal_memory} इंटरनल मेमोरी `
                      : "NA"}
                    {expandableStorageUpto
                      ? `+ ${expandableStorageUpto} एक्सपैंडेबल`
                      : ""}{" "}
                  </span>
                </li>
                <li className={!volte ? "icon_deactive_overview" : ""}>
                  <div
                    className={
                      volte
                        ? "sprite bg-lte fel_bg"
                        : "sprite bg-lte light fel_bg"
                    }
                  ></div>
                  <span>VoLTE</span>
                </li>
                <li className={!splashproof ? "icon_deactive_overview" : ""}>
                  <div
                    className={
                      splashproof
                        ? "sprite bg-splash fel_bg"
                        : "sprite bg-splash fel_bg light"
                    }
                  ></div>
                  <span>स्प्लैश प्रूफ</span>
                </li>
                <li className={!fourG ? "icon_deactive_overview" : ""}>
                  <div
                    className={
                      fourG
                        ? "fel_bg sprite bg-4g"
                        : "fel_bg sprite bg-4g light"
                    }
                  ></div>
                  <span>4G सपोर्टेड</span>
                </li>
                <li
                  className={
                    no_of_sim_cards !== 2 ? "icon_deactive_overview" : ""
                  }
                >
                  <div
                    className={
                      no_of_sim_cards === 2
                        ? "sprite bg-dual_sim fel_bg"
                        : "sprite light bg-dual_sim fel_bg"
                    }
                  ></div>
                  <span>डुअल सिम {simType ? `: ${simType}` : ""}</span>
                </li>
                <li
                  className={
                    !finger_print_sensor ? "icon_deactive_overview" : ""
                  }
                >
                  <div
                    className={
                      finger_print_sensor
                        ? "sprite bg-fingerprint fel_bg"
                        : "sprite bg-fingerprint light fel_bg"
                    }
                  ></div>
                  <span>फिंगरप्रिंट सेंसर </span>
                </li>
                <li className={!fm_radio ? "icon_deactive_overview" : ""}>
                  <div
                    className={
                      fm_radio
                        ? "sprite bg-fm fel_bg"
                        : "sprite bg-fm light fel_bg"
                    }
                  ></div>
                  <span>fm रेडियो</span>
                </li>
                <li className={!gorilla_glass3 ? "icon_deactive_overview" : ""}>
                  <div
                    className={
                      gorilla_glass3
                        ? "sprite fel_bg bg-g_glass"
                        : "sprite bg-g_glass fel_bg light"
                    }
                  ></div>
                  <span>गोरिल्ला ग्लास 3</span>
                </li>
              </div>
            </div>
            <div className="kisp_footer">
              <div className="ps_dtl">
                <div className="psdtl_h">बाजार की स्थिति:</div>
                <div className="psdtl_f">भारत में उपलब्ध</div>
              </div>
              <div className="ps_dtl">
                <div className="psdtl_h">जारी करने की तारीख: </div>
                <div className="psdtl_f">
                  {newReleaseDate ? date + "-" + month + "-" + year : "NA"}
                </div>
              </div>
              {/* <!-- onclick function written at the bottom --> */}
              <a className="ki_flsp" onClick={(e) => scroll(e, "fullSpecification")} href="#fullSpecification">
                <span className="more">सभी स्‍पेसिफिकेशंस</span>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="7.406"
                  viewBox="0 0 12 7.406"
                >
                  <path
                    id="Path_93"
                    data-name="Path 93"
                    d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
                    transform="translate(-3 9.984) rotate(90)"
                    fill="#fff"
                  />
                </svg> */}
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .light{
          opacity: 0.5;
         }
         .icon_deactive_overview{position: relative;}

         .icon_deactive_overview svg, .icon_deactive_overview div{opacity: 0.3;}


         .icon_deactive_overview:before{content: '';width: 1px;background-color: #ff0000;position: absolute;top: 4px;bottom: 3px;transform: rotate(45deg);left:10px}
  

         .overviewImage{
          //  object-fit:contain;
          max-width: 170px !important;
          height: auto;
          max-height: 400px;
          margin: auto;
         }
         
       `}</style>
    </div>
  );
};

export default OverviewSection;
