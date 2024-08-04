import React from "react";
import { setDefaultImage } from "includes/article.util";
import { logEvent } from "includes/googleAnalytic";
import { imgURL } from "api/Constant";

const { specificationURL } = require("/src/includes/brand.helper");

const SingleMobileListingH = ({ mobileData = {}, quickView =false, headline='' }) => {
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

  let { cpu, architecture, ram, chipset } =
        (mobileData?.performance_specs_91 &&  JSON.parse(mobileData?.performance_specs_91)  )    || {};
  let { screen_size, display_type, pixel_density, refresh_rate } =
         ( mobileData?.display_specs_91  && JSON.parse(mobileData?.display_specs_91 )  )  || {};
  let { front_camera, rear_camera } =
    ( mobileData?.special_specs_91  &&  JSON.parse(mobileData?.special_specs_91 ))    || {};
  let { flash } =   (mobileData?.camera_specs_91  && JSON.parse(mobileData?.camera_specs_91 )) || {};
  let { quick_charging, usb_typec, capacity } =
  (mobileData?.battery_specs_91  && JSON.parse(mobileData?.battery_specs_91 )) || {};

  let { operating_system } =   (mobileData?.general_specs_91  && JSON.parse(mobileData?.general_specs_91 ))  || {};
  let { fastCharging, osVersion } =   (mobileData?.specs  && JSON.parse(mobileData?.specs )) || {};

  const newReleaseDate = release_date && "" + release_date;

  const year = newReleaseDate && newReleaseDate.slice(0, 4);
  const month = newReleaseDate && newReleaseDate.slice(5, 7);
  const date = newReleaseDate && newReleaseDate.slice(8, 10);

  const specificationFullURL = title?.includes('(') ?`${specificationURL}/${title?.slice(0, title?.indexOf('('))
  ?.replace(/ /g, "-")
  ?.toLowerCase()}${id}/`:`${specificationURL}/${title
  ?.replace(/ /g, "-")
  ?.toLowerCase()}-${id}/`;

  return (
    <div className="ph_row">
      <div className="ml_cnt">
        <img
          src={imgURL}
          alt="No Alt"
          // style={{ width: "115px", height: "260px" }}
          onError={setDefaultImage}
          loading="lazy"
          className='qvimage'
        />

        {quickView? <a href={specificationFullURL+"/"} className="ph_galri">Phone Photogallery</a> : <div className="ph_redet">
          जारी करने की तारीख:{" "}
          {newReleaseDate ? (
            <span>{date + "-" + month + "-" + year}</span>
          ) : (
            "NA"
          )}
        </div> }

      </div>
      <div className="mr_cnt">
        <div className="mc_h">
          <h2 className="ttl">{title}</h2>
          <div className="os">
            { operating_system ==='Android' || mobileData?.operating_system==='Android' ? <svg
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
              ></path>
            </svg> :"" }

            { operating_system === 'iOS' || mobileData?.operating_system === 'iOS' ? <svg id="Capa_1" width='12' version="1.1" viewBox="0 0 90 90" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><g><path d="M49.6,6.8C52.9,3,58.3,0.2,62.8,0c0.6,5.3-1.5,10.6-4.7,14.4c-3.1,3.8-8.3,6.8-13.3,6.4     C44.2,15.6,46.7,10.2,49.6,6.8z M75.3,78.8c-3.7,5.5-7.6,10.9-13.7,11.1c-6,0.1-7.9-3.6-14.8-3.6c-6.9,0-9,3.5-14.7,3.7     c-5.9,0.2-10.4-5.9-14.2-11.4C10.2,67.4,4.3,47,12.3,33.3c3.9-6.8,10.9-11.2,18.5-11.3c5.8-0.1,11.3,3.9,14.8,3.9     c3.5,0,10.2-4.8,17.2-4.1c2.9,0.1,11.1,1.2,16.4,8.9c-0.4,0.3-9.8,5.7-9.7,17.1C69.6,61.4,81.4,66,81.5,66     C81.4,66.3,79.6,72.5,75.3,78.8z" id="Apple"/></g></g></svg> :"" }

            <span>{operating_system || (mobileData?.operating_system ? `${mobileData?.operating_system} v${osVersion}`:"") } </span>
          </div>
          <div className="m_prize">₹ {numberWithCommas(price)}</div>
        </div>
        <div className="mc_b">
          <div className="ph_details">
            <div className="col">
              <div className="bg-performance sprite dt_img"></div>
              <div className="dt_ttl">परफॉरमेंस</div>
              <ul className="dt_list">
                <li>{cpu || "NA"} </li>
                <li>{chipset || "NA"}</li>
                <li> {ram ? `${ram} रैम` : "NA"}</li>
              </ul>
            </div>
            <div className="col">
              <div className="bg-display sprite dt_img"></div>
              <div className="dt_ttl">डिस्प्ले</div>
              <ul className="dt_list">
                <li> {screen_size || "NA"} </li>
                <li>
                  {pixel_density} , {display_type}{" "}
                </li>
                <li>{refresh_rate ? `${refresh_rate} रिफ्रेश रेट` : "NA"} </li>
              </ul>
            </div>
            <div className="col">
              <div className="bg-camera sprite dt_img"></div>
              <div className="dt_ttl">कैमरा</div>
              <ul className="dt_list">
                <li>{rear_camera || "NA"} </li>
                <li> {flash ? `${flash} फ्लैश` : "NA"} </li>
                <li> {front_camera ? `${front_camera} फ्रंट कैमरा` : "NA"} </li>
              </ul>
            </div>
            <div className="col">
              <div className="bg-battery sprite dt_img"></div>
              <div className="dt_ttl">बैटरी</div>
              <ul className="dt_list">
                <li>{capacity || "NA"}</li>
                <li>
                  {quick_charging?.includes("Yes") ? "फास्ट चार्जिंग" : "NA"}
                </li>
                <li>{usb_typec ? "यूएसबी टाइप-C पोर्ट" : "NA"}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mc_f">
          <ul className="phfe_list">
            <li
              className={!internal_storage_display ? "icon_deactive_brandPage" : ""}
            >
              <div
                className={
                  internal_storage_display
                    ? "sprite bg-card phfe_bg"
                    : "sprite bg-card phfe_bg light"
                }
              ></div>
              <div className="txt">{internal_storage_display || "NA"}</div>
            </li>
            <li className={!volte ? "icon_deactive_brandPage" : ""}>
              <div
                className={
                  volte
                    ? "sprite bg-lte phfe_bg"
                    : "sprite bg-lte light phfe_bg"
                }
              ></div>
            </li>
            <li className={!splashproof ? "icon_deactive_brandPage" : ""}>
              <div
                className={
                  splashproof
                    ? "sprite bg-splash phfe_bg"
                    : "sprite bg-splash phfe_bg light"
                }
              ></div>
            </li>
            <li className={!volte ? "icon_deactive_brandPage" : ""}>
              <div
                className={
                  volte ? "sprite bg-4g phfe_bg" : "sprite bg-4g light phfe_bg"
                }
              ></div>
            </li>
            <li className={no_of_sim_cards !== 2 ? "icon_deactive_brandPage" : ""}>
              <div
                className={
                  no_of_sim_cards === 2
                    ? "sprite bg-dual_sim phfe_bg"
                    : "sprite light bg-dual_sim phfe_bg"
                }
              ></div>
            </li>
            <li className={!finger_print_sensor ? "icon_deactive_brandPage" : ""}>
              <div
                className={
                  finger_print_sensor
                    ? "sprite bg-fingerprint phfe_bg"
                    : "sprite bg-fingerprint light phfe_bg"
                }
              ></div>
            </li>
            <li className={!fm_radio ? "icon_deactive_brandPage" : ""}>
              <div
                className={
                  fm_radio
                    ? "sprite bg-fm phfe_bg"
                    : "sprite bg-fm light phfe_bg"
                }
              ></div>
            </li>
            <li className={!gorilla_glass3 ? "icon_deactive_brandPage" : ""}>
              <div
                className={
                  gorilla_glass3
                    ? "sprite bg-g_glass phfe_bg"
                    : "sprite bg-g_glass phfe_bg light"
                }
              ></div>
            </li>
            <li
              className={
                fastCharging !== "Yes" ? "icon_deactive_brandPage" : ""
              }
            >
              <div className={"sprite bg-w_charging phfe_bg"}></div>
            </li>
          </ul>

        {quickView? <div className="ph_redet">
          जारी करने की तारीख:{" "}
          {newReleaseDate ? (
            <span>{date + "-" + month + "-" + year}</span>
          ) : (
            "NA"
          )}
        </div> :"" }

          {quickView?
          <a className="phfl_spe" href={specificationFullURL+"/"} onClick={ () => logEvent('Article_embed_click', 'Click', headline) } >
          <span className="more">सभी स्‍पेसिफिकेशंस</span>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7.406" viewBox="0 0 12 7.406">
              <path id="Path_93" data-name="Path 93" d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z" transform="translate(-3 9.984) rotate(90)" fill="#fff"></path>
            </svg>                                       */}
          </a>
           : <a
            href={specificationFullURL+"/"}
            className="phfl_spe"
          >
            <span> और जाने</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7.406"
              height="12"
              viewBox="0 0 7.406 12"
            >
              <path
                id="Path_93"
                data-name="Path 93"
                d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
                transform="translate(9.984 15)"
                fill="#e1261d"
              />
            </svg>
          </a> }

        </div>
      </div>
    </div>
  );
};

export default SingleMobileListingH;
